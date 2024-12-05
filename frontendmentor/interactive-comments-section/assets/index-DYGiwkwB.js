(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))g(d);new MutationObserver(d=>{for(const v of d)if(v.type==="childList")for(const w of v.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&g(w)}).observe(document,{childList:!0,subtree:!0});function h(d){const v={};return d.integrity&&(v.integrity=d.integrity),d.referrerPolicy&&(v.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?v.credentials="include":d.crossOrigin==="anonymous"?v.credentials="omit":v.credentials="same-origin",v}function g(d){if(d.ep)return;d.ep=!0;const v=h(d);fetch(d.href,v)}})();let ee=o=>Object.prototype.toString.call(o??0).slice(8,-1),me=o=>ee(o)=="Object",ne=o=>ee(o)=="Function",Q=o=>["Object","Array"].includes(ee(o)),se=Object.getPrototypeOf,X=o=>Z(o)?o.val:o,oe=o=>Array.isArray(o)?o:[o],Z=o=>o==null?void 0:o.__isState,ge=["splice","push","pop","shift","unshift","sort","reverse"];const pe=o=>!Z(o[0])&&me(o[0])?[o[0],o.slice(1)]:[{},o];function ve(o){let f=window,{document:h}=f,g,d=new Set,v=[],w,T=e=>h.createElement(e),I=(e,t,n)=>{let r=w;w=t;try{return e(n)}catch(s){return console.error(s),n}finally{w=r}},$=()=>{g||(g=f.requestAnimationFrame(()=>{d.forEach(e=>{e.bindings=e.bindings.filter(({element:t})=>{var n;return(n=Array.isArray(t)?t[0]:t)==null?void 0:n.isConnected}),!e.bindings.length&&!e.computed&&d.delete(e)}),g=void 0}))},j=(e,t)=>{!v.length&&f.requestAnimationFrame(D),v.push([e,t])};const D=()=>{let e=0,t=v.length;do{for(let n of new Set(v.slice(e,t).flatMap(([r])=>r.listeners)))q(n.computed,n.state);e=t,t=v.length}while(e<t);for(let n of new Set(v.flatMap(([r,s])=>r.bindings.map(a=>(a.op=s,a)))))F(n);v=[],$()};let F=e=>{var U;const{deps:t,element:n,renderInferred:r,render:s,renderItem:a,isAttribute:l,op:p=[]}=e,[i,c,m,E,A=[]]=p;if(i&&a)!A.length&&((U=B(n,m,(...N)=>H(a(...N)),c,E,A)[i])==null||U.call());else{let N=r?r({element:n}):s({element:n,renderItem:a})(...t.map(X));if(N!==n&&!l){let C=oe(e.element=H(N)),y=oe(n),x=0;for(;x<y.length&&x<C.length;x++)y[x].replaceWith(H(C[x]));let L=x;for(;C.length>L;)C[L-1].after(C[L]),L++;for(;y.length>x;)y[x].remove(),x++}}},O=(e,t,n=[])=>({get(r,s,a){var l,p;if((l=w==null?void 0:w.g)==null||l.add(e),s==="_isProxy")return!0;if(!((p=r[s])!=null&&p._isProxy)&&!Z(r[s])&&Q(r[s]))r[s]=new Proxy(r[s],O(e,t,[...n,s]));else if(ge.includes(s)){let i=r[s];return(...c)=>{let m=i.apply(r,c);return j(e,[s,m,c,t,n]),m}}return Reflect.get(r,s,a)},set(r,s,a,l){let p=Reflect.set(r,s,a,l);return j(e,["setItem",p,{prop:s,value:a},t,[...n,s]]),p}}),M=(e,t)=>new Proxy(t,O(e,t)),B=(e,t,n,r,s,a)=>{let l=()=>{if(r.length==0)e.textContent="";else{for(var i=0;i<r.length&&i<e.children.length;i++){const m=e.children[i];m!=null&&m.bauUpdate?m.bauUpdate(m,r[i]):m.replaceWith(n(r[i],i))}let c=e.children[i];if(c)for(;c;){const m=c.nextSibling;c.remove(),c=m}else for(;i<r.length;i++)e.appendChild(n(r[i],i))}},p=i=>e[i]&&e.removeChild(e[i]);return{assign:l,sort:l,reverse:l,setItem:()=>{let i=a[0],c=e.children[i],m=s[i];c&&(c!=null&&c.bauUpdate?c.bauUpdate(c,m):c.replaceWith(n(m,i)))},push:()=>{for(let i=0;i<t.length;i++)e.appendChild(n(t[i],s.length+i))},unshift:()=>{for(let i=t.length-1;i>=0;i--)e.prepend(n(t[i]))},pop:()=>p("lastChild"),shift:()=>p("firstChild"),splice:()=>{const{length:i}=e.children;let[c,m=i,...E]=t;for(let A=c>=0?Math.min(c+m-1,i-1):i-1;A>=(c>=0?c:i+c);A--)e.children[A].remove();if(E.length){let A=E.map((U,N)=>n(U,c+N));e.children[c]?e.children[c].before(...A):e.append(...A)}}}},Y=(e,{onUpdate:t,name:n}={})=>({name:n,rawVal:e,bindings:[],listeners:[],__isState:!0,get val(){var s;let r=this;return(s=w==null?void 0:w.g)==null||s.add(r),r.valProxy??(r.valProxy=Q(e)?M(r,e):e,r.valProxy)},set val(r){var l;let s=this,a=s.rawVal;(l=w==null?void 0:w.s)==null||l.add(s),t==null||t(a,r),s.rawVal=r,Q(r)?(s.valProxy=M(s,r),j(s,["assign",r])):r!==a&&(s.valProxy=r,s.bindings.length+s.listeners.length&&j(s))}}),H=e=>{if(e==null||e===!1){let t=T("span");return t.style.display="none",t}else return e.nodeType?e:Array.isArray(e)?e.map(H):h.createTextNode(e)},q=(e,t)=>{let n={g:new Set,s:new Set};return t.val=I(e,n),n},V=(e,t)=>{let n=Y(void 0,t),r=q(e,n);n.computed=!0;let s={computed:e,state:n};for(let a of new Set([...r.g].filter(l=>!r.s.has(l)&&l.listeners.every(p=>!r.g.has(p.state)))))a.listeners.push(s);return n},W=(e,t=[])=>{for(let n of t)if(Array.isArray(n))W(e,n);else if(n!=null){let r=Z(n)?k({deps:[n],render:()=>s=>s}):ne(n)?G(n):H(n);Array.isArray(r)?e.append(...r):e.appendChild(r)}},_={},P=(e,t)=>e&&(Object.getOwnPropertyDescriptor(e,t)??P(se(e),t)),R=(e,t,n)=>{var r;return _[e+","+t]??(_[e+","+t]=((r=P(n,t))==null?void 0:r.set)??0)},z=(e,t)=>new f.MutationObserver((n,r)=>{n.filter(s=>s.removedNodes).forEach(s=>[...s.removedNodes].find(a=>a===e&&(t({element:e}),r.disconnect(),!0)))}).observe(e.parentNode,{childList:!0}),J=(e,t)=>new f.MutationObserver((n,r)=>n.forEach(s=>t({record:s,element:e}))).observe(e,{childList:!0}),S=e=>new Proxy(function(n,...r){var p;let[s,a]=pe(r),l=e?h.createElementNS(e,n):T(n);for(let[i,c]of Object.entries(s))if(i=="bauUpdate")l[i]=c;else if(!i.startsWith("bau")){let m=R(n,i,se(l))?E=>E!==void 0&&(l[i]=E):E=>l.setAttribute(i,Array.isArray(E)?E.filter(A=>A).join(" "):E);c==null||(Z(c)?k({deps:[c],render:()=>()=>(m(c.val),l)},!0):ne(c)&&(!i.startsWith("on")||c.isDerived)?G(()=>(m(c({element:l})),l),!0):c.renderProp?k({deps:c.deps,render:()=>()=>(m(c.renderProp({element:l})(...c.deps.map(X))),l)},!0):m(c))}return s.bauChildMutated&&J(l,s.bauChildMutated),W(l,a),l.autofocus&&l.focus&&f.requestAnimationFrame(()=>l.focus()),(p=s.bauCreated)==null||p.call(s,{element:l}),s.bauMounted&&f.requestAnimationFrame(()=>s.bauMounted({element:l})),s.bauUnmounted&&f.requestAnimationFrame(()=>z(l,s.bauUnmounted)),l},{get:(t,n)=>t.bind(void 0,n)}),b=(e,t,n,r)=>{e.element=H(n),e.isAttribute=r;for(let s of t.g)Z(s)&&(d.add(s),s.bindings.push(e));return e.element},G=(e,t)=>{let n={g:new Set,s:new Set},r=I(e,n,{});return b({renderInferred:e},n,r,t)},k=({deps:e,element:t,render:n,renderItem:r},s)=>b({deps:e,render:n,renderItem:r},{g:new Set(e),s:new Set},n({element:t,renderItem:r})(...e.map(X)),s),u=(e,t,n)=>k({deps:[e],render:({renderItem:r})=>s=>{for(let a=0;a<s.length;a++)t.appendChild(r(s[a],a));return t},renderItem:n});return{tags:S(),tagsNS:S,state:Y,bind:k,loop:u,derive:V,stateSet:d}}const be=o=>{let f=0,h=11;for(;f<o.length;)h=101*h+o.charCodeAt(f++)>>>0;return"bau"+h},ye=(o,f,h,g)=>{const d=o.createElement("style");d.id=h,d.append(g),(f??o.head).append(d)},we=(o,f)=>o.reduce((h,g,d)=>h+g+(f[d]??""),"");function $e(o){let{document:f}=(o==null?void 0:o.window)??window;const h=g=>(d,...v)=>{const w=we(d,v),T=be(w);return!f.getElementById(T)&&ye(f,o==null?void 0:o.target,T,g(T,w)),T};return{css:h((g,d)=>`.${g} { ${d} }`),keyframes:h((g,d)=>`@keyframes ${g} { ${d} }`),createGlobalStyles:h((g,d)=>d)}}const te=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],xe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Me=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Se=o=>`var(--color-${o})`,ke=o=>`var(--color-${o}-lightest)`,De=()=>te.map(([o])=>`
.outline.${o} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${o} {
  background-color: ${ke(o)};
}
.solid.${o} {
  background-color: ${Se(o)};
}
`).join(`
`),Ce=()=>te.map(([o])=>[`--color-${o}-s: var(--color-${o}-dark-s);`]).join(`
`),Oe=o=>100-o*10,Ae=()=>new Array(10).fill("").map((o,f)=>`--color-gray-${f*100}: hsl(0, 0%, ${Oe(f)}%);`).join(`
`),ae=({dark:o})=>new Array(10).fill("").map((f,h)=>`--color-emphasis-${h*100}: var(--color-gray-${o?1e3-h*100:h*100});`).join(`
`),Te=([o,{h:f,s:h,l:g}])=>[`--color-${o}-h: ${f};`,`--color-${o}-l: ${g};`,`--color-${o}-base-s: ${h};`,`--color-${o}-s: var(--color-${o}-base-s);`,`--color-${o}-dark-s: calc(${h} - 25%);`,`--color-${o}-hsl: var(--color-${o}-h), var(--color-${o}-s), var(--color-${o}-l);`,`--color-${o}: hsl(var(--color-${o}-hsl));`,...xe.map(([d,v])=>`--color-${o}-${d}: hsl(var(--color-${o}-h), var(--color-${o}-s), calc(var(--color-${o}-l) * ${v}));`),...Me.map(([d,v])=>`--color-${o}-${d}: hsl(var(--color-${o}-h), var(--color-${o}-s), calc(var(--color-${o}-l) * ${v}));`),`--color-${o}-contrast-background: hsl(var(--color-${o}-h), var(--color-${o}-s), calc(var(--color-${o}-l) / var(--contrast-background-value)));`,`--color-${o}-contrast-foreground: hsl(var(--color-${o}-h), var(--color-${o}-s), calc(var(--color-${o}-l) * var(--contrast-foreground-value)));`].join(`
`);function je({createGlobalStyles:o},{colorPalette:f=te}={}){o`
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
      ${f.map(([h,g])=>Te([h,g])).join(`
`)}
      ${Ae()}
      ${ae({})}
      ${De()}
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
      ${Ce()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ae({dark:!0})};
    }
  `}function Ee(o){const f=ve(),h=$e({target:window.document.getElementById("bau-css")});return je(h),{bau:f,...h,tr:g=>g,window,...o}}var le=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ce(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var ue={exports:{}};(function(o,f){(function(h,g){o.exports=g()})(le,function(){var h=1e3,g=6e4,d=36e5,v="millisecond",w="second",T="minute",I="hour",$="day",j="week",D="month",F="quarter",O="year",M="date",B="Invalid Date",Y=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,H=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,q={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(u){var e=["th","st","nd","rd"],t=u%100;return"["+u+(e[(t-20)%10]||e[t]||e[0])+"]"}},V=function(u,e,t){var n=String(u);return!n||n.length>=e?u:""+Array(e+1-n.length).join(t)+u},W={s:V,z:function(u){var e=-u.utcOffset(),t=Math.abs(e),n=Math.floor(t/60),r=t%60;return(e<=0?"+":"-")+V(n,2,"0")+":"+V(r,2,"0")},m:function u(e,t){if(e.date()<t.date())return-u(t,e);var n=12*(t.year()-e.year())+(t.month()-e.month()),r=e.clone().add(n,D),s=t-r<0,a=e.clone().add(n+(s?-1:1),D);return+(-(n+(t-r)/(s?r-a:a-r))||0)},a:function(u){return u<0?Math.ceil(u)||0:Math.floor(u)},p:function(u){return{M:D,y:O,w:j,d:$,D:M,h:I,m:T,s:w,ms:v,Q:F}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(u){return u===void 0}},_="en",P={};P[_]=q;var R="$isDayjsObject",z=function(u){return u instanceof G||!(!u||!u[R])},J=function u(e,t,n){var r;if(!e)return _;if(typeof e=="string"){var s=e.toLowerCase();P[s]&&(r=s),t&&(P[s]=t,r=s);var a=e.split("-");if(!r&&a.length>1)return u(a[0])}else{var l=e.name;P[l]=e,r=l}return!n&&r&&(_=r),r||!n&&_},S=function(u,e){if(z(u))return u.clone();var t=typeof e=="object"?e:{};return t.date=u,t.args=arguments,new G(t)},b=W;b.l=J,b.i=z,b.w=function(u,e){return S(u,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var G=function(){function u(t){this.$L=J(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[R]=!0}var e=u.prototype;return e.parse=function(t){this.$d=function(n){var r=n.date,s=n.utc;if(r===null)return new Date(NaN);if(b.u(r))return new Date;if(r instanceof Date)return new Date(r);if(typeof r=="string"&&!/Z$/i.test(r)){var a=r.match(Y);if(a){var l=a[2]-1||0,p=(a[7]||"0").substring(0,3);return s?new Date(Date.UTC(a[1],l,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)):new Date(a[1],l,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)}}return new Date(r)}(t),this.init()},e.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},e.$utils=function(){return b},e.isValid=function(){return this.$d.toString()!==B},e.isSame=function(t,n){var r=S(t);return this.startOf(n)<=r&&r<=this.endOf(n)},e.isAfter=function(t,n){return S(t)<this.startOf(n)},e.isBefore=function(t,n){return this.endOf(n)<S(t)},e.$g=function(t,n,r){return b.u(t)?this[n]:this.set(r,t)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(t,n){var r=this,s=!!b.u(n)||n,a=b.p(t),l=function(N,C){var y=b.w(r.$u?Date.UTC(r.$y,C,N):new Date(r.$y,C,N),r);return s?y:y.endOf($)},p=function(N,C){return b.w(r.toDate()[N].apply(r.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(C)),r)},i=this.$W,c=this.$M,m=this.$D,E="set"+(this.$u?"UTC":"");switch(a){case O:return s?l(1,0):l(31,11);case D:return s?l(1,c):l(0,c+1);case j:var A=this.$locale().weekStart||0,U=(i<A?i+7:i)-A;return l(s?m-U:m+(6-U),c);case $:case M:return p(E+"Hours",0);case I:return p(E+"Minutes",1);case T:return p(E+"Seconds",2);case w:return p(E+"Milliseconds",3);default:return this.clone()}},e.endOf=function(t){return this.startOf(t,!1)},e.$set=function(t,n){var r,s=b.p(t),a="set"+(this.$u?"UTC":""),l=(r={},r[$]=a+"Date",r[M]=a+"Date",r[D]=a+"Month",r[O]=a+"FullYear",r[I]=a+"Hours",r[T]=a+"Minutes",r[w]=a+"Seconds",r[v]=a+"Milliseconds",r)[s],p=s===$?this.$D+(n-this.$W):n;if(s===D||s===O){var i=this.clone().set(M,1);i.$d[l](p),i.init(),this.$d=i.set(M,Math.min(this.$D,i.daysInMonth())).$d}else l&&this.$d[l](p);return this.init(),this},e.set=function(t,n){return this.clone().$set(t,n)},e.get=function(t){return this[b.p(t)]()},e.add=function(t,n){var r,s=this;t=Number(t);var a=b.p(n),l=function(c){var m=S(s);return b.w(m.date(m.date()+Math.round(c*t)),s)};if(a===D)return this.set(D,this.$M+t);if(a===O)return this.set(O,this.$y+t);if(a===$)return l(1);if(a===j)return l(7);var p=(r={},r[T]=g,r[I]=d,r[w]=h,r)[a]||1,i=this.$d.getTime()+t*p;return b.w(i,this)},e.subtract=function(t,n){return this.add(-1*t,n)},e.format=function(t){var n=this,r=this.$locale();if(!this.isValid())return r.invalidDate||B;var s=t||"YYYY-MM-DDTHH:mm:ssZ",a=b.z(this),l=this.$H,p=this.$m,i=this.$M,c=r.weekdays,m=r.months,E=r.meridiem,A=function(C,y,x,L){return C&&(C[y]||C(n,s))||x[y].slice(0,L)},U=function(C){return b.s(l%12||12,C,"0")},N=E||function(C,y,x){var L=C<12?"AM":"PM";return x?L.toLowerCase():L};return s.replace(H,function(C,y){return y||function(x){switch(x){case"YY":return String(n.$y).slice(-2);case"YYYY":return b.s(n.$y,4,"0");case"M":return i+1;case"MM":return b.s(i+1,2,"0");case"MMM":return A(r.monthsShort,i,m,3);case"MMMM":return A(m,i);case"D":return n.$D;case"DD":return b.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return A(r.weekdaysMin,n.$W,c,2);case"ddd":return A(r.weekdaysShort,n.$W,c,3);case"dddd":return c[n.$W];case"H":return String(l);case"HH":return b.s(l,2,"0");case"h":return U(1);case"hh":return U(2);case"a":return N(l,p,!0);case"A":return N(l,p,!1);case"m":return String(p);case"mm":return b.s(p,2,"0");case"s":return String(n.$s);case"ss":return b.s(n.$s,2,"0");case"SSS":return b.s(n.$ms,3,"0");case"Z":return a}return null}(C)||a.replace(":","")})},e.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},e.diff=function(t,n,r){var s,a=this,l=b.p(n),p=S(t),i=(p.utcOffset()-this.utcOffset())*g,c=this-p,m=function(){return b.m(a,p)};switch(l){case O:s=m()/12;break;case D:s=m();break;case F:s=m()/3;break;case j:s=(c-i)/6048e5;break;case $:s=(c-i)/864e5;break;case I:s=c/d;break;case T:s=c/g;break;case w:s=c/h;break;default:s=c}return r?s:b.a(s)},e.daysInMonth=function(){return this.endOf(D).$D},e.$locale=function(){return P[this.$L]},e.locale=function(t,n){if(!t)return this.$L;var r=this.clone(),s=J(t,n,!0);return s&&(r.$L=s),r},e.clone=function(){return b.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},u}(),k=G.prototype;return S.prototype=k,[["$ms",v],["$s",w],["$m",T],["$H",I],["$W",$],["$M",D],["$y",O],["$D",M]].forEach(function(u){k[u[1]]=function(e){return this.$g(e,u[0],u[1])}}),S.extend=function(u,e){return u.$i||(u(e,G,S),u.$i=!0),S},S.locale=J,S.isDayjs=z,S.unix=function(u){return S(1e3*u)},S.en=P[_],S.Ls=P,S.p={},S})})(ue);var _e=ue.exports;const de=ce(_e);var fe={exports:{}};(function(o,f){(function(h,g){o.exports=g()})(le,function(){return function(h,g,d){h=h||{};var v=g.prototype,w={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function T($,j,D,F){return v.fromToBase($,j,D,F)}d.en.relativeTime=w,v.fromToBase=function($,j,D,F,O){for(var M,B,Y,H=D.$locale().relativeTime||w,q=h.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],V=q.length,W=0;W<V;W+=1){var _=q[W];_.d&&(M=F?d($).diff(D,_.d,!0):D.diff($,_.d,!0));var P=(h.rounding||Math.round)(Math.abs(M));if(Y=M>0,P<=_.r||!_.r){P<=1&&W>0&&(_=q[W-1]);var R=H[_.l];O&&(P=O(""+P)),B=typeof R=="string"?R.replace("%d",P):R(P,j,_.l,Y);break}}if(j)return B;var z=Y?H.future:H.past;return typeof z=="function"?z(B):z.replace("%s",B)},v.to=function($,j){return T($,j,this,!0)},v.from=function($,j){return T($,j,this)};var I=function($){return $.$u?d.utc():d()};v.toNow=function($){return this.to(I(this),$)},v.fromNow=function($){return this.from(I(this),$)}}})})(fe);var Pe=fe.exports;const Ie=ce(Pe),Ne={image:{png:"./assets/images/avatars/image-juliusomo.png",webp:"./assets/images/avatars/image-juliusomo.webp"},username:"juliusomo"},Le=[{id:1,content:"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",createdAt:"1 month ago",score:12,user:{image:{png:"./assets/images/avatars/image-amyrobson.png",webp:"./assets/images/avatars/image-amyrobson.webp"},username:"amyrobson"},replies:[]},{id:2,content:"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",createdAt:"2 weeks ago",score:5,user:{image:{png:"./assets/images/avatars/image-maxblagun.png",webp:"./assets/images/avatars/image-maxblagun.webp"},username:"maxblagun"},replies:[{id:3,content:"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",createdAt:"1 week ago",score:4,replyingTo:"maxblagun",user:{image:{png:"./assets/images/avatars/image-ramsesmiron.png",webp:"./assets/images/avatars/image-ramsesmiron.webp"},username:"ramsesmiron"}},{id:4,content:"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",createdAt:"2 days ago",score:2,replyingTo:"ramsesmiron",user:{image:{png:"./assets/images/avatars/image-juliusomo.png",webp:"./assets/images/avatars/image-juliusomo.webp"},username:"juliusomo"}}]}],K={currentUser:Ne,comments:Le};de.extend(Ie);function He(o){const{bau:f,css:h}=o,{form:g,ul:d,li:v,header:w,footer:T,img:I,figure:$,figcaption:j,span:D,p:F,div:O,button:M,time:B,textarea:Y,dialog:H,a:q,h1:V}=f.tags,W=h`
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
          border-left: 2px solid var(--Light-grayish-blue);
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
  `,_=({doVote:k})=>({score:u,vote:e})=>O({class:h`
            grid-area: likes;
          `},O({class:h`
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
                color: var(--color-primary-lightest);
                font-size: 1.3rem;
                transition: all 0.3s;
                &:disabled {
                  cursor: not-allowed;
                }
                &:hover,
                &:disabled {
                  color: var(--Moderate-blue);
                }
              }
              & span {
                font-weight: 500;
                font-size: 1.2rem;
                color: var(--Moderate-blue);
              }
            `},M({type:"button",onclick:k("up"),disabled:e=="up"},"+"),D(u),M({type:"button",onclick:k("down"),disabled:e=="down"},"−"))),P=({onclick:k})=>O({class:"reply-button"},M({type:"button",onclick:k},I({src:"./assets/images/icon-reply.svg",alt:""}),"Reply")),R=({onclick:k})=>M({type:"button",onclick:k},I({src:"./assets/images/icon-edit.svg",alt:""}),"Edit"),z=({onclick:k})=>M({class:"danger",type:"button",onclick:k},I({src:"./assets/images/icon-delete.svg",alt:""}),"Delete"),J=({updateComment:k=()=>{},deleteComment:u=()=>{},depth:e=0}={})=>t=>{const n=f.state(!1),r=f.state(!1),s=f.state(t.replies??[]),a=f.state(t),l=({})=>y=>{y.preventDefault();const{content:x}=Object.fromEntries(new FormData(y.target)),L={id:`${new Date().getTime()}`,createdAt:new Date,score:0,user:K.currentUser,content:x};s.val.push(L),n.val=!1},p=y=>g({class:"reply",onsubmit:l(y)},Y({autofocus:!0,required:!0,name:"content",rows:5,placeholder:"Insert a comment"}),$(I({src:K.currentUser.image.webp,alt:K.currentUser.username,width:36,height:36})),O({class:"send-button-container"},M({type:"submit",class:"primary"},"SEND"))),i=({id:y})=>()=>{const x=s.val.findIndex(L=>L.id==y);x>=0&&s.val.splice(x,1),m.close()},m=H(g(w(V("Delete comment")),F("Are you sure you want to delete this comment? This will remove the comment and can't be undone."),T(M({type:"button",class:["neutral","solid"],onclick:()=>m.close()},"NO, CANCEL"),M({type:"button",class:["danger","solid"],onclick:u(t)},"YES, DELETE")))),E=({})=>()=>{m.showModal()},A=({})=>()=>{r.val=!0},U=({id:y})=>x=>{x.preventDefault();const{content:L}=Object.fromEntries(new FormData(x.target)),re=s.val.findIndex(he=>he.id==y);re>=0&&(s.val[re].content=L)},N=y=>[y.replyingTo&&q({href:`/users/${y.replyingTo}`},`@${y.replyingTo}`)," ",y.content],C=y=>g({onsubmit:x=>{k(y)(x),r.val=!1}},Y({name:"content",rows:8,value:y.content,required:!0,autofocus:!0}),T(M({type:"submit",class:["solid","primary"]},"UPDATE")));return v(O({class:"comment"},w($(I({src:t.user.image.webp,height:36,width:36,alt:""}),j(t.user.username)),b(t)&&D({class:"you-badge"},"you"),B(de(t.createdAt).fromNow())),F({class:"content"},()=>r.val?C(t):N(t)),()=>_({doVote:y=>()=>{a.val.vote=y,y=="up"?a.val.score++:a.val.score--}})(a.val),O({class:"controls-button"},b(t)?[z({onclick:E(t)}),()=>r.val?"":R({onclick:A(t)})]:P({onclick:()=>n.val=!n.val})),m),f.loop(s,d({class:"replies"}),J({updateComment:U,deleteComment:i,depth:e+1})),()=>n.val&&p(t))},S=k=>k.sort((u,e)=>e.score>u.score?1:-1),b=k=>k.user.username==K.currentUser.username,G=f.state(S(K.comments));return()=>g({class:W},f.loop(G,d({class:"comments"}),J()))}const We=Ee(),Ue=o=>{const{bau:f}=o,{main:h}=f.tags,g=He(o);return function(){return h(g())}},Fe=Ue(We);var ie;(ie=document.getElementById("app"))==null||ie.replaceChildren(Fe());
