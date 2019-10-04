<template>
	<view class="trade">
		<view class="trade_box" v-if="token">交易</view>
		<no-login v-else></no-login>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import noLogin from '@/components/noLogin'
	import {showUiToast} from '@/common/utils/dialog.config'
	export default {
		name:'trade',
		components:{
			noLogin
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['className','token']),
		},
		onShow(){
			if(!this.token){
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
