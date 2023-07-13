(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const Z=(e,a)=>({...e,paths:[...a,e.path]}),X=({paths:e=[],routes:a})=>a.flatMap(({children:r,...t})=>{const o=Z(t,e);return r?[o,...X({paths:[...e,t.path],routes:r})]:o}),ee=({paths:e})=>{const a=e.map(r=>r instanceof RegExp?r.source:r).map(r=>String.raw`\/${r}`).join("");return new RegExp(`^${a}$`)},te=({routes:e=[],notFoundRoute:a})=>{const r=X({routes:e}).map(t=>({...t,regex:ee(t)}));return{resolve:({pathname:t})=>{const o=r.find(({regex:n})=>n.test(t));return o?o.action({match:t.match(o.regex)}):a}}};function re({routes:e,notFoundRoute:a,onLocationChange:r}){const t=te({routes:e,notFoundRoute:a});return window.addEventListener("popstate",o=>r({router:t})),window.history.pushState=new Proxy(window.history.pushState,{apply:(o,n,s)=>{o.apply(n,s),r({router:t})}}),document.addEventListener("click",o=>{const{target:n}=o,s=n.getAttribute("href");n.tagName==="A"&&s&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),o.preventDefault())}),r({router:t}),t}const ae=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],oe=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ne=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],se=()=>new Array(20).fill("").map((e,a)=>`--color-gray-${a*50}: hsl(0, 0%, ${100-5*a}%);`).join(`
`),Y=({dark:e})=>new Array(20).fill("").map((a,r)=>`--color-emphasis-${r*50}: var(--color-gray-${e?1e3-r*50:r*50});`).join(`
`),ie=([e,{h:a,s:r,l:t}])=>[`--color-${e}-h: ${a};`,`--color-${e}-s: ${r};`,`--color-${e}-l: ${t};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...oe.map(([o,n])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),...ne.map(([o,n])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function le({createGlobalStyles:e},{colorPalette:a=ae}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${a.map(([r,t])=>ie([r,t])).join(`
`)}
  ${se()}
  ${Y({})}
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
  --global-shadow-lw: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --global-shadow-md: 0 5px 40px rgba(0, 0, 0, 0.2);
  --global-shadow-tl: 0 12px 28px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
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
`}function ce(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let G=e=>Object.prototype.toString.call(e??0).slice(8,-1),de=e=>G(e)=="Object",q=Object.getPrototypeOf,j=e=>["Object","Array"].includes(G(e)),W=e=>G(e)=="Function",H=e=>O(e)?e._val:e,O=e=>e.__isState;function ue(e){let a=(e==null?void 0:e.window)??window,{document:r}=a,t=new Set,o,n=c=>r.createElement(c),s=()=>n("span"),i=(c,p,y)=>{let h=o;o=p;let x=c(y);return o=h,x},l=(c,p,y,h,x)=>{var C;for(let E of c.bindings){let{deps:B,element:A,renderInferred:T,render:L,renderItem:z}=E;if(z&&p)(C=m(A,h,y,P=>g(z(P)),x)[p])==null||C.call();else{let P=T?T({element:A}):L({element:A,renderItem:z})(...B.map(H));P!==A&&A.replaceWith(E.element=P!=null?g(P):s())}}},d=(c,p,y=[])=>({get(h,x,C){var E;if(o==null||o.add(c),x==="_isProxy")return!0;if(!((E=h[x])!=null&&E._isProxy)&&j(h[x]))h[x]=new Proxy(h[x],d(c,p,[...y,x]));else if(["splice","push","pop","shift","unshift"].includes(x)){let B=h[x];return(...A)=>{let T=B.apply(h,A);return l(c,x,A),T}}return Reflect.get(h,x,C)},set(h,x,C,E){let B=Reflect.set(h,x,C,E);return l(c,"setItem",{prop:x,value:C},[...y,x],p),B}}),u=(c,p)=>new Proxy(p,d(c,p)),m=(c,p,y,h,x)=>({assign:()=>c.replaceChildren(...y.map(h)),setItem:()=>{let C=p[0],E=c.children[C];E&&E.replaceWith(h(x[C]))},push:()=>c.append(...y.map(h)),pop:()=>c.lastChild&&c.removeChild(c.lastChild),shift:()=>c.firstChild&&c.removeChild(c.firstChild),unshift:()=>{let C=h(y[0]);c.firstChild?c.firstChild.before(C):c.appendChild(C)},splice:()=>{let[C,E,...B]=y;for(let A=Math.min(C+E-1,c.children.length-1);A>=C;A--)c.children[A].remove();if(B.length){let A=B.forEach(h);c.children[C]?c.children[C].after(A):c.append(...A)}}}),b=c=>({oldVal:c,bindings:[],__isState:!0,get _val(){let p=this;return p.valProxy??(p.valProxy=j(c)?u(p,c):c,p.valProxy)},set _val(p){this.valProxy=p},get val(){return o==null||o.add(this),this._val},set val(p){let y=this,h=y._val;j(p)?(y._val=u(y,p),l(y,"assign",p)):p!==h&&(y._val=p,l(y)),y.oldVal=h}}),g=c=>c.nodeType?c:r.createTextNode(c),w=(c,...p)=>{if(p.length){let y=[];for(let h of p.flat(1/0))h&&y.push(O(h)?F({deps:[h],render:()=>x=>x}):W(h)?D({renderInferred:h}):g(h));c.append(...y)}},v={},k=(c,p)=>c?Object.getOwnPropertyDescriptor(c,p)??k(q(c),p):void 0,f=(c,p,y)=>{var h;return v[c+","+p]??(v[c+","+p]=((h=k(y,p))==null?void 0:h.set)??0)},S=(c,p)=>new MutationObserver((y,h)=>{y.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find(C=>C===c&&(p({element:c}),h.disconnect(),!0)))}).observe(c.parentNode,{childList:!0}),M=c=>new Proxy(function(y,...h){var B;let[x,...C]=de(h[0])?h:[{},...h],E=c?r.createElementNS(c,y):n(y);for(let[A,T]of Object.entries(x)){if(["bauCreated","bauMounted","bauUnmounted"].includes(A))continue;let L=f(y,A,q(E))?z=>E[A]=z:z=>E.setAttribute(A,z);T==null||(O(T)?F({deps:[T],render:()=>()=>(L(T.val),E)}):W(T)&&(!A.startsWith("on")||T.isDerived)?D({renderInferred:()=>(L(T({element:E})),E)}):T.renderProp?F({deps:T.deps,render:()=>()=>(L(T.renderProp({element:E})(...T.deps.map(H))),E)}):L(T))}return w(E,...C),(B=x.bauCreated)==null||B.call(x,{element:E}),x.bauMounted&&a.requestAnimationFrame(()=>x.bauMounted({element:E})),x.bauUnmounted&&a.requestAnimationFrame(()=>S(E,x.bauUnmounted)),E},{get:(p,y)=>p.bind(void 0,y)}),I=(c,p,y)=>{c.element=g(y||s());for(let h of p)O(h)&&(t.add(h),h.bindings.push(c));return c.element},D=({renderInferred:c,element:p})=>{let y=new Set,h=i(c,y,{element:p});return I({renderInferred:c},y,h)},F=({deps:c,element:p,render:y,renderItem:h})=>{let x=h==null?void 0:h({deps:c,element:p}),C=y({element:p,renderItem:x})(...c.map(H));return I({deps:c,render:y,renderItem:x},c,C)};return{tags:M(),tagsNS:M,state:b,bind:F,stateSet:t}}const me=e=>{let a=0,r=11;for(;a<e.length;)r=101*r+e.charCodeAt(a++)>>>0;return"bau"+r},be=(e,a,r,t)=>{const o=e.createElement("style");o.id=r,o.append(t),(a??e.head).append(o)},he=(e,a)=>e.reduce((r,t,o)=>r+t+(a[o]??""),"");function pe(e){let{document:a}=(e==null?void 0:e.window)??window;const r=t=>(o,...n)=>{const s=he(o,n),i=me(s);return!a.getElementById(i)&&be(a,e==null?void 0:e.target,i,t(i,s)),i};return{css:r((t,o)=>`.${t} { ${o} }`),keyframes:r((t,o)=>`@keyframes ${t} { ${o} }`),createGlobalStyles:r((t,o)=>o)}}function fe(e={}){return{bau:ue(),...pe(),tr:a=>a,window,...e}}function $(...e){return e.filter(a=>a).join(" ")}function N(e){const{bau:a,css:r}=e,t={root:r`
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
    `,button:r`
      cursor: pointer;
    `,a:r``,flat:r`
      border-width: 0;
    `,flatPrimary:r`
      color: var(--color-primary);
    `,flatAccent:r`
      color: var(--color-secondary-darkest);
    `,raised:r`
      box-shadow: var(--global-shadow-lw);
      &:active {
        box-shadow: var(--global-shadow-md);
      }
    `,raisedPrimary:r`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,raisedAccent:r`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,disabled:r`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,raisedDisabled:r`
      background-color: rgba(0, 0, 0, 0.12);
    `,fullWidth:r`
      text-align: center;
      width: 100%;
    `,ripple:r`
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
    `};return function(n,...s){const{primary:i,accent:l,raised:d,disabled:u,ripple:m,href:b,icon:g,...w}=n;return(b?a.tags.a:a.tags.button)({...w,class:$(t.root,b?t.a:t.button,d?t.raised:t.flat,!d&&i&&t.flatPrimary,!d&&l&&t.flatAccent,d&&i&&t.raisedPrimary,d&&l&&t.raisedAccent,m&&t.rippledisabled&&t.disabled,u&&d&&t.raisedDisabled,n.class),href:b,...!b&&{type:"button"}},s)}}function ge(e){const{tr:a,bau:r,css:t}=e,{i:o,header:n,h1:s,div:i,a:l,img:d,b:u}=r.tags,{svg:m,path:b}=r.tagsNS("http://www.w3.org/2000/svg"),g=r.state(!0),w=N(e),v=()=>o({class:t`
          color: var(--font-color-inverse);
        `},m({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},b({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>i({class:t`
          display: flex;
          align-items: center;
        `},w({"aria-label":"drawer",onclick:()=>g.val=!g.val},v()),l({href:"/",class:t`
            text-decoration: none;
            color: var(--color-inverse);
            font-size: x-large;
          `},u(a("Bau Story Book")))),f=()=>l({class:t`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:"./github-mark-white.svg",width:30,height:30}));return function(){return n({class:t`
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
        `},k(),f())}}function ve({tr:e,bau:a,css:r}){const{footer:t,span:o,a:n,ul:s,li:i,p:l}=a.tags;return function(){return t({class:r`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},o("version: 0.29.0"))}}const ye=()=>[{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Animate",id:"animate"},{name:"Avatar",id:"avatar"},{name:"Breadcrumbs",id:"breadcrumbs"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"File Input",id:"fileInput"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"Theme Switch",id:"theme-switch"},{name:"TreeView",id:"treeview"}];function U(e){const{tr:a,bau:r,css:t}=e,{ul:o,li:n,nav:s,a:i}=r.tags;return function(){return s({class:t`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height) + 1rem);
          align-self: start;
          bottom: 0px;
          left: 0;
          min-width: 150px;
          max-width: 180px;
          overflow-y: scroll;
          height: max-content;
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);
          max-height: 95vh;
          & ul {
            padding: 0;
            > li {
              cursor: pointer;
              margin: 10px 10px;
              list-style: none;
              > a {
                margin: 20px 0px;
                text-transform: uppercase;
                text-decoration-line: none;
                letter-spacing: 0.1em;
                font-weight: bold;
                color: var(--font-color-base);
                &:hover {
                  color: var(--color-primary);
                  &::after {
                    background-color: var(--color-primary);
                    transform: translate(0%);
                  }
                }
                &::after {
                  content: "";
                  display: block;
                  margin-top: 6px;
                  height: 3px;
                  transition: 0.2s ease-out;
                  transform: translate(-100%);
                  transform-origin: right;
                }
              }
            }
          }
        `},o(ye().map(({name:d,id:u})=>n(i({href:`#${u}`},d)))))}}const we=e=>{const{bau:a,css:r}=e,{div:t}=a.tags,o=ge(e),n=U(e),s=ve(e);return function({component:l}){return t({class:r`
          display: grid;
          grid-template-columns: minmax(20%, 300px) auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `},o(),n(),l(),s())}},K={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},_=e=>`var(--color-${e}-darkest)`,xe=()=>Object.keys(K).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${_(e)};
    color: ${_(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${_(e)};
    }
  }`).join(`
`),ke=({css:e,createGlobalStyles:a})=>(a`
:root {
  --alert-border-left-width: 8px;
}
${xe()}
`,{base:e`
      display: flex;
      max-width: 600px;
      justify-content: flex-start;
      align-items: center;
      margin: 0.5rem;
      font-weight: var(--font-weight-semibold);
      box-shadow: var(--global-shadow-md);
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
    `});function J(e){const{bau:a,css:r,createGlobalStyles:t,tr:o}=e,{div:n}=a.tags,s=ke({css:r,createGlobalStyles:t}),i=N(e),l=({onclick:d})=>i({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(u,...m){const{severity:b="info",onRemove:g,...w}=u;return n({...w,class:$(s.base,`alert-${b}`,u.class),role:"alert"},n({class:"icon"},K[b]),n({class:"content"},...m),g&&l({onclick:g}))}}const Se=e=>{const{tr:a,bau:r}=e,{section:t,div:o,h3:n,h2:s,h4:i,p:l}=r.tags,d=J(e);return()=>t({id:"alert"},s(a("Alert Examples")),n("Info"),o(d({severity:"danger"},i("Something went wrong"),l("Error code ",404),l("Status ","Not Found")),d({severity:"warning",onRemove:u=>{u.preventDefault()}},"Alert warning"),d({severity:"info"},"My Message"),d({severity:"success"},i("Great Success"),l("Alert success message"))))};function Ee(e,a={}){return function({parent:t,animationHide:o,animationShow:n},s){const i=s;i.style.animation=n;const l=()=>{i.removeEventListener("animationend",l),i.style.animation=""};return i.addEventListener("animationend",l),new MutationObserver((d,u)=>{d.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(b=>{if(b===i){const g=i.cloneNode(!0);return g.style.animation=o,m.previousSibling?m.previousSibling.after(g):m.nextSibling?m.nextSibling.before(g):m.target&&m.target.appendChild(g),g.addEventListener("animationend",()=>g.parentNode.removeChild(g)),u.disconnect(),!0}}))}).observe(t,{childList:!0,subtree:!0}),i}}const Ce=({keyframes:e})=>({hideRight:e`
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
 `}),Ae=e=>{const{bau:a}=e,{section:r,div:t,h1:o}=a.tags,n=Ee(),s=N(e),i=Ce(e);return function(){const l=a.state(!0),d=r({id:"animate"});return d.appendChild(t(o("Test Animate"),t(s({onclick:()=>l.val=!l.val},()=>l.val?"Hide":"Show")),t(()=>l.val?n({parent:d,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},t("Ciao")):""))),d}};function $e(e,a={}){const{bau:r}=e,{span:t,img:o}=r.tags,n=r.state(!0),s=r.state(!1),i=()=>n.val=!1,l=d=>{n.val=!1,s.val=!0};return function({width:u=60,height:m=60,...b},...g){return t({class:$(a.cssOverride,b.class)},()=>n.val?"Loading...":"",()=>s.val&&"Error",o({width:u,height:m,onload:i,onerror:l,...b}))}}const Te=e=>{const{tr:a,bau:r,css:t}=e,{section:o,h2:n}=r.tags,s=t`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=$e(e);return()=>o({id:"avatar"},n(a("Avatar")),i({class:s,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),i({class:s,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),i({src:"./grucloud.svg",alt:"GruCloud"}))},Me=(e,{limit:a=10,deleteAfterDuration:r=15e3}={})=>{const{bau:t,css:o,keyframes:n}=e,{div:s}=t.tags,i=t.state([]),l={inserting:n`
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
    `},u=({id:m,status:b})=>{const g=i.val.findIndex(w=>w.id===m);g!=-1&&(i.val[g].status=b)};return function(b={},...g){const w=({id:f})=>{u({id:f,status:"removing"});const S=i.val.findIndex(M=>M.id===f);S!=-1&&i.val.splice(S,1)},v=({Component:f})=>{const S={id:Math.random().toString(10).split(".")[1],Component:f,status:"inserting"};i.val.length>=a&&w({id:i.val[0].id}),i.val.push(S),setTimeout(()=>w(S),r)},k=f=>s({class:d.item,onclick:()=>w(f)},f.Component());return document.addEventListener("alert.add",f=>v(f.detail)),document.addEventListener("alert.remove",f=>w(f.detail)),s({class:$(d.stack,b.class)},t.bind({deps:[i],render:({renderItem:f})=>S=>s(S.map(f)),renderItem:()=>k}))}},Ie=e=>{const{tr:a,bau:r}=e,{section:t,h1:o}=r.tags,n=Me(e,{deleteAfterDuration:2e4}),s=N(e),i=J(e);return function(){return t({id:"alert-stack"},n(),o("Alert stack"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"success"},a("Infrastructure Created"))}}))}},"success alert"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"danger"},a("Error creating infrastructure"))}}))}},"danger alert"))}};function Be(e){const{bau:a,css:r}=e,{ul:t,li:o,a:n,span:s}=a.tags,i=r`
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
  `;return function({items:d,...u}){return t({"aria-label":"Breadcrumbs",...u,class:$(i,u.class)},d.map(({href:m,name:b})=>o((m?n:s)({href:m},b))))}}const De=e=>{const{tr:a,bau:r}=e,{section:t,h2:o}=r.tags,n={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},s=Be(e);return()=>t({id:"breadcrumbs"},o(a("Breadcrumbs")),s(n))},Ne=e=>{const{tr:a,bau:r,css:t}=e,{section:o,p:n,h2:s,h3:i}=r.tags,l=N(e);return()=>o({id:"button",class:t`
          & button {
            margin: 0.5rem;
          }
        `},s(a("Button Examples")),i("Flat"),n(l({},"Do stuff"),l({primary:!0},a("FLAT PRIMARY")),l({accent:!0},a("FLAT ACCENT")),l({ripple:!0},a("FLAT ACCENT")),l({disabled:!0},a("DISABLED"))),i("Primary"),n(l({primary:!0},a("primary")),l({primary:!0,raised:!0},a("primary Raised")),l({ripple:!0,raised:!0},a("primary ripple")),l({disabled:!0,raised:!0},a("primary DISABLED"))),i("Raised"),n(l({raised:!0},a("Raised FLAT")),l({primary:!0,raised:!0},a("Raised PRIMARY")),l({accent:!0,raised:!0},a("Raised ACCENT")),l({ripple:!0,raised:!0},a("Raised RIPPLE")),l({disabled:!0,raised:!0},a("Raised DISABLED"))),i("Full With"),n(l({class:t`
              width: 100%;
            `,raised:!0},a("raised FLAT")),l({class:t`
              width: 100%;
            `,primary:!0},a("Raised PRIMARY"))),i("Icon"),n(l({"aria-label":"Close"},"✖"),l({primary:!0},"✖"),l({raised:!0},"✖"),l({},"TODO")))};function ze(e,a={}){const{bau:r,css:t}=e,{input:o}=r.tags,n={base:t`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--global-radius);
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all var(--transition-fast) ease-in-out;
      box-shadow: var(--global-shadow-lw);
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
    `};return function(i,...l){return o({class:$(n.base,i.class),type:"checkbox",required:"required",...i})}}const Le=e=>{const{tr:a,bau:r,css:t}=e,{section:o,div:n,label:s,h2:i,form:l}=r.tags,d=ze(e),u=r.state(!1),m=r.state(!1),b=w=>v=>{w.val=!!v.target.checked},g=(...w)=>n({class:t`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...w);return()=>o({id:"checkbox"},l(i(a("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:u,onchange:b(u)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:m,onchange:b(m)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function Pe(e){const{bau:a,css:r}=e,{div:t}=a.tags,o=r`
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
      box-shadow: var(--global-shadow-md);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
    & .content-open {
      transform: translate(0%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--global-shadow-md);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
  `;return function({openState:s,...i},...l){return t({class:$(o,i.class)},t({class:()=>$("overlay",s.val&&"overlay-open"),onclick:()=>{s.val=!1}}),t({class:()=>$("content",s.val&&"content-open")},...l))}}const Re=e=>{const{tr:a,bau:r}=e,{section:t,h2:o}=r.tags,n=r.state(!1),s=Pe(e),i=N(e),l=U(e);return()=>t({id:"drawer"},o(a("Drawer")),i({raised:!0,onclick:()=>{n.val=!n.val}},"OPEN DRAWER"),s({openState:n},l()))};function Fe(e,a={}){const{bau:r,css:t}=e,{div:o,span:n,label:s,input:i}=r.tags,l={base:t`
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
        box-shadow: var(--global-shadow-lw);
        &:hover {
          box-shadow: var(--global-shadow-md);
        }
      }
    `,disabled:t`
      color: var(--color-gray-500);
      & label {
        background-color: var(--color-gray-100);
        border: var(--global-border-width) var(--color-gray-500) dotted;
        &:hover {
          box-shadow: var(--global-shadow-lw);
        }
        cursor: not-allowed;
      }
    `};return function(u,...m){const{Component:b,disabled:g,...w}=u;return o({class:$(l.base,g&&l.disabled,u.class)},s(b({disabled:g}),i({type:"file",disabled:g,...w})),n({class:"filename-display"}))}}const Oe=e=>{const{tr:a,bau:r,css:t}=e,{svg:o,use:n}=r.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:d,span:u}=r.tags,m=r.state("No file selected"),b=Fe(e),g=v=>{const k=v.target.files[0];k?m.val=k.name:m.val="No file selected"},w=({disabled:v})=>i({class:$(t`
            display: flex;
            align-items: center;
            flex-direction: column;
            color: var(--font-color-base);
            > * {
              margin: 1rem;
            }
            svg {
              height: 3rem;
              path {
                fill: var(--font-color-base);
              }
            }
          `,v&&t`
              color: var(--color-gray-500);
              svg {
                path {
                  fill: var(--color-gray-500);
                }
              }
            `)},o(n({href:"uploadIcon.svg#Capa_1"})),u(a("Choose a file to upload")));return()=>s({id:"fileInput"},d(a("FileInput Examples")),l("File Input"),b({Component:w,name:"file",accept:"text/*",onchange:g}),i("File selected: ",m),l("File Input disabled"),b({Component:w,name:"file",accept:"text/*",disabled:!0,onchange:g}))},je=({css:e,createGlobalStyles:a})=>(a`
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
        box-shadow: var(--global-shadow-lw);
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
    `});function He(e,a={}){const{bau:r,css:t,createGlobalStyles:o}=e,{div:n,input:s,label:i}=r.tags,l=je({css:t,createGlobalStyles:o});return function(u){const{name:m,id:b,disabled:g,label:w="",error:v="",...k}=u;return n({class:$(l.base,g&&l.disabled,v&&l.error,u.class)},s({id:b,name:m,type:"text",required:!0,disabled:g,...k}),i({htmlFor:b},w),n({"data-input-error":m},v))}}const _e=e=>{const{tr:a,bau:r}=e,{section:t,div:o,h3:n,h2:s}=r.tags,i=He(e);return()=>t({id:"input"},s(a("Input Examples")),n("Standard"),o(i({id:"my-Input",name:"Label",label:"Label"})),n("Disabled"),o(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),n("Input with error"),o(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function Ge(e){const{bau:a,css:r}=e,{dialog:t}=a.tags,o=r`
    box-shadow: var(--global-shadow-lw);
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
      box-shadow: var(--global-shadow-lw);
      > * {
        margin: 12px;
      }
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
  `;return function(s,...i){return t({class:$(o,s.class)},...i)}}const qe=e=>{const{tr:a,bau:r}=e,{section:t,main:o,h2:n,header:s,footer:i,p:l}=r.tags,d=N(e),u=Ge(e),m=()=>o(Array(10).fill("").map((g,w)=>l(w+1,". "))),b=u({id:"my-dialog"},s("Header"),m(),i(d({onclick:()=>{b.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{b.close()}},"OK")));return()=>t({id:"modal"},n(a("Modal Examples")),d({raised:!0,onclick:()=>{b.showModal()}},"OPEN MODAL"),b)};function We(e,a={}){const{bau:r,css:t}=e,{svg:o,animate:n,animateTransform:s,rect:i}=r.tagsNS("http://www.w3.org/2000/svg");return function({size:d=36,color:u="primary",visibility:m=!0,...b}={}){return o({class:$(t`
            visibility: ${m?"visible":"hidden"};
            color: var(--color-${u});
          `,b.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:d,height:d,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},n({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Ve=e=>{const{tr:a,bau:r}=e,{section:t,h2:o,div:n}=r.tags,s=We(e);return()=>t({id:"spinner"},o(a("Spinner Examples")),n(s({size:30}),s(),s({size:40,color:"secondary"}),s({size:50,color:"info"}),s({size:60,color:"danger"})))};function Xe(e){const{bau:a,css:r}=e,{input:t}=a.tags,o=r`
    position: relative;
    width: 2rem;
    height: 1rem;
    background-color: var(--color-gray-300);
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--global-shadow-md);
    &::after {
      content: "";
      background: var(--background-color);
      transform: translateX(0%) scale(1.3);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--global-shadow-md);
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
  `;return function(s,...i){return t({...s,class:$(o,s.class),type:"checkbox",required:"required"},...i)}}const Ye=e=>{const{tr:a,bau:r,css:t}=e,{section:o,form:n,label:s,div:i,h2:l}=r.tags,d=Xe(e);return()=>o({id:"switch"},l(a("Switch Examples")),n(i({class:t`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))))};function V(e,{tabDefs:a}){const{bau:r,css:t}=e,{div:o,ul:n,li:s}=r.tags,i=r.state(a),l=r.state(a[0]),d=m=>i.val.find(b=>b.name==m),u={base:t`
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
    `};return function(b,...g){const w=k=>{const{Header:f,disabled:S,name:M}=k;return s({class:()=>$(l.val.name==M&&"active",S&&"disabled"),onclick:I=>I.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:M},bubbles:!0}))},f(k))},v=o({class:$(u.base,b.class)},r.bind({deps:[i],render:({renderItem:k})=>f=>n(f.map(k)),renderItem:()=>w}),()=>l.val.Content?l.val.Content({}):"");return v.addEventListener("tab.select",k=>{var M,I;const{tabName:f}=k.detail,S=d(f);S&&((M=l.val.exit)==null||M.call(),l.val=S,(I=S.enter)==null||I.call())},!1),v.addEventListener("tab.add",k=>{var S;const{tab:f}=k.detail;(S=f.enter)==null||S.call(),i.val.push(f)},!1),v.addEventListener("tab.remove",k=>{var S;const f=i.val.findIndex(M=>M.name==k.detail.tabName);f>0&&((S=i.val[f].exit)==null||S.call(),i.val.splice(f,1))},!1),v}}const Ue=e=>{const{tr:a,bau:r,css:t}=e,{section:o,div:n,h3:s,h2:i,p:l,i:d}=r.tags,u=(...f)=>n({class:t`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),m=()=>({name:"New Tab",Header:({name:f})=>n(f),Content:()=>n("My Paragraph")}),b=N(e),w=V(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(l("My tab Disabled"))}]}),k=V(e,{tabDefs:[{name:"Tab1",Header:()=>n(d({class:t`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>n({class:t`
              > button {
                margin: 10px;
              }
            `},b({raised:!0,onclick:f=>f.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:m()},bubbles:!0}))},"Add a new Tab"),b({accent:!0,onclick:f=>f.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(l("My Content"))}]});return()=>o({id:"tabs"},i(a("Tabs")),s("Basic Tabs"),u(w({})),s("Full Witdth"),u(w({class:t`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(w({class:t`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(w({class:t`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(w({class:t`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(w({class:t`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(k({})))},Ke="light";function Je(e){const{bau:a,css:r,window:t}=e,{input:o}=a.tags,n=d=>{t.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},s=()=>{try{return localStorage.getItem("theme")}catch{}},i=s();i?n(i):t.matchMedia("(prefers-color-scheme: dark)").matches?n("dark"):t.matchMedia("(prefers-color-scheme: light)").matches?n("light"):n(Ke);const l=r`
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
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
      display: block;
      width: 100%;
      text-align: center;
      transition: all var(--transition-fast);
      color: var(--color-emphasis-400);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: xx-large;
    }
  `;return function(u,...m){return o({...u,class:$(l,u.class),type:"checkbox",required:"required",title:"Switch Theme",checked:s()=="dark",onclick:b=>{n(b.target.checked?"dark":"light")}},...m)}}const Qe=e=>{const{tr:a,bau:r,css:t}=e,{section:o,form:n,div:s,h2:i}=r.tags,l=Je(e);return()=>o({id:"theme-switch"},i(a("Theme Switch")),n(s({class:t`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},l({}))))},Ze=({css:e,createGlobalStyles:a})=>(a`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
  --menu-link-sublist-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>');
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
          transition: background-color var(--transition-fast) ease-in-out;
          &:hover {
            background: var(--color-emphasis-100);
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            background: var(--menu-link-sublist-icon) 50% / 2rem 2rem;
            width: 1.25rem;
            padding: 0.5rem;
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
  `,expanded:e`
      > div {
        &::after {
          content: "";
          transform: rotate(180deg);
        }
      }
    `,collapsed:e`
      > div {
        &::after {
          content: "";
          transform: rotate(90deg);
        }
      }
    `});function et(e,{renderMenuItem:a}){const{bau:r,css:t,createGlobalStyles:o,window:n}=e,{ul:s,li:i,nav:l,div:d}=r.tags,u=Ze({css:t,createGlobalStyles:o}),m=({element:v,closeState:k})=>{k.val?b(v):g(v)};function b(v){v.style.height=v.scrollHeight+"px";const k=()=>{v.removeEventListener("transitionend",k)};v.addEventListener("transitionend",k),n.requestAnimationFrame(()=>{v.style.height="0px"})}function g(v){const k=()=>{v.removeEventListener("transitionend",k),v.style.height=null};v.addEventListener("transitionend",k),v.style.height=v.scrollHeight+"px"}const w=({depth:v=1,maxDepth:k})=>f=>{const{children:S,expanded:M}=f,I=r.state(!M);return i({class:()=>$(S?I.val?u.collapsed:u.expanded:"")},d({class:t`
              cursor: pointer;
            `,onclick:D=>{S&&(I.val=!I.val)}},a(f.data)),S&&v<k&&s({bauMounted:({element:D})=>{I.val?D.style.height="0px":D.style.height=D.scrollHeight+"px"},"aria-expanded":({element:D})=>(m({element:D,closeState:I}),!I.val)},S.map(w({depth:v+1,maxDepth:k}))))};return function({tree:k,maxDepth:f=1/0,...S}){return l({class:$(u.nav,S.class)},k.children&&s(k.children.map(w({maxDepth:f}))))}}const tt=e=>{const{tr:a,bau:r}=e,{section:t,a:o,h2:n}=r.tags,s={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},l=et(e,{renderMenuItem:({name:d,href:u})=>o({href:u,onclick:m=>{m.preventDefault()}},d)});return()=>t({id:"treeview"},n(a("Tree View")),l({tree:s}))},rt=e=>{const{tr:a,bau:r,css:t}=e,{div:o,main:n,h1:s}=r.tags;return function(){return n({class:t`
          grid-area: main;
          padding: 10px;
          margin-top: 20px;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `},s(a("Examples")),Se(e)(),Ie(e)(),Ae(e)(),Te(e)(),De(e)(),Ne(e)(),Le(e)(),Re(e)(),Oe(e)(),_e(e)(),qe(e)(),Ve(e)(),Ye(e)(),Ue(e)(),Qe(e)(),tt(e)())}},at=({context:e})=>[{path:"",action:a=>({title:"BauUI Storybook",component:rt(e)})}],ot=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),nt=({LayoutDefault:e,config:{base:a=""}})=>({router:r})=>{const{title:t,component:o,Layout:n=e}=r.resolve({pathname:location.pathname.replace(a,"")});document.getElementById("app").replaceChildren(n({component:o})),document.title=`${t}`},st=e=>{const{createGlobalStyles:a}=e;le(e,{colorPalette:[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),a`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

  `},it=e=>{const{createGlobalStyles:a}=e;a`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${Y(!0)}
}
  `};ce();const Q={title:"Bau",base:"/bau"},R=fe({config:Q});st(R);it(R);re({routes:at({context:R}),onLocationChange:nt({LayoutDefault:we(R),config:Q}),notFoundRoute:ot(R)});
