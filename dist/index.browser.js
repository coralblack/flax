var $faGca$swchelpers = require("@swc/helpers");
var $faGca$reactjsxruntime = require("react/jsx-runtime");
var $faGca$react = require("react");
var $faGca$reactdom = require("react-dom");
var $faGca$axios = require("axios");
var $faGca$nodecache = require("node-cache");
var $faGca$pcancelable = require("p-cancelable");
var $faGca$querystring = require("query-string");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "setDefaultHeaders", function () { return $38dc5e4263dc53c4$export$8b68539586e424ba; });
$parcel$export(module.exports, "setBaseUrl", function () { return $38dc5e4263dc53c4$export$9c999f676138fa5b; });
$parcel$export(module.exports, "setDefaultTransformResponse", function () { return $38dc5e4263dc53c4$export$3e914cea1d334d06; });
$parcel$export(module.exports, "request", function () { return $38dc5e4263dc53c4$export$b5fe3f66a567bec0; });
var $791cedb0dad2cc54$exports = {};

$parcel$export($791cedb0dad2cc54$exports, "FxButton", function () { return $791cedb0dad2cc54$export$5bd2698c576da1ad; });



var $ee8dff3b62e8c94e$exports = {};

$parcel$export($ee8dff3b62e8c94e$exports, "notify", function () { return $ee8dff3b62e8c94e$export$5e14cdade93d6f7b; });
$parcel$export($ee8dff3b62e8c94e$exports, "useRequest", function () { return $ee8dff3b62e8c94e$export$7fba1a658e28476a; });






var $5ee94382b47e2091$var$fxNotificationContainerId = 'fx-notification-container';
function $5ee94382b47e2091$export$a30a0cd06ecf3418() {
    var container = document.getElementById($5ee94382b47e2091$var$fxNotificationContainerId) || function() {
        var dom = document.createElement('div');
        dom.id = $5ee94382b47e2091$var$fxNotificationContainerId;
        dom.classList.add('flax');
        dom.classList.add('fx-notification-container');
        document.body.appendChild(dom);
        return dom;
    }();
    return {
        container: container
    };
}


function $4b9b03e603b106be$export$ce4ab0c55987d1ff() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return args.reduce(function(o, e) {
        if (typeof e === 'string' && e) o.push(e);
        else if (Array.isArray(e)) o.push($4b9b03e603b106be$export$ce4ab0c55987d1ff(e));
        else if (e && typeof e === 'object') Object.keys(e).forEach(function(k) {
            if (e[k]) o.push(k);
        });
        return o;
    }, []).join(' ');
}


function $3ad89611426542f7$var$Progress(callback, elem, delay) {
    var timerId = setTimeout(callback, delay);
    var remaining = delay;
    var start = new Date().getTime();
    var anim = function() {
        var prev = (delay - remaining) / delay * 100;
        if (elem) elem.style.width = String(prev + (new Date().getTime() - start) / remaining * (100 - prev)) + '%';
    };
    var animInterval = setInterval(anim, 5);
    return {
        pause: function() {
            clearTimeout(timerId);
            clearInterval(animInterval);
            remaining -= new Date().getTime() - start;
        },
        resume: function() {
            start = new Date().getTime();
            clearTimeout(timerId);
            clearInterval(animInterval);
            timerId = setTimeout(callback, remaining);
            animInterval = setInterval(anim, 5);
        },
        done: function() {
            clearTimeout(timerId);
            clearInterval(animInterval);
        }
    };
}
function $3ad89611426542f7$export$9949bd9c713ba425(props1) {
    var container = $5ee94382b47e2091$export$a30a0cd06ecf3418().container;
    return {
        container: container,
        alert: function(attrs) {
            var delay = attrs.delay, props = $faGca$swchelpers.objectWithoutProperties(attrs, [
                "delay"
            ]);
            var wrapper = document.createElement('div');
            wrapper.classList.add('fx-notification-wrapper');
            container.appendChild(wrapper);
            $faGca$reactdom.render(/*#__PURE__*/ $faGca$reactjsxruntime.jsx($3ad89611426542f7$export$9fe22d1de21b5211, $faGca$swchelpers.objectSpread({}, props)), wrapper, function() {
                var ref;
                var closeButton = wrapper.getElementsByTagName('button');
                var progressBar = wrapper.getElementsByTagName('span');
                var progress = undefined;
                var cb = function() {
                    wrapper.classList.add('--hide');
                    !!progress && progress.done();
                    setTimeout(function() {
                        ($parcel$interopDefault($faGca$reactdom)).unmountComponentAtNode(wrapper);
                        wrapper.remove();
                    }, 450);
                };
                (ref = closeButton[0]) === null || ref === void 0 ? void 0 : ref.addEventListener('click', function() {
                    cb();
                });
                progress = $3ad89611426542f7$var$Progress(cb, progressBar[0], Math.min(delay || 5000, 5000));
                wrapper.addEventListener('mouseover', function() {
                    !!progress && progress.pause();
                });
                wrapper.addEventListener('mouseout', function() {
                    !!progress && progress.resume();
                });
            });
        }
    };
}
function $3ad89611426542f7$var$Type(type) {
    if (!type || type === 'INFO') return null;
    return /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
        children: /*#__PURE__*/ $faGca$reactjsxruntime.jsxs("div", {
            className: "--icon",
            children: [
                type === 'SUCC' && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M5 13l4 4L19 7"
                    })
                }),
                type === 'WARN' && /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
                    children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        })
                    })
                }),
                type === 'ERROR' && /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
                    children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        })
                    })
                })
            ]
        })
    });
//if (type === 'WARN') return <div>W</div>;
//if (type === 'ERROR') return <div>E</div>;
}
function $3ad89611426542f7$export$9fe22d1de21b5211(props) {
    var type = props.type, title = props.title, message = props.message;
    $faGca$react.useEffect(function() {
        // Initialize
        return function() {
        // Clear
        };
    });
    return /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
        children: /*#__PURE__*/ $faGca$reactjsxruntime.jsxs("div", {
            className: $4b9b03e603b106be$export$ce4ab0c55987d1ff('flax fx-notification', "--".concat((type || 'info').toLocaleLowerCase())),
            children: [
                type && $3ad89611426542f7$var$Type(type),
                title && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("strong", {
                    children: title
                }),
                message,
                /*#__PURE__*/ $faGca$reactjsxruntime.jsx("button", {
                    className: "close",
                    children: "Close"
                }),
                /*#__PURE__*/ $faGca$reactjsxruntime.jsx("div", {
                    className: "progress",
                    children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx("span", {})
                })
            ]
        })
    });
}







var $38dc5e4263dc53c4$var$cache = new ($parcel$interopDefault($faGca$nodecache))({
    maxKeys: 100
});
var $38dc5e4263dc53c4$var$resolving = function(resolve, reject, props, resp, error) {
    if (error) {
        var ref;
        if ((ref = error.response) === null || ref === void 0 ? void 0 : ref.data) {
            var ref1, ref2;
            if (props.errReducer) error.response.reduced = props.errReducer((ref1 = error.response) === null || ref1 === void 0 ? void 0 : ref1.data, error);
            else error.response.reduced = (ref2 = error.response) === null || ref2 === void 0 ? void 0 : ref2.data;
        }
        reject(error);
    } else resolve({
        data: resp === null || resp === void 0 ? void 0 : resp.data,
        reduced: props.reducer ? props.reducer(resp === null || resp === void 0 ? void 0 : resp.data) : resp === null || resp === void 0 ? void 0 : resp.data,
        response: resp
    });
};
var $38dc5e4263dc53c4$var$resolvers = {};
var $38dc5e4263dc53c4$var$resolver = function(resolver, key, resp, error, startAt, cacheKey) {
    if (cacheKey && resolver.props.cacheMaxAge) $38dc5e4263dc53c4$var$cache.set(cacheKey, {
        data: resp === null || resp === void 0 ? void 0 : resp.data
    }, resolver.props.cacheMaxAge);
    if (!key) {
        var delay = (resolver.props.delay || 0) - (new Date().getTime() - startAt.getTime());
        setTimeout(function() {
            $38dc5e4263dc53c4$var$resolving(resolver.resolve, resolver.reject, resolver.props, resp, error);
        }, Math.max(delay, 0));
        return;
    }
    var res = $38dc5e4263dc53c4$var$resolvers[key].splice(0, $38dc5e4263dc53c4$var$resolvers[key].length);
    res.forEach(function(param) {
        var resolve = param.resolve, reject = param.reject, props = param.props;
        var delay = (props.delay || 0) - (new Date().getTime() - startAt.getTime());
        setTimeout(function() {
            $38dc5e4263dc53c4$var$resolving(resolve, reject, props, resp, error);
        }, Math.max(delay, 0));
    });
};
var $38dc5e4263dc53c4$var$dataMapper = function(data) {
    if (!data) return data;
    if (typeof data !== 'object') return data;
    if (Array.isArray(data)) return data;
    return Object.keys(data).reduce(function(p, c) {
        if (typeof data[c] === 'object' && data[c] !== null) {
            if (data[c].current instanceof HTMLElement) p[c] = data[c].current.value;
            else p[c] = $38dc5e4263dc53c4$var$dataMapper(data[c]);
        } else if ($faGca$swchelpers.typeOf(data[c]) === 'bigint') p[c] = String(data[c]);
        else p[c] = data[c];
        return p;
    }, {});
};
function $38dc5e4263dc53c4$export$8b68539586e424ba(headers) {
    ($parcel$interopDefault($faGca$axios)).defaults.headers.common = Object.assign(($parcel$interopDefault($faGca$axios)).defaults.headers.common, headers);
}
function $38dc5e4263dc53c4$export$9c999f676138fa5b(url) {
    ($parcel$interopDefault($faGca$axios)).defaults.baseURL = url;
}
function $38dc5e4263dc53c4$export$3e914cea1d334d06(trs) {
    ($parcel$interopDefault($faGca$axios)).defaults.transformResponse = trs;
}
function $38dc5e4263dc53c4$export$b5fe3f66a567bec0(props) {
    var cp = new ($parcel$interopDefault($faGca$pcancelable))(function(resolve, reject, onCancel) {
        var cancel = function() {
            cp.cancel();
        };
        var ct = ($parcel$interopDefault($faGca$axios)).CancelToken.source();
        var url = function(u, query) {
            var qs = ($parcel$interopDefault($faGca$querystring)).stringify(query);
            return u + (qs ? (u.includes('?') ? '&' : '?') + qs : '');
        }(props.url, props.query || {});
        var lazyGroup = props.method === 'GET' && props.throttle ? "".concat(props.method, " ").concat(url, " ").concat(props.delay || 0) : null;
        var cacheKey = props.method === 'GET' && props.cacheMaxAge && props.cacheMaxAge > 0 ? "".concat(props.method, " ").concat(props.url, " ").concat(props.cacheMaxAge) : null;
        var cached = cacheKey && $38dc5e4263dc53c4$var$cache.get(cacheKey);
        if (cached) {
            $38dc5e4263dc53c4$var$resolver({
                resolve: resolve,
                reject: reject,
                cancelled: false,
                props: props
            }, null, cached, null, new Date(), null);
            return;
        }
        onCancel.shouldReject = false;
        onCancel(function() {
            if (!lazyGroup || $38dc5e4263dc53c4$var$resolvers[lazyGroup].length === 1) ct.cancel();
        });
        setTimeout(function() {
            if (lazyGroup) {
                $38dc5e4263dc53c4$var$resolvers[lazyGroup] = $38dc5e4263dc53c4$var$resolvers[lazyGroup] || [];
                $38dc5e4263dc53c4$var$resolvers[lazyGroup].push({
                    resolve: resolve,
                    reject: reject,
                    cancel: cancel,
                    props: props
                });
                // Duplicated `GET` request,
                if ($38dc5e4263dc53c4$var$resolvers[lazyGroup].length > 1) return;
            }
            var start = new Date();
            ($parcel$interopDefault($faGca$axios)).request({
                cancelToken: ct.token,
                method: props.method,
                url: url,
                headers: props.headers,
                responseType: props.responseType,
                data: $38dc5e4263dc53c4$var$dataMapper(typeof props.data === 'function' ? props.data() : props.data)
            }).then(function(resp) {
                $38dc5e4263dc53c4$var$resolver({
                    resolve: resolve,
                    reject: reject,
                    cancelled: cp.isCanceled,
                    props: props
                }, lazyGroup, resp, null, start, cacheKey);
            }).catch(function(err) {
                $38dc5e4263dc53c4$var$resolver({
                    resolve: resolve,
                    reject: reject,
                    cancelled: cp.isCanceled,
                    props: props
                }, lazyGroup, null, err, start, null);
            });
        }, 25);
    });
    return cp;
}


var $ee8dff3b62e8c94e$export$5e14cdade93d6f7b = function(payload, type) {
    if (!payload) return;
    if (typeof payload === 'string') payload = {
        message: payload
    };
    if (!payload.message) return;
    payload.type = payload.type || type;
    if (type === 'WARN' || type === 'ERROR') payload.delay = payload.delay || 10000;
    var ref = $3ad89611426542f7$export$9949bd9c713ba425({}), notiAlert = ref.alert;
    notiAlert(payload);
};
function $ee8dff3b62e8c94e$export$7fba1a658e28476a(api, props) {
    var ref7 = $faGca$swchelpers.slicedToArray($faGca$react.useState(0), 2), reqId = ref7[0], setReqId = ref7[1];
    var ref1 = $faGca$swchelpers.slicedToArray($faGca$react.useState({
        busy: false,
        response: undefined,
        errorResponse: undefined
    }), 2), resp = ref1[0], setResp = ref1[1];
    var ref2 = props || {}, success = ref2.success, done = ref2.done, error = ref2.error;
    var queues = [];
    var requestWrapper = function(wrapperParams) {
        if (resp.busy) return false;
        setResp({
            busy: true,
            response: undefined,
            errorResponse: undefined
        });
        var reqParams = $faGca$swchelpers.objectSpread({}, api);
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.data) reqParams.data = wrapperParams.data;
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.query) reqParams.query = wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.query;
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.headers) reqParams.headers = wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.headers;
        var rp = $38dc5e4263dc53c4$export$b5fe3f66a567bec0(reqParams);
        rp.then(function(res) {
            $ee8dff3b62e8c94e$export$5e14cdade93d6f7b(success && success(res.reduced, res.response), 'SUCC');
            $ee8dff3b62e8c94e$export$5e14cdade93d6f7b(done && done(res.data, null, res.response), 'INFO');
            setReqId(reqId + 1);
            setResp({
                busy: false,
                response: res.reduced,
                errorResponse: undefined
            });
        }).catch(function(err) {
            var ref, ref3, ref4, ref5, ref6;
            var type = typeof ((ref = err.response) === null || ref === void 0 ? void 0 : ref.status) === 'number' && ((ref3 = err.response) === null || ref3 === void 0 ? void 0 : ref3.status) < 500 ? 'WARN' : 'ERROR';
            $ee8dff3b62e8c94e$export$5e14cdade93d6f7b(error && error(((ref4 = err.response) === null || ref4 === void 0 ? void 0 : ref4.reduced) || err, err), type);
            $ee8dff3b62e8c94e$export$5e14cdade93d6f7b(done && done((ref5 = err.response) === null || ref5 === void 0 ? void 0 : ref5.data, err, err.response), type);
            setReqId(reqId + 1);
            setResp({
                busy: false,
                response: (ref6 = err.response) === null || ref6 === void 0 ? void 0 : ref6.reduced,
                errorResponse: undefined
            });
        });
        queues.push(rp);
        return true;
    };
    var cancel = function() {
        var rp;
        while(rp = queues.pop())rp.cancel();
    };
    return {
        reqId: reqId,
        request: requestWrapper,
        response: resp,
        cancel: cancel
    };
}



var $791cedb0dad2cc54$export$5bd2698c576da1ad = /*#__PURE__*/ function(Component) {
    "use strict";
    $faGca$swchelpers.inherits($791cedb0dad2cc54$export$5bd2698c576da1ad, Component);
    var _super = $faGca$swchelpers.createSuper($791cedb0dad2cc54$export$5bd2698c576da1ad);
    function $791cedb0dad2cc54$export$5bd2698c576da1ad(props) {
        $faGca$swchelpers.classCallCheck(this, $791cedb0dad2cc54$export$5bd2698c576da1ad);
        var _this;
        _this = _super.call(this, props);
        _this.state = {
            busy: false
        };
        return _this;
    }
    $faGca$swchelpers.createClass($791cedb0dad2cc54$export$5bd2698c576da1ad, [
        {
            key: "noti",
            value: function noti(payload, type) {
                $ee8dff3b62e8c94e$export$5e14cdade93d6f7b(payload, type);
            }
        },
        {
            key: "handleClick",
            value: function handleClick() {
                var _this = this;
                if (this.state.busy) return;
                this.setState($faGca$swchelpers.objectSpread({}, this.state, {
                    busy: true
                }));
                var _props = this.props, success = _props.success, error = _props.error, done = _props.done;
                $38dc5e4263dc53c4$export$b5fe3f66a567bec0($faGca$swchelpers.objectSpread({}, this.props.api)).then(function(res) {
                    _this.noti(success && success(res.reduced, res.response), 'SUCC');
                    _this.noti(done && done(res.data, null, res.response), 'INFO');
                    _this.setState($faGca$swchelpers.objectSpread({}, _this.state, {
                        busy: false
                    }));
                }).catch(function(err) {
                    var ref, ref1, ref2, ref3;
                    var type = typeof ((ref = err.response) === null || ref === void 0 ? void 0 : ref.status) === 'number' && ((ref1 = err.response) === null || ref1 === void 0 ? void 0 : ref1.status) < 500 ? 'WARN' : 'ERROR';
                    _this.noti(error && error((ref2 = err.response) === null || ref2 === void 0 ? void 0 : ref2.reduced, err), type);
                    _this.noti(done && done((ref3 = err.response) === null || ref3 === void 0 ? void 0 : ref3.data, err, err.response), type);
                    _this.setState($faGca$swchelpers.objectSpread({}, _this.state, {
                        busy: false
                    }));
                });
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var ButtonTag = "".concat(this.props.tag || 'button');
                return /*#__PURE__*/ $faGca$reactjsxruntime.jsx(ButtonTag, {
                    className: "flax fx-button ".concat(this.state.busy ? '--busy' : '', " ").concat(this.props.className || ''),
                    onClick: function() {
                        return _this.handleClick();
                    },
                    disabled: this.state.busy,
                    children: this.props.children || this.props.label
                });
            }
        }
    ]);
    return $791cedb0dad2cc54$export$5bd2698c576da1ad;
}($faGca$react.Component);


var $99f37795653f9322$exports = {};

$parcel$export($99f37795653f9322$exports, "FxGuard", function () { return $99f37795653f9322$export$c8bd619db52a143b; });





function $99f37795653f9322$var$lazyResponse(result, error) {
    return function() {
        return {
            status: error ? 'ERROR' : 'SUCCESS',
            result: result,
            error: error
        };
    };
}
var $99f37795653f9322$var$lazy = function $99f37795653f9322$var$lazy(release, p) {
    var status = 'PENDING';
    var error;
    var result;
    p.then(function(res) {
        if (p.isCanceled) return;
        var ref;
        ref = $99f37795653f9322$var$lazyResponse(res, null)(), result = ref.result, status = ref.status, error = ref.error, ref;
        release(true);
    }).catch(function(err) {
        if (p.isCanceled) return;
        var ref;
        ref = $99f37795653f9322$var$lazyResponse(null, err)(), result = ref.result, status = ref.status, error = ref.error, ref;
        release(false);
    });
    return function() {
        if (status === 'PENDING') throw p;
        return {
            status: status,
            error: error,
            result: result
        };
    };
};
function $99f37795653f9322$var$FxGuardInner(props) {
    var ref4 = $faGca$swchelpers.slicedToArray($faGca$react.useState(), 2), prepared = ref4[0], setPrepared = ref4[1];
    var api = props.api, refreshId = props.refreshId, reloadId = props.reloadId, error = props.error, naked = props.naked;
    var req = function() {
        return $38dc5e4263dc53c4$export$b5fe3f66a567bec0(Object.assign({
            throttle: api.throttle === false ? false : true,
            refreshId: refreshId
        }, props.api, {
            reducer: undefined,
            errReducer: undefined
        }));
    };
    $faGca$react.useEffect(function() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var rp = undefined;
        if (reloadId > 0) {
            rp = req();
            rp.then(function(res) {
                if (rp === null || rp === void 0 ? void 0 : rp.isCanceled) return;
                setPrepared(function() {
                    return $99f37795653f9322$var$lazyResponse(res, null);
                });
                props.releaseBusy(true);
            }).catch(function(err) {
                if (rp === null || rp === void 0 ? void 0 : rp.isCanceled) return;
                setPrepared(function() {
                    return $99f37795653f9322$var$lazyResponse(null, err);
                });
                props.releaseBusy(false);
            });
        }
        return function() {
            if (rp) rp.cancel();
        };
    }, [
        reloadId
    ]);
    $faGca$react.useEffect(function() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var rp = undefined;
        setPrepared(function() {
            rp = req();
            return $99f37795653f9322$var$lazy(props.releaseBusy, rp);
        });
        return function() {
            if (rp) rp.cancel();
        };
    }, [
        api.method,
        api.url,
        refreshId
    ]);
    if (!prepared) return /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {});
    var resp = prepared();
    if (resp.status === 'ERROR') {
        var rr = function() {
            var ref, ref1, ref2, ref3;
            if (!((ref = resp.error) === null || ref === void 0 ? void 0 : (ref1 = ref.response) === null || ref1 === void 0 ? void 0 : ref1.data)) return null;
            return props.api.errReducer ? props.api.errReducer((ref2 = resp.error) === null || ref2 === void 0 ? void 0 : ref2.response.data, resp.error) : (ref3 = resp.error) === null || ref3 === void 0 ? void 0 : ref3.response.data;
        };
        var r = function() {
            var ref;
            /*#__PURE__*/ return $faGca$reactjsxruntime.jsxs($faGca$reactjsxruntime.Fragment, {
                children: [
                    error && error(rr(), resp.error),
                    !error && /*#__PURE__*/ $faGca$reactjsxruntime.jsxs("div", {
                        children: [
                            "Error (",
                            (ref = resp.error) === null || ref === void 0 ? void 0 : ref.message,
                            ")"
                        ]
                    })
                ]
            });
        };
        return /*#__PURE__*/ $faGca$reactjsxruntime.jsxs($faGca$reactjsxruntime.Fragment, {
            children: [
                naked && r(),
                !naked && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("div", {
                    className: "flax fx-guard-error",
                    children: r()
                })
            ]
        });
    }
    var rr1 = function() {
        var ref, ref5, ref6;
        if (!((ref = resp.result) === null || ref === void 0 ? void 0 : ref.data)) return null;
        return props.api.reducer ? props.api.reducer((ref5 = resp.result) === null || ref5 === void 0 ? void 0 : ref5.data) : (ref6 = resp.result) === null || ref6 === void 0 ? void 0 : ref6.data;
    };
    return /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
        children: props.render(rr1(), props.refreshId > 0)
    });
}
var $99f37795653f9322$export$c8bd619db52a143b = /*#__PURE__*/ function(Component) {
    "use strict";
    $faGca$swchelpers.inherits($99f37795653f9322$export$c8bd619db52a143b, Component);
    var _super = $faGca$swchelpers.createSuper($99f37795653f9322$export$c8bd619db52a143b);
    function $99f37795653f9322$export$c8bd619db52a143b(props) {
        $faGca$swchelpers.classCallCheck(this, $99f37795653f9322$export$c8bd619db52a143b);
        var _this;
        _this = _super.call(this, props);
        _this.state = {
            refreshId: 0,
            reloadId: 0,
            busy: true,
            silent: false,
            className: undefined
        };
        return _this;
    }
    $faGca$swchelpers.createClass($99f37795653f9322$export$c8bd619db52a143b, [
        {
            key: "reload",
            value: function reload(silent, className) {
                if (this.state.busy) return;
                if (silent) {
                    this.setState($faGca$swchelpers.objectSpread({}, this.state, {
                        reloadId: this.state.reloadId + 1,
                        busy: true,
                        silent: true,
                        className: className
                    }));
                    return;
                }
                this.setState($faGca$swchelpers.objectSpread({}, this.state, {
                    refreshId: this.state.refreshId + 1,
                    busy: true,
                    silent: false,
                    className: undefined
                }));
            }
        },
        {
            key: "releaseBusy",
            value: function releaseBusy(succeed) {
                if (this.props.done) this.props.done(succeed);
                this.setState($faGca$swchelpers.objectSpread({}, this.state, {
                    busy: false,
                    silent: false,
                    className: undefined
                }));
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var r = function() {
                    var _this1 = _this;
                    var rl = function() {
                        return /*#__PURE__*/ $faGca$reactjsxruntime.jsxs($faGca$reactjsxruntime.Fragment, {
                            children: [
                                _this1.props.disableLoading && /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
                                    children: _this1.props.render(null, _this1.state.refreshId > 0)
                                }),
                                _this1.props.loading && _this1.props.loading(),
                                !_this1.props.loading && !_this1.props.disableLoading && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("div", {
                                    className: $4b9b03e603b106be$export$ce4ab0c55987d1ff('flax fx-guard-loader', {
                                        '--silent': _this1.props.disableLoading
                                    }),
                                    children: "Loading .."
                                })
                            ]
                        });
                    };
                    return /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$reactjsxruntime.Fragment, {
                        children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx($faGca$react.Suspense, {
                            fallback: /*#__PURE__*/ $faGca$reactjsxruntime.jsxs($faGca$reactjsxruntime.Fragment, {
                                children: [
                                    _this.props.naked && rl(),
                                    !_this.props.naked && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("div", {
                                        className: $4b9b03e603b106be$export$ce4ab0c55987d1ff('flax fx-guard-loading', {
                                            '--silent': _this.props.disableLoading
                                        }),
                                        children: rl()
                                    })
                                ]
                            }),
                            children: /*#__PURE__*/ $faGca$reactjsxruntime.jsx($99f37795653f9322$var$FxGuardInner, {
                                releaseBusy: function(succeed) {
                                    return _this1.releaseBusy(succeed);
                                },
                                refreshId: _this.state.refreshId,
                                reloadId: _this.state.reloadId,
                                api: _this.props.api,
                                render: _this.props.render,
                                error: _this.props.error,
                                naked: _this.props.naked
                            })
                        })
                    });
                };
                return /*#__PURE__*/ $faGca$reactjsxruntime.jsxs($faGca$reactjsxruntime.Fragment, {
                    children: [
                        this.props.naked && r(),
                        !this.props.naked && /*#__PURE__*/ $faGca$reactjsxruntime.jsx("div", {
                            className: $4b9b03e603b106be$export$ce4ab0c55987d1ff('flax fx-guard', $faGca$swchelpers.defineProperty({
                                '--loading': this.state.busy,
                                '--silent': this.state.silent
                            }, this.state.className || '--noname', !!this.state.className)),
                            children: r()
                        })
                    ]
                });
            }
        }
    ]);
    return $99f37795653f9322$export$c8bd619db52a143b;
}($faGca$react.Component);




$parcel$exportWildcard(module.exports, $791cedb0dad2cc54$exports);
$parcel$exportWildcard(module.exports, $99f37795653f9322$exports);
$parcel$exportWildcard(module.exports, $ee8dff3b62e8c94e$exports);


//# sourceMappingURL=index.browser.js.map
