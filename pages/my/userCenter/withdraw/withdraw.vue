<template>
	<view class="withdrawView">
		<view class="withdrawBox">
			<view @click="onKeys">点击</view>
			<payKey :isTrue='flat'></payKey>
		</view>
	</view>
</template>

<script>
	import payKey from '@/components/numKey'
	export default {
		name:'withdraw',
		components:{
			payKey
		},
		data() {
			return {
				flat:false
			};
		},
		methods:{
			onKeys(){
				this.flat=!this.flat
			}
		}
	}
</script>

<style lang="scss">
@import './withdraw.scss'
</style>
