var e=d(require("query-string")),t=d(require("p-cancelable")),r=d(require("lru-cache")),n=d(require("axios")),o=require("react-dom"),u=d(o),a=o.render,i=require("react"),c=d(i),s=i.Component,l=i.useState,f=i.useEffect,p=i.Suspense;function d(e){return e&&e.__esModule?e.default:e}function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.reduce((function(e,t){return"string"==typeof t&&t?e.push(t):Array.isArray(t)?e.push(b(t)):t&&"object"===y(t)&&Object.keys(t).forEach((function(r){t[r]&&e.push(r)})),e}),[]).join(" ")}function v(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function m(e){var t,r={container:document.getElementById("fx-notification-container")||((t=document.createElement("div")).id="fx-notification-container",t.classList.add("flax"),t.classList.add("fx-notification-container"),document.body.appendChild(t),t)}.container;return{container:r,alert:function(e){var t=e.delay,n=v(e,["delay"]),o=document.createElement("div");o.classList.add("fx-notification-wrapper"),r.appendChild(o),a(c.createElement(h,n),o),setTimeout((function(){o.classList.add("--hide"),setTimeout((function(){u.unmountComponentAtNode(o),o.remove()}),450)}),t||3e3)}}}function h(e){var t=e.type,r=e.title,n=e.message;return f((function(){return function(){}})),c.createElement(c.Fragment,null,c.createElement("div",{className:b("flax fx-notification","--".concat((t||"info").toLocaleLowerCase()))},t&&function(e){return e&&"INFO"!==e?c.createElement("div",{className:"--icon"},"SUCC"===e&&c.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})),"WARN"===e&&c.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})),"ERROR"===e&&c.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}))):null}(t),r&&c.createElement("strong",null,r),n))}function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var O=new r({max:100,maxAge:6e5}),j=function(e,t,r,n,o){if(o){var u,a,i;if(null!==(u=o.response)&&void 0!==u&&u.data)if(r.errReducer)o.response.reduced=r.errReducer(null===(a=o.response)||void 0===a?void 0:a.data,o);else o.response.reduced=null===(i=o.response)||void 0===i?void 0:i.data;t(o)}else e({data:null==n?void 0:n.data,reduced:r.reducer?r.reducer(null==n?void 0:n.data):null==n?void 0:n.data,response:n})},w={},E=function(e,t,r,n,o,u){if(u&&e.props.cacheMaxAge&&O.set(u,{data:null==r?void 0:r.data},e.props.cacheMaxAge),t){w[t].splice(0,w[t].length).forEach((function(e){var t=e.resolve,u=e.reject,a=e.props,i=(a.delay||0)-((new Date).getTime()-o.getTime());setTimeout((function(){j(t,u,a,r,n)}),Math.max(i,0))}))}else{var a=(e.props.delay||0)-((new Date).getTime()-o.getTime());setTimeout((function(){j(e.resolve,e.reject,e.props,r,n)}),Math.max(a,0))}},S=function(e){return e?"object"!==g(e)||Array.isArray(e)?e:Object.keys(e).reduce((function(t,r){return"object"===g(e[r])&&null!==e[r]?e[r].current instanceof HTMLElement?t[r]=e[r].current.value:t[r]=S(e[r]):t[r]=e[r],t}),{}):e};function x(r){var o=new t((function(t,u,a){var i,c,s,l=function(){o.cancel()},f=n.CancelToken.source(),p=(i=r.url,c=r.query||{},s=e.stringify(c),i+(s?(i.includes("?")?"&":"?")+s:"")),d="GET"===r.method&&r.throttle?"".concat(r.method," ").concat(p," ").concat(r.delay||0):null,y="GET"===r.method&&r.cacheMaxAge&&r.cacheMaxAge>0?"".concat(r.method," ").concat(r.url," ").concat(r.cacheMaxAge):null,b=y&&O.get(y);b?E({resolve:t,reject:u,cancelled:!1,props:r},null,b,null,new Date,null):(a.shouldReject=!1,a((function(){d&&1!==w[d].length||f.cancel()})),setTimeout((function(){if(!(d&&(w[d]=w[d]||[],w[d].push({resolve:t,reject:u,cancel:l,props:r}),w[d].length>1))){var e=new Date;n.request({cancelToken:f.token,method:r.method,url:p,headers:r.headers,responseType:r.responseType,data:S("function"==typeof r.data?r.data():r.data)}).then((function(n){E({resolve:t,reject:u,cancelled:o.isCanceled,props:r},d,n,null,e,y)})).catch((function(n){E({resolve:t,reject:u,cancelled:o.isCanceled,props:r},d,null,n,e,null)}))}}),25))}));return o}function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,u=void 0;try{for(var a,i=e[Symbol.iterator]();!(n=(a=i.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,u=e}finally{try{n||null==i.return||i.return()}finally{if(o)throw u}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}exports.setDefaultHeaders=function(e){n.defaults.headers.common=Object.assign(n.defaults.headers.common,e)},exports.setBaseUrl=function(e){n.defaults.baseURL=e};var I=function(e,t){e&&("string"==typeof e&&(e={message:e}),e.message&&(e.type=e.type||t,(0,m().alert)(e)))};function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=q(e);if(t){var o=q(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return M(this,r)}}function M(e,t){return!t||"object"!==A(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function q(e){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}exports.notify=I,exports.useRequest=function(e,t){var r=k(l(0),2),n=r[0],o=r[1],u=k(l({busy:!1,response:void 0,errorResponse:void 0}),2),a=u[0],i=u[1],c=t||{},s=c.success,f=c.done,p=c.error,d=[];return{reqId:n,request:function(t,r){if(a.busy)return!1;i({busy:!0,response:void 0,errorResponse:void 0});var u=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){R(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e);t&&(u.data=t),r&&(u.query=r);var c=x(u);return c.then((function(e){I(s&&s(e.reduced,e.response),"SUCC"),I(f&&f(e.data,null,e.response),"INFO"),o(n+1),i({busy:!1,response:e.reduced,errorResponse:void 0})})).catch((function(e){var t,r,u,a,c,s="number"==typeof(null===(t=e.response)||void 0===t?void 0:t.status)&&(null===(r=e.response)||void 0===r?void 0:r.status)<500?"WARN":"ERROR";I(p&&p((null===(u=e.response)||void 0===u?void 0:u.reduced)||e,e),s),I(f&&f(null===(a=e.response)||void 0===a?void 0:a.data,e,e.response),s),o(n+1),i({busy:!1,response:null===(c=e.response)||void 0===c?void 0:c.reduced,errorResponse:void 0})})),d.push(c),!0},response:a,cancel:function(){for(var e;e=d.pop();)e.cancel()}}};var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(u,s);var t,r,n,o=F(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=o.call(this,e)).state={busy:!1},t}return t=u,(r=[{key:"noti",value:function(e,t){I(e,t)}},{key:"handleClick",value:function(){var e=this;if(!this.state.busy){this.setState(T(T({},this.state),{},{busy:!0}));var t=this.props,r=t.success,n=t.error,o=t.done;x(T({},this.props.api)).then((function(t){e.noti(r&&r(t.reduced,t.response),"SUCC"),e.noti(o&&o(t.data,null,t.response),"INFO"),e.setState(T(T({},e.state),{},{busy:!1}))})).catch((function(t){var r,u,a,i,c="number"==typeof(null===(r=t.response)||void 0===r?void 0:r.status)&&(null===(u=t.response)||void 0===u?void 0:u.status)<500?"WARN":"ERROR";e.noti(n&&n(null===(a=t.response)||void 0===a?void 0:a.reduced,t),c),e.noti(o&&o(null===(i=t.response)||void 0===i?void 0:i.data,t,t.response),c),e.setState(T(T({},e.state),{},{busy:!1}))}))}}},{key:"render",value:function(){var e=this,t="".concat(this.props.tag||"button");return c.createElement(t,{className:"flax fx-button ".concat(this.state.busy?"--busy":""," ").concat(this.props.className||""),onClick:function(){return e.handleClick()},disabled:this.state.busy},this.props.children||this.props.label)}}])&&N(t.prototype,r),n&&N(t,n),u}();function U(e){return(U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function G(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?W(Object(r),!0).forEach((function(t){H(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):W(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function $(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function z(e,t){return(z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Q(e);if(t){var o=Q(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return K(this,r)}}function K(e,t){return!t||"object"!==U(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Q(e){return(Q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,u=void 0;try{for(var a,i=e[Symbol.iterator]();!(n=(a=i.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,u=e}finally{try{n||null==i.return||i.return()}finally{if(o)throw u}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return X(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return X(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Y(e,t){return function(){return{status:t?"ERROR":"SUCCESS",result:e,error:t}}}exports.FxButton=B;function Z(e){var t=V(l(),2),r=t[0],n=t[1],o=e.api,u=e.refreshId,a=e.reloadId,i=e.error,s=e.naked,p=function(){return x(Object.assign({throttle:!1!==o.throttle,refreshId:u},e.api,{reducer:void 0,errReducer:void 0}))};if(f((function(){var t=void 0;return a>0&&(t=p()).then((function(r){var o;null!==(o=t)&&void 0!==o&&o.isCanceled||(n((function(){return Y(r,null)})),e.releaseBusy(!0))})).catch((function(r){var o;null!==(o=t)&&void 0!==o&&o.isCanceled||(n((function(){return Y(null,r)})),e.releaseBusy(!1))})),function(){t&&t.cancel()}}),[a]),f((function(){var t=void 0;return n((function(){return t=p(),function(e,t){var r,n,o="PENDING";return t.then((function(u){if(!t.isCanceled){var a=Y(u,null)();n=a.result,o=a.status,r=a.error,e(!0)}})).catch((function(u){if(!t.isCanceled){var a=Y(null,u)();n=a.result,o=a.status,r=a.error,e(!1)}})),function(){if("PENDING"===o)throw t;return{status:o,error:r,result:n}}}(e.releaseBusy,t)})),function(){t&&t.cancel()}}),[o.method,o.url,u]),!r)return c.createElement(c.Fragment,null);var d=r();if("ERROR"===d.status){var y=function(){var t,r,n,o,u;return c.createElement(c.Fragment,null,i&&i(null!==(r=d.error)&&void 0!==r&&null!==(n=r.response)&&void 0!==n&&n.data?e.api.errReducer?e.api.errReducer(null===(o=d.error)||void 0===o?void 0:o.response.data,d.error):null===(u=d.error)||void 0===u?void 0:u.response.data:null,d.error),!i&&c.createElement("div",null,"Error (",null===(t=d.error)||void 0===t?void 0:t.message,")"))};return c.createElement(c.Fragment,null,s&&y(),!s&&c.createElement("div",{className:"flax fx-guard-error"},y()))}var b,v,m;return c.createElement(c.Fragment,null,e.render(null!==(b=d.result)&&void 0!==b&&b.data?e.api.reducer?e.api.reducer(null===(v=d.result)||void 0===v?void 0:v.data):null===(m=d.result)||void 0===m?void 0:m.data:null,e.refreshId>0))}var ee=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&z(e,t)}(u,s);var t,r,n,o=J(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=o.call(this,e)).state={refreshId:0,reloadId:0,busy:!0},t}return t=u,(r=[{key:"reload",value:function(e){this.state.busy||(e?this.setState(G(G({},this.state),{},{reloadId:this.state.reloadId+1,busy:!0})):this.setState(G(G({},this.state),{},{refreshId:this.state.refreshId+1,busy:!0})))}},{key:"releaseBusy",value:function(e){this.props.done&&this.props.done(e),this.setState(G(G({},this.state),{},{busy:!1}))}},{key:"render",value:function(){var e=this,t=function(){var t=function(){return c.createElement(c.Fragment,null,e.props.disableLoading&&c.createElement(c.Fragment,null,e.props.render(null,e.state.refreshId>0)),e.props.loading&&e.props.loading(),!e.props.loading&&!e.props.disableLoading&&c.createElement("div",{className:"flax fx-guard-loader"},"Loading .."))};return c.createElement(c.Fragment,null,c.createElement(p,{fallback:c.createElement(c.Fragment,null,e.props.naked&&t(),!e.props.naked&&c.createElement("div",{className:"flax fx-guard-loading"},t()))},c.createElement(Z,{releaseBusy:function(t){return e.releaseBusy(t)},refreshId:e.state.refreshId,reloadId:e.state.reloadId,api:e.props.api,render:e.props.render,error:e.props.error,naked:e.props.naked})))};return c.createElement(c.Fragment,null,this.props.naked&&t(),!this.props.naked&&c.createElement("div",{className:b("flax fx-guard",{"--loading":this.state.busy})},t()))}}])&&$(t.prototype,r),n&&$(t,n),u}();exports.FxGuard=ee;
//# sourceMappingURL=index.js.map
