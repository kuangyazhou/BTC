<template>
  <div class="money">
    <!-- <h1>{{ msg }}</h1> -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick">
      <el-tab-pane :label="$t('message.order_manage')" name="orderManage">
        <el-row>
          <el-form :inline="true" size="mini" :model="formMoney" ref="formMoney">
            <el-col>
              <el-form-item :label="$t('message.deal_num')" prop="dealNum">
                <el-input v-model="formMoney.dealNum" @keyup.enter.native="search"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.memberAccount')" prop="account">
                <el-input v-model="formMoney.account" @keyup.enter.native="search"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.time_range')" prop="time">
                <!-- <el-input></el-input> -->
                <el-date-picker v-model="formMoney.time" size="mini" type="daterange" :range-separator="$t('s.zhi')" :start-placeholder="$t('s.ksrq')" :end-placeholder="$t('s.jsrq')">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label="$t('message.deal_type')" prop="dealType">
                <!-- <el-input v-model="formMoney.dealType"></el-input> -->
                <el-select v-model="formMoney.dealType">
                  <el-option v-for="item in dealType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('message.deal_status')" prop="dealStatus">
                <el-select v-model="formMoney.dealStatus">
                  <el-option v-for="item in dealStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('message.manage_status')" prop="oStatus">
                <el-select v-model="formMoney.oStatus">
                  <el-option v-for="item in manageStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('message.quick_search')" prop="quick">
                <el-input v-model="formMoney.quick" @keyup.enter.native="search"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="money-table">
          <el-col>
            <el-button size="mini" @click="search">{{$t('message.search')}}</el-button>
            <el-button size="mini" @click="reset('formMoney')">{{$t('l.chz')}}</el-button>
            <!-- <el-button size="mini">导出</el-button> -->
          </el-col>
          <el-col style="margin-top:0.5em;">
            <el-table :data="Data" :border="false" size="mini" v-loading="loading" height='45vh' style="width:99%" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column type="index" align="center" :label="$t('s.xh')"></el-table-column>
              <el-table-column align="center" width="100" :label="$t('message.deal_time')" prop="dealTime"></el-table-column>
              <el-table-column align="center" width="120" :label="$t('message.deal_num')" prop="orderNum"></el-table-column>
              <el-table-column align="center" :label="$t('message.memberAccount')" prop="account"></el-table-column>
              <el-table-column align="center" :label="$t('message.amount')" prop="sum"></el-table-column>
              <el-table-column align="center" :label="$t('message.deal_type')" prop="type" :formatter="typeFormatter"></el-table-column>
              <el-table-column align="center" width="120" :show-overflow-tooltip="true" :label="$t('message.deal_info')" prop="info"></el-table-column>
              <el-table-column align="center" :show-overflow-tooltip="true" width="120" :label="$t('message.remark')" prop="remark"></el-table-column>
              <el-table-column align="center" :label="$t('message.deal_status')" prop="dealStatus" :formatter="orderFormatter"></el-table-column>
              <el-table-column align="center" :label="$t('message.manage_status')" prop="solve" :formatter="operateFormatter"></el-table-column>
              <el-table-column align="center" :label="$t('message.modify_account')" prop="oper"></el-table-column>
              <el-table-column align="center" :label="$t('message.operate')" width="160">
                <template slot-scope="scoped">
                  <el-button size="mini" @click="viewDetail(scoped.row)">{{$t('message.see')}}</el-button>
                  <el-button @click="manage(scoped.row)" v-if="scoped.row.dealStatus==0" key="manage" size="mini">{{$t('message.deal')}}</el-button>
                  <el-button @click="fillBill(scoped.row)" v-if="scoped.row.dealStatus==2" key="repl" size="mini">{{$t('message.bill')}}</el-button>
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
      <el-tab-pane :label="$t('message.receipt')" name="receipt">
        <el-row>
          <el-col>
            <el-button size="mini" @click="receiptAdd">{{$t('message.addNew')}}</el-button>
          </el-col>
          <el-col style="margin-top:0.5em;">
            <el-table :data="receipt" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
              <el-table-column :label="$t('s.xh')" align="center" type="index"></el-table-column>
              <el-table-column :label="$t('message.pay_type')" align="center" :formatter="payType" prop="type"></el-table-column>
              <el-table-column :label="$t('message.pay_name')" align="center" prop="name"></el-table-column>
              <el-table-column :label="$t('message.receive_account')" align="center" prop="account"></el-table-column>
              <el-table-column :label="$t('message.receive_user')" align="center" prop="receipt_user"></el-table-column>
              <el-table-column :label="$t('message.operate')" align="center">
                <template slot-scope="scoped">
                  <el-button size="mini" @click="update(scoped.row)">{{$t('message.edit')}}</el-button>
                  <el-button size="mini" @click="del(scoped.row)">{{$t('message.del')}}</el-button>
                  <el-button size="mini" @click="forbid(scoped.row)">
                    <span v-if="scoped.row.status==1" key="stop">{{$t('message.noUse')}}</span>
                    <span v-if="scoped.row.status==0" key="useing">{{$t('message.using')}}</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="receiptSwitch" :title="$t('message.receipt')" :before-close="()=>receiptSwitch=false" :close-on-press-escape="false" :close-on-click-modal="false">
          <!--  type="flex" justify="end" -->
          <el-row>
            <el-form enctype="multipart/form-data" ref="formCollection" :rules="collectionRule" size="mini" :model="formCollection" :inline="false" label-width="100px">
              <el-col :span="8">
                <el-form-item :label="$t('message.pay_type')" prop="pay_type">
                  <el-select size="mini" v-model="formCollection.pay_type">
                    <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('message.pay_name')" prop="pay_name">
                  <el-input v-model="formCollection.pay_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('message.receive_account')" prop="pay_account">
                  <el-input v-model="formCollection.pay_account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('message.receive_user')" prop="pay_user">
                  <el-input v-model="formCollection.pay_user_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('message.qr_code')" prop="pay_qr_images">
                  <el-upload v-model="formCollection.pay_qr_images" class="upload-demo" :on-success="fileSuccess" action="/index.php?r=btc/amount-manage/pay-way-edit" list-type="picture">
                    <el-button size="small" type="primary">{{$t('message.upload')}}</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="collectionSubmit">{{$t('ar.bc')}}</el-button>
          </span>
        </el-dialog>
        <div class="flex center">
          <el-pagination layout="prev,pager,next" @current-change="receiveChange" :current-page="receivePage.current" :page-size="20" :total="receivePage.total*20" key="pageination"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.chargeSet')" name="charge">
        <el-row>
          <el-col :span="6">
            <el-form :inline="false" size="mini" v-model="formCharge" ref="formCharge">
              <el-form-item :label="$t('message.pay_min')" prop="pay_min">
                <el-input v-model="formCharge.pay_min"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.pay_max')" prop="pay_max">
                <el-input v-model="formCharge.pay_max"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.withdraw_min')" prop="withdraw_min">
                <el-input v-model="formCharge.withdraw_min"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.withdraw_max')" prop="withdraw_max">
                <el-input v-model="formCharge.withdraw_max"></el-input>
              </el-form-item>
              <el-form-item class="flex end">
                <!--  native-type="submit" -->
                <el-button @click="paySet">{{$t('ar.bc')}}</el-button>
                <!-- <el-button @click="reset('formCharge')">重置</el-button> -->
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
  Message,
  Upload
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
Vue.use(Upload);

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
      addUpdate: false,
      detailData: {},
      activeName: "orderManage",
      page: {
        current: 1,
        total: 1
      },
      receivePage: {
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
        pay_qr_images: null //文件
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
        { label: this.$t("l.cz"), value: 0 },
        { label: this.$t("l.tx"), value: 1 },
        { label: this.$t("message.bill"), value: 2 }
      ],
      dealStatus: [
        { label: this.$t("message.pending"), value: 0 },
        { label: this.$t("message.success"), value: 1 },
        { label: this.$t("message.fail"), value: 2 }
      ],
      manageStatus: [
        { label: this.$t("message.wait"), value: 0 },
        { label: this.$t("message.finish"), value: 1 }
      ],
      payment: [
        { label: this.$t("message.ailiPay"), value: 1 },
        { label: this.$t("message.wechat"), value: 2 },
        { label: this.$t("message.card"), value: 3 }
      ],
      Data: [],
      receipt: [],
      collectionRule: {
        pay_type: [
          {
            required: true,
            message: this.$t("message.err_pay_type"),
            trigger: "blur"
          }
        ],
        pay_name: [
          {
            required: true,
            message: this.$t("message.err_pay_name"),
            trigger: "blur"
          }
        ],
        pay_account: [
          {
            required: true,
            message: this.$t("message.err_pay_account"),
            trigger: "blur"
          }
        ],
        pay_user: [
          {
            required: false,
            message: this.$t("message.err_pay_user"),
            trigger: "blur"
          }
        ],
        pay_qr_images: [
          {
            required: true,
            message: this.$t("message.err_QR_code"),
            trigger: "blur"
          }
        ]
      }
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
        this.chargeList({});
      }
    },
    receiptChange(e) {
      this.initList({ page: e });
    },
    receiveChange(e) {
      this.collectionList({ page: e });
    },
    receiptAdd() {
      // this.reset("formCollection");
      this.addUpdate = true; //新增时二维码必填 保存时调用新增的保存接口
      this.collectionRule.pay_qr_images[0].required = true;
      this.receiptSwitch = true;
      this.formCollection.pay_user_name = "";
      this.$refs["formCollection"].resetFields();
    },
    paySet() {
      // console.log(this.formCharge);
      this.$store.dispatch("chargeUpdate", this.formCharge).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          // if (res.data.status == 1) {
          const data = res.data.data;
          // Object.assign(this.formCharge, res.data.data);
          // this.formCharge.pay_min = data.pay_min_amount;
          // this.formCharge.pay_max = data.pay_max_amount;
          // this.formCharge.withdraw_min = data.withdraw_min_amount;
          // this.formCharge.withdraw_max = data.withdraw_max_amount;
          // }
          Message({
            message: this.$t("message.saveSuccess"),
            type: "success",
            duration: 1500,
            onClose: () => {
              this.chargeList();
            }
          });
        }
      });
    },
    collectionSubmit() {
      // console.log(this.formCollection);
      this.$refs["formCollection"].validate(valid => {
        // console.log(valid);
        if (valid) {
          //文件上传 header设为multia/form-data
          // 参数使用form-data格式
          const param = new FormData();
          param.append("pay_qr_images", this.formCollection.pay_qr_images);
          param.append("pay_type", this.formCollection.pay_type);
          param.append("pay_name", this.formCollection.pay_name);
          param.append("pay_account", this.formCollection.pay_account);
          param.append("pay_user_name", this.formCollection.pay_user_name);
          param.append("id", this.id);
          if (this.addUpdate) {
            //调用新增的保存接口
            this.$store.dispatch("collectionCreate", param).then(res => {
              if (res.data.status == 1) {
                Message({
                  message: this.$t("message.addSuccess"),
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.receiptSwitch = false;
                    this.collectionList({});
                  }
                });
              }
            });
          } else {
            //调用编辑的保存接口
            this.$store.dispatch("collectionUpdate", param).then(res => {
              if (res.data.status == 1) {
                Message({
                  message: this.$t("message.updateSucess"),
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.receiptSwitch = false;
                    this.collectionList({});
                  }
                });
              }
            });
          }
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    fileSuccess(response, file, fileList) {
      this.formCollection.pay_qr_images = file.raw;
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
      this.id = e.id;
      this.addUpdate = false; //编辑时二维码为非必填
      this.collectionRule.pay_qr_images[0].required = false;
      this.$store.dispatch("collection", { id: e.id }).then(res => {
        const data = res.data.data;
        Object.assign(this.formCollection, data);
      });
    },
    del(e) {
      this.$store.dispatch("collectionDel", { id: e.id }).then(res => {
        if (res.data.status == 1) {
          Message({
            message: this.$t("message.delSucess"),
            type: "success",
            duration: 1500,
            onClose: () => {
              this.collectionList({});
            }
          });
        }
      });
    },
    forbid(e) {
      this.$store.dispatch("collectionOnOff", { id: e.id }).then(res => {
        if (res.data.status == 1) {
          Message({
            message: this.$t("message.stopSucess"),
            type: "success",
            duration: 1500,
            onClose: () => {
              this.collectionList({});
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
    chargeList(arg) {
      this.$store.dispatch("recharge", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          const data = res.data.data;
          // Object.assign(this.formCharge, res.data.data);
          this.formCharge.pay_min = data.pay_min_amount;
          this.formCharge.pay_max = data.pay_max_amount;
          this.formCharge.withdraw_min = data.withdraw_min_amount;
          this.formCharge.withdraw_max = data.withdraw_max_amount;
        }
      });
    },
    search() {
      let valid = false;
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
        opstatus: this.formMoney.oStatus,
        quick: this.formMoney.quick
      };
      for (let item in arg) {
        arg[item] == "" ? (valid = true) : null;
      }
      if (valid) {
        this.initList(arg);
      } else {
        Message({
          message: this.$t("message.empty_search"),
          type: "error",
          duration: 1500
        });
      }
    },
    typeFormatter(e) {
      if (e.type == 0) {
        return this.$t("l.cz");
      }
      if (e.type == 1) {
        return this.$t("l.tx");
      }
      if (e.type == 2) {
        return this.$t("message.bill");
      }
    },
    orderFormatter(e) {
      if (e.dealStatus == 0) {
        return this.$t("message.pending");
      }
      if (e.dealStatus == 1) {
        return this.$t("message.success");
      }
      if (e.dealStatus == 2) {
        return this.$t("message.fail");
      }
    },
    operateFormatter(e) {
      if (e.solve == 0) {
        return this.$t("message.wait");
      }
      if (e.solve == 1) {
        return this.$t("message.finish");
      }
    },
    payType(e) {
      if (e.type == 1) {
        return this.$t("message.ailiPay");
      }
      if (e.type == 2) {
        return this.$t("message.wechat");
      }
      if (e.type == 3) {
        return this.$t("message.card");
      }
    },
    collectionList(arg) {
      this.loading = true;
      this.$store.dispatch("collectionList", arg).then(res => {
        if (res.data.status == 1) {
          this.loading = false;
          Object.assign(this.receivePage, res.data.data.page);
          this.receipt = [];
          const data = res.data.data.list;
          data.forEach(item => {
            this.receipt.push({
              id: item.id,
              type: item.pay_type,
              name: item.pay_name,
              account: item.pay_account,
              receipt_user: item.pay_user_name,
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
          Object.assign(this.page, res.data.data.page);
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
