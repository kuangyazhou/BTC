<template>
  <div class="common-proxy">
    <el-dialog :title="status+title" top="1vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="visible" width="90%" :before-close="handleClose">
      <!--  -->
      <el-form label-width="100px" :inline="true" :rules="rules" ref="form" size="mini" :model="form">
        <el-row>
          <el-col :span="6">
            <el-form-item :label="title+'帐号'" prop="account">
              <el-input v-model="form.account" name="username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="title+'名称'" prop="name">
              <el-input v-model="form.name" name="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" name="pwd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="form.repassword" name="confirm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="建仓手续费" prop="open_fee">
              <el-input v-model="form.open_service_fee_percentage" name="open_charge">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平仓手续费" prop="close_fee">
              <el-input v-model="form.close_service_fee_percentage" name="charge">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品报价点差" prop="order_diff">
              <el-input v-model="form.order_diff"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大会员数" prop="max_member">
              <el-input v-model="form.max_member_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" v-if="showType">
            <el-form-item style="width:100%" label="现金or信用" prop="crash">
              <el-select size="mini" @change="crashCredit" v-model="form.account_type" :disabled="viewLevel!=1" style="width:92%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用额度" prop="credit">
              <el-input v-model="form.credit" name="limit" :disabled="form.account_type==1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="title+'及下级占成总数'" prop="share_sum" label-width="60%;">
              <!-- <el-input name="total" v-model="form.share_sum"></el-input> -->
              <el-select v-model="form.share_sum">
                <el-option v-if="item.value<=form.share_sum" v-for="item in share_sum" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" v-if="viewLevel>1">
            <el-form-item label="代理斩仓" prop='force'>
              <el-input></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row v-if="viewLevel==5&&!form.account_type">
          <el-col :span="6">
            <el-form-item label="验证码" prop='code'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-table :data="frozenData" :border="false" size="mini">
              <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
              <el-table-column align="center" label="单笔占用保证金" prop="cashUsed">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.deposit_used_percentage">
                    <el-option v-if="item.value>=form.deposit_used_percentage" v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单笔冻结保证金" prop="frozenCash">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.deposit_frozen_percentage">
                    <el-option v-if="item.value>=form.deposit_frozen_percentage" v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6" :offset="1" v-if="viewLevel==1">
            <el-table :data="frozenData" :border="false" size="mini">
              <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
              <el-table-column align="center" label="点差返佣">
                <template slot-scope="scope">
                  <!-- <el-input size="mini" v-model="reBateModel"></el-input> -->
                  <el-select size="mini" v-model="form.order_diff_dicount_percentage">
                    <el-option v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col style="margin-top:0.5em;">
            <el-table :data="productData" :border="false" size="mini" style="width: 90%">
              <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
              <el-table-column align="center" label="单笔最小交易量">
                <template slot-scope="scope">
                  <el-form-item prop="min_transaction">
                    <el-input v-model="form.single_min_transaction" size="mini"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单笔最大交易量">
                <template slot-scope="scope">
                  <el-form-item prop="max_transaction">
                    <el-input v-model="form.single_max_transaction" size="mini"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="最大买持货量">
                <template slot-scope="scope">
                  <el-form-item prop="max_buy">
                    <el-input v-model="form.max_buy_limit" size="mini"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="最大卖持货量">
                <template slot-scope="scope">
                  <el-form-item prop="max_sale">
                    <el-input v-model="form.max_sale_limit" size="mini"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="最大净持货量">
                <template slot-scope="scope">
                  <el-form-item prop="max_net">
                    <el-input v-model="form.max_net_limit" size="mini"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col style="margin-top:0.5em">
            <!-- 表头合并后,hover颜色永久存在 -->
            <el-table :data="wareData" :border="false" size="mini" style="width: 100%">
              <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
              <el-table-column align="center" label="显示权限">
                <template slot-scope="scope">
                  <!-- :disabled="Boolean(form.creditLimit.showLimit)" -->
                  <el-select size="mini" v-model="form.showLimit">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="建仓">
                <el-table-column align="center" label="挂单买入">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.open_order_buy" :disabled="formLimit.open_order_buy==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="挂单卖出">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.open_order_sale" :disabled="formLimit.open_order_sale==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="挂单撤销">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.open_order_undo" :disabled="formLimit.open_order_undo==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="平仓">
                <el-table-column align="center" label="挂单买入">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.close_order_buy" :disabled="formLimit.close_order_buy==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="挂单卖出">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.close_order_sale" :disabled="formLimit.close_order_sale==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="挂单撤销">
                  <template slot-scope="scope">
                    <el-select size="mini" v-model="form.close_order_undo" :disabled="formLimit.close_order_undo==0">
                      <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- $emit('dialogClose') -->
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <!--  native-type="submit" -->
        <el-button size="mini" type="primary" native-type="submit" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="出入金" :close-on-press-escape="false" :before-close="comeinClose" :close-on-click-modal="false" :visible.sync="comeinSwitch">
      <div class="base-info">基础信息</div>
      <el-form label-width="120px" :inline="true" ref="comein" size="mini" :model="comein">
        <el-row>
          <el-col :span=12>
            <el-form-item label="调整类型:" prop="types">
              <el-select size="mini" v-model="comein.type">
                <el-option v-for="item in changeType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="调整额度" prop="updateLimit">
              <el-input type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="信用余额:" prop="balance">
              <el-input v-model="comein.balance" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="选择上级代理商" :visible.sync="proxyOn" :before-close="()=>{$emit('proxyClose',true);parent_id=''}">
      <el-row type="flex" justify="space-around">
        <el-col>
          <el-select v-model="parent_id" size="mini">
            <el-option-group v-for="group in preList" :key="group.level" :label="mapData[group.level]">
              <el-option v-for="item in group.accounts" :key="item.user_id" :label="item.account" :value="item.user_id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-col>
        <el-col>
          <el-button size="mini" @click="parentConfrim">确定</el-button>
        </el-col>
      </el-row>
      <!-- </el-form-item> -->
      <!-- </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  Dialog,
  Radio,
  Tag,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  name: "AccountDialog",
  data() {
    const empty = {
      formError: null,
      account: null,
      name: null,
      password: "",
      repassword: "",
      account_type: 0,
      credit: null,
      open_service_fee_percentage: null,
      close_service_fee_percentage: null,
      order_diff: null,
      close_order_buy: null,
      close_order_sale: null,
      close_order_undo: null,
      share_sum: null,
      close_service_fee_percentage: null,
      deposit_frozen_percentage: null,
      deposit_used_percentage: null,
      max_buy_limit: null,
      max_net_limit: null,
      max_sale_limit: null,
      open_order_buy: null,
      open_order_sale: null,
      open_order_undo: null,
      open_service_fee_percentage: null,
      order_diff: null,
      single_max_transaction: null,
      single_min_transaction: null,
      max_member_number: null,
      order_diff_dicount_percentage: 0,
      showLimit: 1
    };
    return {
      comeinSwitch: false,
      onProxySwitch: false,
      pwdRequire: false,
      patyType: "1",
      reBateModel: 10,
      parent_id: "",
      user_id: "",
      frozen: [],
      share_sum: [],
      comein: {
        type: "1",
        balance: "1000"
      },
      options: [
        {
          value: 0,
          label: this.$t("message.credit")
        },
        {
          value: 1,
          label: this.$t("message.cash")
        }
      ],
      mapData: {
        1: "一级代理",
        2: "二级代理",
        3: "三级代理",
        4: "四级代理",
        5: "五级代理"
      },
      limits: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      changeType: [
        {
          value: "1",
          label: "额度"
        },
        {
          value: "2",
          label: "费率"
        }
      ],
      frozenData: [
        {
          productName: "比特币"
        }
      ],

      wareData: [
        // {
        //   productName: "比特币"
        // },
        {
          productName: "比特币"
        }
      ],
      productData: [
        {
          productName: "比特币",
          minDeal: "1",
          maxDeal: "100",
          maxKeep: "500",
          maxSale: "800",
          maxRemain: "600"
        }
      ],
      rules: {
        repassword: [
          {
            required: true,
            message: this.$t("message.emptyPwd"),
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.form.password != this.form.repassword) {
                this.formMsg("err_pwd_diff");
                callback();
              } else {
                callback();
              }
            }
          }
        ],
        // credit: [
        //   {
        //     required: true,
        //     message: this.$t("message.emptyCredit"),
        //     trigger: "blur"
        //   }
        // ],
        open_fee: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.open_service_fee_percentage,
                  this.formLimit.min_open_service_fee_percentage,
                  this.formLimit.max_open_service_fee_percentage
                )
              ) {
                this.formMsg("err_open_fee");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        close_fee: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.close_service_fee_percentage,
                  this.formLimit.min_close_service_fee_percentage,
                  this.formLimit.max_close_service_fee_percentage
                )
              ) {
                this.formMsg("err_close_fee");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        order_diff: [
          {
            validator: (rule, value, callback) => {
              if (
                Number(this.form.order_diff) <
                Number(this.formLimit.min_order_diff)
              ) {
                this.formMsg("err_order_diff");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        credit: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.credit,
                  this.formLimit.min_credit,
                  this.formLimit.max_credit
                )
              ) {
                this.formMsg("err_credit");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur",
            required: true
          }
        ],
        share_sum: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.share_sum,
                  this.formLimit.min_share_sum,
                  this.formLimit.max_share_sum
                )
              ) {
                this.formMsg("err_share_sum");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        min_transaction: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.single_min_transaction,
                  this.formLimit.min_single_min_transaction,
                  this.formLimit.max_single_min_transaction
                )
              ) {
                this.formMsg("err_min_transaction");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        max_transaction: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.single_max_transaction,
                  this.formLimit.min_single_max_transaction,
                  this.formLimit.max_single_max_transaction
                )
              ) {
                this.formMsg("err_max_transaction");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        max_buy: [
          {
            validator: (rule, value, callback) => {
              // console.log(this.form.single_min_transaction);
              if (
                !this.inRange(
                  this.form.max_buy_limit,
                  this.formLimit.min_max_buy_limit,
                  this.formLimit.max_max_buy_limit
                )
              ) {
                this.formMsg("err_max_buy");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        max_sale: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.max_sale_limit,
                  this.formLimit.min_max_sale_limit,
                  this.formLimit.max_max_sale_limit
                )
              ) {
                this.formMsg("err_max_sale");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        max_net: [
          {
            validator: (rule, value, callback) => {
              if (
                !this.inRange(
                  this.form.max_net_limit,
                  this.formLimit.min_max_net_limit,
                  this.formLimit.max_max_net_limit
                )
              ) {
                this.formMsg("err_max_net");
                callback();
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      form: {
        formError: null,
        account: null,
        name: null,
        password: "",
        repassword: "",
        account_type: 0,
        credit: null,
        open_service_fee_percentage: null,
        close_service_fee_percentage: null,
        order_diff: null,
        close_order_buy: null,
        close_order_sale: null,
        close_order_undo: null,
        share_sum: null,
        close_service_fee_percentage: null,
        deposit_frozen_percentage: null,
        deposit_used_percentage: null,
        max_buy_limit: null,
        max_net_limit: null,
        max_sale_limit: null,
        open_order_buy: null,
        open_order_sale: null,
        open_order_undo: null,
        open_service_fee_percentage: null,
        order_diff: null,
        single_max_transaction: null,
        single_min_transaction: null,
        max_member_number: null,
        order_diff_dicount_percentage: 0,
        showLimit: 1
      },
      cashForm: {},
      creditForm: {},
      formLimit: {
        close_order_buy: null,
        close_order_sale: null,
        close_order_undo: null,
        max_close_service_fee_percentage: null,
        max_credit: null,
        max_deposit_frozen_percentage: null,
        max_deposit_used_percentage: null,
        max_max_buy_limit: null,
        max_max_net_limit: null,
        max_max_sale_limit: null,
        max_open_service_fee_percentage: null,
        max_share_sum: null,
        max_single_max_transaction: null,
        max_single_min_transaction: null,
        max_win_loss_limit: null,
        min_close_service_fee_percentage: null,
        min_credit: null,
        min_deposit_frozen_percentage: null,
        min_deposit_used_percentage: null,
        min_max_buy_limit: null,
        min_max_net_limit: null,
        min_max_sale_limit: null,
        min_open_service_fee_percentage: null,
        min_order_diff: null,
        min_share_sum: null,
        min_single_max_transaction: null,
        min_single_min_transaction: null,
        min_win_loss_limit: null,
        open_order_buy: null,
        open_order_sale: null,
        open_order_undo: null
      },
      cashLimit: {},
      creditLimit: {}
    };
  },
  props: {
    // level: {
    //   type: Number
    // },
    viewLevel: {
      type: Number,
      default: 1
    },
    showType: {
      type: Boolean,
      default: true
    },
    proxyOn: {
      type: Boolean,
      default: false
    },
    preList: {
      type: Array,
      // default: () => {
      //   return [];
      // }
      default: () => []
    },
    status: {
      type: String,
      default: "新增"
    },
    title: {
      type: String,
      default: "一级"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // title() {
    //   return this.mapData[this.viewLevel.toString()];
    // }
  },
  watch: {
    showType: function(val) {
      if (!val) {
        this.rules.repassword[0].required = val;
      } else {
        this.rules.repassword[0].required = true;
      }
    }
  },
  created() {
    for (let i = 1; i <= 10; i++) {
      this.frozen.push({
        value: i * 10,
        label: i * 10 + "%"
      });
    }
    for (let i = 20; i >= 0; i--) {
      this.share_sum.push({
        value: i * 5,
        label: i * 5 + "%"
      });
    }
  },
  mounted() {},
  methods: {
    parentConfrim() {
      if (!this.parent_id) return;
      this.$emit("proxyClose");
      this.addInit({}, "add");
    },
    handleClose(done) {
      this.$emit("dialogClose");
      // Object.assign(this.form, empty);
      this.$refs.form.resetFields(); // 此方法清空表单失败了 fuck
    },
    comeinClose(done) {
      this.comeinSwitch = false;
      this.$refs["comein"].resetFields();
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.viewLevel == 1) {
            this.$store.dispatch("SAVEAGENT", this.form).then(e => {
              this.msg(e);
              this.$emit("initList"); //刷新list
            });
          } else {
            this.$store
              .dispatch(
                "SAVENEXT",
                Object.assign(this.form, {
                  parent_id: this.parent_id,
                  level: this.viewLevel,
                  user_id: this.user_id
                })
              )
              .then(e => {
                this.msg(e);
                // this.$emit("initList"); //刷新list
              });
          }
        }
      });
    },
    addInit(account = {}, type) {
      account.id ? (this.user_id = Number(account.id)) : null;
      //   console.log(account.id, type, this.viewLevel);
      if (this.viewLevel == 1 && type == "add") {
        // 新增一级代理
        this.addTopAgent();
      }
      if (this.viewLevel == 1 && type == "update") {
        let arg = {
          user_id: this.user_id
        };
        this.modifTopAgent(arg);
      }
      if (this.viewLevel > 1 && type == "add") {
        // 新增修改下级代理
        let arg = {
          level: this.viewLevel,
          parent_id: this.parent_id || account.parent_id
        };
        this.addAndUpdate(arg);
      }
      if (this.viewLevel > 1 && type == "update") {
        // 新增修改下级代理
        let arg = {
          level: this.viewLevel,
          parent_id: this.parent_id || account.parent_id,
          user_id: this.user_id
        };
        this.addAndUpdate(arg);
      }
    },
    addTopAgent() {
      this.$store.dispatch("addTopAgent").then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          Object.assign(this.cashForm, data.user_cash); //现金默认值
          Object.assign(this.cashLimit, data.user_cash_limit); //现金限制条件
          Object.assign(this.creditForm, data.user_credit); //信用默认值
          Object.assign(this.creditLimit, data.user_credit_limit); //信用限制条件
          Object.assign(this.form, this.creditForm); //默认使用信用模式
          Object.assign(this.formLimit, this.creditLimit); //信用模式限制条件
          this.form.credit = this.formLimit.max_credit;
          // this.form.share_sum = this.formLimit.max_share_sum;
        }
      });
    },
    modifTopAgent(arg) {
      this.$store.dispatch("MODIFYTOPAGENT", arg).then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          Object.assign(this.form, data.user);
          Object.assign(this.formLimit, data.user_limit);
          this.form.credit = this.formLimit.max_credit;
          // this.form.share_sum = this.formLimit.max_share_sum;
        }
      });
    },
    addAndUpdate(arg) {
      this.$store.dispatch("EDITNEXT", arg).then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          Object.assign(this.form, data.user);
          Object.assign(this.formLimit, data.user_limit);
          this.form.credit = this.formLimit.max_credit;
          // this.form.share_sum = this.formLimit.max_share_sum;
        }
      });
    },
    formMsg(e) {
      Message({
        center: true,
        message: this.$t(`message.${e}`),
        duration: 1200,
        type: "error"
      });
    },
    inRange(val, min, max) {
      if (Number(val) >= Number(min) && Number(val) <= Number(max)) {
        return true;
      } else {
        return false;
      }
    },
    msg(e) {
      if (e.data.status == 1) {
        Message({
          center: true,
          message: this.$t("message.saveSuccess"),
          duration: 1500,
          type: "success",
          onClose: () => {
            this.$emit("dialogClose");
          }
        });
      }
    },
    crashCredit(e) {
      if (e) {
        Object.assign(this.form, this.cashForm);
        Object.assign(this.formLimit, this.cashLimit);
        this.form.credit = this.formLimit.max_credit;
        this.form.share_sum = this.formLimit.max_share_sum;
      } else {
        Object.assign(this.form, this.creditForm);
        Object.assign(this.formLimit, this.creditLimit);
        this.form.credit = this.formLimit.max_credit;
        this.form.share_sum = this.formLimit.max_share_sum;
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1em;
  border-bottom: 1px solid #999;
}
</style>