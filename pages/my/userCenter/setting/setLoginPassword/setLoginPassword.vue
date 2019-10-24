<template>
	<view class="setLoginPwd">
		<view class="setTopView">
			<view class="userText1">请为您的账号</view>
			<view class="userAccount">{{getUserPhone}}</view>
			<view class="newText2">设置一个新登陆密码</view>
		</view>
		<view class="setting_box">
			<view class="setting_top">
				<view class="setting_list">
					<view class="setting_title">
						<input type="text" class="emailView" maxlength="6" placeholder="请输入手机验证码"
						 v-model="user.phoneCode">
					</view>
					<view class="setting">
						<button class="mini-btn code" type="primary" size="mini" :disabled='disabled' @click="openCode">{{timeText}}</button>
					</view>
				</view>
				<view class="setting_list">
					<view class="setting_title password">
						<input :type="eye_type1?'password':'text'" class="emailView" placeholder="请输入密码" v-model="user.password">
					</view>
					<view class="setting_icon" @click="setting_eye">
						<fonts-icon type="yanjing1" size='32' color='#999' v-if='eye_type1'></fonts-icon>
						<fonts-icon type="yanjing" size='32' color='#999' v-else></fonts-icon>
					</view>
				</view>
				<view class="setting_list">
					<view class="setting_title password">
						<input :type="eye_type1?'password':'text'" class="emailView" placeholder="确认密码" v-model="user.comfirmPwd">
					</view>
					<view class="setting_icon">
					</view>
				</view>
			</view>
			<view class="submit_button">
				<button type="primary" class="submit_btn" @click="setSubmitPwd" :loading="!flat">提交</button>
			</view>
		</view>
		<popup ref="code">
			<view class="phoneCode">
				<view class="title">请输入图形验证码</view>
				<view class="imgCode">
					<input type="text" v-model='user.imgCode' maxlength="4" class="imgInput" />
					<view class="imgView" @click="refurbish">
						<img :src="'data:image/png;base64,'+ verifyImg">
					</view>
				</view>
				<view class="btn">
					<button type="primary" size='mini' class="mini-btn comfirm" @click="comfirms">确定</button>
					<button type="primary" size='mini' class="mini-btn canlen" plain="true" @click="cancel">取消</button>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {isPhone,isPssword} from '@/common/utils/validate'
import {showUiToast,showUiModel} from '@/common/utils/dialog.config'
import Popup from '@/components/popup'
export default {
	name:'setLoginPassword',
	components:{
		Popup
	},
	data() {
		return {
			flat:true,
			user:{
				phoneCode:'',
				password:'',
				comfirmPwd:'',
				templateType:'2',
				imgCode:''
			},
			timeText: '获取验证码',
		    disabled: false,
		    time: 60,
		    eye_type1: true
		};
	},
	computed:{
		...mapGetters(['userInfo','verifyImg']),
		getUserPhone(){
			return this.userInfo.userPhone;
		}
	},
	methods:{
		...mapActions(['getVerifyImg','sendVerifyCode','setPassword']),
		// 验证码dialog
		openCode(){
			this.$refs.code.open()
			this.verifyCodes()
		},
		// 取消
		cancel(){
			this.user.imgCode=''
			this.$refs.code.close()
		},
		// 刷新验证码
		refurbish(){
			this.verifyCodes()
		},
		verifyCodes(){
			this.getVerifyImg()
		},
		// 发送手机验证码
		comfirms(){
			const that=this
			this.user.phone=this.getUserPhone.trim();
			if(!this.user.imgCode){
				showUiToast('验证码不能为空');
				return;
			}
			this.sendVerifyCode(this.user).then(res=>{
				if(res.status){
					that.timer()
					that.cancel()
				}
			}).catch(err=>{
				return err;
			})
		},
		// 设置密码
		setSubmitPwd(){
			const that=this
			if(!this.user.phoneCode){
				showUiToast('手机验证码不能为空');
				return;
			}
			if(this.user.password!==this.user.comfirmPwd){
				showUiToast('两次密码不匹配');
				return;
			}
			this.user.phone=this.getUserPhone.trim();
			if(this.flat){
				this.flat=false
				that.setPassword(this.user).then(res=>{
					this.flat=true
					if(res.status){
						showUiToast('设置成功');
					}else{
						showUiToast(res.msg);
					}
				}).catch(err=>{
					this.flat=true
					return err;
				})
			}
			
		},
		setting_eye(){
			this.eye_type1=!this.eye_type1
		},
		// 计时器
		timer() {
		  if (this.time > 0) {
			this.time--
			this.timeText = this.time + 's后再获取'
			setTimeout(this.timer, 1000)
		  } else {
			this.time = 60
			this.timeText = '获取验证码'
			this.disabled = false
		  }
		}
	}
}
</script>

<style lang="scss">
@import './setLoginPassword.scss';
</style>
