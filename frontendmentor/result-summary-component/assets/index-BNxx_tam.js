(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))g(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&g(p)}).observe(document,{childList:!0,subtree:!0});function h(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function g(i){if(i.ep)return;i.ep=!0;const u=h(i);fetch(i.href,u)}})();let G=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>G(e)=="Object",Q=e=>G(e)=="Function",B=e=>["Object","Array"].includes(G(e)),X=Object.getPrototypeOf,W=e=>k(e)?e.val:e,Z=e=>Array.isArray(e)?e:[e],k=e=>e==null?void 0:e.__isState,ie=["splice","push","pop","shift","unshift","sort","reverse"];const ce=e=>!k(e[0])&&ae(e[0])?[e[0],e.slice(1)]:[{},e];function de(e){let c=window,{document:h}=c,g,i=new Set,u=[],p,w=r=>h.createElement(r),P=(r,n,t)=>{let l=p;p=n;try{return r(t)}catch(o){return console.error(o),t}finally{p=l}},R=()=>{g||(g=c.requestAnimationFrame(()=>{i.forEach(r=>{r.bindings=r.bindings.filter(({element:n})=>{var t;return(t=Array.isArray(n)?n[0]:n)==null?void 0:t.isConnected}),!r.bindings.length&&!r.computed&&i.delete(r)}),g=void 0}))},S=(r,n)=>{!u.length&&c.requestAnimationFrame(V),u.push([r,n])};const V=()=>{let r=0,n=u.length;do{for(let t of new Set(u.slice(r,n).flatMap(([l])=>l.listeners)))_(t.computed,t.state);r=n,n=u.length}while(r<n);for(let t of new Set(u.flatMap(([l,o])=>l.bindings.map(f=>(f.op=o,f)))))O(t);u=[],R()};let O=r=>{var F;const{deps:n,element:t,renderInferred:l,render:o,renderItem:f,isAttribute:d,op:b=[]}=r,[s,a,m,v,y]=b;if(s&&f)(F=L(t,m,(...C)=>x(f(...C)),a,v,y)[s])==null||F.call();else{let C=l?l({element:t}):o({element:t,renderItem:f})(...n.map(W));if(C!==t&&!d){let j=Z(r.element=x(C)),T=Z(t),$=0;for(;$<T.length&&$<j.length;$++)T[$].replaceWith(x(j[$]));let H=$;for(;j.length>H;)j[H-1].after(j[H]),H++;for(;T.length>$;)T[$].remove(),$++}}},M=(r,n,t=[])=>({get(l,o,f){var d,b;if((d=p==null?void 0:p.g)==null||d.add(r),o==="_isProxy")return!0;if(!((b=l[o])!=null&&b._isProxy)&&!k(l[o])&&B(l[o]))l[o]=new Proxy(l[o],M(r,n,[...t,o]));else if(ie.includes(o)){let s=l[o];return(...a)=>{let m=s.apply(l,a);return S(r,[o,m,a,n,t]),m}}return Reflect.get(l,o,f)},set(l,o,f,d){let b=Reflect.set(l,o,f,d);return S(r,["setItem",b,{prop:o,value:f},n,[...t,o]]),b}}),N=(r,n)=>new Proxy(n,M(r,n)),L=(r,n,t,l,o,f)=>{let d=()=>{if(l.length==0)r.textContent="";else{for(var s=0;s<l.length&&s<r.children.length;s++){const m=r.children[s];m!=null&&m.bauUpdate?m.bauUpdate(m,l[s]):m.replaceWith(t(l[s],s))}let a=r.children[s];if(a)for(;a;){const m=a.nextSibling;a.remove(),a=m}else for(;s<l.length;s++)r.appendChild(t(l[s],s))}},b=s=>r[s]&&r.removeChild(r[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=f[0],a=r.children[s],m=o[s];a&&(a!=null&&a.bauUpdate?a.bauUpdate(a,m):a.replaceWith(t(m,s)))},push:()=>{for(let s=0;s<n.length;s++)r.appendChild(t(n[s],o.length+s))},unshift:()=>{for(let s=n.length-1;s>=0;s--)r.prepend(t(n[s]))},pop:()=>b("lastChild"),shift:()=>b("firstChild"),splice:()=>{const{length:s}=r.children;let[a,m=s,...v]=n;for(let y=a>=0?Math.min(a+m-1,s-1):s-1;y>=(a>=0?a:s+a);y--)r.children[y].remove();if(v.length){let y=v.map((F,C)=>t(F,a+C));r.children[a]?r.children[a].before(...y):r.append(...y)}}}},A=(r,{onUpdate:n,name:t}={})=>({name:t,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var o;let l=this;return(o=p==null?void 0:p.g)==null||o.add(l),l.valProxy??(l.valProxy=B(r)?N(l,r):r,l.valProxy)},set val(l){var d;let o=this,f=o.rawVal;(d=p==null?void 0:p.s)==null||d.add(o),n==null||n(f,l),o.rawVal=l,B(l)?(o.valProxy=N(o,l),S(o,["assign",l])):l!==f&&(o.valProxy=l,o.bindings.length+o.listeners.length&&S(o))}}),x=r=>{if(r==null||r===!1){let n=w("span");return n.style.display="none",n}else return r.nodeType?r:Array.isArray(r)?r.map(x):h.createTextNode(r)},_=(r,n)=>{let t={g:new Set,s:new Set};return n.val=P(r,t),t},q=(r,n)=>{let t=A(void 0,n),l=_(r,t);t.computed=!0;let o={computed:r,state:t};for(let f of new Set([...l.g].filter(d=>!l.s.has(d)&&d.listeners.every(b=>!l.g.has(b.state)))))f.listeners.push(o);return t},z=(r,n=[])=>{for(let t of n)if(Array.isArray(t))z(r,t);else if(t!=null){let l=k(t)?E({deps:[t],render:()=>o=>o}):Q(t)?J(t):x(t);Array.isArray(l)?r.append(...l):r.appendChild(l)}},I={},D=(r,n)=>r&&(Object.getOwnPropertyDescriptor(r,n)??D(X(r),n)),oe=(r,n,t)=>{var l;return I[r+","+n]??(I[r+","+n]=((l=D(t,n))==null?void 0:l.set)??0)},le=(r,n)=>new c.MutationObserver((t,l)=>{t.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(f=>f===r&&(n({element:r}),l.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),ne=(r,n)=>new c.MutationObserver((t,l)=>t.forEach(o=>n({record:o,element:r}))).observe(r,{childList:!0}),K=r=>new Proxy(function(t,...l){var b;let[o,f]=ce(l),d=r?h.createElementNS(r,t):w(t);for(let[s,a]of Object.entries(o))if(s=="bauUpdate")d[s]=a;else if(!s.startsWith("bau")){let m=oe(t,s,X(d))?v=>v!==void 0&&(d[s]=v):v=>d.setAttribute(s,Array.isArray(v)?v.filter(y=>y).join(" "):v);a==null||(k(a)?E({deps:[a],render:()=>()=>(m(a.val),d)},!0):Q(a)&&(!s.startsWith("on")||a.isDerived)?J(()=>(m(a({element:d})),d),!0):a.renderProp?E({deps:a.deps,render:()=>()=>(m(a.renderProp({element:d})(...a.deps.map(W))),d)},!0):m(a))}return o.bauChildMutated&&ne(d,o.bauChildMutated),z(d,f),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(b=o.bauCreated)==null||b.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>le(d,o.bauUnmounted)),d},{get:(n,t)=>n.bind(void 0,t)}),Y=(r,n,t,l)=>{r.element=x(t),r.isAttribute=l;for(let o of n.g)k(o)&&(i.add(o),o.bindings.push(r));return r.element},J=(r,n)=>{let t={g:new Set,s:new Set},l=P(r,t,{});return Y({renderInferred:r},t,l,n)},E=({deps:r,element:n,render:t,renderItem:l},o)=>Y({deps:r,render:t,renderItem:l},{g:new Set(r),s:new Set},t({element:n,renderItem:l})(...r.map(W)),o),se=(r,n,t)=>E({deps:[r],render:({renderItem:l})=>o=>{for(let f=0;f<o.length;f++)n.appendChild(l(o[f],f));return n},renderItem:t});return{tags:K(),tagsNS:K,state:A,bind:E,loop:se,derive:q,stateSet:i}}const he=e=>{let c=0,h=11;for(;c<e.length;)h=101*h+e.charCodeAt(c++)>>>0;return"bau"+h},ue=(e,c,h,g)=>{const i=e.createElement("style");i.id=h,i.append(g),(c??e.head).append(i)},ge=(e,c)=>e.reduce((h,g,i)=>h+g+(c[i]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const h=g=>(i,...u)=>{const p=ge(i,u),w=he(p);return!c.getElementById(w)&&ue(c,e==null?void 0:e.target,w,g(w,p)),w};return{css:h((g,i)=>`.${g} { ${i} }`),keyframes:h((g,i)=>`@keyframes ${g} { ${i} }`),createGlobalStyles:h((g,i)=>i)}}const U=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],me=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,ve=e=>`var(--color-${e}-lightest)`,ye=()=>U.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ve(e)};
}
.solid.${e} {
  background-color: ${be(e)};
}
`).join(`
`),we=()=>U.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),$e=e=>100-e*10,xe=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${$e(c)}%);`).join(`
`),ee=({dark:e})=>new Array(10).fill("").map((c,h)=>`--color-emphasis-${h*100}: var(--color-gray-${e?1e3-h*100:h*100});`).join(`
`),Se=([e,{h:c,s:h,l:g}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${g};`,`--color-${e}-base-s: ${h};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${h} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...me.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),...pe.map(([i,u])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:c=U}={}){e`
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
      ${c.map(([h,g])=>Se([h,g])).join(`
`)}
      ${xe()}
      ${ee({})}
      ${ye()}
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
      ${we()}
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
  `}function Ce(e){const c=de(),h=fe({target:window.document.getElementById("bau-css")});return Ae(h),{bau:c,...h,tr:g=>g,window,...e}}const ke=[{category:"Reaction",score:80,icon:"./assets/images/icon-reaction.svg"},{category:"Memory",score:92,icon:"./assets/images/icon-memory.svg"},{category:"Verbal",score:61,icon:"./assets/images/icon-verbal.svg"},{category:"Visual",score:72,icon:"./assets/images/icon-visual.svg"}],re=76;function Pe(e){const{bau:c,css:h}=e,{h1:g,h2:i,div:u,p,article:w,section:P,button:R,ul:S,li:V,span:O,img:M}=c.tags,N=h`
    max-width: 500px;
    margin: auto;
    display: grid;
    grid-template-columns: minmax(auto, 350px) minmax(auto, 350px);
    grid-template-rows: 1fr;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;

      border-radius: 0;
    }
    border-radius: 0.6rem;
    box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.1);
    section {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.7rem;
      &.result {
        align-items: center;
        border-radius: 0.6rem;
        @media (max-width: 600px) {
          flex-direction: column;
          border-radius: 0 0 0.6rem 0.6rem;
        }
        background: linear-gradient(
          var(--Light-slate-blue),
          var(--Light-royal-blue)
        );

        min-width: 250px;

        h1 {
          color: var(--color);
        }
        h2 {
          color: var(--white);
        }
        p {
          color: var(--color);
          text-align: center;
          padding: 0 1rem;
        }
        .score-container {
          color: var(--white);
          background: linear-gradient(var(--Violet-blue), var(--Persian-blue));
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 50%;
          aspect-ratio: 1;
          padding: 1.5rem;
          .score {
            color: var(--white);
            font-size: 3rem;
            font-weight: bold;
            line-height: 3rem;
          }
          .score-total {
            font-size: 0.7rem;
            color: var(--color);
          }
        }
      }
      &.summary {
        min-width: 250px;
        button {
          width: 100%;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.6rem 0;
          color: white;
          border-radius: 1rem;
          background-color: var(--btn-bg);
          border: none;
          outline: none;
          cursor: pointer;
          &:hover {
            background: linear-gradient(
              var(--Light-slate-blue),
              var(--Light-royal-blue)
            );
          }
        }
      }
      ul {
        padding: 0;
        flex-grow: 1;
        li {
          list-style: none;
          padding: 0.7rem 0.5rem;
          margin: 0.5rem 0rem;
          border-radius: 0.3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:nth-child(1) {
            color: hsl(0, 100%, 67%);
            background: hsla(0, 100%, 67%, 0.05);
          }
          &:nth-child(2) {
            color: hsl(39, 100%, 56%);
            background: hsla(39, 100%, 56%, 0.05);
          }
          &:nth-child(3) {
            color: hsl(166, 100%, 37%);
            background: hsla(166, 100%, 37%, 0.05);
          }
          &:nth-child(4) {
            color: hsl(234, 85%, 45%);
            background: hsla(234, 85%, 45%, 0.05);
          }
          .category {
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
          .category {
            font-weight: 700;
          }
          .score {
            color: hsl(224, 30%, 27%);
            font-weight: 700;
            padding-right: 0.3rem;
          }
          .score-total {
            color: hsla(224, 30%, 27%, 0.5);
          }
        }
      }
    }
  `,L=c.state(re);var A=0,x=setInterval(()=>{A++,L.val=A,A>=re&&clearInterval(x)},5);return function(){return w({class:N},P({class:"result"},g("Result"),u({class:"score-container"},u({class:"score"},L),u({class:"score-total"},"of 100")),i("Great"),p("You scored higher than 65% of the people who have taken these tests.")),P({class:"summary"},g("Summary"),S(ke.map(({category:q,score:z,icon:I})=>V(u({class:"category"},M({src:I}),O({class:"category"},q)),u(O({class:"score"},z),O({class:"score-total"},"/100"))))),R("Continue")))}}const Oe=Ce(),Ee=e=>{const{bau:c}=e,{main:h}=c.tags,g=Pe(e);return function(){return h(g())}},je=Ee(Oe);var te;(te=document.getElementById("app"))==null||te.replaceChildren(je());
