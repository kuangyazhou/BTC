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
	Message
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
import axios from 'axios'
import kl_echarts from './echarts.vue'
import DATA from './DATA.js'
export default {
	components:{kl_echarts}
		
	,
	mounted() {
		this.lg = localStorage.getItem("lang");
		this.$i18n.locale = this.lg; //设置语言
		this.getProductInfo();
		this.userInfo=this.$store.state.user.userInfo;		
		setInterval(()=>{
			this.getInfo();
		},10000)
		//console.log(this.userInfo)
	},
	computed:{
		
	},
	data() {
		return {
			activeNames: '1',
			cur:0,
			value1:0,
			buyPrice:'',
			userInfo:'',
			spread:0.00005,//点差
			buyNum:'',
			sellPrice:'',
			sellNum:'',
			sellNums:'',
			goodsList: [{
				name: 'USD',
				price: 0.100556666,
				range: '10%'
			}, {
				name: 'BCH',
				price: 0.100556666,
				range: '-12%'
			}],
			entrustOrder: [{
				date: '2016-05-02',
				name: '王小虎',
				address: 'BTC 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: 'BTC 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: 'BTC 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: 'BTC 1516 弄'
			}]
		}
	},
	methods: {
		async getInfo(){
			const res = await DATA.getUserInfo();
			this.userInfo = res.data;
			//console.log(this.userInfo);
		},
		getPrice(val){
			//console.log(val);
			this.buyPrice = val + this.spread;
			this.sellPrice = val - this.spread;
		},
		getUserInfo(){
			var that=this;
			axios.get("http://account/userInfo").then(res => {
				//console.log(res)
				that.userInfo = res.data;
			})
		},
		getProductInfo(){
			var that=this;
			axios.get("http://account/productInfo").then(res => {
				//console.log(res)
				that.goodsList = res.data.coin;
			})
		},
		handleClick(tab, event) {
				
				//console.log(tab, event);
			},
		handleChange(val) {
			console.log(val);
		}

	}
}