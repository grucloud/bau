(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();let ne=e=>Object.prototype.toString.call(e??0).slice(8,-1),fe=e=>ne(e)=="Object",se=e=>ne(e)=="Function",ee=e=>["Object","Array"].includes(ne(e)),le=Object.getPrototypeOf,te=e=>U(e)?e.val:e,ie=e=>Array.isArray(e)?e:[e],U=e=>e==null?void 0:e.__isState,me=["splice","push","pop","shift","unshift","sort","reverse"];const V=e=>!U(e[0])&&fe(e[0])?[e[0],e.slice(1)]:[{},e];function pe(e){let t=window,{document:n}=t,o,r=new Set,s=[],l,g=a=>n.createElement(a),m=(a,d,i)=>{let u=l;l=d;try{return a(i)}catch(c){return console.error(c),i}finally{l=u}},b=()=>{o||(o=t.requestAnimationFrame(()=>{r.forEach(a=>{a.bindings=a.bindings.filter(({element:d})=>{var i;return(i=Array.isArray(d)?d[0]:d)==null?void 0:i.isConnected}),!a.bindings.length&&!a.computed&&r.delete(a)}),o=void 0}))},y=(a,d)=>{!s.length&&t.requestAnimationFrame(p),s.push([a,d])};const p=()=>{let a=0,d=s.length;do{for(let i of new Set(s.slice(a,d).flatMap(([u])=>u.listeners)))A(i.computed,i.state);a=d,d=s.length}while(a<d);for(let i of new Set(s.flatMap(([u,c])=>u.bindings.map(C=>(C.op=c,C)))))f(i);s=[],b()};let f=a=>{var Q;const{deps:d,element:i,renderInferred:u,render:c,renderItem:C,isAttribute:$,op:N=[]}=a,[h,v,k,L,O]=N;if(h&&C)(Q=j(i,k,(..._)=>z(C(..._)),v,L,O)[h])==null||Q.call();else{let _=u?u({element:i}):c({element:i,renderItem:C})(...d.map(te));if(_!==i&&!$){let G=ie(a.element=z(_)),Y=ie(i),q=0;for(;q<Y.length&&q<G.length;q++)Y[q].replaceWith(z(G[q]));let J=q;for(;G.length>J;)G[J-1].after(G[J]),J++;for(;Y.length>q;)Y[q].remove(),q++}}},S=(a,d,i=[])=>({get(u,c,C){var $,N;if(($=l==null?void 0:l.g)==null||$.add(a),c==="_isProxy")return!0;if(!((N=u[c])!=null&&N._isProxy)&&!U(u[c])&&ee(u[c]))u[c]=new Proxy(u[c],S(a,d,[...i,c]));else if(me.includes(c)){let h=u[c];return(...v)=>{let k=h.apply(u,v);return y(a,[c,k,v,d,i]),k}}return Reflect.get(u,c,C)},set(u,c,C,$){let N=Reflect.set(u,c,C,$);return y(a,["setItem",N,{prop:c,value:C},d,[...i,c]]),N}}),w=(a,d)=>new Proxy(d,S(a,d)),j=(a,d,i,u,c,C)=>{let $=()=>{if(u.length==0)a.textContent="";else{for(var h=0;h<u.length&&h<a.children.length;h++){const k=a.children[h];k!=null&&k.bauUpdate?k.bauUpdate(k,u[h]):k.replaceWith(i(u[h],h))}let v=a.children[h];if(v)for(;v;){const k=v.nextSibling;v.remove(),v=k}else for(;h<u.length;h++)a.appendChild(i(u[h],h))}},N=h=>a[h]&&a.removeChild(a[h]);return{assign:$,sort:$,reverse:$,setItem:()=>{let h=C[0],v=a.children[h],k=c[h];v&&(v!=null&&v.bauUpdate?v.bauUpdate(v,k):v.replaceWith(i(k,h)))},push:()=>{for(let h=0;h<d.length;h++)a.appendChild(i(d[h],c.length+h))},unshift:()=>{for(let h=d.length-1;h>=0;h--)a.prepend(i(d[h]))},pop:()=>N("lastChild"),shift:()=>N("firstChild"),splice:()=>{const{length:h}=a.children;let[v,k=h,...L]=d;for(let O=v>=0?Math.min(v+k-1,h-1):h-1;O>=(v>=0?v:h+v);O--)a.children[O].remove();if(L.length){let O=L.map((Q,_)=>i(Q,v+_));a.children[v]?a.children[v].before(...O):a.append(...O)}}}},x=(a,{onUpdate:d,name:i}={})=>({name:i,rawVal:a,bindings:[],listeners:[],__isState:!0,get val(){var c;let u=this;return(c=l==null?void 0:l.g)==null||c.add(u),u.valProxy??(u.valProxy=ee(a)?w(u,a):a,u.valProxy)},set val(u){var $;let c=this,C=c.rawVal;($=l==null?void 0:l.s)==null||$.add(c),d==null||d(C,u),c.rawVal=u,ee(u)?(c.valProxy=w(c,u),y(c,["assign",u])):u!==C&&(c.valProxy=u,c.bindings.length+c.listeners.length&&y(c))}}),z=a=>{if(a==null||a===!1){let d=g("span");return d.style.display="none",d}else return a.nodeType?a:Array.isArray(a)?a.map(z):n.createTextNode(a)},A=(a,d)=>{let i={g:new Set,s:new Set};return d.val=m(a,i),i},P=(a,d)=>{let i=x(void 0,d),u=A(a,i);i.computed=!0;let c={computed:a,state:i};for(let C of new Set([...u.g].filter($=>!u.s.has($)&&$.listeners.every(N=>!u.g.has(N.state)))))C.listeners.push(c);return i},B=(a,d=[])=>{for(let i of d)if(Array.isArray(i))B(a,i);else if(i!=null){let u=U(i)?E({deps:[i],render:()=>c=>c}):se(i)?H(i):z(i);Array.isArray(u)?a.append(...u):a.appendChild(u)}},D={},R=(a,d)=>a&&(Object.getOwnPropertyDescriptor(a,d)??R(le(a),d)),F=(a,d,i)=>{var u;return D[a+","+d]??(D[a+","+d]=((u=R(i,d))==null?void 0:u.set)??0)},M=(a,d)=>new t.MutationObserver((i,u)=>{i.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(C=>C===a&&(d({element:a}),u.disconnect(),!0)))}).observe(a.parentNode,{childList:!0}),I=(a,d)=>new t.MutationObserver((i,u)=>i.forEach(c=>d({record:c,element:a}))).observe(a,{childList:!0}),X=a=>new Proxy(function(i,...u){var N;let[c,C]=V(u),$=a?n.createElementNS(a,i):g(i);for(let[h,v]of Object.entries(c))if(h=="bauUpdate")$[h]=v;else if(!h.startsWith("bau")){let k=F(i,h,le($))?L=>L!==void 0&&($[h]=L):L=>$.setAttribute(h,Array.isArray(L)?L.filter(O=>O).join(" "):L);v==null||(U(v)?E({deps:[v],render:()=>()=>(k(v.val),$)},!0):se(v)&&(!h.startsWith("on")||v.isDerived)?H(()=>(k(v({element:$})),$),!0):v.renderProp?E({deps:v.deps,render:()=>()=>(k(v.renderProp({element:$})(...v.deps.map(te))),$)},!0):k(v))}return c.bauChildMutated&&I($,c.bauChildMutated),B($,C),$.autofocus&&$.focus&&t.requestAnimationFrame(()=>$.focus()),(N=c.bauCreated)==null||N.call(c,{element:$}),c.bauMounted&&t.requestAnimationFrame(()=>c.bauMounted({element:$})),c.bauUnmounted&&t.requestAnimationFrame(()=>M($,c.bauUnmounted)),$},{get:(d,i)=>d.bind(void 0,i)}),W=(a,d,i,u)=>{a.element=z(i),a.isAttribute=u;for(let c of d.g)U(c)&&(r.add(c),c.bindings.push(a));return a.element},H=(a,d)=>{let i={g:new Set,s:new Set},u=m(a,i,{});return W({renderInferred:a},i,u,d)},E=({deps:a,element:d,render:i,renderItem:u},c)=>W({deps:a,render:i,renderItem:u},{g:new Set(a),s:new Set},i({element:d,renderItem:u})(...a.map(te)),c),T=(a,d,i)=>E({deps:[a],render:({renderItem:u})=>c=>{for(let C=0;C<c.length;C++)d.appendChild(u(c[C],C));return d},renderItem:i});return{tags:X(),tagsNS:X,state:x,bind:E,loop:T,derive:P,stateSet:r}}const ve=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},be=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},ye=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function we(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...s)=>{const l=ye(r,s),g=ve(l);return!t.getElementById(g)&&be(t,e==null?void 0:e.target,g,o(g,l)),g};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}const oe=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],$e=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],xe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ke=e=>`var(--color-${e})`,Se=e=>`var(--color-${e}-lightest)`,Ce=()=>oe.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Se(e)};
}
.solid.${e} {
  background-color: ${ke(e)};
}
`).join(`
`),Ae=()=>oe.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),je=e=>100-e*10,ze=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${je(t)}%);`).join(`
`),ce=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Ee=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...$e.map(([r,s])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),...xe.map(([r,s])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ne({createGlobalStyles:e},{colorPalette:t=oe}={}){e`
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
      ${t.map(([n,o])=>Ee([n,o])).join(`
`)}
      ${ze()}
      ${ce({})}
      ${Ce()}
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
      ${Ae()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ce({dark:!0})};
    }
  `}function Pe(e){const t=pe(),n=we({target:window.document.getElementById("bau-css")});return Ne(n),{bau:t,...n,tr:o=>o,window,...e}}const Be=(e,t)=>({...e,paths:[...t,e.path]}),de=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=Be(o,e);return n?[r,...de({paths:[...e,o.path],routes:n})]:r}),Le=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Te=({routes:e=[],notFoundRoute:t})=>{const n=de({routes:e}).map(o=>({...o,regex:Le(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:s})=>s.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function De({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const r=l=>{o={...l}},s=Te({routes:e,notFoundRoute:t});return window.addEventListener("popstate",l=>{o.pathname!=l.target.location.pathname&&n({router:s}),r(l.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(l,g,m)=>{l.apply(g,m),o.pathname!=window.location.pathname&&n({router:s}),r(window.location)}}),document.addEventListener("click",l=>{const{target:g}=l,m=g.closest("a");if(!m)return;const b=m.getAttribute("href");b&&!b.startsWith("http")&&!b.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",b),history.pushState({},null,b),r(window.location),["?","#"].includes(b[0])||window.scrollTo({top:0,left:0}),l.preventDefault())}),n({router:s}),s}const Me=({context:e,LayoutDefault:t,config:{base:n=""}={}})=>{const{window:o,bau:r}=e,s=r.state();let l;return({router:g})=>{var f;const m=o.location.pathname.replace(n,""),{title:b,component:y,Layout:p=t}=g.resolve({pathname:m});l!=p&&(l=p,(f=document.getElementById("app"))==null||f.replaceChildren(p({componentState:s}))),s.val=y({}),document.title=`${b} - Rest Countries`}},K=["neutral","primary","success","danger","warning"],Oe="light",Re=()=>K.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ie(e,t={}){const{bau:n,css:o,window:r}=e,{input:s}=n.tags,l=y=>{r.document.documentElement.setAttribute("data-theme",y),localStorage.setItem("theme",y)},g=()=>{try{return localStorage.getItem("theme")}catch{}},m=g();m?l(m):r.matchMedia("(prefers-color-scheme: dark)").matches?l("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?l("light"):l(Oe);const b=o`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 1.7rem;
      height: 1.7rem;
    }
    &.sm::after {
      font-size: 1rem;
    }
    &.md {
      width: 2rem;
      height: 2rem;
    }
    &.md::after {
      font-size: 1.5rem;
    }
    &.lg {
      width: 3rem;
      height: 3rem;
    }
    &.lg::after {
      font-size: 2.3rem;
    }
    ${Re()}
  `;return function(...p){let[{size:f=t.size??"md",variant:S=t.variant??"plain",color:w=t.color??"neutral",...j},x]=V(p);return s({required:"required",title:"Switch Theme",name:"theme-switch",...j,class:["theme-switch",w,S,f,b,t==null?void 0:t.class,j.class],type:"checkbox",checked:g()=="dark",onclick:z=>{l(z.target.checked?"dark":"light")}},x)}}const Fe=e=>{const{bau:t,css:n}=e,{header:o,h1:r,label:s}=t.tags,l=Ie(e),g=n`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-background-color);
    padding-inline: 3rem;
    padding-block: 1rem;
    box-shadow: 0 0 3px 3px rgb(0 0 0 / 3%);
    h1 {
      font-size: 1.5rem;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      &::after {
        font-size: small;
        content: "Dark Mode";
      }
      &:has(> input:checked) {
        &::after {
          content: "Light Mode";
        }
      }
    }
  `;return()=>o({class:g},r("Where in the world?"),s(l()))},He=e=>{const{bau:t,css:n}=e,{div:o}=t.tags,r=Fe(e);return function({componentState:l}){return o({class:n`
          display: flex;
          min-width: 100vw;
          min-height: 100vh;
          flex-direction: column;
        `},r(),o({style:"flex-grow: 1"},()=>l.val))}},qe=()=>K.map(e=>`
&.input.${e} {
  border: 2px solid transparent;
}
&.input.plain.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
}
&.input.outline.${e} {
  border: 1px solid var(--color-${e});
  &:focus {
    outline: 4px auto var(--color-${e});
  };
}
&.input.solid.${e} {
  &:focus {
    outline: 4px auto var(--color-${e}-lightest);
  };
  &::placeholder {
    color: var(--font-color-inverse-secondary);
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function Ve(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    display: inline-block;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    &.input:disabled {
      filter: grayscale(100%);
      background-color: var(--color-emphasis-100);
    }
    &.sm {
      padding: 0.4rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.8rem;
    }
    ${qe()}
  `;return function(g){var p;const{variant:m=t.variant??"outline",color:b=t.color??"neutral",...y}=g;return r({type:"text",...y,class:["input",t.class,t.size??"md",b,m,s,Array.isArray(g.class)?(p=g.class)==null?void 0:p.join(" "):g.class]})}}function We(e,t={}){const{bau:n,css:o,window:r}=e,s=Ve(e,t);return function(g){const{variant:m=t.variant??"outline",color:b=t.color??"neutral",...y}=g,f=`url('data:image/svg+xml,<svg fill="${r.getComputedStyle(r.document.documentElement).getPropertyValue(m=="solid"?"--font-color-inverse-secondary":"--font-color-secondary")}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,S=o`
      &.inputSearch {
        padding-left: 1.8rem;
        background-image: ${f};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...y,color:b,variant:m,class:["inputSearch",t.class,S,y.class]})}}function _e(e,t){const{bau:n,css:o,window:r}=e,{dialog:s}=n.tags,l=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...m){let[{contentEl:b,triggerEl:y,onClose:p,...f},...S]=V(m);const w=z=>{x.style.opacity=1,x.showModal();const A=y.getBoundingClientRect(),P=x.getBoundingClientRect();A.x<r.innerWidth/2?x.style.left=A.left+"px":x.style.left=A.right-P.width+"px",A.y<r.innerHeight/2?(x.style.top=A.top+A.height+"px",x.style.height=Math.min(x.scrollHeight,r.innerHeight-A.top-A.height)+"px"):(x.style.top=Math.max(0,A.top-P.height)+"px",x.scrollHeight>A.top&&(x.style.height=A.top+"px"))},j=z=>{const A=()=>{x.close(),x.removeEventListener("transitionend",A)};x.addEventListener("transitionend",A),x.style.opacity=0},x=s({role:"presentation",class:["popover",l,t==null?void 0:t.class,f==null?void 0:f.class],onclick:z=>{z.target===x&&(j(),p==null||p.call())}},b);return x.closeDialog=j,x.openDialog=w,x}}const Ue=()=>K.map(e=>`
&.button.plain.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
  };
}
&.button.solid.${e} {
  &:focus {
    outline: 4px auto var(--color-${e}-lightest);
  };
}
`).join(`
`);function ue(e,t={}){const{bau:n,css:o}=e,r=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
    &.outline,
    &.solid {
      box-shadow: var(--shadow-m);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
      cursor: pointer;
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.button:disabled {
      filter: grayscale(1) brightness(var(--brightness-hover));
      cursor: not-allowed;
      pointer-events: none;
    }
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
      min-width: 2rem;
      min-height: 2rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }
    & i {
      font-style: normal;
    }
    ${Ue()}
  `;return function(...l){var w;let[{size:g=t.size??"md",variant:m=t.variant??"none",color:b=t.color??"none",href:y,...p},f]=V(l);return(y?n.tags.a:n.tags.button)({...!y&&{type:"button"},...p,class:["button",m,g,b,r,t.class,Array.isArray(p.class)?(w=p.class)==null?void 0:w.join(" "):p.class],href:y},f)}}function Ke(e,t={}){const{bau:n,css:o}=e,{ul:r}=n.tags,s=o`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness-hover-always));
      }
      & li.active {
        filter: brightness(var(--brightness-active-always));
      }
    }
    & > li {
      padding: 0.4rem;
      cursor: pointer;
      background-color: inherit;
      transition: all var(--transition-slow) ease-out;
      display: flex;
      align-items: center;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
  `;return function(...g){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:y=t.color??"neutral",...p},f]=V(g);return r({...p,class:["list",s,y,b,m,t==null?void 0:t.class,p==null?void 0:p.class.join(" ")]},f)}}const Z={sm:12,md:16,lg:24},Xe=()=>K.map(e=>`
&.${e} {
  background-color:transparent;
}
&.plain.${e} {
  & .path {
    stroke: var(--color-${e});
  }
}
&.outline.${e} {
  border: none;
  & .path {
    stroke: var(--color-${e});
  }
}
&.solid.${e} {
  background-color: transparent;
  & .path {
    stroke: var(--font-color-inverse);
  }
}
`).join(`
`);function Ge(e,t={}){const{bau:n,css:o,keyframes:r}=e,{svg:s,circle:l}=n.tagsNS("http://www.w3.org/2000/svg"),g=r`
    100% {
      transform: rotate(360deg);
    }
  `,m=r`
0% {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -35;
}
100% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -124;
}
  `;return function({size:y=t.size??"md",color:p=t.color??"primary",variant:f=t.variant??"outline",visibility:S=!0,...w}={}){const j=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${g} 2s linear infinite;
      width: ${Z[y]};
      height: ${Z[y]};
      & .path {
        stroke-linecap: round;
        animation: ${m} 1.5s ease-in-out infinite;
      }
      ${Xe()}
    `;return s({class:{deps:[S],renderProp:()=>x=>["spinner",j,p,f,x==!1?"":"visibility",t==null?void 0:t.class,w.class]},version:"1.1",x:"0px",y:"0px",width:Z[y],height:Z[y],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...w},l({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Qe=()=>K.map(e=>`
& button.plain {
  color: var(--font-color-secondary);
}
& button.plain.${e}::after {
  color: var(--font-color-secondary);
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ye(e,t={}){const{bau:n,css:o}=e,{div:r,li:s,select:l,option:g}=n.tags,m=ue(e),b=_e(e),y=Ke(e),p=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
      border: 0;
    }
    dialog {
      outline: none;
    }
    & button {
      &.lg {
        padding: 0.8rem;
      }
      box-shadow: var(--shadow-s);

      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${Qe()}
  `;return function(...S){let[{size:w=t.size??"md",variant:j=t.variant??"outline",color:x=t.color??"neutral",label:z,Option:A,options:P,defaultOption:B,getOptionLabel:D,getOptionValue:R,onSelect:F=()=>{},loading:M,...I},X]=V(S);const W=Ge(e,{variant:j,color:x,size:w}),H=n.state(B?D(B):z),E=n.state(!1),T=n.state(0),a=()=>{h.openDialog(),h.focus(),E.val=!0},d=()=>{h.closeDialog(),E.val=!1},i=()=>{E.val=!1},u=k=>{h.open?d():a(),k.preventDefault()},c=({option:k,index:L})=>O=>{H.val=D(k),v.value=R(k),v.setCustomValidity(""),T.val=L,d(),F(k),O.preventDefault()},C=k=>{if(h.open)switch(k.preventDefault(),k.key){case"Escape":d();break;case"ArrowDown":T.val<P.length-1?T.val++:T.val=0;break;case"ArrowUp":T.val<=0?T.val=P.length-1:T.val--;break;case"Enter":h.open?(H.val=D(P[T.val]),v.value=R(g),F(P[T.val]),d()):a();break}},$=()=>y({tabindex:"0",class:[x,j]},P.map((k,L)=>s({class:()=>T.val==L&&"active",onclick:c({option:k,index:L})},A(k)))),N=m({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":E,"aria-label":z,onclick:u,color:x,variant:j,size:w,class:M==!0&&"loading",disabled:M},()=>!H.val&&z,H,()=>M==!0&&W({visibility:M})),h=b({triggerEl:N,contentEl:$(),onClose:i}),v=l({...I,"aria-label":z,tabindex:"-1"},g({value:""},"--Select Category--"),P.map(k=>g({value:R(k)},D(k))));return B?v.value=R(B):v.value=I.value,r({...I,class:["select",x,w,p,t==null?void 0:t.class,I==null?void 0:I.class],onkeydown:C},v,N,h)}}function Je(e){const{bau:t,css:n}=e,{span:o,div:r}=t.tags,s=Ye(e,{color:"neutral",variant:"plain"}),l=[{label:"All"},{label:"Africa"},{label:"Americas"},{label:"Asia"},{label:"Europe"},{label:"Oceania"}],g=b=>r({class:n`
          display: flex;
          justify-content: space-between;

          gap: 0.5rem;
        `},o(b.label),o(b.code)),m=n``;return b=>s({name:"region",class:m,options:l,Option:g,getOptionValue:({label:y})=>y,getOptionLabel:({label:y})=>y,label:"Filter by region",...b})}function he(e,t={}){const{bau:n,css:o,keyframes:r}=e,{div:s}=n.tags,l=r`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `,g=o`
    background-color: var(--color-emphasis-200);
    position: relative;
    overflow: hidden;
    &::after {
      animation: 2s linear 0.5s infinite normal none running ${l};
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      content: "";
      position: absolute;
      transform: translateX(-100%);
      inset: 0px;
    }
  `;return function(...b){let[{size:y=t.size??"md",variant:p=t.variant??"plain",color:f=t.color??"neutral",...S},w]=V(b);return s({...S,class:["skeleton",y,g,t==null?void 0:t.class,S==null?void 0:S.class]},w)}}const Ze={danger:"⚠",warning:"⚠",success:"✔",primary:"ⓘ",neutral:"ⓘ"},et=()=>K.map(e=>`
&.alert {
  &.plain.${e} {
    & .icon {
      color: var(--color-${e});
      
    }
  }
  &.outline.${e} {
    & .icon {
      color: var(--color-${e});
    }
    border: 2px solid var(--color-${e});
  }
}
  `).join(`
`);function ae(e,t={}){const{bau:n,css:o}=e,{div:r,span:s}=n.tags,l=o`
    display: inline-flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    &.sm {
      & .icon {
        font-size: 1.3rem;
      }
    }
    &.lg {
      & .icon {
        font-size: 2.5rem;
      }
    }
    & .icon {
      padding: 0 0.5rem;
      font-size: 2rem;
    }
    & .content {
      padding: 0 0.5rem;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
    }
    & .button-close {
      margin: 1rem;
    }
    ${et()}
  `,g=ue(e),m=({onclick:b})=>g({"aria-label":"Close",onclick:b,class:"button-close"},"✖");return function(...y){let[{size:p=t.size??"md",variant:f=t.variant??"outline",color:S=t.color??"neutral",onRemove:w,...j},x]=V(y);return r({...j,class:["alert",`alert-${f}`,t.class,f,S,p,l,j.class],role:"alert"},s({class:"icon"},Ze[S]),r({class:"content"},x),w&&m({onclick:w}))}}function tt(e,{store:t}){const{bau:n,css:o}=e,{a:r,ul:s,li:l,div:g,p:m,img:b,h1:y,figure:p,figcaption:f,strong:S}=n.tags,{getAll:w}=t,j=he(e),x=ae(e,{color:"danger",variant:"outline"}),z=o`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    > li {
      box-shadow: var(--shadow-s);
      overflow: hidden;
      width: 13rem;
      min-height: 10rem;
      border-radius: 1rem 1rem 0 0;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(4px);
      }
      &:has(> a:focus) {
        outline: 2px solid var(--color-primary);
      }
      > a {
        text-decoration: none;
        color: var(--color);
        outline: none;
      }
      figure {
        > figcaption {
          padding: 1rem;
          > h1 {
            font-size: 1rem;
          }
          > p {
            font-size: 0.7rem;
            line-height: 1.6rem;
          }
        }
        > img {
          height: 10rem;
          object-fit: cover;
          width: 100%;
        }
      }
    }
  `,A=()=>s({class:z},new Array(16).fill("").map(()=>l(j({class:o`
              width: 100%;
              height: 15rem;
            `})))),P=({name:B,flag:D,population:R,region:F,capital:M})=>l(r({href:B,tabindex:"0"},p(b({class:"flag-picture",src:D,alt:B}),f(y(B),m(S("Population: "),R),m(S("Region: "),F),m(S("Capital: "),M)))));return({data:B})=>g(()=>w.loading.val&&A(),()=>w.error.val&&x(w.error.val),s({class:z},B.map(D=>P(D))))}function rt(e,{store:t}){const{bau:n,css:o}=e,{article:r,p:s,form:l}=n.tags,g=We(e,{size:"lg",color:"neutral",variant:"plain"}),m=n.state(""),b=n.state(""),y=n.derive(()=>{let w=t.getAll.data.val;return m.val&&(w=w.filter(({name:j})=>new RegExp(`${m.val}`,"i").test(j))),b.val&&(w=w.filter(({region:j})=>j==b.val)),w}),p=Je(e),f=tt(e,{store:t}),S=o`
    padding-inline: 3rem;
    padding-block: 2rem;
    > p {
      margin-block: 1rem;
    }
    .search {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `;return()=>r({class:S},l(s({class:"search"},g({name:"country",placeholder:"Search for a country",size:24,value:m.val,oninput:w=>m.val=w.target.value}),p({defaultOption:{label:b.val},onSelect:w=>{w.label=="All"?b.val="":b.val=w.label}}))),s(()=>f({data:y.val})))}function at(e,{store:t}){const{bau:n,css:o,window:r}=e,{h1:s,article:l,div:g,img:m,figure:b,figcaption:y,strong:p,p:f,section:S,a:w,span:j,ul:x,li:z}=n.tags,{getByName:A,findBorder:P}=t;n.derive(()=>{const E=A.data.val[0];E!=null&&E.borders&&P.run(E.borders)});const B=he(e),D=ae(e,{color:"danger",variant:"outline"}),R=ae(e,{size:"sm",color:"danger",variant:"outline"}),F=o`
    margin-block: 2rem;
    > figure {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      > img {
        width: 100%;
        margin: auto;
      }
      > figcaption {
        padding: 1rem;
        .country-detail {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          font-size: smaller;
          line-height: 2rem;
        }
      }
    }
  `,M=()=>B({class:o`
        width: 80%;
        height: 1.5rem;
        margin-block: 0.6rem;
      `}),I=()=>l({class:F},b(B({class:o`
            width: 100%;
            height: 15rem;
          `}),y(M(),f({class:"country-detail"},S(new Array(4).fill("").map(()=>f(M()))),S(new Array(3).fill("").map(()=>f(M()))))))),X=()=>g({class:o`
          display: inline-flex;
          align-items: flex-start;
          gap: 1rem;
          > ul {
            list-style: none;
            display: inline-flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 0.5rem;
            > li {
              padding-inline: 0.6rem;
              box-shadow: var(--shadow-s);
              a {
                text-decoration: none;
                font-size: 0.75rem;
                text-wrap: nowrap;
              }
            }
          }
        `},p("Borders:"),()=>P.loading.val&&x(new Array(3).fill("").map(()=>z(B({class:o`
                  width: 4rem;
                  height: 1.5rem;
                `})))),()=>P.error.val&&R(P.error.val),()=>x(P.data.val.map(({name:E})=>z(w({href:E.common},E.common))))),W=({name:E,flag:T,population:a,region:d,subregion:i,capital:u,currencies:c,languages:C,topLevelDomain:$})=>l({class:F},b(m({class:"flag-picture",src:T,alt:E}),y(s(E),f({class:"country-detail"},S(f(p("Native Name: "),E),f(p("Population: "),a),f(p("Region: "),d),f(p("Sub Region: "),i),f(p("Capital: "),u)),S(f(p("Top Level Domain: "),$.join(", ")),f(p("Currencies: "),c.map(({name:N})=>N).join(", ")),f(p("Languages: "),C.map(({name:N})=>N).join(", ")))),f(X())))),H=()=>w({class:o`
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          padding-inline: 1rem;
          border-radius: 0.5rem;
          gap: 0.5rem;
          box-shadow: var(--shadow-s);
          span {
            font-size: 1.7rem;
          }
        `,onclick:()=>{r.history.back()}},j("←"),"BACK");return({})=>g({class:o`
          padding: 2rem;
          > p {
            margin-bottom: 1rem;
          }
        `},f(H()),f(()=>A.error.val&&D(A.error.val)),()=>A.loading.val&&I(),()=>A.data.val[0]&&W(A.data.val[0]))}function nt(e){const{bau:t}=e;return function(o,r){const s=t.state(!1),l=t.state(!1),g=t.state((r==null?void 0:r.initialState)??""),m=t.state("");return{loading:s,data:g,error:m,completed:l,run:async(...p)=>{if(!s.val)try{m.val="",s.val=!0,l.val=!1;const f=await o(...p);return g.val=f,l.val=!0,s.val=!1,f}catch(f){throw m.val=f.message,l.val=!0,s.val=!1,f}},reset:async()=>{m.val="",s.val=!1,l.val=!1,g.val=(r==null?void 0:r.initialState)??""}}}}function ot(e){const t=nt(e),n=async({url:o})=>{console.log(o);const r=await fetch(o,{method:"get",headers:{"Content-Type":"application/json"}});if(r.ok)return await r.json();throw Error(r.statusText||String(r.status))};return{getAll:t(()=>n({url:"https://restcountries.com/v2/all?fields=name,capital,flag,population,region"}),{initialState:[]}),getByName:t(({name:o})=>n({url:`https://restcountries.com/v2/name/${o}`})),findBorder:t(o=>n({url:`https://restcountries.com/v3.1/alpha?codes=${o.join(",")}&fields=name,`}),{initialState:[]})}}const st=({context:e})=>{const t=ot(e),n=at(e,{store:t}),o=rt(e,{store:t});return[{path:"",action:r=>(t.getAll.data.val.length==0&&t.getAll.run(),{routerContext:r,title:"Countries",component:()=>o()})},{path:"(?<country>.[^/]+)",action:({match:{groups:r}})=>(t.getByName.reset(),t.findBorder.reset(),t.getByName.run({name:r.country}),{title:`${r.country}`,component:()=>n(r)})}]},ge={base:"/bau/frontendmentor/rest-countries"},re=Pe({config:ge});De({routes:st({context:re}),onLocationChange:Me({context:re,config:ge,LayoutDefault:He(re)})});
