<template>
	<div class="index">
		<header>
			<img src="./img/logo.png" class="logo" @click.stop="$router.push({'path':'/welcome'})" />
			<span class="title">
				{{$t('l.aqkkdjypt')}}
			</span>
			<span class="tab">
				<el-button type="primary" class="user-button" @click.stop="$router.push({'path':'/userlogin'})" v-if="!loginStatus">登录/LOGIN</el-button>
				<el-button type="primary" class="user-button" @click.stop="logout" v-if="loginStatus">退出/LOGOUT</el-button>
				<el-button type="primary" class="user-button" @click="$router.push({'path':'/userCenter'})" v-if="loginStatus">{{$t('l.cz')}}</el-button>
				<el-button type="primary" class="user-button" @click="$router.push({'path':'/withDraw'})" v-if="loginStatus">{{$t('l.tx')}}</el-button>
				<el-button type="primary" class="user-button" @click="$router.push({'path':'/order'})" v-if="loginStatus">{{$t('l.dd')}}</el-button>
					<el-button type="primary" class="user-button" @click="$router.push({'path':'/'})" >{{$t('l.jy')}}</el-button>
				<el-dropdown @command="changeLn">
				  <el-button type="primary" class="lang-button" round medium >
				    {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
				  </el-button>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item :command="'cn'">简体中文</el-dropdown-item>
				    <el-dropdown-item :command="'en'">English</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				<!--<el-button type="primary" class="lang-button" round medium @click="changeLn">
					{{$t('l.ln')}}
				</el-button>-->
			</span>
		</header>
		<div class="body-content">
			<router-view></router-view>
		</div>
		<footer>
			<div class="wrap-link">
				<div class="link">
					<div>安全可靠的交易平台</div>
					<div class="en">
						Finex Inc.
					</div>
					<div class="online-consult">
						<div>
							在线咨询
						</div>
						<div>
							<a class='qq'>
								<img src="./img/qq.png" />
								<span>QQ交流群</span>
							</a>
							<a class='weixin'>
								<img src="./img/weixin.png" />
								<span>微信交流群</span>
							</a>
						</div>
					</div>
					<div class="list-notice">
						<ul>
							<li>{{$t('l.gsjj')}}</li>
							<li>{{$t('l.gywm')}}</li>
							<li>{{$t('l.jrwm')}}</li>
							<li>{{$t('l.yqlj')}}</li>
						</ul>
						<ul>
							<li>{{$t('l.flysm')}}</li>
							<li>{{$t('l.fysm')}}</li>
							<li>{{$t('l.fwtk')}}</li>
							<li>{{$t('l.flsm')}}</li>
						</ul>
						<ul>
							<li>{{$t('l.fwybz')}}</li>
							<li>{{$t('l.xsbz')}}</li>
							<li>{{$t('l.czzn')}}</li>
							<li>{{$t('l.jyzn')}}</li>
						</ul>
						<div class="risk-notice">
							<div class="red-notice">市场有风险 投资需谨慎</div>
							<div>比特币不由货币当局发行，不具法偿性与强制性,</div>
							<div>具有极高的价格波动风险，请在风险自担的情况下谨慎投资.</div>
							<div class="copyright">
								Copyright &copy;2013-2018 Finex Inc. All rights reserved.
							</div>
						</div>
					</div>

				</div>
			</div>

		</footer>
	</div>
</template>

<script>
	import Vue from "vue";
	import { getUserInfo } from "@/utils/apiUtils";
	import {
		Button,
		Dropdown,
		DropdownMenu,
		DropdownItem
	} from "element-ui";
	Vue.use(Button);

	Vue.use(Dropdown);
	Vue.use(DropdownMenu);
	Vue.use(DropdownItem);

	export default {
		watch:{
			loginStatus:function(val){
				if(!val){
					this.$router.push({'path':'/'})
				}
			}
		},
		computed: {
			loginStatus: function() {
				return this.$store.state.user.userInfo || getUserInfo()
			}
		},
		mounted() {
			this.lg = localStorage.getItem("lang");
			this.language = this.lag[this.lg];
			this.$i18n.locale = this.lg; //设置语言
			var marketSocketUrl = "ws://192.168.123.136:8888/kline"; //websocket地址
		    this.marketSocket = new WebSocket(marketSocketUrl);
		    this.setWebSocket();
		},
		data() {
			return {
				reConnect: true,
				dayPrice:[0,0,0,0,0],
				language: '简体中文',
				lag: {
					'cn': '简体中文',
					'en': 'English'
				}

			}
		},
		methods: {
			setWebSocket() {
				var that = this;
				that.marketSocket.onopen = function(evt) {
					var sendData = '{"Flag":3,"Sub":"btc/minute1","Msg":"","Status":0}';

					that.marketSocket.send(sendData);
				};
				that.marketSocket.onerror = function() {};
				that.marketSocket.onclose = function() {
					// 关闭 websocket
					console.log("连接已关闭...");
					if(!that.reConnect) {
						return;
					}

					setTimeout(function() {
						var marketSocketUrl = "ws://192.168.123.136:8888/kline "; //websocket地址
						that.marketSocket = new WebSocket(marketSocketUrl);
						that.setWebSocket();
						console.log("连接重连...");
					}, 1000);
				};
				that.marketSocket.onmessage = function(evt) {
					var data = JSON.parse(evt.data);
					//回复心跳
					if(data.Flag == 1) {
						const heartbeat = JSON.parse(evt.data).Msg;

						that.marketSocket.send(
							'{"Flag":2,"Msg":"' + heartbeat + '","Status":0}'
						);
						return;
					}

					that.dayPrice = data.dayPrice ? data.dayPrice : that.dayPrice;
					that.$store.commit('getPrice',that.dayPrice);

				};
			},
			logout() {
				this.$store.dispatch("userlogout");
				
				
			},
			changeLn(command) {
				this.language = this.lag[command];
				localStorage.setItem("lang", command);
				this.$i18n.locale = command; //设置语言
			}
		},
		beforeDestroy() {
			this.marketSocket.send('{"Flag":5,"Msg":"","Status":0}');
			this.reConnect = false;
			this.marketSocket.close();
		}
	}
</script>

<style lang="less" scoped>
	.index {
		font-family: "微软雅黑";
	}
	
	header {
		height: 63px;
		line-height: 63px;
		color: #f2f2f2;
		font-size: 14px;
		background: #388dde;
		.logo {
			cursor: pointer;
			margin-top: 5px;
			float: left;
		}
		.title {
			vertical-align: middle;
		}
		.tab {
			float: right;
			font-weight: bold;
			margin-right: 40px;
			color: #f2f2f2;
			.login {
				margin-right: 18px;
				cursor: pointer;
				&:hover {
					background: #5795F1;
				}
			}
			.user-button {
				background: #318cdc;
				border: none;
				font-weight: bold;
				vertical-align: middle;
				&:hover {
					background: #5795F1;
				}
			}
			.lang-button {
				background: #0c233f;
				border: none;
				font-weight: bold;
			}
		}
	}
	
	.body-content {
		background: #bbc1c4;
		position: relative;
		overflow: hidden;
	}
	
	footer {
		height: 298px;
		background: #001e3e;
		padding-top: 120px;
		width: 100%;
		color: #fff;
		.wrap-link {
			width: 1280px;
			margin: 0 auto;
		}
		.link {
			height: 70px;
			width: 412px;
			padding-top: 50px;
			position: relative;
			margin-left: 50px;
			background: url('./img/footer-logo.png') left 18px no-repeat;
			border-right: 1px solid #fff;
			font-weight: bold;
			.en {
				text-align: right;
				margin-top: 5px;
				width: 140px;
			}
			.online-consult {
				position: absolute;
				left: 180px;
				top: 20px;
				width: 200px;
				text-align: center;
				font-weight: normal;
				a {
					display: inline-block;
					margin-top: 10px;
					padding: 0 10px;
					width: 60px;
					span {
						display: inline-block;
						text-align: center;
						font-size: 10px;
					}
				}
			}
			.list-notice {
				position: absolute;
				left: 456px;
				width: 750px;
				top: 0;
				ul {
					list-style: none;
					float: left;
					margin-right: 40px;
					li {
						font-size: 10px;
						margin-bottom: 12px;
					}
					li:first-child {
						font-size: 12px;
						margin-bottom: 20px;
					}
				}
				ul:last-child {
					margin-right: 0;
				}
			}
			.risk-notice {
				float: right;
				font-size: 8px;
				div {
					text-align: right;
					line-height: 14px;
					height: 14px;
				}
				.red-notice {
					margin: 20px 0 20px 0;
					font-size: 14px;
					color: #e44b4e;
				}
			}
		}
		.copyright {
			text-align: center;
			margin-top: 10px;
			font-size: 12px;
		}
	}
</style>