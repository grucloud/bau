(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();let te=e=>Object.prototype.toString.call(e??0).slice(8,-1),ue=e=>te(e)=="Object",ne=e=>te(e)=="Function",Y=e=>["Object","Array"].includes(te(e)),ae=Object.getPrototypeOf,J=e=>U(e)?e.val:e,U=e=>e==null?void 0:e.__isState,he=["splice","push","pop","shift","unshift","sort","reverse"],G=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const _=e=>!U(e[0])&&ue(e[0])?e:[{},...e];function ge(e){let t=window,{document:n}=t,a,r=new Set,l=new Set,i=!1,c,m=o=>n.createElement(o),v=(o,s,d)=>{let h=c;c=s;let p=o(d);return c=h,p},b=()=>{a||(a=t.requestAnimationFrame(()=>{r.forEach(o=>{o.bindings=o.bindings.filter(s=>{var d;return(d=s.element)==null?void 0:d.isConnected}),!o.bindings.length&&!o.computed&&r.delete(o)}),a=void 0}))},u=(o,s,d,h,p,B)=>{var $;if(i){l.add(o);return}for(let j of o.bindings){let{deps:k,element:f,renderInferred:D,render:T,renderItem:M}=j;if(M&&s)($=w(f,h,(...W)=>y(M(...W)),d,p,B)[s])==null||$.call();else{let W=D?D({element:f}):T({element:f,renderItem:M})(...k.map(J));W!==f&&f.replaceWith(j.element=y(W))}}t.requestAnimationFrame(()=>E(o)),b()},g=(o,s,d=[])=>({get(h,p,B){var $;if(c==null||c.add(o),p==="_isProxy")return!0;if(!(($=h[p])!=null&&$._isProxy)&&!U(h[p])&&Y(h[p]))h[p]=new Proxy(h[p],g(o,s,[...d,p]));else if(he.includes(p)){let j=h[p];return(...k)=>{let f=j.apply(h,k);return u(o,p,f,k,s,d),f}}return Reflect.get(h,p,B)},set(h,p,B,$){let j=Reflect.set(h,p,B,$);return u(o,"setItem",j,{prop:p,value:B},s,[...d,p]),j}}),x=(o,s)=>new Proxy(s,g(o,s)),w=(o,s,d,h,p,B)=>{let $=()=>o.replaceChildren(...G(h,d)),j=k=>o[k]&&o.removeChild(o[k]);return{assign:$,sort:$,reverse:$,setItem:()=>{var f;let k=B[0];(f=o.children[k])==null||f.replaceWith(d(p[k],k))},push:()=>o.append(...G(s,(k,f)=>d(k,p.length+f))),unshift:()=>o.prepend(...G(s,d)),pop:()=>j("lastChild"),shift:()=>j("firstChild"),splice:()=>{const{length:k}=o.children;let[f,D=k,...T]=s;for(let M=f>=0?Math.min(f+D-1,k-1):k-1;M>=(f>=0?f:k+f);M--)o.children[M].remove();if(T.length){let M=T.map((W,de)=>d(W,f+de));o.children[f]?o.children[f].before(...M):o.append(...M)}}}},C=o=>({oldVal:o,bindings:[],listeners:[],__isState:!0,get val(){let s=this;return c==null||c.add(s),s.valProxy??(s.valProxy=Y(o)?x(s,o):o,s.valProxy)},set val(s){let d=this,h=d.val;Y(s)?(d.valProxy=x(d,s),u(d,"assign",s)):s!==h&&(d.valProxy=s,u(d)),d.oldVal=h}}),y=o=>{if(o==null||o===!1){const s=m("span");return s.style.display="none",s}else return o.nodeType?o:n.createTextNode(o)},z=(o,s)=>{let d=new Set;return s.val=v(o,d),d},S=o=>{let s=C(),d=z(o,s);s.computed=!0;for(let h of d)h.listeners.push({computed:o,deps:d,state:s});return s},E=o=>{for(let s of[...o.listeners])z(s.computed,s.state)},N=(o,...s)=>{if(s.length){let d=[];for(let h of s.flat(1/0))h!=null&&d.push(U(h)?A({deps:[h],render:()=>p=>p}):ne(h)?H({renderInferred:h}):y(h));o.append(...d)}},L={},R=(o,s)=>o&&(Object.getOwnPropertyDescriptor(o,s)??R(ae(o),s)),F=(o,s,d)=>{var h;return L[o+","+s]??(L[o+","+s]=((h=R(d,s))==null?void 0:h.set)??0)},O=(o,s)=>new t.MutationObserver((d,h)=>{d.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(B=>B===o&&(s({element:o}),h.disconnect(),!0)))}).observe(o.parentNode,{childList:!0}),I=(o,s)=>new t.MutationObserver((d,h)=>d.forEach(p=>s({record:p,element:o}))).observe(o,{childList:!0}),X=o=>new Proxy(function(d,...h){var j;let[p,...B]=_(h),$=o?n.createElementNS(o,d):m(d);for(let[k,f]of Object.entries(p)){if(k.startsWith("bau"))continue;let D=F(d,k,ae($))?T=>T!==void 0&&($[k]=T):T=>$.setAttribute(k,Array.isArray(T)?T.filter(M=>M).join(" "):T);f==null||(U(f)?A({deps:[f],render:()=>()=>(D(f.val),$)}):ne(f)&&(!k.startsWith("on")||f.isDerived)?H({renderInferred:()=>(D(f({element:$})),$)}):f.renderProp?A({deps:f.deps,render:()=>()=>(D(f.renderProp({element:$})(...f.deps.map(J))),$)}):D(f))}return p.bauChildMutated&&I($,p.bauChildMutated),N($,...B),$.autofocus&&$.focus&&t.requestAnimationFrame(()=>$.focus()),(j=p.bauCreated)==null||j.call(p,{element:$}),p.bauMounted&&t.requestAnimationFrame(()=>p.bauMounted({element:$})),p.bauUnmounted&&t.requestAnimationFrame(()=>O($,p.bauUnmounted)),$},{get:(s,d)=>s.bind(void 0,d)}),q=(o,s,d)=>{o.element=y(d);for(let h of s)U(h)&&(r.add(h),h.bindings.push(o));return o.element},H=({renderInferred:o,element:s})=>{let d=new Set,h=v(o,d,{element:s});return q({renderInferred:o},d,h)},A=({deps:o,element:s,render:d,renderItem:h})=>q({deps:o,render:d,renderItem:h},o,d({element:s,renderItem:h})(...o.map(J))),P=(o,s,d)=>A({deps:[o],render:({renderItem:h})=>p=>(s.append(...G(p,h)),s),renderItem:d}),V=async o=>{i=!0;const s=await o();return i=!1,l.forEach(u),l.clear(),s};return{tags:X(),tagsNS:X,state:C,bind:A,loop:P,derive:S,stateSet:r,batch:V}}const fe=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},me=(e,t,n,a)=>{const r=e.createElement("style");r.id=n,r.append(a),(t??e.head).append(r)},ve=(e,t)=>e.reduce((n,a,r)=>n+a+(t[r]??""),"");function pe(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(r,...l)=>{const i=ve(r,l),c=fe(i);return!t.getElementById(c)&&me(t,e==null?void 0:e.target,c,a(c,i)),c};return{css:n((a,r)=>`.${a} { ${r} }`),keyframes:n((a,r)=>`@keyframes ${a} { ${r} }`),createGlobalStyles:n((a,r)=>r)}}const re=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],be=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ye=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],we=e=>`var(--color-${e})`,$e=e=>`var(--color-${e}-lightest)`,xe=()=>re.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${$e(e)};
}
.solid.${e} {
  background-color: ${we(e)};
}
`).join(`
`),ke=()=>re.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Se=e=>100-e*10,Ce=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Se(t)}%);`).join(`
`),oe=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Ae=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${a};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...be.map(([r,l])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${l}));`),...ye.map(([r,l])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${l}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function je({createGlobalStyles:e},{colorPalette:t=re}={}){e`
    * {
      margin: 0;
      padding: 0;
    }
   
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,a])=>Ae([n,a])).join(`
`)}
      ${Ce()}
      ${oe({})}
      ${xe()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
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
    html:has(dialog[open]) {
      overflow: hidden;
    }
    html[data-theme="dark"] {
      ${ke()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${oe({dark:!0})};
    }
  `}function ze(e){const t=ge(),n=pe({target:window.document.getElementById("bau-css")});return je(n),{bau:t,...n,tr:a=>a,window,...e}}const Ee=(e,t)=>({...e,paths:[...t,e.path]}),se=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const r=Ee(a,e);return n?[r,...se({paths:[...e,a.path],routes:n})]:r}),Ne=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Be=({routes:e=[],notFoundRoute:t})=>{const n=se({routes:e}).map(a=>({...a,regex:Ne(a)}));return{resolve:({pathname:a})=>{const r=n.find(({regex:l})=>l.test(a));return r?r.action({match:a.match(r.regex)}):t}}};function Pe({routes:e,notFoundRoute:t,onLocationChange:n}){let a={...window.location};const r=i=>{a={...i}},l=Be({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{a.pathname!=i.target.location.pathname&&n({router:l}),r(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,c,m)=>{i.apply(c,m),a.pathname!=window.location.pathname&&n({router:l}),r(window.location)}}),document.addEventListener("click",i=>{const{target:c}=i,m=c.closest("a");if(!m)return;const v=m.getAttribute("href");v&&!v.startsWith("http")&&!v.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",v),history.pushState({},null,v),r(window.location),["?","#"].includes(v[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:l}),l}const De=({context:e,LayoutDefault:t,config:{base:n=""}={}})=>{const{window:a,bau:r}=e,l=r.state();let i;return({router:c})=>{var g;const m=a.location.pathname.replace(n,""),{title:v,component:b,Layout:u=t}=c.resolve({pathname:m});i!=u&&(i=u,(g=document.getElementById("app"))==null||g.replaceChildren(u({componentState:l}))),l.val=b({}),document.title=`${v} - Rest Countries`}},K=["neutral","primary","success","danger","warning"],Le="light",Te=()=>K.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Oe(e,t={}){const{bau:n,css:a,window:r}=e,{input:l}=n.tags,i=b=>{r.document.documentElement.setAttribute("data-theme",b),localStorage.setItem("theme",b)},c=()=>{try{return localStorage.getItem("theme")}catch{}},m=c();m?i(m):r.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Le);const v=a`
    position: relative;
    display: inline-flex;
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
    ${Te()}
  `;return function(...u){let[{size:g=t.size??"md",variant:x=t.variant??"plain",color:w=t.color??"neutral",...C},...y]=_(u);return l({required:"required",title:"Switch Theme",name:"theme-switch",...C,class:["theme-switch",w,x,g,v,t==null?void 0:t.class,C.class],type:"checkbox",checked:c()=="dark",onclick:z=>{i(z.target.checked?"dark":"light")}},...y)}}const Me=e=>{const{bau:t,css:n}=e,{header:a,h1:r,label:l}=t.tags,i=Oe(e),c=n`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-background-color);
    padding-inline: 3rem;
    padding-block: 1rem;
    box-shadow: 0 0 3px 3px rgb(0 0 0 / 3%);
    h1 {
      font-size: 1.5rem;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      &::after {
        font-size: small;
        content: "Dark Mode";
      }
      &:has(> input:checked) {
        &::after {
          content: "Light Mode";
        }
      }
    }
  `;return()=>a({class:c},r("Where in the world?"),l(i()))},Re=e=>{const{bau:t,css:n}=e,{div:a}=t.tags,r=Me(e);return function({componentState:i}){return a({class:n`
          display: flex;
          min-width: 100vw;
          min-height: 100vh;
          flex-direction: column;
        `},r(),a({style:"flex-grow: 1"},()=>i.val))}},Ie=()=>K.map(e=>`
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
`);function Fe(e,t={}){const{bau:n,css:a}=e,{input:r}=n.tags,l=a`
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
    ${Ie()}
  `;return function(c){var u;const{variant:m=t.variant??"outline",color:v=t.color??"neutral",...b}=c;return r({type:"text",...b,class:["input",t.class,t.size??"md",v,m,l,Array.isArray(c.class)?(u=c.class)==null?void 0:u.join(" "):c.class]})}}function He(e,t={}){const{bau:n,css:a,window:r}=e,l=Fe(e,t);return function(c){const{variant:m=t.variant??"outline",color:v=t.color??"neutral",...b}=c,g=`url('data:image/svg+xml,<svg fill="${r.getComputedStyle(r.document.documentElement).getPropertyValue(m=="solid"?"--font-color-inverse-secondary":"--font-color-secondary")}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,x=a`
      &.inputSearch {
        padding-left: 1.8rem;
        background-image: ${g};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return l({type:"search",...b,color:v,variant:m,class:["inputSearch",t.class,x,b.class]})}}function _e(e,t){const{bau:n,css:a,window:r}=e,{dialog:l}=n.tags,i=a`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...m){let[{contentEl:v,triggerEl:b,onClose:u,...g},...x]=_(m);const w=z=>{y.style.opacity=1,y.showModal();const S=b.getBoundingClientRect(),E=y.getBoundingClientRect();S.x<r.innerWidth/2?y.style.left=S.left+"px":y.style.left=S.right-E.width+"px",S.y<r.innerHeight/2?(y.style.top=S.top+S.height+"px",y.style.height=Math.min(y.scrollHeight,r.innerHeight-S.top-S.height)+"px"):(y.style.top=Math.max(0,S.top-E.height)+"px",y.scrollHeight>S.top&&(y.style.height=S.top+"px"))},C=z=>{const S=()=>{y.close(),y.removeEventListener("transitionend",S)};y.addEventListener("transitionend",S),y.style.opacity=0},y=l({role:"presentation",class:["popover",i,t==null?void 0:t.class,g==null?void 0:g.class],onclick:z=>{z.target===y&&(C(),u==null||u.call())}},v);return y.closeDialog=C,y.openDialog=w,y}}const qe=()=>K.map(e=>`
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
`);function le(e,t={}){const{bau:n,css:a}=e,r=a`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
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
      cursor: pointer;
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
      min-width: 2rem;
      min-height: 2rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }
    & i {
      font-style: normal;
    }
    ${qe()}
  `;return function(...i){var w;let[{size:c=t.size??"md",variant:m=t.variant??"none",color:v=t.color??"none",href:b,...u},...g]=_(i);return(b?n.tags.a:n.tags.button)({...!b&&{type:"button"},...u,class:["button",m,c,v,r,t.class,Array.isArray(u.class)?(w=u.class)==null?void 0:w.join(" "):u.class],href:b},g)}}function Ve(e,t={}){const{bau:n,css:a}=e,{ul:r}=n.tags,l=a`
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
  `;return function(...c){let[{size:m=t.size??"md",variant:v=t.variant??"plain",color:b=t.color??"neutral",...u},...g]=_(c);return r({...u,class:["list",l,b,v,m,t==null?void 0:t.class,u==null?void 0:u.class.join(" ")]},...g)}}const Q={sm:12,md:16,lg:24},We=()=>K.map(e=>`
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
  background-color: transparent;
  & .path {
    stroke: var(--font-color-inverse);
  }
}
`).join(`
`);function Ue(e,t={}){const{bau:n,css:a,keyframes:r}=e,{svg:l,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),c=r`
    100% {
      transform: rotate(360deg);
    }
  `,m=r`
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
  `;return function({size:b=t.size??"md",color:u=t.color??"primary",variant:g=t.variant??"outline",visibility:x=!0,...w}={}){const C=a`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${c} 2s linear infinite;
      width: ${Q[b]};
      height: ${Q[b]};
      & .path {
        stroke-linecap: round;
        animation: ${m} 1.5s ease-in-out infinite;
      }
      ${We()}
    `;return l({class:{deps:[x],renderProp:()=>y=>["spinner",C,u,g,y==!1?"":"visibility",t==null?void 0:t.class,w.class]},version:"1.1",x:"0px",y:"0px",width:Q[b],height:Q[b],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...w},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Ke=()=>K.map(e=>`
& button.plain {
  color: var(--font-color-secondary);
}
& button.plain.${e}::after {
  color: var(--font-color-secondary);
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Xe(e,t={}){const{bau:n,css:a}=e,{div:r,li:l,select:i,option:c}=n.tags,m=le(e),v=_e(e),b=Ve(e),u=a`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
      border: 0;
    }
    dialog {
      outline: none;
    }
    & button {
      &.lg {
        padding: 0.8rem;
      }
      box-shadow: var(--shadow-s);

      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${Ke()}
  `;return function(...x){let[{size:w=t.size??"md",variant:C=t.variant??"outline",color:y=t.color??"neutral",label:z,Option:S,options:E,defaultOption:N,getOptionLabel:L,getOptionValue:R,onSelect:F=()=>{},loading:O,...I},...X]=_(x);const q=Ue(e,{variant:C,color:y,size:w}),H=n.state(N?L(N):z),A=n.state(!1),P=n.state(0),V=()=>{j.openDialog(),j.focus(),A.val=!0},o=()=>{j.closeDialog(),A.val=!1},s=()=>{A.val=!1},d=f=>{j.open?o():V(),f.preventDefault()},h=({option:f,index:D})=>T=>{H.val=L(f),k.value=R(f),k.setCustomValidity(""),P.val=D,o(),F(f),T.preventDefault()},p=f=>{if(j.open)switch(f.preventDefault(),f.key){case"Escape":o();break;case"ArrowDown":P.val<E.length-1?P.val++:P.val=0;break;case"ArrowUp":P.val<=0?P.val=E.length-1:P.val--;break;case"Enter":j.open?(H.val=L(E[P.val]),k.value=R(c),F(E[P.val]),o()):V();break}},B=()=>b({tabindex:"0",class:[y,C]},E.map((f,D)=>l({class:()=>P.val==D&&"active",onclick:h({option:f,index:D})},S(f)))),$=m({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":A,"aria-label":z,onclick:d,color:y,variant:C,size:w,class:O==!0&&"loading",disabled:O},()=>!H.val&&z,H,()=>O==!0&&q({visibility:O})),j=v({triggerEl:$,contentEl:B(),onClose:s}),k=i({...I,"aria-label":z,tabindex:"-1"},c({value:""},"--Select Category--"),E.map(f=>c({value:R(f)},L(f))));return N?k.value=R(N):k.value=I.value,r({...I,class:["select",y,w,u,t==null?void 0:t.class,I==null?void 0:I.class],onkeydown:p},k,$,j)}}function Ge(e){const{bau:t,css:n}=e,{span:a,div:r}=t.tags,l=Xe(e,{color:"neutral",variant:"plain"}),i=[{label:"All"},{label:"Africa"},{label:"Americas"},{label:"Asia"},{label:"Europe"},{label:"Oceania"}],c=v=>r({class:n`
          display: flex;
          justify-content: space-between;

          gap: 0.5rem;
        `},a(v.label),a(v.code)),m=n``;return v=>l({name:"region",class:m,options:i,Option:c,getOptionValue:({label:b})=>b,getOptionLabel:({label:b})=>b,label:"Filter by region",...v})}function ie(e,t={}){const{bau:n,css:a,keyframes:r}=e,{div:l}=n.tags,i=r`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `,c=a`
    background-color: var(--color-emphasis-200);
    position: relative;
    overflow: hidden;
    &::after {
      animation: 2s linear 0.5s infinite normal none running ${i};
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
  `;return function(...v){let[{size:b=t.size??"md",variant:u=t.variant??"plain",color:g=t.color??"neutral",...x},...w]=_(v);return l({...x,class:["skeleton",b,c,t==null?void 0:t.class,x==null?void 0:x.class]},...w)}}const Qe={danger:"⚠",warning:"⚠",success:"✔",primary:"ⓘ",neutral:"ⓘ"},Ye=()=>K.map(e=>`
&.alert {
  &.plain.${e} {
    & .icon {
      color: var(--color-${e});
      
    }
  }
  &.outline.${e} {
    & .icon {
      color: var(--color-${e});
    }
    border: 2px solid var(--color-${e});
  }
}
  `).join(`
`);function ee(e,t={}){const{bau:n,css:a}=e,{div:r,span:l}=n.tags,i=a`
    display: inline-flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    &.sm {
      & .icon {
        font-size: 1.3rem;
      }
    }
    &.lg {
      & .icon {
        font-size: 2.5rem;
      }
    }
    & .icon {
      padding: 0 0.5rem;
      font-size: 2rem;
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
    ${Ye()}
  `,c=le(e),m=({onclick:v})=>c({"aria-label":"Close",onclick:v,class:"button-close"},"✖");return function(...b){let[{size:u=t.size??"md",variant:g=t.variant??"outline",color:x=t.color??"neutral",onRemove:w,...C},...y]=_(b);return r({...C,class:["alert",`alert-${g}`,t.class,g,x,u,i,C.class],role:"alert"},l({class:"icon"},Qe[x]),r({class:"content"},...y),w&&m({onclick:w}))}}function Je(e,{store:t}){const{bau:n,css:a}=e,{a:r,ul:l,li:i,div:c,p:m,img:v,h1:b,figure:u,figcaption:g,strong:x}=n.tags,{getAll:w}=t,C=ie(e),y=ee(e,{color:"danger",variant:"outline"}),z=a`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    > li {
      box-shadow: var(--shadow-s);
      overflow: hidden;
      width: 13rem;
      min-height: 10rem;
      border-radius: 1rem 1rem 0 0;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(4px);
      }
      &:has(> a:focus) {
        outline: 2px solid var(--color-primary);
      }
      > a {
        text-decoration: none;
        color: var(--color);
        outline: none;
      }
      figure {
        > figcaption {
          padding: 1rem;
          > h1 {
            font-size: 1rem;
          }
          > p {
            font-size: 0.7rem;
            line-height: 1.6rem;
          }
        }
        > img {
          height: 10rem;
          object-fit: cover;
          width: 100%;
        }
      }
    }
  `,S=()=>l({class:z},new Array(16).fill("").map(()=>i(C({class:a`
              width: 100%;
              height: 15rem;
            `})))),E=({name:N,flag:L,population:R,region:F,capital:O})=>i(r({href:N,tabindex:"0"},u(v({class:"flag-picture",src:L,alt:N}),g(b(N),m(x("Population: "),R),m(x("Region: "),F),m(x("Capital: "),O)))));return({data:N})=>c(()=>w.loading.val&&S(),()=>w.error.val&&y(w.error.val),l({class:z},N.map(L=>E(L))))}function Ze(e,{store:t}){const{bau:n,css:a}=e,{article:r,p:l,form:i}=n.tags,c=He(e,{size:"lg",color:"neutral",variant:"plain"}),m=n.state(""),v=n.state(""),b=n.derive(()=>{let w=t.getAll.data.val;return m.val&&(w=w.filter(({name:C})=>new RegExp(`${m.val}`,"i").test(C))),v.val&&(w=w.filter(({region:C})=>C==v.val)),w}),u=Ge(e),g=Je(e,{store:t}),x=a`
    padding-inline: 3rem;
    padding-block: 2rem;
    > p {
      margin-block: 1rem;
    }
    .search {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `;return()=>r({class:x},i(l({class:"search"},c({name:"country",placeholder:"Search for a country",size:24,value:m.val,oninput:w=>m.val=w.target.value}),u({defaultOption:{label:v.val},onSelect:w=>{w.label=="All"?v.val="":v.val=w.label}}))),l(()=>g({data:b.val})))}function et(e,{store:t}){const{bau:n,css:a,window:r}=e,{h1:l,article:i,div:c,img:m,figure:v,figcaption:b,strong:u,p:g,section:x,a:w,span:C,ul:y,li:z}=n.tags,{getByName:S,findBorder:E}=t;n.derive(()=>{const A=S.data.val[0];A!=null&&A.borders&&E.run(A.borders)});const N=ie(e),L=ee(e,{color:"danger",variant:"outline"}),R=ee(e,{size:"sm",color:"danger",variant:"outline"}),F=a`
    margin-block: 2rem;
    > figure {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      > img {
        width: 100%;
        margin: auto;
      }
      > figcaption {
        padding: 1rem;
        .country-detail {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          font-size: smaller;
          line-height: 2rem;
        }
      }
    }
  `,O=()=>N({class:a`
        width: 80%;
        height: 1.5rem;
        margin-block: 0.6rem;
      `}),I=()=>i({class:F},v(N({class:a`
            width: 100%;
            height: 15rem;
          `}),b(O(),g({class:"country-detail"},x(new Array(4).fill("").map(()=>g(O()))),x(new Array(3).fill("").map(()=>g(O()))))))),X=()=>c({class:a`
          display: inline-flex;
          align-items: flex-start;
          gap: 1rem;
          > ul {
            list-style: none;
            display: inline-flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 0.5rem;
            > li {
              padding-inline: 0.6rem;
              box-shadow: var(--shadow-s);
              a {
                text-decoration: none;
                font-size: 0.75rem;
                text-wrap: nowrap;
              }
            }
          }
        `},u("Borders:"),()=>E.loading.val&&y(new Array(3).fill("").map(()=>z(N({class:a`
                  width: 4rem;
                  height: 1.5rem;
                `})))),()=>E.error.val&&R(E.error.val),()=>y(E.data.val.map(({name:A})=>z(w({href:A.common},A.common))))),q=({name:A,flag:P,population:V,region:o,subregion:s,capital:d,currencies:h,languages:p,topLevelDomain:B})=>i({class:F},v(m({class:"flag-picture",src:P,alt:A}),b(l(A),g({class:"country-detail"},x(g(u("Native Name: "),A),g(u("Population: "),V),g(u("Region: "),o),g(u("Sub Region: "),s),g(u("Capital: "),d)),x(g(u("Top Level Domain: "),B.join(", ")),g(u("Currencies: "),h.map(({name:$})=>$).join(", ")),g(u("Languages: "),p.map(({name:$})=>$).join(", ")))),g(X())))),H=()=>w({class:a`
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          padding-inline: 1rem;
          border-radius: 0.5rem;
          gap: 0.5rem;
          box-shadow: var(--shadow-s);
          span {
            font-size: 1.7rem;
          }
        `,onclick:()=>{r.history.back()}},C("←"),"BACK");return({})=>c({class:a`
          padding: 2rem;
          > p {
            margin-bottom: 1rem;
          }
        `},g(H()),g(()=>S.error.val&&L(S.error.val)),()=>S.loading.val&&I(),()=>S.data.val[0]&&q(S.data.val[0]))}function tt(e){const{bau:t}=e;return function(a,r){const l=t.state(!1),i=t.state(!1),c=t.state((r==null?void 0:r.initialState)??""),m=t.state("");return{loading:l,data:c,error:m,completed:i,run:async(...u)=>{if(!l.val)try{t.batch(()=>{m.val="",l.val=!0,i.val=!1});const g=await a(...u);return t.batch(()=>{c.val=g,i.val=!0,l.val=!1}),g}catch(g){throw t.batch(()=>{m.val=g.message,i.val=!0,l.val=!1}),g}},reset:async()=>t.batch(()=>{m.val="",l.val=!1,i.val=!1,c.val=(r==null?void 0:r.initialState)??""})}}}function rt(e){const t=tt(e),n=async({url:a})=>{console.log(a);const r=await fetch(a,{method:"get",headers:{"Content-Type":"application/json"}});if(r.ok)return await r.json();throw Error(r.statusText||String(r.status))};return{getAll:t(()=>n({url:"https://restcountries.com/v2/all?fields=name,capital,flag,population,region"}),{initialState:[]}),getByName:t(({name:a})=>n({url:`https://restcountries.com/v2/name/${a}`})),findBorder:t(a=>n({url:`https://restcountries.com/v3.1/alpha?codes=${a.join(",")}&fields=name,`}),{initialState:[]})}}const nt=({context:e})=>{const t=rt(e),n=et(e,{store:t}),a=Ze(e,{store:t});return[{path:"",action:r=>(t.getAll.data.val.length==0&&t.getAll.run(),{routerContext:r,title:"Countries",component:()=>a()})},{path:"(?<country>.[^/]+)",action:({match:{groups:r}})=>(t.getByName.reset(),t.findBorder.reset(),t.getByName.run({name:r.country}),{title:`${r.country}`,component:()=>n(r)})}]},ce={base:"/bau/frontendmentor/rest-countries"},Z=ze({config:ce});Pe({routes:nt({context:Z}),onLocationChange:De({context:Z,config:ce,LayoutDefault:Re(Z)})});
