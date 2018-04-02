<template>
  <div class="accout-search">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="16">
        <el-form ref="form" :model="form" :inline="true" style="padding:0 0.5em;">
          <!-- <el-form-item label="名称" prop="name">
            <el-input class="w100" size="mini" v-model="form.name"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('message.keyword1')+':'" prop="id">
            <el-input class="w100" size="mini" @keypress.enter.native="search" v-model="form.keyword"></el-input>
            <input style="display:none" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button size="mini" @click="search">{{$t('message.search')}}</el-button>
        <el-button size="mini" @click="add">{{$t('message.addNew')}}</el-button>
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
      if (this.viewLevel > 0) {
        this.$emit("addHandle");
      } else {
        // console.log("admin");
        this.$emit("update:openItem", "add");
      }
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
.el-form-item {
  margin-bottom: 0;
}
.accout-search {
  margin-bottom: 1em;
  border-bottom: 1px solid #e5e5e5;
}
</style>
