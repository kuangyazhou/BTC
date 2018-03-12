<template>
    <div class="common-proxy">
        <el-row type="flex" justify="space-between">
            <el-col :span="16">
                <!-- {{'11130' | currency}} -->
                <el-row>
                    <el-col :span="8">
                        {{title}}代理名称:
                        <el-input class="w100" size="mini"></el-input>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        {{title}}代理帐号:
                        <el-input size="mini" class="w100"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-button size="mini" @click="add">新增</el-button>
                <el-button size="mini">查询</el-button>
                <el-button size="mini">重置</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:1em">
            <el-col :span="24">
                <el-table :border="false" size="mini" :data="oneData" style="width: 100%">
                    <el-table-column type="index" align="center">
                    </el-table-column>
                    <el-table-column prop="name" align="center" :label="title+'代理名称'">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.name}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="account" align="center" :label="title+'代理帐号'">
                    </el-table-column>
                    <el-table-column prop="limit" align="center" label="信用额度" width="80">
                    </el-table-column>
                    <el-table-column prop="balance" align="center" label="信用余额" width="80">
                    </el-table-column>
                    <el-table-column prop="one" align="center" :label="title+'代理'" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.one}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="two" align="center" label="二级代理" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.two}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="three" align="center" label="三级代理" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.three}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="four" align="center" label="四级代理" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.four}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="five" align="center" label="五级代理" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info">{{scope.row.five}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="member" align="center" label="会员" width="50">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="viewMember(scope)" type="info">{{scope.row.member}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cash" align="center" label="保证金比例">
                    </el-table-column>
                    <el-table-column prop="addTime" align="center" label="新增时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-dropdown @command="operate">
                                <span class="el-dropdown-link">
                                    <i class="fa fa-chevron-down"></i>
                                    <!-- 操作 -->
                                    <!-- <i class="el-icon-arrow-down el-icon-right"></i> -->
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
        <!-- <el-button type="primary" @click="primary">主要按钮</el-button> -->
        <!-- <div id="main" style="width:1000px;height:500px;"></div> -->
        <!-- <el-row :gutter="10">
      <el-col :span="5">
        <span>管理员帐号</span>
        <el-input class="w100" size="mini" prefix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="5">
        <span>管理员名称</span>
        <el-input class="w100" size="mini" prefix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="5">
        <span>管理员状态</span>
        <el-input class="w100" size="mini" prefix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="8" :push="3">
        <el-button size="mini">查询</el-button>
        <el-button size="mini">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="2" style="margin-top:1em;">
      <el-col :span="24">
        <el-button size="mini" type="primary" @click="add">新增</el-button>
        <el-button size="mini" type="primary">修改基础信息</el-button>
        <el-button size="mini">修改登录密码</el-button>
        <el-button size="mini">角色分配</el-button>
        <el-button size="mini">详细</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="2" style="margin-top:1em;">
      <el-col :span="22">
        <el-table :border="false" size="mini" :data="tableData" style="width: 100%">
          <el-table-column type="selection" align="center">
          </el-table-column>
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column prop="name" align="center" label="管理员帐户">
          </el-table-column>
          <el-table-column prop="nickname" align="center" label="管理员名称">
          </el-table-column>
          <el-table-column prop="role" align="center" label="所属角色">
          </el-table-column>
          <el-table-column prop="status" align="center" label="状态">
          </el-table-column>
          <el-table-column prop="control" align="center" label="是否允许登录风控端">
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="validTime" align="center" label="有效时间">
          </el-table-column>
          <el-table-column prop="lastLogin" align="center" label="上次登录时间">
          </el-table-column>
          <el-table-column prop="lastIp" align="center" label="上次登录ip">
          </el-table-column>
          <el-table-column prop="des" align="center" label="描述">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row> -->
        <el-dialog :title="'新增'+title+'代理'" top="1vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
            <el-form label-width="100px" :inline="true" ref="form" size="mini" :rules="rules" :model="form">
                <el-row>
                    <el-col :span="6">
                        <el-form-item :label="title+'代理帐号'" prop="account">
                            <el-input v-model="form.account" name="username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="title+'代理名称'" prop="name">
                            <el-input v-model="form.name" name="name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" type="password" name="pwd"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="确认密码" prop="confirm">
                            <el-input type="password" v-model="form.confirm" name="confirm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item style="width:100%" label="现金or信用">
                            <el-select size="mini" v-model="form.type" style="width:92%">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="title+'代理及下级占成总数'" prop="total">
                            <el-input v-model="form.total" name="total"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="信用额度" prop="limit">
                            <el-input v-model="form.limit" name="belive"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手续费比例" prop="charge">
                            <el-input v-model="form.charge" name="charge"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
        </el-row> -->
                <!-- <el-form-item label="支付通道">
          <el-radio v-model="patyType" label="1">支付宝</el-radio>
          <el-radio v-model="patyType" label="2">银行卡</el-radio>
        </el-form-item> -->
            </el-form>
            <el-row>
                <el-col>
                    <el-table :data="frozenData" :border="false" size="mini" style="width: 20%">
                        <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
                        <!-- <el-table-column label="单笔冻结保证金">
              <template slot-scope="scope">
                <el-select size="mini" v-model="form.type">
                  <el-option v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column> -->
                        <el-table-column align="center" label="单笔冻结保证金">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="frozenModel">
                                    <el-option v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col>
                    <el-table :data="frozenData" :border="false" size="mini" style="width:20%">
                        <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
                        <el-table-column align="center" label="点差返佣">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="reBateModel">
                                    <el-option v-for="item in frozen" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col style="margin-top:0.5em;">
                    <el-table :data="productData" :border="false" size="mini" style="width: 60%">
                        <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
                        <el-table-column align="center" label="单笔最小交易量">
                            <template slot-scope="scope">
                                <!-- <el-select size="mini" v-model="minDeal">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                                <el-input v-model="form.charge" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="单笔最大交易量">
                            <template slot-scope="scope">
                                <!-- <el-select size="mini" v-model="maxDeal">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                                <el-input v-model="form.charge" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="最大买持货量">
                            <template slot-scope="scope">
                                <!-- <el-select size="mini" v-model="maxKeep">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                                <el-input v-model="form.charge" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="最大卖持货量">
                            <template slot-scope="scope">
                                <!-- <el-select size="mini" v-model="maxSale">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                                <el-input v-model="form.charge" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="最大净持货量">
                            <template slot-scope="scope">
                                <!-- <el-select size="mini" v-model="maxRemain">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                                <el-input v-model="form.charge" size="mini"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col style="margin-top:0.5em">
                    <!-- 表头合并后,hover颜色永久存在 -->
                    <el-table :data="wareData" :border="false" size="mini" style="width: 100%">
                        <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
                        <el-table-column align="center" label="显示权限">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="wareLimits.showLimit">
                                    <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="建仓">
                            <el-table-column align="center" label="挂单买入">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.buildBuy">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="挂单卖出">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.buildSale">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="挂单撤销">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.buildRepeal">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="平仓">
                            <el-table-column align="center" label="挂单买入">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.equalBuy">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="挂单卖出">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.equalSale">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="挂单撤销">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="wareLimits.equalRepeal">
                                        <el-option v-for="item in limits" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Dialog,
  Radio,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  name: "Proxy",
  data() {
    return {
      msg: "account",
      dialogVisible: false,
      patyType: "1",
      minDeal: "",
      reBateModel: "10%",
      wareLimits: {
        showLimit: "1",
        buildBuy: "1",
        buildSale: "1",
        buildRepeal: "1",
        equalBuy: "1",
        equalSale: "1",
        equalRepeal: "1"
      },
      minDealOptions: [
        {
          value: "1",
          label: "现金"
        },
        {
          value: "cash",
          label: "现金"
        }
      ],
      maxDeal: "",
      maxKeep: "",
      maxSale: "",
      maxRemain: "",
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        limit: [
          { required: true, message: "信用额度不能为空", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "cash",
          label: "现金"
        },
        {
          value: "credit",
          label: "信用"
        }
      ],
      limits: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      form: {
        formError: null,
        account: "",
        name: "",
        password: "",
        confirm: "",
        type: "cash",
        total: "",
        limit: "",
        charge: ""
      },
      oneData: [
        {
          name: "a001",
          account: "a001",
          limit: "50000",
          balance: "10000",
          one: "80%",
          two: "0",
          three: "0",
          four: "0",
          five: "0",
          member: "0",
          cash: "0",
          addTime: "2017年5月23日 14:46:58"
        },
        {
          name: "a001",
          account: "a001",
          limit: "50000",
          balance: "10000",
          one: "80%",
          two: "0",
          three: "0",
          four: "0",
          five: "0",
          member: "0",
          cash: "0",
          addTime: "2017年5月23日 14:46:58"
        }
      ],
      frozenData: [
        {
          productName: "比特币"
        }
      ],
      frozenModel: "10%",
      frozen: [
        {
          value: "10%",
          label: "10%"
        },
        {
          value: "20%",
          label: "20%"
        },
        {
          value: "30%",
          label: "30%"
        }
      ],
      wareData: [
        // {
        //   productName: "比特币"
        // },
        {
          productName: "比特币",
          showLimit: "有",
          buildBuy: "有",
          buildSale: "有",
          buildRepeal: "有",
          equalBuy: "有",
          equalSale: "有",
          equalRepeal: "有"
        }
      ],
      productData: [
        {
          productName: "比特币",
          minDeal: "1",
          maxDeal: "100",
          maxKeep: "500",
          maxSale: "800",
          maxRemain: "600"
        }
      ],
      tableData: [
        {
          name: "admin1",
          nickname: "王小虎",
          role: "上海市普陀区金沙江路 1518 弄",
          status: "启用",
          control: "允许",
          createTime: "2017-08",
          validTime: "2018-09",
          lastLogin: "2017-10",
          lastIp: "172.11.16",
          des: "系统超级管理员"
        },
        {
          name: "admin1",
          nickname: "王小虎",
          role: "上海市普陀区金沙江路 1518 弄",
          status: "启用",
          control: "允许",
          createTime: "2017-08",
          validTime: "2018-09",
          lastLogin: "2017-10",
          lastIp: "172.11.16",
          des: "系统超级管理员"
        },
        {
          name: "admin1",
          nickname: "王小虎",
          role: "上海市普陀区金沙江路 1518 弄",
          status: "启用",
          control: "允许",
          createTime: "2017-08",
          validTime: "2018-09",
          lastLogin: "2017-10",
          lastIp: "172.11.16",
          des: "系统超级管理员"
        },
        {
          name: "admin1",
          nickname: "王小虎",
          role: "上海市普陀区金沙江路 1518 弄",
          status: "启用",
          control: "允许",
          createTime: "2017-08",
          validTime: "2018-09",
          lastLogin: "2017-10",
          lastIp: "172.11.16",
          des: "系统超级管理员"
        }
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: "一级"
    },
    level: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    operate() {},
    onSubmit() {},
    viewMember() {}
  }
};
</script>

<style scoped>

</style>