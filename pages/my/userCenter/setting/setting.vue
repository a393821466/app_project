<template>
	<view class="settingView">
		<view class="setting_box">
			<view class="setting_top">
				<view class="setting_list" v-for="(item,idx) in userArr" :key="item.id">
					<view class="setting_title">{{item.title}}</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
			</view>
			<view class="setting_middle">
				<view class="setting_list" v-for="(item,idx) in commonUse" :key="item.id">
					<view class="setting_title">{{item.title}}</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
				<view class="setting_list">
					<view class="setting_title">夜间模式</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
			</view>
			<view class="setting_middle2">
				<view class="setting_list" v-for="(item,idx) in helpArr" :key="item.id">
					<view class="setting_title">{{item.title}}</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
			</view>
			<view class="setting_logout" @click="logoutActions">
				<view class="setting_list">
					<view class="setting_title" style="text-align:center;">退出</view>
				</view>
			</view>
			<!-- <view class="lookUserRisk">
				查看<text class="goUserRisk">《用户须知以及风险提示》</text>
			</view>
			<button type="primary" class="logout_user" @click="logoutActions">退出当前账号</button> -->
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
				userArr:[
					{
						id:0,
						title:'个人设置',
						link:''
					},
					{
						id:1,
						title:'登陆密码',
						link:''
					},
					{
						id:2,
						title:'资金密码',
						link:''
					},
					{
						id:3,
						title:'安全设置',
						link:''
					},
				],
				commonUse:[
					// {
					// 	id:1,
					// 	title:'隐私',
					// 	link:''
					// },
					{
						id:2,
						title:'字体大小',
						link:''
					}
				],
				helpArr:[
					{
						id:3,
						title:'查看须知以及风险提示',
						link:''
					},
					{
						id:4,
						title:'联系客服',
						link:''
					},
					{
						id:5,
						title:'关于',
						link:''
					}
				]
			};
		},
		methods:{
			...mapActions(['logout','resetCommonState','resetHomeState','resetMy']),
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
								that.resetCommonState()
								that.resetHomeState()
								that.resetMy()
								chache.clear()
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
