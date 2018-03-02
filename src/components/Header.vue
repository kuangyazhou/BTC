<template>
  <div class="header">
    <el-row>
      <el-col :span="3" style="margin-left:-10px;margin-right:0px;background:#00B38B">
        <span class="flex logo"><img src="@/assets/react.png" /></span>
      </el-col>
      <el-col class="flex between" :span="21" style="height:60px;padding:0 12px;border-bottom:1px solid #e5e5e5">
        <div class="flex center">
          <span class="flex f26">
            <!--  -->
            网站后台管理系统</span>
        </div>
        <div class="flex center">
          <span class="flex">
            <i class="el-icon-info"></i>Admin</span>
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
import { Row, Col, Icon } from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);

export default {
  data() {
    return {
      msg: "This is the Header"
    };
  }
};
</script>

<style scoped>
.header {
  /* background: #545c64; */
  /* background: #181b2a; */
  /* color: #c7cce6; */
  height: 60px;
}
.logo {
  width: 60px;
  height: 60px;
  padding-left: calc(50% - 30px);
}
.logo img {
  width: 100%;
  height: 100%;
}
.user {
  padding-right: 5%;
}
</style>
