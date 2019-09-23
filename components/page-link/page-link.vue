<template>
	<view @click="openPage">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			to:{
				type:[Object,String],
				required:true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			openPage(){
				this.$openPage(this.to)
			}
		}
	}
</script>

<style>

</style>
