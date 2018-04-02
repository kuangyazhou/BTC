<template>
	<div class="pay1">
		<div class="head">
			请选择银行入款卡号
		</div>
		<div class="cardInfo">
			<div class="icon">
				
			</div>
			<ul class="">
				<li>开户银行：华夏支行</li>
				<li>开户网点：北京志超有限公司北京志超有限公司</li>
				<li>收款账户：10250000066 10250000066</li>
				<li>收款人：北京大大有限和公司</li>
			</ul>
		</div>
		<el-button @click="next">下一步</el-button>
		<div class="notice">
			<p>转账须知：</p>
			<p>*单笔最低存款金额0元</p>
			<p>*单笔最高存款金额0元</p>
			<p>*以上银行账号仅限本次使用，账号不定期更换！请您根据本页面所提供的收款账号进行转账，若存款至过期账号，本公司恕不负责！</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			next(){
				this.$router.push({'path':'/pay2'})
			}
		}
	}
</script>

<style lang="less" scoped>
   .pay1{
	   	text-align: left;
	   	.cardInfo{
	   		overflow:hidden;
	   		margin: 10px 0;
	   		border:1px dashed #cacaca;
	   		width: 270px;
	   		padding: 13px 0 20px 20px;
	   		.icon{
	   			width: 50px;
    			height: 38px;
    			background: url(./img/rbank-icon.png) no-repeat;
	   		    background-position: 0 -555px;
				float:left;
	   		}
	   		ul{	
	   			width:180px;
		   		float:left;
		   		margin: 0;
		   		margin-left: 10px;
		   		padding: 0;
		   		li{
			   		list-style: none;
			   	    word-break: break-all;
			   		word-wrap: break-word;
			   	}
		   	}
	   	}
	   
	   	
   }
</style>