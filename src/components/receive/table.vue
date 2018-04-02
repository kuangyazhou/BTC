<template>
  <div class="receive-table">
    <!--  style="width: 99%;" -->
    <el-row v-show="receiveItem=='member'" key="member">
      <el-col>
        <el-table :data="memberMoney" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="会员帐号" align="center" prop="account"></el-table-column>
          <el-table-column label="会员名称" align="center" prop="name"></el-table-column>
          <el-table-column label="风险覆盖率" align="center" prop="risk"></el-table-column>
          <el-table-column label="浮动盈亏" align="center" prop="float"></el-table-column>
          <el-table-column label="当前资产" align="center" prop="property"></el-table-column>
          <el-table-column label="可用保证金" align="center" prop="cash"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="equalHandle(scope.row)">强平</el-button>
              <el-button size="mini" @click="raplHandl(scope.row)">补仓</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- <transition name="el-fade-in"> -->
    <el-row v-show="receiveItem=='net'" key="net">
      <el-col>
        <el-table :data="netData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="商品名称" align="center" prop="name"></el-table-column>
          <el-table-column label="当前买价格" align="center" prop="buy"></el-table-column>
          <el-table-column label="点差" align="center" prop="spread"></el-table-column>
          <el-table-column label="当前卖价格" align="center" prop="sale"></el-table-column>
          <el-table-column label="参考价" align="center" prop="refer"></el-table-column>
          <el-table-column label="买入总数量" align="center" prop="buyNum"></el-table-column>
          <el-table-column label="卖出总数量" align="center" prop="saleNum"></el-table-column>
          <el-table-column label="净头寸" align="center" prop="what"></el-table-column>
          <el-table-column label="最大持货量" align="center" prop="max_keep"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- </transition> -->
    <el-row v-show="receiveItem=='detail'" key="detail">
      <el-col>
        <el-table :data="productDetail" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="会员帐号" align="center" prop="account"></el-table-column>
          <el-table-column label="会员名称" align="center" prop="name"></el-table-column>
          <el-table-column label="持货单号" align="center" prop="orderNum"></el-table-column>
          <el-table-column label="持仓时间" align="center" prop="keepTime"></el-table-column>
          <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
          <el-table-column label="买卖方向" align="center" prop="direction"></el-table-column>
          <el-table-column label="持仓数量" align="center" prop="keepNum"></el-table-column>
          <el-table-column label="止损价" align="center" prop="loos"></el-table-column>
          <el-table-column label="止盈价" align="center" prop="profit"></el-table-column>
          <el-table-column label="建仓价" align="center" prop="openPrice"></el-table-column>
          <el-table-column label="当前价" align="center" prop="currentPrice"></el-table-column>
          <el-table-column label="持有天数" align="center" prop="keepDay"></el-table-column>
          <el-table-column label="浮动盈亏" align="center" prop="float"></el-table-column>
          <el-table-column label="占用保证金" align="center" prop="used"></el-table-column>
          <el-table-column label="公司占成数量" align="center" prop="company"></el-table-column>
          <el-table-column label="公司占成浮动盈亏" align="center" prop="companyFloat"></el-table-column>
          <el-table-column label="建仓时间" align="center" prop="openTime"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="productClose(scope.row)">强平</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="receiveItem=='deal'" key="deal">
      <el-col>
        <el-table :data="dealData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="会员帐号" align="center" prop="account"></el-table-column>
          <el-table-column label="会员名称" align="center" prop="name"></el-table-column>
          <el-table-column label="成交单号" align="center" prop="orderNum"></el-table-column>
          <el-table-column label="持仓单号" align="center" prop="keepNum"></el-table-column>
          <el-table-column label="成交时间" align="center" prop="dealTime"></el-table-column>
          <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
          <el-table-column label="建仓/平仓" align="center" prop="keepClose"></el-table-column>
          <el-table-column label="买卖方向" align="center" prop="direction"></el-table-column>
          <el-table-column label="成交量" align="center" prop="dealNum"></el-table-column>
          <el-table-column label="成交金额" align="center" prop="dealPrice"></el-table-column>
          <el-table-column label="建仓价" align="center" prop="openPrice"></el-table-column>
          <el-table-column label="持仓价" align="center" prop="keepPrice"></el-table-column>
          <el-table-column label="平仓价" align="center" prop="closePrice"></el-table-column>
          <el-table-column label="实际盈亏" align="center" prop="profit"></el-table-column>
          <el-table-column label="会员手续费" align="center" prop="memberCharge"></el-table-column>
          <el-table-column label="会员过夜费" align="center" prop="memberNight"></el-table-column>
          <el-table-column label="公司占成数" align="center" prop="companyPen"></el-table-column>
          <el-table-column label="公司占成盈亏" align="center" prop="companyProfit"></el-table-column>
          <el-table-column label="公司占成手续费" align="center" prop="companyCharge"></el-table-column>
          <el-table-column label="公司占成过夜费" align="center" prop="companyNight"></el-table-column>
          <el-table-column label="成交类型" align="center" prop="dealType"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="receiveItem=='audit'" key="audit">
      <el-col>
        <el-table :data="auditData" size='mini' :border="false" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="会员帐号" align="center" prop="account"></el-table-column>
          <el-table-column label="会员名称" align="center" prop="name"></el-table-column>
          <el-table-column label="委托单号" align="center" prop="auditNum"></el-table-column>
          <el-table-column label="委托时间" align="center" prop="auditTime"></el-table-column>
          <el-table-column label="委托类型" align="center" prop="auditType"></el-table-column>
          <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
          <el-table-column label="建仓/平仓" align="center" prop="keepClose"></el-table-column>
          <el-table-column label="买卖方向" align="center" prop="direction"></el-table-column>
          <el-table-column label="委托数量" align="center" prop="auditNum"></el-table-column>
          <el-table-column label="会员点差" align="center" prop="spread"></el-table-column>
          <el-table-column label="委托价" align="center" prop="auditPrice"></el-table-column>
          <el-table-column label="止损价" align="center" prop="loss"></el-table-column>
          <el-table-column label="止盈价" align="center" prop="profit"></el-table-column>
          <el-table-column label="会员手续费" align="center" prop="memberCharge"></el-table-column>
          <el-table-column label="公司占成数量" align="companyPen" prop="company"></el-table-column>
          <el-table-column label="公司占成手续费" align="center" prop="companyCharge"></el-table-column>
          <el-table-column label="模式" align="center" prop="auditType"></el-table-column>
          <el-table-column label="审核" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="productClose(scope.row)">通过/不通过</el-button> -->
              <el-dropdown @command="command=>operate(command,scope.row)">
                <span class="el-dropdown-link">
                  <i class="fa fa-chevron-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">
                    通过
                  </el-dropdown-item>
                  <el-dropdown-item command="0">
                    不通过
                  </el-dropdown-item>
                  <el-dropdown-item command="2">
                    修改
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="强平操作" :visible="equalSwitch" :before-close="equalClose" width="80%">
      <el-row>
        <el-col>
          <el-form :inline="true">
            <el-form-item label="会员帐号">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="强平价格">
              <el-input size="mini"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="dealData" :border="false" size="mini" v-loading="loading" :element-loading-text="$t('message.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.2, 0.2, 0.8)">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="持货单号" align="center" prop="orderNum"></el-table-column>
            <el-table-column label="持仓时间" align="center" prop="keepTime"></el-table-column>
            <el-table-column label="商品名称" align="center" prop="productName"></el-table-column>
            <el-table-column label="买卖方向" align="center" prop="direction"></el-table-column>
            <el-table-column label="持仓数量" align="center" prop="keepNum"></el-table-column>
            <el-table-column label="止损价" align="center" prop="loss"></el-table-column>
            <el-table-column label="止盈价" align="center" prop="profit"></el-table-column>
            <el-table-column label="建仓价" align="center" prop="openPrice"></el-table-column>
            <el-table-column label="持仓价" align="center" prop="closePrice"></el-table-column>
            <el-table-column label="当前价" align="center" prop="currentPrice"></el-table-column>
            <el-table-column label="持有天数" align="center" prop="keepDay"></el-table-column>
            <el-table-column label="浮动盈亏" align="center" prop="float"></el-table-column>
            <el-table-column label="占用保证金" align="center" prop="used"></el-table-column>
            <el-table-column label="公司占成数理" align="center" prop="companyPen"></el-table-column>
            <el-table-column label="公司占成浮动盈亏" align="companyPen" prop="companyFloat"></el-table-column>
            <el-table-column label="建仓时间" align="center" prop="openTime"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="equalClose">取消</el-button>
        <el-button size="mini">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="补仓操作" :visible="raplSwitch" :before-close="raplClose">
      <el-form :inline="true">
        <el-form-item label="会员帐号">
          <el-input size="mini"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名">
          <el-input size="mini"></el-input>
        </el-form-item>
        <el-form-item label="补仓金额">
          <el-input size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="raplClose">取消</el-button>
        <el-button size="mini">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="委托审核" :visible="entrustSwitch">
      <el-row>
        <el-col>
          <el-form size="mini" :inline="true">
            <el-form-item label="会员帐号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="委托数量">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="委托价格">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="entrustSwitch=false">取消</el-button>
        <el-button size="mini">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="点差修改" :visible="updateSwitch">
      <el-row>
        <el-col>
          <!--  label-width="80px" -->
          <el-form size="mini" :inline="true" label-width="70px">
            <el-form-item label="会员帐号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="会员名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="点差">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="权限">
              <el-checkbox-group v-model="updateAuth">
                <el-checkbox v-for="item in forbid" :key="item.value" :label="item.value">{{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateSwitch=false">取消</el-button>
        <el-button size="mini">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Row,
  Col,
  Form,
  FormItem,
  Button,
  Loading,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Checkbox,
  CheckboxGroup
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  name: "ReceiveTable",
  props: {
    receiveItem: {
      type: String,
      default: "member"
    }
  },
  data() {
    return {
      msg: "table",
      loading: false,
      equalSwitch: false,
      raplSwitch: false,
      entrustSwitch: false,
      updateSwitch: false,
      updateAuth: [],
      forbid: [
        { label: "禁止卖", value: "forbidSale" },
        { label: "禁止买", value: "forbidBuy" }
      ],
      memberMoney: [
        {
          account: "a001",
          name: "张三",
          risk: "10%",
          float: "-95000",
          property: "10000",
          cash: "1000"
        },
        {
          account: "a001",
          name: "张三",
          risk: "10%",
          float: "-95000",
          property: "10000",
          cash: "1000"
        }
      ],
      netData: [
        {
          name: "比特币",
          buy: "10005",
          spread: "5",
          sale: "1000",
          refer: "10001",
          buyNum: "1",
          saleNum: "10",
          what: "9",
          max_keep: "50"
        },
        {
          name: "比特币",
          buy: "10005",
          spread: "5",
          sale: "1000",
          refer: "10001",
          buyNum: "1",
          saleNum: "10",
          what: "9",
          max_keep: "50"
        }
      ],
      productDetail: [
        {
          account: "a001",
          name: "张三",
          orderNum: "t151010101",
          keepTime: "2015-5-5",
          productName: "BTC",
          direction: "买",
          keepNum: "1",
          loos: "2",
          profit: "3",
          openPrice: "1000",
          currentPrice: "0.1",
          keepDay: "1",
          float: "5",
          used: "1000",
          company: "100",
          companyFloat: "101",
          openTime: "2017-03-28"
        },
        {
          account: "a002",
          name: "张三",
          orderNum: "t151010101",
          keepTime: "2015-5-5",
          productName: "BTC",
          direction: "买",
          keepNum: "1",
          loos: "2",
          profit: "3",
          openPrice: "1000",
          currentPrice: "0.1",
          keepDay: "1",
          float: "5",
          used: "1000",
          company: "100",
          companyFloat: "101",
          openTime: "2017-03-28"
        }
      ],
      dealData: [
        {
          account: "a001",
          name: "张三",
          orderNum: "t151010101",
          keepNum: "T151OB",
          dealTime: "2016-1-1",
          productName: "BTC",
          keepClose: "建仓",
          direction: "买",
          dealNum: "1",
          dealPrice: "10000",
          openPrice: "0.1",
          keepPrice: "0.2",
          closePrice: "0.3",
          profit: "500",
          memberCharge: "1",
          memberNight: "2",
          companyPen: "3",
          companyProfit: "4",
          companyCharge: "5",
          companyNight: "6",
          dealType: "未知"
        },
        {
          account: "a001",
          name: "张三",
          orderNum: "t151010101",
          keepNum: "T151OB",
          dealTime: "2016-1-1",
          productName: "BTC",
          keepClose: "建仓",
          direction: "买",
          dealNum: "1",
          dealPrice: "10000",
          openPrice: "0.1",
          keepPrice: "0.2",
          closePrice: "0.3",
          profit: "500",
          memberCharge: "1",
          memberNight: "2",
          companyPen: "3",
          companyProfit: "4",
          companyCharge: "5",
          companyNight: "6",
          dealType: "未知"
        }
      ],
      auditData: [
        {
          account: "a001",
          name: "张三",
          auditNum: "t151010101",
          auditTime: "2016-1-1",
          auditType: "市价委托",
          productName: "BTC",
          keepClose: "建仓",
          direction: "买",
          auditNum: "12",
          spread: "3",
          auditPrice: "1000",
          loss: "1000",
          profit: "233",
          memberCharge: "1.1",
          company: "2",
          companyCharge: "3",
          auditType: "现金"
        },
        {
          account: "a001",
          name: "张三",
          auditNum: "t151010101",
          auditTime: "2016-1-1",
          auditType: "市价委托",
          productName: "BTC",
          keepClose: "建仓",
          direction: "买",
          auditNum: "12",
          spread: "3",
          auditPrice: "1000",
          loss: "1000",
          profit: "233",
          memberCharge: "1.1",
          company: "2",
          companyCharge: "3",
          auditType: "现金"
        }
      ],
      equalData: []
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.$emit("update:receiveItem", "audit");
    // }, 3000);
  },
  methods: {
    operate(e, scope) {
      // console.log(e, scope);
      switch (e) {
        case "0":
          break;
        case "1":
          this.entrustSwitch = true;
          break;
        case "2":
          this.updateSwitch = true;
          break;
        default:
      }
    },
    productClose(e) {
      // console.log(e);
    },
    equalHandle(e) {
      // console.log(e);
      this.equalSwitch = true;
    },
    equalClose() {
      this.equalSwitch = false;
    },
    raplHandl(e) {
      console.log(e);
      this.raplSwitch = true;
    },
    raplClose() {
      this.raplSwitch = false;
    }
  }
};
</script>

<style scoped>

</style>
