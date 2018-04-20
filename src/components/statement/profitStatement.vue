<template>
	<div class="profitStatement">
		<el-row v-if="level!=initLevel">
			<el-col><span style="vertical-align: middle;margin-right: 20px;">日期范围:<span v-if="!to_date">{{time[0]+'~'+time[1]}}</span><span v-if="to_date">{{to_date}}</span></span>
				<el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;vertical-align: middle;">
					<el-breadcrumb-item v-for="(item,index) in seletArr" :key="index"><span @click="tabLevel(item,index)">{{levelName[item.level]}}</span><span v-if="index==seletArr.length-1">{{'['+item.user_name+']'+item.user_account}}</span></el-breadcrumb-item>
				</el-breadcrumb>
				<span class="back" v-if="to_date" @click="back">返回</span>
			</el-col>
		</el-row>
		<el-row v-if="level==initLevel">
			<el-date-picker v-model="time" size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
			</el-date-picker>
			<el-button size="mini" @click="getData" style="vertical-align: middle;margin-bottom: 1px;">{{$t('message.search')}}</el-button>
		</el-row>
		<el-table :data="tableData" size="small" style="width: 100%;margin-top:0.5em;" v-show="!to_date" @header-click="hide">
			<el-table-column align="center" label="序号" v-if="level!=6">
				<template slot-scope="scope" v-if="scope.$index<tableData.length-1">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column align="center" :label="userName[level]" v-if="level!=6">
				<template slot-scope="scope">
					<a class="tab" @click="tabCurrent(scope.row)">{{scope.row.user_account}}</a>
				</template>
			</el-table-column>
			<el-table-column align="center" label="名称" v-if="level!=6" class-name="namess">
				<template slot-scope="scope">
					<span>{{scope.row.user_name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="日期" v-if="level==6">
				<template slot-scope="scope">
					<a class="tab" @click="swicthDeal(scope.row)" v-if="scope.$index!=tableData.length-1">{{scope.row.to_date}}</a>
					<span v-if="scope.$index==tableData.length-1">总计</span>
				</template>
			</el-table-column>
			<el-table-column align="center" v-for="item in head" :prop="item.value" :label="item.label" :key="item.key" :class-name="item.class">
				<template slot-scope="scope">
					<span :class="{'red':item.value=='win_parent'&&scope.row[item.value]<0}">{{scope.row[item.value]}}</span>
				</template>
			</el-table-column>
		</el-table>
	
		<el-table :data="dealData" size="small" style="width: 100%;margin-top:0.5em;" v-show="to_date">
			<el-table-column prop="order_number" :label="$t('l.cjdh')">
			</el-table-column>
			<el-table-column prop="hold_order_number" :label="$t('l.ccdh')">
			</el-table-column>
			<el-table-column prop="order_times" :label="$t('l.cjsj')">
			</el-table-column>
			<el-table-column prop="product_name" :label="$t('l.spmc')">
			</el-table-column>
			<el-table-column :label="$t('l.jcpc')">
				<template slot-scope="scope">
					{{$t('l.order_type['+scope.row.order_type+']')}}
				</template>
			</el-table-column>
			<el-table-column :label="$t('l.mmfx')">
				<template slot-scope="scope">
					{{$t('l.order_direction['+scope.row.order_direction+']')}}
				</template>
			</el-table-column>
			<el-table-column prop="deal_number" :label="$t('l.cjl')">
			</el-table-column>
			<el-table-column prop="deal_price" :label="$t('l.cjje')">
			</el-table-column>
			<el-table-column prop="open_price" :label="$t('l.jcj')">
			</el-table-column>
			<el-table-column prop="hold_price" :label="$t('l.ccj')">
			</el-table-column>
			<el-table-column prop="close_price" :label="$t('l.pcj')">
			</el-table-column>
			<el-table-column prop="win_loss_amount" :label="$t('l.sjyk')">
			</el-table-column>
			<el-table-column prop="service_fee" :label="$t('l.hysxf')">
			</el-table-column>
			<el-table-column prop="overnight_fee" :label="$t('l.gysxf')">
			</el-table-column>
			<el-table-column :label="$t('l.cjlx')">
				<template slot-scope="scope">
					{{$t('l.deal_type['+scope.row.deal_type+']')}}
				</template>
			</el-table-column>
		</el-table>
		<div class="flex center" v-if="to_date">
				<el-pagination layout="prev,pager,next" :current-page="page.current" :page-size="20" @current-change="changePage" :total="page.total*20" key="pageination"></el-pagination>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request';
	import header from './header.js'
	import {
		Breadcrumb,
		BreadcrumbItem
	} from "element-ui";
	import Vue from "vue";
	Vue.use(Breadcrumb)
	Vue.use(BreadcrumbItem)
	export default {
		data() {
			return {
				head: '',
				tableData: [],
				dealData: [],
				hideStatus: {
					payment_user: {
						status: false,
						hideArr: ['share_up_bonus_user', 'sum_service_fee_user', 'sum_overnight_fee_user', 'order_diff_discount_user'] //对应隐藏header下标
					},
					win_parent: {
						status: false,
						hideArr: ['bonus_parent', 'sum_service_fee_parent', 'sum_overnight_fee_parent', 'order_diff_discount_parent'] //对应隐藏header下标
					},
					payment_grand: {
						status: false,
						hideArr: ['share_up_bonus_grand', 'sum_service_fee_grand', 'sum_overnight_fee_grand', 'order_diff_discount_grand'] //对应隐藏header下标
					}
				},
				page: {
					current: 1,
					total: 1
				},
				levelName: {
					0: '后台',
					1: '一级代理',
					2: '二级代理',
					3: '三级代理',
					4: '四级代理',
					5: '五级代理',
					6: '会员'
				},
				userName: {
					0: '一级代理',
					1: '二级代理',
					2: '三级代理',
					3: '四级代理',
					4: '五级代理',
					5: '会员'
				},
				time: ['2018-04-10', this.getNowDate()],
				to_date: '',
				initLevel: '',
				preclickLevel: '',
				dealRow:{},
				seletArr: [],
				level: '',
				current_user_id: '',
				pickerOptions: {
					shortcuts: [{
						text: this.$t('s.zt'),
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t('s.zjyz'),
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t('s.zjygy'),
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t('s.zjsgy'),
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			}
		},
		watch: {

		},
		created() {
			this.reset();
		},
		methods: {
			getNowDate() {
				function add0(a) {
					if(a < 10) {
						return "0" + a;
					} else {
						return a
					}
				}
				let now = new Date();
				let year = now.getFullYear();
				let month = add0(now.getMonth() + 1);
				let day = add0(now.getDate());
				return '' + year + '-' + month + '-' + day
			},
			reset() {
				this.current_user_id = '';
				this.to_date = '';
				this.level = this.$store.state.user.level;
				this.seletArr = [{
					level: this.level,
					id: ''
				}];
				this.initLevel = this.level;

				this.head = this.test(header.gethead(this.level));
				this.defaultHide();
				this.getData();
			},

			test(head) {
				let arr = [];
				for(const a of head) {

					if(a.level.indexOf(parseInt(this.level)) >= 0) {
						arr.push(a)
					}
				}

				return arr

			},
			getData() {
				let a = '';
				if(this.current_user_id != '') {
					a = `&current_level=${this.level}&current_user_id=${this.current_user_id}`
				}
				request({
					method: 'get',
					url: `/index.php?r=btc/report/index&before_date=${this.time[0]}&later_date=${this.time[1]}${a}&page=${this.page.current}`
				}).then(res => {
					//console.log(res)
					this.tableData = res.data.data.list;
					this.tableData.push(res.data.data.total);
					this.tableData[this.tableData.length - 1].user_name = "总计";
					this.tableData[this.tableData.length - 1].to_date = "总计";

				})
				//重置表头为默认隐藏部分状态
				for(const a in this.hideStatus) {
					
					this.hideStatus[a].status=false				
					
				}
				this.defaultHide();
			},
			tabCurrent(row) {
				if(this.preclickLevel == row.level) {
					return;
				}
				this.level = row.level;
				this.preclickLevel = row.level
				this.head = this.test(header.gethead(this.level));
				this.seletArr.push({
					level: row.level,
					user_name: row.user_name,
					user_account: row.user_account,
					id: row.user_id
				})
				this.current_user_id = row.user_id;
				this.getData()
			},
			//导航条点击跳转到对应等级
			tabLevel(item, index) {
				this.to_date = '';
				this.level = item.level;
				this.preclickLevel = '';
				this.current_user_id = item.id;
				this.head = this.test(header.gethead(this.level));
				this.seletArr.splice(index + 1, this.seletArr.length - index - 1);
				this.page.current=1;
				this.getData();

			},
			//切换到当日成交单
			swicthDeal(row) {
				//console.log(row)
				this.to_date = row.to_date;
				this.dealRow=row;
				this.page.current=1;
				this.getDealData();
				
			},
			getDealData(){
				request({
					method: 'get',
					url: `/index.php?r=btc/report/index&to_date=${this.dealRow.to_date}&current_level=${this.dealRow.level}&current_user_id=${this.dealRow.user_id}&page=${this.page.current}`
				}).then(res => {
					//console.log(res)
					this.dealData = res.data.data.list;
					this.page.total = res.data.data.page.total;
				})
			},
			changePage(val) {
				this.page.current = val;
				this.getDealData()
			},
			back() {
				this.to_date = '';
				this.getData()
			},
			hide(item) {
				if(!this.hideStatus[item.property]) {
					return
				}
				

				if(this.hideStatus[item.property].status) {
					this.hideStatus[item.property].status = false;
				
				} else {
					this.hideStatus[item.property].status = true;				
				}
				this.defaultHide();
				
			},
			//默认全部隐藏
			defaultHide(){
				let arr = [],hideAll=[];
				for(const a in this.hideStatus) {
					if(!this.hideStatus[a].status){
						hideAll=hideAll.concat(this.hideStatus[a].hideArr)					
					}
				}
			    for(const i of this.test(header.gethead(this.level))) {
					if(hideAll.indexOf(i.value) < 0) {
						arr.push(i)
					}
				}
			    this.head = arr;
			}

		}
	}
</script>
<style lang="less">
	.profitStatement {
		.class0 {
			background: #fff;
		}
		.class1 {
			background: rgb(244, 240, 240);
		}
		.class2 {
			background: rgb(235, 229, 255);
		}
		.class3 {
			background: #fff;
		}
		.class4 {
			background: rgb(245, 239, 239);
		}
	}
</style>
<style lang="less" scoped>
	span {
		margin: 0;
		padding: 0;
	}
	
	.back {
		&:hover {
			color: #00B38B;
			cursor: pointer;
		}
	}
	.red{
		color:red
	}
	a.tab {
		text-decoration: underline;
		&:hover {
			cursor: pointer;
			color: #0000FF;
		}
	}
</style>