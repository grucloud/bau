(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const G=(e,o)=>({...e,paths:[...o,e.path]}),z=({paths:e=[],routes:o})=>o.flatMap(({children:t,...r})=>{const n=G(r,e);return t?[n,...z({paths:[...e,r.path],routes:t})]:n}),W=({paths:e})=>{const o=e.map(t=>t instanceof RegExp?t.source:t).map(t=>String.raw`\/${t}`).join("");return new RegExp(`^${o}$`)},X=({routes:e=[],notFoundRoute:o})=>{const t=z({routes:e}).map(r=>({...r,regex:W(r)}));return{resolve:({pathname:r})=>{const n=t.find(({regex:a})=>a.test(r));return n?n.action({match:r.match(n.regex)}):o}}};function q({routes:e,notFoundRoute:o,onLocationChange:t}){const r=X({routes:e,notFoundRoute:o});return window.addEventListener("popstate",n=>t({router:r})),window.history.pushState=new Proxy(window.history.pushState,{apply:(n,a,s)=>{n.apply(a,s),t({router:r})}}),document.addEventListener("click",n=>{const{target:a}=n,s=a.getAttribute("href");a.tagName==="A"&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),n.preventDefault())}),t({router:r}),r}const Y=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],K=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],U=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],J=()=>new Array(10).fill("").map((e,o)=>`--color-gray-${o*100}: hsl(0, 0%, ${100-8*o}%);`).join(`
`),Q=()=>new Array(10).fill("").map((e,o)=>`--color-emphasis-${o*100}: var(--color-gray-${o*100});`).join(`
`),Z=([e,{h:o,s:t,l:r}])=>[`--color-${e}-h: ${o};`,`--color-${e}-s: ${t};`,`--color-${e}-l: ${r};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...K.map(([n,a])=>`--color-${e}-${n}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...U.map(([n,a])=>`--color-${e}-${n}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ee({createGlobalStyles:e},{colorPalette:o=Y}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${o.map(([t,r])=>Z([t,r])).join(`
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
`}function te(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}const F=e=>Object.prototype.toString.call(e??0).slice(8,-1),re=e=>F(e)=="Object",R=Object.getPrototypeOf,L=e=>["Object","Array"].includes(F(e));function oe(){let e;const o=new Set,t=c=>c.__isState;let r=c=>t(c)?c._val:c,n=c=>t(c)?c.oldVal:c,a=c=>c.map(r);function s(c){e||(e=window.requestAnimationFrame(()=>{c(),e=void 0}))}const i=()=>s(()=>o.forEach(c=>c.bindings=c.bindings.filter(f=>{var g;return(g=f.dom)==null?void 0:g.isConnected})));let l=c=>{var f;for(let g of c.bindings){let{deps:y,dom:v,render:I,renderItem:w}=g;const A=a(y);if(w&&c.arrayOp)(f=p({...c.arrayOp,dom:v,renderDomItem:S=>b(w({deps:A,dom:v})(S))})[c.arrayOp.method])==null||f.call(),i();else{let S=I({dom:v,oldValues:y.map(n),renderItem:w&&w({deps:A,dom:v})})(...A);S!==v&&(S!=null?v.replaceWith(g.dom=b(S)):(v.remove(),g.dom=void 0))}}c.arrayOp=null};const d=({state:c,data:f,parentProp:g=[]})=>({get(y,v,I){var w;if(v==="_isProxy")return!0;if(!((w=y[v])!=null&&w._isProxy)&&L(y[v]))y[v]=new Proxy(y[v],d({state:c,data:f,parentProp:[...g,v]}));else if(["splice","push","pop","shift","unshift"].includes(v)){const A=y[v];return(...S)=>{const P=A.apply(y,S);return c.arrayOp={method:v,args:S},l(c),P}}return Reflect.get(y,v,I)},set(y,v,I,w){const A=Reflect.set(y,v,I,w);return c.arrayOp={method:"setItem",args:{prop:v,value:I},newTarget:y,parentProp:[...g,v],data:f},l(c),A}}),u=(c,f)=>new Proxy(f,d({state:c,data:f})),p=({dom:c,parentProp:f,args:g,depsValues:y,renderDomItem:v,data:I})=>({assign:()=>c.replaceChildren(...g.map(v)),setItem:()=>{const w=f[0],A=c.children[w],S=I[w];A&&A.replaceWith(v(S))},push:()=>c.append(...g.map(v)),pop:()=>c.lastChild&&c.removeChild(c.lastChild),shift:()=>c.firstChild&&c.removeChild(c.firstChild),unshift:()=>{const w=v(g[0],y);c.firstChild?c.firstChild.before(w):c.appendChild(w)},splice:()=>{const[w,A,...S]=g;for(let P=Math.min(w+A-1,c.children.length-1);P>=w;P--)c.children[P].remove();if(S.length>0){const P=S.forEach(v);c.children[w]?c.children[w].after(P):c.append(...P)}}});let m=c=>({oldVal:c,bindings:[],arrayOp:null,__isState:!0,get _val(){const f=this;return f.valProxy??(f.valProxy=L(c)?u(f,c):c,f.valProxy)},set _val(f){this.valProxy=f},get val(){return this._val},set val(f){let g=this,y=g._val;L(f)?(g._val=u(g,f),g.arrayOp={method:"assign",args:f},l(g)):f!==y&&(g._val=f,l(g)),g.oldVal=y}}),b=c=>c.nodeType?c:new Text(c),h=(c,...f)=>{if(f.length==0)return c;const g=[];for(let y of f.flat(1/0))y!=null&&g.push(t(y)?T({deps:[y],render:()=>v=>v}):b(y));return c.append(...g),c};const x={},k=(c,f)=>c?Object.getOwnPropertyDescriptor(c,f)??k(R(c),f):void 0,C=(c,f,g)=>{var y;return x[c+","+f]??(x[c+","+f]=((y=k(g,f))==null?void 0:y.set)??0)},$=c=>new Proxy(function(g,...y){let[v,...I]=re(y[0])?y:[{},...y],w=c?document.createElementNS(c,g):document.createElement(g);for(let[A,S]of Object.entries(v)){let P=C(g,A,R(w))?B=>w[A]=B:B=>w.setAttribute(A,B);S==null||(t(S)?T({deps:[S],render:()=>B=>(P(B),w)}):S.renderProp?T({deps:S.deps,render:({})=>(...B)=>(P(S.renderProp({dom:w})(...B)),w)}):P(S))}return h(w,...I)},{get:(f,g)=>f.bind(void 0,g)});let T=({deps:c,render:f,renderItem:g})=>{const y=f({deps:c,renderItem:g&&g({deps:c})})(...a(c));if(y!=null){const v=b(y),I={deps:c,render:f,renderItem:g,dom:v};for(let w of c)t(w)&&(o.add(w),w.bindings.push(I));return v}};return{tags:$(),tagsNS:$,state:m,bind:T}}const ae=e=>{let o=0,t=11;for(;o<e.length;)t=101*t+e.charCodeAt(o++)>>>0;return"bau"+t},ne=(e,o,t)=>{const r=document.createElement("style");r.id=o,r.appendChild(new Text(t)),e.appendChild(r)},se=(e,o)=>e.reduce((t,r,n)=>t+r+(o[n]??""),"");function ie({target:e=document.head}={}){const o=t=>(r,...n)=>{const a=se(r,n),s=ae(a);return!document.getElementById(s)&&ne(e,s,t(s,a)),s};return{css:o((t,r)=>`.${t} { ${r} }`),keyframes:o((t,r)=>`@keyframes ${t} { ${r} }`),createGlobalStyles:o((t,r)=>r)}}function le(e={}){return{bau:oe(),...ie(),tr:o=>o,...e}}function E(...e){return e.filter(o=>o).join(" ")}function M(e){const{bau:o,css:t}=e,r={root:t`
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
    `};return function(a,...s){const{primary:i,accent:l,raised:d,disabled:u,ripple:p,href:m,icon:b,...h}=a;return(m?o.tags.a:o.tags.button)({...h,class:E(r.root,m?r.a:r.button,d?r.raised:r.flat,!d&&i&&r.flatPrimary,!d&&l&&r.flatAccent,d&&i&&r.raisedPrimary,d&&l&&r.raisedAccent,p&&r.rippledisabled&&r.disabled,u&&d&&r.raisedDisabled,a.class),href:m,...!m&&{type:"button"}},s)}}function ce(e){const{tr:o,bau:t,css:r}=e,{i:n,header:a,h1:s,div:i,a:l,img:d}=t.tags,{svg:u,path:p}=t.tagsNS("http://www.w3.org/2000/svg"),m=t.state(!0),b=M(e),h=()=>n({class:r`
          color: var(--font-color-inverse);
        `},u({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),x=()=>i({class:r`
          display: flex;
          align-items: center;
        `},b({"aria-label":"drawer",onclick:()=>m.val=!m.val},h()),s(o("Bau Story Book"))),k=()=>l({class:r`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:"./github-mark-white.svg",width:40,height:40}));return function(){return a({class:r`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `},x(),k())}}function de({tr:e,bau:o,css:t}){const{footer:r,span:n,a,ul:s,li:i,p:l}=o.tags;return function(){return r({class:t`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},n("version: 0.24.0"))}}const ue=()=>[{name:"Alert",id:"alert"},{name:"Alert Stack",id:"alert-stack"},{name:"Animate",id:"animate"},{name:"Avatar",id:"avatar"},{name:"Button",id:"button"},{name:"Checkbox",id:"checkbox"},{name:"Drawer",id:"drawer"},{name:"File Input",id:"fileInput"},{name:"Input",id:"input"},{name:"Modal",id:"modal"},{name:"Spinner",id:"spinner"},{name:"Switch",id:"switch"},{name:"Tabs",id:"tabs"},{name:"TreeView",id:"treeview"}];function j(e){const{tr:o,bau:t,css:r}=e,{ul:n,li:a,nav:s,a:i}=t.tags;return function(){return s({class:r`
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
        `},n(ue().map(({name:d,id:u})=>a(i({href:`#${u}`},d)))))}}const pe=e=>{const{bau:o,css:t}=e,{div:r}=o.tags,n=ce(e),a=j(e),s=de(e);return function({component:l}){return r({class:t`
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
        `},n(),a(),l(),s())}},H={danger:"⚠",warning:"⚠",success:"✔",info:"ℹ"},O=e=>`var(--color-${e}-darkest)`,be=()=>Object.keys(H).map(e=>`.alert-${e} {
    border-left: var(--alert-border-left-width) solid ${O(e)};
    color: ${O(e)};
    background-color: var(--background-color);
    & .button-close {
      color: ${O(e)};
    }
  }`).join(`
`),me=({css:e,createGlobalStyles:o})=>(o`
:root {
  --alert-border-left-width: 8px;
}
${be()}
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
    `});function _(e){const{bau:o,css:t,createGlobalStyles:r,tr:n}=e,{div:a}=o.tags,s=me({css:t,createGlobalStyles:r}),i=M(e),l=({onclick:d})=>i({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(u,...p){const{severity:m="info",onRemove:b,...h}=u;return a({...h,class:E(s.base,`alert-${m}`,u.class),role:"alert"},a({class:"icon"},H[m]),a({class:"content"},...p),b&&l({onclick:b}))}}const he=e=>{const{tr:o,bau:t}=e,{section:r,div:n,h3:a,h2:s,h4:i,p:l}=t.tags,d=_(e);return()=>r({id:"alert"},s(o("Alert Examples")),a("Info"),n(d({severity:"danger"},i("Something went wrong"),l("Error code ",404),l("Status ","Not Found")),d({severity:"warning",onRemove:u=>{u.preventDefault()}},"Alert warning"),d({severity:"info"},"My Message"),d({severity:"success"},i("Great Success"),l("Alert success message"))))};function fe(e,o={}){return function({parent:r,animationHide:n,animationShow:a},s){const i=s;i.style.animation=a;const l=()=>{i.removeEventListener("animationend",l),i.style.animation=""};return i.addEventListener("animationend",l),new MutationObserver((d,u)=>{d.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(m=>{if(m===i){const b=i.cloneNode(!0);return b.style.animation=n,p.previousSibling?p.previousSibling.after(b):p.nextSibling?p.nextSibling.before(b):p.target&&p.target.appendChild(b),b.addEventListener("animationend",()=>b.parentNode.removeChild(b)),u.disconnect(),!0}}))}).observe(r,{childList:!0,subtree:!0}),i}}const ge=({keyframes:e})=>({hideRight:e`
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
 `}),ve=e=>{const{bau:o}=e,{section:t,div:r,h1:n}=o.tags,a=fe(),s=M(e),i=ge(e);return function(){const l=o.state(!0),d=t({id:"animate"});return d.appendChild(r(n("Test Animate"),r(s({onclick:()=>{l.val=!l.val}},o.bind({deps:[l],render:()=>u=>u?"Hide":"Show"}))),r(o.bind({deps:[l],render:()=>u=>u?a({parent:d,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},r("Ciao")):""})))),d}};function ye(e,o={}){const{bau:t}=e,{span:r,img:n}=t.tags,a=t.state(!0),s=t.state(!1),i=()=>a.val=!1,l=d=>{a.val=!1,s.val=!0};return function({width:u=60,height:p=60,...m},...b){return r({class:E(o.cssOverride,m.class)},t.bind({deps:[a],render:()=>h=>h?"Loading...":""}),t.bind({deps:[s],render:()=>h=>h?"Error":""}),n({width:u,height:p,onload:i,onerror:l,...m}))}}const we=e=>{const{tr:o,bau:t,css:r}=e,{section:n,h2:a}=t.tags,s=r`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=ye(e);return()=>n({id:"avatar"},a(o("Avatar")),i({class:s,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),i({class:s,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),i({src:"./grucloud.svg",alt:"GruCloud"}))},xe=(e,{limit:o=10,deleteAfterDuration:t=5e3}={})=>{const{bau:r,css:n,keyframes:a}=e,{div:s}=r.tags,i=r.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:n`
      min-width: 300px;
      max-width: 600px;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:n`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:n`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},u=b=>s({class:d.item,onclick:()=>p.remove(b)},b.component()),p=(b={})=>s({class:E(d.stack,b.class)},r.bind({deps:[i],render:({renderItem:h})=>x=>s(x.map(h)),renderItem:()=>u}));p.add=({component:b})=>{const h={id:Math.random().toString(10).split(".")[1],component:b,status:"inserting"};i.val.length>=o&&p.remove({id:i.val[0].id}),i.val.push(h),setTimeout(()=>p.remove(h),t)};const m=({id:b,status:h})=>{const x=i.val.findIndex(k=>k.id===b);x!=-1&&(i.val[x].status=h)};return p.remove=({id:b})=>{m({id:b,status:"removing"});const h=i.val.findIndex(x=>x.id===b);h!=-1&&i.val.splice(h,1)},p},ke=e=>{const{tr:o,bau:t}=e,{section:r,h1:n}=t.tags,a=xe(e,{deleteAfterDuration:2e4}),s=M(e),i=_(e);return function(){return r({id:"alert-stack"},a(),n("Alert stack"),s({raised:!0,onclick:()=>{a.add({component:()=>i({severity:"success"},o("Infrastructure Created"))})}},"success alert"),s({raised:!0,onclick:()=>{a.add({component:()=>i({severity:"danger"},o("Error creating infrastructure"))})}},"danger alert"))}},Ce=e=>{const{tr:o,bau:t,css:r}=e,{section:n,p:a,h2:s,h3:i}=t.tags,l=M(e);return()=>n({id:"button",class:r`
          & button {
            margin: 0.5rem;
          }
        `},s(o("Button Examples")),i("Flat"),a(l({},"Do stuff"),l({primary:!0},o("FLAT PRIMARY")),l({accent:!0},o("FLAT ACCENT")),l({ripple:!0},o("FLAT ACCENT")),l({disabled:!0},o("DISABLED"))),i("Primary"),a(l({primary:!0},o("primary")),l({primary:!0,raised:!0},o("primary Raised")),l({ripple:!0,raised:!0},o("primary ripple")),l({disabled:!0,raised:!0},o("primary DISABLED"))),i("Raised"),a(l({raised:!0},o("Raised FLAT")),l({primary:!0,raised:!0},o("Raised PRIMARY")),l({accent:!0,raised:!0},o("Raised ACCENT")),l({ripple:!0,raised:!0},o("Raised RIPPLE")),l({disabled:!0,raised:!0},o("Raised DISABLED"))),i("Full With"),a(l({class:r`
              width: 100%;
            `,raised:!0},o("raised FLAT")),l({class:r`
              width: 100%;
            `,primary:!0},o("Raised PRIMARY"))),i("Icon"),a(l({"aria-label":"Close"},"✖"),l({primary:!0},"✖"),l({raised:!0},"✖"),l({},"TODO")))};function Se(e,o={}){const{bau:t,css:r}=e,{input:n}=t.tags,a={base:r`
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
    `};return function(i,...l){return n({class:E(a.base,i.class),type:"checkbox",required:"required",...i})}}const Ee=e=>{const{tr:o,bau:t,css:r}=e,{section:n,div:a,label:s,h2:i,form:l}=t.tags,d=Se(e),u=t.state(!1),p=t.state(!1),m=h=>x=>{h.val=!!x.target.checked},b=(...h)=>a({class:r`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...h);return()=>n({id:"checkbox"},l(i(o("Checkbox Examples")),b(d({id:"myCheckbox",name:"myCheckbox",checked:u,onchange:m(u)}),s({for:"myCheckbox"},"My Checkbox")),b(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:p,onchange:m(p)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox"))))};function Ae(e){const{bau:o,css:t}=e,{div:r}=o.tags,n=t`
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
  `;return function({openState:s,...i},...l){return r({class:E(n,i.class)},r({class:{deps:[s],renderProp:()=>d=>E("overlay",d&&"overlay-open")},onclick:()=>{s.val=!1}}),r({class:{deps:[s],renderProp:()=>d=>E("content",d&&"content-open")}},...l))}}const $e=e=>{const{tr:o,bau:t}=e,{section:r,h2:n}=t.tags,a=t.state(!1),s=Ae(e),i=M(e),l=j(e);return()=>r({id:"drawer"},n(o("Drawer")),i({raised:!0,onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},l()))};function Te(e,o={}){const{bau:t,css:r}=e,{div:n,span:a,label:s,input:i}=t.tags,l={base:r`
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
    `};return function(u,...p){const{Component:m,disabled:b,...h}=u;return n({class:E(l.base,b&&l.disabled,u.class)},s(m({disabled:b}),i({type:"file",disabled:b,...h})),a({class:"filename-display"}))}}const Ie=e=>{const{tr:o,bau:t,css:r}=e,{svg:n,use:a}=t.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:d,span:u}=t.tags,p=t.state("No file selected"),m=Te(e),b=x=>{const k=x.target.files[0];k?p.val=k.name:p.val="No file selected"},h=({disabled:x})=>i({class:E(r`
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
          `,x&&r`
              color: var(--color-gray-500);
              svg {
                path {
                  fill: var(--color-gray-500);
                }
              }
            `)},n(a({href:"uploadIcon.svg#Capa_1"})),u(o("Choose a file to upload")));return()=>s({id:"fileInput"},d(o("FileInput Examples")),l("File Input"),m({Component:h,name:"file",accept:"text/*",onchange:b}),i("File selected: ",p),l("File Input disabled"),m({Component:h,name:"file",accept:"text/*",disabled:!0,onchange:b}))},Pe=({css:e,createGlobalStyles:o})=>(o`
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
    `});function Me(e,o={}){const{bau:t,css:r,createGlobalStyles:n}=e,{div:a,input:s,label:i}=t.tags,l=Pe({css:r,createGlobalStyles:n});return function(u){const{name:p,id:m,disabled:b,label:h="",error:x="",...k}=u;return a({class:E(l.base,b&&l.disabled,x&&l.error,u.class)},s({id:m,name:p,type:"text",required:!0,disabled:b,...k}),i({htmlFor:m},h),a({"data-input-error":p},x))}}const Be=e=>{const{tr:o,bau:t}=e,{section:r,div:n,h3:a,h2:s}=t.tags,i=Me(e);return()=>r({id:"input"},s(o("Input Examples")),a("Standard"),n(i({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),n(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),n(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})))};function De(e){const{bau:o,css:t}=e,{dialog:r}=o.tags,n=t`
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
  `;return function(s,...i){return r({class:E(n,s.class)},...i)}}const Le=e=>{const{tr:o,bau:t}=e,{section:r,main:n,h2:a,header:s,footer:i,p:l}=t.tags,d=M(e),u=De(e),p=()=>n(Array(10).fill("").map((b,h)=>l(h+1,". "))),m=u({id:"my-dialog"},s("Header"),p(),i(d({onclick:()=>{m.close()}},"Cancel"),d({primary:!0,raised:!0,onclick:()=>{m.close()}},"OK")));return()=>r({id:"modal"},a(o("Modal Examples")),d({raised:!0,onclick:()=>{m.showModal()}},"OPEN MODAL"),m)};function Oe(e,o={}){const{bau:t,css:r}=e,{svg:n,animate:a,animateTransform:s,rect:i}=t.tagsNS("http://www.w3.org/2000/svg");return function({size:d=36,color:u="primary",visibility:p=!0,...m}={}){return n({class:E(r`
            visibility: ${p?"visible":"hidden"};
            color: var(--color-${u});
          `,m.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:d,height:d,viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Re=e=>{const{tr:o,bau:t}=e,{section:r,h2:n,div:a}=t.tags,s=Oe(e);return()=>r({id:"spinner"},n(o("Spinner Examples")),a(s({size:30}),s(),s({size:40,color:"secondary"}),s({size:50,color:"info"}),s({size:60,color:"danger"})))};function Ne(e){const{bau:o,css:t}=e,{input:r}=o.tags,n=t`
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
  `;return function(s,...i){return r({...s,class:E(n,s.class),type:"checkbox",required:"required"},...i)}}const ze=e=>{const{tr:o,bau:t,css:r}=e,{section:n,form:a,label:s,div:i,h2:l}=t.tags,d=Ne(e);return()=>n({id:"switch"},l(o("Switch Examples")),a(i({class:r`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))))};function N(e,{tabDefs:o}){const{bau:t,css:r}=e,{div:n,ul:a,li:s}=t.tags,i=t.state(o),l=t.state(o[0]),d=p=>i.val.find(m=>m.name==p),u={base:r`
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
    `};return function(m,...b){const h=k=>{const{Header:C,disabled:$,name:T}=k;return s({class:{deps:[l],renderProp:()=>c=>E(c.name==T&&"active",$&&"disabled")},onclick:c=>c.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:T},bubbles:!0}))},C(k))},x=n({class:E(u.base,m.class)},t.bind({deps:[i],render:({renderItem:k})=>C=>a(C.map(k)),renderItem:()=>h}),t.bind({deps:[l],render:()=>({Content:k})=>k?k({}):""}));return x.addEventListener("tab.select",k=>{var T,c;const{tabName:C}=k.detail,$=d(C);$&&((T=l.val.exit)==null||T.call(),l.val=$,(c=$.enter)==null||c.call())},!1),x.addEventListener("tab.add",k=>{var $;const{tab:C}=k.detail;($=C.enter)==null||$.call(),i.val.push(C)},!1),x.addEventListener("tab.remove",k=>{var $;const C=i.val.findIndex(T=>T.name==k.detail.tabName);C>0&&(($=i.val[C].exit)==null||$.call(),i.val.splice(C,1))},!1),x}}const Fe=e=>{const{tr:o,bau:t,css:r}=e,{section:n,div:a,h3:s,h2:i,p:l,i:d}=t.tags,u=(...C)=>a({class:r`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...C),p=()=>({name:"New Tab",Header:({name:C})=>a(C),Content:()=>a("My Paragraph")}),m=M(e),h=N(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(l("My tab Disabled"))}]}),k=N(e,{tabDefs:[{name:"Tab1",Header:()=>a(d({class:r`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:r`
              > button {
                margin: 10px;
              }
            `},m({raised:!0,onclick:C=>C.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:p()},bubbles:!0}))},"Add a new Tab"),m({accent:!0,onclick:C=>C.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"Tab2"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(l("My Content"))}]});return()=>n({id:"tabs"},i(o("Tabs")),s("Basic Tabs"),u(h({})),s("Full Witdth"),u(h({class:r`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(h({class:r`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(h({class:r`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(h({class:r`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(h({class:r`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(k({})))};function je(e){e.style.height="0px"}function He(e){e.style.height=e.scrollHeight+"px"}const _e=({css:e,createGlobalStyles:o})=>(o`
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
    `});function Ve(e,{renderMenuItem:o}){const{bau:t,css:r,createGlobalStyles:n}=e,{ul:a,li:s,nav:i}=t.tags,l=_e({css:r,createGlobalStyles:n}),d=({depth:u=0})=>p=>{const{children:m}=p,b=t.state(!0);return s({class:{deps:[b],renderProp:()=>h=>E(m?h?l.collapsable:l.collapsed:"")},onclick:h=>{b.val=!b.val,h.preventDefault()}},o(p),m&&a({"aria-expanded":{deps:[b],renderProp:({dom:h})=>x=>(x?je(h):He(h),!x)}},m.map(d({depth:u+1}))))};return function({tree:p,...m}){return i({class:E(l.nav,m.class)},a(p.children.map(d({}))))}}const Ge=e=>{const{tr:o,bau:t}=e,{section:r,div:n,a,h2:s}=t.tags,i={name:"Root Menu",children:[{name:"Menu 1",href:"#menu",children:[{name:"Sub Menu 1",href:"#menusub2"},{name:"Sub Menu 2",href:"#menusub1"}]},{name:"Menu 2",href:"#menu2",children:[{name:"Sub Menu 21",href:"#menusub21"}]}]},d=Ve(e,{renderMenuItem:({name:u,href:p})=>n(a({href:p,onclick:()=>{}},u))});return()=>r({id:"treeview"},s(o("TreeView")),d({tree:i}))},We=e=>{const{tr:o,bau:t,css:r}=e,{div:n,main:a,h1:s}=t.tags;return function(){return a({class:r`
          grid-area: main;
          padding: 10px;
          margin-top: 20px;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `},s(o("Examples")),he(e)(),ke(e)(),ve(e)(),we(e)(),Ce(e)(),Ee(e)(),$e(e)(),Ie(e)(),Be(e)(),Le(e)(),Re(e)(),ze(e)(),Fe(e)(),Ge(e)())}},Xe=({context:e})=>[{path:"",action:o=>({title:"BauUI Storybook",component:We(e)})}],qe=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Ye=({LayoutDefault:e,config:{base:o=""}})=>({router:t})=>{const{title:r,component:n,Layout:a=e}=t.resolve({pathname:location.pathname.replace(o,"")});document.getElementById("app").replaceChildren(a({component:n})),document.title=`${r}`};te();const V={title:"Bau",base:"/bau"},D=le({config:V}),Ke=[["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]];ee(D,{colorPalette:Ke});q({routes:Xe({context:D}),onLocationChange:Ye({LayoutDefault:pe(D),config:V}),notFoundRoute:qe(D)});
