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
										userInfo['checkout'] = result['checkout'];
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
						userInfo['checkout'] = result['checkout'];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpc1d4Q29kZSIsInVzZSIsIm9wdGlvbnMiLCJjaGVja0lzV3hDb2RlIiwicmVxdWVzdENvZGUiLCJnZXRSZXF1ZXN0Q29kZSIsImNoZWNrTG9naW4iLCJzY2VuZSIsImdldFN0b3JhZ2VTeW5jIiwid3giLCJjaGVja1Nlc3Npb24iLCJzdWNjZXNzIiwib3BlbmlkIiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJsb2dpbiIsImdldEFnZW50Q29kZSIsImZhaWwiLCJyZXMiLCJjb2RlIiwiZ2V0VXNlckluZm8iLCJ1c2VyUmVzdWx0Iiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwic2V0U3RvcmFnZVN5bmMiLCJwYXJhbXMiLCJyZXF1ZXN0X2NvZGUiLCJjaXR5IiwicHJvdmluY2UiLCJnZW5kZXIiLCJkYXRhIiwidXJsIiwic2NiIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImdldCIsInF1ZXJ5IiwiaGFzT3duUHJvcGVydHkiLCJpc0xvYWRpbmciLCJhZ2VudENvZGUiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1RUMscUJBQWM7QUFBQTs7QUFBQTs7QUFBQSxRQXBFZEEsTUFv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QjtBQUNBLFNBQUlPLGFBQWEsSUFBakIsRUFBdUI7QUFDdEIsYUFBS3pCLEtBQUwsQ0FBV2IsT0FBWDtBQUNBLE1BRkQsTUFFTztBQUNOSCxlQUFTLFdBQVQsSUFBd0J5QyxTQUF4QjtBQUNBekMsZUFBUyxVQUFULElBQXVCa0MsT0FBTyxVQUFQLENBQXZCO0FBQ0FsQyxlQUFTLGFBQVQsSUFBMEJrQyxPQUFPLGNBQVAsQ0FBMUI7QUFDQSxhQUFLbkMsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJBLFFBQTNCO0FBQ0EscUJBQUt5QixjQUFMLHNCQUErQnpCLFFBQS9CO0FBQ0E7QUFDRDtBQWZTLElBQVg7QUFpQkEsc0JBQVNxQyxHQUFULENBQWFOLElBQWI7QUFDQTs7O2dDQUVhO0FBQ2IsVUFBTyxLQUFLaEMsVUFBTCxDQUFnQkMsUUFBaEIsSUFBNEIsZUFBS1MsY0FBTCxxQkFBbkM7QUFDQTs7OztFQTdLMkIsZUFBS2lDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblx0aW1wb3J0IHtcblx0XHRCQVNFX1VSTCxcblx0XHRVU0VSX0lORk8sXG5cdFx0U1lTVEVNX0lORk8sXG5cdH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRcIjtcblxuXHRpbXBvcnQgSFRUUFV0aWwgZnJvbSAnLi91dGlscy9IVFRQVXRpbCdcblx0aW1wb3J0IHRpcCBmcm9tICcuL3V0aWxzL3RpcCdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRwYWdlczogW1xuXHRcdFx0XHQncGFnZXMvaG9tZS9pbmRleCcsXG5cdFx0XHRcdCdwYWdlcy9ob21lL3RvcCcsXG5cdFx0XHRcdCdwYWdlcy9ob21lL3NlYXJjaCcsXG5cdFx0XHRcdCdwYWdlcy9ob21lL21lJyxcblx0XHRcdFx0J3BhZ2VzL2hvbWVfZGV0YWlscycsXG5cdFx0XHRcdCdwYWdlcy9nb29kc19kZXRhaWxzJyxcblx0XHRcdFx0J3BhZ2VzL3NlYXJjaF9kZXRhaWxzJyxcblx0XHRcdFx0J3BhZ2VzL2hlbHAvamlhb2NoZW5nJyxcblx0XHRcdFx0J3BhZ2VzL2hlbHAvamlhb2NoZW5nMScsXG5cdFx0XHRcdCdwYWdlcy93ZWJfdmlldycsXG5cblx0XHRcdFx0J3BhZ2VzL2FnZW50L3RpeGlhbicsXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC9yZWFkX3RpeGlhbicsXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC9vcmRlcicsXG5cdFx0XHRcdCdwYWdlcy9hZ2VudC91c2VyJyxcblx0XHRcdFx0J3BhZ2VzL2FnZW50L2FnZW50Jyxcblx0XHRcdFx0J3BhZ2VzL2FnZW50L3Nob3dfYXBwbHknLFxuXHRcdFx0XHQncGFnZXMvYWdlbnQvYXBwbHlfYWdlbnQnLFxuXHRcdFx0XSxcblx0XHRcdHdpbmRvdzoge1xuXHRcdFx0XHRiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG5cdFx0XHRcdG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmY1Nzc3Jyxcblx0XHRcdFx0bmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+afoOaqrOWlveeJqScsXG5cdFx0XHRcdG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcjZmZmJyxcblx0XHRcdFx0ZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2ZlZmVmZScsXG5cdFx0XHR9LFxuXHRcdFx0dGFiQmFyOiB7XG5cdFx0XHRcdGNvbG9yOiBcIiM2NjZcIixcblx0XHRcdFx0c2VsZWN0ZWRDb2xvcjogXCIjZmY1Nzc3XCIsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXG5cdFx0XHRcdGJvcmRlclN0eWxlOiBcIiNiMmIyYjJcIixcblx0XHRcdFx0bGlzdDogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBhZ2VQYXRoOiAncGFnZXMvaG9tZS9pbmRleCcsXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIummlumhtVwiLFxuXHRcdFx0XHRcdFx0aWNvblBhdGg6IFwiaW1hZ2VzL2hvbWUvaG9tZXBhZ2UucG5nXCIsXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9ob21lL2hvbWVwYWdlX2ZpbGwucG5nXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBhZ2VQYXRoOiAncGFnZXMvaG9tZS90b3AnLFxuXHRcdFx0XHRcdFx0dGV4dDogXCLlpb3otKfnsr7pgIlcIixcblx0XHRcdFx0XHRcdGljb25QYXRoOiBcImltYWdlcy9ob21lL2ludGVncmFsLnBuZ1wiLFxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvaG9tZS9pbnRlZ3JhbF9maWxsLnBuZ1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYWdlUGF0aDogJ3BhZ2VzL2hvbWUvc2VhcmNoJyxcblx0XHRcdFx0XHRcdHRleHQ6IFwi5pCc57SiXCIsXG5cdFx0XHRcdFx0XHRpY29uUGF0aDogXCJpbWFnZXMvaG9tZS9zZWFyY2gucG5nXCIsXG5cdFx0XHRcdFx0XHRzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9ob21lL3NlYXJjaF9maWxsLnBuZ1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYWdlUGF0aDogJ3BhZ2VzL2hvbWUvbWUnLFxuXHRcdFx0XHRcdFx0dGV4dDogXCLkuKrkurrkuK3lv4NcIixcblx0XHRcdFx0XHRcdGljb25QYXRoOiBcImltYWdlcy9ob21lL3Blb3BsZS5wbmdcIixcblx0XHRcdFx0XHRcdHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL2hvbWUvcGVvcGxlX2ZpbGwucG5nXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRnbG9iYWxEYXRhID0ge1xuXHRcdFx0dXNlckluZm86IG51bGwsXG5cdFx0XHRpc1d4Q29kZTpmYWxzZSxcblx0XHR9XG5cblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMudXNlKCdyZXF1ZXN0Zml4Jylcblx0XHRcdHRoaXMudXNlKCdwcm9taXNpZnknKVxuXHRcdH1cblxuXHRcdG9uTGF1bmNoKG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuY2hlY2tJc1d4Q29kZShvcHRpb25zWydzY2VuZSddKTtcblx0XHRcdGlmICghdGhpcy5nbG9iYWxEYXRhLmlzV3hDb2RlKSB7XG5cdFx0XHRcdGxldCByZXF1ZXN0Q29kZSA9IHRoaXMuZ2V0UmVxdWVzdENvZGUob3B0aW9ucyk7XG5cdFx0XHRcdHRoaXMuY2hlY2tMb2dpbihyZXF1ZXN0Q29kZSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjaGVja0lzV3hDb2RlKHNjZW5lKSB7XG5cdFx0XHR0aGlzLmdsb2JhbERhdGEuaXNXeENvZGUgPSBzY2VuZSA9PSAxMDQ3IHx8IHNjZW5lID09IDEwNDggfHwgc2NlbmUgPT0gMTA0OTtcblx0XHR9XG5cblx0XHRjaGVja0xvZ2luKHJlcXVlc3RDb2RlKSB7XG5cdFx0XHRsZXQgdXNlckluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTykgfHwge307XG5cdFx0XHR3eC5jaGVja1Nlc3Npb24oe1xuXHRcdFx0XHRzdWNjZXNzOiAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCghdXNlckluZm8ub3BlbmlkKSB8fCAoIXVzZXJJbmZvLm5pY2tOYW1lKSB8fCAoIXVzZXJJbmZvLmF2YXRhclVybCkpIHtcblx0XHRcdFx0XHRcdHRoaXMubG9naW4ocmVxdWVzdENvZGUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEFnZW50Q29kZShyZXF1ZXN0Q29kZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWlsOiAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2dpbihyZXF1ZXN0Q29kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0YXN5bmMgbG9naW4ocmVxdWVzdENvZGUpIHtcblx0XHRcdGxldCByZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XG5cdFx0XHRpZiAocmVzLmNvZGUpIHtcblx0XHRcdFx0bGV0IHVzZXJSZXN1bHQgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XG5cdFx0XHRcdGxldCB1c2VySW5mbyA9IHVzZXJSZXN1bHQudXNlckluZm87XG5cblx0XHRcdFx0bGV0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG5cdFx0XHRcdHdlcHkuc2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8sIHN5c3RlbUluZm8pO1xuXG5cdFx0XHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHRcdFx0Y29kZTogcmVzLmNvZGUsXG5cdFx0XHRcdFx0cmVxdWVzdF9jb2RlOiByZXF1ZXN0Q29kZSxcblx0XHRcdFx0XHRhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybCxcblx0XHRcdFx0XHRjaXR5OiB1c2VySW5mby5jaXR5LFxuXHRcdFx0XHRcdHByb3ZpbmNlOiB1c2VySW5mby5wcm92aW5jZSxcblx0XHRcdFx0XHRnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcblx0XHRcdFx0XHRuaWNrTmFtZTogdXNlckluZm8ubmlja05hbWVcblx0XHRcdFx0fTtcblx0XHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdFx0dXJsOiAnYXV0aC9sb2dpbicsXG5cdFx0XHRcdFx0cGFyYW1zOiBwYXJhbXMsXG5cdFx0XHRcdFx0c2NiOiAocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInJlc3VsdDpcIiwgcmVzdWx0KTtcblx0XHRcdFx0XHRcdHVzZXJJbmZvWydvcGVuaWQnXSA9IHJlc3VsdFsnb3BlbmlkJ107XG5cdFx0XHRcdFx0XHR1c2VySW5mb1snYWdlbnRDb2RlJ10gPSByZXN1bHRbJ2lzX2FnZW50J107XG5cdFx0XHRcdFx0XHR1c2VySW5mb1snY2hlY2tvdXQnXSA9IHJlc3VsdFsnY2hlY2tvdXQnXTtcblx0XHRcdFx0XHRcdHVzZXJJbmZvWydyZXF1ZXN0Q29kZSddID0gcmVzdWx0WydyZXF1ZXN0X2NvZGUnXTtcblx0XHRcdFx0XHRcdHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvO1xuXHRcdFx0XHRcdFx0d2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIHVzZXJJbmZvKTtcblxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH1cblx0XHRcdFx0SFRUUFV0aWwuZ2V0KGRhdGEpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldFJlcXVlc3RDb2RlKG9wdGlvbnMpIHtcblx0XHRcdGxldCBxdWVyeSA9IG9wdGlvbnNbJ3F1ZXJ5J107XG5cdFx0XHRsZXQgcmVxdWVzdENvZGUgPSAnJztcblx0XHRcdGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eSgncmVxdWVzdF9jb2RlJykpIHtcblx0XHRcdFx0cmVxdWVzdENvZGUgPSBxdWVyeVsncmVxdWVzdF9jb2RlJ107XG5cdFx0XHR9XG4vL1x0XHRcdHRpcC5zdWNjZXNzKHJlcXVlc3RDb2RlKTtcblx0XHRcdHJldHVybiByZXF1ZXN0Q29kZTtcblx0XHR9XG5cblx0XHRnZXRBZ2VudENvZGUob3B0aW9ucykge1xuXHRcdFx0bGV0IHVzZXJJbmZvID0gdGhpcy5nZXRVc2VySW5mbygpO1xuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHVybDogJ2F1dGgvY2hlY2tfYWdlbnQnLFxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRwYXJhbXM6IHtvcGVuaWQ6IHVzZXJJbmZvLm9wZW5pZH0sXG5cdFx0XHRcdHNjYjogKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdGxldCBhZ2VudENvZGUgPSByZXN1bHRbJ2lzX2FnZW50J107XG5cdFx0XHRcdFx0aWYgKGFnZW50Q29kZSA9PSAnLTEnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmxvZ2luKG9wdGlvbnMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR1c2VySW5mb1snYWdlbnRDb2RlJ10gPSBhZ2VudENvZGU7XG5cdFx0XHRcdFx0XHR1c2VySW5mb1snY2hlY2tvdXQnXSA9IHJlc3VsdFsnY2hlY2tvdXQnXTtcblx0XHRcdFx0XHRcdHVzZXJJbmZvWydyZXF1ZXN0Q29kZSddID0gcmVzdWx0WydyZXF1ZXN0X2NvZGUnXTtcblx0XHRcdFx0XHRcdHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvO1xuXHRcdFx0XHRcdFx0d2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIHVzZXJJbmZvKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0XHRIVFRQVXRpbC5nZXQoZGF0YSk7XG5cdFx0fVxuXG5cdFx0Z2V0VXNlckluZm8oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvIHx8IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPKVxuXHRcdH1cblx0fVxuIl19