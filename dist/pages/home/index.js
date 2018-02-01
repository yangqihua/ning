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
			navigationBarTitleText: '柠檬好物',
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
				if (userInfo.checkout == '0') {
					return;
				}
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNlYXJjaCIsImdvb2RzTGlzdCIsImxvYWRpbmdNb3JlIiwiZGF0YSIsImFkTGlzdCIsInRvYXN0VGV4dCIsInNjcm9sbFRvcCIsInNvcnRJZCIsImNvbmRpdGlvbklkIiwicGFnZSIsImdvb2RzIiwidGFicyIsImNfaWQiLCJjX25hbWUiLCJsb2FkaW5nU3RhdHVzIiwiTE9BRElORyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvU2VhcmNoIiwidmFsdWUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1RvQWQiLCJpZCIsImlpZCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiY2hlY2tvdXQiLCJvcGVuaWQiLCJoYW5kQ29uZGl0aW9uIiwiZSIsImRldGFpbCIsImtleSIsInNldFRpbWVvdXQiLCJnZXRHb29kc0xpc3QiLCJoYW5kbGVTb3J0IiwidGFyZ2V0IiwiZGF0YXNldCIsImN1cnJlbnQiLCJwYXJhbXMiLCJpc0xvYWRpbmciLCJzb3J0IiwiY2lkIiwic2NiIiwicmVzIiwiRklOSVNIRUQiLCJsZW5ndGgiLCJOT19NT1JFIiwiJGFwcGx5IiwiZWNiIiwiZXJyIiwiRVJST1IiLCJnZXQiLCIkdG9hc3QiLCIkd3hwYWdlIiwic2VsZWN0Q29tcG9uZW50Iiwic2hvdyIsIm9wdGlvbnMiLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImdsb2JhbERhdGEiLCJpc1d4Q29kZSIsImNoZWNrTG9naW4iLCJnZXRMdW5Cb3R1Iiwic2hhcmUiLCJyZXF1ZXN0Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJ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c291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vc2VhcmNoJ1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXG5cdGltcG9ydCBHb29kc0xpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vR29vZHNMaXN0J1xuXHRpbXBvcnQgTG9hZGluZ01vcmUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vTG9hZGluZ01vcmUnXG5cblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmn6Dmqqzlpb3niaknLFxuXHRcdFx0dXNpbmdDb21wb25lbnRzOiB7XG5cdFx0XHRcdCd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4Jyxcblx0XHRcdFx0J3d4Yy10YWInOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10YWIvZGlzdC9pbmRleCcsXG5cdFx0XHRcdCd3eGMtdGFiLXBhbmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdGFiL2Rpc3QvcGFuZWwnLFxuXHRcdFx0XHQnd3hjLXRhYi1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRhYi9kaXN0L2xhYmVsJ1xuXHRcdFx0fVxuXHRcdH1cblx0JHJlcGVhdCA9IHtcInRhYnNcIjp7XCJjb21cIjpcImdvb2RzTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImdvb2RzTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwidGFic1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmdvb2RzTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcImdvb2RzXCIsXCJmb3JcIjpcInRhYnNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzY3JvbGxUb3Auc3luY1wiOntcInZhbHVlXCI6XCJzY3JvbGxUb3BcIixcImZvclwiOlwidGFic1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImxvYWRpbmdNb3JlXCI6e1widi1iaW5kOmxvYWRpbmdTdGF0dXMuc3luY1wiOlwibG9hZGluZ1N0YXR1c1wiLFwibWVzc2FnZVwiOlwi5Yqg6L295LitLi4uXCJ9fTtcclxuJGV2ZW50cyA9IHtcInNlYXJjaFwiOntcInYtb246c2VhcmNoVmFsdWVcIjpcImRvU2VhcmNoXCJ9fTtcclxuXHRjb21wb25lbnRzID0ge1xuXHRcdFx0c2VhcmNoOiBTZWFyY2gsXG5cdFx0XHRnb29kc0xpc3Q6IEdvb2RzTGlzdCxcblx0XHRcdGxvYWRpbmdNb3JlOiBMb2FkaW5nTW9yZSxcblx0XHR9XG5cblx0XHRkYXRhID0ge1xuXHRcdFx0YWRMaXN0OltdLFxuXHRcdFx0dG9hc3RUZXh0Oifmj5DnpLonLFxuXHRcdFx0c2Nyb2xsVG9wOjAsXG5cblx0XHRcdHNvcnRJZDogMCxcblx0XHRcdGNvbmRpdGlvbklkOiAwLFxuXHRcdFx0cGFnZTogMSxcblx0XHRcdGdvb2RzOiBbXSxcblx0XHRcdHRhYnM6IFtcblx0XHRcdFx0e2NfaWQ6IDAsIGNfbmFtZTogJ+m7mOiupCd9LFxuXHRcdFx0XHR7Y19pZDogMSwgY19uYW1lOiAn5aWz6KOFJ30sXG5cdFx0XHRcdHtjX2lkOiAyLCBjX25hbWU6ICfnlLfoo4UnfSxcblx0XHRcdFx0e2NfaWQ6IDMsIGNfbmFtZTogJ+WGheihoyd9LFxuXHRcdFx0XHR7Y19pZDogNCwgY19uYW1lOiAn5q+N5am0J30sXG5cdFx0XHRcdHtjX2lkOiA1LCBjX25hbWU6ICfnvo7lpoYnfSxcblx0XHRcdFx0e2NfaWQ6IDYsIGNfbmFtZTogJ+WxheWutid9LFxuXHRcdFx0XHR7Y19pZDogNywgY19uYW1lOiAn6Z6L5YyFJ30sXG5cdFx0XHRcdHtjX2lkOiA4LCBjX25hbWU6ICfnvo7po58nfSxcblx0XHRcdFx0e2NfaWQ6IDksIGNfbmFtZTogJ+aWh+S9kyd9LFxuXHRcdFx0XHR7Y19pZDogMTAsIGNfbmFtZTogJ+aVsOeggSd9LFxuXHRcdFx0XHR7Y19pZDogMTEsIGNfbmFtZTogJ+aIt+Wklid9LFxuXHRcdFx0XHR7Y19pZDogMTIsIGNfbmFtZTogJ+WFtuS7lid9LFxuXHRcdFx0XSxcblx0XHRcdGxvYWRpbmdTdGF0dXM6TG9hZGluZ01vcmUuTE9BRElORyxcblx0XHR9XG5cblx0XHRjb21wdXRlZCA9IHtcblx0XHR9XG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0ZG9TZWFyY2godmFsdWUpIHtcblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnL3BhZ2VzL3NlYXJjaF9kZXRhaWxzP2tleT0nK3ZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0Z29Ub0FkKGlkLGlpZCl7XG5cdFx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0XHRpZih1c2VySW5mby5jaGVja291dD09JzAnKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnL3BhZ2VzL2dvb2RzX2RldGFpbHM/aWQ9JytpZCsnJmlpZD0nK2lpZCsnJm9wZW5pZD0nK3VzZXJJbmZvLm9wZW5pZFxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblxuXHRcdFx0aGFuZENvbmRpdGlvbjogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dGhpcy5jb25kaXRpb25JZCA9IGUuZGV0YWlsLmtleTtcblx0XHRcdFx0dGhpcy5zb3J0SWQgPSAwO1xuXHRcdFx0XHR0aGlzLnBhZ2UgPSAxO1xuXHRcdFx0XHR0aGlzLmdvb2RzID0gW107XG5cdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHR0aGlzLmdldEdvb2RzTGlzdCgpO1xuXHRcdFx0XHR9LDIwMCk7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlU29ydChlKSB7XG5cdFx0XHRcdHRoaXMuc29ydElkID0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLmdvb2RzID0gW107XG5cdFx0XHRcdHRoaXMucGFnZSA9IDE7XG5cdFx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b25QYWdlU2Nyb2xsKGUpe1xuXHRcdFx0dGhpcy5zY3JvbGxUb3AgPSBlLnNjcm9sbFRvcDtcblx0XHR9XG5cblx0XHRnZXRHb29kc0xpc3QoKXtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkxPQURJTkc7XG5cdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHR1cmw6ICdhZ2VudC9tYWluX2dvb2RzX2xpc3QnLFxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtwYWdlOiB0aGlzLnBhZ2UsIHNvcnQ6IHRoaXMuc29ydElkLCBjaWQ6IHRoaXMuY29uZGl0aW9uSWR9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmdNb3JlID1Mb2FkaW5nTW9yZS5GSU5JU0hFRDtcblx0XHRcdFx0XHRpZihyZXMubGVuZ3RoPT0wKXtcblx0XHRcdFx0XHRcdHRoaXMubG9hZGluZ01vcmUgPUxvYWRpbmdNb3JlLk5PX01PUkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZ29vZHMgPSBbLi4udGhpcy5nb29kcywuLi5yZXNdO1xuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdFx0dGhpcy5wYWdlKys7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVjYjooZXJyKT0+e3RoaXMubG9hZGluZ01vcmUgPUxvYWRpbmdNb3JlLkVSUk9SO31cblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblxuXG5cdFx0c2hvd1RvYXN0KCkge1xuXHRcdFx0bGV0ICR0b2FzdCA9IHRoaXMuJHd4cGFnZS5zZWxlY3RDb21wb25lbnQoJy5KX3RvYXN0Jylcblx0XHRcdCR0b2FzdCAmJiAkdG9hc3Quc2hvdygpXG5cdFx0fVxuXG5cdFx0Z2V0THVuQm90dSgpe1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOidhZ2VudC9sdW5ib3R1Jyxcblx0XHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0XHRzY2I6KHJlcyk9Pntcblx0XHRcdFx0XHR0aGlzLmFkTGlzdCA9IHJlcztcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0bGV0IHNjZW5lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnNbJ3NjZW5lJ10pO1xuXHRcdFx0aWYodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuaXNXeENvZGUpe1xuXHRcdFx0XHR0aGlzLiRwYXJlbnQuY2hlY2tMb2dpbihzY2VuZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldEx1bkJvdHUoKTtcblx0XHR9XG5cblx0XHRvblJlYWNoQm90dG9tKCl7XG5cdFx0XHRpZih0aGlzLmxvYWRpbmdNb3JlIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0R29vZHNMaXN0KCk7XG5cdFx0fVxuXG5cdFx0b25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHJldHVybiB0aXAuc2hhcmUoJ+mrmOmineS8mOaDoOWIuO+8jOmAn+adpeWbtOingu+8ge+8ge+8gScsJycsJycsJy9wYWdlcy9ob21lL2luZGV4P3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19