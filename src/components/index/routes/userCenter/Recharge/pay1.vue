<template>
	<div class="pay1">
		<div class="head">
			请选择银行入款卡号
		</div>
		<div class="cardInfo" @click="sendId=cardId" :class="{'select':sendId==cardId}">
			<div class="icon">

			</div>
			<ul class="">
				<li>开户银行：{{cardInfo.bank_name}}</li>
				<li>开户网点：{{cardInfo.banking_outlets}}</li>
				<li>收款账户：{{cardInfo.user_account}}</li>
				<li>收款人：{{cardInfo.user_name}}</li>
				<i class="mark" v-if="sendId==cardId"></i>
			</ul>
		</div>
		<el-button @click="next">下一步</el-button>
		<div class="notice">
			<p>转账须知：</p>
			<p>*单笔最低存款金额0元</p>
			<p>*单笔最高存款金额0元</p>
			<p>*以上银行账号仅限本次使用，账号不定期更换！请您根据本页面所提供的收款账号进行转账，若存款至过期账号，本公司恕不负责！</p>
		</div>
	</div>
</template>

<script>
	import DATA from '../DATA.js'
	export default {
		data() {
			return {
				cardInfo: {

				},
				sendId:'',
				cardId:null
			}
		},
		mounted() {
			this.getCard()
		},
		methods: {
			next() {
				this.$router.push({
					'path': '/pay2',
					 'query':{
					 	bank_name:this.cardInfo.bank_name,
					 	id:this.sendId
					 } 
				})
			},
			async getCard() {
				const res = await DATA.getCardInfo();
				this.cardInfo = res.data;
				this.cardId = res.data.id;

			}
		}
	}
</script>

<style lang="less" scoped>
	.pay1 {
		text-align: left;
		.cardInfo {
			overflow: hidden;
			margin: 10px 0;
			border: 1px dashed #cacaca;
			width: 270px;
			padding: 13px 0 20px 20px;
			cursor:pointer;
			position:relative;
			&.select{
				 border: 1px solid #ea3146;
			}
			i.mark {
		      display: block;
		      position: absolute;
		      right: 0;
		      bottom: 0;
		      width: 16px;
		      height: 17px;
		      margin: 0;
		      background: url(./img/rbank-icon.png) no-repeat;
		      background-position: 0 -63px;
		    }
			.icon {
				width: 50px;
				height: 38px;
				background: url(./img/rbank-icon.png) no-repeat;
				background-position: 0 -555px;
				float: left;
			}
			ul {
				width: 180px;
				float: left;
				margin: 0;
				margin-left: 10px;
				padding: 0;
				li {
					list-style: none;
					word-break: break-all;
					word-wrap: break-word;
				}
			}
		}
	}
</style>