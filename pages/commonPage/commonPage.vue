<template>
<view class="commonPage">
	<header-view :isBack="false" :title="getNavigatorName">
	</header-view>
	<index-page v-if="currentIndex==0"></index-page>
	<market-page v-if="currentIndex==1"></market-page>
	<trade-page v-if="currentIndex==2"></trade-page>
	<news-page v-if="currentIndex==3"></news-page>
	<my-page v-if="currentIndex==4"></my-page>
	<footer-view :current='currentIndex' @click="tabClick"></footer-view>
</view>
</template>

<script>
	import indexPage from '../index'
	import marketPage from '../market/market'
	import tradePage from '../trade/trade'
	import newsPage from '../news/news'
	import myPage from '../my/my'
export default{
	name:'commonPage',
	components:{
		indexPage,
		marketPage,
		tradePage,
		newsPage,
		myPage
	},
	computed:{
		getNavigatorName(){
			switch(this.currentIndex){
				case 0:
					return '首页'
					break;
				case 1:
					return '行情'
					break;
				case 2:
					return '交易'
					break;
				case 3:
					return '资讯'
					break;
				default:
					return '我的'
			}
		}
	},
	data(){
		return {
			currentIndex:0
		}
	},
	onLoad(){
		console.log(this.statusBar)
	},
	methods:{
		// 索引按钮
		tabClick(val){
			this.currentIndex=val
		}
	},
	onPullDownRefresh(e){
		console.log(e);
	}
}
</script>

<style>
</style>
