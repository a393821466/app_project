<template>
<!--轮播-->
<view class="banner_home">
	<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)"
	 :autoplay="true" :interval="5000" :duration="500" class="banner" v-if="banners.length>0">
		<swiper-item v-for="item in banners" :key="item.id" @click="onClickBanner(item)">
			<image :src="item.url" class="banner"></image>
		</swiper-item>
	</swiper>
	<view class="home_banner" v-else></view>
</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import config from '@/common/utils/config'
	import {
		showUiToast
	} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default{
		name:'swiper',
		props:{
			bannerData:{
				type:[Array,Object],
				required:true
			}
		},
		computed:{
			banners(){
				if(this.bannerData.length>0){
					return this.bannerData;
				}else{
					if(chache.has('banner')){
						let bannerList=chache.get('banner')
						return bannerList;
					}else{
						return [];
					}
				}
			}
		},
		methods:{
			...mapActions(['sendUrl']),
			onClickBanner(item){
			    if (item.breakUrl === '' || !item.breakUrl) {
				  showUiToast('无跳转地址');
				  return
			    }
				let u = config.domain;
			    let url = item.breakUrl
			    if (url !== '') {
				  let us = url.split(':')
				if (us[0] === 'http' || us[0] === 'https') {
					this.sendUrl(url)
				} else {
					this.sendUrl(u + '/' + url)
				}
				this.$mRouter.push({
					route:this.$routers.webViewUi,
					query:{
						title:item.title
					}
				})
			  }
			}
		}
	}
</script>

<style lang="scss">
	/* 首页 */
	.banner,.home_banner {
		width: 100%;
		height: 320rpx;
	}
	.home_banner{
		background:#eee;
	}
</style>
