<template>
	<div class="userCenter">
		<div class="left">
			<el-row>
				<el-col :span="4">
					<div class="leftBar">
						<div>
							<span class="stc_t">账号：</span><span v-if="userInfo">{{userInfo.user_name||''}}</span>
						</div>
						<div>
							<span class="stc_t">余额：</span><span v-if="userInfo">{{userInfo.avail_deposit_amount}}</span>
						</div>
						<el-button @click="$router.push({'path':'/userCenter'})">充值</el-button>
						<el-button @click="$router.push({'path':'/withDraw'})">提现</el-button>
						

						<el-collapse v-model="activeName" accordion>
						  <el-collapse-item title="交易记录" name="1">
						    
						    <div>交易记录</div>
						  </el-collapse-item>
						  <el-collapse-item title="账户管理" name="2">
						    <el-button @click="$router.push({'path':'/cardList'})">银行卡管理</el-button>
						  </el-collapse-item>
						
						</el-collapse>
					</div>
				</el-col>
				<el-col :span="20">
					<div class="rightcontent">
						<div class="head">
							充值
						</div>
						<div class="con_box">
							<router-view></router-view>
						</div>
					</div>

				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Carousel,
		CarouselItem,
		Row,
		Col,
		Collapse,
		CollapseItem
	} from "element-ui";
	Vue.use(Carousel);
	Vue.use(CarouselItem);
	Vue.use(Collapse);
	Vue.use(CollapseItem);
	Vue.use(Row);
	Vue.use(Col);
	import { getUserInfo } from "@/utils/apiUtils";
	export default {
		data() {
			return {
				activeName:''
			}
		},
		computed:{
			userInfo:function(){
				
				return this.$store.state.user.userInfo || getUserInfo()
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.userCenter {
		height: 700px;
		background: #ededed;
		.leftBar {
			height: 700px;
			padding-left: 20px;
			border-right: 1px solid #d0d0d0;
			&>div{
				padding-top: 6px;
			    line-height: 32px;
			    height: 34px;
			    margin-bottom: 12px;
			}
			.stc_t{
				padding-left: 48px;
			}
		}
		.rightcontent {
			.head {
				padding: 0 10px;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #d0d0d0;
				background: #fff;
			}
			.con_box {
				background: #ededed;
	
			}
		}
	}
</style>