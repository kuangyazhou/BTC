<template>
	<div class="content">
		<div class="tab_head">
			<ul>
				<li v-for="(item,index) in menu" @click.stop="handleClick(index)" :class="{'on':active==item.value}" :key="index">{{item.label}}</li>
			</ul>
		</div>
		<div class="content_bd">
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				menu: [{
					value: 0,
					label: '银行卡转账',
					path: '/pay1'

				}
//				,
//				{
//					value: 1,
//					label: '在线支付',
//					path: '/onlinePay1'
//
//				}, {
//					value: 2,
//					label: '微信支付',
//					path: '/wechatPay'
//
//				}, {
//					value: 3,
//					label: 'QQ钱包',
//					path: 'qqPay'
//				}
				]
			}
		},

		methods: {
			handleClick(index) {
				this.active = index;
				this.$router.push({
					'path': this.menu[index].path
				})
			}
		}
	}
</script>

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
						li:nth-child(2) {
							background-position: 10px -400px;
						}
						li:nth-child(3) {
							background-position: 10px -50px;
						}
						li:nth-child(4) {
							background-position: 10px -100px;
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