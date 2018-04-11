<template>
	<div class="index">
		<span>时间：</span>
		<el-date-picker v-model="value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
		</el-date-picker>
		<el-button>查询</el-button>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column align="center" prop="date" label="序号">
			</el-table-column>
			<el-table-column align="center" prop="name" label="用户名">
			</el-table-column>
			<el-table-column align="center" prop="address" label="时间">
			</el-table-column>
			<el-table-column align="center" prop="status" label="银行">
			</el-table-column>
			<el-table-column align="center" prop="status" label="银行卡姓名">
			</el-table-column>
			<el-table-column align="center" prop="status" label="银行卡卡号">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		TimePicker
	} from "element-ui";
	Vue.use(TimePicker);
	export default {
		data() {
			return {
				value: '',
				tableData: []
			}
		}
	}
</script>

<style lang="less" scoped>
	.index{
		padding: 20px;
	}
</style>