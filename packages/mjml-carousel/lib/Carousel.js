'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _mjmlCore = require('mjml-core');

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _repeat = require('lodash/repeat');

var _repeat2 = _interopRequireDefault(_repeat);

var _min = require('lodash/min');

var _min2 = _interopRequireDefault(_min);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _conditionalTag = require('mjml-core/lib/helpers/conditionalTag');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MjCarousel = (_temp = _class = function (_BodyComponent) {
  (0, _inherits3.default)(MjCarousel, _BodyComponent);

  function MjCarousel() {
    var initialDatas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MjCarousel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MjCarousel.__proto__ || (0, _getPrototypeOf2.default)(MjCarousel)).call(this, initialDatas));

    _this.componentHeadStyle = function () {
      var length = _this.props.children.length;
      var carouselId = _this.carouselId;


      if (!length) return '';

      var carouselCss = '\n    .mj-carousel {\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      user-select: none;\n    }\n\n    .mj-carousel-' + _this.carouselId + '-icons-cell {\n      display: table-cell !important;\n      width: ' + _this.getAttribute('icon-width') + ' !important;\n    }\n\n    .mj-carousel-radio,\n    .mj-carousel-next,\n    .mj-carousel-previous {\n      display: none !important;\n    }\n\n    .mj-carousel-thumbnail,\n    .mj-carousel-next,\n    .mj-carousel-previous {\n      touch-action: manipulation;\n    }\n\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-radio:checked ' + (0, _repeat2.default)('+ * ', i) + '+ .mj-carousel-content .mj-carousel-image';
      }).join(',') + ' {\n      display: none !important;\n    }\n\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-radio-' + (i + 1) + ':checked ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-content .mj-carousel-image-' + (i + 1);
      }).join(',') + ' {\n      display: block !important;\n    }\n\n    .mj-carousel-previous-icons,\n    .mj-carousel-next-icons,\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-radio-' + (i + 1) + ':checked ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-content .mj-carousel-next-' + ((i + 1 % length + length) % length + 1);
      }) + ',\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-radio-' + (i + 1) + ':checked ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-content .mj-carousel-previous-' + ((i - 1 % length + length) % length + 1);
      }) + ' {\n      display: block !important;\n    }\n\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-radio-' + (i + 1) + ':checked ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-content .mj-carousel-' + carouselId + '-thumbnail-' + (i + 1);
      }).join(',') + ' {\n      border-color: ' + _this.getAttribute('tb-selected-border-color') + ' !important;\n    }\n\n    .mj-carousel-image img + div,\n    .mj-carousel-thumbnail img + div {\n      display: none !important;\n    }\n\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-thumbnail:hover ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-main .mj-carousel-image';
      }).join(',') + ' {\n      display: none !important;\n    }\n\n    .mj-carousel-thumbnail:hover {\n      border-color: ' + _this.getAttribute('tb-hover-border-color') + ' !important;\n    }\n\n    ' + (0, _range2.default)(0, length).map(function (i) {
        return '.mj-carousel-' + carouselId + '-thumbnail-' + (i + 1) + ':hover ' + (0, _repeat2.default)('+ * ', length - i - 1) + '+ .mj-carousel-main .mj-carousel-image-' + (i + 1);
      }).join(',') + ' {\n      display: block !important;\n    }\n    ';

      var fallback = '\n      .mj-carousel noinput { display:block !important; }\n      .mj-carousel noinput .mj-carousel-image-1 { display: block !important;  }\n      .mj-carousel noinput .mj-carousel-arrows,\n      .mj-carousel noinput .mj-carousel-thumbnails { display: none !important; }\n\n      [owa] .mj-carousel-thumbnail { display: none !important; }\n\n      @media screen yahoo {\n          .mj-carousel-' + _this.carouselId + '-icons-cell,\n          .mj-carousel-previous-icons,\n          .mj-carousel-next-icons {\n              display: none !important;\n          }\n\n          .mj-carousel-' + carouselId + '-radio-1:checked ' + (0, _repeat2.default)('+ *', length - 1) + '+ .mj-carousel-content .mj-carousel-' + carouselId + '-thumbnail-1 {\n              border-color: transparent;\n          }\n      }\n    ';

      return carouselCss + '\n' + fallback;
    };

    _this.carouselId = _crypto2.default.randomBytes(6).toString('hex');
    return _this;
  }

  (0, _createClass3.default)(MjCarousel, [{
    key: 'getStyles',
    value: function getStyles() {
      // eslint-disable-line class-methods-use-this
      return {
        carousel: {
          div: {
            display: 'table',
            width: '100%',
            'table-layout': 'fixed',
            'text-align': 'center',
            'font-size': '0px'
          },
          table: {
            'caption-side': 'top',
            display: 'table-caption',
            'table-layout': 'fixed',
            width: '100%'
          }
        },
        images: {
          td: {
            padding: '0px'
          }
        },
        controls: {
          div: {
            display: 'none',
            'mso-hide': 'all'
          },
          img: {
            display: 'block',
            width: this.getAttribute('icon-width'),
            height: 'auto'
          },
          td: {
            'font-size': '0px',
            display: 'none',
            'mso-hide': 'all',
            padding: '0px'
          }
        }
      };
    }
  }, {
    key: 'thumbnailsWidth',
    value: function thumbnailsWidth() {
      if (!this.props.children.length) return 0;
      return this.getAttribute('tb-width') || (0, _min2.default)([this.context.parentWidth / this.props.children.length, 110]) + 'px';
    }
  }, {
    key: 'imagesAttributes',
    value: function imagesAttributes() {
      return (0, _map2.default)(this.children, 'attributes');
    }
  }, {
    key: 'generateRadios',
    value: function generateRadios() {
      return this.renderChildren(this.props.children, {
        renderer: function renderer(component) {
          return component.renderRadio();
        },
        attributes: {
          carouselId: this.carouselId
        }
      });
    }
  }, {
    key: 'generateThumbnails',
    value: function generateThumbnails() {
      if (this.getAttribute('thumbnails') !== 'visible') return '';

      return this.renderChildren(this.props.children, {
        attributes: {
          'tb-border': this.getAttribute('tb-border'),
          'tb-border-radius': this.getAttribute('tb-border-radius'),
          'tb-width': this.thumbnailsWidth(),
          carouselId: this.carouselId
        },
        renderer: function renderer(component) {
          return component.renderThumbnail();
        }
      });
    }
  }, {
    key: 'generateControls',
    value: function generateControls(direction, icon) {
      var _this2 = this;

      var iconWidth = parseInt(this.getAttribute('icon-width'), 10);

      return '\n      <td\n        ' + this.htmlAttributes({
        class: 'mj-carousel-' + this.carouselId + '-icons-cell',
        style: 'controls.td'
      }) + '\n      >\n        <div\n          ' + this.htmlAttributes({
        class: 'mj-carousel-' + direction + '-icons',
        style: 'controls.div'
      }) + '\n        >\n          ' + (0, _range2.default)(1, this.props.children.length + 1).map(function (i) {
        return '\n              <label\n                ' + _this2.htmlAttributes({
          for: 'mj-carousel-' + _this2.carouselId + '-radio-' + i,
          class: 'mj-carousel-' + direction + ' mj-carousel-' + direction + '-' + i
        }) + '\n              >\n                <img\n                  ' + _this2.htmlAttributes({
          src: icon,
          alt: direction,
          style: 'controls.img',
          width: iconWidth
        }) + '\n                />\n              </label>\n            ';
      }).join('') + '\n        </div>\n      </td>\n    ';
    }
  }, {
    key: 'generateImages',
    value: function generateImages() {
      return '\n      <td\n        ' + this.htmlAttributes({
        style: 'images.td'
      }) + '\n      >\n        <div\n          ' + this.htmlAttributes({
        class: 'mj-carousel-images'
      }) + '\n        >\n          ' + this.renderChildren(this.props.children, {
        attributes: {
          'border-radius': this.getAttribute('border-radius')
        }
      }) + '\n        </div>\n      </td>\n    ';
    }
  }, {
    key: 'generateCarousel',
    value: function generateCarousel() {
      return '\n      <table\n        ' + this.htmlAttributes({
        style: 'carousel.table',
        border: '0',
        'cell-padding': '0',
        'cell-spacing': '0',
        width: '100%',
        role: 'presentation',
        class: 'mj-carousel-main'
      }) + '\n      >\n        <tbody>\n          <tr>\n            ' + this.generateControls('previous', this.getAttribute('left-icon')) + '\n            ' + this.generateImages() + '\n            ' + this.generateControls('next', this.getAttribute('right-icon')) + '\n          </tr>\n        </tbody>\n      </table>\n    ';
    }
  }, {
    key: 'renderFallback',
    value: function renderFallback() {
      var children = this.props.children;

      if (children.length === 0) return '';

      return (0, _conditionalTag.msoConditionalTag)(this.renderChildren([children[0]], {
        attributes: {
          'border-radius': this.getAttribute('border-radius')
        }
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n      ' + (0, _conditionalTag.msoConditionalTag)('\n        <div\n          ' + this.htmlAttributes({
        class: 'mj-carousel'
      }) + '\n        >\n          ' + this.generateRadios() + '\n          <div\n            ' + this.htmlAttributes({
        class: 'mj-carousel-content mj-carousel-' + this.carouselId + '-content',
        style: 'carousel.div'
      }) + '\n          >\n            ' + this.generateThumbnails() + '\n            ' + this.generateCarousel() + '\n          </div>\n        </div>\n      ', true) + '\n      ' + this.renderFallback() + '\n    ';
    }
  }]);
  return MjCarousel;
}(_mjmlCore.BodyComponent), _class.allowedAttributes = {
  align: 'enum(left,center,right)',
  'border-radius': 'unit(px,%)',
  'icon-width': 'unit(px,%)',
  'left-icon': 'string',
  padding: 'unit(px,%){1,4}',
  'padding-top': 'unit(px,%)',
  'padding-bottom': 'unit(px,%)',
  'padding-left': 'unit(px,%)',
  'padding-right': 'unit(px,%)',
  'right-icon': 'string',
  thumbnails: 'enum(visible,hidden)',
  'tb-border': 'string',
  'tb-border-radius': 'unit(px,%)',
  'tb-hover-border-color': 'color',
  'tb-selected-border-color': 'color',
  'tb-width': 'unit(px,%)'
}, _class.defaultAttributes = {
  align: 'center',
  'border-radius': '6px',
  'icon-width': '44px',
  'left-icon': 'https://i.imgur.com/xTh3hln.png',
  'right-icon': 'https://i.imgur.com/os7o9kz.png',
  thumbnails: 'visible',
  'tb-border': '2px solid transparent',
  'tb-border-radius': '6px',
  'tb-hover-border-color': '#fead0d',
  'tb-selected-border-color': '#ccc'
}, _temp);
exports.default = MjCarousel;
module.exports = exports['default'];