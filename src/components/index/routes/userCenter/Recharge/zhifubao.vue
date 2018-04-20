<template>
	<div class="zhifubao">
		<h4>选择线上支付通道：</h4>
		<div class="pay_type">
			<span v-for="(item,index) in payWay" :class="{'select':index==active}" @click="active=index" :key="index">
        		<i class="rbank-icon"></i>
        		<label>支付{{index+1}}</label>
        		<i class="mark" v-if="index==active"></i>
        	</span>
		</div>
		<h4>填写转账信息：</h4>
		<div class="content">
			<div class="form">
				<el-form ref="form" :model="form" label-width="120px" size="small" :rules="rules">
					<el-form-item label="存入金额" prop="number">
						<el-input v-model="form.number"></el-input>
					</el-form-item>
					<el-form-item label="存款人账号" prop="name">
						<el-input v-model="form.name" ></el-input>
					</el-form-item>
				</el-form>
			</div>

		</div>
		<div v-if="button" class="charImg">
			<h3>充值金额：{{form.number}}</h3>
			<img src="require(payWay[active].pay_qr_code_images_path)">
		</div>
		<el-button class="button" @click="charge">立即充值</el-button>
	</div>
</template>

<script>
	import DATA from "../DATA.js";
	import {
		Message
	} from "element-ui";
	export default {
		computed: {
			payWay: function() {
				return this.$store.state.user.rechargeWay['1']
			}
		},
		data() {
			return {
				active: 0,
				button: false,
				form: {
					number: '',
					name: ''
				},
				rules: {
					number: [{
						required: true,
						message: '请输入充值金额',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入账号名称',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {

		},
		methods: {
			charge() {
				const data = {
					pay_way_id: this.payWay[this.active].id,
					amount: this.form.number,
					action_pay_user_name: this.form.name
				};
				this.sendChargeInfo(data);
			},
			async sendChargeInfo(data) {
				const res = await DATA.sendChargeInfo(data);
				if(res.status == 1) {
					this.button=true;
					Message({
						type: 'success',
						message: '提交成功，请扫描二维码充值'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.zhifubao {
		position: relative;
	}
	
	h3 {
		margin: 0;
		padding: 0;
	}
	
	.form {
		width: 400px;
	}
	
	.charImg {
		position: absolute;
		top: 100px;
		left: 650px;
		img {
			width: 200px;
			height: 200px;
		}
	}
	
	.pay_type {
		padding-left: 50px;
		span {
			display: inline-block;
			text-align: left;
			padding-left: 20px;
			margin-right: 10px;
			width: 144px;
			height: 48px;
			font-size: 14px;
			line-height: 48px;
			color: #666;
			border: 1px dashed #cacaca;
			cursor: pointer;
			position: relative;
			&.select,
			&:hover {
				border: 1px solid #ea3146;
			}
			.rbank-icon {
				display: inline-block;
				background: url(./img/rbank-icon.png) no-repeat;
				width: 28px;
				height: 28px;
				background-position: 0 -128px;
				vertical-align: middle;
			}
			.mark {
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
		}
	}
	
	.button {
		margin-left: 120px;
	}
</style>