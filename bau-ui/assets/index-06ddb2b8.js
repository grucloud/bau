(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Xn=(e,t)=>({...e,paths:[...t,e.path]}),$t=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Xn(o,e);return n?[a,...$t({paths:[...e,o.path],routes:n})]:a}),Zn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Yn=({routes:e=[],notFoundRoute:t})=>{const n=$t({routes:e}).map(o=>({...o,regex:Zn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Jn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Yn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const nt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Qn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],eo=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],yt=e=>`var(--color-${e})`,to=e=>`var(--color-${e}-lightest)`,no=()=>nt.map(([e])=>`
.outline.${e} {
  border: 1px solid ${yt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${to(e)};
}
.solid.${e} {
  background-color: ${yt(e)};
}
`).join(`
`),oo=()=>nt.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),ao=e=>100-e*10,ro=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${ao(t)}%);`).join(`
`),Ct=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),so=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Qn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...eo.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function io({createGlobalStyles:e},{colorPalette:t=nt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>so([n,o])).join(`
`)}
      ${ro()}
      ${Ct({})}
      ${no()}
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
      ${oo()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Ct({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function co(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ot=e=>Object.prototype.toString.call(e??0).slice(8,-1),lo=e=>ot(e)=="Object",St=e=>ot(e)=="Function",Qe=e=>["Object","Array"].includes(ot(e)),Et=Object.getPrototypeOf,et=e=>ye(e)?e.val:e,ye=e=>e==null?void 0:e.__isState,uo=["splice","push","pop","shift","unshift","sort","reverse"],Le=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const F=e=>!ye(e[0])&&lo(e[0])?e:[{},...e];function po(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,m,b)=>{let S=r;r=m;let E=y(b);return r=S,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,m,b,S,E,O)=>{var $;if(s){i.add(y);return}for(let G of y.bindings){let{deps:L,element:_,renderInferred:X,render:ne,renderItem:Q}=G;if(Q&&m)($=f(_,S,(...ae)=>v(Q(...ae)),b,E,O)[m])==null||$.call();else{let ae=X?X({element:_}):ne({element:_,renderItem:Q})(...L.map(et));ae!==_&&_.replaceWith(G.element=v(ae))}}C(y),u()},p=(y,m,b=[])=>({get(S,E,O){var $;if(r==null||r.add(y),E==="_isProxy")return!0;if(!(($=S[E])!=null&&$._isProxy)&&!ye(S[E])&&Qe(S[E]))S[E]=new Proxy(S[E],p(y,m,[...b,E]));else if(uo.includes(E)){let G=S[E];return(...L)=>{let _=G.apply(S,L);return d(y,E,_,L,m,b),_}}return Reflect.get(S,E,O)},set(S,E,O,$){let G=Reflect.set(S,E,O,$);return d(y,"setItem",G,{prop:E,value:O},m,[...b,E]),G}}),g=(y,m)=>new Proxy(m,p(y,m)),f=(y,m,b,S,E,O)=>{let $=()=>y.replaceChildren(...Le(S,b)),G=L=>y[L]&&y.removeChild(y[L]);return{assign:$,sort:$,reverse:$,setItem:()=>{var _;let L=O[0];(_=y.children[L])==null||_.replaceWith(b(E[L],L))},push:()=>y.append(...Le(m,(L,_)=>b(L,E.length+_))),unshift:()=>y.prepend(...Le(m,b)),pop:()=>G("lastChild"),shift:()=>G("firstChild"),splice:()=>{let[L,_,...X]=m;const{length:ne}=y.children;for(let Q=L>=0?Math.min(L+_-1,ne-1):ne-1;Q>=(L>=0?L:ne+L);Q--)y.children[Q].remove();if(X.length){let Q=X.forEach((ae,pe)=>b(ae,L+pe));y.children[L]?y.children[L].after(...Q):y.append(...Q)}}}},h=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=Qe(y)?g(m,y):y,m.valProxy)},set val(m){let b=this,S=b.val;Qe(m)?(b.valProxy=g(b,m),d(b,"assign",m)):m!==S&&(b.valProxy=m,d(b)),b.oldVal=S}}),v=y=>{if(y==null||y===!1){const m=c("span");return m.style.display="none",m}else return y.nodeType?y:n.createTextNode(y)},w=(y,m)=>{let b=new Set;return m.val=l(y,b),b},x=y=>{let m=h(),b=w(y,m);m.computed=!0;for(let S of b)S.listeners.push({computed:y,deps:b,state:m});return m},C=y=>{for(let m of[...y.listeners])w(m.computed,m.state)},I=(y,...m)=>{if(m.length){let b=[];for(let S of m.flat(1/0))S!=null&&b.push(ye(S)?V({deps:[S],render:()=>E=>E}):St(S)?ee({renderInferred:S}):v(S));y.append(...b)}},k={},A=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??A(Et(y),m)),T=(y,m,b)=>{var S;return k[y+","+m]??(k[y+","+m]=((S=A(b,m))==null?void 0:S.set)??0)},D=(y,m)=>new t.MutationObserver((b,S)=>{b.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(O=>O===y&&(m({element:y}),S.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),B=(y,m)=>new t.MutationObserver((b,S)=>b.forEach(E=>m({record:E,element:y}))).observe(y,{childList:!0}),z=y=>new Proxy(function(b,...S){var G;let[E,...O]=F(S),$=y?n.createElementNS(y,b):c(b);for(let[L,_]of Object.entries(E)){if(L.startsWith("bau"))continue;let X=T(b,L,Et($))?ne=>$[L]=ne:ne=>$.setAttribute(L,ne);_==null||(ye(_)?V({deps:[_],render:()=>()=>(X(_.val),$)}):St(_)&&(!L.startsWith("on")||_.isDerived)?ee({renderInferred:()=>(X(_({element:$})),$)}):_.renderProp?V({deps:_.deps,render:()=>()=>(X(_.renderProp({element:$})(..._.deps.map(et))),$)}):X(_))}return E.bauChildMutated&&B($,E.bauChildMutated),I($,...O),(G=E.bauCreated)==null||G.call(E,{element:$}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:$})),E.bauUnmounted&&t.requestAnimationFrame(()=>D($,E.bauUnmounted)),$},{get:(m,b)=>m.bind(void 0,b)}),K=(y,m,b)=>{y.element=v(b);for(let S of m)ye(S)&&(a.add(S),S.bindings.push(y));return y.element},ee=({renderInferred:y,element:m})=>{let b=new Set,S=l(y,b,{element:m});return K({renderInferred:y},b,S)},V=({deps:y,element:m,render:b,renderItem:S})=>K({deps:y,render:b,renderItem:S},y,b({element:m,renderItem:S})(...y.map(et))),J=(y,m,b)=>V({deps:[y],render:({renderItem:S})=>E=>(m.append(...Le(E,S)),m),renderItem:b}),R=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:z(),tagsNS:z,state:h,bind:V,loop:J,derive:x,stateSet:a,batch:R}}const mo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},go=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},bo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function ho(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=bo(a,i),r=mo(s);return!t.getElementById(r)&&go(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function fo(e){const t=po(),n=ho();return io(n),{bau:t,...n,tr:o=>o,window,...e}}function M(...e){return e.filter(t=>t).join(" ")}function Ge(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:M("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const g=p.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=p.getAttribute("width"),g.style.height=p.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var f;return(f=g.parentNode)==null?void 0:f.removeChild(g)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const g=p.getBoundingClientRect();if(p.setAttribute("width",g.width+"px"),p.setAttribute("height",g.height+"px"),r()){p.style.animation=r();const f=()=>{p.removeEventListener("animationend",f),p.style.animation=""};p.addEventListener("animationend",f)}})},...c},l)}}const te=["neutral","primary","success","danger","warning"],vo=["plain","outline","solid"],xo=["sm","md","lg"],wo=()=>te.map(e=>`
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
`);function W(e,t={}){const{bau:n,css:o}=e,a=o`
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
    ${wo()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=F(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:M("button",t.class,c,r,l,a,d.class),href:u},p)}}const yo="light",Co=()=>te.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function at(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(yo);const l=o`
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
    ${Co()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:f=t.color??"neutral",...h},...v]=F(d);return i({required:"required",title:"Switch Theme",...h,class:M("theme-switch",f,g,p,l,t==null?void 0:t.class,h.class),type:"checkbox",checked:r()=="dark",onclick:w=>{s(w.target.checked?"dark":"light")}},...v)}}function So(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:g,li:f}=n.tags,{svg:h,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,x=W(e,{class:o`
      background: transparent;
    `}),C=at(e),I=()=>s(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},x({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},I()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),A=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},C(),x({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},k(),A())}}function Eo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:h,title:v})=>o({class:n`
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
        `},d(v),r(h.map(({href:w,name:x})=>c(s({href:w},x))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],f=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:f})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.45.0"),i("MIT license")))}}function Se(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Re="0.3s",Pt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(Pt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Ot=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ot(e)(t.children[o]);if(a)return a}},ko=({keyframes:e})=>({hideToLeft:e`
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
   `});function rt(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=R=>{var y;return((y=R.parentTree.data)==null?void 0:y.href)??R.parentTree.children[0].data.href},u=({variant:R,color:y,size:m,currentTree:b,data:S})=>C(T({variant:R,color:y,size:m,href:`${c}${l(b)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:R,color:y,size:m,href:`${c}${S.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},S.name)),d=({size:R,subTree:{data:{name:y,href:m},children:b=[]}})=>T({size:R,href:`${c}${m}`,"data-ischild":!b.length},y),p=({pathname:R,subTree:y})=>{var m;return R===((m=y==null?void 0:y.data)==null?void 0:m.href)},{renderHeader:g=u,renderMenuItem:f=d,isActive:h=p}=t,{li:v,nav:w,div:x,header:C,a:I}=n.tags,k=Ge(e),A=Se(e),T=W(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:B}=ko(e),z=o`
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
  `,K=({children:R,pathnameState:y,variant:m,color:b,size:S})=>A({class:M(m,b,S)},R.map(E=>v({class:()=>M(E.children&&"has-children",h({pathname:y.val,subTree:E})&&"active")},f({variant:m,color:b,size:S,subTree:E})))),ee=({variant:R,color:y,size:m,currentTree:b,pathnameState:S})=>{const{children:E,parentTree:O,data:$,renderList:G}=b;return x({class:M("drillDownMenu",R,y,m)},O&&g({variant:R,color:y,size:m,data:$,currentTree:b}),E&&G?G({renderListDefault:K,children:E,pathnameState:S,variant:R,color:y,size:m}):K({children:E,pathnameState:S,variant:R,color:y,size:m}))},V=({tree:R,pathname:y})=>{let m=Pt({})({...R}),b=Ot(y)(m);return b||(b=m),b},J=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",R=>{const{target:y}=R,m=y.getAttribute("href");if(y.tagName==="A"&&m&&!m.startsWith("http")){let b=m.replace(c,"");r||(b=b.replace(y.hash,"")),J.val=b}}),function(y){const{size:m=t.size??"md",variant:b=t.variant??"plain",color:S=t.color??"neutral",tree:E,...O}=y;let $,G=n.derive(()=>($=V({tree:E,pathname:J.val}),$)),L=1;const _=Q=>{const{dataset:ae}=Q.target;ae.buttonback=="true"?L=-1:ae.ischild=="false"?L=1:ae.ischild=="true"&&(L=0)},X=Q=>{switch(Q){case 1:return`${D} ${Re}`;case-1:return`${B} ${Re}`;default:return""}},ne=Q=>{switch(Q){case 1:return`${B} ${Re} reverse`;case-1:return`${D} ${Re} reverse`;default:return""}};return w({class:M(z,b,S,m,t==null?void 0:t.class,O.class),onclick:_},k({animationHide:()=>X(L),animationShow:()=>ne(L)},n.bind({deps:[G],render:()=>()=>ee({variant:b,color:S,size:m,currentTree:$,pathnameState:J})})))}}const To=()=>te.map(e=>`
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
`);function ve(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${To()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:M("input",t.class,t.size??"md",l,c,i,u.class)})}}function _t(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags,g=ve(e,{variant:"plain",color:"neutral"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:x,children:C,pathnameState:I,variant:k,color:A,size:T})=>{const D=n.state(""),B=n.derive(()=>D.val==""?C:C.filter(V=>V.data.name.match(new RegExp(`${D.val}`,"i")))),z=V=>{D.val=V.target.value},ee=`url('data:image/svg+xml,<svg fill="${getComputedStyle(document.documentElement).getPropertyValue(`--color-${A}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`;return r({class:o`
          display: flex;
          flex-direction: column;
          & .input {
            margin: 0.5rem 1rem;
            padding-left: 1.8rem;
            background-image: ${ee};
            background-repeat: no-repeat;
            background-size: 1rem;
            background-position: 0.3rem;
            fill: red;
          }
        `},g({type:"search",autocomplete:!1,name:"search",autofocus:!0,value:D,placeholder:"Search components",oninput:z}),()=>x({children:B.val,pathnameState:I,variant:k,color:A,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let v=!1;const w=rt(e);return function(){return r({bauMounted:({element:C})=>{s.innerWidth<=640&&(v=!0,i.drawerOpen.val=!1)},onclick:C=>{v&&!C.target.dataset.buttonback&&!C.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:M(o`
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
          `)},w({tree:h}))}}const Ao=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ge(e),r=So(e),c=_t(e),l=Eo(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:g}){return i({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),l())}};function Ue(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...g]=F(r);return a({...p,onclick:d,class:M("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...g)}}function Io(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;W(e);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),s(d),r(p))}}function No(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Do({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:g,size:f})=>r({class:n`
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
                  var(--color-success) ${f/p*100}%
                );
                justify-content: flex-end;
                width: ${f/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},f)));return function({data:g=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Mo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=Io(e),l=No(e),u=W(e);Ue(e);const d=Do(e),p=(...w)=>a({class:n`
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
          `},...w)),g=n``,f=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),d({data:f}),v())}}function Bo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const $o=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Bo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function Po(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),$o(e)()))}}function Oo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Lt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Lt(n)}),e}class kt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const _o="</span>",Tt=e=>!!e.scope,Lo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Ro{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Rt(t)}openNode(t){if(!Tt(t))return;const n=Lo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Tt(t)&&(this.buffer+=_o)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const At=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class st{constructor(){this.rootNode=At(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=At({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{st._collapse(n)}))}}class zo extends st{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Ro(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ae(e){return e?typeof e=="string"?e:e.source:null}function zt(e){return xe("(?=",e,")")}function jo(e){return xe("(?:",e,")*")}function Ho(e){return xe("(?:",e,")?")}function xe(...e){return e.map(n=>Ae(n)).join("")}function Go(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function it(...e){return"("+(Go(e).capture?"":"?:")+e.map(o=>Ae(o)).join("|")+")"}function jt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Uo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Fo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ct(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ae(o),s="";for(;i.length>0;){const r=Fo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Wo=/\b\B/,Ht="[a-zA-Z]\\w*",lt="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Ut="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ft="\\b(0b[01]+)",Vo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=xe(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ie={begin:"\\\\[\\s\\S]",relevance:0},qo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ie]},Xo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ie]},Zo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Fe=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=it("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xe(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Yo=Fe("//","$"),Jo=Fe("/\\*","\\*/"),Qo=Fe("#","$"),ea={scope:"number",begin:Gt,relevance:0},ta={scope:"number",begin:Ut,relevance:0},na={scope:"number",begin:Ft,relevance:0},oa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ie,{begin:/\[/,end:/\]/,relevance:0,contains:[Ie]}]}]},aa={scope:"title",begin:Ht,relevance:0},ra={scope:"title",begin:lt,relevance:0},sa={begin:"\\.\\s*"+lt,relevance:0},ia=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ze=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Wo,IDENT_RE:Ht,UNDERSCORE_IDENT_RE:lt,NUMBER_RE:Gt,C_NUMBER_RE:Ut,BINARY_NUMBER_RE:Ft,RE_STARTERS_RE:Vo,SHEBANG:Ko,BACKSLASH_ESCAPE:Ie,APOS_STRING_MODE:qo,QUOTE_STRING_MODE:Xo,PHRASAL_WORDS_MODE:Zo,COMMENT:Fe,C_LINE_COMMENT_MODE:Yo,C_BLOCK_COMMENT_MODE:Jo,HASH_COMMENT_MODE:Qo,NUMBER_MODE:ea,C_NUMBER_MODE:ta,BINARY_NUMBER_MODE:na,REGEXP_MODE:oa,TITLE_MODE:aa,UNDERSCORE_TITLE_MODE:ra,METHOD_GUARD:sa,END_SAME_AS_BEGIN:ia});function ca(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function la(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ua(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ca,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function da(e,t){Array.isArray(e.illegal)&&(e.illegal=it(...e.illegal))}function pa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ma(e,t){e.relevance===void 0&&(e.relevance=1)}const ga=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=xe(n.beforeMatch,zt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ba=["of","and","for","in","not","or","if","then","parent","list","value"],ha="keyword";function Wt(e,t,n=ha){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Wt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,fa(c[0],c[1])]})}}function fa(e,t){return t?Number(t):va(e)?0:1}function va(e){return ba.includes(e.toLowerCase())}const It={},fe=e=>{console.error(e)},Nt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},we=(e,t)=>{It[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),It[`${e}/${t}`]=!0)},He=new Error;function Vt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=jt(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function xa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),He;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),He;Vt(e,e.begin,{key:"beginScope"}),e.begin=ct(e.begin,{joinWith:""})}}function wa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),He;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),He;Vt(e,e.end,{key:"endScope"}),e.end=ct(e.end,{joinWith:""})}}function ya(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ca(e){ya(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),xa(e),wa(e)}function Sa(e){function t(s,r){return new RegExp(Ae(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=jt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(ct(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[la,pa,Ca,ga].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ua,da,ma].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Wt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ae(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ea(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Kt(e){return e?e.endsWithParent||Kt(e.starts):!1}function Ea(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Kt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var ka="11.8.0";class Ta extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const tt=Rt,Dt=de,Mt=Symbol("nomatch"),Aa=7,qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:zo};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const S=r.languageDetectRe.exec(b);if(S){const E=B(S[1]);return E||(Nt(i.replace("{}",S[1])),Nt("Falling back to no-highlight mode for this block.",m)),E?S[1]:"no-highlight"}return b.split(/\s+/).find(E=>c(E)||B(E))}function u(m,b,S){let E="",O="";typeof b=="object"?(E=m,S=b.ignoreIllegals,O=b.language):(we("10.7.0","highlight(lang, code, ...args) has been deprecated."),we("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=m,E=b),S===void 0&&(S=!0);const $={code:E,language:O};R("before:highlight",$);const G=$.result?$.result:d($.language,$.code,S);return G.code=$.code,R("after:highlight",G),G}function d(m,b,S,E){const O=Object.create(null);function $(N,P){return N.keywords[P]}function G(){if(!j.keywords){oe.addText(Z);return}let N=0;j.keywordPatternRe.lastIndex=0;let P=j.keywordPatternRe.exec(Z),U="";for(;P;){U+=Z.substring(N,P.index);const q=ie.case_insensitive?P[0].toLowerCase():P[0],re=$(j,q);if(re){const[ce,Kn]=re;if(oe.addText(U),U="",O[q]=(O[q]||0)+1,O[q]<=Aa&&(_e+=Kn),ce.startsWith("_"))U+=P[0];else{const qn=ie.classNameAliases[ce]||ce;X(P[0],qn)}}else U+=P[0];N=j.keywordPatternRe.lastIndex,P=j.keywordPatternRe.exec(Z)}U+=Z.substring(N),oe.addText(U)}function L(){if(Z==="")return;let N=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){oe.addText(Z);return}N=d(j.subLanguage,Z,!0,wt[j.subLanguage]),wt[j.subLanguage]=N._top}else N=g(Z,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(_e+=N.relevance),oe.__addSublanguage(N._emitter,N.language)}function _(){j.subLanguage!=null?L():G(),Z=""}function X(N,P){N!==""&&(oe.startScope(P),oe.addText(N),oe.endScope())}function ne(N,P){let U=1;const q=P.length-1;for(;U<=q;){if(!N._emit[U]){U++;continue}const re=ie.classNameAliases[N[U]]||N[U],ce=P[U];re?X(ce,re):(Z=ce,G(),Z=""),U++}}function Q(N,P){return N.scope&&typeof N.scope=="string"&&oe.openNode(ie.classNameAliases[N.scope]||N.scope),N.beginScope&&(N.beginScope._wrap?(X(Z,ie.classNameAliases[N.beginScope._wrap]||N.beginScope._wrap),Z=""):N.beginScope._multi&&(ne(N.beginScope,P),Z="")),j=Object.create(N,{parent:{value:j}}),j}function ae(N,P,U){let q=Uo(N.endRe,U);if(q){if(N["on:end"]){const re=new kt(N);N["on:end"](P,re),re.isMatchIgnored&&(q=!1)}if(q){for(;N.endsParent&&N.parent;)N=N.parent;return N}}if(N.endsWithParent)return ae(N.parent,P,U)}function pe(N){return j.matcher.regexIndex===0?(Z+=N[0],1):(Je=!0,0)}function me(N){const P=N[0],U=N.rule,q=new kt(U),re=[U.__beforeBegin,U["on:begin"]];for(const ce of re)if(ce&&(ce(N,q),q.isMatchIgnored))return pe(P);return U.skip?Z+=P:(U.excludeBegin&&(Z+=P),_(),!U.returnBegin&&!U.excludeBegin&&(Z=P)),Q(U,N),U.returnBegin?0:P.length}function Y(N){const P=N[0],U=b.substring(N.index),q=ae(j,N,U);if(!q)return Mt;const re=j;j.endScope&&j.endScope._wrap?(_(),X(P,j.endScope._wrap)):j.endScope&&j.endScope._multi?(_(),ne(j.endScope,N)):re.skip?Z+=P:(re.returnEnd||re.excludeEnd||(Z+=P),_(),re.excludeEnd&&(Z=P));do j.scope&&oe.closeNode(),!j.skip&&!j.subLanguage&&(_e+=j.relevance),j=j.parent;while(j!==q.parent);return q.starts&&Q(q.starts,N),re.returnEnd?0:P.length}function se(){const N=[];for(let P=j;P!==ie;P=P.parent)P.scope&&N.unshift(P.scope);N.forEach(P=>oe.openNode(P))}let ge={};function xt(N,P){const U=P&&P[0];if(Z+=N,U==null)return _(),0;if(ge.type==="begin"&&P.type==="end"&&ge.index===P.index&&U===""){if(Z+=b.slice(P.index,P.index+1),!a){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=ge.rule,q}return 1}if(ge=P,P.type==="begin")return me(P);if(P.type==="illegal"&&!S){const q=new Error('Illegal lexeme "'+U+'" for mode "'+(j.scope||"<unnamed>")+'"');throw q.mode=j,q}else if(P.type==="end"){const q=Y(P);if(q!==Mt)return q}if(P.type==="illegal"&&U==="")return 1;if(Ye>1e5&&Ye>P.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Z+=U,U.length}const ie=B(m);if(!ie)throw fe(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Vn=Sa(ie);let Ze="",j=E||Vn;const wt={},oe=new r.__emitter(r);se();let Z="",_e=0,be=0,Ye=0,Je=!1;try{if(ie.__emitTokens)ie.__emitTokens(b,oe);else{for(j.matcher.considerAll();;){Ye++,Je?Je=!1:j.matcher.considerAll(),j.matcher.lastIndex=be;const N=j.matcher.exec(b);if(!N)break;const P=b.substring(be,N.index),U=xt(P,N);be=N.index+U}xt(b.substring(be))}return oe.finalize(),Ze=oe.toHTML(),{language:m,value:Ze,relevance:_e,illegal:!1,_emitter:oe,_top:j}}catch(N){if(N.message&&N.message.includes("Illegal"))return{language:m,value:tt(b),illegal:!0,relevance:0,_illegalBy:{message:N.message,index:be,context:b.slice(be-100,be+100),mode:N.mode,resultSoFar:Ze},_emitter:oe};if(a)return{language:m,value:tt(b),illegal:!1,relevance:0,errorRaised:N,_emitter:oe,_top:j};throw N}}function p(m){const b={value:tt(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function g(m,b){b=b||r.languages||Object.keys(t);const S=p(m),E=b.filter(B).filter(K).map(_=>d(_,m,!1));E.unshift(S);const O=E.sort((_,X)=>{if(_.relevance!==X.relevance)return X.relevance-_.relevance;if(_.language&&X.language){if(B(_.language).supersetOf===X.language)return 1;if(B(X.language).supersetOf===_.language)return-1}return 0}),[$,G]=O,L=$;return L.secondBest=G,L}function f(m,b,S){const E=b&&n[b]||S;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function h(m){let b=null;const S=l(m);if(c(S))return;if(R("before:highlightElement",{el:m,language:S}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Ta("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const E=b.textContent,O=S?u(E,{language:S,ignoreIllegals:!0}):g(E);m.innerHTML=O.value,f(m,S,O.language),m.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(m.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),R("after:highlightElement",{el:m,result:O,text:E})}function v(m){r=Dt(r,m)}const w=()=>{I(),we("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){I(),we("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function I(){if(document.readyState==="loading"){C=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function k(){C&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",k,!1);function A(m,b){let S=null;try{S=b(e)}catch(E){if(fe("Language definition for '{}' could not be registered.".replace("{}",m)),a)fe(E);else throw E;S=s}S.name||(S.name=m),t[m]=S,S.rawDefinition=b.bind(null,e),S.aliases&&z(S.aliases,{languageName:m})}function T(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function D(){return Object.keys(t)}function B(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function z(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(S=>{n[S.toLowerCase()]=b})}function K(m){const b=B(m);return b&&!b.disableAutodetect}function ee(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function V(m){ee(m),o.push(m)}function J(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function R(m,b){const S=m;o.forEach(function(E){E[S]&&E[S](b)})}function y(m){return we("10.7.0","highlightBlock will be removed entirely in v12.0"),we("10.7.0","Please use highlightElement now."),h(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:I,highlightElement:h,highlightBlock:y,configure:v,initHighlighting:w,initHighlightingOnLoad:x,registerLanguage:A,unregisterLanguage:T,listLanguages:D,getLanguage:B,registerAliases:z,autoDetection:K,inherit:Dt,addPlugin:V,removePlugin:J}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=ka,e.regex={concat:xe,lookahead:zt,either:it,optional:Ho,anyNumberOfTimes:jo};for(const m in ze)typeof ze[m]=="object"&&Lt(ze[m]);return Object.assign(e,ze),e},Ce=qt({});Ce.newInstance=()=>qt({});var Ia=Ce;Ce.HighlightJS=Ce;Ce.default=Ce;const Te=Oo(Ia),Bt="[A-Za-z$_][0-9A-Za-z$_]*",Na=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Da=["true","false","null","undefined","NaN","Infinity"],Xt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Zt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Yt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ma=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ba=[].concat(Yt,Xt,Zt);function Jt(e){const t=e.regex,n=(b,{after:S})=>{const E="</"+b[0].slice(1);return b.input.indexOf(E,S)!==-1},o=Bt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,S)=>{const E=b[0].length+b.index,O=b.input[E];if(O==="<"||O===","){S.ignoreMatch();return}O===">"&&(n(b,{after:E})||S.ignoreMatch());let $;const G=b.input.substring(E);if($=G.match(/^\s*=/)){S.ignoreMatch();return}if(($=G.match(/^\s+extends\s+/))&&$.index===0){S.ignoreMatch();return}}},r={$pattern:Bt,keyword:Na,literal:Da,built_in:Ba,"variable.language":Ma},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,f,h,v,{match:/\$\d+/},d];p.contains=C.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(C)});const I=[].concat(x,p.contains),k=I.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(I)}]),A={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Xt,...Zt]}},B={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},z={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[A],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ee(b){return t.concat("(?!",b.join("|"),")")}const V={match:t.concat(/\b/,ee([...Yt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},J={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},R={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},A]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[A]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),B,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,f,h,v,x,{match:/\$\d+/},d,D,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},z,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[A,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},J,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[A]},V,K,T,R,{match:/\$[(.]/}]}}function $a(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Pa=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",Jt),Te.registerLanguage("sh",$a),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Oa(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=Pa(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ne(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function Qt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(v,w)=>{let x=null;return(...C)=>{a.clearTimeout(x),x=a.setTimeout(()=>v(...C),w)}},p=o`
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
  `,g=({value:v,id:w,children:x=[]})=>{const C=c({class:()=>u.val==w?"active":"",href:`#${w}`});return C.innerHTML=v,r({class:()=>u.val==w?"active":""},C,x.length>0&&s(x.map(g)))},f=v=>v.tagName.charAt(1),h=({contentEl:v})=>{const w=v.querySelectorAll(l);let x=2,C={},I={children:[]},k=I;const A=k;let T=[k];return[...w].forEach(D=>{const B=f(D);D.setAttribute("id",D.textContent),!D.innerHTML.includes("<button")&&(C={value:D.innerHTML,id:D.id??D.textContent,children:[]},x==B?(I=C,k.children.push(I)):x<B?(T.push(k),k=I,I.children.push(C),I=C):x>B&&(k=T[B-1],T=T.slice(0,B-1),k.children.push(C),I=C),x=B)}),A};return function(...w){let[{size:x=t.size??"md",variant:C=t.variant??"plain",color:I=t.color??"neutral",contentEl:k,...A}]=F(w);const T=h({contentEl:k}),D=d(()=>{const z=[...k.querySelectorAll(l)].find(K=>{const{top:ee,height:V}=K.getBoundingClientRect();if(ee+V>60)return!0});z&&(u.val=z==null?void 0:z.id)},100);return i({...A,class:M("tableOfContent",x,C,I,p,t==null?void 0:t.class,A==null?void 0:A.class),bauMounted:()=>{a.addEventListener("scroll",D)},bauUnmounted:()=>{a.removeEventListener("scroll",D)}},T.children&&s(T.children.map(g)))}}const en=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(s(l(p??""),te.map(g=>l(g)))),i(vo.map(g=>s(l(g),te.map((f,h)=>r(d({color:f,variant:g},{index:h}))))))))}},_a=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},xo.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;Te.registerLanguage("javascript",Jt);const p=Qt(e),g=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),f=en(e),h=_a(e),v=({text:w})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=Te.highlight(w,{language:"js"}).value}}));return function(x){const C=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(x.title),r(x.description),x.gridItem&&[c("Variant/Color"),!x.variantColorTableDisable&&x.gridItem&&g(f({Item:x.gridItem(e)})),c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),x.gridItem&&g(h({item:x.gridItem}))],c("Usage"),l("Import"),v({text:x.importStatement}),c("Examples"),x.examples.map(I=>i(l(I.title),r(I.description),g(I.createComponent(e)({})),v({text:I.code}))));return o({class:n`
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
        `},C,p({contentEl:C}))}};function ut(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      &::after {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::after {
        content: "\u203A";
        padding: 0.5rem;
      }
      &.open::after {
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",Header:f,Content:h,close:v=!0,...w}]=F(u);const x=n.state(v);return a({...w,class:M("collapsible",d,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>M("header",h?x.val?"close":"open":""),onclick:C=>{x.val=!x.val,C.stopPropagation()}},f()),a({class:"content",role:"region",bauMounted:({element:C})=>{x.val&&(C.style.height="0px")},"aria-expanded":({element:C})=>(s({element:C,closeState:x}),!x.val)},h&&h()))}}const La=()=>te.map(e=>`
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
    ${La()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:f=t.color??"neutral",data:h=[],...v}]=F(d);const w=n.state(""),x=ut(e,{size:p,variant:g,color:f}),C=k=>A=>{w.val==k?w.val="":w.val=k},I=k=>{const{Header:A,Content:T,name:D}=k,B=()=>r({class:()=>M(w.val==D&&"active")},c({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:K})=>w.val==D},A(k))),z=()=>a({id:`bau-${D}`,"data-state":({element:K})=>w.val==D},T(k));return s({class:M(f,g,p),onclick:C(D)},x({Header:B,Content:z}))};return a({class:M("accordion",l,t==null?void 0:t.class,v.class)},i(h.map(I)))}}const tn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=We(e,t);return r=>s({...r,data:i})},Ra=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=We(e);return()=>i({data:a,color:"neutral",variant:"outline"})},za=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,nn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},ja=e=>{const{css:t}=e,n=nn(e),o=We(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Ha=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ga=e=>{const{css:t}=e,n=nn(e),o=We(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ua=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Fa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:za,createComponent:Ra},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ha,createComponent:ja},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ua,createComponent:Ga}],gridItem:tn},Wa=e=>{const t=H(e);return()=>t(Fa)},Va={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>te.map(e=>`
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
`);function De(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
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
    ${Ka()}
  `,r=W(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",onRemove:f,...h},...v]=F(u);return a({...h,class:M("alert",`alert-${p}`,t.class,p,g,d,s,h.class),role:"alert"},i({class:"icon"},Va[g]),a({class:"content"},...v),f&&c({onclick:f}))}}const on=(e,t)=>{const n=De(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},qa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=De(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Xa=`import alert from "@grucloud/bau-ui/alert";
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
`,Za=e=>{const{css:t}=e,n=De(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Ya=`import alert from "@grucloud/bau-ui/alert";
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
`,Ja={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Xa,createComponent:qa},{title:"Custom Alert ",description:"A custom alert.",code:Ya,createComponent:Za}],gridItem:on},Qa=e=>{const t=H(e);return()=>t(Ja)},er=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:g})=>{const f=c.val.findIndex(h=>h.id===p);f!=-1&&(c.val[f].status=g)};return function(g={},...f){const h=({id:x})=>{d({id:x,status:"removing"});const C=c.val.findIndex(I=>I.id===x);C!=-1&&c.val.splice(C,1)},v=({Component:x})=>{const C={id:Math.random().toString(10).split(".")[1],Component:x,status:"inserting"};c.val.length>=i&&h({id:c.val[0].id}),c.val.push(C),setTimeout(()=>h(C),s)},w=x=>r({class:u.item,onclick:()=>h(x)},x.Component());return document.addEventListener("alert.add",x=>v(x.detail)),document.addEventListener("alert.remove",x=>h(x.detail)),r({class:M(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),w))}},tr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=er(e,{deleteAfterDuration:2e4}),i=W(e),s=De(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},nr=`import { Context } from "@grucloud/bau-ui/context";
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
`,or={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:nr,createComponent:tr}]},ar=e=>{const t=H(e);return()=>t(or)},rr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ge(e),s=W(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},sr=`import animate from "@grucloud/bau-ui/animate";
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
`,ir=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ge(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},cr=`import animate from "@grucloud/bau-ui/animate";
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
`,lr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:sr,createComponent:rr},{title:"Component hide and show",description:"Hide and show a component",code:cr,createComponent:ir}]},ur=e=>{const t=H(e);return()=>t(lr)};function an(e,t={}){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:f=t.variant??"plain",color:h=t.color??"neutral",width:v=40,height:w=40,...x},...C]=F(p);return a({class:M(u,t==null?void 0:t.class,x.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:v,height:w,onload:c,onerror:l,class:M(h,f,g,u,t==null?void 0:t.class,x.class),...x}))}}const rn=(e,t)=>{const{css:n}=e,o=an(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},dr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=an(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},pr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,mr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:pr,createComponent:dr}],gridItem:rn},gr=e=>{const t=H(e);return()=>t(mr)};function dt(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...g},...f]=F(l);const h=x=>{w.style.opacity=1,w.showModal();const C=d.getBoundingClientRect(),I=w.getBoundingClientRect();C.x<a.innerWidth/2?w.style.left=C.left+"px":w.style.left=C.right-I.width+"px",C.y<a.innerHeight/2?w.style.top=C.top+C.height+"px":(w.style.top=Math.max(0,C.top-I.height)+"px",w.scrollHeight>C.top&&(w.style.height=C.top+"px"))},v=x=>{const C=()=>{w.close(),w.removeEventListener("transitionend",C)};w.addEventListener("transitionend",C),w.style.opacity=0},w=i({role:"presentation",class:M("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:x=>x.target===w&&(v(),p==null?void 0:p.call())},s(u));return w.closeDialog=v,w.openDialog=h,w}}const je={sm:12,md:16,lg:24},br=()=>te.map(e=>`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:g=!0,...f}={}){const h=o`
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
      ${br()}
    `;return i({class:{deps:[g],renderProp:()=>v=>M("spinner",h,d,p,v==!1?"":"visibility",t==null?void 0:t.class,f.class)},version:"1.1",x:"0px",y:"0px",width:je[u],height:je[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...f},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const hr=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function pt(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
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

    ${hr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:g,Option:f,options:h,getOptionLabel:v=({label:Y})=>Y,onSelect:w=()=>{},id:x,required:C,name:I,loading:k,...A},...T]=F(c);const D=dt(e),B=W(e),z=ve(e,{variant:u,color:d,size:l}),K=Se(e),ee=Me(e,{variant:u,color:d,size:l}),V=n.state(A.value);n.derive(()=>{V.val&&(ae.value=v(V.val),w(V.val))});const J=n.state(""),R=n.state(!1),y=n.state(0),m=()=>{R.val=!1},b=n.state(h),S=Y=>se=>Y.val&&v(se)==v(Y.val),E=()=>{me.openDialog(),R.val=!0,J.val="",b.val=h,y.val=h.findIndex(S(V));const Y=pe.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),Q.scrollIntoView({block:"end"}))},O=()=>{me.closeDialog(),R.val=!1,J.val="",y.val=0},$=Y=>{const{value:se}=Y.target;J.val=se,se?b.val=h.filter(ge=>v(ge).match(new RegExp(`${se}`,"i"))):b.val=h},G=Y=>{me.open?O():E()},L=({option:Y,index:se})=>ge=>{V.val=Y,y.val=se,O()},_=()=>{const Y=pe.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},X=Y=>{switch(Y.key){case"Escape":O();break;case"ArrowDown":y.val<b.val.length-1?y.val++:y.val=0,_();break;case"ArrowUp":y.val<=0?y.val=b.val.length-1:y.val--,_();break;case"Enter":me.open?(V.val=b.val[y.val],J.val="",O()):E(),Y.preventDefault();break}},ne=B({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":p,onclick:G,variant:u,color:d,size:l,class:k==!0&&"loading",disabled:k},()=>V.val?v(V.val):p,()=>k==!0&&ee({visibility:k})),Q=z({value:J,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":R,oninput:$,onkeydown:X,...A}),ae=z({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:J,required:C,name:I}),pe=a({class:M(u,d,l,"content")},Q,()=>K({class:M(u,d,l)},b.val.map((Y,se)=>i({class:()=>M(y.val==se&&"active",S(V)(Y)&&"selected"),onclick:L({option:Y,index:se})},f(Y))))),me=D({id:x,triggerEl:ne,contentEl:pe,onClose:m,class:o`
        overflow: hidden;
      `});return a({...A,class:M("autocomplete",s,t==null?void 0:t.class,A==null?void 0:A.class)},ne,ae,me)}}const sn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=pt(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},fr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=pt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},vr=`import { Context } from "@grucloud/bau-ui/context";
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
`,xr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=W(e,{variant:"outline"}),r=pt(e),c=t.state([]),l=t.state(!1),u=t.state("");async function d({url:f,transform:h=v=>v}){try{l.val=!0;const v=await fetch(f,{});if(v.ok){const w=await v.json();c.val=h(w)}else u.val=v.statusText}catch(v){u.val=v.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((h,v)=>h.name.common.localeCompare(v.name.common))});p();const g=f=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(f.flag),i(f.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionLabel:({name:f})=>f.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>p()},"Reload")))},wr=`import { Context } from "@grucloud/bau-ui/context";
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
`,yr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:vr,createComponent:fr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:wr,createComponent:xr}],gridItem:sn},Cr=e=>{const t=H(e);return()=>t(yr)};function cn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:M("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:M(u,l,c)},d),...g)}}const ln=(e,t)=>{const n=cn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Sr=e=>{const{bau:t}=e,{section:n}=t.tags,o=cn(e);return()=>n(o({content:"10"},"☏"))},Er=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,kr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Er,createComponent:Sr}],gridItem:ln},Tr=e=>{const t=H(e);return()=>t(kr)};function un(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,c=W(e),l=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:f=t.color??"neutral",items:h,...v},...w]=F(d);return i({...v,class:M(l,t==null?void 0:t.class,v==null?void 0:v.class)},h.map(({href:x,name:C})=>s((x?c:r)({href:`${a.base}${x}`,color:f,variant:g,size:p,class:M(f,g,p)},C))))}}const dn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=un(e,t);return a=>o({...a,...n})},Ar=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=un(e);return()=>n(a(o))},Ir=`import breadcrumbs, {
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
`,Nr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Ir,createComponent:Ar}],gridItem:dn},Dr=e=>{const t=H(e);return()=>t(Nr)},pn=(e,t={})=>{const n=W(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Br=`import button from "@grucloud/bau-ui/button";
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
`,$r=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Pr=`import button from "@grucloud/bau-ui/button";
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
`,Or={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Br,createComponent:Mr},{title:"Disabled Button",description:"A disabled button.",code:Pr,createComponent:$r}],gridItem:pn},_r=e=>{const t=H(e);return()=>t(Or)},Lr=()=>te.map(e=>`
&.button-group.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-flex;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    & button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${Lr()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const mn=(e,t)=>{const n=["ONE","TWO","THREE"],o=W(e,t),a=mt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=W(e),i=mt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},zr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,jr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:zr,createComponent:Rr}],gridItem:mn},Hr=e=>{const t=H(e);return()=>t(jr)};function gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"date",class:M("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const bn=(e,t)=>{const n=gn(e,t);return o=>n({...o})},Gr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=gn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Ur=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Fr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Ur,createComponent:Gr}],gridItem:bn},Wr=e=>{const t=H(e);return()=>t(Fr)};function Vr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:g,Previous:f,Next:h,...v}]=F(c);const w=()=>{s.val<=0?s.val=p.length-1:s.val--},x=()=>{s.val>=p.length-1?s.val=0:s.val++},C=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(g));return a({...v,class:M("carousel",l,i,t==null?void 0:t.class,v==null?void 0:v.class)},a({class:M("control","control-previous"),onclick:w},f()),a({class:M("control","control-next"),onclick:x},h()),C)}}const Kr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],qr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=W(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Vr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Kr,Slide:s,Previous:c,Next:l}))},Xr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Zr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Xr,createComponent:qr}]},Yr=e=>{const t=H(e);return()=>t(Zr)},hn=(e,t)=>{const n=Ue(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},Jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ue(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Qr=`import chip from "@grucloud/bau-ui/chip";
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
`,es={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Qr,createComponent:Jr}],gridItem:hn},ts=e=>{const t=H(e);return()=>t(es)};function fn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({type:"checkbox",required:"required",...d,class:M(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const vn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=fn(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},ns=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=fn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},os=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,as={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:os,createComponent:ns}],gridItem:vn},rs=e=>{const t=H(e);return()=>t(as)},ss=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=ut(e),i=W(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},is=`import button from "@grucloud/bau-ui/button";
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
`,cs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:is,createComponent:ss}]},ls=e=>{const t=H(e);return()=>t(cs)};function us(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...g]=F(r);return a({class:M(i,t==null?void 0:t.class,p.class)},a({class:()=>M("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>M("content",d.val&&"content-open")},g))}}const ds=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=us(e),s=W(e),r=_t(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},ps=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ms={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ps,createComponent:ds}]},gs=e=>{const t=H(e);return()=>t(ms)},xn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=rt(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},bs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=rt(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},hs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,fs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:hs,createComponent:bs}],gridItem:(e,t)=>xn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},vs=e=>{const t=H(e);return()=>t(fs)};function gt(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",Component:f,disabled:h,...v}=l;return a({class:M(r.base,h&&r.disabled,t==null?void 0:t.class,l.class)},i({class:M(p,g,d)},f({disabled:h}),s({type:"file",disabled:h,...v})))}}const wn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=gt(e,t),p=f=>{const h=f.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:f})=>c({class:M(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,f&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return f=>d({Component:g,name:"file",accept:"text/*",onchange:p,...f})},xs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=gt(e),p=f=>{const h=f.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:f})=>c({class:M(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,f&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:g,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},ws=`import classNames from "@grucloud/bau-css/classNames";
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
`,ys={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ws,createComponent:xs}],gridItem:wn},Cs=e=>{const t=H(e);return()=>t(ys)};function Be(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;

    & > header {
      text-align: center;
      & h1 {
        line-height: 0;
        font-size: 1.3rem;
      }
    }
    & section {
      display: inline-flex;
      flex-direction: column;
      gap: 1rem;
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:M("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}function bt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:g,...f},...h]=F(l);const v=W(e),w=Me(e);return n.bind({deps:[g],render:()=>x=>v({...f,class:M("loadingButton",u,d,p,r,x&&"loading",t==null?void 0:t.class,f==null?void 0:f.class)},w({size:u,variant:d,color:p,visibility:x}),i({class:x&&"loading"},h))})}}const Ss=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=bt(e),d=De(e,{variant:"outline",color:"danger"}),p=ve(e),g=Be(e,{class:n`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),f=Ne(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:v=()=>{}}){const w=t.state(!1),x=t.state("");return f(g({onsubmit:async I=>{const{username:k,password:A}=I.target.elements;I.preventDefault();try{w.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:k.value,password:A.value})});if(T.ok){const D=await T.json();v(D)}else T.status==401?x.val="Invalid username or password":x.val=T.statusText}catch(T){x.val=T.message}finally{w.val=!1}}},s(c({width:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>x.val&&d(x.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:w},"Login"))))}},Es=`import form from "@grucloud/bau-ui/form";
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
`,ks={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:Es,createComponent:Ss}]},Ts=e=>{const t=H(e);return()=>t(ks)},yn=(e,t={})=>{const n=ve(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},As=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ve(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Is=`import input from "@grucloud/bau-ui/input";
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
`,Ns={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Is,createComponent:As}],gridItem:yn},Ds=e=>{const t=H(e);return()=>t(Ns)};function Cn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>te.map(l=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",running:f,...h}]=F(u);return i({...h,role:"progressbar",class:{deps:[f],renderProp:()=>v=>M("linearProgress",d,g,c,v&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const Sn=(e,t)=>{const n=Cn(e,t);return o=>n({...o,running:!0})},Ms=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=W(e),i=Cn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},Bs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,$s={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Bs,createComponent:Ms}],gridItem:Sn},Ps=e=>{const t=H(e);return()=>t($s)},En=(e,t)=>{const n=bt(e,t);return o=>n({...o,loading:!0},"Save")},Os=e=>{const{bau:t}=e,{section:n}=t.tags,o=bt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},_s=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Ls={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:_s,createComponent:Os}],gridItem:En},Rs=e=>{const t=H(e);return()=>t(Ls)},zs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],js=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=Se(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},zs.map(r))},Hs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Gs=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=Se(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Hs.map(r)))},Us=`import list from "@grucloud/bau-ui/list";
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
`,Fs={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Us,createComponent:Gs}],gridItem:js},Ws=e=>{const t=H(e);return()=>t(Fs)};function ht(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...g},...f]=F(l);return a({class:M("modal",r,p,d,u,t==null?void 0:t.class,g==null?void 0:g.class)},i(...f))}}const kn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=W(e),c=ht(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},Vs=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=W(e),l=ht(e),u=()=>o(Array(10).fill("").map((p,g)=>s(g+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Ks=`import modal from "@grucloud/bau-ui/modal";
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
`,qs={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ks,createComponent:Vs}],gridItem:kn},Xs=e=>{const t=H(e);return()=>t(qs)},Zs=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=W(e),r=dt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},Ys=`import popover from "@grucloud/bau-ui/popover";
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
`,Js={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ys,createComponent:Zs}]},Qs=e=>{const t=H(e);return()=>t(Js)};function ei(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:g,href:f})=>s({href:`${a.base}${f}`},r({class:"sublabel"},d),i({class:`label ${d}`},g??p));return function(...p){let[{size:g=t.size??"md",variant:f=t.variant??"plain",color:h=t.color??"neutral",data:v={},...w}]=F(p);const{next:x,previous:C}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...w,class:M("paginationNavigation",g,l,t==null?void 0:t.class,w==null?void 0:w.class)},(C==null?void 0:C.href)&&u({text:"Previous"})(C),(x==null?void 0:x.href)&&u({text:"Next"})(x))}}const ti=e=>{const{bau:t}=e,{section:n}=t.tags,o=ei(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ni=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,oi={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ni,createComponent:ti}]},ai=e=>{const t=H(e);return()=>t(oi)},ri=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},si=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},ii=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,ci={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:ii,createComponent:si}],variantColorTableDisable:!0,gridItem:ri},li=e=>{const t=H(e);return()=>t(ci)};function Tn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=F(c);return a({...p,type:"radio",class:M("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const An=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Tn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},ui=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Tn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},di=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,pi={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:di,createComponent:ui}],gridItem:An},mi=e=>{const t=H(e);return()=>t(pi)},gi=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ve(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=W(e),l=dt(e),u=Se(e),d=o`
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
    ${gi()}
  `;return function(...g){let[{size:f=t.size??"md",variant:h=t.variant??"outline",color:v=t.color??"neutral",label:w,Option:x,options:C,getOptionLabel:I=({label:E})=>E,...k},...A]=F(g);const T=n.state(k.value),D=n.state(!1),B=n.state(0),z=()=>{b.openDialog(),b.focus(),D.val=!0},K=()=>{b.closeDialog(),D.val=!1},ee=()=>{D.val=!1},V=E=>{b.open?K():z(),E.preventDefault()},J=({option:E,index:O})=>$=>{T.val=I(E),S.value=T.val,S.setCustomValidity(""),B.val=O,K(),$.preventDefault()},R=E=>{switch(E.preventDefault(),E.key){case"Escape":K();break;case"ArrowDown":B.val<C.length-1?B.val++:B.val=0;break;case"ArrowUp":B.val<=0?B.val=C.length-1:B.val--;break;case"Enter":b.open?(T.val=I(C[B.val]),K()):z();break}},y=()=>u({tabindex:"0",class:M(v,h)},C.map((E,O)=>i({class:()=>M(B.val==O&&"active"),onclick:J({option:E,index:O})},x(E)))),m=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":D,"aria-label":w,onclick:V,color:v,variant:h,size:f},()=>!T.val&&w,T),b=l({triggerEl:m,contentEl:y(),onClose:ee}),S=s(k,r({value:""},"--Select Category--"),C.map(E=>r(I(E))));return S.value=k.value,a({...k,class:M("select",v,f,d,t==null?void 0:t.class,k==null?void 0:k.class),onkeydown:R},S,m,b)}}const In=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ve(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Select a country..."})},bi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ve(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},hi=`import select from "@grucloud/bau-ui/select";
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
`,fi=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Ve(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},vi=`import select from "@grucloud/bau-ui/select";
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
`,xi={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:hi,createComponent:bi},{title:"Select AWS region",description:"Select the AWS region",code:vi,createComponent:fi}],gridItem:In},wi=e=>{const t=H(e);return()=>t(xi)};function Nn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("select-native",u,c,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Dn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Nn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},yi=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Nn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},Ci=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Si={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Ci,createComponent:yi}],gridItem:Dn},Ei=e=>{const t=H(e);return()=>t(Si)};function Ke(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>te.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"range",class:M("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...g)}}const Mn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ke(e);return i=>a({...i,oninput:o})},ki=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ke(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Ti=`import slider from "@grucloud/bau-ui/slider";
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
`,Ai=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},Ii=`import slider from "@grucloud/bau-ui/slider";
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
`,Ni=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},Di=`import slider from "@grucloud/bau-ui/slider";
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
`,Mi={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Ti,createComponent:ki},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ii,createComponent:Ai},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Di,createComponent:Ni}],gridItem:Mn},Bi=e=>{const t=H(e);return()=>t(Mi)},Bn=(e,t)=>{const n=Me(e,t);return o=>n({...o})},$i=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=Me(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Pi=`import spinner from "@grucloud/bau-ui/spinner";
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
`,Oi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Pi,createComponent:$i}],gridItem:Bn},_i=e=>{const t=H(e);return()=>t(Oi)},Li=()=>te.map(e=>`
`).join(`
`);function $n(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,span:r}=n.tags,c=o`
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
    ${Li()}
  `;return function(...u){let[{color:d,variant:p="plain",size:g,stepperDefs:f=[],activeStepIndex:h,...v},...w]=F(u);const x=n.state(f.map((A,T)=>({...A,index:T}))),C=n.derive(()=>x.val[h.val]),I=A=>{const{Header:T,disabled:D,name:B,index:z}=A;return s({class:()=>M(C.val.name==B&&"active",h.val<z&&"not-completed",h.val>z&&"completed",D&&"disabled")},r({class:"step-number"},z+1),r({class:"step-label"},()=>T(A)))};return a({class:M("stepper",p,g,d,c,t==null?void 0:t.class,v.class)},n.loop(x,i(),I),n.bind({deps:[C],render:()=>A=>A.Content?A.Content({}):""}))}}const Ri=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=$n(e),r=W(e),c=({name:f})=>f,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),g())},zi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ji=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=W(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},qe=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},Xe=e=>{const{bau:t}=e,{i:n}=t.tags,o=W(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},le="https://github.com/grucloud/grucloud/",ue="main",Hi={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:le,branch:ue,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:le,branch:ue,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:le,branch:ue,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:le,branch:ue,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:le,branch:ue,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:le,branch:ue,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:le,branch:ue,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:le,branch:ue,directory:"examples/google/dns/github-page"}]},Gi=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},Ui=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=W(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},Fi=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=W(e),c=Be(e),l=Xe(e),u=qe(e),d=Ui(e),p=Gi(e),g=Se(e),f=ht(e);return function({providerName:v,onclickPrevious:w,onclickImportExistingInfra:x,onclickImportFromTemplate:C}){const I=f({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(g(Hi[v].map(k=>p({project:k,onclickItem:A=>()=>{I.close(),C(A)}})))),s(r({variant:"outline",onclick:()=>{I.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{x()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{I.showModal()}})),I,u(l({onclick:w})))}},Wi=e=>{const{bau:t}=e,{span:n}=t.tags,o=Ve(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},Vi=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=W(e),l=ve(e),u=Be(e),d=Xe(e),p=qe(e),g=Wi(e);return function({onclickPrevious:h,onclickNext:v}){return u({name:"form-config-aws",onsubmit:x=>{x.preventDefault(),v()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",g({name:"region"}))),p(d({onclick:h}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},Ki=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:g,div:f}=t.tags,h=W(e),v=Xe(e),w=qe(e),x=ve(e),C=Be(e);return function({onclickPrevious:k,onclickNext:A}){const T=B=>{B.preventDefault(),A()},D=n`
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
    `;return C({name:"form-config-azure",onsubmit:T,"data-infra-create":!0,class:D},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",g("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",x({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",g("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",x({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",g("APP_ID")," and ",g("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),f({class:n`
                  display: inline-flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",x({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",x({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),w(v({onclick:k}),h({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},qi=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:g,a:f,table:h,tbody:v,th:w,tr:x,td:C}=t.tags,{svg:I,use:k}=t.tagsNS("http://www.w3.org/2000/svg"),A=gt(e),T=W(e),D=Be(e),B=Xe(e),z=qe(e);return function({onclickPrevious:ee,onclickNext:V}){const J=t.state("No file selected"),R=t.state({}),y=t.state(!0),m=$=>{const G=$.target.files[0];if(G){J.val=G.name;const L=new FileReader;L.readAsText(G),L.onload=()=>{try{debugger;if(L.result){const _=JSON.parse(L.result);R.val=_,_.project_id&&(y.val=!1)}}catch{}},L.onerror=()=>{console.log(L.error)}}else J.val=""},b=({fileName:$,content:G})=>h({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},v(x(w("Credential File"),C($)),x(w("Project Name"),C(G.project_id)),x(w("Service Account"),C(G.client_email)))),S=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},I({width:100,height:100,fill:"currentColor"},k({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),E=$=>{$.preventDefault(),V()},O=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return D({name:"form-config-google",class:O,onsubmit:E,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",f({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",g("CREATE SERVICE ACCOUNT"),""),d("Set the ",g("Service account name")," to 'grucloud' for instance"),d("Click on ",g("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",g("CONTINUE"),""),d("Click on ",g("DONE"),""),d("Go to the ",g("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",g("Manage keys"),""),d("Click on ",g("ADD KEYS"),", then ",g("Create new key"),""),d("Click on ",g("CREATE")," to download the credential file in JSON format.")),A({"data-input-google-upload":!0,Component:S,name:"file",accept:"application/JSON",onchange:m}),()=>b({fileName:J.val,content:R.val})),z(B({onclick:ee}),()=>T({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},Xi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=$n(e),r=ji(e),c=Vi(e),l=Ki(e),u=qi(e),d=Fi(e),p=t.state(""),g=t.state(0),f=({name:h})=>h;return function(){const v=T=>()=>{p.val=T,g.val++},w=()=>{g.val++},x=()=>{g.val++},I=[{name:"Provider Selection",Header:f,Content:()=>r({onclickProvider:v}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:k,onclickImportExistingInfra:w,onclickImportFromTemplate:x})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:k,onclickNext:A});case"Azure":return l({onclickPrevious:k,onclickNext:A});case"Google":return u({onclickPrevious:k,onclickNext:A})}}},{name:"Scan",Header:f,Content:()=>a(i("My stepper 3 Content"))}],k=()=>{g.val>0&&g.val--},A=()=>{I.length>g.val+1&&g.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:I,activeStepIndex:g}))}},Zi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Yi={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:zi,createComponent:Ri},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Zi,createComponent:Xi}]},Ji=e=>{const t=H(e);return()=>t(Yi)},Qi=()=>te.map(e=>`
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
`);function Pn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Qi()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const On=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=Pn(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},ec=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=Pn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},tc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,nc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:tc,createComponent:ec}],gridItem:On},oc=e=>{const t=H(e);return()=>t(nc)},ac=()=>te.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function $e(e,t={}){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    & > ul {
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
    ${ac()}
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...f},...h]=F(u);const v=n.state(a),w=n.state(a[0]),x=k=>v.val.find(A=>A.name==k),C=k=>{const{Header:A,disabled:T,name:D}=k;return r({class:()=>M(w.val.name==D&&"active",T&&"disabled"),onclick:B=>B.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:D},bubbles:!0}))},A(k))},I=i({class:M("tabs",p,d,g,c,t==null?void 0:t.class,f.class)},n.loop(v,s(),C),()=>w.val.Content?w.val.Content({}):"");return I.addEventListener("tab.select",k=>{var D,B;const{tabName:A}=k.detail,T=x(A);T&&((D=w.val.exit)==null||D.call(),w.val=T,(B=T.enter)==null||B.call())},!1),I.addEventListener("tab.add",k=>{var T;const{tab:A}=k.detail;(T=A.enter)==null||T.call(),v.val.push(A)},!1),I.addEventListener("tab.remove",k=>{var T;const A=v.val.findIndex(D=>D.name==k.detail.tabName);A>0&&((T=v.val[A].exit)==null||T.call(),v.val.splice(A,1))},!1),I}}const _n=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=$e(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},rc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=$e(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},sc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ic=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=$e(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},cc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ln=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},lc=e=>{const{css:t}=e,n=$e(e,{tabDefs:Ln(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},uc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,dc=e=>{const{css:t}=e,n=Ln(e),o=$e(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},pc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,mc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:sc,createComponent:rc},{title:"Extended Tabs",description:"An extended tabs.",code:cc,createComponent:ic},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:uc,createComponent:lc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:pc,createComponent:dc}],gridItem:_n},gc=e=>{const t=H(e);return()=>t(mc)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=F(c);return i({...l,class:M("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const bc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(v,w,x,C,I){return{name:v,calories:w,fat:x,carbs:C,protein:I}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:v,calories:w})=>s(i(v),i({class:n`
            text-align: right;
          `},w)),f=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),f(),l(p.map(g)))))},hc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const fc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],vc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:h})=>s(i(f),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),p(),l(fc.map(d)))))},xc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const wc=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],yc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:h})=>s(i(f),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),p(),l(wc.map(d)))))},Cc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Sc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:hc,createComponent:bc},{title:"Dense",description:"A dense table.",code:xc,createComponent:vc},{title:"Zebra",description:"A zebra table.",code:Cc,createComponent:yc}]},Ec=e=>{const t=H(e);return()=>t(Sc)},kc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=Qt(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Tc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Ac={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Tc,createComponent:kc}]},Ic=e=>{const t=H(e);return()=>t(Ac)};function Rn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=mt(e),s=W(e),r=Me(e),c=o`
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
  `,l=({label:f,icon:h,...v})=>s({"aria-label":f,title:f,...v},h),u=({count:f,totalCount:h,page:v,rowsPerPage:w})=>a({class:"pages-numbers"},Number(v-1)*Number(w)+(f>0?1:0),"-",Math.min(v*w,h)," of ",h),d=({count:f,page:h,rowsPerPage:v})=>a({class:"pages-numbers"},(h-1)*v+(f>0?1:0),"-",h*v),p=f=>f<=1,g=(f,h,v)=>f>=Math.ceil(h/v);return function(...h){let[{size:v=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",count:C=0,totalCount:I=0,page:k=1,rowsPerPage:A=50,onPageChange:T,isLoading:D=!1,disableFirst:B=()=>p(k),disablePrevious:z=()=>p(k),disableNext:K=()=>g(k,I,A),disableLast:ee=()=>g(k,I,A),...V},...J]=F(h);const R=Math.max(0,Math.ceil(I/A)),y=T({page:1}),m=T({page:k-1}),b=T({page:k+1}),S=T({page:R}),E=[{label:"First",icon:"⟪",onclick:y,disabled:B()},{label:"Previous",icon:"⟨",onclick:m,disabled:z()},{label:"Next",icon:"⟩",onclick:b,disabled:K()},{label:"Last",icon:"⟫",onclick:S,disabled:ee()}];return a({...V,class:M("table-pagination",c,D&&"disabled",t==null?void 0:t.class,V==null?void 0:V.class)},r({class:"spinner",visibility:D,size:"md"}),I>0?u({count:C,totalCount:I,page:k,maxPages:R,rowsPerPage:A}):d({count:C,page:k,maxPages:R,rowsPerPage:A}),i({variant:w,color:x},E.map(O=>l({...O,variant:w,color:x}))))}}const Nc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Dc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Nc(45),u=({name:x,email:C})=>i(a(x),a(C)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Rn(e),g=Pe(e,{class:n`
      max-width: 650px;
    `}),f=t.state(l),h=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=t.derive(()=>f.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),w=({page:x})=>C=>{h.val.page=x};return()=>g(s(d(),()=>c(v.val.map(u))),()=>p({...h.val,onPageChange:w}))},Mc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),g=t.derive(()=>d.val.length),f=t.state(1),h=t.state(10),v=t.derive(()=>d.val),w=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,x=({page:B})=>z=>{f.val=B,C(w({page:B,per_page:h.val}))};C(w({page:1,per_page:h.val}));async function C(B){try{u.val=!0;const z=await fetch(B,{});if(z.ok){const K=await z.json();d.val=K;return}throw z}catch(z){p.val=z.message}finally{u.val=!1}}const I=({name:B,description:z,stargazers_count:K})=>i(a(B),a(z),a({class:n`
            text-align: right;
          `},K)),k=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),A=Rn(e),T=Pe(e,{class:n`
      min-width: 650px;
    `}),D=({message:B})=>l(B);return()=>T(()=>A({rowsPerPage:h.val,page:f.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:x,disableNext:()=>!1}),s(k(),()=>p.val&&D({message:p.val}),()=>c(v.val.map(I))))},Bc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=Dc(e),l=Mc(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Oe(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:g,onChange:f,...h},...v]=F(c);return i({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>w=>w},class:{deps:[p],renderProp:()=>w=>M("toggle",l,d,u,s,w&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:g},v)}}const zn=(e,t)=>{const{bau:n}=e,o=Oe(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},$c=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Pc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Oc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Pc,createComponent:$c}],gridItem:zn},_c=e=>{const t=H(e);return()=>t(Oc)},Lc=()=>te.map(e=>`
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
`);function ft(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Lc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...f]=F(r);const h=new Set,v=w=>{const{value:x}=w.target;d?(h.clear(),h.add(x)):h.has(x)?h.delete(x):h.add(x),p({event:w,values:[...h]})};return a({...g,class:M("toggle-group",c,u,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v},...f)}}const jn=(e,t)=>{const{bau:n}=e,o=ft(e,t),a=Oe(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},Rc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},zc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,jc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Hc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Gc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:zc,createComponent:Rc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Hc,createComponent:jc}],gridItem:jn},Uc=e=>{const t=H(e);return()=>t(Gc)};function vt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...f},...h]=F(c);const v=i({class:M("container",...u.split("-"))},i({class:M("content",g,p,d),role:"tooltip"},l)),w=T=>`move-to-${T}`,x=(T,D,B)=>{if(T()){const z=w(D);v.classList.add(z),v.classList.add(D),v.classList.remove(B)}},C=(T,D)=>{const B=w(T);v.classList.contains(B)&&(v.classList.remove(B),v.classList.add(D),v.classList.remove(T))},I=T=>{const D=v.getBoundingClientRect();x(()=>D.x<0,"right","left"),x(()=>D.x+D.width>a.innerWidth,"left","right"),x(()=>D.y<0,"bottom","top"),x(()=>D.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},k=T=>{v.classList.remove("visible"),C("right","left"),C("left","right"),C("bottom","top"),C("top","bottom")};return i({...f,class:M("tooltip",s,t==null?void 0:t.class,f==null?void 0:f.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",I),T.addEventListener("mouseout",k)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",I),T.removeEventListener("mouseout",k)}},...h,v)}}const Hn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=W(e),r=vt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Fc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=W(e),s=vt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Wc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Vc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ue(e,{variant:"outline",color:"primary"}),c=vt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Kc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,qc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Wc,createComponent:Fc},{title:"Grid",description:"Various tooltip position",code:Kc,createComponent:Vc}],gridItem:Hn},Xc=e=>{const t=H(e);return()=>t(qc)},Gn=(e,t)=>{const n=at(e,t);return o=>n(o)},Zc=e=>{const{bau:t}=e,{section:n}=t.tags,o=at(e);return()=>n(o({}))},Yc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Jc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Yc,createComponent:Zc}],gridItem:Gn},Qc=e=>{const t=H(e);return()=>t(Jc)},el=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Un(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=el({css:o,createGlobalStyles:a}),d=ut(e),p=({depth:g=1,maxDepth:f,color:h,variant:v,size:w})=>x=>{const{children:C,expanded:I}=x,k=n.state(!I),A=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:D=>{C&&(k.val=!k.val)}},i(x.data)),T=()=>s({class:M(h,w)},C.map(p({depth:g+1,maxDepth:f})));return r(d({size:w,Header:A,Content:C&&g<f&&T}))};return function({tree:f,maxDepth:h=1/0,size:v=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",...C}){return c({class:M(u.nav,v,w,x,t==null?void 0:t.class,C.class)},f.children&&s(f.children.map(p({maxDepth:h,color:x,variant:w,size:v}))))}}const Fn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Un(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},tl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Un(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},nl=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,ol={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:nl,createComponent:tl}],gridItem:Fn},al=e=>{const t=H(e);return()=>t(ol)},rl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=en(e),u=W(e),d=[{name:"Accordion",Item:tn(e)},{name:"Alert",Item:on(e)},{name:"Autocomplete",Item:sn(e)},{name:"Avatar",Item:rn(e)},{name:"Badge",Item:ln(e)},{name:"Breadcrumbs",Item:dn(e)},{name:"Button",Item:pn(e)},{name:"Button Group",Item:mn(e)},{name:"Calendar",Item:bn(e)},{name:"Checkbox",Item:vn(e)},{name:"Chip",Item:hn(e)},{name:"DrillDown Menu",Item:xn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:wn(e)},{name:"Input",Item:yn(e)},{name:"Linear Progress",Item:Sn(e)},{name:"Loading Button",Item:En(e)},{name:"Modal",Item:kn(e)},{name:"Radio Button",Item:An(e)},{name:"Select",Item:In(e)},{name:"Select Native",Item:Dn(e)},{name:"Slider",Item:Mn(e)},{name:"Spinner",Item:Bn(e)},{name:"Switch",Item:On(e)},{name:"Tabs",Item:_n(e)},{name:"Theme Switch",Item:Gn(e)},{name:"Toggle",Item:zn(e)},{name:"Toggle Group",Item:jn(e)},{name:"Tooltip",Item:Hn(e)},{name:"Tree View",Item:Fn(e)}];return()=>o({class:n`
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
            `},l(p))))},sl=({context:e})=>{const t=rl(e);return[{path:"",action:n=>({title:"Bau UI",component:Mo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Oa(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Wa(e)})},{path:"alert",action:()=>({title:"Alert",component:Qa(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ar(e)})},{path:"animate",action:()=>({title:"Animate",component:ur(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Cr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:gr(e)})},{path:"badge",action:()=>({title:"Badge",component:Tr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Dr(e)})},{path:"button",action:()=>({title:"Button",component:_r(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Hr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Wr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Yr(e)})},{path:"chip",action:()=>({title:"Chip",component:ts(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:rs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ls(e)})},{path:"drawer",action:()=>({title:"Drawer",component:gs(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:vs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Cs(e)})},{path:"form",action:()=>({title:"Form",component:Ts(e)})},{path:"input",action:()=>({title:"Input",component:Ds(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Ps(e)})},{path:"list",action:()=>({title:"List",component:Ws(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Rs(e)})},{path:"modal",action:()=>({title:"Modal",component:Xs(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:ai(e)})},{path:"paper",action:()=>({title:"Paper",component:li(e)})},{path:"popover",action:()=>({title:"Popover",component:Qs(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:mi(e)})},{path:"select",action:()=>({title:"Select",component:wi(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:Ei(e)})},{path:"slider",action:()=>({title:"Slider",component:Bi(e)})},{path:"spinner",action:()=>({title:"Spinner",component:_i(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Ji(e)})},{path:"switch",action:()=>({title:"Switch",component:oc(e)})},{path:"table",action:()=>({title:"Table",component:Ec(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:Ic(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Bc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:gc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:_c(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Uc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Xc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Qc(e)})},{path:"treeView",action:()=>({title:"Tree View",component:al(e)})}]},{path:"pages",action:n=>({title:"Pages",component:Po(e)})}]},il=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),cl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},ll=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};co();const Wn={title:"Bau",base:"/bau/bau-ui"},he=fo({config:Wn}),{bau:ul}=he;he.states={drawerOpen:ul.state(!0)};ll(he);Jn({routes:sl({context:he}),onLocationChange:cl({context:he,LayoutDefault:Ao(he),config:Wn}),notFoundRoute:il(he)});
