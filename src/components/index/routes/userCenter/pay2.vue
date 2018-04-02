<template>
	<div class="pay2">
		<h4>您目前选择的是<span>华夏银行</span>充值服务</h4>
		<h4>填写转账资料：</h4>
		<div class="form">
			<el-form ref="form" :model="form" label-width="120px" size="small" >
				<el-form-item label="存入金额">
					<el-input v-model="form.number"></el-input>
				</el-form-item>
				<el-form-item label="存款人姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
		</div>
        <h4>选择转账类型：</h4>
        <div class="pay_type">
        	<span>网银转账</span>
        	<span>ATM入款</span>
        	<span>银行柜台</span>
        	<span>手机转账</span>
        	<span>支付宝</span>
        </div>
		<el-button @click="back">上一步</el-button>
		<el-button @click="back">确认</el-button>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Button,
		Input,
		Form,
		FormItem,
		Alert,
		Message
	} from "element-ui";
	Vue.use(Button);
	Vue.use(Input);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Alert);
	export default {
		data() {
			return {
				form: {
					number: '',
					name: ''
				}
			}
		},
		methods: {
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.form {
		width: 400px;
	}
	.pay_type{
		    padding-left: 50px;
		    span{
		    	display: inline-block;
		    	text-align: left;
			    padding-left: 20px;
			    width: 144px;
			    height: 48px;
			    font-size: 14px;
			    line-height: 48px;
			    color: #666;
			    border: 1px dashed #cacaca;
			    cursor: pointer;
		    }
	}
</style>