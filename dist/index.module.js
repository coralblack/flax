import e from"query-string";import t from"p-cancelable";import r from"lru-cache";import n from"axios";import o,{render as s}from"react-dom";import a,{Component as l,useState as i,useEffect as c,Suspense as u}from"react";function d(...e){return e.reduce(((e,t)=>("string"==typeof t&&t?e.push(t):Array.isArray(t)?e.push(d(t)):t&&"object"==typeof t&&Object.keys(t).forEach((r=>{t[r]&&e.push(r)})),e)),[]).join(" ")}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function f(e){const{container:t}={container:document.getElementById("fx-notification-container")||(()=>{const e=document.createElement("div");return e.id="fx-notification-container",e.classList.add("flax"),e.classList.add("fx-notification-container"),document.body.appendChild(e),e})()};return{container:t,alert:e=>{const{delay:r}=e,n=p(e,["delay"]),l=document.createElement("div");l.classList.add("fx-notification-wrapper"),t.appendChild(l),s(a.createElement(h,n),l),setTimeout((()=>{l.classList.add("--hide"),setTimeout((()=>{o.unmountComponentAtNode(l),l.remove()}),450)}),r||3e3)}}}function h(e){const{type:t,title:r,message:n}=e;return c((()=>()=>{})),a.createElement(a.Fragment,null,a.createElement("div",{className:d("flax fx-notification","--".concat((t||"info").toLocaleLowerCase()))},t&&function(e){return e&&"INFO"!==e?a.createElement("div",{className:"--icon"},"SUCC"===e&&a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})),"WARN"===e&&a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})),"ERROR"===e&&a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}))):null}(t),r&&a.createElement("strong",null,r),n))}const m=new r({max:100,maxAge:6e5}),v=(e,t,r,n,o)=>{if(o){var s,a,l;if(null===(s=o.response)||void 0===s?void 0:s.data)if(r.errReducer)o.response.reduced=r.errReducer(null===(a=o.response)||void 0===a?void 0:a.data,o);else o.response.reduced=null===(l=o.response)||void 0===l?void 0:l.data;t(o)}else e({data:null==n?void 0:n.data,reduced:r.reducer?r.reducer(null==n?void 0:n.data):null==n?void 0:n.data,response:n})},y={},b=(e,t,r,n,o,s)=>{if(s&&e.props.cacheMaxAge&&m.set(s,{data:null==r?void 0:r.data},e.props.cacheMaxAge),!t){const t=(e.props.delay||0)-((new Date).getTime()-o.getTime());return void setTimeout((()=>{v(e.resolve,e.reject,e.props,r,n)}),Math.max(t,0))}y[t].splice(0,y[t].length).forEach((({resolve:e,reject:t,props:s})=>{const a=(s.delay||0)-((new Date).getTime()-o.getTime());setTimeout((()=>{v(e,t,s,r,n)}),Math.max(a,0))}))},g=e=>e?"object"!=typeof e||Array.isArray(e)?e:Object.keys(e).reduce(((t,r)=>("object"==typeof e[r]?e[r].current instanceof HTMLElement?t[r]=e[r].current.value:t[r]=g(e[r]):t[r]=e[r],t)),{}):e;export function setDefaultHeaders(e){n.defaults.headers.common=Object.assign(n.defaults.headers.common,e)}export function setBaseUrl(e){n.defaults.baseURL=e}function O(r){const o=new t(((t,s,a)=>{const l=()=>{o.cancel()},i=n.CancelToken.source(),c=((t,r)=>{const n=e.stringify(r);return t+(n?(t.includes("?")?"&":"?")+n:"")})(r.url,r.query||{}),u="GET"===r.method&&r.throttle?"".concat(r.method," ").concat(c," ").concat(r.delay||0):null,d="GET"===r.method&&r.cacheMaxAge&&r.cacheMaxAge>0?"".concat(r.method," ").concat(r.url," ").concat(r.cacheMaxAge):null,p=d&&m.get(d);p?b({resolve:t,reject:s,cancelled:!1,props:r},null,p,null,new Date,null):(a.shouldReject=!1,a((()=>{u&&1!==y[u].length||i.cancel()})),setTimeout((()=>{if(u&&(y[u]=y[u]||[],y[u].push({resolve:t,reject:s,cancel:l,props:r}),y[u].length>1))return;const e=new Date;n.request({cancelToken:i.token,method:r.method,url:c,headers:r.headers,responseType:r.responseType,data:g("function"==typeof r.data?r.data():r.data)}).then((n=>{b({resolve:t,reject:s,cancelled:o.isCanceled,props:r},u,n,null,e,d)})).catch((n=>{b({resolve:t,reject:s,cancelled:o.isCanceled,props:r},u,null,n,e,null)}))}),25))}));return o}function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}export const notify=(e,t)=>{if(!e)return;if("string"==typeof e&&(e={message:e}),!e.message)return;e.type=e.type||t;const{alert:r}=f();r(e)};export function useRequest(e,t){const[r,n]=i(0),[o,s]=i({busy:!1,response:void 0,errorResponse:void 0}),{success:a,done:l,error:c}=t||{},u=[];return{reqId:r,request:()=>{if(o.busy)return!1;s({busy:!0,response:void 0,errorResponse:void 0});const t=O(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){E(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e));return t.then((e=>{notify(a&&a(e.reduced,e.response),"SUCC"),notify(l&&l(e.data,null,e.response),"INFO"),n(r+1),s({busy:!1,response:e.reduced,errorResponse:void 0})})).catch((e=>{var t,o,a,i,u;const d="number"==typeof(null===(t=e.response)||void 0===t?void 0:t.status)&&(null===(o=e.response)||void 0===o?void 0:o.status)<500?"WARN":"ERROR";notify(c&&c((null===(a=e.response)||void 0===a?void 0:a.reduced)||e,e),d),notify(l&&l(null===(i=e.response)||void 0===i?void 0:i.data,e,e.response),d),n(r+1),s({busy:!1,response:null===(u=e.response)||void 0===u?void 0:u.reduced,errorResponse:void 0})})),u.push(t),!0},response:o,cancel:()=>{let e;for(;e=u.pop();)e.cancel()}}}function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){k(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}export class FxButton extends l{constructor(e){super(e),this.state={busy:!1}}noti(e,t){notify(e,t)}handleClick(){if(this.state.busy)return;this.setState(x(x({},this.state),{},{busy:!0}));const{success:e,error:t,done:r}=this.props;O(x({},this.props.api)).then((t=>{this.noti(e&&e(t.reduced,t.response),"SUCC"),this.noti(r&&r(t.data,null,t.response),"INFO"),this.setState(x(x({},this.state),{},{busy:!1}))})).catch((e=>{var n,o,s,a;const l="number"==typeof(null===(n=e.response)||void 0===n?void 0:n.status)&&(null===(o=e.response)||void 0===o?void 0:o.status)<500?"WARN":"ERROR";this.noti(t&&t(null===(s=e.response)||void 0===s?void 0:s.reduced,e),l),this.noti(r&&r(null===(a=e.response)||void 0===a?void 0:a.data,e,e.response),l),this.setState(x(x({},this.state),{},{busy:!1}))}))}render(){const e="".concat(this.props.tag||"button");return a.createElement(e,{className:"flax fx-button ".concat(this.state.busy?"--busy":""," ").concat(this.props.className||""),onClick:()=>this.handleClick(),disabled:this.state.busy},this.props.children||this.props.label)}}function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e,t){return()=>({status:t?"ERROR":"SUCCESS",result:e,error:t})}function L(e){const[t,r]=i(),{api:n,refreshId:o,reloadId:s,error:l,naked:u}=e,d=()=>O(Object.assign({throttle:!1!==n.throttle,refreshId:o},e.api,{reducer:void 0,errReducer:void 0}));if(c((()=>{let t=void 0;return s>0&&(t=d(),t.then((n=>{var o;(null===(o=t)||void 0===o?void 0:o.isCanceled)||(r((()=>I(n,null))),e.releaseBusy(!0))})).catch((n=>{var o;(null===(o=t)||void 0===o?void 0:o.isCanceled)||(r((()=>I(null,n))),e.releaseBusy(!1))}))),()=>{t&&t.cancel()}}),[s]),c((()=>{let t=void 0;return r((()=>(t=d(),function(e,t){let r,n,o="PENDING";return t.then((s=>{t.isCanceled||(({result:n,status:o,error:r}=I(s,null)()),e(!0))})).catch((s=>{t.isCanceled||(({result:n,status:o,error:r}=I(null,s)()),e(!1))})),()=>{if("PENDING"===o)throw t;return{status:o,error:r,result:n}}}(e.releaseBusy,t)))),()=>{t&&t.cancel()}}),[n.method,n.url,o]),!t)return a.createElement(a.Fragment,null);const p=t();if("ERROR"===p.status){const t=()=>{var t,r,n,o;return(null===(t=p.error)||void 0===t||null===(r=t.response)||void 0===r?void 0:r.data)?e.api.errReducer?e.api.errReducer(null===(n=p.error)||void 0===n?void 0:n.response.data,p.error):null===(o=p.error)||void 0===o?void 0:o.response.data:null},r=()=>{var e;return a.createElement(a.Fragment,null,l&&l(t(),p.error),!l&&a.createElement("div",null,"Error (",null===(e=p.error)||void 0===e?void 0:e.message,")"))};return a.createElement(a.Fragment,null,u&&r(),!u&&a.createElement("div",{className:"flax fx-guard-error"},r()))}return a.createElement(a.Fragment,null,e.render((null===(f=p.result)||void 0===f?void 0:f.data)?e.api.reducer?e.api.reducer(null===(h=p.result)||void 0===h?void 0:h.data):null===(m=p.result)||void 0===m?void 0:m.data:null,e.refreshId>0));var f,h,m}export class FxGuard extends l{constructor(e){super(e),this.state={refreshId:0,reloadId:0,busy:!0}}reload(e){this.state.busy||(e?this.setState(R(R({},this.state),{},{reloadId:this.state.reloadId+1,busy:!0})):this.setState(R(R({},this.state),{},{refreshId:this.state.refreshId+1,busy:!0})))}releaseBusy(e){this.props.done&&this.props.done(e),this.setState(R(R({},this.state),{},{busy:!1}))}render(){const e=()=>{const e=()=>a.createElement(a.Fragment,null,this.props.disableLoading&&a.createElement(a.Fragment,null,this.props.render(null,this.state.refreshId>0)),this.props.loading&&this.props.loading(),!this.props.loading&&!this.props.disableLoading&&a.createElement("div",{className:"flax fx-guard-loader"},"Loading .."));return a.createElement(a.Fragment,null,a.createElement(u,{fallback:a.createElement(a.Fragment,null,this.props.naked&&e(),!this.props.naked&&a.createElement("div",{className:"flax fx-guard-loading"},e()))},a.createElement(L,{releaseBusy:e=>this.releaseBusy(e),refreshId:this.state.refreshId,reloadId:this.state.reloadId,api:this.props.api,render:this.props.render,error:this.props.error,naked:this.props.naked})))};return a.createElement(a.Fragment,null,this.props.naked&&e(),!this.props.naked&&a.createElement("div",{className:d("flax fx-guard",{"--loading":this.state.busy})},e()))}}
//# sourceMappingURL=index.module.js.map
