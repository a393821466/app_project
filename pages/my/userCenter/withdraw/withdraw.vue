<template>
	<view class="withdrawView">
		<view class="withdrawBox">
			<view @click="onKeys">点击</view>
			<text>{{moneyNum}}</text>
			<payKey :isTrue='flat' @backFnc='backFnc'></payKey>
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
				flat:false,
				moneyNum:''
			};
		},
		methods:{
			onKeys(){
				this.flat=!this.flat
			},
			backFnc(val){
				this.moneyNum=val.password;
				this.flat=val.isTrue;
			}
		}
	}
</script>

<style lang="scss">
@import './withdraw.scss'
</style>
