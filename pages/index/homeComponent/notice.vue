<template>
<!-- 通告 -->
<view class="noticeBox">
	<view class="notice_box" @click="goAnnount">
		<view class="notice_icon">
			<fonts-icon :type="notice.length>0?'laba':''"></fonts-icon>
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
				if (this.notice.length > 0) {
					let arr = [];
					for (let i = 0; i < this.notice.length; i++) {
						if (i >= 5) {
							break;
						}
						let noticeText=this.notice[i].cnSummary;
						let str=noticeText.substring(0,20);
						let strLen=str+(noticeText.length>20?'...':'');
						arr.push(i + 1 + '.' + strLen);
					}
					return arr
				} else {
					return [''];
				}
			},
		},
		methods:{
			goAnnount(){
				this.$mRouter.push({
					"route":this.$routers.notice
				})
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
			  // font-size:36rpx;
		  }
		  .notice{
			  width: 620rpx;
			  text-overflow: ellipsis;
			  white-space: nowrap; 
			  overflow: hidden;
			  .text {
				width: 100%;
				font-size:28rpx;
				line-height:80rpx;
			  }
		  }
	}
}
</style>
