<template>
  <div class="account-admin">
    <el-dialog title="新增管理员" :visible="openItem=='add'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="adminForm" :model="adminForm" label-width="80px" :inline="true" size="mini" :rules="rules" label-position="right">
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
          <!-- <el-col :span="8">
            <el-form-item label="帐号状态" prop="status">
              <el-select size="mini" v-model="adminForm.status">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
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
                <el-checkbox v-for="item in auth" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
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
      <el-form ref="adminForm" :model="adminForm" label-width="80px" :inline="true" size="mini" :rules="rules" label-position="right">
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item label="登录帐号" prop="account">
              <el-input v-model="adminForm.account" name="account" :disabled="true"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="帐号名称" prop="name">
              <el-input v-model="adminForm.name" name="user_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="帐号状态" prop="status">
              <el-select size="mini" v-model="adminForm.status">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
                <el-checkbox v-for="item in auth" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
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
    <!-- <el-dialog title="密码重置" :visible="openItem=='pwd'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <span>pwd</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog> -->
    <!-- <el-dialog title="角色分配" :visible="openItem=='role'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <span>role</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog> -->
    <!-- <el-dialog title="详细信息" :visible="openItem=='detail'" :before-close="close" :close-on-press-escape="false" :close-on-click-modal="false">
      <span>detail</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog> -->
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
          this.$store.dispatch("addAdmin", {}).then(res => {
            // console.log(res);
          });
        case "detail":
          // this.$store.dispatch("");
          break;
        case "role":
          // this.$store.dispatch("");
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
    return {
      dialogVisible: true,
      status: [
        { label: this.$t("message.using"), value: 1 },
        { label: this.$t("message.forbidden"), value: 0 }
      ],
      auth: [
        { label: this.$t("message.zhgl"), value: "zhgl" },
        { label: this.$t("message.cssz"), value: "cssz" },
        { label: this.$t("message.sftj"), value: "sftj" },
        { label: this.$t("message.bbgl"), value: "bbgl" },
        { label: this.$t("message.gggl"), value: "gggl" },
        { label: this.$t("message.zjgl"), value: "zjgl" }
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
  created() {},
  mounted() {
    // setTimeout(() => {
    //   this.$emit("adminClose", "add");
    // }, 3000);
  },
  methods: {
    authChange(e) {
      // console.log(e);
    },
    addSubmit() {
      // console.log(this.adminForm);
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
    close() {
      this.$emit("adminClose", "");
      // this.$emit("update:openItem", ""); //.sync使用失败
    }
  }
};
</script>

<style scoped>

</style>
