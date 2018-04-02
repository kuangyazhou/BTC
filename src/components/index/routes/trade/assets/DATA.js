import request from '@/utils/request';
export default {
		getUserInfo(){
			return new Promise((resolve,reject)=>{
				request({
					method: 'post',
					url: '/index.php?r=btc/member-ajax/user-info'
				}).then(res=>{
					resolve(res.data)
				})
			})
		}
}
