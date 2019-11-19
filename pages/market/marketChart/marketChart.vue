<template>
	<view class="marketChartView">
		<view class="marketHeader">
			<hx-navbar
			    :back="false" 
				:background-color="[[20, 152, 237],[53, 91, 236]]"
			    :fixed="true">
			    <block slot="left">
			        <view class="back" @click="backNextRoute">
			            <fonts-icon type="fanhui" color="#f8f8f8" size="28"></fonts-icon>
			        </view>
			    </block>
			    <view class="input-view">
			        <view class="chartTitle">
						{{queryData.CommodityName?queryData.CommodityName:'-----'}}<text class="isType">(实盘)</text>
					</view>
			        <view class="arrow">
						<image src="../../../static/images/triangle12.svg" class="triangle"></image>
					</view>
			    </view>
				<block slot="right">
				    <view class="right_btn">
				        规则
				    </view>
				</block>
			</hx-navbar>
		</view>
		<view class="marketChartInfo">
			<view class="marketInfo marketInfo_left">
				<view class="marketName">
					恒生指数<text class="code">HSI1911</text>
				</view>
				<view class="marketPrice_ratio">
					<text class="b blockLeft">27078</text>
					<view class="b blockRight">
						<text class="one">0</text>
						<text class="two">0.00%</text>
					</view>
				</view>
			</view>
			<view class="marketInfo marketInfo_right">2</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/customNavigator/hx-navbar.vue"
	import chache from '@/common/utils/storage'
	import {showUiToast,showUiLoading,hideUiLoading} from '@/common/utils/dialog.config'
	import {mapActions,mapGettets} from 'vuex'
	export default {
		name:'marketChart',
		components: {hxNavbar},
		data() {
			return {
				queryData:{}
			};
		},
		computed:{
		},
		onLoad(query){
			this.queryData=query;
			let das={
				commodityCode:query.commodityCode,
				contractCode:query.contractCode
			}
			this.getMarketDetail({
				templateCode:query.tpCode,
				commodityCode:query.commodityCode
			})
			this.getMarketGoods(das)
			this.getHistoryChart(das)
		},
		methods:{
			...mapActions(['getMarketGoodsDetails','getSingleMarketDetails','getHistoryChartDas']),
			backNextRoute(){
				let das=chache.get('selectTemName')
				this.$mRouter.push({
				    route:this.$routers.marketList,
					query:das
				})
			},
			// 获取单个品种信息, 价格数据
			getMarketGoods(data){
				this.getMarketGoodsDetails(data).then(res=>{
					if(!res.status){
						showUiToast(res.msg);
						return;
					}
				}).catch(err=>{
					return err
				})
			},
			// 获取单个商品详情，止盈止损的数据
			getMarketDetail(data){
				this.getSingleMarketDetails(data).then(res=>{
					if(!res.status){
						showUiToast(res.msg);
						return;
					}
				}).catch(err=>{
					return err
				})
			},
			// 获取行情图数据
			getHistoryChart(data){
				this.getHistoryChartDas(data).then(res=>{
					if(!res.status){
						showUiToast(res.msg);
						return;
					}
				}).catch(err=>{
					return err
				})
			}
		}
	}
</script>

<style lang="scss">
@import './marketChart.scss';
</style>
