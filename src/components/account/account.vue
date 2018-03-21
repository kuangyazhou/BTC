<template>
  <div class="account">
    <!--头部搜索模块 -->
    <Search @addHandle="add" @searchHandle="search" :level="level" :viewLevel="viewLevel"></Search>
    <!-- 初始化数据模块 -->
    <InitList ref='list' :level="level" @userHandle="operate" @currentLevel="currentLevel"></InitList>
    <!-- form表单弹框 -->
    <AccountDialog ref="dialog" :title="title" :level="level" :viewLevel="viewLevel" :preList="preList" :showType="showType" :status="status" :visible="dialogVisible" :proxyOn="onProxySwitch" @dialogClose="dialogClose" @proxyClose="proxyClose"></AccountDialog>
  </div>
</template>

<script>
import AccountDialog from "@/components/account/dialog";
import InitList from "@/components/account/initlist";
import Search from "@/components/account/search";

export default {
  name: "Account",
  components: { AccountDialog, InitList, Search },
  data() {
    return {
      dialogVisible: false,
      onProxySwitch: false,
      showType: true,
      status: "",
      title: "",
      viewLevel: this.level,
      preList: [],
      mapData: {
        0: "管理员",
        1: "一级代理",
        2: "二级代理",
        3: "三级代理",
        4: "四级代理",
        5: "五级代理",
        6: "会员"
      }
    };
  },
  computed: {
    level() {
      return (
        this.$store.state.user.level ||
        JSON.parse(localStorage.getItem("user")).level
      );
    }
  },
  created() {},
  mounted() {
    // console.log(new Date().Format("yyyy年MM月dd日")); //日期格式化导入
    // axios.get("http://account/underProxy").then(res => {
    //   console.log(res);
    // });
    // vuex测试 commit dispathc;
    // console.log(this.$store.state.count);
  },
  methods: {
    currentLevel(item) {
      this.viewLevel = Number(item);
      this.title = this.mapData[item];
      // console.log(this.viewLevel);
    },
    operate(e, account) {
      switch (e) {
        case "update":
          this.showType = false;
          this.status = "修改";
          this.dialogVisible = true;
          this.$refs.dialog.addInit(account, "update");
          break;
        case "stop":
          break;
        case "comein":
          break;
        default:
          return;
      }
    },
    proxyClose() {
      this.onProxySwitch = false;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },

    // 搜索框新增按钮
    add() {
      this.showType = true;
      if (this.viewLevel - this.level >= 2) {
        const pre = this.viewLevel;
        this.$store.dispatch("PRELIST", { pre: pre }).then(res => {
          if (res.data.status == 1) {
            this.preList = res.data.data;
          }
        });
        this.onProxySwitch = true;
      } else {
        this.dialogVisible = true;
        this.$refs.dialog.addInit({}, "add");
      }
    },
    search(e) {
      // console.log(e);
      let arg = {
        keyword: e.keyword,
        level: this.viewLevel || this.level + 1
      };
      this.$refs.list.init(arg);
    }
  }
};
</script>

<style scoped>

</style>
