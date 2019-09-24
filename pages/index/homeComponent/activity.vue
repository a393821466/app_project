<template>
<!--热门活动-->
	<view class="hot_activity">
		<view class="activity_title">
			<text class="activity_text">热门活动</text>
			<view class="activity_image">
				<text>快速上手让你盈利不停</text>
			</view>
		</view>
		<view class="activity_box">
			<view class="activity_list" v-for="(item,idx) in activityArr" :key="item.id" :style="{
				'background-image':'url('+item.imgUrl+')'
			}">
				<view class="activity activity_money">
					<text class="money_num" :style="{color:item.moneyColor}">{{item.moneyNum}}</text>
				</view>
				<view class="activity activity_type">
					<view class="day_money" :style="{color:item.activityUiTextColor,backgroundColor:item.activityUiBgColor}">
						{{item.activityType}}
					</view>
					<text class="box_money_unit">元</text>
				</view>
				<view class="activity activity_task">
					<view class="task" v-html="item.taskText" :style="{color:item.taskTextColor}">
					</view>
					<view class="to_detail" @click="goTask" :style="{color:item.taskBtnColor,background:'linear-gradient(-180deg,#fdfbf6,'+item.linearColor+')'}">
						立即参与
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {promtModel,showActionSheet} from '@/common/utils/dialog.config';
export default{
	name:'activity',
	data(){
		return{
			activityArr:[
				{	
					id:1,
					moneyColor:'#fce8e3',
					moneyNum:100,
					activityType:'日欢迎礼金',
					activityUiBgColor:'#efd196',
					activityUiTextColor:'#dda643',
					taskTextColor:'#efd196',
					taskText:'单笔充值<br/>≥2000元',
					taskBtnColor:'#dda643',
					linearColor:'#fbe3ad',
					imgUrl:require('../../../static/images/yh1.png')
				},
				{
					id:2,
					moneyColor:'#dfe9ef',
					moneyNum:2000,
					activityType:'新人礼包',
					activityUiBgColor:'#8e9ccf',
					activityUiTextColor:'#346cba',
					taskTextColor:'#bab1d7',
					taskText:'实名认证<br/>注册即送',
					taskBtnColor:'#5e3397',
					linearColor:'#b8a0e0',
					imgUrl:require('../../../static/images/yh2.png')
				}
			]
		}
	},
	methods:{
		// 去活动详情
		goTask(){
			// #ifdef H5
			showActionSheet('',(res)=>{
				console.log(res);
			},(err)=>{
				console.log(err);
			})
			// #endif
			
			// #ifdef APP-PLUS
			promtModel('',(e)=>{
				if(e.index==0){
					uni.showToast({
						title:JSON.stringify(e.value),
						duration:2000
					})
				}
			})
			// #endif
		}
	}
}
</script>

<style lang="scss">
/*
** 热门活动
*/
.hot_activity{
	margin-top:20rpx;
	.activity_title{
		width:100%;
		display:flex;
		flex-direction:row;
	}
	.activity_text{
		font-size:30rpx;
		padding-top:8rpx;
	}
	.activity_image{
		width:320rpx;
		height:50rpx;
		background:url('../../../static/images/title_bg.png') no-repeat;
		background-size:100% 100%;
		font-size:26rpx;
		text-align:center;
		color:#fff;
		line-height:50rpx;
	}
	.activity_box{
		.activity_list{
			width:100%;
			height:176rpx;
			background-size:100% 100%;
			margin:20rpx 0 10rpx 0;
			display:flex;
			flex-direction: row;
		}
		.activity{
			flex:1;
			.money_num{
				font-size:92rpx;
				line-height:176rpx;
				text-align:center;
				display:block;
			}
			.day_money{
				font-size:28rpx;
				width:160rpx;
				text-align:center;	
				margin-top:50rpx;
			}
			.box_money_unit{
				font-size:36rpx;
				color:#fff;
			}
			.task{
				font-size:28rpx;
				margin:20rpx 0 10rpx 0;
				text-align:center;
			}
			text{
				display:block;
			}
			.to_detail{
				width:140rpx;
				height:50rpx;
				color: #dda643;
				background-color: #fdfbf6;
				border-radius:100rpx;
				background: linear-gradient(-180deg,#fdfbf6,#fbe3ad);
				font-size:28rpx;
				line-height:50rpx;
				text-align:center;
				margin:0 auto;
				cursor:pointer;
			}
		}
	}
}
</style>
