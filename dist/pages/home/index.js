'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _search = require('./../../components/common/search.js');

var _search2 = _interopRequireDefault(_search);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _HTTPUtil = require('./../../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _GoodsList = require('./../../components/common/GoodsList.js');

var _GoodsList2 = _interopRequireDefault(_GoodsList);

var _LoadingMore = require('./../../components/common/LoadingMore.js');

var _LoadingMore2 = _interopRequireDefault(_LoadingMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
			navigationBarTitleText: '柠檬购物',
			usingComponents: {
				'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
				'wxc-tab': '../../packages/@minui/wxc-tab/dist/index',
				'wxc-tab-panel': '../../packages/@minui/wxc-tab/dist/panel',
				'wxc-tab-label': '../../packages/@minui/wxc-tab/dist/label'
			}
		}, _this.$repeat = { "tabs": { "com": "goodsList", "props": "" } }, _this.$props = { "goodsList": { "xmlns:v-bind": { "value": "", "for": "tabs", "item": "item", "index": "index", "key": "index" }, "v-bind:goodsList.sync": { "value": "goods", "for": "tabs", "item": "item", "index": "index", "key": "index" }, "v-bind:scrollTop.sync": { "value": "scrollTop", "for": "tabs", "item": "item", "index": "index", "key": "index" } }, "search": { "xmlns:v-on": "" }, "loadingMore": { "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = { "search": { "v-on:searchValue": "doSearch" } }, _this.components = {
			search: _search2.default,
			goodsList: _GoodsList2.default,
			loadingMore: _LoadingMore2.default
		}, _this.data = {
			adList: [],
			toastText: '提示',
			scrollTop: 0,

			sortId: 0,
			conditionId: 0,
			page: 1,
			goods: [],
			tabs: [{ c_id: 0, c_name: '默认' }, { c_id: 1, c_name: '女装' }, { c_id: 2, c_name: '男装' }, { c_id: 3, c_name: '内衣' }, { c_id: 4, c_name: '母婴' }, { c_id: 5, c_name: '美妆' }, { c_id: 6, c_name: '居家' }, { c_id: 7, c_name: '鞋包' }, { c_id: 8, c_name: '美食' }, { c_id: 9, c_name: '文体' }, { c_id: 10, c_name: '数码' }, { c_id: 11, c_name: '户外' }, { c_id: 12, c_name: '其他' }],
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.computed = {}, _this.methods = {
			doSearch: function doSearch(value) {
				wx.navigateTo({
					url: '/pages/search_details?key=' + value
				});
			},
			goToAd: function goToAd(id, iid) {
				var userInfo = this.$parent.getUserInfo();
				wx.navigateTo({
					url: '/pages/goods_details?id=' + id + '&iid=' + iid + '&openid=' + userInfo.openid
				});
			},


			handCondition: function handCondition(e) {
				var _this2 = this;

				this.conditionId = e.detail.key;
				this.sortId = 0;
				this.page = 1;
				this.goods = [];
				setTimeout(function () {
					_this2.getGoodsList();
				}, 200);
			},
			handleSort: function handleSort(e) {
				this.sortId = e.target.dataset.current;
				this.goods = [];
				this.page = 1;
				this.getGoodsList();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Index, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getGoodsList',
		value: function getGoodsList() {
			var _this3 = this;

			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'agent/main_goods_list',
				isLoading: false,
				params: { page: this.page, sort: this.sortId, cid: this.conditionId },
				scb: function scb(res) {
					_this3.loadingMore = _LoadingMore2.default.FINISHED;
					if (res.length == 0) {
						_this3.loadingMore = _LoadingMore2.default.NO_MORE;
					}
					_this3.goods = [].concat(_toConsumableArray(_this3.goods), _toConsumableArray(res));
					_this3.$apply();
					_this3.page++;
				},
				ecb: function ecb(err) {
					_this3.loadingMore = _LoadingMore2.default.ERROR;
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'showToast',
		value: function showToast() {
			var $toast = this.$wxpage.selectComponent('.J_toast');
			$toast && $toast.show();
		}
	}, {
		key: 'getLunBotu',
		value: function getLunBotu() {
			var _this4 = this;

			var params = {
				url: 'agent/lunbotu',
				isLoading: false,
				scb: function scb(res) {
					_this4.adList = res;
					_this4.$apply();
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			var scene = decodeURIComponent(options['scene']);
			if (this.$parent.globalData.isWxCode) {
				this.$parent.checkLogin(scene);
			}
			this.getLunBotu();
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingMore != _LoadingMore2.default.FINISHED) {
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

	return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/home/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNlYXJjaCIsImdvb2RzTGlzdCIsImxvYWRpbmdNb3JlIiwiZGF0YSIsImFkTGlzdCIsInRvYXN0VGV4dCIsInNjcm9sbFRvcCIsInNvcnRJZCIsImNvbmRpdGlvbklkIiwicGFnZSIsImdvb2RzIiwidGFicyIsImNfaWQiLCJjX25hbWUiLCJsb2FkaW5nU3RhdHVzIiwiTE9BRElORyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvU2VhcmNoIiwidmFsdWUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1RvQWQiLCJpZCIsImlpZCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwib3BlbmlkIiwiaGFuZENvbmRpdGlvbiIsImUiLCJkZXRhaWwiLCJrZXkiLCJzZXRUaW1lb3V0IiwiZ2V0R29vZHNMaXN0IiwiaGFuZGxlU29ydCIsInRhcmdldCIsImRhdGFzZXQiLCJjdXJyZW50IiwicGFyYW1zIiwiaXNMb2FkaW5nIiwic29ydCIsImNpZCIsInNjYiIsInJlcyIsIkZJTklTSEVEIiwibGVuZ3RoIiwiTk9fTU9SRSIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0IiwiJHRvYXN0IiwiJHd4cGFnZSIsInNlbGVjdENvbXBvbmVudCIsInNob3ciLCJvcHRpb25zIiwic2NlbmUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJnbG9iYWxEYXRhIiwiaXNXeENvZGUiLCJjaGVja0xvZ2luIiwiZ2V0THVuQm90dSIsInNoYXJlIiwicmVxdWVzdENvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7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LFdBQUwsR0FBa0Isc0JBQVlrRCxLQUE5QjtBQUFxQztBQWJyQyxJQUFiO0FBZUEsc0JBQVNDLEdBQVQsQ0FBYWIsTUFBYjtBQUNBOzs7OEJBRVc7QUFDWCxPQUFJYyxTQUFTLEtBQUtDLE9BQUwsQ0FBYUMsZUFBYixDQUE2QixVQUE3QixDQUFiO0FBQ0FGLGFBQVVBLE9BQU9HLElBQVAsRUFBVjtBQUNBOzs7K0JBRVc7QUFBQTs7QUFDWCxPQUFJakIsU0FBUztBQUNabEIsU0FBSSxlQURRO0FBRVptQixlQUFVLEtBRkU7QUFHWkcsU0FBSSxhQUFDQyxHQUFELEVBQU87QUFDVixZQUFLekMsTUFBTCxHQUFjeUMsR0FBZDtBQUNBLFlBQUtJLE1BQUw7QUFDQTtBQU5XLElBQWI7QUFRQSxzQkFBU0ksR0FBVCxDQUFhYixNQUFiO0FBQ0E7Ozt5QkFFTWtCLE8sRUFBUztBQUNmLE9BQUlDLFFBQVFDLG1CQUFtQkYsUUFBUSxPQUFSLENBQW5CLENBQVo7QUFDQSxPQUFHLEtBQUsvQixPQUFMLENBQWFrQyxVQUFiLENBQXdCQyxRQUEzQixFQUFvQztBQUNuQyxTQUFLbkMsT0FBTCxDQUFhb0MsVUFBYixDQUF3QkosS0FBeEI7QUFDQTtBQUNELFFBQUtLLFVBQUw7QUFDQTs7O2tDQUVjO0FBQ2QsT0FBRyxLQUFLOUQsV0FBTCxJQUFrQixzQkFBWTRDLFFBQWpDLEVBQTBDO0FBQ3pDO0FBQ0E7QUFDRCxRQUFLWCxZQUFMO0FBQ0E7OztvQ0FFaUJVLEcsRUFBSztBQUN0QixPQUFJbkIsV0FBVyxLQUFLQyxPQUFMLENBQWFDLFdBQWIsRUFBZjtBQUNBLFVBQU8sY0FBSXFDLEtBQUosQ0FBVSxlQUFWLEVBQTBCLEVBQTFCLEVBQTZCLEVBQTdCLEVBQWdDLG9DQUFrQ3ZDLFNBQVN3QyxXQUEzRSxDQUFQO0FBQ0E7Ozs7RUExSWlDLGVBQUt6RCxJOztrQkFBbkJqQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vc2VhcmNoJ1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXG5cdGltcG9ydCBHb29kc0xpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vR29vZHNMaXN0J1xuXHRpbXBvcnQgTG9hZGluZ01vcmUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vTG9hZGluZ01vcmUnXG5cblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmn6DmqqzotK3niaknLFxuXHRcdFx0dXNpbmdDb21wb25lbnRzOiB7XG5cdFx0XHRcdCd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4Jyxcblx0XHRcdFx0J3d4Yy10YWInOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10YWIvZGlzdC9pbmRleCcsXG5cdFx0XHRcdCd3eGMtdGFiLXBhbmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdGFiL2Rpc3QvcGFuZWwnLFxuXHRcdFx0XHQnd3hjLXRhYi1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRhYi9kaXN0L2xhYmVsJ1xuXHRcdFx0fVxuXHRcdH1cblx0JHJlcGVhdCA9IHtcInRhYnNcIjp7XCJjb21cIjpcImdvb2RzTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImdvb2RzTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwidGFic1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdvb2RzTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcImdvb2RzXCIsXCJmb3JcIjpcInRhYnNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzY3JvbGxUb3Auc3luY1wiOntcInZhbHVlXCI6XCJzY3JvbGxUb3BcIixcImZvclwiOlwidGFic1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImxvYWRpbmdNb3JlXCI6e1widi1iaW5kOmxvYWRpbmdTdGF0dXMuc3luY1wiOlwibG9hZGluZ1N0YXR1c1wiLFwibWVzc2FnZVwiOlwi5Yqg6L295LitLi4uXCJ9fTtcclxuJGV2ZW50cyA9IHtcInNlYXJjaFwiOntcInYtb246c2VhcmNoVmFsdWVcIjpcImRvU2VhcmNoXCJ9fTtcclxuXHRjb21wb25lbnRzID0ge1xuXHRcdFx0c2VhcmNoOiBTZWFyY2gsXG5cdFx0XHRnb29kc0xpc3Q6IEdvb2RzTGlzdCxcblx0XHRcdGxvYWRpbmdNb3JlOiBMb2FkaW5nTW9yZSxcblx0XHR9XG5cblx0XHRkYXRhID0ge1xuXHRcdFx0YWRMaXN0OltdLFxuXHRcdFx0dG9hc3RUZXh0Oifmj5DnpLonLFxuXHRcdFx0c2Nyb2xsVG9wOjAsXG5cblx0XHRcdHNvcnRJZDogMCxcblx0XHRcdGNvbmRpdGlvbklkOiAwLFxuXHRcdFx0cGFnZTogMSxcblx0XHRcdGdvb2RzOiBbXSxcblx0XHRcdHRhYnM6IFtcblx0XHRcdFx0e2NfaWQ6IDAsIGNfbmFtZTogJ+m7mOiupCd9LFxuXHRcdFx0XHR7Y19pZDogMSwgY19uYW1lOiAn5aWz6KOFJ30sXG5cdFx0XHRcdHtjX2lkOiAyLCBjX25hbWU6ICfnlLfoo4UnfSxcblx0XHRcdFx0e2NfaWQ6IDMsIGNfbmFtZTogJ+WGheihoyd9LFxuXHRcdFx0XHR7Y19pZDogNCwgY19uYW1lOiAn5q+N5am0J30sXG5cdFx0XHRcdHtjX2lkOiA1LCBjX25hbWU6ICfnvo7lpoYnfSxcblx0XHRcdFx0e2NfaWQ6IDYsIGNfbmFtZTogJ+WxheWutid9LFxuXHRcdFx0XHR7Y19pZDogNywgY19uYW1lOiAn6Z6L5YyFJ30sXG5cdFx0XHRcdHtjX2lkOiA4LCBjX25hbWU6ICfnvo7po58nfSxcblx0XHRcdFx0e2NfaWQ6IDksIGNfbmFtZTogJ+aWh+S9kyd9LFxuXHRcdFx0XHR7Y19pZDogMTAsIGNfbmFtZTogJ+aVsOeggSd9LFxuXHRcdFx0XHR7Y19pZDogMTEsIGNfbmFtZTogJ+aIt+Wklid9LFxuXHRcdFx0XHR7Y19pZDogMTIsIGNfbmFtZTogJ+WFtuS7lid9LFxuXHRcdFx0XSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRjb21wdXRlZCA9IHtcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0ZG9TZWFyY2godmFsdWUpIHtcblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnL3BhZ2VzL3NlYXJjaF9kZXRhaWxzP2tleT0nK3ZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0Z29Ub0FkKGlkLGlpZCl7XG5cdFx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHtcblx0XHRcdFx0XHR1cmw6ICcvcGFnZXMvZ29vZHNfZGV0YWlscz9pZD0nK2lkKycmaWlkPScraWlkKycmb3BlbmlkPScrdXNlckluZm8ub3BlbmlkXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXG5cdFx0XHRoYW5kQ29uZGl0aW9uOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR0aGlzLmNvbmRpdGlvbklkID0gZS5kZXRhaWwua2V5O1xuXHRcdFx0XHR0aGlzLnNvcnRJZCA9IDA7XG5cdFx0XHRcdHRoaXMucGFnZSA9IDE7XG5cdFx0XHRcdHRoaXMuZ29vZHMgPSBbXTtcblx0XHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0XHRcdH0sMjAwKTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVTb3J0KGUpIHtcblx0XHRcdFx0dGhpcy5zb3J0SWQgPSBlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQ7XG5cdFx0XHRcdHRoaXMuZ29vZHMgPSBbXTtcblx0XHRcdFx0dGhpcy5wYWdlID0gMTtcblx0XHRcdFx0dGhpcy5nZXRHb29kc0xpc3QoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvblBhZ2VTY3JvbGwoZSl7XG5cdFx0XHR0aGlzLnNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuXHRcdH1cblxuXHRcdGdldEdvb2RzTGlzdCgpe1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuTE9BRElORztcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2FnZW50L21haW5fZ29vZHNfbGlzdCcsXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdHBhcmFtczoge3BhZ2U6IHRoaXMucGFnZSwgc29ydDogdGhpcy5zb3J0SWQsIGNpZDogdGhpcy5jb25kaXRpb25JZH0sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZ01vcmUgPUxvYWRpbmdNb3JlLkZJTklTSEVEO1xuXHRcdFx0XHRcdGlmKHJlcy5sZW5ndGg9PTApe1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nTW9yZSA9TG9hZGluZ01vcmUuTk9fTU9SRTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5nb29kcyA9IFsuLi50aGlzLmdvb2RzLC4uLnJlc107XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHR0aGlzLnBhZ2UrKztcblx0XHRcdFx0fSxcblx0XHRcdFx0ZWNiOihlcnIpPT57dGhpcy5sb2FkaW5nTW9yZSA9TG9hZGluZ01vcmUuRVJST1I7fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0c2hvd1RvYXN0KCkge1xuXHRcdFx0bGV0ICR0b2FzdCA9IHRoaXMuJHd4cGFnZS5zZWxlY3RDb21wb25lbnQoJy5KX3RvYXN0Jylcblx0XHRcdCR0b2FzdCAmJiAkdG9hc3Quc2hvdygpXG5cdFx0fVxuXG5cdFx0Z2V0THVuQm90dSgpe1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOidhZ2VudC9sdW5ib3R1Jyxcblx0XHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0XHRzY2I6KHJlcyk9Pntcblx0XHRcdFx0XHR0aGlzLmFkTGlzdCA9IHJlcztcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0bGV0IHNjZW5lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnNbJ3NjZW5lJ10pO1xuXHRcdFx0aWYodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuaXNXeENvZGUpe1xuXHRcdFx0XHR0aGlzLiRwYXJlbnQuY2hlY2tMb2dpbihzY2VuZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldEx1bkJvdHUoKTtcblx0XHR9XG5cblx0XHRvblJlYWNoQm90dG9tKCl7XG5cdFx0XHRpZih0aGlzLmxvYWRpbmdNb3JlIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0fVxuXG5cdFx0b25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHJldHVybiB0aXAuc2hhcmUoJ+mrmOmineS8mOaDoOWIuO+8jOmAn+adpeWbtOingu+8ge+8ge+8gScsJycsJycsJy9wYWdlcy9ob21lL2luZGV4P3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19