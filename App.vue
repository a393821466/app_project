<script>
export default{
	name:'App',
	onLaunch(){
		// #ifdef H5
			this.$AppEntryController.handleH5BrowserAddressBarAuth();
		// #endif
	}
}
</script>

<style lang='scss'>
	@import "./common/style/daytime.scss";
	@import "./common/style/evening.scss";
</style>
