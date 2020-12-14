import e from"query-string";import t from"lru-cache";import r from"axios";import n,{render as o}from"react-dom";import s,{Component as a,useEffect as l,Suspense as i,useState as c}from"react";function u(...e){return e.reduce(((e,t)=>("string"==typeof t&&t?e.push(t):Array.isArray(t)?e.push(u(t)):t&&"object"==typeof t&&Object.keys(t).forEach((r=>{t[r]&&e.push(r)})),e)),[]).join(" ")}function d(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function p(e){const{container:t}={container:document.getElementById("fx-notification-container")||(()=>{const e=document.createElement("div");return e.id="fx-notification-container",e.classList.add("flax"),e.classList.add("fx-notification-container"),document.body.appendChild(e),e})()};return{container:t,alert:e=>{const{delay:r}=e,a=d(e,["delay"]),l=document.createElement("div");l.classList.add("fx-notification-wrapper"),t.appendChild(l),o(s.createElement(h,a),l),setTimeout((()=>{l.classList.add("--hide"),setTimeout((()=>{n.unmountComponentAtNode(l),l.remove()}),450)}),r||3e3)}}}function h(e){const{type:t,title:r,message:n}=e;return l((()=>()=>{})),s.createElement(s.Fragment,null,s.createElement("div",{className:u("flax fx-notification","--".concat((t||"info").toLocaleLowerCase()))},t&&function(e){return e&&"INFO"!==e?s.createElement("div",{className:"--icon"},"SUCC"===e&&s.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})),"WARN"===e&&s.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})),"ERROR"===e&&s.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}))):null}(t),r&&s.createElement("strong",null,r),n))}const f=new t({max:100,maxAge:6e5}),m=(e,t,r,n,o)=>{if(o){var s,a,l;if(null===(s=o.response)||void 0===s?void 0:s.data)if(r.errReducer)o.response.reduced=r.errReducer(null===(a=o.response)||void 0===a?void 0:a.data,o);else o.response.reduced=null===(l=o.response)||void 0===l?void 0:l.data;t(o)}else e({data:null==n?void 0:n.data,reduced:r.reducer?r.reducer(null==n?void 0:n.data):null==n?void 0:n.data,response:n})},v={},y=(e,t,r,n,o,s)=>{if(s&&e.props.cacheMaxAge&&f.set(s,{data:null==r?void 0:r.data},e.props.cacheMaxAge),!t){const t=(e.props.delay||0)-((new Date).getTime()-o.getTime());return void setTimeout((()=>{m(e.resolve,e.reject,e.props,r,n)}),Math.max(t,0))}v[t].splice(0,v[t].length).forEach((({resolve:e,reject:t,props:s})=>{const a=(s.delay||0)-((new Date).getTime()-o.getTime());setTimeout((()=>{m(e,t,s,r,n)}),Math.max(a,0))}))},g=e=>e?"object"!=typeof e?e:Object.keys(e).reduce(((t,r)=>("object"==typeof e[r]?e[r].current instanceof HTMLElement?t[r]=e[r].current.value:t[r]=g(e[r]):t[r]=e[r],t)),{}):e;export function setDefaultHeaders(e){e.forEach((e=>{!function(e,t){r.defaults.headers.common[e]=t}(e.key,e.val)}))}function b(t){return new Promise(((n,o)=>{setTimeout((()=>{const s=((t,r)=>{const n=e.stringify(r);return t+(n?(t.includes("?")?"&":"?")+n:"")})(t.url,t.query||{}),a="GET"===t.method&&t.cacheMaxAge&&t.cacheMaxAge>0?"".concat(t.method," ").concat(t.url," ").concat(t.cacheMaxAge):null,l=a&&f.get(a);if(l)return void y({resolve:n,reject:o,props:t},null,l,null,new Date,null);const i="GET"===t.method&&t.throttle?"".concat(t.method," ").concat(s," ").concat(t.delay||0):null;if(i&&(v[i]=v[i]||[],v[i].push({resolve:n,reject:o,props:t}),v[i].length>1))return;const c=new Date;r.request({method:t.method,url:s,headers:t.headers,responseType:t.responseType,data:g("function"==typeof t.data?t.data():t.data)}).then((e=>{y({resolve:n,reject:o,props:t},i,e,null,c,a)})).catch((e=>{y({resolve:n,reject:o,props:t},i,null,e,c,null)}))}),25)}))}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){j(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}export class FxButton extends a{constructor(e){super(e),this.state={busy:!1}}noti(e,t){if(!e)return;if("string"==typeof e&&(e={message:e}),!e.message)return;e.type=e.type||t;const{alert:r}=p();r(e)}handleClick(){if(this.state.busy)return;this.setState(E(E({},this.state),{},{busy:!0}));const{success:e,error:t,done:r}=this.props;b(E({},this.props.api)).then((t=>{this.noti(e&&e(t.reduced,t.response),"SUCC"),this.noti(r&&r(t.data,null,t.response),"INFO"),this.setState(E(E({},this.state),{},{busy:!1}))})).catch((e=>{var n,o,s,a;const l="number"==typeof(null===(n=e.response)||void 0===n?void 0:n.status)&&(null===(o=e.response)||void 0===o?void 0:o.status)<500?"WARN":"ERROR";this.noti(t&&t(null===(s=e.response)||void 0===s?void 0:s.reduced,e),l),this.noti(r&&r(null===(a=e.response)||void 0===a?void 0:a.data,e,e.response),l),this.setState(E(E({},this.state),{},{busy:!1}))}))}render(){return s.createElement("button",{className:"flax fx-button",onClick:()=>this.handleClick(),disabled:this.state.busy},this.props.children||this.props.label)}}function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){k(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(e,t){return()=>({status:t?"ERROR":"SUCCESS",result:e,error:t})}function I(e){const[t,r]=c(),{api:n,refreshId:o,reloadId:a,error:i,naked:u}=e,d=()=>b(Object.assign({throttle:!1!==n.throttle,refreshId:o},e.api,{reducer:void 0,errReducer:void 0}));if(l((()=>{a>0&&d().then((t=>{r((()=>P(t,null))),e.releaseBusy(!0)})).catch((t=>{r((()=>P(null,t))),e.releaseBusy(!1)}))}),[a]),l((()=>{r((()=>function(e,t){let r,n,o="PENDING";return t.then((t=>{({result:n,status:o,error:r}=P(t,null)()),e(!0)})).catch((t=>{({result:n,status:o,error:r}=P(null,t)()),e(!1)})),()=>{if("PENDING"===o)throw t;return{status:o,error:r,result:n}}}(e.releaseBusy,d())))}),[n.method,n.url,o]),!t)return s.createElement(s.Fragment,null);const p=t();if("ERROR"===p.status){const t=()=>{var t,r,n,o;return(null===(t=p.error)||void 0===t||null===(r=t.response)||void 0===r?void 0:r.data)?e.api.errReducer?e.api.errReducer(null===(n=p.error)||void 0===n?void 0:n.response.data,p.error):null===(o=p.error)||void 0===o?void 0:o.response.data:null},r=()=>{var e;return s.createElement(s.Fragment,null,i&&i(t(),p.error),!i&&s.createElement("div",null,"Error (",null===(e=p.error)||void 0===e?void 0:e.message,")"))};return s.createElement(s.Fragment,null,u&&r(),!u&&s.createElement("div",{className:"flax fx-guard-error"},r()))}return s.createElement(s.Fragment,null,e.render((null===(h=p.result)||void 0===h?void 0:h.data)?e.api.reducer?e.api.reducer(null===(f=p.result)||void 0===f?void 0:f.data):null===(m=p.result)||void 0===m?void 0:m.data:null,e.refreshId>0));var h,f,m}export class FxGuard extends a{constructor(e){super(e),this.state={refreshId:0,reloadId:0,busy:!1}}reload(e){this.state.busy||(e?this.setState(w(w({},this.state),{},{reloadId:this.state.reloadId+1,busy:!0})):this.setState(w(w({},this.state),{},{refreshId:this.state.refreshId+1,busy:!0})))}releaseBusy(e){this.props.done&&this.props.done(e),this.setState(w(w({},this.state),{},{busy:!1}))}render(){const e=()=>{const e=()=>s.createElement(s.Fragment,null,this.props.disableLoading&&s.createElement(s.Fragment,null,this.props.render(null,this.state.refreshId>0)),this.props.loading&&this.props.loading(),!this.props.loading&&!this.props.disableLoading&&s.createElement("div",{className:"flax fx-guard-loader"},"Loading .."));return s.createElement(s.Fragment,null,s.createElement(i,{fallback:s.createElement(s.Fragment,null,this.props.naked&&e(),!this.props.naked&&s.createElement("div",{className:"flax fx-guard-loading"},e()))},s.createElement(I,{releaseBusy:e=>this.releaseBusy(e),refreshId:this.state.refreshId,reloadId:this.state.reloadId,api:this.props.api,render:this.props.render,error:this.props.error,naked:this.props.naked})))};return s.createElement(s.Fragment,null,this.props.naked&&e(),!this.props.naked&&s.createElement("div",{className:u("flax fx-guard",{"--loading":this.state.busy})},e()))}}
//# sourceMappingURL=index.module.js.map
