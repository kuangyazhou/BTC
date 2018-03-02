<template>
  <div style="height:100%;">
    <BHeader></BHeader>
    <el-row :gutter="10" class="body">
      <el-col :span="3" style="height:100%;">
        <SideBar @routerChange="routerChange"></SideBar>
      </el-col>
      <el-col :span="21" class="content" style=" padding-right: 0px;">
        <router-view></router-view>
      </el-col>
    </el-row>
    <BFooter></BFooter>
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col } from "element-ui";

Vue.use(Row);
Vue.use(Col);

import SideBar from "@/components/SideBar";
import BHeader from "@/components/Header";
import BFooter from "@/components/Footer";

export default {
  name: "Home",
  components: { SideBar, BHeader, BFooter },
  // props: {
  //   active: {
  //     type: String,
  //     default: "account"
  //   }
  // },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  updated() {},
  activated() {},
  methods: {
    routerChange(e) {
      // console.log(e);
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
  padding-top: 1em;
}
.body {
  height: calc(100% - 60px);
  .el-menu {
    height: 100%;
  }
}
// .body .el-menu {
//   height: 100%;
// }
</style>
