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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'first')">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="交易权限" name="second">
        <el-table :data="tableTradingPermissionsData" stripe style="width: 962px">
          <el-table-column prop="id" label="#" align="center" width="80px">
          </el-table-column>
          <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
            <template slot-scope="scope">
              {{ "比特币" }}
            </template>
          </el-table-column>
          <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
            <template slot-scope="scope">
              {{ scope.row.type == 1 ? "现金" : "信用" }}
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="显示权限" align="center" width="100px">
            <template slot-scope="scope">
              {{ scope.row.show_flag == 1 ? "有" : "无" }}
            </template>
          </el-table-column>
          <el-table-column label="建仓" name="second" align="center">
            <el-table-column prop="duration" label="挂单买入" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.open_order_buy == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="挂单卖出" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.open_order_sale == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="挂单撤销" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.open_order_undo == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="平仓" name="second" align="center">
            <el-table-column prop="duration" label="挂单买入" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.close_order_buy == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="挂单卖出" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.close_order_sale == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="挂单撤销" align="center" width="80px">
              <template slot-scope="scope">
                {{ scope.row.close_order_undo == 1 ? "有" : "无" }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'second')">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="保证金" name="third">
        <el-table :data="tableDepositData" stripe style="width: 800px">
          <el-table-column prop="id" label="#" align="center" width="100px">
          </el-table-column>
          <el-table-column prop="level_name" label="商品名称" align="center" width="100px">
            <template slot-scope="scope">
              {{ "比特币" }}
            </template>
          </el-table-column>
          <el-table-column prop="price_percentage" label="类型" align="center" width="100px">
            <template slot-scope="scope">
              {{ scope.row.type == 1 ? "现金" : "信用" }}
            </template>
          </el-table-column>
          <el-table-column prop="single_frozen_percentage" label="保证金算法" align="center" width="100px">
            <template slot-scope="scope">
              {{ "比例" }}
            </template>
          </el-table-column>
          <el-table-column prop="single_frozen_percentage" label="单笔冻结保证金" align="center" width="150px">
            <template slot-scope="scope">
              {{ scope.row.single_frozen_percentage + "%" }}
            </template>
          </el-table-column>
          <el-table-column prop="single_used_percentage" label="单笔占用保证金" align="center" width="150px">
            <template slot-scope="scope">
              {{ scope.row.single_used_percentage + "%" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'third')">修改
              </el-button>
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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
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
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="最大吃货量" name="eleven">定时任务补偿4</el-tab-pane>
    </el-tabs>
    <!-- 各个设置的弹窗部份 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogPriceVisible" :width="dialogWidth" close-on-click-modal="true" top="0">
      <el-form ref="dialogData" :model="dialogData" label-width="150px">
        <!-- 价格熔断部份 -->
        <div v-if="dialogType=='first'">
          <el-form-item label="阶梯：">
            <el-input v-model="dialogData.level_name" size="small" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="价格浮动：">
            <el-select v-model="dialogData.price_percentage" placeholder="请选择">
              <el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格持续时间/分钟：">
            <el-input-number size="mini" v-model="dialogData.duration" :min="0" :max="60"></el-input-number>
          </el-form-item>
        </div>
        <!-- 交易权限部份 -->
        <div v-if="dialogType=='second'">
          <el-form-item label="商品名称：">
            <el-input size="small" :disabled="true" value="比特币">
            </el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? '现金' : '信用'">
            </el-input>
          </el-form-item>
          <el-form-item label="显示权限：">
            <el-select v-model="dialogData.show_flag" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建仓挂单买入：">
            <el-select v-model="dialogData.open_order_buy" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建仓挂单卖出：">
            <el-select v-model="dialogData.open_order_sale" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建仓挂单撤消：">
            <el-select v-model="dialogData.open_order_undo" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平仓挂单买入：">
            <el-select v-model="dialogData.close_order_buy" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平仓挂单卖出：">
            <el-select v-model="dialogData.close_order_sale" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平仓挂单撤消：">
            <el-select v-model="dialogData.close_order_undo" placeholder="请选择">
              <el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 保证金部份 -->
        <div v-if="dialogType=='third'">
          <el-form-item label="商品名称：">
            <el-input size="small" :disabled="true" value="比特币">
            </el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? '现金' : '信用'">
            </el-input>
          </el-form-item>
          <el-form-item label="保证金算法：">
            <el-input size="small" :disabled="true" value="比例">
            </el-input>
          </el-form-item>
          <el-form-item label="单笔冻结保证金：">
            <el-select v-model="dialogData.single_frozen_percentage" placeholder="请选择">
              <el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单笔占用保证金：">
            <el-select v-model="dialogData.single_used_percentage" placeholder="请选择">
              <el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPriceVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSave" :loading="dialogLoading">确 定</el-button>
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
  FormItem,
  InputNumber,
  Select,
  Option
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
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
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
      dialogPriceVisible: false,
      dialogTitle: "",
      dialogData: {},
      dialogWidth: "400px",
      dialogType: "",
      dialogLoading: false,
      priceSteps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      privilegesOption: [{ k: 0, v: "无" }, { k: 1, v: "有" }],
      form: []
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
          });
          break;
        case "second":
          url = "/index.php?r=btc/config/trade-permission";
          request({
            method: "get",
            url: url
          }).then(res => {
            that.tableTradingPermissionsData = res.data.data;
          });
          break;
        case "third":
          url = "/index.php?r=btc/config/deposit";
          request({
            method: "get",
            url: url
          }).then(res => {
            that.tableDepositData = res.data.data;
          });
          break;
      }
    },
    onRiskSubmit() {},
    handleEdit(index, row, type) {
      this.dialogPriceVisible = true;
      switch (type) {
        case "first":
          this.dialogTitle = "价格熔断设置";
          this.dialogData = row;
          this.dialogWidth = "500px";
          this.dialogType = type;
          break;
        case "second":
          this.dialogTitle = "交易权限设置";
          this.dialogData = row;
          this.dialogWidth = "500px";
          this.dialogType = type;
          break;
        case "third":
          this.dialogTitle = "保证金设置";
          this.dialogData = row;
          this.dialogWidth = "500px";
          this.dialogType = type;
          break;
      }
    },
    dialogSave() {
      var url;
      this.dialogLoading = true;
      switch (this.dialogType) {
        case "first":
          url = "/index.php?r=btc/config/price-blown-save";
          break;
        case "second":
          url = "/index.php?r=btc/config/trade-permission-save";
          break;
        case "third":
          url = "/index.php?r=btc/config/deposit-save";
          break;
      }
      request({
        method: "post",
        data: this.dialogData,
        url: url
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          alert("保存成功！");
          this.dialogPriceVisible = false;
        } else {
          alert("保存失败！");
        }
      });
      this.dialogLoading = false;
    }
  }
};
</script>