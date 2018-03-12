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
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'price')">修改</el-button>
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
                                <el-table :data="tableorderLimitData" stripe style="width: 980px">
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
                        <el-tab-pane label="风险阈值" name="seven">
                                <div style="width: 400px;">
                                        <el-form ref="form" :model="form" label-width="150px">
                                                <el-form-item label="会员预警补仓比率：">
                                                        <el-input v-model="riskData.name" size="small">
                                                                <template slot="append">%</template>
                                                        </el-input>
                                                </el-form-item>
                                                <el-form-item label="会员预警斩仓比率：">
                                                        <el-input v-model="riskData.name" size="small">
                                                                <template slot="append">%</template>
                                                        </el-input>
                                                </el-form-item>
                                                <el-form-item>
                                                </el-form-item>
                                        </el-form>
                                        <div style="margin-left: 50px;">
                                                <el-button type="primary" @click="onRiskSubmit">保存</el-button>
                                                <el-button>取消</el-button>
                                                <el-button>刷新</el-button>
                                        </div>
                                </div>
                        </el-tab-pane>
                        <el-tab-pane label="报价点差" name="eight">
                                <el-table :data="tableorderDiffData" stripe style="width: 560px">
                                        <el-table-column prop="id" label="#" align="center" width="60px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="价点差" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="审核设置" name="night">
                                <el-table :data="tableorderDiffData" stripe style="width: 700px">
                                        <el-table-column prop="id" label="#" align="center" width="60px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="免审核" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="大单组审核" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="汇率设置" name="ten">
                                <el-table :data="tableorderDiffData" stripe style="width: 560px">
                                        <el-table-column prop="id" label="#" align="center" width="60px">
                                        </el-table-column>
                                        <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
                                        </el-table-column>
                                        <el-table-column prop="duration" label="美金汇率" align="center" width="120px">
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                                </template>
                                        </el-table-column>
                                </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="最大吃货量" name="eleven">定时任务补偿4</el-tab-pane>
                </el-tabs>
                <!-- 各个设置的弹窗部份 -->
                <el-dialog title="价格熔断设置" :visible.sync="dialogPriceVisible" width="30%" :before-close="handleClose">
                        <span>这是一段信息</span>
                        <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                </el-dialog>
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
      tableOvernightFeeData: [],
      tableorderLimitData: [],
      riskData: {},
      tableorderDiffData: [],
      dialogPriceVisible: false
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
            url: url,
            data: {
              firstName: "Fred"
            }
            //     params: {
            //       ID: 12345
            //     }
          }).then(res => {
            that.tableBlownData = res.data.data;
            console.log(this.tableBlownData);
          });
          break;
      }
    },
    onRiskSubmit() {},
    handleEdit(index, row, type) {
      alert(1111);
      // console.log(index,row,type);
    }
  }
};
</script>