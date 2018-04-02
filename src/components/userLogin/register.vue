<template>
	<div class="register">
		<div class="registerForm">
			<div class="head">
				<span class="left">{{$t('l.reg')}} BitFINEX</span>
				<span class="right">{{$t('l.yyzh')}}？<b @click="$router.push({'path':'/userLogin'})">{{$t('l.qdl')}}</b></span>
			</div>
			<el-form label-position="right" label-width="100px" :rules="rules" ref="ruleForm" :model="info" size="small">
				<el-form-item :label="`${$t('l.sszh')}:`" prop="parent_account"  style="height:40px">
					<el-input v-model="info.parent_account"   style="width:236px;" :placeholder="$t('l.qsrsszh')"></el-input>
				</el-form-item>
				<el-form-item :label="`${$t('l.zh')}:`" prop="account"  style="height:40px;;">
					<el-input v-model="info.account"   style="width:236px;height:30px;" :placeholder="$t('l.zh')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.mm')+':'" prop="password" style="height:40px">
					<el-input type="password" v-model="info.password"  style="width:236px;" :placeholder="$t('l.qsrmm')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.qr')+':'" prop="repassword" style="height:40px">
					<el-input type="password" v-model="info.repassword"  style="width:236px;" :placeholder="$t('l.qrmm')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.zjmm')+':'" prop="money_password" style="height:40px">
					<el-input type="password" v-model="info.money_password"  style="width:236px;" :placeholder="$t('l.qsrzjmm')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.qr')+':'" prop="money_repassword" style="height:40px">
					<el-input type="password" v-model="info.money_repassword"  style="width:236px;" :placeholder="$t('l.qqrzjmm')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.dzyx')+':'" prop="email" style="height:40px">
					<el-input v-model="info.email"  style="width:236px;" :placeholder="$t('l.qsrdzyxdz')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.sjhm')+':'" prop="phone" style="height:40px">
					<el-input v-model="info.phone"  style="width:236px;" :placeholder="$t('l.qsrsjhm')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('l.yzm')+':'" prop="verify_code" style="height:40px">
					<el-input v-model="info.verify_code"  style="width:236px;" :placeholder="$t('l.qsryzm')"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">{{$t('l.reg')}}</el-button>
					<el-button type="primary" @click="reset">{{$t('l.cz')}}</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	import Vue from "vue";
	import axios from "axios";
	import request from '@/utils/request';
	import { API_SERVER, setToken } from "@/utils/apiUtils";
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
		name: "Register",
		data() {
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.info.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var phonePass = (rule, value, callback) => {

				if(value == '') {

					callback();
				} else if(!(/^1[34578]\d{9}$/.test(value))) {
					callback(new Error('请输入正确的电话号码!'));
				} else {
					callback();
				}

			};
			var validatePass3 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.info.money_password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				msg: "register",
				info: {
					account: '',
					parent_account: '',
					password: '',
					repassword: '',
					money_password: '',
					money_repassword: '',
					email: '',
					phone: '',
					verify_code: ''

				},
				rules: {
					account: [{
						required: true,
						message: '请输入所属代理ID',
						trigger: 'blur'
					}],
					parent_account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					repassword: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					money_password: [{
						required: true,
						message: '请输入资金密码',
						trigger: 'blur'
					}],
					money_repassword: [{
						required: true,
						validator: validatePass3,
						trigger: 'blur'
					}],
					email: [

						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					phone: [{
						type: 'phone',
						validator: phonePass,
						trigger: 'blur'
					}],
					verify_code: [{
						required: true,
						trigger: 'blur',
						message: '验证码必填',
					}]
				}
			}
		},
		methods: {
			reset(){
				for(var i in this.info){
					this.info[i]=''
				}
			},
			onSubmit() {
				this.$refs['ruleForm'].validate((valid) => {
					if(valid) {
						request({
							data: this.info,
							method: 'post',
							url: '/index.php?r=btc/member/register'
						}).then(res => {
							console.log(res)
							if(res.status == 1) {
								Message({
									message: '恭喜你,注册成功',
									type: 'success'
								});
							}
						})

					} else {
						return false;
					}
				})

			}
		}
	}
</script>

<style scoped lang="less">
    .register{
    	padding: 100px 0;
    	
    	background: url(./img/loginBg.jpg) center center no-repeat/cover;
    	
    }
	.head{
		padding: 22px 0 22px 20px ;
		.left{
			
			font-size: 18px;
		
		}
		.right{
			float:right;
			font-size: 12px;
			margin-right: 20px;
			b{
				font-weight: normal;
				color:#7A98F7;
				cursor: pointer;
				&:hover{

					text-decoration: underline;
				}
			}
		}
		
	}
	.registerForm {
		width: 450px;
		height:680px;
		padding-left: 40px;
		background: rgba(255,255,255,0.9);
		margin: auto;

	}
</style>