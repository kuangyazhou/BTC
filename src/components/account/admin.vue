<template>
  <div class="account-admin">
    <el-dialog title="新增管理员" :visible="openItem=='add'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="adminForm" key="form2" :model="adminForm" label-width="80px" :inline="true" size="mini" :rules="rules" label-position="right">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录帐号" prop="account">
              <el-input v-model="adminForm.account" name="account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="帐号名称" prop="name">
              <el-input v-model="adminForm.name" name="user_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="管理密码" prop="password">
              <el-input v-model="adminForm.password" type="password" name="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="repassword">
              <el-input v-model="adminForm.repassword" type="password" name="repassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="权限" prop="auths">
              <el-checkbox-group v-model="adminForm.auths" :min="1" @change="authChange" name="auths">
                <el-checkbox v-for="item in auth" :label="item.value" v-if="item.show" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button size="mini" type="primary" native-type="submit" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="基本信息修改" :visible="openItem=='update'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="adminForm" key="form1" :model="adminForm" label-width="80px" :inline="true" size="mini" :rules="rules" label-position="right">
        <el-row>
          <el-col :span="8">
            <el-form-item label="帐号名称" prop="name">
              <el-input v-model="adminForm.name" name="user_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="管理密码" prop="password">
              <el-input v-model="adminForm.password" type="password" name="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="repassword">
              <el-input v-model="adminForm.repassword" type="password" name="repassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label="$t('message.auth')" prop="auths">
              <el-checkbox-group v-model="adminForm.auths" :min="1" @change="authChange" name="auths">
                <el-checkbox v-for="item in auth" :label="item.value" :key="item.value" v-if="item.show">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close">{{$t('ar.qx')}}</el-button>
        <el-button size="mini" type="primary" native-type="submit" @click="addSubmit">{{$t('message.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Button,
  Dialog,
  Message
} from "element-ui";
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Dialog);

export default {
  name: "Admin",
  watch: {
    openItem: function(val, old) {
      // console.log(val);
      switch (val) {
        case "add":
          this.$store.dispatch("addAdmin", {}).then(res => {});
        // Object.assign(this.adminForm, this.initial);
        case "detail":
          break;
        case "role":
          break;
        case "update":
          this.rules.repassword[0].required = false;
          this.$store
            .dispatch("addAdmin", { user_id: this.adminItem.id })
            .then(res => {
              // console.log(res, res.data.data.user);
              Object.assign(this.adminForm, res.data.data.user);
              this.adminForm.auths = res.data.data.user.permissions.split(",");
              // console.log(this.adminForm);
            });
          break;
        default:
      }
    }
  },
  data() {
    const initial = {
      account: "",
      name: "",
      user_id: "",
      status: "",
      password: "",
      repassword: "",
      auths: []
    };
    return {
      dialogVisible: true,
      status: [
        { label: this.$t("message.using"), value: 1 },
        { label: this.$t("message.forbidden"), value: 0 }
      ],
      auth: [
        // { label: this.$t("message.zhgl"), value: "zhgl", show: true },
        // { label: this.$t("message.cssz"), value: "cssz", show: true },
        // { label: this.$t("message.sftj"), value: "sftj", show: true },
        // { label: this.$t("message.bbgl"), value: "bbgl", show: true },
        // { label: this.$t("message.gggl"), value: "gggl", show: true },
        // { label: this.$t("message.zjgl"), value: "zjgl", show: this.level == 0 }
      ],
      adminForm: {
        account: "",
        name: "",
        user_id: "",
        status: "",
        password: "",
        repassword: "",
        auths: []
      },
      rules: {
        repassword: [
          {
            required: true,
            message: this.$t("message.emptyPwd"),
            trigger: "blur"
          }
        ],
        auths: [
          {
            required: true,
            message: this.$t("message.authRequire"),
            type: "array",
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    openItem: {
      type: String
    },
    adminItem: {
      type: Object,
      default: () => {
        id: "";
      }
    }
  },
  computed: {
    level() {
      return (
        this.$store.state.user.level ||
        JSON.parse(sessionStorage.getItem("user")).level
      );
    }
  },
  created() {
    this.auth = [
      { label: this.$t("message.zhgl"), value: "zhgl", show: true },
      { label: this.$t("message.cssz"), value: "cssz", show: true },
      { label: this.$t("message.sftj"), value: "sftj", show: true },
      { label: this.$t("message.bbgl"), value: "bbgl", show: true },
      { label: this.$t("message.gggl"), value: "gggl", show: true },
      {
        label: this.$t("message.zjgl"),
        value: "zjgl",
        show: Number(this.level) == 0
      }
    ];
  },
  mounted() {
    // console.log(this.level==0,this.auth);
  },
  methods: {
    authChange(e) {
      // console.log(e);
    },
    addSubmit() {
      console.log(this.adminForm.auths);
      const arg = {
        user_id: this.adminItem.id || "",
        account: this.adminForm.account || this.adminItem.account,
        name: this.adminForm.name,
        password: this.adminForm.password,
        repassword: this.adminForm.repassword,
        permissions: this.adminForm.auths
      };
      // console.log(arg);
      this.$refs.adminForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("saveAdmin", arg).then(res => {
            if (res.data.status == 1) {
              Message({
                center: true,
                type: "success",
                duration: 1800,
                message: this.$t("message.saveSuccess"),
                onClose: () => {
                  this.$refs["adminForm"].resetFields();
                  this.$emit("adminClose", "", true);
                }
              });
            }
          });
        } else {
          Message({
            center: true,
            message: this.$t("message.requireItem"),
            duration: 1500,
            type: "error"
          });
        }
      });
    },
    close(e) {
      this.$refs["adminForm"].resetFields();
      this.$emit("adminClose", "");
      // this.$emit("update:openItem", ""); //.sync使用失败
    }
  }
};
</script>

<style scoped>

</style>
