<template>
	<view class="pd-list">
		<view class="pd-li" v-for="(item,idx) in itemData" :key='item.commodityCode' 
		:style="{'backgroundColor':item.status==2?'#eee':'#fff'}" @click="goMarketInset(item)">
			<view class="market marketLeft">
				<text class="icon" :style="{backgroundColor:item.icon}">{{!item.commodityCode?'-':item.commodityCode}}</text>
			</view>
			<view class="market marketCenter">
				<view class="market_center_title">
					<view class="b market_title">
						{{!item.CommodityName?'-':item.CommodityName}}
					</view>
					<view class="b market_percentage" 
					:class="item.status!==2?(item.upDropSpeed>0&&item.status===1?'rise':'fall'):'close'">
						<view class="icon_rise_fall" v-show="item.status==1">
							<fonts-icon 
							:type="item.upDropSpeed>0?'jiantou-copy':'xiajiantou'"
							size='24' 
							color='#f8f8f8'></fonts-icon>
						</view>
						<text v-if="item.status!==2">{{getUpPrice(item.upDropSpeed)}}</text>
						<text v-else>{{getLowerPirce(item.lastPrice, item.openPrice)}}</text>
					</view>
					<view class="b xs">
						<!-- <text v-show="item.status==2">休市</text> -->
						<!-- <image src="/static/images/rise.png" class='market_img'></image> -->
					</view>
				</view>
				<view class="market_remark">
					{{!item.remark?'-':item.remark}}
				</view>
			</view>
			<view class="market marketRight">
				<view class="undulate_price" 
				:style="{'color':item.status!==2?(item.upDropSpeed>0&&item.status===1?'#ea3826':'#7ed321'):'#878585'}">
					{{!item.lastPrice?'-':item.lastPrice}}
				</view>
				<view class="market_Timer">
					{{!item.tradeTime?'-':item.tradeTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {showUiToast} from '@/common/utils/dialog.config'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		name:'marketListContent',
		props:{
			itemData: { // 数据列表
				type: [Array,Object],
				default(){
					return []
				}
			},
			marketCode:{
				type:[Array,Object],
				required:true
			}
		},
		computed:{
			...mapGetters(['socketTask'])
		},
		methods:{
			...mapActions(['closeSocket']),
			goMarketInset(item){
				if (item.status === 3) {
					showUiToast('该商品异常,请选择其它商品');
					return
				  }
				if(this.socketTask!=null){
				  	this.closeSocket()
				}
				this.$mRouter.push({
					route:this.$routers.marketDetail,
					query:{
						tpCode:this.marketCode.code,
						CommodityName: item.CommodityName,
						commodityCode: item.commodityCode,
						contractCode: item.contractCode,
						productTypeCode: item.productTypeCode,
						priceDecimalPlaces: item.priceDecimalPlaces
					}
				})
			},
			getUpPrice(upDropSpeed) {
			  let num
			  if (upDropSpeed === undefined || upDropSpeed === 'NaN') {
				num = '- -'
			  } else {
				num = (upDropSpeed * 100).toFixed(2) + '%'
			  }
			  num = num === Infinity ? '- -' : num
			  return num
			},
			getLowerPirce(lastPrice, openPrice) {
			  let m
			  if (
				lastPrice === undefined ||
				lastPrice === 'NaN' ||
				(openPrice === undefined || openPrice === 'NaN')
			  ) {
				m = '- -'
			  } else {
				m = ((lastPrice - openPrice) / openPrice).toFixed(2) + '%'
			  }
			  m = m === Infinity ? '- -' : m
			  return m
			}
		}
	}
</script>

<style lang="scss">
	/*数据列表*/
	.pd-list{
		padding:10rpx 20rpx;
		.pd-li{
			position: relative;
			box-shadow:0rpx 0rpx 8rpx #ccc;
			display:flex;
			flex-direction:row;
			margin:15rpx 0 25rpx 0;
			border-radius:8rpx;
			.market{
				flex:1;
				&.marketLeft{
					flex:0 0 120rpx;
					.icon{
						width:90rpx;
						height:90rpx;
						background:#ccc;
						display:block;
						border-radius:50%;
						text-align:center;
						line-height:90rpx;
						margin:30rpx 0 30rpx 16rpx;
						color:#fff;
					}
				}
				&.marketCenter{
					flex:0 0 320rpx;
					.market_center_title{
						display:flex;
						flex-direction: row;
						padding-top:20rpx;
						.b{
							flex:1;
							&.market_title{
								line-height:50rpx;
								width:50%;
								flex:0 0 50%;
							}
							&.market_percentage{
								color:#fff;
								width:40%;
								flex:0 0 40%;
								height:50rpx;
								text-align:center;
								line-height:50rpx;
								border-radius:8rpx;
								position:relative;
								&.rise{
									background:#ea3826;
								}
								&.fall{
									background:#7ed321;
								}
								&.close{
									background:#878585;
								}
								.icon_rise_fall{
									text-align:center;
									display:inline-block;
								}
							}
							&.xs{
								text-align:center;
								line-height:50rpx;
								color:#999;
							}
						}
					}
					.market_remark{
						color:#999;
						line-height:62rpx;
					}
				}
				&.marketRight{
					padding:24rpx 10rpx 16rpx 0;
					.undulate_price{
						text-align:center;
						font-weight:bold;
					}
					.market_Timer{
						line-height:56rpx;
						color:#888;
						text-align:center;
					}
				}
			}
		}
	}
</style>
