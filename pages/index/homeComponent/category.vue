<template>
<!--分类导航-->
<view class="category_box">
	<!-- <view class="category_home" v-if="categoryData.length>0">
		<view class="category_list" v-for="(item,idx) in categoryData" :key="item.id" :class="idx===categoryData.length-1&&categoryData.length%2==1?'upside_list_class':''"
		 :style='{backgroundColor:!item.color?"#999":item.color}'>
			<text class="category_text">{{item.templateName}}</text>
			<view :class="idx===categoryData.length-1&&categoryData.length%2==1?'img':'category_backgorund'"></view>
		</view>
	</view>
	<view class="category_home" v-else>
		<view class="category_list category_skeleton" v-for="(item,idx) in 5" :key="idx">
		</view>
	</view> -->
	<scroll-view class="category_home" scroll-x="true" @scroll="scroll" scroll-left="1">
		<view class="categoryList" v-for="(item,idx) in categoryData" :key="idx">
			<view class="categoryNavigator" v-for="(items,idx) in item" :key="items.id">
				<view class="icon" :style='{backgroundColor:!items.color?"#999":items.color}'>
					{{!items.templateName?'':items.templateName.substr(0,1)}}
				<view class="category_backgorund"></view></view>
				<text class="categoryText">{{!items.templateName?'':items.templateName.substr(0,4)}}</text>
			</view>
		</view>
	</scroll-view>
	<div class="scrollBox">
		<div class="scrollWidth" :style="{'width':len==1?'100%':scrollX+'%'}"></div>
	</div>
	<div class="clearBox"></div>
</view>

</template>

<script>
import chache from '@/common/utils/storage'
export default{
	name:'category',
	data(){
		return{
			scrollX:0,
			len:0
		}
	},
	props:{
		temList:{
			type:[Array,Object],
			required:true
		}
	},
	computed:{
		categoryData(){
			const that=this
			if(this.temList.length>0){
				return this.group(this.temList,4)
			}else{
				if(chache.has('template')){
					let tem=chache.get('template')
					return this.group(tem,4)
				}else{
					return [];
				}
			}
		}
	},
	methods:{
		group(array,subGroupLength){
			let index=0
			let newArray=[]
			while(index<array.length){
				newArray.push(array.slice(index,index+=subGroupLength))
			}
			this.len=newArray.length
			return newArray
		},
		scroll(e){
			let l=e.detail.scrollLeft;
			let w=e.detail.scrollWidth;
			let sum=0;
			uni.getSystemInfo({
				success: function(e) {
					sum=w-e.screenWidth;
				}
			})
			this.scrollX=parseInt(Math.round(l/sum*10000)/100)
		}
	}
}
</script>

<style lang="scss">
/**
 * 分类
 */
.category_box{
	background:#fff;
}
.category_home {
	width: 100%;
	white-space: nowrap;
	.categoryList{
		display:inline-block;
		white-space:normal;
		width:100%;
		.categoryNavigator{
			display:inline-block;
			width:25%;
			margin-top:20upx;
			.icon{
				width:90upx;
				height:90upx;
				background:#009999;
				color:#f8f8f8;
				text-align:center;
				line-height:90upx;
				border-radius:90upx;
				position:relative;
				margin:0 auto;
			}
			.categoryText{
				text-align:center;
				line-height:50upx;
				display:block;
				color:#666;
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
	}
}
.scrollBox{
	width:80upx;
	height:10upx;
	margin:20upx auto 0;
	background:#ccc;
	overflow: hidden;
	border-radius:40upx;
	.scrollWidth{
		height:100%;
		background:rgb(27, 130, 209);
	}
}
.clearBox{
	height:20upx;
}
</style>
