'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingMore = function (_wepy$component) {
	_inherits(LoadingMore, _wepy$component);

	function LoadingMore() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, LoadingMore);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingMore.__proto__ || Object.getPrototypeOf(LoadingMore)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
			loadingStatus: {
				type: Number,
				default: 0 // 0 代表正在加载，1 代表暂无更多 2代表隐藏loading
			},
			message: {
				type: String,
				default: '正在加载 ...'
			},
			noMore: {
				type: String,
				default: '暂无更多 ~'
			}
		}, _this.computed = {
			text: function text() {
				if (this.loadingStatus == LoadingMore.LOADING || this.loadingStatus == LoadingMore.FINISHED) {
					return this.message;
				} else if (this.loadingStatus == LoadingMore.NO_MORE || this.loadingStatus == LoadingMore.ONE_PAGE) {
					return this.noMore;
				}
				return '';
			},
			show: function show() {
				if (this.loadingStatus == LoadingMore.LOADING || this.loadingStatus == LoadingMore.FINISHED) {
					return true;
				}
				return false;
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return LoadingMore;
}(_wepy2.default.component);

LoadingMore.LOADING = 0;
LoadingMore.NO_MORE = 1;
LoadingMore.ONE_PAGE = 2;
LoadingMore.FINISHED = 3;
LoadingMore.ERROR = 3;
exports.default = LoadingMore;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYWRpbmdNb3JlLmpzIl0sIm5hbWVzIjpbIkxvYWRpbmdNb3JlIiwicHJvcHMiLCJsb2FkaW5nU3RhdHVzIiwidHlwZSIsIk51bWJlciIsImRlZmF1bHQiLCJtZXNzYWdlIiwiU3RyaW5nIiwibm9Nb3JlIiwiY29tcHV0ZWQiLCJ0ZXh0IiwiTE9BRElORyIsIkZJTklTSEVEIiwiTk9fTU9SRSIsIk9ORV9QQUdFIiwic2hvdyIsImNvbXBvbmVudCIsIkVSUk9SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0M7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7OExBTXBCQyxLLEdBQVE7QUFDUEMsa0JBQWU7QUFDZEMsVUFBTUMsTUFEUTtBQUVkQyxhQUFTLENBRkssQ0FFSTtBQUZKLElBRFI7QUFLUEMsWUFBUztBQUNSSCxVQUFNSSxNQURFO0FBRVJGLGFBQVM7QUFGRCxJQUxGO0FBU1BHLFdBQU87QUFDTkwsVUFBTUksTUFEQTtBQUVORixhQUFTO0FBRkg7QUFUQSxHLFFBY1JJLFEsR0FBVztBQUNWQyxPQURVLGtCQUNKO0FBQ0wsUUFBRyxLQUFLUixhQUFMLElBQW9CRixZQUFZVyxPQUFoQyxJQUEyQyxLQUFLVCxhQUFMLElBQW9CRixZQUFZWSxRQUE5RSxFQUF1RjtBQUN0RixZQUFPLEtBQUtOLE9BQVo7QUFDQSxLQUZELE1BRU0sSUFBRyxLQUFLSixhQUFMLElBQW9CRixZQUFZYSxPQUFoQyxJQUEyQyxLQUFLWCxhQUFMLElBQW9CRixZQUFZYyxRQUE5RSxFQUF3RjtBQUM3RixZQUFPLEtBQUtOLE1BQVo7QUFDQTtBQUNELFdBQU8sRUFBUDtBQUNBLElBUlM7QUFTVk8sT0FUVSxrQkFTSjtBQUNMLFFBQUcsS0FBS2IsYUFBTCxJQUFvQkYsWUFBWVcsT0FBaEMsSUFBMkMsS0FBS1QsYUFBTCxJQUFvQkYsWUFBWVksUUFBOUUsRUFBdUY7QUFDdEYsWUFBTyxJQUFQO0FBQ0E7QUFDRCxXQUFPLEtBQVA7QUFDQTtBQWRTLEc7Ozs7RUFwQjZCLGVBQUtJLFM7O0FBQXpCaEIsVyxDQUNiVyxPLEdBQVUsQztBQURHWCxXLENBRWJhLE8sR0FBVSxDO0FBRkdiLFcsQ0FHYmMsUSxHQUFXLEM7QUFIRWQsVyxDQUliWSxRLEdBQVcsQztBQUpFWixXLENBS2JpQixLLEdBQVEsQztrQkFMS2pCLFciLCJmaWxlIjoiTG9hZGluZ01vcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ01vcmUgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0c3RhdGljIExPQURJTkcgPSAwO1xuXHRcdHN0YXRpYyBOT19NT1JFID0gMTtcblx0XHRzdGF0aWMgT05FX1BBR0UgPSAyO1xuXHRcdHN0YXRpYyBGSU5JU0hFRCA9IDM7XG5cdFx0c3RhdGljIEVSUk9SID0gMztcblx0XHRwcm9wcyA9IHtcblx0XHRcdGxvYWRpbmdTdGF0dXM6IHtcblx0XHRcdFx0dHlwZTogTnVtYmVyLFxuXHRcdFx0XHRkZWZhdWx0OiAwICAgICAgICAvLyAwIOS7o+ihqOato+WcqOWKoOi9ve+8jDEg5Luj6KGo5pqC5peg5pu05aSaIDLku6PooajpmpDol49sb2FkaW5nXG5cdFx0XHR9LFxuXHRcdFx0bWVzc2FnZToge1xuXHRcdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0XHRcdGRlZmF1bHQ6ICfmraPlnKjliqDovb0gLi4uJ1xuXHRcdFx0fSxcblx0XHRcdG5vTW9yZTp7XG5cdFx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdFx0ZGVmYXVsdDogJ+aaguaXoOabtOWkmiB+J1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0Y29tcHV0ZWQgPSB7XG5cdFx0XHR0ZXh0KCl7XG5cdFx0XHRcdGlmKHRoaXMubG9hZGluZ1N0YXR1cz09TG9hZGluZ01vcmUuTE9BRElORyB8fCB0aGlzLmxvYWRpbmdTdGF0dXM9PUxvYWRpbmdNb3JlLkZJTklTSEVEKXtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5tZXNzYWdlO1xuXHRcdFx0XHR9ZWxzZSBpZih0aGlzLmxvYWRpbmdTdGF0dXM9PUxvYWRpbmdNb3JlLk5PX01PUkUgfHwgdGhpcy5sb2FkaW5nU3RhdHVzPT1Mb2FkaW5nTW9yZS5PTkVfUEFHRSApe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm5vTW9yZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9LFxuXHRcdFx0c2hvdygpe1xuXHRcdFx0XHRpZih0aGlzLmxvYWRpbmdTdGF0dXM9PUxvYWRpbmdNb3JlLkxPQURJTkcgfHwgdGhpcy5sb2FkaW5nU3RhdHVzPT1Mb2FkaW5nTW9yZS5GSU5JU0hFRCl7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG4iXX0=