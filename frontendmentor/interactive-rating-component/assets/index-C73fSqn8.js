(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const f of s)if(f.type==="childList")for(const b of f.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&h(b)}).observe(document,{childList:!0,subtree:!0});function u(s){const f={};return s.integrity&&(f.integrity=s.integrity),s.referrerPolicy&&(f.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?f.credentials="include":s.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function h(s){if(s.ep)return;s.ep=!0;const f=u(s);fetch(s.href,f)}})();let G=e=>Object.prototype.toString.call(e??0).slice(8,-1),ie=e=>G(e)=="Object",Z=e=>G(e)=="Function",K=e=>["Object","Array"].includes(G(e)),ee=Object.getPrototypeOf,V=e=>P(e)?e.val:e,re=e=>Array.isArray(e)?e:[e],P=e=>e==null?void 0:e.__isState,ce=["splice","push","pop","shift","unshift","sort","reverse"];const de=e=>!P(e[0])&&ie(e[0])?[e[0],e.slice(1)]:[{},e];function ue(e){let c=window,{document:u}=c,h,s=new Set,f=[],b,k=r=>u.createElement(r),M=(r,a,t)=>{let n=b;b=a;try{return r(t)}catch(o){return console.error(o),t}finally{b=n}},q=()=>{h||(h=c.requestAnimationFrame(()=>{s.forEach(r=>{r.bindings=r.bindings.filter(({element:a})=>{var t;return(t=Array.isArray(a)?a[0]:a)==null?void 0:t.isConnected}),!r.bindings.length&&!r.computed&&s.delete(r)}),h=void 0}))},A=(r,a)=>{!f.length&&c.requestAnimationFrame(U),f.push([r,a])};const U=()=>{let r=0,a=f.length;do{for(let t of new Set(f.slice(r,a).flatMap(([n])=>n.listeners)))E(t.computed,t.state);r=a,a=f.length}while(r<a);for(let t of new Set(f.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))B(t);f=[],q()};let B=r=>{var F;const{deps:a,element:t,renderInferred:n,render:o,renderItem:g,isAttribute:d,op:v=[]}=r,[l,i,p,y,$]=v;if(l&&g)(F=W(t,p,(...C)=>w(g(...C)),i,y,$)[l])==null||F.call();else{let C=n?n({element:t}):o({element:t,renderItem:g})(...a.map(V));if(C!==t&&!d){let N=re(r.element=w(C)),H=re(t),S=0;for(;S<H.length&&S<N.length;S++)H[S].replaceWith(w(N[S]));let _=S;for(;N.length>_;)N[_-1].after(N[_]),_++;for(;H.length>S;)H[S].remove(),S++}}},R=(r,a,t=[])=>({get(n,o,g){var d,v;if((d=b==null?void 0:b.g)==null||d.add(r),o==="_isProxy")return!0;if(!((v=n[o])!=null&&v._isProxy)&&!P(n[o])&&K(n[o]))n[o]=new Proxy(n[o],R(r,a,[...t,o]));else if(ce.includes(o)){let l=n[o];return(...i)=>{let p=l.apply(n,i);return A(r,[o,p,i,a,t]),p}}return Reflect.get(n,o,g)},set(n,o,g,d){let v=Reflect.set(n,o,g,d);return A(r,["setItem",v,{prop:o,value:g},a,[...t,o]]),v}}),T=(r,a)=>new Proxy(a,R(r,a)),W=(r,a,t,n,o,g)=>{let d=()=>{if(n.length==0)r.textContent="";else{for(var l=0;l<n.length&&l<r.children.length;l++){const p=r.children[l];p!=null&&p.bauUpdate?p.bauUpdate(p,n[l]):p.replaceWith(t(n[l],l))}let i=r.children[l];if(i)for(;i;){const p=i.nextSibling;i.remove(),i=p}else for(;l<n.length;l++)r.appendChild(t(n[l],l))}},v=l=>r[l]&&r.removeChild(r[l]);return{assign:d,sort:d,reverse:d,setItem:()=>{let l=g[0],i=r.children[l],p=o[l];i&&(i!=null&&i.bauUpdate?i.bauUpdate(i,p):i.replaceWith(t(p,l)))},push:()=>{for(let l=0;l<a.length;l++)r.appendChild(t(a[l],o.length+l))},unshift:()=>{for(let l=a.length-1;l>=0;l--)r.prepend(t(a[l]))},pop:()=>v("lastChild"),shift:()=>v("firstChild"),splice:()=>{const{length:l}=r.children;let[i,p=l,...y]=a;for(let $=i>=0?Math.min(i+p-1,l-1):l-1;$>=(i>=0?i:l+i);$--)r.children[$].remove();if(y.length){let $=y.map((F,C)=>t(F,i+C));r.children[i]?r.children[i].before(...$):r.append(...$)}}}},O=(r,{onUpdate:a,name:t}={})=>({name:t,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=b==null?void 0:b.g)==null||o.add(n),n.valProxy??(n.valProxy=K(r)?T(n,r):r,n.valProxy)},set val(n){var d;let o=this,g=o.rawVal;(d=b==null?void 0:b.s)==null||d.add(o),a==null||a(g,n),o.rawVal=n,K(n)?(o.valProxy=T(o,n),A(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&A(o))}}),w=r=>{if(r==null||r===!1){let a=k("span");return a.style.display="none",a}else return r.nodeType?r:Array.isArray(r)?r.map(w):u.createTextNode(r)},E=(r,a)=>{let t={g:new Set,s:new Set};return a.val=M(r,t),t},D=(r,a)=>{let t=O(void 0,a),n=E(r,t);t.computed=!0;let o={computed:r,state:t};for(let g of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(v=>!n.g.has(v.state)))))g.listeners.push(o);return t},I=(r,a=[])=>{for(let t of a)if(Array.isArray(t))I(r,t);else if(t!=null){let n=P(t)?j({deps:[t],render:()=>o=>o}):Z(t)?X(t):w(t);Array.isArray(n)?r.append(...n):r.appendChild(n)}},L={},z=(r,a)=>r&&(Object.getOwnPropertyDescriptor(r,a)??z(ee(r),a)),x=(r,a,t)=>{var n;return L[r+","+a]??(L[r+","+a]=((n=z(t,a))==null?void 0:n.set)??0)},m=(r,a)=>new c.MutationObserver((t,n)=>{t.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===r&&(a({element:r}),n.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),le=(r,a)=>new c.MutationObserver((t,n)=>t.forEach(o=>a({record:o,element:r}))).observe(r,{childList:!0}),J=r=>new Proxy(function(t,...n){var v;let[o,g]=de(n),d=r?u.createElementNS(r,t):k(t);for(let[l,i]of Object.entries(o))if(l=="bauUpdate")d[l]=i;else if(!l.startsWith("bau")){let p=x(t,l,ee(d))?y=>y!==void 0&&(d[l]=y):y=>d.setAttribute(l,Array.isArray(y)?y.filter($=>$).join(" "):y);i==null||(P(i)?j({deps:[i],render:()=>()=>(p(i.val),d)},!0):Z(i)&&(!l.startsWith("on")||i.isDerived)?X(()=>(p(i({element:d})),d),!0):i.renderProp?j({deps:i.deps,render:()=>()=>(p(i.renderProp({element:d})(...i.deps.map(V))),d)},!0):p(i))}return o.bauChildMutated&&le(d,o.bauChildMutated),I(d,g),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(v=o.bauCreated)==null||v.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>m(d,o.bauUnmounted)),d},{get:(a,t)=>a.bind(void 0,t)}),Q=(r,a,t,n)=>{r.element=w(t),r.isAttribute=n;for(let o of a.g)P(o)&&(s.add(o),o.bindings.push(r));return r.element},X=(r,a)=>{let t={g:new Set,s:new Set},n=M(r,t,{});return Q({renderInferred:r},t,n,a)},j=({deps:r,element:a,render:t,renderItem:n},o)=>Q({deps:r,render:t,renderItem:n},{g:new Set(r),s:new Set},t({element:a,renderItem:n})(...r.map(V)),o),se=(r,a,t)=>j({deps:[r],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)a.appendChild(n(o[g],g));return a},renderItem:t});return{tags:J(),tagsNS:J,state:O,bind:j,loop:se,derive:D,stateSet:s}}const he=e=>{let c=0,u=11;for(;c<e.length;)u=101*u+e.charCodeAt(c++)>>>0;return"bau"+u},fe=(e,c,u,h)=>{const s=e.createElement("style");s.id=u,s.append(h),(c??e.head).append(s)},ge=(e,c)=>e.reduce((u,h,s)=>u+h+(c[s]??""),"");function pe(e){let{document:c}=(e==null?void 0:e.window)??window;const u=h=>(s,...f)=>{const b=ge(s,f),k=he(b);return!c.getElementById(k)&&fe(c,e==null?void 0:e.target,k,h(k,b)),k};return{css:u((h,s)=>`.${h} { ${s} }`),keyframes:u((h,s)=>`@keyframes ${h} { ${s} }`),createGlobalStyles:u((h,s)=>s)}}const Y=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],be=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],ve=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,ye=e=>`var(--color-${e}-lightest)`,we=()=>Y.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ye(e)};
}
.solid.${e} {
  background-color: ${me(e)};
}
`).join(`
`),$e=()=>Y.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),ke=e=>100-e*10,Se=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${ke(c)}%);`).join(`
`),te=({dark:e})=>new Array(10).fill("").map((c,u)=>`--color-emphasis-${u*100}: var(--color-gray-${e?1e3-u*100:u*100});`).join(`
`),xe=([e,{h:c,s:u,l:h}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${h};`,`--color-${e}-base-s: ${u};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${u} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...be.map(([s,f])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...ve.map(([s,f])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=Y}={}){e`
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
      ${Se()}
      ${te({})}
      ${we()}
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
      ${$e()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${te({dark:!0})};
    }
  `}function Ce(e){const c=ue(),u=pe({target:window.document.getElementById("bau-css")});return Ae(u),{bau:c,...u,tr:h=>h,window,...e}}const oe="rating",ne="submitted";function Pe(e){const{bau:c,css:u,window:h}=e,{h1:s,p:f,ul:b,li:k,button:M,form:q,img:A,picture:U,section:B,article:R,div:T}=c.tags,W=u`
    max-width: 400px;
    margin: 1rem;
    background-color: var(--clr-dark-700);
    border-radius: 1em;
    .panel {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
    }

    h1 {
      margin: 0;
    }
    picture {
      img {
        background-color: var(--clr-dark-500);
        border-radius: 50%;
        padding: 1rem;
      }
    }
    p {
      color: var(--clr-neutral-300);
    }
    ul {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      li {
        list-style: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        background-color: var(--clr-dark-500);
        color: var(--clr-neutral-300);
        cursor: pointer;

        &:hover {
          background-color: var(--clr-dark-300);
          color: var(--clr-neutral-100);
        }
        &.active {
          color: white;
          background-color: var(--clr-primary);
        }
      }
    }
    button {
      padding: 1rem 0;
      width: 100%;
      border-radius: 1rem;
      border: none;
      cursor: pointer;
      background-color: var(--clr-primary);
      color: var(--clr-neutral-100);
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      transition: all 0.5s;
      &:hover {
        background-color: var(--clr-neutral-100);
        color: var(--clr-primary);
      }
    }

    .thankyou {
      align-items: center;
      h1 {
        font-size: 2rem;
      }
      .badge {
        color: var(--clr-primary);
        background-color: var(--clr-dark-500);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
      }
    }
  `,O=new URLSearchParams(h.location.search),w=c.state(Number(O.get(oe))),E=c.state(!!O.get(ne)),D=x=>()=>{const m=new URLSearchParams(h.location.search);m.set(oe,String(x)),h.history.pushState("","",`?${m.toString()}${h.location.hash}`),w.val=x},I=x=>{x.preventDefault();const m=new URLSearchParams(h.location.search);m.set(ne,"true"),h.history.replaceState("","",`?${m.toString()}${h.location.hash}`),E.val=!0},L=()=>q({class:"panel",onsubmit:I},U(A({src:"./assets/images/icon-star.svg",alt:"star"})),s("How did we do?"),f("Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!"),b(Array(5).fill("").map((x,m)=>k({class:()=>m+1===w.val&&"active",onclick:D(m+1)},m+1))),M({type:"submit"},"Submit")),z=()=>B({class:["thankyou","panel"]},A({src:"./assets/images/illustration-thank-you.svg",alt:"Thank you"}),T({class:"badge"},"You selected ",w.val," out of 5"),s("Thank you"),f("We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!"));return function(){return R({class:W},()=>E.val?z():L())}}const Oe=Ce(),Ee=e=>{const{bau:c}=e,{main:u}=c.tags,h=Pe(e);return function(){return u(h())}},je=Ee(Oe);var ae;(ae=document.getElementById("app"))==null||ae.replaceChildren(je());
