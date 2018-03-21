<template>
  <div class="common-proxy">
    <el-dialog :title="status+title" top="1vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="visible" width="90%" :before-close="handleClose">
      <el-form label-width="100px" :inline="true" ref="form" size="mini" :rules="rules" :model="form">
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
            <el-form-item label="确认密码" prop="confirm">
              <el-input type="password" v-model="form.confirm" name="confirm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" v-if="showType">
            <el-form-item style="width:100%" label="现金or信用" prop="crash">
              <el-select size="mini" @change="crashCredit" v-model="form.type" style="width:92%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="title+'及下级占成总数'" prop="total">
              <el-input :max="range.max_share_sum" :min="range.min_share_sum" v-model="form.total" name="total"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用额度" prop="limit">
              <el-input v-model="form.limit" :max="range.max_credit" :min="range.min_credit" name="belive"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="建仓手续费" prop="open_fee">
              <el-input :max="range.max_open_service_fee_percentage" :min="range.min_open_service_fee_percentage" v-model="form.open_fee" name="open_charge">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平仓手续费" prop="close_fee">
              <el-input :max="range.max_close_service_fee_percentage" :min="range.min_close_service_fee_percentage" v-model="form.close_fee" name="charge">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品报价点差" prop="order_diff">
              <el-input max="1000" :min="range.min_order_diff" v-model="form.order_diff"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="6">
          <el-table :data="frozenData" :border="false" size="mini">
            <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
            <el-table-column align="center" label="单笔冻结保证金">
              <template slot-scope="scope">
                <el-select size="mini" v-model="form.credit.deposit_frozen_percentage">
                  <el-option v-if="item.value>=frozenModel" v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-table :data="frozenData" :border="false" size="mini">
            <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
            <el-table-column align="center" label="点差返佣">
              <template slot-scope="scope">
                <!-- <el-input size="mini" v-model="reBateModel"></el-input> -->
                <el-select size="mini" v-model="reBateModel">
                  <el-option v-if="item.value>=reBateModel" v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col style="margin-top:0.5em;">
          <el-table :data="productData" :border="false" size="mini" style="width: 60%">
            <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
            <el-table-column align="center" label="单笔最小交易量">
              <template slot-scope="scope">
                <el-input :max="range.min_single_max_transaction" :min="range.min_single_min_transaction" v-model="form.credit.single_min_transaction" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单笔最大交易量">
              <template slot-scope="scope">
                <el-input :max="range.max_single_max_transaction" :min="range.max_single_min_transaction" v-model="form.credit.single_max_transaction" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="最大买持货量">
              <template slot-scope="scope">
                <el-input :max="range.max_max_buy_limit" v-model="form.credit.max_buy_limit" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="最大卖持货量">
              <template slot-scope="scope">
                <el-input :max="range.max_max_sale_limit" :min="range.min_max_sale_limit" v-model="form.credit.max_sale_limit" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="最大净持货量">
              <template slot-scope="scope">
                <el-input :max="range.max_max_net_limit" :min="range.min_max_net_limit" v-model="form.credit.max_net_limit" size="mini"></el-input>
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
                <el-select size="mini" v-model="form.credit.showLimit" :disabled="Boolean(form.credit.showLimit)">
                  <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="建仓">
              <el-table-column align="center" label="挂单买入">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.open_order_buy" :disabled="!Boolean(form.credit.open_order_buy)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="挂单卖出">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.open_order_sale" :disabled="!Boolean(form.credit.open_order_sale)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="挂单撤销">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.open_order_undo" :disabled="!Boolean(form.credit.open_order_undo)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="平仓">
              <el-table-column align="center" label="挂单买入">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.close_order_buy" :disabled="!Boolean(form.credit.close_order_buy)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="挂单卖出">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.close_order_sale" :disabled="!Boolean(form.credit.close_order_sale)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="挂单撤销">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="form.credit.close_order_undo" :disabled="!Boolean(form.credit.close_order_undo)">
                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('dialogClose')">取 消</el-button>
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
    <el-dialog title="选择上级代理商" :visible.sync="proxyOn" :before-close="onProxyClose">
      <el-form>
        <el-form-item prop="parent">
          <el-select v-model="parent_id" size="mini">
            <el-option-group v-for="group in preList" :key="group.level" :label="group.level+''">
              <el-option v-for="item in group.accounts" :key="item.user_id" :label="item.account" :value="item.user_id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
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

// 用户状态为现金时，出入金按钮存在，并且可点击

export default {
  name: "AccountDialog",
  data() {
    return {
      comeinSwitch: false,
      onProxySwitch: false,
      patyType: "1",
      reBateModel: 10,
      parent_id: "",
      user_id: "",
      comein: {
        type: "1",
        balance: "1000"
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        limit: [
          { required: true, message: "信用额度不能为空", trigger: "blur" }
        ]
      },
      options: [
        {
          value: 0,
          label: "现金"
        },
        {
          value: 1,
          label: "信用"
        }
      ],
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
      frozenModel: null,
      frozen: [],
      // frozen: [
      //   {
      //     value: 10,
      //     label: "10%"
      //   },
      //   {
      //     value: 20,
      //     label: "20%"
      //   },
      //   {
      //     value: 30,
      //     label: "30%"
      //   }
      // ],
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
      form: {
        formError: null,
        account: "",
        name: "",
        password: "",
        confirm: "",
        type: 1,
        total: "",
        limit: 0,
        open_fee: "",
        close_fee: "",
        order_diff: "",
        crash: {},
        crashLimit: {},
        credit: {
          single_min_transaction: null,
          single_max_transaction: null,
          deposit_frozen_percentage: null,
          max_buy_limit: null,
          max_sale_limit: null,
          max_net_limit: null,
          open_order_buy: null,
          open_order_sale: null,
          open_order_undo: null,
          close_order_buy: null,
          close_order_sale: null,
          close_order_undo: null,
          showLimit: 0
        },
        creditLimit: {},
        temp: {}
      },
      tempRange: {},
      range: {
        min_share_sum: null,
        max_share_sum: null,
        min_credit: null,
        max_credit: null,
        min_max_member_number: null,
        max_max_member_number: null,
        min_order_diff: null,
        min_open_service_fee_percentage: null,
        max_open_service_fee_percentage: null,
        min_close_service_fee_percentage: null,
        max_close_service_fee_percentage: null,
        min_deposit_frozen_percentage: null,
        max_deposit_frozen_percentage: null,
        min_deposit_used_percentage: null,
        max_deposit_used_percentage: null,
        min_single_min_transaction: null,
        max_single_min_transaction: null,
        min_single_max_transaction: null,
        max_single_max_transaction: null,
        min_max_buy_limit: null,
        max_max_buy_limit: null,
        min_max_sale_limit: null,
        max_max_sale_limit: null,
        min_max_net_limit: null,
        max_max_net_limit: null,
        open_order_buy: null,
        open_order_sale: null,
        open_order_undo: null,
        close_order_buy: null,
        close_order_sale: null,
        close_order_undo: null
      }
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
      default: () => {
        return [];
      }
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
  created() {
    for (let i = 1; i < 10; i++) {
      this.frozen.push({
        value: i * 10,
        label: i * 10 + "%"
      });
    }
  },
  mounted() {},
  methods: {
    onProxyClose() {
      if (!this.parent_id) return;
      this.$emit("proxyClose");
      this.addInit({}, "add");
      //   this.parent_id = "";
    },
    handleClose(done) {
      this.$emit("dialogClose");
      this.$refs.form.resetFields();
    },
    comeinClose(done) {
      this.comeinSwitch = false;
      this.$refs["comein"].resetFields();
    },
    onSubmit() {
      let info = {
        account: this.form.account,
        name: this.form.name,
        password: this.form.password,
        repassword: this.form.confirm,
        account_type: this.form.type,
        share_sum: this.form.total,
        credit: this.form.limit,
        win_loss_limit: "",
        open_service_fee_percentage: this.form.open_fee / 100,
        close_service_fee_percentage: this.form.close_fee / 100,
        deposit_frozen_percentage: this.form.credit.deposit_frozen_percentage,
        deposit_used_percentage: this.form.credit.deposit_used_percentage,
        order_diff_dicount_percentage: this.reBateModel,
        single_min_transaction: this.form.credit.single_min_transaction,
        single_max_transaction: this.form.credit.single_max_transaction,
        max_buy_limit: this.form.credit.max_buy_limit,
        max_sale_limit: this.form.credit.max_sale_limit,
        max_net_limit: this.form.credit.max_net_limit,
        open_order_buy: this.form.credit.open_order_buy,
        open_order_sale: this.form.credit.open_order_sale,
        open_order_undo: this.form.credit.open_order_undo,
        close_order_buy: this.form.credit.close_order_buy,
        close_order_sale: this.form.credit.close_order_sale,
        close_order_undo: this.form.credit.close_order_undo,
        order_diff: this.form.order_diff
      };
      if (this.viewLevel == 1) {
        this.$store.dispatch("SAVEAGENT", info).then(e => {
          this.msg(e);
        });
      } else {
        this.$store
          .dispatch(
            "SAVENEXT",
            Object.assign(info, {
              parent_id: this.parent_id,
              level: this.viewLevel,
              user_id: this.user_id
            })
          )
          .then(e => {
            this.msg();
          });
      }
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
      if (this.viewLevel > 1) {
        // 新增修改下级代理
        let arg = {
          level: this.viewLevel,
          parent_id: this.parent_id,
          user_id: this.user_id
        };
        this.addAndUpdate(arg);
      }
    },
    addTopAgent() {
      this.$store.dispatch("addTopAgent").then(res => {
        if (res.status == 200) {
          this.form.credit = res.data.data.user_credit;
          Object.assign(this.form.temp, res.data.data.user_credit);
          //   Object.assign(this.form.temp, res.data.data.user_credit_limit);
          Object.assign(this.form.crash, res.data.data.user_cash);
          //   Object.assign(this.form.crashLimit, res.data.data.user_cash_limit);
          Object.assign(this.form.credit, this.form.temp);
          Object.assign(this.tempRange, res.data.data.user_cash_limit);
          Object.assign(this.range, res.data.data.user_credit_limit);
          this.frozenModel =
            res.data.data.user_credit.deposit_frozen_percentage;
        }
      });
      console.log(this.form);
    },
    modifTopAgent(arg) {
      this.$store.dispatch("MODIFYTOPAGENT", arg).then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          Object.assign(this.form.credit, res.data.data.user);
          this.form.account = data.user.account;
          this.form.open_fee = data.user.open_service_fee_percentage * 100;
          this.form.close_fee = data.user.close_service_fee_percentage * 100;
          this.form.limit = data.user.credit;
        }
      });
    },
    addAndUpdate(arg) {
      this.$store.dispatch("EDITNEXT", arg).then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          Object.assign(this.form.credit, data.user);
          Object.assign(this.range, data.user_limit);
          //   Object.assign(this.form, res.data.data.user);
          this.form.account = data.user.account;
          this.form.open_fee = data.user.open_service_fee_percentage * 100;
          this.form.close_fee = data.user.close_service_fee_percentage * 100;
          this.form.limit = data.user.credit;
        }
      });
    },
    msg(e) {
      if (e.data.status == 1) {
        Message({
          center: true,
          message: "保存成功",
          duration: 1500,
          type: "success",
          onClose: () => {
            this.$emit("dialogClose");
          }
        });
      }
    },
    crashCredit(e) {
      e
        ? Object.assign(this.form.credit, this.form.temp)
        : Object.assign(this.form.credit, this.form.crash);
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