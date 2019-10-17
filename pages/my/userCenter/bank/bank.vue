<template>
	<view class="bankView">
		<view class="bank_list">
			<view class="bank_list_content" v-if="myBankList.length>0">
				<swiper-action :options="options" :myBankList="formartBankList" @delBank='delBank'></swiper-action>
				<view class="add" v-if="formartBankList.length<3" @click="goAddBank">
					<view class="bankIcon">
						<image src="../../../../static/images/addBank.svg" class="bankImgs"></image>
					</view>
					<text class="add_text">添加银行卡</text>
				</view>
			</view>
			<!-- <text class="getBankListView" v-else-if="bankList.length==0 && httpStatus!==1">银行卡列表加载中,请稍后..</text> -->
			<view class="noBank" @click="goAddBank" v-else>
				<view class="addBanks">
					<view class="addIcon">
						<image src="../../../../static/images/addBank.svg"></image>
					</view>
					<text class="add_text">添加银行卡</text>
				</view>
			</view>
		</view>
		<view class="problem">
			<view class="mask" @click="openProblem" :style="{display:flat?'block':'none'}"></view>
			<view class="titles" @click="openProblem">
				<text>常见问题</text>
			</view>
			<view class="tip_box" :style="{display:flat?'block':'none'}">
					<view class="tip">
						<view class="sp2">温馨提示:</view>
						<view class="sp2 sp3">
						  * 最多可绑定三张银行卡
						</view>
						<view class="sp2 sp3">
						  * 单笔最低金额100元，单笔最高金额8000元，若订单需持仓过夜，账户需保留当天隔夜费用，以免余额不足
						</view>
						<view class="sp2 sp3">
						  * 如充值后未交易提款，第一次全额出款，第二次及以后需每笔收取2%的手续费
						</view>
						<view class="sp2 sp3">
						  * 如需帮助请联系在线客服或拨打24小时服务电话：<text class="phone">0510-66611495</text>，竭诚为您提供最好的服务
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import SwiperAction from '@/components/swiperAction'
	import {bankColor} from './bankConfig'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {showUiModel,showUiToast,showUiLoading,hideUiLoading} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default {
		name:'bank',
		components:{
			SwiperAction
		},
		data() {
			return {
				flat:false,
				goBindBank:false,
				tip:{
					display:'block'
				},
				options: [
					{
					  text: "解绑",
					  style: {
						backgroundColor: "#666"
					  }
					}
				],
			};
		},
		computed:{
			...mapGetters(['userInfo','myBankList']),
			// 银行卡渲染前做的处理
			formartBankList(){
				if(this.myBankList.length>0){
					let banks=this.myBankList;
					banks.map((item)=>{
						item.disabled=false;
						item.color=bankColor[item.bankCode];
						return item;
					})
					return banks;
				}
			}
		},
		onReady(){
			this.getBank()
		},
		methods:{
			...mapActions(['queryBank','delMyBank']),
			// 提示
		    openProblem(){
				this.flat=!this.flat
			},
			// 绑定账号绑定的银行卡
			getBank(){
				const uuid=this.userInfo.uuid;
				this.queryBank({uuid:uuid}).then(res=>{
					this.goBindBank=true
				}).catch(err=>{
					this.goBindBank=true
				})
			},
			// 绑定银行卡
			goAddBank(){
				const isRealName=chache.get('userInfo').isUserVierity||chache.get('isUserVierity')
				if(isRealName==1){
					this.$mRouter.push({
						route:this.$routers.addBank
					})
				}else{
					showUiModel({content:'您还未实名认证,去实名?',showCancel:true},(e)=>{
						if(e.confirm){
							this.$mRouter.push(
								{route:this.$routers.realName}
							)
						}
					})
				}
			},
			// 移除银行卡
			delBank(item){
				const that=this
				const bankNumFour=item.accountNum.substr(item.accountNum.length-4);
				const params={
					data:{
						bankId:item.uuid
					}
				}
				showUiModel({content:`您确认移除尾号为(${bankNumFour})的银行卡吗?`,showCancel:true},(e)=>{
					if(e.confirm){
						showUiLoading('正在处理,请稍后',{mask:true});
						this.delMyBank(params).then(res=>{
							hideUiLoading()
							if(res.status){
								showUiToast(`已删除尾号为${bankNumFour}的银行卡`);
								setTimeout(()=>{
									that.getBank();
								},300);
								return;
							}
							showUiToast(res.msg);
						}).catch(err=>{
							hideUiLoading()
							return err
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
@import './bank.scss';
</style>
