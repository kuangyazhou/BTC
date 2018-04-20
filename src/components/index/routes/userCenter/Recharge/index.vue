<template>
	<div class="content">
		<div class="tab_head">
			<ul>
				<li v-for="(item,index) in menu" @click.stop="handleClick(item.value)"  :class="[{'on':active==item.value},payWay[item.value].class]" :key="index">{{payWay[item.value].label}}</li>
			</ul>
		</div>
		<div class="content_bd" v-if="active==1">
			<zhifubao></zhifubao>
		</div>
		<div class="content_bd" v-if="active==2">
			<weixin></weixin>
		</div>
		<div class="content_bd" v-show="active==3">
			<router-view></router-view>
		</div>
		
	</div>
</template>

<script>
	import DATA from '../DATA.js'
	import {
		Message
	} from "element-ui";
	import zhifubao from './zhifubao'
	import weixin from './wechatPay'
	export default {
		components:{
			zhifubao,
			weixin
		},
		data() {
			return {
				active: 1,
				menu: [],
				payWay: {
					1: {
						label: '支付宝',
						class: 'zhifubao'
					},
					2: {
						label: '微信',
						class: 'wechat'
					},
					3: {
						label: '银行卡转账',
						class: 'car'
					},
					
				}
			}
		},
		mounted() {
			this.getCard()

		},
		methods: {
			async getCard() {
				const res = await DATA.getCardInfo();
				this.menu = res.data.typelist;
				this.$store.commit('set_rechargeWay',res.data.list)
			},
			handleClick(index) {
				this.active = index;
				if(index=='3'){
					this.$router.push({'path':'pay1'})
				}	
			}
		}
	}
</script>
<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
	}
</style>
<style scoped lang="less">
	.content {
		width: auto;
		min-height: 500px;
		margin: 10px;
		padding: 32px 24px;
		background: #fff;
		box-shadow: 0px 1px 4px rgba( 0, 0, 0, 0.35);
		.tab_head {
			height: 49px;
			border-bottom: 1px solid #ebebeb;
			li {
				list-style: none;
				float: left;
				margin-left: 3px;
				width: 101px;
				height: 45px;
				font-size: 16px;
				line-height: 45px;
				text-align: left;
				color: #777777;
				cursor: pointer;
				border: 1px solid #dadada;
				border-bottom: none;
				padding: 0px 0 3px 53px;
				background: url('./img/rbank.png') no-repeat 10px 0;
			}
			li.wechat{
				background-position: 10px -50px;
			}
			li.zhifubao{
				background-position: 10px -200px;
			}
			li.on {
				border-top: 3px solid #ea3146;
				background-color: #fff;
				color: #333;
			}
		}
		.content_bd {
			margin-top: 20px;
			padding: 0;
			text-align: left;
		}
	}
</style>