<template>
	<view class="rechargeRecordView" :class="themeFontSize">
		<view class="clearView"></view>
		<!-- <view class="rechargeSelect">
			<view class="term type">
				<view class="term_select">
					全部
				</view>
				<view class="triangle">
					<image src="../../../../static/images/triangle.svg" class="triangleImg"></image>
				</view>
			</view>
			<view class="term date">
				<view class="term_select">
					日期
				</view>
				<view class="triangle">
					<image src="../../../../static/images/triangle.svg" class="triangleImg"></image>
				</view>
			</view>
		</view> -->
		<view class="uni-padding-wrap uni-common-mt rechargeRecord">
			<view class="rechargeView" v-if="rechargeList.length>0">
				<view class="rechargeList" v-for="(it,index) in rechargeList" :key="index">
					<view class="rechargeTitle">
						{{!it.remark?'-':it.remark}}
					</view>
					<view class="rechargeBox">
						<view class="rechargeDetail left">
							<view class="rechargeStatus">
								充值状态：<text class="type" style="color:#F5A623" v-if="it.status==1">处理中</text>
								<text class="type" style="color:#34C487" v-else-if="it.status==2">成功</text>
								<text class="type" style="color:#34C487" v-else-if="it.status==4">成功</text>
								<text class="type" style="color:#34C487" v-else-if="it.status==5">成功</text>
								<text class="type" style="color:#FF5E4D" v-else>失败</text>
							</view>
							<view class="tradeTime">
								交易时间：{{formartTime(it.createTime)}}
							</view>
						</view>
						<view class="rechargeDetail right">
							<text class="right_money">充值余额：{{it.amount}}元</text>
						</view>
					</view>
				</view>
				<load-more :status="more" @click.native='getMore' :content-text="loadText"></load-more>
			</view>
			<view class="rechargeView" v-else>
				<view class="noDataImg">
					<image src="../../../../static/images/noData.svg" class="img"></image>
					<text class="noDataText">暂无更多内容</text>
				</view>
			</view>
		</view>
		<rangeDatePick
			:show="isShow"
			@showchange="showchange"
			:start="startTimer"
			:end="endTimer"
			:value="value"
			@change="bindChange"
			@cancel="bindCancel"
			themeColor="#4C83D6"
		></rangeDatePick>
		<popup ref="rechargeTerm" type="bottom" @change='change'>
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择充值类型
				</view>
				<view class="typeTermBox">
					<view class="typeList" :class="[item.id==typeTerm.id?'active':'']" v-for="(item,idx) in typeTermList" :key='item.id'
					 @click="rechargeTypeClick(item)">{{item.name}}</view>
				</view>
			</view>
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择时间
				</view>
				<view class="typeTermBox">
					<view class="typeTimer" v-for="(item,idx) in timeList" 
					:class="timer.status===item.status?'active':''" 
					:key='item.status'
					 @click="typeTermDate(item)">{{item.name}}</view>
					<view class="typeTimer" @click="showPicker" :class="timer.status===3?'active':''" >{{chooseDate}}</view>
				</view>
			</view>
			<view class="selectBtn">
				<button type="primary" class="btn reset" @click="reset">重置</button>
				<button type="primary" class="btn confirm" @click="confirmSreach">确定</button>
			</view>
		</popup>
	</view>
</template>

<script>
	import loadMore from '@/components/onloadMore/uni-load-more'
	import Popup from '@/components/popup'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		showUiToast,
		showUiLoading,
		hideUiLoading
	} from '@/common/utils/dialog.config'
	import moment from 'moment'
	import utils from '@/common/utils/'
	import rangeDatePick from '@/components/mx-datepicker/range-dtpicker';
	export default {
		name: 'rechargeRecord',
		components: {
			Popup,
			loadMore,
			rangeDatePick
		},
		data() {
			const currentDate = this.getDate({
			   format: true
			})
			return {
				typeTerm: {
					name: '全部',
					id: 0,
					status: ''
				},
				typeTermList: [{
						name: '全部',
						id: 0,
						status: ''
					},
					{
						name: '处理中',
						id: 1,
						status: 1
					},
					{
						name: '成功',
						id: 2,
						status: 2
					},
					{
						name: '失败',
						id: 3,
						status: 3
					}
				],
				timer: {
					name: '当天',
					date: 1,
					status: 0
				},
				startDate: '',
				endDate: '',
				more: 'more',
				pages: 1,
				pageSize: 10,
				total: 1,
				loadText:{contentdown: "显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"},
				nowDate:currentDate,//获取当前时间
				isShow:false,
				value:[],
				chooseDate:"自定义"
			};
		},
		computed: {
			...mapGetters(['timeList', 'rechargeList','themeFontSize']),
			startTimer(){
				return moment(new Date()).subtract(1,'years').format('YYYY-MM-DD');
			},
			endTimer(){
				return moment(new Date()).format('YYYY-MM-DD');
			}
		},
		onLoad() {
			this.getTimeList();
			this.status = this.typeTerm.status;
			this.startDate = this.timeList[0].startTimes;
			this.endDate = this.timeList[0].endTimes
			this.getRechargeRecords(this.status, this.startDate, this.endDate)
		},
		onReachBottom() {
			console.log("onReachBottom");
			this.more = 'loading'
			this.setDate(this.status,this.startDate,this.endDate)
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.getRechargeRecords(this.status,this.startDate,this.endDate)
		},
		// 打开条件筛选
		onNavigationBarButtonTap() {
			this.$refs.rechargeTerm.open()
		},
		methods: {
			...mapActions(['getTimeList','addRecharRecord','getRecharRecord']),
			// 类型条件
			rechargeTypeClick(item) {
				this.typeTerm = item;
			},
			// 时间条件
			typeTermDate(item) {
				this.startDate = item.startTimes;
				this.endDate = item.endTimes;
				this.timer = item;
				this.chooseDate='自定义';
			},
			// 确定搜索条件
			confirmSreach() {
				const data = {
					status: this.typeTerm.status,
					startTime: this.startDate,
					endTime: this.endDate
				}
				this.more = 'loading'
				this.getRechargeRecords(data.status, data.startTime, data.endTime);
			},
			// 重置
			reset() {
				this.typeTerm = {
					name: '全部',
					id: 0,
					status: ''
				};
				this.timer = {
					name: '当天',
					date: 1,
					status: 0
				}
			},
			// 隐藏popup
			change(val) {
				if (!val.show) {
					// this.reset()
				}
			},
			// 获取充值记录
			getRechargeRecords(status, startTimer, endTimer) {
				let das = {
					pageNum: 1,
					pageSize: this.pageSize,
					status: status,
					startTime: startTimer,
					endTime: endTimer
				}
				showUiLoading('加载中..',{mask:true});
				this.getRecharRecord(das).then(res => {
					hideUiLoading();
					uni.stopPullDownRefresh();
					if (res.status) {
						this.pages = res.data.pageNum;
						this.total = res.data.pages;
						this.$refs.rechargeTerm.close()
						if(this.total<=this.pages){
							this.more = 'noMore'
						}else{
							this.more = 'more'
						}
					}
				}).catch(err => {
					uni.stopPullDownRefresh();
					hideUiLoading();
					return err
				})
			},
			// 格式化ISO时间
			formartTime (t) {
			  return moment(t).format('YYYY-MM-DD HH:mm:ss')
			},
			// 如果记录数量小于10的时候,点击追加
			getMore(){
				if(this.rechargeList.length<10){
					if(this.total!==this.pages){
						this.setDate(this.typeTerm.status,this.startDate,this.endDate)
					}
				}
			},
			// 追加充值记录
			setDate(status,startTimer, endTimer) {
				const that=this;
				if (this.pages < this.total) {
					let das = {
					  pageNum: (this.pages += 1),
					  pageSize: this.pageSize,
					  status: status,
					  startTime: startTimer,
					  endTime: endTimer
					}
					this.addRecharRecord(das).then(res=>{
						if(res.status){
							this.pages = res.data.pageNum;
							if(this.total<=this.pages){
								this.more = 'noMore'
							}else{
								this.more = 'more'
							}
						}
					}).catch(err=>{
						return err
					})
				}else{
					this.more = 'noMore'
				}
			},
			showPicker(e){
				this.isShow=true
			},
			showchange(){
				this.isShow=!this.isShow;
			},
			bindChange(data){
				this.chooseDate=data[0]+"至"+data[1]
				let sDate=data[0] + ' ' + '00:00:00'
				let eDate=data[1] + ' ' + '23:59:59'
				this.startDate=moment(sDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
				this.endDate=moment(eDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
				this.timer={
					name: '自定义',
					date: 99,
					status: 3
				}
			},
			bindCancel(e){
				this.chooseDate='自定义';
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	@import './rechargeRecord.scss';
</style>
