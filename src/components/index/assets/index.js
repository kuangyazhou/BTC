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
	TableColumn,
	Message
} from "element-ui";
Vue.use(Button);
Vue.use(Row);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
import kl_echarts from './echarts.vue'
export default {
	components:{kl_echarts}
		
	,
	mounted() {
		this.lg = localStorage.getItem("lang");
		this.$i18n.locale = this.lg; //设置语言

	},
	data() {
		return {
			activeNames: '1',
			lg: 'cn',
			goodsList: [{
				name: 'USD',
				price: 0.100556666,
				range: '10%'
			}, {
				name: 'BCH',
				price: 0.100556666,
				range: '-12%'
			}],
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	},
	methods: {
		handleChange(val) {
			console.log(val);
		},
		changeLn() {
			this.lg = this.lg == 'cn' ? 'en' : 'cn',
				localStorage.setItem("lang", this.lg);
			this.$i18n.locale = this.lg; //设置语言
		}
	}
}