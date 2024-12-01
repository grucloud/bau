(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))N(h);new MutationObserver(h=>{for(const A of h)if(A.type==="childList")for(const y of A.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&N(y)}).observe(document,{childList:!0,subtree:!0});function w(h){const A={};return h.integrity&&(A.integrity=h.integrity),h.referrerPolicy&&(A.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?A.credentials="include":h.crossOrigin==="anonymous"?A.credentials="omit":A.credentials="same-origin",A}function N(h){if(h.ep)return;h.ep=!0;const A=w(h);fetch(h.href,A)}})();let ye=u=>Object.prototype.toString.call(u??0).slice(8,-1),Ce=u=>ye(u)=="Object",Ae=u=>ye(u)=="Function",de=u=>["Object","Array"].includes(ye(u)),Ne=Object.getPrototypeOf,he=u=>ce(u)?u.val:u,Oe=u=>Array.isArray(u)?u:[u],ce=u=>u==null?void 0:u.__isState,Me=["splice","push","pop","shift","unshift","sort","reverse"];const Te=u=>!ce(u[0])&&Ce(u[0])?[u[0],u.slice(1)]:[{},u];function _e(u){let p=window,{document:w}=p,N,h=new Set,A=[],y,E=r=>w.createElement(r),$=(r,o,l)=>{let i=y;y=o;try{return r(l)}catch(c){return console.error(c),l}finally{y=i}},C=()=>{N||(N=p.requestAnimationFrame(()=>{h.forEach(r=>{r.bindings=r.bindings.filter(({element:o})=>{var l;return(l=Array.isArray(o)?o[0]:o)==null?void 0:l.isConnected}),!r.bindings.length&&!r.computed&&h.delete(r)}),N=void 0}))},T=(r,o)=>{!A.length&&p.requestAnimationFrame(_),A.push([r,o])};const _=()=>{let r=0,o=A.length;do{for(let l of new Set(A.slice(r,o).flatMap(([i])=>i.listeners)))g(l.computed,l.state);r=o,o=A.length}while(r<o);for(let l of new Set(A.flatMap(([i,c])=>i.bindings.map(v=>(v.op=c,v)))))U(l);A=[],C()};let U=r=>{var oe;const{deps:o,element:l,renderInferred:i,render:c,renderItem:v,isAttribute:m,op:S=[]}=r,[b,x,O,P,M]=S;if(b&&v)(oe=H(l,O,(...ne)=>D(v(...ne)),x,P,M)[b])==null||oe.call();else{let ne=i?i({element:l}):c({element:l,renderItem:v})(...o.map(he));if(ne!==l&&!m){let ie=Oe(r.element=D(ne)),X=Oe(l),K=0;for(;K<X.length&&K<ie.length;K++)X[K].replaceWith(D(ie[K]));let G=K;for(;ie.length>G;)ie[G-1].after(ie[G]),G++;for(;X.length>K;)X[K].remove(),K++}}},j=(r,o,l=[])=>({get(i,c,v){var m,S;if((m=y==null?void 0:y.g)==null||m.add(r),c==="_isProxy")return!0;if(!((S=i[c])!=null&&S._isProxy)&&!ce(i[c])&&de(i[c]))i[c]=new Proxy(i[c],j(r,o,[...l,c]));else if(Me.includes(c)){let b=i[c];return(...x)=>{let O=b.apply(i,x);return T(r,[c,O,x,o,l]),O}}return Reflect.get(i,c,v)},set(i,c,v,m){let S=Reflect.set(i,c,v,m);return T(r,["setItem",S,{prop:c,value:v},o,[...l,c]]),S}}),R=(r,o)=>new Proxy(o,j(r,o)),H=(r,o,l,i,c,v)=>{let m=()=>{if(i.length==0)r.textContent="";else{for(var b=0;b<i.length&&b<r.children.length;b++){const O=r.children[b];O!=null&&O.bauUpdate?O.bauUpdate(O,i[b]):O.replaceWith(l(i[b],b))}let x=r.children[b];if(x)for(;x;){const O=x.nextSibling;x.remove(),x=O}else for(;b<i.length;b++)r.appendChild(l(i[b],b))}},S=b=>r[b]&&r.removeChild(r[b]);return{assign:m,sort:m,reverse:m,setItem:()=>{let b=v[0],x=r.children[b],O=c[b];x&&(x!=null&&x.bauUpdate?x.bauUpdate(x,O):x.replaceWith(l(O,b)))},push:()=>{for(let b=0;b<o.length;b++)r.appendChild(l(o[b],c.length+b))},unshift:()=>{for(let b=o.length-1;b>=0;b--)r.prepend(l(o[b]))},pop:()=>S("lastChild"),shift:()=>S("firstChild"),splice:()=>{const{length:b}=r.children;let[x,O=b,...P]=o;for(let M=x>=0?Math.min(x+O-1,b-1):b-1;M>=(x>=0?x:b+x);M--)r.children[M].remove();if(P.length){let M=P.map((oe,ne)=>l(oe,x+ne));r.children[x]?r.children[x].before(...M):r.append(...M)}}}},L=(r,{onUpdate:o,name:l}={})=>({name:l,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var c;let i=this;return(c=y==null?void 0:y.g)==null||c.add(i),i.valProxy??(i.valProxy=de(r)?R(i,r):r,i.valProxy)},set val(i){var m;let c=this,v=c.rawVal;(m=y==null?void 0:y.s)==null||m.add(c),o==null||o(v,i),c.rawVal=i,de(i)?(c.valProxy=R(c,i),T(c,["assign",i])):i!==v&&(c.valProxy=i,c.bindings.length+c.listeners.length&&T(c))}}),D=r=>{if(r==null||r===!1){let o=E("span");return o.style.display="none",o}else return r.nodeType?r:Array.isArray(r)?r.map(D):w.createTextNode(r)},g=(r,o)=>{let l={g:new Set,s:new Set};return o.val=$(r,l),l},q=(r,o)=>{let l=L(void 0,o),i=g(r,l);l.computed=!0;let c={computed:r,state:l};for(let v of new Set([...i.g].filter(m=>!i.s.has(m)&&m.listeners.every(S=>!i.g.has(S.state)))))v.listeners.push(c);return l},Y=(r,o=[])=>{for(let l of o)if(Array.isArray(l))Y(r,l);else if(l!=null){let i=ce(l)?a({deps:[l],render:()=>c=>c}):Ae(l)?s(l):D(l);Array.isArray(i)?r.append(...i):r.appendChild(i)}},W={},F=(r,o)=>r&&(Object.getOwnPropertyDescriptor(r,o)??F(Ne(r),o)),V=(r,o,l)=>{var i;return W[r+","+o]??(W[r+","+o]=((i=F(l,o))==null?void 0:i.set)??0)},e=(r,o)=>new p.MutationObserver((l,i)=>{l.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(v=>v===r&&(o({element:r}),i.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,o)=>new p.MutationObserver((l,i)=>l.forEach(c=>o({record:c,element:r}))).observe(r,{childList:!0}),n=r=>new Proxy(function(l,...i){var S;let[c,v]=Te(i),m=r?w.createElementNS(r,l):E(l);for(let[b,x]of Object.entries(c))if(b=="bauUpdate")m[b]=x;else if(!b.startsWith("bau")){let O=V(l,b,Ne(m))?P=>P!==void 0&&(m[b]=P):P=>m.setAttribute(b,Array.isArray(P)?P.filter(M=>M).join(" "):P);x==null||(ce(x)?a({deps:[x],render:()=>()=>(O(x.val),m)},!0):Ae(x)&&(!b.startsWith("on")||x.isDerived)?s(()=>(O(x({element:m})),m),!0):x.renderProp?a({deps:x.deps,render:()=>()=>(O(x.renderProp({element:m})(...x.deps.map(he))),m)},!0):O(x))}return c.bauChildMutated&&t(m,c.bauChildMutated),Y(m,v),m.autofocus&&m.focus&&p.requestAnimationFrame(()=>m.focus()),(S=c.bauCreated)==null||S.call(c,{element:m}),c.bauMounted&&p.requestAnimationFrame(()=>c.bauMounted({element:m})),c.bauUnmounted&&p.requestAnimationFrame(()=>e(m,c.bauUnmounted)),m},{get:(o,l)=>o.bind(void 0,l)}),f=(r,o,l,i)=>{r.element=D(l),r.isAttribute=i;for(let c of o.g)ce(c)&&(h.add(c),c.bindings.push(r));return r.element},s=(r,o)=>{let l={g:new Set,s:new Set},i=$(r,l,{});return f({renderInferred:r},l,i,o)},a=({deps:r,element:o,render:l,renderItem:i},c)=>f({deps:r,render:l,renderItem:i},{g:new Set(r),s:new Set},l({element:o,renderItem:i})(...r.map(he)),c),d=(r,o,l)=>a({deps:[r],render:({renderItem:i})=>c=>{for(let v=0;v<c.length;v++)o.appendChild(i(c[v],v));return o},renderItem:l});return{tags:n(),tagsNS:n,state:L,bind:a,loop:d,derive:q,stateSet:h}}const Ie=u=>{let p=0,w=11;for(;p<u.length;)w=101*w+u.charCodeAt(p++)>>>0;return"bau"+w},De=(u,p,w,N)=>{const h=u.createElement("style");h.id=w,h.append(N),(p??u.head).append(h)},Be=(u,p)=>u.reduce((w,N,h)=>w+N+(p[h]??""),"");function Le(u){let{document:p}=(u==null?void 0:u.window)??window;const w=N=>(h,...A)=>{const y=Be(h,A),E=Ie(y);return!p.getElementById(E)&&De(p,u==null?void 0:u.target,E,N(E,y)),E};return{css:w((N,h)=>`.${N} { ${h} }`),keyframes:w((N,h)=>`@keyframes ${N} { ${h} }`),createGlobalStyles:w((N,h)=>h)}}const xe=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Re=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Fe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ue=u=>`var(--color-${u})`,qe=u=>`var(--color-${u}-lightest)`,ze=()=>xe.map(([u])=>`
.outline.${u} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${u} {
  background-color: ${qe(u)};
}
.solid.${u} {
  background-color: ${Ue(u)};
}
`).join(`
`),Ge=()=>xe.map(([u])=>[`--color-${u}-s: var(--color-${u}-dark-s);`]).join(`
`),je=u=>100-u*10,He=()=>new Array(10).fill("").map((u,p)=>`--color-gray-${p*100}: hsl(0, 0%, ${je(p)}%);`).join(`
`),Se=({dark:u})=>new Array(10).fill("").map((p,w)=>`--color-emphasis-${w*100}: var(--color-gray-${u?1e3-w*100:w*100});`).join(`
`),Ye=([u,{h:p,s:w,l:N}])=>[`--color-${u}-h: ${p};`,`--color-${u}-l: ${N};`,`--color-${u}-base-s: ${w};`,`--color-${u}-s: var(--color-${u}-base-s);`,`--color-${u}-dark-s: calc(${w} - 25%);`,`--color-${u}-hsl: var(--color-${u}-h), var(--color-${u}-s), var(--color-${u}-l);`,`--color-${u}: hsl(var(--color-${u}-hsl));`,...Re.map(([h,A])=>`--color-${u}-${h}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${A}));`),...Fe.map(([h,A])=>`--color-${u}-${h}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${A}));`),`--color-${u}-contrast-background: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) / var(--contrast-background-value)));`,`--color-${u}-contrast-foreground: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * var(--contrast-foreground-value)));`].join(`
`);function We({createGlobalStyles:u},{colorPalette:p=xe}={}){u`
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
      ${p.map(([w,N])=>Ye([w,N])).join(`
`)}
      ${He()}
      ${Se({})}
      ${ze()}
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
      ${Ge()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Se({dark:!0})};
    }
  `}function Ve(u){const p=_e(),w=Le({target:window.document.getElementById("bau-css")});return We(w),{bau:p,...w,tr:N=>N,window,...u}}function Xe(u){const{bau:p,css:w}=u,{form:N,h1:h,input:A,label:y,button:E,p:$,footer:C}=p.tags,T=w`
    display: flex;
    flex-direction: column;
    & p {
      font-size: 0.9rem;
    }
  `;return({onsubmit:_})=>N({class:T,onsubmit:_},h("Personal Info"),$("Please provide your name, email address, and phone number."),y("Name",A({type:"text",name:"name",placeholder:"e.g Stephen King",required:!0})),y("Email Address",A({type:"email",required:!0,placeholder:"e.g stephenking@lorem.com"})),y("Phone Number",A({type:"text",required:!0,name:"phone",pattern:String.raw`\d*`,minLength:6,placeholder:"e.g. 1234567890"})),C(E({type:"submit"},"Next")))}const we=[{name:"Arcade",pricePerMonth:"9",image:"./assets/images/icon-arcade.svg"},{name:"Advanced",pricePerMonth:"12",image:"./assets/images/icon-advanced.svg"},{name:"Pro",pricePerMonth:"15",image:"./assets/images/icon-pro.svg"}];function Ke(u){const{bau:p,css:w}=u,{form:N,button:h,h1:A,p:y,input:E,footer:$,div:C,label:T,strong:_,small:U,img:j}=p.tags,R=w``,H=p.state(!1),L=q=>{H.val=q.target.checked},D=()=>C({class:w`
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 800px) {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
          }
          > label {
            flex-basis: 1;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            & input {
              width: 0px;
            }
            & p {
              line-height: 1.2rem;
            }
            & small {
              color: var(--font-color-secondary);
            }
          }
        `},we.map(({name:q,image:Y,pricePerMonth:W})=>T(E({type:"radio",name:"plan",value:q,required:!0}),j({src:Y,alt:""}),()=>C(y(_(q)),y(U(H.val?`$${Number(W)*10}/year`:`$${W}/mo`)),y(U(H.val&&"2 months free")))))),g=()=>T({class:w`
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--background-color-body);
          transition: all 0.3s;
          padding: 1rem;
          font-weight: bold;
          font-size: 0.9rem;
          &::before {
            content: "Monthly";
            color: var(--color-emphasis-900);
          }
          &::after {
            content: "Yearly";
            color: var(--color-emphasis-500);
          }
          &:has(input:checked) {
            &::before {
              color: var(--color-emphasis-500);
            }
            &::after {
              color: var(--color-emphasis-900);
            }
          }
          & input {
            margin-inline: 0.7rem;
          }
        `},E({type:"checkbox",name:"yearly",role:"switch",onchange:L}));return({onsubmit:q,onPrevious:Y})=>N({class:R,onsubmit:q},A("Select your plan"),y("You have the option of monthly or yearly billing."),D(),g(),$(h({type:"submit"},"Next Step"),h({type:"button",class:"plain",onclick:Y},"Go back")))}const Je="en-US",Qe="USD",be=u=>new Intl.NumberFormat(Je,{style:"currency",currency:Qe,maximumFractionDigits:0}).format(u),Pe=[{name:"Online service",description:"Access to multiplayer games",pricePerMonth:"1"},{name:"Larger storage",description:"Extra 1TB of cloud save",pricePerMonth:"2"},{name:"Customizable profile",description:"Custom theme on your profile",pricePerMonth:"3"}];function Ze(u){const{bau:p,css:w}=u,{form:N,h1:h,button:A,footer:y,p:E,div:$,label:C,input:T,strong:_,small:U,span:j}=p.tags,R=w``,H=()=>$({class:w`
          display: grid;
          gap: 1rem;
          & label {
            border: 1px solid var(--color-emphasis-200);
            border-radius: 0.5rem;
            padding-inline: 1rem;
            padding-block: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            cursor: pointer;
            & .info {
              flex-grow: 1;
            }
            & .price {
              font-weight: bold;
              font-size: 0.8rem;
              color: var(--Purplish);
            }
          }
        `},Pe.map(({name:L,description:D,pricePerMonth:g})=>C(T({type:"checkbox",role:"checkbox",name:"addons",value:L}),j({class:"info"},E(_(L)),U(D)),$({class:"price"},"+",be(Number(g)),"/mo"))));return({onsubmit:L,onPrevious:D})=>N({class:R,onsubmit:L},h("Pick add-ons"),E("Add-ons help enhance your gaming experience."),H(),y(A({type:"submit"},"Next"),A({type:"button",class:"plain",onclick:D},"Go back")))}var er=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,pe=Math.ceil,ee=Math.floor,Q="[BigNumber Error] ",Ee=Q+"Number primitive has more than 15 significant digits: ",te=1e14,k=14,ge=9007199254740991,me=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],se=1e7,z=1e9;function $e(u){var p,w,N,h=g.prototype={constructor:g,toString:null,valueOf:null},A=new g(1),y=20,E=4,$=-7,C=21,T=-1e7,_=1e7,U=!1,j=1,R=0,H={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},L="0123456789abcdefghijklmnopqrstuvwxyz",D=!0;function g(e,t){var n,f,s,a,d,r,o,l,i=this;if(!(i instanceof g))return new g(e,t);if(t==null){if(e&&e._isBigNumber===!0){i.s=e.s,!e.c||e.e>_?i.c=i.e=null:e.e<T?i.c=[i.e=0]:(i.e=e.e,i.c=e.c.slice());return}if((r=typeof e=="number")&&e*0==0){if(i.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,d=e;d>=10;d/=10,a++);a>_?i.c=i.e=null:(i.e=a,i.c=[e]);return}l=String(e)}else{if(!er.test(l=String(e)))return N(i,l,r);i.s=l.charCodeAt(0)==45?(l=l.slice(1),-1):1}(a=l.indexOf("."))>-1&&(l=l.replace(".","")),(d=l.search(/e/i))>0?(a<0&&(a=d),a+=+l.slice(d+1),l=l.substring(0,d)):a<0&&(a=l.length)}else{if(I(t,2,L.length,"Base"),t==10&&D)return i=new g(e),F(i,y+i.e+1,E);if(l=String(e),r=typeof e=="number"){if(e*0!=0)return N(i,l,r,t);if(i.s=1/e<0?(l=l.slice(1),-1):1,g.DEBUG&&l.replace(/^0\.0*|\./,"").length>15)throw Error(Ee+e)}else i.s=l.charCodeAt(0)===45?(l=l.slice(1),-1):1;for(n=L.slice(0,t),a=d=0,o=l.length;d<o;d++)if(n.indexOf(f=l.charAt(d))<0){if(f=="."){if(d>a){a=o;continue}}else if(!s&&(l==l.toUpperCase()&&(l=l.toLowerCase())||l==l.toLowerCase()&&(l=l.toUpperCase()))){s=!0,d=-1,a=0;continue}return N(i,String(e),r,t)}r=!1,l=w(l,t,10,i.s),(a=l.indexOf("."))>-1?l=l.replace(".",""):a=l.length}for(d=0;l.charCodeAt(d)===48;d++);for(o=l.length;l.charCodeAt(--o)===48;);if(l=l.slice(d,++o)){if(o-=d,r&&g.DEBUG&&o>15&&(e>ge||e!==ee(e)))throw Error(Ee+i.s*e);if((a=a-d-1)>_)i.c=i.e=null;else if(a<T)i.c=[i.e=0];else{if(i.e=a,i.c=[],d=(a+1)%k,a<0&&(d+=k),d<o){for(d&&i.c.push(+l.slice(0,d)),o-=k;d<o;)i.c.push(+l.slice(d,d+=k));d=k-(l=l.slice(d)).length}else d-=o;for(;d--;l+="0");i.c.push(+l)}}else i.c=[i.e=0]}g.clone=$e,g.ROUND_UP=0,g.ROUND_DOWN=1,g.ROUND_CEIL=2,g.ROUND_FLOOR=3,g.ROUND_HALF_UP=4,g.ROUND_HALF_DOWN=5,g.ROUND_HALF_EVEN=6,g.ROUND_HALF_CEIL=7,g.ROUND_HALF_FLOOR=8,g.EUCLID=9,g.config=g.set=function(e){var t,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(n=e[t],I(n,0,z,t),y=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(n=e[t],I(n,0,8,t),E=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(n=e[t],n&&n.pop?(I(n[0],-z,0,t),I(n[1],0,z,t),$=n[0],C=n[1]):(I(n,-z,z,t),$=-(C=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if(n=e[t],n&&n.pop)I(n[0],-z,-1,t),I(n[1],1,z,t),T=n[0],_=n[1];else if(I(n,-z,z,t),n)T=-(_=n<0?-n:n);else throw Error(Q+t+" cannot be zero: "+n);if(e.hasOwnProperty(t="CRYPTO"))if(n=e[t],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))U=n;else throw U=!n,Error(Q+"crypto unavailable");else U=n;else throw Error(Q+t+" not true or false: "+n);if(e.hasOwnProperty(t="MODULO_MODE")&&(n=e[t],I(n,0,9,t),j=n),e.hasOwnProperty(t="POW_PRECISION")&&(n=e[t],I(n,0,z,t),R=n),e.hasOwnProperty(t="FORMAT"))if(n=e[t],typeof n=="object")H=n;else throw Error(Q+t+" not an object: "+n);if(e.hasOwnProperty(t="ALPHABET"))if(n=e[t],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))D=n.slice(0,10)=="0123456789",L=n;else throw Error(Q+t+" invalid: "+n)}else throw Error(Q+"Object expected: "+e);return{DECIMAL_PLACES:y,ROUNDING_MODE:E,EXPONENTIAL_AT:[$,C],RANGE:[T,_],CRYPTO:U,MODULO_MODE:j,POW_PRECISION:R,FORMAT:H,ALPHABET:L}},g.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!g.DEBUG)return!0;var t,n,f=e.c,s=e.e,a=e.s;e:if({}.toString.call(f)=="[object Array]"){if((a===1||a===-1)&&s>=-z&&s<=z&&s===ee(s)){if(f[0]===0){if(s===0&&f.length===1)return!0;break e}if(t=(s+1)%k,t<1&&(t+=k),String(f[0]).length==t){for(t=0;t<f.length;t++)if(n=f[t],n<0||n>=te||n!==ee(n))break e;if(n!==0)return!0}}}else if(f===null&&s===null&&(a===null||a===1||a===-1))return!0;throw Error(Q+"Invalid BigNumber: "+e)},g.maximum=g.max=function(){return Y(arguments,-1)},g.minimum=g.min=function(){return Y(arguments,1)},g.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return ee(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var f,s,a,d,r,o=0,l=[],i=new g(A);if(n==null?n=y:I(n,0,z),d=pe(n/k),U)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(d*=2));o<d;)r=f[o]*131072+(f[o+1]>>>11),r>=9e15?(s=crypto.getRandomValues(new Uint32Array(2)),f[o]=s[0],f[o+1]=s[1]):(l.push(r%1e14),o+=2);o=d/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(d*=7);o<d;)r=(f[o]&31)*281474976710656+f[o+1]*1099511627776+f[o+2]*4294967296+f[o+3]*16777216+(f[o+4]<<16)+(f[o+5]<<8)+f[o+6],r>=9e15?crypto.randomBytes(7).copy(f,o):(l.push(r%1e14),o+=7);o=d/7}else throw U=!1,Error(Q+"crypto unavailable");if(!U)for(;o<d;)r=t(),r<9e15&&(l[o++]=r%1e14);for(d=l[--o],n%=k,d&&n&&(r=me[k-n],l[o]=ee(d/r)*r);l[o]===0;l.pop(),o--);if(o<0)l=[a=0];else{for(a=-1;l[0]===0;l.splice(0,1),a-=k);for(o=1,r=l[0];r>=10;r/=10,o++);o<k&&(a-=k-o)}return i.e=a,i.c=l,i}}(),g.sum=function(){for(var e=1,t=arguments,n=new g(t[0]);e<t.length;)n=n.plus(t[e++]);return n},w=function(){var e="0123456789";function t(n,f,s,a){for(var d,r=[0],o,l=0,i=n.length;l<i;){for(o=r.length;o--;r[o]*=f);for(r[0]+=a.indexOf(n.charAt(l++)),d=0;d<r.length;d++)r[d]>s-1&&(r[d+1]==null&&(r[d+1]=0),r[d+1]+=r[d]/s|0,r[d]%=s)}return r.reverse()}return function(n,f,s,a,d){var r,o,l,i,c,v,m,S,b=n.indexOf("."),x=y,O=E;for(b>=0&&(i=R,R=0,n=n.replace(".",""),S=new g(f),v=S.pow(n.length-b),R=i,S.c=t(le(Z(v.c),v.e,"0"),10,s,e),S.e=S.c.length),m=t(n,f,s,d?(r=L,e):(r=e,L)),l=i=m.length;m[--i]==0;m.pop());if(!m[0])return r.charAt(0);if(b<0?--l:(v.c=m,v.e=l,v.s=a,v=p(v,S,x,O,s),m=v.c,c=v.r,l=v.e),o=l+x+1,b=m[o],i=s/2,c=c||o<0||m[o+1]!=null,c=O<4?(b!=null||c)&&(O==0||O==(v.s<0?3:2)):b>i||b==i&&(O==4||c||O==6&&m[o-1]&1||O==(v.s<0?8:7)),o<1||!m[0])n=c?le(r.charAt(1),-x,r.charAt(0)):r.charAt(0);else{if(m.length=o,c)for(--s;++m[--o]>s;)m[o]=0,o||(++l,m=[1].concat(m));for(i=m.length;!m[--i];);for(b=0,n="";b<=i;n+=r.charAt(m[b++]));n=le(n,l,r.charAt(0))}return n}}(),p=function(){function e(f,s,a){var d,r,o,l,i=0,c=f.length,v=s%se,m=s/se|0;for(f=f.slice();c--;)o=f[c]%se,l=f[c]/se|0,d=m*o+l*v,r=v*o+d%se*se+i,i=(r/a|0)+(d/se|0)+m*l,f[c]=r%a;return i&&(f=[i].concat(f)),f}function t(f,s,a,d){var r,o;if(a!=d)o=a>d?1:-1;else for(r=o=0;r<a;r++)if(f[r]!=s[r]){o=f[r]>s[r]?1:-1;break}return o}function n(f,s,a,d){for(var r=0;a--;)f[a]-=r,r=f[a]<s[a]?1:0,f[a]=r*d+f[a]-s[a];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,s,a,d,r){var o,l,i,c,v,m,S,b,x,O,P,M,oe,ne,ie,X,K,G=f.s==s.s?1:-1,J=f.c,B=s.c;if(!J||!J[0]||!B||!B[0])return new g(!f.s||!s.s||(J?B&&J[0]==B[0]:!B)?NaN:J&&J[0]==0||!B?G*0:G/0);for(b=new g(G),x=b.c=[],l=f.e-s.e,G=a+l+1,r||(r=te,l=re(f.e/k)-re(s.e/k),G=G/k|0),i=0;B[i]==(J[i]||0);i++);if(B[i]>(J[i]||0)&&l--,G<0)x.push(1),c=!0;else{for(ne=J.length,X=B.length,i=0,G+=2,v=ee(r/(B[0]+1)),v>1&&(B=e(B,v,r),J=e(J,v,r),X=B.length,ne=J.length),oe=X,O=J.slice(0,X),P=O.length;P<X;O[P++]=0);K=B.slice(),K=[0].concat(K),ie=B[0],B[1]>=r/2&&ie++;do{if(v=0,o=t(B,O,X,P),o<0){if(M=O[0],X!=P&&(M=M*r+(O[1]||0)),v=ee(M/ie),v>1)for(v>=r&&(v=r-1),m=e(B,v,r),S=m.length,P=O.length;t(m,O,S,P)==1;)v--,n(m,X<S?K:B,S,r),S=m.length,o=1;else v==0&&(o=v=1),m=B.slice(),S=m.length;if(S<P&&(m=[0].concat(m)),n(O,m,P,r),P=O.length,o==-1)for(;t(B,O,X,P)<1;)v++,n(O,X<P?K:B,P,r),P=O.length}else o===0&&(v++,O=[0]);x[i++]=v,O[0]?O[P++]=J[oe]||0:(O=[J[oe]],P=1)}while((oe++<ne||O[0]!=null)&&G--);c=O[0]!=null,x[0]||x.splice(0,1)}if(r==te){for(i=1,G=x[0];G>=10;G/=10,i++);F(b,a+(b.e=i+l*k-1)+1,d,c)}else b.e=l,b.r=+c;return b}}();function q(e,t,n,f){var s,a,d,r,o;if(n==null?n=E:I(n,0,8),!e.c)return e.toString();if(s=e.c[0],d=e.e,t==null)o=Z(e.c),o=f==1||f==2&&(d<=$||d>=C)?ue(o,d):le(o,d,"0");else if(e=F(new g(e),t,n),a=e.e,o=Z(e.c),r=o.length,f==1||f==2&&(t<=a||a<=$)){for(;r<t;o+="0",r++);o=ue(o,a)}else if(t-=d,o=le(o,a,"0"),a+1>r){if(--t>0)for(o+=".";t--;o+="0");}else if(t+=a-r,t>0)for(a+1==r&&(o+=".");t--;o+="0");return e.s<0&&s?"-"+o:o}function Y(e,t){for(var n,f,s=1,a=new g(e[0]);s<e.length;s++)f=new g(e[s]),(!f.s||(n=ae(a,f))===t||n===0&&a.s===t)&&(a=f);return a}function W(e,t,n){for(var f=1,s=t.length;!t[--s];t.pop());for(s=t[0];s>=10;s/=10,f++);return(n=f+n*k-1)>_?e.c=e.e=null:n<T?e.c=[e.e=0]:(e.e=n,e.c=t),e}N=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,n=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,s=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(a,d,r,o){var l,i=r?d:d.replace(s,"");if(f.test(i))a.s=isNaN(i)?null:i<0?-1:1;else{if(!r&&(i=i.replace(e,function(c,v,m){return l=(m=m.toLowerCase())=="x"?16:m=="b"?2:8,!o||o==l?v:c}),o&&(l=o,i=i.replace(t,"$1").replace(n,"0.$1")),d!=i))return new g(i,l);if(g.DEBUG)throw Error(Q+"Not a"+(o?" base "+o:"")+" number: "+d);a.s=null}a.c=a.e=null}}();function F(e,t,n,f){var s,a,d,r,o,l,i,c=e.c,v=me;if(c){e:{for(s=1,r=c[0];r>=10;r/=10,s++);if(a=t-s,a<0)a+=k,d=t,o=c[l=0],i=ee(o/v[s-d-1]%10);else if(l=pe((a+1)/k),l>=c.length)if(f){for(;c.length<=l;c.push(0));o=i=0,s=1,a%=k,d=a-k+1}else break e;else{for(o=r=c[l],s=1;r>=10;r/=10,s++);a%=k,d=a-k+s,i=d<0?0:ee(o/v[s-d-1]%10)}if(f=f||t<0||c[l+1]!=null||(d<0?o:o%v[s-d-1]),f=n<4?(i||f)&&(n==0||n==(e.s<0?3:2)):i>5||i==5&&(n==4||f||n==6&&(a>0?d>0?o/v[s-d]:0:c[l-1])%10&1||n==(e.s<0?8:7)),t<1||!c[0])return c.length=0,f?(t-=e.e+1,c[0]=v[(k-t%k)%k],e.e=-t||0):c[0]=e.e=0,e;if(a==0?(c.length=l,r=1,l--):(c.length=l+1,r=v[k-a],c[l]=d>0?ee(o/v[s-d]%v[d])*r:0),f)for(;;)if(l==0){for(a=1,d=c[0];d>=10;d/=10,a++);for(d=c[0]+=r,r=1;d>=10;d/=10,r++);a!=r&&(e.e++,c[0]==te&&(c[0]=1));break}else{if(c[l]+=r,c[l]!=te)break;c[l--]=0,r=1}for(a=c.length;c[--a]===0;c.pop());}e.e>_?e.c=e.e=null:e.e<T&&(e.c=[e.e=0])}return e}function V(e){var t,n=e.e;return n===null?e.toString():(t=Z(e.c),t=n<=$||n>=C?ue(t,n):le(t,n,"0"),e.s<0?"-"+t:t)}return h.absoluteValue=h.abs=function(){var e=new g(this);return e.s<0&&(e.s=1),e},h.comparedTo=function(e,t){return ae(this,new g(e,t))},h.decimalPlaces=h.dp=function(e,t){var n,f,s,a=this;if(e!=null)return I(e,0,z),t==null?t=E:I(t,0,8),F(new g(a),e+a.e+1,t);if(!(n=a.c))return null;if(f=((s=n.length-1)-re(this.e/k))*k,s=n[s])for(;s%10==0;s/=10,f--);return f<0&&(f=0),f},h.dividedBy=h.div=function(e,t){return p(this,new g(e,t),y,E)},h.dividedToIntegerBy=h.idiv=function(e,t){return p(this,new g(e,t),0,1)},h.exponentiatedBy=h.pow=function(e,t){var n,f,s,a,d,r,o,l,i,c=this;if(e=new g(e),e.c&&!e.isInteger())throw Error(Q+"Exponent not an integer: "+V(e));if(t!=null&&(t=new g(t)),r=e.e>14,!c.c||!c.c[0]||c.c[0]==1&&!c.e&&c.c.length==1||!e.c||!e.c[0])return i=new g(Math.pow(+V(c),r?e.s*(2-fe(e)):+V(e))),t?i.mod(t):i;if(o=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new g(NaN);f=!o&&c.isInteger()&&t.isInteger(),f&&(c=c.mod(t))}else{if(e.e>9&&(c.e>0||c.e<-1||(c.e==0?c.c[0]>1||r&&c.c[1]>=24e7:c.c[0]<8e13||r&&c.c[0]<=9999975e7)))return a=c.s<0&&fe(e)?-0:0,c.e>-1&&(a=1/a),new g(o?1/a:a);R&&(a=pe(R/k+2))}for(r?(n=new g(.5),o&&(e.s=1),l=fe(e)):(s=Math.abs(+V(e)),l=s%2),i=new g(A);;){if(l){if(i=i.times(c),!i.c)break;a?i.c.length>a&&(i.c.length=a):f&&(i=i.mod(t))}if(s){if(s=ee(s/2),s===0)break;l=s%2}else if(e=e.times(n),F(e,e.e+1,1),e.e>14)l=fe(e);else{if(s=+V(e),s===0)break;l=s%2}c=c.times(c),a?c.c&&c.c.length>a&&(c.c.length=a):f&&(c=c.mod(t))}return f?i:(o&&(i=A.div(i)),t?i.mod(t):a?F(i,R,E,d):i)},h.integerValue=function(e){var t=new g(this);return e==null?e=E:I(e,0,8),F(t,t.e+1,e)},h.isEqualTo=h.eq=function(e,t){return ae(this,new g(e,t))===0},h.isFinite=function(){return!!this.c},h.isGreaterThan=h.gt=function(e,t){return ae(this,new g(e,t))>0},h.isGreaterThanOrEqualTo=h.gte=function(e,t){return(t=ae(this,new g(e,t)))===1||t===0},h.isInteger=function(){return!!this.c&&re(this.e/k)>this.c.length-2},h.isLessThan=h.lt=function(e,t){return ae(this,new g(e,t))<0},h.isLessThanOrEqualTo=h.lte=function(e,t){return(t=ae(this,new g(e,t)))===-1||t===0},h.isNaN=function(){return!this.s},h.isNegative=function(){return this.s<0},h.isPositive=function(){return this.s>0},h.isZero=function(){return!!this.c&&this.c[0]==0},h.minus=function(e,t){var n,f,s,a,d=this,r=d.s;if(e=new g(e,t),t=e.s,!r||!t)return new g(NaN);if(r!=t)return e.s=-t,d.plus(e);var o=d.e/k,l=e.e/k,i=d.c,c=e.c;if(!o||!l){if(!i||!c)return i?(e.s=-t,e):new g(c?d:NaN);if(!i[0]||!c[0])return c[0]?(e.s=-t,e):new g(i[0]?d:E==3?-0:0)}if(o=re(o),l=re(l),i=i.slice(),r=o-l){for((a=r<0)?(r=-r,s=i):(l=o,s=c),s.reverse(),t=r;t--;s.push(0));s.reverse()}else for(f=(a=(r=i.length)<(t=c.length))?r:t,r=t=0;t<f;t++)if(i[t]!=c[t]){a=i[t]<c[t];break}if(a&&(s=i,i=c,c=s,e.s=-e.s),t=(f=c.length)-(n=i.length),t>0)for(;t--;i[n++]=0);for(t=te-1;f>r;){if(i[--f]<c[f]){for(n=f;n&&!i[--n];i[n]=t);--i[n],i[f]+=te}i[f]-=c[f]}for(;i[0]==0;i.splice(0,1),--l);return i[0]?W(e,i,l):(e.s=E==3?-1:1,e.c=[e.e=0],e)},h.modulo=h.mod=function(e,t){var n,f,s=this;return e=new g(e,t),!s.c||!e.s||e.c&&!e.c[0]?new g(NaN):!e.c||s.c&&!s.c[0]?new g(s):(j==9?(f=e.s,e.s=1,n=p(s,e,0,3),e.s=f,n.s*=f):n=p(s,e,0,j),e=s.minus(n.times(e)),!e.c[0]&&j==1&&(e.s=s.s),e)},h.multipliedBy=h.times=function(e,t){var n,f,s,a,d,r,o,l,i,c,v,m,S,b,x,O=this,P=O.c,M=(e=new g(e,t)).c;if(!P||!M||!P[0]||!M[0])return!O.s||!e.s||P&&!P[0]&&!M||M&&!M[0]&&!P?e.c=e.e=e.s=null:(e.s*=O.s,!P||!M?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=re(O.e/k)+re(e.e/k),e.s*=O.s,o=P.length,c=M.length,o<c&&(S=P,P=M,M=S,s=o,o=c,c=s),s=o+c,S=[];s--;S.push(0));for(b=te,x=se,s=c;--s>=0;){for(n=0,v=M[s]%x,m=M[s]/x|0,d=o,a=s+d;a>s;)l=P[--d]%x,i=P[d]/x|0,r=m*l+i*v,l=v*l+r%x*x+S[a]+n,n=(l/b|0)+(r/x|0)+m*i,S[a--]=l%b;S[a]=n}return n?++f:S.splice(0,1),W(e,S,f)},h.negated=function(){var e=new g(this);return e.s=-e.s||null,e},h.plus=function(e,t){var n,f=this,s=f.s;if(e=new g(e,t),t=e.s,!s||!t)return new g(NaN);if(s!=t)return e.s=-t,f.minus(e);var a=f.e/k,d=e.e/k,r=f.c,o=e.c;if(!a||!d){if(!r||!o)return new g(s/0);if(!r[0]||!o[0])return o[0]?e:new g(r[0]?f:s*0)}if(a=re(a),d=re(d),r=r.slice(),s=a-d){for(s>0?(d=a,n=o):(s=-s,n=r),n.reverse();s--;n.push(0));n.reverse()}for(s=r.length,t=o.length,s-t<0&&(n=o,o=r,r=n,t=s),s=0;t;)s=(r[--t]=r[t]+o[t]+s)/te|0,r[t]=te===r[t]?0:r[t]%te;return s&&(r=[s].concat(r),++d),W(e,r,d)},h.precision=h.sd=function(e,t){var n,f,s,a=this;if(e!=null&&e!==!!e)return I(e,1,z),t==null?t=E:I(t,0,8),F(new g(a),e,t);if(!(n=a.c))return null;if(s=n.length-1,f=s*k+1,s=n[s]){for(;s%10==0;s/=10,f--);for(s=n[0];s>=10;s/=10,f++);}return e&&a.e+1>f&&(f=a.e+1),f},h.shiftedBy=function(e){return I(e,-ge,ge),this.times("1e"+e)},h.squareRoot=h.sqrt=function(){var e,t,n,f,s,a=this,d=a.c,r=a.s,o=a.e,l=y+4,i=new g("0.5");if(r!==1||!d||!d[0])return new g(!r||r<0&&(!d||d[0])?NaN:d?a:1/0);if(r=Math.sqrt(+V(a)),r==0||r==1/0?(t=Z(d),(t.length+o)%2==0&&(t+="0"),r=Math.sqrt(+t),o=re((o+1)/2)-(o<0||o%2),r==1/0?t="5e"+o:(t=r.toExponential(),t=t.slice(0,t.indexOf("e")+1)+o),n=new g(t)):n=new g(r+""),n.c[0]){for(o=n.e,r=o+l,r<3&&(r=0);;)if(s=n,n=i.times(s.plus(p(a,s,l,1))),Z(s.c).slice(0,r)===(t=Z(n.c)).slice(0,r))if(n.e<o&&--r,t=t.slice(r-3,r+1),t=="9999"||!f&&t=="4999"){if(!f&&(F(s,s.e+y+2,0),s.times(s).eq(a))){n=s;break}l+=4,r+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(F(n,n.e+y+2,1),e=!n.times(n).eq(a));break}}return F(n,n.e+y+1,E,e)},h.toExponential=function(e,t){return e!=null&&(I(e,0,z),e++),q(this,e,t,1)},h.toFixed=function(e,t){return e!=null&&(I(e,0,z),e=e+this.e+1),q(this,e,t)},h.toFormat=function(e,t,n){var f,s=this;if(n==null)e!=null&&t&&typeof t=="object"?(n=t,t=null):e&&typeof e=="object"?(n=e,e=t=null):n=H;else if(typeof n!="object")throw Error(Q+"Argument not an object: "+n);if(f=s.toFixed(e,t),s.c){var a,d=f.split("."),r=+n.groupSize,o=+n.secondaryGroupSize,l=n.groupSeparator||"",i=d[0],c=d[1],v=s.s<0,m=v?i.slice(1):i,S=m.length;if(o&&(a=r,r=o,o=a,S-=a),r>0&&S>0){for(a=S%r||r,i=m.substr(0,a);a<S;a+=r)i+=l+m.substr(a,r);o>0&&(i+=l+m.slice(a)),v&&(i="-"+i)}f=c?i+(n.decimalSeparator||"")+((o=+n.fractionGroupSize)?c.replace(new RegExp("\\d{"+o+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):c):i}return(n.prefix||"")+f+(n.suffix||"")},h.toFraction=function(e){var t,n,f,s,a,d,r,o,l,i,c,v,m=this,S=m.c;if(e!=null&&(r=new g(e),!r.isInteger()&&(r.c||r.s!==1)||r.lt(A)))throw Error(Q+"Argument "+(r.isInteger()?"out of range: ":"not an integer: ")+V(r));if(!S)return new g(m);for(t=new g(A),l=n=new g(A),f=o=new g(A),v=Z(S),a=t.e=v.length-m.e-1,t.c[0]=me[(d=a%k)<0?k+d:d],e=!e||r.comparedTo(t)>0?a>0?t:l:r,d=_,_=1/0,r=new g(v),o.c[0]=0;i=p(r,t,0,1),s=n.plus(i.times(f)),s.comparedTo(e)!=1;)n=f,f=s,l=o.plus(i.times(s=l)),o=s,t=r.minus(i.times(s=t)),r=s;return s=p(e.minus(n),f,0,1),o=o.plus(s.times(l)),n=n.plus(s.times(f)),o.s=l.s=m.s,a=a*2,c=p(l,f,a,E).minus(m).abs().comparedTo(p(o,n,a,E).minus(m).abs())<1?[l,f]:[o,n],_=d,c},h.toNumber=function(){return+V(this)},h.toPrecision=function(e,t){return e!=null&&I(e,1,z),q(this,e,t,2)},h.toString=function(e){var t,n=this,f=n.s,s=n.e;return s===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=s<=$||s>=C?ue(Z(n.c),s):le(Z(n.c),s,"0"):e===10&&D?(n=F(new g(n),y+s+1,E),t=le(Z(n.c),n.e,"0")):(I(e,2,L.length,"Base"),t=w(le(Z(n.c),s,"0"),10,e,f,!0)),f<0&&n.c[0]&&(t="-"+t)),t},h.valueOf=h.toJSON=function(){return V(this)},h._isBigNumber=!0,h[Symbol.toStringTag]="BigNumber",h[Symbol.for("nodejs.util.inspect.custom")]=h.valueOf,u!=null&&g.set(u),g}function re(u){var p=u|0;return u>0||u===p?p:p-1}function Z(u){for(var p,w,N=1,h=u.length,A=u[0]+"";N<h;){for(p=u[N++]+"",w=k-p.length;w--;p="0"+p);A+=p}for(h=A.length;A.charCodeAt(--h)===48;);return A.slice(0,h+1||1)}function ae(u,p){var w,N,h=u.c,A=p.c,y=u.s,E=p.s,$=u.e,C=p.e;if(!y||!E)return null;if(w=h&&!h[0],N=A&&!A[0],w||N)return w?N?0:-E:y;if(y!=E)return y;if(w=y<0,N=$==C,!h||!A)return N?0:!h^w?1:-1;if(!N)return $>C^w?1:-1;for(E=($=h.length)<(C=A.length)?$:C,y=0;y<E;y++)if(h[y]!=A[y])return h[y]>A[y]^w?1:-1;return $==C?0:$>C^w?1:-1}function I(u,p,w,N){if(u<p||u>w||u!==ee(u))throw Error(Q+(N||"Argument")+(typeof u=="number"?u<p||u>w?" out of range: ":" not an integer: ":" not a primitive number: ")+String(u))}function fe(u){var p=u.c.length-1;return re(u.e/k)==p&&u.c[p]%2!=0}function ue(u,p){return(u.length>1?u.charAt(0)+"."+u.slice(1):u)+(p<0?"e":"e+")+p}function le(u,p,w){var N,h;if(p<0){for(h=w+".";++p;h+=w);u=h+u}else if(N=u.length,++p>N){for(h=w,p-=N;--p;h+=w);u+=h}else p<N&&(u=u.slice(0,p)+"."+u.slice(p));return u}var ve=$e();function rr(u,{plan:p,isPerYear:w,addons:N}){const{bau:h,css:A}=u,{form:y,h1:E,p:$,img:C,button:T,footer:_,table:U,tbody:j,thead:R,th:H,tr:L,td:D,a:g,small:q,strong:Y}=h.tags,W=s=>w.val?`${be(ve(s).times(10).toNumber())}/year`:`${be(Number(s))}/mo`,F=h.derive(()=>{const s=N.val.reduce((d,{pricePerMonth:r})=>d.plus(r),ve(0)),a=ve(p.val.pricePerMonth).plus(s).toString();return W(a)}),V=A`
    padding: 2rem;
    > table {
      & a {
        color: var(--font-color-secondary);
        font-weight: 400;
        font-size: 0.85rem;
      }
      background-color: var(--background-color-body);
      border-collapse: collapse;
      & th,
      & td {
        padding-inline: 1rem;
        padding-block: 0.5rem;
      }
      & td {
        text-align: right;
      }
      & thead {
        border-bottom: 1px solid var(--color-emphasis-100);
        & td {
          font-weight: bold;
        }
      }
      & tbody {
        padding: 0.5rem;
        & th {
          color: var(--font-color-secondary);
          font-weight: 400;
          font-size: 0.9rem;
        }
        & td {
          font-size: 0.8rem;
        }
      }
    }
    .total {
      padding-inline: 1rem;
      padding-block: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
  `,e=()=>{f.val=!0},t=({onPrevious:s,onChangePlan:a})=>y({class:V},E("Finishing up"),$("Double-check everything looks OK before confirming."),U(()=>R(H($(p.val.name," (",()=>w.val?"Yearly":"Monthly",")"),g({href:"#?step=2",onclick:a},"change")),D(W(p.val.pricePerMonth))),h.loop(N,j(),({name:d,pricePerMonth:r})=>L(H(d),D(W(r))))),$({class:"total"},q("Total (",()=>w.val?"per year":"per month",")"),Y(F)),_(T({type:"submit",onclick:e},"Confirm"),T({type:"button",class:"plain",onclick:s},"Go back"))),n=()=>y({class:A`
          align-items: center;
          padding: 2rem;
        `},C({src:"./assets/images/icon-thank-you.svg",height:50,width:50}),E("Thank you!"),$("Thanks for confirming your subscription!We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.")),f=h.state(!1);return({onPrevious:s,onChangePlan:a})=>()=>f.val?n():t({onPrevious:s,onChangePlan:a})}function tr(u){const{bau:p,css:w}=u,{article:N,div:h,header:A,ul:y,li:E}=p.tags,$=p.state(1),C=p.state(we[0]),T=p.state(!1),_=p.state([]),U=Xe(u),j=Ke(u),R=Ze(u),H=rr(u,{plan:C,isPerYear:T,addons:_}),L=w`
    max-width: 1000px;
    min-height: 500px;
    background-color: var(--background-color);
    display: flex;
    margin: 1rem;
    gap: 0.6rem;
    border-radius: 0.6rem;
    padding: 1rem;
    @media (max-width: 600px) {
      flex-direction: column;
      padding: 0rem;
      margin: 0rem;
      border-radius: 0px;
    }
    & header {
      background-image: url("./assets/images/bg-sidebar-desktop.svg");
      background-size: cover;
      flex-shrink: 0;
      min-height: 10rem;
      @media (max-width: 600px) {
        background-image: url("./assets/images/bg-sidebar-mobile.svg");
      }
      > ul {
        display: flex;
        flex-direction: column;
        @media (max-width: 600px) {
          flex-direction: row;
          justify-content: space-around;
        }
        gap: 1rem;
        padding-inline: 2rem;
        padding-block: 2.4rem;

        > li {
          &.active {
            .step-number {
              background-color: var(--pastel-blue);
              color: var(--font-color);
            }
          }
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--font-color-inverse);

          .step-number {
            font-weight: bold;
            padding: 1rem;
            border: 1px solid var(--pastel-blue);
            border-radius: 100%;
            width: 2rem;
            height: 2rem;
            display: grid;
            place-content: center;
          }
          .step-labels {
            @media (max-width: 600px) {
              display: none;
            }
            .step-label {
              text-transform: uppercase;
              font-size: smaller;
              color: var(--font-color-inverse-secondary);
              font-size: 0.875rem;
            }
            .label {
              text-transform: uppercase;
              font-weight: 500;
              font-size: 0.875rem;
            }
          }
        }
      }
    }
    & ul.content {
      @media (max-width: 600px) {
        margin-top: -5rem;
      }
      background-color: var(--background-color);
      margin-inline: 2rem;
      border-radius: 0.6rem;

      > li {
        display: none;
        height: 100%;
        &.active {
          display: flex;
        }
        & form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          padding-inline: 1.5rem;
          padding-block: 2rem;
          max-width: 500px;

          & h1 + p,
          small {
            color: var(--font-color-secondary);
          }
        }
      }
    }
    & footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      flex-grow: 1;
      align-items: flex-end;
    }
  `,D=n=>$.val==n,g=({index:n,label:f})=>E({class:()=>D(n)&&"active"},h({class:"step-number"},n),h({class:"step-labels"},h({class:"step-label"},"Step ",n),h({class:"label"},f))),q=()=>{$.val++},Y=()=>{$.val--},W=n=>{n.preventDefault();const f=Object.fromEntries(new FormData(n.currentTarget));console.log(f),q()},F=n=>{n.preventDefault();const f=Object.fromEntries(new FormData(n.currentTarget)),s=we.find(({name:a})=>a==String(f.plan));s&&(C.val=s),T.val=!!f.yearly,q()},V=n=>{n.preventDefault();const f=[...n.currentTarget.querySelectorAll('input[name="addons"]:checked')].map(({value:s})=>s);_.val=Pe.filter(({name:s})=>f.includes(s)),q()},e=()=>{$.val=2},t=[{label:"Your Info",Content:()=>U({onsubmit:W})},{label:"Select Plan",Content:({})=>j({onsubmit:F,onPrevious:Y})},{label:"Add on",Content:({})=>R({onsubmit:V,onPrevious:Y})},{label:"Summary",Content:({})=>H({onPrevious:Y,onChangePlan:e})}];return()=>N({class:L},A(y(t.map(({label:n},f)=>g({index:f+1,label:n})))),y({class:"content"},t.map(({Content:n},f)=>E({class:()=>D(f+1)&&"active"},n({})))))}const nr=Ve(),or=u=>{const{bau:p}=u,{main:w}=p.tags,N=tr(u);return function(){return w(N())}},ir=or(nr);var ke;(ke=document.getElementById("app"))==null||ke.replaceChildren(ir());
