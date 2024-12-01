(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const f of s)if(f.type==="childList")for(const b of f.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&u(b)}).observe(document,{childList:!0,subtree:!0});function h(s){const f={};return s.integrity&&(f.integrity=s.integrity),s.referrerPolicy&&(f.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?f.credentials="include":s.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(s){if(s.ep)return;s.ep=!0;const f=h(s);fetch(s.href,f)}})();let U=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>U(e)=="Object",Q=e=>U(e)=="Function",q=e=>["Object","Array"].includes(U(e)),X=Object.getPrototypeOf,_=e=>O(e)?e.val:e,Z=e=>Array.isArray(e)?e:[e],O=e=>e==null?void 0:e.__isState,se=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!O(e[0])&&ae(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:h}=c,u,s=new Set,f=[],b,A=t=>h.createElement(t),N=(t,l,r)=>{let n=b;b=l;try{return t(r)}catch(o){return console.error(o),r}finally{b=n}},L=()=>{u||(u=c.requestAnimationFrame(()=>{s.forEach(t=>{t.bindings=t.bindings.filter(({element:l})=>{var r;return(r=Array.isArray(l)?l[0]:l)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&s.delete(t)}),u=void 0}))},y=(t,l)=>{!f.length&&c.requestAnimationFrame(M),f.push([t,l])};const M=()=>{let t=0,l=f.length;do{for(let r of new Set(f.slice(t,l).flatMap(([n])=>n.listeners)))k(r.computed,r.state);t=l,l=f.length}while(t<l);for(let r of new Set(f.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))R(r);f=[],L()};let R=t=>{var F;const{deps:l,element:r,renderInferred:n,render:o,renderItem:g,isAttribute:d,op:v=[]}=t,[a,i,p,$,x]=v;if(a&&g)(F=z(r,p,(...P)=>w(g(...P)),i,$,x)[a])==null||F.call();else{let P=n?n({element:r}):o({element:r,renderItem:g})(...l.map(_));if(P!==r&&!d){let j=Z(t.element=w(P)),I=Z(r),S=0;for(;S<I.length&&S<j.length;S++)I[S].replaceWith(w(j[S]));let B=S;for(;j.length>B;)j[B-1].after(j[B]),B++;for(;I.length>S;)I[S].remove(),S++}}},m=(t,l,r=[])=>({get(n,o,g){var d,v;if((d=b==null?void 0:b.g)==null||d.add(t),o==="_isProxy")return!0;if(!((v=n[o])!=null&&v._isProxy)&&!O(n[o])&&q(n[o]))n[o]=new Proxy(n[o],m(t,l,[...r,o]));else if(se.includes(o)){let a=n[o];return(...i)=>{let p=a.apply(n,i);return y(t,[o,p,i,l,r]),p}}return Reflect.get(n,o,g)},set(n,o,g,d){let v=Reflect.set(n,o,g,d);return y(t,["setItem",v,{prop:o,value:g},l,[...r,o]]),v}}),T=(t,l)=>new Proxy(l,m(t,l)),z=(t,l,r,n,o,g)=>{let d=()=>{if(n.length==0)t.textContent="";else{for(var a=0;a<n.length&&a<t.children.length;a++){const p=t.children[a];p!=null&&p.bauUpdate?p.bauUpdate(p,n[a]):p.replaceWith(r(n[a],a))}let i=t.children[a];if(i)for(;i;){const p=i.nextSibling;i.remove(),i=p}else for(;a<n.length;a++)t.appendChild(r(n[a],a))}},v=a=>t[a]&&t.removeChild(t[a]);return{assign:d,sort:d,reverse:d,setItem:()=>{let a=g[0],i=t.children[a],p=o[a];i&&(i!=null&&i.bauUpdate?i.bauUpdate(i,p):i.replaceWith(r(p,a)))},push:()=>{for(let a=0;a<l.length;a++)t.appendChild(r(l[a],o.length+a))},unshift:()=>{for(let a=l.length-1;a>=0;a--)t.prepend(r(l[a]))},pop:()=>v("lastChild"),shift:()=>v("firstChild"),splice:()=>{const{length:a}=t.children;let[i,p=a,...$]=l;for(let x=i>=0?Math.min(i+p-1,a-1):a-1;x>=(i>=0?i:a+i);x--)t.children[x].remove();if($.length){let x=$.map((F,P)=>r(F,i+P));t.children[i]?t.children[i].before(...x):t.append(...x)}}}},C=(t,{onUpdate:l,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=b==null?void 0:b.g)==null||o.add(n),n.valProxy??(n.valProxy=q(t)?T(n,t):t,n.valProxy)},set val(n){var d;let o=this,g=o.rawVal;(d=b==null?void 0:b.s)==null||d.add(o),l==null||l(g,n),o.rawVal=n,q(n)?(o.valProxy=T(o,n),y(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&y(o))}}),w=t=>{if(t==null||t===!1){let l=A("span");return l.style.display="none",l}else return t.nodeType?t:Array.isArray(t)?t.map(w):h.createTextNode(t)},k=(t,l)=>{let r={g:new Set,s:new Set};return l.val=N(t,r),r},H=(t,l)=>{let r=C(void 0,l),n=k(t,r);r.computed=!0;let o={computed:t,state:r};for(let g of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(v=>!n.g.has(v.state)))))g.listeners.push(o);return r},W=(t,l=[])=>{for(let r of l)if(Array.isArray(r))W(t,r);else if(r!=null){let n=O(r)?E({deps:[r],render:()=>o=>o}):Q(r)?J(r):w(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},D={},G=(t,l)=>t&&(Object.getOwnPropertyDescriptor(t,l)??G(X(t),l)),re=(t,l,r)=>{var n;return D[t+","+l]??(D[t+","+l]=((n=G(r,l))==null?void 0:n.set)??0)},oe=(t,l)=>new c.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===t&&(l({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),ne=(t,l)=>new c.MutationObserver((r,n)=>r.forEach(o=>l({record:o,element:t}))).observe(t,{childList:!0}),K=t=>new Proxy(function(r,...n){var v;let[o,g]=ie(n),d=t?h.createElementNS(t,r):A(r);for(let[a,i]of Object.entries(o))if(a=="bauUpdate")d[a]=i;else if(!a.startsWith("bau")){let p=re(r,a,X(d))?$=>$!==void 0&&(d[a]=$):$=>d.setAttribute(a,Array.isArray($)?$.filter(x=>x).join(" "):$);i==null||(O(i)?E({deps:[i],render:()=>()=>(p(i.val),d)},!0):Q(i)&&(!a.startsWith("on")||i.isDerived)?J(()=>(p(i({element:d})),d),!0):i.renderProp?E({deps:i.deps,render:()=>()=>(p(i.renderProp({element:d})(...i.deps.map(_))),d)},!0):p(i))}return o.bauChildMutated&&ne(d,o.bauChildMutated),W(d,g),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(v=o.bauCreated)==null||v.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>oe(d,o.bauUnmounted)),d},{get:(l,r)=>l.bind(void 0,r)}),Y=(t,l,r,n)=>{t.element=w(r),t.isAttribute=n;for(let o of l.g)O(o)&&(s.add(o),o.bindings.push(t));return t.element},J=(t,l)=>{let r={g:new Set,s:new Set},n=N(t,r,{});return Y({renderInferred:t},r,n,l)},E=({deps:t,element:l,render:r,renderItem:n},o)=>Y({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:l,renderItem:n})(...t.map(_)),o),le=(t,l,r)=>E({deps:[t],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)l.appendChild(n(o[g],g));return l},renderItem:r});return{tags:K(),tagsNS:K,state:C,bind:E,loop:le,derive:H,stateSet:s}}const de=e=>{let c=0,h=11;for(;c<e.length;)h=101*h+e.charCodeAt(c++)>>>0;return"bau"+h},he=(e,c,h,u)=>{const s=e.createElement("style");s.id=h,s.append(u),(c??e.head).append(s)},ue=(e,c)=>e.reduce((h,u,s)=>h+u+(c[s]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const h=u=>(s,...f)=>{const b=ue(s,f),A=de(b);return!c.getElementById(A)&&he(c,e==null?void 0:e.target,A,u(A,b)),A};return{css:h((u,s)=>`.${u} { ${s} }`),keyframes:h((u,s)=>`@keyframes ${u} { ${s} }`),createGlobalStyles:h((u,s)=>s)}}const V=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,me=e=>`var(--color-${e}-lightest)`,ve=()=>V.map(([e])=>`
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
`),ye=()=>V.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),ee=({dark:e})=>new Array(10).fill("").map((c,h)=>`--color-emphasis-${h*100}: var(--color-gray-${e?1e3-h*100:h*100});`).join(`
`),xe=([e,{h:c,s:h,l:u}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${u};`,`--color-${e}-base-s: ${h};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${h} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ge.map(([s,f])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...pe.map(([s,f])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=V}={}){e`
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
      ${c.map(([h,u])=>xe([h,u])).join(`
`)}
      ${$e()}
      ${ee({})}
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
      --brightness-hover-reverse: 70% ${ee({dark:!0})};
    }
  `}function Se(e){const c=ce(),h=fe({target:window.document.getElementById("bau-css")});return Ae(h),{bau:c,...h,tr:u=>u,window,...e}}function Ce(e){const{bau:c,css:h}=e,{h1:u,h2:s,h3:f,p:b,article:A,img:N,section:L,strong:y,ul:M,ol:R,li:m,table:T,tbody:z,th:C,tr:w,td:k}=c.tags,H=h`
    max-width: 700px;
    padding: 1.5rem;
    margin: 5rem 0;
    @media (max-width: 600px) {
      margin: 0;
    }
    background-color: var(--White);
    border-radius: 0.5rem;

    .img-omelete {
      width: 100%;
      border-radius: 0.5rem;
    }
    & h1,
    & h2 {
      font-family: "Young Serif";
    }

    & h1 {
      color: var(--Stone-900);
      font-weight: 400;
      font-size: 2.2em;
    }
    & h2 {
      color: var(--Brown-800);
      font-weight: 400;
    }
    & ul,
    & ol {
      padding-left: 1rem;
      > li {
        color: var(--WengeBrown);
        padding: 0.3rem;
        list-style-position: inside;
      }
    }
    & section.preparation-time {
      background-color: var(--Rose-50);
      padding: 1.2rem;
      border-radius: 0.7rem;
      & h3 {
        color: var(--Rose-800);
      }
    }
    & ol {
      > li::marker {
        font-weight: 700;
        color: var(--Brown-800);
      }
    }
    & table {
      width: 100%;
      border-collapse: collapse;
      & tbody {
        & tr {
          border-bottom: 1px solid var(--Stone-150);
          & th {
            padding: 1rem;
            font-weight: normal;
            text-align: start;
            color: var(--Stone-600);
          }
          & td {
            font-weight: 700;
            color: var(--Rose-800);
          }
        }
      }
    }
  `;return function(){return A({class:H},N({class:"img-omelete",src:"./assets/images/image-omelette.jpeg",alt:"omelette"}),u("Simple Omelette Recipe"),b("An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats."),L({class:"preparation-time"},f("Preparation Time"),M(m(y("Total: "),"Approximately 10 minutes"),m(y("Preparation: "),"5 minutes"),m(y("Cooking: "),"5 minutes"))),s("Ingredients"),M(m("2-3 large eggs"),m("Salt, to taste"),m("Pepper, to taste"),m("1 tablespoon of butter or oil"),m("Optional fillings: cheese, diced vegetables, cooked meats, herbs")),s("Instructions"),R(m(y("Beat the eggs: ")," In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture."),m(y("Heat the pan: "),"Place a non-stick frying pan over medium heat and add butter or oil."),m(y("Add fillings (optional): "),"When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette."),m(y("Fold and serve: "),"As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate."),m(y("Enjoy: "),"Serve hot, with additional salt and pepper if needed.")),s("Nutrition"),b("The table below shows nutritional values per serving without the additional fillings."),T(z(w(C("Calories"),k("277kcal")),w(C("Carbs"),k("0g")),w(C("Protien"),k("20g")),w(C("Fat"),k("22g")))))}}const ke=Se(),Pe=e=>{const{bau:c}=e,{main:h}=c.tags,u=Ce(e);return function(){return h(u())}},Oe=Pe(ke);var te;(te=document.getElementById("app"))==null||te.replaceChildren(Oe());
