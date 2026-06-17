"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _react = _interopRequireWildcard(require("react"));
require("../data/slidesData");
require("../styles/slider.scss");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Slider = exports.Slider = function Slider(_ref) {
  var slides = _ref.slides;
  if (!slides || slides.length === 0) return /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-empty"
  }, "No slides available.");
  var totalRealSlides = slides.length;
  var _useState = (0, _react.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    virtualIndex = _useState2[0],
    setVirtualIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isTransitioning = _useState4[0],
    setIsTransitioning = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isHoverPaused = _useState6[0],
    setIsHoverPaused = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isManuallyPaused = _useState8[0],
    setIsManuallyPaused = _useState8[1];
  var isClickableRef = (0, _react.useRef)(true);
  var expandedSlides = [slides[totalRealSlides - 1]].concat(_toConsumableArray(slides), [slides[0]]);
  var nextSlide = function nextSlide() {
    if (!isClickableRef.current) return;
    isClickableRef.current = false;
    setVirtualIndex(function (prev) {
      return prev + 1;
    });
  };
  var prevSlide = function prevSlide() {
    if (!isClickableRef.current) return;
    isClickableRef.current = false;
    setVirtualIndex(function (prev) {
      return prev - 1;
    });
  };
  var handleTransitionEnd = function handleTransitionEnd() {
    if (virtualIndex === expandedSlides.length - 1) {
      setIsTransitioning(false);
      setVirtualIndex(1);
    } else if (virtualIndex === 0) {
      setIsTransitioning(false);
      setVirtualIndex(totalRealSlides);
    } else {
      isClickableRef.current = true;
    }
  };
  (0, _react.useEffect)(function () {
    if (!isTransitioning) {
      var raf = requestAnimationFrame(function () {
        setIsTransitioning(true);
        isClickableRef.current = true;
      });
      return function () {
        return cancelAnimationFrame(raf);
      };
    }
  }, [isTransitioning]);

  // Autoplay Effect Engine
  (0, _react.useEffect)(function () {
    var timer = null;
    var startTimer = function startTimer() {
      // Check states BEFORE spinning up a new interval instance
      if (isHoverPaused || isManuallyPaused) {
        return;
      }
      timer = setInterval(function () {
        nextSlide();
      }, 6000);
    };
    var stopTimer = function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    // Tab focus monitoring
    var handleVisibilityChange = function handleVisibilityChange() {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    // Initialize timer
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // This return function runs every single time a dependency changes.
    // It guarantees the old timer is completely killed before a new state takes over.
    return function () {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    // Add both pause states so the hook destroys and rebuilds perfectly
  }, [isHoverPaused, isManuallyPaused, virtualIndex, isTransitioning]);
  var getActiveDotIndex = function getActiveDotIndex() {
    if (virtualIndex === 0) return totalRealSlides - 1;
    if (virtualIndex === expandedSlides.length - 1) return 0;
    return virtualIndex - 1;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-container",
    onMouseEnter: function onMouseEnter() {
      return setIsHoverPaused(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHoverPaused(false);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-window"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-track",
    onTransitionEnd: handleTransitionEnd,
    style: {
      transform: "translateX(-".concat(virtualIndex * 100, "%)"),
      transition: isTransitioning ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
    }
  }, expandedSlides.map(function (slide, index) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: "".concat(slide.id, "-virtual-").concat(index),
      className: "slide-card"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "slide-text-side"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "product-label"
    }, slide.tag), /*#__PURE__*/_react.default.createElement("h2", null, slide.title), /*#__PURE__*/_react.default.createElement("p", null, slide.description), /*#__PURE__*/_react.default.createElement("a", {
      href: slide.buttonUrl,
      className: "slide-button",
      target: slide.buttonUrl.startsWith("http") ? "_blank" : "_self",
      rel: "noopener noreferrer"
    }, slide.buttonText)), /*#__PURE__*/_react.default.createElement("div", {
      className: "slide-image-side"
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: slide.imageUrl,
      alt: slide.title
    })));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-controls-row"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn prev",
    onClick: prevSlide,
    "aria-label": "Previous Slide"
  }, "\u2190"), /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn next",
    onClick: nextSlide,
    "aria-label": "Next Slide"
  }, "\u2192")), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-dots"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "toggle-pause-button ".concat(isManuallyPaused ? "paused" : "playing"),
    onClick: function onClick() {
      return setIsManuallyPaused(!isManuallyPaused);
    },
    "aria-label": isManuallyPaused ? "Play slider autoplay" : "Pause slider autoplay"
  }, isManuallyPaused ?
  /*#__PURE__*/
  // Play Icon SVG
  _react.default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "14",
    height: "14"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8 5v14l11-7z"
  })) :
  /*#__PURE__*/
  // Pause Icon SVG
  _react.default.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "14",
    height: "14"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
  }))), slides.map(function (_, index) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index,
      className: "dot ".concat(index === getActiveDotIndex() ? "active" : ""),
      onClick: function onClick() {
        if (!isTransitioning || !isClickableRef.current) return;
        setVirtualIndex(index + 1);
      }
    });
  })));
};