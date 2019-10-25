<template>
	<view class="withdrawView">
		<view class="withdrawBox" v-if="myBankList.length>0">
			<view class="selectBankInfo" @click="openSelectBankList">
				<view class="bankStyle goBank">到账银行卡</view>
				<view class="bankStyle bankCartNo">
					<view class="bankType" v-if="bankInfo.bankCode">
						<view class="bankIcons">
							<view class="bankIconsStyleRadius">
								<fonts-icon :type="bankInfo.bankCode" size='34' :color='bankInfo.color'></fonts-icon>
							</view>
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
						若长时间未收到款请联系客服
					</view>
				</view>
				<view class="arrow">
					<fonts-icon type="fanhui" size='24' color='#ccc'></fonts-icon>
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
					<input type="password" placeholder="资金密码" v-model="withdrawInfo.funPwd" class="withdrawFullPassword" v-if="userInfo.isSetFundPass" />
					<text v-else class="noFulPassword" @click="goBindFulPasswordPage">您还未绑定资金密码,点我去绑定。</text>
				</view>
				<view class="withdraw_btn">
					<button type="primary" :class="[disabled?'withdraw_disabled':'withdraw_button_style']" :disabled='disabled' @click="goWithdraw">提现</button>
				</view>
			</view>
		</view>
		<view class="noBindBanks" v-else @click="goBankLink">
			点我去绑定银行卡
		</view>
		<!--温馨提示-->
		<popup ref="tipPopup">
			<view class="tipView">
				<view class="title">常见问题</view>
				<view class="p1">
					● 单笔最低金额{{minMoney}}元，单笔最高金额49999元，若订单需持仓过夜，账户需保留当天隔夜费用，以免余额不足
				</view>
				<view class="p1">
					● 提款处理时间：开市时间内早上10:00:00-凌晨02:00:00，到账时间以银行处理时间为准
				</view>
				<view class="p1">
					● 如充值后未交易提款，第一次全额出款，第二次及以后需每笔收取2%的手续费
				</view>
				<view class="p1">
					● 如需帮助请联系在线客服或拨打24小时服务电话：<text class="phone">0510-66611495</text>，竭诚为您提供最好的服务
				</view>
			</view>
		</popup>
		<!--银行卡选择-->
		<popup ref="popup" type="bottom">
			<view class="popupTitle">
				<view class="selectBank">请选择到账银行卡</view>
				<view class="bankText">若长时间未收到款,请联系客服</view>
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
					<view class="bankTitles addNewBank" @click="goBankLink">
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
		showUiToast,
		showUiLoading,
		hideUiLoading,
		showActionSheet
	} from '@/common/utils/dialog.config'
	import {
		bankColor
	} from '../bank/bankConfig'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import chache from '@/common/utils/storage'
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
				tipArr:[
					'提现记录',
					'常见问题'
				],
				bankInfo: {},
				moneyBeyond: 'false',
				goBindBank: false,
				disabled: true,
				minMoney: 100
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
		onNavigationBarButtonTap() {
			showActionSheet({arr:this.tipArr},(res)=>{
				if(res.tapIndex==0){
					console.log('提现记录')
					return;
				}
				if(res.tapIndex==1){
					this.$refs.tipPopup.open();
					return
				}
			},(e)=>{
				console.log(e)
			})
		},
		methods: {
			...mapActions(['queryBank', 'getMine', 'withdraw']),
			goWithdraw() {
				const that = this
				if (!this.bankInfo.uuid) {
					showUiToast('请选择银行卡');
					return;
				}
				if (!this.withdrawInfo.money) {
					showUiToast('请输入提款金额');
					return;
				}
				if (!this.withdrawInfo.funPwd) {
					showUiToast('请输入资金密码');
					return;
				}
				const params = {
					amount: this.withdrawInfo.money,
					fundPass: this.withdrawInfo.funPwd,
					bankUuid: this.bankInfo.uuid
				}
				if (!params.amount || Number(params.amount) > Number(this.userBalance.amountUseable)) {
					showUiToast('请输入正确的金额');
					return false
				}
				if (params.amount && Number(params.amount) < Number(this.minMoney)) {
					showUiToast(`最小提现金额${this.minMoney}元`);
					return false
				}
				let withdrawAmount = {
					amount: params.amount,
					bankName: this.bankInfo.bankName,
					bankCartNo: this.bankInfo.accountNum.substr(this.bankInfo.accountNum.length - 4)
				}
				showUiLoading('正在处理..', {
					mask: true
				})
				this.withdraw({
					data: params
				}).then(res => {
					hideUiLoading()
					if (res.status) {
						chache.set('withdrawInfo', withdrawAmount)
						that.$mRouter.push({
							route: this.$routers.withdrawSuccess
						})
						return;
					} else {
						showUiToast(res.msg);
					}
				}).catch(err => {
					hideUiLoading()
					return err;
				})
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
			// 打开银行卡列表
			openSelectBankList() {
				if (this.goBindBank) {
					this.$refs.popup.open()
				} else {
					showUiToast(`正在获取您的银行卡列表,请稍后..`);
				}
			},
			// 去绑定银行卡
			goBankLink(){
				if(this.myBankList.length>=3){
					return;
				}
				this.$mRouter.push({
					route:this.$routers.addBank
				})
				this.$refs.popup.close()
			},
			// 去设置资金密码
			goBindFulPasswordPage() {
				this.$mRouter.push({
					route:this.$routers.setFundsPassword
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './withdraw.scss'
</style>
