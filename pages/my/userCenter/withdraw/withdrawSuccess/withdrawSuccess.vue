<template>
	<view class="withdrawSuccessView">
		<view class="step_view">
			<steps :options="stepList" direction="column" :active="1" activeColor='#1b82d1'></steps>
		</view>
		<view class="withdrawInfo">
			<view class="withdrawView withdrawMoneyNum">
				<text class="info">提现金额</text>
				<text class="info">￥{{!getWithDrawInfo.amount?'0':getWithDrawInfo.amount}}</text>
			</view>
			<view class="withdrawView withdrawBank">
				<text class="info">到账银行卡</text>
				<text class="info">{{!getWithDrawInfo.bankName?'-':getWithDrawInfo.bankName}} 尾号({{!getWithDrawInfo.bankCartNo?'-':getWithDrawInfo.bankCartNo}})</text>
			</view>
			<!-- <view class="withdrawView withdrawFee">
				<text class="info">手续费</text>
				<text class="info">￥0</text>
			</view> -->
		</view>
		<view class="clearBox"></view>
		<view class="success_btn">
			<button  type="primary" plain="true" class="success" @click="breakHome">完成</button>
		</view>
	</view>
</template>

<script>
	import steps from '@/components/step/uni-steps'
	import chache from '@/common/utils/storage'
	export default {
		name:'withdrawSuccess',
		components:{
			steps
		},
		data() {
			return {
				stepList:[
					{title:'发起提现申请'},
					{title:'等待平台核对处理'},
					{title:'提现成功'}
				]
			};
		},
		computed:{
			getWithDrawInfo(){
				const withDrawInfo=chache.get('withdrawInfo');
				return withDrawInfo
			}
		},
		methods:{
			breakHome(){
				this.$mRouter.reLaunch({
					route:this.$routers.my
				})
				chache.delete('withdrawInfo')
			}
		}
	}
</script>

<style lang="scss">
@import './withdrawSuccess.scss';
</style>
