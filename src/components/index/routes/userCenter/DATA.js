import request from '@/utils/request';
export default {
		getCardInfo(){
			return new Promise((resolve,reject)=>{
				request({
					method: 'post',
					url: '/index.php?r=btc/member-pay/pay-first'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				
				})
			})
		},
		sendChargeInfo(data){
			return new Promise((resolve,reject)=>{
				request({
					data:data,
					method: 'post',
					url: '/index.php?r=btc/member-pay/pay-second'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				
				})
			})
		}
}
