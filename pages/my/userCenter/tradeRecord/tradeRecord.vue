<template>
	<view class="tradeRecordView" :class="themeFontSize">
		<view class="clearBox"></view>
		<view class="tradeRecordNavigator">
			<view class="condition condition1" @click="onClickClassification">
				<view class="condition_text">
					<text class="texts">分类</text>
					<view class="arrow" :style="fication?'transform:rotate(180deg)':'transform:rotate(0)'">
						<image src="../../../../static/images/triangle.svg" class="triangle"></image>
					</view>
				</view>
				<view class="type">({{statusIndex.name}})</view>
			</view>
			<view class="condition condition2" @click="onClickDateTimer">
				<view class="condition_text">
					<text class="texts">日期</text>
					<view class="arrow" :style="typeFication?'transform:rotate(180deg)':'transform:rotate(0)'">
						<image src="../../../../static/images/triangle.svg" class="triangle"></image>
					</view>
				</view>
				<view class="dateTimer">({{timer.name}})</view>
			</view>
			<view class="condition condition3" @click="onClickType">
				<view class="condition_text">
					<text class="texts">类型</text>
					<view class="arrow" :style="typeTabList?'transform:rotate(180deg)':'transform:rotate(0)'">
						<image src="../../../../static/images/triangle.svg" class="triangle"></image>
					</view>
				</view>
				<view class="tradeType">({{typeData.description}})</view>
			</view>
		</view>
		<view class="tradeBodyDetails" v-if="tradeMxList.length>0">
			<view class="tradeList" v-for="(item,idx) in tradeMxList" :key="item.orderNo">
				<view class="tradeTitle">
					<view class="title p1">
						{{item.remark}}
					</view>
					<view class="tradeMoney p1" v-if="item.amount>0">
						金额：+{{item.amount}} 元
					</view>
					<view class="tradeMoney p1" v-else style="color:rgb(126, 211, 33)">
						金额：{{item.amount}} 元
					</view>
				</view>
				<view class="tradeContainer">
					<view class="t tradeLeft">
						<view class="orderNo">订单号：{{item.orderNo}}</view>
						<view class="time">时间：{{formartTime(item.createTime)}}</view>
					</view>
					<view class="t tradeRight">
						<view class="tadeType">类型：<text class="typeText">{{item.remark}}</text></view>
						<view class="time">当前余额：{{item.currentBalance}}</view>
					</view>
				</view>
			</view>
			<load-more :status="more" @click.native='getMore' :content-text="loadText"></load-more>
		</view>
		<view class="withdrawView" v-else>
			<view class="noDataImg">
				<image src="../../../../static/images/noData.svg" class="img"></image>
				<text class="noDataText">暂无更多内容</text>
			</view>
		</view>
		<popup ref="recordType" type="bottom" @change="change">
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择分类
				</view>
				<view class="typeTermBox">
					<view class="typeList" :class="[statusIndex.oIndex===idx?'active':'']" 
					 v-for="(item,idx) in allBanlances" :key="item.walletType"
					 v-show="item.walletType!==4"
					 @click="withdrawTypeClick(item)">{{item.name}}</view>
				</view>
			</view>
		</popup>
		<popup ref="dateType" type="bottom" @change="change">
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择日期
				</view>
				<view class="typeTermBox">
					<view class="typeTimer" v-for="(item,idx) in timeList" 
					:class="timer.status===item.status?'active':''" 
					:key='item.status'
					 @click="onClickDate(item)">{{item.name}}</view>
					 <view class="typeTimer" @click="showPicker" :class="timer.status===3?'active':''">{{chooseDate}}</view>
				</view>
			</view>
		</popup>
		<popup ref="typeList" type="bottom" @change="change">
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择类型
				</view>
				<view class="typeTermBox">
					<view class="typeBox" v-for="(item,idx) in tradeList" 
					:class="typeData.typeId===item.typeId?'active':''" 
					:key='item.typeId'
					 @click="onClickTypeName(item)">{{item.description}}</view>
				</view>
			</view>
		</popup>
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
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import Popup from '@/components/popup'
	import chache from '@/common/utils/storage'
	import loadMore from '@/components/onloadMore/uni-load-more'
	import {
		showUiToast,
		showUiLoading,
		hideUiLoading,
		showActionSheet
	} from '@/common/utils/dialog.config'
	import moment from 'moment'
	import rangeDatePick from '@/components/mx-datepicker/range-dtpicker';
	export default {
		name: 'tradeRecord',
		components: {
			Popup,
			loadMore,
			rangeDatePick
		},
		computed:{
			...mapGetters(['timeList','themeFontSize','userAllBalance','tradeTypeList','tradeMxList']),
			allBanlances () {
			  let list = this.userAllBalance
			  return list
			},
			tradeList(){
				const that=this
				const list=this.tradeTypeList;
				let arr=[];
				if(list.length>0){
					arr=list.filter(item=>item.level!==3);
					let das={
						description: "全部",
						level:3,
						typeId:29380024
					}
					that.typeData=das;
					arr.unshift(das)
				}
				return arr;
			},
			startTimer(){
				return moment(new Date()).subtract(1,'years').format('YYYY-MM-DD');
			},
			endTimer(){
				return moment(new Date()).format('YYYY-MM-DD');
			}
		},
		data() {
			const currentDate = this.getDate({
			   format: true
			})
			return {
				statusIndex: {
					name: '现金',
					walletName: 'CASH',
					walletType: 1,
					oIndex: 0
				},
				timer: {
					name: '当天',
					date: 1,
					status: 0
				},
				startDate:'',
				endDate:'',
				type:'',
				typeData: {},
				fication:false,
				typeFication:false,
				typeTabList:false,
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
		onLoad() {
			this.getTimeList();
			this.startDate = this.timeList[0].startTimes;
			this.endDate = this.timeList[0].endTimes
			this.getTradeRecord(this.statusIndex.walletType,this.typeData.typeId,this.startDate,this.endDate)
		},
		onReady(){
			this.getTimeList()
			this.getTradeMoney()
			this.getTrade()
		},
		methods:{
			...mapActions(['getTimeList','getMine','getTradeType','getTradeRecordList']),
			// 获取交易明细列表
			getTradeRecord(walletTypes, typeIds, startTimer, endTimer){
				const that=this
				let das = typeIds==29380024?{
					pageNum: 1,
					pageSize: that.pageSize,
					startTime: startTimer,
					endTime: endTimer,
					walletType: walletTypes
			    }:{
					pageNum: 1,
					pageSize: that.pageSize,
					startTime: startTimer,
					endTime: endTimer,
					walletType: walletTypes,
					typeId: typeIds
			    }
				this.startDate = startTimer
			    this.endDate = endTimer
				this.getTradeRecordList(das).then(res=>{
					if(res.status){
						that.pageSize=res.data.pageSize;
						that.total=res.data.pages;
					}
				}).catch(err=>{
					return err
				})
			},
			// 追加交易明细
			addTradeRecord(walletTypes, typeIds, startTimer, endTimer){
				const _that = this
				if (this.pages < this.total) {
					let das = typeIds==29380024?{
					  pageNum: (this.pages += 1),
					  pageSize: this.pageSize,
					  startTime: startTimer,
					  endTime: endTimer,
					  walletType: walletTypes
					}:{
					  pageNum: (this.pages += 1),
					  pageSize: this.pageSize,
					  startTime: startTimer,
					  endTime: endTimer,
					  walletType: walletTypes,
					  typeId: typeIds
					}
				}
			},
			// 获取钱包分类
			getTradeMoney(){
				const that=this
				if(that.userAllBalance.length==0){
					that.getMine().then(res=>{
						if(!res.status){
							showUiToast(res.msg)
						}
					}).catch(err=>{
						return err;
					})
				}
			},
			// 打开分类
			onClickClassification(){
				this.$refs.recordType.open()
				this.fication=true
			},
			// 选择分类
			withdrawTypeClick(item){
				this.statusIndex=item
				this.getTradeRecord(
					item.walletType,
					this.typeData.typeId,
					this.startDate,
					this.endDate
				)
				this.fication=false
				this.$refs.recordType.close()
			},
			// 打开日期
			onClickDateTimer(){
				this.$refs.dateType.open()
				this.typeFication=true
			},
			// 选择日期
			onClickDate(item){
				this.timer=item
				this.getTradeRecord(
					this.statusIndex.walletType,
					this.typeData.typeId,
					item.startTimes,
					item.endTimes
				)
				this.typeFication=false
				this.$refs.dateType.close()
			},
			// 打开类型
			onClickType(){
				this.$refs.typeList.open()
				this.typeTabList=true
			},
			// 选择类型
			onClickTypeName(item){
				this.typeData=item
				this.getTradeRecord(
					this.statusIndex.walletType,
					item.typeId,
					this.startDate,
					this.endDate
				)
				this.typeTabList=false
				this.$refs.typeList.close()
			},
			// 交易类型
			getTrade(){
				this.getTradeType().then(res=>{
					if(!res.status){
						showUiToast(res.msg)
					}
				}).catch(err=>{
					return err
				})
			},
			// 显示日期
			showPicker(e){
				this.isShow=true
			},
			// 显示隐藏日期
			showchange(){
				this.isShow=!this.isShow;
			},
			// 自定义日期
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
				this.getTradeRecord(
					this.statusIndex.walletType,
					this.typeData.typeId,
					this.startDate,
					this.endDate
				)
				this.typeFication=false
				this.$refs.dateType.close()
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
			},
			// 格式化ISO时间
			formartTime (t) {
			  return moment(t).format('YYYY-MM-DD HH:mm:ss')
			},
			// 关闭分类
			change(val){
				const that=this
				if(!val.show){
					that.fication=false
					that.typeFication=false
					that.typeTabList=false
				}
			}
		}
	}
</script>

<style lang="scss">
@import './tradeRecord.scss';
</style>
