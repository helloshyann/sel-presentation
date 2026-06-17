"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureCard = void 0;
var _react = _interopRequireDefault(require("react"));
require("../data/featuresData");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var FeatureCard = exports.FeatureCard = function FeatureCard(_ref) {
  var card = _ref.card;
  var tag = card.tag,
    title = card.title,
    question = card.question,
    why = card.why,
    how = card.how;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "feature-card uniform-layout-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content-column"
  }, tag && /*#__PURE__*/_react.default.createElement("span", {
    className: "card-tag"
  }, tag), /*#__PURE__*/_react.default.createElement("h3", {
    className: "card-title"
  }, title), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-question"
  }, question), /*#__PURE__*/_react.default.createElement("h4", null, "Why?"), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-description"
  }, why), /*#__PURE__*/_react.default.createElement("h4", null, "How?"), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-description"
  }, how)));
};