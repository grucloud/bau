(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))f(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const b of p.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&f(b)}).observe(document,{childList:!0,subtree:!0});function c(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function f(l){if(l.ep)return;l.ep=!0;const p=c(l);fetch(l.href,p)}})();let Y=e=>Object.prototype.toString.call(e??0).slice(8,-1),le=e=>Y(e)=="Object",ee=e=>Y(e)=="Function",Q=e=>["Object","Array"].includes(Y(e)),oe=Object.getPrototypeOf,X=e=>T(e)?e.val:e,te=e=>Array.isArray(e)?e:[e],T=e=>e==null?void 0:e.__isState,se=["splice","push","pop","shift","unshift","sort","reverse"];const ie=e=>!T(e[0])&&le(e[0])?[e[0],e.slice(1)]:[{},e];function ce(e){let i=window,{document:c}=i,f,l=new Set,p=[],b,$=o=>c.createElement(o),C=(o,n,t)=>{let a=b;b=n;try{return o(t)}catch(r){return console.error(r),t}finally{b=a}},J=()=>{f||(f=i.requestAnimationFrame(()=>{l.forEach(o=>{o.bindings=o.bindings.filter(({element:n})=>{var t;return(t=Array.isArray(n)?n[0]:n)==null?void 0:t.isConnected}),!o.bindings.length&&!o.computed&&l.delete(o)}),f=void 0}))},F=(o,n)=>{!p.length&&i.requestAnimationFrame(_),p.push([o,n])};const _=()=>{let o=0,n=p.length;do{for(let t of new Set(p.slice(o,n).flatMap(([a])=>a.listeners)))L(t.computed,t.state);o=n,n=p.length}while(o<n);for(let t of new Set(p.flatMap(([a,r])=>a.bindings.map(h=>(h.op=r,h)))))j(t);p=[],J()};let j=o=>{var z;const{deps:n,element:t,renderInferred:a,render:r,renderItem:h,isAttribute:g,op:v=[]}=o,[s,d,m,x,S]=v;if(s&&h)(z=q(t,m,(...O)=>P(h(...O)),d,x,S)[s])==null||z.call();else{let O=a?a({element:t}):r({element:t,renderItem:h})(...n.map(X));if(O!==t&&!g){let E=te(o.element=P(O)),U=te(t),A=0;for(;A<U.length&&A<E.length;A++)U[A].replaceWith(P(E[A]));let W=A;for(;E.length>W;)E[W-1].after(E[W]),W++;for(;U.length>A;)U[A].remove(),A++}}},M=(o,n,t=[])=>({get(a,r,h){var g,v;if((g=b==null?void 0:b.g)==null||g.add(o),r==="_isProxy")return!0;if(!((v=a[r])!=null&&v._isProxy)&&!T(a[r])&&Q(a[r]))a[r]=new Proxy(a[r],M(o,n,[...t,r]));else if(se.includes(r)){let s=a[r];return(...d)=>{let m=s.apply(a,d);return F(o,[r,m,d,n,t]),m}}return Reflect.get(a,r,h)},set(a,r,h,g){let v=Reflect.set(a,r,h,g);return F(o,["setItem",v,{prop:r,value:h},n,[...t,r]]),v}}),y=(o,n)=>new Proxy(n,M(o,n)),q=(o,n,t,a,r,h)=>{let g=()=>{if(a.length==0)o.textContent="";else{for(var s=0;s<a.length&&s<o.children.length;s++){const m=o.children[s];m!=null&&m.bauUpdate?m.bauUpdate(m,a[s]):m.replaceWith(t(a[s],s))}let d=o.children[s];if(d)for(;d;){const m=d.nextSibling;d.remove(),d=m}else for(;s<a.length;s++)o.appendChild(t(a[s],s))}},v=s=>o[s]&&o.removeChild(o[s]);return{assign:g,sort:g,reverse:g,setItem:()=>{let s=h[0],d=o.children[s],m=r[s];d&&(d!=null&&d.bauUpdate?d.bauUpdate(d,m):d.replaceWith(t(m,s)))},push:()=>{for(let s=0;s<n.length;s++)o.appendChild(t(n[s],r.length+s))},unshift:()=>{for(let s=n.length-1;s>=0;s--)o.prepend(t(n[s]))},pop:()=>v("lastChild"),shift:()=>v("firstChild"),splice:()=>{const{length:s}=o.children;let[d,m=s,...x]=n;for(let S=d>=0?Math.min(d+m-1,s-1):s-1;S>=(d>=0?d:s+d);S--)o.children[S].remove();if(x.length){let S=x.map((z,O)=>t(z,d+O));o.children[d]?o.children[d].before(...S):o.append(...S)}}}},N=(o,{onUpdate:n,name:t}={})=>({name:t,rawVal:o,bindings:[],listeners:[],__isState:!0,get val(){var r;let a=this;return(r=b==null?void 0:b.g)==null||r.add(a),a.valProxy??(a.valProxy=Q(o)?y(a,o):o,a.valProxy)},set val(a){var g;let r=this,h=r.rawVal;(g=b==null?void 0:b.s)==null||g.add(r),n==null||n(h,a),r.rawVal=a,Q(a)?(r.valProxy=y(r,a),F(r,["assign",a])):a!==h&&(r.valProxy=a,r.bindings.length+r.listeners.length&&F(r))}}),P=o=>{if(o==null||o===!1){let n=$("span");return n.style.display="none",n}else return o.nodeType?o:Array.isArray(o)?o.map(P):c.createTextNode(o)},L=(o,n)=>{let t={g:new Set,s:new Set};return n.val=C(o,t),t},I=(o,n)=>{let t=N(void 0,n),a=L(o,t);t.computed=!0;let r={computed:o,state:t};for(let h of new Set([...a.g].filter(g=>!a.s.has(g)&&g.listeners.every(v=>!a.g.has(v.state)))))h.listeners.push(r);return t},D=(o,n=[])=>{for(let t of n)if(Array.isArray(t))D(o,t);else if(t!=null){let a=T(t)?k({deps:[t],render:()=>r=>r}):ee(t)?w(t):P(t);Array.isArray(a)?o.append(...a):o.appendChild(a)}},R={},B=(o,n)=>o&&(Object.getOwnPropertyDescriptor(o,n)??B(oe(o),n)),V=(o,n,t)=>{var a;return R[o+","+n]??(R[o+","+n]=((a=B(t,n))==null?void 0:a.set)??0)},G=(o,n)=>new i.MutationObserver((t,a)=>{t.filter(r=>r.removedNodes).forEach(r=>[...r.removedNodes].find(h=>h===o&&(n({element:o}),a.disconnect(),!0)))}).observe(o.parentNode,{childList:!0}),K=(o,n)=>new i.MutationObserver((t,a)=>t.forEach(r=>n({record:r,element:o}))).observe(o,{childList:!0}),H=o=>new Proxy(function(t,...a){var v;let[r,h]=ie(a),g=o?c.createElementNS(o,t):$(t);for(let[s,d]of Object.entries(r))if(s=="bauUpdate")g[s]=d;else if(!s.startsWith("bau")){let m=V(t,s,oe(g))?x=>x!==void 0&&(g[s]=x):x=>g.setAttribute(s,Array.isArray(x)?x.filter(S=>S).join(" "):x);d==null||(T(d)?k({deps:[d],render:()=>()=>(m(d.val),g)},!0):ee(d)&&(!s.startsWith("on")||d.isDerived)?w(()=>(m(d({element:g})),g),!0):d.renderProp?k({deps:d.deps,render:()=>()=>(m(d.renderProp({element:g})(...d.deps.map(X))),g)},!0):m(d))}return r.bauChildMutated&&K(g,r.bauChildMutated),D(g,h),g.autofocus&&g.focus&&i.requestAnimationFrame(()=>g.focus()),(v=r.bauCreated)==null||v.call(r,{element:g}),r.bauMounted&&i.requestAnimationFrame(()=>r.bauMounted({element:g})),r.bauUnmounted&&i.requestAnimationFrame(()=>G(g,r.bauUnmounted)),g},{get:(n,t)=>n.bind(void 0,t)}),u=(o,n,t,a)=>{o.element=P(t),o.isAttribute=a;for(let r of n.g)T(r)&&(l.add(r),r.bindings.push(o));return o.element},w=(o,n)=>{let t={g:new Set,s:new Set},a=C(o,t,{});return u({renderInferred:o},t,a,n)},k=({deps:o,element:n,render:t,renderItem:a},r)=>u({deps:o,render:t,renderItem:a},{g:new Set(o),s:new Set},t({element:n,renderItem:a})(...o.map(X)),r),ne=(o,n,t)=>k({deps:[o],render:({renderItem:a})=>r=>{for(let h=0;h<r.length;h++)n.appendChild(a(r[h],h));return n},renderItem:t});return{tags:H(),tagsNS:H,state:N,bind:k,loop:ne,derive:I,stateSet:l}}const de=e=>{let i=0,c=11;for(;i<e.length;)c=101*c+e.charCodeAt(i++)>>>0;return"bau"+c},ge=(e,i,c,f)=>{const l=e.createElement("style");l.id=c,l.append(f),(i??e.head).append(l)},ue=(e,i)=>e.reduce((c,f,l)=>c+f+(i[l]??""),"");function pe(e){let{document:i}=(e==null?void 0:e.window)??window;const c=f=>(l,...p)=>{const b=ue(l,p),$=de(b);return!i.getElementById($)&&ge(i,e==null?void 0:e.target,$,f($,b)),$};return{css:c((f,l)=>`.${f} { ${l} }`),keyframes:c((f,l)=>`@keyframes ${f} { ${l} }`),createGlobalStyles:c((f,l)=>l)}}const Z=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],fe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],he=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],me=e=>`var(--color-${e})`,be=e=>`var(--color-${e}-lightest)`,ve=()=>Z.map(([e])=>`
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
`),ye=()=>Z.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),we=e=>100-e*10,xe=()=>new Array(10).fill("").map((e,i)=>`--color-gray-${i*100}: hsl(0, 0%, ${we(i)}%);`).join(`
`),re=({dark:e})=>new Array(10).fill("").map((i,c)=>`--color-emphasis-${c*100}: var(--color-gray-${e?1e3-c*100:c*100});`).join(`
`),Se=([e,{h:i,s:c,l:f}])=>[`--color-${e}-h: ${i};`,`--color-${e}-l: ${f};`,`--color-${e}-base-s: ${c};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${c} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...fe.map(([l,p])=>`--color-${e}-${l}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${p}));`),...he.map(([l,p])=>`--color-${e}-${l}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${p}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
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
  `}function ke(e){const i=ce(),c=pe({target:window.document.getElementById("bau-css")});return $e(c),{bau:i,...c,tr:f=>f,window,...e}}const Ae=[{id:1,company:"Photosnap",logo:"./assets/images/photosnap.svg",new:!0,featured:!0,position:"Senior Frontend Developer",role:"Frontend",level:"Senior",postedAt:"1d ago",contract:"Full Time",location:"USA Only",languages:["HTML","CSS","JavaScript"],tools:[]},{id:2,company:"Manage",logo:"./assets/images/manage.svg",new:!0,featured:!0,position:"Fullstack Developer",role:"Fullstack",level:"Midweight",postedAt:"1d ago",contract:"Part Time",location:"Remote",languages:["Python"],tools:["React"]},{id:3,company:"Account",logo:"./assets/images/account.svg",new:!0,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"2d ago",contract:"Part Time",location:"USA Only",languages:["JavaScript"],tools:["React","Sass"]},{id:4,company:"MyHome",logo:"./assets/images/myhome.svg",new:!1,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"5d ago",contract:"Contract",location:"USA Only",languages:["CSS","JavaScript"],tools:[]},{id:5,company:"Loop Studios",logo:"./assets/images/loop-studios.svg",new:!1,featured:!1,position:"Software Engineer",role:"FullStack",level:"Midweight",postedAt:"1w ago",contract:"Full Time",location:"Worldwide",languages:["JavaScript"],tools:["Ruby","Sass"]},{id:6,company:"FaceIt",logo:"./assets/images/faceit.svg",new:!1,featured:!1,position:"Junior Backend Developer",role:"Backend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"UK Only",languages:["Ruby"],tools:["RoR"]},{id:7,company:"Shortly",logo:"./assets/images/shortly.svg",new:!1,featured:!1,position:"Junior Developer",role:"Frontend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"Worldwide",languages:["HTML","JavaScript"],tools:["Sass"]},{id:8,company:"Insure",logo:"./assets/images/insure.svg",new:!1,featured:!1,position:"Junior Frontend Developer",role:"Frontend",level:"Junior",postedAt:"2w ago",contract:"Full Time",location:"USA Only",languages:["JavaScript"],tools:["Vue","Sass"]},{id:9,company:"Eyecam Co.",logo:"./assets/images/eyecam-co.svg",new:!1,featured:!1,position:"Full Stack Engineer",role:"Fullstack",level:"Midweight",postedAt:"3w ago",contract:"Full Time",location:"Worldwide",languages:["JavaScript","Python"],tools:["Django"]},{id:10,company:"The Air Filter Company",logo:"./assets/images/the-air-filter-company.svg",new:!1,featured:!1,position:"Front-end Dev",role:"Frontend",level:"Junior",postedAt:"1mo ago",contract:"Part Time",location:"Worldwide",languages:["JavaScript"],tools:["React","Sass"]}];function Ce(e){const{bau:i,css:c}=e,{form:f,ul:l,li:p,img:b,strong:$,span:C,p:J,div:F,section:_,button:j}=i.tags,M=c`
    padding: 1rem;
    max-width: 1000px;
    margin: auto;

    > ul.job-list {
      list-style: none;
      padding: 0;
      margin: 0;

      > li {
        display: flex;
        box-shadow: var(--shadow);
        flex-direction: row;
        background-color: white;
        border-radius: 0.3rem;
        margin-block: 1rem;
        &.featured::before {
          content: "";
          width: 5px;
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
            padding-block: 0.3rem 0.1rem;
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
  `,y=i.state([]),q=i.derive(()=>y.val.length>0),N=u=>()=>{y.val.findIndex(k=>k===u)==-1&&y.val.push(u)},P=()=>y.val=[],L=u=>()=>{const w=y.val.findIndex(k=>k===u);w>=0&&y.val.splice(w,1)},I=i.state(Ae),D=i.derive(()=>y.val.length>0?I.val.filter(u=>y.val.every(w=>[...u.tools,...u.languages].includes(w))):I.val),R=()=>j({class:c`
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          font-size: 0.9rem;
          &:hover {
            text-decoration: underline;
            font-weight: bold;
          }
        `,type:"button",onclick:P},"Clear"),B=()=>()=>_({style:()=>`visibility:${q.val?"visible":"hidden"}`,class:c`
          margin-top: -50px;
          min-height: 70px;
          background-color: white;
          padding: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
          > ul {
            list-style: none;
            display: inline-flex;
            flex-wrap: wrap;
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
        `},i.loop(y,l(),u=>p(C(u),j({type:"button",onclick:L(u)},C("❌")))),R()),V=u=>l({class:c`
          flex-grow: 1;
          list-style: none;
          display: inline-flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          @media (max-width: 600px) {
            justify-content: flex-start;
            border-top: 1px solid var(--color-emphasis-300);
            padding-top: 1rem;
          }
          align-items: center;
          gap: 1rem;
          > li {
            & button {
              border-radius: 0.5rem;
              padding-inline: 0.7rem;
              padding-block: 0.4rem;
              font-weight: bold;
              cursor: pointer;
              border: none;
              background-color: var(--background-color);
              color: var(--color-primary);
              transition: all 0.3s;
              &:hover {
                background-color: var(--color-primary);
                color: var(--font-color-primary);
              }
            }
          }
        `},[...u.tools,...u.languages].map(w=>p(j({type:"button",onclick:N(w)},w)))),G=u=>u.new?C({class:["badge","badge-new"]},"New!"):"",K=u=>u.featured?C({class:["badge","badge-featured"]},"Featured"):"",H=u=>p({id:u.id,class:u.featured?"featured":""},F({class:"container"},b({src:u.logo,alt:"",width:88,height:88}),F({class:c`
              display: grid;
              gap: 0.7rem;
            `},F({class:c`
                display: inline-flex;
                gap: 0.7rem;
                align-items: center;
              `},C({class:"company"},u.company),G(u),K(u)),J($(u.position)),J({class:c`
                color: var(--font-color-secondary);
              `},[u.postedAt,u.contract,u.location].join(" • "))),V(u)));return()=>f({class:M},B(),i.loop(D,l({class:"job-list"}),H))}function Fe(e){const{bau:i,css:c}=e,{header:f}=i.tags,l=c`
    height: 156px;
    background: url("./assets/images/bg-header-desktop.svg");
    background-color: var(--color-primary);
  `;return function(){return f({class:l})}}const Pe=ke(),Oe=e=>{const{bau:i}=e,{main:c,div:f}=i.tags,l=Fe(e),p=Ce(e);return function(){return f(l(),c(p()))}},Te=Oe(Pe);var ae;(ae=document.getElementById("app"))==null||ae.replaceChildren(Te());
