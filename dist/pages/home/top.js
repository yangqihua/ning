'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _HTTPUtil = require('./../../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _LoadingMore = require('./../../components/common/LoadingMore.js');

var _LoadingMore2 = _interopRequireDefault(_LoadingMore);

var _ListItem = require('./../../components/common/ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _common = require('./../../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Top = function (_wepy$page) {
	_inherits(Top, _wepy$page);

	function Top() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Top);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Top.__proto__ || Object.getPrototypeOf(Top)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '好货精选',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#FFFFFF',
			navigationBarTextStyle: 'black'
		}, _this.$repeat = { "goodsList": { "com": "listItem", "props": "item.sync" } }, _this.$props = { "listItem": { "xmlns:v-bind": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "index" }, "v-bind:item.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "index" } }, "loadingMore": { "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default,
			listItem: _ListItem2.default
		}, _this.mixins = [_common2.default], _this.data = {
			sortId: 0,
			page: 1,
			goodsList: [],
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.methods = {
			handleSort: function handleSort(e) {
				this.sortId = e.target.dataset.current;
				this.goodsList = [];
				this.page = 1;
				this.getGoodsList();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Top, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getGoodsList',
		value: function getGoodsList() {
			var _this2 = this;

			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'agent/good_coupon_list',
				isLoading: false,
				params: { page: this.page, sort: this.sortId },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res.length == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					_this2.goodsList = [].concat(_toConsumableArray(_this2.goodsList), _toConsumableArray(res));
					_this2.$apply();
					_this2.page++;
				},
				ecb: function ecb(err) {
					_this2.loadingStatus = _LoadingMore2.default.ERROR;
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {
			this.getGoodsList();
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getGoodsList();
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return _tip2.default.share('高额优惠券，速来围观！！！', '', '', '/pages/home/top?request_code=' + userInfo.requestCode);
		}
	}]);

	return Top;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Top , 'pages/home/top'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcC5qcyJdLCJuYW1lcyI6WyJUb3AiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9hZGluZ01vcmUiLCJsaXN0SXRlbSIsIm1peGlucyIsImRhdGEiLCJzb3J0SWQiLCJwYWdlIiwiZ29vZHNMaXN0IiwibG9hZGluZ1N0YXR1cyIsIkxPQURJTkciLCJtZXRob2RzIiwiaGFuZGxlU29ydCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsImdldEdvb2RzTGlzdCIsInNjcm9sbFRvcCIsInBhcmFtcyIsInVybCIsImlzTG9hZGluZyIsInNvcnQiLCJzY2IiLCJyZXMiLCJGSU5JU0hFRCIsImxlbmd0aCIsIk5PX01PUkUiLCIkYXBwbHkiLCJlY2IiLCJlcnIiLCJFUlJPUiIsImdldCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwic2hhcmUiLCJyZXF1ZXN0Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7OEtBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQywyQkFBd0I7QUFKaEIsRyxRQU1WQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxVQUFQLEVBQWtCLFNBQVEsV0FBMUIsRUFBYixFLFFBQ1hDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sT0FBbEUsRUFBaEIsRUFBMkYsb0JBQW1CLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxXQUFwQyxFQUFnRCxRQUFPLE1BQXZELEVBQThELFNBQVEsT0FBdEUsRUFBOEUsT0FBTSxPQUFwRixFQUE5RyxFQUFaLEVBQXdOLGVBQWMsRUFBQyw2QkFBNEIsZUFBN0IsRUFBNkMsV0FBVSxRQUF2RCxFQUF0TyxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNYQyxxQ0FEVztBQUVYQztBQUZXLEcsUUFJWkMsTSxHQUFTLGtCLFFBQ1RDLEksR0FBTztBQUNOQyxXQUFRLENBREY7QUFFTkMsU0FBTSxDQUZBO0FBR05DLGNBQVcsRUFITDtBQUlOQyxrQkFBYyxzQkFBWUM7QUFKcEIsRyxRQU9QQyxPLEdBQVU7QUFDVEMsYUFEUyxzQkFDRUMsQ0FERixFQUNLO0FBQ2IsU0FBS1AsTUFBTCxHQUFjTyxFQUFFQyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLE9BQS9CO0FBQ0EsU0FBS1IsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtELElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS1UsWUFBTDtBQUNBO0FBTlEsRzs7Ozs7K0JBU0dKLEMsRUFBRTtBQUNkLFFBQUtLLFNBQUwsR0FBaUJMLEVBQUVLLFNBQW5CO0FBQ0E7OztpQ0FFYTtBQUFBOztBQUNiLFFBQUtULGFBQUwsR0FBcUIsc0JBQVlDLE9BQWpDO0FBQ0EsT0FBSVMsU0FBUztBQUNaQyxTQUFLLHdCQURPO0FBRVpDLGVBQVcsS0FGQztBQUdaRixZQUFRLEVBQUNaLE1BQU0sS0FBS0EsSUFBWixFQUFrQmUsTUFBTSxLQUFLaEIsTUFBN0IsRUFISTtBQUlaaUIsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixZQUFLZixhQUFMLEdBQXFCLHNCQUFZZ0IsUUFBakM7QUFDQSxTQUFHRCxJQUFJRSxNQUFKLElBQVksQ0FBZixFQUFpQjtBQUNoQixhQUFLakIsYUFBTCxHQUFvQixzQkFBWWtCLE9BQWhDO0FBQ0E7QUFDRCxZQUFLbkIsU0FBTCxnQ0FBcUIsT0FBS0EsU0FBMUIsc0JBQXVDZ0IsR0FBdkM7QUFDQSxZQUFLSSxNQUFMO0FBQ0EsWUFBS3JCLElBQUw7QUFDQSxLQVpXO0FBYVpzQixTQUFJLGFBQUNDLEdBQUQsRUFBTztBQUFDLFlBQUtyQixhQUFMLEdBQXFCLHNCQUFZc0IsS0FBakM7QUFBd0M7QUFieEMsSUFBYjtBQWVBLHNCQUFTQyxHQUFULENBQWFiLE1BQWI7QUFDQTs7OzJCQUVRO0FBQ1IsUUFBS0YsWUFBTDtBQUNBOzs7a0NBRWM7QUFDZCxPQUFHLEtBQUtSLGFBQUwsSUFBb0Isc0JBQVlnQixRQUFuQyxFQUE0QztBQUMzQztBQUNBO0FBQ0QsUUFBS1IsWUFBTDtBQUNBOzs7b0NBRWlCTyxHLEVBQUs7QUFDdEIsT0FBSVMsV0FBVyxLQUFLQyxPQUFMLENBQWFDLFdBQWIsRUFBZjtBQUNBLFVBQU8sY0FBSUMsS0FBSixDQUFVLGVBQVYsRUFBMEIsRUFBMUIsRUFBNkIsRUFBN0IsRUFBZ0Msa0NBQWdDSCxTQUFTSSxXQUF6RSxDQUFQO0FBQ0E7Ozs7RUFyRStCLGVBQUs5QixJOztrQkFBakJmLEciLCJmaWxlIjoidG9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJ1xuXHRpbXBvcnQgSFRUUFV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvSFRUUFV0aWwnXG5cblx0aW1wb3J0IExvYWRpbmdNb3JlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL0xvYWRpbmdNb3JlJ1xuXHRpbXBvcnQgTGlzdEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vTGlzdEl0ZW0nXG5cdGltcG9ydCBjb21tb25NaXhpbnMgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbW1vbidcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBUb3AgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpb3otKfnsr7pgIknLFxuXHRcdFx0YmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuXHRcdFx0bmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnLFxuXHRcdFx0bmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcblx0XHR9XG5cdCRyZXBlYXQgPSB7XCJnb29kc0xpc3RcIjp7XCJjb21cIjpcImxpc3RJdGVtXCIsXCJwcm9wc1wiOlwiaXRlbS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wibGlzdEl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdvb2RzTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOml0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdvb2RzTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImxvYWRpbmdNb3JlXCI6e1widi1iaW5kOmxvYWRpbmdTdGF0dXMuc3luY1wiOlwibG9hZGluZ1N0YXR1c1wiLFwibWVzc2FnZVwiOlwi5Yqg6L295LitLi4uXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG5cdGNvbXBvbmVudHMgPSB7XG5cdFx0XHRsb2FkaW5nTW9yZTogTG9hZGluZ01vcmUsXG5cdFx0XHRsaXN0SXRlbTogTGlzdEl0ZW0sXG5cdFx0fVxuXHRcdG1peGlucyA9IFtjb21tb25NaXhpbnNdO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHRzb3J0SWQ6IDAsXG5cdFx0XHRwYWdlOiAxLFxuXHRcdFx0Z29vZHNMaXN0OiBbXSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0aGFuZGxlU29ydChlKSB7XG5cdFx0XHRcdHRoaXMuc29ydElkID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLmdvb2RzTGlzdCA9IFtdO1xuXHRcdFx0XHR0aGlzLnBhZ2UgPSAxO1xuXHRcdFx0XHR0aGlzLmdldEdvb2RzTGlzdCgpO1xuXHRcdFx0fSxcblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblxuXHRcdGdldEdvb2RzTGlzdCgpe1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2FnZW50L2dvb2RfY291cG9uX2xpc3QnLFxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtwYWdlOiB0aGlzLnBhZ2UsIHNvcnQ6IHRoaXMuc29ydElkfSxcblx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuRklOSVNIRUQ7XG5cdFx0XHRcdFx0aWYocmVzLmxlbmd0aD09MCl7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPUxvYWRpbmdNb3JlLk5PX01PUkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZ29vZHNMaXN0ID0gWy4uLnRoaXMuZ29vZHNMaXN0LC4uLnJlc107XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHR0aGlzLnBhZ2UrKztcblx0XHRcdFx0fSxcblx0XHRcdFx0ZWNiOihlcnIpPT57dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuRVJST1I7fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0b25Mb2FkKCkge1xuXHRcdFx0dGhpcy5nZXRHb29kc0xpc3QoKTtcblx0XHR9XG5cblx0XHRvblJlYWNoQm90dG9tKCl7XG5cdFx0XHRpZih0aGlzLmxvYWRpbmdTdGF0dXMhPUxvYWRpbmdNb3JlLkZJTklTSEVEKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5nZXRHb29kc0xpc3QoKTtcblx0XHR9XG5cblx0XHRvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0cmV0dXJuIHRpcC5zaGFyZSgn6auY6aKd5LyY5oOg5Yi477yM6YCf5p2l5Zu06KeC77yB77yB77yBJywnJywnJywnL3BhZ2VzL2hvbWUvdG9wP3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19