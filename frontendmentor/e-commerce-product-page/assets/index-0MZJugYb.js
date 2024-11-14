(function(){const g=document.createElement("link").relList;if(g&&g.supports&&g.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))v(d);new MutationObserver(d=>{for(const x of d)if(x.type==="childList")for(const y of x.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&v(y)}).observe(document,{childList:!0,subtree:!0});function w(d){const x={};return d.integrity&&(x.integrity=d.integrity),d.referrerPolicy&&(x.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?x.credentials="include":d.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function v(d){if(d.ep)return;d.ep=!0;const x=w(d);fetch(d.href,x)}})();let xe=a=>Object.prototype.toString.call(a??0).slice(8,-1),_e=a=>xe(a)=="Object",Ne=a=>xe(a)=="Function",me=a=>["Object","Array"].includes(xe(a)),ke=Object.getPrototypeOf,we=a=>se(a)?a.val:a,se=a=>a==null?void 0:a.__isState,Le=["splice","push","pop","shift","unshift","sort","reverse"],fe=(a,g)=>{const w=new Array(a.length);for(let v=0;v<a.length;v++)w[v]=g(a[v],v);return w};const Be=a=>!se(a[0])&&_e(a[0])?a:[{},...a];function Me(a){let g=window,{document:w}=g,v,d=new Set,x=new Set,y=!1,N,$=r=>w.createElement(r),S=(r,i,o)=>{let u=N;N=i;let p=r(o);return N=u,p},M=()=>{v||(v=g.requestAnimationFrame(()=>{d.forEach(r=>{r.bindings=r.bindings.filter(i=>{var o;return(o=i.element)==null?void 0:o.isConnected}),!r.bindings.length&&!r.computed&&d.delete(r)}),v=void 0}))},I=(r,i,o,u,p,E)=>{var k;if(y){x.add(r);return}for(let P of r.bindings){let{deps:O,element:b,renderInferred:C,render:L,renderItem:H}=P;if(H&&i)(k=j(b,u,(...re)=>D(H(...re)),o,p,E)[i])==null||k.call();else{let re=C?C({element:b}):L({element:b,renderItem:H})(...O.map(we));re!==b&&b.replaceWith(P.element=D(re))}}g.requestAnimationFrame(()=>R(r)),M()},_=(r,i,o=[])=>({get(u,p,E){var k;if(N==null||N.add(r),p==="_isProxy")return!0;if(!((k=u[p])!=null&&k._isProxy)&&!se(u[p])&&me(u[p]))u[p]=new Proxy(u[p],_(r,i,[...o,p]));else if(Le.includes(p)){let P=u[p];return(...O)=>{let b=P.apply(u,O);return I(r,p,b,O,i,o),b}}return Reflect.get(u,p,E)},set(u,p,E,k){let P=Reflect.set(u,p,E,k);return I(r,"setItem",P,{prop:p,value:E},i,[...o,p]),P}}),T=(r,i)=>new Proxy(i,_(r,i)),j=(r,i,o,u,p,E)=>{let k=()=>r.replaceChildren(...fe(u,o)),P=O=>r[O]&&r.removeChild(r[O]);return{assign:k,sort:k,reverse:k,setItem:()=>{var b;let O=E[0];(b=r.children[O])==null||b.replaceWith(o(p[O],O))},push:()=>r.append(...fe(i,(O,b)=>o(O,p.length+b))),unshift:()=>r.prepend(...fe(i,o)),pop:()=>P("lastChild"),shift:()=>P("firstChild"),splice:()=>{const{length:O}=r.children;let[b,C=O,...L]=i;for(let H=b>=0?Math.min(b+C-1,O-1):O-1;H>=(b>=0?b:O+b);H--)r.children[H].remove();if(L.length){let H=L.map((re,ae)=>o(re,b+ae));r.children[b]?r.children[b].before(...H):r.append(...H)}}}},z=r=>({oldVal:r,bindings:[],listeners:[],__isState:!0,get val(){let i=this;return N==null||N.add(i),i.valProxy??(i.valProxy=me(r)?T(i,r):r,i.valProxy)},set val(i){let o=this,u=o.val;me(i)?(o.valProxy=T(o,i),I(o,"assign",i)):i!==u&&(o.valProxy=i,I(o)),o.oldVal=u}}),D=r=>{if(r==null||r===!1){const i=$("span");return i.style.display="none",i}else return r.nodeType?r:w.createTextNode(r)},B=(r,i)=>{let o=new Set;return i.val=S(r,o),o},m=r=>{let i=z(),o=B(r,i);i.computed=!0;for(let u of o)u.listeners.push({computed:r,deps:o,state:i});return i},R=r=>{for(let i of[...r.listeners])B(i.computed,i.state)},Y=(r,...i)=>{if(i.length){let o=[];for(let u of i.flat(1/0))u!=null&&o.push(se(u)?c({deps:[u],render:()=>p=>p}):Ne(u)?s({renderInferred:u}):D(u));r.append(...o)}},K={},F=(r,i)=>r&&(Object.getOwnPropertyDescriptor(r,i)??F(ke(r),i)),W=(r,i,o)=>{var u;return K[r+","+i]??(K[r+","+i]=((u=F(o,i))==null?void 0:u.set)??0)},e=(r,i)=>new g.MutationObserver((o,u)=>{o.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(E=>E===r&&(i({element:r}),u.disconnect(),!0)))}).observe(r.parentNode,{childList:!0}),t=(r,i)=>new g.MutationObserver((o,u)=>o.forEach(p=>i({record:p,element:r}))).observe(r,{childList:!0}),n=r=>new Proxy(function(o,...u){var P;let[p,...E]=Be(u),k=r?w.createElementNS(r,o):$(o);for(let[O,b]of Object.entries(p)){if(O.startsWith("bau"))continue;let C=W(o,O,ke(k))?L=>L!==void 0&&(k[O]=L):L=>k.setAttribute(O,Array.isArray(L)?L.filter(H=>H).join(" "):L);b==null||(se(b)?c({deps:[b],render:()=>()=>(C(b.val),k)}):Ne(b)&&(!O.startsWith("on")||b.isDerived)?s({renderInferred:()=>(C(b({element:k})),k)}):b.renderProp?c({deps:b.deps,render:()=>()=>(C(b.renderProp({element:k})(...b.deps.map(we))),k)}):C(b))}return p.bauChildMutated&&t(k,p.bauChildMutated),Y(k,...E),k.autofocus&&k.focus&&g.requestAnimationFrame(()=>k.focus()),(P=p.bauCreated)==null||P.call(p,{element:k}),p.bauMounted&&g.requestAnimationFrame(()=>p.bauMounted({element:k})),p.bauUnmounted&&g.requestAnimationFrame(()=>e(k,p.bauUnmounted)),k},{get:(i,o)=>i.bind(void 0,o)}),f=(r,i,o)=>{r.element=D(o);for(let u of i)se(u)&&(d.add(u),u.bindings.push(r));return r.element},s=({renderInferred:r,element:i})=>{let o=new Set,u=S(r,o,{element:i});return f({renderInferred:r},o,u)},c=({deps:r,element:i,render:o,renderItem:u})=>f({deps:r,render:o,renderItem:u},r,o({element:i,renderItem:u})(...r.map(we))),h=(r,i,o)=>c({deps:[r],render:({renderItem:u})=>p=>(i.append(...fe(p,u)),i),renderItem:o}),l=async r=>{y=!0;const i=await r();return y=!1,x.forEach(I),x.clear(),i};return{tags:n(),tagsNS:n,state:z,bind:c,loop:h,derive:m,stateSet:d,batch:l}}const De=a=>{let g=0,w=11;for(;g<a.length;)w=101*w+a.charCodeAt(g++)>>>0;return"bau"+w},Re=(a,g,w,v)=>{const d=a.createElement("style");d.id=w,d.append(v),(g??a.head).append(d)},Te=(a,g)=>a.reduce((w,v,d)=>w+v+(g[d]??""),"");function Fe(a){let{document:g}=(a==null?void 0:a.window)??window;const w=v=>(d,...x)=>{const y=Te(d,x),N=De(y);return!g.getElementById(N)&&Re(g,a==null?void 0:a.target,N,v(N,y)),N};return{css:w((v,d)=>`.${v} { ${d} }`),keyframes:w((v,d)=>`@keyframes ${v} { ${d} }`),createGlobalStyles:w((v,d)=>d)}}const Ee=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],qe=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],Ue=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ze=a=>`var(--color-${a})`,je=a=>`var(--color-${a}-lightest)`,Ge=()=>Ee.map(([a])=>`
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
  `}function Ke(a){const g=Me(),w=Fe({target:window.document.getElementById("bau-css")});return Ye(w),{bau:g,...w,tr:v=>v,window,...a}}const Qe=(a,g)=>({...a,paths:[...g,a.path]}),Se=({paths:a=[],routes:g})=>g.flatMap(({children:w,...v})=>{const d=Qe(v,a);return w?[d,...Se({paths:[...a,v.path],routes:w})]:d}),Je=({paths:a})=>{const g=a.map(w=>w instanceof RegExp?w.source:w).map(w=>String.raw`\/${w}`).join("");return new RegExp(`^${g}$`)},Ze=({routes:a=[],notFoundRoute:g})=>{const w=Se({routes:a}).map(v=>({...v,regex:Je(v)}));return{resolve:({pathname:v})=>{const d=w.find(({regex:x})=>x.test(v));return d?d.action({match:v.match(d.regex)}):g}}};function et({routes:a,notFoundRoute:g,onLocationChange:w}){let v={...window.location};const d=y=>{v={...y}},x=Ze({routes:a,notFoundRoute:g});return window.addEventListener("popstate",y=>{v.pathname!=y.target.location.pathname&&w({router:x}),d(y.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(y,N,$)=>{y.apply(N,$),v.pathname!=window.location.pathname&&w({router:x}),d(window.location)}}),document.addEventListener("click",y=>{const{target:N}=y,$=N.closest("a");if(!$)return;const S=$.getAttribute("href");S&&!S.startsWith("http")&&!S.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",S),history.pushState({},null,S),d(window.location),["?","#"].includes(S[0])||window.scrollTo({top:0,left:0}),y.preventDefault())}),w({router:x}),x}const tt=({context:a,LayoutDefault:g,config:{base:w=""}={}})=>{const{window:v,bau:d}=a,x=d.state();let y;return({router:N})=>{var _;const $=v.location.pathname.replace(w,""),{title:S,component:M,Layout:I=g}=N.resolve({pathname:$});y!=I&&(y=I,(_=document.getElementById("app"))==null||_.replaceChildren(I({componentState:x}))),x.val=M({}),document.title=`${S} - E-commerce Product Page`}},rt=[{text:"Collection",href:"collection"},{text:"Men",href:"men"},{text:"Women",href:"women"},{text:"About",href:"about"},{text:"Contact",href:"contact"}],nt=a=>{const{bau:g,css:w}=a,{a:v,ul:d,li:x,nav:y}=g.tags,N=w`
    & ul {
      display: flex;
      list-style: none;
      > li {
        & a {
          text-decoration: none;
        }
      }
    }
  `;return $=>y({class:N,...$},d(rt.map(({text:S,href:M})=>x(v({href:M},S)))))},it="dialog-cart",ue="drawer",ot=(a,{cartState:g})=>{const{bau:w,css:v}=a,{header:d,div:x,img:y,button:N,span:$,dialog:S,form:M}=w.tags,I=w.derive(()=>g.val.reduce((D,{quantity:B})=>D+=B,0)),_=nt(a),T=()=>S({id:ue,onclick:({target:D,currentTarget:B})=>{D==B&&D.close()},class:v`
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
        `},M(d(N({role:"close",onclick:z(ue)},"❌")),_({onclick:z(ue)}))),j=v`
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
  `,z=D=>()=>{const B=document.getElementById(D);B.open?B.close():B.showModal()};return()=>[T(),d({class:j},x({class:"header-left"},N({class:"burger",onclick:z(ue)},y({src:"./assets/images/icon-menu.svg",alt:"Menu",width:15,height:15})),y({class:"logo",src:"./assets/images/logo.svg",alt:"Logo",width:138,height:20})),_({}),x({class:"header-right"},N({onclick:z(it)},y({class:"cart",src:"./assets/images/icon-cart.svg",alt:"Logo",width:22,height:20}),()=>I.val>0&&$({class:["badge","solid"]},I)),N(y({class:"avatar",src:"./assets/images/image-avatar.png",alt:"Logo",width:55,height:55}))))]};var lt=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,ve=Math.ceil,Z=Math.floor,X="[BigNumber Error] ",Ae=X+"Number primitive has more than 15 significant digits: ",te=1e14,A=14,ye=9007199254740991,be=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],oe=1e7,G=1e9;function Ce(a){var g,w,v,d=m.prototype={constructor:m,toString:null,valueOf:null},x=new m(1),y=20,N=4,$=-7,S=21,M=-1e7,I=1e7,_=!1,T=1,j=0,z={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},D="0123456789abcdefghijklmnopqrstuvwxyz",B=!0;function m(e,t){var n,f,s,c,h,l,r,i,o=this;if(!(o instanceof m))return new m(e,t);if(t==null){if(e&&e._isBigNumber===!0){o.s=e.s,!e.c||e.e>I?o.c=o.e=null:e.e<M?o.c=[o.e=0]:(o.e=e.e,o.c=e.c.slice());return}if((l=typeof e=="number")&&e*0==0){if(o.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,h=e;h>=10;h/=10,c++);c>I?o.c=o.e=null:(o.e=c,o.c=[e]);return}i=String(e)}else{if(!lt.test(i=String(e)))return v(o,i,l);o.s=i.charCodeAt(0)==45?(i=i.slice(1),-1):1}(c=i.indexOf("."))>-1&&(i=i.replace(".","")),(h=i.search(/e/i))>0?(c<0&&(c=h),c+=+i.slice(h+1),i=i.substring(0,h)):c<0&&(c=i.length)}else{if(q(t,2,D.length,"Base"),t==10&&B)return o=new m(e),F(o,y+o.e+1,N);if(i=String(e),l=typeof e=="number"){if(e*0!=0)return v(o,i,l,t);if(o.s=1/e<0?(i=i.slice(1),-1):1,m.DEBUG&&i.replace(/^0\.0*|\./,"").length>15)throw Error(Ae+e)}else o.s=i.charCodeAt(0)===45?(i=i.slice(1),-1):1;for(n=D.slice(0,t),c=h=0,r=i.length;h<r;h++)if(n.indexOf(f=i.charAt(h))<0){if(f=="."){if(h>c){c=r;continue}}else if(!s&&(i==i.toUpperCase()&&(i=i.toLowerCase())||i==i.toLowerCase()&&(i=i.toUpperCase()))){s=!0,h=-1,c=0;continue}return v(o,String(e),l,t)}l=!1,i=w(i,t,10,o.s),(c=i.indexOf("."))>-1?i=i.replace(".",""):c=i.length}for(h=0;i.charCodeAt(h)===48;h++);for(r=i.length;i.charCodeAt(--r)===48;);if(i=i.slice(h,++r)){if(r-=h,l&&m.DEBUG&&r>15&&(e>ye||e!==Z(e)))throw Error(Ae+o.s*e);if((c=c-h-1)>I)o.c=o.e=null;else if(c<M)o.c=[o.e=0];else{if(o.e=c,o.c=[],h=(c+1)%A,c<0&&(h+=A),h<r){for(h&&o.c.push(+i.slice(0,h)),r-=A;h<r;)o.c.push(+i.slice(h,h+=A));h=A-(i=i.slice(h)).length}else h-=r;for(;h--;i+="0");o.c.push(+i)}}else o.c=[o.e=0]}m.clone=Ce,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var t,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(n=e[t],q(n,0,G,t),y=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(n=e[t],q(n,0,8,t),N=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(n=e[t],n&&n.pop?(q(n[0],-G,0,t),q(n[1],0,G,t),$=n[0],S=n[1]):(q(n,-G,G,t),$=-(S=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if(n=e[t],n&&n.pop)q(n[0],-G,-1,t),q(n[1],1,G,t),M=n[0],I=n[1];else if(q(n,-G,G,t),n)M=-(I=n<0?-n:n);else throw Error(X+t+" cannot be zero: "+n);if(e.hasOwnProperty(t="CRYPTO"))if(n=e[t],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))_=n;else throw _=!n,Error(X+"crypto unavailable");else _=n;else throw Error(X+t+" not true or false: "+n);if(e.hasOwnProperty(t="MODULO_MODE")&&(n=e[t],q(n,0,9,t),T=n),e.hasOwnProperty(t="POW_PRECISION")&&(n=e[t],q(n,0,G,t),j=n),e.hasOwnProperty(t="FORMAT"))if(n=e[t],typeof n=="object")z=n;else throw Error(X+t+" not an object: "+n);if(e.hasOwnProperty(t="ALPHABET"))if(n=e[t],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))B=n.slice(0,10)=="0123456789",D=n;else throw Error(X+t+" invalid: "+n)}else throw Error(X+"Object expected: "+e);return{DECIMAL_PLACES:y,ROUNDING_MODE:N,EXPONENTIAL_AT:[$,S],RANGE:[M,I],CRYPTO:_,MODULO_MODE:T,POW_PRECISION:j,FORMAT:z,ALPHABET:D}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var t,n,f=e.c,s=e.e,c=e.s;e:if({}.toString.call(f)=="[object Array]"){if((c===1||c===-1)&&s>=-G&&s<=G&&s===Z(s)){if(f[0]===0){if(s===0&&f.length===1)return!0;break e}if(t=(s+1)%A,t<1&&(t+=A),String(f[0]).length==t){for(t=0;t<f.length;t++)if(n=f[t],n<0||n>=te||n!==Z(n))break e;if(n!==0)return!0}}}else if(f===null&&s===null&&(c===null||c===1||c===-1))return!0;throw Error(X+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return Y(arguments,-1)},m.minimum=m.min=function(){return Y(arguments,1)},m.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return Z(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var f,s,c,h,l,r=0,i=[],o=new m(x);if(n==null?n=y:q(n,0,G),h=ve(n/A),_)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(h*=2));r<h;)l=f[r]*131072+(f[r+1]>>>11),l>=9e15?(s=crypto.getRandomValues(new Uint32Array(2)),f[r]=s[0],f[r+1]=s[1]):(i.push(l%1e14),r+=2);r=h/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(h*=7);r<h;)l=(f[r]&31)*281474976710656+f[r+1]*1099511627776+f[r+2]*4294967296+f[r+3]*16777216+(f[r+4]<<16)+(f[r+5]<<8)+f[r+6],l>=9e15?crypto.randomBytes(7).copy(f,r):(i.push(l%1e14),r+=7);r=h/7}else throw _=!1,Error(X+"crypto unavailable");if(!_)for(;r<h;)l=t(),l<9e15&&(i[r++]=l%1e14);for(h=i[--r],n%=A,h&&n&&(l=be[A-n],i[r]=Z(h/l)*l);i[r]===0;i.pop(),r--);if(r<0)i=[c=0];else{for(c=-1;i[0]===0;i.splice(0,1),c-=A);for(r=1,l=i[0];l>=10;l/=10,r++);r<A&&(c-=A-r)}return o.e=c,o.c=i,o}}(),m.sum=function(){for(var e=1,t=arguments,n=new m(t[0]);e<t.length;)n=n.plus(t[e++]);return n},w=function(){var e="0123456789";function t(n,f,s,c){for(var h,l=[0],r,i=0,o=n.length;i<o;){for(r=l.length;r--;l[r]*=f);for(l[0]+=c.indexOf(n.charAt(i++)),h=0;h<l.length;h++)l[h]>s-1&&(l[h+1]==null&&(l[h+1]=0),l[h+1]+=l[h]/s|0,l[h]%=s)}return l.reverse()}return function(n,f,s,c,h){var l,r,i,o,u,p,E,k,P=n.indexOf("."),O=y,b=N;for(P>=0&&(o=j,j=0,n=n.replace(".",""),k=new m(f),p=k.pow(n.length-P),j=o,k.c=t(ie(J(p.c),p.e,"0"),10,s,e),k.e=k.c.length),E=t(n,f,s,h?(l=D,e):(l=e,D)),i=o=E.length;E[--o]==0;E.pop());if(!E[0])return l.charAt(0);if(P<0?--i:(p.c=E,p.e=i,p.s=c,p=g(p,k,O,b,s),E=p.c,u=p.r,i=p.e),r=i+O+1,P=E[r],o=s/2,u=u||r<0||E[r+1]!=null,u=b<4?(P!=null||u)&&(b==0||b==(p.s<0?3:2)):P>o||P==o&&(b==4||u||b==6&&E[r-1]&1||b==(p.s<0?8:7)),r<1||!E[0])n=u?ie(l.charAt(1),-O,l.charAt(0)):l.charAt(0);else{if(E.length=r,u)for(--s;++E[--r]>s;)E[r]=0,r||(++i,E=[1].concat(E));for(o=E.length;!E[--o];);for(P=0,n="";P<=o;n+=l.charAt(E[P++]));n=ie(n,i,l.charAt(0))}return n}}(),g=function(){function e(f,s,c){var h,l,r,i,o=0,u=f.length,p=s%oe,E=s/oe|0;for(f=f.slice();u--;)r=f[u]%oe,i=f[u]/oe|0,h=E*r+i*p,l=p*r+h%oe*oe+o,o=(l/c|0)+(h/oe|0)+E*i,f[u]=l%c;return o&&(f=[o].concat(f)),f}function t(f,s,c,h){var l,r;if(c!=h)r=c>h?1:-1;else for(l=r=0;l<c;l++)if(f[l]!=s[l]){r=f[l]>s[l]?1:-1;break}return r}function n(f,s,c,h){for(var l=0;c--;)f[c]-=l,l=f[c]<s[c]?1:0,f[c]=l*h+f[c]-s[c];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,s,c,h,l){var r,i,o,u,p,E,k,P,O,b,C,L,H,re,ae,ne,ce,Q=f.s==s.s?1:-1,V=f.c,U=s.c;if(!V||!V[0]||!U||!U[0])return new m(!f.s||!s.s||(V?U&&V[0]==U[0]:!U)?NaN:V&&V[0]==0||!U?Q*0:Q/0);for(P=new m(Q),O=P.c=[],i=f.e-s.e,Q=c+i+1,l||(l=te,i=ee(f.e/A)-ee(s.e/A),Q=Q/A|0),o=0;U[o]==(V[o]||0);o++);if(U[o]>(V[o]||0)&&i--,Q<0)O.push(1),u=!0;else{for(re=V.length,ne=U.length,o=0,Q+=2,p=Z(l/(U[0]+1)),p>1&&(U=e(U,p,l),V=e(V,p,l),ne=U.length,re=V.length),H=ne,b=V.slice(0,ne),C=b.length;C<ne;b[C++]=0);ce=U.slice(),ce=[0].concat(ce),ae=U[0],U[1]>=l/2&&ae++;do{if(p=0,r=t(U,b,ne,C),r<0){if(L=b[0],ne!=C&&(L=L*l+(b[1]||0)),p=Z(L/ae),p>1)for(p>=l&&(p=l-1),E=e(U,p,l),k=E.length,C=b.length;t(E,b,k,C)==1;)p--,n(E,ne<k?ce:U,k,l),k=E.length,r=1;else p==0&&(r=p=1),E=U.slice(),k=E.length;if(k<C&&(E=[0].concat(E)),n(b,E,C,l),C=b.length,r==-1)for(;t(U,b,ne,C)<1;)p++,n(b,ne<C?ce:U,C,l),C=b.length}else r===0&&(p++,b=[0]);O[o++]=p,b[0]?b[C++]=V[H]||0:(b=[V[H]],C=1)}while((H++<re||b[0]!=null)&&Q--);u=b[0]!=null,O[0]||O.splice(0,1)}if(l==te){for(o=1,Q=O[0];Q>=10;Q/=10,o++);F(P,c+(P.e=o+i*A-1)+1,h,u)}else P.e=i,P.r=+u;return P}}();function R(e,t,n,f){var s,c,h,l,r;if(n==null?n=N:q(n,0,8),!e.c)return e.toString();if(s=e.c[0],h=e.e,t==null)r=J(e.c),r=f==1||f==2&&(h<=$||h>=S)?he(r,h):ie(r,h,"0");else if(e=F(new m(e),t,n),c=e.e,r=J(e.c),l=r.length,f==1||f==2&&(t<=c||c<=$)){for(;l<t;r+="0",l++);r=he(r,c)}else if(t-=h,r=ie(r,c,"0"),c+1>l){if(--t>0)for(r+=".";t--;r+="0");}else if(t+=c-l,t>0)for(c+1==l&&(r+=".");t--;r+="0");return e.s<0&&s?"-"+r:r}function Y(e,t){for(var n,f,s=1,c=new m(e[0]);s<e.length;s++)f=new m(e[s]),(!f.s||(n=le(c,f))===t||n===0&&c.s===t)&&(c=f);return c}function K(e,t,n){for(var f=1,s=t.length;!t[--s];t.pop());for(s=t[0];s>=10;s/=10,f++);return(n=f+n*A-1)>I?e.c=e.e=null:n<M?e.c=[e.e=0]:(e.e=n,e.c=t),e}v=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,n=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,s=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(c,h,l,r){var i,o=l?h:h.replace(s,"");if(f.test(o))c.s=isNaN(o)?null:o<0?-1:1;else{if(!l&&(o=o.replace(e,function(u,p,E){return i=(E=E.toLowerCase())=="x"?16:E=="b"?2:8,!r||r==i?p:u}),r&&(i=r,o=o.replace(t,"$1").replace(n,"0.$1")),h!=o))return new m(o,i);if(m.DEBUG)throw Error(X+"Not a"+(r?" base "+r:"")+" number: "+h);c.s=null}c.c=c.e=null}}();function F(e,t,n,f){var s,c,h,l,r,i,o,u=e.c,p=be;if(u){e:{for(s=1,l=u[0];l>=10;l/=10,s++);if(c=t-s,c<0)c+=A,h=t,r=u[i=0],o=Z(r/p[s-h-1]%10);else if(i=ve((c+1)/A),i>=u.length)if(f){for(;u.length<=i;u.push(0));r=o=0,s=1,c%=A,h=c-A+1}else break e;else{for(r=l=u[i],s=1;l>=10;l/=10,s++);c%=A,h=c-A+s,o=h<0?0:Z(r/p[s-h-1]%10)}if(f=f||t<0||u[i+1]!=null||(h<0?r:r%p[s-h-1]),f=n<4?(o||f)&&(n==0||n==(e.s<0?3:2)):o>5||o==5&&(n==4||f||n==6&&(c>0?h>0?r/p[s-h]:0:u[i-1])%10&1||n==(e.s<0?8:7)),t<1||!u[0])return u.length=0,f?(t-=e.e+1,u[0]=p[(A-t%A)%A],e.e=-t||0):u[0]=e.e=0,e;if(c==0?(u.length=i,l=1,i--):(u.length=i+1,l=p[A-c],u[i]=h>0?Z(r/p[s-h]%p[h])*l:0),f)for(;;)if(i==0){for(c=1,h=u[0];h>=10;h/=10,c++);for(h=u[0]+=l,l=1;h>=10;h/=10,l++);c!=l&&(e.e++,u[0]==te&&(u[0]=1));break}else{if(u[i]+=l,u[i]!=te)break;u[i--]=0,l=1}for(c=u.length;u[--c]===0;u.pop());}e.e>I?e.c=e.e=null:e.e<M&&(e.c=[e.e=0])}return e}function W(e){var t,n=e.e;return n===null?e.toString():(t=J(e.c),t=n<=$||n>=S?he(t,n):ie(t,n,"0"),e.s<0?"-"+t:t)}return d.absoluteValue=d.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,t){return le(this,new m(e,t))},d.decimalPlaces=d.dp=function(e,t){var n,f,s,c=this;if(e!=null)return q(e,0,G),t==null?t=N:q(t,0,8),F(new m(c),e+c.e+1,t);if(!(n=c.c))return null;if(f=((s=n.length-1)-ee(this.e/A))*A,s=n[s])for(;s%10==0;s/=10,f--);return f<0&&(f=0),f},d.dividedBy=d.div=function(e,t){return g(this,new m(e,t),y,N)},d.dividedToIntegerBy=d.idiv=function(e,t){return g(this,new m(e,t),0,1)},d.exponentiatedBy=d.pow=function(e,t){var n,f,s,c,h,l,r,i,o,u=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(X+"Exponent not an integer: "+W(e));if(t!=null&&(t=new m(t)),l=e.e>14,!u.c||!u.c[0]||u.c[0]==1&&!u.e&&u.c.length==1||!e.c||!e.c[0])return o=new m(Math.pow(+W(u),l?e.s*(2-de(e)):+W(e))),t?o.mod(t):o;if(r=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new m(NaN);f=!r&&u.isInteger()&&t.isInteger(),f&&(u=u.mod(t))}else{if(e.e>9&&(u.e>0||u.e<-1||(u.e==0?u.c[0]>1||l&&u.c[1]>=24e7:u.c[0]<8e13||l&&u.c[0]<=9999975e7)))return c=u.s<0&&de(e)?-0:0,u.e>-1&&(c=1/c),new m(r?1/c:c);j&&(c=ve(j/A+2))}for(l?(n=new m(.5),r&&(e.s=1),i=de(e)):(s=Math.abs(+W(e)),i=s%2),o=new m(x);;){if(i){if(o=o.times(u),!o.c)break;c?o.c.length>c&&(o.c.length=c):f&&(o=o.mod(t))}if(s){if(s=Z(s/2),s===0)break;i=s%2}else if(e=e.times(n),F(e,e.e+1,1),e.e>14)i=de(e);else{if(s=+W(e),s===0)break;i=s%2}u=u.times(u),c?u.c&&u.c.length>c&&(u.c.length=c):f&&(u=u.mod(t))}return f?o:(r&&(o=x.div(o)),t?o.mod(t):c?F(o,j,N,h):o)},d.integerValue=function(e){var t=new m(this);return e==null?e=N:q(e,0,8),F(t,t.e+1,e)},d.isEqualTo=d.eq=function(e,t){return le(this,new m(e,t))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,t){return le(this,new m(e,t))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,t){return(t=le(this,new m(e,t)))===1||t===0},d.isInteger=function(){return!!this.c&&ee(this.e/A)>this.c.length-2},d.isLessThan=d.lt=function(e,t){return le(this,new m(e,t))<0},d.isLessThanOrEqualTo=d.lte=function(e,t){return(t=le(this,new m(e,t)))===-1||t===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,t){var n,f,s,c,h=this,l=h.s;if(e=new m(e,t),t=e.s,!l||!t)return new m(NaN);if(l!=t)return e.s=-t,h.plus(e);var r=h.e/A,i=e.e/A,o=h.c,u=e.c;if(!r||!i){if(!o||!u)return o?(e.s=-t,e):new m(u?h:NaN);if(!o[0]||!u[0])return u[0]?(e.s=-t,e):new m(o[0]?h:N==3?-0:0)}if(r=ee(r),i=ee(i),o=o.slice(),l=r-i){for((c=l<0)?(l=-l,s=o):(i=r,s=u),s.reverse(),t=l;t--;s.push(0));s.reverse()}else for(f=(c=(l=o.length)<(t=u.length))?l:t,l=t=0;t<f;t++)if(o[t]!=u[t]){c=o[t]<u[t];break}if(c&&(s=o,o=u,u=s,e.s=-e.s),t=(f=u.length)-(n=o.length),t>0)for(;t--;o[n++]=0);for(t=te-1;f>l;){if(o[--f]<u[f]){for(n=f;n&&!o[--n];o[n]=t);--o[n],o[f]+=te}o[f]-=u[f]}for(;o[0]==0;o.splice(0,1),--i);return o[0]?K(e,o,i):(e.s=N==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,t){var n,f,s=this;return e=new m(e,t),!s.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||s.c&&!s.c[0]?new m(s):(T==9?(f=e.s,e.s=1,n=g(s,e,0,3),e.s=f,n.s*=f):n=g(s,e,0,T),e=s.minus(n.times(e)),!e.c[0]&&T==1&&(e.s=s.s),e)},d.multipliedBy=d.times=function(e,t){var n,f,s,c,h,l,r,i,o,u,p,E,k,P,O,b=this,C=b.c,L=(e=new m(e,t)).c;if(!C||!L||!C[0]||!L[0])return!b.s||!e.s||C&&!C[0]&&!L||L&&!L[0]&&!C?e.c=e.e=e.s=null:(e.s*=b.s,!C||!L?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=ee(b.e/A)+ee(e.e/A),e.s*=b.s,r=C.length,u=L.length,r<u&&(k=C,C=L,L=k,s=r,r=u,u=s),s=r+u,k=[];s--;k.push(0));for(P=te,O=oe,s=u;--s>=0;){for(n=0,p=L[s]%O,E=L[s]/O|0,h=r,c=s+h;c>s;)i=C[--h]%O,o=C[h]/O|0,l=E*i+o*p,i=p*i+l%O*O+k[c]+n,n=(i/P|0)+(l/O|0)+E*o,k[c--]=i%P;k[c]=n}return n?++f:k.splice(0,1),K(e,k,f)},d.negated=function(){var e=new m(this);return e.s=-e.s||null,e},d.plus=function(e,t){var n,f=this,s=f.s;if(e=new m(e,t),t=e.s,!s||!t)return new m(NaN);if(s!=t)return e.s=-t,f.minus(e);var c=f.e/A,h=e.e/A,l=f.c,r=e.c;if(!c||!h){if(!l||!r)return new m(s/0);if(!l[0]||!r[0])return r[0]?e:new m(l[0]?f:s*0)}if(c=ee(c),h=ee(h),l=l.slice(),s=c-h){for(s>0?(h=c,n=r):(s=-s,n=l),n.reverse();s--;n.push(0));n.reverse()}for(s=l.length,t=r.length,s-t<0&&(n=r,r=l,l=n,t=s),s=0;t;)s=(l[--t]=l[t]+r[t]+s)/te|0,l[t]=te===l[t]?0:l[t]%te;return s&&(l=[s].concat(l),++h),K(e,l,h)},d.precision=d.sd=function(e,t){var n,f,s,c=this;if(e!=null&&e!==!!e)return q(e,1,G),t==null?t=N:q(t,0,8),F(new m(c),e,t);if(!(n=c.c))return null;if(s=n.length-1,f=s*A+1,s=n[s]){for(;s%10==0;s/=10,f--);for(s=n[0];s>=10;s/=10,f++);}return e&&c.e+1>f&&(f=c.e+1),f},d.shiftedBy=function(e){return q(e,-ye,ye),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,t,n,f,s,c=this,h=c.c,l=c.s,r=c.e,i=y+4,o=new m("0.5");if(l!==1||!h||!h[0])return new m(!l||l<0&&(!h||h[0])?NaN:h?c:1/0);if(l=Math.sqrt(+W(c)),l==0||l==1/0?(t=J(h),(t.length+r)%2==0&&(t+="0"),l=Math.sqrt(+t),r=ee((r+1)/2)-(r<0||r%2),l==1/0?t="5e"+r:(t=l.toExponential(),t=t.slice(0,t.indexOf("e")+1)+r),n=new m(t)):n=new m(l+""),n.c[0]){for(r=n.e,l=r+i,l<3&&(l=0);;)if(s=n,n=o.times(s.plus(g(c,s,i,1))),J(s.c).slice(0,l)===(t=J(n.c)).slice(0,l))if(n.e<r&&--l,t=t.slice(l-3,l+1),t=="9999"||!f&&t=="4999"){if(!f&&(F(s,s.e+y+2,0),s.times(s).eq(c))){n=s;break}i+=4,l+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(F(n,n.e+y+2,1),e=!n.times(n).eq(c));break}}return F(n,n.e+y+1,N,e)},d.toExponential=function(e,t){return e!=null&&(q(e,0,G),e++),R(this,e,t,1)},d.toFixed=function(e,t){return e!=null&&(q(e,0,G),e=e+this.e+1),R(this,e,t)},d.toFormat=function(e,t,n){var f,s=this;if(n==null)e!=null&&t&&typeof t=="object"?(n=t,t=null):e&&typeof e=="object"?(n=e,e=t=null):n=z;else if(typeof n!="object")throw Error(X+"Argument not an object: "+n);if(f=s.toFixed(e,t),s.c){var c,h=f.split("."),l=+n.groupSize,r=+n.secondaryGroupSize,i=n.groupSeparator||"",o=h[0],u=h[1],p=s.s<0,E=p?o.slice(1):o,k=E.length;if(r&&(c=l,l=r,r=c,k-=c),l>0&&k>0){for(c=k%l||l,o=E.substr(0,c);c<k;c+=l)o+=i+E.substr(c,l);r>0&&(o+=i+E.slice(c)),p&&(o="-"+o)}f=u?o+(n.decimalSeparator||"")+((r=+n.fractionGroupSize)?u.replace(new RegExp("\\d{"+r+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):u):o}return(n.prefix||"")+f+(n.suffix||"")},d.toFraction=function(e){var t,n,f,s,c,h,l,r,i,o,u,p,E=this,k=E.c;if(e!=null&&(l=new m(e),!l.isInteger()&&(l.c||l.s!==1)||l.lt(x)))throw Error(X+"Argument "+(l.isInteger()?"out of range: ":"not an integer: ")+W(l));if(!k)return new m(E);for(t=new m(x),i=n=new m(x),f=r=new m(x),p=J(k),c=t.e=p.length-E.e-1,t.c[0]=be[(h=c%A)<0?A+h:h],e=!e||l.comparedTo(t)>0?c>0?t:i:l,h=I,I=1/0,l=new m(p),r.c[0]=0;o=g(l,t,0,1),s=n.plus(o.times(f)),s.comparedTo(e)!=1;)n=f,f=s,i=r.plus(o.times(s=i)),r=s,t=l.minus(o.times(s=t)),l=s;return s=g(e.minus(n),f,0,1),r=r.plus(s.times(i)),n=n.plus(s.times(f)),r.s=i.s=E.s,c=c*2,u=g(i,f,c,N).minus(E).abs().comparedTo(g(r,n,c,N).minus(E).abs())<1?[i,f]:[r,n],I=h,u},d.toNumber=function(){return+W(this)},d.toPrecision=function(e,t){return e!=null&&q(e,1,G),R(this,e,t,2)},d.toString=function(e){var t,n=this,f=n.s,s=n.e;return s===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=s<=$||s>=S?he(J(n.c),s):ie(J(n.c),s,"0"):e===10&&B?(n=F(new m(n),y+s+1,N),t=ie(J(n.c),n.e,"0")):(q(e,2,D.length,"Base"),t=w(ie(J(n.c),s,"0"),10,e,f,!0)),f<0&&n.c[0]&&(t="-"+t)),t},d.valueOf=d.toJSON=function(){return W(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,a!=null&&m.set(a),m}function ee(a){var g=a|0;return a>0||a===g?g:g-1}function J(a){for(var g,w,v=1,d=a.length,x=a[0]+"";v<d;){for(g=a[v++]+"",w=A-g.length;w--;g="0"+g);x+=g}for(d=x.length;x.charCodeAt(--d)===48;);return x.slice(0,d+1||1)}function le(a,g){var w,v,d=a.c,x=g.c,y=a.s,N=g.s,$=a.e,S=g.e;if(!y||!N)return null;if(w=d&&!d[0],v=x&&!x[0],w||v)return w?v?0:-N:y;if(y!=N)return y;if(w=y<0,v=$==S,!d||!x)return v?0:!d^w?1:-1;if(!v)return $>S^w?1:-1;for(N=($=d.length)<(S=x.length)?$:S,y=0;y<N;y++)if(d[y]!=x[y])return d[y]>x[y]^w?1:-1;return $==S?0:$>S^w?1:-1}function q(a,g,w,v){if(a<g||a>w||a!==Z(a))throw Error(X+(v||"Argument")+(typeof a=="number"?a<g||a>w?" out of range: ":" not an integer: ":" not a primitive number: ")+String(a))}function de(a){var g=a.c.length-1;return ee(a.e/A)==g&&a.c[g]%2!=0}function he(a,g){return(a.length>1?a.charAt(0)+"."+a.slice(1):a)+(g<0?"e":"e+")+g}function ie(a,g,w){var v,d;if(g<0){for(d=w+".";++g;d+=w);a=d+a}else if(v=a.length,++g>v){for(d=w,g-=v;--g;d+=w);a+=d}else g<v&&(a=a.slice(0,g)+"."+a.slice(g));return a}var st=Ce();const at="en-US",ct="USD",pe=a=>new Intl.NumberFormat(at,{style:"currency",currency:ct}).format(a);function ft(a,{cartState:g}){const{bau:w,css:v}=a,{div:d,dialog:x,ul:y,li:N,span:$,button:S,img:M,header:I,footer:_,h1:T,form:j}=w.tags,z=w.derive(()=>g.val.length==0),D=R=>()=>{const Y=g.val.findIndex(({name:K})=>K==R.name);Y>=0&&g.val.splice(Y,1)},B=v`
    margin: auto;
    z-index: 10;
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
  `,m=()=>{document.getElementById("dialog-cart").close()};return()=>x({id:"dialog-cart",class:B,onclick:({target:R,currentTarget:Y})=>{R==Y&&R.close()}},j(I(T("Cart")),()=>z.val&&"No items in the cart",w.loop(g,y(),R=>N(M({src:R.thumbnail,width:48,height:48,alt:""}),d(d({class:"name"},R.name),d($({class:"quantity"},R.quantity,"x"),$({class:"price"},pe(R.price)),$({class:"price-total"},"  =",pe(st(R.price).times(R.quantity).toNumber())))),S({role:"delete",onclick:D(R)},M({src:"./assets/images/icon-delete.svg",alt:""})))),_(S({class:["primary","solid"],type:"submit",onclick:m},"Confirm Order"))))}const ut=(a,{cartState:g})=>{const{bau:w,css:v}=a,{div:d}=w.tags,x=ot(a,{cartState:g}),y=ft(a,{cartState:g});return function({componentState:$}){return d({class:v`
          display: grid;
          margin: auto;
          max-width: 1000px;
          min-height: 100vh;
        `},x(),y(),d({style:"flex-grow: 1"},()=>$.val))}};function dt(a,{}){const{bau:g,css:w}=a,{svg:v,use:d}=g.tagsNS("http://www.w3.org/2000/svg"),{section:x,img:y,ul:N,li:$,button:S,div:M,dialog:I,header:_}=g.tags,T=g.state(0),j=w`
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
  `;return({images:z=[]})=>{const D=()=>{T.val<=0?T.val=z.length-1:T.val--},B=()=>{T.val>=z.length-1?T.val=0:T.val++},m=F=>()=>{T.val=F},R=()=>{document.getElementById("dialog-carousel").showModal()},Y=()=>{document.getElementById("dialog-carousel").close()},K=({images:F,fullscreen:W=!1})=>x({class:["carousel",j,W&&"fullscreen"]},M({class:"track"},M({class:["control","control-previous"],onclick:D},S({role:"previous"},v({width:12,height:18,viewBox:"0 0 12 18"},d({href:"./assets/images/icon-previous.svg#previous"})))),M({class:["control","control-next"],onclick:B},S({role:"next"},v({width:13,height:18,viewBox:"0 0 13 18"},d({href:"./assets/images/icon-next.svg#next"})))),M({class:"track-inner"},N({style:()=>`transform: translateX(${-100*T.val}%);`,onclick:R},F.map(({desktop:e,alt:t})=>$(y({src:e,alt:t})))))),N({class:"thumbnail"},F.map(({thumbnail:e,alt:t},n)=>$({class:()=>n==T.val&&"active"},S({onclick:m(n)},y({src:e,alt:t,width:91,height:91}))))));return[K({images:z}),I({id:"dialog-carousel",class:w`
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
          `},_(S({role:"close",onclick:Y},"❌")),K({images:z,fullscreen:!0}))]}}function ht(a,{cartState:g}){const{bau:w,css:v}=a,{h1:d,h2:x,p:y,div:N,button:$,span:S,section:M,img:I}=w.tags,_=w.state(1),T=B=>()=>{const m=g.val.find(({name:R})=>R==B.name);m?m.quantity+=_.val:g.val.push({name:B.name,price:B.price,quantity:_.val,thumbnail:B.imageInfo[0].thumbnail}),_.val=0},j=()=>{_.val+=1},z=()=>{_.val<=0||(_.val-=1)},D=v`
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
  `;return B=>{const{brand:m,name:R,description:Y,price:K,discount:F,priceOld:W}=B;return M({class:D},d(m),x(R),y(Y),N({class:"price-container"},y({class:"price-current"},S({class:"price"},pe(K)),S({class:"discount"},`${F}%`)),y({class:"price-old"},pe(W))),y({class:"cart-action"},N({class:"quantity-selector"},$({onclick:z,"aria-label":"decrement quantity"},I({src:"./assets/images/icon-minus.svg",alt:"remove-from-cart"})),N({class:"quantity"},_),$({onclick:j,"aria-label":"increment quantity"},I({src:"./assets/images/icon-plus.svg",alt:"add-cart"}))),$({class:"add-to-cart",onclick:T(B)},"Add to cart")))}}const Pe=new Array(4).fill("").map((a,g)=>({thumbnail:`./assets/images/image-product-${g+1}-thumbnail.jpg`,desktop:`./assets/images/image-product-${g+1}.jpg`,alt:`images-${g}`})),gt={brand:"Sneaker Company",name:"Fall Limited Edition Sneakers",description:"These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",imageInfo:Pe,price:125,priceOld:250,discount:50};function pt(a,{cartState:g}){const{bau:w,css:v}=a,{article:d}=w.tags,x=dt(a,{}),y=ht(a,{cartState:g}),N=v`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;return()=>d({class:N},x({images:Pe}),y(gt))}const mt=(a,{cartState:g})=>{const w=pt(a,{cartState:g});return[{path:"",action:v=>({routerContext:v,title:"Product",component:()=>w()})}]},wt=a=>({title:"Page Not Found",component:()=>"Not Found"}),Ie={base:"/bau/frontendmentor/e-commerce-product-page"},ge=Ke({config:Ie}),$e=ge.bau.state([]);et({routes:mt(ge,{cartState:$e}),onLocationChange:tt({context:ge,config:Ie,LayoutDefault:ut(ge,{cartState:$e})}),notFoundRoute:wt()});
