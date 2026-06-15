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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Slider = exports.Slider = function Slider(_ref) {
  var slides = _ref.slides;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPaused = _useState4[0],
    setIsPaused = _useState4[1];

  // Determine the maximum index we can slide to without showing empty space
  var visibleSlides = 3;
  var maxIndex = slides.length - visibleSlides;

  // Handler to advance forward
  var nextSlide = function nextSlide() {
    setCurrentIndex(function (prevIndex) {
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  // Handler to go backward
  var prevSlide = function prevSlide() {
    setCurrentIndex(function (prevIndex) {
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  // Autoplay Logic with Pause State Listener
  (0, _react.useEffect)(function () {
    // If the user is hovering, do not spin up the timer
    if (isPaused) return;

    // Set a 10-second interval (10000 milliseconds)
    var timer = setInterval(function () {
      nextSlide();
    }, 10000);

    // CRITICAL CLEANUP: Wipes the timer when the component unmounts or pause changes
    return function () {
      return clearInterval(timer);
    };
  }, [isPaused, currentIndex]); // Dependencies re-trigger the effect cleanly

  if (!slides || slides.length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "slider-empty"
    }, "No slides available.");
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-container",
    onMouseEnter: function onMouseEnter() {
      return setIsPaused(true);
    } // Pauses timer on cursor enter
    ,
    onMouseLeave: function onMouseLeave() {
      return setIsPaused(false);
    } // Resumes timer on cursor leave
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-window"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-track",
    style: {
      // We shift by (100 / 3)% per index to step exactly 1 card width
      transform: "translateX(-".concat(currentIndex * (100 / visibleSlides), "%)")
    }
  }, slides.map(function (slide) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: slide.id,
      className: "slide-card",
      style: {
        backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(".concat(slide.imageUrl, ")")
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "slide-content"
    }, /*#__PURE__*/_react.default.createElement("h2", null, slide.title), /*#__PURE__*/_react.default.createElement("p", null, slide.subtitle)));
  }))), /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn prev",
    onClick: prevSlide
  }, "\u2190"), /*#__PURE__*/_react.default.createElement("button", {
    className: "nav-btn next",
    onClick: nextSlide
  }, "\u2192"), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-dots"
  }, Array.from({
    length: maxIndex + 1
  }).map(function (_, index) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index,
      className: "dot ".concat(index === currentIndex ? "active" : ""),
      onClick: function onClick() {
        return setCurrentIndex(index);
      }
    });
  })));
};