(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))h(i);new MutationObserver(i=>{for(const f of i)if(f.type==="childList")for(const v of f.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&h(v)}).observe(document,{childList:!0,subtree:!0});function d(i){const f={};return i.integrity&&(f.integrity=i.integrity),i.referrerPolicy&&(f.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?f.credentials="include":i.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function h(i){if(i.ep)return;i.ep=!0;const f=d(i);fetch(i.href,f)}})();let te=e=>Object.prototype.toString.call(e??0).slice(8,-1),le=e=>te(e)=="Object",oe=e=>te(e)=="Function",Q=e=>["Object","Array"].includes(te(e)),ae=Object.getPrototypeOf,Z=e=>j(e)?e.val:e,ne=e=>Array.isArray(e)?e:[e],j=e=>e==null?void 0:e.__isState,ie=["splice","push","pop","shift","unshift","sort","reverse"];const ce=e=>!j(e[0])&&le(e[0])?[e[0],e.slice(1)]:[{},e];function de(e){let c=window,{document:d}=c,h,i=new Set,f=new Set,v=!1,y,T=t=>d.createElement(t),F=(t,r,o)=>{let n=y;y=r;let a=t(o);return y=n,a},q=()=>{h||(h=c.requestAnimationFrame(()=>{i.forEach(t=>{t.bindings=t.bindings.filter(({element:r})=>{var o;return(o=Array.isArray(r)?r[0]:r)==null?void 0:o.isConnected}),!t.bindings.length&&!t.computed&&i.delete(t)}),h=void 0}))},S=(t,r,o,n,a,p)=>{var u;if(v){f.add([t,r,o,n,a,p]);return}for(let w of t.bindings){let{deps:s,element:l,renderInferred:b,render:$,renderItem:x,isAttribute:J}=w;if(x&&r)(u=R(l,n,(...P)=>k(x(...P)),o,a,p)[r])==null||u.call();else{let P=b?b({element:l}):$({element:l,renderItem:x})(...s.map(Z));if(P!==l&&!J){let N=ne(w.element=k(P)),U=ne(l),A=0;for(;A<U.length&&A<N.length;A++)U[A].replaceWith(k(N[A]));let W=A;for(;N.length>W;)N[W-1].after(N[W]),W++;for(;U.length>A;)U[A].remove(),A++}}}c.requestAnimationFrame(()=>G(t)),q()},D=(t,r,o=[])=>({get(n,a,p){var u;if(y==null||y.add(t),a==="_isProxy")return!0;if(!((u=n[a])!=null&&u._isProxy)&&!j(n[a])&&Q(n[a]))n[a]=new Proxy(n[a],D(t,r,[...o,a]));else if(ie.includes(a)){let w=n[a];return(...s)=>{let l=w.apply(n,s);return S(t,a,l,s,r,o),l}}return Reflect.get(n,a,p)},set(n,a,p,u){let w=Reflect.set(n,a,p,u);return S(t,"setItem",w,{prop:a,value:p},r,[...o,a]),w}}),L=(t,r)=>new Proxy(r,D(t,r)),R=(t,r,o,n,a,p)=>{let u=()=>{if(n.length==0)t.textContent="";else{for(var s=0;s<n.length&&s<t.children.length;s++){const b=t.children[s];b!=null&&b.bauUpdate?b.bauUpdate(b,n[s]):b.replaceWith(o(n[s],s))}let l=t.children[s];if(l)for(;l;){const b=l.nextSibling;l.remove(),l=b}else for(;s<n.length;s++)t.appendChild(o(n[s],s))}},w=s=>t[s]&&t.removeChild(t[s]);return{assign:u,sort:u,reverse:u,setItem:()=>{let s=p[0],l=t.children[s],b=a[s];l&&(l!=null&&l.bauUpdate?l.bauUpdate(l,b):l.replaceWith(o(b,s)))},push:()=>{for(let s=0;s<r.length;s++)t.appendChild(o(r[s],a.length+s))},unshift:()=>{for(let s=r.length-1;s>=0;s--)t.prepend(o(r[s]))},pop:()=>w("lastChild"),shift:()=>w("firstChild"),splice:()=>{const{length:s}=t.children;let[l,b=s,...$]=r;for(let x=l>=0?Math.min(l+b-1,s-1):s-1;x>=(l>=0?l:s+l);x--)t.children[x].remove();if($.length){let x=$.map((J,P)=>o(J,l+P));t.children[l]?t.children[l].before(...x):t.append(...x)}}}},_=t=>({oldVal:t,bindings:[],listeners:[],__isState:!0,get val(){let r=this;return y==null||y.add(r),r.valProxy??(r.valProxy=Q(t)?L(r,t):t,r.valProxy)},set val(r){let o=this,n=o.val;o.oldVal=n,Q(r)?(o.valProxy=L(o,r),S(o,"assign",r)):r!==n&&(o.valProxy=r,S(o))}}),k=t=>{if(t==null||t===!1){let r=T("span");return r.style.display="none",r}else return t.nodeType?t:Array.isArray(t)?t.map(k):d.createTextNode(t)},E=(t,r)=>{let o=new Set;return r.val=F(t,o),o},X=t=>{let r=_(),o=E(t,r);r.computed=!0;for(let n of o)n.listeners.push({computed:t,deps:o,state:r});return r},G=t=>{for(let r of[...t.listeners])E(r.computed,r.state)},I=(t,r=[])=>{for(let o of r)if(Array.isArray(o))I(t,o);else if(o!=null){let n=j(o)?C({deps:[o],render:()=>a=>a}):oe(o)?O(o):k(o);Array.isArray(n)?t.append(...n):t.appendChild(n)}},B={},H=(t,r)=>t&&(Object.getOwnPropertyDescriptor(t,r)??H(ae(t),r)),V=(t,r,o)=>{var n;return B[t+","+r]??(B[t+","+r]=((n=H(o,r))==null?void 0:n.set)??0)},Y=(t,r)=>new c.MutationObserver((o,n)=>{o.filter(a=>a.removedNodes).forEach(a=>[...a.removedNodes].find(p=>p===t&&(r({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),K=(t,r)=>new c.MutationObserver((o,n)=>o.forEach(a=>r({record:a,element:t}))).observe(t,{childList:!0}),m=t=>new Proxy(function(o,...n){var w;let[a,p]=ce(n),u=t?d.createElementNS(t,o):T(o);for(let[s,l]of Object.entries(a))if(s=="bauUpdate")u[s]=l;else if(!s.startsWith("bau")){let b=V(o,s,ae(u))?$=>$!==void 0&&(u[s]=$):$=>u.setAttribute(s,Array.isArray($)?$.filter(x=>x).join(" "):$);l==null||(j(l)?C({deps:[l],render:()=>()=>(b(l.val),u)},!0):oe(l)&&(!s.startsWith("on")||l.isDerived)?O(()=>(b(l({element:u})),u),!0):l.renderProp?C({deps:l.deps,render:()=>()=>(b(l.renderProp({element:u})(...l.deps.map(Z))),u)},!0):b(l))}return a.bauChildMutated&&K(u,a.bauChildMutated),I(u,p),u.autofocus&&u.focus&&c.requestAnimationFrame(()=>u.focus()),(w=a.bauCreated)==null||w.call(a,{element:u}),a.bauMounted&&c.requestAnimationFrame(()=>a.bauMounted({element:u})),a.bauUnmounted&&c.requestAnimationFrame(()=>Y(u,a.bauUnmounted)),u},{get:(r,o)=>r.bind(void 0,o)}),g=(t,r,o,n)=>{t.element=k(o),t.isAttribute=n;for(let a of r)j(a)&&(i.add(a),a.bindings.push(t));return t.element},O=(t,r)=>{let o=new Set,n=F(t,o,{});return g({renderInferred:t},o,n,r)},C=({deps:t,element:r,render:o,renderItem:n},a)=>g({deps:t,render:o,renderItem:n},t,o({element:r,renderItem:n})(...t.map(Z)),a),z=(t,r,o)=>C({deps:[t],render:({renderItem:n})=>a=>{for(let p=0;p<a.length;p++)r.appendChild(n(a[p],p));return r},renderItem:o}),M=async t=>{v=!0;let r=await t();return v=!1,f.forEach(o=>S(...o)),f.clear(),r};return{tags:m(),tagsNS:m,state:_,bind:C,loop:z,derive:X,stateSet:i,batch:M}}const ue=e=>{let c=0,d=11;for(;c<e.length;)d=101*d+e.charCodeAt(c++)>>>0;return"bau"+d},he=(e,c,d,h)=>{const i=e.createElement("style");i.id=d,i.append(h),(c??e.head).append(i)},fe=(e,c)=>e.reduce((d,h,i)=>d+h+(c[i]??""),"");function ge(e){let{document:c}=(e==null?void 0:e.window)??window;const d=h=>(i,...f)=>{const v=fe(i,f),y=ue(v);return!c.getElementById(y)&&he(c,e==null?void 0:e.target,y,h(y,v)),y};return{css:d((h,i)=>`.${h} { ${i} }`),keyframes:d((h,i)=>`@keyframes ${h} { ${i} }`),createGlobalStyles:d((h,i)=>i)}}const re=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],be=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],pe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,ve=e=>`var(--color-${e}-lightest)`,ye=()=>re.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ve(e)};
}
.solid.${e} {
  background-color: ${me(e)};
}
`).join(`
`),we=()=>re.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),xe=e=>100-e*10,$e=()=>new Array(10).fill("").map((e,c)=>`--color-gray-${c*100}: hsl(0, 0%, ${xe(c)}%);`).join(`
`),se=({dark:e})=>new Array(10).fill("").map((c,d)=>`--color-emphasis-${d*100}: var(--color-gray-${e?1e3-d*100:d*100});`).join(`
`),ke=([e,{h:c,s:d,l:h}])=>[`--color-${e}-h: ${c};`,`--color-${e}-l: ${h};`,`--color-${e}-base-s: ${d};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${d} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...be.map(([i,f])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),...pe.map(([i,f])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${f}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ce({createGlobalStyles:e},{colorPalette:c=re}={}){e`
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
      ${c.map(([d,h])=>ke([d,h])).join(`
`)}
      ${$e()}
      ${se({})}
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
      --brightness-hover-reverse: 70% ${se({dark:!0})};
    }
  `}function Ae(e){const c=de(),d=ge({target:window.document.getElementById("bau-css")});return Ce(d),{bau:c,...d,tr:h=>h,window,...e}}const ee=["days","hours","minutes","seconds"];function Se(e){const{bau:c,css:d,keyframes:h}=e,{body:i,h1:f,div:v,small:y,img:T,a:F,footer:q,li:S,ul:D,main:L}=c.tags,R=new Date().getFullYear(),_=new Date(`January 01 ${R+1} 00:00:00`);return()=>{const k=ee.reduce((m,g)=>(m[g]={current:c.state("00"),old:c.state("00")},m),{});function E(){const g=_-new Date,{days:O,hours:C,minutes:z,seconds:M}=k;O.old.val=O.current.val,O.current.val=`${Math.floor(g/1e3/60/60/24)}`,C.old.val=C.current.val,C.current.val=`${Math.floor(g/1e3/60/60)%24}`.padStart(2,"0"),z.old.val=z.current.val,z.current.val=`${Math.floor(g/1e3/60)%60}`.padStart(2,"0"),M.old.val=M.current.val,M.current.val=`${Math.floor(g/1e3)%60}`.padStart(2,"0")}E(),setInterval(E,1e3);const X=h`
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(90deg);
      }
    `,G=h`
      0% ,
      50% {
        transform: rotateX(90deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    `,I=({current:m,old:g})=>v({class:d`
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
              animation: ${X} var(--duration);
              transform-origin: bottom;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
            &.animate .bottom:before {
              animation: ${G} var(--duration);
              transform-origin: center;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
          `},v({class:"top","data-value":g},m),v({class:"bottom","data-value":m},g)),B=ee.map(m=>{const g=I(k[m]);return c.derive(()=>{k[m].current.val,g.classList.remove("animate"),g.offsetHeight,g.classList.add("animate")}),g}),H=()=>v({class:"countdown"},ee.map((m,g)=>v({class:"time"},B[g],y(m)))),V=d`
      background-image: url("./assets/images/bg-stars.svg");
      background-color: var(--very-dark-black-blue);
      color: white;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5rem;
      }
      h1 {
        font-size: 1.5rem;
        @media (max-width: 500px) {
          font-size: 1rem;
        }
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
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
          small {
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
    `,Y=[{name:"facebook",href:"https://facebook.com"},{name:"instagram",href:"https://instagram.com"},{name:"pinterest",href:"https://pinterest.com"}],K=()=>q({class:d`
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
          `},D(Y.map(({name:m,href:g})=>S(F({href:g},T({src:`./assets/images/icon-${m}.svg`,alt:m}))))));return i({class:V},L(f("We're launching soon"),H()),K())}}const Oe=Ae(),Pe=Se(Oe);document.getElementsByTagName("body")[0].replaceWith(Pe());
