<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" class="banner">
			<swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png" mode="" class="banner"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png" mode="" class="banner"></image>
			</swiper-item>
		</swiper>
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
		onLoad(){
			this.$store.dispatch('getAnnount')
		},
		methods:{
			...mapActions(['getAnnount'])
		}
	}
</script>

<style>
@import url("index.css");
</style>
