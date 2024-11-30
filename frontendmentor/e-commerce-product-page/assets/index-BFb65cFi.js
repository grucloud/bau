(function(){const g=document.createElement("link").relList;if(g&&g.supports&&g.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))y(d);new MutationObserver(d=>{for(const x of d)if(x.type==="childList")for(const b of x.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&y(b)}).observe(document,{childList:!0,subtree:!0});function m(d){const x={};return d.integrity&&(x.integrity=d.integrity),d.referrerPolicy&&(x.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?x.credentials="include":d.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function y(d){if(d.ep)return;d.ep=!0;const x=m(d);fetch(d.href,x)}})();let be=s=>Object.prototype.toString.call(s??0).slice(8,-1),_e=s=>be(s)=="Object",Ee=s=>be(s)=="Function",pe=s=>["Object","Array"].includes(be(s)),Ne=Object.getPrototypeOf,me=s=>ce(s)?s.val:s,ke=s=>Array.isArray(s)?s:[s],ce=s=>s==null?void 0:s.__isState,Le=["splice","push","pop","shift","unshift","sort","reverse"];const Me=s=>!ce(s[0])&&_e(s[0])?[s[0],s.slice(1)]:[{},s];function Be(s){let g=window,{document:m}=g,y,d=new Set,x=[],b,O=t=>m.createElement(t),$=(t,n,l)=>{let i=b;b=n;try{return t(l)}catch(c){return console.error(c),l}finally{b=i}},P=()=>{y||(y=g.requestAnimationFrame(()=>{d.forEach(t=>{t.bindings=t.bindings.filter(({element:n})=>{var l;return(l=Array.isArray(n)?n[0]:n)==null?void 0:l.isConnected}),!t.bindings.length&&!t.computed&&d.delete(t)}),y=void 0}))},_=(t,n)=>{!x.length&&g.requestAnimationFrame(R),x.push([t,n])};const R=()=>{let t=0,n=x.length;do{for(let l of new Set(x.slice(t,n).flatMap(([i])=>i.listeners)))p(l.computed,l.state);t=n,n=x.length}while(t<n);for(let l of new Set(x.flatMap(([i,c])=>i.bindings.map(v=>(v.op=c,v)))))z(l);x=[],P()};let z=t=>{var oe;const{deps:n,element:l,renderInferred:i,render:c,renderItem:v,isAttribute:w,op:A=[]}=t,[E,N,k,C,B]=A;if(E&&v)(oe=H(l,k,(...ne)=>M(v(...ne)),N,C,B)[E])==null||oe.call();else{let ne=i?i({element:l}):c({element:l,renderItem:v})(...n.map(me));if(ne!==l&&!w){let ie=ke(t.element=M(ne)),V=ke(l),X=0;for(;X<V.length&&X<ie.length;X++)V[X].replaceWith(M(ie[X]));let G=X;for(;ie.length>G;)ie[G-1].after(ie[G]),G++;for(;V.length>X;)V[X].remove(),X++}}},L=(t,n,l=[])=>({get(i,c,v){var w,A;if((w=b==null?void 0:b.g)==null||w.add(t),c==="_isProxy")return!0;if(!((A=i[c])!=null&&A._isProxy)&&!ce(i[c])&&pe(i[c]))i[c]=new Proxy(i[c],L(t,n,[...l,c]));else if(Le.includes(c)){let E=i[c];return(...N)=>{let k=E.apply(i,N);return _(t,[c,k,N,n,l]),k}}return Reflect.get(i,c,v)},set(i,c,v,w){let A=Reflect.set(i,c,v,w);return _(t,["setItem",A,{prop:c,value:v},n,[...l,c]]),A}}),U=(t,n)=>new Proxy(n,L(t,n)),H=(t,n,l,i,c,v)=>{let w=()=>{if(i.length==0)t.textContent="";else{for(var E=0;E<i.length&&E<t.children.length;E++){const k=t.children[E];k!=null&&k.bauUpdate?k.bauUpdate(k,i[E]):k.replaceWith(l(i[E],E))}let N=t.children[E];if(N)for(;N;){const k=N.nextSibling;N.remove(),N=k}else for(;E<i.length;E++)t.appendChild(l(i[E],E))}},A=E=>t[E]&&t.removeChild(t[E]);return{assign:w,sort:w,reverse:w,setItem:()=>{let E=v[0],N=t.children[E],k=c[E];N&&(N!=null&&N.bauUpdate?N.bauUpdate(N,k):N.replaceWith(l(k,E)))},push:()=>{for(let E=0;E<n.length;E++)t.appendChild(l(n[E],c.length+E))},unshift:()=>{for(let E=n.length-1;E>=0;E--)t.prepend(l(n[E]))},pop:()=>A("lastChild"),shift:()=>A("firstChild"),splice:()=>{const{length:E}=t.children;let[N,k=E,...C]=n;for(let B=N>=0?Math.min(N+k-1,E-1):E-1;B>=(N>=0?N:E+N);B--)t.children[B].remove();if(C.length){let B=C.map((oe,ne)=>l(oe,N+ne));t.children[N]?t.children[N].before(...B):t.append(...B)}}}},q=(t,{onUpdate:n,name:l}={})=>({name:l,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var c;let i=this;return(c=b==null?void 0:b.g)==null||c.add(i),i.valProxy??(i.valProxy=pe(t)?U(i,t):t,i.valProxy)},set val(i){var w;let c=this,v=c.rawVal;(w=b==null?void 0:b.s)==null||w.add(c),n==null||n(v,i),c.rawVal=i,pe(i)?(c.valProxy=U(c,i),_(c,["assign",i])):i!==v&&(c.valProxy=i,c.bindings.length+c.listeners.length&&_(c))}}),M=t=>{if(t==null||t===!1){let n=O("span");return n.style.display="none",n}else return t.nodeType?t:Array.isArray(t)?t.map(M):m.createTextNode(t)},p=(t,n)=>{let l={g:new Set,s:new Set};return n.val=$(t,l),l},I=(t,n)=>{let l=q(void 0,n),i=p(t,l);l.computed=!0;let c={computed:t,state:l};for(let v of new Set([...i.g].filter(w=>!i.s.has(w)&&w.listeners.every(A=>!i.g.has(A.state)))))v.listeners.push(c);return l},Q=(t,n=[])=>{for(let l of n)if(Array.isArray(l))Q(t,l);else if(l!=null){let i=ce(l)?f({deps:[l],render:()=>c=>c}):Ee(l)?a(l):M(l);Array.isArray(i)?t.append(...i):t.appendChild(i)}},J={},T=(t,n)=>t&&(Object.getOwnPropertyDescriptor(t,n)??T(Ne(t),n)),W=(t,n,l)=>{var i;return J[t+","+n]??(J[t+","+n]=((i=T(l,n))==null?void 0:i.set)??0)},e=(t,n)=>new g.MutationObserver((l,i)=>{l.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(v=>v===t&&(n({element:t}),i.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),r=(t,n)=>new g.MutationObserver((l,i)=>l.forEach(c=>n({record:c,element:t}))).observe(t,{childList:!0}),o=t=>new Proxy(function(l,...i){var A;let[c,v]=Me(i),w=t?m.createElementNS(t,l):O(l);for(let[E,N]of Object.entries(c))if(E=="bauUpdate")w[E]=N;else if(!E.startsWith("bau")){let k=W(l,E,Ne(w))?C=>C!==void 0&&(w[E]=C):C=>w.setAttribute(E,Array.isArray(C)?C.filter(B=>B).join(" "):C);N==null||(ce(N)?f({deps:[N],render:()=>()=>(k(N.val),w)},!0):Ee(N)&&(!E.startsWith("on")||N.isDerived)?a(()=>(k(N({element:w})),w),!0):N.renderProp?f({deps:N.deps,render:()=>()=>(k(N.renderProp({element:w})(...N.deps.map(me))),w)},!0):k(N))}return c.bauChildMutated&&r(w,c.bauChildMutated),Q(w,v),w.autofocus&&w.focus&&g.requestAnimationFrame(()=>w.focus()),(A=c.bauCreated)==null||A.call(c,{element:w}),c.bauMounted&&g.requestAnimationFrame(()=>c.bauMounted({element:w})),c.bauUnmounted&&g.requestAnimationFrame(()=>e(w,c.bauUnmounted)),w},{get:(n,l)=>n.bind(void 0,l)}),u=(t,n,l,i)=>{t.element=M(l),t.isAttribute=i;for(let c of n.g)ce(c)&&(d.add(c),c.bindings.push(t));return t.element},a=(t,n)=>{let l={g:new Set,s:new Set},i=$(t,l,{});return u({renderInferred:t},l,i,n)},f=({deps:t,element:n,render:l,renderItem:i},c)=>u({deps:t,render:l,renderItem:i},{g:new Set(t),s:new Set},l({element:n,renderItem:i})(...t.map(me)),c),h=(t,n,l)=>f({deps:[t],render:({renderItem:i})=>c=>{for(let v=0;v<c.length;v++)n.appendChild(i(c[v],v));return n},renderItem:l});return{tags:o(),tagsNS:o,state:q,bind:f,loop:h,derive:I,stateSet:d}}const Re=s=>{let g=0,m=11;for(;g<s.length;)m=101*m+s.charCodeAt(g++)>>>0;return"bau"+m},Te=(s,g,m,y)=>{const d=s.createElement("style");d.id=m,d.append(y),(g??s.head).append(d)},De=(s,g)=>s.reduce((m,y,d)=>m+y+(g[d]??""),"");function Fe(s){let{document:g}=(s==null?void 0:s.window)??window;const m=y=>(d,...x)=>{const b=De(d,x),O=Re(b);return!g.getElementById(O)&&Te(g,s==null?void 0:s.target,O,y(O,b)),O};return{css:m((y,d)=>`.${y} { ${d} }`),keyframes:m((y,d)=>`@keyframes ${y} { ${d} }`),createGlobalStyles:m((y,d)=>d)}}const xe=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ze=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Ue=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],qe=s=>`var(--color-${s})`,je=s=>`var(--color-${s}-lightest)`,Ge=()=>xe.map(([s])=>`
.outline.${s} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${s} {
  background-color: ${je(s)};
}
.solid.${s} {
  background-color: ${qe(s)};
}
`).join(`
`),He=()=>xe.map(([s])=>[`--color-${s}-s: var(--color-${s}-dark-s);`]).join(`
`),We=s=>100-s*10,Ve=()=>new Array(10).fill("").map((s,g)=>`--color-gray-${g*100}: hsl(0, 0%, ${We(g)}%);`).join(`
`),Oe=({dark:s})=>new Array(10).fill("").map((g,m)=>`--color-emphasis-${m*100}: var(--color-gray-${s?1e3-m*100:m*100});`).join(`
`),Xe=([s,{h:g,s:m,l:y}])=>[`--color-${s}-h: ${g};`,`--color-${s}-l: ${y};`,`--color-${s}-base-s: ${m};`,`--color-${s}-s: var(--color-${s}-base-s);`,`--color-${s}-dark-s: calc(${m} - 25%);`,`--color-${s}-hsl: var(--color-${s}-h), var(--color-${s}-s), var(--color-${s}-l);`,`--color-${s}: hsl(var(--color-${s}-hsl));`,...ze.map(([d,x])=>`--color-${s}-${d}: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * ${x}));`),...Ue.map(([d,x])=>`--color-${s}-${d}: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * ${x}));`),`--color-${s}-contrast-background: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) / var(--contrast-background-value)));`,`--color-${s}-contrast-foreground: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ye({createGlobalStyles:s},{colorPalette:g=xe}={}){s`
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
      ${g.map(([m,y])=>Xe([m,y])).join(`
`)}
      ${Ve()}
      ${Oe({})}
      ${Ge()}
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
      ${He()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Oe({dark:!0})};
    }
  `}function Qe(s){const g=Be(),m=Fe({target:window.document.getElementById("bau-css")});return Ye(m),{bau:g,...m,tr:y=>y,window,...s}}const Ke=(s,g)=>({...s,paths:[...g,s.path]}),$e=({paths:s=[],routes:g})=>g.flatMap(({children:m,...y})=>{const d=Ke(y,s);return m?[d,...$e({paths:[...s,y.path],routes:m})]:d}),Je=({paths:s})=>{const g=s.map(m=>m instanceof RegExp?m.source:m).map(m=>String.raw`\/${m}`).join("");return new RegExp(`^${g}$`)},Ze=({routes:s=[],notFoundRoute:g})=>{const m=$e({routes:s}).map(y=>({...y,regex:Je(y)}));return{resolve:({pathname:y})=>{const d=m.find(({regex:x})=>x.test(y));return d?d.action({match:y.match(d.regex)}):g}}};function et({routes:s,notFoundRoute:g,onLocationChange:m}){let y={...window.location};const d=b=>{y={...b}},x=Ze({routes:s,notFoundRoute:g});return window.addEventListener("popstate",b=>{y.pathname!=b.target.location.pathname&&m({router:x}),d(b.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(b,O,$)=>{b.apply(O,$),y.pathname!=window.location.pathname&&m({router:x}),d(window.location)}}),document.addEventListener("click",b=>{const{target:O}=b,$=O.closest("a");if(!$)return;const P=$.getAttribute("href");P&&!P.startsWith("http")&&!P.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",P),history.pushState({},null,P),d(window.location),["?","#"].includes(P[0])||window.scrollTo({top:0,left:0}),b.preventDefault())}),m({router:x}),x}const tt=({context:s,LayoutDefault:g,config:{base:m=""}={}})=>{const{window:y,bau:d}=s,x=d.state();let b;return({router:O})=>{var z;const $=y.location.pathname.replace(m,""),{title:P,component:_,Layout:R=g}=O.resolve({pathname:$});b!=R&&(b=R,(z=document.getElementById("app"))==null||z.replaceChildren(R({componentState:x}))),x.val=_({}),document.title=`${P} - E-commerce Product Page`}},rt=[{text:"Collection",href:"collection"},{text:"Men",href:"men"},{text:"Women",href:"women"},{text:"About",href:"about"},{text:"Contact",href:"contact"}],nt=s=>{const{bau:g,css:m}=s,{a:y,ul:d,li:x,nav:b}=g.tags,O=m`
    & ul {
      display: flex;
      list-style: none;
      > li {
        & a {
          text-decoration: none;
        }
      }
    }
  `;return $=>b({class:O,...$},d(rt.map(({text:P,href:_})=>x(y({href:_},P)))))},ot="dialog-cart",fe="drawer",it=(s,{cartState:g})=>{const{bau:m,css:y}=s,{header:d,div:x,img:b,button:O,span:$,dialog:P,form:_}=m.tags,{svg:R,use:z}=m.tagsNS("http://www.w3.org/2000/svg"),L=m.derive(()=>g.val.reduce((p,{quantity:I})=>p+=I,0)),U=nt(s),H=()=>P({id:fe,onclick:({target:p,currentTarget:I})=>{p==I&&p.close()},class:y`
          padding: 1rem;
          min-width: 200px;
          & > form {
            & > nav {
              margin-block: 2rem;
              & > ul {
                gap: 1rem;
                flex-direction: column;
                > li {
                  padding-bottom: 0.3rem;
                  & a {
                    color: var(--font-color-base);
                    font-weight: bold;
                    font-size: 1rem;
                  }
                }
              }
            }
          }
        `},_(d(O({role:"close",onclick:M(fe)},"❌")),U({onclick:M(fe)}))),q=y`
    position: sticky;
    align-self: start;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: stretch;
    background-color: var(--background-color);
    padding-inline: 1rem;
    border-bottom: 1px solid var(--color-emphasis-200);
    gap: 2rem;
    & .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & button.burger {
        display: none;
        padding: 1rem;
        @media (max-width: 600px) {
          display: inline-flex;
        }
      }
      flex-grow: 0;
    }
    & > nav {
      display: flex;
      @media (max-width: 600px) {
        display: none;
      }
      align-items: stretch;
      & ul {
        align-items: stretch;
        gap: 1.5rem;
        padding: 0;

        > li {
          display: flex;
          align-items: center;
          position: relative;
          &::after {
            content: "";
            transition: all 0.4s;
            background-color: transparent;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            width: 100%;
          }
          &:hover {
            &::after {
              content: "";
              background-color: var(--color-primary);
            }
          }
          > a {
            color: var(--color-emphasis-700);
            &:hover {
              font-weight: bolder;
            }
            font-size: 0.9rem;
          }
        }
      }
    }

    .header-right {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
      margin-block: 1rem;
      & button[aria-label="cart"] {
        position: relative;
        color: var(--color-emphasis-700);
      }
      & img.avatar {
        transition: all 0.2s;
        &:hover {
          outline: 3px solid var(--color-primary);
        }
        border-radius: 100%;
      }
    }
  `,M=p=>()=>{const I=document.getElementById(p);I.open?I.close():I.showModal()};return()=>[H(),d({class:q},x({class:"header-left"},O({"aria-label":"menu",class:"burger",onclick:M(fe)},b({src:"./assets/images/icon-menu.svg",alt:"Menu",width:15,height:15})),b({class:"logo",src:"./assets/images/logo.svg",alt:"Logo",width:138,height:20})),U({}),x({class:"header-right"},O({"aria-label":"cart",onclick:M(ot)},R({width:22,height:20,viewBox:"0 0 22 22",fill:"currentColor"},z({href:"./assets/images/icon-cart.svg#cart"})),()=>L.val>0&&$({class:["badge","solid"]},L)),O(b({class:"avatar",src:"./assets/images/image-avatar.png",alt:"Logo",width:55,height:55}))))]};var lt=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,we=Math.ceil,ee=Math.floor,K="[BigNumber Error] ",Ae=K+"Number primitive has more than 15 significant digits: ",re=1e14,S=14,ve=9007199254740991,ye=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],se=1e7,j=1e9;function Ce(s){var g,m,y,d=p.prototype={constructor:p,toString:null,valueOf:null},x=new p(1),b=20,O=4,$=-7,P=21,_=-1e7,R=1e7,z=!1,L=1,U=0,H={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},q="0123456789abcdefghijklmnopqrstuvwxyz",M=!0;function p(e,r){var o,u,a,f,h,t,n,l,i=this;if(!(i instanceof p))return new p(e,r);if(r==null){if(e&&e._isBigNumber===!0){i.s=e.s,!e.c||e.e>R?i.c=i.e=null:e.e<_?i.c=[i.e=0]:(i.e=e.e,i.c=e.c.slice());return}if((t=typeof e=="number")&&e*0==0){if(i.s=1/e<0?(e=-e,-1):1,e===~~e){for(f=0,h=e;h>=10;h/=10,f++);f>R?i.c=i.e=null:(i.e=f,i.c=[e]);return}l=String(e)}else{if(!lt.test(l=String(e)))return y(i,l,t);i.s=l.charCodeAt(0)==45?(l=l.slice(1),-1):1}(f=l.indexOf("."))>-1&&(l=l.replace(".","")),(h=l.search(/e/i))>0?(f<0&&(f=h),f+=+l.slice(h+1),l=l.substring(0,h)):f<0&&(f=l.length)}else{if(D(r,2,q.length,"Base"),r==10&&M)return i=new p(e),T(i,b+i.e+1,O);if(l=String(e),t=typeof e=="number"){if(e*0!=0)return y(i,l,t,r);if(i.s=1/e<0?(l=l.slice(1),-1):1,p.DEBUG&&l.replace(/^0\.0*|\./,"").length>15)throw Error(Ae+e)}else i.s=l.charCodeAt(0)===45?(l=l.slice(1),-1):1;for(o=q.slice(0,r),f=h=0,n=l.length;h<n;h++)if(o.indexOf(u=l.charAt(h))<0){if(u=="."){if(h>f){f=n;continue}}else if(!a&&(l==l.toUpperCase()&&(l=l.toLowerCase())||l==l.toLowerCase()&&(l=l.toUpperCase()))){a=!0,h=-1,f=0;continue}return y(i,String(e),t,r)}t=!1,l=m(l,r,10,i.s),(f=l.indexOf("."))>-1?l=l.replace(".",""):f=l.length}for(h=0;l.charCodeAt(h)===48;h++);for(n=l.length;l.charCodeAt(--n)===48;);if(l=l.slice(h,++n)){if(n-=h,t&&p.DEBUG&&n>15&&(e>ve||e!==ee(e)))throw Error(Ae+i.s*e);if((f=f-h-1)>R)i.c=i.e=null;else if(f<_)i.c=[i.e=0];else{if(i.e=f,i.c=[],h=(f+1)%S,f<0&&(h+=S),h<n){for(h&&i.c.push(+l.slice(0,h)),n-=S;h<n;)i.c.push(+l.slice(h,h+=S));h=S-(l=l.slice(h)).length}else h-=n;for(;h--;l+="0");i.c.push(+l)}}else i.c=[i.e=0]}p.clone=Ce,p.ROUND_UP=0,p.ROUND_DOWN=1,p.ROUND_CEIL=2,p.ROUND_FLOOR=3,p.ROUND_HALF_UP=4,p.ROUND_HALF_DOWN=5,p.ROUND_HALF_EVEN=6,p.ROUND_HALF_CEIL=7,p.ROUND_HALF_FLOOR=8,p.EUCLID=9,p.config=p.set=function(e){var r,o;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(r="DECIMAL_PLACES")&&(o=e[r],D(o,0,j,r),b=o),e.hasOwnProperty(r="ROUNDING_MODE")&&(o=e[r],D(o,0,8,r),O=o),e.hasOwnProperty(r="EXPONENTIAL_AT")&&(o=e[r],o&&o.pop?(D(o[0],-j,0,r),D(o[1],0,j,r),$=o[0],P=o[1]):(D(o,-j,j,r),$=-(P=o<0?-o:o))),e.hasOwnProperty(r="RANGE"))if(o=e[r],o&&o.pop)D(o[0],-j,-1,r),D(o[1],1,j,r),_=o[0],R=o[1];else if(D(o,-j,j,r),o)_=-(R=o<0?-o:o);else throw Error(K+r+" cannot be zero: "+o);if(e.hasOwnProperty(r="CRYPTO"))if(o=e[r],o===!!o)if(o)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))z=o;else throw z=!o,Error(K+"crypto unavailable");else z=o;else throw Error(K+r+" not true or false: "+o);if(e.hasOwnProperty(r="MODULO_MODE")&&(o=e[r],D(o,0,9,r),L=o),e.hasOwnProperty(r="POW_PRECISION")&&(o=e[r],D(o,0,j,r),U=o),e.hasOwnProperty(r="FORMAT"))if(o=e[r],typeof o=="object")H=o;else throw Error(K+r+" not an object: "+o);if(e.hasOwnProperty(r="ALPHABET"))if(o=e[r],typeof o=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(o))M=o.slice(0,10)=="0123456789",q=o;else throw Error(K+r+" invalid: "+o)}else throw Error(K+"Object expected: "+e);return{DECIMAL_PLACES:b,ROUNDING_MODE:O,EXPONENTIAL_AT:[$,P],RANGE:[_,R],CRYPTO:z,MODULO_MODE:L,POW_PRECISION:U,FORMAT:H,ALPHABET:q}},p.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!p.DEBUG)return!0;var r,o,u=e.c,a=e.e,f=e.s;e:if({}.toString.call(u)=="[object Array]"){if((f===1||f===-1)&&a>=-j&&a<=j&&a===ee(a)){if(u[0]===0){if(a===0&&u.length===1)return!0;break e}if(r=(a+1)%S,r<1&&(r+=S),String(u[0]).length==r){for(r=0;r<u.length;r++)if(o=u[r],o<0||o>=re||o!==ee(o))break e;if(o!==0)return!0}}}else if(u===null&&a===null&&(f===null||f===1||f===-1))return!0;throw Error(K+"Invalid BigNumber: "+e)},p.maximum=p.max=function(){return Q(arguments,-1)},p.minimum=p.min=function(){return Q(arguments,1)},p.random=function(){var e=9007199254740992,r=Math.random()*e&2097151?function(){return ee(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(o){var u,a,f,h,t,n=0,l=[],i=new p(x);if(o==null?o=b:D(o,0,j),h=we(o/S),z)if(crypto.getRandomValues){for(u=crypto.getRandomValues(new Uint32Array(h*=2));n<h;)t=u[n]*131072+(u[n+1]>>>11),t>=9e15?(a=crypto.getRandomValues(new Uint32Array(2)),u[n]=a[0],u[n+1]=a[1]):(l.push(t%1e14),n+=2);n=h/2}else if(crypto.randomBytes){for(u=crypto.randomBytes(h*=7);n<h;)t=(u[n]&31)*281474976710656+u[n+1]*1099511627776+u[n+2]*4294967296+u[n+3]*16777216+(u[n+4]<<16)+(u[n+5]<<8)+u[n+6],t>=9e15?crypto.randomBytes(7).copy(u,n):(l.push(t%1e14),n+=7);n=h/7}else throw z=!1,Error(K+"crypto unavailable");if(!z)for(;n<h;)t=r(),t<9e15&&(l[n++]=t%1e14);for(h=l[--n],o%=S,h&&o&&(t=ye[S-o],l[n]=ee(h/t)*t);l[n]===0;l.pop(),n--);if(n<0)l=[f=0];else{for(f=-1;l[0]===0;l.splice(0,1),f-=S);for(n=1,t=l[0];t>=10;t/=10,n++);n<S&&(f-=S-n)}return i.e=f,i.c=l,i}}(),p.sum=function(){for(var e=1,r=arguments,o=new p(r[0]);e<r.length;)o=o.plus(r[e++]);return o},m=function(){var e="0123456789";function r(o,u,a,f){for(var h,t=[0],n,l=0,i=o.length;l<i;){for(n=t.length;n--;t[n]*=u);for(t[0]+=f.indexOf(o.charAt(l++)),h=0;h<t.length;h++)t[h]>a-1&&(t[h+1]==null&&(t[h+1]=0),t[h+1]+=t[h]/a|0,t[h]%=a)}return t.reverse()}return function(o,u,a,f,h){var t,n,l,i,c,v,w,A,E=o.indexOf("."),N=b,k=O;for(E>=0&&(i=U,U=0,o=o.replace(".",""),A=new p(u),v=A.pow(o.length-E),U=i,A.c=r(le(Z(v.c),v.e,"0"),10,a,e),A.e=A.c.length),w=r(o,u,a,h?(t=q,e):(t=e,q)),l=i=w.length;w[--i]==0;w.pop());if(!w[0])return t.charAt(0);if(E<0?--l:(v.c=w,v.e=l,v.s=f,v=g(v,A,N,k,a),w=v.c,c=v.r,l=v.e),n=l+N+1,E=w[n],i=a/2,c=c||n<0||w[n+1]!=null,c=k<4?(E!=null||c)&&(k==0||k==(v.s<0?3:2)):E>i||E==i&&(k==4||c||k==6&&w[n-1]&1||k==(v.s<0?8:7)),n<1||!w[0])o=c?le(t.charAt(1),-N,t.charAt(0)):t.charAt(0);else{if(w.length=n,c)for(--a;++w[--n]>a;)w[n]=0,n||(++l,w=[1].concat(w));for(i=w.length;!w[--i];);for(E=0,o="";E<=i;o+=t.charAt(w[E++]));o=le(o,l,t.charAt(0))}return o}}(),g=function(){function e(u,a,f){var h,t,n,l,i=0,c=u.length,v=a%se,w=a/se|0;for(u=u.slice();c--;)n=u[c]%se,l=u[c]/se|0,h=w*n+l*v,t=v*n+h%se*se+i,i=(t/f|0)+(h/se|0)+w*l,u[c]=t%f;return i&&(u=[i].concat(u)),u}function r(u,a,f,h){var t,n;if(f!=h)n=f>h?1:-1;else for(t=n=0;t<f;t++)if(u[t]!=a[t]){n=u[t]>a[t]?1:-1;break}return n}function o(u,a,f,h){for(var t=0;f--;)u[f]-=t,t=u[f]<a[f]?1:0,u[f]=t*h+u[f]-a[f];for(;!u[0]&&u.length>1;u.splice(0,1));}return function(u,a,f,h,t){var n,l,i,c,v,w,A,E,N,k,C,B,oe,ne,ie,V,X,G=u.s==a.s?1:-1,Y=u.c,F=a.c;if(!Y||!Y[0]||!F||!F[0])return new p(!u.s||!a.s||(Y?F&&Y[0]==F[0]:!F)?NaN:Y&&Y[0]==0||!F?G*0:G/0);for(E=new p(G),N=E.c=[],l=u.e-a.e,G=f+l+1,t||(t=re,l=te(u.e/S)-te(a.e/S),G=G/S|0),i=0;F[i]==(Y[i]||0);i++);if(F[i]>(Y[i]||0)&&l--,G<0)N.push(1),c=!0;else{for(ne=Y.length,V=F.length,i=0,G+=2,v=ee(t/(F[0]+1)),v>1&&(F=e(F,v,t),Y=e(Y,v,t),V=F.length,ne=Y.length),oe=V,k=Y.slice(0,V),C=k.length;C<V;k[C++]=0);X=F.slice(),X=[0].concat(X),ie=F[0],F[1]>=t/2&&ie++;do{if(v=0,n=r(F,k,V,C),n<0){if(B=k[0],V!=C&&(B=B*t+(k[1]||0)),v=ee(B/ie),v>1)for(v>=t&&(v=t-1),w=e(F,v,t),A=w.length,C=k.length;r(w,k,A,C)==1;)v--,o(w,V<A?X:F,A,t),A=w.length,n=1;else v==0&&(n=v=1),w=F.slice(),A=w.length;if(A<C&&(w=[0].concat(w)),o(k,w,C,t),C=k.length,n==-1)for(;r(F,k,V,C)<1;)v++,o(k,V<C?X:F,C,t),C=k.length}else n===0&&(v++,k=[0]);N[i++]=v,k[0]?k[C++]=Y[oe]||0:(k=[Y[oe]],C=1)}while((oe++<ne||k[0]!=null)&&G--);c=k[0]!=null,N[0]||N.splice(0,1)}if(t==re){for(i=1,G=N[0];G>=10;G/=10,i++);T(E,f+(E.e=i+l*S-1)+1,h,c)}else E.e=l,E.r=+c;return E}}();function I(e,r,o,u){var a,f,h,t,n;if(o==null?o=O:D(o,0,8),!e.c)return e.toString();if(a=e.c[0],h=e.e,r==null)n=Z(e.c),n=u==1||u==2&&(h<=$||h>=P)?de(n,h):le(n,h,"0");else if(e=T(new p(e),r,o),f=e.e,n=Z(e.c),t=n.length,u==1||u==2&&(r<=f||f<=$)){for(;t<r;n+="0",t++);n=de(n,f)}else if(r-=h,n=le(n,f,"0"),f+1>t){if(--r>0)for(n+=".";r--;n+="0");}else if(r+=f-t,r>0)for(f+1==t&&(n+=".");r--;n+="0");return e.s<0&&a?"-"+n:n}function Q(e,r){for(var o,u,a=1,f=new p(e[0]);a<e.length;a++)u=new p(e[a]),(!u.s||(o=ae(f,u))===r||o===0&&f.s===r)&&(f=u);return f}function J(e,r,o){for(var u=1,a=r.length;!r[--a];r.pop());for(a=r[0];a>=10;a/=10,u++);return(o=u+o*S-1)>R?e.c=e.e=null:o<_?e.c=[e.e=0]:(e.e=o,e.c=r),e}y=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,r=/^([^.]+)\.$/,o=/^\.([^.]+)$/,u=/^-?(Infinity|NaN)$/,a=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(f,h,t,n){var l,i=t?h:h.replace(a,"");if(u.test(i))f.s=isNaN(i)?null:i<0?-1:1;else{if(!t&&(i=i.replace(e,function(c,v,w){return l=(w=w.toLowerCase())=="x"?16:w=="b"?2:8,!n||n==l?v:c}),n&&(l=n,i=i.replace(r,"$1").replace(o,"0.$1")),h!=i))return new p(i,l);if(p.DEBUG)throw Error(K+"Not a"+(n?" base "+n:"")+" number: "+h);f.s=null}f.c=f.e=null}}();function T(e,r,o,u){var a,f,h,t,n,l,i,c=e.c,v=ye;if(c){e:{for(a=1,t=c[0];t>=10;t/=10,a++);if(f=r-a,f<0)f+=S,h=r,n=c[l=0],i=ee(n/v[a-h-1]%10);else if(l=we((f+1)/S),l>=c.length)if(u){for(;c.length<=l;c.push(0));n=i=0,a=1,f%=S,h=f-S+1}else break e;else{for(n=t=c[l],a=1;t>=10;t/=10,a++);f%=S,h=f-S+a,i=h<0?0:ee(n/v[a-h-1]%10)}if(u=u||r<0||c[l+1]!=null||(h<0?n:n%v[a-h-1]),u=o<4?(i||u)&&(o==0||o==(e.s<0?3:2)):i>5||i==5&&(o==4||u||o==6&&(f>0?h>0?n/v[a-h]:0:c[l-1])%10&1||o==(e.s<0?8:7)),r<1||!c[0])return c.length=0,u?(r-=e.e+1,c[0]=v[(S-r%S)%S],e.e=-r||0):c[0]=e.e=0,e;if(f==0?(c.length=l,t=1,l--):(c.length=l+1,t=v[S-f],c[l]=h>0?ee(n/v[a-h]%v[h])*t:0),u)for(;;)if(l==0){for(f=1,h=c[0];h>=10;h/=10,f++);for(h=c[0]+=t,t=1;h>=10;h/=10,t++);f!=t&&(e.e++,c[0]==re&&(c[0]=1));break}else{if(c[l]+=t,c[l]!=re)break;c[l--]=0,t=1}for(f=c.length;c[--f]===0;c.pop());}e.e>R?e.c=e.e=null:e.e<_&&(e.c=[e.e=0])}return e}function W(e){var r,o=e.e;return o===null?e.toString():(r=Z(e.c),r=o<=$||o>=P?de(r,o):le(r,o,"0"),e.s<0?"-"+r:r)}return d.absoluteValue=d.abs=function(){var e=new p(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,r){return ae(this,new p(e,r))},d.decimalPlaces=d.dp=function(e,r){var o,u,a,f=this;if(e!=null)return D(e,0,j),r==null?r=O:D(r,0,8),T(new p(f),e+f.e+1,r);if(!(o=f.c))return null;if(u=((a=o.length-1)-te(this.e/S))*S,a=o[a])for(;a%10==0;a/=10,u--);return u<0&&(u=0),u},d.dividedBy=d.div=function(e,r){return g(this,new p(e,r),b,O)},d.dividedToIntegerBy=d.idiv=function(e,r){return g(this,new p(e,r),0,1)},d.exponentiatedBy=d.pow=function(e,r){var o,u,a,f,h,t,n,l,i,c=this;if(e=new p(e),e.c&&!e.isInteger())throw Error(K+"Exponent not an integer: "+W(e));if(r!=null&&(r=new p(r)),t=e.e>14,!c.c||!c.c[0]||c.c[0]==1&&!c.e&&c.c.length==1||!e.c||!e.c[0])return i=new p(Math.pow(+W(c),t?e.s*(2-ue(e)):+W(e))),r?i.mod(r):i;if(n=e.s<0,r){if(r.c?!r.c[0]:!r.s)return new p(NaN);u=!n&&c.isInteger()&&r.isInteger(),u&&(c=c.mod(r))}else{if(e.e>9&&(c.e>0||c.e<-1||(c.e==0?c.c[0]>1||t&&c.c[1]>=24e7:c.c[0]<8e13||t&&c.c[0]<=9999975e7)))return f=c.s<0&&ue(e)?-0:0,c.e>-1&&(f=1/f),new p(n?1/f:f);U&&(f=we(U/S+2))}for(t?(o=new p(.5),n&&(e.s=1),l=ue(e)):(a=Math.abs(+W(e)),l=a%2),i=new p(x);;){if(l){if(i=i.times(c),!i.c)break;f?i.c.length>f&&(i.c.length=f):u&&(i=i.mod(r))}if(a){if(a=ee(a/2),a===0)break;l=a%2}else if(e=e.times(o),T(e,e.e+1,1),e.e>14)l=ue(e);else{if(a=+W(e),a===0)break;l=a%2}c=c.times(c),f?c.c&&c.c.length>f&&(c.c.length=f):u&&(c=c.mod(r))}return u?i:(n&&(i=x.div(i)),r?i.mod(r):f?T(i,U,O,h):i)},d.integerValue=function(e){var r=new p(this);return e==null?e=O:D(e,0,8),T(r,r.e+1,e)},d.isEqualTo=d.eq=function(e,r){return ae(this,new p(e,r))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,r){return ae(this,new p(e,r))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,r){return(r=ae(this,new p(e,r)))===1||r===0},d.isInteger=function(){return!!this.c&&te(this.e/S)>this.c.length-2},d.isLessThan=d.lt=function(e,r){return ae(this,new p(e,r))<0},d.isLessThanOrEqualTo=d.lte=function(e,r){return(r=ae(this,new p(e,r)))===-1||r===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,r){var o,u,a,f,h=this,t=h.s;if(e=new p(e,r),r=e.s,!t||!r)return new p(NaN);if(t!=r)return e.s=-r,h.plus(e);var n=h.e/S,l=e.e/S,i=h.c,c=e.c;if(!n||!l){if(!i||!c)return i?(e.s=-r,e):new p(c?h:NaN);if(!i[0]||!c[0])return c[0]?(e.s=-r,e):new p(i[0]?h:O==3?-0:0)}if(n=te(n),l=te(l),i=i.slice(),t=n-l){for((f=t<0)?(t=-t,a=i):(l=n,a=c),a.reverse(),r=t;r--;a.push(0));a.reverse()}else for(u=(f=(t=i.length)<(r=c.length))?t:r,t=r=0;r<u;r++)if(i[r]!=c[r]){f=i[r]<c[r];break}if(f&&(a=i,i=c,c=a,e.s=-e.s),r=(u=c.length)-(o=i.length),r>0)for(;r--;i[o++]=0);for(r=re-1;u>t;){if(i[--u]<c[u]){for(o=u;o&&!i[--o];i[o]=r);--i[o],i[u]+=re}i[u]-=c[u]}for(;i[0]==0;i.splice(0,1),--l);return i[0]?J(e,i,l):(e.s=O==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,r){var o,u,a=this;return e=new p(e,r),!a.c||!e.s||e.c&&!e.c[0]?new p(NaN):!e.c||a.c&&!a.c[0]?new p(a):(L==9?(u=e.s,e.s=1,o=g(a,e,0,3),e.s=u,o.s*=u):o=g(a,e,0,L),e=a.minus(o.times(e)),!e.c[0]&&L==1&&(e.s=a.s),e)},d.multipliedBy=d.times=function(e,r){var o,u,a,f,h,t,n,l,i,c,v,w,A,E,N,k=this,C=k.c,B=(e=new p(e,r)).c;if(!C||!B||!C[0]||!B[0])return!k.s||!e.s||C&&!C[0]&&!B||B&&!B[0]&&!C?e.c=e.e=e.s=null:(e.s*=k.s,!C||!B?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(u=te(k.e/S)+te(e.e/S),e.s*=k.s,n=C.length,c=B.length,n<c&&(A=C,C=B,B=A,a=n,n=c,c=a),a=n+c,A=[];a--;A.push(0));for(E=re,N=se,a=c;--a>=0;){for(o=0,v=B[a]%N,w=B[a]/N|0,h=n,f=a+h;f>a;)l=C[--h]%N,i=C[h]/N|0,t=w*l+i*v,l=v*l+t%N*N+A[f]+o,o=(l/E|0)+(t/N|0)+w*i,A[f--]=l%E;A[f]=o}return o?++u:A.splice(0,1),J(e,A,u)},d.negated=function(){var e=new p(this);return e.s=-e.s||null,e},d.plus=function(e,r){var o,u=this,a=u.s;if(e=new p(e,r),r=e.s,!a||!r)return new p(NaN);if(a!=r)return e.s=-r,u.minus(e);var f=u.e/S,h=e.e/S,t=u.c,n=e.c;if(!f||!h){if(!t||!n)return new p(a/0);if(!t[0]||!n[0])return n[0]?e:new p(t[0]?u:a*0)}if(f=te(f),h=te(h),t=t.slice(),a=f-h){for(a>0?(h=f,o=n):(a=-a,o=t),o.reverse();a--;o.push(0));o.reverse()}for(a=t.length,r=n.length,a-r<0&&(o=n,n=t,t=o,r=a),a=0;r;)a=(t[--r]=t[r]+n[r]+a)/re|0,t[r]=re===t[r]?0:t[r]%re;return a&&(t=[a].concat(t),++h),J(e,t,h)},d.precision=d.sd=function(e,r){var o,u,a,f=this;if(e!=null&&e!==!!e)return D(e,1,j),r==null?r=O:D(r,0,8),T(new p(f),e,r);if(!(o=f.c))return null;if(a=o.length-1,u=a*S+1,a=o[a]){for(;a%10==0;a/=10,u--);for(a=o[0];a>=10;a/=10,u++);}return e&&f.e+1>u&&(u=f.e+1),u},d.shiftedBy=function(e){return D(e,-ve,ve),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,r,o,u,a,f=this,h=f.c,t=f.s,n=f.e,l=b+4,i=new p("0.5");if(t!==1||!h||!h[0])return new p(!t||t<0&&(!h||h[0])?NaN:h?f:1/0);if(t=Math.sqrt(+W(f)),t==0||t==1/0?(r=Z(h),(r.length+n)%2==0&&(r+="0"),t=Math.sqrt(+r),n=te((n+1)/2)-(n<0||n%2),t==1/0?r="5e"+n:(r=t.toExponential(),r=r.slice(0,r.indexOf("e")+1)+n),o=new p(r)):o=new p(t+""),o.c[0]){for(n=o.e,t=n+l,t<3&&(t=0);;)if(a=o,o=i.times(a.plus(g(f,a,l,1))),Z(a.c).slice(0,t)===(r=Z(o.c)).slice(0,t))if(o.e<n&&--t,r=r.slice(t-3,t+1),r=="9999"||!u&&r=="4999"){if(!u&&(T(a,a.e+b+2,0),a.times(a).eq(f))){o=a;break}l+=4,t+=4,u=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(T(o,o.e+b+2,1),e=!o.times(o).eq(f));break}}return T(o,o.e+b+1,O,e)},d.toExponential=function(e,r){return e!=null&&(D(e,0,j),e++),I(this,e,r,1)},d.toFixed=function(e,r){return e!=null&&(D(e,0,j),e=e+this.e+1),I(this,e,r)},d.toFormat=function(e,r,o){var u,a=this;if(o==null)e!=null&&r&&typeof r=="object"?(o=r,r=null):e&&typeof e=="object"?(o=e,e=r=null):o=H;else if(typeof o!="object")throw Error(K+"Argument not an object: "+o);if(u=a.toFixed(e,r),a.c){var f,h=u.split("."),t=+o.groupSize,n=+o.secondaryGroupSize,l=o.groupSeparator||"",i=h[0],c=h[1],v=a.s<0,w=v?i.slice(1):i,A=w.length;if(n&&(f=t,t=n,n=f,A-=f),t>0&&A>0){for(f=A%t||t,i=w.substr(0,f);f<A;f+=t)i+=l+w.substr(f,t);n>0&&(i+=l+w.slice(f)),v&&(i="-"+i)}u=c?i+(o.decimalSeparator||"")+((n=+o.fractionGroupSize)?c.replace(new RegExp("\\d{"+n+"}\\B","g"),"$&"+(o.fractionGroupSeparator||"")):c):i}return(o.prefix||"")+u+(o.suffix||"")},d.toFraction=function(e){var r,o,u,a,f,h,t,n,l,i,c,v,w=this,A=w.c;if(e!=null&&(t=new p(e),!t.isInteger()&&(t.c||t.s!==1)||t.lt(x)))throw Error(K+"Argument "+(t.isInteger()?"out of range: ":"not an integer: ")+W(t));if(!A)return new p(w);for(r=new p(x),l=o=new p(x),u=n=new p(x),v=Z(A),f=r.e=v.length-w.e-1,r.c[0]=ye[(h=f%S)<0?S+h:h],e=!e||t.comparedTo(r)>0?f>0?r:l:t,h=R,R=1/0,t=new p(v),n.c[0]=0;i=g(t,r,0,1),a=o.plus(i.times(u)),a.comparedTo(e)!=1;)o=u,u=a,l=n.plus(i.times(a=l)),n=a,r=t.minus(i.times(a=r)),t=a;return a=g(e.minus(o),u,0,1),n=n.plus(a.times(l)),o=o.plus(a.times(u)),n.s=l.s=w.s,f=f*2,c=g(l,u,f,O).minus(w).abs().comparedTo(g(n,o,f,O).minus(w).abs())<1?[l,u]:[n,o],R=h,c},d.toNumber=function(){return+W(this)},d.toPrecision=function(e,r){return e!=null&&D(e,1,j),I(this,e,r,2)},d.toString=function(e){var r,o=this,u=o.s,a=o.e;return a===null?u?(r="Infinity",u<0&&(r="-"+r)):r="NaN":(e==null?r=a<=$||a>=P?de(Z(o.c),a):le(Z(o.c),a,"0"):e===10&&M?(o=T(new p(o),b+a+1,O),r=le(Z(o.c),o.e,"0")):(D(e,2,q.length,"Base"),r=m(le(Z(o.c),a,"0"),10,e,u,!0)),u<0&&o.c[0]&&(r="-"+r)),r},d.valueOf=d.toJSON=function(){return W(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,s!=null&&p.set(s),p}function te(s){var g=s|0;return s>0||s===g?g:g-1}function Z(s){for(var g,m,y=1,d=s.length,x=s[0]+"";y<d;){for(g=s[y++]+"",m=S-g.length;m--;g="0"+g);x+=g}for(d=x.length;x.charCodeAt(--d)===48;);return x.slice(0,d+1||1)}function ae(s,g){var m,y,d=s.c,x=g.c,b=s.s,O=g.s,$=s.e,P=g.e;if(!b||!O)return null;if(m=d&&!d[0],y=x&&!x[0],m||y)return m?y?0:-O:b;if(b!=O)return b;if(m=b<0,y=$==P,!d||!x)return y?0:!d^m?1:-1;if(!y)return $>P^m?1:-1;for(O=($=d.length)<(P=x.length)?$:P,b=0;b<O;b++)if(d[b]!=x[b])return d[b]>x[b]^m?1:-1;return $==P?0:$>P^m?1:-1}function D(s,g,m,y){if(s<g||s>m||s!==ee(s))throw Error(K+(y||"Argument")+(typeof s=="number"?s<g||s>m?" out of range: ":" not an integer: ":" not a primitive number: ")+String(s))}function ue(s){var g=s.c.length-1;return te(s.e/S)==g&&s.c[g]%2!=0}function de(s,g){return(s.length>1?s.charAt(0)+"."+s.slice(1):s)+(g<0?"e":"e+")+g}function le(s,g,m){var y,d;if(g<0){for(d=m+".";++g;d+=m);s=d+s}else if(y=s.length,++g>y){for(d=m,g-=y;--g;d+=m);s+=d}else g<y&&(s=s.slice(0,g)+"."+s.slice(g));return s}var st=Ce();const at="en-US",ct="USD",ge=s=>new Intl.NumberFormat(at,{style:"currency",currency:ct}).format(s);function ft(s,{cartState:g}){const{bau:m,css:y}=s,{div:d,dialog:x,ul:b,li:O,span:$,button:P,img:_,header:R,footer:z,h1:L,form:U}=m.tags,H=m.derive(()=>g.val.length==0),q=I=>()=>{const Q=g.val.findIndex(({name:J})=>J==I.name);Q>=0&&g.val.splice(Q,1)},M=y`
    margin: auto;
    z-index: 10;
    box-shadow: var(--shadow-m);
    border: none;
    border-radius: 0.5rem;

    & > form {
      min-height: 200px;
      min-width: 250px;

      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      & > header {
        border-bottom: 1px solid var(--color-emphasis-200);
        h1 {
          font-size: 1rem;
          line-height: 3rem;
        }
      }
      .cart-empty {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--font-color-secondary);
        font-weight: bold;
        font-size: 0.9rem;
      }
      .inner-cart {
        display: grid;
        gap: 1rem;
      }
      & ul {
        > li {
          display: flex;
          align-items: center;
          list-style: none;
          justify-content: space-between;
          gap: 1rem;
          .name {
            font-size: 1rem;
            font-weight: 00;
          }
          .quantity {
          }
          .price {
          }
          .price-total {
            font-weight: 600;
          }
          & button {
            border: none;
            display: flex;
            padding-inline: 1rem;
          }
        }
      }
    }
  `,p=()=>{document.getElementById("dialog-cart").close()};return()=>x({id:"dialog-cart",class:M,onclick:({target:I,currentTarget:Q})=>{I==Q&&I.close()}},U(R(L("Cart")),()=>H.val?d({class:"cart-empty"},"Your cart is empty"):d({class:"inner-cart"},m.loop(g,b(),I=>O(_({src:I.thumbnail,width:48,height:48,alt:""}),d(d({class:"name"},I.name),d($({class:"quantity"},I.quantity,"x"),$({class:"price"},ge(I.price)),$({class:"price-total"},"  =",ge(st(I.price).times(I.quantity).toNumber())))),P({role:"delete",onclick:q(I)},_({src:"./assets/images/icon-delete.svg",alt:""})))),z(P({class:["primary","solid"],type:"submit",onclick:p},"Confirm Order")))))}const ut=(s,{cartState:g})=>{const{bau:m,css:y}=s,{div:d}=m.tags,x=it(s,{cartState:g}),b=ft(s,{cartState:g});return function({componentState:$}){return d({class:y`
          display: grid;
          margin: auto;
          max-width: 1000px;
          min-height: 100vh;
        `},x(),b(),d({style:"flex-grow: 1"},()=>$.val))}};function dt(s,{}){const{bau:g,css:m}=s,{svg:y,use:d}=g.tagsNS("http://www.w3.org/2000/svg"),{section:x,img:b,ul:O,li:$,button:P,div:_,dialog:R,header:z}=g.tags,L=g.state(0),U=m`
    --img-width: min(100vw, 440px);

    &.fullscreen {
      --img-width: min(100vw, 450px);
      padding-inline: 3rem;

      & .track {
        & .control {
          display: block;
        }
        & .control-previous {
          transform: translate(-50%, -50%);
        }
        & .control-next {
          transform: translate(50%, -50%);
        }
      }
    }

    & ul {
      list-style: none;
      display: flex;
    }
    & .track {
      position: relative;
      & .control {
        z-index: 1;
        position: absolute;
        padding: 0.5rem;
        cursor: pointer;
        & button {
          background-color: var(--color-emphasis-100);
          width: 3rem;
          height: 3rem;
          font-size: xx-large;
          border-radius: 100%;
          display: grid;
          place-content: center;
          transition: all 0.2s;
          color: var(--color-emphasis-900);
          &:hover {
            color: var(--color-primary);
          }
        }
        @media (min-width: 600px) {
          display: none;
        }
      }
      & .control-previous {
        top: 50%;
        transform: translateY(-50%);
      }
      & .control-next {
        top: 50%;
        transform: translate(-0%, -50%);
        right: 0;
      }

      & .track-inner {
        margin-block: 1rem;

        margin-inline: auto;
        @media (max-width: 600px) {
          margin: 0;
        }
        width: var(--img-width);
        height: var(--img-width);
        overflow: hidden;

        & ul {
          cursor: pointer;
          margin: 0;
          transition: all var(--transition-slow);
          > li {
            & img {
              object-fit: contain;
              border-radius: 0.7rem;
              @media (max-width: 600px) {
                border-radius: 0;
              }
              display: block;
              width: var(--img-width);
              height: var(--img-width);
            }
          }
        }
      }
    }
    & ul.thumbnail {
      display: grid;
      max-width: 550px;
      margin: auto;
      width: var(--img-width);

      @media (max-width: 600px) {
        display: none;
      }
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      place-items: center;
      > li {
        &.active {
          & button {
            outline: 3px solid var(--color-primary);
          }
        }
        & button {
          border-radius: 0.7rem;
          overflow: hidden;
          transition: all 0.2s;
          & img {
            &:hover {
              filter: opacity(50%);
            }
          }
        }
      }
    }
  `;return({images:H=[]})=>{const q=()=>{L.val<=0?L.val=H.length-1:L.val--},M=()=>{L.val>=H.length-1?L.val=0:L.val++},p=T=>()=>{L.val=T},I=()=>{document.getElementById("dialog-carousel").showModal()},Q=()=>{document.getElementById("dialog-carousel").close()},J=({images:T,fullscreen:W=!1})=>x({class:["carousel",U,W&&"fullscreen"]},_({class:"track"},_({class:["control","control-previous"],onclick:q},P({role:"previous"},y({width:12,height:18,viewBox:"0 0 12 18"},d({href:"./assets/images/icon-previous.svg#previous"})))),_({class:["control","control-next"],onclick:M},P({role:"next"},y({width:13,height:18,viewBox:"0 0 13 18"},d({href:"./assets/images/icon-next.svg#next"})))),_({class:"track-inner"},O({style:()=>`transform: translateX(${-100*L.val}%);`,onclick:I},T.map(({desktop:e,alt:r})=>$(b({src:e,alt:r,width:440,height:440})))))),O({class:"thumbnail"},T.map(({thumbnail:e,alt:r},o)=>$({class:()=>o==L.val&&"active"},P({onclick:p(o)},b({src:e,alt:r,width:91,height:91}))))));return[J({images:H}),R({id:"dialog-carousel",class:m`
            border: none;
            background: none;
            padding: 0;
            inset: 0;
            margin: auto;
            border-radius: 1rem;
            z-index: 10;
            & header {
              display: flex;
              justify-content: flex-end;
              & button[role="close"] {
                padding-right: 3rem;
              }
            }
          `},z(P({role:"close",onclick:Q},"❌")),J({images:H,fullscreen:!0}))]}}function ht(s,{quantityState:g}){const{bau:m,css:y}=s,{div:d,button:x}=m.tags,b=()=>{g.val+=1},O=()=>{g.val<=0||(g.val-=1)},$=y`
    display: inline-flex;
    justify-content: space-between;
    border-radius: 0.4rem;
    background-color: var(--color-gray-50);
    align-items: center;
    & img {
      display: block;
    }
    .quantity {
      font-weight: bold;
      min-width: 1rem;
      text-align: center;
      color: var(--font-color);
    }
    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      padding-inline: 2rem;
      padding-block: 1rem;
      font-size: large;
      color: transparent;
      transition: all 0.3s;
      text-shadow: 0 0 0 var(--color-primary);
      &:hover {
        text-shadow: 0 0 0 var(--color-primary-darker);
      }
    }
  `;return()=>d({class:$},x({onclick:O,"aria-label":"decrement quantity"},"➖"),d({class:"quantity"},g),x({onclick:b,"aria-label":"increment quantity"},"➕"))}function gt(s,{cartState:g}){const{bau:m,css:y}=s,{h1:d,h2:x,p:b,div:O,button:$,span:P,section:_}=m.tags,{svg:R,use:z}=m.tagsNS("http://www.w3.org/2000/svg"),L=m.state(1),U=ht(s,{quantityState:L}),H=M=>()=>{const p=g.val.find(({name:I})=>I==M.name);p?p.quantity+=L.val:g.val.push({name:M.name,price:M.price,quantity:L.val,thumbnail:M.imageInfo[0].thumbnail}),L.val=0},q=y`
    margin: auto;
    padding-inline: 1rem;
    max-width: min(100vw, 500px);
    & h1 {
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      font-size: small;
      color: var(--color-emphasis-600);
      line-height: 3rem;
    }
    & h2 {
      font-size: 2.7rem;
      line-height: 3rem;
    }
    > p {
      margin-block: 1rem;
      color: var(--font-color-secondary);
      font-size: 1em;
      line-height: 1.64em;
      letter-spacing: 0.1px;
    }
    .price-container {
      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .price-current {
        display: flex;
        gap: 1rem;
        align-items: center;
        .price {
          font-size: x-large;
          font-weight: bold;
          letter-spacing: 0.8px;
        }
        .discount {
          font-weight: bold;
          background-color: var(--color-content);
          color: var(--color-content-inverse);
          padding-inline: 0.7rem;
          border-radius: 0.4rem;
        }
      }
      .price-old {
        font-weight: bold;
        text-decoration: line-through;
        color: var(--color-emphasis-600);
      }
    }

    .cart-action {
      display: flex;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        flex-direction: column;
        align-items: stretch;
      }
      gap: 1rem;
      & button.add-to-cart {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: inherit;
        font-weight: 500;
        padding-block: 0.5rem;
        min-width: 15rem;
        border-radius: 0.4rem;
        color: var(--font-color);
        background-color: var(--color-primary);
      }
    }
  `;return M=>{const{brand:p,name:I,description:Q,price:J,discount:T,priceOld:W}=M;return _({class:q},d(p),x(I),b(Q),O({class:"price-container"},b({class:"price-current"},P({class:"price"},ge(J)),P({class:"discount"},`${T}%`)),b({class:"price-old"},ge(W))),b({class:"cart-action"},U(),$({class:"add-to-cart",onclick:H(M)},R({width:16,height:16,viewBox:"0 0 22 22",fill:"currentColor"},z({href:"./assets/images/icon-cart.svg#cart"})),"Add to cart")))}}const Pe=new Array(4).fill("").map((s,g)=>({thumbnail:`./assets/images/image-product-${g+1}-thumbnail.jpg`,desktop:`./assets/images/image-product-${g+1}.jpg`,alt:`images-${g}`})),pt={brand:"Sneaker Company",name:"Fall Limited Edition Sneakers",description:"These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",imageInfo:Pe,price:125,priceOld:250,discount:50};function mt(s,{cartState:g}){const{bau:m,css:y}=s,{article:d}=m.tags,x=dt(s,{}),b=gt(s,{cartState:g}),O=y`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;return()=>d({class:O},x({images:Pe}),b(pt))}const wt=(s,{cartState:g})=>{const m=mt(s,{cartState:g});return[{path:"",action:y=>({routerContext:y,title:"Product",component:()=>m()})}]},vt=s=>({title:"Page Not Found",component:()=>"Not Found"}),Ie={base:"/bau/frontendmentor/e-commerce-product-page"},he=Qe({config:Ie}),Se=he.bau.state([]);et({routes:wt(he,{cartState:Se}),onLocationChange:tt({context:he,config:Ie,LayoutDefault:ut(he,{cartState:Se})}),notFoundRoute:vt()});
