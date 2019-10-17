<template>
	<!--热门活动-->
	<view class="hot_activity">
		<view class="hot_activity_box" v-if="actList.length>0">
			<view class="activity_title">
				<text class="activity_text">热门活动</text>
				<view class="activity_image">
					<text>快速上手让你盈利不停</text>
				</view>
			</view>
			<view class="activity_box">
				<view class="activity_list" v-for="item in actList" :key="item.id" @click="goTask(item)">
					<image :src="item.url" class="imgUrl"></image>
				</view>
				<!-- <view class="activity_list" v-for="(item,idx) in activityArr" :key="item.id" :style="{
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
				</view> -->
			</view>
		</view>
		<view class="hot_activity_box" v-else>
			<view v-if="actData[0]==='暂无活动'">
				<view class="activity_title">
					<text class="activity_text">热门活动</text>
					<view class="activity_image">
						<text>快速上手让你盈利不停</text>
					</view>
				</view>
				<view class="activity_box activity_boxs">
					<view class="activity_list" style="text-align:center;line-height:180rpx;
					color:#ccc;">
						{{actData[0]}}
					</view>
				</view>
			</view>
			<view v-else>
				<view class="activity_title_skleton">
					<view class="activity_image_skeleton">
					</view>
				</view>
				<view class="activity_box activity_boxs">
					<view class="activity_list" v-for="(item,idx) in 2" :key="idx">
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
	import {
		showUiToast
	} from '@/common/utils/dialog.config';
	export default {
		name: 'activity',
		props: {
			actList: {
				type: [Array, Object],
				required: true
			}
		},
		data() {
			return {
				da: ''
			}
		},
		computed: {
			...mapGetters(['stateText']),
			actData() {
				if (this.stateText == '开始请求') {
					return []
				} else if (this.stateText == '请求失败') {
					return []
				} else {
					return this.actList.length > 0 ? this.actList : ['暂无活动']
				}
			}
		},
		methods: {
			...mapActions(['sendUrl']),
			// 去活动详情
			goTask(item) {
				if (!item.breakUrl || item.breakUrl == '') {
					showUiToast('无跳转地址');
					return;
				}
				this.sendUrl(item.breakUrl)
				this.$mRouter.push({
					route: this.$routers.webViewUi,
					query: {
						title: item.title
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*
** 热门活动
*/
	.hot_activity {
		margin: 20rpx 0rpx;

		.activity_list {
			width: 100%;
			height: 180rpx;
			margin-top: 15rpx;

			.imgUrl {
				width: 100%;
				height: 100%;
			}
		}

		.activity_title {
			width: 100%;
			display: flex;
			flex-direction: row;
		}

		.activity_text {
			font-size: 30rpx;
			padding-top: 8rpx;
		}

		.activity_image {
			width: 320rpx;
			height: 50rpx;
			background: url('../../../static/images/title_bg.png') no-repeat;
			background-size: 100% 100%;
			font-size: 26rpx;
			text-align: center;
			color: #fff;
			line-height: 50rpx;
		}

		// .activity_box{
		// 	.activity_list{
		// 		width:100%;
		// 		height:176rpx;
		// 		background-size:100% 100%;
		// 		margin:20rpx 0 10rpx 0;
		// 		display:flex;
		// 		flex-direction: row;
		// 	}
		// 	.activity{
		// 		flex:1;
		// 		.money_num{
		// 			font-size:92rpx;
		// 			line-height:176rpx;
		// 			text-align:center;
		// 			display:block;
		// 		}
		// 		.day_money{
		// 			font-size:28rpx;
		// 			width:160rpx;
		// 			text-align:center;	
		// 			margin-top:50rpx;
		// 		}
		// 		.box_money_unit{
		// 			font-size:36rpx;
		// 			color:#fff;
		// 		}
		// 		.task{
		// 			font-size:28rpx;
		// 			margin:20rpx 0 10rpx 0;
		// 			text-align:center;
		// 		}
		// 		text{
		// 			display:block;
		// 		}
		// 		.to_detail{
		// 			width:140rpx;
		// 			height:50rpx;
		// 			color: #dda643;
		// 			background-color: #fdfbf6;
		// 			border-radius:100rpx;
		// 			background: linear-gradient(-180deg,#fdfbf6,#fbe3ad);
		// 			font-size:28rpx;
		// 			line-height:50rpx;
		// 			text-align:center;
		// 			margin:0 auto;
		// 			cursor:pointer;
		// 		}
		// 	}
		// }
		.activity_image_skeleton {
			width: 280rpx;
			height: 40rpx;
			border-radius: 10rpx;
		}

		.activity_boxs {
			.activity_list {
				border-radius: 10rpx;
			}
		}
	}
</style>
