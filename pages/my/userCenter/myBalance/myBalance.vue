<template>
	<view class="myBalance_View" :class="themeFontSize">
		<view class="balance_list" v-if="userAllBalance.length>0">
			<view class="balance_case" v-for="item in getAllUserBalance" :key='item.id' v-if='item.walletType!=4'>
				<view class="balance_top_row">
					<view class="balance_icon balance_flex">
						<view class="icons">
							<fonts-icon :type='item.icons' size='64' color='#fff'></fonts-icon>
						</view>
						<view class="icons title">{{item.name}}</view>
					</view>
					<view class="balance_money balance_flex">
						<view class="money_title">总额度(元)</view>
						<view>{{item.balance==0?0:item.balance.toFixed(2)}}</view>
						<view class="money_line"></view>
					</view>
					<view class="balance_outher_money balance_flex">
						<view class="frozen_balance">
							<view class="forzen_balance_title">冻结金额(元)</view>
							<view>{{item.amountFrozen==0?0:item.amountFrozen.toFixed(2)}}</view>
						</view>
						<view class="use_balance">
							<view class="use_balance_money_title">可用余额(元)</view>
							<view>{{item.amountUseable==0?0:item.amountUseable.toFixed(2)}}</view>
						</view>
					</view>
				</view>
				<view class="blance_bottom_row">
					<view class="break_btn_rechange btns">
						<view class="btn" v-if='item.walletType==1'>充值</view>
					</view>
					<view class="break_btn_withdraw btns">
						<view class="btn" v-if='item.walletType==1'>提现</view>
					</view>
					<view class="break_btn_trade_detail btns">
						<view class="btn">交易明细</view>
					</view>
				</view>
			</view>
		</view>
		<view class="balance_list balance_skeleton" v-else>
			<view class="balance_case" v-for="item in 2" :key="item">
				<view class="balance_top_row">
					<view class="balance_icon balance_flex">
						<view class="icons i"></view>
						<view class="icons title"></view>
					</view>
					<view class="balance_money balance_flex">
						<view class="money_title"></view>
						<view class="money_num"></view>
					</view>
					<view class="balance_outher_money balance_flex">
						<view class="frozen_balance">
							<view class="common_skeleton forzen_balance_title"></view>
							<view class="common_skeleton"></view>
						</view>
						<view class="use_balance">
							<view class="common_skeleton use_balance_money_title"></view>
							<view class="common_skeleton"></view>
						</view>
					</view>
				</view>
				<view class="blance_bottom_row blance_bottom_skeleton">
					<view class="break_btn_rechange btns">
						<view class="btn"></view>
					</view>
					<view class="break_btn_withdraw btns">
						<view class="btn"></view>
					</view>
					<view class="break_btn_trade_detail btns">
						<view class="btn"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name:'myBalance',
		computed:{
			...mapGetters(['userAllBalance','themeFontSize']),
			getAllUserBalance(){
				if(this.userAllBalance.length>0){
					let arr=this.userAllBalance;
					arr.map(item=>{
						if(item.walletType===1){
							item.icons='xianjin'
							item.name='现金'
						}
						if(item.walletType===2){
							item.icons='jifen'
							item.name='积分'
						}
						if(item.walletType===3){
							item.icons='mnks'
							item.name='模拟'
						}
						return item
					})
					return arr;
				}
			}
		},
		onReady(){
			if(this.userAllBalance.length<=0){
				this.getMines()
			}
		},
		methods:{
			...mapActions(['getMine']),
			getMines(){
				this.getMine().then(res=>{
					uni.stopPullDownRefresh();
					if(!res.status){
						showUiModel(res.msg)
					}
				}).catch(err=>{
					return err
				})
			},
			// 下拉刷新
			onPullDownRefresh(e){
				this.getMines()
				// setTimeout(() => {
				// 	uni.stopPullDownRefresh();
				// }, 3000);
			}
		}
	}
</script>

<style lang="scss">
@import './myBalance.scss'
</style>
