(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const G=(e,a)=>({...e,paths:[...a,e.path]}),z=({paths:e=[],routes:a})=>a.flatMap(({children:t,...r})=>{const n=G(r,e);return t?[n,...z({paths:[...e,r.path],routes:t})]:n}),W=({paths:e})=>{const a=e.map(t=>t instanceof RegExp?t.source:t).map(t=>String.raw`\/${t}`).join("");return new RegExp(`^${a}$`)},X=({routes:e=[],notFoundRoute:a})=>{const t=z({routes:e}).map(r=>({...r,regex:W(r)}));return{resolve:({pathname:r})=>{const n=t.find(({regex:o})=>o.test(r));return n?n.action({match:r.match(n.regex)}):a}}};function q({routes:e,notFoundRoute:a,onLocationChange:t}){const r=X({routes:e,notFoundRoute:a});return window.addEventListener("popstate",n=>t({router:r})),window.history.pushState=new Proxy(window.history.pushState,{apply:(n,o,s)=>{n.apply(o,s),t({router:r})}}),document.addEventListener("click",n=>{const{target:o}=n,s=o.getAttribute("href");o.tagName==="A"&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),n.preventDefault())}),t({router:r}),r}const Y=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],K=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],U=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],J=()=>new Array(10).fill("").map((e,a)=>`--color-gray-${a*100}: hsl(0, 0%, ${100-8*a}%);`).join(`
`),Q=()=>new Array(10).fill("").map((e,a)=>`--color-emphasis-${a*100}: var(--color-gray-${a*100});`).join(`
`),Z=([e,{h:a,s:t,l:r}])=>[`--color-${e}-h: ${a};`,`--color-${e}-s: ${t};`,`--color-${e}-l: ${r};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...K.map(([n,o])=>`--color-${e}-${n}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),...U.map(([n,o])=>`--color-${e}-${n}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ee({createGlobalStyles:e},{colorPalette:a=Y}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${a.map(([t,r])=>Z([t,r])).join(`
`)}
  ${J()}
  ${Q()}
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 90%);
  --color-content-secondary: #525860;
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
}
@custom-media --narrow-window (max-width: 996px);
:root {
  font-family: var(--font-family);
  color-scheme: var(--color-scheme);
  color: var(--color-content);
}
body {
  margin: 0;
}
`}function te(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}const F=e=>Object.prototype.toString.call(e??0).slice(8,-1),re=e=>F(e)=="Object",R=Object.getPrototypeOf,L=e=>["Object","Array"].includes(F(e));function ae(){let e;const a=new Set,t=c=>c.__isState;let r=c=>t(c)?c._val:c,n=c=>t(c)?c.oldVal:c,o=c=>c.map(r);function s(c){e||(e=window.requestAnimationFrame(()=>{c(),e=void 0}))}const i=()=>s(()=>a.forEach(c=>c.bindings=c.bindings.filter(f=>{var g;return(g=f.dom)==null?void 0:g.isConnected})));let l=c=>{var f;for(let g of c.bindings){let{deps:w,dom:y,render:I,renderItem:x}=g;const $=o(w);if(x&&c.arrayOp)(f=m({...c.arrayOp,dom:y,renderDomItem:E=>h(x({deps:$,dom:y})(E))})[c.arrayOp.method])==null||f.call(),i();else{let E=I({dom:y,oldValues:w.map(n),renderItem:x&&x({deps:$,dom:y})})(...$);E!==y&&(E!=null?y.replaceWith(g.dom=h(E)):(y.remove(),g.dom=void 0))}}c.arrayOp=null};const d=({state:c,data:f,parentProp:g=[]})=>({get(w,y,I){var x;if(y==="_isProxy")return!0;if(!((x=w[y])!=null&&x._isProxy)&&L(w[y]))w[y]=new Proxy(w[y],d({state:c,data:f,parentProp:[...g,y]}));else if(["splice","push","pop","shift","unshift"].includes(y)){const $=w[y];return(...E)=>{const P=$.apply(w,E);return c.arrayOp={method:y,args:E},l(c),P}}return Reflect.get(w,y,I)},set(w,y,I,x){const $=Reflect.set(w,y,I,x);return c.arrayOp={method:"setItem",args:{prop:y,value:I},newTarget:w,parentProp:[...g,y],data:f},l(c),$}}),u=(c,f)=>new Proxy(f,d({state:c,data:f})),m=({dom:c,parentProp:f,args:g,depsValues:w,renderDomItem:y,data:I})=>({assign:()=>c.replaceChildren(...g.map(y)),setItem:()=>{const x=f[0],$=c.children[x],E=I[x];$&&$.replaceWith(y(E))},push:()=>c.append(...g.map(y)),pop:()=>c.lastChild&&c.removeChild(c.lastChild),shift:()=>c.firstChild&&c.removeChild(c.firstChild),unshift:()=>{const x=y(g[0],w);c.firstChild?c.firstChild.before(x):c.appendChild(x)},splice:()=>{const[x,$,...E]=g;for(let P=Math.min(x+$-1,c.children.length-1);P>=x;P--)c.children[P].remove();if(E.length>0){const P=E.forEach(y);c.children[x]?c.children[x].after(P):c.append(...P)}}});let p=c=>({oldVal:c,bindings:[],arrayOp:null,__isState:!0,get _val(){const f=this;return f.valProxy??(f.valProxy=L(c)?u(f,c):c,f.valProxy)},set _val(f){this.valProxy=f},get val(){return this._val},set val(f){let g=this,w=g._val;L(f)?(g._val=u(g,f),g.arrayOp={method:"assign",args:f},l(g)):f!==w&&(g._val=f,l(g)),g.oldVal=w}}),h=c=>c.nodeType?c:new Text(c),b=(c,...f)=>{if(f.length==0)return c;const g=[];for(let w of f.flat(1/0))w!=null&&g.push(t(w)?T({deps:[w],render:()=>y=>y}):h(w));return c.append(...g),c};const C={},k=(c,f)=>c?Object.getOwnPropertyDescriptor(c,f)??k(R(c),f):void 0,v=(c,f,g)=>{var w;return C[c+","+f]??(C[c+","+f]=((w=k(g,f))==null?void 0:w.set)??0)},S=c=>new Proxy(function(g,...w){let[y,...I]=re(w[0])?w:[{},...w],x=c?document.createElementNS(c,g):document.createElement(g);for(let[$,E]of Object.entries(y)){let P=v(g,$,R(x))?B=>x[$]=B:B=>x.setAttribute($,B);E==null||(t(E)?T({deps:[E],render:()=>B=>(P(B),x)}):E.renderProp?T({deps:E.deps,render:({})=>(...B)=>(P(E.renderProp({dom:x})(...B)),x)}):P(E))}return b(x,...I)},{get:(f,g)=>f.bind(void 0,g)});let T=({deps:c,render:f,renderItem:g})=>{const w=f({deps:c,renderItem:g&&g({deps:c})})(...o(c));if(w!=null){const y=h(w),I={deps:c,render:f,renderItem:g,dom:y};for(let x of c)t(x)&&(a.add(x),x.bindings.push(I));return y}};return{tags:S(),tagsNS:S,state:p,bind:T}}const oe=e=>{let a=0,t=11;for(;a<e.length;)t=101*t+e.charCodeAt(a++)>>>0;return"bau"+t},ne=(e,a,t)=>{const r=document.createElement("style");r.id=a,r.appendChild(new Text(t)),e.appendChild(r)},se=(e,a)=>e.reduce((t,r,n)=>t+r+(a[n]??""),"");function ie({target:e=document.head}={}){const a=t=>(r,...n)=>{const o=se(r,n),s=oe(o);return!document.getElementById(s)&&ne(e,s,t(s,o)),s};return{css:a((t,r)=>`.${t} { ${r} }`),keyframes:a((t,r)=>`@keyframes ${t} { ${r} }`),createGlobalStyles:a((t,r)=>r)}}function le(e={}){return{bau:ae(),...ie(),tr:a=>a,...e}}function A(...e){return e.filter(a=>a).join(" ")}function M(e){const{bau:a,css:t}=e,r={root:t`
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
    `,button:t`
      cursor: pointer;
    `,a:t``,flat:t`
      border-width: 0;
    `,flatPrimary:t`
      color: var(--color-primary);
    `,flatAccent:t`
      color: var(--color-secondary-darkest);
    `,raised:t`
      box-shadow: var(--global-shadow-lw);
      &:active {
        box-shadow: var(--global-shadow-md);
      }
    `,raisedPrimary:t`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,raisedAccent:t`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,disabled:t`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,raisedDisabled:t`
      background-color: rgba(0, 0, 0, 0.12);
    `,fullWidth:t`
      text-align: center;
      width: 100%;
    `,ripple:t`
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
    `};return function(o,...s){const{primary:i,accent:l,raised:d,disabled:u,ripple:m,href:p,icon:h,...b}=o;return(p?a.tags.a:a.tags.button)({...b,class:A(r.root,p?r.a:r.button,d?r.raised:r.flat,!d&&i&&r.flatPrimary,!d&&l&&r.flatAccent,d&&i&&r.raisedPrimary,d&&l&&r.raisedAccent,m&&r.rippledisabled&&r.disabled,u&&d&&r.raisedDisabled,o.class),href:p,...!p&&{type:"button"}},s)}}function ce(e){const{tr:a,bau:t,css:r}=e,{i:n,header:o,h1:s,div:i,a:l,img:d}=t.tags,{svg:u,path:m}=t.tagsNS("http://www.w3.org/2000/svg"),p=t.state(!0),h=M(e),b=()=>n({class:r`
          color: var(--font-color-inverse);
        `},u({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},m({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),C=()=>i({class:r`
          display: flex;
          align-items: center;
        `},h({"aria-label":"drawer",onclick:()=>p.val=!p.val},b()),s(a("Bau Story Book"))),k=()=>l({class:r`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:"./github-mark-white.svg",width:40,height:40}));return function(){return o({class:r`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `},C(),k())}}function de({tr:e,bau:a,css:t}){const{footer:r,span:n,a:o,ul:s,li:i,p:l}=a.tags;return function(){return r({class:t`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},n("version: 0.25.0"))}}const ue=()=>[{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Animate",id:"animate"},{name:"Avatar",id:"avatar"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"File Input",id:"fileInput"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"TreeView",id:"treeview"}];function j(e){const{tr:a,bau:t,css:r}=e,{ul:n,li:o,nav:s,a:i}=t.tags;return function(){return s({class:r`
          grid-area: sidebar;
          top: 20px;
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
        `},n(ue().map(({name:d,id:u})=>o(i({href:`#${u}`},d)))))}}const pe=e=>{const{bau:a,css:t}=e,{div:r}=a.tags,n=ce(e),o=j(e),s=de(e);return function({component:l}){return r({class:t`
          display: grid;
          grid-template-columns: 2fr;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";

          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `},n(),o(),l(),s())}},H={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},O=e=>`var(--color-${e}-darkest)`,me=()=>Object.keys(H).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${O(e)};
    color: ${O(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${O(e)};
    }
  }`).join(`
`),be=({css:e,createGlobalStyles:a})=>(a`
:root {
  --alert-border-left-width: 8px;
}
${me()}
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
    `});function _(e){const{bau:a,css:t,createGlobalStyles:r,tr:n}=e,{div:o}=a.tags,s=be({css:t,createGlobalStyles:r}),i=M(e),l=({onclick:d})=>i({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(u,...m){const{severity:p="info",onRemove:h,...b}=u;return o({...b,class:A(s.base,`alert-${p}`,u.class),role:"alert"},o({class:"icon"},H[p]),o({class:"content"},...m),h&&l({onclick:h}))}}const he=e=>{const{tr:a,bau:t}=e,{section:r,div:n,h3:o,h2:s,h4:i,p:l}=t.tags,d=_(e);return()=>r({id:"alert"},s(a("Alert Examples")),o("Info"),n(d({severity:"danger"},i("Something went wrong"),l("Error code ",404),l("Status ","Not Found")),d({severity:"warning",onRemove:u=>{u.preventDefault()}},"Alert warning"),d({severity:"info"},"My Message"),d({severity:"success"},i("Great Success"),l("Alert success message"))))};function fe(e,a={}){return function({parent:r,animationHide:n,animationShow:o},s){const i=s;i.style.animation=o;const l=()=>{i.removeEventListener("animationend",l),i.style.animation=""};return i.addEventListener("animationend",l),new MutationObserver((d,u)=>{d.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(p=>{if(p===i){const h=i.cloneNode(!0);return h.style.animation=n,m.previousSibling?m.previousSibling.after(h):m.nextSibling?m.nextSibling.before(h):m.target&&m.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h)),u.disconnect(),!0}}))}).observe(r,{childList:!0,subtree:!0}),i}}const ge=({keyframes:e})=>({hideRight:e`
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
 `}),ve=e=>{const{bau:a}=e,{section:t,div:r,h1:n}=a.tags,o=fe(),s=M(e),i=ge(e);return function(){const l=a.state(!0),d=t({id:"animate"});return d.appendChild(r(n("Test Animate"),r(s({onclick:()=>{l.val=!l.val}},a.bind({deps:[l],render:()=>u=>u?"Hide":"Show"}))),r(a.bind({deps:[l],render:()=>u=>u?o({parent:d,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},r("Ciao")):""})))),d}};function ye(e,a={}){const{bau:t}=e,{span:r,img:n}=t.tags,o=t.state(!0),s=t.state(!1),i=()=>o.val=!1,l=d=>{o.val=!1,s.val=!0};return function({width:u=60,height:m=60,...p},...h){return r({class:A(a.cssOverride,p.class)},t.bind({deps:[o],render:()=>b=>b?"Loading...":""}),t.bind({deps:[s],render:()=>b=>b?"Error":""}),n({width:u,height:m,onload:i,onerror:l,...p}))}}const we=e=>{const{tr:a,bau:t,css:r}=e,{section:n,h2:o}=t.tags,s=r`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=ye(e);return()=>n({id:"avatar"},o(a("Avatar")),i({class:s,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),i({class:s,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),i({src:"./grucloud.svg",alt:"GruCloud"}))},xe=(e,{limit:a=10,deleteAfterDuration:t=15e3}={})=>{const{bau:r,css:n,keyframes:o}=e,{div:s}=r.tags,i=r.state([]),l={inserting:o`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:o`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:n`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:n`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:n`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},u=({id:m,status:p})=>{const h=i.val.findIndex(b=>b.id===m);h!=-1&&(i.val[h].status=p)};return function(p={},...h){const b=({id:v})=>{u({id:v,status:"removing"});const S=i.val.findIndex(T=>T.id===v);S!=-1&&i.val.splice(S,1)},C=({Component:v})=>{const S={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};i.val.length>=a&&b({id:i.val[0].id}),i.val.push(S),setTimeout(()=>b(S),t)},k=v=>s({class:d.item,onclick:()=>b(v)},v.Component());return document.addEventListener("alert.add",v=>C(v.detail)),document.addEventListener("alert.remove",v=>b(v.detail)),s({class:A(d.stack,p.class)},r.bind({deps:[i],render:({renderItem:v})=>S=>s(S.map(v)),renderItem:()=>k}))}},ke=e=>{const{tr:a,bau:t}=e,{section:r,h1:n}=t.tags,o=xe(e,{deleteAfterDuration:2e4}),s=M(e),i=_(e);return function(){return r({id:"alert-stack"},o(),n("Alert stack"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"success"},a("Infrastructure Created"))}}))}},"success alert"),s({raised:!0,onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({severity:"danger"},a("Error creating infrastructure"))}}))}},"danger alert"))}},Ce=e=>{const{tr:a,bau:t,css:r}=e,{section:n,p:o,h2:s,h3:i}=t.tags,l=M(e);return()=>n({id:"button",class:r`
          & button {
            margin: 0.5rem;
          }
        `},s(a("Button Examples")),i("Flat"),o(l({},"Do stuff"),l({primary:!0},a("FLAT PRIMARY")),l({accent:!0},a("FLAT ACCENT")),l({ripple:!0},a("FLAT ACCENT")),l({disabled:!0},a("DISABLED"))),i("Primary"),o(l({primary:!0},a("primary")),l({primary:!0,raised:!0},a("primary Raised")),l({ripple:!0,raised:!0},a("primary ripple")),l({disabled:!0,raised:!0},a("primary DISABLED"))),i("Raised"),o(l({raised:!0},a("Raised FLAT")),l({primary:!0,raised:!0},a("Raised PRIMARY")),l({accent:!0,raised:!0},a("Raised ACCENT")),l({ripple:!0,raised:!0},a("Raised RIPPLE")),l({disabled:!0,raised:!0},a("Raised DISABLED"))),i("Full With"),o(l({class:r`
              width: 100%;
            `,raised:!0},a("raised FLAT")),l({class:r`
              width: 100%;
            `,primary:!0},a("Raised PRIMARY"))),i("Icon"),o(l({"aria-label":"Close"},"✖"),l({primary:!0},"✖"),l({raised:!0},"✖"),l({},"TODO")))};function Se(e,a={}){const{bau:t,css:r}=e,{input:n}=t.tags,o={base:r`
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
    `};return function(i,...l){return n({class:A(o.base,i.class),type:"checkbox",required:"required",...i})}}const Ee=e=>{const{tr:a,bau:t,css:r}=e,{section:n,div:o,label:s,h2:i,form:l}=t.tags,d=Se(e),u=t.state(!1),m=t.state(!1),p=b=>C=>{b.val=!!C.target.checked},h=(...b)=>o({class:r`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...b);return()=>n({id:"checkbox"},l(i(a("Checkbox Examples")),h(d({id:"myCheckbox",name:"myCheckbox",checked:u,onchange:p(u)}),s({for:"myCheckbox"},"My Checkbox")),h(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:m,onchange:p(m)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function Ae(e){const{bau:a,css:t}=e,{div:r}=a.tags,n=t`
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
  `;return function({openState:s,...i},...l){return r({class:A(n,i.class)},r({class:{deps:[s],renderProp:()=>d=>A("overlay",d&&"overlay-open")},onclick:()=>{s.val=!1}}),r({class:{deps:[s],renderProp:()=>d=>A("content",d&&"content-open")}},...l))}}const $e=e=>{const{tr:a,bau:t}=e,{section:r,h2:n}=t.tags,o=t.state(!1),s=Ae(e),i=M(e),l=j(e);return()=>r({id:"drawer"},n(a("Drawer")),i({raised:!0,onclick:()=>{o.val=!o.val}},"OPEN DRAWER"),s({openState:o},l()))};function Te(e,a={}){const{bau:t,css:r}=e,{div:n,span:o,label:s,input:i}=t.tags,l={base:r`
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
    `,disabled:r`
      color: var(--color-gray-500);
      & label {
        background-color: var(--color-gray-100);
        border: var(--global-border-width) var(--color-gray-500) dotted;
        &:hover {
          box-shadow: var(--global-shadow-lw);
        }
        cursor: not-allowed;
      }
    `};return function(u,...m){const{Component:p,disabled:h,...b}=u;return n({class:A(l.base,h&&l.disabled,u.class)},s(p({disabled:h}),i({type:"file",disabled:h,...b})),o({class:"filename-display"}))}}const Ie=e=>{const{tr:a,bau:t,css:r}=e,{svg:n,use:o}=t.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:d,span:u}=t.tags,m=t.state("No file selected"),p=Te(e),h=C=>{const k=C.target.files[0];k?m.val=k.name:m.val="No file selected"},b=({disabled:C})=>i({class:A(r`
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
          `,C&&r`
              color: var(--color-gray-500);
              svg {
                path {
                  fill: var(--color-gray-500);
                }
              }
            `)},n(o({href:"uploadIcon.svg#Capa_1"})),u(a("Choose a file to upload")));return()=>s({id:"fileInput"},d(a("FileInput Examples")),l("File Input"),p({Component:b,name:"file",accept:"text/*",onchange:h}),i("File selected: ",m),l("File Input disabled"),p({Component:b,name:"file",accept:"text/*",disabled:!0,onchange:h}))},Pe=({css:e,createGlobalStyles:a})=>(a`
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
    `});function Me(e,a={}){const{bau:t,css:r,createGlobalStyles:n}=e,{div:o,input:s,label:i}=t.tags,l=Pe({css:r,createGlobalStyles:n});return function(u){const{name:m,id:p,disabled:h,label:b="",error:C="",...k}=u;return o({class:A(l.base,h&&l.disabled,C&&l.error,u.class)},s({id:p,name:m,type:"text",required:!0,disabled:h,...k}),i({htmlFor:p},b),o({"data-input-error":m},C))}}const Be=e=>{const{tr:a,bau:t}=e,{section:r,div:n,h3:o,h2:s}=t.tags,i=Me(e);return()=>r({id:"input"},s(a("Input Examples")),o("Standard"),n(i({id:"my-Input",name:"Label",label:"Label"})),o("Disabled"),n(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),o("Input with error"),n(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function De(e){const{bau:a,css:t}=e,{dialog:r}=a.tags,n=t`
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
      color: var(--font-color-base);
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
  `;return function(s,...i){return r({class:A(n,s.class)},...i)}}const Le=e=>{const{tr:a,bau:t}=e,{section:r,main:n,h2:o,header:s,footer:i,p:l}=t.tags,d=M(e),u=De(e),m=()=>n(Array(10).fill("").map((h,b)=>l(b+1,". "))),p=u({id:"my-dialog"},s("Header"),m(),i(d({onclick:()=>{p.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{p.close()}},"OK")));return()=>r({id:"modal"},o(a("Modal Examples")),d({raised:!0,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)};function Oe(e,a={}){const{bau:t,css:r}=e,{svg:n,animate:o,animateTransform:s,rect:i}=t.tagsNS("http://www.w3.org/2000/svg");return function({size:d=36,color:u="primary",visibility:m=!0,...p}={}){return n({class:A(r`
            visibility: ${m?"visible":"hidden"};
            color: var(--color-${u});
          `,p.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:d,height:d,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},o({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Re=e=>{const{tr:a,bau:t}=e,{section:r,h2:n,div:o}=t.tags,s=Oe(e);return()=>r({id:"spinner"},n(a("Spinner Examples")),o(s({size:30}),s(),s({size:40,color:"secondary"}),s({size:50,color:"info"}),s({size:60,color:"danger"})))};function Ne(e){const{bau:a,css:t}=e,{input:r}=a.tags,n=t`
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
  `;return function(s,...i){return r({...s,class:A(n,s.class),type:"checkbox",required:"required"},...i)}}const ze=e=>{const{tr:a,bau:t,css:r}=e,{section:n,form:o,label:s,div:i,h2:l}=t.tags,d=Ne(e);return()=>n({id:"switch"},l(a("Switch Examples")),o(i({class:r`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))))};function N(e,{tabDefs:a}){const{bau:t,css:r}=e,{div:n,ul:o,li:s}=t.tags,i=t.state(a),l=t.state(a[0]),d=m=>i.val.find(p=>p.name==m),u={base:r`
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
          background-color: white;
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
    `};return function(p,...h){const b=k=>{const{Header:v,disabled:S,name:T}=k;return s({class:{deps:[l],renderProp:()=>c=>A(c.name==T&&"active",S&&"disabled")},onclick:c=>c.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:T},bubbles:!0}))},v(k))},C=n({class:A(u.base,p.class)},t.bind({deps:[i],render:({renderItem:k})=>v=>o(v.map(k)),renderItem:()=>b}),t.bind({deps:[l],render:()=>({Content:k})=>k?k({}):""}));return C.addEventListener("tab.select",k=>{var T,c;const{tabName:v}=k.detail,S=d(v);S&&((T=l.val.exit)==null||T.call(),l.val=S,(c=S.enter)==null||c.call())},!1),C.addEventListener("tab.add",k=>{var S;const{tab:v}=k.detail;(S=v.enter)==null||S.call(),i.val.push(v)},!1),C.addEventListener("tab.remove",k=>{var S;const v=i.val.findIndex(T=>T.name==k.detail.tabName);v>0&&((S=i.val[v].exit)==null||S.call(),i.val.splice(v,1))},!1),C}}const Fe=e=>{const{tr:a,bau:t,css:r}=e,{section:n,div:o,h3:s,h2:i,p:l,i:d}=t.tags,u=(...v)=>o({class:r`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...v),m=()=>({name:"New Tab",Header:({name:v})=>o(v),Content:()=>o("My Paragraph")}),p=M(e),b=N(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My tab Disabled"))}]}),k=N(e,{tabDefs:[{name:"Tab1",Header:()=>o(d({class:r`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>o({class:r`
              > button {
                margin: 10px;
              }
            `},p({raised:!0,onclick:v=>v.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:m()},bubbles:!0}))},"Add a new Tab"),p({accent:!0,onclick:v=>v.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My Content"))}]});return()=>n({id:"tabs"},i(a("Tabs")),s("Basic Tabs"),u(b({})),s("Full Witdth"),u(b({class:r`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(b({class:r`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(b({class:r`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(b({class:r`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(b({class:r`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(k({})))};function je(e){e.style.height="0px"}function He(e){e.style.height=e.scrollHeight+"px"}const _e=({css:e,createGlobalStyles:a})=>(a`
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
          display: flex;
          &:hover {
            background: var(--menu-color-background-hover);
          }
          > a {
            display: flex;
            text-decoration: none;
            color: var(--menu-color);
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
            &::before {
              transition: transform var(--transition-fast) linear;
              background: var(--menu-link-sublist-icon) 50% / 2rem 2rem;
              height: 1.25rem;
              width: 1.25rem;
            }
          }
        }
      }
    }
  `,collapsable:e`
      > div > a {
        &::before {
          content: "";
          transform: rotate(90deg);
        }
      }
    `,collapsed:e`
      > div > a {
        &::before {
          content: "";
          transform: rotate(180deg);
        }
      }
    `});function Ve(e,{renderMenuItem:a}){const{bau:t,css:r,createGlobalStyles:n}=e,{ul:o,li:s,nav:i}=t.tags,l=_e({css:r,createGlobalStyles:n}),d=({depth:u=0})=>m=>{const{children:p}=m,h=t.state(!0);return s({class:{deps:[h],renderProp:()=>b=>A(p?b?l.collapsable:l.collapsed:"")},onclick:b=>{h.val=!h.val,b.preventDefault()}},a(m),p&&o({"aria-expanded":{deps:[h],renderProp:({dom:b})=>C=>(C?je(b):He(b),!C)}},p.map(d({depth:u+1}))))};return function({tree:m,...p}){return i({class:A(l.nav,p.class)},o(m.children.map(d({}))))}}const Ge=e=>{const{tr:a,bau:t}=e,{section:r,div:n,a:o,h2:s}=t.tags,i={name:"Root Menu",children:[{name:"Menu 1",href:"#menu",children:[{name:"Sub Menu 1",href:"#menusub2"},{name:"Sub Menu 2",href:"#menusub1"}]},{name:"Menu 2",href:"#menu2",children:[{name:"Sub Menu 21",href:"#menusub21"}]}]},d=Ve(e,{renderMenuItem:({name:u,href:m})=>n(o({href:m,onclick:()=>{}},u))});return()=>r({id:"treeview"},s(a("TreeView")),d({tree:i}))},We=e=>{const{tr:a,bau:t,css:r}=e,{div:n,main:o,h1:s}=t.tags;return function(){return o({class:r`
          grid-area: main;
          padding: 10px;
          margin-top: 20px;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `},s(a("Examples")),he(e)(),ke(e)(),ve(e)(),we(e)(),Ce(e)(),Ee(e)(),$e(e)(),Ie(e)(),Be(e)(),Le(e)(),Re(e)(),ze(e)(),Fe(e)(),Ge(e)())}},Xe=({context:e})=>[{path:"",action:a=>({title:"BauUI Storybook",component:We(e)})}],qe=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Ye=({LayoutDefault:e,config:{base:a=""}})=>({router:t})=>{const{title:r,component:n,Layout:o=e}=t.resolve({pathname:location.pathname.replace(a,"")});document.getElementById("app").replaceChildren(o({component:n})),document.title=`${r}`};te();const V={title:"Bau",base:"/bau"},D=le({config:V}),Ke=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]];ee(D,{colorPalette:Ke});q({routes:Xe({context:D}),onLocationChange:Ye({LayoutDefault:pe(D),config:V}),notFoundRoute:qe(D)});
