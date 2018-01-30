'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constant = require('./../../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_wepy$component) {
	_inherits(ListItem, _wepy$component);

	function ListItem() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ListItem);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
			item: Object
		}, _this.computed = {
			userInfo: function userInfo() {
				return _wepy2.default.getStorageSync(_constant.USER_INFO);
			}
		}, _this.methods = {
			goDetails: function goDetails() {
				var id = this.item.id ? this.item.id : '-1';
				var iid = this.item.iid;
				if (this.userInfo.checkout == '0') {
					return;
				}
				wx.navigateTo({
					url: '/pages/goods_details?id=' + id + '&iid=' + iid
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return ListItem;
}(_wepy2.default.component);

exports.default = ListItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpc3RJdGVtLmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwicHJvcHMiLCJpdGVtIiwiT2JqZWN0IiwiY29tcHV0ZWQiLCJ1c2VySW5mbyIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kcyIsImdvRGV0YWlscyIsImlkIiwiaWlkIiwiY2hlY2tvdXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7Ozs7Ozs7O0lBS3FCQSxROzs7Ozs7Ozs7Ozs7Ozt3TEFDcEJDLEssR0FBUTtBQUNQQyxTQUFNQztBQURDLEcsUUFHUkMsUSxHQUFTO0FBQ1JDLFdBRFEsc0JBQ0U7QUFDVCxXQUFPLGVBQUtDLGNBQUwscUJBQVA7QUFDQTtBQUhPLEcsUUFLVEMsTyxHQUFVO0FBQ1RDLFlBRFMsdUJBQ0U7QUFDVixRQUFJQyxLQUFLLEtBQUtQLElBQUwsQ0FBVU8sRUFBVixHQUFhLEtBQUtQLElBQUwsQ0FBVU8sRUFBdkIsR0FBMEIsSUFBbkM7QUFDQSxRQUFJQyxNQUFNLEtBQUtSLElBQUwsQ0FBVVEsR0FBcEI7QUFDQSxRQUFHLEtBQUtMLFFBQUwsQ0FBY00sUUFBZCxJQUF3QixHQUEzQixFQUErQjtBQUM5QjtBQUNBO0FBQ0RDLE9BQUdDLFVBQUgsQ0FBYztBQUNiQyxVQUFLLDZCQUEyQkwsRUFBM0IsR0FBOEIsT0FBOUIsR0FBc0NDO0FBRDlCLEtBQWQ7QUFHQTtBQVZRLEc7Ozs7RUFUMkIsZUFBS0ssUzs7a0JBQXRCZixRIiwiZmlsZSI6Ikxpc3RJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXHRpbXBvcnQge1xuXHRcdEJBU0VfVVJMLFxuXHRcdFVTRVJfSU5GTyxcblx0XHRTWVNURU1fSU5GTyxcblx0fSBmcm9tIFwiLi4vLi4vdXRpbHMvY29uc3RhbnRcIjtcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0cHJvcHMgPSB7XG5cdFx0XHRpdGVtOiBPYmplY3QsXG5cdFx0fVxuXHRcdGNvbXB1dGVkPXtcblx0XHRcdHVzZXJJbmZvKCl7XG5cdFx0XHRcdHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTyk7XG5cdFx0XHR9LFxuXHRcdH1cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0Z29EZXRhaWxzKCl7XG5cdFx0XHRcdGxldCBpZCA9IHRoaXMuaXRlbS5pZD90aGlzLml0ZW0uaWQ6Jy0xJztcblx0XHRcdFx0bGV0IGlpZCA9IHRoaXMuaXRlbS5paWQ7XG5cdFx0XHRcdGlmKHRoaXMudXNlckluZm8uY2hlY2tvdXQ9PScwJyl7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0XHRcdHVybDogJy9wYWdlcy9nb29kc19kZXRhaWxzP2lkPScraWQrJyZpaWQ9JytpaWRcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH1cbiJdfQ==