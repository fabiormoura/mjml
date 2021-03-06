'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDependencies = exports.dependencies = exports.registerRule = exports.rulesCollection = exports.formatValidationError = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _dependencies2 = require('./dependencies');

Object.defineProperty(exports, 'registerDependencies', {
  enumerable: true,
  get: function get() {
    return _dependencies2.registerDependencies;
  }
});
exports.default = MJMLValidator;

var _lodash = require('lodash');

var _ruleError = require('./rules/ruleError');

var _ruleError2 = _interopRequireDefault(_ruleError);

var _MJMLRulesCollection = require('./MJMLRulesCollection');

var _MJMLRulesCollection2 = _interopRequireDefault(_MJMLRulesCollection);

var _dependencies3 = _interopRequireDefault(_dependencies2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SKIP_ELEMENTS = ['mjml'];

var formatValidationError = exports.formatValidationError = _ruleError2.default;

exports.rulesCollection = _MJMLRulesCollection2.default;
exports.registerRule = _MJMLRulesCollection.registerRule;
exports.dependencies = _dependencies3.default;
function MJMLValidator(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = element.children,
      tagName = element.tagName;

  var errors = void 0;

  var skipElements = options.skipElements || SKIP_ELEMENTS;

  if (!(0, _lodash.includes)(skipElements, tagName)) {
    errors = (0, _lodash.flatten)(_lodash.concat.apply(undefined, [errors].concat((0, _toConsumableArray3.default)((0, _lodash.values)(_MJMLRulesCollection2.default).map(function (rule) {
      return rule(element, (0, _extends3.default)({
        skipElements: skipElements
      }, options));
    })))));
  }

  if (children && children.length > 0) {
    errors = (0, _lodash.flatten)(_lodash.concat.apply(undefined, [errors].concat((0, _toConsumableArray3.default)(children.map(function (child) {
      return MJMLValidator(child, options);
    })))));
  }

  return (0, _lodash.filter)(errors);
}