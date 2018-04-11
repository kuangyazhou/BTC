<template>
	<div class="pay3">
		<h4>请确认订单信息：</h4>
		<h4>您目前选择的是<span>华夏银行</span>充值服务</h4>
		<ul class="">
			<li>收款账户名：{{cardInfo.bank_name}}</li>
			<li>卡号：{{cardInfo.bank_user_account}}</li>
			<li>开户城市：{{cardInfo.banking_outlets}}</li>
			<li>收款人：{{cardInfo.bank_user_name}}</li>
			<li>订单金额：￥{{cardInfo.amount}}元</li>
			<li>订单号：{{cardInfo.pay_number}}</li>
		</ul>
		<el-button @click="back">上一步</el-button>
		<el-button @click="submit">确认</el-button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				cardInfo:{}
			}
		},
		mounted(){
			this.cardInfo= this.$route.query.data
		},
		methods:{
			back() {
				this.$router.go(-1)
			},
			submit() {
			
			}
		}
	}
</script>

<style lang="less" scoped>
   li{
   	list-style: none;
   }
</style>