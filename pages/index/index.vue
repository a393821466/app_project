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
		<view>
			<block v-for="(item,idx) in annountData" :key="idx" v-html="item.cnContent"></block>
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
				...mapGetters(['annountData'])
		},
		onLoad(){
			this.getAnnount();
		},
		methods:{
			...mapActions(['getAnnount'])
		}
	}
</script>

<style>
@import url("index.css");
</style>
