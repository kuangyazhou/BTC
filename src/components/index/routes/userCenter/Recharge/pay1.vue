<template>
	<div class="pay1">
		<div class="head">
			请选择银行入款卡号
		</div>
		<div class="body">

			<div class="cardInfo" @click="selectId=index" v-for="(cardInfo,index) in payWay" :class="{'select':selectId==index}" :key="index">
				<div class="icon">

				</div>
				<ul class="">
					<li>开户银行：{{cardInfo.pay_name}}</li>
					<li>收款账户：{{cardInfo.pay_account}}</li>
					<li>收款人：{{cardInfo.pay_user_name}}</li>
					<i class="mark" v-if="selectId==index"></i>
				</ul>
			</div>
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
		computed: {
			payWay: function() {
				return this.$store.state.user.rechargeWay['3']
			}
		},
		data() {
			return {
				sendId: '',
			    selectId: 0
			}
		},
		mounted() {
	
		},
		methods: {
			next() {
				this.$router.push({
					'path': '/pay2',
					'query': {
						bank_name: this.payWay[this.selectId].pay_name,
						id: this.payWay[this.selectId].id

					}
				})
			},
	
		}
	}
</script>

<style lang="less" scoped>
	.pay1 {
		text-align: left;
		.body{
			overflow: hidden;
		}
		.cardInfo {
			overflow: hidden;
			margin: 10px 0;
			float: left;
			margin-right: 20px;
			border: 1px dashed #cacaca;
			width: 270px;
			padding: 13px 0 20px 20px;
			cursor: pointer;
			position: relative;
			&.select {
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