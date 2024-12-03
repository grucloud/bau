(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))f(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const m of u.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&f(m)}).observe(document,{childList:!0,subtree:!0});function c(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function f(l){if(l.ep)return;l.ep=!0;const u=c(l);fetch(l.href,u)}})();let Y=e=>Object.prototype.toString.call(e??0).slice(8,-1),le=e=>Y(e)=="Object",ee=e=>Y(e)=="Function",Q=e=>["Object","Array"].includes(Y(e)),oe=Object.getPrototypeOf,X=e=>T(e)?e.val:e,te=e=>Array.isArray(e)?e:[e],T=e=>e==null?void 0:e.__isState,se=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!T(e[0])&&le(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let i=window,{document:c}=i,f,l=new Set,u=[],m,$=o=>c.createElement(o),C=(o,a,t)=>{let n=m;m=a;try{return o(t)}catch(r){return console.error(r),t}finally{m=n}},J=()=>{f||(f=i.requestAnimationFrame(()=>{l.forEach(o=>{o.bindings=o.bindings.filter(({element:a})=>{var t;return(t=Array.isArray(a)?a[0]:a)==null?void 0:t.isConnected}),!o.bindings.length&&!o.computed&&l.delete(o)}),f=void 0}))},F=(o,a)=>{!u.length&&i.requestAnimationFrame(_),u.push([o,a])};const _=()=>{let o=0,a=u.length;do{for(let t of new Set(u.slice(o,a).flatMap(([n])=>n.listeners)))L(t.computed,t.state);o=a,a=u.length}while(o<a);for(let t of new Set(u.flatMap(([n,r])=>n.bindings.map(h=>(h.op=r,h)))))j(t);u=[],J()};let j=o=>{var z;const{deps:a,element:t,renderInferred:n,render:r,renderItem:h,isAttribute:g,op:v=[]}=o,[s,d,b,x,S]=v;if(s&&h)(z=q(t,b,(...O)=>P(h(...O)),d,x,S)[s])==null||z.call();else{let O=n?n({element:t}):r({element:t,renderItem:h})(...a.map(X));if(O!==t&&!g){let E=te(o.element=P(O)),U=te(t),A=0;for(;A<U.length&&A<E.length;A++)U[A].replaceWith(P(E[A]));let W=A;for(;E.length>W;)E[W-1].after(E[W]),W++;for(;U.length>A;)U[A].remove(),A++}}},M=(o,a,t=[])=>({get(n,r,h){var g,v;if((g=m==null?void 0:m.g)==null||g.add(o),r==="_isProxy")return!0;if(!((v=n[r])!=null&&v._isProxy)&&!T(n[r])&&Q(n[r]))n[r]=new Proxy(n[r],M(o,a,[...t,r]));else if(se.includes(r)){let s=n[r];return(...d)=>{let b=s.apply(n,d);return F(o,[r,b,d,a,t]),b}}return Reflect.get(n,r,h)},set(n,r,h,g){let v=Reflect.set(n,r,h,g);return F(o,["setItem",v,{prop:r,value:h},a,[...t,r]]),v}}),y=(o,a)=>new Proxy(a,M(o,a)),q=(o,a,t,n,r,h)=>{let g=()=>{if(n.length==0)o.textContent="";else{for(var s=0;s<n.length&&s<o.children.length;s++){const b=o.children[s];b!=null&&b.bauUpdate?b.bauUpdate(b,n[s]):b.replaceWith(t(n[s],s))}let d=o.children[s];if(d)for(;d;){const b=d.nextSibling;d.remove(),d=b}else for(;s<n.length;s++)o.appendChild(t(n[s],s))}},v=s=>o[s]&&o.removeChild(o[s]);return{assign:g,sort:g,reverse:g,setItem:()=>{let s=h[0],d=o.children[s],b=r[s];d&&(d!=null&&d.bauUpdate?d.bauUpdate(d,b):d.replaceWith(t(b,s)))},push:()=>{for(let s=0;s<a.length;s++)o.appendChild(t(a[s],r.length+s))},unshift:()=>{for(let s=a.length-1;s>=0;s--)o.prepend(t(a[s]))},pop:()=>v("lastChild"),shift:()=>v("firstChild"),splice:()=>{const{length:s}=o.children;let[d,b=s,...x]=a;for(let S=d>=0?Math.min(d+b-1,s-1):s-1;S>=(d>=0?d:s+d);S--)o.children[S].remove();if(x.length){let S=x.map((z,O)=>t(z,d+O));o.children[d]?o.children[d].before(...S):o.append(...S)}}}},N=(o,{onUpdate:a,name:t}={})=>({name:t,rawVal:o,bindings:[],listeners:[],__isState:!0,get val(){var r;let n=this;return(r=m==null?void 0:m.g)==null||r.add(n),n.valProxy??(n.valProxy=Q(o)?y(n,o):o,n.valProxy)},set val(n){var g;let r=this,h=r.rawVal;(g=m==null?void 0:m.s)==null||g.add(r),a==null||a(h,n),r.rawVal=n,Q(n)?(r.valProxy=y(r,n),F(r,["assign",n])):n!==h&&(r.valProxy=n,r.bindings.length+r.listeners.length&&F(r))}}),P=o=>{if(o==null||o===!1){let a=$("span");return a.style.display="none",a}else return o.nodeType?o:Array.isArray(o)?o.map(P):c.createTextNode(o)},L=(o,a)=>{let t={g:new Set,s:new Set};return a.val=C(o,t),t},I=(o,a)=>{let t=N(void 0,a),n=L(o,t);t.computed=!0;let r={computed:o,state:t};for(let h of new Set([...n.g].filter(g=>!n.s.has(g)&&g.listeners.every(v=>!n.g.has(v.state)))))h.listeners.push(r);return t},D=(o,a=[])=>{for(let t of a)if(Array.isArray(t))D(o,t);else if(t!=null){let n=T(t)?k({deps:[t],render:()=>r=>r}):ee(t)?w(t):P(t);Array.isArray(n)?o.append(...n):o.appendChild(n)}},R={},B=(o,a)=>o&&(Object.getOwnPropertyDescriptor(o,a)??B(oe(o),a)),V=(o,a,t)=>{var n;return R[o+","+a]??(R[o+","+a]=((n=B(t,a))==null?void 0:n.set)??0)},G=(o,a)=>new i.MutationObserver((t,n)=>{t.filter(r=>r.removedNodes).forEach(r=>[...r.removedNodes].find(h=>h===o&&(a({element:o}),n.disconnect(),!0)))}).observe(o.parentNode,{childList:!0}),K=(o,a)=>new i.MutationObserver((t,n)=>t.forEach(r=>a({record:r,element:o}))).observe(o,{childList:!0}),H=o=>new Proxy(function(t,...n){var v;let[r,h]=ie(n),g=o?c.createElementNS(o,t):$(t);for(let[s,d]of Object.entries(r))if(s=="bauUpdate")g[s]=d;else if(!s.startsWith("bau")){let b=V(t,s,oe(g))?x=>x!==void 0&&(g[s]=x):x=>g.setAttribute(s,Array.isArray(x)?x.filter(S=>S).join(" "):x);d==null||(T(d)?k({deps:[d],render:()=>()=>(b(d.val),g)},!0):ee(d)&&(!s.startsWith("on")||d.isDerived)?w(()=>(b(d({element:g})),g),!0):d.renderProp?k({deps:d.deps,render:()=>()=>(b(d.renderProp({element:g})(...d.deps.map(X))),g)},!0):b(d))}return r.bauChildMutated&&K(g,r.bauChildMutated),D(g,h),g.autofocus&&g.focus&&i.requestAnimationFrame(()=>g.focus()),(v=r.bauCreated)==null||v.call(r,{element:g}),r.bauMounted&&i.requestAnimationFrame(()=>r.bauMounted({element:g})),r.bauUnmounted&&i.requestAnimationFrame(()=>G(g,r.bauUnmounted)),g},{get:(a,t)=>a.bind(void 0,t)}),p=(o,a,t,n)=>{o.element=P(t),o.isAttribute=n;for(let r of a.g)T(r)&&(l.add(r),r.bindings.push(o));return o.element},w=(o,a)=>{let t={g:new Set,s:new Set},n=C(o,t,{});return p({renderInferred:o},t,n,a)},k=({deps:o,element:a,render:t,renderItem:n},r)=>p({deps:o,render:t,renderItem:n},{g:new Set(o),s:new Set},t({element:a,renderItem:n})(...o.map(X)),r),ae=(o,a,t)=>k({deps:[o],render:({renderItem:n})=>r=>{for(let h=0;h<r.length;h++)a.appendChild(n(r[h],h));return a},renderItem:t});return{tags:H(),tagsNS:H,state:N,bind:k,loop:ae,derive:I,stateSet:l}}const de=e=>{let i=0,c=11;for(;i<e.length;)c=101*c+e.charCodeAt(i++)>>>0;return"bau"+c},ge=(e,i,c,f)=>{const l=e.createElement("style");l.id=c,l.append(f),(i??e.head).append(l)},ue=(e,i)=>e.reduce((c,f,l)=>c+f+(i[l]??""),"");function pe(e){let{document:i}=(e==null?void 0:e.window)??window;const c=f=>(l,...u)=>{const m=ue(l,u),$=de(m);return!i.getElementById($)&&ge(i,e==null?void 0:e.target,$,f($,m)),$};return{css:c((f,l)=>`.${f} { ${l} }`),keyframes:c((f,l)=>`@keyframes ${f} { ${l} }`),createGlobalStyles:c((f,l)=>l)}}const Z=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],fe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],he=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],be=e=>`var(--color-${e})`,me=e=>`var(--color-${e}-lightest)`,ve=()=>Z.map(([e])=>`
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
`),ye=()=>Z.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,xe=()=>new Array(10).fill("").map((e,i)=>`--color-gray-${i*100}: hsl(0, 0%, ${we(i)}%);`).join(`
`),re=({dark:e})=>new Array(10).fill("").map((i,c)=>`--color-emphasis-${c*100}: var(--color-gray-${e?1e3-c*100:c*100});`).join(`
`),Se=([e,{h:i,s:c,l:f}])=>[`--color-${e}-h: ${i};`,`--color-${e}-l: ${f};`,`--color-${e}-base-s: ${c};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${c} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...fe.map(([l,u])=>`--color-${e}-${l}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),...he.map(([l,u])=>`--color-${e}-${l}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${u}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function $e({createGlobalStyles:e},{colorPalette:i=Z}={}){e`
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
      ${i.map(([c,f])=>Se([c,f])).join(`
`)}
      ${xe()}
      ${re({})}
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
      --brightness-hover-reverse: 70% ${re({dark:!0})};
    }
  `}function ke(e){const i=ce(),c=pe({target:window.document.getElementById("bau-css")});return $e(c),{bau:i,...c,tr:f=>f,window,...e}}const Ae=[{id:1,company:"Photosnap",logo:"./assets/images/photosnap.svg",new:!0,featured:!0,position:"Senior Frontend Developer",role:"Frontend",level:"Senior",postedAt:"1d ago",contract:"Full Time",location:"USA Only",languages:["HTML","CSS","JavaScript"],tools:[]},{id:2,company:"Manage",logo:"./assets/images/manage.svg",new:!0,featured:!0,position:"Fullstack Developer",role:"Fullstack",level:"Midweight",postedAt:"1d ago",contract:"Part Time",location:"Remote",languages:["Python"],tools:["React"]},{id:3,company:"Account",logo:"./assets/images/account.svg",new:!0,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"2d ago",contract:"Part Time",location:"USA Only",languages:["JavaScript"],tools:["React","Sass"]},{id:4,company:"MyHome",logo:"./assets/images/myhome.svg",new:!1,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"5d ago",contract:"Contract",location:"USA Only",languages:["CSS","JavaScript"],tools:[]},{id:5,company:"Loop Studios",logo:"./assets/images/loop-studios.svg",new:!1,featured:!1,position:"Software Engineer",role:"FullStack",level:"Midweight",postedAt:"1w ago",contract:"Full Time",location:"Worldwide",languages:["JavaScript"],tools:["Ruby","Sass"]},{id:6,company:"FaceIt",logo:"./assets/images/faceit.svg",new:!1,featured:!1,position:"Junior Backend Developer",role:"Backend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"UK Only",languages:["Ruby"],tools:["RoR"]},{id:7,company:"Shortly",logo:"./assets/images/shortly.svg",new:!1,featured:!1,position:"Junior Developer",role:"Frontend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"Worldwide",languages:["HTML","JavaScript"],tools:["Sass"]},{id:8,company:"Insure",logo:"./assets/images/insure.svg",new:!1,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"USA Only",languages:["JavaScript"],tools:["Vue","Sass"]},{id:9,company:"Eyecam Co.",logo:"./assets/images/eyecam-co.svg",new:!1,featured:!1,position:"Full Stack Engineer",role:"Fullstack",level:"Midweight",postedAt:"3w ago",contract:"Full Time",location:"Worldwide",languages:["JavaScript","Python"],tools:["Django"]},{id:10,company:"The Air Filter Company",logo:"./assets/images/the-air-filter-company.svg",new:!1,featured:!1,position:"Front-end Dev",role:"Frontend",level:"Junior",postedAt:"1mo ago",contract:"Part Time",location:"Worldwide",languages:["JavaScript"],tools:["React","Sass"]}];function Ce(e){const{bau:i,css:c}=e,{form:f,ul:l,li:u,img:m,strong:$,span:C,p:J,div:F,section:_,button:j}=i.tags,M=c`
    padding: 1rem;
    max-width: 1000px;
    margin: auto;

    > ul.job-list {
      list-style: none;
      padding: 0;
      margin: 0;

      > li {
        display: flex;
        flex-direction: row;
        background-color: white;
        border-radius: 0.3rem;
        margin-block: 1rem;
        &::before {
          content: "";
          width: 3px;
          background-color: var(--color-primary);
        }
        margin-block: 2.5rem;
        .container {
          flex-grow: 1;
          padding: 1rem;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          position: relative;

          @media (max-width: 600px) {
            padding-top: 2.5rem;
            img {
              top: -25px;
              position: absolute;
              width: 50px;
              height: 50px;
            }
          }

          .company {
            color: var(--color-primary);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            font-weight: 700;
            border-radius: 0.8rem;
            color: var(--font-color-primary);
            padding-inline: 0.5rem;
            padding-block: 0.4rem 0.2rem;
            font-size: 0.7rem;
            text-transform: uppercase;
          }
          .badge-new {
            background-color: var(--color-primary);
          }
          .badge-featured {
            background-color: black;
          }
        }
      }
    }
    @media (max-width: 600px) {
    }
  `,y=i.state([]),q=i.derive(()=>y.val.length>0),N=p=>()=>{y.val.findIndex(k=>k===p)==-1&&y.val.push(p)},P=()=>y.val=[],L=p=>()=>{const w=y.val.findIndex(k=>k===p);w>=0&&y.val.splice(w,1)},I=i.state(Ae),D=i.derive(()=>y.val.length>0?I.val.filter(p=>y.val.every(w=>[...p.tools,...p.languages].includes(w))):I.val),R=()=>j({class:c`
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          font-size: 1rem;
          &:hover {
            text-decoration: underline;
            font-weight: bold;
          }
        `,type:"button",onclick:P},"Clear"),B=()=>()=>q.val?_({class:c`
              background-color: white;
              padding: 1rem;
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
              justify-content: space-between;
              > ul {
                list-style: none;
                display: inline-flex;
                gap: 1rem;
                > li {
                  font-weight: bold;
                  display: inline-flex;
                  align-items: center;
                  color: var(--color-primary);
                  background-color: var(--background-color);
                  border-radius: 0.4rem;
                  overflow: hidden;
                  & span {
                    padding-inline: 0.7rem;
                  }
                  & button {
                    padding-block: 0.6rem;
                    background: none;
                    border: none;
                    background-color: var(--color-primary);
                    transition: all 0.3s;
                    & span {
                      filter: brightness(0) saturate(100%) invert(95%) sepia(0%)
                        saturate(18%) hue-rotate(328deg) brightness(104%)
                        contrast(107%);
                    }
                    cursor: pointer;
                    &:hover {
                      background-color: black;
                    }
                  }
                }
              }
            `},i.loop(y,l(),p=>u(C(p),j({type:"button",onclick:L(p)},C("❌")))),R()):void 0,V=p=>l({class:c`
          list-style: none;
          display: inline-flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 1rem;
          > li {
            & button {
              border-radius: 0.5rem;
              padding-inline: 0.7rem;
              padding-block: 0.6rem;
              font-weight: bold;
              cursor: pointer;
              border: none;
              background-color: var(--background-color);
              color: var(--color-primary);
            }
          }
        `},[...p.tools,...p.languages].map(w=>u(j({type:"button",onclick:N(w)},w)))),G=p=>p.new?C({class:["badge","badge-new"]},"New!"):"",K=p=>p.featured?C({class:["badge","badge-featured"]},"Featured"):"",H=p=>u({id:p.id},F({class:"container"},m({src:p.logo,alt:"",width:88,height:88}),F({class:c`
              display: grid;
              gap: 0.7rem;
            `},F({class:c`
                display: inline-flex;
                gap: 0.7rem;
                align-items: center;
              `},C({class:"company"},p.company),G(p),K(p)),J($(p.position)),J({class:c`
                color: var(--font-color-secondary);
              `},[p.postedAt,p.contract,p.location].join(" • "))),V(p)));return()=>f({class:M},B(),i.loop(D,l({class:"job-list"}),H))}function Fe(e){const{bau:i,css:c}=e,{header:f}=i.tags,l=c`
    height: 156px;
    background: url("./assets/images/bg-header-desktop.svg");
    background-color: var(--color-primary);
  `;return function(){return f({class:l})}}const Pe=ke(),Oe=e=>{const{bau:i}=e,{main:c,div:f}=i.tags,l=Fe(e),u=Ce(e);return function(){return f(l(),c(u()))}},Te=Oe(Pe);var ne;(ne=document.getElementById("app"))==null||ne.replaceChildren(Te());
