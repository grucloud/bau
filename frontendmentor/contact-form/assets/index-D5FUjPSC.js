(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))f(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const g of h.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&f(g)}).observe(document,{childList:!0,subtree:!0});function u(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerPolicy&&(h.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?h.credentials="include":i.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function f(i){if(i.ep)return;i.ep=!0;const h=u(i);fetch(i.href,h)}})();let _=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>_(e)=="Object",Q=e=>_(e)=="Function",L=e=>["Object","Array"].includes(_(e)),X=Object.getPrototypeOf,H=e=>k(e)?e.val:e,Y=e=>Array.isArray(e)?e:[e],k=e=>e==null?void 0:e.__isState,se=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!k(e[0])&&ae(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:u}=c,f,i=new Set,h=[],g,m=t=>u.createElement(t),$=(t,l,r)=>{let n=g;g=l;try{return t(r)}catch(o){return console.error(o),r}finally{g=n}},F=()=>{f||(f=c.requestAnimationFrame(()=>{i.forEach(t=>{t.bindings=t.bindings.filter(({element:l})=>{var r;return(r=Array.isArray(l)?l[0]:l)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&i.delete(t)}),f=void 0}))},A=(t,l)=>{!h.length&&c.requestAnimationFrame(I),h.push([t,l])};const I=()=>{let t=0,l=h.length;do{for(let r of new Set(h.slice(t,l).flatMap(([n])=>n.listeners)))D(r.computed,r.state);t=l,l=h.length}while(t<l);for(let r of new Set(h.flatMap(([n,o])=>n.bindings.map(p=>(p.op=o,p)))))T(r);h=[],F()};let T=t=>{var j;const{deps:l,element:r,renderInferred:n,render:o,renderItem:p,isAttribute:d,op:v=[]}=t,[a,s,b,y,w]=v;if(a&&p)(j=z(r,b,(...S)=>C(p(...S)),s,y,w)[a])==null||j.call();else{let S=n?n({element:r}):o({element:r,renderItem:p})(...l.map(H));if(S!==r&&!d){let E=Y(t.element=C(S)),q=Y(r),x=0;for(;x<q.length&&x<E.length;x++)q[x].replaceWith(C(E[x]));let M=x;for(;E.length>M;)E[M-1].after(E[M]),M++;for(;q.length>x;)q[x].remove(),x++}}},N=(t,l,r=[])=>({get(n,o,p){var d,v;if((d=g==null?void 0:g.g)==null||d.add(t),o==="_isProxy")return!0;if(!((v=n[o])!=null&&v._isProxy)&&!k(n[o])&&L(n[o]))n[o]=new Proxy(n[o],N(t,l,[...r,o]));else if(se.includes(o)){let a=n[o];return(...s)=>{let b=a.apply(n,s);return A(t,[o,b,s,l,r]),b}}return Reflect.get(n,o,p)},set(n,o,p,d){let v=Reflect.set(n,o,p,d);return A(t,["setItem",v,{prop:o,value:p},l,[...r,o]]),v}}),O=(t,l)=>new Proxy(l,N(t,l)),z=(t,l,r,n,o,p)=>{let d=()=>{if(n.length==0)t.textContent="";else{for(var a=0;a<n.length&&a<t.children.length;a++){const b=t.children[a];b!=null&&b.bauUpdate?b.bauUpdate(b,n[a]):b.replaceWith(r(n[a],a))}let s=t.children[a];if(s)for(;s;){const b=s.nextSibling;s.remove(),s=b}else for(;a<n.length;a++)t.appendChild(r(n[a],a))}},v=a=>t[a]&&t.removeChild(t[a]);return{assign:d,sort:d,reverse:d,setItem:()=>{let a=p[0],s=t.children[a],b=o[a];s&&(s!=null&&s.bauUpdate?s.bauUpdate(s,b):s.replaceWith(r(b,a)))},push:()=>{for(let a=0;a<l.length;a++)t.appendChild(r(l[a],o.length+a))},unshift:()=>{for(let a=l.length-1;a>=0;a--)t.prepend(r(l[a]))},pop:()=>v("lastChild"),shift:()=>v("firstChild"),splice:()=>{const{length:a}=t.children;let[s,b=a,...y]=l;for(let w=s>=0?Math.min(s+b-1,a-1):a-1;w>=(s>=0?s:a+s);w--)t.children[w].remove();if(y.length){let w=y.map((j,S)=>r(j,s+S));t.children[s]?t.children[s].before(...w):t.append(...w)}}}},G=(t,{onUpdate:l,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=g==null?void 0:g.g)==null||o.add(n),n.valProxy??(n.valProxy=L(t)?O(n,t):t,n.valProxy)},set val(n){var d;let o=this,p=o.rawVal;(d=g==null?void 0:g.s)==null||d.add(o),l==null||l(p,n),o.rawVal=n,L(n)?(o.valProxy=O(o,n),A(o,["assign",n])):n!==p&&(o.valProxy=n,o.bindings.length+o.listeners.length&&A(o))}}),C=t=>{if(t==null||t===!1){let l=m("span");return l.style.display="none",l}else return t.nodeType?t:Array.isArray(t)?t.map(C):u.createTextNode(t)},D=(t,l)=>{let r={g:new Set,s:new Set};return l.val=$(t,r),r},te=(t,l)=>{let r=G(void 0,l),n=D(t,r);r.computed=!0;let o={computed:t,state:r};for(let p of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(v=>!n.g.has(v.state)))))p.listeners.push(o);return r},R=(t,l=[])=>{for(let r of l)if(Array.isArray(r))R(t,r);else if(r!=null){let n=k(r)?P({deps:[r],render:()=>o=>o}):Q(r)?J(r):C(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},U={},W=(t,l)=>t&&(Object.getOwnPropertyDescriptor(t,l)??W(X(t),l)),re=(t,l,r)=>{var n;return U[t+","+l]??(U[t+","+l]=((n=W(r,l))==null?void 0:n.set)??0)},oe=(t,l)=>new c.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(p=>p===t&&(l({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),ne=(t,l)=>new c.MutationObserver((r,n)=>r.forEach(o=>l({record:o,element:t}))).observe(t,{childList:!0}),V=t=>new Proxy(function(r,...n){var v;let[o,p]=ie(n),d=t?u.createElementNS(t,r):m(r);for(let[a,s]of Object.entries(o))if(a=="bauUpdate")d[a]=s;else if(!a.startsWith("bau")){let b=re(r,a,X(d))?y=>y!==void 0&&(d[a]=y):y=>d.setAttribute(a,Array.isArray(y)?y.filter(w=>w).join(" "):y);s==null||(k(s)?P({deps:[s],render:()=>()=>(b(s.val),d)},!0):Q(s)&&(!a.startsWith("on")||s.isDerived)?J(()=>(b(s({element:d})),d),!0):s.renderProp?P({deps:s.deps,render:()=>()=>(b(s.renderProp({element:d})(...s.deps.map(H))),d)},!0):b(s))}return o.bauChildMutated&&ne(d,o.bauChildMutated),R(d,p),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(v=o.bauCreated)==null||v.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>oe(d,o.bauUnmounted)),d},{get:(l,r)=>l.bind(void 0,r)}),K=(t,l,r,n)=>{t.element=C(r),t.isAttribute=n;for(let o of l.g)k(o)&&(i.add(o),o.bindings.push(t));return t.element},J=(t,l)=>{let r={g:new Set,s:new Set},n=$(t,r,{});return K({renderInferred:t},r,n,l)},P=({deps:t,element:l,render:r,renderItem:n},o)=>K({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:l,renderItem:n})(...t.map(H)),o),le=(t,l,r)=>P({deps:[t],render:({renderItem:n})=>o=>{for(let p=0;p<o.length;p++)l.appendChild(n(o[p],p));return l},renderItem:r});return{tags:V(),tagsNS:V,state:G,bind:P,loop:le,derive:te,stateSet:i}}const de=e=>{let c=0,u=11;for(;c<e.length;)u=101*u+e.charCodeAt(c++)>>>0;return"bau"+u},ue=(e,c,u,f)=>{const i=e.createElement("style");i.id=u,i.append(f),(c??e.head).append(i)},he=(e,c)=>e.reduce((u,f,i)=>u+f+(c[i]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const u=f=>(i,...h)=>{const g=he(i,h),m=de(g);return!c.getElementById(m)&&ue(c,e==null?void 0:e.target,m,f(m,g)),m};return{css:u((f,i)=>`.${f} { ${i} }`),keyframes:u((f,i)=>`@keyframes ${f} { ${i} }`),createGlobalStyles:u((f,i)=>i)}}const B=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],pe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],ge=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,me=e=>`var(--color-${e}-lightest)`,ve=()=>B.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${me(e)};
}
.solid.${e} {
  background-color: ${be(e)};
}
`).join(`
`),ye=()=>B.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),Z=({dark:e})=>new Array(10).fill("").map((c,u)=>`--color-emphasis-${u*100}: var(--color-gray-${e?1e3-u*100:u*100});`).join(`
`),xe=([e,{h:c,s:u,l:f}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${f};`,`--color-${e}-base-s: ${u};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${u} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...pe.map(([i,h])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${h}));`),...ge.map(([i,h])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${h}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=B}={}){e`
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
      ${c.map(([u,f])=>xe([u,f])).join(`
`)}
      ${$e()}
      ${Z({})}
      ${ve()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color: var(--color-content);
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
      ${ye()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Z({dark:!0})};
    }
  `}function Ce(e){const c=ce(),u=fe({target:window.document.getElementById("bau-css")});return Ae(u),{bau:c,...u,tr:f=>f,window,...e}}function Se(e){const{bau:c,css:u}=e,{h1:f,form:i,span:h,p:g,label:m,input:$,div:F,button:A,textarea:I}=c.tags,T=u`
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    background-color: var(--white);
    h1 {
      font-size: 1.3rem;
    }
    p {
      margin-block: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .radio-label-group {
      width: 100%;
      > div {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    textarea {
      height: 4rem;
      padding: 0.2rem;
    }
    @media (max-width: 600px) {
    }
  `,N=O=>{O.preventDefault();const z=Object.fromEntries(new FormData(O.currentTarget));alert(JSON.stringify(z))};return()=>i({class:T,onsubmit:N},f("Contact Us"),g(m(h("First Name"),$({type:"text",name:"firstName",required:!0,size:32})),m(h("Last Name"),$({type:"text",name:"lastName",required:!0,size:32}))),g(m(h("Email"),$({type:"email",name:"email",required:!0}))),g(m({class:"radio-label-group"},h("Query Type"),F(m($({type:"radio",name:"GeneralInquiry",required:!0}),"General Inquiry"),m($({type:"radio",name:"GeneralInquiry"}),"Support Request")))),g(m(h("Message"),I({required:!0}))),g(m($({type:"checkbox",required:!0}),h("I consent being contacted by the team"))),A({type:"submit"},"Submit"))}const ke=Ce(),Oe=e=>{const{bau:c}=e,{main:u}=c.tags,f=Se(e);return function(){return u(f())}},Pe=Oe(ke);var ee;(ee=document.getElementById("app"))==null||ee.replaceChildren(Pe());
