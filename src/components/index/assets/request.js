
import Vue 			from "vue";
import axios 		from "axios";

export default{
	query: function(options) {
		var requestOptions = {
			type: "post"
		};
		if (options.url) {
			requestOptions.url = options.url;
			// 如果是绝对路径，那么不需要拼上访问前缀
			if( !/^(http|https):\/\//.test(options.url) ){
				// window.requestPre在index.html中定义
				// 请求的前缀
				requestOptions.url = `/${window.requestPre}${options.url}`;
			}
		}
		if (options.type) {
			requestOptions.type = options.type;
		}
		requestOptions.data = options.data || {};
		if (options.data && requestOptions.type == "post") {
			let dataStrArr = [];
			for( var key in options.data ){
				dataStrArr.push(`${key}=${options.data[key]}`);
			}
			requestOptions.data = dataStrArr.join("&");
		}
		if (options.success) {
			requestOptions.success = options.success;
		}
		if (options.complete) {
			requestOptions.complete = options.complete;
		}
		if (options.error) {
			requestOptions.error = options.error;
		}
		
		if( options.notLogin ){
			requestOptions.notLogin = options.notLogin;
		}
		if ( requestOptions.type == "get" ) {
			var params = requestOptions.data || {};
			if( typeof params == 'object' ){
				// // 去缓存
				params["_"] = Date.now();
			}
			axios.get(requestOptions.url,{
				params: params
			}).then( res => {

				requestOptions.complete && requestOptions.complete(res.data);

				// 登录和退出接口要放开
				// 拦截接口未登录，目前未登录时，接口都统一返回code: -1
				if( requestOptions.url.indexOf("/auth/logout") == -1 &&
					requestOptions.url.indexOf("/auth/login") == -1 &&
					(!res.data || res.data.code == '-1' ) ){
					window.Subject.notify( "login" );
					return ;
				}
				if( res.data && res.data.code == '500' ){
					var errorMessage = res.data.message || res.data.msg;
					requestOptions.error && requestOptions.error(res.data);
					window.Subject.notify( "requestError", {
						code: 500,
						message: errorMessage
					});
					return ;
				}
				
				requestOptions.success && requestOptions.success(res.data);
			}, error => {
				requestOptions.error && requestOptions.error(error.message);
				window.Subject.notify( "requestError", {
					message: error.message
				});
				return ;
			});
		}
		else if ( requestOptions.type == "post" ) {
			axios.post(
				requestOptions.url,
				requestOptions.data
			).then( res => {
				requestOptions.complete && requestOptions.complete(res.data);

				// 登录和退出接口要放开
				// 拦截接口未登录，目前未登录时，接口都统一返回code: -1
				if( requestOptions.url.indexOf("/auth/logout") == -1 &&
					requestOptions.url.indexOf("/auth/login") == -1 &&
					(!res.data || res.data.code == '-1' ) ){
					window.Subject.notify( "login" );
					return ;
				}
				if( res.data && res.data.code == '500' ){
					var errorMessage = res.data.message || res.data.msg;
					requestOptions.error && requestOptions.error(res.data);
					window.Subject.notify( "requestError", {
						code: 500,
						message: errorMessage
					});
					return ;
				}
				requestOptions.success && requestOptions.success(res.data);
			}, error => {
				requestOptions.error && requestOptions.error(error.message);
				window.Subject.notify( "requestError", {
					message: error.message
				});
				return ;
			});
		}
	}
}
