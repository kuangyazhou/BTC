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
Vue.use(Message);
Vue.use(MessageBox);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
import axios from 'axios'
import kl_echarts from './echarts.vue'
import tradeDialog from './dialog.vue'
import DATA from './DATA.js'
export default {
	components: {
		kl_echarts,
		tradeDialog
	},
	mounted() {
		this.lg = localStorage.getItem("lang");
		this.$i18n.locale = this.lg; //设置语言
		this.getProductInfo();
		if(this.$store.state.user.userInfo != null) {
			this.userInfo = this.$store.state.user.userInfo;
		}
		
		if(this.loginStatus){
			this.timer = setInterval(() => {
				this.getInfo();			
			}, 10000)
		}
		
		//console.log(this.userInfo)
	},
	watch:{
		loginStatus:function(val){
			if(!val){
				clearInterval(this.timer);
			}
		}
	},
	
	computed:{
        	loginStatus:function(){
        		
        		return this.$store.state.user.token||false
        	}
        },
	data() {
		return {
			activeNames: '1',
			userInfo: '',
			initial:true,
			buyRange:'', //买入点差
			sellRange:'',//卖出点差
			newBuyPrice: '', //实时价格
			newSellPrice: '', //实时价格
			buyNum: '',
			buyPrice: '',
			sellPrice: '',
			canBuy:false,
			canSell:false,
			canUndo:true,
			buy_profit_limit: '',
			buy_loss_limit: '',
			sell_profit_limit: '',
			sell_loss_limit: '',
			sellNum: '',
			order_direction: 1, //买卖方向
			entrusted_type: 1, //委托类型,0市场,1限价
			entrusted_price: '', //委托价格,
			entrusted_number: '', //委托数量
			stop_profit_limit: '', //止盈价格
			stop_loss_limit: '', //止损价格
			accept_change_range:'',
			dialogVisible:true,
			goodsList: [{
				name: 'USD',
				price: 0.100556666,
				range: '10%'
			}, {
				name: 'BCH',
				price: 0.100556666,
				range: '-12%'
			}],
			my_orders: []
		}
	},
	methods: {
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
			this.buyRange='';
			this.sellRange='';
			this.accept_change_range='';
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
				if(this.entrusted_type==0){
					this.entrusted_price = this.newBuyPrice;
					this.accept_change_range=this.buyRange;
				}
				if(this.buy_profit_limit && this.buy_loss_limit && this.buy_profit_limit <= this.buy_loss_limit) {
					Message({
						message: '买入时止损价应小于止盈价！',
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
				if(this.entrusted_type==0){
					this.entrusted_price = this.newSellPrice;
					this.accept_change_range=this.sellRange;
				}
				if(this.buy_profit_limit && this.buy_loss_limit && this.buy_profit_limit >= this.buy_loss_limit) {
					Message({
						message: '卖出时止损价应大于止盈价！',
						type: 'warning'
					});
					return;
				}
			}
			this.sendOrder();
		},
		//表单的撤销订单操作 
		undoClick(row) {
			console.log(row);
			let data = {
				order_id: row.order_id
			}
			MessageBox.confirm('是否确认撤销该笔订单?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
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
					message: '撤销订单成功!'
				});
			}
		},
		//平仓操作
		closeClick(data){
			console.log(data)
			this.$refs.dialog.show();
			this.sendOrder=data;
		},
		async sendOrder() {
			let data = {
				order_direction: this.order_direction,
				entrusted_price: this.entrusted_price,
				entrusted_number: this.entrusted_number,
				entrusted_type: this.entrusted_type,
				stop_profit_limit: this.stop_profit_limit,
				stop_loss_limit: this.stop_loss_limit,
				ccept_change_range:this.accept_change_range
			}
			const res = await DATA.order(data);
			//console.log(res);
			if(res.status == 1) {
				Message({
					message: '委托成功！',
					type: 'success'
				});
			}
		},
		//获取订单 及用户信息
		async getInfo() {
			const res = await DATA.getUserInfo();
			if(res.data) {
				this.userInfo = res.data;
				this.userInfo.open_order_sale=0;
				this.my_orders = res.data.my_orders;
				this.canBuy=this.userInfo.user_privileges.open_order_buy==1?false:true,
			    this.canSell=this.userInfo.user_privileges.open_order_sale==1?false:true,
			    this.canUndo=this.userInfo.user_privileges.open_order_undo==1?true:false
				
			}

			//console.log(this.userInfo);
		},
		//通过echarts子组件获取实时价格
		getPrice(val) {
			//console.log(val);
			this.newBuyPrice = val;
			if(this.userInfo.user_order_diff)
			this.newSellPrice= val-this.userInfo.user_order_diff;//卖出时减去点差
			if(this.initial){
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
		}

	}
}