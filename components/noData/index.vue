<template>
	<view class="noData">
		<view class="imgs" :style="{marginTop:top+'px'}">
			<image src="../../static/images/noData.svg" class="noDataImage"></image>
			<text class="noDataText">无更多内容了</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:'noData',
		props:{
			top:{
				type:[Number,String],
				default:60
			},
		},
		data(){
			return{
				da:''
			}
		}
	}
</script>

<style lang='scss'>
.noData{
	.imgs{
		width:260rpx;
		margin:0 auto;
		.noDataImage{
			width:100%;
			height:300rpx;
		}
		.noDataText{
			text-align:center;
			font-size:36rpx;
			display:block;
			color:#ccc;
		}
	}
}
</style>
