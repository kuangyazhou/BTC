<template>
        <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="价格熔断" name="first">
                                <el-table :data="tableBlownData" stripe style="width: 800px">
                                        <el-table-column prop="id" label="#" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="阶梯" align="center" width="200px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="价格浮动" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="价格持续时间/分钟" align="center" width="200px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="交易权限" name="second">
                                <el-table :data="tableTradingPermissionsData" stripe style="width: 962px">
                                        <el-table-column prop="id" label="#" align="center" width="80px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="150px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="150px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="显示权限" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column label="建仓" name="second" align="center">
                                                <el-table-column prop="duration" label="挂单买入" align="center" width="80px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="挂单卖出" align="center" width="80px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="挂单撤销" align="center" width="80px">
                                                </el-table-column>
                                        </el-table-column>
                                        <el-table-column label="平仓" name="second" align="center">
                                                <el-table-column prop="duration" label="挂单买入" align="center" width="80px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="挂单卖出" align="center" width="80px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="挂单撤销" align="center" width="80px">
                                                </el-table-column>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="保证金" name="third">
                                <el-table :data="tableDepositData" stripe style="width: 1000px">
                                        <el-table-column prop="id" label="#" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="保证金算法" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="单笔冻结保证金" align="center" width="200px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="单笔占用保证金" align="center" width="200px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="手续费" name="fourth">
                                <el-table :data="tableServiceFeeData" stripe style="width: 962px">
                                        <el-table-column prop="id" label="#" align="center" width="80px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="150px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="150px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="手续费算法" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column label="单笔默认建仓手续费" name="second" align="center">
                                                <el-table-column prop="duration" label="建仓手续费" align="center" width="120px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="上限" align="center" width="120px">
                                                </el-table-column>
                                        </el-table-column>
                                        <el-table-column label="单笔默认平仓手续费" name="second" align="center">
                                                <el-table-column prop="duration" label="平仓手续费" align="center" width="120px">
                                                </el-table-column>
                                                <el-table-column prop="duration" label="上限" align="center" width="120px">
                                                </el-table-column>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="过夜费" name="five">
                                <el-table :data="tableOvernightFeeData" stripe style="width: 880px">
                                        <el-table-column prop="id" label="#" align="center" width="60px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="收取方式" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="过夜费算法" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="买入过夜费" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="卖出过夜费" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="持仓数量" name="six">
                                <el-table :data="tableOvernightFeeData" stripe style="width: 980px">
                                        <el-table-column prop="id" label="#" align="center" width="60px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="单笔最小交易量" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="单笔最大交易量" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="最大买持货量" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="最大卖持货量" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="最大净持货量" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="风险阈值" name="seven">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="报价点差" name="eight">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="审核设置" name="night">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="汇率设置" name="ten">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="最大吃货量" name="eleven">定时任务补偿</el-tab-pane>
                </el-tabs>
        </div>
</template>

<script>
import Vue from "vue";
import request from "@/utils/request";
import {
  Tabs,
  TabPane,
  Button,
  Row,
  Col,
  Input,
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
export default {
  data() {
    return {
      activeName: "first",
      tableBlownData: [],
      tableDepositData: [],
      tableTradingPermissionsData: [],
      tableServiceFeeData: [],
      tableOvernightFeeData: []
    };
  },
  mounted() {
    this.getData("first");
  },
  methods: {
    handleClick(tab, event) {
      this.getData(tab.$options.propsData.name);
      console.log(tab, event);
    },
    getData(tab) {
      var url;
      let that = this;
      switch (tab) {
        case "first":
          url = "/index.php?r=btc/config/price-blown";
          request({
            method: "get",
            url: url
          }).then(res => {
            that.tableBlownData = res.data.data;
            console.log(this.tableBlownData);
          });
          break;
      }
    }
  }
};
</script>