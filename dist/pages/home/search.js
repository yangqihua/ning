'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
	_inherits(Index, _wepy$page);

	function Index() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Index);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '超级搜索',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#9178FF',
			enablePullDownRefresh: false,
			backgroundColor: '#EFEFEF'
		}, _this.data = {
			focus: false,
			search_input_value: ''
		}, _this.computed = {}, _this.methods = {
			searchInput: function searchInput(e) {
				this.search_input_value = e.detail.value;
				this.$apply();
			},
			confirmInput: function confirmInput(e) {
				this.search_input_value = e.detail.value;
				this.$apply();
				wx.navigateTo({
					url: '/pages/search_details?key=' + this.search_input_value
				});
			},
			search: function search() {
				wx.navigateTo({
					url: '/pages/search_details?key=' + this.search_input_value
				});
			},
			delText: function delText() {
				this.search_input_value = "";
				this.$apply();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Index, [{
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return tip.share('高额优惠券，速来围观！！！', '', '', '/pages/home/search?request_code=' + userInfo.requestCode);
		}
	}]);

	return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/home/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImJhY2tncm91bmRDb2xvciIsImRhdGEiLCJmb2N1cyIsInNlYXJjaF9pbnB1dF92YWx1ZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNlYXJjaElucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiY29uZmlybUlucHV0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2VhcmNoIiwiZGVsVGV4dCIsInJlcyIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwidGlwIiwic2hhcmUiLCJyZXF1ZXN0Q29kZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O2tMQUNwQkMsTSxHQUFTO0FBQ1JDLDJCQUF3QixNQURoQjtBQUVSQyx3QkFBcUIsTUFGYjtBQUdSQyxpQ0FBOEIsU0FIdEI7QUFJUkMsMEJBQXVCLEtBSmY7QUFLUkMsb0JBQWlCO0FBTFQsRyxRQVFUQyxJLEdBQU87QUFDTkMsVUFBTSxLQURBO0FBRU5DLHVCQUFvQjtBQUZkLEcsUUFLUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1RDLGNBRFMsdUJBQ0dDLENBREgsRUFDTTtBQUNkLFNBQUtKLGtCQUFMLEdBQTBCSSxFQUFFQyxNQUFGLENBQVNDLEtBQW5DO0FBQ0EsU0FBS0MsTUFBTDtBQUNBLElBSlE7QUFLVEMsZUFMUyx3QkFLSUosQ0FMSixFQUtNO0FBQ2QsU0FBS0osa0JBQUwsR0FBMEJJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBbkM7QUFDQSxTQUFLQyxNQUFMO0FBQ0FFLE9BQUdDLFVBQUgsQ0FBYztBQUNiQyxVQUFLLCtCQUE2QixLQUFLWDtBQUQxQixLQUFkO0FBR0EsSUFYUTtBQVlUWSxTQVpTLG9CQVlBO0FBQ1JILE9BQUdDLFVBQUgsQ0FBYztBQUNiQyxVQUFLLCtCQUE2QixLQUFLWDtBQUQxQixLQUFkO0FBR0EsSUFoQlE7QUFpQlRhLFVBakJTLHFCQWlCQztBQUNULFNBQUtiLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsU0FBS08sTUFBTDtBQUNBO0FBcEJRLEc7Ozs7O29DQXVCUU8sRyxFQUFLO0FBQ3RCLE9BQUlDLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxVQUFPQyxJQUFJQyxLQUFKLENBQVUsZUFBVixFQUEwQixFQUExQixFQUE2QixFQUE3QixFQUFnQyxxQ0FBbUNKLFNBQVNLLFdBQTVFLENBQVA7QUFDQTs7OztFQTNDaUMsZUFBS0MsSTs7a0JBQW5COUIsSyIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG5cdFx0Y29uZmlnID0ge1xuXHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i2hee6p+aQnOe0oicsXG5cdFx0XHRiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG5cdFx0XHRuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzkxNzhGRicsXG5cdFx0XHRlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0VGRUZFRicsXG5cdFx0fVxuXG5cdFx0ZGF0YSA9IHtcblx0XHRcdGZvY3VzOmZhbHNlLFxuXHRcdFx0c2VhcmNoX2lucHV0X3ZhbHVlOiAnJyxcblx0XHR9XG5cblx0XHRjb21wdXRlZCA9IHtcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0c2VhcmNoSW5wdXQoZSkge1xuXHRcdFx0XHR0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuXHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0fSxcblx0XHRcdGNvbmZpcm1JbnB1dChlKXtcblx0XHRcdFx0dGhpcy5zZWFyY2hfaW5wdXRfdmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnL3BhZ2VzL3NlYXJjaF9kZXRhaWxzP2tleT0nK3RoaXMuc2VhcmNoX2lucHV0X3ZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0c2VhcmNoKCkge1xuXHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHtcblx0XHRcdFx0XHR1cmw6ICcvcGFnZXMvc2VhcmNoX2RldGFpbHM/a2V5PScrdGhpcy5zZWFyY2hfaW5wdXRfdmFsdWVcblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRkZWxUZXh0KCkge1xuXHRcdFx0XHR0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRyZXR1cm4gdGlwLnNoYXJlKCfpq5jpop3kvJjmg6DliLjvvIzpgJ/mnaXlm7Top4LvvIHvvIHvvIEnLCcnLCcnLCcvcGFnZXMvaG9tZS9zZWFyY2g/cmVxdWVzdF9jb2RlPScrdXNlckluZm8ucmVxdWVzdENvZGUpO1xuXHRcdH1cblx0fVxuIl19