<template>
	<view class="login" :class='className'>
		<view class="logo">
			<image :src="!merchantInfo?'':merchantInfo.merchantSetting.logoUrl" class="logo_img"></image>
			<text class="logo_txt">欢迎来到{{merchantInfo.merchantName}}</text>
		</view>
		<view class="login_form">
			<view class="login_form_node login_form_userPhone">
				<view class="loginsIcon">
					<fonts-icon type='huiyuanzhongxin' color='#666'></fonts-icon>
				</view>
				<input type="number" maxlength="11" v-model="ruleForm.username" placeholder="请输入手机号码" class="loginInput userPhone" />
			</view>
			<view class="login_form_node login_form_userPassword">
				<view class="loginsIcon"><fonts-icon type='suo' color='#666'></fonts-icon></view>
				<input :type="eye_type?'password':'text'" v-model="ruleForm.password" placeholder="请输入密码" class="loginInput userPassword" />
				<view class="login_hide_pwd">
					<fonts-icon :type='eye_type?"yanjing1":"yanjing"' color='#666' @click.native="onClickEye">
					</fonts-icon>
				</view>
			</view>
			<view class="login_form_forgetPassword">
				<label class="boxCheckBoxView" @click="submitRpassword($event)">
					<view class="checkBoxStyle">
						<checkbox value="fs" color='#666' style="transform:scale(0.8)"
                         :checked="optionVal" />
					</view>
					<view class="checkBoxText">记住密码</view>
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
			...mapGetters(['className','loginKey','merchantInfo'])
		},
		// 每次进来获取登录key
		onShow(){
			this.getKey()
		},
		// 页面加载完成请求merchant
		onReady(){
			this.getMerchant()
		},
		methods: {
			...mapActions(['getKey','getMerchant','loginApp']),
			// 密码眼睛点击事件
			onClickEye(){
				this.eye_type=!this.eye_type;
			},
			// 登录点击事件
			login_btn(){
				const _that = this
				if (!this.ruleForm.username || !this.ruleForm.password) {
					_that.errToast('用户名或密码不能为空')
					return false
				}
				this.btnLoading=true;
				this.loginApp(this.ruleForm).then(res=>{
					_that.btnLoading=false;
					if(res.status){
						_that.$mRouter.switchTab({
							route:_that.$routers.index
						})
					}
				}).catch(err=>{
					this.btnLoading=false;
				})
			},
			// 记住密码
			submitRpassword(e){
				this.optionVal=!this.optionVal
				console.log(this.optionVal);
			},
			// 弹窗
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
.login{
	.logo{
		text-laign:center;
		margin-bottom:30rpx;
		.logo_img{
			width:180rpx;
			height:180rpx;
			margin:70rpx auto 30rpx;
			display:block;
			border-radius:100%;
			background:#999;
		}
		.logo_txt{
			display:block;
			text-align:center;
			font-size:40rpx;
			font-weight:600;
			color:#666;
		}
	}
	.login_form{
		width:600rpx;
		margin:120rpx auto 0;
		.login_form_node{
			position:relative;
			height:80rpx;
			margin-bottom:30rpx;
			padding:15rpx 70rpx 0;
			&.login_form_userPhone,&.login_form_userPassword{
				border-bottom:1rpx solid  #ccc;
			}
			.loginsIcon{
				position:absolute;
				left:15rpx;
				top:20rpx;
			}
			.loginInput{
				width:100%;
				height:60rpx;
				font-size:28rpx;
				border:none;
				outline: none;
			}
			.login_hide_pwd{
				position:absolute;
				right:15rpx;
				top:25rpx;
			}
		}
		.login_form_forgetPassword{
			display:flex;
			flex-direction: row;
			.boxCheckBoxView{
				flex:1;
				.checkBoxStyle,.checkBoxText{
					display:inline-block;
					font-size:30rpx;
					color:#666;
				}
			}
			.forget_password{
				flex:1;
				text-align:right;
				font-size:30rpx;
				color:#666;
			}
		}
		.login_submit_int{
			border-radius:100rpx;
			margin-top:50rpx;
		}
	}
}
</style>
