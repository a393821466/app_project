<template>
	<view class="indexHome" :class="className">
		<banner :bannerData='bannerData'></banner>
		<service></service>
		<notice-view :notice='notice'></notice-view>
		<category :temList="temList"></category>
		<news-person></news-person>
		<activity :actList='actList'></activity>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import banner from './homeComponent/banner'
	import service from './homeComponent/service'
	import noticeView from './homeComponent/notice'
	import category from './homeComponent/category'
	import activity from './homeComponent/activity'
	import newsPerson from './homeComponent/news_person'
	import {showUiModel,confirmModel} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default {
		name:'index',
		data(){
			return {
			}
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice', 
			'temList',
			'className',
			'token',
			'bannerData',
			'actList',
			]),
		},
		onLoad(){
			// uni.setNavigationBarColor({
			//     frontColor: '#ffffff',
			//     backgroundColor: '#000000'
			// })
			// uni.setTabBarStyle({
			// 	backgroundColor:'#000000'
			// })
		},
		onReady() {
			console.log('首次');
			this.getMerchant()
			this.getNoticeData()
		},
		onShow(){
			this.getBanAct()
			this.getTemplateData()
		},
		methods: {
			/*
			** 公告，模板发送store
			*/
			...mapActions(['getBannerActivity','getNotice', 'getTemplate','getMerchant']),
			// 获取公告
			getNoticeData() {
				this.getNotice().then(res => {
					if(!res.status){
						showUiModel(res.msg)
					}
				}).catch(err=>{
					return err;
				})
			},
			// 获取公告,活动
			getBanAct(){
				this.getBannerActivity().then(res=>{
					if(!res.status){
						showUiModel(res.msg)
					}
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
				this.getNoticeData()
				this.getTemplateData()
				// setTimeout(() => {
				// 	uni.stopPullDownRefresh();
				// }, 3000);
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
			banner,
			service,
			noticeView,
			category,
			newsPerson,
			activity
		}
	}
</script>

<style lang="scss">
	@import "./index.scss"
</style>
