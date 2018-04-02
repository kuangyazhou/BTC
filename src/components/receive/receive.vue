<template>
  <div class="receive">
    <div class="receive-search">
      <el-row>
        <el-form :inline="true" size="mini">
          <el-col :span="4">
            <el-form-item label="会员帐号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-show="receiveItem=='member'" label="监控比例">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-show="receiveItem=='audit'" label="委托单单号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="委托类型">
              <!-- <el-input></el-input> -->
              <el-select v-model="ent">
                <el-option v-for="item in entType" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="建仓平仓">
              <!-- <el-input></el-input> -->
              <el-select v-model="type">
                <el-option v-for="item in houseType" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <!-- <el-radio-group v-model="toogleActive" @change="setToogle" size="mini">
            <el-radio-button v-for="item in toogle" :key='item.label' :label="item.label">
              {{item.value}}
            </el-radio-button>
          </el-radio-group> -->
          <!-- { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" } -->
          <el-button-group>
            <el-button @click="setToogle('audit')" size="mini">默认委托单审核</el-button>
            <el-button v-show="receiveItem=='audit'" size="mini">委托单大单审核</el-button>
            <el-button v-show="receiveItem=='audit'" size="mini">委托单vip组审核</el-button>
            <el-button v-show="receiveItem=='audit'" size="mini">委托单特殊分组审核</el-button>
          </el-button-group>
        </el-col>

        <el-col :span="8">
          <el-radio-group v-model="itemActive" @change="setItem" size="mini">
            <el-radio-button v-for="item in items" :key='item.label' :label="item.label">
              {{item.value}}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <!-- <transition name="el-fade-in"> -->
    <ReceiveTable :receiveItem.sync="receiveItem"></ReceiveTable>
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
      type: "open",
      ent: "",
      toogleActive: "vip",
      itemActive: "member",
      toogle: [
        { label: "default", value: "默认委托单审核" },
        { label: "big", value: "委托单大单审核" },
        { label: "vip", value: "委托单vip组审核" },
        { label: "special", value: "委托单特殊分组审核" }
      ],
      items: [
        { label: "net", value: "持仓单查询现金" },
        { label: "deal", value: "成交单查询" },
        { label: "member", value: "会员资金监控" }
      ],
      houseType: [
        {
          label: "建仓",
          value: "open"
        },
        {
          label: "平仓",
          value: "close"
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
  methods: {
    setItem(e) {
      // console.log(e);
      this.receiveItem = e;
    },
    setToogle(e) {
      // console.log(e);
      this.receiveItem = e;
    }
  }
};
</script>

<style scoped>
.receive {
  width: 99%;
  max-height: 65vh;
  overflow-y: scroll;
}
.receive-search {
  /* margin-bottom: 0.5em; */
  padding-bottom: 1em;
  /* border-bottom: 1px solid #e5e5e5; */
}
</style>
