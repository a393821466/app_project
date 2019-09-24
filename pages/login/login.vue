<template>
	<view class="login" :class='className'>
		<view class="logo">
			<image src="../../static/images/yh1.png" class="logo_img"></image>
			<text class="logo_txt">欢迎来到期货交易通</text>
		</view>
		<view class="login_form">
			<view class="login_form_node login_form_userPhone">
				<view class="loginsIcon">
					<fonts-icon type='huiyuanzhongxin' color='#666'></fonts-icon>
				</view>
				<input type="number" maxlength="11" :value="ruleForm.username" placeholder="请输入手机号码" class="loginInput userPhone" />
			</view>
			<view class="login_form_node login_form_userPassword">
				<view class="loginsIcon"><fonts-icon type='suo' color='#666'></fonts-icon></view>
				<input type="password" value="" placeholder="请输入密码" class="loginInput userPassword" />
				<view class="login_hide_pwd">
					<fonts-icon type='yanjing1' color='#666' @click.native="onClickEye"></fonts-icon>
				</view>
			</view>
			<view class="login_form_forgetPassword">
				<label class="boxCheckBoxView">
					<view class="checkBoxStyle">
						<checkbox value="" style="transform:scale(0.8)" checked />
					</view>
					<view class="checkBoxText">记住密码?</view>
				</label>
				<view class="forget_password">忘记密码?</view>
			</view>
			<view class="login_submit">
				<button type="primary" class="login_submit_int" @click="login_btn" :loading="btnLoading">登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	import fontsIcon from '@/components/ui-font/'
	import {showUiToast,appToast} from '@/common/utils/dialog.config'
	export default {
		name:'login',
		components:{
			fontsIcon
		},
		data() {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				optionVal: false,
				eye_type: true,
				btnLoading:false
			}
		},
		computed:{
			...mapGetters(['className']),
		},
		methods: {
			onClickEye(){
				console.log(1);
			},
			login_btn(){
				const _that = this
				if (!this.ruleForm.username || !this.ruleForm.password) {
					_that.errToast('用户名或密码不能为空')
					return false
				}
			},
			errToast(content){
				// #ifdef APP-PLUS
					appToast(content)
				// #endif
				
				// #ifndef APP-PLUS
					showUiToast(content)
				// #endif
			}
		}
	}
</script>

<style lang="scss">
@import './login.scss';
</style>
