'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$component) {
	_inherits(Search, _wepy$component);

	function Search() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Search);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
			focus: false,
			search_input_value: ''
		}, _this.methods = {
			searchInput: function searchInput(e) {
				this.search_input_value = e.detail.value;
				this.$apply();
			},
			confirmInput: function confirmInput(e) {
				this.search_input_value = e.detail.value;
				this.$apply();
				this.$emit('searchValue', this.search_input_value);
			},
			search: function search() {
				this.$emit('searchValue', this.search_input_value);
			},
			delText: function delText() {
				this.search_input_value = "";
				this.$apply();
			},
			setValue: function setValue(value) {
				this.search_input_value = value;
				//				tip.success('输入框值：'+this.search_input_value,2000);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJkYXRhIiwiZm9jdXMiLCJzZWFyY2hfaW5wdXRfdmFsdWUiLCJtZXRob2RzIiwic2VhcmNoSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJjb25maXJtSW5wdXQiLCIkZW1pdCIsInNlYXJjaCIsImRlbFRleHQiLCJzZXRWYWx1ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7b0xBQ3BCQyxJLEdBQU87QUFDTkMsVUFBTSxLQURBO0FBRU5DLHVCQUFvQjtBQUZkLEcsUUFJUEMsTyxHQUFVO0FBQ1RDLGNBRFMsdUJBQ0dDLENBREgsRUFDTTtBQUNkLFNBQUtILGtCQUFMLEdBQTBCRyxFQUFFQyxNQUFGLENBQVNDLEtBQW5DO0FBQ0EsU0FBS0MsTUFBTDtBQUNBLElBSlE7QUFLVEMsZUFMUyx3QkFLSUosQ0FMSixFQUtNO0FBQ2QsU0FBS0gsa0JBQUwsR0FBMEJHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBbkM7QUFDQSxTQUFLQyxNQUFMO0FBQ0EsU0FBS0UsS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBS1Isa0JBQS9CO0FBQ0EsSUFUUTtBQVVUUyxTQVZTLG9CQVVBO0FBQ1IsU0FBS0QsS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBS1Isa0JBQS9CO0FBQ0EsSUFaUTtBQWFUVSxVQWJTLHFCQWFDO0FBQ1QsU0FBS1Ysa0JBQUwsR0FBMEIsRUFBMUI7QUFDQSxTQUFLTSxNQUFMO0FBQ0EsSUFoQlE7QUFpQlRLLFdBakJTLG9CQWlCQU4sS0FqQkEsRUFpQk07QUFDZCxTQUFLTCxrQkFBTCxHQUEwQkssS0FBMUI7QUFDSjtBQUNJO0FBcEJRLEc7Ozs7RUFMeUIsZUFBS08sUzs7a0JBQXBCZixNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5Jztcblx0aW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnXG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcblx0XHRkYXRhID0ge1xuXHRcdFx0Zm9jdXM6ZmFsc2UsXG5cdFx0XHRzZWFyY2hfaW5wdXRfdmFsdWU6ICcnLFxuXHRcdH07XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdHNlYXJjaElucHV0KGUpIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdH0sXG5cdFx0XHRjb25maXJtSW5wdXQoZSl7XG5cdFx0XHRcdHRoaXMuc2VhcmNoX2lucHV0X3ZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG5cdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdHRoaXMuJGVtaXQoJ3NlYXJjaFZhbHVlJywgdGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdHNlYXJjaCgpIHtcblx0XHRcdFx0dGhpcy4kZW1pdCgnc2VhcmNoVmFsdWUnLCB0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsVGV4dCgpIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUgPSBcIlwiO1xuXHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0fSxcblx0XHRcdHNldFZhbHVlKHZhbHVlKXtcblx0XHRcdFx0dGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUgPSB2YWx1ZTtcbi8vXHRcdFx0XHR0aXAuc3VjY2Vzcygn6L6T5YWl5qGG5YC877yaJyt0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSwyMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuIl19