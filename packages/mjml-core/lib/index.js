'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadComponent = exports.BodyComponent = exports.initializeType = exports.handleMjmlConfig = exports.suffixCssClasses = exports.registerComponent = exports.initComponent = exports.components = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = mjml2html;

var _createComponent = require('./createComponent');

Object.defineProperty(exports, 'BodyComponent', {
  enumerable: true,
  get: function get() {
    return _createComponent.BodyComponent;
  }
});
Object.defineProperty(exports, 'HeadComponent', {
  enumerable: true,
  get: function get() {
    return _createComponent.HeadComponent;
  }
});

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _juice = require('juice');

var _juice2 = _interopRequireDefault(_juice);

var _jsBeautify = require('js-beautify');

var _htmlMinifier = require('html-minifier');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _mjmlParserXml = require('mjml-parser-xml');

var _mjmlParserXml2 = _interopRequireDefault(_mjmlParserXml);

var _mjmlValidator = require('mjml-validator');

var _mjmlValidator2 = _interopRequireDefault(_mjmlValidator);

var _mjmlMigrate = require('mjml-migrate');

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _suffixCssClasses = require('./helpers/suffixCssClasses');

var _suffixCssClasses2 = _interopRequireDefault(_suffixCssClasses);

var _mergeOutlookConditionnals = require('./helpers/mergeOutlookConditionnals');

var _mergeOutlookConditionnals2 = _interopRequireDefault(_mergeOutlookConditionnals);

var _minifyOutlookConditionnals = require('./helpers/minifyOutlookConditionnals');

var _minifyOutlookConditionnals2 = _interopRequireDefault(_minifyOutlookConditionnals);

var _skeleton = require('./helpers/skeleton');

var _skeleton2 = _interopRequireDefault(_skeleton);

var _type = require('./types/type');

var _mjmlconfig = require('./helpers/mjmlconfig');

var _mjmlconfig2 = _interopRequireDefault(_mjmlconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationError = function (_Error) {
  (0, _inherits3.default)(ValidationError, _Error);

  function ValidationError(message, errors) {
    (0, _classCallCheck3.default)(this, ValidationError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ValidationError.__proto__ || (0, _getPrototypeOf2.default)(ValidationError)).call(this, message));

    _this.errors = errors;
    return _this;
  }

  return ValidationError;
}(Error);

function mjml2html(mjml) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var content = '';
  var errors = [];

  if (typeof options.skeleton === 'string') {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    options.skeleton = require(options.skeleton.charAt(0) === '.' ? _path2.default.resolve(process.cwd(), options.skeleton) : options.skeleton);
    /* eslint-enable global-require */
    /* eslint-enable import/no-dynamic-require */
  }

  var packages = {};
  var confOptions = {};
  var mjmlConfigOptions = {};
  var error = null;
  var componentRootPath = null;

  if (options.useMjmlConfigOptions || options.mjmlConfigPath) {
    var mjmlConfigContent = (0, _mjmlconfig.readMjmlConfig)(options.mjmlConfigPath);var _mjmlConfigContent$mj = mjmlConfigContent.mjmlConfig;
    packages = _mjmlConfigContent$mj.packages;
    confOptions = _mjmlConfigContent$mj.options;
    componentRootPath = mjmlConfigContent.componentRootPath;
    error = mjmlConfigContent.error;


    if (options.useMjmlConfigOptions) {
      mjmlConfigOptions = confOptions;
    }
  }

  // if mjmlConfigPath is specified then we need to register components it on each call
  if (!error && options.mjmlConfigPath) {
    (0, _mjmlconfig.handleMjmlConfigComponents)(packages, componentRootPath, _components.registerComponent);
  }

  var _mjmlConfigOptions$op = (0, _extends3.default)({}, mjmlConfigOptions, options),
      _mjmlConfigOptions$op2 = _mjmlConfigOptions$op.beautify,
      beautify = _mjmlConfigOptions$op2 === undefined ? false : _mjmlConfigOptions$op2,
      _mjmlConfigOptions$op3 = _mjmlConfigOptions$op.fonts,
      fonts = _mjmlConfigOptions$op3 === undefined ? {
    'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
    'Droid Sans': 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
    Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
    Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    Ubuntu: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700'
  } : _mjmlConfigOptions$op3,
      keepComments = _mjmlConfigOptions$op.keepComments,
      _mjmlConfigOptions$op4 = _mjmlConfigOptions$op.minify,
      minify = _mjmlConfigOptions$op4 === undefined ? false : _mjmlConfigOptions$op4,
      _mjmlConfigOptions$op5 = _mjmlConfigOptions$op.minifyOptions,
      minifyOptions = _mjmlConfigOptions$op5 === undefined ? {} : _mjmlConfigOptions$op5,
      _mjmlConfigOptions$op6 = _mjmlConfigOptions$op.juiceOptions,
      juiceOptions = _mjmlConfigOptions$op6 === undefined ? {} : _mjmlConfigOptions$op6,
      _mjmlConfigOptions$op7 = _mjmlConfigOptions$op.juicePreserveTags,
      juicePreserveTags = _mjmlConfigOptions$op7 === undefined ? null : _mjmlConfigOptions$op7,
      _mjmlConfigOptions$op8 = _mjmlConfigOptions$op.skeleton,
      skeleton = _mjmlConfigOptions$op8 === undefined ? _skeleton2.default : _mjmlConfigOptions$op8,
      _mjmlConfigOptions$op9 = _mjmlConfigOptions$op.validationLevel,
      validationLevel = _mjmlConfigOptions$op9 === undefined ? 'soft' : _mjmlConfigOptions$op9,
      _mjmlConfigOptions$op10 = _mjmlConfigOptions$op.filePath,
      filePath = _mjmlConfigOptions$op10 === undefined ? '.' : _mjmlConfigOptions$op10,
      _mjmlConfigOptions$op11 = _mjmlConfigOptions$op.actualPath,
      actualPath = _mjmlConfigOptions$op11 === undefined ? '.' : _mjmlConfigOptions$op11,
      _mjmlConfigOptions$op12 = _mjmlConfigOptions$op.noMigrateWarn,
      noMigrateWarn = _mjmlConfigOptions$op12 === undefined ? false : _mjmlConfigOptions$op12,
      preprocessors = _mjmlConfigOptions$op.preprocessors;

  if (typeof mjml === 'string') {
    mjml = (0, _mjmlParserXml2.default)(mjml, {
      keepComments: keepComments,
      components: _components2.default,
      filePath: filePath,
      actualPath: actualPath,
      preprocessors: preprocessors
    });
  }

  mjml = (0, _mjmlMigrate.handleMjml3)(mjml, { noMigrateWarn: noMigrateWarn });

  var globalDatas = {
    backgroundColor: '',
    breakpoint: '480px',
    classes: {},
    classesDefault: {},
    defaultAttributes: {},
    customAttributes: {},
    fonts: fonts,
    inlineStyle: [],
    headStyle: {},
    componentsHeadStyle: [],
    headRaw: [],
    mediaQueries: {},
    preview: '',
    style: [],
    title: '',
    forceOWADesktop: (0, _lodash.get)(mjml, 'attributes.owa', 'mobile') === 'desktop',
    lang: (0, _lodash.get)(mjml, 'attributes.lang')
  };

  var validatorOptions = {
    components: _components2.default,
    initializeType: _type.initializeType
  };

  switch (validationLevel) {
    case 'skip':
      break;

    case 'strict':
      errors = (0, _mjmlValidator2.default)(mjml, validatorOptions);

      if (errors.length > 0) {
        throw new ValidationError('ValidationError: \n ' + errors.map(function (e) {
          return e.formattedMessage;
        }).join('\n'), errors);
      }
      break;

    case 'soft':
    default:
      errors = (0, _mjmlValidator2.default)(mjml, validatorOptions);
      break;
  }

  var mjBody = (0, _lodash.find)(mjml.children, { tagName: 'mj-body' });
  var mjHead = (0, _lodash.find)(mjml.children, { tagName: 'mj-head' });

  var _processing = function _processing(node, context) {
    var parseMJML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lodash.identity;

    if (!node) {
      return;
    }

    var component = (0, _components.initComponent)({
      name: node.tagName,
      initialDatas: (0, _extends3.default)({}, parseMJML(node), {
        context: context
      })
    });

    if (component !== null) {
      if ('handler' in component) {
        return component.handler(); // eslint-disable-line consistent-return
      }

      if ('render' in component) {
        return component.render(); // eslint-disable-line consistent-return
      }
    }
  };

  var applyAttributes = function applyAttributes(mjml) {
    var parse = function parse(mjml) {
      var parentMjClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var attributes = mjml.attributes,
          tagName = mjml.tagName,
          children = mjml.children;

      var classes = (0, _lodash.get)(mjml.attributes, 'mj-class', '').split(' ');
      var attributesClasses = (0, _lodash.reduce)(classes, function (acc, value) {
        var mjClassValues = globalDatas.classes[value];
        var multipleClasses = {};
        if (acc['css-class'] && (0, _lodash.get)(mjClassValues, 'css-class')) {
          multipleClasses = {
            'css-class': acc['css-class'] + ' ' + mjClassValues['css-class']
          };
        }

        return (0, _extends3.default)({}, acc, mjClassValues, multipleClasses);
      }, {});

      var defaultAttributesForClasses = (0, _lodash.reduce)(parentMjClass.split(' '), function (acc, value) {
        return (0, _extends3.default)({}, acc, (0, _lodash.get)(globalDatas.classesDefault, value + '.' + tagName));
      }, {});
      var nextParentMjClass = (0, _lodash.get)(attributes, 'mj-class', parentMjClass);

      return (0, _extends3.default)({}, mjml, {
        attributes: (0, _extends3.default)({}, globalDatas.defaultAttributes[tagName], attributesClasses, defaultAttributesForClasses, (0, _lodash.omit)(attributes, ['mj-class'])),
        globalAttributes: (0, _extends3.default)({}, globalDatas.defaultAttributes['mj-all']),
        children: (0, _lodash.map)(children, function (mjml) {
          return parse(mjml, nextParentMjClass);
        })
      });
    };

    return parse(mjml);
  };

  var bodyHelpers = {
    addMediaQuery: function addMediaQuery(className, _ref) {
      var parsedWidth = _ref.parsedWidth,
          unit = _ref.unit;

      globalDatas.mediaQueries[className] = '{ width:' + parsedWidth + unit + ' !important; max-width: ' + parsedWidth + unit + '; }';
    },
    addHeadStyle: function addHeadStyle(identifier, headStyle) {
      globalDatas.headStyle[identifier] = headStyle;
    },
    addComponentHeadSyle: function addComponentHeadSyle(headStyle) {
      globalDatas.componentsHeadStyle.push(headStyle);
    },

    setBackgroundColor: function setBackgroundColor(color) {
      globalDatas.backgroundColor = color;
    },
    processing: function processing(node, context) {
      return _processing(node, context, applyAttributes);
    }
  };

  var headHelpers = {
    add: function add(attr) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (Array.isArray(globalDatas[attr])) {
        var _globalDatas$attr;

        (_globalDatas$attr = globalDatas[attr]).push.apply(_globalDatas$attr, (0, _toConsumableArray3.default)(params));
      } else if (Object.prototype.hasOwnProperty.call(globalDatas, attr)) {
        if (params.length > 1) {
          if ((0, _lodash.isObject)(globalDatas[attr][params[0]])) {
            globalDatas[attr][params[0]] = (0, _extends3.default)({}, globalDatas[attr][params[0]], params[1]);
          } else {
            globalDatas[attr][params[0]] = params[1];
          }
        } else {
          globalDatas[attr] = params[0];
        }
      } else {
        throw Error('An mj-head element add an unkown head attribute : ' + attr + ' with params ' + (Array.isArray(params) ? params.join('') : params));
      }
    }
  };

  globalDatas.headRaw = _processing(mjHead, headHelpers);

  content = _processing(mjBody, bodyHelpers, applyAttributes);

  if (minify && minify !== 'false') {
    content = (0, _minifyOutlookConditionnals2.default)(content);
  }

  content = skeleton((0, _extends3.default)({
    content: content
  }, globalDatas));

  if (globalDatas.inlineStyle.length > 0) {
    if (juicePreserveTags) {
      (0, _lodash.each)(juicePreserveTags, function (val, key) {
        _juice2.default.codeBlocks[key] = val;
      });
    }

    content = (0, _juice2.default)(content, (0, _extends3.default)({
      applyStyleTags: false,
      extraCss: globalDatas.inlineStyle.join(''),
      insertPreservedExtraCss: false,
      removeStyleTags: false
    }, juiceOptions));
  }

  content = beautify && beautify !== 'false' ? (0, _jsBeautify.html)(content, {
    indent_size: 2,
    wrap_attributes_indent_size: 2,
    max_preserve_newline: 0,
    preserve_newlines: false
  }) : content;

  if (minify && minify !== 'false') {
    content = (0, _htmlMinifier.minify)(content, (0, _extends3.default)({
      collapseWhitespace: true,
      minifyCSS: false,
      caseSensitive: true,
      removeEmptyAttributes: true
    }, minifyOptions));
  }

  if (!(0, _lodash.isEmpty)(globalDatas.customAttributes)) {
    var $ = _cheerio2.default.load(content);

    (0, _lodash.each)(globalDatas.customAttributes, function (data, selector) {
      (0, _lodash.each)(data, function (value, attrName) {
        $(selector).each(function () {
          $(this).attr(attrName, value);
        });
      });
    });

    content = $.root().html();
  }

  content = (0, _mergeOutlookConditionnals2.default)(content);

  return {
    html: content,
    errors: errors
  };
}

(0, _mjmlconfig2.default)(process.cwd(), _components.registerComponent);

exports.components = _components2.default;
exports.initComponent = _components.initComponent;
exports.registerComponent = _components.registerComponent;
exports.suffixCssClasses = _suffixCssClasses2.default;
exports.handleMjmlConfig = _mjmlconfig2.default;
exports.initializeType = _type.initializeType;