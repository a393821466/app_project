<template>
	<view class="market_list">
		<view class="top-warp">
			<view class="top_tab">
				<view class="tabs" v-for="(tab, i) in marketTitle" :key="i" 
				:class="{'active':curIndex===i}" 
				@click="changeTab(i)">{{tab}}</view>
			</view>
			<!-- <view class="navTitle">
				<view class="nav nav1">商品编码</view>
				<view class="nav nav2">商品名称</view>
				<view class="nav nav3">涨幅</view>
				<view class="nav nav4">最新价/时间</view>
			</view> -->
		</view>
		<swiper class="swiper" :current="curIndex" @change="swiperChange" :style="{height:screenHeight+'px'}">
			<swiper-item v-for="(item,idx) in list" :key='idx'>
				<mescroll-uni
				:fixed="false" 
				top="80" 
				:down="downOption" 
				@down="downCallback" 
				:up="upOption"
				@init="mescrollInit">
					<!-- 数据列表 -->
					<market-list-content :itemData="item"></market-list-content>
				</mescroll-uni>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MarketListContent from "./marketContent/marketListContent"
	import UUID from 'uuid'
	import {
	  command,
	  msg
	} from '@/static/js/proto-helper'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		components: {
			MescrollUni,
			MarketListContent
		},
		data() {
			return {
				curIndex: 0, // 当前tab的下标
				screenHeight:0,
				marketCode:{},
				showList:[],
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
				},
				upOption:{
					use:false,
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~'
					}
				},
				pdList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0,
				list: [{
					commodityCode: 0,
					lastPrice: 0,
					upDropSpeed: 0
			    }],
			};
		},
		computed:{
			...mapGetters(['marketTitle','marketList','marketSocketList','socketTask'])
		},
		watch:{
			marketSocketList(marketData){
				let data = msg.MessageBase.deserializeBinary(marketData).array[6]
				if (!data || !data.length) {
					return
				}else{
					let das=this.list[this.curIndex]
					for (let i = 0; i < das.length; i++) {
						if (data[0] && data[0][1]) {
						  if (
							das[i].commodityCode === data[0][1] &&
							das[i].status !== 2 &&
							das[i].contractCode === data[0][2]
						  ) {
							das[i].lastPrice = data[0][3]
							das[i].upDropSpeed =
							  (data[0][3] - data[0][7]) / data[0][7]
							break
						  }
						}
					}
				}
			}
		},
		onLoad(query){
			// 更改标题
			this.marketCode=query
			uni.setNavigationBarTitle({
				title:query.marketName
			})
		},
		onReady(){
			this.getScreenInfo()
		},
		// 关闭socket
		beforeDestroy() {
			this.closeSocket()
		},
		methods: {
			...mapActions(['createWebsocket','getMarketList','closeSocket']),
			// 初始化
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 轮播菜单
			swiperChange(e){
				this.changeTab(e.detail.current)
			},
			// 切换菜单
			changeTab(i){
				this.curIndex = i
			},
			// 获取行情列表
			getMarketListView(code,mescroll){
				const _that = this
				this.getMarketList({templateCode:code}).then(res=>{
					_that.list=_that.marketList
					_that.startSocket()
					if(mescroll){
						mescroll.endSuccess()
					}
				}).catch(err=>{
					if(mescroll){
						mescroll.endErr()
					}
					return err
				})
			},
			// 执行socket
			startSocket(){
				let message = new msg.MessageBase()
				message.setClientid(UUID.v1())
				message.setCmd(command.CommandType.PUSH_DATA)
				message.setRequesttype(2)
				let bytes = message.serializeBinary()
				this.createWebsocket(bytes)
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				if(this.socketTask!=null){
					this.closeSocket()
				}
				this.getMarketListView(this.marketCode.code,mescroll)
			},
			// 高度
			getScreenInfo(){
				const that=this
				uni.getSystemInfo({
					success: function(e) {
						that.screenHeight=e.windowHeight
					}
				})
			}
		}
	}
</script>

<style lang="scss">
@import './marketList.scss';
</style>
