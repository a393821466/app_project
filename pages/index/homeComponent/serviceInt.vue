<template>
<!--客服-->
	<view class="service">
		<view class="service-input">
			<!-- <text class="test service-icon">&#xe60b;</text> -->
			<fonts-icon type="kefu" size='20'></fonts-icon>
			<text class="service-text">联系客服</text>
		</view>
	</view>
</template>

<script>
	import fontsIcon from '@/components/ui-font/'
	export default{
		name:'serviceInt',
		components:{
			fontsIcon
		},
		data(){
			return{
				da:''
			}
		}
	}
</script>

<style lang="scss">
/**
 * 客服 
 */
.service {
	display: flex;
	flex-direction: row-reverse;
	height: 70rpx;
	.service-input {
		align-self: center;
		display: flex;
		.service-text {
			font-size: 30rpx;
			flex: 0 0 120rpx;
			width: 120rpx;
			line-height: 45rpx;
			padding-left:10rpx;
		}
	}
}

</style>
