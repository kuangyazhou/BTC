<template>
  <div class="receive-table">
    <!--  style="width: 99%;" -->
    <el-row v-show="receiveItem=='member'" key="member">
      <el-col>
        <el-table :data="memberMoney" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          "$t('message.keyword1')+':'"
          <el-table-column :label="$t('message.memberAccount')" align="center" prop="account"></el-table-column>
          <el-table-column :label="$t('message.memberName')" align="center" prop="name"></el-table-column>
          <el-table-column :label="$t('message.risk')" align="center" prop="risk"></el-table-column>
          <el-table-column :label="$t('message.float')" align="center" prop="float"></el-table-column>
          <el-table-column :label="$t('message.property')" align="center" prop="property"></el-table-column>
          <el-table-column :label="$t('l.kybzj')" align="center" prop="cash"></el-table-column>
          <el-table-column :label="$t('message.operate')" align="center" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="equalHandle(scope.row)">{{$t('message.order_list')}}</el-button>
              <el-button size="mini" @click="raplHandle(scope.row)">{{$t('message.rapl')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- <transition name="el-fade-in"> -->
    <el-row v-show="receiveItem=='net_cash'||receiveItem=='net_credit'" key="net_cash">
      <el-col>
        <el-table :data="netData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column :label="$t('message.productName')" align="center" prop="name">
            <template slot-scope="scope">
              <span @click="viewUser(scope.row)" style="cursor: pointer;">
                {{scope.row.name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('message.current_price')" align="center" prop="buy"></el-table-column>
          <el-table-column :label="$t('message.order_diff')" align="center" prop="spread"></el-table-column>
          <el-table-column :label="$t('message.current_sale')" align="center" prop="sale"></el-table-column>
          <el-table-column :label="$t('message.refer_price')" align="center" prop="refer"></el-table-column>
          <el-table-column :label="$t('message.buy_total')" align="center" prop="buyNum"></el-table-column>
          <el-table-column :label="$t('message.sale_total')" align="center" prop="saleNum"></el-table-column>
          <el-table-column :label="$t('message.what')" align="center" prop="what"></el-table-column>
          <el-table-column key="max_keep" v-if="level>0" :label="$t('message.max_keep')" align="center" prop="max_keep"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- </transition> -->
    <el-row v-show="receiveItem=='detail'" key="detail">
      <el-col>
        <el-table :data="productDetail" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column :label="$t('message.memberAccount')" align="center" prop="account"></el-table-column>
          <el-table-column :label="$t('message.memberName')" align="center" prop="name"></el-table-column>
          <el-table-column :label="$t('message.order_num')" align="center" prop="orderNum"></el-table-column>
          <el-table-column :label="$t('message.keep_time')" align="center" prop="keepTime"></el-table-column>
          <el-table-column :label="$t('message.productName')" align="center" prop="productName"></el-table-column>
          <el-table-column :label="$t('l.mmfx')" align="center" prop="direction"></el-table-column>
          <el-table-column :label="$t('l.ccsl')" align="center" prop="keepNum"></el-table-column>
          <el-table-column :label="$t('l.zsj')" align="center" prop="loos"></el-table-column>
          <el-table-column :label="$t('l.zyj')" align="center" prop="profit"></el-table-column>
          <el-table-column :label="$t('l.jcj')" align="center" prop="openPrice"></el-table-column>
          <el-table-column :label="$t('message.c_price')" align="center" prop="currentPrice"></el-table-column>
          <el-table-column :label="$t('message.keep_days')" align="center" prop="keepDay"></el-table-column>
          <el-table-column :label="$t('message.float')" align="center" prop="float"></el-table-column>
          <el-table-column :label="$t('message.crashUsed')" align="center" prop="used"></el-table-column>
          <el-table-column :label="$t('message.comPen')" align="center" prop="company" width="100"></el-table-column>
          <el-table-column :label="$t('message.comFloat')" align="center" prop="companyFloat" width="110"></el-table-column>
          <el-table-column :label="$t('l.jcsj')" align="center" prop="openTime"></el-table-column>
          <el-table-column :label="$t('message.operate')" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="productClose(scope.row)">{{$t('message.force_close')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="receiveItem=='deal'" key="deal">
      <el-col>
        <el-table :data="dealData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)" height="55vh">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column :label="$t('message.memberAccount')" align="center" prop="account"></el-table-column>
          <el-table-column :label="$t('message.memberName')" align="center" prop="name"></el-table-column>
          <el-table-column :label="$t('l.cjdh')" align="center" prop="orderNum"></el-table-column>
          <el-table-column :label="$t('l.ccdh')" align="center" prop="keepNum"></el-table-column>
          <el-table-column :label="$t('l.cjsj')" align="center" prop="dealTime"></el-table-column>
          <el-table-column :label="$t('message.productName')" align="center" prop="productName"></el-table-column>
          <el-table-column :label="$t('l.jcpc')" align="center" prop="keepClose"></el-table-column>
          <el-table-column :label="$t('l.mmfx')" align="center" prop="direction"></el-table-column>
          <el-table-column :label="$t('l.cjl')" align="center" prop="dealNum"></el-table-column>
          <el-table-column :label="$t('l.cjje')" align="center" prop="dealPrice"></el-table-column>
          <el-table-column :label="$t('l.jcj')" align="center" prop="openPrice"></el-table-column>
          <el-table-column :label="$t('l.ccj')" align="center" prop="keepPrice"></el-table-column>
          <el-table-column :label="$t('l.pcj')" align="center" prop="closePrice"></el-table-column>
          <el-table-column :label="$t('l.sjyk')" align="center" prop="profit"></el-table-column>
          <el-table-column :label="$t('l.hysxf')" align="center" prop="memberCharge"></el-table-column>
          <el-table-column :label="$t('message.member_night')" align="center" prop="memberNight"></el-table-column>
          <el-table-column :label="$t('message.comPen')" align="center" prop="companyPen"></el-table-column>
          <el-table-column :label="$t('message.comWin')" align="center" prop="companyProfit" width="100"></el-table-column>
          <el-table-column :label="$t('message.comCharge')" align="center" prop="companyCharge" width="110"></el-table-column>
          <el-table-column :label="$t('message.comNight')" align="center" prop="companyNight" width="110"></el-table-column>
          <el-table-column :label="$t('l.cjlx')" align="center" prop="dealType">
            <template slot-scope="scope">
              <span v-if="scope.row.dealType==0" key="111">{{$t('message.userEntrust')}}</span>
              <span v-if="scope.row.dealType==1" key="222">{{$t('message.systemForce')}}</span>
              <span v-if="scope.row.dealType==2" key="333">{{$t('message.endForce')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="receiveItem=='audit'||receiveItem=='audit_big'||receiveItem=='audit_special'" key="audit">
      <el-col>
        <el-table :data="auditData" size='mini' :border="false" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)" height='55vh'>
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column :label="$t('message.memberAccount')" align="center" prop="account"></el-table-column>
          <el-table-column :label="$t('message.memberName')" align="center" prop="name"></el-table-column>
          <el-table-column :label="$t('message.entrust_num')" align="center" prop="orderNum"></el-table-column>
          <el-table-column :label="$t('l.wtsj')" align="center" prop="auditTime"></el-table-column>
          <el-table-column :label="$t('message.entrust_type')" align="center" prop="auditType"></el-table-column>
          <el-table-column :label="$t('message.productName')" align="center" prop="productName"></el-table-column>
          <el-table-column :label="$t('l.jcpc')" align="center" prop="keepClose"></el-table-column>
          <el-table-column :label="$t('l.mmfx')" align="center" prop="direction"></el-table-column>
          <el-table-column :label="$t('l.wtsl')" align="center" prop="auditNum"></el-table-column>
          <el-table-column :label="$t('message.member_diff')" align="center" prop="spread"></el-table-column>
          <el-table-column :label="$t('l.wtj')" align="center" prop="auditPrice"></el-table-column>
          <el-table-column :label="$t('l.zsj')" align="center" prop="loss"></el-table-column>
          <el-table-column :label="$t('l.zyj')" align="center" prop="profit"></el-table-column>
          <el-table-column :label="$t('l.hysxf')" align="center" prop="memberCharge"></el-table-column>
          <el-table-column :label="$t('message.comPen')" align="center" prop="company" width="110"></el-table-column>
          <el-table-column :label="$t('message.comCharge')" align="center" prop="companyCharge" width="110"></el-table-column>
          <el-table-column :label="$t('message.pattern')" align="center" prop="auditType"></el-table-column>
          <el-table-column :label="$t('message.audit')" align="center" fixed='right'>
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="productClose(scope.row)">通过/不通过</el-button> -->
              <el-dropdown @command="command=>operate(command,scope.row)">
                <span class="el-dropdown-link">
                  <i class="fa fa-chevron-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">
                    {{$t('message.pass')}}
                  </el-dropdown-item>
                  <el-dropdown-item command="0">
                    {{$t('message.refuse')}}
                  </el-dropdown-item>
                  <el-dropdown-item command="2">
                    {{$t('message.update')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="flex center">
      <el-pagination layout="prev,pager,next" @current-change="pageChange" :current-page.sync="page.current" :page-size="20" :total="page.total*20"></el-pagination>
    </div>
    <el-dialog title="强平操作" :visible="equalSwitch" :before-close="equalClose" width="80%">
      <el-row>
        <el-col>
          <el-form size="mini" :inline="true" :model="formForce" :rules="forceRule" ref="forceForm">
            <el-form-item label="会员帐号">
              <el-input :readonly="true" size="mini" v-model="formForce.account"></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input :readonly="true" size="mini" v-model="formForce.name"></el-input>
            </el-form-item>
            <el-form-item label="强平价格" prop="forcePrice">
              <el-input size="mini" v-model="formForce.forcePrice"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="dealData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="持货单号" align="center" prop="orderNum"></el-table-column>
            <el-table-column label="持仓时间" align="center" prop="keepTime"></el-table-column>
            <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
            <el-table-column label="买卖方向" align="center" prop="direction"></el-table-column>
            <el-table-column label="持仓数量" align="center" prop="keepNum"></el-table-column>
            <el-table-column label="止损价" align="center" prop="loss"></el-table-column>
            <el-table-column label="止盈价" align="center" prop="profit"></el-table-column>
            <el-table-column label="建仓价" align="center" prop="openPrice"></el-table-column>
            <el-table-column label="持仓价" align="center" prop="closePrice"></el-table-column>
            <el-table-column label="当前价" align="center" prop="currentPrice"></el-table-column>
            <el-table-column label="持有天数" align="center" prop="keepDay"></el-table-column>
            <el-table-column label="浮动盈亏" align="center" prop="float"></el-table-column>
            <el-table-column label="占用保证金" align="center" prop="used"></el-table-column>
            <el-table-column label="公司占成数量" align="center" prop="companyPen" width="110"></el-table-column>
            <el-table-column label="公司占成浮动盈亏" align="center" prop="companyFloat" width="110"></el-table-column>
            <el-table-column label="建仓时间" align="center" prop="openTime"></el-table-column>
            <el-table-column label="强平" align="center">
              <template slot-scope="scope">
                <el-button @click="forceOperate(scope.row)" size="mini">强平</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="equalClose">取消</el-button>
        <!-- <el-button size="mini">确认</el-button> -->
      </span>
    </el-dialog>
    <el-dialog title="补仓操作" :visible="raplSwitch" :before-close="raplClose">
      <el-form :inline="true" :model="formRapl" :rules="raplRule" label-width="100px" ref="formRapl">
        <el-form-item label="会员帐号">
          <el-input :readonly="true" size="mini" v-model="formRapl.account"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名">
          <el-input :readonly="true" size="mini" v-model="formRapl.name"></el-input>
        </el-form-item>
        <el-form-item label="补仓金额" prop='repair_amount'>
          <el-input size="mini" v-model="formRapl.repair_amount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="raplClose">取消</el-button>
        <el-button size="mini" @click="raplSubmit">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="委托审核" :visible="entrustSwitch" :before-close="()=>entrustSwitch=false">
      <el-row>
        <el-col>
          <el-form size="mini" :inline="true" :model="formAudit" ref="auditForm">
            <el-form-item label="会员帐号">
              <el-input :readonly="true" v-model="formAudit.account"></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input :readonly="true" v-model="formAudit.name"></el-input>
            </el-form-item>
            <el-form-item label="委托数量">
              <el-input v-model="formAudit.auditNum"></el-input>
            </el-form-item>
            <el-form-item label="委托价格">
              <el-input v-model="formAudit.auditPrice"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="entrustSwitch=false">取消</el-button>
        <el-button size="mini" @click="entrustHandler">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="点差修改" :visible="updateSwitch" :before-close="()=>updateSwitch=false">
      <el-row>
        <el-col>
          <!--  label-width="80px" -->
          <el-form :model="formUpdate" size="mini" :inline="true" label-width="70px">
            <el-form-item label="会员帐号">
              <el-input v-model="formUpdate.account" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input v-model="formUpdate.name" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="点差">
              <el-input v-model="formUpdate.spread"></el-input>
            </el-form-item>
            <el-form-item label="权限">
              <el-checkbox-group v-model="updateAuth">
                <el-checkbox v-for="item in forbid" :key="item.value" :label="item.value">{{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateSwitch=false">取消</el-button>
        <!-- 点差修改确认 请求index.php?r=btc/received/edit-order-diff -->
        <el-button size="mini" @click="updateOrderDiff">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Row,
  Col,
  Form,
  FormItem,
  Button,
  Loading,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Message,
  MessageBox,
  BreadcrumbItem
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Pagination);

import { getUserInfo } from "@/utils/apiUtils";

export default {
  name: "ReceiveTable",
  props: {
    receiveItem: {
      type: String,
      default: "member"
    },
    formReceive: {
      type: Object
    }
  },
  data() {
    return {
      msg: "table",
      loading: false,
      equalSwitch: false,
      raplSwitch: false,
      entrustSwitch: false,
      updateSwitch: false,
      updateAuth: [],
      page: {
        current: 1,
        total: 1
      },
      formForce: {
        account: "",
        name: "",
        forcePrice: ""
      },
      formRapl: {
        user_id: "",
        account: "",
        name: "",
        repair_amount: ""
      },
      formAudit: {
        account: "",
        name: "",
        auditNum: "",
        auditPrice: "",
        order_id: ""
      },
      formUpdate: {
        account: "",
        name: "",
        spread: "",
        auth: ""
      },
      forbid: [
        { label: "禁止买", value: "buy" },
        { label: "禁止卖", value: "sale" }
      ],
      memberMoney: [],
      netData: [],
      productDetail: [
        // {
        //   account: "a002",
        //   name: "张三",
        //   orderNum: "t151010101",
        //   keepTime: " item.entrusted_times",
        //   productName: "BTC",
        //   direction: "买",
        //   keepNum: "1",
        //   loos: "2",
        //   profit: "3",
        //   openPrice: "1000",
        //   currentPrice: "0.1",
        //   keepDay: "1",
        //   float: "item.float_win_loss",
        //   used: "item.used_deposit_amount",
        //   company: "100",
        //   companyFloat: "101",
        //   openTime: " item.order_date"
        // }
      ],
      dealData: [],
      auditData: [],
      equalData: [],
      raplRule: {
        repair_amount: [
          {
            required: true,
            message: "补仓价格必填",
            trigger: "blur"
          }
        ]
      },
      forceRule: {
        forcePrice: [
          {
            required: true,
            message: "强平价格必填",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (Number(this.formForce.forcePrice) < 0) {
                Message({
                  center: true,
                  message: "强平价格不能为负数",
                  type: "error"
                });
                // callback();
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    receiveItem: function(val) {
      // console.log(val);
      if (val === "audit") {
        this.initAudit({ size: 1 });
      }
      if (val === "audit_big") {
        this.initAudit({ size: 2 });
      }
      if (val === "audit_special") {
        this.initAudit({ size: 3 });
      }
      if (val === "deal") {
        this.initDeal({});
      }
      if (val === "net_cash") {
        this.initNet({ type: 1 });
      }
      if (val === "net_credit") {
        this.initNet({ type: 0 });
      }
      if (val === "member") {
        this.initList({});
      }
    }
  },
  computed: {
    level() {
      return (
        Number(this.$store.state.user.level) ||
        Number(JSON.parse(sessionStorage.getItem("user")).level)
      );
    }
  },
  created() {
    this.initList({});
  },
  mounted() {
    // setTimeout(() => {
    //   this.$emit("update:receiveItem", "audit");
    // }, 3000);
  },
  methods: {
    operate(e, scope) {
      // console.log(e, scope);
      switch (e) {
        case "0":
          const arg = {
            order_id: scope.order_id,
            status: 0
          };
          // console.log(arg);
          this.$store.dispatch("review", arg).then(res => {
            if (res.data.status == 1) {
              Message({
                type: "success",
                center: true,
                message: "操作成功"
                // onClose: () => {
                //   this.equalSwitch = false;
                // }
              });
            }
          });
          break;
        case "1":
          this.entrustSwitch = true;
          Object.assign(this.formAudit, scope);
          // console.log(scope);
          // this.formAudit.account = scope.account;
          // this.formAudit.name = scope.name;
          // this.formAudit.entNum = scope.auditNum;
          // this.formAudit.entPrice = scope.auditPrice;
          break;
        case "2":
          Object.assign(this.formUpdate, scope);
          this.updateSwitch = true;
          break;
        default:
      }
    },
    productClose(e) {
      // console.log(e);
    },
    forceOperate(e) {
      // console.log(e);
      this.$refs.forceForm.validate(valid => {
        if (valid) {
          const arg = {
            order_id: e.order_id,
            close_number: e.keepNum,
            close_price: this.formForce.forcePrice
          };
          MessageBox({
            title: "提示",
            message: "你将执行强平操作，无法撤销，是否确认",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            callback: (action, instance) => {
              // console.log(action);
              if (action == "confirm") {
                this.$store.dispatch("forceClose", arg).then(res => {
                  // console.log(res);
                  if (res.data.status == 1) {
                    Message({
                      type: "success",
                      center: true,
                      message: "操作成功",
                      onClose: () => {
                        this.equalSwitch = false;
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    },
    entrustHandler() {
      const arg = {
        order_id: this.formAudit.order_id,
        entrusted_price: this.formAudit.auditPrice,
        entrusted_number: this.formAudit.auditNum,
        review_status: 1
      };
      this.$store.dispatch("review", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          Message({
            type: "success",
            center: true,
            message: "操作成功",
            onClose: () => {
              this.entrustSwitch = false;
            }
          });
        }
      });
    },
    // 点差修改
    updateOrderDiff() {
      const arg = {
        user_id: this.formUpdate.user_id,
        order_diff: this.formUpdate.spread,
        buy: this.updateAuth.some(item => {
          return item == "buy";
        })
          ? 0
          : 1,
        sale: this.updateAuth.some(item => {
          return item == "sale";
        })
          ? 0
          : 1
      };
      // console.log(arg);
      this.$store.dispatch("updateSpread", arg).then(res => {
        if (res.data.status == 1) {
          Message({
            type: "success",
            center: true,
            message: "操作成功",
            onClose: () => {
              this.updateSwitch = false;
            }
          });
        }
      });
    },
    equalHandle(e) {
      // console.log(e);
      this.formForce.account = e.account;
      this.formForce.name = e.name;
      this.$store
        .dispatch("memberNet", {
          user_id: e.id,
          ofield: "id"
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.loading = false; //关闭loading;
            this.dealData = [];
            // this.page = res.data.data.page;
            const data = res.data.data.list;
            data.forEach(item => {
              this.dealData.push({
                account: item.user_account,
                name: item.user_name,
                orderNum: item.order_number,
                keepTime: item.entrusted_times,
                productName: item.product_name,
                direction: item.order_direction > 0 ? "买入" : "卖出",
                keepNum: item.holding_number,
                loss: item.stop_loss_limit,
                profit: item.stop_profit_limit,
                openPrice: item.open_price,
                closePrice: item.hold_price,
                currentPrice: item.current_price,
                keepDay: item.hold_days,
                float: item.float_win_loss,
                used: item.used_deposit_amount,
                companyPen: item.share_amount_num,
                companyFloat: item.share_float_win_loss,
                openTime: item.order_date,
                order_id: item.order_id
              });
            });
          }
        });
      this.equalSwitch = true;
    },
    equalClose() {
      this.$refs["forceForm"].resetFields();
      this.equalSwitch = false;
    },
    raplHandle(e) {
      this.raplSwitch = true;
      this.formRapl.account = e.account;
      this.formRapl.name = e.name;
      this.formRapl.user_id = e.id;
    },
    raplSubmit(e) {
      this.$refs["formRapl"].validate(valid => {
        if (valid) {
          const arg = {
            user_id: this.formRapl.user_id,
            repair_amount: this.formRapl.repair_amount
          };
          this.$store.dispatch("rapl", arg).then(res => {
            if (res.data.status == 1) {
              Message({
                type: "success",
                message: "补仓成功",
                onClose: () => {
                  this.raplSwitch = false;
                }
              });
            }
          });
        }
      });
    },
    raplClose() {
      this.raplSwitch = false;
    },
    pageChange(e) {
      switch (this.receiveItem) {
        case "audit":
          this.initAudit({ size: 1, page: e });
          break;
        case "audit_big":
          this.initAudit({ size: 2, page: e });
          break;
        case "audit_special":
          this.initAudit({ size: 3, page: e });
          break;
        case "deal":
          // this.initDeal({ page: e });
          break;
        case "net_cash":
          this.initNet({ type: 1, page: e });
          break;
        case "net_credit":
          this.initNet({ type: 0, page: e });
          break;
        case "member":
          this.initList({ page: e });
          break;
        default:
      }
    },
    viewUser(e) {
      // console.log(e);
    },
    search(e) {
      // console.log(this.formReceive);
    },
    initNet(arg) {
      this.$store.dispatch("netSearch", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          this.loading = false;
          Object.assign(this.page, res.data.data.page);
          const data = res.data.data.list;
          this.netData = [];
          data.forEach(item => {
            this.netData.push({
              name: item.product_name,
              buy: item.buy_price,
              spread: item.order_diff,
              sale: item.sale_price,
              refer: item.current_price,
              buyNum: item.buy_total_num,
              saleNum: item.sale_total_num,
              what: item.buy_sale_diff_num,
              max_keep: item.max_net_limit
            });
          });
        }
      });
    },
    initDeal(arg) {
      this.$store.dispatch("memberDeal", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          Object.assign(this.page, res.data.data.page);
          this.loading = false;
          const data = res.data.data.list;
          this.dealData = [];
          data.forEach(item => {
            this.dealData.push({
              account: item.user_account,
              name: item.user_name,
              orderNum: item.order_number,
              keepNum: item.hold_order_number,
              dealTime: item.order_times,
              productName: item.product_name,
              keepClose: item.order_type ? "平仓" : "建仓",
              direction: item.order_direction > 0 ? "买入" : "卖出",
              dealNum: item.deal_number,
              dealPrice: item.deal_price,
              openPrice: item.open_price,
              keepPrice: item.hold_price,
              closePrice: item.close_price,
              profit: item.win_loss_amount,
              memberCharge: item.service_fee,
              memberNight: item.overnight_fee,
              companyPen: item.share_amount_num,
              companyProfit: item.share_win_loss,
              companyCharge: item.share_service_fee,
              companyNight: item.share_overnight_fee,
              dealType: item.deal_type
              ////成交类型（0：用户委托，1：系统强制平仓，2：后台强制平仓）
            });
          });
        }
      });
    },
    initAudit(arg) {
      this.$store.dispatch("entrust", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          Object.assign(this.page, res.data.data.page);
          this.loading = false; //关闭loading
          const data = res.data.data.list;
          this.auditData = [];
          data.forEach(item => {
            this.auditData.push({
              account: item.user_account,
              name: item.user_name,
              orderNum: item.order_number,
              auditTime: item.order_date,
              auditType: item.entrusted_type ? "限价委托" : "市场委托",
              productName: item.product_name,
              keepClose: item.order_type ? "平仓" : "建仓",
              direction: item.order_direction > 0 ? "买入" : "卖出",
              auditNum: item.entrusted_number,
              spread: item.accept_change_range,
              auditPrice: item.entrusted_price,
              loss: item.stop_loss_limit,
              profit: item.stop_profit_limit,
              memberCharge: item.service_fee,
              company: item.share_amount_num,
              companyCharge: item.share_service_fee,
              auditType: item.account_type ? "现金" : "信用",
              order_id: item.order_id,
              user_id: item.user_id
            });
          });
        }
      });
    },
    initList(arg) {
      const user = getUserInfo();
      this.loading = true;
      //  account: user.user_name
      this.$store.dispatch("memberMoney", arg).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          this.loading = false; //关闭loading
          Object.assign(this.page, res.data.data.page);
          this.memberMoney = [];
          this.page = res.data.data.page;
          const data = res.data.data.list;
          data.forEach((item, index) => {
            this.memberMoney.push({
              account: item.user_account,
              name: item.user_name,
              risk: item.risk_num + "%",
              float: item.float_win_loss,
              property: item.current_balance,
              cash: item.avail_deposit_amount,
              id: item.user_id
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.receive-table {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
