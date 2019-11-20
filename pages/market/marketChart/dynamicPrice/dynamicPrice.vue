<template>
	<view class="marketChartInfo">
		<view class="marketInfo marketInfo_left">
			<view class="marketName">
				<text class="name">恒生指数</text>
				<text class="code">HSI1911</text>
			</view>
			<view class="marketClear"></view>
			<view class="marketPrice_ratio">
				<text class="b blockLeft">27078</text>
				<view class="b blockRight">
					<text class="one">0</text>
					<text class="two">0.00%</text>
				</view>
			</view>
		</view>
		<view class="marketInfo marketInfo_right">
			<view class="goTradeBtn">
				<button type="primary" class="positionBtn">持仓</button>
			</view>
			<view class="nowPositionTimer">
				<text class="timer1">本时段持仓时间至</text>
				<text class="timer2">11:58:00</text>
			</view>
			<view class="nowBuyMallNum">
				<view class="c buyMallView">
					<view class="c1 buyView"></view>
					<view class="c1 mallView"></view>
				</view>
				<view class="c buyMallNum">
					<view class="buy">64买量</view>
					<view class="mall">123卖量</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'dynamicPrice',
		data(){
			return{
				da:''
			}
		}
	}
</script>

<style lang="scss">
.marketChartInfo{
	display:flex;
	flex-direction: row;
	padding:0 30upx;
	.marketInfo{
		flex:1;
		&.marketInfo_left{
			.marketName{
				padding-top:20upx;
				padding-bottom:20upx;
				.name{
					display:inline-block;
					text-align:center;
				}
				.code{
					display:inline-block;
					line-height:50upx;
					padding-left:12upx;
				}
			}
			.marketClear{
				width:100%;
				height:34upx;
			}
			.marketPrice_ratio{
				.b{
					float:left;
					&.blockLeft{
						text-align:center;
						line-height:80upx;
					}
					&.blockRight{
						padding-left:25upx;
						line-height:40upx;
						.one,.two{
							display:block;
						}
					}
				}
			}
		}
		&.marketInfo_right{
			.goTradeBtn{
				padding-top:20upx;
				padding-bottom:20upx;
				display:flex;
				flex-direction:row-reverse;
				.positionBtn{
					width:140upx;
					height:50upx;
					line-height:50upx;
					border-radius:50upx;
					background:#1b82d1;
					margin-left:0;
					margin-right:10upx;
				}
			}
			.nowPositionTimer{
				text-align:right;
				margin:5upx 0;
				.timer2{
					color:#ed1818
				}
			}
			.nowBuyMallNum{
				display:flex;
				flex-direction:row;
				.buyMallView{
					flex:0 0 65%;
					width:65%;
					height:25upx;
					.c1{
						height:100%;
						float:right;
						&.buyView{
							width:100%;
							background:#ec2e2e;
							margin-top:10upx;
						}
						&.mallView{
							width:90%;
							background:#08b831;
							margin-top:12upx;
						}
					}
				}
				.buyMallNum{
					flex:0 0 35%;
					width:35%;
					text-align:right;
					line-height:40upx;
				}
			}
		}
	}
}
</style>
