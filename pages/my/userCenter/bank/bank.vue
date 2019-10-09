<template>
	<view class="bankView">
		<view class="bank_list">
			<!-- <swiper-action :options="options" :messagesList="messages"></swiper-action> -->
			<view class="noBank">
				<view class="addBanks">
					<view class="addIcon">
						<image src="../../../../static/images/addBank.svg"></image>
					</view>
					<text class="add_text">添加银行卡</text>
				</view>
			</view>
		</view>
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
</template>

<script>
	import SwiperAction from '@/components/swiperAction'
	export default {
		name:'bank',
		components:{
			SwiperAction
		},
		data() {
			return {
				options: [
					{
					  text: "删除",
					  style: {
						backgroundColor: "#dd524d"
					  }
					}
				],
				messages:[
					{
					  title: "系统消息",
					  url: [
						"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
					  ],
					  message: "这是一条系统消息",
					  time: "15:15",
					  count: 5,
					  stick: false, //是否为置顶状态
					  disabled: false, //是否禁止滑动
					  type: 1 //通知类型消息
					},
				]
			};
		},
		methods:{
		 
		}
	}
</script>

<style lang="scss">
@import './bank.scss';
</style>
