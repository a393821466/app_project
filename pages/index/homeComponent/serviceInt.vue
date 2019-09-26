<template>
<!--客服-->
	<view class="service">
		<view class="service-input">
			<!-- <text class="test service-icon">&#xe60b;</text> -->
			<fonts-icon type="kefu"></fonts-icon>
			<text class="service-text">联系客服</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:'serviceInt',
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
