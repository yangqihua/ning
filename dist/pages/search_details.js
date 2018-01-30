'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _search = require('./../components/common/search.js');

var _search2 = _interopRequireDefault(_search);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _HTTPUtil = require('./../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _LoadingMore = require('./../components/common/LoadingMore.js');

var _LoadingMore2 = _interopRequireDefault(_LoadingMore);

var _ListItem = require('./../components/common/ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _common = require('./../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchDetails = function (_wepy$page) {
	_inherits(SearchDetails, _wepy$page);

	function SearchDetails() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SearchDetails);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchDetails.__proto__ || Object.getPrototypeOf(SearchDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '搜索'
		}, _this.$repeat = { "goods": { "com": "listItem", "props": "item.sync" } }, _this.$props = { "listItem": { "xmlns:v-bind": { "value": "", "for": "goods", "item": "item", "index": "index", "key": "index" }, "v-bind:item.sync": { "value": "item", "type": "item", "for": "goods", "item": "item", "index": "index", "key": "index" } }, "search": { "xmlns:v-on": "" }, "loadingMore": { "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = { "search": { "v-on:searchValue": "doSearch" } }, _this.components = {
			search: _search2.default,
			loadingMore: _LoadingMore2.default,
			listItem: _ListItem2.default
		}, _this.mixins = [_common2.default], _this.data = {
			sortId: 0,
			page: 1,
			goods: [],
			loadingStatus: _LoadingMore2.default.LOADING,
			searchKey: ''
		}, _this.methods = {
			doSearch: function doSearch(value) {
				this.searchKey = value;
				this.sortId = 0;
				this.goods = [];
				this.page = 1;
				this.getGoodsList(value);
			},
			handleSort: function handleSort(e) {
				this.sortId = e.target.dataset.current;
				this.goods = [];
				this.page = 1;
				this.getGoodsList(this.searchKey);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SearchDetails, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getGoodsList',
		value: function getGoodsList(key) {
			var _this2 = this;

			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				isLoading: this.page === 1,
				url: 'agent/super_search',
				params: { key: key, page: this.page, sort: this.sortId },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res['hasdata'] == 0 && _this2.page == 1) {
						_this2.loadingStatus = _LoadingMore2.default.ONE_PAGE;
					} else if (res['hasdata'] == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					_this2.goods = [].concat(_toConsumableArray(_this2.goods), _toConsumableArray(res['list']));
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
			this.searchKey = options.key;
			this.$invoke('search', 'setValue', this.searchKey);
			this.getGoodsList(options.key);
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
			this.page = 1;
			this.goods = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
			this.searchKey = '';
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getGoodsList(this.searchKey);
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return _tip2.default.share('高额优惠券，速来围观！！！', '', '', '/pages/home/index?request_code=' + userInfo.requestCode);
		}
	}]);

	return SearchDetails;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SearchDetails , 'pages/search_details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaF9kZXRhaWxzLmpzIl0sIm5hbWVzIjpbIlNlYXJjaERldGFpbHMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoIiwibG9hZGluZ01vcmUiLCJsaXN0SXRlbSIsIm1peGlucyIsImRhdGEiLCJzb3J0SWQiLCJwYWdlIiwiZ29vZHMiLCJsb2FkaW5nU3RhdHVzIiwiTE9BRElORyIsInNlYXJjaEtleSIsIm1ldGhvZHMiLCJkb1NlYXJjaCIsInZhbHVlIiwiZ2V0R29vZHNMaXN0IiwiaGFuZGxlU29ydCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsInNjcm9sbFRvcCIsImtleSIsInBhcmFtcyIsImlzTG9hZGluZyIsInVybCIsInNvcnQiLCJzY2IiLCJyZXMiLCJGSU5JU0hFRCIsIk9ORV9QQUdFIiwiTk9fTU9SRSIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0Iiwib3B0aW9ucyIsIiRpbnZva2UiLCJyZXNldERhdGEiLCJ1c2VySW5mbyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsInNoYXJlIiwicmVxdWVzdENvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7a01BQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCO0FBRGhCLEcsUUFHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sVUFBUCxFQUFrQixTQUFRLFdBQTFCLEVBQVQsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLE9BQTlELEVBQWhCLEVB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SUFBTCxHQUFXLENBQVg7QUFDQSxRQUFLQyxLQUFMLEdBQVksRUFBWjtBQUNBLFFBQUtDLGFBQUwsR0FBbUIsc0JBQVlDLE9BQS9CO0FBQ0EsUUFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBOzs7a0NBRWM7QUFDZCxPQUFHLEtBQUtGLGFBQUwsSUFBb0Isc0JBQVlvQixRQUFuQyxFQUE0QztBQUMzQztBQUNBO0FBQ0QsUUFBS2QsWUFBTCxDQUFrQixLQUFLSixTQUF2QjtBQUNBOzs7b0NBRWlCaUIsRyxFQUFLO0FBQ3RCLE9BQUlZLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxVQUFPLGNBQUlDLEtBQUosQ0FBVSxlQUFWLEVBQTBCLEVBQTFCLEVBQTZCLEVBQTdCLEVBQWdDLG9DQUFrQ0gsU0FBU0ksV0FBM0UsQ0FBUDtBQUNBOzs7O0VBMUZ5QyxlQUFLckMsSTs7a0JBQTNCYixhIiwiZmlsZSI6InNlYXJjaF9kZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24vc2VhcmNoJ1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQgTG9hZGluZ01vcmUgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tb24vTG9hZGluZ01vcmUnXG5cdGltcG9ydCBMaXN0SXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbi9MaXN0SXRlbSdcblx0aW1wb3J0IGNvbW1vbk1peGlucyBmcm9tICcuLi9taXhpbnMvY29tbW9uJ1xuXG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaERldGFpbHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxuXHRcdH1cblx0JHJlcGVhdCA9IHtcImdvb2RzXCI6e1wiY29tXCI6XCJsaXN0SXRlbVwiLFwicHJvcHNcIjpcIml0ZW0uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImxpc3RJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJnb29kc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOml0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImdvb2RzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwic2VhcmNoXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9LFwibG9hZGluZ01vcmVcIjp7XCJ2LWJpbmQ6bG9hZGluZ1N0YXR1cy5zeW5jXCI6XCJsb2FkaW5nU3RhdHVzXCIsXCJtZXNzYWdlXCI6XCLliqDovb3kuK0uLi5cIn19O1xyXG4kZXZlbnRzID0ge1wic2VhcmNoXCI6e1widi1vbjpzZWFyY2hWYWx1ZVwiOlwiZG9TZWFyY2hcIn19O1xyXG5cdGNvbXBvbmVudHMgPSB7XG5cdFx0XHRzZWFyY2g6IFNlYXJjaCxcblx0XHRcdGxvYWRpbmdNb3JlOiBMb2FkaW5nTW9yZSxcblx0XHRcdGxpc3RJdGVtOiBMaXN0SXRlbSxcblx0XHR9XG5cdFx0bWl4aW5zID0gW2NvbW1vbk1peGluc107XG5cdFx0ZGF0YSA9IHtcblx0XHRcdHNvcnRJZDogMCxcblx0XHRcdHBhZ2U6IDEsXG5cdFx0XHRnb29kczogW10sXG5cdFx0XHRsb2FkaW5nU3RhdHVzOkxvYWRpbmdNb3JlLkxPQURJTkcsXG5cdFx0XHRzZWFyY2hLZXk6JycsXG5cdFx0fVxuXG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdGRvU2VhcmNoKHZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuc2VhcmNoS2V5ID0gdmFsdWU7XG5cdFx0XHRcdHRoaXMuc29ydElkID0gMDtcblx0XHRcdFx0dGhpcy5nb29kcyA9IFtdO1xuXHRcdFx0XHR0aGlzLnBhZ2UgPSAxO1xuXHRcdFx0XHR0aGlzLmdldEdvb2RzTGlzdCh2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlU29ydChlKSB7XG5cdFx0XHRcdHRoaXMuc29ydElkID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLmdvb2RzID0gW107XG5cdFx0XHRcdHRoaXMucGFnZSA9IDE7XG5cdFx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KHRoaXMuc2VhcmNoS2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblx0XHRnZXRHb29kc0xpc3Qoa2V5KXtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkxPQURJTkc7XG5cdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHRpc0xvYWRpbmc6dGhpcy5wYWdlID09PTEsXG5cdFx0XHRcdHVybDogJ2FnZW50L3N1cGVyX3NlYXJjaCcsXG5cdFx0XHRcdHBhcmFtczoge2tleTprZXksIHBhZ2U6dGhpcy5wYWdlLCBzb3J0OiB0aGlzLnNvcnRJZH0sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkZJTklTSEVEO1xuXHRcdFx0XHRcdGlmKHJlc1snaGFzZGF0YSddPT0wICYmIHRoaXMucGFnZSA9PTEpe1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID1Mb2FkaW5nTW9yZS5PTkVfUEFHRTtcblx0XHRcdFx0XHR9ZWxzZSBpZihyZXNbJ2hhc2RhdGEnXT09MCl7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPUxvYWRpbmdNb3JlLk5PX01PUkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZ29vZHMgPSBbLi4udGhpcy5nb29kcywuLi5yZXNbJ2xpc3QnXV07XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHR0aGlzLnBhZ2UrKztcblx0XHRcdFx0fSxcblx0XHRcdFx0ZWNiOihlcnIpPT57dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuRVJST1I7fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXHRcdG9uTG9hZChvcHRpb25zKSB7XG5cdFx0XHR0aGlzLnNlYXJjaEtleSA9IG9wdGlvbnMua2V5O1xuXHRcdFx0dGhpcy4kaW52b2tlKCdzZWFyY2gnLCAnc2V0VmFsdWUnLCB0aGlzLnNlYXJjaEtleSk7XG5cdFx0XHR0aGlzLmdldEdvb2RzTGlzdChvcHRpb25zLmtleSk7XG5cdFx0fVxuXG5cdFx0b25VbmxvYWQoKXtcblx0XHRcdHRoaXMucmVzZXREYXRhKCk7XG5cdFx0fVxuXG5cdFx0cmVzZXREYXRhKCl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IDA7XG5cdFx0XHR0aGlzLnNvcnRJZD0gMDtcblx0XHRcdHRoaXMucGFnZT0gMTtcblx0XHRcdHRoaXMuZ29vZHM9IFtdO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzPUxvYWRpbmdNb3JlLkxPQURJTkc7XG5cdFx0XHR0aGlzLnNlYXJjaEtleSA9ICcnO1xuXHRcdH1cblxuXHRcdG9uUmVhY2hCb3R0b20oKXtcblx0XHRcdGlmKHRoaXMubG9hZGluZ1N0YXR1cyE9TG9hZGluZ01vcmUuRklOSVNIRUQpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldEdvb2RzTGlzdCh0aGlzLnNlYXJjaEtleSk7XG5cdFx0fVxuXG5cdFx0b25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHJldHVybiB0aXAuc2hhcmUoJ+mrmOmineS8mOaDoOWIuO+8jOmAn+adpeWbtOingu+8ge+8ge+8gScsJycsJycsJy9wYWdlcy9ob21lL2luZGV4P3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19