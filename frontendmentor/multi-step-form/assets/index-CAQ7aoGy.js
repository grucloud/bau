(function(){const g=document.createElement("link").relList;if(g&&g.supports&&g.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))A(h);new MutationObserver(h=>{for(const N of h)if(N.type==="childList")for(const O of N.addedNodes)O.tagName==="LINK"&&O.rel==="modulepreload"&&A(O)}).observe(document,{childList:!0,subtree:!0});function w(h){const N={};return h.integrity&&(N.integrity=h.integrity),h.referrerPolicy&&(N.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?N.credentials="include":h.crossOrigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function A(h){if(h.ep)return;h.ep=!0;const N=w(h);fetch(h.href,N)}})();let ye=f=>Object.prototype.toString.call(f??0).slice(8,-1),Ce=f=>ye(f)=="Object",Ae=f=>ye(f)=="Function",de=f=>["Object","Array"].includes(ye(f)),Ne=Object.getPrototypeOf,he=f=>ce(f)?f.val:f,Oe=f=>Array.isArray(f)?f:[f],ce=f=>f==null?void 0:f.__isState,Me=["splice","push","pop","shift","unshift","sort","reverse"];const _e=f=>!ce(f[0])&&Ce(f[0])?[f[0],f.slice(1)]:[{},f];function Ie(f){let g=window,{document:w}=g,A,h=new Set,N=new Set,O=!1,E,$=r=>w.createElement(r),C=(r,o,i)=>{let u=E;E=o;let p=r(i);return E=u,p},D=()=>{A||(A=g.requestAnimationFrame(()=>{h.forEach(r=>{r.bindings=r.bindings.filter(({element:o})=>{var i;return(i=Array.isArray(o)?o[0]:o)==null?void 0:i.isConnected}),!r.bindings.length&&!r.computed&&h.delete(r)}),A=void 0}))},M=(r,o,i,u,p,b)=>{var x;if(O){N.add([r,o,i,u,p,b]);return}for(let P of r.bindings){let{deps:y,element:v,renderInferred:S,render:_,renderItem:Y,isAttribute:se}=P;if(Y&&o)(x=q(v,u,(...ne)=>I(Y(...ne)),i,p,b)[o])==null||x.call();else{let ne=S?S({element:v}):_({element:v,renderItem:Y})(...y.map(he));if(ne!==v&&!se){let V=Oe(P.element=I(ne)),oe=Oe(v),B=0;for(;B<oe.length&&B<V.length;B++)oe[B].replaceWith(I(V[B]));let R=B;for(;V.length>R;)V[R-1].after(V[R]),R++;for(;oe.length>B;)oe[B].remove(),B++}}}g.requestAnimationFrame(()=>G(r)),D()},U=(r,o,i=[])=>({get(u,p,b){var x;if(E==null||E.add(r),p==="_isProxy")return!0;if(!((x=u[p])!=null&&x._isProxy)&&!ce(u[p])&&de(u[p]))u[p]=new Proxy(u[p],U(r,o,[...i,p]));else if(Me.includes(p)){let P=u[p];return(...y)=>{let v=P.apply(u,y);return M(r,p,v,y,o,i),v}}return Reflect.get(u,p,b)},set(u,p,b,x){let P=Reflect.set(u,p,b,x);return M(r,"setItem",P,{prop:p,value:b},o,[...i,p]),P}}),W=(r,o)=>new Proxy(o,U(r,o)),q=(r,o,i,u,p,b)=>{let x=()=>{if(u.length==0)r.textContent="";else{for(var y=0;y<u.length&&y<r.children.length;y++){const S=r.children[y];S!=null&&S.bauUpdate?S.bauUpdate(S,u[y]):S.replaceWith(i(u[y],y))}let v=r.children[y];if(v)for(;v;){const S=v.nextSibling;v.remove(),v=S}else for(;y<u.length;y++)r.appendChild(i(u[y],y))}},P=y=>r[y]&&r.removeChild(r[y]);return{assign:x,sort:x,reverse:x,setItem:()=>{let y=b[0],v=r.children[y],S=p[y];v&&(v!=null&&v.bauUpdate?v.bauUpdate(v,S):v.replaceWith(i(S,y)))},push:()=>{for(let y=0;y<o.length;y++)r.appendChild(i(o[y],p.length+y))},unshift:()=>{for(let y=o.length-1;y>=0;y--)r.prepend(i(o[y]))},pop:()=>P("lastChild"),shift:()=>P("firstChild"),splice:()=>{const{length:y}=r.children;let[v,S=y,..._]=o;for(let Y=v>=0?Math.min(v+S-1,y-1):y-1;Y>=(v>=0?v:y+v);Y--)r.children[Y].remove();if(_.length){let Y=_.map((se,ne)=>i(se,v+ne));r.children[v]?r.children[v].before(...Y):r.append(...Y)}}}},H=r=>({oldVal:r,bindings:[],listeners:[],__isState:!0,get val(){let o=this;return E==null||E.add(o),o.valProxy??(o.valProxy=de(r)?W(o,r):r,o.valProxy)},set val(o){let i=this,u=i.val;de(o)?(i.valProxy=W(i,o),M(i,"assign",o)):o!==u&&(i.valProxy=o,M(i)),i.oldVal=u}}),I=r=>{if(r==null||r===!1){let o=$("span");return o.style.display="none",o}else return r.nodeType?r:Array.isArray(r)?r.map(I):w.createTextNode(r)},z=(r,o)=>{let i=new Set;return o.val=C(r,i),i},m=r=>{let o=H(),i=z(r,o);o.computed=!0;for(let u of i)u.listeners.push({computed:r,deps:i,state:o});return o},G=r=>{for(let o of[...r.listeners])z(o.computed,o.state)},X=(r,o=[])=>{for(let i of o)if(Array.isArray(i))X(r,i);else if(i!=null){let u=ce(i)?a({deps:[i],render:()=>p=>p}):Ae(i)?l(i):I(i);Array.isArray(u)?r.append(...u):r.appendChild(u)}},K={},F=(r,o)=>r&&(Object.getOwnPropertyDescriptor(r,o)??F(Ne(r),o)),J=(r,o,i)=>{var u;return K[r+","+o]??(K[r+","+o]=((u=F(i,o))==null?void 0:u.set)??0)},e=(r,o)=>new g.MutationObserver((i,u)=>{i.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(b=>b===r&&(o({element:r}),u.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,o)=>new g.MutationObserver((i,u)=>i.forEach(p=>o({record:p,element:r}))).observe(r,{childList:!0}),n=r=>new Proxy(function(i,...u){var P;let[p,b]=_e(u),x=r?w.createElementNS(r,i):$(i);for(let[y,v]of Object.entries(p))if(y=="bauUpdate")x[y]=v;else if(!y.startsWith("bau")){let S=J(i,y,Ne(x))?_=>_!==void 0&&(x[y]=_):_=>x.setAttribute(y,Array.isArray(_)?_.filter(Y=>Y).join(" "):_);v==null||(ce(v)?a({deps:[v],render:()=>()=>(S(v.val),x)},!0):Ae(v)&&(!y.startsWith("on")||v.isDerived)?l(()=>(S(v({element:x})),x),!0):v.renderProp?a({deps:v.deps,render:()=>()=>(S(v.renderProp({element:x})(...v.deps.map(he))),x)},!0):S(v))}return p.bauChildMutated&&t(x,p.bauChildMutated),X(x,b),x.autofocus&&x.focus&&g.requestAnimationFrame(()=>x.focus()),(P=p.bauCreated)==null||P.call(p,{element:x}),p.bauMounted&&g.requestAnimationFrame(()=>p.bauMounted({element:x})),p.bauUnmounted&&g.requestAnimationFrame(()=>e(x,p.bauUnmounted)),x},{get:(o,i)=>o.bind(void 0,i)}),c=(r,o,i,u)=>{r.element=I(i),r.isAttribute=u;for(let p of o)ce(p)&&(h.add(p),p.bindings.push(r));return r.element},l=(r,o)=>{let i=new Set,u=C(r,i,{});return c({renderInferred:r},i,u,o)},a=({deps:r,element:o,render:i,renderItem:u},p)=>c({deps:r,render:i,renderItem:u},r,i({element:o,renderItem:u})(...r.map(he)),p),d=(r,o,i)=>a({deps:[r],render:({renderItem:u})=>p=>{for(let b=0;b<p.length;b++)o.appendChild(u(p[b],b));return o},renderItem:i}),s=async r=>{O=!0;let o=await r();return O=!1,N.forEach(i=>M(...i)),N.clear(),o};return{tags:n(),tagsNS:n,state:H,bind:a,loop:d,derive:m,stateSet:h,batch:s}}const Te=f=>{let g=0,w=11;for(;g<f.length;)w=101*w+f.charCodeAt(g++)>>>0;return"bau"+w},De=(f,g,w,A)=>{const h=f.createElement("style");h.id=w,h.append(A),(g??f.head).append(h)},Be=(f,g)=>f.reduce((w,A,h)=>w+A+(g[h]??""),"");function Le(f){let{document:g}=(f==null?void 0:f.window)??window;const w=A=>(h,...N)=>{const O=Be(h,N),E=Te(O);return!g.getElementById(E)&&De(g,f==null?void 0:f.target,E,A(E,O)),E};return{css:w((A,h)=>`.${A} { ${h} }`),keyframes:w((A,h)=>`@keyframes ${A} { ${h} }`),createGlobalStyles:w((A,h)=>h)}}const xe=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Re=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Ue=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Fe=f=>`var(--color-${f})`,qe=f=>`var(--color-${f}-lightest)`,ze=()=>xe.map(([f])=>`
.outline.${f} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${f} {
  background-color: ${qe(f)};
}
.solid.${f} {
  background-color: ${Fe(f)};
}
`).join(`
`),Ge=()=>xe.map(([f])=>[`--color-${f}-s: var(--color-${f}-dark-s);`]).join(`
`),je=f=>100-f*10,He=()=>new Array(10).fill("").map((f,g)=>`--color-gray-${g*100}: hsl(0, 0%, ${je(g)}%);`).join(`
`),Ee=({dark:f})=>new Array(10).fill("").map((g,w)=>`--color-emphasis-${w*100}: var(--color-gray-${f?1e3-w*100:w*100});`).join(`
`),Ye=([f,{h:g,s:w,l:A}])=>[`--color-${f}-h: ${g};`,`--color-${f}-l: ${A};`,`--color-${f}-base-s: ${w};`,`--color-${f}-s: var(--color-${f}-base-s);`,`--color-${f}-dark-s: calc(${w} - 25%);`,`--color-${f}-hsl: var(--color-${f}-h), var(--color-${f}-s), var(--color-${f}-l);`,`--color-${f}: hsl(var(--color-${f}-hsl));`,...Re.map(([h,N])=>`--color-${f}-${h}: hsl(var(--color-${f}-h), var(--color-${f}-s), calc(var(--color-${f}-l) * ${N}));`),...Ue.map(([h,N])=>`--color-${f}-${h}: hsl(var(--color-${f}-h), var(--color-${f}-s), calc(var(--color-${f}-l) * ${N}));`),`--color-${f}-contrast-background: hsl(var(--color-${f}-h), var(--color-${f}-s), calc(var(--color-${f}-l) / var(--contrast-background-value)));`,`--color-${f}-contrast-foreground: hsl(var(--color-${f}-h), var(--color-${f}-s), calc(var(--color-${f}-l) * var(--contrast-foreground-value)));`].join(`
`);function We({createGlobalStyles:f},{colorPalette:g=xe}={}){f`
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
      ${g.map(([w,A])=>Ye([w,A])).join(`
`)}
      ${He()}
      ${Ee({})}
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
      --brightness-hover-reverse: 70% ${Ee({dark:!0})};
    }
  `}function Ve(f){const g=Ie(),w=Le({target:window.document.getElementById("bau-css")});return We(w),{bau:g,...w,tr:A=>A,window,...f}}function Xe(f){const{bau:g,css:w}=f,{form:A,h1:h,input:N,label:O,button:E,p:$,footer:C}=g.tags,D=w`
    display: flex;
    flex-direction: column;
    h1 {
    }
    p {
      font-size: 0.9rem;
    }
  `;return({onsubmit:M})=>A({class:D,onsubmit:M},h("Personal Info"),$("Please provide your name, email address, and phone number."),O("Name",N({type:"text",name:"name",placeholder:"e.g Stephen King",required:!0})),O("Email Address",N({type:"email",required:!0,placeholder:"e.g stephenking@lorem.com"})),O("Phone Number",N({type:"text",required:!0,name:"phone",pattern:String.raw`\d*`,minLength:6,placeholder:"e.g. 1234567890"})),C(E({type:"submit"},"Next")))}const be=[{name:"Arcade",pricePerMonth:"9",image:"./assets/images/icon-arcade.svg"},{name:"Advanced",pricePerMonth:"12",image:"./assets/images/icon-advanced.svg"},{name:"Pro",pricePerMonth:"15",image:"./assets/images/icon-pro.svg"}];function Ke(f){const{bau:g,css:w}=f,{form:A,button:h,h1:N,p:O,input:E,footer:$,div:C,label:D,strong:M,small:U,img:W}=g.tags,q=w``,H=g.state(!1),I=G=>{H.val=G.target.checked},z=()=>C({class:w`
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
            input {
              width: 0px;
            }
            img {
              //margin-bottom: 1rem;
            }
            p {
              line-height: 1.2rem;
            }
            small {
              color: var(--font-color-secondary);
            }
          }
        `},be.map(({name:G,image:X,pricePerMonth:K})=>D(E({type:"radio",name:"plan",value:G,required:!0}),W({src:X,alt:""}),()=>C(O(M(G)),O(U(H.val?`$${Number(K)*10}/year`:`$${K}/mo`)),O(U(H.val&&"2 months free")))))),m=()=>D({class:w`
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
        `},E({type:"checkbox",name:"yearly",role:"switch",onchange:I}));return({onsubmit:G,onPrevious:X})=>A({class:q,onsubmit:G},N("Select your plan"),O("You have the option of monthly or yearly billing."),z(),m(),$(h({type:"submit"},"Next Step"),h({type:"button",class:"plain",onclick:X},"Go back")))}const Je="en-US",Qe="USD",we=f=>new Intl.NumberFormat(Je,{style:"currency",currency:Qe,maximumFractionDigits:0}).format(f),Pe=[{name:"Online service",description:"Access to multiplayer games",pricePerMonth:"1"},{name:"Larger storage",description:"Extra 1TB of cloud save",pricePerMonth:"2"},{name:"Customizable profile",description:"Custom theme on your profile",pricePerMonth:"3"}];function Ze(f){const{bau:g,css:w}=f,{form:A,h1:h,button:N,footer:O,p:E,div:$,label:C,input:D,strong:M,small:U,span:W}=g.tags,q=w``,H=()=>$({class:w`
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
        `},Pe.map(({name:I,description:z,pricePerMonth:m})=>C(D({type:"checkbox",role:"checkbox",name:"addons",value:I}),W({class:"info"},E(M(I)),U(z)),$({class:"price"},"+",we(Number(m)),"/mo"))));return({onsubmit:I,onPrevious:z})=>A({class:q,onsubmit:I},h("Pick add-ons"),E("Add-ons help enhance your gaming experience."),H(),O(N({type:"submit"},"Next"),N({type:"button",class:"plain",onclick:z},"Go back")))}var er=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,pe=Math.ceil,ee=Math.floor,Q="[BigNumber Error] ",Se=Q+"Number primitive has more than 15 significant digits: ",te=1e14,k=14,ge=9007199254740991,me=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],le=1e7,j=1e9;function $e(f){var g,w,A,h=m.prototype={constructor:m,toString:null,valueOf:null},N=new m(1),O=20,E=4,$=-7,C=21,D=-1e7,M=1e7,U=!1,W=1,q=0,H={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},I="0123456789abcdefghijklmnopqrstuvwxyz",z=!0;function m(e,t){var n,c,l,a,d,s,r,o,i=this;if(!(i instanceof m))return new m(e,t);if(t==null){if(e&&e._isBigNumber===!0){i.s=e.s,!e.c||e.e>M?i.c=i.e=null:e.e<D?i.c=[i.e=0]:(i.e=e.e,i.c=e.c.slice());return}if((s=typeof e=="number")&&e*0==0){if(i.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,d=e;d>=10;d/=10,a++);a>M?i.c=i.e=null:(i.e=a,i.c=[e]);return}o=String(e)}else{if(!er.test(o=String(e)))return A(i,o,s);i.s=o.charCodeAt(0)==45?(o=o.slice(1),-1):1}(a=o.indexOf("."))>-1&&(o=o.replace(".","")),(d=o.search(/e/i))>0?(a<0&&(a=d),a+=+o.slice(d+1),o=o.substring(0,d)):a<0&&(a=o.length)}else{if(T(t,2,I.length,"Base"),t==10&&z)return i=new m(e),F(i,O+i.e+1,E);if(o=String(e),s=typeof e=="number"){if(e*0!=0)return A(i,o,s,t);if(i.s=1/e<0?(o=o.slice(1),-1):1,m.DEBUG&&o.replace(/^0\.0*|\./,"").length>15)throw Error(Se+e)}else i.s=o.charCodeAt(0)===45?(o=o.slice(1),-1):1;for(n=I.slice(0,t),a=d=0,r=o.length;d<r;d++)if(n.indexOf(c=o.charAt(d))<0){if(c=="."){if(d>a){a=r;continue}}else if(!l&&(o==o.toUpperCase()&&(o=o.toLowerCase())||o==o.toLowerCase()&&(o=o.toUpperCase()))){l=!0,d=-1,a=0;continue}return A(i,String(e),s,t)}s=!1,o=w(o,t,10,i.s),(a=o.indexOf("."))>-1?o=o.replace(".",""):a=o.length}for(d=0;o.charCodeAt(d)===48;d++);for(r=o.length;o.charCodeAt(--r)===48;);if(o=o.slice(d,++r)){if(r-=d,s&&m.DEBUG&&r>15&&(e>ge||e!==ee(e)))throw Error(Se+i.s*e);if((a=a-d-1)>M)i.c=i.e=null;else if(a<D)i.c=[i.e=0];else{if(i.e=a,i.c=[],d=(a+1)%k,a<0&&(d+=k),d<r){for(d&&i.c.push(+o.slice(0,d)),r-=k;d<r;)i.c.push(+o.slice(d,d+=k));d=k-(o=o.slice(d)).length}else d-=r;for(;d--;o+="0");i.c.push(+o)}}else i.c=[i.e=0]}m.clone=$e,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var t,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(n=e[t],T(n,0,j,t),O=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(n=e[t],T(n,0,8,t),E=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(n=e[t],n&&n.pop?(T(n[0],-j,0,t),T(n[1],0,j,t),$=n[0],C=n[1]):(T(n,-j,j,t),$=-(C=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if(n=e[t],n&&n.pop)T(n[0],-j,-1,t),T(n[1],1,j,t),D=n[0],M=n[1];else if(T(n,-j,j,t),n)D=-(M=n<0?-n:n);else throw Error(Q+t+" cannot be zero: "+n);if(e.hasOwnProperty(t="CRYPTO"))if(n=e[t],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))U=n;else throw U=!n,Error(Q+"crypto unavailable");else U=n;else throw Error(Q+t+" not true or false: "+n);if(e.hasOwnProperty(t="MODULO_MODE")&&(n=e[t],T(n,0,9,t),W=n),e.hasOwnProperty(t="POW_PRECISION")&&(n=e[t],T(n,0,j,t),q=n),e.hasOwnProperty(t="FORMAT"))if(n=e[t],typeof n=="object")H=n;else throw Error(Q+t+" not an object: "+n);if(e.hasOwnProperty(t="ALPHABET"))if(n=e[t],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))z=n.slice(0,10)=="0123456789",I=n;else throw Error(Q+t+" invalid: "+n)}else throw Error(Q+"Object expected: "+e);return{DECIMAL_PLACES:O,ROUNDING_MODE:E,EXPONENTIAL_AT:[$,C],RANGE:[D,M],CRYPTO:U,MODULO_MODE:W,POW_PRECISION:q,FORMAT:H,ALPHABET:I}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var t,n,c=e.c,l=e.e,a=e.s;e:if({}.toString.call(c)=="[object Array]"){if((a===1||a===-1)&&l>=-j&&l<=j&&l===ee(l)){if(c[0]===0){if(l===0&&c.length===1)return!0;break e}if(t=(l+1)%k,t<1&&(t+=k),String(c[0]).length==t){for(t=0;t<c.length;t++)if(n=c[t],n<0||n>=te||n!==ee(n))break e;if(n!==0)return!0}}}else if(c===null&&l===null&&(a===null||a===1||a===-1))return!0;throw Error(Q+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return X(arguments,-1)},m.minimum=m.min=function(){return X(arguments,1)},m.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return ee(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var c,l,a,d,s,r=0,o=[],i=new m(N);if(n==null?n=O:T(n,0,j),d=pe(n/k),U)if(crypto.getRandomValues){for(c=crypto.getRandomValues(new Uint32Array(d*=2));r<d;)s=c[r]*131072+(c[r+1]>>>11),s>=9e15?(l=crypto.getRandomValues(new Uint32Array(2)),c[r]=l[0],c[r+1]=l[1]):(o.push(s%1e14),r+=2);r=d/2}else if(crypto.randomBytes){for(c=crypto.randomBytes(d*=7);r<d;)s=(c[r]&31)*281474976710656+c[r+1]*1099511627776+c[r+2]*4294967296+c[r+3]*16777216+(c[r+4]<<16)+(c[r+5]<<8)+c[r+6],s>=9e15?crypto.randomBytes(7).copy(c,r):(o.push(s%1e14),r+=7);r=d/7}else throw U=!1,Error(Q+"crypto unavailable");if(!U)for(;r<d;)s=t(),s<9e15&&(o[r++]=s%1e14);for(d=o[--r],n%=k,d&&n&&(s=me[k-n],o[r]=ee(d/s)*s);o[r]===0;o.pop(),r--);if(r<0)o=[a=0];else{for(a=-1;o[0]===0;o.splice(0,1),a-=k);for(r=1,s=o[0];s>=10;s/=10,r++);r<k&&(a-=k-r)}return i.e=a,i.c=o,i}}(),m.sum=function(){for(var e=1,t=arguments,n=new m(t[0]);e<t.length;)n=n.plus(t[e++]);return n},w=function(){var e="0123456789";function t(n,c,l,a){for(var d,s=[0],r,o=0,i=n.length;o<i;){for(r=s.length;r--;s[r]*=c);for(s[0]+=a.indexOf(n.charAt(o++)),d=0;d<s.length;d++)s[d]>l-1&&(s[d+1]==null&&(s[d+1]=0),s[d+1]+=s[d]/l|0,s[d]%=l)}return s.reverse()}return function(n,c,l,a,d){var s,r,o,i,u,p,b,x,P=n.indexOf("."),y=O,v=E;for(P>=0&&(i=q,q=0,n=n.replace(".",""),x=new m(c),p=x.pow(n.length-P),q=i,x.c=t(ie(Z(p.c),p.e,"0"),10,l,e),x.e=x.c.length),b=t(n,c,l,d?(s=I,e):(s=e,I)),o=i=b.length;b[--i]==0;b.pop());if(!b[0])return s.charAt(0);if(P<0?--o:(p.c=b,p.e=o,p.s=a,p=g(p,x,y,v,l),b=p.c,u=p.r,o=p.e),r=o+y+1,P=b[r],i=l/2,u=u||r<0||b[r+1]!=null,u=v<4?(P!=null||u)&&(v==0||v==(p.s<0?3:2)):P>i||P==i&&(v==4||u||v==6&&b[r-1]&1||v==(p.s<0?8:7)),r<1||!b[0])n=u?ie(s.charAt(1),-y,s.charAt(0)):s.charAt(0);else{if(b.length=r,u)for(--l;++b[--r]>l;)b[r]=0,r||(++o,b=[1].concat(b));for(i=b.length;!b[--i];);for(P=0,n="";P<=i;n+=s.charAt(b[P++]));n=ie(n,o,s.charAt(0))}return n}}(),g=function(){function e(c,l,a){var d,s,r,o,i=0,u=c.length,p=l%le,b=l/le|0;for(c=c.slice();u--;)r=c[u]%le,o=c[u]/le|0,d=b*r+o*p,s=p*r+d%le*le+i,i=(s/a|0)+(d/le|0)+b*o,c[u]=s%a;return i&&(c=[i].concat(c)),c}function t(c,l,a,d){var s,r;if(a!=d)r=a>d?1:-1;else for(s=r=0;s<a;s++)if(c[s]!=l[s]){r=c[s]>l[s]?1:-1;break}return r}function n(c,l,a,d){for(var s=0;a--;)c[a]-=s,s=c[a]<l[a]?1:0,c[a]=s*d+c[a]-l[a];for(;!c[0]&&c.length>1;c.splice(0,1));}return function(c,l,a,d,s){var r,o,i,u,p,b,x,P,y,v,S,_,Y,se,ne,V,oe,B=c.s==l.s?1:-1,R=c.c,L=l.c;if(!R||!R[0]||!L||!L[0])return new m(!c.s||!l.s||(R?L&&R[0]==L[0]:!L)?NaN:R&&R[0]==0||!L?B*0:B/0);for(P=new m(B),y=P.c=[],o=c.e-l.e,B=a+o+1,s||(s=te,o=re(c.e/k)-re(l.e/k),B=B/k|0),i=0;L[i]==(R[i]||0);i++);if(L[i]>(R[i]||0)&&o--,B<0)y.push(1),u=!0;else{for(se=R.length,V=L.length,i=0,B+=2,p=ee(s/(L[0]+1)),p>1&&(L=e(L,p,s),R=e(R,p,s),V=L.length,se=R.length),Y=V,v=R.slice(0,V),S=v.length;S<V;v[S++]=0);oe=L.slice(),oe=[0].concat(oe),ne=L[0],L[1]>=s/2&&ne++;do{if(p=0,r=t(L,v,V,S),r<0){if(_=v[0],V!=S&&(_=_*s+(v[1]||0)),p=ee(_/ne),p>1)for(p>=s&&(p=s-1),b=e(L,p,s),x=b.length,S=v.length;t(b,v,x,S)==1;)p--,n(b,V<x?oe:L,x,s),x=b.length,r=1;else p==0&&(r=p=1),b=L.slice(),x=b.length;if(x<S&&(b=[0].concat(b)),n(v,b,S,s),S=v.length,r==-1)for(;t(L,v,V,S)<1;)p++,n(v,V<S?oe:L,S,s),S=v.length}else r===0&&(p++,v=[0]);y[i++]=p,v[0]?v[S++]=R[Y]||0:(v=[R[Y]],S=1)}while((Y++<se||v[0]!=null)&&B--);u=v[0]!=null,y[0]||y.splice(0,1)}if(s==te){for(i=1,B=y[0];B>=10;B/=10,i++);F(P,a+(P.e=i+o*k-1)+1,d,u)}else P.e=o,P.r=+u;return P}}();function G(e,t,n,c){var l,a,d,s,r;if(n==null?n=E:T(n,0,8),!e.c)return e.toString();if(l=e.c[0],d=e.e,t==null)r=Z(e.c),r=c==1||c==2&&(d<=$||d>=C)?ue(r,d):ie(r,d,"0");else if(e=F(new m(e),t,n),a=e.e,r=Z(e.c),s=r.length,c==1||c==2&&(t<=a||a<=$)){for(;s<t;r+="0",s++);r=ue(r,a)}else if(t-=d,r=ie(r,a,"0"),a+1>s){if(--t>0)for(r+=".";t--;r+="0");}else if(t+=a-s,t>0)for(a+1==s&&(r+=".");t--;r+="0");return e.s<0&&l?"-"+r:r}function X(e,t){for(var n,c,l=1,a=new m(e[0]);l<e.length;l++)c=new m(e[l]),(!c.s||(n=ae(a,c))===t||n===0&&a.s===t)&&(a=c);return a}function K(e,t,n){for(var c=1,l=t.length;!t[--l];t.pop());for(l=t[0];l>=10;l/=10,c++);return(n=c+n*k-1)>M?e.c=e.e=null:n<D?e.c=[e.e=0]:(e.e=n,e.c=t),e}A=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,n=/^\.([^.]+)$/,c=/^-?(Infinity|NaN)$/,l=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(a,d,s,r){var o,i=s?d:d.replace(l,"");if(c.test(i))a.s=isNaN(i)?null:i<0?-1:1;else{if(!s&&(i=i.replace(e,function(u,p,b){return o=(b=b.toLowerCase())=="x"?16:b=="b"?2:8,!r||r==o?p:u}),r&&(o=r,i=i.replace(t,"$1").replace(n,"0.$1")),d!=i))return new m(i,o);if(m.DEBUG)throw Error(Q+"Not a"+(r?" base "+r:"")+" number: "+d);a.s=null}a.c=a.e=null}}();function F(e,t,n,c){var l,a,d,s,r,o,i,u=e.c,p=me;if(u){e:{for(l=1,s=u[0];s>=10;s/=10,l++);if(a=t-l,a<0)a+=k,d=t,r=u[o=0],i=ee(r/p[l-d-1]%10);else if(o=pe((a+1)/k),o>=u.length)if(c){for(;u.length<=o;u.push(0));r=i=0,l=1,a%=k,d=a-k+1}else break e;else{for(r=s=u[o],l=1;s>=10;s/=10,l++);a%=k,d=a-k+l,i=d<0?0:ee(r/p[l-d-1]%10)}if(c=c||t<0||u[o+1]!=null||(d<0?r:r%p[l-d-1]),c=n<4?(i||c)&&(n==0||n==(e.s<0?3:2)):i>5||i==5&&(n==4||c||n==6&&(a>0?d>0?r/p[l-d]:0:u[o-1])%10&1||n==(e.s<0?8:7)),t<1||!u[0])return u.length=0,c?(t-=e.e+1,u[0]=p[(k-t%k)%k],e.e=-t||0):u[0]=e.e=0,e;if(a==0?(u.length=o,s=1,o--):(u.length=o+1,s=p[k-a],u[o]=d>0?ee(r/p[l-d]%p[d])*s:0),c)for(;;)if(o==0){for(a=1,d=u[0];d>=10;d/=10,a++);for(d=u[0]+=s,s=1;d>=10;d/=10,s++);a!=s&&(e.e++,u[0]==te&&(u[0]=1));break}else{if(u[o]+=s,u[o]!=te)break;u[o--]=0,s=1}for(a=u.length;u[--a]===0;u.pop());}e.e>M?e.c=e.e=null:e.e<D&&(e.c=[e.e=0])}return e}function J(e){var t,n=e.e;return n===null?e.toString():(t=Z(e.c),t=n<=$||n>=C?ue(t,n):ie(t,n,"0"),e.s<0?"-"+t:t)}return h.absoluteValue=h.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},h.comparedTo=function(e,t){return ae(this,new m(e,t))},h.decimalPlaces=h.dp=function(e,t){var n,c,l,a=this;if(e!=null)return T(e,0,j),t==null?t=E:T(t,0,8),F(new m(a),e+a.e+1,t);if(!(n=a.c))return null;if(c=((l=n.length-1)-re(this.e/k))*k,l=n[l])for(;l%10==0;l/=10,c--);return c<0&&(c=0),c},h.dividedBy=h.div=function(e,t){return g(this,new m(e,t),O,E)},h.dividedToIntegerBy=h.idiv=function(e,t){return g(this,new m(e,t),0,1)},h.exponentiatedBy=h.pow=function(e,t){var n,c,l,a,d,s,r,o,i,u=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(Q+"Exponent not an integer: "+J(e));if(t!=null&&(t=new m(t)),s=e.e>14,!u.c||!u.c[0]||u.c[0]==1&&!u.e&&u.c.length==1||!e.c||!e.c[0])return i=new m(Math.pow(+J(u),s?e.s*(2-fe(e)):+J(e))),t?i.mod(t):i;if(r=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new m(NaN);c=!r&&u.isInteger()&&t.isInteger(),c&&(u=u.mod(t))}else{if(e.e>9&&(u.e>0||u.e<-1||(u.e==0?u.c[0]>1||s&&u.c[1]>=24e7:u.c[0]<8e13||s&&u.c[0]<=9999975e7)))return a=u.s<0&&fe(e)?-0:0,u.e>-1&&(a=1/a),new m(r?1/a:a);q&&(a=pe(q/k+2))}for(s?(n=new m(.5),r&&(e.s=1),o=fe(e)):(l=Math.abs(+J(e)),o=l%2),i=new m(N);;){if(o){if(i=i.times(u),!i.c)break;a?i.c.length>a&&(i.c.length=a):c&&(i=i.mod(t))}if(l){if(l=ee(l/2),l===0)break;o=l%2}else if(e=e.times(n),F(e,e.e+1,1),e.e>14)o=fe(e);else{if(l=+J(e),l===0)break;o=l%2}u=u.times(u),a?u.c&&u.c.length>a&&(u.c.length=a):c&&(u=u.mod(t))}return c?i:(r&&(i=N.div(i)),t?i.mod(t):a?F(i,q,E,d):i)},h.integerValue=function(e){var t=new m(this);return e==null?e=E:T(e,0,8),F(t,t.e+1,e)},h.isEqualTo=h.eq=function(e,t){return ae(this,new m(e,t))===0},h.isFinite=function(){return!!this.c},h.isGreaterThan=h.gt=function(e,t){return ae(this,new m(e,t))>0},h.isGreaterThanOrEqualTo=h.gte=function(e,t){return(t=ae(this,new m(e,t)))===1||t===0},h.isInteger=function(){return!!this.c&&re(this.e/k)>this.c.length-2},h.isLessThan=h.lt=function(e,t){return ae(this,new m(e,t))<0},h.isLessThanOrEqualTo=h.lte=function(e,t){return(t=ae(this,new m(e,t)))===-1||t===0},h.isNaN=function(){return!this.s},h.isNegative=function(){return this.s<0},h.isPositive=function(){return this.s>0},h.isZero=function(){return!!this.c&&this.c[0]==0},h.minus=function(e,t){var n,c,l,a,d=this,s=d.s;if(e=new m(e,t),t=e.s,!s||!t)return new m(NaN);if(s!=t)return e.s=-t,d.plus(e);var r=d.e/k,o=e.e/k,i=d.c,u=e.c;if(!r||!o){if(!i||!u)return i?(e.s=-t,e):new m(u?d:NaN);if(!i[0]||!u[0])return u[0]?(e.s=-t,e):new m(i[0]?d:E==3?-0:0)}if(r=re(r),o=re(o),i=i.slice(),s=r-o){for((a=s<0)?(s=-s,l=i):(o=r,l=u),l.reverse(),t=s;t--;l.push(0));l.reverse()}else for(c=(a=(s=i.length)<(t=u.length))?s:t,s=t=0;t<c;t++)if(i[t]!=u[t]){a=i[t]<u[t];break}if(a&&(l=i,i=u,u=l,e.s=-e.s),t=(c=u.length)-(n=i.length),t>0)for(;t--;i[n++]=0);for(t=te-1;c>s;){if(i[--c]<u[c]){for(n=c;n&&!i[--n];i[n]=t);--i[n],i[c]+=te}i[c]-=u[c]}for(;i[0]==0;i.splice(0,1),--o);return i[0]?K(e,i,o):(e.s=E==3?-1:1,e.c=[e.e=0],e)},h.modulo=h.mod=function(e,t){var n,c,l=this;return e=new m(e,t),!l.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||l.c&&!l.c[0]?new m(l):(W==9?(c=e.s,e.s=1,n=g(l,e,0,3),e.s=c,n.s*=c):n=g(l,e,0,W),e=l.minus(n.times(e)),!e.c[0]&&W==1&&(e.s=l.s),e)},h.multipliedBy=h.times=function(e,t){var n,c,l,a,d,s,r,o,i,u,p,b,x,P,y,v=this,S=v.c,_=(e=new m(e,t)).c;if(!S||!_||!S[0]||!_[0])return!v.s||!e.s||S&&!S[0]&&!_||_&&!_[0]&&!S?e.c=e.e=e.s=null:(e.s*=v.s,!S||!_?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(c=re(v.e/k)+re(e.e/k),e.s*=v.s,r=S.length,u=_.length,r<u&&(x=S,S=_,_=x,l=r,r=u,u=l),l=r+u,x=[];l--;x.push(0));for(P=te,y=le,l=u;--l>=0;){for(n=0,p=_[l]%y,b=_[l]/y|0,d=r,a=l+d;a>l;)o=S[--d]%y,i=S[d]/y|0,s=b*o+i*p,o=p*o+s%y*y+x[a]+n,n=(o/P|0)+(s/y|0)+b*i,x[a--]=o%P;x[a]=n}return n?++c:x.splice(0,1),K(e,x,c)},h.negated=function(){var e=new m(this);return e.s=-e.s||null,e},h.plus=function(e,t){var n,c=this,l=c.s;if(e=new m(e,t),t=e.s,!l||!t)return new m(NaN);if(l!=t)return e.s=-t,c.minus(e);var a=c.e/k,d=e.e/k,s=c.c,r=e.c;if(!a||!d){if(!s||!r)return new m(l/0);if(!s[0]||!r[0])return r[0]?e:new m(s[0]?c:l*0)}if(a=re(a),d=re(d),s=s.slice(),l=a-d){for(l>0?(d=a,n=r):(l=-l,n=s),n.reverse();l--;n.push(0));n.reverse()}for(l=s.length,t=r.length,l-t<0&&(n=r,r=s,s=n,t=l),l=0;t;)l=(s[--t]=s[t]+r[t]+l)/te|0,s[t]=te===s[t]?0:s[t]%te;return l&&(s=[l].concat(s),++d),K(e,s,d)},h.precision=h.sd=function(e,t){var n,c,l,a=this;if(e!=null&&e!==!!e)return T(e,1,j),t==null?t=E:T(t,0,8),F(new m(a),e,t);if(!(n=a.c))return null;if(l=n.length-1,c=l*k+1,l=n[l]){for(;l%10==0;l/=10,c--);for(l=n[0];l>=10;l/=10,c++);}return e&&a.e+1>c&&(c=a.e+1),c},h.shiftedBy=function(e){return T(e,-ge,ge),this.times("1e"+e)},h.squareRoot=h.sqrt=function(){var e,t,n,c,l,a=this,d=a.c,s=a.s,r=a.e,o=O+4,i=new m("0.5");if(s!==1||!d||!d[0])return new m(!s||s<0&&(!d||d[0])?NaN:d?a:1/0);if(s=Math.sqrt(+J(a)),s==0||s==1/0?(t=Z(d),(t.length+r)%2==0&&(t+="0"),s=Math.sqrt(+t),r=re((r+1)/2)-(r<0||r%2),s==1/0?t="5e"+r:(t=s.toExponential(),t=t.slice(0,t.indexOf("e")+1)+r),n=new m(t)):n=new m(s+""),n.c[0]){for(r=n.e,s=r+o,s<3&&(s=0);;)if(l=n,n=i.times(l.plus(g(a,l,o,1))),Z(l.c).slice(0,s)===(t=Z(n.c)).slice(0,s))if(n.e<r&&--s,t=t.slice(s-3,s+1),t=="9999"||!c&&t=="4999"){if(!c&&(F(l,l.e+O+2,0),l.times(l).eq(a))){n=l;break}o+=4,s+=4,c=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(F(n,n.e+O+2,1),e=!n.times(n).eq(a));break}}return F(n,n.e+O+1,E,e)},h.toExponential=function(e,t){return e!=null&&(T(e,0,j),e++),G(this,e,t,1)},h.toFixed=function(e,t){return e!=null&&(T(e,0,j),e=e+this.e+1),G(this,e,t)},h.toFormat=function(e,t,n){var c,l=this;if(n==null)e!=null&&t&&typeof t=="object"?(n=t,t=null):e&&typeof e=="object"?(n=e,e=t=null):n=H;else if(typeof n!="object")throw Error(Q+"Argument not an object: "+n);if(c=l.toFixed(e,t),l.c){var a,d=c.split("."),s=+n.groupSize,r=+n.secondaryGroupSize,o=n.groupSeparator||"",i=d[0],u=d[1],p=l.s<0,b=p?i.slice(1):i,x=b.length;if(r&&(a=s,s=r,r=a,x-=a),s>0&&x>0){for(a=x%s||s,i=b.substr(0,a);a<x;a+=s)i+=o+b.substr(a,s);r>0&&(i+=o+b.slice(a)),p&&(i="-"+i)}c=u?i+(n.decimalSeparator||"")+((r=+n.fractionGroupSize)?u.replace(new RegExp("\\d{"+r+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):u):i}return(n.prefix||"")+c+(n.suffix||"")},h.toFraction=function(e){var t,n,c,l,a,d,s,r,o,i,u,p,b=this,x=b.c;if(e!=null&&(s=new m(e),!s.isInteger()&&(s.c||s.s!==1)||s.lt(N)))throw Error(Q+"Argument "+(s.isInteger()?"out of range: ":"not an integer: ")+J(s));if(!x)return new m(b);for(t=new m(N),o=n=new m(N),c=r=new m(N),p=Z(x),a=t.e=p.length-b.e-1,t.c[0]=me[(d=a%k)<0?k+d:d],e=!e||s.comparedTo(t)>0?a>0?t:o:s,d=M,M=1/0,s=new m(p),r.c[0]=0;i=g(s,t,0,1),l=n.plus(i.times(c)),l.comparedTo(e)!=1;)n=c,c=l,o=r.plus(i.times(l=o)),r=l,t=s.minus(i.times(l=t)),s=l;return l=g(e.minus(n),c,0,1),r=r.plus(l.times(o)),n=n.plus(l.times(c)),r.s=o.s=b.s,a=a*2,u=g(o,c,a,E).minus(b).abs().comparedTo(g(r,n,a,E).minus(b).abs())<1?[o,c]:[r,n],M=d,u},h.toNumber=function(){return+J(this)},h.toPrecision=function(e,t){return e!=null&&T(e,1,j),G(this,e,t,2)},h.toString=function(e){var t,n=this,c=n.s,l=n.e;return l===null?c?(t="Infinity",c<0&&(t="-"+t)):t="NaN":(e==null?t=l<=$||l>=C?ue(Z(n.c),l):ie(Z(n.c),l,"0"):e===10&&z?(n=F(new m(n),O+l+1,E),t=ie(Z(n.c),n.e,"0")):(T(e,2,I.length,"Base"),t=w(ie(Z(n.c),l,"0"),10,e,c,!0)),c<0&&n.c[0]&&(t="-"+t)),t},h.valueOf=h.toJSON=function(){return J(this)},h._isBigNumber=!0,h[Symbol.toStringTag]="BigNumber",h[Symbol.for("nodejs.util.inspect.custom")]=h.valueOf,f!=null&&m.set(f),m}function re(f){var g=f|0;return f>0||f===g?g:g-1}function Z(f){for(var g,w,A=1,h=f.length,N=f[0]+"";A<h;){for(g=f[A++]+"",w=k-g.length;w--;g="0"+g);N+=g}for(h=N.length;N.charCodeAt(--h)===48;);return N.slice(0,h+1||1)}function ae(f,g){var w,A,h=f.c,N=g.c,O=f.s,E=g.s,$=f.e,C=g.e;if(!O||!E)return null;if(w=h&&!h[0],A=N&&!N[0],w||A)return w?A?0:-E:O;if(O!=E)return O;if(w=O<0,A=$==C,!h||!N)return A?0:!h^w?1:-1;if(!A)return $>C^w?1:-1;for(E=($=h.length)<(C=N.length)?$:C,O=0;O<E;O++)if(h[O]!=N[O])return h[O]>N[O]^w?1:-1;return $==C?0:$>C^w?1:-1}function T(f,g,w,A){if(f<g||f>w||f!==ee(f))throw Error(Q+(A||"Argument")+(typeof f=="number"?f<g||f>w?" out of range: ":" not an integer: ":" not a primitive number: ")+String(f))}function fe(f){var g=f.c.length-1;return re(f.e/k)==g&&f.c[g]%2!=0}function ue(f,g){return(f.length>1?f.charAt(0)+"."+f.slice(1):f)+(g<0?"e":"e+")+g}function ie(f,g,w){var A,h;if(g<0){for(h=w+".";++g;h+=w);f=h+f}else if(A=f.length,++g>A){for(h=w,g-=A;--g;h+=w);f+=h}else g<A&&(f=f.slice(0,g)+"."+f.slice(g));return f}var ve=$e();function rr(f,{plan:g,isPerYear:w,addons:A}){const{bau:h,css:N}=f,{form:O,h1:E,p:$,img:C,button:D,footer:M,table:U,tbody:W,thead:q,th:H,tr:I,td:z,a:m,small:G,strong:X}=h.tags,K=l=>w.val?`${we(ve(l).times(10).toNumber())}/year`:`${we(Number(l))}/mo`,F=h.derive(()=>{const l=A.val.reduce((d,{pricePerMonth:s})=>d.plus(s),ve(0)),a=ve(g.val.pricePerMonth).plus(l).toString();return K(a)}),J=N`
    padding: 2rem;
    > table {
      a {
        color: var(--font-color-secondary);
        font-weight: 400;
        font-size: 0.85rem;
      }
      background-color: var(--background-color-body);
      border-collapse: collapse;
      th,
      td {
        padding-inline: 1rem;
        padding-block: 0.5rem;
      }
      td {
        text-align: right;
      }
      thead {
        border-bottom: 1px solid var(--color-emphasis-100);
        td {
          font-weight: bold;
        }
      }
      tbody {
        padding: 0.5rem;
        th {
          color: var(--font-color-secondary);
          font-weight: 400;
          font-size: 0.9rem;
        }
        td {
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
  `,e=()=>{c.val=!0},t=({onPrevious:l,onChangePlan:a})=>O({class:J},E("Finishing up"),$("Double-check everything looks OK before confirming."),U(()=>q(H($(g.val.name," (",()=>w.val?"Yearly":"Monthly",")"),m({href:"#?step=2",onclick:a},"change")),z(K(g.val.pricePerMonth))),h.loop(A,W(),({name:d,pricePerMonth:s})=>I(H(d),z(K(s))))),$({class:"total"},G("Total (",()=>w.val?"per year":"per month",")"),X(F)),M(D({type:"submit",onclick:e},"Confirm"),D({type:"button",class:"plain",onclick:l},"Go back"))),n=()=>O({class:N`
          align-items: center;
          padding: 2rem;
        `},C({src:"./assets/images/icon-thank-you.svg",height:50,width:50}),E("Thank you!"),$("Thanks for confirming your subscription!We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.")),c=h.state(!1);return({onPrevious:l,onChangePlan:a})=>()=>c.val?n():t({onPrevious:l,onChangePlan:a})}function tr(f){const{bau:g,css:w}=f,{article:A,div:h,header:N,ul:O,li:E}=g.tags,$=g.state(1),C=g.state(be[0]),D=g.state(!1),M=g.state([]),U=Xe(f),W=Ke(f),q=Ze(f),H=rr(f,{plan:C,isPerYear:D,addons:M}),I=w`
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

          h1 + p,
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
  `,z=n=>$.val==n,m=({index:n,label:c})=>E({class:()=>z(n)&&"active"},h({class:"step-number"},n),h({class:"step-labels"},h({class:"step-label"},"Step ",n),h({class:"label"},c))),G=()=>{$.val++},X=()=>{$.val--},K=n=>{n.preventDefault();const c=Object.fromEntries(new FormData(n.currentTarget));console.log(c),G()},F=n=>{n.preventDefault();const c=Object.fromEntries(new FormData(n.currentTarget)),l=be.find(({name:a})=>a==String(c.plan));l&&(C.val=l),D.val=!!c.yearly,G()},J=n=>{n.preventDefault();const c=[...n.currentTarget.querySelectorAll('input[name="addons"]:checked')].map(({value:l})=>l);M.val=Pe.filter(({name:l})=>c.includes(l)),G()},e=()=>{$.val=2},t=[{label:"Your Info",Content:()=>U({onsubmit:K})},{label:"Select Plan",Content:({})=>W({onsubmit:F,onPrevious:X})},{label:"Add on",Content:({})=>q({onsubmit:J,onPrevious:X})},{label:"Summary",Content:({})=>H({onPrevious:X,onChangePlan:e})}];return()=>A({class:I},N(O(t.map(({label:n},c)=>m({index:c+1,label:n})))),O({class:"content"},t.map(({Content:n},c)=>E({class:()=>z(c+1)&&"active"},n({})))))}const nr=Ve(),or=f=>{const{bau:g}=f,{main:w}=g.tags,A=tr(f);return function(){return w(A())}},ir=or(nr);var ke;(ke=document.getElementById("app"))==null||ke.replaceChildren(ir());
