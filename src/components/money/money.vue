<template>
  <div class="money">
    <!-- <h1>{{ msg }}</h1> -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick">
      <el-tab-pane label="订单管理" name="orderManage">
        <el-row>
          <el-form :inline="true" size="mini" :model="formMoney" ref="formMoney">
            <el-col>
              <el-form-item label="交易编号" prop="dealNum">
                <el-input v-model="formMoney.dealNum"></el-input>
              </el-form-item>
              <el-form-item label="会员帐号" prop="account">
                <el-input v-model="formMoney.account"></el-input>
              </el-form-item>
              <el-form-item label="时间范围" prop="time">
                <!-- <el-input></el-input> -->
                <el-date-picker v-model="formMoney.time" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="交易类型" prop="dealType">
                <!-- <el-input v-model="formMoney.dealType"></el-input> -->
                <el-select v-model="formMoney.dealType">
                  <el-option v-for="item in dealType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="交易状态" prop="dealStatus">
                <el-select v-model="formMoney.dealStatus">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理状态" prop="oStatus">
                <el-select v-model="formMoney.oStatus">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="快捷查询" prop="quick">
                <el-input v-model="formMoney.quick"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="money-table">
          <el-col>
            <el-button size="mini" @click="search">查询</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
            <!-- <el-button size="mini">导出</el-button> -->
          </el-col>
          <el-col style="margin-top:0.5em;">
            <el-table :data="Data" :border="false" size="mini" v-loading="loading" height='45vh' style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column type="index" align="center" label="序号"></el-table-column>
              <el-table-column align="center" width="100" label="交易时间" prop="dealTime"></el-table-column>
              <el-table-column align="center" width="120" label="交易编号" prop="orderNum"></el-table-column>
              <el-table-column align="center" label="会员帐号" prop="account"></el-table-column>
              <el-table-column align="center" label="金额" prop="sum"></el-table-column>
              <el-table-column align="center" label="交易类型" prop="type"></el-table-column>
              <el-table-column align="center" width="120" :show-overflow-tooltip="true" label="交易信息" prop="info"></el-table-column>
              <el-table-column align="center" :show-overflow-tooltip="true" width="120" label="备注" prop="remark"></el-table-column>
              <el-table-column align="center" label="交易状态" prop="dealStatus"></el-table-column>
              <el-table-column align="center" label="处理状态" prop="solve"></el-table-column>
              <el-table-column align="center" label="操作管理员" prop="oper"></el-table-column>
              <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scoped">
                  <el-button size="mini" @click="viewDetail(scoped.row)">查看</el-button>
                  <el-button @click="manage(scoped.row)" v-if="scoped.row.dealStatus==0" key="manage" size="mini">处理</el-button>
                  <!--  v-if="scoped.row.dealStatus==2"  -->
                  <el-button @click="fillBill(scoped.row)" key="repl" size="mini">补帐</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex center">
              <el-pagination layout="prev,pager,next" @current-change="receiptChange" :current-page="page.current" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
            </div>
          </el-col>
          <!-- 订单详情 -->
          <MoneyDetail :detailSwitch.sync="detailSwitch" :manangeSwitch.sync="manangeSwitch" :billSwitch.sync="billSwitch" :detailData="detailData" :id="id"></MoneyDetail>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收款设置" name="receipt">
        <el-row>
          <el-col>
            <el-button size="mini" @click="receiptAdd">新增</el-button>
          </el-col>
          <el-col style="margin-top:0.5em;">
            <el-table :data="receipt" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column label="序号" align="center" type="index"></el-table-column>
              <el-table-column label="支付类型" align="center" prop="type"></el-table-column>
              <el-table-column label="支付名称" align="center" prop="name"></el-table-column>
              <el-table-column label="收款帐号" align="center" prop="account"></el-table-column>
              <el-table-column label="收款人" align="center" prop="receipt_user"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scoped">
                  <el-button size="mini" @click="update(scoped.row)">编辑</el-button>
                  <el-button size="mini" @click="del(scoped.row)">删除</el-button>
                  <el-button size="mini" @click="forbid(scoped.row)">停用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="receiptSwitch" title="收款设置" :before-close="()=>receiptSwitch=false">
          <!--  type="flex" justify="end" -->
          <el-row>
            <el-form ref="formCollection" size="mini" :model="formCollection" :inline="false" label-width="100px">
              <el-col :span="8">
                <el-form-item label="支付类型" prop="pay_type">
                  <el-select size="mini" v-model="formCollection.pay_type">
                    <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付名称" prop="pay_name">
                  <el-input v-model="formCollection.pay_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款帐号" prop="pay_account">
                  <el-input v-model="formCollection.pay_account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" prop="pay_user">
                <el-form-item label="收款人" prop="pay_user">
                  <el-input v-model="formCollection.pay_user_name" prop="pay_user"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二维码" prop="QR_code">
                  <el-input v-model="formCollection.pay_qr_images"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="collectionSubmit">保存</el-button>
          </span>
        </el-dialog>
        <div class="flex center">
          <el-pagination layout="prev,pager,next" @current-change="receiptChange" :current-page="page.current" :page-size="20" :total="page.total*20" key="pageination"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="充值提现设置" name="charge">
        <el-row>
          <el-col :span="6">
            <el-form :inline="false" size="mini" v-model="formCharge">
              <el-form-item label="最小充值金额">
                <el-input v-model="formCharge.pay_min"></el-input>
              </el-form-item>
              <el-form-item label="最大充值金额">
                <el-input v-model="formCharge.pay_max"></el-input>
              </el-form-item>
              <el-form-item label="最小提现金额">
                <el-input v-model="formCharge.withdraw_min"></el-input>
              </el-form-item>
              <el-form-item label="最大提现金额">
                <el-input v-model="formCharge.withdraw_max"></el-input>
              </el-form-item>
              <el-form-item class="flex end">
                <!--  native-type="submit" -->
                <el-button @click="paySet">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MoneyDetail from "@/components/money/moneyDetail";
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
  Pagination,
  Message
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
  components: { MoneyDetail },
  data() {
    return {
      id: null,
      loading: false,
      receiptSwitch: false,
      detailSwitch: false,
      manangeSwitch: false,
      billSwitch: false,
      detailData: {},
      activeName: "orderManage",
      page: {
        current: 1,
        total: 1
      },
      formCharge: {
        pay_min: "", //最小充值金额
        pay_max: "", //最大充值金额
        withdraw_min: "", //最小提现金额
        withdraw_max: "" //最大提现金额
      },
      formCollection: {
        pay_type: "", //支付类型。1:支付宝。2:微信，3：银行卡
        pay_name: "", //支付名称
        pay_account: "", //收款帐号
        pay_user_name: "", //收款人姓名
        pay_qr_images: "" //文件
      },
      formMoney: {
        dealNum: "",
        account: "",
        time: "",
        dealType: "",
        dealStatus: "",
        oStatus: "",
        quick: ""
      },
      dealType: [
        { label: "充值", value: 1 },
        { label: "提现", value: 0 },
        { label: "补帐", value: -1 }
      ],
      options: [{ label: "审核通过", value: 1 }, { label: "不通过", value: 0 }],
      payment: [
        { label: "支付宝", value: "zhihubao" },
        { label: "微信", value: "wechat" },
        { label: "银行卡", value: "card" }
      ],
      Data: [],
      receipt: [
        { type: "支付宝", name: "微信", account: "zfb88", user: "aikin" },
        { type: "支付宝", name: "微信", account: "zfb88", user: "aikin" }
      ]
    };
  },
  created() {
    this.initList({});
  },
  mounted() {},
  methods: {
    tabClick(e) {
      // console.log(e.$options.propsData.name);
      const item = e.$options.propsData.name;
      if (item == "orderManage") {
        this.initList({});
      }
      if (item == "receipt") {
        this.collectionList({});
      }
      if (item == "charge") {
      }
    },
    receiptChange(e) {},
    receiptAdd() {
      this.receiptSwitch = true;
      this.formCollection.pay_user_name = "";
      this.$refs["formCollection"].resetFields();
    },
    paySet() {
      console.log(this.formCharge);
    },
    collectionSubmit() {
      console.log(this.formCollection);
    },
    reset() {
      this.$refs["formMoney"].resetFields();
    },
    viewDetail(e) {
      this.$store.dispatch("chartDetail", { id: e.id }).then(res => {
        if (res.data.status == 1) {
          Object.assign(this.detailData, res.data.data);
          this.detailSwitch = true;
        }
      });
    },
    update(e) {
      this.receiptSwitch = true;
      this.$store.dispatch("collection", { id: e.id }).then(res => {
        const data = res.data.data;
        Object.assign(this.formCollection, data);
      });
    },
    del(e) {
      this.$store.dispatch("collectionDel", { id: e.id }).then(res => {
        if (res.data.status == 1) {
          Message({
            message: "删除成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.collectionList();
            }
          });
        }
      });
    },
    forbid(e) {
      this.$store.dispatch("collectionOnOff", { id: e.id }).then(res => {
        if (res.data.status == 1) {
          Message({
            message: "停用成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.collectionList();
            }
          });
        }
      });
    },
    manage(e) {
      // console.log(e);
      this.manangeSwitch = true;
      this.id = e.id;
    },
    fillBill(e) {
      // console.log(e);
      this.id = e.id;
      this.billSwitch = true;
    },
    search() {
      const arg = {
        account: this.formMoney.account,
        ordernum: this.formMoney.dealNum,
        starttime: this.formMoney.time
          ? new Date(this.formMoney.time[0]).Format("yyyy-MM-dd")
          : "",
        endtime: this.formMoney.time
          ? new Date(this.formMoney.time[1]).Format("yyyy-MM-dd")
          : "",
        type: this.formMoney.dealType,
        status: this.formMoney.dealStatus,
        opstatus: this.formMoney.oStatus
      };
      // console.log(arg);
      this.initList(arg);
    },
    collectionList(arg) {
      this.loading = true;
      this.$store.dispatch("collectionList", arg).then(res => {
        if (res.data.status == 1) {
          this.loading = false;
          this.receipt = [];
          const data = res.data.data.list;
          data.forEach(item => {
            this.receipt.push({
              id: item.id,
              type: item.pay_type,
              name: item.pay_name,
              account: item.pay_account,
              user: item.pay_user_name,
              img: item.pay_qr_code_images_path,
              time: item.add_times,
              modify_id: item.modify_id,
              midify_account: item.midify_account,
              status: item.status
            });
          });
        }
      });
    },
    initList(arg) {
      this.$store.dispatch("chargeList", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          this.loading = false;
          this.Data = [];
          const data = res.data.data.list;
          data.forEach(item => {
            this.Data.push({
              dealTime: item.add_time,
              orderNum: item.pay_number,
              account: item.user_account,
              sum: item.amount,
              type: item.type,
              info: item.info,
              remark: item.remark,
              dealStatus: item.order_status,
              solve: item.op_status,
              oper: item.modify_user_name,
              id: item.id
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
/* .money-table {
  max-height: 50vh;
  overflow-y: auto;
} */
</style>
