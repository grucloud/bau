(function(){const w=document.createElement("link").relList;if(w&&w.supports&&w.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))A(d);new MutationObserver(d=>{for(const x of d)if(x.type==="childList")for(const N of x.addedNodes)N.tagName==="LINK"&&N.rel==="modulepreload"&&A(N)}).observe(document,{childList:!0,subtree:!0});function b(d){const x={};return d.integrity&&(x.integrity=d.integrity),d.referrerPolicy&&(x.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?x.credentials="include":d.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function A(d){if(d.ep)return;d.ep=!0;const x=b(d);fetch(d.href,x)}})();let ye=u=>Object.prototype.toString.call(u??0).slice(8,-1),Ce=u=>ye(u)=="Object",Oe=u=>ye(u)=="Function",pe=u=>["Object","Array"].includes(ye(u)),Ae=Object.getPrototypeOf,ge=u=>fe(u)?u.val:u,xe=u=>Array.isArray(u)?u:[u],fe=u=>u==null?void 0:u.__isState,Pe=["splice","push","pop","shift","unshift","sort","reverse"];const ke=u=>!fe(u[0])&&Ce(u[0])?[u[0],u.slice(1)]:[{},u];function Me(u){let w=window,{document:b}=w,A,d=new Set,x=[],N,C=r=>b.createElement(r),T=(r,n,l)=>{let o=N;N=n;try{return r(l)}catch(a){return console.error(a),l}finally{N=o}},B=()=>{A||(A=w.requestAnimationFrame(()=>{d.forEach(r=>{r.bindings=r.bindings.filter(({element:n})=>{var l;return(l=Array.isArray(n)?n[0]:n)==null?void 0:l.isConnected}),!r.bindings.length&&!r.computed&&d.delete(r)}),A=void 0}))},_=(r,n)=>{!x.length&&w.requestAnimationFrame(R),x.push([r,n])};const R=()=>{let r=0,n=x.length;do{for(let l of new Set(x.slice(r,n).flatMap(([o])=>o.listeners)))p(l.computed,l.state);r=n,n=x.length}while(r<n);for(let l of new Set(x.flatMap(([o,a])=>o.bindings.map(m=>(m.op=a,m)))))I(l);x=[],B()};let I=r=>{var re;const{deps:n,element:l,renderInferred:o,render:a,renderItem:m,isAttribute:g,op:E=[]}=r,[v,y,O,$,P]=E;if(v&&m)(re=oe(l,O,(...ee)=>q(m(...ee)),y,$,P)[v])==null||re.call();else{let ee=o?o({element:l}):a({element:l,renderItem:m})(...n.map(ge));if(ee!==l&&!g){let te=xe(r.element=q(ee)),G=xe(l),z=0;for(;z<G.length&&z<te.length;z++)G[z].replaceWith(q(te[z]));let U=z;for(;te.length>U;)te[U-1].after(te[U]),U++;for(;G.length>z;)G[z].remove(),z++}}},Q=(r,n,l=[])=>({get(o,a,m){var g,E;if((g=N==null?void 0:N.g)==null||g.add(r),a==="_isProxy")return!0;if(!((E=o[a])!=null&&E._isProxy)&&!fe(o[a])&&pe(o[a]))o[a]=new Proxy(o[a],Q(r,n,[...l,a]));else if(Pe.includes(a)){let v=o[a];return(...y)=>{let O=v.apply(o,y);return _(r,[a,O,y,n,l]),O}}return Reflect.get(o,a,m)},set(o,a,m,g){let E=Reflect.set(o,a,m,g);return _(r,["setItem",E,{prop:a,value:m},n,[...l,a]]),E}}),W=(r,n)=>new Proxy(n,Q(r,n)),oe=(r,n,l,o,a,m)=>{let g=()=>{if(o.length==0)r.textContent="";else{for(var v=0;v<o.length&&v<r.children.length;v++){const O=r.children[v];O!=null&&O.bauUpdate?O.bauUpdate(O,o[v]):O.replaceWith(l(o[v],v))}let y=r.children[v];if(y)for(;y;){const O=y.nextSibling;y.remove(),y=O}else for(;v<o.length;v++)r.appendChild(l(o[v],v))}},E=v=>r[v]&&r.removeChild(r[v]);return{assign:g,sort:g,reverse:g,setItem:()=>{let v=m[0],y=r.children[v],O=a[v];y&&(y!=null&&y.bauUpdate?y.bauUpdate(y,O):y.replaceWith(l(O,v)))},push:()=>{for(let v=0;v<n.length;v++)r.appendChild(l(n[v],a.length+v))},unshift:()=>{for(let v=n.length-1;v>=0;v--)r.prepend(l(n[v]))},pop:()=>E("lastChild"),shift:()=>E("firstChild"),splice:()=>{const{length:v}=r.children;let[y,O=v,...$]=n;for(let P=y>=0?Math.min(y+O-1,v-1):v-1;P>=(y>=0?y:v+y);P--)r.children[P].remove();if($.length){let P=$.map((re,ee)=>l(re,y+ee));r.children[y]?r.children[y].before(...P):r.append(...P)}}}},F=(r,{onUpdate:n,name:l}={})=>({name:l,rawVal:r,bindings:[],listeners:[],__isState:!0,get val(){var a;let o=this;return(a=N==null?void 0:N.g)==null||a.add(o),o.valProxy??(o.valProxy=pe(r)?W(o,r):r,o.valProxy)},set val(o){var g;let a=this,m=a.rawVal;(g=N==null?void 0:N.s)==null||g.add(a),n==null||n(m,o),a.rawVal=o,pe(o)?(a.valProxy=W(a,o),_(a,["assign",o])):o!==m&&(a.valProxy=o,a.bindings.length+a.listeners.length&&_(a))}}),q=r=>{if(r==null||r===!1){let n=C("span");return n.style.display="none",n}else return r.nodeType?r:Array.isArray(r)?r.map(q):b.createTextNode(r)},p=(r,n)=>{let l={g:new Set,s:new Set};return n.val=T(r,l),l},le=(r,n)=>{let l=F(void 0,n),o=p(r,l);l.computed=!0;let a={computed:r,state:l};for(let m of new Set([...o.g].filter(g=>!o.s.has(g)&&g.listeners.every(E=>!o.g.has(E.state)))))m.listeners.push(a);return l},se=(r,n=[])=>{for(let l of n)if(Array.isArray(l))se(r,l);else if(l!=null){let o=fe(l)?c({deps:[l],render:()=>a=>a}):Oe(l)?s(l):q(l);Array.isArray(o)?r.append(...o):r.appendChild(o)}},X={},D=(r,n)=>r&&(Object.getOwnPropertyDescriptor(r,n)??D(Ae(r),n)),H=(r,n,l)=>{var o;return X[r+","+n]??(X[r+","+n]=((o=D(l,n))==null?void 0:o.set)??0)},e=(r,n)=>new w.MutationObserver((l,o)=>{l.filter(a=>a.removedNodes).forEach(a=>[...a.removedNodes].find(m=>m===r&&(n({element:r}),o.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,n)=>new w.MutationObserver((l,o)=>l.forEach(a=>n({record:a,element:r}))).observe(r,{childList:!0}),i=r=>new Proxy(function(l,...o){var E;let[a,m]=ke(o),g=r?b.createElementNS(r,l):C(l);for(let[v,y]of Object.entries(a))if(v=="bauUpdate")g[v]=y;else if(!v.startsWith("bau")){let O=H(l,v,Ae(g))?$=>$!==void 0&&(g[v]=$):$=>g.setAttribute(v,Array.isArray($)?$.filter(P=>P).join(" "):$);y==null||(fe(y)?c({deps:[y],render:()=>()=>(O(y.val),g)},!0):Oe(y)&&(!v.startsWith("on")||y.isDerived)?s(()=>(O(y({element:g})),g),!0):y.renderProp?c({deps:y.deps,render:()=>()=>(O(y.renderProp({element:g})(...y.deps.map(ge))),g)},!0):O(y))}return a.bauChildMutated&&t(g,a.bauChildMutated),se(g,m),g.autofocus&&g.focus&&w.requestAnimationFrame(()=>g.focus()),(E=a.bauCreated)==null||E.call(a,{element:g}),a.bauMounted&&w.requestAnimationFrame(()=>a.bauMounted({element:g})),a.bauUnmounted&&w.requestAnimationFrame(()=>e(g,a.bauUnmounted)),g},{get:(n,l)=>n.bind(void 0,l)}),f=(r,n,l,o)=>{r.element=q(l),r.isAttribute=o;for(let a of n.g)fe(a)&&(d.add(a),a.bindings.push(r));return r.element},s=(r,n)=>{let l={g:new Set,s:new Set},o=T(r,l,{});return f({renderInferred:r},l,o,n)},c=({deps:r,element:n,render:l,renderItem:o},a)=>f({deps:r,render:l,renderItem:o},{g:new Set(r),s:new Set},l({element:n,renderItem:o})(...r.map(ge)),a),h=(r,n,l)=>c({deps:[r],render:({renderItem:o})=>a=>{for(let m=0;m<a.length;m++)n.appendChild(o(a[m],m));return n},renderItem:l});return{tags:i(),tagsNS:i,state:F,bind:c,loop:h,derive:le,stateSet:d}}const Be=u=>{let w=0,b=11;for(;w<u.length;)b=101*b+u.charCodeAt(w++)>>>0;return"bau"+b},Te=(u,w,b,A)=>{const d=u.createElement("style");d.id=b,d.append(A),(w??u.head).append(d)},_e=(u,w)=>u.reduce((b,A,d)=>b+A+(w[d]??""),"");function Re(u){let{document:w}=(u==null?void 0:u.window)??window;const b=A=>(d,...x)=>{const N=_e(d,x),C=Be(N);return!w.getElementById(C)&&Te(w,u==null?void 0:u.target,C,A(C,N)),C};return{css:b((A,d)=>`.${A} { ${d} }`),keyframes:b((A,d)=>`@keyframes ${A} { ${d} }`),createGlobalStyles:b((A,d)=>d)}}const be=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Ie=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Le=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],De=u=>`var(--color-${u})`,Ue=u=>`var(--color-${u}-lightest)`,Fe=()=>be.map(([u])=>`
.outline.${u} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${u} {
  background-color: ${Ue(u)};
}
.solid.${u} {
  background-color: ${De(u)};
}
`).join(`
`),qe=()=>be.map(([u])=>[`--color-${u}-s: var(--color-${u}-dark-s);`]).join(`
`),Ge=u=>100-u*10,ze=()=>new Array(10).fill("").map((u,w)=>`--color-gray-${w*100}: hsl(0, 0%, ${Ge(w)}%);`).join(`
`),Ee=({dark:u})=>new Array(10).fill("").map((w,b)=>`--color-emphasis-${b*100}: var(--color-gray-${u?1e3-b*100:b*100});`).join(`
`),je=([u,{h:w,s:b,l:A}])=>[`--color-${u}-h: ${w};`,`--color-${u}-l: ${A};`,`--color-${u}-base-s: ${b};`,`--color-${u}-s: var(--color-${u}-base-s);`,`--color-${u}-dark-s: calc(${b} - 25%);`,`--color-${u}-hsl: var(--color-${u}-h), var(--color-${u}-s), var(--color-${u}-l);`,`--color-${u}: hsl(var(--color-${u}-hsl));`,...Ie.map(([d,x])=>`--color-${u}-${d}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${x}));`),...Le.map(([d,x])=>`--color-${u}-${d}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${x}));`),`--color-${u}-contrast-background: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) / var(--contrast-background-value)));`,`--color-${u}-contrast-foreground: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * var(--contrast-foreground-value)));`].join(`
`);function He({createGlobalStyles:u},{colorPalette:w=be}={}){u`
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
      ${w.map(([b,A])=>je([b,A])).join(`
`)}
      ${ze()}
      ${Ee({})}
      ${Fe()}
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
      ${qe()}
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
  `}function Ve(u){const w=Me(),b=Re({target:window.document.getElementById("bau-css")});return He(b),{bau:w,...b,tr:A=>A,window,...u}}var We=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,me=Math.ceil,K=Math.floor,V="[BigNumber Error] ",Ne=V+"Number primitive has more than 15 significant digits: ",Z=1e14,S=14,we=9007199254740991,ve=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],ie=1e7,L=1e9;function $e(u){var w,b,A,d=p.prototype={constructor:p,toString:null,valueOf:null},x=new p(1),N=20,C=4,T=-7,B=21,_=-1e7,R=1e7,I=!1,Q=1,W=0,oe={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},F="0123456789abcdefghijklmnopqrstuvwxyz",q=!0;function p(e,t){var i,f,s,c,h,r,n,l,o=this;if(!(o instanceof p))return new p(e,t);if(t==null){if(e&&e._isBigNumber===!0){o.s=e.s,!e.c||e.e>R?o.c=o.e=null:e.e<_?o.c=[o.e=0]:(o.e=e.e,o.c=e.c.slice());return}if((r=typeof e=="number")&&e*0==0){if(o.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,h=e;h>=10;h/=10,c++);c>R?o.c=o.e=null:(o.e=c,o.c=[e]);return}l=String(e)}else{if(!We.test(l=String(e)))return A(o,l,r);o.s=l.charCodeAt(0)==45?(l=l.slice(1),-1):1}(c=l.indexOf("."))>-1&&(l=l.replace(".","")),(h=l.search(/e/i))>0?(c<0&&(c=h),c+=+l.slice(h+1),l=l.substring(0,h)):c<0&&(c=l.length)}else{if(k(t,2,F.length,"Base"),t==10&&q)return o=new p(e),D(o,N+o.e+1,C);if(l=String(e),r=typeof e=="number"){if(e*0!=0)return A(o,l,r,t);if(o.s=1/e<0?(l=l.slice(1),-1):1,p.DEBUG&&l.replace(/^0\.0*|\./,"").length>15)throw Error(Ne+e)}else o.s=l.charCodeAt(0)===45?(l=l.slice(1),-1):1;for(i=F.slice(0,t),c=h=0,n=l.length;h<n;h++)if(i.indexOf(f=l.charAt(h))<0){if(f=="."){if(h>c){c=n;continue}}else if(!s&&(l==l.toUpperCase()&&(l=l.toLowerCase())||l==l.toLowerCase()&&(l=l.toUpperCase()))){s=!0,h=-1,c=0;continue}return A(o,String(e),r,t)}r=!1,l=b(l,t,10,o.s),(c=l.indexOf("."))>-1?l=l.replace(".",""):c=l.length}for(h=0;l.charCodeAt(h)===48;h++);for(n=l.length;l.charCodeAt(--n)===48;);if(l=l.slice(h,++n)){if(n-=h,r&&p.DEBUG&&n>15&&(e>we||e!==K(e)))throw Error(Ne+o.s*e);if((c=c-h-1)>R)o.c=o.e=null;else if(c<_)o.c=[o.e=0];else{if(o.e=c,o.c=[],h=(c+1)%S,c<0&&(h+=S),h<n){for(h&&o.c.push(+l.slice(0,h)),n-=S;h<n;)o.c.push(+l.slice(h,h+=S));h=S-(l=l.slice(h)).length}else h-=n;for(;h--;l+="0");o.c.push(+l)}}else o.c=[o.e=0]}p.clone=$e,p.ROUND_UP=0,p.ROUND_DOWN=1,p.ROUND_CEIL=2,p.ROUND_FLOOR=3,p.ROUND_HALF_UP=4,p.ROUND_HALF_DOWN=5,p.ROUND_HALF_EVEN=6,p.ROUND_HALF_CEIL=7,p.ROUND_HALF_FLOOR=8,p.EUCLID=9,p.config=p.set=function(e){var t,i;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(i=e[t],k(i,0,L,t),N=i),e.hasOwnProperty(t="ROUNDING_MODE")&&(i=e[t],k(i,0,8,t),C=i),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(i=e[t],i&&i.pop?(k(i[0],-L,0,t),k(i[1],0,L,t),T=i[0],B=i[1]):(k(i,-L,L,t),T=-(B=i<0?-i:i))),e.hasOwnProperty(t="RANGE"))if(i=e[t],i&&i.pop)k(i[0],-L,-1,t),k(i[1],1,L,t),_=i[0],R=i[1];else if(k(i,-L,L,t),i)_=-(R=i<0?-i:i);else throw Error(V+t+" cannot be zero: "+i);if(e.hasOwnProperty(t="CRYPTO"))if(i=e[t],i===!!i)if(i)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))I=i;else throw I=!i,Error(V+"crypto unavailable");else I=i;else throw Error(V+t+" not true or false: "+i);if(e.hasOwnProperty(t="MODULO_MODE")&&(i=e[t],k(i,0,9,t),Q=i),e.hasOwnProperty(t="POW_PRECISION")&&(i=e[t],k(i,0,L,t),W=i),e.hasOwnProperty(t="FORMAT"))if(i=e[t],typeof i=="object")oe=i;else throw Error(V+t+" not an object: "+i);if(e.hasOwnProperty(t="ALPHABET"))if(i=e[t],typeof i=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(i))q=i.slice(0,10)=="0123456789",F=i;else throw Error(V+t+" invalid: "+i)}else throw Error(V+"Object expected: "+e);return{DECIMAL_PLACES:N,ROUNDING_MODE:C,EXPONENTIAL_AT:[T,B],RANGE:[_,R],CRYPTO:I,MODULO_MODE:Q,POW_PRECISION:W,FORMAT:oe,ALPHABET:F}},p.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!p.DEBUG)return!0;var t,i,f=e.c,s=e.e,c=e.s;e:if({}.toString.call(f)=="[object Array]"){if((c===1||c===-1)&&s>=-L&&s<=L&&s===K(s)){if(f[0]===0){if(s===0&&f.length===1)return!0;break e}if(t=(s+1)%S,t<1&&(t+=S),String(f[0]).length==t){for(t=0;t<f.length;t++)if(i=f[t],i<0||i>=Z||i!==K(i))break e;if(i!==0)return!0}}}else if(f===null&&s===null&&(c===null||c===1||c===-1))return!0;throw Error(V+"Invalid BigNumber: "+e)},p.maximum=p.max=function(){return se(arguments,-1)},p.minimum=p.min=function(){return se(arguments,1)},p.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return K(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(i){var f,s,c,h,r,n=0,l=[],o=new p(x);if(i==null?i=N:k(i,0,L),h=me(i/S),I)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(h*=2));n<h;)r=f[n]*131072+(f[n+1]>>>11),r>=9e15?(s=crypto.getRandomValues(new Uint32Array(2)),f[n]=s[0],f[n+1]=s[1]):(l.push(r%1e14),n+=2);n=h/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(h*=7);n<h;)r=(f[n]&31)*281474976710656+f[n+1]*1099511627776+f[n+2]*4294967296+f[n+3]*16777216+(f[n+4]<<16)+(f[n+5]<<8)+f[n+6],r>=9e15?crypto.randomBytes(7).copy(f,n):(l.push(r%1e14),n+=7);n=h/7}else throw I=!1,Error(V+"crypto unavailable");if(!I)for(;n<h;)r=t(),r<9e15&&(l[n++]=r%1e14);for(h=l[--n],i%=S,h&&i&&(r=ve[S-i],l[n]=K(h/r)*r);l[n]===0;l.pop(),n--);if(n<0)l=[c=0];else{for(c=-1;l[0]===0;l.splice(0,1),c-=S);for(n=1,r=l[0];r>=10;r/=10,n++);n<S&&(c-=S-n)}return o.e=c,o.c=l,o}}(),p.sum=function(){for(var e=1,t=arguments,i=new p(t[0]);e<t.length;)i=i.plus(t[e++]);return i},b=function(){var e="0123456789";function t(i,f,s,c){for(var h,r=[0],n,l=0,o=i.length;l<o;){for(n=r.length;n--;r[n]*=f);for(r[0]+=c.indexOf(i.charAt(l++)),h=0;h<r.length;h++)r[h]>s-1&&(r[h+1]==null&&(r[h+1]=0),r[h+1]+=r[h]/s|0,r[h]%=s)}return r.reverse()}return function(i,f,s,c,h){var r,n,l,o,a,m,g,E,v=i.indexOf("."),y=N,O=C;for(v>=0&&(o=W,W=0,i=i.replace(".",""),E=new p(f),m=E.pow(i.length-v),W=o,E.c=t(ne(Y(m.c),m.e,"0"),10,s,e),E.e=E.c.length),g=t(i,f,s,h?(r=F,e):(r=e,F)),l=o=g.length;g[--o]==0;g.pop());if(!g[0])return r.charAt(0);if(v<0?--l:(m.c=g,m.e=l,m.s=c,m=w(m,E,y,O,s),g=m.c,a=m.r,l=m.e),n=l+y+1,v=g[n],o=s/2,a=a||n<0||g[n+1]!=null,a=O<4?(v!=null||a)&&(O==0||O==(m.s<0?3:2)):v>o||v==o&&(O==4||a||O==6&&g[n-1]&1||O==(m.s<0?8:7)),n<1||!g[0])i=a?ne(r.charAt(1),-y,r.charAt(0)):r.charAt(0);else{if(g.length=n,a)for(--s;++g[--n]>s;)g[n]=0,n||(++l,g=[1].concat(g));for(o=g.length;!g[--o];);for(v=0,i="";v<=o;i+=r.charAt(g[v++]));i=ne(i,l,r.charAt(0))}return i}}(),w=function(){function e(f,s,c){var h,r,n,l,o=0,a=f.length,m=s%ie,g=s/ie|0;for(f=f.slice();a--;)n=f[a]%ie,l=f[a]/ie|0,h=g*n+l*m,r=m*n+h%ie*ie+o,o=(r/c|0)+(h/ie|0)+g*l,f[a]=r%c;return o&&(f=[o].concat(f)),f}function t(f,s,c,h){var r,n;if(c!=h)n=c>h?1:-1;else for(r=n=0;r<c;r++)if(f[r]!=s[r]){n=f[r]>s[r]?1:-1;break}return n}function i(f,s,c,h){for(var r=0;c--;)f[c]-=r,r=f[c]<s[c]?1:0,f[c]=r*h+f[c]-s[c];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,s,c,h,r){var n,l,o,a,m,g,E,v,y,O,$,P,re,ee,te,G,z,U=f.s==s.s?1:-1,j=f.c,M=s.c;if(!j||!j[0]||!M||!M[0])return new p(!f.s||!s.s||(j?M&&j[0]==M[0]:!M)?NaN:j&&j[0]==0||!M?U*0:U/0);for(v=new p(U),y=v.c=[],l=f.e-s.e,U=c+l+1,r||(r=Z,l=J(f.e/S)-J(s.e/S),U=U/S|0),o=0;M[o]==(j[o]||0);o++);if(M[o]>(j[o]||0)&&l--,U<0)y.push(1),a=!0;else{for(ee=j.length,G=M.length,o=0,U+=2,m=K(r/(M[0]+1)),m>1&&(M=e(M,m,r),j=e(j,m,r),G=M.length,ee=j.length),re=G,O=j.slice(0,G),$=O.length;$<G;O[$++]=0);z=M.slice(),z=[0].concat(z),te=M[0],M[1]>=r/2&&te++;do{if(m=0,n=t(M,O,G,$),n<0){if(P=O[0],G!=$&&(P=P*r+(O[1]||0)),m=K(P/te),m>1)for(m>=r&&(m=r-1),g=e(M,m,r),E=g.length,$=O.length;t(g,O,E,$)==1;)m--,i(g,G<E?z:M,E,r),E=g.length,n=1;else m==0&&(n=m=1),g=M.slice(),E=g.length;if(E<$&&(g=[0].concat(g)),i(O,g,$,r),$=O.length,n==-1)for(;t(M,O,G,$)<1;)m++,i(O,G<$?z:M,$,r),$=O.length}else n===0&&(m++,O=[0]);y[o++]=m,O[0]?O[$++]=j[re]||0:(O=[j[re]],$=1)}while((re++<ee||O[0]!=null)&&U--);a=O[0]!=null,y[0]||y.splice(0,1)}if(r==Z){for(o=1,U=y[0];U>=10;U/=10,o++);D(v,c+(v.e=o+l*S-1)+1,h,a)}else v.e=l,v.r=+a;return v}}();function le(e,t,i,f){var s,c,h,r,n;if(i==null?i=C:k(i,0,8),!e.c)return e.toString();if(s=e.c[0],h=e.e,t==null)n=Y(e.c),n=f==1||f==2&&(h<=T||h>=B)?he(n,h):ne(n,h,"0");else if(e=D(new p(e),t,i),c=e.e,n=Y(e.c),r=n.length,f==1||f==2&&(t<=c||c<=T)){for(;r<t;n+="0",r++);n=he(n,c)}else if(t-=h,n=ne(n,c,"0"),c+1>r){if(--t>0)for(n+=".";t--;n+="0");}else if(t+=c-r,t>0)for(c+1==r&&(n+=".");t--;n+="0");return e.s<0&&s?"-"+n:n}function se(e,t){for(var i,f,s=1,c=new p(e[0]);s<e.length;s++)f=new p(e[s]),(!f.s||(i=ae(c,f))===t||i===0&&c.s===t)&&(c=f);return c}function X(e,t,i){for(var f=1,s=t.length;!t[--s];t.pop());for(s=t[0];s>=10;s/=10,f++);return(i=f+i*S-1)>R?e.c=e.e=null:i<_?e.c=[e.e=0]:(e.e=i,e.c=t),e}A=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,i=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,s=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(c,h,r,n){var l,o=r?h:h.replace(s,"");if(f.test(o))c.s=isNaN(o)?null:o<0?-1:1;else{if(!r&&(o=o.replace(e,function(a,m,g){return l=(g=g.toLowerCase())=="x"?16:g=="b"?2:8,!n||n==l?m:a}),n&&(l=n,o=o.replace(t,"$1").replace(i,"0.$1")),h!=o))return new p(o,l);if(p.DEBUG)throw Error(V+"Not a"+(n?" base "+n:"")+" number: "+h);c.s=null}c.c=c.e=null}}();function D(e,t,i,f){var s,c,h,r,n,l,o,a=e.c,m=ve;if(a){e:{for(s=1,r=a[0];r>=10;r/=10,s++);if(c=t-s,c<0)c+=S,h=t,n=a[l=0],o=K(n/m[s-h-1]%10);else if(l=me((c+1)/S),l>=a.length)if(f){for(;a.length<=l;a.push(0));n=o=0,s=1,c%=S,h=c-S+1}else break e;else{for(n=r=a[l],s=1;r>=10;r/=10,s++);c%=S,h=c-S+s,o=h<0?0:K(n/m[s-h-1]%10)}if(f=f||t<0||a[l+1]!=null||(h<0?n:n%m[s-h-1]),f=i<4?(o||f)&&(i==0||i==(e.s<0?3:2)):o>5||o==5&&(i==4||f||i==6&&(c>0?h>0?n/m[s-h]:0:a[l-1])%10&1||i==(e.s<0?8:7)),t<1||!a[0])return a.length=0,f?(t-=e.e+1,a[0]=m[(S-t%S)%S],e.e=-t||0):a[0]=e.e=0,e;if(c==0?(a.length=l,r=1,l--):(a.length=l+1,r=m[S-c],a[l]=h>0?K(n/m[s-h]%m[h])*r:0),f)for(;;)if(l==0){for(c=1,h=a[0];h>=10;h/=10,c++);for(h=a[0]+=r,r=1;h>=10;h/=10,r++);c!=r&&(e.e++,a[0]==Z&&(a[0]=1));break}else{if(a[l]+=r,a[l]!=Z)break;a[l--]=0,r=1}for(c=a.length;a[--c]===0;a.pop());}e.e>R?e.c=e.e=null:e.e<_&&(e.c=[e.e=0])}return e}function H(e){var t,i=e.e;return i===null?e.toString():(t=Y(e.c),t=i<=T||i>=B?he(t,i):ne(t,i,"0"),e.s<0?"-"+t:t)}return d.absoluteValue=d.abs=function(){var e=new p(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,t){return ae(this,new p(e,t))},d.decimalPlaces=d.dp=function(e,t){var i,f,s,c=this;if(e!=null)return k(e,0,L),t==null?t=C:k(t,0,8),D(new p(c),e+c.e+1,t);if(!(i=c.c))return null;if(f=((s=i.length-1)-J(this.e/S))*S,s=i[s])for(;s%10==0;s/=10,f--);return f<0&&(f=0),f},d.dividedBy=d.div=function(e,t){return w(this,new p(e,t),N,C)},d.dividedToIntegerBy=d.idiv=function(e,t){return w(this,new p(e,t),0,1)},d.exponentiatedBy=d.pow=function(e,t){var i,f,s,c,h,r,n,l,o,a=this;if(e=new p(e),e.c&&!e.isInteger())throw Error(V+"Exponent not an integer: "+H(e));if(t!=null&&(t=new p(t)),r=e.e>14,!a.c||!a.c[0]||a.c[0]==1&&!a.e&&a.c.length==1||!e.c||!e.c[0])return o=new p(Math.pow(+H(a),r?e.s*(2-ue(e)):+H(e))),t?o.mod(t):o;if(n=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new p(NaN);f=!n&&a.isInteger()&&t.isInteger(),f&&(a=a.mod(t))}else{if(e.e>9&&(a.e>0||a.e<-1||(a.e==0?a.c[0]>1||r&&a.c[1]>=24e7:a.c[0]<8e13||r&&a.c[0]<=9999975e7)))return c=a.s<0&&ue(e)?-0:0,a.e>-1&&(c=1/c),new p(n?1/c:c);W&&(c=me(W/S+2))}for(r?(i=new p(.5),n&&(e.s=1),l=ue(e)):(s=Math.abs(+H(e)),l=s%2),o=new p(x);;){if(l){if(o=o.times(a),!o.c)break;c?o.c.length>c&&(o.c.length=c):f&&(o=o.mod(t))}if(s){if(s=K(s/2),s===0)break;l=s%2}else if(e=e.times(i),D(e,e.e+1,1),e.e>14)l=ue(e);else{if(s=+H(e),s===0)break;l=s%2}a=a.times(a),c?a.c&&a.c.length>c&&(a.c.length=c):f&&(a=a.mod(t))}return f?o:(n&&(o=x.div(o)),t?o.mod(t):c?D(o,W,C,h):o)},d.integerValue=function(e){var t=new p(this);return e==null?e=C:k(e,0,8),D(t,t.e+1,e)},d.isEqualTo=d.eq=function(e,t){return ae(this,new p(e,t))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,t){return ae(this,new p(e,t))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,t){return(t=ae(this,new p(e,t)))===1||t===0},d.isInteger=function(){return!!this.c&&J(this.e/S)>this.c.length-2},d.isLessThan=d.lt=function(e,t){return ae(this,new p(e,t))<0},d.isLessThanOrEqualTo=d.lte=function(e,t){return(t=ae(this,new p(e,t)))===-1||t===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,t){var i,f,s,c,h=this,r=h.s;if(e=new p(e,t),t=e.s,!r||!t)return new p(NaN);if(r!=t)return e.s=-t,h.plus(e);var n=h.e/S,l=e.e/S,o=h.c,a=e.c;if(!n||!l){if(!o||!a)return o?(e.s=-t,e):new p(a?h:NaN);if(!o[0]||!a[0])return a[0]?(e.s=-t,e):new p(o[0]?h:C==3?-0:0)}if(n=J(n),l=J(l),o=o.slice(),r=n-l){for((c=r<0)?(r=-r,s=o):(l=n,s=a),s.reverse(),t=r;t--;s.push(0));s.reverse()}else for(f=(c=(r=o.length)<(t=a.length))?r:t,r=t=0;t<f;t++)if(o[t]!=a[t]){c=o[t]<a[t];break}if(c&&(s=o,o=a,a=s,e.s=-e.s),t=(f=a.length)-(i=o.length),t>0)for(;t--;o[i++]=0);for(t=Z-1;f>r;){if(o[--f]<a[f]){for(i=f;i&&!o[--i];o[i]=t);--o[i],o[f]+=Z}o[f]-=a[f]}for(;o[0]==0;o.splice(0,1),--l);return o[0]?X(e,o,l):(e.s=C==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,t){var i,f,s=this;return e=new p(e,t),!s.c||!e.s||e.c&&!e.c[0]?new p(NaN):!e.c||s.c&&!s.c[0]?new p(s):(Q==9?(f=e.s,e.s=1,i=w(s,e,0,3),e.s=f,i.s*=f):i=w(s,e,0,Q),e=s.minus(i.times(e)),!e.c[0]&&Q==1&&(e.s=s.s),e)},d.multipliedBy=d.times=function(e,t){var i,f,s,c,h,r,n,l,o,a,m,g,E,v,y,O=this,$=O.c,P=(e=new p(e,t)).c;if(!$||!P||!$[0]||!P[0])return!O.s||!e.s||$&&!$[0]&&!P||P&&!P[0]&&!$?e.c=e.e=e.s=null:(e.s*=O.s,!$||!P?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=J(O.e/S)+J(e.e/S),e.s*=O.s,n=$.length,a=P.length,n<a&&(E=$,$=P,P=E,s=n,n=a,a=s),s=n+a,E=[];s--;E.push(0));for(v=Z,y=ie,s=a;--s>=0;){for(i=0,m=P[s]%y,g=P[s]/y|0,h=n,c=s+h;c>s;)l=$[--h]%y,o=$[h]/y|0,r=g*l+o*m,l=m*l+r%y*y+E[c]+i,i=(l/v|0)+(r/y|0)+g*o,E[c--]=l%v;E[c]=i}return i?++f:E.splice(0,1),X(e,E,f)},d.negated=function(){var e=new p(this);return e.s=-e.s||null,e},d.plus=function(e,t){var i,f=this,s=f.s;if(e=new p(e,t),t=e.s,!s||!t)return new p(NaN);if(s!=t)return e.s=-t,f.minus(e);var c=f.e/S,h=e.e/S,r=f.c,n=e.c;if(!c||!h){if(!r||!n)return new p(s/0);if(!r[0]||!n[0])return n[0]?e:new p(r[0]?f:s*0)}if(c=J(c),h=J(h),r=r.slice(),s=c-h){for(s>0?(h=c,i=n):(s=-s,i=r),i.reverse();s--;i.push(0));i.reverse()}for(s=r.length,t=n.length,s-t<0&&(i=n,n=r,r=i,t=s),s=0;t;)s=(r[--t]=r[t]+n[t]+s)/Z|0,r[t]=Z===r[t]?0:r[t]%Z;return s&&(r=[s].concat(r),++h),X(e,r,h)},d.precision=d.sd=function(e,t){var i,f,s,c=this;if(e!=null&&e!==!!e)return k(e,1,L),t==null?t=C:k(t,0,8),D(new p(c),e,t);if(!(i=c.c))return null;if(s=i.length-1,f=s*S+1,s=i[s]){for(;s%10==0;s/=10,f--);for(s=i[0];s>=10;s/=10,f++);}return e&&c.e+1>f&&(f=c.e+1),f},d.shiftedBy=function(e){return k(e,-we,we),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,t,i,f,s,c=this,h=c.c,r=c.s,n=c.e,l=N+4,o=new p("0.5");if(r!==1||!h||!h[0])return new p(!r||r<0&&(!h||h[0])?NaN:h?c:1/0);if(r=Math.sqrt(+H(c)),r==0||r==1/0?(t=Y(h),(t.length+n)%2==0&&(t+="0"),r=Math.sqrt(+t),n=J((n+1)/2)-(n<0||n%2),r==1/0?t="5e"+n:(t=r.toExponential(),t=t.slice(0,t.indexOf("e")+1)+n),i=new p(t)):i=new p(r+""),i.c[0]){for(n=i.e,r=n+l,r<3&&(r=0);;)if(s=i,i=o.times(s.plus(w(c,s,l,1))),Y(s.c).slice(0,r)===(t=Y(i.c)).slice(0,r))if(i.e<n&&--r,t=t.slice(r-3,r+1),t=="9999"||!f&&t=="4999"){if(!f&&(D(s,s.e+N+2,0),s.times(s).eq(c))){i=s;break}l+=4,r+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(D(i,i.e+N+2,1),e=!i.times(i).eq(c));break}}return D(i,i.e+N+1,C,e)},d.toExponential=function(e,t){return e!=null&&(k(e,0,L),e++),le(this,e,t,1)},d.toFixed=function(e,t){return e!=null&&(k(e,0,L),e=e+this.e+1),le(this,e,t)},d.toFormat=function(e,t,i){var f,s=this;if(i==null)e!=null&&t&&typeof t=="object"?(i=t,t=null):e&&typeof e=="object"?(i=e,e=t=null):i=oe;else if(typeof i!="object")throw Error(V+"Argument not an object: "+i);if(f=s.toFixed(e,t),s.c){var c,h=f.split("."),r=+i.groupSize,n=+i.secondaryGroupSize,l=i.groupSeparator||"",o=h[0],a=h[1],m=s.s<0,g=m?o.slice(1):o,E=g.length;if(n&&(c=r,r=n,n=c,E-=c),r>0&&E>0){for(c=E%r||r,o=g.substr(0,c);c<E;c+=r)o+=l+g.substr(c,r);n>0&&(o+=l+g.slice(c)),m&&(o="-"+o)}f=a?o+(i.decimalSeparator||"")+((n=+i.fractionGroupSize)?a.replace(new RegExp("\\d{"+n+"}\\B","g"),"$&"+(i.fractionGroupSeparator||"")):a):o}return(i.prefix||"")+f+(i.suffix||"")},d.toFraction=function(e){var t,i,f,s,c,h,r,n,l,o,a,m,g=this,E=g.c;if(e!=null&&(r=new p(e),!r.isInteger()&&(r.c||r.s!==1)||r.lt(x)))throw Error(V+"Argument "+(r.isInteger()?"out of range: ":"not an integer: ")+H(r));if(!E)return new p(g);for(t=new p(x),l=i=new p(x),f=n=new p(x),m=Y(E),c=t.e=m.length-g.e-1,t.c[0]=ve[(h=c%S)<0?S+h:h],e=!e||r.comparedTo(t)>0?c>0?t:l:r,h=R,R=1/0,r=new p(m),n.c[0]=0;o=w(r,t,0,1),s=i.plus(o.times(f)),s.comparedTo(e)!=1;)i=f,f=s,l=n.plus(o.times(s=l)),n=s,t=r.minus(o.times(s=t)),r=s;return s=w(e.minus(i),f,0,1),n=n.plus(s.times(l)),i=i.plus(s.times(f)),n.s=l.s=g.s,c=c*2,a=w(l,f,c,C).minus(g).abs().comparedTo(w(n,i,c,C).minus(g).abs())<1?[l,f]:[n,i],R=h,a},d.toNumber=function(){return+H(this)},d.toPrecision=function(e,t){return e!=null&&k(e,1,L),le(this,e,t,2)},d.toString=function(e){var t,i=this,f=i.s,s=i.e;return s===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=s<=T||s>=B?he(Y(i.c),s):ne(Y(i.c),s,"0"):e===10&&q?(i=D(new p(i),N+s+1,C),t=ne(Y(i.c),i.e,"0")):(k(e,2,F.length,"Base"),t=b(ne(Y(i.c),s,"0"),10,e,f,!0)),f<0&&i.c[0]&&(t="-"+t)),t},d.valueOf=d.toJSON=function(){return H(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,u!=null&&p.set(u),p}function J(u){var w=u|0;return u>0||u===w?w:w-1}function Y(u){for(var w,b,A=1,d=u.length,x=u[0]+"";A<d;){for(w=u[A++]+"",b=S-w.length;b--;w="0"+w);x+=w}for(d=x.length;x.charCodeAt(--d)===48;);return x.slice(0,d+1||1)}function ae(u,w){var b,A,d=u.c,x=w.c,N=u.s,C=w.s,T=u.e,B=w.e;if(!N||!C)return null;if(b=d&&!d[0],A=x&&!x[0],b||A)return b?A?0:-C:N;if(N!=C)return N;if(b=N<0,A=T==B,!d||!x)return A?0:!d^b?1:-1;if(!A)return T>B^b?1:-1;for(C=(T=d.length)<(B=x.length)?T:B,N=0;N<C;N++)if(d[N]!=x[N])return d[N]>x[N]^b?1:-1;return T==B?0:T>B^b?1:-1}function k(u,w,b,A){if(u<w||u>b||u!==K(u))throw Error(V+(A||"Argument")+(typeof u=="number"?u<w||u>b?" out of range: ":" not an integer: ":" not a primitive number: ")+String(u))}function ue(u){var w=u.c.length-1;return J(u.e/S)==w&&u.c[w]%2!=0}function he(u,w){return(u.length>1?u.charAt(0)+"."+u.slice(1):u)+(w<0?"e":"e+")+w}function ne(u,w,b){var A,d;if(w<0){for(d=b+".";++w;d+=b);u=d+u}else if(A=u.length,++w>A){for(d=b,w-=A;--w;d+=b);u+=d}else w<A&&(u=u.slice(0,w)+"."+u.slice(w));return u}var ce=$e();const Xe="en-GB",Ye="GBP",de=u=>new Intl.NumberFormat(Xe,{style:"currency",currency:Ye}).format(u);function Ke(u){const{bau:w,css:b}=u,{h1:A,form:d,p:x,article:N,section:C,header:T,span:B,label:_,input:R,div:I,button:Q,hr:W,img:oe}=w.tags,F=w.state(""),q=w.state(""),p=b`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 400px));
    border-radius: 1rem;
    overflow: hidden;
    margin-inline: 0.5rem;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    > section {
    }

    .calculator-form {
      padding: 1rem;
      background-color: var(--white);
      header {
        display: flex;
        justify-content: space-between;
        button {
          text-decoration: underline;
          background: none;
          color: var(--grey-700);
        }
      }
      form {
        button[type="submit"] {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          &::before {
            content: url("./assets/images/icon-calculator.svg");
          }
          border-radius: 2rem;
        }
      }
    }
    .result-container {
      background-color: var(--white);
    }
    .result {
      padding: 1rem;

      color: var(--grey-100);
      background-color: var(--grey-900);
      border-bottom-left-radius: 4rem;
      display: flex;
      height: 100%;
      flex-direction: column;
      gap: 1rem;
      &.no-result {
        align-items: center;
        > img {
          width: 192px;
          height: 192px;
        }
      }

      p,
      span {
        color: var(--grey-300);
      }
      .payments {
        background-color: var(--grey-1000);
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 0.5rem;
        border-top: 3px solid var(--primary);
        hr {
          border: 1px solid var(--grey-900);
        }
        .monthly-payments-value {
          color: var(--primary);
          font-size: 2.6rem;
          font-weight: 700;
          line-height: 3.5rem;
        }
        .total-payments-value {
          font-size: 2rem;
          line-height: 2.5rem;
          color: var(--grey-100);
        }
      }
    }
  `,le=X=>{X.target.closest("form").reset(),F.val="",q.val},se=X=>{X.preventDefault();const D=Object.fromEntries(new FormData(X.currentTarget)),{amount:H,term:e,rate:t,mortgateType:i}=D;if(i=="repayment"){const f=ce(e.toString()).times(12),s=ce(1).plus(ce(t.toString()).dividedBy(100).dividedBy(12)).pow(f),c=ce(H.toString()).times(ce(t.toString()).dividedBy(100).dividedBy(12)).times(s).dividedBy(s.minus(1));F.val=de(c.toNumber()),q.val=de(c.times(12).times(e.toString()).toNumber())}else if(i=="interestOnly"){const f=ce(H.toString()).times(ce(t.toString()).dividedBy(100).dividedBy(12));F.val=de(f.toNumber()),q.val=de(f.times(e.toString()).times(12).toNumber())}};return function(){return N({class:p},C({class:"calculator-form"},d({onsubmit:se},T(A("Mortgage Calculator"),Q({type:"button",onclick:le},"Clear all")),_(B("Mortgage Amount"),I({class:"input-unit"},B("£"),R({autofocus:!0,name:"amount",type:"number",required:!0}))),I({class:b`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
              `},_("Mortgage Terms",I({class:"input-unit"},R({name:"term",type:"number",required:!0,min:1}),B("years"))),_("Interest Rate",I({class:"input-unit"},R({name:"rate",type:"number",required:!0,step:.1,min:.1}),B("%")))),_("Mortgage Type",I({class:b`
                  > label {
                    display: flex;
                    gap: 0.5rem;
                  }
                `},_(R({type:"radio",name:"mortgateType",value:"repayment",required:!0}),"Repayment"),_(R({type:"radio",name:"mortgateType",value:"interestOnly"}),"Interest Only"))),Q({type:"submit"},"Calculate Repayment"))),C({class:"result-container"},()=>F.val==""?C({class:"result no-result"},oe({src:"./assets/images/illustration-empty.svg",alt:""}),A("Results shown here"),x("Complete the form and click “calculate repayments” to see what your monthly repayments would be.")):C({class:"result ok"},A("Your results"),x("Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again."),I({class:"payments"},I({class:"monthly-payments"},x("Your monthly repayments"),x({class:"monthly-payments-value"},F)),W,I({class:"total-payments"},x("Total you'll repay over the term"),B({class:"total-payments-value"},q))))))}}const Je=Ve(),Qe=u=>{const{bau:w}=u,{main:b}=w.tags,A=Ke(u);return function(){return b(A())}},Ze=Qe(Je);var Se;(Se=document.getElementById("app"))==null||Se.replaceChildren(Ze());
