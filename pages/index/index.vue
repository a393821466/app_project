<template>
	<view class="indexHome" :class="themeFontSize">
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
	import {showUiModel} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	import config from '@/common/utils/config'
	export default {
		name:'index',
		data(){
			return {
				onLoadText:''
			}
		},
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice', 
			'temList',
			'themeFontSize',
			'token',
			'bannerData',
			'actList',
			]),
		},
		watch:{
			token(news,olds){
				this.getBanAct()
				this.getNoticeData()
				this.getTemplateData()
			}
		},
		onLoad(){
			console.log(config.domain)
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
			this.getBanAct()
			this.getTemplateData()
		},
		onShow(){
			// #ifdef APP-PLUS
			if(chache.has('fontSizeType')){
				const fonts=chache.get('fontSizeType')
				this.appFontSize(fonts)
			}else{
				const isOpenSql=plus.sqlite.isOpenDatabase(config.sqlLiteConfig);
				if(isOpenSql){
					this.getOpenDataBase()
				}else{
					plus.sqlite.openDatabase(config.sqlLiteConfig);
					this.getOpenDataBase()
				}
			}
			// #endif
		},
		methods: {
			/*
			** 公告，模板发送store
			*/
			...mapActions(['getBannerActivity','getNotice', 'getTemplate','getMerchant','appFontSize']),
			// 获取字体
			getOpenDataBase(){
				const that=this;
				plus.sqlite.selectSql(
					{
						name: 'futures',
						sql: 'select * from fontDataBase',
						success:function(data){
							that.appFontSize(data[0].type);
						},
						fail:function(e){
							console.log(e)
						}
					}
				);
			},
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
			// 获取轮播,活动
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
					uni.stopPullDownRefresh();
				}).catch(err=>{
					return err;
				})
			},
			// 下拉刷新
			onPullDownRefresh(e){
				this.getNoticeData()
				this.getBanAct()
				this.getTemplateData()
				// setTimeout(() => {
				// 	uni.stopPullDownRefresh();
				// }, 3000);
			}
		},
		// onNavigationBarButtonTap(){
		// 	if(!this.token){
		// 		this.$mRouter.push({
					// route:this.$routers.login,
					// query:{
					// 	id:1
					// }
		// 		})
		// 	}else{
		// 		showUiModel({content:'您已登录,确认退出?',showCancel:true},(e)=>{
		// 			if(e.confirm){
		// 				console.log('进了这里')
		// 				chache.clear()
		// 				this.$store.dispatch('resetHomeState')
		// 			}
		// 		})
		// 	}
		// 	
		// },
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
