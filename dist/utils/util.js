'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getCurrentTime = getCurrentTime;
exports.objLength = objLength;
exports.vailPhone = vailPhone;
exports.displayProp = displayProp;
exports.sTrim = sTrim;
exports.replaceMaohao = replaceMaohao;
function getCurrentTime() {
	var keep = '';
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	var rand = Math.round(Math.random() * 899 + 100);
	keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
	return keep; //20160614134947
}

function objLength(input) {
	var type = toString(input);
	var length = 0;
	if (type != "[object Object]") {
		//throw "输入必须为对象{}！"
	} else {
		for (var key in input) {
			if (key != "number") {
				length++;
			}
		}
	}
	return length;
}
//验证是否是手机号码
function vailPhone(number) {
	var flag = false;
	var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (number.length != 11) {
		flag = flag;
	} else if (!myreg.test(number)) {
		flag = flag;
	} else {
		flag = true;
	}
	return flag;
}

// 遍历对象属性和值
function displayProp(obj) {
	var names = "";
	for (var name in obj) {
		names += name + obj[name];
	}
	return names;
}
// 去除字符串所有空格
function sTrim(text) {
	return text.replace(/\s/ig, '');
}
//去除所有:
function replaceMaohao(txt) {
	return txt.replace(/\:/ig, '');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiZ2V0Q3VycmVudFRpbWUiLCJvYmpMZW5ndGgiLCJ2YWlsUGhvbmUiLCJkaXNwbGF5UHJvcCIsInNUcmltIiwicmVwbGFjZU1hb2hhbyIsImtlZXAiLCJkYXRlIiwiRGF0ZSIsInkiLCJnZXRGdWxsWWVhciIsIm0iLCJnZXRNb250aCIsImQiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwiZiIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJhbmQiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJpbnB1dCIsInR5cGUiLCJ0b1N0cmluZyIsImxlbmd0aCIsImtleSIsIm51bWJlciIsImZsYWciLCJteXJlZyIsInRlc3QiLCJvYmoiLCJuYW1lcyIsIm5hbWUiLCJ0ZXh0IiwicmVwbGFjZSIsInR4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0JBLGMsR0FBQUEsYztRQWVBQyxTLEdBQUFBLFM7UUFnQkFDLFMsR0FBQUEsUztRQWNBQyxXLEdBQUFBLFc7UUFRQUMsSyxHQUFBQSxLO1FBSUFDLGEsR0FBQUEsYTtBQXpEVCxTQUFTTCxjQUFULEdBQTBCO0FBQ2hDLEtBQUlNLE9BQU8sRUFBWDtBQUNBLEtBQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsS0FBSUMsSUFBSUYsS0FBS0csV0FBTCxFQUFSO0FBQ0EsS0FBSUMsSUFBSUosS0FBS0ssUUFBTCxLQUFrQixDQUExQjtBQUNBRCxLQUFJQSxJQUFJLEVBQUosR0FBUyxNQUFNQSxDQUFmLEdBQW1CQSxDQUF2QjtBQUNBLEtBQUlFLElBQUlOLEtBQUtPLE9BQUwsS0FBaUIsRUFBakIsR0FBc0IsTUFBTVAsS0FBS08sT0FBTCxFQUE1QixHQUE2Q1AsS0FBS08sT0FBTCxFQUFyRDtBQUNBLEtBQUlDLElBQUlSLEtBQUtTLFFBQUwsS0FBa0IsRUFBbEIsR0FBdUIsTUFBTVQsS0FBS1MsUUFBTCxFQUE3QixHQUErQ1QsS0FBS1MsUUFBTCxFQUF2RDtBQUNBLEtBQUlDLElBQUlWLEtBQUtXLFVBQUwsS0FBb0IsRUFBcEIsR0FBeUIsTUFBTVgsS0FBS1csVUFBTCxFQUEvQixHQUFtRFgsS0FBS1csVUFBTCxFQUEzRDtBQUNBLEtBQUlDLElBQUlaLEtBQUthLFVBQUwsS0FBb0IsRUFBcEIsR0FBeUIsTUFBTWIsS0FBS2EsVUFBTCxFQUEvQixHQUFtRGIsS0FBS2EsVUFBTCxFQUEzRDtBQUNBLEtBQUlDLE9BQU9DLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQixHQUFoQixHQUFzQixHQUFqQyxDQUFYO0FBQ0FsQixRQUFPRyxJQUFJLEVBQUosR0FBU0UsQ0FBVCxHQUFhLEVBQWIsR0FBa0JFLENBQWxCLEdBQXNCLEVBQXRCLEdBQTJCRSxDQUEzQixHQUErQixFQUEvQixHQUFvQ0UsQ0FBcEMsR0FBd0MsRUFBeEMsR0FBNkNFLENBQXBEO0FBQ0EsUUFBT2IsSUFBUCxDQVpnQyxDQVluQjtBQUNiOztBQUVNLFNBQVNMLFNBQVQsQ0FBbUJ3QixLQUFuQixFQUEwQjtBQUNoQyxLQUFJQyxPQUFPQyxTQUFTRixLQUFULENBQVg7QUFDQSxLQUFJRyxTQUFTLENBQWI7QUFDQSxLQUFJRixRQUFRLGlCQUFaLEVBQStCO0FBQzlCO0FBQ0EsRUFGRCxNQUVPO0FBQ04sT0FBSyxJQUFJRyxHQUFULElBQWdCSixLQUFoQixFQUF1QjtBQUN0QixPQUFJSSxPQUFPLFFBQVgsRUFBcUI7QUFDcEJEO0FBQ0E7QUFFRDtBQUNEO0FBQ0QsUUFBT0EsTUFBUDtBQUNBO0FBQ0Q7QUFDTyxTQUFTMUIsU0FBVCxDQUFtQjRCLE1BQW5CLEVBQTJCO0FBQ2pDLEtBQUlDLE9BQU8sS0FBWDtBQUNBLEtBQUlDLFFBQVEseUZBQVo7QUFDQSxLQUFJRixPQUFPRixNQUFQLElBQWlCLEVBQXJCLEVBQXlCO0FBQ3hCRyxTQUFPQSxJQUFQO0FBQ0EsRUFGRCxNQUVPLElBQUksQ0FBQ0MsTUFBTUMsSUFBTixDQUFXSCxNQUFYLENBQUwsRUFBeUI7QUFDL0JDLFNBQU9BLElBQVA7QUFDQSxFQUZNLE1BRUE7QUFDTkEsU0FBTyxJQUFQO0FBQ0E7QUFDRCxRQUFPQSxJQUFQO0FBQ0E7O0FBRUQ7QUFDTyxTQUFTNUIsV0FBVCxDQUFxQitCLEdBQXJCLEVBQTBCO0FBQ2hDLEtBQUlDLFFBQVEsRUFBWjtBQUNBLE1BQUssSUFBSUMsSUFBVCxJQUFpQkYsR0FBakIsRUFBc0I7QUFDckJDLFdBQVNDLE9BQU9GLElBQUlFLElBQUosQ0FBaEI7QUFDQTtBQUNELFFBQU9ELEtBQVA7QUFDQTtBQUNEO0FBQ08sU0FBUy9CLEtBQVQsQ0FBZWlDLElBQWYsRUFBcUI7QUFDM0IsUUFBT0EsS0FBS0MsT0FBTCxDQUFhLE1BQWIsRUFBcUIsRUFBckIsQ0FBUDtBQUNBO0FBQ0Q7QUFDTyxTQUFTakMsYUFBVCxDQUF1QmtDLEdBQXZCLEVBQTRCO0FBQ2xDLFFBQU9BLElBQUlELE9BQUosQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLENBQVA7QUFDQSIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRUaW1lKCkge1xuXHR2YXIga2VlcCA9ICcnO1xuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdHZhciB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXHR2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdG0gPSBtIDwgMTAgPyAnMCcgKyBtIDogbTtcblx0dmFyIGQgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcblx0dmFyIGggPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcblx0dmFyIGYgPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcblx0dmFyIHMgPSBkYXRlLmdldFNlY29uZHMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRTZWNvbmRzKCkgOiBkYXRlLmdldFNlY29uZHMoKTtcblx0dmFyIHJhbmQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA4OTkgKyAxMDApO1xuXHRrZWVwID0geSArICcnICsgbSArICcnICsgZCArICcnICsgaCArICcnICsgZiArICcnICsgcztcblx0cmV0dXJuIGtlZXA7IC8vMjAxNjA2MTQxMzQ5NDdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iakxlbmd0aChpbnB1dCkge1xuXHR2YXIgdHlwZSA9IHRvU3RyaW5nKGlucHV0KTtcblx0dmFyIGxlbmd0aCA9IDA7XG5cdGlmICh0eXBlICE9IFwiW29iamVjdCBPYmplY3RdXCIpIHtcblx0XHQvL3Rocm93IFwi6L6T5YWl5b+F6aG75Li65a+56LGhe33vvIFcIlxuXHR9IGVsc2Uge1xuXHRcdGZvciAodmFyIGtleSBpbiBpbnB1dCkge1xuXHRcdFx0aWYgKGtleSAhPSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdGxlbmd0aCsrO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cdHJldHVybiBsZW5ndGg7XG59XG4vL+mqjOivgeaYr+WQpuaYr+aJi+acuuWPt+eggVxuZXhwb3J0IGZ1bmN0aW9uIHZhaWxQaG9uZShudW1iZXIpIHtcblx0bGV0IGZsYWcgPSBmYWxzZTtcblx0bGV0IG15cmVnID0gL14oKCgxM1swLTldezF9KXwoMTRbMC05XXsxfSl8KDE3WzBdezF9KXwoMTVbMC0zXXsxfSl8KDE1WzUtOV17MX0pfCgxOFswLTldezF9KSkrXFxkezh9KSQvO1xuXHRpZiAobnVtYmVyLmxlbmd0aCAhPSAxMSkge1xuXHRcdGZsYWcgPSBmbGFnO1xuXHR9IGVsc2UgaWYgKCFteXJlZy50ZXN0KG51bWJlcikpIHtcblx0XHRmbGFnID0gZmxhZztcblx0fSBlbHNlIHtcblx0XHRmbGFnID0gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmxhZztcbn1cblxuLy8g6YGN5Y6G5a+56LGh5bGe5oCn5ZKM5YC8XG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aob2JqKSB7XG5cdHZhciBuYW1lcyA9IFwiXCI7XG5cdGZvciAodmFyIG5hbWUgaW4gb2JqKSB7XG5cdFx0bmFtZXMgKz0gbmFtZSArIG9ialtuYW1lXTtcblx0fVxuXHRyZXR1cm4gbmFtZXM7XG59XG4vLyDljrvpmaTlrZfnrKbkuLLmiYDmnInnqbrmoLxcbmV4cG9ydCBmdW5jdGlvbiBzVHJpbSh0ZXh0KSB7XG5cdHJldHVybiB0ZXh0LnJlcGxhY2UoL1xccy9pZywgJycpXG59XG4vL+WOu+mZpOaJgOaciTpcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWFvaGFvKHR4dCkge1xuXHRyZXR1cm4gdHh0LnJlcGxhY2UoL1xcOi9pZywgJycpXG59Il19