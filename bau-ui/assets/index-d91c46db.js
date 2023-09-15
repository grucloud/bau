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
  `}function co(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ot=e=>Object.prototype.toString.call(e??0).slice(8,-1),lo=e=>ot(e)=="Object",St=e=>ot(e)=="Function",Qe=e=>["Object","Array"].includes(ot(e)),Et=Object.getPrototypeOf,et=e=>we(e)?e.val:e,we=e=>e==null?void 0:e.__isState,uo=["splice","push","pop","shift","unshift","sort","reverse"],Le=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const W=e=>!we(e[0])&&lo(e[0])?e:[{},...e];function po(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,g,v)=>{let S=r;r=g;let E=y(v);return r=S,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,g,v,S,E,P)=>{var $;if(s){i.add(y);return}for(let K of y.bindings){let{deps:R,element:_,renderInferred:q,render:Q,renderItem:ee}=K;if(ee&&g)($=b(_,S,(...ae)=>h(ee(...ae)),v,E,P)[g])==null||$.call();else{let ae=q?q({element:_}):Q({element:_,renderItem:ee})(...R.map(et));ae!==_&&_.replaceWith(K.element=h(ae))}}C(y),u()},p=(y,g,v=[])=>({get(S,E,P){var $;if(r==null||r.add(y),E==="_isProxy")return!0;if(!(($=S[E])!=null&&$._isProxy)&&!we(S[E])&&Qe(S[E]))S[E]=new Proxy(S[E],p(y,g,[...v,E]));else if(uo.includes(E)){let K=S[E];return(...R)=>{let _=K.apply(S,R);return d(y,E,_,R,g,v),_}}return Reflect.get(S,E,P)},set(S,E,P,$){let K=Reflect.set(S,E,P,$);return d(y,"setItem",K,{prop:E,value:P},g,[...v,E]),K}}),m=(y,g)=>new Proxy(g,p(y,g)),b=(y,g,v,S,E,P)=>{let $=()=>y.replaceChildren(...Le(S,v)),K=R=>y[R]&&y.removeChild(y[R]);return{assign:$,sort:$,reverse:$,setItem:()=>{var _;let R=P[0];(_=y.children[R])==null||_.replaceWith(v(E[R],R))},push:()=>y.append(...Le(g,(R,_)=>v(R,E.length+_))),unshift:()=>y.prepend(...Le(g,v)),pop:()=>K("lastChild"),shift:()=>K("firstChild"),splice:()=>{let[R,_,...q]=g;const{length:Q}=y.children;for(let ee=R>=0?Math.min(R+_-1,Q-1):Q-1;ee>=(R>=0?R:Q+R);ee--)y.children[ee].remove();if(q.length){let ee=q.forEach((ae,pe)=>v(ae,R+pe));y.children[R]?y.children[R].after(...ee):y.append(...ee)}}}},f=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=Qe(y)?m(g,y):y,g.valProxy)},set val(g){let v=this,S=v.val;Qe(g)?(v.valProxy=m(v,g),d(v,"assign",g)):g!==S&&(v.valProxy=g,d(v)),v.oldVal=S}}),h=y=>{if(y==null||y===!1){const g=c("span");return g.style.display="none",g}else return y.nodeType?y:n.createTextNode(y)},w=(y,g)=>{let v=new Set;return g.val=l(y,v),v},x=y=>{let g=f(),v=w(y,g);g.computed=!0;for(let S of v)S.listeners.push({computed:y,deps:v,state:g});return g},C=y=>{for(let g of[...y.listeners])w(g.computed,g.state)},A=(y,...g)=>{if(g.length){let v=[];for(let S of g.flat(1/0))S!=null&&v.push(we(S)?L({deps:[S],render:()=>E=>E}):St(S)?ne({renderInferred:S}):h(S));y.append(...v)}},k={},I=(y,g)=>y&&(Object.getOwnPropertyDescriptor(y,g)??I(Et(y),g)),T=(y,g,v)=>{var S;return k[y+","+g]??(k[y+","+g]=((S=I(v,g))==null?void 0:S.set)??0)},M=(y,g)=>new t.MutationObserver((v,S)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(P=>P===y&&(g({element:y}),S.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),B=(y,g)=>new t.MutationObserver((v,S)=>v.forEach(E=>g({record:E,element:y}))).observe(y,{childList:!0}),j=y=>new Proxy(function(v,...S){var K;let[E,...P]=W(S),$=y?n.createElementNS(y,v):c(v);for(let[R,_]of Object.entries(E)){if(R.startsWith("bau"))continue;let q=T(v,R,Et($))?Q=>$[R]=Q:Q=>$.setAttribute(R,Q);_==null||(we(_)?L({deps:[_],render:()=>()=>(q(_.val),$)}):St(_)&&(!R.startsWith("on")||_.isDerived)?ne({renderInferred:()=>(q(_({element:$})),$)}):_.renderProp?L({deps:_.deps,render:()=>()=>(q(_.renderProp({element:$})(..._.deps.map(et))),$)}):q(_))}return E.bauChildMutated&&B($,E.bauChildMutated),A($,...P),(K=E.bauCreated)==null||K.call(E,{element:$}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:$})),E.bauUnmounted&&t.requestAnimationFrame(()=>M($,E.bauUnmounted)),$},{get:(g,v)=>g.bind(void 0,v)}),Z=(y,g,v)=>{y.element=h(v);for(let S of g)we(S)&&(a.add(S),S.bindings.push(y));return y.element},ne=({renderInferred:y,element:g})=>{let v=new Set,S=l(y,v,{element:g});return Z({renderInferred:y},v,S)},L=({deps:y,element:g,render:v,renderItem:S})=>Z({deps:y,render:v,renderItem:S},y,v({element:g,renderItem:S})(...y.map(et))),U=(y,g,v)=>L({deps:[y],render:({renderItem:S})=>E=>(g.append(...Le(E,S)),g),renderItem:v}),H=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:j(),tagsNS:j,state:f,bind:L,loop:U,derive:x,stateSet:a,batch:H}}const mo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},go=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},bo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function ho(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=bo(a,i),r=mo(s);return!t.getElementById(r)&&go(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function fo(e){const t=po(),n=ho();return io(n),{bau:t,...n,tr:o=>o,window,...e}}function D(...e){return e.filter(t=>t).join(" ")}function Ge(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:D("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const m=p.cloneNode(!0);m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=p.getAttribute("width"),m.style.height=p.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),u.target.appendChild(m),m.addEventListener("animationend",()=>{var b;return(b=m.parentNode)==null?void 0:b.removeChild(m)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const m=p.getBoundingClientRect();if(p.setAttribute("width",m.width+"px"),p.setAttribute("height",m.height+"px"),r()){p.style.animation=r();const b=()=>{p.removeEventListener("animationend",b),p.style.animation=""};p.addEventListener("animationend",b)}})},...c},l)}}const te=["neutral","primary","success","danger","warning"],vo=["plain","outline","solid"],xo=["sm","md","lg"],wo=()=>te.map(e=>`
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
`);function V(e,t={}){const{bau:n,css:o}=e,a=o`
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
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=W(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:D("button",t.class,c,r,l,a,d.class),href:u},p)}}const yo="light",Co=()=>te.map(e=>`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:b=t.color??"neutral",...f},...h]=W(d);return i({required:"required",title:"Switch Theme",...f,class:D("theme-switch",b,m,p,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:r()=="dark",onclick:w=>{s(w.target.checked?"dark":"light")}},...h)}}function So(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:m,li:b}=n.tags,{svg:f,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,x=V(e,{class:o`
      background: transparent;
    `}),C=at(e),A=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},x({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},A()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),I=()=>l({class:o`
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
        `},k(),I())}}function Eo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:f,title:h})=>o({class:n`
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
        `},d(h),r(f.map(({href:w,name:x})=>c(s({href:w},x))))),m=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],b=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:m}),p({title:"Bau Ecosystem",links:b})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.45.0"),i("MIT license")))}}function Ce(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=W(r);return a({...d,class:D("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Re="0.3s",Pt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(Pt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Ot=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ot(e)(t.children[o]);if(a)return a}},ko=({keyframes:e})=>({hideToLeft:e`
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
   `});function rt(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=L=>{var U;return((U=L.parentTree.data)==null?void 0:U.href)??L.parentTree.children[0].data.href},u=({variant:L,color:U,size:H,currentTree:y,data:g})=>C(T({variant:L,color:U,size:H,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:L,color:U,size:H,href:`${c}${g.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},g.name)),d=({size:L,subTree:{data:{name:U,href:H},children:y=[]}})=>T({size:L,href:`${c}${H}`,"data-ischild":!y.length},U),p=({pathname:L,subTree:U})=>{var H;return L===((H=U==null?void 0:U.data)==null?void 0:H.href)},{renderHeader:m=u,renderMenuItem:b=d,isActive:f=p}=t,{li:h,nav:w,div:x,header:C,a:A}=n.tags,k=Ge(e),I=Ce(e),T=V(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:B}=ko(e),j=o`
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
  `,Z=({variant:L,color:U,size:H,currentTree:y,pathnameState:g})=>{const{children:v,parentTree:S,data:E}=y;return x({class:D("drillDownMenu",L,U,H)},S&&m({variant:L,color:U,size:H,data:E,currentTree:y}),v&&I({class:D(L,U,H)},v.map(P=>h({class:()=>D(P.children&&"has-children",f({pathname:g.val,subTree:P})&&"active")},b({variant:L,color:U,size:H,subTree:P})))))},ne=({tree:L,pathname:U})=>{let H=Pt({})(structuredClone(L)),y=Ot(U)(H);return y||(console.error("drilldown no sub tree",U),y=H),y};return function(U){const{size:H=t.size??"md",variant:y=t.variant??"plain",color:g=t.color??"neutral",tree:v,...S}=U,E=n.state(a.location.pathname.replace(c,"")),P=n.derive(()=>ne({tree:v,pathname:E.val}));a.document.addEventListener("click",q=>{const{target:Q}=q,ee=Q.getAttribute("href");if(Q.tagName==="A"&&ee&&!ee.startsWith("http")){let ae=ee.replace(c,"");r||(ae=ae.replace(Q.hash,"")),E.val=ae}});let $=1;const K=q=>{const{dataset:Q}=q.target;Q.buttonback=="true"?$=-1:Q.ischild=="false"?$=1:Q.ischild=="true"&&($=0)},R=q=>{switch(q){case 1:return`${M} ${Re}`;case-1:return`${B} ${Re}`;default:return""}},_=q=>{switch(q){case 1:return`${B} ${Re} reverse`;case-1:return`${M} ${Re} reverse`;default:return""}};return w({class:D(j,y,g,H,t==null?void 0:t.class,S.class),onclick:K},k({animationHide:()=>R($),animationShow:()=>_($)},()=>Z({variant:y,color:g,size:H,currentTree:P.val,pathnameState:E})))}}const To={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function _t(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags;let m=!1;const b=rt(e);return function(){return r({bauMounted:({element:h})=>{s.innerWidth<=640&&(m=!0,i.drawerOpen.val=!1)},onclick:h=>{m&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:D(o`
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
          `)},b({tree:To}))}}const Ao=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ge(e),r=So(e),c=_t(e),l=Eo(e),u=a`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...m]=W(r);return a({...p,onclick:d,class:D("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...m)}}function Io(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;V(e);const c=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Do({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:m,size:b})=>r({class:n`
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
                  var(--color-success) ${b/p*100}%
                );
                justify-content: flex-end;
                width: ${b/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},b)));return function({data:m=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Mo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=Io(e),l=No(e),u=V(e);Ue(e);const d=Do(e),p=(...w)=>a({class:n`
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
          `},...w)),m=n``,b=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:m},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),d({data:b}),h())}}function Bo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const $o=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Bo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function Po(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),$o(e)()))}}function Oo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Lt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Lt(n)}),e}class kt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const _o="</span>",Tt=e=>!!e.scope,Lo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Ro{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Rt(t)}openNode(t){if(!Tt(t))return;const n=Lo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Tt(t)&&(this.buffer+=_o)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const At=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class st{constructor(){this.rootNode=At(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=At({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{st._collapse(n)}))}}class zo extends st{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Ro(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ae(e){return e?typeof e=="string"?e:e.source:null}function zt(e){return ve("(?=",e,")")}function jo(e){return ve("(?:",e,")*")}function Ho(e){return ve("(?:",e,")?")}function ve(...e){return e.map(n=>Ae(n)).join("")}function Go(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function it(...e){return"("+(Go(e).capture?"":"?:")+e.map(o=>Ae(o)).join("|")+")"}function jt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Uo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Fo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ct(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ae(o),s="";for(;i.length>0;){const r=Fo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Wo=/\b\B/,Ht="[a-zA-Z]\\w*",lt="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Ut="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ft="\\b(0b[01]+)",Vo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ve(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ie={begin:"\\\\[\\s\\S]",relevance:0},qo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ie]},Xo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ie]},Zo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Fe=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=it("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ve(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Yo=Fe("//","$"),Jo=Fe("/\\*","\\*/"),Qo=Fe("#","$"),ea={scope:"number",begin:Gt,relevance:0},ta={scope:"number",begin:Ut,relevance:0},na={scope:"number",begin:Ft,relevance:0},oa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ie,{begin:/\[/,end:/\]/,relevance:0,contains:[Ie]}]}]},aa={scope:"title",begin:Ht,relevance:0},ra={scope:"title",begin:lt,relevance:0},sa={begin:"\\.\\s*"+lt,relevance:0},ia=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ze=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Wo,IDENT_RE:Ht,UNDERSCORE_IDENT_RE:lt,NUMBER_RE:Gt,C_NUMBER_RE:Ut,BINARY_NUMBER_RE:Ft,RE_STARTERS_RE:Vo,SHEBANG:Ko,BACKSLASH_ESCAPE:Ie,APOS_STRING_MODE:qo,QUOTE_STRING_MODE:Xo,PHRASAL_WORDS_MODE:Zo,COMMENT:Fe,C_LINE_COMMENT_MODE:Yo,C_BLOCK_COMMENT_MODE:Jo,HASH_COMMENT_MODE:Qo,NUMBER_MODE:ea,C_NUMBER_MODE:ta,BINARY_NUMBER_MODE:na,REGEXP_MODE:oa,TITLE_MODE:aa,UNDERSCORE_TITLE_MODE:ra,METHOD_GUARD:sa,END_SAME_AS_BEGIN:ia});function ca(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function la(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ua(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ca,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function da(e,t){Array.isArray(e.illegal)&&(e.illegal=it(...e.illegal))}function pa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ma(e,t){e.relevance===void 0&&(e.relevance=1)}const ga=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ve(n.beforeMatch,zt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ba=["of","and","for","in","not","or","if","then","parent","list","value"],ha="keyword";function Wt(e,t,n=ha){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Wt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,fa(c[0],c[1])]})}}function fa(e,t){return t?Number(t):va(e)?0:1}function va(e){return ba.includes(e.toLowerCase())}const It={},fe=e=>{console.error(e)},Nt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},xe=(e,t)=>{It[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),It[`${e}/${t}`]=!0)},He=new Error;function Vt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=jt(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function xa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),He;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),He;Vt(e,e.begin,{key:"beginScope"}),e.begin=ct(e.begin,{joinWith:""})}}function wa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),He;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),He;Vt(e,e.end,{key:"endScope"}),e.end=ct(e.end,{joinWith:""})}}function ya(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ca(e){ya(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),xa(e),wa(e)}function Sa(e){function t(s,r){return new RegExp(Ae(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=jt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(ct(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[la,pa,Ca,ga].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ua,da,ma].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Wt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ae(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ea(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Kt(e){return e?e.endsWithParent||Kt(e.starts):!1}function Ea(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Kt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var ka="11.8.0";class Ta extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const tt=Rt,Dt=de,Mt=Symbol("nomatch"),Aa=7,qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:zo};function c(g){return r.noHighlightRe.test(g)}function l(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const S=r.languageDetectRe.exec(v);if(S){const E=B(S[1]);return E||(Nt(i.replace("{}",S[1])),Nt("Falling back to no-highlight mode for this block.",g)),E?S[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||B(E))}function u(g,v,S){let E="",P="";typeof v=="object"?(E=g,S=v.ignoreIllegals,P=v.language):(xe("10.7.0","highlight(lang, code, ...args) has been deprecated."),xe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=g,E=v),S===void 0&&(S=!0);const $={code:E,language:P};H("before:highlight",$);const K=$.result?$.result:d($.language,$.code,S);return K.code=$.code,H("after:highlight",K),K}function d(g,v,S,E){const P=Object.create(null);function $(N,O){return N.keywords[O]}function K(){if(!z.keywords){oe.addText(Y);return}let N=0;z.keywordPatternRe.lastIndex=0;let O=z.keywordPatternRe.exec(Y),F="";for(;O;){F+=Y.substring(N,O.index);const X=ie.case_insensitive?O[0].toLowerCase():O[0],re=$(z,X);if(re){const[ce,Kn]=re;if(oe.addText(F),F="",P[X]=(P[X]||0)+1,P[X]<=Aa&&(_e+=Kn),ce.startsWith("_"))F+=O[0];else{const qn=ie.classNameAliases[ce]||ce;q(O[0],qn)}}else F+=O[0];N=z.keywordPatternRe.lastIndex,O=z.keywordPatternRe.exec(Y)}F+=Y.substring(N),oe.addText(F)}function R(){if(Y==="")return;let N=null;if(typeof z.subLanguage=="string"){if(!t[z.subLanguage]){oe.addText(Y);return}N=d(z.subLanguage,Y,!0,wt[z.subLanguage]),wt[z.subLanguage]=N._top}else N=m(Y,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(_e+=N.relevance),oe.__addSublanguage(N._emitter,N.language)}function _(){z.subLanguage!=null?R():K(),Y=""}function q(N,O){N!==""&&(oe.startScope(O),oe.addText(N),oe.endScope())}function Q(N,O){let F=1;const X=O.length-1;for(;F<=X;){if(!N._emit[F]){F++;continue}const re=ie.classNameAliases[N[F]]||N[F],ce=O[F];re?q(ce,re):(Y=ce,K(),Y=""),F++}}function ee(N,O){return N.scope&&typeof N.scope=="string"&&oe.openNode(ie.classNameAliases[N.scope]||N.scope),N.beginScope&&(N.beginScope._wrap?(q(Y,ie.classNameAliases[N.beginScope._wrap]||N.beginScope._wrap),Y=""):N.beginScope._multi&&(Q(N.beginScope,O),Y="")),z=Object.create(N,{parent:{value:z}}),z}function ae(N,O,F){let X=Uo(N.endRe,F);if(X){if(N["on:end"]){const re=new kt(N);N["on:end"](O,re),re.isMatchIgnored&&(X=!1)}if(X){for(;N.endsParent&&N.parent;)N=N.parent;return N}}if(N.endsWithParent)return ae(N.parent,O,F)}function pe(N){return z.matcher.regexIndex===0?(Y+=N[0],1):(Je=!0,0)}function me(N){const O=N[0],F=N.rule,X=new kt(F),re=[F.__beforeBegin,F["on:begin"]];for(const ce of re)if(ce&&(ce(N,X),X.isMatchIgnored))return pe(O);return F.skip?Y+=O:(F.excludeBegin&&(Y+=O),_(),!F.returnBegin&&!F.excludeBegin&&(Y=O)),ee(F,N),F.returnBegin?0:O.length}function J(N){const O=N[0],F=v.substring(N.index),X=ae(z,N,F);if(!X)return Mt;const re=z;z.endScope&&z.endScope._wrap?(_(),q(O,z.endScope._wrap)):z.endScope&&z.endScope._multi?(_(),Q(z.endScope,N)):re.skip?Y+=O:(re.returnEnd||re.excludeEnd||(Y+=O),_(),re.excludeEnd&&(Y=O));do z.scope&&oe.closeNode(),!z.skip&&!z.subLanguage&&(_e+=z.relevance),z=z.parent;while(z!==X.parent);return X.starts&&ee(X.starts,N),re.returnEnd?0:O.length}function se(){const N=[];for(let O=z;O!==ie;O=O.parent)O.scope&&N.unshift(O.scope);N.forEach(O=>oe.openNode(O))}let ge={};function xt(N,O){const F=O&&O[0];if(Y+=N,F==null)return _(),0;if(ge.type==="begin"&&O.type==="end"&&ge.index===O.index&&F===""){if(Y+=v.slice(O.index,O.index+1),!a){const X=new Error(`0 width match regex (${g})`);throw X.languageName=g,X.badRule=ge.rule,X}return 1}if(ge=O,O.type==="begin")return me(O);if(O.type==="illegal"&&!S){const X=new Error('Illegal lexeme "'+F+'" for mode "'+(z.scope||"<unnamed>")+'"');throw X.mode=z,X}else if(O.type==="end"){const X=J(O);if(X!==Mt)return X}if(O.type==="illegal"&&F==="")return 1;if(Ye>1e5&&Ye>O.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=F,F.length}const ie=B(g);if(!ie)throw fe(i.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Vn=Sa(ie);let Ze="",z=E||Vn;const wt={},oe=new r.__emitter(r);se();let Y="",_e=0,be=0,Ye=0,Je=!1;try{if(ie.__emitTokens)ie.__emitTokens(v,oe);else{for(z.matcher.considerAll();;){Ye++,Je?Je=!1:z.matcher.considerAll(),z.matcher.lastIndex=be;const N=z.matcher.exec(v);if(!N)break;const O=v.substring(be,N.index),F=xt(O,N);be=N.index+F}xt(v.substring(be))}return oe.finalize(),Ze=oe.toHTML(),{language:g,value:Ze,relevance:_e,illegal:!1,_emitter:oe,_top:z}}catch(N){if(N.message&&N.message.includes("Illegal"))return{language:g,value:tt(v),illegal:!0,relevance:0,_illegalBy:{message:N.message,index:be,context:v.slice(be-100,be+100),mode:N.mode,resultSoFar:Ze},_emitter:oe};if(a)return{language:g,value:tt(v),illegal:!1,relevance:0,errorRaised:N,_emitter:oe,_top:z};throw N}}function p(g){const v={value:tt(g),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(g),v}function m(g,v){v=v||r.languages||Object.keys(t);const S=p(g),E=v.filter(B).filter(Z).map(_=>d(_,g,!1));E.unshift(S);const P=E.sort((_,q)=>{if(_.relevance!==q.relevance)return q.relevance-_.relevance;if(_.language&&q.language){if(B(_.language).supersetOf===q.language)return 1;if(B(q.language).supersetOf===_.language)return-1}return 0}),[$,K]=P,R=$;return R.secondBest=K,R}function b(g,v,S){const E=v&&n[v]||S;g.classList.add("hljs"),g.classList.add(`language-${E}`)}function f(g){let v=null;const S=l(g);if(c(S))return;if(H("before:highlightElement",{el:g,language:S}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new Ta("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const E=v.textContent,P=S?u(E,{language:S,ignoreIllegals:!0}):m(E);g.innerHTML=P.value,b(g,S,P.language),g.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(g.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),H("after:highlightElement",{el:g,result:P,text:E})}function h(g){r=Dt(r,g)}const w=()=>{A(),xe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){A(),xe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function A(){if(document.readyState==="loading"){C=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function k(){C&&A()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",k,!1);function I(g,v){let S=null;try{S=v(e)}catch(E){if(fe("Language definition for '{}' could not be registered.".replace("{}",g)),a)fe(E);else throw E;S=s}S.name||(S.name=g),t[g]=S,S.rawDefinition=v.bind(null,e),S.aliases&&j(S.aliases,{languageName:g})}function T(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function M(){return Object.keys(t)}function B(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function j(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(S=>{n[S.toLowerCase()]=v})}function Z(g){const v=B(g);return v&&!v.disableAutodetect}function ne(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function L(g){ne(g),o.push(g)}function U(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function H(g,v){const S=g;o.forEach(function(E){E[S]&&E[S](v)})}function y(g){return xe("10.7.0","highlightBlock will be removed entirely in v12.0"),xe("10.7.0","Please use highlightElement now."),f(g)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:A,highlightElement:f,highlightBlock:y,configure:h,initHighlighting:w,initHighlightingOnLoad:x,registerLanguage:I,unregisterLanguage:T,listLanguages:M,getLanguage:B,registerAliases:j,autoDetection:Z,inherit:Dt,addPlugin:L,removePlugin:U}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=ka,e.regex={concat:ve,lookahead:zt,either:it,optional:Ho,anyNumberOfTimes:jo};for(const g in ze)typeof ze[g]=="object"&&Lt(ze[g]);return Object.assign(e,ze),e},ye=qt({});ye.newInstance=()=>qt({});var Ia=ye;ye.HighlightJS=ye;ye.default=ye;const Te=Oo(Ia),Bt="[A-Za-z$_][0-9A-Za-z$_]*",Na=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Da=["true","false","null","undefined","NaN","Infinity"],Xt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Zt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Yt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ma=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ba=[].concat(Yt,Xt,Zt);function Jt(e){const t=e.regex,n=(v,{after:S})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,S)!==-1},o=Bt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,S)=>{const E=v[0].length+v.index,P=v.input[E];if(P==="<"||P===","){S.ignoreMatch();return}P===">"&&(n(v,{after:E})||S.ignoreMatch());let $;const K=v.input.substring(E);if($=K.match(/^\s*=/)){S.ignoreMatch();return}if(($=K.match(/^\s+extends\s+/))&&$.index===0){S.ignoreMatch();return}}},r={$pattern:Bt,keyword:Na,literal:Da,built_in:Ba,"variable.language":Ma},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,b,f,h,{match:/\$\d+/},d];p.contains=C.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(C)});const A=[].concat(x,p.contains),k=A.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(A)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Xt,...Zt]}},B={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},j={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},Z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ne(v){return t.concat("(?!",v.join("|"),")")}const L={match:t.concat(/\b/,ne([...Yt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},U={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},H={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),B,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,b,f,h,x,{match:/\$\d+/},d,M,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},U,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},L,Z,T,H,{match:/\$[(.]/}]}}function $a(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Pa=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",Jt),Te.registerLanguage("sh",$a),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=W(r);return a({...d,class:D("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function Qt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(h,w)=>{let x=null;return(...C)=>{a.clearTimeout(x),x=a.setTimeout(()=>h(...C),w)}},p=o`
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
  `,m=({value:h,id:w,children:x=[]})=>{const C=c({class:()=>u.val==w?"active":"",href:`#${w}`});return C.innerHTML=h,r({class:()=>u.val==w?"active":""},C,x.length>0&&s(x.map(m)))},b=h=>h.tagName.charAt(1),f=({contentEl:h})=>{const w=h.querySelectorAll(l);let x=2,C={},A={children:[]},k=A;const I=k;let T=[k];return[...w].forEach(M=>{const B=b(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(C={value:M.innerHTML,id:M.id??M.textContent,children:[]},x==B?(A=C,k.children.push(A)):x<B?(T.push(k),k=A,A.children.push(C),A=C):x>B&&(k=T[B-1],T=T.slice(0,B-1),k.children.push(C),A=C),x=B)}),I};return function(...w){let[{size:x=t.size??"md",variant:C=t.variant??"plain",color:A=t.color??"neutral",contentEl:k,...I}]=W(w);const T=f({contentEl:k}),M=d(()=>{const j=[...k.querySelectorAll(l)].find(Z=>{const{top:ne,height:L}=Z.getBoundingClientRect();if(ne+L>60)return!0});j&&(u.val=j==null?void 0:j.id)},100);return i({...I,class:D("tableOfContent",x,C,A,p,t==null?void 0:t.class,I==null?void 0:I.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},T.children&&s(T.children.map(m)))}}const en=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(s(l(p??""),te.map(m=>l(m)))),i(vo.map(m=>s(l(m),te.map((b,f)=>r(d({color:b,variant:m},{index:f}))))))))}},_a=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},xo.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},G=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;Te.registerLanguage("javascript",Jt);const p=Qt(e),m=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),b=en(e),f=_a(e),h=({text:w})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=Te.highlight(w,{language:"js"}).value}}));return function(x){const C=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(x.title),r(x.description),x.gridItem&&[c("Variant/Color"),!x.variantColorTableDisable&&x.gridItem&&m(b({Item:x.gridItem(e)})),c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),x.gridItem&&m(f({item:x.gridItem}))],c("Usage"),l("Import"),h({text:x.importStatement}),c("Examples"),x.examples.map(A=>i(l(A.title),r(A.description),m(A.createComponent(e)({})),h({text:A.code}))));return o({class:n`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:m=t.color??"neutral",Header:b,Content:f,close:h=!0,...w}]=W(u);const x=n.state(h);return a({...w,class:D("collapsible",d,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>D("header",f?x.val?"close":"open":""),onclick:C=>{x.val=!x.val,C.stopPropagation()}},b()),a({class:"content",role:"region",bauMounted:({element:C})=>{x.val&&(C.style.height="0px")},"aria-expanded":({element:C})=>(s({element:C,closeState:x}),!x.val)},f&&f()))}}const La=()=>te.map(e=>`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:b=t.color??"neutral",data:f=[],...h}]=W(d);const w=n.state(""),x=ut(e,{size:p,variant:m,color:b}),C=k=>I=>{w.val==k?w.val="":w.val=k},A=k=>{const{Header:I,Content:T,name:M}=k,B=()=>r({class:()=>D(w.val==M&&"active")},c({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:Z})=>w.val==M},I(k))),j=()=>a({id:`bau-${M}`,"data-state":({element:Z})=>w.val==M},T(k));return s({class:D(b,m,p),onclick:C(M)},x({Header:B,Content:j}))};return a({class:D("accordion",l,t==null?void 0:t.class,h.class)},i(f.map(A)))}}const tn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=We(e,t);return r=>s({...r,data:i})},Ra=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=We(e);return()=>i({data:a,color:"neutral",variant:"outline"})},za=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Fa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:za,createComponent:Ra},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ha,createComponent:ja},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ua,createComponent:Ga}],gridItem:tn},Wa=e=>{const t=G(e);return()=>t(Fa)},Va={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>te.map(e=>`
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
  `,r=V(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",onRemove:b,...f},...h]=W(u);return a({...f,class:D("alert",`alert-${p}`,t.class,p,m,d,s,f.class),role:"alert"},i({class:"icon"},Va[m]),a({class:"content"},...h),b&&c({onclick:b}))}}const on=(e,t)=>{const n=De(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},qa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=De(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Xa=`import alert from "@grucloud/bau-ui/alert";
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
`,Ja={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Xa,createComponent:qa},{title:"Custom Alert ",description:"A custom alert.",code:Ya,createComponent:Za}],gridItem:on},Qa=e=>{const t=G(e);return()=>t(Ja)},er=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:m})=>{const b=c.val.findIndex(f=>f.id===p);b!=-1&&(c.val[b].status=m)};return function(m={},...b){const f=({id:x})=>{d({id:x,status:"removing"});const C=c.val.findIndex(A=>A.id===x);C!=-1&&c.val.splice(C,1)},h=({Component:x})=>{const C={id:Math.random().toString(10).split(".")[1],Component:x,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(C),setTimeout(()=>f(C),s)},w=x=>r({class:u.item,onclick:()=>f(x)},x.Component());return document.addEventListener("alert.add",x=>h(x.detail)),document.addEventListener("alert.remove",x=>f(x.detail)),r({class:D(u.stack,t==null?void 0:t.class,m.class)},n.loop(c,r(),w))}},tr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=er(e,{deleteAfterDuration:2e4}),i=V(e),s=De(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},nr=`import { Context } from "@grucloud/bau-ui/context";
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
`,or={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:nr,createComponent:tr}]},ar=e=>{const t=G(e);return()=>t(or)},rr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ge(e),s=V(e),r=n`
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
`,lr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:sr,createComponent:rr},{title:"Component hide and show",description:"Hide and show a component",code:cr,createComponent:ir}]},ur=e=>{const t=G(e);return()=>t(lr)};function an(e,t={}){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...p){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",width:h=40,height:w=40,...x},...C]=W(p);return a({class:D(u,t==null?void 0:t.class,x.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:h,height:w,onload:c,onerror:l,class:D(f,b,m,u,t==null?void 0:t.class,x.class),...x}))}}const rn=(e,t)=>{const{css:n}=e,o=an(e,{...t,class:n`
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
`,mr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:pr,createComponent:dr}],gridItem:rn},gr=e=>{const t=G(e);return()=>t(mr)};function dt(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...m},...b]=W(l);const f=x=>{w.style.opacity=1,w.showModal();const C=d.getBoundingClientRect(),A=w.getBoundingClientRect();C.x<a.innerWidth/2?w.style.left=C.left+"px":w.style.left=C.right-A.width+"px",C.y<a.innerHeight/2?w.style.top=C.top+C.height+"px":(w.style.top=Math.max(0,C.top-A.height)+"px",w.scrollHeight>C.top&&(w.style.height=C.top+"px"))},h=x=>{const C=()=>{w.close(),w.removeEventListener("transitionend",C)};w.addEventListener("transitionend",C),w.style.opacity=0},w=i({role:"presentation",class:D("popover",r,t==null?void 0:t.class,m==null?void 0:m.class),onclick:x=>x.target===w&&(h(),p==null?void 0:p.call())},s(u));return w.closeDialog=h,w.openDialog=f,w}}const br=()=>te.map(e=>`
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
`);function Se(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${br()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:D("input",t.class,t.size??"md",l,c,i,u.class)})}}const je={sm:12,md:16,lg:24},hr=()=>te.map(e=>`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:m=!0,...b}={}){const f=o`
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
      ${hr()}
    `;return i({class:{deps:[m],renderProp:()=>h=>D("spinner",f,d,p,h==!1?"":"visibility",t==null?void 0:t.class,b.class)},version:"1.1",x:"0px",y:"0px",width:je[u],height:je[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...b},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const fr=()=>te.map(e=>`
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

    ${fr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:m,Option:b,options:f,getOptionLabel:h=({label:J})=>J,onSelect:w=()=>{},id:x,required:C,name:A,loading:k,...I},...T]=W(c);const M=dt(e),B=V(e),j=Se(e,{variant:u,color:d,size:l}),Z=Ce(e),ne=Me(e,{variant:u,color:d,size:l}),L=n.state(I.value);n.derive(()=>{L.val&&(ae.value=h(L.val),w(L.val))});const U=n.state(""),H=n.state(!1),y=n.state(0),g=()=>{H.val=!1},v=n.state(f),S=J=>se=>J.val&&h(se)==h(J.val),E=()=>{me.openDialog(),H.val=!0,U.val="",v.val=f,y.val=f.findIndex(S(L));const J=pe.querySelector("li.selected");J&&(J.scrollIntoView({block:"center"}),ee.scrollIntoView({block:"end"}))},P=()=>{me.closeDialog(),H.val=!1,U.val="",y.val=0},$=J=>{const{value:se}=J.target;U.val=se,se?v.val=f.filter(ge=>h(ge).match(new RegExp(`${se}`,"i"))):v.val=f},K=J=>{me.open?P():E()},R=({option:J,index:se})=>ge=>{L.val=J,y.val=se,P()},_=()=>{const J=pe.querySelector("li.active");J&&J.scrollIntoView({block:"center",behavior:"smooth"})},q=J=>{switch(J.key){case"Escape":P();break;case"ArrowDown":y.val<v.val.length-1?y.val++:y.val=0,_();break;case"ArrowUp":y.val<=0?y.val=v.val.length-1:y.val--,_();break;case"Enter":me.open?(L.val=v.val[y.val],U.val="",P()):E(),J.preventDefault();break}},Q=B({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":H,"aria-label":p,onclick:K,variant:u,color:d,size:l,class:k==!0&&"loading",disabled:k},()=>L.val?h(L.val):p,()=>k==!0&&ne({visibility:k})),ee=j({value:U,placeholder:m,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":H,oninput:$,onkeydown:q,...I}),ae=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:U,required:C,name:A}),pe=a({class:D(u,d,l,"content")},ee,()=>Z({class:D(u,d,l)},v.val.map((J,se)=>i({class:()=>D(y.val==se&&"active",S(L)(J)&&"selected"),onclick:R({option:J,index:se})},b(J))))),me=M({id:x,triggerEl:Q,contentEl:pe,onClose:g,class:o`
        overflow: hidden;
      `});return a({...I,class:D("autocomplete",s,t==null?void 0:t.class,I==null?void 0:I.class)},Q,ae,me)}}const sn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=pt(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},vr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=pt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},xr=`import { Context } from "@grucloud/bau-ui/context";
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
`,wr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=V(e,{variant:"outline"}),r=pt(e),c=t.state([]),l=t.state(!1),u=t.state("");async function d({url:b,transform:f=h=>h}){try{l.val=!0;const h=await fetch(b,{});if(h.ok){const w=await h.json();c.val=f(w)}else u.val=h.statusText}catch(h){u.val=h.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((f,h)=>f.name.common.localeCompare(h.name.common))});p();const m=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:m,getOptionLabel:({name:b})=>b.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>p()},"Reload")))},yr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:xr,createComponent:vr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:yr,createComponent:wr}],gridItem:sn},Sr=e=>{const t=G(e);return()=>t(Cr)};function cn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=W(r);return a({...p,class:D("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:D(u,l,c)},d),...m)}}const ln=(e,t)=>{const n=cn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Er=e=>{const{bau:t}=e,{section:n}=t.tags,o=cn(e);return()=>n(o({content:"10"},"☏"))},kr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Tr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:kr,createComponent:Er}],gridItem:ln},Ar=e=>{const t=G(e);return()=>t(Tr)};function un(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,c=V(e),l=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:b=t.color??"neutral",items:f,...h},...w]=W(d);return i({...h,class:D(l,t==null?void 0:t.class,h==null?void 0:h.class)},f.map(({href:x,name:C})=>s((x?c:r)({href:`${a.base}${x}`,color:b,variant:m,size:p,class:D(b,m,p)},C))))}}const dn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=un(e,t);return a=>o({...a,...n})},Ir=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=un(e);return()=>n(a(o))},Nr=`import breadcrumbs, {
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
`,Dr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Nr,createComponent:Ir}],gridItem:dn},Mr=e=>{const t=G(e);return()=>t(Dr)},pn=(e,t={})=>{const n=V(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Br=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},$r=`import button from "@grucloud/bau-ui/button";
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
`,Pr=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Or=`import button from "@grucloud/bau-ui/button";
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
`,_r={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:$r,createComponent:Br},{title:"Disabled Button",description:"A disabled button.",code:Or,createComponent:Pr}],gridItem:pn},Lr=e=>{const t=G(e);return()=>t(_r)},Rr=()=>te.map(e=>`
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
    ${Rr()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=W(r);return a({...d,class:D("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const mn=(e,t)=>{const n=["ONE","TWO","THREE"],o=V(e,t),a=mt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},zr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=V(e),i=mt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},jr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Hr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:jr,createComponent:zr}],gridItem:mn},Gr=e=>{const t=G(e);return()=>t(Hr)};function gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=W(c);return a({...p,type:"date",class:D("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const bn=(e,t)=>{const n=gn(e,t);return o=>n({...o})},Ur=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=gn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Fr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Wr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Fr,createComponent:Ur}],gridItem:bn},Vr=e=>{const t=G(e);return()=>t(Wr)};function Kr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:m,Previous:b,Next:f,...h}]=W(c);const w=()=>{s.val<=0?s.val=p.length-1:s.val--},x=()=>{s.val>=p.length-1?s.val=0:s.val++},C=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(m));return a({...h,class:D("carousel",l,i,t==null?void 0:t.class,h==null?void 0:h.class)},a({class:D("control","control-previous"),onclick:w},b()),a({class:D("control","control-next"),onclick:x},f()),C)}}const qr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Xr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=V(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Kr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:qr,Slide:s,Previous:c,Next:l}))},Zr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Yr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Zr,createComponent:Xr}]},Jr=e=>{const t=G(e);return()=>t(Yr)},hn=(e,t)=>{const n=Ue(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},Qr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ue(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},es=`import chip from "@grucloud/bau-ui/chip";
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
`,ts={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:es,createComponent:Qr}],gridItem:hn},ns=e=>{const t=G(e);return()=>t(ts)};function fn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=W(r);return a({type:"checkbox",required:"required",...d,class:D(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const vn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=fn(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},os=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=fn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},as=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,rs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:as,createComponent:os}],gridItem:vn},ss=e=>{const t=G(e);return()=>t(rs)},is=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=ut(e),i=V(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},cs=`import button from "@grucloud/bau-ui/button";
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
`,ls={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:cs,createComponent:is}]},us=e=>{const t=G(e);return()=>t(ls)};function ds(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...m]=W(r);return a({class:D(i,t==null?void 0:t.class,p.class)},a({class:()=>D("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>D("content",d.val&&"content-open")},m))}}const ps=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ds(e),s=V(e),r=_t(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},ms=`import drawer from "@grucloud/bau-ui/drawer";
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
`,gs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ms,createComponent:ps}]},bs=e=>{const t=G(e);return()=>t(gs)},xn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=rt(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},hs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=rt(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},fs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,vs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:fs,createComponent:hs}],gridItem:(e,t)=>xn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},xs=e=>{const t=G(e);return()=>t(vs)};function gt(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",Component:b,disabled:f,...h}=l;return a({class:D(r.base,f&&r.disabled,t==null?void 0:t.class,l.class)},i({class:D(p,m,d)},b({disabled:f}),s({type:"file",disabled:f,...h})))}}const wn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=gt(e,t),p=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:b})=>c({class:D(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return b=>d({Component:m,name:"file",accept:"text/*",onchange:p,...b})},ws=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=gt(e),p=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:b})=>c({class:D(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:m,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},ys=`import classNames from "@grucloud/bau-css/classNames";
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
`,Cs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ys,createComponent:ws}],gridItem:wn},Ss=e=>{const t=G(e);return()=>t(Cs)};function Be(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=W(r);return a({...p,class:D("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}function bt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:m,...b},...f]=W(l);const h=V(e),w=Me(e);return n.bind({deps:[m],render:()=>x=>h({...b,class:D("loadingButton",u,d,p,r,x&&"loading",t==null?void 0:t.class,b==null?void 0:b.class)},w({size:u,variant:d,color:p,visibility:x}),i({class:x&&"loading"},f))})}}const Es=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=bt(e),d=De(e,{variant:"outline",color:"danger"}),p=Se(e),m=Be(e,{class:n`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),b=Ne(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:h=()=>{}}){const w=t.state(!1),x=t.state("");return b(m({onsubmit:async A=>{const{username:k,password:I}=A.target.elements;A.preventDefault();try{w.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:k.value,password:I.value})});if(T.ok){const M=await T.json();h(M)}else T.status==401?x.val="Invalid username or password":x.val=T.statusText}catch(T){x.val=T.message}finally{w.val=!1}}},s(c({width:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>x.val&&d(x.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:w},"Login"))))}},ks=`import form from "@grucloud/bau-ui/form";
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
`,Ts={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:ks,createComponent:Es}]},As=e=>{const t=G(e);return()=>t(Ts)},yn=(e,t={})=>{const n=Se(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Is=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=Se(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Ns=`import input from "@grucloud/bau-ui/input";
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
`,Ds={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Ns,createComponent:Is}],gridItem:yn},Ms=e=>{const t=G(e);return()=>t(Ds)};function Cn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>te.map(l=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:m=t.color??"neutral",running:b,...f}]=W(u);return i({...f,role:"progressbar",class:{deps:[b],renderProp:()=>h=>D("linearProgress",d,m,c,h&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const Sn=(e,t)=>{const n=Cn(e,t);return o=>n({...o,running:!0})},Bs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=V(e),i=Cn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},$s=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Ps={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:$s,createComponent:Bs}],gridItem:Sn},Os=e=>{const t=G(e);return()=>t(Ps)},En=(e,t)=>{const n=bt(e,t);return o=>n({...o,loading:!0},"Save")},_s=e=>{const{bau:t}=e,{section:n}=t.tags,o=bt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Ls=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Rs={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Ls,createComponent:_s}],gridItem:En},zs=e=>{const t=G(e);return()=>t(Rs)},js=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Hs=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=Ce(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},js.map(r))},Gs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Us=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=Ce(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Gs.map(r)))},Fs=`import list from "@grucloud/bau-ui/list";
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
`,Ws={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Fs,createComponent:Us}],gridItem:Hs},Vs=e=>{const t=G(e);return()=>t(Ws)};function ht(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...m},...b]=W(l);return a({class:D("modal",r,p,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},i(...b))}}const kn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=V(e),c=ht(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},Ks=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=V(e),l=ht(e),u=()=>o(Array(10).fill("").map((p,m)=>s(m+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},qs=`import modal from "@grucloud/bau-ui/modal";
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
`,Xs={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:qs,createComponent:Ks}],gridItem:kn},Zs=e=>{const t=G(e);return()=>t(Xs)},Ys=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=V(e),r=dt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},Js=`import popover from "@grucloud/bau-ui/popover";
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
`,Qs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Js,createComponent:Ys}]},ei=e=>{const t=G(e);return()=>t(Qs)};function ti(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:m,href:b})=>s({href:`${a.base}${b}`},r({class:"sublabel"},d),i({class:`label ${d}`},m??p));return function(...p){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",data:h={},...w}]=W(p);const{next:x,previous:C}=h;return c({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...w,class:D("paginationNavigation",m,l,t==null?void 0:t.class,w==null?void 0:w.class)},(C==null?void 0:C.href)&&u({text:"Previous"})(C),(x==null?void 0:x.href)&&u({text:"Next"})(x))}}const ni=e=>{const{bau:t}=e,{section:n}=t.tags,o=ti(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},oi=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,ai={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:oi,createComponent:ni}]},ri=e=>{const t=G(e);return()=>t(ai)},si=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},ii=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},ci=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,li={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:ci,createComponent:ii}],variantColorTableDisable:!0,gridItem:si},ui=e=>{const t=G(e);return()=>t(li)};function Tn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=W(c);return a({...p,type:"radio",class:D("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const An=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Tn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},di=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Tn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},pi=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,mi={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:pi,createComponent:di}],gridItem:An},gi=e=>{const t=G(e);return()=>t(mi)},bi=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ve(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=V(e),l=dt(e),u=Ce(e),d=o`
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
    ${bi()}
  `;return function(...m){let[{size:b=t.size??"md",variant:f=t.variant??"outline",color:h=t.color??"neutral",label:w,Option:x,options:C,getOptionLabel:A=({label:E})=>E,...k},...I]=W(m);const T=n.state(k.value),M=n.state(!1),B=n.state(0),j=()=>{v.openDialog(),v.focus(),M.val=!0},Z=()=>{v.closeDialog(),M.val=!1},ne=()=>{M.val=!1},L=E=>{v.open?Z():j(),E.preventDefault()},U=({option:E,index:P})=>$=>{T.val=A(E),S.value=T.val,S.setCustomValidity(""),B.val=P,Z(),$.preventDefault()},H=E=>{switch(E.preventDefault(),E.key){case"Escape":Z();break;case"ArrowDown":B.val<C.length-1?B.val++:B.val=0;break;case"ArrowUp":B.val<=0?B.val=C.length-1:B.val--;break;case"Enter":v.open?(T.val=A(C[B.val]),Z()):j();break}},y=()=>u({tabindex:"0",class:D(h,f)},C.map((E,P)=>i({class:()=>D(B.val==P&&"active"),onclick:U({option:E,index:P})},x(E)))),g=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":M,"aria-label":w,onclick:L,color:h,variant:f,size:b},()=>!T.val&&w,T),v=l({triggerEl:g,contentEl:y(),onClose:ne}),S=s(k,r({value:""},"--Select Category--"),C.map(E=>r(A(E))));return S.value=k.value,a({...k,class:D("select",h,b,d,t==null?void 0:t.class,k==null?void 0:k.class),onkeydown:H},S,g,v)}}const In=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ve(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Select a country..."})},hi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ve(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},fi=`import select from "@grucloud/bau-ui/select";
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
`,vi=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Ve(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},xi=`import select from "@grucloud/bau-ui/select";
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
`,wi={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:fi,createComponent:hi},{title:"Select AWS region",description:"Select the AWS region",code:xi,createComponent:vi}],gridItem:In},yi=e=>{const t=G(e);return()=>t(wi)};function Nn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=W(r);return a({...d,class:D("select-native",u,c,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Dn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Nn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},Ci=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Nn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},Si=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Ei={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Si,createComponent:Ci}],gridItem:Dn},ki=e=>{const t=G(e);return()=>t(Ei)};function Ke(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>te.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=W(c);return a({...p,type:"range",class:D("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...m)}}const Mn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ke(e);return i=>a({...i,oninput:o})},Ti=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ke(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Ai=`import slider from "@grucloud/bau-ui/slider";
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
`,Ii=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},Ni=`import slider from "@grucloud/bau-ui/slider";
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
`,Di=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},Mi=`import slider from "@grucloud/bau-ui/slider";
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
`,Bi={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Ai,createComponent:Ti},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ni,createComponent:Ii},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Mi,createComponent:Di}],gridItem:Mn},$i=e=>{const t=G(e);return()=>t(Bi)},Bn=(e,t)=>{const n=Me(e,t);return o=>n({...o})},Pi=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=Me(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Oi=`import spinner from "@grucloud/bau-ui/spinner";
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
`,_i={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Oi,createComponent:Pi}],gridItem:Bn},Li=e=>{const t=G(e);return()=>t(_i)},Ri=()=>te.map(e=>`
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
    ${Ri()}
  `;return function(...u){let[{color:d,variant:p="plain",size:m,stepperDefs:b=[],activeStepIndex:f,...h},...w]=W(u);const x=n.state(b.map((I,T)=>({...I,index:T}))),C=n.derive(()=>x.val[f.val]),A=I=>{const{Header:T,disabled:M,name:B,index:j}=I;return s({class:()=>D(C.val.name==B&&"active",f.val<j&&"not-completed",f.val>j&&"completed",M&&"disabled")},r({class:"step-number"},j+1),r({class:"step-label"},()=>T(I)))};return a({class:D("stepper",p,m,d,c,t==null?void 0:t.class,h.class)},n.loop(x,i(),A),n.bind({deps:[C],render:()=>I=>I.Content?I.Content({}):""}))}}const zi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=$n(e),r=V(e),c=({name:b})=>b,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},m=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),m())},ji=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Hi=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=V(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},qe=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},Xe=e=>{const{bau:t}=e,{i:n}=t.tags,o=V(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},le="https://github.com/grucloud/grucloud/",ue="main",Gi={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:le,branch:ue,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:le,branch:ue,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:le,branch:ue,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:le,branch:ue,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:le,branch:ue,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:le,branch:ue,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:le,branch:ue,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:le,branch:ue,directory:"examples/google/dns/github-page"}]},Ui=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},Fi=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=V(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},Wi=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=V(e),c=Be(e),l=Xe(e),u=qe(e),d=Fi(e),p=Ui(e),m=Ce(e),b=ht(e);return function({providerName:h,onclickPrevious:w,onclickImportExistingInfra:x,onclickImportFromTemplate:C}){const A=b({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(m(Gi[h].map(k=>p({project:k,onclickItem:I=>()=>{A.close(),C(I)}})))),s(r({variant:"outline",onclick:()=>{A.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{x()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{A.showModal()}})),A,u(l({onclick:w})))}},Vi=e=>{const{bau:t}=e,{span:n}=t.tags,o=Ve(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},Ki=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=V(e),l=Se(e),u=Be(e),d=Xe(e),p=qe(e),m=Vi(e);return function({onclickPrevious:f,onclickNext:h}){return u({name:"form-config-aws",onsubmit:x=>{x.preventDefault(),h()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",m({name:"region"}))),p(d({onclick:f}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},qi=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:m,div:b}=t.tags,f=V(e),h=Xe(e),w=qe(e),x=Se(e),C=Be(e);return function({onclickPrevious:k,onclickNext:I}){const T=B=>{B.preventDefault(),I()},M=n`
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
    `;return C({name:"form-config-azure",onsubmit:T,"data-infra-create":!0,class:M},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",m("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",x({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",m("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",x({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",m("APP_ID")," and ",m("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),b({class:n`
                  display: inline-flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",x({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",x({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),w(h({onclick:k}),f({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},Xi=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:m,a:b,table:f,tbody:h,th:w,tr:x,td:C}=t.tags,{svg:A,use:k}=t.tagsNS("http://www.w3.org/2000/svg"),I=gt(e),T=V(e),M=Be(e),B=Xe(e),j=qe(e);return function({onclickPrevious:ne,onclickNext:L}){const U=t.state("No file selected"),H=t.state({}),y=t.state(!0),g=$=>{const K=$.target.files[0];if(K){U.val=K.name;const R=new FileReader;R.readAsText(K),R.onload=()=>{try{debugger;if(R.result){const _=JSON.parse(R.result);H.val=_,_.project_id&&(y.val=!1)}}catch{}},R.onerror=()=>{console.log(R.error)}}else U.val=""},v=({fileName:$,content:K})=>f({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},h(x(w("Credential File"),C($)),x(w("Project Name"),C(K.project_id)),x(w("Service Account"),C(K.client_email)))),S=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},A({width:100,height:100,fill:"currentColor"},k({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),E=$=>{$.preventDefault(),L()},P=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return M({name:"form-config-google",class:P,onsubmit:E,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",b({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",m("CREATE SERVICE ACCOUNT"),""),d("Set the ",m("Service account name")," to 'grucloud' for instance"),d("Click on ",m("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",m("CONTINUE"),""),d("Click on ",m("DONE"),""),d("Go to the ",m("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",m("Manage keys"),""),d("Click on ",m("ADD KEYS"),", then ",m("Create new key"),""),d("Click on ",m("CREATE")," to download the credential file in JSON format.")),I({"data-input-google-upload":!0,Component:S,name:"file",accept:"application/JSON",onchange:g}),()=>v({fileName:U.val,content:H.val})),j(B({onclick:ne}),()=>T({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},Zi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=$n(e),r=Hi(e),c=Ki(e),l=qi(e),u=Xi(e),d=Wi(e),p=t.state(""),m=t.state(0),b=({name:f})=>f;return function(){const h=T=>()=>{p.val=T,m.val++},w=()=>{m.val++},x=()=>{m.val++},A=[{name:"Provider Selection",Header:b,Content:()=>r({onclickProvider:h}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:k,onclickImportExistingInfra:w,onclickImportFromTemplate:x})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:k,onclickNext:I});case"Azure":return l({onclickPrevious:k,onclickNext:I});case"Google":return u({onclickPrevious:k,onclickNext:I})}}},{name:"Scan",Header:b,Content:()=>a(i("My stepper 3 Content"))}],k=()=>{m.val>0&&m.val--},I=()=>{A.length>m.val+1&&m.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:A,activeStepIndex:m}))}},Yi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Ji={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:ji,createComponent:zi},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Yi,createComponent:Zi}]},Qi=e=>{const t=G(e);return()=>t(Ji)},ec=()=>te.map(e=>`
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
    ${ec()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=W(r);return a({...d,class:D("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const On=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=Pn(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},tc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=Pn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},nc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,oc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:nc,createComponent:tc}],gridItem:On},ac=e=>{const t=G(e);return()=>t(oc)},rc=()=>te.map(e=>`
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
    ${rc()}
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",...b},...f]=W(u);const h=n.state(a),w=n.state(a[0]),x=k=>h.val.find(I=>I.name==k),C=k=>{const{Header:I,disabled:T,name:M}=k;return r({class:()=>D(w.val.name==M&&"active",T&&"disabled"),onclick:B=>B.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:M},bubbles:!0}))},I(k))},A=i({class:D("tabs",p,d,m,c,t==null?void 0:t.class,b.class)},n.loop(h,s(),C),()=>w.val.Content?w.val.Content({}):"");return A.addEventListener("tab.select",k=>{var M,B;const{tabName:I}=k.detail,T=x(I);T&&((M=w.val.exit)==null||M.call(),w.val=T,(B=T.enter)==null||B.call())},!1),A.addEventListener("tab.add",k=>{var T;const{tab:I}=k.detail;(T=I.enter)==null||T.call(),h.val.push(I)},!1),A.addEventListener("tab.remove",k=>{var T;const I=h.val.findIndex(M=>M.name==k.detail.tabName);I>0&&((T=h.val[I].exit)==null||T.call(),h.val.splice(I,1))},!1),A}}const _n=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=$e(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},sc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=$e(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},ic=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,cc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=$e(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},lc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ln=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},uc=e=>{const{css:t}=e,n=$e(e,{tabDefs:Ln(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},dc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,pc=e=>{const{css:t}=e,n=Ln(e),o=$e(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},mc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,gc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ic,createComponent:sc},{title:"Extended Tabs",description:"An extended tabs.",code:lc,createComponent:cc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:dc,createComponent:uc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:mc,createComponent:pc}],gridItem:_n},bc=e=>{const t=G(e);return()=>t(gc)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=W(c);return i({...l,class:D("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const hc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(h,w,x,C,A){return{name:h,calories:w,fat:x,carbs:C,protein:A}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],m=({name:h,calories:w})=>s(i(h),i({class:n`
            text-align: right;
          `},w)),b=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),b(),l(p.map(m)))))},fc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const vc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],xc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:b,calories:f})=>s(i(b),i({class:n`
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
    `});return()=>o(m(r(u("Table Dense"),p(),l(vc.map(d)))))},wc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const yc=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],Cc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:b,calories:f})=>s(i(b),i({class:n`
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
    `});return()=>o(m(r(u("Table Zebra"),p(),l(yc.map(d)))))},Sc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ec={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:fc,createComponent:hc},{title:"Dense",description:"A dense table.",code:wc,createComponent:xc},{title:"Zebra",description:"A zebra table.",code:Sc,createComponent:Cc}]},kc=e=>{const t=G(e);return()=>t(Ec)},Tc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=Qt(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Ac=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Ic={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Ac,createComponent:Tc}]},Nc=e=>{const t=G(e);return()=>t(Ic)};function Rn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=mt(e),s=V(e),r=Me(e),c=o`
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
  `,l=({label:b,icon:f,...h})=>s({"aria-label":b,title:b,...h},f),u=({count:b,totalCount:f,page:h,rowsPerPage:w})=>a({class:"pages-numbers"},Number(h-1)*Number(w)+(b>0?1:0),"-",Math.min(h*w,f)," of ",f),d=({count:b,page:f,rowsPerPage:h})=>a({class:"pages-numbers"},(f-1)*h+(b>0?1:0),"-",f*h),p=b=>b<=1,m=(b,f,h)=>b>=Math.ceil(f/h);return function(...f){let[{size:h=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",count:C=0,totalCount:A=0,page:k=1,rowsPerPage:I=50,onPageChange:T,isLoading:M=!1,disableFirst:B=()=>p(k),disablePrevious:j=()=>p(k),disableNext:Z=()=>m(k,A,I),disableLast:ne=()=>m(k,A,I),...L},...U]=W(f);const H=Math.max(0,Math.ceil(A/I)),y=T({page:1}),g=T({page:k-1}),v=T({page:k+1}),S=T({page:H}),E=[{label:"First",icon:"⟪",onclick:y,disabled:B()},{label:"Previous",icon:"⟨",onclick:g,disabled:j()},{label:"Next",icon:"⟩",onclick:v,disabled:Z()},{label:"Last",icon:"⟫",onclick:S,disabled:ne()}];return a({...L,class:D("table-pagination",c,M&&"disabled",t==null?void 0:t.class,L==null?void 0:L.class)},r({class:"spinner",visibility:M,size:"md"}),A>0?u({count:C,totalCount:A,page:k,maxPages:H,rowsPerPage:I}):d({count:C,page:k,maxPages:H,rowsPerPage:I}),i({variant:w,color:x},E.map(P=>l({...P,variant:w,color:x}))))}}const Dc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Mc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Dc(45),u=({name:x,email:C})=>i(a(x),a(C)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Rn(e),m=Pe(e,{class:n`
      max-width: 650px;
    `}),b=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>b.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),w=({page:x})=>C=>{f.val.page=x};return()=>m(s(d(),()=>c(h.val.map(u))),()=>p({...f.val,onPageChange:w}))},Bc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),m=t.derive(()=>d.val.length),b=t.state(1),f=t.state(10),h=t.derive(()=>d.val),w=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,x=({page:B})=>j=>{b.val=B,C(w({page:B,per_page:f.val}))};C(w({page:1,per_page:f.val}));async function C(B){try{u.val=!0;const j=await fetch(B,{});if(j.ok){const Z=await j.json();d.val=Z;return}throw j}catch(j){p.val=j.message}finally{u.val=!1}}const A=({name:B,description:j,stargazers_count:Z})=>i(a(B),a(j),a({class:n`
            text-align: right;
          `},Z)),k=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),I=Rn(e),T=Pe(e,{class:n`
      min-width: 650px;
    `}),M=({message:B})=>l(B);return()=>T(()=>I({rowsPerPage:f.val,page:b.val,count:m.val,totalCount:-1,isLoading:u.val,onPageChange:x,disableNext:()=>!1}),s(k(),()=>p.val&&M({message:p.val}),()=>c(h.val.map(A))))},$c=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=Mc(e),l=Bc(e),u=(...d)=>a({class:n`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:m,onChange:b,...f},...h]=W(c);return i({type:"button",...f,"aria-pressed":{deps:[p],renderProp:()=>w=>w},class:{deps:[p],renderProp:()=>w=>D("toggle",l,d,u,s,w&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:m},h)}}const zn=(e,t)=>{const{bau:n}=e,o=Oe(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},Pc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Oc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,_c={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Oc,createComponent:Pc}],gridItem:zn},Lc=e=>{const t=G(e);return()=>t(_c)},Rc=()=>te.map(e=>`
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
    ${Rc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...m},...b]=W(r);const f=new Set,h=w=>{const{value:x}=w.target;d?(f.clear(),f.add(x)):f.has(x)?f.delete(x):f.add(x),p({event:w,values:[...f]})};return a({...m,class:D("toggle-group",c,u,l,i,t==null?void 0:t.class,m==null?void 0:m.class),onclick:h},...b)}}const jn=(e,t)=>{const{bau:n}=e,o=ft(e,t),a=Oe(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},zc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},jc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Hc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Gc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Uc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:jc,createComponent:zc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Gc,createComponent:Hc}],gridItem:jn},Fc=e=>{const t=G(e);return()=>t(Uc)};function vt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",...b},...f]=W(c);const h=i({class:D("container",...u.split("-"))},i({class:D("content",m,p,d),role:"tooltip"},l)),w=T=>`move-to-${T}`,x=(T,M,B)=>{if(T()){const j=w(M);h.classList.add(j),h.classList.add(M),h.classList.remove(B)}},C=(T,M)=>{const B=w(T);h.classList.contains(B)&&(h.classList.remove(B),h.classList.add(M),h.classList.remove(T))},A=T=>{const M=h.getBoundingClientRect();x(()=>M.x<0,"right","left"),x(()=>M.x+M.width>a.innerWidth,"left","right"),x(()=>M.y<0,"bottom","top"),x(()=>M.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},k=T=>{h.classList.remove("visible"),C("right","left"),C("left","right"),C("bottom","top"),C("top","bottom")};return i({...b,class:D("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",A),T.addEventListener("mouseout",k)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",A),T.removeEventListener("mouseout",k)}},...f,h)}}const Hn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=V(e),r=vt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Wc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=V(e),s=vt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Vc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Kc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ue(e,{variant:"outline",color:"primary"}),c=vt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},qc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Xc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Vc,createComponent:Wc},{title:"Grid",description:"Various tooltip position",code:qc,createComponent:Kc}],gridItem:Hn},Zc=e=>{const t=G(e);return()=>t(Xc)},Gn=(e,t)=>{const n=at(e,t);return o=>n(o)},Yc=e=>{const{bau:t}=e,{section:n}=t.tags,o=at(e);return()=>n(o({}))},Jc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Qc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Jc,createComponent:Yc}],gridItem:Gn},el=e=>{const t=G(e);return()=>t(Qc)},tl=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Un(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=tl({css:o,createGlobalStyles:a}),d=ut(e),p=({depth:m=1,maxDepth:b,color:f,variant:h,size:w})=>x=>{const{children:C,expanded:A}=x,k=n.state(!A),I=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:M=>{C&&(k.val=!k.val)}},i(x.data)),T=()=>s({class:D(f,w)},C.map(p({depth:m+1,maxDepth:b})));return r(d({size:w,Header:I,Content:C&&m<b&&T}))};return function({tree:b,maxDepth:f=1/0,size:h=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",...C}){return c({class:D(u.nav,h,w,x,t==null?void 0:t.class,C.class)},b.children&&s(b.children.map(p({maxDepth:f,color:x,variant:w,size:h}))))}}const Fn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Un(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},nl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Un(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},ol=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,al={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:ol,createComponent:nl}],gridItem:Fn},rl=e=>{const t=G(e);return()=>t(al)},sl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=en(e),u=V(e),d=[{name:"Accordion",Item:tn(e)},{name:"Alert",Item:on(e)},{name:"Autocomplete",Item:sn(e)},{name:"Avatar",Item:rn(e)},{name:"Badge",Item:ln(e)},{name:"Breadcrumbs",Item:dn(e)},{name:"Button",Item:pn(e)},{name:"Button Group",Item:mn(e)},{name:"Calendar",Item:bn(e)},{name:"Checkbox",Item:vn(e)},{name:"Chip",Item:hn(e)},{name:"DrillDown Menu",Item:xn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:wn(e)},{name:"Input",Item:yn(e)},{name:"Linear Progress",Item:Sn(e)},{name:"Loading Button",Item:En(e)},{name:"Modal",Item:kn(e)},{name:"Radio Button",Item:An(e)},{name:"Select",Item:In(e)},{name:"Select Native",Item:Dn(e)},{name:"Slider",Item:Mn(e)},{name:"Spinner",Item:Bn(e)},{name:"Switch",Item:On(e)},{name:"Tabs",Item:_n(e)},{name:"Theme Switch",Item:Gn(e)},{name:"Toggle",Item:zn(e)},{name:"Toggle Group",Item:jn(e)},{name:"Tooltip",Item:Hn(e)},{name:"Tree View",Item:Fn(e)}];return()=>o({class:n`
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
            `},l(p))))},il=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Mo(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Oa(e)})},{path:"components",action:()=>({title:"Component",component:sl(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Wa(e)})},{path:"alert",action:()=>({title:"Alert",component:Qa(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ar(e)})},{path:"animate",action:()=>({title:"Animate",component:ur(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Sr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:gr(e)})},{path:"badge",action:()=>({title:"Badge",component:Ar(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Mr(e)})},{path:"button",action:()=>({title:"Button",component:Lr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Gr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Vr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Jr(e)})},{path:"chip",action:()=>({title:"Chip",component:ns(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ss(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:us(e)})},{path:"drawer",action:()=>({title:"Drawer",component:bs(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:xs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Ss(e)})},{path:"form",action:()=>({title:"Form",component:As(e)})},{path:"input",action:()=>({title:"Input",component:Ms(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Os(e)})},{path:"list",action:()=>({title:"List",component:Vs(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:zs(e)})},{path:"modal",action:()=>({title:"Modal",component:Zs(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:ri(e)})},{path:"paper",action:()=>({title:"Paper",component:ui(e)})},{path:"popover",action:()=>({title:"Popover",component:ei(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:gi(e)})},{path:"select",action:()=>({title:"Select",component:yi(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:ki(e)})},{path:"slider",action:()=>({title:"Slider",component:$i(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Li(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Qi(e)})},{path:"switch",action:()=>({title:"Switch",component:ac(e)})},{path:"table",action:()=>({title:"Table",component:kc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:Nc(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:$c(e)})},{path:"tabs",action:()=>({title:"Tabs",component:bc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:Lc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Fc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Zc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:el(e)})},{path:"treeView",action:()=>({title:"Tree View",component:rl(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Po(e)})}],cl=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ll=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:m=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},ul=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};co();const Wn={title:"Bau",base:"/bau/bau-ui"},he=fo({config:Wn}),{bau:dl}=he;he.states={drawerOpen:dl.state(!0)};ul(he);Jn({routes:il({context:he}),onLocationChange:ll({context:he,LayoutDefault:Ao(he),config:Wn}),notFoundRoute:cl(he)});
