<template>
	<view class="tradeRecordView" :class="themeFontSize">
		<view class="uni-padding-wrap uni-common-mt tradeTypes">
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
			<view class="tradeBodyDetails" :style="{height:screenHeight+'px'}">
				<mescroll-uni 
					:down="downOption" 
					@down="downCallback" 
					:up="upOption" 
					@up="upCallback" 
					top="110" 
					@init="mescrollInit">
					<view class="tradeList" v-for="(item,idx) in tradeMxList" :key="item.id">
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
				</mescroll-uni>
			</view>
		</view>
		<popup ref="commonPopup" type="bottom" @change='change'>
			<view class="typeTerm1" v-if="popupType==1">
				<view class="typeTermTitle">
					选择分类
				</view>
				<view class="typeTermBox">
					<view class="typeList" :class="[statusIndex.oIndex===idx?'active':'']" 
					 v-for="(item,idx) in allBanlances" 
					 :key="item.walletType"
					 v-show="item.walletType!==4"
					 @click="withdrawTypeClick(item,0)">{{item.name}}</view>
				</view>
			</view>
			<view class="typeTerm2" v-else-if="popupType==2">
				<view class="typeTermTitle">
					选择日期
				</view>
				<view class="typeTermBox">
					<view class="typeTimer" v-for="item in timeList" 
					:class="timer.status===item.status?'active':''" 
					:key='item.status'
					 @click="onClickDate(item,0)">{{item.name}}</view>
					 <view class="typeTimer" @click="showPicker($event,0)" :class="timer.status===3?'active':''">{{chooseDate}}</view>
				</view>
			</view>
			<view class="typeTerm3" v-else-if="popupType==3">
				<view class="typeTermTitle">
					选择类型
				</view>
				<view class="typeTermBox">
					<view class="typeBox" v-for="item in tradeTypeDataList" 
					:class="typeData.typeId===item.typeId?'active':''"
				    :key="item.typeName"
				     v-if="item.level==3"
					 @click="onClickTypeName(item,0)">{{item.description}}</view>
				</view>
			</view>
			<view class="moreSelectCondition" v-else>
				<scroll-view
				:scroll-top="scrollTop" 
				scroll-y="true" 
				class="scroll-Y moreSelectList" 
				@scroll="scroll">
					<view class="typeTerm4 r_select_list">
						<view class="typeTermTitle">
							选择分类
						</view>
						<view class="typeTermBox">
							<view class="typeList" :class="[temporaryStatusIndex.oIndex===idx?'active':'']" 
							 v-for="(item,idx) in allBanlances" :key="item.walletType"
							 v-show="item.walletType!==4"
							 @click.stop="withdrawTypeClick(item,1)">{{item.name}}</view>
						</view>
					</view>
					<view class="typeTerm4 r_select_list">
						<view class="typeTermTitle">
							选择日期
						</view>
						<view class="typeTermBox">
							<view class="typeTimer" v-for="item in timeList" 
							:class="temporaryTimer.status===item.status?'active':''" 
							:key='item.status'
							 @click.stop="onClickDate(item,1)">{{item.name}}</view>
							 <view class="typeTimer" @click.stop="showPicker($event,1)" :class="temporaryTimer.status===3?'active':''">{{temporaryDateText}}</view>
						</view>
					</view>
					<view class="typeTerm4 r_select_list">
						<view class="typeTermTitle">
							交易分类
						</view>
						<view class="typeTermBox">
							<view class="typeTimer" v-for="item in tradeTypeDataList" 
							:class="tradeClassificationId==item.typeId?'active':''"
							:key="item.typeName"
							 v-if="item.level==2"
							 @click.stop="tradeCategory(item)">{{item.description}}</view>
						</view>
					</view>
					<view class="typeTerm4 r_select_list">
						<view class="typeTermTitle">
							资金分类
						</view>
						<view class="typeTermBox">
							<view class="typeTimer" v-for="item in tradeTypeDataList" 
							:class="amountClassificationId==item.typeId?'active':''"
							:key="item.typeName"
							 v-if="item.level==1"
							 @click.stop="moneyCategory(item)">{{item.description}}</view>
						</view>
					</view>
					<view class="typeTerm4 r_select_list">
						<view class="typeTermTitle">
							交易类型
						</view>
						<view class="typeTermBox">
							<view class="typeTimer" v-for="item in tradeList"
							:class="tradeTypeIds==item.typeId?'active':''"
							:key="item.typeName"
							 v-if="item.level==3"
							 :style="item.typeId==0?'':item.check?'':'backgroundColor:#f8f8f8;color:#ccc'"
							 @click.stop="tradeTypeClick(item)">{{item.description}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="selectButton">
					<button type="primary" class="btn reset" @click="reset">重置</button>
					<button type="primary" class="btn confirm" @click="confirmSreach">确定</button>
				</view>
			</view>
		</popup>
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
	hideUiLoading,
	showActionSheet
} from '@/common/utils/dialog.config'
import moment from 'moment'
import Popup from '@/components/popup'
import chache from '@/common/utils/storage'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import rangeDatePick from '@/components/mx-datepicker/range-dtpicker';
export default {
	name: 'tradeRecord',
	components: {
		Popup,
		rangeDatePick,
		MescrollUni
	},
	computed:{
		...mapGetters(['timeList','themeFontSize','userAllBalance','tradeTypeList','tradeMxList']),
		allBanlances () {
		  let list = this.userAllBalance
		  return list
		},
		tradeList(){
			let das = this.tradeTypeDataList
			if (das) {
				das.map((item, idx) => {
				  if (item.level === 3) {
					if (
					  this.tradeClassificationId === 0 &&
					  this.amountClassificationId === 0
					) {
					  item.check = true
					} else {
					  if (item.typeId !== 0) {
						let parent = this.tradeClassificationId + this.amountClassificationId
						if (
						  (parent & item.typeId) === parent
						) {
						  item.check = true
						} else {
						  item.check = false
						}
					  }
					}
					return item
				  }
				})
				return das
			}
		},
		tradeTypeDataList(){
			let getTradeTypes=chache.get('tradeTypeList')
			return chache.has('tradeTypeList')?getTradeTypes:this.tradeTypeList;
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
			title:'选择分类',
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
			isOpen:false,
			typeData: {
			  description: '全部',
			  level: 3,
			  typeName: 'ALL3',
			  typeId: 0
			},
			screenHeight:0,
			fication:false,
			typeFication:false,
			typeTabList:false,
			pages: 1,
			pageSize: 5,
			total: 1,
			nowDate:currentDate,//获取当前时间
			isShow:false,
			value:[],
			chooseDate:"自定义",
			flat:true,
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
				empty: {
					use: true, // 是否显示空布局
					tip: '~ 暂无内容 ~', // 提示
					tipFontSize:30 // 字体大小
				},
				textLoading: '加载中...', // 加载中的提示文本
				textNoMore: '-- 无更多内容 --', // 没有更多数据的提示文本
			},
			// 临时数据源
			temporaryStatusIndex:{
				name: '现金',
				walletName: 'CASH',
				walletType: 1,
				oIndex: 0
			},
			temporaryTimer:{
				name: '当天',
				date: 1,
				status: 0
			},
			temporaryType:{},
			temporaryDateText:'自定义',
			isOpenSelect:0,
			tradeClassificationId: 0,
			amountClassificationId: 0,
			tradeTypeIds: 0,
			popupType:1,
			// 滚动监听数据变量
			scrollTop:0
		};
	},
	onLoad(query) {
		if(query.name){
			this.statusIndex={
				name: query.name,
				walletName: query.walletName,
				walletType: query.walletType,
				oIndex: query.oIndex
			}
		}
		// 取时间
		this.getTimeList();
		// 获取高度
		this.getScreenInfo()
		// 钱包分类
		this.getTradeMoney()
		// 交易类型
		if(!chache.has('tradeTypeList')){
			this.getTrade()
		}
		// 第一次进入数据
		this.startDate = this.timeList[0].startTimes;
		this.endDate = this.timeList[0].endTimes
		this.temporaryTimer.startTimes=this.startDate
		this.temporaryTimer.endTimes=this.endDate
	},
	// 打开条件筛选
	onNavigationBarButtonTap() {
		if(!this.isOpen){
			this.isOpen=true
			this.popupType=4
			this.$refs.commonPopup.open()
		}else{
			this.isOpen=false
			this.popupType=1
			this.$refs.commonPopup.close()
		}
	},
	methods:{
		...mapActions(['getTimeList','getMine','getTradeType','addGetTradeRecordList']),
		mescrollInit(mescroll){
			this.mescroll = mescroll;
		},
		// 滚动监听
		scroll(e){
			this.scrollTop= e.detail.scrollTop
		},
		// 交易明细
		addTradeRecord(walletTypes, typeIds, startTimer, endTimer,mescroll){
			const that = this
			let pageNum = mescroll.num; // 页码, 默认从1开始
			let pageSize = mescroll.size; // 页长, 默认每页10条
			let das = typeIds==0||!typeIds?{
			  pageNum: pageNum,
			  pageSize: pageSize,
			  startTime: startTimer,
			  endTime: endTimer,
			  walletType: walletTypes
			}:{
			  pageNum: pageNum,
			  pageSize: pageSize,
			  startTime: startTimer,
			  endTime: endTimer,
			  walletType: walletTypes,
			  typeId: typeIds
			}
			this.startDate = startTimer
			this.endDate = endTimer
			
			that.addGetTradeRecordList(das).then(res=>{
				if(mescroll){
					mescroll.endSuccess();
				}
				if(res.status){
					let totalPage = res.data.pages;
					that.pageSize=res.data.pageSize;
					that.total=res.data.pages;
					mescroll.endByPage(res.data.result.length, totalPage); 
					that.$nextTick(()=>{
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
			this.popupType=1
			this.$refs.commonPopup.open()
			// this.$refs.recordTypePopup.open()
			this.fication=true
		},
		// 选择分类
		withdrawTypeClick(item,num){
			const that=this
			if(num==0){
				that.statusIndex=item
				that.temporaryStatusIndex=item;
				that.addTradeRecord(
					item.walletType,
					that.typeData.typeId,
					that.startDate,
					that.endDate,
					that.mescroll
				)
				that.fication=false
				this.$refs.commonPopup.close()
			}else{
				that.temporaryStatusIndex=item;
			}
		},
		// 打开日期
		onClickDateTimer(){
			this.popupType=2
			this.$refs.commonPopup.open()
			// this.$refs.dateTypePopup.open()
			this.typeFication=true
		},
		// 选择日期
		onClickDate(item,num){
			const that=this
			if(num==0){
				that.timer=item
				that.temporaryTimer=item
				that.addTradeRecord(
					that.statusIndex.walletType,
					that.typeData.typeId,
					item.startTimes,
					item.endTimes,
					that.mescroll
				)
				that.typeFication=false
				this.$refs.commonPopup.close()
			}else{
				that.temporaryTimer=item
			}
		},
		// 打开类型
		onClickType(){
			this.popupType=3
			this.$refs.commonPopup.open()
			// this.$refs.typeListPopup.open()
			this.typeTabList=true
		},
		// 选择类型
		onClickTypeName(item){
			this.typeData=item
			this.tradeTypeIds=item.typeId
			this.addTradeRecord(
				this.statusIndex.walletType,
				item.typeId,
				this.startDate,
				this.endDate,
				this.mescroll
			)
			this.tradeClassificationId=0
			this.amountClassificationId=0
			this.typeTabList=false
			this.$refs.commonPopup.close()
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
		showPicker(e,n){
			this.isOpenSelect=n;
			this.isShow=true
		},
		// 显示隐藏日期
		showchange(){
			this.isShow=!this.isShow;
		},
		// 自定义日期
		bindChange(data){
			let sDate=data[0] + ' ' + '00:00:00'
			let eDate=data[1] + ' ' + '23:59:59'
			if(this.isOpenSelect==0){
				this.chooseDate=data[0]+"至"+data[1]
				this.startDate=moment(sDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
				this.endDate=moment(eDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
				this.timer={
					name: '自定义',
					date: 99,
					status: 3,
					startTimes:this.startDate,
					endTimes:this.startDate
				}
				this.temporaryTimer=this.timer
				this.temporaryDateText=data[0]+"至"+data[1]
				this.addTradeRecord(
					this.statusIndex.walletType,
					this.typeData.typeId,
					this.startDate,
					this.endDate,
					this.mescroll
				)
				this.typeFication=false
				this.$refs.commonPopup.close()
			}else{
				this.temporaryTimer={
					name: '自定义',
					date: 99,
					status: 3,
					startTimes:moment(sDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
					endTimes:moment(eDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
				}
				this.temporaryDateText=data[0]+"至"+data[1]
			}
		},
		// 下拉刷新操作
		downCallback(mescroll){
			mescroll.resetUpScroll()
		},
		// 上拉加载操作
		upCallback(mescroll) {
			this.addTradeRecord(
				this.statusIndex.walletType,
				this.typeData.typeId,
				this.startDate,
				this.endDate,
				mescroll)
		},
		changeMoreSelect(item){
			if(!item.show){
				// this.statusIndex= {
				// 	name: '现金',
				// 	walletName: 'CASH',
				// 	walletType: 1,
				// 	oIndex: 0
				// }
				// this.timer={
				// 	name: '当天',
				// 	date: 1,
				// 	status: 0
				// }
			}
		},
		// 交易分类点击事件
		tradeCategory(item){
			this.tradeClassificationId = item.typeId
			this.tradeTypeIds = 0
		},
		// 资金类型点击事件
		moneyCategory(item){
			this.amountClassificationId = item.typeId
			this.tradeTypeIds = 0
		},
		// 交易类型点击事件
		tradeTypeClick(item){
			if (!item.check) {
				return
			}
			this.temporaryType = item
			this.tradeTypeIds = item.typeId
		},
		// 重置筛选
		reset(){
			this.temporaryStatusIndex={
				name: '现金',
				walletName: 'CASH',
				walletType: 1,
				oIndex: 0
			}
			this.temporaryTimer={
				name: '当天',
				date: 1,
				status: 0,
				startTimes:this.timeList[0].startTimes,
				endTimes:this.timeList[0].endTimes
			}
			this.tradeClassificationId = 0
			this.amountClassificationId = 0
			this.tradeTypeIds = 0
			this.temporaryDateText='自定义'
		},
		// 确认筛选
		confirmSreach(){
			let typeIds=this.tradeClassificationId+this.amountClassificationId+this.tradeTypeIds;
			this.statusIndex=this.temporaryStatusIndex
			this.timer=this.temporaryTimer
			this.chooseDate=this.temporaryDateText
			let typeList=this.tradeTypeDataList;
			let filterType=typeList.filter(item=>item.typeId==typeIds&&item.typeId!==0&&item.level==3);
			if(filterType.length>0){
				this.temporaryType=filterType[0]
			}else{
				this.temporaryType={
					description: '全部',
					level: 3,
					typeName: 'ALL3',
					typeId: 0
				}
			}
			this.typeData=this.temporaryType
			this.addTradeRecord(
				this.statusIndex.walletType,
				typeIds,
				this.timer.startTimes,
				this.timer.endTimes,
				this.mescroll
			)
			this.isOpen=false
			this.popupType=1
			this.$refs.commonPopup.close()
		},
		// 高度
		getScreenInfo(){
			const that=this
			uni.getSystemInfo({
				success: function(e) {
					that.screenHeight=e.windowHeight-60
				}
			})
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
				that.isOpen=false
				that.popupType=1
			}
		}
	}
}
</script>

<style lang="scss">
@import './tradeRecord.scss';
</style>
