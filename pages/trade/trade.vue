<template>
	<view>
		交易
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {showUiToast} from '@/common/utils/dialog.config'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['token']),
		},
		onShow(){
			if(!this.token){
				this.$mRouter.push({
					route:this.$routers.login,
					query:{
						id:1
					}
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
