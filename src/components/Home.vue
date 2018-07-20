<template>
  <div style="height:100%;">
  	<Notice ref="notice"></Notice>
    <BHeader></BHeader>
    <el-row :gutter="10" class="body">
      <el-col :span="3" style="height:100%;padding-right:0px">
        <SideBar @routerChange="routerChange"></SideBar>
      </el-col>
      <el-col :span="21" class="content" style=" padding-right: 0px;">
        <transition name="el-fade-in">
          <router-view></router-view>
        </transition>
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
import Notice from "@/components/common/dialog-notice";

export default {
    name: "Home",
    components: { SideBar, BHeader, BFooter, Notice },
    // props: {
    //   active: {
    //     type: String,
    //     default: "account"
    //   }
    // },
    watch: {
        loginStatus: function(val) {}
    },
    computed: {
        loginStatus: function() {
            return this.$store.state.user.userInfo;
        }
    },
    created() {},
    mounted() {
        if (
            this.$store.state.user.token &&
            this.$store.state.user.userInfo.my_notice.length > 0
        ) {
            setTimeout(() => {
                this.$refs.notice.dialogVisible = true;
            }, 1000);
        }
    },
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
    height: 100%;
    // background: #efefef;
}
.body {
    height: calc(100% - 86px);
    .el-menu {
        height: 100%;
    }
}
// .body .el-menu {
//   height: 100%;
// }
</style>
