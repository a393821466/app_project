<template>
	<view class="noticeBox">
	  <view class="notice_box">
		  <view class="notice_icon">
			  <fonts-icon type="laba"></fonts-icon>
		  </view>
		  <view class="notice">
			  <transition name="slide">
				<view class="text" :key="text.id">{{text.val}}</view>
			  </transition>
		  </view>
	  </view>
	</view>
</template>

<script>
	import fontsIcon from '@/components/ui-font/'
	export default {
		components:{
			fontsIcon
		},
		props:{
			duration:{
				type:Number,
				default:5000
			},
			noticeListData:{
				type:[Array,Object],
				required:true
			}
		},
		data() {
			return {
				number: 0,
				timer:null,
				flat:false
			}
		},
		watch:{
			flat(news,olds){
				if(!news){
					this.closeTimer()
				}else{
					this.startMove();
				}
			}
		},
		computed:{
			text() {
				return {
					id: this.number,
					val: this.noticeListData[this.number]
				}
			}
		},
		// mounted(){
		// 	this.startMove()
		// },
		methods: {
			startMove () {
			  // eslint-disable-next-line
			  this.timer = setTimeout(() => {
				if (this.number === this.noticeListData.length-1) {
				  this.number = 0;
				} else {
				  this.number += 1;
				}
				this.startMove();
			  }, this.duration); // 滚动不需要停顿则将2000改成动画持续时间
			},
			closeTimer(){
				// 关闭计时器
				clearTimeout(this.timer)
				this.timer=null
			}
		}
	}
</script>

<style lang="scss">
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
			  .uni-icon-laba{
				 position:absolute;
				 top:20rpx;
				 left:22rpx;
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
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    opacity: 1;
  }
  .slide-leave-to {
    opacity: 0;
  }
</style>
