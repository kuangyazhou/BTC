<template>
  <div class="money-detail">
    <el-dialog :visible.sync="detailSwitch" title="收款设置" :before-close="()=>$emit('update:detailSwitch',false)">
      <el-row>
        <el-col>交易类型:补帐</el-col>
        <el-col>交易金额:{{detailData.amount}}</el-col>
        <el-col>手续费用:{{detailData.service_fee}}</el-col>
        <el-col>交易状态:{{detailData.order_status}}</el-col>
        <el-col>交易描述:{{detailData.info}}</el-col>
        <el-col>银行:{{detailData.bank_name}}</el-col>
        <el-col>姓名:{{detailData.bank_user_name}}</el-col>
        <el-col>卡号:{{detailData.bank_user_account}}</el-col>
        <el-col>网点:{{detailData.banking_outlets}}</el-col>
        <el-col>审核备注:{{detailData.remark}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:detailSwitch',false)">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible="manangeSwitch" :before-close="()=>$emit('update:manangeSwitch',false)" title="处理" width='40%'>
      <!-- <h1>fuck the king!!!</h1> -->
      <el-form :inline="false" label-position="top" size="mini" style="width:50%">
        <el-form-item label="审核">
          <!-- <el-input></el-input> -->
          <el-select v-model="formAudit.check">
            <el-option v-for="item in items" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formAudit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:manangeSwitch',false)">关闭</el-button>
        <el-button size="mini" @click="auditSubmit">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible="billSwitch" :before-close="()=>$emit('update:billSwitch',false)" title="处理" width='40%'>
      <!-- <h1>fuck the king!!!</h1> -->
      <el-form v-model="formAudit" :inline="false" size="mini" style="width:50%">
        <el-form-item label="金额">
          <el-input v-model="formAudit.amount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:billSwitch',false)">关闭</el-button>
        <el-button size="mini" @click="billSubmit">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Option
} from "element-ui";
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
export default {
  name: "MoneyDetail",
  props: {
    id: {
      type: Number
    },
    detailSwitch: {
      type: Boolean,
      default: false
    },
    manangeSwitch: {
      type: Boolean,
      default: false
    },
    billSwitch: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: () => ({
        id: "",
        add_time: "",
        add_time: "",
        pay_number: "",
        user_account: "",
        amount: "",
        type: "",
        info: "",
        remark: "",
        order_status: "",
        op_status: "",
        modify_user_name: "",
        user_name: "",
        bank_name: "",
        banking_outlets: "",
        bank_user_name: "",
        bank_user_account: "",
        pay_way: ""
      })
    }
  },
  data() {
    return {
      // detailSwitch: true
      items: [{ label: "通过", value: 1 }, { label: "不通过", value: 0 }],
      formAudit: {
        check: "",
        remark: "",
        amount: ""
      }
    };
  },
  methods: {
    billSubmit() {
      this.$store
        .dispatch("fillBill", { id: this.id, amount: this.formAudit.amount })
        .then(res => {
          // console.log(res);
        });
    },
    auditSubmit() {
      this.$store
        .dispatch("reviewMoney", {
          id: this.id,
          // remark: this.formAudit.remark,
          check: this.formAudit.check
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            console.log("操作成功");
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
