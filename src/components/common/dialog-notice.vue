<template>

		<el-dialog title="公告" v-if="loginStatus" custom-class="dialog" style="color:#fff" width="900px" top="10vh" :visible.sync="dialogVisible" :close-on-click-modal="false" center>
			<el-row class="body">
				<el-col class="left">
					<ul v-if="noticeList">
						<li v-for="(item,index) in noticeList" @click="active=index" :key="index" :class="{'active':active==index}">{{item.title}}</li>
					</ul>
				</el-col>
				<el-col class="right">
					<el-row class="head" v-if="noticeList">{{noticeList[active].title}}</el-row>
					<el-row class="content" v-if="currentContent">
						{{currentContent.content}}
					</el-row>
					<el-row class="date" v-if="currentContent">
						{{currentContent.created}}
					</el-row>
				</el-col>
			</el-row>
		</el-dialog>

</template>

<script>
	import Vue from 'vue';
	import request from '@/utils/request';
	import {
		Message,
	} from 'element-ui'
	export default {
		data() {
			return {
				active:0,
				dialogVisible: false,
				contentArr:[]
			}
		},
		wacth:{
			loginStatus:function(){
					if(this.loginStatus)
					this.getData();
			}
		},
		computed:{
			loginStatus: function() {
				return this.$store.state.user.token
			},
			noticeList:function(){
				let a = this.$store.state.user.userInfo&&this.$store.state.user.userInfo.my_notice;
				if(a.length>0){
					return a
				}else{
					return ''
				}
				
			},
			currentContent:function(){
				for(const a of this.contentArr){
					if(this.noticeList[this.active].id==a.id){
						return a
					}
				}
				
			}
		},
		mounted(){
		
			
		},
		beforeDestroy() {
			this.loginStatus ='';
		},
		methods:{
			
			getData(){
				
				let data='',urls='';
				for(const a of this.noticeList){
					data+=a.id+','
				}
				if(data==''){
					return;
				}
				if(this.$store.state.user.loginByAccount){
					urls=`/index.php?r=btc/member-ajax/notice-info&ids=${data}`
				}else{
					urls=`/index.php?r=btc/notice/details&ids=${data}`
				}
				request({
					method:'get',
					url:urls
				}).then(res=>{
					//console.log(res.data.data,333)
					this.contentArr = res.data.data;
				})
			}
		}
	}
</script>
<style lang="less">
	.dialog {
		.el-dialog__header .el-dialog__title {
			color: #fff;
		}
		.el-dialog__close {
			color: #fff;
			&:hover{
				color: #fff;
				transform:scale(1.4);
			}
		}
		.el-dialog__body {
			padding: 0;
		}
	}
</style>
<style lang="less" scoped>
	.body,
	ul,
	li,
	div {
		padding: 0;
		margin: 0;
	}
	
	.left {
		float: left;
		width: 220px;
		height: 400px;
		overflow: hidden;
		overflow-y: auto;
		background: #fff;
		border-right: 1px solid #e5e4e4;
		ul li {
			/*   	list-style: none;*/
			padding-left: 15px;
			height: 42px;
			line-height: 42px;
			border-bottom: 1px solid #e5e4e4;
			font-size: 16px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			cursor: pointer;
			&.active{
				   border-bottom: 1px solid #b62929;
			}
		}
	}
	
	.right {
		float: left;
		width: 680px;
		.head {
			padding: 20px 0;
			text-align: center;
			border-bottom: 1px solid #e5e4e4;
			font-size: 22px;
			color: #f4354a;
			font-weight: bold;
		}
		.content {
			font-size: 16px;
			height:300px;
			
		}
		.date{
			text-align: right;
			padding-right: 20px;
		}
	}
</style>