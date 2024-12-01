(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))g(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const p of h.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&g(p)}).observe(document,{childList:!0,subtree:!0});function u(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerPolicy&&(h.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?h.credentials="include":i.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function g(i){if(i.ep)return;i.ep=!0;const h=u(i);fetch(i.href,h)}})();let ee=t=>Object.prototype.toString.call(t??0).slice(8,-1),se=t=>ee(t)=="Object",re=t=>ee(t)=="Function",J=t=>["Object","Array"].includes(ee(t)),oe=Object.getPrototypeOf,Q=t=>E(t)?t.val:t,ne=t=>Array.isArray(t)?t:[t],E=t=>t==null?void 0:t.__isState,le=["splice","push","pop","shift","unshift","sort","reverse"];const ie=t=>!E(t[0])&&se(t[0])?[t[0],t.slice(1)]:[{},t];function ce(t){let c=window,{document:u}=c,g,i=new Set,h=[],p,$=e=>u.createElement(e),N=(e,a,r)=>{let n=p;p=a;try{return e(r)}catch(o){return console.error(o),r}finally{p=n}},q=()=>{g||(g=c.requestAnimationFrame(()=>{i.forEach(e=>{e.bindings=e.bindings.filter(({element:a})=>{var r;return(r=Array.isArray(a)?a[0]:a)==null?void 0:r.isConnected}),!e.bindings.length&&!e.computed&&i.delete(e)}),g=void 0}))},S=(e,a)=>{!h.length&&c.requestAnimationFrame(R),h.push([e,a])};const R=()=>{let e=0,a=h.length;do{for(let r of new Set(h.slice(e,a).flatMap(([n])=>n.listeners)))L(r.computed,r.state);e=a,a=h.length}while(e<a);for(let r of new Set(h.flatMap(([n,o])=>n.bindings.map(f=>(f.op=o,f)))))U(r);h=[],q()};let U=e=>{var B;const{deps:a,element:r,renderInferred:n,render:o,renderItem:f,isAttribute:d,op:y=[]}=e,[s,l,m,w,x]=y;if(s&&f)(B=V(r,m,(...j)=>k(f(...j)),l,w,x)[s])==null||B.call();else{let j=n?n({element:r}):o({element:r,renderItem:f})(...a.map(Q));if(j!==r&&!d){let z=ne(e.element=k(j)),W=ne(r),A=0;for(;A<W.length&&A<z.length;A++)W[A].replaceWith(k(z[A]));let _=A;for(;z.length>_;)z[_-1].after(z[_]),_++;for(;W.length>A;)W[A].remove(),A++}}},T=(e,a,r=[])=>({get(n,o,f){var d,y;if((d=p==null?void 0:p.g)==null||d.add(e),o==="_isProxy")return!0;if(!((y=n[o])!=null&&y._isProxy)&&!E(n[o])&&J(n[o]))n[o]=new Proxy(n[o],T(e,a,[...r,o]));else if(le.includes(o)){let s=n[o];return(...l)=>{let m=s.apply(n,l);return S(e,[o,m,l,a,r]),m}}return Reflect.get(n,o,f)},set(n,o,f,d){let y=Reflect.set(n,o,f,d);return S(e,["setItem",y,{prop:o,value:f},a,[...r,o]]),y}}),F=(e,a)=>new Proxy(a,T(e,a)),V=(e,a,r,n,o,f)=>{let d=()=>{if(n.length==0)e.textContent="";else{for(var s=0;s<n.length&&s<e.children.length;s++){const m=e.children[s];m!=null&&m.bauUpdate?m.bauUpdate(m,n[s]):m.replaceWith(r(n[s],s))}let l=e.children[s];if(l)for(;l;){const m=l.nextSibling;l.remove(),l=m}else for(;s<n.length;s++)e.appendChild(r(n[s],s))}},y=s=>e[s]&&e.removeChild(e[s]);return{assign:d,sort:d,reverse:d,setItem:()=>{let s=f[0],l=e.children[s],m=o[s];l&&(l!=null&&l.bauUpdate?l.bauUpdate(l,m):l.replaceWith(r(m,s)))},push:()=>{for(let s=0;s<a.length;s++)e.appendChild(r(a[s],o.length+s))},unshift:()=>{for(let s=a.length-1;s>=0;s--)e.prepend(r(a[s]))},pop:()=>y("lastChild"),shift:()=>y("firstChild"),splice:()=>{const{length:s}=e.children;let[l,m=s,...w]=a;for(let x=l>=0?Math.min(l+m-1,s-1):s-1;x>=(l>=0?l:s+l);x--)e.children[x].remove();if(w.length){let x=w.map((B,j)=>r(B,l+j));e.children[l]?e.children[l].before(...x):e.append(...x)}}}},P=(e,{onUpdate:a,name:r}={})=>({name:r,rawVal:e,bindings:[],listeners:[],__isState:!0,get val(){var o;let n=this;return(o=p==null?void 0:p.g)==null||o.add(n),n.valProxy??(n.valProxy=J(e)?F(n,e):e,n.valProxy)},set val(n){var d;let o=this,f=o.rawVal;(d=p==null?void 0:p.s)==null||d.add(o),a==null||a(f,n),o.rawVal=n,J(n)?(o.valProxy=F(o,n),S(o,["assign",n])):n!==f&&(o.valProxy=n,o.bindings.length+o.listeners.length&&S(o))}}),k=e=>{if(e==null||e===!1){let a=$("span");return a.style.display="none",a}else return e.nodeType?e:Array.isArray(e)?e.map(k):u.createTextNode(e)},L=(e,a)=>{let r={g:new Set,s:new Set};return a.val=N(e,r),r},X=(e,a)=>{let r=P(void 0,a),n=L(e,r);r.computed=!0;let o={computed:e,state:r};for(let f of new Set([...n.g].filter(d=>!n.s.has(d)&&d.listeners.every(y=>!n.g.has(y.state)))))f.listeners.push(o);return r},D=(e,a=[])=>{for(let r of a)if(Array.isArray(r))D(e,r);else if(r!=null){let n=E(r)?C({deps:[r],render:()=>o=>o}):re(r)?O(r):k(r);Array.isArray(n)?e.append(...n):e.appendChild(n)}},H={},I=(e,a)=>e&&(Object.getOwnPropertyDescriptor(e,a)??I(oe(e),a)),G=(e,a,r)=>{var n;return H[e+","+a]??(H[e+","+a]=((n=I(r,a))==null?void 0:n.set)??0)},Y=(e,a)=>new c.MutationObserver((r,n)=>{r.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(f=>f===e&&(a({element:e}),n.disconnect(),!0)))}).observe(e.parentNode,{childList:!0}),K=(e,a)=>new c.MutationObserver((r,n)=>r.forEach(o=>a({record:o,element:e}))).observe(e,{childList:!0}),v=e=>new Proxy(function(r,...n){var y;let[o,f]=ie(n),d=e?u.createElementNS(e,r):$(r);for(let[s,l]of Object.entries(o))if(s=="bauUpdate")d[s]=l;else if(!s.startsWith("bau")){let m=G(r,s,oe(d))?w=>w!==void 0&&(d[s]=w):w=>d.setAttribute(s,Array.isArray(w)?w.filter(x=>x).join(" "):w);l==null||(E(l)?C({deps:[l],render:()=>()=>(m(l.val),d)},!0):re(l)&&(!s.startsWith("on")||l.isDerived)?O(()=>(m(l({element:d})),d),!0):l.renderProp?C({deps:l.deps,render:()=>()=>(m(l.renderProp({element:d})(...l.deps.map(Q))),d)},!0):m(l))}return o.bauChildMutated&&K(d,o.bauChildMutated),D(d,f),d.autofocus&&d.focus&&c.requestAnimationFrame(()=>d.focus()),(y=o.bauCreated)==null||y.call(o,{element:d}),o.bauMounted&&c.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&c.requestAnimationFrame(()=>Y(d,o.bauUnmounted)),d},{get:(a,r)=>a.bind(void 0,r)}),b=(e,a,r,n)=>{e.element=k(r),e.isAttribute=n;for(let o of a.g)E(o)&&(i.add(o),o.bindings.push(e));return e.element},O=(e,a)=>{let r={g:new Set,s:new Set},n=N(e,r,{});return b({renderInferred:e},r,n,a)},C=({deps:e,element:a,render:r,renderItem:n},o)=>b({deps:e,render:r,renderItem:n},{g:new Set(e),s:new Set},r({element:a,renderItem:n})(...e.map(Q)),o),M=(e,a,r)=>C({deps:[e],render:({renderItem:n})=>o=>{for(let f=0;f<o.length;f++)a.appendChild(n(o[f],f));return a},renderItem:r});return{tags:v(),tagsNS:v,state:P,bind:C,loop:M,derive:X,stateSet:i}}const de=t=>{let c=0,u=11;for(;c<t.length;)u=101*u+t.charCodeAt(c++)>>>0;return"bau"+u},ue=(t,c,u,g)=>{const i=t.createElement("style");i.id=u,i.append(g),(c??t.head).append(i)},he=(t,c)=>t.reduce((u,g,i)=>u+g+(c[i]??""),"");function fe(t){let{document:c}=(t==null?void 0:t.window)??window;const u=g=>(i,...h)=>{const p=he(i,h),$=de(p);return!c.getElementById($)&&ue(c,t==null?void 0:t.target,$,g($,p)),$};return{css:u((g,i)=>`.${g} { ${i} }`),keyframes:u((g,i)=>`@keyframes ${g} { ${i} }`),createGlobalStyles:u((g,i)=>i)}}const te=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ge=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=t=>`var(--color-${t})`,be=t=>`var(--color-${t}-lightest)`,ve=()=>te.map(([t])=>`
.outline.${t} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${be(t)};
}
.solid.${t} {
  background-color: ${me(t)};
}
`).join(`
`),ye=()=>te.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),we=t=>100-t*10,xe=()=>new Array(10).fill("").map((t,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${we(c)}%);`).join(`
`),ae=({dark:t})=>new Array(10).fill("").map((c,u)=>`--color-emphasis-${u*100}: var(--color-gray-${t?1e3-u*100:u*100});`).join(`
`),$e=([t,{h:c,s:u,l:g}])=>[`--color-${t}-h: ${c};`,`--color-${t}-l: ${g};`,`--color-${t}-base-s: ${u};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${u} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...ge.map(([i,h])=>`--color-${t}-${i}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${h}));`),...pe.map(([i,h])=>`--color-${t}-${i}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${h}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function ke({createGlobalStyles:t},{colorPalette:c=te}={}){t`
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
      ${c.map(([u,g])=>$e([u,g])).join(`
`)}
      ${xe()}
      ${ae({})}
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
      --brightness-hover-reverse: 70% ${ae({dark:!0})};
    }
  `}function Ce(t){const c=ce(),u=fe({target:window.document.getElementById("bau-css")});return ke(u),{bau:c,...u,tr:g=>g,window,...t}}const Z=["days","hours","minutes","seconds"];function Ae(t){const{bau:c,css:u,keyframes:g}=t,{body:i,h1:h,div:p,small:$,img:N,a:q,footer:S,li:R,ul:U,main:T}=c.tags,F=new Date().getFullYear(),V=new Date(`January 01 ${F+1} 00:00:00`);return()=>{const P=Z.reduce((v,b)=>(v[b]={current:c.state("00"),old:c.state("00")},v),{});function k(){const b=V-new Date,{days:O,hours:C,minutes:M,seconds:e}=P;O.old.val=O.current.val,O.current.val=`${Math.floor(b/1e3/60/60/24)}`,C.old.val=C.current.val,C.current.val=`${Math.floor(b/1e3/60/60)%24}`.padStart(2,"0"),M.old.val=M.current.val,M.current.val=`${Math.floor(b/1e3/60)%60}`.padStart(2,"0"),e.old.val=e.current.val,e.current.val=`${Math.floor(b/1e3)%60}`.padStart(2,"0")}k(),setInterval(k,1e3);const L=g`
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(90deg);
      }
    `,X=g`
      0% ,
      50% {
        transform: rotateX(90deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    `,D=({current:v,old:b})=>p({class:u`
            --radius: 10px;
            --duration: 0.5s;
            --box-shadow: 0.5px 7px #191924;
            position: relative;

            border-radius: var(--radius);
            perspective: 500px;
            color: var(--soft-red);
            width: 6rem;
            font-size: 50px;

            @media (max-width: 500px) {
              width: 5rem;
              font-size: 40px;
            }

            .top,
            .top:before,
            .bottom,
            .bottom:before {
              font-weight: 700;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              width: 100%;
              left: 0%;
              text-align: center;
            }

            .top {
              position: relative;
              overflow: hidden;
              border-radius: var(--radius) var(--radius) 0 0;
              z-index: 1;
              background-color: var(--card-background-color);
              filter: brightness(70%);
              height: 50%;
              &:before {
                z-index: 1;
                position: absolute;
                height: 100%;
                content: attr(data-value);
                background-color: var(--card-background-color);
                border-top: 1px solid rgba(0, 0, 0, 0.4);
                box-shadow: var(--box-shadow);
              }
            }

            .bottom {
              overflow: hidden;
              z-index: 0;
              position: absolute;
              top: 0%;
              background-color: var(--card-background-color);
              border-radius: var(--radius);
              box-shadow: var(--box-shadow);

              &:before {
                z-index: 1;
                position: absolute;
                content: attr(data-value);
                background-color: var(--card-background-color);
                box-shadow: var(--box-shadow);
              }
            }

            &.animate .top:before {
              animation: ${L} var(--duration);
              transform-origin: bottom;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
            &.animate .bottom:before {
              animation: ${X} var(--duration);
              transform-origin: center;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
          `},p({class:"top","data-value":b},v),p({class:"bottom","data-value":v},b)),H=Z.map(v=>{const b=D(P[v]);return c.derive(()=>{P[v].current.val,b.classList.remove("animate"),b.offsetHeight,b.classList.add("animate")}),b}),I=()=>p({class:"countdown"},Z.map((v,b)=>p({class:"time"},H[b],$(v)))),G=u`
      background-image: url("./assets/images/bg-stars.svg");
      background-color: var(--very-dark-black-blue);
      color: white;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      & main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5rem;
      }
      & h1 {
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        text-align: center;
      }
      .countdown {
        display: flex;
        .time {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin: 1rem;
          @media (max-width: 500px) {
            gap: 0.5rem;
            margin: 0.5rem;
          }
          & small {
            color: var(--grayish-blue);
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.25rem;
            @media (max-width: 500px) {
              font-size: 0.6rem;
            }
          }
        }
      }
    `,Y=[{name:"facebook",href:"https://facebook.com"},{name:"instagram",href:"https://instagram.com"},{name:"pinterest",href:"https://pinterest.com"}],K=()=>S({class:u`
            background-image: url("./assets/images/pattern-hills.svg");
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 10rem;
            > ul {
              list-style: none;
              display: inline-flex;
              gap: 1.5rem;
              > li {
                /** https://angel-rs.github.io/css-color-filter-generator/ */
                &:hover {
                  filter: brightness(0) saturate(100%) invert(56%) sepia(64%)
                    saturate(1729%) hue-rotate(307deg) brightness(95%)
                    contrast(108%);
                }
              }
            }
          `},U(Y.map(({name:v,href:b})=>R(q({href:b},N({src:`./assets/images/icon-${v}.svg`,alt:v}))))));return i({class:G},T(h("We're launching soon"),I()),K())}}const Se=Ce(),Pe=Ae(Se);document.getElementsByTagName("body")[0].replaceWith(Pe());
