<template>
<!-- 通告 -->
<view class="noticeBox">
	<view class="notice_box">
		<view class="notice_icon" @click="goAnnount">
			<fonts-icon :type="getAnnountList.length>0?'laba':''"></fonts-icon>
		</view>
		<view class="notice" @click="goAnnount">
			<swiper autoplay="true" interval="3000" :disable-touch="disableTouch">
				<swiper-item v-for="(item, index) in getAnnountList" :key="index">
					<text class="text">{{item}}</text>
				</swiper-item>
			</swiper>
		</view>
		<view class="service">
			<view class="service-input" @click="goService">
				<fonts-icon type="kefu"></fonts-icon>
				<text class="service-text">联系客服</text>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
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
			...mapGetters(['merchantInfo']),
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
			...mapActions(['sendUrl']),
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
			},
			goService(){
				this.sendUrl(this.merchantInfo.merchantSetting.customerServiceUrl);
				this.$mRouter.push({
					'route':this.$routers.webViewUi
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
	border-bottom:1px solid #eee;
	.notice_box{
		  width:100%;
		  overflow: hidden;
		  height: 80rpx;
		  display:flex;
		  flex-direction: row;
		  border-radius:10rpx;
		  .notice_icon{
			  flex:0 0 80upx;
			  width:80upx;
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
			  width:440upx;
			  flex:0 0 440upx;
			  text-overflow: ellipsis;
			  white-space: nowrap; 
			  overflow: hidden;
			  .text {
				width: 100%;
				line-height:80rpx;
			  }
		  }
		  /* 客服 */
		  .service {
		  	display: flex;
		  	flex-direction: row-reverse;
		  	height: 80rpx;
			flex:0 0 1;
		  	.service-input {
		  		align-self: center;
		  		display: flex;
				text-indent:5rpx;
				.uni-icon{
					margin-top:5rpx;
				}
		  		.service-text {
		  			flex: 1;
		  			line-height: 45rpx;
					text-indent:10rpx;
		  		}
		  	}
		  }
	}
}
</style>
