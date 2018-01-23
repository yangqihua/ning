export function getCurrentTime() {
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

export function objLength(input) {
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
export function vailPhone(number) {
	let flag = false;
	let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
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
export function displayProp(obj) {
	var names = "";
	for (var name in obj) {
		names += name + obj[name];
	}
	return names;
}
// 去除字符串所有空格
export function sTrim(text) {
	return text.replace(/\s/ig, '')
}
//去除所有:
export function replaceMaohao(txt) {
	return txt.replace(/\:/ig, '')
}