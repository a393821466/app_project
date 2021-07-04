<template>
<view class="market_box" :class="themeFontSize">
	<view class="category_home" v-if="categoryData.length>0">
		<view class="category_list" v-for="(item,idx) in categoryData" :key="item.id" :class="idx===categoryData.length-1&&categoryData.length%2==1?'upside_list_class':''"
		 :style='{backgroundColor:!item.color?"#999":item.color}' @click="goMarketList(item)">
			<text class="category_text">{{item.templateName}}</text>
			<view :class="idx===categoryData.length-1&&categoryData.length%2==1?'img':'category_backgorund'"></view>
		</view>
	</view>
	<view class="category_home category_boxs" v-else>
		<view class="category_list"  v-for="(item,idx) in 5" :key="idx">
		</view>
	</view>
</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	import {showUiModel} from '@/common/utils/dialog.config'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['temList','themeFontSize','token']),
			categoryData(){
				if(this.temList.length>0){
					return this.temList;
				}else{
					if(chache.has('template')){
						let tem=chache.get('template')
						return tem;
					}else{
						return [];
					}
				}
			}
		},
		onShow(){
			if(this.categoryData.length==0){
				this.getTemplateData();
			}
		},
		methods:{
			...mapActions(['getTemplate']),
			// 获取模板
			getTemplateData() {
				this.getTemplate().then(res => {
					if(res.status){
						uni.stopPullDownRefresh();
					}
				}).catch(err=>{
					return err;
				})
			},
			// 去行情列表
			goMarketList(item){
				const that=this
				if(chache.has('token')){
					let das={
						code:item.templateCode,
						marketName:item.templateName
					}
					this.$mRouter.push({
						route:this.$routers.marketList,
						query:das
					})
					chache.set('selectTemName',das)
				}else{
					showUiModel({
						'content': '您还未登陆,去登陆?',
						'showCancel': true
					}, (e) => {
						if (e.confirm) {
							that.$mRouter.push({
								route:that.$routers.login
							})
						}
					})
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh(e){
			this.getTemplateData()
			// setTimeout(() => {
			// 	uni.stopPullDownRefresh();
			// }, 3000);
		}
	}
</script>

<style lang="scss">
@import './market.scss';
</style>
