<template>
  <div class="accout-search">
    <el-row type="flex" justify="space-between">
      <el-col :span="16">
        <el-form ref="form" :model="form" :inline="true" style="padding:0 0.5em;">
          <!-- <el-form-item label="名称" prop="name">
            <el-input class="w100" size="mini" v-model="form.name"></el-input>
          </el-form-item> -->
          <el-form-item label="关键字:" prop="id">
            <el-input class="w100" size="mini" @keyup.enter.native="search" v-model="form.keyword"></el-input>
            <input style="display:none" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button size="mini" @click="add">新增</el-button>
        <el-button size="mini" @click="search">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col, Input, Button, Message } from "element-ui";
Vue.use(Row, Col, Input, Button);
// Vue.use(Message);
export default {
  name: "Search",
  props: {
    level: {
      type: Number
    },
    viewLevel: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeName: "first",
      form: {
        keyword: ""
      }
    };
  },
  mounted() {
    // console.log(this.viewLevel);
  },
  methods: {
    add(e) {
      this.$emit("addHandle");
    },
    search() {
      if (!this.form.keyword) {
        // 搜索关键词required
        Message({
          message: this.$t("message.keyword"),
          type: "error",
          duration: 1000
        });
        return;
      }
      let arg = {
        keyword: this.form.keyword
        // level: this.viewLevel
      };
      this.$emit("searchHandle", arg);
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style scoped>

</style>
