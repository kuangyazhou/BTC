<template>
	<div class="welcome">
		<header>
			<div class="block">
				<el-carousel trigger="click" height="700px">
					<el-carousel-item v-for="item in 4" :key="item">
						<img class="bg" src="../img/homeBg.jpg" />
					</el-carousel-item>
				</el-carousel>
			</div>
		</header>
		<div class="content">
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
						<i>
							<b class="price up" v-if="range>=0">{{dayPrice[0][2].toFixed(3)}}</b>
							<b class="price down" v-if="range<0">{{dayPrice[0][2].toFixed(3)}}</b>
							<b class="up" v-if="range>=0">+{{range}}%</b>
							<b class="down" v-if="range<0">{{range}}%</b>
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
			<div class="bd">
				<h3 class="t1">BitFINEX{{$t('w.gj')}}</h3>
				<h4 class="t2">{{$t('w.t1')}}</h4>
				<h4 class="t2">{{$t('w.t2')}}</h4>
				<div class="publicity">
					<div class="public-item">
						<div class="top one">

						</div>
						<div class="center">
							{{$t('w.yhjmjb')}}
						</div>
						<div class="bottom">
							{{$t('w.b1')}}
						</div>
					</div>
					<div class="public-item">
						<div class="top two">

						</div>
						<div class="center">
							{{$t('w.zytd')}}
						</div>
						<div class="bottom">
							{{$t('w.b2')}}
						</div>
					</div>
					<div class="public-item">
						<div class="top three">

						</div>
						<div class="center">
							{{$t('w.gldx')}}
						</div>
						<div class="bottom">
							{{$t('w.b3')}}
						</div>
					</div>
					<div class="public-item">
						<div class="top four">

						</div>
						<div class="center">
							{{$t('w.wxfw')}}
						</div>
						<div class="bottom">
							{{$t('w.b4')}}
						</div>
					</div>
				</div>

				<div class="bd-bottom">
					<h3 class="t1">{{$t('w.bt1')}}</h3>
					<h4 class="t2">{{$t('w.bt2')}}</h4>
					<h4 class="t2">{{$t('w.bt3')}}</h4>
				</div>
				<el-button type="primary" class="trade-button" @click="$router.push({'name':'Trade'})">{{$t('w.ljjy')}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { Carousel, CarouselItem, Row, Col } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
export default {
  mounted() {
   
  },
  computed:{
  	dayPrice:function(){
  		return this.$store.state.user.dayPrice
  	},
  	range:function(){
  		return this.$store.state.user.range
  	}
  },
  data() {
    return {

      coin: "BTC",
      reConnect: true,
      coinArr: [
        {
          name: "BTC",
          value: 0
        },
        {
          name: "BCH",
          value: 1
        },
        {
          name: "ETH",
          value: 2
        }
      ]
     
    };
  },
  methods: {
   
    changeCoin(index) {
      this.coin = this.coinArr[index].name;
    }
  },
  beforeDestroy() {
   
  }
};
</script>

<style scoped lang="less">
div,
h3,
h4 {
  margin: 0;
  padding: 0;
}

.welcome {
  background: #fff;
  header {
    height: 700px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .bg {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    padding-top: 10px;
    .head {
      height: 50px;
      padding: 20px 20px 5px 80px;
      width: 900px;
      margin: 0 auto;
      border: 1px solid #d0d0d0;
      background: url(./trade/assets/img/BTC.png) no-repeat 10px top;
      display: flex;
      .left-product {
        width: 50px;
        float: left;
      }
      .el-dropdown-link {
        cursor: pointer;
        font-size: 18px;
        color: #1a1a1a;
        display: flex;
      }
      .right-price {
        flex: 1;
      }
      .high-price,
      .low-price,
      .open-price,
      .now-price {
        float: left;
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
      .open-price {
        margin-right: 0;
      }
    }
    .bd {
      width: 1000px;
      margin: 0 auto;
      margin-top: 50px;
      text-align: center;
      .t1 {
        color: #091f37;
        font-weight: bold;
        font-size: 26px;
        margin-bottom: 25px;
      }
      .t2 {
        color: #5995f5;
        font-size: 20px;
        line-height: 30px;
      }
      .publicity {
        margin-top: 50px;
        display: flex;
        .public-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          .top,
          .center,
          .bottom {
            font-size: 12px;
          }
          .top {
            height: 110px;
            width: 120px;
            margin: 0 auto;
            background: url(../img/one.png) center center no-repeat/contain;
          }
          .two {
            background: url(../img/two.png) center center no-repeat/contain;
          }
          .three {
            background: url(../img/three.png) center center no-repeat/contain;
          }
          .four {
            background: url(../img/four.png) center center no-repeat/contain;
          }
          .bottom {
            padding: 0 20px;
            font-size: 14px;
            color: #5494d4;
          }
          .center {
            font-size: 20px;
            margin: 18px 0;
            color: #0d1c3d;
            text-align: center;
            font-weight: bold;
          }
        }
      }
    }
    .bd-bottom {
      margin-top: 80px;
    }
    .trade-button {
      margin: 40px 0;
      background: #0e2340;
      width: 360px;
      height: 80px;
      font-size: 30px;
      border: none;
    }
  }
}
</style>