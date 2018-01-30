'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ListItem = require('./ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _constant = require('./../../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodsList = function (_wepy$component) {
	_inherits(GoodsList, _wepy$component);

	function GoodsList() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, GoodsList);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsList.__proto__ || Object.getPrototypeOf(GoodsList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
			goodsList: Array,
			scrollTop: Number
		}, _this.$repeat = { "goodsList": { "com": "listItem", "props": "item.sync" } }, _this.$props = { "listItem": { "xmlns:v-bind": { "value": "", "for": "goodsList", "item": "item", "index": "index", "key": "index" }, "v-bind:item.sync": { "value": "item", "type": "item", "for": "goodsList", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
			listItem: _ListItem2.default
		}, _this.data = {
			scrollTop: 0,
			isAgent: false
		}, _this.methods = {
			goTop: function goTop(e) {
				wx.pageScrollTo({
					scrollTop: 0
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return GoodsList;
}(_wepy2.default.component);

exports.default = GoodsList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvb2RzTGlzdC5qcyJdLCJuYW1lcyI6WyJHb29kc0xpc3QiLCJwcm9wcyIsImdvb2RzTGlzdCIsIkFycmF5Iiwic2Nyb2xsVG9wIiwiTnVtYmVyIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibGlzdEl0ZW0iLCJkYXRhIiwiaXNBZ2VudCIsIm1ldGhvZHMiLCJnb1RvcCIsImUiLCJ3eCIsInBhZ2VTY3JvbGxUbyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUtxQkEsUzs7Ozs7Ozs7Ozs7Ozs7MExBQ3BCQyxLLEdBQVE7QUFDUEMsY0FBV0MsS0FESjtBQUVQQyxjQUFVQztBQUZILEcsUUFJVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sVUFBUCxFQUFrQixTQUFRLFdBQTFCLEVBQWIsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLE9BQWxFLEVBQWhCLEVBQTJGLG9CQUFtQixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sV0FBcEMsRUFBZ0QsUUFBTyxNQUF2RCxFQUE4RCxTQUFRLE9BQXRFLEVBQThFLE9BQU0sT0FBcEYsRUFBOUcsRUFBWixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNYQztBQURXLEcsUUFHWkMsSSxHQUFPO0FBQ05QLGNBQVUsQ0FESjtBQUVOUSxZQUFRO0FBRkYsRyxRQUlQQyxPLEdBQVU7QUFDVEMsUUFEUyxpQkFDSEMsQ0FERyxFQUNEO0FBQ1BDLE9BQUdDLFlBQUgsQ0FBZ0I7QUFDZmIsZ0JBQVc7QUFESSxLQUFoQjtBQUdBO0FBTFEsRzs7OztFQWY0QixlQUFLYyxTOztrQkFBdkJsQixTIiwiZmlsZSI6Ikdvb2RzTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5Jztcblx0aW1wb3J0IExpc3RJdGVtIGZyb20gJy4vTGlzdEl0ZW0nXG5cdGltcG9ydCB7XG5cdFx0QkFTRV9VUkwsXG5cdFx0VVNFUl9JTkZPLFxuXHRcdFNZU1RFTV9JTkZPLFxuXHR9IGZyb20gXCIuLi8uLi91dGlscy9jb25zdGFudFwiO1xuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBHb29kc0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cdFx0cHJvcHMgPSB7XG5cdFx0XHRnb29kc0xpc3Q6IEFycmF5LFxuXHRcdFx0c2Nyb2xsVG9wOk51bWJlclxuXHRcdH1cblx0JHJlcGVhdCA9IHtcImdvb2RzTGlzdFwiOntcImNvbVwiOlwibGlzdEl0ZW1cIixcInByb3BzXCI6XCJpdGVtLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJsaXN0SXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXRlbS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ29vZHNMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG5cdGNvbXBvbmVudHMgPSB7XG5cdFx0XHRsaXN0SXRlbTpMaXN0SXRlbSxcblx0XHR9XG5cdFx0ZGF0YSA9IHtcblx0XHRcdHNjcm9sbFRvcDowLFxuXHRcdFx0aXNBZ2VudDpmYWxzZSxcblx0XHR9XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdGdvVG9wKGUpe1xuXHRcdFx0XHR3eC5wYWdlU2Nyb2xsVG8oe1xuXHRcdFx0XHRcdHNjcm9sbFRvcDogMFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuIl19