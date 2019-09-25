<template>
	<view class="page" :class="className">
		<banner></banner>
		<service-int></service-int>
		<notice :noticeListData='getAnnountList' ref='eventNotice'></notice>
		<category :categoryList='temList'></category>
		<guide></guide>
		<activity></activity>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import banner from './homeComponent/banner'
	import serviceInt from './homeComponent/serviceInt'
	import notice from './homeComponent/notice'
	import category from './homeComponent/category'
	import guide from './homeComponent/guide'
	import activity from './homeComponent/activity'
	export default {
		name:'index',
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['notice', 'temList','className']),
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
		},
		onShow(){
			const that=this
			setTimeout(()=>{
				that.$refs.eventNotice.flat=true;
			},1000)
			this.getTemplateData()
		},
		onHide(){
			this.$refs.eventNotice.flat=false
		},
		onLoad() {
			console.log('首次');
			uni.setNavigationBarTitle({
				title: '首页'
			});
			this.getMerchant()
			this.getNoticeData()
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
			}
		},
		// 右边按钮
		onNavigationBarButtonTap(val){
			uni.navigateTo({
				url:'/pages/login/login'
			})
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.getNoticeData()
			this.getTemplateData()
		},
		components: {
			banner,
			serviceInt,
			category,
			notice,
			guide,
			activity
		}
	}
</script>

<style lang="scss">
	@import url("index.scss");
</style>
