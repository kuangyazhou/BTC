<template>
	<div class="withDraw">
		<el-row class="head">
			<span>可提款金额
				<strong>0</strong>
			</span>
			<span>手续费
				<strong>0</strong>
			</span>
		</el-row>
		<el-row class="list">
			<span>提款银行卡</span>
			<span>
				<a v-for="(item,index) in cardList" :key="index" :class="{'select':value==item.value}">
					<span>{{item.bankName}}</span>
					<strong>{{item.name}}</strong>
					<label>{{item.cardNumber}}</label>
				</a>
			</span>
		</el-row>
		<div class="form">
			<el-form ref="form" :model="form" label-width="120px" size="small">
				<el-row>
					<el-col :span="6">
						<el-form-item label="提款金额">
							<el-input v-model="form.number" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<span>单次提现金额 50.0000~1000000.0000元</span>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="资金密码">
							<el-input v-model="form.password" size="small"></el-input>
						</el-form-item>
					</el-col>

				</el-row>

			</el-form>
		</div>
		<el-button>提交申请</el-button>
		<el-button @click="$router.push({'path':'./drawingProgress'})">查看提款进度</el-button> 
		<el-button>查看流水</el-button>
	</div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      form: {
        number: "",
        password: ""
      },
      cardList: [
        {
          value: 0,
          bankName: "中国建设银行",
          name: "王尼玛",
          cardNumber: "6212***********5373"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.withDraw {
  margin: 40px 0 0 80px;
}
li {
}
.el-row {
  margin-bottom: 20px;
}
.form {
  margin-left: -52px;
  span {
    display: inline-block;
    vertical-align: middle;
    margin-top: 5px;
  }
  .el-row {
    margin-bottom: 0;
  }
}

.head {
  span {
    color: #666;
    margin-right: 50px;
  }
  strong {
    font-size: 20px;
    color: #e95656;
    vertical-align: middle;
  }
}
</style>