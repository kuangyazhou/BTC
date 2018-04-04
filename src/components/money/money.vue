<template>
  <div class="money">
    <!-- <h1>{{ msg }}</h1> -->
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="订单管理" name="orderManage">
        <el-row>
          <el-form :inline="true" size="mini">
            <el-col>
              <el-form-item label="交易编号">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="会员帐号">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="时间范围">
                <!-- <el-input></el-input> -->
                <el-date-picker v-model="value6" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="交易编号">
            <el-input></el-input>
          </el-form-item> -->
            </el-col>
            <el-col>
              <el-form-item label="交易类型">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="交易状态">
                <el-select v-model="dealStatus">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理状态">
                <el-select v-model="solve">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="快捷查询">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-col>
            <el-button size="mini">查询</el-button>
            <el-button size="mini">重置</el-button>
            <el-button size="mini">导出</el-button>
          </el-col>
          <el-col>
            <el-table :data="Data" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column type="index" align="center" label="序号"></el-table-column>
              <el-table-column align="center" label="交易时间" prop="dealTime"></el-table-column>
              <el-table-column align="center" label="交易编号" prop="orderNum"></el-table-column>
              <el-table-column align="center" label="会员帐号" prop="account"></el-table-column>
              <el-table-column align="center" label="金额" prop="sum"></el-table-column>
              <el-table-column align="center" label="交易类型" prop="type"></el-table-column>
              <el-table-column align="center" label="交易信息" prop="info"></el-table-column>
              <el-table-column align="center" label="备注" prop="remark"></el-table-column>
              <el-table-column align="center" label="交易状态" prop="dealStatus"></el-table-column>
              <el-table-column align="center" label="处理状态" prop="solve"></el-table-column>
              <el-table-column align="center" label="操作管理员" prop="oper"></el-table-column>
              <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scoped">
                  <el-button size="mini">查看</el-button>
                  <el-button size="mini">处理</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收款设置" name="receipt">
        <el-row>
          <el-col>
            <el-button size="mini" @click="receiptAdd">新增</el-button>
          </el-col>
          <el-col>
            <el-table :data="receipt" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column label="序号" align="center" type="index"></el-table-column>
              <el-table-column label="支付类型" align="center" prop="type"></el-table-column>
              <el-table-column label="支付名称" align="center" prop="name"></el-table-column>
              <el-table-column label="收款帐号" align="center" prop="account"></el-table-column>
              <el-table-column label="收款人" align="center" prop="user"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scoped">
                  <el-button size="mini">编辑</el-button>
                  <el-button size="mini">删除</el-button>
                  <el-button size="mini">停用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="receiptSwitch" title="收款设置" :before-close="()=>receiptSwitch=false">
          <!--  type="flex" justify="end" -->
          <el-row>
            <el-form size="mini" :inline="false" label-width="100px">
              <el-col :span="8">
                <el-form-item label="支付类型">
                  <el-select size="mini" v-model="payType">
                    <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款帐号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二维码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini">保存</el-button>
          </span>
        </el-dialog>
        <div class="flex center">
          <el-pagination layout="prev,pager,next" @current-change="receiptChange" :current-page="page.current" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="充值提现设置" name="charge">
        <el-row>
          <el-col :span="6">
            <el-form :inline="false" size="mini">
              <el-form-item label="最小充值金额">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="最大充值金额">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="最小提现金额">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="最大提现金额">
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="flex end">
                <!--  native-type="submit" -->
                <el-button>保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Input,
  Loading,
  Form,
  FormItem,
  Select,
  Option,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Dialog,
  DatePicker,
  Pagination
} from "element-ui";

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(Loading);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Pagination);

export default {
  name: "Money",
  data() {
    return {
      loading: false,
      dealStatus: "",
      receiptSwitch: false,
      solve: "",
      value6: "",
      activeName: "orderManage",
      page: {
        current: 1,
        total: 1
      },
      payment: [
        { label: "支付宝", value: "zhihubao" },
        { label: "微信", value: "wechat" },
        { label: "银行卡", value: "card" }
      ],
      payType: "",
      options: [{ label: "审核通过", value: 1 }, { label: "不通过", value: 0 }],
      Data: [
        {
          dealTime: "2016-12-12",
          orderNum: "20181212",
          account: "1001",
          sum: 100,
          type: "补帐",
          info: "在线补帐10元",
          remark: "等待交易",
          dealStatus: "待确认",
          solve: "已完成",
          oper: "admin"
        },
        {
          dealTime: "2016-12-12",
          orderNum: "20181212",
          account: "1001",
          sum: 100,
          type: "补帐",
          info: "在线补帐10元",
          remark: "等待交易",
          dealStatus: "待确认",
          solve: "已完成",
          oper: "admin"
        }
      ],
      receipt: [
        { type: "支付宝", name: "微信", account: "zfb88", user: "aikin" },
        { type: "支付宝", name: "微信", account: "zfb88", user: "aikin" }
      ]
    };
  },
  methods: {
    tabClick(e) {},
    receiptChange(e) {},
    receiptAdd() {
      this.receiptSwitch = true;
    }
  }
};
</script>

<style scoped>

</style>
