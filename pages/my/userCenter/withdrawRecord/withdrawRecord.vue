<template>
	<view class="withdrawRecordView" :class="themeFontSize">
		<view class="uni-padding-wrap uni-common-mt withdrawRecord">
			<view class="withdrawView">
			<mescroll-uni
				:down="downOption" 
				@down="downCallback" 
				:up="upOption" 
				@up="upCallback"
				@init="mescrollInit"
				scroll-with-animation
				scroll-y
				>
					<view class="withdrawList" v-for="(it,index) in withdrawList" :key="index">
						<view class="withdrawTitle">
							{{!it.remark?'-':it.remark}}
						</view>
						<view class="withdrawBox">
							<view class="withdrawDetail left">
								<view class="withdrawStatus">
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
							<view class="withdrawDetail right">
								<text class="right_money">充值余额：{{it.amount}}元</text>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
			<!-- <view class="withdrawView" v-else>
				<view class="noDataImg">
					<image src="../../../../static/images/noData.svg" class="img"></image>
					<text class="noDataText">暂无更多内容</text>
				</view>
			</view> -->
		</view>
		<range-date-pick
			:show="isShow"
			@showchange="showchange"
			:start="startTimer"
			:end="endTimer"
			:value="value"
			@change="bindChange"
			@cancel="bindCancel"
			themeColor="#4C83D6"
		></range-date-pick>
		<popup ref="withdrawTerm" type="bottom" @change='change'>
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择提现类型
				</view>
				<view class="typeTermBox">
					<view class="typeList" :class="[item.id==typeTerm.id?'active':'']" v-for="(item,idx) in typeTermList" :key='item.id'
					 @click="withdrawTypeClick(item)">{{item.name}}</view>
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
	import Popup from '@/components/popup'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import rangeDatePick from '@/components/mx-datepicker/range-dtpicker'
	export default {
		name: 'withdrawRecord',
		components:{
			Popup,
			rangeDatePick,
			MescrollUni
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
				typeTermList: [
					{ name: '全部', id: 0, status: '' },
					{ name: '申请', id: 1, status: 1 },
					{ name: '审核', id: 2, status: 2 },
					{ name: '拒绝', id: 3, status: 3 },
					{ name: '发起', id: 4, status: 4 },
					{ name: '成功', id: 5, status: 5 },
					{ name: '失败', id: 6, status: 6 }
				],
				startDate: '',
				endDate: '',
				pages: 1,
				pageSize: 10,
				total: 1,
				timer: {
					name: '当天',
					date: 1,
					status: 0
				},
				nowDate:currentDate,//获取当前时间
				isShow:false,
				value:[],
				chooseDate:"自定义",
				// 下拉刷新组件参数
				mescroll: null,
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textLoading: '加载中...', // 加载中的提示文本
					textNoMore: '-- 无更多内容 --', // 没有更多数据的提示文本
					empty: {
						use: true, // 是否显示空布局
						tip: '~ 暂无内容 ~', // 提示
						tipFontSize:30 // 字体大小
					}
				},
				isOpen:false
			};
		},
		computed:{
			...mapGetters(['timeList', 'withdrawList','themeFontSize']),
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
			// this.setDate(this.status, this.startDate, this.endDate)
		},
		// 打开条件筛选
		onNavigationBarButtonTap() {
			if(!this.isOpen){
				this.isOpen=true
				this.$refs.withdrawTerm.open()
			}else{
				this.isOpen=false
				this.$refs.withdrawTerm.close()
			}
		},
		methods:{
			...mapActions(['getTimeList','addWithdrawRecordsList']),
			mescrollInit(mescroll){
				this.mescroll = mescroll;
			},
			// 类型条件
			withdrawTypeClick(item) {
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
				this.getWithdrawRecordsList(
					data.status, 
					data.startTime, 
					data.endTime,
					this.mescroll
				);
				this.isOpen=false
				this.$refs.withdrawTerm.close()
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
				const that=this
				if (!val.show) {
					that.isOpen=false
				}
			},
			// 格式化ISO时间
			formartTime (t) {
			  return moment(t).format('YYYY-MM-DD HH:mm:ss')
			},
			// 充值记录
			getWithdrawRecordsList(status,startTimer, endTimer,mescroll) {
				const that = this
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				let das = {
				  pageNum: pageNum,
				  pageSize: pageNum,
				  status: status,
				  startTime: startTimer,
				  endTime: endTimer
				}
				this.startDate = startTimer
				this.endDate = endTimer
				this.addWithdrawRecordsList(das).then(res=>{
					if(mescroll){
						mescroll.endSuccess();
					}
					if(res.status){
						let totalPage = res.data.pages;
						that.pageSize=res.data.pageSize;
						that.total=res.data.pages;
						mescroll.endByPage(res.data.result.length, totalPage); 
						this.$nextTick(()=>{
							mescroll.endSuccess(res.data.result.length)
						})
					}
				}).catch(err=>{
					if(mescroll){
						mescroll.endErr()
					}
					return err
				})
			},
			// 下拉刷新操作
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			// 上拉加载操作
			upCallback(mescroll) {
				this.getWithdrawRecordsList(
					this.status,
					this.startDate,
					this.endDate,
					mescroll)
			},
			// 显示时间插件
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
@import './withdrawRecord.scss';
</style>
