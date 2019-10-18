<template>
	<view class="realNameView">
		<view class="oNrealName" v-if="getVierity||nowUserVierity">
			<view class="oNrealNameIcon">
				<fonts-icon type="wodeshimingrenzhengx" size='216' color='#1b82d1'></fonts-icon>
			</view>
			<view class="onRealNameText">账号已实名认证</view>
			<view class="breakUserCenter" @click="breakUserCenter">返回会员中心</view>
		</view>
		<view class="noRealName" v-else>
			<view class="tip">
				<fonts-icon type="wenti" size='42' color="#1b82d1"></fonts-icon>
				<text class="info">请填写您的真实信息，通过后将不能修改</text>
			</view>
			<view class="realInput">
				<view class="realNameInputView">
					<text class="flexBankView title">真实姓名</text>
					<view class="flexBankView input">
						<input type="text" placeholder="请输入您的真实姓名" v-model='readNameInput.realName' @input='changeRealName' class="realNameInput">
					</view>
					<view class="flexBankView iconRight">
						<view class="state" :style="{display:state1?'block':'none'}" @click="clean('realName')">
							<!-- <image src="../../../../static/images/g.svg" class="stateImg" v-if='state1==1'></image>
							<image src="../../../../static/images/jg.svg" class="stateImg" v-else-if='state1==2'></image> -->
							X
						</view>
					</view>
				</view>
				<view class="realNameInputView">
					<text class="flexBankView title">身份证号</text>
					<view class="flexBankView input">
						<input type="text" placeholder="请输入您的身份证号码" v-model='readNameInput.idCard' @input='changeCartId' maxlength='18'
						 class="cartId">
					</view>
					<view class="flexBankView iconRight">
						<view class="state" :style="{display:state2?'block':'none'}" @click="clean('cartId')">
							<!-- <image src="../../../../static/images/g.svg" class="stateImg" v-if='state2==1'></image>
							<image src="../../../../static/images/jg.svg" class="stateImg" v-else-if='state2==2'></image> -->
							X
						</view>
					</view>
				</view>
			</view>
			<view class="submit_realName">
				<button type="primary" @click="bindRealName" :loading="!flat">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isRealName,
		isCardNo
	} from '@/common/utils/validate'
	import {
		showUiToast,
		showUiModel
	} from '@/common/utils/dialog.config'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import chache from '@/common/utils/storage'
	export default {
		name: 'realName',
		data() {
			return {
				flat: true,
				state1: false,
				state2: false,
				nowUserVierity: 0,
				readNameInput: {
					realName: '',
					idCard: ''
				}
			};
		},
		computed: {
			...mapGetters(['userInfo']),
			getVierity() {
				return this.userInfo.isUserVierity || chache.get('isUserVierity') ? true : false
			}
		},
		methods: {
			...mapActions(['bindRealNameStore']),
			bindRealName() {
				if (!isRealName(this.readNameInput.realName)) {
					showUiToast('真实姓名格式不正确')
					return
				}
				if (!isCardNo(this.readNameInput.idCard)) {
					showUiToast('身份证格式不正确')
					return
				}
				this.readNameInput.phone = this.userInfo.userPhone
				let params = {
					data: this.readNameInput
				}
				if (this.flat) {
					this.flat = false
					this.bindRealNameStore(params).then(res => {
						this.flat = true
						if (res.status) {
							chache.set('isUserVierity', 1)
							this.nowUserVierity=1
							showUiToast('实名认证成功')
							this.readNameInput.realName = ''
							this.readNameInput.idCard = ''
							this.state1 = false
							this.state2 = false
							return
						}
						showUiToast(res.msg)
					}).catch(err => {
						this.flat = true
						return err
					})
				}
			},
			breakUserCenter() {
				this.$mRouter.reLaunch({
					route: this.$routers.my
				})
			},
			changeRealName(inp) {
				if (!inp.target.value) {
					this.state1 = false
				} else {
					this.state1 = true
				}
			},
			changeCartId(inp) {
				if (!inp.target.value) {
					this.state2 = false
				} else {
					this.state2 = true
				}
			},
			clean(n) {
				if (n == 'realName') {
					this.readNameInput.realName = ''
					this.state1 = false
					return
				}
				if (n == 'cartId') {
					this.readNameInput.idCard = ''
					this.state2 = false
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './realName.scss';
</style>
