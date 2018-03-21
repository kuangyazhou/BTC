<template>
	<div class="kLine">
		<div class="head">
			<el-dropdown @command="changeCoin">
				<span class="el-dropdown-link">
	              {{coin}}
	              <i class="el-icon-arrow-down el-icon--right"></i>
	            </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :command="index" v-for="(item,index) in coinArr" :key="index">{{item.name}}</el-dropdown-item>

				</el-dropdown-menu>
			</el-dropdown>

			<span class="now-price">
				<i><b class="price up"  v-if="range>=0">{{dayPrice[0][2].toFixed(3)}}</b>
					<b class="price down" v-if="range<0">{{dayPrice[0][2].toFixed(3)}}</b>
					<b class="up" v-if="range>=0">+{{range}}%</b><b  class="down" v-if="range<0">{{range}}%</b>
				</i>
				<b>{{$t('l.now-price')}}</b>
			</span>
			<span class="high-price">
				<b class="price">{{dayPrice[0][4].toFixed(3)}}</b>
				<b>{{$t('l.high-price')}}</b>
			</span>
			<span class="low-price">
				<b class="price">{{dayPrice[0][3].toFixed(3)}}</b>
				<b>{{$t('l.low-price')}}</b>
			</span>
		</div>
		<div class="tabMenu ">
			<span @click="setData(-1)" :class="{ 'select':setLine==true}">
				{{$t('l.fs')}}
			</span>
			<span v-for="(item,index) in tabMenu" @click.stop="setData(index)" :key="index" :class="{ 'select':item.value==tabValue&&setLine!=true}">
				{{item.label}}
			</span>
		</div>
		<div class="charts " id="chart"></div>
		<div class="cover " v-if="cover ">

		</div>
	</div>

</template>

<script>
	import echarts from 'echarts'

	export default {
		data() {
			return {
				marketSocket: '',
				myChart: '',
				cover: false,
				getNew: false,
				allArr: [],
				newTime: '', //新推入的数据时间
				option: '',
				option1: '',
				start: 60,
				end: 100,
				range: '',
				coin: 'BTC',
				tabValue: 'minute1',
				dayPrice: [
					[0, 0, 0, 0, 0]
				],
				setLine: false, //设置是否显示分时图
				preDay: 0.1, //横轴时间提前天数,
				initPreDay: 0.1,
				coinArr: [{
					name: 'BTC',
					value: 0
				}, {
					name: 'BCH',
					value: 1
				}, {
					name: 'ETH',
					value: 2
				}],
				tabMenu: [{
					label: '1m',
					value: 'minute1',
					preDay: 0.1
				}, {
					label: '5m',
					value: 'minute5',
					preDay: 0.3
				}, {
					label: '15m',
					value: 'minute15',
					preDay: 0.5
				}, {
					label: '30m',
					value: 'minute30',
					preDay: 3
				}, {
					label: '1h',
					value: 'hour1',
					preDay: 6
				}, {
					label: '4h',
					value: 'hour4',
					preDay: 24
				}, {
					label: '1day',
					value: 'day1',
					preDay: 80
				}, {
					label: '5day',
					value: 'day5',
					preDay: 150
				}, {
					label: '1week',
					value: 'day7',
					preDay: 210
				}, {
					label: '1mon',
					value: 'month1',
					preDay: 360
				}],
				//{"minute1 ","minute5 ","minute15 ","minute30 ","hour1 ","hour4 ","day1 ","day5 ","day7 ","month1 "}
				arrGather: {
					minute1: [],
					minute5: [],
					minute15: [],
					minute30: [],
					hour1: [],
					hour4: [],
					day1: [],
					day5: [],
					day7: [],
					month1: []
				}
			}
		},
		mounted() {
			var marketSocketUrl = "ws://192.168.123.136:8888/kline "; //websocket地址
			//  var marketUserName=" ";//websocket名字
			//  var marketPassword=" ";//websocket密码

			this.marketSocket = new WebSocket(marketSocketUrl);
			var that = this;
			this.myChart = echarts.init(document.getElementById('chart'));
			//记录缩放位置
			var start = '';
			this.myChart.on('datazoom', function(params) {

				start = params.batch[0].start;
				//小于10往前添加数据

				if(start <= 10) {

					that.preDay *= 2;

					that.setTime();

					that.setWebSocket(that.marketSocket, that.preClock + '/' + that.clock, that.tabValue);
				}
			});
			this.setTime();

			this.setWebSocket(this.marketSocket, this.preClock + '/' + this.clock, this.tabValue);
		},
		methods: {

			changeCoin(index) {

				this.coin = this.coinArr[index].name;
			},
			//获取接受时间
			setTime() {

				function add0(a) {
					if(a < 10) {
						return "0" + a;
					} else {
						return a
					}
				}
				var now = new Date();
				var preDate = new Date(now.getTime() - this.preDay * 24 * 60 * 60 * 1000);
				//				var year = now.getFullYear(); //年  
				//				var month = now.getMonth() + 1; //月  
				//				var day = now.getDate(); //日  
				//				var hh = now.getHours(); //时  
				//				var mm = now.getMinutes(); //分  
				this.clock = '' + now.getFullYear() + add0(now.getMonth() + 1) + add0(now.getDate()) + add0(now.getHours()) + add0(now.getMinutes());
				this.preClock = '' + preDate.getFullYear() + add0(preDate.getMonth() + 1) + add0(preDate.getDate()) +
					add0(preDate.getHours()) + add0(preDate.getMinutes())

			},
			setData(index) {

				this.cover = true;
				//分时图分开
				if(index == -1) {
					this.setLine = true;
					this.tabValue = this.tabMenu[0].value;
					this.preDay = this.tabMenu[0].preDay;
					this.initPreDay = this.preDay;
				} else {
					this.setLine = false;
					this.tabValue = this.tabMenu[index].value;
					this.preDay = this.tabMenu[index].preDay;
					this.initPreDay = this.preDay;
				}

				this.setTime();
				this.setWebSocket(this.marketSocket, this.preClock + '/' + this.clock, this.tabValue);

			},
			setWebSocket(marketSocket, time, a) {
				var that = this;
				var heartbeat = '';
				that.getNew = false;
				that.arrGather[a] = [];

				marketSocket.onopen = function(evt) {
					var sendData = '{"Flag":3,"Sub":"btc/' + a + '","Msg":"' + time + '","Status":0}';
					//console.log(sendData);
					marketSocket.send(sendData);

				};
				marketSocket.onclose = function() {
					// 关闭 websocket
					console.log('连接已关闭...')
				}
				var setSend = true;
				that.cover = false;
				marketSocket.onmessage = function(evt) {
					//console.log(evt);
					//console.log(evt.data.kLine);
					// kLine

					if(setSend == true) {

						var sendData = '{"Flag":3,"Sub":"btc/' + a + '","Msg":"' + time + '","Status":0}';

						marketSocket.send(sendData);
						setSend = false;

					}
					var data = JSON.parse(evt.data);

					if(data.kLine && data.kLine.length > 1 && that.arrGather[a].length == 0) {

						that.arrGather[a] = data.kLine;
						that.allArr = that.arrGather[a];
						that.dayPrice = data.dayPrice || [
							[0, 0, 0, 0, 0]
						];
						that.range = (((that.dayPrice[0][2] - that.dayPrice[0][1]) / that.dayPrice[0][1]) * 100).toFixed(2);
						var data0 = that.splitData(that.arrGather[a]);
						//设置分时图显示
						if(that.setLine == true) {

							that.option = that.getLineOption(that.arrGather[a]);

							that.myChart.setOption(that.option, true);
						} else {

							that.option = that.getOption(data0);
							that.newTime = data0.categoryData[data0.categoryData.length - 1];
							//console.log(data0)
							that.myChart.setOption(that.option);

						}

						that.getNew = true;

						//  			myChart.resize();
					}

					if(data.Flag == 1) {

						heartbeat = JSON.parse(evt.data).Msg;

						marketSocket.send('{"Flag":2,"Msg":"' + heartbeat + '","Status":0}');

					}

					if(data.kLine && data.kLine.length == 1 && that.getNew) {

						var arrn = data.kLine[0];
						//设置分时图显示
						that.dayPrice = data.dayPrice || [
							[0, 0, 0, 0, 0]
						];
						that.range = (((that.dayPrice[0][2] - that.dayPrice[0][1]) / that.dayPrice[0][1]) * 100).toFixed(2);

						//console.log( data.kLine[0]);
						if(data.kLine[0][0] == that.newTime) {
							if(that.setLine == true) {

								that.option = that.myChart.getOption();
								that.option.series[0].data[that.option.series[0].data.length - 1] = data.kLine[0][2];
								that.option.series[0].markLine.data[0].yAxis = data.kLine[0][2];
								that.option.series[0].markLine.data[1].yAxis = data.kLine[0][2];
								that.myChart.setOption(that.option, true);
								return;
							} else {
								that.allArr[that.allArr.length - 1] = data.kLine[0];
								var data0 = that.splitData(that.allArr);
								that.option = that.myChart.getOption();

								that.option.series[0].markLine.data[0].yAxis = data.kLine[0][2];
								that.option.series[0].markLine.data[1].yAxis = data.kLine[0][2];
								that.option.series[0].data[that.option.series[0].data.length - 1] = arrn.slice(1);
								that.option.series[1].data[that.option.series[1].data.length - 1] = that.calculateLast(data0, 5);
								that.option.series[2].data[that.option.series[2].data.length - 1] = that.calculateLast(data0, 10);
								that.option.series[3].data[that.option.series[3].data.length - 1] = that.calculateLast(data0, 20);
								that.option.series[4].data[that.option.series[4].data.length - 1] = that.calculateLast(data0, 30);

								that.myChart.setOption(that.option);
							}

							return;
						} else {
							that.newTime = data.kLine[0][0];

							if(that.setLine == true) {

								that.option = that.myChart.getOption();
								that.option.series[0].markLine.data[0].yAxis = data.kLine[0][2];
								that.option.series[0].markLine.data[1].yAxis = data.kLine[0][2];
								that.option.xAxis[0].data.push(data.kLine[0][0]);
								that.option.series[0].data.push(data.kLine[0][2]);
								that.myChart.setOption(that.option, true);
								return;
							}

							for(var i = 0; i < arrn.length; i++) {
								arrn[i] = parseFloat(arrn[i])
							}
							that.allArr.push(data.kLine[0]);
							that.option = that.myChart.getOption();
							//  		    console.log(data.kLine[0][0])
							that.option.xAxis[0].data.push(data.kLine[0][0]);

							var data0 = that.splitData(that.allArr);
							data0.values.push(arrn.slice(1));
							that.option.series[0].data.push(arrn.slice(1));
							that.option.series[1].data.push(that.calculateLast(data0, 5));
							that.option.series[2].data.push(that.calculateLast(data0, 10));
							that.option.series[3].data.push(that.calculateLast(data0, 20));
							that.option.series[4].data.push(that.calculateLast(data0, 30));
							that.myChart.setOption(that.option);

						}
					}

				}
			},
			splitData(rawData) {
				var categoryData = [];
				var values = [];

				for(var i = 0; i < rawData.length; i++) {
					var a = rawData[i];

					categoryData.push(a[0]);

					for(var j = 0; j < rawData[i].length; j++) {
						rawData[i][j] = parseFloat(rawData[i][j])
					}

					values.push(a.slice(1))
				}

				return {
					categoryData: categoryData,
					values: values
				};
			},
			//计算最后一个新加的数
			calculateLast(data0, dayCount) {

				var result = '',
					sum = 0;

				if(data0.values.length < dayCount) {
					result = null
				} else {
					for(var i = 0; i < dayCount; i++) {

						sum += data0.values[data0.values.length - i - 1][1];
					}

					result = parseInt(sum / dayCount);
				}
				return result;

			},

			calculateMA(data0, dayCount) {
				var result = [];
				for(var i = 0, len = data0.values.length; i < len; i++) {
					if(i < dayCount) {
						result.push('-');
						continue;
					}
					var sum = 0;
					for(var j = 0; j < dayCount; j++) {
						sum += data0.values[i - j][1];
					}
					result.push(sum / dayCount);
				}
				return result;
			},
			getOption(data0) {
				//console.log(data0)
				var upColor = '#ef5555';
				var upBorderColor = '#ef5555';
				var downColor = '#03c087';
				var downBorderColor = '#03c087';
				var that = this;
				var option = {
					title: {

						left: 0
					},
					tooltip: {
						show: false

					},

					axisPointer: {
						type: 'line',
						show: true,
						lineStyle: {
							type: 'dashed'
						},
						link: {
							xAxisIndex: 'all'
						},
						label: {
							backgroundColor: '#777',
							formatter: function(params) {
								if(params.value.length > 3) {

									return +params.value.substring(0, 4) + '-' +
										params.value.substring(4, 6) + '-' +
										params.value.substring(6, 8) +
										' ' + params.value.substring(8, 10) + ':' +
										params.value.substring(10, 12)
								} else {
									return params.value.toFixed(3)
								}
							}
						}
					},

					legend: {
						data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
						show: false
					},
					grid: {
						left: '10%',
						right: '10%',
						bottom: '20%'
					},
					xAxis: {
						type: 'category',
						data: data0.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: {
							onZero: false
						},
						splitLine: {
							lineStyle: {
								color: '#f7f8fa'
							}
						},
						splitNumber: 20,
						min: 'dataMin',
						max: 'dataMAx',
						axisLabel: {
							interval: function(index, item) {

								if(that.initPreDay < 0.5 && (item.substring(10, 12) == '00' || item.substring(10, 12) == '30' || item.substring(10, 12) == '15' || item.substring(10, 12) == '00' || item.substring(10, 12) == '45')) {
									return true
								} else if(that.initPreDay >= 0.5 && that.initPreDay < 1) {

									if(item.substring(10, 12) == '00' || item.substring(10, 12) == '30') {
										return true
									}
									//201803162020
								} else if(that.initPreDay >= 1 && that.initPreDay < 5) {

									if(index % 5 == 0) {

										return true
									}
								}

							},
							formatter: function(item, index) {

								if(that.initPreDay < 0.5 && (item.substring(10, 12) == '00' || item.substring(10, 12) == '30' || item.substring(10, 12) == '15' || item.substring(10, 12) == '00' || item.substring(10, 12) == '45')) {
									return item.substring(8, 10) + ':' + item.substring(10, 12)
								} else if(that.initPreDay >= 0.5 && that.initPreDay < 1) {
									if(item.substring(10, 12) == '00' || item.substring(10, 12) == '30') {

										return item.substring(8, 10) + ':' + item.substring(10, 12)
									}

								} else {
									return item.substring(4, 6) + '-' + item.substring(6, 8) + ' ' + item.substring(8, 10) + ':' + item.substring(10, 12)
								}

							}
						}
					},
					yAxis: {
						scale: true,

						splitLine: {
							lineStyle: {
								color: '#f7f8fa'
							}
						},
					},
					dataZoom: [{
						type: 'inside',
						xAxisIndex: [0],
						start: that.start,
						end: that.end

					}],
					series: [{
							name: '日K',
							type: 'candlestick',
							data: data0.values,
							smooth: true,
							barMaxWidth: '10',
							barMinWidth: '2',

							markLine: {
								symbol: 'line',
								label: {
									position: 'start',
									backgroundColor: '#9194a4',
									textStyle: {
										fontFamily: "微软雅黑",
										fontSize: 12,
										color: '#fff',
										padding: [2, 4, 2, 4]

									}
								},
								lineStyle: {
									type: 'dashed',
									color: '#9194a4',
									width: 1
								},
								emphasis: {
									label: {
										show: false
									}
								},
								data: [{
										name: '最新值',
										xAxis: '0',
										yAxis: 0
									},
									{
										name: '最新值',
										xAxis: data0.categoryData[data0.categoryData.length - 1],
										yAxis: 0

									}
								]
							},

							itemStyle: {
								normal: {
									color: upColor,
									color0: downColor,
									borderColor: upBorderColor,
									borderColor0: downBorderColor
								}
							}

						},
						{
							name: 'MA5',
							type: 'line',
							data: this.calculateMA(data0, 5),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0.5
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							}
						},
						{
							name: 'MA10',
							type: 'line',
							data: this.calculateMA(data0, 10),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0.5
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							}
						},
						{
							name: 'MA20',
							type: 'line',
							data: this.calculateMA(data0, 20),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0.5
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							}
						},
						{
							name: 'MA30',
							type: 'line',
							data: this.calculateMA(data0, 30),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0.5
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							}
						}

					]
				};
				return option;
			},
			getLineOption(data0) {
				var datax = [],
					dataSeries = [];
				var that = this;
				for(var i = 0; i < data0.length; i++) {
					datax.push(data0[i][0])
					dataSeries.push(data0[i][2])
				}
				var option1 = {
					title: {

					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '10%',
						right: '10%',
						bottom: '20%'
					},
					dataZoom: [{
						xAxisIndex: [0],
						type: 'inside',
						start: that.start,
						end: that.end

					}],
					xAxis: {
						type: 'category',
						data: datax,
						splitNumber: 20,
						splitLine: {
							lineStyle: {
								color: '#f7f8fa'
							}
						},
						axisLabel: {
							interval: function(index, item) {
								if(item) {

									if(that.initPreDay < 1 && (item.substring(10, 12) == '00' || item.substring(10, 12) == '30' || item.substring(10, 12) == '15' || item.substring(10, 12) == '00' || item.substring(10, 12) == '15' || item.substring(10, 12) == '45')) {
										return true
									} else {
										return false

									}
								}

							},
							formatter: function(item, index) {

								if(that.initPreDay < 1 && (item.substring(10, 12) == '00' || item.substring(10, 12) == '30' || item.substring(10, 12) == '15' || item.substring(10, 12) == '00' || item.substring(10, 12) == '45')) {
									return item.substring(8, 10) + ':' + item.substring(10, 12)
								} else {
									return ''
								}

							}
						},
						splitLine: {
							lineStyle: {
								color: '#f7f8fa'
							}
						},
					},
					yAxis: {
						type: 'value',
						scale: true,
						boundaryGap: false,
						axisLine: {
							onZero: false,
						},
						min: function(value) {

							return value.min;
						},
						max: function(value) {

							return value.max;
						},
						splitLine: {
							lineStyle: {
								color: '#f7f8fa'
							}
						},
					},
					series: [{
						name: '实时价格',
						type: 'line',
						showSymbol: false,
						hoverAnimation: false,
						data: dataSeries,
						markLine: {
							symbol: 'line',
							label: {
								position: 'start',
								backgroundColor: '#9194a4',
								textStyle: {
									fontFamily: "微软雅黑",
									fontSize: 12,
									color: '#fff',
									padding: [2, 4, 2, 4]

								}
							},
							lineStyle: {
								type: 'dashed',
								color: '#9194a4',
								width: 1
							},
							emphasis: {
								label: {
									show: false
								}
							},
							data: [{
									name: '最新值',
									xAxis: '0',
									yAxis: 0
								},
								{
									name: '最新值',
									xAxis: datax[datax - 1],
									yAxis: 0
								}
							]
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgb(247, 248, 249,0.2)'
								}, {
									offset: 1,
									color: 'rgb(239, 239, 242,0.8)'
								}])
							}
						},
						itemStyle: {
							color: '#b6b7c2',
							barMaxWidth: '10'
						}
					}]
				}
				return option1;
			}
		},

		beforeDestroy() {
			this.marketSocket.close()
		}
	}
</script>

<style lang="less" scoped>
	.kLine {
		height: 100%;
		color: #333;
		position: relative;
	}
	
	.head {
		height: 50px;
		padding-left: 50px;
		padding-top: 10px;
		display: flex;
		.el-dropdown-link {
			vertical-align: middle;
			cursor: pointer;
			font-size: 20px;
		}
		.high-price,
		.low-price,
		.now-price {
			display: inline-block;
			width: 150px;
			text-align: right;
			margin-right: 10%;
			display: flex;
			flex-direction: column;
			i {
				font-style: normal;
			}
			.up {
				color: #ef5555;
			}
			.down {
				color: #03c087;
			}
			b {
				font-size: 12px;
				display: inline-block;
				color: #333;
				line-height: 12px;
			}
			b.price {
				line-height: 20px;
				font-size: 20px;
			}
		}
	}
	
	.tabMenu {
		height: 25px;
		line-height: 25px;
		position: absolute;
		left: 0;
		top: 60px;
		z-index: 200;
		padding-left: 50px;
		span {
			display: inline-block;
			width: 50px;
			height: 100%;
			margin: 0 4px;
			text-align: center;
			background: #f7f7f7;
			cursor: pointer;
			&.select,
			&:hover {
				background: #e7f0f9;
				color: #333;
			}
		}
	}
	
	.cover {
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.1);
		z-index: 300;
	}
	
	#chart {
		height: 100%;
	}
</style>