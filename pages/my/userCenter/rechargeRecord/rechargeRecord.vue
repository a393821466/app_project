<template>
	<view class="rechargeRecordView">
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
			<view class="rechargeList" v-for="(num,index) in data" :key="index">
				<view class="rechargeTitle">
					微信支付
				</view>
				<view class="rechargeBox">
					<view class="rechargeDetail left">
						<view class="rechargeStatus">
							充值状态：<text class="type">处理中</text>
						</view>
						<view class="tradeTime">
							交易时间：2019-10-18 17:14:58
						</view>
					</view>
					<view class="rechargeDetail right">
						<text class="right_money">充值余额：100元</text>
					</view>
				</view>
			</view>
			<load-more :status="more"></load-more>
		</view>
		<popup ref="rechargeTerm" type="bottom" @change='change'>
			<view class="typeTerm">
				<view class="typeTermTitle">
					选择充值类型
				</view>
				<view class="typeTermBox">
					<view class="typeList" :class="[item.id==typeTerm.id?'active':'']" 
					v-for="(item,idx) in typeTermList" 
					:key='item.id' 
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
					:key='item.status' @click="typeTermDate(item)">{{item.name}}</view>
					<view class="typeTimer">自定义</view>
				</view>
			</view>
			<view class="selectBtn">
				<button type="primary" class="btn reset" @click="reset">重置</button>
				<button type="primary" class="btn confirm">确定</button>
			</view>
		</popup>
	</view>
</template>

<script>
	import loadMore from '@/components/onloadMore/uni-load-more'
	import Popup from '@/components/popup'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		name:'rechargeRecord',
		components:{
			Popup,
			loadMore
		},
		data() {
			return {
				typeTerm:{ name: '全部', id: 0, status: '' },
				typeTermList:[
					{ name: '全部', id: 0, status: '' },
					{ name: '处理中', id: 1, status: 1 },
					{ name: '成功', id: 2, status: 2 },
					{ name: '失败', id: 3, status: 3 }
				],
				timer:{name: '当天', date: 1, status: 0 },
				data: [],
				showLoadMore: false,
				more:'loading',
				max: 0
			};
		},
		computed:{
			...mapGetters(['timeList'])
		},
		onLoad() {
			this.getTimeList();
			this.initData();
		},
		onReachBottom() {
			console.log("onReachBottom");
			if (this.max > 40) {
				this.more='noMore'
				return;
			}
			setTimeout(() => {
				this.setDate();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.more='loading'
			this.initData();
		},
		// 打开条件筛选
		onNavigationBarButtonTap(){
			this.$refs.rechargeTerm.open()
		},
		methods:{
			...mapActions(['getTimeList']),
			// 类型条件
			rechargeTypeClick(item){
				this.typeTerm=item;
			},
			// 时间条件
			typeTermDate(item){
				this.timer=item;
			},
			// 重置
			reset(){
				this.typeTerm={ name: '全部', id: 0, status: '' };
				this.timer={name: '当天', date: 1, status: 0 }
			},
			// 隐藏popup
			change(val){
				if(!val.show){
					this.reset()
				}
			},
			initData(){
				setTimeout(() => {
					this.max = 0;
					this.data = [];
					let data = [];
					this.max += 10;
					for (var i = this.max - 9; i < this.max + 1; i++) {
						data.push(i)
					}
					this.data = this.data.concat(data);
					uni.stopPullDownRefresh();
				}, 300);
			},
			setDate() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			}
		}
	}
</script>

<style lang="scss">
@import './rechargeRecord.scss';
</style>
