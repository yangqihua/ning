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

var Agent = function (_wepy$page) {
	_inherits(Agent, _wepy$page);

	function Agent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Agent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Agent.__proto__ || Object.getPrototypeOf(Agent)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '代理推广奖励',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A',
			backgroundColor: '#efefef'
		}, _this.$repeat = {}, _this.$props = { "loadingMore": { "xmlns:v-bind": "", "v-bind:loadingStatus.sync": "loadingStatus", "message": "加载中..." } }, _this.$events = {}, _this.components = {
			loadingMore: _LoadingMore2.default
		}, _this.mixins = [_common2.default], _this.data = {
			totalReward: 0,
			page: 1,
			agentList: [],
			loadingStatus: _LoadingMore2.default.LOADING
		}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Agent, [{
		key: 'onPageScroll',
		value: function onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}, {
		key: 'getAgentList',
		value: function getAgentList() {
			var _this2 = this;

			var userInfo = this.$parent.getUserInfo();
			this.loadingStatus = _LoadingMore2.default.LOADING;
			var params = {
				url: 'auth/spread_details',
				params: { openid: userInfo.openid, page: this.page, limit: '10' },
				scb: function scb(res) {
					_this2.loadingStatus = _LoadingMore2.default.FINISHED;
					if (res['hasdata'] == 0 && _this2.page == 1) {
						_this2.loadingStatus = _LoadingMore2.default.ONE_PAGE;
					} else if (res['hasdata'] == 0) {
						_this2.loadingStatus = _LoadingMore2.default.NO_MORE;
					}
					_this2.agentList = [].concat(_toConsumableArray(_this2.agentList), _toConsumableArray(res['list']));
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
			if (options.hasOwnProperty('total_reward')) {
				this.totalReward = options.total_reward;
			}
			this.getAgentList();
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.page = 1;
			this.agentList = [];
			this.loadingStatus = _LoadingMore2.default.LOADING;
		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			if (this.loadingStatus != _LoadingMore2.default.FINISHED) {
				return;
			}
			this.getAgentList();
		}
	}]);

	return Agent;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Agent , 'pages/agent/agent'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9hZGluZ01vcmUiLCJtaXhpbnMiLCJkYXRhIiwidG90YWxSZXdhcmQiLCJwYWdlIiwiYWdlbnRMaXN0IiwibG9hZGluZ1N0YXR1cyIsIkxPQURJTkciLCJtZXRob2RzIiwiZSIsInNjcm9sbFRvcCIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwibGltaXQiLCJzY2IiLCJyZXMiLCJGSU5JU0hFRCIsIk9ORV9QQUdFIiwiTk9fTU9SRSIsIiRhcHBseSIsImVjYiIsImVyciIsIkVSUk9SIiwiZ2V0Iiwib3B0aW9ucyIsImhhc093blByb3BlcnR5IiwidG90YWxfcmV3YXJkIiwiZ2V0QWdlbnRMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7a0xBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLFFBRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQyxvQkFBaUI7QUFKVCxHLFFBT1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQiw2QkFBNEIsZUFBL0MsRUFBK0QsV0FBVSxRQUF6RSxFQUFmLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1hDO0FBRFcsRyxRQUdaQyxNLEdBQVMsa0IsUUFDVEMsSSxHQUFPO0FBQ05DLGdCQUFZLENBRE47QUFFTkMsU0FBTSxDQUZBO0FBR05DLGNBQVcsRUFITDtBQUlOQyxrQkFBYyxzQkFBWUM7QUFKcEIsRyxRQVdQQyxPLEdBQVUsRTs7Ozs7K0JBSkdDLEMsRUFBRTtBQUNkLFFBQUtDLFNBQUwsR0FBaUJELEVBQUVDLFNBQW5CO0FBQ0E7OztpQ0FLYztBQUFBOztBQUNkLE9BQUlDLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxRQUFLUCxhQUFMLEdBQXFCLHNCQUFZQyxPQUFqQztBQUNBLE9BQUlPLFNBQVM7QUFDWkMsU0FBSyxxQkFETztBQUVaRCxZQUFRLEVBQUNFLFFBQVFMLFNBQVNLLE1BQWxCLEVBQTBCWixNQUFNLEtBQUtBLElBQXJDLEVBQTBDYSxPQUFNLElBQWhELEVBRkk7QUFHWkMsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixZQUFLYixhQUFMLEdBQXFCLHNCQUFZYyxRQUFqQztBQUNBLFNBQUdELElBQUksU0FBSixLQUFnQixDQUFoQixJQUFxQixPQUFLZixJQUFMLElBQVksQ0FBcEMsRUFBc0M7QUFDckMsYUFBS0UsYUFBTCxHQUFvQixzQkFBWWUsUUFBaEM7QUFDQSxNQUZELE1BRU0sSUFBR0YsSUFBSSxTQUFKLEtBQWdCLENBQW5CLEVBQXFCO0FBQzFCLGFBQUtiLGFBQUwsR0FBb0Isc0JBQVlnQixPQUFoQztBQUNBO0FBQ0QsWUFBS2pCLFNBQUwsZ0NBQXFCLE9BQUtBLFNBQTFCLHNCQUF1Q2MsSUFBSSxNQUFKLENBQXZDO0FBQ0EsWUFBS0ksTUFBTDtBQUNBLFlBQUtuQixJQUFMO0FBQ0EsS0FiVztBQWNab0IsU0FBSSxhQUFDQyxHQUFELEVBQU87QUFBQyxZQUFLbkIsYUFBTCxHQUFxQixzQkFBWW9CLEtBQWpDO0FBQXdDO0FBZHhDLElBQWI7QUFnQkEsc0JBQVNDLEdBQVQsQ0FBYWIsTUFBYjtBQUNBOzs7eUJBRU1jLE8sRUFBUztBQUNmLE9BQUdBLFFBQVFDLGNBQVIsQ0FBdUIsY0FBdkIsQ0FBSCxFQUEwQztBQUN6QyxTQUFLMUIsV0FBTCxHQUFtQnlCLFFBQVFFLFlBQTNCO0FBQ0E7QUFDRCxRQUFLQyxZQUFMO0FBQ0E7Ozs2QkFFUztBQUNULFFBQUszQixJQUFMLEdBQVksQ0FBWjtBQUNBLFFBQUtDLFNBQUwsR0FBZSxFQUFmO0FBQ0EsUUFBS0MsYUFBTCxHQUFxQixzQkFBWUMsT0FBakM7QUFDQTs7O2tDQUVjO0FBQ2QsT0FBRyxLQUFLRCxhQUFMLElBQW9CLHNCQUFZYyxRQUFuQyxFQUE0QztBQUMzQztBQUNBO0FBQ0QsUUFBS1csWUFBTDtBQUNBOzs7O0VBckVpQyxlQUFLM0IsSTs7a0JBQW5CZCxLIiwiZmlsZSI6ImFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJ1xuXHRpbXBvcnQgSFRUUFV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvSFRUUFV0aWwnXG5cdGltcG9ydCBjb21tb25NaXhpbnMgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbW1vbidcblx0aW1wb3J0IExvYWRpbmdNb3JlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL0xvYWRpbmdNb3JlJ1xuXG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFnZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Luj55CG5o6o5bm/5aWW5YqxJyxcblx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcblx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRjc3MDFBJyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnLFxuXHRcdH1cblxuXHQkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImxvYWRpbmdNb3JlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsb2FkaW5nU3RhdHVzLnN5bmNcIjpcImxvYWRpbmdTdGF0dXNcIixcIm1lc3NhZ2VcIjpcIuWKoOi9veS4rS4uLlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuXHRjb21wb25lbnRzID0ge1xuXHRcdFx0bG9hZGluZ01vcmU6IExvYWRpbmdNb3JlLFxuXHRcdH1cblx0XHRtaXhpbnMgPSBbY29tbW9uTWl4aW5zXTtcblx0XHRkYXRhID0ge1xuXHRcdFx0dG90YWxSZXdhcmQ6MCxcblx0XHRcdHBhZ2U6IDEsXG5cdFx0XHRhZ2VudExpc3Q6IFtdLFxuXHRcdFx0bG9hZGluZ1N0YXR1czpMb2FkaW5nTW9yZS5MT0FESU5HLFxuXHRcdH1cblxuXHRcdG9uUGFnZVNjcm9sbChlKXtcblx0XHRcdHRoaXMuc2Nyb2xsVG9wID0gZS5zY3JvbGxUb3A7XG5cdFx0fVxuXG5cdFx0bWV0aG9kcyA9IHtcblx0XHR9XG5cblx0XHRnZXRBZ2VudExpc3QoKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkxPQURJTkc7XG5cdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHR1cmw6ICdhdXRoL3NwcmVhZF9kZXRhaWxzJyxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOiB1c2VySW5mby5vcGVuaWQsIHBhZ2U6IHRoaXMucGFnZSxsaW1pdDonMTAnfSxcblx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nU3RhdHVzID0gTG9hZGluZ01vcmUuRklOSVNIRUQ7XG5cdFx0XHRcdFx0aWYocmVzWydoYXNkYXRhJ109PTAgJiYgdGhpcy5wYWdlID09MSl7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPUxvYWRpbmdNb3JlLk9ORV9QQUdFO1xuXHRcdFx0XHRcdH1lbHNlIGlmKHJlc1snaGFzZGF0YSddPT0wKXtcblx0XHRcdFx0XHRcdHRoaXMubG9hZGluZ1N0YXR1cyA9TG9hZGluZ01vcmUuTk9fTU9SRTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5hZ2VudExpc3QgPSBbLi4udGhpcy5hZ2VudExpc3QsLi4ucmVzWydsaXN0J11dO1xuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdFx0dGhpcy5wYWdlKys7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVjYjooZXJyKT0+e3RoaXMubG9hZGluZ1N0YXR1cyA9IExvYWRpbmdNb3JlLkVSUk9SO31cblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblxuXHRcdG9uTG9hZChvcHRpb25zKSB7XG5cdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCd0b3RhbF9yZXdhcmQnKSl7XG5cdFx0XHRcdHRoaXMudG90YWxSZXdhcmQgPSBvcHRpb25zLnRvdGFsX3Jld2FyZDtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0QWdlbnRMaXN0KCk7XG5cdFx0fVxuXG5cdFx0b25VbmxvYWQoKXtcblx0XHRcdHRoaXMucGFnZSA9IDFcblx0XHRcdHRoaXMuYWdlbnRMaXN0PVtdXG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0dXMgPSBMb2FkaW5nTW9yZS5MT0FESU5HXG5cdFx0fVxuXG5cdFx0b25SZWFjaEJvdHRvbSgpe1xuXHRcdFx0aWYodGhpcy5sb2FkaW5nU3RhdHVzIT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0QWdlbnRMaXN0KCk7XG5cdFx0fVxuXG5cdH1cbiJdfQ==