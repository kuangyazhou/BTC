<template>
	<div class="pay2">
		<h4>您目前选择的是
			<span>{{bank_name}}</span>充值服务</h4>
		<h4>填写转账资料：</h4>
		<div class="form">
			<el-form ref="form" :model="form" label-width="120px" size="small">
				<el-form-item label="存入金额">
					<el-input v-model="form.number"></el-input>
				</el-form-item>
				<el-form-item label="存款人姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<h4>选择转账类型：</h4>
		<div class="pay_type">
			<span v-for="(item,index) in payWay" :key="item.index" :class="{'select':item.value==payWayId}" @click='changePayWay(index)'>
				<i class="icon"></i>
				<label>{{item.name}}</label>
				<i class="mark" v-if="item.value==payWayId"></i>
			</span>

		</div>
		<el-button @click="back">上一步</el-button>
		<el-button @click="submit">确认</el-button>
	</div>
</template>

<script>
import Vue from "vue";
import { Button, Input, Form, FormItem, Alert, Message } from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
import DATA from "./DATA.js";
export default {
  data() {
    return {
      form: {
        number: "",
        name: ""
      },
      //充值方式 (0:线上转账 1：网银转账，2：ATM入账，3：银行柜台，4：手机转账，5：支付宝)
      id: "",
      payWayId: 1,
      bank_name: "",
      payWay: [
        {
          value: 1,
          name: "网银转账"
        },
        {
          value: 2,
          name: "ATM入账"
        },
        {
          value: 3,
          name: "银行柜台"
        },
        {
          value: 4,
          name: "手机转账"
        },
        {
          value: 5,
          name: "支付宝"
        }
      ]
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.bank_name = this.$route.query.bank_name;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changePayWay(index) {
      this.payWayId = this.payWay[index].value;
    },
    submit() {
      const data = {
        bank_account_id: this.id,
        amount: this.form.number,
        action_pay_user_name: this.form.name,
        pay_way: this.payWayId
      };
      this.sendChargeInfo(data);
    },
    async sendChargeInfo(data) {
      const res = await DATA.sendChargeInfo(data);
      if (res.status == 1) {
        this.$router.push({
          path: "/pay3",
          query: {
            data: res.data
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 400px;
}

.pay_type {
  padding-left: 50px;
  span {
    display: inline-block;
    position: relative;
    text-align: left;
    padding-left: 20px;
    margin: 10px;
    width: 144px;
    height: 48px;
    font-size: 14px;
    line-height: 48px;
    color: #666;
    border: 1px dashed #cacaca;
    cursor: pointer;
    label {
      cursor: pointer;
    }
    i.icon {
      vertical-align: middle;
      display: inline-block;
      background: url(./img/rbank-icon.png) no-repeat;
    }
    i.mark {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 16px;
      height: 17px;
      margin: 0;
      background: url(./img/rbank-icon.png) no-repeat;
      background-position: 0 -63px;
    }
  }
  span:nth-child(1) i.icon {
    width: 30px;
    height: 30px;
    background-position: 0 -362px;
  }
  span:nth-child(2) i.icon {
    width: 30px;
    height: 30px;
    background-position: 0 -399px;
  }
  span:nth-child(3) i.icon {
    width: 34px;
    height: 28px;
    background-position: 0 -439px;
  }
  span:nth-child(4) i.icon {
    width: 19px;
    height: 28px;
    background-position: 0 -477px;
  }
  span:nth-child(5) i.icon {
    width: 30px;
    height: 30px;
    background-position: 0 -515px;
  }
  span.select {
    border: 1px solid #ea3146;
  }
}
</style>