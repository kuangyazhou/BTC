<template>
  <div class="login">
      <!-- <h1>fuck the king!!!</h1> -->
      <!-- <el-input placeholder="请输入用户名"></el-input> -->
    <el-row>
      <el-col :span="5" :push="12">
        <h3 class="">{{$t('message.login')}}</h3>
        <p></p>
        <el-form ref="form" :rules="rules" :model="form" size="small">
            <el-form-item label="" prop="userName">
              <el-input prefix-icon="el-icon-search" v-model="form.userName" placeholder="邮箱/微信号/QQ号" name="username"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
              <el-input prefix-icon="el-icon-search" type="password" @keyup.enter="onSubmit" v-model="form.pwd" placeholder="密码" name="pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex row between">
              <span class="flex"><el-checkbox v-model="checked">记住帐号</el-checkbox></span>
              <span class="flex login-err text-blue">无法登录?</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex row between">
                <span class="flex"><el-button type="success" @click="onSubmit">{{$t('message.login')}}</el-button></span>
                <span class="flex"><el-button @click="reg">注册</el-button></span>
              </div>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Checkbox, Col, Row, Input, Form, FormItem } from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Form);
Vue.use(FormItem);

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
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // localStorage.setItem("lang", "cn");
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(this.form.userName, this.form.pwd);
          this.$router.push("home");
        }
      });
    },
    reg() {
      this.$router.push({ path: "reg" });
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 8%;
}
.login-err {
  cursor: pointer;
}
</style>
