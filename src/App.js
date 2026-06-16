"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Slider = require("./components/Slider");
var _slidesData = require("./data/slidesData");
var _FeatureGrid = require("./components/FeatureGrid");
function App() {
  return /*#__PURE__*/React.createElement("main", {
    className: "page-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hero-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "hero-logo",
    href: "/index.html"
  }, /*#__PURE__*/React.createElement("img", {
    src: "src/assets/srs-fake-logo.png"
  }), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Shyann's"), /*#__PURE__*/React.createElement("span", null, "Responsive"), /*#__PURE__*/React.createElement("span", null, "Slider"))), /*#__PURE__*/React.createElement("nav", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link active",
    "aria-current": "page",
    href: "/index.html"
  }, "Home")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "https://github.com/helloshyann/sel-presentation",
    target: "_blank"
  }, "Repository")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "https://helloshyann.com",
    target: "_blank"
  }, "Portfolio"))))), /*#__PURE__*/React.createElement("section", {
    className: "slider-showcase"
  }, /*#__PURE__*/React.createElement(_Slider.Slider, {
    slides: _slidesData.slidesData
  })), /*#__PURE__*/React.createElement(_FeatureGrid.FeatureGrid, null), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("a", {
    href: "https://selinc.com/",
    target: "_blank"
  }, "Made for SEL")));
}
var _default = exports.default = App;