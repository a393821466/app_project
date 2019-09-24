<template>
	<view class="login" :class='className'>
		<view class="logo">
			<image src="../../static/images/yh1.png" class="logo_img"></image>
			<text class="logo_txt">欢迎来到期货交易通</text>
		</view>
		<view class="login_form">
			<view class="login_form_node login_form_userPhone">
				<view class="loginsIcon"><fonts-icon type='huiyuanzhongxin' size='38'></fonts-icon></view>
				<input type="text" maxlength="11" value="" placeholder="请输入手机号码" class="loginInput userPhone" />
			</view>
			<view class="login_form_node login_form_userPassword">
				<view class="loginsIcon"><fonts-icon type='suo' size='38'></fonts-icon></view>
				<input type="password" value="" placeholder="请输入密码" class="loginInput userPassword" />
				<view class="login_hide_pwd">
					<fonts-icon type='yanjing1' size='38' @click.native="onClickEye"></fonts-icon>
				</view>
			</view>
			<view class="login_form_node login_form_forgetPassword">
				
			</view>
			<view class="login_form_node login_submit"></view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	import fontsIcon from '@/components/ui-font/'
	export default {
		name:'login',
		components:{
			fontsIcon
		},
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(['className'])
		},
		methods: {
			onClickEye(){
				console.log(1);
			}
		}
	}
</script>

<style lang="scss">
@import './login.scss';
</style>
