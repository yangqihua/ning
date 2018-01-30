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

var Order = function (_wepy$page) {
	_inherits(Order, _wepy$page);

	function Order() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Order);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '订单详情',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A',
			backgroundColor: '#efefef'
		}, _this.$repeat = {}, _this.$props = { "loadingMore": { "xmlns:v-bind": "", "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default
		}, _this.mixins = [_common2.default], _this.data = {
			type: '2',
			page: 1,
			orderList: [],
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.methods = {
			handType: function handType(e) {
				this.type = e.target.dataset.current;
				this.orderList = [];
				this.page = 1;
				this.getOrders();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Order, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getOrders',
		value: function getOrders() {
			var _this2 = this;

			var userInfo = this.$parent.getUserInfo();
			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'auth/order_details',
				params: { openid: userInfo.openid, page: this.page, type: this.type },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res['hasdata'] == 0 && _this2.page == 1) {
						_this2.loadingStatus = _LoadingMore2.default.ONE_PAGE;
					} else if (res['hasdata'] == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					_this2.orderList = [].concat(_toConsumableArray(_this2.orderList), _toConsumableArray(res['list']));
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
			this.type = options.type || '0';
			this.getOrders();
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.page = 1;
			this.orderList = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getOrders();
		}
	}]);

	return Order;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/agent/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9hZGluZ01vcmUiLCJtaXhpbnMiLCJkYXRhIiwidHlwZSIsInBhZ2UiLCJvcmRlckxpc3QiLCJsb2FkaW5nU3RhdHVzIiwiTE9BRElORyIsIm1ldGhvZHMiLCJoYW5kVHlwZSIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsImdldE9yZGVycyIsInNjcm9sbFRvcCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwic2NiIiwicmVzIiwiRklOSVNIRUQiLCJPTkVfUEFHRSIsIk5PX01PUkUiLCIkYXBwbHkiLCJlY2IiLCJlcnIiLCJFUlJPUiIsImdldCIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztrTEFDcEJDLE0sR0FBUztBQUNSQywyQkFBd0IsTUFEaEI7QUFFUkMsd0JBQXFCLE1BRmI7QUFHUkMsaUNBQThCLFNBSHRCO0FBSVJDLG9CQUFpQjtBQUpULEcsUUFNVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDZCQUE0QixlQUEvQyxFQUErRCxXQUFVLFFBQXpFLEVBQWYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDWEM7QUFEVyxHLFFBR1pDLE0sR0FBUyxrQixRQUNUQyxJLEdBQU87QUFDTkMsU0FBTSxHQURBO0FBRU5DLFNBQU0sQ0FGQTtBQUdOQyxjQUFXLEVBSEw7QUFJTkMsa0JBQWMsc0JBQVlDO0FBSnBCLEcsUUFPUEMsTyxHQUFVO0FBQ1RDLFdBRFMsb0JBQ0FDLENBREEsRUFDRTtBQUNWLFNBQUtQLElBQUwsR0FBWU8sRUFBRUMsTUFBRixDQUFTQyxPQUFULENBQWlCQyxPQUE3QjtBQUNBLFNBQUtSLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLRCxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtVLFNBQUw7QUFDQTtBQU5RLEc7Ozs7OytCQVNHSixDLEVBQUU7QUFDZCxRQUFLSyxTQUFMLEdBQWlCTCxFQUFFSyxTQUFuQjtBQUNBOzs7OEJBRVc7QUFBQTs7QUFDWCxPQUFJQyxXQUFXLEtBQUtDLE9BQUwsQ0FBYUMsV0FBYixFQUFmO0FBQ0EsUUFBS1osYUFBTCxHQUFxQixzQkFBWUMsT0FBakM7QUFDQSxPQUFJWSxTQUFTO0FBQ1pDLFNBQUssb0JBRE87QUFFWkQsWUFBUSxFQUFDRSxRQUFRTCxTQUFTSyxNQUFsQixFQUEwQmpCLE1BQU0sS0FBS0EsSUFBckMsRUFBMkNELE1BQU0sS0FBS0EsSUFBdEQsRUFGSTtBQUdabUIsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixZQUFLakIsYUFBTCxHQUFxQixzQkFBWWtCLFFBQWpDO0FBQ0EsU0FBR0QsSUFBSSxTQUFKLEtBQWdCLENBQWhCLElBQXFCLE9BQUtuQixJQUFMLElBQVksQ0FBcEMsRUFBc0M7QUFDckMsYUFBS0UsYUFBTCxHQUFvQixzQkFBWW1CLFFBQWhDO0FBQ0EsTUFGRCxNQUVNLElBQUdGLElBQUksU0FBSixLQUFnQixDQUFuQixFQUFxQjtBQUMxQixhQUFLakIsYUFBTCxHQUFvQixzQkFBWW9CLE9BQWhDO0FBQ0E7QUFDRCxZQUFLckIsU0FBTCxnQ0FBcUIsT0FBS0EsU0FBMUIsc0JBQXVDa0IsSUFBSSxNQUFKLENBQXZDO0FBQ0EsWUFBS0ksTUFBTDtBQUNBLFlBQUt2QixJQUFMO0FBQ0EsS0FiVztBQWNad0IsU0FBSSxhQUFDQyxHQUFELEVBQU87QUFBQyxZQUFLdkIsYUFBTCxHQUFxQixzQkFBWXdCLEtBQWpDO0FBQXdDO0FBZHhDLElBQWI7QUFnQkEsc0JBQVNDLEdBQVQsQ0FBYVosTUFBYjtBQUNBOzs7eUJBRU1hLE8sRUFBUztBQUNmLFFBQUs3QixJQUFMLEdBQVk2QixRQUFRN0IsSUFBUixJQUFnQixHQUE1QjtBQUNBLFFBQUtXLFNBQUw7QUFDQTs7OzZCQUVTO0FBQ1QsUUFBS1YsSUFBTCxHQUFZLENBQVo7QUFDQSxRQUFLQyxTQUFMLEdBQWUsRUFBZjtBQUNBLFFBQUtDLGFBQUwsR0FBcUIsc0JBQVlDLE9BQWpDO0FBQ0E7OztrQ0FFYztBQUNkLE9BQUcsS0FBS0QsYUFBTCxJQUFvQixzQkFBWWtCLFFBQW5DLEVBQTRDO0FBQzNDO0FBQ0E7QUFDRCxRQUFLVixTQUFMO0FBQ0E7Ozs7RUF4RWlDLGVBQUtWLEk7O2tCQUFuQmQsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQgY29tbW9uTWl4aW5zIGZyb20gJy4uLy4uL21peGlucy9jb21tb24nXG5cdGltcG9ydCBMb2FkaW5nTW9yZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9Mb2FkaW5nTW9yZSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG5cdFx0Y29uZmlnID0ge1xuXHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhScsXG5cdFx0XHRiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG5cdFx0XHRuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0Y3NzAxQScsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZWZlZmVmJyxcblx0XHR9XG5cdCRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibG9hZGluZ01vcmVcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvYWRpbmdTdGF0dXMuc3luY1wiOlwibG9hZGluZ1N0YXR1c1wiLFwibWVzc2FnZVwiOlwi5Yqg6L295LitLi4uXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG5cdGNvbXBvbmVudHMgPSB7XG5cdFx0XHRsb2FkaW5nTW9yZTogTG9hZGluZ01vcmUsXG5cdFx0fVxuXHRcdG1peGlucyA9IFtjb21tb25NaXhpbnNdO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHR0eXBlOiAnMicsXG5cdFx0XHRwYWdlOiAxLFxuXHRcdFx0b3JkZXJMaXN0OiBbXSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0aGFuZFR5cGUoZSl7XG5cdFx0XHRcdHRoaXMudHlwZSA9IGUudGFyZ2V0LmRhdGFzZXQuY3VycmVudDtcblx0XHRcdFx0dGhpcy5vcmRlckxpc3QgPSBbXTtcblx0XHRcdFx0dGhpcy5wYWdlID0gMTtcblx0XHRcdFx0dGhpcy5nZXRPcmRlcnMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblxuXHRcdGdldE9yZGVycygpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvb3JkZXJfZGV0YWlscycsXG5cdFx0XHRcdHBhcmFtczoge29wZW5pZDogdXNlckluZm8ub3BlbmlkLCBwYWdlOiB0aGlzLnBhZ2UsIHR5cGU6IHRoaXMudHlwZX0sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkZJTklTSEVEO1xuXHRcdFx0XHRcdGlmKHJlc1snaGFzZGF0YSddPT0wICYmIHRoaXMucGFnZSA9PTEpe1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID1Mb2FkaW5nTW9yZS5PTkVfUEFHRTtcblx0XHRcdFx0XHR9ZWxzZSBpZihyZXNbJ2hhc2RhdGEnXT09MCl7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPUxvYWRpbmdNb3JlLk5PX01PUkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMub3JkZXJMaXN0ID0gWy4uLnRoaXMub3JkZXJMaXN0LC4uLnJlc1snbGlzdCddXTtcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdHRoaXMucGFnZSsrO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pnt0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5FUlJPUjt9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0dGhpcy50eXBlID0gb3B0aW9ucy50eXBlIHx8ICcwJztcblx0XHRcdHRoaXMuZ2V0T3JkZXJzKCk7XG5cdFx0fVxuXG5cdFx0b25VbmxvYWQoKXtcblx0XHRcdHRoaXMucGFnZSA9IDFcblx0XHRcdHRoaXMub3JkZXJMaXN0PVtdXG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5MT0FESU5HXG5cdFx0fVxuXG5cdFx0b25SZWFjaEJvdHRvbSgpe1xuXHRcdFx0aWYodGhpcy5sb2FkaW5nU3RhdHVzIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0T3JkZXJzKCk7XG5cdFx0fVxuXG5cdH1cbiJdfQ==