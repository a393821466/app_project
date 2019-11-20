<template>
	<view class="quickOrder">
		<view class="quick">
			<view class="selectModel" v-if="openQuick">
				<view class="model">
					<label>
						<checkbox value="cb" style="transform:scale(0.8)" class="checkBoxModel" />
						<text class="selectText">元模式</text>
					</label>
				</view>
				<view class="handNum">
					<view class="hand-num-view">手数:1手</view>
				</view>
				<view class="stopLoopAmount">
					<view class="stop-loop-amount">止损金额:HK$1400</view>
				</view>
			</view>
			<view class="quickOriderView">
				<view class="q quick-rise">
					<view class="rise-top">
						26674
					</view>
					<view class="rise-bottom">
						<fonts-icon type="xiajiangxiajiantouxiangxiadiexianxing1" size="28" color="#f8f8f8"></fonts-icon>
						<text class="buy">{{openQuick?'快速买多':'买多'}}</text>
					</view>
				</view>
				<view class="open-quick-orider">
					<view class="quick-center" @click="openQuickOrder">
						<view class="quickOrderIcon">
							<fonts-icon type="image" size="44" :color="openQuick?'#ccc':'#f8f8f8'"></fonts-icon>
						</view>
						<text class="quick-text" :style="[openQuick?'#ccc':'#f8f8f8']">{{openQuick?'ON':'OFF'}}</text>
					</view>
				</view>
				<view class="q quick-sell">
					<view class="rise-top">
						26672
					</view>
					<view class="rise-bottom">
						<fonts-icon type="xiajiangxiajiantouxiangxiadiexianxing" size="28" color="#f8f8f8"></fonts-icon>
						<text class="buy">{{openQuick?'快速卖空':'卖空'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="quickOrider-placeholder"></view>
	</view>
</template>

<script>
export default{
	name:'quickOrder',
	data(){
		return{
			openQuick:false,
			animationData: {}
		}
	},
	created(){
		// 初始化一个动画
		var animation = uni.createAnimation({
			duration: 100,
			timingFunction: 'ease',
		})
		this.animation = animation
	},
	methods:{
		openQuickOrder(){
			if (!this.openQuick) {
				this.rotateAndScale()
			} else {
				this.norotateAndScale()
			}
			this.openQuick=!this.openQuick;
		},
		rotateAndScale() {
			// 定义动画内容
			this.animation.scale(1.3, 1.3).step()
			// 导出动画数据传递给data层
			this.animationData = this.animation.export()
		},
		norotateAndScale() {
			this.animation.scale(1, 1).step()
			this.animationData = this.animation.export()
		}
	}
}
</script>

<style lang='scss'>
.quickOrder,.quickOriderView{
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 998;
}
.quick{
	background:#f8f8f8;
	border-top:1px solid #e8e8e8;
	.selectModel{
		display:flex;
		flex-direction: row;
		padding:20upx;
		.model{
			color:#666;
			flex:0 0 25%;
			width:25%;
			label{
				display:flex;
				flex-direction:row;
				.selectText{
					display:block;
					line-height:50upx;
					flex:1;
				}
			}
		}
		.handNum{
			flex:0 0 30%;
			width:30%;
		}
		.stopLoopAmount{
			flex:0 0 45%;
			width:45%;
		}
		.hand-num-view,.stop-loop-amount{
			width:90%;
			height:50upx;
			background:#999;
			color:#f8f8f8;
			text-align:center;
			margin:0 auto;
			line-height:50upx;
			border-radius:5upx;
		}
	}
	
}
.quickOrder{
	.quickOriderView{
		display: flex;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.q{
			flex:1;
			height:130upx;
			&.quick-rise{
				background:#ec2e2e;
			}
			&.quick-sell{
				background:#08b831;
			}
			.rise-top{
				color:#f8f8f8;
				text-align:center;
				padding-top:20upx;
			}
			.rise-bottom{
				color:#f8f8f8;
				text-align:center;
				.buy{
					padding-left:6upx;
				}
			}
		}
		.open-quick-orider{
			position:absolute;
			left:50%;
			width:130upx;
			height:130upx;
			border-radius:50%;
			background:#fff;
			margin-left:-67upx;
			.quick-center{
				width:110upx;
				height:110upx;
				margin:10upx auto 0;
				background: linear-gradient(90deg, rgb(20, 152, 237), rgb(53, 91, 236));
				border-radius:50%;
				.quickOrderIcon{
					text-align:center;
					padding-top:10upx;
				}
				.quick-text{
					text-align:center;
					color:#f8f8f8;
					display:block;
				}
			}
		}
	}
	.quickOrider-placeholder{
		width: 100%;
		height:130upx;
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
	}
}
</style>
