<template>
	<view class="settingView">
		<view class="setting_box">
			<view class="setting_list" v-for="(item,idx) in settingArr" :key="idx">
				<view class="setting_title">{{item.title}}</view>
				<view class="setting_icon">
					<fonts-icon type="fanhui" size='34' color='#999'></fonts-icon>
				</view>
			</view>
			<view class="lookUserRisk">
				查看<text class="goUserRisk">《用户须知以及风险提示》</text>
			</view>
			<button type="primary" class="logout_user" @click="logoutActions">退出当前账号</button>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	import {
		showUiModel
	} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default {
		data() {
			return {
				settingArr:[
					{
						title:'个人资料',
						link:''
					},
					{
						title:'修改登陆密码',
						link:''
					},
					{
						title:'修改资金密码',
						link:''
					},
					{
						title:'联系客服',
						link:''
					}
				]
			};
		},
		methods:{
			...mapActions(['logout','resetCommonState','resetHomeState']),
			logoutActions(){
				const that=this;
				showUiModel({'content':'您确认退出么?','showCancel':true},(e)=>{
					if(e.confirm){
						uni.showLoading({
						    title: '请稍后...'
						});
						that.logout().then(res=>{
							uni.hideLoading();
							if(res.status){
								chache.clear()
								that.resetCommonState()
								that.resetHomeState()
								that.$mRouter.reLaunch({
									route:that.$routers.index,
									query:{
										id:1
									}
								})
							}
						}).catch(err=>{
							uni.hideLoading();
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
@import './setting.scss';
</style>
