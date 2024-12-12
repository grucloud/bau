(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))u(a);new MutationObserver(a=>{for(const f of a)if(f.type==="childList")for(const m of f.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function h(a){const f={};return a.integrity&&(f.integrity=a.integrity),a.referrerPolicy&&(f.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?f.credentials="include":a.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(a){if(a.ep)return;a.ep=!0;const f=h(a);fetch(a.href,f)}})();let Q=e=>Object.prototype.toString.call(e??0).slice(8,-1),se=e=>Q(e)=="Object",ee=e=>Q(e)=="Function",K=e=>["Object","Array"].includes(Q(e)),te=Object.getPrototypeOf,J=e=>k(e)?e.val:e,re=e=>Array.isArray(e)?e:[e],k=e=>e==null?void 0:e.__isState,ae=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!k(e[0])&&se(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let c=window,{document:h}=c,u,a=new Set,f=[],m,v=t=>h.createElement(t),I=(t,l,r)=>{let n=m;m=l;try{return t(r)}catch(o){return console.error(o),r}finally{m=n}},L=()=>{u||(u=c.requestAnimationFrame(()=>{a.forEach(t=>{t.bindings=t.bindings.filter(({element:l})=>{var r;return(r=Array.isArray(l)?l[0]:l)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&a.delete(t)}),u=void 0}))},x=(t,l)=>{!f.length&&c.requestAnimationFrame(O),f.push([t,l])};const O=()=>{let t=0,l=f.length;do{for(let r of new Set(f.slice(t,l).flatMap(([n])=>n.listeners)))E(r.computed,r.state);t=l,l=f.length}while(t<l);for(let r of new Set(f.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))G(r);f=[],L()};let G=t=>{var R;const{deps:l,element:r,renderInferred:n,render:o,renderItem:g,isAttribute:d,op:b=[]}=t,[s,i,p,y,w=[]]=b;if(s&&g)!w.length&&((R=q(r,p,(...C)=>S(g(...C)),i,y,w)[s])==null||R.call());else{let C=n?n({element:r}):o({element:r,renderItem:g})(...l.map(J));if(C!==r&&!d){let F=re(t.element=S(C)),U=re(r),$=0;for(;$<U.length&&$<F.length;$++)U[$].replaceWith(S(F[$]));let V=$;for(;F.length>V;)F[V-1].after(F[V]),V++;for(;U.length>$;)U[$].remove(),$++}}},P=(t,l,r=[])=>({get(n,o,g){var d,b;if((d=m==null?void 0:m.g)==null||d.add(t),o==="_isProxy")return!0;if(!((b=n[o])!=null&&b._isProxy)&&!k(n[o])&&K(n[o]))n[o]=new Proxy(n[o],P(t,l,[...r,o]));else if(ae.includes(o)){let s=n[o];return(...i)=>{let p=s.apply(n,i);return x(t,[o,p,i,l,r]),p}}return Reflect.get(n,o,g)},set(n,o,g,d){let b=Reflect.set(n,o,g,d);return x(t,["setItem",b,{prop:o,value:g},l,[...r,o]]),b}}),M=(t,l)=>new Proxy(l,P(t,l)),q=(t,l,r,n,o,g)=>{let d=()=>{if(n.length==0)t.textContent="";else{for(var s=0;s<n.length&&s<t.children.length;s++){const p=t.children[s];p!=null&&p.bauUpdate?p.bauUpdate(p,n[s]):p.replaceWith(r(n[s],s))}let i=t.children[s];if(i)for(;i;){const p=i.nextSibling;i.remove(),i=p}else for(;s<n.length;s++)t.appendChild(r(n[s],s))}},b=s=>t[s]&&t.removeChild(t[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=g[0],i=t.children[s],p=o[s];i&&(i!=null&&i.bauUpdate?i.bauUpdate(i,p):i.replaceWith(r(p,s)))},push:()=>{for(let s=0;s<l.length;s++)t.appendChild(r(l[s],o.length+s))},unshift:()=>{for(let s=l.length-1;s>=0;s--)t.prepend(r(l[s]))},pop:()=>b("lastChild"),shift:()=>b("firstChild"),splice:()=>{const{length:s}=t.children;let[i,p=s,...y]=l;for(let w=i>=0?Math.min(i+p-1,s-1):s-1;w>=(i>=0?i:s+i);w--)t.children[w].remove();if(y.length){let w=y.map((R,C)=>r(R,i+C));t.children[i]?t.children[i].before(...w):t.append(...w)}}}},T=(t,{onUpdate:l,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=m==null?void 0:m.g)==null||o.add(n),n.valProxy??(n.valProxy=K(t)?M(n,t):t,n.valProxy)},set val(n){var d;let o=this,g=o.rawVal;(d=m==null?void 0:m.s)==null||d.add(o),l==null||l(g,n),o.rawVal=n,K(n)?(o.valProxy=M(o,n),x(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&x(o))}}),S=t=>{if(t==null||t===!1){let l=v("span");return l.style.display="none",l}else return t.nodeType?t:Array.isArray(t)?t.map(S):h.createTextNode(t)},E=(t,l)=>{let r={g:new Set,s:new Set};return l.val=I(t,r),r},H=(t,l)=>{let r=T(void 0,l),n=E(t,r);r.computed=!0;let o={computed:t,state:r};for(let g of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(b=>!n.g.has(b.state)))))g.listeners.push(o);return r},j=(t,l=[])=>{for(let r of l)if(Array.isArray(r))j(t,r);else if(r!=null){let n=k(r)?z({deps:[r],render:()=>o=>o}):ee(r)?A(r):S(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},N={},Y=(t,l)=>t&&(Object.getOwnPropertyDescriptor(t,l)??Y(te(t),l)),Z=(t,l,r)=>{var n;return N[t+","+l]??(N[t+","+l]=((n=Y(r,l))==null?void 0:n.set)??0)},_=(t,l)=>new c.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===t&&(l({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),B=(t,l)=>new c.MutationObserver((r,n)=>r.forEach(o=>l({record:o,element:t}))).observe(t,{childList:!0}),D=t=>new Proxy(function(r,...n){var b;let[o,g]=ie(n),d=t?h.createElementNS(t,r):v(r);for(let[s,i]of Object.entries(o))if(s=="bauUpdate")d[s]=i;else if(!s.startsWith("bau")){let p=Z(r,s,te(d))?y=>y!==void 0&&(d[s]=y):y=>d.setAttribute(s,Array.isArray(y)?y.filter(w=>w).join(" "):y);i==null||(k(i)?z({deps:[i],render:()=>()=>(p(i.val),d)},!0):ee(i)&&(!s.startsWith("on")||i.isDerived)?A(()=>(p(i({element:d})),d),!0):i.renderProp?z({deps:i.deps,render:()=>()=>(p(i.renderProp({element:d})(...i.deps.map(J))),d)},!0):p(i))}return o.bauChildMutated&&B(d,o.bauChildMutated),j(d,g),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(b=o.bauCreated)==null||b.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>_(d,o.bauUnmounted)),d},{get:(l,r)=>l.bind(void 0,r)}),W=(t,l,r,n)=>{t.element=S(r),t.isAttribute=n;for(let o of l.g)k(o)&&(a.add(o),o.bindings.push(t));return t.element},A=(t,l)=>{let r={g:new Set,s:new Set},n=I(t,r,{});return W({renderInferred:t},r,n,l)},z=({deps:t,element:l,render:r,renderItem:n},o)=>W({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:l,renderItem:n})(...t.map(J)),o),le=(t,l,r)=>z({deps:[t],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)l.appendChild(n(o[g],g));return l},renderItem:r});return{tags:D(),tagsNS:D,state:T,bind:z,loop:le,derive:H,stateSet:a}}const de=e=>{let c=0,h=11;for(;c<e.length;)h=101*h+e.charCodeAt(c++)>>>0;return"bau"+h},he=(e,c,h,u)=>{const a=e.createElement("style");a.id=h,a.append(u),(c??e.head).append(a)},ue=(e,c)=>e.reduce((h,u,a)=>h+u+(c[a]??""),"");function fe(e){let{document:c}=(e==null?void 0:e.window)??window;const h=u=>(a,...f)=>{const m=ue(a,f),v=de(m);return!c.getElementById(v)&&he(c,e==null?void 0:e.target,v,u(v,m)),v};return{css:h((u,a)=>`.${u} { ${a} }`),keyframes:h((u,a)=>`@keyframes ${u} { ${a} }`),createGlobalStyles:h((u,a)=>a)}}const X=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,be=e=>`var(--color-${e}-lightest)`,ve=()=>X.map(([e])=>`
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
`),ye=()=>X.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),oe=({dark:e})=>new Array(10).fill("").map((c,h)=>`--color-emphasis-${h*100}: var(--color-gray-${e?1e3-h*100:h*100});`).join(`
`),xe=([e,{h:c,s:h,l:u}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${u};`,`--color-${e}-base-s: ${h};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${h} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ge.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...pe.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Se({createGlobalStyles:e},{colorPalette:c=X}={}){e`
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
      ${oe({})}
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
      --brightness-hover-reverse: 70% ${oe({dark:!0})};
    }
  `}function Ae(e){const c=ce(),h=fe({target:window.document.getElementById("bau-css")});return Se(h),{bau:c,...h,tr:u=>u,window,...e}}function Ce(e){const{bau:c,css:h}=e,{p:u,label:a,input:f,form:m,i:v,img:I,hr:L,span:x,section:O,button:G}=c.tags,P=c.state("--"),M=c.state("--"),q=c.state("--"),T=h`
    display: grid;
    gap: 0.5rem;
    padding: 2rem;
    border-radius: 1rem 1rem 7rem 1rem;
    background-color: var(--White);
    min-width: 600px;
    @media (max-width: 600px) {
      min-width: unset;
    }
    .dob {
      display: flex;
      gap: 1rem;
      & label {
        display: grid;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--Smokey-grey);
        letter-spacing: 0.1rem;
        gap: 0.3rem;

        & input {
          @media (min-width: 600px) {
            min-width: 5rem;
          }
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--Light-grey);
          font-size: 1.2rem;
          font-weight: 600;
          &:focus {
            outline: 1px auto var(--color-primary);
          }
        }
      }
    }
    .submit {
      display: flex;
      align-items: center;

      & hr {
        height: 1px;
        background-color: var(--Light-grey);
        border: none;
        width: 100%;
        @media (min-width: 600px) {
          &:last-child {
            display: none;
          }
        }
      }
      & button {
        border: none;
        border-radius: 50%;
        background-color: var(--color-primary);
        cursor: pointer;
        @media (max-width: 600px) {
          img {
            width: 42px;
            height: 42px;
          }
        }
      }
    }

    .age-result {
      font-size: 32px;
      font-weight: 800;
      font-style: italic;
      @media (min-width: 600px) {
        font-size: 60px;
      }
      .timeunit {
        color: var(--color-primary);
      }
    }
  `,S=E=>{E.preventDefault();const{day:H,month:j,year:N}=Object.fromEntries(new FormData(E.target));console.log(H,j,N);const Y=Date.parse(`${N}-${j}-${H}`);let _=(Date.now()-Y)/1e3;const B=31536e3,D=2628e3,W=86400;P.val=String(Math.floor(_/B));let A=_%B;M.val=String(Math.floor(A/D)),A%=D,q.val=String(Math.floor(A/W))};return()=>m({class:T,onsubmit:S},O({class:"dob"},a("Day",f({type:"number",name:"day",placeholder:"DD",min:1,max:31,required:!0})),a("Month",f({type:"number",name:"month",placeholder:"MM",min:1,max:12,required:!0})),a("Year",f({type:"number",name:"year",placeholder:"YYYY",min:1900,max:new Date().getFullYear(),required:!0}))),O({class:"submit"},L(),G({type:"submit"},I({src:"./assets/images/icon-arrow.svg",alt:"submit",height:80,width:80})),L()),O({class:"age-result"},u(x({class:"timeunit"},P),v(" years")),u(x({class:"timeunit"},M),v(" months")),u(x({class:"timeunit"},q),v(" days"))))}const ke=Ae(),Oe=e=>{const{bau:c}=e,{main:h}=c.tags,u=Ce(e);return function(){return h(u())}},Pe=Oe(ke);var ne;(ne=document.getElementById("app"))==null||ne.replaceChildren(Pe());
