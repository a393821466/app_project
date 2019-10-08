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
			<button type="primary" class="logout_user">退出当前账号</button>
		</view>
	</view>
</template>

<script>
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
		}
	}
</script>

<style lang="scss">
@import './setting.scss';
</style>
