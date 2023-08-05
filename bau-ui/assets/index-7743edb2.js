(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const ge=(e,r)=>({...e,paths:[...r,e.path]}),oe=({paths:e=[],routes:r})=>r.flatMap(({children:a,...t})=>{const o=ge(t,e);return a?[o,...oe({paths:[...e,t.path],routes:a})]:o}),ve=({paths:e})=>{const r=e.map(a=>a instanceof RegExp?a.source:a).map(a=>String.raw`\/${a}`).join("");return new RegExp(`^${r}$`)},ye=({routes:e=[],notFoundRoute:r})=>{const a=oe({routes:e}).map(t=>({...t,regex:ve(t)}));return{resolve:({pathname:t})=>{const o=a.find(({regex:n})=>n.test(t));return o?o.action({match:t.match(o.regex)}):r}}};function we({routes:e,notFoundRoute:r,onLocationChange:a}){const t=ye({routes:e,notFoundRoute:r});return window.addEventListener("popstate",o=>{o.state!=null&&a({router:t})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(o,n,s)=>{o.apply(n,s),a({router:t})}}),document.addEventListener("click",o=>{const{target:n}=o,s=n.getAttribute("href");n.tagName==="A"&&s&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),o.preventDefault())}),a({router:t}),t}const xe=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],ke=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Se=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ce=()=>new Array(20).fill("").map((e,r)=>`--color-gray-${r*50}: hsl(0, 0%, ${100-5*r}%);`).join(`
`),se=({dark:e})=>new Array(20).fill("").map((r,a)=>`--color-emphasis-${a*50}: var(--color-gray-${e?1e3-a*50:a*50});`).join(`
`),Ee=([e,{h:r,s:a,l:t}])=>[`--color-${e}-h: ${r};`,`--color-${e}-s: ${a};`,`--color-${e}-l: ${t};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ke.map(([o,n])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),...Se.map(([o,n])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:r=xe}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${r.map(([a,t])=>Ee([a,t])).join(`
`)}
  ${Ce()}
  ${se({})}
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 90%);
  --color-content-secondary: hsl(0, 0%, 30%);
  --background-color: var(--color-white);
  --background-surface-color: var(--color-content-inverse);
  --global-border-width: 1px;
  --global-radius: 0.4rem;
  --font-color-base: var(--color-content);
  --font-color-disabled: var(--color-emphasis-700);
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
  --link-color: var(--color-primary)
}
:root {
  font-family: var(--font-family);
  color-scheme: var(--color-scheme);
  color: var(--color-content);
  font: var(--font-size-base) / var(--line-height-base) var(--font-family)
}
body {
  margin: 0;
}
`}function Me(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Z=e=>Object.prototype.toString.call(e??0).slice(8,-1),$e=e=>Z(e)=="Object",ee=e=>Z(e)=="Function",K=e=>["Object","Array"].includes(Z(e)),te=Object.getPrototypeOf,J=e=>G(e)?e.val:e,G=e=>e==null?void 0:e.__isState,Te=["splice","push","pop","shift","unshift","sort","reverse"],Y=(e,r)=>{const a=new Array(e.length);for(let t=0;t<e.length;t++)a[t]=r(e[t],t);return a};function Ie(e){let r=(e==null?void 0:e.window)??window,{document:a}=r,t,o=new Set,n=new Set,s=!1,i,l=c=>a.createElement(c),d=(c,h,f)=>{let y=i;i=h;let S=c(f);return i=y,S},m=()=>{t||(t=window.requestAnimationFrame(()=>{o.forEach(c=>{c.bindings=c.bindings.filter(h=>{var f;return(f=h.element)==null?void 0:f.isConnected}),!c.bindings.length&&!c.computed&&o.delete(c)}),t=void 0}))},p=(c,h,f,y,S,I)=>{var P;if(s){n.add(c);return}for(let A of c.bindings){let{deps:C,element:T,renderInferred:L,render:H,renderItem:B}=A;if(B&&h)(P=v(T,y,(...q)=>w(B(...q)),f,S,I)[h])==null||P.call();else{let q=L?L({element:T}):H({element:T,renderItem:B})(...C.map(J));q!==T&&T.replaceWith(A.element=w(q))}}$(c),m()},u=(c,h,f=[])=>({get(y,S,I){var P;if(i==null||i.add(c),S==="_isProxy")return!0;if(!((P=y[S])!=null&&P._isProxy)&&!G(y[S])&&K(y[S]))y[S]=new Proxy(y[S],u(c,h,[...f,S]));else if(Te.includes(S)){let A=y[S];return(...C)=>{let T=A.apply(y,C);return p(c,S,T,C,h,f),T}}return Reflect.get(y,S,I)},set(y,S,I,P){let A=Reflect.set(y,S,I,P);return p(c,"setItem",A,{prop:S,value:I},h,[...f,S]),A}}),x=(c,h)=>new Proxy(h,u(c,h)),v=(c,h,f,y,S,I)=>{let P=()=>c.replaceChildren(...Y(y,f)),A=C=>c[C]&&c.removeChild(c[C]);return{assign:P,sort:P,reverse:P,setItem:()=>{var T;let C=I[0];(T=c.children[C])==null||T.replaceWith(f(S[C],C))},push:()=>c.append(...Y(h,(C,T)=>f(C,S.length+T))),unshift:()=>c.prepend(...Y(h,f)),pop:()=>A("lastChild"),shift:()=>A("firstChild"),splice:()=>{let[C,T,...L]=h;const{length:H}=c.children;for(let B=C>=0?Math.min(C+T-1,H-1):H-1;B>=(C>=0?C:H+C);B--)c.children[B].remove();if(L.length){let B=L.forEach((q,be)=>f(q,C+be));c.children[C]?c.children[C].after(...B):c.append(...B)}}}},b=c=>({oldVal:c,bindings:[],listeners:[],__isState:!0,get val(){let h=this;return i==null||i.add(h),h.valProxy??(h.valProxy=K(c)?x(h,c):c,h.valProxy)},set val(h){let f=this,y=f.val;K(h)?(f.valProxy=x(f,h),p(f,"assign",h)):h!==y&&(f.valProxy=h,p(f)),f.oldVal=y}}),w=c=>c==null||c===!1?l("span"):c.nodeType?c:a.createTextNode(c),g=(c,h)=>{let f=new Set;return h.val=d(c,f),f},k=c=>{let h=b(),f=g(c,h);h.computed=!0;for(let y of f)y.listeners.push({computed:c,deps:f,state:h});return h},$=c=>{for(let h of[...c.listeners])g(h.computed,h.state)},E=(c,...h)=>{if(h.length){let f=[];for(let y of h.flat(1/0))y!=null&&f.push(G(y)?j({deps:[y],render:()=>S=>S}):ee(y)?N({renderInferred:y}):w(y));c.append(...f)}},D={},F=(c,h)=>c&&(Object.getOwnPropertyDescriptor(c,h)??F(te(c),h)),X=(c,h,f)=>{var y;return D[c+","+h]??(D[c+","+h]=((y=F(f,h))==null?void 0:y.set)??0)},R=(c,h)=>new MutationObserver((f,y)=>{f.filter(S=>S.removedNodes).forEach(S=>[...S.removedNodes].find(I=>I===c&&(h({element:c}),y.disconnect(),!0)))}).observe(c.parentNode,{childList:!0}),_=c=>new Proxy(function(f,...y){var C;let S=y[0],[I,...P]=!G(S)&&$e(S)?y:[{},...y],A=c?a.createElementNS(c,f):l(f);for(let[T,L]of Object.entries(I)){if(T.startsWith("bau"))continue;let H=X(f,T,te(A))?B=>A[T]=B:B=>A.setAttribute(T,B);L==null||(G(L)?j({deps:[L],render:()=>()=>(H(L.val),A)}):ee(L)&&(!T.startsWith("on")||L.isDerived)?N({renderInferred:()=>(H(L({element:A})),A)}):L.renderProp?j({deps:L.deps,render:()=>()=>(H(L.renderProp({element:A})(...L.deps.map(J))),A)}):H(L))}return E(A,...P),(C=I.bauCreated)==null||C.call(I,{element:A}),I.bauMounted&&r.requestAnimationFrame(()=>I.bauMounted({element:A})),I.bauUnmounted&&r.requestAnimationFrame(()=>R(A,I.bauUnmounted)),A},{get:(h,f)=>h.bind(void 0,f)}),z=(c,h,f)=>{c.element=w(f);for(let y of h)G(y)&&(o.add(y),y.bindings.push(c));return c.element},N=({renderInferred:c,element:h})=>{let f=new Set,y=d(c,f,{element:h});return z({renderInferred:c},f,y)},j=({deps:c,element:h,render:f,renderItem:y})=>z({deps:c,render:f,renderItem:y},c,f({element:h,renderItem:y})(...c.map(J))),V=(c,h,f)=>j({deps:[c],render:({renderItem:y})=>S=>(h.append(...Y(S,y)),h),renderItem:f}),fe=c=>{s=!0,c(),s=!1,n.forEach(p),n.clear()};return{tags:_(),tagsNS:_,state:b,bind:j,loop:V,derive:k,stateSet:o,batch:fe}}const Le=e=>{let r=0,a=11;for(;r<e.length;)a=101*a+e.charCodeAt(r++)>>>0;return"bau"+a},De=(e,r,a,t)=>{const o=e.createElement("style");o.id=a,o.append(t),(r??e.head).append(o)},Be=(e,r)=>e.reduce((a,t,o)=>a+t+(r[o]??""),"");function Ne(e){let{document:r}=(e==null?void 0:e.window)??window;const a=t=>(o,...n)=>{const s=Be(o,n),i=Le(s);return!r.getElementById(i)&&De(r,e==null?void 0:e.target,i,t(i,s)),i};return{css:a((t,o)=>`.${t} { ${o} }`),keyframes:a((t,o)=>`@keyframes ${t} { ${o} }`),createGlobalStyles:a((t,o)=>o)}}function Pe(e={}){return{bau:Ie(),...Ne(),tr:r=>r,window,...e}}function M(...e){return e.filter(r=>r).join(" ")}function O(e){const{bau:r,css:a}=e,t={root:a`
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        transition: opacity var(--transition-fast) linear;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
      }
      &:active {
        &::before {
          opacity: 1;
        }
      }
      &:hover {
        &::before {
          opacity: 0.5;
        }
      }
    `,button:a`
      cursor: pointer;
    `,a:a``,flat:a`
      border-width: 0;
    `,flatPrimary:a`
      color: var(--color-primary);
    `,flatAccent:a`
      color: var(--color-secondary-darkest);
    `,raised:a`
      box-shadow: var(--shadow-s);
      &:active {
        box-shadow: var(--shadow-m);
      }
    `,raisedPrimary:a`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,raisedAccent:a`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,disabled:a`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,raisedDisabled:a`
      background-color: rgba(0, 0, 0, 0.12);
    `,fullWidth:a`
      text-align: center;
      width: 100%;
    `,ripple:a`
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform var(--transition-slow), opacity 1s;
      }
      &:active::after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      }
    `};return function(n,...s){const{primary:i,accent:l,raised:d,disabled:m,ripple:p,href:u,icon:x,...v}=n;return(u?r.tags.a:r.tags.button)({...v,class:M(t.root,u?t.a:t.button,d?t.raised:t.flat,!d&&i&&t.flatPrimary,!d&&l&&t.flatAccent,d&&i&&t.raisedPrimary,d&&l&&t.raisedAccent,p&&t.rippledisabled&&t.disabled,m&&d&&t.raisedDisabled,n.class),href:u,...!u&&{type:"button"}},s)}}function Re(e){const{tr:r,bau:a,css:t,config:o}=e,{i:n,header:s,h1:i,div:l,a:d,img:m,b:p,ul:u,li:x}=a.tags,{svg:v,path:b}=a.tagsNS("http://www.w3.org/2000/svg"),w=a.state(!0),g=O(e),k=()=>n({class:t`
          color: var(--font-color-inverse);
        `},v({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},b({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),$=()=>l({class:t`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},g({"aria-label":"drawer",onclick:()=>w.val=!w.val},k()),d({href:`${o.base}/`,class:t`
            text-decoration: none;
            font-size: x-large;
          `},p(r("Bau Story Book"))),u([{label:"Components",href:`${o.base}/components`},{label:"Pages",href:`${o.base}/pages`}].map(({href:D,label:F})=>x({class:t`
                display: inline;
                list-style: none;
                text-decoration: none;
                padding: 0.5rem;
              `},d({href:D,class:t`
                  text-decoration: none;
                `},F))))),E=()=>d({class:t`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},m({alt:"GitHub",src:"./github-mark-white.svg",width:30,height:30}));return function(){return s({class:t`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          height: var(--header-height);
        `},$(),E())}}function ze({tr:e,bau:r,css:a}){const{footer:t,span:o,a:n,ul:s,li:i,p:l}=r.tags;return function(){return t({class:a`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},o("version: 0.40.0"))}}const He=({css:e,createGlobalStyles:r})=>(r`
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
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color var(--transition-fast) ease-in-out;
          &:hover {
            background: var(--color-emphasis-100);
            cursor: pointer;
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
            color: var(--menu-color);
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
    `});function ie(e,{renderMenuItem:r}){const{bau:a,css:t,createGlobalStyles:o,window:n}=e,{ul:s,li:i,nav:l,div:d}=a.tags,m=He({css:t,createGlobalStyles:o}),p=({element:b,closeState:w})=>{b.scrollHeight!=0&&(w.val?u(b):x(b))};function u(b){b.style.height=b.scrollHeight+"px";const w=()=>{b.removeEventListener("transitionend",w)};b.addEventListener("transitionend",w),n.requestAnimationFrame(()=>{b.style.height="0px"})}function x(b){const w=()=>{b.removeEventListener("transitionend",w),b.style.height=null};b.addEventListener("transitionend",w),b.style.height=b.scrollHeight+"px"}const v=({depth:b=1,maxDepth:w})=>g=>{const{children:k,expanded:$}=g,E=a.state(!$);return i({class:()=>M(k?E.val?m.collapsed:m.expanded:"")},d({class:t`
              cursor: pointer;
            `,onclick:D=>{k&&(E.val=!E.val)}},r(g.data)),k&&b<w&&s({bauMounted:({element:D})=>{E.val&&(D.style.height="0px")},"aria-expanded":({element:D})=>(p({element:D,closeState:E}),!E.val)},k.map(v({depth:b+1,maxDepth:w}))))};return function({tree:w,maxDepth:g=1/0,...k}){return l({class:M(m.nav,k.class)},w.children&&s(w.children.map(v({maxDepth:g}))))}}function U(e){const{tr:r,bau:a,css:t}=e,{div:o,ul:n,li:s,nav:i,a:l,span:d}=a.tags,p=ie(e,{renderMenuItem:({name:u,id:x})=>(x?l:d)({href:`#${x}`},u)});return function({componentList:x,name:v}){const b={data:{name:"Root Menu"},children:[{data:{name:v},expanded:!0,children:x.map(w=>({data:w}))}]};return o({class:t`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},p({tree:b}))}}const Fe=e=>{const{bau:r,css:a}=e,{div:t}=r.tags,o=Re(e);U(e);const n=ze(e);return function({component:i}){return t({class:a`
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "header"
            "main"
            "footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `},o(),i(),n())}},le=()=>[{name:"Accordion",id:"accordion"},{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Animate",id:"animate"},{name:"Avatar",id:"avatar"},{name:"Breadcrumbs",id:"breadcrumbs"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"DrillDown",id:"drillDownMenu"},{name:"File Input",id:"fileInput"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"Theme Switch",id:"theme-switch"},{name:"Tree View",id:"treeview"}];function Oe(e,{accordionDefs:r}){const{bau:a,css:t}=e,{div:o,ul:n,li:s,header:i}=a.tags,l=a.state(""),d=u=>x=>{l.val==u?l.val="":l.val=u},m=({element:u,open:x})=>{const v=()=>{u.removeEventListener("transitionend",v)};function b(g){g.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{g.style.height="0px"})}function w(g){g.addEventListener("transitionend",v),g.style.height=g.scrollHeight+"px"}u.scrollHeight!=0&&(x?w(u):b(u))},p=t`
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
        border: 1px solid var(--color-emphasis-200);
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        &:hover {
          border-color: var(--color-emphasis-500);
        }
        & header {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
        }
        & header.active {
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
  `;return function(x){const v=b=>{const{Header:w,Content:g,name:k}=b;return s({onclick:d(k)},i({class:()=>M(l.val==k&&"active")},w(b)),o({class:"content","aria-expanded":({element:$})=>{const E=l.val==k;return m({element:$,open:E}),E}},g(b)))};return o({class:M("accordion",p,x.class)},n(r.map(v)))}}const je=e=>{const{tr:r,bau:a,css:t}=e,{section:o,div:n,h3:s,h2:i,p:l}=a.tags,d=(...u)=>n({class:t`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...u),p=Oe(e,{accordionDefs:[{name:"Item1",Header:()=>n("Item 1"),Content:()=>n(l("Item 1 Content"))},{name:"Item2",Header:()=>n("Item 2"),Content:()=>n(l("Item 2 Content"))},{name:"Item3",Header:()=>n("Item 3"),Content:()=>n(l("Item 3 content"))}]});return()=>o({id:"accordion"},i(r("Accordion")),s("Basic Accordion"),d(p({})),s("Accordion width: fit-content"),d(p({class:t`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),d(p({class:t`
            &.accordion {
              & ul {
                & li {
                  & header {
                    &::after {
                      content: "\u002B";
                    }
                  }
                  & header.active {
                    &::after {
                      transform: rotate(45deg);
                    }
                  }
                }
              }
            }
          `})))},ce={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},Q=e=>`var(--color-${e}-darkest)`,Xe=()=>Object.keys(ce).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${Q(e)};
    color: ${Q(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${Q(e)};
    }
  }`).join(`
`),_e=({css:e,createGlobalStyles:r})=>(r`
:root {
  --alert-border-left-width: 8px;
}
${Xe()}
`,{base:e`
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
    `});function de(e){const{bau:r,css:a,createGlobalStyles:t,tr:o}=e,{div:n}=r.tags,s=_e({css:a,createGlobalStyles:t}),i=O(e),l=({onclick:d})=>i({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(m,...p){const{severity:u="info",onRemove:x,...v}=m;return n({...v,class:M(s.base,`alert-${u}`,m.class),role:"alert"},n({class:"icon"},ce[u]),n({class:"content"},...p),x&&l({onclick:x}))}}const qe=e=>{const{tr:r,bau:a}=e,{section:t,div:o,h3:n,h2:s,h4:i,p:l}=a.tags,d=de(e);return()=>t({id:"alert"},s(r("Alert Examples")),n("Info"),o(d({severity:"danger"},i("Something went wrong"),l("Error code ",404),l("Status ","Not Found")),d({severity:"warning",onRemove:m=>{m.preventDefault()}},"Alert warning"),d({severity:"info"},"My Message"),d({severity:"success"},i("Great Success"),l("Alert success message"))))};function ue(e,r={}){return function({parent:t,animationHide:o,animationShow:n},s){s.style.animation=n;const i=()=>{s.removeEventListener("animationend",i),s.style.animation=""};return s.addEventListener("animationend",i),new MutationObserver((l,d)=>{l.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(p=>{t.style.position="relative";const u=p.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=o,m.previousSibling?m.previousSibling.after(u):m.nextSibling?m.nextSibling.before(u):m.target&&m.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),d.disconnect(),!0}))}).observe(t,{childList:!0,subtree:!0}),s}}const Ge=({keyframes:e})=>({hideRight:e`
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
 `}),We=e=>{const{bau:r}=e,{section:a,div:t,h1:o}=r.tags,n=ue(),s=O(e),i=Ge(e);return function(){const l=r.state(!0),d=t(),m=p=>{d.replaceChildren(n({parent:d,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},t(p.val?"Ciao":"")))};return m(l),a({id:"animate"},t(o("Test Animate"),t(s({onclick:()=>{l.val=!l.val,m(l)}},()=>l.val?"Hide":"Show")),d))}};function Ve(e,r={}){const{bau:a}=e,{span:t,img:o}=a.tags,n=a.state(!0),s=a.state(!1),i=()=>n.val=!1,l=d=>{n.val=!1,s.val=!0};return function({width:m=60,height:p=60,...u},...x){return t({class:M(r.cssOverride,u.class)},()=>n.val?"Loading...":"",()=>s.val&&"Error",o({width:m,height:p,onload:i,onerror:l,...u}))}}const Ye=e=>{const{tr:r,bau:a,css:t}=e,{section:o,h2:n}=a.tags,s=t`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=Ve(e);return()=>o({id:"avatar"},n(r("Avatar")),i({class:s,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),i({class:s,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),i({src:"./grucloud.svg",alt:"GruCloud"}))},Ue=(e,{limit:r=10,deleteAfterDuration:a=15e3}={})=>{const{bau:t,css:o,keyframes:n}=e,{div:s}=t.tags,i=t.state([]),l={inserting:n`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:n`
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
    `},m=({id:p,status:u})=>{const x=i.val.findIndex(v=>v.id===p);x!=-1&&(i.val[x].status=u)};return function(u={},...x){const v=({id:g})=>{m({id:g,status:"removing"});const k=i.val.findIndex($=>$.id===g);k!=-1&&i.val.splice(k,1)},b=({Component:g})=>{const k={id:Math.random().toString(10).split(".")[1],Component:g,status:"inserting"};i.val.length>=r&&v({id:i.val[0].id}),i.val.push(k),setTimeout(()=>v(k),a)},w=g=>s({class:d.item,onclick:()=>v(g)},g.Component());return document.addEventListener("alert.add",g=>b(g.detail)),document.addEventListener("alert.remove",g=>v(g.detail)),s({class:M(d.stack,u.class)},t.loop(i,s(),w))}},Ke=e=>{const{tr:r,bau:a}=e,{section:t,h1:o}=a.tags,n=Ue(e,{deleteAfterDuration:2e4}),s=O(e),i=de(e);return function(){return t({id:"alert-stack"},n(),o("Alert stack"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"success"},r("Infrastructure Created"))}}))}},"success alert"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"danger"},r("Error creating infrastructure"))}}))}},"danger alert"))}};function Je(e){const{bau:r,css:a}=e,{ul:t,li:o,a:n,span:s}=r.tags,i=a`
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
  `;return function({items:d,...m}){return t({"aria-label":"Breadcrumbs",...m,class:M(i,m.class)},d.map(({href:p,name:u})=>o((p?n:s)({href:p},u))))}}const Qe=e=>{const{tr:r,bau:a}=e,{section:t,h2:o}=a.tags,n={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},s=Je(e);return()=>t({id:"breadcrumbs"},o(r("Breadcrumbs")),s(n))},Ze=e=>{const{tr:r,bau:a,css:t}=e,{section:o,p:n,h2:s,h3:i}=a.tags,l=O(e);return()=>o({id:"button",class:t`
          & button {
            margin: 0.5rem;
          }
        `},s(r("Button Examples")),i("Flat"),n(l({},"Do stuff"),l({primary:!0},r("FLAT PRIMARY")),l({accent:!0},r("FLAT ACCENT")),l({ripple:!0},r("FLAT ACCENT")),l({disabled:!0},r("DISABLED"))),i("Primary"),n(l({primary:!0},r("primary")),l({primary:!0,raised:!0},r("primary Raised")),l({ripple:!0,raised:!0},r("primary ripple")),l({disabled:!0,raised:!0},r("primary DISABLED"))),i("Raised"),n(l({raised:!0},r("Raised FLAT")),l({primary:!0,raised:!0},r("Raised PRIMARY")),l({accent:!0,raised:!0},r("Raised ACCENT")),l({ripple:!0,raised:!0},r("Raised RIPPLE")),l({disabled:!0,raised:!0},r("Raised DISABLED"))),i("Full With"),n(l({class:t`
              width: 100%;
            `,raised:!0},r("raised FLAT")),l({class:t`
              width: 100%;
            `,primary:!0},r("Raised PRIMARY"))),i("Icon"),n(l({"aria-label":"Close"},"✖"),l({primary:!0},"✖"),l({raised:!0},"✖"),l({},"TODO")))};function et(e,r={}){const{bau:a,css:t}=e,{input:o}=a.tags,n={base:t`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--global-radius);
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all var(--transition-fast) ease-in-out;
      box-shadow: var(--shadow-s);
      border: 2px solid var(--color-gray-600);
      position: relative;
      &:hover {
        transform: scale(1.05);
      }
      &:disabled {
        border: 2px dashed var(--color-gray-500);
      }
      &:checked {
        border: 2px solid var(--color-primary);
        background-color: var(--color-primary);
      }
      &::after {
        content: "\u2716";
        position: absolute;
        font-size: 1.2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-primary);
        opacity: 0;
      }
      &:checked::after {
        color: var(--color-gray-100);
        opacity: 1;
      }
    `};return function(i,...l){return o({class:M(n.base,i.class),type:"checkbox",required:"required",...i})}}const tt=e=>{const{tr:r,bau:a,css:t}=e,{section:o,div:n,label:s,h2:i,form:l}=a.tags,d=et(e),m=a.state(!1),p=a.state(!1),u=v=>b=>{v.val=!!b.target.checked},x=(...v)=>n({class:t`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...v);return()=>o({id:"checkbox"},l(i(r("Checkbox Examples")),x(d({id:"myCheckbox",name:"myCheckbox",checked:m,onchange:u(m)}),s({for:"myCheckbox"},"My Checkbox")),x(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:p,onchange:u(p)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function rt(e){const{bau:r,css:a}=e,{div:t}=r.tags,o=a`
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
  `;return function({openState:s,...i},...l){return t({class:M(o,i.class)},t({class:()=>M("overlay",s.val&&"overlay-open"),onclick:()=>{s.val=!1}}),t({class:()=>M("content",s.val&&"content-open")},...l))}}const at=e=>{const{tr:r,bau:a}=e,{section:t,h2:o}=a.tags,n=a.state(!1),s=rt(e),i=O(e),l=U(e);return()=>t({id:"drawer"},o(r("Drawer")),i({raised:!0,onclick:()=>{n.val=!n.val}},"OPEN DRAWER"),s({openState:n},l({componentList:le(),name:"Components"})))},re="0.3s",me=({parent:e,grandParent:r})=>a=>{const{children:t,...o}=a,n=structuredClone(o);return n.children=t==null?void 0:t.map(me({parent:a,grandParent:e})),e&&(e.parentTree=r),n.parentTree=e,n},he=e=>r=>{var a;if(!e)return r;if(((a=r==null?void 0:r.data)==null?void 0:a.href)==e)return r.children?r:r.parentTree;if(r.children)for(let t=0;t<r.children.length;t++){const o=he(e)(r.children[t]);if(o)return o}},nt=({window:e,subTree:r})=>{var a;return e.location.pathname===((a=r==null?void 0:r.data)==null?void 0:a.href)},ot=({createGlobalStyles:e,keyframes:r})=>(e`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-50);
  --drill-down-menu-bg-hover: var(--color-emphasis-50);
}
`,{hideToLeft:r`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,showFromLeft:r`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
   }
  `,hideToRight:r`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `,showFromRight:r`
  from {
    transform: translateX(100%);
    opacity: 0;

  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `});function st(e,{renderMenuItem:r}){const{bau:a,css:t,window:o}=e,{ul:n,li:s,nav:i,div:l,header:d,a:m}=a.tags,p=ue(),{hideToLeft:u,hideToRight:x,showFromRight:v,showFromLeft:b}=ot(e),w=t`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a,
    span {
      flex-grow: 1;
      text-decoration: none;
      color: var(--drill-down-menu-color);
    }
    & header {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      padding: var(--drill-down-menu-padding);
      transition: background-color var(--transition-slow) ease-in-out;
      &:hover {
        background: var(--drill-down-menu-bg-hover);
      }
      &::before {
        content: "\u2190";
        margin-right: 0.5rem;
      }
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
      }
      & li {
        padding: var(--drill-down-menu-padding);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        transition: background-color var(--transition-slow) ease-in-out;
        &:hover {
          background-color: var(--drill-down-menu-bg-hover);
          cursor: pointer;
        }
      }
    }
  `,g=({onclickItem:k,onclickBack:$,currentTree:E})=>{const{children:D,parentTree:F,data:X}=E;return l({class:"drillDownMenu"},F&&d({onclick:$({currentTree:E})},m({href:E.parentTree.children[0].data.href},X.name)),D&&n(D.map(R=>s({class:M(R.children&&"has-children",nt({window:o,subTree:R})&&"is-active"),onclick:R.children&&k({currentTree:R})},r(R.data)))))};return function({tree:$,pathnameState:E=a.state(o.location.pathname),...D}){const F=({currentTree:z})=>N=>R(N,_,z,!0),X=({currentTree:z})=>N=>R(N,_,z.parentTree,!1),R=(z,N,j,V)=>{N.firstChild.replaceChildren(p({parent:N,animationHide:`${V?u:x} ${re}`,animationShow:`${V?v:b} ${re}`},g({currentTree:j,onclickItem:F,onclickBack:X})))},_=i({class:M(w,D.class)},()=>{let z=me({})($),N=he(E.val)(z);return N||(N=z),l(g({currentTree:N,onclickItem:F,onclickBack:X}))});return _}}const it=e=>{const{tr:r,bau:a}=e,{section:t,a:o,h2:n}=a.tags,s={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},l=st(e,{renderMenuItem:({name:d,href:m})=>o({href:m,onclick:p=>{}},d)});return()=>t({id:"drillDownMenu"},n(r("Drill Down Menu")),l({tree:s}))};function lt(e,r={}){const{bau:a,css:t}=e,{div:o,span:n,label:s,input:i}=a.tags,l={base:t`
      display: inline-block;
      width: 20rem;
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
        border: var(--global-border-width) dotted;
        box-shadow: var(--shadow-s);
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,disabled:t`
      color: var(--color-gray-500);
      & label {
        background-color: var(--color-gray-100);
        border: var(--global-border-width) var(--color-gray-500) dotted;
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(m,...p){const{Component:u,disabled:x,...v}=m;return o({class:M(l.base,x&&l.disabled,m.class)},s(u({disabled:x}),i({type:"file",disabled:x,...v})),n({class:"filename-display"}))}}const ct=e=>{const{tr:r,bau:a,css:t}=e,{svg:o,use:n}=a.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:d,span:m}=a.tags,p=a.state("No file selected"),u=lt(e),x=b=>{const w=b.target.files[0];w?p.val=w.name:p.val="No file selected"},v=({disabled:b})=>i({class:M(t`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,b&&t`
              color: var(--color-emphasis-100);
              fill: var(--font-color-disabled);
            `)},o(n({href:"uploadIcon.svg#Capa_1"})),m(r("Choose a file to upload")));return()=>s({id:"fileInput"},d(r("FileInput Examples")),l("File Input"),u({Component:v,name:"file",accept:"text/*",onchange:x}),i("File selected: ",p),l("File Input disabled"),u({Component:v,name:"file",accept:"text/*",disabled:!0,onchange:x}))},dt=({css:e,createGlobalStyles:r})=>(r`
:root {
  --input-border-bottom-size: 2px;
}
`,{base:e`
      position: relative;
      display: inline-block;
      min-height: 3rem;

      & input {
        font-size: 1.2rem;
        background: var(--color-emphasis-100);
        box-shadow: var(--shadow-s);
        border-radius: var(--global-radius);
        border: var(--input-border-bottom-size) solid transparent;
        border-bottom: var(--input-border-bottom-size) solid
          var(--color-emphasis-900);
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        transition: background-color var(--transition-fast) ease-in-out;
        &:hover {
          background: var(--color-emphasis-200);
        }
        &:focus,
        &:valid {
          border-bottom: var(--input-border-bottom-size) solid
            var(--color-primary);
        }
        &:focus + label,
        &:valid + label,
        &:disabled + label {
          top: 1rem;
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--color-primary);
        }
      }
      & label {
        display: block;
        top: 1.5rem;
        line-height: 0;
        position: absolute;
        pointer-events: none;
        padding: 0px 10px;
        transition: var(--transition-fast) ease-in-out;
        color: var(--font-color-secondary);
        &:focus {
          font-style: normal;
        }
      }
      & div[data-input-error] {
        margin: 0.2rem 0;
        position: absolute;
        background: var(--background-color);
      }
    `,disabled:e`
      & * {
        color: var(--font-color-disabled) !important;
      }
      & input {
        border-bottom: var(--input-border-bottom-size) dashed
          var(--font-color-disabled);
      }
    `,error:e`
      color: var(--color-danger-darkest) !important;
      & * {
        color: var(--color-danger-darkest) !important;
      }
      & input {
        border-bottom: var(--input-border-bottom-size) dashed
          var(--color-danger-darkest) !important;
      }
    `});function ut(e,r={}){const{bau:a,css:t,createGlobalStyles:o}=e,{div:n,input:s,label:i}=a.tags,l=dt({css:t,createGlobalStyles:o});return function(m){const{name:p,id:u,disabled:x,label:v="",error:b="",...w}=m;return n({class:M(l.base,x&&l.disabled,b&&l.error,m.class)},s({id:u,name:p,type:"text",required:!0,disabled:x,...w}),i({htmlFor:u},v),n({"data-input-error":p},b))}}const mt=e=>{const{tr:r,bau:a}=e,{section:t,div:o,h3:n,h2:s}=a.tags,i=ut(e);return()=>t({id:"input"},s(r("Input Examples")),n("Standard"),o(i({id:"my-Input",name:"Label",label:"Label"})),n("Disabled"),o(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),n("Input with error"),o(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function ht(e){const{bau:r,css:a}=e,{dialog:t}=r.tags,o=a`
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
      background-color: var(--color-primary);
      color: var(--font-color-inverse);
    }
    & footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: var(--shadow-s);
      > * {
        margin: 12px;
      }
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
  `;return function(s,...i){return t({class:M(o,s.class)},...i)}}const pt=e=>{const{tr:r,bau:a}=e,{section:t,main:o,h2:n,header:s,footer:i,p:l}=a.tags,d=O(e),m=ht(e),p=()=>o(Array(10).fill("").map((x,v)=>l(v+1,". "))),u=m({id:"my-dialog"},s("Header"),p(),i(d({onclick:()=>{u.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{u.close()}},"OK")));return()=>t({id:"modal"},n(r("Modal Examples")),d({raised:!0,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)};function ft(e,r={}){const{bau:a,css:t}=e,{svg:o,animate:n,animateTransform:s,rect:i}=a.tagsNS("http://www.w3.org/2000/svg");return function({size:d=36,color:m="primary",visibility:p=!0,...u}={}){return o({class:M(t`
            visibility: ${p?"visible":"hidden"};
            color: var(--color-${m});
          `,u.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:d,height:d,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},n({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const bt=e=>{const{tr:r,bau:a}=e,{section:t,h2:o,div:n}=a.tags,s=ft(e);return()=>t({id:"spinner"},o(r("Spinner Examples")),n(s({size:30}),s(),s({size:40,color:"secondary"}),s({size:50,color:"info"}),s({size:60,color:"danger"})))};function gt(e){const{bau:r,css:a}=e,{input:t}=r.tags,o=a`
    position: relative;
    width: 2rem;
    height: 1rem;
    background-color: var(--color-gray-300);
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-m);
    &::after {
      content: "";
      background: var(--background-color);
      transform: translateX(0%) scale(1.3);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--color-gray-700);
      transition: all var(--transition-fast);
    }
    &:checked {
      background-color: var(--color-primary-lighter);
    }
    &:checked::after {
      content: "";
      transform: translateX(100%) scale(1.3);
      background-color: var(--color-primary);
    }
  `;return function(s,...i){return t({...s,class:M(o,s.class),type:"checkbox",required:"required"},...i)}}const vt=e=>{const{tr:r,bau:a,css:t}=e,{section:o,form:n,label:s,div:i,h2:l}=a.tags,d=gt(e);return()=>o({id:"switch"},l(r("Switch Examples")),n(i({class:t`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))))};function ae(e,{tabDefs:r}){const{bau:a,css:t}=e,{div:o,ul:n,li:s}=a.tags,i=a.state(r),l=a.state(r[0]),d=p=>i.val.find(u=>u.name==p),m={base:t`
      display: flex;
      flex-direction: column;
      & ul {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        padding: 0;
        list-style: none;
        border-bottom: 2px solid var(--color-emphasis-100);
        & li {
          text-align: center;
          padding: 0.5rem;
          padding-bottom: 0rem;
          cursor: pointer;
          font-weight: var(--font-weight-semibold);
          transition: var(--transition-fast) ease-in-out;
          overflow: hidden;

          &:hover {
            color: var(--color-primary-light);
            background-color: var(--color-emphasis-100);
            &::after {
              transform: translateY(0%);
            }
          }
          &::after {
            transition: var(--transition-fast) ease-in-out;
            transform: translateY(400%);
            background-color: var(--color-primary);
            opacity: 1;
            content: "";
            margin-top: 0.3rem;
            height: 2px;
            width: 100%;
            display: block;
          }
        }
        & .active {
          color: var(--color-primary);
          font-weight: bolder;
          &::after {
            background-color: var(--color-primary);
            transform: translateY(0%);
          }
        }
        & .disabled {
          cursor: not-allowed;
          font-style: italic;
          color: var(--font-color-disabled);
          transform: none;
          &:hover {
            color: var(--font-color-disabled);
            border: none;
            &::after {
              transform: none;
            }
          }
        }
      }
    `};return function(u,...x){const v=w=>{const{Header:g,disabled:k,name:$}=w;return s({class:()=>M(l.val.name==$&&"active",k&&"disabled"),onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:$},bubbles:!0}))},g(w))},b=o({class:M(m.base,u.class)},a.loop(i,n(),v),()=>l.val.Content?l.val.Content({}):"");return b.addEventListener("tab.select",w=>{var $,E;const{tabName:g}=w.detail,k=d(g);k&&(($=l.val.exit)==null||$.call(),l.val=k,(E=k.enter)==null||E.call())},!1),b.addEventListener("tab.add",w=>{var k;const{tab:g}=w.detail;(k=g.enter)==null||k.call(),i.val.push(g)},!1),b.addEventListener("tab.remove",w=>{var k;const g=i.val.findIndex($=>$.name==w.detail.tabName);g>0&&((k=i.val[g].exit)==null||k.call(),i.val.splice(g,1))},!1),b}}const yt=e=>{const{tr:r,bau:a,css:t}=e,{section:o,div:n,h3:s,h2:i,p:l,i:d}=a.tags,m=(...g)=>n({class:t`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),p=()=>({name:"New Tab",Header:({name:g})=>n(g),Content:()=>n("My Paragraph")}),u=O(e),v=ae(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(l("My tab Disabled"))}]}),w=ae(e,{tabDefs:[{name:"Tab1",Header:()=>n(d({class:t`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>n({class:t`
              > button {
                margin: 10px;
              }
            `},u({raised:!0,onclick:g=>g.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:p()},bubbles:!0}))},"Add a new Tab"),u({accent:!0,onclick:g=>g.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(l("My Content"))}]});return()=>o({id:"tabs"},i(r("Tabs")),s("Basic Tabs"),m(v({})),s("Full Witdth"),m(v({class:t`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),m(v({class:t`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),m(v({class:t`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),m(v({class:t`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),m(v({class:t`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),m(w({})))},wt="light";function xt(e){const{bau:r,css:a,window:t}=e,{input:o}=r.tags,n=d=>{t.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},s=()=>{try{return localStorage.getItem("theme")}catch{}},i=s();i?n(i):t.matchMedia("(prefers-color-scheme: dark)").matches?n("dark"):t.matchMedia("(prefers-color-scheme: light)").matches?n("light"):n(wt);const l=a`
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px var(--color-gray-200) dotted;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
      border: 1px var(--color-primary) dotted;
      &::after {
        color: var(--color-primary);
      }
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
      color: var(--color-emphasis-400);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
  `;return function(m,...p){return o({...m,class:M(l,m.class),type:"checkbox",required:"required",title:"Switch Theme",checked:s()=="dark",onclick:u=>{n(u.target.checked?"dark":"light")}},...p)}}const kt=e=>{const{tr:r,bau:a,css:t}=e,{section:o,form:n,div:s,h2:i}=a.tags,l=xt(e);return()=>o({id:"theme-switch"},i(r("Theme Switch")),n(s({class:t`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},l({}))))},St=e=>{const{tr:r,bau:a}=e,{section:t,a:o,h2:n}=a.tags,s={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},l=ie(e,{renderMenuItem:({name:d,href:m})=>o({href:m,onclick:p=>{p.preventDefault()}},d)});return()=>t({id:"treeview"},n(r("Tree View")),l({tree:s}))};function ne(e){const{tr:r,bau:a,css:t}=e,{div:o,main:n,h1:s,article:i}=a.tags,l=U(e);return function(){return o({class:t`
          grid-area: main;
          display: flex;
        `},l({componentList:le(),name:"Components"}),i({class:t`
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(r("Component Examples")),je(e)(),qe(e)(),Ke(e)(),We(e)(),Ye(e)(),Qe(e)(),Ze(e)(),tt(e)(),at(e)(),it(e)(),ct(e)(),mt(e)(),pt(e)(),bt(e)(),vt(e)(),yt(e)(),kt(e)(),St(e)()))}}const Ct=()=>[{name:"Login",id:"login"}];function Et(e,r={}){const{bau:a,css:t}=e,{div:o,span:n,pre:s,h3:i,h4:l}=a.tags;return function(m,...p){return o("Login")}}const At=e=>{const{tr:r,bau:a}=e,{section:t,div:o,h3:n,h2:s}=a.tags,i=Et(e);return()=>t({id:"login"},s(r("Login Examples")),n("Basic"),o(i()))};function Mt(e){const{tr:r,bau:a,css:t}=e,{div:o,article:n,h1:s}=a.tags,i=U(e);return function(){return o({class:t`
          grid-area: main;
          display: flex;
        `},i({componentList:Ct(),name:"Pages"}),n({class:t`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(r("Pages Examples")),At(e)()))}}const $t=({context:e})=>[{path:"",action:r=>({title:"Storybook",component:ne(e)})},{path:"components",action:r=>({title:"Component",component:ne(e)})},{path:"pages",action:r=>({title:"Pages",component:Mt(e)})}],Tt=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),It=({LayoutDefault:e,config:{base:r=""}})=>({router:a})=>{const{title:t,component:o,Layout:n=e}=a.resolve({pathname:location.pathname.replace(r,"")});document.getElementById("app").replaceChildren(n({component:o})),document.title=`${t}`},Lt=e=>{const{createGlobalStyles:r}=e;Ae(e,{colorPalette:[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),r`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

  `},Dt=e=>{const{createGlobalStyles:r}=e;r`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${se({dark:!0})}
}
  `};Me();const pe={title:"Bau",base:"/bau/bau-ui"},W=Pe({config:pe});Lt(W);Dt(W);we({routes:$t({context:W}),onLocationChange:It({LayoutDefault:Fe(W),config:pe}),notFoundRoute:Tt(W)});
