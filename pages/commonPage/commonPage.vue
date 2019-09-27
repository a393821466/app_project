<template>
<view class="commonPage">
	<header-view :headerLeft="true" :title="getNavigatorName">
		<view class="top_right" slot="header_Right" @click="goLogin">
			注册
		</view>
	</header-view>
	<index-page :style="{'display':currentIndex==0?'block':'none'}" ref="goIndexPage"></index-page>
	<market-page :style="{'display':currentIndex==1?'block':'none'}"></market-page>
	<trade-page :style="{'display':currentIndex==2?'block':'none'}"></trade-page>
	<news-page :style="{'display':currentIndex==3?'block':'none'}"></news-page>
	<my-page :style="{'display':currentIndex==4?'block':'none'}"></my-page>
	<footer-view :current='currentIndex' @click="tabClick"></footer-view>
</view>
</template>

<script>
	import indexPage from '../index'
	import marketPage from '../market/market'
	import tradePage from '../trade/trade'
	import newsPage from '../news/news'
	import myPage from '../my/my'
	import chache from '@/common/utils/storage'
	import {showUiModel,confirmModel} from '@/common/utils/dialog.config'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
export default{
	name:'commonPage',
	components:{
		indexPage,
		marketPage,
		tradePage,
		newsPage,
		myPage
	},
	onReady(){
		this.tabClick(this.currentIndex);
	},
	computed:{
		...mapGetters(['token']),
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
	methods:{
		...mapActions(['noticeTimer']),
		// 索引按钮
		tabClick(val){
			const _that=this
			if(val==0){
				console.log('进入了这里')
				this.noticeTimer(true)
			}else{
				this.noticeTimer(false)
			}
			if(val==2||val==4){
				if(!chache.has('token')||!this.token){
					showUiModel({content:'您还未登陆,去登陆?',showCancel:true},(e)=>{
						if(e.confirm){
							_that.$mRouter.push({
								route:_that.$routers.login
							})
						}
					})
				}else{
					this.currentIndex=val
				}
			}else{
				this.currentIndex=val
			}
		},
		goLogin(){
			this.$mRouter.push({
				route:this.$routers.register
			})
		}
	},
	onPullDownRefresh(e){
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 3000);
	}
}
</script>

<style lang="scss">
.top_right{
	font-size:28rpx;
	/* #ifdef APP-PLUS */
	line-height:120rpx;
	/* #endif */
	/* #ifndef APP-PLUS */
	line-height:90rpx;
	/* #endif */
	color:#eee;
}
</style>
