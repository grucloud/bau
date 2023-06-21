(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const q=(e,r)=>({...e,paths:[...r,e.path]}),j=({paths:e=[],routes:r})=>r.flatMap(({children:t,...o})=>{const a=q(o,e);return t?[a,...j({paths:[...e,o.path],routes:t})]:a}),X=({paths:e})=>{const r=e.map(t=>t instanceof RegExp?t.source:t).map(t=>String.raw`\/${t}`).join("");return new RegExp(`^${r}$`)},Y=({routes:e=[],notFoundRoute:r})=>{const t=j({routes:e}).map(o=>({...o,regex:X(o)}));return{resolve:({pathname:o})=>{const a=t.find(({regex:n})=>n.test(o));return a?a.action({match:o.match(a.regex)}):r}}};function U({routes:e,notFoundRoute:r,onLocationChange:t}){const o=Y({routes:e,notFoundRoute:r});return window.addEventListener("popstate",a=>t({router:o})),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,n,s)=>{a.apply(n,s),t({router:o})}}),document.addEventListener("click",a=>{const{target:n}=a,s=n.getAttribute("href");n.tagName==="A"&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),a.preventDefault())}),t({router:o}),o}const K=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],J=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Q=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Z=()=>new Array(10).fill("").map((e,r)=>`--color-gray-${r*100}: hsl(0, 0%, ${100-8*r}%);`).join(`
`),ee=()=>new Array(10).fill("").map((e,r)=>`--color-emphasis-${r*100}: var(--color-gray-${r*100});`).join(`
`),te=([e,{h:r,s:t,l:o}])=>[`--color-${e}-h: ${r};`,`--color-${e}-s: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...J.map(([a,n])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),...Q.map(([a,n])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function re({createGlobalStyles:e}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${K.map(([r,t])=>te([r,t])).join(`
`)}
  ${Z()}
  ${ee()}
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 90%);
  --color-content-secondary: #525860;
  --background-color: var(--color-white);
  --background-surface-color: var(--color-content-inverse);
  --global-border-width: 1px;
  --global-radius: 0.4rem;
  --font-color-base: var(--color-content);
  --font-color-disabled: var(--color-emphasis-800);
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
`}function oe(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}const _=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>_(e)=="Object",z=Object.getPrototypeOf,R=e=>["Object","Array"].includes(_(e));function ne(){let e;const r=new Set,t=c=>c.__isState;let o=c=>t(c)?c._val:c,a=c=>t(c)?c.oldVal:c,n=c=>c.map(o);function s(c){e||(e=window.requestAnimationFrame(()=>{c(),e=void 0}))}const i=()=>s(()=>r.forEach(c=>c.bindings=c.bindings.filter(f=>{var v;return(v=f.dom)==null?void 0:v.isConnected})));let l=c=>{var f;for(let v of c.bindings){let{deps:w,dom:x,render:T,renderItem:k}=v;const A=n(w);if(k&&c.arrayOp)(f=d({...c.arrayOp,dom:x,renderDomItem:E=>p(k({deps:A})(E))})[c.arrayOp.method])==null||f.call(),i();else{let E=T({dom:x,oldValues:w.map(a),renderItem:k})(...A);E!==x&&(E!=null?x.replaceWith(v.dom=p(E)):(x.remove(),v.dom=void 0))}}c.arrayOp=null};const m=({state:c,data:f,parentProp:v=[]})=>({get(w,x,T){var k;if(x==="_isProxy")return!0;if(!((k=w[x])!=null&&k._isProxy)&&R(w[x]))w[x]=new Proxy(w[x],m({state:c,data:f,parentProp:[...v,x]}));else if(["splice","push","pop","shift","unshift"].includes(x)){const A=w[x];return(...E)=>{const I=A.apply(w,E);return c.arrayOp={method:x,args:E},l(c),I}}return Reflect.get(w,x,T)},set(w,x,T,k){const A=Reflect.set(w,x,T,k);return c.arrayOp={method:"setItem",args:{prop:x,value:T},newTarget:w,parentProp:[...v,x],data:f},l(c),A}}),u=(c,f)=>new Proxy(f,m({state:c,data:f})),d=({dom:c,parentProp:f,args:v,depsValues:w,renderDomItem:x,data:T})=>({assign:()=>c.replaceChildren(...v.map(x)),setItem:()=>{const k=f[0],A=c.children[k],E=T[k];A&&A.replaceWith(x(E))},push:()=>c.append(...v.map(x)),pop:()=>c.lastChild&&c.removeChild(c.lastChild),shift:()=>c.firstChild&&c.removeChild(c.firstChild),unshift:()=>{const k=x(v[0],w);c.firstChild?c.firstChild.before(k):c.appendChild(k)},splice:()=>{const[k,A,...E]=v;for(let I=Math.min(k+A-1,c.children.length-1);I>=k;I--)c.children[I].remove();if(E.length>0){const I=E.forEach(x);c.children[k]?c.children[k].after(I):c.append(...I)}}});let h=c=>({oldVal:c,bindings:[],arrayOp:null,__isState:!0,get _val(){const f=this;return f.valProxy??(f.valProxy=R(c)?u(f,c):c,f.valProxy)},set _val(f){this.valProxy=f},get val(){return this._val},set val(f){let v=this,w=v._val;R(f)?(v._val=u(v,f),v.arrayOp={method:"assign",args:f},l(v)):f!==w&&(v._val=f,l(v)),v.oldVal=w}}),p=c=>c.nodeType?c:new Text(c),b=(c,...f)=>{if(f.length==0)return c;const v=[];for(let w of f.flat(1/0))w!=null&&v.push(t(w)?$({deps:[w],render:()=>x=>x}):p(w));return c.append(...v),c};const g={},y=(c,f)=>c?Object.getOwnPropertyDescriptor(c,f)??y(z(c),f):void 0,S=(c,f,v)=>{var w;return g[c+","+f]??(g[c+","+f]=((w=y(v,f))==null?void 0:w.set)??0)},C=c=>new Proxy(function(v,...w){let[x,...T]=ae(w[0])?w:[{},...w],k=c?document.createElementNS(c,v):document.createElement(v);for(let[A,E]of Object.entries(x)){let I=S(v,A,z(k))?P=>k[A]=P:P=>k.setAttribute(A,P);E==null||(t(E)?$({deps:[E],render:()=>P=>(I(P),k)}):E.renderProp?$({deps:E.deps,render:({})=>(...P)=>(I(E.renderProp({dom:k})(...P)),k)}):I(E))}return b(k,...T)},{get:(f,v)=>f.bind(void 0,v)});let $=({deps:c,render:f,renderItem:v})=>{const w=f({renderItem:v})(...n(c));if(w!=null){const x=p(w),T={deps:c,render:f,renderItem:v,dom:x};for(let k of c)t(k)&&(r.add(k),k.bindings.push(T));return x}};return{tags:C(),tagsNS:C,state:h,bind:$}}const se=e=>{let r=0,t=11;for(;r<e.length;)t=101*t+e.charCodeAt(r++)>>>0;return"bau"+t},ie=(e,r,t)=>{const o=document.createElement("style");o.id=r,o.appendChild(new Text(t)),e.appendChild(o)},le=(e,r)=>e.reduce((t,o,a)=>t+o+(r[a]??""),"");function ce({target:e=document.head}={}){const r=t=>(o,...a)=>{const n=le(o,a),s=se(n);return!document.getElementById(s)&&ie(e,s,t(s,n)),s};return{css:r((t,o)=>`.${t} { ${o} }`),keyframes:r((t,o)=>`@keyframes ${t} { ${o} }`),createGlobalStyles:r((t,o)=>o)}}function de(e={}){return{bau:ne(),...ce(),tr:r=>r,...e}}function B(...e){return e.filter(r=>r).join(" ")}function M(e,r={}){const{bau:t,css:o}=e;t.tags;const a={root:o`
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
    `,button:o`
      cursor: pointer;
    `,a:o``,flat:o`
      border-width: 0;
    `,flatPrimary:o`
      color: var(--color-primary);
    `,flatAccent:o`
      color: var(--color-secondary-darkest);
    `,raised:o`
      box-shadow: var(--global-shadow-lw);
      &:active {
        box-shadow: var(--global-shadow-md);
      }
    `,raisedPrimary:o`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,raisedAccent:o`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,raisedDisabled:o`
      background-color: rgba(0, 0, 0, 0.12);
    `,fullWidth:o`
      text-align: center;
      width: 100%;
    `,ripple:o`
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
    `};return function(s,...i){const{fullWidth:l,label:m,primary:u,accent:d,raised:h,disabled:p,ripple:b,href:g,icon:y,...S}=s;return(g?t.tags.a:t.tags.button)({...S,class:B(a.root,g?a.a:a.button,h?a.raised:a.flat,!h&&u&&a.flatPrimary,!h&&d&&a.flatAccent,h&&u&&a.raisedPrimary,h&&d&&a.raisedAccent,b&&a.rippledisabled&&a.disabled,p&&h&&a.raisedDisabled,l&&a.fullWidth,s.class),href:g,...!g&&{type:"button"}},i)}}const ue=()=>[{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Avatar",id:"avatar"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"File Input",id:"file-input"},{name:"Form",id:"form"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"TreeView",id:"treeview"}];function pe(e){const{tr:r,bau:t,css:o}=e,{ul:a,li:n,nav:s,a:i}=t.tags;return function(){return s({class:o`
          top: 20px;
          bottom: 0px;
          left: 0;
          min-width: 150px;
          max-width: 180px;
          overflow-y: scroll;
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
        `},a(ue().map(({name:m,id:u})=>n(i({href:`#${u}`},m)))))}}function me(e){const{tr:r,bau:t,css:o}=e,{i:a,header:n,h1:s,div:i,a:l,img:m}=t.tags,{svg:u,path:d}=t.tagsNS("http://www.w3.org/2000/svg"),h=t.state(!0),p=M(e),b=pe(e),g=()=>a({class:o`
          color: var(--font-color-inverse);
        `},u({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},d({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),y=()=>i({class:o`
          display: flex;
          align-items: center;
        `},p({"aria-label":"drawer",onclick:()=>h.val=!h.val},g()),s(r("Bau Components Story Book"))),S=()=>l({class:o`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},m({alt:"GitHub",src:"./github-mark-white.svg",width:40,height:40})),C=()=>i({class:o`
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `},y(),S());return function(){return n(C(),b())}}const be=e=>{const{bau:r,css:t}=e,{div:o}=r.tags,a=me(e);return function({component:s}){return o({class:t`
          display: grid;
          grid-template-columns: 180px 1fr;
          grid-template-rows: 60px 1fr;

          > header {
            grid-row: 1;
            grid-column: 1 / 3;
            z-index: 2;
            position: sticky;
            top: 0;
          }

          @media (max-width: 640px) {
            nav {
              visibility: hidden;
            }
            main {
              grid-column: 1 / 3;
            }
          }
        `},a(),s())}},V={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},O=e=>`var(--color-${e}-darkest)`,he=()=>Object.keys(V).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${O(e)};
    color: ${O(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${O(e)};
    }
  }`).join(`
`),fe=({css:e,createGlobalStyles:r})=>(r`
:root {
  --alert-border-left-width: 8px;
}
${he()}
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
    `});function W(e,r={}){const{bau:t,css:o,createGlobalStyles:a,tr:n}=e,{div:s}=t.tags,i=fe({css:o,createGlobalStyles:a}),l=M(e),m=({onclick:u})=>l({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(d,...h){const{severity:p="info",onRemove:b,...g}=d;return s({...g,class:`${i.base} alert-${p}`,role:"alert"},s({class:"icon"},V[p]),s({class:"content"},...h),b&&m({onclick:b}))}}const ge=e=>{const{tr:r,bau:t}=e,{section:o,div:a,h3:n,h2:s,h4:i,p:l}=t.tags,m=W(e);return()=>o({id:"alert"},s(r("Alert Examples")),n("Info"),a(m({severity:"danger"},i("Something went wrong"),l("Error code ",404),l("Status ","Not Found")),m({severity:"warning",onRemove:u=>{u.preventDefault()}},"Alert warning"),m({severity:"info"},"My Message"),m({severity:"success"},i("Great Success"),l("Alert success message"))))};function ve(e,r={}){return function({Component:o,parent:a,animationHide:n,animationShow:s}){const i=o();i.style.animation=s;const l=()=>{i.removeEventListener("animationend",l),i.style.animation=""};return i.addEventListener("animationend",l),new MutationObserver((m,u)=>{m.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(h=>{if(h===i){const p=i.cloneNode(!0);return p.style.animation=n,d.previousSibling?d.previousSibling.after(p):d.nextSibling?d.nextSibling.before(p):d.target&&d.target.appendChild(p),p.addEventListener("animationend",()=>p.parentNode.removeChild(p)),u.disconnect(),!0}}))}).observe(a,{childList:!0,subtree:!0}),i}}const ye=({keyframes:e})=>({hideRight:e`
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
 `}),we=e=>{const{tr:r,bau:t,keyframes:o}=e,{section:a,div:n,h1:s}=t.tags,i=ve(),l=M(e),m=ye({keyframes:o});return function(){const u=t.state(!0),d=a({id:"animate"});return d.appendChild(n(s("Test Animate"),n(l({onclick:()=>{u.val=!u.val}},t.bind({deps:[u],render:()=>h=>h?"Hide":"Show"}))),n(t.bind({deps:[u],render:()=>h=>h?i({parent:d,Component:()=>n("Ciao"),animationHide:`${m.hideRight} 0.5s`,animationShow:`${m.showRight} 0.5s`}):""})))),d}};function xe(e,r={}){const{bau:t,css:o}=e,{cssOverride:a}=r,{span:n,img:s}=t.tags,i=t.state(!0),l=t.state(!1),m=()=>i.val=!1,u=d=>{i.val=!1,l.val=!0};return function({width:h=60,height:p=60,...b},...g){return n({class:B(a)},t.bind({deps:[i],render:()=>y=>y?"Loading...":""}),t.bind({deps:[l],render:()=>y=>y?"Error":""}),s({width:h,height:p,onload:m,onerror:u,...b}))}}const ke=e=>{const{tr:r,bau:t,css:o}=e,{section:a,h2:n}=t.tags,s=xe(e,{cssOverride:o`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>a({id:"avatar"},n(r("Avatar")),s({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),s({src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}))},Se=(e,{limit:r=10,deleteAfterDuration:t=5e3}={})=>{const{bau:o,css:a,keyframes:n}=e,{div:s}=o.tags,i=o.state([]),l={inserting:n`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:n`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},m={stack:a`
      min-width: 300px;
      max-width: 600px;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:a`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},u=p=>s({class:m.item,onclick:()=>d.remove(p)},p.component()),d=(p,...b)=>s({class:m.stack},o.bind({deps:[i],render:({renderItem:g})=>y=>s(y.map(g())),renderItem:()=>u}));d.add=({component:p})=>{const b={id:Math.random().toString(10).split(".")[1],component:p,status:"inserting"};i.val.length>=r&&d.remove({id:i.val[0].id}),i.val.push(b),setTimeout(()=>d.remove(b),t)};const h=({id:p,status:b})=>{const g=i.val.findIndex(y=>y.id===p);g!=-1&&(i.val[g].status=b)};return d.remove=({id:p})=>{h({id:p,status:"removing"});const b=i.val.findIndex(g=>g.id===p);b!=-1&&i.val.splice(b,1)},d},Ce=e=>{const{tr:r,bau:t}=e,{section:o,h1:a}=t.tags,n=Se(e),s=M(e),i=W(e);return function(){return o({id:"alert-stack"},n(),a("Alert stack"),s({raised:!0,onclick:m=>{n.add({component:()=>i({severity:"success"},r("Infrastructure Created"))})}},"success alert"))}},Ee=e=>{const{tr:r,bau:t,css:o}=e,{section:a,p:n,h2:s,h3:i}=t.tags,l=M(e);return()=>a({id:"button",class:o`
          & button {
            margin: 0.5rem;
          }
        `},s(r("Button Examples")),i("Flat"),n(l({},"Do stuff"),l({primary:!0},r("FLAT PRIMARY")),l({accent:!0},r("FLAT ACCENT")),l({ripple:!0},r("FLAT ACCENT")),l({disabled:!0},r("DISABLED"))),i("Primary"),n(l({primary:!0},r("primary")),l({primary:!0,raised:!0},r("primary Raised")),l({ripple:!0,raised:!0},r("primary ripple")),l({disabled:!0,raised:!0},r("primary DISABLED"))),i("Raised"),n(l({raised:!0},r("Raised FLAT")),l({primary:!0,raised:!0},r("Raised PRIMARY")),l({accent:!0,raised:!0},r("Raised ACCENT")),l({ripple:!0,raised:!0},r("Raised RIPPLE")),l({disabled:!0,raised:!0,label:r("Raised DISABLED")},r("Raised DISABLED"))),i("Full With"),n(l({fullWidth:!0,label:r("FLAT"),raised:!0},r("raised FLAT")),l({fullWidth:!0,primary:!0},r("Raised PRIMARY"))),i("Icon"),n(l({"aria-label":"Close"},"✖"),l({primary:!0},"✖"),l({raised:!0},"✖")))};function Ae(e,r={}){const{bau:t,css:o}=e,{input:a}=t.tags,n={base:o`
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
    `};return function(i,...l){return a({class:n.base,type:"checkbox",required:"required",...i})}}const $e=e=>{const{tr:r,bau:t,css:o}=e,{section:a,div:n,label:s,h2:i,form:l}=t.tags,m=Ae(e),u=t.state(!1),d=t.state(!1),h=b=>g=>{b.val=!!g.target.checked},p=(...b)=>n({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...b);return()=>a({id:"checkbox"},l(i(r("Checkbox Examples")),p(m({id:"myCheckbox",name:"myCheckbox",checked:u,onchange:h(u)}),s({for:"myCheckbox"},"My Checkbox")),p(m({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:d,onchange:h(d)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function Te(e){const{bau:r,css:t}=e,{div:o}=r.tags,a=t`
    position: fixed;
    top: 80px;
    left: 0px;
    z-index: 2;
    & .overlay {
      position: absolute;
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
  `;return function({openState:s},...i){return o({class:a},o({class:{deps:[s],renderProp:()=>l=>B("overlay",l&&"overlay-open")}}),o({class:{deps:[s],renderProp:()=>l=>B("content",l&&"content-open")}},...i))}}const Ie=e=>{const{tr:r,bau:t}=e,{section:o,div:a,h3:n,h2:s}=t.tags,i=t.state(!1),l=Te(e),m=M(e);return()=>o({id:"drawer"},s(r("Drawer")),m({raised:!0,onclick:()=>{i.val=!i.val}},"OPEN DRAWER"),l({openState:i},"Drawer Content"))};function Be(e,r={}){const{bau:t,css:o}=e,{div:a,span:n,label:s,input:i}=t.tags,l={base:o`
      display: inline-block;
      width: 25rem;
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
    `,disabled:o`
      color: var(--color-gray-500);
      & label {
        background-color: var(--color-gray-100);
        border: var(--global-border-width) var(--color-gray-500) dotted;
        &:hover {
          box-shadow: var(--global-shadow-lw);
        }
        cursor: not-allowed;
      }
    `};return function(u,...d){const{Component:h,disabled:p,...b}=u;return a({class:B(l.base,p&&l.disabled)},s(h({disabled:p}),i({type:"file",disabled:p,...b})),n({class:"filename-display"}))}}const N=window._SVG_SPRITE_IDS_=window._SVG_SPRITE_IDS_||[],D=document.createElementNS("http://www.w3.org/2000/svg","svg");D.style.position="absolute";D.style.width="0";D.style.height="0";function H(){document.body.insertBefore(D,document.body.firstChild)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H();function Me(e,r){(N.indexOf(r)>-1||document.getElementById(r))&&console.warn(`Icon #${r} was duplicately registered. It must be globally unique.`),N.push(r),D.insertAdjacentHTML("beforeend",e)}Me('<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.156 294.156" id="icon-uploadIcon-13ee25"><path d="M227.002 108.256c-2.755-41.751-37.6-74.878-80.036-74.878-42.447 0-77.298 33.141-80.038 74.907C28.978 113.059 0 145.39 0 184.184c0 42.234 34.36 76.595 76.595 76.595h116.483a6 6 0 0 0 0-12H76.595C40.977 248.778 12 219.801 12 184.184c0-34.275 26.833-62.568 61.087-64.411a6 6 0 0 0 5.668-6.346c.09-37.536 30.654-68.049 68.211-68.049 37.563 0 68.132 30.518 68.211 68.063a6 6 0 0 0 5.687 6.321c34.37 1.741 61.292 30.038 61.292 64.421 0 19.526-8.698 37.801-23.864 50.138a5.999 5.999 0 0 0-.868 8.44 5.999 5.999 0 0 0 8.44.868c17.98-14.626 28.292-36.293 28.292-59.447 0-38.913-29.076-71.256-67.154-75.926z" /><path d="M140.966 141.078v76.511a6 6 0 0 0 12 0v-76.511a6 6 0 0 0-12 0z" /><path d="M181.283 152.204a6 6 0 0 0 4.243-10.242l-34.317-34.317a6 6 0 0 0-8.485 0l-34.317 34.317a6 6 0 0 0 8.485 8.485l30.074-30.074 30.074 30.074a5.986 5.986 0 0 0 4.243 1.757z" /></symbol>',"icon-uploadIcon-13ee25");const Pe="icon-uploadIcon-13ee25",De=e=>{const{tr:r,bau:t,css:o}=e,{svg:a,use:n}=t.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:m,span:u}=t.tags,d=t.state("No file selected"),h=Be(e),p=g=>{const y=g.target.files[0];y?d.val=y.name:d.val="No file selected"},b=({disabled:g})=>i({class:B(o`
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
          `,g&&o`
              color: var(--color-gray-500);
              svg {
                path {
                  fill: var(--color-gray-500);
                }
              }
            `)},a(n({href:`#${Pe}`})),u(r("Choose a file to upload")));return()=>s({id:"fileInput"},m(r("FileInput Examples")),l("File Input"),h({Component:b,name:"file",accept:"text/*",onchange:p}),i("File selected: ",d),l("File Input disabled"),h({Component:b,name:"file",accept:"text/*",disabled:!0,onchange:p}))},Le=({css:e,createGlobalStyles:r})=>(r`
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
    `});function Re(e,r={}){const{bau:t,css:o,createGlobalStyles:a}=e,{div:n,input:s,label:i}=t.tags,l=Le({css:o,createGlobalStyles:a});return function(u){const{name:d,id:h,disabled:p,label:b="",error:g="",...y}=u;return n({class:B(l.base,p&&l.disabled,g&&l.error,u.class)},s({id:h,name:d,type:"text",required:!0,disabled:p,...y}),i({htmlFor:h},b),n({"data-input-error":d},g))}}const Oe=e=>{const{tr:r,bau:t}=e,{section:o,div:a,h3:n,h2:s}=t.tags,i=Re(e);return()=>o({id:"input"},s(r("Input Examples")),n("Standard"),a(i({id:"my-Input",label:"Label"})),n("Disabled"),a(i({id:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),n("Input with error"),a(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function ze(e,r={}){const{bau:t,css:o}=e,{dialog:a}=t.tags,n=o`
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
  `;return function({open:i},...l){return a({class:n},...l)}}const Ne=e=>{const{tr:r,bau:t}=e,{section:o,div:a,main:n,h3:s,h2:i,header:l,footer:m,p:u}=t.tags,d=M(e),h=ze(e),p=()=>n(Array(10).fill("").map((g,y)=>u(y+1,". "))),b=h({id:"my-dialog"},l("Header"),p(),m(d({onclick:()=>{b.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{b.close()}},"OK")));return()=>o({id:"modal"},i(r("Modal Examples")),d({raised:!0,onclick:()=>{b.showModal()}},"OPEN MODAL"),b)};function He(e,r={}){const{bau:t,css:o}=e,{svg:a,animate:n,animateTransform:s,rect:i}=t.tagsNS("http://www.w3.org/2000/svg");return function({size:m=36,color:u="primary",visibility:d=!0}={}){return a({class:o`
          visibility: ${d?"visible":"hidden"};
          color: var(--color-${u});
        `,version:"1.1",id:"L6",x:"0px",y:"0px",width:m,height:m,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},n({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Fe=e=>{const{tr:r,bau:t}=e,{section:o,h2:a,div:n}=t.tags,s=He(e);return()=>o({id:"spinner"},a(r("Spinner Examples")),n(s({size:"30"}),s(),s({size:"40",color:"secondary"}),s({size:"50",color:"info"}),s({size:"60",color:"danger"})))};function je(e,r={}){const{bau:t,css:o}=e,{input:a}=t.tags,n=o`
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
  `;return function({id:i,...l},...m){return a({class:n,type:"checkbox",required:"required",id:i,...l})}}const _e=e=>{const{tr:r,bau:t,css:o}=e,{section:a,form:n,label:s,div:i,h2:l}=t.tags,m=je(e);return()=>a({id:"switch"},l(r("Switch Examples")),n(i({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),m({id:"my-switch"}))))};function F(e,{tabDefs:r}){const{bau:t,css:o}=e,{div:a,ul:n,li:s}=t.tags,i=t.state(r),l=t.state(r[0]),m=d=>i.val.find(h=>h.name==d),u={base:o`
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
    `};return function(h,...p){const b=y=>{const{Header:S,disabled:C,name:$}=y;return s({class:{deps:[l],renderProp:()=>c=>B(c.name==$&&"active",C&&"disabled")},onclick:c=>c.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:$},bubbles:!0}))},S(y))},g=a({class:B(u.base,h.class)},t.bind({deps:[i],render:({renderItem:y})=>S=>n(S.map(y())),renderItem:()=>b}),t.bind({deps:[l],render:()=>({Content:y})=>y?y({}):""}));return g.addEventListener("tab.select",y=>{var $,c;const{tabName:S}=y.detail,C=m(S);C&&(($=l.val.exit)==null||$.call(),l.val=C,(c=C.enter)==null||c.call())},!1),g.addEventListener("tab.add",y=>{var C;const{tab:S}=y.detail;(C=S.enter)==null||C.call(),i.val.push(S)},!1),g.addEventListener("tab.remove",y=>{var C;const S=i.val.findIndex($=>$.name==y.detail.tabName);S>0&&((C=i.val[S].exit)==null||C.call(),i.val.splice(S,1))},!1),g}}const Ve=e=>{const{tr:r,bau:t,css:o}=e,{section:a,div:n,h3:s,h2:i,p:l,i:m}=t.tags,u=(...S)=>n({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),d=()=>({name:"New Tab",Header:({name:S})=>n(S),Content:()=>n("My Paragraph")}),h=M(e),b=F(e,{tabDefs:[{name:"Tab1",Header:({})=>n("TAB 1"),Content:({})=>n(l("My Tab 1 Content"))},{name:"Tab2",Header:({tab:S})=>n("TAB 2"),Content:({})=>n(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:({})=>n("Tab Disabled")}]}),y=F(e,{tabDefs:[{name:"Tab1",Header:({store:S})=>n(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:({store:S})=>n({class:o`
              > button {
                margin: 10px;
              }
            `},h({raised:!0,onclick:C=>C.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:d()},bubbles:!0}))},"Add a new Tab"),h({accent:!0,onclick:C=>C.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"Tab2"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:({tab:S})=>n("TAB 2"),Content:({store:S})=>n(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:({store:S})=>n("Tab Disabled")}]});return()=>a({id:"tabs"},i(r("Tabs")),s("Basic Tabs"),u(b({})),s("Full Witdth"),u(b({class:o`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(b({class:o`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(b({class:o`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(b({class:o`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(b({class:o`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(y({})))};function We(e){e.style.height="0px"}function Ge(e){e.style.height=e.scrollHeight+"px"}const qe=({css:e,createGlobalStyles:r})=>(r`
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
    `});function Xe(e,{renderMenuItem:r}){const{bau:t,css:o,createGlobalStyles:a}=e,{ul:n,li:s,nav:i}=t.tags,l=qe({css:o,createGlobalStyles:a}),m=({depth:u=0})=>d=>{const{children:h}=d,p=t.state(!0);return s({class:{deps:[p],renderProp:()=>b=>B(h?b?l.collapsable:l.collapsed:"")},onclick:b=>{p.val=!p.val,b.preventDefault()}},r(d),h&&n({"aria-expanded":{deps:[p],renderProp:({dom:b})=>g=>(g?We(b):Ge(b),!g)}},h.map(m({depth:u+1}))))};return function(d){return i({class:l.nav},n(d.children.map(m({}))))}}const Ye=e=>{const{tr:r,bau:t}=e,{section:o,div:a,a:n,h2:s}=t.tags,i={name:"Root Menu",children:[{name:"Menu 1",href:"#menu",children:[{name:"Sub Menu 1",href:"#menusub2"},{name:"Sub Menu 2",href:"#menusub1"}]},{name:"Menu 2",href:"#menu2",children:[{name:"Sub Menu 21",href:"#menusub21"}]}]},m=Xe(e,{renderMenuItem:({name:u,href:d})=>a(n({href:d,onclick:h=>{}},u))});return()=>o({id:"treeview"},s(r("TreeView")),m(i))},Ue=e=>{const{tr:r,bau:t,css:o}=e,{div:a,main:n,h1:s}=t.tags;return function(){return n({class:o`
          grid-row: 2;
          padding: 10px;
          margin-top: 20px;
          grid-column: 2 / 3;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `},s(r("Examples")),ge(e)(),Ce(e)(),we(e)(),ke(e)(),Ee(e)(),$e(e)(),Ie(e)(),De(e)(),Oe(e)(),Ne(e)(),Fe(e)(),_e(e)(),Ve(e)(),Ye(e)())}},Ke=({context:e})=>[{path:"",action:r=>({title:"BauUI Storybook",component:Ue(e)})}],Je=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Qe=({LayoutDefault:e,config:{base:r=""}})=>({router:t})=>{const{title:o,component:a,Layout:n=e}=t.resolve({pathname:location.pathname.replace(r,"")});document.getElementById("app").replaceChildren(n({component:a})),document.title=`${o}`};oe();const G={title:"Bau",base:"/bau"},L=de({config:G});re(L);U({routes:Ke({context:L}),onLocationChange:Qe({LayoutDefault:be(L),config:G}),notFoundRoute:Je(L)});
