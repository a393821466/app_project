<template>
<!--新手引导-->
<view class="news_prople">
	<view class="news_title">
		<text>新手引导</text>
	</view>
	<view class="news_images">
		<text class="news_text">新手引导-快速上手-日进斗金</text>
	</view>
</view>
</template>

<script>
export default{
	name:'guide',
	data(){
		return{
			da:''
		}
	}
}
</script>

<style>
/*
** 新手引导
*/
.news_prople .news_title{
	font-size:30rpx;
}
.news_prople .news_images{
	width:100%;
	height:52rpx;
	background:url('../../../static/images/new_prople.png') no-repeat;
	background-size:cover;
	margin-top:15rpx;
}
.news_prople .news_text{
	font-size:26rpx;
	line-height:52rpx;
	text-align:center;
	display:block;
}
</style>
