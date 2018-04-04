<template>
  <div class="notice">
    <el-row>
      <el-col>
        <el-form size="mini" :model="form" :inline="true" style="padding:0 0.5em">
          <el-form-item label="标题">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select size="mini" v-model="status">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="value6" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button>查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button size="mini" @click="addNotice">新增</el-button>
        <!-- <el-button size="mini">详情</el-button> -->
      </el-col>
      <el-col>
        <el-table :data="noticeData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="标题" align="center" prop="title"></el-table-column>
          <el-table-column label="发布人" align="center" prop="issuer"></el-table-column>
          <el-table-column label="发布机构" align="center" prop="organization"></el-table-column>
          <el-table-column label="状态" align="center" prop="status"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <el-button size="mini">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="flex center">
      <el-pagination layout="prev,pager,next" @current-change="pageChange" :current-page.sync="page.current" :page-size="20" :total="page.total*20"></el-pagination>
    </div>
    <el-dialog title="新增公告" :visible.sync="noticeSwitch" :before-close="()=>noticeSwitch=false">
      <span>公告</span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Row,
  Col,
  Select,
  Option,
  Dialog,
  Form,
  FormItem,
  Button,
  Table,
  Loading,
  TableColumn,
  Input,
  Pagination,
  DatePicker
} from "element-ui";

Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Loading);
Vue.use(DatePicker);
Vue.use(Pagination);

export default {
  name: "Notice",
  data() {
    return {
      // msg: "notice"，
      value6: "",
      loading: false,
      noticeSwitch: false,
      status: "",
      form: {},
      options: [
        { label: "审核通过", value: 1 },
        { label: "审核不通过", value: 0 }
      ],
      page: {
        current: 1,
        total: 1
      },
      noticeData: [
        {
          title: "特别会员资金预警",
          issuer: "system",
          organization: "金梯交易所",
          status: "审核通过"
        },
        {
          title: "特别会员资金预警",
          issuer: "system",
          organization: "金梯交易所",
          status: "审核通过"
        },
        {
          title: "特别会员资金预警",
          issuer: "system",
          organization: "金梯交易所",
          status: "审核通过"
        }
      ]
    };
  },
  methods: {
    pageChange(e) {},
    addNotice() {
      this.noticeSwitch = true;
    }
  }
};
</script>

<style scoped>

</style>
