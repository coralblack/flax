var $b3GGa$reactjsxruntime = require("react/jsx-runtime");
var $b3GGa$react = require("react");
var $b3GGa$reactdom = require("react-dom");
var $b3GGa$axios = require("axios");
var $b3GGa$nodecache = require("node-cache");
var $b3GGa$pcancelable = require("p-cancelable");
var $b3GGa$querystring = require("query-string");

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

$parcel$export(module.exports, "setDefaultHeaders", () => $c00de8795dae1ba1$export$8b68539586e424ba);
$parcel$export(module.exports, "setBaseUrl", () => $c00de8795dae1ba1$export$9c999f676138fa5b);
$parcel$export(module.exports, "setDefaultTransformResponse", () => $c00de8795dae1ba1$export$3e914cea1d334d06);
$parcel$export(module.exports, "request", () => $c00de8795dae1ba1$export$b5fe3f66a567bec0);
var $a692b204eca0c5ab$exports = {};

$parcel$export($a692b204eca0c5ab$exports, "FxButton", () => $a692b204eca0c5ab$export$5bd2698c576da1ad);


var $6a935b8376a2bda8$exports = {};

$parcel$export($6a935b8376a2bda8$exports, "notify", () => $6a935b8376a2bda8$export$5e14cdade93d6f7b);
$parcel$export($6a935b8376a2bda8$exports, "useRequest", () => $6a935b8376a2bda8$export$7fba1a658e28476a);




const $bcad8e25e3e01532$var$fxNotificationContainerId = 'fx-notification-container';
function $bcad8e25e3e01532$export$a30a0cd06ecf3418() {
    const container = document.getElementById($bcad8e25e3e01532$var$fxNotificationContainerId) || (()=>{
        const dom = document.createElement('div');
        dom.id = $bcad8e25e3e01532$var$fxNotificationContainerId;
        dom.classList.add('flax');
        dom.classList.add('fx-notification-container');
        document.body.appendChild(dom);
        return dom;
    })();
    return {
        container: container
    };
}


function $a1f5455ea698e095$export$ce4ab0c55987d1ff(...args) {
    return args.reduce((o, e)=>{
        if (typeof e === 'string' && e) o.push(e);
        else if (Array.isArray(e)) o.push($a1f5455ea698e095$export$ce4ab0c55987d1ff(e));
        else if (e && typeof e === 'object') Object.keys(e).forEach((k)=>{
            if (e[k]) o.push(k);
        });
        return o;
    }, []).join(' ');
}


function $10331fc2e8a12a04$var$Progress(callback, elem, delay) {
    let timerId = setTimeout(callback, delay);
    let remaining = delay;
    let start = new Date().getTime();
    const anim = ()=>{
        const prev = (delay - remaining) / delay * 100;
        if (elem) elem.style.width = String(prev + (new Date().getTime() - start) / remaining * (100 - prev)) + '%';
    };
    let animInterval = setInterval(anim, 5);
    return {
        pause () {
            clearTimeout(timerId);
            clearInterval(animInterval);
            remaining -= new Date().getTime() - start;
        },
        resume () {
            start = new Date().getTime();
            clearTimeout(timerId);
            clearInterval(animInterval);
            timerId = setTimeout(callback, remaining);
            animInterval = setInterval(anim, 5);
        },
        done () {
            clearTimeout(timerId);
            clearInterval(animInterval);
        }
    };
}
function $10331fc2e8a12a04$export$9949bd9c713ba425(props1) {
    const { container: container  } = $bcad8e25e3e01532$export$a30a0cd06ecf3418();
    return {
        container: container,
        alert: (attrs)=>{
            const { delay: delay , ...props } = attrs;
            const wrapper = document.createElement('div');
            wrapper.classList.add('fx-notification-wrapper');
            container.appendChild(wrapper);
            $b3GGa$reactdom.render(/*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($10331fc2e8a12a04$export$9fe22d1de21b5211, {
                ...props
            }), wrapper, ()=>{
                var ref;
                const closeButton = wrapper.getElementsByTagName('button');
                const progressBar = wrapper.getElementsByTagName('span');
                let progress = undefined;
                const cb = ()=>{
                    wrapper.classList.add('--hide');
                    !!progress && progress.done();
                    setTimeout(()=>{
                        ($parcel$interopDefault($b3GGa$reactdom)).unmountComponentAtNode(wrapper);
                        wrapper.remove();
                    }, 450);
                };
                (ref = closeButton[0]) === null || ref === void 0 ? void 0 : ref.addEventListener('click', ()=>{
                    cb();
                });
                progress = $10331fc2e8a12a04$var$Progress(cb, progressBar[0], Math.min(delay || 5000, 5000));
                wrapper.addEventListener('mouseover', ()=>{
                    !!progress && progress.pause();
                });
                wrapper.addEventListener('mouseout', ()=>{
                    !!progress && progress.resume();
                });
            });
        }
    };
}
function $10331fc2e8a12a04$var$Type(type) {
    if (!type || type === 'INFO') return null;
    return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
        children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs("div", {
            className: "--icon",
            children: [
                type === 'SUCC' && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M5 13l4 4L19 7"
                    })
                }),
                type === 'WARN' && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
                    children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        })
                    })
                }),
                type === 'ERROR' && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
                    children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("path", {
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
function $10331fc2e8a12a04$export$9fe22d1de21b5211(props) {
    const { type: type , title: title , message: message  } = props;
    $b3GGa$react.useEffect(()=>{
        // Initialize
        return ()=>{
        // Clear
        };
    });
    return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
        children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs("div", {
            className: $a1f5455ea698e095$export$ce4ab0c55987d1ff('flax fx-notification', `--${(type || 'info').toLocaleLowerCase()}`),
            children: [
                type && $10331fc2e8a12a04$var$Type(type),
                title && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("strong", {
                    children: title
                }),
                message,
                /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("button", {
                    className: "close",
                    children: "Close"
                }),
                /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("div", {
                    className: "progress",
                    children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("span", {})
                })
            ]
        })
    });
}






const $c00de8795dae1ba1$var$cache = new ($parcel$interopDefault($b3GGa$nodecache))({
    maxKeys: -1,
    stdTTL: 3600
});
const $c00de8795dae1ba1$var$resolving = (resolve, reject, props, resp, error)=>{
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
const $c00de8795dae1ba1$var$resolvers = {};
const $c00de8795dae1ba1$var$resolver = (resolver, key, resp, error, startAt, cacheKey)=>{
    if (cacheKey && resolver.props.cacheMaxAge) $c00de8795dae1ba1$var$cache.set(cacheKey, {
        data: resp === null || resp === void 0 ? void 0 : resp.data
    }, resolver.props.cacheMaxAge);
    if (!key) {
        const delay = (resolver.props.delay || 0) - (new Date().getTime() - startAt.getTime());
        setTimeout(()=>{
            $c00de8795dae1ba1$var$resolving(resolver.resolve, resolver.reject, resolver.props, resp, error);
        }, Math.max(delay, 0));
        return;
    }
    const res = $c00de8795dae1ba1$var$resolvers[key].splice(0, $c00de8795dae1ba1$var$resolvers[key].length);
    res.forEach(({ resolve: resolve , reject: reject , props: props  })=>{
        const delay = (props.delay || 0) - (new Date().getTime() - startAt.getTime());
        setTimeout(()=>{
            $c00de8795dae1ba1$var$resolving(resolve, reject, props, resp, error);
        }, Math.max(delay, 0));
    });
};
const $c00de8795dae1ba1$var$dataMapper = (data)=>{
    if (!data) return data;
    if (typeof data === 'bigint') return String(data);
    if (typeof data !== 'object') return data;
    return Object.keys(data).reduce((p, c)=>{
        if (typeof data[c] === 'object' && data[c] !== null) {
            if (data[c].current instanceof HTMLElement) p[c] = data[c].current.value;
            else if (Array.isArray(data[c])) p[c] = data[c].map((e)=>$c00de8795dae1ba1$var$dataMapper(e)
            );
            else p[c] = $c00de8795dae1ba1$var$dataMapper(data[c]);
        } else if (typeof data[c] === 'bigint') p[c] = String(data[c]);
        else p[c] = data[c];
        return p;
    }, {});
};
function $c00de8795dae1ba1$export$8b68539586e424ba(headers) {
    ($parcel$interopDefault($b3GGa$axios)).defaults.headers.common = Object.assign(($parcel$interopDefault($b3GGa$axios)).defaults.headers.common, headers);
}
function $c00de8795dae1ba1$export$9c999f676138fa5b(url) {
    ($parcel$interopDefault($b3GGa$axios)).defaults.baseURL = url;
}
function $c00de8795dae1ba1$export$3e914cea1d334d06(trs) {
    ($parcel$interopDefault($b3GGa$axios)).defaults.transformResponse = trs;
}
function $c00de8795dae1ba1$export$b5fe3f66a567bec0(props) {
    const cp = new ($parcel$interopDefault($b3GGa$pcancelable))((resolve, reject, onCancel)=>{
        const cancel = ()=>{
            cp.cancel();
        };
        const ct = ($parcel$interopDefault($b3GGa$axios)).CancelToken.source();
        const url = ((u, query)=>{
            const qs = ($parcel$interopDefault($b3GGa$querystring)).stringify(query);
            return u + (qs ? (u.includes('?') ? '&' : '?') + qs : '');
        })(props.url, props.query || {});
        const lazyGroup = props.method === 'GET' && props.throttle ? `${props.method} ${url} ${props.delay || 0}` : null;
        const cacheKey = props.method === 'GET' && props.cacheMaxAge && props.cacheMaxAge > 0 ? `${props.method} ${props.url} ${props.cacheMaxAge}` : null;
        const cached = cacheKey && $c00de8795dae1ba1$var$cache.get(cacheKey);
        if (cached) {
            $c00de8795dae1ba1$var$resolver({
                resolve: resolve,
                reject: reject,
                cancelled: false,
                props: props
            }, null, cached, null, new Date(), null);
            return;
        }
        onCancel.shouldReject = false;
        onCancel(()=>{
            if (!lazyGroup || $c00de8795dae1ba1$var$resolvers[lazyGroup].length === 1) ct.cancel();
        });
        setTimeout(()=>{
            if (lazyGroup) {
                $c00de8795dae1ba1$var$resolvers[lazyGroup] = $c00de8795dae1ba1$var$resolvers[lazyGroup] || [];
                $c00de8795dae1ba1$var$resolvers[lazyGroup].push({
                    resolve: resolve,
                    reject: reject,
                    cancel: cancel,
                    props: props
                });
                // Duplicated `GET` request,
                if ($c00de8795dae1ba1$var$resolvers[lazyGroup].length > 1) return;
            }
            const start = new Date();
            ($parcel$interopDefault($b3GGa$axios)).request({
                cancelToken: ct.token,
                method: props.method,
                url: url,
                headers: props.headers,
                responseType: props.responseType,
                data: $c00de8795dae1ba1$var$dataMapper(typeof props.data === 'function' ? props.data() : props.data)
            }).then((resp)=>{
                $c00de8795dae1ba1$var$resolver({
                    resolve: resolve,
                    reject: reject,
                    cancelled: cp.isCanceled,
                    props: props
                }, lazyGroup, resp, null, start, cacheKey);
            }).catch((err)=>{
                $c00de8795dae1ba1$var$resolver({
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


const $6a935b8376a2bda8$export$5e14cdade93d6f7b = (payload, type)=>{
    if (!payload) return;
    if (typeof payload === 'string') payload = {
        message: payload
    };
    if (!payload.message) return;
    payload.type = payload.type || type;
    if (type === 'WARN' || type === 'ERROR') payload.delay = payload.delay || 10000;
    const { alert: notiAlert  } = $10331fc2e8a12a04$export$9949bd9c713ba425({});
    notiAlert(payload);
};
function $6a935b8376a2bda8$export$7fba1a658e28476a(api, props) {
    const [reqId, setReqId] = $b3GGa$react.useState(0);
    const [resp, setResp] = $b3GGa$react.useState({
        busy: false,
        response: undefined,
        errorResponse: undefined
    });
    const { success: success , done: done , error: error  } = props || {};
    const queues = [];
    const requestWrapper = (wrapperParams)=>{
        var ref5;
        if (resp.busy && !(wrapperParams === null || wrapperParams === void 0 ? void 0 : (ref5 = wrapperParams.opts) === null || ref5 === void 0 ? void 0 : ref5.ignoreBusy)) return false;
        setResp({
            busy: true,
            response: undefined,
            errorResponse: undefined
        });
        const reqParams = {
            ...api
        };
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.data) reqParams.data = wrapperParams.data;
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.query) reqParams.query = wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.query;
        if (wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.headers) reqParams.headers = wrapperParams === null || wrapperParams === void 0 ? void 0 : wrapperParams.headers;
        const rp = $c00de8795dae1ba1$export$b5fe3f66a567bec0(reqParams);
        rp.then((res)=>{
            $6a935b8376a2bda8$export$5e14cdade93d6f7b(success && success(res.reduced, res.response), 'SUCC');
            $6a935b8376a2bda8$export$5e14cdade93d6f7b(done && done(res.data, null, res.response), 'INFO');
            setReqId(reqId + 1);
            setResp({
                busy: false,
                response: res.reduced,
                errorResponse: undefined
            });
        }).catch((err)=>{
            var ref, ref1, ref2, ref3, ref4;
            const type = typeof ((ref = err.response) === null || ref === void 0 ? void 0 : ref.status) === 'number' && ((ref1 = err.response) === null || ref1 === void 0 ? void 0 : ref1.status) < 500 ? 'WARN' : 'ERROR';
            $6a935b8376a2bda8$export$5e14cdade93d6f7b(error && error(((ref2 = err.response) === null || ref2 === void 0 ? void 0 : ref2.reduced) || err, err), type);
            $6a935b8376a2bda8$export$5e14cdade93d6f7b(done && done((ref3 = err.response) === null || ref3 === void 0 ? void 0 : ref3.data, err, err.response), type);
            setReqId(reqId + 1);
            setResp({
                busy: false,
                response: (ref4 = err.response) === null || ref4 === void 0 ? void 0 : ref4.reduced,
                errorResponse: undefined
            });
        });
        queues.push(rp);
        return true;
    };
    const cancel = ()=>{
        let rp;
        while(rp = queues.pop())rp.cancel();
    };
    return {
        reqId: reqId,
        request: requestWrapper,
        response: resp,
        cancel: cancel
    };
}



class $a692b204eca0c5ab$export$5bd2698c576da1ad extends $b3GGa$react.Component {
    noti(payload, type) {
        $6a935b8376a2bda8$export$5e14cdade93d6f7b(payload, type);
    }
    handleClick() {
        if (this.state.busy) return;
        this.setState({
            ...this.state,
            busy: true
        });
        const { success: success , error: error , done: done  } = this.props;
        $c00de8795dae1ba1$export$b5fe3f66a567bec0({
            ...this.props.api
        }).then((res)=>{
            this.noti(success && success(res.reduced, res.response), 'SUCC');
            this.noti(done && done(res.data, null, res.response), 'INFO');
            this.setState({
                ...this.state,
                busy: false
            });
        }).catch((err)=>{
            var ref, ref1, ref2, ref3;
            const type = typeof ((ref = err.response) === null || ref === void 0 ? void 0 : ref.status) === 'number' && ((ref1 = err.response) === null || ref1 === void 0 ? void 0 : ref1.status) < 500 ? 'WARN' : 'ERROR';
            this.noti(error && error((ref2 = err.response) === null || ref2 === void 0 ? void 0 : ref2.reduced, err), type);
            this.noti(done && done((ref3 = err.response) === null || ref3 === void 0 ? void 0 : ref3.data, err, err.response), type);
            this.setState({
                ...this.state,
                busy: false
            });
        });
    }
    render() {
        const ButtonTag = `${this.props.tag || 'button'}`;
        return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx(ButtonTag, {
            className: `flax fx-button ${this.state.busy ? '--busy' : ''} ${this.props.className || ''}`,
            onClick: ()=>this.handleClick()
            ,
            disabled: this.state.busy,
            children: this.props.children || this.props.label
        });
    }
    constructor(props){
        super(props);
        this.state = {
            busy: false
        };
    }
}


var $217c3b975c4ab349$exports = {};

$parcel$export($217c3b975c4ab349$exports, "FxGuard", () => $217c3b975c4ab349$export$c8bd619db52a143b);




function $217c3b975c4ab349$var$lazyResponse(result, error) {
    return ()=>({
            status: error ? 'ERROR' : 'SUCCESS',
            result: result,
            error: error
        })
    ;
}
const $217c3b975c4ab349$var$lazy = function(release, p) {
    let status = 'PENDING';
    let error;
    let result;
    p.then((res)=>{
        if (p.isCanceled) return;
        ({ result: result , status: status , error: error  } = $217c3b975c4ab349$var$lazyResponse(res, null)());
        release(true);
    }).catch((err)=>{
        if (p.isCanceled) return;
        ({ result: result , status: status , error: error  } = $217c3b975c4ab349$var$lazyResponse(null, err)());
        release(false);
    });
    return ()=>{
        if (status === 'PENDING') throw p;
        return {
            status: status,
            error: error,
            result: result
        };
    };
};
function $217c3b975c4ab349$var$FxGuardInner(props) {
    const [prepared, setPrepared] = $b3GGa$react.useState();
    const { api: api , refreshId: refreshId , reloadId: reloadId , error: error , naked: naked  } = props;
    const req = ()=>{
        return $c00de8795dae1ba1$export$b5fe3f66a567bec0(Object.assign({
            throttle: api.throttle === false ? false : true,
            refreshId: refreshId
        }, props.api, {
            reducer: undefined,
            errReducer: undefined
        }));
    };
    $b3GGa$react.useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let rp = undefined;
        if (reloadId > 0) {
            rp = req();
            rp.then((res)=>{
                if (rp === null || rp === void 0 ? void 0 : rp.isCanceled) return;
                setPrepared(()=>$217c3b975c4ab349$var$lazyResponse(res, null)
                );
                props.releaseBusy(true);
            }).catch((err)=>{
                if (rp === null || rp === void 0 ? void 0 : rp.isCanceled) return;
                setPrepared(()=>$217c3b975c4ab349$var$lazyResponse(null, err)
                );
                props.releaseBusy(false);
            });
        }
        return ()=>{
            if (rp) rp.cancel();
        };
    }, [
        reloadId
    ]);
    $b3GGa$react.useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let rp = undefined;
        setPrepared(()=>{
            rp = req();
            return $217c3b975c4ab349$var$lazy(props.releaseBusy, rp);
        });
        return ()=>{
            if (rp) rp.cancel();
        };
    }, [
        api.method,
        api.url,
        refreshId
    ]);
    if (!prepared) return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {});
    const resp = prepared();
    if (resp.status === 'ERROR') {
        const rr = ()=>{
            var ref, ref1, ref2, ref3;
            if (!((ref = resp.error) === null || ref === void 0 ? void 0 : (ref1 = ref.response) === null || ref1 === void 0 ? void 0 : ref1.data)) return null;
            return props.api.errReducer ? props.api.errReducer((ref2 = resp.error) === null || ref2 === void 0 ? void 0 : ref2.response.data, resp.error) : (ref3 = resp.error) === null || ref3 === void 0 ? void 0 : ref3.response.data;
        };
        const r = ()=>{
            var ref;
            /*#__PURE__*/ return $b3GGa$reactjsxruntime.jsxs($b3GGa$reactjsxruntime.Fragment, {
                children: [
                    error && error(rr(), resp.error),
                    !error && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs("div", {
                        children: [
                            "Error (",
                            (ref = resp.error) === null || ref === void 0 ? void 0 : ref.message,
                            ")"
                        ]
                    })
                ]
            });
        };
        return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs($b3GGa$reactjsxruntime.Fragment, {
            children: [
                naked && r(),
                !naked && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("div", {
                    className: "flax fx-guard-error",
                    children: r()
                })
            ]
        });
    }
    const rr = ()=>{
        var ref, ref4, ref5;
        if (!((ref = resp.result) === null || ref === void 0 ? void 0 : ref.data)) return null;
        return props.api.reducer ? props.api.reducer((ref4 = resp.result) === null || ref4 === void 0 ? void 0 : ref4.data) : (ref5 = resp.result) === null || ref5 === void 0 ? void 0 : ref5.data;
    };
    return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
        children: props.render(rr(), props.refreshId > 0)
    });
}
class $217c3b975c4ab349$export$c8bd619db52a143b extends $b3GGa$react.Component {
    reload(silent, className) {
        if (this.state.busy) return;
        if (silent) {
            this.setState({
                ...this.state,
                reloadId: this.state.reloadId + 1,
                busy: true,
                silent: true,
                className: className
            });
            return;
        }
        this.setState({
            ...this.state,
            refreshId: this.state.refreshId + 1,
            busy: true,
            silent: false,
            className: undefined
        });
    }
    releaseBusy(succeed) {
        if (this.props.done) this.props.done(succeed);
        this.setState({
            ...this.state,
            busy: false,
            silent: false,
            className: undefined
        });
    }
    render() {
        const r = ()=>{
            const rl = ()=>/*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs($b3GGa$reactjsxruntime.Fragment, {
                    children: [
                        this.props.disableLoading && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
                            children: this.props.render(null, this.state.refreshId > 0)
                        }),
                        this.props.loading && this.props.loading(),
                        !this.props.loading && !this.props.disableLoading && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("div", {
                            className: $a1f5455ea698e095$export$ce4ab0c55987d1ff('flax fx-guard-loader', {
                                '--silent': this.props.disableLoading
                            }),
                            children: "Loading .."
                        })
                    ]
                })
            ;
            return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$reactjsxruntime.Fragment, {
                children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($b3GGa$react.Suspense, {
                    fallback: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs($b3GGa$reactjsxruntime.Fragment, {
                        children: [
                            this.props.naked && rl(),
                            !this.props.naked && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("div", {
                                className: $a1f5455ea698e095$export$ce4ab0c55987d1ff('flax fx-guard-loading', {
                                    '--silent': this.props.disableLoading
                                }),
                                children: rl()
                            })
                        ]
                    }),
                    children: /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx($217c3b975c4ab349$var$FxGuardInner, {
                        releaseBusy: (succeed)=>this.releaseBusy(succeed)
                        ,
                        refreshId: this.state.refreshId,
                        reloadId: this.state.reloadId,
                        api: this.props.api,
                        render: this.props.render,
                        error: this.props.error,
                        naked: this.props.naked
                    })
                })
            });
        };
        return /*#__PURE__*/ $b3GGa$reactjsxruntime.jsxs($b3GGa$reactjsxruntime.Fragment, {
            children: [
                this.props.naked && r(),
                !this.props.naked && /*#__PURE__*/ $b3GGa$reactjsxruntime.jsx("div", {
                    className: $a1f5455ea698e095$export$ce4ab0c55987d1ff('flax fx-guard', {
                        '--loading': this.state.busy,
                        '--silent': this.state.silent,
                        [this.state.className || '--noname']: !!this.state.className
                    }),
                    children: r()
                })
            ]
        });
    }
    constructor(props){
        super(props);
        this.state = {
            refreshId: 0,
            reloadId: 0,
            busy: true,
            silent: false,
            className: undefined
        };
    }
}




$parcel$exportWildcard(module.exports, $a692b204eca0c5ab$exports);
$parcel$exportWildcard(module.exports, $217c3b975c4ab349$exports);
$parcel$exportWildcard(module.exports, $6a935b8376a2bda8$exports);


//# sourceMappingURL=index.js.map
