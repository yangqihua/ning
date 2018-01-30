'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _HTTPUtil = require('./../utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _constant = require('./../utils/constant.js');

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _common = require('./../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodsDetails = function (_wepy$page) {
	_inherits(GoodsDetails, _wepy$page);

	function GoodsDetails() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, GoodsDetails);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsDetails.__proto__ || Object.getPrototypeOf(GoodsDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '商品详情',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#FFFFFF',
			navigationBarTextStyle: 'black',
			backgroundColor: '#fefefe'
		}, _this.mixins = [_common2.default], _this.data = {
			hadCopy: false,
			id: '10419',
			iid: '0',
			goodsDetails: {
				iid: '',
				name: '',
				pic: '',
				price: '',
				sales: '',
				rate: '',
				coupon_price: '',
				coupon_link: '',
				is_tmall: '',
				cid: '',
				s_price: '',
				commission: ''
			}
		}, _this.methods = {
			generate: function generate() {
				var _this2 = this;

				_tip2.default.confirm({ text: "生成的图文包含小程序二维码，请长按保存至相册或直接发送给好友" }).then(function (payload) {
					_tip2.default.loading("生成中");
					var userInfo = _this2.$parent.getUserInfo();
					var params = {
						url: 'utils/handle_share_pic',
						params: {
							openid: userInfo.openid,
							page: 'pages/goods_details',
							id: _this2.id,
							iid: _this2.iid,
							pic: _this2.goodsDetails.pic,
							title: _this2.goodsDetails.name,
							s_price: _this2.goodsDetails.s_price,
							price: _this2.goodsDetails.price,
							coupon_price: _this2.goodsDetails.coupon_price
						},
						scb: function scb(res) {
							console.log('res:', res);
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
				}).catch(function () {});
			},
			copyCode: function copyCode() {
				if (this.hadCopy) {
					_tip2.default.confirm({ text: '口令复制成功', cancelText: '看看教程', confirmText: '我知道了' }).then(function (res) {}).catch(function (res) {
						wx.navigateTo({ url: '/pages/help/jiaocheng' });
					});
					return;
				}
				this.getTKL();
			}
		}, _this.computed = {
			isAgent: function isAgent() {
				var userInfo = this.$parent.getUserInfo();
				return userInfo.agentCode == '1';
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(GoodsDetails, [{
		key: 'getGoodsDetails',
		value: function getGoodsDetails(id, iid) {
			var _this3 = this;

			var userInfo = this.$parent.getUserInfo();
			var params = {
				url: 'agent/new_goods_details',
				isLoading: false,
				params: { id: id, iid: iid, openid: userInfo.openid },
				scb: function scb(res) {
					_this3.goodsDetails = res;
					_this3.$apply();
					wx.setNavigationBarTitle({ title: res.name });
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			if (options.hasOwnProperty('id') && options.hasOwnProperty('iid')) {
				this.id = options['id'];
				this.iid = options['iid'];
			} else {
				var scene = decodeURIComponent(options['scene']);
				if (scene.indexOf('_') > -1) {
					var arr = scene.split('_');
					if (arr.length != 3) {
						_tip2.default.error('二维码参数有误！');
					}
					var requestCode = arr[0];
					this.id = arr[1];
					this.iid = arr[2];
					if (this.$parent.globalData.isWxCode) {
						this.$parent.checkLogin(requestCode);
					}
				} else {
					_tip2.default.error('错误:' + scene);
				}
			}
			this.getGoodsDetails(this.id, this.iid);
		}
	}, {
		key: 'onUnload',
		value: function onUnload() {
			this.hadCopy = false;
		}
	}, {
		key: 'getTKL',
		value: function getTKL() {
			var _this4 = this;

			_tip2.default.loading();
			var userInfo = this.$parent.getUserInfo();
			var params = {
				url: 'agent/get_tkl',
				isLoading: false,
				params: { openid: userInfo.openid, iid: this.goodsDetails.iid, title: this.goodsDetails.name, pic: this.goodsDetails.pic, coupon_link: this.goodsDetails.coupon_link },
				scb: function scb(res) {
					wx.setClipboardData({
						data: res,
						success: function success(res) {
							_tip2.default.loaded();
							_this4.hadCopy = true;
							_this4.$apply();
							_tip2.default.confirm({ text: '口令复制成功', cancelText: '看看教程', confirmText: '我知道了' }).then(function (res) {}).catch(function (res) {
								wx.navigateTo({ url: '/pages/help/jiaocheng' });
							});
						}
					});
				},
				ecb: function ecb(err) {
					console.log('err:', err);
					_tip2.default.error(err);
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return _tip2.default.share(this.goodsDetails.name, this.goodsDetails.content, this.goodsDetails.pic, '/pages/goods_details?id=' + this.id + '&iid=' + this.iid + '&request_code=' + userInfo.requestCode);
		}
	}]);

	return GoodsDetails;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(GoodsDetails , 'pages/goods_details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzX2RldGFpbHMuanMiXSwibmFtZXMiOlsiR29vZHNEZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1peGlucyIsImRhdGEiLCJoYWRDb3B5IiwiaWQiLCJpaWQiLCJnb29kc0RldGFpbHMiLCJuYW1lIiwicGljIiwicHJpY2UiLCJzYWxlcyIsInJhdGUiLCJjb3Vwb25fcHJpY2UiLCJjb3Vwb25fbGluayIsImlzX3RtYWxsIiwiY2lkIiwic19wcmljZSIsImNvbW1pc3Npb24iLCJtZXRob2RzIiwiZ2VuZXJhdGUiLCJjb25maXJtIiwidGV4dCIsInRoZW4iLCJwYXlsb2FkIiwibG9hZGluZyIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwicGFnZSIsInRpdGxlIiwic2NiIiwicmVzIiwiY29uc29sZSIsImxvZyIsInd4IiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsImxvYWRlZCIsImRlbGV0ZVRlbXBQaWMiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwidGVtcEZpbGVQYXRoIiwiY29tcGxldGUiLCJmYWlsIiwiZXJyb3IiLCJlY2IiLCJnZXQiLCJjYXRjaCIsImNvcHlDb2RlIiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0IiwibmF2aWdhdGVUbyIsImdldFRLTCIsImNvbXB1dGVkIiwiaXNBZ2VudCIsImFnZW50Q29kZSIsImlzTG9hZGluZyIsIiRhcHBseSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsIm9wdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiaW5kZXhPZiIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwicmVxdWVzdENvZGUiLCJnbG9iYWxEYXRhIiwiaXNXeENvZGUiLCJjaGVja0xvZ2luIiwiZ2V0R29vZHNEZXRhaWxzIiwic2V0Q2xpcGJvYXJkRGF0YSIsImVyciIsInNoYXJlIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7Z01BQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQywyQkFBd0IsT0FKaEI7QUFLUkMsb0JBQWlCO0FBTFQsRyxRQU9UQyxNLEdBQVMsa0IsUUFDVEMsSSxHQUFPO0FBQ05DLFlBQVEsS0FERjtBQUVOQyxPQUFHLE9BRkc7QUFHTkMsUUFBSSxHQUhFO0FBSU5DLGlCQUFhO0FBQ1pELFNBQUssRUFETztBQUVaRSxVQUFNLEVBRk07QUFHWkMsU0FBSyxFQUhPO0FBSVpDLFdBQU8sRUFKSztBQUtaQyxXQUFPLEVBTEs7QUFNWkMsVUFBTSxFQU5NO0FBT1pDLGtCQUFjLEVBUEY7QUFRWkMsaUJBQVksRUFSQTtBQVNaQyxjQUFVLEVBVEU7QUFVWkMsU0FBSyxFQVZPO0FBV1pDLGFBQVMsRUFYRztBQVlaQyxnQkFBWTtBQVpBO0FBSlAsRyxRQTJEUEMsTyxHQUFVO0FBQ1RDLFdBRFMsc0JBQ0M7QUFBQTs7QUFDVCxrQkFBSUMsT0FBSixDQUFZLEVBQUNDLE1BQUssZ0NBQU4sRUFBWixFQUFxREMsSUFBckQsQ0FBMEQsVUFBQ0MsT0FBRCxFQUFXO0FBQ3BFLG1CQUFJQyxPQUFKLENBQVksS0FBWjtBQUNBLFNBQUlDLFdBQVcsT0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxTQUFJQyxTQUFTO0FBQ1pDLFdBQUssd0JBRE87QUFFWkQsY0FBUTtBQUNQRSxlQUFPTCxTQUFTSyxNQURUO0FBRVBDLGFBQUsscUJBRkU7QUFHUDNCLFdBQUcsT0FBS0EsRUFIRDtBQUlQQyxZQUFJLE9BQUtB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J1xuXHRpbXBvcnQgSFRUUFV0aWwgZnJvbSAnLi4vdXRpbHMvSFRUUFV0aWwnXG5cdGltcG9ydCB7UFVCTElDfSBmcm9tICcuLi91dGlscy9jb25zdGFudCdcblx0aW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5cdGltcG9ydCBjb21tb25NaXhpbnMgZnJvbSAnLi4vbWl4aW5zL2NvbW1vbidcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZHNEZXRhaWxzIGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJyxcblx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcblx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcblx0XHRcdG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmZWZlJ1xuXHRcdH1cblx0XHRtaXhpbnMgPSBbY29tbW9uTWl4aW5zXTtcblx0XHRkYXRhID0ge1xuXHRcdFx0aGFkQ29weTpmYWxzZSxcblx0XHRcdGlkOicxMDQxOScsXG5cdFx0XHRpaWQ6JzAnLFxuXHRcdFx0Z29vZHNEZXRhaWxzOntcblx0XHRcdFx0aWlkOiAnJyxcblx0XHRcdFx0bmFtZTogJycsXG5cdFx0XHRcdHBpYzogJycsXG5cdFx0XHRcdHByaWNlOiAnJyxcblx0XHRcdFx0c2FsZXM6ICcnLFxuXHRcdFx0XHRyYXRlOiAnJyxcblx0XHRcdFx0Y291cG9uX3ByaWNlOiAnJyxcblx0XHRcdFx0Y291cG9uX2xpbms6JycsXG5cdFx0XHRcdGlzX3RtYWxsOiAnJyxcblx0XHRcdFx0Y2lkOiAnJyxcblx0XHRcdFx0c19wcmljZTogJycsXG5cdFx0XHRcdGNvbW1pc3Npb246ICcnXG5cdFx0XHR9LFxuXHRcdH1cblx0XHRnZXRHb29kc0RldGFpbHMoaWQsaWlkKXtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYWdlbnQvbmV3X2dvb2RzX2RldGFpbHMnLFxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtpZDppZCxpaWQ6aWlkLG9wZW5pZDp1c2VySW5mby5vcGVuaWR9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLmdvb2RzRGV0YWlscyA9IHJlcztcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7dGl0bGU6IHJlcy5uYW1lfSlcblx0XHRcdFx0fSxcblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0aWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSAmJiBvcHRpb25zLmhhc093blByb3BlcnR5KCdpaWQnKSl7XG5cdFx0XHRcdHRoaXMuaWQgPSBvcHRpb25zWydpZCddO1xuXHRcdFx0XHR0aGlzLmlpZCA9IG9wdGlvbnNbJ2lpZCddO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBzY2VuZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zWydzY2VuZSddKTtcblx0XHRcdFx0aWYoc2NlbmUuaW5kZXhPZignXycpPi0xKXtcblx0XHRcdFx0XHRsZXQgYXJyID0gc2NlbmUuc3BsaXQoJ18nKTtcblx0XHRcdFx0XHRpZihhcnIubGVuZ3RoIT0zKXtcblx0XHRcdFx0XHRcdHRpcC5lcnJvcign5LqM57u056CB5Y+C5pWw5pyJ6K+v77yBJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxldCByZXF1ZXN0Q29kZSA9IGFyclswXTtcblx0XHRcdFx0XHR0aGlzLmlkID0gYXJyWzFdO1xuXHRcdFx0XHRcdHRoaXMuaWlkID0gYXJyWzJdO1xuXHRcdFx0XHRcdGlmKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzV3hDb2RlKXtcblx0XHRcdFx0XHRcdHRoaXMuJHBhcmVudC5jaGVja0xvZ2luKHJlcXVlc3RDb2RlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRpcC5lcnJvcign6ZSZ6K+vOicrc2NlbmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldEdvb2RzRGV0YWlscyh0aGlzLmlkLHRoaXMuaWlkKTtcblx0XHR9XG5cdFx0b25VbmxvYWQoKXtcblx0XHRcdHRoaXMuaGFkQ29weT1mYWxzZTtcblx0XHR9XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdGdlbmVyYXRlKCl7XG5cdFx0XHRcdHRpcC5jb25maXJtKHt0ZXh0Olwi55Sf5oiQ55qE5Zu+5paH5YyF5ZCr5bCP56iL5bqP5LqM57u056CB77yM6K+36ZW/5oyJ5L+d5a2Y6Iez55u45YaM5oiW55u05o6l5Y+R6YCB57uZ5aW95Y+LXCJ9KS50aGVuKChwYXlsb2FkKT0+e1xuXHRcdFx0XHRcdHRpcC5sb2FkaW5nKFwi55Sf5oiQ5LitXCIpO1xuXHRcdFx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdFx0XHR1cmw6ICd1dGlscy9oYW5kbGVfc2hhcmVfcGljJyxcblx0XHRcdFx0XHRcdHBhcmFtczoge1xuXHRcdFx0XHRcdFx0XHRvcGVuaWQ6dXNlckluZm8ub3BlbmlkLFxuXHRcdFx0XHRcdFx0XHRwYWdlOidwYWdlcy9nb29kc19kZXRhaWxzJyxcblx0XHRcdFx0XHRcdFx0aWQ6dGhpcy5pZCxcblx0XHRcdFx0XHRcdFx0aWlkOnRoaXMuaWlkLFxuXHRcdFx0XHRcdFx0XHRwaWM6dGhpcy5nb29kc0RldGFpbHMucGljLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTp0aGlzLmdvb2RzRGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdFx0XHRzX3ByaWNlOnRoaXMuZ29vZHNEZXRhaWxzLnNfcHJpY2UsXG5cdFx0XHRcdFx0XHRcdHByaWNlOnRoaXMuZ29vZHNEZXRhaWxzLnByaWNlLFxuXHRcdFx0XHRcdFx0XHRjb3Vwb25fcHJpY2U6dGhpcy5nb29kc0RldGFpbHMuY291cG9uX3ByaWNlLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygncmVzOicscmVzKTtcblx0XHRcdFx0XHRcdFx0bGV0IHVybCA9IHJlc1sndXJsJ11cblx0XHRcdFx0XHRcdFx0d3guZG93bmxvYWRGaWxlKHtcblx0XHRcdFx0XHRcdFx0XHR1cmw6IFBVQkxJQyt1cmwsXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0SFRUUFV0aWwuZGVsZXRlVGVtcFBpYyh1cmwpO1xuXHRcdFx0XHRcdFx0XHRcdFx0d3gucHJldmlld0ltYWdlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dXJsczogW3Jlcy50ZW1wRmlsZVBhdGhdICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6KCk9Pntcbi8vXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRpcC5zdWNjZXNzKCdjb21wbGV0ZScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRmYWlsOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXAuZXJyb3IoJ+iOt+WPluWksei0pScpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGVjYjoocmVzKT0+e1xuXHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdFx0XHR9KS5jYXRjaCgoKT0+e30pO1xuXHRcdFx0fSxcblx0XHRcdGNvcHlDb2RlKCl7XG5cdFx0XHRcdGlmKHRoaXMuaGFkQ29weSl7XG5cdFx0XHRcdFx0dGlwLmNvbmZpcm0oe3RleHQ6J+WPo+S7pOWkjeWItuaIkOWKnycsY2FuY2VsVGV4dDon55yL55yL5pWZ56iLJyxjb25maXJtVGV4dDon5oiR55+l6YGT5LqGJ30pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0XHR9KS5jYXRjaCgocmVzKT0+e1xuXHRcdFx0XHRcdFx0d3gubmF2aWdhdGVUbyh7dXJsOiAnL3BhZ2VzL2hlbHAvamlhb2NoZW5nJ30pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZ2V0VEtMKCk7XG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdGNvbXB1dGVkPXtcblx0XHRcdGlzQWdlbnQoKXtcblx0XHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRcdHJldHVybiB1c2VySW5mby5hZ2VudENvZGU9PScxJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXRUS0woKXtcblx0XHRcdHRpcC5sb2FkaW5nKCk7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2FnZW50L2dldF90a2wnLFxuXHRcdFx0XHRpc0xvYWRpbmc6ZmFsc2UsXG5cdFx0XHRcdHBhcmFtczoge29wZW5pZDp1c2VySW5mby5vcGVuaWQsaWlkOnRoaXMuZ29vZHNEZXRhaWxzLmlpZCx0aXRsZTp0aGlzLmdvb2RzRGV0YWlscy5uYW1lLHBpYzp0aGlzLmdvb2RzRGV0YWlscy5waWMsY291cG9uX2xpbms6dGhpcy5nb29kc0RldGFpbHMuY291cG9uX2xpbmt9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR3eC5zZXRDbGlwYm9hcmREYXRhKHtcblx0XHRcdFx0XHRcdGRhdGE6IHJlcyxcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT57XG5cdFx0XHRcdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5oYWRDb3B5ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHRcdFx0dGlwLmNvbmZpcm0oe3RleHQ6J+WPo+S7pOWkjeWItuaIkOWKnycsY2FuY2VsVGV4dDon55yL55yL5pWZ56iLJyxjb25maXJtVGV4dDon5oiR55+l6YGT5LqGJ30pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goKHJlcyk9Pntcblx0XHRcdFx0XHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHt1cmw6ICcvcGFnZXMvaGVscC9qaWFvY2hlbmcnfSk7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSxcblx0XHRcdFx0ZWNiOihlcnIpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2VycjonLGVycik7XG5cdFx0XHRcdFx0dGlwLmVycm9yKGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXHRcdG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRyZXR1cm4gdGlwLnNoYXJlKHRoaXMuZ29vZHNEZXRhaWxzLm5hbWUsdGhpcy5nb29kc0RldGFpbHMuY29udGVudCx0aGlzLmdvb2RzRGV0YWlscy5waWMsJy9wYWdlcy9nb29kc19kZXRhaWxzP2lkPScrdGhpcy5pZCsnJmlpZD0nK3RoaXMuaWlkKycmcmVxdWVzdF9jb2RlPScrdXNlckluZm8ucmVxdWVzdENvZGUpXG5cdFx0fVxuXHR9XG4iXX0=