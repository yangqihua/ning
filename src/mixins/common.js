import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
	data = {
		scrollTop: 0,
		// isAgent:'hf'
	}
	methods = {
		goTop(e){
			wx.pageScrollTo({scrollTop: 0})
		}
	}
	computed = {
		isAgent(){
			return true;
		}
	}

	onShow() {
		// console.log('mixin onShow')
	}

	onLoad() {
		// console.log('mixin onLoad')
	}
}
