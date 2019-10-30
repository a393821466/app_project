<template>
	<view class="fontSizeView" :class="themeFontSize">
		<view class="fontView">
			<view class="bindInfo">
				<view class="bindTitle bind">预览字体大小</view>
			</view>
			<view class="bindInfo">
				<view class="bindTitle bind">拖动下面的滑块,可设置字体大小</view>
			</view>
			<view class="bindInfo">
				<view class="bindTitle bind">设置后,APP字体会变化</view>
			</view>
		</view>
		<view class="slider_fontSize_view">
			<view class="fontSize_view">
				<view class="fontSize_view_fontSize view1">小</view>
				<view class="fontSize_view_fontSize view2">标准</view>
				<view class="fontSize_view_fontSize view3">大</view>
			</view>
			<view class="fontSize_slider">
				<slider @change="changeSlider($event)" value="2" min="1" max="3" name="slider" :show-value="false"></slider>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	export default {
		data() {
			return {
			};
		},
		computed:{
			...mapGetters(['themeFontSize'])
		},
		methods:{
			changeSlider(e){
				console.log(e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
@import './fontSizePage.scss';
</style>
