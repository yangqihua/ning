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

var Tixian = function (_wepy$page) {
	_inherits(Tixian, _wepy$page);

	function Tixian() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Tixian);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tixian.__proto__ || Object.getPrototypeOf(Tixian)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '提现记录',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A'
		}, _this.$repeat = {}, _this.$props = { "loadingMore": { "xmlns:v-bind": "", "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default
		}, _this.mixins = [_common2.default], _this.data = {
			page: 1,
			tixianList: [],
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tixian, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getTixianList',
		value: function getTixianList() {
			var _this2 = this;

			var userInfo = this.$parent.getUserInfo();
			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'auth/tixian_details',
				params: { openid: userInfo.openid, page: this.page, limit: '10' },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res['hasdata'] == 0 && _this2.page == 1) {
						_this2.loadingStatus = _LoadingMore2.default.ONE_PAGE;
					} else if (res['hasdata'] == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					_this2.tixianList = [].concat(_toConsumableArray(_this2.tixianList), _toConsumableArray(res['list']));
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
			this.getTixianList();
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.page = 1;
			this.tixianList = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getTixianList();
		}
	}]);

	return Tixian;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Tixian , 'pages/agent/read_tixian'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlYWRfdGl4aWFuLmpzIl0sIm5hbWVzIjpbIlRpeGlhbiIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImxvYWRpbmdNb3JlIiwibWl4aW5zIiwiZGF0YSIsInBhZ2UiLCJ0aXhpYW5MaXN0IiwibG9hZGluZ1N0YXR1cyIsIkxPQURJTkciLCJtZXRob2RzIiwiZSIsInNjcm9sbFRvcCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwibGltaXQiLCJzY2IiLCJyZXMiLCJGSU5JU0hFRCIsIk9ORV9QQUdFIiwiTk9fTU9SRSIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0Iiwib3B0aW9ucyIsImdldFRpeGlhbkxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztvTEFDcEJDLE0sR0FBUztBQUNSQywyQkFBd0IsTUFEaEI7QUFFUkMsd0JBQXFCLE1BRmI7QUFHUkMsaUNBQThCO0FBSHRCLEcsUUFLVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDZCQUE0QixlQUEvQyxFQUErRCxXQUFVLFFBQXpFLEVBQWYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDWEM7QUFEVyxHLFFBR1pDLE0sR0FBUyxrQixRQUNUQyxJLEdBQU87QUFDTkMsU0FBTSxDQURBO0FBRU5DLGVBQVksRUFGTjtBQUdOQyxrQkFBYyxzQkFBWUM7QUFIcEIsRyxRQVVQQyxPLEdBQVUsRTs7Ozs7K0JBSkdDLEMsRUFBRTtBQUNkLFFBQUtDLFNBQUwsR0FBaUJELEVBQUVDLFNBQW5CO0FBQ0E7OztrQ0FLZTtBQUFBOztBQUNmLE9BQUlDLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxRQUFLUCxhQUFMLEdBQXFCLHNCQUFZQyxPQUFqQztBQUNBLE9BQUlPLFNBQVM7QUFDWkMsU0FBSyxxQkFETztBQUVaRCxZQUFRLEVBQUNFLFFBQVFMLFNBQVNLLE1BQWxCLEVBQTBCWixNQUFNLEtBQUtBLElBQXJDLEVBQTBDYSxPQUFNLElBQWhELEVBRkk7QUFHWkMsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixZQUFLYixhQUFMLEdBQXFCLHNCQUFZYyxRQUFqQztBQUNBLFNBQUdELElBQUksU0FBSixLQUFnQixDQUFoQixJQUFxQixPQUFLZixJQUFMLElBQVksQ0FBcEMsRUFBc0M7QUFDckMsYUFBS0UsYUFBTCxHQUFvQixzQkFBWWUsUUFBaEM7QUFDQSxNQUZELE1BRU0sSUFBR0YsSUFBSSxTQUFKLEtBQWdCLENBQW5CLEVBQXFCO0FBQzFCLGFBQUtiLGFBQUwsR0FBb0Isc0JBQVlnQixPQUFoQztBQUNBO0FBQ0QsWUFBS2pCLFVBQUwsZ0NBQXNCLE9BQUtBLFVBQTNCLHNCQUF5Q2MsSUFBSSxNQUFKLENBQXpDO0FBQ0EsWUFBS0ksTUFBTDtBQUNBLFlBQUtuQixJQUFMO0FBQ0EsS0FiVztBQWNab0IsU0FBSSxhQUFDQyxHQUFELEVBQU87QUFBQyxZQUFLbkIsYUFBTCxHQUFxQixzQkFBWW9CLEtBQWpDO0FBQXdDO0FBZHhDLElBQWI7QUFnQkEsc0JBQVNDLEdBQVQsQ0FBYWIsTUFBYjtBQUNBOzs7eUJBRU1jLE8sRUFBUztBQUNmLFFBQUtDLGFBQUw7QUFDQTs7OzZCQUVTO0FBQ1QsUUFBS3pCLElBQUwsR0FBWSxDQUFaO0FBQ0EsUUFBS0MsVUFBTCxHQUFnQixFQUFoQjtBQUNBLFFBQUtDLGFBQUwsR0FBcUIsc0JBQVlDLE9BQWpDO0FBQ0E7OztrQ0FFYztBQUNkLE9BQUcsS0FBS0QsYUFBTCxJQUFvQixzQkFBWWMsUUFBbkMsRUFBNEM7QUFDM0M7QUFDQTtBQUNELFFBQUtTLGFBQUw7QUFDQTs7OztFQS9Ea0MsZUFBS3pCLEk7O2tCQUFwQlosTSIsImZpbGUiOiJyZWFkX3RpeGlhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQgY29tbW9uTWl4aW5zIGZyb20gJy4uLy4uL21peGlucy9jb21tb24nXG5cdGltcG9ydCBMb2FkaW5nTW9yZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9Mb2FkaW5nTW9yZSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBUaXhpYW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmj5DnjrDorrDlvZUnLFxuXHRcdFx0YmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuXHRcdFx0bmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGNzcwMUEnLFxuXHRcdH1cblx0JHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJsb2FkaW5nTW9yZVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bG9hZGluZ1N0YXR1cy5zeW5jXCI6XCJsb2FkaW5nU3RhdHVzXCIsXCJtZXNzYWdlXCI6XCLliqDovb3kuK0uLi5cIn19O1xyXG4kZXZlbnRzID0ge307XHJcblx0Y29tcG9uZW50cyA9IHtcblx0XHRcdGxvYWRpbmdNb3JlOiBMb2FkaW5nTW9yZSxcblx0XHR9XG5cdFx0bWl4aW5zID0gW2NvbW1vbk1peGluc107XG5cdFx0ZGF0YSA9IHtcblx0XHRcdHBhZ2U6IDEsXG5cdFx0XHR0aXhpYW5MaXN0OiBbXSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblxuXHRcdG1ldGhvZHMgPSB7XG5cdFx0fVxuXG5cdFx0Z2V0VGl4aWFuTGlzdCgpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvdGl4aWFuX2RldGFpbHMnLFxuXHRcdFx0XHRwYXJhbXM6IHtvcGVuaWQ6IHVzZXJJbmZvLm9wZW5pZCwgcGFnZTogdGhpcy5wYWdlLGxpbWl0OicxMCd9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5GSU5JU0hFRDtcblx0XHRcdFx0XHRpZihyZXNbJ2hhc2RhdGEnXT09MCAmJiB0aGlzLnBhZ2UgPT0xKXtcblx0XHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9TG9hZGluZ01vcmUuT05FX1BBR0U7XG5cdFx0XHRcdFx0fWVsc2UgaWYocmVzWydoYXNkYXRhJ109PTApe1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID1Mb2FkaW5nTW9yZS5OT19NT1JFO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnRpeGlhbkxpc3QgPSBbLi4udGhpcy50aXhpYW5MaXN0LC4uLnJlc1snbGlzdCddXTtcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdHRoaXMucGFnZSsrO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pnt0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5FUlJPUjt9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0dGhpcy5nZXRUaXhpYW5MaXN0KCk7XG5cdFx0fVxuXG5cdFx0b25VbmxvYWQoKXtcblx0XHRcdHRoaXMucGFnZSA9IDFcblx0XHRcdHRoaXMudGl4aWFuTGlzdD1bXVxuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElOR1xuXHRcdH1cblxuXHRcdG9uUmVhY2hCb3R0b20oKXtcblx0XHRcdGlmKHRoaXMubG9hZGluZ1N0YXR1cyE9TG9hZGluZ01vcmUuRklOSVNIRUQpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldFRpeGlhbkxpc3QoKTtcblx0XHR9XG5cblx0fVxuIl19