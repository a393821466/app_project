<template>
	<view class="quickOrder">
		<view class="quick">
			<view class="selectModel" v-if="openQuick">
				<view class="model">
					<checkbox-group class="uni-list" @change="changeCheckout">
						<label>
							<checkbox :checked="model.type=='0'?false:true" :value="model.type" style="transform:scale(0.8)" class="checkBoxModel"/>
							<text class="selectText">{{model.title}}</text>
						</label>
					</checkbox-group>
				</view>
				<view class="handNum">
					<view class="hand-num-view">
						<picker @change="bindPickerChange1" :value="index1" :range="getHandNum">
							<view class="uni-input">手数:{{getHandNum[index1]}}手</view>
						</picker>
					</view>
				</view>
				<view class="stopLoopAmount">
					<view class="stop-loop-amount">
						<picker @change="bindPickerChange2" :value="index2" :range="getStopAmount()">
							<view class="uni-input">止损金额:{{productionData.currentCurrencySign}}{{getStopAmount()[index2]}}</view>
						</picker>	
					</view>
				</view>
			</view>
			<view class="quickOriderView">
				<view class="q quick-rise" @click="goOrder(1)">
					<view class="rise-top">
						26674
					</view>
					<view class="rise-bottom">
						<view class="icon">
							<fonts-icon type="xiajiangxiajiantouxiangxiadiexianxing1"
							size="28" 
							color="#f8f8f8"></fonts-icon>
						</view>
						<text class="buy">{{openQuick?'闪电买多':'买多'}}</text>
					</view>
				</view>
				<view class="open-quick-orider">
					<view class="quick-center" @click="openQuickOrder">
						<view class="quickOrderIcon" :animation="animationData">
							<fonts-icon type="image" size="44" :color="openQuick?'#ccc':'#f8f8f8'"></fonts-icon>
						</view>
						<text class="quick-text" :style="[openQuick?'#ccc':'#f8f8f8']">{{openQuick?'ON':'OFF'}}</text>
					</view>
				</view>
				<view class="q quick-sell" @click="goOrder(2)">
					<view class="rise-top">
						26672
					</view>
					<view class="rise-bottom">
						<view class="icon">
							<fonts-icon type="xiajiangxiajiantouxiangxiadiexianxing" size="28" color="#f8f8f8"></fonts-icon>
						</view>
						<text class="buy">{{openQuick?'闪电卖空':'卖空'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="quickOrider-placeholder"></view>
	</view>
</template>

<script>
export default{
	name:'quickOrder',
	props:{
		marketDetails:{
			type:[Object,Array],
			required:true
		}
	},
	data(){
		return{
			openQuick:false,
			animationData: {},
			productionData:{},
			handNum: [1, 3, 5, 8,10],
			stopMoney:[1400,2000,2800,3600,5100],
			index1: 0,
			index2: 0,
			nowHandNum:1,
			nowStopMoney:0,
			checks:false,
			model:{
				num: 1,
				title: '元模式',
				type: '0'
			}
		}
	},
	watch:{
		marketDetails(news){
			if(news){
				this.productionData=news;
				let hands=news.tradeHandsUnit.split(',');
				let gearInfoMoney = typeof news.gearInfo === 'string' ? JSON.parse(news.gearInfo) : [];
				let num=Object.keys(gearInfoMoney[0])[0];
				this.nowHandNum=hands[0];
				this.nowStopMoney=num*this.model.num;
			}
		}
	},
	created(){
		// 初始化一个动画
		var animation = uni.createAnimation({
			duration: 100,
			timingFunction: 'ease',
		})
		this.animation = animation
	},
	computed:{
		// 手数
		getHandNum(){
			if(this.productionData.tradeHandsUnit){
				let tradeHandLimit=this.productionData.tradeHandsUnit.split(',');
				return tradeHandLimit;
			}else{
				return ['-']
			}
		}
	},
	methods:{
		// 改变模式
		changeCheckout(e){
			let gearInfoMoney = typeof this.productionData.gearInfo === 'string' ? JSON.parse(this.productionData.gearInfo) : '';
			if(!gearInfoMoney){
				return;
			}
			let num=Object.keys(gearInfoMoney[0])[0];
			if(e.detail.value=='0'){
				this.model={
					num: 0.1,
					title: '角模式',
					type: '1'
				}
			}else{
				this.model={
					num: 1,
					title: '元模式',
					type: '0'
				}
			}
			this.index1=0
			this.index2=0
			this.nowHandNum=1
			this.nowStopMoney=(num*this.model.num)*this.nowHandNum;
		},
		// 手数选择
		bindPickerChange1(e) {
			let v=[];
			this.index1 = e.target.value
			this.nowHandNum=this.getHandNum[this.index1]
			let gearInfo=this.productionData.gearInfo;
			let gearInfoMoney = typeof gearInfo === 'string' ? JSON.parse(gearInfo) : [];
			for (let j in gearInfoMoney) {
			  let nums = Object.keys(gearInfoMoney[j])[0];
			  let stopMoney=(nums*this.model.num)*this.nowHandNum;
			  v.push(stopMoney);
			}
			this.nowStopMoney=v[0]
			this.index2=0
		},
		// 止损金额选择
		bindPickerChange2(e) {
			let amount=this.getStopAmount()
			this.index2 = e.target.value
			this.nowStopMoney=amount[this.index2]
		},
		// 开启快速下单
		openQuickOrder(){
			if (!this.openQuick) {
				this.rotateAndScale()
			} else {
				this.norotateAndScale()
			}
			this.getStopAmount()
			this.openQuick=!this.openQuick;
		},
		// 获取止损值
		getStopAmount(){
			if(this.productionData.gearInfo){
				let v=[];
				let gearInfo=this.productionData.gearInfo;
				let gearInfoMoney = typeof gearInfo === 'string' ? JSON.parse(gearInfo) : [];
				for (let j in gearInfoMoney) {
				  let nums = Object.keys(gearInfoMoney[j])[0];
				  let stopMoney=(nums*this.model.num)*this.nowHandNum;
				  v.push(stopMoney);
				}
				return v;
			}
		},
		// 下单
		goOrder(num){
			if(!this.openQuick){
				console.log('跳转');
				return;
			}
			if(num==1){
				this.buyMore(this.productionData.walletType)
			}else{
				this.mallNull(this.productionData.walletType)
			}
			// _that.nowBuyMuch(walletNum)
			// console.log(this.nowHandNum,this.nowStopMoney)
		},
		// 买多
		buyMore(n){
			let data = {
				orderType: n,
				tradeModel: typeof this.model.type=='string'?Number(this.model.type):this.model.type,
				tradeType: 1,
				price: 1321
		    }
			console.log(data)
		},
		// 卖空
		mallNull(){
			
		},
		rotateAndScale() {
			// 定义动画内容
			this.animation.scale(1.7, 1.7).step()
			.scale(1.0, 1.0).step()
			.scale(1.2, 1.2).step()
			// 导出动画数据传递给data层
			this.animationData = this.animation.export()
		},
		norotateAndScale() {
			this.animation.scale(1, 1).step()
			this.animationData = this.animation.export()
		}
	}
}
</script>

<style lang='scss'>
.quickOrder,.quickOriderView{
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 998;
}
.quick{
	background:#f8f8f8;
	border-top:1px solid #e8e8e8;
	.selectModel{
		display:flex;
		flex-direction: row;
		padding:20upx;
		.model{
			color:#666;
			flex:0 0 25%;
			width:25%;
			label{
				display:flex;
				flex-direction:row;
				.selectText{
					display:block;
					line-height:50upx;
					flex:1;
				}
			}
		}
		.handNum{
			flex:0 0 30%;
			width:30%;
		}
		.stopLoopAmount{
			flex:0 0 45%;
			width:45%;
		}
		.hand-num-view,.stop-loop-amount{
			width:90%;
			height:50upx;
			background:#888;
			color:#f8f8f8;
			text-align:center;
			margin:0 auto;
			line-height:50upx;
			border-radius:5upx;
		}
	}
	
}
.quickOrder{
	.quickOriderView{
		display: flex;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.q{
			flex:1;
			height:130upx;
			&.quick-rise{
				background:#ec2e2e;
			}
			&.quick-sell{
				background:#08b831;
			}
			.rise-top{
				color:#f8f8f8;
				text-align:center;
				padding-top:20upx;
			}
			.rise-bottom{
				color:#f8f8f8;
				/* text-align:center; */
				display:flex;
				flex-direction:row;
				.icon{
					flex:0 0 38%;
					width:38%;
					/*#ifdef APP-PLUS */
					padding-top:10upx;
					/*#endif */
					text-align:right;
				}
				.buy{
					flex:0 0 62%;
					width:62%;
					text-align:left;
					padding-left:6upx;
				}
			}
		}
		.open-quick-orider{
			position:absolute;
			left:50%;
			width:130upx;
			height:130upx;
			border-radius:50%;
			background:#fff;
			margin-left:-67upx;
			.quick-center{
				width:110upx;
				height:110upx;
				margin:10upx auto 0;
				background: linear-gradient(90deg, rgb(20, 152, 237), rgb(53, 91, 236));
				border-radius:50%;
				.quickOrderIcon{
					text-align:center;
					padding-top:10upx;
				}
				.quick-text{
					text-align:center;
					color:#f8f8f8;
					display:block;
				}
			}
		}
	}
	.quickOrider-placeholder{
		width: 100%;
		height:130upx;
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
	}
}
</style>
