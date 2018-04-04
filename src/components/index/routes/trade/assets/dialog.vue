<template>
	<el-dialog title="交易" :visible.sync="dialogVisible" width="30%" top="30vh" :close-on-press-escape="false" :close-on-click-modal="false" :before-close="resetDialog" center>
		<div class="mod_hd">
			<span :class="{'cur':entrusted_type==1}" @click="changeType(1)">{{$t('l.xjjy')}}</span>
			<span :class="{'cur':entrusted_type==0}" @click="changeType(0)">{{$t('l.scjy')}}</span>
		</div>
		<div class="mod_bd">
			<div class="panel">
				<div class="hd">
					<span>{{$t('l.ky')}}</span>
					<span class="buy_available">{{userInfo.avail_deposit_amount||0.00000}}</span>
					<span>USDT</span>
					<a @click="$router.push({'path':'/userCenter'})">{{$t('l.cb')}}</a>
				</div>
				<div class="bd">
					<div class="input-text input-price" v-if="entrusted_type==1">
						<div class="label" v-if="order_direction==1">{{$t('l.mrj')}}</div>
						<div class="label" v-if="order_direction==-1">{{$t('l.mcj')}}</div>
						<label>
                     					<input type="text" maxlength="14" v-model="entrusted_price"/>
                     					<span>USDT</span>
                     			</label>
						<div class="math-price">
							≈ {{entrusted_price*userInfo.exchange_rate||0.00000}} CNY
						</div>
					</div>
					<div class="input-text  input-price" v-if="entrusted_type==0">
						<div class="label" v-if="order_direction==1">{{$t('l.mrj')}}</div>
						<div class="label" v-if="order_direction==-1">{{$t('l.mcj')}}</div>
						<label>
                     					<input type="text" disabled="disabled" :placeholder="$t('l.ysczyjgmr')"/>
                     					<span>USDT</span>
                        </label>

					</div>
					<div class="input-text price-limit">
						<div class="">
							<div class="label">{{$t('l.zsj')}}</div>
							<label>
	                     					<input type="text" maxlength="14" v-model="stop__loss_limit"/>
	                     					
	                     	</label>
						</div>
						<div class="">
							<div class="label">{{$t('l.zyj')}}</div>
							<label>
	                     					<input type="text" maxlength="14" v-model="stop_profit_limit"/>
	                     				
	                     	</label>
						</div>
					</div>
					<div class="input-text" v-if="entrusted_type==0">
						<div class="label">{{$t('ar.bjdc')}}</div>
						<label>
                     					<input type="text" maxlength="14" v-model="accept_change_range"/>
                     					<span>USDT</span>
                     	</label>

					</div>
					<div class="input-text">
						<div class="label" v-if="order_direction==1">{{$t('l.mrl')}}</div>
						<div class="label" v-if="order_direction==-1">{{$t('l.mcl')}}</div>
						<label>
                     					<input type="text" maxlength="14" v-model="entrusted_number"/>
                     					<span>BTC</span>
                     	</label>

					</div>
					<div class="account-range">
						<span class="min">{{$t('ar.sxf')}} {{entrusted_price*entrusted_number*userInfo.open_fee_percentage||0.000}} USDT</span>
						<!--<span class="max">0.0000 USDT</span>-->
						<div class="total" v-if="entrusted_type==1">
							{{$t('l.jye')}} {{entrusted_price*entrusted_number||0.000}} USDT
						</div>
					</div>
					<el-button class="submit btn_buy"  @click="order(1)" v-if="order_direction==1">
						{{$t('l.mr')}}BTC
					</el-button>
					<el-button class="submit btn_buy"  @click="order(-1)" v-if="order_direction==-1">
						{{$t('l.mc')}}BTC
					</el-button>
				</div>
			</div>

		</div>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="resetDialog">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog
	} from "element-ui";
	Vue.use(Dialog);
	export default {
		props: ['userInfos',"orders"],
		watch: {
			userInfos: function(val) {
				this.userInfo = val
			},
			orders:function(val){
				this.order = val
				this.order_direction=val.order_direction==1?-1:1
			}
		},
		created(){
			
		},
		data() {
			return {
				dialogVisible: false,
				entrusted_type: 1,
				userInfo: '',
				order:'',
				order_direction:1,
				entrusted_price:'',
				entrusted_number: '',
				stop_profit_limit: '',
				stop__loss_limit: '',
				sell_profit_limit: '',
			}
		},
		methods: {
			changeType(a) {
				this.entrusted_type = a;
				if(this.order_direction==1){
					this.entrusted_price = this.newentrusted_price;
				}else{
					this.entrusted_price = this.newSellPrice;
				}
				
				this.buy_profit_limit = '';
				this.buy_loss_limit = '';				
				this.entrusted_number = '';
				this.sell_profit_limit = '';
				this.sell_loss_limit = '';
				this.accept_change_range='';
			},
			resetDialog(){

				this.dialogVisible = false;
				this.changeType(1)
			},
			show() {
				this.dialogVisible = true
			}
		}
	}
</script>

<style scoped lang="less">
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
							top: 26px;
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