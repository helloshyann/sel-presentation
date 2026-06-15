"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./styles/slider.scss");
var _Slider = require("./components/Slider");
var _slidesData = require("./data/slidesData");
function App() {
  return /*#__PURE__*/React.createElement("main", {
    className: "page-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero-header"
  }, /*#__PURE__*/React.createElement("h1", null, "The Wanderer's Archives"), /*#__PURE__*/React.createElement("p", null, "A single-page showcase of atmospheric realms.")), /*#__PURE__*/React.createElement("section", {
    className: "interactive-showcase"
  }, /*#__PURE__*/React.createElement(_Slider.Slider, {
    slides: _slidesData.slidesData
  })));
}
var _default = exports.default = App;