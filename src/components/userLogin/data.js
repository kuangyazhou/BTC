import request from '@/utils/request';
export default {
		reg(data){
			return new Promise((resolve,reject)=>{
				request({
					data:data,
					method: 'post',
					url: '/index.php?r=btc/member/register'
				}).then(res=>{
					resolve(res)
				})
			})
		}
}
