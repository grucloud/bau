(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))f(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const b of u.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&f(b)}).observe(document,{childList:!0,subtree:!0});function h(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function f(i){if(i.ep)return;i.ep=!0;const u=h(i);fetch(i.href,u)}})();let B=e=>Object.prototype.toString.call(e??0).slice(8,-1),se=e=>B(e)=="Object",Q=e=>B(e)=="Function",_=e=>["Object","Array"].includes(B(e)),X=Object.getPrototypeOf,q=e=>S(e)?e.val:e,Y=e=>Array.isArray(e)?e:[e],S=e=>e==null?void 0:e.__isState,ae=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!S(e[0])&&se(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:h}=c,f,i=new Set,u=[],b,w=t=>h.createElement(t),O=(t,l,r)=>{let n=b;b=l;try{return t(r)}catch(o){return console.error(o),r}finally{b=n}},I=()=>{f||(f=c.requestAnimationFrame(()=>{i.forEach(t=>{t.bindings=t.bindings.filter(({element:l})=>{var r;return(r=Array.isArray(l)?l[0]:l)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&i.delete(t)}),f=void 0}))},x=(t,l)=>{!u.length&&c.requestAnimationFrame(F),u.push([t,l])};const F=()=>{let t=0,l=u.length;do{for(let r of new Set(u.slice(t,l).flatMap(([n])=>n.listeners)))U(r.computed,r.state);t=l,l=u.length}while(t<l);for(let r of new Set(u.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))T(r);u=[],I()};let T=t=>{var N;const{deps:l,element:r,renderInferred:n,render:o,renderItem:g,isAttribute:d,op:m=[]}=t,[s,a,p,v,y]=m;if(s&&g)(N=z(r,p,(...C)=>A(g(...C)),a,v,y)[s])==null||N.call();else{let C=n?n({element:r}):o({element:r,renderItem:g})(...l.map(q));if(C!==r&&!d){let P=Y(t.element=A(C)),L=Y(r),$=0;for(;$<L.length&&$<P.length;$++)L[$].replaceWith(A(P[$]));let M=$;for(;P.length>M;)P[M-1].after(P[M]),M++;for(;L.length>$;)L[$].remove(),$++}}},E=(t,l,r=[])=>({get(n,o,g){var d,m;if((d=b==null?void 0:b.g)==null||d.add(t),o==="_isProxy")return!0;if(!((m=n[o])!=null&&m._isProxy)&&!S(n[o])&&_(n[o]))n[o]=new Proxy(n[o],E(t,l,[...r,o]));else if(ae.includes(o)){let s=n[o];return(...a)=>{let p=s.apply(n,a);return x(t,[o,p,a,l,r]),p}}return Reflect.get(n,o,g)},set(n,o,g,d){let m=Reflect.set(n,o,g,d);return x(t,["setItem",m,{prop:o,value:g},l,[...r,o]]),m}}),H=(t,l)=>new Proxy(l,E(t,l)),z=(t,l,r,n,o,g)=>{let d=()=>{if(n.length==0)t.textContent="";else{for(var s=0;s<n.length&&s<t.children.length;s++){const p=t.children[s];p!=null&&p.bauUpdate?p.bauUpdate(p,n[s]):p.replaceWith(r(n[s],s))}let a=t.children[s];if(a)for(;a;){const p=a.nextSibling;a.remove(),a=p}else for(;s<n.length;s++)t.appendChild(r(n[s],s))}},m=s=>t[s]&&t.removeChild(t[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=g[0],a=t.children[s],p=o[s];a&&(a!=null&&a.bauUpdate?a.bauUpdate(a,p):a.replaceWith(r(p,s)))},push:()=>{for(let s=0;s<l.length;s++)t.appendChild(r(l[s],o.length+s))},unshift:()=>{for(let s=l.length-1;s>=0;s--)t.prepend(r(l[s]))},pop:()=>m("lastChild"),shift:()=>m("firstChild"),splice:()=>{const{length:s}=t.children;let[a,p=s,...v]=l;for(let y=a>=0?Math.min(a+p-1,s-1):s-1;y>=(a>=0?a:s+a);y--)t.children[y].remove();if(v.length){let y=v.map((N,C)=>r(N,a+C));t.children[a]?t.children[a].before(...y):t.append(...y)}}}},j=(t,{onUpdate:l,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=b==null?void 0:b.g)==null||o.add(n),n.valProxy??(n.valProxy=_(t)?H(n,t):t,n.valProxy)},set val(n){var d;let o=this,g=o.rawVal;(d=b==null?void 0:b.s)==null||d.add(o),l==null||l(g,n),o.rawVal=n,_(n)?(o.valProxy=H(o,n),x(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&x(o))}}),A=t=>{if(t==null||t===!1){let l=w("span");return l.style.display="none",l}else return t.nodeType?t:Array.isArray(t)?t.map(A):h.createTextNode(t)},U=(t,l)=>{let r={g:new Set,s:new Set};return l.val=O(t,r),r},te=(t,l)=>{let r=j(void 0,l),n=U(t,r);r.computed=!0;let o={computed:t,state:r};for(let g of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(m=>!n.g.has(m.state)))))g.listeners.push(o);return r},W=(t,l=[])=>{for(let r of l)if(Array.isArray(r))W(t,r);else if(r!=null){let n=S(r)?k({deps:[r],render:()=>o=>o}):Q(r)?J(r):A(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},G={},K=(t,l)=>t&&(Object.getOwnPropertyDescriptor(t,l)??K(X(t),l)),re=(t,l,r)=>{var n;return G[t+","+l]??(G[t+","+l]=((n=K(r,l))==null?void 0:n.set)??0)},oe=(t,l)=>new c.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===t&&(l({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),ne=(t,l)=>new c.MutationObserver((r,n)=>r.forEach(o=>l({record:o,element:t}))).observe(t,{childList:!0}),V=t=>new Proxy(function(r,...n){var m;let[o,g]=ie(n),d=t?h.createElementNS(t,r):w(r);for(let[s,a]of Object.entries(o))if(s=="bauUpdate")d[s]=a;else if(!s.startsWith("bau")){let p=re(r,s,X(d))?v=>v!==void 0&&(d[s]=v):v=>d.setAttribute(s,Array.isArray(v)?v.filter(y=>y).join(" "):v);a==null||(S(a)?k({deps:[a],render:()=>()=>(p(a.val),d)},!0):Q(a)&&(!s.startsWith("on")||a.isDerived)?J(()=>(p(a({element:d})),d),!0):a.renderProp?k({deps:a.deps,render:()=>()=>(p(a.renderProp({element:d})(...a.deps.map(q))),d)},!0):p(a))}return o.bauChildMutated&&ne(d,o.bauChildMutated),W(d,g),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(m=o.bauCreated)==null||m.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>oe(d,o.bauUnmounted)),d},{get:(l,r)=>l.bind(void 0,r)}),D=(t,l,r,n)=>{t.element=A(r),t.isAttribute=n;for(let o of l.g)S(o)&&(i.add(o),o.bindings.push(t));return t.element},J=(t,l)=>{let r={g:new Set,s:new Set},n=O(t,r,{});return D({renderInferred:t},r,n,l)},k=({deps:t,element:l,render:r,renderItem:n},o)=>D({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:l,renderItem:n})(...t.map(q)),o),le=(t,l,r)=>k({deps:[t],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)l.appendChild(n(o[g],g));return l},renderItem:r});return{tags:V(),tagsNS:V,state:j,bind:k,loop:le,derive:te,stateSet:i}}const de=e=>{let c=0,h=11;for(;c<e.length;)h=101*h+e.charCodeAt(c++)>>>0;return"bau"+h},he=(e,c,h,f)=>{const i=e.createElement("style");i.id=h,i.append(f),(c??e.head).append(i)},ue=(e,c)=>e.reduce((h,f,i)=>h+f+(c[i]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const h=f=>(i,...u)=>{const b=ue(i,u),w=de(b);return!c.getElementById(w)&&he(c,e==null?void 0:e.target,w,f(w,b)),w};return{css:h((f,i)=>`.${f} { ${i} }`),keyframes:h((f,i)=>`@keyframes ${f} { ${i} }`),createGlobalStyles:h((f,i)=>i)}}const R=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,me=e=>`var(--color-${e}-lightest)`,ve=()=>R.map(([e])=>`
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
`),ye=()=>R.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),Z=({dark:e})=>new Array(10).fill("").map((c,h)=>`--color-emphasis-${h*100}: var(--color-gray-${e?1e3-h*100:h*100});`).join(`
`),xe=([e,{h:c,s:h,l:f}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${f};`,`--color-${e}-base-s: ${h};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${h} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ge.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),...pe.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=R}={}){e`
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
  `}function Ce(e){const c=ce(),h=fe({target:window.document.getElementById("bau-css")});return Ae(h),{bau:c,...h,tr:f=>f,window,...e}}function Se(e){const{bau:c,css:h}=e,{h1:f,a:i,p:u,article:b,img:w,figure:O,figcaption:I,ul:x,li:F}=c.tags,T=[{name:"GitHub",href:"https://github.com"},{name:"LinkedIn",href:"https://linkedin.com"},{name:"Instagram",href:"https://instagram.com"}],E=h`
    margin: auto;
    max-width: 700px;
    padding: 1.5rem;
    display: flex;
    max-width: 500px;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--grey-800);
    border-radius: 1rem;
    figure {
      display: flex;
      flex-direction: column;
      .profile-picture {
        width: 96px;
        border-radius: 50%;
        margin: auto;
      }
      figcaption {
        text-align: center;
        .location {
          color: var(--green);
        }
      }
    }
    p {
      text-align: center;
    }
    ul {
      align-self: stretch;
      padding: 0;
      li {
        list-style: none;
        background-color: var(--grey-700);
        border-radius: 0.5rem;
        margin: 1rem 0;
        display: flex;
        a {
          padding: 0.4rem 0;
          width: 100%;
          color: white;
          text-decoration: none;
          font-weight: 500;
          text-align: center;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `;return function(){return b({class:E},O(w({class:"profile-picture",src:"./assets/images/avatar-jessica.jpeg",alt:"Jessica Rendal"}),I(f("Jessica Rendal"),u({class:"location"},"London United Kingdom"))),u("Front-end developper and avid reader."),x(T.map(({name:z,href:j})=>F(i({href:j},z)))))}}const ke=Ce(),Pe=e=>{const{bau:c}=e,{main:h}=c.tags,f=Se(e);return function(){return h(f())}},Oe=Pe(ke);var ee;(ee=document.getElementById("app"))==null||ee.replaceChildren(Oe());
