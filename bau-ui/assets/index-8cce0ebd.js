(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Qe=(e,t)=>({...e,paths:[...t,e.path]}),ke=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=Qe(o,e);return n?[r,...ke({paths:[...e,o.path],routes:n})]:r}),et=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},tt=({routes:e=[],notFoundRoute:t})=>{const n=ke({routes:e}).map(o=>({...o,regex:et(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:a})=>a.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function at({routes:e,notFoundRoute:t,onLocationChange:n}){const o=tt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,a,s)=>{r.apply(a,s),n({router:o})}}),document.addEventListener("click",r=>{const{target:a}=r,s=a.getAttribute("href");a.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),n({router:o}),o}const Se=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],nt=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ot=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ve=e=>`var(--color-${e})`,rt=e=>`var(--color-${e}-lightest)`,st=()=>Se.map(([e])=>`
.outline.${e} {
  border: 1px solid ${ve(e)};
}
.soft.${e} {
  background-color: ${rt(e)};
}
.solid.${e} {
  background-color: ${ve(e)};
}
`).join(`
`),lt=e=>100-e*10,it=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${lt(t)}%);`).join(`
`),Ee=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),ct=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...nt.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...ot.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function dt({createGlobalStyles:e},{colorPalette:t=Se}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>ct([n,o])).join(`
`)}
      ${it()}
      ${Ee({})}
      ${st()}
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
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
      --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      --shadow-m: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
    }
    :root {
      font-family: var(--font-family);
      color-scheme: var(--color-scheme);
      color: var(--color-content);
      font: var(--font-size-base) / var(--line-height-base) var(--font-family);
      background-color: var(--background-color);
    }
    body {
      margin: 0;
    }
  `}function ut(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ue=e=>Object.prototype.toString.call(e??0).slice(8,-1),mt=e=>ue(e)=="Object",we=e=>ue(e)=="Function",re=e=>["Object","Array"].includes(ue(e)),ye=Object.getPrototypeOf,se=e=>ee(e)?e.val:e,ee=e=>e==null?void 0:e.__isState,ht=["splice","push","pop","shift","unshift","sort","reverse"],te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const V=e=>!ee(e[0])&&mt(e[0])?e:[{},...e];function pt(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,r=new Set,a=new Set,s=!1,l,c=f=>n.createElement(f),m=(f,x,C)=>{let k=l;l=x;let $=f(C);return l=k,$},d=()=>{o||(o=window.requestAnimationFrame(()=>{r.forEach(f=>{f.bindings=f.bindings.filter(x=>{var C;return(C=x.element)==null?void 0:C.isConnected}),!f.bindings.length&&!f.computed&&r.delete(f)}),o=void 0}))},i=(f,x,C,k,$,U)=>{var z;if(s){a.add(f);return}for(let R of f.bindings){let{deps:L,element:N,renderInferred:X,render:G,renderItem:_}=R;if(_&&x)(z=g(N,k,(...Z)=>b(_(...Z)),C,$,U)[x])==null||z.call();else{let Z=X?X({element:N}):G({element:N,renderItem:_})(...L.map(se));Z!==N&&N.replaceWith(R.element=b(Z))}}E(f),d()},u=(f,x,C=[])=>({get(k,$,U){var z;if(l==null||l.add(f),$==="_isProxy")return!0;if(!((z=k[$])!=null&&z._isProxy)&&!ee(k[$])&&re(k[$]))k[$]=new Proxy(k[$],u(f,x,[...C,$]));else if(ht.includes($)){let R=k[$];return(...L)=>{let N=R.apply(k,L);return i(f,$,N,L,x,C),N}}return Reflect.get(k,$,U)},set(k,$,U,z){let R=Reflect.set(k,$,U,z);return i(f,"setItem",R,{prop:$,value:U},x,[...C,$]),R}}),h=(f,x)=>new Proxy(x,u(f,x)),g=(f,x,C,k,$,U)=>{let z=()=>f.replaceChildren(...te(k,C)),R=L=>f[L]&&f.removeChild(f[L]);return{assign:z,sort:z,reverse:z,setItem:()=>{var N;let L=U[0];(N=f.children[L])==null||N.replaceWith(C($[L],L))},push:()=>f.append(...te(x,(L,N)=>C(L,$.length+N))),unshift:()=>f.prepend(...te(x,C)),pop:()=>R("lastChild"),shift:()=>R("firstChild"),splice:()=>{let[L,N,...X]=x;const{length:G}=f.children;for(let _=L>=0?Math.min(L+N-1,G-1):G-1;_>=(L>=0?L:G+L);_--)f.children[_].remove();if(X.length){let _=X.forEach((Z,oe)=>C(Z,L+oe));f.children[L]?f.children[L].after(..._):f.append(..._)}}}},p=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let x=this;return l==null||l.add(x),x.valProxy??(x.valProxy=re(f)?h(x,f):f,x.valProxy)},set val(x){let C=this,k=C.val;re(x)?(C.valProxy=h(C,x),i(C,"assign",x)):x!==k&&(C.valProxy=x,i(C)),C.oldVal=k}}),b=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),v=(f,x)=>{let C=new Set;return x.val=m(f,C),C},y=f=>{let x=p(),C=v(f,x);x.computed=!0;for(let k of C)k.listeners.push({computed:f,deps:C,state:x});return x},E=f=>{for(let x of[...f.listeners])v(x.computed,x.state)},S=(f,...x)=>{if(x.length){let C=[];for(let k of x.flat(1/0))k!=null&&C.push(ee(k)?H({deps:[k],render:()=>$=>$}):we(k)?D({renderInferred:k}):b(k));f.append(...C)}},I={},P=(f,x)=>f&&(Object.getOwnPropertyDescriptor(f,x)??P(ye(f),x)),A=(f,x,C)=>{var k;return I[f+","+x]??(I[f+","+x]=((k=P(C,x))==null?void 0:k.set)??0)},B=(f,x)=>new MutationObserver((C,k)=>{C.filter($=>$.removedNodes).forEach($=>[...$.removedNodes].find(U=>U===f&&(x({element:f}),k.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),M=f=>new Proxy(function(C,...k){var R;let[$,...U]=V(k),z=f?n.createElementNS(f,C):c(C);for(let[L,N]of Object.entries($)){if(L.startsWith("bau"))continue;let X=A(C,L,ye(z))?G=>z[L]=G:G=>z.setAttribute(L,G);N==null||(ee(N)?H({deps:[N],render:()=>()=>(X(N.val),z)}):we(N)&&(!L.startsWith("on")||N.isDerived)?D({renderInferred:()=>(X(N({element:z})),z)}):N.renderProp?H({deps:N.deps,render:()=>()=>(X(N.renderProp({element:z})(...N.deps.map(se))),z)}):X(N))}return S(z,...U),(R=$.bauCreated)==null||R.call($,{element:z}),$.bauMounted&&t.requestAnimationFrame(()=>$.bauMounted({element:z})),$.bauUnmounted&&t.requestAnimationFrame(()=>B(z,$.bauUnmounted)),z},{get:(x,C)=>x.bind(void 0,C)}),O=(f,x,C)=>{f.element=b(C);for(let k of x)ee(k)&&(r.add(k),k.bindings.push(f));return f.element},D=({renderInferred:f,element:x})=>{let C=new Set,k=m(f,C,{element:x});return O({renderInferred:f},C,k)},H=({deps:f,element:x,render:C,renderItem:k})=>O({deps:f,render:C,renderItem:k},f,C({element:x,renderItem:k})(...f.map(se))),j=(f,x,C)=>H({deps:[f],render:({renderItem:k})=>$=>(x.append(...te($,k)),x),renderItem:C}),W=f=>{s=!0,f(),s=!1,a.forEach(i),a.clear()};return{tags:M(),tagsNS:M,state:p,bind:H,loop:j,derive:y,stateSet:r,batch:W}}const bt=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},gt=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},ft=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function vt(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...a)=>{const s=ft(r,a),l=bt(s);return!t.getElementById(l)&&gt(t,e==null?void 0:e.target,l,o(l,s)),l};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}function wt(e){return{bau:pt(),...vt(),tr:n=>n,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function q(e,t){const{bau:n,css:o}=e,r={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &:hover {
        filter: brightness(90%);
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `};return function(...s){let[{color:l,variant:c,size:m,disabled:d,href:i,...u},...h]=V(s);return(i?n.tags.a:n.tags.button)({...u,class:T(r.root,c,m,l,i?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:i,...!i&&{type:"button"}},h)}}function yt(e){const{tr:t,bau:n,css:o,config:r}=e,{i:a,header:s,h1:l,div:c,a:m,img:d,b:i,ul:u,li:h}=n.tags,{svg:g,path:p}=n.tagsNS("http://www.w3.org/2000/svg"),b=n.state(!0),v=q(e),y=()=>a({class:o`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>b.val=!b.val},y()),m({href:`${r.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},i(t("Bau UI Components")))),S=()=>m({class:o`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:`${r.base}/github-mark-white.svg`,width:30,height:30}));return function(){return s({class:o`
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
        `},E(),S())}}function xt({tr:e,bau:t,css:n}){const{footer:o,span:r,a,ul:s,li:l,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function $e(e,t={}){return function({parent:o,animationHide:r,animationShow:a},s){s.style.animation=a;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((c,m)=>{c.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(i=>{o.style.position="relative";const u=i.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}const xe="0.3s",Te=({parent:e,grandParent:t})=>n=>{const{children:o,...r}=n,a=structuredClone(r);return a.children=o==null?void 0:o.map(Te({parent:n,grandParent:e})),e&&(e.parentTree=t),a.parentTree=e,a},Ae=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const r=Ae(e)(t.children[o]);if(r)return r}},Ct=({createGlobalStyles:e,keyframes:t})=>(e`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-200);
  --drill-down-menu-bg-hover: var(--color-emphasis-200);
}
`,{hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,showFromLeft:t`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
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
   `,showFromRight:t`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `});function me(e,t){const{bau:n,css:o,window:r}=e,{base:a=""}=t,s=({currentTree:D,data:H,onclickBack:j})=>b(E({href:`${a}${D.parentTree.children[0].data.href}`,onclick:j({currentTree:D}),class:o`
            flex-grow: 0;
          `},"←"),E({href:`${a}${H.href}`,class:o`
            flex-grow: 1;
            justify-content: flex-start;
          `},H.name)),l=({name:D,href:H})=>E({href:`${a}${H}`},D),c=({subTree:D})=>{var H;return r.location.pathname.replace(a,"")===((H=D==null?void 0:D.data)==null?void 0:H.href)},{renderHeader:m=s,renderMenuItem:d=l,isActive:i=c}=t,{ul:u,li:h,nav:g,div:p,header:b,a:v}=n.tags,y=$e(),E=q(e,{class:o`
      flex-grow: 1;
      justify-content: flex-start;
    `}),{hideToLeft:S,hideToRight:I,showFromRight:P,showFromLeft:A}=Ct(e),B=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a {
      padding: 0.5rem;
      border-radius: 0;
    }
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      transition: background-color var(--transition-slow) ease-in-out;
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
        & a,
        span {
          text-decoration: none;
          width: 100%;
          color: inherit;
          padding: var(--drill-down-menu-padding);
        }
      }
    }
  `,M=({variant:D,color:H,size:j,onclickItem:W,onclickBack:f,currentTree:x,pathnameState:C})=>{const{children:k,parentTree:$,data:U}=x;return p({class:T("drillDownMenu",D,H,j)},$&&m({data:U,currentTree:x,onclickBack:f}),k&&u(k.map(z=>h({class:()=>T(z.children&&"has-children",i({pathname:C.val,subTree:z})&&"is-active"),onclick:z.children&&W({currentTree:z})},d(z.data)))))},O=({tree:D,pathname:H})=>{let j=Te({})(D),W=Ae(H)(j);return W||(console.log("drilldown no sub tree",H),W=j),W};return function(H){const{variant:j="plain",color:W="neutral",size:f,tree:x,pathnameState:C=n.state(r.location.pathname),...k}=H,$=({currentTree:L})=>N=>z(N,R,L,!0),U=({currentTree:L})=>N=>z(N,R,L.parentTree,!1),z=(L,N,X,G)=>{N.firstChild.replaceChildren(y({parent:N,animationHide:`${G?S:I} ${xe}`,animationShow:`${G?P:A} ${xe}`},M({variant:j,color:W,size:f,currentTree:X,onclickItem:$,onclickBack:U,pathnameState:C})))},R=g({class:T(B,t==null?void 0:t.class,k.class)},()=>M({variant:j,color:W,size:f,currentTree:O({tree:x,pathname:C.val}),onclickItem:$,onclickBack:U,pathnameState:C}));return R}}const kt={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ie(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{div:s,ul:l,li:c,nav:m,a:d,span:i}=n.tags,u=me(e,{base:r.base});return function(){return s({class:o`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},u({tree:kt,pathnameState:a.pathname}))}}const St=e=>{const{bau:t,css:n}=e,{div:o}=t.tags,r=yt(e),a=Ie(e),s=xt(e);return function({componentState:c}){return o({class:n`
          display: grid;
          grid-template-columns: minmax(15%, 200px) minmax(50%, 85%);
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
            & nav {
              display: none;
            }
          }
        `},r(),a(),o({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>c.val&&c.val({})),s())}};function Et(e){const{bau:t,css:n,config:o}=e,{div:r,h1:a,h2:s,p:l}=t.tags;q(e);const c=n`
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
  `;return function({name:d,text:i,tagLine:u}){return r({class:c},a(d),s(i),l(u))}}function $t(e){const{bau:t,css:n}=e,{div:o,h1:r,p:a}=t.tags,s=n`
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 0.5rem;
      width: 30%;
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
        width: 90%;
      }
    }
  `,l=({title:c,Content:m})=>o({className:"feature"},r(c),a(m()));return function({featuresContent:m}){return o({class:s},m.map(l))}}function Tt(e){const{bau:t,css:n,config:o}=e,{div:r,p:a,a:s}=t.tags,l=Et(e),c=$t(e),m=q(e),d=n``,i=[{title:"UI components for the web",Content:()=>[a("Over 25 components such as button, input, tabs, autocomplete etc ..."),m({href:`${o.base}/components`,color:"primary",variant:"solid"},"Visit Gallery")]},{title:"Component style",Content:()=>[a("Each component has a combination of variant, color and size:"),a("3 variant: plain, outline and primary"),a("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[a("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),a("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[a("The component bundle size is about 8x smaller compared to popular React UI component library."),a("Faster download time for users."),a("Save in bandwith fees for the operator."),a("Suitable for low bandwith network and low cost device.")]}];return function({}){return r({class:d},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:i}))}}function Me(e,t){const{bau:n,css:o}=e,{accordionDefs:r}=t,{div:a,ul:s,li:l,header:c,h3:m,button:d}=n.tags,i=n.state(""),u=p=>b=>{i.val==p?i.val="":i.val=p},h=({element:p,open:b})=>{const v=()=>{p.removeEventListener("transitionend",v)};function y(S){S.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{S.style.height="0px"})}function E(S){S.addEventListener("transitionend",v),S.style.height=S.scrollHeight+"px"}p.scrollHeight!=0&&(b?E(p):y(p))},g=o`
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
        background-color: inherit;
        &:hover {
          filter: brightness(90%);
        }
        & h3 {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
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
  `;return function(...b){let[{color:v,variant:y="outline",size:E,content:S,...I},...P]=V(b);const A=B=>{const{Header:M,Content:O,name:D}=B;return l({class:T(v,y,E),onclick:u(D)},m({class:()=>T(i.val==D&&"active")},d({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:H})=>i.val==D},M(B))),a({class:"content",role:"region",id:`bau-${D}`,"data-state":({element:H})=>{const j=i.val==D;return h({element:H,open:j}),j}},O(B)))};return a({class:T("accordion",g,t==null?void 0:t.class,I.class)},s(r.map(A)))}}const K=["neutral","primary","success","danger","warning"],At=["plain","outline","solid"],F=e=>{const{bau:t,css:n}=e,{div:o,table:r,tbody:a,tr:s,td:l,thead:c,th:m}=t.tags;return function({Item:i,name:u}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(c(s(m(u??"Variant/Color"),K.map(h=>m(h)))),a(At.map(h=>s(m(h),K.map((g,p)=>l(i({color:g,variant:h},{index:p}))))))))}},It=e=>{const{tr:t,bau:n,css:o}=e,{article:r,div:a,h3:s,h2:l,h1:c,p:m}=n.tags,d=F(e),i=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),h=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(m("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(m("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(m("Item 3 content"))}]});return()=>r({id:"accordion"},c(t("Accordion")),l("Accordion Table"),d({Item:g=>h({...g})}),l("Customization"),s("Default Accordion"),i(h({})),s("Accordion width: fit-content"),i(h({color:"warning",class:o`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),i(h({color:"success",variant:"outline",class:o`
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
          `})))},Mt={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Bt=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Dt=()=>K.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function ne(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a,i:s}=n.tags;Bt({css:o,createGlobalStyles:r});const l=o`
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
    ${Dt()}
  `,c=q(e),m=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(i,...u){const{variant:h="outline",color:g="neutral",size:p,onRemove:b,...v}=i;return a({...v,class:T(`alert-${h}`,h,g,p,l,t==null?void 0:t.class,i.class,"alert"),role:"alert"},s({class:"icon"},Mt[g]),a({class:"content"},...u),b&&m({onclick:b}))}}const Pt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h4:c,p:m}=n.tags,d=F(e),i=ne(e),u=ne(e,{class:o`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),a(i({color:"danger"},c("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),a(u({color:"warning"},c("My message"))),s("Alert Table"),d({Item:h=>i({...h},`Alert ${h.color}`)}))},zt=(e,t={})=>{const{bau:n,css:o,keyframes:r}=e,{limit:a=10,deleteAfterDuration:s=15e3}=t,{div:l}=n.tags,c=n.state([]),m={inserting:r`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:r`
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
      animation: ${m.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${m.removing} var(--transition-slow) ease-out;
    `},i=({id:u,status:h})=>{const g=c.val.findIndex(p=>p.id===u);g!=-1&&(c.val[g].status=h)};return function(h={},...g){const p=({id:y})=>{i({id:y,status:"removing"});const E=c.val.findIndex(S=>S.id===y);E!=-1&&c.val.splice(E,1)},b=({Component:y})=>{const E={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=a&&p({id:c.val[0].id}),c.val.push(E),setTimeout(()=>p(E),s)},v=y=>l({class:d.item,onclick:()=>p(y)},y.Component());return document.addEventListener("alert.add",y=>b(y.detail)),document.addEventListener("alert.remove",y=>p(y.detail)),l({class:T(d.stack,t==null?void 0:t.class,h.class)},n.loop(c,l(),v))}},Nt=e=>{const{tr:t,bau:n}=e,{section:o,h1:r}=n.tags,a=zt(e,{deleteAfterDuration:2e4}),s=q(e),l=ne(e);return function(){return o({id:"alert-stack"},a(),r("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Lt=({keyframes:e})=>({hideRight:e`
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
 `}),Ht=e=>{const{bau:t}=e,{section:n,div:o,h1:r}=t.tags,a=$e(),s=q(e),l=Lt(e);return function(){const c=t.state(!0),m=o(),d=i=>{m.replaceChildren(a({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},o(i.val?"Ciao":"")))};return d(c),n({id:"animate"},o(r("Test Animate"),o(s({onclick:()=>{c.val=!c.val,d(c)}},()=>c.val?"Hide":"Show")),m))}};function Be(e,t){const{bau:n}=e,{span:o,img:r}=n.tags,a=n.state(!0),s=n.state(!1),l=()=>a.val=!1,c=m=>{a.val=!1,s.val=!0};return function(...d){let[{color:i,variant:u="outline",size:h,width:g=60,height:p=60,...b},...v]=V(d);return o({class:T(t==null?void 0:t.class,b.class)},()=>a.val?"Loading...":"",()=>s.val&&"Error",r({width:g,height:p,onload:l,onerror:c,class:T(t==null?void 0:t.class,i,u,h,b.class),...b}))}}const jt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,h2:a,h3:s}=n.tags,l=o`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,c=F(e),m=Be(e,{class:o`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},a(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),c({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function he(e,t){const{bau:n,css:o,window:r}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:m,triggerEl:d,onClose:i,...u},...h]=V(c);const g=v=>{b.style.opacity=1,b.showModal();const y=d.getBoundingClientRect(),E=b.getBoundingClientRect();y.x<r.innerWidth/2?b.style.left=y.left+"px":b.style.left=y.right-E.width+"px",y.y<r.innerHeight/2?b.style.top=y.top+y.height+"px":b.style.top=y.top-E.height+"px"},p=v=>{const y=()=>{b.close(),b.removeEventListener("transitionend",y)};b.addEventListener("transitionend",y),b.style.opacity=0},b=a({role:"presentation",class:T("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:v=>v.target===b&&(p(),i==null?void 0:i.call())},m);return b.closeDialog=p,b.openDialog=g,b}}function De(e,t){const{bau:n,css:o}=e,{div:r,input:a,ul:s,li:l,i:c,span:m,button:d}=n.tags,i=he(e),u=o`
    & button {
      cursor: pointer;
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0.7rem 0.5rem;
      min-width: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      color: inherit;
      transition: all var(--transition-fast);
      &:hover {
        &:hover {
          filter: brightness(90%);
        }
      }
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & input {
        min-height: 2rem;
        padding: 0.8rem;
        margin: 0.3rem;
        outline: none;
        font-size: 1rem;
        border-radius: var(--global-radius);
      }
      & ul {
        list-style: none;
        padding: 0;
        margin: 0 0;
        & li {
          padding: 0.5rem;
          cursor: pointer;
          &:hover {
            background-color: var(--color-emphasis-200);
          }
        }
        & li.active {
          background-color: var(--color-emphasis-200);
        }
      }
    }
  `,h=n.state(""),g=n.state(""),p=n.state(!1),b=n.state(0),v=()=>{p.val=!1};return function(...E){let[{variant:S="outline",color:I,size:P,id:A,label:B,placeholder:M,Option:O,options:D,getOptionLabel:H=({label:G})=>G,...j},...W]=V(E);const f=n.state(D),x=()=>{X.openDialog(),p.val=!0,g.val="",f.val=D},C=()=>{X.closeDialog(),p.val=!1,g.val=""},k=G=>{const{value:_}=G.target;g.val=_,_?f.val=D.filter(Z=>H(Z).match(new RegExp(`${_}`,"i"))):f.val=D},$=G=>{console.log("onclickButton",p.val),p.val?C():x()},U=G=>_=>{h.val=H(G),C()},z=G=>{switch(G.key){case"Escape":C();break;case"ArrowDown":b.val++;break;case"ArrowUp":b.val--;break;case"Enter":h.val=H(f.val[b.val]),g.val="",C();break}},R=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":B,onclick:$,class:T(S,I,P)},()=>!h.val&&B,h),L=a({id:A,value:g,placeholder:M,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":p,oninput:k,onkeydown:z,class:T(S,I,P)}),X=i({id:A,triggerEl:R,contentEl:(()=>r({class:T(S,I,P,"content")},L,()=>s(f.val.map((G,_)=>l({class:()=>T(b.val==_&&"active"),onclick:U(G)},O(G))))))(),onClose:v});return r({...j,class:T("autocomplete",u,t==null?void 0:t.class,j==null?void 0:j.class)},R,X)}}const Ot=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:c}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),i=De(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},c(g.label),c(g.code));return()=>r({id:"autocomplete",class:o``},l(t("Autocomplete")),s("Basic Autocomplete"),m(i({options:u,Option:h,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>i({...g,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",id:"country"})}))};function le(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:c,variant:m="outline",size:d,content:i,...u},...h]=V(l);return r({...u,class:T("badge",a,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:T(c,m,d)},i),...h)}}const Gt=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s}=t.tags,l=(...i)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...i),c=F(e),m=le(e),d=le(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>o({id:"badge"},s("Badge"),a("Basic Badge"),l(m({content:"10"},"☏")),a("Badges Table"),c({Item:(i,{index:u})=>m({...i,content:`${u*100}`},"☏")}),a("Badge custom"),l(d({content:"1"},"☏")))};function Pe(e,t){const{bau:n,css:o}=e,{ul:r,li:a,a:s,span:l}=n.tags,c=o`
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
  `;return function(...d){let[{color:i,variant:u="outline",size:h,items:g,...p},...b]=V(d);return r({...p,class:T(c,t==null?void 0:t.class,p==null?void 0:p.class)},g.map(({href:v,name:y})=>a((v?s:l)({href:v,class:T(i,u,h)},y))))}}const Ft=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=F(e),c=Pe(e);return()=>o({id:"breadcrumbs"},r(t("Breadcrumbs")),a("Bacis Breadcrumb"),c(s),a("Breadcrumbs Table"),l({Item:m=>c({...m,...s})}))},Rt=e=>{const{bau:t,css:n}=e,{section:o,p:r,h3:a}=t.tags,s=F(e),l=q(e);return()=>o({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},a("Button Examples"),s({Item:c=>l({...c},`${c.variant} ${c.color}`)}),a("Full With"),r(l({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),a("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Vt=()=>K.map(e=>`
&.button-group.${e} {
  & button { 
    border-right-color: var(--color-${e});
  }
}
&.button-group.solid.${e} {
  & button { 
    border-right-color: var(--color-emphasis-100);
  }
}
`).join(`
`);function ze(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button {
      border-radius: 0;
      border-right: 1px solid var(--color-emphasis-400);
      color: inherit;
      font-size: inherit;
    }
    & button:last-child {
      border: none;
    }
    &.sm {
      & button {
        font-size: 0.7rem;
      }
    }
    &.md {
      font-size: 1rem;
    }
    &.lg {
      & button {
        font-size: 1.5rem;
        padding: 1rem;
      }
    }
    ${Vt()}
  `;return function(...l){let[{variant:c="outline",size:m="md",color:d,...i},...u]=V(l);return r({...i,class:T("button-group",a,c,d,m,t==null?void 0:t.class,i==null?void 0:i.class)},...u)}}const Ut=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=q(e),c=ze(e);return()=>o({id:"button-group"},r(t("Button Group Examples")),a("Outline"),c({},l({},"ONE"),l({},"TWO"),l({},"THREE")),a("Button Group Table"),s({Item:m=>c({...m},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ie(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>K.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
  `;return function(...c){let[{color:m="neutral",variant:d="plain",size:i,...u},...h]=V(c);return r({...u,type:"date",class:T("calendar",s,m,d,i,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const _t=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,label:c}=n.tags,m=F(e),d=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),i=n.state("2023-08-08"),u=ie(e),h=ie(e,{class:o`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),a("Date: ",i),s("Basic Calendar"),d(c({for:"start"},"Start date:",u({id:"start",value:i.val,oninput:g=>{i.val=g.target.value}}))),s("Calendar min and max"),d(c("End date:",u({min:"2023-01-01",max:"2023-12-31",value:i.val,oninput:g=>{i.val=g.target.value}}))),s("Calendar custom"),d(h({})),s("Calendar Table"),m({Item:g=>u({...g})}))};function Ne(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:c,variant:m="outline",color:d="neutral",onclick:i,...u},...h]=V(l);return r({...u,onclick:i,class:T("chip",a,c,m,d,i&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Xt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l}=n.tags,c=F(e),m=(...i)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...i),d=Ne(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),c({Item:i=>d({...i},`Chip ${i.color}`)}))};function Le(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
      filter: brightness(90%);
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
      font-size: 1.2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
  `;return function(...l){let[{color:c,variant:m="outline",size:d,...i},...u]=V(l);return r({type:"checkbox",required:"required",...i,class:T(a,c,m,d,t==null?void 0:t.class,i==null?void 0:i.class)})}}const Wt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,label:s,h2:l,form:c}=n.tags,m=F(e),d=Le(e),i=n.state(!1),u=n.state(!1),h=p=>b=>{p.val=!!b.target.checked},g=(...p)=>a({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...p);return()=>r({id:"checkbox"},c(l(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:i,onchange:h(i)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:h(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(p,{index:b})=>d({id:`myCheckbox-${b}`,name:`myCheckbox-${b}`,...p})})))};function qt(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:c,variant:m="outline",size:d,openState:i,...u},...h]=V(l);return r({class:T(a,t==null?void 0:t.class,u.class)},r({class:()=>T("overlay",i.val&&"overlay-open"),onclick:()=>{i.val=!1}}),r({class:()=>T("content",i.val&&"content-open")},h))}}const Yt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r}=n.tags,a=n.state(!1),s=qt(e),l=q(e),c=Ie(e);return()=>o({id:"drawer"},r(t("Drawer")),l({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},c()))},Kt=e=>{const{tr:t,bau:n,window:o,config:r}=e,{section:a,h2:s,h3:l}=n.tags,c=n.state(o.location.pathname.replace(r.base,"")),m=F(e),d={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},i=me(e,{base:r.base+"/components/drillDownMenu"});return()=>a({id:"drillDownMenu"},s(t("Drill Down Menu")),i({tree:d,pathnameState:c}),l("Drill Down Table"),m({Item:u=>i({tree:d,...u})}))};function He(e,t){const{bau:n,css:o}=e,{div:r,span:a,label:s,input:l}=n.tags,c={base:o`
      display: inline-block;
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
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,disabled:o`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...i){const{variant:u="outline",color:h="neutral",size:g,Component:p,disabled:b,...v}=d;return r({class:T(c.base,b&&c.disabled,t==null?void 0:t.class,d.class)},s({class:T(u,h,g)},p({disabled:b}),l({type:"file",disabled:b,...v})),a({class:"filename-display"}))}}const Zt=e=>{const{tr:t,bau:n,css:o}=e,{svg:r,use:a}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:c,h2:m,span:d}=n.tags,i=F(e),u=n.state("No file selected"),h=He(e),g=b=>{const v=b.target.files[0];v?u.val=v.name:u.val="No file selected"},p=({disabled:b})=>l({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},a({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),c("File Input"),h({Component:p,name:"file",accept:"text/*",onchange:g}),l("File selected: ",u),c("File Input disabled"),h({Component:p,name:"file",accept:"text/*",disabled:!0,onchange:g}),c("File Input Table"),i({Item:b=>h({Component:p,name:"file",accept:"text/*",onchange:g,...b})}))},Jt=()=>K.map(e=>`
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
    border: 2px solid var(--color-${e});
  };
}
&.input.soft.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
} 
&.input.solid.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(75%);
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function je(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
    display: inline-block;
    font-size: large;
    padding: 1rem;
    height: 2.5rem;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    ${Jt()}
  `;return function(l){const{size:c,variant:m="outline",color:d="neutral",name:i,id:u,disabled:h,...g}=l;return r({...g,class:T("input",c,d,m,a,t==null?void 0:t.class,g.class)})}}const Qt=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=F(e),c=je(e);return()=>o({id:"input"},s(t("Input Examples")),a("Standard"),r(c({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),r(c({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),c({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),r(c({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),a("Input Table"),l({Item:m=>c({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function Oe(e,t){const{bau:n,css:o}=e,{dialog:r}=n.tags,s=o`
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
    }
    & footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: var(--shadow-s);
      padding: 1rem;
      gap: 1rem;
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
    ${(()=>K.map(l=>`
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
  `;return function(...c){let[{color:m="neutral",variant:d="outline",size:i,...u},...h]=V(c);return r({class:T("modal",s,m,d,i,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const ea=e=>{const{tr:t,bau:n}=e,{section:o,main:r,h2:a,header:s,footer:l,p:c,div:m}=n.tags,d=F(e),i=q(e),u=Oe(e),h=()=>r(Array(10).fill("").map((b,v)=>c(v+1,". Some text here"))),g=b=>{const v=u({id:"my-dialog",...b},s("Header"),h(),l(i({variant:"outline",onclick:()=>{v.close()}},"Cancel"),i({variant:"solid",onclick:()=>{v.close()}},"OK")));return v},p=g({});return()=>o({id:"modal"},a(t("Modal Examples")),i({variant:"solid",onclick:()=>{p.showModal()}},"OPEN MODAL"),p,a(t("Modal Table")),d({Item:b=>{const v=g(b);return m(i({...b,onclick:()=>{v.showModal()}},"OPEN MODAL"),v)}}))},ta=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h1:c,p:m}=n.tags,d=q(e),i=(...I)=>a({class:o`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...I),u=he(e),g=(()=>d({onclick:()=>v.open?v.closeDialog():v.openDialog()},"Click"))(),p=()=>a({},c("My content"),m("My Content")),b=p(),v=u({id:"my-popover-left",triggerEl:g,contentEl:b}),y=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),E=p(),S=u({id:"my-popover-left",triggerEl:y,contentEl:E});return()=>r({id:"popover",class:o``},l(t("Popover")),s("Basic Popover"),i(a(g,v),a(y,S)))};function Ge(e,t){const{bau:n,css:o}=e,{div:r,ul:a,li:s}=n.tags,l=q(e),c=he(e),m=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      & li {
        padding: 0.5rem;
        cursor: pointer;
        background-color: inherit;
        &:hover {
          filter: brightness(90%);
        }
      }
      & li.active {
        filter: brightness(80%);
      }
    }
  `,d=n.state(""),i=n.state(!1),u=n.state(0);return function(...g){let[{color:p="neutral",variant:b="outline",size:v,id:y,label:E,Option:S,options:I,getOptionLabel:P=({label:k})=>k,...A},...B]=V(g);const M=()=>{C.openDialog(),i.val=!0},O=()=>{C.closeDialog(),i.val=!1},D=()=>{i.val=!1},H=k=>{i.val?O():M()},j=k=>$=>{d.val=P(k),O()},W=k=>{switch(k.preventDefault(),k.key){case"Escape":O();break;case"ArrowDown":u.val<I.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=I.length-1:u.val--;break;case"Enter":i.val?(d.val=P(I[u.val]),O()):M();break}},f=()=>a({class:T(p,b)},I.map((k,$)=>s({class:()=>T(u.val==$&&"active"),onclick:j(k)},S(k)))),x=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":i,"aria-label":E,onclick:H,class:T(p,b,v)},()=>!d.val&&E,d),C=c({id:y,triggerEl:x,contentEl:f(),onClose:D});return r({...A,class:T("select",m,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:W},x,C)}}const aa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:c}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),i=Ge(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},c(g.label),c(g.code));return()=>r({id:"select",class:o``},l(t("Select")),s("Basic Select"),m(i({options:u,Option:h,getOptionLabel:({label:g})=>g,label:"Select a country..."})),l(t("Select Table")),d({Item:g=>a(i({...g,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Select a country..."}))}))};function ae(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    ${(()=>K.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...c){let[{color:m="neutral",variant:d="outline",size:i,...u},...h]=V(c);return r({...u,type:"range",class:T("slider",m,d,i,s,t==null?void 0:t.class,u.class)},...h)}}const na=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:c,label:m,datalist:d,option:i,br:u}=n.tags,h=n.state(0),g=S=>{h.val=S==null?void 0:S.target.value},p=(...S)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),b=F(e),v=ae(e),y=ae(e),E=ae(e);return()=>r({id:"slider"},l(t("Slider")),c("Slider value: ",h),s("Basic Slider"),p(v({oninput:g,name:"slider-simple"})),s(t("Slider Table")),b({Item:S=>v(S)}),s("Slider Min Max: -1000 1000"),p(y({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),p(v({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),p(a({class:o`
              display: flex;
            `},v({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:o`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:o`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>i({value:Number(S),label:S}))))),s("Slider with mark"),p(m({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:o`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:o`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>i({value:Number(S),label:S})))))},Ce={sm:16,md:32,lg:64};function pe(e,t={}){const{bau:n,css:o}=e,{svg:r,animate:a,animateTransform:s,rect:l}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:i="outline",visibility:u=!0,...h}={}){return r({class:T(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,h.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Ce[m],height:Ce[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const oa=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=pe(e);return()=>o({id:"spinner"},r(t("Spinner Examples")),a(t("Spinner Table")),s({Item:c=>l(c)}))},ra=()=>K.map(e=>`
&.switch.plain.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.outline.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.soft.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.solid.${e} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-200);
  } 
  &:checked {
    background-color: var(--color-${e}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-200);
  }
}
`).join(`
`);function Fe(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
    position: relative;
    width: 2.4rem;
    height: 1.4rem;
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
      width: 1rem;
      height: 1rem;
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
    ${ra()}
  `;return function(...l){let[{color:c="neutral",variant:m="plain",size:d,...i},...u]=V(l);return r({...i,class:T("switch",a,c,m,d,t==null?void 0:t.class,i.class),type:"checkbox",required:"required"},...u)}}const sa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,label:s,div:l,h2:c}=n.tags,m=F(e),d=Fe(e);return()=>r({id:"switch"},c(t("Switch Examples")),a(l({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),d({id:"my-shinny-switch"}))),c(t("Switch Table")),m({Item:i=>l({class:o`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",d({...i,id:`my-switch-example-off-${i.color}-${i.variant}`})),s("on ",d({...i,id:`my-switch-example-on-${i.color}-${i.variant}`,checked:!0})))}))},la=()=>K.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ce(e,t){const{bau:n,css:o}=e,{tabDefs:r}=t,{div:a,ul:s,li:l}=n.tags,c=n.state(r),m=n.state(r[0]),d=u=>c.val.find(h=>h.name==u),i={base:o`
      display: flex;
      flex-direction: column;
      & ul {
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
      ${la()}
    `};return function(...h){let[{color:g,variant:p="plain",size:b,...v},...y]=V(h);const E=I=>{const{Header:P,disabled:A,name:B}=I;return l({class:()=>T(m.val.name==B&&"active",A&&"disabled"),onclick:M=>M.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},P(I))},S=a({class:T("tabs",i.base,p,b,g,t==null?void 0:t.class,v.class)},n.loop(c,s(),E),()=>m.val.Content?m.val.Content({}):"");return S.addEventListener("tab.select",I=>{var B,M;const{tabName:P}=I.detail,A=d(P);A&&((B=m.val.exit)==null||B.call(),m.val=A,(M=A.enter)==null||M.call())},!1),S.addEventListener("tab.add",I=>{var A;const{tab:P}=I.detail;(A=P.enter)==null||A.call(),c.val.push(P)},!1),S.addEventListener("tab.remove",I=>{var A;const P=c.val.findIndex(B=>B.name==I.detail.tabName);P>0&&((A=c.val[P].exit)==null||A.call(),c.val.splice(P,1))},!1),S}}const ia=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:c,i:m}=n.tags,d=F(e),i=q(e),u=(...y)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...y),h=()=>({name:"New Tab",Header:({name:y})=>a(y),Content:()=>a("My Paragraph")}),p=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My tab Disabled"))}]}),v=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:o`
              > button {
                margin: 10px;
              }
            `},i({onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:h()},bubbles:!0}))},"Add a new Tab"),i({accent:!0,onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),c("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(p({})),s("Full Witdth"),u(p({class:o`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(p({class:o`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(p({class:o`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(p({class:o`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(p({class:o`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(v({})),l(t("Tabs Table")),d({Item:y=>p(y)}))};function Q(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;r`
  :root {
    --table-cell-padding: 0.75rem;
    --table-background: transparent;
    --table-stripe-background: rgba(0, 0, 0, 0.03);
    --table-border-width: 1px;
    --table-border-color: var(--color-emphasis-300);
    --table-head-background: inherit;
    --table-head-color: inherit;
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
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...c){let[{...m},...d]=V(c);return a({...m,class:T("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const ca=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,th:l,td:c,tr:m,table:d,thead:i,tbody:u,caption:h}=t.tags;function g(B,M,O,D,H){return{name:B,calories:M,fat:O,carbs:D,protein:H}}const p=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],b=(...B)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...B),v=({name:B,calories:M})=>m(c(B),c({class:n`
            text-align: right;
          `},M)),y=()=>i(m(l({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=Q(e,{class:n`
      max-width: 650px;
    `}),S=Q(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),I=Q(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),P=Q(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),A=Q(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>o({id:"table"},s(m("Table")),a("Basic Table"),b(E(d(h("Basic Table"),y(),u(p.map(v))))),a("Dense Table"),b(S(d(h("Dense Table"),y(),u(p.map(v))))),a("Zebra Table"),b(I(d(h("Zebra Table"),y(),u(p.map(v))))),a("Caption Bottom"),b(P(d(h("Caption Bottom Table"),y(),u(p.map(v))))),a("Overflow Header"),b(A(d(h("Overflow Header"),y(),u(p.map(v))))))};function Re(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=q(e),s=pe(e),l=o`
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
  `,c=({label:h,icon:g,...p})=>a({variant:"plain","aria-label":h,title:h,...p},g),m=({count:h,totalCount:g,page:p,rowsPerPage:b})=>r({class:"pages-numbers"},Number(p-1)*Number(b)+(h>0?1:0),"-",Math.min(p*b,g)," of ",g),d=({count:h,page:g,rowsPerPage:p})=>r({class:"pages-numbers"},(g-1)*p+(h>0?1:0),"-",g*p),i=h=>h<=1,u=(h,g,p)=>h>=Math.ceil(g/p);return function(...g){let[{count:p=0,totalCount:b=0,page:v=1,rowsPerPage:y=50,onPageChange:E,isLoading:S=!1,disableFirst:I=()=>i(v),disablePrevious:P=()=>i(v),disableNext:A=()=>u(v,b,y),disableLast:B=()=>u(v,b,y),...M},...O]=V(g);const D=Math.max(0,Math.ceil(b/y)),H=E({page:1}),j=E({page:v-1}),W=E({page:v+1}),f=E({page:D});return r({...M,class:T("table-pagination",l,S&&"disabled",t==null?void 0:t.class,M==null?void 0:M.class)},s({class:"spinner",visibility:S,size:"md"}),b>0?m({count:p,totalCount:b,page:v,maxPages:D,rowsPerPage:y}):d({count:p,page:v,maxPages:D,rowsPerPage:y}),r(c({label:"First",icon:"⟪",onclick:H,disabled:I()}),c({label:"Previous",icon:"⟨",onclick:j,disabled:P()}),c({label:"Next",icon:"⟩",onclick:W,disabled:A()}),c({label:"Last",icon:"⟫",onclick:f,disabled:B()})))}}const da=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),ua=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:c}=t.tags,m=da(45),d=({name:y,email:E})=>a(r(y),r(E)),i=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=Re(e),h=Q(e,{class:n`
      max-width: 650px;
    `}),g=t.state(m),p=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),b=t.derive(()=>g.val.slice(p.val.page*p.val.rowsPerPage,(p.val.page+1)*p.val.rowsPerPage)),v=({page:y})=>E=>{p.val.page=y};return()=>h(s(i(),()=>c(b.val.map(d))),()=>u({...p.val,onPageChange:v}))},ma=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:c,div:m}=t.tags,d=t.state(!1),i=t.state([]),u=t.state(""),h=t.derive(()=>i.val.length),g=t.state(1),p=t.state(10),b=t.derive(()=>i.val),v=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,y=({page:M})=>O=>{g.val=M,E(v({page:M,per_page:p.val}))};E(v({page:1,per_page:p.val}));async function E(M){try{d.val=!0;const O=await fetch(M,{});if(O.ok){const D=await O.json();i.val=D;return}throw O}catch(O){u.val=O.message}finally{d.val=!1}}const S=({name:M,description:O,stargazers_count:D})=>a(r(M),r(O),r({class:n`
            text-align: right;
          `},D)),I=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=Re(e),A=Q(e,{class:n`
      min-width: 650px;
    `}),B=({message:M})=>m(M);return()=>A(()=>P({rowsPerPage:p.val,page:g.val,count:h.val,totalCount:-1,isLoading:d.val,onPageChange:y,disableNext:()=>!1}),s(I(),()=>u.val&&B({message:u.val}),()=>c(b.val.map(S))))},ha=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,tr:l}=t.tags,c=ua(e),m=ma(e),d=(...i)=>r({class:n`
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
        `},...i);return()=>o({id:"pagination"},s(l("Table Pagination")),a("Asynchronous Pagination"),d(m()),a("Simple Pagination"),d(c()))};function de(e,t){const{bau:n,css:o,window:r}=e,{div:a}=n.tags,s=o`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
        font-size: smaller;
        border-radius: var(--global-radius);
        padding: 0.3rem;
      }
      white-space: nowrap;
      position: absolute;
      z-index: 2;
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
  `;return function(...c){let[{titleEl:m,side:d="bottom-start",color:i="neutral",variant:u="outline",size:h,...g},...p]=V(c);const b=a({class:T("container",...d.split("-"))},a({class:T("content",i,u,h),role:"tooltip"},m)),v=A=>`move-to-${A}`,y=(A,B,M)=>{if(A()){const O=v(B);b.classList.add(O),b.classList.add(B),b.classList.remove(M)}},E=(A,B)=>{const M=v(A);b.classList.contains(M)&&(b.classList.remove(M),b.classList.add(B),b.classList.remove(A))},S=A=>{const B=b.getBoundingClientRect();y(()=>B.x<0,"right","left"),y(()=>B.x+B.width>r.innerWidth,"left","right"),y(()=>B.y<0,"bottom","top"),y(()=>B.bottom>r.innerHeight,"top","bottom"),b.classList.add("visible")},I=A=>{b.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return a({...g,class:T("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",I)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",I)}},...p,b)}}const pa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h2:s,em:l,p:c}=n.tags,m=F(e),d=q(e),i=de(e),u=de(e,{class:o`
      .container > .content {
        background-color: lightgreen;
        border: 2px dotted darkgreen;
        font-size: 1.5rem;
      }
      .container.top {
        &::after {
          position: absolute;
          content: " ";
          bottom: 0%;
          left: 20%;
          margin-top: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent var(--color-emphasis-400)
            transparent;
        }
      }
      .container.bottom {
        &::after {
          position: absolute;
          content: " ";
          top: 0%;
          left: 20%;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--color-emphasis-400) transparent transparent
            transparent;
        }
      }
    `}),h=()=>a({class:o`
          font-size: larger;
        `},c("A ",l("tooltip")," can be any component")),g=()=>[a({class:o`
          display: flex;
          justify-content: space-around;
        `},i({side:"top-start",titleEl:h()},d({},"top-start")),i({side:"top-centered",titleEl:h()},d({},"top-centered")),i({side:"top-end",titleEl:h()},d({},"top-end"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-start",titleEl:h()},d({},"left-start")),i({side:"right-start",titleEl:h()},d({},"right-start"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-centered",titleEl:h()},d({},"left-centered")),i({side:"right-centered",titleEl:h()},d({},"right-centered"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-end",titleEl:h()},d({},"left end")),i({side:"right-end",titleEl:h()},d({},"right end"))),a({class:o`
          display: flex;
          justify-content: space-around;
        `},i({side:"bottom-start",titleEl:h()},d({},"bottom start")),i({side:"bottom-centered",titleEl:h()},d({},"bottom centered")),i({side:"bottom-end",titleEl:h()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},g()),s(t("Tooltip moved")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},g()),s(t("Tooltip custom")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:h()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:p=>i({titleEl:h(),...p},d({},`${p.color} ${p.variant}`))}))},ba="light",ga=()=>K.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ve(e,t){const{bau:n,css:o,window:r}=e,{input:a}=n.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},c=l();c?s(c):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(ba);const m=o`
    position: relative;
    width: 2rem;
    height: 2rem;
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
    ${ga()}
  `;return function(...i){let[{color:u,variant:h="outline",size:g,...p},...b]=V(i);return a({required:"required",title:"Switch Theme",...p,class:T("theme-switch",m,u,h,g,t==null?void 0:t.class,p.class),type:"checkbox",checked:l()=="dark",onclick:v=>{s(v.target.checked?"dark":"light")}},...b)}}const fa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,div:s,h2:l}=n.tags,c=F(e),m=Ve(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),a(s({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},m({}))),l(t("Theme Switch Table")),c({Item:d=>m(d)}))},va=({css:e,createGlobalStyles:t})=>(t`
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
    display: inline-flex;
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
            background: var(--color-emphasis-200);
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
            color: inherit;
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
    `});function Ue(e,t){const{bau:n,css:o,createGlobalStyles:r,window:a}=e,{renderMenuItem:s}=t,{ul:l,li:c,nav:m,div:d}=n.tags,i=va({css:o,createGlobalStyles:r}),u=({element:b,closeState:v})=>{b.scrollHeight!=0&&(v.val?h(b):g(b))};function h(b){b.style.height=b.scrollHeight+"px";const v=()=>{b.removeEventListener("transitionend",v)};b.addEventListener("transitionend",v),a.requestAnimationFrame(()=>{b.style.height="0px"})}function g(b){const v=()=>{b.removeEventListener("transitionend",v),b.style.height=null};b.addEventListener("transitionend",v),b.style.height=b.scrollHeight+"px"}const p=({depth:b=1,maxDepth:v})=>y=>{const{children:E,expanded:S}=y,I=n.state(!S);return c({class:()=>T(E?I.val?i.collapsed:i.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:P=>{E&&(I.val=!I.val)}},s(y.data)),E&&b<v&&l({bauMounted:({element:P})=>{I.val&&(P.style.height="0px")},"aria-expanded":({element:P})=>(u({element:P,closeState:I}),!I.val)},E.map(p({depth:b+1,maxDepth:v}))))};return function({tree:v,maxDepth:y=1/0,size:E,variant:S="plain",color:I="neutral",...P}){return m({class:T(i.nav,E,S,I,t==null?void 0:t.class,P.class)},v.children&&l(v.children.map(p({maxDepth:y}))))}}const wa=e=>{const{tr:t,bau:n}=e,{section:o,a:r,h2:a,h3:s}=n.tags,l=F(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=Ue(e,{renderMenuItem:({name:i,href:u})=>r({href:u,onclick:h=>{h.preventDefault()}},i)});return()=>o({id:"treeview"},a(t("Tree View")),s(t("Tree View Default")),d({tree:c}),s(t("Tree View Table")),l({Item:i=>d({...i,tree:c})}))};function ya(e,t={}){const{bau:n,css:o}=e,{div:r,span:a,pre:s,h3:l,h4:c}=n.tags;return function(d,...i){return r("Login")}}const xa=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=ya(e);return()=>o({id:"login"},s(t("Login Examples")),a("Basic"),r(l()))};function Ca(e){const{tr:t,bau:n,css:o}=e,{div:r,article:a,h1:s}=n.tags;return function(){return r({class:o`
          grid-area: main;
          display: flex;
        `},a({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),xa(e)()))}}const ka=e=>{const{bau:t,css:n,config:o}=e,{section:r,div:a,h1:s,span:l,p:c,ul:m,li:d,a:i,main:u,header:h,footer:g,label:p}=t.tags,{svg:b,use:v}=t.tagsNS("http://www.w3.org/2000/svg"),y=F(e),S=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(c("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(c("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(c("Item 3 content"))}]}),I=ne(e),P=De(e),A=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],B=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),M=Be(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),O=le(e),D={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},H=Pe(e),j=q(e),W=ze(e),f=ie(e),x=Le(e),C=Ne(e),k={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},$=me(e,{base:o.base+"/components"}),U=({disabled:w})=>a({class:T(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,w&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},b({width:100,height:100,fill:"currentColor"},v({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),z=He(e),R=je(e),L=Oe(e),N=()=>u(Array(10).fill("").map((w,Y)=>c(Y+1,". Some text here"))),X=w=>{const Y=L({id:"my-dialog",...w},h("Header"),N(),g(j({variant:"outline",onclick:()=>{Y.close()}},"Cancel"),j({variant:"solid",onclick:()=>{Y.close()}},"OK")));return Y},G=Ge(e),_=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Z=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),oe=ae(e),_e=pe(e),ge=Fe(e),Xe=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My tab Disabled"))}]}),We=Ve(e),qe=()=>l("My tooltip"),Ye=de(e),Ke={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},Ze=Ue(e,{renderMenuItem:({name:w,href:Y})=>i({href:Y,onclick:Je=>{Je.preventDefault()}},w)}),fe=[{name:"Accordion",Item:w=>S({...w})},{name:"Alert",Item:w=>I({...w},`Alert ${w.color}`)},{name:"Autocomplete",Item:w=>P({...w,options:A,Option:B,getOptionLabel:({label:Y})=>Y,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:w=>M({...w,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(w,{index:Y})=>O({...w,content:`${Y*100}`},"☏")},{name:"Breadcrumbs",Item:w=>H({...w,...D})},{name:"Button",Item:w=>j({...w},`${w.variant} ${w.color}`)},{name:"Button Group",Item:w=>W({...w},j({},"ONE"),j({},"TWO"),j({},"THREE"))},{name:"Calendar",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,f({...w})))},{name:"Checkbox",Item:w=>p({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${w.color} ${w.variant}`,x({id:`myCheckbox-gallery-${w.color}-${w.variant}`,name:`myCheckbox-gallery-${w.color}-${w.variant}`,...w}))},{name:"Chip",Item:w=>C({...w},`Chip ${w.color}`)},{name:"DrillDown Menu",Item:w=>$({tree:k,...w})},{name:"File Input",Item:w=>z({Component:U,name:"file",accept:"text/*",onchange,...w})},{name:"Input",Item:w=>R({name:"my-input",id:"my-input-with",placeholder:"Enter text",...w})},{name:"Modal",Item:w=>{const Y=X(w);return a(j({...w,onclick:()=>{Y.showModal()}},"OPEN MODAL"),Y)}},{name:"Select",Item:w=>a(G({...w,options:_,Option:Z,getOptionLabel:({label:Y})=>Y,label:"Select a country..."}))},{name:"Slider",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,oe({...w,id:`my-slider-${w.color}-${w.variant}`})))},{name:"Spinner",Item:w=>_e(w)},{name:"Switch",Item:w=>a({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},p("off",ge({...w,id:`mySwitch-off-${w.color}-${w.variant}`})),p("on",ge({...w,id:`mySwitch-on-${w.color}-${w.variant}`,checked:!0})))},{name:"Tabs",Item:w=>Xe(w)},{name:"Theme Switch",Item:w=>We(w)},{name:"Tooltip",Item:w=>Ye({titleEl:qe(),...w},j({},`${w.color} ${w.variant}`))},{name:"Tree View",Item:w=>Ze({...w,tree:Ke})}];return()=>r(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),m({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},fe.map(({name:w})=>d(C({color:"primary"},i({href:`#${w}`},w))))),fe.map(w=>a({id:w.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},y(w))))},Sa=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Tt(e)})},{path:"components",action:()=>({title:"Component",component:ka(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:It(e)})},{path:"alert",action:()=>({title:"Alert",component:Pt(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Nt(e)})},{path:"animate",action:()=>({title:"Animate",component:Ht(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Ot(e)})},{path:"avatar",action:()=>({title:"Avatar",component:jt(e)})},{path:"badge",action:()=>({title:"Badge",component:Gt(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ft(e)})},{path:"button",action:()=>({title:"Button",component:Rt(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ut(e)})},{path:"calendar",action:()=>({title:"Calendar",component:_t(e)})},{path:"chip",action:()=>({title:"Chip",component:Xt(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Wt(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Yt(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Kt(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Zt(e)})},{path:"input",action:()=>({title:"Input",component:Qt(e)})},{path:"modal",action:()=>({title:"Modal",component:ea(e)})},{path:"popover",action:()=>({title:"Popover",component:ta(e)})},{path:"select",action:()=>({title:"Select",component:aa(e)})},{path:"slider",action:()=>({title:"Slider",component:na(e)})},{path:"spinner",action:()=>({title:"Spinner",component:oa(e)})},{path:"switch",action:()=>({title:"Switch",component:sa(e)})},{path:"table",action:()=>({title:"Table",component:ca(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:ha(e)})},{path:"tabs",action:()=>({title:"Tabs",component:ia(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:pa(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:fa(e)})},{path:"treeView",action:()=>({title:"Tree View",component:wa(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Ca(e)})}],Ea=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),$a=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:r,states:a}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:m})=>{const d=o.location.pathname.replace(n,""),{title:i,component:u,Layout:h=t}=m.resolve({pathname:d});a.pathname.val=d,s.val=u,document.title=`${i}`}},Ta=e=>{const{createGlobalStyles:t}=e;dt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }
    
  `},Aa=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: black;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${Ee({dark:!0})}
}
  `};ut();const be={title:"Bau",base:"/bau/bau-ui"},J=wt({config:be});J.states={pathname:J.bau.state(window.location.pathname.replace(be.base,""))};Ta(J);Aa(J);at({routes:Sa({context:J}),onLocationChange:$a({context:J,LayoutDefault:St(J),config:be}),notFoundRoute:Ea(J)});
