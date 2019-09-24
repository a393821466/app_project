<template>
<!--轮播-->
<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)"
 :autoplay="true" :interval="5000" :duration="500" class="banner">
	<swiper-item>
		<image src="http://n.sinaimg.cn/sinacn20111/765/w1067h498/20190823/be7d-icqznha0469343.jpg" class="banner"></image>
	</swiper-item>
	<swiper-item>
		<image src="http://img5.imgtn.bdimg.com/it/u=538384195,3019699462&fm=26&gp=0.jpg" class="banner"></image>
	</swiper-item>
</swiper>
</template>

<script>
	export default{
		name:'banner',
		data(){
			return{
				da:''
			}
		}
	}
</script>

<style>
.banner {
	width: 100%;
	height: 320upx;
}
</style>
