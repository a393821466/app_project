<template>
	<view class="page">
		<!--轮播-->
		<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)"
		 :autoplay="true" :interval="5000" :duration="500" class="banner">
			<swiper-item>
				<image src="http://n.sinaimg.cn/sinacn20111/765/w1067h498/20190823/be7d-icqznha0469343.jpg" class="banner"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://img5.imgtn.bdimg.com/it/u=538384195,3019699462&fm=26&gp=0.jpg" class="banner"></image>
			</swiper-item>
		</swiper>
		<!--客服-->
		<view class="service">
			<view class="service-input">
				<text class="test service-icon">&#xe60b;</text>
				<text class="service-text">联系客服</text>
			</view>
		</view>
		<!--公告-->
		<view class="textBox">
		  <view class="notice_box">
			  <view class="notice_icon">
				  <text class="test">&#xe690;</text>
			  </view>
			  <view class="notice">
				  <transition name="slide">
					<view class="text" :key="text.id">{{text.val}}</view>
				  </transition>
			  </view>
		  </view>
		</view>
		<!--分类导航-->
		<view class="category_home">
			<view class="category_list" v-for="(item,idx) in temList" :key="item.id" :class="idx===temList.length-1&&temList.length%2==1?'upside_list_class':''"
			 :style='{backgroundColor:!item.color?"#999":item.color}'>
				<text class="category_text">{{item.templateName}}</text>
				<view :class="idx===temList.length-1&&temList.length%2==1?'img':'category_backgorund'"></view>
			</view>
		</view>
		<!--新手引导-->
		<view class="news_prople">
			<view class="news_title">
				<text>新手引导</text>
			</view>
			<view class="news_images">
				<text class="news_text">新手引导-快速上手-日进斗金</text>
			</view>
		</view>
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
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {h5Toast,showActionSheet} from '@/common/utils/dialog.config';
	const totalDuration = 2000;
	export default {
		data() {
			return {
				number: 0,
				timer:null,
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
						imgUrl:'../../static/images/yh1.png'
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
						imgUrl:'../../static/images/yh2.png'
					}
				]
			}
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice', 'temList']),
			// 公告的处理
			getAnnountList() {
				if (this.notice.length > 0) {
					let arr = [];
					for (let i = 0; i < this.notice.length; i++) {
						if (i >= 5) {
							break;
						}
						let noticeText=this.notice[i].cnSummary;
						let str=noticeText.substring(0,20);
						let strLen=str+(noticeText.length>20?'...':'');
						arr.push(i + 1 + '.' + strLen);
					}
					return arr;
				} else {
					return ['暂无内容...'];
				}
			},
			// 公告显示
			text() {
				return {
					id: this.number,
					val: this.getAnnountList[this.number]
				}
			}
		},
		onUnload() {
			console.log('监听卸载');
		},
		onLoad() {
			console.log('首次');
			uni.setNavigationBarTitle({
				title: '首页'
			});
			this.getNoticeData()
			this.getTemplateData()
		},
		onShow(){
			// 开启计时器
			this.startMove()
			console.log(111)
		},
		methods: {
			/*
			** 公告，模板发送store
			*/
			...mapActions(['getNotice', 'getTemplate']),
			// 获取公告
			getNoticeData() {
				this.getNotice().then(res => {
					
				}).catch(err=>{
					console.log(err);
				})
			},
			// 获取模板
			getTemplateData() {
				this.getTemplate().then(res => {})
			},
			// 公告轮播
			startMove () {
			  // eslint-disable-next-line
			  this.timer = setTimeout(() => {
				if (this.number === this.getAnnountList.length-1) {
				  this.number = 0;
				} else {
				  this.number += 1;
				}
				this.startMove();
			  }, 3000); // 滚动不需要停顿则将2000改成动画持续时间
			},
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
		},
		// 右边按钮
		onNavigationBarButtonTap(val){
			this.$openPage({
				name: 'login',
				query: {id: 123}
			})
			// 关闭计时器
			if(this.timer){
				console.log(222)
				clearTimeout(this.timer)
				this.timer=null;
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				console.log('刷新成功');
			},3000);
		},
		components: {}
	}
</script>

<style>
	@import url("index.css");
</style>
