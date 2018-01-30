'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _constant = require('./utils/constant.js');

var _HTTPUtil = require('./utils/HTTPUtil.js');

var _HTTPUtil2 = _interopRequireDefault(_HTTPUtil);

var _tip = require('./utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
	_inherits(_default, _wepy$app);

	function _default() {
		_classCallCheck(this, _default);

		var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

		_this.config = {
			pages: ['pages/home/index', 'pages/home/top', 'pages/home/search', 'pages/home/me', 'pages/home_details', 'pages/goods_details', 'pages/search_details', 'pages/help/jiaocheng', 'pages/help/jiaocheng1', 'pages/web_view', 'pages/agent/tixian', 'pages/agent/read_tixian', 'pages/agent/order', 'pages/agent/user', 'pages/agent/agent', 'pages/agent/show_apply', 'pages/agent/apply_agent'],
			window: {
				backgroundTextStyle: 'dark',
				navigationBarBackgroundColor: '#ff5777',
				navigationBarTitleText: '柠檬好物',
				navigationBarTextStyle: '#fff',
				enablePullDownRefresh: false,
				backgroundColor: '#fefefe'
			},
			tabBar: {
				color: "#666",
				selectedColor: "#ff5777",
				backgroundColor: "#ffffff",
				borderStyle: "#b2b2b2",
				list: [{
					pagePath: 'pages/home/index',
					text: "首页",
					iconPath: "images/home/homepage.png",
					selectedIconPath: "images/home/homepage_fill.png"
				}, {
					pagePath: 'pages/home/top',
					text: "好货精选",
					iconPath: "images/home/integral.png",
					selectedIconPath: "images/home/integral_fill.png"
				}, {
					pagePath: 'pages/home/search',
					text: "搜索",
					iconPath: "images/home/search.png",
					selectedIconPath: "images/home/search_fill.png"
				}, {
					pagePath: 'pages/home/me',
					text: "个人中心",
					iconPath: "images/home/people.png",
					selectedIconPath: "images/home/people_fill.png"
				}]
			}
		};
		_this.globalData = {
			userInfo: null,
			isWxCode: false
		};

		_this.use('requestfix');
		_this.use('promisify');
		return _this;
	}

	_createClass(_default, [{
		key: 'onLaunch',
		value: function onLaunch(options) {
			this.checkIsWxCode(options['scene']);
			if (!this.globalData.isWxCode) {
				var requestCode = this.getRequestCode(options);
				this.checkLogin(requestCode);
			}
		}
	}, {
		key: 'checkIsWxCode',
		value: function checkIsWxCode(scene) {
			this.globalData.isWxCode = scene == 1047 || scene == 1048 || scene == 1049;
		}
	}, {
		key: 'checkLogin',
		value: function checkLogin(requestCode) {
			var _this2 = this;

			var userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO) || {};
			wx.checkSession({
				success: function success() {
					if (!userInfo.openid || !userInfo.nickName || !userInfo.avatarUrl) {
						_this2.login(requestCode);
					} else {
						_this2.getAgentCode(requestCode);
					}
				},
				fail: function fail() {
					_this2.login(requestCode);
				}
			});
		}
	}, {
		key: 'login',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(requestCode) {
				var _this3 = this;

				var res, userResult, userInfo, systemInfo, params, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return _wepy2.default.login();

							case 2:
								res = _context.sent;

								if (!res.code) {
									_context.next = 13;
									break;
								}

								_context.next = 6;
								return _wepy2.default.getUserInfo();

							case 6:
								userResult = _context.sent;
								userInfo = userResult.userInfo;
								systemInfo = _wepy2.default.getSystemInfoSync();

								_wepy2.default.setStorageSync(_constant.SYSTEM_INFO, systemInfo);

								params = {
									code: res.code,
									request_code: requestCode,
									avatarUrl: userInfo.avatarUrl,
									city: userInfo.city,
									province: userInfo.province,
									gender: userInfo.gender,
									nickName: userInfo.nickName
								};
								data = {
									url: 'auth/login',
									params: params,
									scb: function scb(result) {
										console.log("result:", result);
										userInfo['openid'] = result['openid'];
										userInfo['agentCode'] = result['is_agent'];
										userInfo['requestCode'] = result['request_code'];
										_this3.globalData.userInfo = userInfo;
										_wepy2.default.setStorageSync(_constant.USER_INFO, userInfo);
									}
								};

								_HTTPUtil2.default.get(data);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function login(_x) {
				return _ref.apply(this, arguments);
			}

			return login;
		}()
	}, {
		key: 'getRequestCode',
		value: function getRequestCode(options) {
			var query = options['query'];
			var requestCode = '';
			if (query.hasOwnProperty('request_code')) {
				requestCode = query['request_code'];
			}
			//			tip.success(requestCode);
			return requestCode;
		}
	}, {
		key: 'getAgentCode',
		value: function getAgentCode(options) {
			var _this4 = this;

			var userInfo = this.getUserInfo();
			var data = {
				url: 'auth/check_agent',
				isLoading: false,
				params: { openid: userInfo.openid },
				scb: function scb(result) {
					var agentCode = result['is_agent'];
					if (agentCode == '-1') {
						_this4.login(options);
					} else {
						userInfo['agentCode'] = agentCode;
						userInfo['requestCode'] = result['request_code'];
						_this4.globalData.userInfo = userInfo;
						_wepy2.default.setStorageSync(_constant.USER_INFO, userInfo);
					}
				}
			};
			_HTTPUtil2.default.get(data);
		}
	}, {
		key: 'getUserInfo',
		value: function getUserInfo() {
			return this.globalData.userInfo || _wepy2.default.getStorageSync(_constant.USER_INFO);
		}
	}]);

	return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpc1d4Q29kZSIsInVzZSIsIm9wdGlvbnMiLCJjaGVja0lzV3hDb2RlIiwicmVxdWVzdENvZGUiLCJnZXRSZXF1ZXN0Q29kZSIsImNoZWNrTG9naW4iLCJzY2VuZSIsImdldFN0b3JhZ2VTeW5jIiwid3giLCJjaGVja1Nlc3Npb24iLCJzdWNjZXNzIiwib3BlbmlkIiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJsb2dpbiIsImdldEFnZW50Q29kZSIsImZhaWwiLCJyZXMiLCJjb2RlIiwiZ2V0VXNlckluZm8iLCJ1c2VyUmVzdWx0Iiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwic2V0U3RvcmFnZVN5bmMiLCJwYXJhbXMiLCJyZXF1ZXN0X2NvZGUiLCJjaXR5IiwicHJvdmluY2UiLCJnZW5kZXIiLCJkYXRhIiwidXJsIiwic2NiIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImdldCIsInF1ZXJ5IiwiaGFzT3duUHJvcGVydHkiLCJpc0xvYWRpbmciLCJhZ2VudENvZGUiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1RUMscUJBQWM7QUFBQTs7QUFBQTs7QUFBQSxRQXBFZEEsTUFv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LEtBQUwsQ0FBV2IsT0FBWDtBQUNBLE1BRkQsTUFFTztBQUNOSCxlQUFTLFdBQVQsSUFBd0J5QyxTQUF4QjtBQUNBekMsZUFBUyxhQUFULElBQTBCa0MsT0FBTyxjQUFQLENBQTFCO0FBQ0EsYUFBS25DLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCQSxRQUEzQjtBQUNBLHFCQUFLeUIsY0FBTCxzQkFBK0J6QixRQUEvQjtBQUNBO0FBQ0Q7QUFkUyxJQUFYO0FBZ0JBLHNCQUFTcUMsR0FBVCxDQUFhTixJQUFiO0FBQ0E7OztnQ0FFYTtBQUNiLFVBQU8sS0FBS2hDLFVBQUwsQ0FBZ0JDLFFBQWhCLElBQTRCLGVBQUtTLGNBQUwscUJBQW5DO0FBQ0E7Ozs7RUEzSzJCLGVBQUtpQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblx0aW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cdGltcG9ydCB7XHJcblx0XHRCQVNFX1VSTCxcclxuXHRcdFVTRVJfSU5GTyxcclxuXHRcdFNZU1RFTV9JTkZPLFxyXG5cdH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRcIjtcclxuXHJcblx0aW1wb3J0IEhUVFBVdGlsIGZyb20gJy4vdXRpbHMvSFRUUFV0aWwnXHJcblx0aW1wb3J0IHRpcCBmcm9tICcuL3V0aWxzL3RpcCdcclxuXHJcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcblx0XHRjb25maWcgPSB7XHJcblx0XHRcdHBhZ2VzOiBbXHJcblx0XHRcdFx0J3BhZ2VzL2hvbWUvaW5kZXgnLFxyXG5cdFx0XHRcdCdwYWdlcy9ob21lL3RvcCcsXHJcblx0XHRcdFx0J3BhZ2VzL2hvbWUvc2VhcmNoJyxcclxuXHRcdFx0XHQncGFnZXMvaG9tZS9tZScsXHJcblx0XHRcdFx0J3BhZ2VzL2hvbWVfZGV0YWlscycsXHJcblx0XHRcdFx0J3BhZ2VzL2dvb2RzX2RldGFpbHMnLFxyXG5cdFx0XHRcdCdwYWdlcy9zZWFyY2hfZGV0YWlscycsXHJcblx0XHRcdFx0J3BhZ2VzL2hlbHAvamlhb2NoZW5nJyxcclxuXHRcdFx0XHQncGFnZXMvaGVscC9qaWFvY2hlbmcxJyxcclxuXHRcdFx0XHQncGFnZXMvd2ViX3ZpZXcnLFxyXG5cclxuXHRcdFx0XHQncGFnZXMvYWdlbnQvdGl4aWFuJyxcclxuXHRcdFx0XHQncGFnZXMvYWdlbnQvcmVhZF90aXhpYW4nLFxyXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC9vcmRlcicsXHJcblx0XHRcdFx0J3BhZ2VzL2FnZW50L3VzZXInLFxyXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC9hZ2VudCcsXHJcblx0XHRcdFx0J3BhZ2VzL2FnZW50L3Nob3dfYXBwbHknLFxyXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC9hcHBseV9hZ2VudCcsXHJcblx0XHRcdF0sXHJcblx0XHRcdHdpbmRvdzoge1xyXG5cdFx0XHRcdGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuXHRcdFx0XHRuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmNTc3NycsXHJcblx0XHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+afoOaqrOWlveeJqScsXHJcblx0XHRcdFx0bmF2aWdhdGlvbkJhclRleHRTdHlsZTogJyNmZmYnLFxyXG5cdFx0XHRcdGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2ZlZmVmZScsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRhYkJhcjoge1xyXG5cdFx0XHRcdGNvbG9yOiBcIiM2NjZcIixcclxuXHRcdFx0XHRzZWxlY3RlZENvbG9yOiBcIiNmZjU3NzdcIixcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiLFxyXG5cdFx0XHRcdGJvcmRlclN0eWxlOiBcIiNiMmIyYjJcIixcclxuXHRcdFx0XHRsaXN0OiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHBhZ2VQYXRoOiAncGFnZXMvaG9tZS9pbmRleCcsXHJcblx0XHRcdFx0XHRcdHRleHQ6IFwi6aaW6aG1XCIsXHJcblx0XHRcdFx0XHRcdGljb25QYXRoOiBcImltYWdlcy9ob21lL2hvbWVwYWdlLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9ob21lL2hvbWVwYWdlX2ZpbGwucG5nXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHBhZ2VQYXRoOiAncGFnZXMvaG9tZS90b3AnLFxyXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIuWlvei0p+eyvumAiVwiLFxyXG5cdFx0XHRcdFx0XHRpY29uUGF0aDogXCJpbWFnZXMvaG9tZS9pbnRlZ3JhbC5wbmdcIixcclxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvaG9tZS9pbnRlZ3JhbF9maWxsLnBuZ1wiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRwYWdlUGF0aDogJ3BhZ2VzL2hvbWUvc2VhcmNoJyxcclxuXHRcdFx0XHRcdFx0dGV4dDogXCLmkJzntKJcIixcclxuXHRcdFx0XHRcdFx0aWNvblBhdGg6IFwiaW1hZ2VzL2hvbWUvc2VhcmNoLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9ob21lL3NlYXJjaF9maWxsLnBuZ1wiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRwYWdlUGF0aDogJ3BhZ2VzL2hvbWUvbWUnLFxyXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIuS4quS6uuS4reW/g1wiLFxyXG5cdFx0XHRcdFx0XHRpY29uUGF0aDogXCJpbWFnZXMvaG9tZS9wZW9wbGUucG5nXCIsXHJcblx0XHRcdFx0XHRcdHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL2hvbWUvcGVvcGxlX2ZpbGwucG5nXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnbG9iYWxEYXRhID0ge1xyXG5cdFx0XHR1c2VySW5mbzogbnVsbCxcclxuXHRcdFx0aXNXeENvZGU6ZmFsc2UsXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHN1cGVyKClcclxuXHRcdFx0dGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG5cdFx0XHR0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuXHRcdH1cclxuXHJcblx0XHRvbkxhdW5jaChvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuY2hlY2tJc1d4Q29kZShvcHRpb25zWydzY2VuZSddKTtcclxuXHRcdFx0aWYgKCF0aGlzLmdsb2JhbERhdGEuaXNXeENvZGUpIHtcclxuXHRcdFx0XHRsZXQgcmVxdWVzdENvZGUgPSB0aGlzLmdldFJlcXVlc3RDb2RlKG9wdGlvbnMpO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tMb2dpbihyZXF1ZXN0Q29kZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNoZWNrSXNXeENvZGUoc2NlbmUpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxEYXRhLmlzV3hDb2RlID0gc2NlbmUgPT0gMTA0NyB8fCBzY2VuZSA9PSAxMDQ4IHx8IHNjZW5lID09IDEwNDk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hlY2tMb2dpbihyZXF1ZXN0Q29kZSkge1xyXG5cdFx0XHRsZXQgdXNlckluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTykgfHwge307XHJcblx0XHRcdHd4LmNoZWNrU2Vzc2lvbih7XHJcblx0XHRcdFx0c3VjY2VzczogKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCghdXNlckluZm8ub3BlbmlkKSB8fCAoIXVzZXJJbmZvLm5pY2tOYW1lKSB8fCAoIXVzZXJJbmZvLmF2YXRhclVybCkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5sb2dpbihyZXF1ZXN0Q29kZSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdldEFnZW50Q29kZShyZXF1ZXN0Q29kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsOiAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmxvZ2luKHJlcXVlc3RDb2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0YXN5bmMgbG9naW4ocmVxdWVzdENvZGUpIHtcclxuXHRcdFx0bGV0IHJlcyA9IGF3YWl0IHdlcHkubG9naW4oKTtcclxuXHRcdFx0aWYgKHJlcy5jb2RlKSB7XHJcblx0XHRcdFx0bGV0IHVzZXJSZXN1bHQgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XHJcblx0XHRcdFx0bGV0IHVzZXJJbmZvID0gdXNlclJlc3VsdC51c2VySW5mbztcclxuXHJcblx0XHRcdFx0bGV0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcblx0XHRcdFx0d2VweS5zZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTywgc3lzdGVtSW5mbyk7XHJcblxyXG5cdFx0XHRcdGxldCBwYXJhbXMgPSB7XHJcblx0XHRcdFx0XHRjb2RlOiByZXMuY29kZSxcclxuXHRcdFx0XHRcdHJlcXVlc3RfY29kZTogcmVxdWVzdENvZGUsXHJcblx0XHRcdFx0XHRhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybCxcclxuXHRcdFx0XHRcdGNpdHk6IHVzZXJJbmZvLmNpdHksXHJcblx0XHRcdFx0XHRwcm92aW5jZTogdXNlckluZm8ucHJvdmluY2UsXHJcblx0XHRcdFx0XHRnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuXHRcdFx0XHRcdG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0bGV0IGRhdGEgPSB7XHJcblx0XHRcdFx0XHR1cmw6ICdhdXRoL2xvZ2luJyxcclxuXHRcdFx0XHRcdHBhcmFtczogcGFyYW1zLFxyXG5cdFx0XHRcdFx0c2NiOiAocmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicmVzdWx0OlwiLCByZXN1bHQpO1xyXG5cdFx0XHRcdFx0XHR1c2VySW5mb1snb3BlbmlkJ10gPSByZXN1bHRbJ29wZW5pZCddO1xyXG5cdFx0XHRcdFx0XHR1c2VySW5mb1snYWdlbnRDb2RlJ10gPSByZXN1bHRbJ2lzX2FnZW50J107XHJcblx0XHRcdFx0XHRcdHVzZXJJbmZvWydyZXF1ZXN0Q29kZSddID0gcmVzdWx0WydyZXF1ZXN0X2NvZGUnXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm87XHJcblx0XHRcdFx0XHRcdHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPLCB1c2VySW5mbyk7XHJcblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0SFRUUFV0aWwuZ2V0KGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0UmVxdWVzdENvZGUob3B0aW9ucykge1xyXG5cdFx0XHRsZXQgcXVlcnkgPSBvcHRpb25zWydxdWVyeSddO1xyXG5cdFx0XHRsZXQgcmVxdWVzdENvZGUgPSAnJztcclxuXHRcdFx0aWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KCdyZXF1ZXN0X2NvZGUnKSkge1xyXG5cdFx0XHRcdHJlcXVlc3RDb2RlID0gcXVlcnlbJ3JlcXVlc3RfY29kZSddO1xyXG5cdFx0XHR9XHJcbi8vXHRcdFx0dGlwLnN1Y2Nlc3MocmVxdWVzdENvZGUpO1xyXG5cdFx0XHRyZXR1cm4gcmVxdWVzdENvZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0QWdlbnRDb2RlKG9wdGlvbnMpIHtcclxuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy5nZXRVc2VySW5mbygpO1xyXG5cdFx0XHRsZXQgZGF0YSA9IHtcclxuXHRcdFx0XHR1cmw6ICdhdXRoL2NoZWNrX2FnZW50JyxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHBhcmFtczoge29wZW5pZDogdXNlckluZm8ub3BlbmlkfSxcclxuXHRcdFx0XHRzY2I6IChyZXN1bHQpID0+IHtcclxuXHRcdFx0XHRcdGxldCBhZ2VudENvZGUgPSByZXN1bHRbJ2lzX2FnZW50J107XHJcblx0XHRcdFx0XHRpZiAoYWdlbnRDb2RlID09ICctMScpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5sb2dpbihvcHRpb25zKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHVzZXJJbmZvWydhZ2VudENvZGUnXSA9IGFnZW50Q29kZTtcclxuXHRcdFx0XHRcdFx0dXNlckluZm9bJ3JlcXVlc3RDb2RlJ10gPSByZXN1bHRbJ3JlcXVlc3RfY29kZSddO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSB1c2VySW5mbztcclxuXHRcdFx0XHRcdFx0d2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIHVzZXJJbmZvKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9XHJcblx0XHRcdEhUVFBVdGlsLmdldChkYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRVc2VySW5mbygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyB8fCB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTylcclxuXHRcdH1cclxuXHR9XHJcbiJdfQ==