(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))w(d);new MutationObserver(d=>{for(const O of d)if(O.type==="childList")for(const x of O.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&w(x)}).observe(document,{childList:!0,subtree:!0});function b(d){const O={};return d.integrity&&(O.integrity=d.integrity),d.referrerPolicy&&(O.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?O.credentials="include":d.crossOrigin==="anonymous"?O.credentials="omit":O.credentials="same-origin",O}function w(d){if(d.ep)return;d.ep=!0;const O=b(d);fetch(d.href,O)}})();let Oe=a=>Object.prototype.toString.call(a??0).slice(8,-1),Me=a=>Oe(a)=="Object",Ne=a=>Oe(a)=="Function",me=a=>["Object","Array"].includes(Oe(a)),Ae=Object.getPrototypeOf,ve=a=>ue(a)?a.val:a,Ce=a=>Array.isArray(a)?a:[a],ue=a=>a==null?void 0:a.__isState,Be=["splice","push","pop","shift","unshift","sort","reverse"];const De=a=>!ue(a[0])&&Me(a[0])?[a[0],a.slice(1)]:[{},a];function Ue(a){let p=window,{document:b}=p,w,d=new Set,O=[],x,A=r=>b.createElement(r),I=(r,n,s)=>{let o=x;x=n;try{return r(s)}catch(c){return console.error(c),s}finally{x=o}},_=()=>{w||(w=p.requestAnimationFrame(()=>{d.forEach(r=>{r.bindings=r.bindings.filter(({element:n})=>{var s;return(s=Array.isArray(n)?n[0]:n)==null?void 0:s.isConnected}),!r.bindings.length&&!r.computed&&d.delete(r)}),w=void 0}))},$=(r,n)=>{!O.length&&p.requestAnimationFrame(P),O.push([r,n])};const P=()=>{let r=0,n=O.length;do{for(let s of new Set(O.slice(r,n).flatMap(([o])=>o.listeners)))g(s.computed,s.state);r=n,n=O.length}while(r<n);for(let s of new Set(O.flatMap(([o,c])=>o.bindings.map(v=>(v.op=c,v)))))k(s);O=[],_()};let k=r=>{var te;const{deps:n,element:s,renderInferred:o,render:c,renderItem:v,isAttribute:m,op:C=[]}=r,[E,y,N,S,R]=C;if(E&&v)(te=W(s,N,(...re)=>X(v(...re)),y,S,R)[E])==null||te.call();else{let re=o?o({element:s}):c({element:s,renderItem:v})(...n.map(ve));if(re!==s&&!m){let ne=Ce(r.element=X(re)),F=Ce(s),G=0;for(;G<F.length&&G<ne.length;G++)F[G].replaceWith(X(ne[G]));let U=G;for(;ne.length>U;)ne[U-1].after(ne[U]),U++;for(;F.length>G;)F[G].remove(),G++}}},Z=(r,n,s=[])=>({get(o,c,v){var m,C;if((m=x==null?void 0:x.g)==null||m.add(r),c==="_isProxy")return!0;if(!((C=o[c])!=null&&C._isProxy)&&!ue(o[c])&&me(o[c]))o[c]=new Proxy(o[c],Z(r,n,[...s,c]));else if(Be.includes(c)){let E=o[c];return(...y)=>{let N=E.apply(o,y);return $(r,[c,N,y,n,s]),N}}return Reflect.get(o,c,v)},set(o,c,v,m){let C=Reflect.set(o,c,v,m);return $(r,["setItem",C,{prop:c,value:v},n,[...s,c]]),C}}),j=(r,n)=>new Proxy(n,Z(r,n)),W=(r,n,s,o,c,v)=>{let m=()=>{if(o.length==0)r.textContent="";else{for(var E=0;E<o.length&&E<r.children.length;E++){const N=r.children[E];N!=null&&N.bauUpdate?N.bauUpdate(N,o[E]):N.replaceWith(s(o[E],E))}let y=r.children[E];if(y)for(;y;){const N=y.nextSibling;y.remove(),y=N}else for(;E<o.length;E++)r.appendChild(s(o[E],E))}},C=E=>r[E]&&r.removeChild(r[E]);return{assign:m,sort:m,reverse:m,setItem:()=>{let E=v[0],y=r.children[E],N=c[E];y&&(y!=null&&y.bauUpdate?y.bauUpdate(y,N):y.replaceWith(s(N,E)))},push:()=>{for(let E=0;E<n.length;E++)r.appendChild(s(n[E],c.length+E))},unshift:()=>{for(let E=n.length-1;E>=0;E--)r.prepend(s(n[E]))},pop:()=>C("lastChild"),shift:()=>C("firstChild"),splice:()=>{const{length:E}=r.children;let[y,N=E,...S]=n;for(let R=y>=0?Math.min(y+N-1,E-1):E-1;R>=(y>=0?y:E+y);R--)r.children[R].remove();if(S.length){let R=S.map((te,re)=>s(te,y+re));r.children[y]?r.children[y].before(...R):r.append(...R)}}}},H=(r,{onUpdate:n,name:s}={})=>({name:s,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var c;let o=this;return(c=x==null?void 0:x.g)==null||c.add(o),o.valProxy??(o.valProxy=me(r)?j(o,r):r,o.valProxy)},set val(o){var m;let c=this,v=c.rawVal;(m=x==null?void 0:x.s)==null||m.add(c),n==null||n(v,o),c.rawVal=o,me(o)?(c.valProxy=j(c,o),$(c,["assign",o])):o!==v&&(c.valProxy=o,c.bindings.length+c.listeners.length&&$(c))}}),X=r=>{if(r==null||r===!1){let n=A("span");return n.style.display="none",n}else return r.nodeType?r:Array.isArray(r)?r.map(X):b.createTextNode(r)},g=(r,n)=>{let s={g:new Set,s:new Set};return n.val=I(r,s),s},le=(r,n)=>{let s=H(void 0,n),o=g(r,s);s.computed=!0;let c={computed:r,state:s};for(let v of new Set([...o.g].filter(m=>!o.s.has(m)&&m.listeners.every(C=>!o.g.has(C.state)))))v.listeners.push(c);return s},ae=(r,n=[])=>{for(let s of n)if(Array.isArray(s))ae(r,s);else if(s!=null){let o=ue(s)?f({deps:[s],render:()=>c=>c}):Ne(s)?l(s):X(s);Array.isArray(o)?r.append(...o):r.appendChild(o)}},oe={},B=(r,n)=>r&&(Object.getOwnPropertyDescriptor(r,n)??B(Ae(r),n)),V=(r,n,s)=>{var o;return oe[r+","+n]??(oe[r+","+n]=((o=B(s,n))==null?void 0:o.set)??0)},e=(r,n)=>new p.MutationObserver((s,o)=>{s.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(v=>v===r&&(n({element:r}),o.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,n)=>new p.MutationObserver((s,o)=>s.forEach(c=>n({record:c,element:r}))).observe(r,{childList:!0}),i=r=>new Proxy(function(s,...o){var C;let[c,v]=De(o),m=r?b.createElementNS(r,s):A(s);for(let[E,y]of Object.entries(c))if(E=="bauUpdate")m[E]=y;else if(!E.startsWith("bau")){let N=V(s,E,Ae(m))?S=>S!==void 0&&(m[E]=S):S=>m.setAttribute(E,Array.isArray(S)?S.filter(R=>R).join(" "):S);y==null||(ue(y)?f({deps:[y],render:()=>()=>(N(y.val),m)},!0):Ne(y)&&(!E.startsWith("on")||y.isDerived)?l(()=>(N(y({element:m})),m),!0):y.renderProp?f({deps:y.deps,render:()=>()=>(N(y.renderProp({element:m})(...y.deps.map(ve))),m)},!0):N(y))}return c.bauChildMutated&&t(m,c.bauChildMutated),ae(m,v),m.autofocus&&m.focus&&p.requestAnimationFrame(()=>m.focus()),(C=c.bauCreated)==null||C.call(c,{element:m}),c.bauMounted&&p.requestAnimationFrame(()=>c.bauMounted({element:m})),c.bauUnmounted&&p.requestAnimationFrame(()=>e(m,c.bauUnmounted)),m},{get:(n,s)=>n.bind(void 0,s)}),u=(r,n,s,o)=>{r.element=X(s),r.isAttribute=o;for(let c of n.g)ue(c)&&(d.add(c),c.bindings.push(r));return r.element},l=(r,n)=>{let s={g:new Set,s:new Set},o=I(r,s,{});return u({renderInferred:r},s,o,n)},f=({deps:r,element:n,render:s,renderItem:o},c)=>u({deps:r,render:s,renderItem:o},{g:new Set(r),s:new Set},s({element:n,renderItem:o})(...r.map(ve)),c),h=(r,n,s)=>f({deps:[r],render:({renderItem:o})=>c=>{for(let v=0;v<c.length;v++)n.appendChild(o(c[v],v));return n},renderItem:s});return{tags:i(),tagsNS:i,state:H,bind:f,loop:h,derive:le,stateSet:d}}const Fe=a=>{let p=0,b=11;for(;p<a.length;)b=101*b+a.charCodeAt(p++)>>>0;return"bau"+b},Ge=(a,p,b,w)=>{const d=a.createElement("style");d.id=b,d.append(w),(p??a.head).append(d)},ze=(a,p)=>a.reduce((b,w,d)=>b+w+(p[d]??""),"");function qe(a){let{document:p}=(a==null?void 0:a.window)??window;const b=w=>(d,...O)=>{const x=ze(d,O),A=Fe(x);return!p.getElementById(A)&&Ge(p,a==null?void 0:a.target,A,w(A,x)),A};return{css:b((w,d)=>`.${w} { ${d} }`),keyframes:b((w,d)=>`@keyframes ${w} { ${d} }`),createGlobalStyles:b((w,d)=>d)}}const xe=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],je=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],He=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ve=a=>`var(--color-${a})`,We=a=>`var(--color-${a}-lightest)`,Xe=()=>xe.map(([a])=>`
.outline.${a} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${a} {
  background-color: ${We(a)};
}
.solid.${a} {
  background-color: ${Ve(a)};
}
`).join(`
`),Ke=()=>xe.map(([a])=>[`--color-${a}-s: var(--color-${a}-dark-s);`]).join(`
`),Ye=a=>100-a*10,Je=()=>new Array(10).fill("").map((a,p)=>`--color-gray-${p*100}: hsl(0, 0%, ${Ye(p)}%);`).join(`
`),Te=({dark:a})=>new Array(10).fill("").map((p,b)=>`--color-emphasis-${b*100}: var(--color-gray-${a?1e3-b*100:b*100});`).join(`
`),Qe=([a,{h:p,s:b,l:w}])=>[`--color-${a}-h: ${p};`,`--color-${a}-l: ${w};`,`--color-${a}-base-s: ${b};`,`--color-${a}-s: var(--color-${a}-base-s);`,`--color-${a}-dark-s: calc(${b} - 25%);`,`--color-${a}-hsl: var(--color-${a}-h), var(--color-${a}-s), var(--color-${a}-l);`,`--color-${a}: hsl(var(--color-${a}-hsl));`,...je.map(([d,O])=>`--color-${a}-${d}: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * ${O}));`),...He.map(([d,O])=>`--color-${a}-${d}: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * ${O}));`),`--color-${a}-contrast-background: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) / var(--contrast-background-value)));`,`--color-${a}-contrast-foreground: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ze({createGlobalStyles:a},{colorPalette:p=xe}={}){a`
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
      ${p.map(([b,w])=>Qe([b,w])).join(`
`)}
      ${Je()}
      ${Te({})}
      ${Xe()}
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
      ${Ke()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Te({dark:!0})};
    }
  `}function er(a){const p=Ue(),b=qe({target:window.document.getElementById("bau-css")});return Ze(b),{bau:p,...b,tr:w=>w,window,...a}}const Se=["first","second","third"];function rr(a){const{bau:p,css:b,window:w}=a,{section:d,span:O,input:x,div:A,label:I}=p.tags,_=b`
    display: flex;
    align-items: flex-end;
    gap: 0.4rem;

    > span {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
    }

    & label {
      font-size: 0.6rem;
      cursor: pointer;
    }

    & input {
      cursor: pointer;
      appearance: none;
      width: 1.2rem;
      height: 1.2rem;
    }

    .label-container {
      display: flex;
      justify-content: space-around;
    }
    .input-container {
      display: flex;
      position: relative;
      margin-inline: 0.2rem;
      background: var(--secondary-background-color);
      border-radius: 1rem;
      &::before {
        position: absolute;
        content: "";
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        height: 0.6rem;
        width: 0.6rem;
        border-radius: 50%;
        background-color: var(--ternary-background-color);
        transition: all 0.5s;
      }
      &:has(input[id="second"]:checked) {
        &::before {
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:has(input[id="third"]:checked) {
        &::before {
          left: 95%;
          transform: translate(-100%, -50%);
        }
      }
    }
  `,$=P=>{w.document.documentElement.setAttribute("data-theme",P.target.id)};return()=>d({class:_,onclick:$},O("Theme"),A(A({class:"label-container"},Se.map((P,k)=>I({htmlFor:P},k+1))),A({class:"input-container"},Se.map(P=>x({type:"radio",name:"themeRadio",id:P,oninput:$})))))}const fe={NUMERIC:"NUMERIC",OPERATOR:"OPERATOR"},K={INIT:"INIT",COLLECT_DIGIT:"COLLECT_DIGIT",COLLECT_OPERATOR:"COLLECT_OPERATOR"},he=a=>{const p=Number(a);return p>=0&&p<=9},de=a=>a==".",ke=a=>a=="-",we=a=>["*","/","+","-","="].includes(a),tr=a=>a=="DEL",nr=a=>a=="RESET",ir=()=>{let a="";const p=w=>{a=w;let d=K.INIT,O=K.INIT;const x=[];let A="";const I=k=>x.unshift(k),_=k=>{x.length>0&&(x[0]=k)},$=k=>{A=A.concat(k)},P=()=>{A=""};return w.split("").forEach(k=>{switch(O="",d){case K.INIT:{he(k)||de(k)||ke(k)?O=K.COLLECT_DIGIT:we(k)&&(O=K.COLLECT_OPERATOR);break}case K.COLLECT_DIGIT:{he(k)||de(k)&&!A.includes(".")?($(k),_({value:A,type:fe.NUMERIC})):we(k)&&(O=K.COLLECT_OPERATOR);break}case K.COLLECT_OPERATOR:{(he(k)||de(k)||ke(k))&&(O=K.COLLECT_DIGIT);break}default:throw Error("Invalid State")}switch(O){case K.INIT:{P();break}case K.COLLECT_DIGIT:{$(k),I({value:A,type:fe.NUMERIC});break}case K.COLLECT_OPERATOR:{P(),I({value:k,type:fe.OPERATOR});break}}O&&(d=O)}),x.reverse()},b=()=>{a=""};return{reset:b,parseFormula:p,evKey:w=>(nr(w)?b():tr(w)?a=a.slice(0,-1):(he(w)||de(w)||we(w))&&(a=a.concat(w)),p(a))}};var or=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,be=Math.ceil,J=Math.floor,q="[BigNumber Error] ",Ie=q+"Number primitive has more than 15 significant digits: ",ee=1e14,T=14,Ee=9007199254740991,ye=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],se=1e7,D=1e9;function Le(a){var p,b,w,d=g.prototype={constructor:g,toString:null,valueOf:null},O=new g(1),x=20,A=4,I=-7,_=21,$=-1e7,P=1e7,k=!1,Z=1,j=0,W={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},H="0123456789abcdefghijklmnopqrstuvwxyz",X=!0;function g(e,t){var i,u,l,f,h,r,n,s,o=this;if(!(o instanceof g))return new g(e,t);if(t==null){if(e&&e._isBigNumber===!0){o.s=e.s,!e.c||e.e>P?o.c=o.e=null:e.e<$?o.c=[o.e=0]:(o.e=e.e,o.c=e.c.slice());return}if((r=typeof e=="number")&&e*0==0){if(o.s=1/e<0?(e=-e,-1):1,e===~~e){for(f=0,h=e;h>=10;h/=10,f++);f>P?o.c=o.e=null:(o.e=f,o.c=[e]);return}s=String(e)}else{if(!or.test(s=String(e)))return w(o,s,r);o.s=s.charCodeAt(0)==45?(s=s.slice(1),-1):1}(f=s.indexOf("."))>-1&&(s=s.replace(".","")),(h=s.search(/e/i))>0?(f<0&&(f=h),f+=+s.slice(h+1),s=s.substring(0,h)):f<0&&(f=s.length)}else{if(L(t,2,H.length,"Base"),t==10&&X)return o=new g(e),B(o,x+o.e+1,A);if(s=String(e),r=typeof e=="number"){if(e*0!=0)return w(o,s,r,t);if(o.s=1/e<0?(s=s.slice(1),-1):1,g.DEBUG&&s.replace(/^0\.0*|\./,"").length>15)throw Error(Ie+e)}else o.s=s.charCodeAt(0)===45?(s=s.slice(1),-1):1;for(i=H.slice(0,t),f=h=0,n=s.length;h<n;h++)if(i.indexOf(u=s.charAt(h))<0){if(u=="."){if(h>f){f=n;continue}}else if(!l&&(s==s.toUpperCase()&&(s=s.toLowerCase())||s==s.toLowerCase()&&(s=s.toUpperCase()))){l=!0,h=-1,f=0;continue}return w(o,String(e),r,t)}r=!1,s=b(s,t,10,o.s),(f=s.indexOf("."))>-1?s=s.replace(".",""):f=s.length}for(h=0;s.charCodeAt(h)===48;h++);for(n=s.length;s.charCodeAt(--n)===48;);if(s=s.slice(h,++n)){if(n-=h,r&&g.DEBUG&&n>15&&(e>Ee||e!==J(e)))throw Error(Ie+o.s*e);if((f=f-h-1)>P)o.c=o.e=null;else if(f<$)o.c=[o.e=0];else{if(o.e=f,o.c=[],h=(f+1)%T,f<0&&(h+=T),h<n){for(h&&o.c.push(+s.slice(0,h)),n-=T;h<n;)o.c.push(+s.slice(h,h+=T));h=T-(s=s.slice(h)).length}else h-=n;for(;h--;s+="0");o.c.push(+s)}}else o.c=[o.e=0]}g.clone=Le,g.ROUND_UP=0,g.ROUND_DOWN=1,g.ROUND_CEIL=2,g.ROUND_FLOOR=3,g.ROUND_HALF_UP=4,g.ROUND_HALF_DOWN=5,g.ROUND_HALF_EVEN=6,g.ROUND_HALF_CEIL=7,g.ROUND_HALF_FLOOR=8,g.EUCLID=9,g.config=g.set=function(e){var t,i;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(i=e[t],L(i,0,D,t),x=i),e.hasOwnProperty(t="ROUNDING_MODE")&&(i=e[t],L(i,0,8,t),A=i),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(i=e[t],i&&i.pop?(L(i[0],-D,0,t),L(i[1],0,D,t),I=i[0],_=i[1]):(L(i,-D,D,t),I=-(_=i<0?-i:i))),e.hasOwnProperty(t="RANGE"))if(i=e[t],i&&i.pop)L(i[0],-D,-1,t),L(i[1],1,D,t),$=i[0],P=i[1];else if(L(i,-D,D,t),i)$=-(P=i<0?-i:i);else throw Error(q+t+" cannot be zero: "+i);if(e.hasOwnProperty(t="CRYPTO"))if(i=e[t],i===!!i)if(i)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))k=i;else throw k=!i,Error(q+"crypto unavailable");else k=i;else throw Error(q+t+" not true or false: "+i);if(e.hasOwnProperty(t="MODULO_MODE")&&(i=e[t],L(i,0,9,t),Z=i),e.hasOwnProperty(t="POW_PRECISION")&&(i=e[t],L(i,0,D,t),j=i),e.hasOwnProperty(t="FORMAT"))if(i=e[t],typeof i=="object")W=i;else throw Error(q+t+" not an object: "+i);if(e.hasOwnProperty(t="ALPHABET"))if(i=e[t],typeof i=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(i))X=i.slice(0,10)=="0123456789",H=i;else throw Error(q+t+" invalid: "+i)}else throw Error(q+"Object expected: "+e);return{DECIMAL_PLACES:x,ROUNDING_MODE:A,EXPONENTIAL_AT:[I,_],RANGE:[$,P],CRYPTO:k,MODULO_MODE:Z,POW_PRECISION:j,FORMAT:W,ALPHABET:H}},g.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!g.DEBUG)return!0;var t,i,u=e.c,l=e.e,f=e.s;e:if({}.toString.call(u)=="[object Array]"){if((f===1||f===-1)&&l>=-D&&l<=D&&l===J(l)){if(u[0]===0){if(l===0&&u.length===1)return!0;break e}if(t=(l+1)%T,t<1&&(t+=T),String(u[0]).length==t){for(t=0;t<u.length;t++)if(i=u[t],i<0||i>=ee||i!==J(i))break e;if(i!==0)return!0}}}else if(u===null&&l===null&&(f===null||f===1||f===-1))return!0;throw Error(q+"Invalid BigNumber: "+e)},g.maximum=g.max=function(){return ae(arguments,-1)},g.minimum=g.min=function(){return ae(arguments,1)},g.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return J(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(i){var u,l,f,h,r,n=0,s=[],o=new g(O);if(i==null?i=x:L(i,0,D),h=be(i/T),k)if(crypto.getRandomValues){for(u=crypto.getRandomValues(new Uint32Array(h*=2));n<h;)r=u[n]*131072+(u[n+1]>>>11),r>=9e15?(l=crypto.getRandomValues(new Uint32Array(2)),u[n]=l[0],u[n+1]=l[1]):(s.push(r%1e14),n+=2);n=h/2}else if(crypto.randomBytes){for(u=crypto.randomBytes(h*=7);n<h;)r=(u[n]&31)*281474976710656+u[n+1]*1099511627776+u[n+2]*4294967296+u[n+3]*16777216+(u[n+4]<<16)+(u[n+5]<<8)+u[n+6],r>=9e15?crypto.randomBytes(7).copy(u,n):(s.push(r%1e14),n+=7);n=h/7}else throw k=!1,Error(q+"crypto unavailable");if(!k)for(;n<h;)r=t(),r<9e15&&(s[n++]=r%1e14);for(h=s[--n],i%=T,h&&i&&(r=ye[T-i],s[n]=J(h/r)*r);s[n]===0;s.pop(),n--);if(n<0)s=[f=0];else{for(f=-1;s[0]===0;s.splice(0,1),f-=T);for(n=1,r=s[0];r>=10;r/=10,n++);n<T&&(f-=T-n)}return o.e=f,o.c=s,o}}(),g.sum=function(){for(var e=1,t=arguments,i=new g(t[0]);e<t.length;)i=i.plus(t[e++]);return i},b=function(){var e="0123456789";function t(i,u,l,f){for(var h,r=[0],n,s=0,o=i.length;s<o;){for(n=r.length;n--;r[n]*=u);for(r[0]+=f.indexOf(i.charAt(s++)),h=0;h<r.length;h++)r[h]>l-1&&(r[h+1]==null&&(r[h+1]=0),r[h+1]+=r[h]/l|0,r[h]%=l)}return r.reverse()}return function(i,u,l,f,h){var r,n,s,o,c,v,m,C,E=i.indexOf("."),y=x,N=A;for(E>=0&&(o=j,j=0,i=i.replace(".",""),C=new g(u),v=C.pow(i.length-E),j=o,C.c=t(ie(Y(v.c),v.e,"0"),10,l,e),C.e=C.c.length),m=t(i,u,l,h?(r=H,e):(r=e,H)),s=o=m.length;m[--o]==0;m.pop());if(!m[0])return r.charAt(0);if(E<0?--s:(v.c=m,v.e=s,v.s=f,v=p(v,C,y,N,l),m=v.c,c=v.r,s=v.e),n=s+y+1,E=m[n],o=l/2,c=c||n<0||m[n+1]!=null,c=N<4?(E!=null||c)&&(N==0||N==(v.s<0?3:2)):E>o||E==o&&(N==4||c||N==6&&m[n-1]&1||N==(v.s<0?8:7)),n<1||!m[0])i=c?ie(r.charAt(1),-y,r.charAt(0)):r.charAt(0);else{if(m.length=n,c)for(--l;++m[--n]>l;)m[n]=0,n||(++s,m=[1].concat(m));for(o=m.length;!m[--o];);for(E=0,i="";E<=o;i+=r.charAt(m[E++]));i=ie(i,s,r.charAt(0))}return i}}(),p=function(){function e(u,l,f){var h,r,n,s,o=0,c=u.length,v=l%se,m=l/se|0;for(u=u.slice();c--;)n=u[c]%se,s=u[c]/se|0,h=m*n+s*v,r=v*n+h%se*se+o,o=(r/f|0)+(h/se|0)+m*s,u[c]=r%f;return o&&(u=[o].concat(u)),u}function t(u,l,f,h){var r,n;if(f!=h)n=f>h?1:-1;else for(r=n=0;r<f;r++)if(u[r]!=l[r]){n=u[r]>l[r]?1:-1;break}return n}function i(u,l,f,h){for(var r=0;f--;)u[f]-=r,r=u[f]<l[f]?1:0,u[f]=r*h+u[f]-l[f];for(;!u[0]&&u.length>1;u.splice(0,1));}return function(u,l,f,h,r){var n,s,o,c,v,m,C,E,y,N,S,R,te,re,ne,F,G,U=u.s==l.s?1:-1,z=u.c,M=l.c;if(!z||!z[0]||!M||!M[0])return new g(!u.s||!l.s||(z?M&&z[0]==M[0]:!M)?NaN:z&&z[0]==0||!M?U*0:U/0);for(E=new g(U),y=E.c=[],s=u.e-l.e,U=f+s+1,r||(r=ee,s=Q(u.e/T)-Q(l.e/T),U=U/T|0),o=0;M[o]==(z[o]||0);o++);if(M[o]>(z[o]||0)&&s--,U<0)y.push(1),c=!0;else{for(re=z.length,F=M.length,o=0,U+=2,v=J(r/(M[0]+1)),v>1&&(M=e(M,v,r),z=e(z,v,r),F=M.length,re=z.length),te=F,N=z.slice(0,F),S=N.length;S<F;N[S++]=0);G=M.slice(),G=[0].concat(G),ne=M[0],M[1]>=r/2&&ne++;do{if(v=0,n=t(M,N,F,S),n<0){if(R=N[0],F!=S&&(R=R*r+(N[1]||0)),v=J(R/ne),v>1)for(v>=r&&(v=r-1),m=e(M,v,r),C=m.length,S=N.length;t(m,N,C,S)==1;)v--,i(m,F<C?G:M,C,r),C=m.length,n=1;else v==0&&(n=v=1),m=M.slice(),C=m.length;if(C<S&&(m=[0].concat(m)),i(N,m,S,r),S=N.length,n==-1)for(;t(M,N,F,S)<1;)v++,i(N,F<S?G:M,S,r),S=N.length}else n===0&&(v++,N=[0]);y[o++]=v,N[0]?N[S++]=z[te]||0:(N=[z[te]],S=1)}while((te++<re||N[0]!=null)&&U--);c=N[0]!=null,y[0]||y.splice(0,1)}if(r==ee){for(o=1,U=y[0];U>=10;U/=10,o++);B(E,f+(E.e=o+s*T-1)+1,h,c)}else E.e=s,E.r=+c;return E}}();function le(e,t,i,u){var l,f,h,r,n;if(i==null?i=A:L(i,0,8),!e.c)return e.toString();if(l=e.c[0],h=e.e,t==null)n=Y(e.c),n=u==1||u==2&&(h<=I||h>=_)?ge(n,h):ie(n,h,"0");else if(e=B(new g(e),t,i),f=e.e,n=Y(e.c),r=n.length,u==1||u==2&&(t<=f||f<=I)){for(;r<t;n+="0",r++);n=ge(n,f)}else if(t-=h,n=ie(n,f,"0"),f+1>r){if(--t>0)for(n+=".";t--;n+="0");}else if(t+=f-r,t>0)for(f+1==r&&(n+=".");t--;n+="0");return e.s<0&&l?"-"+n:n}function ae(e,t){for(var i,u,l=1,f=new g(e[0]);l<e.length;l++)u=new g(e[l]),(!u.s||(i=ce(f,u))===t||i===0&&f.s===t)&&(f=u);return f}function oe(e,t,i){for(var u=1,l=t.length;!t[--l];t.pop());for(l=t[0];l>=10;l/=10,u++);return(i=u+i*T-1)>P?e.c=e.e=null:i<$?e.c=[e.e=0]:(e.e=i,e.c=t),e}w=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,i=/^\.([^.]+)$/,u=/^-?(Infinity|NaN)$/,l=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(f,h,r,n){var s,o=r?h:h.replace(l,"");if(u.test(o))f.s=isNaN(o)?null:o<0?-1:1;else{if(!r&&(o=o.replace(e,function(c,v,m){return s=(m=m.toLowerCase())=="x"?16:m=="b"?2:8,!n||n==s?v:c}),n&&(s=n,o=o.replace(t,"$1").replace(i,"0.$1")),h!=o))return new g(o,s);if(g.DEBUG)throw Error(q+"Not a"+(n?" base "+n:"")+" number: "+h);f.s=null}f.c=f.e=null}}();function B(e,t,i,u){var l,f,h,r,n,s,o,c=e.c,v=ye;if(c){e:{for(l=1,r=c[0];r>=10;r/=10,l++);if(f=t-l,f<0)f+=T,h=t,n=c[s=0],o=J(n/v[l-h-1]%10);else if(s=be((f+1)/T),s>=c.length)if(u){for(;c.length<=s;c.push(0));n=o=0,l=1,f%=T,h=f-T+1}else break e;else{for(n=r=c[s],l=1;r>=10;r/=10,l++);f%=T,h=f-T+l,o=h<0?0:J(n/v[l-h-1]%10)}if(u=u||t<0||c[s+1]!=null||(h<0?n:n%v[l-h-1]),u=i<4?(o||u)&&(i==0||i==(e.s<0?3:2)):o>5||o==5&&(i==4||u||i==6&&(f>0?h>0?n/v[l-h]:0:c[s-1])%10&1||i==(e.s<0?8:7)),t<1||!c[0])return c.length=0,u?(t-=e.e+1,c[0]=v[(T-t%T)%T],e.e=-t||0):c[0]=e.e=0,e;if(f==0?(c.length=s,r=1,s--):(c.length=s+1,r=v[T-f],c[s]=h>0?J(n/v[l-h]%v[h])*r:0),u)for(;;)if(s==0){for(f=1,h=c[0];h>=10;h/=10,f++);for(h=c[0]+=r,r=1;h>=10;h/=10,r++);f!=r&&(e.e++,c[0]==ee&&(c[0]=1));break}else{if(c[s]+=r,c[s]!=ee)break;c[s--]=0,r=1}for(f=c.length;c[--f]===0;c.pop());}e.e>P?e.c=e.e=null:e.e<$&&(e.c=[e.e=0])}return e}function V(e){var t,i=e.e;return i===null?e.toString():(t=Y(e.c),t=i<=I||i>=_?ge(t,i):ie(t,i,"0"),e.s<0?"-"+t:t)}return d.absoluteValue=d.abs=function(){var e=new g(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,t){return ce(this,new g(e,t))},d.decimalPlaces=d.dp=function(e,t){var i,u,l,f=this;if(e!=null)return L(e,0,D),t==null?t=A:L(t,0,8),B(new g(f),e+f.e+1,t);if(!(i=f.c))return null;if(u=((l=i.length-1)-Q(this.e/T))*T,l=i[l])for(;l%10==0;l/=10,u--);return u<0&&(u=0),u},d.dividedBy=d.div=function(e,t){return p(this,new g(e,t),x,A)},d.dividedToIntegerBy=d.idiv=function(e,t){return p(this,new g(e,t),0,1)},d.exponentiatedBy=d.pow=function(e,t){var i,u,l,f,h,r,n,s,o,c=this;if(e=new g(e),e.c&&!e.isInteger())throw Error(q+"Exponent not an integer: "+V(e));if(t!=null&&(t=new g(t)),r=e.e>14,!c.c||!c.c[0]||c.c[0]==1&&!c.e&&c.c.length==1||!e.c||!e.c[0])return o=new g(Math.pow(+V(c),r?e.s*(2-pe(e)):+V(e))),t?o.mod(t):o;if(n=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new g(NaN);u=!n&&c.isInteger()&&t.isInteger(),u&&(c=c.mod(t))}else{if(e.e>9&&(c.e>0||c.e<-1||(c.e==0?c.c[0]>1||r&&c.c[1]>=24e7:c.c[0]<8e13||r&&c.c[0]<=9999975e7)))return f=c.s<0&&pe(e)?-0:0,c.e>-1&&(f=1/f),new g(n?1/f:f);j&&(f=be(j/T+2))}for(r?(i=new g(.5),n&&(e.s=1),s=pe(e)):(l=Math.abs(+V(e)),s=l%2),o=new g(O);;){if(s){if(o=o.times(c),!o.c)break;f?o.c.length>f&&(o.c.length=f):u&&(o=o.mod(t))}if(l){if(l=J(l/2),l===0)break;s=l%2}else if(e=e.times(i),B(e,e.e+1,1),e.e>14)s=pe(e);else{if(l=+V(e),l===0)break;s=l%2}c=c.times(c),f?c.c&&c.c.length>f&&(c.c.length=f):u&&(c=c.mod(t))}return u?o:(n&&(o=O.div(o)),t?o.mod(t):f?B(o,j,A,h):o)},d.integerValue=function(e){var t=new g(this);return e==null?e=A:L(e,0,8),B(t,t.e+1,e)},d.isEqualTo=d.eq=function(e,t){return ce(this,new g(e,t))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,t){return ce(this,new g(e,t))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,t){return(t=ce(this,new g(e,t)))===1||t===0},d.isInteger=function(){return!!this.c&&Q(this.e/T)>this.c.length-2},d.isLessThan=d.lt=function(e,t){return ce(this,new g(e,t))<0},d.isLessThanOrEqualTo=d.lte=function(e,t){return(t=ce(this,new g(e,t)))===-1||t===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,t){var i,u,l,f,h=this,r=h.s;if(e=new g(e,t),t=e.s,!r||!t)return new g(NaN);if(r!=t)return e.s=-t,h.plus(e);var n=h.e/T,s=e.e/T,o=h.c,c=e.c;if(!n||!s){if(!o||!c)return o?(e.s=-t,e):new g(c?h:NaN);if(!o[0]||!c[0])return c[0]?(e.s=-t,e):new g(o[0]?h:A==3?-0:0)}if(n=Q(n),s=Q(s),o=o.slice(),r=n-s){for((f=r<0)?(r=-r,l=o):(s=n,l=c),l.reverse(),t=r;t--;l.push(0));l.reverse()}else for(u=(f=(r=o.length)<(t=c.length))?r:t,r=t=0;t<u;t++)if(o[t]!=c[t]){f=o[t]<c[t];break}if(f&&(l=o,o=c,c=l,e.s=-e.s),t=(u=c.length)-(i=o.length),t>0)for(;t--;o[i++]=0);for(t=ee-1;u>r;){if(o[--u]<c[u]){for(i=u;i&&!o[--i];o[i]=t);--o[i],o[u]+=ee}o[u]-=c[u]}for(;o[0]==0;o.splice(0,1),--s);return o[0]?oe(e,o,s):(e.s=A==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,t){var i,u,l=this;return e=new g(e,t),!l.c||!e.s||e.c&&!e.c[0]?new g(NaN):!e.c||l.c&&!l.c[0]?new g(l):(Z==9?(u=e.s,e.s=1,i=p(l,e,0,3),e.s=u,i.s*=u):i=p(l,e,0,Z),e=l.minus(i.times(e)),!e.c[0]&&Z==1&&(e.s=l.s),e)},d.multipliedBy=d.times=function(e,t){var i,u,l,f,h,r,n,s,o,c,v,m,C,E,y,N=this,S=N.c,R=(e=new g(e,t)).c;if(!S||!R||!S[0]||!R[0])return!N.s||!e.s||S&&!S[0]&&!R||R&&!R[0]&&!S?e.c=e.e=e.s=null:(e.s*=N.s,!S||!R?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(u=Q(N.e/T)+Q(e.e/T),e.s*=N.s,n=S.length,c=R.length,n<c&&(C=S,S=R,R=C,l=n,n=c,c=l),l=n+c,C=[];l--;C.push(0));for(E=ee,y=se,l=c;--l>=0;){for(i=0,v=R[l]%y,m=R[l]/y|0,h=n,f=l+h;f>l;)s=S[--h]%y,o=S[h]/y|0,r=m*s+o*v,s=v*s+r%y*y+C[f]+i,i=(s/E|0)+(r/y|0)+m*o,C[f--]=s%E;C[f]=i}return i?++u:C.splice(0,1),oe(e,C,u)},d.negated=function(){var e=new g(this);return e.s=-e.s||null,e},d.plus=function(e,t){var i,u=this,l=u.s;if(e=new g(e,t),t=e.s,!l||!t)return new g(NaN);if(l!=t)return e.s=-t,u.minus(e);var f=u.e/T,h=e.e/T,r=u.c,n=e.c;if(!f||!h){if(!r||!n)return new g(l/0);if(!r[0]||!n[0])return n[0]?e:new g(r[0]?u:l*0)}if(f=Q(f),h=Q(h),r=r.slice(),l=f-h){for(l>0?(h=f,i=n):(l=-l,i=r),i.reverse();l--;i.push(0));i.reverse()}for(l=r.length,t=n.length,l-t<0&&(i=n,n=r,r=i,t=l),l=0;t;)l=(r[--t]=r[t]+n[t]+l)/ee|0,r[t]=ee===r[t]?0:r[t]%ee;return l&&(r=[l].concat(r),++h),oe(e,r,h)},d.precision=d.sd=function(e,t){var i,u,l,f=this;if(e!=null&&e!==!!e)return L(e,1,D),t==null?t=A:L(t,0,8),B(new g(f),e,t);if(!(i=f.c))return null;if(l=i.length-1,u=l*T+1,l=i[l]){for(;l%10==0;l/=10,u--);for(l=i[0];l>=10;l/=10,u++);}return e&&f.e+1>u&&(u=f.e+1),u},d.shiftedBy=function(e){return L(e,-Ee,Ee),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,t,i,u,l,f=this,h=f.c,r=f.s,n=f.e,s=x+4,o=new g("0.5");if(r!==1||!h||!h[0])return new g(!r||r<0&&(!h||h[0])?NaN:h?f:1/0);if(r=Math.sqrt(+V(f)),r==0||r==1/0?(t=Y(h),(t.length+n)%2==0&&(t+="0"),r=Math.sqrt(+t),n=Q((n+1)/2)-(n<0||n%2),r==1/0?t="5e"+n:(t=r.toExponential(),t=t.slice(0,t.indexOf("e")+1)+n),i=new g(t)):i=new g(r+""),i.c[0]){for(n=i.e,r=n+s,r<3&&(r=0);;)if(l=i,i=o.times(l.plus(p(f,l,s,1))),Y(l.c).slice(0,r)===(t=Y(i.c)).slice(0,r))if(i.e<n&&--r,t=t.slice(r-3,r+1),t=="9999"||!u&&t=="4999"){if(!u&&(B(l,l.e+x+2,0),l.times(l).eq(f))){i=l;break}s+=4,r+=4,u=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(B(i,i.e+x+2,1),e=!i.times(i).eq(f));break}}return B(i,i.e+x+1,A,e)},d.toExponential=function(e,t){return e!=null&&(L(e,0,D),e++),le(this,e,t,1)},d.toFixed=function(e,t){return e!=null&&(L(e,0,D),e=e+this.e+1),le(this,e,t)},d.toFormat=function(e,t,i){var u,l=this;if(i==null)e!=null&&t&&typeof t=="object"?(i=t,t=null):e&&typeof e=="object"?(i=e,e=t=null):i=W;else if(typeof i!="object")throw Error(q+"Argument not an object: "+i);if(u=l.toFixed(e,t),l.c){var f,h=u.split("."),r=+i.groupSize,n=+i.secondaryGroupSize,s=i.groupSeparator||"",o=h[0],c=h[1],v=l.s<0,m=v?o.slice(1):o,C=m.length;if(n&&(f=r,r=n,n=f,C-=f),r>0&&C>0){for(f=C%r||r,o=m.substr(0,f);f<C;f+=r)o+=s+m.substr(f,r);n>0&&(o+=s+m.slice(f)),v&&(o="-"+o)}u=c?o+(i.decimalSeparator||"")+((n=+i.fractionGroupSize)?c.replace(new RegExp("\\d{"+n+"}\\B","g"),"$&"+(i.fractionGroupSeparator||"")):c):o}return(i.prefix||"")+u+(i.suffix||"")},d.toFraction=function(e){var t,i,u,l,f,h,r,n,s,o,c,v,m=this,C=m.c;if(e!=null&&(r=new g(e),!r.isInteger()&&(r.c||r.s!==1)||r.lt(O)))throw Error(q+"Argument "+(r.isInteger()?"out of range: ":"not an integer: ")+V(r));if(!C)return new g(m);for(t=new g(O),s=i=new g(O),u=n=new g(O),v=Y(C),f=t.e=v.length-m.e-1,t.c[0]=ye[(h=f%T)<0?T+h:h],e=!e||r.comparedTo(t)>0?f>0?t:s:r,h=P,P=1/0,r=new g(v),n.c[0]=0;o=p(r,t,0,1),l=i.plus(o.times(u)),l.comparedTo(e)!=1;)i=u,u=l,s=n.plus(o.times(l=s)),n=l,t=r.minus(o.times(l=t)),r=l;return l=p(e.minus(i),u,0,1),n=n.plus(l.times(s)),i=i.plus(l.times(u)),n.s=s.s=m.s,f=f*2,c=p(s,u,f,A).minus(m).abs().comparedTo(p(n,i,f,A).minus(m).abs())<1?[s,u]:[n,i],P=h,c},d.toNumber=function(){return+V(this)},d.toPrecision=function(e,t){return e!=null&&L(e,1,D),le(this,e,t,2)},d.toString=function(e){var t,i=this,u=i.s,l=i.e;return l===null?u?(t="Infinity",u<0&&(t="-"+t)):t="NaN":(e==null?t=l<=I||l>=_?ge(Y(i.c),l):ie(Y(i.c),l,"0"):e===10&&X?(i=B(new g(i),x+l+1,A),t=ie(Y(i.c),i.e,"0")):(L(e,2,H.length,"Base"),t=b(ie(Y(i.c),l,"0"),10,e,u,!0)),u<0&&i.c[0]&&(t="-"+t)),t},d.valueOf=d.toJSON=function(){return V(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,a!=null&&g.set(a),g}function Q(a){var p=a|0;return a>0||a===p?p:p-1}function Y(a){for(var p,b,w=1,d=a.length,O=a[0]+"";w<d;){for(p=a[w++]+"",b=T-p.length;b--;p="0"+p);O+=p}for(d=O.length;O.charCodeAt(--d)===48;);return O.slice(0,d+1||1)}function ce(a,p){var b,w,d=a.c,O=p.c,x=a.s,A=p.s,I=a.e,_=p.e;if(!x||!A)return null;if(b=d&&!d[0],w=O&&!O[0],b||w)return b?w?0:-A:x;if(x!=A)return x;if(b=x<0,w=I==_,!d||!O)return w?0:!d^b?1:-1;if(!w)return I>_^b?1:-1;for(A=(I=d.length)<(_=O.length)?I:_,x=0;x<A;x++)if(d[x]!=O[x])return d[x]>O[x]^b?1:-1;return I==_?0:I>_^b?1:-1}function L(a,p,b,w){if(a<p||a>b||a!==J(a))throw Error(q+(w||"Argument")+(typeof a=="number"?a<p||a>b?" out of range: ":" not an integer: ":" not a primitive number: ")+String(a))}function pe(a){var p=a.c.length-1;return Q(a.e/T)==p&&a.c[p]%2!=0}function ge(a,p){return(a.length>1?a.charAt(0)+"."+a.slice(1):a)+(p<0?"e":"e+")+p}function ie(a,p,b){var w,d;if(p<0){for(d=b+".";++p;d+=b);a=d+a}else if(w=a.length,++p>w){for(d=b,p-=w;--p;d+=b);a+=d}else p<w&&(a=a.slice(0,p)+"."+a.slice(p));return a}var _e=Le();const sr={"/":4,"*":3,"+":2,"-":2},Re=a=>sr[a.value],lr=a=>{const p=[],b=[];for(a.forEach(w=>{if(w.type==fe.NUMERIC)p.push(w);else if(w.type==fe.OPERATOR){for(;b.length>0;){const d=b[0];if(Re(d)>=Re(w))b.shift(),p.push(d);else break}b.unshift(w)}});b.length>0;){const w=b.shift();w&&p.push(w)}return p},ar=a=>{const p=[];let b;a.every(d=>{if(d.type==fe.NUMERIC)p.unshift(_e(d.value));else if(d.type==fe.OPERATOR){const O=d.value,x=p.shift();if(!x)return b="missing operand",!1;const A=p.shift();if(!A)return b="missing operand",!1;let I;switch(O){case"*":{I=A.times(x);break}case"/":{I=A.dividedBy(x);break}case"+":{I=A.plus(x);break}case"-":{I=A.minus(x);break}}I&&p.unshift(I)}return!0});let w;return p.length==1&&(w=p[0]),{results:p,error:b,resultValue:w}},cr="US",fr=[["7"],["8"],["9"],["DEL","del"],["4"],["5"],["6"],["+","add"],["1"],["2"],["3"],["-","minus"],[".","dot"],["0"],["/","divide"],["*","multiply"],["RESET","reset"],["=","equal"]],$e=a=>{const p=new Intl.NumberFormat(cr,{maximumFractionDigits:20}).format(Number(a));return p.length<a.length?a:p};function ur(a){const{bau:p,css:b,window:w}=a,{h1:d,article:O,header:x,section:A,button:I,div:_}=p.tags,$=p.state([]),P=p.derive(()=>lr($.val)),k=p.derive(()=>{const t=ar(P.val).resultValue;if(t&&!t.isNaN())return $e(t.toString())}),Z=p.derive(()=>$.val.reduce((t,{value:i})=>_e(i).isNaN()?t.concat(i):t.concat($e(i)),"")),j=b`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.3rem;
    padding-inline: 1.5rem;
    padding-block: 1rem;
    color: var(--color-text);
    min-height: 100vh;
    > header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    > section {
      background-color: var(--secondary-background-color);
      padding: 1rem;
      border-radius: 0.5rem;
    }
    .keypad {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
      & button {
        font-size: 1.8rem;
        font-weight: 700;
        border: none;
        padding-inline: 1rem;
        padding-block: 0.7rem;
        cursor: pointer;
        border-radius: 0.5rem;
        background: var(--buttons-background-color);
        color: var(--buttons-color-text);
        box-shadow: inset 0px -4px 0px var(--buttons-box-shadow);
        transition: all 0.1s ease-out;
        &:hover {
          background: var(--buttons-background-color-active);
        }
        &:active {
          transform: translateY(1px);
          box-shadow: inset 0px -1px 0px var(--buttons-box-shadow);
        }
      }
      .key-del,
      .key-reset {
        background-color: var(--buttons-secondary-background-color);
        box-shadow: inset 0px -4px 0px var(--buttons-secondary-box-shadow);
        color: #ffffff;
        font-size: 1.2rem;
        &:hover {
          background: var(--buttons-secondary-background-color-active);
        }
      }
      .key-reset {
        grid-column: 1 / span 2;
      }
      .key-equal {
        grid-column: 3 / span 2;
        background-color: var(--ternary-background-color);
        &:hover {
          background: var(--ternary-background-color-active);
        }
        box-shadow: inset 0px -4px 0px var(--buttons-ternary-box-shadow);
        color: #ffffff;
      }
    }
    .display {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      .operand-previous {
        font-size: 1.2rem;
        height: 2rem;
        color: var(--color-text-secondary);
      }
      .operand-current {
        font-size: 1.7rem;
        height: 2rem;
      }
    }
  `,W=ir(),H=()=>{k.val!=null&&(W.reset(),$.val=W.parseFormula(k.val))},X=t=>()=>{t[0]=="="?H():$.val=W.evKey(t[0])},g=t=>{t.key=="Backspace"?$.val=W.evKey("DEL"):t.key=="Escape"?(W.reset(),$.val=[]):t.key=="="?H():$.val=W.evKey(t.key)},le=rr(a),ae=t=>t[1]??t[0];function oe(t,i){const u=document.createElement("span");u.style.position="fixed",u.style.visibility="hidden",u.style.fontSize=`${i}px`,u.innerText=t,document.body.appendChild(u);const l=Math.round(u.getBoundingClientRect().width);return u.remove(),l}const B=(t,i=20)=>{let u=i;if(!t.val)return u;const l=document.getElementsByClassName("display")[0];if(!l)return u;const f=l.getBoundingClientRect().width;for(;u>8&&oe(t.val,u)+50>f;)u--;return u},V=p.derive(()=>B(Z,22)),e=p.derive(()=>B(k,18));return()=>O({class:j,bauMounted:()=>{w.document.body.addEventListener("keydown",g)},bauUnmounted:()=>{w.document.removeEventListener("keydown",g)}},x(d("Calc"),le()),A({class:"display"},_({style:()=>`font-size: ${e.val}px`,class:"operand-previous"},k),_({style:()=>`font-size: ${V.val}px`,class:"operand-current"},Z)),A({class:"keypad"},fr.map(t=>I({type:"button",class:`key-${ae(t)}`,onclick:X(t)},t[0]))))}const hr=er(),dr=a=>{const{bau:p}=a,{main:b}=p.tags,w=ur(a);return function(){return b(w())}},pr=dr(hr);var Pe;(Pe=document.getElementById("app"))==null||Pe.replaceChildren(pr());
