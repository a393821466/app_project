<template>
	<view class="page">
		<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)" :autoplay="true" :interval="5000" :duration="500" class="banner">
			<swiper-item>
				<image src="http://n.sinaimg.cn/sinacn20111/765/w1067h498/20190823/be7d-icqznha0469343.jpg" class="banner"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://img5.imgtn.bdimg.com/it/u=538384195,3019699462&fm=26&gp=0.jpg" class="banner"></image>
			</swiper-item>
		</swiper>
		<view class="service">
			
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default{
		data(){
			return{
				names:'dada'
			}
		},
		computed:{
			...mapGetters(['annount']),
			getAnnountList(){
				return this.annount;
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
			    title: '首页'
			});
			this.getAnnount()
		},
		methods:{
			...mapActions(['getAnnount'])
		}
	}
</script>

<style>
@import url("index.css");
</style>
