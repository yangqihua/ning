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
			},
			search: function search() {
				this.$emit('searchValue', this.search_input_value);
			},
			delText: function delText() {
				this.search_input_value = "";
				this.$apply();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Search, [{
		key: 'onLoad',
		value: function onLoad() {}
	}]);

	return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJkYXRhIiwiZm9jdXMiLCJzZWFyY2hfaW5wdXRfdmFsdWUiLCJtZXRob2RzIiwic2VhcmNoSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJjb25maXJtSW5wdXQiLCJzZWFyY2giLCIkZW1pdCIsImRlbFRleHQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O29MQUNwQkMsSSxHQUFPO0FBQ05DLFVBQU0sS0FEQTtBQUVOQyx1QkFBb0I7QUFGZCxHLFFBSVBDLE8sR0FBVTtBQUNUQyxjQURTLHVCQUNHQyxDQURILEVBQ007QUFDZCxTQUFLSCxrQkFBTCxHQUEwQkcsRUFBRUMsTUFBRixDQUFTQyxLQUFuQztBQUNBLFNBQUtDLE1BQUw7QUFDQSxJQUpRO0FBS1RDLGVBTFMsd0JBS0lKLENBTEosRUFLTTtBQUNkLFNBQUtILGtCQUFMLEdBQTBCRyxFQUFFQyxNQUFGLENBQVNDLEtBQW5DO0FBQ0EsU0FBS0MsTUFBTDtBQUNBLElBUlE7QUFTVEUsU0FUUyxvQkFTQTtBQUNSLFNBQUtDLEtBQUwsQ0FBVyxhQUFYLEVBQTBCLEtBQUtULGtCQUEvQjtBQUNBLElBWFE7QUFZVFUsVUFaUyxxQkFZQztBQUNULFNBQUtWLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsU0FBS00sTUFBTDtBQUNBO0FBZlEsRzs7Ozs7MkJBa0JELENBQUU7Ozs7RUF2QndCLGVBQUtLLFM7O2tCQUFwQmQsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcblx0XHRkYXRhID0ge1xuXHRcdFx0Zm9jdXM6ZmFsc2UsXG5cdFx0XHRzZWFyY2hfaW5wdXRfdmFsdWU6ICcnLFxuXHRcdH07XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdHNlYXJjaElucHV0KGUpIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdH0sXG5cdFx0XHRjb25maXJtSW5wdXQoZSl7XG5cdFx0XHRcdHRoaXMuc2VhcmNoX2lucHV0X3ZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG5cdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHR9LFxuXHRcdFx0c2VhcmNoKCkge1xuXHRcdFx0XHR0aGlzLiRlbWl0KCdzZWFyY2hWYWx1ZScsIHRoaXMuc2VhcmNoX2lucHV0X3ZhbHVlKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxUZXh0KCkge1xuXHRcdFx0XHR0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdG9uTG9hZCgpIHt9XG5cdH1cblxuIl19