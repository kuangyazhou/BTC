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
	Message
} from "element-ui";
Vue.use(Button);
Vue.use(Row);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {

	data() {
		return {
			activeNames: '1',
			goodsList: [{
				name: 'USD',
				price: 0.100556666,
				range: '10%'
			}, {
				name: 'BCH',
				price: 0.100556666,
				range: '-12%'
			}]
		}
	},
	methods: {
		handleChange(val) {
			console.log(val);
		}
	}
}