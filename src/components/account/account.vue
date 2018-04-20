<template>
  <div class="account">
    <!--头部搜索模块 -->
    <Search @addHandle="add" @searchHandle="search" :level="level" :viewLevel="viewLevel" :openItem.sync="openItem"></Search>
    <!-- 管理员功能模块 -->
    <Admin :openItem="openItem" :adminItem="adminItem" @adminClose="adminClose"></Admin>
    <!-- 初始化数据模块 -->
    <InitList ref='list' :title="title" :level="level" :viewLevel.sync="viewLevel" :adminList="adminList" @userHandle="operate" @parentId="setParent" @currentLevel="currentLevel" @adminHandle="adminHandle"></InitList>
    <!-- form表单弹框 -->
    <AccountDialog ref="dialog" :title="title" :level="level" :viewLevel="viewLevel" :preList.sync="preList" :showType="showType" :status="status" :visible="dialogVisible" :proxyOn="onProxySwitch" :readonly="readonly" @dialogClose="dialogClose" @proxyClose="proxyClose" @initList="initList"></AccountDialog>
  </div>
</template>

<script>
import AccountDialog from "@/components/account/dialog";
import InitList from "@/components/account/initlist";
import Search from "@/components/account/search";
import Admin from "@/components/account/admin";

import Vue from "vue";
import { Message } from "element-ui";

export default {
  name: "Account",
  components: { AccountDialog, InitList, Search, Admin },
  data() {
    return {
      dialogVisible: false,
      onProxySwitch: false,
      showType: true,
      status: this.$t("message.addNew"),
      title: this.$t("message.firstProxy"),
      viewLevel: this.level,
      preList: [],
      parent_id: "",
      readonly: true,
      openItem: "",
      adminItem: {},
      adminList: false,
      // openItem: "add",
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
        Number(this.$store.state.user.level) ||
        Number(JSON.parse(sessionStorage.getItem("user")).level)
      );
    }
  },
  created() {},
  mounted() {
    // console.log(new Date().Format("yyyy年MM月dd日")); //日期格式化导入
  },
  methods: {
    currentLevel(item) {
      this.viewLevel = Number(item);
      this.title = this.mapData[item];
      // console.log(this.viewLevel);
      if (Number(item) == 0) {
        this.adminList = true;
      } else {
        this.adminList = false;
      }
    },
    operate(e, account) {
      const data = {
        level: this.viewLevel
      };
      // console.log(data);
      switch (e) {
        case "update":
          this.showType = false;
          if (this.level == 0) this.readonly = false;
          this.status = this.$t("message.modify");
          // console.log(this.$t());
          this.dialogVisible = true;
          this.$refs.dialog.addInit(account, "update");
          break;
        case "stop":
          // console.log(e, account);
          const arg = {
            user_id: account.id,
            status: 0
          };
          this.$store.dispatch("accountOperate", arg).then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              Message({
                center: true,
                message: this.$t("message.operateSuccess"),
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.$refs.list.init(data);
                }
              });
            }
          });
          break;
        case "use":
          const args = {
            user_id: account.id,
            status: 1
          };
          this.$store.dispatch("accountOperate", args).then(res => {
            if (res.data.status == 1) {
              Message({
                center: true,
                message: "操作成功",
                type: "success",
                duration: 1500
              });
              this.$refs.list.init(data);
            }
          });
          break;
        case "delete":
          const params = {
            user_id: account.id,
            status: -1
          };
          this.$store.dispatch("accountOperate", params).then(res => {
            if (res.data.status == 1) {
              Message({
                center: true,
                message: "删除成功",
                type: "success",
                duration: 1500
              });
              this.$refs.list.init(data);
            }
          });
          break;
        case "comein":
          // this.com
          break;
        default:
          return;
      }
    },
    adminHandle(e, account) {
      // console.log(e, account);
      this.openItem = e;
      // this.adminItem = account;
      Object.assign(this.adminItem, account);
      // console.log(this.adminItem);
      switch (e) {
        case "stop":
          const arg = {
            user_id: account.id,
            status: 0
          };
          this.$store.dispatch("adminOperate", arg).then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              Message({
                center: true,
                message: this.$t("message.operateSuccess"),
                type: "success",
                duration: 1500
              });
              this.$refs.list.adminInit();
            }
          });
          break;
        case "use":
          const args = {
            user_id: account.id,
            status: 1
          };
          this.$store.dispatch("adminOperate", args).then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              Message({
                center: true,
                message: this.$t("message.operateSuccess"),
                type: "success",
                duration: 1500
              });
              this.$refs.list.adminInit();
            }
          });
          break;
        case "delete":
          const params = {
            user_id: account.id,
            status: -1
          };
          this.$store.dispatch("adminOperate", params).then(res => {
            if (res.data.status == 1) {
              Message({
                center: true,
                message: this.$t("message.delSuccess"),
                type: "success",
                duration: 1500
              });
              this.$refs.list.adminInit();
            }
          });
          break;
        default:
      }
    },
    proxyClose(e) {
      this.onProxySwitch = false;
      e ? null : (this.dialogVisible = true);
    },
    dialogClose() {
      this.dialogVisible = false;
    },

    setParent(id, level) {
      this.parent_id = id;
      this.viewLevel = level;
      this.title = this.mapData[level];
    },
    adminClose(e, reload) {
      this.openItem = e || "";
      reload ? this.$refs.list.adminInit() : "";
    },

    // 搜索框新增按钮
    add() {
      this.showType = true;
      if (this.level == 0) this.readonly = false;
      this.status = this.$t("message.addNew");
      if (this.viewLevel - this.level >= 2 && this.parent_id == "") {
        const pre = this.viewLevel;
        this.$store.dispatch("PRELIST", { pre: pre }).then(res => {
          if (res.data.status == 1) {
            this.preList = res.data.data;
            // 一级代理,二级代理排序
            this.preList = this.preList.sort((a, b) => {
              return a.level - b.level;
            });
          }
        });
        this.onProxySwitch = true;
      } else {
        this.dialogVisible = true;
        this.$refs.dialog.addInit({ parent_id: this.parent_id }, "add");
      }
    },
    search(e) {
      // console.log(e);
      let arg = {
        keyword: e.keyword,
        level: this.viewLevel || this.level + 1
      };
      this.$refs.list.init(arg);
    },
    initList() {
      let arg = {
        level: this.viewLevel || this.level + 1
      };
      this.$refs.list.init(arg);
    }
  }
};
</script>

<style scoped>

</style>
// 点击进入用户直接下级后，点击新增，无法直接进入新增页面。
// 二级帐号：b011，修改时，挂单卖出默认选择的是，但无法进行修改。
// 新增二级代理时，现金或者信用模式不应该可选。编辑时，也将此选项展示出来，并且不可修改状态
