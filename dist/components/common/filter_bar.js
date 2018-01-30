"use strict";

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

var filterBar = function (_wepy$component) {
	_inherits(filterBar, _wepy$component);

	function filterBar() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, filterBar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = filterBar.__proto__ || Object.getPrototypeOf(filterBar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
			currentType: "0"
		}, _this.methods = {
			orderBy: function orderBy(e) {
				this.currentType = e.target.dataset.current;
				this.$apply();
			}
		}, _this.watch = {
			currentType: function currentType(newValue) {
				this.$emit("currentType", newValue);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return filterBar;
}(_wepy2.default.component);

exports.default = filterBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlcl9iYXIuanMiXSwibmFtZXMiOlsiZmlsdGVyQmFyIiwiZGF0YSIsImN1cnJlbnRUeXBlIiwibWV0aG9kcyIsIm9yZGVyQnkiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImN1cnJlbnQiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQzs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7OzswTEFDcEJDLEksR0FBTztBQUNOQyxnQkFBYTtBQURQLEcsUUFHUEMsTyxHQUFVO0FBQ1RDLFVBRFMsbUJBQ0RDLENBREMsRUFDRTtBQUNWLFNBQUtILFdBQUwsR0FBbUJHLEVBQUVDLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsT0FBcEM7QUFDQSxTQUFLQyxNQUFMO0FBQ0E7QUFKUSxHLFFBTVZDLEssR0FBUTtBQUNQUixjQURPLHVCQUNLUyxRQURMLEVBQ2U7QUFDckIsU0FBS0MsS0FBTCxDQUFXLGFBQVgsRUFBMEJELFFBQTFCO0FBQ0E7QUFITSxHOzs7O0VBVjhCLGVBQUtFLFM7O2tCQUF2QmIsUyIsImZpbGUiOiJmaWx0ZXJfYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBmaWx0ZXJCYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGN1cnJlbnRUeXBlOiBcIjBcIixcblx0XHR9XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdG9yZGVyQnkoZSkge1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRUeXBlID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3YXRjaCA9IHtcblx0XHRcdGN1cnJlbnRUeXBlKG5ld1ZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJjdXJyZW50VHlwZVwiLCBuZXdWYWx1ZSk7XG5cdFx0XHR9LFxuXHRcdH1cblx0fVxuIl19