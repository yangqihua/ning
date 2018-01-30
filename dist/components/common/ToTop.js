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

var Search = function (_wepy$component) {
	_inherits(Search, _wepy$component);

	function Search() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Search);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
			scrollTop: {
				type: Number,
				default: 0
			}
		}, _this.methods = {
			goTop: function goTop(e) {
				wx.pageScrollTo({
					scrollTop: 0
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvVG9wLmpzIl0sIm5hbWVzIjpbIlNlYXJjaCIsInByb3BzIiwic2Nyb2xsVG9wIiwidHlwZSIsIk51bWJlciIsImRlZmF1bHQiLCJtZXRob2RzIiwiZ29Ub3AiLCJlIiwid3giLCJwYWdlU2Nyb2xsVG8iLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQzs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztvTEFDcEJDLEssR0FBUTtBQUNQQyxjQUFXO0FBQ1ZDLFVBQU1DLE1BREk7QUFFVkMsYUFBUztBQUZDO0FBREosRyxRQU1SQyxPLEdBQVU7QUFDVEMsUUFEUyxpQkFDSEMsQ0FERyxFQUNEO0FBQ1BDLE9BQUdDLFlBQUgsQ0FBZ0I7QUFDZlIsZ0JBQVc7QUFESSxLQUFoQjtBQUdBO0FBTFEsRzs7OztFQVB5QixlQUFLUyxTOztrQkFBcEJYLE0iLCJmaWxlIjoiVG9Ub3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cdGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcblx0XHRwcm9wcyA9IHtcblx0XHRcdHNjcm9sbFRvcDoge1xuXHRcdFx0XHR0eXBlOiBOdW1iZXIsXG5cdFx0XHRcdGRlZmF1bHQ6IDBcblx0XHRcdH0sXG5cdFx0fTtcblx0XHRtZXRob2RzID0ge1xuXHRcdFx0Z29Ub3AoZSl7XG5cdFx0XHRcdHd4LnBhZ2VTY3JvbGxUbyh7XG5cdFx0XHRcdFx0c2Nyb2xsVG9wOiAwXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbiJdfQ==