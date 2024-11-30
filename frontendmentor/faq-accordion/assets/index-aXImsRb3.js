(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))u(a);new MutationObserver(a=>{for(const f of a)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function d(a){const f={};return a.integrity&&(f.integrity=a.integrity),a.referrerPolicy&&(f.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?f.credentials="include":a.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(a){if(a.ep)return;a.ep=!0;const f=d(a);fetch(a.href,f)}})();let U=e=>Object.prototype.toString.call(e??0).slice(8,-1),ae=e=>U(e)=="Object",Z=e=>U(e)=="Function",G=e=>["Object","Array"].includes(U(e)),ee=Object.getPrototypeOf,R=e=>F(e)?e.val:e,te=e=>Array.isArray(e)?e:[e],F=e=>e==null?void 0:e.__isState,ie=["splice","push","pop","shift","unshift","sort","reverse"];const V=e=>!F(e[0])&&ae(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let i=window,{document:d}=i,u,a=new Set,f=[],p,w=t=>d.createElement(t),b=(t,l,r)=>{let n=p;p=l;try{return t(r)}catch(o){return console.error(o),r}finally{p=n}},$=()=>{u||(u=i.requestAnimationFrame(()=>{a.forEach(t=>{t.bindings=t.bindings.filter(({element:l})=>{var r;return(r=Array.isArray(l)?l[0]:l)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&a.delete(t)}),u=void 0}))},S=(t,l)=>{!f.length&&i.requestAnimationFrame(E),f.push([t,l])};const E=()=>{let t=0,l=f.length;do{for(let r of new Set(f.slice(t,l).flatMap(([n])=>n.listeners)))L(r.computed,r.state);t=l,l=f.length}while(t<l);for(let r of new Set(f.flatMap(([n,o])=>n.bindings.map(g=>(g.op=o,g)))))H(r);f=[],$()};let H=t=>{var _;const{deps:l,element:r,renderInferred:n,render:o,renderItem:g,isAttribute:h,op:m=[]}=t,[s,c,v,C,k]=m;if(s&&g)(_=j(r,v,(...M)=>x(g(...M)),c,C,k)[s])==null||_.call();else{let M=n?n({element:r}):o({element:r,renderItem:g})(...l.map(R));if(M!==r&&!h){let q=te(t.element=x(M)),B=te(r),P=0;for(;P<B.length&&P<q.length;P++)B[P].replaceWith(x(q[P]));let W=P;for(;q.length>W;)q[W-1].after(q[W]),W++;for(;B.length>P;)B[P].remove(),P++}}},y=(t,l,r=[])=>({get(n,o,g){var h,m;if((h=p==null?void 0:p.g)==null||h.add(t),o==="_isProxy")return!0;if(!((m=n[o])!=null&&m._isProxy)&&!F(n[o])&&G(n[o]))n[o]=new Proxy(n[o],y(t,l,[...r,o]));else if(ie.includes(o)){let s=n[o];return(...c)=>{let v=s.apply(n,c);return S(t,[o,v,c,l,r]),v}}return Reflect.get(n,o,g)},set(n,o,g,h){let m=Reflect.set(n,o,g,h);return S(t,["setItem",m,{prop:o,value:g},l,[...r,o]]),m}}),A=(t,l)=>new Proxy(l,y(t,l)),j=(t,l,r,n,o,g)=>{let h=()=>{if(n.length==0)t.textContent="";else{for(var s=0;s<n.length&&s<t.children.length;s++){const v=t.children[s];v!=null&&v.bauUpdate?v.bauUpdate(v,n[s]):v.replaceWith(r(n[s],s))}let c=t.children[s];if(c)for(;c;){const v=c.nextSibling;c.remove(),c=v}else for(;s<n.length;s++)t.appendChild(r(n[s],s))}},m=s=>t[s]&&t.removeChild(t[s]);return{assign:h,sort:h,reverse:h,setItem:()=>{let s=g[0],c=t.children[s],v=o[s];c&&(c!=null&&c.bauUpdate?c.bauUpdate(c,v):c.replaceWith(r(v,s)))},push:()=>{for(let s=0;s<l.length;s++)t.appendChild(r(l[s],o.length+s))},unshift:()=>{for(let s=l.length-1;s>=0;s--)t.prepend(r(l[s]))},pop:()=>m("lastChild"),shift:()=>m("firstChild"),splice:()=>{const{length:s}=t.children;let[c,v=s,...C]=l;for(let k=c>=0?Math.min(c+v-1,s-1):s-1;k>=(c>=0?c:s+c);k--)t.children[k].remove();if(C.length){let k=C.map((_,M)=>r(_,c+M));t.children[c]?t.children[c].before(...k):t.append(...k)}}}},I=(t,{onUpdate:l,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=p==null?void 0:p.g)==null||o.add(n),n.valProxy??(n.valProxy=G(t)?A(n,t):t,n.valProxy)},set val(n){var h;let o=this,g=o.rawVal;(h=p==null?void 0:p.s)==null||h.add(o),l==null||l(g,n),o.rawVal=n,G(n)?(o.valProxy=A(o,n),S(o,["assign",n])):n!==g&&(o.valProxy=n,o.bindings.length+o.listeners.length&&S(o))}}),x=t=>{if(t==null||t===!1){let l=w("span");return l.style.display="none",l}else return t.nodeType?t:Array.isArray(t)?t.map(x):d.createTextNode(t)},L=(t,l)=>{let r={g:new Set,s:new Set};return l.val=b(t,r),r},D=(t,l)=>{let r=I(void 0,l),n=L(t,r);r.computed=!0;let o={computed:t,state:r};for(let g of new Set([...n.g].filter(h=>!n.s.has(h)&&h.listeners.every(m=>!n.g.has(m.state)))))g.listeners.push(o);return r},O=(t,l=[])=>{for(let r of l)if(Array.isArray(r))O(t,r);else if(r!=null){let n=F(r)?N({deps:[r],render:()=>o=>o}):Z(r)?X(r):x(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},T={},z=(t,l)=>t&&(Object.getOwnPropertyDescriptor(t,l)??z(ee(t),l)),Y=(t,l,r)=>{var n;return T[t+","+l]??(T[t+","+l]=((n=z(r,l))==null?void 0:n.set)??0)},ne=(t,l)=>new i.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(g=>g===t&&(l({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),le=(t,l)=>new i.MutationObserver((r,n)=>r.forEach(o=>l({record:o,element:t}))).observe(t,{childList:!0}),J=t=>new Proxy(function(r,...n){var m;let[o,g]=V(n),h=t?d.createElementNS(t,r):w(r);for(let[s,c]of Object.entries(o))if(s=="bauUpdate")h[s]=c;else if(!s.startsWith("bau")){let v=Y(r,s,ee(h))?C=>C!==void 0&&(h[s]=C):C=>h.setAttribute(s,Array.isArray(C)?C.filter(k=>k).join(" "):C);c==null||(F(c)?N({deps:[c],render:()=>()=>(v(c.val),h)},!0):Z(c)&&(!s.startsWith("on")||c.isDerived)?X(()=>(v(c({element:h})),h),!0):c.renderProp?N({deps:c.deps,render:()=>()=>(v(c.renderProp({element:h})(...c.deps.map(R))),h)},!0):v(c))}return o.bauChildMutated&&le(h,o.bauChildMutated),O(h,g),h.autofocus&&h.focus&&i.requestAnimationFrame(()=>h.focus()),(m=o.bauCreated)==null||m.call(o,{element:h}),o.bauMounted&&i.requestAnimationFrame(()=>o.bauMounted({element:h})),o.bauUnmounted&&i.requestAnimationFrame(()=>ne(h,o.bauUnmounted)),h},{get:(l,r)=>l.bind(void 0,r)}),Q=(t,l,r,n)=>{t.element=x(r),t.isAttribute=n;for(let o of l.g)F(o)&&(a.add(o),o.bindings.push(t));return t.element},X=(t,l)=>{let r={g:new Set,s:new Set},n=b(t,r,{});return Q({renderInferred:t},r,n,l)},N=({deps:t,element:l,render:r,renderItem:n},o)=>Q({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:l,renderItem:n})(...t.map(R)),o),se=(t,l,r)=>N({deps:[t],render:({renderItem:n})=>o=>{for(let g=0;g<o.length;g++)l.appendChild(n(o[g],g));return l},renderItem:r});return{tags:J(),tagsNS:J,state:I,bind:N,loop:se,derive:D,stateSet:a}}const de=e=>{let i=0,d=11;for(;i<e.length;)d=101*d+e.charCodeAt(i++)>>>0;return"bau"+d},he=(e,i,d,u)=>{const a=e.createElement("style");a.id=d,a.append(u),(i??e.head).append(a)},ue=(e,i)=>e.reduce((d,u,a)=>d+u+(i[a]??""),"");function fe(e){let{document:i}=(e==null?void 0:e.window)??window;const d=u=>(a,...f)=>{const p=ue(a,f),w=de(p);return!i.getElementById(w)&&he(i,e==null?void 0:e.target,w,u(w,p)),w};return{css:d((u,a)=>`.${u} { ${a} }`),keyframes:d((u,a)=>`@keyframes ${u} { ${a} }`),createGlobalStyles:d((u,a)=>a)}}const K=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,ve=e=>`var(--color-${e}-lightest)`,me=()=>K.map(([e])=>`
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
`),ye=()=>K.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,i)=>`--color-gray-${i*100}: hsl(0, 0%, ${we(i)}%);`).join(`
`),re=({dark:e})=>new Array(10).fill("").map((i,d)=>`--color-emphasis-${d*100}: var(--color-gray-${e?1e3-d*100:d*100});`).join(`
`),xe=([e,{h:i,s:d,l:u}])=>[`--color-${e}-h: ${i};`,`--color-${e}-l: ${u};`,`--color-${e}-base-s: ${d};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${d} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ge.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...pe.map(([a,f])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:e},{colorPalette:i=K}={}){e`
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
      ${i.map(([d,u])=>xe([d,u])).join(`
`)}
      ${$e()}
      ${re({})}
      ${me()}
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
      --brightness-hover-reverse: 70% ${re({dark:!0})};
    }
  `}function Ce(e){const i=ce(),d=fe({target:window.document.getElementById("bau-css")});return Ae(d),{bau:i,...d,tr:u=>u,window,...e}}function Se(e){const{bau:i,css:d}=e,{div:u}=i.tags,a=d`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      cursor: pointer;
      &:hover {
        color: var(--pink);
      }
      &::after {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::after {
        content: url("./assets/images/icon-plus.svg");
        padding: 0.5rem;
      }
      &.open::after {
        content: url("./assets/images/icon-minus.svg");
        padding: 0.5rem;
      }
    }
    & .content {
      background-color: inherit;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      overflow-y: scroll;
      color: var(--Grayish-purple);
    }
  `,f=({element:b,closeState:$})=>{b.scrollHeight!=0&&($.val?p(b):w(b))};function p(b){b.style.height=b.scrollHeight+"px";const $=()=>{b.removeEventListener("transitionend",$)};b.addEventListener("transitionend",$),window.requestAnimationFrame(()=>{b.style.height="0px"})}function w(b){const $=()=>{b.removeEventListener("transitionend",$),b.style.height=null};b.addEventListener("transitionend",$),b.style.height=b.scrollHeight+"px"}return function(...$){let[{Header:S,Content:E,expanded:H=!1,...y}]=V($);const A=i.state(!H);return u({...y,class:["collapsible",a,y==null?void 0:y.class]},u({class:()=>["header",E?A.val?"close":"open":""],onclick:()=>{A.val=!A.val}},S()),u({class:"content",role:"region",bauMounted:({element:j})=>{A.val&&(j.style.height="0px")},"aria-expanded":({element:j})=>(f({element:j,closeState:A}),!A.val)},E&&E()))}}function ke(e){const{bau:i,css:d}=e,{div:u,ul:a,li:f,h3:p,button:w}=i.tags,b=d`
    & ul {
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        margin: 0.6rem;
        overflow: hidden;
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        background-color: inherit;
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & h3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          & button {
            width: 100%;
            border: none;
            background-color: inherit;
            text-align: left;
            font-size: large;
            font-weight: bold;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
        }
      }
    }
  `;return function(...S){let[{data:E=[],...H}]=V(S);const y=i.state(""),A=Se(e),j=x=>()=>{y.val==x?y.val="":y.val=x},I=x=>{const{Header:L,Content:D,name:O}=x,T=()=>p({class:()=>y.val==O&&"active"},w({type:"button","aria-controls":`bau-${O}`,"aria-expanded":()=>y.val==O},L(x))),z=()=>u({id:`bau-${O}`,"data-state":()=>y.val==O},D(x));return f({onclick:j(O)},A({Header:T,Content:z}))};return u({class:["accordion",b,H.class]},a(E.map(I)))}}function Ee(e){const{bau:i,css:d}=e,{h1:u,article:a,img:f}=i.tags,p=[{question:"What is Frontend Mentor, and how will it help me?",answer:"Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building."},{question:"Is Frontend Mentor free?",answer:"Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels."},{question:"Can I use Frontend Mentor projects in my portfolio?",answer:"Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!"}],w=ke(e),b=d`
    background-color: white;
    min-width: 400px;
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-radius: 0.6rem;
    padding: 1rem;
    margin: 0.5rem;
    h1 {
      display: inline-flex;
      gap: 1rem;
    }
  `;return function(){return a({class:b},u(f({src:"./assets/images/icon-star.svg",alt:"star"}),"FAQs"),w({data:p.map(({question:S,answer:E})=>({Header:()=>S,Content:()=>E}))}))}}const Oe=Ce(),Pe=e=>{const{bau:i}=e,{main:d}=i.tags,u=Ee(e);return function(){return d(u())}},je=Pe(Oe);var oe;(oe=document.getElementById("app"))==null||oe.replaceChildren(je());
