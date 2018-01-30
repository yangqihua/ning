'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodsList1 = function (_wepy$component) {
	_inherits(GoodsList1, _wepy$component);

	function GoodsList1() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, GoodsList1);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsList1.__proto__ || Object.getPrototypeOf(GoodsList1)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
			goodsList: Array,
			scrollTop: Number
		}, _this.data = {
			scrollTop: 0
		}, _this.methods = {
			goTop: function goTop(e) {
				wx.pageScrollTo({
					scrollTop: 0
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return GoodsList1;
}(_wepy2.default.component);

exports.default = GoodsList1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvb2RzTGlzdDEuanMiXSwibmFtZXMiOlsiR29vZHNMaXN0MSIsInByb3BzIiwiZ29vZHNMaXN0IiwiQXJyYXkiLCJzY3JvbGxUb3AiLCJOdW1iZXIiLCJkYXRhIiwibWV0aG9kcyIsImdvVG9wIiwiZSIsInd4IiwicGFnZVNjcm9sbFRvIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0M7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7NExBQ3BCQyxLLEdBQVE7QUFDUEMsY0FBV0MsS0FESjtBQUVQQyxjQUFVQztBQUZILEcsUUFJUkMsSSxHQUFPO0FBQ05GLGNBQVU7QUFESixHLFFBR1BHLE8sR0FBVTtBQUNUQyxRQURTLGlCQUNIQyxDQURHLEVBQ0Q7QUFDUEMsT0FBR0MsWUFBSCxDQUFnQjtBQUNmUCxnQkFBVztBQURJLEtBQWhCO0FBR0E7QUFMUSxHOzs7O0VBUjZCLGVBQUtRLFM7O2tCQUF4QlosVSIsImZpbGUiOiJHb29kc0xpc3QxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBHb29kc0xpc3QxIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuXHRcdHByb3BzID0ge1xuXHRcdFx0Z29vZHNMaXN0OiBBcnJheSxcblx0XHRcdHNjcm9sbFRvcDpOdW1iZXJcblx0XHR9XG5cdFx0ZGF0YSA9IHtcblx0XHRcdHNjcm9sbFRvcDowLFxuXHRcdH1cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0Z29Ub3AoZSl7XG5cdFx0XHRcdHd4LnBhZ2VTY3JvbGxUbyh7XG5cdFx0XHRcdFx0c2Nyb2xsVG9wOiAwXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4iXX0=