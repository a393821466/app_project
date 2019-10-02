<template>
<view class="market_box" :class="className">
	<view class="category_home" v-if="categoryData.length>0">
		<view class="category_list" v-for="(item,idx) in categoryData" :key="item.id" :class="idx===categoryData.length-1&&categoryData.length%2==1?'upside_list_class':''"
		 :style='{backgroundColor:!item.color?"#999":item.color}'>
			<text class="category_text">{{item.templateName}}</text>
			<view :class="idx===categoryData.length-1&&categoryData.length%2==1?'img':'category_backgorund'"></view>
		</view>
	</view>
	<view class="category_home category_boxs" v-else>
		<view class="category_list"  v-for="(item,idx) in 5" :key="idx">
		</view>
	</view>
</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['temList','className','token']),
			categoryData(){
				return this.temList.length>0?this.temList:[]
			}
		},
		onShow(){
			if(this.categoryData.length==0){
				this.getTemplateData();
			}
		},
		methods:{
			...mapActions(['getTemplate']),
			// 获取模板
			getTemplateData() {
				this.getTemplate().then(res => {
					if(res.status){
						uni.stopPullDownRefresh();
					}
				}).catch(err=>{
					return err;
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh(e){
			this.getTemplateData()
			// setTimeout(() => {
			// 	uni.stopPullDownRefresh();
			// }, 3000);
		}
	}
</script>

<style lang="scss">
/**
 * 分类
 */
.market_box{
	padding:20rpx;
	.category_home {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.category_list {
			width:345rpx;
			height: 246rpx;
			position: relative;
			border-radius: 10rpx;
			flex: 0 0 1;
			margin-bottom: 20rpx;
			&:nth-child(even) {
				margin-left: 20rpx;
			}
			.category_text {
				text-align: center;
				line-height: 246rpx;
				font-size: 30rpx;
				text-align: center;
				display: block;
				color: #fff;
			}
			.category_backgorund {
				position: absolute;
				background: url('../../static/images/quick_bg1.png') no-repeat;
				width: 100%;
				height: 100%;
				background-size: cover;
				top: 0;
				left: 0;
			}
		}
	}
}
.upside_list_class {
	width: 100%;
	position:relative;
	flex: 0 0 100%;
	.img {
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background: url('../../static/images/quick_bg2.png') no-repeat;
		background-size:cover;
	}
}
.category_boxs{
	.category_list{
		&:nth-last-child(1){
			width: 100%;
			flex: 0 0 100%;
		}
	}
}
</style>
