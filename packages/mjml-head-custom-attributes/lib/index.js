'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _mjmlCore = require('mjml-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MjCustomAttributes = function (_HeadComponent) {
  (0, _inherits3.default)(MjCustomAttributes, _HeadComponent);

  function MjCustomAttributes() {
    (0, _classCallCheck3.default)(this, MjCustomAttributes);
    return (0, _possibleConstructorReturn3.default)(this, (MjCustomAttributes.__proto__ || (0, _getPrototypeOf2.default)(MjCustomAttributes)).apply(this, arguments));
  }

  (0, _createClass3.default)(MjCustomAttributes, [{
    key: 'handler',
    value: function handler() {
      var add = this.context.add;
      var children = this.props.children;


      children.filter(function (c) {
        return c.tagName === 'mj-selector';
      }).forEach(function (selector) {
        var tagName = selector.tagName,
            attributes = selector.attributes,
            children = selector.children;
        var path = attributes.path;


        var custom = children.filter(function (c) {
          return c.tagName === 'mj-custom' && !!(0, _lodash.get)(c, 'attributes.name');
        }).reduce(function (acc, c) {
          return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, c.attributes.name, c.content));
        }, {});

        add('customAttributes', path, custom);
      });
    }
  }]);
  return MjCustomAttributes;
}(_mjmlCore.HeadComponent);

exports.default = MjCustomAttributes;
module.exports = exports['default'];