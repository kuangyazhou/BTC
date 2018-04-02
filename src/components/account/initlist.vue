<template>
  <div class="init-list">
    <el-row style="margin-bottom:0.5em">
      <el-col>
        <el-radio-group v-model="proxy" size="small" @change="change">
          <el-radio-button v-for="(item,index) in levelNum" v-bind:key="index" :label="item.level">
            <span>{{item.label}}</span>
            <span>{{item.value}}</span>
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 一至五代理列表 -->
    <div class="list-container" v-show="!adminList" style="width: 99%;">
      <el-row>
        <el-col :span="24">
          <el-table :border="false" size="mini" :data="oneData" style="width: 100%" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column prop="name" align="center" :label="title+'代理名称'">
              <template slot-scope="scope">
                <span @click="viewUser(scope.row)" style="cursor: pointer;">
                  {{scope.row.name}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="account" align="center" :label="title+'代理帐号'">
            </el-table-column>
            <el-table-column prop="limit" align="center" label="信用额度" width="80">
            </el-table-column>
            <el-table-column prop="account_type" align="center" label="帐户类型" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.type=='1'?$t('message.cash'):$t('message.credit')}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.status')" prop="status" align="center">
              <template slot-scope="scope">
                {{scope.row.status=='1'?$t('message.using'):$t('message.noUse')}}
              </template>
            </el-table-column>
            <el-table-column prop="one" align="center" label="一级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,1,scope.row.one)" v-bind:class="{cursor:scope.row.one.indexOf('%')==-1&&scope.row.one>0}" v-html="scope.row.one">
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="two" align="center" label="二级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,2,scope.row.two)" v-bind:class="{cursor:scope.row.two.indexOf('%')==-1&&scope.row.two>0}" v-html="scope.row.two">
                  <!-- {{scope.row.two}} -->
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="three" align="center" label="三级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,3,scope.row.three)" v-bind:class="{cursor:scope.row.three.indexOf('%')==-1&&scope.row.three>0}" v-html="scope.row.three">
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="four" align="center" label="四级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,4,scope.row.four)" v-bind:class="{cursor:scope.row.four.indexOf('%')==-1&&scope.row.four>0}" v-html="scope.row.four">
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="five" align="center" label="五级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,5,scope.row.five)" v-bind:class="{cursor:scope.row.five.indexOf('%')==-1&&scope.row.five>0}" v-html="scope.row.five">
                  {{scope.row.five}}
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="showMember" prop="member" align="center" :label="$t('message.member')" width="50">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,6,scope.row.member)" v-bind:class="{cursor:scope.row.member>0}">{{scope.row.member}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="frozen" align="center" :label="$t('message.crashFrozen')">
            </el-table-column>
            <el-table-column prop="used" align="center" :label="$t('message.crashUsed')">
            </el-table-column>
            <el-table-column prop="addTime" align="center" :label="$t('message.addTime')">
            </el-table-column>
            <el-table-column :label="$t('message.operate')" width="60">
              <template slot-scope="scope">
                <el-dropdown @command="command=>operate(command,scope)">
                  <span class="el-dropdown-link">
                    <i class="fa fa-chevron-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='update'>{{$t('message.modify')}}</el-dropdown-item>
                    <el-dropdown-item command='stop' v-if="scope.row.status=='1'">{{$t('message.noUse')}}</el-dropdown-item>
                    <el-dropdown-item command='use' v-if="scope.row.status=='0'">{{$t('message.using')}}</el-dropdown-item>
                    <el-dropdown-item command='delete'>{{$t('message.del')}}</el-dropdown-item>
                    <el-dropdown-item command='comein'>{{$t('message.comeIn')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 管理员帐号列表 -->
    <div class="admin-list" v-show="adminList" style="width: 99%;">
      <el-row>
        <el-col>
          <el-table :border="false" size="mini" :data="adminData" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column :label="$t('message.adminAccount')" prop="account" align="center">
            </el-table-column>
            <el-table-column :label="$t('message.adminName')" prop="name" align="center">
            </el-table-column>
            <!-- <el-table-column label="所属角色" prop="role" align="center">
            </el-table-column> -->
            <el-table-column :label="$t('message.status')" prop="status" align="center">
              <template slot-scope="scope">
                {{scope.row.status=='1'?$t('message.using'):$t('message.noUse')}}
              </template>
            </el-table-column>
            <!-- <el-table-column label="是否允许登录风控端" width="130" prop="login" align="center">
            </el-table-column> -->
            <el-table-column :label="$t('message.createTime')" prop="createTime" align="center">
            </el-table-column>
            <!-- <el-table-column label="上次登录时间" prop="lastLogin" align="center">
            </el-table-column> -->
            <!-- <el-table-column label="上次登录IP" prop="lastIp" align="center">
            </el-table-column> -->
            <!-- <el-table-column label="描述" prop="descripe" align="center">
            </el-table-column> -->
            <el-table-column :label="$t('message.operate')">
              <template slot-scope="scope">
                <el-dropdown @command="command=>adminOperate(command,scope)">
                  <span class="el-dropdown-link">
                    <i class="fa fa-chevron-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='detail'>{{$t('message.detail')}}</el-dropdown-item>
                    <el-dropdown-item command='stop' v-if="scope.row.status=='1'">{{$t('message.noUse')}}</el-dropdown-item>
                    <el-dropdown-item command='use' v-if="scope.row.status=='0'">{{$t('message.using')}}</el-dropdown-item>
                    <el-dropdown-item command='delete'>{{$t('message.del')}}</el-dropdown-item>
                    <el-dropdown-item command='role'>{{$t('message.roleAssign')}}</el-dropdown-item>
                    <!-- <el-dropdown-item command='pwd'>{{$t('message.modifyPwd')}}</el-dropdown-item> -->
                    <el-dropdown-item command='update'>{{$t('message.modifyBaseInfo')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="flex center" v-show="!adminList">
      <el-pagination layout="prev, pager, next" @current-change="pageChange" :current-page.sync="page.current" :page-size="20" :total="20*page.total">
      </el-pagination>
    </div>
    <div class="flex center" v-show="adminList">
      <el-pagination layout="prev,pager,next" @currnet-change="adminChange" :current-page.sync="adminPage.current" :page-size="20" :total="20*adminPage.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Table,
  TableColumn,
  Dropdown,
  Loading,
  DropdownMenu,
  DropdownItem,
  Pagination,
  RadioButton,
  RadioGroup
} from "element-ui";

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(RadioButton);
Vue.use(RadioGroup);
export default {
  name: "InitList",
  data() {
    return {
      proxy: "level" + (this.level + 1),
      oneData: [],
      // user: [],
      levelNum: [],
      showMember: true,
      loading: true,
      adminData: [],
      page: {
        current: 1,
        total: 1
      },
      adminPage: {
        current: 1,
        total: 1
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "一级"
    },
    level: {
      type: Number
    },
    status: {
      type: String,
      default: "新增"
    },
    adminList: {
      type: Boolean
    }
  },
  created() {
    let arg = {
      level: this.level + 1
    };
    this.init(arg);
  },
  mounted() {
    // const arr = [1, 2, 3, 4];
    // arr.reduce((pre, cur, index, arr) => {
    //   console.log(pre, cur, index, arr);
    //   return pre * cur;
    // }, 3);
    // console.log(this.level);
  },
  methods: {
    // 用户列表操作事件
    operate(e, scope) {
      this.$emit("userHandle", e, scope.row);
    },
    //管理员列表操作事件
    adminOperate(e, scope) {
      this.$emit("adminHandle", e, scope.row);
    },
    change(e) {
      const level = e.slice(-1);
      e == "level6" ? (this.showMember = false) : (this.showMember = true);
      let arg = {
        level: level
      };
      this.$emit("currentLevel", level);
      if (Number(level) > 0) {
        this.init(arg);
      } else {
        this.adminInit();
      }
    },
    pageChange(e) {
      let arg = {
        page: e,
        level: this.level + 1
      };
      this.init(arg);
    },
    adminChange(e) {},
    viewNext(e, i, val) {
      // console.log(e, i, val);
      if (val.indexOf("%") > -1 || val == "0") return;
      if (i == 6) this.showMember = false;
      this.proxy = "level" + i;
      let arg = {
        level: i,
        parent_id: e.id
      };
      this.$emit("update:viewLevel", i);
      this.init(arg);
    },
    viewUser(e) {
      // console.log(e.id, e.account);
      this.$emit("parentId", e.id, Number(e.level) + 1);
      let arg = {
        parent_id: e.id,
        level: Number(e.level) + 1
      };
      this.proxy = `level${Number(e.level) + 1}`;
      // console.log(this.proxy);
      this.init(arg);
    },
    levelHandle(e) {
      let mapData = {
        level0: "管理员",
        level1: "一级代理",
        level2: "二级代理",
        level3: "三级代理",
        level4: "四级代理",
        level5: "五级代理",
        level6: "会员"
      };
      this.levelNum = [];
      for (let item in e) {
        this.levelNum.push({
          label: mapData[item],
          value: e[item],
          level: item
        });
      }
    },
    adminInit() {
      this.loading = true;
      this.$store.dispatch("adminListit").then(res => {
        if (res.data.status == 1) {
          this.loading = false;
          // console.log(res);
          this.adminData = [];
          let temp = res.data.data.user;
          temp.forEach((item, index) => {
            this.adminData.push({
              account: item.account,
              name: item.user_name,
              // role: item,
              status: item.status ? "启用" : "停用",
              permissions: item.permissions,
              // login: item,
              createTime: item.add_time,
              // validTime: item,
              // lastLogin: item,
              // lastIp: item,
              // descripe: item,
              id: item.user_id,
              status: item.status
            });
          });
        }
      });
    },
    init(data) {
      this.loading = true; //开启loading动画
      this.$store.dispatch("INITLIST", data).then(res => {
        if (res.data.status == 1) {
          this.loading = false; //关闭loading
          let num = res.data.data.level_num; //生成单选框数据
          this.levelHandle(num); //v-for RadioGroup
          this.oneData = []; //清空table数据
          let temp = res.data.data.user;
          this.page = res.data.data.pager;
          temp.forEach((item, index) => {
            // console.log(item);
            this.oneData.push({
              name: item.name,
              account: item.account,
              limit: item.credit,
              one: item.first_agent
                ? item.first_agent.account
                  ? `<div>${item.first_agent.account}</div><div>${
                      item.first_agent.share_sum
                    }%</div>`
                  : item.first_agent.number || item.first_agent.share_sum + "%"
                : "",
              two: item.second_agent
                ? item.second_agent.account
                  ? `<div>${item.second_agent.account}</div><div>${
                      item.second_agent.share_sum
                    }%</div>`
                  : item.second_agent.number ||
                    item.second_agent.share_sum + "%"
                : "",
              three: item.third_agent
                ? item.third_agent.account
                  ? `<div>${item.third_agent.account}</div><div>${
                      item.third_agent.share_sum
                    }%</div>`
                  : item.third_agent.number || item.third_agent.share_sum + "%"
                : "",
              four: item.forth_agent
                ? item.forth_agent.account
                  ? `<div>${item.forth_agent.account}</div><div>${
                      item.forth_agent.share_sum
                    }%</div>`
                  : item.forth_agent.number || item.forth_agent.share_sum + "%"
                : "",
              five: item.fifth_agent
                ? item.fifth_agent.account
                  ? `<div>${item.fifth_agent.account}</div><div>${
                      item.fifth_agent.share_sum
                    }%</div>`
                  : item.fifth_agent.number || item.fifth_agent.share_sum + "%"
                : "",
              member: item.member ? item.member.number : 0,
              frozen: item.deposit_frozen_percentage + "%",
              used: item.deposit_used_percentage + "%",
              addTime: item.add_time,
              id: item.user_id,
              type: item.account_type,
              level: item.level,
              status: item.status
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.list-container,
.admin-list {
  max-height: 60vh;
  overflow-y: scroll;
}
</style>
