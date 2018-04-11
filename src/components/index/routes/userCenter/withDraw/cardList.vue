<template>
	<div class="cardList">
		<el-button @click="$router.push({'path':'/addCard'})">新增</el-button>
		<el-table
	      :data="tableData"
	      
	      style="width: 100%">
	      <el-table-column
	      	align="center"
	        prop="date"
	        label="开户名"
	    >
	      </el-table-column>
	      <el-table-column
	      	align="center"
	        prop="name"
	        label="开户行"
	        >
	      </el-table-column>
	       <el-table-column
	      	align="center"
	        prop="address"
	        label="卡号"
	        >
	      </el-table-column>
	      <el-table-column
	      	align="center"
	        prop="status"
	        label="状态">
	      </el-table-column>
	    </el-table>
	</div>
</template>

<script>
	 export default {
      data() {
        return {
          tableData: [{
            date: '网尼玛',
            name: '中国工商银行',
            address: '6212***********5373',
            status:'正常'
          }, {
            date: '网尼玛',
            name: '中国工商银行',
            address: '6212***********5373',
            status:'正常'
          }, {
            date: '网尼玛',
            name: '中国工商银行',
            address: '6212***********5373',
            status:'正常'
          }, {
            date: '网尼玛',
            name: '中国工商银行',
            address: '6212***********5373',
            status:'正常'
          }]
        }
      }
    }
</script>

<style lang="less" scoped>
	.cardList{
		padding: 20px;

	}
</style>