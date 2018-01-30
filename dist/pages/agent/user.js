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

var _common = require('./../../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

var _LoadingMore = require('./../../components/common/LoadingMore.js');

var _LoadingMore2 = _interopRequireDefault(_LoadingMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_wepy$page) {
	_inherits(User, _wepy$page);

	function User() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, User);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '我的用户',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A',
			backgroundColor: '#efefef'
		}, _this.$repeat = {}, _this.$props = { "loadingMore": { "xmlns:v-bind": "", "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default
		}, _this.mixins = [_common2.default], _this.data = {
			page: 1,
			userList: [],
			userCount: 0,
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(User, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getUserList',
		value: function getUserList() {
			var _this2 = this;

			var userInfo = this.$parent.getUserInfo();
			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'auth/customer_details',
				params: { openid: userInfo.openid, page: this.page, limit: '10' },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res['hasdata'] == 0 && _this2.page == 1) {
						_this2.loadingStatus = _LoadingMore2.default.ONE_PAGE;
					} else if (res['hasdata'] == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					if (_this2.page == 1) {
						_this2.userCount = res.count;
					}
					_this2.userList = [].concat(_toConsumableArray(_this2.userList), _toConsumableArray(res['list']));
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
		value: function onLoad(options) {
			this.getUserList();
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.page = 1;
			this.userList = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getUserList();
		}
	}]);

	return User;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/agent/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRDb2xvciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImxvYWRpbmdNb3JlIiwibWl4aW5zIiwiZGF0YSIsInBhZ2UiLCJ1c2VyTGlzdCIsInVzZXJDb3VudCIsImxvYWRpbmdTdGF0dXMiLCJMT0FESU5HIiwibWV0aG9kcyIsImUiLCJzY3JvbGxUb3AiLCJ1c2VySW5mbyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsInBhcmFtcyIsInVybCIsIm9wZW5pZCIsImxpbWl0Iiwic2NiIiwicmVzIiwiRklOSVNIRUQiLCJPTkVfUEFHRSIsIk5PX01PUkUiLCJjb3VudCIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0Iiwib3B0aW9ucyIsImdldFVzZXJMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7Z0xBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQyxvQkFBaUI7QUFKVCxHLFFBT1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQiw2QkFBNEIsZUFBL0MsRUFBK0QsV0FBVSxRQUF6RSxFQUFmLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1hDO0FBRFcsRyxRQUdaQyxNLEdBQVMsa0IsUUFDVEMsSSxHQUFPO0FBQ05DLFNBQU0sQ0FEQTtBQUVOQyxhQUFVLEVBRko7QUFHTkMsY0FBVSxDQUhKO0FBSU5DLGtCQUFjLHNCQUFZQztBQUpwQixHLFFBV1BDLE8sR0FBVSxFOzs7OzsrQkFKR0MsQyxFQUFFO0FBQ2QsUUFBS0MsU0FBTCxHQUFpQkQsRUFBRUMsU0FBbkI7QUFDQTs7O2dDQUthO0FBQUE7O0FBQ2IsT0FBSUMsV0FBVyxLQUFLQyxPQUFMLENBQWFDLFdBQWIsRUFBZjtBQUNBLFFBQUtQLGFBQUwsR0FBcUIsc0JBQVlDLE9BQWpDO0FBQ0EsT0FBSU8sU0FBUztBQUNaQyxTQUFLLHVCQURPO0FBRVpELFlBQVEsRUFBQ0UsUUFBUUwsU0FBU0ssTUFBbEIsRUFBMEJiLE1BQU0sS0FBS0EsSUFBckMsRUFBMENjLE9BQU0sSUFBaEQsRUFGSTtBQUdaQyxTQUFLLGFBQUNDLEdBQUQsRUFBUztBQUNiLFlBQUtiLGFBQUwsR0FBcUIsc0JBQVljLFFBQWpDO0FBQ0EsU0FBR0QsSUFBSSxTQUFKLEtBQWdCLENBQWhCLElBQXFCLE9BQUtoQixJQUFMLElBQVksQ0FBcEMsRUFBc0M7QUFDckMsYUFBS0csYUFBTCxHQUFvQixzQkFBWWUsUUFBaEM7QUFDQSxNQUZELE1BRU0sSUFBR0YsSUFBSSxTQUFKLEtBQWdCLENBQW5CLEVBQXFCO0FBQzFCLGFBQUtiLGFBQUwsR0FBb0Isc0JBQVlnQixPQUFoQztBQUNBO0FBQ0QsU0FBRyxPQUFLbkIsSUFBTCxJQUFXLENBQWQsRUFBZ0I7QUFDZixhQUFLRSxTQUFMLEdBQWlCYyxJQUFJSSxLQUFyQjtBQUNBO0FBQ0QsWUFBS25CLFFBQUwsZ0NBQW9CLE9BQUtBLFFBQXpCLHNCQUFxQ2UsSUFBSSxNQUFKLENBQXJDO0FBQ0EsWUFBS0ssTUFBTDtBQUNBLFlBQUtyQixJQUFMO0FBQ0EsS0FoQlc7QUFpQlpzQixTQUFJLGFBQUNDLEdBQUQsRUFBTztBQUFDLFlBQUtwQixhQUFMLEdBQXFCLHNCQUFZcUIsS0FBakM7QUFBd0M7QUFqQnhDLElBQWI7QUFtQkEsc0JBQVNDLEdBQVQsQ0FBYWQsTUFBYjtBQUNBOzs7eUJBRU1lLE8sRUFBUztBQUNmLFFBQUtDLFdBQUw7QUFDQTs7OzZCQUVTO0FBQ1QsUUFBSzNCLElBQUwsR0FBWSxDQUFaO0FBQ0EsUUFBS0MsUUFBTCxHQUFjLEVBQWQ7QUFDQSxRQUFLRSxhQUFMLEdBQXFCLHNCQUFZQyxPQUFqQztBQUNBOzs7a0NBRWM7QUFDZCxPQUFHLEtBQUtELGFBQUwsSUFBb0Isc0JBQVljLFFBQW5DLEVBQTRDO0FBQzNDO0FBQ0E7QUFDRCxRQUFLVSxXQUFMO0FBQ0E7Ozs7RUFyRWdDLGVBQUszQixJOztrQkFBbEJiLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQgY29tbW9uTWl4aW5zIGZyb20gJy4uLy4uL21peGlucy9jb21tb24nXG5cdGltcG9ydCBMb2FkaW5nTW9yZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9Mb2FkaW5nTW9yZSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE55So5oi3Jyxcblx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcblx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRjc3MDFBJyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnLFxuXHRcdH1cblxuXHQkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImxvYWRpbmdNb3JlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsb2FkaW5nU3RhdHVzLnN5bmNcIjpcImxvYWRpbmdTdGF0dXNcIixcIm1lc3NhZ2VcIjpcIuWKoOi9veS4rS4uLlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuXHRjb21wb25lbnRzID0ge1xuXHRcdFx0bG9hZGluZ01vcmU6IExvYWRpbmdNb3JlLFxuXHRcdH1cblx0XHRtaXhpbnMgPSBbY29tbW9uTWl4aW5zXTtcblx0XHRkYXRhID0ge1xuXHRcdFx0cGFnZTogMSxcblx0XHRcdHVzZXJMaXN0OiBbXSxcblx0XHRcdHVzZXJDb3VudDowLFxuXHRcdFx0bG9hZGluZ1N0YXR1czpMb2FkaW5nTW9yZS5MT0FESU5HLFxuXHRcdH1cblxuXHRcdG9uUGFnZVNjcm9sbChlKXtcblx0XHRcdHRoaXMuc2Nyb2xsVG9wID0gZS5zY3JvbGxUb3A7XG5cdFx0fVxuXG5cdFx0bWV0aG9kcyA9IHtcblx0XHR9XG5cblx0XHRnZXRVc2VyTGlzdCgpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvY3VzdG9tZXJfZGV0YWlscycsXG5cdFx0XHRcdHBhcmFtczoge29wZW5pZDogdXNlckluZm8ub3BlbmlkLCBwYWdlOiB0aGlzLnBhZ2UsbGltaXQ6JzEwJ30sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkZJTklTSEVEO1xuXHRcdFx0XHRcdGlmKHJlc1snaGFzZGF0YSddPT0wICYmIHRoaXMucGFnZSA9PTEpe1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID1Mb2FkaW5nTW9yZS5PTkVfUEFHRTtcblx0XHRcdFx0XHR9ZWxzZSBpZihyZXNbJ2hhc2RhdGEnXT09MCl7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPUxvYWRpbmdNb3JlLk5PX01PUkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRoaXMucGFnZT09MSl7XG5cdFx0XHRcdFx0XHR0aGlzLnVzZXJDb3VudCA9IHJlcy5jb3VudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy51c2VyTGlzdCA9IFsuLi50aGlzLnVzZXJMaXN0LC4uLnJlc1snbGlzdCddXTtcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdHRoaXMucGFnZSsrO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pnt0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5FUlJPUjt9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0dGhpcy5nZXRVc2VyTGlzdCgpO1xuXHRcdH1cblxuXHRcdG9uVW5sb2FkKCl7XG5cdFx0XHR0aGlzLnBhZ2UgPSAxXG5cdFx0XHR0aGlzLnVzZXJMaXN0PVtdXG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5MT0FESU5HXG5cdFx0fVxuXG5cdFx0b25SZWFjaEJvdHRvbSgpe1xuXHRcdFx0aWYodGhpcy5sb2FkaW5nU3RhdHVzIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0VXNlckxpc3QoKTtcblx0XHR9XG5cblx0fVxuIl19