'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRule = registerRule;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _lodash = require('lodash');

var _rules = require('./rules');

var rules = _interopRequireWildcard(_rules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MJMLRulesCollection = {};

function registerRule(rule, name) {
  if (typeof rule !== 'function') {
    return (0, _warning2.default)(false, 'Your rule must be a function');
  }

  if (name) {
    MJMLRulesCollection[name] = rule;
  } else {
    MJMLRulesCollection[rule.name] = rule;
  }

  return true;
}

(0, _lodash.mapKeys)(rules, function (func, name) {
  return registerRule(func, name);
});

exports.default = MJMLRulesCollection;