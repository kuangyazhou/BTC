<template>
	<div class="userNotice">
		<h3>公告列表</h3>
		<el-collapse accordion>
			<el-collapse-item v-for="(item,index) in noticeList" :key="index">
				<template slot="title">
					<div class="title"> <span>{{index+1}}</span><label>{{item.title}}</label><i>{{'【' +item.created+ '】'}}</i></div>
				</template>
				<div class="content">{{item.content}}</div>
		
			</el-collapse-item>
			
		</el-collapse>
		<div class="page">
			<el-pagination  @current-change="changePage" :current-page="page" :page-size="20" :page-count="total" layout="prev, pager, next">
		    </el-pagination>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import request from '@/utils/request';
	import {
		Collapse,
		CollapseItem
	} from 'element-ui'
	Vue.use(Collapse)
	Vue.use(CollapseItem)

	export default {
		data() {
			return {
				noticeList:[],
				page:1,
				total:0,
			}
		},
		mounted(){
			this.getList()
		},
		methods: {
			changePage(val) {
				this.page = val;
				this.getList();
			},
			getList(){
				request({
					url:'/index.php?r=btc/member/notice-list',
					method:'get'
				}).then(res=>{
				
					this.noticeList=res.data.data.list;
					this.total=res.data.data.page.total
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.userNotice {
		min-height: 700px;
		padding: 10px 0 10px 20px;
		background: #ededed;
		h3 {
			background: #c7c7c7;
			margin: 0;
			padding-left: 15px;
			height: 30px;
			line-height: 30px;
		}
		.title {
			padding-left: 15px;
			cursor: pointer;
			z-index: 10;
			span{
				margin-right: 20px;
			}
			label{
				margin-right: 10px;
			}
			i{
				font-style: normal;
			}
		}
		div.content{
			padding-left: 35px;
		}
		.page{
			text-align: center;
		}
	}
</style>