<template>
	<div class="addCard">
		<el-col :span="10">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  size="mini" label-position="right" label-width="200px" class="demo-ruleForm">
				<el-form-item label="活动名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="开户银行" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开户人姓名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="银行卡号" prop="cardNumber">
					<el-input v-model="ruleForm.cardNumber"></el-input>
				</el-form-item>
				<el-form-item label="确认卡号" prop="cardNumber1">
					<el-input v-model="ruleForm.cardNumber1" onpaste="return false;"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					cardNumber:'',
					cardNumber1:''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}]
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
   .addCard{
   	padding: 20px;
   }
	.el-form{
		width:500px
	}
</style>