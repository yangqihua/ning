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
			isAgent: function isAgent() {
				var userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO);
				return userInfo.agentCode == '1';
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return ListItem;
}(_wepy2.default.component);

exports.default = ListItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpc3RJdGVtLmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwicHJvcHMiLCJpdGVtIiwiT2JqZWN0IiwiY29tcHV0ZWQiLCJpc0FnZW50IiwidXNlckluZm8iLCJnZXRTdG9yYWdlU3luYyIsImFnZW50Q29kZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFLcUJBLFE7Ozs7Ozs7Ozs7Ozs7O3dMQUNwQkMsSyxHQUFRO0FBQ1BDLFNBQU1DO0FBREMsRyxRQUdSQyxRLEdBQVM7QUFDUkMsVUFEUSxxQkFDQztBQUNSLFFBQUlDLFdBQVcsZUFBS0MsY0FBTCxxQkFBZjtBQUNBLFdBQU9ELFNBQVNFLFNBQVQsSUFBb0IsR0FBM0I7QUFDQTtBQUpPLEc7Ozs7RUFKNEIsZUFBS0MsUzs7a0JBQXRCVCxRIiwiZmlsZSI6Ikxpc3RJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXHRpbXBvcnQge1xuXHRcdEJBU0VfVVJMLFxuXHRcdFVTRVJfSU5GTyxcblx0XHRTWVNURU1fSU5GTyxcblx0fSBmcm9tIFwiLi4vLi4vdXRpbHMvY29uc3RhbnRcIjtcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0cHJvcHMgPSB7XG5cdFx0XHRpdGVtOiBPYmplY3QsXG5cdFx0fVxuXHRcdGNvbXB1dGVkPXtcblx0XHRcdGlzQWdlbnQoKXtcblx0XHRcdFx0bGV0IHVzZXJJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX0lORk8pO1xuXHRcdFx0XHRyZXR1cm4gdXNlckluZm8uYWdlbnRDb2RlPT0nMSc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4iXX0=