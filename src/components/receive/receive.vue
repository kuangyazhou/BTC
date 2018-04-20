<template>
  <div class="receive">
    <div class="receive-search">
      <el-row>
        <el-form :inline="true" size="mini" :model="formReceive" ref="formReceive">
          <el-col :span="4">
            <el-form-item label="会员帐号" prop="account">
              <el-input v-model="formReceive.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- ||receiveItem==='net_cash'||receiveItem==='net_credit' -->
            <el-form-item v-show="receiveItem==='deal'" label="成交单号" prop="order_num">
              <el-input v-model="formReceive.order_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-show="receiveItem==='member'" label="监控比例" prop="monitor">
              <el-input v-model="formReceive.monitor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-show="receiveItem==='audit'||receiveItem==='audit_big'||receiveItem==='audit_special'" label="委托单单号" prop="auth_num">
              <el-input v-model="formReceive.auth_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item v-show="receiveItem==='audit'||receiveItem==='audit_big'||receiveItem==='audit_special'" label="委托类型" prop="auth_type">
              <!-- <el-input></el-input> -->
              <el-select v-model="formReceive.auth_type">
                <el-option v-for="item in entType" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item v-show="receiveItem!='member'&receiveItem!='net_cash'&receiveItem!='net_credit'" label="建仓平仓" prop="order_type">
              <!-- <el-input></el-input> -->
              <el-select v-model="formReceive.order_type">
                <el-option v-for="item in houseType" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click="search('formReceive')">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="reset('formReceive')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row type="flex" justify="space-between">
        <!-- <el-col :span="12"> -->
        <!-- <el-radio-group v-model="toogleActive" @change="setToogle" size="mini">
            <el-radio-button v-for="item in toogle" :key='item.label' :label="item.label">
              {{item.value}}
            </el-radio-button>
          </el-radio-group> -->
        <!-- { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" } -->
        <!-- <el-button-group> -->
        <!-- <el-button @click="setToogle('audit')" size="mini">默认委托单审核</el-button>
            <el-button v-show="receiveItem==='audit'" size="mini">委托单大单审核</el-button>
            <el-button v-show="receiveItem==='audit'" size="mini">委托单vip组审核</el-button>
            <el-button v-show="receiveItem==='audit'" size="mini">委托单特殊分组审核</el-button> -->
        <!-- </el-button-group> -->
        <!-- </el-col> -->
        <el-col :span="16">
          <el-radio-group v-model="itemActive" @change="setItem" size="mini">
            <el-radio-button v-for="item in items" :key='item.label' :label="item.label">
              {{item.value}}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <!-- <transition name="el-fade-in"> -->
    <ReceiveTable :receiveItem.sync="receiveItem" :formReceive="formReceive" ref="tables"></ReceiveTable>
    <!-- </transition> -->
  </div>
</template>

<script>
import Vue from "vue";
import {
  Row,
  Col,
  Input,
  Select,
  Option,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  RadioButton,
  RadioGroup
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Form);
Vue.use(FormItem);

import ReceiveTable from "@/components/receive/table";

export default {
  components: { ReceiveTable },
  name: "Receive",
  data() {
    return {
      msg: "receive",
      receiveItem: "member",
      toogleActive: "vip",
      itemActive: "member",
      formReceive: {
        account: "",
        order_num: "",
        monitor: "",
        auth_num: "",
        auth_type: "",
        order_type: "1"
      },
      toogle: [
        { label: "default", value: "默认委托单审核" },
        { label: "big", value: "委托单大单审核" },
        { label: "vip", value: "委托单vip组审核" },
        { label: "special", value: "委托单特殊分组审核" }
      ],
      items: [
        { label: "audit", value: "默认委托单审核" },
        { label: "audit_big", value: "委托大单审核" },
        { label: "audit_special", value: "委托单特殊分组审核" },
        { label: "deal", value: "成交单" },
        { label: "net_cash", value: "持仓单现金查询" },
        { label: "net_credit", value: "持仓单信用查询" },
        { label: "member", value: "会员资金监控" }
      ],
      houseType: [
        {
          label: "建仓",
          value: "0"
        },
        {
          label: "平仓",
          value: "1"
        }
      ],
      entType: [
        {
          label: "市价委托",
          value: 0
        },
        {
          label: "限价委托",
          value: 1
        }
      ]
    };
  },
  created() {},
  methods: {
    setItem(e) {
      // console.log(e);
      this.receiveItem = e;
    },
    // setToogle(e) {
    //   console.log(e);
    //   this.receiveItem = e;
    // },
    search(formName) {
      switch (this.receiveItem) {
        case "member":
          this.$refs.tables.initList({ account: this.formReceive.account });
          break;
        case "deal":
          this.$refs.tables.initDeal({
            account: this.formReceive.account,
            ordernum: this.formReceive.order_num,
            type: this.formReceive.order_type
          });
          break;
        case "net_cash":
          this.$refs.tables.initNet({
            account: this.formReceive.account,
            type: 1,
            ordernum: this.formReceive.order_num,
            otype: this.formReceive.order_type
          });
          break;
        case "net_credit":
          this.$refs.tables.initNet({
            account: this.formReceive.account,
            type: 0,
            ordernum: this.formReceive.order_num,
            otype: this.formReceive.order_type
          });
          break;
        case "audit":
          this.$refs.tables.initAudit({
            size: 1,
            ordernum: this.formReceive.auth_num,
            account: this.formReceive.account,
            etype: this.formReceive.auth_type,
            otype: this.formReceive.order_type
          });
          break;
        case "audit_big":
          this.$refs.tables.initAudit({
            size: 2,
            ordernum: this.formReceive.auth_num,
            account: this.formReceive.account,
            etype: this.formReceive.auth_type,
            otype: this.formReceive.order_type
          });
          break;
        case "audit_special":
          this.$refs.tables.initAudit({
            size: 3,
            ordernum: this.formReceive.auth_num,
            account: this.formReceive.account,
            etype: this.formReceive.auth_type,
            otype: this.formReceive.order_type
          });
          break;
        default:
      }
      //搜索后是否清空搜索框，未确认
      // this.$refs[formName].resetFields();
    },
    reset(formName) {
      // console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.receive {
  width: 99%;
  /* max-height: 65vh; */
  /* overflow-y: scroll; */
}
.receive-search {
  /* margin-bottom: 0.5em; */
  padding-bottom: 1em;
  /* border-bottom: 1px solid #e5e5e5; */
}
</style>
