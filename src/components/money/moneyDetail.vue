<template>
  <div class="money-detail">
    <el-dialog :visible.sync="detailSwitch" width='40%' :title="$t('message.receipt')" :before-close="()=>$emit('update:detailSwitch',false)">
      <el-row>
        <el-col>{{$t('message.deal_type')}}:
          <span v-if="detailData.type==0" key="charge">{{$t('l.cz')}}</span>
          <span v-if="detailData.type==1" key="widthdraw">{{$t('l.tx')}}</span>
          <span v-if="detailData.type==2" key="bill">{{$t('message.bill')}}</span>
        </el-col>
        <el-col>{{$t('message.deal_amount')}}:{{detailData.amount}}</el-col>
        <el-col>{{$t('message.charge')}}:{{detailData.service_fee}}</el-col>
        <el-col>{{$t('message.deal_status')}}:
          <!-- {{detailData.order_status}} -->
          <span v-if="detailData.order_status==0" key="charge">{{$t('message.pending')}}</span>
          <span v-if="detailData.order_status==1" key="widthdraw">{{$t('message.success')}}</span>
          <span v-if="detailData.order_status==2" key="bill">{{$t('message.fail')}}</span>
        </el-col>
        <el-col>{{$t('message.deal_info')}}:{{detailData.info}}</el-col>
        <el-col>{{$t('message.bank')}}:{{detailData.bank_name}}</el-col>
        <el-col>{{$t('message.name')}}:{{detailData.bank_user_name}}</el-col>
        <el-col>{{$t('message.card_num')}}:{{detailData.bank_user_account}}</el-col>
        <el-col>{{$t('message.branch')}}:{{detailData.banking_outlets}}</el-col>
        <el-col>{{$t('message.audit_remark')}}:{{detailData.remark}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:detailSwitch',false)">{{$t('message.close')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible="manangeSwitch" :before-close="()=>$emit('update:manangeSwitch',false)" :title="$t('message.deal')" width='40%'>
      <!-- <h1>fuck the king!!!</h1> -->
      <el-form :inline="false" label-position="top" size="mini" style="width:50%">
        <el-form-item :label="$t('message.audit')">
          <!-- <el-input></el-input> -->
          <el-select v-model="formAudit.check">
            <el-option v-for="item in items" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('message.remark')">
          <el-input v-model="formAudit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:manangeSwitch',false)">{{$t('message.close')}}</el-button>
        <el-button size="mini" @click="auditSubmit">{{$t('l.qr')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible="billSwitch" :before-close="()=>$emit('update:billSwitch',false)" :title="$t('message.deal')" width='40%'>
      <!-- <h1>fuck the king!!!</h1> -->
      <el-form v-model="formAudit" :inline="false" size="mini" style="width:50%">
        <el-form-item :label="$t('message.amount')">
          <el-input v-model="formAudit.amount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="()=>$emit('update:billSwitch',false)">{{$t('message.close')}}</el-button>
        <el-button size="mini" @click="billSubmit">{{$t('l.qr')}}</el-button>
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
  Option,
  Message
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
      items: [
        { label: this.$t("message.pass"), value: 1 },
        { label: this.$t("message.refuse"), value: 0 }
      ],
      formAudit: {
        check: 1,
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
          if (res.data.status == 1) {
            Message({
              message: this.$t("message.billSuccess"),
              type: "success",
              duration: 1500,
              onClose: () => {
                this.$emit("update:billSwitch", false);
              }
            });
          }
        });
    },
    auditSubmit() {
      this.$store
        .dispatch("reviewMoney", {
          id: this.id,
          remark: this.formAudit.remark,
          check: this.formAudit.check
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            Message({
              message: this.$t("message.operateSuccess"),
              type: "success",
              duration: 1500,
              onClose: () => {
                this.$emit("update:manangeSwitch", false);
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
