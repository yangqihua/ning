"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 提示与加载工具类
 */
var Tips = function () {
	function Tips() {
		_classCallCheck(this, Tips);

		this.isLoading = false;
	}

	/**
  * 弹出提示框
  */

	_createClass(Tips, null, [{
		key: "success",
		value: function success(title) {
			var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

			wx.showToast({
				title: title,
				image: "/images/yes.png",
				mask: true,
				duration: duration
			});
		}

		/**
   * 弹出确认窗口
   */

	}, {
		key: "confirm",
		value: function confirm(_ref) {
			var text = _ref.text,
			    _ref$payload = _ref.payload,
			    payload = _ref$payload === undefined ? {} : _ref$payload,
			    _ref$title = _ref.title,
			    title = _ref$title === undefined ? "温馨提示" : _ref$title,
			    _ref$cancelText = _ref.cancelText,
			    cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText,
			    _ref$confirmText = _ref.confirmText,
			    confirmText = _ref$confirmText === undefined ? '确定' : _ref$confirmText;

			return new Promise(function (resolve, reject) {
				wx.showModal({
					title: title,
					content: text,
					cancelText: cancelText,
					cancelColor: '#333',
					confirmText: confirmText,
					confirmColor: '#ff0077',
					showCancel: true,
					success: function success(res) {
						if (res.confirm) {
							resolve(payload);
						} else if (res.cancel) {
							reject(payload);
						}
					},
					fail: function fail(res) {
						reject(payload);
					}
				});
			});
		}

		/**
   * 弹出窗口
   */

	}, {
		key: "alert",
		value: function alert(_ref2) {
			var text = _ref2.text,
			    _ref2$payload = _ref2.payload,
			    payload = _ref2$payload === undefined ? {} : _ref2$payload,
			    _ref2$title = _ref2.title,
			    title = _ref2$title === undefined ? "提示" : _ref2$title;

			return new Promise(function (resolve, reject) {
				wx.showModal({
					title: title,
					content: text,
					showCancel: false,
					success: function success(res) {
						resolve(payload);
					},
					fail: function fail(res) {
						reject(payload);
					}
				});
			});
		}
	}, {
		key: "toast",
		value: function toast(title) {
			wx.showToast({
				title: title,
				image: "/images/info.png",
				mask: false,
				duration: 1500
			});
		}

		/**
   * 错误框
   */

	}, {
		key: "error",
		value: function error(title, onHide) {
			wx.showToast({
				title: title,
				image: "/images/error.png",
				mask: true,
				duration: 1500
			});
		}

		/**
   * 弹出加载提示
   */

	}, {
		key: "loading",
		value: function loading() {
			var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";

			if (Tips.isLoading) {
				return;
			}
			Tips.isLoading = true;
			wx.showLoading({
				title: title,
				mask: true
			});
		}

		/**
   * 加载完毕
   */

	}, {
		key: "loaded",
		value: function loaded() {
			if (Tips.isLoading) {
				Tips.isLoading = false;
				wx.hideLoading();
			}
		}
	}, {
		key: "share",
		value: function share(title, desc, imageUrl, path) {
			return {
				title: title,
				path: path,
				desc: desc,
				imageUrl: imageUrl,
				success: function success(res) {
					Tips.success("分享成功");
				},
				fail: function fail(err) {
					// Tips.error("取消分享");
				}
			};
		}
	}]);

	return Tips;
}();

/**
 * 静态变量，是否加载中
 */


exports.default = Tips;
Tips.isLoading = false;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpcC5qcyJdLCJuYW1lcyI6WyJUaXBzIiwiaXNMb2FkaW5nIiwidGl0bGUiLCJkdXJhdGlvbiIsInd4Iiwic2hvd1RvYXN0IiwiaW1hZ2UiLCJtYXNrIiwidGV4dCIsInBheWxvYWQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1Db2xvciIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImZhaWwiLCJvbkhpZGUiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwiZGVzYyIsImltYWdlVXJsIiwicGF0aCIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBLEk7QUFDcEIsaUJBQWM7QUFBQTs7QUFDYixPQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0E7O0FBRUQ7Ozs7OzswQkFJZUMsSyxFQUF3QjtBQUFBLE9BQWpCQyxRQUFpQix1RUFBTixJQUFNOztBQUN0Q0MsTUFBR0MsU0FBSCxDQUFhO0FBQ1pILFdBQU9BLEtBREs7QUFFWkksV0FBTyxpQkFGSztBQUdaQyxVQUFNLElBSE07QUFJWkosY0FBVUE7QUFKRSxJQUFiO0FBTUE7O0FBRUQ7Ozs7OztnQ0FHc0Y7QUFBQSxPQUF0RUssSUFBc0UsUUFBdEVBLElBQXNFO0FBQUEsMkJBQWhFQyxPQUFnRTtBQUFBLE9BQWhFQSxPQUFnRSxnQ0FBdEQsRUFBc0Q7QUFBQSx5QkFBbERQLEtBQWtEO0FBQUEsT0FBbERBLEtBQWtELDhCQUExQyxNQUEwQztBQUFBLDhCQUFuQ1EsVUFBbUM7QUFBQSxPQUFuQ0EsVUFBbUMsbUNBQXhCLElBQXdCO0FBQUEsK0JBQW5CQyxXQUFtQjtBQUFBLE9BQW5CQSxXQUFtQixvQ0FBUCxJQUFPOztBQUNyRixVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNWLE9BQUdXLFNBQUgsQ0FBYTtBQUNaYixZQUFPQSxLQURLO0FBRVpjLGNBQVNSLElBRkc7QUFHWkUsaUJBQVdBLFVBSEM7QUFJWk8sa0JBQVksTUFKQTtBQUtaTixrQkFBWUEsV0FMQTtBQU1aTyxtQkFBYSxTQU5EO0FBT1pDLGlCQUFZLElBUEE7QUFRWkMsY0FBUyxzQkFBTztBQUNmLFVBQUlDLElBQUlDLE9BQVIsRUFBaUI7QUFDaEJULGVBQVFKLE9BQVI7QUFDQSxPQUZELE1BRU8sSUFBSVksSUFBSUUsTUFBUixFQUFnQjtBQUN0QlQsY0FBT0wsT0FBUDtBQUNBO0FBQ0QsTUFkVztBQWVaZSxXQUFNLG1CQUFPO0FBQ1pWLGFBQU9MLE9BQVA7QUFDQTtBQWpCVyxLQUFiO0FBbUJBLElBcEJNLENBQVA7QUFxQkE7O0FBR0Q7Ozs7OzsrQkFHaUQ7QUFBQSxPQUFuQ0QsSUFBbUMsU0FBbkNBLElBQW1DO0FBQUEsNkJBQTdCQyxPQUE2QjtBQUFBLE9BQTdCQSxPQUE2QixpQ0FBbkIsRUFBbUI7QUFBQSwyQkFBZlAsS0FBZTtBQUFBLE9BQWZBLEtBQWUsK0JBQVAsSUFBTzs7QUFDaEQsVUFBTyxJQUFJVSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDVixPQUFHVyxTQUFILENBQWE7QUFDWmIsWUFBT0EsS0FESztBQUVaYyxjQUFTUixJQUZHO0FBR1pXLGlCQUFZLEtBSEE7QUFJWkMsY0FBUyxzQkFBTztBQUNmUCxjQUFRSixPQUFSO0FBQ0EsTUFOVztBQU9aZSxXQUFNLG1CQUFPO0FBQ1pWLGFBQU9MLE9BQVA7QUFDQTtBQVRXLEtBQWI7QUFXQSxJQVpNLENBQVA7QUFhQTs7O3dCQUVZUCxLLEVBQU87QUFDbkJFLE1BQUdDLFNBQUgsQ0FBYTtBQUNaSCxXQUFPQSxLQURLO0FBRVpJLFdBQU8sa0JBRks7QUFHWkMsVUFBTSxLQUhNO0FBSVpKLGNBQVU7QUFKRSxJQUFiO0FBTUE7O0FBR0Q7Ozs7Ozt3QkFHYUQsSyxFQUFPdUIsTSxFQUFRO0FBQzNCckIsTUFBR0MsU0FBSCxDQUFhO0FBQ1pILFdBQU9BLEtBREs7QUFFWkksV0FBTyxtQkFGSztBQUdaQyxVQUFNLElBSE07QUFJWkosY0FBVTtBQUpFLElBQWI7QUFNQTs7QUFFRDs7Ozs7OzRCQUc4QjtBQUFBLE9BQWZELEtBQWUsdUVBQVAsS0FBTzs7QUFDN0IsT0FBSUYsS0FBS0MsU0FBVCxFQUFvQjtBQUNuQjtBQUNBO0FBQ0RELFFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQUcsTUFBR3NCLFdBQUgsQ0FBZTtBQUNkeEIsV0FBT0EsS0FETztBQUVkSyxVQUFNO0FBRlEsSUFBZjtBQUlBOztBQUVEOzs7Ozs7MkJBR2dCO0FBQ2YsT0FBSVAsS0FBS0MsU0FBVCxFQUFvQjtBQUNuQkQsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBRyxPQUFHdUIsV0FBSDtBQUNBO0FBQ0Q7Ozt3QkFFWXpCLEssRUFBTzBCLEksRUFBS0MsUSxFQUFTQyxJLEVBQU07QUFDdkMsVUFBTztBQUNONUIsV0FBT0EsS0FERDtBQUVONEIsVUFBTUEsSUFGQTtBQUdORixVQUFNQSxJQUhBO0FBSU5DLGNBQVNBLFFBSkg7QUFLTlQsYUFBUyxpQkFBQ0MsR0FBRCxFQUFPO0FBQ2ZyQixVQUFLb0IsT0FBTCxDQUFhLE1BQWI7QUFDQSxLQVBLO0FBUU5JLFVBQUssY0FBQ08sR0FBRCxFQUFPO0FBQ1g7QUFDQTtBQVZLLElBQVA7QUFZQTs7Ozs7O0FBR0Y7Ozs7O2tCQS9IcUIvQixJO0FBa0lyQkEsS0FBS0MsU0FBTCxHQUFpQixLQUFqQiIsImZpbGUiOiJ0aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOaPkOekuuS4juWKoOi9veW3peWFt+exu1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXBzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlvLnlh7rmj5DnpLrmoYZcblx0ICovXG5cblx0c3RhdGljIHN1Y2Nlc3ModGl0bGUsIGR1cmF0aW9uID0gMTUwMCkge1xuXHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHR0aXRsZTogdGl0bGUsXG5cdFx0XHRpbWFnZTogXCIvaW1hZ2VzL3llcy5wbmdcIixcblx0XHRcdG1hc2s6IHRydWUsXG5cdFx0XHRkdXJhdGlvbjogZHVyYXRpb25cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlvLnlh7rnoa7orqTnqpflj6Ncblx0ICovXG5cdHN0YXRpYyBjb25maXJtKHt0ZXh0LCBwYXlsb2FkID0ge30sIHRpdGxlID0gXCLmuKnppqjmj5DnpLpcIixjYW5jZWxUZXh0PSflj5bmtognLGNvbmZpcm1UZXh0PSfnoa7lrponfSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR3eC5zaG93TW9kYWwoe1xuXHRcdFx0XHR0aXRsZTogdGl0bGUsXG5cdFx0XHRcdGNvbnRlbnQ6IHRleHQsXG5cdFx0XHRcdGNhbmNlbFRleHQ6Y2FuY2VsVGV4dCxcblx0XHRcdFx0Y2FuY2VsQ29sb3I6JyMzMzMnLFxuXHRcdFx0XHRjb25maXJtVGV4dDpjb25maXJtVGV4dCxcblx0XHRcdFx0Y29uZmlybUNvbG9yOicjZmYwMDc3Jyxcblx0XHRcdFx0c2hvd0NhbmNlbDogdHJ1ZSxcblx0XHRcdFx0c3VjY2VzczogcmVzID0+IHtcblx0XHRcdFx0XHRpZiAocmVzLmNvbmZpcm0pIHtcblx0XHRcdFx0XHRcdHJlc29sdmUocGF5bG9hZCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocGF5bG9hZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWlsOiByZXMgPT4ge1xuXHRcdFx0XHRcdHJlamVjdChwYXlsb2FkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiDlvLnlh7rnqpflj6Ncblx0ICovXG5cdHN0YXRpYyBhbGVydCh7dGV4dCwgcGF5bG9hZCA9IHt9LCB0aXRsZSA9IFwi5o+Q56S6XCJ9KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHd4LnNob3dNb2RhbCh7XG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdFx0Y29udGVudDogdGV4dCxcblx0XHRcdFx0c2hvd0NhbmNlbDogZmFsc2UsXG5cdFx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZShwYXlsb2FkKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFpbDogcmVzID0+IHtcblx0XHRcdFx0XHRyZWplY3QocGF5bG9hZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIHRvYXN0KHRpdGxlKSB7XG5cdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdGltYWdlOiBcIi9pbWFnZXMvaW5mby5wbmdcIixcblx0XHRcdG1hc2s6IGZhbHNlLFxuXHRcdFx0ZHVyYXRpb246IDE1MDBcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIOmUmeivr+ahhlxuXHQgKi9cblx0c3RhdGljIGVycm9yKHRpdGxlLCBvbkhpZGUpIHtcblx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0dGl0bGU6IHRpdGxlLFxuXHRcdFx0aW1hZ2U6IFwiL2ltYWdlcy9lcnJvci5wbmdcIixcblx0XHRcdG1hc2s6IHRydWUsXG5cdFx0XHRkdXJhdGlvbjogMTUwMFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIOW8ueWHuuWKoOi9veaPkOekulxuXHQgKi9cblx0c3RhdGljIGxvYWRpbmcodGl0bGUgPSBcIuWKoOi9veS4rVwiKSB7XG5cdFx0aWYgKFRpcHMuaXNMb2FkaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFRpcHMuaXNMb2FkaW5nID0gdHJ1ZTtcblx0XHR3eC5zaG93TG9hZGluZyh7XG5cdFx0XHR0aXRsZTogdGl0bGUsXG5cdFx0XHRtYXNrOiB0cnVlXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog5Yqg6L295a6M5q+VXG5cdCAqL1xuXHRzdGF0aWMgbG9hZGVkKCkge1xuXHRcdGlmIChUaXBzLmlzTG9hZGluZykge1xuXHRcdFx0VGlwcy5pc0xvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHd4LmhpZGVMb2FkaW5nKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHNoYXJlKHRpdGxlLCBkZXNjLGltYWdlVXJsLHBhdGgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IHRpdGxlLFxuXHRcdFx0cGF0aDogcGF0aCxcblx0XHRcdGRlc2M6IGRlc2MsXG5cdFx0XHRpbWFnZVVybDppbWFnZVVybCxcblx0XHRcdHN1Y2Nlc3M6IChyZXMpPT57XG5cdFx0XHRcdFRpcHMuc3VjY2VzcyhcIuWIhuS6q+aIkOWKn1wiKTtcblx0XHRcdH0sXG5cdFx0XHRmYWlsOihlcnIpPT57XG5cdFx0XHRcdC8vIFRpcHMuZXJyb3IoXCLlj5bmtojliIbkuqtcIik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufVxuXG4vKipcbiAqIOmdmeaAgeWPmOmHj++8jOaYr+WQpuWKoOi9veS4rVxuICovXG5UaXBzLmlzTG9hZGluZyA9IGZhbHNlO1xuIl19