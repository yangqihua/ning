'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constant = require('./../../utils/constant.js');

var _HTTPUtil = require('./../../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_wepy$page) {
	_inherits(Me, _wepy$page);

	function Me() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Me);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '个人中心',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A',
			backgroundColor: '#efefef',
			enablePullDownRefresh: true
		}, _this.data = {
			activeTime: '0',
			timeData: {
				click: 0,
				order_num: 0,
				incomes: 0
			},
			userInfo: {
				agentCode: '0',
				avatarUrl: '',
				nickName: '加载中...'
			},
			normalUserData: {
				notice: '',
				code: ''
			},
			userData: {
				notice: '',
				money: 0,
				customer_count: 0,
				tixian: 0,
				spread_money: 0, // 推广money
				total_lastm: 0,
				total_m: 0,
				request_code: '',
				day_detail: {
					click: 0,
					order_num: 0,
					incomes: 0
				},
				week_detail: {
					click: 0,
					order_num: 0,
					incomes: 0
				},
				total_detail: {
					click: 0,
					order_num: 0,
					incomes: 0
				}
			}
		}, _this.watch = {
			activeTime: function activeTime(newValue) {
				this.setActiveTime(newValue);
			}
		}, _this.computed = {
			applyText: function applyText() {
				if (this.userInfo.agentCode == '0') {
					return '成为合伙人';
				} else if (this.userInfo.agentCode == '2') {
					return '合伙人申请中';
				} else if (this.userInfo.agentCode == '1') {
					return '已经成为合伙人';
				}
				return '成为合伙人';
			}
		}, _this.methods = {
			handleTime: function handleTime(e) {
				this.activeTime = e.target.dataset.current;
			},
			tixian: function tixian() {
				wx.navigateTo({ url: '/pages/agent/tixian' });
			},
			readTixian: function readTixian() {
				wx.navigateTo({ url: '/pages/agent/read_tixian' });
			},
			order: function order() {
				wx.navigateTo({ url: '/pages/agent/order?type=' + this.activeTime });
			},
			user: function user() {
				wx.navigateTo({ url: '/pages/agent/user' });
			},
			agent: function agent() {
				wx.navigateTo({ url: '/pages/agent/agent?total_reward=' + this.userData.spread_money });
			},
			applyAgent: function applyAgent() {
				if (this.userInfo.agentCode == '2') {
					_tip2.default.alert({ text: '合伙人申请审核中...' });
				} else if (this.userInfo.agentCode == '0') {
					wx.navigateTo({ url: '/pages/agent/show_apply' });
				}
			},
			handleQrCode: function handleQrCode() {
				var _this2 = this;

				_tip2.default.confirm({ text: '确定后将打开您的专属小程序码，请长按保存至相册或直接发送给好友' }).then(function (res) {
					_tip2.default.loading("生成中");
					var params = {
						url: 'utils/getwxacode',
						params: { openid: _this2.userInfo.openid, scene: '', page: 'pages/home/index' },
						scb: function scb(res) {
							var url = res['url'];
							wx.downloadFile({
								url: _constant.PUBLIC + url,
								success: function success(res) {
									_tip2.default.loaded();
									_HTTPUtil2.default.deleteTempPic(url);
									wx.previewImage({
										urls: [res.tempFilePath],
										complete: function complete() {
											//											tip.success('complete')
										}
									});
								},
								fail: function fail() {
									_tip2.default.loaded();
									_tip2.default.error('获取失败');
								}
							});
						},
						ecb: function ecb(res) {
							_tip2.default.loaded();
						}
					};
					_HTTPUtil2.default.get(params);
				}).catch(function (res) {});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Me, [{
		key: 'setActiveTime',
		value: function setActiveTime(value) {
			if (value == '0') {
				this.timeData = this.userData['day_detail'];
			} else if (value == '1') {
				this.timeData = this.userData['week_detail'];
			} else {
				this.timeData = this.userData['total_detail'];
			}
		}
	}, {
		key: 'getData',
		value: function getData() {
			var _this3 = this;

			var params = {
				url: 'auth/user_profile',
				params: { openid: this.userInfo.openid },
				isLoading: false,
				scb: function scb(res) {
					_this3.userData = res;
					_this3.setActiveTime(_this3.activeTime);
					_this3.$apply();
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'getNormalData',
		value: function getNormalData() {
			var _this4 = this;

			var params = {
				url: 'auth/normal_user_info',
				params: { openid: this.userInfo.openid },
				isLoading: false,
				scb: function scb(res) {
					_this4.normalUserData = res;
					_this4.$apply();
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			this.userInfo = this.$parent.getUserInfo();
			if (this.userInfo.agentCode == '1') {
				this.getData();
			} else {
				this.getNormalData();
			}
		}
	}, {
		key: 'onPullDownRefresh',
		value: function onPullDownRefresh() {
			if (this.userInfo.agentCode == '1') {
				this.getPullDownData();
			} else {
				this.getNormalPullDownData();
			}
		}
	}, {
		key: 'getNormalPullDownData',
		value: function getNormalPullDownData() {
			var _this5 = this;

			var curTime = new Date().valueOf();
			wx.showNavigationBarLoading();
			var params = {
				url: 'auth/normal_user_info',
				isLoading: false,
				params: { openid: this.userInfo.openid },
				scb: function scb(res) {
					if (new Date().valueOf() - curTime > 2000) {
						_this5.normalUserData = res;
						_this5.$apply();
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					} else {
						var delay = parseInt(1000 - (new Date().valueOf() - curTime));
						setTimeout(function () {
							_this5.normalUserData = res;
							_this5.$apply();
							wx.hideNavigationBarLoading();
							wx.stopPullDownRefresh();
						}, parseInt(delay));
					}
				},
				ecb: function ecb(err) {
					if (new Date().valueOf() - curTime > 2000) {
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					} else {
						var delay = parseInt(1000 - (new Date().valueOf() - curTime));
						setTimeout(function () {
							wx.hideNavigationBarLoading();
							wx.stopPullDownRefresh();
						}, delay);
					}
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'getPullDownData',
		value: function getPullDownData() {
			var _this6 = this;

			var curTime = new Date().valueOf();
			wx.showNavigationBarLoading();
			var params = {
				url: 'auth/user_profile',
				isLoading: false,
				params: { openid: this.userInfo.openid },
				scb: function scb(res) {
					if (new Date().valueOf() - curTime > 2000) {
						_this6.userData = res;
						_this6.setActiveTime(_this6.activeTime);
						_this6.$apply();
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					} else {
						var delay = parseInt(1000 - (new Date().valueOf() - curTime));
						setTimeout(function () {
							_this6.userData = res;
							_this6.setActiveTime(_this6.activeTime);
							_this6.$apply();
							wx.hideNavigationBarLoading();
							wx.stopPullDownRefresh();
						}, parseInt(delay));
					}
				},
				ecb: function ecb(err) {
					if (new Date().valueOf() - curTime > 2000) {
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					} else {
						var delay = parseInt(1000 - (new Date().valueOf() - curTime));
						setTimeout(function () {
							wx.hideNavigationBarLoading();
							wx.stopPullDownRefresh();
						}, delay);
					}
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return _tip2.default.share('高额优惠券，速来围观！！！', '', '', '/pages/home/index?request_code=' + userInfo.requestCode);
		}
	}]);

	return Me;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/home/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsImFjdGl2ZVRpbWUiLCJ0aW1lRGF0YSIsImNsaWNrIiwib3JkZXJfbnVtIiwiaW5jb21lcyIsInVzZXJJbmZvIiwiYWdlbnRDb2RlIiwiYXZhdGFyVXJsIiwibmlja05hbWUiLCJub3JtYWxVc2VyRGF0YSIsIm5vdGljZSIsImNvZGUiLCJ1c2VyRGF0YSIsIm1vbmV5IiwiY3VzdG9tZXJfY291bnQiLCJ0aXhpYW4iLCJzcHJlYWRfbW9uZXkiLCJ0b3RhbF9sYXN0bSIsInRvdGFsX20iLCJyZXF1ZXN0X2NvZGUiLCJkYXlfZGV0YWlsIiwid2Vla19kZXRhaWwiLCJ0b3RhbF9kZXRhaWwiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwic2V0QWN0aXZlVGltZSIsImNvbXB1dGVkIiwiYXBwbHlUZXh0IiwibWV0aG9kcyIsImhhbmRsZVRpbWUiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImN1cnJlbnQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJyZWFkVGl4aWFuIiwib3JkZXIiLCJ1c2VyIiwiYWdlbnQiLCJhcHBseUFnZW50IiwiYWxlcnQiLCJ0ZXh0IiwiaGFuZGxlUXJDb2RlIiwiY29uZmlybSIsInRoZW4iLCJyZXMiLCJsb2FkaW5nIiwicGFyYW1zIiwib3BlbmlkIiwic2NlbmUiLCJwYWdlIiwic2NiIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsImxvYWRlZCIsImRlbGV0ZVRlbXBQaWMiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwidGVtcEZpbGVQYXRoIiwiY29tcGxldGUiLCJmYWlsIiwiZXJyb3IiLCJlY2IiLCJnZXQiLCJjYXRjaCIsInZhbHVlIiwiaXNMb2FkaW5nIiwiJGFwcGx5IiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ2V0RGF0YSIsImdldE5vcm1hbERhdGEiLCJnZXRQdWxsRG93bkRhdGEiLCJnZXROb3JtYWxQdWxsRG93bkRhdGEiLCJjdXJUaW1lIiwiRGF0ZSIsInZhbHVlT2YiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiZGVsYXkiLCJwYXJzZUludCIsInNldFRpbWVvdXQiLCJlcnIiLCJzaGFyZSIsInJlcXVlc3RDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsRTs7Ozs7Ozs7Ozs7Ozs7NEtBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQyxvQkFBaUIsU0FKVDtBQUtSQywwQkFBc0I7QUFMZCxHLFFBUVRDLEksR0FBTztBQUNOQyxlQUFXLEdBREw7QUFFTkMsYUFBUztBQUNSQyxXQUFNLENBREU7QUFFUkMsZUFBVSxDQUZGO0FBR1JDLGFBQVE7QUFIQSxJQUZIO0FBT05DLGFBQVU7QUFDVEMsZUFBVSxHQUREO0FBRVRDLGVBQVUsRUFGRDtBQUdUQyxjQUFVO0FBSEQsSUFQSjtBQVlOQyxtQkFBZTtBQUNkQyxZQUFPLEVBRE87QUFFZEMsVUFBSztBQUZTLElBWlQ7QUFnQk5DLGFBQVM7QUFDUkYsWUFBTyxFQURDO0FBRVJHLFdBQU0sQ0FGRTtBQUdSQyxvQkFBZSxDQUhQO0FBSVJDLFlBQU8sQ0FKQztBQUtSQyxrQkFBYSxDQUxMLEVBS1E7QUFDaEJDLGlCQUFZLENBTko7QUFPUkMsYUFBUSxDQVBBO0FBUVJDLGtCQUFhLEVBUkw7QUFTUkMsZ0JBQVc7QUFDVmxCLFlBQU0sQ0FESTtBQUVWQyxnQkFBVSxDQUZBO0FBR1ZDLGNBQVE7QUFIRSxLQVRIO0FBY1JpQixpQkFBWTtBQUNYbkIsWUFB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J3dlcHknXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJ1xuXHRpbXBvcnQge1BVQkxJQ30gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnQnXG5cdGltcG9ydCBIVFRQVXRpbCBmcm9tICcuLi8uLi91dGlscy9IVFRQVXRpbCdcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnLFxuXHRcdFx0YmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuXHRcdFx0bmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGNzcwMUEnLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG5cdFx0XHRlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcblx0XHR9XG5cblx0XHRkYXRhID0ge1xuXHRcdFx0YWN0aXZlVGltZTonMCcsXG5cdFx0XHR0aW1lRGF0YTp7XG5cdFx0XHRcdGNsaWNrOjAsXG5cdFx0XHRcdG9yZGVyX251bTowLFxuXHRcdFx0XHRpbmNvbWVzOjBcblx0XHRcdH0sXG5cdFx0XHR1c2VySW5mbzoge1xuXHRcdFx0XHRhZ2VudENvZGU6JzAnLFxuXHRcdFx0XHRhdmF0YXJVcmw6JycsXG5cdFx0XHRcdG5pY2tOYW1lOiAn5Yqg6L295LitLi4uJ1xuXHRcdFx0fSxcblx0XHRcdG5vcm1hbFVzZXJEYXRhOntcblx0XHRcdFx0bm90aWNlOicnLFxuXHRcdFx0XHRjb2RlOicnLFxuXHRcdFx0fSxcblx0XHRcdHVzZXJEYXRhOntcblx0XHRcdFx0bm90aWNlOicnLFxuXHRcdFx0XHRtb25leTowLFxuXHRcdFx0XHRjdXN0b21lcl9jb3VudDowLFxuXHRcdFx0XHR0aXhpYW46MCxcblx0XHRcdFx0c3ByZWFkX21vbmV5OjAsIC8vIOaOqOW5v21vbmV5XG5cdFx0XHRcdHRvdGFsX2xhc3RtOjAsXG5cdFx0XHRcdHRvdGFsX206MCxcblx0XHRcdFx0cmVxdWVzdF9jb2RlOicnLFxuXHRcdFx0XHRkYXlfZGV0YWlsOntcblx0XHRcdFx0XHRjbGljazowLFxuXHRcdFx0XHRcdG9yZGVyX251bTowLFxuXHRcdFx0XHRcdGluY29tZXM6MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR3ZWVrX2RldGFpbDp7XG5cdFx0XHRcdFx0Y2xpY2s6MCxcblx0XHRcdFx0XHRvcmRlcl9udW06MCxcblx0XHRcdFx0XHRpbmNvbWVzOjBcblx0XHRcdFx0fSxcblx0XHRcdFx0dG90YWxfZGV0YWlsOntcblx0XHRcdFx0XHRjbGljazowLFxuXHRcdFx0XHRcdG9yZGVyX251bTowLFxuXHRcdFx0XHRcdGluY29tZXM6MFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2F0Y2ggPSB7XG5cdFx0XHRhY3RpdmVUaW1lKG5ld1ZhbHVlKXtcblx0XHRcdFx0dGhpcy5zZXRBY3RpdmVUaW1lKG5ld1ZhbHVlKTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGNvbXB1dGVkPXtcblx0XHRcdGFwcGx5VGV4dCgpe1xuXHRcdFx0XHRpZih0aGlzLnVzZXJJbmZvLmFnZW50Q29kZT09JzAnKXtcblx0XHRcdFx0XHRyZXR1cm4gJ+aIkOS4uuWQiOS8meS6uidcblx0XHRcdFx0fWVsc2UgaWYodGhpcy51c2VySW5mby5hZ2VudENvZGU9PScyJyl7XG5cdFx0XHRcdFx0cmV0dXJuICflkIjkvJnkurrnlLPor7fkuK0nO1xuXHRcdFx0XHR9ZWxzZSBpZih0aGlzLnVzZXJJbmZvLmFnZW50Q29kZT09JzEnKXtcblx0XHRcdFx0XHRyZXR1cm4gJ+W3sue7j+aIkOS4uuWQiOS8meS6uic7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICfmiJDkuLrlkIjkvJnkuronO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEFjdGl2ZVRpbWUodmFsdWUpe1xuXHRcdFx0aWYodmFsdWU9PScwJyl7XG5cdFx0XHRcdHRoaXMudGltZURhdGEgPSB0aGlzLnVzZXJEYXRhWydkYXlfZGV0YWlsJ11cblx0XHRcdH1lbHNlIGlmKHZhbHVlPT0nMScpe1xuXHRcdFx0XHR0aGlzLnRpbWVEYXRhID0gdGhpcy51c2VyRGF0YVsnd2Vla19kZXRhaWwnXVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMudGltZURhdGEgPSB0aGlzLnVzZXJEYXRhWyd0b3RhbF9kZXRhaWwnXVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1ldGhvZHMgPSB7XG5cdFx0XHRoYW5kbGVUaW1lKGUpe1xuXHRcdFx0XHR0aGlzLmFjdGl2ZVRpbWUgPSBlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQ7XG5cdFx0XHR9LFxuXHRcdFx0dGl4aWFuKCl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9hZ2VudC90aXhpYW4nfSlcblx0XHRcdH0sXG5cdFx0XHRyZWFkVGl4aWFuKCl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9hZ2VudC9yZWFkX3RpeGlhbid9KVxuXHRcdFx0fSxcblx0XHRcdG9yZGVyKCl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9hZ2VudC9vcmRlcj90eXBlPScrdGhpcy5hY3RpdmVUaW1lfSlcblx0XHRcdH0sXG5cdFx0XHR1c2VyKCl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9hZ2VudC91c2VyJ30pXG5cdFx0XHR9LFxuXHRcdFx0YWdlbnQoKXtcblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7dXJsOiAnL3BhZ2VzL2FnZW50L2FnZW50P3RvdGFsX3Jld2FyZD0nK3RoaXMudXNlckRhdGEuc3ByZWFkX21vbmV5fSlcblx0XHRcdH0sXG5cdFx0XHRhcHBseUFnZW50KCl7XG5cdFx0XHRcdGlmKHRoaXMudXNlckluZm8uYWdlbnRDb2RlPT0nMicpe1xuXHRcdFx0XHRcdHRpcC5hbGVydCh7dGV4dDon5ZCI5LyZ5Lq655Sz6K+35a6h5qC45LitLi4uJ30pO1xuXHRcdFx0XHR9ZWxzZSBpZih0aGlzLnVzZXJJbmZvLmFnZW50Q29kZT09JzAnKXtcblx0XHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHt1cmw6ICcvcGFnZXMvYWdlbnQvc2hvd19hcHBseSd9KVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlUXJDb2RlKCl7XG5cdFx0XHRcdHRpcC5jb25maXJtKHt0ZXh0Oifnoa7lrprlkI7lsIbmiZPlvIDmgqjnmoTkuJPlsZ7lsI/nqIvluo/noIHvvIzor7fplb/mjInkv53lrZjoh7Pnm7jlhozmiJbnm7TmjqXlj5HpgIHnu5nlpb3lj4snfSkudGhlbigocmVzKT0+e1xuXHRcdFx0XHRcdHRpcC5sb2FkaW5nKFwi55Sf5oiQ5LitXCIpO1xuXHRcdFx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdFx0XHR1cmw6ICd1dGlscy9nZXR3eGFjb2RlJyxcblx0XHRcdFx0XHRcdHBhcmFtczoge29wZW5pZDp0aGlzLnVzZXJJbmZvLm9wZW5pZCxzY2VuZTonJyxwYWdlOidwYWdlcy9ob21lL2luZGV4J30sXG5cdFx0XHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IHVybCA9IHJlc1sndXJsJ11cblx0XHRcdFx0XHRcdFx0d3guZG93bmxvYWRGaWxlKHtcblx0XHRcdFx0XHRcdFx0XHR1cmw6IFBVQkxJQyt1cmwsXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0SFRUUFV0aWwuZGVsZXRlVGVtcFBpYyh1cmwpO1xuXHRcdFx0XHRcdFx0XHRcdFx0d3gucHJldmlld0ltYWdlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dXJsczogW3Jlcy50ZW1wRmlsZVBhdGhdICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6KCk9Pntcbi8vXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRpcC5zdWNjZXNzKCdjb21wbGV0ZScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRmYWlsOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXAuZXJyb3IoJ+iOt+WPluWksei0pScpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGVjYjoocmVzKT0+e1xuXHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdFx0XHR9KS5jYXRjaCgocmVzKT0+e30pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0RGF0YSgpe1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYXV0aC91c2VyX3Byb2ZpbGUnLFxuXHRcdFx0XHRwYXJhbXM6IHtvcGVuaWQ6dGhpcy51c2VySW5mby5vcGVuaWR9LFxuXHRcdFx0XHRpc0xvYWRpbmc6ZmFsc2UsXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMudXNlckRhdGEgPSByZXM7XG5cdFx0XHRcdFx0dGhpcy5zZXRBY3RpdmVUaW1lKHRoaXMuYWN0aXZlVGltZSk7XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblxuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0Z2V0Tm9ybWFsRGF0YSgpe1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYXV0aC9ub3JtYWxfdXNlcl9pbmZvJyxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOnRoaXMudXNlckluZm8ub3BlbmlkfSxcblx0XHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLm5vcm1hbFVzZXJEYXRhID0gcmVzO1xuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cblx0XHRcdFx0fSxcblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblxuXG5cblx0XHRvblNob3coKXtcblx0XHRcdHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdGlmKHRoaXMudXNlckluZm8uYWdlbnRDb2RlPT0nMScpe1xuXHRcdFx0XHR0aGlzLmdldERhdGEoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmdldE5vcm1hbERhdGEoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvblB1bGxEb3duUmVmcmVzaCgpe1xuXHRcdFx0aWYodGhpcy51c2VySW5mby5hZ2VudENvZGU9PScxJyl7XG5cdFx0XHRcdHRoaXMuZ2V0UHVsbERvd25EYXRhKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5nZXROb3JtYWxQdWxsRG93bkRhdGEoKTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGdldE5vcm1hbFB1bGxEb3duRGF0YSgpe1xuXHRcdFx0bGV0IGN1clRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xuXHRcdFx0d3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvbm9ybWFsX3VzZXJfaW5mbycsXG5cdFx0XHRcdGlzTG9hZGluZzpmYWxzZSxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOnRoaXMudXNlckluZm8ub3BlbmlkfSxcblx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0aWYoKG5ldyBEYXRlKCkpLnZhbHVlT2YoKS1jdXJUaW1lPjIwMDApe1xuXHRcdFx0XHRcdFx0dGhpcy5ub3JtYWxVc2VyRGF0YSA9IHJlcztcblx0XHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdFx0XHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuXHRcdFx0XHRcdFx0d3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRsZXQgZGVsYXkgPSBwYXJzZUludCgxMDAwLSgobmV3IERhdGUoKSkudmFsdWVPZigpLWN1clRpbWUpKTtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHRcdFx0dGhpcy5ub3JtYWxVc2VyRGF0YSA9IHJlcztcblx0XHRcdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdFx0XHRcdFx0d3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG5cdFx0XHRcdFx0XHR9LHBhcnNlSW50KGRlbGF5KSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSxcblx0XHRcdFx0ZWNiOihlcnIpPT57XG5cdFx0XHRcdFx0aWYoKG5ldyBEYXRlKCkpLnZhbHVlT2YoKS1jdXJUaW1lPjIwMDApe1xuXHRcdFx0XHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdFx0XHRcdHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0bGV0IGRlbGF5ID0gcGFyc2VJbnQoMTAwMC0oKG5ldyBEYXRlKCkpLnZhbHVlT2YoKS1jdXJUaW1lKSk7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdFx0XHRcdHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG5cdFx0XHRcdFx0XHRcdHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuXHRcdFx0XHRcdFx0fSxkZWxheSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblxuXHRcdGdldFB1bGxEb3duRGF0YSgpe1xuXHRcdFx0bGV0IGN1clRpbWUgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xuXHRcdFx0d3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvdXNlcl9wcm9maWxlJyxcblx0XHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtvcGVuaWQ6dGhpcy51c2VySW5mby5vcGVuaWR9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHRpZigobmV3IERhdGUoKSkudmFsdWVPZigpLWN1clRpbWU+MjAwMCl7XG5cdFx0XHRcdFx0XHR0aGlzLnVzZXJEYXRhID0gcmVzO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRBY3RpdmVUaW1lKHRoaXMuYWN0aXZlVGltZSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdFx0XHRcdHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0bGV0IGRlbGF5ID0gcGFyc2VJbnQoMTAwMC0oKG5ldyBEYXRlKCkpLnZhbHVlT2YoKS1jdXJUaW1lKSk7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdFx0XHRcdHRoaXMudXNlckRhdGEgPSByZXM7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0QWN0aXZlVGltZSh0aGlzLmFjdGl2ZVRpbWUpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0XHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuXHRcdFx0XHRcdFx0XHR3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcblx0XHRcdFx0XHRcdH0scGFyc2VJbnQoZGVsYXkpKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pntcblx0XHRcdFx0XHRpZigobmV3IERhdGUoKSkudmFsdWVPZigpLWN1clRpbWU+MjAwMCl7XG5cdFx0XHRcdFx0XHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuXHRcdFx0XHRcdFx0d3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRsZXQgZGVsYXkgPSBwYXJzZUludCgxMDAwLSgobmV3IERhdGUoKSkudmFsdWVPZigpLWN1clRpbWUpKTtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdFx0XHRcdFx0d3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG5cdFx0XHRcdFx0XHR9LGRlbGF5KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0b25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdHJldHVybiB0aXAuc2hhcmUoJ+mrmOmineS8mOaDoOWIuO+8jOmAn+adpeWbtOingu+8ge+8ge+8gScsJycsJycsJy9wYWdlcy9ob21lL2luZGV4P3JlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKTtcblx0XHR9XG5cblx0fVxuIl19