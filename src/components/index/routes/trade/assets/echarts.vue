<template>
	<div class="kLine">
		<div class="head">
			<div class="left-product">
				<el-dropdown @command="changeCoin">
					<span class="el-dropdown-link">
		              {{coin}}
		              <i class="el-icon-arrow-down el-icon--right"></i>
		            </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="index" v-for="(item,index) in coinArr" :key="index">{{item.name}}</el-dropdown-item>
	
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			
			<div class="right-price">
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
					<span class="open-price">
					<b class="price">{{dayPrice[0][1].toFixed(3)}}</b>
					<b>{{$t('l.open-price')}}</b>
				</span>
			</div>

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
				heartbeat: 1,
				reConnect: true,
				tabValue: 'minute1',
				tabIndex: 0,
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
					preDay: 0.1,
					maxPreDay: 0.2,
					interval: 30
				}, {
					label: '5m',
					value: 'minute5',
					preDay: 0.3,
					maxPreDay: 0.6,
					interval: 20
				}, {
					label: '15m',
					value: 'minute15',
					preDay: 0.5,
					maxPreDay: 2,
					interval: 5
				}, {
					label: '30m',
					value: 'minute30',
					preDay: 3,
					maxPreDay: 12,
					interval: 5
				}, {
					label: '1h',
					value: 'hour1',
					preDay: 6,
					maxPreDay: 24,
					interval: 1
				}, {
					label: '4h',
					value: 'hour4',
					preDay: 24,
					maxPreDay: 100,
					interval: 1
				}, {
					label: '1day',
					value: 'day1',
					preDay: 120,
					maxPreDay: 240,
					interval: 1
				}, {
					label: '5day',
					value: 'day5',
					preDay: 170,
					maxPreDay: 240,
					interval: 1
				}, {
					label: '1week',
					value: 'day7',
					preDay: 210,
					maxPreDay: 360,
					interval: 1
				}, {
					label: '1mon',
					value: 'month1',
					preDay: 360,
					maxPreDay: 360,
					interval: 1
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
			var marketSocketUrl = "ws://192.168.123.136:8888/kline"; //websocket地址
			var marketUserName = " "; //websocket名字
			var marketPassword = " "; //websocket密码
			var that = this;
			this.marketSocket = new WebSocket(marketSocketUrl);
			

			var that = this;
			this.myChart = echarts.init(document.getElementById('chart'));
			//记录缩放位置
			var start = '';
			this.myChart.on('datazoom', function(params) {

				start = params.batch[0].start;
				//小于10往前添加数据

				if(start == 0 && that.getNew) {

					if(that.preDay > that.tabMenu[that.tabIndex].maxPreDay) {

						return;
					}
					that.preDay = that.preDay * 1.2;
					that.start = 0;
					that.setTime();

					that.setWebSocket(that.marketSocket, that.preClock + '/' + that.clock, that.tabValue);
					return;
				}
			});
			//			this.myChart.on('tooltip', function(params) {
			//
			//				console.log(params);
			//			});
			this.setTime();
			this.setWebSocket(this.marketSocket, this.preClock + '/' + this.clock, this.tabValue);
			window.onresize = function() {
				that.myChart.resize();
			}

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
				var year = now.getFullYear(),
					preYear = preDate.getFullYear(); //年  
				var month = add0(now.getMonth() + 1),
					preMonth = add0(now.getMonth() + 1); //月  
				var day = add0(now.getDate()),
					preDay = add0(preDate.getDate()); //日  
				var hh = add0(now.getHours()),
					prehh = add0(preDate.getHours()); //时  
				var mm = add0(now.getMinutes()),
					premm = add0(preDate.getMinutes()); //分  
				var caseDate = {
					minute1: ['' + year + month + day + hh + mm, '' + preYear + preMonth + preDay + prehh + premm],
					minute5: ['' + year + month + day + hh + mm, '' + preYear + preMonth + preDay + prehh + premm],
					minute15: ['' + year + month + day + hh + mm, '' + preYear + preMonth + preDay + prehh + premm],
					minute30: ['' + year + month + day + hh + mm, '' + preYear + preMonth + preDay + prehh + premm],
					hour1: ['' + year + month + day + hh, '' + preYear + preMonth + preDay + prehh],
					hour4: ['' + year + month + day + hh, '' + preYear + add0(now.getMonth()) + preDay + prehh],
					day1: ['' + year + month + day, '' + preYear + add0(now.getMonth()) + preDay],
					day5: ['' + year + month + day, '' + preYear + add0(now.getMonth()) + preDay],
					day7: ['' + year + month + day, '' + preYear + add0(now.getMonth()) + preDay],
					month1: ['' + year + month, '' + preYear + add0(now.getMonth())]
				}
				this.clock = caseDate[this.tabValue][0];
				this.preClock = caseDate[this.tabValue][1];

			},
			
			setData(index) {
				
				this.cover = true;
				//分时图分开
				if(index == -1) {
					this.setLine = true;
					this.tabIndex = 0;
					this.tabValue = this.tabMenu[0].value;
					this.preDay = this.tabMenu[0].preDay;
					this.initPreDay = this.preDay;
				} else {
					this.setLine = false;
					this.tabIndex = index;
					this.tabValue = this.tabMenu[index].value;
					this.preDay = this.tabMenu[index].preDay;
					this.initPreDay = this.preDay;
				}

				this.setTime();
				
				this.setWebSocket(this.marketSocket, this.preClock + '/' + this.clock, this.tabValue);

			},
			setWebSocket(marketSocket, time, a) {
				var that = this;

				that.getNew = false;
				that.arrGather[a] = [];

				marketSocket.onopen = function(evt) {
					var sendData = '{"Flag":3,"Sub":"btc/' + a + '","Msg":"' + time + '","Status":0}';
					
					marketSocket.send(sendData);

				};
				marketSocket.onerror = function() {

				};
				marketSocket.onclose = function() {
					// 关闭 websocket
					console.log('连接已关闭...')
					if(!that.reConnect) {
						return;
					}
				
					setTimeout(function() {
						var marketSocketUrl = "ws://192.168.123.136:8888/kline "; //websocket地址			
						that.marketSocket = new WebSocket(marketSocketUrl);
						that.setTime();
						that.setWebSocket(that.marketSocket, that.preClock + '/' + that.clock, that.tabValue);
						console.log('连接重连...')
					}, 1000);

				}
				var setSend = true;
				that.cover = false;
				marketSocket.onmessage = function(evt) {
					 
					//console.log(evt.data.kLine);
					// kLine
					that.prebeat = that.heartbeat;
					if(setSend == true) {

						var sendData = '{"Flag":3,"Sub":"btc/' + a + '","Msg":"' + time + '","Status":0}';
						//console.log(sendData)
						marketSocket.send(sendData);
						setSend = false;

					}
					var data = JSON.parse(evt.data);
                    
					if(data.kLine && data.price == -1 && that.arrGather[a].length == 0) {
                       // console.log(data);
						that.arrGather[a] = data.kLine;
						that.allArr = that.arrGather[a];
						that.dayPrice = data.dayPrice ? data.dayPrice : that.dayPrice;
						
						that.range = (((that.dayPrice[0][2] - that.dayPrice[0][1]) / that.dayPrice[0][1]) * 100).toFixed(2);
						var data0 = that.splitData(that.arrGather[a]);
						//设置分时图显示
						if(that.setLine == true) {

							that.option = that.getLineOption(that.arrGather[a]);
							that.myChart.clear();
							that.myChart.setOption(that.option);
						} else {

							that.option = that.getOption(data0);
							that.myChart.clear();
							that.newTime = data0.categoryData[data0.categoryData.length - 1];
							//console.log(data0)
							that.myChart.setOption(that.option);
						}

						that.getNew = true;
					}

					if(data.Flag == 1) {

						that.heartbeat = JSON.parse(evt.data).Msg;

						marketSocket.send('{"Flag":2,"Msg":"' + that.heartbeat + '","Status":0}');

					}

					if(data.kLine && data.price != -1 && that.getNew) {

						var arrn = data.kLine[0];
						//设置分时图显示
						that.dayPrice = data.dayPrice ? data.dayPrice : that.dayPrice;
						that.$emit('setInitialPrice',that.dayPrice[0][2]);
						that.range = (((that.dayPrice[0][2] - that.dayPrice[0][1]) / that.dayPrice[0][1]) * 100).toFixed(2);
                        //document.title = (that.dayPrice[0][2]).toFixed(3)+' BTC 交易系统'                       	
						//console.log( data.kLine[0]);
						if(data.kLine[0][0] == that.newTime) {
							if(that.setLine == true) {
        
								that.option = that.myChart.getOption();
								that.option.series[0].data[that.option.series[0].data.length - 1] = data.kLine[0][2];
								that.option.series[0].markLine.data[0].yAxis = data.kLine[0][2];

								that.option.series[0].markLine.data[1].yAxis = data.kLine[0][2];
								that.myChart.setOption(that.option);
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
							//console.log(data.kLine[0][0])
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
						show: 'true',
						trigger: 'cross',
						hideDelay: 1000,
						formatter: function(param) {

							param.data = param[0].data || ['', '', '', '', '', ''];
							return [
								'Open: ' + param.data[1] + '<br/>',
								'Close: ' + param.data[2] + '<br/>',
								'Lowest: ' + param.data[3] + '<br/>',
								'Highest: ' + param.data[4] + '<br/>'
							].join('');
						}
					},
					animation: false,
					toopTip: {
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

									var a = params.value.substring(10, 12) ? params.value.substring(10, 12) : '00'
									return +params.value.substring(0, 4) + '-' +
										params.value.substring(4, 6) + '-' +
										params.value.substring(6, 8) +
										' ' + params.value.substring(8, 10) + ':' + a

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
						bottom: '15%'
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

						min: 'dataMin',
						max: 'dataMAx',
						axisLabel: {
							interval: 'auto',
							formatter: function(item, index) {

								if(item.length > 10) {
									return item.substring(4, 6) + '-' + item.substring(6, 8) + ' ' + item.substring(8, 10) + ':' + item.substring(10, 12)
								} else if(item.length <= 10 && item.length > 8) {
									return item.substring(4, 6) + '-' + item.substring(6, 8) + ' ' + item.substring(8, 10) + ':00'
								} else if(item.length <= 8 && item.length > 6) {
									return item.substring(4, 6) + '-' + item.substring(6, 8)
								} else {
									return item.substring(4, 6)
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
								symbol: 'none',
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
									show: false,
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
							lineStyle: {
								smooth: 0,
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

							lineStyle: {
								smooth: 0,
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
							lineStyle: {
								smooth: 0,
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
							lineStyle: {
								smooth: 0,
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
						show: 'true',
						trigger: 'axis',
						hideDelay: 1000,
						formatter: function(param) {

							param.data = data0[param[0].dataIndex];
							return [
								'Open: ' + param.data[1] + '<br/>',
								'Close: ' + param.data[2] + '<br/>',
								'Lowest: ' + param.data[3] + '<br/>',
								'Highest: ' + param.data[4] + '<br/>'
							].join('');
						},
						axisPointer: {
							type: 'cross',
							show: 'true',
							lineStyle: {
								type: 'dashed'
							},
							link: {
								xAxisIndex: 'all'
							},
							label: {
								show: 'true',
								backgroundColor: '#777',
								formatter: function(params) {

									if(params.value.toString().substring(0, 1) == '2') {
										var a = params.value.substring(10, 12) ? params.value.substring(10, 12) : '00'

										return +params.value.substring(0, 4) + '-' +
											params.value.substring(4, 6) + '-' +
											params.value.substring(6, 8) +
											' ' + params.value.substring(8, 10) + ':' + a

									} else {
										return params.value.toFixed(3)
									}
								}
							}
						}
					},

					grid: {
						left: '10%',
						right: '10%',
						bottom: '15%'
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
							interval: 'auto',
							formatter: function(item, index) {

								if(item.length > 10) {
									return item.substring(4, 6) + '-' + item.substring(6, 8) + ' ' + item.substring(8, 10) + ':' + item.substring(10, 12)
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
							symbol: 'none',
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
									xAxis: 0,
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
			this.marketSocket.send('{"Flag":5,"Msg":"","Status":0}');
			this.reConnect = false;
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
		padding-left: 70px;
		padding-top: 20px;
		display: flex;
		background: url(./img/BTC.png) no-repeat 10px top;
		.left-product{
			width:50px;
			float:left;
		}
		.el-dropdown-link {	
			cursor: pointer;
           	font-size: 18px;
           	color:#1a1a1a;
           	display: flex;
		}
		.right-price{
			flex:1;
		}
		.high-price,
		.low-price,
		.open-price,
		.now-price {
			float:left;
			display: inline-block;
			width: 150px;
			text-align: right;
			margin-right: 8%;
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
				font-weight: normal;
				font-size: 12px;
				display: inline-block;
				line-height: 12px;
			}
			b.price {
				line-height: 20px;
				font-size: 20px;
			}
		}
		.open-price{
			margin-right: 0;
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
		position:absolute;
		left:0;
		top:60px;
		right:0;
		bottom: 0;
	}
</style>