(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))h(a);new MutationObserver(a=>{for(const f of a)if(f.type==="childList")for(const m of f.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&h(m)}).observe(document,{childList:!0,subtree:!0});function u(a){const f={};return a.integrity&&(f.integrity=a.integrity),a.referrerPolicy&&(f.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?f.credentials="include":a.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function h(a){if(a.ep)return;a.ep=!0;const f=u(a);fetch(a.href,f)}})();let _=e=>Object.prototype.toString.call(e??0).slice(8,-1),se=e=>_(e)=="Object",J=e=>_(e)=="Function",T=e=>["Object","Array"].includes(_(e)),Q=Object.getPrototypeOf,I=e=>S(e)?e.val:e,X=e=>Array.isArray(e)?e:[e],S=e=>e==null?void 0:e.__isState,ae=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!S(e[0])&&se(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:u}=c,h,a=new Set,f=[],m,w=r=>u.createElement(r),O=(r,l,t)=>{let n=m;m=l;try{return r(t)}catch(o){return console.error(o),t}finally{m=n}},F=()=>{h||(h=c.requestAnimationFrame(()=>{a.forEach(r=>{r.bindings=r.bindings.filter(({element:l})=>{var t;return(t=Array.isArray(l)?l[0]:l)==null?void 0:t.isConnected}),!r.bindings.length&&!r.computed&&a.delete(r)}),h=void 0}))},x=(r,l)=>{!f.length&&c.requestAnimationFrame(E),f.push([r,l])};const E=()=>{let r=0,l=f.length;do{for(let t of new Set(f.slice(r,l).flatMap(([n])=>n.listeners)))W(t.computed,t.state);r=l,l=f.length}while(r<l);for(let t of new Set(f.flatMap(([n,o])=>n.bindings.map(p=>(p.op=o,p)))))H(t);f=[],F()};let H=r=>{var M;const{deps:l,element:t,renderInferred:n,render:o,renderItem:p,isAttribute:d,op:b=[]}=r,[s,i,g,v,y]=b;if(s&&p)(M=ee(t,g,(...C)=>A(p(...C)),i,v,y)[s])==null||M.call();else{let C=n?n({element:t}):o({element:t,renderItem:p})(...l.map(I));if(C!==t&&!d){let k=X(r.element=A(C)),N=X(t),$=0;for(;$<N.length&&$<k.length;$++)N[$].replaceWith(A(k[$]));let z=$;for(;k.length>z;)k[z-1].after(k[z]),z++;for(;N.length>$;)N[$].remove(),$++}}},j=(r,l,t=[])=>({get(n,o,p){var d,b;if((d=m==null?void 0:m.g)==null||d.add(r),o==="_isProxy")return!0;if(!((b=n[o])!=null&&b._isProxy)&&!S(n[o])&&T(n[o]))n[o]=new Proxy(n[o],j(r,l,[...t,o]));else if(ae.includes(o)){let s=n[o];return(...i)=>{let g=s.apply(n,i);return x(r,[o,g,i,l,t]),g}}return Reflect.get(n,o,p)},set(n,o,p,d){let b=Reflect.set(n,o,p,d);return x(r,["setItem",b,{prop:o,value:p},l,[...t,o]]),b}}),L=(r,l)=>new Proxy(l,j(r,l)),ee=(r,l,t,n,o,p)=>{let d=()=>{if(n.length==0)r.textContent="";else{for(var s=0;s<n.length&&s<r.children.length;s++){const g=r.children[s];g!=null&&g.bauUpdate?g.bauUpdate(g,n[s]):g.replaceWith(t(n[s],s))}let i=r.children[s];if(i)for(;i;){const g=i.nextSibling;i.remove(),i=g}else for(;s<n.length;s++)r.appendChild(t(n[s],s))}},b=s=>r[s]&&r.removeChild(r[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=p[0],i=r.children[s],g=o[s];i&&(i!=null&&i.bauUpdate?i.bauUpdate(i,g):i.replaceWith(t(g,s)))},push:()=>{for(let s=0;s<l.length;s++)r.appendChild(t(l[s],o.length+s))},unshift:()=>{for(let s=l.length-1;s>=0;s--)r.prepend(t(l[s]))},pop:()=>b("lastChild"),shift:()=>b("firstChild"),splice:()=>{const{length:s}=r.children;let[i,g=s,...v]=l;for(let y=i>=0?Math.min(i+g-1,s-1):s-1;y>=(i>=0?i:s+i);y--)r.children[y].remove();if(v.length){let y=v.map((M,C)=>t(M,i+C));r.children[i]?r.children[i].before(...y):r.append(...y)}}}},B=(r,{onUpdate:l,name:t}={})=>({name:t,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=m==null?void 0:m.g)==null||o.add(n),n.valProxy??(n.valProxy=T(r)?L(n,r):r,n.valProxy)},set val(n){var d;let o=this,p=o.rawVal;(d=m==null?void 0:m.s)==null||d.add(o),l==null||l(p,n),o.rawVal=n,T(n)?(o.valProxy=L(o,n),x(o,["assign",n])):n!==p&&(o.valProxy=n,o.bindings.length+o.listeners.length&&x(o))}}),A=r=>{if(r==null||r===!1){let l=w("span");return l.style.display="none",l}else return r.nodeType?r:Array.isArray(r)?r.map(A):u.createTextNode(r)},W=(r,l)=>{let t={g:new Set,s:new Set};return l.val=O(r,t),t},re=(r,l)=>{let t=B(void 0,l),n=W(r,t);t.computed=!0;let o={computed:r,state:t};for(let p of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(b=>!n.g.has(b.state)))))p.listeners.push(o);return t},D=(r,l=[])=>{for(let t of l)if(Array.isArray(t))D(r,t);else if(t!=null){let n=S(t)?P({deps:[t],render:()=>o=>o}):J(t)?K(t):A(t);Array.isArray(n)?r.append(...n):r.appendChild(n)}},G={},R=(r,l)=>r&&(Object.getOwnPropertyDescriptor(r,l)??R(Q(r),l)),te=(r,l,t)=>{var n;return G[r+","+l]??(G[r+","+l]=((n=R(t,l))==null?void 0:n.set)??0)},oe=(r,l)=>new c.MutationObserver((t,n)=>{t.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(p=>p===r&&(l({element:r}),n.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),ne=(r,l)=>new c.MutationObserver((t,n)=>t.forEach(o=>l({record:o,element:r}))).observe(r,{childList:!0}),U=r=>new Proxy(function(t,...n){var b;let[o,p]=ie(n),d=r?u.createElementNS(r,t):w(t);for(let[s,i]of Object.entries(o))if(s=="bauUpdate")d[s]=i;else if(!s.startsWith("bau")){let g=te(t,s,Q(d))?v=>v!==void 0&&(d[s]=v):v=>d.setAttribute(s,Array.isArray(v)?v.filter(y=>y).join(" "):v);i==null||(S(i)?P({deps:[i],render:()=>()=>(g(i.val),d)},!0):J(i)&&(!s.startsWith("on")||i.isDerived)?K(()=>(g(i({element:d})),d),!0):i.renderProp?P({deps:i.deps,render:()=>()=>(g(i.renderProp({element:d})(...i.deps.map(I))),d)},!0):g(i))}return o.bauChildMutated&&ne(d,o.bauChildMutated),D(d,p),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(b=o.bauCreated)==null||b.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>oe(d,o.bauUnmounted)),d},{get:(l,t)=>l.bind(void 0,t)}),V=(r,l,t,n)=>{r.element=A(t),r.isAttribute=n;for(let o of l.g)S(o)&&(a.add(o),o.bindings.push(r));return r.element},K=(r,l)=>{let t={g:new Set,s:new Set},n=O(r,t,{});return V({renderInferred:r},t,n,l)},P=({deps:r,element:l,render:t,renderItem:n},o)=>V({deps:r,render:t,renderItem:n},{g:new Set(r),s:new Set},t({element:l,renderItem:n})(...r.map(I)),o),le=(r,l,t)=>P({deps:[r],render:({renderItem:n})=>o=>{for(let p=0;p<o.length;p++)l.appendChild(n(o[p],p));return l},renderItem:t});return{tags:U(),tagsNS:U,state:B,bind:P,loop:le,derive:re,stateSet:a}}const de=e=>{let c=0,u=11;for(;c<e.length;)u=101*u+e.charCodeAt(c++)>>>0;return"bau"+u},ue=(e,c,u,h)=>{const a=e.createElement("style");a.id=u,a.append(h),(c??e.head).append(a)},he=(e,c)=>e.reduce((u,h,a)=>u+h+(c[a]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const u=h=>(a,...f)=>{const m=he(a,f),w=de(m);return!c.getElementById(w)&&ue(c,e==null?void 0:e.target,w,h(w,m)),w};return{css:u((h,a)=>`.${h} { ${a} }`),keyframes:u((h,a)=>`@keyframes ${h} { ${a} }`),createGlobalStyles:u((h,a)=>a)}}const q=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],pe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],ge=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,be=e=>`var(--color-${e}-lightest)`,ve=()=>q.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${be(e)};
}
.solid.${e} {
  background-color: ${me(e)};
}
`).join(`
`),ye=()=>q.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),Y=({dark:e})=>new Array(10).fill("").map((c,u)=>`--color-emphasis-${u*100}: var(--color-gray-${e?1e3-u*100:u*100});`).join(`
`),xe=([e,{h:c,s:u,l:h}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${h};`,`--color-${e}-base-s: ${u};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${u} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...pe.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...ge.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=q}={}){e`
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
      ${c.map(([u,h])=>xe([u,h])).join(`
`)}
      ${$e()}
      ${Y({})}
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
      --brightness-hover-reverse: 70% ${Y({dark:!0})};
    }
  `}function Ce(e){const c=ce(),u=fe({target:window.document.getElementById("bau-css")});return Ae(u),{bau:c,...u,tr:h=>h,window,...e}}function Se(e){const{bau:c,css:u}=e,{h1:h,div:a,p:f,article:m,section:w,img:O,picture:F,source:x,span:E,button:H}=c.tags,j=u`
    display: grid;
    margin: 1rem;
    grid-template-columns: 350px 350px;
    grid-template-rows: 1fr;
    @media (max-width: 475px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    picture {
      img {
        display: block;
        width: 100%;
        border-radius: 1rem 0 0 1rem;
        @media (max-width: 475px) {
          border-radius: 1rem;
        }
      }
    }

    .content {
      background-color: white;
      border-radius: 0 1rem 1rem 0;
      padding: 1rem;
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .category {
        letter-spacing: 0.3rem;
        text-transform: uppercase;
        font-weight: 500;
        color: var(--paragraph-color);
        font-size: 1rem;
      }
      h1 {
        font-family: "Fraunces", sans-serif;
        font-size: 2rem;
      }
      p {
        color: var(--paragraph-color);
      }
      .price-container {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        .price {
          font-family: "Fraunces", sans-serif;
          color: var(--btn-and-current-price-color);
          font-size: 2rem;
        }
        .price-old {
          font-size: 1rem;
          color: var(--paragraph-color);
          text-decoration: line-through;
        }
      }

      button {
        width: 100%;
        border-radius: 1rem;
        background-color: var(--btn-and-current-price-color);
        color: white;
        border: none;
        font-weight: 700;
        padding: 0.8rem;
        display: inline-flex;
        gap: 0.4rem;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.5s;
        &::before {
          content: url("./assets/images/icon-cart.svg");
        }
        &:hover {
          background-color: var(--hover-color);
        }
      }
    }
  `;return function(){return m({class:j},F(x({srcset:"./assets/images/image-product-desktop.jpg",media:"(min-width:476px)"}),O({src:"./assets/images/image-product-mobile.jpg",alt:"Mobile"})),w({class:"content"},a({class:"category"},"Perfume"),h("Gabrielle Essence Eau De Parfum"),f("A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL."),a({class:"price-container"},E({class:"price"},"$149.99"),E({class:"price-old"},"$169.99")),H("Add to Cart")))}}const Pe=Ce(),ke=e=>{const{bau:c}=e,{main:u}=c.tags,h=Se(e);return function(){return u(h())}},Oe=ke(Pe);var Z;(Z=document.getElementById("app"))==null||Z.replaceChildren(Oe());
