(function(){const g=document.createElement("link").relList;if(g&&g.supports&&g.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))v(d);new MutationObserver(d=>{for(const x of d)if(x.type==="childList")for(const y of x.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&v(y)}).observe(document,{childList:!0,subtree:!0});function w(d){const x={};return d.integrity&&(x.integrity=d.integrity),d.referrerPolicy&&(x.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?x.credentials="include":d.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function v(d){if(d.ep)return;d.ep=!0;const x=w(d);fetch(d.href,x)}})();let xe=a=>Object.prototype.toString.call(a??0).slice(8,-1),_e=a=>xe(a)=="Object",ke=a=>xe(a)=="Function",me=a=>["Object","Array"].includes(xe(a)),Ne=Object.getPrototypeOf,we=a=>se(a)?a.val:a,se=a=>a==null?void 0:a.__isState,Le=["splice","push","pop","shift","unshift","sort","reverse"],fe=(a,g)=>{const w=new Array(a.length);for(let v=0;v<a.length;v++)w[v]=g(a[v],v);return w};const Me=a=>!se(a[0])&&_e(a[0])?a:[{},...a];function Be(a){let g=window,{document:w}=g,v,d=new Set,x=new Set,y=!1,k,A=t=>w.createElement(t),P=(t,i,o)=>{let u=k;k=i;let p=t(o);return k=u,p},F=()=>{v||(v=g.requestAnimationFrame(()=>{d.forEach(t=>{t.bindings=t.bindings.filter(i=>{var o;return(o=i.element)==null?void 0:o.isConnected}),!t.bindings.length&&!t.computed&&d.delete(t)}),v=void 0}))},C=(t,i,o,u,p,E)=>{var N;if(y){x.add(t);return}for(let I of t.bindings){let{deps:O,element:b,renderInferred:S,render:L,renderItem:V}=I;if(V&&i)(N=z(b,u,(...re)=>B(V(...re)),o,p,E)[i])==null||N.call();else{let re=S?S({element:b}):L({element:b,renderItem:V})(...O.map(we));re!==b&&b.replaceWith(I.element=B(re))}}g.requestAnimationFrame(()=>D(t)),F()},_=(t,i,o=[])=>({get(u,p,E){var N;if(k==null||k.add(t),p==="_isProxy")return!0;if(!((N=u[p])!=null&&N._isProxy)&&!se(u[p])&&me(u[p]))u[p]=new Proxy(u[p],_(t,i,[...o,p]));else if(Le.includes(p)){let I=u[p];return(...O)=>{let b=I.apply(u,O);return C(t,p,b,O,i,o),b}}return Reflect.get(u,p,E)},set(u,p,E,N){let I=Reflect.set(u,p,E,N);return C(t,"setItem",I,{prop:p,value:E},i,[...o,p]),I}}),U=(t,i)=>new Proxy(i,_(t,i)),z=(t,i,o,u,p,E)=>{let N=()=>t.replaceChildren(...fe(u,o)),I=O=>t[O]&&t.removeChild(t[O]);return{assign:N,sort:N,reverse:N,setItem:()=>{var b;let O=E[0];(b=t.children[O])==null||b.replaceWith(o(p[O],O))},push:()=>t.append(...fe(i,(O,b)=>o(O,p.length+b))),unshift:()=>t.prepend(...fe(i,o)),pop:()=>I("lastChild"),shift:()=>I("firstChild"),splice:()=>{const{length:O}=t.children;let[b,S=O,...L]=i;for(let V=b>=0?Math.min(b+S-1,O-1):O-1;V>=(b>=0?b:O+b);V--)t.children[V].remove();if(L.length){let V=L.map((re,ae)=>o(re,b+ae));t.children[b]?t.children[b].before(...V):t.append(...V)}}}},H=t=>({oldVal:t,bindings:[],listeners:[],__isState:!0,get val(){let i=this;return k==null||k.add(i),i.valProxy??(i.valProxy=me(t)?U(i,t):t,i.valProxy)},set val(i){let o=this,u=o.val;me(i)?(o.valProxy=U(o,i),C(o,"assign",i)):i!==u&&(o.valProxy=i,C(o)),o.oldVal=u}}),B=t=>{if(t==null||t===!1){const i=A("span");return i.style.display="none",i}else return t.nodeType?t:w.createTextNode(t)},M=(t,i)=>{let o=new Set;return i.val=P(t,o),o},m=t=>{let i=H(),o=M(t,i);i.computed=!0;for(let u of o)u.listeners.push({computed:t,deps:o,state:i});return i},D=t=>{for(let i of[...t.listeners])M(i.computed,i.state)},j=(t,...i)=>{if(i.length){let o=[];for(let u of i.flat(1/0))u!=null&&o.push(se(u)?c({deps:[u],render:()=>p=>p}):ke(u)?s({renderInferred:u}):B(u));t.append(...o)}},K={},q=(t,i)=>t&&(Object.getOwnPropertyDescriptor(t,i)??q(Ne(t),i)),W=(t,i,o)=>{var u;return K[t+","+i]??(K[t+","+i]=((u=q(o,i))==null?void 0:u.set)??0)},e=(t,i)=>new g.MutationObserver((o,u)=>{o.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(E=>E===t&&(i({element:t}),u.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),r=(t,i)=>new g.MutationObserver((o,u)=>o.forEach(p=>i({record:p,element:t}))).observe(t,{childList:!0}),n=t=>new Proxy(function(o,...u){var I;let[p,...E]=Me(u),N=t?w.createElementNS(t,o):A(o);for(let[O,b]of Object.entries(p)){if(O.startsWith("bau"))continue;let S=W(o,O,Ne(N))?L=>L!==void 0&&(N[O]=L):L=>N.setAttribute(O,Array.isArray(L)?L.filter(V=>V).join(" "):L);b==null||(se(b)?c({deps:[b],render:()=>()=>(S(b.val),N)}):ke(b)&&(!O.startsWith("on")||b.isDerived)?s({renderInferred:()=>(S(b({element:N})),N)}):b.renderProp?c({deps:b.deps,render:()=>()=>(S(b.renderProp({element:N})(...b.deps.map(we))),N)}):S(b))}return p.bauChildMutated&&r(N,p.bauChildMutated),j(N,...E),N.autofocus&&N.focus&&g.requestAnimationFrame(()=>N.focus()),(I=p.bauCreated)==null||I.call(p,{element:N}),p.bauMounted&&g.requestAnimationFrame(()=>p.bauMounted({element:N})),p.bauUnmounted&&g.requestAnimationFrame(()=>e(N,p.bauUnmounted)),N},{get:(i,o)=>i.bind(void 0,o)}),f=(t,i,o)=>{t.element=B(o);for(let u of i)se(u)&&(d.add(u),u.bindings.push(t));return t.element},s=({renderInferred:t,element:i})=>{let o=new Set,u=P(t,o,{element:i});return f({renderInferred:t},o,u)},c=({deps:t,element:i,render:o,renderItem:u})=>f({deps:t,render:o,renderItem:u},t,o({element:i,renderItem:u})(...t.map(we))),h=(t,i,o)=>c({deps:[t],render:({renderItem:u})=>p=>(i.append(...fe(p,u)),i),renderItem:o}),l=async t=>{y=!0;const i=await t();return y=!1,x.forEach(C),x.clear(),i};return{tags:n(),tagsNS:n,state:H,bind:c,loop:h,derive:m,stateSet:d,batch:l}}const De=a=>{let g=0,w=11;for(;g<a.length;)w=101*w+a.charCodeAt(g++)>>>0;return"bau"+w},Re=(a,g,w,v)=>{const d=a.createElement("style");d.id=w,d.append(v),(g??a.head).append(d)},Te=(a,g)=>a.reduce((w,v,d)=>w+v+(g[d]??""),"");function Fe(a){let{document:g}=(a==null?void 0:a.window)??window;const w=v=>(d,...x)=>{const y=Te(d,x),k=De(y);return!g.getElementById(k)&&Re(g,a==null?void 0:a.target,k,v(k,y)),k};return{css:w((v,d)=>`.${v} { ${d} }`),keyframes:w((v,d)=>`@keyframes ${v} { ${d} }`),createGlobalStyles:w((v,d)=>d)}}const Ee=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],qe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Ue=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ze=a=>`var(--color-${a})`,je=a=>`var(--color-${a}-lightest)`,Ge=()=>Ee.map(([a])=>`
.outline.${a} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${a} {
  background-color: ${je(a)};
}
.solid.${a} {
  background-color: ${ze(a)};
}
`).join(`
`),He=()=>Ee.map(([a])=>[`--color-${a}-s: var(--color-${a}-dark-s);`]).join(`
`),We=a=>100-a*10,Ve=()=>new Array(10).fill("").map((a,g)=>`--color-gray-${g*100}: hsl(0, 0%, ${We(g)}%);`).join(`
`),Oe=({dark:a})=>new Array(10).fill("").map((g,w)=>`--color-emphasis-${w*100}: var(--color-gray-${a?1e3-w*100:w*100});`).join(`
`),Xe=([a,{h:g,s:w,l:v}])=>[`--color-${a}-h: ${g};`,`--color-${a}-l: ${v};`,`--color-${a}-base-s: ${w};`,`--color-${a}-s: var(--color-${a}-base-s);`,`--color-${a}-dark-s: calc(${w} - 25%);`,`--color-${a}-hsl: var(--color-${a}-h), var(--color-${a}-s), var(--color-${a}-l);`,`--color-${a}: hsl(var(--color-${a}-hsl));`,...qe.map(([d,x])=>`--color-${a}-${d}: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * ${x}));`),...Ue.map(([d,x])=>`--color-${a}-${d}: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * ${x}));`),`--color-${a}-contrast-background: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) / var(--contrast-background-value)));`,`--color-${a}-contrast-foreground: hsl(var(--color-${a}-h), var(--color-${a}-s), calc(var(--color-${a}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ye({createGlobalStyles:a},{colorPalette:g=Ee}={}){a`
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
      ${g.map(([w,v])=>Xe([w,v])).join(`
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
  `}function Ke(a){const g=Be(),w=Fe({target:window.document.getElementById("bau-css")});return Ye(w),{bau:g,...w,tr:v=>v,window,...a}}const Qe=(a,g)=>({...a,paths:[...g,a.path]}),Ce=({paths:a=[],routes:g})=>g.flatMap(({children:w,...v})=>{const d=Qe(v,a);return w?[d,...Ce({paths:[...a,v.path],routes:w})]:d}),Je=({paths:a})=>{const g=a.map(w=>w instanceof RegExp?w.source:w).map(w=>String.raw`\/${w}`).join("");return new RegExp(`^${g}$`)},Ze=({routes:a=[],notFoundRoute:g})=>{const w=Ce({routes:a}).map(v=>({...v,regex:Je(v)}));return{resolve:({pathname:v})=>{const d=w.find(({regex:x})=>x.test(v));return d?d.action({match:v.match(d.regex)}):g}}};function et({routes:a,notFoundRoute:g,onLocationChange:w}){let v={...window.location};const d=y=>{v={...y}},x=Ze({routes:a,notFoundRoute:g});return window.addEventListener("popstate",y=>{v.pathname!=y.target.location.pathname&&w({router:x}),d(y.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(y,k,A)=>{y.apply(k,A),v.pathname!=window.location.pathname&&w({router:x}),d(window.location)}}),document.addEventListener("click",y=>{const{target:k}=y,A=k.closest("a");if(!A)return;const P=A.getAttribute("href");P&&!P.startsWith("http")&&!P.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",P),history.pushState({},null,P),d(window.location),["?","#"].includes(P[0])||window.scrollTo({top:0,left:0}),y.preventDefault())}),w({router:x}),x}const tt=({context:a,LayoutDefault:g,config:{base:w=""}={}})=>{const{window:v,bau:d}=a,x=d.state();let y;return({router:k})=>{var _;const A=v.location.pathname.replace(w,""),{title:P,component:F,Layout:C=g}=k.resolve({pathname:A});y!=C&&(y=C,(_=document.getElementById("app"))==null||_.replaceChildren(C({componentState:x}))),x.val=F({}),document.title=`${P} - E-commerce Product Page`}},rt=[{text:"Collection",href:"collection"},{text:"Men",href:"men"},{text:"Women",href:"women"},{text:"About",href:"about"},{text:"Contact",href:"contact"}],nt=a=>{const{bau:g,css:w}=a,{a:v,ul:d,li:x,nav:y}=g.tags,k=w`
    & ul {
      display: flex;
      list-style: none;
      > li {
        & a {
          text-decoration: none;
        }
      }
    }
  `;return A=>y({class:k,...A},d(rt.map(({text:P,href:F})=>x(v({href:F},P)))))},it="dialog-cart",ue="drawer",ot=(a,{cartState:g})=>{const{bau:w,css:v}=a,{header:d,div:x,img:y,button:k,span:A,dialog:P,form:F}=w.tags,C=w.derive(()=>g.val.reduce((B,{quantity:M})=>B+=M,0)),_=nt(a),U=()=>P({id:ue,onclick:({target:B,currentTarget:M})=>{B==M&&B.close()},class:v`
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
        `},F(d(k({role:"close",onclick:H(ue)},"❌")),_({onclick:H(ue)}))),z=v`
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
            color: var(--color-emphasis-500);
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
      & button {
        position: relative;
      }
      & img.avatar {
        transition: all 0.2s;
        &:hover {
          outline: 3px solid var(--color-primary);
        }
        border-radius: 100%;
      }
    }
  `,H=B=>()=>{const M=document.getElementById(B);M.open?M.close():M.showModal()};return()=>[U(),d({class:z},x({class:"header-left"},k({class:"burger",onclick:H(ue)},y({src:"./assets/images/icon-menu.svg",alt:"Menu",width:15,height:15})),y({class:"logo",src:"./assets/images/logo.svg",alt:"Logo",width:138,height:20})),_({}),x({class:"header-right"},k({onclick:H(it)},y({class:"cart",src:"./assets/images/icon-cart.svg",alt:"Logo",width:22,height:20}),()=>C.val>0&&A({class:["badge","solid"]},C)),k(y({class:"avatar",src:"./assets/images/image-avatar.png",alt:"Logo",width:55,height:55}))))]};var lt=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,ve=Math.ceil,Z=Math.floor,Y="[BigNumber Error] ",Ae=Y+"Number primitive has more than 15 significant digits: ",te=1e14,$=14,ye=9007199254740991,be=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],oe=1e7,G=1e9;function Se(a){var g,w,v,d=m.prototype={constructor:m,toString:null,valueOf:null},x=new m(1),y=20,k=4,A=-7,P=21,F=-1e7,C=1e7,_=!1,U=1,z=0,H={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},B="0123456789abcdefghijklmnopqrstuvwxyz",M=!0;function m(e,r){var n,f,s,c,h,l,t,i,o=this;if(!(o instanceof m))return new m(e,r);if(r==null){if(e&&e._isBigNumber===!0){o.s=e.s,!e.c||e.e>C?o.c=o.e=null:e.e<F?o.c=[o.e=0]:(o.e=e.e,o.c=e.c.slice());return}if((l=typeof e=="number")&&e*0==0){if(o.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,h=e;h>=10;h/=10,c++);c>C?o.c=o.e=null:(o.e=c,o.c=[e]);return}i=String(e)}else{if(!lt.test(i=String(e)))return v(o,i,l);o.s=i.charCodeAt(0)==45?(i=i.slice(1),-1):1}(c=i.indexOf("."))>-1&&(i=i.replace(".","")),(h=i.search(/e/i))>0?(c<0&&(c=h),c+=+i.slice(h+1),i=i.substring(0,h)):c<0&&(c=i.length)}else{if(R(r,2,B.length,"Base"),r==10&&M)return o=new m(e),q(o,y+o.e+1,k);if(i=String(e),l=typeof e=="number"){if(e*0!=0)return v(o,i,l,r);if(o.s=1/e<0?(i=i.slice(1),-1):1,m.DEBUG&&i.replace(/^0\.0*|\./,"").length>15)throw Error(Ae+e)}else o.s=i.charCodeAt(0)===45?(i=i.slice(1),-1):1;for(n=B.slice(0,r),c=h=0,t=i.length;h<t;h++)if(n.indexOf(f=i.charAt(h))<0){if(f=="."){if(h>c){c=t;continue}}else if(!s&&(i==i.toUpperCase()&&(i=i.toLowerCase())||i==i.toLowerCase()&&(i=i.toUpperCase()))){s=!0,h=-1,c=0;continue}return v(o,String(e),l,r)}l=!1,i=w(i,r,10,o.s),(c=i.indexOf("."))>-1?i=i.replace(".",""):c=i.length}for(h=0;i.charCodeAt(h)===48;h++);for(t=i.length;i.charCodeAt(--t)===48;);if(i=i.slice(h,++t)){if(t-=h,l&&m.DEBUG&&t>15&&(e>ye||e!==Z(e)))throw Error(Ae+o.s*e);if((c=c-h-1)>C)o.c=o.e=null;else if(c<F)o.c=[o.e=0];else{if(o.e=c,o.c=[],h=(c+1)%$,c<0&&(h+=$),h<t){for(h&&o.c.push(+i.slice(0,h)),t-=$;h<t;)o.c.push(+i.slice(h,h+=$));h=$-(i=i.slice(h)).length}else h-=t;for(;h--;i+="0");o.c.push(+i)}}else o.c=[o.e=0]}m.clone=Se,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var r,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(r="DECIMAL_PLACES")&&(n=e[r],R(n,0,G,r),y=n),e.hasOwnProperty(r="ROUNDING_MODE")&&(n=e[r],R(n,0,8,r),k=n),e.hasOwnProperty(r="EXPONENTIAL_AT")&&(n=e[r],n&&n.pop?(R(n[0],-G,0,r),R(n[1],0,G,r),A=n[0],P=n[1]):(R(n,-G,G,r),A=-(P=n<0?-n:n))),e.hasOwnProperty(r="RANGE"))if(n=e[r],n&&n.pop)R(n[0],-G,-1,r),R(n[1],1,G,r),F=n[0],C=n[1];else if(R(n,-G,G,r),n)F=-(C=n<0?-n:n);else throw Error(Y+r+" cannot be zero: "+n);if(e.hasOwnProperty(r="CRYPTO"))if(n=e[r],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))_=n;else throw _=!n,Error(Y+"crypto unavailable");else _=n;else throw Error(Y+r+" not true or false: "+n);if(e.hasOwnProperty(r="MODULO_MODE")&&(n=e[r],R(n,0,9,r),U=n),e.hasOwnProperty(r="POW_PRECISION")&&(n=e[r],R(n,0,G,r),z=n),e.hasOwnProperty(r="FORMAT"))if(n=e[r],typeof n=="object")H=n;else throw Error(Y+r+" not an object: "+n);if(e.hasOwnProperty(r="ALPHABET"))if(n=e[r],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))M=n.slice(0,10)=="0123456789",B=n;else throw Error(Y+r+" invalid: "+n)}else throw Error(Y+"Object expected: "+e);return{DECIMAL_PLACES:y,ROUNDING_MODE:k,EXPONENTIAL_AT:[A,P],RANGE:[F,C],CRYPTO:_,MODULO_MODE:U,POW_PRECISION:z,FORMAT:H,ALPHABET:B}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var r,n,f=e.c,s=e.e,c=e.s;e:if({}.toString.call(f)=="[object Array]"){if((c===1||c===-1)&&s>=-G&&s<=G&&s===Z(s)){if(f[0]===0){if(s===0&&f.length===1)return!0;break e}if(r=(s+1)%$,r<1&&(r+=$),String(f[0]).length==r){for(r=0;r<f.length;r++)if(n=f[r],n<0||n>=te||n!==Z(n))break e;if(n!==0)return!0}}}else if(f===null&&s===null&&(c===null||c===1||c===-1))return!0;throw Error(Y+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return j(arguments,-1)},m.minimum=m.min=function(){return j(arguments,1)},m.random=function(){var e=9007199254740992,r=Math.random()*e&2097151?function(){return Z(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var f,s,c,h,l,t=0,i=[],o=new m(x);if(n==null?n=y:R(n,0,G),h=ve(n/$),_)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(h*=2));t<h;)l=f[t]*131072+(f[t+1]>>>11),l>=9e15?(s=crypto.getRandomValues(new Uint32Array(2)),f[t]=s[0],f[t+1]=s[1]):(i.push(l%1e14),t+=2);t=h/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(h*=7);t<h;)l=(f[t]&31)*281474976710656+f[t+1]*1099511627776+f[t+2]*4294967296+f[t+3]*16777216+(f[t+4]<<16)+(f[t+5]<<8)+f[t+6],l>=9e15?crypto.randomBytes(7).copy(f,t):(i.push(l%1e14),t+=7);t=h/7}else throw _=!1,Error(Y+"crypto unavailable");if(!_)for(;t<h;)l=r(),l<9e15&&(i[t++]=l%1e14);for(h=i[--t],n%=$,h&&n&&(l=be[$-n],i[t]=Z(h/l)*l);i[t]===0;i.pop(),t--);if(t<0)i=[c=0];else{for(c=-1;i[0]===0;i.splice(0,1),c-=$);for(t=1,l=i[0];l>=10;l/=10,t++);t<$&&(c-=$-t)}return o.e=c,o.c=i,o}}(),m.sum=function(){for(var e=1,r=arguments,n=new m(r[0]);e<r.length;)n=n.plus(r[e++]);return n},w=function(){var e="0123456789";function r(n,f,s,c){for(var h,l=[0],t,i=0,o=n.length;i<o;){for(t=l.length;t--;l[t]*=f);for(l[0]+=c.indexOf(n.charAt(i++)),h=0;h<l.length;h++)l[h]>s-1&&(l[h+1]==null&&(l[h+1]=0),l[h+1]+=l[h]/s|0,l[h]%=s)}return l.reverse()}return function(n,f,s,c,h){var l,t,i,o,u,p,E,N,I=n.indexOf("."),O=y,b=k;for(I>=0&&(o=z,z=0,n=n.replace(".",""),N=new m(f),p=N.pow(n.length-I),z=o,N.c=r(ie(J(p.c),p.e,"0"),10,s,e),N.e=N.c.length),E=r(n,f,s,h?(l=B,e):(l=e,B)),i=o=E.length;E[--o]==0;E.pop());if(!E[0])return l.charAt(0);if(I<0?--i:(p.c=E,p.e=i,p.s=c,p=g(p,N,O,b,s),E=p.c,u=p.r,i=p.e),t=i+O+1,I=E[t],o=s/2,u=u||t<0||E[t+1]!=null,u=b<4?(I!=null||u)&&(b==0||b==(p.s<0?3:2)):I>o||I==o&&(b==4||u||b==6&&E[t-1]&1||b==(p.s<0?8:7)),t<1||!E[0])n=u?ie(l.charAt(1),-O,l.charAt(0)):l.charAt(0);else{if(E.length=t,u)for(--s;++E[--t]>s;)E[t]=0,t||(++i,E=[1].concat(E));for(o=E.length;!E[--o];);for(I=0,n="";I<=o;n+=l.charAt(E[I++]));n=ie(n,i,l.charAt(0))}return n}}(),g=function(){function e(f,s,c){var h,l,t,i,o=0,u=f.length,p=s%oe,E=s/oe|0;for(f=f.slice();u--;)t=f[u]%oe,i=f[u]/oe|0,h=E*t+i*p,l=p*t+h%oe*oe+o,o=(l/c|0)+(h/oe|0)+E*i,f[u]=l%c;return o&&(f=[o].concat(f)),f}function r(f,s,c,h){var l,t;if(c!=h)t=c>h?1:-1;else for(l=t=0;l<c;l++)if(f[l]!=s[l]){t=f[l]>s[l]?1:-1;break}return t}function n(f,s,c,h){for(var l=0;c--;)f[c]-=l,l=f[c]<s[c]?1:0,f[c]=l*h+f[c]-s[c];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,s,c,h,l){var t,i,o,u,p,E,N,I,O,b,S,L,V,re,ae,ne,ce,Q=f.s==s.s?1:-1,X=f.c,T=s.c;if(!X||!X[0]||!T||!T[0])return new m(!f.s||!s.s||(X?T&&X[0]==T[0]:!T)?NaN:X&&X[0]==0||!T?Q*0:Q/0);for(I=new m(Q),O=I.c=[],i=f.e-s.e,Q=c+i+1,l||(l=te,i=ee(f.e/$)-ee(s.e/$),Q=Q/$|0),o=0;T[o]==(X[o]||0);o++);if(T[o]>(X[o]||0)&&i--,Q<0)O.push(1),u=!0;else{for(re=X.length,ne=T.length,o=0,Q+=2,p=Z(l/(T[0]+1)),p>1&&(T=e(T,p,l),X=e(X,p,l),ne=T.length,re=X.length),V=ne,b=X.slice(0,ne),S=b.length;S<ne;b[S++]=0);ce=T.slice(),ce=[0].concat(ce),ae=T[0],T[1]>=l/2&&ae++;do{if(p=0,t=r(T,b,ne,S),t<0){if(L=b[0],ne!=S&&(L=L*l+(b[1]||0)),p=Z(L/ae),p>1)for(p>=l&&(p=l-1),E=e(T,p,l),N=E.length,S=b.length;r(E,b,N,S)==1;)p--,n(E,ne<N?ce:T,N,l),N=E.length,t=1;else p==0&&(t=p=1),E=T.slice(),N=E.length;if(N<S&&(E=[0].concat(E)),n(b,E,S,l),S=b.length,t==-1)for(;r(T,b,ne,S)<1;)p++,n(b,ne<S?ce:T,S,l),S=b.length}else t===0&&(p++,b=[0]);O[o++]=p,b[0]?b[S++]=X[V]||0:(b=[X[V]],S=1)}while((V++<re||b[0]!=null)&&Q--);u=b[0]!=null,O[0]||O.splice(0,1)}if(l==te){for(o=1,Q=O[0];Q>=10;Q/=10,o++);q(I,c+(I.e=o+i*$-1)+1,h,u)}else I.e=i,I.r=+u;return I}}();function D(e,r,n,f){var s,c,h,l,t;if(n==null?n=k:R(n,0,8),!e.c)return e.toString();if(s=e.c[0],h=e.e,r==null)t=J(e.c),t=f==1||f==2&&(h<=A||h>=P)?he(t,h):ie(t,h,"0");else if(e=q(new m(e),r,n),c=e.e,t=J(e.c),l=t.length,f==1||f==2&&(r<=c||c<=A)){for(;l<r;t+="0",l++);t=he(t,c)}else if(r-=h,t=ie(t,c,"0"),c+1>l){if(--r>0)for(t+=".";r--;t+="0");}else if(r+=c-l,r>0)for(c+1==l&&(t+=".");r--;t+="0");return e.s<0&&s?"-"+t:t}function j(e,r){for(var n,f,s=1,c=new m(e[0]);s<e.length;s++)f=new m(e[s]),(!f.s||(n=le(c,f))===r||n===0&&c.s===r)&&(c=f);return c}function K(e,r,n){for(var f=1,s=r.length;!r[--s];r.pop());for(s=r[0];s>=10;s/=10,f++);return(n=f+n*$-1)>C?e.c=e.e=null:n<F?e.c=[e.e=0]:(e.e=n,e.c=r),e}v=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,r=/^([^.]+)\.$/,n=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,s=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(c,h,l,t){var i,o=l?h:h.replace(s,"");if(f.test(o))c.s=isNaN(o)?null:o<0?-1:1;else{if(!l&&(o=o.replace(e,function(u,p,E){return i=(E=E.toLowerCase())=="x"?16:E=="b"?2:8,!t||t==i?p:u}),t&&(i=t,o=o.replace(r,"$1").replace(n,"0.$1")),h!=o))return new m(o,i);if(m.DEBUG)throw Error(Y+"Not a"+(t?" base "+t:"")+" number: "+h);c.s=null}c.c=c.e=null}}();function q(e,r,n,f){var s,c,h,l,t,i,o,u=e.c,p=be;if(u){e:{for(s=1,l=u[0];l>=10;l/=10,s++);if(c=r-s,c<0)c+=$,h=r,t=u[i=0],o=Z(t/p[s-h-1]%10);else if(i=ve((c+1)/$),i>=u.length)if(f){for(;u.length<=i;u.push(0));t=o=0,s=1,c%=$,h=c-$+1}else break e;else{for(t=l=u[i],s=1;l>=10;l/=10,s++);c%=$,h=c-$+s,o=h<0?0:Z(t/p[s-h-1]%10)}if(f=f||r<0||u[i+1]!=null||(h<0?t:t%p[s-h-1]),f=n<4?(o||f)&&(n==0||n==(e.s<0?3:2)):o>5||o==5&&(n==4||f||n==6&&(c>0?h>0?t/p[s-h]:0:u[i-1])%10&1||n==(e.s<0?8:7)),r<1||!u[0])return u.length=0,f?(r-=e.e+1,u[0]=p[($-r%$)%$],e.e=-r||0):u[0]=e.e=0,e;if(c==0?(u.length=i,l=1,i--):(u.length=i+1,l=p[$-c],u[i]=h>0?Z(t/p[s-h]%p[h])*l:0),f)for(;;)if(i==0){for(c=1,h=u[0];h>=10;h/=10,c++);for(h=u[0]+=l,l=1;h>=10;h/=10,l++);c!=l&&(e.e++,u[0]==te&&(u[0]=1));break}else{if(u[i]+=l,u[i]!=te)break;u[i--]=0,l=1}for(c=u.length;u[--c]===0;u.pop());}e.e>C?e.c=e.e=null:e.e<F&&(e.c=[e.e=0])}return e}function W(e){var r,n=e.e;return n===null?e.toString():(r=J(e.c),r=n<=A||n>=P?he(r,n):ie(r,n,"0"),e.s<0?"-"+r:r)}return d.absoluteValue=d.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,r){return le(this,new m(e,r))},d.decimalPlaces=d.dp=function(e,r){var n,f,s,c=this;if(e!=null)return R(e,0,G),r==null?r=k:R(r,0,8),q(new m(c),e+c.e+1,r);if(!(n=c.c))return null;if(f=((s=n.length-1)-ee(this.e/$))*$,s=n[s])for(;s%10==0;s/=10,f--);return f<0&&(f=0),f},d.dividedBy=d.div=function(e,r){return g(this,new m(e,r),y,k)},d.dividedToIntegerBy=d.idiv=function(e,r){return g(this,new m(e,r),0,1)},d.exponentiatedBy=d.pow=function(e,r){var n,f,s,c,h,l,t,i,o,u=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(Y+"Exponent not an integer: "+W(e));if(r!=null&&(r=new m(r)),l=e.e>14,!u.c||!u.c[0]||u.c[0]==1&&!u.e&&u.c.length==1||!e.c||!e.c[0])return o=new m(Math.pow(+W(u),l?e.s*(2-de(e)):+W(e))),r?o.mod(r):o;if(t=e.s<0,r){if(r.c?!r.c[0]:!r.s)return new m(NaN);f=!t&&u.isInteger()&&r.isInteger(),f&&(u=u.mod(r))}else{if(e.e>9&&(u.e>0||u.e<-1||(u.e==0?u.c[0]>1||l&&u.c[1]>=24e7:u.c[0]<8e13||l&&u.c[0]<=9999975e7)))return c=u.s<0&&de(e)?-0:0,u.e>-1&&(c=1/c),new m(t?1/c:c);z&&(c=ve(z/$+2))}for(l?(n=new m(.5),t&&(e.s=1),i=de(e)):(s=Math.abs(+W(e)),i=s%2),o=new m(x);;){if(i){if(o=o.times(u),!o.c)break;c?o.c.length>c&&(o.c.length=c):f&&(o=o.mod(r))}if(s){if(s=Z(s/2),s===0)break;i=s%2}else if(e=e.times(n),q(e,e.e+1,1),e.e>14)i=de(e);else{if(s=+W(e),s===0)break;i=s%2}u=u.times(u),c?u.c&&u.c.length>c&&(u.c.length=c):f&&(u=u.mod(r))}return f?o:(t&&(o=x.div(o)),r?o.mod(r):c?q(o,z,k,h):o)},d.integerValue=function(e){var r=new m(this);return e==null?e=k:R(e,0,8),q(r,r.e+1,e)},d.isEqualTo=d.eq=function(e,r){return le(this,new m(e,r))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,r){return le(this,new m(e,r))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,r){return(r=le(this,new m(e,r)))===1||r===0},d.isInteger=function(){return!!this.c&&ee(this.e/$)>this.c.length-2},d.isLessThan=d.lt=function(e,r){return le(this,new m(e,r))<0},d.isLessThanOrEqualTo=d.lte=function(e,r){return(r=le(this,new m(e,r)))===-1||r===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,r){var n,f,s,c,h=this,l=h.s;if(e=new m(e,r),r=e.s,!l||!r)return new m(NaN);if(l!=r)return e.s=-r,h.plus(e);var t=h.e/$,i=e.e/$,o=h.c,u=e.c;if(!t||!i){if(!o||!u)return o?(e.s=-r,e):new m(u?h:NaN);if(!o[0]||!u[0])return u[0]?(e.s=-r,e):new m(o[0]?h:k==3?-0:0)}if(t=ee(t),i=ee(i),o=o.slice(),l=t-i){for((c=l<0)?(l=-l,s=o):(i=t,s=u),s.reverse(),r=l;r--;s.push(0));s.reverse()}else for(f=(c=(l=o.length)<(r=u.length))?l:r,l=r=0;r<f;r++)if(o[r]!=u[r]){c=o[r]<u[r];break}if(c&&(s=o,o=u,u=s,e.s=-e.s),r=(f=u.length)-(n=o.length),r>0)for(;r--;o[n++]=0);for(r=te-1;f>l;){if(o[--f]<u[f]){for(n=f;n&&!o[--n];o[n]=r);--o[n],o[f]+=te}o[f]-=u[f]}for(;o[0]==0;o.splice(0,1),--i);return o[0]?K(e,o,i):(e.s=k==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,r){var n,f,s=this;return e=new m(e,r),!s.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||s.c&&!s.c[0]?new m(s):(U==9?(f=e.s,e.s=1,n=g(s,e,0,3),e.s=f,n.s*=f):n=g(s,e,0,U),e=s.minus(n.times(e)),!e.c[0]&&U==1&&(e.s=s.s),e)},d.multipliedBy=d.times=function(e,r){var n,f,s,c,h,l,t,i,o,u,p,E,N,I,O,b=this,S=b.c,L=(e=new m(e,r)).c;if(!S||!L||!S[0]||!L[0])return!b.s||!e.s||S&&!S[0]&&!L||L&&!L[0]&&!S?e.c=e.e=e.s=null:(e.s*=b.s,!S||!L?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=ee(b.e/$)+ee(e.e/$),e.s*=b.s,t=S.length,u=L.length,t<u&&(N=S,S=L,L=N,s=t,t=u,u=s),s=t+u,N=[];s--;N.push(0));for(I=te,O=oe,s=u;--s>=0;){for(n=0,p=L[s]%O,E=L[s]/O|0,h=t,c=s+h;c>s;)i=S[--h]%O,o=S[h]/O|0,l=E*i+o*p,i=p*i+l%O*O+N[c]+n,n=(i/I|0)+(l/O|0)+E*o,N[c--]=i%I;N[c]=n}return n?++f:N.splice(0,1),K(e,N,f)},d.negated=function(){var e=new m(this);return e.s=-e.s||null,e},d.plus=function(e,r){var n,f=this,s=f.s;if(e=new m(e,r),r=e.s,!s||!r)return new m(NaN);if(s!=r)return e.s=-r,f.minus(e);var c=f.e/$,h=e.e/$,l=f.c,t=e.c;if(!c||!h){if(!l||!t)return new m(s/0);if(!l[0]||!t[0])return t[0]?e:new m(l[0]?f:s*0)}if(c=ee(c),h=ee(h),l=l.slice(),s=c-h){for(s>0?(h=c,n=t):(s=-s,n=l),n.reverse();s--;n.push(0));n.reverse()}for(s=l.length,r=t.length,s-r<0&&(n=t,t=l,l=n,r=s),s=0;r;)s=(l[--r]=l[r]+t[r]+s)/te|0,l[r]=te===l[r]?0:l[r]%te;return s&&(l=[s].concat(l),++h),K(e,l,h)},d.precision=d.sd=function(e,r){var n,f,s,c=this;if(e!=null&&e!==!!e)return R(e,1,G),r==null?r=k:R(r,0,8),q(new m(c),e,r);if(!(n=c.c))return null;if(s=n.length-1,f=s*$+1,s=n[s]){for(;s%10==0;s/=10,f--);for(s=n[0];s>=10;s/=10,f++);}return e&&c.e+1>f&&(f=c.e+1),f},d.shiftedBy=function(e){return R(e,-ye,ye),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,r,n,f,s,c=this,h=c.c,l=c.s,t=c.e,i=y+4,o=new m("0.5");if(l!==1||!h||!h[0])return new m(!l||l<0&&(!h||h[0])?NaN:h?c:1/0);if(l=Math.sqrt(+W(c)),l==0||l==1/0?(r=J(h),(r.length+t)%2==0&&(r+="0"),l=Math.sqrt(+r),t=ee((t+1)/2)-(t<0||t%2),l==1/0?r="5e"+t:(r=l.toExponential(),r=r.slice(0,r.indexOf("e")+1)+t),n=new m(r)):n=new m(l+""),n.c[0]){for(t=n.e,l=t+i,l<3&&(l=0);;)if(s=n,n=o.times(s.plus(g(c,s,i,1))),J(s.c).slice(0,l)===(r=J(n.c)).slice(0,l))if(n.e<t&&--l,r=r.slice(l-3,l+1),r=="9999"||!f&&r=="4999"){if(!f&&(q(s,s.e+y+2,0),s.times(s).eq(c))){n=s;break}i+=4,l+=4,f=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(q(n,n.e+y+2,1),e=!n.times(n).eq(c));break}}return q(n,n.e+y+1,k,e)},d.toExponential=function(e,r){return e!=null&&(R(e,0,G),e++),D(this,e,r,1)},d.toFixed=function(e,r){return e!=null&&(R(e,0,G),e=e+this.e+1),D(this,e,r)},d.toFormat=function(e,r,n){var f,s=this;if(n==null)e!=null&&r&&typeof r=="object"?(n=r,r=null):e&&typeof e=="object"?(n=e,e=r=null):n=H;else if(typeof n!="object")throw Error(Y+"Argument not an object: "+n);if(f=s.toFixed(e,r),s.c){var c,h=f.split("."),l=+n.groupSize,t=+n.secondaryGroupSize,i=n.groupSeparator||"",o=h[0],u=h[1],p=s.s<0,E=p?o.slice(1):o,N=E.length;if(t&&(c=l,l=t,t=c,N-=c),l>0&&N>0){for(c=N%l||l,o=E.substr(0,c);c<N;c+=l)o+=i+E.substr(c,l);t>0&&(o+=i+E.slice(c)),p&&(o="-"+o)}f=u?o+(n.decimalSeparator||"")+((t=+n.fractionGroupSize)?u.replace(new RegExp("\\d{"+t+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):u):o}return(n.prefix||"")+f+(n.suffix||"")},d.toFraction=function(e){var r,n,f,s,c,h,l,t,i,o,u,p,E=this,N=E.c;if(e!=null&&(l=new m(e),!l.isInteger()&&(l.c||l.s!==1)||l.lt(x)))throw Error(Y+"Argument "+(l.isInteger()?"out of range: ":"not an integer: ")+W(l));if(!N)return new m(E);for(r=new m(x),i=n=new m(x),f=t=new m(x),p=J(N),c=r.e=p.length-E.e-1,r.c[0]=be[(h=c%$)<0?$+h:h],e=!e||l.comparedTo(r)>0?c>0?r:i:l,h=C,C=1/0,l=new m(p),t.c[0]=0;o=g(l,r,0,1),s=n.plus(o.times(f)),s.comparedTo(e)!=1;)n=f,f=s,i=t.plus(o.times(s=i)),t=s,r=l.minus(o.times(s=r)),l=s;return s=g(e.minus(n),f,0,1),t=t.plus(s.times(i)),n=n.plus(s.times(f)),t.s=i.s=E.s,c=c*2,u=g(i,f,c,k).minus(E).abs().comparedTo(g(t,n,c,k).minus(E).abs())<1?[i,f]:[t,n],C=h,u},d.toNumber=function(){return+W(this)},d.toPrecision=function(e,r){return e!=null&&R(e,1,G),D(this,e,r,2)},d.toString=function(e){var r,n=this,f=n.s,s=n.e;return s===null?f?(r="Infinity",f<0&&(r="-"+r)):r="NaN":(e==null?r=s<=A||s>=P?he(J(n.c),s):ie(J(n.c),s,"0"):e===10&&M?(n=q(new m(n),y+s+1,k),r=ie(J(n.c),n.e,"0")):(R(e,2,B.length,"Base"),r=w(ie(J(n.c),s,"0"),10,e,f,!0)),f<0&&n.c[0]&&(r="-"+r)),r},d.valueOf=d.toJSON=function(){return W(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,a!=null&&m.set(a),m}function ee(a){var g=a|0;return a>0||a===g?g:g-1}function J(a){for(var g,w,v=1,d=a.length,x=a[0]+"";v<d;){for(g=a[v++]+"",w=$-g.length;w--;g="0"+g);x+=g}for(d=x.length;x.charCodeAt(--d)===48;);return x.slice(0,d+1||1)}function le(a,g){var w,v,d=a.c,x=g.c,y=a.s,k=g.s,A=a.e,P=g.e;if(!y||!k)return null;if(w=d&&!d[0],v=x&&!x[0],w||v)return w?v?0:-k:y;if(y!=k)return y;if(w=y<0,v=A==P,!d||!x)return v?0:!d^w?1:-1;if(!v)return A>P^w?1:-1;for(k=(A=d.length)<(P=x.length)?A:P,y=0;y<k;y++)if(d[y]!=x[y])return d[y]>x[y]^w?1:-1;return A==P?0:A>P^w?1:-1}function R(a,g,w,v){if(a<g||a>w||a!==Z(a))throw Error(Y+(v||"Argument")+(typeof a=="number"?a<g||a>w?" out of range: ":" not an integer: ":" not a primitive number: ")+String(a))}function de(a){var g=a.c.length-1;return ee(a.e/$)==g&&a.c[g]%2!=0}function he(a,g){return(a.length>1?a.charAt(0)+"."+a.slice(1):a)+(g<0?"e":"e+")+g}function ie(a,g,w){var v,d;if(g<0){for(d=w+".";++g;d+=w);a=d+a}else if(v=a.length,++g>v){for(d=w,g-=v;--g;d+=w);a+=d}else g<v&&(a=a.slice(0,g)+"."+a.slice(g));return a}var st=Se();const at="en-US",ct="USD",pe=a=>new Intl.NumberFormat(at,{style:"currency",currency:ct}).format(a);function ft(a,{cartState:g}){const{bau:w,css:v}=a,{div:d,dialog:x,ul:y,li:k,span:A,button:P,img:F,header:C,footer:_,h1:U,form:z}=w.tags,H=w.derive(()=>g.val.length==0),B=D=>()=>{const j=g.val.findIndex(({name:K})=>K==D.name);j>=0&&g.val.splice(j,1)},M=v`
    margin: auto;
    z-index: 1;
    box-shadow: var(--shadow-m);
    border: none;
    border-radius: 1rem;
    & > form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      & > header {
        border-bottom: 1px solid var(--color-emphasis-200);
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
  `,m=()=>{document.getElementById("dialog-cart").close()};return()=>x({id:"dialog-cart",class:M,onclick:({target:D,currentTarget:j})=>{D==j&&D.close()}},z(C(U("Cart")),()=>H.val&&"No items in the cart",w.loop(g,y(),D=>k(d(d({class:"name"},D.name),d(A({class:"quantity"},D.quantity,"x"),A({class:"price"},pe(D.price)),A({class:"price-total"},"  =",pe(st(D.price).times(D.quantity).toNumber())))),P({role:"delete",onclick:B(D)},F({src:"./assets/images/icon-delete.svg",alt:""})))),_(P({class:["primary","solid"],type:"submit",onclick:m},"Confirm Order"))))}const ut=(a,{cartState:g})=>{const{bau:w,css:v}=a,{div:d}=w.tags,x=ot(a,{cartState:g}),y=ft(a,{cartState:g});return function({componentState:A}){return d({class:v`
          display: grid;
          margin: auto;
          max-width: 1000px;
          min-height: 100vh;
        `},x(),y(),d({style:"flex-grow: 1"},()=>A.val))}};function dt(a,{}){const{bau:g,css:w}=a,{section:v,img:d,ul:x,li:y,button:k,div:A,dialog:P,header:F}=g.tags,C=g.state(0),_=w`
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
          background-color: white;
          width: 3rem;
          height: 3rem;
          font-size: xx-large;
          border-radius: 100%;
          display: grid;
          place-content: center;
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
  `;return({images:U=[]})=>{const z=()=>{C.val<=0?C.val=U.length-1:C.val--},H=()=>{C.val>=U.length-1?C.val=0:C.val++},B=j=>()=>{C.val=j},M=()=>{document.getElementById("dialog-carousel").showModal()},m=()=>{document.getElementById("dialog-carousel").close()},D=({images:j,fullscreen:K=!1})=>v({class:["carousel",_,K&&"fullscreen"]},A({class:"track"},A({class:["control","control-previous"],onclick:z},k(d({src:"./assets/images/icon-previous.svg",alt:"previous"}))),A({class:["control","control-next"],onclick:H},k(d({src:"./assets/images/icon-next.svg",alt:"next"}))),A({class:"track-inner"},x({style:()=>`transform: translateX(${-100*C.val}%);`,onclick:M},j.map(({desktop:q,alt:W})=>y(d({src:q,alt:W})))))),x({class:"thumbnail"},j.map(({thumbnail:q,alt:W},e)=>y({class:()=>e==C.val&&"active"},k({onclick:B(e)},d({src:q,alt:W,width:91,height:91}))))));return[D({images:U}),P({id:"dialog-carousel",class:w`
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
          `},F(k({role:"close",onclick:m},"❌")),D({images:U,fullscreen:!0}))]}}function ht(a,{cartState:g}){const{bau:w,css:v}=a,{h1:d,h2:x,p:y,div:k,button:A,span:P,section:F,img:C}=w.tags,_=w.state(1),U=M=>()=>{const m=g.val.find(({name:D})=>D==M.name);m?m.quantity+=_.val:g.val.push({name:M.name,price:M.price,quantity:_.val,thumbnail:M.imageInfo[0].thumbnail}),_.val=0},z=()=>{_.val+=1},H=()=>{_.val<=0||(_.val-=1)},B=v`
    margin: auto;
    padding-inline: 1rem;
    max-width: min(100vw, 500px);
    & h1 {
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      font-size: small;
      color: var(--color-primary);
      line-height: 3rem;
    }
    & h2 {
      font-size: 2.7rem;
      line-height: 3rem;
    }
    > p {
      margin-block: 1rem;
      color: var(--font-color);
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
          background-color: var(--color-primary-lightest);
          color: var(--color-primary-dark);
          padding-inline: 0.7rem;
          border-radius: 0.4rem;
        }
      }
      .price-old {
        font-weight: bold;
        text-decoration: line-through;
        color: var(--color-emphasis-300);
      }
    }
    .quantity-selector {
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
      }
      & button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        padding-inline: 2rem;
        padding-block: 1rem;
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
        font-weight: 400;
        padding-block: 0.5rem;
        min-width: 15rem;
        border-radius: 0.4rem;
        color: var(--font-color-inverse);
        background-color: var(--color-primary);
        &::before {
          color: inherit;
          filter: brightness(2.5);
          content: url("./assets/images/icon-cart.svg");
        }
      }
    }
  `;return M=>{const{brand:m,name:D,description:j,price:K,discount:q,priceOld:W}=M;return F({class:B},d(m),x(D),y(j),k({class:"price-container"},y({class:"price-current"},P({class:"price"},pe(K)),P({class:"discount"},`${q}%`)),y({class:"price-old"},pe(W))),y({class:"cart-action"},k({class:"quantity-selector"},A({onclick:H,"aria-label":"decrement quantity"},C({src:"./assets/images/icon-minus.svg",alt:"remove-from-cart"})),k({class:"quantity"},_),A({onclick:z,"aria-label":"increment quantity"},C({src:"./assets/images/icon-plus.svg",alt:"add-cart"}))),A({class:"add-to-cart",onclick:U(M)},"Add to cart")))}}const Pe=new Array(4).fill("").map((a,g)=>({thumbnail:`./assets/images/image-product-${g+1}-thumbnail.jpg`,desktop:`./assets/images/image-product-${g+1}.jpg`,alt:`images-${g}`})),gt={brand:"Sneaker Company",name:"Fall Limited Edition Sneakers",description:"These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",imageInfo:Pe,price:125,priceOld:250,discount:50};function pt(a,{cartState:g}){const{bau:w,css:v}=a,{article:d}=w.tags,x=dt(a,{}),y=ht(a,{cartState:g}),k=v`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;return()=>d({class:k},x({images:Pe}),y(gt))}const mt=(a,{cartState:g})=>{const w=pt(a,{cartState:g});return[{path:"",action:v=>({routerContext:v,title:"Product",component:()=>w()})}]},wt=a=>({title:"Page Not Found",component:()=>"Not Found"}),Ie={base:"/bau/frontendmentor/e-commerce-product-page"},ge=Ke({config:Ie}),$e=ge.bau.state([]);et({routes:mt(ge,{cartState:$e}),onLocationChange:tt({context:ge,config:Ie,LayoutDefault:ut(ge,{cartState:$e})}),notFoundRoute:wt()});
