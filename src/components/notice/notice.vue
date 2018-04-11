<template>
  <div class="notice">
    <el-row>
      <el-col>
        <el-form size="mini" :model="search" :inline="true" style="padding:0 0.5em">
          <el-form-item label="标题">
            <el-input v-model="search.title"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select size="mini" v-model="search.status">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="search.time" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="getData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="search = {status:1}">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addNotice" type="success">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="width:99%;overflow-y: auto;">
        <el-table :data="noticeData" :border="false" size="mini" style="height:60vh" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="标题" align="center" prop="title"></el-table-column>
          <el-table-column label="接收人" align="center" prop="userName" :formatter="formatReceive">
          </el-table-column>
          <el-table-column label="发布人" align="center" prop="createName">

          </el-table-column>
          <el-table-column label="发布时间" align="center" prop="created"></el-table-column>
          <el-table-column label="状态" align="center" prop="status" :formatter="formatStatus">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <el-button size="mini" @click="modifyData(scoped.row)">修改</el-button>
              <el-button size="mini" type="warning" plain @click="delData(scoped.row)" v-if="scoped.row.status == 1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="flex center">
      <el-pagination layout="prev, pager, next" @current-change="pageChange" :current-page.sync="page.current" :page-size="20" :total="20*page.total">
      </el-pagination>
    </div>
    <el-dialog title="新增公告" :visible.sync="noticeSwitch" :before-close="()=>{noticeSwitch=false;initNoticeContent()}">
      <el-form label-width="80px" :model="noticeContent">
        <el-form-item label="接收对象">
          <el-select v-model="noticeContent.userLevel" placeholder="请选择" size="small">
            <el-option v-for="item in receiveOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告标题">
          <el-input v-model="noticeContent.title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="noticeContent.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave" :loading="loading">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/utils/request";
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
  DatePicker,
  Message,
  MessageBox
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
      search: {
        title: "",
        status: 1,
        time: ""
      },
      noticeContent: {
        title: "",
        content: "",
        userLevel: 0
      },
      receiveOption: [
        { label: "全部", value: 0 },
        { label: "一级代理", value: 1 },
        { label: "二级代理", value: 2 },
        { label: "三级代理", value: 3 },
        { label: "四级代理", value: 4 },
        { label: "五级代理", value: 5 },
        { label: "会员", value: 6 }
      ],
      options: [{ label: "正常", value: 1 }, { label: "删除", value: 0 }],
      page: {
        current: 1,
        total: 1
      },
      noticeData: []
    };
  },
  methods: {
    pageChange(e) {
      this.getData();
    },
    formatReceive(row, column) {
      if (row.userLevel == -1) {
        return row.userName;
      } else {
        for (var i in this.receiveOption) {
          let data = this.receiveOption[i];
          if (data.value == row.userLevel) {
            return data.label;
          }
        }
      }
    },
    formatStatus(row, column) {
      for (var i in this.options) {
        let data = this.options[i];
        if (data.value == row.status) {
          return data.label;
        }
      }
    },
    addNotice() {
      this.noticeSwitch = true;
    },
    onCancel() {
      this.initNoticeContent();
      this.noticeSwitch = false;
    },
    getData() {
      this.loading = true;
      let getData = {};
      getData.page = this.page.current;
      request({
        method: "get",
        params: getData,
        url: "/index.php?r=btc/notice/list"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.noticeData = data.data.datas;
          // this.page.total = Math.ceil(data.data.total / this.page.page_size);
          this.page = data.data.page;
          this.loading = false;
        } else {
          Message({
            center: true,
            message: this.$t("ar.errMsg26"),
            duration: 1800,
            type: "warning"
          });
          this.loading = false;
        }
      });
    },
    initNoticeContent() {
      this.noticeContent = {
        title: "",
        content: "",
        userLevel: 0
      };
    },
    modifyData(row) {
      this.noticeContent = {
        id: row.id,
        userLevel: row.userLevel,
        title: row.title,
        content: row.content
      };
      this.noticeSwitch = true;
    },
    delData(row) {
      MessageBox.confirm("是否确认删除此条公告?(此操作不可逆)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = row.id;
        let url = "/index.php?r=btc/notice/del";

        request({
          method: "post",
          data: { id: id },
          url: url
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            Message({
              center: true,
              message: "删除成功!",
              duration: 1800,
              type: "success"
            });
            this.loading = false;
            this.noticeSwitch = false;
            this.initNoticeContent();
            this.getData(this.dialogType);
          } else {
            Message({
              center: true,
              message: "删除失败!",
              duration: 1800,
              type: "warning"
            });
            this.loading = false;
          }
        });
      });
    },
    onSave() {
      let that = this;
      that.loading = true;
      if (this.noticeContent.title.length == 0) {
        Message({
          center: true,
          message: "公告标题不允许为空！",
          duration: 1200,
          type: "error",
          onClose: () => {
            that.loading = false;
          }
        });
        return;
      }
      if (this.noticeContent.content.length == 0) {
        Message({
          center: true,
          message: "公告内容不允许为空！",
          duration: 1200,
          type: "error",
          onClose: () => {
            that.loading = false;
          }
        });
        return;
      }
      request({
        method: "post",
        data: this.noticeContent,
        url: "/index.php?r=btc/notice/save"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          Message({
            center: true,
            message: this.$t("ar.sucMsg1"),
            duration: 1800,
            type: "success"
          });
          this.loading = false;
          this.noticeSwitch = false;
          this.initNoticeContent();
          this.getData();
        } else {
          Message({
            center: true,
            message: this.$t("ar.errMsg26"),
            duration: 1800,
            type: "warning"
          });
          this.loading = false;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>

</style>
