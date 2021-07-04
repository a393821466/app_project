<template>
<!-- 新手引导 -->
<view class="news_prople">
	<view class="news_perple_content">
		<view class="news_title">
			<text>新手引导</text>
		</view>
		<view class="news_images">
			<text class="news_text">新手引导-快速上手-日进斗金</text>
		</view>
	</view>
	<!-- <view class="new_perple_content">
		<view class="news_title_box">
		</view>
		<view class="news_skeleton"></view>
	</view> -->
</view>
</template>

<script>
import {
	mapActions,
	mapGetters
} from 'vuex'
import config from '@/common/utils/config'
export default{
	name:'news_person',
	data(){
		return{
			da:false
		}
	},
	methods:{
	}
}
</script>

<style lang="scss">
/*
** 新手引导
*/
.news_prople{
	background:#fff;
	margin-top:20upx;
	padding:20upx;
	.news_images{
		width:100%;
		height:52rpx;
		background:url('../../../static/images/new_prople.png') no-repeat;
		background-size:cover;
		margin-top:15rpx;
	}
	.news_text{
		line-height:52rpx;
		text-align:center;
		display:block;
	}
	.news_title_box{
		width:140rpx;
		height:45rpx;
		border-radius:8rpx;
		margin-bottom:10rpx;
	}
	.news_skeleton{
		width:100%;
		height:52rpx;
		border-radius:8rpx;
	}
}
</style>
