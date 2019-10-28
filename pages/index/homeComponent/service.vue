<template>
<!--客服-->
<view class="service">
	<view class="service-input" v-if="notice.length>0" @click="goService">
		<!-- <text class="test service-icon">&#xe60b;</text> -->
		<fonts-icon type="kefu"></fonts-icon>
		<text class="service-text">联系客服</text>
	</view>
	<view class="service-skeleton" v-else>
	</view>
</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default{
		name:'service',
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice','merchantInfo']),
		},
		methods:{
			...mapActions(['sendUrl']),
			goService(){
				this.sendUrl(this.merchantInfo.merchantSetting.customerServiceUrl);
				this.$mRouter.push({
					'route':this.$routers.webViewUi
				})
			}
		}
	}
</script>

<style lang='scss'>
/* 客服 */
.service {
	display: flex;
	flex-direction: row-reverse;
	height: 70rpx;
	.service-input {
		align-self: center;
		display: flex;
		.service-text {
			flex: 0 0 150rpx;
			width: 150rpx;
			line-height: 45rpx;
			padding-left:10rpx;
		}
	}
	.service-skeleton{
		width:140rpx;
		height:30rpx;
		margin-top:20rpx;
		border-radius:10rpx;
	}
}
</style>
