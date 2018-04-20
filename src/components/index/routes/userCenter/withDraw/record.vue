<template>
	<div class="record">
		
		<el-tabs v-model="activeName" @tab-click="tabClick" style="margin-top:0.5em;">
			
			<el-tab-pane :label="$t('s.czjl')" name="inRecord">
				<el-row >
					<el-form :inline="true" size="mini" :model="search" ref="search">
						<el-col>
							<el-form-item :label="$t('s.sj')" >
								<el-date-picker v-model="time" size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
		  						</el-date-picker>
							</el-form-item>
							<el-form-item :label="$t('order.ddh')" prop="ordernum">
								<el-input v-model="search.ordernum"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="mini" @click="getData">{{$t('message.search')}}</el-button>
								<el-button size="mini" @click="reset">{{$t('l.chz')}}</el-button>
							</el-form-item>
						</el-col>
					</el-form>

				</el-row>
				<el-row>
					<el-col style="margin-top:0.5em;">
						<el-table :data="Data.inRecord" :border="false"  size="mini" v-loading="loading"  style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
							<el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
							<el-table-column align="center" :label="$t('order.ddh')" prop="pay_number"></el-table-column>
							<el-table-column align="center" :label="$t('s.czsj')" prop="add_time"></el-table-column>						
							<el-table-column align="center" :label="$t('s.czje')" prop="amount"></el-table-column>
							<el-table-column align="center" :label="$t('s.czfs')">
								<template slot-scope="scope" v-if="scope.row.pay_way">
									{{$t('s.pay_way['+scope.row.pay_way+']')}}
								</template>
							</el-table-column>
                            <el-table-column align="center" :label="$t('s.rksxf')" prop="service_fee"></el-table-column>
							<el-table-column align="center" :label="$t('s.czzt')" >
								<template slot-scope="scope">
									{{$t('s.op_status['+scope.row.op_status+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('s.sjcz')" >
								<template slot-scope="scope">
									{{scope.row.amount-scope.row.service_fee}}
								</template>
							</el-table-column>
						
						</el-table>
						<div class="flex center">
							<el-pagination layout="prev,pager,next" :current-page="page.current" @current-change="changePage" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane :label="$t('s.txjl')" name="outRecord">
				<el-row >
					<el-form :inline="true" size="mini" :model="search" ref="search">
						<el-col>
							<el-form-item :label="$t('s.sj')" >
								<el-date-picker v-model="time" size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
		  						</el-date-picker>
							</el-form-item>
							<el-form-item :label="$t('order.ddh')" prop="ordernum">
								<el-input v-model="search.ordernum"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="mini" @click="getData">{{$t('message.search')}}</el-button>
								<el-button size="mini" @click="reset">{{$t('l.chz')}}</el-button>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row >
	
					<el-col style="margin-top:0.5em;">
						<el-table :data="Data.outRecord" :border="false"  size="mini" v-loading="loading"  style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
						<el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
							<el-table-column align="center" :label="$t('order.ddh')" prop="pay_number"></el-table-column>
							<el-table-column align="center" :label="$t('s.txsj')" prop="add_time"></el-table-column>						
							<el-table-column align="center" :label="$t('s.txje')" prop="amount"></el-table-column>

                            <el-table-column align="center" :label="$t('ar.sxf')" prop="service_fee"></el-table-column>
							<el-table-column align="center" :label="$t('s.txyh')" prop="bank_name"></el-table-column>
							<el-table-column align="center" :label="$t('s.yhkws')" prop="bank_user_account'"></el-table-column>
							<el-table-column align="center" :label="$t('s.txzt')" >
								<template slot-scope="scope">
									{{$t('s.op_status['+scope.row.op_status+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('s.bz')" prop="remark"></el-table-column>
						</el-table>
						<div class="flex center">
							<el-pagination layout="prev,pager,next" :current-page="page.current" @current-change="changePage" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
		
	
		</el-tabs>
	</div>
</template>

<script>
	import request from '@/utils/request';
	import Vue from "vue";
	import {
		Button,
		Input,
		Loading,
		Form,
		FormItem,
		Select,
		Option,
		Tabs,
		TabPane,
		Table,
		Popover,
		TableColumn,
		Dialog,
		DatePicker,
		Pagination
	} from "element-ui";
	Vue.use(Popover);
	Vue.use(Button);
	Vue.use(Input);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Select);
	Vue.use(Option);
	Vue.use(Tabs);
	Vue.use(TabPane);
	Vue.use(Table);
	Vue.use(Loading);
	Vue.use(TableColumn);
	Vue.use(Dialog);
	Vue.use(DatePicker);
	Vue.use(Pagination);

	export default {

		data() {
			return {
				loading: false,
				activeName: 'inRecord',
				search: {},
				time: [],
				formList: {
					inRecord: {
						url: '/index.php?r=btc/member-pay/history-list&type=0'
					},
					outRecord: {
						url: '/index.php?r=btc/member-pay/history-list&type=1'
					}
				},
				page: {
					current: 1,
					total: 1
				},
				Data: {
					inRecord:[],
					outRecord:[]
				},
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
		created() {
			this.getData()
		},
		mounted() {},
		methods: {
			reset() {
				this.time = [];
				this.search = {}
			},
			tabClick(e) {
				this.getData()
			},
			changePage(val) {
				this.page.current = val;
				this.getData();
			},
			getData() {

				request({
					url: `${this.formList[this.activeName].url}&ordernum=${this.search.ordernum||''}
				 		&sdate=${this.time[0]||''}&edate=${this.time[1]||''}&page=${this.page.current}`,
					method: 'get'
				}).then(res => {
					//console.log(res)
					this.Data[this.activeName] = res.data.data.list;
					this.page.total = res.data.data.page.total;
				})
			}
		}
	};
</script>

<style scoped lang="less">
	/* .money-table {
  max-height: 50vh;
  overflow-y: auto;
} */
.name-wrapper{
	cursor: pointer;
}
.record{
	padding: 20px;
}
</style>