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

var _constant = require('./../../utils/constant.js');

var _util = require('./../../utils/util.js');

var utils = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplyAgent = function (_wepy$page) {
	_inherits(ApplyAgent, _wepy$page);

	function ApplyAgent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ApplyAgent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApplyAgent.__proto__ || Object.getPrototypeOf(ApplyAgent)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '申请合伙人',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#F7701A',
			backgroundColor: '#fefefe'
		}, _this.data = {
			name: '',
			phone: '',
			wxToken: '',
			aliToken: '',
			applyReason: ''
		}, _this.methods = {
			handleNameInput: function handleNameInput(e) {
				this.name = e.detail.value;
			},
			handlePhoneInput: function handlePhoneInput(e) {
				this.phone = e.detail.value;
			},
			handleWxInput: function handleWxInput(e) {
				this.wxToken = e.detail.value;
			},
			handleAliInput: function handleAliInput(e) {
				this.aliToken = e.detail.value;
			},
			handleReason: function handleReason(e) {
				this.applyReason = e.detail.value;
			},
			handelApply: function handelApply() {
				var _this2 = this;

				if (!this.name) {
					_tip2.default.alert({ text: '请输入真实姓名' });
					return;
				}
				if (!this.phone) {
					_tip2.default.alert({ text: '请输入电话号码' });
					return;
				}
				if (!utils.vailPhone(this.phone)) {
					_tip2.default.alert({ text: '请输入正确的电话号码' });
					return;
				}
				if (!this.wxToken) {
					_tip2.default.alert({ text: '请输入微信账号' });
					return;
				}
				if (!this.applyReason) {
					_tip2.default.alert({ text: '请输入申请理由' });
					return;
				}
				_tip2.default.confirm({ text: '确认提交申请?' }).then(function (payload) {
					_this2.submit();
				}).catch(function () {});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ApplyAgent, [{
		key: 'submit',
		value: function submit() {
			var _this3 = this;

			var userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO);
			var data = {
				url: 'auth/apply_agent',
				params: {
					openid: userInfo.openid,
					real_name: this.name,
					iphone: this.phone,
					wx_token: this.wxToken,
					zhifubao: this.aliToken,
					reason: this.applyReason
				},
				scb: function scb(res) {
					_tip2.default.success('提交成功');
					_this3.$parent.getAgentCode();
					setTimeout(function () {
						wx.switchTab({ url: '/pages/home/me' });
					}, 1500);
				},
				ecb: function ecb(res) {
					_tip2.default.error('提交失败');
				}
			};
			_HTTPUtil2.default.post(data);
		}
	}]);

	return ApplyAgent;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(ApplyAgent , 'pages/agent/apply_agent'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5X2FnZW50LmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiQXBwbHlBZ2VudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImRhdGEiLCJuYW1lIiwicGhvbmUiLCJ3eFRva2VuIiwiYWxpVG9rZW4iLCJhcHBseVJlYXNvbiIsIm1ldGhvZHMiLCJoYW5kbGVOYW1lSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJoYW5kbGVQaG9uZUlucHV0IiwiaGFuZGxlV3hJbnB1dCIsImhhbmRsZUFsaUlucHV0IiwiaGFuZGxlUmVhc29uIiwiaGFuZGVsQXBwbHkiLCJhbGVydCIsInRleHQiLCJ2YWlsUGhvbmUiLCJjb25maXJtIiwidGhlbiIsInBheWxvYWQiLCJzdWJtaXQiLCJjYXRjaCIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cmwiLCJwYXJhbXMiLCJvcGVuaWQiLCJyZWFsX25hbWUiLCJpcGhvbmUiLCJ3eF90b2tlbiIsInpoaWZ1YmFvIiwicmVhc29uIiwic2NiIiwicmVzIiwic3VjY2VzcyIsIiRwYXJlbnQiLCJnZXRBZ2VudENvZGUiLCJzZXRUaW1lb3V0Iiwid3giLCJzd2l0Y2hUYWIiLCJlY2IiLCJlcnJvciIsInBvc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7SUFBWUEsSzs7Ozs7Ozs7Ozs7O0lBQ1NDLFU7Ozs7Ozs7Ozs7Ozs7OzRMQUNwQkMsTSxHQUFTO0FBQ1JDLDJCQUF3QixPQURoQjtBQUVSQyx3QkFBcUIsTUFGYjtBQUdSQyxpQ0FBOEIsU0FIdEI7QUFJUkMsb0JBQWlCO0FBSlQsRyxRQU1UQyxJLEdBQU87QUFDTkMsU0FBSyxFQURDO0FBRU5DLFVBQU0sRUFGQTtBQUdOQyxZQUFRLEVBSEY7QUFJTkMsYUFBUyxFQUpIO0FBS05DLGdCQUFZO0FBTE4sRyxRQVNQQyxPLEdBQVU7QUFDVEMsa0JBRFMsMkJBQ09DLENBRFAsRUFDUztBQUNqQixTQUFLUCxJQUFMLEdBQVlPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDQSxJQUhRO0FBSVRDLG1CQUpTLDRCQUlRSCxDQUpSLEVBSVU7QUFDbEIsU0FBS04sS0FBTCxHQUFhTSxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0EsSUFOUTtBQU9URSxnQkFQUyx5QkFPS0osQ0FQTCxFQU9PO0FBQ2YsU0FBS0wsT0FBTCxHQUFlSyxFQUFFQyxNQUFGLENBQVNDLEtBQXhCO0FBQ0EsSUFUUTtBQVVURyxpQkFWUywwQkFVTUwsQ0FWTixFQVVRO0FBQ2hCLFNBQUtKLFFBQUwsR0FBZ0JJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDQSxJQVpRO0FBYVRJLGVBYlMsd0JBYUlOLENBYkosRUFhTTtBQUNkLFNBQUtILFdBQUwsR0FBbUJHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBNUI7QUFDQSxJQWZRO0FBZ0JUSyxjQWhCUyx5QkFnQkk7QUFBQTs7QUFDWixRQUFHLENBQUMsS0FBS2QsSUFBVCxFQUFjO0FBQ2IsbUJBQUllLEtBQUosQ0FBVSxFQUFDQyxNQUFLLFNBQU4sRUFBVjtBQUNBO0FBQ0E7QUFDRCxRQUFHLENBQUMsS0FBS2YsS0FBVCxFQUFlO0FBQ2QsbUJBQUljLEtBQUosQ0FBVSxFQUFDQyxNQUFLLFNBQU4sRUFBVjtBQUNBO0FBQ0E7QUFDRCxRQUFHLENBQUN4QixNQUFNeUIsU0FBTixDQUFnQixLQUFLaEIsS0FBckIsQ0FBSixFQUFnQztBQUMvQixtQkFBSWMsS0FBSixDQUFVLEVBQUNDLE1BQUssWUFBTixFQUFWO0FBQ0E7QUFDQTtBQUNELFFBQUcsQ0FBQyxLQUFLZCxPQUFULEVBQWlCO0FBQ2hCLG1CQUFJYSxLQUFKLENBQVUsRUFBQ0MsTUFBSyxTQUFOLEVBQVY7QUFDQTtBQUNBO0FBQ0QsUUFBRyxDQUFDLEtBQUtaLFdBQVQsRUFBcUI7QUFDcEIsbUJBQUlXLEtBQUosQ0FBVSxFQUFDQyxNQUFLLFNBQU4sRUFBVjtBQUNBO0FBQ0E7QUFDRCxrQkFBSUUsT0FBSixDQUFZLEVBQUNGLE1BQUssU0FBTixFQUFaLEVBQThCRyxJQUE5QixDQUFtQyxVQUFDQyxPQUFELEVBQVc7QUFDN0MsWUFBS0MsTUFBTDtBQUNBLEtBRkQsRUFFR0MsS0FGSCxDQUVTLFlBQUksQ0FBRSxDQUZmO0FBSUE7QUF6Q1EsRzs7Ozs7MkJBMkNGO0FBQUE7O0FBQ1AsT0FBSUMsV0FBVyxlQUFLQyxjQUFMLHFCQUFmO0FBQ0EsT0FBSXpCLE9BQU87QUFDVjBCLFNBQUssa0JBREs7QUFFVkMsWUFBUTtBQUNQQyxhQUFRSixTQUFTSSxNQURWO0FBRVBDLGdCQUFVLEtBQUs1QixJQUZSO0FBR1A2QixhQUFPLEtBQUs1QixLQUhMO0FBSVA2QixlQUFTLEtBQUs1QixPQUpQO0FBS1A2QixlQUFTLEtBQUs1QixRQUxQO0FBTVA2QixhQUFPLEtBQUs1QjtBQU5MLEtBRkU7QUFVVjZCLFNBQUssYUFBQ0MsR0FBRCxFQUFTO0FBQ2IsbUJBQUlDLE9BQUosQ0FBWSxNQUFaO0FBQ0EsWUFBS0MsT0FBTCxDQUFhQyxZQUFiO0FBQ0FDLGdCQUFXLFlBQUk7QUFDZEMsU0FBR0MsU0FBSCxDQUFhLEVBQUNmLEtBQUssZ0JBQU4sRUFBYjtBQUNBLE1BRkQsRUFFRSxJQUZGO0FBR0EsS0FoQlM7QUFpQlZnQixTQUFJLGFBQUNQLEdBQUQsRUFBTztBQUFDLG1CQUFJUSxLQUFKLENBQVUsTUFBVjtBQUFrQjtBQWpCcEIsSUFBWDtBQW1CQSxzQkFBU0MsSUFBVCxDQUFjNUMsSUFBZDtBQUNBOzs7O0VBakZzQyxlQUFLNkMsSTs7a0JBQXhCbkQsVSIsImZpbGUiOiJhcHBseV9hZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXHRpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCdcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4uLy4uL3V0aWxzL0hUVFBVdGlsJ1xuXHRpbXBvcnQge1xuXHRcdFVTRVJfSU5GTyxcblx0fSBmcm9tIFwiLi4vLi4vdXRpbHMvY29uc3RhbnRcIjtcblx0aW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIjtcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbHlBZ2VudCBleHRlbmRzIHdlcHkucGFnZSB7XG5cdFx0Y29uZmlnID0ge1xuXHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+WQiOS8meS6uicsXG5cdFx0XHRiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG5cdFx0XHRuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0Y3NzAxQScsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmZWZlJ1xuXHRcdH1cblx0XHRkYXRhID0ge1xuXHRcdFx0bmFtZTonJyxcblx0XHRcdHBob25lOicnLFxuXHRcdFx0d3hUb2tlbjonJyxcblx0XHRcdGFsaVRva2VuOicnLFxuXHRcdFx0YXBwbHlSZWFzb246JycsXG5cdFx0fVxuXG5cblx0XHRtZXRob2RzID0ge1xuXHRcdFx0aGFuZGxlTmFtZUlucHV0KGUpe1xuXHRcdFx0XHR0aGlzLm5hbWUgPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVQaG9uZUlucHV0KGUpe1xuXHRcdFx0XHR0aGlzLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlV3hJbnB1dChlKXtcblx0XHRcdFx0dGhpcy53eFRva2VuID0gZS5kZXRhaWwudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlQWxpSW5wdXQoZSl7XG5cdFx0XHRcdHRoaXMuYWxpVG9rZW4gPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVSZWFzb24oZSl7XG5cdFx0XHRcdHRoaXMuYXBwbHlSZWFzb24gPSBlLmRldGFpbC52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kZWxBcHBseSgpe1xuXHRcdFx0XHRpZighdGhpcy5uYW1lKXtcblx0XHRcdFx0XHR0aXAuYWxlcnQoe3RleHQ6J+ivt+i+k+WFpeecn+WunuWnk+WQjSd9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRoaXMucGhvbmUpe1xuXHRcdFx0XHRcdHRpcC5hbGVydCh7dGV4dDon6K+36L6T5YWl55S16K+d5Y+356CBJ30pO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdXRpbHMudmFpbFBob25lKHRoaXMucGhvbmUpKXtcblx0XHRcdFx0XHR0aXAuYWxlcnQoe3RleHQ6J+ivt+i+k+WFpeato+ehrueahOeUteivneWPt+eggSd9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRoaXMud3hUb2tlbil7XG5cdFx0XHRcdFx0dGlwLmFsZXJ0KHt0ZXh0Oifor7fovpPlhaXlvq7kv6HotKblj7cnfSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCF0aGlzLmFwcGx5UmVhc29uKXtcblx0XHRcdFx0XHR0aXAuYWxlcnQoe3RleHQ6J+ivt+i+k+WFpeeUs+ivt+eQhueUsSd9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGlwLmNvbmZpcm0oe3RleHQ6J+ehruiupOaPkOS6pOeUs+ivtz8nfSkudGhlbigocGF5bG9hZCk9Pntcblx0XHRcdFx0XHR0aGlzLnN1Ym1pdCgpO1xuXHRcdFx0XHR9KS5jYXRjaCgoKT0+e30pO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHN1Ym1pdCgpe1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX0lORk8pO1xuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvYXBwbHlfYWdlbnQnLFxuXHRcdFx0XHRwYXJhbXM6IHtcblx0XHRcdFx0XHRvcGVuaWQ6IHVzZXJJbmZvLm9wZW5pZCxcblx0XHRcdFx0XHRyZWFsX25hbWU6dGhpcy5uYW1lLFxuXHRcdFx0XHRcdGlwaG9uZTp0aGlzLnBob25lLFxuXHRcdFx0XHRcdHd4X3Rva2VuOnRoaXMud3hUb2tlbixcblx0XHRcdFx0XHR6aGlmdWJhbzp0aGlzLmFsaVRva2VuLFxuXHRcdFx0XHRcdHJlYXNvbjp0aGlzLmFwcGx5UmVhc29uXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNjYjogKHJlcykgPT4ge1xuXHRcdFx0XHRcdHRpcC5zdWNjZXNzKCfmj5DkuqTmiJDlip8nKTtcblx0XHRcdFx0XHR0aGlzLiRwYXJlbnQuZ2V0QWdlbnRDb2RlKCk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRcdFx0d3guc3dpdGNoVGFiKHt1cmw6ICcvcGFnZXMvaG9tZS9tZSd9KVxuXHRcdFx0XHRcdH0sMTUwMCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVjYjoocmVzKT0+e3RpcC5lcnJvcign5o+Q5Lqk5aSx6LSlJyl9XG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5wb3N0KGRhdGEpO1xuXHRcdH1cblxuXHR9XG4iXX0=