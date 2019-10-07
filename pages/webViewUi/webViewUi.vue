<template>
	<view>
		<web-view :src="getBreakUrl"></web-view>
	</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	export default {
		name:'webViewUi',
		data() {
			return {
				
			}
		},
		computed:{
			getBreakUrl(){
				return chache.has('baseUrl')?chache.get('baseUrl'):'http://baidu.com'
			}
		}
	}
</script>

<style>

</style>
