(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const q=(e,o)=>({...e,paths:[...o,e.path]}),j=({paths:e=[],routes:o})=>o.flatMap(({children:r,...t})=>{const a=q(t,e);return r?[a,...j({paths:[...e,t.path],routes:r})]:a}),X=({paths:e})=>{const o=e.map(r=>r instanceof RegExp?r.source:r).map(r=>String.raw`\/${r}`).join("");return new RegExp(`^${o}$`)},Y=({routes:e=[],notFoundRoute:o})=>{const r=j({routes:e}).map(t=>({...t,regex:X(t)}));return{resolve:({pathname:t})=>{const a=r.find(({regex:n})=>n.test(t));return a?a.action({match:t.match(a.regex)}):o}}};function U({routes:e,notFoundRoute:o,onLocationChange:r}){const t=Y({routes:e,notFoundRoute:o});return window.addEventListener("popstate",a=>r({router:t})),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,n,s)=>{a.apply(n,s),r({router:t})}}),document.addEventListener("click",a=>{const{target:n}=a,s=n.getAttribute("href");n.tagName==="A"&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),a.preventDefault())}),r({router:t}),t}const K=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],J=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Q=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Z=()=>new Array(10).fill("").map((e,o)=>`--color-gray-${o*100}: hsl(0, 0%, ${100-8*o}%);`).join(`
`),ee=()=>new Array(10).fill("").map((e,o)=>`--color-emphasis-${o*100}: var(--color-gray-${o*100});`).join(`
`),te=([e,{h:o,s:r,l:t}])=>[`--color-${e}-h: ${o};`,`--color-${e}-s: ${r};`,`--color-${e}-l: ${t};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...J.map(([a,n])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),...Q.map(([a,n])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${n}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function re({createGlobalStyles:e},{colorPalette:o=K}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${o.map(([r,t])=>te([r,t])).join(`
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
`}function oe(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}const _=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>_(e)=="Object",z=Object.getPrototypeOf,R=e=>["Object","Array"].includes(_(e));function ne(){let e;const o=new Set,r=c=>c.__isState;let t=c=>r(c)?c._val:c,a=c=>r(c)?c.oldVal:c,n=c=>c.map(t);function s(c){e||(e=window.requestAnimationFrame(()=>{c(),e=void 0}))}const l=()=>s(()=>o.forEach(c=>c.bindings=c.bindings.filter(f=>{var v;return(v=f.dom)==null?void 0:v.isConnected})));let i=c=>{var f;for(let v of c.bindings){let{deps:w,dom:x,render:T,renderItem:k}=v;const $=n(w);if(k&&c.arrayOp)(f=d({...c.arrayOp,dom:x,renderDomItem:C=>p(k({deps:$})(C))})[c.arrayOp.method])==null||f.call(),l();else{let C=T({dom:x,oldValues:w.map(a),renderItem:k})(...$);C!==x&&(C!=null?x.replaceWith(v.dom=p(C)):(x.remove(),v.dom=void 0))}}c.arrayOp=null};const b=({state:c,data:f,parentProp:v=[]})=>({get(w,x,T){var k;if(x==="_isProxy")return!0;if(!((k=w[x])!=null&&k._isProxy)&&R(w[x]))w[x]=new Proxy(w[x],b({state:c,data:f,parentProp:[...v,x]}));else if(["splice","push","pop","shift","unshift"].includes(x)){const $=w[x];return(...C)=>{const I=$.apply(w,C);return c.arrayOp={method:x,args:C},i(c),I}}return Reflect.get(w,x,T)},set(w,x,T,k){const $=Reflect.set(w,x,T,k);return c.arrayOp={method:"setItem",args:{prop:x,value:T},newTarget:w,parentProp:[...v,x],data:f},i(c),$}}),u=(c,f)=>new Proxy(f,b({state:c,data:f})),d=({dom:c,parentProp:f,args:v,depsValues:w,renderDomItem:x,data:T})=>({assign:()=>c.replaceChildren(...v.map(x)),setItem:()=>{const k=f[0],$=c.children[k],C=T[k];$&&$.replaceWith(x(C))},push:()=>c.append(...v.map(x)),pop:()=>c.lastChild&&c.removeChild(c.lastChild),shift:()=>c.firstChild&&c.removeChild(c.firstChild),unshift:()=>{const k=x(v[0],w);c.firstChild?c.firstChild.before(k):c.appendChild(k)},splice:()=>{const[k,$,...C]=v;for(let I=Math.min(k+$-1,c.children.length-1);I>=k;I--)c.children[I].remove();if(C.length>0){const I=C.forEach(x);c.children[k]?c.children[k].after(I):c.append(...I)}}});let h=c=>({oldVal:c,bindings:[],arrayOp:null,__isState:!0,get _val(){const f=this;return f.valProxy??(f.valProxy=R(c)?u(f,c):c,f.valProxy)},set _val(f){this.valProxy=f},get val(){return this._val},set val(f){let v=this,w=v._val;R(f)?(v._val=u(v,f),v.arrayOp={method:"assign",args:f},i(v)):f!==w&&(v._val=f,i(v)),v.oldVal=w}}),p=c=>c.nodeType?c:new Text(c),m=(c,...f)=>{if(f.length==0)return c;const v=[];for(let w of f.flat(1/0))w!=null&&v.push(r(w)?A({deps:[w],render:()=>x=>x}):p(w));return c.append(...v),c};const g={},y=(c,f)=>c?Object.getOwnPropertyDescriptor(c,f)??y(z(c),f):void 0,S=(c,f,v)=>{var w;return g[c+","+f]??(g[c+","+f]=((w=y(v,f))==null?void 0:w.set)??0)},E=c=>new Proxy(function(v,...w){let[x,...T]=ae(w[0])?w:[{},...w],k=c?document.createElementNS(c,v):document.createElement(v);for(let[$,C]of Object.entries(x)){let I=S(v,$,z(k))?B=>k[$]=B:B=>k.setAttribute($,B);C==null||(r(C)?A({deps:[C],render:()=>B=>(I(B),k)}):C.renderProp?A({deps:C.deps,render:({})=>(...B)=>(I(C.renderProp({dom:k})(...B)),k)}):I(C))}return m(k,...T)},{get:(f,v)=>f.bind(void 0,v)});let A=({deps:c,render:f,renderItem:v})=>{const w=f({renderItem:v})(...n(c));if(w!=null){const x=p(w),T={deps:c,render:f,renderItem:v,dom:x};for(let k of c)r(k)&&(o.add(k),k.bindings.push(T));return x}};return{tags:E(),tagsNS:E,state:h,bind:A}}const se=e=>{let o=0,r=11;for(;o<e.length;)r=101*r+e.charCodeAt(o++)>>>0;return"bau"+r},ie=(e,o,r)=>{const t=document.createElement("style");t.id=o,t.appendChild(new Text(r)),e.appendChild(t)},le=(e,o)=>e.reduce((r,t,a)=>r+t+(o[a]??""),"");function ce({target:e=document.head}={}){const o=r=>(t,...a)=>{const n=le(t,a),s=se(n);return!document.getElementById(s)&&ie(e,s,r(s,n)),s};return{css:o((r,t)=>`.${r} { ${t} }`),keyframes:o((r,t)=>`@keyframes ${r} { ${t} }`),createGlobalStyles:o((r,t)=>t)}}function de(e={}){return{bau:ne(),...ce(),tr:o=>o,...e}}function P(...e){return e.filter(o=>o).join(" ")}function M(e,o={}){const{bau:r,css:t}=e;r.tags;const a={root:t`
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
    `};return function(s,...l){const{fullWidth:i,label:b,primary:u,accent:d,raised:h,disabled:p,ripple:m,href:g,icon:y,...S}=s;return(g?r.tags.a:r.tags.button)({...S,class:P(a.root,g?a.a:a.button,h?a.raised:a.flat,!h&&u&&a.flatPrimary,!h&&d&&a.flatAccent,h&&u&&a.raisedPrimary,h&&d&&a.raisedAccent,m&&a.rippledisabled&&a.disabled,p&&h&&a.raisedDisabled,i&&a.fullWidth,s.class),href:g,...!g&&{type:"button"}},l)}}function ue(e){const{tr:o,bau:r,css:t}=e,{i:a,header:n,h1:s,div:l,a:i,img:b}=r.tags,{svg:u,path:d}=r.tagsNS("http://www.w3.org/2000/svg"),h=r.state(!0),p=M(e),m=()=>a({class:t`
          color: var(--font-color-inverse);
        `},u({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},d({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),g=()=>l({class:t`
          display: flex;
          align-items: center;
        `},p({"aria-label":"drawer",onclick:()=>h.val=!h.val},m()),s(o("Bau Story Book"))),y=()=>i({class:t`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},b({alt:"GitHub",src:"./github-mark-white.svg",width:40,height:40}));return function(){return n({class:t`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `},g(),y())}}function pe({tr:e,bau:o,css:r}){const{footer:t,span:a,a:n,ul:s,li:l,p:i}=o.tags;return function(){return t({class:r`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.23.0"))}}const be=()=>[{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Avatar",id:"avatar"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"File Input",id:"file-input"},{name:"Form",id:"form"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"TreeView",id:"treeview"}];function me(e){const{tr:o,bau:r,css:t}=e,{ul:a,li:n,nav:s,a:l}=r.tags;return function(){return s({class:t`
          grid-area: sidebar;
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
        `},a(be().map(({name:b,id:u})=>n(l({href:`#${u}`},b)))))}}const he=e=>{const{bau:o,css:r}=e,{div:t}=o.tags,a=ue(e),n=me(e),s=pe(e);return function({component:i}){return t({class:r`
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
        `},a(),n(),i(),s())}},V={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},O=e=>`var(--color-${e}-darkest)`,fe=()=>Object.keys(V).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${O(e)};
    color: ${O(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${O(e)};
    }
  }`).join(`
`),ge=({css:e,createGlobalStyles:o})=>(o`
:root {
  --alert-border-left-width: 8px;
}
${fe()}
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
    `});function W(e,o={}){const{bau:r,css:t,createGlobalStyles:a,tr:n}=e,{div:s}=r.tags,l=ge({css:t,createGlobalStyles:a}),i=M(e),b=({onclick:u})=>i({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(d,...h){const{severity:p="info",onRemove:m,...g}=d;return s({...g,class:`${l.base} alert-${p}`,role:"alert"},s({class:"icon"},V[p]),s({class:"content"},...h),m&&b({onclick:m}))}}const ve=e=>{const{tr:o,bau:r}=e,{section:t,div:a,h3:n,h2:s,h4:l,p:i}=r.tags,b=W(e);return()=>t({id:"alert"},s(o("Alert Examples")),n("Info"),a(b({severity:"danger"},l("Something went wrong"),i("Error code ",404),i("Status ","Not Found")),b({severity:"warning",onRemove:u=>{u.preventDefault()}},"Alert warning"),b({severity:"info"},"My Message"),b({severity:"success"},l("Great Success"),i("Alert success message"))))};function ye(e,o={}){return function({Component:t,parent:a,animationHide:n,animationShow:s}){const l=t();l.style.animation=s;const i=()=>{l.removeEventListener("animationend",i),l.style.animation=""};return l.addEventListener("animationend",i),new MutationObserver((b,u)=>{b.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(h=>{if(h===l){const p=l.cloneNode(!0);return p.style.animation=n,d.previousSibling?d.previousSibling.after(p):d.nextSibling?d.nextSibling.before(p):d.target&&d.target.appendChild(p),p.addEventListener("animationend",()=>p.parentNode.removeChild(p)),u.disconnect(),!0}}))}).observe(a,{childList:!0,subtree:!0}),l}}const we=({keyframes:e})=>({hideRight:e`
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
 `}),xe=e=>{const{tr:o,bau:r,keyframes:t}=e,{section:a,div:n,h1:s}=r.tags,l=ye(),i=M(e),b=we({keyframes:t});return function(){const u=r.state(!0),d=a({id:"animate"});return d.appendChild(n(s("Test Animate"),n(i({onclick:()=>{u.val=!u.val}},r.bind({deps:[u],render:()=>h=>h?"Hide":"Show"}))),n(r.bind({deps:[u],render:()=>h=>h?l({parent:d,Component:()=>n("Ciao"),animationHide:`${b.hideRight} 0.5s`,animationShow:`${b.showRight} 0.5s`}):""})))),d}};function ke(e,o={}){const{bau:r,css:t}=e,{cssOverride:a}=o,{span:n,img:s}=r.tags,l=r.state(!0),i=r.state(!1),b=()=>l.val=!1,u=d=>{l.val=!1,i.val=!0};return function({width:h=60,height:p=60,...m},...g){return n({class:P(a)},r.bind({deps:[l],render:()=>y=>y?"Loading...":""}),r.bind({deps:[i],render:()=>y=>y?"Error":""}),s({width:h,height:p,onload:b,onerror:u,...m}))}}const Se=e=>{const{tr:o,bau:r,css:t}=e,{section:a,h2:n}=r.tags,s=ke(e,{cssOverride:t`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>a({id:"avatar"},n(o("Avatar")),s({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),s({src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}))},Ce=(e,{limit:o=10,deleteAfterDuration:r=5e3}={})=>{const{bau:t,css:a,keyframes:n}=e,{div:s}=t.tags,l=t.state([]),i={inserting:n`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:n`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},b={stack:a`
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
      animation: ${i.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${i.removing} var(--transition-slow) ease-out;
    `},u=p=>s({class:b.item,onclick:()=>d.remove(p)},p.component()),d=(p,...m)=>s({class:b.stack},t.bind({deps:[l],render:({renderItem:g})=>y=>s(y.map(g())),renderItem:()=>u}));d.add=({component:p})=>{const m={id:Math.random().toString(10).split(".")[1],component:p,status:"inserting"};l.val.length>=o&&d.remove({id:l.val[0].id}),l.val.push(m),setTimeout(()=>d.remove(m),r)};const h=({id:p,status:m})=>{const g=l.val.findIndex(y=>y.id===p);g!=-1&&(l.val[g].status=m)};return d.remove=({id:p})=>{h({id:p,status:"removing"});const m=l.val.findIndex(g=>g.id===p);m!=-1&&l.val.splice(m,1)},d},Ee=e=>{const{tr:o,bau:r}=e,{section:t,h1:a}=r.tags,n=Ce(e),s=M(e),l=W(e);return function(){return t({id:"alert-stack"},n(),a("Alert stack"),s({raised:!0,onclick:b=>{n.add({component:()=>l({severity:"success"},o("Infrastructure Created"))})}},"success alert"))}},$e=e=>{const{tr:o,bau:r,css:t}=e,{section:a,p:n,h2:s,h3:l}=r.tags,i=M(e);return()=>a({id:"button",class:t`
          & button {
            margin: 0.5rem;
          }
        `},s(o("Button Examples")),l("Flat"),n(i({},"Do stuff"),i({primary:!0},o("FLAT PRIMARY")),i({accent:!0},o("FLAT ACCENT")),i({ripple:!0},o("FLAT ACCENT")),i({disabled:!0},o("DISABLED"))),l("Primary"),n(i({primary:!0},o("primary")),i({primary:!0,raised:!0},o("primary Raised")),i({ripple:!0,raised:!0},o("primary ripple")),i({disabled:!0,raised:!0},o("primary DISABLED"))),l("Raised"),n(i({raised:!0},o("Raised FLAT")),i({primary:!0,raised:!0},o("Raised PRIMARY")),i({accent:!0,raised:!0},o("Raised ACCENT")),i({ripple:!0,raised:!0},o("Raised RIPPLE")),i({disabled:!0,raised:!0,label:o("Raised DISABLED")},o("Raised DISABLED"))),l("Full With"),n(i({fullWidth:!0,label:o("FLAT"),raised:!0},o("raised FLAT")),i({fullWidth:!0,primary:!0},o("Raised PRIMARY"))),l("Icon"),n(i({"aria-label":"Close"},"✖"),i({primary:!0},"✖"),i({raised:!0},"✖")))};function Ae(e,o={}){const{bau:r,css:t}=e,{input:a}=r.tags,n={base:t`
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
    `};return function(l,...i){return a({class:n.base,type:"checkbox",required:"required",...l})}}const Te=e=>{const{tr:o,bau:r,css:t}=e,{section:a,div:n,label:s,h2:l,form:i}=r.tags,b=Ae(e),u=r.state(!1),d=r.state(!1),h=m=>g=>{m.val=!!g.target.checked},p=(...m)=>n({class:t`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...m);return()=>a({id:"checkbox"},i(l(o("Checkbox Examples")),p(b({id:"myCheckbox",name:"myCheckbox",checked:u,onchange:h(u)}),s({for:"myCheckbox"},"My Checkbox")),p(b({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:d,onchange:h(d)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function Ie(e){const{bau:o,css:r}=e,{div:t}=o.tags,a=r`
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
  `;return function({openState:s},...l){return t({class:a},t({class:{deps:[s],renderProp:()=>i=>P("overlay",i&&"overlay-open")}}),t({class:{deps:[s],renderProp:()=>i=>P("content",i&&"content-open")}},...l))}}const Pe=e=>{const{tr:o,bau:r}=e,{section:t,div:a,h3:n,h2:s}=r.tags,l=r.state(!1),i=Ie(e),b=M(e);return()=>t({id:"drawer"},s(o("Drawer")),b({raised:!0,onclick:()=>{l.val=!l.val}},"OPEN DRAWER"),i({openState:l},"Drawer Content"))};function Me(e,o={}){const{bau:r,css:t}=e,{div:a,span:n,label:s,input:l}=r.tags,i={base:t`
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
    `};return function(u,...d){const{Component:h,disabled:p,...m}=u;return a({class:P(i.base,p&&i.disabled)},s(h({disabled:p}),l({type:"file",disabled:p,...m})),n({class:"filename-display"}))}}const N=window._SVG_SPRITE_IDS_=window._SVG_SPRITE_IDS_||[],D=document.createElementNS("http://www.w3.org/2000/svg","svg");D.style.position="absolute";D.style.width="0";D.style.height="0";function F(){document.body.insertBefore(D,document.body.firstChild)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",F):F();function Be(e,o){(N.indexOf(o)>-1||document.getElementById(o))&&console.warn(`Icon #${o} was duplicately registered. It must be globally unique.`),N.push(o),D.insertAdjacentHTML("beforeend",e)}Be('<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.156 294.156" id="icon-uploadIcon-13ee25"><path d="M227.002 108.256c-2.755-41.751-37.6-74.878-80.036-74.878-42.447 0-77.298 33.141-80.038 74.907C28.978 113.059 0 145.39 0 184.184c0 42.234 34.36 76.595 76.595 76.595h116.483a6 6 0 0 0 0-12H76.595C40.977 248.778 12 219.801 12 184.184c0-34.275 26.833-62.568 61.087-64.411a6 6 0 0 0 5.668-6.346c.09-37.536 30.654-68.049 68.211-68.049 37.563 0 68.132 30.518 68.211 68.063a6 6 0 0 0 5.687 6.321c34.37 1.741 61.292 30.038 61.292 64.421 0 19.526-8.698 37.801-23.864 50.138a5.999 5.999 0 0 0-.868 8.44 5.999 5.999 0 0 0 8.44.868c17.98-14.626 28.292-36.293 28.292-59.447 0-38.913-29.076-71.256-67.154-75.926z" /><path d="M140.966 141.078v76.511a6 6 0 0 0 12 0v-76.511a6 6 0 0 0-12 0z" /><path d="M181.283 152.204a6 6 0 0 0 4.243-10.242l-34.317-34.317a6 6 0 0 0-8.485 0l-34.317 34.317a6 6 0 0 0 8.485 8.485l30.074-30.074 30.074 30.074a5.986 5.986 0 0 0 4.243 1.757z" /></symbol>',"icon-uploadIcon-13ee25");const De="icon-uploadIcon-13ee25",Le=e=>{const{tr:o,bau:r,css:t}=e,{svg:a,use:n}=r.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:b,span:u}=r.tags,d=r.state("No file selected"),h=Me(e),p=g=>{const y=g.target.files[0];y?d.val=y.name:d.val="No file selected"},m=({disabled:g})=>l({class:P(t`
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
          `,g&&t`
              color: var(--color-gray-500);
              svg {
                path {
                  fill: var(--color-gray-500);
                }
              }
            `)},a(n({href:`#${De}`})),u(o("Choose a file to upload")));return()=>s({id:"fileInput"},b(o("FileInput Examples")),i("File Input"),h({Component:m,name:"file",accept:"text/*",onchange:p}),l("File selected: ",d),i("File Input disabled"),h({Component:m,name:"file",accept:"text/*",disabled:!0,onchange:p}))},Re=({css:e,createGlobalStyles:o})=>(o`
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
    `});function Oe(e,o={}){const{bau:r,css:t,createGlobalStyles:a}=e,{div:n,input:s,label:l}=r.tags,i=Re({css:t,createGlobalStyles:a});return function(u){const{name:d,id:h,disabled:p,label:m="",error:g="",...y}=u;return n({class:P(i.base,p&&i.disabled,g&&i.error,u.class)},s({id:h,name:d,type:"text",required:!0,disabled:p,...y}),l({htmlFor:h},m),n({"data-input-error":d},g))}}const ze=e=>{const{tr:o,bau:r}=e,{section:t,div:a,h3:n,h2:s}=r.tags,l=Oe(e);return()=>t({id:"input"},s(o("Input Examples")),n("Standard"),a(l({id:"my-Input",label:"Label"})),n("Disabled"),a(l({id:"my-input-disabled",label:"my Input disabled",disabled:!0}),l({id:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),n("Input with error"),a(l({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function Ne(e,o={}){const{bau:r,css:t}=e,{dialog:a}=r.tags,n=t`
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
  `;return function({open:l},...i){return a({class:n},...i)}}const Fe=e=>{const{tr:o,bau:r}=e,{section:t,div:a,main:n,h3:s,h2:l,header:i,footer:b,p:u}=r.tags,d=M(e),h=Ne(e),p=()=>n(Array(10).fill("").map((g,y)=>u(y+1,". "))),m=h({id:"my-dialog"},i("Header"),p(),b(d({onclick:()=>{m.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{m.close()}},"OK")));return()=>t({id:"modal"},l(o("Modal Examples")),d({raised:!0,onclick:()=>{m.showModal()}},"OPEN MODAL"),m)};function He(e,o={}){const{bau:r,css:t}=e,{svg:a,animate:n,animateTransform:s,rect:l}=r.tagsNS("http://www.w3.org/2000/svg");return function({size:b=36,color:u="primary",visibility:d=!0}={}){return a({class:t`
          visibility: ${d?"visible":"hidden"};
          color: var(--color-${u});
        `,version:"1.1",id:"L6",x:"0px",y:"0px",width:b,height:b,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},n({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const je=e=>{const{tr:o,bau:r}=e,{section:t,h2:a,div:n}=r.tags,s=He(e);return()=>t({id:"spinner"},a(o("Spinner Examples")),n(s({size:"30"}),s(),s({size:"40",color:"secondary"}),s({size:"50",color:"info"}),s({size:"60",color:"danger"})))};function _e(e,o={}){const{bau:r,css:t}=e,{input:a}=r.tags,n=t`
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
  `;return function({id:l,...i},...b){return a({class:n,type:"checkbox",required:"required",id:l,...i})}}const Ve=e=>{const{tr:o,bau:r,css:t}=e,{section:a,form:n,label:s,div:l,h2:i}=r.tags,b=_e(e);return()=>a({id:"switch"},i(o("Switch Examples")),n(l({class:t`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),b({id:"my-switch"}))))};function H(e,{tabDefs:o}){const{bau:r,css:t}=e,{div:a,ul:n,li:s}=r.tags,l=r.state(o),i=r.state(o[0]),b=d=>l.val.find(h=>h.name==d),u={base:t`
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
    `};return function(h,...p){const m=y=>{const{Header:S,disabled:E,name:A}=y;return s({class:{deps:[i],renderProp:()=>c=>P(c.name==A&&"active",E&&"disabled")},onclick:c=>c.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:A},bubbles:!0}))},S(y))},g=a({class:P(u.base,h.class)},r.bind({deps:[l],render:({renderItem:y})=>S=>n(S.map(y())),renderItem:()=>m}),r.bind({deps:[i],render:()=>({Content:y})=>y?y({}):""}));return g.addEventListener("tab.select",y=>{var A,c;const{tabName:S}=y.detail,E=b(S);E&&((A=i.val.exit)==null||A.call(),i.val=E,(c=E.enter)==null||c.call())},!1),g.addEventListener("tab.add",y=>{var E;const{tab:S}=y.detail;(E=S.enter)==null||E.call(),l.val.push(S)},!1),g.addEventListener("tab.remove",y=>{var E;const S=l.val.findIndex(A=>A.name==y.detail.tabName);S>0&&((E=l.val[S].exit)==null||E.call(),l.val.splice(S,1))},!1),g}}const We=e=>{const{tr:o,bau:r,css:t}=e,{section:a,div:n,h3:s,h2:l,p:i,i:b}=r.tags,u=(...S)=>n({class:t`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),d=()=>({name:"New Tab",Header:({name:S})=>n(S),Content:()=>n("My Paragraph")}),h=M(e),m=H(e,{tabDefs:[{name:"Tab1",Header:({})=>n("TAB 1"),Content:({})=>n(i("My Tab 1 Content"))},{name:"Tab2",Header:({tab:S})=>n("TAB 2"),Content:({})=>n(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:({})=>n("Tab Disabled")}]}),y=H(e,{tabDefs:[{name:"Tab1",Header:({store:S})=>n(b({class:t`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:({store:S})=>n({class:t`
              > button {
                margin: 10px;
              }
            `},h({raised:!0,onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:d()},bubbles:!0}))},"Add a new Tab"),h({accent:!0,onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"Tab2"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:({tab:S})=>n("TAB 2"),Content:({store:S})=>n(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:({store:S})=>n("Tab Disabled")}]});return()=>a({id:"tabs"},l(o("Tabs")),s("Basic Tabs"),u(m({})),s("Full Witdth"),u(m({class:t`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(m({class:t`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(m({class:t`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(m({class:t`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(m({class:t`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(y({})))};function Ge(e){e.style.height="0px"}function qe(e){e.style.height=e.scrollHeight+"px"}const Xe=({css:e,createGlobalStyles:o})=>(o`
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
    `});function Ye(e,{renderMenuItem:o}){const{bau:r,css:t,createGlobalStyles:a}=e,{ul:n,li:s,nav:l}=r.tags,i=Xe({css:t,createGlobalStyles:a}),b=({depth:u=0})=>d=>{const{children:h}=d,p=r.state(!0);return s({class:{deps:[p],renderProp:()=>m=>P(h?m?i.collapsable:i.collapsed:"")},onclick:m=>{p.val=!p.val,m.preventDefault()}},o(d),h&&n({"aria-expanded":{deps:[p],renderProp:({dom:m})=>g=>(g?Ge(m):qe(m),!g)}},h.map(b({depth:u+1}))))};return function(d){return l({class:i.nav},n(d.children.map(b({}))))}}const Ue=e=>{const{tr:o,bau:r}=e,{section:t,div:a,a:n,h2:s}=r.tags,l={name:"Root Menu",children:[{name:"Menu 1",href:"#menu",children:[{name:"Sub Menu 1",href:"#menusub2"},{name:"Sub Menu 2",href:"#menusub1"}]},{name:"Menu 2",href:"#menu2",children:[{name:"Sub Menu 21",href:"#menusub21"}]}]},b=Ye(e,{renderMenuItem:({name:u,href:d})=>a(n({href:d,onclick:h=>{}},u))});return()=>t({id:"treeview"},s(o("TreeView")),b(l))},Ke=e=>{const{tr:o,bau:r,css:t}=e,{div:a,main:n,h1:s}=r.tags;return function(){return n({class:t`
          grid-area: main;
          padding: 10px;
          margin-top: 20px;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `},s(o("Examples")),ve(e)(),Ee(e)(),xe(e)(),Se(e)(),$e(e)(),Te(e)(),Pe(e)(),Le(e)(),ze(e)(),Fe(e)(),je(e)(),Ve(e)(),We(e)(),Ue(e)())}},Je=({context:e})=>[{path:"",action:o=>({title:"BauUI Storybook",component:Ke(e)})}],Qe=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Ze=({LayoutDefault:e,config:{base:o=""}})=>({router:r})=>{const{title:t,component:a,Layout:n=e}=r.resolve({pathname:location.pathname.replace(o,"")});document.getElementById("app").replaceChildren(n({component:a})),document.title=`${t}`};oe();const G={title:"Bau",base:"/bau"},L=de({config:G}),et=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]];re(L,{colorPalette:et});U({routes:Je({context:L}),onLocationChange:Ze({LayoutDefault:he(L),config:G}),notFoundRoute:Qe(L)});
