<template>
	<view class="notice_annount" :class="themeFontSize">
		<view class="annount_box" v-if="notice.length>0">
			<view class="annount_list" v-for="(item,idx) in notice" :data-item="item.announcementId===noticeId?'open':'close'" :key="idx" @click.prevent="onClickNotice($event,item,idx)">
				<view class="annount_title">
					<text class="atitle titles">{{item.cnSummary}}</text>
					<view class="right_icon titles" :style="item.announcementId===noticeId?'transform:rotate(-180deg)':'transform:rotate(0deg)'">
						<fonts-icon type="fanhui" size="24" color='#999'></fonts-icon>
					</view>
				</view>
				<view class="annount_body">
					<view class="annount_content" :style="item.announcementId===noticeId?'height:120px;opcity:1':'height:0;overflow:hidden;opcity:0'">
						<rich-text :nodes="item.cnContent">
							
						</rich-text>
					</view>
				</view>
				<view class="annount_time">
					<text>{{formartTime(item.createTimeStamp)}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="annount_box" v-else>
			<view class="annount_list annount_list_skeleton" v-for="item in 3" :key='item'>
				<view class="annount_title annountView">
					<view class="atitle_skeleton titles"></view>
					<view class="atitle_skeleton_center titles"></view>
					<view class="right_icon_skeleton titles"></view>
				</view>
				<view class="annount_time" style="border-bottom:none;">
					<view class="anount_time__skeleton"></view>
				</view>
			</view>
		</view> -->
		<no-more v-else top='80' temText='noData'></no-more>
	</view>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex'
	import noMore from '@/components/noMore'
	import utils from '@/common/utils'
	export default {
		name:'annount',
		components:{
			noMore
		},
		data() {
			return {
				noticeId:0,
				flat:false
			};
		},
		computed: {
		    ...mapGetters(['notice','themeFontSize'])
		},
		onShow(){
			this.noticeList()
		},
		methods:{
			...mapActions(['getNotice']),
			onClickNotice(e,item,idx){
				if (e.currentTarget.dataset.item=='open') {
					this.noticeId = ''
				} else {
					this.noticeId = item.announcementId
				}
			},
			noticeList(){
				this.getNotice().then(res => {
					if(!res.status){
						showUiModel(res.msg)
						return;
					}
					uni.stopPullDownRefresh();
				}).catch(err=>{
					return err;
				})
			},
			formartTime(n){
				return utils.formartNow('1',n)
			},
			// 下拉刷新
			onPullDownRefresh(e){
				this.noticeList()
			}
		}
	}
</script>

<style lang="scss">
.annount_box{
	padding: 0 20rpx;
	.annount_list{
		margin-top:30rpx;
		.annount_title{
			display:flex;
			line-height:80rpx;
			.titles{
				flex:0 0 1;
			}
			.atitle{
				width:90%;
				font-weight:bold;
				color:#666;
			}
			.right_icon{
				width:10%;
				.uni-icon-fanhui{
					display:block;
					margin:0 auto;
					text-align:center;
					line-height:80rpx;
					transform: rotate(-90deg);
				}
			}
		}
		.annountView{
			height:80rpx;
			padding-top:15rpx;
			flex:0 0 100%;
			display:flex;
			flex-direction:row;
			.atitle_skeleton{
				width:70%;
				height:50rpx;
				background:#eee;
				flex:0 0 70%;
			}
			.atitle_skeleton_center{
				width:20%;
				height:50rpx;
				flex:0 0 20%;
			}
			.right_icon_skeleton{
				width:10%;
				height:50rpx;
				background:#eee;
				flex:0 0 10%;
			}
		}
		.annount_body{
			color:#888;
			.annount_content{
				height:0;
				opcity:0;
				overflow-y:hidden;
				transition:all .3s ease;
				// &.active{
				// 	height:160rpx;
				// 	overflow-y:auto;
				// 	opcity:1;
				// }
			}
		}
		.annount_time{
			line-height:70rpx;
			color:#777;
			border-bottom:2rpx dashed #eee; 
			.anount_time__skeleton{
				width:300rpx;
				height:40rpx;
				background:#eee;
			}
		}
	}
	.annount_list_skeleton{
		height:160rpx;
	}
}

</style>
