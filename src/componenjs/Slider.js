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

  // Real slide count
  var totalRealSlides = slides.length;

  // State tracks our position relative to the expanded track array (Index 1 is the first REAL slide)
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
    isPaused = _useState6[0],
    setIsPaused = _useState6[1];

  // Create our expanded track array: [ Last Slide, ...All Real Slides, First Slide ]
  var expandedSlides = [slides[totalRealSlides - 1]].concat(_toConsumableArray(slides), [slides[0]]);
  var nextSlide = function nextSlide() {
    // Prevent button-smashing during an active transition swap
    if (!isTransitioning) return;
    setVirtualIndex(function (prev) {
      return prev + 1;
    });
  };
  var prevSlide = function prevSlide() {
    if (!isTransitioning) return;
    setVirtualIndex(function (prev) {
      return prev - 1;
    });
  };

  // Invisible Reset Handler: Runs automatically whenever a CSS slide transition finishes
  var handleTransitionEnd = function handleTransitionEnd() {
    // Case A: We just slid forward onto the cloned first slide at the very end
    if (virtualIndex === expandedSlides.length - 1) {
      setIsTransitioning(false); // Disables CSS transition animation
      setVirtualIndex(1); // Instantly snaps back to the real first slide
    }
    // Case B: We just slid backward onto the cloned last slide at the very beginning
    else if (virtualIndex === 0) {
      setIsTransitioning(false); // Disables CSS transition animation
      setVirtualIndex(totalRealSlides); // Instantly snaps to the real last slide
    }
  };

  // Re-enable animations on the next tick after an instant snap reset happens
  (0, _react.useEffect)(function () {
    if (!isTransitioning) {
      // Force a tiny layout recalculation window, then flip transitions back on
      var raf = requestAnimationFrame(function () {
        setIsTransitioning(true);
      });
      return function () {
        return cancelAnimationFrame(raf);
      };
    }
  }, [isTransitioning]);

  // Autoplay Loop Logic (10 seconds)
  (0, _react.useEffect)(function () {
    if (isPaused) return;
    var timer = setInterval(function () {
      nextSlide();
    }, 10000);
    return function () {
      return clearInterval(timer);
    };
  }, [isPaused, virtualIndex, isTransitioning]);

  // Math to map our extended indices back to a clean 0-4 range for our pagination dots
  var getActiveDotIndex = function getActiveDotIndex() {
    if (virtualIndex === 0) return totalRealSlides - 1;
    if (virtualIndex === expandedSlides.length - 1) return 0;
    return virtualIndex - 1;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-container",
    onMouseEnter: function onMouseEnter() {
      return setIsPaused(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsPaused(false);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-window"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-track",
    onTransitionEnd: handleTransitionEnd,
    style: {
      transform: "translateX(-".concat(virtualIndex * 100, "%)"),
      // Dynamically remove the transition styling during the 0ms snap reset phase
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
      className: "slider-button",
      target: slide.buttonUrl.startsWith("http") ? "_blank" : "_self",
      rel: "noopener noreferrer"
    }, slide.buttonText)), /*#__PURE__*/_react.default.createElement("div", {
      className: "slide-image-side"
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: slide.imageUrl,
      alt: slide.title
    })));
  }))), /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn prev",
    onClick: prevSlide
  }, "\u2190"), /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn next",
    onClick: nextSlide
  }, "\u2192"), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-dots"
  }, slides.map(function (_, index) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index,
      className: "dot ".concat(index === getActiveDotIndex() ? "active" : ""),
      onClick: function onClick() {
        if (!isTransitioning) return;
        setVirtualIndex(index + 1);
      }
    });
  })));
};