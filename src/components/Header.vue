<template>
  <div class="header">
    <el-row>
      <el-col :span="3" style="margin-left:-5px;margin-right:0px;background:#00B38B;">
        <span class="flex logo"><img src="@/assets/react.png" /></span>
      </el-col>
      <el-col class="flex between" :span="21" style="height:86px;padding:0 1em;border-bottom:1px solid #e5e5e5">
        <div class="flex center">
          <span class="flex f26">
            <!--  -->
            网站后台管理系统</span>
        </div>
        <div class="flex center">
          <!-- <i class="el-icon-info"></i> -->
          <span class="flex">
            <el-dropdown @command="operate">
              <span class="el-dropdown-link">
                <i class="fa fa-user"></i>
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='logout'>退出</el-dropdown-item>
                <el-dropdown-item command='update'>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
    <!-- <el-header class="flex row between v-center">
      <div class="flex v-center">
        <span class="flex logo"><img src="@/assets/logo.png" /></span>
        <span class="flex">{{ msg }}</span>
      </div>
      <div class="flex user">admin</div>
    </el-header> -->
  </div>
</template>

<script>
import Vue from "vue";
import {
  Row,
  Col,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  data() {
    return {
      msg: "This is the Header"
    };
  },
  computed: {
    userName() {
      return (
        this.$store.state.user.userName ||
        JSON.parse(localStorage.getItem("user")).user_name
      );
    }
  },
  mounted() {
    // console.log(getUserInfo());
  },
  methods: {
    operate(e) {
      if (e == "logout") {
        this.$store.commit("LOGIN_OUT");
        Message({
          center: true,
          message: "退出成功",
          type: "success",
          duration: 1800,
          onClose: () => {
            window.location.replace("/login");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.header {
  /* background: #545c64; */
  /* background: #181b2a; */
  /* color: #c7cce6; */
  height: 86px;
}
.logo {
  width: 86px;
  height: 86px;
  padding-left: calc(50% - 43px);
}
.logo img {
  width: 100%;
  height: 100%;
}
.user {
  padding-right: 5%;
}
</style>
