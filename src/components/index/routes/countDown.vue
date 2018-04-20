<template>
	<div class="countDown" v-if="countDown">
		<div class="content">倒计时: <span>{{time}}</span></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				time: '',
				timer: ''
			}
		},
		computed: {
			countDown: function() {
				return this.$store.state.user.countDown
			}
		},
		watch:{
			countDown:function(val){
				clearInterval(this.timer);
				this.downTime=val.end - val.current;
		
				this.setTimer();
			}
		},
		mounted() {

		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			setTimer() {
				this.timer = setInterval(() => {

					this.downTime = this.downTime - 1;
					if(this.downTime < 0) {
						clearInterval(this.timer);
						this.countDown = false;
						return;
					}
					this.time = this.timetrans(this.downTime)
				}, 1000)
			},
			timetrans(date) {
		
				//计算出相差天数  
				let days = Math.floor(date / (24 * 3600))

				//计算出小时数  

				let leave1 = date % (24 * 3600) //计算天数后剩余的毫秒数  
				let hours = Math.floor(leave1 / (3600))
				//计算相差分钟数  
				let leave2 = leave1 % (3600) //计算小时数后剩余的毫秒数  
				let minutes = Math.floor(leave2 / (60))
				//计算相差秒数  
				let leave3 = leave2 % (60) //计算分钟数后剩余的毫秒数  
				let seconds = Math.round(leave3)
				return(  days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
			}
		}
	}
</script>

<style scoped lang="less">
	.countDown {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 200;
		background: rgba(255, 255, 255, 0.6);
		.content {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 20px;
			color: #333;
		}
	}
</style>