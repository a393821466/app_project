<template>
	<view>
		注册
	</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			chache.clear()
		}
	}
</script>

<style lang="scss">

</style>
