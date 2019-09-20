<template>
	<view class="page">
		<!--轮播-->
		<swiper :indicator-dots="true" :circular='true' indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, .3)" :autoplay="true" :interval="5000" :duration="500" class="banner">
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
		<view class="notice_annount">
			<uni-notice-bar  show-icon="true"  more-text="查看更多"  scrollable="true"  single="true"  color="#666666" background-color="#f2f2f2" :text="getAnnountList">
			</uni-notice-bar>
		</view>
		<!--分类导航-->
		<view class="category_home">
			<view class="category_list" 
				v-for="(item,idx) in temList" 
				:key="item.id" 
				:class="idx===temList.length-1&&temList.length%2==1?'upside_list_class':''"
				:style='!item.color?{"backgroundColor":"#999"}:{"background-color":item.color}'>
				<text class="category_text">{{item.templateName}}</text>
				<view :class="idx===temList.length-1&&temList.length%2==1?'img':'category_backgorund'"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	export default{
		data(){
			return{
				names:'dada'
			}
		},
		computed:{
			...mapGetters(['notice','temList']),
			getAnnountList(){
				if(this.notice.length>0){
					let arr=[];
					for(let i=0;i<this.notice.length;i++){
						if(i>=5){
							break;
						}
						arr.push(i+1+'.'+this.notice[i].cnSummary);
					}
					return arr.join(' ');
				}else{
					return '暂无内容...';
				}
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
			    title: '首页'
			});
			this.getNoticeData()
			this.getTemplateData()
		},
		methods:{
			...mapActions(['getNotice','getTemplate']),
			getNoticeData(){
				this.getNotice().then(res=>{
				})
			},
			getTemplateData(){
				this.getTemplate().then(res=>{
				})
			}
		},
		components:{
			uniNoticeBar
		}
	}
</script>

<style>
@import url("index.css");
</style>
