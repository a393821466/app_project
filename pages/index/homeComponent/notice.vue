<template>
<!-- 通告 -->
<view class="noticeBox">
	<view class="notice_box" @click="goAnnount">
		<view class="notice_icon">
			<fonts-icon :type="getAnnountList.length>0?'laba':''"></fonts-icon>
		</view>
		<view class="notice">
			<swiper autoplay="true" interval="5000" :disable-touch="disableTouch">
				<swiper-item v-for="(item, index) in getAnnountList" :key="index">
					<text class="text">{{item}}</text>
				</swiper-item>
			</swiper>
		</view>
	</view>
</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	export default{
		name:'notice',
		data(){
			return{
				disableTouch:false
			}
		},
		props:{
			notice:{
				type:[Object,Array],
				required:true
			}
		},
		computed:{
			// 公告的处理
			getAnnountList() {
				let noticeList=this.notice;
				let list=[];
				if (noticeList.length > 0) {
					list=this.pullNotice(noticeList);
					return list
				} else {
					if(chache.has('notice')){
						let notice=chache.get('notice')
						list=this.pullNotice(notice);
						return list;
					}else{
						return [''];
					}
				}
			},
		},
		methods:{
			goAnnount(){
				this.$mRouter.push({
					"route":this.$routers.notice
				})
			},
			pullNotice(notice){
				let arr = [];
				for (let i = 0; i < notice.length; i++) {
					if (i >= 5) {
						break;
					}
					let noticeText=notice[i].cnSummary;
					let str=noticeText.substring(0,20);
					let strLen=str+(noticeText.length>20?'...':'');
					arr.push(i + 1 + '.' + strLen);
				}
				return arr
			}
		}
	}
</script>

<style lang='scss'>
/**
* 滚动
*/
.noticeBox {
	padding:0 20rpx;
	position: relative;
	text-align: left;
	height: 80rpx;
	margin-bottom:20rpx;
	.notice_box{
		  width:100%;
		  overflow: hidden;
		  height: 80rpx;
		  display:flex;
		  flex-direction: row;
		  border-radius:10rpx;
		  .notice_icon{
			  width:80rpx;
			  text-align:center;
			  position:relative;
			  padding-top:23rpx;
			  .uni-icon-laba{
				 position:absolute;
				 top:20rpx;
				 left:22rpx;
				 display:block;
			  }
		  }
		  .notice{
			  width: 620rpx;
			  text-overflow: ellipsis;
			  white-space: nowrap; 
			  overflow: hidden;
			  .text {
				width: 100%;
				line-height:80rpx;
			  }
		  }
	}
}
</style>
