<template>
	<view class="bankView">
		<view class="bank_list">
			<view class="bank_list_content" v-if="bankList.length>0 && httpStatus==1">
				<swiper-action :options="options" :bankList="formartBankList"></swiper-action>
				<view class="add">
					<view class="bankIcon">
						<image src="../../../../static/images/addBank.svg" class="bankImgs"></image>
					</view>
					<text class="add_text">添加银行卡</text>
				</view>
			</view>
			<text class="getBankListView" v-else-if="bankList.length==0 && httpStatus!==1">银行卡列表加载中,请稍后..</text>
			<view class="noBank" v-else>
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
	export default {
		name:'bank',
		components:{
			SwiperAction
		},
		data() {
			return {
				flat:false,
				httpStatus:1,
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
			...mapGetters(['userInfo','bankList']),
			formartBankList(){
				if(this.bankList.length>0){
					let banks=this.bankList;
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
			...mapActions(['queryBank']),
		    openProblem(){
				this.flat=!this.flat
			},
			getBank(){
				this.httpStatus=2;
				const uuid=this.userInfo.uuid;
				this.queryBank({uuid:uuid}).then(res=>{
					this.httpStatus=1
				}).catch(err=>{
					this.httpStatus=1
				})
			}
		}
	}
</script>

<style lang="scss">
@import './bank.scss';
</style>
