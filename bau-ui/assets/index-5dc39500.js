(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Qn=(e,t)=>({...e,paths:[...t,e.path]}),Ot=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Qn(o,e);return n?[a,...Ot({paths:[...e,o.path],routes:n})]:a}),eo=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},to=({routes:e=[],notFoundRoute:t})=>{const n=Ot({routes:e}).map(o=>({...o,regex:eo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function no({routes:e,notFoundRoute:t,onLocationChange:n}){let o=window.location;const a=s=>{o={...s}},i=to({routes:e,notFoundRoute:t});return window.addEventListener("popstate",s=>{o.pathname!=s.target.location.pathname&&n({router:i}),a(s.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(s,r,c)=>{s.apply(r,c),n({router:i}),a(window.location)}}),document.addEventListener("click",s=>{const{target:r}=s,c=r.getAttribute("href");r.tagName==="A"&&c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,c),a(window.location),window.scrollTo({top:0,left:0}),s.preventDefault())}),n({router:i}),i}const at=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],oo=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ao=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],kt=e=>`var(--color-${e})`,ro=e=>`var(--color-${e}-lightest)`,so=()=>at.map(([e])=>`
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
`),io=()=>at.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),co=e=>100-e*10,lo=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${co(t)}%);`).join(`
`),Et=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),uo=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...oo.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...ao.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function po({createGlobalStyles:e},{colorPalette:t=at}={}){e`
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
  `}function mo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let rt=e=>Object.prototype.toString.call(e??0).slice(8,-1),go=e=>rt(e)=="Object",Tt=e=>rt(e)=="Function",tt=e=>["Object","Array"].includes(rt(e)),At=Object.getPrototypeOf,nt=e=>ye(e)?e.val:e,ye=e=>e==null?void 0:e.__isState,bo=["splice","push","pop","shift","unshift","sort","reverse"],_e=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const F=e=>!ye(e[0])&&go(e[0])?e:[{},...e];function ho(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,m,f)=>{let C=r;r=m;let k=y(f);return r=C,k},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var f;return(f=m.element)==null?void 0:f.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,m,f,C,k,O)=>{var A;if(s){i.add(y);return}for(let G of y.bindings){let{deps:_,element:R,renderInferred:Z,render:oe,renderItem:ee}=G;if(ee&&m)(A=b(R,C,(...ae)=>w(ee(...ae)),f,k,O)[m])==null||A.call();else{let ae=Z?Z({element:R}):oe({element:R,renderItem:ee})(..._.map(nt));ae!==R&&R.replaceWith(G.element=w(ae))}}S(y),u()},p=(y,m,f=[])=>({get(C,k,O){var A;if(r==null||r.add(y),k==="_isProxy")return!0;if(!((A=C[k])!=null&&A._isProxy)&&!ye(C[k])&&tt(C[k]))C[k]=new Proxy(C[k],p(y,m,[...f,k]));else if(bo.includes(k)){let G=C[k];return(..._)=>{let R=G.apply(C,_);return d(y,k,R,_,m,f),R}}return Reflect.get(C,k,O)},set(C,k,O,A){let G=Reflect.set(C,k,O,A);return d(y,"setItem",G,{prop:k,value:O},m,[...f,k]),G}}),g=(y,m)=>new Proxy(m,p(y,m)),b=(y,m,f,C,k,O)=>{let A=()=>y.replaceChildren(..._e(C,f)),G=_=>y[_]&&y.removeChild(y[_]);return{assign:A,sort:A,reverse:A,setItem:()=>{var R;let _=O[0];(R=y.children[_])==null||R.replaceWith(f(k[_],_))},push:()=>y.append(..._e(m,(_,R)=>f(_,k.length+R))),unshift:()=>y.prepend(..._e(m,f)),pop:()=>G("lastChild"),shift:()=>G("firstChild"),splice:()=>{let[_,R,...Z]=m;const{length:oe}=y.children;for(let ee=_>=0?Math.min(_+R-1,oe-1):oe-1;ee>=(_>=0?_:oe+_);ee--)y.children[ee].remove();if(Z.length){let ee=Z.forEach((ae,xe)=>f(ae,_+xe));y.children[_]?y.children[_].after(...ee):y.append(...ee)}}}},h=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=tt(y)?g(m,y):y,m.valProxy)},set val(m){let f=this,C=f.val;tt(m)?(f.valProxy=g(f,m),d(f,"assign",m)):m!==C&&(f.valProxy=m,d(f)),f.oldVal=C}}),w=y=>{if(y==null||y===!1){const m=c("span");return m.style.display="none",m}else return y.nodeType?y:n.createTextNode(y)},x=(y,m)=>{let f=new Set;return m.val=l(y,f),f},v=y=>{let m=h(),f=x(y,m);m.computed=!0;for(let C of f)C.listeners.push({computed:y,deps:f,state:m});return m},S=y=>{for(let m of[...y.listeners])x(m.computed,m.state)},T=(y,...m)=>{if(m.length){let f=[];for(let C of m.flat(1/0))C!=null&&f.push(ye(C)?q({deps:[C],render:()=>k=>k}):Tt(C)?Q({renderInferred:C}):w(C));y.append(...f)}},N={},M=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??M(At(y),m)),E=(y,m,f)=>{var C;return N[y+","+m]??(N[y+","+m]=((C=M(f,m))==null?void 0:C.set)??0)},D=(y,m)=>new t.MutationObserver((f,C)=>{f.filter(k=>k.removedNodes).forEach(k=>[...k.removedNodes].find(O=>O===y&&(m({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),$=(y,m)=>new t.MutationObserver((f,C)=>f.forEach(k=>m({record:k,element:y}))).observe(y,{childList:!0}),L=y=>new Proxy(function(f,...C){var G;let[k,...O]=F(C),A=y?n.createElementNS(y,f):c(f);for(let[_,R]of Object.entries(k)){if(_.startsWith("bau"))continue;let Z=E(f,_,At(A))?oe=>A[_]=oe:oe=>A.setAttribute(_,oe);R==null||(ye(R)?q({deps:[R],render:()=>()=>(Z(R.val),A)}):Tt(R)&&(!_.startsWith("on")||R.isDerived)?Q({renderInferred:()=>(Z(R({element:A})),A)}):R.renderProp?q({deps:R.deps,render:()=>()=>(Z(R.renderProp({element:A})(...R.deps.map(nt))),A)}):Z(R))}return k.bauChildMutated&&$(A,k.bauChildMutated),T(A,...O),A.autofocus&&A.focus&&t.requestAnimationFrame(()=>A.focus()),(G=k.bauCreated)==null||G.call(k,{element:A}),k.bauMounted&&t.requestAnimationFrame(()=>k.bauMounted({element:A})),k.bauUnmounted&&t.requestAnimationFrame(()=>D(A,k.bauUnmounted)),A},{get:(m,f)=>m.bind(void 0,f)}),H=(y,m,f)=>{y.element=w(f);for(let C of m)ye(C)&&(a.add(C),C.bindings.push(y));return y.element},Q=({renderInferred:y,element:m})=>{let f=new Set,C=l(y,f,{element:m});return H({renderInferred:y},f,C)},q=({deps:y,element:m,render:f,renderItem:C})=>H({deps:y,render:f,renderItem:C},y,f({element:m,renderItem:C})(...y.map(nt))),K=(y,m,f)=>q({deps:[y],render:({renderItem:C})=>k=>(m.append(..._e(k,C)),m),renderItem:f}),z=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:L(),tagsNS:L,state:h,bind:q,loop:K,derive:v,stateSet:a,batch:z}}const fo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},vo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},xo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function wo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=xo(a,i),r=fo(s);return!t.getElementById(r)&&vo(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function yo(e){const t=ho(),n=wo();return po(n),{bau:t,...n,tr:o=>o,window,...e}}function I(...e){return e.filter(t=>t).join(" ")}function Ue(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:I("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const g=p.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=p.getAttribute("width"),g.style.height=p.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var b;return(b=g.parentNode)==null?void 0:b.removeChild(g)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const g=p.getBoundingClientRect();if(p.setAttribute("width",g.width+"px"),p.setAttribute("height",g.height+"px"),r()){p.style.animation=r();const b=()=>{p.removeEventListener("animationend",b),p.style.animation=""};p.addEventListener("animationend",b)}})},...c},l)}}const te=["neutral","primary","success","danger","warning"],So=["plain","outline","solid"],Co=["sm","md","lg"],ko=()=>te.map(e=>`
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
    ${ko()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=F(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:I("button",t.class,c,r,l,a,d.class),href:u},p)}}const Eo="light",To=()=>te.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function st(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Eo);const l=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:b=t.color??"neutral",...h},...w]=F(d);return i({required:"required",title:"Switch Theme",...h,class:I("theme-switch",b,g,p,l,t==null?void 0:t.class,h.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...w)}}function Ao(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:g,li:b}=n.tags,{svg:h,path:w}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,v=V(e,{class:o`
      background: transparent;
    `}),S=st(e),T=()=>s(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},w({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),N=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},T()),u({href:`${a.base}/`,class:o`
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
        `},N(),M())}}function Io({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:h,title:w})=>o({class:n`
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
        `},d(w),r(h.map(({href:x,name:v})=>c(s({href:x},v))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],b=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:b})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.52.0"),i("MIT license")))}}function he(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Re="0.3s",zt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(zt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},_t=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=_t(e)(t.children[o]);if(a)return a}},Do=({keyframes:e})=>({hideToLeft:e`
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
   `});function it(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=z=>{var y;return((y=z.parentTree.data)==null?void 0:y.href)??z.parentTree.children[0].data.href},u=({variant:z,color:y,size:m,currentTree:f,data:C})=>S(E({variant:z,color:y,size:m,href:`${c}${l(f)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),E({variant:z,color:y,size:m,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),d=({size:z,subTree:{data:{name:y,href:m},children:f=[]}})=>E({size:z,href:`${c}${m}`,"data-ischild":!f.length},y),p=({pathname:z,subTree:y})=>{var m;return z===((m=y==null?void 0:y.data)==null?void 0:m.href)},{renderHeader:g=u,renderMenuItem:b=d,isActive:h=p}=t,{li:w,nav:x,div:v,header:S,a:T}=n.tags,N=Ue(e),M=he(e),E=V(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:$}=Do(e),L=o`
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
  `,H=({children:z,pathnameState:y,variant:m,color:f,size:C})=>M({class:I(m,f,C)},z.map(k=>w({class:()=>I(k.children&&"has-children",h({pathname:y.val,subTree:k})&&"active")},b({variant:m,color:f,size:C,subTree:k})))),Q=({variant:z,color:y,size:m,currentTree:f,pathnameState:C})=>{const{children:k,parentTree:O,data:A,renderList:G}=f;return v({class:I("drillDownMenu",z,y,m)},O&&g({variant:z,color:y,size:m,data:A,currentTree:f}),k&&G?G({renderListDefault:H,children:k,pathnameState:C,variant:z,color:y,size:m}):H({children:k,pathnameState:C,variant:z,color:y,size:m}))},q=({tree:z,pathname:y})=>{let m=zt({})({...z}),f=_t(y)(m);return f||(f=m),f},K=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",z=>{const{target:y}=z,m=y.getAttribute("href");if(y.tagName==="A"&&m&&!m.startsWith("http")&&!m.startsWith("#")){let f=m.replace(c,"");r||(f=f.replace(y.hash,"")),K.val=f}}),function(y){const{size:m=t.size??"md",variant:f=t.variant??"plain",color:C=t.color??"neutral",tree:k,...O}=y;let A,G=n.derive(()=>(A=q({tree:k,pathname:K.val}),A)),_=1;const R=ee=>{const{dataset:ae}=ee.target;ae.buttonback=="true"?_=-1:ae.ischild=="false"?_=1:ae.ischild=="true"&&(_=0)},Z=ee=>{switch(ee){case 1:return`${D} ${Re}`;case-1:return`${$} ${Re}`;default:return""}},oe=ee=>{switch(ee){case 1:return`${$} ${Re} reverse`;case-1:return`${D} ${Re} reverse`;default:return""}};return x({class:I(L,f,C,m,t==null?void 0:t.class,O.class),onclick:R},N({animationHide:()=>Z(_),animationShow:()=>oe(_)},n.bind({deps:[G],render:()=>()=>Q({variant:f,color:C,size:m,currentTree:A,pathnameState:K})})))}}const No=()=>te.map(e=>`
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
`);function fe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:I("input",t.class,t.size??"md",l,c,i,u.class)})}}function ct(e,t={}){const{bau:n,css:o,window:a}=e,i=fe(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:I("inputSearch",t.class,g,u.class)})}}function Rt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags,g=ct(e,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:v,children:S,pathnameState:T,variant:N,color:M,size:E})=>{const D=n.state(""),$=n.derive(()=>D.val==""?S:S.filter(H=>H.data.name.match(new RegExp(`${D.val}`,"i")))),L=H=>{D.val=H.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},g({autocomplete:!1,name:"search",autofocus:!0,value:D,placeholder:`Search ${$.val.length} components`,size:22,oninput:L}),()=>v({children:$.val,pathnameState:T,variant:N,color:M,size:E}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let w=!1;const x=it(e);return function(){return r({bauMounted:({element:S})=>{s.innerWidth<=640&&(w=!0,i.drawerOpen.val=!1)},onclick:S=>{w&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:I(o`
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
          `)},x({tree:h}))}}const Mo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ue(e),r=Ao(e),c=Rt(e),l=Io(e),u=a`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),l())}};function Fe(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...g]=F(r);return a({...p,onclick:d,class:I("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...g)}}function $o(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;V(e);const c=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Po({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:g,size:b})=>r({class:n`
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
                  var(--color-success) ${b/p*100}%
                );
                justify-content: flex-end;
                width: ${b/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},b)));return function({data:g=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Lo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=$o(e),l=Bo(e),u=V(e);Fe(e);const d=Po(e),p=(...x)=>a({class:n`
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
          `},...x)),g=n``,b=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[i("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],w=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),d({data:b}),w())}}function Oo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const zo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Oo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function _o(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),zo(e)()))}}function Ro(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&jt(n)}),e}class It{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const jo="</span>",Dt=e=>!!e.scope,Ho=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Go{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ht(t)}openNode(t){if(!Dt(t))return;const n=Ho(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Dt(t)&&(this.buffer+=jo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Nt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class lt{constructor(){this.rootNode=Nt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Nt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{lt._collapse(n)}))}}class Uo extends lt{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Go(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ie(e){return e?typeof e=="string"?e:e.source:null}function Gt(e){return ve("(?=",e,")")}function Fo(e){return ve("(?:",e,")*")}function Wo(e){return ve("(?:",e,")?")}function ve(...e){return e.map(n=>Ie(n)).join("")}function Vo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ut(...e){return"("+(Vo(e).capture?"":"?:")+e.map(o=>Ie(o)).join("|")+")"}function Ut(e){return new RegExp(e.toString()+"|").exec("").length-1}function Ko(e,t){const n=e&&e.exec(t);return n&&n.index===0}const qo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ie(o),s="";for(;i.length>0;){const r=qo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Xo=/\b\B/,Ft="[a-zA-Z]\\w*",pt="[a-zA-Z_]\\w*",Wt="\\b\\d+(\\.\\d+)?",Vt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Kt="\\b(0b[01]+)",Zo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Yo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ve(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},De={begin:"\\\\[\\s\\S]",relevance:0},Jo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[De]},Qo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[De]},ea={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},We=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ut("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ve(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ta=We("//","$"),na=We("/\\*","\\*/"),oa=We("#","$"),aa={scope:"number",begin:Wt,relevance:0},ra={scope:"number",begin:Vt,relevance:0},sa={scope:"number",begin:Kt,relevance:0},ia={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[De,{begin:/\[/,end:/\]/,relevance:0,contains:[De]}]}]},ca={scope:"title",begin:Ft,relevance:0},la={scope:"title",begin:pt,relevance:0},ua={begin:"\\.\\s*"+pt,relevance:0},da=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var je=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Xo,IDENT_RE:Ft,UNDERSCORE_IDENT_RE:pt,NUMBER_RE:Wt,C_NUMBER_RE:Vt,BINARY_NUMBER_RE:Kt,RE_STARTERS_RE:Zo,SHEBANG:Yo,BACKSLASH_ESCAPE:De,APOS_STRING_MODE:Jo,QUOTE_STRING_MODE:Qo,PHRASAL_WORDS_MODE:ea,COMMENT:We,C_LINE_COMMENT_MODE:ta,C_BLOCK_COMMENT_MODE:na,HASH_COMMENT_MODE:oa,NUMBER_MODE:aa,C_NUMBER_MODE:ra,BINARY_NUMBER_MODE:sa,REGEXP_MODE:ia,TITLE_MODE:ca,UNDERSCORE_TITLE_MODE:la,METHOD_GUARD:ua,END_SAME_AS_BEGIN:da});function pa(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ma(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ga(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=pa,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ba(e,t){Array.isArray(e.illegal)&&(e.illegal=ut(...e.illegal))}function ha(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function fa(e,t){e.relevance===void 0&&(e.relevance=1)}const va=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ve(n.beforeMatch,Gt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},xa=["of","and","for","in","not","or","if","then","parent","list","value"],wa="keyword";function qt(e,t,n=wa){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,qt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ya(c[0],c[1])]})}}function ya(e,t){return t?Number(t):Sa(e)?0:1}function Sa(e){return xa.includes(e.toLowerCase())}const Mt={},be=e=>{console.error(e)},$t=(e,...t)=>{console.log(`WARN: ${e}`,...t)},we=(e,t)=>{Mt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Mt[`${e}/${t}`]=!0)},Ge=new Error;function Xt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Ut(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Ca(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw be("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ge;if(typeof e.beginScope!="object"||e.beginScope===null)throw be("beginScope must be object"),Ge;Xt(e,e.begin,{key:"beginScope"}),e.begin=dt(e.begin,{joinWith:""})}}function ka(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw be("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ge;if(typeof e.endScope!="object"||e.endScope===null)throw be("endScope must be object"),Ge;Xt(e,e.end,{key:"endScope"}),e.end=dt(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ta(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Ca(e),ka(e)}function Aa(e){function t(s,r){return new RegExp(Ie(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Ut(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(dt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[ma,ha,Ta,va].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ga,ba,fa].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=qt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ie(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ia(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Zt(e){return e?e.endsWithParent||Zt(e.starts):!1}function Ia(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Zt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var Da="11.8.0";class Na extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ot=Ht,Bt=de,Pt=Symbol("nomatch"),Ma=7,Yt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uo};function c(m){return r.noHighlightRe.test(m)}function l(m){let f=m.className+" ";f+=m.parentNode?m.parentNode.className:"";const C=r.languageDetectRe.exec(f);if(C){const k=$(C[1]);return k||($t(i.replace("{}",C[1])),$t("Falling back to no-highlight mode for this block.",m)),k?C[1]:"no-highlight"}return f.split(/\s+/).find(k=>c(k)||$(k))}function u(m,f,C){let k="",O="";typeof f=="object"?(k=m,C=f.ignoreIllegals,O=f.language):(we("10.7.0","highlight(lang, code, ...args) has been deprecated."),we("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=m,k=f),C===void 0&&(C=!0);const A={code:k,language:O};z("before:highlight",A);const G=A.result?A.result:d(A.language,A.code,C);return G.code=A.code,z("after:highlight",G),G}function d(m,f,C,k){const O=Object.create(null);function A(B,P){return B.keywords[P]}function G(){if(!U.keywords){ne.addText(J);return}let B=0;U.keywordPatternRe.lastIndex=0;let P=U.keywordPatternRe.exec(J),W="";for(;P;){W+=J.substring(B,P.index);const X=ie.case_insensitive?P[0].toLowerCase():P[0],re=A(U,X);if(re){const[ce,Yn]=re;if(ne.addText(W),W="",O[X]=(O[X]||0)+1,O[X]<=Ma&&(ze+=Yn),ce.startsWith("_"))W+=P[0];else{const Jn=ie.classNameAliases[ce]||ce;Z(P[0],Jn)}}else W+=P[0];B=U.keywordPatternRe.lastIndex,P=U.keywordPatternRe.exec(J)}W+=J.substring(B),ne.addText(W)}function _(){if(J==="")return;let B=null;if(typeof U.subLanguage=="string"){if(!t[U.subLanguage]){ne.addText(J);return}B=d(U.subLanguage,J,!0,Ct[U.subLanguage]),Ct[U.subLanguage]=B._top}else B=g(J,U.subLanguage.length?U.subLanguage:null);U.relevance>0&&(ze+=B.relevance),ne.__addSublanguage(B._emitter,B.language)}function R(){U.subLanguage!=null?_():G(),J=""}function Z(B,P){B!==""&&(ne.startScope(P),ne.addText(B),ne.endScope())}function oe(B,P){let W=1;const X=P.length-1;for(;W<=X;){if(!B._emit[W]){W++;continue}const re=ie.classNameAliases[B[W]]||B[W],ce=P[W];re?Z(ce,re):(J=ce,G(),J=""),W++}}function ee(B,P){return B.scope&&typeof B.scope=="string"&&ne.openNode(ie.classNameAliases[B.scope]||B.scope),B.beginScope&&(B.beginScope._wrap?(Z(J,ie.classNameAliases[B.beginScope._wrap]||B.beginScope._wrap),J=""):B.beginScope._multi&&(oe(B.beginScope,P),J="")),U=Object.create(B,{parent:{value:U}}),U}function ae(B,P,W){let X=Ko(B.endRe,W);if(X){if(B["on:end"]){const re=new It(B);B["on:end"](P,re),re.isMatchIgnored&&(X=!1)}if(X){for(;B.endsParent&&B.parent;)B=B.parent;return B}}if(B.endsWithParent)return ae(B.parent,P,W)}function xe(B){return U.matcher.regexIndex===0?(J+=B[0],1):(et=!0,0)}function Ce(B){const P=B[0],W=B.rule,X=new It(W),re=[W.__beforeBegin,W["on:begin"]];for(const ce of re)if(ce&&(ce(B,X),X.isMatchIgnored))return xe(P);return W.skip?J+=P:(W.excludeBegin&&(J+=P),R(),!W.returnBegin&&!W.excludeBegin&&(J=P)),ee(W,B),W.returnBegin?0:P.length}function pe(B){const P=B[0],W=f.substring(B.index),X=ae(U,B,W);if(!X)return Pt;const re=U;U.endScope&&U.endScope._wrap?(R(),Z(P,U.endScope._wrap)):U.endScope&&U.endScope._multi?(R(),oe(U.endScope,B)):re.skip?J+=P:(re.returnEnd||re.excludeEnd||(J+=P),R(),re.excludeEnd&&(J=P));do U.scope&&ne.closeNode(),!U.skip&&!U.subLanguage&&(ze+=U.relevance),U=U.parent;while(U!==X.parent);return X.starts&&ee(X.starts,B),re.returnEnd?0:P.length}function Y(){const B=[];for(let P=U;P!==ie;P=P.parent)P.scope&&B.unshift(P.scope);B.forEach(P=>ne.openNode(P))}let se={};function ke(B,P){const W=P&&P[0];if(J+=B,W==null)return R(),0;if(se.type==="begin"&&P.type==="end"&&se.index===P.index&&W===""){if(J+=f.slice(P.index,P.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=se.rule,X}return 1}if(se=P,P.type==="begin")return Ce(P);if(P.type==="illegal"&&!C){const X=new Error('Illegal lexeme "'+W+'" for mode "'+(U.scope||"<unnamed>")+'"');throw X.mode=U,X}else if(P.type==="end"){const X=pe(P);if(X!==Pt)return X}if(P.type==="illegal"&&W==="")return 1;if(Qe>1e5&&Qe>P.index*3)throw new Error("potential infinite loop, way more iterations than matches");return J+=W,W.length}const ie=$(m);if(!ie)throw be(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Zn=Aa(ie);let Je="",U=k||Zn;const Ct={},ne=new r.__emitter(r);Y();let J="",ze=0,me=0,Qe=0,et=!1;try{if(ie.__emitTokens)ie.__emitTokens(f,ne);else{for(U.matcher.considerAll();;){Qe++,et?et=!1:U.matcher.considerAll(),U.matcher.lastIndex=me;const B=U.matcher.exec(f);if(!B)break;const P=f.substring(me,B.index),W=ke(P,B);me=B.index+W}ke(f.substring(me))}return ne.finalize(),Je=ne.toHTML(),{language:m,value:Je,relevance:ze,illegal:!1,_emitter:ne,_top:U}}catch(B){if(B.message&&B.message.includes("Illegal"))return{language:m,value:ot(f),illegal:!0,relevance:0,_illegalBy:{message:B.message,index:me,context:f.slice(me-100,me+100),mode:B.mode,resultSoFar:Je},_emitter:ne};if(a)return{language:m,value:ot(f),illegal:!1,relevance:0,errorRaised:B,_emitter:ne,_top:U};throw B}}function p(m){const f={value:ot(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return f._emitter.addText(m),f}function g(m,f){f=f||r.languages||Object.keys(t);const C=p(m),k=f.filter($).filter(H).map(R=>d(R,m,!1));k.unshift(C);const O=k.sort((R,Z)=>{if(R.relevance!==Z.relevance)return Z.relevance-R.relevance;if(R.language&&Z.language){if($(R.language).supersetOf===Z.language)return 1;if($(Z.language).supersetOf===R.language)return-1}return 0}),[A,G]=O,_=A;return _.secondBest=G,_}function b(m,f,C){const k=f&&n[f]||C;m.classList.add("hljs"),m.classList.add(`language-${k}`)}function h(m){let f=null;const C=l(m);if(c(C))return;if(z("before:highlightElement",{el:m,language:C}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Na("One of your code blocks includes unescaped HTML.",m.innerHTML);f=m;const k=f.textContent,O=C?u(k,{language:C,ignoreIllegals:!0}):g(k);m.innerHTML=O.value,b(m,C,O.language),m.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(m.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),z("after:highlightElement",{el:m,result:O,text:k})}function w(m){r=Bt(r,m)}const x=()=>{T(),we("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function v(){T(),we("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function T(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function N(){S&&T()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",N,!1);function M(m,f){let C=null;try{C=f(e)}catch(k){if(be("Language definition for '{}' could not be registered.".replace("{}",m)),a)be(k);else throw k;C=s}C.name||(C.name=m),t[m]=C,C.rawDefinition=f.bind(null,e),C.aliases&&L(C.aliases,{languageName:m})}function E(m){delete t[m];for(const f of Object.keys(n))n[f]===m&&delete n[f]}function D(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function L(m,{languageName:f}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=f})}function H(m){const f=$(m);return f&&!f.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=f=>{m["before:highlightBlock"](Object.assign({block:f.el},f))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=f=>{m["after:highlightBlock"](Object.assign({block:f.el},f))})}function q(m){Q(m),o.push(m)}function K(m){const f=o.indexOf(m);f!==-1&&o.splice(f,1)}function z(m,f){const C=m;o.forEach(function(k){k[C]&&k[C](f)})}function y(m){return we("10.7.0","highlightBlock will be removed entirely in v12.0"),we("10.7.0","Please use highlightElement now."),h(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:T,highlightElement:h,highlightBlock:y,configure:w,initHighlighting:x,initHighlightingOnLoad:v,registerLanguage:M,unregisterLanguage:E,listLanguages:D,getLanguage:$,registerAliases:L,autoDetection:H,inherit:Bt,addPlugin:q,removePlugin:K}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Da,e.regex={concat:ve,lookahead:Gt,either:ut,optional:Wo,anyNumberOfTimes:Fo};for(const m in je)typeof je[m]=="object"&&jt(je[m]);return Object.assign(e,je),e},Se=Yt({});Se.newInstance=()=>Yt({});var $a=Se;Se.HighlightJS=Se;Se.default=Se;const Ae=Ro($a),Lt="[A-Za-z$_][0-9A-Za-z$_]*",Ba=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Pa=["true","false","null","undefined","NaN","Infinity"],Jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Qt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],en=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],La=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oa=[].concat(en,Jt,Qt);function tn(e){const t=e.regex,n=(f,{after:C})=>{const k="</"+f[0].slice(1);return f.input.indexOf(k,C)!==-1},o=Lt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(f,C)=>{const k=f[0].length+f.index,O=f.input[k];if(O==="<"||O===","){C.ignoreMatch();return}O===">"&&(n(f,{after:k})||C.ignoreMatch());let A;const G=f.input.substring(k);if(A=G.match(/^\s*=/)){C.ignoreMatch();return}if((A=G.match(/^\s+extends\s+/))&&A.index===0){C.ignoreMatch();return}}},r={$pattern:Lt,keyword:Ba,literal:Pa,built_in:Oa,"variable.language":La},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},v={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,b,h,w,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const T=[].concat(v,p.contains),N=T.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(T)}]),M={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:N},E={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Jt,...Qt]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},H={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(f){return t.concat("(?!",f.join("|"),")")}const q={match:t.concat(/\b/,Q([...en,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},K={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,b,h,w,v,{match:/\$\d+/},d,D,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[v,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},K,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},q,H,E,z,{match:/\$[(.]/}]}}function za(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const _a=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Ae.registerLanguage("javascript",tn),Ae.registerLanguage("sh",za),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Ae.highlight(s,{language:r}).value,o({class:n`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function nn(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(w,x)=>{let v=null;return(...S)=>{a.clearTimeout(v),v=a.setTimeout(()=>w(...S),x)}},p=o`
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
  `,g=({value:w,id:x,children:v=[]})=>{const S=c({class:()=>u.val==x?"active":"",href:`#${x}`});return S.innerHTML=w,r({class:()=>u.val==x?"active":""},S,v.length>0&&s(v.map(g)))},b=w=>w.tagName.charAt(1),h=({contentEl:w})=>{const x=w.querySelectorAll(l);let v=2,S={},T={children:[]},N=T;const M=N;let E=[N];return[...x].forEach(D=>{const $=b(D);D.setAttribute("id",D.textContent),!D.innerHTML.includes("<button")&&(S={value:D.innerHTML,id:D.id??D.textContent,children:[]},v==$?(T=S,N.children.push(T)):v<$?(E.push(N),N=T,T.children.push(S),T=S):v>$&&(N=E[$-1],E=E.slice(0,$-1),N.children.push(S),T=S),v=$)}),M};return function(...x){let[{size:v=t.size??"md",variant:S=t.variant??"plain",color:T=t.color??"neutral",contentEl:N,...M}]=F(x);const E=h({contentEl:N}),D=d(()=>{const L=[...N.querySelectorAll(l)].find(H=>{const{top:Q,height:q}=H.getBoundingClientRect();if(Q+q>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return i({...M,class:I("tableOfContent",v,S,T,p,t==null?void 0:t.class,M==null?void 0:M.class),bauMounted:()=>{a.addEventListener("scroll",D)},bauUnmounted:()=>{a.removeEventListener("scroll",D)}},E.children&&s(E.children.map(g)))}}const on=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(s(l(p??""),te.map(g=>l(g)))),i(So.map(g=>s(l(g),te.map((b,h)=>r(d({color:b,variant:g},{index:h}))))))))}},ja=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Co.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},j=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;Ae.registerLanguage("javascript",tn);const p=nn(e),g=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),b=on(e),h=ja(e),w=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=Ae.highlight(x,{language:"js"}).value}}));return function(v){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(v.title),r(v.description),v.gridItem&&!v.variantColorTableDisable&&[c("Variant/Color"),g(b({Item:v.gridItem(e)}))],v.gridItem&&!v.variantSizeDisable&&[c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g(h({item:v.gridItem}))],c("Usage"),l("Import"),w({text:v.importStatement}),c("Examples"),v.examples.map(T=>i(l(T.title),r(T.description),g(T.createComponent(e)({})),w({text:T.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",Header:b,Content:h,close:w=!0,...x}]=F(u);const v=n.state(w);return a({...x,class:I("collapsible",d,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>I("header",h?v.val?"close":"open":""),onclick:S=>{v.val=!v.val,S.stopPropagation()}},b()),a({class:"content",role:"region",bauMounted:({element:S})=>{v.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:v}),!v.val)},h&&h()))}}const Ha=()=>te.map(e=>`
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
`);function Ve(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:b=t.color??"neutral",data:h=[],...w}]=F(d);const x=n.state(""),v=mt(e,{size:p,variant:g,color:b}),S=N=>M=>{x.val==N?x.val="":x.val=N},T=N=>{const{Header:M,Content:E,name:D}=N,$=()=>r({class:()=>I(x.val==D&&"active")},c({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:H})=>x.val==D},M(N))),L=()=>a({id:`bau-${D}`,"data-state":({element:H})=>x.val==D},E(N));return s({class:I(b,g,p),onclick:S(D)},v({Header:$,Content:L}))};return a({class:I("accordion",l,t==null?void 0:t.class,w.class)},i(h.map(T)))}}const an=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=Ve(e,t);return r=>s({...r,data:i})},Ga=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Ve(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Ua=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,rn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Fa=e=>{const{css:t}=e,n=rn(e),o=Ve(e);return()=>o({color:"warning",data:n,class:t`
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
`,Va=e=>{const{css:t}=e,n=rn(e),o=Ve(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
`,qa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ua,createComponent:Ga},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Wa,createComponent:Fa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ka,createComponent:Va}],gridItem:an},Xa=e=>{const t=j(e);return()=>t(qa)},Za={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ya=()=>te.map(e=>`
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
`);function Me(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
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
  `,r=V(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",onRemove:b,...h},...w]=F(u);return a({...h,class:I("alert",`alert-${p}`,t.class,p,g,d,s,h.class),role:"alert"},i({class:"icon"},Za[g]),a({class:"content"},...w),b&&c({onclick:b}))}}const sn=(e,t)=>{const n=Me(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},Ja=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Me(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Qa=`import alert from "@grucloud/bau-ui/alert";
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
`,er=e=>{const{css:t}=e,n=Me(e,{class:t`
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
    `},d=({id:p,status:g})=>{const b=c.val.findIndex(h=>h.id===p);b!=-1&&(c.val[b].status=g)};return function(g={},...b){const h=({id:v})=>{d({id:v,status:"removing"});const S=c.val.findIndex(T=>T.id===v);S!=-1&&c.val.splice(S,1)},w=({Component:v})=>{const S={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};c.val.length>=i&&h({id:c.val[0].id}),c.val.push(S),setTimeout(()=>h(S),s)},x=v=>r({class:u.item,onclick:()=>h(v)},v.Component());return document.addEventListener("alert.add",v=>w(v.detail)),document.addEventListener("alert.remove",v=>h(v.detail)),r({class:I(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),x))}},rr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=ar(e,{deleteAfterDuration:2e4}),i=V(e),s=Me(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ir={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:sr,createComponent:rr}]},cr=e=>{const t=j(e);return()=>t(ir)},lr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ue(e),s=V(e),r=n`
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
`,dr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ue(e),c=n`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:h=t.color??"neutral",width:w=40,height:x=40,...v},...S]=F(p);return a({class:I(u,t==null?void 0:t.class,v.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:w,height:x,onload:c,onerror:l,class:I(h,b,g,u,t==null?void 0:t.class,v.class),...v}))}}const ln=(e,t)=>{const{css:n}=e,o=cn(e,{...t,class:n`
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
`,fr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:hr,createComponent:br}],gridItem:ln},vr=e=>{const t=j(e);return()=>t(fr)};function Ke(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...g},...b]=F(l);const h=v=>{x.style.opacity=1,x.showModal();const S=d.getBoundingClientRect(),T=x.getBoundingClientRect();S.x<a.innerWidth/2?x.style.left=S.left+"px":x.style.left=S.right-T.width+"px",S.y<a.innerHeight/2?x.style.top=S.top+S.height+"px":(x.style.top=Math.max(0,S.top-T.height)+"px",x.scrollHeight>S.top&&(x.style.height=S.top+"px"))},w=v=>{const S=()=>{x.close(),x.removeEventListener("transitionend",S)};x.addEventListener("transitionend",S),x.style.opacity=0},x=i({role:"presentation",class:I("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v=>v.target===x&&(w(),p==null?void 0:p.call())},s(u));return x.closeDialog=w,x.openDialog=h,x}}const He={sm:12,md:16,lg:24},xr=()=>te.map(e=>`
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
`);function $e(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:g=!0,...b}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${He[u]};
      height: ${He[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${xr()}
    `;return i({class:{deps:[g],renderProp:()=>w=>I("spinner",h,d,p,w==!1?"":"visibility",t==null?void 0:t.class,b.class)},version:"1.1",x:"0px",y:"0px",width:He[u],height:He[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...b},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const wr=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function gt(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:g,Option:b,options:h,getOptionLabel:w=({label:Y})=>Y,getOptionValue:x=({label:Y})=>Y,onSelect:v=()=>{},id:S,required:T,name:N,loading:M,...E},...D]=F(c);const $=Ke(e),L=V(e),H=fe(e,{variant:u,color:d,size:l}),Q=he(e),q=$e(e,{variant:u,color:d,size:l}),K=n.state(),z=n.state(E.value),y=n.state(!1),m=n.state(0),f=()=>{y.val=!1},C=n.state(h),k=Y=>se=>Y.val&&w(se)==w(Y.val),O=()=>{pe.openDialog(),y.val=!0,z.val="",C.val=h,m.val=h.findIndex(k(K));const Y=Ce.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),ae.scrollIntoView({block:"end"}))},A=()=>{pe.closeDialog(),y.val=!1,z.val="",m.val=0},G=Y=>{const{value:se}=Y.target;z.val=se,se?C.val=h.filter(ke=>w(ke).match(new RegExp(`${se}`,"i"))):C.val=h},_=Y=>{pe.open?A():O()},R=({option:Y,index:se})=>ke=>{K.val=Y,m.val=se,A()},Z=()=>{const Y=Ce.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},oe=Y=>{switch(Y.key){case"Escape":A();break;case"ArrowDown":m.val<C.val.length-1?m.val++:m.val=0,Z();break;case"ArrowUp":m.val<=0?m.val=C.val.length-1:m.val--,Z();break;case"Enter":pe.open?(K.val=C.val[m.val],z.val="",A()):O(),Y.preventDefault();break}},ee=L({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":y,"aria-label":p,onclick:_,variant:u,color:d,size:l,class:M==!0&&"loading",disabled:M},()=>K.val?x(K.val):E.value??p,()=>M==!0&&q({visibility:M})),ae=H({value:z,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":y,oninput:G,onkeydown:oe,...E}),xe=H({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:z,required:T,name:N}),Ce=a({class:I(u,d,l,"content")},ae,()=>Q({class:I(u,d,l)},C.val.map((Y,se)=>i({class:()=>I(m.val==se&&"active",k(K)(Y)&&"selected"),onclick:R({option:Y,index:se})},b(Y))))),pe=$({id:S,triggerEl:ee,contentEl:Ce,onClose:f,class:o`
        overflow: hidden;
      `});return n.derive(()=>{K.val&&(xe.value=x(K.val),v(K.val))}),a({...E,class:I("autocomplete",s,t==null?void 0:t.class,E==null?void 0:E.class)},ee,xe,pe)}}const un=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=gt(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},yr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=gt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
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
`,Cr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=V(e,{variant:"outline"}),r=gt(e),c=t.state([]),l=t.state(!1),u=t.state("");async function d({url:b,transform:h=w=>w}){try{l.val=!0;const w=await fetch(b,{});if(w.ok){const x=await w.json();c.val=h(x)}else u.val=w.statusText}catch(w){u.val=w.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((h,w)=>h.name.common.localeCompare(w.name.common))});p();const g=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionLabel:({name:b})=>b.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>p()},"Reload")))},kr=`import { Context } from "@grucloud/bau-ui/context";
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:I("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:I(u,l,c)},d),...g)}}const pn=(e,t)=>{const n=dn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Ar=e=>{const{bau:t}=e,{section:n}=t.tags,o=dn(e);return()=>n(o({content:"10"},"☏"))},Ir=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Dr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ir,createComponent:Ar}],gridItem:pn},Nr=e=>{const t=j(e);return()=>t(Dr)};function bt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=V(e),u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:h=t.color??"neutral",items:w,...x},...v]=F(p);return i({...x,class:I(u,t==null?void 0:t.class,x==null?void 0:x.class)},w.map(({href:S,name:T})=>s((S?l:r)({href:`${a.base}${S}`,color:h,variant:b,size:g,class:I(h,b,g)},T))))}}const mn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=bt(e,t);return a=>o({...a,...n})},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},$r=`import { Context } from "@grucloud/bau-ui/context";
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
`,Br=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Pr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:$r,createComponent:Mr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Pr,createComponent:Br}],gridItem:mn},Or=e=>{const t=j(e);return()=>t(Lr)},gn=(e,t={})=>{const n=V(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},zr=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},_r=`import button from "@grucloud/bau-ui/button";
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
`,Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},jr=`import button from "@grucloud/bau-ui/button";
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
`);function ht(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const bn=(e,t)=>{const n=["ONE","TWO","THREE"],o=V(e,t),a=ht(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Fr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=V(e),i=ht(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Wr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"date",class:I("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const fn=(e,t)=>{const n=hn(e,t);return o=>n({...o})},qr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=hn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Xr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Zr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Xr,createComponent:qr}],gridItem:fn},Yr=e=>{const t=j(e);return()=>t(Zr)};function Jr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:g,Previous:b,Next:h,...w}]=F(c);const x=()=>{s.val<=0?s.val=p.length-1:s.val--},v=()=>{s.val>=p.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(g));return a({...w,class:I("carousel",l,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:I("control","control-previous"),onclick:x},b()),a({class:I("control","control-next"),onclick:v},h()),S)}}const Qr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],es=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=V(e,{class:n`
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
`,ns={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ts,createComponent:es}]},os=e=>{const t=j(e);return()=>t(ns)},vn=(e,t)=>{const n=Fe(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},as=e=>{const{bau:t}=e,{section:n}=t.tags,o=Fe(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},rs=`import chip from "@grucloud/bau-ui/chip";
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({type:"checkbox",required:"required",...d,class:I(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const wn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=xn(e,t);return s=>a({class:o`
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
`,us={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:ls,createComponent:cs}],gridItem:wn},ds=e=>{const t=j(e);return()=>t(us)},ps=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=mt(e),i=V(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},ms=`import button from "@grucloud/bau-ui/button";
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("divider",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const fs=e=>{const{bau:t}=e,{section:n}=t.tags,o=hs(e);return()=>n(o("OR"))},vs=`import divider from "@grucloud/bau-ui/divider";
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...g]=F(r);return a({class:I(i,t==null?void 0:t.class,p.class)},a({class:()=>I("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>I("content",d.val&&"content-open")},g))}}const Ss=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ys(e),s=V(e),r=Rt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Cs=`import drawer from "@grucloud/bau-ui/drawer";
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
`);function yn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=V(e),r=Ke(e),c=he(e),l=o`
    ${Ts()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"outline",color:b=t.color??"neutral",label:h,ListItem:w,items:x,...v},...S]=F(d);const T=n.state(0),N=()=>{q.openDialog(),q.focus()},M=()=>{q.closeDialog()},E=()=>{q.open?M():N()},D=K=>{E(),K.preventDefault()},$=({item:K,index:z})=>y=>{T.val=z,M(),y.preventDefault()},L=K=>{switch(K.preventDefault(),K.key){case"Escape":M();break;case"ArrowDown":T.val<options.length-1?T.val++:T.val=0;break;case"ArrowUp":T.val<=0?T.val=options.length-1:T.val--;break;case"Enter":E();break}},H=()=>c({tabindex:"0",class:I(b,g)},x.map((K,z)=>i({class:()=>I(T.val==z&&"active"),onclick:$({item:K,index:z})},w(K)))),Q=s({type:"button",onclick:D,color:b,variant:g,size:p},h),q=r({triggerEl:Q,contentEl:H()});return a({...v,class:I("dropdownMenu",b,p,l,t==null?void 0:t.class,v==null?void 0:v.class),onkeydown:L},Q,q)}}const As=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,i=yn(e,t),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>i({...c,items:s,ListItem:r,label:"Action"})},Is=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,i=yn(e),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(i({items:s,ListItem:r,label:"Action"}))},Ds=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Ns={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Ds,createComponent:Is}],gridItem:As},Ms=e=>{const t=j(e);return()=>t(Ns)},Sn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=it(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},$s=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=it(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Bs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Ps={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Bs,createComponent:$s}],gridItem:(e,t)=>Sn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Ls=e=>{const t=j(e);return()=>t(Ps)};function ft(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",Component:b,disabled:h,...w}=l;return a({class:I(r.base,h&&r.disabled,t==null?void 0:t.class,l.class)},i({class:I(p,g,d)},b({disabled:h}),s({type:"file",disabled:h,...w})))}}const Cn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=ft(e,t),p=b=>{const h=b.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:b})=>c({class:I(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return b=>d({Component:g,name:"file",accept:"text/*",onchange:p,...b})},Os=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=ft(e),p=b=>{const h=b.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:b})=>c({class:I(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:g,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},zs=`import classNames from "@grucloud/bau-css/classNames";
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
`,_s={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:zs,createComponent:Os}],gridItem:Cn},Rs=e=>{const t=j(e);return()=>t(_s)};function Be(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:I("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}function vt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:g,...b},...h]=F(l);const w=V(e),x=$e(e);return n.bind({deps:[g],render:()=>v=>w({...b,class:I("loadingButton",u,d,p,r,v&&"loading",t==null?void 0:t.class,b==null?void 0:b.class)},x({size:u,variant:d,color:p,visibility:v}),i({class:v&&"loading"},h))})}}const js=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=vt(e),d=Me(e,{variant:"outline",color:"danger"}),p=fe(e),g=Be(e,{class:n`
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
    `});return function({onLoggedIn:w=()=>{}}){const x=t.state(!1),v=t.state("");return b(g({onsubmit:async T=>{const{username:N,password:M}=T.target.elements;T.preventDefault();try{x.val=!0;const E=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:N.value,password:M.value})});if(E.ok){const D=await E.json();w(D)}else E.status==401?v.val="Invalid username or password":v.val=E.statusText}catch(E){v.val=E.message}finally{x.val=!1}}},s(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>v.val&&d(v.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Hs=`import form from "@grucloud/bau-ui/form";
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
      )
    );
  };
};
`,Gs={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:Hs,createComponent:js}]},Us=e=>{const t=j(e);return()=>t(Gs)},kn=(e,t={})=>{const n=fe(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Fs=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=fe(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Ws=`import input from "@grucloud/bau-ui/input";
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
`,Vs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Ws,createComponent:Fs}],gridItem:kn},Ks=e=>{const t=j(e);return()=>t(Vs)},En=(e,t={})=>{const n=ct(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},qs=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ct(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},Xs=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,Zs={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:Xs,createComponent:qs}],gridItem:En},Ys=e=>{const t=j(e);return()=>t(Zs)};function Tn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>te.map(l=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",running:b,...h}]=F(u);return i({...h,role:"progressbar",class:{deps:[b],renderProp:()=>w=>I("linearProgress",d,g,c,w&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const An=(e,t)=>{const n=Tn(e,t);return o=>n({...o,running:!0})},Js=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=V(e),i=Tn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},Qs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ei={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Qs,createComponent:Js}],gridItem:An},ti=e=>{const t=j(e);return()=>t(ei)},In=(e,t)=>{const n=vt(e,t);return o=>n({...o,loading:!0},"Save")},ni=e=>{const{bau:t}=e,{section:n}=t.tags,o=vt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},oi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,ai={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:oi,createComponent:ni}],gridItem:In},ri=e=>{const t=j(e);return()=>t(ai)},si=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ii=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=he(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},si.map(r))},ci=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],li=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=he(e),r=({code:c,label:l})=>i({class:n`
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
`,di={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ui,createComponent:li}],gridItem:ii},pi=e=>{const t=j(e);return()=>t(di)};function xt(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...g},...b]=F(l);return a({class:I("modal",r,p,d,u,t==null?void 0:t.class,g==null?void 0:g.class)},i(...b))}}const Dn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=V(e),c=xt(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},mi=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=V(e),l=xt(e),u=()=>o(Array(10).fill("").map((p,g)=>s(g+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},gi=`import modal from "@grucloud/bau-ui/modal";
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
`,bi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:gi,createComponent:mi}],gridItem:Dn},hi=e=>{const t=j(e);return()=>t(bi)},fi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=V(e),r=Ke(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},vi=`import popover from "@grucloud/bau-ui/popover";
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
  `,u=({text:d})=>({name:p,label:g,href:b})=>s({href:`${a.base}${b}`},r({class:"sublabel"},d),i({class:`label ${d}`},g??p));return function(...p){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:h=t.color??"neutral",data:w={},...x}]=F(p);const{next:v,previous:S}=w;return c({"data-paginationnav":JSON.stringify(w),"aria-label":"pages navigation",...x,class:I("paginationNavigation",g,l,t==null?void 0:t.class,x==null?void 0:x.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(v==null?void 0:v.href)&&u({text:"Next"})(v))}}const Si=e=>{const{bau:t}=e,{section:n}=t.tags,o=yi(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ci=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,ki={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ci,createComponent:Si}]},Ei=e=>{const t=j(e);return()=>t(ki)},Ti=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},Ai=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},Ii=`import paper from "@grucloud/bau-ui/paper";
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=F(c);return a({...p,type:"radio",class:I("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const Mn=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Nn(e,t);return r=>i({class:o`
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
`);function qe(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=V(e),l=Ke(e),u=he(e),d=o`
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
  `;return function(...g){let[{size:b=t.size??"md",variant:h=t.variant??"outline",color:w=t.color??"neutral",label:x,Option:v,options:S,getOptionLabel:T=({label:A})=>A,getOptionValue:N=({label:A})=>A,onSelect:M=()=>{},...E},...D]=F(g);const $=n.state(x),L=n.state(!1),H=n.state(0),Q=()=>{k.openDialog(),k.focus(),L.val=!0},q=()=>{k.closeDialog(),L.val=!1},K=()=>{L.val=!1},z=A=>{k.open?q():Q(),A.preventDefault()},y=({option:A,index:G})=>_=>{$.val=T(A),O.value=N(A),O.setCustomValidity(""),H.val=G,q(),M(A),_.preventDefault()},m=A=>{switch(A.preventDefault(),A.key){case"Escape":q();break;case"ArrowDown":H.val<S.length-1?H.val++:H.val=0;break;case"ArrowUp":H.val<=0?H.val=S.length-1:H.val--;break;case"Enter":k.open?($.val=T(S[H.val]),O.value=N(r),q()):Q();break}},f=()=>u({tabindex:"0",class:I(w,h)},S.map((A,G)=>i({class:()=>I(H.val==G&&"active"),onclick:y({option:A,index:G})},v(A)))),C=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":L,"aria-label":x,onclick:z,color:w,variant:h,size:b},()=>!$.val&&x,$),k=l({triggerEl:C,contentEl:f(),onClose:K}),O=s(E,r({value:""},"--Select Category--"),S.map(A=>r({value:N(A)},T(A))));return O.value=E.value,a({...E,class:I("select",w,b,d,t==null?void 0:t.class,E==null?void 0:E.class),onkeydown:m},O,C,k)}}const $n=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=qe(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Oi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=qe(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
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
`,_i=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=qe(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},Ri=`import select from "@grucloud/bau-ui/select";
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("select-native",u,c,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Pn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Bn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},Gi=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Bn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},Ui=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Fi={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Ui,createComponent:Gi}],gridItem:Pn},Wi=e=>{const t=j(e);return()=>t(Fi)};function wt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...g},...b]=F(l);return i({...g,class:I("skeleton",u,r,t==null?void 0:t.class,g==null?void 0:g.class)},...b)}}const Vi=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=wt(e),s=()=>a({class:n`
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
`,qi=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=wt(e),s=()=>a({class:n`
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
            `}))));return()=>o(s())},Xi=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Zi=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:i,tr:s,td:r}=t.tags,c=wt(e,{class:n`
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
`,Ji={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Ki,createComponent:Vi},{title:"List",description:"A list skeleton.",code:Xi,createComponent:qi},{title:"Table",description:"A table skeleton.",code:Yi,createComponent:Zi}],variantColorTableDisable:!0,variantSizeDisable:!0},Qi=e=>{const t=j(e);return()=>t(Ji)};function Xe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>te.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"range",class:I("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...g)}}const Ln=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Xe(e);return i=>a({...i,oninput:o})},ec=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Xe(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},tc=`import slider from "@grucloud/bau-ui/slider";
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
`,sc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:tc,createComponent:ec},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:oc,createComponent:nc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:rc,createComponent:ac}],gridItem:Ln},ic=e=>{const t=j(e);return()=>t(sc)},On=(e,t)=>{const n=$e(e,t);return o=>n({...o})},cc=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=$e(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},lc=`import spinner from "@grucloud/bau-ui/spinner";
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
  `;return function(...u){let[{color:d,variant:p="plain",size:g,stepperDefs:b=[],activeStepIndex:h,...w},...x]=F(u);const v=n.state(b.map((M,E)=>({...M,index:E}))),S=n.derive(()=>v.val[h.val]),T=M=>{const{Header:E,disabled:D,name:$,index:L}=M;return s({class:()=>I(S.val.name==$&&"active",h.val<L&&"not-completed",h.val>L&&"completed",D&&"disabled")},r({class:"step-number"},L+1),r({class:"step-label"},()=>E(M)))};return a({class:I("stepper",p,g,d,c,t==null?void 0:t.class,w.class)},n.loop(v,i(),T),n.bind({deps:[S],render:()=>M=>M.Content?M.Content({}):""}))}}const mc=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=zn(e),r=V(e),c=({name:b})=>b,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),g())},gc=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,bc=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=V(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},Ze=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},Ye=e=>{const{bau:t}=e,{i:n}=t.tags,o=V(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},le="https://github.com/grucloud/grucloud/",ue="main",hc={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:le,branch:ue,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:le,branch:ue,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:le,branch:ue,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:le,branch:ue,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:le,branch:ue,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:le,branch:ue,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:le,branch:ue,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:le,branch:ue,directory:"examples/google/dns/github-page"}]},fc=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},vc=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=V(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},xc=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=V(e),c=Be(e),l=Ye(e),u=Ze(e),d=vc(e),p=fc(e),g=he(e),b=xt(e);return function({providerName:w,onclickPrevious:x,onclickImportExistingInfra:v,onclickImportFromTemplate:S}){const T=b({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(g(hc[w].map(N=>p({project:N,onclickItem:M=>()=>{T.close(),S(M)}})))),s(r({variant:"outline",onclick:()=>{T.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{v()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{T.showModal()}})),T,u(l({onclick:x})))}},wc=e=>{const{bau:t}=e,{span:n}=t.tags,o=qe(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},yc=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=V(e),l=fe(e),u=Be(e),d=Ye(e),p=Ze(e),g=wc(e);return function({onclickPrevious:h,onclickNext:w}){return u({name:"form-config-aws",onsubmit:v=>{v.preventDefault(),w()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",g({name:"region"}))),p(d({onclick:h}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},Sc=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:g,div:b}=t.tags,h=V(e),w=Ye(e),x=Ze(e),v=fe(e),S=Be(e);return function({onclickPrevious:N,onclickNext:M}){const E=$=>{$.preventDefault(),M()},D=n`
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
    `;return S({name:"form-config-azure",onsubmit:E,"data-infra-create":!0,class:D},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",g("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",v({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",g("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",v({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",g("APP_ID")," and ",g("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),b({class:n`
                  display: inline-flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",v({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",v({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),x(w({onclick:N}),h({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},Cc=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:g,a:b,table:h,tbody:w,th:x,tr:v,td:S}=t.tags,{svg:T,use:N}=t.tagsNS("http://www.w3.org/2000/svg"),M=ft(e),E=V(e),D=Be(e),$=Ye(e),L=Ze(e);return function({onclickPrevious:Q,onclickNext:q}){const K=t.state("No file selected"),z=t.state({}),y=t.state(!0),m=A=>{const G=A.target.files[0];if(G){K.val=G.name;const _=new FileReader;_.readAsText(G),_.onload=()=>{try{debugger;if(_.result){const R=JSON.parse(_.result);z.val=R,R.project_id&&(y.val=!1)}}catch{}},_.onerror=()=>{console.log(_.error)}}else K.val=""},f=({fileName:A,content:G})=>h({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},w(v(x("Credential File"),S(A)),v(x("Project Name"),S(G.project_id)),v(x("Service Account"),S(G.client_email)))),C=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},T({width:100,height:100,fill:"currentColor"},N({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),k=A=>{A.preventDefault(),q()},O=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return D({name:"form-config-google",class:O,onsubmit:k,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",b({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",g("CREATE SERVICE ACCOUNT"),""),d("Set the ",g("Service account name")," to 'grucloud' for instance"),d("Click on ",g("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",g("CONTINUE"),""),d("Click on ",g("DONE"),""),d("Go to the ",g("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",g("Manage keys"),""),d("Click on ",g("ADD KEYS"),", then ",g("Create new key"),""),d("Click on ",g("CREATE")," to download the credential file in JSON format.")),M({"data-input-google-upload":!0,Component:C,name:"file",accept:"application/JSON",onchange:m}),()=>f({fileName:K.val,content:z.val})),L($({onclick:Q}),()=>E({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},kc=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=zn(e),r=bc(e),c=yc(e),l=Sc(e),u=Cc(e),d=xc(e),p=t.state(""),g=t.state(0),b=({name:h})=>h;return function(){const w=E=>()=>{p.val=E,g.val++},x=()=>{g.val++},v=()=>{g.val++},T=[{name:"Provider Selection",Header:b,Content:()=>r({onclickProvider:w}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:N,onclickImportExistingInfra:x,onclickImportFromTemplate:v})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:N,onclickNext:M});case"Azure":return l({onclickPrevious:N,onclickNext:M});case"Google":return u({onclickPrevious:N,onclickNext:M})}}},{name:"Scan",Header:b,Content:()=>a(i("My stepper 3 Content"))}],N=()=>{g.val>0&&g.val--},M=()=>{T.length>g.val+1&&g.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:T,activeStepIndex:g}))}},Ec=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:I("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Rn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=_n(e,t);return r=>a({class:o`
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
`);function Pe(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:i}=t,{div:s,ul:r,li:c}=n.tags,l=o`
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
        padding: 0.5rem 1rem 0 1rem;
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
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"outline",color:b=t.color??"neutral",...h},...w]=F(d);const x=n.state(i),v=a.location.hash.slice(1),S=E=>x.val.find(D=>D.name==E),T=n.state(S(v)??i[0]),N=E=>{const{Header:D,disabled:$,name:L}=E;return c({class:()=>I(T.val.name==L&&"active",$&&"disabled"),onclick:H=>H.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:L},bubbles:!0}))},D(E))},M=s({class:I("tabs",g,p,b,l,t==null?void 0:t.class,h.class)},n.loop(x,r(),N),()=>T.val.Content?T.val.Content(h):"");return M.addEventListener("tab.select",E=>{var L,H;const{tabName:D}=E.detail,$=S(D);$&&((L=T.val.exit)==null||L.call(),T.val=$,(H=$.enter)==null||H.call())},!1),M.addEventListener("tab.add",E=>{var $;const{tab:D}=E.detail;($=D.enter)==null||$.call(),x.val.push(D)},!1),M.addEventListener("tab.remove",E=>{var $;const D=x.val.findIndex(L=>L.name==E.detail.tabName);D>0&&(($=x.val[D].exit)==null||$.call(),x.val.splice(D,1))},!1),M}}const jn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},Pc=e=>{const{bau:t}=e,{div:n,p:o,a}=t.tags,s=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>a({href:"#Tab1"},"TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>a({href:"#Tab2"},"TAB 2"),Content:()=>n(o("My tab 2 Content"))}],variant:"outline",color:"neutral"});return()=>s({})},Lc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Oc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},zc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Hn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},_c=e=>{const{css:t}=e,n=Pe(e,{tabDefs:Hn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
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
`,jc=e=>{const{css:t}=e,n=Hn(e),o=Pe(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
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
`,Gc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Lc,createComponent:Pc},{title:"Extended Tabs",description:"An extended tabs.",code:zc,createComponent:Oc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Rc,createComponent:_c},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Hc,createComponent:jc}],gridItem:jn},Uc=e=>{const t=j(e);return()=>t(Gc)};function Le(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=F(c);return i({...l,class:I("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Fc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(w,x,v,S,T){return{name:w,calories:x,fat:v,carbs:S,protein:T}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:w,calories:x})=>s(i(w),i({class:n`
            text-align: right;
          `},x)),b=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Le(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),b(),l(p.map(g)))))},Wc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Vc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],Kc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:b,calories:h})=>s(i(b),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Le(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),p(),l(Vc.map(d)))))},qc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Te(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Xc=[Te("Frozen yoghurt",159,6,24,4),Te("Ice cream sandwich",237,9,37,4.3),Te("Eclair",262,16,24,6),Te("Cupcake",305,3.7,67,4.3),Te("Gingerbread",356,16,49,3.9)],Zc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:b,calories:h})=>s(i(b),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Le(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),p(),l(Xc.map(d)))))},Yc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Jc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Wc,createComponent:Fc},{title:"Dense",description:"A dense table.",code:qc,createComponent:Kc},{title:"Zebra",description:"A zebra table.",code:Yc,createComponent:Zc}]},Qc=e=>{const t=j(e);return()=>t(Jc)},el=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=nn(e),l=r({id:"content",class:n`
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
`,nl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:tl,createComponent:el}]},ol=e=>{const t=j(e);return()=>t(nl)};function Gn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=ht(e),s=V(e),r=$e(e),c=o`
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
  `,l=({label:b,icon:h,...w})=>s({"aria-label":b,title:b,...w},h),u=({count:b,totalCount:h,page:w,rowsPerPage:x})=>a({class:"pages-numbers"},Number(w-1)*Number(x)+(b>0?1:0),"-",Math.min(w*x,h)," of ",h),d=({count:b,page:h,rowsPerPage:w})=>a({class:"pages-numbers"},(h-1)*w+(b>0?1:0),"-",h*w),p=b=>b<=1,g=(b,h,w)=>b>=Math.ceil(h/w);return function(...h){let[{size:w=t.size??"md",variant:x=t.variant??"outline",color:v=t.color??"neutral",count:S=0,totalCount:T=0,page:N=1,rowsPerPage:M=50,onPageChange:E,isLoading:D=!1,disableFirst:$=()=>p(N),disablePrevious:L=()=>p(N),disableNext:H=()=>g(N,T,M),disableLast:Q=()=>g(N,T,M),...q},...K]=F(h);const z=Math.max(0,Math.ceil(T/M)),y=E({page:1}),m=E({page:N-1}),f=E({page:N+1}),C=E({page:z}),k=[{label:"First",icon:"⟪",onclick:y,disabled:$()},{label:"Previous",icon:"⟨",onclick:m,disabled:L()},{label:"Next",icon:"⟩",onclick:f,disabled:H()},{label:"Last",icon:"⟫",onclick:C,disabled:Q()}];return a({...q,class:I("table-pagination",c,D&&"disabled",t==null?void 0:t.class,q==null?void 0:q.class)},r({class:"spinner",visibility:D,size:"md"}),T>0?u({count:S,totalCount:T,page:N,maxPages:z,rowsPerPage:M}):d({count:S,page:N,maxPages:z,rowsPerPage:M}),i({variant:x,color:v},k.map(O=>l({...O,variant:x,color:v}))))}}const al=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),rl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=al(45),u=({name:v,email:S})=>i(a(v),a(S)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Gn(e),g=Le(e,{class:n`
      max-width: 650px;
    `}),b=t.state(l),h=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),w=t.derive(()=>b.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),x=({page:v})=>S=>{h.val.page=v};return()=>g(s(d(),()=>c(w.val.map(u))),()=>p({...h.val,onPageChange:x}))},sl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),g=t.derive(()=>d.val.length),b=t.state(1),h=t.state(10),w=t.derive(()=>d.val),x=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,v=({page:$})=>L=>{b.val=$,S(x({page:$,per_page:h.val}))};S(x({page:1,per_page:h.val}));async function S($){try{u.val=!0;const L=await fetch($,{});if(L.ok){const H=await L.json();d.val=H;return}throw L}catch(L){p.val=L.message}finally{u.val=!1}}const T=({name:$,description:L,stargazers_count:H})=>i(a($),a(L),a({class:n`
            text-align: right;
          `},H)),N=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),M=Gn(e),E=Le(e,{class:n`
      min-width: 650px;
    `}),D=({message:$})=>l($);return()=>E(()=>M({rowsPerPage:h.val,page:b.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:v,disableNext:()=>!1}),s(N(),()=>p.val&&D({message:p.val}),()=>c(w.val.map(T))))},il=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=rl(e),l=sl(e),u=(...d)=>a({class:n`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:g,onChange:b,...h},...w]=F(c);return i({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>x=>x},class:{deps:[p],renderProp:()=>x=>I("toggle",l,d,u,s,x&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:g},w)}}const Un=(e,t)=>{const{bau:n}=e,o=Oe(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},cl=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},ll=`import toggle from "@grucloud/bau-ui/toggle";

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
`);function yt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...b]=F(r);const h=new Set,w=x=>{const{value:v}=x.target;d?(h.clear(),h.add(v)):h.has(v)?h.delete(v):h.add(v),p({event:x,values:[...h]})};return a({...g,class:I("toggle-group",c,u,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:w},...b)}}const Fn=(e,t)=>{const{bau:n}=e,o=yt(e,t),a=Oe(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},ml=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=yt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},gl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,bl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=yt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},hl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,fl={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:gl,createComponent:ml},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:hl,createComponent:bl}],gridItem:Fn},vl=e=>{const t=j(e);return()=>t(fl)};function St(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...b},...h]=F(c);const w=i({class:I("container",...u.split("-"))},i({class:I("content",g,p,d),role:"tooltip"},l)),x=E=>`move-to-${E}`,v=(E,D,$)=>{if(E()){const L=x(D);w.classList.add(L),w.classList.add(D),w.classList.remove($)}},S=(E,D)=>{const $=x(E);w.classList.contains($)&&(w.classList.remove($),w.classList.add(D),w.classList.remove(E))},T=E=>{const D=w.getBoundingClientRect();v(()=>D.x<0,"right","left"),v(()=>D.x+D.width>a.innerWidth,"left","right"),v(()=>D.y<0,"bottom","top"),v(()=>D.bottom>a.innerHeight,"top","bottom"),w.classList.add("visible")},N=E=>{w.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...b,class:I("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:E})=>{E.addEventListener("mouseover",T),E.addEventListener("mouseout",N)},bauUnmounted:({element:E})=>{E.removeEventListener("mouseover",T),E.removeEventListener("mouseout",N)}},...h,w)}}const Wn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=V(e),r=St(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},xl=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=V(e),s=St(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},wl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,yl=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Fe(e,{variant:"outline",color:"primary"}),c=St(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
`,Cl={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:wl,createComponent:xl},{title:"Grid",description:"Various tooltip position",code:Sl,createComponent:yl}],gridItem:Wn},kl=e=>{const t=j(e);return()=>t(Cl)},Vn=(e,t)=>{const n=st(e,t);return o=>n(o)},El=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({}))},Tl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
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
  `});function Kn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Dl({css:o,createGlobalStyles:a}),d=mt(e),p=({depth:g=1,maxDepth:b,color:h,variant:w,size:x})=>v=>{const{children:S,expanded:T}=v,N=n.state(!T),M=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:D=>{S&&(N.val=!N.val)}},i(v.data)),E=()=>s({class:I(h,x)},S.map(p({depth:g+1,maxDepth:b})));return r(d({size:x,Header:M,Content:S&&g<b&&E}))};return function({tree:b,maxDepth:h=1/0,size:w=t.size??"md",variant:x=t.variant??"outline",color:v=t.color??"neutral",...S}){return c({class:I(u.nav,w,x,v,t==null?void 0:t.class,S.class)},b.children&&s(b.children.map(p({maxDepth:h,color:v,variant:x,size:w}))))}}const qn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Kn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},Nl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Kn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Ml=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,$l={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ml,createComponent:Nl}],gridItem:qn},Bl=e=>{const t=j(e);return()=>t($l)},Pl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=on(e),u=V(e),d=[{name:"Accordion",Item:an(e)},{name:"Alert",Item:sn(e)},{name:"Autocomplete",Item:un(e)},{name:"Avatar",Item:ln(e)},{name:"Badge",Item:pn(e)},{name:"Breadcrumbs",Item:mn(e)},{name:"Button",Item:gn(e)},{name:"Button Group",Item:bn(e)},{name:"Calendar",Item:fn(e)},{name:"Checkbox",Item:wn(e)},{name:"Chip",Item:vn(e)},{name:"DrillDown Menu",Item:Sn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:Cn(e)},{name:"Input",Item:kn(e)},{name:"Input Search",Item:En(e)},{name:"Linear Progress",Item:An(e)},{name:"Loading Button",Item:In(e)},{name:"Modal",Item:Dn(e)},{name:"Radio Button",Item:Mn(e)},{name:"Select",Item:$n(e)},{name:"Select Native",Item:Pn(e)},{name:"Slider",Item:Ln(e)},{name:"Spinner",Item:On(e)},{name:"Switch",Item:Rn(e)},{name:"Tabs",Item:jn(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Fn(e)},{name:"Tooltip",Item:Wn(e)},{name:"Tree View",Item:qn(e)}];return()=>o({class:n`
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
            `},l(p))))},Ll=({context:e})=>{const t=Pl(e);return[{path:"",action:n=>({title:"Bau UI",component:Lo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ra(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Xa(e)})},{path:"alert",action:()=>({title:"Alert",component:or(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:cr(e)})},{path:"animate",action:()=>({title:"Animate",component:gr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Tr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:vr(e)})},{path:"badge",action:()=>({title:"Badge",component:Nr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Or(e)})},{path:"button",action:()=>({title:"Button",component:Gr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Yr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:os(e)})},{path:"chip",action:()=>({title:"Chip",component:is(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ds(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:bs(e)})},{path:"divider",action:()=>({title:"Divider",component:ws(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Es(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ms(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ls(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Rs(e)})},{path:"form",action:()=>({title:"Form",component:Us(e)})},{path:"input",action:()=>({title:"Input",component:Ks(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:Ys(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ti(e)})},{path:"list",action:()=>({title:"List",component:pi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:ri(e)})},{path:"modal",action:()=>({title:"Modal",component:hi(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Ei(e)})},{path:"paper",action:()=>({title:"Paper",component:Ni(e)})},{path:"popover",action:()=>({title:"Popover",component:wi(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Pi(e)})},{path:"select",action:()=>({title:"Select",component:Hi(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:Wi(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Qi(e)})},{path:"slider",action:()=>({title:"Slider",component:ic(e)})},{path:"spinner",action:()=>({title:"Spinner",component:dc(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Ac(e)})},{path:"switch",action:()=>({title:"Switch",component:$c(e)})},{path:"table",action:()=>({title:"Table",component:Qc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:ol(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:il(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Uc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:dl(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:vl(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:kl(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Il(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Bl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:_o(e)})}]},Ol=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),zl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},_l=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};mo();const Xn={title:"Bau",base:"/bau/bau-ui"},ge=yo({config:Xn}),{bau:Rl}=ge;ge.states={drawerOpen:Rl.state(!0)};_l(ge);no({routes:Ll({context:ge}),onLocationChange:zl({context:ge,LayoutDefault:Mo(ge),config:Xn}),notFoundRoute:Ol(ge)});
