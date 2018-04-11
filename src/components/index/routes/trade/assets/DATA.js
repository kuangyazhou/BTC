import request from '@/utils/request';
export default {
		getUserInfo(){
			return new Promise((resolve,reject)=>{
				request({
					method: 'post',
					url: '/index.php?r=btc/member-ajax/user-info'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				
				})
			})
		},
		order(data){
			return new Promise((resolve,reject)=>{
				request({
					data:data,
					method: 'post',
					url: '/index.php?r=btc/order/open-entrust-order'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				})
			})
		},
		undoOrder(data){
			return new Promise((resolve,reject)=>{
				request({
					data:data,
					method: 'post',
					url: '/index.php?r=btc/order/undo-entrust-order'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				})
			})
		},
		///index.php?r=btc/order/close-deal-hold-orde
		//持仓单平仓
		dealHoldOrder(data){
			return new Promise((resolve,reject)=>{
				request({
					data:data,
					method: 'post',
					url: '/index.php?r=btc/order/close-entrust-order'
				}).then(res=>{
					if(res.data){
					    resolve(res.data)
					}
				})
			})
		}
}
