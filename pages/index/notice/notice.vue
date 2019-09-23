<template>
	<view class="noticeBox">
	  <view class="notice_box">
		  <view class="notice_icon">
			  <text class="test">&#xe690;</text>
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
	export default {
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
		mounted(){
			this.startMove()
		},
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
				clearTimeout(that.timer)
				that.timer=null
			}
		}
	}
</script>

<style>
/**
* 滚动
*/
.test {
	font-family: iconfont;
	margin-left: 20rpx;
}
.noticeBox {
    padding:0 20rpx;
    position: relative;
    text-align: left;
  height: 80rpx;
  margin-bottom:20rpx;
  }
  .notice_box{
	  width:100%;
	  background:#eee;
	  overflow: hidden;
	  height: 80rpx;
	  display:flex;
	  flex-direction: row;
	  border-radius:10rpx;
  }
  .notice_icon{
	  width:80rpx;
	  text-align:center;
	  padding-top:18rpx;
	  font-size:32rpx;
  }
  .notice{
	  width: 620rpx;
	  text-overflow: ellipsis;
	  white-space: nowrap; 
	  overflow: hidden;
  }
  .text {
    width: 100%;
	font-size:28rpx;
	line-height:80rpx;
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
