<template>
	<view class="marketChartView" :class="themeFontSize">
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
		<web-view  :src="url" @message="handleMessage"></web-view>
		<!-- <dynamic-price></dynamic-price> -->
		<!-- <dynamic-chart></dynamic-chart> -->
		<!-- <quick-order :marketDetails="marketDetails"></quick-order> -->
	</view>
</template>

<script>
	import hxNavbar from "@/components/customNavigator/hx-navbar.vue"
	import dynamicPrice from "./dynamicPrice/dynamicPrice.vue"
	import quickOrder from "./quickOrder/quickOrder.vue"
	import dynamicChart from './dynamicChart/dynamicChart.vue'
	import chache from '@/common/utils/storage'
	import config from '@/common/utils/config'
	import {showUiToast,showUiLoading,hideUiLoading} from '@/common/utils/dialog.config'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		name:'marketChart',
		components: {
			hxNavbar,
			dynamicPrice,
			quickOrder,
			dynamicChart
		},
		data() {
			return {
				queryData:{},
				url:''
				
			};
		},
		computed:{
			...mapGetters(['themeFontSize','marketDetails'])
		},
		onLoad(query){
			this.queryData=query;
			console.log(config.domain)
			this.url=`/hybrid/html/index.html?tpCode=${query.tpCode}&
			CommodityName=${query.CommodityName}&
			commodityCode=${query.commodityCode}&
			contractCode=${query.contractCode}&
			productTypeCode=${query.productTypeCode}&
			priceDecimalPlaces=${query.priceDecimalPlaces}&
			token=${query.token}`
			// uni.setNavigationBarTitle({
			// 	title:`${query.CommodityName}(${query.commodityCode})`
			// })
			// let das={
			// 	commodityCode:query.commodityCode,
			// 	contractCode:query.contractCode
			// }
			// this.getMarketDetail({
			// 	templateCode:query.tpCode,
			// 	commodityCode:query.commodityCode
			// })
			// this.getMarketGoods(das)
			// this.getHistoryChart(das)
		},
		methods:{
			...mapActions(['getMarketGoodsDetails','getSingleMarketDetails','getHistoryChartDas']),
			backNextRoute(){
				let das=chache.get('selectTemName')
				this.$mRouter.reLaunch({
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
