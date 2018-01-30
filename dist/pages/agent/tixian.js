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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			navigationBarTitleText: '提现',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A'
		}, _this.data = {
			info: {
				money: '0',
				zhifubao: '',
				wx_token: '',
				min_tixian: '',
				notice: ''
			},
			moneyType: '0',
			token: '',
			money: ''
		}, _this.computed = {
			tip: function tip() {
				if (this.info.money < this.info.min_tixian) {
					return '余额不足';
				}
				return '申请提现';
			},
			placeholder: function placeholder() {
				if (this.info.money < this.info.min_tixian) {
					return '当前余额不足';
				}
				return '请输入提现金额';
			}
		}, _this.methods = {
			radioChange: function radioChange(e) {
				this.moneyType = e.detail.value;
			},
			handleMoneyInput: function handleMoneyInput(e) {
				this.money = e.detail.value;
			},
			handleTokenInput: function handleTokenInput(e) {
				this.token = e.detail.value;
			},
			handelTixian: function handelTixian() {
				var _this2 = this;

				if (!this.money) {
					return;
				}
				if (this.info.money < this.info.min_tixian) {
					return;
				}
				if (this.money < this.info.min_tixian) {
					_tip2.default.alert({ text: this.info.notice });
					return;
				}
				if (this.money > this.info.money) {
					_tip2.default.alert({ text: '余额不足' });
					return;
				}
				if (!this.token) {
					_tip2.default.alert({ text: '提现账户不能为空' });
					return;
				}
				var text = this.moneyType == '0' ? '微信' : '支付宝';
				_tip2.default.confirm({ text: '确认提现到' + text + '账户: ' + this.token + ' ?' }).then(function (payload) {
					_this2.submit();
				}).catch(function () {});
			}
		}, _this.watch = {
			moneyType: function moneyType(newValue) {
				if (newValue == '0') {
					this.token = this.info.wx_token;
				} else {
					this.token = this.info.zhifubao;
				}
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tixian, [{
		key: 'submit',
		value: function submit() {
			var userInfo = this.$parent.getUserInfo();
			var params = {
				url: 'auth/submit_tixian',
				params: { openid: userInfo.openid, tx_money: this.money, type: this.moneyType, token: this.token },
				scb: function scb(res) {
					_tip2.default.success('提交成功');
					setTimeout(function () {
						wx.navigateBack({ delta: 1 });
					}, 1500);
				},
				ecb: function ecb(res) {
					_tip2.default.error('提交失败');
				}
			};
			_HTTPUtil2.default.post(params);
		}
	}, {
		key: 'getInfo',
		value: function getInfo() {
			var _this3 = this;

			var userInfo = this.$parent.getUserInfo();
			var params = {
				url: 'auth/request_tixian_data',
				params: { openid: userInfo.openid },
				scb: function scb(res) {
					_this3.info = res;
					_this3.token = res.wx_token;
					_this3.money = res.money;
					_this3.moneyType = '0';
					_this3.$apply();
				}
			};
			_HTTPUtil2.default.get(params);
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			this.getInfo();
		}
	}]);

	return Tixian;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Tixian , 'pages/agent/tixian'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpeGlhbi5qcyJdLCJuYW1lcyI6WyJUaXhpYW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwiaW5mbyIsIm1vbmV5IiwiemhpZnViYW8iLCJ3eF90b2tlbiIsIm1pbl90aXhpYW4iLCJub3RpY2UiLCJtb25leVR5cGUiLCJ0b2tlbiIsImNvbXB1dGVkIiwidGlwIiwicGxhY2Vob2xkZXIiLCJtZXRob2RzIiwicmFkaW9DaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJoYW5kbGVNb25leUlucHV0IiwiaGFuZGxlVG9rZW5JbnB1dCIsImhhbmRlbFRpeGlhbiIsImFsZXJ0IiwidGV4dCIsImNvbmZpcm0iLCJ0aGVuIiwicGF5bG9hZCIsInN1Ym1pdCIsImNhdGNoIiwid2F0Y2giLCJuZXdWYWx1ZSIsInVzZXJJbmZvIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFyYW1zIiwidXJsIiwib3BlbmlkIiwidHhfbW9uZXkiLCJ0eXBlIiwic2NiIiwicmVzIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZWNiIiwiZXJyb3IiLCJwb3N0IiwiJGFwcGx5IiwiZ2V0Iiwib3B0aW9ucyIsImdldEluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7b0xBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCLElBRGhCO0FBRVJDLHdCQUFxQixNQUZiO0FBR1JDLGlDQUE4QjtBQUh0QixHLFFBS1RDLEksR0FBTztBQUNOQyxTQUFLO0FBQ0pDLFdBQU0sR0FERjtBQUVKQyxjQUFTLEVBRkw7QUFHSkMsY0FBUyxFQUhMO0FBSUpDLGdCQUFXLEVBSlA7QUFLSkMsWUFBTztBQUxILElBREM7QUFRTkMsY0FBVSxHQVJKO0FBU05DLFVBQU0sRUFUQTtBQVVOTixVQUFNO0FBVkEsRyxRQWFQTyxRLEdBQVc7QUFDVkMsTUFEVSxpQkFDTDtBQUNKLFFBQUcsS0FBS1QsSUFBTCxDQUFVQyxLQUFWLEdBQWdCLEtBQUtELElBQUwsQ0FBVUksVUFBN0IsRUFBd0M7QUFDdkMsWUFBTyxNQUFQO0FBQ0E7QUFDRCxXQUFPLE1BQVA7QUFDQSxJQU5TO0FBT1ZNLGNBUFUseUJBT0c7QUFDWixRQUFHLEtBQUtWLElBQUwsQ0FBVUMsS0FBVixHQUFnQixLQUFLRCxJQUFMLENBQVVJLFVBQTdCLEVBQXdDO0FBQ3ZDLFlBQU8sUUFBUDtBQUNBO0FBQ0QsV0FBTyxTQUFQO0FBQ0E7QUFaUyxHLFFBZVhPLE8sR0FBVTtBQUNUQyxjQURTLHVCQUNHQyxDQURILEVBQ0s7QUFDYixTQUFLUCxTQUFMLEdBQWlCTyxFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0EsSUFIUTtBQUlUQyxtQkFKUyw0QkFJUUgsQ0FKUixFQUlVO0FBQ2xCLFNBQUtaLEtBQUwsR0FBYVksRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLElBTlE7QUFPVEUsbUJBUFMsNEJBT1FKLENBUFIsRUFPVTtBQUNsQixTQUFLTixLQUFMLEdBQWFNLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxJQVRRO0FBVVRHLGVBVlMsMEJBVUs7QUFBQTs7QUFDYixRQUFHLENBQUMsS0FBS2pCLEtBQVQsRUFBZTtBQUNkO0FBQ0E7QUFDRCxRQUFHLEtBQUtELElBQUwsQ0FBVUMsS0FBVixHQUFnQixLQUFLRCxJQUFMLENBQVVJLFVBQTdCLEVBQXdDO0FBQ3ZDO0FBQ0E7QUFDRCxRQUFHLEtBQUtILEtBQUwsR0FBVyxLQUFLRCxJQUFMLENBQVVJLFVBQXhCLEVBQW1DO0FBQ2xDLG1CQUFJZSxLQUFKLENBQVUsRUFBQ0MsTUFBSyxLQUFLcEIsSUFBTCxDQUFVSyxNQUFoQixFQUFWO0FBQ0E7QUFDQTtBQUNELFFBQUcsS0FBS0osS0FBTCxHQUFXLEtBQUtELElBQUwsQ0FBVUMsS0FBeEIsRUFBOEI7QUFDN0IsbUJBQUlrQixLQUFKLENBQVUsRUFBQ0MsTUFBSyxNQUFOLEVBQVY7QUFDQTtBQUNBO0FBQ0QsUUFBRyxDQUFDLEtBQUtiLEtBQVQsRUFBZTtBQUNkLG1CQUFJWSxLQUFKLENBQVUsRUFBQ0MsTUFBSyxVQUFOLEVBQVY7QUFDQTtBQUNBO0FBQ0QsUUFBSUEsT0FBTyxLQUFLZCxTQUFMLElBQWdCLEdBQWhCLEdBQW9CLElBQXBCLEdBQXlCLEtBQXBDO0FBQ0Esa0JBQUllLE9BQUosQ0FBWSxFQUFDRCxNQUFLLFVBQVFBLElBQVIsR0FBYSxNQUFiLEdBQW9CLEtBQUtiLEtBQXpCLEdBQStCLElBQXJDLEVBQVosRUFBd0RlLElBQXhELENBQTZELFVBQUNDLE9BQUQsRUFBVztBQUN2RSxZQUFLQyxNQUFMO0FBQ0EsS0FGRCxFQUVHQyxLQUZILENBRVMsWUFBSSxDQUFFLENBRmY7QUFJQTtBQWxDUSxHLFFBc0VWQyxLLEdBQVE7QUFDUHBCLFlBRE8scUJBQ0dxQixRQURILEVBQ1k7QUFDbEIsUUFBR0EsWUFBVSxHQUFiLEVBQWlCO0FBQ2hCLFVBQUtwQixLQUFMLEdBQWEsS0FBS1AsSUFBTCxDQUFVRyxRQUF2QjtBQUNBLEtBRkQsTUFFTTtBQUNMLFVBQUtJLEtBQUwsR0FBYSxLQUFLUCxJQUFMLENBQVVFLFFBQXZCO0FBQ0E7QUFDRDtBQVBNLEc7Ozs7OzJCQWxDQTtBQUNQLE9BQUkwQixXQUFXLEtBQUtDLE9BQUwsQ0FBYUMsV0FBYixFQUFmO0FBQ0EsT0FBSUMsU0FBUztBQUNaQyxTQUFLLG9CQURPO0FBRVpELFlBQVEsRUFBQ0UsUUFBUUwsU0FBU0ssTUFBbEIsRUFBeUJDLFVBQVMsS0FBS2pDLEtBQXZDLEVBQTZDa0MsTUFBSyxLQUFLN0IsU0FBdkQsRUFBaUVDLE9BQU0sS0FBS0EsS0FBNUUsRUFGSTtBQUdaNkIsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixtQkFBSUMsT0FBSixDQUFZLE1BQVo7QUFDQUMsZ0JBQVcsWUFBSTtBQUFDQyxTQUFHQyxZQUFILENBQWdCLEVBQUNDLE9BQU0sQ0FBUCxFQUFoQjtBQUE0QixNQUE1QyxFQUE2QyxJQUE3QztBQUNBLEtBTlc7QUFPWkMsU0FBSSxhQUFDTixHQUFELEVBQU87QUFBQyxtQkFBSU8sS0FBSixDQUFVLE1BQVY7QUFBa0I7QUFQbEIsSUFBYjtBQVNBLHNCQUFTQyxJQUFULENBQWNkLE1BQWQ7QUFDQTs7OzRCQUVTO0FBQUE7O0FBQ1QsT0FBSUgsV0FBVyxLQUFLQyxPQUFMLENBQWFDLFdBQWIsRUFBZjtBQUNBLE9BQUlDLFNBQVM7QUFDWkMsU0FBSywwQkFETztBQUVaRCxZQUFRLEVBQUNFLFFBQVFMLFNBQVNLLE1BQWxCLEVBRkk7QUFHWkcsU0FBSyxhQUFDQyxHQUFELEVBQVM7QUFDYixZQUFLckMsSUFBTCxHQUFZcUMsR0FBWjtBQUNBLFlBQUs5QixLQUFMLEdBQWE4QixJQUFJbEMsUUFBakI7QUFDQSxZQUFLRixLQUFMLEdBQWFvQyxJQUFJcEMsS0FBakI7QUFDQSxZQUFLSyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsWUFBS3dDLE1BQUw7QUFDQTtBQVRXLElBQWI7QUFXQSxzQkFBU0MsR0FBVCxDQUFhaEIsTUFBYjtBQUNBOzs7eUJBRU1pQixPLEVBQVM7QUFDZixRQUFLQyxPQUFMO0FBQ0E7Ozs7RUF0R2tDLGVBQUtDLEk7O2tCQUFwQnhELE0iLCJmaWxlIjoidGl4aWFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJ1xuXHRpbXBvcnQgSFRUUFV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvSFRUUFV0aWwnXG5cblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl4aWFuIGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o+Q546wJyxcblx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcblx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRjc3MDFBJyxcblx0XHR9XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGluZm86e1xuXHRcdFx0XHRtb25leTonMCcsXG5cdFx0XHRcdHpoaWZ1YmFvOicnLFxuXHRcdFx0XHR3eF90b2tlbjonJyxcblx0XHRcdFx0bWluX3RpeGlhbjonJyxcblx0XHRcdFx0bm90aWNlOicnLFxuXHRcdFx0fSxcblx0XHRcdG1vbmV5VHlwZTonMCcsXG5cdFx0XHR0b2tlbjonJyxcblx0XHRcdG1vbmV5OicnLFxuXHRcdH1cblxuXHRcdGNvbXB1dGVkID0ge1xuXHRcdFx0dGlwKCl7XG5cdFx0XHRcdGlmKHRoaXMuaW5mby5tb25leTx0aGlzLmluZm8ubWluX3RpeGlhbil7XG5cdFx0XHRcdFx0cmV0dXJuICfkvZnpop3kuI3otrMnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAn55Sz6K+35o+Q546wJztcblx0XHRcdH0sXG5cdFx0XHRwbGFjZWhvbGRlcigpe1xuXHRcdFx0XHRpZih0aGlzLmluZm8ubW9uZXk8dGhpcy5pbmZvLm1pbl90aXhpYW4pe1xuXHRcdFx0XHRcdHJldHVybiAn5b2T5YmN5L2Z6aKd5LiN6LazJztcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gJ+ivt+i+k+WFpeaPkOeOsOmHkeminSc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdHJhZGlvQ2hhbmdlKGUpe1xuXHRcdFx0XHR0aGlzLm1vbmV5VHlwZSA9IGUuZGV0YWlsLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdGhhbmRsZU1vbmV5SW5wdXQoZSl7XG5cdFx0XHRcdHRoaXMubW9uZXkgPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVUb2tlbklucHV0KGUpe1xuXHRcdFx0XHR0aGlzLnRva2VuID0gZS5kZXRhaWwudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGVsVGl4aWFuKCl7XG5cdFx0XHRcdGlmKCF0aGlzLm1vbmV5KXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5pbmZvLm1vbmV5PHRoaXMuaW5mby5taW5fdGl4aWFuKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5tb25leTx0aGlzLmluZm8ubWluX3RpeGlhbil7XG5cdFx0XHRcdFx0dGlwLmFsZXJ0KHt0ZXh0OnRoaXMuaW5mby5ub3RpY2V9KTtcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLm1vbmV5PnRoaXMuaW5mby5tb25leSl7XG5cdFx0XHRcdFx0dGlwLmFsZXJ0KHt0ZXh0OifkvZnpop3kuI3otrMnfSk7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRoaXMudG9rZW4pe1xuXHRcdFx0XHRcdHRpcC5hbGVydCh7dGV4dDon5o+Q546w6LSm5oi35LiN6IO95Li656m6J30pO1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ZXh0ID0gdGhpcy5tb25leVR5cGU9PScwJz8n5b6u5L+hJzon5pSv5LuY5a6dJztcblx0XHRcdFx0dGlwLmNvbmZpcm0oe3RleHQ6J+ehruiupOaPkOeOsOWIsCcrdGV4dCsn6LSm5oi3OiAnK3RoaXMudG9rZW4rJyA/J30pLnRoZW4oKHBheWxvYWQpPT57XG5cdFx0XHRcdFx0dGhpcy5zdWJtaXQoKTtcblx0XHRcdFx0fSkuY2F0Y2goKCk9Pnt9KTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRzdWJtaXQoKXtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYXV0aC9zdWJtaXRfdGl4aWFuJyxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOiB1c2VySW5mby5vcGVuaWQsdHhfbW9uZXk6dGhpcy5tb25leSx0eXBlOnRoaXMubW9uZXlUeXBlLHRva2VuOnRoaXMudG9rZW59LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aXAuc3VjY2Vzcygn5o+Q5Lqk5oiQ5YqfJyk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+e3d4Lm5hdmlnYXRlQmFjayh7ZGVsdGE6MX0pO30sMTUwMCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVjYjoocmVzKT0+e3RpcC5lcnJvcign5o+Q5Lqk5aSx6LSlJyl9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5wb3N0KHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0Z2V0SW5mbygpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0bGV0IHBhcmFtcyA9IHtcblx0XHRcdFx0dXJsOiAnYXV0aC9yZXF1ZXN0X3RpeGlhbl9kYXRhJyxcblx0XHRcdFx0cGFyYW1zOiB7b3BlbmlkOiB1c2VySW5mby5vcGVuaWR9LFxuXHRcdFx0XHRzY2I6IChyZXMpID0+IHtcblx0XHRcdFx0XHR0aGlzLmluZm8gPSByZXM7XG5cdFx0XHRcdFx0dGhpcy50b2tlbiA9IHJlcy53eF90b2tlbjtcblx0XHRcdFx0XHR0aGlzLm1vbmV5ID0gcmVzLm1vbmV5O1xuXHRcdFx0XHRcdHRoaXMubW9uZXlUeXBlID0gJzAnO1xuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQocGFyYW1zKTtcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0dGhpcy5nZXRJbmZvKCk7XG5cdFx0fVxuXG5cdFx0d2F0Y2ggPSB7XG5cdFx0XHRtb25leVR5cGUobmV3VmFsdWUpe1xuXHRcdFx0XHRpZihuZXdWYWx1ZT09JzAnKXtcblx0XHRcdFx0XHR0aGlzLnRva2VuID0gdGhpcy5pbmZvLnd4X3Rva2VuO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy50b2tlbiA9IHRoaXMuaW5mby56aGlmdWJhbztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHR9XG4iXX0=