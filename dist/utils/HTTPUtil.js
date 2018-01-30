'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by yangqihua on 2017/01/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _constant = require('./constant.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPUtil = function () {
	function HTTPUtil() {
		_classCallCheck(this, HTTPUtil);
	}

	_createClass(HTTPUtil, null, [{
		key: 'wxRequest',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
				var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
				var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:

								headers['content-type'] = 'application/json';
								_context.next = 3;
								return _wepy2.default.request({
									url: url,
									data: params,
									method: method,
									header: headers
								});

							case 3:
								return _context.abrupt('return', _context.sent);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function wxRequest(_x4) {
				return _ref.apply(this, arguments);
			}

			return wxRequest;
		}()
	}, {
		key: 'get',
		value: function get(_ref2) {
			var url = _ref2.url,
			    _ref2$params = _ref2.params,
			    params = _ref2$params === undefined ? {} : _ref2$params,
			    scb = _ref2.scb,
			    ecb = _ref2.ecb,
			    _ref2$isLoading = _ref2.isLoading,
			    isLoading = _ref2$isLoading === undefined ? true : _ref2$isLoading;

			if (isLoading) {
				_tip2.default.loading();
			}
			url = _constant.BASE_URL + url;
			HTTPUtil.wxRequest(url, params).then(function (json) {
				if (isLoading) {
					_tip2.default.loaded();
				}
				var res = json.data;
				if (json['statusCode'] == 200) {
					if (res.code == 200) {
						scb && scb(res.data);
					}
				} else {
					if (json['statusCode'] == 500) {
						ecb && ecb('服务器异常');
					} else {
						ecb && ecb('状态码: ' + json['statusCode']);
					}
				}
			}, function (err) {
				if (isLoading) {
					_tip2.default.loaded();
				}
				_tip2.default.error("错误：" + err);
				ecb && ecb(err);
			});
		}
	}, {
		key: 'post',
		value: function post(_ref3) {
			var url = _ref3.url,
			    _ref3$params = _ref3.params,
			    params = _ref3$params === undefined ? {} : _ref3$params,
			    scb = _ref3.scb,
			    ecb = _ref3.ecb,
			    _ref3$isLoading = _ref3.isLoading,
			    isLoading = _ref3$isLoading === undefined ? true : _ref3$isLoading;

			if (isLoading) {
				_tip2.default.loading();
			}
			url = _constant.BASE_URL + url;
			HTTPUtil.wxRequest(url, params, 'POST').then(function (json) {
				if (isLoading) {
					_tip2.default.loaded();
				}
				var res = json.data;
				if (json['statusCode'] == 200) {
					if (res.code == 200) {
						scb && scb(res.data);
					}
				} else {
					ecb && ecb(json['errMsg']);
				}
			}, function (err) {
				if (isLoading) {
					_tip2.default.loaded();
				}
				ecb && ecb(err);
			});
		}
	}, {
		key: 'publicGet',
		value: function publicGet(_ref4) {
			var url = _ref4.url,
			    _ref4$params = _ref4.params,
			    params = _ref4$params === undefined ? {} : _ref4$params,
			    scb = _ref4.scb,
			    ecb = _ref4.ecb;
		}
	}, {
		key: 'deleteTempPic',
		value: function deleteTempPic(url) {
			console.log("url:", url);
			var params = {
				url: 'utils/delete_pic',
				isLoading: false,
				params: {
					name: url
				}
			};
			HTTPUtil.post(params);
		}
	}]);

	return HTTPUtil;
}();

exports.default = HTTPUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhUVFBVdGlsLmpzIl0sIm5hbWVzIjpbIkhUVFBVdGlsIiwidXJsIiwicGFyYW1zIiwibWV0aG9kIiwiaGVhZGVycyIsInJlcXVlc3QiLCJkYXRhIiwiaGVhZGVyIiwic2NiIiwiZWNiIiwiaXNMb2FkaW5nIiwibG9hZGluZyIsInd4UmVxdWVzdCIsInRoZW4iLCJqc29uIiwibG9hZGVkIiwicmVzIiwiY29kZSIsImVyciIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7OztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTUEsUTs7Ozs7Ozs7dUZBRWtCQyxHO1FBQUlDLE0sdUVBQVMsRTtRQUFHQyxNLHVFQUFPLEs7UUFBTUMsTyx1RUFBUSxFOzs7Ozs7QUFFM0RBLGdCQUFRLGNBQVIsSUFBMEIsa0JBQTFCOztlQUNhLGVBQUtDLE9BQUwsQ0FBYTtBQUN6QkosY0FBS0EsR0FEb0I7QUFFekJLLGVBQU1KLE1BRm1CO0FBR3pCQyxpQkFBUUEsTUFIaUI7QUFJekJJLGlCQUFRSDtBQUppQixTQUFiLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFRMEM7QUFBQSxPQUE1Q0gsR0FBNEMsU0FBNUNBLEdBQTRDO0FBQUEsNEJBQXZDQyxNQUF1QztBQUFBLE9BQXZDQSxNQUF1QyxnQ0FBOUIsRUFBOEI7QUFBQSxPQUExQk0sR0FBMEIsU0FBMUJBLEdBQTBCO0FBQUEsT0FBckJDLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLCtCQUFqQkMsU0FBaUI7QUFBQSxPQUFqQkEsU0FBaUIsbUNBQVAsSUFBTzs7QUFDdkQsT0FBR0EsU0FBSCxFQUFhO0FBQ1osa0JBQUlDLE9BQUo7QUFDQTtBQUNEVixTQUFNLHFCQUFXQSxHQUFqQjtBQUNBRCxZQUFTWSxTQUFULENBQW1CWCxHQUFuQixFQUF3QkMsTUFBeEIsRUFBZ0NXLElBQWhDLENBQXFDLFVBQUNDLElBQUQsRUFBVTtBQUM5QyxRQUFHSixTQUFILEVBQWM7QUFDYixtQkFBSUssTUFBSjtBQUNBO0FBQ0QsUUFBSUMsTUFBTUYsS0FBS1IsSUFBZjtBQUNBLFFBQUdRLEtBQUssWUFBTCxLQUFvQixHQUF2QixFQUEyQjtBQUMxQixTQUFHRSxJQUFJQyxJQUFKLElBQVUsR0FBYixFQUFpQjtBQUNoQlQsYUFBS0EsSUFBSVEsSUFBSVYsSUFBUixDQUFMO0FBQ0E7QUFDRCxLQUpELE1BSUs7QUFDSixTQUFHUSxLQUFLLFlBQUwsS0FBb0IsR0FBdkIsRUFBMkI7QUFDMUJMLGFBQUtBLElBQUksT0FBSixDQUFMO0FBQ0EsTUFGRCxNQUVLO0FBQ0pBLGFBQUtBLElBQUksVUFBUUssS0FBSyxZQUFMLENBQVosQ0FBTDtBQUNBO0FBQ0Q7QUFDRCxJQWhCRCxFQWdCRyxVQUFDSSxHQUFELEVBQVM7QUFDWCxRQUFHUixTQUFILEVBQWM7QUFDYixtQkFBSUssTUFBSjtBQUNBO0FBQ0Qsa0JBQUlJLEtBQUosQ0FBVSxRQUFNRCxHQUFoQjtBQUNBVCxXQUFPQSxJQUFJUyxHQUFKLENBQVA7QUFDQSxJQXRCRDtBQXVCQTs7OzhCQUN3RDtBQUFBLE9BQTVDakIsR0FBNEMsU0FBNUNBLEdBQTRDO0FBQUEsNEJBQXZDQyxNQUF1QztBQUFBLE9BQXZDQSxNQUF1QyxnQ0FBOUIsRUFBOEI7QUFBQSxPQUExQk0sR0FBMEIsU0FBMUJBLEdBQTBCO0FBQUEsT0FBckJDLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLCtCQUFqQkMsU0FBaUI7QUFBQSxPQUFqQkEsU0FBaUIsbUNBQVAsSUFBTzs7QUFDeEQsT0FBR0EsU0FBSCxFQUFhO0FBQ1osa0JBQUlDLE9BQUo7QUFDQTtBQUNEVixTQUFNLHFCQUFXQSxHQUFqQjtBQUNBRCxZQUFTWSxTQUFULENBQW1CWCxHQUFuQixFQUF3QkMsTUFBeEIsRUFBK0IsTUFBL0IsRUFBdUNXLElBQXZDLENBQTRDLFVBQUNDLElBQUQsRUFBVTtBQUNyRCxRQUFHSixTQUFILEVBQWM7QUFDYixtQkFBSUssTUFBSjtBQUNBO0FBQ0QsUUFBSUMsTUFBTUYsS0FBS1IsSUFBZjtBQUNBLFFBQUdRLEtBQUssWUFBTCxLQUFvQixHQUF2QixFQUEyQjtBQUMxQixTQUFHRSxJQUFJQyxJQUFKLElBQVUsR0FBYixFQUFpQjtBQUNoQlQsYUFBS0EsSUFBSVEsSUFBSVYsSUFBUixDQUFMO0FBQ0E7QUFDRCxLQUpELE1BSUs7QUFDSkcsWUFBS0EsSUFBSUssS0FBSyxRQUFMLENBQUosQ0FBTDtBQUNBO0FBQ0QsSUFaRCxFQVlHLFVBQUNJLEdBQUQsRUFBUztBQUNYLFFBQUdSLFNBQUgsRUFBYztBQUNiLG1CQUFJSyxNQUFKO0FBQ0E7QUFDRE4sV0FBT0EsSUFBSVMsR0FBSixDQUFQO0FBQ0EsSUFqQkQ7QUFrQkE7OzttQ0FFOEM7QUFBQSxPQUE3QmpCLEdBQTZCLFNBQTdCQSxHQUE2QjtBQUFBLDRCQUF4QkMsTUFBd0I7QUFBQSxPQUF4QkEsTUFBd0IsZ0NBQWYsRUFBZTtBQUFBLE9BQVhNLEdBQVcsU0FBWEEsR0FBVztBQUFBLE9BQU5DLEdBQU0sU0FBTkEsR0FBTTtBQUM5Qzs7O2dDQUVvQlIsRyxFQUFJO0FBQ3hCbUIsV0FBUUMsR0FBUixDQUFZLE1BQVosRUFBbUJwQixHQUFuQjtBQUNBLE9BQUlDLFNBQVM7QUFDWkQsU0FBSSxrQkFEUTtBQUVaUyxlQUFVLEtBRkU7QUFHWlIsWUFBTztBQUNOb0IsV0FBS3JCO0FBREM7QUFISyxJQUFiO0FBT0FELFlBQVN1QixJQUFULENBQWNyQixNQUFkO0FBQ0E7Ozs7OztrQkFLYUYsUSIsImZpbGUiOiJIVFRQVXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB5YW5ncWlodWEgb24gMjAxNy8wMS8xNy5cbiAqL1xuaW1wb3J0IHtCQVNFX1VSTH0gZnJvbSAnLi9jb25zdGFudCdcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHRpcCBmcm9tICcuL3RpcCdcblxuY2xhc3MgSFRUUFV0aWwge1xuXG5cdHN0YXRpYyBhc3luYyB3eFJlcXVlc3QodXJsLHBhcmFtcyA9IHt9LG1ldGhvZD0nR0VUJyxoZWFkZXJzPXt9KSB7XG5cblx0XHRoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcblx0XHRyZXR1cm4gYXdhaXQgd2VweS5yZXF1ZXN0KHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0ZGF0YTogcGFyYW1zLFxuXHRcdFx0bWV0aG9kOiBtZXRob2QsXG5cdFx0XHRoZWFkZXI6IGhlYWRlcnMsXG5cdFx0fSk7XG5cdH07XG5cblx0c3RhdGljIGdldCh7dXJsLCBwYXJhbXMgPSB7fSwgc2NiLCBlY2IsaXNMb2FkaW5nPXRydWV9KSB7XG5cdFx0aWYoaXNMb2FkaW5nKXtcblx0XHRcdHRpcC5sb2FkaW5nKCk7XG5cdFx0fVxuXHRcdHVybCA9IEJBU0VfVVJMICsgdXJsO1xuXHRcdEhUVFBVdGlsLnd4UmVxdWVzdCh1cmwsIHBhcmFtcykudGhlbigoanNvbikgPT4ge1xuXHRcdFx0aWYoaXNMb2FkaW5nKSB7XG5cdFx0XHRcdHRpcC5sb2FkZWQoKTtcblx0XHRcdH1cblx0XHRcdGxldCByZXMgPSBqc29uLmRhdGE7XG5cdFx0XHRpZihqc29uWydzdGF0dXNDb2RlJ109PTIwMCl7XG5cdFx0XHRcdGlmKHJlcy5jb2RlPT0yMDApe1xuXHRcdFx0XHRcdHNjYiYmc2NiKHJlcy5kYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKGpzb25bJ3N0YXR1c0NvZGUnXT09NTAwKXtcblx0XHRcdFx0XHRlY2ImJmVjYign5pyN5Yqh5Zmo5byC5bi4Jyk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGVjYiYmZWNiKCfnirbmgIHnoIE6ICcranNvblsnc3RhdHVzQ29kZSddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIChlcnIpID0+IHtcblx0XHRcdGlmKGlzTG9hZGluZykge1xuXHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHR9XG5cdFx0XHR0aXAuZXJyb3IoXCLplJnor6/vvJpcIitlcnIpO1xuXHRcdFx0ZWNiICYmIGVjYihlcnIpO1xuXHRcdH0pXG5cdH1cblx0c3RhdGljIHBvc3Qoe3VybCwgcGFyYW1zID0ge30sIHNjYiwgZWNiLGlzTG9hZGluZz10cnVlfSkge1xuXHRcdGlmKGlzTG9hZGluZyl7XG5cdFx0XHR0aXAubG9hZGluZygpO1xuXHRcdH1cblx0XHR1cmwgPSBCQVNFX1VSTCArIHVybDtcblx0XHRIVFRQVXRpbC53eFJlcXVlc3QodXJsLCBwYXJhbXMsJ1BPU1QnKS50aGVuKChqc29uKSA9PiB7XG5cdFx0XHRpZihpc0xvYWRpbmcpIHtcblx0XHRcdFx0dGlwLmxvYWRlZCgpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlcyA9IGpzb24uZGF0YTtcblx0XHRcdGlmKGpzb25bJ3N0YXR1c0NvZGUnXT09MjAwKXtcblx0XHRcdFx0aWYocmVzLmNvZGU9PTIwMCl7XG5cdFx0XHRcdFx0c2NiJiZzY2IocmVzLmRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0ZWNiJiZlY2IoanNvblsnZXJyTXNnJ10pO1xuXHRcdFx0fVxuXHRcdH0sIChlcnIpID0+IHtcblx0XHRcdGlmKGlzTG9hZGluZykge1xuXHRcdFx0XHR0aXAubG9hZGVkKCk7XG5cdFx0XHR9XG5cdFx0XHRlY2IgJiYgZWNiKGVycik7XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBwdWJsaWNHZXQoe3VybCwgcGFyYW1zID0ge30sIHNjYiwgZWNifSkge1xuXHR9XG5cblx0c3RhdGljIGRlbGV0ZVRlbXBQaWModXJsKXtcblx0XHRjb25zb2xlLmxvZyhcInVybDpcIix1cmwpO1xuXHRcdGxldCBwYXJhbXMgPSB7XG5cdFx0XHR1cmw6J3V0aWxzL2RlbGV0ZV9waWMnLFxuXHRcdFx0aXNMb2FkaW5nOmZhbHNlLFxuXHRcdFx0cGFyYW1zOntcblx0XHRcdFx0bmFtZTp1cmwsXG5cdFx0XHR9XG5cdFx0fVxuXHRcdEhUVFBVdGlsLnBvc3QocGFyYW1zKTtcblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSFRUUFV0aWw7Il19