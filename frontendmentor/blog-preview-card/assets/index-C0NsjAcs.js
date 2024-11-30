(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))f(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const b of u.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&f(b)}).observe(document,{childList:!0,subtree:!0});function h(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function f(i){if(i.ep)return;i.ep=!0;const u=h(i);fetch(i.href,u)}})();let B=e=>Object.prototype.toString.call(e??0).slice(8,-1),se=e=>B(e)=="Object",Y=e=>B(e)=="Function",L=e=>["Object","Array"].includes(B(e)),J=Object.getPrototypeOf,F=e=>S(e)?e.val:e,Q=e=>Array.isArray(e)?e:[e],S=e=>e==null?void 0:e.__isState,ae=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!S(e[0])&&se(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:h}=c,f,i=new Set,u=[],b,w=r=>h.createElement(r),k=(r,l,t)=>{let n=b;b=l;try{return r(t)}catch(o){return console.error(o),t}finally{b=n}},N=()=>{f||(f=c.requestAnimationFrame(()=>{i.forEach(r=>{r.bindings=r.bindings.filter(({element:l})=>{var t;return(t=Array.isArray(l)?l[0]:l)==null?void 0:t.isConnected}),!r.bindings.length&&!r.computed&&i.delete(r)}),f=void 0}))},x=(r,l)=>{!u.length&&c.requestAnimationFrame(T),u.push([r,l])};const T=()=>{let r=0,l=u.length;do{for(let t of new Set(u.slice(r,l).flatMap(([n])=>n.listeners)))G(t.computed,t.state);r=l,l=u.length}while(r<l);for(let t of new Set(u.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))z(t);u=[],N()};let z=r=>{var E;const{deps:l,element:t,renderInferred:n,render:o,renderItem:g,isAttribute:d,op:m=[]}=r,[s,a,p,v,y]=m;if(s&&g)(E=ee(t,p,(...A)=>C(g(...A)),a,v,y)[s])==null||E.call();else{let A=n?n({element:t}):o({element:t,renderItem:g})(...l.map(F));if(A!==t&&!d){let O=Q(r.element=C(A)),j=Q(t),$=0;for(;$<j.length&&$<O.length;$++)j[$].replaceWith(C(O[$]));let M=$;for(;O.length>M;)O[M-1].after(O[M]),M++;for(;j.length>$;)j[$].remove(),$++}}},H=(r,l,t=[])=>({get(n,o,g){var d,m;if((d=b==null?void 0:b.g)==null||d.add(r),o==="_isProxy")return!0;if(!((m=n[o])!=null&&m._isProxy)&&!S(n[o])&&L(n[o]))n[o]=new Proxy(n[o],H(r,l,[...t,o]));else if(ae.includes(o)){let s=n[o];return(...a)=>{let p=s.apply(n,a);return x(r,[o,p,a,l,t]),p}}return Reflect.get(n,o,g)},set(n,o,g,d){let m=Reflect.set(n,o,g,d);return x(r,["setItem",m,{prop:o,value:g},l,[...t,o]]),m}}),_=(r,l)=>new Proxy(l,H(r,l)),ee=(r,l,t,n,o,g)=>{let d=()=>{if(n.length==0)r.textContent="";else{for(var s=0;s<n.length&&s<r.children.length;s++){const p=r.children[s];p!=null&&p.bauUpdate?p.bauUpdate(p,n[s]):p.replaceWith(t(n[s],s))}let a=r.children[s];if(a)for(;a;){const p=a.nextSibling;a.remove(),a=p}else for(;s<n.length;s++)r.appendChild(t(n[s],s))}},m=s=>r[s]&&r.removeChild(r[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=g[0],a=r.children[s],p=o[s];a&&(a!=null&&a.bauUpdate?a.bauUpdate(a,p):a.replaceWith(t(p,s)))},push:()=>{for(let s=0;s<l.length;s++)r.appendChild(t(l[s],o.length+s))},unshift:()=>{for(let s=l.length-1;s>=0;s--)r.prepend(t(l[s]))},pop:()=>m("lastChild"),shift:()=>m("firstChild"),splice:()=>{const{length:s}=r.children;let[a,p=s,...v]=l;for(let y=a>=0?Math.min(a+p-1,s-1):s-1;y>=(a>=0?a:s+a);y--)r.children[y].remove();if(v.length){let y=v.map((E,A)=>t(E,a+A));r.children[a]?r.children[a].before(...y):r.append(...y)}}}},q=(r,{onUpdate:l,name:t}={})=>({name:t,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=b==null?void 0:b.g)==null||o.add(n),n.valProxy??(n.valProxy=L(r)?_(n,r):r,n.valProxy)},set val(n){var d;let o=this,g=o.rawVal;(d=b==null?void 0:b.s)==null||d.add(o),l==null||l(g,n),o.rawVal=n,L(n)?(o.valProxy=_(o,n),x(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&x(o))}}),C=r=>{if(r==null||r===!1){let l=w("span");return l.style.display="none",l}else return r.nodeType?r:Array.isArray(r)?r.map(C):h.createTextNode(r)},G=(r,l)=>{let t={g:new Set,s:new Set};return l.val=k(r,t),t},re=(r,l)=>{let t=q(void 0,l),n=G(r,t);t.computed=!0;let o={computed:r,state:t};for(let g of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(m=>!n.g.has(m.state)))))g.listeners.push(o);return t},W=(r,l=[])=>{for(let t of l)if(Array.isArray(t))W(r,t);else if(t!=null){let n=S(t)?P({deps:[t],render:()=>o=>o}):Y(t)?K(t):C(t);Array.isArray(n)?r.append(...n):r.appendChild(n)}},D={},R=(r,l)=>r&&(Object.getOwnPropertyDescriptor(r,l)??R(J(r),l)),te=(r,l,t)=>{var n;return D[r+","+l]??(D[r+","+l]=((n=R(t,l))==null?void 0:n.set)??0)},oe=(r,l)=>new c.MutationObserver((t,n)=>{t.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===r&&(l({element:r}),n.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),ne=(r,l)=>new c.MutationObserver((t,n)=>t.forEach(o=>l({record:o,element:r}))).observe(r,{childList:!0}),U=r=>new Proxy(function(t,...n){var m;let[o,g]=ie(n),d=r?h.createElementNS(r,t):w(t);for(let[s,a]of Object.entries(o))if(s=="bauUpdate")d[s]=a;else if(!s.startsWith("bau")){let p=te(t,s,J(d))?v=>v!==void 0&&(d[s]=v):v=>d.setAttribute(s,Array.isArray(v)?v.filter(y=>y).join(" "):v);a==null||(S(a)?P({deps:[a],render:()=>()=>(p(a.val),d)},!0):Y(a)&&(!s.startsWith("on")||a.isDerived)?K(()=>(p(a({element:d})),d),!0):a.renderProp?P({deps:a.deps,render:()=>()=>(p(a.renderProp({element:d})(...a.deps.map(F))),d)},!0):p(a))}return o.bauChildMutated&&ne(d,o.bauChildMutated),W(d,g),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(m=o.bauCreated)==null||m.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>oe(d,o.bauUnmounted)),d},{get:(l,t)=>l.bind(void 0,t)}),V=(r,l,t,n)=>{r.element=C(t),r.isAttribute=n;for(let o of l.g)S(o)&&(i.add(o),o.bindings.push(r));return r.element},K=(r,l)=>{let t={g:new Set,s:new Set},n=k(r,t,{});return V({renderInferred:r},t,n,l)},P=({deps:r,element:l,render:t,renderItem:n},o)=>V({deps:r,render:t,renderItem:n},{g:new Set(r),s:new Set},t({element:l,renderItem:n})(...r.map(F)),o),le=(r,l,t)=>P({deps:[r],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)l.appendChild(n(o[g],g));return l},renderItem:t});return{tags:U(),tagsNS:U,state:q,bind:P,loop:le,derive:re,stateSet:i}}const de=e=>{let c=0,h=11;for(;c<e.length;)h=101*h+e.charCodeAt(c++)>>>0;return"bau"+h},he=(e,c,h,f)=>{const i=e.createElement("style");i.id=h,i.append(f),(c??e.head).append(i)},ue=(e,c)=>e.reduce((h,f,i)=>h+f+(c[i]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const h=f=>(i,...u)=>{const b=ue(i,u),w=de(b);return!c.getElementById(w)&&he(c,e==null?void 0:e.target,w,f(w,b)),w};return{css:h((f,i)=>`.${f} { ${i} }`),keyframes:h((f,i)=>`@keyframes ${f} { ${i} }`),createGlobalStyles:h((f,i)=>i)}}const I=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,me=e=>`var(--color-${e}-lightest)`,ve=()=>I.map(([e])=>`
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
`),ye=()=>I.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),X=({dark:e})=>new Array(10).fill("").map((c,h)=>`--color-emphasis-${h*100}: var(--color-gray-${e?1e3-h*100:h*100});`).join(`
`),xe=([e,{h:c,s:h,l:f}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${f};`,`--color-${e}-base-s: ${h};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${h} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ge.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),...pe.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ce({createGlobalStyles:e},{colorPalette:c=I}={}){e`
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
      ${c.map(([h,f])=>xe([h,f])).join(`
`)}
      ${$e()}
      ${X({})}
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
      --brightness-hover-reverse: 70% ${X({dark:!0})};
    }
  `}function Ae(e){const c=ce(),h=fe({target:window.document.getElementById("bau-css")});return Ce(h),{bau:c,...h,tr:f=>f,window,...e}}function Se(e){const{bau:c,css:h}=e,{h1:f,h3:i,div:u,p:b,article:w,img:k,figure:N,figcaption:x,span:T}=c.tags,z=h`
    border: 1px solid var(--Black);
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-radius: 0.6rem;
    background-color: var(--White);
    padding: 1rem;
    box-shadow: 10px 10px;
    img {
      border-radius: 0.6rem;
    }
    .badge {
      background-color: var(--Yellow);
      padding: 0.4rem;
      border-radius: 0.3rem;
      font-size: smaller;
      font-weight: bolder;
    }
    .published-time {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--Grey);
    }
    figure {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 36px;
      }
      h3 {
        font-size: 1rem;
        font-weight: bold;
      }
    }
  `;return function(){return w({class:z},k({src:"./assets/images/illustration-article.svg"}),u(T({class:"badge"},"Learning")),u({class:"published-time"},"Published 21 Dec 2023"),f("HTML & CSS foundations"),b("These languages are the backbone of every website, defining structure, content, and presentation."),N(k({class:"profile-picture",src:"./assets/images/image-avatar.webp",alt:"Greg Hooper"}),x(i("Greg Hooper"))))}}const ke=Ae(),Pe=e=>{const{bau:c}=e,{main:h}=c.tags,f=Se(e);return function(){return h(f())}},Oe=Pe(ke);var Z;(Z=document.getElementById("app"))==null||Z.replaceChildren(Oe());
