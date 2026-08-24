function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$2 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$4 = Symbol.for("react.forward_ref"), w$1 = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$2 && a[z$2] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$3 = {};
function E$1(a, b2, e) {
  this.props = a;
  this.context = b2;
  this.refs = D$3;
  this.updater = e || B$2;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b2) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b2, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$1.prototype;
function G$2(a, b2, e) {
  this.props = a;
  this.context = b2;
  this.refs = D$3;
  this.updater = e || B$2;
}
var H$3 = G$2.prototype = new F$1();
H$3.constructor = G$2;
C$2(H$3, E$1.prototype);
H$3.isPureReactComponent = true;
var I$1 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$2 = { current: null }, L$3 = { key: true, ref: true, __self: true, __source: true };
function M$2(a, b2, e) {
  var d, c = {}, k2 = null, h2 = null;
  if (null != b2) for (d in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2) J$1.call(b2, d) && !L$3.hasOwnProperty(d) && (c[d] = b2[d]);
  var g2 = arguments.length - 2;
  if (1 === g2) c.children = e;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g2 = a.defaultProps, g2) void 0 === c[d] && (c[d] = g2[d]);
  return { $$typeof: l$2, type: a, key: k2, ref: h2, props: c, _owner: K$2.current };
}
function N$1(a, b2) {
  return { $$typeof: l$2, type: a.type, key: b2, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$2;
}
function escape(a) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b2[a2];
  });
}
var P$1 = /\/+/g;
function Q$2(a, b2) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b2.toString(36);
}
function R$1(a, b2, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h2 = false;
  if (null === a) h2 = true;
  else switch (k2) {
    case "string":
    case "number":
      h2 = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$2:
        case n$1:
          h2 = true;
      }
  }
  if (h2) return h2 = a, c = c(h2), a = "" === d ? "." + Q$2(h2, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b2, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h2 && h2.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b2.push(c)), 1;
  h2 = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g2 = 0; g2 < a.length; g2++) {
    k2 = a[g2];
    var f2 = d + Q$2(k2, g2);
    h2 += R$1(k2, b2, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g2 = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$2(k2, g2++), h2 += R$1(k2, b2, e, f2, c);
  else if ("object" === k2) throw b2 = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$2(a, b2, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b2.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b2 = a._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b3;
    }, function(b3) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b3;
    });
    -1 === a._status && (a._status = 0, a._result = b2);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$2 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$2 };
function X$3() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$2, forEach: function(a, b2, e) {
  S$2(a, function() {
    b2.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b2 = 0;
  S$2(a, function() {
    b2++;
  });
  return b2;
}, toArray: function(a) {
  return S$2(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$2;
react_production_min.Suspense = w$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$3;
react_production_min.cloneElement = function(a, b2, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$2({}, a.props), c = a.key, k2 = a.ref, h2 = a._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$2.current);
    void 0 !== b2.key && (c = "" + b2.key);
    if (a.type && a.type.defaultProps) var g2 = a.type.defaultProps;
    for (f2 in b2) J$1.call(b2, f2) && !L$3.hasOwnProperty(f2) && (d[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
    d.children = g2;
  }
  return { $$typeof: l$2, type: a.type, key: c, ref: k2, props: d, _owner: h2 };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a) {
  var b2 = M$2.bind(null, a);
  b2.type = a;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$4, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b2) {
  return { $$typeof: x, type: a, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a) {
  var b2 = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b2;
  }
};
react_production_min.unstable_act = X$3;
react_production_min.useCallback = function(a, b2) {
  return U$2.current.useCallback(a, b2);
};
react_production_min.useContext = function(a) {
  return U$2.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$2.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b2) {
  return U$2.current.useEffect(a, b2);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a, b2, e) {
  return U$2.current.useImperativeHandle(a, b2, e);
};
react_production_min.useInsertionEffect = function(a, b2) {
  return U$2.current.useInsertionEffect(a, b2);
};
react_production_min.useLayoutEffect = function(a, b2) {
  return U$2.current.useLayoutEffect(a, b2);
};
react_production_min.useMemo = function(a, b2) {
  return U$2.current.useMemo(a, b2);
};
react_production_min.useReducer = function(a, b2, e) {
  return U$2.current.useReducer(a, b2, e);
};
react_production_min.useRef = function(a) {
  return U$2.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$2.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b2, e) {
  return U$2.current.useSyncExternalStore(a, b2, e);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const We$2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k$2 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q$1(c, a, g2) {
  var b2, d = {}, e = null, h2 = null;
  void 0 !== g2 && (e = "" + g2);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h2 = a.ref);
  for (b2 in a) m$1.call(a, b2) && !p$1.hasOwnProperty(b2) && (d[b2] = a[b2]);
  if (c && c.defaultProps) for (b2 in a = c.defaultProps, a) void 0 === d[b2] && (d[b2] = a[b2]);
  return { $$typeof: k$2, type: c, key: e, ref: h2, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q$1;
reactJsxRuntime_production_min.jsxs = q$1;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a, b2) {
    var c = a.length;
    a.push(b2);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g2(e, b2)) a[d] = b2, a[c] = e, c = d;
      else break a;
    }
  }
  function h2(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b2 = a[0], c = a.pop();
    if (c !== b2) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g2(C2, c)) n2 < e && 0 > g2(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g2(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b2;
  }
  function g2(a, b2) {
    var c = a.sortIndex - b2.sortIndex;
    return 0 !== c ? c : a.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l3 = performance;
    exports$1.unstable_now = function() {
      return l3.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v3 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b2 = h2(t2); null !== b2; ) {
      if (null === b2.callback) k2(t2);
      else if (b2.startTime <= a) k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else break;
      b2 = h2(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
    else {
      var b2 = h2(t2);
      null !== b2 && K2(H2, b2.startTime - a);
    }
  }
  function J2(a, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b2);
      for (v3 = h2(r2); null !== v3 && (!(v3.expirationTime > b2) || a && !M2()); ) {
        var d = v3.callback;
        if ("function" === typeof d) {
          v3.callback = null;
          y2 = v3.priorityLevel;
          var e = d(v3.expirationTime <= b2);
          b2 = exports$1.unstable_now();
          "function" === typeof e ? v3.callback = e : v3 === h2(r2) && k2(r2);
          G2(b2);
        } else k2(r2);
        v3 = h2(r2);
      }
      if (null !== v3) var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v3 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q3 = -1;
  function M2() {
    return exports$1.unstable_now() - Q3 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports$1.unstable_now();
      Q3 = a;
      var b2 = true;
      try {
        b2 = O2(true, a);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b2) {
    L2 = D2(function() {
      a(exports$1.unstable_now());
    }, b2);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports$1.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c = y2;
    y2 = b2;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a, b2) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b2();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_scheduleCallback = function(a, b2, c) {
    var d = exports$1.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b2, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h2(r2) && a === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a) {
    var b2 = y2;
    return function() {
      var c = y2;
      y2 = b2;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca$1 = schedulerExports;
function p(a) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b2 += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da$1 = /* @__PURE__ */ new Set(), ea = {};
function fa$1(a, b2) {
  ha$1(a, b2);
  ha$1(a + "Capture", b2);
}
function ha$1(a, b2) {
  ea[a] = b2;
  for (a = 0; a < b2.length; a++) da$1.add(b2[a]);
}
var ia$1 = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja$1 = Object.prototype.hasOwnProperty, ka$1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la$1 = {}, ma$1 = {};
function oa$1(a) {
  if (ja$1.call(ma$1, a)) return true;
  if (ja$1.call(la$1, a)) return false;
  if (ka$1.test(a)) return ma$1[a] = true;
  la$1[a] = true;
  return false;
}
function pa$1(a, b2, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa$1(a, b2, c, d) {
  if (null === b2 || "undefined" === typeof b2 || pa$1(a, b2, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b2;
    case 4:
      return false === b2;
    case 5:
      return isNaN(b2);
    case 6:
      return isNaN(b2) || 1 > b2;
  }
  return false;
}
function v$3(a, b2, c, d, e, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z$1[a] = new v$3(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b2 = a[0];
  z$1[b2] = new v$3(b2, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z$1[a] = new v$3(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z$1[a] = new v$3(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z$1[a] = new v$3(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z$1[a] = new v$3(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z$1[a] = new v$3(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z$1[a] = new v$3(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z$1[a] = new v$3(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra$1 = /[\-:]([a-z])/g;
function sa$1(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b2 = a.replace(
    ra$1,
    sa$1
  );
  z$1[b2] = new v$3(b2, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b2 = a.replace(ra$1, sa$1);
  z$1[b2] = new v$3(b2, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b2 = a.replace(ra$1, sa$1);
  z$1[b2] = new v$3(b2, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z$1[a] = new v$3(a, 1, false, a.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$3("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z$1[a] = new v$3(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b2, c, d) {
  var e = z$1.hasOwnProperty(b2) ? z$1[b2] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1]) qa$1(b2, c, e, d) && (c = null), d || null === e ? oa$1(b2) && (null === c ? a.removeAttribute(b2) : a.setAttribute(b2, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b2 = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b2) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b2, c) : a.setAttribute(b2, c)));
}
var ua$1 = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va$1 = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za$1 = Symbol.for("react.strict_mode"), Aa$1 = Symbol.for("react.profiler"), Ba$1 = Symbol.for("react.provider"), Ca$1 = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa$1 = Symbol.for("react.suspense_list"), Ga$1 = Symbol.for("react.memo"), Ha$1 = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja$1 = Symbol.iterator;
function Ka$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja$1 && a[Ja$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La$1;
function Ma$1(a) {
  if (void 0 === La$1) try {
    throw Error();
  } catch (c) {
    var b2 = c.stack.trim().match(/\n( *(at )?)/);
    La$1 = b2 && b2[1] || "";
  }
  return "\n" + La$1 + a;
}
var Na$1 = false;
function Oa$1(a, b2) {
  if (!a || Na$1) return "";
  Na$1 = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2) if (b2 = function() {
      throw Error();
    }, Object.defineProperty(b2.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b2, []);
      } catch (l3) {
        var d = l3;
      }
      Reflect.construct(a, [], b2);
    } else {
      try {
        b2.call();
      } catch (l3) {
        d = l3;
      }
      a.call(b2.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l3) {
        d = l3;
      }
      a();
    }
  } catch (l3) {
    if (l3 && d && "string" === typeof l3.stack) {
      for (var e = l3.stack.split("\n"), f2 = d.stack.split("\n"), g2 = e.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e[g2] !== f2[h2]; ) h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e[g2] !== f2[h2]) {
        if (1 !== g2 || 1 !== h2) {
          do
            if (g2--, h2--, 0 > h2 || e[g2] !== f2[h2]) {
              var k2 = "\n" + e[g2].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g2 && 0 <= h2);
        }
        break;
      }
    }
  } finally {
    Na$1 = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma$1(a) : "";
}
function Pa$1(a) {
  switch (a.tag) {
    case 5:
      return Ma$1(a.type);
    case 16:
      return Ma$1("Lazy");
    case 13:
      return Ma$1("Suspense");
    case 19:
      return Ma$1("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa$1(a.type, false), a;
    case 11:
      return a = Oa$1(a.type.render, false), a;
    case 1:
      return a = Oa$1(a.type, true), a;
    default:
      return "";
  }
}
function Qa$1(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa$1:
      return "Profiler";
    case za$1:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa$1:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca$1:
      return (a.displayName || "Context") + ".Consumer";
    case Ba$1:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b2 = a.render;
      a = a.displayName;
      a || (a = b2.displayName || b2.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga$1:
      return b2 = a.displayName || null, null !== b2 ? b2 : Qa$1(a.type) || "Memo";
    case Ha$1:
      b2 = a._payload;
      a = a._init;
      try {
        return Qa$1(a(b2));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b2 = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b2.render, a = a.displayName || a.name || "", b2.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa$1(b2);
    case 8:
      return b2 === za$1 ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2) return b2.displayName || b2.name || null;
      if ("string" === typeof b2) return b2;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b2 = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua$1(a) {
  var b2 = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b2), d = "" + a[b2];
  if (!a.hasOwnProperty(b2) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b2, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b2, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b2];
    } };
  }
}
function Va$1(a) {
  a._valueTracker || (a._valueTracker = Ua$1(a));
}
function Wa$1(a) {
  if (!a) return false;
  var b2 = a._valueTracker;
  if (!b2) return true;
  var c = b2.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b2.setValue(a), true) : false;
}
function Xa$1(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b2) {
    return a.body;
  }
}
function Ya$1(a, b2) {
  var c = b2.checked;
  return A({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za$1(a, b2) {
  var c = null == b2.defaultValue ? "" : b2.defaultValue, d = null != b2.checked ? b2.checked : b2.defaultChecked;
  c = Sa(null != b2.value ? b2.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a, b2) {
  b2 = b2.checked;
  null != b2 && ta(a, "checked", b2, false);
}
function bb(a, b2) {
  ab(a, b2);
  var c = Sa(b2.value), d = b2.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a, b2.type, c) : b2.hasOwnProperty("defaultValue") && cb(a, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a.defaultChecked = !!b2.defaultChecked);
}
function db(a, b2, c) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d = b2.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b2.value && null !== b2.value)) return;
    b2 = "" + a._wrapperState.initialValue;
    c || b2 === a.value || (a.value = b2);
    a.defaultValue = b2;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b2, c) {
  if ("number" !== b2 || Xa$1(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b2, c, d) {
  a = a.options;
  if (b2) {
    b2 = {};
    for (var e = 0; e < c.length; e++) b2["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b2.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b2 = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b2 || a[e].disabled || (b2 = a[e]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a, b2) {
  if (null != b2.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b2, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b2) {
  var c = b2.value;
  if (null == c) {
    c = b2.children;
    b2 = b2.defaultValue;
    if (null != c) {
      if (null != b2) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b2 = c;
    }
    null == b2 && (b2 = "");
    c = b2;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b2) {
  var c = Sa(b2.value), d = Sa(b2.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b2.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b2 = a.textContent;
  b2 === a._wrapperState.initialValue && "" !== b2 && null !== b2 && (a.value = b2);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b2) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b2) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b2, c, d, e);
    });
  } : a;
}(function(a, b2) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b2.firstChild; ) a.appendChild(b2.firstChild);
  }
});
function ob(a, b2) {
  if (b2) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b2;
      return;
    }
  }
  a.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b2) {
    b2 = b2 + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b2] = pb[a];
  });
});
function rb(a, b2, c) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a) && pb[a] ? ("" + b2).trim() : b2 + "px";
}
function sb(a, b2) {
  a = a.style;
  for (var c in b2) if (b2.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b2[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b2) {
  if (b2) {
    if (tb[a] && (null != b2.children || null != b2.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children) throw Error(p(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b2.style && "object" !== typeof b2.style) throw Error(p(62));
  }
}
function vb(a, b2) {
  if (-1 === a.indexOf("-")) return "string" === typeof b2.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b2 = a.stateNode;
    b2 && (b2 = Db(b2), yb(a.stateNode, a.type, b2));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a);
    if (b2) for (a = 0; a < b2.length; a++) Bb(b2[a]);
  }
}
function Gb(a, b2) {
  return a(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a, b2, c) {
  if (Ib) return a(b2, c);
  Ib = true;
  try {
    return Gb(a, b2, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b2) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b2];
  a: switch (b2) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b2, typeof c));
  return c;
}
var Lb = false;
if (ia$1) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b2, c, d, e, f2, g2, h2, k2) {
  var l3 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c, l3);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b2, c, d, e, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b2, c, d, e, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l3 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l3);
  }
}
function Vb(a) {
  var b2 = a, c = a;
  if (a.alternate) for (; b2.return; ) b2 = b2.return;
  else {
    a = b2;
    do
      b2 = a, 0 !== (b2.flags & 4098) && (c = b2.return), a = b2.return;
    while (a);
  }
  return 3 === b2.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b2 = a.memoizedState;
    null === b2 && (a = a.alternate, null !== a && (b2 = a.memoizedState));
    if (null !== b2) return b2.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b2 = a.alternate;
  if (!b2) {
    b2 = Vb(a);
    if (null === b2) throw Error(p(188));
    return b2 !== a ? null : a;
  }
  for (var c = a, d = b2; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b2;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g2 = false, h2 = e.child; h2; ) {
        if (h2 === c) {
          g2 = true;
          c = e;
          d = f2;
          break;
        }
        if (h2 === d) {
          g2 = true;
          d = e;
          c = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c) {
            g2 = true;
            c = f2;
            d = e;
            break;
          }
          if (h2 === d) {
            g2 = true;
            d = f2;
            c = e;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b2;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b2 = $b(a);
    if (null !== b2) return b2;
    a = a.sibling;
  }
  return null;
}
var ac$1 = ca$1.unstable_scheduleCallback, bc$1 = ca$1.unstable_cancelCallback, cc$1 = ca$1.unstable_shouldYield, dc$1 = ca$1.unstable_requestPaint, B$1 = ca$1.unstable_now, ec$1 = ca$1.unstable_getCurrentPriorityLevel, fc$1 = ca$1.unstable_ImmediatePriority, gc$1 = ca$1.unstable_UserBlockingPriority, hc$1 = ca$1.unstable_NormalPriority, ic = ca$1.unstable_LowPriority, jc = ca$1.unstable_IdlePriority, kc = null, lc = null;
function mc$1(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b2) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc$1, pc = Math.log, qc = Math.LN2;
function nc$1(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc$1 = 4194304;
function tc$1(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc$1(a, b2) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g2 = c & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e;
    0 !== h2 ? d = tc$1(h2) : (f2 &= g2, 0 !== f2 && (d = tc$1(f2)));
  } else g2 = c & ~e, 0 !== g2 ? d = tc$1(g2) : 0 !== f2 && (d = tc$1(f2));
  if (0 === d) return 0;
  if (0 !== b2 && b2 !== d && 0 === (b2 & e) && (e = d & -d, f2 = b2 & -b2, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b2;
  0 !== (d & 4) && (d |= c & 16);
  b2 = a.entangledLanes;
  if (0 !== b2) for (a = a.entanglements, b2 &= d; 0 < b2; ) c = 31 - oc(b2), e = 1 << c, d |= a[c], b2 &= ~e;
  return d;
}
function vc(a, b2) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b2) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e[g2];
    if (-1 === k2) {
      if (0 === (h2 & c) || 0 !== (h2 & d)) e[g2] = vc(h2, b2);
    } else k2 <= b2 && (a.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b2 = [], c = 0; 31 > c; c++) b2.push(a);
  return b2;
}
function Ac(a, b2, c) {
  a.pendingLanes |= b2;
  536870912 !== b2 && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b2 = 31 - oc(b2);
  a[b2] = c;
}
function Bc(a, b2) {
  var c = a.pendingLanes & ~b2;
  a.pendingLanes = b2;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b2;
  a.mutableReadLanes &= b2;
  a.entangledLanes &= b2;
  b2 = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b2[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b2) {
  var c = a.entangledLanes |= b2;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b2 | a[d] & b2 && (a[d] |= b2);
    c &= ~e;
  }
}
var C$1 = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec$1, Fc, Gc, Hc, Ic$1, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc$1(a, b2) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc$1(a, b2, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b2, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a;
  a.eventSystemFlags |= d;
  b2 = a.targetContainers;
  null !== e && -1 === b2.indexOf(e) && b2.push(e);
  return a;
}
function Uc(a, b2, c, d, e) {
  switch (b2) {
    case "focusin":
      return Lc = Tc$1(Lc, a, b2, c, d, e), true;
    case "dragenter":
      return Mc = Tc$1(Mc, a, b2, c, d, e), true;
    case "mouseover":
      return Nc = Tc$1(Nc, a, b2, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc$1(Oc.get(f2) || null, a, b2, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc$1(Pc.get(f2) || null, a, b2, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b2 = Wc(a.target);
  if (null !== b2) {
    var c = Vb(b2);
    if (null !== c) {
      if (b2 = c.tag, 13 === b2) {
        if (b2 = Wb(c), null !== b2) {
          a.blockedOn = b2;
          Ic$1(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b2 && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b2 = a.targetContainers; 0 < b2.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b2[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b2 = Cb(c), null !== b2 && Fc(b2), a.blockedOn = c, false;
    b2.shift();
  }
  return true;
}
function Zc(a, b2, c) {
  Xc(a) && c.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b2) {
  a.blockedOn === b2 && (a.blockedOn = null, Jc || (Jc = true, ca$1.unstable_scheduleCallback(ca$1.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b2(b3) {
    return ad(b3, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua$1.ReactCurrentBatchConfig, dd = true;
function ed(a, b2, c, d) {
  var e = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a, b2, c, d);
  } finally {
    C$1 = e, cd.transition = f2;
  }
}
function gd(a, b2, c, d) {
  var e = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a, b2, c, d);
  } finally {
    C$1 = e, cd.transition = f2;
  }
}
function fd(a, b2, c, d) {
  if (dd) {
    var e = Yc(a, b2, c, d);
    if (null === e) hd(a, b2, d, id, c), Sc$1(a, d);
    else if (Uc(e, a, b2, c, d)) d.stopPropagation();
    else if (Sc$1(a, d), b2 & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec$1(f2);
        f2 = Yc(a, b2, c, d);
        null === f2 && hd(a, b2, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b2, d, null, c);
  }
}
var id = null;
function Yc(a, b2, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b2 = Vb(a), null === b2) a = null;
  else if (c = b2.tag, 13 === c) {
    a = Wb(b2);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b2.stateNode.current.memoizedState.isDehydrated) return 3 === b2.tag ? b2.stateNode.containerInfo : null;
    a = null;
  } else b2 !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec$1()) {
        case fc$1:
          return 1;
        case gc$1:
          return 4;
        case hc$1:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b2 = ld, c = b2.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b2[a] === e[a]; a++) ;
  var g2 = c - a;
  for (d = 1; d <= g2 && b2[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b2 = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b2 && (a = 13)) : a = b2;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b2(b3, d, e, f2, g2) {
    this._reactName = b3;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b3 = a[c], this[c] = b3 ? b3(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a) : (a = Od[a]) ? !!b2[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b2 = Md[a.key] || a.key;
    if ("Unidentified" !== b2) return b2;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae$2 = ia$1 && "CompositionEvent" in window, be$2 = null;
ia$1 && "documentMode" in document && (be$2 = document.documentMode);
var ce$1 = ia$1 && "TextEvent" in window && !be$2, de$2 = ia$1 && (!ae$2 || be$2 && 8 < be$2 && 11 >= be$2), ee$2 = String.fromCharCode(32), fe$2 = false;
function ge$1(a, b2) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he$2(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie$2 = false;
function je(a, b2) {
  switch (a) {
    case "compositionend":
      return he$2(b2);
    case "keypress":
      if (32 !== b2.which) return null;
      fe$2 = true;
      return ee$2;
    case "textInput":
      return a = b2.data, a === ee$2 && fe$2 ? null : a;
    default:
      return null;
  }
}
function ke$1(a, b2) {
  if (ie$2) return "compositionend" === a || !ae$2 && ge$1(a, b2) ? (a = nd(), md = ld = kd = null, ie$2 = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length) return b2.char;
        if (b2.which) return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de$2 && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b2 ? !!le$1[a.type] : "textarea" === b2 ? true : false;
}
function ne$1(a, b2, c, d) {
  Eb(d);
  b2 = oe(b2, "onChange");
  0 < b2.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b2 }));
}
var pe$1 = null, qe$1 = null;
function re$1(a) {
  se$2(a, 0);
}
function te$1(a) {
  var b2 = ue$1(a);
  if (Wa$1(b2)) return a;
}
function ve$1(a, b2) {
  if ("change" === a) return b2;
}
var we$1 = false;
if (ia$1) {
  var xe$1;
  if (ia$1) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze.oninput;
    }
    xe$1 = ye$1;
  } else xe$1 = false;
  we$1 = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe$1 && (pe$1.detachEvent("onpropertychange", Be$1), qe$1 = pe$1 = null);
}
function Be$1(a) {
  if ("value" === a.propertyName && te$1(qe$1)) {
    var b2 = [];
    ne$1(b2, qe$1, a, xb(a));
    Jb(re$1, b2);
  }
}
function Ce$2(a, b2, c) {
  "focusin" === a ? (Ae$1(), pe$1 = b2, qe$1 = c, pe$1.attachEvent("onpropertychange", Be$1)) : "focusout" === a && Ae$1();
}
function De$2(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te$1(qe$1);
}
function Ee$2(a, b2) {
  if ("click" === a) return te$1(b2);
}
function Fe$1(a, b2) {
  if ("input" === a || "change" === a) return te$1(b2);
}
function Ge(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var He$2 = "function" === typeof Object.is ? Object.is : Ge;
function Ie$1(a, b2) {
  if (He$2(a, b2)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b2 || null === b2) return false;
  var c = Object.keys(a), d = Object.keys(b2);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja$1.call(b2, e) || !He$2(a[e], b2[e])) return false;
  }
  return true;
}
function Je$1(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b2) {
  var c = Je$1(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b2 && d >= b2) return { node: c, offset: b2 - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je$1(c);
  }
}
function Le$1(a, b2) {
  return a && b2 ? a === b2 ? true : a && 3 === a.nodeType ? false : b2 && 3 === b2.nodeType ? Le$1(a, b2.parentNode) : "contains" in a ? a.contains(b2) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b2) & 16) : false : false;
}
function Me$1() {
  for (var a = window, b2 = Xa$1(); b2 instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b2.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b2.contentWindow;
    else break;
    b2 = Xa$1(a.document);
  }
  return b2;
}
function Ne$1(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b2 || "true" === a.contentEditable);
}
function Oe$1(a) {
  var b2 = Me$1(), c = a.focusedElem, d = a.selectionRange;
  if (b2 !== c && c && c.ownerDocument && Le$1(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne$1(c)) {
      if (b2 = d.start, a = d.end, void 0 === a && (a = b2), "selectionStart" in c) c.selectionStart = b2, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b2 = c.ownerDocument || document) && b2.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g2 = Ke(
          c,
          d
        );
        e && g2 && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g2.node || a.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b2), a.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a.addRange(b2)));
      }
    }
    b2 = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b2.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b2.length; c++) a = b2[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia$1 && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue$1(a, b2, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te$1 || null == Qe || Qe !== Xa$1(d) || (d = Qe, "selectionStart" in d && Ne$1(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se$1 && Ie$1(Se$1, d) || (Se$1 = d, d = oe(Re$1, "onSelect"), 0 < d.length && (b2 = new td("onSelect", "select", null, b2, c), a.push({ event: b2, listeners: d }), b2.target = Qe)));
}
function Ve$2(a, b2) {
  var c = {};
  c[a.toLowerCase()] = b2.toLowerCase();
  c["Webkit" + a] = "webkit" + b2;
  c["Moz" + a] = "moz" + b2;
  return c;
}
var We$1 = { animationend: Ve$2("Animation", "AnimationEnd"), animationiteration: Ve$2("Animation", "AnimationIteration"), animationstart: Ve$2("Animation", "AnimationStart"), transitionend: Ve$2("Transition", "TransitionEnd") }, Xe$1 = {}, Ye$1 = {};
ia$1 && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze$1(a) {
  if (Xe$1[a]) return Xe$1[a];
  if (!We$1[a]) return a;
  var b2 = We$1[a], c;
  for (c in b2) if (b2.hasOwnProperty(c) && c in Ye$1) return Xe$1[a] = b2[c];
  return a;
}
var $e$1 = Ze$1("animationend"), af = Ze$1("animationiteration"), bf = Ze$1("animationstart"), cf = Ze$1("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b2) {
  df.set(a, b2);
  fa$1(b2, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e$1, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha$1("onMouseEnter", ["mouseout", "mouseover"]);
ha$1("onMouseLeave", ["mouseout", "mouseover"]);
ha$1("onPointerEnter", ["pointerout", "pointerover"]);
ha$1("onPointerLeave", ["pointerout", "pointerover"]);
fa$1("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa$1("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa$1("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa$1("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa$1("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa$1("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b2, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b2, void 0, a);
  a.currentTarget = null;
}
function se$2(a, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b2) for (var g2 = d.length - 1; 0 <= g2; g2--) {
        var h2 = d[g2], k2 = h2.instance, l3 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h2, l3);
        f2 = k2;
      }
      else for (g2 = 0; g2 < d.length; g2++) {
        h2 = d[g2];
        k2 = h2.instance;
        l3 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h2, l3);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D$2(a, b2) {
  var c = b2[of];
  void 0 === c && (c = b2[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b2, a, 2, false), c.add(d));
}
function qf(a, b2, c) {
  var d = 0;
  b2 && (d |= 4);
  pf(c, a, d, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da$1.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a), qf(b3, true, a));
    });
    var b2 = 9 === a.nodeType ? a : a.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a, b2, c, d) {
  switch (jd(b2)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b2, c, a);
  e = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e = true);
  d ? void 0 !== e ? a.addEventListener(b2, c, { capture: true, passive: e }) : a.addEventListener(b2, c, true) : void 0 !== e ? a.addEventListener(b2, c, { passive: e }) : a.addEventListener(b2, c, false);
}
function hd(a, b2, c, d, e) {
  var f2 = d;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g2 = d.tag;
    if (3 === g2 || 4 === g2) {
      var h2 = d.stateNode.containerInfo;
      if (h2 === e || 8 === h2.nodeType && h2.parentNode === e) break;
      if (4 === g2) for (g2 = d.return; null !== g2; ) {
        var k2 = g2.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g2.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g2 = g2.return;
      }
      for (; null !== h2; ) {
        g2 = Wc(h2);
        if (null === g2) return;
        k2 = g2.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g2;
          continue a;
        }
        h2 = h2.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g3 = [];
    a: {
      var h3 = df.get(a);
      if (void 0 !== h3) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e$1:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c, e2), g3.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h3 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h3) {
          h3 = e2.window === e2 ? e2 : (h3 = e2.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue$1(k3);
            u2 = null == n2 ? h3 : ue$1(n2);
            h3 = new t2(F2, w2 + "leave", k3, c, e2);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g3, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d2 ? ue$1(d2) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve$1;
        else if (me(h3)) if (we$1) na = Fe$1;
        else {
          na = De$2;
          var xa = Ce$2;
        }
        else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee$2);
        if (na && (na = na(a, d2))) {
          ne$1(g3, na, c, e2);
          break a;
        }
        xa && xa(a, h3, d2);
        "focusout" === a && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d2 ? ue$1(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re$1 = d2, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue$1(g3, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue$1(g3, c, e2);
      }
      var $a2;
      if (ae$2) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie$2 ? ge$1(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de$2 && "ko" !== c.locale && (ie$2 || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie$2 && ($a2 = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie$2 = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g3.push({ event: ba, listeners: xa }), $a2 ? ba.data = $a2 : ($a2 = he$2(c), null !== $a2 && (ba.data = $a2))));
      if ($a2 = ce$1 ? je(a, c) : ke$1(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g3.push({ event: e2, listeners: d2 }), e2.data = $a2);
    }
    se$2(g3, b2);
  });
}
function tf(a, b2, c) {
  return { instance: a, listener: b2, currentTarget: c };
}
function oe(a, b2) {
  for (var c = b2 + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b2), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b2, c, d, e) {
  for (var f2 = b2._reactName, g2 = []; null !== c && c !== d; ) {
    var h2 = c, k2 = h2.alternate, l3 = h2.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h2.tag && null !== l3 && (h2 = l3, e ? (k2 = Kb(c, f2), null != k2 && g2.unshift(tf(c, k2, h2))) : e || (k2 = Kb(c, f2), null != k2 && g2.push(tf(c, k2, h2))));
    c = c.return;
  }
  0 !== g2.length && a.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b2, c) {
  b2 = zf(b2);
  if (zf(a) !== b2 && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b2) {
  return "textarea" === a || "noscript" === a || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b2) {
  var c = b2, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b2);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b2);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b2 = a.nodeType;
    if (1 === b2 || 3 === b2) break;
    if (8 === b2) {
      b2 = a.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2) break;
      if ("/$" === b2) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b2 = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b2) return a;
        b2--;
      } else "/$" === c && b2++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b2 = a[Of];
  if (b2) return b2;
  for (var c = a.parentNode; c; ) {
    if (b2 = c[uf] || c[Of]) {
      c = b2.alternate;
      if (null !== b2.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b2;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue$1(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a, b2) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b2;
}
var Vf = {}, H$2 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b2) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b2) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b2[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b2, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H$2);
}
function ag(a, b2, c) {
  if (H$2.current !== Vf) throw Error(p(168));
  G$1(H$2, b2);
  G$1(Wf, c);
}
function bg(a, b2, c) {
  var d = a.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b2)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$2.current;
  G$1(H$2, a);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a, b2, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b2, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H$2), G$1(H$2, a)) : E(Wf);
  G$1(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b2 = C$1;
    try {
      var c = eg;
      for (C$1 = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac$1(fc$1, jg), e;
    } finally {
      C$1 = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b2;
}
function ug(a, b2, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b2) + e;
  if (30 < f2) {
    var g2 = e - e % 5;
    f2 = (d & (1 << g2) - 1).toString(32);
    d >>= g2;
    e -= g2;
    rg = 1 << 32 - oc(b2) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b2) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b2;
  c.return = a;
  b2 = a.deletions;
  null === b2 ? (a.deletions = [c], a.flags |= 16) : b2.push(c);
}
function Cg(a, b2) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b2 = 1 !== b2.nodeType || c.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a.stateNode = b2, xg = a, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a.stateNode = b2, xg = a, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b2, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b2, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b2 = yg;
    if (b2) {
      var c = b2;
      if (!Cg(a, b2)) {
        if (Dg(a)) throw Error(p(418));
        b2 = Lf(c.nextSibling);
        var d = xg;
        b2 && Cg(a, b2) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b2;
  (b2 = 3 !== a.tag) && !(b2 = 5 !== a.tag) && (b2 = a.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a.type, a.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b2; ) Ag(a, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b2 = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b2) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b2--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b2++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua$1.ReactCurrentBatchConfig;
function Lg(a, b2, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2) return b2.ref;
      b2 = function(a2) {
        var b3 = e.refs;
        null === a2 ? delete b3[f2] : b3[f2] = a2;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b2) {
  a = Object.prototype.toString.call(b2);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a));
}
function Ng(a) {
  var b2 = a._init;
  return b2(a._payload);
}
function Og(a) {
  function b2(b3, c2) {
    if (a) {
      var d2 = b3.deletions;
      null === d2 ? (b3.deletions = [c2], b3.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b2(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b3) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b3; ) null !== b3.key ? a2.set(b3.key, b3) : a2.set(b3.index, b3), b3 = b3.sibling;
    return a2;
  }
  function e(a2, b3) {
    a2 = Pg(a2, b3);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b3, c2, d2) {
    b3.index = d2;
    if (!a) return b3.flags |= 1048576, c2;
    d2 = b3.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b3.flags |= 2, c2) : d2;
    b3.flags |= 2;
    return c2;
  }
  function g2(b3) {
    a && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a2, b3, c2, d2) {
    if (null === b3 || 6 !== b3.tag) return b3 = Qg(c2, a2.mode, d2), b3.return = a2, b3;
    b3 = e(b3, c2);
    b3.return = a2;
    return b3;
  }
  function k2(a2, b3, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b3, c2.props.children, d2, c2.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha$1 && Ng(f3) === b3.type)) return d2 = e(b3, c2.props), d2.ref = Lg(a2, b3, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b3, c2);
    d2.return = a2;
    return d2;
  }
  function l3(a2, b3, c2, d2) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c2.containerInfo || b3.stateNode.implementation !== c2.implementation) return b3 = Sg(c2, a2.mode, d2), b3.return = a2, b3;
    b3 = e(b3, c2.children || []);
    b3.return = a2;
    return b3;
  }
  function m2(a2, b3, c2, d2, f3) {
    if (null === b3 || 7 !== b3.tag) return b3 = Tg(c2, a2.mode, d2, f3), b3.return = a2, b3;
    b3 = e(b3, c2);
    b3.return = a2;
    return b3;
  }
  function q2(a2, b3, c2) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3) return b3 = Qg("" + b3, a2.mode, c2), b3.return = a2, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va$1:
          return c2 = Rg(b3.type, b3.key, b3.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b3), c2.return = a2, c2;
        case wa:
          return b3 = Sg(b3, a2.mode, c2), b3.return = a2, b3;
        case Ha$1:
          var d2 = b3._init;
          return q2(a2, d2(b3._payload), c2);
      }
      if (eb(b3) || Ka$1(b3)) return b3 = Tg(b3, a2.mode, c2, null), b3.return = a2, b3;
      Mg(a2, b3);
    }
    return null;
  }
  function r2(a2, b3, c2, d2) {
    var e2 = null !== b3 ? b3.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h2(a2, b3, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va$1:
          return c2.key === e2 ? k2(a2, b3, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l3(a2, b3, c2, d2) : null;
        case Ha$1:
          return e2 = c2._init, r2(
            a2,
            b3,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka$1(c2)) return null !== e2 ? null : m2(a2, b3, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b3, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h2(b3, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va$1:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b3, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l3(b3, a2, d2, e2);
        case Ha$1:
          var f3 = d2._init;
          return y2(a2, b3, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka$1(d2)) return a2 = a2.get(c2) || null, m2(b3, a2, d2, e2, null);
      Mg(b3, d2);
    }
    return null;
  }
  function n2(e2, g3, h3, k3) {
    for (var l4 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b2(e2, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l4 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length) return c(e2, u2), I && tg(e2, w2), l4;
    if (null === u2) {
      for (; w2 < h3.length; w2++) u2 = q2(e2, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l4 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l4;
    }
    for (u2 = d(e2, u2); w2 < h3.length; w2++) x2 = y2(u2, e2, w2, h3[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l4 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b2(e2, a2);
    });
    I && tg(e2, w2);
    return l4;
  }
  function t2(e2, g3, h3, k3) {
    var l4 = Ka$1(h3);
    if ("function" !== typeof l4) throw Error(p(150));
    h3 = l4.call(h3);
    if (null == h3) throw Error(p(151));
    for (var u2 = l4 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b2(e2, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l4 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l4;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l4 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l4;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l4 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b2(e2, a2);
    });
    I && tg(e2, w2);
    return l4;
  }
  function J2(a2, d2, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va$1:
          a: {
            for (var k3 = f3.key, l4 = d2; null !== l4; ) {
              if (l4.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l4.tag) {
                    c(a2, l4.sibling);
                    d2 = e(l4, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l4.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha$1 && Ng(k3) === l4.type) {
                  c(a2, l4.sibling);
                  d2 = e(l4, f3.props);
                  d2.ref = Lg(a2, l4, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l4);
                break;
              } else b2(a2, l4);
              l4 = l4.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h3, f3.key), d2.return = a2, a2 = d2) : (h3 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = Lg(a2, d2, f3), h3.return = a2, a2 = h3);
          }
          return g2(a2);
        case wa:
          a: {
            for (l4 = f3.key; null !== d2; ) {
              if (d2.key === l4) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b2(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h3);
            d2.return = a2;
            a2 = d2;
          }
          return g2(a2);
        case Ha$1:
          return l4 = f3._init, J2(a2, d2, l4(f3._payload), h3);
      }
      if (eb(f3)) return n2(a2, d2, f3, h3);
      if (Ka$1(f3)) return t2(a2, d2, f3, h3);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h3), d2.return = a2, a2 = d2), g2(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b2 = Wg.current;
  E(Wg);
  a._currentValue = b2;
}
function bh(a, b2, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b2) !== b2 ? (a.childLanes |= b2, null !== d && (d.childLanes |= b2)) : null !== d && (d.childLanes & b2) !== b2 && (d.childLanes |= b2);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b2) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b2) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b2 = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b2, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b2;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b2, c, d) {
  var e = b2.interleaved;
  null === e ? (c.next = c, gh(b2)) : (c.next = e.next, e.next = c);
  b2.interleaved = c;
  return ih(a, d);
}
function ih(a, b2) {
  a.lanes |= b2;
  var c = a.alternate;
  null !== c && (c.lanes |= b2);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b2, c = a.alternate, null !== c && (c.childLanes |= b2), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b2) {
  a = a.updateQueue;
  b2.updateQueue === a && (b2.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b2) {
  return { eventTime: a, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b2, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K$1 & 2)) {
    var e = d.pending;
    null === e ? b2.next = b2 : (b2.next = e.next, e.next = b2);
    d.pending = b2;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b2.next = b2, gh(d)) : (b2.next = e.next, e.next = b2);
  d.interleaved = b2;
  return ih(a, c);
}
function oh(a, b2, c) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c & 4194240))) {
    var d = b2.lanes;
    d &= a.pendingLanes;
    c |= d;
    b2.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b2) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g2 = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g2 : f2 = f2.next = g2;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b2 : f2 = f2.next = b2;
    } else e = f2 = b2;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b2 : a.next = b2;
  c.lastBaseUpdate = b2;
}
function qh(a, b2, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g2 = e.lastBaseUpdate, h2 = e.shared.pending;
  if (null !== h2) {
    e.shared.pending = null;
    var k2 = h2, l3 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l3 : g2.next = l3;
    g2 = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l3 : h2.next = l3, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g2 = 0;
    m2 = l3 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h2;
          r2 = b2;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h2] : r2.push(h2));
      } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l3 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2) if (h2 = e.shared.pending, null === h2) break;
      else r2 = h2, h2 = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l3;
    e.lastBaseUpdate = m2;
    b2 = e.shared.interleaved;
    if (null !== b2) {
      e = b2;
      do
        g2 |= e.lane, e = e.next;
      while (e !== b2);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g2;
    a.lanes = g2;
    a.memoizedState = q2;
  }
}
function sh(a, b2, c) {
  a = b2.effects;
  b2.effects = null;
  if (null !== a) for (b2 = 0; b2 < a.length; b2++) {
    var d = a[b2], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b2) {
  G$1(wh, b2);
  G$1(vh, a);
  G$1(uh, th);
  a = b2.nodeType;
  switch (a) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b2.parentNode : b2, b2 = a.namespaceURI || null, a = a.tagName, b2 = lb(b2, a);
  }
  E(uh);
  G$1(uh, b2);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b2 = xh(uh.current);
  var c = lb(b2, a.type);
  b2 !== c && (G$1(vh, a), G$1(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L$2 = Uf(0);
function Ch(a) {
  for (var b2 = a; null !== b2; ) {
    if (13 === b2.tag) {
      var c = b2.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128)) return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a) break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a) return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua$1.ReactCurrentDispatcher, Gh = ua$1.ReactCurrentBatchConfig, Hh = 0, M$1 = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b2) {
  if (null === b2) return false;
  for (var c = 0; c < b2.length && c < a.length; c++) if (!He$2(a[c], b2[c])) return false;
  return true;
}
function Nh(a, b2, c, d, e, f2) {
  Hh = f2;
  M$1 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b2.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b2 = null !== N && null !== N.next;
  Hh = 0;
  O = N = M$1 = null;
  Ih = false;
  if (b2) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M$1.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M$1.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b2 = null === O ? M$1.memoizedState : O.next;
  if (null !== b2) O = b2, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M$1.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b2) {
  return "function" === typeof b2 ? b2(a) : b2;
}
function Wh(a) {
  var b2 = Uh(), c = b2.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g2 = e.next;
      e.next = f2.next;
      f2.next = g2;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h2 = g2 = null, k2 = null, l3 = f2;
    do {
      var m2 = l3.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l3.action, hasEagerState: l3.hasEagerState, eagerState: l3.eagerState, next: null }), d = l3.hasEagerState ? l3.eagerState : a(d, l3.action);
      else {
        var q2 = {
          lane: m2,
          action: l3.action,
          hasEagerState: l3.hasEagerState,
          eagerState: l3.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d) : k2 = k2.next = q2;
        M$1.lanes |= m2;
        rh |= m2;
      }
      l3 = l3.next;
    } while (null !== l3 && l3 !== f2);
    null === k2 ? g2 = d : k2.next = h2;
    He$2(d, b2.memoizedState) || (dh = true);
    b2.memoizedState = d;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M$1.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b2.memoizedState, c.dispatch];
}
function Xh(a) {
  var b2 = Uh(), c = b2.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b2.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g2 = e = e.next;
    do
      f2 = a(f2, g2.action), g2 = g2.next;
    while (g2 !== e);
    He$2(f2, b2.memoizedState) || (dh = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b2) {
  var c = M$1, d = Uh(), e = b2(), f2 = !He$2(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai$1.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b2 || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi$1(9, ci$1.bind(null, c, d, e, b2), void 0, null);
    if (null === Q$1) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b2, e);
  }
  return e;
}
function di(a, b2, c) {
  a.flags |= 16384;
  a = { getSnapshot: b2, value: c };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.stores = [a]) : (c = b2.stores, null === c ? b2.stores = [a] : c.push(a));
}
function ci$1(a, b2, c, d) {
  b2.value = c;
  b2.getSnapshot = d;
  ei$1(b2) && fi(a);
}
function ai$1(a, b2, c) {
  return c(function() {
    ei$1(b2) && fi(a);
  });
}
function ei$1(a) {
  var b2 = a.getSnapshot;
  a = a.value;
  try {
    var c = b2();
    return !He$2(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b2 = ih(a, 1);
  null !== b2 && gi$1(b2, a, 1, -1);
}
function hi$1(a) {
  var b2 = Th();
  "function" === typeof a && (a = a());
  b2.memoizedState = b2.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b2.queue = a;
  a = a.dispatch = ii$1.bind(null, M$1, a);
  return [b2.memoizedState, a];
}
function bi$1(a, b2, c, d) {
  a = { tag: a, create: b2, destroy: c, deps: d, next: null };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.lastEffect = a.next = a) : (c = b2.lastEffect, null === c ? b2.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b2.lastEffect = a));
  return a;
}
function ji$1() {
  return Uh().memoizedState;
}
function ki$1(a, b2, c, d) {
  var e = Th();
  M$1.flags |= a;
  e.memoizedState = bi$1(1 | b2, c, void 0, void 0 === d ? null : d);
}
function li$1(a, b2, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g2 = N.memoizedState;
    f2 = g2.destroy;
    if (null !== d && Mh(d, g2.deps)) {
      e.memoizedState = bi$1(b2, c, f2, d);
      return;
    }
  }
  M$1.flags |= a;
  e.memoizedState = bi$1(1 | b2, c, f2, d);
}
function mi$1(a, b2) {
  return ki$1(8390656, 8, a, b2);
}
function $h(a, b2) {
  return li$1(2048, 8, a, b2);
}
function ni$1(a, b2) {
  return li$1(4, 2, a, b2);
}
function oi$1(a, b2) {
  return li$1(4, 4, a, b2);
}
function pi(a, b2) {
  if ("function" === typeof b2) return a = a(), b2(a), function() {
    b2(null);
  };
  if (null !== b2 && void 0 !== b2) return a = a(), b2.current = a, function() {
    b2.current = null;
  };
}
function qi$1(a, b2, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li$1(4, 4, pi.bind(null, b2, a), c);
}
function ri$1() {
}
function si$1(a, b2) {
  var c = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d = c.memoizedState;
  if (null !== d && null !== b2 && Mh(b2, d[1])) return d[0];
  c.memoizedState = [a, b2];
  return a;
}
function ti$1(a, b2) {
  var c = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d = c.memoizedState;
  if (null !== d && null !== b2 && Mh(b2, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b2];
  return a;
}
function ui$1(a, b2, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He$2(c, b2) || (c = yc(), M$1.lanes |= c, rh |= c, a.baseState = true);
  return b2;
}
function vi$1(a, b2) {
  var c = C$1;
  C$1 = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b2();
  } finally {
    C$1 = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi$1(a, b2, c) {
  var d = yi$1(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi$1(a)) Ai$1(b2, c);
  else if (c = hh(a, b2, c, d), null !== c) {
    var e = R();
    gi$1(c, a, d, e);
    Bi$1(c, b2, d);
  }
}
function ii$1(a, b2, c) {
  var d = yi$1(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi$1(a)) Ai$1(b2, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2)) try {
      var g2 = b2.lastRenderedState, h2 = f2(g2, c);
      e.hasEagerState = true;
      e.eagerState = h2;
      if (He$2(h2, g2)) {
        var k2 = b2.interleaved;
        null === k2 ? (e.next = e, gh(b2)) : (e.next = k2.next, k2.next = e);
        b2.interleaved = e;
        return;
      }
    } catch (l3) {
    } finally {
    }
    c = hh(a, b2, e, d);
    null !== c && (e = R(), gi$1(c, a, d, e), Bi$1(c, b2, d));
  }
}
function zi$1(a) {
  var b2 = a.alternate;
  return a === M$1 || null !== b2 && b2 === M$1;
}
function Ai$1(a, b2) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b2.next = b2 : (b2.next = c.next, c.next = b2);
  a.pending = b2;
}
function Bi$1(a, b2, c) {
  if (0 !== (c & 4194240)) {
    var d = b2.lanes;
    d &= a.pendingLanes;
    c |= d;
    b2.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b2) {
  Th().memoizedState = [a, void 0 === b2 ? null : b2];
  return a;
}, useContext: eh, useEffect: mi$1, useImperativeHandle: function(a, b2, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki$1(
    4194308,
    4,
    pi.bind(null, b2, a),
    c
  );
}, useLayoutEffect: function(a, b2) {
  return ki$1(4194308, 4, a, b2);
}, useInsertionEffect: function(a, b2) {
  return ki$1(4, 2, a, b2);
}, useMemo: function(a, b2) {
  var c = Th();
  b2 = void 0 === b2 ? null : b2;
  a = a();
  c.memoizedState = [a, b2];
  return a;
}, useReducer: function(a, b2, c) {
  var d = Th();
  b2 = void 0 !== c ? c(b2) : b2;
  d.memoizedState = d.baseState = b2;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b2 };
  d.queue = a;
  a = a.dispatch = xi$1.bind(null, M$1, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b2 = Th();
  a = { current: a };
  return b2.memoizedState = a;
}, useState: hi$1, useDebugValue: ri$1, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi$1(false), b2 = a[0];
  a = vi$1.bind(null, a[1]);
  Th().memoizedState = a;
  return [b2, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b2, c) {
  var d = M$1, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b2();
    if (null === Q$1) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b2, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b2 };
  e.queue = f2;
  mi$1(ai$1.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi$1(9, ci$1.bind(null, d, f2, c, b2), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b2 = Q$1.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b2 = ":" + b2 + "R" + c;
    c = Kh++;
    0 < c && (b2 += "H" + c.toString(32));
    b2 += ":";
  } else c = Lh++, b2 = ":" + b2 + "r" + c.toString(32) + ":";
  return a.memoizedState = b2;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si$1,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi$1,
  useInsertionEffect: ni$1,
  useLayoutEffect: oi$1,
  useMemo: ti$1,
  useReducer: Wh,
  useRef: ji$1,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri$1,
  useDeferredValue: function(a) {
    var b2 = Uh();
    return ui$1(b2, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b2 = Uh().memoizedState;
    return [a, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si$1, useContext: eh, useEffect: $h, useImperativeHandle: qi$1, useInsertionEffect: ni$1, useLayoutEffect: oi$1, useMemo: ti$1, useReducer: Xh, useRef: ji$1, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri$1, useDeferredValue: function(a) {
  var b2 = Uh();
  return null === N ? b2.memoizedState = a : ui$1(b2, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b2 = Uh().memoizedState;
  return [a, b2];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci$1(a, b2) {
  if (a && a.defaultProps) {
    b2 = A({}, b2);
    a = a.defaultProps;
    for (var c in a) void 0 === b2[c] && (b2[c] = a[c]);
    return b2;
  }
  return b2;
}
function Di$1(a, b2, c, d) {
  b2 = a.memoizedState;
  c = c(d, b2);
  c = null === c || void 0 === c ? b2 : A({}, b2, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei$1 = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b2, c) {
  a = a._reactInternals;
  var d = R(), e = yi$1(a), f2 = mh(d, e);
  f2.payload = b2;
  void 0 !== c && null !== c && (f2.callback = c);
  b2 = nh(a, f2, e);
  null !== b2 && (gi$1(b2, a, e, d), oh(b2, a, e));
}, enqueueReplaceState: function(a, b2, c) {
  a = a._reactInternals;
  var d = R(), e = yi$1(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c && null !== c && (f2.callback = c);
  b2 = nh(a, f2, e);
  null !== b2 && (gi$1(b2, a, e, d), oh(b2, a, e));
}, enqueueForceUpdate: function(a, b2) {
  a = a._reactInternals;
  var c = R(), d = yi$1(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b2 && null !== b2 && (e.callback = b2);
  b2 = nh(a, e, d);
  null !== b2 && (gi$1(b2, a, d, c), oh(b2, a, d));
} };
function Fi$1(a, b2, c, d, e, f2, g2) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie$1(c, d) || !Ie$1(e, f2) : true;
}
function Gi(a, b2, c) {
  var d = false, e = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b2) ? Xf : H$2.current, d = b2.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b2 = new b2(c, f2);
  a.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = Ei$1;
  a.stateNode = b2;
  b2._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function Hi$1(a, b2, c, d) {
  a = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c, d);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c, d);
  b2.state !== a && Ei$1.enqueueReplaceState(b2, b2.state, null);
}
function Ii$1(a, b2, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b2) ? Xf : H$2.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (Di$1(a, b2, f2, c), e.state = a.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b2 = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b2 !== e.state && Ei$1.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji$1(a, b2) {
  try {
    var c = "", d = b2;
    do
      c += Pa$1(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b2, stack: e, digest: null };
}
function Ki$1(a, b2, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b2 ? b2 : null };
}
function Li$1(a, b2) {
  try {
    console.error(b2.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi$1 = "function" === typeof WeakMap ? WeakMap : Map;
function Ni$1(a, b2, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b2.value;
  c.callback = function() {
    Oi$1 || (Oi$1 = true, Pi$1 = d);
    Li$1(a, b2);
  };
  return c;
}
function Qi(a, b2, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b2.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li$1(a, b2);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li$1(a, b2);
    "function" !== typeof d && (null === Ri$1 ? Ri$1 = /* @__PURE__ */ new Set([this]) : Ri$1.add(this));
    var c2 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si$1(a, b2, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi$1();
    var e = /* @__PURE__ */ new Set();
    d.set(b2, e);
  } else e = d.get(b2), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b2, e));
  e.has(c) || (e.add(c), a = Ti$1.bind(null, a, b2, c), b2.then(a, a));
}
function Ui$1(a) {
  do {
    var b2;
    if (b2 = 13 === a.tag) b2 = a.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi$1(a, b2, c, d, e) {
  if (0 === (a.mode & 1)) return a === b2 ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c, b2, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi$1 = ua$1.ReactCurrentOwner, dh = false;
function Xi$1(a, b2, c, d) {
  b2.child = null === a ? Vg(b2, null, c, d) : Ug(b2, a.child, c, d);
}
function Yi$1(a, b2, c, d, e) {
  c = c.render;
  var f2 = b2.ref;
  ch(b2, e);
  d = Nh(a, b2, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e, Zi$1(a, b2, e);
  I && c && vg(b2);
  b2.flags |= 1;
  Xi$1(a, b2, d, e);
  return b2.child;
}
function $i$1(a, b2, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b2.tag = 15, b2.type = f2, bj(a, b2, f2, d, e);
    a = Rg(c.type, null, d, b2, b2.mode, e);
    a.ref = b2.ref;
    a.return = b2;
    return b2.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g2 = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie$1;
    if (c(g2, d) && a.ref === b2.ref) return Zi$1(a, b2, e);
  }
  b2.flags |= 1;
  a = Pg(f2, d);
  a.ref = b2.ref;
  a.return = b2;
  return b2.child = a;
}
function bj(a, b2, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie$1(f2, d) && a.ref === b2.ref) if (dh = false, b2.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b2.lanes = a.lanes, Zi$1(a, b2, e);
  }
  return cj(a, b2, c, d, e);
}
function dj(a, b2, c) {
  var d = b2.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b2.mode & 1)) b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b2.updateQueue = null, G$1(ej, fj), fj |= a, null;
    b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G$1(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b2.memoizedState = null) : d = c, G$1(ej, fj), fj |= d;
  Xi$1(a, b2, e, c);
  return b2.child;
}
function gj(a, b2) {
  var c = b2.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b2.flags |= 512, b2.flags |= 2097152;
}
function cj(a, b2, c, d, e) {
  var f2 = Zf(c) ? Xf : H$2.current;
  f2 = Yf(b2, f2);
  ch(b2, e);
  c = Nh(a, b2, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e, Zi$1(a, b2, e);
  I && d && vg(b2);
  b2.flags |= 1;
  Xi$1(a, b2, c, e);
  return b2.child;
}
function hj(a, b2, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b2);
  } else f2 = false;
  ch(b2, e);
  if (null === b2.stateNode) ij(a, b2), Gi(b2, c, d), Ii$1(b2, c, d, e), d = true;
  else if (null === a) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l3 = c.contextType;
    "object" === typeof l3 && null !== l3 ? l3 = eh(l3) : (l3 = Zf(c) ? Xf : H$2.current, l3 = Yf(b2, l3));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d || k2 !== l3) && Hi$1(b2, g2, d, l3);
    jh = false;
    var r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d, g2, e);
    k2 = b2.memoizedState;
    h2 !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di$1(b2, c, m2, d), k2 = b2.memoizedState), (h2 = jh || Fi$1(b2, c, h2, d, r2, k2, l3)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d, b2.memoizedState = k2), g2.props = d, g2.state = k2, g2.context = l3, d = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d = false);
  } else {
    g2 = b2.stateNode;
    lh(a, b2);
    h2 = b2.memoizedProps;
    l3 = b2.type === b2.elementType ? h2 : Ci$1(b2.type, h2);
    g2.props = l3;
    q2 = b2.pendingProps;
    r2 = g2.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H$2.current, k2 = Yf(b2, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi$1(b2, g2, d, k2);
    jh = false;
    r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d, g2, e);
    var n2 = b2.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di$1(b2, c, y2, d), n2 = b2.memoizedState), (l3 = jh || Fi$1(b2, c, l3, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d, b2.memoizedState = n2), g2.props = d, g2.state = n2, g2.context = k2, d = l3) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), d = false);
  }
  return jj(a, b2, c, d, f2, e);
}
function jj(a, b2, c, d, e, f2) {
  gj(a, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d && !g2) return e && dg(b2, c, false), Zi$1(a, b2, f2);
  d = b2.stateNode;
  Wi$1.current = b2;
  var h2 = g2 && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b2.flags |= 1;
  null !== a && g2 ? (b2.child = Ug(b2, a.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi$1(a, b2, h2, f2);
  b2.memoizedState = d.state;
  e && dg(b2, c, true);
  return b2.child;
}
function kj(a) {
  var b2 = a.stateNode;
  b2.pendingContext ? ag(a, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a, b2.context, false);
  yh(a, b2.containerInfo);
}
function lj(a, b2, c, d, e) {
  Ig();
  Jg(e);
  b2.flags |= 256;
  Xi$1(a, b2, c, d);
  return b2.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b2, c) {
  var d = b2.pendingProps, e = L$2.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h2) f2 = true, b2.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G$1(L$2, e & 1);
  if (null === a) {
    Eg(b2);
    a = b2.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d.children;
    a = d.fallback;
    return f2 ? (d = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d, 0, null), a = Tg(a, d, c, null), f2.return = b2, a.return = b2, f2.sibling = a, b2.child = f2, b2.child.memoizedState = nj(c), b2.memoizedState = mj, a) : qj(b2, g2);
  }
  e = a.memoizedState;
  if (null !== e && (h2 = e.dehydrated, null !== h2)) return rj(a, b2, g2, d, h2, e, c);
  if (f2) {
    f2 = d.fallback;
    g2 = b2.mode;
    e = a.child;
    h2 = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g2 & 1) && b2.child !== e ? (d = b2.child, d.childLanes = 0, d.pendingProps = k2, b2.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c, null), f2.flags |= 2);
    f2.return = b2;
    d.return = b2;
    d.sibling = f2;
    b2.child = d;
    d = f2;
    f2 = b2.child;
    g2 = a.child.memoizedState;
    g2 = null === g2 ? nj(c) : { baseLanes: g2.baseLanes | c, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a.childLanes & ~c;
    b2.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b2.mode & 1) && (d.lanes = c);
  d.return = b2;
  d.sibling = null;
  null !== a && (c = b2.deletions, null === c ? (b2.deletions = [a], b2.flags |= 16) : c.push(a));
  b2.child = d;
  b2.memoizedState = null;
  return d;
}
function qj(a, b2) {
  b2 = pj({ mode: "visible", children: b2 }, a.mode, 0, null);
  b2.return = a;
  return a.child = b2;
}
function sj(a, b2, c, d) {
  null !== d && Jg(d);
  Ug(b2, a.child, null, c);
  a = qj(b2, b2.pendingProps.children);
  a.flags |= 2;
  b2.memoizedState = null;
  return a;
}
function rj(a, b2, c, d, e, f2, g2) {
  if (c) {
    if (b2.flags & 256) return b2.flags &= -257, d = Ki$1(Error(p(422))), sj(a, b2, g2, d);
    if (null !== b2.memoizedState) return b2.child = a.child, b2.flags |= 128, null;
    f2 = d.fallback;
    e = b2.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g2, null);
    f2.flags |= 2;
    d.return = b2;
    f2.return = b2;
    d.sibling = f2;
    b2.child = d;
    0 !== (b2.mode & 1) && Ug(b2, a.child, null, g2);
    b2.child.memoizedState = nj(g2);
    b2.memoizedState = mj;
    return f2;
  }
  if (0 === (b2.mode & 1)) return sj(a, b2, g2, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h2 = d.dgst;
    d = h2;
    f2 = Error(p(419));
    d = Ki$1(f2, d, void 0);
    return sj(a, b2, g2, d);
  }
  h2 = 0 !== (g2 & a.childLanes);
  if (dh || h2) {
    d = Q$1;
    if (null !== d) {
      switch (g2 & -g2) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g2)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi$1(d, a, e, -1));
    }
    tj();
    d = Ki$1(Error(p(421)));
    return sj(a, b2, g2, d);
  }
  if ("$?" === e.data) return b2.flags |= 128, b2.child = a.child, b2 = uj.bind(null, a), e._reactRetry = b2, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b2;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b2);
  b2 = qj(b2, d.children);
  b2.flags |= 4096;
  return b2;
}
function vj(a, b2, c) {
  a.lanes |= b2;
  var d = a.alternate;
  null !== d && (d.lanes |= b2);
  bh(a.return, b2, c);
}
function wj(a, b2, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b2, c) {
  var d = b2.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi$1(a, b2, d.children, c);
  d = L$2.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b2.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b2);
      else if (19 === a.tag) vj(a, c, b2);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b2) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b2) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G$1(L$2, d);
  if (0 === (b2.mode & 1)) b2.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b2.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b2.child, b2.child = null) : (e = c.sibling, c.sibling = null);
      wj(b2, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b2.child;
      for (b2.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b2.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b2, true, c, null, f2);
      break;
    case "together":
      wj(b2, false, null, null, void 0);
      break;
    default:
      b2.memoizedState = null;
  }
  return b2.child;
}
function ij(a, b2) {
  0 === (b2.mode & 1) && null !== a && (a.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function Zi$1(a, b2, c) {
  null !== a && (b2.dependencies = a.dependencies);
  rh |= b2.lanes;
  if (0 === (c & b2.childLanes)) return null;
  if (null !== a && b2.child !== a.child) throw Error(p(153));
  if (null !== b2.child) {
    a = b2.child;
    c = Pg(a, a.pendingProps);
    b2.child = c;
    for (c.return = b2; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b2;
    c.sibling = null;
  }
  return b2.child;
}
function yj(a, b2, c) {
  switch (b2.tag) {
    case 3:
      kj(b2);
      Ig();
      break;
    case 5:
      Ah(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      yh(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d = b2.type._context, e = b2.memoizedProps.value;
      G$1(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b2.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G$1(L$2, L$2.current & 1), b2.flags |= 128, null;
        if (0 !== (c & b2.child.childLanes)) return oj(a, b2, c);
        G$1(L$2, L$2.current & 1);
        a = Zi$1(a, b2, c);
        return null !== a ? a.sibling : null;
      }
      G$1(L$2, L$2.current & 1);
      break;
    case 19:
      d = 0 !== (c & b2.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b2, c);
        b2.flags |= 128;
      }
      e = b2.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G$1(L$2, L$2.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b2.lanes = 0, dj(a, b2, c);
  }
  return Zi$1(a, b2, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b2) {
  for (var c = b2.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b2) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b2) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b2, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b2.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya$1(a, e);
        d = Ya$1(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g2;
    c = null;
    for (l3 in e) if (!d.hasOwnProperty(l3) && e.hasOwnProperty(l3) && null != e[l3]) if ("style" === l3) {
      var h2 = e[l3];
      for (g2 in h2) h2.hasOwnProperty(g2) && (c || (c = {}), c[g2] = "");
    } else "dangerouslySetInnerHTML" !== l3 && "children" !== l3 && "suppressContentEditableWarning" !== l3 && "suppressHydrationWarning" !== l3 && "autoFocus" !== l3 && (ea.hasOwnProperty(l3) ? f2 || (f2 = []) : (f2 = f2 || []).push(l3, null));
    for (l3 in d) {
      var k2 = d[l3];
      h2 = null != e ? e[l3] : void 0;
      if (d.hasOwnProperty(l3) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l3) if (h2) {
        for (g2 in h2) !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c || (c = {}), c[g2] = "");
        for (g2 in k2) k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c || (c = {}), c[g2] = k2[g2]);
      } else c || (f2 || (f2 = []), f2.push(
        l3,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l3 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l3, k2)) : "children" === l3 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l3, "" + k2) : "suppressContentEditableWarning" !== l3 && "suppressHydrationWarning" !== l3 && (ea.hasOwnProperty(l3) ? (null != k2 && "onScroll" === l3 && D$2("scroll", a), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l3, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l3 = f2;
    if (b2.updateQueue = l3) b2.flags |= 4;
  }
};
Cj = function(a, b2, c, d) {
  c !== d && (b2.flags |= 4);
};
function Dj(a, b2) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b2 = a.tail;
      for (var c = null; null !== b2; ) null !== b2.alternate && (c = b2), b2 = b2.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b2 || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S$1(a) {
  var b2 = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b2) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b2;
}
function Ej(a, b2, c) {
  var d = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$1(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 3:
      d = b2.stateNode;
      zh();
      E(Wf);
      E(H$2);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b2) ? b2.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b2);
      S$1(b2);
      return null;
    case 5:
      Bh(b2);
      var e = xh(wh.current);
      c = b2.type;
      if (null !== a && null != b2.stateNode) Bj(a, b2, c, d, e), a.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d) {
          if (null === b2.stateNode) throw Error(p(166));
          S$1(b2);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b2)) {
          d = b2.stateNode;
          c = b2.type;
          var f2 = b2.memoizedProps;
          d[Of] = b2;
          d[Pf] = f2;
          a = 0 !== (b2.mode & 1);
          switch (c) {
            case "dialog":
              D$2("cancel", d);
              D$2("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$2("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D$2(lf[e], d);
              break;
            case "source":
              D$2("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$2(
                "error",
                d
              );
              D$2("load", d);
              break;
            case "details":
              D$2("toggle", d);
              break;
            case "input":
              Za$1(d, f2);
              D$2("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D$2("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D$2("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
            var h2 = f2[g2];
            "children" === g2 ? "string" === typeof h2 ? d.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d.textContent, h2, a), e = ["children", h2]) : "number" === typeof h2 && d.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h2,
              a
            ), e = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$2("scroll", d);
          }
          switch (c) {
            case "input":
              Va$1(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va$1(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b2.updateQueue = d;
          null !== d && (b2.flags |= 4);
        } else {
          g2 = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g2.createElement(c, { is: d.is }) : (a = g2.createElement(c), "select" === c && (g2 = a, d.multiple ? g2.multiple = true : d.size && (g2.size = d.size))) : a = g2.createElementNS(a, c);
          a[Of] = b2;
          a[Pf] = d;
          zj(a, b2, false, false);
          b2.stateNode = a;
          a: {
            g2 = vb(c, d);
            switch (c) {
              case "dialog":
                D$2("cancel", a);
                D$2("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$2("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D$2(lf[e], a);
                e = d;
                break;
              case "source":
                D$2("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D$2(
                  "error",
                  a
                );
                D$2("load", a);
                e = d;
                break;
              case "details":
                D$2("toggle", a);
                e = d;
                break;
              case "input":
                Za$1(a, d);
                e = Ya$1(a, d);
                D$2("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D$2("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D$2("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h2 = e;
            for (f2 in h2) if (h2.hasOwnProperty(f2)) {
              var k2 = h2[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$2("scroll", a) : null != k2 && ta(a, f2, k2, g2));
            }
            switch (c) {
              case "input":
                Va$1(a);
                db(a, d, false);
                break;
              case "textarea":
                Va$1(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$1(b2);
      return null;
    case 6:
      if (a && null != b2.stateNode) Cj(a, b2, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b2.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b2)) {
          d = b2.stateNode;
          c = b2.memoizedProps;
          d[Of] = b2;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b2.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b2, b2.stateNode = d;
      }
      S$1(b2);
      return null;
    case 13:
      E(L$2);
      d = b2.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b2;
          } else Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$1(b2);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128)) return b2.lanes = c, b2;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a || 0 !== (L$2.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$1(b2);
      return null;
    case 4:
      return zh(), Aj(a, b2), null === a && sf(b2.stateNode.containerInfo), S$1(b2), null;
    case 10:
      return ah(b2.type._context), S$1(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 19:
      E(L$2);
      f2 = b2.memoizedState;
      if (null === f2) return S$1(b2), null;
      d = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b2.child; null !== a; ) {
          g2 = Ch(a);
          if (null !== g2) {
            b2.flags |= 128;
            Dj(f2, false);
            d = g2.updateQueue;
            null !== d && (b2.updateQueue = d, b2.flags |= 4);
            b2.subtreeFlags = 0;
            d = c;
            for (c = b2.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G$1(L$2, L$2.current & 1 | 2);
            return b2.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B$1() > Gj && (b2.flags |= 128, d = true, Dj(f2, false), b2.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g2), null !== a) {
          if (b2.flags |= 128, d = true, c = a.updateQueue, null !== c && (b2.updateQueue = c, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I) return S$1(b2), null;
        } else 2 * B$1() - f2.renderingStartTime > Gj && 1073741824 !== c && (b2.flags |= 128, d = true, Dj(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c = f2.last, null !== c ? c.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail) return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B$1(), b2.sibling = null, c = L$2.current, G$1(L$2, d ? c & 1 | 2 : c & 1), b2;
      S$1(b2);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b2.memoizedState, null !== a && null !== a.memoizedState !== d && (b2.flags |= 8192), d && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S$1(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$1(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b2.tag));
}
function Ij(a, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a = b2.flags, a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 3:
      return zh(), E(Wf), E(H$2), Eh(), a = b2.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b2.flags = a & -65537 | 128, b2) : null;
    case 5:
      return Bh(b2), null;
    case 13:
      E(L$2);
      a = b2.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b2.alternate) throw Error(p(340));
        Ig();
      }
      a = b2.flags;
      return a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 19:
      return E(L$2), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b2.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$1 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b2) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b2, d);
  }
  else c.current = null;
}
function Mj(a, b2, c) {
  try {
    c();
  } catch (d) {
    W(a, b2, d);
  }
}
var Nj = false;
function Oj(a, b2) {
  Cf = dd;
  a = Me$1();
  if (Ne$1(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g2 = 0, h2 = -1, k2 = -1, l3 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h2 = g2 + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g2 + d);
            3 === q2.nodeType && (g2 += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l3 === e && (h2 = g2);
            r2 === f2 && ++m2 === d && (k2 = g2);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b2; null !== V; ) if (b2 = V, a = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a) a.return = b2, V = a;
  else for (; null !== V; ) {
    b2 = V;
    try {
      var n2 = b2.alternate;
      if (0 !== (b2.flags & 1024)) switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Ci$1(b2.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b2.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b2, b2.return, F2);
    }
    a = b2.sibling;
    if (null !== a) {
      a.return = b2.return;
      V = a;
      break;
    }
    V = b2.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b2, c) {
  var d = b2.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b2, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c = b2 = b2.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b2);
  }
}
function Rj(a) {
  var b2 = a.ref;
  if (null !== b2) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b2 ? b2(a) : b2.current = a;
  }
}
function Sj(a) {
  var b2 = a.alternate;
  null !== b2 && (a.alternate = null, Sj(b2));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b2 = a.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b2, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b2 ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b2) : c.insertBefore(a, b2) : (8 === c.nodeType ? (b2 = c.parentNode, b2.insertBefore(a, c)) : (b2 = c, b2.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b2, c), a = a.sibling; null !== a; ) Vj(a, b2, c), a = a.sibling;
}
function Wj(a, b2, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b2 ? c.insertBefore(a, b2) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b2, c), a = a.sibling; null !== a; ) Wj(a, b2, c), a = a.sibling;
}
var X$2 = null, Xj = false;
function Yj(a, b2, c) {
  for (c = c.child; null !== c; ) Zj(a, b2, c), c = c.sibling;
}
function Zj(a, b2, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h2) {
  }
  switch (c.tag) {
    case 5:
      U$1 || Lj(c, b2);
    case 6:
      var d = X$2, e = Xj;
      X$2 = null;
      Yj(a, b2, c);
      X$2 = d;
      Xj = e;
      null !== X$2 && (Xj ? (a = X$2, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X$2.removeChild(c.stateNode));
      break;
    case 18:
      null !== X$2 && (Xj ? (a = X$2, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X$2, c.stateNode));
      break;
    case 4:
      d = X$2;
      e = Xj;
      X$2 = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b2, c);
      X$2 = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c, b2, g2) : 0 !== (f2 & 4) && Mj(c, b2, g2));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b2, c);
      break;
    case 1:
      if (!U$1 && (Lj(c, b2), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h2) {
        W(c, b2, h2);
      }
      Yj(a, b2, c);
      break;
    case 21:
      Yj(a, b2, c);
      break;
    case 22:
      c.mode & 1 ? (U$1 = (d = U$1) || null !== c.memoizedState, Yj(a, b2, c), U$1 = d) : Yj(a, b2, c);
      break;
    default:
      Yj(a, b2, c);
  }
}
function ak(a) {
  var b2 = a.updateQueue;
  if (null !== b2) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b2.forEach(function(b3) {
      var d = bk.bind(null, a, b3);
      c.has(b3) || (c.add(b3), b3.then(d, d));
    });
  }
}
function ck(a, b2) {
  var c = b2.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g2 = b2, h2 = g2;
      a: for (; null !== h2; ) {
        switch (h2.tag) {
          case 5:
            X$2 = h2.stateNode;
            Xj = false;
            break a;
          case 3:
            X$2 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X$2 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h2 = h2.return;
      }
      if (null === X$2) throw Error(p(160));
      Zj(f2, g2, e);
      X$2 = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l3) {
      W(e, b2, l3);
    }
  }
  if (b2.subtreeFlags & 12854) for (b2 = b2.child; null !== b2; ) dk(b2, a), b2 = b2.sibling;
}
function dk(a, b2) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b2, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b2, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b2, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g2 = null !== c ? c.memoizedProps : f2, h2 = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h2 && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h2, g2);
          var l3 = vb(h2, f2);
          for (g2 = 0; g2 < k2.length; g2 += 2) {
            var m2 = k2[g2], q2 = k2[g2 + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l3);
          }
          switch (h2) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b2, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b2, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b2.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b2, a);
      ek(a);
      break;
    case 13:
      ck(b2, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B$1()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U$1 = (l3 = U$1) || m2, ck(b2, a), U$1 = l3) : ck(b2, a);
      ek(a);
      if (d & 8192) {
        l3 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l3) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b2 = d, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l3 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l3 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b2, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b2,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b2 = a.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g2 = d.stateNode.containerInfo, h2 = Uj(a);
          Vj(a, h2, g2);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b2 & 4096 && (a.flags &= -4097);
}
function hk(a, b2, c) {
  V = a;
  ik(a);
}
function ik(a, b2, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g2 = null !== e.memoizedState || Jj;
      if (!g2) {
        var h2 = e.alternate, k2 = null !== h2 && null !== h2.memoizedState || U$1;
        h2 = Jj;
        var l3 = U$1;
        Jj = g2;
        if ((U$1 = k2) && !l3) for (V = e; null !== V; ) g2 = V, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e) : null !== k2 ? (k2.return = g2, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h2;
        U$1 = l3;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b2 = V;
    if (0 !== (b2.flags & 8772)) {
      var c = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772)) switch (b2.tag) {
          case 0:
          case 11:
          case 15:
            U$1 || Qj(5, b2);
            break;
          case 1:
            var d = b2.stateNode;
            if (b2.flags & 4 && !U$1) if (null === c) d.componentDidMount();
            else {
              var e = b2.elementType === b2.type ? c.memoizedProps : Ci$1(b2.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b2.updateQueue;
            null !== f2 && sh(b2, f2, d);
            break;
          case 3:
            var g2 = b2.updateQueue;
            if (null !== g2) {
              c = null;
              if (null !== b2.child) switch (b2.child.tag) {
                case 5:
                  c = b2.child.stateNode;
                  break;
                case 1:
                  c = b2.child.stateNode;
              }
              sh(b2, g2, c);
            }
            break;
          case 5:
            var h2 = b2.stateNode;
            if (null === c && b2.flags & 4) {
              c = h2;
              var k2 = b2.memoizedProps;
              switch (b2.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b2.memoizedState) {
              var l3 = b2.alternate;
              if (null !== l3) {
                var m2 = l3.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U$1 || b2.flags & 512 && Rj(b2);
      } catch (r2) {
        W(b2, b2.return, r2);
      }
    }
    if (b2 === a) {
      V = null;
      break;
    }
    c = b2.sibling;
    if (null !== c) {
      c.return = b2.return;
      V = c;
      break;
    }
    V = b2.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b2 = V;
    if (b2 === a) {
      V = null;
      break;
    }
    var c = b2.sibling;
    if (null !== c) {
      c.return = b2.return;
      V = c;
      break;
    }
    V = b2.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b2 = V;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c = b2.return;
          try {
            Qj(4, b2);
          } catch (k2) {
            W(b2, c, k2);
          }
          break;
        case 1:
          var d = b2.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b2.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b2, e, k2);
            }
          }
          var f2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W(b2, g2, k2);
          }
      }
    } catch (k2) {
      W(b2, b2.return, k2);
    }
    if (b2 === a) {
      V = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V = h2;
      break;
    }
    V = b2.return;
  }
}
var lk = Math.ceil, mk = ua$1.ReactCurrentDispatcher, nk = ua$1.ReactCurrentOwner, ok = ua$1.ReactCurrentBatchConfig, K$1 = 0, Q$1 = null, Y$2 = null, Z$1 = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi$1 = false, Pi$1 = null, Ri$1 = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K$1 & 6) ? B$1() : -1 !== Ak ? Ak : Ak = B$1();
}
function yi$1(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K$1 & 2) && 0 !== Z$1) return Z$1 & -Z$1;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C$1;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi$1(a, b2, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K$1 & 2) || a !== Q$1) a === Q$1 && (0 === (K$1 & 2) && (qk |= c), 4 === T && Ck(a, Z$1)), Dk(a, d), 1 === c && 0 === K$1 && 0 === (b2.mode & 1) && (Gj = B$1() + 500, fg && jg());
}
function Dk(a, b2) {
  var c = a.callbackNode;
  wc(a, b2);
  var d = uc$1(a, a === Q$1 ? Z$1 : 0);
  if (0 === d) null !== c && bc$1(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b2 = d & -d, a.callbackPriority !== b2) {
    null != c && bc$1(c);
    if (1 === b2) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K$1 & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc$1;
          break;
        case 4:
          c = gc$1;
          break;
        case 16:
          c = hc$1;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc$1;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b2;
    a.callbackNode = c;
  }
}
function Gk(a, b2) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K$1 & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc$1(a, a === Q$1 ? Z$1 : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b2) b2 = Ik(a, d);
  else {
    b2 = d;
    var e = K$1;
    K$1 |= 2;
    var f2 = Jk();
    if (Q$1 !== a || Z$1 !== b2) uk = null, Gj = B$1() + 500, Kk(a, b2);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K$1 = e;
    null !== Y$2 ? b2 = 0 : (Q$1 = null, Z$1 = 0, b2 = T);
  }
  if (0 !== b2) {
    2 === b2 && (e = xc(a), 0 !== e && (d = e, b2 = Nk(a, e)));
    if (1 === b2) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
    if (6 === b2) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b2 = Ik(a, d), 2 === b2 && (f2 = xc(a), 0 !== f2 && (d = f2, b2 = Nk(a, f2))), 1 === b2)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b2 = fk + 500 - B$1(), 10 < b2)) {
            if (0 !== uc$1(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b2);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b2 = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g2 = 31 - oc(d);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e && (e = g2);
            d &= ~f2;
          }
          d = e;
          d = B$1() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B$1());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b2) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b2).flags |= 256);
  a = Ik(a, b2);
  2 !== a && (b2 = tk, tk = c, null !== b2 && Fj(b2));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b2 = a; ; ) {
    if (b2.flags & 16384) {
      var c = b2.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He$2(f2(), e)) return false;
        } catch (g2) {
          return false;
        }
      }
    }
    c = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c) c.return = b2, b2 = c;
    else {
      if (b2 === a) break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a) return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Ck(a, b2) {
  b2 &= ~rk;
  b2 &= ~qk;
  a.suspendedLanes |= b2;
  a.pingedLanes &= ~b2;
  for (a = a.expirationTimes; 0 < b2; ) {
    var c = 31 - oc(b2), d = 1 << c;
    a[c] = -1;
    b2 &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K$1 & 6)) throw Error(p(327));
  Hk();
  var b2 = uc$1(a, 0);
  if (0 === (b2 & 1)) return Dk(a, B$1()), null;
  var c = Ik(a, b2);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b2 = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b2), Dk(a, B$1()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b2;
  Pk(a, tk, uk);
  Dk(a, B$1());
  return null;
}
function Qk(a, b2) {
  var c = K$1;
  K$1 |= 1;
  try {
    return a(b2);
  } finally {
    K$1 = c, 0 === K$1 && (Gj = B$1() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K$1 & 6) && Hk();
  var b2 = K$1;
  K$1 |= 1;
  var c = ok.transition, d = C$1;
  try {
    if (ok.transition = null, C$1 = 1, a) return a();
  } finally {
    C$1 = d, ok.transition = c, K$1 = b2, 0 === (K$1 & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b2) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y$2) for (c = Y$2.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H$2);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L$2);
        break;
      case 19:
        E(L$2);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q$1 = a;
  Y$2 = a = Pg(a.current, null);
  Z$1 = fj = b2;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b2 = 0; b2 < fh.length; b2++) if (c = fh[b2], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g2 = f2.next;
        f2.next = e;
        d.next = g2;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b2) {
  do {
    var c = Y$2;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M$1.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M$1 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b2;
        Y$2 = null;
        break;
      }
      a: {
        var f2 = a, g2 = c.return, h2 = c, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l3 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui$1(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Vi$1(y2, g2, h2, f2, b2);
            y2.mode & 1 && Si$1(f2, l3, b2);
            b2 = y2;
            k2 = l3;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b2.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Si$1(f2, l3, b2);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h2.mode & 1) {
          var J2 = Ui$1(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi$1(J2, g2, h2, f2, b2);
            Jg(Ji$1(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji$1(k2, h2);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Ni$1(f2, k2, b2);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri$1 || !Ri$1.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Qi(f2, h2, b2);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b2 = na;
      Y$2 === c && null !== c && (Y$2 = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q$1 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$1, Z$1);
}
function Ik(a, b2) {
  var c = K$1;
  K$1 |= 2;
  var d = Jk();
  if (Q$1 !== a || Z$1 !== b2) uk = null, Kk(a, b2);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K$1 = c;
  mk.current = d;
  if (null !== Y$2) throw Error(p(261));
  Q$1 = null;
  Z$1 = 0;
  return T;
}
function Tk() {
  for (; null !== Y$2; ) Uk(Y$2);
}
function Lk() {
  for (; null !== Y$2 && !cc$1(); ) Uk(Y$2);
}
function Uk(a) {
  var b2 = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b2 ? Sk(a) : Y$2 = b2;
  nk.current = null;
}
function Sk(a) {
  var b2 = a;
  do {
    var c = b2.alternate;
    a = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c = Ej(c, b2, fj), null !== c) {
        Y$2 = c;
        return;
      }
    } else {
      c = Ij(c, b2);
      if (null !== c) {
        c.flags &= 32767;
        Y$2 = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y$2 = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y$2 = b2;
      return;
    }
    Y$2 = b2 = a;
  } while (null !== b2);
  0 === T && (T = 5);
}
function Pk(a, b2, c) {
  var d = C$1, e = ok.transition;
  try {
    ok.transition = null, C$1 = 1, Wk(a, b2, c, d);
  } finally {
    ok.transition = e, C$1 = d;
  }
  return null;
}
function Wk(a, b2, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K$1 & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q$1 && (Y$2 = Q$1 = null, Z$1 = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc$1, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g2 = C$1;
    C$1 = 1;
    var h2 = K$1;
    K$1 |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc$1();
    K$1 = h2;
    C$1 = g2;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri$1 = null);
  mc$1(c.stateNode);
  Dk(a, B$1());
  if (null !== b2) for (d = a.onRecoverableError, c = 0; c < b2.length; c++) e = b2[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi$1) throw Oi$1 = false, a = Pi$1, Pi$1 = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b2 = ok.transition, c = C$1;
    try {
      ok.transition = null;
      C$1 = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K$1 & 6)) throw Error(p(331));
        var e = K$1;
        K$1 |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g2 = f2.child;
          if (0 !== (V.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l3 = h2[k2];
                for (V = l3; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l3) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V = g2;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g2 = V;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V = u2;
          else b: for (g2 = w2; null !== V; ) {
            h2 = V;
            if (0 !== (h2.flags & 2048)) try {
              switch (h2.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h2);
              }
            } catch (na) {
              W(h2, h2.return, na);
            }
            if (h2 === g2) {
              V = null;
              break b;
            }
            var F2 = h2.sibling;
            if (null !== F2) {
              F2.return = h2.return;
              V = F2;
              break b;
            }
            V = h2.return;
          }
        }
        K$1 = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C$1 = c, ok.transition = b2;
    }
  }
  return false;
}
function Xk(a, b2, c) {
  b2 = Ji$1(c, b2);
  b2 = Ni$1(a, b2, 1);
  a = nh(a, b2, 1);
  b2 = R();
  null !== a && (Ac(a, 1, b2), Dk(a, b2));
}
function W(a, b2, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b2; ) {
    if (3 === b2.tag) {
      Xk(b2, a, c);
      break;
    } else if (1 === b2.tag) {
      var d = b2.stateNode;
      if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri$1 || !Ri$1.has(d))) {
        a = Ji$1(c, a);
        a = Qi(b2, a, 1);
        b2 = nh(b2, a, 1);
        a = R();
        null !== b2 && (Ac(b2, 1, a), Dk(b2, a));
        break;
      }
    }
    b2 = b2.return;
  }
}
function Ti$1(a, b2, c) {
  var d = a.pingCache;
  null !== d && d.delete(b2);
  b2 = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q$1 === a && (Z$1 & c) === c && (4 === T || 3 === T && (Z$1 & 130023424) === Z$1 && 500 > B$1() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b2);
}
function Yk(a, b2) {
  0 === b2 && (0 === (a.mode & 1) ? b2 = 1 : (b2 = sc$1, sc$1 <<= 1, 0 === (sc$1 & 130023424) && (sc$1 = 4194304)));
  var c = R();
  a = ih(a, b2);
  null !== a && (Ac(a, b2, c), Dk(a, c));
}
function uj(a) {
  var b2 = a.memoizedState, c = 0;
  null !== b2 && (c = b2.retryLane);
  Yk(a, c);
}
function bk(a, b2) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b2);
  Yk(a, c);
}
var Vk;
Vk = function(a, b2, c) {
  if (null !== a) if (a.memoizedProps !== b2.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b2.flags & 128)) return dh = false, yj(a, b2, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d = b2.type;
      ij(a, b2);
      a = b2.pendingProps;
      var e = Yf(b2, H$2.current);
      ch(b2, c);
      e = Nh(null, b2, d, a, e, c);
      var f2 = Sh();
      b2.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b2), e.updater = Ei$1, b2.stateNode = e, e._reactInternals = b2, Ii$1(b2, d, a, c), b2 = jj(null, b2, d, true, f2, c)) : (b2.tag = 0, I && f2 && vg(b2), Xi$1(null, b2, e, c), b2 = b2.child);
      return b2;
    case 16:
      d = b2.elementType;
      a: {
        ij(a, b2);
        a = b2.pendingProps;
        e = d._init;
        d = e(d._payload);
        b2.type = d;
        e = b2.tag = Zk(d);
        a = Ci$1(d, a);
        switch (e) {
          case 0:
            b2 = cj(null, b2, d, a, c);
            break a;
          case 1:
            b2 = hj(null, b2, d, a, c);
            break a;
          case 11:
            b2 = Yi$1(null, b2, d, a, c);
            break a;
          case 14:
            b2 = $i$1(null, b2, d, Ci$1(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b2;
    case 0:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci$1(d, e), cj(a, b2, d, e, c);
    case 1:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci$1(d, e), hj(a, b2, d, e, c);
    case 3:
      a: {
        kj(b2);
        if (null === a) throw Error(p(387));
        d = b2.pendingProps;
        f2 = b2.memoizedState;
        e = f2.element;
        lh(a, b2);
        qh(b2, d, null, c);
        var g2 = b2.memoizedState;
        d = g2.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
          e = Ji$1(Error(p(423)), b2);
          b2 = lj(a, b2, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji$1(Error(p(424)), b2);
          b2 = lj(a, b2, d, c, e);
          break a;
        } else for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I = true, zg = null, c = Vg(b2, null, d, c), b2.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b2 = Zi$1(a, b2, c);
            break a;
          }
          Xi$1(a, b2, d, c);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Ah(b2), null === a && Eg(b2), d = b2.type, e = b2.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e.children, Ef(d, e) ? g2 = null : null !== f2 && Ef(d, f2) && (b2.flags |= 32), gj(a, b2), Xi$1(a, b2, g2, c), b2.child;
    case 6:
      return null === a && Eg(b2), null;
    case 13:
      return oj(a, b2, c);
    case 4:
      return yh(b2, b2.stateNode.containerInfo), d = b2.pendingProps, null === a ? b2.child = Ug(b2, null, d, c) : Xi$1(a, b2, d, c), b2.child;
    case 11:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci$1(d, e), Yi$1(a, b2, d, e, c);
    case 7:
      return Xi$1(a, b2, b2.pendingProps, c), b2.child;
    case 8:
      return Xi$1(a, b2, b2.pendingProps.children, c), b2.child;
    case 12:
      return Xi$1(a, b2, b2.pendingProps.children, c), b2.child;
    case 10:
      a: {
        d = b2.type._context;
        e = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e.value;
        G$1(Wg, d._currentValue);
        d._currentValue = g2;
        if (null !== f2) if (He$2(f2.value, g2)) {
          if (f2.children === e.children && !Wf.current) {
            b2 = Zi$1(a, b2, c);
            break a;
          }
        } else for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
          var h2 = f2.dependencies;
          if (null !== h2) {
            g2 = f2.child;
            for (var k2 = h2.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l3 = f2.updateQueue;
                  if (null !== l3) {
                    l3 = l3.shared;
                    var m2 = l3.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l3.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b2
                );
                h2.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g2 = f2.type === b2.type ? null : f2.child;
          else if (18 === f2.tag) {
            g2 = f2.return;
            if (null === g2) throw Error(p(341));
            g2.lanes |= c;
            h2 = g2.alternate;
            null !== h2 && (h2.lanes |= c);
            bh(g2, c, b2);
            g2 = f2.sibling;
          } else g2 = f2.child;
          if (null !== g2) g2.return = f2;
          else for (g2 = f2; null !== g2; ) {
            if (g2 === b2) {
              g2 = null;
              break;
            }
            f2 = g2.sibling;
            if (null !== f2) {
              f2.return = g2.return;
              g2 = f2;
              break;
            }
            g2 = g2.return;
          }
          f2 = g2;
        }
        Xi$1(a, b2, e.children, c);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e = b2.type, d = b2.pendingProps.children, ch(b2, c), e = eh(e), d = d(e), b2.flags |= 1, Xi$1(a, b2, d, c), b2.child;
    case 14:
      return d = b2.type, e = Ci$1(d, b2.pendingProps), e = Ci$1(d.type, e), $i$1(a, b2, d, e, c);
    case 15:
      return bj(a, b2, b2.type, b2.pendingProps, c);
    case 17:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci$1(d, e), ij(a, b2), b2.tag = 1, Zf(d) ? (a = true, cg(b2)) : a = false, ch(b2, c), Gi(b2, d, e), Ii$1(b2, d, e, c), jj(null, b2, d, true, a, c);
    case 19:
      return xj(a, b2, c);
    case 22:
      return dj(a, b2, c);
  }
  throw Error(p(156, b2.tag));
};
function Fk(a, b2) {
  return ac$1(a, b2);
}
function $k(a, b2, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b2, c, d) {
  return new $k(a, b2, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga$1) return 14;
  }
  return 2;
}
function Pg(a, b2) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b2, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b2, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b2 = a.dependencies;
  c.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b2, c, d, e, f2) {
  var g2 = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g2 = 1);
  else if ("string" === typeof a) g2 = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b2);
    case za$1:
      g2 = 8;
      e |= 8;
      break;
    case Aa$1:
      return a = Bg(12, c, b2, e | 2), a.elementType = Aa$1, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b2, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa$1:
      return a = Bg(19, c, b2, e), a.elementType = Fa$1, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b2);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba$1:
          g2 = 10;
          break a;
        case Ca$1:
          g2 = 9;
          break a;
        case Da:
          g2 = 11;
          break a;
        case Ga$1:
          g2 = 14;
          break a;
        case Ha$1:
          g2 = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b2 = Bg(g2, c, b2, e);
  b2.elementType = a;
  b2.type = d;
  b2.lanes = f2;
  return b2;
}
function Tg(a, b2, c, d) {
  a = Bg(7, a, d, b2);
  a.lanes = c;
  return a;
}
function pj(a, b2, c, d) {
  a = Bg(22, a, d, b2);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b2, c) {
  a = Bg(6, a, null, b2);
  a.lanes = c;
  return a;
}
function Sg(a, b2, c) {
  b2 = Bg(4, null !== a.children ? a.children : [], a.key, b2);
  b2.lanes = c;
  b2.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b2;
}
function al$1(a, b2, c, d, e) {
  this.tag = b2;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl$1(a, b2, c, d, e, f2, g2, h2, k2) {
  a = new al$1(a, b2, c, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl$1(a, b2, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b2, implementation: c };
}
function dl$1(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b2 = a;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b2);
  }
  return b2;
}
function el$1(a, b2, c, d, e, f2, g2, h2, k2) {
  a = bl$1(c, d, true, a, e, f2, g2, h2, k2);
  a.context = dl$1(null);
  c = a.current;
  d = R();
  e = yi$1(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl$1(a, b2, c, d) {
  var e = b2.current, f2 = R(), g2 = yi$1(e);
  c = dl$1(c);
  null === b2.context ? b2.context = c : b2.pendingContext = c;
  b2 = mh(f2, g2);
  b2.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b2.callback = d);
  a = nh(e, b2, g2);
  null !== a && (gi$1(a, e, g2, f2), oh(a, e, g2));
  return g2;
}
function gl$1(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl$1(a, b2) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b2 ? c : b2;
  }
}
function il$1(a, b2) {
  hl$1(a, b2);
  (a = a.alternate) && hl$1(a, b2);
}
function jl() {
  return null;
}
var kl$1 = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll$1(a) {
  this._internalRoot = a;
}
ml$1.prototype.render = ll$1.prototype.render = function(a) {
  var b2 = this._internalRoot;
  if (null === b2) throw Error(p(409));
  fl$1(a, b2, null, null);
};
ml$1.prototype.unmount = ll$1.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b2 = a.containerInfo;
    Rk(function() {
      fl$1(null, a, null, null);
    });
    b2[uf] = null;
  }
};
function ml$1(a) {
  this._internalRoot = a;
}
ml$1.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b2 = Hc();
    a = { blockedOn: null, target: a, priority: b2 };
    for (var c = 0; c < Qc.length && 0 !== b2 && b2 < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol$1(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql$1(a, b2, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl$1(g2);
        f2.call(a2);
      };
    }
    var g2 = el$1(b2, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g2;
    a[uf] = g2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g2;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h2 = d;
    d = function() {
      var a2 = gl$1(k2);
      h2.call(a2);
    };
  }
  var k2 = bl$1(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl$1(b2, k2, c, d);
  });
  return k2;
}
function rl(a, b2, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e) {
      var h2 = e;
      e = function() {
        var a2 = gl$1(g2);
        h2.call(a2);
      };
    }
    fl$1(b2, g2, a, e);
  } else g2 = ql$1(c, b2, a, e, d);
  return gl$1(g2);
}
Ec$1 = function(a) {
  switch (a.tag) {
    case 3:
      var b2 = a.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c = tc$1(b2.pendingLanes);
        0 !== c && (Cc(b2, c | 1), Dk(b2, B$1()), 0 === (K$1 & 6) && (Gj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b3 = ih(a, 1);
        if (null !== b3) {
          var c2 = R();
          gi$1(b3, a, 1, c2);
        }
      }), il$1(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b2 = ih(a, 134217728);
    if (null !== b2) {
      var c = R();
      gi$1(b2, a, 134217728, c);
    }
    il$1(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b2 = yi$1(a), c = ih(a, b2);
    if (null !== c) {
      var d = R();
      gi$1(c, a, b2, d);
    }
    il$1(a, b2);
  }
};
Hc = function() {
  return C$1;
};
Ic$1 = function(a, b2) {
  var c = C$1;
  try {
    return C$1 = a, b2();
  } finally {
    C$1 = c;
  }
};
yb = function(a, b2, c) {
  switch (b2) {
    case "input":
      bb(a, c);
      b2 = c.name;
      if ("radio" === c.type && null != b2) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c.length; b2++) {
          var d = c[b2];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa$1(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b2 = c.value, null != b2 && fb(a, !!c.multiple, b2, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl$1 = { usingClientEntryPoint: false, Events: [Cb, ue$1, Db, Eb, Fb, Qk] }, tl$1 = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul$1 = { bundleType: tl$1.bundleType, version: tl$1.version, rendererPackageName: tl$1.rendererPackageName, rendererConfig: tl$1.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua$1.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl$1.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl$1 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl$1.isDisabled && vl$1.supportsFiber) try {
    kc = vl$1.inject(ul$1), lc = vl$1;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl$1;
reactDom_production_min.createPortal = function(a, b2) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b2)) throw Error(p(200));
  return cl$1(a, b2, null, c);
};
reactDom_production_min.createRoot = function(a, b2) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl$1;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c = true), void 0 !== b2.identifierPrefix && (d = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e = b2.onRecoverableError));
  b2 = bl$1(a, 1, false, null, null, c, false, d, e);
  a[uf] = b2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll$1(b2);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b2 = a._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b2);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b2, c) {
  if (!ol$1(b2)) throw Error(p(200));
  return rl(null, a, b2, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b2, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g2 = kl$1;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g2 = c.onRecoverableError));
  b2 = el$1(b2, null, a, 1, null != c ? c : null, e, false, f2, g2);
  a[uf] = b2.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c, e] : b2.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml$1(b2);
};
reactDom_production_min.render = function(a, b2, c) {
  if (!ol$1(b2)) throw Error(p(200));
  return rl(null, a, b2, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol$1(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b2, c, d) {
  if (!ol$1(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b2, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mergeClasses = (...classes) => classes.filter((className, index2, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index2;
}).join(" ").trim();
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const LucideContext = reactExports.createContext({});
const useLucideContext = () => reactExports.useContext(LucideContext);
const Icon = reactExports.forwardRef(
  ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = "currentColor",
      className: contextClass = ""
    } = useLucideContext() ?? {};
    const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size ?? contextSize ?? defaultAttributes.width,
        height: size ?? contextSize ?? defaultAttributes.height,
        stroke: color ?? contextColor,
        strokeWidth: calculatedStrokeWidth,
        className: mergeClasses("lucide", contextClass, className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$I = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$I);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$H = [
  [
    "path",
    { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }
  ],
  [
    "path",
    {
      d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
      key: "e1hn23"
    }
  ]
];
const Braces = createLucideIcon("braces", __iconNode$H);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$G = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$G);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$F = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$F);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$E = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$E);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$D = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$D);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$C = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$C);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$B = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$B);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$A = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$A);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$z = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
];
const FileCode = createLucideIcon("file-code", __iconNode$z);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$y = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }],
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }]
];
const FileDiff = createLucideIcon("file-diff", __iconNode$y);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$x = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
const FileImage = createLucideIcon("file-image", __iconNode$x);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$w = [
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M4 12v6", key: "bg1pfk" }],
  ["path", { d: "M4 14h2", key: "1sf9f8" }],
  [
    "path",
    {
      d: "M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4",
      key: "d56i0q"
    }
  ],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const FileKey = createLucideIcon("file-key", __iconNode$w);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$v = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
];
const FilePlus = createLucideIcon("file-plus", __iconNode$v);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$u = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$u);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$t = [
  ["path", { d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", key: "14sh0y" }],
  [
    "path",
    {
      d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
      key: "1970lx"
    }
  ],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1", key: "l4dndm" }]
];
const Files = createLucideIcon("files", __iconNode$t);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$s = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
];
const File = createLucideIcon("file", __iconNode$s);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$r = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$r);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$q = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const Folder = createLucideIcon("folder", __iconNode$q);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$p = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3", key: "1cii5b" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }]
];
const GitBranch = createLucideIcon("git-branch", __iconNode$p);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$o = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$o);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$n = [
  ["path", { d: "M10 16h.01", key: "1bzywj" }],
  [
    "path",
    {
      d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "18tbho"
    }
  ],
  ["path", { d: "M21.946 12.013H2.054", key: "zqlbp7" }],
  ["path", { d: "M6 16h.01", key: "1pmjb7" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode$n);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$m = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$m);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$l = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$l);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$k = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$k);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$j = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$j);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$i = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode$i);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$h = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$h);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$g = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$g);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$f = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Radio = createLucideIcon("radio", __iconNode$f);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$e = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$e);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$d = [
  ["path", { d: "M14 4a1 1 0 0 1 1-1", key: "dhj8ez" }],
  ["path", { d: "M15 10a1 1 0 0 1-1-1", key: "1mnyi5" }],
  ["path", { d: "M21 4a1 1 0 0 0-1-1", key: "sfs9ap" }],
  ["path", { d: "M21 9a1 1 0 0 1-1 1", key: "mp6qeo" }],
  ["path", { d: "m3 7 3 3 3-3", key: "x25e72" }],
  ["path", { d: "M6 10V5a2 2 0 0 1 2-2h2", key: "15xut4" }],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }]
];
const Replace = createLucideIcon("replace", __iconNode$d);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$c = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$c);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$b);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$a);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$9);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$8);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$7);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$6);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
];
const SquareTerminal = createLucideIcon("square-terminal", __iconNode$5);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m16 16-3 3 3 3", key: "117b85" }],
  ["path", { d: "M3 12h14.5a1 1 0 0 1 0 7H13", key: "18xa6z" }],
  ["path", { d: "M3 19h6", key: "1ygdsz" }],
  ["path", { d: "M3 5h18", key: "1u36vt" }]
];
const TextWrap = createLucideIcon("text-wrap", __iconNode$4);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$3);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$2);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X$1 = createLucideIcon("x", __iconNode$1);
/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function FileTree({ nodes, onSelect, openDirs, onToggleDir, onContextMenu, depth = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "file-tree", style: { paddingLeft: depth === 0 ? 0 : 10 }, children: nodes.map((node) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TreeNode,
    {
      node,
      onSelect,
      openDirs,
      onToggleDir,
      onContextMenu,
      depth
    },
    node.path
  )) });
}
const FILE_COLORS = {
  ts: "#3178c6",
  tsx: "#61dafb",
  js: "#f1e05a",
  jsx: "#61dafb",
  json: "#cbcb41",
  md: "#b0bec5",
  css: "#a06ccd",
  html: "#e34c26",
  py: "#4b8bbe",
  rs: "#dea584",
  go: "#00ADD8",
  sh: "#89e051",
  svg: "#ffb13b",
  png: "#90a4ae",
  jpg: "#90a4ae",
  gif: "#90a4ae",
  lock: "#777",
  yml: "#cbcb41",
  yaml: "#cbcb41",
  env: "#aaa",
  toml: "#9c4221",
  sql: "#e38d40",
  graphql: "#e535ab"
};
const FILE_LABELS = {
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  json: "{}",
  css: "css",
  html: "htm",
  py: "py",
  rs: "rs",
  go: "go",
  md: "md",
  sh: "sh",
  sql: "sql",
  toml: "tml",
  yml: "yml",
  yaml: "yml"
};
function FileTypeIcon({ name }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const color = FILE_COLORS[ext] ?? "#9cdcfe";
  const label = FILE_LABELS[ext];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-file-badge", style: { color, borderColor: `${color}40`, background: `${color}10` }, children: label ?? "·" });
}
function TreeNode({ node, onSelect, openDirs, onToggleDir, onContextMenu, depth }) {
  const open = openDirs.has(node.path);
  if (node.isDir) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "tree-dir",
          onClick: () => onToggleDir(node.path),
          onContextMenu: (e) => {
            e.preventDefault();
            onContextMenu?.(node.path, true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-chevron", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 11, strokeWidth: 2.2 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 11, strokeWidth: 2.2 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-folder-icon", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 14, strokeWidth: 1.6 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 14, strokeWidth: 1.6 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-label", children: node.name })
          ]
        }
      ),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileTree,
        {
          nodes: node.children,
          onSelect,
          openDirs,
          onToggleDir,
          onContextMenu,
          depth: depth + 1
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "tree-file",
      onClick: () => onSelect(node.path),
      onContextMenu: (e) => {
        e.preventDefault();
        onContextMenu?.(node.path, false);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-chevron" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileTypeIcon, { name: node.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tree-label", children: node.name })
      ]
    }
  ) });
}
function _arrayLikeToArray(r2, a) {
  (null == a || a > r2.length) && (a = r2.length);
  for (var e = 0, n2 = Array(a); e < a; e++) n2[e] = r2[e];
  return n2;
}
function _arrayWithHoles(r2) {
  if (Array.isArray(r2)) return r2;
}
function _defineProperty$1(e, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e ? Object.defineProperty(e, r2, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r2] = t2, e;
}
function _iterableToArrayLimit(r2, l3) {
  var t2 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t2) {
    var e, n2, i, u2, a = [], f2 = true, o2 = false;
    try {
      if (i = (t2 = t2.call(r2)).next, 0 === l3) ;
      else for (; !(f2 = (e = i.call(t2)).done) && (a.push(e.value), a.length !== l3); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t2.return && (u2 = t2.return(), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$1(e, r2) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2$1(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$1(e, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t2) {
  if (null == e) return {};
  var o2, r2, i = _objectWithoutPropertiesLoose(e, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e);
    for (r2 = 0; r2 < n2.length; r2++) o2 = n2[r2], -1 === t2.indexOf(o2) && {}.propertyIsEnumerable.call(e, o2) && (i[o2] = e[o2]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r2, e) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _slicedToArray(r2, e) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e) || _unsupportedIterableToArray(r2, e) || _nonIterableRest();
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r2, a) {
  if (r2) {
    if ("string" == typeof r2) return _arrayLikeToArray(r2, a);
    var t2 = {}.toString.call(r2).slice(8, -1);
    return "Object" === t2 && r2.constructor && (t2 = r2.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r2) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r2, a) : void 0;
  }
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function compose$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x2) {
    return fns.reduceRight(function(y2, f2) {
      return f2(y2);
    }, x2);
  };
}
function curry$1(fn2) {
  return function curried() {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return args.length >= fn2.length ? fn2.apply(this, args) : function() {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject$1(value) {
  return {}.toString.call(value).includes("Object");
}
function isEmpty(obj) {
  return !Object.keys(obj).length;
}
function isFunction(value) {
  return typeof value === "function";
}
function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
function validateChanges(initial, changes) {
  if (!isObject$1(changes)) errorHandler$1("changeType");
  if (Object.keys(changes).some(function(field) {
    return !hasOwnProperty(initial, field);
  })) errorHandler$1("changeField");
  return changes;
}
function validateSelector(selector) {
  if (!isFunction(selector)) errorHandler$1("selectorType");
}
function validateHandler(handler) {
  if (!(isFunction(handler) || isObject$1(handler))) errorHandler$1("handlerType");
  if (isObject$1(handler) && Object.values(handler).some(function(_handler) {
    return !isFunction(_handler);
  })) errorHandler$1("handlersType");
}
function validateInitial(initial) {
  if (!initial) errorHandler$1("initialIsRequired");
  if (!isObject$1(initial)) errorHandler$1("initialType");
  if (isEmpty(initial)) errorHandler$1("initialContent");
}
function throwError$1(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages$1 = {
  initialIsRequired: "initial state is required",
  initialType: "initial state should be an object",
  initialContent: "initial state shouldn't be an empty object",
  handlerType: "handler should be an object or a function",
  handlersType: "all handlers should be a functions",
  selectorType: "selector should be a function",
  changeType: "provided value of changes should be an object",
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": "an unknown error accured in `state-local` package"
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};
function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  validators$1.initial(initial);
  validators$1.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry$1(didStateUpdate)(state, handler);
  var update = curry$1(updateState)(state);
  var validate = curry$1(validators$1.changes)(initial);
  var getChanges = curry$1(extractChanges)(state);
  function getState2() {
    var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(state2) {
      return state2;
    };
    validators$1.selector(selector);
    return selector(state.current);
  }
  function setState2(causedChanges) {
    compose$1(didUpdate, update, validate, getChanges)(causedChanges);
  }
  return [getState2, setState2];
}
function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function updateState(state, changes) {
  state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
  return changes;
}
function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
    var _handler$field;
    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}
var index = {
  create
};
var config$1 = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"
  }
};
function curry(fn2) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn2.length ? fn2.apply(this, args) : function() {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject(value) {
  return {}.toString.call(value).includes("Object");
}
function validateConfig(config2) {
  if (!config2) errorHandler("configIsRequired");
  if (!isObject(config2)) errorHandler("configType");
  if (config2.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config2.urls.monacoBase
      }
    };
  }
  return config2;
}
function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}
function throwError(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  "default": "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};
var compose = function compose2() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x2) {
    return fns.reduceRight(function(y2, f2) {
      return f2(y2);
    }, x2);
  };
};
function merge(target, source) {
  Object.keys(source).forEach(function(key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}
var CANCELATION_MESSAGE = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function() {
    return hasCanceled_ = true;
  }, wrappedPromise;
}
var _excluded = ["monaco"];
var _state$create = index.create({
  config: config$1,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
}), _state$create2 = _slicedToArray(_state$create, 2), getState = _state$create2[0], setState = _state$create2[1];
function config(globalConfig) {
  var _validators$config = validators.config(globalConfig), monaco = _validators$config.monaco, config2 = _objectWithoutProperties(_validators$config, _excluded);
  setState(function(state) {
    return {
      config: merge(state.config, config2),
      monaco
    };
  });
}
function init() {
  var state = getState(function(_ref) {
    var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
    return {
      monaco,
      isInitialized,
      resolve
    };
  });
  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });
    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable(wrapperPromise);
    }
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable(wrapperPromise);
    }
    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
  }
  return makeCancelable(wrapperPromise);
}
function injectScripts(script) {
  return document.body.appendChild(script);
}
function createScript(src) {
  var script = document.createElement("script");
  return src && (script.src = src), script;
}
function getMonacoLoaderScript(configureLoader2) {
  var state = getState(function(_ref2) {
    var config2 = _ref2.config, reject = _ref2.reject;
    return {
      config: config2,
      reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function() {
    return configureLoader2();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}
function configureLoader() {
  var state = getState(function(_ref3) {
    var config2 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
    return {
      config: config2,
      resolve,
      reject
    };
  });
  var require2 = window.require;
  require2.config(state.config);
  require2(["vs/editor/editor.main"], function(loaded) {
    var monaco = loaded.m || loaded;
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function(error) {
    state.reject(error);
  });
}
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco
    });
  }
}
function __getMonacoInstance() {
  return getState(function(_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function(resolve, reject) {
  return setState({
    resolve,
    reject
  });
});
var loader = {
  config,
  init,
  __getMonacoInstance
};
var le = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, v$2 = le;
var ae$1 = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, Y$1 = ae$1;
function Me({ children: e }) {
  return We$2.createElement("div", { style: Y$1.container }, e);
}
var Z = Me;
var $$1 = Z;
function Ee$1({ width: e, height: r2, isEditorReady: n2, loading: t2, _ref: a, className: m2, wrapperProps: E2 }) {
  return We$2.createElement("section", { style: { ...v$2.wrapper, width: e, height: r2 }, ...E2 }, !n2 && We$2.createElement($$1, null, t2), We$2.createElement("div", { ref: a, style: { ...v$2.fullWidth, ...!n2 && v$2.hide }, className: m2 }));
}
var ee$1 = Ee$1;
var H$1 = reactExports.memo(ee$1);
function Ce$1(e) {
  reactExports.useEffect(e, []);
}
var k$1 = Ce$1;
function he$1(e, r2, n2 = true) {
  let t2 = reactExports.useRef(true);
  reactExports.useEffect(t2.current || !n2 ? () => {
    t2.current = false;
  } : e, r2);
}
var l = he$1;
function D$1() {
}
function h$1(e, r2, n2, t2) {
  return De$1(e, t2) || be$1(e, r2, n2, t2);
}
function De$1(e, r2) {
  return e.editor.getModel(te(e, r2));
}
function be$1(e, r2, n2, t2) {
  return e.editor.createModel(r2, n2, t2 ? te(e, t2) : void 0);
}
function te(e, r2) {
  return e.Uri.parse(r2);
}
function Oe({ original: e, modified: r2, language: n2, originalLanguage: t2, modifiedLanguage: a, originalModelPath: m2, modifiedModelPath: E2, keepCurrentOriginalModel: g2 = false, keepCurrentModifiedModel: N2 = false, theme: x2 = "light", loading: P2 = "Loading...", options: y2 = {}, height: V2 = "100%", width: z2 = "100%", className: F2, wrapperProps: j2 = {}, beforeMount: A2 = D$1, onMount: q2 = D$1 }) {
  let [M2, O2] = reactExports.useState(false), [T2, s15] = reactExports.useState(true), u2 = reactExports.useRef(null), c = reactExports.useRef(null), w2 = reactExports.useRef(null), d = reactExports.useRef(q2), o2 = reactExports.useRef(A2), b2 = reactExports.useRef(false);
  k$1(() => {
    let i = loader.init();
    return i.then((f2) => (c.current = f2) && s15(false)).catch((f2) => f2?.type !== "cancelation" && console.error("Monaco initialization: error:", f2)), () => u2.current ? I2() : i.cancel();
  }), l(() => {
    if (u2.current && c.current) {
      let i = u2.current.getOriginalEditor(), f2 = h$1(c.current, e || "", t2 || n2 || "text", m2 || "");
      f2 !== i.getModel() && i.setModel(f2);
    }
  }, [m2], M2), l(() => {
    if (u2.current && c.current) {
      let i = u2.current.getModifiedEditor(), f2 = h$1(c.current, r2 || "", a || n2 || "text", E2 || "");
      f2 !== i.getModel() && i.setModel(f2);
    }
  }, [E2], M2), l(() => {
    let i = u2.current.getModifiedEditor();
    i.getOption(c.current.editor.EditorOption.readOnly) ? i.setValue(r2 || "") : r2 !== i.getValue() && (i.executeEdits("", [{ range: i.getModel().getFullModelRange(), text: r2 || "", forceMoveMarkers: true }]), i.pushUndoStop());
  }, [r2], M2), l(() => {
    u2.current?.getModel()?.original.setValue(e || "");
  }, [e], M2), l(() => {
    let { original: i, modified: f2 } = u2.current.getModel();
    c.current.editor.setModelLanguage(i, t2 || n2 || "text"), c.current.editor.setModelLanguage(f2, a || n2 || "text");
  }, [n2, t2, a], M2), l(() => {
    c.current?.editor.setTheme(x2);
  }, [x2], M2), l(() => {
    u2.current?.updateOptions(y2);
  }, [y2], M2);
  let L2 = reactExports.useCallback(() => {
    if (!c.current) return;
    o2.current(c.current);
    let i = h$1(c.current, e || "", t2 || n2 || "text", m2 || ""), f2 = h$1(c.current, r2 || "", a || n2 || "text", E2 || "");
    u2.current?.setModel({ original: i, modified: f2 });
  }, [n2, r2, a, e, t2, m2, E2]), U2 = reactExports.useCallback(() => {
    !b2.current && w2.current && (u2.current = c.current.editor.createDiffEditor(w2.current, { automaticLayout: true, ...y2 }), L2(), c.current?.editor.setTheme(x2), O2(true), b2.current = true);
  }, [y2, x2, L2]);
  reactExports.useEffect(() => {
    M2 && d.current(u2.current, c.current);
  }, [M2]), reactExports.useEffect(() => {
    !T2 && !M2 && U2();
  }, [T2, M2, U2]);
  function I2() {
    let i = u2.current?.getModel();
    g2 || i?.original?.dispose(), N2 || i?.modified?.dispose(), u2.current?.dispose();
  }
  return We$2.createElement(H$1, { width: z2, height: V2, isEditorReady: M2, loading: P2, _ref: w2, className: F2, wrapperProps: j2 });
}
var ie$1 = Oe;
reactExports.memo(ie$1);
function He$1(e) {
  let r2 = reactExports.useRef();
  return reactExports.useEffect(() => {
    r2.current = e;
  }, [e]), r2.current;
}
var se$1 = He$1;
var _$2 = /* @__PURE__ */ new Map();
function Ve$1({ defaultValue: e, defaultLanguage: r2, defaultPath: n2, value: t2, language: a, path: m2, theme: E2 = "light", line: g2, loading: N2 = "Loading...", options: x2 = {}, overrideServices: P2 = {}, saveViewState: y2 = true, keepCurrentModel: V2 = false, width: z2 = "100%", height: F2 = "100%", className: j2, wrapperProps: A2 = {}, beforeMount: q2 = D$1, onMount: M2 = D$1, onChange: O2, onValidate: T2 = D$1 }) {
  let [s15, u2] = reactExports.useState(false), [c, w2] = reactExports.useState(true), d = reactExports.useRef(null), o2 = reactExports.useRef(null), b2 = reactExports.useRef(null), L2 = reactExports.useRef(M2), U2 = reactExports.useRef(q2), I2 = reactExports.useRef(), i = reactExports.useRef(t2), f2 = se$1(m2), Q3 = reactExports.useRef(false), B2 = reactExports.useRef(false);
  k$1(() => {
    let p2 = loader.init();
    return p2.then((R2) => (d.current = R2) && w2(false)).catch((R2) => R2?.type !== "cancelation" && console.error("Monaco initialization: error:", R2)), () => o2.current ? pe2() : p2.cancel();
  }), l(() => {
    let p2 = h$1(d.current, e || t2 || "", r2 || a || "", m2 || n2 || "");
    p2 !== o2.current?.getModel() && (y2 && _$2.set(f2, o2.current?.saveViewState()), o2.current?.setModel(p2), y2 && o2.current?.restoreViewState(_$2.get(m2)));
  }, [m2], s15), l(() => {
    o2.current?.updateOptions(x2);
  }, [x2], s15), l(() => {
    !o2.current || t2 === void 0 || (o2.current.getOption(d.current.editor.EditorOption.readOnly) ? o2.current.setValue(t2) : t2 !== o2.current.getValue() && (B2.current = true, o2.current.executeEdits("", [{ range: o2.current.getModel().getFullModelRange(), text: t2, forceMoveMarkers: true }]), o2.current.pushUndoStop(), B2.current = false));
  }, [t2], s15), l(() => {
    let p2 = o2.current?.getModel();
    p2 && a && d.current?.editor.setModelLanguage(p2, a);
  }, [a], s15), l(() => {
    g2 !== void 0 && o2.current?.revealLine(g2);
  }, [g2], s15), l(() => {
    d.current?.editor.setTheme(E2);
  }, [E2], s15);
  let X2 = reactExports.useCallback(() => {
    if (!(!b2.current || !d.current) && !Q3.current) {
      U2.current(d.current);
      let p2 = m2 || n2, R2 = h$1(d.current, t2 || e || "", r2 || a || "", p2 || "");
      o2.current = d.current?.editor.create(b2.current, { model: R2, automaticLayout: true, ...x2 }, P2), y2 && o2.current.restoreViewState(_$2.get(p2)), d.current.editor.setTheme(E2), g2 !== void 0 && o2.current.revealLine(g2), u2(true), Q3.current = true;
    }
  }, [e, r2, n2, t2, a, m2, x2, P2, y2, E2, g2]);
  reactExports.useEffect(() => {
    s15 && L2.current(o2.current, d.current);
  }, [s15]), reactExports.useEffect(() => {
    !c && !s15 && X2();
  }, [c, s15, X2]), i.current = t2, reactExports.useEffect(() => {
    s15 && O2 && (I2.current?.dispose(), I2.current = o2.current?.onDidChangeModelContent((p2) => {
      B2.current || O2(o2.current.getValue(), p2);
    }));
  }, [s15, O2]), reactExports.useEffect(() => {
    if (s15) {
      let p2 = d.current.editor.onDidChangeMarkers((R2) => {
        let G2 = o2.current.getModel()?.uri;
        if (G2 && R2.find((J2) => J2.path === G2.path)) {
          let J2 = d.current.editor.getModelMarkers({ resource: G2 });
          T2?.(J2);
        }
      });
      return () => {
        p2?.dispose();
      };
    }
    return () => {
    };
  }, [s15, T2]);
  function pe2() {
    I2.current?.dispose(), V2 ? y2 && _$2.set(m2, o2.current.saveViewState()) : o2.current.getModel()?.dispose(), o2.current.dispose();
  }
  return We$2.createElement(H$1, { width: z2, height: F2, isEditorReady: s15, loading: N2, _ref: b2, className: j2, wrapperProps: A2 });
}
var fe$1 = Ve$1;
var de$1 = reactExports.memo(fe$1);
var Ft = de$1;
function getLanguage(path) {
  if (!path) return "plaintext";
  const ext = path.split(".").pop() || "";
  const map = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    py: "python",
    md: "markdown",
    json: "json",
    css: "css",
    html: "html",
    sh: "shell",
    yaml: "yaml",
    yml: "yaml",
    rs: "rust",
    go: "go"
  };
  return map[ext] || "plaintext";
}
function Editor({ path, content, onChange, onSave, onSaveAs, sessions, onRestoreSession, onOpenFolder }) {
  const editorRef = reactExports.useRef(null);
  const [wordWrap, setWordWrap] = reactExports.useState("on");
  function handleMount(ed2, monaco) {
    editorRef.current = ed2;
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave(ed2.getValue());
    });
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS, () => {
      onSaveAs?.(ed2.getValue());
    });
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      ed2.getAction("actions.find")?.run();
    });
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
      ed2.getAction("editor.action.startFindReplaceAction")?.run();
    });
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => {
      ed2.getAction("editor.action.nextMatchFindAction")?.run();
    });
    ed2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyG, () => {
      ed2.getAction("editor.action.previousMatchFindAction")?.run();
    });
  }
  function triggerFind() {
    editorRef.current?.getAction("actions.find")?.run();
    editorRef.current?.focus();
  }
  function triggerReplace() {
    editorRef.current?.getAction("editor.action.startFindReplaceAction")?.run();
    editorRef.current?.focus();
  }
  function toggleWordWrap() {
    const next = wordWrap === "on" ? "off" : "on";
    setWordWrap(next);
    editorRef.current?.updateOptions({ wordWrap: next });
  }
  function formatDocument() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-container", children: path ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-breadcrumb", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "breadcrumb-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "data-tooltip": "Find: Search text in this file (⌘F)", onClick: triggerFind, className: "bc-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, strokeWidth: 1.8 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "data-tooltip": "Replace: Find and replace text (⌘H)", onClick: triggerReplace, className: "bc-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Replace, { size: 15, strokeWidth: 1.8 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "data-tooltip": "Format Code: Clean up layout and indentation", onClick: formatDocument, className: "bc-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Braces, { size: 15, strokeWidth: 1.8 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "data-tooltip": wordWrap === "on" ? "Word Wrap: On (Toggle wrapping)" : "Word Wrap: Off (Toggle wrapping)",
          onClick: toggleWordWrap,
          className: `bc-btn ${wordWrap === "on" ? "bc-btn--active" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextWrap, { size: 15, strokeWidth: 1.8 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bc-divider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "data-tooltip": "Save: Persist changes to disk (⌘S)", "data-tooltip-align": "right", onClick: () => onSave(editorRef.current?.getValue() || content), className: "bc-btn bc-btn--save", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15, strokeWidth: 1.8 }),
        "Save"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "data-tooltip": "Save As: Save file to a new path (⌘⇧S)", "data-tooltip-align": "right", onClick: () => onSaveAs?.(editorRef.current?.getValue() || content), className: "bc-btn bc-btn--save-as", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15, strokeWidth: 1.8 }),
        "Save As"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Ft,
      {
        height: "calc(100vh - 36px)",
        language: getLanguage(path),
        value: content,
        theme: "vs-dark",
        onChange: (v3) => onChange(v3 || ""),
        onMount: handleMount,
        options: {
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap,
          find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: "never",
            seedSearchStringFromSelection: "always"
          }
        }
      }
    )
  ] }) : (() => {
    const recentSessions = (sessions || []).filter((s15) => !s15.isDeleted).sort((a, b2) => (b2.lastActive || b2.createdAt || 0) - (a.lastActive || a.createdAt || 0)).slice(0, 3);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      padding: "40px",
      color: "#d4d4d4",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      background: "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
      overflowY: "auto"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: "40px",
        marginBottom: "16px",
        background: "linear-gradient(45deg, #0e639c, #007acc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 800,
        letterSpacing: "-1px"
      }, children: "Agentic IDE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: "13px",
        color: "#888",
        marginBottom: "32px",
        textAlign: "center",
        maxWidth: "420px",
        lineHeight: "1.5"
      }, children: "Un entorno de desarrollo potenciado por Inteligencia Artificial. Abre una carpeta de proyecto o restaura una sesión reciente." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onOpenFolder,
          style: {
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#fff",
            background: "#0e639c",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(14, 99, 156, 0.3)",
            marginBottom: "48px"
          },
          onMouseOver: (e) => e.currentTarget.style.background = "#1177bb",
          onMouseOut: (e) => e.currentTarget.style.background = "#0e639c",
          children: "Abrir carpeta de proyecto"
        }
      ),
      recentSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: "600px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1.2px",
          color: "#666",
          marginBottom: "16px",
          borderBottom: "1px solid #2d2d2d",
          paddingBottom: "8px"
        }, children: "Restaurar sesión reciente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px" }, children: recentSessions.map((s15) => {
          const projectPath = s15.workspace || "";
          const projectName = projectPath ? projectPath.split(/[\\/]/).pop() : "Ninguno";
          const openTabs = s15.tabs || [];
          const openFilesText = openTabs.length > 0 ? openTabs.map((t2) => t2.split(/[\\/]/).pop()).join(", ") : "Sin archivos abiertos";
          const activeModel = s15.model || "Default Model";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => onRestoreSession && onRestoreSession(s15.id),
              style: {
                padding: "16px",
                background: "#1a1a1a",
                border: "1px solid #2d2d2d",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "all 0.2s ease",
                textAlign: "left"
              },
              onMouseOver: (e) => {
                e.currentTarget.style.borderColor = "#0e639c";
                e.currentTarget.style.background = "#222222";
                e.currentTarget.style.transform = "translateY(-2px)";
              },
              onMouseOut: (e) => {
                e.currentTarget.style.borderColor = "#2d2d2d";
                e.currentTarget.style.background = "#1a1a1a";
                e.currentTarget.style.transform = "translateY(0)";
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", fontWeight: 600, color: "#fff" }, children: s15.name }),
                  s15.mode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: "9px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    background: s15.mode === "plan" ? "#c2780e" : s15.mode === "ask" ? "#1f8244" : "#0e639c",
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px"
                  }, children: s15.mode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#aaa" }, children: "Proyecto:" }),
                    " ",
                    projectName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#aaa" }, children: "Archivos abiertos:" }),
                    " ",
                    openFilesText
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#aaa" }, children: "Modelo:" }),
                    " ",
                    activeModel
                  ] })
                ] })
              ]
            },
            s15.id
          );
        }) })
      ] })
    ] });
  })() });
}
function isFigmaTool(tool) {
  return /figma/i.test(tool.serverName);
}
function detectIntent(text) {
  const value = text.toLowerCase();
  const diagramIntent = /\b(diagram|flowchart|flow chart|user flow|workflow|architecture|sequence diagram|erd|entity relationship|timeline|figjam)\b/.test(value);
  const screenIntent = /\b(screen|mockup|mock-up|ui|page|layout|component|modal|dialog|sidebar|dashboard|landing page|wireframe)\b/.test(value);
  const visualIntent = /\b(figma|figjam|design|visual)\b/.test(value);
  if (diagramIntent) return "diagram";
  if (screenIntent) return "screen";
  if (visualIntent) return "visual";
  return "general";
}
function allowDiagramTool(tool) {
  return /generate_diagram/i.test(tool.name);
}
function allowScreenTool(tool) {
  return /use_figma|generate_figma_design|search_design_system|get_libraries|create_new_file/i.test(tool.name);
}
function allowVisualTool(tool) {
  return allowDiagramTool(tool) || allowScreenTool(tool);
}
function filterMcpToolsForIntent(tools, userText) {
  const intent = detectIntent(userText);
  if (intent === "general") return { intent, tools };
  const nonFigmaTools = tools.filter((tool) => !isFigmaTool(tool));
  const figmaTools = tools.filter(isFigmaTool);
  let allowedFigmaTools;
  if (intent === "diagram") {
    allowedFigmaTools = figmaTools.filter(allowDiagramTool);
  } else if (intent === "screen") {
    allowedFigmaTools = figmaTools.filter(allowScreenTool);
  } else {
    allowedFigmaTools = figmaTools.filter(allowVisualTool);
  }
  if (allowedFigmaTools.length === 0) {
    return { intent, tools };
  }
  return {
    intent,
    tools: [...nonFigmaTools, ...allowedFigmaTools]
  };
}
function hasTool(tools, predicate) {
  return tools.some(predicate);
}
function fromServer(tools, serverPattern) {
  return tools.filter((tool) => serverPattern.test(tool.serverName));
}
function buildMcpToolGuidance(activeMcpTools) {
  if (activeMcpTools.length === 0) return "";
  const lines = [];
  const figmaTools = fromServer(activeMcpTools, /figma/i);
  if (figmaTools.length > 0) {
    const hasDiagramTool = hasTool(figmaTools, (t2) => /generate_diagram/i.test(t2.name));
    const hasUseFigmaTool = hasTool(figmaTools, (t2) => /use_figma/i.test(t2.name));
    const hasGenerateDesignTool = hasTool(figmaTools, (t2) => /generate_figma_design/i.test(t2.name));
    const hasSearchDesignSystemTool = hasTool(figmaTools, (t2) => /search_design_system/i.test(t2.name));
    const hasReadOnlyDataTool = hasTool(figmaTools, (t2) => /get_figma_data|get_design_context|get_screenshot|get_metadata/i.test(t2.name));
    lines.push("[CONNECTED MCP GUIDANCE]");
    lines.push("Figma tools are connected. When the user asks to create or update visuals directly from the IDE, prefer MCP tool calls over plain-text advice.");
    if (hasDiagramTool) {
      lines.push("- For diagrams, user flows, flowcharts, architecture diagrams, sequence diagrams, timelines, or FigJam-style visuals, call the Figma `generate_diagram` tool.");
    }
    if (hasUseFigmaTool || hasGenerateDesignTool) {
      lines.push("- For screens, pages, mockups, components, or layouts, call Figma visual-generation tools such as `use_figma` or `generate_figma_design`.");
    }
    if (hasSearchDesignSystemTool) {
      lines.push("- If creating a screen in Figma, search the design system first and reuse existing components/tokens when possible.");
    }
    if (hasReadOnlyDataTool) {
      lines.push("- Do NOT use raw Figma read tools like `get_figma_data` as the primary action when the user wants a diagram or screen generated. Reserve read tools for extracting context from an existing file or node before generating/updating a visual.");
    }
    lines.push("- If the user provides a Figma URL, extract the file key and node id and use them as tool arguments.");
    lines.push("- After tool execution, summarize the result briefly instead of dumping raw tool output.");
  }
  return lines.length > 0 ? `

${lines.join("\n")}` : "";
}
function hasOwn(obj, key) {
  return !!obj && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, key);
}
function normalizeToolCallItem(item) {
  if (!item || typeof item !== "object") return null;
  let name;
  let args;
  if (item.type === "function" && item.function && typeof item.function === "object") {
    name = item.function.name;
    if (hasOwn(item.function, "arguments")) args = item.function.arguments;
  } else {
    name = item.name;
    if (hasOwn(item, "arguments")) args = item.arguments;
  }
  if (typeof name !== "string" || !name.startsWith("mcp__")) return null;
  if (args === void 0) return null;
  return {
    name,
    arguments: typeof args === "string" ? args : JSON.stringify(args)
  };
}
function tryParseCandidate(candidate) {
  const parsed = JSON.parse(candidate);
  const items = Array.isArray(parsed) ? parsed : [parsed];
  return items.map(normalizeToolCallItem).filter((item) => item !== null);
}
function getJsonCandidates(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const candidates = /* @__PURE__ */ new Set([trimmed]);
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenced?.[1]) candidates.add(fenced[1].trim());
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    candidates.add(trimmed.slice(firstBrace, lastBrace + 1).trim());
  }
  const firstBracket = trimmed.indexOf("[");
  const lastBracket = trimmed.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    candidates.add(trimmed.slice(firstBracket, lastBracket + 1).trim());
  }
  return [...candidates];
}
function parsePlainTextToolCalls(text) {
  for (const candidate of getJsonCandidates(text)) {
    try {
      const parsed = tryParseCandidate(candidate);
      if (parsed.length > 0) return parsed;
    } catch {
    }
  }
  return [];
}
const AGENT_MODES = ["agent", "plan", "debug", "multitask", "ask"];
function newSession(count, mode = "agent", workspace = null) {
  const now = Date.now();
  const id2 = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
  return {
    id: id2,
    name: `Session ${count}`,
    messages: [],
    mode,
    createdAt: now,
    lastActive: now,
    workspace
  };
}
function Markdown({ text }) {
  const parts = [];
  const lines = text.split("\n");
  let currentBlock = [];
  let mode = "p";
  let codeLang = "";
  const flush = (key) => {
    if (currentBlock.length === 0 && mode !== "code") return;
    const content = currentBlock.join("\n");
    if (mode === "code") {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md-code-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md-code-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "md-code-lang", children: codeLang || "text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "md-code-copy", onClick: () => navigator.clipboard.writeText(content), children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "md-code-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: content }) })
        ] }, key)
      );
    } else if (mode === "tree") {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md-tree-block", children: currentBlock.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md-tree-line", children: line.split("").map((char, ci2) => {
          const isTreeChar = ["├", "─", "└", "│", " ", "."].includes(char);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isTreeChar ? "md-tree-glyph" : "md-tree-text", children: char }, ci2);
        }) }, idx)) }, key)
      );
    } else if (mode === "list") {
      parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "md-list", children: currentBlock.map((li2, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: parseInline(li2, `${key}-li-${idx}`) }, `${key}-li-${idx}`)) }, key));
    } else {
      const paraLines = [];
      const flushPara = (k2) => {
        if (paraLines.length === 0) return;
        const nodes = [];
        paraLines.forEach((l3, li2) => {
          if (li2 > 0) nodes.push(/* @__PURE__ */ jsxRuntimeExports.jsx("br", {}, `br-${li2}`));
          nodes.push(...parseInline(l3, `${k2}-line-${li2}`));
        });
        parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md-p", children: nodes }, k2));
        paraLines.length = 0;
      };
      currentBlock.forEach((line, idx) => {
        if (line.startsWith("### ")) {
          flushPara(`${key}-para-${idx}`);
          parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "md-h3", children: parseInline(line.slice(4)) }, `${key}-${idx}`));
        } else if (line.startsWith("## ")) {
          flushPara(`${key}-para-${idx}`);
          parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "md-h2", children: parseInline(line.slice(3)) }, `${key}-${idx}`));
        } else if (line.startsWith("# ")) {
          flushPara(`${key}-para-${idx}`);
          parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "md-h1", children: parseInline(line.slice(2)) }, `${key}-${idx}`));
        } else if (line.trim() === "") {
          flushPara(`${key}-para-${idx}`);
          parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md-spacer" }, `${key}-${idx}`));
        } else {
          paraLines.push(line);
        }
      });
      flushPara(`${key}-para-end`);
    }
    currentBlock = [];
  };
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      if (mode === "code") {
        flush(i);
        mode = "p";
      } else {
        flush(i);
        mode = "code";
        codeLang = trimmed.slice(3).toLowerCase();
      }
      return;
    }
    if (mode === "code") {
      currentBlock.push(line);
      return;
    }
    const isTreeLine = trimmed.match(/^[├└│].*[├──└──│]/) || mode === "tree" && (trimmed.startsWith(".") || line.includes("├──") || line.includes("└──"));
    if (isTreeLine) {
      if (mode !== "tree") {
        flush(i);
        mode = "tree";
      }
      currentBlock.push(line);
      return;
    } else if (mode === "tree") {
      flush(i);
      mode = "p";
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (mode !== "list") {
        flush(i);
        mode = "list";
      }
      currentBlock.push(trimmed.slice(2));
      return;
    } else if (mode === "list") {
      flush(i);
      mode = "p";
    }
    currentBlock.push(line);
  });
  flush(9999);
  function parseInline(t2, keyPrefix) {
    const tokens = [];
    let i = 0;
    let tokenIndex = 0;
    while (i < t2.length) {
      if (t2.startsWith("**", i)) {
        const end = t2.indexOf("**", i + 2);
        if (end !== -1) {
          tokens.push(/* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t2.slice(i + 2, end) }, `${keyPrefix ?? "tok"}-bold-${tokenIndex++}`));
          i = end + 2;
          continue;
        } else {
          tokens.push("**");
          i += 2;
          continue;
        }
      }
      if (t2[i] === "`") {
        const end = t2.indexOf("`", i + 1);
        if (end !== -1) {
          tokens.push(/* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "md-inline-code", children: t2.slice(i + 1, end) }, `${keyPrefix ?? "tok"}-code-${tokenIndex++}`));
          i = end + 1;
          continue;
        } else {
          tokens.push("`");
          i += 1;
          continue;
        }
      }
      let nextSpecial = -1;
      const nextBold = t2.indexOf("**", i);
      const nextCode = t2.indexOf("`", i);
      if (nextBold !== -1 && (nextCode === -1 || nextBold < nextCode)) nextSpecial = nextBold;
      else if (nextCode !== -1) nextSpecial = nextCode;
      if (nextSpecial === -1) {
        tokens.push(t2.slice(i));
        break;
      } else {
        tokens.push(t2.slice(i, nextSpecial));
        i = nextSpecial;
      }
    }
    return tokens;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "markdown-body", children: parts });
}
function MessageContent({ content, writes, executes, onAccept, onRevert, onOpenDiff, onExecuteAllow, onExecuteAlwaysAllow, onExecuteCancel }) {
  const blockRe = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g;
  const parts = [];
  let last = 0;
  let match;
  while ((match = blockRe.exec(content)) !== null) {
    let handleFileClick = function() {
      if (type === "replace" && write) {
        onOpenDiff?.(filePath, write.prevContent ?? "", write.content);
      } else if (type === "write" && write) {
        onOpenDiff?.(filePath, "", write.content);
      }
    };
    if (match.index > last) {
      parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { text: content.slice(last, match.index) }, `text-${last}`));
    }
    const type = match[1];
    const filePath = match[2] ? decodeURIComponent(match[2].trim()) : "";
    const blockContent = match[3];
    const write = writes?.find((w2) => w2.path.endsWith(filePath) || w2.path === filePath);
    const fileName = filePath.split("/").pop();
    if (type === "execute") {
      const command = blockContent.trim();
      const exec = executes?.find((e) => e.command === command);
      if (!exec) {
        parts.push(
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "8px 0", padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", color: "#a8a29e" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, strokeWidth: 2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Suggested command:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "3px", fontSize: "11px" }, children: command }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "6px", fontSize: "11px", color: "#888" }, children: [
              "Switch to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#60a5fa" }, children: "Agent" }),
              " mode to execute this command."
            ] })
          ] }, match.index)
        );
        last = blockRe.lastIndex;
        continue;
      }
      if (exec.status !== "pending") {
        parts.push(
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "8px 0", fontSize: "11px", color: "#888", display: "flex", alignItems: "center", gap: "6px" }, children: [
            exec.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, color: "#10b981" }) : exec.status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 12, color: "#ef4444" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spinner", style: { width: 10, height: 10, borderBottomColor: "transparent" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              exec.status === "completed" ? "Executed:" : exec.status === "error" ? "Failed:" : "Running:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { background: "transparent", padding: 0 }, children: command })
            ] })
          ] }, match.index)
        );
        last = blockRe.lastIndex;
        continue;
      }
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "write-block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-block-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-block-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "write-block-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13, strokeWidth: 2 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "write-block-file", children: command }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "write-block-type", children: "execute" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "write-block-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-pending-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "write-btn write-btn--revert", onClick: () => onExecuteCancel?.(command), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "write-btn write-btn--accept", onClick: () => onExecuteAllow?.(command, false), children: "Allow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "write-btn write-btn--accept", onClick: () => onExecuteAllow?.(command, true), children: "Always" })
          ] }) })
        ] }) }, match.index)
      );
      last = blockRe.lastIndex;
      continue;
    }
    parts.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "write-block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-block-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-block-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "write-block-icon", children: type === "replace" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileDiff, { size: 13, strokeWidth: 2 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { size: 13, strokeWidth: 2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "write-block-file write-block-file--clickable",
              onClick: handleFileClick,
              title: type === "replace" ? "View diff" : "Preview file",
              children: fileName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "write-block-type", children: type === "replace" ? "patch" : "write" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "write-block-actions", children: write && write.accepted !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `write-status-pill ${write.accepted ? "pill--accepted" : "pill--reverted"}`, children: write.accepted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10, strokeWidth: 2.5 }),
          " Accepted"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 10, strokeWidth: 2.5 }),
          " Reverted"
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "write-pending-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "write-btn write-btn--revert", onClick: () => onRevert(filePath), children: "Discard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "write-btn write-btn--accept", onClick: () => onAccept(filePath), children: "Apply" })
        ] }) })
      ] }) }, match.index)
    );
    last = blockRe.lastIndex;
  }
  if (last < content.length) {
    parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { text: content.slice(last) }, `text-${last}`));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "msg-content-inner", children: parts });
}
function ChatPanel({
  model,
  models,
  onModelChange,
  rootPath,
  openFile,
  fileContent,
  onWriteFile,
  onRefreshTree,
  onOpenFile,
  onOpenDiff,
  onSessionsChange,
  activeId: activeIdProp,
  onActiveIdChange,
  openFiles,
  activeFile
}) {
  const _dbg = (m2) => console.debug && console.debug(`ChatPanel.effect: ${m2}`);
  const [sessions, setSessions] = reactExports.useState(() => [newSession(1, "agent", rootPath)]);
  const [activeId, setActiveId] = reactExports.useState(sessions[0].id);
  const skipNextActiveSyncRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    _dbg("sync -> onActiveIdChange");
    if (skipNextActiveSyncRef.current) {
      skipNextActiveSyncRef.current = false;
      return;
    }
    if (activeId && onActiveIdChange) {
      onActiveIdChange(activeId);
    }
  }, [activeId, onActiveIdChange]);
  reactExports.useEffect(() => {
    _dbg("prop activeIdProp -> setActiveId");
    if (activeIdProp && activeIdProp !== activeId) {
      skipNextActiveSyncRef.current = true;
      setActiveId(activeIdProp);
    }
  }, [activeIdProp, activeId]);
  reactExports.useEffect(() => {
    _dbg("sync openFiles/activeFile -> session tabs");
    if (activeId && (openFiles || activeFile)) {
      setSessions((prev) => {
        const current = prev.find((s15) => s15.id === activeId);
        if (!current) return prev;
        if (current.messages.length === 0 && current.tabs === void 0 && current.openFile === void 0) {
          return prev;
        }
        const isTabsEqual = JSON.stringify(current.tabs || []) === JSON.stringify(openFiles || []);
        const isFileEqual = current.openFile === activeFile;
        if (isTabsEqual && isFileEqual) return prev;
        return prev.map((s15) => s15.id === activeId ? { ...s15, tabs: openFiles, openFile: activeFile } : s15);
      });
    }
  }, [openFiles, activeFile, activeId]);
  reactExports.useEffect(() => {
    _dbg("sync rootPath -> session.workspace");
    if (activeId && rootPath) {
      setSessions((prev) => {
        const current = prev.find((s15) => s15.id === activeId);
        if (current && current.workspace !== rootPath) {
          return prev.map((s15) => s15.id === activeId ? { ...s15, workspace: rootPath } : s15);
        }
        return prev;
      });
    }
  }, [rootPath, activeId]);
  const [input, setInput] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [statusText, setStatusText] = reactExports.useState("Generando ideas...");
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const [autopilot, setAutopilot] = reactExports.useState(true);
  const autopilotRef = reactExports.useRef(true);
  const bottomRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const modelRef = reactExports.useRef(model);
  reactExports.useEffect(() => {
    modelRef.current = model;
  }, [model]);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editingName, setEditingName] = reactExports.useState("");
  const [historySearch, setHistorySearch] = reactExports.useState("");
  const [showDeleted, setShowDeleted] = reactExports.useState(false);
  const [showForensics, setShowForensics] = reactExports.useState(false);
  const [showModeMenu, setShowModeMenu] = reactExports.useState(false);
  const [backups, setBackups] = reactExports.useState([]);
  const [attachments, setAttachments] = reactExports.useState([]);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const hasLoadedRef = reactExports.useRef(false);
  const startTimeRef = reactExports.useRef(0);
  const [alwaysAllowedCommands, setAlwaysAllowedCommands] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("alwaysAllowedCommands");
      if (stored) return new Set(JSON.parse(stored));
    } catch {
    }
    return /* @__PURE__ */ new Set();
  });
  const [routerRec, setRouterRec] = reactExports.useState(null);
  const [pullingModel, setPullingModel] = reactExports.useState(null);
  const [pullStatus, setPullStatus] = reactExports.useState(null);
  const handlePullModel = async (modelName) => {
    setPullingModel(modelName);
    setPullStatus(`Pulling free open model '${modelName}' from Ollama library...`);
    try {
      if (window.api?.ollamaPullModel) {
        await window.api.ollamaPullModel(modelName);
        setPullStatus(`Successfully pulled '${modelName}'!`);
        if (window.api?.ollamaTags) {
          const updated = await window.api.ollamaTags();
          if (updated && updated.length > 0) {
            onModelChange(modelName);
          }
        }
      }
    } catch (err) {
      setPullStatus(`Pull failed: ${err.message}`);
    } finally {
      setTimeout(() => {
        setPullingModel(null);
        setPullStatus(null);
      }, 5e3);
    }
  };
  reactExports.useEffect(() => {
    _dbg("alwaysAllowedCommands -> save");
    localStorage.setItem("alwaysAllowedCommands", JSON.stringify(Array.from(alwaysAllowedCommands)));
  }, [alwaysAllowedCommands]);
  reactExports.useEffect(() => {
    const loadStoredSessions = async () => {
      try {
        const stored = await window.api.loadSessions();
        if (Array.isArray(stored) && stored.length > 0) {
          const sanitizeSessions = (sessions2) => {
            return sessions2.map((s15) => ({
              ...s15,
              messages: (s15.messages || []).filter((msg) => {
                if (!msg.tool_calls) return true;
                return msg.tool_calls.every((tc2) => {
                  try {
                    if (tc2.function?.arguments && typeof tc2.function.arguments === "string") {
                      JSON.parse(tc2.function.arguments);
                    }
                    return true;
                  } catch {
                    return false;
                  }
                });
              })
            }));
          };
          setSessions(sanitizeSessions(stored));
          setActiveId(stored[0].id);
        }
      } catch (e) {
        console.warn("Failed to load stored sessions:", e);
      }
      hasLoadedRef.current = true;
    };
    loadStoredSessions();
  }, []);
  reactExports.useEffect(() => {
    _dbg("sessions changed -> persistence (compare ignoring lastActive)");
    if (!hasLoadedRef.current) return;
    const stripMeta = (s15) => {
      const { lastActive, ...rest } = s15;
      return rest;
    };
    try {
      const forCompare = sessions.map(stripMeta);
      const jsonNoMeta = JSON.stringify(forCompare);
      if (ChatPanel._lastSentSessionsNoMeta !== jsonNoMeta) {
        try {
          window.api.saveSessions(JSON.stringify(sessions));
        } catch (e) {
          console.warn("Failed to save sessions:", e);
        }
        if (onSessionsChange) {
          try {
            onSessionsChange(sessions);
          } catch (e) {
            console.warn("onSessionsChange threw:", e);
          }
        }
        ;
        ChatPanel._lastSentSessionsNoMeta = jsonNoMeta;
      } else {
        _dbg("sessions change only in meta; skipping parent update");
      }
    } catch (e) {
      try {
        window.api.saveSessions(JSON.stringify(sessions));
      } catch {
      }
      if (onSessionsChange) onSessionsChange(sessions);
    }
  }, [sessions]);
  reactExports.useEffect(() => {
    if (rootPath && sessions.length > 0) {
      const hasEmptyWorkspace = sessions.some((s15) => !s15.workspace);
      if (hasEmptyWorkspace) {
        setSessions((prev) => prev.map((s15) => s15.workspace ? s15 : { ...s15, workspace: rootPath }));
      }
    }
  }, [rootPath, sessions.length]);
  reactExports.useEffect(() => {
    const STATUS_MESSAGES = [
      "Generando ideas...",
      "Pensando...",
      "Uniendo conceptos...",
      "Analizando contexto...",
      "Estructurando respuesta...",
      "Refinando detalles..."
    ];
    let intervalId = null;
    if (loading) {
      let index2 = 0;
      setStatusText(STATUS_MESSAGES[0]);
      intervalId = setInterval(() => {
        index2 = (index2 + 1) % STATUS_MESSAGES.length;
        setStatusText(STATUS_MESSAGES[index2]);
      }, 3e3);
    } else {
      setStatusText(STATUS_MESSAGES[0]);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loading]);
  const activeSession = sessions.find((s15) => s15.id === activeId) ?? sessions[0];
  const messages = Array.isArray(activeSession?.messages) ? activeSession.messages : [];
  const lastMsg = messages.length > 0 ? messages[messages.length - 1] : void 0;
  const isWaitingFirstToken = lastMsg && lastMsg.role === "assistant" && !lastMsg.content;
  reactExports.useEffect(() => {
    _dbg("activeId -> update lastActive");
    const now = Date.now();
    setSessions((prev) => prev.map((s15) => {
      if (s15.id !== activeId) return s15;
      const last = s15.lastActive || 0;
      if (now - last < 2e3) return s15;
      return { ...s15, lastActive: now };
    }));
  }, [activeId]);
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  function setMessages(updater) {
    setSessions((prev) => prev.map((s15) => {
      if (s15.id !== activeId) return s15;
      const prevMsgs = Array.isArray(s15.messages) ? s15.messages : [];
      return { ...s15, messages: updater(prevMsgs), lastActive: Date.now() };
    }));
  }
  function setMode(mode) {
    setSessions((prev) => prev.map((s15) => s15.id === activeId ? { ...s15, mode, lastActive: Date.now() } : s15));
    setShowModeMenu(false);
  }
  function addSession() {
    const nextNum = sessions.length + 1;
    const s15 = newSession(nextNum, "agent", rootPath);
    setSessions((prev) => [...prev, s15]);
    setActiveId(s15.id);
    setInput("");
  }
  async function openForensics() {
    const list = await window.api.listBackups();
    setBackups(list);
    setShowForensics(true);
  }
  async function applyBackup(name) {
    if (!confirm(`Restore history from ${name}? This will overwrite your current active sessions.`)) return;
    const restored = await window.api.restoreBackup(name);
    if (restored) {
      setSessions(restored);
      setActiveId(restored[0].id);
      setShowForensics(false);
      setShowHistory(false);
    }
  }
  function closeSession(id2) {
    setSessions((prev) => {
      const next = prev.map((s15) => s15.id === id2 ? { ...s15, isDeleted: true } : s15);
      const visible = next.filter((s15) => !s15.isDeleted);
      if (visible.length === 0) {
        const s15 = newSession(prev.length + 1);
        setActiveId(s15.id);
        return [...next, s15];
      }
      if (id2 === activeId) {
        setActiveId(visible[visible.length - 1].id);
      }
      return next;
    });
  }
  function clearSession() {
    setSessions((prev) => prev.map((s15) => s15.id === activeId ? { ...s15, messages: [], lastActive: Date.now() } : s15));
  }
  function startRename(id2, name) {
    setEditingId(id2);
    setEditingName(name);
  }
  function saveRename() {
    if (!editingId) return;
    setSessions((prev) => prev.map((s15) => s15.id === editingId ? { ...s15, name: editingName.trim() || s15.name } : s15));
    setEditingId(null);
  }
  const filteredHistory = sessions.filter((s15) => (showDeleted || !s15.isDeleted) && s15.name.toLowerCase().includes(historySearch.toLowerCase())).sort((a, b2) => b2.lastActive - a.lastActive);
  async function buildSystemPrompt(activeMcpTools, mode) {
    const sessionMode = activeSession.mode;
    let sys = `You are an expert agentic coding assistant.`;
    if (sessionMode === "ask") {
      sys += `

[MODE: ASK]
You are in Q&A mode. Your goal is to explain concepts, answer questions, and help the user understand their code.

⛔ STRICTLY FORBIDDEN in ASK mode:
- Do NOT output any file modifications (no write: or replace: blocks)
- Do NOT execute any commands (no execute blocks)
- Do NOT perform any actions on the project

If you detect that the user's request involves making changes, running commands, or performing tasks:
1. Explain what would need to be done conceptually
2. Explicitly suggest: "Switch to **Agent** mode to implement these changes" or "Switch to **Plan** mode to create a detailed plan first"

If you provide code examples, use standard markdown code blocks (e.g., \`\`\`js) without any 'write:', 'replace:', or 'execute' prefixes.`;
    } else if (sessionMode === "plan") {
      const planFile = `plans/PLAN-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
      sys += ` You are in PLANNING mode. Your ONLY output must be a structured requirements and implementation plan written to a markdown file.

⛔ STRICTLY FORBIDDEN:
- Do NOT write, modify, or replace ANY source code files (.ts, .tsx, .js, .py, .css, etc.)
- Do NOT use replace: blocks under any circumstance
- Do NOT execute any commands (no execute blocks)
- Do NOT suggest the user manually make changes
- Do NOT implement anything

✅ YOUR ONLY ALLOWED OUTPUT:
Write the complete plan to a single markdown file using this exact format:
\`\`\`write:${planFile}
# Plan: [Feature/Task Name]

## Overview
[2-3 sentence summary of what will be built and why]

## Requirements
### Functional Requirements
- FR-1: ...
- FR-2: ...

### Non-Functional Requirements
- NFR-1: ...

## Technical Approach
[Architecture decisions, technology choices, patterns to use]

## Implementation Steps
1. **Step name** — description, files affected: \`path/to/file.ts\`
2. **Step name** — description, files affected: \`path/to/file.ts\`
...

## Edge Cases & Risks
- Risk 1: description + mitigation

## Open Questions
- [ ] Question that needs clarification before implementation
\`\`\`

After writing the plan file, briefly summarize what you've planned in 1-2 sentences. The user can then review PLAN.md and switch to Agent mode to implement it.`;
    } else {
      sys += ` You have DIRECT WRITE ACCESS to the user's project files. You are NOT a chatbot — you are an autonomous coding agent that writes files.`;
      if (sessionMode === "agent") {
        sys += `

[MODE: AGENT]
In AGENT mode, when asked to implement changes, you MUST produce file edits using only action blocks like write:, replace:, or execute:. Do NOT answer with plain text suggestions alone.`;
      } else if (sessionMode === "debug") {
        sys += `

[MODE: DEBUG]
In DEBUG mode, analyze logs, diagnose the issue, and provide clear hypotheses. Do NOT make direct file edits unless explicitly instructed.`;
      } else if (sessionMode === "multitask") {
        sys += `

[MODE: MULTITASK]
In MULTITASK mode, coordinate changes across multiple files while still using exact action block syntax for edits.`;
      }
      sys += `

⚠️ When making code changes in AGENT mode, always output actionable file operations using exact action blocks:
- write:path/to/file for new files
- replace:path/to/file for edits
- execute for shell commands

⚠️ CRITICAL OUTPUT RULES — YOU MUST FOLLOW THESE EXACTLY:

1. NEVER use standard markdown code blocks like \`\`\`python or \`\`\`js to show code. Those do NOTHING.
2. To CREATE a new file, you MUST use this EXACT format (the file will be written to disk automatically):

\`\`\`write:path/to/file.py
# full file content here
\`\`\`

3. To EDIT an existing file, you MUST use this EXACT format:

\`\`\`replace:path/to/file.py
<<<<
exact lines to remove
====
new lines to insert
>>>>
\`\`\`

EXAMPLE — if asked to create app.py:
\`\`\`write:app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'
\`\`\`

EXAMPLE — if asked to add a route to existing app.py:
\`\`\`replace:app.py
<<<<
@app.route('/')
def hello():
    return 'Hello World'
====
@app.route('/')
def hello():
    return 'Hello World'

@app.route('/health')
def health():
    return 'OK'
>>>>
\`\`\`

4. To EXECUTE a background terminal command, use this EXACT format:

\`\`\`execute
npm install
\`\`\`

⚠️ CRITICAL EXECUTION RULES:
- You may only emit ONE execute block per response. After emitting it, STOP and wait for the result.
- Do NOT list multiple execute blocks in the same message.
- After receiving the command result, you may then emit the next execute block if needed.
- This is a sequential workflow: propose one action → wait for approval/result → propose the next.

Rules:
- Use RELATIVE paths from the project root.
- Write ALL files immediately — do not ask for permission.
- The <<<< section must match the existing file content EXACTLY.
- After writing files, briefly explain what you did.`;
    }
    if (sessionMode === "debug") {
      sys += `

[MODE: DEBUG] Analyze logs and hypothesize root causes.`;
    } else if (sessionMode === "multitask") {
      sys += `

[MODE: MULTITASK] Optimized for many file changes at once.`;
    }
    if (!rootPath) {
      if (openFile) sys += `

Open file: ${openFile}
\`\`\`
${fileContent.slice(0, 4e3)}
\`\`\``;
      return sys;
    }
    sys += `

⚠️ PROJECT ROOT (all file paths MUST be relative to this directory): ${rootPath}`;
    sys += `
✅ CORRECT: \`\`\`write:src/app.py  — resolves to ${rootPath}/src/app.py`;
    sys += `
❌ WRONG: absolute paths, paths starting with /tmp, or paths outside the project root`;
    sys += buildMcpToolGuidance(activeMcpTools);
    try {
      const IGNORE = ["node_modules", ".git", "dist", "out", ".next", "__pycache__", ".venv", "venv"];
      const files = await window.api.listFiles(rootPath);
      const filtered = files.filter((f2) => !IGNORE.some((ig2) => f2.includes(`/${ig2}/`) || f2.includes(`/${ig2}`)));
      sys += `

Project files:
${filtered.map((f2) => f2.replace(rootPath + "/", "")).slice(0, 150).join("\n")}`;
    } catch {
    }
    if (openFile) {
      const rel = openFile.replace(rootPath + "/", "");
      sys += `

Currently open file (${rel}):
\`\`\`
${fileContent.slice(0, 3e3)}
\`\`\``;
    }
    try {
      const repoMems = rootPath ? await window.api.memory.query("", "repo", 5) : [];
      const userMems = await window.api.memory.query("", "user", 5);
      const merged = [...repoMems || [], ...userMems || []].slice(0, 8);
      if (merged.length > 0) {
        const lines = merged.map((m2) => `- ${String(m2.text || m2.content || "").replace(/\s+/g, " ").slice(0, 200)}`);
        sys += `

[MEMORY]
${lines.join("\n")}`;
      }
    } catch (e) {
    }
    return sys;
  }
  async function executeAndReply(command, getMsgIdx, execIdx) {
    if (!rootPath) return;
    const res = await window.api.execCommand(rootPath, command);
    setMessages((prev) => {
      const idx = getMsgIdx(prev);
      let updatedMsgs = prev;
      if (idx !== -1) {
        updatedMsgs = prev.map((m2, i) => i === idx ? {
          ...m2,
          executes: m2.executes?.map((ex, j2) => j2 === execIdx ? {
            ...ex,
            status: res.success ? "completed" : "error",
            output: res.stdout,
            error: res.error || res.stderr
          } : ex)
        } : m2);
      }
      const outputText = res.success ? res.stdout?.trim() ? `Command \`${command}\` executed successfully.

Output:
\`\`\`
${res.stdout.trim()}
\`\`\`` : `Command \`${command}\` executed successfully without output.` : `Command \`${command}\` failed.

Error: ${res.error}

Stderr:
\`\`\`
${res.stderr?.trim() || "(no output)"}
\`\`\``;
      const newHistory = [...updatedMsgs, { role: "user", content: outputText, isToolOutput: true }];
      setTimeout(() => send(newHistory), 0);
      return updatedMsgs;
    });
  }
  async function send(overrideHistory) {
    let currentModel = modelRef.current || model;
    if (!overrideHistory && (!input.trim() || loading || !currentModel)) return;
    let history;
    if (overrideHistory) {
      history = overrideHistory;
      setMessages(() => history);
    } else {
      const userMsg = {
        role: "user",
        content: input.trim(),
        images: attachments.length > 0 ? attachments.map((a) => a.base64) : void 0
      };
      history = [...messages, userMsg];
      setMessages(() => history);
      console.debug && console.debug("ChatPanel.send: queued history", history);
      setInput("");
      setAttachments([]);
      try {
        const scope = rootPath ? "repo" : "user";
        window.api.memory.store({ scope, text: userMsg.content, meta: { sessionId: activeId } }).catch(() => {
        });
      } catch (e) {
      }
    }
    setLoading(true);
    setSessions((prev) => prev.map((s15) => s15.id === activeId ? { ...s15, workspace: s15.workspace || rootPath } : s15));
    startTimeRef.current = Date.now();
    let activeMcpTools = [];
    try {
      const servers = await window.api.mcpGetServers();
      activeMcpTools = servers.filter((s15) => s15.status === "connected").flatMap((s15) => (s15.tools || []).map((t2) => ({
        serverName: s15.name,
        name: t2.name,
        description: t2.description,
        inputSchema: t2.inputSchema
      })));
    } catch (e) {
      console.warn("Failed to retrieve MCP tools:", e);
    }
    const latestUserText = [...history].reverse().find((msg) => msg.role === "user")?.content || "";
    if (window.api?.modelRouterSelect) {
      try {
        const fallback = currentModel === "auto" ? models[0] : currentModel;
        const rec = await window.api.modelRouterSelect(latestUserText, models, fallback);
        if (rec) {
          setRouterRec(rec);
          if (currentModel === "auto" || !currentModel) {
            currentModel = rec.selectedModel || fallback || "llama3.1:latest";
          }
        }
      } catch (e) {
        console.warn("Model router error:", e);
      }
    }
    if (currentModel === "auto") currentModel = models[0] || "llama3.1:latest";
    const { tools: filteredMcpTools } = filterMcpToolsForIntent(activeMcpTools, latestUserText);
    const ollamaTools = filteredMcpTools.map((t2) => ({
      type: "function",
      function: {
        name: `mcp__${t2.serverName}__${t2.name}`,
        description: t2.description,
        parameters: t2.inputSchema
      }
    }));
    try {
      const systemPrompt = await buildSystemPrompt(filteredMcpTools);
      const sanitizeMessages = (msgs) => {
        return msgs.filter((msg) => {
          if (!msg.tool_calls) return true;
          return msg.tool_calls.every((tc2) => {
            try {
              if (tc2.function?.arguments) {
                const args = tc2.function.arguments;
                if (typeof args === "string") JSON.parse(args);
              }
              return true;
            } catch {
              return false;
            }
          });
        }).map((msg) => {
          if (msg.content && typeof msg.content === "string") {
            return { ...msg, content: msg.content.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "") };
          }
          return msg;
        });
      };
      const chatMessages = [
        { role: "system", content: systemPrompt },
        ...sanitizeMessages(history.map((msg) => {
          if (msg.role === "user") {
            if (msg.images) {
              return {
                role: msg.role,
                content: msg.content,
                images: msg.images.map((img) => img.includes(",") ? img.split(",")[1] : img)
              };
            }
            return { role: msg.role, content: msg.content };
          }
          if (msg.role === "assistant") {
            const out = { role: msg.role, content: msg.content };
            if (msg.tool_calls) out.tool_calls = msg.tool_calls;
            return out;
          }
          if (msg.role === "tool") {
            return {
              role: "tool",
              name: msg.name,
              tool_call_id: msg.tool_call_id,
              content: msg.content
            };
          }
          return { role: msg.role, content: msg.content };
        }))
      ];
      let assistantText = "";
      const activeIdAtSend = activeId;
      let processedUpTo = 0;
      const streamWrites = [];
      const streamExecutes = [];
      let promptTokens = 0;
      let responseTokens = 0;
      let toolCalls = [];
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      const normalizeStreamLine = (rawLine) => {
        const line = rawLine.replace(/\r$/, "").trim();
        if (!line) return "";
        if (line === "[DONE]") return "";
        if (line.startsWith("data:")) {
          return line.slice(5).trim();
        }
        return line;
      };
      const getChatContent = (json) => {
        if (json.message?.content) return json.message.content;
        if (Array.isArray(json.choices) && json.choices.length > 0) {
          const first = json.choices[0];
          if (first.delta?.content) return first.delta.content;
          if (first.message?.content) return first.message.content;
          if (typeof first.text === "string") return first.text;
        }
        if (typeof json.text === "string") return json.text;
        if (typeof json.content === "string") return json.content;
        return void 0;
      };
      const processOllamaJson = async (json) => {
        if (json.prompt_eval_count) promptTokens = json.prompt_eval_count;
        if (json.eval_count) responseTokens = json.eval_count;
        const deltaToolCalls = json.choices?.[0]?.delta?.tool_calls || json.message?.tool_calls;
        if (deltaToolCalls) {
          for (const tc2 of deltaToolCalls) {
            const idx = tc2.index ?? toolCalls.length;
            if (!toolCalls[idx]) {
              toolCalls[idx] = { id: tc2.id, type: "function", function: { name: "", arguments: "" } };
            }
            if (tc2.id) toolCalls[idx].id = tc2.id;
            if (tc2.function?.name) toolCalls[idx].function.name += tc2.function.name;
            if (tc2.function?.arguments) {
              if (typeof tc2.function.arguments === "string") {
                toolCalls[idx].function.arguments += tc2.function.arguments;
              } else {
                toolCalls[idx].function.arguments = JSON.stringify(tc2.function.arguments);
              }
            }
          }
        }
        const content = getChatContent(json);
        if (!content) return;
        assistantText += content;
        setSessions((prev) => prev.map((s15) => {
          if (s15.id !== activeIdAtSend) return s15;
          const msgs = [...s15.messages];
          msgs[msgs.length - 1] = { role: "assistant", content: assistantText };
          return { ...s15, messages: msgs };
        }));
        const blockRe = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g;
        blockRe.lastIndex = processedUpTo;
        let m2;
        while ((m2 = blockRe.exec(assistantText)) !== null) {
          processedUpTo = m2.index + m2[0].length;
          const type = m2[1];
          const filePath = m2[2] ? decodeURIComponent(m2[2].trim()) : "";
          const blockContent = m2[3];
          if (!rootPath) continue;
          if (type === "execute") {
            if (activeSession.mode === "ask" || activeSession.mode === "plan") continue;
            if (streamExecutes.length > 0) continue;
            const command = blockContent.trim();
            if (command && rootPath) {
              let status = "pending";
              if (alwaysAllowedCommands.has(command)) status = "running";
              streamExecutes.push({ command, status });
            }
            continue;
          }
          if (activeSession.mode === "ask") continue;
          const isPlanMode = activeSession.mode === "plan";
          const isPlanFile = filePath.endsWith(".md") && (filePath.startsWith("plans/") || filePath.includes("PLAN"));
          if (isPlanMode && !isPlanFile) continue;
          if (isPlanMode && type === "replace") continue;
          const abs = filePath.startsWith(rootPath) ? filePath : joinPath(rootPath, filePath.replace(/^\//, ""));
          let prevContent;
          try {
            prevContent = await window.api.readFile(abs);
          } catch {
          }
          let finalContent = blockContent;
          if (type === "replace" && prevContent) {
            const parts = blockContent.split("====");
            if (parts.length === 2) {
              const target = parts[0].replace("<<<<\n", "").replace("<<<<\r\n", "").trimEnd();
              const replacement = parts[1].replace("\n>>>>", "").replace("\r\n>>>>", "").replace(">>>>", "").trimStart();
              const normalizedPrev = prevContent.replace(/\r\n/g, "\n");
              const normalizedTarget = target.replace(/\r\n/g, "\n");
              const normalizedReplacement = replacement.replace(/\r\n/g, "\n");
              if (normalizedPrev.includes(normalizedTarget)) {
                finalContent = normalizedPrev.replace(normalizedTarget, normalizedReplacement);
              } else {
                finalContent = prevContent.replace(target, replacement);
              }
            }
          }
          if (autopilotRef.current) {
            await window.api.writeFile(abs, finalContent);
            if (openFile && abs === openFile) onWriteFile(finalContent);
            onRefreshTree();
            if (isPlanMode && isPlanFile && onOpenFile) onOpenFile(abs);
          }
          streamWrites.push({ path: abs, content: finalContent, accepted: autopilotRef.current ? null : null, prevContent });
        }
      };
      const processBodyLines = async (body) => {
        const lines = body.split(/\r?\n/);
        for (const rawLine of lines) {
          const line = normalizeStreamLine(rawLine);
          if (!line) continue;
          try {
            const json = JSON.parse(line);
            await processOllamaJson(json);
          } catch {
          }
        }
      };
      const tryParseFullJson = async (body) => {
        try {
          const json = JSON.parse(body);
          await processOllamaJson(json);
          return true;
        } catch {
          return false;
        }
      };
      const chatPayload = {
        model: currentModel,
        stream: true,
        messages: chatMessages
      };
      if (ollamaTools.length > 0) {
        chatPayload.tools = ollamaTools;
      }
      if (window.api && typeof window.api.ollamaChat === "function") {
        const body = await ollamaChatWithTimeout(chatPayload, 12e4);
        const text = String(body || "");
        await processBodyLines(text);
        if (!assistantText) {
          await tryParseFullJson(text);
        }
      } else {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12e4);
        const res = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chatPayload),
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`Ollama error: ${res.status}`);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let newlineIndex = buffer.indexOf("\n");
          while (newlineIndex !== -1) {
            const line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);
            const normalized = normalizeStreamLine(line);
            if (normalized) {
              try {
                const json = JSON.parse(normalized);
                await processOllamaJson(json);
              } catch {
              }
            }
            newlineIndex = buffer.indexOf("\n");
          }
        }
        if (buffer.trim()) {
          const normalized = normalizeStreamLine(buffer);
          if (normalized) {
            try {
              const json = JSON.parse(normalized);
              await processOllamaJson(json);
            } catch {
            }
          }
        }
      }
      if (toolCalls.length === 0) {
        const plainTextToolCalls = parsePlainTextToolCalls(assistantText);
        if (plainTextToolCalls.length > 0) {
          toolCalls.push(...plainTextToolCalls.map((tc2) => ({
            id: `call_${Math.random().toString(36).substr(2, 9)}`,
            type: "function",
            function: {
              name: tc2.name,
              arguments: tc2.arguments
            }
          })));
          assistantText = "";
        }
      }
      if (toolCalls.length > 0) {
        const resolvedToolCalls = toolCalls.map((tc2) => {
          let parsedArgs = {};
          try {
            if (tc2.function.arguments) {
              parsedArgs = typeof tc2.function.arguments === "string" ? JSON.parse(tc2.function.arguments) : tc2.function.arguments;
            }
          } catch (e) {
            console.error("Failed to parse tool arguments:", tc2.function.arguments, e);
          }
          return {
            id: tc2.id || `call_${Math.random().toString(36).substr(2, 9)}`,
            type: "function",
            function: {
              name: tc2.function.name,
              arguments: JSON.stringify(parsedArgs)
            }
          };
        });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText || `Using ${resolvedToolCalls.length} tool${resolvedToolCalls.length === 1 ? "" : "s"}...`,
            tool_calls: resolvedToolCalls,
            model: currentModel,
            elapsed: Math.round((Date.now() - startTimeRef.current) / 1e3)
          };
          return updated;
        });
        const nextMessages = [...history, {
          role: "assistant",
          content: assistantText || `Using ${resolvedToolCalls.length} tool${resolvedToolCalls.length === 1 ? "" : "s"}...`,
          tool_calls: resolvedToolCalls
        }];
        for (const tc2 of resolvedToolCalls) {
          const match = tc2.function.name.match(/^mcp__([a-zA-Z0-9_-]+)__(.+)$/);
          let resultText = "";
          if (match) {
            const serverName = match[1];
            const toolName = match[2];
            const args = JSON.parse(tc2.function.arguments || "{}");
            setMessages((prev) => [...prev, {
              role: "tool",
              name: tc2.function.name,
              content: `Executing ${serverName}.${toolName}...`,
              tool_call_id: tc2.id,
              toolStatus: "running"
            }]);
            try {
              const res = await callMcpToolWithTimeout(serverName, toolName, args);
              resultText = typeof res === "string" ? res : JSON.stringify(res, null, 2);
              try {
                const parsedRes = typeof res === "string" ? JSON.parse(res) : res;
                if (parsedRes && Array.isArray(parsedRes.content)) {
                  resultText = parsedRes.content.map((c) => c.text || c.value || "").filter(Boolean).join("\n");
                } else if (parsedRes && typeof parsedRes.text === "string") {
                  resultText = parsedRes.text;
                }
              } catch {
              }
              const MAX_TOOL_RESULT = 12e3;
              if (resultText.length > MAX_TOOL_RESULT) {
                resultText = resultText.slice(0, MAX_TOOL_RESULT) + `

[... truncated ${resultText.length - MAX_TOOL_RESULT} chars ...]`;
              }
            } catch (err) {
              resultText = `Error calling tool: ${err.message || String(err)}`;
            }
          } else {
            resultText = `Error: Tool name format invalid. Expected prefix mcp__`;
          }
          const toolMsg = {
            role: "tool",
            name: tc2.function.name,
            content: resultText,
            tool_call_id: tc2.id,
            toolStatus: "completed"
          };
          nextMessages.push(toolMsg);
        }
        setMessages(() => nextMessages);
        setLoading(false);
        setTimeout(() => send(nextMessages), 500);
        return;
      }
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1e3);
      if (!assistantText.trim() && streamWrites.length === 0 && streamExecutes.length === 0) {
        assistantText = "The model returned no visible text output.";
      }
      const blocks = streamWrites.length > 0 || streamExecutes.length > 0 ? { writes: streamWrites, executes: streamExecutes } : await processBlocks(assistantText);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          writes: blocks.writes,
          executes: blocks.executes,
          elapsed,
          promptTokens,
          responseTokens,
          model: currentModel
        };
        return updated;
      });
      blocks.executes.forEach((ex, idx) => {
        if (ex.status === "running" && rootPath) {
          executeAndReply(ex.command, (updated) => updated.length - 1, idx);
        }
      });
      if (activeSession.name.startsWith("Session ") && history.length >= 1) {
        generateSessionTitle(activeIdAtSend, [...history, { role: "assistant", content: assistantText }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${String(err)}` }]);
    } finally {
      setLoading(false);
    }
  }
  async function generateSessionTitle(sessionId, msgs) {
    const normalizeStreamLine = (rawLine) => {
      const line = rawLine.replace(/\r$/, "").trim();
      if (!line || line === "[DONE]") return "";
      if (line.startsWith("data:")) return line.slice(5).trim();
      return line;
    };
    const getChatContent = (json) => {
      if (json.message?.content) return json.message.content;
      if (Array.isArray(json.choices) && json.choices.length > 0) {
        const first = json.choices[0];
        if (first.delta?.content) return first.delta.content;
        if (first.message?.content) return first.message.content;
        if (typeof first.text === "string") return first.text;
      }
      if (typeof json.text === "string") return json.text;
      if (typeof json.content === "string") return json.content;
      return void 0;
    };
    const extractTitle = (text) => {
      try {
        const json = JSON.parse(text);
        return getChatContent(json)?.trim() ?? null;
      } catch {
        return null;
      }
    };
    const findTitleInBody = (body) => {
      const lines = body.split(/\r?\n/);
      for (const rawLine of lines) {
        const line = normalizeStreamLine(rawLine);
        if (!line) continue;
        const maybe = extractTitle(line);
        if (maybe) return maybe;
      }
      return null;
    };
    try {
      if (window.api && typeof window.api.ollamaChat === "function") {
        const body = await window.api.ollamaChat({ model, stream: false, messages: [{ role: "system", content: "Summarize the conversation into a 3-5 word title. ONLY the title. No quotes, no markdown, no prefixes." }, ...msgs.slice(-2)] });
        const text2 = String(body || "");
        const rawTitle2 = findTitleInBody(text2) ?? extractTitle(text2);
        if (rawTitle2) {
          const title = rawTitle2.replace(/^['"]|['"]$/g, "").replace(/\*/g, "");
          setSessions((prev) => prev.map((s15) => s15.id === sessionId ? { ...s15, name: title } : s15));
          return;
        }
      }
      const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, stream: false, messages: [{ role: "system", content: "Summarize the conversation into a 3-5 word title. ONLY the title. No quotes, no markdown, no prefixes." }, ...msgs.slice(-2)] })
      });
      if (!res.ok) throw new Error("API failed");
      const text = await res.text();
      const rawTitle = findTitleInBody(text) ?? extractTitle(text);
      if (rawTitle) {
        const title = rawTitle.replace(/^['"]|['"]$/g, "").replace(/\*/g, "");
        setSessions((prev) => prev.map((s15) => s15.id === sessionId ? { ...s15, name: title } : s15));
        return;
      }
    } catch (err) {
      console.error("Auto-naming failed:", err);
    }
    const userMsg = msgs.find((m2) => m2.role === "user");
    if (userMsg) {
      const words = userMsg.content.trim().split(/\s+/).slice(0, 4).join(" ");
      const fallbackTitle = words + (userMsg.content.length > words.length ? "..." : "");
      setSessions((prev) => prev.map((s15) => s15.id === sessionId ? { ...s15, name: fallbackTitle } : s15));
    }
  }
  function joinPath(base, rel) {
    return base.replace(/\/$/, "") + "/" + rel.replace(/^\//, "");
  }
  async function processBlocks(text) {
    const re2 = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g;
    let match;
    const writes = [];
    const executes = [];
    const isPlanMode = activeSession.mode === "plan";
    while ((match = re2.exec(text)) !== null) {
      const type = match[1];
      const filePath = match[2] ? decodeURIComponent(match[2].trim()) : "";
      const blockContent = match[3];
      if (type === "execute") {
        if (activeSession.mode === "ask" || activeSession.mode === "plan") continue;
        if (executes.length > 0) continue;
        const command = blockContent.trim();
        if (command && rootPath) {
          let status = "pending";
          if (alwaysAllowedCommands.has(command)) status = "running";
          executes.push({ command, status });
        }
        continue;
      }
      if (!rootPath) continue;
      if (activeSession.mode === "ask") continue;
      const isPlanFile = filePath.endsWith(".md") && (filePath.startsWith("plans/") || filePath.includes("PLAN"));
      if (isPlanMode && !isPlanFile) continue;
      if (isPlanMode && type === "replace") continue;
      const abs = filePath.startsWith(rootPath) ? filePath : joinPath(rootPath, filePath.replace(/^\//, ""));
      let prevContent;
      try {
        prevContent = await window.api.readFile(abs);
      } catch {
      }
      let finalContent = blockContent;
      if (type === "replace" && prevContent) {
        const parts = blockContent.split("====");
        if (parts.length === 2) {
          const target = parts[0].replace("<<<<\n", "").replace("<<<<\r\n", "").trimEnd();
          const replacement = parts[1].replace("\n>>>>", "").replace("\r\n>>>>", "").replace(">>>>", "").trimStart();
          const normalizedPrev = prevContent.replace(/\r\n/g, "\n");
          const normalizedTarget = target.replace(/\r\n/g, "\n");
          const normalizedReplacement = replacement.replace(/\r\n/g, "\n");
          if (normalizedPrev.includes(normalizedTarget)) {
            finalContent = normalizedPrev.replace(normalizedTarget, normalizedReplacement);
          } else {
            finalContent = prevContent.replace(target, replacement);
          }
        }
      }
      if (autopilotRef.current) {
        await window.api.writeFile(abs, finalContent);
        if (openFile && abs === openFile) onWriteFile(finalContent);
        if (isPlanMode && isPlanFile && onOpenFile) onOpenFile(abs);
      }
      writes.push({ path: abs, content: finalContent, accepted: null, prevContent });
    }
    if (writes.length > 0) onRefreshTree();
    return { writes, executes };
  }
  async function handleAccept(msgIdx, filePath) {
    const write = messages[msgIdx].writes?.find((w2) => w2.path.endsWith(filePath) || w2.path === filePath);
    if (!write) return;
    if (!autopilot) {
      await window.api.writeFile(write.path, write.content);
      if (openFile && write.path === openFile) onWriteFile(write.content);
      onRefreshTree();
    }
    setMessages((prev) => prev.map((m2, i) => i === msgIdx ? {
      ...m2,
      writes: m2.writes?.map((w2) => w2.path === write.path ? { ...w2, accepted: true } : w2)
    } : m2));
  }
  async function handleRevert(msgIdx, filePath) {
    const write = messages[msgIdx].writes?.find((w2) => w2.path.endsWith(filePath) || w2.path === filePath);
    if (!write || write.prevContent === void 0) return;
    await window.api.writeFile(write.path, write.prevContent);
    if (openFile && write.path === openFile) onWriteFile(write.prevContent);
    onRefreshTree();
    setMessages((prev) => prev.map((m2, i) => i === msgIdx ? {
      ...m2,
      writes: m2.writes?.map((w2) => w2.path === write.path ? { ...w2, accepted: false } : w2)
    } : m2));
  }
  function handleExecuteAllow(msgIdx, execIdx, command, always) {
    if (always) {
      setAlwaysAllowedCommands((prev) => /* @__PURE__ */ new Set([...prev, command]));
    }
    setMessages((prev) => prev.map((m2, i) => i === msgIdx ? {
      ...m2,
      executes: m2.executes?.map((ex, j2) => j2 === execIdx ? { ...ex, status: "running" } : ex)
    } : m2));
    executeAndReply(command, (msgs) => msgIdx, execIdx);
  }
  function handleExecuteCancel(msgIdx, execIdx) {
    setMessages((prev) => prev.map((m2, i) => i === msgIdx ? {
      ...m2,
      executes: m2.executes?.map((ex, j2) => j2 === execIdx ? { ...ex, status: "error", error: "Cancelled by user" } : ex)
    } : m2));
  }
  function processFile(file) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result;
        setAttachments((prev) => [...prev, { name: file.name, base64, type: file.type }]);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setInput((prev) => prev + `
\`\`\`${file.name}
${ev.target?.result}
\`\`\``);
      };
      reader.readAsText(file);
    }
  }
  function handleFileAttach(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    e.target.value = "";
  }
  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }
  function handleDragLeave() {
    setIsDragging(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        processFile(files[i]);
      }
    }
  }
  function handlePaste(e) {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        if (file) {
          processFile(file);
        }
      }
    }
  }
  function removeAttachment(index2) {
    setAttachments((prev) => prev.filter((_2, i) => i !== index2));
  }
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }
  function injectQuickPrompt(prompt) {
    setInput(prompt);
    setTimeout(() => inputRef.current?.focus(), 0);
  }
  async function callMcpToolWithTimeout(serverName, toolName, args, timeoutMs = 9e4) {
    return await Promise.race([
      window.api.mcpCallTool(serverName, toolName, args),
      new Promise((_2, reject) => {
        setTimeout(() => reject(new Error(`Tool ${serverName}.${toolName} timed out after ${Math.round(timeoutMs / 1e3)}s`)), timeoutMs);
      })
    ]);
  }
  async function ollamaChatWithTimeout(chatPayload, timeoutMs = 12e4) {
    if (!window.api || typeof window.api.ollamaChat !== "function") return "";
    return await Promise.race([
      window.api.ollamaChat(chatPayload),
      new Promise((_2, reject) => {
        setTimeout(
          () => reject(new Error(`Ollama request timed out after ${Math.round(timeoutMs / 1e3)}s`)),
          timeoutMs
        );
      })
    ]);
  }
  function buildVisualPrompt(kind) {
    if (kind === "diagram") {
      if (openFile && rootPath) {
        const rel = openFile.replace(rootPath + "/", "");
        return `Generate a diagram directly from my IDE using Figma. Prefer the Figma diagram-generation workflow, not raw file data tools.

Use the current file \`${rel}\` as context and create a user flow or architecture-style diagram based on its functionality. Summarize the result briefly after creating it.`;
      }
      return `Generate a diagram directly from my IDE using Figma. Prefer the Figma diagram-generation workflow, not raw file data tools.

Create a user flow or architecture-style diagram from the current project context, and summarize the result briefly after creating it.`;
    }
    if (kind === "screen") {
      if (openFile && rootPath) {
        const rel = openFile.replace(rootPath + "/", "");
        return `Create a screen directly from my IDE using Figma. Prefer Figma screen/design-generation tools, not raw file data tools.

Use the current file \`${rel}\` as the source of truth. Reuse the design system if available, then generate the most appropriate screen or component and summarize what you created.`;
      }
      return `Create a screen directly from my IDE using Figma. Prefer Figma screen/design-generation tools, not raw file data tools.

Use the current workspace context, reuse the design system if available, and summarize what you created.`;
    }
    if (openFile && rootPath) {
      const rel = openFile.replace(rootPath + "/", "");
      return `Send the current file to Figma from my IDE.

Use \`${rel}\` as the source and decide whether it should become a screen or a diagram. Prefer the correct Figma generation workflow, reuse the design system if available, and summarize the result briefly.`;
    }
    return `Send the current project context to Figma from my IDE.

Decide whether the best output is a screen or a diagram, use the correct Figma generation workflow, and summarize the result briefly.`;
  }
  function isModelMultimodal(name) {
    if (!name) return false;
    const n2 = name.toLowerCase();
    return n2.includes("llava") || n2.includes("vision") || n2.includes("vl") || n2.includes("moondream") || n2.includes("minicpm");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "chat-panel",
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      children: [
        isDragging && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-dropzone-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-dropzone-box", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 32, className: "chat-dropzone-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chat-dropzone-text", children: [
            "Drop images or text files here",
            !isModelMultimodal(model) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#ffd685", marginTop: "6px", fontSize: "11px", fontWeight: "normal" }, children: [
              "⚠️ Model ",
              model,
              " may not support images"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "session-tabs", children: sessions.filter((s15) => !s15.isDeleted).map((s15) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `session-tab ${s15.id === activeId ? "session-tab--active" : ""}`,
              onClick: () => setActiveId(s15.id),
              onDoubleClick: () => startRename(s15.id, s15.name),
              children: [
                editingId === s15.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, className: "session-tab-input", value: editingName, onChange: (e) => setEditingName(e.target.value), onBlur: saveRename, onKeyDown: (e) => e.key === "Enter" && saveRename() }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "session-tab-name", title: s15.name, children: s15.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "session-tab-close", onClick: (e) => {
                  e.stopPropagation();
                  closeSession(s15.id);
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X$1, { size: 10, strokeWidth: 2.5 }) })
              ]
            },
            s15.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-action-btn", onClick: addSession, "data-tooltip": "New Session: Start a clean chat conversation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 2 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-action-btn", onClick: () => setShowHistory((h2) => !h2), "data-tooltip": "Session History: Browse and restore past chat sessions", "data-tooltip-align": "right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 14, strokeWidth: 1.8 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-action-btn", onClick: clearSession, "data-tooltip": "Clear Chat: Reset message history in current session", "data-tooltip-align": "right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, strokeWidth: 1.8 }) })
          ] })
        ] }),
        activeSession.mode === "plan" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "planning-banner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 14, className: "planning-banner-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "planning-banner-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Planning Mode Active:" }),
            " The agent will design a high-level requirements plan inside ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "plans/PLAN-[date].md" }),
            ". Source code modifications are disabled."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-messages", children: [
          messages.map((m2, i) => {
            if (m2.role === "tool") {
              const cleanName = m2.name?.replace(/^mcp__([a-zA-Z0-9_-]+)__/, "") || m2.name || "tool";
              const serverName = m2.name?.match(/^mcp__([a-zA-Z0-9_-]+)__/)?.[1] || "mcp";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg chat-msg--tool", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg-header", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chat-role", style: { color: "#4ec9b0" }, children: [
                    "TOOL (",
                    serverName.toUpperCase(),
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-time", children: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg-bubble chat-msg-bubble--tool", style: { backgroundColor: "rgba(78, 201, 176, 0.04)", border: "1px solid rgba(78, 201, 176, 0.15)", color: "#ccc" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mcp-tool-call-header", style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px", width: "100%" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 12, className: "mcp-tool-call-icon", style: { color: "#4ec9b0", flexShrink: 0 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#aaa" }, children: [
                      "Called ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: cleanName })
                    ] }),
                    m2.toolStatus === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mcp-tool-status mcp-tool-status--running", style: { marginLeft: "auto", background: "rgba(206,145,120,0.1)", color: "#ce9178", padding: "1px 5px", borderRadius: "3px", fontSize: "9px" }, children: "Executing..." }),
                    m2.toolStatus === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mcp-tool-status mcp-tool-status--completed", style: { marginLeft: "auto", background: "rgba(78,201,176,0.1)", color: "#4ec9b0", padding: "1px 5px", borderRadius: "3px", fontSize: "9px" }, children: "Success" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mcp-tool-output-pre", style: { margin: 0, overflowX: "auto", maxHeight: "250px", fontSize: "11px", fontFamily: "monospace", padding: "8px", background: "rgba(0,0,0,0.2)", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.03)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: m2.content }) })
                ] })
              ] }, `msg-${activeId}-${i}`);
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `chat-msg chat-msg--${m2.role} ${m2.isToolOutput ? "chat-msg--tool-output" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg-header", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-role", style: m2.isToolOutput ? { color: "#a8a29e" } : {}, children: m2.isToolOutput ? "TERMINAL" : m2.role.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-time", children: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg-bubble", style: m2.isToolOutput ? { backgroundColor: "#2d2d2d", border: "1px solid #444", color: "#ccc" } : {}, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageContent,
                  {
                    content: m2.content,
                    writes: m2.writes,
                    executes: m2.executes,
                    onAccept: (p2) => handleAccept(i, p2),
                    onRevert: (p2) => handleRevert(i, p2),
                    onOpenDiff,
                    onExecuteAllow: (cmd, always) => handleExecuteAllow(i, m2.executes?.findIndex((e) => e.command === cmd) ?? -1, cmd, always),
                    onExecuteCancel: (cmd) => handleExecuteCancel(i, m2.executes?.findIndex((e) => e.command === cmd) ?? -1)
                  }
                ),
                m2.tool_calls && m2.tool_calls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mcp-tool-calls-container", style: { marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px", width: "100%" }, children: m2.tool_calls.map((tc2, tcIdx) => {
                  const match = tc2.function.name.match(/^mcp__([a-zA-Z0-9_-]+)__(.+)$/);
                  const server = match ? match[1] : "mcp";
                  const tool = match ? match[2] : tc2.function.name;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mcp-tool-call-indicator", style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "5px 8px", borderRadius: "4px", color: "#ccc" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 11, style: { color: "#4ec9b0", flexShrink: 0 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Using tool: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#4fc1ff" }, children: [
                        server,
                        ".",
                        tool
                      ] })
                    ] })
                  ] }, tcIdx);
                }) }),
                m2.images && m2.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-msg-images", children: m2.images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, className: "chat-msg-image", alt: "attachment", onClick: () => window.open(img) }, idx)) }),
                (m2.writes || m2.elapsed) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "msg-meta", children: [
                  m2.writes && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "msg-writes", children: [
                    m2.writes.length,
                    " patches"
                  ] }),
                  m2.elapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "msg-elapsed", children: [
                    m2.elapsed.toFixed(1),
                    "s"
                  ] })
                ] })
              ] })
            ] }, `msg-${activeId}-${i}`);
          }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-msg chat-msg--assistant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-msg-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-role", children: "AGENT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spinner", style: { marginLeft: 8 } }),
            isWaitingFirstToken && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "agent-loading-status", style: { fontSize: "11px", color: "#888", fontStyle: "italic", marginLeft: "12px", opacity: 0.8 }, children: statusText })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-input-container", children: [
          routerRec && !routerRec.isOptimal && routerRec.recommendedModelToPull && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(255, 170, 0, 0.1)",
            border: "1px solid rgba(255, 170, 0, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            margin: "8px 12px 0 12px",
            fontSize: "12px",
            color: "#ffcc00",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "💡 ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "Task Router (",
                routerRec.taskCategory,
                "):"
              ] }),
              " Installed models scored ",
              routerRec.suitabilityScore,
              "/100. Recommended free open model: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: routerRec.recommendedModelToPull })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handlePullModel(routerRec.recommendedModelToPull),
                disabled: pullingModel !== null,
                style: {
                  background: "#007acc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                },
                children: pullingModel === routerRec.recommendedModelToPull ? "Pulling..." : `Pull ${routerRec.recommendedModelToPull}`
              }
            )
          ] }),
          pullStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(0, 122, 204, 0.15)",
            border: "1px solid rgba(0, 122, 204, 0.3)",
            borderRadius: "6px",
            padding: "6px 12px",
            margin: "4px 12px 0 12px",
            fontSize: "11px",
            color: "#4fc3f7"
          }, children: [
            "ℹ️ ",
            pullStatus
          ] }),
          rootPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-workspace-indicator", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-workspace-dot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-workspace-path", title: rootPath, children: rootPath.split("/").pop() })
          ] }),
          !rootPath && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-workspace-indicator chat-workspace-indicator--none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠️ No project folder open — files will not be written" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-input-wrapper", children: [
            attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-attachments-preview", children: [
              attachments.map((att, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-attachment-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: att.base64, alt: att.name, className: "chat-attachment-thumbnail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-attachment-name", title: att.name, children: att.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-attachment-remove", onClick: () => removeAttachment(idx), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X$1, { size: 10, strokeWidth: 2.5 }) })
              ] }, idx)),
              !isModelMultimodal(model) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-attachment-warning", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "⚠️ Model ",
                model,
                " may not support images"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: inputRef,
                className: "chat-input",
                placeholder: "Ask anything, @ to mention...",
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: handleKey,
                onPaste: handlePaste,
                rows: Math.min(10, input.split("\n").length || 1),
                style: { height: "auto" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "chat-action-btn",
                  onClick: () => injectQuickPrompt(buildVisualPrompt("diagram")),
                  "data-tooltip": "Generate Diagram: Create a flow or architecture diagram in Figma",
                  "data-tooltip-position": "top",
                  type: "button",
                  style: { width: "auto", padding: "0 10px", gap: "6px" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 13, strokeWidth: 1.8 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Diagram" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "chat-action-btn",
                  onClick: () => injectQuickPrompt(buildVisualPrompt("screen")),
                  "data-tooltip": "Create Screen: Generate a screen or component in Figma",
                  "data-tooltip-position": "top",
                  type: "button",
                  style: { width: "auto", padding: "0 10px", gap: "6px" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { size: 13, strokeWidth: 1.8 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Screen" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "chat-action-btn",
                  onClick: () => injectQuickPrompt(buildVisualPrompt("current-file")),
                  "data-tooltip": "Send Current File: Use the open file as the source for a Figma visual",
                  "data-tooltip-position": "top",
                  type: "button",
                  style: { width: "auto", padding: "0 10px", gap: "6px" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileDiff, { size: 13, strokeWidth: 1.8 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: openFile ? "From Current File" : "From Workspace" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-input-footer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-action-btn", onClick: () => fileInputRef.current?.click(), "data-tooltip": "Attach File: Select and upload a file or image", "data-tooltip-position": "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 14, strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, style: { display: "none" }, onChange: handleFileAttach }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  className: "chat-select chat-select--mode",
                  value: activeSession.mode,
                  onChange: (e) => setMode(e.target.value),
                  children: AGENT_MODES.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m2, children: m2.toUpperCase() }, m2))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "chat-select chat-select--model",
                  value: model,
                  onChange: (e) => onModelChange(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: "✨ Auto-Select (Smart Router)" }),
                    models.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m2, children: m2 }, m2))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `chat-action-btn ${autopilot ? "active" : ""}`,
                  onClick: () => {
                    const next = !autopilot;
                    setAutopilot(next);
                    autopilotRef.current = next;
                  },
                  "data-tooltip": autopilot ? "Disable Autopilot: Approve agent actions manually" : "Enable Autopilot: Let the agent execute actions autonomously",
                  "data-tooltip-position": "top",
                  "data-tooltip-align": "right",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, strokeWidth: 1.8 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "send-btn", onClick: send, disabled: loading || !input.trim() || !model, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13, strokeWidth: 2 }),
                "Send"
              ] })
            ] })
          ] })
        ] }),
        showHistory && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "session-history-overlay", onClick: () => setShowHistory(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-history", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-history-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                autoFocus: true,
                placeholder: "Search history...",
                value: historySearch,
                onChange: (e) => setHistorySearch(e.target.value),
                className: "history-search"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-header-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "history-action-link", onClick: openForensics, children: "Time Machine" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "history-action-link", onClick: () => setShowDeleted(!showDeleted), children: showDeleted ? "Hide Deleted" : "Show Deleted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chat-action-btn", onClick: () => setShowHistory(false), children: "×" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-list", children: filteredHistory.map((s15) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item", onClick: () => {
            setActiveId(s15.id);
            setShowHistory(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-name", children: s15.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-path", children: new Date(s15.lastActive).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontSize: "10px",
              color: "#888",
              marginLeft: "auto",
              marginRight: "8px",
              fontFamily: "monospace",
              background: "rgba(255, 255, 255, 0.03)",
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "120px"
            }, title: s15.workspace || "No Project", children: s15.workspace ? s15.workspace.split(/[\\/]/).pop() : "No Project" }),
            s15.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item-status", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-tag", children: "Deleted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "history-restore-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setSessions((prev) => prev.map((sess) => sess.id === s15.id ? { ...sess, isDeleted: false } : sess));
                    setActiveId(s15.id);
                    setShowHistory(false);
                  },
                  children: "Restore"
                }
              )
            ] })
          ] }, s15.id)) })
        ] }) }),
        showForensics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "session-history-overlay", onClick: () => setShowForensics(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-history", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-history-header", style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-name", style: { fontWeight: 700, fontSize: "13px" }, children: "Time Machine (Backups)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "history-action-link",
                onClick: () => setShowForensics(false),
                style: { fontSize: "16px", padding: "0 6px", border: "none" },
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 14px", fontSize: "11px", color: "#888", borderBottom: "1px solid #333", lineHeight: "1.4" }, children: [
            "Restore your entire workspace to a previous point in time.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#d4d4d4" }, children: "Warning: Restoring a snapshot will completely overwrite your current active sessions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-list", children: [
            backups.map((b2, index2) => {
              const isObj = b2 && typeof b2 === "object";
              const filename = isObj ? b2.filename : b2;
              const workspaces = isObj ? b2.workspaces : [];
              const summary = isObj ? b2.summary : "Project snapshot";
              const cleanName = filename ? filename.replace("sessions.", "").replace(".json", "") : "";
              const activeProject = rootPath ? rootPath.split(/[\\/]/).pop() : "";
              const pathText = workspaces && workspaces.length > 0 ? `${workspaces.join(", ")} • ${summary}` : activeProject ? `${activeProject} • ${summary}` : summary;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item", onClick: () => applyBackup(filename), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-name", children: cleanName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-path", style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "280px" }, title: pathText, children: pathText })
                ] }),
                index2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-tag", style: { background: "#0e639c", color: "#fff", marginLeft: "auto" }, children: "Latest" })
              ] }, filename);
            }),
            backups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 20, textAlign: "center", color: "#666" }, children: "No backups found" })
          ] })
        ] }) })
      ]
    }
  );
}
/**
 * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * @license MIT
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 */
var zs = Object.defineProperty;
var Rl = Object.getOwnPropertyDescriptor;
var Ll = (s15, t2) => {
  for (var e in t2) zs(s15, e, { get: t2[e], enumerable: true });
};
var M = (s15, t2, e, i) => {
  for (var r2 = i > 1 ? void 0 : i ? Rl(t2, e) : t2, n2 = s15.length - 1, o2; n2 >= 0; n2--) (o2 = s15[n2]) && (r2 = (i ? o2(t2, e, r2) : o2(r2)) || r2);
  return i && r2 && zs(t2, e, r2), r2;
}, S = (s15, t2) => (e, i) => t2(e, i, s15);
var Gs = "Terminal input", mi = { get: () => Gs, set: (s15) => Gs = s15 }, $s = "Too much output to announce, navigate to rows manually to read", _i = { get: () => $s, set: (s15) => $s = s15 };
function Al(s15) {
  return s15.replace(/\r?\n/g, "\r");
}
function kl(s15, t2) {
  return t2 ? "\x1B[200~" + s15 + "\x1B[201~" : s15;
}
function Vs(s15, t2) {
  s15.clipboardData && s15.clipboardData.setData("text/plain", t2.selectionText), s15.preventDefault();
}
function qs(s15, t2, e, i) {
  if (s15.stopPropagation(), s15.clipboardData) {
    let r2 = s15.clipboardData.getData("text/plain");
    Cn(r2, t2, e, i);
  }
}
function Cn(s15, t2, e, i) {
  s15 = Al(s15), s15 = kl(s15, e.decPrivateModes.bracketedPasteMode && i.rawOptions.ignoreBracketedPasteMode !== true), e.triggerDataEvent(s15, true), t2.value = "";
}
function Mn(s15, t2, e) {
  let i = e.getBoundingClientRect(), r2 = s15.clientX - i.left - 10, n2 = s15.clientY - i.top - 10;
  t2.style.width = "20px", t2.style.height = "20px", t2.style.left = `${r2}px`, t2.style.top = `${n2}px`, t2.style.zIndex = "1000", t2.focus();
}
function Pn(s15, t2, e, i, r2) {
  Mn(s15, t2, e), r2 && i.rightClickSelect(s15), t2.value = i.selectionText, t2.select();
}
function Ce(s15) {
  return s15 > 65535 ? (s15 -= 65536, String.fromCharCode((s15 >> 10) + 55296) + String.fromCharCode(s15 % 1024 + 56320)) : String.fromCharCode(s15);
}
function It(s15, t2 = 0, e = s15.length) {
  let i = "";
  for (let r2 = t2; r2 < e; ++r2) {
    let n2 = s15[r2];
    n2 > 65535 ? (n2 -= 65536, i += String.fromCharCode((n2 >> 10) + 55296) + String.fromCharCode(n2 % 1024 + 56320)) : i += String.fromCharCode(n2);
  }
  return i;
}
var er = class {
  constructor() {
    this._interim = 0;
  }
  clear() {
    this._interim = 0;
  }
  decode(t2, e) {
    let i = t2.length;
    if (!i) return 0;
    let r2 = 0, n2 = 0;
    if (this._interim) {
      let o2 = t2.charCodeAt(n2++);
      56320 <= o2 && o2 <= 57343 ? e[r2++] = (this._interim - 55296) * 1024 + o2 - 56320 + 65536 : (e[r2++] = this._interim, e[r2++] = o2), this._interim = 0;
    }
    for (let o2 = n2; o2 < i; ++o2) {
      let l3 = t2.charCodeAt(o2);
      if (55296 <= l3 && l3 <= 56319) {
        if (++o2 >= i) return this._interim = l3, r2;
        let a = t2.charCodeAt(o2);
        56320 <= a && a <= 57343 ? e[r2++] = (l3 - 55296) * 1024 + a - 56320 + 65536 : (e[r2++] = l3, e[r2++] = a);
        continue;
      }
      l3 !== 65279 && (e[r2++] = l3);
    }
    return r2;
  }
}, tr = class {
  constructor() {
    this.interim = new Uint8Array(3);
  }
  clear() {
    this.interim.fill(0);
  }
  decode(t2, e) {
    let i = t2.length;
    if (!i) return 0;
    let r2 = 0, n2, o2, l3, a, u2 = 0, h2 = 0;
    if (this.interim[0]) {
      let _2 = false, p2 = this.interim[0];
      p2 &= (p2 & 224) === 192 ? 31 : (p2 & 240) === 224 ? 15 : 7;
      let m2 = 0, f2;
      for (; (f2 = this.interim[++m2] & 63) && m2 < 4; ) p2 <<= 6, p2 |= f2;
      let A2 = (this.interim[0] & 224) === 192 ? 2 : (this.interim[0] & 240) === 224 ? 3 : 4, R2 = A2 - m2;
      for (; h2 < R2; ) {
        if (h2 >= i) return 0;
        if (f2 = t2[h2++], (f2 & 192) !== 128) {
          h2--, _2 = true;
          break;
        } else this.interim[m2++] = f2, p2 <<= 6, p2 |= f2 & 63;
      }
      _2 || (A2 === 2 ? p2 < 128 ? h2-- : e[r2++] = p2 : A2 === 3 ? p2 < 2048 || p2 >= 55296 && p2 <= 57343 || p2 === 65279 || (e[r2++] = p2) : p2 < 65536 || p2 > 1114111 || (e[r2++] = p2)), this.interim.fill(0);
    }
    let c = i - 4, d = h2;
    for (; d < i; ) {
      for (; d < c && !((n2 = t2[d]) & 128) && !((o2 = t2[d + 1]) & 128) && !((l3 = t2[d + 2]) & 128) && !((a = t2[d + 3]) & 128); ) e[r2++] = n2, e[r2++] = o2, e[r2++] = l3, e[r2++] = a, d += 4;
      if (n2 = t2[d++], n2 < 128) e[r2++] = n2;
      else if ((n2 & 224) === 192) {
        if (d >= i) return this.interim[0] = n2, r2;
        if (o2 = t2[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (u2 = (n2 & 31) << 6 | o2 & 63, u2 < 128) {
          d--;
          continue;
        }
        e[r2++] = u2;
      } else if ((n2 & 240) === 224) {
        if (d >= i) return this.interim[0] = n2, r2;
        if (o2 = t2[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n2, this.interim[1] = o2, r2;
        if (l3 = t2[d++], (l3 & 192) !== 128) {
          d--;
          continue;
        }
        if (u2 = (n2 & 15) << 12 | (o2 & 63) << 6 | l3 & 63, u2 < 2048 || u2 >= 55296 && u2 <= 57343 || u2 === 65279) continue;
        e[r2++] = u2;
      } else if ((n2 & 248) === 240) {
        if (d >= i) return this.interim[0] = n2, r2;
        if (o2 = t2[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n2, this.interim[1] = o2, r2;
        if (l3 = t2[d++], (l3 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n2, this.interim[1] = o2, this.interim[2] = l3, r2;
        if (a = t2[d++], (a & 192) !== 128) {
          d--;
          continue;
        }
        if (u2 = (n2 & 7) << 18 | (o2 & 63) << 12 | (l3 & 63) << 6 | a & 63, u2 < 65536 || u2 > 1114111) continue;
        e[r2++] = u2;
      }
    }
    return r2;
  }
};
var ir = "";
var we = " ";
var De = class s {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
  }
  static toColorRGB(t2) {
    return [t2 >>> 16 & 255, t2 >>> 8 & 255, t2 & 255];
  }
  static fromColorRGB(t2) {
    return (t2[0] & 255) << 16 | (t2[1] & 255) << 8 | t2[2] & 255;
  }
  clone() {
    let t2 = new s();
    return t2.fg = this.fg, t2.bg = this.bg, t2.extended = this.extended.clone(), t2;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
}, rt = class s2 {
  constructor(t2 = 0, e = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = t2, this._urlId = e;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(t2) {
    this._ext = t2;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(t2) {
    this._ext &= -469762049, this._ext |= t2 << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(t2) {
    this._ext &= -67108864, this._ext |= t2 & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(t2) {
    this._urlId = t2;
  }
  get underlineVariantOffset() {
    let t2 = (this._ext & 3758096384) >> 29;
    return t2 < 0 ? t2 ^ 4294967288 : t2;
  }
  set underlineVariantOffset(t2) {
    this._ext &= 536870911, this._ext |= t2 << 29 & 3758096384;
  }
  clone() {
    return new s2(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var q = class s3 extends De {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
    this.combinedData = "";
  }
  static fromCharData(e) {
    let i = new s3();
    return i.setFromCharData(e), i;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? Ce(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(e) {
    this.fg = e[0], this.bg = 0;
    let i = false;
    if (e[1].length > 2) i = true;
    else if (e[1].length === 2) {
      let r2 = e[1].charCodeAt(0);
      if (55296 <= r2 && r2 <= 56319) {
        let n2 = e[1].charCodeAt(1);
        56320 <= n2 && n2 <= 57343 ? this.content = (r2 - 55296) * 1024 + n2 - 56320 + 65536 | e[2] << 22 : i = true;
      } else i = true;
    } else this.content = e[1].charCodeAt(0) | e[2] << 22;
    i && (this.combinedData = e[1], this.content = 2097152 | e[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var js = "di$target", Hn = "di$dependencies", Fn = /* @__PURE__ */ new Map();
function Xs(s15) {
  return s15[Hn] || [];
}
function ie(s15) {
  if (Fn.has(s15)) return Fn.get(s15);
  let t2 = function(e, i, r2) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Pl(t2, e, r2);
  };
  return t2._id = s15, Fn.set(s15, t2), t2;
}
function Pl(s15, t2, e) {
  t2[js] === t2 ? t2[Hn].push({ id: s15, index: e }) : (t2[Hn] = [{ id: s15, index: e }], t2[js] = t2);
}
var F = ie("BufferService"), rr = ie("CoreMouseService"), ge = ie("CoreService"), Zs = ie("CharsetService"), xt = ie("InstantiationService");
var nr = ie("LogService"), H = ie("OptionsService"), sr = ie("OscLinkService"), Js = ie("UnicodeService"), Be = ie("DecorationService");
var wt = class {
  constructor(t2, e, i) {
    this._bufferService = t2;
    this._optionsService = e;
    this._oscLinkService = i;
  }
  provideLinks(t2, e) {
    let i = this._bufferService.buffer.lines.get(t2 - 1);
    if (!i) {
      e(void 0);
      return;
    }
    let r2 = [], n2 = this._optionsService.rawOptions.linkHandler, o2 = new q(), l3 = i.getTrimmedLength(), a = -1, u2 = -1, h2 = false;
    for (let c = 0; c < l3; c++) if (!(u2 === -1 && !i.hasContent(c))) {
      if (i.loadCell(c, o2), o2.hasExtendedAttrs() && o2.extended.urlId) if (u2 === -1) {
        u2 = c, a = o2.extended.urlId;
        continue;
      } else h2 = o2.extended.urlId !== a;
      else u2 !== -1 && (h2 = true);
      if (h2 || u2 !== -1 && c === l3 - 1) {
        let d = this._oscLinkService.getLinkData(a)?.uri;
        if (d) {
          let _2 = { start: { x: u2 + 1, y: t2 }, end: { x: c + (!h2 && c === l3 - 1 ? 1 : 0), y: t2 } }, p2 = false;
          if (!n2?.allowNonHttpProtocols) try {
            let m2 = new URL(d);
            ["http:", "https:"].includes(m2.protocol) || (p2 = true);
          } catch {
            p2 = true;
          }
          p2 || r2.push({ text: d, range: _2, activate: (m2, f2) => n2 ? n2.activate(m2, f2, _2) : Ol(m2, f2), hover: (m2, f2) => n2?.hover?.(m2, f2, _2), leave: (m2, f2) => n2?.leave?.(m2, f2, _2) });
        }
        h2 = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (u2 = c, a = o2.extended.urlId) : (u2 = -1, a = -1);
      }
    }
    e(r2);
  }
};
wt = M([S(0, F), S(1, H), S(2, sr)], wt);
function Ol(s15, t2) {
  if (confirm(`Do you want to navigate to ${t2}?

WARNING: This link could potentially be dangerous`)) {
    let i = window.open();
    if (i) {
      try {
        i.opener = null;
      } catch {
      }
      i.location.href = t2;
    } else console.warn("Opening link blocked as opener could not be cleared");
  }
}
var nt = ie("CharSizeService"), ae = ie("CoreBrowserService"), Dt = ie("MouseService"), ce = ie("RenderService"), Qs = ie("SelectionService"), or = ie("CharacterJoinerService"), Re = ie("ThemeService"), lr = ie("LinkProviderService");
var Wn = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t2) {
      setTimeout(() => {
        throw t2.stack ? ar.isErrorNoTelemetry(t2) ? new ar(t2.message + `

` + t2.stack) : new Error(t2.message + `

` + t2.stack) : t2;
      }, 0);
    };
  }
  addListener(t2) {
    return this.listeners.push(t2), () => {
      this._removeListener(t2);
    };
  }
  emit(t2) {
    this.listeners.forEach((e) => {
      e(t2);
    });
  }
  _removeListener(t2) {
    this.listeners.splice(this.listeners.indexOf(t2), 1);
  }
  setUnexpectedErrorHandler(t2) {
    this.unexpectedErrorHandler = t2;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t2) {
    this.unexpectedErrorHandler(t2), this.emit(t2);
  }
  onUnexpectedExternalError(t2) {
    this.unexpectedErrorHandler(t2);
  }
}, Bl = new Wn();
function Lt(s15) {
  Nl(s15) || Bl.onUnexpectedError(s15);
}
var Un = "Canceled";
function Nl(s15) {
  return s15 instanceof bi ? true : s15 instanceof Error && s15.name === Un && s15.message === Un;
}
var bi = class extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
};
function eo(s15) {
  return new Error(`Illegal argument: ${s15}`);
}
var ar = class s4 extends Error {
  constructor(t2) {
    super(t2), this.name = "CodeExpectedError";
  }
  static fromError(t2) {
    if (t2 instanceof s4) return t2;
    let e = new s4();
    return e.message = t2.message, e.stack = t2.stack, e;
  }
  static isErrorNoTelemetry(t2) {
    return t2.name === "CodeExpectedError";
  }
}, Rt = class s5 extends Error {
  constructor(t2) {
    super(t2 || "An unexpected bug occurred."), Object.setPrototypeOf(this, s5.prototype);
  }
};
function Se(s15, t2 = 0) {
  return s15[s15.length - (1 + t2)];
}
var ro;
((l3) => {
  function s15(a) {
    return a < 0;
  }
  l3.isLessThan = s15;
  function t2(a) {
    return a <= 0;
  }
  l3.isLessThanOrEqual = t2;
  function e(a) {
    return a > 0;
  }
  l3.isGreaterThan = e;
  function i(a) {
    return a === 0;
  }
  l3.isNeitherLessOrGreaterThan = i, l3.greaterThan = 1, l3.lessThan = -1, l3.neitherLessOrGreaterThan = 0;
})(ro ||= {});
function Kn(s15, t2) {
  let e = this, i = false, r2;
  return function() {
    if (i) return r2;
    if (i = true, t2) ;
    else r2 = s15.apply(e, arguments);
    return r2;
  };
}
var zn;
((O2) => {
  function s15(I2) {
    return I2 && typeof I2 == "object" && typeof I2[Symbol.iterator] == "function";
  }
  O2.is = s15;
  let t2 = Object.freeze([]);
  function e() {
    return t2;
  }
  O2.empty = e;
  function* i(I2) {
    yield I2;
  }
  O2.single = i;
  function r2(I2) {
    return s15(I2) ? I2 : i(I2);
  }
  O2.wrap = r2;
  function n2(I2) {
    return I2 || t2;
  }
  O2.from = n2;
  function* o2(I2) {
    for (let k2 = I2.length - 1; k2 >= 0; k2--) yield I2[k2];
  }
  O2.reverse = o2;
  function l3(I2) {
    return !I2 || I2[Symbol.iterator]().next().done === true;
  }
  O2.isEmpty = l3;
  function a(I2) {
    return I2[Symbol.iterator]().next().value;
  }
  O2.first = a;
  function u2(I2, k2) {
    let P2 = 0;
    for (let oe2 of I2) if (k2(oe2, P2++)) return true;
    return false;
  }
  O2.some = u2;
  function h2(I2, k2) {
    for (let P2 of I2) if (k2(P2)) return P2;
  }
  O2.find = h2;
  function* c(I2, k2) {
    for (let P2 of I2) k2(P2) && (yield P2);
  }
  O2.filter = c;
  function* d(I2, k2) {
    let P2 = 0;
    for (let oe2 of I2) yield k2(oe2, P2++);
  }
  O2.map = d;
  function* _2(I2, k2) {
    let P2 = 0;
    for (let oe2 of I2) yield* k2(oe2, P2++);
  }
  O2.flatMap = _2;
  function* p2(...I2) {
    for (let k2 of I2) yield* k2;
  }
  O2.concat = p2;
  function m2(I2, k2, P2) {
    let oe2 = P2;
    for (let Me2 of I2) oe2 = k2(oe2, Me2);
    return oe2;
  }
  O2.reduce = m2;
  function* f2(I2, k2, P2 = I2.length) {
    for (k2 < 0 && (k2 += I2.length), P2 < 0 ? P2 += I2.length : P2 > I2.length && (P2 = I2.length); k2 < P2; k2++) yield I2[k2];
  }
  O2.slice = f2;
  function A2(I2, k2 = Number.POSITIVE_INFINITY) {
    let P2 = [];
    if (k2 === 0) return [P2, I2];
    let oe2 = I2[Symbol.iterator]();
    for (let Me2 = 0; Me2 < k2; Me2++) {
      let Pe2 = oe2.next();
      if (Pe2.done) return [P2, O2.empty()];
      P2.push(Pe2.value);
    }
    return [P2, { [Symbol.iterator]() {
      return oe2;
    } }];
  }
  O2.consume = A2;
  async function R2(I2) {
    let k2 = [];
    for await (let P2 of I2) k2.push(P2);
    return Promise.resolve(k2);
  }
  O2.asyncToArray = R2;
})(zn ||= {});
function fr(s15) {
  return s15;
}
function vi(s15, t2) {
}
function Gn(s15) {
  return s15;
}
function Ne(s15) {
  if (zn.is(s15)) {
    let t2 = [];
    for (let e of s15) if (e) try {
      e.dispose();
    } catch (i) {
      t2.push(i);
    }
    if (t2.length === 1) throw t2[0];
    if (t2.length > 1) throw new AggregateError(t2, "Encountered errors while disposing of store");
    return Array.isArray(s15) ? [] : s15;
  } else if (s15) return s15.dispose(), s15;
}
function ho(...s15) {
  let t2 = C(() => Ne(s15));
  return t2;
}
function C(s15) {
  let t2 = fr({ dispose: Kn(() => {
    s15();
  }) });
  return t2;
}
var dr = class dr2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
  }
  dispose() {
    this._isDisposed || (this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Ne(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(t2) {
    if (!t2) return t2;
    if (t2 === this) throw new Error("Cannot register a disposable on itself!");
    return this._isDisposed ? dr2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(t2), t2;
  }
  delete(t2) {
    if (t2) {
      if (t2 === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t2), t2.dispose();
    }
  }
  deleteAndLeak(t2) {
    t2 && this._toDispose.has(t2) && (this._toDispose.delete(t2), vi());
  }
};
dr.DISABLE_DISPOSED_WARNING = false;
var Ee = dr, D = class {
  constructor() {
    this._store = new Ee();
    vi(this._store);
  }
  dispose() {
    this._store.dispose();
  }
  _register(t2) {
    if (t2 === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t2);
  }
};
D.None = Object.freeze({ dispose() {
} });
var ye = class {
  constructor() {
    this._isDisposed = false;
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(t2) {
    this._isDisposed || t2 === this._value || (this._value?.dispose(), this._value = t2);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let t2 = this._value;
    return this._value = void 0, t2;
  }
};
var fe = typeof window == "object" ? window : globalThis;
var kt = class kt2 {
  constructor(t2) {
    this.element = t2, this.next = kt2.Undefined, this.prev = kt2.Undefined;
  }
};
kt.Undefined = new kt(void 0);
var G = kt, Ct = class {
  constructor() {
    this._first = G.Undefined;
    this._last = G.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === G.Undefined;
  }
  clear() {
    let t2 = this._first;
    for (; t2 !== G.Undefined; ) {
      let e = t2.next;
      t2.prev = G.Undefined, t2.next = G.Undefined, t2 = e;
    }
    this._first = G.Undefined, this._last = G.Undefined, this._size = 0;
  }
  unshift(t2) {
    return this._insert(t2, false);
  }
  push(t2) {
    return this._insert(t2, true);
  }
  _insert(t2, e) {
    let i = new G(t2);
    if (this._first === G.Undefined) this._first = i, this._last = i;
    else if (e) {
      let n2 = this._last;
      this._last = i, i.prev = n2, n2.next = i;
    } else {
      let n2 = this._first;
      this._first = i, i.next = n2, n2.prev = i;
    }
    this._size += 1;
    let r2 = false;
    return () => {
      r2 || (r2 = true, this._remove(i));
    };
  }
  shift() {
    if (this._first !== G.Undefined) {
      let t2 = this._first.element;
      return this._remove(this._first), t2;
    }
  }
  pop() {
    if (this._last !== G.Undefined) {
      let t2 = this._last.element;
      return this._remove(this._last), t2;
    }
  }
  _remove(t2) {
    if (t2.prev !== G.Undefined && t2.next !== G.Undefined) {
      let e = t2.prev;
      e.next = t2.next, t2.next.prev = e;
    } else t2.prev === G.Undefined && t2.next === G.Undefined ? (this._first = G.Undefined, this._last = G.Undefined) : t2.next === G.Undefined ? (this._last = this._last.prev, this._last.next = G.Undefined) : t2.prev === G.Undefined && (this._first = this._first.next, this._first.prev = G.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t2 = this._first;
    for (; t2 !== G.Undefined; ) yield t2.element, t2 = t2.next;
  }
};
var zl = globalThis.performance && typeof globalThis.performance.now == "function", mr = class s6 {
  static create(t2) {
    return new s6(t2);
  }
  constructor(t2) {
    this._now = zl && t2 === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var $;
((Qe2) => {
  Qe2.None = () => D.None;
  function e(y2, T2) {
    return d(y2, () => {
    }, 0, void 0, true, void 0, T2);
  }
  Qe2.defer = e;
  function i(y2) {
    return (T2, g2 = null, w2) => {
      let E2 = false, x2;
      return x2 = y2((N2) => {
        if (!E2) return x2 ? x2.dispose() : E2 = true, T2.call(g2, N2);
      }, null, w2), E2 && x2.dispose(), x2;
    };
  }
  Qe2.once = i;
  function r2(y2, T2, g2) {
    return h2((w2, E2 = null, x2) => y2((N2) => w2.call(E2, T2(N2)), null, x2), g2);
  }
  Qe2.map = r2;
  function n2(y2, T2, g2) {
    return h2((w2, E2 = null, x2) => y2((N2) => {
      T2(N2), w2.call(E2, N2);
    }, null, x2), g2);
  }
  Qe2.forEach = n2;
  function o2(y2, T2, g2) {
    return h2((w2, E2 = null, x2) => y2((N2) => T2(N2) && w2.call(E2, N2), null, x2), g2);
  }
  Qe2.filter = o2;
  function l3(y2) {
    return y2;
  }
  Qe2.signal = l3;
  function a(...y2) {
    return (T2, g2 = null, w2) => {
      let E2 = ho(...y2.map((x2) => x2((N2) => T2.call(g2, N2))));
      return c(E2, w2);
    };
  }
  Qe2.any = a;
  function u2(y2, T2, g2, w2) {
    let E2 = g2;
    return r2(y2, (x2) => (E2 = T2(E2, x2), E2), w2);
  }
  Qe2.reduce = u2;
  function h2(y2, T2) {
    let g2, w2 = { onWillAddFirstListener() {
      g2 = y2(E2.fire, E2);
    }, onDidRemoveLastListener() {
      g2?.dispose();
    } };
    let E2 = new v$1(w2);
    return T2?.add(E2), E2.event;
  }
  function c(y2, T2) {
    return T2 instanceof Array ? T2.push(y2) : T2 && T2.add(y2), y2;
  }
  function d(y2, T2, g2 = 100, w2 = false, E2 = false, x2, N2) {
    let Z2, te2, Oe2, ze = 0, le2, et = { leakWarningThreshold: x2, onWillAddFirstListener() {
      Z2 = y2((ht) => {
        ze++, te2 = T2(te2, ht), w2 && !Oe2 && (me2.fire(te2), te2 = void 0), le2 = () => {
          let fi2 = te2;
          te2 = void 0, Oe2 = void 0, (!w2 || ze > 1) && me2.fire(fi2), ze = 0;
        }, typeof g2 == "number" ? (clearTimeout(Oe2), Oe2 = setTimeout(le2, g2)) : Oe2 === void 0 && (Oe2 = 0, queueMicrotask(le2));
      });
    }, onWillRemoveListener() {
      E2 && ze > 0 && le2?.();
    }, onDidRemoveLastListener() {
      le2 = void 0, Z2.dispose();
    } };
    let me2 = new v$1(et);
    return N2?.add(me2), me2.event;
  }
  Qe2.debounce = d;
  function _2(y2, T2 = 0, g2) {
    return Qe2.debounce(y2, (w2, E2) => w2 ? (w2.push(E2), w2) : [E2], T2, void 0, true, void 0, g2);
  }
  Qe2.accumulate = _2;
  function p2(y2, T2 = (w2, E2) => w2 === E2, g2) {
    let w2 = true, E2;
    return o2(y2, (x2) => {
      let N2 = w2 || !T2(x2, E2);
      return w2 = false, E2 = x2, N2;
    }, g2);
  }
  Qe2.latch = p2;
  function m2(y2, T2, g2) {
    return [Qe2.filter(y2, T2, g2), Qe2.filter(y2, (w2) => !T2(w2), g2)];
  }
  Qe2.split = m2;
  function f2(y2, T2 = false, g2 = [], w2) {
    let E2 = g2.slice(), x2 = y2((te2) => {
      E2 ? E2.push(te2) : Z2.fire(te2);
    });
    w2 && w2.add(x2);
    let N2 = () => {
      E2?.forEach((te2) => Z2.fire(te2)), E2 = null;
    }, Z2 = new v$1({ onWillAddFirstListener() {
      x2 || (x2 = y2((te2) => Z2.fire(te2)), w2 && w2.add(x2));
    }, onDidAddFirstListener() {
      E2 && (T2 ? setTimeout(N2) : N2());
    }, onDidRemoveLastListener() {
      x2 && x2.dispose(), x2 = null;
    } });
    return w2 && w2.add(Z2), Z2.event;
  }
  Qe2.buffer = f2;
  function A2(y2, T2) {
    return (w2, E2, x2) => {
      let N2 = T2(new O2());
      return y2(function(Z2) {
        let te2 = N2.evaluate(Z2);
        te2 !== R2 && w2.call(E2, te2);
      }, void 0, x2);
    };
  }
  Qe2.chain = A2;
  let R2 = Symbol("HaltChainable");
  class O2 {
    constructor() {
      this.steps = [];
    }
    map(T2) {
      return this.steps.push(T2), this;
    }
    forEach(T2) {
      return this.steps.push((g2) => (T2(g2), g2)), this;
    }
    filter(T2) {
      return this.steps.push((g2) => T2(g2) ? g2 : R2), this;
    }
    reduce(T2, g2) {
      let w2 = g2;
      return this.steps.push((E2) => (w2 = T2(w2, E2), w2)), this;
    }
    latch(T2 = (g2, w2) => g2 === w2) {
      let g2 = true, w2;
      return this.steps.push((E2) => {
        let x2 = g2 || !T2(E2, w2);
        return g2 = false, w2 = E2, x2 ? E2 : R2;
      }), this;
    }
    evaluate(T2) {
      for (let g2 of this.steps) if (T2 = g2(T2), T2 === R2) break;
      return T2;
    }
  }
  function I2(y2, T2, g2 = (w2) => w2) {
    let w2 = (...Z2) => N2.fire(g2(...Z2)), E2 = () => y2.on(T2, w2), x2 = () => y2.removeListener(T2, w2), N2 = new v$1({ onWillAddFirstListener: E2, onDidRemoveLastListener: x2 });
    return N2.event;
  }
  Qe2.fromNodeEventEmitter = I2;
  function k2(y2, T2, g2 = (w2) => w2) {
    let w2 = (...Z2) => N2.fire(g2(...Z2)), E2 = () => y2.addEventListener(T2, w2), x2 = () => y2.removeEventListener(T2, w2), N2 = new v$1({ onWillAddFirstListener: E2, onDidRemoveLastListener: x2 });
    return N2.event;
  }
  Qe2.fromDOMEventEmitter = k2;
  function P2(y2) {
    return new Promise((T2) => i(y2)(T2));
  }
  Qe2.toPromise = P2;
  function oe2(y2) {
    let T2 = new v$1();
    return y2.then((g2) => {
      T2.fire(g2);
    }, () => {
      T2.fire(void 0);
    }).finally(() => {
      T2.dispose();
    }), T2.event;
  }
  Qe2.fromPromise = oe2;
  function Me2(y2, T2) {
    return y2((g2) => T2.fire(g2));
  }
  Qe2.forward = Me2;
  function Pe2(y2, T2, g2) {
    return T2(g2), y2((w2) => T2(w2));
  }
  Qe2.runAndSubscribe = Pe2;
  class Ke2 {
    constructor(T2, g2) {
      this._observable = T2;
      this._counter = 0;
      this._hasChanged = false;
      let w2 = { onWillAddFirstListener: () => {
        T2.addObserver(this);
      }, onDidRemoveLastListener: () => {
        T2.removeObserver(this);
      } };
      this.emitter = new v$1(w2), g2 && g2.add(this.emitter);
    }
    beginUpdate(T2) {
      this._counter++;
    }
    handlePossibleChange(T2) {
    }
    handleChange(T2, g2) {
      this._hasChanged = true;
    }
    endUpdate(T2) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function di2(y2, T2) {
    return new Ke2(y2, T2).emitter.event;
  }
  Qe2.fromObservable = di2;
  function V2(y2) {
    return (T2, g2, w2) => {
      let E2 = 0, x2 = false, N2 = { beginUpdate() {
        E2++;
      }, endUpdate() {
        E2--, E2 === 0 && (y2.reportChanges(), x2 && (x2 = false, T2.call(g2)));
      }, handlePossibleChange() {
      }, handleChange() {
        x2 = true;
      } };
      y2.addObserver(N2), y2.reportChanges();
      let Z2 = { dispose() {
        y2.removeObserver(N2);
      } };
      return w2 instanceof Ee ? w2.add(Z2) : Array.isArray(w2) && w2.push(Z2), Z2;
    };
  }
  Qe2.fromObservableLight = V2;
})($ ||= {});
var Mt = class Mt2 {
  constructor(t2) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${t2}_${Mt2._idPool++}`, Mt2.all.add(this);
  }
  start(t2) {
    this._stopWatch = new mr(), this.listenerCount = t2;
  }
  stop() {
    if (this._stopWatch) {
      let t2 = this._stopWatch.elapsed();
      this.durations.push(t2), this.elapsedOverall += t2, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Mt.all = /* @__PURE__ */ new Set(), Mt._idPool = 0;
var $n = Mt, po = -1;
var br = class br2 {
  constructor(t2, e, i = (br2._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t2;
    this.threshold = e;
    this.name = i;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(t2, e) {
    let i = this.threshold;
    if (i <= 0 || e < i) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let r2 = this._stacks.get(t2.value) || 0;
    if (this._stacks.set(t2.value, r2 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i * 0.5;
      let [n2, o2] = this.getMostFrequentStack(), l3 = `[${this.name}] potential listener LEAK detected, having ${e} listeners already. MOST frequent listener (${o2}):`;
      console.warn(l3), console.warn(n2);
      let a = new qn(l3, n2);
      this._errorHandler(a);
    }
    return () => {
      let n2 = this._stacks.get(t2.value) || 0;
      this._stacks.set(t2.value, n2 - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let t2, e = 0;
    for (let [i, r2] of this._stacks) (!t2 || e < r2) && (t2 = [i, r2], e = r2);
    return t2;
  }
};
br._idPool = 1;
var Vn = br, gi = class s7 {
  constructor(t2) {
    this.value = t2;
  }
  static create() {
    let t2 = new Error();
    return new s7(t2.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
}, qn = class extends Error {
  constructor(t2, e) {
    super(t2), this.name = "ListenerLeakError", this.stack = e;
  }
}, Yn = class extends Error {
  constructor(t2, e) {
    super(t2), this.name = "ListenerRefusalError", this.stack = e;
  }
}, Vl = 0, Pt = class {
  constructor(t2) {
    this.value = t2;
    this.id = Vl++;
  }
}, ql = 2, _r;
var v$1 = class v {
  constructor(t2) {
    this._size = 0;
    this._options = t2, this._leakageMon = this._options?.leakWarningThreshold ? new Vn(t2?.onListenerError ?? Lt, this._options?.leakWarningThreshold ?? po) : void 0, this._perfMon = this._options?._profName ? new $n(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (t2, e, i) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(a);
        let u2 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], h2 = new Yn(`${a}. HINT: Stack shows most frequent listener (${u2[1]}-times)`, u2[0]);
        return (this._options?.onListenerError || Lt)(h2), D.None;
      }
      if (this._disposed) return D.None;
      e && (t2 = t2.bind(e));
      let r2 = new Pt(t2), n2;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r2.stack = gi.create(), n2 = this._leakageMon.check(r2.stack, this._size + 1)), this._listeners ? this._listeners instanceof Pt ? (this._deliveryQueue ??= new jn(), this._listeners = [this._listeners, r2]) : this._listeners.push(r2) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r2, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let l3 = C(() => {
        n2?.(), this._removeListener(r2);
      });
      if (i instanceof Ee ? i.add(l3) : Array.isArray(i) && i.push(l3), _r) ;
      return l3;
    }, this._event;
  }
  _removeListener(t2) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let e = this._listeners, i = e.indexOf(t2);
    if (i === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, e[i] = void 0;
    let r2 = this._deliveryQueue.current === this;
    if (this._size * ql <= e.length) {
      let n2 = 0;
      for (let o2 = 0; o2 < e.length; o2++) e[o2] ? e[n2++] = e[o2] : r2 && (this._deliveryQueue.end--, n2 < this._deliveryQueue.i && this._deliveryQueue.i--);
      e.length = n2;
    }
  }
  _deliver(t2, e) {
    if (!t2) return;
    let i = this._options?.onListenerError || Lt;
    if (!i) {
      t2.value(e);
      return;
    }
    try {
      t2.value(e);
    } catch (r2) {
      i(r2);
    }
  }
  _deliverQueue(t2) {
    let e = t2.current._listeners;
    for (; t2.i < t2.end; ) this._deliver(e[t2.i++], t2.value);
    t2.reset();
  }
  fire(t2) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Pt) this._deliver(this._listeners, t2);
    else {
      let e = this._deliveryQueue;
      e.enqueue(this, t2, this._listeners.length), this._deliverQueue(e);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var jn = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(t2, e, i) {
    this.i = 0, this.end = i, this.current = t2, this.value = e;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var gr = class gr2 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new v$1();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new v$1();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(t2) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(t2)) ?? 0;
  }
  setZoomLevel(t2, e) {
    if (this.getZoomLevel(e) === t2) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToZoomLevel.set(i, t2), this._onDidChangeZoomLevel.fire(i);
  }
  getZoomFactor(t2) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(t2)) ?? 1;
  }
  setZoomFactor(t2, e) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(e), t2);
  }
  setFullscreen(t2, e) {
    if (this.isFullscreen(e) === t2) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToFullScreen.set(i, t2), this._onDidChangeFullscreen.fire(i);
  }
  isFullscreen(t2) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(t2));
  }
  getWindowId(t2) {
    return t2.vscodeWindowId;
  }
};
gr.INSTANCE = new gr();
var Si = gr;
function Xl(s15, t2, e) {
  typeof t2 == "string" && (t2 = s15.matchMedia(t2)), t2.addEventListener("change", e);
}
Si.INSTANCE.onDidChangeZoomLevel;
function mo(s15) {
  return Si.INSTANCE.getZoomFactor(s15);
}
Si.INSTANCE.onDidChangeFullscreen;
var Ot = typeof navigator == "object" ? navigator.userAgent : "", Ei = Ot.indexOf("Firefox") >= 0, Bt = Ot.indexOf("AppleWebKit") >= 0, Ti = Ot.indexOf("Chrome") >= 0, Sr = !Ti && Ot.indexOf("Safari") >= 0;
Ot.indexOf("Electron/") >= 0;
Ot.indexOf("Android") >= 0;
var vr = false;
if (typeof fe.matchMedia == "function") {
  let s15 = fe.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t2 = fe.matchMedia("(display-mode: fullscreen)");
  vr = s15.matches, Xl(fe, s15, ({ matches: e }) => {
    vr && t2.matches || (vr = e);
  });
}
var Nt = "en", yr = false, xr = false, Ii = false, vo = false, Tr, Ir = Nt, bo = Nt, ia, $e, Ve = globalThis, xe;
typeof Ve.vscode < "u" && typeof Ve.vscode.process < "u" ? xe = Ve.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (xe = process);
var So = typeof xe?.versions?.electron == "string", ra = So && xe?.type === "renderer";
if (typeof xe == "object") {
  yr = xe.platform === "win32", xr = xe.platform === "darwin", Ii = xe.platform === "linux", Ii && !!xe.env.SNAP && !!xe.env.SNAP_REVISION, !!xe.env.CI || !!xe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tr = Nt, Ir = Nt;
  let s15 = xe.env.VSCODE_NLS_CONFIG;
  if (s15) try {
    let t2 = JSON.parse(s15);
    Tr = t2.userLocale, bo = t2.osLocale, Ir = t2.resolvedLanguage || Nt, ia = t2.languagePack?.translationsConfigFile;
  } catch {
  }
  vo = true;
} else typeof navigator == "object" && !ra ? ($e = navigator.userAgent, yr = $e.indexOf("Windows") >= 0, xr = $e.indexOf("Macintosh") >= 0, ($e.indexOf("Macintosh") >= 0 || $e.indexOf("iPad") >= 0 || $e.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Ii = $e.indexOf("Linux") >= 0, $e?.indexOf("Mobi") >= 0, Ir = globalThis._VSCODE_NLS_LANGUAGE || Nt, Tr = navigator.language.toLowerCase(), bo = Tr) : console.error("Unable to resolve platform.");
var wr = yr, Te = xr, Zn = Ii;
var Dr = vo;
var Fe = $e, st = Ir, sa;
((i) => {
  function s15() {
    return st;
  }
  i.value = s15;
  function t2() {
    return st.length === 2 ? st === "en" : st.length >= 3 ? st[0] === "e" && st[1] === "n" && st[2] === "-" : false;
  }
  i.isDefaultVariant = t2;
  function e() {
    return st === "en";
  }
  i.isDefault = e;
})(sa ||= {});
var oa = typeof Ve.postMessage == "function" && !Ve.importScripts;
(() => {
  if (oa) {
    let s15 = [];
    Ve.addEventListener("message", (e) => {
      if (e.data && e.data.vscodeScheduleAsyncWork) for (let i = 0, r2 = s15.length; i < r2; i++) {
        let n2 = s15[i];
        if (n2.id === e.data.vscodeScheduleAsyncWork) {
          s15.splice(i, 1), n2.callback();
          return;
        }
      }
    });
    let t2 = 0;
    return (e) => {
      let i = ++t2;
      s15.push({ id: i, callback: e }), Ve.postMessage({ vscodeScheduleAsyncWork: i }, "*");
    };
  }
  return (s15) => setTimeout(s15);
})();
var la = !!(Fe && Fe.indexOf("Chrome") >= 0);
!!(Fe && Fe.indexOf("Firefox") >= 0);
!!(!la && Fe && Fe.indexOf("Safari") >= 0);
!!(Fe && Fe.indexOf("Edg/") >= 0);
!!(Fe && Fe.indexOf("Android") >= 0);
var ot = typeof navigator == "object" ? navigator : {};
({ clipboard: { writeText: Dr || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(ot && ot.clipboard && ot.clipboard.writeText), readText: Dr || !!(ot && ot.clipboard && ot.clipboard.readText) } });
var yi = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t2, e) {
    this._keyCodeToStr[t2] = e, this._strToKeyCode[e.toLowerCase()] = t2;
  }
  keyCodeToStr(t2) {
    return this._keyCodeToStr[t2];
  }
  strToKeyCode(t2) {
    return this._strToKeyCode[t2.toLowerCase()] || 0;
  }
}, Jn = new yi(), To = new yi(), Io = new yi(), yo = new Array(230);
var Qn;
((o2) => {
  function s15(l3) {
    return Jn.keyCodeToStr(l3);
  }
  o2.toString = s15;
  function t2(l3) {
    return Jn.strToKeyCode(l3);
  }
  o2.fromString = t2;
  function e(l3) {
    return To.keyCodeToStr(l3);
  }
  o2.toUserSettingsUS = e;
  function i(l3) {
    return Io.keyCodeToStr(l3);
  }
  o2.toUserSettingsGeneral = i;
  function r2(l3) {
    return To.strToKeyCode(l3) || Io.strToKeyCode(l3);
  }
  o2.fromUserSettings = r2;
  function n2(l3) {
    if (l3 >= 98 && l3 <= 113) return null;
    switch (l3) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Jn.keyCodeToStr(l3);
  }
  o2.toElectronAccelerator = n2;
})(Qn ||= {});
var Rr = class s8 {
  constructor(t2, e, i, r2, n2) {
    this.ctrlKey = t2;
    this.shiftKey = e;
    this.altKey = i;
    this.metaKey = r2;
    this.keyCode = n2;
  }
  equals(t2) {
    return t2 instanceof s8 && this.ctrlKey === t2.ctrlKey && this.shiftKey === t2.shiftKey && this.altKey === t2.altKey && this.metaKey === t2.metaKey && this.keyCode === t2.keyCode;
  }
  getHashCode() {
    let t2 = this.ctrlKey ? "1" : "0", e = this.shiftKey ? "1" : "0", i = this.altKey ? "1" : "0", r2 = this.metaKey ? "1" : "0";
    return `K${t2}${e}${i}${r2}${this.keyCode}`;
  }
  isModifierKey() {
    return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
  }
  toKeybinding() {
    return new es([this]);
  }
  isDuplicateModifierCase() {
    return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
  }
};
var es = class {
  constructor(t2) {
    if (t2.length === 0) throw eo("chords");
    this.chords = t2;
  }
  getHashCode() {
    let t2 = "";
    for (let e = 0, i = this.chords.length; e < i; e++) e !== 0 && (t2 += ";"), t2 += this.chords[e].getHashCode();
    return t2;
  }
  equals(t2) {
    if (t2 === null || this.chords.length !== t2.chords.length) return false;
    for (let e = 0; e < this.chords.length; e++) if (!this.chords[e].equals(t2.chords[e])) return false;
    return true;
  }
};
function ca(s15) {
  if (s15.charCode) {
    let e = String.fromCharCode(s15.charCode).toUpperCase();
    return Qn.fromString(e);
  }
  let t2 = s15.keyCode;
  if (t2 === 3) return 7;
  if (Ei) switch (t2) {
    case 59:
      return 85;
    case 60:
      if (Zn) return 97;
      break;
    case 61:
      return 86;
    case 107:
      return 109;
    case 109:
      return 111;
    case 173:
      return 88;
    case 224:
      if (Te) return 57;
      break;
  }
  else if (Bt) {
    if (Te && t2 === 93) return 57;
    if (!Te && t2 === 92) return 57;
  }
  return yo[t2] || 0;
}
var ua = Te ? 256 : 2048, ha = 512, da = 1024, fa = Te ? 2048 : 256;
var ft = class {
  constructor(t2) {
    this._standardKeyboardEventBrand = true;
    let e = t2;
    this.browserEvent = e, this.target = e.target, this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, this.altGraphKey = e.getModifierState?.("AltGraph"), this.keyCode = ca(e), this.code = e.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
  }
  preventDefault() {
    this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
  }
  toKeyCodeChord() {
    return this._asKeyCodeChord;
  }
  equals(t2) {
    return this._asKeybinding === t2;
  }
  _computeKeybinding() {
    let t2 = 0;
    this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t2 = this.keyCode);
    let e = 0;
    return this.ctrlKey && (e |= ua), this.altKey && (e |= ha), this.shiftKey && (e |= da), this.metaKey && (e |= fa), e |= t2, e;
  }
  _computeKeyCodeChord() {
    let t2 = 0;
    return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t2 = this.keyCode), new Rr(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, t2);
  }
};
var wo = /* @__PURE__ */ new WeakMap();
function pa(s15) {
  if (!s15.parent || s15.parent === s15) return null;
  try {
    let t2 = s15.location, e = s15.parent.location;
    if (t2.origin !== "null" && e.origin !== "null" && t2.origin !== e.origin) return null;
  } catch {
    return null;
  }
  return s15.parent;
}
var Lr = class {
  static getSameOriginWindowChain(t2) {
    let e = wo.get(t2);
    if (!e) {
      e = [], wo.set(t2, e);
      let i = t2, r2;
      do
        r2 = pa(i), r2 ? e.push({ window: new WeakRef(i), iframeElement: i.frameElement || null }) : e.push({ window: new WeakRef(i), iframeElement: null }), i = r2;
      while (i);
    }
    return e.slice(0);
  }
  static getPositionOfChildWindowRelativeToAncestorWindow(t2, e) {
    if (!e || t2 === e) return { top: 0, left: 0 };
    let i = 0, r2 = 0, n2 = this.getSameOriginWindowChain(t2);
    for (let o2 of n2) {
      let l3 = o2.window.deref();
      if (i += l3?.scrollY ?? 0, r2 += l3?.scrollX ?? 0, l3 === e || !o2.iframeElement) break;
      let a = o2.iframeElement.getBoundingClientRect();
      i += a.top, r2 += a.left;
    }
    return { top: i, left: r2 };
  }
};
var qe = class {
  constructor(t2, e) {
    this.timestamp = Date.now(), this.browserEvent = e, this.leftButton = e.button === 0, this.middleButton = e.button === 1, this.rightButton = e.button === 2, this.buttons = e.buttons, this.target = e.target, this.detail = e.detail || 1, e.type === "dblclick" && (this.detail = 2), this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, typeof e.pageX == "number" ? (this.posx = e.pageX, this.posy = e.pageY) : (this.posx = e.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = e.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
    let i = Lr.getPositionOfChildWindowRelativeToAncestorWindow(t2, e.view);
    this.posx -= i.left, this.posy -= i.top;
  }
  preventDefault() {
    this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent.stopPropagation();
  }
};
var xi = class {
  constructor(t2, e = 0, i = 0) {
    this.browserEvent = t2 || null, this.target = t2 ? t2.target || t2.targetNode || t2.srcElement : null, this.deltaY = i, this.deltaX = e;
    let r2 = false;
    if (Ti) {
      let n2 = navigator.userAgent.match(/Chrome\/(\d+)/);
      r2 = (n2 ? parseInt(n2[1]) : 123) <= 122;
    }
    if (t2) {
      let n2 = t2, o2 = t2, l3 = t2.view?.devicePixelRatio || 1;
      if (typeof n2.wheelDeltaY < "u") r2 ? this.deltaY = n2.wheelDeltaY / (120 * l3) : this.deltaY = n2.wheelDeltaY / 120;
      else if (typeof o2.VERTICAL_AXIS < "u" && o2.axis === o2.VERTICAL_AXIS) this.deltaY = -o2.detail / 3;
      else if (t2.type === "wheel") {
        let a = t2;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaY = -t2.deltaY / 3 : this.deltaY = -t2.deltaY : this.deltaY = -t2.deltaY / 40;
      }
      if (typeof n2.wheelDeltaX < "u") Sr && wr ? this.deltaX = -(n2.wheelDeltaX / 120) : r2 ? this.deltaX = n2.wheelDeltaX / (120 * l3) : this.deltaX = n2.wheelDeltaX / 120;
      else if (typeof o2.HORIZONTAL_AXIS < "u" && o2.axis === o2.HORIZONTAL_AXIS) this.deltaX = -t2.detail / 3;
      else if (t2.type === "wheel") {
        let a = t2;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaX = -t2.deltaX / 3 : this.deltaX = -t2.deltaX : this.deltaX = -t2.deltaX / 40;
      }
      this.deltaY === 0 && this.deltaX === 0 && t2.wheelDelta && (r2 ? this.deltaY = t2.wheelDelta / (120 * l3) : this.deltaY = t2.wheelDelta / 120);
    }
  }
  preventDefault() {
    this.browserEvent?.preventDefault();
  }
  stopPropagation() {
    this.browserEvent?.stopPropagation();
  }
};
var Do = Object.freeze(function(s15, t2) {
  let e = setTimeout(s15.bind(t2), 0);
  return { dispose() {
    clearTimeout(e);
  } };
}), ma;
((i) => {
  function s15(r2) {
    return r2 === i.None || r2 === i.Cancelled || r2 instanceof ts ? true : !r2 || typeof r2 != "object" ? false : typeof r2.isCancellationRequested == "boolean" && typeof r2.onCancellationRequested == "function";
  }
  i.isCancellationToken = s15, i.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: $.None }), i.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: Do });
})(ma ||= {});
var ts = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Do : (this._emitter || (this._emitter = new v$1()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var Ye = class {
  constructor(t2, e) {
    this._isDisposed = false;
    this._token = -1, typeof t2 == "function" && typeof e == "number" && this.setIfNotSet(t2, e);
  }
  dispose() {
    this.cancel(), this._isDisposed = true;
  }
  cancel() {
    this._token !== -1 && (clearTimeout(this._token), this._token = -1);
  }
  cancelAndSet(t2, e) {
    if (this._isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed TimeoutTimer");
    this.cancel(), this._token = setTimeout(() => {
      this._token = -1, t2();
    }, e);
  }
  setIfNotSet(t2, e) {
    if (this._isDisposed) throw new Rt("Calling 'setIfNotSet' on a disposed TimeoutTimer");
    this._token === -1 && (this._token = setTimeout(() => {
      this._token = -1, t2();
    }, e));
  }
}, kr = class {
  constructor() {
    this.disposable = void 0;
    this.isDisposed = false;
  }
  cancel() {
    this.disposable?.dispose(), this.disposable = void 0;
  }
  cancelAndSet(t2, e, i = globalThis) {
    if (this.isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed IntervalTimer");
    this.cancel();
    let r2 = i.setInterval(() => {
      t2();
    }, e);
    this.disposable = C(() => {
      i.clearInterval(r2), this.disposable = void 0;
    });
  }
  dispose() {
    this.cancel(), this.isDisposed = true;
  }
};
var va;
((e) => {
  async function s15(i) {
    let r2, n2 = await Promise.all(i.map((o2) => o2.then((l3) => l3, (l3) => {
      r2 || (r2 = l3);
    })));
    if (typeof r2 < "u") throw r2;
    return n2;
  }
  e.settled = s15;
  function t2(i) {
    return new Promise(async (r2, n2) => {
      try {
        await i(r2, n2);
      } catch (o2) {
        n2(o2);
      }
    });
  }
  e.withAsyncBody = t2;
})(va ||= {});
var _e = class _e2 {
  static fromArray(t2) {
    return new _e2((e) => {
      e.emitMany(t2);
    });
  }
  static fromPromise(t2) {
    return new _e2(async (e) => {
      e.emitMany(await t2);
    });
  }
  static fromPromises(t2) {
    return new _e2(async (e) => {
      await Promise.all(t2.map(async (i) => e.emitOne(await i)));
    });
  }
  static merge(t2) {
    return new _e2(async (e) => {
      await Promise.all(t2.map(async (i) => {
        for await (let r2 of i) e.emitOne(r2);
      }));
    });
  }
  constructor(t2, e) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = e, this._onStateChanged = new v$1(), queueMicrotask(async () => {
      let i = { emitOne: (r2) => this.emitOne(r2), emitMany: (r2) => this.emitMany(r2), reject: (r2) => this.reject(r2) };
      try {
        await Promise.resolve(t2(i)), this.resolve();
      } catch (r2) {
        this.reject(r2);
      } finally {
        i.emitOne = void 0, i.emitMany = void 0, i.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t2 = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (t2 < this._results.length) return { done: false, value: this._results[t2++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await $.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(t2, e) {
    return new _e2(async (i) => {
      for await (let r2 of t2) i.emitOne(e(r2));
    });
  }
  map(t2) {
    return _e2.map(this, t2);
  }
  static filter(t2, e) {
    return new _e2(async (i) => {
      for await (let r2 of t2) e(r2) && i.emitOne(r2);
    });
  }
  filter(t2) {
    return _e2.filter(this, t2);
  }
  static coalesce(t2) {
    return _e2.filter(t2, (e) => !!e);
  }
  coalesce() {
    return _e2.coalesce(this);
  }
  static async toPromise(t2) {
    let e = [];
    for await (let i of t2) e.push(i);
    return e;
  }
  toPromise() {
    return _e2.toPromise(this);
  }
  emitOne(t2) {
    this._state === 0 && (this._results.push(t2), this._onStateChanged.fire());
  }
  emitMany(t2) {
    this._state === 0 && (this._results = this._results.concat(t2), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t2) {
    this._state === 0 && (this._state = 2, this._error = t2, this._onStateChanged.fire());
  }
};
_e.EMPTY = _e.fromArray([]);
var { getWindow: be, getWindowId: Oo, onDidRegisterWindow: No } = function() {
  let s15 = /* @__PURE__ */ new Map();
  let t2 = { window: fe, disposables: new Ee() };
  s15.set(fe.vscodeWindowId, t2);
  let e = new v$1(), i = new v$1(), r2 = new v$1();
  function n2(o2, l3) {
    return (typeof o2 == "number" ? s15.get(o2) : void 0) ?? (l3 ? t2 : void 0);
  }
  return { onDidRegisterWindow: e.event, onWillUnregisterWindow: r2.event, onDidUnregisterWindow: i.event, registerWindow(o2) {
    if (s15.has(o2.vscodeWindowId)) return D.None;
    let l3 = new Ee(), a = { window: o2, disposables: l3.add(new Ee()) };
    return s15.set(o2.vscodeWindowId, a), l3.add(C(() => {
      s15.delete(o2.vscodeWindowId), i.fire(o2);
    })), l3.add(L$1(o2, Y.BEFORE_UNLOAD, () => {
      r2.fire(o2);
    })), e.fire(a), l3;
  }, getWindows() {
    return s15.values();
  }, getWindowsCount() {
    return s15.size;
  }, getWindowId(o2) {
    return o2.vscodeWindowId;
  }, hasWindow(o2) {
    return s15.has(o2);
  }, getWindowById: n2, getWindow(o2) {
    let l3 = o2;
    if (l3?.ownerDocument?.defaultView) return l3.ownerDocument.defaultView.window;
    let a = o2;
    return a?.view ? a.view.window : fe;
  }, getDocument(o2) {
    return be(o2).document;
  } };
}();
var ss = class {
  constructor(t2, e, i, r2) {
    this._node = t2, this._type = e, this._handler = i, this._options = r2 || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function L$1(s15, t2, e, i) {
  return new ss(s15, t2, e, i);
}
var os = function(t2, e, i, r2) {
  let n2 = i;
  return L$1(t2, e, n2, r2);
};
var mt;
var Mr = class extends kr {
  constructor(t2) {
    super(), this.defaultTarget = t2 && be(t2);
  }
  cancelAndSet(t2, e, i) {
    return super.cancelAndSet(t2, e, i ?? this.defaultTarget);
  }
}, Di = class {
  constructor(t2, e = 0) {
    this._runner = t2, this.priority = e, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (t2) {
      Lt(t2);
    }
  }
  static sort(t2, e) {
    return e.priority - t2.priority;
  }
};
(function() {
  let s15 = /* @__PURE__ */ new Map(), t2 = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r2 = (n2) => {
    e.set(n2, false);
    let o2 = s15.get(n2) ?? [];
    for (t2.set(n2, o2), s15.set(n2, []), i.set(n2, true); o2.length > 0; ) o2.sort(Di.sort), o2.shift().execute();
    i.set(n2, false);
  };
  mt = (n2, o2, l3 = 0) => {
    let a = Oo(n2), u2 = new Di(o2, l3), h2 = s15.get(a);
    return h2 || (h2 = [], s15.set(a, h2)), h2.push(u2), e.get(a) || (e.set(a, true), n2.requestAnimationFrame(() => r2(a))), u2;
  };
})();
function Fo(s15) {
  let t2 = s15.getBoundingClientRect(), e = be(s15);
  return { left: t2.left + e.scrollX, top: t2.top + e.scrollY, width: t2.width, height: t2.height };
}
var Y = { CLICK: "click", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", KEY_DOWN: "keydown", KEY_UP: "keyup", BEFORE_UNLOAD: "beforeunload", CHANGE: "change", FOCUS: "focus", BLUR: "blur", INPUT: "input" };
var ls = class {
  constructor(t2) {
    this.domNode = t2;
    this._maxWidth = "";
    this._width = "";
    this._height = "";
    this._top = "";
    this._left = "";
    this._bottom = "";
    this._right = "";
    this._paddingTop = "";
    this._paddingLeft = "";
    this._paddingBottom = "";
    this._paddingRight = "";
    this._fontFamily = "";
    this._fontWeight = "";
    this._fontSize = "";
    this._fontStyle = "";
    this._fontFeatureSettings = "";
    this._fontVariationSettings = "";
    this._textDecoration = "";
    this._lineHeight = "";
    this._letterSpacing = "";
    this._className = "";
    this._display = "";
    this._position = "";
    this._visibility = "";
    this._color = "";
    this._backgroundColor = "";
    this._layerHint = false;
    this._contain = "none";
    this._boxShadow = "";
  }
  setMaxWidth(t2) {
    let e = Ie(t2);
    this._maxWidth !== e && (this._maxWidth = e, this.domNode.style.maxWidth = this._maxWidth);
  }
  setWidth(t2) {
    let e = Ie(t2);
    this._width !== e && (this._width = e, this.domNode.style.width = this._width);
  }
  setHeight(t2) {
    let e = Ie(t2);
    this._height !== e && (this._height = e, this.domNode.style.height = this._height);
  }
  setTop(t2) {
    let e = Ie(t2);
    this._top !== e && (this._top = e, this.domNode.style.top = this._top);
  }
  setLeft(t2) {
    let e = Ie(t2);
    this._left !== e && (this._left = e, this.domNode.style.left = this._left);
  }
  setBottom(t2) {
    let e = Ie(t2);
    this._bottom !== e && (this._bottom = e, this.domNode.style.bottom = this._bottom);
  }
  setRight(t2) {
    let e = Ie(t2);
    this._right !== e && (this._right = e, this.domNode.style.right = this._right);
  }
  setPaddingTop(t2) {
    let e = Ie(t2);
    this._paddingTop !== e && (this._paddingTop = e, this.domNode.style.paddingTop = this._paddingTop);
  }
  setPaddingLeft(t2) {
    let e = Ie(t2);
    this._paddingLeft !== e && (this._paddingLeft = e, this.domNode.style.paddingLeft = this._paddingLeft);
  }
  setPaddingBottom(t2) {
    let e = Ie(t2);
    this._paddingBottom !== e && (this._paddingBottom = e, this.domNode.style.paddingBottom = this._paddingBottom);
  }
  setPaddingRight(t2) {
    let e = Ie(t2);
    this._paddingRight !== e && (this._paddingRight = e, this.domNode.style.paddingRight = this._paddingRight);
  }
  setFontFamily(t2) {
    this._fontFamily !== t2 && (this._fontFamily = t2, this.domNode.style.fontFamily = this._fontFamily);
  }
  setFontWeight(t2) {
    this._fontWeight !== t2 && (this._fontWeight = t2, this.domNode.style.fontWeight = this._fontWeight);
  }
  setFontSize(t2) {
    let e = Ie(t2);
    this._fontSize !== e && (this._fontSize = e, this.domNode.style.fontSize = this._fontSize);
  }
  setFontStyle(t2) {
    this._fontStyle !== t2 && (this._fontStyle = t2, this.domNode.style.fontStyle = this._fontStyle);
  }
  setFontFeatureSettings(t2) {
    this._fontFeatureSettings !== t2 && (this._fontFeatureSettings = t2, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
  }
  setFontVariationSettings(t2) {
    this._fontVariationSettings !== t2 && (this._fontVariationSettings = t2, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
  }
  setTextDecoration(t2) {
    this._textDecoration !== t2 && (this._textDecoration = t2, this.domNode.style.textDecoration = this._textDecoration);
  }
  setLineHeight(t2) {
    let e = Ie(t2);
    this._lineHeight !== e && (this._lineHeight = e, this.domNode.style.lineHeight = this._lineHeight);
  }
  setLetterSpacing(t2) {
    let e = Ie(t2);
    this._letterSpacing !== e && (this._letterSpacing = e, this.domNode.style.letterSpacing = this._letterSpacing);
  }
  setClassName(t2) {
    this._className !== t2 && (this._className = t2, this.domNode.className = this._className);
  }
  toggleClassName(t2, e) {
    this.domNode.classList.toggle(t2, e), this._className = this.domNode.className;
  }
  setDisplay(t2) {
    this._display !== t2 && (this._display = t2, this.domNode.style.display = this._display);
  }
  setPosition(t2) {
    this._position !== t2 && (this._position = t2, this.domNode.style.position = this._position);
  }
  setVisibility(t2) {
    this._visibility !== t2 && (this._visibility = t2, this.domNode.style.visibility = this._visibility);
  }
  setColor(t2) {
    this._color !== t2 && (this._color = t2, this.domNode.style.color = this._color);
  }
  setBackgroundColor(t2) {
    this._backgroundColor !== t2 && (this._backgroundColor = t2, this.domNode.style.backgroundColor = this._backgroundColor);
  }
  setLayerHinting(t2) {
    this._layerHint !== t2 && (this._layerHint = t2, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
  }
  setBoxShadow(t2) {
    this._boxShadow !== t2 && (this._boxShadow = t2, this.domNode.style.boxShadow = t2);
  }
  setContain(t2) {
    this._contain !== t2 && (this._contain = t2, this.domNode.style.contain = this._contain);
  }
  setAttribute(t2, e) {
    this.domNode.setAttribute(t2, e);
  }
  removeAttribute(t2) {
    this.domNode.removeAttribute(t2);
  }
  appendChild(t2) {
    this.domNode.appendChild(t2.domNode);
  }
  removeChild(t2) {
    this.domNode.removeChild(t2.domNode);
  }
};
function Ie(s15) {
  return typeof s15 == "number" ? `${s15}px` : s15;
}
function _t(s15) {
  return new ls(s15);
}
var Wt = class {
  constructor() {
    this._hooks = new Ee();
    this._pointerMoveCallback = null;
    this._onStopCallback = null;
  }
  dispose() {
    this.stopMonitoring(false), this._hooks.dispose();
  }
  stopMonitoring(t2, e) {
    if (!this.isMonitoring()) return;
    this._hooks.clear(), this._pointerMoveCallback = null;
    let i = this._onStopCallback;
    this._onStopCallback = null, t2 && i && i(e);
  }
  isMonitoring() {
    return !!this._pointerMoveCallback;
  }
  startMonitoring(t2, e, i, r2, n2) {
    this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = r2, this._onStopCallback = n2;
    let o2 = t2;
    try {
      t2.setPointerCapture(e), this._hooks.add(C(() => {
        try {
          t2.releasePointerCapture(e);
        } catch {
        }
      }));
    } catch {
      o2 = be(t2);
    }
    this._hooks.add(L$1(o2, Y.POINTER_MOVE, (l3) => {
      if (l3.buttons !== i) {
        this.stopMonitoring(true);
        return;
      }
      l3.preventDefault(), this._pointerMoveCallback(l3);
    })), this._hooks.add(L$1(o2, Y.POINTER_UP, (l3) => this.stopMonitoring(true)));
  }
};
function Wo(s15, t2, e) {
  let i = null, r2 = null;
  if (typeof e.value == "function" ? (i = "value", r2 = e.value, r2.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof e.get == "function" && (i = "get", r2 = e.get), !r2) throw new Error("not supported");
  let n2 = `$memoize$${t2}`;
  e[i] = function(...o2) {
    return this.hasOwnProperty(n2) || Object.defineProperty(this, n2, { configurable: false, enumerable: false, writable: false, value: r2.apply(this, o2) }), this[n2];
  };
}
var He;
((n2) => (n2.Tap = "-xterm-gesturetap", n2.Change = "-xterm-gesturechange", n2.Start = "-xterm-gesturestart", n2.End = "-xterm-gesturesend", n2.Contextmenu = "-xterm-gesturecontextmenu"))(He ||= {});
var Q = class Q2 extends D {
  constructor() {
    super();
    this.dispatched = false;
    this.targets = new Ct();
    this.ignoreTargets = new Ct();
    this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register($.runAndSubscribe(No, ({ window: e, disposables: i }) => {
      i.add(L$1(e.document, "touchstart", (r2) => this.onTouchStart(r2), { passive: false })), i.add(L$1(e.document, "touchend", (r2) => this.onTouchEnd(e, r2))), i.add(L$1(e.document, "touchmove", (r2) => this.onTouchMove(r2), { passive: false }));
    }, { window: fe, disposables: this._store }));
  }
  static addTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.targets.push(e);
    return C(i);
  }
  static ignoreTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.ignoreTargets.push(e);
    return C(i);
  }
  static isTouchDevice() {
    return "ontouchstart" in fe || navigator.maxTouchPoints > 0;
  }
  dispose() {
    this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
  }
  onTouchStart(e) {
    let i = Date.now();
    this.handle && (this.handle.dispose(), this.handle = null);
    for (let r2 = 0, n2 = e.targetTouches.length; r2 < n2; r2++) {
      let o2 = e.targetTouches.item(r2);
      this.activeTouches[o2.identifier] = { id: o2.identifier, initialTarget: o2.target, initialTimeStamp: i, initialPageX: o2.pageX, initialPageY: o2.pageY, rollingTimestamps: [i], rollingPageX: [o2.pageX], rollingPageY: [o2.pageY] };
      let l3 = this.newGestureEvent(He.Start, o2.target);
      l3.pageX = o2.pageX, l3.pageY = o2.pageY, this.dispatchEvent(l3);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
  onTouchEnd(e, i) {
    let r2 = Date.now(), n2 = Object.keys(this.activeTouches).length;
    for (let o2 = 0, l3 = i.changedTouches.length; o2 < l3; o2++) {
      let a = i.changedTouches.item(o2);
      if (!this.activeTouches.hasOwnProperty(String(a.identifier))) {
        console.warn("move of an UNKNOWN touch", a);
        continue;
      }
      let u2 = this.activeTouches[a.identifier], h2 = Date.now() - u2.initialTimeStamp;
      if (h2 < Q2.HOLD_DELAY && Math.abs(u2.initialPageX - Se(u2.rollingPageX)) < 30 && Math.abs(u2.initialPageY - Se(u2.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Tap, u2.initialTarget);
        c.pageX = Se(u2.rollingPageX), c.pageY = Se(u2.rollingPageY), this.dispatchEvent(c);
      } else if (h2 >= Q2.HOLD_DELAY && Math.abs(u2.initialPageX - Se(u2.rollingPageX)) < 30 && Math.abs(u2.initialPageY - Se(u2.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Contextmenu, u2.initialTarget);
        c.pageX = Se(u2.rollingPageX), c.pageY = Se(u2.rollingPageY), this.dispatchEvent(c);
      } else if (n2 === 1) {
        let c = Se(u2.rollingPageX), d = Se(u2.rollingPageY), _2 = Se(u2.rollingTimestamps) - u2.rollingTimestamps[0], p2 = c - u2.rollingPageX[0], m2 = d - u2.rollingPageY[0], f2 = [...this.targets].filter((A2) => u2.initialTarget instanceof Node && A2.contains(u2.initialTarget));
        this.inertia(e, f2, r2, Math.abs(p2) / _2, p2 > 0 ? 1 : -1, c, Math.abs(m2) / _2, m2 > 0 ? 1 : -1, d);
      }
      this.dispatchEvent(this.newGestureEvent(He.End, u2.initialTarget)), delete this.activeTouches[a.identifier];
    }
    this.dispatched && (i.preventDefault(), i.stopPropagation(), this.dispatched = false);
  }
  newGestureEvent(e, i) {
    let r2 = document.createEvent("CustomEvent");
    return r2.initEvent(e, false, true), r2.initialTarget = i, r2.tapCount = 0, r2;
  }
  dispatchEvent(e) {
    if (e.type === He.Tap) {
      let i = (/* @__PURE__ */ new Date()).getTime(), r2 = 0;
      i - this._lastSetTapCountTime > Q2.CLEAR_TAP_COUNT_TIME ? r2 = 1 : r2 = 2, this._lastSetTapCountTime = i, e.tapCount = r2;
    } else (e.type === He.Change || e.type === He.Contextmenu) && (this._lastSetTapCountTime = 0);
    if (e.initialTarget instanceof Node) {
      for (let r2 of this.ignoreTargets) if (r2.contains(e.initialTarget)) return;
      let i = [];
      for (let r2 of this.targets) if (r2.contains(e.initialTarget)) {
        let n2 = 0, o2 = e.initialTarget;
        for (; o2 && o2 !== r2; ) n2++, o2 = o2.parentElement;
        i.push([n2, r2]);
      }
      i.sort((r2, n2) => r2[0] - n2[0]);
      for (let [r2, n2] of i) n2.dispatchEvent(e), this.dispatched = true;
    }
  }
  inertia(e, i, r2, n2, o2, l3, a, u2, h2) {
    this.handle = mt(e, () => {
      let c = Date.now(), d = c - r2, _2 = 0, p2 = 0, m2 = true;
      n2 += Q2.SCROLL_FRICTION * d, a += Q2.SCROLL_FRICTION * d, n2 > 0 && (m2 = false, _2 = o2 * n2 * d), a > 0 && (m2 = false, p2 = u2 * a * d);
      let f2 = this.newGestureEvent(He.Change);
      f2.translationX = _2, f2.translationY = p2, i.forEach((A2) => A2.dispatchEvent(f2)), m2 || this.inertia(e, i, c, n2, o2, l3 + _2, a, u2, h2 + p2);
    });
  }
  onTouchMove(e) {
    let i = Date.now();
    for (let r2 = 0, n2 = e.changedTouches.length; r2 < n2; r2++) {
      let o2 = e.changedTouches.item(r2);
      if (!this.activeTouches.hasOwnProperty(String(o2.identifier))) {
        console.warn("end of an UNKNOWN touch", o2);
        continue;
      }
      let l3 = this.activeTouches[o2.identifier], a = this.newGestureEvent(He.Change, l3.initialTarget);
      a.translationX = o2.pageX - Se(l3.rollingPageX), a.translationY = o2.pageY - Se(l3.rollingPageY), a.pageX = o2.pageX, a.pageY = o2.pageY, this.dispatchEvent(a), l3.rollingPageX.length > 3 && (l3.rollingPageX.shift(), l3.rollingPageY.shift(), l3.rollingTimestamps.shift()), l3.rollingPageX.push(o2.pageX), l3.rollingPageY.push(o2.pageY), l3.rollingTimestamps.push(i);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
};
Q.SCROLL_FRICTION = -5e-3, Q.HOLD_DELAY = 700, Q.CLEAR_TAP_COUNT_TIME = 400, M([Wo], Q, "isTouchDevice", 1);
var Pr = Q;
var lt = class extends D {
  onclick(t2, e) {
    this._register(L$1(t2, Y.CLICK, (i) => e(new qe(be(t2), i))));
  }
  onmousedown(t2, e) {
    this._register(L$1(t2, Y.MOUSE_DOWN, (i) => e(new qe(be(t2), i))));
  }
  onmouseover(t2, e) {
    this._register(L$1(t2, Y.MOUSE_OVER, (i) => e(new qe(be(t2), i))));
  }
  onmouseleave(t2, e) {
    this._register(L$1(t2, Y.MOUSE_LEAVE, (i) => e(new qe(be(t2), i))));
  }
  onkeydown(t2, e) {
    this._register(L$1(t2, Y.KEY_DOWN, (i) => e(new ft(i))));
  }
  onkeyup(t2, e) {
    this._register(L$1(t2, Y.KEY_UP, (i) => e(new ft(i))));
  }
  oninput(t2, e) {
    this._register(L$1(t2, Y.INPUT, e));
  }
  onblur(t2, e) {
    this._register(L$1(t2, Y.BLUR, e));
  }
  onfocus(t2, e) {
    this._register(L$1(t2, Y.FOCUS, e));
  }
  onchange(t2, e) {
    this._register(L$1(t2, Y.CHANGE, e));
  }
  ignoreGesture(t2) {
    return Pr.ignoreTarget(t2);
  }
};
var Uo = 11, Or = class extends lt {
  constructor(t2) {
    super(), this._onActivate = t2.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = t2.bgWidth + "px", this.bgDomNode.style.height = t2.bgHeight + "px", typeof t2.top < "u" && (this.bgDomNode.style.top = "0px"), typeof t2.left < "u" && (this.bgDomNode.style.left = "0px"), typeof t2.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof t2.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = t2.className, this.domNode.style.position = "absolute", this.domNode.style.width = Uo + "px", this.domNode.style.height = Uo + "px", typeof t2.top < "u" && (this.domNode.style.top = t2.top + "px"), typeof t2.left < "u" && (this.domNode.style.left = t2.left + "px"), typeof t2.bottom < "u" && (this.domNode.style.bottom = t2.bottom + "px"), typeof t2.right < "u" && (this.domNode.style.right = t2.right + "px"), this._pointerMoveMonitor = this._register(new Wt()), this._register(os(this.bgDomNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._register(os(this.domNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._pointerdownRepeatTimer = this._register(new Mr()), this._pointerdownScheduleRepeatTimer = this._register(new Ye());
  }
  _arrowPointerDown(t2) {
    if (!t2.target || !(t2.target instanceof Element)) return;
    let e = () => {
      this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, be(t2));
    };
    this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(e, 200), this._pointerMoveMonitor.startMonitoring(t2.target, t2.pointerId, t2.buttons, (i) => {
    }, () => {
      this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
    }), t2.preventDefault();
  }
};
var cs = class s9 {
  constructor(t2, e, i, r2, n2, o2, l3) {
    this._forceIntegerValues = t2;
    this._scrollStateBrand = void 0;
    this._forceIntegerValues && (e = e | 0, i = i | 0, r2 = r2 | 0, n2 = n2 | 0, o2 = o2 | 0, l3 = l3 | 0), this.rawScrollLeft = r2, this.rawScrollTop = l3, e < 0 && (e = 0), r2 + e > i && (r2 = i - e), r2 < 0 && (r2 = 0), n2 < 0 && (n2 = 0), l3 + n2 > o2 && (l3 = o2 - n2), l3 < 0 && (l3 = 0), this.width = e, this.scrollWidth = i, this.scrollLeft = r2, this.height = n2, this.scrollHeight = o2, this.scrollTop = l3;
  }
  equals(t2) {
    return this.rawScrollLeft === t2.rawScrollLeft && this.rawScrollTop === t2.rawScrollTop && this.width === t2.width && this.scrollWidth === t2.scrollWidth && this.scrollLeft === t2.scrollLeft && this.height === t2.height && this.scrollHeight === t2.scrollHeight && this.scrollTop === t2.scrollTop;
  }
  withScrollDimensions(t2, e) {
    return new s9(this._forceIntegerValues, typeof t2.width < "u" ? t2.width : this.width, typeof t2.scrollWidth < "u" ? t2.scrollWidth : this.scrollWidth, e ? this.rawScrollLeft : this.scrollLeft, typeof t2.height < "u" ? t2.height : this.height, typeof t2.scrollHeight < "u" ? t2.scrollHeight : this.scrollHeight, e ? this.rawScrollTop : this.scrollTop);
  }
  withScrollPosition(t2) {
    return new s9(this._forceIntegerValues, this.width, this.scrollWidth, typeof t2.scrollLeft < "u" ? t2.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t2.scrollTop < "u" ? t2.scrollTop : this.rawScrollTop);
  }
  createScrollEvent(t2, e) {
    let i = this.width !== t2.width, r2 = this.scrollWidth !== t2.scrollWidth, n2 = this.scrollLeft !== t2.scrollLeft, o2 = this.height !== t2.height, l3 = this.scrollHeight !== t2.scrollHeight, a = this.scrollTop !== t2.scrollTop;
    return { inSmoothScrolling: e, oldWidth: t2.width, oldScrollWidth: t2.scrollWidth, oldScrollLeft: t2.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: t2.height, oldScrollHeight: t2.scrollHeight, oldScrollTop: t2.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i, scrollWidthChanged: r2, scrollLeftChanged: n2, heightChanged: o2, scrollHeightChanged: l3, scrollTopChanged: a };
  }
}, Ri = class extends D {
  constructor(e) {
    super();
    this._scrollableBrand = void 0;
    this._onScroll = this._register(new v$1());
    this.onScroll = this._onScroll.event;
    this._smoothScrollDuration = e.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e.scheduleAtNextAnimationFrame, this._state = new cs(e.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
  }
  dispose() {
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
  }
  setSmoothScrollDuration(e) {
    this._smoothScrollDuration = e;
  }
  validateScrollPosition(e) {
    return this._state.withScrollPosition(e);
  }
  getScrollDimensions() {
    return this._state;
  }
  setScrollDimensions(e, i) {
    let r2 = this._state.withScrollDimensions(e, i);
    this._setState(r2, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
  }
  getFutureScrollPosition() {
    return this._smoothScrolling ? this._smoothScrolling.to : this._state;
  }
  getCurrentScrollPosition() {
    return this._state;
  }
  setScrollPositionNow(e) {
    let i = this._state.withScrollPosition(e);
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(i, false);
  }
  setScrollPositionSmooth(e, i) {
    if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e);
    if (this._smoothScrolling) {
      e = { scrollLeft: typeof e.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e.scrollLeft, scrollTop: typeof e.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e.scrollTop };
      let r2 = this._state.withScrollPosition(e);
      if (this._smoothScrolling.to.scrollLeft === r2.scrollLeft && this._smoothScrolling.to.scrollTop === r2.scrollTop) return;
      let n2;
      i ? n2 = new Nr(this._smoothScrolling.from, r2, this._smoothScrolling.startTime, this._smoothScrolling.duration) : n2 = this._smoothScrolling.combine(this._state, r2, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = n2;
    } else {
      let r2 = this._state.withScrollPosition(e);
      this._smoothScrolling = Nr.start(this._state, r2, this._smoothScrollDuration);
    }
    this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
      this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
    });
  }
  hasPendingScrollAnimation() {
    return !!this._smoothScrolling;
  }
  _performSmoothScrolling() {
    if (!this._smoothScrolling) return;
    let e = this._smoothScrolling.tick(), i = this._state.withScrollPosition(e);
    if (this._setState(i, true), !!this._smoothScrolling) {
      if (e.isDone) {
        this._smoothScrolling.dispose(), this._smoothScrolling = null;
        return;
      }
      this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
        this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
      });
    }
  }
  _setState(e, i) {
    let r2 = this._state;
    r2.equals(e) || (this._state = e, this._onScroll.fire(this._state.createScrollEvent(r2, i)));
  }
}, Br = class {
  constructor(t2, e, i) {
    this.scrollLeft = t2, this.scrollTop = e, this.isDone = i;
  }
};
function as(s15, t2) {
  let e = t2 - s15;
  return function(i) {
    return s15 + e * ka(i);
  };
}
function La(s15, t2, e) {
  return function(i) {
    return i < e ? s15(i / e) : t2((i - e) / (1 - e));
  };
}
var Nr = class s10 {
  constructor(t2, e, i, r2) {
    this.from = t2, this.to = e, this.duration = r2, this.startTime = i, this.animationFrameDisposable = null, this._initAnimations();
  }
  _initAnimations() {
    this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
  }
  _initAnimation(t2, e, i) {
    if (Math.abs(t2 - e) > 2.5 * i) {
      let n2, o2;
      return t2 < e ? (n2 = t2 + 0.75 * i, o2 = e - 0.75 * i) : (n2 = t2 - 0.75 * i, o2 = e + 0.75 * i), La(as(t2, n2), as(o2, e), 0.33);
    }
    return as(t2, e);
  }
  dispose() {
    this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
  }
  acceptScrollDimensions(t2) {
    this.to = t2.withScrollPosition(this.to), this._initAnimations();
  }
  tick() {
    return this._tick(Date.now());
  }
  _tick(t2) {
    let e = (t2 - this.startTime) / this.duration;
    if (e < 1) {
      let i = this.scrollLeft(e), r2 = this.scrollTop(e);
      return new Br(i, r2, false);
    }
    return new Br(this.to.scrollLeft, this.to.scrollTop, true);
  }
  combine(t2, e, i) {
    return s10.start(t2, e, i);
  }
  static start(t2, e, i) {
    i = i + 10;
    let r2 = Date.now() - 10;
    return new s10(t2, e, r2, i);
  }
};
function Aa(s15) {
  return Math.pow(s15, 3);
}
function ka(s15) {
  return 1 - Aa(1 - s15);
}
var Fr = class extends D {
  constructor(t2, e, i) {
    super(), this._visibility = t2, this._visibleClassName = e, this._invisibleClassName = i, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new Ye());
  }
  setVisibility(t2) {
    this._visibility !== t2 && (this._visibility = t2, this._updateShouldBeVisible());
  }
  setShouldBeVisible(t2) {
    this._rawShouldBeVisible = t2, this._updateShouldBeVisible();
  }
  _applyVisibilitySetting() {
    return this._visibility === 2 ? false : this._visibility === 3 ? true : this._rawShouldBeVisible;
  }
  _updateShouldBeVisible() {
    let t2 = this._applyVisibilitySetting();
    this._shouldBeVisible !== t2 && (this._shouldBeVisible = t2, this.ensureVisibility());
  }
  setIsNeeded(t2) {
    this._isNeeded !== t2 && (this._isNeeded = t2, this.ensureVisibility());
  }
  setDomNode(t2) {
    this._domNode = t2, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
  }
  ensureVisibility() {
    if (!this._isNeeded) {
      this._hide(false);
      return;
    }
    this._shouldBeVisible ? this._reveal() : this._hide(true);
  }
  _reveal() {
    this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet(() => {
      this._domNode?.setClassName(this._visibleClassName);
    }, 0));
  }
  _hide(t2) {
    this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (t2 ? " fade" : "")));
  }
};
var Ca = 140, Ut = class extends lt {
  constructor(t2) {
    super(), this._lazyRender = t2.lazyRender, this._host = t2.host, this._scrollable = t2.scrollable, this._scrollByPage = t2.scrollByPage, this._scrollbarState = t2.scrollbarState, this._visibilityController = this._register(new Fr(t2.visibility, "visible scrollbar " + t2.extraScrollbarClassName, "invisible scrollbar " + t2.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new Wt()), this._shouldRender = true, this.domNode = _t(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(L$1(this.domNode.domNode, Y.POINTER_DOWN, (e) => this._domNodePointerDown(e)));
  }
  _createArrow(t2) {
    let e = this._register(new Or(t2));
    this.domNode.domNode.appendChild(e.bgDomNode), this.domNode.domNode.appendChild(e.domNode);
  }
  _createSlider(t2, e, i, r2) {
    this.slider = _t(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(t2), this.slider.setLeft(e), typeof i == "number" && this.slider.setWidth(i), typeof r2 == "number" && this.slider.setHeight(r2), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(L$1(this.slider.domNode, Y.POINTER_DOWN, (n2) => {
      n2.button === 0 && (n2.preventDefault(), this._sliderPointerDown(n2));
    })), this.onclick(this.slider.domNode, (n2) => {
      n2.leftButton && n2.stopPropagation();
    });
  }
  _onElementSize(t2) {
    return this._scrollbarState.setVisibleSize(t2) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollSize(t2) {
    return this._scrollbarState.setScrollSize(t2) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollPosition(t2) {
    return this._scrollbarState.setScrollPosition(t2) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  beginReveal() {
    this._visibilityController.setShouldBeVisible(true);
  }
  beginHide() {
    this._visibilityController.setShouldBeVisible(false);
  }
  render() {
    this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
  }
  _domNodePointerDown(t2) {
    t2.target === this.domNode.domNode && this._onPointerDown(t2);
  }
  delegatePointerDown(t2) {
    let e = this.domNode.domNode.getClientRects()[0].top, i = e + this._scrollbarState.getSliderPosition(), r2 = e + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), n2 = this._sliderPointerPosition(t2);
    i <= n2 && n2 <= r2 ? t2.button === 0 && (t2.preventDefault(), this._sliderPointerDown(t2)) : this._onPointerDown(t2);
  }
  _onPointerDown(t2) {
    let e, i;
    if (t2.target === this.domNode.domNode && typeof t2.offsetX == "number" && typeof t2.offsetY == "number") e = t2.offsetX, i = t2.offsetY;
    else {
      let n2 = Fo(this.domNode.domNode);
      e = t2.pageX - n2.left, i = t2.pageY - n2.top;
    }
    let r2 = this._pointerDownRelativePosition(e, i);
    this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r2) : this._scrollbarState.getDesiredScrollPositionFromOffset(r2)), t2.button === 0 && (t2.preventDefault(), this._sliderPointerDown(t2));
  }
  _sliderPointerDown(t2) {
    if (!t2.target || !(t2.target instanceof Element)) return;
    let e = this._sliderPointerPosition(t2), i = this._sliderOrthogonalPointerPosition(t2), r2 = this._scrollbarState.clone();
    this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(t2.target, t2.pointerId, t2.buttons, (n2) => {
      let o2 = this._sliderOrthogonalPointerPosition(n2), l3 = Math.abs(o2 - i);
      if (wr && l3 > Ca) {
        this._setDesiredScrollPositionNow(r2.getScrollPosition());
        return;
      }
      let u2 = this._sliderPointerPosition(n2) - e;
      this._setDesiredScrollPositionNow(r2.getDesiredScrollPositionFromDelta(u2));
    }, () => {
      this.slider.toggleClassName("active", false), this._host.onDragEnd();
    }), this._host.onDragStart();
  }
  _setDesiredScrollPositionNow(t2) {
    let e = {};
    this.writeScrollPosition(e, t2), this._scrollable.setScrollPositionNow(e);
  }
  updateScrollbarSize(t2) {
    this._updateScrollbarSize(t2), this._scrollbarState.setScrollbarSize(t2), this._shouldRender = true, this._lazyRender || this.render();
  }
  isNeeded() {
    return this._scrollbarState.isNeeded();
  }
};
var Kt = class s11 {
  constructor(t2, e, i, r2, n2, o2) {
    this._scrollbarSize = Math.round(e), this._oppositeScrollbarSize = Math.round(i), this._arrowSize = Math.round(t2), this._visibleSize = r2, this._scrollSize = n2, this._scrollPosition = o2, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
  }
  clone() {
    return new s11(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
  }
  setVisibleSize(t2) {
    let e = Math.round(t2);
    return this._visibleSize !== e ? (this._visibleSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollSize(t2) {
    let e = Math.round(t2);
    return this._scrollSize !== e ? (this._scrollSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollPosition(t2) {
    let e = Math.round(t2);
    return this._scrollPosition !== e ? (this._scrollPosition = e, this._refreshComputedValues(), true) : false;
  }
  setScrollbarSize(t2) {
    this._scrollbarSize = Math.round(t2);
  }
  setOppositeScrollbarSize(t2) {
    this._oppositeScrollbarSize = Math.round(t2);
  }
  static _computeValues(t2, e, i, r2, n2) {
    let o2 = Math.max(0, i - t2), l3 = Math.max(0, o2 - 2 * e), a = r2 > 0 && r2 > i;
    if (!a) return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(l3), computedSliderRatio: 0, computedSliderPosition: 0 };
    let u2 = Math.round(Math.max(20, Math.floor(i * l3 / r2))), h2 = (l3 - u2) / (r2 - i), c = n2 * h2;
    return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(u2), computedSliderRatio: h2, computedSliderPosition: Math.round(c) };
  }
  _refreshComputedValues() {
    let t2 = s11._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
    this._computedAvailableSize = t2.computedAvailableSize, this._computedIsNeeded = t2.computedIsNeeded, this._computedSliderSize = t2.computedSliderSize, this._computedSliderRatio = t2.computedSliderRatio, this._computedSliderPosition = t2.computedSliderPosition;
  }
  getArrowSize() {
    return this._arrowSize;
  }
  getScrollPosition() {
    return this._scrollPosition;
  }
  getRectangleLargeSize() {
    return this._computedAvailableSize;
  }
  getRectangleSmallSize() {
    return this._scrollbarSize;
  }
  isNeeded() {
    return this._computedIsNeeded;
  }
  getSliderSize() {
    return this._computedSliderSize;
  }
  getSliderPosition() {
    return this._computedSliderPosition;
  }
  getDesiredScrollPositionFromOffset(t2) {
    if (!this._computedIsNeeded) return 0;
    let e = t2 - this._arrowSize - this._computedSliderSize / 2;
    return Math.round(e / this._computedSliderRatio);
  }
  getDesiredScrollPositionFromOffsetPaged(t2) {
    if (!this._computedIsNeeded) return 0;
    let e = t2 - this._arrowSize, i = this._scrollPosition;
    return e < this._computedSliderPosition ? i -= this._visibleSize : i += this._visibleSize, i;
  }
  getDesiredScrollPositionFromDelta(t2) {
    if (!this._computedIsNeeded) return 0;
    let e = this._computedSliderPosition + t2;
    return Math.round(e / this._computedSliderRatio);
  }
};
var Wr = class extends Ut {
  constructor(t2, e, i) {
    let r2 = t2.getScrollDimensions(), n2 = t2.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.horizontalHasArrows ? e.arrowSize : 0, e.horizontal === 2 ? 0 : e.horizontalScrollbarSize, e.vertical === 2 ? 0 : e.verticalScrollbarSize, r2.width, r2.scrollWidth, n2.scrollLeft), visibility: e.horizontal, extraScrollbarClassName: "horizontal", scrollable: t2, scrollByPage: e.scrollByPage }), e.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(Math.floor((e.horizontalScrollbarSize - e.horizontalSliderSize) / 2), 0, void 0, e.horizontalSliderSize);
  }
  _updateSlider(t2, e) {
    this.slider.setWidth(t2), this.slider.setLeft(e);
  }
  _renderDomNode(t2, e) {
    this.domNode.setWidth(t2), this.domNode.setHeight(e), this.domNode.setLeft(0), this.domNode.setBottom(0);
  }
  onDidScroll(t2) {
    return this._shouldRender = this._onElementScrollSize(t2.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t2.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(t2.width) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t2, e) {
    return t2;
  }
  _sliderPointerPosition(t2) {
    return t2.pageX;
  }
  _sliderOrthogonalPointerPosition(t2) {
    return t2.pageY;
  }
  _updateScrollbarSize(t2) {
    this.slider.setHeight(t2);
  }
  writeScrollPosition(t2, e) {
    t2.scrollLeft = e;
  }
  updateOptions(t2) {
    this.updateScrollbarSize(t2.horizontal === 2 ? 0 : t2.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(t2.vertical === 2 ? 0 : t2.verticalScrollbarSize), this._visibilityController.setVisibility(t2.horizontal), this._scrollByPage = t2.scrollByPage;
  }
};
var Ur = class extends Ut {
  constructor(t2, e, i) {
    let r2 = t2.getScrollDimensions(), n2 = t2.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.verticalHasArrows ? e.arrowSize : 0, e.vertical === 2 ? 0 : e.verticalScrollbarSize, 0, r2.height, r2.scrollHeight, n2.scrollTop), visibility: e.vertical, extraScrollbarClassName: "vertical", scrollable: t2, scrollByPage: e.scrollByPage }), e.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(0, Math.floor((e.verticalScrollbarSize - e.verticalSliderSize) / 2), e.verticalSliderSize, void 0);
  }
  _updateSlider(t2, e) {
    this.slider.setHeight(t2), this.slider.setTop(e);
  }
  _renderDomNode(t2, e) {
    this.domNode.setWidth(e), this.domNode.setHeight(t2), this.domNode.setRight(0), this.domNode.setTop(0);
  }
  onDidScroll(t2) {
    return this._shouldRender = this._onElementScrollSize(t2.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t2.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(t2.height) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t2, e) {
    return e;
  }
  _sliderPointerPosition(t2) {
    return t2.pageY;
  }
  _sliderOrthogonalPointerPosition(t2) {
    return t2.pageX;
  }
  _updateScrollbarSize(t2) {
    this.slider.setWidth(t2);
  }
  writeScrollPosition(t2, e) {
    t2.scrollTop = e;
  }
  updateOptions(t2) {
    this.updateScrollbarSize(t2.vertical === 2 ? 0 : t2.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(t2.vertical), this._scrollByPage = t2.scrollByPage;
  }
};
var Ma = 500, Ko = 50, us = class {
  constructor(t2, e, i) {
    this.timestamp = t2, this.deltaX = e, this.deltaY = i, this.score = 0;
  }
}, zr = class zr2 {
  constructor() {
    this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
  }
  isPhysicalMouseWheel() {
    if (this._front === -1 && this._rear === -1) return false;
    let t2 = 1, e = 0, i = 1, r2 = this._rear;
    do {
      let n2 = r2 === this._front ? t2 : Math.pow(2, -i);
      if (t2 -= n2, e += this._memory[r2].score * n2, r2 === this._front) break;
      r2 = (this._capacity + r2 - 1) % this._capacity, i++;
    } while (true);
    return e <= 0.5;
  }
  acceptStandardWheelEvent(t2) {
    if (Ti) {
      let e = be(t2.browserEvent), i = mo(e);
      this.accept(Date.now(), t2.deltaX * i, t2.deltaY * i);
    } else this.accept(Date.now(), t2.deltaX, t2.deltaY);
  }
  accept(t2, e, i) {
    let r2 = null, n2 = new us(t2, e, i);
    this._front === -1 && this._rear === -1 ? (this._memory[0] = n2, this._front = 0, this._rear = 0) : (r2 = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = n2), n2.score = this._computeScore(n2, r2);
  }
  _computeScore(t2, e) {
    if (Math.abs(t2.deltaX) > 0 && Math.abs(t2.deltaY) > 0) return 1;
    let i = 0.5;
    if ((!this._isAlmostInt(t2.deltaX) || !this._isAlmostInt(t2.deltaY)) && (i += 0.25), e) {
      let r2 = Math.abs(t2.deltaX), n2 = Math.abs(t2.deltaY), o2 = Math.abs(e.deltaX), l3 = Math.abs(e.deltaY), a = Math.max(Math.min(r2, o2), 1), u2 = Math.max(Math.min(n2, l3), 1), h2 = Math.max(r2, o2), c = Math.max(n2, l3);
      h2 % a === 0 && c % u2 === 0 && (i -= 0.5);
    }
    return Math.min(Math.max(i, 0), 1);
  }
  _isAlmostInt(t2) {
    return Math.abs(Math.round(t2) - t2) < 0.01;
  }
};
zr.INSTANCE = new zr();
var hs = zr, ds = class extends lt {
  constructor(e, i, r2) {
    super();
    this._onScroll = this._register(new v$1());
    this.onScroll = this._onScroll.event;
    this._onWillScroll = this._register(new v$1());
    this.onWillScroll = this._onWillScroll.event;
    this._options = Pa(i), this._scrollable = r2, this._register(this._scrollable.onScroll((o2) => {
      this._onWillScroll.fire(o2), this._onDidScroll(o2), this._onScroll.fire(o2);
    }));
    let n2 = { onMouseWheel: (o2) => this._onMouseWheel(o2), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
    this._verticalScrollbar = this._register(new Ur(this._scrollable, this._options, n2)), this._horizontalScrollbar = this._register(new Wr(this._scrollable, this._options, n2)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = _t(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = _t(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = _t(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (o2) => this._onMouseOver(o2)), this.onmouseleave(this._listenOnDomNode, (o2) => this._onMouseLeave(o2)), this._hideTimeout = this._register(new Ye()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
  }
  get options() {
    return this._options;
  }
  dispose() {
    this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), super.dispose();
  }
  getDomNode() {
    return this._domNode;
  }
  getOverviewRulerLayoutInfo() {
    return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
  }
  delegateVerticalScrollbarPointerDown(e) {
    this._verticalScrollbar.delegatePointerDown(e);
  }
  getScrollDimensions() {
    return this._scrollable.getScrollDimensions();
  }
  setScrollDimensions(e) {
    this._scrollable.setScrollDimensions(e, false);
  }
  updateClassName(e) {
    this._options.className = e, Te && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
  }
  updateOptions(e) {
    typeof e.handleMouseWheel < "u" && (this._options.handleMouseWheel = e.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e.mouseWheelScrollSensitivity), typeof e.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e.fastScrollSensitivity), typeof e.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e.scrollPredominantAxis), typeof e.horizontal < "u" && (this._options.horizontal = e.horizontal), typeof e.vertical < "u" && (this._options.vertical = e.vertical), typeof e.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e.horizontalScrollbarSize), typeof e.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e.verticalScrollbarSize), typeof e.scrollByPage < "u" && (this._options.scrollByPage = e.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
  }
  setRevealOnScroll(e) {
    this._revealOnScroll = e;
  }
  delegateScrollFromMouseWheelEvent(e) {
    this._onMouseWheel(new xi(e));
  }
  _setListeningToMouseWheel(e) {
    if (this._mouseWheelToDispose.length > 0 !== e && (this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), e)) {
      let r2 = (n2) => {
        this._onMouseWheel(new xi(n2));
      };
      this._mouseWheelToDispose.push(L$1(this._listenOnDomNode, Y.MOUSE_WHEEL, r2, { passive: false }));
    }
  }
  _onMouseWheel(e) {
    if (e.browserEvent?.defaultPrevented) return;
    let i = hs.INSTANCE;
    i.acceptStandardWheelEvent(e);
    let r2 = false;
    if (e.deltaY || e.deltaX) {
      let o2 = e.deltaY * this._options.mouseWheelScrollSensitivity, l3 = e.deltaX * this._options.mouseWheelScrollSensitivity;
      this._options.scrollPredominantAxis && (this._options.scrollYToX && l3 + o2 === 0 ? l3 = o2 = 0 : Math.abs(o2) >= Math.abs(l3) ? l3 = 0 : o2 = 0), this._options.flipAxes && ([o2, l3] = [l3, o2]);
      let a = !Te && e.browserEvent && e.browserEvent.shiftKey;
      (this._options.scrollYToX || a) && !l3 && (l3 = o2, o2 = 0), e.browserEvent && e.browserEvent.altKey && (l3 = l3 * this._options.fastScrollSensitivity, o2 = o2 * this._options.fastScrollSensitivity);
      let u2 = this._scrollable.getFutureScrollPosition(), h2 = {};
      if (o2) {
        let c = Ko * o2, d = u2.scrollTop - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._verticalScrollbar.writeScrollPosition(h2, d);
      }
      if (l3) {
        let c = Ko * l3, d = u2.scrollLeft - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._horizontalScrollbar.writeScrollPosition(h2, d);
      }
      h2 = this._scrollable.validateScrollPosition(h2), (u2.scrollLeft !== h2.scrollLeft || u2.scrollTop !== h2.scrollTop) && (this._options.mouseWheelSmoothScroll && i.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(h2) : this._scrollable.setScrollPositionNow(h2), r2 = true);
    }
    let n2 = r2;
    !n2 && this._options.alwaysConsumeMouseWheel && (n2 = true), !n2 && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (n2 = true), n2 && (e.preventDefault(), e.stopPropagation());
  }
  _onDidScroll(e) {
    this._shouldRender = this._horizontalScrollbar.onDidScroll(e) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
  }
  renderNow() {
    if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
    this._render();
  }
  _render() {
    if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
      let e = this._scrollable.getCurrentScrollPosition(), i = e.scrollTop > 0, r2 = e.scrollLeft > 0, n2 = r2 ? " left" : "", o2 = i ? " top" : "", l3 = r2 || i ? " top-left-corner" : "";
      this._leftShadowDomNode.setClassName(`shadow${n2}`), this._topShadowDomNode.setClassName(`shadow${o2}`), this._topLeftShadowDomNode.setClassName(`shadow${l3}${o2}${n2}`);
    }
  }
  _onDragStart() {
    this._isDragging = true, this._reveal();
  }
  _onDragEnd() {
    this._isDragging = false, this._hide();
  }
  _onMouseLeave(e) {
    this._mouseIsOver = false, this._hide();
  }
  _onMouseOver(e) {
    this._mouseIsOver = true, this._reveal();
  }
  _reveal() {
    this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
  }
  _hide() {
    !this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
  }
  _scheduleHide() {
    !this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Ma);
  }
};
var Kr = class extends ds {
  constructor(t2, e, i) {
    super(t2, e, i);
  }
  setScrollPosition(t2) {
    t2.reuseAnimation ? this._scrollable.setScrollPositionSmooth(t2, t2.reuseAnimation) : this._scrollable.setScrollPositionNow(t2);
  }
  getScrollPosition() {
    return this._scrollable.getCurrentScrollPosition();
  }
};
function Pa(s15) {
  let t2 = { lazyRender: typeof s15.lazyRender < "u" ? s15.lazyRender : false, className: typeof s15.className < "u" ? s15.className : "", useShadows: typeof s15.useShadows < "u" ? s15.useShadows : true, handleMouseWheel: typeof s15.handleMouseWheel < "u" ? s15.handleMouseWheel : true, flipAxes: typeof s15.flipAxes < "u" ? s15.flipAxes : false, consumeMouseWheelIfScrollbarIsNeeded: typeof s15.consumeMouseWheelIfScrollbarIsNeeded < "u" ? s15.consumeMouseWheelIfScrollbarIsNeeded : false, alwaysConsumeMouseWheel: typeof s15.alwaysConsumeMouseWheel < "u" ? s15.alwaysConsumeMouseWheel : false, scrollYToX: typeof s15.scrollYToX < "u" ? s15.scrollYToX : false, mouseWheelScrollSensitivity: typeof s15.mouseWheelScrollSensitivity < "u" ? s15.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: typeof s15.fastScrollSensitivity < "u" ? s15.fastScrollSensitivity : 5, scrollPredominantAxis: typeof s15.scrollPredominantAxis < "u" ? s15.scrollPredominantAxis : true, mouseWheelSmoothScroll: typeof s15.mouseWheelSmoothScroll < "u" ? s15.mouseWheelSmoothScroll : true, arrowSize: typeof s15.arrowSize < "u" ? s15.arrowSize : 11, listenOnDomNode: typeof s15.listenOnDomNode < "u" ? s15.listenOnDomNode : null, horizontal: typeof s15.horizontal < "u" ? s15.horizontal : 1, horizontalScrollbarSize: typeof s15.horizontalScrollbarSize < "u" ? s15.horizontalScrollbarSize : 10, horizontalSliderSize: typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : 0, horizontalHasArrows: typeof s15.horizontalHasArrows < "u" ? s15.horizontalHasArrows : false, vertical: typeof s15.vertical < "u" ? s15.vertical : 1, verticalScrollbarSize: typeof s15.verticalScrollbarSize < "u" ? s15.verticalScrollbarSize : 10, verticalHasArrows: typeof s15.verticalHasArrows < "u" ? s15.verticalHasArrows : false, verticalSliderSize: typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : 0, scrollByPage: typeof s15.scrollByPage < "u" ? s15.scrollByPage : false };
  return t2.horizontalSliderSize = typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : t2.horizontalScrollbarSize, t2.verticalSliderSize = typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : t2.verticalScrollbarSize, Te && (t2.className += " mac"), t2;
}
var zt = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2) {
    super();
    this._bufferService = r2;
    this._optionsService = a;
    this._renderService = u2;
    this._onRequestScrollLines = this._register(new v$1());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._isSyncing = false;
    this._isHandlingScroll = false;
    this._suppressOnScrollHandler = false;
    let h2 = this._register(new Ri({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (c) => mt(n2.window, c) }));
    this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
      h2.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
    })), this._scrollableElement = this._register(new Kr(i, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, h2)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(o2.onProtocolChange((c) => {
      this._scrollableElement.updateOptions({ handleMouseWheel: !(c & 16) });
    })), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register($.runAndSubscribe(l3.onChangeColors, () => {
      this._scrollableElement.getDomNode().style.backgroundColor = l3.colors.background.css;
    })), e.appendChild(this._scrollableElement.getDomNode()), this._register(C(() => this._scrollableElement.getDomNode().remove())), this._styleElement = n2.mainDocument.createElement("style"), i.appendChild(this._styleElement), this._register(C(() => this._styleElement.remove())), this._register($.runAndSubscribe(l3.onChangeColors, () => {
      this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${l3.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${l3.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${l3.colors.scrollbarSliderActiveBackground.css};`, "}"].join(`
`);
    })), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._latestYDisp = void 0, this.queueSync();
    })), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((c) => this._handleScroll(c)));
  }
  scrollLines(e) {
    let i = this._scrollableElement.getScrollPosition();
    this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: i.scrollTop + e * this._renderService.dimensions.css.cell.height });
  }
  scrollToLine(e, i) {
    i && (this._latestYDisp = e), this._scrollableElement.setScrollPosition({ reuseAnimation: !i, scrollTop: e * this._renderService.dimensions.css.cell.height });
  }
  _getChangeOptions() {
    return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
  }
  queueSync(e) {
    e !== void 0 && (this._latestYDisp = e), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
      this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
    }));
  }
  _sync(e = this._bufferService.buffer.ydisp) {
    !this._renderService || this._isSyncing || (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
  }
  _handleScroll(e) {
    if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
    this._isHandlingScroll = true;
    let i = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height), r2 = i - this._bufferService.buffer.ydisp;
    r2 !== 0 && (this._latestYDisp = i, this._onRequestScrollLines.fire(r2)), this._isHandlingScroll = false;
  }
};
zt = M([S(2, F), S(3, ae), S(4, rr), S(5, Re), S(6, H), S(7, ce)], zt);
var Gt = class extends D {
  constructor(e, i, r2, n2, o2) {
    super();
    this._screenElement = e;
    this._bufferService = i;
    this._coreBrowserService = r2;
    this._decorationService = n2;
    this._renderService = o2;
    this._decorationElements = /* @__PURE__ */ new Map();
    this._altBufferIsActive = false;
    this._dimensionsChanged = false;
    this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
      this._dimensionsChanged = true, this._queueRefresh();
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
    })), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((l3) => this._removeDecoration(l3))), this._register(C(() => {
      this._container.remove(), this._decorationElements.clear();
    }));
  }
  _queueRefresh() {
    this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
      this._doRefreshDecorations(), this._animationFrame = void 0;
    }));
  }
  _doRefreshDecorations() {
    for (let e of this._decorationService.decorations) this._renderDecoration(e);
    this._dimensionsChanged = false;
  }
  _renderDecoration(e) {
    this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
  }
  _createElement(e) {
    let i = this._coreBrowserService.mainDocument.createElement("div");
    i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", e?.options?.layer === "top"), i.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, i.style.top = `${(e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
    let r2 = e.options.x ?? 0;
    return r2 && r2 > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e, i), i;
  }
  _refreshStyle(e) {
    let i = e.marker.line - this._bufferService.buffers.active.ydisp;
    if (i < 0 || i >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
    else {
      let r2 = this._decorationElements.get(e);
      r2 || (r2 = this._createElement(e), e.element = r2, this._decorationElements.set(e, r2), this._container.appendChild(r2), e.onDispose(() => {
        this._decorationElements.delete(e), r2.remove();
      })), r2.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (r2.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, r2.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, r2.style.top = `${i * this._renderService.dimensions.css.cell.height}px`, r2.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e.onRenderEmitter.fire(r2);
    }
  }
  _refreshXPosition(e, i = e.element) {
    if (!i) return;
    let r2 = e.options.x ?? 0;
    (e.options.anchor || "left") === "right" ? i.style.right = r2 ? `${r2 * this._renderService.dimensions.css.cell.width}px` : "" : i.style.left = r2 ? `${r2 * this._renderService.dimensions.css.cell.width}px` : "";
  }
  _removeDecoration(e) {
    this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
  }
};
Gt = M([S(1, F), S(2, ae), S(3, Be), S(4, ce)], Gt);
var Gr = class {
  constructor() {
    this._zones = [];
    this._zonePool = [];
    this._zonePoolIndex = 0;
    this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
  }
  get zones() {
    return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
  }
  clear() {
    this._zones.length = 0, this._zonePoolIndex = 0;
  }
  addDecoration(t2) {
    if (t2.options.overviewRulerOptions) {
      for (let e of this._zones) if (e.color === t2.options.overviewRulerOptions.color && e.position === t2.options.overviewRulerOptions.position) {
        if (this._lineIntersectsZone(e, t2.marker.line)) return;
        if (this._lineAdjacentToZone(e, t2.marker.line, t2.options.overviewRulerOptions.position)) {
          this._addLineToZone(e, t2.marker.line);
          return;
        }
      }
      if (this._zonePoolIndex < this._zonePool.length) {
        this._zonePool[this._zonePoolIndex].color = t2.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = t2.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = t2.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = t2.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
        return;
      }
      this._zones.push({ color: t2.options.overviewRulerOptions.color, position: t2.options.overviewRulerOptions.position, startBufferLine: t2.marker.line, endBufferLine: t2.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
    }
  }
  setPadding(t2) {
    this._linePadding = t2;
  }
  _lineIntersectsZone(t2, e) {
    return e >= t2.startBufferLine && e <= t2.endBufferLine;
  }
  _lineAdjacentToZone(t2, e, i) {
    return e >= t2.startBufferLine - this._linePadding[i || "full"] && e <= t2.endBufferLine + this._linePadding[i || "full"];
  }
  _addLineToZone(t2, e) {
    t2.startBufferLine = Math.min(t2.startBufferLine, e), t2.endBufferLine = Math.max(t2.endBufferLine, e);
  }
};
var We = { full: 0, left: 0, center: 0, right: 0 }, at = { full: 0, left: 0, center: 0, right: 0 }, Li = { full: 0, left: 0, center: 0, right: 0 }, bt = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2) {
    super();
    this._viewportElement = e;
    this._screenElement = i;
    this._bufferService = r2;
    this._decorationService = n2;
    this._renderService = o2;
    this._optionsService = l3;
    this._themeService = a;
    this._coreBrowserService = u2;
    this._colorZoneStore = new Gr();
    this._shouldUpdateDimensions = true;
    this._shouldUpdateAnchor = true;
    this._lastKnownBufferLength = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(C(() => this._canvas?.remove()));
    let h2 = this._canvas.getContext("2d");
    if (h2) this._ctx = h2;
    else throw new Error("Ctx cannot be null");
    this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
    })), this._register(this._bufferService.onScroll(() => {
      this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
    })), this._register(this._renderService.onRender(() => {
      (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) && (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(true))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(true);
  }
  get _width() {
    return this._optionsService.options.overviewRuler?.width || 0;
  }
  _refreshDrawConstants() {
    let e = Math.floor((this._canvas.width - 1) / 3), i = Math.ceil((this._canvas.width - 1) / 3);
    at.full = this._canvas.width, at.left = e, at.center = i, at.right = e, this._refreshDrawHeightConstants(), Li.full = 1, Li.left = 1, Li.center = 1 + at.left, Li.right = 1 + at.left + at.center;
  }
  _refreshDrawHeightConstants() {
    We.full = Math.round(2 * this._coreBrowserService.dpr);
    let e = this._canvas.height / this._bufferService.buffer.lines.length, i = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
    We.left = i, We.center = i, We.right = i;
  }
  _refreshColorZonePadding() {
    this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
  }
  _refreshCanvasDimensions() {
    this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
  }
  _refreshDecorations() {
    this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
    for (let i of this._decorationService.decorations) this._colorZoneStore.addDecoration(i);
    this._ctx.lineWidth = 1, this._renderRulerOutline();
    let e = this._colorZoneStore.zones;
    for (let i of e) i.position !== "full" && this._renderColorZone(i);
    for (let i of e) i.position === "full" && this._renderColorZone(i);
    this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
  }
  _renderRulerOutline() {
    this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
  }
  _renderColorZone(e) {
    this._ctx.fillStyle = e.color, this._ctx.fillRect(Li[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - We[e.position || "full"] / 2), at[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + We[e.position || "full"]));
  }
  _queueRefresh(e, i) {
    this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = i || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._refreshDecorations(), this._animationFrame = void 0;
    }));
  }
};
bt = M([S(2, F), S(3, Be), S(4, ce), S(5, H), S(6, Re), S(7, ae)], bt);
var b;
((E2) => (E2.NUL = "\0", E2.SOH = "", E2.STX = "", E2.ETX = "", E2.EOT = "", E2.ENQ = "", E2.ACK = "", E2.BEL = "\x07", E2.BS = "\b", E2.HT = "	", E2.LF = `
`, E2.VT = "\v", E2.FF = "\f", E2.CR = "\r", E2.SO = "", E2.SI = "", E2.DLE = "", E2.DC1 = "", E2.DC2 = "", E2.DC3 = "", E2.DC4 = "", E2.NAK = "", E2.SYN = "", E2.ETB = "", E2.CAN = "", E2.EM = "", E2.SUB = "", E2.ESC = "\x1B", E2.FS = "", E2.GS = "", E2.RS = "", E2.US = "", E2.SP = " ", E2.DEL = ""))(b ||= {});
var Ai;
((g2) => (g2.PAD = "", g2.HOP = "", g2.BPH = "", g2.NBH = "", g2.IND = "", g2.NEL = "", g2.SSA = "", g2.ESA = "", g2.HTS = "", g2.HTJ = "", g2.VTS = "", g2.PLD = "", g2.PLU = "", g2.RI = "", g2.SS2 = "", g2.SS3 = "", g2.DCS = "", g2.PU1 = "", g2.PU2 = "", g2.STS = "", g2.CCH = "", g2.MW = "", g2.SPA = "", g2.EPA = "", g2.SOS = "", g2.SGCI = "", g2.SCI = "", g2.CSI = "", g2.ST = "", g2.OSC = "", g2.PM = "", g2.APC = ""))(Ai ||= {});
var fs;
((t2) => t2.ST = `${b.ESC}\\`)(fs ||= {});
var $t = class {
  constructor(t2, e, i, r2, n2, o2) {
    this._textarea = t2;
    this._compositionView = e;
    this._bufferService = i;
    this._optionsService = r2;
    this._coreService = n2;
    this._renderService = o2;
    this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
  }
  get isComposing() {
    return this._isComposing;
  }
  compositionstart() {
    this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
  }
  compositionupdate(t2) {
    this._compositionView.textContent = t2.data, this.updateCompositionElements(), setTimeout(() => {
      this._compositionPosition.end = this._textarea.value.length;
    }, 0);
  }
  compositionend() {
    this._finalizeComposition(true);
  }
  keydown(t2) {
    if (this._isComposing || this._isSendingComposition) {
      if (t2.keyCode === 20 || t2.keyCode === 229 || t2.keyCode === 16 || t2.keyCode === 17 || t2.keyCode === 18) return false;
      this._finalizeComposition(false);
    }
    return t2.keyCode === 229 ? (this._handleAnyTextareaChanges(), false) : true;
  }
  _finalizeComposition(t2) {
    if (this._compositionView.classList.remove("active"), this._isComposing = false, t2) {
      let e = { start: this._compositionPosition.start, end: this._compositionPosition.end };
      this._isSendingComposition = true, setTimeout(() => {
        if (this._isSendingComposition) {
          this._isSendingComposition = false;
          let i;
          e.start += this._dataAlreadySent.length, this._isComposing ? i = this._textarea.value.substring(e.start, this._compositionPosition.start) : i = this._textarea.value.substring(e.start), i.length > 0 && this._coreService.triggerDataEvent(i, true);
        }
      }, 0);
    } else {
      this._isSendingComposition = false;
      let e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
      this._coreService.triggerDataEvent(e, true);
    }
  }
  _handleAnyTextareaChanges() {
    let t2 = this._textarea.value;
    setTimeout(() => {
      if (!this._isComposing) {
        let e = this._textarea.value, i = e.replace(t2, "");
        this._dataAlreadySent = i, e.length > t2.length ? this._coreService.triggerDataEvent(i, true) : e.length < t2.length ? this._coreService.triggerDataEvent(`${b.DEL}`, true) : e.length === t2.length && e !== t2 && this._coreService.triggerDataEvent(e, true);
      }
    }, 0);
  }
  updateCompositionElements(t2) {
    if (this._isComposing) {
      if (this._bufferService.buffer.isCursorInViewport) {
        let e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), i = this._renderService.dimensions.css.cell.height, r2 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, n2 = e * this._renderService.dimensions.css.cell.width;
        this._compositionView.style.left = n2 + "px", this._compositionView.style.top = r2 + "px", this._compositionView.style.height = i + "px", this._compositionView.style.lineHeight = i + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
        let o2 = this._compositionView.getBoundingClientRect();
        this._textarea.style.left = n2 + "px", this._textarea.style.top = r2 + "px", this._textarea.style.width = Math.max(o2.width, 1) + "px", this._textarea.style.height = Math.max(o2.height, 1) + "px", this._textarea.style.lineHeight = o2.height + "px";
      }
      t2 || setTimeout(() => this.updateCompositionElements(true), 0);
    }
  }
};
$t = M([S(2, F), S(3, H), S(4, ge), S(5, ce)], $t);
var ue = 0, he = 0, de = 0, J = 0, ps = { css: "#00000000", rgba: 0 }, j;
((i) => {
  function s15(r2, n2, o2, l3) {
    return l3 !== void 0 ? `#${vt(r2)}${vt(n2)}${vt(o2)}${vt(l3)}` : `#${vt(r2)}${vt(n2)}${vt(o2)}`;
  }
  i.toCss = s15;
  function t2(r2, n2, o2, l3 = 255) {
    return (r2 << 24 | n2 << 16 | o2 << 8 | l3) >>> 0;
  }
  i.toRgba = t2;
  function e(r2, n2, o2, l3) {
    return { css: i.toCss(r2, n2, o2, l3), rgba: i.toRgba(r2, n2, o2, l3) };
  }
  i.toColor = e;
})(j ||= {});
var U;
((l3) => {
  function s15(a, u2) {
    if (J = (u2.rgba & 255) / 255, J === 1) return { css: u2.css, rgba: u2.rgba };
    let h2 = u2.rgba >> 24 & 255, c = u2.rgba >> 16 & 255, d = u2.rgba >> 8 & 255, _2 = a.rgba >> 24 & 255, p2 = a.rgba >> 16 & 255, m2 = a.rgba >> 8 & 255;
    ue = _2 + Math.round((h2 - _2) * J), he = p2 + Math.round((c - p2) * J), de = m2 + Math.round((d - m2) * J);
    let f2 = j.toCss(ue, he, de), A2 = j.toRgba(ue, he, de);
    return { css: f2, rgba: A2 };
  }
  l3.blend = s15;
  function t2(a) {
    return (a.rgba & 255) === 255;
  }
  l3.isOpaque = t2;
  function e(a, u2, h2) {
    let c = $r.ensureContrastRatio(a.rgba, u2.rgba, h2);
    if (c) return j.toColor(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255);
  }
  l3.ensureContrastRatio = e;
  function i(a) {
    let u2 = (a.rgba | 255) >>> 0;
    return [ue, he, de] = $r.toChannels(u2), { css: j.toCss(ue, he, de), rgba: u2 };
  }
  l3.opaque = i;
  function r2(a, u2) {
    return J = Math.round(u2 * 255), [ue, he, de] = $r.toChannels(a.rgba), { css: j.toCss(ue, he, de, J), rgba: j.toRgba(ue, he, de, J) };
  }
  l3.opacity = r2;
  function n2(a, u2) {
    return J = a.rgba & 255, r2(a, J * u2 / 255);
  }
  l3.multiplyOpacity = n2;
  function o2(a) {
    return [a.rgba >> 24 & 255, a.rgba >> 16 & 255, a.rgba >> 8 & 255];
  }
  l3.toColorRGB = o2;
})(U ||= {});
var z;
((i) => {
  let s15, t2;
  try {
    let r2 = document.createElement("canvas");
    r2.width = 1, r2.height = 1;
    let n2 = r2.getContext("2d", { willReadFrequently: true });
    n2 && (s15 = n2, s15.globalCompositeOperation = "copy", t2 = s15.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function e(r2) {
    if (r2.match(/#[\da-f]{3,8}/i)) switch (r2.length) {
      case 4:
        return ue = parseInt(r2.slice(1, 2).repeat(2), 16), he = parseInt(r2.slice(2, 3).repeat(2), 16), de = parseInt(r2.slice(3, 4).repeat(2), 16), j.toColor(ue, he, de);
      case 5:
        return ue = parseInt(r2.slice(1, 2).repeat(2), 16), he = parseInt(r2.slice(2, 3).repeat(2), 16), de = parseInt(r2.slice(3, 4).repeat(2), 16), J = parseInt(r2.slice(4, 5).repeat(2), 16), j.toColor(ue, he, de, J);
      case 7:
        return { css: r2, rgba: (parseInt(r2.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: r2, rgba: parseInt(r2.slice(1), 16) >>> 0 };
    }
    let n2 = r2.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (n2) return ue = parseInt(n2[1]), he = parseInt(n2[2]), de = parseInt(n2[3]), J = Math.round((n2[5] === void 0 ? 1 : parseFloat(n2[5])) * 255), j.toColor(ue, he, de, J);
    if (!s15 || !t2) throw new Error("css.toColor: Unsupported css format");
    if (s15.fillStyle = t2, s15.fillStyle = r2, typeof s15.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (s15.fillRect(0, 0, 1, 1), [ue, he, de, J] = s15.getImageData(0, 0, 1, 1).data, J !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: j.toRgba(ue, he, de, J), css: r2 };
  }
  i.toColor = e;
})(z ||= {});
var ve;
((e) => {
  function s15(i) {
    return t2(i >> 16 & 255, i >> 8 & 255, i & 255);
  }
  e.relativeLuminance = s15;
  function t2(i, r2, n2) {
    let o2 = i / 255, l3 = r2 / 255, a = n2 / 255, u2 = o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4), h2 = l3 <= 0.03928 ? l3 / 12.92 : Math.pow((l3 + 0.055) / 1.055, 2.4), c = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    return u2 * 0.2126 + h2 * 0.7152 + c * 0.0722;
  }
  e.relativeLuminance2 = t2;
})(ve ||= {});
var $r;
((n2) => {
  function s15(o2, l3) {
    if (J = (l3 & 255) / 255, J === 1) return l3;
    let a = l3 >> 24 & 255, u2 = l3 >> 16 & 255, h2 = l3 >> 8 & 255, c = o2 >> 24 & 255, d = o2 >> 16 & 255, _2 = o2 >> 8 & 255;
    return ue = c + Math.round((a - c) * J), he = d + Math.round((u2 - d) * J), de = _2 + Math.round((h2 - _2) * J), j.toRgba(ue, he, de);
  }
  n2.blend = s15;
  function t2(o2, l3, a) {
    let u2 = ve.relativeLuminance(o2 >> 8), h2 = ve.relativeLuminance(l3 >> 8);
    if (Xe(u2, h2) < a) {
      if (h2 < u2) {
        let p2 = e(o2, l3, a), m2 = Xe(u2, ve.relativeLuminance(p2 >> 8));
        if (m2 < a) {
          let f2 = i(o2, l3, a), A2 = Xe(u2, ve.relativeLuminance(f2 >> 8));
          return m2 > A2 ? p2 : f2;
        }
        return p2;
      }
      let d = i(o2, l3, a), _2 = Xe(u2, ve.relativeLuminance(d >> 8));
      if (_2 < a) {
        let p2 = e(o2, l3, a), m2 = Xe(u2, ve.relativeLuminance(p2 >> 8));
        return _2 > m2 ? d : p2;
      }
      return d;
    }
  }
  n2.ensureContrastRatio = t2;
  function e(o2, l3, a) {
    let u2 = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l3 >> 24 & 255, _2 = l3 >> 16 & 255, p2 = l3 >> 8 & 255, m2 = Xe(ve.relativeLuminance2(d, _2, p2), ve.relativeLuminance2(u2, h2, c));
    for (; m2 < a && (d > 0 || _2 > 0 || p2 > 0); ) d -= Math.max(0, Math.ceil(d * 0.1)), _2 -= Math.max(0, Math.ceil(_2 * 0.1)), p2 -= Math.max(0, Math.ceil(p2 * 0.1)), m2 = Xe(ve.relativeLuminance2(d, _2, p2), ve.relativeLuminance2(u2, h2, c));
    return (d << 24 | _2 << 16 | p2 << 8 | 255) >>> 0;
  }
  n2.reduceLuminance = e;
  function i(o2, l3, a) {
    let u2 = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l3 >> 24 & 255, _2 = l3 >> 16 & 255, p2 = l3 >> 8 & 255, m2 = Xe(ve.relativeLuminance2(d, _2, p2), ve.relativeLuminance2(u2, h2, c));
    for (; m2 < a && (d < 255 || _2 < 255 || p2 < 255); ) d = Math.min(255, d + Math.ceil((255 - d) * 0.1)), _2 = Math.min(255, _2 + Math.ceil((255 - _2) * 0.1)), p2 = Math.min(255, p2 + Math.ceil((255 - p2) * 0.1)), m2 = Xe(ve.relativeLuminance2(d, _2, p2), ve.relativeLuminance2(u2, h2, c));
    return (d << 24 | _2 << 16 | p2 << 8 | 255) >>> 0;
  }
  n2.increaseLuminance = i;
  function r2(o2) {
    return [o2 >> 24 & 255, o2 >> 16 & 255, o2 >> 8 & 255, o2 & 255];
  }
  n2.toChannels = r2;
})($r ||= {});
function vt(s15) {
  let t2 = s15.toString(16);
  return t2.length < 2 ? "0" + t2 : t2;
}
function Xe(s15, t2) {
  return s15 < t2 ? (t2 + 0.05) / (s15 + 0.05) : (s15 + 0.05) / (t2 + 0.05);
}
var Vr = class extends De {
  constructor(e, i, r2) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = e.fg, this.bg = e.bg, this.combinedData = i, this._width = r2;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(e) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
}, ct = class {
  constructor(t2) {
    this._bufferService = t2;
    this._characterJoiners = [];
    this._nextCharacterJoinerId = 0;
    this._workCell = new q();
  }
  register(t2) {
    let e = { id: this._nextCharacterJoinerId++, handler: t2 };
    return this._characterJoiners.push(e), e.id;
  }
  deregister(t2) {
    for (let e = 0; e < this._characterJoiners.length; e++) if (this._characterJoiners[e].id === t2) return this._characterJoiners.splice(e, 1), true;
    return false;
  }
  getJoinedCharacters(t2) {
    if (this._characterJoiners.length === 0) return [];
    let e = this._bufferService.buffer.lines.get(t2);
    if (!e || e.length === 0) return [];
    let i = [], r2 = e.translateToString(true), n2 = 0, o2 = 0, l3 = 0, a = e.getFg(0), u2 = e.getBg(0);
    for (let h2 = 0; h2 < e.getTrimmedLength(); h2++) if (e.loadCell(h2, this._workCell), this._workCell.getWidth() !== 0) {
      if (this._workCell.fg !== a || this._workCell.bg !== u2) {
        if (h2 - n2 > 1) {
          let c = this._getJoinedRanges(r2, l3, o2, e, n2);
          for (let d = 0; d < c.length; d++) i.push(c[d]);
        }
        n2 = h2, l3 = o2, a = this._workCell.fg, u2 = this._workCell.bg;
      }
      o2 += this._workCell.getChars().length || we.length;
    }
    if (this._bufferService.cols - n2 > 1) {
      let h2 = this._getJoinedRanges(r2, l3, o2, e, n2);
      for (let c = 0; c < h2.length; c++) i.push(h2[c]);
    }
    return i;
  }
  _getJoinedRanges(t2, e, i, r2, n2) {
    let o2 = t2.substring(e, i), l3 = [];
    try {
      l3 = this._characterJoiners[0].handler(o2);
    } catch (a) {
      console.error(a);
    }
    for (let a = 1; a < this._characterJoiners.length; a++) try {
      let u2 = this._characterJoiners[a].handler(o2);
      for (let h2 = 0; h2 < u2.length; h2++) ct._mergeRanges(l3, u2[h2]);
    } catch (u2) {
      console.error(u2);
    }
    return this._stringRangesToCellRanges(l3, r2, n2), l3;
  }
  _stringRangesToCellRanges(t2, e, i) {
    let r2 = 0, n2 = false, o2 = 0, l3 = t2[r2];
    if (l3) {
      for (let a = i; a < this._bufferService.cols; a++) {
        let u2 = e.getWidth(a), h2 = e.getString(a).length || we.length;
        if (u2 !== 0) {
          if (!n2 && l3[0] <= o2 && (l3[0] = a, n2 = true), l3[1] <= o2) {
            if (l3[1] = a, l3 = t2[++r2], !l3) break;
            l3[0] <= o2 ? (l3[0] = a, n2 = true) : n2 = false;
          }
          o2 += h2;
        }
      }
      l3 && (l3[1] = this._bufferService.cols);
    }
  }
  static _mergeRanges(t2, e) {
    let i = false;
    for (let r2 = 0; r2 < t2.length; r2++) {
      let n2 = t2[r2];
      if (i) {
        if (e[1] <= n2[0]) return t2[r2 - 1][1] = e[1], t2;
        if (e[1] <= n2[1]) return t2[r2 - 1][1] = Math.max(e[1], n2[1]), t2.splice(r2, 1), t2;
        t2.splice(r2, 1), r2--;
      } else {
        if (e[1] <= n2[0]) return t2.splice(r2, 0, e), t2;
        if (e[1] <= n2[1]) return n2[0] = Math.min(e[0], n2[0]), t2;
        e[0] < n2[1] && (n2[0] = Math.min(e[0], n2[0]), i = true);
        continue;
      }
    }
    return i ? t2[t2.length - 1][1] = e[1] : t2.push(e), t2;
  }
};
ct = M([S(0, F)], ct);
function Oa(s15) {
  return 57508 <= s15 && s15 <= 57558;
}
function Ba(s15) {
  return 9472 <= s15 && s15 <= 9631;
}
function $o(s15) {
  return Oa(s15) || Ba(s15);
}
function Vo() {
  return { css: { canvas: qr(), cell: qr() }, device: { canvas: qr(), cell: qr(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function qr() {
  return { width: 0, height: 0 };
}
var Vt = class {
  constructor(t2, e, i, r2, n2, o2, l3) {
    this._document = t2;
    this._characterJoinerService = e;
    this._optionsService = i;
    this._coreBrowserService = r2;
    this._coreService = n2;
    this._decorationService = o2;
    this._themeService = l3;
    this._workCell = new q();
    this._columnSelectMode = false;
    this.defaultSpacing = 0;
  }
  handleSelectionChanged(t2, e, i) {
    this._selectionStart = t2, this._selectionEnd = e, this._columnSelectMode = i;
  }
  createRow(t2, e, i, r2, n2, o2, l3, a, u2, h2, c) {
    let d = [], _2 = this._characterJoinerService.getJoinedCharacters(e), p2 = this._themeService.colors, m2 = t2.getNoBgTrimmedLength();
    i && m2 < o2 + 1 && (m2 = o2 + 1);
    let f2, A2 = 0, R2 = "", O2 = 0, I2 = 0, k2 = 0, P2 = 0, oe2 = false, Me2 = 0, Pe2 = false, Ke2 = 0, di2 = 0, V2 = [], Qe2 = h2 !== -1 && c !== -1;
    for (let y2 = 0; y2 < m2; y2++) {
      t2.loadCell(y2, this._workCell);
      let T2 = this._workCell.getWidth();
      if (T2 === 0) continue;
      let g2 = false, w2 = y2 >= di2, E2 = y2, x2 = this._workCell;
      if (_2.length > 0 && y2 === _2[0][0] && w2) {
        let W2 = _2.shift(), An = this._isCellInSelection(W2[0], e);
        for (O2 = W2[0] + 1; O2 < W2[1]; O2++) w2 &&= An === this._isCellInSelection(O2, e);
        w2 &&= !i || o2 < W2[0] || o2 >= W2[1], w2 ? (g2 = true, x2 = new Vr(this._workCell, t2.translateToString(true, W2[0], W2[1]), W2[1] - W2[0]), E2 = W2[1] - 1, T2 = x2.getWidth()) : di2 = W2[1];
      }
      let N2 = this._isCellInSelection(y2, e), Z2 = i && y2 === o2, te2 = Qe2 && y2 >= h2 && y2 <= c, Oe2 = false;
      this._decorationService.forEachDecorationAtCell(y2, e, void 0, (W2) => {
        Oe2 = true;
      });
      let ze = x2.getChars() || we;
      if (ze === " " && (x2.isUnderline() || x2.isOverline()) && (ze = " "), Ke2 = T2 * a - u2.get(ze, x2.isBold(), x2.isItalic()), !f2) f2 = this._document.createElement("span");
      else if (A2 && (N2 && Pe2 || !N2 && !Pe2 && x2.bg === I2) && (N2 && Pe2 && p2.selectionForeground || x2.fg === k2) && x2.extended.ext === P2 && te2 === oe2 && Ke2 === Me2 && !Z2 && !g2 && !Oe2 && w2) {
        x2.isInvisible() ? R2 += we : R2 += ze, A2++;
        continue;
      } else A2 && (f2.textContent = R2), f2 = this._document.createElement("span"), A2 = 0, R2 = "";
      if (I2 = x2.bg, k2 = x2.fg, P2 = x2.extended.ext, oe2 = te2, Me2 = Ke2, Pe2 = N2, g2 && o2 >= y2 && o2 <= E2 && (o2 = y2), !this._coreService.isCursorHidden && Z2 && this._coreService.isCursorInitialized) {
        if (V2.push("xterm-cursor"), this._coreBrowserService.isFocused) l3 && V2.push("xterm-cursor-blink"), V2.push(r2 === "bar" ? "xterm-cursor-bar" : r2 === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
        else if (n2) switch (n2) {
          case "outline":
            V2.push("xterm-cursor-outline");
            break;
          case "block":
            V2.push("xterm-cursor-block");
            break;
          case "bar":
            V2.push("xterm-cursor-bar");
            break;
          case "underline":
            V2.push("xterm-cursor-underline");
            break;
        }
      }
      if (x2.isBold() && V2.push("xterm-bold"), x2.isItalic() && V2.push("xterm-italic"), x2.isDim() && V2.push("xterm-dim"), x2.isInvisible() ? R2 = we : R2 = x2.getChars() || we, x2.isUnderline() && (V2.push(`xterm-underline-${x2.extended.underlineStyle}`), R2 === " " && (R2 = " "), !x2.isUnderlineColorDefault())) if (x2.isUnderlineColorRGB()) f2.style.textDecorationColor = `rgb(${De.toColorRGB(x2.getUnderlineColor()).join(",")})`;
      else {
        let W2 = x2.getUnderlineColor();
        this._optionsService.rawOptions.drawBoldTextInBrightColors && x2.isBold() && W2 < 8 && (W2 += 8), f2.style.textDecorationColor = p2.ansi[W2].css;
      }
      x2.isOverline() && (V2.push("xterm-overline"), R2 === " " && (R2 = " ")), x2.isStrikethrough() && V2.push("xterm-strikethrough"), te2 && (f2.style.textDecoration = "underline");
      let le2 = x2.getFgColor(), et = x2.getFgColorMode(), me2 = x2.getBgColor(), ht = x2.getBgColorMode(), fi2 = !!x2.isInverse();
      if (fi2) {
        let W2 = le2;
        le2 = me2, me2 = W2;
        let An = et;
        et = ht, ht = An;
      }
      let tt, Qi2, pi2 = false;
      this._decorationService.forEachDecorationAtCell(y2, e, void 0, (W2) => {
        W2.options.layer !== "top" && pi2 || (W2.backgroundColorRGB && (ht = 50331648, me2 = W2.backgroundColorRGB.rgba >> 8 & 16777215, tt = W2.backgroundColorRGB), W2.foregroundColorRGB && (et = 50331648, le2 = W2.foregroundColorRGB.rgba >> 8 & 16777215, Qi2 = W2.foregroundColorRGB), pi2 = W2.options.layer === "top");
      }), !pi2 && N2 && (tt = this._coreBrowserService.isFocused ? p2.selectionBackgroundOpaque : p2.selectionInactiveBackgroundOpaque, me2 = tt.rgba >> 8 & 16777215, ht = 50331648, pi2 = true, p2.selectionForeground && (et = 50331648, le2 = p2.selectionForeground.rgba >> 8 & 16777215, Qi2 = p2.selectionForeground)), pi2 && V2.push("xterm-decoration-top");
      let it;
      switch (ht) {
        case 16777216:
        case 33554432:
          it = p2.ansi[me2], V2.push(`xterm-bg-${me2}`);
          break;
        case 50331648:
          it = j.toColor(me2 >> 16, me2 >> 8 & 255, me2 & 255), this._addStyle(f2, `background-color:#${qo((me2 >>> 0).toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          fi2 ? (it = p2.foreground, V2.push(`xterm-bg-${257}`)) : it = p2.background;
      }
      switch (tt || x2.isDim() && (tt = U.multiplyOpacity(it, 0.5)), et) {
        case 16777216:
        case 33554432:
          x2.isBold() && le2 < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (le2 += 8), this._applyMinimumContrast(f2, it, p2.ansi[le2], x2, tt, void 0) || V2.push(`xterm-fg-${le2}`);
          break;
        case 50331648:
          let W2 = j.toColor(le2 >> 16 & 255, le2 >> 8 & 255, le2 & 255);
          this._applyMinimumContrast(f2, it, W2, x2, tt, Qi2) || this._addStyle(f2, `color:#${qo(le2.toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          this._applyMinimumContrast(f2, it, p2.foreground, x2, tt, Qi2) || fi2 && V2.push(`xterm-fg-${257}`);
      }
      V2.length && (f2.className = V2.join(" "), V2.length = 0), !Z2 && !g2 && !Oe2 && w2 ? A2++ : f2.textContent = R2, Ke2 !== this.defaultSpacing && (f2.style.letterSpacing = `${Ke2}px`), d.push(f2), y2 = E2;
    }
    return f2 && A2 && (f2.textContent = R2), d;
  }
  _applyMinimumContrast(t2, e, i, r2, n2, o2) {
    if (this._optionsService.rawOptions.minimumContrastRatio === 1 || $o(r2.getCode())) return false;
    let l3 = this._getContrastCache(r2), a;
    if (!n2 && !o2 && (a = l3.getColor(e.rgba, i.rgba)), a === void 0) {
      let u2 = this._optionsService.rawOptions.minimumContrastRatio / (r2.isDim() ? 2 : 1);
      a = U.ensureContrastRatio(n2 || e, o2 || i, u2), l3.setColor((n2 || e).rgba, (o2 || i).rgba, a ?? null);
    }
    return a ? (this._addStyle(t2, `color:${a.css}`), true) : false;
  }
  _getContrastCache(t2) {
    return t2.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
  }
  _addStyle(t2, e) {
    t2.setAttribute("style", `${t2.getAttribute("style") || ""}${e};`);
  }
  _isCellInSelection(t2, e) {
    let i = this._selectionStart, r2 = this._selectionEnd;
    return !i || !r2 ? false : this._columnSelectMode ? i[0] <= r2[0] ? t2 >= i[0] && e >= i[1] && t2 < r2[0] && e <= r2[1] : t2 < i[0] && e >= i[1] && t2 >= r2[0] && e <= r2[1] : e > i[1] && e < r2[1] || i[1] === r2[1] && e === i[1] && t2 >= i[0] && t2 < r2[0] || i[1] < r2[1] && e === r2[1] && t2 < r2[0] || i[1] < r2[1] && e === i[1] && t2 >= i[0];
  }
};
Vt = M([S(1, or), S(2, H), S(3, ae), S(4, ge), S(5, Be), S(6, Re)], Vt);
function qo(s15, t2, e) {
  for (; s15.length < e; ) s15 = t2 + s15;
  return s15;
}
var Yr = class {
  constructor(t2, e) {
    this._flat = new Float32Array(256);
    this._font = "";
    this._fontSize = 0;
    this._weight = "normal";
    this._weightBold = "bold";
    this._measureElements = [];
    this._container = t2.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
    let i = t2.createElement("span");
    i.classList.add("xterm-char-measure-element");
    let r2 = t2.createElement("span");
    r2.classList.add("xterm-char-measure-element"), r2.style.fontWeight = "bold";
    let n2 = t2.createElement("span");
    n2.classList.add("xterm-char-measure-element"), n2.style.fontStyle = "italic";
    let o2 = t2.createElement("span");
    o2.classList.add("xterm-char-measure-element"), o2.style.fontWeight = "bold", o2.style.fontStyle = "italic", this._measureElements = [i, r2, n2, o2], this._container.appendChild(i), this._container.appendChild(r2), this._container.appendChild(n2), this._container.appendChild(o2), e.appendChild(this._container), this.clear();
  }
  dispose() {
    this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
  }
  clear() {
    this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
  }
  setFont(t2, e, i, r2) {
    t2 === this._font && e === this._fontSize && i === this._weight && r2 === this._weightBold || (this._font = t2, this._fontSize = e, this._weight = i, this._weightBold = r2, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i}`, this._measureElements[1].style.fontWeight = `${r2}`, this._measureElements[2].style.fontWeight = `${i}`, this._measureElements[3].style.fontWeight = `${r2}`, this.clear());
  }
  get(t2, e, i) {
    let r2 = 0;
    if (!e && !i && t2.length === 1 && (r2 = t2.charCodeAt(0)) < 256) {
      if (this._flat[r2] !== -9999) return this._flat[r2];
      let l3 = this._measure(t2, 0);
      return l3 > 0 && (this._flat[r2] = l3), l3;
    }
    let n2 = t2;
    e && (n2 += "B"), i && (n2 += "I");
    let o2 = this._holey.get(n2);
    if (o2 === void 0) {
      let l3 = 0;
      e && (l3 |= 1), i && (l3 |= 2), o2 = this._measure(t2, l3), o2 > 0 && this._holey.set(n2, o2);
    }
    return o2;
  }
  _measure(t2, e) {
    let i = this._measureElements[e];
    return i.textContent = t2.repeat(32), i.offsetWidth / 32;
  }
};
var ms = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(t2, e, i, r2 = false) {
    if (this.selectionStart = e, this.selectionEnd = i, !e || !i || e[0] === i[0] && e[1] === i[1]) {
      this.clear();
      return;
    }
    let n2 = t2.buffers.active.ydisp, o2 = e[1] - n2, l3 = i[1] - n2, a = Math.max(o2, 0), u2 = Math.min(l3, t2.rows - 1);
    if (a >= t2.rows || u2 < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = r2, this.viewportStartRow = o2, this.viewportEndRow = l3, this.viewportCappedStartRow = a, this.viewportCappedEndRow = u2, this.startCol = e[0], this.endCol = i[0];
  }
  isCellSelected(t2, e, i) {
    return this.hasSelection ? (i -= t2.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? e >= this.startCol && i >= this.viewportCappedStartRow && e < this.endCol && i <= this.viewportCappedEndRow : e < this.startCol && i >= this.viewportCappedStartRow && e >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol) : false;
  }
};
function Yo() {
  return new ms();
}
var _s = "xterm-dom-renderer-owner-", Le = "xterm-rows", jr = "xterm-fg-", jo = "xterm-bg-", ki = "xterm-focus", Xr = "xterm-selection", Na = 1, Yt = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2, h2, c, d, _2, p2, m2) {
    super();
    this._terminal = e;
    this._document = i;
    this._element = r2;
    this._screenElement = n2;
    this._viewportElement = o2;
    this._helperContainer = l3;
    this._linkifier2 = a;
    this._charSizeService = h2;
    this._optionsService = c;
    this._bufferService = d;
    this._coreService = _2;
    this._coreBrowserService = p2;
    this._themeService = m2;
    this._terminalClass = Na++;
    this._rowElements = [];
    this._selectionRenderModel = Yo();
    this.onRequestRedraw = this._register(new v$1()).event;
    this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(Le), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(Xr), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = Vo(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((f2) => this._injectCss(f2))), this._injectCss(this._themeService.colors), this._rowFactory = u2.createInstance(Vt, document), this._element.classList.add(_s + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((f2) => this._handleLinkHover(f2))), this._register(this._linkifier2.onHideLinkUnderline((f2) => this._handleLinkLeave(f2))), this._register(C(() => {
      this._element.classList.remove(_s + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
    })), this._widthCache = new Yr(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  _updateDimensions() {
    let e = this._coreBrowserService.dpr;
    this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
    for (let r2 of this._rowElements) r2.style.width = `${this.dimensions.css.canvas.width}px`, r2.style.height = `${this.dimensions.css.cell.height}px`, r2.style.lineHeight = `${this.dimensions.css.cell.height}px`, r2.style.overflow = "hidden";
    this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
    let i = `${this._terminalSelector} .${Le} span { display: inline-block; height: 100%; vertical-align: top;}`;
    this._dimensionsStyleElement.textContent = i, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
  }
  _injectCss(e) {
    this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
    let i = `${this._terminalSelector} .${Le} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
    i += `${this._terminalSelector} .${Le} .xterm-dim { color: ${U.multiplyOpacity(e.foreground, 0.5).css};}`, i += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
    let r2 = `blink_underline_${this._terminalClass}`, n2 = `blink_bar_${this._terminalClass}`, o2 = `blink_block_${this._terminalClass}`;
    i += `@keyframes ${r2} { 50% {  border-bottom-style: hidden; }}`, i += `@keyframes ${n2} { 50% {  box-shadow: none; }}`, i += `@keyframes ${o2} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, i += `${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${r2} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${n2} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o2} 1s step-end infinite;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, i += `${this._terminalSelector} .${Xr} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Xr} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Xr} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
    for (let [l3, a] of e.ansi.entries()) i += `${this._terminalSelector} .${jr}${l3} { color: ${a.css}; }${this._terminalSelector} .${jr}${l3}.xterm-dim { color: ${U.multiplyOpacity(a, 0.5).css}; }${this._terminalSelector} .${jo}${l3} { background-color: ${a.css}; }`;
    i += `${this._terminalSelector} .${jr}${257} { color: ${U.opaque(e.background).css}; }${this._terminalSelector} .${jr}${257}.xterm-dim { color: ${U.multiplyOpacity(U.opaque(e.background), 0.5).css}; }${this._terminalSelector} .${jo}${257} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = i;
  }
  _setDefaultSpacing() {
    let e = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
    this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
  }
  handleDevicePixelRatioChange() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  _refreshRowElements(e, i) {
    for (let r2 = this._rowElements.length; r2 <= i; r2++) {
      let n2 = this._document.createElement("div");
      this._rowContainer.appendChild(n2), this._rowElements.push(n2);
    }
    for (; this._rowElements.length > i; ) this._rowContainer.removeChild(this._rowElements.pop());
  }
  handleResize(e, i) {
    this._refreshRowElements(e, i), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
  }
  handleCharSizeChanged() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  handleBlur() {
    this._rowContainer.classList.remove(ki), this.renderRows(0, this._bufferService.rows - 1);
  }
  handleFocus() {
    this._rowContainer.classList.add(ki), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
  }
  handleSelectionChanged(e, i, r2) {
    if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, i, r2), this.renderRows(0, this._bufferService.rows - 1), !e || !i || (this._selectionRenderModel.update(this._terminal, e, i, r2), !this._selectionRenderModel.hasSelection)) return;
    let n2 = this._selectionRenderModel.viewportStartRow, o2 = this._selectionRenderModel.viewportEndRow, l3 = this._selectionRenderModel.viewportCappedStartRow, a = this._selectionRenderModel.viewportCappedEndRow, u2 = this._document.createDocumentFragment();
    if (r2) {
      let h2 = e[0] > i[0];
      u2.appendChild(this._createSelectionElement(l3, h2 ? i[0] : e[0], h2 ? e[0] : i[0], a - l3 + 1));
    } else {
      let h2 = n2 === l3 ? e[0] : 0, c = l3 === o2 ? i[0] : this._bufferService.cols;
      u2.appendChild(this._createSelectionElement(l3, h2, c));
      let d = a - l3 - 1;
      if (u2.appendChild(this._createSelectionElement(l3 + 1, 0, this._bufferService.cols, d)), l3 !== a) {
        let _2 = o2 === a ? i[0] : this._bufferService.cols;
        u2.appendChild(this._createSelectionElement(a, 0, _2));
      }
    }
    this._selectionContainer.appendChild(u2);
  }
  _createSelectionElement(e, i, r2, n2 = 1) {
    let o2 = this._document.createElement("div"), l3 = i * this.dimensions.css.cell.width, a = this.dimensions.css.cell.width * (r2 - i);
    return l3 + a > this.dimensions.css.canvas.width && (a = this.dimensions.css.canvas.width - l3), o2.style.height = `${n2 * this.dimensions.css.cell.height}px`, o2.style.top = `${e * this.dimensions.css.cell.height}px`, o2.style.left = `${l3}px`, o2.style.width = `${a}px`, o2;
  }
  handleCursorMove() {
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  clear() {
    for (let e of this._rowElements) e.replaceChildren();
  }
  renderRows(e, i) {
    let r2 = this._bufferService.buffer, n2 = r2.ybase + r2.y, o2 = Math.min(r2.x, this._bufferService.cols - 1), l3 = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, a = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, u2 = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let h2 = e; h2 <= i; h2++) {
      let c = h2 + r2.ydisp, d = this._rowElements[h2], _2 = r2.lines.get(c);
      if (!d || !_2) break;
      d.replaceChildren(...this._rowFactory.createRow(_2, c, c === n2, a, u2, o2, l3, this.dimensions.css.cell.width, this._widthCache, -1, -1));
    }
  }
  get _terminalSelector() {
    return `.${_s}${this._terminalClass}`;
  }
  _handleLinkHover(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, true);
  }
  _handleLinkLeave(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, false);
  }
  _setCellUnderline(e, i, r2, n2, o2, l3) {
    r2 < 0 && (e = 0), n2 < 0 && (i = 0);
    let a = this._bufferService.rows - 1;
    r2 = Math.max(Math.min(r2, a), 0), n2 = Math.max(Math.min(n2, a), 0), o2 = Math.min(o2, this._bufferService.cols);
    let u2 = this._bufferService.buffer, h2 = u2.ybase + u2.y, c = Math.min(u2.x, o2 - 1), d = this._optionsService.rawOptions.cursorBlink, _2 = this._optionsService.rawOptions.cursorStyle, p2 = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let m2 = r2; m2 <= n2; ++m2) {
      let f2 = m2 + u2.ydisp, A2 = this._rowElements[m2], R2 = u2.lines.get(f2);
      if (!A2 || !R2) break;
      A2.replaceChildren(...this._rowFactory.createRow(R2, f2, f2 === h2, _2, p2, c, d, this.dimensions.css.cell.width, this._widthCache, l3 ? m2 === r2 ? e : 0 : -1, l3 ? (m2 === n2 ? i : o2) - 1 : -1));
    }
  }
};
Yt = M([S(7, xt), S(8, nt), S(9, H), S(10, F), S(11, ge), S(12, ae), S(13, Re)], Yt);
var jt = class extends D {
  constructor(e, i, r2) {
    super();
    this._optionsService = r2;
    this.width = 0;
    this.height = 0;
    this._onCharSizeChange = this._register(new v$1());
    this.onCharSizeChange = this._onCharSizeChange.event;
    try {
      this._measureStrategy = this._register(new vs(this._optionsService));
    } catch {
      this._measureStrategy = this._register(new bs(e, i, this._optionsService));
    }
    this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
  }
  get hasValidSize() {
    return this.width > 0 && this.height > 0;
  }
  measure() {
    let e = this._measureStrategy.measure();
    (e.width !== this.width || e.height !== this.height) && (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
  }
};
jt = M([S(2, H)], jt);
var Zr = class extends D {
  constructor() {
    super(...arguments);
    this._result = { width: 0, height: 0 };
  }
  _validateAndSet(e, i) {
    e !== void 0 && e > 0 && i !== void 0 && i > 0 && (this._result.width = e, this._result.height = i);
  }
}, bs = class extends Zr {
  constructor(e, i, r2) {
    super();
    this._document = e;
    this._parentElement = i;
    this._optionsService = r2;
    this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
  }
  measure() {
    return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
  }
}, vs = class extends Zr {
  constructor(e) {
    super();
    this._optionsService = e;
    this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
    let i = this._ctx.measureText("W");
    if (!("width" in i && "fontBoundingBoxAscent" in i && "fontBoundingBoxDescent" in i)) throw new Error("Required font metrics not supported");
  }
  measure() {
    this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
    let e = this._ctx.measureText("W");
    return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
  }
};
var Jr = class extends D {
  constructor(e, i, r2) {
    super();
    this._textarea = e;
    this._window = i;
    this.mainDocument = r2;
    this._isFocused = false;
    this._cachedIsFocused = void 0;
    this._screenDprMonitor = this._register(new gs(this._window));
    this._onDprChange = this._register(new v$1());
    this.onDprChange = this._onDprChange.event;
    this._onWindowChange = this._register(new v$1());
    this.onWindowChange = this._onWindowChange.event;
    this._register(this.onWindowChange((n2) => this._screenDprMonitor.setWindow(n2))), this._register($.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(L$1(this._textarea, "focus", () => this._isFocused = true)), this._register(L$1(this._textarea, "blur", () => this._isFocused = false));
  }
  get window() {
    return this._window;
  }
  set window(e) {
    this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
  }
  get dpr() {
    return this.window.devicePixelRatio;
  }
  get isFocused() {
    return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
  }
}, gs = class extends D {
  constructor(e) {
    super();
    this._parentWindow = e;
    this._windowResizeListener = this._register(new ye());
    this._onDprChange = this._register(new v$1());
    this.onDprChange = this._onDprChange.event;
    this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(C(() => this.clearListener()));
  }
  setWindow(e) {
    this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
  }
  _setWindowResizeListener() {
    this._windowResizeListener.value = L$1(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
  }
  _setDprAndFireIfDiffers() {
    this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
  }
  _updateDpr() {
    this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
  }
  clearListener() {
    !this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
  }
};
var Qr = class extends D {
  constructor() {
    super();
    this.linkProviders = [];
    this._register(C(() => this.linkProviders.length = 0));
  }
  registerLinkProvider(e) {
    return this.linkProviders.push(e), { dispose: () => {
      let i = this.linkProviders.indexOf(e);
      i !== -1 && this.linkProviders.splice(i, 1);
    } };
  }
};
function Ci(s15, t2, e) {
  let i = e.getBoundingClientRect(), r2 = s15.getComputedStyle(e), n2 = parseInt(r2.getPropertyValue("padding-left")), o2 = parseInt(r2.getPropertyValue("padding-top"));
  return [t2.clientX - i.left - n2, t2.clientY - i.top - o2];
}
function Xo(s15, t2, e, i, r2, n2, o2, l3, a) {
  if (!n2) return;
  let u2 = Ci(s15, t2, e);
  if (u2) return u2[0] = Math.ceil((u2[0] + (a ? o2 / 2 : 0)) / o2), u2[1] = Math.ceil(u2[1] / l3), u2[0] = Math.min(Math.max(u2[0], 1), i + (a ? 1 : 0)), u2[1] = Math.min(Math.max(u2[1], 1), r2), u2;
}
var Xt = class {
  constructor(t2, e) {
    this._renderService = t2;
    this._charSizeService = e;
  }
  getCoords(t2, e, i, r2, n2) {
    return Xo(window, t2, e, i, r2, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, n2);
  }
  getMouseReportCoords(t2, e) {
    let i = Ci(window, t2, e);
    if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i[0]), y: Math.floor(i[1]) };
  }
};
Xt = M([S(0, ce), S(1, nt)], Xt);
var en = class {
  constructor(t2, e) {
    this._renderCallback = t2;
    this._coreBrowserService = e;
    this._refreshCallbacks = [];
  }
  dispose() {
    this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  addRefreshCallback(t2) {
    return this._refreshCallbacks.push(t2), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
  }
  refresh(t2, e, i) {
    this._rowCount = i, t2 = t2 !== void 0 ? t2 : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t2) : t2, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e, !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
  }
  _innerRefresh() {
    if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
      this._runRefreshCallbacks();
      return;
    }
    let t2 = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t2, e), this._runRefreshCallbacks();
  }
  _runRefreshCallbacks() {
    for (let t2 of this._refreshCallbacks) t2(0);
    this._refreshCallbacks = [];
  }
};
var tn = {};
Ll(tn, { getSafariVersion: () => Ha, isChromeOS: () => Ts, isFirefox: () => Ss, isIpad: () => Wa, isIphone: () => Ua, isLegacyEdge: () => Fa, isLinux: () => Bi, isMac: () => Zt, isNode: () => Mi, isSafari: () => Zo, isWindows: () => Es });
var Mi = typeof process < "u" && "title" in process, Pi = Mi ? "node" : navigator.userAgent, Oi = Mi ? "node" : navigator.platform, Ss = Pi.includes("Firefox"), Fa = Pi.includes("Edge"), Zo = /^((?!chrome|android).)*safari/i.test(Pi);
function Ha() {
  if (!Zo) return 0;
  let s15 = Pi.match(/Version\/(\d+)/);
  return s15 === null || s15.length < 2 ? 0 : parseInt(s15[1]);
}
var Zt = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(Oi), Wa = Oi === "iPad", Ua = Oi === "iPhone", Es = ["Windows", "Win16", "Win32", "WinCE"].includes(Oi), Bi = Oi.indexOf("Linux") >= 0, Ts = /\bCrOS\b/.test(Pi);
var rn = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(t2) {
    this._tasks.push(t2), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(t2) {
    this._idleCallback = void 0;
    let e = 0, i = 0, r2 = t2.timeRemaining(), n2 = 0;
    for (; this._i < this._tasks.length; ) {
      if (e = performance.now(), this._tasks[this._i]() || this._i++, e = Math.max(1, performance.now() - e), i = Math.max(e, i), n2 = t2.timeRemaining(), i * 1.5 > n2) {
        r2 - e < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r2 - e))}ms`), this._start();
        return;
      }
      r2 = n2;
    }
    this.clear();
  }
}, Is = class extends rn {
  _requestCallback(t2) {
    return setTimeout(() => t2(this._createDeadline(16)));
  }
  _cancelCallback(t2) {
    clearTimeout(t2);
  }
  _createDeadline(t2) {
    let e = performance.now() + t2;
    return { timeRemaining: () => Math.max(0, e - performance.now()) };
  }
}, ys = class extends rn {
  _requestCallback(t2) {
    return requestIdleCallback(t2);
  }
  _cancelCallback(t2) {
    cancelIdleCallback(t2);
  }
}, Jt = !Mi && "requestIdleCallback" in window ? ys : Is, nn = class {
  constructor() {
    this._queue = new Jt();
  }
  set(t2) {
    this._queue.clear(), this._queue.enqueue(t2);
  }
  flush() {
    this._queue.flush();
  }
};
var Qt = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2, h2) {
    super();
    this._rowCount = e;
    this._optionsService = r2;
    this._charSizeService = n2;
    this._coreService = o2;
    this._coreBrowserService = u2;
    this._renderer = this._register(new ye());
    this._pausedResizeTask = new nn();
    this._observerDisposable = this._register(new ye());
    this._isPaused = false;
    this._needsFullRefresh = false;
    this._isNextRenderRedrawOnly = true;
    this._needsSelectionRefresh = false;
    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._selectionState = { start: void 0, end: void 0, columnSelectMode: false };
    this._onDimensionsChange = this._register(new v$1());
    this.onDimensionsChange = this._onDimensionsChange.event;
    this._onRenderedViewportChange = this._register(new v$1());
    this.onRenderedViewportChange = this._onRenderedViewportChange.event;
    this._onRender = this._register(new v$1());
    this.onRender = this._onRender.event;
    this._onRefreshRequest = this._register(new v$1());
    this.onRefreshRequest = this._onRefreshRequest.event;
    this._renderDebouncer = new en((c, d) => this._renderRows(c, d), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new xs(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(C(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(a.onResize(() => this._fullRefresh())), this._register(a.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(l3.onDecorationRegistered(() => this._fullRefresh())), this._register(l3.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
      this.clear(), this.handleResize(a.cols, a.rows), this._fullRefresh();
    })), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(a.buffer.y, a.buffer.y, true))), this._register(h2.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, i), this._register(this._coreBrowserService.onWindowChange((c) => this._registerIntersectionObserver(c, i)));
  }
  get dimensions() {
    return this._renderer.value.dimensions;
  }
  _registerIntersectionObserver(e, i) {
    if ("IntersectionObserver" in e) {
      let r2 = new e.IntersectionObserver((n2) => this._handleIntersectionChange(n2[n2.length - 1]), { threshold: 0 });
      r2.observe(i), this._observerDisposable.value = C(() => r2.disconnect());
    }
  }
  _handleIntersectionChange(e) {
    this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
  }
  refreshRows(e, i, r2 = false) {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    if (this._coreService.decPrivateModes.synchronizedOutput) {
      this._syncOutputHandler.bufferRows(e, i);
      return;
    }
    let n2 = this._syncOutputHandler.flush();
    n2 && (e = Math.min(e, n2.start), i = Math.max(i, n2.end)), r2 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e, i, this._rowCount);
  }
  _renderRows(e, i) {
    if (this._renderer.value) {
      if (this._coreService.decPrivateModes.synchronizedOutput) {
        this._syncOutputHandler.bufferRows(e, i);
        return;
      }
      e = Math.min(e, this._rowCount - 1), i = Math.min(i, this._rowCount - 1), this._renderer.value.renderRows(e, i), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e, end: i }), this._onRender.fire({ start: e, end: i }), this._isNextRenderRedrawOnly = true;
    }
  }
  resize(e, i) {
    this._rowCount = i, this._fireOnCanvasResize();
  }
  _handleOptionsChanged() {
    this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
  }
  _fireOnCanvasResize() {
    this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
  }
  hasRenderer() {
    return !!this._renderer.value;
  }
  setRenderer(e) {
    this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((i) => this.refreshRows(i.start, i.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
  }
  addRefreshCallback(e) {
    return this._renderDebouncer.addRefreshCallback(e);
  }
  _fullRefresh() {
    this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
  }
  clearTextureAtlas() {
    this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
  }
  handleDevicePixelRatioChange() {
    this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
  }
  handleResize(e, i) {
    this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e, i)) : this._renderer.value.handleResize(e, i), this._fullRefresh());
  }
  handleCharSizeChanged() {
    this._renderer.value?.handleCharSizeChanged();
  }
  handleBlur() {
    this._renderer.value?.handleBlur();
  }
  handleFocus() {
    this._renderer.value?.handleFocus();
  }
  handleSelectionChanged(e, i, r2) {
    this._selectionState.start = e, this._selectionState.end = i, this._selectionState.columnSelectMode = r2, this._renderer.value?.handleSelectionChanged(e, i, r2);
  }
  handleCursorMove() {
    this._renderer.value?.handleCursorMove();
  }
  clear() {
    this._renderer.value?.clear();
  }
};
Qt = M([S(2, H), S(3, nt), S(4, ge), S(5, Be), S(6, F), S(7, ae), S(8, Re)], Qt);
var xs = class {
  constructor(t2, e, i) {
    this._coreBrowserService = t2;
    this._coreService = e;
    this._onTimeout = i;
    this._start = 0;
    this._end = 0;
    this._isBuffering = false;
  }
  bufferRows(t2, e) {
    this._isBuffering ? (this._start = Math.min(this._start, t2), this._end = Math.max(this._end, e)) : (this._start = t2, this._end = e, this._isBuffering = true), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
      this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
    }, 1e3));
  }
  flush() {
    if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
    let t2 = { start: this._start, end: this._end };
    return this._isBuffering = false, t2;
  }
  dispose() {
    this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
  }
};
function Jo(s15, t2, e, i) {
  let r2 = e.buffer.x, n2 = e.buffer.y;
  if (!e.buffer.hasScrollback) return Ga(r2, n2, s15, t2, e, i) + sn(n2, t2, e, i) + $a(r2, n2, s15, t2, e, i);
  let o2;
  if (n2 === t2) return o2 = r2 > s15 ? "D" : "C", Fi(Math.abs(r2 - s15), Ni(o2, i));
  o2 = n2 > t2 ? "D" : "C";
  let l3 = Math.abs(n2 - t2), a = za(n2 > t2 ? s15 : r2, e) + (l3 - 1) * e.cols + 1 + Ka(n2 > t2 ? r2 : s15);
  return Fi(a, Ni(o2, i));
}
function Ka(s15, t2) {
  return s15 - 1;
}
function za(s15, t2) {
  return t2.cols - s15;
}
function Ga(s15, t2, e, i, r2, n2) {
  return sn(t2, i, r2, n2).length === 0 ? "" : Fi(el(s15, t2, s15, t2 - gt(t2, r2), false, r2).length, Ni("D", n2));
}
function sn(s15, t2, e, i) {
  let r2 = s15 - gt(s15, e), n2 = t2 - gt(t2, e), o2 = Math.abs(r2 - n2) - Va(s15, t2, e);
  return Fi(o2, Ni(Qo(s15, t2), i));
}
function $a(s15, t2, e, i, r2, n2) {
  let o2;
  sn(t2, i, r2, n2).length > 0 ? o2 = i - gt(i, r2) : o2 = t2;
  let l3 = i, a = qa(s15, t2, e, i, r2, n2);
  return Fi(el(s15, o2, e, l3, a === "C", r2).length, Ni(a, n2));
}
function Va(s15, t2, e) {
  let i = 0, r2 = s15 - gt(s15, e), n2 = t2 - gt(t2, e);
  for (let o2 = 0; o2 < Math.abs(r2 - n2); o2++) {
    let l3 = Qo(s15, t2) === "A" ? -1 : 1;
    e.buffer.lines.get(r2 + l3 * o2)?.isWrapped && i++;
  }
  return i;
}
function gt(s15, t2) {
  let e = 0, i = t2.buffer.lines.get(s15), r2 = i?.isWrapped;
  for (; r2 && s15 >= 0 && s15 < t2.rows; ) e++, i = t2.buffer.lines.get(--s15), r2 = i?.isWrapped;
  return e;
}
function qa(s15, t2, e, i, r2, n2) {
  let o2;
  return sn(e, i, r2, n2).length > 0 ? o2 = i - gt(i, r2) : o2 = t2, s15 < e && o2 <= i || s15 >= e && o2 < i ? "C" : "D";
}
function Qo(s15, t2) {
  return s15 > t2 ? "A" : "B";
}
function el(s15, t2, e, i, r2, n2) {
  let o2 = s15, l3 = t2, a = "";
  for (; (o2 !== e || l3 !== i) && l3 >= 0 && l3 < n2.buffer.lines.length; ) o2 += r2 ? 1 : -1, r2 && o2 > n2.cols - 1 ? (a += n2.buffer.translateBufferLineToString(l3, false, s15, o2), o2 = 0, s15 = 0, l3++) : !r2 && o2 < 0 && (a += n2.buffer.translateBufferLineToString(l3, false, 0, s15 + 1), o2 = n2.cols - 1, s15 = o2, l3--);
  return a + n2.buffer.translateBufferLineToString(l3, false, s15, o2);
}
function Ni(s15, t2) {
  let e = t2 ? "O" : "[";
  return b.ESC + e + s15;
}
function Fi(s15, t2) {
  s15 = Math.floor(s15);
  let e = "";
  for (let i = 0; i < s15; i++) e += t2;
  return e;
}
var on = class {
  constructor(t2) {
    this._bufferService = t2;
    this.isSelectAllActive = false;
    this.selectionStartLength = 0;
  }
  clearSelection() {
    this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
  }
  get finalSelectionStart() {
    return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
  }
  get finalSelectionEnd() {
    if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
    if (this.selectionStart) {
      if (!this.selectionEnd || this.areSelectionValuesReversed()) {
        let t2 = this.selectionStart[0] + this.selectionStartLength;
        return t2 > this._bufferService.cols ? t2 % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(t2 / this._bufferService.cols) - 1] : [t2 % this._bufferService.cols, this.selectionStart[1] + Math.floor(t2 / this._bufferService.cols)] : [t2, this.selectionStart[1]];
      }
      if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
        let t2 = this.selectionStart[0] + this.selectionStartLength;
        return t2 > this._bufferService.cols ? [t2 % this._bufferService.cols, this.selectionStart[1] + Math.floor(t2 / this._bufferService.cols)] : [Math.max(t2, this.selectionEnd[0]), this.selectionEnd[1]];
      }
      return this.selectionEnd;
    }
  }
  areSelectionValuesReversed() {
    let t2 = this.selectionStart, e = this.selectionEnd;
    return !t2 || !e ? false : t2[1] > e[1] || t2[1] === e[1] && t2[0] > e[0];
  }
  handleTrim(t2) {
    return this.selectionStart && (this.selectionStart[1] -= t2), this.selectionEnd && (this.selectionEnd[1] -= t2), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
  }
};
function ws(s15, t2) {
  if (s15.start.y > s15.end.y) throw new Error(`Buffer range end (${s15.end.x}, ${s15.end.y}) cannot be before start (${s15.start.x}, ${s15.start.y})`);
  return t2 * (s15.end.y - s15.start.y) + (s15.end.x - s15.start.x + 1);
}
var Ds = 50, Ya = 15, ja = 50, Xa = 500, Za = " ", Ja = new RegExp(Za, "g");
var ei = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2, h2) {
    super();
    this._element = e;
    this._screenElement = i;
    this._linkifier = r2;
    this._bufferService = n2;
    this._coreService = o2;
    this._mouseService = l3;
    this._optionsService = a;
    this._renderService = u2;
    this._coreBrowserService = h2;
    this._dragScrollAmount = 0;
    this._enabled = true;
    this._workCell = new q();
    this._mouseDownTimeStamp = 0;
    this._oldHasSelection = false;
    this._oldSelectionStart = void 0;
    this._oldSelectionEnd = void 0;
    this._onLinuxMouseSelection = this._register(new v$1());
    this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
    this._onRedrawRequest = this._register(new v$1());
    this.onRequestRedraw = this._onRedrawRequest.event;
    this._onSelectionChange = this._register(new v$1());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onRequestScrollLines = this._register(new v$1());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._mouseMoveListener = (c) => this._handleMouseMove(c), this._mouseUpListener = (c) => this._handleMouseUp(c), this._coreService.onUserInput(() => {
      this.hasSelection && this.clearSelection();
    }), this._trimListener = this._bufferService.buffer.lines.onTrim((c) => this._handleTrim(c)), this._register(this._bufferService.buffers.onBufferActivate((c) => this._handleBufferActivate(c))), this.enable(), this._model = new on(this._bufferService), this._activeSelectionMode = 0, this._register(C(() => {
      this._removeMouseDownListeners();
    })), this._register(this._bufferService.onResize((c) => {
      c.rowsChanged && this.clearSelection();
    }));
  }
  reset() {
    this.clearSelection();
  }
  disable() {
    this.clearSelection(), this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  get selectionStart() {
    return this._model.finalSelectionStart;
  }
  get selectionEnd() {
    return this._model.finalSelectionEnd;
  }
  get hasSelection() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    return !e || !i ? false : e[0] !== i[0] || e[1] !== i[1];
  }
  get selectionText() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    if (!e || !i) return "";
    let r2 = this._bufferService.buffer, n2 = [];
    if (this._activeSelectionMode === 3) {
      if (e[0] === i[0]) return "";
      let l3 = e[0] < i[0] ? e[0] : i[0], a = e[0] < i[0] ? i[0] : e[0];
      for (let u2 = e[1]; u2 <= i[1]; u2++) {
        let h2 = r2.translateBufferLineToString(u2, true, l3, a);
        n2.push(h2);
      }
    } else {
      let l3 = e[1] === i[1] ? i[0] : void 0;
      n2.push(r2.translateBufferLineToString(e[1], true, e[0], l3));
      for (let a = e[1] + 1; a <= i[1] - 1; a++) {
        let u2 = r2.lines.get(a), h2 = r2.translateBufferLineToString(a, true);
        u2?.isWrapped ? n2[n2.length - 1] += h2 : n2.push(h2);
      }
      if (e[1] !== i[1]) {
        let a = r2.lines.get(i[1]), u2 = r2.translateBufferLineToString(i[1], true, 0, i[0]);
        a && a.isWrapped ? n2[n2.length - 1] += u2 : n2.push(u2);
      }
    }
    return n2.map((l3) => l3.replace(Ja, " ")).join(Es ? `\r
` : `
`);
  }
  clearSelection() {
    this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
  }
  refresh(e) {
    this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), Bi && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
  }
  _refresh() {
    this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
  }
  _isClickInSelection(e) {
    let i = this._getMouseBufferCoords(e), r2 = this._model.finalSelectionStart, n2 = this._model.finalSelectionEnd;
    return !r2 || !n2 || !i ? false : this._areCoordsInSelection(i, r2, n2);
  }
  isCellInSelection(e, i) {
    let r2 = this._model.finalSelectionStart, n2 = this._model.finalSelectionEnd;
    return !r2 || !n2 ? false : this._areCoordsInSelection([e, i], r2, n2);
  }
  _areCoordsInSelection(e, i, r2) {
    return e[1] > i[1] && e[1] < r2[1] || i[1] === r2[1] && e[1] === i[1] && e[0] >= i[0] && e[0] < r2[0] || i[1] < r2[1] && e[1] === r2[1] && e[0] < r2[0] || i[1] < r2[1] && e[1] === i[1] && e[0] >= i[0];
  }
  _selectWordAtCursor(e, i) {
    let r2 = this._linkifier.currentLink?.link?.range;
    if (r2) return this._model.selectionStart = [r2.start.x - 1, r2.start.y - 1], this._model.selectionStartLength = ws(r2, this._bufferService.cols), this._model.selectionEnd = void 0, true;
    let n2 = this._getMouseBufferCoords(e);
    return n2 ? (this._selectWordAt(n2, i), this._model.selectionEnd = void 0, true) : false;
  }
  selectAll() {
    this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
  }
  selectLines(e, i) {
    this._model.clearSelection(), e = Math.max(e, 0), i = Math.min(i, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, i], this.refresh(), this._onSelectionChange.fire();
  }
  _handleTrim(e) {
    this._model.handleTrim(e) && this.refresh();
  }
  _getMouseBufferCoords(e) {
    let i = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
    if (i) return i[0]--, i[1]--, i[1] += this._bufferService.buffer.ydisp, i;
  }
  _getMouseEventScrollAmount(e) {
    let i = Ci(this._coreBrowserService.window, e, this._screenElement)[1], r2 = this._renderService.dimensions.css.canvas.height;
    return i >= 0 && i <= r2 ? 0 : (i > r2 && (i -= r2), i = Math.min(Math.max(i, -Ds), Ds), i /= Ds, i / Math.abs(i) + Math.round(i * (Ya - 1)));
  }
  shouldForceSelection(e) {
    return Zt ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
  }
  handleMouseDown(e) {
    if (this._mouseDownTimeStamp = e.timeStamp, !(e.button === 2 && this.hasSelection) && e.button === 0) {
      if (!this._enabled) {
        if (!this.shouldForceSelection(e)) return;
        e.stopPropagation();
      }
      e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : e.detail === 1 ? this._handleSingleClick(e) : e.detail === 2 ? this._handleDoubleClick(e) : e.detail === 3 && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(true);
    }
  }
  _addMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), ja);
  }
  _removeMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
  }
  _handleIncrementalClick(e) {
    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
  }
  _handleSingleClick(e) {
    if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
    this._model.selectionEnd = void 0;
    let i = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
    i && i.length !== this._model.selectionStart[0] && i.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
  }
  _handleDoubleClick(e) {
    this._selectWordAtCursor(e, true) && (this._activeSelectionMode = 1);
  }
  _handleTripleClick(e) {
    let i = this._getMouseBufferCoords(e);
    i && (this._activeSelectionMode = 2, this._selectLineAt(i[1]));
  }
  shouldColumnSelect(e) {
    return e.altKey && !(Zt && this._optionsService.rawOptions.macOptionClickForcesSelection);
  }
  _handleMouseMove(e) {
    if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
    let i = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
    if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) {
      this.refresh(true);
      return;
    }
    this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
    let r2 = this._bufferService.buffer;
    if (this._model.selectionEnd[1] < r2.lines.length) {
      let n2 = r2.lines.get(this._model.selectionEnd[1]);
      n2 && n2.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
    }
    (!i || i[0] !== this._model.selectionEnd[0] || i[1] !== this._model.selectionEnd[1]) && this.refresh(true);
  }
  _dragScroll() {
    if (!(!this._model.selectionEnd || !this._model.selectionStart) && this._dragScrollAmount) {
      this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
      let e = this._bufferService.buffer;
      this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
    }
  }
  _handleMouseUp(e) {
    let i = e.timeStamp - this._mouseDownTimeStamp;
    if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && i < Xa && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
      if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
        let r2 = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, false);
        if (r2 && r2[0] !== void 0 && r2[1] !== void 0) {
          let n2 = Jo(r2[0] - 1, r2[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
          this._coreService.triggerDataEvent(n2, true);
        }
      }
    } else this._fireEventIfSelectionChanged();
  }
  _fireEventIfSelectionChanged() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd, r2 = !!e && !!i && (e[0] !== i[0] || e[1] !== i[1]);
    if (!r2) {
      this._oldHasSelection && this._fireOnSelectionChange(e, i, r2);
      return;
    }
    !e || !i || (!this._oldSelectionStart || !this._oldSelectionEnd || e[0] !== this._oldSelectionStart[0] || e[1] !== this._oldSelectionStart[1] || i[0] !== this._oldSelectionEnd[0] || i[1] !== this._oldSelectionEnd[1]) && this._fireOnSelectionChange(e, i, r2);
  }
  _fireOnSelectionChange(e, i, r2) {
    this._oldSelectionStart = e, this._oldSelectionEnd = i, this._oldHasSelection = r2, this._onSelectionChange.fire();
  }
  _handleBufferActivate(e) {
    this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((i) => this._handleTrim(i));
  }
  _convertViewportColToCharacterIndex(e, i) {
    let r2 = i;
    for (let n2 = 0; i >= n2; n2++) {
      let o2 = e.loadCell(n2, this._workCell).getChars().length;
      this._workCell.getWidth() === 0 ? r2-- : o2 > 1 && i !== n2 && (r2 += o2 - 1);
    }
    return r2;
  }
  setSelection(e, i, r2) {
    this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, i], this._model.selectionStartLength = r2, this.refresh(), this._fireEventIfSelectionChanged();
  }
  rightClickSelect(e) {
    this._isClickInSelection(e) || (this._selectWordAtCursor(e, false) && this.refresh(true), this._fireEventIfSelectionChanged());
  }
  _getWordAt(e, i, r2 = true, n2 = true) {
    if (e[0] >= this._bufferService.cols) return;
    let o2 = this._bufferService.buffer, l3 = o2.lines.get(e[1]);
    if (!l3) return;
    let a = o2.translateBufferLineToString(e[1], false), u2 = this._convertViewportColToCharacterIndex(l3, e[0]), h2 = u2, c = e[0] - u2, d = 0, _2 = 0, p2 = 0, m2 = 0;
    if (a.charAt(u2) === " ") {
      for (; u2 > 0 && a.charAt(u2 - 1) === " "; ) u2--;
      for (; h2 < a.length && a.charAt(h2 + 1) === " "; ) h2++;
    } else {
      let R2 = e[0], O2 = e[0];
      l3.getWidth(R2) === 0 && (d++, R2--), l3.getWidth(O2) === 2 && (_2++, O2++);
      let I2 = l3.getString(O2).length;
      for (I2 > 1 && (m2 += I2 - 1, h2 += I2 - 1); R2 > 0 && u2 > 0 && !this._isCharWordSeparator(l3.loadCell(R2 - 1, this._workCell)); ) {
        l3.loadCell(R2 - 1, this._workCell);
        let k2 = this._workCell.getChars().length;
        this._workCell.getWidth() === 0 ? (d++, R2--) : k2 > 1 && (p2 += k2 - 1, u2 -= k2 - 1), u2--, R2--;
      }
      for (; O2 < l3.length && h2 + 1 < a.length && !this._isCharWordSeparator(l3.loadCell(O2 + 1, this._workCell)); ) {
        l3.loadCell(O2 + 1, this._workCell);
        let k2 = this._workCell.getChars().length;
        this._workCell.getWidth() === 2 ? (_2++, O2++) : k2 > 1 && (m2 += k2 - 1, h2 += k2 - 1), h2++, O2++;
      }
    }
    h2++;
    let f2 = u2 + c - d + p2, A2 = Math.min(this._bufferService.cols, h2 - u2 + d + _2 - p2 - m2);
    if (!(!i && a.slice(u2, h2).trim() === "")) {
      if (r2 && f2 === 0 && l3.getCodePoint(0) !== 32) {
        let R2 = o2.lines.get(e[1] - 1);
        if (R2 && l3.isWrapped && R2.getCodePoint(this._bufferService.cols - 1) !== 32) {
          let O2 = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], false, true, false);
          if (O2) {
            let I2 = this._bufferService.cols - O2.start;
            f2 -= I2, A2 += I2;
          }
        }
      }
      if (n2 && f2 + A2 === this._bufferService.cols && l3.getCodePoint(this._bufferService.cols - 1) !== 32) {
        let R2 = o2.lines.get(e[1] + 1);
        if (R2?.isWrapped && R2.getCodePoint(0) !== 32) {
          let O2 = this._getWordAt([0, e[1] + 1], false, false, true);
          O2 && (A2 += O2.length);
        }
      }
      return { start: f2, length: A2 };
    }
  }
  _selectWordAt(e, i) {
    let r2 = this._getWordAt(e, i);
    if (r2) {
      for (; r2.start < 0; ) r2.start += this._bufferService.cols, e[1]--;
      this._model.selectionStart = [r2.start, e[1]], this._model.selectionStartLength = r2.length;
    }
  }
  _selectToWordAt(e) {
    let i = this._getWordAt(e, true);
    if (i) {
      let r2 = e[1];
      for (; i.start < 0; ) i.start += this._bufferService.cols, r2--;
      if (!this._model.areSelectionValuesReversed()) for (; i.start + i.length > this._bufferService.cols; ) i.length -= this._bufferService.cols, r2++;
      this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? i.start : i.start + i.length, r2];
    }
  }
  _isCharWordSeparator(e) {
    return e.getWidth() === 0 ? false : this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
  }
  _selectLineAt(e) {
    let i = this._bufferService.buffer.getWrappedRangeForLine(e), r2 = { start: { x: 0, y: i.first }, end: { x: this._bufferService.cols - 1, y: i.last } };
    this._model.selectionStart = [0, i.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ws(r2, this._bufferService.cols);
  }
};
ei = M([S(3, F), S(4, ge), S(5, Dt), S(6, H), S(7, ce), S(8, ae)], ei);
var Hi = class {
  constructor() {
    this._data = {};
  }
  set(t2, e, i) {
    this._data[t2] || (this._data[t2] = {}), this._data[t2][e] = i;
  }
  get(t2, e) {
    return this._data[t2] ? this._data[t2][e] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var Wi = class {
  constructor() {
    this._color = new Hi();
    this._css = new Hi();
  }
  setCss(t2, e, i) {
    this._css.set(t2, e, i);
  }
  getCss(t2, e) {
    return this._css.get(t2, e);
  }
  setColor(t2, e, i) {
    this._color.set(t2, e, i);
  }
  getColor(t2, e) {
    return this._color.get(t2, e);
  }
  clear() {
    this._color.clear(), this._css.clear();
  }
};
var re = Object.freeze((() => {
  let s15 = [z.toColor("#2e3436"), z.toColor("#cc0000"), z.toColor("#4e9a06"), z.toColor("#c4a000"), z.toColor("#3465a4"), z.toColor("#75507b"), z.toColor("#06989a"), z.toColor("#d3d7cf"), z.toColor("#555753"), z.toColor("#ef2929"), z.toColor("#8ae234"), z.toColor("#fce94f"), z.toColor("#729fcf"), z.toColor("#ad7fa8"), z.toColor("#34e2e2"), z.toColor("#eeeeec")], t2 = [0, 95, 135, 175, 215, 255];
  for (let e = 0; e < 216; e++) {
    let i = t2[e / 36 % 6 | 0], r2 = t2[e / 6 % 6 | 0], n2 = t2[e % 6];
    s15.push({ css: j.toCss(i, r2, n2), rgba: j.toRgba(i, r2, n2) });
  }
  for (let e = 0; e < 24; e++) {
    let i = 8 + e * 10;
    s15.push({ css: j.toCss(i, i, i), rgba: j.toRgba(i, i, i) });
  }
  return s15;
})());
var St = z.toColor("#ffffff"), Ki = z.toColor("#000000"), tl = z.toColor("#ffffff"), il = Ki, Ui = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 }, Qa = St, ti = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._contrastCache = new Wi();
    this._halfContrastCache = new Wi();
    this._onChangeColors = this._register(new v$1());
    this.onChangeColors = this._onChangeColors.event;
    this._colors = { foreground: St, background: Ki, cursor: tl, cursorAccent: il, selectionForeground: void 0, selectionBackgroundTransparent: Ui, selectionBackgroundOpaque: U.blend(Ki, Ui), selectionInactiveBackgroundTransparent: Ui, selectionInactiveBackgroundOpaque: U.blend(Ki, Ui), scrollbarSliderBackground: U.opacity(St, 0.2), scrollbarSliderHoverBackground: U.opacity(St, 0.4), scrollbarSliderActiveBackground: U.opacity(St, 0.5), overviewRulerBorder: St, ansi: re.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
  }
  get colors() {
    return this._colors;
  }
  _setTheme(e = {}) {
    let i = this._colors;
    if (i.foreground = K(e.foreground, St), i.background = K(e.background, Ki), i.cursor = U.blend(i.background, K(e.cursor, tl)), i.cursorAccent = U.blend(i.background, K(e.cursorAccent, il)), i.selectionBackgroundTransparent = K(e.selectionBackground, Ui), i.selectionBackgroundOpaque = U.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = K(e.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = U.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e.selectionForeground ? K(e.selectionForeground, ps) : void 0, i.selectionForeground === ps && (i.selectionForeground = void 0), U.isOpaque(i.selectionBackgroundTransparent) && (i.selectionBackgroundTransparent = U.opacity(i.selectionBackgroundTransparent, 0.3)), U.isOpaque(i.selectionInactiveBackgroundTransparent) && (i.selectionInactiveBackgroundTransparent = U.opacity(i.selectionInactiveBackgroundTransparent, 0.3)), i.scrollbarSliderBackground = K(e.scrollbarSliderBackground, U.opacity(i.foreground, 0.2)), i.scrollbarSliderHoverBackground = K(e.scrollbarSliderHoverBackground, U.opacity(i.foreground, 0.4)), i.scrollbarSliderActiveBackground = K(e.scrollbarSliderActiveBackground, U.opacity(i.foreground, 0.5)), i.overviewRulerBorder = K(e.overviewRulerBorder, Qa), i.ansi = re.slice(), i.ansi[0] = K(e.black, re[0]), i.ansi[1] = K(e.red, re[1]), i.ansi[2] = K(e.green, re[2]), i.ansi[3] = K(e.yellow, re[3]), i.ansi[4] = K(e.blue, re[4]), i.ansi[5] = K(e.magenta, re[5]), i.ansi[6] = K(e.cyan, re[6]), i.ansi[7] = K(e.white, re[7]), i.ansi[8] = K(e.brightBlack, re[8]), i.ansi[9] = K(e.brightRed, re[9]), i.ansi[10] = K(e.brightGreen, re[10]), i.ansi[11] = K(e.brightYellow, re[11]), i.ansi[12] = K(e.brightBlue, re[12]), i.ansi[13] = K(e.brightMagenta, re[13]), i.ansi[14] = K(e.brightCyan, re[14]), i.ansi[15] = K(e.brightWhite, re[15]), e.extendedAnsi) {
      let r2 = Math.min(i.ansi.length - 16, e.extendedAnsi.length);
      for (let n2 = 0; n2 < r2; n2++) i.ansi[n2 + 16] = K(e.extendedAnsi[n2], re[n2 + 16]);
    }
    this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
  }
  restoreColor(e) {
    this._restoreColor(e), this._onChangeColors.fire(this.colors);
  }
  _restoreColor(e) {
    if (e === void 0) {
      for (let i = 0; i < this._restoreColors.ansi.length; ++i) this._colors.ansi[i] = this._restoreColors.ansi[i];
      return;
    }
    switch (e) {
      case 256:
        this._colors.foreground = this._restoreColors.foreground;
        break;
      case 257:
        this._colors.background = this._restoreColors.background;
        break;
      case 258:
        this._colors.cursor = this._restoreColors.cursor;
        break;
      default:
        this._colors.ansi[e] = this._restoreColors.ansi[e];
    }
  }
  modifyColors(e) {
    e(this._colors), this._onChangeColors.fire(this.colors);
  }
  _updateRestoreColors() {
    this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
  }
};
ti = M([S(0, H)], ti);
function K(s15, t2) {
  if (s15 !== void 0) try {
    return z.toColor(s15);
  } catch {
  }
  return t2;
}
var Rs = class {
  constructor(...t2) {
    this._entries = /* @__PURE__ */ new Map();
    for (let [e, i] of t2) this.set(e, i);
  }
  set(t2, e) {
    let i = this._entries.get(t2);
    return this._entries.set(t2, e), i;
  }
  forEach(t2) {
    for (let [e, i] of this._entries.entries()) t2(e, i);
  }
  has(t2) {
    return this._entries.has(t2);
  }
  get(t2) {
    return this._entries.get(t2);
  }
}, ln = class {
  constructor() {
    this._services = new Rs();
    this._services.set(xt, this);
  }
  setService(t2, e) {
    this._services.set(t2, e);
  }
  getService(t2) {
    return this._services.get(t2);
  }
  createInstance(t2, ...e) {
    let i = Xs(t2).sort((o2, l3) => o2.index - l3.index), r2 = [];
    for (let o2 of i) {
      let l3 = this._services.get(o2.id);
      if (!l3) throw new Error(`[createInstance] ${t2.name} depends on UNKNOWN service ${o2.id._id}.`);
      r2.push(l3);
    }
    let n2 = i.length > 0 ? i[0].index : e.length;
    if (e.length !== n2) throw new Error(`[createInstance] First service dependency of ${t2.name} at position ${n2 + 1} conflicts with ${e.length} static arguments`);
    return new t2(...e, ...r2);
  }
};
var ec = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 }, tc = "xterm.js: ", ii = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel()));
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = ec[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(e) {
    for (let i = 0; i < e.length; i++) typeof e[i] == "function" && (e[i] = e[i]());
  }
  _log(e, i, r2) {
    this._evalLazyOptionalParams(r2), e.call(console, (this._optionsService.options.logger ? "" : tc) + i, ...r2);
  }
  trace(e, ...i) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  debug(e, ...i) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  info(e, ...i) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, i);
  }
  warn(e, ...i) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, i);
  }
  error(e, ...i) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, i);
  }
};
ii = M([S(0, H)], ii);
var zi = class extends D {
  constructor(e) {
    super();
    this._maxLength = e;
    this.onDeleteEmitter = this._register(new v$1());
    this.onDelete = this.onDeleteEmitter.event;
    this.onInsertEmitter = this._register(new v$1());
    this.onInsert = this.onInsertEmitter.event;
    this.onTrimEmitter = this._register(new v$1());
    this.onTrim = this.onTrimEmitter.event;
    this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
  }
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(e) {
    if (this._maxLength === e) return;
    let i = new Array(e);
    for (let r2 = 0; r2 < Math.min(e, this.length); r2++) i[r2] = this._array[this._getCyclicIndex(r2)];
    this._array = i, this._maxLength = e, this._startIndex = 0;
  }
  get length() {
    return this._length;
  }
  set length(e) {
    if (e > this._length) for (let i = this._length; i < e; i++) this._array[i] = void 0;
    this._length = e;
  }
  get(e) {
    return this._array[this._getCyclicIndex(e)];
  }
  set(e, i) {
    this._array[this._getCyclicIndex(e)] = i;
  }
  push(e) {
    this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
  }
  recycle() {
    if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
    return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
  }
  get isFull() {
    return this._length === this._maxLength;
  }
  pop() {
    return this._array[this._getCyclicIndex(this._length-- - 1)];
  }
  splice(e, i, ...r2) {
    if (i) {
      for (let n2 = e; n2 < this._length - i; n2++) this._array[this._getCyclicIndex(n2)] = this._array[this._getCyclicIndex(n2 + i)];
      this._length -= i, this.onDeleteEmitter.fire({ index: e, amount: i });
    }
    for (let n2 = this._length - 1; n2 >= e; n2--) this._array[this._getCyclicIndex(n2 + r2.length)] = this._array[this._getCyclicIndex(n2)];
    for (let n2 = 0; n2 < r2.length; n2++) this._array[this._getCyclicIndex(e + n2)] = r2[n2];
    if (r2.length && this.onInsertEmitter.fire({ index: e, amount: r2.length }), this._length + r2.length > this._maxLength) {
      let n2 = this._length + r2.length - this._maxLength;
      this._startIndex += n2, this._length = this._maxLength, this.onTrimEmitter.fire(n2);
    } else this._length += r2.length;
  }
  trimStart(e) {
    e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
  }
  shiftElements(e, i, r2) {
    if (!(i <= 0)) {
      if (e < 0 || e >= this._length) throw new Error("start argument out of range");
      if (e + r2 < 0) throw new Error("Cannot shift elements in list beyond index 0");
      if (r2 > 0) {
        for (let o2 = i - 1; o2 >= 0; o2--) this.set(e + o2 + r2, this.get(e + o2));
        let n2 = e + i + r2 - this._length;
        if (n2 > 0) for (this._length += n2; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
      } else for (let n2 = 0; n2 < i; n2++) this.set(e + n2 + r2, this.get(e + n2));
    }
  }
  _getCyclicIndex(e) {
    return (this._startIndex + e) % this._maxLength;
  }
};
var B = 3;
var X = Object.freeze(new De()), an = 0, Ls = 2, Ze = class s12 {
  constructor(t2, e, i = false) {
    this.isWrapped = i;
    this._combined = {};
    this._extendedAttrs = {};
    this._data = new Uint32Array(t2 * B);
    let r2 = e || q.fromCharData([0, ir, 1, 0]);
    for (let n2 = 0; n2 < t2; ++n2) this.setCell(n2, r2);
    this.length = t2;
  }
  get(t2) {
    let e = this._data[t2 * B + 0], i = e & 2097151;
    return [this._data[t2 * B + 1], e & 2097152 ? this._combined[t2] : i ? Ce(i) : "", e >> 22, e & 2097152 ? this._combined[t2].charCodeAt(this._combined[t2].length - 1) : i];
  }
  set(t2, e) {
    this._data[t2 * B + 1] = e[0], e[1].length > 1 ? (this._combined[t2] = e[1], this._data[t2 * B + 0] = t2 | 2097152 | e[2] << 22) : this._data[t2 * B + 0] = e[1].charCodeAt(0) | e[2] << 22;
  }
  getWidth(t2) {
    return this._data[t2 * B + 0] >> 22;
  }
  hasWidth(t2) {
    return this._data[t2 * B + 0] & 12582912;
  }
  getFg(t2) {
    return this._data[t2 * B + 1];
  }
  getBg(t2) {
    return this._data[t2 * B + 2];
  }
  hasContent(t2) {
    return this._data[t2 * B + 0] & 4194303;
  }
  getCodePoint(t2) {
    let e = this._data[t2 * B + 0];
    return e & 2097152 ? this._combined[t2].charCodeAt(this._combined[t2].length - 1) : e & 2097151;
  }
  isCombined(t2) {
    return this._data[t2 * B + 0] & 2097152;
  }
  getString(t2) {
    let e = this._data[t2 * B + 0];
    return e & 2097152 ? this._combined[t2] : e & 2097151 ? Ce(e & 2097151) : "";
  }
  isProtected(t2) {
    return this._data[t2 * B + 2] & 536870912;
  }
  loadCell(t2, e) {
    return an = t2 * B, e.content = this._data[an + 0], e.fg = this._data[an + 1], e.bg = this._data[an + 2], e.content & 2097152 && (e.combinedData = this._combined[t2]), e.bg & 268435456 && (e.extended = this._extendedAttrs[t2]), e;
  }
  setCell(t2, e) {
    e.content & 2097152 && (this._combined[t2] = e.combinedData), e.bg & 268435456 && (this._extendedAttrs[t2] = e.extended), this._data[t2 * B + 0] = e.content, this._data[t2 * B + 1] = e.fg, this._data[t2 * B + 2] = e.bg;
  }
  setCellFromCodepoint(t2, e, i, r2) {
    r2.bg & 268435456 && (this._extendedAttrs[t2] = r2.extended), this._data[t2 * B + 0] = e | i << 22, this._data[t2 * B + 1] = r2.fg, this._data[t2 * B + 2] = r2.bg;
  }
  addCodepointToCell(t2, e, i) {
    let r2 = this._data[t2 * B + 0];
    r2 & 2097152 ? this._combined[t2] += Ce(e) : r2 & 2097151 ? (this._combined[t2] = Ce(r2 & 2097151) + Ce(e), r2 &= -2097152, r2 |= 2097152) : r2 = e | 1 << 22, i && (r2 &= -12582913, r2 |= i << 22), this._data[t2 * B + 0] = r2;
  }
  insertCells(t2, e, i) {
    if (t2 %= this.length, t2 && this.getWidth(t2 - 1) === 2 && this.setCellFromCodepoint(t2 - 1, 0, 1, i), e < this.length - t2) {
      let r2 = new q();
      for (let n2 = this.length - t2 - e - 1; n2 >= 0; --n2) this.setCell(t2 + e + n2, this.loadCell(t2 + n2, r2));
      for (let n2 = 0; n2 < e; ++n2) this.setCell(t2 + n2, i);
    } else for (let r2 = t2; r2 < this.length; ++r2) this.setCell(r2, i);
    this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, i);
  }
  deleteCells(t2, e, i) {
    if (t2 %= this.length, e < this.length - t2) {
      let r2 = new q();
      for (let n2 = 0; n2 < this.length - t2 - e; ++n2) this.setCell(t2 + n2, this.loadCell(t2 + e + n2, r2));
      for (let n2 = this.length - e; n2 < this.length; ++n2) this.setCell(n2, i);
    } else for (let r2 = t2; r2 < this.length; ++r2) this.setCell(r2, i);
    t2 && this.getWidth(t2 - 1) === 2 && this.setCellFromCodepoint(t2 - 1, 0, 1, i), this.getWidth(t2) === 0 && !this.hasContent(t2) && this.setCellFromCodepoint(t2, 0, 1, i);
  }
  replaceCells(t2, e, i, r2 = false) {
    if (r2) {
      for (t2 && this.getWidth(t2 - 1) === 2 && !this.isProtected(t2 - 1) && this.setCellFromCodepoint(t2 - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && !this.isProtected(e) && this.setCellFromCodepoint(e, 0, 1, i); t2 < e && t2 < this.length; ) this.isProtected(t2) || this.setCell(t2, i), t2++;
      return;
    }
    for (t2 && this.getWidth(t2 - 1) === 2 && this.setCellFromCodepoint(t2 - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e, 0, 1, i); t2 < e && t2 < this.length; ) this.setCell(t2++, i);
  }
  resize(t2, e) {
    if (t2 === this.length) return this._data.length * 4 * Ls < this._data.buffer.byteLength;
    let i = t2 * B;
    if (t2 > this.length) {
      if (this._data.buffer.byteLength >= i * 4) this._data = new Uint32Array(this._data.buffer, 0, i);
      else {
        let r2 = new Uint32Array(i);
        r2.set(this._data), this._data = r2;
      }
      for (let r2 = this.length; r2 < t2; ++r2) this.setCell(r2, e);
    } else {
      this._data = this._data.subarray(0, i);
      let r2 = Object.keys(this._combined);
      for (let o2 = 0; o2 < r2.length; o2++) {
        let l3 = parseInt(r2[o2], 10);
        l3 >= t2 && delete this._combined[l3];
      }
      let n2 = Object.keys(this._extendedAttrs);
      for (let o2 = 0; o2 < n2.length; o2++) {
        let l3 = parseInt(n2[o2], 10);
        l3 >= t2 && delete this._extendedAttrs[l3];
      }
    }
    return this.length = t2, i * 4 * Ls < this._data.buffer.byteLength;
  }
  cleanupMemory() {
    if (this._data.length * 4 * Ls < this._data.buffer.byteLength) {
      let t2 = new Uint32Array(this._data.length);
      return t2.set(this._data), this._data = t2, 1;
    }
    return 0;
  }
  fill(t2, e = false) {
    if (e) {
      for (let i = 0; i < this.length; ++i) this.isProtected(i) || this.setCell(i, t2);
      return;
    }
    this._combined = {}, this._extendedAttrs = {};
    for (let i = 0; i < this.length; ++i) this.setCell(i, t2);
  }
  copyFrom(t2) {
    this.length !== t2.length ? this._data = new Uint32Array(t2._data) : this._data.set(t2._data), this.length = t2.length, this._combined = {};
    for (let e in t2._combined) this._combined[e] = t2._combined[e];
    this._extendedAttrs = {};
    for (let e in t2._extendedAttrs) this._extendedAttrs[e] = t2._extendedAttrs[e];
    this.isWrapped = t2.isWrapped;
  }
  clone() {
    let t2 = new s12(0);
    t2._data = new Uint32Array(this._data), t2.length = this.length;
    for (let e in this._combined) t2._combined[e] = this._combined[e];
    for (let e in this._extendedAttrs) t2._extendedAttrs[e] = this._extendedAttrs[e];
    return t2.isWrapped = this.isWrapped, t2;
  }
  getTrimmedLength() {
    for (let t2 = this.length - 1; t2 >= 0; --t2) if (this._data[t2 * B + 0] & 4194303) return t2 + (this._data[t2 * B + 0] >> 22);
    return 0;
  }
  getNoBgTrimmedLength() {
    for (let t2 = this.length - 1; t2 >= 0; --t2) if (this._data[t2 * B + 0] & 4194303 || this._data[t2 * B + 2] & 50331648) return t2 + (this._data[t2 * B + 0] >> 22);
    return 0;
  }
  copyCellsFrom(t2, e, i, r2, n2) {
    let o2 = t2._data;
    if (n2) for (let a = r2 - 1; a >= 0; a--) {
      for (let u2 = 0; u2 < B; u2++) this._data[(i + a) * B + u2] = o2[(e + a) * B + u2];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t2._extendedAttrs[e + a]);
    }
    else for (let a = 0; a < r2; a++) {
      for (let u2 = 0; u2 < B; u2++) this._data[(i + a) * B + u2] = o2[(e + a) * B + u2];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t2._extendedAttrs[e + a]);
    }
    let l3 = Object.keys(t2._combined);
    for (let a = 0; a < l3.length; a++) {
      let u2 = parseInt(l3[a], 10);
      u2 >= e && (this._combined[u2 - e + i] = t2._combined[u2]);
    }
  }
  translateToString(t2, e, i, r2) {
    e = e ?? 0, i = i ?? this.length, t2 && (i = Math.min(i, this.getTrimmedLength())), r2 && (r2.length = 0);
    let n2 = "";
    for (; e < i; ) {
      let o2 = this._data[e * B + 0], l3 = o2 & 2097151, a = o2 & 2097152 ? this._combined[e] : l3 ? Ce(l3) : we;
      if (n2 += a, r2) for (let u2 = 0; u2 < a.length; ++u2) r2.push(e);
      e += o2 >> 22 || 1;
    }
    return r2 && r2.push(e), n2;
  }
};
function sl(s15, t2, e, i, r2, n2) {
  let o2 = [];
  for (let l3 = 0; l3 < s15.length - 1; l3++) {
    let a = l3, u2 = s15.get(++a);
    if (!u2.isWrapped) continue;
    let h2 = [s15.get(l3)];
    for (; a < s15.length && u2.isWrapped; ) h2.push(u2), u2 = s15.get(++a);
    if (!n2 && i >= l3 && i < a) {
      l3 += h2.length - 1;
      continue;
    }
    let c = 0, d = ri(h2, c, t2), _2 = 1, p2 = 0;
    for (; _2 < h2.length; ) {
      let f2 = ri(h2, _2, t2), A2 = f2 - p2, R2 = e - d, O2 = Math.min(A2, R2);
      h2[c].copyCellsFrom(h2[_2], p2, d, O2, false), d += O2, d === e && (c++, d = 0), p2 += O2, p2 === f2 && (_2++, p2 = 0), d === 0 && c !== 0 && h2[c - 1].getWidth(e - 1) === 2 && (h2[c].copyCellsFrom(h2[c - 1], e - 1, d++, 1, false), h2[c - 1].setCell(e - 1, r2));
    }
    h2[c].replaceCells(d, e, r2);
    let m2 = 0;
    for (let f2 = h2.length - 1; f2 > 0 && (f2 > c || h2[f2].getTrimmedLength() === 0); f2--) m2++;
    m2 > 0 && (o2.push(l3 + h2.length - m2), o2.push(m2)), l3 += h2.length - 1;
  }
  return o2;
}
function ol(s15, t2) {
  let e = [], i = 0, r2 = t2[i], n2 = 0;
  for (let o2 = 0; o2 < s15.length; o2++) if (r2 === o2) {
    let l3 = t2[++i];
    s15.onDeleteEmitter.fire({ index: o2 - n2, amount: l3 }), o2 += l3 - 1, n2 += l3, r2 = t2[++i];
  } else e.push(o2);
  return { layout: e, countRemoved: n2 };
}
function ll(s15, t2) {
  let e = [];
  for (let i = 0; i < t2.length; i++) e.push(s15.get(t2[i]));
  for (let i = 0; i < e.length; i++) s15.set(i, e[i]);
  s15.length = t2.length;
}
function al(s15, t2, e) {
  let i = [], r2 = s15.map((a, u2) => ri(s15, u2, t2)).reduce((a, u2) => a + u2), n2 = 0, o2 = 0, l3 = 0;
  for (; l3 < r2; ) {
    if (r2 - l3 < e) {
      i.push(r2 - l3);
      break;
    }
    n2 += e;
    let a = ri(s15, o2, t2);
    n2 > a && (n2 -= a, o2++);
    let u2 = s15[o2].getWidth(n2 - 1) === 2;
    u2 && n2--;
    let h2 = u2 ? e - 1 : e;
    i.push(h2), l3 += h2;
  }
  return i;
}
function ri(s15, t2, e) {
  if (t2 === s15.length - 1) return s15[t2].getTrimmedLength();
  let i = !s15[t2].hasContent(e - 1) && s15[t2].getWidth(e - 1) === 1, r2 = s15[t2 + 1].getWidth(0) === 2;
  return i && r2 ? e - 1 : e;
}
var un = class un2 {
  constructor(t2) {
    this.line = t2;
    this.isDisposed = false;
    this._disposables = [];
    this._id = un2._nextId++;
    this._onDispose = this.register(new v$1());
    this.onDispose = this._onDispose.event;
  }
  get id() {
    return this._id;
  }
  dispose() {
    this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), Ne(this._disposables), this._disposables.length = 0);
  }
  register(t2) {
    return this._disposables.push(t2), t2;
  }
};
un._nextId = 1;
var cn = un;
var ne = {}, Je = ne.B;
ne[0] = { "`": "◆", a: "▒", b: "␉", c: "␌", d: "␍", e: "␊", f: "°", g: "±", h: "␤", i: "␋", j: "┘", k: "┐", l: "┌", m: "└", n: "┼", o: "⎺", p: "⎻", q: "─", r: "⎼", s: "⎽", t: "├", u: "┤", v: "┴", w: "┬", x: "│", y: "≤", z: "≥", "{": "π", "|": "≠", "}": "£", "~": "·" };
ne.A = { "#": "£" };
ne.B = void 0;
ne[4] = { "#": "£", "@": "¾", "[": "ij", "\\": "½", "]": "|", "{": "¨", "|": "f", "}": "¼", "~": "´" };
ne.C = ne[5] = { "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" };
ne.R = { "#": "£", "@": "à", "[": "°", "\\": "ç", "]": "§", "{": "é", "|": "ù", "}": "è", "~": "¨" };
ne.Q = { "@": "à", "[": "â", "\\": "ç", "]": "ê", "^": "î", "`": "ô", "{": "é", "|": "ù", "}": "è", "~": "û" };
ne.K = { "@": "§", "[": "Ä", "\\": "Ö", "]": "Ü", "{": "ä", "|": "ö", "}": "ü", "~": "ß" };
ne.Y = { "#": "£", "@": "§", "[": "°", "\\": "ç", "]": "é", "`": "ù", "{": "à", "|": "ò", "}": "è", "~": "ì" };
ne.E = ne[6] = { "@": "Ä", "[": "Æ", "\\": "Ø", "]": "Å", "^": "Ü", "`": "ä", "{": "æ", "|": "ø", "}": "å", "~": "ü" };
ne.Z = { "#": "£", "@": "§", "[": "¡", "\\": "Ñ", "]": "¿", "{": "°", "|": "ñ", "}": "ç" };
ne.H = ne[7] = { "@": "É", "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" };
ne["="] = { "#": "ù", "@": "à", "[": "é", "\\": "ç", "]": "ê", "^": "î", _: "è", "`": "ô", "{": "ä", "|": "ö", "}": "ü", "~": "û" };
var cl = 4294967295, $i = class {
  constructor(t2, e, i) {
    this._hasScrollback = t2;
    this._optionsService = e;
    this._bufferService = i;
    this.ydisp = 0;
    this.ybase = 0;
    this.y = 0;
    this.x = 0;
    this.tabs = {};
    this.savedY = 0;
    this.savedX = 0;
    this.savedCurAttrData = X.clone();
    this.savedCharset = Je;
    this.markers = [];
    this._nullCell = q.fromCharData([0, ir, 1, 0]);
    this._whitespaceCell = q.fromCharData([0, we, 1, 32]);
    this._isClearing = false;
    this._memoryCleanupQueue = new Jt();
    this._memoryCleanupPosition = 0;
    this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  getNullCell(t2) {
    return t2 ? (this._nullCell.fg = t2.fg, this._nullCell.bg = t2.bg, this._nullCell.extended = t2.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new rt()), this._nullCell;
  }
  getWhitespaceCell(t2) {
    return t2 ? (this._whitespaceCell.fg = t2.fg, this._whitespaceCell.bg = t2.bg, this._whitespaceCell.extended = t2.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new rt()), this._whitespaceCell;
  }
  getBlankLine(t2, e) {
    return new Ze(this._bufferService.cols, this.getNullCell(t2), e);
  }
  get hasScrollback() {
    return this._hasScrollback && this.lines.maxLength > this._rows;
  }
  get isCursorInViewport() {
    let e = this.ybase + this.y - this.ydisp;
    return e >= 0 && e < this._rows;
  }
  _getCorrectBufferLength(t2) {
    if (!this._hasScrollback) return t2;
    let e = t2 + this._optionsService.rawOptions.scrollback;
    return e > cl ? cl : e;
  }
  fillViewportRows(t2) {
    if (this.lines.length === 0) {
      t2 === void 0 && (t2 = X);
      let e = this._rows;
      for (; e--; ) this.lines.push(this.getBlankLine(t2));
    }
  }
  clear() {
    this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  resize(t2, e) {
    let i = this.getNullCell(X), r2 = 0, n2 = this._getCorrectBufferLength(e);
    if (n2 > this.lines.maxLength && (this.lines.maxLength = n2), this.lines.length > 0) {
      if (this._cols < t2) for (let l3 = 0; l3 < this.lines.length; l3++) r2 += +this.lines.get(l3).resize(t2, i);
      let o2 = 0;
      if (this._rows < e) for (let l3 = this._rows; l3 < e; l3++) this.lines.length < e + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ze(t2, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o2 + 1 ? (this.ybase--, o2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ze(t2, i)));
      else for (let l3 = this._rows; l3 > e; l3--) this.lines.length > e + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
      if (n2 < this.lines.maxLength) {
        let l3 = this.lines.length - n2;
        l3 > 0 && (this.lines.trimStart(l3), this.ybase = Math.max(this.ybase - l3, 0), this.ydisp = Math.max(this.ydisp - l3, 0), this.savedY = Math.max(this.savedY - l3, 0)), this.lines.maxLength = n2;
      }
      this.x = Math.min(this.x, t2 - 1), this.y = Math.min(this.y, e - 1), o2 && (this.y += o2), this.savedX = Math.min(this.savedX, t2 - 1), this.scrollTop = 0;
    }
    if (this.scrollBottom = e - 1, this._isReflowEnabled && (this._reflow(t2, e), this._cols > t2)) for (let o2 = 0; o2 < this.lines.length; o2++) r2 += +this.lines.get(o2).resize(t2, i);
    this._cols = t2, this._rows = e, this._memoryCleanupQueue.clear(), r2 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
  }
  _batchedMemoryCleanup() {
    let t2 = true;
    this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, t2 = false);
    let e = 0;
    for (; this._memoryCleanupPosition < this.lines.length; ) if (e += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), e > 100) return true;
    return t2;
  }
  get _isReflowEnabled() {
    let t2 = this._optionsService.rawOptions.windowsPty;
    return t2 && t2.buildNumber ? this._hasScrollback && t2.backend === "conpty" && t2.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
  }
  _reflow(t2, e) {
    this._cols !== t2 && (t2 > this._cols ? this._reflowLarger(t2, e) : this._reflowSmaller(t2, e));
  }
  _reflowLarger(t2, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r2 = sl(this.lines, this._cols, t2, this.ybase + this.y, this.getNullCell(X), i);
    if (r2.length > 0) {
      let n2 = ol(this.lines, r2);
      ll(this.lines, n2.layout), this._reflowLargerAdjustViewport(t2, e, n2.countRemoved);
    }
  }
  _reflowLargerAdjustViewport(t2, e, i) {
    let r2 = this.getNullCell(X), n2 = i;
    for (; n2-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < e && this.lines.push(new Ze(t2, r2))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
    this.savedY = Math.max(this.savedY - i, 0);
  }
  _reflowSmaller(t2, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r2 = this.getNullCell(X), n2 = [], o2 = 0;
    for (let l3 = this.lines.length - 1; l3 >= 0; l3--) {
      let a = this.lines.get(l3);
      if (!a || !a.isWrapped && a.getTrimmedLength() <= t2) continue;
      let u2 = [a];
      for (; a.isWrapped && l3 > 0; ) a = this.lines.get(--l3), u2.unshift(a);
      if (!i) {
        let I2 = this.ybase + this.y;
        if (I2 >= l3 && I2 < l3 + u2.length) continue;
      }
      let h2 = u2[u2.length - 1].getTrimmedLength(), c = al(u2, this._cols, t2), d = c.length - u2.length, _2;
      this.ybase === 0 && this.y !== this.lines.length - 1 ? _2 = Math.max(0, this.y - this.lines.maxLength + d) : _2 = Math.max(0, this.lines.length - this.lines.maxLength + d);
      let p2 = [];
      for (let I2 = 0; I2 < d; I2++) {
        let k2 = this.getBlankLine(X, true);
        p2.push(k2);
      }
      p2.length > 0 && (n2.push({ start: l3 + u2.length + o2, newLines: p2 }), o2 += p2.length), u2.push(...p2);
      let m2 = c.length - 1, f2 = c[m2];
      f2 === 0 && (m2--, f2 = c[m2]);
      let A2 = u2.length - d - 1, R2 = h2;
      for (; A2 >= 0; ) {
        let I2 = Math.min(R2, f2);
        if (u2[m2] === void 0) break;
        if (u2[m2].copyCellsFrom(u2[A2], R2 - I2, f2 - I2, I2, true), f2 -= I2, f2 === 0 && (m2--, f2 = c[m2]), R2 -= I2, R2 === 0) {
          A2--;
          let k2 = Math.max(A2, 0);
          R2 = ri(u2, k2, this._cols);
        }
      }
      for (let I2 = 0; I2 < u2.length; I2++) c[I2] < t2 && u2[I2].setCell(c[I2], r2);
      let O2 = d - _2;
      for (; O2-- > 0; ) this.ybase === 0 ? this.y < e - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + o2) - e && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
      this.savedY = Math.min(this.savedY + d, this.ybase + e - 1);
    }
    if (n2.length > 0) {
      let l3 = [], a = [];
      for (let f2 = 0; f2 < this.lines.length; f2++) a.push(this.lines.get(f2));
      let u2 = this.lines.length, h2 = u2 - 1, c = 0, d = n2[c];
      this.lines.length = Math.min(this.lines.maxLength, this.lines.length + o2);
      let _2 = 0;
      for (let f2 = Math.min(this.lines.maxLength - 1, u2 + o2 - 1); f2 >= 0; f2--) if (d && d.start > h2 + _2) {
        for (let A2 = d.newLines.length - 1; A2 >= 0; A2--) this.lines.set(f2--, d.newLines[A2]);
        f2++, l3.push({ index: h2 + 1, amount: d.newLines.length }), _2 += d.newLines.length, d = n2[++c];
      } else this.lines.set(f2, a[h2--]);
      let p2 = 0;
      for (let f2 = l3.length - 1; f2 >= 0; f2--) l3[f2].index += p2, this.lines.onInsertEmitter.fire(l3[f2]), p2 += l3[f2].amount;
      let m2 = Math.max(0, u2 + o2 - this.lines.maxLength);
      m2 > 0 && this.lines.onTrimEmitter.fire(m2);
    }
  }
  translateBufferLineToString(t2, e, i = 0, r2) {
    let n2 = this.lines.get(t2);
    return n2 ? n2.translateToString(e, i, r2) : "";
  }
  getWrappedRangeForLine(t2) {
    let e = t2, i = t2;
    for (; e > 0 && this.lines.get(e).isWrapped; ) e--;
    for (; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped; ) i++;
    return { first: e, last: i };
  }
  setupTabStops(t2) {
    for (t2 != null ? this.tabs[t2] || (t2 = this.prevStop(t2)) : (this.tabs = {}, t2 = 0); t2 < this._cols; t2 += this._optionsService.rawOptions.tabStopWidth) this.tabs[t2] = true;
  }
  prevStop(t2) {
    for (t2 == null && (t2 = this.x); !this.tabs[--t2] && t2 > 0; ) ;
    return t2 >= this._cols ? this._cols - 1 : t2 < 0 ? 0 : t2;
  }
  nextStop(t2) {
    for (t2 == null && (t2 = this.x); !this.tabs[++t2] && t2 < this._cols; ) ;
    return t2 >= this._cols ? this._cols - 1 : t2 < 0 ? 0 : t2;
  }
  clearMarkers(t2) {
    this._isClearing = true;
    for (let e = 0; e < this.markers.length; e++) this.markers[e].line === t2 && (this.markers[e].dispose(), this.markers.splice(e--, 1));
    this._isClearing = false;
  }
  clearAllMarkers() {
    this._isClearing = true;
    for (let t2 = 0; t2 < this.markers.length; t2++) this.markers[t2].dispose();
    this.markers.length = 0, this._isClearing = false;
  }
  addMarker(t2) {
    let e = new cn(t2);
    return this.markers.push(e), e.register(this.lines.onTrim((i) => {
      e.line -= i, e.line < 0 && e.dispose();
    })), e.register(this.lines.onInsert((i) => {
      e.line >= i.index && (e.line += i.amount);
    })), e.register(this.lines.onDelete((i) => {
      e.line >= i.index && e.line < i.index + i.amount && e.dispose(), e.line > i.index && (e.line -= i.amount);
    })), e.register(e.onDispose(() => this._removeMarker(e))), e;
  }
  _removeMarker(t2) {
    this._isClearing || this.markers.splice(this.markers.indexOf(t2), 1);
  }
};
var hn = class extends D {
  constructor(e, i) {
    super();
    this._optionsService = e;
    this._bufferService = i;
    this._onBufferActivate = this._register(new v$1());
    this.onBufferActivate = this._onBufferActivate.event;
    this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
  }
  reset() {
    this._normal = new $i(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new $i(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
  }
  get alt() {
    return this._alt;
  }
  get active() {
    return this._activeBuffer;
  }
  get normal() {
    return this._normal;
  }
  activateNormalBuffer() {
    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
  }
  activateAltBuffer(e) {
    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
  }
  resize(e, i) {
    this._normal.resize(e, i), this._alt.resize(e, i), this.setupTabStops(e);
  }
  setupTabStops(e) {
    this._normal.setupTabStops(e), this._alt.setupTabStops(e);
  }
};
var ks = 2, Cs = 1, ni = class extends D {
  constructor(e) {
    super();
    this.isUserScrolling = false;
    this._onResize = this._register(new v$1());
    this.onResize = this._onResize.event;
    this._onScroll = this._register(new v$1());
    this.onScroll = this._onScroll.event;
    this.cols = Math.max(e.rawOptions.cols || 0, ks), this.rows = Math.max(e.rawOptions.rows || 0, Cs), this.buffers = this._register(new hn(e, this)), this._register(this.buffers.onBufferActivate((i) => {
      this._onScroll.fire(i.activeBuffer.ydisp);
    }));
  }
  get buffer() {
    return this.buffers.active;
  }
  resize(e, i) {
    let r2 = this.cols !== e, n2 = this.rows !== i;
    this.cols = e, this.rows = i, this.buffers.resize(e, i), this._onResize.fire({ cols: e, rows: i, colsChanged: r2, rowsChanged: n2 });
  }
  reset() {
    this.buffers.reset(), this.isUserScrolling = false;
  }
  scroll(e, i = false) {
    let r2 = this.buffer, n2;
    n2 = this._cachedBlankLine, (!n2 || n2.length !== this.cols || n2.getFg(0) !== e.fg || n2.getBg(0) !== e.bg) && (n2 = r2.getBlankLine(e, i), this._cachedBlankLine = n2), n2.isWrapped = i;
    let o2 = r2.ybase + r2.scrollTop, l3 = r2.ybase + r2.scrollBottom;
    if (r2.scrollTop === 0) {
      let a = r2.lines.isFull;
      l3 === r2.lines.length - 1 ? a ? r2.lines.recycle().copyFrom(n2) : r2.lines.push(n2.clone()) : r2.lines.splice(l3 + 1, 0, n2.clone()), a ? this.isUserScrolling && (r2.ydisp = Math.max(r2.ydisp - 1, 0)) : (r2.ybase++, this.isUserScrolling || r2.ydisp++);
    } else {
      let a = l3 - o2 + 1;
      r2.lines.shiftElements(o2 + 1, a - 1, -1), r2.lines.set(l3, n2.clone());
    }
    this.isUserScrolling || (r2.ydisp = r2.ybase), this._onScroll.fire(r2.ydisp);
  }
  scrollLines(e, i) {
    let r2 = this.buffer;
    if (e < 0) {
      if (r2.ydisp === 0) return;
      this.isUserScrolling = true;
    } else e + r2.ydisp >= r2.ybase && (this.isUserScrolling = false);
    let n2 = r2.ydisp;
    r2.ydisp = Math.max(Math.min(r2.ydisp + e, r2.ybase), 0), n2 !== r2.ydisp && (i || this._onScroll.fire(r2.ydisp));
  }
};
ni = M([S(0, H)], ni);
var si = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: Zt, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} }, nc = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"], dn = class extends D {
  constructor(e) {
    super();
    this._onOptionChange = this._register(new v$1());
    this.onOptionChange = this._onOptionChange.event;
    let i = { ...si };
    for (let r2 in e) if (r2 in i) try {
      let n2 = e[r2];
      i[r2] = this._sanitizeAndValidateOption(r2, n2);
    } catch (n2) {
      console.error(n2);
    }
    this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this._register(C(() => {
      this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
    }));
  }
  onSpecificOptionChange(e, i) {
    return this.onOptionChange((r2) => {
      r2 === e && i(this.rawOptions[e]);
    });
  }
  onMultipleOptionChange(e, i) {
    return this.onOptionChange((r2) => {
      e.indexOf(r2) !== -1 && i();
    });
  }
  _setupOptions() {
    let e = (r2) => {
      if (!(r2 in si)) throw new Error(`No option with key "${r2}"`);
      return this.rawOptions[r2];
    }, i = (r2, n2) => {
      if (!(r2 in si)) throw new Error(`No option with key "${r2}"`);
      n2 = this._sanitizeAndValidateOption(r2, n2), this.rawOptions[r2] !== n2 && (this.rawOptions[r2] = n2, this._onOptionChange.fire(r2));
    };
    for (let r2 in this.rawOptions) {
      let n2 = { get: e.bind(this, r2), set: i.bind(this, r2) };
      Object.defineProperty(this.options, r2, n2);
    }
  }
  _sanitizeAndValidateOption(e, i) {
    switch (e) {
      case "cursorStyle":
        if (i || (i = si[e]), !sc(i)) throw new Error(`"${i}" is not a valid value for ${e}`);
        break;
      case "wordSeparator":
        i || (i = si[e]);
        break;
      case "fontWeight":
      case "fontWeightBold":
        if (typeof i == "number" && 1 <= i && i <= 1e3) break;
        i = nc.includes(i) ? i : si[e];
        break;
      case "cursorWidth":
        i = Math.floor(i);
      case "lineHeight":
      case "tabStopWidth":
        if (i < 1) throw new Error(`${e} cannot be less than 1, value: ${i}`);
        break;
      case "minimumContrastRatio":
        i = Math.max(1, Math.min(21, Math.round(i * 10) / 10));
        break;
      case "scrollback":
        if (i = Math.min(i, 4294967295), i < 0) throw new Error(`${e} cannot be less than 0, value: ${i}`);
        break;
      case "fastScrollSensitivity":
      case "scrollSensitivity":
        if (i <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i}`);
        break;
      case "rows":
      case "cols":
        if (!i && i !== 0) throw new Error(`${e} must be numeric, value: ${i}`);
        break;
      case "windowsPty":
        i = i ?? {};
        break;
    }
    return i;
  }
};
function sc(s15) {
  return s15 === "block" || s15 === "underline" || s15 === "bar";
}
function oi(s15, t2 = 5) {
  if (typeof s15 != "object") return s15;
  let e = Array.isArray(s15) ? [] : {};
  for (let i in s15) e[i] = t2 <= 1 ? s15[i] : s15[i] && oi(s15[i], t2 - 1);
  return e;
}
var ul = Object.freeze({ insertMode: false }), hl = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true }), li = class extends D {
  constructor(e, i, r2) {
    super();
    this._bufferService = e;
    this._logService = i;
    this._optionsService = r2;
    this.isCursorInitialized = false;
    this.isCursorHidden = false;
    this._onData = this._register(new v$1());
    this.onData = this._onData.event;
    this._onUserInput = this._register(new v$1());
    this.onUserInput = this._onUserInput.event;
    this._onBinary = this._register(new v$1());
    this.onBinary = this._onBinary.event;
    this._onRequestScrollToBottom = this._register(new v$1());
    this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  reset() {
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  triggerDataEvent(e, i = false) {
    if (this._optionsService.rawOptions.disableStdin) return;
    let r2 = this._bufferService.buffer;
    i && this._optionsService.rawOptions.scrollOnUserInput && r2.ybase !== r2.ydisp && this._onRequestScrollToBottom.fire(), i && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`), this._logService.trace("sending data (codes)", () => e.split("").map((n2) => n2.charCodeAt(0))), this._onData.fire(e);
  }
  triggerBinaryEvent(e) {
    this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`), this._logService.trace("sending binary (codes)", () => e.split("").map((i) => i.charCodeAt(0))), this._onBinary.fire(e));
  }
};
li = M([S(0, F), S(1, nr), S(2, H)], li);
var dl = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (s15) => s15.button === 4 || s15.action !== 1 ? false : (s15.ctrl = false, s15.alt = false, s15.shift = false, true) }, VT200: { events: 19, restrict: (s15) => s15.action !== 32 }, DRAG: { events: 23, restrict: (s15) => !(s15.action === 32 && s15.button === 3) }, ANY: { events: 31, restrict: (s15) => true } };
function Ms(s15, t2) {
  let e = (s15.ctrl ? 16 : 0) | (s15.shift ? 4 : 0) | (s15.alt ? 8 : 0);
  return s15.button === 4 ? (e |= 64, e |= s15.action) : (e |= s15.button & 3, s15.button & 4 && (e |= 64), s15.button & 8 && (e |= 128), s15.action === 32 ? e |= 32 : s15.action === 0 && !t2 && (e |= 3)), e;
}
var Ps = String.fromCharCode, fl = { DEFAULT: (s15) => {
  let t2 = [Ms(s15, false) + 32, s15.col + 32, s15.row + 32];
  return t2[0] > 255 || t2[1] > 255 || t2[2] > 255 ? "" : `\x1B[M${Ps(t2[0])}${Ps(t2[1])}${Ps(t2[2])}`;
}, SGR: (s15) => {
  let t2 = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.col};${s15.row}${t2}`;
}, SGR_PIXELS: (s15) => {
  let t2 = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.x};${s15.y}${t2}`;
} }, ai = class extends D {
  constructor(e, i, r2) {
    super();
    this._bufferService = e;
    this._coreService = i;
    this._optionsService = r2;
    this._protocols = {};
    this._encodings = {};
    this._activeProtocol = "";
    this._activeEncoding = "";
    this._lastEvent = null;
    this._wheelPartialScroll = 0;
    this._onProtocolChange = this._register(new v$1());
    this.onProtocolChange = this._onProtocolChange.event;
    for (let n2 of Object.keys(dl)) this.addProtocol(n2, dl[n2]);
    for (let n2 of Object.keys(fl)) this.addEncoding(n2, fl[n2]);
    this.reset();
  }
  addProtocol(e, i) {
    this._protocols[e] = i;
  }
  addEncoding(e, i) {
    this._encodings[e] = i;
  }
  get activeProtocol() {
    return this._activeProtocol;
  }
  get areMouseEventsActive() {
    return this._protocols[this._activeProtocol].events !== 0;
  }
  set activeProtocol(e) {
    if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
    this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
  }
  get activeEncoding() {
    return this._activeEncoding;
  }
  set activeEncoding(e) {
    if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
    this._activeEncoding = e;
  }
  reset() {
    this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
  }
  consumeWheelEvent(e, i, r2) {
    if (e.deltaY === 0 || e.shiftKey || i === void 0 || r2 === void 0) return 0;
    let n2 = i / r2, o2 = this._applyScrollModifier(e.deltaY, e);
    return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (o2 /= n2 + 0, Math.abs(e.deltaY) < 50 && (o2 *= 0.3), this._wheelPartialScroll += o2, o2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (o2 *= this._bufferService.rows), o2;
  }
  _applyScrollModifier(e, i) {
    return i.altKey || i.ctrlKey || i.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
  }
  triggerMouseEvent(e) {
    if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows || e.button === 4 && e.action === 32 || e.button === 3 && e.action !== 32 || e.button !== 4 && (e.action === 2 || e.action === 3) || (e.col++, e.row++, e.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e)) return false;
    let i = this._encodings[this._activeEncoding](e);
    return i && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(i) : this._coreService.triggerDataEvent(i, true)), this._lastEvent = e, true;
  }
  explainEvents(e) {
    return { down: !!(e & 1), up: !!(e & 2), drag: !!(e & 4), move: !!(e & 8), wheel: !!(e & 16) };
  }
  _equalEvents(e, i, r2) {
    if (r2) {
      if (e.x !== i.x || e.y !== i.y) return false;
    } else if (e.col !== i.col || e.row !== i.row) return false;
    return !(e.button !== i.button || e.action !== i.action || e.ctrl !== i.ctrl || e.alt !== i.alt || e.shift !== i.shift);
  }
};
ai = M([S(0, F), S(1, ge), S(2, H)], ai);
var Os = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], ac = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]], se;
function cc(s15, t2) {
  let e = 0, i = t2.length - 1, r2;
  if (s15 < t2[0][0] || s15 > t2[i][1]) return false;
  for (; i >= e; ) if (r2 = e + i >> 1, s15 > t2[r2][1]) e = r2 + 1;
  else if (s15 < t2[r2][0]) i = r2 - 1;
  else return true;
  return false;
}
var fn = class {
  constructor() {
    this.version = "6";
    if (!se) {
      se = new Uint8Array(65536), se.fill(1), se[0] = 0, se.fill(0, 1, 32), se.fill(0, 127, 160), se.fill(2, 4352, 4448), se[9001] = 2, se[9002] = 2, se.fill(2, 11904, 42192), se[12351] = 1, se.fill(2, 44032, 55204), se.fill(2, 63744, 64256), se.fill(2, 65040, 65050), se.fill(2, 65072, 65136), se.fill(2, 65280, 65377), se.fill(2, 65504, 65511);
      for (let t2 = 0; t2 < Os.length; ++t2) se.fill(0, Os[t2][0], Os[t2][1] + 1);
    }
  }
  wcwidth(t2) {
    return t2 < 32 ? 0 : t2 < 127 ? 1 : t2 < 65536 ? se[t2] : cc(t2, ac) ? 0 : t2 >= 131072 && t2 <= 196605 || t2 >= 196608 && t2 <= 262141 ? 2 : 1;
  }
  charProperties(t2, e) {
    let i = this.wcwidth(t2), r2 = i === 0 && e !== 0;
    if (r2) {
      let n2 = Ae.extractWidth(e);
      n2 === 0 ? r2 = false : n2 > i && (i = n2);
    }
    return Ae.createPropertyValue(0, i, r2);
  }
};
var Ae = class s13 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new v$1();
    this.onChange = this._onChange.event;
    let t2 = new fn();
    this.register(t2), this._active = t2.version, this._activeProvider = t2;
  }
  static extractShouldJoin(t2) {
    return (t2 & 1) !== 0;
  }
  static extractWidth(t2) {
    return t2 >> 1 & 3;
  }
  static extractCharKind(t2) {
    return t2 >> 3;
  }
  static createPropertyValue(t2, e, i = false) {
    return (t2 & 16777215) << 3 | (e & 3) << 1 | (i ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(t2) {
    if (!this._providers[t2]) throw new Error(`unknown Unicode version "${t2}"`);
    this._active = t2, this._activeProvider = this._providers[t2], this._onChange.fire(t2);
  }
  register(t2) {
    this._providers[t2.version] = t2;
  }
  wcwidth(t2) {
    return this._activeProvider.wcwidth(t2);
  }
  getStringCellWidth(t2) {
    let e = 0, i = 0, r2 = t2.length;
    for (let n2 = 0; n2 < r2; ++n2) {
      let o2 = t2.charCodeAt(n2);
      if (55296 <= o2 && o2 <= 56319) {
        if (++n2 >= r2) return e + this.wcwidth(o2);
        let u2 = t2.charCodeAt(n2);
        56320 <= u2 && u2 <= 57343 ? o2 = (o2 - 55296) * 1024 + u2 - 56320 + 65536 : e += this.wcwidth(u2);
      }
      let l3 = this.charProperties(o2, i), a = s13.extractWidth(l3);
      s13.extractShouldJoin(l3) && (a -= s13.extractWidth(i)), e += a, i = l3;
    }
    return e;
  }
  charProperties(t2, e) {
    return this._activeProvider.charProperties(t2, e);
  }
};
var pn = class {
  constructor() {
    this.glevel = 0;
    this._charsets = [];
  }
  reset() {
    this.charset = void 0, this._charsets = [], this.glevel = 0;
  }
  setgLevel(t2) {
    this.glevel = t2, this.charset = this._charsets[t2];
  }
  setgCharset(t2, e) {
    this._charsets[t2] = e, this.glevel === t2 && (this.charset = e);
  }
};
function Bs(s15) {
  let e = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y - 1)?.get(s15.cols - 1), i = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y);
  i && e && (i.isWrapped = e[3] !== 0 && e[3] !== 32);
}
var Vi = 2147483647, uc = 256, ci = class s14 {
  constructor(t2 = 32, e = 32) {
    this.maxLength = t2;
    this.maxSubParamsLength = e;
    if (e > uc) throw new Error("maxSubParamsLength must not be greater than 256");
    this.params = new Int32Array(t2), this.length = 0, this._subParams = new Int32Array(e), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(t2), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  static fromArray(t2) {
    let e = new s14();
    if (!t2.length) return e;
    for (let i = Array.isArray(t2[0]) ? 1 : 0; i < t2.length; ++i) {
      let r2 = t2[i];
      if (Array.isArray(r2)) for (let n2 = 0; n2 < r2.length; ++n2) e.addSubParam(r2[n2]);
      else e.addParam(r2);
    }
    return e;
  }
  clone() {
    let t2 = new s14(this.maxLength, this.maxSubParamsLength);
    return t2.params.set(this.params), t2.length = this.length, t2._subParams.set(this._subParams), t2._subParamsLength = this._subParamsLength, t2._subParamsIdx.set(this._subParamsIdx), t2._rejectDigits = this._rejectDigits, t2._rejectSubDigits = this._rejectSubDigits, t2._digitIsSub = this._digitIsSub, t2;
  }
  toArray() {
    let t2 = [];
    for (let e = 0; e < this.length; ++e) {
      t2.push(this.params[e]);
      let i = this._subParamsIdx[e] >> 8, r2 = this._subParamsIdx[e] & 255;
      r2 - i > 0 && t2.push(Array.prototype.slice.call(this._subParams, i, r2));
    }
    return t2;
  }
  reset() {
    this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  addParam(t2) {
    if (this._digitIsSub = false, this.length >= this.maxLength) {
      this._rejectDigits = true;
      return;
    }
    if (t2 < -1) throw new Error("values lesser than -1 are not allowed");
    this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = t2 > Vi ? Vi : t2;
  }
  addSubParam(t2) {
    if (this._digitIsSub = true, !!this.length) {
      if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
        this._rejectSubDigits = true;
        return;
      }
      if (t2 < -1) throw new Error("values lesser than -1 are not allowed");
      this._subParams[this._subParamsLength++] = t2 > Vi ? Vi : t2, this._subParamsIdx[this.length - 1]++;
    }
  }
  hasSubParams(t2) {
    return (this._subParamsIdx[t2] & 255) - (this._subParamsIdx[t2] >> 8) > 0;
  }
  getSubParams(t2) {
    let e = this._subParamsIdx[t2] >> 8, i = this._subParamsIdx[t2] & 255;
    return i - e > 0 ? this._subParams.subarray(e, i) : null;
  }
  getSubParamsAll() {
    let t2 = {};
    for (let e = 0; e < this.length; ++e) {
      let i = this._subParamsIdx[e] >> 8, r2 = this._subParamsIdx[e] & 255;
      r2 - i > 0 && (t2[e] = this._subParams.slice(i, r2));
    }
    return t2;
  }
  addDigit(t2) {
    let e;
    if (this._rejectDigits || !(e = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
    let i = this._digitIsSub ? this._subParams : this.params, r2 = i[e - 1];
    i[e - 1] = ~r2 ? Math.min(r2 * 10 + t2, Vi) : t2;
  }
};
var qi = [], mn = class {
  constructor() {
    this._state = 0;
    this._active = qi;
    this._id = -1;
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  registerHandler(t2, e) {
    this._handlers[t2] === void 0 && (this._handlers[t2] = []);
    let i = this._handlers[t2];
    return i.push(e), { dispose: () => {
      let r2 = i.indexOf(e);
      r2 !== -1 && i.splice(r2, 1);
    } };
  }
  clearHandler(t2) {
    this._handlers[t2] && delete this._handlers[t2];
  }
  setHandlerFallback(t2) {
    this._handlerFb = t2;
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = qi;
  }
  reset() {
    if (this._state === 2) for (let t2 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t2 >= 0; --t2) this._active[t2].end(false);
    this._stack.paused = false, this._active = qi, this._id = -1, this._state = 0;
  }
  _start() {
    if (this._active = this._handlers[this._id] || qi, !this._active.length) this._handlerFb(this._id, "START");
    else for (let t2 = this._active.length - 1; t2 >= 0; t2--) this._active[t2].start();
  }
  _put(t2, e, i) {
    if (!this._active.length) this._handlerFb(this._id, "PUT", It(t2, e, i));
    else for (let r2 = this._active.length - 1; r2 >= 0; r2--) this._active[r2].put(t2, e, i);
  }
  start() {
    this.reset(), this._state = 1;
  }
  put(t2, e, i) {
    if (this._state !== 3) {
      if (this._state === 1) for (; e < i; ) {
        let r2 = t2[e++];
        if (r2 === 59) {
          this._state = 2, this._start();
          break;
        }
        if (r2 < 48 || 57 < r2) {
          this._state = 3;
          return;
        }
        this._id === -1 && (this._id = 0), this._id = this._id * 10 + r2 - 48;
      }
      this._state === 2 && i - e > 0 && this._put(t2, e, i);
    }
  }
  end(t2, e = true) {
    if (this._state !== 0) {
      if (this._state !== 3) if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", t2);
      else {
        let i = false, r2 = this._active.length - 1, n2 = false;
        if (this._stack.paused && (r2 = this._stack.loopPosition - 1, i = e, n2 = this._stack.fallThrough, this._stack.paused = false), !n2 && i === false) {
          for (; r2 >= 0 && (i = this._active[r2].end(t2), i !== true); r2--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r2, this._stack.fallThrough = false, i;
          r2--;
        }
        for (; r2 >= 0; r2--) if (i = this._active[r2].end(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r2, this._stack.fallThrough = true, i;
      }
      this._active = qi, this._id = -1, this._state = 0;
    }
  }
}, pe = class {
  constructor(t2) {
    this._handler = t2;
    this._data = "";
    this._hitLimit = false;
  }
  start() {
    this._data = "", this._hitLimit = false;
  }
  put(t2, e, i) {
    this._hitLimit || (this._data += It(t2, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  end(t2) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t2 && (e = this._handler(this._data), e instanceof Promise)) return e.then((i) => (this._data = "", this._hitLimit = false, i));
    return this._data = "", this._hitLimit = false, e;
  }
};
var Yi = [], _n = class {
  constructor() {
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._active = Yi;
    this._ident = 0;
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = Yi;
  }
  registerHandler(t2, e) {
    this._handlers[t2] === void 0 && (this._handlers[t2] = []);
    let i = this._handlers[t2];
    return i.push(e), { dispose: () => {
      let r2 = i.indexOf(e);
      r2 !== -1 && i.splice(r2, 1);
    } };
  }
  clearHandler(t2) {
    this._handlers[t2] && delete this._handlers[t2];
  }
  setHandlerFallback(t2) {
    this._handlerFb = t2;
  }
  reset() {
    if (this._active.length) for (let t2 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t2 >= 0; --t2) this._active[t2].unhook(false);
    this._stack.paused = false, this._active = Yi, this._ident = 0;
  }
  hook(t2, e) {
    if (this.reset(), this._ident = t2, this._active = this._handlers[t2] || Yi, !this._active.length) this._handlerFb(this._ident, "HOOK", e);
    else for (let i = this._active.length - 1; i >= 0; i--) this._active[i].hook(e);
  }
  put(t2, e, i) {
    if (!this._active.length) this._handlerFb(this._ident, "PUT", It(t2, e, i));
    else for (let r2 = this._active.length - 1; r2 >= 0; r2--) this._active[r2].put(t2, e, i);
  }
  unhook(t2, e = true) {
    if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", t2);
    else {
      let i = false, r2 = this._active.length - 1, n2 = false;
      if (this._stack.paused && (r2 = this._stack.loopPosition - 1, i = e, n2 = this._stack.fallThrough, this._stack.paused = false), !n2 && i === false) {
        for (; r2 >= 0 && (i = this._active[r2].unhook(t2), i !== true); r2--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r2, this._stack.fallThrough = false, i;
        r2--;
      }
      for (; r2 >= 0; r2--) if (i = this._active[r2].unhook(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r2, this._stack.fallThrough = true, i;
    }
    this._active = Yi, this._ident = 0;
  }
}, ji = new ci();
ji.addParam(0);
var Xi = class {
  constructor(t2) {
    this._handler = t2;
    this._data = "";
    this._params = ji;
    this._hitLimit = false;
  }
  hook(t2) {
    this._params = t2.length > 1 || t2.params[0] ? t2.clone() : ji, this._data = "", this._hitLimit = false;
  }
  put(t2, e, i) {
    this._hitLimit || (this._data += It(t2, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  unhook(t2) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t2 && (e = this._handler(this._data, this._params), e instanceof Promise)) return e.then((i) => (this._params = ji, this._data = "", this._hitLimit = false, i));
    return this._params = ji, this._data = "", this._hitLimit = false, e;
  }
};
var Fs = class {
  constructor(t2) {
    this.table = new Uint8Array(t2);
  }
  setDefault(t2, e) {
    this.table.fill(t2 << 4 | e);
  }
  add(t2, e, i, r2) {
    this.table[e << 8 | t2] = i << 4 | r2;
  }
  addMany(t2, e, i, r2) {
    for (let n2 = 0; n2 < t2.length; n2++) this.table[e << 8 | t2[n2]] = i << 4 | r2;
  }
}, ke = 160, hc = function() {
  let s15 = new Fs(4095), e = Array.apply(null, Array(256)).map((a, u2) => u2), i = (a, u2) => e.slice(a, u2), r2 = i(32, 127), n2 = i(0, 24);
  n2.push(25), n2.push.apply(n2, i(28, 32));
  let o2 = i(0, 14), l3;
  s15.setDefault(1, 0), s15.addMany(r2, 0, 2, 0);
  for (l3 in o2) s15.addMany([24, 26, 153, 154], l3, 3, 0), s15.addMany(i(128, 144), l3, 3, 0), s15.addMany(i(144, 152), l3, 3, 0), s15.add(156, l3, 0, 0), s15.add(27, l3, 11, 1), s15.add(157, l3, 4, 8), s15.addMany([152, 158, 159], l3, 0, 7), s15.add(155, l3, 11, 3), s15.add(144, l3, 11, 9);
  return s15.addMany(n2, 0, 3, 0), s15.addMany(n2, 1, 3, 1), s15.add(127, 1, 0, 1), s15.addMany(n2, 8, 0, 8), s15.addMany(n2, 3, 3, 3), s15.add(127, 3, 0, 3), s15.addMany(n2, 4, 3, 4), s15.add(127, 4, 0, 4), s15.addMany(n2, 6, 3, 6), s15.addMany(n2, 5, 3, 5), s15.add(127, 5, 0, 5), s15.addMany(n2, 2, 3, 2), s15.add(127, 2, 0, 2), s15.add(93, 1, 4, 8), s15.addMany(r2, 8, 5, 8), s15.add(127, 8, 5, 8), s15.addMany([156, 27, 24, 26, 7], 8, 6, 0), s15.addMany(i(28, 32), 8, 0, 8), s15.addMany([88, 94, 95], 1, 0, 7), s15.addMany(r2, 7, 0, 7), s15.addMany(n2, 7, 0, 7), s15.add(156, 7, 0, 0), s15.add(127, 7, 0, 7), s15.add(91, 1, 11, 3), s15.addMany(i(64, 127), 3, 7, 0), s15.addMany(i(48, 60), 3, 8, 4), s15.addMany([60, 61, 62, 63], 3, 9, 4), s15.addMany(i(48, 60), 4, 8, 4), s15.addMany(i(64, 127), 4, 7, 0), s15.addMany([60, 61, 62, 63], 4, 0, 6), s15.addMany(i(32, 64), 6, 0, 6), s15.add(127, 6, 0, 6), s15.addMany(i(64, 127), 6, 0, 0), s15.addMany(i(32, 48), 3, 9, 5), s15.addMany(i(32, 48), 5, 9, 5), s15.addMany(i(48, 64), 5, 0, 6), s15.addMany(i(64, 127), 5, 7, 0), s15.addMany(i(32, 48), 4, 9, 5), s15.addMany(i(32, 48), 1, 9, 2), s15.addMany(i(32, 48), 2, 9, 2), s15.addMany(i(48, 127), 2, 10, 0), s15.addMany(i(48, 80), 1, 10, 0), s15.addMany(i(81, 88), 1, 10, 0), s15.addMany([89, 90, 92], 1, 10, 0), s15.addMany(i(96, 127), 1, 10, 0), s15.add(80, 1, 11, 9), s15.addMany(n2, 9, 0, 9), s15.add(127, 9, 0, 9), s15.addMany(i(28, 32), 9, 0, 9), s15.addMany(i(32, 48), 9, 9, 12), s15.addMany(i(48, 60), 9, 8, 10), s15.addMany([60, 61, 62, 63], 9, 9, 10), s15.addMany(n2, 11, 0, 11), s15.addMany(i(32, 128), 11, 0, 11), s15.addMany(i(28, 32), 11, 0, 11), s15.addMany(n2, 10, 0, 10), s15.add(127, 10, 0, 10), s15.addMany(i(28, 32), 10, 0, 10), s15.addMany(i(48, 60), 10, 8, 10), s15.addMany([60, 61, 62, 63], 10, 0, 11), s15.addMany(i(32, 48), 10, 9, 12), s15.addMany(n2, 12, 0, 12), s15.add(127, 12, 0, 12), s15.addMany(i(28, 32), 12, 0, 12), s15.addMany(i(32, 48), 12, 9, 12), s15.addMany(i(48, 64), 12, 0, 11), s15.addMany(i(64, 127), 12, 12, 13), s15.addMany(i(64, 127), 10, 12, 13), s15.addMany(i(64, 127), 9, 12, 13), s15.addMany(n2, 13, 13, 13), s15.addMany(r2, 13, 13, 13), s15.add(127, 13, 0, 13), s15.addMany([27, 156, 24, 26], 13, 14, 0), s15.add(ke, 0, 2, 0), s15.add(ke, 8, 5, 8), s15.add(ke, 6, 0, 6), s15.add(ke, 11, 0, 11), s15.add(ke, 13, 13, 13), s15;
}(), bn = class extends D {
  constructor(e = hc) {
    super();
    this._transitions = e;
    this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 };
    this.initialState = 0, this.currentState = this.initialState, this._params = new ci(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (i, r2, n2) => {
    }, this._executeHandlerFb = (i) => {
    }, this._csiHandlerFb = (i, r2) => {
    }, this._escHandlerFb = (i) => {
    }, this._errorHandlerFb = (i) => i, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register(C(() => {
      this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
    })), this._oscParser = this._register(new mn()), this._dcsParser = this._register(new _n()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
  }
  _identifier(e, i = [64, 126]) {
    let r2 = 0;
    if (e.prefix) {
      if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
      if (r2 = e.prefix.charCodeAt(0), r2 && 60 > r2 || r2 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
    }
    if (e.intermediates) {
      if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
      for (let o2 = 0; o2 < e.intermediates.length; ++o2) {
        let l3 = e.intermediates.charCodeAt(o2);
        if (32 > l3 || l3 > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
        r2 <<= 8, r2 |= l3;
      }
    }
    if (e.final.length !== 1) throw new Error("final must be a single byte");
    let n2 = e.final.charCodeAt(0);
    if (i[0] > n2 || n2 > i[1]) throw new Error(`final must be in range ${i[0]} .. ${i[1]}`);
    return r2 <<= 8, r2 |= n2, r2;
  }
  identToString(e) {
    let i = [];
    for (; e; ) i.push(String.fromCharCode(e & 255)), e >>= 8;
    return i.reverse().join("");
  }
  setPrintHandler(e) {
    this._printHandler = e;
  }
  clearPrintHandler() {
    this._printHandler = this._printHandlerFb;
  }
  registerEscHandler(e, i) {
    let r2 = this._identifier(e, [48, 126]);
    this._escHandlers[r2] === void 0 && (this._escHandlers[r2] = []);
    let n2 = this._escHandlers[r2];
    return n2.push(i), { dispose: () => {
      let o2 = n2.indexOf(i);
      o2 !== -1 && n2.splice(o2, 1);
    } };
  }
  clearEscHandler(e) {
    this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
  }
  setEscHandlerFallback(e) {
    this._escHandlerFb = e;
  }
  setExecuteHandler(e, i) {
    this._executeHandlers[e.charCodeAt(0)] = i;
  }
  clearExecuteHandler(e) {
    this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
  }
  setExecuteHandlerFallback(e) {
    this._executeHandlerFb = e;
  }
  registerCsiHandler(e, i) {
    let r2 = this._identifier(e);
    this._csiHandlers[r2] === void 0 && (this._csiHandlers[r2] = []);
    let n2 = this._csiHandlers[r2];
    return n2.push(i), { dispose: () => {
      let o2 = n2.indexOf(i);
      o2 !== -1 && n2.splice(o2, 1);
    } };
  }
  clearCsiHandler(e) {
    this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
  }
  setCsiHandlerFallback(e) {
    this._csiHandlerFb = e;
  }
  registerDcsHandler(e, i) {
    return this._dcsParser.registerHandler(this._identifier(e), i);
  }
  clearDcsHandler(e) {
    this._dcsParser.clearHandler(this._identifier(e));
  }
  setDcsHandlerFallback(e) {
    this._dcsParser.setHandlerFallback(e);
  }
  registerOscHandler(e, i) {
    return this._oscParser.registerHandler(e, i);
  }
  clearOscHandler(e) {
    this._oscParser.clearHandler(e);
  }
  setOscHandlerFallback(e) {
    this._oscParser.setHandlerFallback(e);
  }
  setErrorHandler(e) {
    this._errorHandler = e;
  }
  clearErrorHandler() {
    this._errorHandler = this._errorHandlerFb;
  }
  reset() {
    this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
  }
  _preserveStack(e, i, r2, n2, o2) {
    this._parseStack.state = e, this._parseStack.handlers = i, this._parseStack.handlerPos = r2, this._parseStack.transition = n2, this._parseStack.chunkPos = o2;
  }
  parse(e, i, r2) {
    let n2 = 0, o2 = 0, l3 = 0, a;
    if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, l3 = this._parseStack.chunkPos + 1;
    else {
      if (r2 === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
      let u2 = this._parseStack.handlers, h2 = this._parseStack.handlerPos - 1;
      switch (this._parseStack.state) {
        case 3:
          if (r2 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u2[h2](this._params), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 4:
          if (r2 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u2[h2](), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 6:
          if (n2 = e[this._parseStack.chunkPos], a = this._dcsParser.unhook(n2 !== 24 && n2 !== 26, r2), a) return a;
          n2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 5:
          if (n2 = e[this._parseStack.chunkPos], a = this._oscParser.end(n2 !== 24 && n2 !== 26, r2), a) return a;
          n2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
      }
      this._parseStack.state = 0, l3 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
    }
    for (let u2 = l3; u2 < i; ++u2) {
      switch (n2 = e[u2], o2 = this._transitions.table[this.currentState << 8 | (n2 < 160 ? n2 : ke)], o2 >> 4) {
        case 2:
          for (let m2 = u2 + 1; ; ++m2) {
            if (m2 >= i || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
          }
          break;
        case 3:
          this._executeHandlers[n2] ? this._executeHandlers[n2]() : this._executeHandlerFb(n2), this.precedingJoinState = 0;
          break;
        case 0:
          break;
        case 1:
          if (this._errorHandler({ position: u2, code: n2, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
          break;
        case 7:
          let c = this._csiHandlers[this._collect << 8 | n2], d = c ? c.length - 1 : -1;
          for (; d >= 0 && (a = c[d](this._params), a !== true); d--) if (a instanceof Promise) return this._preserveStack(3, c, d, o2, u2), a;
          d < 0 && this._csiHandlerFb(this._collect << 8 | n2, this._params), this.precedingJoinState = 0;
          break;
        case 8:
          do
            switch (n2) {
              case 59:
                this._params.addParam(0);
                break;
              case 58:
                this._params.addSubParam(-1);
                break;
              default:
                this._params.addDigit(n2 - 48);
            }
          while (++u2 < i && (n2 = e[u2]) > 47 && n2 < 60);
          u2--;
          break;
        case 9:
          this._collect <<= 8, this._collect |= n2;
          break;
        case 10:
          let _2 = this._escHandlers[this._collect << 8 | n2], p2 = _2 ? _2.length - 1 : -1;
          for (; p2 >= 0 && (a = _2[p2](), a !== true); p2--) if (a instanceof Promise) return this._preserveStack(4, _2, p2, o2, u2), a;
          p2 < 0 && this._escHandlerFb(this._collect << 8 | n2), this.precedingJoinState = 0;
          break;
        case 11:
          this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 12:
          this._dcsParser.hook(this._collect << 8 | n2, this._params);
          break;
        case 13:
          for (let m2 = u2 + 1; ; ++m2) if (m2 >= i || (n2 = e[m2]) === 24 || n2 === 26 || n2 === 27 || n2 > 127 && n2 < ke) {
            this._dcsParser.put(e, u2, m2), u2 = m2 - 1;
            break;
          }
          break;
        case 14:
          if (a = this._dcsParser.unhook(n2 !== 24 && n2 !== 26), a) return this._preserveStack(6, [], 0, o2, u2), a;
          n2 === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
        case 4:
          this._oscParser.start();
          break;
        case 5:
          for (let m2 = u2 + 1; ; m2++) if (m2 >= i || (n2 = e[m2]) < 32 || n2 > 127 && n2 < ke) {
            this._oscParser.put(e, u2, m2), u2 = m2 - 1;
            break;
          }
          break;
        case 6:
          if (a = this._oscParser.end(n2 !== 24 && n2 !== 26), a) return this._preserveStack(5, [], 0, o2, u2), a;
          n2 === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
      }
      this.currentState = o2 & 15;
    }
  }
};
var dc = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, fc = /^[\da-f]+$/;
function Ws(s15) {
  if (!s15) return;
  let t2 = s15.toLowerCase();
  if (t2.indexOf("rgb:") === 0) {
    t2 = t2.slice(4);
    let e = dc.exec(t2);
    if (e) {
      let i = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
      return [Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / i * 255), Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / i * 255), Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / i * 255)];
    }
  } else if (t2.indexOf("#") === 0 && (t2 = t2.slice(1), fc.exec(t2) && [3, 6, 9, 12].includes(t2.length))) {
    let e = t2.length / 3, i = [0, 0, 0];
    for (let r2 = 0; r2 < 3; ++r2) {
      let n2 = parseInt(t2.slice(e * r2, e * r2 + e), 16);
      i[r2] = e === 1 ? n2 << 4 : e === 2 ? n2 : e === 3 ? n2 >> 4 : n2 >> 8;
    }
    return i;
  }
}
function Hs(s15, t2) {
  let e = s15.toString(16), i = e.length < 2 ? "0" + e : e;
  switch (t2) {
    case 4:
      return e[0];
    case 8:
      return i;
    case 12:
      return (i + i).slice(0, 3);
    default:
      return i + i;
  }
}
function ml(s15, t2 = 16) {
  let [e, i, r2] = s15;
  return `rgb:${Hs(e, t2)}/${Hs(i, t2)}/${Hs(r2, t2)}`;
}
var mc = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, ut = 131072, _l = 10;
function bl(s15, t2) {
  if (s15 > 24) return t2.setWinLines || false;
  switch (s15) {
    case 1:
      return !!t2.restoreWin;
    case 2:
      return !!t2.minimizeWin;
    case 3:
      return !!t2.setWinPosition;
    case 4:
      return !!t2.setWinSizePixels;
    case 5:
      return !!t2.raiseWin;
    case 6:
      return !!t2.lowerWin;
    case 7:
      return !!t2.refreshWin;
    case 8:
      return !!t2.setWinSizeChars;
    case 9:
      return !!t2.maximizeWin;
    case 10:
      return !!t2.fullscreenWin;
    case 11:
      return !!t2.getWinState;
    case 13:
      return !!t2.getWinPosition;
    case 14:
      return !!t2.getWinSizePixels;
    case 15:
      return !!t2.getScreenSizePixels;
    case 16:
      return !!t2.getCellSizePixels;
    case 18:
      return !!t2.getWinSizeChars;
    case 19:
      return !!t2.getScreenSizeChars;
    case 20:
      return !!t2.getIconTitle;
    case 21:
      return !!t2.getWinTitle;
    case 22:
      return !!t2.pushTitle;
    case 23:
      return !!t2.popTitle;
    case 24:
      return !!t2.setWinLines;
  }
  return false;
}
var vl = 5e3, gl = 0, vn = class extends D {
  constructor(e, i, r2, n2, o2, l3, a, u2, h2 = new bn()) {
    super();
    this._bufferService = e;
    this._charsetService = i;
    this._coreService = r2;
    this._logService = n2;
    this._optionsService = o2;
    this._oscLinkService = l3;
    this._coreMouseService = a;
    this._unicodeService = u2;
    this._parser = h2;
    this._parseBuffer = new Uint32Array(4096);
    this._stringDecoder = new er();
    this._utf8Decoder = new tr();
    this._windowTitle = "";
    this._iconName = "";
    this._windowTitleStack = [];
    this._iconNameStack = [];
    this._curAttrData = X.clone();
    this._eraseAttrDataInternal = X.clone();
    this._onRequestBell = this._register(new v$1());
    this.onRequestBell = this._onRequestBell.event;
    this._onRequestRefreshRows = this._register(new v$1());
    this.onRequestRefreshRows = this._onRequestRefreshRows.event;
    this._onRequestReset = this._register(new v$1());
    this.onRequestReset = this._onRequestReset.event;
    this._onRequestSendFocus = this._register(new v$1());
    this.onRequestSendFocus = this._onRequestSendFocus.event;
    this._onRequestSyncScrollBar = this._register(new v$1());
    this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
    this._onRequestWindowsOptionsReport = this._register(new v$1());
    this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
    this._onA11yChar = this._register(new v$1());
    this.onA11yChar = this._onA11yChar.event;
    this._onA11yTab = this._register(new v$1());
    this.onA11yTab = this._onA11yTab.event;
    this._onCursorMove = this._register(new v$1());
    this.onCursorMove = this._onCursorMove.event;
    this._onLineFeed = this._register(new v$1());
    this.onLineFeed = this._onLineFeed.event;
    this._onScroll = this._register(new v$1());
    this.onScroll = this._onScroll.event;
    this._onTitleChange = this._register(new v$1());
    this.onTitleChange = this._onTitleChange.event;
    this._onColor = this._register(new v$1());
    this.onColor = this._onColor.event;
    this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 };
    this._specialColors = [256, 257, 258];
    this._register(this._parser), this._dirtyRowTracker = new Zi(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((c) => this._activeBuffer = c.activeBuffer)), this._parser.setCsiHandlerFallback((c, d) => {
      this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(c), params: d.toArray() });
    }), this._parser.setEscHandlerFallback((c) => {
      this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(c) });
    }), this._parser.setExecuteHandlerFallback((c) => {
      this._logService.debug("Unknown EXECUTE code: ", { code: c });
    }), this._parser.setOscHandlerFallback((c, d, _2) => {
      this._logService.debug("Unknown OSC code: ", { identifier: c, action: d, data: _2 });
    }), this._parser.setDcsHandlerFallback((c, d, _2) => {
      d === "HOOK" && (_2 = _2.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(c), action: d, payload: _2 });
    }), this._parser.setPrintHandler((c, d, _2) => this.print(c, d, _2)), this._parser.registerCsiHandler({ final: "@" }, (c) => this.insertChars(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (c) => this.scrollLeft(c)), this._parser.registerCsiHandler({ final: "A" }, (c) => this.cursorUp(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (c) => this.scrollRight(c)), this._parser.registerCsiHandler({ final: "B" }, (c) => this.cursorDown(c)), this._parser.registerCsiHandler({ final: "C" }, (c) => this.cursorForward(c)), this._parser.registerCsiHandler({ final: "D" }, (c) => this.cursorBackward(c)), this._parser.registerCsiHandler({ final: "E" }, (c) => this.cursorNextLine(c)), this._parser.registerCsiHandler({ final: "F" }, (c) => this.cursorPrecedingLine(c)), this._parser.registerCsiHandler({ final: "G" }, (c) => this.cursorCharAbsolute(c)), this._parser.registerCsiHandler({ final: "H" }, (c) => this.cursorPosition(c)), this._parser.registerCsiHandler({ final: "I" }, (c) => this.cursorForwardTab(c)), this._parser.registerCsiHandler({ final: "J" }, (c) => this.eraseInDisplay(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (c) => this.eraseInDisplay(c, true)), this._parser.registerCsiHandler({ final: "K" }, (c) => this.eraseInLine(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (c) => this.eraseInLine(c, true)), this._parser.registerCsiHandler({ final: "L" }, (c) => this.insertLines(c)), this._parser.registerCsiHandler({ final: "M" }, (c) => this.deleteLines(c)), this._parser.registerCsiHandler({ final: "P" }, (c) => this.deleteChars(c)), this._parser.registerCsiHandler({ final: "S" }, (c) => this.scrollUp(c)), this._parser.registerCsiHandler({ final: "T" }, (c) => this.scrollDown(c)), this._parser.registerCsiHandler({ final: "X" }, (c) => this.eraseChars(c)), this._parser.registerCsiHandler({ final: "Z" }, (c) => this.cursorBackwardTab(c)), this._parser.registerCsiHandler({ final: "`" }, (c) => this.charPosAbsolute(c)), this._parser.registerCsiHandler({ final: "a" }, (c) => this.hPositionRelative(c)), this._parser.registerCsiHandler({ final: "b" }, (c) => this.repeatPrecedingCharacter(c)), this._parser.registerCsiHandler({ final: "c" }, (c) => this.sendDeviceAttributesPrimary(c)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (c) => this.sendDeviceAttributesSecondary(c)), this._parser.registerCsiHandler({ final: "d" }, (c) => this.linePosAbsolute(c)), this._parser.registerCsiHandler({ final: "e" }, (c) => this.vPositionRelative(c)), this._parser.registerCsiHandler({ final: "f" }, (c) => this.hVPosition(c)), this._parser.registerCsiHandler({ final: "g" }, (c) => this.tabClear(c)), this._parser.registerCsiHandler({ final: "h" }, (c) => this.setMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (c) => this.setModePrivate(c)), this._parser.registerCsiHandler({ final: "l" }, (c) => this.resetMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (c) => this.resetModePrivate(c)), this._parser.registerCsiHandler({ final: "m" }, (c) => this.charAttributes(c)), this._parser.registerCsiHandler({ final: "n" }, (c) => this.deviceStatus(c)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (c) => this.deviceStatusPrivate(c)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (c) => this.softReset(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (c) => this.setCursorStyle(c)), this._parser.registerCsiHandler({ final: "r" }, (c) => this.setScrollRegion(c)), this._parser.registerCsiHandler({ final: "s" }, (c) => this.saveCursor(c)), this._parser.registerCsiHandler({ final: "t" }, (c) => this.windowOptions(c)), this._parser.registerCsiHandler({ final: "u" }, (c) => this.restoreCursor(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (c) => this.insertColumns(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (c) => this.deleteColumns(c)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (c) => this.selectProtected(c)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (c) => this.requestMode(c, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (c) => this.requestMode(c, false)), this._parser.setExecuteHandler(b.BEL, () => this.bell()), this._parser.setExecuteHandler(b.LF, () => this.lineFeed()), this._parser.setExecuteHandler(b.VT, () => this.lineFeed()), this._parser.setExecuteHandler(b.FF, () => this.lineFeed()), this._parser.setExecuteHandler(b.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(b.BS, () => this.backspace()), this._parser.setExecuteHandler(b.HT, () => this.tab()), this._parser.setExecuteHandler(b.SO, () => this.shiftOut()), this._parser.setExecuteHandler(b.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Ai.IND, () => this.index()), this._parser.setExecuteHandler(Ai.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Ai.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new pe((c) => (this.setTitle(c), this.setIconName(c), true))), this._parser.registerOscHandler(1, new pe((c) => this.setIconName(c))), this._parser.registerOscHandler(2, new pe((c) => this.setTitle(c))), this._parser.registerOscHandler(4, new pe((c) => this.setOrReportIndexedColor(c))), this._parser.registerOscHandler(8, new pe((c) => this.setHyperlink(c))), this._parser.registerOscHandler(10, new pe((c) => this.setOrReportFgColor(c))), this._parser.registerOscHandler(11, new pe((c) => this.setOrReportBgColor(c))), this._parser.registerOscHandler(12, new pe((c) => this.setOrReportCursorColor(c))), this._parser.registerOscHandler(104, new pe((c) => this.restoreIndexedColor(c))), this._parser.registerOscHandler(110, new pe((c) => this.restoreFgColor(c))), this._parser.registerOscHandler(111, new pe((c) => this.restoreBgColor(c))), this._parser.registerOscHandler(112, new pe((c) => this.restoreCursorColor(c))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
    for (let c in ne) this._parser.registerEscHandler({ intermediates: "(", final: c }, () => this.selectCharset("(" + c)), this._parser.registerEscHandler({ intermediates: ")", final: c }, () => this.selectCharset(")" + c)), this._parser.registerEscHandler({ intermediates: "*", final: c }, () => this.selectCharset("*" + c)), this._parser.registerEscHandler({ intermediates: "+", final: c }, () => this.selectCharset("+" + c)), this._parser.registerEscHandler({ intermediates: "-", final: c }, () => this.selectCharset("-" + c)), this._parser.registerEscHandler({ intermediates: ".", final: c }, () => this.selectCharset("." + c)), this._parser.registerEscHandler({ intermediates: "/", final: c }, () => this.selectCharset("/" + c));
    this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((c) => (this._logService.error("Parsing error: ", c), c)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new Xi((c, d) => this.requestStatusString(c, d)));
  }
  getAttrData() {
    return this._curAttrData;
  }
  _preserveStack(e, i, r2, n2) {
    this._parseStack.paused = true, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = i, this._parseStack.decodedLength = r2, this._parseStack.position = n2;
  }
  _logSlowResolvingAsync(e) {
    this._logService.logLevel <= 3 && Promise.race([e, new Promise((i, r2) => setTimeout(() => r2("#SLOW_TIMEOUT"), vl))]).catch((i) => {
      if (i !== "#SLOW_TIMEOUT") throw i;
      console.warn(`async parser handler taking longer than ${vl} ms`);
    });
  }
  _getCurrentLinkId() {
    return this._curAttrData.extended.urlId;
  }
  parse(e, i) {
    let r2, n2 = this._activeBuffer.x, o2 = this._activeBuffer.y, l3 = 0, a = this._parseStack.paused;
    if (a) {
      if (r2 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, i)) return this._logSlowResolvingAsync(r2), r2;
      n2 = this._parseStack.cursorStartX, o2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e.length > ut && (l3 = this._parseStack.position + ut);
    }
    if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e == "string" ? ` "${e}"` : ` "${Array.prototype.map.call(e, (c) => String.fromCharCode(c)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e == "string" ? e.split("").map((c) => c.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < ut && (this._parseBuffer = new Uint32Array(Math.min(e.length, ut))), a || this._dirtyRowTracker.clearRange(), e.length > ut) for (let c = l3; c < e.length; c += ut) {
      let d = c + ut < e.length ? c + ut : e.length, _2 = typeof e == "string" ? this._stringDecoder.decode(e.substring(c, d), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(c, d), this._parseBuffer);
      if (r2 = this._parser.parse(this._parseBuffer, _2)) return this._preserveStack(n2, o2, _2, c), this._logSlowResolvingAsync(r2), r2;
    }
    else if (!a) {
      let c = typeof e == "string" ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
      if (r2 = this._parser.parse(this._parseBuffer, c)) return this._preserveStack(n2, o2, c, 0), this._logSlowResolvingAsync(r2), r2;
    }
    (this._activeBuffer.x !== n2 || this._activeBuffer.y !== o2) && this._onCursorMove.fire();
    let u2 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    h2 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(h2, this._bufferService.rows - 1), end: Math.min(u2, this._bufferService.rows - 1) });
  }
  print(e, i, r2) {
    let n2, o2, l3 = this._charsetService.charset, a = this._optionsService.rawOptions.screenReaderMode, u2 = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, c = this._coreService.modes.insertMode, d = this._curAttrData, _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && r2 - i > 0 && _2.getWidth(this._activeBuffer.x - 1) === 2 && _2.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, d);
    let p2 = this._parser.precedingJoinState;
    for (let m2 = i; m2 < r2; ++m2) {
      if (n2 = e[m2], n2 < 127 && l3) {
        let O2 = l3[String.fromCharCode(n2)];
        O2 && (n2 = O2.charCodeAt(0));
      }
      let f2 = this._unicodeService.charProperties(n2, p2);
      o2 = Ae.extractWidth(f2);
      let A2 = Ae.extractShouldJoin(f2), R2 = A2 ? Ae.extractWidth(p2) : 0;
      if (p2 = f2, a && this._onA11yChar.fire(Ce(n2)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + o2 - R2 > u2) {
        if (h2) {
          let O2 = _2, I2 = this._activeBuffer.x - R2;
          for (this._activeBuffer.x = R2, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), R2 > 0 && _2 instanceof Ze && _2.copyCellsFrom(O2, I2, 0, R2, false); I2 < u2; ) O2.setCellFromCodepoint(I2++, 0, 1, d);
        } else if (this._activeBuffer.x = u2 - 1, o2 === 2) continue;
      }
      if (A2 && this._activeBuffer.x) {
        let O2 = _2.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
        _2.addCodepointToCell(this._activeBuffer.x - O2, n2, o2);
        for (let I2 = o2 - R2; --I2 >= 0; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
        continue;
      }
      if (c && (_2.insertCells(this._activeBuffer.x, o2 - R2, this._activeBuffer.getNullCell(d)), _2.getWidth(u2 - 1) === 2 && _2.setCellFromCodepoint(u2 - 1, 0, 1, d)), _2.setCellFromCodepoint(this._activeBuffer.x++, n2, o2, d), o2 > 0) for (; --o2; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
    }
    this._parser.precedingJoinState = p2, this._activeBuffer.x < u2 && r2 - i > 0 && _2.getWidth(this._activeBuffer.x) === 0 && !_2.hasContent(this._activeBuffer.x) && _2.setCellFromCodepoint(this._activeBuffer.x, 0, 1, d), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  registerCsiHandler(e, i) {
    return e.final === "t" && !e.prefix && !e.intermediates ? this._parser.registerCsiHandler(e, (r2) => bl(r2.params[0], this._optionsService.rawOptions.windowOptions) ? i(r2) : true) : this._parser.registerCsiHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._parser.registerDcsHandler(e, new Xi(i));
  }
  registerEscHandler(e, i) {
    return this._parser.registerEscHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._parser.registerOscHandler(e, new pe(i));
  }
  bell() {
    return this._onRequestBell.fire(), true;
  }
  lineFeed() {
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
  }
  carriageReturn() {
    return this._activeBuffer.x = 0, true;
  }
  backspace() {
    if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
    if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
    else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
      this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
      let e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
      e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
    }
    return this._restrictCursor(), true;
  }
  tab() {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let e = this._activeBuffer.x;
    return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), true;
  }
  shiftOut() {
    return this._charsetService.setgLevel(1), true;
  }
  shiftIn() {
    return this._charsetService.setgLevel(0), true;
  }
  _restrictCursor(e = this._bufferService.cols - 1) {
    this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _setCursor(e, i) {
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + i) : (this._activeBuffer.x = e, this._activeBuffer.y = i), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _moveCursor(e, i) {
    this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + i);
  }
  cursorUp(e) {
    let i = this._activeBuffer.y - this._activeBuffer.scrollTop;
    return i >= 0 ? this._moveCursor(0, -Math.min(i, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), true;
  }
  cursorDown(e) {
    let i = this._activeBuffer.scrollBottom - this._activeBuffer.y;
    return i >= 0 ? this._moveCursor(0, Math.min(i, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), true;
  }
  cursorForward(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  cursorBackward(e) {
    return this._moveCursor(-(e.params[0] || 1), 0), true;
  }
  cursorNextLine(e) {
    return this.cursorDown(e), this._activeBuffer.x = 0, true;
  }
  cursorPrecedingLine(e) {
    return this.cursorUp(e), this._activeBuffer.x = 0, true;
  }
  cursorCharAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  cursorPosition(e) {
    return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), true;
  }
  charPosAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  hPositionRelative(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  linePosAbsolute(e) {
    return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), true;
  }
  vPositionRelative(e) {
    return this._moveCursor(0, e.params[0] || 1), true;
  }
  hVPosition(e) {
    return this.cursorPosition(e), true;
  }
  tabClear(e) {
    let i = e.params[0];
    return i === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : i === 3 && (this._activeBuffer.tabs = {}), true;
  }
  cursorForwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
    return true;
  }
  cursorBackwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
    return true;
  }
  selectProtected(e) {
    let i = e.params[0];
    return i === 1 && (this._curAttrData.bg |= 536870912), (i === 2 || i === 0) && (this._curAttrData.bg &= -536870913), true;
  }
  _eraseInBufferLine(e, i, r2, n2 = false, o2 = false) {
    let l3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    l3.replaceCells(i, r2, this._activeBuffer.getNullCell(this._eraseAttrData()), o2), n2 && (l3.isWrapped = false);
  }
  _resetBufferLine(e, i = false) {
    let r2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    r2 && (r2.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), i), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), r2.isWrapped = false);
  }
  eraseInDisplay(e, i = false) {
    this._restrictCursor(this._bufferService.cols);
    let r2;
    switch (e.params[0]) {
      case 0:
        for (r2 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r2), this._eraseInBufferLine(r2++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i); r2 < this._bufferService.rows; r2++) this._resetBufferLine(r2, i);
        this._dirtyRowTracker.markDirty(r2);
        break;
      case 1:
        for (r2 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r2), this._eraseInBufferLine(r2, 0, this._activeBuffer.x + 1, true, i), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(r2 + 1).isWrapped = false); r2--; ) this._resetBufferLine(r2, i);
        this._dirtyRowTracker.markDirty(0);
        break;
      case 2:
        if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
          for (r2 = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, r2 - 1); r2-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + r2)?.getTrimmedLength(); ) ;
          for (; r2 >= 0; r2--) this._bufferService.scroll(this._eraseAttrData());
        } else {
          for (r2 = this._bufferService.rows, this._dirtyRowTracker.markDirty(r2 - 1); r2--; ) this._resetBufferLine(r2, i);
          this._dirtyRowTracker.markDirty(0);
        }
        break;
      case 3:
        let n2 = this._activeBuffer.lines.length - this._bufferService.rows;
        n2 > 0 && (this._activeBuffer.lines.trimStart(n2), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - n2, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - n2, 0), this._onScroll.fire(0));
        break;
    }
    return true;
  }
  eraseInLine(e, i = false) {
    switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
      case 0:
        this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i);
        break;
      case 1:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, i);
        break;
      case 2:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, i);
        break;
    }
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
  }
  insertLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r2 = this._activeBuffer.ybase + this._activeBuffer.y, n2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, o2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n2 + 1;
    for (; i--; ) this._activeBuffer.lines.splice(o2 - 1, 1), this._activeBuffer.lines.splice(r2, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  deleteLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r2 = this._activeBuffer.ybase + this._activeBuffer.y, n2;
    for (n2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, n2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n2; i--; ) this._activeBuffer.lines.splice(r2, 1), this._activeBuffer.lines.splice(n2, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  insertChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  deleteChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  scrollUp(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollDown(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(X));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollLeft(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r2 = this._activeBuffer.scrollTop; r2 <= this._activeBuffer.scrollBottom; ++r2) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r2);
      n2.deleteCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollRight(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r2 = this._activeBuffer.scrollTop; r2 <= this._activeBuffer.scrollBottom; ++r2) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r2);
      n2.insertCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  insertColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r2 = this._activeBuffer.scrollTop; r2 <= this._activeBuffer.scrollBottom; ++r2) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r2);
      n2.insertCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  deleteColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r2 = this._activeBuffer.scrollTop; r2 <= this._activeBuffer.scrollBottom; ++r2) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r2);
      n2.deleteCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  eraseChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  repeatPrecedingCharacter(e) {
    let i = this._parser.precedingJoinState;
    if (!i) return true;
    let r2 = e.params[0] || 1, n2 = Ae.extractWidth(i), o2 = this._activeBuffer.x - n2, a = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(o2), u2 = new Uint32Array(a.length * r2), h2 = 0;
    for (let d = 0; d < a.length; ) {
      let _2 = a.codePointAt(d) || 0;
      u2[h2++] = _2, d += _2 > 65535 ? 2 : 1;
    }
    let c = h2;
    for (let d = 1; d < r2; ++d) u2.copyWithin(c, 0, h2), c += h2;
    return this.print(u2, 0, c), true;
  }
  sendDeviceAttributesPrimary(e) {
    return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(b.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(b.ESC + "[?6c")), true;
  }
  sendDeviceAttributesSecondary(e) {
    return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(b.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(b.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(b.ESC + "[>83;40003;0c")), true;
  }
  _is(e) {
    return (this._optionsService.rawOptions.termName + "").indexOf(e) === 0;
  }
  setMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = true;
        break;
      case 20:
        this._optionsService.options.convertEol = true;
        break;
    }
    return true;
  }
  setModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = true;
        break;
      case 2:
        this._charsetService.setgCharset(0, Je), this._charsetService.setgCharset(1, Je), this._charsetService.setgCharset(2, Je), this._charsetService.setgCharset(3, Je);
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = true;
        break;
      case 12:
        this._optionsService.options.cursorBlink = true;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = true;
        break;
      case 66:
        this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
        this._coreMouseService.activeProtocol = "X10";
        break;
      case 1e3:
        this._coreMouseService.activeProtocol = "VT200";
        break;
      case 1002:
        this._coreMouseService.activeProtocol = "DRAG";
        break;
      case 1003:
        this._coreMouseService.activeProtocol = "ANY";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
        break;
      case 1005:
        this._logService.debug("DECSET 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "SGR";
        break;
      case 1015:
        this._logService.debug("DECSET 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "SGR_PIXELS";
        break;
      case 25:
        this._coreService.isCursorHidden = false;
        break;
      case 1048:
        this.saveCursor();
        break;
      case 1049:
        this.saveCursor();
      case 47:
      case 1047:
        this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = true;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = true;
        break;
    }
    return true;
  }
  resetMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = false;
        break;
      case 20:
        this._optionsService.options.convertEol = false;
        break;
    }
    return true;
  }
  resetModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = false;
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = false;
        break;
      case 12:
        this._optionsService.options.cursorBlink = false;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = false;
        break;
      case 66:
        this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
      case 1e3:
      case 1002:
      case 1003:
        this._coreMouseService.activeProtocol = "NONE";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = false;
        break;
      case 1005:
        this._logService.debug("DECRST 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 1015:
        this._logService.debug("DECRST 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 25:
        this._coreService.isCursorHidden = true;
        break;
      case 1048:
        this.restoreCursor();
        break;
      case 1049:
      case 47:
      case 1047:
        this._bufferService.buffers.activateNormalBuffer(), e.params[i] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = false;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
        break;
    }
    return true;
  }
  requestMode(e, i) {
    let r2;
    ((P2) => (P2[P2.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", P2[P2.SET = 1] = "SET", P2[P2.RESET = 2] = "RESET", P2[P2.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", P2[P2.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(r2 ||= {});
    let n2 = this._coreService.decPrivateModes, { activeProtocol: o2, activeEncoding: l3 } = this._coreMouseService, a = this._coreService, { buffers: u2, cols: h2 } = this._bufferService, { active: c, alt: d } = u2, _2 = this._optionsService.rawOptions, p2 = (A2, R2) => (a.triggerDataEvent(`${b.ESC}[${i ? "" : "?"}${A2};${R2}$y`), true), m2 = (A2) => A2 ? 1 : 2, f2 = e.params[0];
    return i ? f2 === 2 ? p2(f2, 4) : f2 === 4 ? p2(f2, m2(a.modes.insertMode)) : f2 === 12 ? p2(f2, 3) : f2 === 20 ? p2(f2, m2(_2.convertEol)) : p2(f2, 0) : f2 === 1 ? p2(f2, m2(n2.applicationCursorKeys)) : f2 === 3 ? p2(f2, _2.windowOptions.setWinLines ? h2 === 80 ? 2 : h2 === 132 ? 1 : 0 : 0) : f2 === 6 ? p2(f2, m2(n2.origin)) : f2 === 7 ? p2(f2, m2(n2.wraparound)) : f2 === 8 ? p2(f2, 3) : f2 === 9 ? p2(f2, m2(o2 === "X10")) : f2 === 12 ? p2(f2, m2(_2.cursorBlink)) : f2 === 25 ? p2(f2, m2(!a.isCursorHidden)) : f2 === 45 ? p2(f2, m2(n2.reverseWraparound)) : f2 === 66 ? p2(f2, m2(n2.applicationKeypad)) : f2 === 67 ? p2(f2, 4) : f2 === 1e3 ? p2(f2, m2(o2 === "VT200")) : f2 === 1002 ? p2(f2, m2(o2 === "DRAG")) : f2 === 1003 ? p2(f2, m2(o2 === "ANY")) : f2 === 1004 ? p2(f2, m2(n2.sendFocus)) : f2 === 1005 ? p2(f2, 4) : f2 === 1006 ? p2(f2, m2(l3 === "SGR")) : f2 === 1015 ? p2(f2, 4) : f2 === 1016 ? p2(f2, m2(l3 === "SGR_PIXELS")) : f2 === 1048 ? p2(f2, 1) : f2 === 47 || f2 === 1047 || f2 === 1049 ? p2(f2, m2(c === d)) : f2 === 2004 ? p2(f2, m2(n2.bracketedPasteMode)) : f2 === 2026 ? p2(f2, m2(n2.synchronizedOutput)) : p2(f2, 0);
  }
  _updateAttrColor(e, i, r2, n2, o2) {
    return i === 2 ? (e |= 50331648, e &= -16777216, e |= De.fromColorRGB([r2, n2, o2])) : i === 5 && (e &= -50331904, e |= 33554432 | r2 & 255), e;
  }
  _extractColor(e, i, r2) {
    let n2 = [0, 0, -1, 0, 0, 0], o2 = 0, l3 = 0;
    do {
      if (n2[l3 + o2] = e.params[i + l3], e.hasSubParams(i + l3)) {
        let a = e.getSubParams(i + l3), u2 = 0;
        do
          n2[1] === 5 && (o2 = 1), n2[l3 + u2 + 1 + o2] = a[u2];
        while (++u2 < a.length && u2 + l3 + 1 + o2 < n2.length);
        break;
      }
      if (n2[1] === 5 && l3 + o2 >= 2 || n2[1] === 2 && l3 + o2 >= 5) break;
      n2[1] && (o2 = 1);
    } while (++l3 + i < e.length && l3 + o2 < n2.length);
    for (let a = 2; a < n2.length; ++a) n2[a] === -1 && (n2[a] = 0);
    switch (n2[0]) {
      case 38:
        r2.fg = this._updateAttrColor(r2.fg, n2[1], n2[3], n2[4], n2[5]);
        break;
      case 48:
        r2.bg = this._updateAttrColor(r2.bg, n2[1], n2[3], n2[4], n2[5]);
        break;
      case 58:
        r2.extended = r2.extended.clone(), r2.extended.underlineColor = this._updateAttrColor(r2.extended.underlineColor, n2[1], n2[3], n2[4], n2[5]);
    }
    return l3;
  }
  _processUnderline(e, i) {
    i.extended = i.extended.clone(), (!~e || e > 5) && (e = 1), i.extended.underlineStyle = e, i.fg |= 268435456, e === 0 && (i.fg &= -268435457), i.updateExtended();
  }
  _processSGR0(e) {
    e.fg = X.fg, e.bg = X.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
  }
  charAttributes(e) {
    if (e.length === 1 && e.params[0] === 0) return this._processSGR0(this._curAttrData), true;
    let i = e.length, r2, n2 = this._curAttrData;
    for (let o2 = 0; o2 < i; o2++) r2 = e.params[o2], r2 >= 30 && r2 <= 37 ? (n2.fg &= -50331904, n2.fg |= 16777216 | r2 - 30) : r2 >= 40 && r2 <= 47 ? (n2.bg &= -50331904, n2.bg |= 16777216 | r2 - 40) : r2 >= 90 && r2 <= 97 ? (n2.fg &= -50331904, n2.fg |= 16777216 | r2 - 90 | 8) : r2 >= 100 && r2 <= 107 ? (n2.bg &= -50331904, n2.bg |= 16777216 | r2 - 100 | 8) : r2 === 0 ? this._processSGR0(n2) : r2 === 1 ? n2.fg |= 134217728 : r2 === 3 ? n2.bg |= 67108864 : r2 === 4 ? (n2.fg |= 268435456, this._processUnderline(e.hasSubParams(o2) ? e.getSubParams(o2)[0] : 1, n2)) : r2 === 5 ? n2.fg |= 536870912 : r2 === 7 ? n2.fg |= 67108864 : r2 === 8 ? n2.fg |= 1073741824 : r2 === 9 ? n2.fg |= 2147483648 : r2 === 2 ? n2.bg |= 134217728 : r2 === 21 ? this._processUnderline(2, n2) : r2 === 22 ? (n2.fg &= -134217729, n2.bg &= -134217729) : r2 === 23 ? n2.bg &= -67108865 : r2 === 24 ? (n2.fg &= -268435457, this._processUnderline(0, n2)) : r2 === 25 ? n2.fg &= -536870913 : r2 === 27 ? n2.fg &= -67108865 : r2 === 28 ? n2.fg &= -1073741825 : r2 === 29 ? n2.fg &= 2147483647 : r2 === 39 ? (n2.fg &= -67108864, n2.fg |= X.fg & 16777215) : r2 === 49 ? (n2.bg &= -67108864, n2.bg |= X.bg & 16777215) : r2 === 38 || r2 === 48 || r2 === 58 ? o2 += this._extractColor(e, o2, n2) : r2 === 53 ? n2.bg |= 1073741824 : r2 === 55 ? n2.bg &= -1073741825 : r2 === 59 ? (n2.extended = n2.extended.clone(), n2.extended.underlineColor = -1, n2.updateExtended()) : r2 === 100 ? (n2.fg &= -67108864, n2.fg |= X.fg & 16777215, n2.bg &= -67108864, n2.bg |= X.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", r2);
    return true;
  }
  deviceStatus(e) {
    switch (e.params[0]) {
      case 5:
        this._coreService.triggerDataEvent(`${b.ESC}[0n`);
        break;
      case 6:
        let i = this._activeBuffer.y + 1, r2 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[${i};${r2}R`);
        break;
    }
    return true;
  }
  deviceStatusPrivate(e) {
    switch (e.params[0]) {
      case 6:
        let i = this._activeBuffer.y + 1, r2 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[?${i};${r2}R`);
        break;
    }
    return true;
  }
  softReset(e) {
    return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = X.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
  }
  setCursorStyle(e) {
    let i = e.length === 0 ? 1 : e.params[0];
    if (i === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
    else {
      switch (i) {
        case 1:
        case 2:
          this._coreService.decPrivateModes.cursorStyle = "block";
          break;
        case 3:
        case 4:
          this._coreService.decPrivateModes.cursorStyle = "underline";
          break;
        case 5:
        case 6:
          this._coreService.decPrivateModes.cursorStyle = "bar";
          break;
      }
      let r2 = i % 2 === 1;
      this._coreService.decPrivateModes.cursorBlink = r2;
    }
    return true;
  }
  setScrollRegion(e) {
    let i = e.params[0] || 1, r2;
    return (e.length < 2 || (r2 = e.params[1]) > this._bufferService.rows || r2 === 0) && (r2 = this._bufferService.rows), r2 > i && (this._activeBuffer.scrollTop = i - 1, this._activeBuffer.scrollBottom = r2 - 1, this._setCursor(0, 0)), true;
  }
  windowOptions(e) {
    if (!bl(e.params[0], this._optionsService.rawOptions.windowOptions)) return true;
    let i = e.length > 1 ? e.params[1] : 0;
    switch (e.params[0]) {
      case 14:
        i !== 2 && this._onRequestWindowsOptionsReport.fire(0);
        break;
      case 16:
        this._onRequestWindowsOptionsReport.fire(1);
        break;
      case 18:
        this._bufferService && this._coreService.triggerDataEvent(`${b.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
        break;
      case 22:
        (i === 0 || i === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > _l && this._windowTitleStack.shift()), (i === 0 || i === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > _l && this._iconNameStack.shift());
        break;
      case 23:
        (i === 0 || i === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (i === 0 || i === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
        break;
    }
    return true;
  }
  saveCursor(e) {
    return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
  }
  restoreCursor(e) {
    return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
  }
  setTitle(e) {
    return this._windowTitle = e, this._onTitleChange.fire(e), true;
  }
  setIconName(e) {
    return this._iconName = e, true;
  }
  setOrReportIndexedColor(e) {
    let i = [], r2 = e.split(";");
    for (; r2.length > 1; ) {
      let n2 = r2.shift(), o2 = r2.shift();
      if (/^\d+$/.exec(n2)) {
        let l3 = parseInt(n2);
        if (Sl(l3)) if (o2 === "?") i.push({ type: 0, index: l3 });
        else {
          let a = Ws(o2);
          a && i.push({ type: 1, index: l3, color: a });
        }
      }
    }
    return i.length && this._onColor.fire(i), true;
  }
  setHyperlink(e) {
    let i = e.indexOf(";");
    if (i === -1) return true;
    let r2 = e.slice(0, i).trim(), n2 = e.slice(i + 1);
    return n2 ? this._createHyperlink(r2, n2) : r2.trim() ? false : this._finishHyperlink();
  }
  _createHyperlink(e, i) {
    this._getCurrentLinkId() && this._finishHyperlink();
    let r2 = e.split(":"), n2, o2 = r2.findIndex((l3) => l3.startsWith("id="));
    return o2 !== -1 && (n2 = r2[o2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: n2, uri: i }), this._curAttrData.updateExtended(), true;
  }
  _finishHyperlink() {
    return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
  }
  _setOrReportSpecialColor(e, i) {
    let r2 = e.split(";");
    for (let n2 = 0; n2 < r2.length && !(i >= this._specialColors.length); ++n2, ++i) if (r2[n2] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[i] }]);
    else {
      let o2 = Ws(r2[n2]);
      o2 && this._onColor.fire([{ type: 1, index: this._specialColors[i], color: o2 }]);
    }
    return true;
  }
  setOrReportFgColor(e) {
    return this._setOrReportSpecialColor(e, 0);
  }
  setOrReportBgColor(e) {
    return this._setOrReportSpecialColor(e, 1);
  }
  setOrReportCursorColor(e) {
    return this._setOrReportSpecialColor(e, 2);
  }
  restoreIndexedColor(e) {
    if (!e) return this._onColor.fire([{ type: 2 }]), true;
    let i = [], r2 = e.split(";");
    for (let n2 = 0; n2 < r2.length; ++n2) if (/^\d+$/.exec(r2[n2])) {
      let o2 = parseInt(r2[n2]);
      Sl(o2) && i.push({ type: 2, index: o2 });
    }
    return i.length && this._onColor.fire(i), true;
  }
  restoreFgColor(e) {
    return this._onColor.fire([{ type: 2, index: 256 }]), true;
  }
  restoreBgColor(e) {
    return this._onColor.fire([{ type: 2, index: 257 }]), true;
  }
  restoreCursorColor(e) {
    return this._onColor.fire([{ type: 2, index: 258 }]), true;
  }
  nextLine() {
    return this._activeBuffer.x = 0, this.index(), true;
  }
  keypadApplicationMode() {
    return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
  }
  keypadNumericMode() {
    return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
  }
  selectDefaultCharset() {
    return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, Je), true;
  }
  selectCharset(e) {
    return e.length !== 2 ? (this.selectDefaultCharset(), true) : (e[0] === "/" || this._charsetService.setgCharset(mc[e[0]], ne[e[1]] || Je), true);
  }
  index() {
    return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
  }
  tabSet() {
    return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
  }
  reverseIndex() {
    if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
      let e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
      this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
    } else this._activeBuffer.y--, this._restrictCursor();
    return true;
  }
  fullReset() {
    return this._parser.reset(), this._onRequestReset.fire(), true;
  }
  reset() {
    this._curAttrData = X.clone(), this._eraseAttrDataInternal = X.clone();
  }
  _eraseAttrData() {
    return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
  }
  setgLevel(e) {
    return this._charsetService.setgLevel(e), true;
  }
  screenAlignmentPattern() {
    let e = new q();
    e.content = 1 << 22 | 69, e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
    for (let i = 0; i < this._bufferService.rows; ++i) {
      let r2 = this._activeBuffer.ybase + this._activeBuffer.y + i, n2 = this._activeBuffer.lines.get(r2);
      n2 && (n2.fill(e), n2.isWrapped = false);
    }
    return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
  }
  requestStatusString(e, i) {
    let r2 = (a) => (this._coreService.triggerDataEvent(`${b.ESC}${a}${b.ESC}\\`), true), n2 = this._bufferService.buffer, o2 = this._optionsService.rawOptions, l3 = { block: 2, underline: 4, bar: 6 };
    return r2(e === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e === '"p' ? 'P1$r61;1"p' : e === "r" ? `P1$r${n2.scrollTop + 1};${n2.scrollBottom + 1}r` : e === "m" ? "P1$r0m" : e === " q" ? `P1$r${l3[o2.cursorStyle] - (o2.cursorBlink ? 1 : 0)} q` : "P0$r");
  }
  markRangeDirty(e, i) {
    this._dirtyRowTracker.markRangeDirty(e, i);
  }
}, Zi = class {
  constructor(t2) {
    this._bufferService = t2;
    this.clearRange();
  }
  clearRange() {
    this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
  }
  markDirty(t2) {
    t2 < this.start ? this.start = t2 : t2 > this.end && (this.end = t2);
  }
  markRangeDirty(t2, e) {
    t2 > e && (gl = t2, t2 = e, e = gl), t2 < this.start && (this.start = t2), e > this.end && (this.end = e);
  }
  markAllDirty() {
    this.markRangeDirty(0, this._bufferService.rows - 1);
  }
};
Zi = M([S(0, F)], Zi);
function Sl(s15) {
  return 0 <= s15 && s15 < 256;
}
var _c = 5e7, El = 12, bc = 50, gn = class extends D {
  constructor(e) {
    super();
    this._action = e;
    this._writeBuffer = [];
    this._callbacks = [];
    this._pendingData = 0;
    this._bufferOffset = 0;
    this._isSyncWriting = false;
    this._syncCalls = 0;
    this._didUserInput = false;
    this._onWriteParsed = this._register(new v$1());
    this.onWriteParsed = this._onWriteParsed.event;
  }
  handleUserInput() {
    this._didUserInput = true;
  }
  writeSync(e, i) {
    if (i !== void 0 && this._syncCalls > i) {
      this._syncCalls = 0;
      return;
    }
    if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
    this._isSyncWriting = true;
    let r2;
    for (; r2 = this._writeBuffer.shift(); ) {
      this._action(r2);
      let n2 = this._callbacks.shift();
      n2 && n2();
    }
    this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
  }
  write(e, i) {
    if (this._pendingData > _c) throw new Error("write data discarded, use flow control to avoid losing data");
    if (!this._writeBuffer.length) {
      if (this._bufferOffset = 0, this._didUserInput) {
        this._didUserInput = false, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i), this._innerWrite();
        return;
      }
      setTimeout(() => this._innerWrite());
    }
    this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i);
  }
  _innerWrite(e = 0, i = true) {
    let r2 = e || performance.now();
    for (; this._writeBuffer.length > this._bufferOffset; ) {
      let n2 = this._writeBuffer[this._bufferOffset], o2 = this._action(n2, i);
      if (o2) {
        let a = (u2) => performance.now() - r2 >= El ? setTimeout(() => this._innerWrite(0, u2)) : this._innerWrite(r2, u2);
        o2.catch((u2) => (queueMicrotask(() => {
          throw u2;
        }), Promise.resolve(false))).then(a);
        return;
      }
      let l3 = this._callbacks[this._bufferOffset];
      if (l3 && l3(), this._bufferOffset++, this._pendingData -= n2.length, performance.now() - r2 >= El) break;
    }
    this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > bc && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
  }
};
var ui = class {
  constructor(t2) {
    this._bufferService = t2;
    this._nextId = 1;
    this._entriesWithId = /* @__PURE__ */ new Map();
    this._dataByLinkId = /* @__PURE__ */ new Map();
  }
  registerLink(t2) {
    let e = this._bufferService.buffer;
    if (t2.id === void 0) {
      let a = e.addMarker(e.ybase + e.y), u2 = { data: t2, id: this._nextId++, lines: [a] };
      return a.onDispose(() => this._removeMarkerFromLink(u2, a)), this._dataByLinkId.set(u2.id, u2), u2.id;
    }
    let i = t2, r2 = this._getEntryIdKey(i), n2 = this._entriesWithId.get(r2);
    if (n2) return this.addLineToLink(n2.id, e.ybase + e.y), n2.id;
    let o2 = e.addMarker(e.ybase + e.y), l3 = { id: this._nextId++, key: this._getEntryIdKey(i), data: i, lines: [o2] };
    return o2.onDispose(() => this._removeMarkerFromLink(l3, o2)), this._entriesWithId.set(l3.key, l3), this._dataByLinkId.set(l3.id, l3), l3.id;
  }
  addLineToLink(t2, e) {
    let i = this._dataByLinkId.get(t2);
    if (i && i.lines.every((r2) => r2.line !== e)) {
      let r2 = this._bufferService.buffer.addMarker(e);
      i.lines.push(r2), r2.onDispose(() => this._removeMarkerFromLink(i, r2));
    }
  }
  getLinkData(t2) {
    return this._dataByLinkId.get(t2)?.data;
  }
  _getEntryIdKey(t2) {
    return `${t2.id};;${t2.uri}`;
  }
  _removeMarkerFromLink(t2, e) {
    let i = t2.lines.indexOf(e);
    i !== -1 && (t2.lines.splice(i, 1), t2.lines.length === 0 && (t2.data.id !== void 0 && this._entriesWithId.delete(t2.key), this._dataByLinkId.delete(t2.id)));
  }
};
ui = M([S(0, F)], ui);
var Tl = false, Sn = class extends D {
  constructor(e) {
    super();
    this._windowsWrappingHeuristics = this._register(new ye());
    this._onBinary = this._register(new v$1());
    this.onBinary = this._onBinary.event;
    this._onData = this._register(new v$1());
    this.onData = this._onData.event;
    this._onLineFeed = this._register(new v$1());
    this.onLineFeed = this._onLineFeed.event;
    this._onResize = this._register(new v$1());
    this.onResize = this._onResize.event;
    this._onWriteParsed = this._register(new v$1());
    this.onWriteParsed = this._onWriteParsed.event;
    this._onScroll = this._register(new v$1());
    this._instantiationService = new ln(), this.optionsService = this._register(new dn(e)), this._instantiationService.setService(H, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ni)), this._instantiationService.setService(F, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(ii)), this._instantiationService.setService(nr, this._logService), this.coreService = this._register(this._instantiationService.createInstance(li)), this._instantiationService.setService(ge, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(ai)), this._instantiationService.setService(rr, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(Ae)), this._instantiationService.setService(Js, this.unicodeService), this._charsetService = this._instantiationService.createInstance(pn), this._instantiationService.setService(Zs, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(ui), this._instantiationService.setService(sr, this._oscLinkService), this._inputHandler = this._register(new vn(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register($.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register($.forward(this._bufferService.onResize, this._onResize)), this._register($.forward(this.coreService.onData, this._onData)), this._register($.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(true))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
      this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
    })), this._writeBuffer = this._register(new gn((i, r2) => this._inputHandler.parse(i, r2))), this._register($.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
  }
  get onScroll() {
    return this._onScrollApi || (this._onScrollApi = this._register(new v$1()), this._onScroll.event((e) => {
      this._onScrollApi?.fire(e.position);
    })), this._onScrollApi.event;
  }
  get cols() {
    return this._bufferService.cols;
  }
  get rows() {
    return this._bufferService.rows;
  }
  get buffers() {
    return this._bufferService.buffers;
  }
  get options() {
    return this.optionsService.options;
  }
  set options(e) {
    for (let i in e) this.optionsService.options[i] = e[i];
  }
  write(e, i) {
    this._writeBuffer.write(e, i);
  }
  writeSync(e, i) {
    this._logService.logLevel <= 3 && !Tl && (this._logService.warn("writeSync is unreliable and will be removed soon."), Tl = true), this._writeBuffer.writeSync(e, i);
  }
  input(e, i = true) {
    this.coreService.triggerDataEvent(e, i);
  }
  resize(e, i) {
    isNaN(e) || isNaN(i) || (e = Math.max(e, ks), i = Math.max(i, Cs), this._bufferService.resize(e, i));
  }
  scroll(e, i = false) {
    this._bufferService.scroll(e, i);
  }
  scrollLines(e, i) {
    this._bufferService.scrollLines(e, i);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  registerEscHandler(e, i) {
    return this._inputHandler.registerEscHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._inputHandler.registerDcsHandler(e, i);
  }
  registerCsiHandler(e, i) {
    return this._inputHandler.registerCsiHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._inputHandler.registerOscHandler(e, i);
  }
  _setup() {
    this._handleWindowsPtyOptionChange();
  }
  reset() {
    this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
  }
  _handleWindowsPtyOptionChange() {
    let e = false, i = this.optionsService.rawOptions.windowsPty;
    i && i.buildNumber !== void 0 && i.buildNumber !== void 0 ? e = i.backend === "conpty" && i.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e = true), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
  }
  _enableWindowsWrappingHeuristics() {
    if (!this._windowsWrappingHeuristics.value) {
      let e = [];
      e.push(this.onLineFeed(Bs.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, () => (Bs(this._bufferService), false))), this._windowsWrappingHeuristics.value = C(() => {
        for (let i of e) i.dispose();
      });
    }
  }
};
var gc = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
function Il(s15, t2, e, i) {
  let r2 = { type: 0, cancel: false, key: void 0 }, n2 = (s15.shiftKey ? 1 : 0) | (s15.altKey ? 2 : 0) | (s15.ctrlKey ? 4 : 0) | (s15.metaKey ? 8 : 0);
  switch (s15.keyCode) {
    case 0:
      s15.key === "UIKeyInputUpArrow" ? t2 ? r2.key = b.ESC + "OA" : r2.key = b.ESC + "[A" : s15.key === "UIKeyInputLeftArrow" ? t2 ? r2.key = b.ESC + "OD" : r2.key = b.ESC + "[D" : s15.key === "UIKeyInputRightArrow" ? t2 ? r2.key = b.ESC + "OC" : r2.key = b.ESC + "[C" : s15.key === "UIKeyInputDownArrow" && (t2 ? r2.key = b.ESC + "OB" : r2.key = b.ESC + "[B");
      break;
    case 8:
      r2.key = s15.ctrlKey ? "\b" : b.DEL, s15.altKey && (r2.key = b.ESC + r2.key);
      break;
    case 9:
      if (s15.shiftKey) {
        r2.key = b.ESC + "[Z";
        break;
      }
      r2.key = b.HT, r2.cancel = true;
      break;
    case 13:
      r2.key = s15.altKey ? b.ESC + b.CR : b.CR, r2.cancel = true;
      break;
    case 27:
      r2.key = b.ESC, s15.altKey && (r2.key = b.ESC + b.ESC), r2.cancel = true;
      break;
    case 37:
      if (s15.metaKey) break;
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "D" : t2 ? r2.key = b.ESC + "OD" : r2.key = b.ESC + "[D";
      break;
    case 39:
      if (s15.metaKey) break;
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "C" : t2 ? r2.key = b.ESC + "OC" : r2.key = b.ESC + "[C";
      break;
    case 38:
      if (s15.metaKey) break;
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "A" : t2 ? r2.key = b.ESC + "OA" : r2.key = b.ESC + "[A";
      break;
    case 40:
      if (s15.metaKey) break;
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "B" : t2 ? r2.key = b.ESC + "OB" : r2.key = b.ESC + "[B";
      break;
    case 45:
      !s15.shiftKey && !s15.ctrlKey && (r2.key = b.ESC + "[2~");
      break;
    case 46:
      n2 ? r2.key = b.ESC + "[3;" + (n2 + 1) + "~" : r2.key = b.ESC + "[3~";
      break;
    case 36:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "H" : t2 ? r2.key = b.ESC + "OH" : r2.key = b.ESC + "[H";
      break;
    case 35:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "F" : t2 ? r2.key = b.ESC + "OF" : r2.key = b.ESC + "[F";
      break;
    case 33:
      s15.shiftKey ? r2.type = 2 : s15.ctrlKey ? r2.key = b.ESC + "[5;" + (n2 + 1) + "~" : r2.key = b.ESC + "[5~";
      break;
    case 34:
      s15.shiftKey ? r2.type = 3 : s15.ctrlKey ? r2.key = b.ESC + "[6;" + (n2 + 1) + "~" : r2.key = b.ESC + "[6~";
      break;
    case 112:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "P" : r2.key = b.ESC + "OP";
      break;
    case 113:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "Q" : r2.key = b.ESC + "OQ";
      break;
    case 114:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "R" : r2.key = b.ESC + "OR";
      break;
    case 115:
      n2 ? r2.key = b.ESC + "[1;" + (n2 + 1) + "S" : r2.key = b.ESC + "OS";
      break;
    case 116:
      n2 ? r2.key = b.ESC + "[15;" + (n2 + 1) + "~" : r2.key = b.ESC + "[15~";
      break;
    case 117:
      n2 ? r2.key = b.ESC + "[17;" + (n2 + 1) + "~" : r2.key = b.ESC + "[17~";
      break;
    case 118:
      n2 ? r2.key = b.ESC + "[18;" + (n2 + 1) + "~" : r2.key = b.ESC + "[18~";
      break;
    case 119:
      n2 ? r2.key = b.ESC + "[19;" + (n2 + 1) + "~" : r2.key = b.ESC + "[19~";
      break;
    case 120:
      n2 ? r2.key = b.ESC + "[20;" + (n2 + 1) + "~" : r2.key = b.ESC + "[20~";
      break;
    case 121:
      n2 ? r2.key = b.ESC + "[21;" + (n2 + 1) + "~" : r2.key = b.ESC + "[21~";
      break;
    case 122:
      n2 ? r2.key = b.ESC + "[23;" + (n2 + 1) + "~" : r2.key = b.ESC + "[23~";
      break;
    case 123:
      n2 ? r2.key = b.ESC + "[24;" + (n2 + 1) + "~" : r2.key = b.ESC + "[24~";
      break;
    default:
      if (s15.ctrlKey && !s15.shiftKey && !s15.altKey && !s15.metaKey) s15.keyCode >= 65 && s15.keyCode <= 90 ? r2.key = String.fromCharCode(s15.keyCode - 64) : s15.keyCode === 32 ? r2.key = b.NUL : s15.keyCode >= 51 && s15.keyCode <= 55 ? r2.key = String.fromCharCode(s15.keyCode - 51 + 27) : s15.keyCode === 56 ? r2.key = b.DEL : s15.keyCode === 219 ? r2.key = b.ESC : s15.keyCode === 220 ? r2.key = b.FS : s15.keyCode === 221 && (r2.key = b.GS);
      else if ((!e || i) && s15.altKey && !s15.metaKey) {
        let l3 = gc[s15.keyCode]?.[s15.shiftKey ? 1 : 0];
        if (l3) r2.key = b.ESC + l3;
        else if (s15.keyCode >= 65 && s15.keyCode <= 90) {
          let a = s15.ctrlKey ? s15.keyCode - 64 : s15.keyCode + 32, u2 = String.fromCharCode(a);
          s15.shiftKey && (u2 = u2.toUpperCase()), r2.key = b.ESC + u2;
        } else if (s15.keyCode === 32) r2.key = b.ESC + (s15.ctrlKey ? b.NUL : " ");
        else if (s15.key === "Dead" && s15.code.startsWith("Key")) {
          let a = s15.code.slice(3, 4);
          s15.shiftKey || (a = a.toLowerCase()), r2.key = b.ESC + a, r2.cancel = true;
        }
      } else e && !s15.altKey && !s15.ctrlKey && !s15.shiftKey && s15.metaKey ? s15.keyCode === 65 && (r2.type = 1) : s15.key && !s15.ctrlKey && !s15.altKey && !s15.metaKey && s15.keyCode >= 48 && s15.key.length === 1 ? r2.key = s15.key : s15.key && s15.ctrlKey && (s15.key === "_" && (r2.key = b.US), s15.key === "@" && (r2.key = b.NUL));
      break;
  }
  return r2;
}
var ee = 0, En = class {
  constructor(t2) {
    this._getKey = t2;
    this._array = [];
    this._insertedValues = [];
    this._flushInsertedTask = new Jt();
    this._isFlushingInserted = false;
    this._deletedIndices = [];
    this._flushDeletedTask = new Jt();
    this._isFlushingDeleted = false;
  }
  clear() {
    this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
  }
  insert(t2) {
    this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(t2);
  }
  _flushInserted() {
    let t2 = this._insertedValues.sort((n2, o2) => this._getKey(n2) - this._getKey(o2)), e = 0, i = 0, r2 = new Array(this._array.length + this._insertedValues.length);
    for (let n2 = 0; n2 < r2.length; n2++) i >= this._array.length || this._getKey(t2[e]) <= this._getKey(this._array[i]) ? (r2[n2] = t2[e], e++) : r2[n2] = this._array[i++];
    this._array = r2, this._insertedValues.length = 0;
  }
  _flushCleanupInserted() {
    !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
  }
  delete(t2) {
    if (this._flushCleanupInserted(), this._array.length === 0) return false;
    let e = this._getKey(t2);
    if (e === void 0 || (ee = this._search(e), ee === -1) || this._getKey(this._array[ee]) !== e) return false;
    do
      if (this._array[ee] === t2) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(ee), true;
    while (++ee < this._array.length && this._getKey(this._array[ee]) === e);
    return false;
  }
  _flushDeleted() {
    this._isFlushingDeleted = true;
    let t2 = this._deletedIndices.sort((n2, o2) => n2 - o2), e = 0, i = new Array(this._array.length - t2.length), r2 = 0;
    for (let n2 = 0; n2 < this._array.length; n2++) t2[e] === n2 ? e++ : i[r2++] = this._array[n2];
    this._array = i, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
  }
  _flushCleanupDeleted() {
    !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
  }
  *getKeyIterator(t2) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t2), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t2)) do
      yield this._array[ee];
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t2);
  }
  forEachByKey(t2, e) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t2), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t2)) do
      e(this._array[ee]);
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t2);
  }
  values() {
    return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
  }
  _search(t2) {
    let e = 0, i = this._array.length - 1;
    for (; i >= e; ) {
      let r2 = e + i >> 1, n2 = this._getKey(this._array[r2]);
      if (n2 > t2) i = r2 - 1;
      else if (n2 < t2) e = r2 + 1;
      else {
        for (; r2 > 0 && this._getKey(this._array[r2 - 1]) === t2; ) r2--;
        return r2;
      }
    }
    return e;
  }
};
var Us = 0, yl = 0, Tn = class extends D {
  constructor() {
    super();
    this._decorations = new En((e) => e?.marker.line);
    this._onDecorationRegistered = this._register(new v$1());
    this.onDecorationRegistered = this._onDecorationRegistered.event;
    this._onDecorationRemoved = this._register(new v$1());
    this.onDecorationRemoved = this._onDecorationRemoved.event;
    this._register(C(() => this.reset()));
  }
  get decorations() {
    return this._decorations.values();
  }
  registerDecoration(e) {
    if (e.marker.isDisposed) return;
    let i = new Ks(e);
    if (i) {
      let r2 = i.marker.onDispose(() => i.dispose()), n2 = i.onDispose(() => {
        n2.dispose(), i && (this._decorations.delete(i) && this._onDecorationRemoved.fire(i), r2.dispose());
      });
      this._decorations.insert(i), this._onDecorationRegistered.fire(i);
    }
    return i;
  }
  reset() {
    for (let e of this._decorations.values()) e.dispose();
    this._decorations.clear();
  }
  *getDecorationsAtCell(e, i, r2) {
    let n2 = 0, o2 = 0;
    for (let l3 of this._decorations.getKeyIterator(i)) n2 = l3.options.x ?? 0, o2 = n2 + (l3.options.width ?? 1), e >= n2 && e < o2 && (!r2 || (l3.options.layer ?? "bottom") === r2) && (yield l3);
  }
  forEachDecorationAtCell(e, i, r2, n2) {
    this._decorations.forEachByKey(i, (o2) => {
      Us = o2.options.x ?? 0, yl = Us + (o2.options.width ?? 1), e >= Us && e < yl && (!r2 || (o2.options.layer ?? "bottom") === r2) && n2(o2);
    });
  }
}, Ks = class extends Ee {
  constructor(e) {
    super();
    this.options = e;
    this.onRenderEmitter = this.add(new v$1());
    this.onRender = this.onRenderEmitter.event;
    this._onDispose = this.add(new v$1());
    this.onDispose = this._onDispose.event;
    this._cachedBg = null;
    this._cachedFg = null;
    this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
  }
  get backgroundColorRGB() {
    return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = z.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
  }
  get foregroundColorRGB() {
    return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = z.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
  }
  dispose() {
    this._onDispose.fire(), super.dispose();
  }
};
var Sc = 1e3, In = class {
  constructor(t2, e = Sc) {
    this._renderCallback = t2;
    this._debounceThresholdMS = e;
    this._lastRefreshMs = 0;
    this._additionalRefreshRequested = false;
  }
  dispose() {
    this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
  }
  refresh(t2, e, i) {
    this._rowCount = i, t2 = t2 !== void 0 ? t2 : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t2) : t2, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e;
    let r2 = performance.now();
    if (r2 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r2, this._innerRefresh();
    else if (!this._additionalRefreshRequested) {
      let n2 = r2 - this._lastRefreshMs, o2 = this._debounceThresholdMS - n2;
      this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
        this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
      }, o2);
    }
  }
  _innerRefresh() {
    if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
    let t2 = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t2, e);
  }
};
var xl = 20;
var Tt = class extends D {
  constructor(e, i, r2, n2) {
    super();
    this._terminal = e;
    this._coreBrowserService = r2;
    this._renderService = n2;
    this._rowColumns = /* @__PURE__ */ new WeakMap();
    this._liveRegionLineCount = 0;
    this._charsToConsume = [];
    this._charsToAnnounce = "";
    let o2 = this._coreBrowserService.mainDocument;
    this._accessibilityContainer = o2.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = o2.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
    for (let l3 = 0; l3 < this._terminal.rows; l3++) this._rowElements[l3] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l3]);
    if (this._topBoundaryFocusListener = (l3) => this._handleBoundaryFocus(l3, 0), this._bottomBoundaryFocusListener = (l3) => this._handleBoundaryFocus(l3, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = o2.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new In(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
    this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((l3) => this._handleResize(l3.rows))), this._register(this._terminal.onRender((l3) => this._refreshRows(l3.start, l3.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((l3) => this._handleChar(l3))), this._register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this._register(this._terminal.onA11yTab((l3) => this._handleTab(l3))), this._register(this._terminal.onKey((l3) => this._handleKey(l3.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(L$1(o2, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(C(() => {
      this._accessibilityContainer.remove(), this._rowElements.length = 0;
    }));
  }
  _handleTab(e) {
    for (let i = 0; i < e; i++) this._handleChar(" ");
  }
  _handleChar(e) {
    this._liveRegionLineCount < xl + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === xl + 1 && (this._liveRegion.textContent += _i.get())));
  }
  _clearLiveRegion() {
    this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
  }
  _handleKey(e) {
    this._clearLiveRegion(), new RegExp("\\p{Control}", "u").test(e) || this._charsToConsume.push(e);
  }
  _refreshRows(e, i) {
    this._liveRegionDebouncer.refresh(e, i, this._terminal.rows);
  }
  _renderRows(e, i) {
    let r2 = this._terminal.buffer, n2 = r2.lines.length.toString();
    for (let o2 = e; o2 <= i; o2++) {
      let l3 = r2.lines.get(r2.ydisp + o2), a = [], u2 = l3?.translateToString(true, void 0, void 0, a) || "", h2 = (r2.ydisp + o2 + 1).toString(), c = this._rowElements[o2];
      c && (u2.length === 0 ? (c.textContent = " ", this._rowColumns.set(c, [0, 1])) : (c.textContent = u2, this._rowColumns.set(c, a)), c.setAttribute("aria-posinset", h2), c.setAttribute("aria-setsize", n2), this._alignRowWidth(c));
    }
    this._announceCharacters();
  }
  _announceCharacters() {
    this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
  }
  _handleBoundaryFocus(e, i) {
    let r2 = e.target, n2 = this._rowElements[i === 0 ? 1 : this._rowElements.length - 2], o2 = r2.getAttribute("aria-posinset"), l3 = i === 0 ? "1" : `${this._terminal.buffer.lines.length}`;
    if (o2 === l3 || e.relatedTarget !== n2) return;
    let a, u2;
    if (i === 0 ? (a = r2, u2 = this._rowElements.pop(), this._rowContainer.removeChild(u2)) : (a = this._rowElements.shift(), u2 = r2, this._rowContainer.removeChild(a)), a.removeEventListener("focus", this._topBoundaryFocusListener), u2.removeEventListener("focus", this._bottomBoundaryFocusListener), i === 0) {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.unshift(h2), this._rowContainer.insertAdjacentElement("afterbegin", h2);
    } else {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.push(h2), this._rowContainer.appendChild(h2);
    }
    this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(i === 0 ? -1 : 1), this._rowElements[i === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
  }
  _handleSelectionChange() {
    if (this._rowElements.length === 0) return;
    let e = this._coreBrowserService.mainDocument.getSelection();
    if (!e) return;
    if (e.isCollapsed) {
      this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection();
      return;
    }
    if (!e.anchorNode || !e.focusNode) {
      console.error("anchorNode and/or focusNode are null");
      return;
    }
    let i = { node: e.anchorNode, offset: e.anchorOffset }, r2 = { node: e.focusNode, offset: e.focusOffset };
    if ((i.node.compareDocumentPosition(r2.node) & Node.DOCUMENT_POSITION_PRECEDING || i.node === r2.node && i.offset > r2.offset) && ([i, r2] = [r2, i]), i.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (i = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(i.node)) return;
    let n2 = this._rowElements.slice(-1)[0];
    if (r2.node.compareDocumentPosition(n2) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (r2 = { node: n2, offset: n2.textContent?.length ?? 0 }), !this._rowContainer.contains(r2.node)) return;
    let o2 = ({ node: u2, offset: h2 }) => {
      let c = u2 instanceof Text ? u2.parentNode : u2, d = parseInt(c?.getAttribute("aria-posinset"), 10) - 1;
      if (isNaN(d)) return console.warn("row is invalid. Race condition?"), null;
      let _2 = this._rowColumns.get(c);
      if (!_2) return console.warn("columns is null. Race condition?"), null;
      let p2 = h2 < _2.length ? _2[h2] : _2.slice(-1)[0] + 1;
      return p2 >= this._terminal.cols && (++d, p2 = 0), { row: d, column: p2 };
    }, l3 = o2(i), a = o2(r2);
    if (!(!l3 || !a)) {
      if (l3.row > a.row || l3.row === a.row && l3.column >= a.column) throw new Error("invalid range");
      this._terminal.select(l3.column, l3.row, (a.row - l3.row) * this._terminal.cols - l3.column + a.column);
    }
  }
  _handleResize(e) {
    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
    for (let i = this._rowContainer.children.length; i < this._terminal.rows; i++) this._rowElements[i] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[i]);
    for (; this._rowElements.length > e; ) this._rowContainer.removeChild(this._rowElements.pop());
    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
  }
  _createAccessibilityTreeNode() {
    let e = this._coreBrowserService.mainDocument.createElement("div");
    return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
  }
  _refreshRowsDimensions() {
    if (this._renderService.dimensions.css.cell.height) {
      Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
      for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]), this._alignRowWidth(this._rowElements[e]);
    }
  }
  _refreshRowDimensions(e) {
    e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
  }
  _alignRowWidth(e) {
    e.style.transform = "";
    let i = e.getBoundingClientRect().width, r2 = this._rowColumns.get(e)?.slice(-1)?.[0];
    if (!r2) return;
    let n2 = r2 * this._renderService.dimensions.css.cell.width;
    e.style.transform = `scaleX(${n2 / i})`;
  }
};
Tt = M([S(1, xt), S(2, ae), S(3, ce)], Tt);
var hi = class extends D {
  constructor(e, i, r2, n2, o2) {
    super();
    this._element = e;
    this._mouseService = i;
    this._renderService = r2;
    this._bufferService = n2;
    this._linkProviderService = o2;
    this._linkCacheDisposables = [];
    this._isMouseOut = true;
    this._wasResized = false;
    this._activeLine = -1;
    this._onShowLinkUnderline = this._register(new v$1());
    this.onShowLinkUnderline = this._onShowLinkUnderline.event;
    this._onHideLinkUnderline = this._register(new v$1());
    this.onHideLinkUnderline = this._onHideLinkUnderline.event;
    this._register(C(() => {
      Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
    })), this._register(this._bufferService.onResize(() => {
      this._clearCurrentLink(), this._wasResized = true;
    })), this._register(L$1(this._element, "mouseleave", () => {
      this._isMouseOut = true, this._clearCurrentLink();
    })), this._register(L$1(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(L$1(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(L$1(this._element, "mouseup", this._handleMouseUp.bind(this)));
  }
  get currentLink() {
    return this._currentLink;
  }
  _handleMouseMove(e) {
    this._lastMouseEvent = e;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    if (!i) return;
    this._isMouseOut = false;
    let r2 = e.composedPath();
    for (let n2 = 0; n2 < r2.length; n2++) {
      let o2 = r2[n2];
      if (o2.classList.contains("xterm")) break;
      if (o2.classList.contains("xterm-hover")) return;
    }
    (!this._lastBufferCell || i.x !== this._lastBufferCell.x || i.y !== this._lastBufferCell.y) && (this._handleHover(i), this._lastBufferCell = i);
  }
  _handleHover(e) {
    if (this._activeLine !== e.y || this._wasResized) {
      this._clearCurrentLink(), this._askForLink(e, false), this._wasResized = false;
      return;
    }
    this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, true));
  }
  _askForLink(e, i) {
    (!this._activeProviderReplies || !i) && (this._activeProviderReplies?.forEach((n2) => {
      n2?.forEach((o2) => {
        o2.link.dispose && o2.link.dispose();
      });
    }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
    let r2 = false;
    for (let [n2, o2] of this._linkProviderService.linkProviders.entries()) i ? this._activeProviderReplies?.get(n2) && (r2 = this._checkLinkProviderResult(n2, e, r2)) : o2.provideLinks(e.y, (l3) => {
      if (this._isMouseOut) return;
      let a = l3?.map((u2) => ({ link: u2 }));
      this._activeProviderReplies?.set(n2, a), r2 = this._checkLinkProviderResult(n2, e, r2), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
    });
  }
  _removeIntersectingLinks(e, i) {
    let r2 = /* @__PURE__ */ new Set();
    for (let n2 = 0; n2 < i.size; n2++) {
      let o2 = i.get(n2);
      if (o2) for (let l3 = 0; l3 < o2.length; l3++) {
        let a = o2[l3], u2 = a.link.range.start.y < e ? 0 : a.link.range.start.x, h2 = a.link.range.end.y > e ? this._bufferService.cols : a.link.range.end.x;
        for (let c = u2; c <= h2; c++) {
          if (r2.has(c)) {
            o2.splice(l3--, 1);
            break;
          }
          r2.add(c);
        }
      }
    }
  }
  _checkLinkProviderResult(e, i, r2) {
    if (!this._activeProviderReplies) return r2;
    let n2 = this._activeProviderReplies.get(e), o2 = false;
    for (let l3 = 0; l3 < e; l3++) (!this._activeProviderReplies.has(l3) || this._activeProviderReplies.get(l3)) && (o2 = true);
    if (!o2 && n2) {
      let l3 = n2.find((a) => this._linkAtPosition(a.link, i));
      l3 && (r2 = true, this._handleNewLink(l3));
    }
    if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !r2) for (let l3 = 0; l3 < this._activeProviderReplies.size; l3++) {
      let a = this._activeProviderReplies.get(l3)?.find((u2) => this._linkAtPosition(u2.link, i));
      if (a) {
        r2 = true, this._handleNewLink(a);
        break;
      }
    }
    return r2;
  }
  _handleMouseDown() {
    this._mouseDownLink = this._currentLink;
  }
  _handleMouseUp(e) {
    if (!this._currentLink) return;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    i && this._mouseDownLink && Ec(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, i) && this._currentLink.link.activate(e, this._currentLink.link.text);
  }
  _clearCurrentLink(e, i) {
    !this._currentLink || !this._lastMouseEvent || (!e || !i || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= i) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
  }
  _handleNewLink(e) {
    if (!this._lastMouseEvent) return;
    let i = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
    i && this._linkAtPosition(e.link, i) && (this._currentLink = e, this._currentLink.state = { decorations: { underline: e.link.decorations === void 0 ? true : e.link.decorations.underline, pointerCursor: e.link.decorations === void 0 ? true : e.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (r2) => {
      this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== r2 && (this._currentLink.state.decorations.pointerCursor = r2, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", r2));
    } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (r2) => {
      this._currentLink?.state && this._currentLink?.state?.decorations.underline !== r2 && (this._currentLink.state.decorations.underline = r2, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, r2));
    } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((r2) => {
      if (!this._currentLink) return;
      let n2 = r2.start === 0 ? 0 : r2.start + 1 + this._bufferService.buffer.ydisp, o2 = this._bufferService.buffer.ydisp + 1 + r2.end;
      if (this._currentLink.link.range.start.y >= n2 && this._currentLink.link.range.end.y <= o2 && (this._clearCurrentLink(n2, o2), this._lastMouseEvent)) {
        let l3 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
        l3 && this._askForLink(l3, false);
      }
    })));
  }
  _linkHover(e, i, r2) {
    this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, true), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), i.hover && i.hover(r2, i.text);
  }
  _fireUnderlineEvent(e, i) {
    let r2 = e.range, n2 = this._bufferService.buffer.ydisp, o2 = this._createLinkUnderlineEvent(r2.start.x - 1, r2.start.y - n2 - 1, r2.end.x, r2.end.y - n2 - 1, void 0);
    (i ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(o2);
  }
  _linkLeave(e, i, r2) {
    this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, false), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), i.leave && i.leave(r2, i.text);
  }
  _linkAtPosition(e, i) {
    let r2 = e.range.start.y * this._bufferService.cols + e.range.start.x, n2 = e.range.end.y * this._bufferService.cols + e.range.end.x, o2 = i.y * this._bufferService.cols + i.x;
    return r2 <= o2 && o2 <= n2;
  }
  _positionFromMouseEvent(e, i, r2) {
    let n2 = r2.getCoords(e, i, this._bufferService.cols, this._bufferService.rows);
    if (n2) return { x: n2[0], y: n2[1] + this._bufferService.buffer.ydisp };
  }
  _createLinkUnderlineEvent(e, i, r2, n2, o2) {
    return { x1: e, y1: i, x2: r2, y2: n2, cols: this._bufferService.cols, fg: o2 };
  }
};
hi = M([S(1, Dt), S(2, ce), S(3, F), S(4, lr)], hi);
function Ec(s15, t2) {
  return s15.text === t2.text && s15.range.start.x === t2.range.start.x && s15.range.start.y === t2.range.start.y && s15.range.end.x === t2.range.end.x && s15.range.end.y === t2.range.end.y;
}
var yn = class extends Sn {
  constructor(e = {}) {
    super(e);
    this._linkifier = this._register(new ye());
    this.browser = tn;
    this._keyDownHandled = false;
    this._keyDownSeen = false;
    this._keyPressHandled = false;
    this._unprocessedDeadKey = false;
    this._accessibilityManager = this._register(new ye());
    this._onCursorMove = this._register(new v$1());
    this.onCursorMove = this._onCursorMove.event;
    this._onKey = this._register(new v$1());
    this.onKey = this._onKey.event;
    this._onRender = this._register(new v$1());
    this.onRender = this._onRender.event;
    this._onSelectionChange = this._register(new v$1());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onTitleChange = this._register(new v$1());
    this.onTitleChange = this._onTitleChange.event;
    this._onBell = this._register(new v$1());
    this.onBell = this._onBell.event;
    this._onFocus = this._register(new v$1());
    this._onBlur = this._register(new v$1());
    this._onA11yCharEmitter = this._register(new v$1());
    this._onA11yTabEmitter = this._register(new v$1());
    this._onWillOpen = this._register(new v$1());
    this._setup(), this._decorationService = this._instantiationService.createInstance(Tn), this._instantiationService.setService(Be, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Qr), this._instantiationService.setService(lr, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(wt)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((i) => this.refresh(i?.start ?? 0, i?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((i) => this._reportWindowsOptions(i))), this._register(this._inputHandler.onColor((i) => this._handleColorEvent(i))), this._register($.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register($.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register($.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register($.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((i) => this._afterResize(i.cols, i.rows))), this._register(C(() => {
      this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
    }));
  }
  get linkifier() {
    return this._linkifier.value;
  }
  get onFocus() {
    return this._onFocus.event;
  }
  get onBlur() {
    return this._onBlur.event;
  }
  get onA11yChar() {
    return this._onA11yCharEmitter.event;
  }
  get onA11yTab() {
    return this._onA11yTabEmitter.event;
  }
  get onWillOpen() {
    return this._onWillOpen.event;
  }
  _handleColorEvent(e) {
    if (this._themeService) for (let i of e) {
      let r2, n2 = "";
      switch (i.index) {
        case 256:
          r2 = "foreground", n2 = "10";
          break;
        case 257:
          r2 = "background", n2 = "11";
          break;
        case 258:
          r2 = "cursor", n2 = "12";
          break;
        default:
          r2 = "ansi", n2 = "4;" + i.index;
      }
      switch (i.type) {
        case 0:
          let o2 = U.toColorRGB(r2 === "ansi" ? this._themeService.colors.ansi[i.index] : this._themeService.colors[r2]);
          this.coreService.triggerDataEvent(`${b.ESC}]${n2};${ml(o2)}${fs.ST}`);
          break;
        case 1:
          if (r2 === "ansi") this._themeService.modifyColors((l3) => l3.ansi[i.index] = j.toColor(...i.color));
          else {
            let l3 = r2;
            this._themeService.modifyColors((a) => a[l3] = j.toColor(...i.color));
          }
          break;
        case 2:
          this._themeService.restoreColor(i.index);
          break;
      }
    }
  }
  _setup() {
    super._setup(), this._customKeyEventHandler = void 0;
  }
  get buffer() {
    return this.buffers.active;
  }
  focus() {
    this.textarea && this.textarea.focus({ preventScroll: true });
  }
  _handleScreenReaderModeOptionChange(e) {
    e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)) : this._accessibilityManager.clear();
  }
  _handleTextAreaFocus(e) {
    this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
  }
  blur() {
    return this.textarea?.blur();
  }
  _handleTextAreaBlur() {
    this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
  }
  _syncTextArea() {
    if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
    let e = this.buffer.ybase + this.buffer.y, i = this.buffer.lines.get(e);
    if (!i) return;
    let r2 = Math.min(this.buffer.x, this.cols - 1), n2 = this._renderService.dimensions.css.cell.height, o2 = i.getWidth(r2), l3 = this._renderService.dimensions.css.cell.width * o2, a = this.buffer.y * this._renderService.dimensions.css.cell.height, u2 = r2 * this._renderService.dimensions.css.cell.width;
    this.textarea.style.left = u2 + "px", this.textarea.style.top = a + "px", this.textarea.style.width = l3 + "px", this.textarea.style.height = n2 + "px", this.textarea.style.lineHeight = n2 + "px", this.textarea.style.zIndex = "-5";
  }
  _initGlobal() {
    this._bindKeys(), this._register(L$1(this.element, "copy", (i) => {
      this.hasSelection() && Vs(i, this._selectionService);
    }));
    let e = (i) => qs(i, this.textarea, this.coreService, this.optionsService);
    this._register(L$1(this.textarea, "paste", e)), this._register(L$1(this.element, "paste", e)), Ss ? this._register(L$1(this.element, "mousedown", (i) => {
      i.button === 2 && Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })) : this._register(L$1(this.element, "contextmenu", (i) => {
      Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })), Bi && this._register(L$1(this.element, "auxclick", (i) => {
      i.button === 1 && Mn(i, this.textarea, this.screenElement);
    }));
  }
  _bindKeys() {
    this._register(L$1(this.textarea, "keyup", (e) => this._keyUp(e), true)), this._register(L$1(this.textarea, "keydown", (e) => this._keyDown(e), true)), this._register(L$1(this.textarea, "keypress", (e) => this._keyPress(e), true)), this._register(L$1(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(L$1(this.textarea, "compositionupdate", (e) => this._compositionHelper.compositionupdate(e))), this._register(L$1(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(L$1(this.textarea, "input", (e) => this._inputEvent(e), true)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
  }
  open(e) {
    if (!e) throw new Error("Terminal requires a parent element.");
    if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
      this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
      return;
    }
    this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
    let i = this._document.createDocumentFragment();
    this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(L$1(this.screenElement, "mousemove", (o2) => this.updateCursorStyle(o2))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i.appendChild(this.screenElement);
    let r2 = this.textarea = this._document.createElement("textarea");
    this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", mi.get()), Ts || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => r2.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(Jr, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(ae, this._coreBrowserService), this._register(L$1(this.textarea, "focus", (o2) => this._handleTextAreaFocus(o2))), this._register(L$1(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(jt, this._document, this._helperContainer), this._instantiationService.setService(nt, this._charSizeService), this._themeService = this._instantiationService.createInstance(ti), this._instantiationService.setService(Re, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ct), this._instantiationService.setService(or, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(Qt, this.rows, this.screenElement)), this._instantiationService.setService(ce, this._renderService), this._register(this._renderService.onRenderedViewportChange((o2) => this._onRender.fire(o2))), this.onResize((o2) => this._renderService.resize(o2.cols, o2.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance($t, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Xt), this._instantiationService.setService(Dt, this._mouseService);
    let n2 = this._linkifier.value = this._register(this._instantiationService.createInstance(hi, this.screenElement));
    this.element.appendChild(i);
    try {
      this._onWillOpen.fire(this.element);
    } catch {
    }
    this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
      this._renderService.handleCursorMove(), this._syncTextArea();
    })), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(zt, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((o2) => {
      super.scrollLines(o2, false), this.refresh(0, this.rows - 1);
    })), this._selectionService = this._register(this._instantiationService.createInstance(ei, this.element, this.screenElement, n2)), this._instantiationService.setService(Qs, this._selectionService), this._register(this._selectionService.onRequestScrollLines((o2) => this.scrollLines(o2.amount, o2.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((o2) => this._renderService.handleSelectionChanged(o2.start, o2.end, o2.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((o2) => {
      this.textarea.value = o2, this.textarea.focus(), this.textarea.select();
    })), this._register($.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
      this._selectionService.refresh(), this._viewport?.queueSync();
    })), this._register(this._instantiationService.createInstance(Gt, this.screenElement)), this._register(L$1(this.element, "mousedown", (o2) => this._selectionService.handleMouseDown(o2))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (o2) => this._handleScreenReaderModeOptionChange(o2))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (o2) => {
      !this._overviewRulerRenderer && o2 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement)));
    }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
  }
  _createRenderer() {
    return this._instantiationService.createInstance(Yt, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
  }
  bindMouse() {
    let e = this, i = this.element;
    function r2(l3) {
      let a = e._mouseService.getMouseReportCoords(l3, e.screenElement);
      if (!a) return false;
      let u2, h2;
      switch (l3.overrideType || l3.type) {
        case "mousemove":
          h2 = 32, l3.buttons === void 0 ? (u2 = 3, l3.button !== void 0 && (u2 = l3.button < 3 ? l3.button : 3)) : u2 = l3.buttons & 1 ? 0 : l3.buttons & 4 ? 1 : l3.buttons & 2 ? 2 : 3;
          break;
        case "mouseup":
          h2 = 0, u2 = l3.button < 3 ? l3.button : 3;
          break;
        case "mousedown":
          h2 = 1, u2 = l3.button < 3 ? l3.button : 3;
          break;
        case "wheel":
          if (e._customWheelEventHandler && e._customWheelEventHandler(l3) === false) return false;
          let c = l3.deltaY;
          if (c === 0 || e.coreMouseService.consumeWheelEvent(l3, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return false;
          h2 = c < 0 ? 0 : 1, u2 = 4;
          break;
        default:
          return false;
      }
      return h2 === void 0 || u2 === void 0 || u2 > 4 ? false : e.coreMouseService.triggerMouseEvent({ col: a.col, row: a.row, x: a.x, y: a.y, button: u2, action: h2, ctrl: l3.ctrlKey, alt: l3.altKey, shift: l3.shiftKey });
    }
    let n2 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, o2 = { mouseup: (l3) => (r2(l3), l3.buttons || (this._document.removeEventListener("mouseup", n2.mouseup), n2.mousedrag && this._document.removeEventListener("mousemove", n2.mousedrag)), this.cancel(l3)), wheel: (l3) => (r2(l3), this.cancel(l3, true)), mousedrag: (l3) => {
      l3.buttons && r2(l3);
    }, mousemove: (l3) => {
      l3.buttons || r2(l3);
    } };
    this._register(this.coreMouseService.onProtocolChange((l3) => {
      l3 ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(l3)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), l3 & 8 ? n2.mousemove || (i.addEventListener("mousemove", o2.mousemove), n2.mousemove = o2.mousemove) : (i.removeEventListener("mousemove", n2.mousemove), n2.mousemove = null), l3 & 16 ? n2.wheel || (i.addEventListener("wheel", o2.wheel, { passive: false }), n2.wheel = o2.wheel) : (i.removeEventListener("wheel", n2.wheel), n2.wheel = null), l3 & 2 ? n2.mouseup || (n2.mouseup = o2.mouseup) : (this._document.removeEventListener("mouseup", n2.mouseup), n2.mouseup = null), l3 & 4 ? n2.mousedrag || (n2.mousedrag = o2.mousedrag) : (this._document.removeEventListener("mousemove", n2.mousedrag), n2.mousedrag = null);
    })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(L$1(i, "mousedown", (l3) => {
      if (l3.preventDefault(), this.focus(), !(!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(l3))) return r2(l3), n2.mouseup && this._document.addEventListener("mouseup", n2.mouseup), n2.mousedrag && this._document.addEventListener("mousemove", n2.mousedrag), this.cancel(l3);
    })), this._register(L$1(i, "wheel", (l3) => {
      if (!n2.wheel) {
        if (this._customWheelEventHandler && this._customWheelEventHandler(l3) === false) return false;
        if (!this.buffer.hasScrollback) {
          if (l3.deltaY === 0) return false;
          if (e.coreMouseService.consumeWheelEvent(l3, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return this.cancel(l3, true);
          let h2 = b.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (l3.deltaY < 0 ? "A" : "B");
          return this.coreService.triggerDataEvent(h2, true), this.cancel(l3, true);
        }
      }
    }, { passive: false }));
  }
  refresh(e, i) {
    this._renderService?.refreshRows(e, i);
  }
  updateCursorStyle(e) {
    this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
  }
  _showCursor() {
    this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
  }
  scrollLines(e, i) {
    this._viewport ? this._viewport.scrollLines(e) : super.scrollLines(e, i), this.refresh(0, this.rows - 1);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    e && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  paste(e) {
    Cn(e, this.textarea, this.coreService, this.optionsService);
  }
  attachCustomKeyEventHandler(e) {
    this._customKeyEventHandler = e;
  }
  attachCustomWheelEventHandler(e) {
    this._customWheelEventHandler = e;
  }
  registerLinkProvider(e) {
    return this._linkProviderService.registerLinkProvider(e);
  }
  registerCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    let i = this._characterJoinerService.register(e);
    return this.refresh(0, this.rows - 1), i;
  }
  deregisterCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
  }
  get markers() {
    return this.buffer.markers;
  }
  registerMarker(e) {
    return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
  }
  registerDecoration(e) {
    return this._decorationService.registerDecoration(e);
  }
  hasSelection() {
    return this._selectionService ? this._selectionService.hasSelection : false;
  }
  select(e, i, r2) {
    this._selectionService.setSelection(e, i, r2);
  }
  getSelection() {
    return this._selectionService ? this._selectionService.selectionText : "";
  }
  getSelectionPosition() {
    if (!(!this._selectionService || !this._selectionService.hasSelection)) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
  }
  clearSelection() {
    this._selectionService?.clearSelection();
  }
  selectAll() {
    this._selectionService?.selectAll();
  }
  selectLines(e, i) {
    this._selectionService?.selectLines(e, i);
  }
  _keyDown(e) {
    if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    let i = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
    if (!i && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
    !i && (e.key === "Dead" || e.key === "AltGraph") && (this._unprocessedDeadKey = true);
    let r2 = Il(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
    if (this.updateCursorStyle(e), r2.type === 3 || r2.type === 2) {
      let n2 = this.rows - 1;
      return this.scrollLines(r2.type === 2 ? -n2 : n2), this.cancel(e, true);
    }
    if (r2.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e) || (r2.cancel && this.cancel(e, true), !r2.key) || e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) return true;
    if (this._unprocessedDeadKey) return this._unprocessedDeadKey = false, true;
    if ((r2.key === b.ETX || r2.key === b.CR) && (this.textarea.value = ""), this._onKey.fire({ key: r2.key, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(r2.key, true), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey) return this.cancel(e, true);
    this._keyDownHandled = true;
  }
  _isThirdLevelShift(e, i) {
    let r2 = e.isMac && !this.options.macOptionIsMeta && i.altKey && !i.ctrlKey && !i.metaKey || e.isWindows && i.altKey && i.ctrlKey && !i.metaKey || e.isWindows && i.getModifierState("AltGraph");
    return i.type === "keypress" ? r2 : r2 && (!i.keyCode || i.keyCode > 47);
  }
  _keyUp(e) {
    this._keyDownSeen = false, !(this._customKeyEventHandler && this._customKeyEventHandler(e) === false) && (Tc(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = false);
  }
  _keyPress(e) {
    let i;
    if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    if (this.cancel(e), e.charCode) i = e.charCode;
    else if (e.which === null || e.which === void 0) i = e.keyCode;
    else if (e.which !== 0 && e.charCode !== 0) i = e.which;
    else return false;
    return !i || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) ? false : (i = String.fromCharCode(i), this._onKey.fire({ key: i, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(i, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, true);
  }
  _inputEvent(e) {
    if (e.data && e.inputType === "insertText" && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
      if (this._keyPressHandled) return false;
      this._unprocessedDeadKey = false;
      let i = e.data;
      return this.coreService.triggerDataEvent(i, true), this.cancel(e), true;
    }
    return false;
  }
  resize(e, i) {
    if (e === this.cols && i === this.rows) {
      this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
      return;
    }
    super.resize(e, i);
  }
  _afterResize(e, i) {
    this._charSizeService?.measure();
  }
  clear() {
    if (!(this.buffer.ybase === 0 && this.buffer.y === 0)) {
      this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
      for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(X));
      this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
    }
  }
  reset() {
    this.options.rows = this.rows, this.options.cols = this.cols;
    let e = this._customKeyEventHandler;
    this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
  }
  clearTextureAtlas() {
    this._renderService?.clearTextureAtlas();
  }
  _reportFocus() {
    this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(b.ESC + "[I") : this.coreService.triggerDataEvent(b.ESC + "[O");
  }
  _reportWindowsOptions(e) {
    if (this._renderService) switch (e) {
      case 0:
        let i = this._renderService.dimensions.css.canvas.width.toFixed(0), r2 = this._renderService.dimensions.css.canvas.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[4;${r2};${i}t`);
        break;
      case 1:
        let n2 = this._renderService.dimensions.css.cell.width.toFixed(0), o2 = this._renderService.dimensions.css.cell.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[6;${o2};${n2}t`);
        break;
    }
  }
  cancel(e, i) {
    if (!(!this.options.cancelEvents && !i)) return e.preventDefault(), e.stopPropagation(), false;
  }
};
function Tc(s15) {
  return s15.keyCode === 16 || s15.keyCode === 17 || s15.keyCode === 18;
}
var xn = class {
  constructor() {
    this._addons = [];
  }
  dispose() {
    for (let t2 = this._addons.length - 1; t2 >= 0; t2--) this._addons[t2].instance.dispose();
  }
  loadAddon(t2, e) {
    let i = { instance: e, dispose: e.dispose, isDisposed: false };
    this._addons.push(i), e.dispose = () => this._wrappedAddonDispose(i), e.activate(t2);
  }
  _wrappedAddonDispose(t2) {
    if (t2.isDisposed) return;
    let e = -1;
    for (let i = 0; i < this._addons.length; i++) if (this._addons[i] === t2) {
      e = i;
      break;
    }
    if (e === -1) throw new Error("Could not dispose an addon that has not been loaded");
    t2.isDisposed = true, t2.dispose.apply(t2.instance), this._addons.splice(e, 1);
  }
};
var wn = class {
  constructor(t2) {
    this._line = t2;
  }
  get isWrapped() {
    return this._line.isWrapped;
  }
  get length() {
    return this._line.length;
  }
  getCell(t2, e) {
    if (!(t2 < 0 || t2 >= this._line.length)) return e ? (this._line.loadCell(t2, e), e) : this._line.loadCell(t2, new q());
  }
  translateToString(t2, e, i) {
    return this._line.translateToString(t2, e, i);
  }
};
var Ji = class {
  constructor(t2, e) {
    this._buffer = t2;
    this.type = e;
  }
  init(t2) {
    return this._buffer = t2, this;
  }
  get cursorY() {
    return this._buffer.y;
  }
  get cursorX() {
    return this._buffer.x;
  }
  get viewportY() {
    return this._buffer.ydisp;
  }
  get baseY() {
    return this._buffer.ybase;
  }
  get length() {
    return this._buffer.lines.length;
  }
  getLine(t2) {
    let e = this._buffer.lines.get(t2);
    if (e) return new wn(e);
  }
  getNullCell() {
    return new q();
  }
};
var Dn = class extends D {
  constructor(e) {
    super();
    this._core = e;
    this._onBufferChange = this._register(new v$1());
    this.onBufferChange = this._onBufferChange.event;
    this._normal = new Ji(this._core.buffers.normal, "normal"), this._alternate = new Ji(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
  }
  get active() {
    if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
    if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
    throw new Error("Active buffer is neither normal nor alternate");
  }
  get normal() {
    return this._normal.init(this._core.buffers.normal);
  }
  get alternate() {
    return this._alternate.init(this._core.buffers.alt);
  }
};
var Rn = class {
  constructor(t2) {
    this._core = t2;
  }
  registerCsiHandler(t2, e) {
    return this._core.registerCsiHandler(t2, (i) => e(i.toArray()));
  }
  addCsiHandler(t2, e) {
    return this.registerCsiHandler(t2, e);
  }
  registerDcsHandler(t2, e) {
    return this._core.registerDcsHandler(t2, (i, r2) => e(i, r2.toArray()));
  }
  addDcsHandler(t2, e) {
    return this.registerDcsHandler(t2, e);
  }
  registerEscHandler(t2, e) {
    return this._core.registerEscHandler(t2, e);
  }
  addEscHandler(t2, e) {
    return this.registerEscHandler(t2, e);
  }
  registerOscHandler(t2, e) {
    return this._core.registerOscHandler(t2, e);
  }
  addOscHandler(t2, e) {
    return this.registerOscHandler(t2, e);
  }
};
var Ln = class {
  constructor(t2) {
    this._core = t2;
  }
  register(t2) {
    this._core.unicodeService.register(t2);
  }
  get versions() {
    return this._core.unicodeService.versions;
  }
  get activeVersion() {
    return this._core.unicodeService.activeVersion;
  }
  set activeVersion(t2) {
    this._core.unicodeService.activeVersion = t2;
  }
};
var Ic = ["cols", "rows"], Ue = 0, Dl = class extends D {
  constructor(t2) {
    super(), this._core = this._register(new yn(t2)), this._addonManager = this._register(new xn()), this._publicOptions = { ...this._core.options };
    let e = (r2) => this._core.options[r2], i = (r2, n2) => {
      this._checkReadonlyOptions(r2), this._core.options[r2] = n2;
    };
    for (let r2 in this._core.options) {
      let n2 = { get: e.bind(this, r2), set: i.bind(this, r2) };
      Object.defineProperty(this._publicOptions, r2, n2);
    }
  }
  _checkReadonlyOptions(t2) {
    if (Ic.includes(t2)) throw new Error(`Option "${t2}" can only be set in the constructor`);
  }
  _checkProposedApi() {
    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
  }
  get onBell() {
    return this._core.onBell;
  }
  get onBinary() {
    return this._core.onBinary;
  }
  get onCursorMove() {
    return this._core.onCursorMove;
  }
  get onData() {
    return this._core.onData;
  }
  get onKey() {
    return this._core.onKey;
  }
  get onLineFeed() {
    return this._core.onLineFeed;
  }
  get onRender() {
    return this._core.onRender;
  }
  get onResize() {
    return this._core.onResize;
  }
  get onScroll() {
    return this._core.onScroll;
  }
  get onSelectionChange() {
    return this._core.onSelectionChange;
  }
  get onTitleChange() {
    return this._core.onTitleChange;
  }
  get onWriteParsed() {
    return this._core.onWriteParsed;
  }
  get element() {
    return this._core.element;
  }
  get parser() {
    return this._parser || (this._parser = new Rn(this._core)), this._parser;
  }
  get unicode() {
    return this._checkProposedApi(), new Ln(this._core);
  }
  get textarea() {
    return this._core.textarea;
  }
  get rows() {
    return this._core.rows;
  }
  get cols() {
    return this._core.cols;
  }
  get buffer() {
    return this._buffer || (this._buffer = this._register(new Dn(this._core))), this._buffer;
  }
  get markers() {
    return this._checkProposedApi(), this._core.markers;
  }
  get modes() {
    let t2 = this._core.coreService.decPrivateModes, e = "none";
    switch (this._core.coreMouseService.activeProtocol) {
      case "X10":
        e = "x10";
        break;
      case "VT200":
        e = "vt200";
        break;
      case "DRAG":
        e = "drag";
        break;
      case "ANY":
        e = "any";
        break;
    }
    return { applicationCursorKeysMode: t2.applicationCursorKeys, applicationKeypadMode: t2.applicationKeypad, bracketedPasteMode: t2.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e, originMode: t2.origin, reverseWraparoundMode: t2.reverseWraparound, sendFocusMode: t2.sendFocus, synchronizedOutputMode: t2.synchronizedOutput, wraparoundMode: t2.wraparound };
  }
  get options() {
    return this._publicOptions;
  }
  set options(t2) {
    for (let e in t2) this._publicOptions[e] = t2[e];
  }
  blur() {
    this._core.blur();
  }
  focus() {
    this._core.focus();
  }
  input(t2, e = true) {
    this._core.input(t2, e);
  }
  resize(t2, e) {
    this._verifyIntegers(t2, e), this._core.resize(t2, e);
  }
  open(t2) {
    this._core.open(t2);
  }
  attachCustomKeyEventHandler(t2) {
    this._core.attachCustomKeyEventHandler(t2);
  }
  attachCustomWheelEventHandler(t2) {
    this._core.attachCustomWheelEventHandler(t2);
  }
  registerLinkProvider(t2) {
    return this._core.registerLinkProvider(t2);
  }
  registerCharacterJoiner(t2) {
    return this._checkProposedApi(), this._core.registerCharacterJoiner(t2);
  }
  deregisterCharacterJoiner(t2) {
    this._checkProposedApi(), this._core.deregisterCharacterJoiner(t2);
  }
  registerMarker(t2 = 0) {
    return this._verifyIntegers(t2), this._core.registerMarker(t2);
  }
  registerDecoration(t2) {
    return this._checkProposedApi(), this._verifyPositiveIntegers(t2.x ?? 0, t2.width ?? 0, t2.height ?? 0), this._core.registerDecoration(t2);
  }
  hasSelection() {
    return this._core.hasSelection();
  }
  select(t2, e, i) {
    this._verifyIntegers(t2, e, i), this._core.select(t2, e, i);
  }
  getSelection() {
    return this._core.getSelection();
  }
  getSelectionPosition() {
    return this._core.getSelectionPosition();
  }
  clearSelection() {
    this._core.clearSelection();
  }
  selectAll() {
    this._core.selectAll();
  }
  selectLines(t2, e) {
    this._verifyIntegers(t2, e), this._core.selectLines(t2, e);
  }
  dispose() {
    super.dispose();
  }
  scrollLines(t2) {
    this._verifyIntegers(t2), this._core.scrollLines(t2);
  }
  scrollPages(t2) {
    this._verifyIntegers(t2), this._core.scrollPages(t2);
  }
  scrollToTop() {
    this._core.scrollToTop();
  }
  scrollToBottom() {
    this._core.scrollToBottom();
  }
  scrollToLine(t2) {
    this._verifyIntegers(t2), this._core.scrollToLine(t2);
  }
  clear() {
    this._core.clear();
  }
  write(t2, e) {
    this._core.write(t2, e);
  }
  writeln(t2, e) {
    this._core.write(t2), this._core.write(`\r
`, e);
  }
  paste(t2) {
    this._core.paste(t2);
  }
  refresh(t2, e) {
    this._verifyIntegers(t2, e), this._core.refresh(t2, e);
  }
  reset() {
    this._core.reset();
  }
  clearTextureAtlas() {
    this._core.clearTextureAtlas();
  }
  loadAddon(t2) {
    this._addonManager.loadAddon(this, t2);
  }
  static get strings() {
    return { get promptLabel() {
      return mi.get();
    }, set promptLabel(t2) {
      mi.set(t2);
    }, get tooMuchOutput() {
      return _i.get();
    }, set tooMuchOutput(t2) {
      _i.set(t2);
    } };
  }
  _verifyIntegers(...t2) {
    for (Ue of t2) if (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0) throw new Error("This API only accepts integers");
  }
  _verifyPositiveIntegers(...t2) {
    for (Ue of t2) if (Ue && (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0 || Ue < 0)) throw new Error("This API only accepts positive integers");
  }
};
/**
 * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * @license MIT
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 */
var h = 2, _$1 = 1, o = class {
  activate(e) {
    this._terminal = e;
  }
  dispose() {
  }
  fit() {
    let e = this.proposeDimensions();
    if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
    let t2 = this._terminal._core;
    (this._terminal.rows !== e.rows || this._terminal.cols !== e.cols) && (t2._renderService.clear(), this._terminal.resize(e.cols, e.rows));
  }
  proposeDimensions() {
    if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
    let t2 = this._terminal._core._renderService.dimensions;
    if (t2.css.cell.width === 0 || t2.css.cell.height === 0) return;
    let s15 = this._terminal.options.scrollback === 0 ? 0 : this._terminal.options.overviewRuler?.width || 14, r2 = window.getComputedStyle(this._terminal.element.parentElement), l3 = parseInt(r2.getPropertyValue("height")), a = Math.max(0, parseInt(r2.getPropertyValue("width"))), i = window.getComputedStyle(this._terminal.element), n2 = { top: parseInt(i.getPropertyValue("padding-top")), bottom: parseInt(i.getPropertyValue("padding-bottom")), right: parseInt(i.getPropertyValue("padding-right")), left: parseInt(i.getPropertyValue("padding-left")) }, m2 = n2.top + n2.bottom, d = n2.right + n2.left, c = l3 - m2, p2 = a - d - s15;
    return { cols: Math.max(h, Math.floor(p2 / t2.css.cell.width)), rows: Math.max(_$1, Math.floor(c / t2.css.cell.height)) };
  }
};
/**
 * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * @license MIT
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 */
var v2 = class {
  constructor(e, t2, n2, o2 = {}) {
    this._terminal = e;
    this._regex = t2;
    this._handler = n2;
    this._options = o2;
  }
  provideLinks(e, t2) {
    let n2 = g.computeLink(e, this._regex, this._terminal, this._handler);
    t2(this._addCallbacks(n2));
  }
  _addCallbacks(e) {
    return e.map((t2) => (t2.leave = this._options.leave, t2.hover = (n2, o2) => {
      if (this._options.hover) {
        let { range: p2 } = t2;
        this._options.hover(n2, o2, p2);
      }
    }, t2));
  }
};
function k(l3) {
  try {
    let e = new URL(l3), t2 = e.password && e.username ? `${e.protocol}//${e.username}:${e.password}@${e.host}` : e.username ? `${e.protocol}//${e.username}@${e.host}` : `${e.protocol}//${e.host}`;
    return l3.toLocaleLowerCase().startsWith(t2.toLocaleLowerCase());
  } catch {
    return false;
  }
}
var g = class l2 {
  static computeLink(e, t2, n2, o2) {
    let p2 = new RegExp(t2.source, (t2.flags || "") + "g"), [i, r2] = l2._getWindowedLineStrings(e - 1, n2), s15 = i.join(""), a, d = [];
    for (; a = p2.exec(s15); ) {
      let u2 = a[0];
      if (!k(u2)) continue;
      let [c, h2] = l2._mapStrIdx(n2, r2, 0, a.index), [m2, f2] = l2._mapStrIdx(n2, c, h2, u2.length);
      if (c === -1 || h2 === -1 || m2 === -1 || f2 === -1) continue;
      let b2 = { start: { x: h2 + 1, y: c + 1 }, end: { x: f2, y: m2 + 1 } };
      d.push({ range: b2, text: u2, activate: o2 });
    }
    return d;
  }
  static _getWindowedLineStrings(e, t2) {
    let n2, o2 = e, p2 = e, i = 0, r2 = "", s15 = [];
    if (n2 = t2.buffer.active.getLine(e)) {
      let a = n2.translateToString(true);
      if (n2.isWrapped && a[0] !== " ") {
        for (i = 0; (n2 = t2.buffer.active.getLine(--o2)) && i < 2048 && (r2 = n2.translateToString(true), i += r2.length, s15.push(r2), !(!n2.isWrapped || r2.indexOf(" ") !== -1)); ) ;
        s15.reverse();
      }
      for (s15.push(a), i = 0; (n2 = t2.buffer.active.getLine(++p2)) && n2.isWrapped && i < 2048 && (r2 = n2.translateToString(true), i += r2.length, s15.push(r2), r2.indexOf(" ") === -1); ) ;
    }
    return [s15, o2];
  }
  static _mapStrIdx(e, t2, n2, o2) {
    let p2 = e.buffer.active, i = p2.getNullCell(), r2 = n2;
    for (; o2; ) {
      let s15 = p2.getLine(t2);
      if (!s15) return [-1, -1];
      for (let a = r2; a < s15.length; ++a) {
        s15.getCell(a, i);
        let d = i.getChars();
        if (i.getWidth() && (o2 -= d.length || 1, a === s15.length - 1 && d === "")) {
          let c = p2.getLine(t2 + 1);
          c && c.isWrapped && (c.getCell(0, i), i.getWidth() === 2 && (o2 += 1));
        }
        if (o2 < 0) return [t2, a];
      }
      t2++, r2 = 0;
    }
    return [t2, r2];
  }
};
var _ = /(https?|HTTPS?):[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/;
function w(l3, e) {
  let t2 = window.open();
  if (t2) {
    try {
      t2.opener = null;
    } catch {
    }
    t2.location.href = e;
  } else console.warn("Opening link blocked as opener could not be cleared");
}
var L = class {
  constructor(e = w, t2 = {}) {
    this._handler = e;
    this._options = t2;
  }
  activate(e) {
    this._terminal = e;
    let t2 = this._options, n2 = t2.urlRegex || _;
    this._linkProvider = this._terminal.registerLinkProvider(new v2(this._terminal, n2, this._handler, t2));
  }
  dispose() {
    this._linkProvider?.dispose();
  }
};
let tabCounter = 1;
function TerminalPanel({ cwd }) {
  const [tabs, setTabs] = reactExports.useState([]);
  const [activeId, setActiveId] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const instances = reactExports.useRef(/* @__PURE__ */ new Map());
  function createTab() {
    const id2 = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const name = `bash ${tabCounter++}`;
    setTabs((prev) => [...prev, { id: id2, name }]);
    setActiveId(id2);
    setTimeout(() => spawnTerminal(id2), 50);
  }
  async function spawnTerminal(id2) {
    const el2 = document.getElementById(`xterm-${id2}`);
    if (!el2) return;
    const xterm = new Dl({
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        selectionBackground: "#264f78",
        black: "#1e1e1e",
        brightBlack: "#555",
        red: "#f44747",
        brightRed: "#f44747",
        green: "#4ec9b0",
        brightGreen: "#4ec9b0",
        yellow: "#dcdcaa",
        brightYellow: "#dcdcaa",
        blue: "#569cd6",
        brightBlue: "#569cd6",
        magenta: "#c586c0",
        brightMagenta: "#c586c0",
        cyan: "#9cdcfe",
        brightCyan: "#9cdcfe",
        white: "#d4d4d4",
        brightWhite: "#ffffff"
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 13,
      lineHeight: 1.4,
      cursorBlink: true,
      scrollback: 5e3
    });
    const fit = new o();
    xterm.loadAddon(fit);
    xterm.loadAddon(new L());
    xterm.open(el2);
    fit.fit();
    instances.current.set(id2, { xterm, fit });
    await window.api.terminalCreate(id2, cwd || "");
    window.api.onTerminalData(id2, (data) => xterm.write(data));
    window.api.onTerminalExit(id2, () => {
      xterm.write("\r\n\x1B[31m[Process exited]\x1B[0m\r\n");
    });
    xterm.onData((data) => window.api.terminalWrite(id2, data));
    const ro2 = new ResizeObserver(() => {
      fit.fit();
      const { cols, rows } = xterm;
      window.api.terminalResize(id2, cols, rows);
    });
    ro2.observe(el2);
  }
  function closeTab(id2) {
    window.api.terminalKill(id2);
    window.api.offTerminalData(id2);
    instances.current.get(id2)?.xterm.dispose();
    instances.current.delete(id2);
    setTabs((prev) => {
      const next = prev.filter((t2) => t2.id !== id2);
      if (id2 === activeId) setActiveId(next.length > 0 ? next[next.length - 1].id : null);
      return next;
    });
  }
  reactExports.useEffect(() => {
    tabs.forEach((t2) => {
      const el2 = document.getElementById(`xterm-${t2.id}`);
      if (el2) el2.style.display = t2.id === activeId ? "block" : "none";
    });
    if (activeId) {
      setTimeout(() => instances.current.get(activeId)?.fit.fit(), 30);
    }
  }, [activeId, tabs]);
  reactExports.useEffect(() => {
    tabCounter = 1;
    createTab();
    return () => {
      instances.current.forEach((value, id2) => {
        window.api.terminalKill(id2);
        window.api.offTerminalData(id2);
        value.xterm.dispose();
      });
      instances.current.clear();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "terminal-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "terminal-tabbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "terminal-tabs", children: tabs.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `terminal-tab ${t2.id === activeId ? "terminal-tab--active" : ""}`,
          onClick: () => setActiveId(t2.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t2.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "terminal-tab-close",
                onClick: (e) => {
                  e.stopPropagation();
                  closeTab(t2.id);
                },
                children: "×"
              }
            )
          ]
        },
        t2.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "terminal-tabbar-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "terminal-action-btn", onClick: createTab, title: "New Terminal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z" }) }) }),
        activeId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "terminal-action-btn", onClick: () => closeTab(activeId), title: "Kill Terminal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "terminal-body", ref: containerRef, children: tabs.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: `xterm-${t2.id}`,
        className: "terminal-xterm",
        style: { display: t2.id === activeId ? "block" : "none" }
      },
      t2.id
    )) })
  ] });
}
function Modal({ title, children, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-modal", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-modal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-modal-title", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-modal-close", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-modal-body", children })
  ] }) });
}
const FileIcon = ({ path }) => {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "js") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-file-icon sc-file-icon--js", children: "JS" });
  if (ext === "ts") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-file-icon sc-file-icon--ts", children: "TS" });
  if (ext === "tsx" || ext === "jsx") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-file-icon sc-file-icon--react", children: "⚛" });
  if (ext === "css") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-file-icon sc-file-icon--css", children: "CSS" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-file-icon" });
};
function SourceControl({ rootPath, model, onSelectFile, onSelectDiff, user }) {
  const [gitInfo, setGitInfo] = reactExports.useState({ branch: "", ahead: 0, behind: 0, changes: [] });
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [genLoading, setGenLoading] = reactExports.useState(false);
  const [commitMsg, setCommitMsg] = reactExports.useState("");
  const [isChangesExpanded, setIsChangesExpanded] = reactExports.useState(true);
  const [isStagedExpanded, setIsStagedExpanded] = reactExports.useState(true);
  const [isGraphExpanded, setIsGraphExpanded] = reactExports.useState(true);
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const [remoteUrl, setRemoteUrl] = reactExports.useState(null);
  const [isGitRepo, setIsGitRepo] = reactExports.useState(true);
  const [showPublish, setShowPublish] = reactExports.useState(false);
  const [publishName, setPublishName] = reactExports.useState("");
  const [publishDesc, setPublishDesc] = reactExports.useState("");
  const [publishPrivate, setPublishPrivate] = reactExports.useState(false);
  const [publishing, setPublishing] = reactExports.useState(false);
  const [publishError, setPublishError] = reactExports.useState("");
  const flash = (text, ok2 = true) => {
    setStatusMsg({ text, ok: ok2 });
    setTimeout(() => setStatusMsg(null), 4e3);
  };
  const refreshGit = reactExports.useCallback(async () => {
    if (!rootPath) return;
    setLoading(true);
    try {
      const isRepo = await window.api.gitIsRepo(rootPath);
      if (!isRepo) {
        setIsGitRepo(false);
        setLoading(false);
        return;
      }
      setIsGitRepo(true);
      const [info, log, remote] = await Promise.all([
        window.api.getGitStatus(rootPath).catch(() => ({ branch: "main", ahead: 0, behind: 0, changes: [] })),
        window.api.gitLog(rootPath).catch(() => []),
        window.api.gitGetRemote(rootPath).catch(() => null)
      ]);
      setGitInfo({ ...info, branch: info.branch || "main" });
      setHistory(log);
      setRemoteUrl(remote);
    } catch {
      setIsGitRepo(false);
    } finally {
      setLoading(false);
    }
  }, [rootPath]);
  reactExports.useEffect(() => {
    refreshGit();
    const interval = setInterval(refreshGit, 3e4);
    return () => clearInterval(interval);
  }, [refreshGit]);
  const handleInit = async () => {
    if (!rootPath) return;
    setLoading(true);
    try {
      const res = await window.api.gitInit(rootPath);
      if (res.success) {
        flash("Repository initialized on main branch");
        await refreshGit();
      } else {
        flash("Init failed: " + res.error, false);
      }
    } catch (e) {
      flash("Init error: " + (e?.message || "unknown"), false);
    } finally {
      setLoading(false);
    }
  };
  const openPublish = () => {
    if (!user?.token) {
      flash("Sign in with a GitHub token first (Account panel)", false);
      return;
    }
    setPublishName(rootPath?.split(/[\\/]/).pop() || "");
    setPublishDesc("");
    setPublishPrivate(false);
    setPublishError("");
    setShowPublish(true);
  };
  const handlePublish = async () => {
    if (!rootPath || !user?.token) return;
    setPublishing(true);
    setPublishError("");
    try {
      const created = await window.api.githubCreateRepo(user.token, publishName, publishPrivate, publishDesc);
      if (!created.success || !created.cloneUrl) {
        setPublishError(created.error || "Failed to create repository on GitHub");
        return;
      }
      const authUrl = created.cloneUrl.replace("https://", `https://${encodeURIComponent(user.token)}@`);
      await window.api.gitRemoteAdd(rootPath, "origin", authUrl);
      if (history.length === 0) {
        await window.api.gitStage(rootPath, ".");
        await window.api.gitCommit(rootPath, "Initial commit");
      }
      const pushed = await window.api.gitPushUpstream(rootPath, gitInfo.branch || "main");
      if (!pushed.success) {
        setPublishError("Repo created but push failed: " + pushed.error);
        return;
      }
      setShowPublish(false);
      flash(`Published to github.com/${user.login}/${publishName}`);
      refreshGit();
    } finally {
      setPublishing(false);
    }
  };
  const handleCommit = async () => {
    if (!rootPath || !commitMsg.trim()) return;
    const stagedCount = gitInfo.changes.filter((c) => c.status[0] !== " " && c.status[0] !== "?").length;
    if (stagedCount === 0) {
      flash("No staged changes to commit", false);
      return;
    }
    setLoading(true);
    const res = await window.api.gitCommit(rootPath, commitMsg);
    if (res.success) {
      setCommitMsg("");
      refreshGit();
      flash("Committed successfully");
    } else flash("Commit failed: " + res.error, false);
    setLoading(false);
  };
  const handleGenerateMessage = async () => {
    if (!rootPath || !model) return;
    const diff = await window.api.gitGetStagedDiff(rootPath);
    if (!diff.trim()) {
      flash("Stage some changes first", false);
      return;
    }
    setGenLoading(true);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: false,
          prompt: `Generate a concise git commit message (Conventional Commits) for:
${diff.slice(0, 4e3)}`,
          system: "Return ONLY the commit message. No quotes, no prefix."
        })
      });
      if (!res.ok) throw new Error("AI service unavailable");
      const data = await res.json();
      setCommitMsg(data.response.trim().replace(/^[\"']|[\"']$/g, ""));
    } catch {
      flash("AI unavailable — is Ollama running?", false);
    } finally {
      setGenLoading(false);
    }
  };
  const handleStage = async (path) => {
    if (!rootPath) return;
    await window.api.gitStage(rootPath, path);
    refreshGit();
  };
  const handleUnstage = async (path) => {
    if (!rootPath) return;
    await window.api.gitUnstage(rootPath, path);
    refreshGit();
  };
  const handlePush = async () => {
    if (!rootPath) return;
    setLoading(true);
    const res = await window.api.gitPush(rootPath);
    if (res.success) {
      refreshGit();
      flash("Pushed successfully");
      setLoading(false);
      return;
    }
    if (res.error?.includes("No configured push destination") || res.error?.includes("no upstream")) {
      setLoading(false);
      openPublish();
      return;
    }
    const res2 = await window.api.gitPushUpstream(rootPath, gitInfo.branch || "main");
    if (res2.success) {
      refreshGit();
      flash("Pushed and set upstream");
    } else flash("Push failed: " + res2.error, false);
    setLoading(false);
  };
  const handlePull = async () => {
    if (!rootPath) return;
    if (!remoteUrl) {
      flash("No remote configured. Publish the project first.", false);
      return;
    }
    setLoading(true);
    const res = await window.api.gitPull(rootPath);
    if (res.success) {
      refreshGit();
      flash("Pulled successfully");
    } else flash("Pull failed: " + res.error, false);
    setLoading(false);
  };
  const stagedChanges = gitInfo.changes.filter((c) => c.status[0] !== " " && c.status[0] !== "?");
  const unstagedChanges = gitInfo.changes.filter((c) => c.status[1] !== " " || c.status === "??");
  if (!rootPath) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "source-control-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open a folder to see source control" })
    ] });
  }
  if (!isGitRepo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "source-control-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Not a Git repository" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-init-btn", onClick: handleInit, disabled: loading, children: loading ? "Initializing…" : "Initialize Repository" }),
      user?.token && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sc-init-hint", children: "After init you can publish to your GitHub account." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showPublish && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "Publish to GitHub", onClose: () => setShowPublish(false), children: !user?.token ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sc-modal-warn", children: "Please sign in with a GitHub token in the Account panel first." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-modal-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Repository Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "login-input",
            value: publishName,
            onChange: (e) => setPublishName(e.target.value),
            placeholder: "my-project"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-modal-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Description (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "login-input",
            value: publishDesc,
            onChange: (e) => setPublishDesc(e.target.value),
            placeholder: "Short description…"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sc-modal-check", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: publishPrivate, onChange: (e) => setPublishPrivate(e.target.checked) }),
        "Private repository"
      ] }),
      publishError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-error", children: publishError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-publish-btn", onClick: handlePublish, disabled: publishing || !publishName.trim(), children: publishing ? "Publishing…" : `Publish to github.com/${user.login}` })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "source-control-view", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Source Control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-header-actions", children: [
          statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `sc-status-flash ${statusMsg.ok ? "sc-status-flash--ok" : "sc-status-flash--err"}`, children: statusMsg.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-action-btn", onClick: refreshGit, title: "Refresh", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", className: loading ? "spinning" : "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-repo-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", style: { opacity: 0.6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-repo-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-repo-name", children: rootPath.split(/[\\/]/).pop() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sc-repo-branch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "10", height: "10", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2-1V4.5a1.5 1.5 0 1 1 1 0v7a1.5 1.5 0 0 1-1 0zm2-8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" }) }),
            gitInfo.branch || "main",
            gitInfo.ahead > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "↑",
              gitInfo.ahead
            ] }),
            gitInfo.behind > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "↓",
              gitInfo.behind
            ] }),
            remoteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sc-remote-badge", title: remoteUrl, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "10", height: "10", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z" }) }),
              "GitHub"
            ] })
          ] })
        ] }),
        !remoteUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-publish-small-btn", onClick: openPublish, title: "Publish to GitHub", children: "↑ Publish" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-section sc-section--changes", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-commit-box", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-input-wrapper", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                placeholder: "Commit message (⌘Enter to commit)",
                rows: 2,
                value: commitMsg,
                onChange: (e) => setCommitMsg(e.target.value),
                onKeyDown: (e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleCommit();
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `sc-generate-btn ${genLoading ? "spinning" : ""}`,
                onClick: handleGenerateMessage,
                disabled: genLoading,
                title: "Generate Message with AI",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 0L6.5 4.5L2 6L6.5 7.5L8 12L9.5 7.5L14 6L9.5 4.5L8 0Z" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-commit-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "sc-commit-btn", onClick: handleCommit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.854 3.646l-8 8-3.5-3.5a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l8.5-8.5a.5.5 0 1 0-.708-.708z" }) }),
              "Commit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-commit-dropdown", onClick: openPublish, title: "Commit & Publish", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 6l4 4 4-4H4z" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-changes-list", children: [
          stagedChanges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-section-header", onClick: () => setIsStagedExpanded(!isStagedExpanded), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", style: { transform: isStagedExpanded ? "rotate(90deg)" : "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4l4 4-4 4V4z" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-section-title", children: "Staged Changes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-section-count", children: stagedChanges.length })
            ] }),
            isStagedExpanded && stagedChanges.map((change, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-change-item", onClick: () => onSelectDiff(change.path), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileIcon, { path: change.path }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-path-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-filename", children: change.path.split(/[\\/]/).pop() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-filepath", children: change.path.split(/[\\/]/).slice(0, -1).join("/") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-item-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-item-btn", onClick: (e) => {
                e.stopPropagation();
                handleUnstage(change.path);
              }, title: "Unstage", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" }) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-status-badge sc-status-badge--A", children: change.status[0].trim() })
            ] }, i))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-section-header", onClick: () => setIsChangesExpanded(!isChangesExpanded), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", style: { transform: isChangesExpanded ? "rotate(90deg)" : "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4l4 4-4 4V4z" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-section-title", children: "Changes" }),
              unstagedChanges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-section-count", children: unstagedChanges.length })
            ] }),
            isChangesExpanded && (unstagedChanges.length === 0 && stagedChanges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-no-changes", children: "No changes detected" }) : unstagedChanges.map((change, i) => {
              const s15 = change.status === "??" ? "U" : change.status[1].trim();
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-change-item", onClick: () => onSelectDiff(change.path), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileIcon, { path: change.path }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-path-info", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-filename", children: change.path.split(/[\\/]/).pop() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-filepath", children: change.path.split(/[\\/]/).slice(0, -1).join("/") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-item-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-item-btn", onClick: (e) => {
                  e.stopPropagation();
                  handleStage(change.path);
                }, title: "Stage", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 4a.5.5 0 0 1 .5.5v3H11a.5.5 0 0 1 0 1H8.5v3a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5v-3A.5.5 0 0 1 8 4z" }) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `sc-status-badge sc-status-badge--${s15}`, children: s15 })
              ] }, i);
            }))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-graph-view", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-graph-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-graph-header-left", onClick: () => setIsGraphExpanded(!isGraphExpanded), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", style: { transform: isGraphExpanded ? "rotate(90deg)" : "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4l4 4-4 4V4z" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "History" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-graph-header-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-action-btn", onClick: handlePull, title: "Pull from remote", disabled: loading, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13 5h-3V1h-4v4h-3l5 5 5-5zM0 14h16v1H0v-1z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sc-action-btn", onClick: handlePush, title: "Push to remote", disabled: loading, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 11h3v4h4v-4h3l-5-5-5 5zM16 2H0V1h16v1z" }) }) })
          ] })
        ] }),
        isGraphExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-graph-content", children: [
          gitInfo.ahead > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sc-commit-item sc-commit-item--outgoing", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sc-commit-dot sc-commit-dot--outgoing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-commit-msg", children: "Outgoing Changes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-commit-branch-label", children: gitInfo.branch })
          ] }),
          history.map((commit, i) => {
            const isActual = i === 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sc-commit-item ${isActual ? "sc-commit-item--actual" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `sc-commit-dot ${isActual ? "sc-commit-dot--actual" : "sc-commit-dot--past"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-commit-msg", children: commit.message }),
              isActual && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-commit-branch-tag", children: gitInfo.branch }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sc-commit-hash", children: commit.hash })
            ] }, i);
          })
        ] })
      ] })
    ] })
  ] });
}
function DiffView({ filename, original, current }) {
  const originalLines = original.split("\n");
  const currentLines = current.split("\n");
  Math.max(originalLines.length, currentLines.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diff-view", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diff-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "diff-title", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" }) }),
      filename,
      " (Diff)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diff-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diff-side diff-side--original", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diff-side-header", children: "Original (HEAD)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diff-content", children: originalLines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diff-line", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "diff-line-number", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "diff-line-content", children: line || " " })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diff-side diff-side--current", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diff-side-header", children: "Modified (Working Tree)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diff-content", children: currentLines.map((line, i) => {
          const isDifferent = originalLines[i] !== currentLines[i];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `diff-line ${isDifferent ? "diff-line--changed" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "diff-line-number", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "diff-line-content", children: line || " " })
          ] }, i);
        }) })
      ] })
    ] })
  ] });
}
function Dashboard({ models, sessions = [], rootPath }) {
  const [activeTab, setActiveTab] = reactExports.useState("project");
  const [historicalSessions, setHistoricalSessions] = reactExports.useState([]);
  const [loadingHistorical, setLoadingHistorical] = reactExports.useState(false);
  const [mcpServers, setMcpServers] = reactExports.useState([]);
  const [config2, setConfig] = reactExports.useState({ mcpServers: {} });
  const [editingServer, setEditingServer] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [srvName, setSrvName] = reactExports.useState("");
  const [srvType, setSrvType] = reactExports.useState("stdio");
  const [srvCommand, setSrvCommand] = reactExports.useState("");
  const [srvArgs, setSrvArgs] = reactExports.useState("");
  const [srvEnv, setSrvEnv] = reactExports.useState("");
  const [srvUrl, setSrvUrl] = reactExports.useState("");
  const [srvToken, setSrvToken] = reactExports.useState("");
  const [srvHeaderKey, setSrvHeaderKey] = reactExports.useState("Authorization");
  const [showJsonEditor, setShowJsonEditor] = reactExports.useState(false);
  const [jsonEditorValue, setJsonEditorValue] = reactExports.useState("");
  const [jsonEditorError, setJsonEditorError] = reactExports.useState("");
  const [a2aStatus, setA2aStatus] = reactExports.useState(null);
  const [a2aLogs, setA2aLogs] = reactExports.useState([]);
  const [a2aConfig, setA2aConfig] = reactExports.useState(null);
  const [a2aDiscoverUrl, setA2aDiscoverUrl] = reactExports.useState("");
  const [a2aDiscoverResult, setA2aDiscoverResult] = reactExports.useState(null);
  const [a2aDiscovering, setA2aDiscovering] = reactExports.useState(false);
  const [a2aDelegateAgent, setA2aDelegateAgent] = reactExports.useState("");
  const [a2aDelegatePrompt, setA2aDelegatePrompt] = reactExports.useState("");
  const [a2aDelegateSkill, setA2aDelegateSkill] = reactExports.useState("default");
  const [a2aDelegating, setA2aDelegating] = reactExports.useState(false);
  const [a2aDelegateResult, setA2aDelegateResult] = reactExports.useState(null);
  const [a2aNewAgentName, setA2aNewAgentName] = reactExports.useState("");
  const [a2aNewAgentUrl, setA2aNewAgentUrl] = reactExports.useState("");
  const [a2aShowAddAgent, setA2aShowAddAgent] = reactExports.useState(false);
  const [mcpHostStatus, setMcpHostStatus] = reactExports.useState(null);
  const [mcpHostConfig, setMcpHostConfig] = reactExports.useState(null);
  const [expandedLogs, setExpandedLogs] = reactExports.useState({});
  const [expandedTools, setExpandedTools] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (activeTab === "mcp") {
      const fetchConfig = async () => {
        try {
          const cfg = await window.api.mcpGetConfig();
          const resolved = cfg || { mcpServers: {} };
          setConfig(resolved);
          setJsonEditorValue((prev) => {
            if (prev === "") return JSON.stringify(resolved, null, 2);
            return prev;
          });
        } catch (e) {
          console.warn("Failed to load MCP config:", e);
        }
      };
      fetchConfig();
      const fetchServers = async () => {
        try {
          const svrs = await window.api.mcpGetServers();
          setMcpServers(svrs || []);
        } catch (e) {
          console.warn("Failed to load MCP servers:", e);
        }
      };
      fetchServers();
      const interval = setInterval(fetchServers, 2e3);
      return () => clearInterval(interval);
    }
    return void 0;
  }, [activeTab]);
  reactExports.useEffect(() => {
    if (activeTab !== "a2a") return;
    const fetchA2A = async () => {
      try {
        const [status, logs, cfg] = await Promise.all([
          window.api.a2aGetStatus(),
          window.api.a2aGetLogs(),
          window.api.a2aGetConfig()
        ]);
        setA2aStatus(status);
        setA2aLogs(logs || []);
        setA2aConfig(cfg);
      } catch {
      }
    };
    fetchA2A();
    const iv = setInterval(fetchA2A, 3e3);
    return () => clearInterval(iv);
  }, [activeTab]);
  reactExports.useEffect(() => {
    if (activeTab !== "mcp-host") return;
    const fetch2 = async () => {
      try {
        const [status, cfg] = await Promise.all([
          window.api.mcpHostGetStatus(),
          window.api.mcpHostGetConfig()
        ]);
        setMcpHostStatus(status);
        setMcpHostConfig(cfg);
      } catch {
      }
    };
    fetch2();
    const iv = setInterval(fetch2, 3e3);
    return () => clearInterval(iv);
  }, [activeTab]);
  const handleEditServer = (name, srvConfig) => {
    setEditingServer(name);
    setSrvName(name);
    if (srvConfig.url) {
      const transport = srvConfig.transport || "sse";
      setSrvType(transport);
      setSrvUrl(srvConfig.url);
      const headers = srvConfig.headers || {};
      const headerEntries = Object.entries(headers);
      if (headerEntries.length > 0) {
        const [key, value] = headerEntries[0];
        setSrvHeaderKey(key);
        setSrvToken(value.startsWith("Bearer ") ? value.slice(7) : value);
      } else {
        setSrvHeaderKey("Authorization");
        setSrvToken("");
      }
      setSrvCommand("");
      setSrvArgs("");
      setSrvEnv("");
    } else {
      setSrvType("stdio");
      setSrvUrl("");
      setSrvToken("");
      setSrvHeaderKey("Authorization");
      setSrvCommand(srvConfig.command || "");
      setSrvArgs(Array.isArray(srvConfig.args) ? srvConfig.args.join(" ") : "");
      setSrvEnv(srvConfig.env ? JSON.stringify(srvConfig.env, null, 2) : "");
    }
    setShowForm(true);
  };
  const handleToggleServer = async (name) => {
    const newMcpServers = { ...config2.mcpServers };
    if (newMcpServers[name]) {
      newMcpServers[name].disabled = !newMcpServers[name].disabled;
      const newConfig = { ...config2, mcpServers: newMcpServers };
      setConfig(newConfig);
      try {
        await window.api.mcpSaveConfig(newConfig);
      } catch (e) {
        console.error("Failed to save config:", e);
      }
    }
  };
  const handleDeleteServer = async (name) => {
    if (!confirm(`Are you sure you want to delete the MCP server configuration for "${name}"?`)) return;
    const newMcpServers = { ...config2.mcpServers };
    delete newMcpServers[name];
    const newConfig = { ...config2, mcpServers: newMcpServers };
    setConfig(newConfig);
    try {
      await window.api.mcpSaveConfig(newConfig);
    } catch (e) {
      console.error("Failed to delete server:", e);
    }
  };
  const handleRestartServer = async (name) => {
    try {
      await window.api.mcpRestartServer(name);
    } catch (e) {
      console.error("Failed to restart server:", e);
    }
  };
  const handleSaveJson = async () => {
    setJsonEditorError("");
    let parsed;
    try {
      parsed = JSON.parse(jsonEditorValue);
    } catch (e) {
      setJsonEditorError(`Invalid JSON: ${e.message}`);
      return;
    }
    if (!parsed.mcpServers || typeof parsed.mcpServers !== "object") {
      setJsonEditorError('Config must have a top-level "mcpServers" object.');
      return;
    }
    try {
      await window.api.mcpSaveConfig(parsed);
      setConfig(parsed);
      setJsonEditorValue("");
      setJsonEditorError("");
      setShowJsonEditor(false);
    } catch (e) {
      setJsonEditorError(`Failed to save: ${e.message}`);
    }
  };
  const handleSaveServer = async (e) => {
    e.preventDefault();
    if (!srvName.trim()) return;
    const newMcpServers = { ...config2.mcpServers };
    if (editingServer && editingServer !== srvName.trim()) {
      delete newMcpServers[editingServer];
    }
    let parsedEnv = {};
    try {
      if (srvEnv.trim()) {
        parsedEnv = JSON.parse(srvEnv);
      }
    } catch (err) {
      alert("Invalid JSON in Environment Variables field. Please enter a valid JSON object or leave it empty.");
      return;
    }
    const srvConfig = {
      disabled: config2.mcpServers[editingServer || srvName.trim()]?.disabled || false
    };
    if (srvType === "sse" || srvType === "streamable-http") {
      srvConfig.url = srvUrl.trim();
      srvConfig.transport = srvType;
      if (srvToken.trim()) {
        const key = srvHeaderKey.trim() || "Authorization";
        const value = key === "Authorization" ? `Bearer ${srvToken.trim()}` : srvToken.trim();
        srvConfig.headers = { [key]: value };
      }
    } else {
      srvConfig.command = srvCommand.trim();
      const matches = srvArgs.match(/"[^"]+"|'[^']+'|\S+/g) || [];
      srvConfig.args = matches.map((m2) => m2.replace(/^['"]|['"]$/g, ""));
      if (Object.keys(parsedEnv).length > 0) {
        srvConfig.env = parsedEnv;
      }
    }
    newMcpServers[srvName.trim()] = srvConfig;
    const newConfig = { ...config2, mcpServers: newMcpServers };
    setConfig(newConfig);
    try {
      await window.api.mcpSaveConfig(newConfig);
    } catch (e2) {
      console.error("Failed to save config:", e2);
    }
    setShowForm(false);
    setEditingServer(null);
    setSrvName("");
    setSrvCommand("");
    setSrvArgs("");
    setSrvEnv("");
    setSrvUrl("");
    setSrvToken("");
    setSrvHeaderKey("Authorization");
  };
  reactExports.useEffect(() => {
    if (activeTab === "historical") {
      setLoadingHistorical(true);
      window.api.getHistoricalSessions().then((data) => {
        setHistoricalSessions(data || []);
      }).catch((err) => {
        console.error("Error fetching historical sessions:", err);
      }).finally(() => {
        setLoadingHistorical(false);
      });
    }
  }, [activeTab]);
  function formatTokens(count) {
    if (count >= 1e6) {
      return (count / 1e6).toFixed(2) + "M";
    }
    if (count >= 1e3) {
      return (count / 1e3).toFixed(1) + "K";
    }
    return count.toString();
  }
  const projectSessions = sessions.filter((s15) => {
    if (s15.isDeleted) return false;
    if (!rootPath) return true;
    return s15.workspace === rootPath;
  });
  let pTotalTokens = 0;
  const pTokensByModel = {};
  const pTokensByMode = {
    agent: 0,
    plan: 0,
    debug: 0,
    multitask: 0,
    ask: 0
  };
  projectSessions.forEach((session) => {
    session.messages.forEach((msg) => {
      if (msg.role === "assistant") {
        const pTokens = msg.promptTokens || 0;
        const rTokens = msg.responseTokens || 0;
        const msgTotal = pTokens + rTokens;
        pTotalTokens += msgTotal;
        const modelName = msg.model || "Unknown Model";
        pTokensByModel[modelName] = (pTokensByModel[modelName] || 0) + msgTotal;
        const modeName = session.mode || "agent";
        pTokensByMode[modeName] = (pTokensByMode[modeName] || 0) + msgTotal;
      }
    });
  });
  const pCostNumber = pTotalTokens * 2e-6;
  const pFormattedCost = pCostNumber === 0 ? "$0.00" : pCostNumber < 0.01 ? `$${pCostNumber.toFixed(4)}` : `$${pCostNumber.toFixed(2)}`;
  const pProjectedCost = (pCostNumber * 30).toFixed(2);
  const pModelStats = Object.entries(pTokensByModel).map(([name, tokens]) => {
    const percentage = pTotalTokens > 0 ? Math.round(tokens / pTotalTokens * 100) : 0;
    return { name, tokens, percentage };
  });
  if (pModelStats.length === 0) {
    if (models.length > 0) {
      models.forEach((m2) => {
        pModelStats.push({ name: m2, tokens: 0, percentage: 0 });
      });
    } else {
      pModelStats.push({ name: "No Models Detected", tokens: 0, percentage: 0 });
    }
  }
  pModelStats.sort((a, b2) => b2.tokens - a.tokens);
  const colors = ["#4ec9b0", "#007acc", "#ce9178", "#dcdcaa", "#c586c0", "#4fc1ff"];
  const pModelStatsWithColors = pModelStats.map((item, index2) => ({
    ...item,
    color: colors[index2 % colors.length]
  }));
  const pTotalModeTokens = Object.values(pTokensByMode).reduce((a, b2) => a + b2, 0);
  const modeColors = {
    agent: "#4ec9b0",
    plan: "#007acc",
    ask: "#dcdcaa",
    debug: "#f44747",
    multitask: "#c586c0"
  };
  const pModeStats = Object.entries(pTokensByMode).map(([name, tokens]) => {
    const percentage = pTotalModeTokens > 0 ? Math.round(tokens / pTotalModeTokens * 100) : 0;
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      tokens,
      percentage,
      color: modeColors[name] || "#ce9178"
    };
  }).sort((a, b2) => b2.tokens - a.tokens);
  let hTotalTokens = 0;
  const hTokensByModel = {};
  const projectsMap = {};
  historicalSessions.forEach((session) => {
    const wsPath = session.workspace || "No Project Folder Associated";
    const folderName = wsPath.split(/[\\/]/).pop() || wsPath;
    if (!projectsMap[wsPath]) {
      projectsMap[wsPath] = {
        path: wsPath,
        name: folderName,
        tokens: 0,
        sessionsCount: 0,
        models: /* @__PURE__ */ new Set()
      };
    }
    let sessionTokens = 0;
    session.messages.forEach((msg) => {
      if (msg.role === "assistant") {
        const pTokens = msg.promptTokens || 0;
        const rTokens = msg.responseTokens || 0;
        const msgTotal = pTokens + rTokens;
        sessionTokens += msgTotal;
        hTotalTokens += msgTotal;
        const modelName = msg.model || "Unknown Model";
        hTokensByModel[modelName] = (hTokensByModel[modelName] || 0) + msgTotal;
        if (msg.model) {
          projectsMap[wsPath].models.add(msg.model);
        }
      }
    });
    projectsMap[wsPath].tokens += sessionTokens;
    projectsMap[wsPath].sessionsCount += 1;
  });
  const hCostNumber = hTotalTokens * 2e-6;
  const hFormattedCost = hCostNumber === 0 ? "$0.00" : hCostNumber < 0.01 ? `$${hCostNumber.toFixed(4)}` : `$${hCostNumber.toFixed(2)}`;
  const projectsList = Object.values(projectsMap).sort((a, b2) => b2.tokens - a.tokens);
  const hModelStats = Object.entries(hTokensByModel).map(([name, tokens]) => {
    const percentage = hTotalTokens > 0 ? Math.round(tokens / hTotalTokens * 100) : 0;
    return { name, tokens, percentage };
  }).sort((a, b2) => b2.tokens - a.tokens);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-container", style: {
    padding: "40px",
    color: "#d4d4d4",
    overflowY: "auto",
    height: "100%",
    background: "linear-gradient(135deg, #1e1e1e 0%, #141414 100%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", gap: "20px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: { fontSize: "28px", color: "#fff", marginBottom: "12px", fontWeight: 300, letterSpacing: "-0.5px" }, children: [
            "System ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600 }, children: "Analytics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", fontSize: "14px", lineHeight: 1.6 }, children: activeTab === "project" ? "Real-time administrative overview of performance and token usage for the current workspace folder." : activeTab === "historical" ? "Aggregated analytics and deduplicated historical usage including Time Machine backups across all workspace projects." : activeTab === "mcp" ? "Connect and manage Model Context Protocol (MCP) servers to extend the agent with custom database, search, and browser tools." : activeTab === "a2a" ? "Agent-to-Agent (A2A) protocol — expose this IDE as an agent, discover remote agents, and delegate tasks between agents." : "MCP Host Server — expose this IDE as an MCP tool provider so external agents (Claude Desktop, Cursor, etc.) can call its tools." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          gap: "4px",
          background: "rgba(255, 255, 255, 0.03)",
          padding: "4px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("project"),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                background: activeTab === "project" ? "#007acc" : "transparent",
                color: activeTab === "project" ? "#fff" : "#888",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 14 }),
                "Current Project"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("historical"),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                background: activeTab === "historical" ? "#007acc" : "transparent",
                color: activeTab === "historical" ? "#fff" : "#888",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 14 }),
                "Time Machine (Historical)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("mcp"),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                background: activeTab === "mcp" ? "#007acc" : "transparent",
                color: activeTab === "mcp" ? "#fff" : "#888",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 14 }),
                "MCP Connections"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("a2a"),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                background: activeTab === "a2a" ? "#007acc" : "transparent",
                color: activeTab === "a2a" ? "#fff" : "#888",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
                "A2A Protocol"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("mcp-host"),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
                background: activeTab === "mcp-host" ? "#007acc" : "transparent",
                color: activeTab === "mcp-host" ? "#fff" : "#888",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { size: 14 }),
                "MCP Host"
              ]
            }
          )
        ] })
      ] }),
      activeTab === "project" && rootPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(0, 122, 204, 0.05)",
        border: "1px solid rgba(0, 122, 204, 0.15)",
        padding: "10px 16px",
        borderRadius: "8px",
        marginBottom: "32px",
        fontSize: "12px",
        color: "#a0a0a0"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#007acc", fontWeight: 600 }, children: "WORKSPACE ROOT:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { fontFamily: "monospace", background: "rgba(0,0,0,0.2)", padding: "2px 6px", borderRadius: "4px", color: "#ddd" }, children: rootPath })
      ] }),
      loadingHistorical && activeTab === "historical" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", padding: "60px 0" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "32px",
          height: "32px",
          border: "2px solid rgba(255,255,255,0.05)",
          borderTopColor: "#007acc",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "13px", color: "#888" }, children: "Reading all Time Machine backups and active sessions..." })
      ] }),
      activeTab === "project" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        pTotalTokens === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "40px 32px",
          textAlign: "center",
          marginBottom: "48px",
          backdropFilter: "blur(10px)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginBottom: "8px", fontWeight: 500 }, children: "No Workspace Activity Recorded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", fontSize: "13px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.5 }, children: "No LLM interactions have been logged inside the current project directory. Open the Chat Panel on the right and prompt a model to start logging performance stats!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "48px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Workspace Tokens" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#4ec9b0" }, children: formatTokens(pTotalTokens) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-trend", children: "Current folder only" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Estimated Project Cost" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#007acc" }, children: pFormattedCost }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-trend", children: [
              "Projected: $",
              pProjectedCost,
              "/mo"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Active Local Models" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#ce9178" }, children: models.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-trend", children: "Ollama service connected" })
          ] })
        ] }),
        pTotalTokens > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "usage-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Model Distribution (Current Workspace)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "usage-list", children: pModelStatsWithColors.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "usage-name", children: m2.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "usage-value", children: [
                  m2.tokens.toLocaleString(),
                  " tkns (",
                  m2.percentage,
                  "%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-fill", style: { width: (m2.percentage || 0) + "%", backgroundColor: m2.color } }) })
            ] }, m2.name)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "usage-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Agent Mode Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "usage-list", children: pModeStats.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "usage-name", children: m2.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "usage-value", children: [
                  m2.tokens.toLocaleString(),
                  " tkns (",
                  m2.percentage,
                  "%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-fill", style: { width: (m2.percentage || 0) + "%", backgroundColor: m2.color } }) })
            ] }, m2.name)) })
          ] })
        ] })
      ] }),
      activeTab === "historical" && !loadingHistorical && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: hTotalTokens === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        padding: "40px 32px",
        textAlign: "center",
        backdropFilter: "blur(10px)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginBottom: "8px", fontWeight: 500 }, children: "No Historical Logs Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", fontSize: "13px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.5 }, children: "No historical sessions or backup files exist on this machine yet. Cumulative statistics will appear once backups are generated or chats are performed across directories." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "All-Time Tokens Consumed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#4ec9b0" }, children: formatTokens(hTotalTokens) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-trend", style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 11 }),
              " Deduplicated Time Machine archives"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "All-Time Estimated Value" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#007acc" }, children: hFormattedCost }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-trend", children: "Standard commercial equivalents" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Workspace Folder Count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("value", { style: { color: "#ce9178" }, children: projectsList.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-trend", children: "Different projects registered" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "36px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "usage-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title", style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 16, style: { color: "#007acc" } }),
              "Token Footprint by Project Folder"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: projectsList.map((proj) => {
              const projectPercent = hTotalTokens > 0 ? Math.round(proj.tokens / hTotalTokens * 100) : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.03)",
                borderRadius: "8px",
                padding: "16px 20px",
                transition: "all 0.2s",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
              }, className: "project-card-hover", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 14, style: { color: "#dcdcaa" } }),
                      proj.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { fontSize: "11px", color: "#666", fontFamily: "monospace" }, children: proj.path })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "15px", color: "#4ec9b0", fontWeight: "bold" }, children: [
                      proj.tokens.toLocaleString(),
                      " tokens"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: "#888", marginTop: "2px" }, children: [
                      proj.sessionsCount,
                      " session",
                      proj.sessionsCount === 1 ? "" : "s"
                    ] })
                  ] })
                ] }),
                proj.models.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }, children: Array.from(proj.models).map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  fontSize: "10px",
                  background: "rgba(0,122,204,0.1)",
                  color: "#4fc1ff",
                  border: "1px solid rgba(0,122,204,0.2)",
                  padding: "2px 8px",
                  borderRadius: "4px"
                }, children: m2 }, m2)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-wrapper", style: { height: "5px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-fill", style: { width: projectPercent + "%", backgroundColor: "#007acc" } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "10px", color: "#555", marginTop: "6px", textAlign: "right" }, children: [
                  "Represents ",
                  projectPercent,
                  "% of all-time usage"
                ] })
              ] }, proj.path);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "usage-section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "All-Time Cumulative Models" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "usage-list", children: hModelStats.map((m2, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "usage-info", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "usage-name", children: m2.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "usage-value", children: [
                    m2.tokens.toLocaleString(),
                    " tkns (",
                    m2.percentage,
                    "%)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-fill", style: { width: (m2.percentage || 0) + "%", backgroundColor: colors[index2 % colors.length] } }) })
              ] }, m2.name)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "usage-section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title", style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 16 }),
                "Historical Sessions Log"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "12px", maxHeight: "350px", overflowY: "auto", paddingRight: "6px" }, children: [
                historicalSessions.slice(0, 30).map((s15) => {
                  let sTokens = 0;
                  s15.messages.forEach((msg) => {
                    if (msg.role === "assistant") {
                      sTokens += (msg.promptTokens || 0) + (msg.responseTokens || 0);
                    }
                  });
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 600, color: s15.isDeleted ? "#888" : "#eee", display: "flex", alignItems: "center", gap: "6px" }, children: [
                        s15.name,
                        s15.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "9px", background: "rgba(244,71,71,0.1)", color: "#f44747", border: "1px solid rgba(244,71,71,0.2)", padding: "1px 4px", borderRadius: "3px" }, children: "Deleted" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "10px", color: "#555", marginTop: "2px" }, children: [
                        s15.workspace ? s15.workspace.split(/[\\/]/).pop() : "No Project",
                        " • ",
                        new Date(s15.lastActive || Date.now()).toLocaleDateString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: "monospace", color: "#4ec9b0" }, children: [
                      sTokens.toLocaleString(),
                      " tkns"
                    ] })
                  ] }, s15.id);
                }),
                historicalSessions.length > 30 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", fontSize: "11px", color: "#555", padding: "8px" }, children: [
                  "...and ",
                  historicalSessions.length - 30,
                  " more historical sessions"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      activeTab === "mcp" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "32px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 15, style: { color: "#007acc" } }),
            "MCP Preset Market"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }, children: [
            {
              name: "Brave Search",
              description: "Enables web search for the agent using the Brave API",
              preset: { type: "stdio", command: "npx", args: "-y @modelcontextprotocol/server-brave-search", env: '{"BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"}' }
            },
            {
              name: "SQLite Database",
              description: "Allows reading and querying local SQLite databases",
              preset: { type: "stdio", command: "npx", args: "-y @modelcontextprotocol/server-sqlite --db /absolute/path/to/db.sqlite", env: "{}" }
            },
            {
              name: "PostgreSQL Database",
              description: "Enables querying PostgreSQL database schemas and data",
              preset: { type: "stdio", command: "npx", args: "-y @modelcontextprotocol/server-postgres --db-url postgresql://localhost/mydb", env: "{}" }
            },
            {
              name: "Puppeteer Browser",
              description: "Enables browser automation and web page screenshots",
              preset: { type: "stdio", command: "npx", args: "-y @modelcontextprotocol/server-puppeteer", env: "{}" }
            },
            {
              name: "Filesystem Access",
              description: "Exposes directories to the agent for reading and writing",
              preset: { type: "stdio", command: "npx", args: `-y @modelcontextprotocol/server-filesystem ${rootPath || "/path/to/directory"}`, env: "{}" }
            },
            {
              name: "GitHub API",
              description: "Enables repository querying, PR listing, and issue creation",
              preset: { type: "stdio", command: "npx", args: "-y @modelcontextprotocol/server-github", env: '{"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN"}' }
            }
          ].map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(30, 30, 30, 0.4)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.2s",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }, className: "preset-card-hover", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: "13px", color: "#fff", fontWeight: 600, margin: "0 0 6px 0" }, children: p2.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "11px", color: "#888", margin: "0 0 12px 0", lineHeight: "1.4" }, children: p2.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setEditingServer(null);
                  setSrvName(p2.name.toLowerCase().replace(/\s+/g, "-"));
                  setSrvType(p2.preset.type);
                  setSrvCommand(p2.preset.command);
                  setSrvArgs(p2.preset.args);
                  setSrvEnv(p2.preset.env);
                  setSrvUrl("");
                  setSrvToken("");
                  setShowForm(true);
                  setTimeout(() => {
                    document.getElementById("mcp-config-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                },
                style: {
                  padding: "6px 12px",
                  background: "rgba(0, 122, 204, 0.1)",
                  border: "1px solid rgba(0, 122, 204, 0.2)",
                  borderRadius: "4px",
                  color: "#4fc1ff",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: 500,
                  transition: "all 0.2s"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                  " Configure Preset"
                ]
              }
            )
          ] }, p2.name)) })
        ] }),
        showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "mcp-config-form-section", style: {
          background: "rgba(37, 37, 38, 0.4)",
          border: "1px solid rgba(0, 122, 204, 0.3)",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "32px",
          animation: "fadeIn 0.25s ease-out"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 15, style: { color: "#007acc" } }),
            editingServer ? `Edit Server: ${editingServer}` : "Add New MCP Server"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveServer, style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: "Server Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. postgres-db",
                    value: srvName,
                    onChange: (e) => setSrvName(e.target.value),
                    required: true,
                    disabled: !!editingServer,
                    style: {
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: "Connection Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: srvType,
                    onChange: (e) => setSrvType(e.target.value),
                    style: {
                      padding: "8px 12px",
                      background: "rgba(30,30,30,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px",
                      height: "35px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stdio", children: "Stdio (Local Process)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sse", children: "SSE (Server-Sent Events)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "streamable-http", children: "Streamable HTTP (2025)" })
                    ]
                  }
                )
              ] })
            ] }),
            srvType === "stdio" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: "Command" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "e.g. npx, node, python",
                      value: srvCommand,
                      onChange: (e) => setSrvCommand(e.target.value),
                      required: true,
                      style: {
                        padding: "8px 12px",
                        background: "rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: "Arguments" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "e.g. -y @modelcontextprotocol/server-postgres --db-url ...",
                      value: srvArgs,
                      onChange: (e) => setSrvArgs(e.target.value),
                      style: {
                        padding: "8px 12px",
                        background: "rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: "Environment Variables (JSON)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: 'e.g. { "API_KEY": "secret" }',
                    value: srvEnv,
                    onChange: (e) => setSrvEnv(e.target.value),
                    style: {
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px",
                      fontFamily: "monospace"
                    }
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: srvType === "streamable-http" ? "Streamable HTTP Endpoint URL" : "SSE Endpoint URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "url",
                    placeholder: srvType === "streamable-http" ? "e.g. https://design.penpot.app/mcp/stream" : "e.g. http://localhost:3012/sse",
                    value: srvUrl,
                    onChange: (e) => setSrvUrl(e.target.value),
                    required: true,
                    style: {
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: [
                  "Auth Header ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#555", fontWeight: 400, textTransform: "none" }, children: "(header name)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. Authorization or X-Figma-Token",
                    value: srvHeaderKey,
                    onChange: (e) => setSrvHeaderKey(e.target.value),
                    style: {
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase" }, children: [
                  "Token Value ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#555", fontWeight: 400, textTransform: "none" }, children: '(optional — "Bearer " prefix added automatically for Authorization)' })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "password",
                    placeholder: "e.g. your access token",
                    value: srvToken,
                    onChange: (e) => setSrvToken(e.target.value),
                    style: {
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "13px"
                    }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", marginTop: "8px", justifyContent: "flex-end" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowForm(false);
                    setEditingServer(null);
                  },
                  style: {
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    color: "#aaa",
                    fontSize: "13px",
                    cursor: "pointer"
                  },
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  style: {
                    padding: "8px 20px",
                    background: "#007acc",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: 600
                  },
                  children: editingServer ? "Save Changes" : "Create Connection"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 15, style: { color: "#4ec9b0" } }),
              "Active Connections (",
              mcpServers.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    setJsonEditorValue(JSON.stringify(config2, null, 2));
                    setJsonEditorError("");
                    setShowJsonEditor((v3) => !v3);
                    setShowForm(false);
                  },
                  style: {
                    padding: "8px 14px",
                    background: showJsonEditor ? "rgba(0,122,204,0.2)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${showJsonEditor ? "#007acc" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "6px",
                    color: showJsonEditor ? "#4fc3f7" : "#aaa",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  },
                  children: [
                    "{ }",
                    " Edit JSON"
                  ]
                }
              ),
              !showForm && !showJsonEditor && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    setEditingServer(null);
                    setSrvName("");
                    setSrvType("stdio");
                    setSrvCommand("");
                    setSrvArgs("");
                    setSrvEnv("");
                    setSrvUrl("");
                    setSrvToken("");
                    setSrvHeaderKey("Authorization");
                    setShowForm(true);
                  },
                  style: {
                    padding: "8px 16px",
                    background: "#007acc",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                    " Add Connection"
                  ]
                }
              )
            ] })
          ] }),
          showJsonEditor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "24px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0 0 12px 0", fontSize: "12px", color: "#888", lineHeight: 1.6 }, children: [
              "Edit the raw config JSON. Supports all fields: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "command" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "args" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "env" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "url" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "transport" }),
              " (",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#ce9178" }, children: '"sse"' }),
              " or ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#ce9178" }, children: '"streamable-http"' }),
              "), ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "headers" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "disabled" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: jsonEditorValue,
                onChange: (e) => setJsonEditorValue(e.target.value),
                spellCheck: false,
                style: {
                  width: "100%",
                  minHeight: "320px",
                  padding: "14px",
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${jsonEditorError ? "#f44" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "6px",
                  color: "#d4d4d4",
                  fontSize: "12.5px",
                  fontFamily: 'ui-monospace, "Cascadia Code", Menlo, monospace',
                  lineHeight: 1.6,
                  resize: "vertical",
                  boxSizing: "border-box"
                }
              }
            ),
            jsonEditorError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "8px 0 0 0", fontSize: "12px", color: "#f88" }, children: jsonEditorError }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "12px", justifyContent: "flex-end" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    setShowJsonEditor(false);
                    setJsonEditorError("");
                    setJsonEditorValue("");
                  },
                  style: {
                    padding: "7px 16px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    color: "#aaa",
                    fontSize: "12px",
                    cursor: "pointer"
                  },
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleSaveJson,
                  style: {
                    padding: "7px 20px",
                    background: "#007acc",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: "Save & Apply"
                }
              )
            ] })
          ] }),
          mcpServers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px",
            padding: "48px 24px",
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 32, style: { color: "#555", marginBottom: "16px" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#eee", fontSize: "14px", margin: "0 0 6px 0", fontWeight: 500 }, children: "No MCP Servers Configured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#777", fontSize: "12px", maxWidth: "420px", margin: "0 auto", lineHeight: "1.5" }, children: 'Model Context Protocol connections are empty. Use a preset above or click "Add Connection" to connect your agent with databases, browsers, and other services.' })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: mcpServers.map((svr) => {
            const isEnabled = !config2.mcpServers[svr.name]?.disabled;
            const isLogsOpen = !!expandedLogs[svr.name];
            const isToolsOpen = !!expandedTools[svr.name];
            let statusColor = "#888";
            let statusBg = "rgba(128,128,128,0.1)";
            if (svr.status === "connected") {
              statusColor = "#4ec9b0";
              statusBg = "rgba(78, 201, 176, 0.08)";
            } else if (svr.status === "connecting") {
              statusColor = "#ce9178";
              statusBg = "rgba(206, 145, 120, 0.08)";
            } else if (svr.status === "error") {
              statusColor = "#f44747";
              statusBg = "rgba(244, 71, 71, 0.08)";
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              background: "rgba(30, 30, 30, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.03)",
              borderRadius: "8px",
              padding: "16px 20px",
              transition: "all 0.2s"
            }, className: "project-card-hover", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, margin: 0 }, children: svr.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                      fontSize: "10px",
                      textTransform: "uppercase",
                      color: "#aaa",
                      background: "rgba(255,255,255,0.05)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontFamily: "monospace"
                    }, children: svr.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      color: statusColor,
                      border: `1px solid ${statusColor}`,
                      background: statusBg,
                      fontWeight: 600
                    }, children: svr.status.toUpperCase() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: "#777", fontFamily: "monospace" }, children: svr.type === "sse" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "URL: ",
                    config2.mcpServers[svr.name]?.url
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Cmd: ",
                    config2.mcpServers[svr.name]?.command,
                    " ",
                    config2.mcpServers[svr.name]?.args?.join(" ")
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExpandedTools((prev) => ({ ...prev, [svr.name]: !isToolsOpen })),
                      disabled: svr.status !== "connected",
                      style: {
                        padding: "5px 10px",
                        background: isToolsOpen ? "rgba(0,122,204,0.1)" : "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px",
                        color: isToolsOpen ? "#4fc1ff" : "#aaa",
                        fontSize: "11px",
                        cursor: svr.status === "connected" ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        opacity: svr.status === "connected" ? 1 : 0.5
                      },
                      children: [
                        "Tools (",
                        svr.tools?.length || 0,
                        ")"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExpandedLogs((prev) => ({ ...prev, [svr.name]: !isLogsOpen })),
                      style: {
                        padding: "5px 10px",
                        background: isLogsOpen ? "rgba(0,122,204,0.1)" : "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px",
                        color: isLogsOpen ? "#4fc1ff" : "#aaa",
                        fontSize: "11px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      },
                      children: "Logs"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleRestartServer(svr.name),
                      style: {
                        padding: "5px",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px",
                        color: "#aaa",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      title: "Restart Connection",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleEditServer(svr.name, config2.mcpServers[svr.name]),
                      style: {
                        padding: "5px",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px",
                        color: "#aaa",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      title: "Edit Configuration",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDeleteServer(svr.name),
                      style: {
                        padding: "5px",
                        background: "transparent",
                        border: "1px solid rgba(244, 71, 71, 0.1)",
                        borderRadius: "4px",
                        color: "#f44747",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      title: "Delete Server",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleToggleServer(svr.name),
                      style: {
                        padding: "5px 8px",
                        background: isEnabled ? "rgba(78,201,176,0.1)" : "rgba(255,255,255,0.05)",
                        border: isEnabled ? "1px solid rgba(78,201,176,0.2)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: isEnabled ? "#4ec9b0" : "#888",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer"
                      },
                      children: isEnabled ? "ENABLED" : "DISABLED"
                    }
                  )
                ] })
              ] }),
              isToolsOpen && svr.status === "connected" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                marginTop: "16px",
                background: "rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.03)",
                borderRadius: "6px",
                padding: "16px",
                animation: "fadeIn 0.2s ease-out"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { fontSize: "12px", color: "#eee", fontWeight: 600, margin: "0 0 12px 0" }, children: "Available Tools" }),
                svr.tools && svr.tools.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: svr.tools.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "10px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", margin: "0 0 4px 0" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { fontSize: "12px", color: "#4fc1ff", fontWeight: 600 }, children: t2.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#777" }, children: [
                      "(",
                      Object.keys(t2.inputSchema?.properties || {}).length,
                      " params)"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "11px", color: "#aaa", margin: "0 0 6px 0", lineHeight: 1.4 }, children: t2.description })
                ] }, t2.name)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#777", fontStyle: "italic" }, children: "No tools provided by this server" })
              ] }),
              isLogsOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                marginTop: "16px",
                animation: "fadeIn 0.2s ease-out"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { fontSize: "12px", color: "#eee", fontWeight: 600, margin: "0 0 8px 0" }, children: "Stdout/Stderr Output Logs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#4ec9b0",
                  maxHeight: "220px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.4"
                }, children: svr.logs && svr.logs.length > 0 ? svr.logs.join("\n") : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#555", fontStyle: "italic" }, children: "Console log is empty. Waiting for events..." }) })
              ] })
            ] }, svr.name);
          }) })
        ] })
      ] }),
      activeTab === "a2a" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 15, style: { color: "#4ec9b0" } }),
              "Local A2A Server"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              background: a2aStatus?.running ? "rgba(78,201,176,0.15)" : "rgba(255,100,100,0.15)",
              color: a2aStatus?.running ? "#4ec9b0" : "#f88"
            }, children: a2aStatus?.running ? "● Running" : "○ Stopped" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }, children: [
            { label: "Port", value: a2aStatus?.port ?? 3100 },
            { label: "Default Model", value: a2aStatus?.defaultModel ?? "llama3.1:latest" },
            { label: "Agent Card", value: `http://localhost:${a2aStatus?.port ?? 3100}/.well-known/agent.json` },
            { label: "RPC Endpoint", value: `http://localhost:${a2aStatus?.port ?? 3100}/a2a` }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#666", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }, children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: "#ccc", fontFamily: "monospace", wordBreak: "break-all" }, children: String(value) })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 15, style: { color: "#007acc" } }),
            "Skill → Model Routing"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: "12px", color: "#666", margin: "0 0 14px 0", lineHeight: 1.5 }, children: [
            "Incoming A2A tasks carry an optional ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: "#4fc3f7" }, children: "skill" }),
            " tag. The table below maps each skill to the local Ollama model that handles it."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: Object.entries(a2aStatus?.skillModelMap ?? {
            "code-generation": "qwen2.5-coder:14b",
            "code-review": "qwen2.5-coder:14b",
            "analysis": "qwen2.5:14b",
            "chat": "llama3.1:latest",
            "planning": "llama3.1:latest",
            "default": "llama3.1:latest"
          }).map(([skill, model]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", color: "#aaa", fontFamily: "monospace" }, children: skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", color: "#4fc3f7", fontFamily: "monospace" }, children: String(model) })
          ] }, skill)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 15, style: { color: "#ce9178" } }),
              "Remote Agents"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setA2aShowAddAgent((v3) => !v3),
                style: { padding: "6px 14px", background: "#007acc", border: "none", borderRadius: "6px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                  " Add Agent"
                ]
              }
            )
          ] }),
          a2aShowAddAgent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "16px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "5px" }, children: "Agent Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. design-agent",
                    value: a2aNewAgentName,
                    onChange: (e) => setA2aNewAgentName(e.target.value),
                    style: { width: "100%", padding: "7px 10px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "5px" }, children: "Base URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. http://192.168.1.5:3100",
                    value: a2aNewAgentUrl,
                    onChange: (e) => setA2aNewAgentUrl(e.target.value),
                    style: { width: "100%", padding: "7px 10px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", justifyContent: "flex-end" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setA2aShowAddAgent(false),
                  style: { padding: "6px 14px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#aaa", fontSize: "12px", cursor: "pointer" },
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    if (!a2aNewAgentName.trim() || !a2aNewAgentUrl.trim()) return;
                    if (!a2aConfig) return;
                    const newConfig = { ...a2aConfig, remoteAgents: [...a2aConfig.remoteAgents || [], { name: a2aNewAgentName.trim(), url: a2aNewAgentUrl.trim() }] };
                    await window.api.a2aSaveConfig(newConfig);
                    setA2aConfig(newConfig);
                    setA2aNewAgentName("");
                    setA2aNewAgentUrl("");
                    setA2aShowAddAgent(false);
                  },
                  style: { padding: "6px 16px", background: "#007acc", border: "none", borderRadius: "6px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer" },
                  children: "Save Agent"
                }
              )
            ] })
          ] }),
          (a2aConfig?.remoteAgents || []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "32px", textAlign: "center", color: "#555", fontSize: "13px" }, children: "No remote agents configured. Add an agent URL to start delegating tasks." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: (a2aConfig?.remoteAgents || []).map((agent) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: "#fff", fontWeight: 500 }, children: agent.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#666", fontFamily: "monospace", marginTop: "2px" }, children: agent.url })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "6px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    setA2aDiscoverUrl(agent.url);
                    setA2aDiscovering(true);
                    setA2aDiscoverResult(null);
                    try {
                      const card = await window.api.a2aDiscoverAgent(agent.url);
                      setA2aDiscoverResult(card);
                    } catch (e) {
                      setA2aDiscoverResult({ error: e.message });
                    } finally {
                      setA2aDiscovering(false);
                    }
                  },
                  style: { padding: "5px 10px", background: "rgba(0,122,204,0.15)", border: "1px solid rgba(0,122,204,0.3)", borderRadius: "5px", color: "#4fc3f7", fontSize: "11px", cursor: "pointer" },
                  children: "Discover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    if (!a2aConfig) return;
                    const newConfig = { ...a2aConfig, remoteAgents: a2aConfig.remoteAgents.filter((a) => a.name !== agent.name) };
                    await window.api.a2aSaveConfig(newConfig);
                    setA2aConfig(newConfig);
                  },
                  style: { padding: "5px 10px", background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: "5px", color: "#f88", fontSize: "11px", cursor: "pointer" },
                  children: "Remove"
                }
              )
            ] })
          ] }, agent.name)) }),
          a2aDiscoverResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "14px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "14px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }, children: "Agent Card" }),
            a2aDiscoverResult.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#f88", fontSize: "12px" }, children: a2aDiscoverResult.error }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", color: "#fff", fontWeight: 600 }, children: a2aDiscoverResult.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: "#999", margin: "4px 0 10px" }, children: a2aDiscoverResult.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px" }, children: (a2aDiscoverResult.skills || []).map((s15) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { padding: "3px 10px", background: "rgba(0,122,204,0.15)", border: "1px solid rgba(0,122,204,0.25)", borderRadius: "12px", fontSize: "11px", color: "#4fc3f7" }, children: s15.name }, s15.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 15, style: { color: "#007acc" } }),
            "Delegate Task to Remote Agent"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "5px" }, children: "Target Agent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: a2aDelegateAgent,
                    onChange: (e) => setA2aDelegateAgent(e.target.value),
                    style: { width: "100%", padding: "7px 10px", background: "rgba(30,30,30,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— select agent —" }),
                      (a2aConfig?.remoteAgents || []).filter((a) => !a.disabled).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a.name, children: a.name }, a.name))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "5px" }, children: "Skill" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: a2aDelegateSkill,
                    onChange: (e) => setA2aDelegateSkill(e.target.value),
                    style: { width: "100%", padding: "7px 10px", background: "rgba(30,30,30,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px" },
                    children: ["default", "code-generation", "code-review", "analysis", "planning", "chat", "design"].map((s15) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s15, children: s15 }, s15))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "5px" }, children: "Prompt" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: a2aDelegatePrompt,
                  onChange: (e) => setA2aDelegatePrompt(e.target.value),
                  rows: 3,
                  placeholder: "What should the remote agent do?",
                  style: { width: "100%", padding: "8px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                disabled: !a2aDelegateAgent || !a2aDelegatePrompt.trim() || a2aDelegating,
                onClick: async () => {
                  setA2aDelegating(true);
                  setA2aDelegateResult(null);
                  try {
                    const task = await window.api.a2aDelegateTask(a2aDelegateAgent, a2aDelegatePrompt, a2aDelegateSkill);
                    setA2aDelegateResult(task);
                  } catch (e) {
                    setA2aDelegateResult({ error: e.message });
                  } finally {
                    setA2aDelegating(false);
                  }
                },
                style: { padding: "8px 20px", background: a2aDelegating ? "#555" : "#007acc", border: "none", borderRadius: "6px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: a2aDelegating ? "not-allowed" : "pointer" },
                children: a2aDelegating ? "Delegating…" : "Delegate Task"
              }
            ) }),
            a2aDelegateResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.3)", border: `1px solid ${a2aDelegateResult.error ? "rgba(255,80,80,0.3)" : "rgba(78,201,176,0.3)"}`, borderRadius: "8px", padding: "14px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "#888", marginBottom: "6px" }, children: a2aDelegateResult.error ? "Error" : `Result · ${a2aDelegateResult.status?.state}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { fontSize: "12px", color: a2aDelegateResult.error ? "#f88" : "#d4d4d4", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }, children: a2aDelegateResult.error ? a2aDelegateResult.error : a2aDelegateResult.artifacts?.[0]?.parts?.[0]?.text || JSON.stringify(a2aDelegateResult.status, null, 2) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 15, style: { color: "#888" } }),
            "Task Log"
          ] }),
          a2aLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "24px", textAlign: "center", color: "#555", fontSize: "13px" }, children: "No tasks yet. Inbound tasks (from remote agents) and outbound tasks (delegated by this IDE) will appear here." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }, children: a2aLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", borderLeft: `3px solid ${log.direction === "inbound" ? "#4ec9b0" : "#007acc"}` }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: log.direction === "inbound" ? "#4ec9b0" : "#4fc3f7" }, children: log.direction }),
              log.remoteAgent && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "11px", color: "#888" }, children: [
                "↔ ",
                log.remoteAgent
              ] }),
              log.skill && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", padding: "1px 7px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", color: "#999" }, children: log.skill }),
              log.model && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", color: "#666", fontFamily: "monospace" }, children: log.model }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                marginLeft: "auto",
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "10px",
                fontWeight: 600,
                background: log.status === "completed" ? "rgba(78,201,176,0.15)" : log.status === "failed" ? "rgba(255,80,80,0.15)" : "rgba(255,200,0,0.1)",
                color: log.status === "completed" ? "#4ec9b0" : log.status === "failed" ? "#f88" : "#fc0"
              }, children: log.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: "#bbb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: log.prompt }),
            log.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#f88", marginTop: "3px" }, children: log.error }),
            log.finishedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "10px", color: "#555", marginTop: "3px" }, children: [
              new Date(log.startedAt).toLocaleTimeString(),
              " → ",
              new Date(log.finishedAt).toLocaleTimeString()
            ] })
          ] }, log.id)) })
        ] })
      ] }),
      activeTab === "mcp-host" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { size: 15, style: { color: "#4ec9b0" } }),
              "MCP Host Server"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              background: mcpHostStatus?.running ? "rgba(78,201,176,0.15)" : "rgba(255,100,100,0.15)",
              color: mcpHostStatus?.running ? "#4ec9b0" : "#f88"
            }, children: mcpHostStatus?.running ? "● Running" : "○ Stopped" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }, children: [
            { label: "SSE Endpoint", value: `http://localhost:${mcpHostStatus?.port ?? 3101}/sse` },
            { label: "Connected Clients", value: mcpHostStatus?.connectedClients ?? 0 },
            { label: "Tools Available", value: mcpHostStatus?.tools?.length ?? 6 }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#666", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }, children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: "#ccc", fontFamily: "monospace", wordBreak: "break-all" }, children: String(value) })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.25)", borderRadius: "8px", padding: "14px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }, children: "Connect from Claude Desktop / any MCP client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { margin: 0, fontSize: "12px", color: "#d4d4d4", fontFamily: "ui-monospace, monospace" }, children: JSON.stringify({
              mcpServers: {
                "agentic-ide": {
                  url: `http://localhost:${mcpHostStatus?.port ?? 3101}/sse`
                }
              }
            }, null, 2) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 15, style: { color: "#007acc" } }),
            "Exposed Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: (mcpHostStatus?.tools ?? [
            { name: "read_file", description: "Read a file from the open project" },
            { name: "write_file", description: "Create or overwrite a file in the open project" },
            { name: "list_files", description: "List all tracked files in the open project" },
            { name: "run_command", description: "Execute a shell command in the project root" },
            { name: "ask_agent", description: "Send a prompt to the local Ollama agent and return the reply" },
            { name: "get_project_info", description: "Return workspace root, open file, and active model info" }
          ]).map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { fontSize: "12px", color: "#4fc3f7", fontFamily: "ui-monospace, monospace", whiteSpace: "nowrap", marginTop: "1px" }, children: tool.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", color: "#888", lineHeight: 1.5 }, children: tool.description })
          ] }, tool.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: "15px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 15, style: { color: "#888" } }),
            "Configuration"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "end" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: "11px", color: "#888", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "6px" }, children: "Port" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  defaultValue: mcpHostConfig?.port ?? 3101,
                  onBlur: async (e) => {
                    const port = parseInt(e.target.value);
                    if (!port || port < 1024 || port > 65535) return;
                    const newCfg = { ...mcpHostConfig || {}, port };
                    await window.api.mcpHostSaveConfig(newCfg);
                    setMcpHostConfig(newCfg);
                  },
                  style: { width: "100%", padding: "7px 10px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { fontSize: "13px", color: "#ccc", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: mcpHostConfig?.enabled ?? true,
                  onChange: async (e) => {
                    const newCfg = { ...mcpHostConfig || {}, enabled: e.target.checked };
                    await window.api.mcpHostSaveConfig(newCfg);
                    setMcpHostConfig(newCfg);
                  }
                }
              ),
              "Enable MCP Host Server"
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: { __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stat-card {
          background: rgba(37, 37, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 24px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s;
        }
        .stat-card:hover {
          border-color: rgba(0, 122, 204, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .stat-card label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          color: #777;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .stat-card value {
          display: block;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .stat-trend {
          font-size: 11px;
          color: #555;
        }
        .usage-section {
          background: rgba(30, 30, 30, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 32px;
        }
        .section-title {
          font-size: 14px;
          color: #eee;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .usage-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .usage-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .usage-name { color: #ccc; }
        .usage-value { color: #888; font-family: monospace; }
        .bar-wrapper {
          height: 4px;
          width: 100%;
          position: relative;
          background: rgba(255,255,255,0.03);
          border-radius: 2px;
        }
        .bar-fill {
          height: 100%;
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(0,0,0,0.4);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card-hover:hover {
          background: rgba(255,255,255,0.02) !important;
          border-color: rgba(0, 122, 204, 0.2) !important;
          transform: translateX(4px);
        }
      ` } })
  ] });
}
function getBreadcrumbs(path) {
  return path.split("/").slice(-3);
}
function App() {
  const [rootPath, setRootPath] = reactExports.useState(null);
  const [sessions, setSessions] = reactExports.useState([]);
  const [activeId, setActiveId] = reactExports.useState("");
  const [tree, setTree] = reactExports.useState([]);
  const [openDirs, setOpenDirs] = reactExports.useState(/* @__PURE__ */ new Set());
  const [openFile, setOpenFile] = reactExports.useState(null);
  const [tabs, setTabs] = reactExports.useState([]);
  const [dirtyTabs, setDirtyTabs] = reactExports.useState(/* @__PURE__ */ new Set());
  const [fileContent, setFileContent] = reactExports.useState("");
  const [diffInfo, setDiffInfo] = reactExports.useState(null);
  const [model, setModel] = reactExports.useState("");
  const [models, setModels] = reactExports.useState([]);
  const handleSessionsChange = reactExports.useCallback((next) => {
    try {
      const normalize = (s15) => {
        const { lastActive, ...rest } = s15;
        return rest;
      };
      const normalized = next.map(normalize);
      const json = JSON.stringify(normalized);
      if (App._lastSessionsJson !== json) {
        setSessions(next);
        App._lastSessionsJson = json;
      }
    } catch (e) {
      setSessions(next);
    }
  }, []);
  const handleActiveIdChange = reactExports.useCallback((id2) => {
    if (!id2) return;
    setActiveId((prev) => prev === id2 ? prev : id2);
  }, []);
  const [terminalOpen, setTerminalOpen] = reactExports.useState(true);
  const [user, setUser] = reactExports.useState(null);
  const [loginLoading, setLoginLoading] = reactExports.useState(false);
  const [showLoginForm, setShowLoginForm] = reactExports.useState(false);
  const [loginName, setLoginName] = reactExports.useState("");
  const [loginUsername, setLoginUsername] = reactExports.useState("");
  const [loginToken, setLoginToken] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState("");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [activeSidebar, setActiveSidebar] = reactExports.useState("explorer");
  const [history, setHistory] = reactExports.useState([]);
  const [historyIdx, setHistoryIdx] = reactExports.useState(-1);
  const [quickOpen, setQuickOpen] = reactExports.useState(false);
  const [quickQuery, setQuickQuery] = reactExports.useState("");
  const [allFiles, setAllFiles] = reactExports.useState([]);
  const quickRef = reactExports.useRef(null);
  const lastRestoredSessionIdRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const loadModels = async () => {
      try {
        const r2 = await fetch("http://127.0.0.1:11434/api/tags");
        if (!r2.ok) throw new Error("bad status");
        const data = await r2.json();
        const names = (data.models || []).map((m2) => m2.name);
        if (names.length > 0) {
          setModels(names);
          setModel(names[0]);
          return;
        }
      } catch {
      }
      try {
        const names = await window.api.ollamaTags();
        setModels(names);
        if (names.length > 0) setModel(names[0]);
      } catch {
      }
    };
    loadModels();
    window.api.loadSessions().then(async (data) => {
      try {
        if (!data) return;
        if (data.user) setUser(data.user);
        let loadedSessions = [];
        if (Array.isArray(data)) {
          loadedSessions = data;
        } else if (data.sessions && Array.isArray(data.sessions)) {
          loadedSessions = data.sessions;
        }
        if (loadedSessions.length === 0) return;
        setSessions(loadedSessions);
        const firstSession = loadedSessions[0];
        setActiveId(firstSession.id);
        if (firstSession.workspace) {
          const workspacePath = firstSession.workspace;
          setRootPath(workspacePath);
          try {
            const [treeData, files] = await Promise.all([
              window.api.readDir(workspacePath),
              window.api.listFiles(workspacePath)
            ]);
            setTree(treeData);
            setAllFiles(files);
            setOpenDirs(/* @__PURE__ */ new Set());
          } catch (e) {
            console.warn("Failed to restore workspace tree:", e);
          }
        }
        if (firstSession.tabs && firstSession.tabs.length > 0) {
          setTabs(firstSession.tabs);
        }
        if (firstSession.openFile) {
          setOpenFile(firstSession.openFile);
          try {
            const content = await window.api.readFile(firstSession.openFile);
            setFileContent(content);
          } catch (e) {
            console.warn("Failed to restore open file content:", e);
            setFileContent("");
          }
        }
      } catch (e) {
        console.warn("Failed to load sessions:", e);
      }
    });
  }, []);
  reactExports.useEffect(() => {
    if (rootPath) {
      window.api.onFileChanged(() => {
        refreshTree();
      });
    }
    return () => {
      window.api.offFileChanged();
    };
  }, [rootPath]);
  reactExports.useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setQuickOpen((o2) => !o2);
        setQuickQuery("");
      }
      if (e.key === "Escape") setQuickOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  reactExports.useEffect(() => {
    if (quickOpen) setTimeout(() => quickRef.current?.focus(), 50);
  }, [quickOpen]);
  reactExports.useEffect(() => {
    if (activeId && sessions.length > 0) {
      if (lastRestoredSessionIdRef.current === activeId) {
        return;
      }
      const activeSession = sessions.find((s15) => s15.id === activeId);
      if (activeSession) {
        lastRestoredSessionIdRef.current = activeId;
        const savedTabs = activeSession.tabs;
        const savedOpenFile = activeSession.openFile;
        const savedWorkspace = activeSession.workspace || null;
        const hasPersistedState = savedTabs !== void 0 || savedOpenFile !== void 0;
        if (!hasPersistedState) {
          if (savedWorkspace && savedWorkspace !== rootPath) {
            setRootPath(savedWorkspace);
            window.api.readDir(savedWorkspace).then((t2) => setTree(t2)).catch(console.error);
            setOpenDirs(/* @__PURE__ */ new Set());
            window.api.listFiles(savedWorkspace).then((files) => setAllFiles(files)).catch(console.error);
          }
          return;
        }
        const resolvedTabs = savedTabs || [];
        const resolvedOpenFile = savedOpenFile || null;
        if (savedWorkspace && savedWorkspace !== rootPath) {
          setRootPath(savedWorkspace);
          window.api.readDir(savedWorkspace).then((t2) => setTree(t2)).catch(console.error);
          setOpenDirs(/* @__PURE__ */ new Set());
          window.api.listFiles(savedWorkspace).then((files) => setAllFiles(files)).catch(console.error);
        }
        if (JSON.stringify(tabs) !== JSON.stringify(resolvedTabs)) {
          setTabs(resolvedTabs);
        }
        if (openFile !== resolvedOpenFile) {
          setOpenFile(resolvedOpenFile);
          if (resolvedOpenFile) {
            window.api.readFile(resolvedOpenFile).then((content) => {
              setFileContent(content);
            }).catch(() => {
              setFileContent("");
            });
          } else {
            setFileContent("");
          }
        }
      }
    }
  }, [activeId, sessions]);
  async function openFolder() {
    const p2 = await window.api.openFolder();
    if (!p2) return;
    setRootPath(p2);
    const t2 = await window.api.readDir(p2);
    setTree(t2);
    setOpenDirs(/* @__PURE__ */ new Set());
    const files = await window.api.listFiles(p2);
    setAllFiles(files);
  }
  const selectFile = reactExports.useCallback(async (path, fromHistory = false) => {
    if (!tabs.includes(path)) {
      setTabs((prev) => [...prev, path]);
    }
    const content = await window.api.readFile(path);
    setOpenFile(path);
    setFileContent(content);
    setDiffInfo(null);
    setQuickOpen(false);
    if (!fromHistory) {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIdx + 1);
        const next = [...trimmed, path];
        setHistoryIdx(next.length - 1);
        return next;
      });
    }
  }, [tabs, historyIdx]);
  function closeTab(path, e) {
    if (e) e.stopPropagation();
    if (dirtyTabs.has(path)) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close this tab?")) {
        return;
      }
    }
    const newTabs = tabs.filter((t2) => t2 !== path);
    setTabs(newTabs);
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      next.delete(path);
      return next;
    });
    if (openFile === path) {
      if (newTabs.length > 0) {
        selectFile(newTabs[newTabs.length - 1], true);
      } else {
        setOpenFile(null);
        setFileContent("");
      }
    }
  }
  async function handleSelectDiff(relPath) {
    if (!rootPath) return;
    const res = await window.api.gitGetFileDiff(rootPath, relPath);
    setDiffInfo({ filename: relPath, original: res.original, current: res.current });
    setOpenFile(null);
  }
  function goBack() {
    if (historyIdx > 0) {
      const idx = historyIdx - 1;
      setHistoryIdx(idx);
      selectFile(history[idx], true);
    }
  }
  function goForward() {
    if (historyIdx < history.length - 1) {
      const idx = historyIdx + 1;
      setHistoryIdx(idx);
      selectFile(history[idx], true);
    }
  }
  const refreshTree = reactExports.useCallback(async () => {
    if (rootPath) setTree(await window.api.readDir(rootPath));
  }, [rootPath]);
  const saveFileAs = reactExports.useCallback(async (content) => {
    const defaultPath = rootPath ? rootPath + "/untitled" : "untitled";
    const savedPath = await window.api.saveDialog(defaultPath, content);
    if (!savedPath) return;
    if (!tabs.includes(savedPath)) {
      setTabs((prev) => [...prev, savedPath]);
    }
    setOpenFile(savedPath);
    setFileContent(content);
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      next.delete(savedPath);
      return next;
    });
    await refreshTree();
  }, [rootPath, tabs, refreshTree]);
  const saveFile = reactExports.useCallback(async (content) => {
    if (!openFile) {
      await saveFileAs(content);
      return;
    }
    await window.api.writeFile(openFile, content);
    setFileContent(content);
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      next.delete(openFile);
      return next;
    });
  }, [openFile, saveFileAs]);
  async function handleContextMenu(path, isDir) {
    const action = await window.api.showContextMenu(path, isDir);
    if (!action) return;
    if (action === "delete") {
      if (window.confirm(`Are you sure you want to delete ${path.split("/").pop()}?`)) {
        await window.api.deleteFile(path);
        refreshTree();
      }
    } else if (action === "rename") {
      const newName = window.prompt("Enter new name:", path.split("/").pop());
      if (newName) {
        const newPath = path.substring(0, path.lastIndexOf("/")) + "/" + newName;
        await window.api.renameFile(path, newPath);
        refreshTree();
      }
    } else if (action === "new-file") {
      const newName = window.prompt("Enter file name:");
      if (newName) {
        await window.api.writeFile(path + "/" + newName, "");
        refreshTree();
      }
    } else if (action === "new-folder") {
      const newName = window.prompt("Enter folder name:");
      if (newName) {
        await window.api.writeFile(path + "/" + newName + "/.gitkeep", "");
        refreshTree();
      }
    }
  }
  async function handleLogin() {
    setLoginError("");
    const name = loginName.trim();
    const username = loginUsername.trim();
    const token = loginToken.trim();
    if (!name) {
      setLoginError("Please enter a display name.");
      return;
    }
    if (!username) {
      setLoginError("Please enter a GitHub username.");
      return;
    }
    if (!token) {
      setLoginError("Please enter a GitHub Personal Access Token.");
      return;
    }
    setLoginLoading(true);
    try {
      const newUser = {
        name,
        login: username,
        avatar: `https://github.com/${encodeURIComponent(username)}.png`,
        token
      };
      await new Promise((r2) => setTimeout(r2, 400));
      setUser(newUser);
      setShowLoginForm(false);
      setLoginName("");
      setLoginUsername("");
      setLoginToken("");
      const userToSave = { name: newUser.name, login: newUser.login, avatar: newUser.avatar };
      const existing = await window.api.loadSessions() || {};
      await window.api.saveSessions(JSON.stringify({ ...existing, user: userToSave }));
    } finally {
      setLoginLoading(false);
    }
  }
  async function handleLogout() {
    setUser(null);
    const existing = await window.api.loadSessions() || {};
    delete existing.user;
    await window.api.saveSessions(JSON.stringify(existing));
  }
  function toggleDir(path) {
    setOpenDirs((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  }
  const handleOpenFile = reactExports.useCallback((path) => selectFile(path, true), [selectFile]);
  const handleOpenDiff = reactExports.useCallback((filename, original, current) => {
    setDiffInfo({ filename, original, current });
    setOpenFile(null);
  }, []);
  const filteredFiles = quickQuery ? allFiles.filter((f2) => f2.toLowerCase().includes(quickQuery.toLowerCase())).slice(0, 12) : allFiles.slice(0, 12);
  function getFileIcon(filePath) {
    const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
    const colors = {
      ts: "#3178c6",
      tsx: "#61dafb",
      js: "#f1e05a",
      jsx: "#61dafb",
      json: "#cbcb41",
      md: "#b0bec5",
      css: "#a06ccd",
      html: "#e34c26",
      py: "#4b8bbe",
      rs: "#dea584",
      go: "#00ADD8",
      sh: "#89e051",
      svg: "#ffb13b",
      png: "#90a4ae",
      jpg: "#90a4ae",
      gif: "#90a4ae",
      lock: "#777",
      yml: "#cbcb41",
      yaml: "#cbcb41",
      env: "#aaa",
      toml: "#9c4221",
      sql: "#e38d40",
      graphql: "#e535ab"
    };
    const color = colors[ext] ?? "#9cdcfe";
    let IconComponent = File;
    if (["ts", "tsx", "js", "jsx", "json", "py", "rs", "go", "sh", "html", "css", "yml", "yaml", "toml", "sql", "graphql"].includes(ext)) {
      IconComponent = FileCode;
    } else if (["md", "txt", "log", "env"].includes(ext)) {
      IconComponent = FileText;
    } else if (["png", "jpg", "jpeg", "gif", "svg", "ico"].includes(ext)) {
      IconComponent = FileImage;
    } else if (["lock", "key"].includes(ext)) {
      IconComponent = FileKey;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconComponent,
      {
        size: 14,
        strokeWidth: 1.8,
        style: { color, display: "block" }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topbar-nav", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-btn", onClick: goBack, disabled: historyIdx <= 0, title: "Go Back", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, strokeWidth: 1.8 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-btn", onClick: goForward, disabled: historyIdx >= history.length - 1, title: "Go Forward", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, strokeWidth: 1.8 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "topbar-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "quick-open-trigger", onClick: () => {
        setQuickOpen(true);
        setQuickQuery("");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 13, strokeWidth: 1.8, style: { opacity: 0.5, flexShrink: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "quick-open-label", children: openFile ? getBreadcrumbs(openFile).join(" › ") : "Open file... (⌘P)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topbar-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `nav-btn${terminalOpen ? " nav-btn--active" : ""}`,
            onClick: () => setTerminalOpen((o2) => !o2),
            title: "Toggle Terminal",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { size: 16, strokeWidth: 1.8 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "topbar-model", children: model })
      ] })
    ] }),
    quickOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-overlay", onClick: () => setQuickOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-panel", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-input-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 14, strokeWidth: 1.8, style: { opacity: 0.5, flexShrink: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: quickRef,
            className: "quick-input",
            placeholder: "Search files...",
            value: quickQuery,
            onChange: (e) => setQuickQuery(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && filteredFiles.length > 0) selectFile(filteredFiles[0]);
              if (e.key === "Escape") setQuickOpen(false);
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "quick-results", children: filteredFiles.map((f2) => {
        const parts = f2.split("/");
        const name = parts.pop() || f2;
        const dir = parts.slice(-2).join("/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "quick-result", onClick: () => selectFile(f2), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "qr-name", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "qr-dir", children: dir })
        ] }, f2);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "main-layout",
        style: {
          gridTemplateColumns: sidebarOpen && activeSidebar !== "dashboard" ? "48px 220px 1fr 400px" : "48px 1fr 400px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-bar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `activity-btn ${activeSidebar === "explorer" && sidebarOpen ? "activity-btn--active" : ""}`,
                onClick: () => {
                  if (activeSidebar === "explorer") setSidebarOpen(!sidebarOpen);
                  else {
                    setActiveSidebar("explorer");
                    setSidebarOpen(true);
                  }
                },
                "data-tooltip": "Explorer",
                "data-tooltip-position": "right",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { size: 22, strokeWidth: 1.6 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `activity-btn ${activeSidebar === "git" && sidebarOpen ? "activity-btn--active" : ""}`,
                onClick: () => {
                  if (activeSidebar === "git") setSidebarOpen(!sidebarOpen);
                  else {
                    setActiveSidebar("git");
                    setSidebarOpen(true);
                  }
                },
                "data-tooltip": "Source Control",
                "data-tooltip-position": "right",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { size: 22, strokeWidth: 1.6 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-bar-bottom", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `activity-btn ${activeSidebar === "account" && sidebarOpen ? "activity-btn--active" : ""}`,
                  onClick: () => {
                    if (activeSidebar === "account") setSidebarOpen(!sidebarOpen);
                    else {
                      setActiveSidebar("account");
                      setSidebarOpen(true);
                    }
                  },
                  "data-tooltip": "Accounts",
                  "data-tooltip-position": "right",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 22, strokeWidth: 1.6 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `activity-btn ${activeSidebar === "dashboard" ? "activity-btn--active" : ""}`,
                  onClick: () => setActiveSidebar("dashboard"),
                  "data-tooltip": "Dashboard",
                  "data-tooltip-position": "right",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 22, strokeWidth: 1.6 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "activity-btn",
                  "data-tooltip": "Settings",
                  "data-tooltip-position": "right",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 22, strokeWidth: 1.6 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar", style: { display: sidebarOpen && activeSidebar !== "dashboard" ? "flex" : "none" }, children: activeSidebar === "explorer" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sidebar-btn", onClick: openFolder, children: "Open Folder" }),
              rootPath && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sidebar-root", children: rootPath.split("/").pop() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileTree, { nodes: tree, onSelect: selectFile, openDirs, onToggleDir: toggleDir, onContextMenu: handleContextMenu })
          ] }) : activeSidebar === "git" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SourceControl,
            {
              rootPath,
              model,
              onSelectFile: selectFile,
              onSelectDiff: handleSelectDiff,
              user
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-view", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Account" }),
            !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "account-info", children: "Sign in with any account to sync your settings and workspace." }),
              !showLoginForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "github-login-btn",
                  onClick: () => {
                    setShowLoginForm(true);
                    setLoginError("");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" }) }),
                    "Sign In"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-form", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "login-label", children: "Display Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "login-input",
                      type: "text",
                      placeholder: "e.g. John Doe",
                      value: loginName,
                      onChange: (e) => setLoginName(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleLogin(),
                      autoFocus: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "login-label", children: "GitHub Username" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "login-input",
                      type: "text",
                      placeholder: "e.g. octocat",
                      value: loginUsername,
                      onChange: (e) => setLoginUsername(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleLogin()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "login-hint", children: "Your avatar will be fetched automatically." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "login-label", children: "Personal Access Token" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "login-input",
                      type: "password",
                      placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx",
                      value: loginToken,
                      onChange: (e) => setLoginToken(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleLogin()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "login-hint", children: [
                    "Needs ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "repo" }),
                    " scope.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/settings/tokens/new", target: "_blank", rel: "noreferrer", className: "login-link", children: "Create token →" })
                  ] })
                ] }),
                loginError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-error", children: loginError }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-actions", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      className: "github-login-btn",
                      onClick: handleLogin,
                      disabled: loginLoading,
                      children: [
                        loginLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spinner" }) : null,
                        loginLoading ? "Signing in..." : "Sign In"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "profile-btn",
                      onClick: () => {
                        setShowLoginForm(false);
                        setLoginError("");
                      },
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-profile", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: "Avatar", className: "profile-avatar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-name", children: user.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "profile-login", children: [
                    "@",
                    user.login
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stats", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", style: { fontSize: 12, color: user.token ? "#4ec9b0" : "#f48771" }, children: user.token ? "✓ Active" : "✗ None" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Token" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
                    "@",
                    user.login
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "GitHub" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-actions", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "profile-btn profile-btn--primary", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, strokeWidth: 2 }),
                  "Sync Settings"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "profile-btn", onClick: handleLogout, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13, strokeWidth: 2 }),
                  "Sign Out"
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "center-column", children: activeSidebar === "dashboard" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, { models, sessions, rootPath }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-container", children: [
              tabs.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `tab ${openFile === t2 ? "tab--active" : ""}`,
                  onClick: () => selectFile(t2, true),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-icon", children: getFileIcon(t2) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-label", children: t2.split(/[\\/]/).pop() }),
                    dirtyTabs.has(t2) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-dirty", children: "●" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tab-close", onClick: (e) => closeTab(t2, e), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X$1, { size: 10, strokeWidth: 2.5 }) })
                  ]
                },
                t2
              )),
              diffInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab tab--active tab--diff", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { size: 12, strokeWidth: 2 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tab-label", children: [
                  diffInfo.filename,
                  " (Diff)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tab-close", onClick: () => setDiffInfo(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X$1, { size: 10, strokeWidth: 2.5 }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-area", children: diffInfo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              DiffView,
              {
                filename: diffInfo.filename,
                original: diffInfo.original,
                current: diffInfo.current
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Editor,
              {
                path: openFile,
                content: fileContent,
                onChange: (val) => {
                  setFileContent(val);
                  if (openFile) {
                    setDirtyTabs((prev) => new Set(prev).add(openFile));
                  }
                },
                onSave: saveFile,
                onSaveAs: saveFileAs,
                sessions,
                onRestoreSession: setActiveId,
                onOpenFolder: openFolder
              }
            ) }),
            terminalOpen && activeSidebar !== "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(TerminalPanel, { cwd: rootPath }, rootPath || "empty")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChatPanel,
            {
              model,
              models,
              onModelChange: setModel,
              rootPath,
              openFile,
              fileContent,
              onWriteFile: saveFile,
              onRefreshTree: refreshTree,
              onOpenFile: handleOpenFile,
              onOpenDiff: handleOpenDiff,
              onSessionsChange: handleSessionsChange,
              activeId,
              onActiveIdChange: handleActiveIdChange,
              openFiles: tabs,
              activeFile: openFile
            }
          )
        ]
      }
    )
  ] });
}
client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
