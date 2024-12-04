(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const f of p.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&g(f)}).observe(document,{childList:!0,subtree:!0});function u(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerPolicy&&(p.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?p.credentials="include":c.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function g(c){if(c.ep)return;c.ep=!0;const p=u(c);fetch(c.href,p)}})();let ee=t=>Object.prototype.toString.call(t??0).slice(8,-1),ie=t=>ee(t)=="Object",re=t=>ee(t)=="Function",X=t=>["Object","Array"].includes(ee(t)),oe=Object.getPrototypeOf,Z=t=>T(t)?t.val:t,ne=t=>Array.isArray(t)?t:[t],T=t=>t==null?void 0:t.__isState,ce=["splice","push","pop","shift","unshift","sort","reverse"];const de=t=>!T(t[0])&&ie(t[0])?[t[0],t.slice(1)]:[{},t];function ue(t){let i=window,{document:u}=i,g,c=new Set,p=[],f,A=e=>u.createElement(e),E=(e,r,n)=>{let s=f;f=r;try{return e(n)}catch(o){return console.error(o),n}finally{f=s}},U=()=>{g||(g=i.requestAnimationFrame(()=>{c.forEach(e=>{e.bindings=e.bindings.filter(({element:r})=>{var n;return(n=Array.isArray(r)?r[0]:r)==null?void 0:n.isConnected}),!e.bindings.length&&!e.computed&&c.delete(e)}),g=void 0}))},D=(e,r)=>{!p.length&&i.requestAnimationFrame(F),p.push([e,r])};const F=()=>{let e=0,r=p.length;do{for(let n of new Set(p.slice(e,r).flatMap(([s])=>s.listeners)))W(n.computed,n.state);e=r,r=p.length}while(e<r);for(let n of new Set(p.flatMap(([s,o])=>s.bindings.map(m=>(m.op=o,m)))))z(n);p=[],U()};let z=e=>{var I;const{deps:r,element:n,renderInferred:s,render:o,renderItem:m,isAttribute:d,op:y=[]}=e,[a,l,h,$,k=[]]=y;if(a&&m)!k.length&&((I=K(n,h,(...O)=>j(m(...O)),l,$,k)[a])==null||I.call());else{let O=s?s({element:n}):o({element:n,renderItem:m})(...r.map(Z));if(O!==n&&!d){let b=ne(e.element=j(O)),x=ne(n),w=0;for(;w<x.length&&w<b.length;w++)x[w].replaceWith(j(b[w]));let P=w;for(;b.length>P;)b[P-1].after(b[P]),P++;for(;x.length>w;)x[w].remove(),w++}}},S=(e,r,n=[])=>({get(s,o,m){var d,y;if((d=f==null?void 0:f.g)==null||d.add(e),o==="_isProxy")return!0;if(!((y=s[o])!=null&&y._isProxy)&&!T(s[o])&&X(s[o]))s[o]=new Proxy(s[o],S(e,r,[...n,o]));else if(ce.includes(o)){let a=s[o];return(...l)=>{let h=a.apply(s,l);return D(e,[o,h,l,r,n]),h}}return Reflect.get(s,o,m)},set(s,o,m,d){let y=Reflect.set(s,o,m,d);return D(e,["setItem",y,{prop:o,value:m},r,[...n,o]]),y}}),C=(e,r)=>new Proxy(r,S(e,r)),K=(e,r,n,s,o,m)=>{let d=()=>{if(s.length==0)e.textContent="";else{for(var a=0;a<s.length&&a<e.children.length;a++){const h=e.children[a];h!=null&&h.bauUpdate?h.bauUpdate(h,s[a]):h.replaceWith(n(s[a],a))}let l=e.children[a];if(l)for(;l;){const h=l.nextSibling;l.remove(),l=h}else for(;a<s.length;a++)e.appendChild(n(s[a],a))}},y=a=>e[a]&&e.removeChild(e[a]);return{assign:d,sort:d,reverse:d,setItem:()=>{let a=m[0],l=e.children[a],h=o[a];l&&(l!=null&&l.bauUpdate?l.bauUpdate(l,h):l.replaceWith(n(h,a)))},push:()=>{for(let a=0;a<r.length;a++)e.appendChild(n(r[a],o.length+a))},unshift:()=>{for(let a=r.length-1;a>=0;a--)e.prepend(n(r[a]))},pop:()=>y("lastChild"),shift:()=>y("firstChild"),splice:()=>{const{length:a}=e.children;let[l,h=a,...$]=r;for(let k=l>=0?Math.min(l+h-1,a-1):a-1;k>=(l>=0?l:a+l);k--)e.children[k].remove();if($.length){let k=$.map((I,O)=>n(I,l+O));e.children[l]?e.children[l].before(...k):e.append(...k)}}}},N=(e,{onUpdate:r,name:n}={})=>({name:n,rawVal:e,bindings:[],listeners:[],__isState:!0,get val(){var o;let s=this;return(o=f==null?void 0:f.g)==null||o.add(s),s.valProxy??(s.valProxy=X(e)?C(s,e):e,s.valProxy)},set val(s){var d;let o=this,m=o.rawVal;(d=f==null?void 0:f.s)==null||d.add(o),r==null||r(m,s),o.rawVal=s,X(s)?(o.valProxy=C(o,s),D(o,["assign",s])):s!==m&&(o.valProxy=s,o.bindings.length+o.listeners.length&&D(o))}}),j=e=>{if(e==null||e===!1){let r=A("span");return r.style.display="none",r}else return e.nodeType?e:Array.isArray(e)?e.map(j):u.createTextNode(e)},W=(e,r)=>{let n={g:new Set,s:new Set};return r.val=E(e,n),n},Y=(e,r)=>{let n=N(void 0,r),s=W(e,n);n.computed=!0;let o={computed:e,state:n};for(let m of new Set([...s.g].filter(d=>!s.s.has(d)&&d.listeners.every(y=>!s.g.has(y.state)))))m.listeners.push(o);return n},H=(e,r=[])=>{for(let n of r)if(Array.isArray(n))H(e,n);else if(n!=null){let s=T(n)?v({deps:[n],render:()=>o=>o}):re(n)?G(n):j(n);Array.isArray(s)?e.append(...s):e.appendChild(s)}},R={},q=(e,r)=>e&&(Object.getOwnPropertyDescriptor(e,r)??q(oe(e),r)),J=(e,r,n)=>{var s;return R[e+","+r]??(R[e+","+r]=((s=q(n,r))==null?void 0:s.set)??0)},Q=(e,r)=>new i.MutationObserver((n,s)=>{n.filter(o=>o.removedNodes).forEach(o=>[...o.removedNodes].find(m=>m===e&&(r({element:e}),s.disconnect(),!0)))}).observe(e.parentNode,{childList:!0}),_=(e,r)=>new i.MutationObserver((n,s)=>n.forEach(o=>r({record:o,element:e}))).observe(e,{childList:!0}),V=e=>new Proxy(function(n,...s){var y;let[o,m]=de(s),d=e?u.createElementNS(e,n):A(n);for(let[a,l]of Object.entries(o))if(a=="bauUpdate")d[a]=l;else if(!a.startsWith("bau")){let h=J(n,a,oe(d))?$=>$!==void 0&&(d[a]=$):$=>d.setAttribute(a,Array.isArray($)?$.filter(k=>k).join(" "):$);l==null||(T(l)?v({deps:[l],render:()=>()=>(h(l.val),d)},!0):re(l)&&(!a.startsWith("on")||l.isDerived)?G(()=>(h(l({element:d})),d),!0):l.renderProp?v({deps:l.deps,render:()=>()=>(h(l.renderProp({element:d})(...l.deps.map(Z))),d)},!0):h(l))}return o.bauChildMutated&&_(d,o.bauChildMutated),H(d,m),d.autofocus&&d.focus&&i.requestAnimationFrame(()=>d.focus()),(y=o.bauCreated)==null||y.call(o,{element:d}),o.bauMounted&&i.requestAnimationFrame(()=>o.bauMounted({element:d})),o.bauUnmounted&&i.requestAnimationFrame(()=>Q(d,o.bauUnmounted)),d},{get:(r,n)=>r.bind(void 0,n)}),M=(e,r,n,s)=>{e.element=j(n),e.isAttribute=s;for(let o of r.g)T(o)&&(c.add(o),o.bindings.push(e));return e.element},G=(e,r)=>{let n={g:new Set,s:new Set},s=E(e,n,{});return M({renderInferred:e},n,s,r)},v=({deps:e,element:r,render:n,renderItem:s},o)=>M({deps:e,render:n,renderItem:s},{g:new Set(e),s:new Set},n({element:r,renderItem:s})(...e.map(Z)),o),B=(e,r,n)=>v({deps:[e],render:({renderItem:s})=>o=>{for(let m=0;m<o.length;m++)r.appendChild(s(o[m],m));return r},renderItem:n});return{tags:V(),tagsNS:V,state:N,bind:v,loop:B,derive:Y,stateSet:c}}const ge=t=>{let i=0,u=11;for(;i<t.length;)u=101*u+t.charCodeAt(i++)>>>0;return"bau"+u},me=(t,i,u,g)=>{const c=t.createElement("style");c.id=u,c.append(g),(i??t.head).append(c)},pe=(t,i)=>t.reduce((u,g,c)=>u+g+(i[c]??""),"");function he(t){let{document:i}=(t==null?void 0:t.window)??window;const u=g=>(c,...p)=>{const f=pe(c,p),A=ge(f);return!i.getElementById(A)&&me(i,t==null?void 0:t.target,A,g(A,f)),A};return{css:u((g,c)=>`.${g} { ${c} }`),keyframes:u((g,c)=>`@keyframes ${g} { ${c} }`),createGlobalStyles:u((g,c)=>c)}}const te=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],fe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],be=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ve=t=>`var(--color-${t})`,ye=t=>`var(--color-${t}-lightest)`,we=()=>te.map(([t])=>`
.outline.${t} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${ye(t)};
}
.solid.${t} {
  background-color: ${ve(t)};
}
`).join(`
`),xe=()=>te.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),$e=t=>100-t*10,ke=()=>new Array(10).fill("").map((t,i)=>`--color-gray-${i*100}: hsl(0, 0%, ${$e(i)}%);`).join(`
`),se=({dark:t})=>new Array(10).fill("").map((i,u)=>`--color-emphasis-${u*100}: var(--color-gray-${t?1e3-u*100:u*100});`).join(`
`),Ce=([t,{h:i,s:u,l:g}])=>[`--color-${t}-h: ${i};`,`--color-${t}-l: ${g};`,`--color-${t}-base-s: ${u};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${u} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...fe.map(([c,p])=>`--color-${t}-${c}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${p}));`),...be.map(([c,p])=>`--color-${t}-${c}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${p}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ae({createGlobalStyles:t},{colorPalette:i=te}={}){t`
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
      ${i.map(([u,g])=>Ce([u,g])).join(`
`)}
      ${ke()}
      ${se({})}
      ${we()}
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
      ${xe()}
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
  `}function Se(t){const i=ue(),u=he({target:window.document.getElementById("bau-css")});return Ae(u),{bau:i,...u,tr:g=>g,window,...t}}const Ee={image:{png:"./assets/images/avatars/image-juliusomo.png",webp:"./assets/images/avatars/image-juliusomo.webp"},username:"juliusomo"},je=[{id:1,content:"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",createdAt:"1 month ago",score:12,user:{image:{png:"./assets/images/avatars/image-amyrobson.png",webp:"./assets/images/avatars/image-amyrobson.webp"},username:"amyrobson"},replies:[]},{id:2,content:"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",createdAt:"2 weeks ago",score:5,user:{image:{png:"./assets/images/avatars/image-maxblagun.png",webp:"./assets/images/avatars/image-maxblagun.webp"},username:"maxblagun"},replies:[{id:3,content:"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",createdAt:"1 week ago",score:4,replyingTo:"maxblagun",user:{image:{png:"./assets/images/avatars/image-ramsesmiron.png",webp:"./assets/images/avatars/image-ramsesmiron.webp"},username:"ramsesmiron"}},{id:4,content:"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",createdAt:"2 days ago",score:2,replyingTo:"ramsesmiron",user:{image:{png:"./assets/images/avatars/image-juliusomo.png",webp:"./assets/images/avatars/image-juliusomo.webp"},username:"juliusomo"}}]}],L={currentUser:Ee,comments:je};function Oe(t){const{bau:i,css:u}=t,{form:g,ul:c,li:p,header:f,footer:A,img:E,figure:U,figcaption:D,span:F,p:z,div:S,button:C,time:K,textarea:N,dialog:j,a:W,h1:Y}=i.tags,H=u`
    padding: 1rem;
    max-width: 750px;
    margin: auto;

    > ul.comments {
      margin: 0;
      > li {
        .comment {
          background-color: var(--White);
          border-radius: 0.5rem;
          margin-block: 1rem;
          padding: 1rem;
          display: grid;
          grid-template-areas: "likes header reply" "likes content content";
          grid-template-columns: min-content auto;
          @media (max-width: 600px) {
            grid-template-areas: "header header" "content content" "likes reply";
          }

          gap: 1rem;

          > header {
            grid-area: header;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1.2rem;
            & figure {
              display: inline-flex;
              align-items: center;
              gap: 1rem;
              & figcaption {
                font-weight: bold;
              }
            }
            .you-badge {
              background-color: var(--color-primary);
              color: var(--font-color-primary);
              padding-inline: 0.5rem;
              font-size: 0.85rem;
            }
            & time {
              color: var(--font-color-secondary);
            }
          }
          .content {
            grid-area: content;
          }
          .controls-button {
            grid-area: reply;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            > button {
              padding-inline: 0.5rem;
            }
          }
          > footer {
            display: flex;
            justify-content: space-between;
          }
        }
        .replies {
          border-left: 1px solid var(--Light-gray);
          padding-left: 2rem;
        }
        .reply {
          display: grid;
          gap: 1rem;
          background-color: var(--White);
          border-radius: 0.5rem;
          padding: 1rem;
          grid-template-areas: "avatar text send-button" ". text .";
          grid-template-columns: min-content auto min-content;
          @media (max-width: 600px) {
            grid-template-areas: "text text text" "avatar ... send-button";
            grid-template-rows: auto min-content;
          }

          & figure {
            grid-area: avatar;
          }
          .send-button-container {
            grid-area: send-button;
          }
          & footer {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  `,R=({score:v})=>S({class:u`
          grid-area: likes;
        `},S({class:u`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            @media (max-width: 600px) {
              flex-direction: row;
              justify-content: flex-start;
            }
            border-radius: 0.5rem;
            gap: 0.5rem;
            background-color: var(--Very-light-gray);
            & button {
              background: transparent;
              color: var(--Grayish-Blue);
              font-size: 1.3rem;
            }
            & span {
              font-weight: 500;
              font-size: 1.2rem;
              color: var(--Moderate-blue);
            }
          `},C({type:"button"},"+"),F(v),C({type:"button"},"−"))),q=({onclick:v})=>S({class:"reply-button"},C({type:"button",onclick:v},E({src:"./assets/images/icon-reply.svg",alt:""}),"Reply")),J=({onclick:v})=>C({type:"button",onclick:v},E({src:"./assets/images/icon-edit.svg",alt:""}),"Edit"),Q=({onclick:v})=>C({class:"danger",type:"button",onclick:v},E({src:"./assets/images/icon-delete.svg",alt:""}),"Delete"),_=({updateComment:v=()=>{},deleteComment:B=()=>{},depth:e=0}={})=>r=>{const n=i.state(!1),s=i.state(!1),o=i.state(r.replies??[]),m=({})=>b=>{b.preventDefault();const{content:x}=Object.fromEntries(new FormData(b.target)),w={id:1e3,score:0,user:L.currentUser,content:x};o.val.push(w),n.val=!1},d=b=>g({class:"reply",onsubmit:m(b)},N({autofocus:!0,required:!0,name:"content",rows:5,placeholder:"Insert a comment"}),U(E({src:L.currentUser.image.webp,alt:L.currentUser.username,width:36,height:36})),S({class:"send-button-container"},C({type:"submit",class:"primary"},"SEND"))),y=({id:b})=>()=>{const x=o.val.findIndex(w=>w.id==b);x>=0&&o.val.splice(x,1),l.close()},l=j(g(f(Y("Delete comment")),z("Are you sure you want to delete this comment? This will remove the comment and can't be undone."),A(C({type:"button",class:["neutral","solid"],onclick:()=>l.close()},"NO, CANCEL"),C({type:"button",class:["danger","solid"],onclick:B(r)},"YES, DELETE")))),h=({})=>()=>{l.showModal()},$=({})=>()=>{s.val=!0},k=({id:b})=>x=>{x.preventDefault();const{content:w}=Object.fromEntries(new FormData(x.target)),P=o.val.findIndex(le=>le.id==b);P>=0&&(o.val[P].content=w)},I=b=>[b.replyingTo&&W({href:`/users/${b.replyingTo}`},`@${b.replyingTo}`)," ",b.content],O=b=>g({onsubmit:x=>{v(b)(x),s.val=!1}},N({name:"content",rows:8,value:b.content}),A(C({type:"submit",class:["solid","primary"]},"UPDATE")));return p(S({class:"comment"},f(U(E({src:r.user.image.webp,height:36,width:36,alt:""}),D(r.user.username)),M(r)&&F({class:"you-badge"},"you"),K(r.createdAt)),z({class:"content"},()=>s.val?O(r):I(r)),R(r),S({class:"controls-button"},M(r)?[Q({onclick:h(r)}),()=>s.val?"":J({onclick:$(r)})]:q({onclick:()=>n.val=!n.val})),l),i.loop(o,c({class:"replies"}),_({updateComment:k,deleteComment:y,depth:e+1})),()=>n.val&&d(r))},V=v=>v.sort((B,e)=>e.score>B.score?1:-1),M=v=>v.user.username==L.currentUser.username,G=i.state(V(L.comments));return()=>g({class:H},i.loop(G,c({class:"comments"}),_()))}const Pe=Se(),De=t=>{const{bau:i}=t,{main:u}=i.tags,g=Oe(t);return function(){return u(g())}},Ie=De(Pe);var ae;(ae=document.getElementById("app"))==null||ae.replaceChildren(Ie());
