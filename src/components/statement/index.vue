<template>
	<div class="money">
		
		<el-tabs v-model="activeName" @tab-click="tabClick" style="margin-top:0.5em;">
			<el-tab-pane :label="$t('s.ykbb')" name="profitStatement">
				<profitStatement ref="profitStatement" ></profitStatement>
			</el-tab-pane>
			<el-tab-pane :label="$t('s.ccdbb')" name="holdStatement">
				<el-row >
					<el-date-picker v-model="time" unlink-panels size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
					</el-date-picker>
					<el-form :inline="true" size="mini" :model="search" ref="search" style="margin-top:0.5em;">
						<el-col>
							<el-form-item :label="$t('message.memberAccount')" prop="account">
								<el-input v-model="search.account"></el-input>
							</el-form-item>
							<el-form-item :label="$t('l.ccdh')" prop="ordernum">
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
						<el-table :data="Data.holdStatement" :border="false"  size="mini" v-loading="loading" height='45vh' style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
							<el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
							<el-table-column align="center" :label="$t('l.hyzh')" prop="user_account"></el-table-column>
							<el-table-column align="center" :label="$t('l.hymc')" prop="user_name"></el-table-column>
							<el-table-column align="center" :label="$t('l.ccdh')" >
								<template slot-scope="scope">
							        <el-popover trigger="hover" placement="top" style="height:20px">
							          <span>{{ scope.row.order_number }}</span>

							          <div slot="reference" class="name-wrapper">
							            <span>{{'~'+scope.row.order_number.substr(scope.row.order_number.length-8)}}</span>
							          </div>
							        </el-popover>
							    </template>
							</el-table-column>
							<el-table-column align="center" :label="$t('message.keep_time')" prop="order_date"></el-table-column>
							<el-table-column align="center" :label="$t('l.spmc')" prop="product_name"></el-table-column>
							<el-table-column :label="$t('l.mmfx')">
								<template slot-scope="scope">
									{{$t('l.order_direction['+scope.row.order_direction+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.ccsl')" prop="holding_number"></el-table-column>
							<el-table-column align="center" :label="$t('l.zsj')" prop="stop_loss_limit"></el-table-column>
							<el-table-column align="center" :label="$t('l.zyj')" prop="stop_profit_limit"></el-table-column>
							<el-table-column align="center" :label="$t('l.jcj')" prop="open_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.ccj')" prop="hold_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.jsj')" prop="settle_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.jsyk')" prop="settle_loss_win"></el-table-column>
							<el-table-column align="center" :label="$t('l.zybzj')" prop="used_deposit_amount"></el-table-column>
							<el-table-column align="center" :label="$t('message.comPen')" prop="share_amount_num"></el-table-column>
							<el-table-column align="center" :label="$t('message.comFloat')" prop="share_float_win_loss"></el-table-column>
							<el-table-column align="center" :label="$t('l.jcsj')" prop="entrusted_times"></el-table-column>
						</el-table>
						<div class="flex center">
							<el-pagination layout="prev,pager,next" :current-page="page.current" @current-change="changePage" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane :label="$t('s.wtdbb')" name="entrustStatement">
				<el-row >
					<el-date-picker v-model="time" unlink-panels size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
					</el-date-picker>
					<el-form :inline="true" size="mini" :model="search" ref="search" style="margin-top:0.5em;">
						<el-col>
							<el-form-item :label="$t('message.memberAccount')" prop="account">
								<el-input v-model="search.account"></el-input>
							</el-form-item>
							<el-form-item :label="$t('message.entrust_num')" prop="ordernum">
								<el-input v-model="search.ordernum"></el-input>
							</el-form-item>
							<el-form-item :label="$t('l.jcpc')" prop="account">
								<el-select v-model="search.otype" :placeholder="$t('s.qxzjcfx')">
									<el-option :label="$t('s.qb')" value="''"></el-option>
									<el-option :label="$t('l.order_type[0]')" value="0"></el-option>
									<el-option :label="$t('l.order_type[1]')" value="1"></el-option>
								</el-select>
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
						<el-table :data="Data.entrustStatement" :border="false"  size="mini" v-loading="loading" height='45vh' style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
							<el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
							<el-table-column align="center" :label="$t('l.hyzh')" prop="user_account"></el-table-column>
							<el-table-column align="center" :label="$t('l.hymc')" prop="user_name"></el-table-column>
							<el-table-column align="center" :label="$t('message.entrust_num')" >
								<template slot-scope="scope">
							        <el-popover trigger="hover" placement="top" style="height:20px">
							          <span>{{ scope.row.order_number }}</span>

							          <div slot="reference" class="name-wrapper">
							            <span>{{'~'+scope.row.order_number.substr(scope.row.order_number.length-8)}}</span>
							          </div>
							        </el-popover>
							     </template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.wtsj')" prop="order_date"></el-table-column>
							<el-table-column align="center" :label="$t('l.spmc')" prop="product_name"></el-table-column>
							<el-table-column :label="$t('l.jcpc')">
								<template slot-scope="scope">
									{{$t('l.order_type['+scope.row.order_type+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.mmfx')">
								<template slot-scope="scope">
									{{$t('l.order_direction['+scope.row.order_direction+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.wtsl')" prop="entrusted_number"></el-table-column>
							<el-table-column align="center" :label="$t('message.member_diff')" prop="accept_change_range"></el-table-column>
							<el-table-column align="center" :label="$t('l.wtj')" prop="entrusted_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.zsj')" prop="stop_loss_limit"></el-table-column>
							<el-table-column align="center" :label="$t('l.zyj')" prop="stop_profit_limit"></el-table-column>
							<el-table-column align="center" :label="$t('s.cjj')" prop="deal_price"></el-table-column>
							<el-table-column :label="$t('s.wtzt')">
								<template slot-scope="scope">
									{{$t('l.order_status['+scope.row.order_status+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('message.comPen')" prop="share_amount_num"></el-table-column>
						</el-table>
						<div class="flex center">
							<el-pagination layout="prev,pager,next" :current-page="page.current" @current-change="changePage" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane :label="$t('s.cjdbb')" name="dealStatement">
				<el-row>
					<el-date-picker v-model="time" unlink-panels  size="mini" value-format="yyyy-MM-dd" type="daterange" :picker-options="pickerOptions" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
					</el-date-picker>
					<el-form :inline="true" size="mini" :model="search" ref="search" style="margin-top:0.5em;">
						<el-col>
							<el-form-item :label="$t('message.memberAccount')" prop="account">
								<el-input v-model="search.account"></el-input>
							</el-form-item>
							<el-form-item :label="$t('l.cjdh')" prop="ordernum">
								<el-input v-model="search.ordernum"></el-input>
							</el-form-item>
							<el-form-item :label="$t('l.jcpc')" prop="account">
								<el-select v-model="search.otype" :placeholder="$t('s.qxzjcfx')">
									<el-option :label="$t('s.qb')" value="''"></el-option>
									<el-option :label="$t('l.order_type[0]')" value="0"></el-option>
									<el-option :label="$t('l.order_type[1]')" value="1"></el-option>
								</el-select>
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
						<el-table :data="Data.dealStatement" :border="false" ref="3" size="mini" v-loading="loading" height='45vh' style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
							<el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
							<el-table-column align="center" :label="$t('l.hyzh')" prop="user_account"></el-table-column>
							<el-table-column align="center" :label="$t('l.hymc')" prop="user_name"></el-table-column>
							<el-table-column align="center" :label="$t('l.cjdh')" >
								<template slot-scope="scope">
							        <el-popover trigger="hover" placement="top" style="height:20px">
							          <span>{{ scope.row.order_number }}</span>

							          <div slot="reference" class="name-wrapper">
							            <span>{{'~'+scope.row.order_number.substr(scope.row.order_number.length-8)}}</span>
							          </div>
							        </el-popover>
							     </template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.ccdh')" width="120" >
				
								 <template slot-scope="scope">
							        <el-popover trigger="hover" placement="top" style="height:20px">
							          <span>{{ scope.row.hold_order_number }}</span>

							          <div slot="reference" class="name-wrapper">
							            <span>{{'~'+scope.row.hold_order_number.substr(scope.row.hold_order_number.length-8)}}</span>
							          </div>
							        </el-popover>
							      </template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.cjsj')" prop="order_times"></el-table-column>
							<el-table-column align="center" :label="$t('l.spmc')" prop="product_name"></el-table-column>
							<el-table-column :label="$t('l.jcpc')">
								<template slot-scope="scope">
									{{$t('l.order_type['+scope.row.order_type+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.mmfx')">
								<template slot-scope="scope">
									{{$t('l.order_direction['+scope.row.order_direction+']')}}
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('l.cjl')" prop="deal_number"></el-table-column>
							<el-table-column align="center" :label="$t('l.cjje')" prop="deal_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.jcj')" prop="open_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.ccj')" prop="hold_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.pcj')" prop="close_price"></el-table-column>
							<el-table-column align="center" :label="$t('l.sjyk')" prop="win_loss_amount"></el-table-column>
							<el-table-column align="center" :label="$t('l.hysxf')" prop="service_fee"></el-table-column>
							<el-table-column align="center" :label="$t('message.member_night')" prop="overnight_fee"></el-table-column>
							<el-table-column align="center" :label="$t('message.comPen')" prop="share_amount_num"></el-table-column>
							<el-table-column align="center" :label="$t('message.comWin')" prop="share_win_loss"></el-table-column>
							<el-table-column align="center" :label="$t('message.comCharge')" prop="share_service_fee"></el-table-column>
							<el-table-column align="center" :label="$t('message.comNight')" prop="share_overnight_fee"></el-table-column>
							<el-table-column :label="$t('l.cjlx')">
								<template slot-scope="scope">
									{{$t('l.deal_type['+scope.row.deal_type+']')}}
								</template>
							</el-table-column>
						</el-table>
						<div class="flex center">
							<el-pagination layout="prev,pager,next" :current-page="page.current" :page-size="20" @current-change="changePage" :total="page.total*20" key="pageination"></el-pagination>
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
	import profitStatement from './profitStatement'
	export default {
		components:{
			profitStatement
		},
		data() {
			return {
				loading: false,
				activeName: 'profitStatement',
				search: {},
				time: [],
				formList: {
					profitStatement: {

					},
					entrustStatement: {
						url: 'index.php?r=btc/report-order/get-entrusteds&account'
					},
					holdStatement: {
						url: 'index.php?r=btc/report-order/get-holds'
					},
					dealStatement: {
						url: 'index.php?r=btc/report-order/get-deals'
					}

				},
				page: {
					current: 1,
					total: 1
				},
				Data: {
					profitStatement:[],
					entrustStatement:[],
					holdStatement:[],
					dealStatement:[]
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
		
		},
		mounted() {},
		methods: {
			reset() {
				this.time = [];
				this.search = {}
			},
			tabClick(e) {
				if(this.activeName=='profitStatement'){
					this.$refs.profitStatement.reset()
		        	return;
		        }
				this.getData()
			},
			changePage(val) {
				this.page.current = val;
				this.getData();
			},
			getData() {
			
				request({
					url: `${this.formList[this.activeName].url}&account=${this.search.account||''}&ordernum=${this.search.ordernum||''}
				 		&otype=${this.search.otype||''}&sdate=${this.time[0]||''}&edate=${this.time[1]||''}&page=${this.page.current}`,
					method: 'get'
				}).then(res => {

					this.Data[this.activeName] = res.data.data.list;
					this.page.total = res.data.data.page.total;
				})
			}
		}
	};
</script>

<style scoped>
	/* .money-table {
  max-height: 50vh;
  overflow-y: auto;
} */
.name-wrapper{
	cursor: pointer;
}
</style>