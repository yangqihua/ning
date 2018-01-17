/**
 * Created by yangqihua on 2017/01/17.
 */
import {BASE_URL} from './constant'
import wepy from 'wepy';
import tip from './tip'

class HTTPUtil {

	static async wxRequest(url,params = {},method='GET',headers={}) {

		headers['content-type'] = 'application/json';
		return await wepy.request({
			url: url,
			data: params,
			method: method,
			header: headers,
		});
	};

	static get({url, params = {}, scb, ecb,isLoading=true}) {
		if(isLoading){
			tip.loading();
		}
		url = BASE_URL + url;
		HTTPUtil.wxRequest(url, params).then((json) => {
			if(isLoading) {
				tip.loaded();
			}
			let res = json.data;
			if(json['statusCode']==200){
				if(res.code==200){
					scb&&scb(res.data);
				}
			}else{
				ecb&&ecb(json['errMsg']);
			}
		}, (err) => {
			if(isLoading) {
				tip.loaded();
			}
			ecb && ecb(err);
		})
	}
	static post({url, params = {}, scb, ecb,isLoading=true}) {
		if(isLoading){
			tip.loading();
		}
		url = BASE_URL + url;
		HTTPUtil.wxRequest(url, params,'POST').then((json) => {
			if(isLoading) {
				tip.loaded();
			}
			let res = json.data;
			if(json['statusCode']==200){
				if(res.code==200){
					scb&&scb(res.data);
				}
			}else{
				ecb&&ecb(json['errMsg']);
			}
		}, (err) => {
			if(isLoading) {
				tip.loaded();
			}
			ecb && ecb(err);
		})
	}

	static publicGet({url, params = {}, scb, ecb}) {
	}


}

export default HTTPUtil;