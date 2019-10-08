<template>
<!--轮播-->
<view class="banner_home">
	<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)"
	 :autoplay="true" :interval="5000" :duration="500" class="banner" v-if="bannerData.length>0">
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
				return this.bannerData.length>0?this.bannerData:[];
			}
		},
		methods:{
			...mapActions(['sendUrl']),
			onClickBanner(item){
				let u = ''
			    if (item.breakUrl === '' || !item.breakUrl) {
				  return
			    }
			    if (process.env.NODE_ENV === 'development') {
				  u = 'http://cxx.99qupai.com'
			    } else {
				  u = location.origin
			    }
			    let url = item.breakUrl
			    if (url !== '') {
				  let us = url.split(':')
				if (us[0] === 'http' || us[0] === 'https') {
					this.sendUrl(url)
				} else {
					this.sendUrl(u + '/' + url)
				}
				this.$mRouter.push({
					route:this.$routers.webViewUi
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
