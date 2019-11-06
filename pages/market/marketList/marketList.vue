<template>
	<view>
		行情列表
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:''
			};
		},
		onLoad(query){
			this.code=query.marketName
			uni.setNavigationBarTitle({
				title:query.marketName
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
@import './marketList.scss';
</style>
