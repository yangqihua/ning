'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testMixin = function (_wepy$mixin) {
	_inherits(testMixin, _wepy$mixin);

	function testMixin() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, testMixin);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = testMixin.__proto__ || Object.getPrototypeOf(testMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
			scrollTop: 0
			// isAgent:'hf'
		}, _this.methods = {
			goTop: function goTop(e) {
				wx.pageScrollTo({ scrollTop: 0 });
			}
		}, _this.computed = {
			isAgent: function isAgent() {
				return true;
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(testMixin, [{
		key: 'onShow',
		value: function onShow() {
			// console.log('mixin onShow')
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {
			// console.log('mixin onLoad')
		}
	}]);

	return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJ0ZXN0TWl4aW4iLCJkYXRhIiwic2Nyb2xsVG9wIiwibWV0aG9kcyIsImdvVG9wIiwiZSIsInd4IiwicGFnZVNjcm9sbFRvIiwiY29tcHV0ZWQiLCJpc0FnZW50IiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzBMQUNwQkMsSSxHQUFPO0FBQ05DLGNBQVc7QUFDWDtBQUZNLEcsUUFJUEMsTyxHQUFVO0FBQ1RDLFFBRFMsaUJBQ0hDLENBREcsRUFDRDtBQUNQQyxPQUFHQyxZQUFILENBQWdCLEVBQUNMLFdBQVcsQ0FBWixFQUFoQjtBQUNBO0FBSFEsRyxRQUtWTSxRLEdBQVc7QUFDVkMsVUFEVSxxQkFDRDtBQUNSLFdBQU8sSUFBUDtBQUNBO0FBSFMsRzs7Ozs7MkJBTUY7QUFDUjtBQUNBOzs7MkJBRVE7QUFDUjtBQUNBOzs7O0VBdEJxQyxlQUFLQyxLOztrQkFBdkJWLFMiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGVzdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcblx0ZGF0YSA9IHtcclxuXHRcdHNjcm9sbFRvcDogMCxcclxuXHRcdC8vIGlzQWdlbnQ6J2hmJ1xyXG5cdH1cclxuXHRtZXRob2RzID0ge1xyXG5cdFx0Z29Ub3AoZSl7XHJcblx0XHRcdHd4LnBhZ2VTY3JvbGxUbyh7c2Nyb2xsVG9wOiAwfSlcclxuXHRcdH1cclxuXHR9XHJcblx0Y29tcHV0ZWQgPSB7XHJcblx0XHRpc0FnZW50KCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25TaG93KCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ21peGluIG9uU2hvdycpXHJcblx0fVxyXG5cclxuXHRvbkxvYWQoKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnbWl4aW4gb25Mb2FkJylcclxuXHR9XHJcbn1cclxuIl19