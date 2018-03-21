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
    <div class="list-container" style="width: 99%;">
      <el-row>
        <el-col :span="24">
          <el-table :border="false" size="mini" :data="oneData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
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
            </el-table-column>
            <el-table-column prop="one" align="center" label="一级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,1,scope.row.one)" v-bind:class="{cursor:scope.row.one.indexOf('%')==-1&&scope.row.one>0}">
                  {{scope.row.one}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="two" align="center" label="二级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,2,scope.row.two)" v-bind:class="{cursor:scope.row.two.indexOf('%')==-1&&scope.row.two>0}">
                  {{scope.row.two}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="three" align="center" label="三级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,3,scope.row.three)" v-bind:class="{cursor:scope.row.three.indexOf('%')==-1&&scope.row.three>0}">
                  {{scope.row.three}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="four" align="center" label="四级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,4,scope.row.four)" v-bind:class="{cursor:scope.row.four.indexOf('%')==-1&&scope.row.four>0}">
                  {{scope.row.four}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="five" align="center" label="五级代理" width="80">
              <template slot-scope="scope">
                <span @click="viewNext(scope.row,5,scope.row.five)" v-bind:class="{cursor:scope.row.five.indexOf('%')==-1&&scope.row.five>0}">
                  {{scope.row.five}}
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="showMember" prop="member" align="center" label="会员" width="50">
              <template slot-scope="scope">
                {{scope.row.member}}
              </template>
            </el-table-column>
            <el-table-column prop="frozen" align="center" label="冻结保证金">
            </el-table-column>
            <el-table-column prop="used" align="center" label="已用保证金">
            </el-table-column>
            <el-table-column prop="addTime" align="center" label="新增时间">
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-dropdown @command="command=>operate(command,scope)">
                  <span class="el-dropdown-link">
                    <i class="fa fa-chevron-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='update'>修改</el-dropdown-item>
                    <el-dropdown-item command='stop'>停用</el-dropdown-item>
                    <el-dropdown-item command='comein'>出入金</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="flex center">
      <el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="20" :total="20*page.total">
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
      page: {
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
  },
  methods: {
    operate(e, scope) {
      // console.log(e, scope);
      this.$emit("userHandle", e, scope.row);
    },
    change(e) {
      e == "level6" ? (this.showMember = false) : (this.showMember = true);
      let arg = {
        level: e.slice(-1)
      };
      this.$emit("currentLevel", e.slice(-1));
      this.init(arg);
    },
    pageChange(e) {
      let arg = {
        page: e
      };
      this.init(arg);
    },
    viewNext(e, i, val) {
      // console.log(e, i, val);
      if (val.indexOf("%") > -1 || val == "0") return;
      this.proxy = "level" + i;
      let arg = {
        level: i,
        parent_id: e.id
      };
      this.init(arg);
    },
    viewUser(e) {
      console.log(e.id, e.account);
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
              one: item.first_agent.account
                ? `${item.first_agent.account} ${item.first_agent.share_sum}%`
                : item.first_agent.number || item.first_agent.share_sum + "%",
              two: item.second_agent.account
                ? `${item.second_agent.account} ${item.second_agent.share_sum}%`
                : item.second_agent.number || item.second_agent.share_sum + "%",
              three: item.third_agent.account
                ? `${item.third_agent.account} ${item.third_agent.share_sum}%`
                : item.third_agent.number || item.third_agent.share_sum + "%",
              four: item.forth_agent.account
                ? `${item.forth_agent.account} ${item.forth_agent.share_sum}%`
                : item.forth_agent.number || item.forth_agent.share_sum + "%",
              five: item.fifth_agent.account
                ? `${item.fifth_agent.account} ${item.fifth_agent.share_sum}%`
                : item.fifth_agent.number || item.fifth_agent.share_sum + "%",
              member: item.member ? item.member.number : 0,
              frozen: item.deposit_frozen_percentage + "%",
              used: item.deposit_used_percentage + "%",
              addTime: item.add_time,
              id: item.user_id
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.list-container {
  max-height: 60vh;
  overflow-y: scroll;
}
</style>
