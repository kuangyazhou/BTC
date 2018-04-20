import Vue from "vue";
import {
	Button,
	Row,
	Col,
	Collapse,
	CollapseItem,
	Icon,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Table,
	Slider,
	TableColumn,
	Message,
	MessageBox,
	Dialog
} from "element-ui";
Vue.use(Button);
Vue.use(Row);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Slider);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
import axios from 'axios'
import closeOut from '../../closeOut.vue'
import countDown from '../../countDown.vue' //熔断倒计时
import kl_echarts from './echarts.vue'
import DATA from './DATA.js'
import { getUserInfo } from "@/utils/apiUtils";

export default {
	components: {
		kl_echarts,
		closeOut,
		countDown
	},
	mounted() {

		this.lg = localStorage.getItem("lang");
		this.$i18n.locale = this.lg; //设置语言
		//this.getProductInfo();
		if(this.$store.state.user.userInfo != null) {
			this.userInfo = this.$store.state.user.userInfo;
		}
		if(this.loginStatus) {
			this.getInfo();
			this.timer = setInterval(() => {
				this.getInfo();
			}, 10000)
		}
		this.getNotice()
		//console.log(this.userInfo)
	},
	beforeDestroy() {

		clearInterval(this.timer);
	},
	watch: {
		loginStatus: function(val) {
			if(!val) {
				clearInterval(this.timer);
				this.canBuy = true;
				this.canSell = true;
				this.my_orders = {
			
				};
			}
		}
	},

	computed: {
		countDown: function() {
				return this.$store.state.user.countDown
		},
		loginStatus: function() {

			return this.$store.state.user.userInfo || getUserInfo()
		}

	},
	data() {
		return {
			activeNames: '1',
			userInfo: '',
			initial: true,
			buyRange: '', //买入点差
			sellRange: '', //卖出点差
			BTCPrice: [
				[0, 0, 0, 0, 0]
			],
			newBuyPrice: '', //实时价格
			newSellPrice: '', //实时价格
			buyNum: '',
			buyPrice: '',
			sellPrice: '',
			canBuy: true,
			canSell: true,
			canUndo: true,
			buy_profit_limit: '',
			buy_loss_limit: '',
			showDialog: false,
			sell_profit_limit: '',
			sell_loss_limit: '',
			sellNum: '',
			orders: '', //弹框接受到订单信息
			order_direction: 1, //买卖方向
			entrusted_type: 1, //委托类型,0市场,1限价
			entrusted_price: '', //委托价格,
			entrusted_number: '', //委托数量
			stop_profit_limit: '', //止盈价格
			stop_loss_limit: '', //止损价格
			accept_change_range: '',
			stop_loss_limit: '',
			stop_profit_limit: '',
			dialogVisible: true,
			goodsList: [{
				name: 'USD',
				price: 0.100556666,
				range: '10%'
			}, {
				name: 'BCH',
				price: 0.100556666,
				range: '-12%'
			}],
			noticeList:[],
			my_orders: {

			}
		}
	},
	methods: {
		//获取公告
		async getNotice(){
			 const res = await DATA.getNotice();
			 this.noticeList = res.data.notice_list;
			 //接受熔断倒计时
		
			  let countDown = res.data.circular_brake;
			  this.$store.commit('getCountDown', countDown);
					
              console.log(countDown)

		},
		//限价交易和市场交易切换
		changeType(a) {
			this.entrusted_type = a;
			this.buyPrice = this.newBuyPrice;
			this.buyNum = '';
			this.buy_profit_limit = '';
			this.buy_loss_limit = '';
			this.sellPrice = this.newSellPrice;
			this.sellNum = '';
			this.sell_profit_limit = '';
			this.sell_loss_limit = '';
			this.buyRange = '';
			this.sellRange = '';
			this.accept_change_range = '';
		},

		//下单操作
		order(a) {
			this.order_direction = a;
			//买入
			if(this.order_direction == 1) {
				this.entrusted_price = this.buyPrice;
				this.entrusted_number = this.buyNum;
				this.stop_profit_limit = this.buy_profit_limit;
				this.stop_loss_limit = this.buy_loss_limit;
				if(this.entrusted_type == 0) {
					this.entrusted_price = this.newBuyPrice;
					this.accept_change_range = this.buyRange;
				}
				
				if(this.buy_profit_limit && this.buy_loss_limit && this.buy_profit_limit <= this.buy_loss_limit) {
					Message({
						message: this.$t('l.Msg5'),
						type: 'warning'
					});
					return;
				}
			}
			//卖出
			if(this.order_direction == -1) {
				this.entrusted_price = this.sellPrice;
				this.entrusted_number = this.sellNum;
				this.stop_profit_limit = this.sell_profit_limit;
				this.stop_loss_limit = this.sell_loss_limit;
				if(this.entrusted_type == 0) {
					this.entrusted_price = this.newSellPrice;
					this.accept_change_range = this.sellRange;
				}
				if(this.buy_profit_limit && this.buy_loss_limit && this.sell_profit_limit >= this.sell_loss_limit) {
					Message({
						message: this.$t('l.Msg4'),
						type: 'warning'
					});
					return;
				}
			}
			if(this.entrusted_number<=0||!this.entrusted_number){
				Message({
						message: this.$t('l.Msg6'),
						type: 'warning'
					});
					return;
			}
			this.sendOrder();
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
				this.undo(data);

			}).catch(() => {
				return;
			})
		},
		async undo(data) {
			const res = await DATA.undoOrder(data);
			if(res.status == 1) {
				Message({
					type: 'success',
					message: this.$t('l.Msg2')
				});
			}
		},
		//平仓操作
		closeClick(data) {
			//console.log(data);
			this.orders = data;
			this.order_direction = this.orders.order_direction == 1 ? -1 : 1;
			this.$refs.dialog.showDialog = true;
		},
		async dealHoldOrder() {

			if(this.entrusted_number > parseFloat(this.orders.holding_number)) {
				Message({
					type: 'wraning',
					message: this.$t('l.Msg1')
				});
				return;
			}
			if(this.entrusted_type == 0) {
				if(this.order_direction == 1) {
					this.entrusted_price = this.newBuyPrice;
				} else {
					this.entrusted_price = this.newSellPrice;
				}
			}
			let data = {
				entrusted_price: this.entrusted_price,
				entrusted_number: this.entrusted_number,
				entrusted_type: this.entrusted_type,
				hold_order_id: this.orders.order_id,
				accept_change_range: this.accept_change_range
			}
			const res = await DATA.dealHoldOrder(data);

			if(res.status == 1) {
				Message({
					message: this.$t('l.Msgwtcg'),
					type: 'success'
				});
				this.showDialog = false;
			}
		},
		async sendOrder() {
			let data = {
				order_direction: this.order_direction,
				entrusted_price: this.entrusted_price,
				entrusted_number: this.entrusted_number,
				entrusted_type: this.entrusted_type,
				stop_profit_limit: this.stop_profit_limit,
				stop_loss_limit: this.stop_loss_limit,
				accept_change_range: this.accept_change_range
			}
			const res = await DATA.order(data);
			//console.log(res);
			if(res.status == 1) {
				Message({
					message: this.$t('l.Msgwtcg'),
					type: 'success'
				});
			}
		},
		//获取订单 及用户信息
		async getInfo() {
			const res = await DATA.getUserInfo();
			if(res.data&&this.loginStatus) {
				this.userInfo = res.data;
				this.userInfo.open_order_sale = 0;
				this.noticeList = res.data.notice_list;
				this.my_orders = res.data.my_orders;
				this.canBuy = this.userInfo.user_privileges.open_order_buy == 1 ? false : true,
					this.canSell = this.userInfo.user_privileges.open_order_sale == 1 ? false : true,
					this.canUndo = this.userInfo.user_privileges.open_order_undo == 1 ? true : false

			}

			//console.log(this.userInfo);
		},
		//通过echarts子组件获取实时价格
		getPrice(val) {
			//console.log(val);
			this.BTCPrice = val;
			this.newBuyPrice = val[0][2];
			if(this.userInfo.user_order_diff)
				this.newSellPrice = val[0][2] - this.userInfo.user_order_diff; //卖出时减去点差
			if(this.initial) {
				this.buyPrice = this.newBuyPrice;
				this.sellPrice = this.newSellPrice;
				this.initial = false;
			}
		},
		getProductInfo() {
			var that = this;
			axios.get("http://account/productInfo").then(res => {
				//console.log(res)
				that.goodsList = res.data.coin;
			})
		},
		handleChange(val) {
			//console.log(val);
		},
	

	}
}