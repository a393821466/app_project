<template>
	<view class="bankView">
		<view class="bank_box">
			<view class="uni-list">
			  <uni-swipe-action :options="options" @click="bindClick">
				<view class="cont">SwipeAction 基础使用场景</view>
			  </uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	export default {
		components:{
			uniSwipeAction
		},
		data() {
			return {
				options: [{
				  text: '删除',
				  style: {
					backgroundColor: '#007aff'
				  }
				}],
			};
		},
		methods:{
			bindClick(e) {
				console.log(e)
				uni.showToast({
				  title: `点击了${e.content.text}按钮`,
				  icon: 'none'
				})
		  },
		}
	}
</script>

<style lang="scss">
@import './bank.scss';
</style>
