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

var GoodsList = function (_wepy$component) {
	_inherits(GoodsList, _wepy$component);

	function GoodsList() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, GoodsList);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsList.__proto__ || Object.getPrototypeOf(GoodsList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
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

	return GoodsList;
}(_wepy2.default.component);

exports.default = GoodsList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvb2RzSXRlbS5qcyJdLCJuYW1lcyI6WyJHb29kc0xpc3QiLCJwcm9wcyIsImdvb2RzTGlzdCIsIkFycmF5Iiwic2Nyb2xsVG9wIiwiTnVtYmVyIiwiZGF0YSIsIm1ldGhvZHMiLCJnb1RvcCIsImUiLCJ3eCIsInBhZ2VTY3JvbGxUbyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNDOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzBMQUNwQkMsSyxHQUFRO0FBQ1BDLGNBQVdDLEtBREo7QUFFUEMsY0FBVUM7QUFGSCxHLFFBSVJDLEksR0FBTztBQUNORixjQUFVO0FBREosRyxRQUdQRyxPLEdBQVU7QUFDVEMsUUFEUyxpQkFDSEMsQ0FERyxFQUNEO0FBQ1BDLE9BQUdDLFlBQUgsQ0FBZ0I7QUFDZlAsZ0JBQVc7QUFESSxLQUFoQjtBQUdBO0FBTFEsRzs7OztFQVI0QixlQUFLUSxTOztrQkFBdkJaLFMiLCJmaWxlIjoiR29vZHNJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBHb29kc0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0cHJvcHMgPSB7XG5cdFx0XHRnb29kc0xpc3Q6IEFycmF5LFxuXHRcdFx0c2Nyb2xsVG9wOk51bWJlclxuXHRcdH1cblx0XHRkYXRhID0ge1xuXHRcdFx0c2Nyb2xsVG9wOjAsXG5cdFx0fVxuXHRcdG1ldGhvZHMgPSB7XG5cdFx0XHRnb1RvcChlKXtcblx0XHRcdFx0d3gucGFnZVNjcm9sbFRvKHtcblx0XHRcdFx0XHRzY3JvbGxUb3A6IDBcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH1cbiJdfQ==