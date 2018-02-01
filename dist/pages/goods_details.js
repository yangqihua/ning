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
						},
						fail: function fail(res) {
							_tip2.default.loaded();
						}
					});
				},
				ecb: function ecb(err) {
					_tip2.default.loaded();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzX2RldGFpbHMuanMiXSwibmFtZXMiOlsiR29vZHNEZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1peGlucyIsImRhdGEiLCJoYWRDb3B5IiwiaWQiLCJpaWQiLCJnb29kc0RldGFpbHMiLCJuYW1lIiwicGljIiwicHJpY2UiLCJzYWxlcyIsInJhdGUiLCJjb3Vwb25fcHJpY2UiLCJjb3Vwb25fbGluayIsImlzX3RtYWxsIiwiY2lkIiwic19wcmljZSIsImNvbW1pc3Npb24iLCJtZXRob2RzIiwiZ2VuZXJhdGUiLCJjb25maXJtIiwidGV4dCIsInRoZW4iLCJwYXlsb2FkIiwibG9hZGluZyIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwicGFnZSIsInRpdGxlIiwic2NiIiwicmVzIiwiY29uc29sZSIsImxvZyIsInd4IiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsImxvYWRlZCIsImRlbGV0ZVRlbXBQaWMiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwidGVtcEZpbGVQYXRoIiwiY29tcGxldGUiLCJmYWlsIiwiZXJyb3IiLCJlY2IiLCJnZXQiLCJjYXRjaCIsImNvcHlDb2RlIiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0IiwibmF2aWdhdGVUbyIsImdldFRLTCIsImNvbXB1dGVkIiwiaXNBZ2VudCIsImFnZW50Q29kZSIsImlzTG9hZGluZyIsIiRhcHBseSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsIm9wdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiaW5kZXhPZiIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwicmVxdWVzdENvZGUiLCJnbG9iYWxEYXRhIiwiaXNXeENvZGUiLCJjaGVja0xvZ2luIiwiZ2V0R29vZHNEZXRhaWxzIiwic2V0Q2xpcGJvYXJkRGF0YSIsImVyciIsInNoYXJlIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7Z01BQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLE1BRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QixTQUh0QjtBQUlSQywyQkFBd0IsT0FKaEI7QUFLUkMsb0JBQWlCO0FBTFQsRyxRQU9UQyxNLEdBQVMsa0IsUUFDVEMsSSxHQUFPO0FBQ05DLFlBQVEsS0FERjtBQUVOQyxPQUFHLE9BRkc7QUFHTkMsUUFBSSxHQUhFO0FBSU5DLGlCQUFhO0FBQ1pELFNBQUssRUFETztBQUVaRSxVQUFNLEVBRk07QUFHWkMsU0FBSyxFQUhPO0FBSVpDLFdBQU8sRUFKSztBQUtaQyxXQUFPLEVBTEs7QUFNWkMsVUFBTSxFQU5NO0FBT1pDLGtCQUFjLEVBUEY7QUFRWkMsaUJBQVksRUFSQTtBQVNaQyxjQUFVLEVBVEU7QUFVWkMsU0FBSyxFQVZPO0FBV1pDLGFBQVMsRUFYRztBQVlaQyxnQkFBWTtBQVpBO0FBSlAsRyxRQTJEUEMsTyxHQUFVO0FBQ1RDLFdBRFMsc0JBQ0M7QUFBQTs7QUFDVCxrQkFBSUMsT0FBSixDQUFZLEVBQUNDLE1BQUssZ0NBQU4sRUFBWixFQUFxREMsSUFBckQsQ0FBMEQsVUFBQ0MsT0FBRCxFQUFXO0FBQ3BFLG1CQUFJQyxPQUFKLENBQVksS0FBWjtBQUNBLFNBQUlDLFdBQVcsT0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxTQUFJQyxTQUFTO0FBQ1pDLFdBQUssd0JBRE87QUFFWkQsY0FBUTtBQUNQRSxlQUFPTCxTQUFTSyxNQURUO0FBRVBDLGFBQUsscUJBRkU7QUFHUDNCLFdBQUcsT0FBS0EsRUFIRDtBQUlQQyxZQUFJLE9BQUtB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bnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCBIVFRQVXRpbCBmcm9tICcuLi91dGlscy9IVFRQVXRpbCdcblx0aW1wb3J0IHtQVUJMSUN9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50J1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IGNvbW1vbk1peGlucyBmcm9tICcuLi9taXhpbnMvY29tbW9uJ1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBHb29kc0RldGFpbHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnLFxuXHRcdFx0YmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuXHRcdFx0bmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnLFxuXHRcdFx0bmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNmZWZlZmUnXG5cdFx0fVxuXHRcdG1peGlucyA9IFtjb21tb25NaXhpbnNdO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHRoYWRDb3B5OmZhbHNlLFxuXHRcdFx0aWQ6JzEwNDE5Jyxcblx0XHRcdGlpZDonMCcsXG5cdFx0XHRnb29kc0RldGFpbHM6e1xuXHRcdFx0XHRpaWQ6ICcnLFxuXHRcdFx0XHRuYW1lOiAnJyxcblx0XHRcdFx0cGljOiAnJyxcblx0XHRcdFx0cHJpY2U6ICcnLFxuXHRcdFx0XHRzYWxlczogJycsXG5cdFx0XHRcdHJhdGU6ICcnLFxuXHRcdFx0XHRjb3Vwb25fcHJpY2U6ICcnLFxuXHRcdFx0XHRjb3Vwb25fbGluazonJyxcblx0XHRcdFx0aXNfdG1hbGw6ICcnLFxuXHRcdFx0XHRjaWQ6ICcnLFxuXHRcdFx0XHRzX3ByaWNlOiAnJyxcblx0XHRcdFx0Y29tbWlzc2lvbjogJydcblx0XHRcdH0sXG5cdFx0fVxuXHRcdGdldEdvb2RzRGV0YWlscyhpZCxpaWQpe1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0XHR1cmw6ICdhZ2VudC9uZXdfZ29vZHNfZGV0YWlscycsXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdHBhcmFtczoge2lkOmlkLGlpZDppaWQsb3BlbmlkOnVzZXJJbmZvLm9wZW5pZH0sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZ29vZHNEZXRhaWxzID0gcmVzO1xuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdFx0d3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHt0aXRsZTogcmVzLm5hbWV9KVxuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXHRcdG9uTG9hZChvcHRpb25zKSB7XG5cdFx0XHRpZihvcHRpb25zLmhhc093blByb3BlcnR5KCdpZCcpICYmIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2lpZCcpKXtcblx0XHRcdFx0dGhpcy5pZCA9IG9wdGlvbnNbJ2lkJ107XG5cdFx0XHRcdHRoaXMuaWlkID0gb3B0aW9uc1snaWlkJ107XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IHNjZW5lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnNbJ3NjZW5lJ10pO1xuXHRcdFx0XHRpZihzY2VuZS5pbmRleE9mKCdfJyk+LTEpe1xuXHRcdFx0XHRcdGxldCBhcnIgPSBzY2VuZS5zcGxpdCgnXycpO1xuXHRcdFx0XHRcdGlmKGFyci5sZW5ndGghPTMpe1xuXHRcdFx0XHRcdFx0dGlwLmVycm9yKCfkuoznu7TnoIHlj4LmlbDmnInor6/vvIEnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGV0IHJlcXVlc3RDb2RlID0gYXJyWzBdO1xuXHRcdFx0XHRcdHRoaXMuaWQgPSBhcnJbMV07XG5cdFx0XHRcdFx0dGhpcy5paWQgPSBhcnJbMl07XG5cdFx0XHRcdFx0aWYodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuaXNXeENvZGUpe1xuXHRcdFx0XHRcdFx0dGhpcy4kcGFyZW50LmNoZWNrTG9naW4ocmVxdWVzdENvZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGlwLmVycm9yKCfplJnor686JytzY2VuZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuZ2V0R29vZHNEZXRhaWxzKHRoaXMuaWQsdGhpcy5paWQpO1xuXHRcdH1cblx0XHRvblVubG9hZCgpe1xuXHRcdFx0dGhpcy5oYWRDb3B5PWZhbHNlO1xuXHRcdH1cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0Z2VuZXJhdGUoKXtcblx0XHRcdFx0dGlwLmNvbmZpcm0oe3RleHQ6XCLnlJ/miJDnmoTlm77mlofljIXlkKvlsI/nqIvluo/kuoznu7TnoIHvvIzor7fplb/mjInkv53lrZjoh7Pnm7jlhozmiJbnm7TmjqXlj5HpgIHnu5nlpb3lj4tcIn0pLnRoZW4oKHBheWxvYWQpPT57XG5cdFx0XHRcdFx0dGlwLmxvYWRpbmcoXCLnlJ/miJDkuK1cIik7XG5cdFx0XHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0XHRcdHVybDogJ3V0aWxzL2hhbmRsZV9zaGFyZV9waWMnLFxuXHRcdFx0XHRcdFx0cGFyYW1zOiB7XG5cdFx0XHRcdFx0XHRcdG9wZW5pZDp1c2VySW5mby5vcGVuaWQsXG5cdFx0XHRcdFx0XHRcdHBhZ2U6J3BhZ2VzL2dvb2RzX2RldGFpbHMnLFxuXHRcdFx0XHRcdFx0XHRpZDp0aGlzLmlkLFxuXHRcdFx0XHRcdFx0XHRpaWQ6dGhpcy5paWQsXG5cdFx0XHRcdFx0XHRcdHBpYzp0aGlzLmdvb2RzRGV0YWlscy5waWMsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOnRoaXMuZ29vZHNEZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0XHRcdHNfcHJpY2U6dGhpcy5nb29kc0RldGFpbHMuc19wcmljZSxcblx0XHRcdFx0XHRcdFx0cHJpY2U6dGhpcy5nb29kc0RldGFpbHMucHJpY2UsXG5cdFx0XHRcdFx0XHRcdGNvdXBvbl9wcmljZTp0aGlzLmdvb2RzRGV0YWlscy5jb3Vwb25fcHJpY2UsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c2NiOiAocmVzKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdyZXM6JyxyZXMpO1xuXHRcdFx0XHRcdFx0XHRsZXQgdXJsID0gcmVzWyd1cmwnXVxuXHRcdFx0XHRcdFx0XHR3eC5kb3dubG9hZEZpbGUoe1xuXHRcdFx0XHRcdFx0XHRcdHVybDogUFVCTElDK3VybCxcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRIVFRQVXRpbC5kZWxldGVUZW1wUGljKHVybCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR3eC5wcmV2aWV3SW1hZ2Uoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR1cmxzOiBbcmVzLnRlbXBGaWxlUGF0aF0gLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTooKT0+e1xuLy9cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGlwLnN1Y2Nlc3MoJ2NvbXBsZXRlJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGZhaWw6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRpcC5lcnJvcign6I635Y+W5aSx6LSlJylcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZWNiOihyZXMpPT57XG5cdFx0XHRcdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0XHRcdH0pLmNhdGNoKCgpPT57fSk7XG5cdFx0XHR9LFxuXHRcdFx0Y29weUNvZGUoKXtcblx0XHRcdFx0aWYodGhpcy5oYWRDb3B5KXtcblx0XHRcdFx0XHR0aXAuY29uZmlybSh7dGV4dDon5reY5Y+j5Luk5aSN5Yi25oiQ5Yqf77yM5omT5byA5omL5py65reY5a6d5LiL5Y2V5Y2z5Y+vJyxjYW5jZWxUZXh0OifnnIvnnIvmlZnnqIsnLGNvbmZpcm1UZXh0OifmiJHnn6XpgZPkuoYnfSkudGhlbigocmVzKT0+e1xuXHRcdFx0XHRcdH0pLmNhdGNoKChyZXMpPT57XG5cdFx0XHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHt1cmw6ICcvcGFnZXMvaGVscC9qaWFvY2hlbmcnfSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5nZXRUS0woKTtcblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0Y29tcHV0ZWQ9e1xuXHRcdFx0aXNBZ2VudCgpe1xuXHRcdFx0XHRsZXQgdXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKTtcblx0XHRcdFx0cmV0dXJuIHVzZXJJbmZvLmFnZW50Q29kZT09JzEnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldFRLTCgpe1xuXHRcdFx0dGlwLmxvYWRpbmcoKTtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYWdlbnQvZ2V0X3RrbCcsXG5cdFx0XHRcdGlzTG9hZGluZzpmYWxzZSxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOnVzZXJJbmZvLm9wZW5pZCxpaWQ6dGhpcy5nb29kc0RldGFpbHMuaWlkLHRpdGxlOnRoaXMuZ29vZHNEZXRhaWxzLm5hbWUscGljOnRoaXMuZ29vZHNEZXRhaWxzLnBpYyxjb3Vwb25fbGluazp0aGlzLmdvb2RzRGV0YWlscy5jb3Vwb25fbGlua30sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHd4LnNldENsaXBib2FyZERhdGEoe1xuXHRcdFx0XHRcdFx0ZGF0YTogcmVzLFxuXHRcdFx0XHRcdFx0c3VjY2VzczogKHJlcyk9Pntcblx0XHRcdFx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmhhZENvcHkgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0XHR0aXAuY29uZmlybSh7dGV4dDon5reY5Y+j5Luk5aSN5Yi25oiQ5Yqf77yM5omT5byA5omL5py65reY5a6d5LiL5Y2V5Y2z5Y+vJyxjYW5jZWxUZXh0OifnnIvnnIvmlZnnqIsnLGNvbmZpcm1UZXh0OifmiJHnn6XpgZPkuoYnfSkudGhlbigocmVzKT0+e1xuXHRcdFx0XHRcdFx0XHR9KS5jYXRjaCgocmVzKT0+e1xuXHRcdFx0XHRcdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9oZWxwL2ppYW9jaGVuZyd9KTtcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmYWlsOihyZXMpPT57XG5cdFx0XHRcdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlY2I6KGVycik9Pntcblx0XHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHRcdFx0dGlwLmVycm9yKGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0SFRUUFV0aWwuZ2V0KHBhcmFtcyk7XG5cdFx0fVxuXHRcdG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRyZXR1cm4gdGlwLnNoYXJlKHRoaXMuZ29vZHNEZXRhaWxzLm5hbWUsdGhpcy5nb29kc0RldGFpbHMuY29udGVudCx0aGlzLmdvb2RzRGV0YWlscy5waWMsJy9wYWdlcy9nb29kc19kZXRhaWxzP2lkPScrdGhpcy5pZCsnJmlpZD0nK3RoaXMuaWlkKycmcmVxdWVzdF9jb2RlPScrdXNlckluZm8ucmVxdWVzdENvZGUpXG5cdFx0fVxuXHR9XG4iXX0=