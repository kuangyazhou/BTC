<template>
	<div class="" v-if="showDialog">
		<el-dialog :title="$t('l.jiaoyi')" width="30%" top="30vh" :visible.sync="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false" center>
			<div class="mod_hd">
				<span :class="{'cur':entrusted_type==1}" @click="changeDialogType(1)">{{$t('l.xjjy')}}</span>
				<span :class="{'cur':entrusted_type==0}" @click="changeDialogType(0)">{{$t('l.scjy')}}</span>
			</div>
			<div class="mod_bd">
				<div class="panel">
					<div class="hd">
						<span>{{$t('l.ky')}}</span>
						<span class="buy_available">{{userInfo.avail_deposit_amount||0.00}}</span>
						<span>USDT</span>
						<a @click="$router.push({'path':'/userCenter'})">{{$t('l.cb')}}</a>
					</div>
					<div class="bd">
						<div class="input-text input-price" v-if="entrusted_type==1">
							<div class="label" v-show="orders.order_direction==-1">{{$t('l.mrj')}}</div>
							<div class="label" v-show="orders.order_direction==1">{{$t('l.mcj')}}</div>
							<label>
                     					<input type="text" maxlength="14" v-model="entrusted_price" @input="entrusted_price=entrusted_price.replace(/[^0-9.]/g, '')"/>
                     					<span>USDT</span>
                     		</label>
							<div class="math-price">
								≈ {{entrusted_price*userInfo.exchange_rate||0.00}} CNY
							</div>
						</div>
						<div class="input-text  input-price" v-if="entrusted_type==0">
							<div class="label" v-show="orders.order_direction==-1">{{$t('l.mrj')}}</div>
							<div class="label" v-show="orders.order_direction==1">{{$t('l.mcj')}}</div>
							<label>
                     					<input type="text" disabled="disabled" :placeholder="$t('l.ysczyjgmr')"/>
                     					<span>USDT</span>
                            </label>

						</div>
						<div class="input-text" v-if="entrusted_type==0">
							<div class="label">{{$t('ar.bjdc')}}</div>
							<label>
                     					<input type="text" maxlength="14" v-model="accept_change_range" @input="accept_change_range=accept_change_range.replace(/[^0-9.]/g, '')"/>
                     					<span>USDT</span>
                     	    </label>

						</div>
						<div class="input-text">
							<div class="label" v-show="orders.order_direction==-1">{{$t('l.mrl')}}</div>
							<div class="label" v-show="orders.order_direction==1">{{$t('l.mcl')}}</div>
							<label>
                     			<input type="text" maxlength="14" v-model="entrusted_number" @input="entrusted_number=entrusted_number.replace(/[^0-9.]/g, '')"/>
                     			<span>BTC</span>
                     	    </label>

						</div>
						<div class="account-range">
							<span class="min">{{$t('ar.sxf')}} {{(entrusted_price*entrusted_number*userInfo.close_fee_percentage/100||0.00).toFixed(2)}} USDT</span>
							<!--<span class="max">0.0000 USDT</span>-->
							<div class="total" v-if="entrusted_type==1">
								{{$t('l.jye')}} {{(entrusted_price*entrusted_number).toFixed(2)||0.00}} USDT
							</div>
						</div>
					</div>
				</div>

			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="resetDialog">{{$t('ar.qx')}}</el-button>
		    <el-button type="primary" @click="dealHoldOrder">{{$t('message.confirm')}}</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import request from '@/utils/request';
	import {
		Message,
	} from 'element-ui'

	export default {
		props: ['orders'],
		data() {
			return {
				entrusted_type: 1,
				entrusted_number: '',
				entrusted_price: '',
				accept_change_range: '',
				dialogVisible: true,
				showDialog: false
			}
		},
		mounted(){
			this.changeDialogType(1)
		
		},
		watch:{
			orders:function(val){
				if(val.order_direction == -1) {			
					this.entrusted_price = this.dayPrice[0][2];
				} else if(this.orders.order_direction == 1){
					this.entrusted_price = this.dayPrice[0][2]-this.userInfo.user_order_diff;
				}
			}
		},
		computed: {
			userInfo: function() {
				return this.$store.state.user.userInfo
			},
			dayPrice:function(){
								
				return this.$store.state.user.dayPrice
			},
			newSellPrice:function(){
				
				if(this.userInfo){
					return this.dayPrice&&this.dayPrice[0][2]-this.userInfo.user_order_diff;//卖出时减去点差
				}
				
			}
			
		},

		methods: {
			//重置弹框数值
			changeDialogType(a) {
				this.entrusted_type = a;		
				this.buy_profit_limit = '';
				this.buy_loss_limit = '';
				this.entrusted_number = '';
				this.stop_loss_limit = '';
				this.stop_profit_limit = '';
				this.accept_change_range = '';
			},
			resetDialog() {
				this.showDialog = false;
				this.changeDialogType(1);
			},
			dealHoldOrder() {

				if(this.entrusted_number > parseFloat(this.orders.holding_number)) {
					Message({
						type: 'wraning',
						message: this.$t('l.Msg1')
					});
					return;
				}
				if(this.entrusted_type == 0) {
					if(this.orders.order_direction == -1) {
						this.entrusted_price = this.dayPrice[0][2];
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
				request({
					data: data,
					method: 'post',
					url: '/index.php?r=btc/order/close-entrust-order'
				}).then(res => {
					if(res.data.status == 1) {
						Message({
							message: this.$t('l.Msgwtcg'),
							type: 'success'
						});
						this.showDialog = false;
					}
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.mod_hd {
		padding: 0 30px;
		span {
			display: inline-block;
			height: 48px;
			line-height: 48px;
			font-size: 16px;
			cursor: pointer;
			margin-right: 40px;
		}
		span.cur {
			border-bottom: 1px solid blue;
			color: blue;
		}
	}
	
	.mod_bd {
		padding: 0 0 0px 30px;
		display: flex;
		.panel {
			flex: 1;
			.hd {
				line-height: 50px;
				height: 50px;
				margin-right: 20px;
				border-bottom: 1px solid blue;
				font-size: 14px;
				a {
					float: right;
					margin-right: 20px;
					text-decoration: none;
					cursor: pointer;
					&:hover {
						text-decoration: underline;
					}
				}
			}
			.bd {
				padding: 18px 20px 0 0;
				.input-price {
					height: 92px;
				}
				.input-text {
					padding-bottom: 18px;
					position: relative;
					.label {
						height: 26px;
						line-height: 26px;
						font-size: 14px;
					}
					label {
						display: block;
						position: relative;
						input {
							width: 100%;
							height: 40px;
							border: 1px solid #4E5B85;
							box-sizing: border-box;
							border-radius: 3px;
							font-size: 16px;
							text-indent: 20px;
							outline: 0;
						}
						span {
							position: absolute;
							top: 0px;
							right: 20px;
							height: 40px;
							line-height: 40px;
						}
					}
					.math-price {
						height: 24px;
						line-height: 24px;
						overflow: hidden;
						padding-left: 20px;
						background: #4E5B85;
						margin-top: -1px;
						font-size: 12px;
						color:#fff;
					}
					.slide {}
				}
				.price-limit {
					display: flex;
				}
				.price-limit>div {
					flex: 1;
					text-align: center;
					margin: 0 40px;
				}
				.account-range {
					margin-bottom: 76px;
					position: relative;
					.min {
						float: left;
					}
					.max {
						float: right;
					}
					.total {
						position: absolute;
						left: 0;
						top: 30px;
						font-size: 16px;
					}
				}
				.submit {
					width: 100%;
					height: 40px;
					line-height: 40px;
					box-sizing: border-box;
					font-size: 16px;
					padding: 0;
					text-transform: uppercase;
					color: white;
					border-radius: 3px;
					border: none;
					text-align: center;
				}
				.btn_sell {
					background: #AE4E54;
				}
				.btn_buy {
					background: #589065;
				}
			}
		}
	}
</style>