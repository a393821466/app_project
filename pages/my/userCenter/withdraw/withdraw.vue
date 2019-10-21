<template>
	<view class="withdrawView">
		<view class="withdrawBox">
			<view class="selectBankInfo" @click="openSelectBankList">
				<view class="bankStyle goBank">到账银行卡</view>
				<view class="bankStyle bankCartNo">
					<view class="bankType" v-if="bankInfo.bankCode">
						<view class="bankIcons">
							<fonts-icon :type="bankInfo.bankCode" size='34' :color='bankInfo.color'></fonts-icon>
						</view>
						<text class="bankName">{{bankInfo.bankName}}({{bankInfo.accountNum.substr(bankInfo.accountNum.length-4)}})</text>
					</view>
					<view class="bankType" v-else>
						<view class="bankIcons">
							<fonts-icon :type="bankInfo.bankCode" size='34' :color='bankInfo.color'></fonts-icon>
						</view>
						<text class="bankName">加载中..</text>
					</view>
					<view class="withdrawInfo">
						如长时间未收到款请联系客服
					</view>
				</view>
			</view>
			<view class="moneyNum">
				<view class="withdraw_text">提现金额</view>
				<view class="inputMoneyNumber">
					<view class="moneyIcon">
						￥
					</view>
					<input type="number" @input="moneyInput($event)" v-model="withdrawInfo.money" class="moneySum" />
				</view>
				<view class="nowMoneyNum">
					<view class="moneyText" v-if="moneyBeyond">当前可提余额为<text style="color:crimson">{{userBalance.amountUseable}}</text>元，<view
						 class="withdraw_action" @click="allWithdraw">全部提现</view>
					</view>
					<view class="moneyText" v-else>输入金额超出账户可用金额</view>
				</view>
				<view class="inputMoneyNumber">
					<view class="moneyIcon">
						<fonts-icon type="suo" size="43" color='#000000'></fonts-icon>
					</view>
					<input type="password" placeholder="资金密码" v-model="withdrawInfo.funPwd" class="withdrawFullPassword" />
				</view>
				<view class="withdraw_btn">
					<button type="primary" :class="[disabled?'withdraw_disabled':'withdraw_button_style']" :disabled='disabled' @click="goWithdraw">提现</button>
				</view>
			</view>
		</view>
		<!--银行卡选择-->
		<popup ref="popup" type="bottom">
			<view class="popupTitle">
				<view class="selectBank">请选择到账银行卡</view>
				<view class="bankText">如长时间未收到款,请联系客服</view>
			</view>
			<view class="selectBankBox">
				<view class="selectBankList" v-for="(item,idx) in formartBankList" :key='idx' @click="selectBank(item)">
					<view class="bankIcon">
						<view class="bankStyleSize">
							<fonts-icon :type="item.bankCode" size='34' :color='item.color'></fonts-icon>
						</view>
					</view>
					<view class="bankTitles">
						<view class="selectBankName">
							{{item.bankName}}（{{item.accountNum.substr(item.accountNum.length-4)}}）
						</view>
						<view class="selectBankInfo">暂无信息</view>
					</view>
					<view class="is_select">
						<view class="selectImg" v-if="item.bankCode==bankInfo.bankCode">
							<image src="../../../../static/images/bankSelect_active.png" class="select"></image>
						</view>
						<view class="selectImg" v-else>
							<image src="../../../../static/images/bankSelect_no_active.png" class="select"></image>
						</view>
					</view>
				</view>
				<view class="selectBankList" v-show='allWithdraw.length<3'>
					<view class="bankIcon">
					</view>
					<view class="bankTitles addNewBank">
						添加新银行卡
					</view>
					<view class="is_select">
						<view class="selectImg">
							<image src="../../../../static/images/bankSelect_no_active.png" class="select"></image>
						</view>
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import Popup from '@/components/popup'
	import {
		showUiToast
	} from '@/common/utils/dialog.config'
	import {
		bankColor
	} from '../bank/bankConfig'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name: 'withdraw',
		components: {
			Popup
		},
		computed: {
			...mapGetters(['userInfo', 'myBankList', 'userBalance']),
			// 银行卡渲染前做的处理
			formartBankList() {
				if (this.myBankList.length > 0) {
					let banks = this.myBankList;
					banks.map((item) => {
						item.color = bankColor[item.bankCode];
						return item;
					})
					return banks;
				}
			}
		},
		data() {
			return {
				withdrawInfo: {
					money: '',
					funPwd: ''
				},
				bankInfo: {},
				moneyBeyond: 'false',
				goBindBank: false,
				disabled: true
			};
		},
		onReady() {
			this.getBank()
		},
		onShow() {
			if (!this.userBalance.amountUseable) {
				this.getMines()
			}
		},
		methods: {
			...mapActions(['queryBank', 'getMine']),
			goWithdraw() {
				if (!this.withdrawInfo.money) {
					showUiToast('请输入提款金额');
					return;
				}
				if (!this.withdrawInfo.funPwd) {
					showUiToast('请输入资金密码');
					return;
				}
			},
			selectBank(it) {
				this.bankInfo = it;
				this.$refs.popup.close()
			},
			allWithdraw() {
				this.withdrawInfo.money = this.userBalance.amountUseable
				this.disabled = false
			},
			// 获取金额
			getMines() {
				this.getMine().then(res => {
					if (!res.status) {
						showUiModel(res.msg)
					}
				}).catch(err => {
					return err
				})
			},
			// 绑定账号绑定的银行卡
			getBank() {
				const that = this
				const uuid = this.userInfo.uuid;
				this.queryBank({
					uuid: uuid
				}).then(res => {
					that.selectBank(that.formartBankList[0]);
					this.goBindBank = true
				}).catch(err => {
					this.goBindBank = true
					return err
				})
			},
			// 输入判断状态
			moneyInput(e) {
				if (e.detail.value) {
					if (Number(e.detail.value) <= Number(this.userBalance.amountUseable)) {
						this.disabled = false
					}
				} else {
					this.disabled = true
				}
				if (Number(e.detail.value) > Number(this.userBalance.amountUseable)) {
					this.moneyBeyond = false
				} else {
					this.moneyBeyond = true
				}
			},
			openSelectBankList() {
				if (this.goBindBank) {
					this.$refs.popup.open()
				} else {
					showUiToast(`正在获取您的银行卡列表,请稍后..`);
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './withdraw.scss'
</style>
