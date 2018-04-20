<template>
  <div class="login">
    <el-row>
      <el-col class="login-container" :span="6" :push="9">
        <h3 class="">{{$t('message.login')}} BitFINEX</h3>
        <el-form ref="form" :rules="rules" :model="form" size="small">
          <el-form-item label="" prop="account">
            <el-input prefix-icon="el-icon-search" v-model="form.account" :placeholder="$t('message.zh')" ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input prefix-icon="el-icon-search" type="password" @keyup.enter.native="onSubmit" v-model="form.password" :placeholder="$t('message.pwd')" name="password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex row between">
              <span class="flex">
                <el-checkbox v-model="checked">{{$t('message.remember')}}</el-checkbox>
              </span>
       
            </div>
          </el-form-item>
          <el-form-item>
            <div class="flex row between">
              <span class="flex">
                <el-button type="success" @click="onSubmit">{{$t('message.login')}}</el-button>
              </span>
              <span class="flex">
                <el-button @click="reg">{{$t('message.reg')}}</el-button>
              </span>
            </div>
          </el-form-item>
        </el-form>
        <div>
          <el-alert v-if="form.formError" type="error" title="" :closable="false">
            {{$t('message.'+`${form.formError}`)}}
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { API_SERVER, setToken } from "@/utils/apiUtils";
import {
  Button,
  Checkbox,
  Col,
  Row,
  Input,
  Form,
  FormItem,
  Alert,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Container,
  Main,
  Header,
  Footer,
  Aside,
  Message
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// Vue.use(Container);
// Vue.use(Main);
// Vue.use(Header);
// Vue.use(Footer);
// Vue.use(Aside);
// Vue.component(Message.name, Message);

export default {
  name: "Login",
  data() {
    return {
      msg: "",
      checked: true,
      form: {
        formError: null,
        account: "qew123463",
        password: "123456"
      },
      rules: {
        account: [
          {
            required: true,
            message: this.$t("message.emptyAccounts"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("message.emptyPwd"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  mounted() {
    // localStorage.setItem("lang", "cn");
    // console.log($t("message.emptyAccount"));
  },
  methods: {
    onSubmit() {
      const self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          
          this.$store
            .dispatch("loginByaccount", this.form)
            .then(e => {
              // e.data.status ? this.$router.push("home") : null;
              if (e.data.status) {
                Message({
                  message: this.$t("message.loginSuccess"),
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                  //  this.$router.push("account");
                   this.$router.push({'name':'Trade'});
                  }
                });
              }
              if (e.data.msg == 1) {
                this.form.formError = "err1";
              }
              if (e.data.msg == 2) {
                this.form.formError = "err2";
              }
            })
            .catch(e => {
              console.log(e);
              // this.form.formError = e.message;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeLang(e) {
      // console.log(e);
      localStorage.setItem("lang", e);
      this.$i18n.locale = e; //设置语言
      this.$refs["form"].clearValidate(); //清空form验证信息
      this.rules.account[0].message = this.$t("message.emptyAccounts"); //重置rule 否则提醒信息不刷新 fuck!!!!
      this.rules.password[0].message = this.$t("message.emptyPwd");
    },
    reg() {
      this.$router.push({ path: "userReg" });
    }
  }
};
</script>

<style scoped>
.login {
  height:700px;
  background: url(./img/loginBg.jpg) center center no-repeat/cover;
}
.login-container {
  background: rgba(255,255,255,0.9);
  margin-top: 150px;
  padding: 0 4%;
}
.login-err {
  cursor: pointer;
}

.ln {
  padding: 4% 0 4% 0;
}

.el-dropdown {
  color: ghostwhite;
}
</style>
