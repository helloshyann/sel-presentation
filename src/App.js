"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Slider = require("./components/Slider");
var _slidesData = require("./data/slidesData");
function App() {
  return /*#__PURE__*/React.createElement("main", {
    className: "page-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "src/assets/srs-fake-logo.png",
    className: "fake-logo"
  }), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Shyann's"), /*#__PURE__*/React.createElement("span", null, "Responsive"), /*#__PURE__*/React.createElement("span", null, "Slider")))), /*#__PURE__*/React.createElement("section", {
    className: "interactive-showcase"
  }, /*#__PURE__*/React.createElement(_Slider.Slider, {
    slides: _slidesData.slidesData
  })));
}
var _default = exports.default = App;