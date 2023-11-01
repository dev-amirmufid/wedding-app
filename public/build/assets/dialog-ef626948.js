import{R as e,r as t,E as n,G as r}from"./app-55aa7177.js";import{l as o,s as l,a as u,u as i,b as a,D as s,X as c,o as d,t as f,y as p,p as m,f as v,T as g,c as E,S as h,C as w,d as b}from"./transition-1b81608f.js";var y;let T=null!=(y=e.useId)?y:function(){let t=o(),[n,r]=e.useState(t?()=>l.nextId():null);return u((()=>{null===n&&r(l.nextId())}),[n]),null!=n?""+n:void 0};function L(e){return l.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let S=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map((e=>`${e}:not([tabindex='-1'])`)).join(",");var P,D,F,M=((F=M||{})[F.First=1]="First",F[F.Previous=2]="Previous",F[F.Next=4]="Next",F[F.Last=8]="Last",F[F.WrapAround=16]="WrapAround",F[F.NoScroll=32]="NoScroll",F),C=((D=C||{})[D.Error=0]="Error",D[D.Overflow=1]="Overflow",D[D.Success=2]="Success",D[D.Underflow=3]="Underflow",D),A=((P=A||{})[P.Previous=-1]="Previous",P[P.Next=1]="Next",P);var R=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(R||{});var x=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(x||{});function O(e){null==e||e.focus({preventScroll:!0})}"undefined"!=typeof window&&"undefined"!=typeof document&&(document.addEventListener("keydown",(e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")}),!0),document.addEventListener("click",(e=>{1===e.detail?delete document.documentElement.dataset.headlessuiFocusVisible:0===e.detail&&(document.documentElement.dataset.headlessuiFocusVisible="")}),!0));let k=["textarea","input"].join(",");function N(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:o=[]}={}){let l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,u=Array.isArray(e)?n?function(e,t=(e=>e)){return e.slice().sort(((e,n)=>{let r=t(e),o=t(n);if(null===r||null===o)return 0;let l=r.compareDocumentPosition(o);return l&Node.DOCUMENT_POSITION_FOLLOWING?-1:l&Node.DOCUMENT_POSITION_PRECEDING?1:0}))}(e):e:function(e=document.body){return null==e?[]:Array.from(e.querySelectorAll(S)).sort(((e,t)=>Math.sign((e.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER))))}(e);o.length>0&&u.length>1&&(u=u.filter((e=>!o.includes(e)))),r=null!=r?r:l.activeElement;let i,a=(()=>{if(5&t)return 1;if(10&t)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=(()=>{if(1&t)return 0;if(2&t)return Math.max(0,u.indexOf(r))-1;if(4&t)return Math.max(0,u.indexOf(r))+1;if(8&t)return u.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=32&t?{preventScroll:!0}:{},d=0,f=u.length;do{if(d>=f||d+f<=0)return 0;let e=s+d;if(16&t)e=(e+f)%f;else{if(e<0)return 3;if(e>=f)return 1}i=u[e],null==i||i.focus(c),d+=a}while(i!==l.activeElement);return 6&t&&function(e){var t,n;return null!=(n=null==(t=null==e?void 0:e.matches)?void 0:t.call(e,k))&&n}(i)&&i.select(),2}function I(e,n,r){let o=a(n);t.useEffect((()=>{function t(e){o.current(e)}return document.addEventListener(e,t,r),()=>document.removeEventListener(e,t,r)}),[e,r])}function H(e,n,r){let o=a(n);t.useEffect((()=>{function t(e){o.current(e)}return window.addEventListener(e,t,r),()=>window.removeEventListener(e,t,r)}),[e,r])}function B(e,n,r=!0){let o=t.useRef(!1);function l(t,r){if(!o.current||t.defaultPrevented)return;let l=r(t);if(null===l||!l.getRootNode().contains(l))return;let u=function e(t){return"function"==typeof t?e(t()):Array.isArray(t)||t instanceof Set?t:[t]}(e);for(let e of u){if(null===e)continue;let n=e instanceof HTMLElement?e:e.current;if(null!=n&&n.contains(l)||t.composed&&t.composedPath().includes(n))return}return!function(e,t=0){var n;return e!==(null==(n=L(e))?void 0:n.body)&&i(t,{0:()=>e.matches(S),1(){let t=e;for(;null!==t;){if(t.matches(S))return!0;t=t.parentElement}return!1}})}(l,R.Loose)&&-1!==l.tabIndex&&t.preventDefault(),n(t,l)}t.useEffect((()=>{requestAnimationFrame((()=>{o.current=r}))}),[r]);let u=t.useRef(null);I("mousedown",(e=>{var t,n;o.current&&(u.current=(null==(n=null==(t=e.composedPath)?void 0:t.call(e))?void 0:n[0])||e.target)}),!0),I("click",(e=>{u.current&&(l(e,(()=>u.current)),u.current=null)}),!0),H("blur",(e=>l(e,(()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null))),!0)}function _(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=""===(null==t?void 0:t.getAttribute("disabled"));return(!r||!function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}var U,W=((U=W||{})[U.None=1]="None",U[U.Focusable=2]="Focusable",U[U.Hidden=4]="Hidden",U);let j=s((function(e,t){let{features:n=1,...r}=e,o={ref:t,"aria-hidden":2==(2&n)||void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...4==(4&n)&&2!=(2&n)&&{display:"none"}}};return c({ourProps:o,theirProps:r,slot:{},defaultTag:"div",name:"Hidden"})}));var $,V=(($=V||{}).Space=" ",$.Enter="Enter",$.Escape="Escape",$.Backspace="Backspace",$.Delete="Delete",$.ArrowLeft="ArrowLeft",$.ArrowUp="ArrowUp",$.ArrowRight="ArrowRight",$.ArrowDown="ArrowDown",$.Home="Home",$.End="End",$.PageUp="PageUp",$.PageDown="PageDown",$.Tab="Tab",$);function G(e,n){let r=t.useRef([]),o=d(e);t.useEffect((()=>{let e=[...r.current];for(let[t,l]of n.entries())if(r.current[t]!==l){let t=o(n,e);return r.current=n,t}}),[o,...n])}var Y=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(Y||{});function q(...e){return t.useMemo((()=>L(...e)),[...e])}function K(e,n,r,o){let l=a(r);t.useEffect((()=>{function t(e){l.current(e)}return(e=null!=e?e:window).addEventListener(n,t,o),()=>e.removeEventListener(n,t,o)}),[e,n,o])}function X(e){let n=d(e),r=t.useRef(!1);t.useEffect((()=>(r.current=!1,()=>{r.current=!0,f((()=>{r.current&&n()}))})),[n])}function z(e){if(!e)return new Set;if("function"==typeof e)return new Set(e());let t=new Set;for(let n of e.current)n.current instanceof HTMLElement&&t.add(n.current);return t}var J=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(J||{});let Q=s((function(n,r){let l=t.useRef(null),u=p(l,r),{initialFocus:a,containers:s,features:g=30,...E}=n;o()||(g=1);let h=q(l);!function({ownerDocument:e},n){let r=function(e=!0){let n=t.useRef(ee.slice());return G((([e],[t])=>{!0===t&&!1===e&&f((()=>{n.current.splice(0)})),!1===t&&!0===e&&(n.current=ee.slice())}),[e,ee,n]),d((()=>{var e;return null!=(e=n.current.find((e=>null!=e&&e.isConnected)))?e:null}))}(n);G((()=>{n||(null==e?void 0:e.activeElement)===(null==e?void 0:e.body)&&O(r())}),[n]),X((()=>{n&&O(r())}))}({ownerDocument:h},Boolean(16&g));let w=function({ownerDocument:e,container:n,initialFocus:r},o){let l=t.useRef(null),u=v();return G((()=>{if(!o)return;let t=n.current;t&&f((()=>{if(!u.current)return;let n=null==e?void 0:e.activeElement;if(null!=r&&r.current){if((null==r?void 0:r.current)===n)return void(l.current=n)}else if(t.contains(n))return void(l.current=n);null!=r&&r.current?O(r.current):N(t,M.First)===C.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),l.current=null==e?void 0:e.activeElement}))}),[o]),l}({ownerDocument:h,container:l,initialFocus:a},Boolean(2&g));!function({ownerDocument:e,container:t,containers:n,previousActiveElement:r},o){let l=v();K(null==e?void 0:e.defaultView,"focus",(e=>{if(!o||!l.current)return;let u=z(n);t.current instanceof HTMLElement&&u.add(t.current);let i=r.current;if(!i)return;let a=e.target;a&&a instanceof HTMLElement?te(u,a)?(r.current=a,O(a)):(e.preventDefault(),e.stopPropagation(),O(i)):O(r.current)}),!0)}({ownerDocument:h,container:l,containers:s,previousActiveElement:w},Boolean(8&g));let b=function(){let e=t.useRef(0);return H("keydown",(t=>{"Tab"===t.key&&(e.current=t.shiftKey?1:0)}),!0),e}(),y=d((e=>{let t=l.current;t&&i(b.current,{[Y.Forwards]:()=>{N(t,M.First,{skipElements:[e.relatedTarget]})},[Y.Backwards]:()=>{N(t,M.Last,{skipElements:[e.relatedTarget]})}})})),T=m(),L=t.useRef(!1),S={ref:u,onKeyDown(e){"Tab"==e.key&&(L.current=!0,T.requestAnimationFrame((()=>{L.current=!1})))},onBlur(e){let t=z(s);l.current instanceof HTMLElement&&t.add(l.current);let n=e.relatedTarget;n instanceof HTMLElement&&"true"!==n.dataset.headlessuiFocusGuard&&(te(t,n)||(L.current?N(l.current,i(b.current,{[Y.Forwards]:()=>M.Next,[Y.Backwards]:()=>M.Previous})|M.WrapAround,{relativeTo:e.target}):e.target instanceof HTMLElement&&O(e.target)))}};return e.createElement(e.Fragment,null,Boolean(4&g)&&e.createElement(j,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:y,features:W.Focusable}),c({ourProps:S,theirProps:E,defaultTag:"div",name:"FocusTrap"}),Boolean(4&g)&&e.createElement(j,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:y,features:W.Focusable}))})),Z=Object.assign(Q,{features:J}),ee=[];function te(e,t){for(let n of e)if(n.contains(t))return!0;return!1}!function(e){function t(){"loading"!==document.readyState&&(e(),document.removeEventListener("DOMContentLoaded",t))}"undefined"!=typeof window&&"undefined"!=typeof document&&(document.addEventListener("DOMContentLoaded",t),t())}((()=>{function e(e){e.target instanceof HTMLElement&&e.target!==document.body&&ee[0]!==e.target&&(ee.unshift(e.target),ee=ee.filter((e=>null!=e&&e.isConnected)),ee.splice(10))}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})}));let ne=t.createContext(!1);function re(t){return e.createElement(ne.Provider,{value:t.force},t.children)}function oe(e){let n=t.useContext(ne),r=t.useContext(ie),o=q(e),[u,i]=t.useState((()=>{if(!n&&null!==r||l.isServer)return null;let e=null==o?void 0:o.getElementById("headlessui-portal-root");if(e)return e;if(null===o)return null;let t=o.createElement("div");return t.setAttribute("id","headlessui-portal-root"),o.body.appendChild(t)}));return t.useEffect((()=>{null!==u&&(null!=o&&o.body.contains(u)||null==o||o.body.appendChild(u))}),[u,o]),t.useEffect((()=>{n||null!==r&&i(r.current)}),[r,i,n]),u}let le=t.Fragment;let ue=t.Fragment,ie=t.createContext(null);let ae=t.createContext(null);let se=s((function(e,r){let i=e,a=t.useRef(null),s=p(g((e=>{a.current=e})),r),d=q(a),f=oe(a),[m]=t.useState((()=>{var e;return l.isServer?null:null!=(e=null==d?void 0:d.createElement("div"))?e:null})),v=t.useContext(ae),E=o();return u((()=>{!f||!m||f.contains(m)||(m.setAttribute("data-headlessui-portal",""),f.appendChild(m))}),[f,m]),u((()=>{if(m&&v)return v.register(m)}),[v,m]),X((()=>{var e;!f||!m||(m instanceof Node&&f.contains(m)&&f.removeChild(m),f.childNodes.length<=0&&(null==(e=f.parentElement)||e.removeChild(f)))})),E&&f&&m?n.createPortal(c({ourProps:{ref:s},theirProps:i,defaultTag:le,name:"Portal"}),m):null})),ce=s((function(t,n){let{target:r,...o}=t,l={ref:p(n)};return e.createElement(ie.Provider,{value:r},c({ourProps:l,theirProps:o,defaultTag:ue,name:"Popover.Group"}))})),de=Object.assign(se,{Group:ce}),fe=t.createContext(null);function pe(){let e=t.useContext(fe);if(null===e){let e=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(e,pe),e}return e}let me=s((function(e,t){let n=T(),{id:r=`headlessui-description-${n}`,...o}=e,l=pe(),i=p(t);u((()=>l.register(r)),[r,l.register]);let a={ref:i,...l.props,id:r};return c({ourProps:a,theirProps:o,slot:l.slot||{},defaultTag:"p",name:l.name||"Description"})})),ve=Object.assign(me,{}),ge=t.createContext((()=>{}));ge.displayName="StackContext";var Ee=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(Ee||{});function he({children:n,onUpdate:r,type:o,element:l,enabled:i}){let a=t.useContext(ge),s=d(((...e)=>{null==r||r(...e),a(...e)}));return u((()=>{let e=void 0===i||!0===i;return e&&s(0,o,l),()=>{e&&s(1,o,l)}}),[s,o,l,i]),e.createElement(ge.Provider,{value:s},n)}const we="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},{useState:be,useEffect:ye,useLayoutEffect:Te,useDebugValue:Le}=r;function Se(e){const t=e.getSnapshot,n=e.value;try{const e=t();return!we(n,e)}catch{return!0}}const Pe=!("undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement)?function(e,t,n){return t()}:function(e,t,n){const r=t(),[{inst:o},l]=be({inst:{value:r,getSnapshot:t}});return Te((()=>{o.value=r,o.getSnapshot=t,Se(o)&&l({inst:o})}),[e,r,t]),ye((()=>(Se(o)&&l({inst:o}),e((()=>{Se(o)&&l({inst:o})})))),[e]),Le(r),r},De="useSyncExternalStore"in r?r.useSyncExternalStore:Pe;function Fe(){let e;return{before({doc:t}){var n;let r=t.documentElement;e=(null!=(n=t.defaultView)?n:window).innerWidth-r.clientWidth},after({doc:t,d:n}){let r=t.documentElement,o=r.clientWidth-r.offsetWidth,l=e-o;n.style(r,"paddingRight",`${l}px`)}}}function Me(){if(!(/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0))return{};let e;return{before(){e=window.pageYOffset},after({doc:t,d:n,meta:r}){function o(e){return r.containers.flatMap((e=>e())).some((t=>t.contains(e)))}n.style(t.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let l=null;n.addEventListener(t,"click",(e=>{if(e.target instanceof HTMLElement)try{let n=e.target.closest("a");if(!n)return;let{hash:r}=new URL(n.href),u=t.querySelector(r);u&&!o(u)&&(l=u)}catch{}}),!0),n.addEventListener(t,"touchmove",(e=>{e.target instanceof HTMLElement&&!o(e.target)&&e.preventDefault()}),{passive:!1}),n.add((()=>{window.scrollTo(0,window.pageYOffset+e),l&&l.isConnected&&(l.scrollIntoView({block:"nearest"}),l=null)}))}}}function Ce(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let Ae=function(e,t){let n=e(),r=new Set;return{getSnapshot:()=>n,subscribe:e=>(r.add(e),()=>r.delete(e)),dispatch(e,...o){let l=t[e].call(n,...o);l&&(n=l,r.forEach((e=>e())))}}}((()=>new Map),{PUSH(e,t){var n;let r=null!=(n=this.get(e))?n:{doc:e,count:0,d:E(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:Ce(n)},o=[Me(),Fe(),{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}];o.forEach((({before:e})=>null==e?void 0:e(r))),o.forEach((({after:e})=>null==e?void 0:e(r)))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});function Re(e,t,n){let r=function(e){return De(e.subscribe,e.getSnapshot,e.getSnapshot)}(Ae),o=e?r.get(e):void 0,l=!!o&&o.count>0;return u((()=>{if(e&&t)return Ae.dispatch("PUSH",e,n),()=>Ae.dispatch("POP",e,n)}),[t,e]),l}Ae.subscribe((()=>{let e=Ae.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let e="hidden"===t.get(n.doc),r=0!==n.count;(r&&!e||!r&&e)&&Ae.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),0===n.count&&Ae.dispatch("TEARDOWN",n)}}));let xe=new Map,Oe=new Map;function ke(e,t=!0){u((()=>{var n;if(!t)return;let r="function"==typeof e?e():e.current;if(!r)return;let o=null!=(n=Oe.get(r))?n:0;return Oe.set(r,o+1),0!==o||(xe.set(r,{"aria-hidden":r.getAttribute("aria-hidden"),inert:r.inert}),r.setAttribute("aria-hidden","true"),r.inert=!0),function(){var e;if(!r)return;let t=null!=(e=Oe.get(r))?e:1;if(1===t?Oe.delete(r):Oe.set(r,t-1),1!==t)return;let n=xe.get(r);n&&(null===n["aria-hidden"]?r.removeAttribute("aria-hidden"):r.setAttribute("aria-hidden",n["aria-hidden"]),r.inert=n.inert,xe.delete(r))}}),[e,t])}var Ne=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ne||{}),Ie=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(Ie||{});let He={0:(e,t)=>e.titleId===t.id?e:{...e,titleId:t.id}},Be=t.createContext(null);function _e(e){let n=t.useContext(Be);if(null===n){let t=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,_e),t}return n}function Ue(e,t){return i(t.type,He,e,t)}Be.displayName="DialogContext";let We=h.RenderStrategy|h.Static;let je=s((function(n,r){var l;let u=T(),{id:a=`headlessui-dialog-${u}`,open:s,onClose:f,initialFocus:m,__demoMode:v=!1,...g}=n,[E,h]=t.useState(0),y=w();void 0===s&&null!==y&&(s=(y&b.Open)===b.Open);let L=t.useRef(null),S=p(L,r),P=q(L),D=n.hasOwnProperty("open")||null!==y,F=n.hasOwnProperty("onClose");if(!D&&!F)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!D)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!F)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if("boolean"!=typeof s)throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${s}`);if("function"!=typeof f)throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${f}`);let M=s?0:1,[C,A]=t.useReducer(Ue,{titleId:null,descriptionId:null,panelRef:t.createRef()}),R=d((()=>f(!1))),x=d((e=>A({type:0,id:e}))),O=!!o()&&(!v&&0===M),k=E>1,N=null!==t.useContext(Be),[I,H]=function(){let n=t.useContext(ae),r=t.useRef([]),o=d((e=>(r.current.push(e),n&&n.register(e),()=>l(e)))),l=d((e=>{let t=r.current.indexOf(e);-1!==t&&r.current.splice(t,1),n&&n.unregister(e)})),u=t.useMemo((()=>({register:o,unregister:l,portals:r})),[o,l,r]);return[r,t.useMemo((()=>function({children:t}){return e.createElement(ae.Provider,{value:u},t)}),[u])]}(),{resolveContainers:_,mainTreeNodeRef:U,MainTreeNode:$}=function({defaultContainers:n=[],portals:r}={}){let o=t.useRef(null),l=q(o),u=d((()=>{var e;let t=[];for(let r of n)null!==r&&(r instanceof HTMLElement?t.push(r):"current"in r&&r.current instanceof HTMLElement&&t.push(r.current));if(null!=r&&r.current)for(let n of r.current)t.push(n);for(let n of null!=(e=null==l?void 0:l.querySelectorAll("html > *, body > *"))?e:[])n!==document.body&&n!==document.head&&n instanceof HTMLElement&&"headlessui-portal-root"!==n.id&&(n.contains(o.current)||t.some((e=>n.contains(e)))||t.push(n));return t}));return{resolveContainers:u,contains:d((e=>u().some((t=>t.contains(e))))),mainTreeNodeRef:o,MainTreeNode:t.useMemo((()=>function(){return e.createElement(j,{features:W.Hidden,ref:o})}),[o])}}({portals:I,defaultContainers:[null!=(l=C.panelRef.current)?l:L.current]}),G=k?"parent":"leaf",Y=null!==y&&(y&b.Closing)===b.Closing,X=!N&&!Y&&O,z=t.useCallback((()=>{var e,t;return null!=(t=Array.from(null!=(e=null==P?void 0:P.querySelectorAll("body > *"))?e:[]).find((e=>"headlessui-portal-root"!==e.id&&(e.contains(U.current)&&e instanceof HTMLElement))))?t:null}),[U]);ke(z,X);let J=!!k||O,Q=t.useCallback((()=>{var e,t;return null!=(t=Array.from(null!=(e=null==P?void 0:P.querySelectorAll("[data-headlessui-portal]"))?e:[]).find((e=>e.contains(U.current)&&e instanceof HTMLElement)))?t:null}),[U]);ke(Q,J),B(_,R,!(!O||k));let ee=!(k||0!==M);K(null==P?void 0:P.defaultView,"keydown",(e=>{ee&&(e.defaultPrevented||e.key===V.Escape&&(e.preventDefault(),e.stopPropagation(),R()))})),function(e,t,n=(()=>[document.body])){Re(e,t,(e=>{var t;return{containers:[...null!=(t=e.containers)?t:[],n]}}))}(P,!(Y||0!==M||N),_),t.useEffect((()=>{if(0!==M||!L.current)return;let e=new ResizeObserver((e=>{for(let t of e){let e=t.target.getBoundingClientRect();0===e.x&&0===e.y&&0===e.width&&0===e.height&&R()}}));return e.observe(L.current),()=>e.disconnect()}),[M,L,R]);let[te,ne]=function(){let[n,r]=t.useState([]);return[n.length>0?n.join(" "):void 0,t.useMemo((()=>function(n){let o=d((e=>(r((t=>[...t,e])),()=>r((t=>{let n=t.slice(),r=n.indexOf(e);return-1!==r&&n.splice(r,1),n}))))),l=t.useMemo((()=>({register:o,slot:n.slot,name:n.name,props:n.props})),[o,n.slot,n.name,n.props]);return e.createElement(fe.Provider,{value:l},n.children)}),[r])]}(),oe=t.useMemo((()=>[{dialogState:M,close:R,setTitleId:x},C]),[M,C,R,x]),le=t.useMemo((()=>({open:0===M})),[M]),ue={ref:S,id:a,role:"dialog","aria-modal":0===M||void 0,"aria-labelledby":C.titleId,"aria-describedby":te};return e.createElement(he,{type:"Dialog",enabled:0===M,element:L,onUpdate:d(((e,t)=>{"Dialog"===t&&i(e,{[Ee.Add]:()=>h((e=>e+1)),[Ee.Remove]:()=>h((e=>e-1))})}))},e.createElement(re,{force:!0},e.createElement(de,null,e.createElement(Be.Provider,{value:oe},e.createElement(de.Group,{target:L},e.createElement(re,{force:!1},e.createElement(ne,{slot:le,name:"Dialog.Description"},e.createElement(Z,{initialFocus:m,containers:_,features:O?i(G,{parent:Z.features.RestoreFocus,leaf:Z.features.All&~Z.features.FocusLock}):Z.features.None},e.createElement(H,null,c({ourProps:ue,theirProps:g,slot:le,defaultTag:"div",features:We,visible:0===M,name:"Dialog"}))))))))),e.createElement($,null))})),$e=s((function(n,r){let o=T(),{id:l=`headlessui-dialog-backdrop-${o}`,...u}=n,[{dialogState:i},a]=_e("Dialog.Backdrop"),s=p(r);t.useEffect((()=>{if(null===a.panelRef.current)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")}),[a.panelRef]);let d=t.useMemo((()=>({open:0===i})),[i]);return e.createElement(re,{force:!0},e.createElement(de,null,c({ourProps:{ref:s,id:l,"aria-hidden":!0},theirProps:u,slot:d,defaultTag:"div",name:"Dialog.Backdrop"})))})),Ve=s((function(e,n){let r=T(),{id:o=`headlessui-dialog-panel-${r}`,...l}=e,[{dialogState:u},i]=_e("Dialog.Panel"),a=p(n,i.panelRef),s=t.useMemo((()=>({open:0===u})),[u]),f=d((e=>{e.stopPropagation()}));return c({ourProps:{ref:a,id:o,onClick:f},theirProps:l,slot:s,defaultTag:"div",name:"Dialog.Panel"})})),Ge=s((function(e,n){let r=T(),{id:o=`headlessui-dialog-overlay-${r}`,...l}=e,[{dialogState:u,close:i}]=_e("Dialog.Overlay"),a=p(n),s=d((e=>{if(e.target===e.currentTarget){if(_(e.currentTarget))return e.preventDefault();e.preventDefault(),e.stopPropagation(),i()}})),f=t.useMemo((()=>({open:0===u})),[u]);return c({ourProps:{ref:a,id:o,"aria-hidden":!0,onClick:s},theirProps:l,slot:f,defaultTag:"div",name:"Dialog.Overlay"})})),Ye=s((function(e,n){let r=T(),{id:o=`headlessui-dialog-title-${r}`,...l}=e,[{dialogState:u,setTitleId:i}]=_e("Dialog.Title"),a=p(n);t.useEffect((()=>(i(o),()=>i(null))),[o,i]);let s=t.useMemo((()=>({open:0===u})),[u]);return c({ourProps:{ref:a,id:o},theirProps:l,slot:s,defaultTag:"h2",name:"Dialog.Title"})})),qe=Object.assign(je,{Backdrop:$e,Panel:Ve,Overlay:Ge,Title:Ye,Description:ve});export{qe as _};