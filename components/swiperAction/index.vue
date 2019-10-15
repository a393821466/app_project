<template>
	<view class="message-list">
		<block v-for="(it,i) of myBankList" :key="i">
			<view class="uni-swipe-action">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
					<view class="uni-swipe-action__content ">
						<view class="bankList" :style="{backgroundColor:it.color,borderRadius:isOpen?0:15+'rpx'}">
							<view class="bankIcon bankDiv">
								<view class="bankIconBox">
									<fonts-icon :type='it.bankCode' size='58' :color='it.color'></fonts-icon>
								</view>
							</view>
							<view class="bankInfo bankDiv">
								<view class="bankName">{{it.bankName}}</view>
								<view class="bankType">储蓄卡</view>
								<view class="bankNumber">**** **** **** {{it.accountNum.substr(it.accountNum.length-4)}}</view>
								<view class="bankIconBg">
									<fonts-icon :type='it.bankCode' size='300' color='#fff'></fonts-icon>
								</view>
								<view class="arrow" :class="isOpen?'to':''">
									<fonts-icon type="fanhui" size='22' color='#eee'></fonts-icon>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-swipe-action__btn-group" :id="elId">
						<div v-for="(item,index) in options" :key="index" class="uni-swipe-action--btn" :style="{backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',color: item.style && item.style.color ? item.style.color : '#FFFFFF',fontSize: item.style && item.style.fontSize ? item.style.fontSize : '28upx'}"
						 @click="bindClickBtn(item,i)">
							{{item.text}}
						</div>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'swipe-action',
		props: {
			options: Array,
			myBankList:{
				type:[Array,Object],
				required:true
			},
		},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
				isOpen:false
			}
		},
		created() {
			this.direction = ''
			this.startX = 0
			this.startY = 0
			this.btnGroupWidth = 0
			this.isMoving = false
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			getSize() {
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					this.btnGroupWidth = ret[0].width;
				});
			},
			bindClickBtn(item, index) {
				// this.messageIndex = -1;
				console.log(item.text +'message第'+ index+ '项');
				
			},
			touchStart(event) {
				if(event.currentTarget.dataset.disabled === true){
					return;
				}
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			},
			touchMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				var moveY = event.touches[0].pageY - this.startY,
						moveX = event.touches[0].pageX - this.startX;
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX) || Math.abs(moveY) > 100 || Math.abs(moveX) < 50) { //纵向滑动//参数100与50可调节侧滑灵敏度
					this.direction = 'Y';
					return;
				}
				this.direction = moveX > 0 ? 'right' : 'left';
				this.messageIndex = moveX < 0 ? event.currentTarget.dataset.index : -1;
				this.isMoving = true;
			},
			touchEnd(event) {
				this.isMoving = false;
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = '';
					return;
				}
				if (this.direction == 'right') {
					this.messageIndex = -1;
				} 
				this.endMove(event)
			},
			endMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				if (this.messageIndex !== -1) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`;
					this.isOpen=true;
					this.$emit('opened');
				} else {
					this.transformX = 'translateX(0px)';
					this.isOpen=false;
					this.$emit('closed');
				}
				this.direction = '';
			}
		}
	}
</script>

<style lang="scss">
	.uni-swipe-action {
		width: 100%;
		overflow: hidden;
		border-radius:15rpx;
		margin-bottom:10rpx;
		&__container {
			background-color: #FFFFFF;
			width: 200%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
		}
		&__content {
			width: 50%;
		}
		&__btn-group {
			display: flex;
			flex-direction: row;
		}
		&--btn {
			padding: 0 32upx;
			color: #FFFFFF;
			background-color: #C7C6CD;
			font-size: 28upx;
			display: inline-flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
		}
	}
	.item {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  padding: 10upx 16upx;
	  background-color: #fff;
		border-bottom:1px solid rgb(243,243,243);
		&.stick{
			background-color: rgba(243, 236, 221,.5);
		}
		.item-middle {
			display: flex;
		  flex: 1;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
		  margin-left: 15upx;
		  overflow: hidden;
			.title {
				width: 100%;
			  color: #000;
			  font-family: "微软雅黑";
			  font-weight: 400;
			  font-size: 30upx;
				height: 50upx;
			  line-height:60upx;
			  overflow: hidden; /*自动隐藏文字*/
			  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
				white-space: nowrap; /**强制不换行*/
			}
			.message {
				width: 100%;
			  font-family: "微软雅黑";
			  color: #808080;
				height: 50upx;
			  line-height: 40upx;
			  font-size: 24upx;
			  overflow: hidden; /**自动隐藏文字*/
			  text-overflow: ellipsis; /**文字隐藏后添加省略号*/
			  white-space: nowrap; /**强制不换行*/
			}
		}
		.item-right {
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
			.time {
			  color: #808080;
			  font-size: 18upx;
				height:60upx;
				line-height: 60upx;
			}
			.mark {
			  background-color: #f74c31;
			  line-height: 35upx;
				text-align: center;
			  font-size: 18upx;
			  min-width: 35upx;
			  min-height: 35upx;
			  border-radius: 18upx;
			  color: #fff;
			}
		}
	}
.bankList{
	height:240rpx;
	display:flex;
	flex-direction:row;
	.bankDiv{
		flex:1;
		&.bankIcon{
			.bankIconBox{
				width:80rpx;
				height:80rpx;
				border-radius:80rpx;
				background:rgba(255,255,255,.8);
				text-align:center;
				line-height:80rpx;
				margin-left:40rpx;
				margin-top:30rpx;
			}
		}
		&.bankInfo{
			flex:0 0 80%;
			width:80%;
			color:#eee;
			position:relative;
			overflow:hidden;
			.bankName{
				margin-top:30rpx;
				font-size:36rpx;
			}
			.bankType{
				font-size:28rpx;
				line-height:50rpx;
				color:rgba(255,255,255,.7);
			}
			.bankNumber{
				font-size:48rpx;
			}
			.bankIconBg{
				position:absolute;
				right:50rpx;
				top:-25rpx;
				z-index:0;
				opacity:.1
			}
			.arrow{
				position:absolute;
				right:20rpx;
				top:50%;
				margin-top:-20rpx;
				animation:arrowTransition 1s infinite;
				animation-direction:alternate;
				transform:rotate(0deg);
				&.to{
					transform:rotate(180deg)
				}
			}
		}
	}
}
@keyframes arrowTransition{
	from{opacity:0;}
	to{opacity:1;}
}
</style>