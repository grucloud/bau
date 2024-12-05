(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const g of s)if(g.type==="childList")for(const f of g.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&h(f)}).observe(document,{childList:!0,subtree:!0});function u(s){const g={};return s.integrity&&(g.integrity=s.integrity),s.referrerPolicy&&(g.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?g.credentials="include":s.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function h(s){if(s.ep)return;s.ep=!0;const g=u(s);fetch(s.href,g)}})();let K=e=>Object.prototype.toString.call(e??0).slice(8,-1),le=e=>K(e)=="Object",Z=e=>K(e)=="Function",U=e=>["Object","Array"].includes(K(e)),ee=Object.getPrototypeOf,G=e=>P(e)?e.val:e,re=e=>Array.isArray(e)?e:[e],P=e=>e==null?void 0:e.__isState,se=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!P(e[0])&&le(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:u}=c,h,s=new Set,g=[],f,$=r=>u.createElement(r),M=(r,a,t)=>{let n=f;f=a;try{return r(t)}catch(o){return console.error(o),t}finally{f=n}},F=()=>{h||(h=c.requestAnimationFrame(()=>{s.forEach(r=>{r.bindings=r.bindings.filter(({element:a})=>{var t;return(t=Array.isArray(a)?a[0]:a)==null?void 0:t.isConnected}),!r.bindings.length&&!r.computed&&s.delete(r)}),h=void 0}))},k=(r,a)=>{!g.length&&c.requestAnimationFrame(W),g.push([r,a])};const W=()=>{let r=0,a=g.length;do{for(let t of new Set(g.slice(r,a).flatMap(([n])=>n.listeners)))E(t.computed,t.state);r=a,a=g.length}while(r<a);for(let t of new Set(g.flatMap(([n,o])=>n.bindings.map(p=>(p.op=o,p)))))_(t);g=[],F()};let _=r=>{var L;const{deps:a,element:t,renderInferred:n,render:o,renderItem:p,isAttribute:d,op:b=[]}=r,[l,i,m,v,y=[]]=b;if(l&&p)!y.length&&((L=B(t,m,(...C)=>w(p(...C)),i,v,y)[l])==null||L.call());else{let C=n?n({element:t}):o({element:t,renderItem:p})(...a.map(G));if(C!==t&&!d){let N=re(r.element=w(C)),D=re(t),x=0;for(;x<D.length&&x<N.length;x++)D[x].replaceWith(w(N[x]));let H=x;for(;N.length>H;)N[H-1].after(N[H]),H++;for(;D.length>x;)D[x].remove(),x++}}},S=(r,a,t=[])=>({get(n,o,p){var d,b;if((d=f==null?void 0:f.g)==null||d.add(r),o==="_isProxy")return!0;if(!((b=n[o])!=null&&b._isProxy)&&!P(n[o])&&U(n[o]))n[o]=new Proxy(n[o],S(r,a,[...t,o]));else if(se.includes(o)){let l=n[o];return(...i)=>{let m=l.apply(n,i);return k(r,[o,m,i,a,t]),m}}return Reflect.get(n,o,p)},set(n,o,p,d){let b=Reflect.set(n,o,p,d);return k(r,["setItem",b,{prop:o,value:p},a,[...t,o]]),b}}),O=(r,a)=>new Proxy(a,S(r,a)),B=(r,a,t,n,o,p)=>{let d=()=>{if(n.length==0)r.textContent="";else{for(var l=0;l<n.length&&l<r.children.length;l++){const m=r.children[l];m!=null&&m.bauUpdate?m.bauUpdate(m,n[l]):m.replaceWith(t(n[l],l))}let i=r.children[l];if(i)for(;i;){const m=i.nextSibling;i.remove(),i=m}else for(;l<n.length;l++)r.appendChild(t(n[l],l))}},b=l=>r[l]&&r.removeChild(r[l]);return{assign:d,sort:d,reverse:d,setItem:()=>{let l=p[0],i=r.children[l],m=o[l];i&&(i!=null&&i.bauUpdate?i.bauUpdate(i,m):i.replaceWith(t(m,l)))},push:()=>{for(let l=0;l<a.length;l++)r.appendChild(t(a[l],o.length+l))},unshift:()=>{for(let l=a.length-1;l>=0;l--)r.prepend(t(a[l]))},pop:()=>b("lastChild"),shift:()=>b("firstChild"),splice:()=>{const{length:l}=r.children;let[i,m=l,...v]=a;for(let y=i>=0?Math.min(i+m-1,l-1):l-1;y>=(i>=0?i:l+i);y--)r.children[y].remove();if(v.length){let y=v.map((L,C)=>t(L,i+C));r.children[i]?r.children[i].before(...y):r.append(...y)}}}},T=(r,{onUpdate:a,name:t}={})=>({name:t,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=f==null?void 0:f.g)==null||o.add(n),n.valProxy??(n.valProxy=U(r)?O(n,r):r,n.valProxy)},set val(n){var d;let o=this,p=o.rawVal;(d=f==null?void 0:f.s)==null||d.add(o),a==null||a(p,n),o.rawVal=n,U(n)?(o.valProxy=O(o,n),k(o,["assign",n])):n!==p&&(o.valProxy=n,o.bindings.length+o.listeners.length&&k(o))}}),w=r=>{if(r==null||r===!1){let a=$("span");return a.style.display="none",a}else return r.nodeType?r:Array.isArray(r)?r.map(w):u.createTextNode(r)},E=(r,a)=>{let t={g:new Set,s:new Set};return a.val=M(r,t),t},V=(r,a)=>{let t=T(void 0,a),n=E(r,t);t.computed=!0;let o={computed:r,state:t};for(let p of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(b=>!n.g.has(b.state)))))p.listeners.push(o);return t},z=(r,a=[])=>{for(let t of a)if(Array.isArray(t))z(r,t);else if(t!=null){let n=P(t)?j({deps:[t],render:()=>o=>o}):Z(t)?Y(t):w(t);Array.isArray(n)?r.append(...n):r.appendChild(n)}},q={},I=(r,a)=>r&&(Object.getOwnPropertyDescriptor(r,a)??I(ee(r),a)),A=(r,a,t)=>{var n;return q[r+","+a]??(q[r+","+a]=((n=I(t,a))==null?void 0:n.set)??0)},R=(r,a)=>new c.MutationObserver((t,n)=>{t.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(p=>p===r&&(a({element:r}),n.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),ne=(r,a)=>new c.MutationObserver((t,n)=>t.forEach(o=>a({record:o,element:r}))).observe(r,{childList:!0}),Q=r=>new Proxy(function(t,...n){var b;let[o,p]=ie(n),d=r?u.createElementNS(r,t):$(t);for(let[l,i]of Object.entries(o))if(l=="bauUpdate")d[l]=i;else if(!l.startsWith("bau")){let m=A(t,l,ee(d))?v=>v!==void 0&&(d[l]=v):v=>d.setAttribute(l,Array.isArray(v)?v.filter(y=>y).join(" "):v);i==null||(P(i)?j({deps:[i],render:()=>()=>(m(i.val),d)},!0):Z(i)&&(!l.startsWith("on")||i.isDerived)?Y(()=>(m(i({element:d})),d),!0):i.renderProp?j({deps:i.deps,render:()=>()=>(m(i.renderProp({element:d})(...i.deps.map(G))),d)},!0):m(i))}return o.bauChildMutated&&ne(d,o.bauChildMutated),z(d,p),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(b=o.bauCreated)==null||b.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>R(d,o.bauUnmounted)),d},{get:(a,t)=>a.bind(void 0,t)}),X=(r,a,t,n)=>{r.element=w(t),r.isAttribute=n;for(let o of a.g)P(o)&&(s.add(o),o.bindings.push(r));return r.element},Y=(r,a)=>{let t={g:new Set,s:new Set},n=M(r,t,{});return X({renderInferred:r},t,n,a)},j=({deps:r,element:a,render:t,renderItem:n},o)=>X({deps:r,render:t,renderItem:n},{g:new Set(r),s:new Set},t({element:a,renderItem:n})(...r.map(G)),o),ae=(r,a,t)=>j({deps:[r],render:({renderItem:n})=>o=>{for(let p=0;p<o.length;p++)a.appendChild(n(o[p],p));return a},renderItem:t});return{tags:Q(),tagsNS:Q,state:T,bind:j,loop:ae,derive:V,stateSet:s}}const de=e=>{let c=0,u=11;for(;c<e.length;)u=101*u+e.charCodeAt(c++)>>>0;return"bau"+u},ue=(e,c,u,h)=>{const s=e.createElement("style");s.id=u,s.append(h),(c??e.head).append(s)},he=(e,c)=>e.reduce((u,h,s)=>u+h+(c[s]??""),"");function ge(e){let{document:c}=(e==null?void 0:e.window)??window;const u=h=>(s,...g)=>{const f=he(s,g),$=de(f);return!c.getElementById($)&&ue(c,e==null?void 0:e.target,$,h($,f)),$};return{css:u((h,s)=>`.${h} { ${s} }`),keyframes:u((h,s)=>`@keyframes ${h} { ${s} }`),createGlobalStyles:u((h,s)=>s)}}const J=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],pe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],fe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,be=e=>`var(--color-${e}-lightest)`,ve=()=>J.map(([e])=>`
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
`),ye=()=>J.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),te=({dark:e})=>new Array(10).fill("").map((c,u)=>`--color-emphasis-${u*100}: var(--color-gray-${e?1e3-u*100:u*100});`).join(`
`),xe=([e,{h:c,s:u,l:h}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${h};`,`--color-${e}-base-s: ${u};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${u} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...pe.map(([s,g])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${g}));`),...fe.map(([s,g])=>`--color-${e}-${s}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${g}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ke({createGlobalStyles:e},{colorPalette:c=J}={}){e`
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
      ${te({})}
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
      --brightness-hover-reverse: 70% ${te({dark:!0})};
    }
  `}function Se(e){const c=ce(),u=ge({target:window.document.getElementById("bau-css")});return ke(u),{bau:c,...u,tr:h=>h,window,...e}}function Ae(e){const{bau:c,css:u}=e,{div:h,form:s,h1:g,p:f,label:$,input:M,button:F,article:k,aside:W,ul:_,li:S,img:O,span:B,strong:T}=c.tags,w=c.state(!1),E=c.state(""),V=u`
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-areas: "form image";
    @media (max-width: 900px) {
      grid-template-areas: "image" "form";
      border-radius: 0;
    }
    padding: 1rem;
    margin-inline: 1rem;
    background-color: var(--White);
    border-radius: 2rem;
    > aside {
      grid-area: image;
      width: 100%;
      & img {
        display: block;
        margin: auto;
        @media (max-width: 900px) {
          background-image: url("./assets/images/illustration-sign-up-mobile.svg");
          background-repeat: no-repeat;
          background-position: center;
          width: 375px;
          height: 284px;
        }
      }
    }
    > form {
      grid-area: form;
      margin: auto;
      padding-inline: 2rem;
      padding-block: 1rem;
      max-width: 500px;
      display: grid;
      gap: 1rem;
      > ul {
        > li {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding-block: 0.3rem;
          position: relative;
          &::before {
            height: 21px;
            width: 21px;
            background-image: url("./assets/images/icon-list.svg");
            content: "";
          }
        }
      }
      & h1 {
        font-size: 2.5rem;
        text-align: center;
      }
      > label {
        display: grid;
        font-size: 0.8rem;
        font-weight: bold;
        gap: 0.5rem;
        > div {
          display: flex;
          justify-content: space-between;
          .error {
            color: var(--color-danger);
            display: none;
          }
        }
        &:has(> input:user-invalid) {
          .error {
            display: block;
            color: var(--color-danger);
          }
        }
        > input {
          height: 56px;
          padding-inline: 1rem;
          border-radius: 0.5rem;
          color: inherit;
          border: 1px solid var(--grey);
          &:focus {
            outline: 1px auto var(--color-primary);
          }
          &:user-invalid {
            outline: 1px auto var(--color-danger);
            background-color: var(--color-danger-lightest);
            color: var(--color-danger);
          }
          &:user-valid {
            outline: 1px auto var(--color-success);
          }
        }
      }
    }
  `,z=A=>{A.preventDefault();const{email:R}=Object.fromEntries(new FormData(A.target));E.val=String(R),w.val=!0},q=({})=>s({onsubmit:A=>{A.preventDefault()},class:u`
          background-color: var(--White);
          max-width: 400px;
          padding: 3rem;
          margin-inline: 1rem;
          border-radius: 0.5rem;
          display: grid;
          gap: 2rem;
          & img {
          }
        `},O({src:"./assets/images/icon-success.svg",width:64,height:64}),g("Thanks for subscribing!"),f("A confirmation email has been sent to ",T(E.val),". Please open it and click the button inside to confirm your subscription."),F({type:"submit",onclick:()=>{w.val=!1}},"Dismiss message")),I=()=>k({class:V},s({onsubmit:z},g("Stay updated!"),f("Join 60,000+ product managers receiving monthly updates on:"),_(S("Product discovery and building what matters"),S("Measuring to ensure updates are a success"),S("And much more!")),$(h("Email address",B({class:"error"},"Valid email required")),M({name:"email",type:"email",placeholder:"email@company.com",required:!0})),f(F({type:"submit"},"Subscribe to monthly newsletter"))),W(O({width:400,height:593,src:"./assets/images/illustration-sign-up-desktop.svg"})));return()=>h(()=>w.val?q({}):I())}const Ce=Se(),Pe=e=>{const{bau:c}=e,{main:u}=c.tags,h=Ae(e);return function(){return u(h())}},Oe=Pe(Ce);var oe;(oe=document.getElementById("app"))==null||oe.replaceChildren(Oe());
