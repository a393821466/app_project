<template>
<!--分类导航-->
<view class="category_home">
	<view class="category_list" v-for="(item,idx) in categoryData" :key="item.id" :class="idx===categoryData.length-1&&categoryData.length%2==1?'upside_list_class':''"
	 :style='{backgroundColor:!item.color?"#999":item.color}'>
		<text class="category_text">{{item.templateName}}</text>
		<view :class="idx===categoryData.length-1&&categoryData.length%2==1?'img':'category_backgorund'"></view>
	</view>
</view>
</template>

<script>
	export default{
		name:'category',
		props:{
			categoryList:{
				type:[Array,Object],
				required:true
			}
		},
		computed:{
			categoryData(){
				return this.categoryList.length>0?this.categoryList:[]
			}
			
		},
		data(){
			return{
				da:''
			}
		},
	}
</script>

<style lang="scss">
/**
 * 分类
 */
.category_home {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	.category_list {
		width: 345rpx;
		height: 100rpx;
		position: relative;
		border-radius: 10rpx;
		flex: 0 0 345rpx;
		margin-bottom: 20rpx;
		&:nth-child(even) {
			margin-left: 20rpx;
		}
		.category_text {
			text-align: center;
			line-height: 100rpx;
			font-size: 30rpx;
			text-align: center;
			display: block;
			color: #fff;
		}
		.category_backgorund {
			position: absolute;
			background: url('../../../static/images/quick_bg3.png') no-repeat;
			width: 100%;
			height: 100%;
			background-size: cover;
			top: 0;
			left: 0;
		}
	}
	.upside_list_class {
		width: 100%;
		flex: 0 0 100%;
		.img {
			background: url('../../../static/images/quick_bg4.png') no-repeat;
		}
	}
}
</style>
