'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_wepy$page) {
	_inherits(User, _wepy$page);

	function User() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, User);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '',
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#FFFFFF',
			navigationBarTextStyle: 'black'
		}, _this.data = {
			url: ''
		}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(User, [{
		key: 'onUnload',
		value: function onUnload() {
			this.url = '';
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			this.url = options.url;
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var userInfo = this.$parent.getUserInfo();
			return _tip2.default.share('高额优惠券，速来围观！！！', '', '', '/pages/home/index?request_code=' + userInfo.requestCode);
		}
	}]);

	return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/web_view'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYl92aWV3LmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGF0YSIsInVybCIsIm1ldGhvZHMiLCJvcHRpb25zIiwicmVzIiwidXNlckluZm8iLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJzaGFyZSIsInJlcXVlc3RDb2RlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztnTEFDcEJDLE0sR0FBUztBQUNSQywyQkFBd0IsRUFEaEI7QUFFUkMsd0JBQXFCLE1BRmI7QUFHUkMsaUNBQThCLFNBSHRCO0FBSVJDLDJCQUF3QjtBQUpoQixHLFFBTVRDLEksR0FBTztBQUNOQyxRQUFJO0FBREUsRyxRQUlQQyxPLEdBQVUsRTs7Ozs7NkJBR0E7QUFDVCxRQUFLRCxHQUFMLEdBQVcsRUFBWDtBQUNBOzs7eUJBRU1FLE8sRUFBUztBQUNmLFFBQUtGLEdBQUwsR0FBV0UsUUFBUUYsR0FBbkI7QUFDQTs7O29DQUVpQkcsRyxFQUFLO0FBQ3RCLE9BQUlDLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxXQUFiLEVBQWY7QUFDQSxVQUFPLGNBQUlDLEtBQUosQ0FBVSxlQUFWLEVBQTBCLEVBQTFCLEVBQTZCLEVBQTdCLEVBQWdDLG9DQUFrQ0gsU0FBU0ksV0FBM0UsQ0FBUDtBQUNBOzs7O0VBekJnQyxlQUFLQyxJOztrQkFBbEJoQixJIiwiZmlsZSI6IndlYl92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnJyxcblx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcblx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcblx0XHRcdG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXG5cdFx0fVxuXHRcdGRhdGEgPSB7XG5cdFx0XHR1cmw6JycsXG5cdFx0fVxuXG5cdFx0bWV0aG9kcyA9IHtcblx0XHR9XG5cblx0XHRvblVubG9hZCgpe1xuXHRcdFx0dGhpcy51cmwgPSAnJztcblx0XHR9XG5cblx0XHRvbkxvYWQob3B0aW9ucykge1xuXHRcdFx0dGhpcy51cmwgPSBvcHRpb25zLnVybDtcblx0XHR9XG5cblx0XHRvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcblx0XHRcdGxldCB1c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpO1xuXHRcdFx0cmV0dXJuIHRpcC5zaGFyZSgn6auY6aKd5LyY5oOg5Yi477yM6YCf5p2l5Zu06KeC77yB77yB77yBJywnJywnJywnL3BhZ2VzL2hvbWUvaW5kZXg/cmVxdWVzdF9jb2RlPScrdXNlckluZm8ucmVxdWVzdENvZGUpO1xuXHRcdH1cblxuXHR9XG4iXX0=