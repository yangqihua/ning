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
					_tip2.default.confirm({ text: '淘口令复制成功，打开手机淘宝下单即可', cancelText: '看看教程', confirmText: '我知道了' }).then(function (res) {}).catch(function (res) {
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
							_tip2.default.confirm({ text: '淘口令复制成功，打开手机淘宝下单即可', cancelText: '看看教程', confirmText: '我知道了' }).then(function (res) {}).catch(function (res) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzX2RldGFpbHMuanMiXSwibmFtZXMiOlsiR29vZHNEZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1peGlucyIsImRhdGEiLCJoYWRDb3B5IiwiaWQiLCJpaWQiLCJnb29kc0RldGFpbHMiLCJuYW1lIiwicGljIiwicHJpY2UiLCJzYWxlcyIsInJhdGUiLCJjb3Vwb25fcHJpY2UiLCJjb3Vwb25fbGluayIsImlzX3RtYWxsIiwiY2lkIiwic19wcmljZSIsImNvbW1pc3Npb24iLCJtZXRob2RzIiwiZ2VuZXJhdGUiLCJjb25maXJtIiwidGV4dCIsInRoZW4iLCJwYXlsb2FkIiwibG9hZGluZyIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwicGFnZSIsInRpdGxlIiwic2NiIiwicmVzIiwiY29uc29sZSIsImxvZyIsInd4IiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsImxvYWRlZCIsImRlbGV0ZVRlbXBQaWMiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwidGVtcEZpbGVQYXRoIiwiY29tcGxldGUiLCJmYWlsIiwiZXJyb3IiLCJlY2IiLCJnZXQiLCJjYXRjaCIsImNvcHlDb2RlIiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0IiwibmF2aWdhdGVUbyIsImdldFRLTCIsImNvbXB1dGVkIiwiaXNBZ2VudCIsImFnZW50Q29kZSIsImlzTG9hZGluZyIsIiRhcHBseSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsIm9wdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiaW5kZXhPZiIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwicmVxdWVzdENvZGUiLCJnbG9iYWxEYXRhIiwiaXNXeENvZGUiLCJjaGVja0xvZ2luIiwiZ2V0R29vZHNEZXRhaWxzIiwic2V0Q2xpcGJvYXJkRGF0YSIsImVyciIsInNoYXJlIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7Z01BQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQywyQkFBd0IsT0FKaEI7QUFLUkMsb0JBQWlCO0FBTFQsRyxRQU9UQyxNLEdBQVMsa0IsUUFDVEMsSSxHQUFPO0FBQ05DLFlBQVEsS0FERjtBQUVOQyxPQUFHLE9BRkc7QUFHTkMsUUFBSSxHQUhFO0FBSU5DLGlCQUFhO0FBQ1pELFNBQUssRUFETztBQUVaRSxVQUFNLEVBRk07QUFHWkMsU0FBSyxFQUhPO0FBSVpDLFdBQU8sRUFKSztBQUtaQyxXQUFPLEVBTEs7QUFNWkMsVUFBTSxFQU5NO0FBT1pDLGtCQUFjLEVBUEY7QUFRWkMsaUJBQVksRUFSQTtBQVNaQyxjQUFVLEVBVEU7QUFVWkMsU0FBSyxFQVZPO0FBV1pDLGFBQVMsRUFYRztBQVlaQyxnQkFBWTtBQVpBO0FBSlAsRyxRQTJEUEMsTyxHQUFVO0FBQ1RDLFdBRFMsc0JBQ0M7QUFBQTs7QUFDVCxrQkFBSUMsT0FBSixDQUFZLEVBQUNDLE1BQUssZ0NBQU4sRUFBWixFQUFxREMsSUFBckQsQ0FBMEQsVUFBQ0MsT0FBRCxFQUFXO0FBQ3BFLG1CQUFJQyxPQUFKLENBQVksS0FBWjtBQUNBLFNBQUlDLFdBQVcsT0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxTQUFJQyxTQUFTO0FBQ1pDLFdBQUssd0JBRE87QUFFWkQsY0FBUTtBQUNQRSxlQUFPTCxTQUFTSyxNQURUO0FBRVBDLGFBQUsscUJBRkU7QUFHUDNCLFdBQUcsT0FBS0EsRUFIRDtBQUlQQyxZQUFJLE9BQUtB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d2VweSdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQge1BVQkxJQ30gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuXHRpbXBvcnQgY29tbW9uTWl4aW5zIGZyb20gJy4uL21peGlucy9jb21tb24nXG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzRGV0YWlscyBleHRlbmRzIHdlcHkucGFnZSB7XG5cdFx0Y29uZmlnID0ge1xuXHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhScsXG5cdFx0XHRiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG5cdFx0XHRuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2ZlZmVmZSdcblx0XHR9XG5cdFx0bWl4aW5zID0gW2NvbW1vbk1peGluc107XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGhhZENvcHk6ZmFsc2UsXG5cdFx0XHRpZDonMTA0MTknLFxuXHRcdFx0aWlkOicwJyxcblx0XHRcdGdvb2RzRGV0YWlsczp7XG5cdFx0XHRcdGlpZDogJycsXG5cdFx0XHRcdG5hbWU6ICcnLFxuXHRcdFx0XHRwaWM6ICcnLFxuXHRcdFx0XHRwcmljZTogJycsXG5cdFx0XHRcdHNhbGVzOiAnJyxcblx0XHRcdFx0cmF0ZTogJycsXG5cdFx0XHRcdGNvdXBvbl9wcmljZTogJycsXG5cdFx0XHRcdGNvdXBvbl9saW5rOicnLFxuXHRcdFx0XHRpc190bWFsbDogJycsXG5cdFx0XHRcdGNpZDogJycsXG5cdFx0XHRcdHNfcHJpY2U6ICcnLFxuXHRcdFx0XHRjb21taXNzaW9uOiAnJ1xuXHRcdFx0fSxcblx0XHR9XG5cdFx0Z2V0R29vZHNEZXRhaWxzKGlkLGlpZCl7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdHVybDogJ2FnZW50L25ld19nb29kc19kZXRhaWxzJyxcblx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0cGFyYW1zOiB7aWQ6aWQsaWlkOmlpZCxvcGVuaWQ6dXNlckluZm8ub3BlbmlkfSxcblx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5nb29kc0RldGFpbHMgPSByZXM7XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdFx0XHR3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe3RpdGxlOiByZXMubmFtZX0pXG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cdFx0b25Mb2FkKG9wdGlvbnMpIHtcblx0XHRcdGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2lkJykgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaWlkJykpe1xuXHRcdFx0XHR0aGlzLmlkID0gb3B0aW9uc1snaWQnXTtcblx0XHRcdFx0dGhpcy5paWQgPSBvcHRpb25zWydpaWQnXTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRsZXQgc2NlbmUgPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9uc1snc2NlbmUnXSk7XG5cdFx0XHRcdGlmKHNjZW5lLmluZGV4T2YoJ18nKT4tMSl7XG5cdFx0XHRcdFx0bGV0IGFyciA9IHNjZW5lLnNwbGl0KCdfJyk7XG5cdFx0XHRcdFx0aWYoYXJyLmxlbmd0aCE9Myl7XG5cdFx0XHRcdFx0XHR0aXAuZXJyb3IoJ+S6jOe7tOeggeWPguaVsOacieivr++8gScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsZXQgcmVxdWVzdENvZGUgPSBhcnJbMF07XG5cdFx0XHRcdFx0dGhpcy5pZCA9IGFyclsxXTtcblx0XHRcdFx0XHR0aGlzLmlpZCA9IGFyclsyXTtcblx0XHRcdFx0XHRpZih0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc1d4Q29kZSl7XG5cdFx0XHRcdFx0XHR0aGlzLiRwYXJlbnQuY2hlY2tMb2dpbihyZXF1ZXN0Q29kZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0aXAuZXJyb3IoJ+mUmeivrzonK3NjZW5lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5nZXRHb29kc0RldGFpbHModGhpcy5pZCx0aGlzLmlpZCk7XG5cdFx0fVxuXHRcdG9uVW5sb2FkKCl7XG5cdFx0XHR0aGlzLmhhZENvcHk9ZmFsc2U7XG5cdFx0fVxuXHRcdG1ldGhvZHMgPSB7XG5cdFx0XHRnZW5lcmF0ZSgpe1xuXHRcdFx0XHR0aXAuY29uZmlybSh7dGV4dDpcIueUn+aIkOeahOWbvuaWh+WMheWQq+Wwj+eoi+W6j+S6jOe7tOegge+8jOivt+mVv+aMieS/neWtmOiHs+ebuOWGjOaIluebtOaOpeWPkemAgee7meWlveWPi1wifSkudGhlbigocGF5bG9hZCk9Pntcblx0XHRcdFx0XHR0aXAubG9hZGluZyhcIueUn+aIkOS4rVwiKTtcblx0XHRcdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAndXRpbHMvaGFuZGxlX3NoYXJlX3BpYycsXG5cdFx0XHRcdFx0XHRwYXJhbXM6IHtcblx0XHRcdFx0XHRcdFx0b3BlbmlkOnVzZXJJbmZvLm9wZW5pZCxcblx0XHRcdFx0XHRcdFx0cGFnZToncGFnZXMvZ29vZHNfZGV0YWlscycsXG5cdFx0XHRcdFx0XHRcdGlkOnRoaXMuaWQsXG5cdFx0XHRcdFx0XHRcdGlpZDp0aGlzLmlpZCxcblx0XHRcdFx0XHRcdFx0cGljOnRoaXMuZ29vZHNEZXRhaWxzLnBpYyxcblx0XHRcdFx0XHRcdFx0dGl0bGU6dGhpcy5nb29kc0RldGFpbHMubmFtZSxcblx0XHRcdFx0XHRcdFx0c19wcmljZTp0aGlzLmdvb2RzRGV0YWlscy5zX3ByaWNlLFxuXHRcdFx0XHRcdFx0XHRwcmljZTp0aGlzLmdvb2RzRGV0YWlscy5wcmljZSxcblx0XHRcdFx0XHRcdFx0Y291cG9uX3ByaWNlOnRoaXMuZ29vZHNEZXRhaWxzLmNvdXBvbl9wcmljZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3JlczonLHJlcyk7XG5cdFx0XHRcdFx0XHRcdGxldCB1cmwgPSByZXNbJ3VybCddXG5cdFx0XHRcdFx0XHRcdHd4LmRvd25sb2FkRmlsZSh7XG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBQVUJMSUMrdXJsLFxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdEhUVFBVdGlsLmRlbGV0ZVRlbXBQaWModXJsKTtcblx0XHRcdFx0XHRcdFx0XHRcdHd4LnByZXZpZXdJbWFnZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVybHM6IFtyZXMudGVtcEZpbGVQYXRoXSAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlOigpPT57XG4vL1x0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXAuc3VjY2VzcygnY29tcGxldGUnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0ZmFpbDpmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGlwLmVycm9yKCfojrflj5blpLHotKUnKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRlY2I6KHJlcyk9Pntcblx0XHRcdFx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHRcdFx0fSkuY2F0Y2goKCk9Pnt9KTtcblx0XHRcdH0sXG5cdFx0XHRjb3B5Q29kZSgpe1xuXHRcdFx0XHRpZih0aGlzLmhhZENvcHkpe1xuXHRcdFx0XHRcdHRpcC5jb25maXJtKHt0ZXh0Oifmt5jlj6Pku6TlpI3liLbmiJDlip/vvIzmiZPlvIDmiYvmnLrmt5jlrp3kuIvljZXljbPlj68nLGNhbmNlbFRleHQ6J+eci+eci+aVmeeoiycsY29uZmlybVRleHQ6J+aIkeefpemBk+S6hid9KS50aGVuKChyZXMpPT57XG5cdFx0XHRcdFx0fSkuY2F0Y2goKHJlcyk9Pntcblx0XHRcdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9oZWxwL2ppYW9jaGVuZyd9KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmdldFRLTCgpO1xuXHRcdFx0fSxcblx0XHR9XG5cblx0XHRjb21wdXRlZD17XG5cdFx0XHRpc0FnZW50KCl7XG5cdFx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0XHRyZXR1cm4gdXNlckluZm8uYWdlbnRDb2RlPT0nMSc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0VEtMKCl7XG5cdFx0XHR0aXAubG9hZGluZygpO1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHR1cmw6ICdhZ2VudC9nZXRfdGtsJyxcblx0XHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtvcGVuaWQ6dXNlckluZm8ub3BlbmlkLGlpZDp0aGlzLmdvb2RzRGV0YWlscy5paWQsdGl0bGU6dGhpcy5nb29kc0RldGFpbHMubmFtZSxwaWM6dGhpcy5nb29kc0RldGFpbHMucGljLGNvdXBvbl9saW5rOnRoaXMuZ29vZHNEZXRhaWxzLmNvdXBvbl9saW5rfSxcblx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0d3guc2V0Q2xpcGJvYXJkRGF0YSh7XG5cdFx0XHRcdFx0XHRkYXRhOiByZXMsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiAocmVzKT0+e1xuXHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaGFkQ29weSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdFx0XHRcdHRpcC5jb25maXJtKHt0ZXh0Oifmt5jlj6Pku6TlpI3liLbmiJDlip/vvIzmiZPlvIDmiYvmnLrmt5jlrp3kuIvljZXljbPlj68nLGNhbmNlbFRleHQ6J+eci+eci+aVmeeoiycsY29uZmlybVRleHQ6J+aIkeefpemBk+S6hid9KS50aGVuKChyZXMpPT57XG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKChyZXMpPT57XG5cdFx0XHRcdFx0XHRcdFx0d3gubmF2aWdhdGVUbyh7dXJsOiAnL3BhZ2VzL2hlbHAvamlhb2NoZW5nJ30pO1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVjYjooZXJyKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdlcnI6JyxlcnIpO1xuXHRcdFx0XHRcdHRpcC5lcnJvcihlcnIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdEhUVFBVdGlsLmdldChwYXJhbXMpO1xuXHRcdH1cblx0XHRvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0cmV0dXJuIHRpcC5zaGFyZSh0aGlzLmdvb2RzRGV0YWlscy5uYW1lLHRoaXMuZ29vZHNEZXRhaWxzLmNvbnRlbnQsdGhpcy5nb29kc0RldGFpbHMucGljLCcvcGFnZXMvZ29vZHNfZGV0YWlscz9pZD0nK3RoaXMuaWQrJyZpaWQ9Jyt0aGlzLmlpZCsnJnJlcXVlc3RfY29kZT0nK3VzZXJJbmZvLnJlcXVlc3RDb2RlKVxuXHRcdH1cblx0fVxuIl19