(function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const p of a)if(p.type==="childList")for(const u of p.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function m(a){const p={};return a.integrity&&(p.integrity=a.integrity),a.referrerPolicy&&(p.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?p.credentials="include":a.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function d(a){if(a.ep)return;a.ep=!0;const p=m(a);fetch(a.href,p)}})();let W=o=>Object.prototype.toString.call(o??0).slice(8,-1),ie=o=>W(o)=="Object",J=o=>W(o)=="Function",B=o=>["Object","Array"].includes(W(o)),Q=Object.getPrototypeOf,T=o=>P(o)?o.val:o,X=o=>Array.isArray(o)?o:[o],P=o=>o==null?void 0:o.__isState,ne=["splice","push","pop","shift","unshift","sort","reverse"];const se=o=>!P(o[0])&&ie(o[0])?[o[0],o.slice(1)]:[{},o];function oe(o){let h=window,{document:m}=h,d,a=new Set,p=[],u,b=e=>m.createElement(e),N=(e,n,t)=>{let i=u;u=n;try{return e(t)}catch(r){return console.error(r),t}finally{u=i}},q=()=>{d||(d=h.requestAnimationFrame(()=>{a.forEach(e=>{e.bindings=e.bindings.filter(({element:n})=>{var t;return(t=Array.isArray(n)?n[0]:n)==null?void 0:t.isConnected}),!e.bindings.length&&!e.computed&&a.delete(e)}),d=void 0}))},S=(e,n)=>{!p.length&&h.requestAnimationFrame(x),p.push([e,n])};const x=()=>{let e=0,n=p.length;do{for(let t of new Set(p.slice(e,n).flatMap(([i])=>i.listeners)))U(t.computed,t.state);e=n,n=p.length}while(e<n);for(let t of new Set(p.flatMap(([i,r])=>i.bindings.map(f=>(f.op=r,f)))))z(t);p=[],q()};let z=e=>{var j;const{deps:n,element:t,renderInferred:i,render:r,renderItem:f,isAttribute:c,op:w=[]}=e,[s,l,g,y,v]=w;if(s&&f)(j=Y(t,g,(...O)=>C(f(...O)),l,y,v)[s])==null||j.call();else{let O=i?i({element:t}):r({element:t,renderItem:f})(...n.map(T));if(O!==t&&!c){let E=X(e.element=C(O)),F=X(t),A=0;for(;A<F.length&&A<E.length;A++)F[A].replaceWith(C(E[A]));let I=A;for(;E.length>I;)E[I-1].after(E[I]),I++;for(;F.length>A;)F[A].remove(),A++}}},L=(e,n,t=[])=>({get(i,r,f){var c,w;if((c=u==null?void 0:u.g)==null||c.add(e),r==="_isProxy")return!0;if(!((w=i[r])!=null&&w._isProxy)&&!P(i[r])&&B(i[r]))i[r]=new Proxy(i[r],L(e,n,[...t,r]));else if(ne.includes(r)){let s=i[r];return(...l)=>{let g=s.apply(i,l);return S(e,[r,g,l,n,t]),g}}return Reflect.get(i,r,f)},set(i,r,f,c){let w=Reflect.set(i,r,f,c);return S(e,["setItem",w,{prop:r,value:f},n,[...t,r]]),w}}),G=(e,n)=>new Proxy(n,L(e,n)),Y=(e,n,t,i,r,f)=>{let c=()=>{if(i.length==0)e.textContent="";else{for(var s=0;s<i.length&&s<e.children.length;s++){const g=e.children[s];g!=null&&g.bauUpdate?g.bauUpdate(g,i[s]):g.replaceWith(t(i[s],s))}let l=e.children[s];if(l)for(;l;){const g=l.nextSibling;l.remove(),l=g}else for(;s<i.length;s++)e.appendChild(t(i[s],s))}},w=s=>e[s]&&e.removeChild(e[s]);return{assign:c,sort:c,reverse:c,setItem:()=>{let s=f[0],l=e.children[s],g=r[s];l&&(l!=null&&l.bauUpdate?l.bauUpdate(l,g):l.replaceWith(t(g,s)))},push:()=>{for(let s=0;s<n.length;s++)e.appendChild(t(n[s],r.length+s))},unshift:()=>{for(let s=n.length-1;s>=0;s--)e.prepend(t(n[s]))},pop:()=>w("lastChild"),shift:()=>w("firstChild"),splice:()=>{const{length:s}=e.children;let[l,g=s,...y]=n;for(let v=l>=0?Math.min(l+g-1,s-1):s-1;v>=(l>=0?l:s+l);v--)e.children[v].remove();if(y.length){let v=y.map((j,O)=>t(j,l+O));e.children[l]?e.children[l].before(...v):e.append(...v)}}}},_=(e,{onUpdate:n,name:t}={})=>({name:t,rawVal:e,bindings:[],listeners:[],__isState:!0,get val(){var r;let i=this;return(r=u==null?void 0:u.g)==null||r.add(i),i.valProxy??(i.valProxy=B(e)?G(i,e):e,i.valProxy)},set val(i){var c;let r=this,f=r.rawVal;(c=u==null?void 0:u.s)==null||c.add(r),n==null||n(f,i),r.rawVal=i,B(i)?(r.valProxy=G(r,i),S(r,["assign",i])):i!==f&&(r.valProxy=i,r.bindings.length+r.listeners.length&&S(r))}}),C=e=>{if(e==null||e===!1){let n=b("span");return n.style.display="none",n}else return e.nodeType?e:Array.isArray(e)?e.map(C):m.createTextNode(e)},U=(e,n)=>{let t={g:new Set,s:new Set};return n.val=N(e,t),t},Z=(e,n)=>{let t=_(void 0,n),i=U(e,t);t.computed=!0;let r={computed:e,state:t};for(let f of new Set([...i.g].filter(c=>!i.s.has(c)&&c.listeners.every(w=>!i.g.has(w.state)))))f.listeners.push(r);return t},$=(e,n=[])=>{for(let t of n)if(Array.isArray(t))$(e,t);else if(t!=null){let i=P(t)?M({deps:[t],render:()=>r=>r}):J(t)?K(t):C(t);Array.isArray(i)?e.append(...i):e.appendChild(i)}},H={},R=(e,n)=>e&&(Object.getOwnPropertyDescriptor(e,n)??R(Q(e),n)),D=(e,n,t)=>{var i;return H[e+","+n]??(H[e+","+n]=((i=R(t,n))==null?void 0:i.set)??0)},ee=(e,n)=>new h.MutationObserver((t,i)=>{t.filter(r=>r.removedNodes).forEach(r=>[...r.removedNodes].find(f=>f===e&&(n({element:e}),i.disconnect(),!0)))}).observe(e.parentNode,{childList:!0}),te=(e,n)=>new h.MutationObserver((t,i)=>t.forEach(r=>n({record:r,element:e}))).observe(e,{childList:!0}),k=e=>new Proxy(function(t,...i){var w;let[r,f]=se(i),c=e?m.createElementNS(e,t):b(t);for(let[s,l]of Object.entries(r))if(s=="bauUpdate")c[s]=l;else if(!s.startsWith("bau")){let g=D(t,s,Q(c))?y=>y!==void 0&&(c[s]=y):y=>c.setAttribute(s,Array.isArray(y)?y.filter(v=>v).join(" "):y);l==null||(P(l)?M({deps:[l],render:()=>()=>(g(l.val),c)},!0):J(l)&&(!s.startsWith("on")||l.isDerived)?K(()=>(g(l({element:c})),c),!0):l.renderProp?M({deps:l.deps,render:()=>()=>(g(l.renderProp({element:c})(...l.deps.map(T))),c)},!0):g(l))}return r.bauChildMutated&&te(c,r.bauChildMutated),$(c,f),c.autofocus&&c.focus&&h.requestAnimationFrame(()=>c.focus()),(w=r.bauCreated)==null||w.call(r,{element:c}),r.bauMounted&&h.requestAnimationFrame(()=>r.bauMounted({element:c})),r.bauUnmounted&&h.requestAnimationFrame(()=>ee(c,r.bauUnmounted)),c},{get:(n,t)=>n.bind(void 0,t)}),V=(e,n,t,i)=>{e.element=C(t),e.isAttribute=i;for(let r of n.g)P(r)&&(a.add(r),r.bindings.push(e));return e.element},K=(e,n)=>{let t={g:new Set,s:new Set},i=N(e,t,{});return V({renderInferred:e},t,i,n)},M=({deps:e,element:n,render:t,renderItem:i},r)=>V({deps:e,render:t,renderItem:i},{g:new Set(e),s:new Set},t({element:n,renderItem:i})(...e.map(T)),r),re=(e,n,t)=>M({deps:[e],render:({renderItem:i})=>r=>{for(let f=0;f<r.length;f++)n.appendChild(i(r[f],f));return n},renderItem:t});return{tags:k(),tagsNS:k,state:_,bind:M,loop:re,derive:Z,stateSet:a}}const le=o=>{let h=0,m=11;for(;h<o.length;)m=101*m+o.charCodeAt(h++)>>>0;return"bau"+m},ae=(o,h,m,d)=>{const a=o.createElement("style");a.id=m,a.append(d),o.head.append(a)},ce=(o,h)=>o.reduce((m,d,a)=>m+d+(h[a]??""),"");function de(o){let{document:h}=window;const m=d=>(a,...p)=>{const u=ce(a,p),b=le(u);return!h.getElementById(b)&&ae(h,o==null?void 0:o.target,b,d(b,u)),b};return{css:m((d,a)=>`.${d} { ${a} }`),keyframes:m((d,a)=>`@keyframes ${d} { ${a} }`),createGlobalStyles:m((d,a)=>a)}}function ue(o){const{bau:h,css:m}=o,{h1:d,picture:a,em:p,img:u,p:b,i:N,strong:q,article:S,section:x}=h.tags,z=m`
    min-height: 95vh;
    max-width: 900px;
    display: grid;
    gap: 1rem;
    margin: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "section7 section1 section1 section4"
      "section7 section2 section3 section4"
      "section8 section2 section3 section4"
      "section8 section6 section5 section5";

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-template-areas: "section1" "section2" "section3" "section4" "section5" "section6" "section7" "section8";
    }

    section {
      background-color: var(--clr-white);
      min-height: 100px;
      min-width: 100px;
      border-radius: 0.8rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
      h1 {
      }
      &.section1 {
        grid-area: section1;
        text-align: center;
        background-color: var(--clr-primary-500);
        color: var(--clr-white);
        align-items: center;
        h1 {
          font-size: 2rem;
          strong {
            color: var(--clr-secondary-500);
          }
        }
        img {
          max-width: 200px;
        }
      }
      &.section2 {
        grid-area: section2;
      }

      &.section3 {
        background-color: var(--clr-secondary-500);
        grid-area: section3;
        padding-bottom: 0;
        justify-content: space-between;
        picture {
          max-height: 100px;
          overflow: hidden;
        }
        img {
          max-width: 250px;
        }
      }

      &.section4 {
        grid-area: section4;
        background-color: var(--clr-primary-100);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        @media (max-width: 640px) {
          align-items: center;
        }

        img {
          max-height: 200px;
        }
        p {
          font-size: smaller;
        }
      }
      &.section5 {
        grid-area: section5;
        background-color: var(--clr-primary-500);
        color: var(--clr-white);
        display: flex;
        align-items: center;
        flex-direction: row;
        @media (max-width: 640px) {
          flex-direction: column;
        }
        img {
          max-width: 200px;
          max-height: 200px;
        }
        h1 {
          text-align: center;
        }
      }

      &.section6 {
        grid-area: section6;
        h1 {
          font-size: xx-large;
        }
        img {
          max-width: 300px;
        }
      }

      &.section7 {
        grid-area: section7;
        background-color: var(--clr-secondary-100);
        align-items: center;
        h1 {
          font-size: 1.7rem;
          font-weight: 400;
        }
        img {
          max-width: 150px;
        }
        em {
          color: var(--clr-primary-500);
        }
      }

      &.section8 {
        grid-area: section8;
        background-color: var(--clr-secondary-500);
        h1 {
          font-size: 1.7rem;
          font-weight: 400;
        }
      }
    }
  `;return function(){return S({class:z},x({class:"section1"},d("Social Media ",q("10x"),N(" Faster")," with AI"),u({src:"./assets/images/illustration-five-stars.webp"}),b("Over 4,000 5-star reviews")),x({class:"section2"},u({src:"./assets/images/illustration-multiple-platforms.webp"}),d("Manage multiple accounts and platforms.")),x({class:"section3"},d("Maintain a consistent posting schedule."),a(u({src:"./assets/images/illustration-consistent-schedule.webp"}))),x({class:"section4"},d("Schedule to social media."),u({src:"./assets/images/illustration-schedule-posts.webp"}),b("Optimize post timings to publish content at the perfect time for your audience.")),x({class:"section5"},u({src:"./assets/images/illustration-grow-followers.webp"}),d("Grow followers with non-stop content.")),x({class:"section6"},d("> 56%"),b("faster audience growth"),u({src:"./assets/images/illustration-audience-growth.webp"})),x({class:"section7"},d("Create and schedule content ",p("quicker"),"."),u({src:"./assets/images/illustration-create-post.webp"})),x({class:"section8"},d("Write your content using AI."),u({src:"./assets/images/illustration-ai-content.webp"})))}}const fe={bau:oe(),...de()},he=o=>{const{bau:h,css:m}=o,{main:d}=h.tags,a=ue(o);return function(){return d(a())}},pe=he(fe);document.getElementById("app").replaceChildren(pe());
