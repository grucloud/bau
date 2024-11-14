(function(){const g=document.createElement("link").relList;if(g&&g.supports&&g.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))v(d);new MutationObserver(d=>{for(const b of d)if(b.type==="childList")for(const y of b.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&v(y)}).observe(document,{childList:!0,subtree:!0});function w(d){const b={};return d.integrity&&(b.integrity=d.integrity),d.referrerPolicy&&(b.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?b.credentials="include":d.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function v(d){if(d.ep)return;d.ep=!0;const b=w(d);fetch(d.href,b)}})();let xe=s=>Object.prototype.toString.call(s??0).slice(8,-1),_e=s=>xe(s)=="Object",Ne=s=>xe(s)=="Function",me=s=>["Object","Array"].includes(xe(s)),ke=Object.getPrototypeOf,we=s=>se(s)?s.val:s,se=s=>s==null?void 0:s.__isState,Be=["splice","push","pop","shift","unshift","sort","reverse"],fe=(s,g)=>{const w=new Array(s.length);for(let v=0;v<s.length;v++)w[v]=g(s[v],v);return w};const Le=s=>!se(s[0])&&_e(s[0])?s:[{},...s];function Me(s){let g=window,{document:w}=g,v,d=new Set,b=new Set,y=!1,N,$=r=>w.createElement(r),S=(r,o,i)=>{let u=N;N=o;let m=r(i);return N=u,m},M=()=>{v||(v=g.requestAnimationFrame(()=>{d.forEach(r=>{r.bindings=r.bindings.filter(o=>{var i;return(i=o.element)==null?void 0:i.isConnected}),!r.bindings.length&&!r.computed&&d.delete(r)}),v=void 0}))},_=(r,o,i,u,m,E)=>{var k;if(y){b.add(r);return}for(let P of r.bindings){let{deps:O,element:x,renderInferred:C,render:L,renderItem:H}=P;if(H&&o)(k=U(x,u,(...re)=>q(H(...re)),i,m,E)[o])==null||k.call();else{let re=C?C({element:x}):L({element:x,renderItem:H})(...O.map(we));re!==x&&x.replaceWith(P.element=q(re))}}g.requestAnimationFrame(()=>I(r)),M()},z=(r,o,i=[])=>({get(u,m,E){var k;if(N==null||N.add(r),m==="_isProxy")return!0;if(!((k=u[m])!=null&&k._isProxy)&&!se(u[m])&&me(u[m]))u[m]=new Proxy(u[m],z(r,o,[...i,m]));else if(Be.includes(m)){let P=u[m];return(...O)=>{let x=P.apply(u,O);return _(r,m,x,O,o,i),x}}return Reflect.get(u,m,E)},set(u,m,E,k){let P=Reflect.set(u,m,E,k);return _(r,"setItem",P,{prop:m,value:E},o,[...i,m]),P}}),B=(r,o)=>new Proxy(o,z(r,o)),U=(r,o,i,u,m,E)=>{let k=()=>r.replaceChildren(...fe(u,i)),P=O=>r[O]&&r.removeChild(r[O]);return{assign:k,sort:k,reverse:k,setItem:()=>{var x;let O=E[0];(x=r.children[O])==null||x.replaceWith(i(m[O],O))},push:()=>r.append(...fe(o,(O,x)=>i(O,m.length+x))),unshift:()=>r.prepend(...fe(o,i)),pop:()=>P("lastChild"),shift:()=>P("firstChild"),splice:()=>{const{length:O}=r.children;let[x,C=O,...L]=o;for(let H=x>=0?Math.min(x+C-1,O-1):O-1;H>=(x>=0?x:O+x);H--)r.children[H].remove();if(L.length){let H=L.map((re,ae)=>i(re,x+ae));r.children[x]?r.children[x].before(...H):r.append(...H)}}}},G=r=>({oldVal:r,bindings:[],listeners:[],__isState:!0,get val(){let o=this;return N==null||N.add(o),o.valProxy??(o.valProxy=me(r)?B(o,r):r,o.valProxy)},set val(o){let i=this,u=i.val;me(o)?(i.valProxy=B(i,o),_(i,"assign",o)):o!==u&&(i.valProxy=o,_(i)),i.oldVal=u}}),q=r=>{if(r==null||r===!1){const o=$("span");return o.style.display="none",o}else return r.nodeType?r:w.createTextNode(r)},R=(r,o)=>{let i=new Set;return o.val=S(r,i),i},p=r=>{let o=G(),i=R(r,o);o.computed=!0;for(let u of i)u.listeners.push({computed:r,deps:i,state:o});return o},I=r=>{for(let o of[...r.listeners])R(o.computed,o.state)},Y=(r,...o)=>{if(o.length){let i=[];for(let u of o.flat(1/0))u!=null&&i.push(se(u)?c({deps:[u],render:()=>m=>m}):Ne(u)?a({renderInferred:u}):q(u));r.append(...i)}},Q={},D=(r,o)=>r&&(Object.getOwnPropertyDescriptor(r,o)??D(ke(r),o)),W=(r,o,i)=>{var u;return Q[r+","+o]??(Q[r+","+o]=((u=D(i,o))==null?void 0:u.set)??0)},e=(r,o)=>new g.MutationObserver((i,u)=>{i.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(E=>E===r&&(o({element:r}),u.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,o)=>new g.MutationObserver((i,u)=>i.forEach(m=>o({record:m,element:r}))).observe(r,{childList:!0}),n=r=>new Proxy(function(i,...u){var P;let[m,...E]=Le(u),k=r?w.createElementNS(r,i):$(i);for(let[O,x]of Object.entries(m)){if(O.startsWith("bau"))continue;let C=W(i,O,ke(k))?L=>L!==void 0&&(k[O]=L):L=>k.setAttribute(O,Array.isArray(L)?L.filter(H=>H).join(" "):L);x==null||(se(x)?c({deps:[x],render:()=>()=>(C(x.val),k)}):Ne(x)&&(!O.startsWith("on")||x.isDerived)?a({renderInferred:()=>(C(x({element:k})),k)}):x.renderProp?c({deps:x.deps,render:()=>()=>(C(x.renderProp({element:k})(...x.deps.map(we))),k)}):C(x))}return m.bauChildMutated&&t(k,m.bauChildMutated),Y(k,...E),k.autofocus&&k.focus&&g.requestAnimationFrame(()=>k.focus()),(P=m.bauCreated)==null||P.call(m,{element:k}),m.bauMounted&&g.requestAnimationFrame(()=>m.bauMounted({element:k})),m.bauUnmounted&&g.requestAnimationFrame(()=>e(k,m.bauUnmounted)),k},{get:(o,i)=>o.bind(void 0,i)}),f=(r,o,i)=>{r.element=q(i);for(let u of o)se(u)&&(d.add(u),u.bindings.push(r));return r.element},a=({renderInferred:r,element:o})=>{let i=new Set,u=S(r,i,{element:o});return f({renderInferred:r},i,u)},c=({deps:r,element:o,render:i,renderItem:u})=>f({deps:r,render:i,renderItem:u},r,i({element:o,renderItem:u})(...r.map(we))),h=(r,o,i)=>c({deps:[r],render:({renderItem:u})=>m=>(o.append(...fe(m,u)),o),renderItem:i}),l=async r=>{y=!0;const o=await r();return y=!1,b.forEach(_),b.clear(),o};return{tags:n(),tagsNS:n,state:G,bind:c,loop:h,derive:p,stateSet:d,batch:l}}const De=s=>{let g=0,w=11;for(;g<s.length;)w=101*w+s.charCodeAt(g++)>>>0;return"bau"+w},Re=(s,g,w,v)=>{const d=s.createElement("style");d.id=w,d.append(v),(g??s.head).append(d)},Te=(s,g)=>s.reduce((w,v,d)=>w+v+(g[d]??""),"");function Fe(s){let{document:g}=(s==null?void 0:s.window)??window;const w=v=>(d,...b)=>{const y=Te(d,b),N=De(y);return!g.getElementById(N)&&Re(g,s==null?void 0:s.target,N,v(N,y)),N};return{css:w((v,d)=>`.${v} { ${d} }`),keyframes:w((v,d)=>`@keyframes ${v} { ${d} }`),createGlobalStyles:w((v,d)=>d)}}const Ee=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],ze=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],qe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ue=s=>`var(--color-${s})`,je=s=>`var(--color-${s}-lightest)`,Ge=()=>Ee.map(([s])=>`
.outline.${s} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${s} {
  background-color: ${je(s)};
}
.solid.${s} {
  background-color: ${Ue(s)};
}
`).join(`
`),He=()=>Ee.map(([s])=>[`--color-${s}-s: var(--color-${s}-dark-s);`]).join(`
`),We=s=>100-s*10,Ve=()=>new Array(10).fill("").map((s,g)=>`--color-gray-${g*100}: hsl(0, 0%, ${We(g)}%);`).join(`
`),Oe=({dark:s})=>new Array(10).fill("").map((g,w)=>`--color-emphasis-${w*100}: var(--color-gray-${s?1e3-w*100:w*100});`).join(`
`),Xe=([s,{h:g,s:w,l:v}])=>[`--color-${s}-h: ${g};`,`--color-${s}-l: ${v};`,`--color-${s}-base-s: ${w};`,`--color-${s}-s: var(--color-${s}-base-s);`,`--color-${s}-dark-s: calc(${w} - 25%);`,`--color-${s}-hsl: var(--color-${s}-h), var(--color-${s}-s), var(--color-${s}-l);`,`--color-${s}: hsl(var(--color-${s}-hsl));`,...ze.map(([d,b])=>`--color-${s}-${d}: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * ${b}));`),...qe.map(([d,b])=>`--color-${s}-${d}: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * ${b}));`),`--color-${s}-contrast-background: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) / var(--contrast-background-value)));`,`--color-${s}-contrast-foreground: hsl(var(--color-${s}-h), var(--color-${s}-s), calc(var(--color-${s}-l) * var(--contrast-foreground-value)));`].join(`
`);function Ye({createGlobalStyles:s},{colorPalette:g=Ee}={}){s`
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
  `}function Qe(s){const g=Me(),w=Fe({target:window.document.getElementById("bau-css")});return Ye(w),{bau:g,...w,tr:v=>v,window,...s}}const Ke=(s,g)=>({...s,paths:[...g,s.path]}),Se=({paths:s=[],routes:g})=>g.flatMap(({children:w,...v})=>{const d=Ke(v,s);return w?[d,...Se({paths:[...s,v.path],routes:w})]:d}),Je=({paths:s})=>{const g=s.map(w=>w instanceof RegExp?w.source:w).map(w=>String.raw`\/${w}`).join("");return new RegExp(`^${g}$`)},Ze=({routes:s=[],notFoundRoute:g})=>{const w=Se({routes:s}).map(v=>({...v,regex:Je(v)}));return{resolve:({pathname:v})=>{const d=w.find(({regex:b})=>b.test(v));return d?d.action({match:v.match(d.regex)}):g}}};function et({routes:s,notFoundRoute:g,onLocationChange:w}){let v={...window.location};const d=y=>{v={...y}},b=Ze({routes:s,notFoundRoute:g});return window.addEventListener("popstate",y=>{v.pathname!=y.target.location.pathname&&w({router:b}),d(y.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(y,N,$)=>{y.apply(N,$),v.pathname!=window.location.pathname&&w({router:b}),d(window.location)}}),document.addEventListener("click",y=>{const{target:N}=y,$=N.closest("a");if(!$)return;const S=$.getAttribute("href");S&&!S.startsWith("http")&&!S.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",S),history.pushState({},null,S),d(window.location),["?","#"].includes(S[0])||window.scrollTo({top:0,left:0}),y.preventDefault())}),w({router:b}),b}const tt=({context:s,LayoutDefault:g,config:{base:w=""}={}})=>{const{window:v,bau:d}=s,b=d.state();let y;return({router:N})=>{var z;const $=v.location.pathname.replace(w,""),{title:S,component:M,Layout:_=g}=N.resolve({pathname:$});y!=_&&(y=_,(z=document.getElementById("app"))==null||z.replaceChildren(_({componentState:b}))),b.val=M({}),document.title=`${S} - E-commerce Product Page`}},rt=[{text:"Collection",href:"collection"},{text:"Men",href:"men"},{text:"Women",href:"women"},{text:"About",href:"about"},{text:"Contact",href:"contact"}],nt=s=>{const{bau:g,css:w}=s,{a:v,ul:d,li:b,nav:y}=g.tags,N=w`
    & ul {
      display: flex;
      list-style: none;
      > li {
        & a {
          text-decoration: none;
        }
      }
    }
  `;return $=>y({class:N,...$},d(rt.map(({text:S,href:M})=>b(v({href:M},S)))))},ot="dialog-cart",ue="drawer",it=(s,{cartState:g})=>{const{bau:w,css:v}=s,{header:d,div:b,img:y,button:N,span:$,dialog:S,form:M}=w.tags,{svg:_,use:z}=w.tagsNS("http://www.w3.org/2000/svg"),B=w.derive(()=>g.val.reduce((p,{quantity:I})=>p+=I,0)),U=nt(s),G=()=>S({id:ue,onclick:({target:p,currentTarget:I})=>{p==I&&p.close()},class:v`
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
        `},M(d(N({role:"close",onclick:R(ue)},"❌")),U({onclick:R(ue)}))),q=v`
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
      & button[arial-label="cart"] {
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
  `,R=p=>()=>{const I=document.getElementById(p);I.open?I.close():I.showModal()};return()=>[G(),d({class:q},b({class:"header-left"},N({"arial-label":"menu",class:"burger",onclick:R(ue)},y({src:"./assets/images/icon-menu.svg",alt:"Menu",width:15,height:15})),y({class:"logo",src:"./assets/images/logo.svg",alt:"Logo",width:138,height:20})),U({}),b({class:"header-right"},N({"arial-label":"cart",onclick:R(ot)},_({width:22,height:20,viewBox:"0 0 22 22",fill:"currentColor"},z({href:"./assets/images/icon-cart.svg#cart"})),()=>B.val>0&&$({class:["badge","solid"]},B)),N(y({class:"avatar",src:"./assets/images/image-avatar.png",alt:"Logo",width:55,height:55}))))]};var lt=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,ve=Math.ceil,Z=Math.floor,X="[BigNumber Error] ",Ae=X+"Number primitive has more than 15 significant digits: ",te=1e14,A=14,ye=9007199254740991,be=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],ie=1e7,j=1e9;function Ce(s){var g,w,v,d=p.prototype={constructor:p,toString:null,valueOf:null},b=new p(1),y=20,N=4,$=-7,S=21,M=-1e7,_=1e7,z=!1,B=1,U=0,G={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},q="0123456789abcdefghijklmnopqrstuvwxyz",R=!0;function p(e,t){var n,f,a,c,h,l,r,o,i=this;if(!(i instanceof p))return new p(e,t);if(t==null){if(e&&e._isBigNumber===!0){i.s=e.s,!e.c||e.e>_?i.c=i.e=null:e.e<M?i.c=[i.e=0]:(i.e=e.e,i.c=e.c.slice());return}if((l=typeof e=="number")&&e*0==0){if(i.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,h=e;h>=10;h/=10,c++);c>_?i.c=i.e=null:(i.e=c,i.c=[e]);return}o=String(e)}else{if(!lt.test(o=String(e)))return v(i,o,l);i.s=o.charCodeAt(0)==45?(o=o.slice(1),-1):1}(c=o.indexOf("."))>-1&&(o=o.replace(".","")),(h=o.search(/e/i))>0?(c<0&&(c=h),c+=+o.slice(h+1),o=o.substring(0,h)):c<0&&(c=o.length)}else{if(T(t,2,q.length,"Base"),t==10&&R)return i=new p(e),D(i,y+i.e+1,N);if(o=String(e),l=typeof e=="number"){if(e*0!=0)return v(i,o,l,t);if(i.s=1/e<0?(o=o.slice(1),-1):1,p.DEBUG&&o.replace(/^0\.0*|\./,"").length>15)throw Error(Ae+e)}else i.s=o.charCodeAt(0)===45?(o=o.slice(1),-1):1;for(n=q.slice(0,t),c=h=0,r=o.length;h<r;h++)if(n.indexOf(f=o.charAt(h))<0){if(f=="."){if(h>c){c=r;continue}}else if(!a&&(o==o.toUpperCase()&&(o=o.toLowerCase())||o==o.toLowerCase()&&(o=o.toUpperCase()))){a=!0,h=-1,c=0;continue}return v(i,String(e),l,t)}l=!1,o=w(o,t,10,i.s),(c=o.indexOf("."))>-1?o=o.replace(".",""):c=o.length}for(h=0;o.charCodeAt(h)===48;h++);for(r=o.length;o.charCodeAt(--r)===48;);if(o=o.slice(h,++r)){if(r-=h,l&&p.DEBUG&&r>15&&(e>ye||e!==Z(e)))throw Error(Ae+i.s*e);if((c=c-h-1)>_)i.c=i.e=null;else if(c<M)i.c=[i.e=0];else{if(i.e=c,i.c=[],h=(c+1)%A,c<0&&(h+=A),h<r){for(h&&i.c.push(+o.slice(0,h)),r-=A;h<r;)i.c.push(+o.slice(h,h+=A));h=A-(o=o.slice(h)).length}else h-=r;for(;h--;o+="0");i.c.push(+o)}}else i.c=[i.e=0]}p.clone=Ce,p.ROUND_UP=0,p.ROUND_DOWN=1,p.ROUND_CEIL=2,p.ROUND_FLOOR=3,p.ROUND_HALF_UP=4,p.ROUND_HALF_DOWN=5,p.ROUND_HALF_EVEN=6,p.ROUND_HALF_CEIL=7,p.ROUND_HALF_FLOOR=8,p.EUCLID=9,p.config=p.set=function(e){var t,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(n=e[t],T(n,0,j,t),y=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(n=e[t],T(n,0,8,t),N=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(n=e[t],n&&n.pop?(T(n[0],-j,0,t),T(n[1],0,j,t),$=n[0],S=n[1]):(T(n,-j,j,t),$=-(S=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if(n=e[t],n&&n.pop)T(n[0],-j,-1,t),T(n[1],1,j,t),M=n[0],_=n[1];else if(T(n,-j,j,t),n)M=-(_=n<0?-n:n);else throw Error(X+t+" cannot be zero: "+n);if(e.hasOwnProperty(t="CRYPTO"))if(n=e[t],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))z=n;else throw z=!n,Error(X+"crypto unavailable");else z=n;else throw Error(X+t+" not true or false: "+n);if(e.hasOwnProperty(t="MODULO_MODE")&&(n=e[t],T(n,0,9,t),B=n),e.hasOwnProperty(t="POW_PRECISION")&&(n=e[t],T(n,0,j,t),U=n),e.hasOwnProperty(t="FORMAT"))if(n=e[t],typeof n=="object")G=n;else throw Error(X+t+" not an object: "+n);if(e.hasOwnProperty(t="ALPHABET"))if(n=e[t],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))R=n.slice(0,10)=="0123456789",q=n;else throw Error(X+t+" invalid: "+n)}else throw Error(X+"Object expected: "+e);return{DECIMAL_PLACES:y,ROUNDING_MODE:N,EXPONENTIAL_AT:[$,S],RANGE:[M,_],CRYPTO:z,MODULO_MODE:B,POW_PRECISION:U,FORMAT:G,ALPHABET:q}},p.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!p.DEBUG)return!0;var t,n,f=e.c,a=e.e,c=e.s;e:if({}.toString.call(f)=="[object Array]"){if((c===1||c===-1)&&a>=-j&&a<=j&&a===Z(a)){if(f[0]===0){if(a===0&&f.length===1)return!0;break e}if(t=(a+1)%A,t<1&&(t+=A),String(f[0]).length==t){for(t=0;t<f.length;t++)if(n=f[t],n<0||n>=te||n!==Z(n))break e;if(n!==0)return!0}}}else if(f===null&&a===null&&(c===null||c===1||c===-1))return!0;throw Error(X+"Invalid BigNumber: "+e)},p.maximum=p.max=function(){return Y(arguments,-1)},p.minimum=p.min=function(){return Y(arguments,1)},p.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return Z(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var f,a,c,h,l,r=0,o=[],i=new p(b);if(n==null?n=y:T(n,0,j),h=ve(n/A),z)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(h*=2));r<h;)l=f[r]*131072+(f[r+1]>>>11),l>=9e15?(a=crypto.getRandomValues(new Uint32Array(2)),f[r]=a[0],f[r+1]=a[1]):(o.push(l%1e14),r+=2);r=h/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(h*=7);r<h;)l=(f[r]&31)*281474976710656+f[r+1]*1099511627776+f[r+2]*4294967296+f[r+3]*16777216+(f[r+4]<<16)+(f[r+5]<<8)+f[r+6],l>=9e15?crypto.randomBytes(7).copy(f,r):(o.push(l%1e14),r+=7);r=h/7}else throw z=!1,Error(X+"crypto unavailable");if(!z)for(;r<h;)l=t(),l<9e15&&(o[r++]=l%1e14);for(h=o[--r],n%=A,h&&n&&(l=be[A-n],o[r]=Z(h/l)*l);o[r]===0;o.pop(),r--);if(r<0)o=[c=0];else{for(c=-1;o[0]===0;o.splice(0,1),c-=A);for(r=1,l=o[0];l>=10;l/=10,r++);r<A&&(c-=A-r)}return i.e=c,i.c=o,i}}(),p.sum=function(){for(var e=1,t=arguments,n=new p(t[0]);e<t.length;)n=n.plus(t[e++]);return n},w=function(){var e="0123456789";function t(n,f,a,c){for(var h,l=[0],r,o=0,i=n.length;o<i;){for(r=l.length;r--;l[r]*=f);for(l[0]+=c.indexOf(n.charAt(o++)),h=0;h<l.length;h++)l[h]>a-1&&(l[h+1]==null&&(l[h+1]=0),l[h+1]+=l[h]/a|0,l[h]%=a)}return l.reverse()}return function(n,f,a,c,h){var l,r,o,i,u,m,E,k,P=n.indexOf("."),O=y,x=N;for(P>=0&&(i=U,U=0,n=n.replace(".",""),k=new p(f),m=k.pow(n.length-P),U=i,k.c=t(oe(J(m.c),m.e,"0"),10,a,e),k.e=k.c.length),E=t(n,f,a,h?(l=q,e):(l=e,q)),o=i=E.length;E[--i]==0;E.pop());if(!E[0])return l.charAt(0);if(P<0?--o:(m.c=E,m.e=o,m.s=c,m=g(m,k,O,x,a),E=m.c,u=m.r,o=m.e),r=o+O+1,P=E[r],i=a/2,u=u||r<0||E[r+1]!=null,u=x<4?(P!=null||u)&&(x==0||x==(m.s<0?3:2)):P>i||P==i&&(x==4||u||x==6&&E[r-1]&1||x==(m.s<0?8:7)),r<1||!E[0])n=u?oe(l.charAt(1),-O,l.charAt(0)):l.charAt(0);else{if(E.length=r,u)for(--a;++E[--r]>a;)E[r]=0,r||(++o,E=[1].concat(E));for(i=E.length;!E[--i];);for(P=0,n="";P<=i;n+=l.charAt(E[P++]));n=oe(n,o,l.charAt(0))}return n}}(),g=function(){function e(f,a,c){var h,l,r,o,i=0,u=f.length,m=a%ie,E=a/ie|0;for(f=f.slice();u--;)r=f[u]%ie,o=f[u]/ie|0,h=E*r+o*m,l=m*r+h%ie*ie+i,i=(l/c|0)+(h/ie|0)+E*o,f[u]=l%c;return i&&(f=[i].concat(f)),f}function t(f,a,c,h){var l,r;if(c!=h)r=c>h?1:-1;else for(l=r=0;l<c;l++)if(f[l]!=a[l]){r=f[l]>a[l]?1:-1;break}return r}function n(f,a,c,h){for(var l=0;c--;)f[c]-=l,l=f[c]<a[c]?1:0,f[c]=l*h+f[c]-a[c];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,a,c,h,l){var r,o,i,u,m,E,k,P,O,x,C,L,H,re,ae,ne,ce,K=f.s==a.s?1:-1,V=f.c,F=a.c;if(!V||!V[0]||!F||!F[0])return new p(!f.s||!a.s||(V?F&&V[0]==F[0]:!F)?NaN:V&&V[0]==0||!F?K*0:K/0);for(P=new p(K),O=P.c=[],o=f.e-a.e,K=c+o+1,l||(l=te,o=ee(f.e/A)-ee(a.e/A),K=K/A|0),i=0;F[i]==(V[i]||0);i++);if(F[i]>(V[i]||0)&&o--,K<0)O.push(1),u=!0;else{for(re=V.length,ne=F.length,i=0,K+=2,m=Z(l/(F[0]+1)),m>1&&(F=e(F,m,l),V=e(V,m,l),ne=F.length,re=V.length),H=ne,x=V.slice(0,ne),C=x.length;C<ne;x[C++]=0);ce=F.slice(),ce=[0].concat(ce),ae=F[0],F[1]>=l/2&&ae++;do{if(m=0,r=t(F,x,ne,C),r<0){if(L=x[0],ne!=C&&(L=L*l+(x[1]||0)),m=Z(L/ae),m>1)for(m>=l&&(m=l-1),E=e(F,m,l),k=E.length,C=x.length;t(E,x,k,C)==1;)m--,n(E,ne<k?ce:F,k,l),k=E.length,r=1;else m==0&&(r=m=1),E=F.slice(),k=E.length;if(k<C&&(E=[0].concat(E)),n(x,E,C,l),C=x.length,r==-1)for(;t(F,x,ne,C)<1;)m++,n(x,ne<C?ce:F,C,l),C=x.length}else r===0&&(m++,x=[0]);O[i++]=m,x[0]?x[C++]=V[H]||0:(x=[V[H]],C=1)}while((H++<re||x[0]!=null)&&K--);u=x[0]!=null,O[0]||O.splice(0,1)}if(l==te){for(i=1,K=O[0];K>=10;K/=10,i++);D(P,c+(P.e=i+o*A-1)+1,h,u)}else P.e=o,P.r=+u;return P}}();function I(e,t,n,f){var a,c,h,l,r;if(n==null?n=N:T(n,0,8),!e.c)return e.toString();if(a=e.c[0],h=e.e,t==null)r=J(e.c),r=f==1||f==2&&(h<=$||h>=S)?he(r,h):oe(r,h,"0");else if(e=D(new p(e),t,n),c=e.e,r=J(e.c),l=r.length,f==1||f==2&&(t<=c||c<=$)){for(;l<t;r+="0",l++);r=he(r,c)}else if(t-=h,r=oe(r,c,"0"),c+1>l){if(--t>0)for(r+=".";t--;r+="0");}else if(t+=c-l,t>0)for(c+1==l&&(r+=".");t--;r+="0");return e.s<0&&a?"-"+r:r}function Y(e,t){for(var n,f,a=1,c=new p(e[0]);a<e.length;a++)f=new p(e[a]),(!f.s||(n=le(c,f))===t||n===0&&c.s===t)&&(c=f);return c}function Q(e,t,n){for(var f=1,a=t.length;!t[--a];t.pop());for(a=t[0];a>=10;a/=10,f++);return(n=f+n*A-1)>_?e.c=e.e=null:n<M?e.c=[e.e=0]:(e.e=n,e.c=t),e}v=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,n=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,a=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(c,h,l,r){var o,i=l?h:h.replace(a,"");if(f.test(i))c.s=isNaN(i)?null:i<0?-1:1;else{if(!l&&(i=i.replace(e,function(u,m,E){return o=(E=E.toLowerCase())=="x"?16:E=="b"?2:8,!r||r==o?m:u}),r&&(o=r,i=i.replace(t,"$1").replace(n,"0.$1")),h!=i))return new p(i,o);if(p.DEBUG)throw Error(X+"Not a"+(r?" base "+r:"")+" number: "+h);c.s=null}c.c=c.e=null}}();function D(e,t,n,f){var a,c,h,l,r,o,i,u=e.c,m=be;if(u){e:{for(a=1,l=u[0];l>=10;l/=10,a++);if(c=t-a,c<0)c+=A,h=t,r=u[o=0],i=Z(r/m[a-h-1]%10);else if(o=ve((c+1)/A),o>=u.length)if(f){for(;u.length<=o;u.push(0));r=i=0,a=1,c%=A,h=c-A+1}else break e;else{for(r=l=u[o],a=1;l>=10;l/=10,a++);c%=A,h=c-A+a,i=h<0?0:Z(r/m[a-h-1]%10)}if(f=f||t<0||u[o+1]!=null||(h<0?r:r%m[a-h-1]),f=n<4?(i||f)&&(n==0||n==(e.s<0?3:2)):i>5||i==5&&(n==4||f||n==6&&(c>0?h>0?r/m[a-h]:0:u[o-1])%10&1||n==(e.s<0?8:7)),t<1||!u[0])return u.length=0,f?(t-=e.e+1,u[0]=m[(A-t%A)%A],e.e=-t||0):u[0]=e.e=0,e;if(c==0?(u.length=o,l=1,o--):(u.length=o+1,l=m[A-c],u[o]=h>0?Z(r/m[a-h]%m[h])*l:0),f)for(;;)if(o==0){for(c=1,h=u[0];h>=10;h/=10,c++);for(h=u[0]+=l,l=1;h>=10;h/=10,l++);c!=l&&(e.e++,u[0]==te&&(u[0]=1));break}else{if(u[o]+=l,u[o]!=te)break;u[o--]=0,l=1}for(c=u.length;u[--c]===0;u.pop());}e.e>_?e.c=e.e=null:e.e<M&&(e.c=[e.e=0])}return e}function W(e){var t,n=e.e;return n===null?e.toString():(t=J(e.c),t=n<=$||n>=S?he(t,n):oe(t,n,"0"),e.s<0?"-"+t:t)}return d.absoluteValue=d.abs=function(){var e=new p(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,t){return le(this,new p(e,t))},d.decimalPlaces=d.dp=function(e,t){var n,f,a,c=this;if(e!=null)return T(e,0,j),t==null?t=N:T(t,0,8),D(new p(c),e+c.e+1,t);if(!(n=c.c))return null;if(f=((a=n.length-1)-ee(this.e/A))*A,a=n[a])for(;a%10==0;a/=10,f--);return f<0&&(f=0),f},d.dividedBy=d.div=function(e,t){return g(this,new p(e,t),y,N)},d.dividedToIntegerBy=d.idiv=function(e,t){return g(this,new p(e,t),0,1)},d.exponentiatedBy=d.pow=function(e,t){var n,f,a,c,h,l,r,o,i,u=this;if(e=new p(e),e.c&&!e.isInteger())throw Error(X+"Exponent not an integer: "+W(e));if(t!=null&&(t=new p(t)),l=e.e>14,!u.c||!u.c[0]||u.c[0]==1&&!u.e&&u.c.length==1||!e.c||!e.c[0])return i=new p(Math.pow(+W(u),l?e.s*(2-de(e)):+W(e))),t?i.mod(t):i;if(r=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new p(NaN);f=!r&&u.isInteger()&&t.isInteger(),f&&(u=u.mod(t))}else{if(e.e>9&&(u.e>0||u.e<-1||(u.e==0?u.c[0]>1||l&&u.c[1]>=24e7:u.c[0]<8e13||l&&u.c[0]<=9999975e7)))return c=u.s<0&&de(e)?-0:0,u.e>-1&&(c=1/c),new p(r?1/c:c);U&&(c=ve(U/A+2))}for(l?(n=new p(.5),r&&(e.s=1),o=de(e)):(a=Math.abs(+W(e)),o=a%2),i=new p(b);;){if(o){if(i=i.times(u),!i.c)break;c?i.c.length>c&&(i.c.length=c):f&&(i=i.mod(t))}if(a){if(a=Z(a/2),a===0)break;o=a%2}else if(e=e.times(n),D(e,e.e+1,1),e.e>14)o=de(e);else{if(a=+W(e),a===0)break;o=a%2}u=u.times(u),c?u.c&&u.c.length>c&&(u.c.length=c):f&&(u=u.mod(t))}return f?i:(r&&(i=b.div(i)),t?i.mod(t):c?D(i,U,N,h):i)},d.integerValue=function(e){var t=new p(this);return e==null?e=N:T(e,0,8),D(t,t.e+1,e)},d.isEqualTo=d.eq=function(e,t){return le(this,new p(e,t))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,t){return le(this,new p(e,t))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,t){return(t=le(this,new p(e,t)))===1||t===0},d.isInteger=function(){return!!this.c&&ee(this.e/A)>this.c.length-2},d.isLessThan=d.lt=function(e,t){return le(this,new p(e,t))<0},d.isLessThanOrEqualTo=d.lte=function(e,t){return(t=le(this,new p(e,t)))===-1||t===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,t){var n,f,a,c,h=this,l=h.s;if(e=new p(e,t),t=e.s,!l||!t)return new p(NaN);if(l!=t)return e.s=-t,h.plus(e);var r=h.e/A,o=e.e/A,i=h.c,u=e.c;if(!r||!o){if(!i||!u)return i?(e.s=-t,e):new p(u?h:NaN);if(!i[0]||!u[0])return u[0]?(e.s=-t,e):new p(i[0]?h:N==3?-0:0)}if(r=ee(r),o=ee(o),i=i.slice(),l=r-o){for((c=l<0)?(l=-l,a=i):(o=r,a=u),a.reverse(),t=l;t--;a.push(0));a.reverse()}else for(f=(c=(l=i.length)<(t=u.length))?l:t,l=t=0;t<f;t++)if(i[t]!=u[t]){c=i[t]<u[t];break}if(c&&(a=i,i=u,u=a,e.s=-e.s),t=(f=u.length)-(n=i.length),t>0)for(;t--;i[n++]=0);for(t=te-1;f>l;){if(i[--f]<u[f]){for(n=f;n&&!i[--n];i[n]=t);--i[n],i[f]+=te}i[f]-=u[f]}for(;i[0]==0;i.splice(0,1),--o);return i[0]?Q(e,i,o):(e.s=N==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,t){var n,f,a=this;return e=new p(e,t),!a.c||!e.s||e.c&&!e.c[0]?new p(NaN):!e.c||a.c&&!a.c[0]?new p(a):(B==9?(f=e.s,e.s=1,n=g(a,e,0,3),e.s=f,n.s*=f):n=g(a,e,0,B),e=a.minus(n.times(e)),!e.c[0]&&B==1&&(e.s=a.s),e)},d.multipliedBy=d.times=function(e,t){var n,f,a,c,h,l,r,o,i,u,m,E,k,P,O,x=this,C=x.c,L=(e=new p(e,t)).c;if(!C||!L||!C[0]||!L[0])return!x.s||!e.s||C&&!C[0]&&!L||L&&!L[0]&&!C?e.c=e.e=e.s=null:(e.s*=x.s,!C||!L?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=ee(x.e/A)+ee(e.e/A),e.s*=x.s,r=C.length,u=L.length,r<u&&(k=C,C=L,L=k,a=r,r=u,u=a),a=r+u,k=[];a--;k.push(0));for(P=te,O=ie,a=u;--a>=0;){for(n=0,m=L[a]%O,E=L[a]/O|0,h=r,c=a+h;c>a;)o=C[--h]%O,i=C[h]/O|0,l=E*o+i*m,o=m*o+l%O*O+k[c]+n,n=(o/P|0)+(l/O|0)+E*i,k[c--]=o%P;k[c]=n}return n?++f:k.splice(0,1),Q(e,k,f)},d.negated=function(){var e=new p(this);return e.s=-e.s||null,e},d.plus=function(e,t){var n,f=this,a=f.s;if(e=new p(e,t),t=e.s,!a||!t)return new p(NaN);if(a!=t)return e.s=-t,f.minus(e);var c=f.e/A,h=e.e/A,l=f.c,r=e.c;if(!c||!h){if(!l||!r)return new p(a/0);if(!l[0]||!r[0])return r[0]?e:new p(l[0]?f:a*0)}if(c=ee(c),h=ee(h),l=l.slice(),a=c-h){for(a>0?(h=c,n=r):(a=-a,n=l),n.reverse();a--;n.push(0));n.reverse()}for(a=l.length,t=r.length,a-t<0&&(n=r,r=l,l=n,t=a),a=0;t;)a=(l[--t]=l[t]+r[t]+a)/te|0,l[t]=te===l[t]?0:l[t]%te;return a&&(l=[a].concat(l),++h),Q(e,l,h)},d.precision=d.sd=function(e,t){var n,f,a,c=this;if(e!=null&&e!==!!e)return T(e,1,j),t==null?t=N:T(t,0,8),D(new p(c),e,t);if(!(n=c.c))return null;if(a=n.length-1,f=a*A+1,a=n[a]){for(;a%10==0;a/=10,f--);for(a=n[0];a>=10;a/=10,f++);}return e&&c.e+1>f&&(f=c.e+1),f},d.shiftedBy=function(e){return T(e,-ye,ye),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,t,n,f,a,c=this,h=c.c,l=c.s,r=c.e,o=y+4,i=new p("0.5");if(l!==1||!h||!h[0])return new p(!l||l<0&&(!h||h[0])?NaN:h?c:1/0);if(l=Math.sqrt(+W(c)),l==0||l==1/0?(t=J(h),(t.length+r)%2==0&&(t+="0"),l=Math.sqrt(+t),r=ee((r+1)/2)-(r<0||r%2),l==1/0?t="5e"+r:(t=l.toExponential(),t=t.slice(0,t.indexOf("e")+1)+r),n=new p(t)):n=new p(l+""),n.c[0]){for(r=n.e,l=r+o,l<3&&(l=0);;)if(a=n,n=i.times(a.plus(g(c,a,o,1))),J(a.c).slice(0,l)===(t=J(n.c)).slice(0,l))if(n.e<r&&--l,t=t.slice(l-3,l+1),t=="9999"||!f&&t=="4999"){if(!f&&(D(a,a.e+y+2,0),a.times(a).eq(c))){n=a;break}o+=4,l+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(D(n,n.e+y+2,1),e=!n.times(n).eq(c));break}}return D(n,n.e+y+1,N,e)},d.toExponential=function(e,t){return e!=null&&(T(e,0,j),e++),I(this,e,t,1)},d.toFixed=function(e,t){return e!=null&&(T(e,0,j),e=e+this.e+1),I(this,e,t)},d.toFormat=function(e,t,n){var f,a=this;if(n==null)e!=null&&t&&typeof t=="object"?(n=t,t=null):e&&typeof e=="object"?(n=e,e=t=null):n=G;else if(typeof n!="object")throw Error(X+"Argument not an object: "+n);if(f=a.toFixed(e,t),a.c){var c,h=f.split("."),l=+n.groupSize,r=+n.secondaryGroupSize,o=n.groupSeparator||"",i=h[0],u=h[1],m=a.s<0,E=m?i.slice(1):i,k=E.length;if(r&&(c=l,l=r,r=c,k-=c),l>0&&k>0){for(c=k%l||l,i=E.substr(0,c);c<k;c+=l)i+=o+E.substr(c,l);r>0&&(i+=o+E.slice(c)),m&&(i="-"+i)}f=u?i+(n.decimalSeparator||"")+((r=+n.fractionGroupSize)?u.replace(new RegExp("\\d{"+r+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):u):i}return(n.prefix||"")+f+(n.suffix||"")},d.toFraction=function(e){var t,n,f,a,c,h,l,r,o,i,u,m,E=this,k=E.c;if(e!=null&&(l=new p(e),!l.isInteger()&&(l.c||l.s!==1)||l.lt(b)))throw Error(X+"Argument "+(l.isInteger()?"out of range: ":"not an integer: ")+W(l));if(!k)return new p(E);for(t=new p(b),o=n=new p(b),f=r=new p(b),m=J(k),c=t.e=m.length-E.e-1,t.c[0]=be[(h=c%A)<0?A+h:h],e=!e||l.comparedTo(t)>0?c>0?t:o:l,h=_,_=1/0,l=new p(m),r.c[0]=0;i=g(l,t,0,1),a=n.plus(i.times(f)),a.comparedTo(e)!=1;)n=f,f=a,o=r.plus(i.times(a=o)),r=a,t=l.minus(i.times(a=t)),l=a;return a=g(e.minus(n),f,0,1),r=r.plus(a.times(o)),n=n.plus(a.times(f)),r.s=o.s=E.s,c=c*2,u=g(o,f,c,N).minus(E).abs().comparedTo(g(r,n,c,N).minus(E).abs())<1?[o,f]:[r,n],_=h,u},d.toNumber=function(){return+W(this)},d.toPrecision=function(e,t){return e!=null&&T(e,1,j),I(this,e,t,2)},d.toString=function(e){var t,n=this,f=n.s,a=n.e;return a===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=a<=$||a>=S?he(J(n.c),a):oe(J(n.c),a,"0"):e===10&&R?(n=D(new p(n),y+a+1,N),t=oe(J(n.c),n.e,"0")):(T(e,2,q.length,"Base"),t=w(oe(J(n.c),a,"0"),10,e,f,!0)),f<0&&n.c[0]&&(t="-"+t)),t},d.valueOf=d.toJSON=function(){return W(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,s!=null&&p.set(s),p}function ee(s){var g=s|0;return s>0||s===g?g:g-1}function J(s){for(var g,w,v=1,d=s.length,b=s[0]+"";v<d;){for(g=s[v++]+"",w=A-g.length;w--;g="0"+g);b+=g}for(d=b.length;b.charCodeAt(--d)===48;);return b.slice(0,d+1||1)}function le(s,g){var w,v,d=s.c,b=g.c,y=s.s,N=g.s,$=s.e,S=g.e;if(!y||!N)return null;if(w=d&&!d[0],v=b&&!b[0],w||v)return w?v?0:-N:y;if(y!=N)return y;if(w=y<0,v=$==S,!d||!b)return v?0:!d^w?1:-1;if(!v)return $>S^w?1:-1;for(N=($=d.length)<(S=b.length)?$:S,y=0;y<N;y++)if(d[y]!=b[y])return d[y]>b[y]^w?1:-1;return $==S?0:$>S^w?1:-1}function T(s,g,w,v){if(s<g||s>w||s!==Z(s))throw Error(X+(v||"Argument")+(typeof s=="number"?s<g||s>w?" out of range: ":" not an integer: ":" not a primitive number: ")+String(s))}function de(s){var g=s.c.length-1;return ee(s.e/A)==g&&s.c[g]%2!=0}function he(s,g){return(s.length>1?s.charAt(0)+"."+s.slice(1):s)+(g<0?"e":"e+")+g}function oe(s,g,w){var v,d;if(g<0){for(d=w+".";++g;d+=w);s=d+s}else if(v=s.length,++g>v){for(d=w,g-=v;--g;d+=w);s+=d}else g<v&&(s=s.slice(0,g)+"."+s.slice(g));return s}var st=Ce();const at="en-US",ct="USD",pe=s=>new Intl.NumberFormat(at,{style:"currency",currency:ct}).format(s);function ft(s,{cartState:g}){const{bau:w,css:v}=s,{div:d,dialog:b,ul:y,li:N,span:$,button:S,img:M,header:_,footer:z,h1:B,form:U}=w.tags,G=w.derive(()=>g.val.length==0),q=I=>()=>{const Y=g.val.findIndex(({name:Q})=>Q==I.name);Y>=0&&g.val.splice(Y,1)},R=v`
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
  `,p=()=>{document.getElementById("dialog-cart").close()};return()=>b({id:"dialog-cart",class:R,onclick:({target:I,currentTarget:Y})=>{I==Y&&I.close()}},U(_(B("Cart")),()=>G.val?d({class:"cart-empty"},"Your cart is empty"):d({class:"inner-cart"},w.loop(g,y(),I=>N(M({src:I.thumbnail,width:48,height:48,alt:""}),d(d({class:"name"},I.name),d($({class:"quantity"},I.quantity,"x"),$({class:"price"},pe(I.price)),$({class:"price-total"},"  =",pe(st(I.price).times(I.quantity).toNumber())))),S({role:"delete",onclick:q(I)},M({src:"./assets/images/icon-delete.svg",alt:""})))),z(S({class:["primary","solid"],type:"submit",onclick:p},"Confirm Order")))))}const ut=(s,{cartState:g})=>{const{bau:w,css:v}=s,{div:d}=w.tags,b=it(s,{cartState:g}),y=ft(s,{cartState:g});return function({componentState:$}){return d({class:v`
          display: grid;
          margin: auto;
          max-width: 1000px;
          min-height: 100vh;
        `},b(),y(),d({style:"flex-grow: 1"},()=>$.val))}};function dt(s,{}){const{bau:g,css:w}=s,{svg:v,use:d}=g.tagsNS("http://www.w3.org/2000/svg"),{section:b,img:y,ul:N,li:$,button:S,div:M,dialog:_,header:z}=g.tags,B=g.state(0),U=w`
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
  `;return({images:G=[]})=>{const q=()=>{B.val<=0?B.val=G.length-1:B.val--},R=()=>{B.val>=G.length-1?B.val=0:B.val++},p=D=>()=>{B.val=D},I=()=>{document.getElementById("dialog-carousel").showModal()},Y=()=>{document.getElementById("dialog-carousel").close()},Q=({images:D,fullscreen:W=!1})=>b({class:["carousel",U,W&&"fullscreen"]},M({class:"track"},M({class:["control","control-previous"],onclick:q},S({role:"previous"},v({width:12,height:18,viewBox:"0 0 12 18"},d({href:"./assets/images/icon-previous.svg#previous"})))),M({class:["control","control-next"],onclick:R},S({role:"next"},v({width:13,height:18,viewBox:"0 0 13 18"},d({href:"./assets/images/icon-next.svg#next"})))),M({class:"track-inner"},N({style:()=>`transform: translateX(${-100*B.val}%);`,onclick:I},D.map(({desktop:e,alt:t})=>$(y({src:e,alt:t,width:440,height:440})))))),N({class:"thumbnail"},D.map(({thumbnail:e,alt:t},n)=>$({class:()=>n==B.val&&"active"},S({onclick:p(n)},y({src:e,alt:t,width:91,height:91}))))));return[Q({images:G}),_({id:"dialog-carousel",class:w`
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
          `},z(S({role:"close",onclick:Y},"❌")),Q({images:G,fullscreen:!0}))]}}function ht(s,{quantityState:g}){const{bau:w,css:v}=s,{div:d,button:b}=w.tags,y=()=>{g.val+=1},N=()=>{g.val<=0||(g.val-=1)},$=v`
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
  `;return()=>d({class:$},b({onclick:N,"aria-label":"decrement quantity"},"➖"),d({class:"quantity"},g),b({onclick:y,"aria-label":"increment quantity"},"➕"))}function gt(s,{cartState:g}){const{bau:w,css:v}=s,{h1:d,h2:b,p:y,div:N,button:$,span:S,section:M}=w.tags,{svg:_,use:z}=w.tagsNS("http://www.w3.org/2000/svg"),B=w.state(1),U=ht(s,{quantityState:B}),G=R=>()=>{const p=g.val.find(({name:I})=>I==R.name);p?p.quantity+=B.val:g.val.push({name:R.name,price:R.price,quantity:B.val,thumbnail:R.imageInfo[0].thumbnail}),B.val=0},q=v`
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
        color: var(--color-emphasis-500);
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
  `;return R=>{const{brand:p,name:I,description:Y,price:Q,discount:D,priceOld:W}=R;return M({class:q},d(p),b(I),y(Y),N({class:"price-container"},y({class:"price-current"},S({class:"price"},pe(Q)),S({class:"discount"},`${D}%`)),y({class:"price-old"},pe(W))),y({class:"cart-action"},U(),$({class:"add-to-cart",onclick:G(R)},_({width:16,height:16,viewBox:"0 0 22 22",fill:"currentColor"},z({href:"./assets/images/icon-cart.svg#cart"})),"Add to cart")))}}const Pe=new Array(4).fill("").map((s,g)=>({thumbnail:`./assets/images/image-product-${g+1}-thumbnail.jpg`,desktop:`./assets/images/image-product-${g+1}.jpg`,alt:`images-${g}`})),pt={brand:"Sneaker Company",name:"Fall Limited Edition Sneakers",description:"These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",imageInfo:Pe,price:125,priceOld:250,discount:50};function mt(s,{cartState:g}){const{bau:w,css:v}=s,{article:d}=w.tags,b=dt(s,{}),y=gt(s,{cartState:g}),N=v`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;return()=>d({class:N},b({images:Pe}),y(pt))}const wt=(s,{cartState:g})=>{const w=mt(s,{cartState:g});return[{path:"",action:v=>({routerContext:v,title:"Product",component:()=>w()})}]},vt=s=>({title:"Page Not Found",component:()=>"Not Found"}),Ie={base:"/bau/frontendmentor/e-commerce-product-page"},ge=Qe({config:Ie}),$e=ge.bau.state([]);et({routes:wt(ge,{cartState:$e}),onLocationChange:tt({context:ge,config:Ie,LayoutDefault:ut(ge,{cartState:$e})}),notFoundRoute:vt()});
