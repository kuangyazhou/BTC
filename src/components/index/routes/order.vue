<template>
	<div class="order">
		<closeOut ref="dialog" :orders="orders"></closeOut>
		<div class="head">
			<el-form ref="form" label-width="80px">
				<el-col :span="4">

					<el-select v-model="value" :placeholder="$t('ar.qxz')" @change="getData()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>

				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('order.ddh')">
						<el-input v-model="ordernum"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('order.ddsj')">
						<el-date-picker type="date" :placeholder="$t('order.xzrq')" class="datePicker" v-model="orderdate" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="getData">{{$t('message.search')}}</el-button>
				</el-col>

			</el-form>
		</div>
		<el-table :data="order_entrusted_lists" style="width: 100%" v-show="value==0">
			<el-table-column prop="order_number" :label="$t('l.wtdddh')">
			</el-table-column>
			<el-table-column prop="order_date" :label="$t('l.wtsj')">
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
			<el-table-column prop="entrusted_number" :label="$t('l.wtsl')">
			</el-table-column>
			<el-table-column prop="entrusted_price" :label="$t('l.wtj')">
			</el-table-column>
			<el-table-column prop="stop_loss_limit" :label="$t('l.zsj')">
			</el-table-column>
			<el-table-column prop="stop_profit_limit" :label="$t('l.zyj')">
			</el-table-column>
			<el-table-column prop="service_fee" :label="$t('l.hysxf')">
			</el-table-column>
			<el-table-column :label="$t('l.ddzt')">
				<template slot-scope="scope">
					{{($t('l.order_status['+scope.row.order_status+']'))}}
				</template>
			</el-table-column>
			<el-table-column :label="$t('ar.cz')" v-show="canUndo" fixed="right">
				<template slot-scope="scope">
					<el-button @click="undoClick(scope.row)" type="text" size="small" v-if="scope.row.order_status==1&&(nowDate==orderDate||orderDate=='')">{{$t('l.chedan')}}</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-table :data="order_hold_lists" style="width: 100%" v-show="value==1">
			<el-table-column prop="order_number" :label="$t('l.ccdh')">
			</el-table-column>
			<el-table-column prop="order_date" :label="$t('l.ccsj')">
			</el-table-column>
			<el-table-column prop="product_name" :label="$t('l.spmc')">
			</el-table-column>
			<el-table-column :label="$t('l.mmfx')">
				<template slot-scope="scope">
					{{$t('l.order_direction['+scope.row.order_direction+']')}}
				</template>
			</el-table-column>
			<el-table-column prop="holding_number" :label="$t('l.ccsl')">
			</el-table-column>
			<el-table-column prop="stop_loss_limit" :label="$t('l.zsj')">
			</el-table-column>
			<el-table-column prop="stop_profit_limit" :label="$t('l.zyj')">
			</el-table-column>
			<el-table-column prop="open_price" :label="$t('l.jcj')">
			</el-table-column>
			<el-table-column prop="hold_price" :label="$t('l.ccj')">
			</el-table-column>
			<el-table-column prop="settle_price" :label="$t('l.jsj')">
			</el-table-column>
			<el-table-column prop="settle_loss_win" :label="$t('l.jsyk')">
			</el-table-column>
			<el-table-column prop="used_deposit_amount" :label="$t('l.zybzj')">
			</el-table-column>
			<el-table-column prop="entrusted_times" :label="$t('l.jcsj')">
			</el-table-column>
			<el-table-column :label="$t('l.ddzt')">
				<template slot-scope="scope">
					{{($t('l.hold_order_status['+scope.row.order_status+']'))}}
				</template>
			</el-table-column>
			<el-table-column :label="$t('ar.cz')" fixed="right">
				<template slot-scope="scope">
					<el-button @click="closeClick(scope.row)" type="text" size="small" v-if="scope.row.order_status==1&&(nowDate==orderDate||orderDate=='')">{{$t('ar.pc')}}</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-table :data="order_deal_lists" style="width: 100%" v-if="value==2">
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
		<!--<span>共{{total}}页</span>-->
		<el-pagination v-if="page>1" @current-change="changePage" :current-page.sync="page" :page-count='total' layout="total,prev, pager, next">
		</el-pagination>
	</div>
</template>

<script>
	import Vue from 'vue';
	import closeOut from './closeOut.vue'
	import request from '@/utils/request';
	import {
		Select,
		Option,
		Table,
		Form,
		Col,
		Row,
		Button,
		FormItem,
		Message,
		MessageBox,
		DatePicker,
		Pagination
	} from 'element-ui'
	Vue.use(Select);
	Vue.use(Option);
	Vue.use(Table);
	Vue.use(Col);
	Vue.use(Button);
	Vue.use(DatePicker);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Pagination);
	export default {
		components: {
			closeOut
		},
		data() {
			return {
				options: [{
					value: 0,
					label: this.$t('l.wtdd'),
					url: '/index.php?r=btc/member-order/get-order-entrusteds',
					item: function(val) {
						this.order_entrusted_lists = val || []
					}
				}, {
					value: 1,
					label: this.$t('l.ccdd'),
					url: '/index.php?r=btc/member-order/get-holds',
					item: function(val) {
						this.order_hold_lists = val || []
					}
				}, {
					value: 2,
					label: this.$t('l.cjdd'),
					url: '/index.php?r=btc/member-order/get-order-deals',
					item: function(val) {
						this.order_deal_lists = val || []
					}
				}],
				value: 0,
				total:0,
				ordernum: '',
				orderdate:'',
				orderDate: '',
				nowDate: '',
				order_entrusted_lists: [],
				order_hold_lists: [],
				order_deal_lists: [],
				currentPage: 1,
				canUndo: true,
				page: 1,
				orders: '',
				form: []
			}
		},
		mounted() {
			this.getData();
			this.nowDate = this.getDate();
	
		},
		methods: {
			getDate() {
				function add0(obj) {
					if(obj < 10) return "0" + "" + obj;
					else return obj;
				}
				let now = new Date();
				let year = now.getFullYear(); //获取四位数年数  
				let month = now.getMonth() + 1;
				let date = now.getDate();

				return year + "-" + add0(month) + "-" + add0(date);

			},
			getData() {
				this.orderDate = this.orderdate;
				request({
					method: 'get',
					url: `${this.options[this.value].url}&page=${this.page}&orderdate=${this.orderDate||''}&ordernum=${this.ordernum}`

				}).then(res => {
					this.total = res.data.data.page&&res.data.data.page.total;
					this.options[this.value].item.call(this, res.data.data.list);

				})
			},
			//平仓操作
			closeClick(data) {
				//console.log(data);
				this.orders = data;
				this.order_direction = this.orders.order_direction == 1 ? -1 : 1;
				this.$refs.dialog.showDialog = true;
			},
			//表单的撤销订单操作 
			undoClick(row) {
				let data = {
					order_id: row.order_id
				}
				MessageBox.confirm(this.$t('l.Msg3'), this.$t('l.ts'), {
					confirmButtonText: this.$t('l.qr'),
					cancelButtonText: this.$t('ar.qx'),
					center: 'center',
					type: 'warning'
				}).then(() => {
					request({
						data: data,
						method: 'post',
						url: '/index.php?r=btc/order/undo-entrust-order'
					}).then(res => {

						if(res.data.status == 1) {
							Message({
								type: 'success',
								message: this.$t('l.Msg2')
							});
						}
					})

				}).catch(() => {
					return;
				})
			},
			changePage(val) {
				this.page = val;
				this.getData();
			}
		},
	}
</script>

<style scoped lang="less">
	.order {
		padding: 20px;
		min-height: 600px;
		.datePicker {
			height: 32px;
			.el-input__inner {
				height: 32px;
			}
		}
	}
</style>