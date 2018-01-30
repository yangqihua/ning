'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _HTTPUtil = require('./../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _common = require('./../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

var _ListItem = require('./../components/common/ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _LoadingMore = require('./../components/common/LoadingMore.js');

var _LoadingMore2 = _interopRequireDefault(_LoadingMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeDetails = function (_wepy$page) {
	_inherits(HomeDetails, _wepy$page);

	function HomeDetails() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, HomeDetails);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomeDetails.__proto__ || Object.getPrototypeOf(HomeDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: ''
		}, _this.$repeat = { "goodsList": { "com": "listItem", "props": "item.sync" } }, _this.$props = { "listItem": { "xmlns:v-bind": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "index" }, "v-bind:item.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "index" } }, "loadingMore": { "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default,
			listItem: _ListItem2.default
		}, _this.mixins = [_common2.default], _this.data = {
			url: '',
			scrollTop: 0,
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

	_createClass(HomeDetails, [{
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
				url: this.url,
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
		value: function onLoad(options) {
			var title = '';
			switch (options.titleId) {
				case '0':
					this.url = 'agent/dapaiquan';
					title = '大牌券';
					break;
				case '1':
					this.url = 'agent/k99';
					title = '九块九包邮';
					break;
				case '2':
					this.url = 'agent/top100';
					title = '人气榜';
					break;
				case '3':
					this.url = 'agent/juhuasuan';
					title = '聚划算';
					break;
			}
			wx.setNavigationBarTitle({
				title: title
			});
			this.getGoodsList();
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.resetData();
		}
	}, {
		key: 'resetData',
		value: function resetData() {
			this.scrollTop = 0;
			this.sortId = 0;
			this.conditionId = 0;
			this.page = 1;
			this.goodsList = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
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
			return _tip2.default.share('高额优惠券，速来围观！！！', '', '', '/pages/home/index?request_code=' + userInfo.requestCode);
		}
	}]);

	return HomeDetails;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(HomeDetails , 'pages/home_details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVfZGV0YWlscy5qcyJdLCJuYW1lcyI6WyJIb21lRGV0YWlscyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJsb2FkaW5nTW9yZSIsImxpc3RJdGVtIiwibWl4aW5zIiwiZGF0YSIsInVybCIsInNjcm9sbFRvcCIsInNvcnRJZCIsInBhZ2UiLCJnb29kc0xpc3QiLCJsb2FkaW5nU3RhdHVzIiwiTE9BRElORyIsIm1ldGhvZHMiLCJoYW5kbGVTb3J0IiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJjdXJyZW50IiwiZ2V0R29vZHNMaXN0IiwicGFyYW1zIiwiaXNMb2FkaW5nIiwic29ydCIsInNjYiIsInJlcyIsIkZJTklTSEVEIiwibGVuZ3RoIiwiTk9fTU9SRSIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0Iiwib3B0aW9ucyIsInRpdGxlIiwidGl0bGVJZCIsInd4Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwicmVzZXREYXRhIiwiY29uZGl0aW9uSWQiLCJ1c2VySW5mbyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsInNoYXJlIiwicmVxdWVzdENvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7OzhMQUNwQkMsTSxHQUFTO0FBQ1JDLDJCQUF3QjtBQURoQixHLFFBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFVBQVAsRUFBa0IsU0FBUSxXQUExQixFQUFiLEUsUUFDWEMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxPQUFsRSxFQUFoQixFQUEyRixv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LFlBQUw7QUFDQTs7O29DQUVpQkssRyxFQUFLO0FBQ3RCLE9BQUlnQixXQUFXLEtBQUtDLE9BQUwsQ0FBYUMsV0FBYixFQUFmO0FBQ0EsVUFBTyxjQUFJQyxLQUFKLENBQVUsZUFBVixFQUEwQixFQUExQixFQUE2QixFQUE3QixFQUFnQyxvQ0FBa0NILFNBQVNJLFdBQTNFLENBQVA7QUFDQTs7OztFQXRHdUMsZUFBS25DLEk7O2tCQUF6QmQsVyIsImZpbGUiOiJob21lX2RldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblx0aW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5cdGltcG9ydCBIVFRQVXRpbCBmcm9tICcuLi91dGlscy9IVFRQVXRpbCdcblx0aW1wb3J0IGNvbW1vbk1peGlucyBmcm9tICcuLi9taXhpbnMvY29tbW9uJ1xuXHRpbXBvcnQgTGlzdEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24vTGlzdEl0ZW0nXG5cdGltcG9ydCBMb2FkaW5nTW9yZSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbi9Mb2FkaW5nTW9yZSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lRGV0YWlscyBleHRlbmRzIHdlcHkucGFnZSB7XG5cdFx0Y29uZmlnID0ge1xuXHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG5cdFx0fVxuXHQkcmVwZWF0ID0ge1wiZ29vZHNMaXN0XCI6e1wiY29tXCI6XCJsaXN0SXRlbVwiLFwicHJvcHNcIjpcIml0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImxpc3RJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJnb29kc0xpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJsb2FkaW5nTW9yZVwiOntcInYtYmluZDpsb2FkaW5nU3RhdHVzLnN5bmNcIjpcImxvYWRpbmdTdGF0dXNcIixcIm1lc3NhZ2VcIjpcIuWKoOi9veS4rS4uLlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuXHRjb21wb25lbnRzID0ge1xuXHRcdFx0bG9hZGluZ01vcmU6IExvYWRpbmdNb3JlLFxuXHRcdFx0bGlzdEl0ZW06IExpc3RJdGVtLFxuXHRcdH1cblx0XHRtaXhpbnMgPSBbY29tbW9uTWl4aW5zXTtcblx0XHRkYXRhID0ge1xuXHRcdFx0dXJsOicnLFxuXHRcdFx0c2Nyb2xsVG9wOjAsXG5cdFx0XHRzb3J0SWQ6IDAsXG5cdFx0XHRwYWdlOiAxLFxuXHRcdFx0Z29vZHNMaXN0OiBbXSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0aGFuZGxlU29ydChlKSB7XG5cdFx0XHRcdHRoaXMuc29ydElkID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLmdvb2RzTGlzdCA9IFtdO1xuXHRcdFx0XHR0aGlzLnBhZ2UgPSAxO1xuXHRcdFx0XHR0aGlzLmdldEdvb2RzTGlzdCgpO1xuXHRcdFx0fSxcblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblxuXHRcdGdldEdvb2RzTGlzdCgpe1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdHBhcmFtczoge3BhZ2U6IHRoaXMucGFnZSwgc29ydDogdGhpcy5zb3J0SWR9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5GSU5JU0hFRDtcblx0XHRcdFx0XHRpZihyZXMubGVuZ3RoPT0wKXtcblx0XHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9TG9hZGluZ01vcmUuTk9fTU9SRTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5nb29kc0xpc3QgPSBbLi4udGhpcy5nb29kc0xpc3QsLi4ucmVzXTtcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdHRoaXMucGFnZSsrO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pnt0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5FUlJPUjt9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0bGV0IHRpdGxlID0gJyc7XG5cdFx0XHRzd2l0Y2ggKG9wdGlvbnMudGl0bGVJZCl7XG5cdFx0XHRcdGNhc2UgJzAnOlxuXHRcdFx0XHRcdHRoaXMudXJsID0gJ2FnZW50L2RhcGFpcXVhbic7XG5cdFx0XHRcdFx0dGl0bGUgPSAn5aSn54mM5Yi4Jztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnMSc6XG5cdFx0XHRcdFx0dGhpcy51cmwgPSAnYWdlbnQvazk5Jztcblx0XHRcdFx0XHR0aXRsZSA9ICfkuZ3lnZfkuZ3ljIXpgq4nO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICcyJzpcblx0XHRcdFx0XHR0aGlzLnVybCA9ICdhZ2VudC90b3AxMDAnO1xuXHRcdFx0XHRcdHRpdGxlID0gJ+S6uuawlOamnCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJzMnOlxuXHRcdFx0XHRcdHRoaXMudXJsID0gJ2FnZW50L2p1aHVhc3Vhbic7XG5cdFx0XHRcdFx0dGl0bGUgPSAn6IGa5YiS566XJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG5cdFx0XHRcdHRpdGxlOiB0aXRsZVxuXHRcdFx0fSlcblx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0fVxuXHRcdG9uVW5sb2FkKCl7XG5cdFx0XHR0aGlzLnJlc2V0RGF0YSgpO1xuXHRcdH1cblxuXHRcdHJlc2V0RGF0YSgpe1xuXHRcdFx0dGhpcy5zY3JvbGxUb3AgPSAwO1xuXHRcdFx0dGhpcy5zb3J0SWQ9IDA7XG5cdFx0XHR0aGlzLmNvbmRpdGlvbklkPSAwO1xuXHRcdFx0dGhpcy5wYWdlPSAxO1xuXHRcdFx0dGhpcy5nb29kc0xpc3Q9IFtdO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzPUxvYWRpbmdNb3JlLkxPQURJTkc7XG5cdFx0fVxuXG5cdFx0b25SZWFjaEJvdHRvbSgpe1xuXHRcdFx0aWYodGhpcy5sb2FkaW5nU3RhdHVzIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0fVxuXG5cdFx0b25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHJldHVybiB0aXAuc2hhcmUoJ+mrmOmineS8mOaDoOWIuO+8jOmAn+adpeWbtOingu+8ge+8ge+8gScsJycsJycsJy9wYWdlcy9ob21lL2luZGV4P3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19