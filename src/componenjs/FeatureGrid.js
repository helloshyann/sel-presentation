"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureGrid = void 0;
var _react = _interopRequireDefault(require("react"));
var _FeatureCard = require("./FeatureCard");
var _featuresData = require("../data/featuresData");
require("../styles/features.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var FeatureGrid = exports.FeatureGrid = function FeatureGrid() {
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "features-section-wrapper"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Design & Development Considerations"), /*#__PURE__*/_react.default.createElement("div", {
    className: "features-uniform-grid"
  }, _featuresData.featuresData.map(function (card) {
    return /*#__PURE__*/_react.default.createElement(_FeatureCard.FeatureCard, {
      key: card.id,
      card: card
    });
  })));
};