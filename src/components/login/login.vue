<template>
  <div class="login">
    <!-- <el-container>
      <el-header>Header</el-header>
    </el-container>
    <el-container>
      <el-footer>Footer</el-footer>
    </el-container> -->
    <el-row class="ln">
      <el-col :span="5" :push="20">
        <div class="flex">
          <el-dropdown @command="changeLang">
            <span class="el-dropdown-link">
              {{$t('message.ln')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cn">{{$t('message.cn')}}</el-dropdown-item>
              <el-dropdown-item command="en">{{$t('message.en')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="login-container" :span="6" :push="12">
        <h3 class="">{{$t('message.login')}}</h3>
        <el-form ref="form" :rules="rules" :model="form" size="small">
          <el-form-item label="" prop="userName">
            <el-input prefix-icon="el-icon-search" v-model="form.userName" :placeholder="$t('message.account')" name="username"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pwd">
            <el-input prefix-icon="el-icon-search" type="password" @keyup.enter.native="onSubmit" v-model="form.pwd" :placeholder="$t('message.pwd')" name="pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex row between">
              <span class="flex">
                <el-checkbox v-model="checked">{{$t('message.remember')}}</el-checkbox>
              </span>
              <span class="flex login-err text-blue">{{$t('message.unLogin')}}?</span>
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
        userName: "",
        pwd: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: this.$t("message.emptyAccount"),
            trigger: "blur"
          }
        ],
        pwd: [
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
          // console.log(this.$store.state.userName, this.$store.state.level);
          this.$store
            .dispatch("loginByuserName", this.form)
            .then(e => {
              // e.data.status ? this.$router.push("home") : null;
              if (e.data.status) {
                Message({
                  message: this.$t("message.loginSuccess"),
                  type: "success"
                });
                this.$router.push("account");
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
      this.rules.userName[0].message = this.$t("message.emptyAccount"); //重置rule 否则提醒信息不刷新 fuck!!!!
      this.rules.pwd[0].message = this.$t("message.emptyPwd");
    },
    reg() {
      this.$router.push({ path: "reg" });
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  background: #00b38b;
}
.login-container {
  background: #fff;
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
