<template>
	<view class="indexHome" :class="className">
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
				<!-- <text class="test service-icon">&#xe60b;</text> -->
				<fonts-icon type="kefu"></fonts-icon>
				<text class="service-text">联系客服</text>
			</view>
		</view>
		<!-- 通告 -->
		<view class="noticeBox">
			<view class="notice_box">
				<view class="notice_icon">
					<fonts-icon type="laba"></fonts-icon>
				</view>
				<view class="notice">
					<swiper autoplay="true" interval="5000"  :disable-touch="disableTouch">
						<swiper-item v-for="(item, index) in getAnnountList" :key="index">
							<text class="text">{{item}}</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!--分类导航-->
		<view class="category_home">
			<view class="category_list" v-for="(item,idx) in categoryData" :key="item.id" :class="idx===categoryData.length-1&&categoryData.length%2==1?'upside_list_class':''"
			 :style='{backgroundColor:!item.color?"#999":item.color}'>
				<text class="category_text">{{item.templateName}}</text>
				<view :class="idx===categoryData.length-1&&categoryData.length%2==1?'img':'category_backgorund'"></view>
			</view>
		</view>
		<!-- 新手引导 -->
		<view class="news_prople">
			<view class="news_title">
				<text>新手引导</text>
			</view>
			<view class="news_images">
				<text class="news_text">新手引导-快速上手-日进斗金</text>
			</view>
		</view>
		<activity></activity>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import activity from './homeComponent/activity'
	import {showUiModel,confirmModel} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default {
		name:'index',
		data(){
			return {
				number: 0,
				timer:null,
				flat:false,
				disableTouch:true
			}
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice', 'temList','className','token']),
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
					return arr
				} else {
					return ['暂无内容...'];
				}
			},
			categoryData(){
				return this.temList.length>0?this.temList:[]
			}
		},
		mounted() {
			console.log('首次');
			this.getMerchant()
			this.getNoticeData()
			this.getTemplateData()
		},
		methods: {
			/*
			** 公告，模板发送store
			*/
			...mapActions(['getNotice', 'getTemplate','getMerchant']),
			// 获取公告
			getNoticeData() {
				this.getNotice().then(res => {
					
				}).catch(err=>{
					return err;
				})
			},
			// 获取模板
			getTemplateData() {
				this.getTemplate().then(res => {
					if(res.status){
						uni.stopPullDownRefresh();
					}
				}).catch(err=>{
					return err;
				})
			},
			// 下拉刷新
			onPullDownRefresh(e){
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 3000);
			}
		},
		onNavigationBarButtonTap(){
			if(!this.token){
				this.$mRouter.push({
					route:this.$routers.login,
					query:{
						id:1
					}
				})
			}else{
				showUiModel({content:'您已登录,确认退出?',showCancel:true},(e)=>{
					if(e.confirm){
						console.log('进了这里')
						chache.clear()
						this.$store.dispatch('resetState')
					}
				})
			}
			
		},
		components: {
			activity
		}
	}
</script>

<style lang="scss">
	@import "./index.scss"
</style>
