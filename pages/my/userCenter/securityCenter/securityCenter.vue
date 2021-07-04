<template>
	<view class="securityView" :class="themeFontSize">
		<view class="securityTable">
			<best-gauge :config="gaugeOption" bgColor="rgba(255,255,255,0)"></best-gauge>
			<div class="wave one"></div>
			<div class="wave tow"></div>
			<div class="wave three"></div>
		</view>
		<view class="userBindInfo">
			<view class="bindInfo bindRealName" @click="goRouteLink('realName')">
				<view class="bindIconView bind">
					<view class="bindIcon">
						<fonts-icon type="shimingrenzheng1" size="40" color='rgb(27, 130, 209)'></fonts-icon>
					</view>
				</view>
				<view class="bindTitle bind">实名认证</view>
				<view class="binStatus bind">
					<view class="state">
						<image src="../../../../static/images/g.svg" class="stateImg" v-if='bindInfo.isUserVierity'></image>
						<image src="../../../../static/images/jg.svg" class="stateImg" v-else></image>
					</view>
				</view>
			</view>
			<view class="bindInfo bindBank" @click="goRouteLink('bindBank')">
				<view class="bindIconView bind">
					<view class="bindIcon">
						<fonts-icon type="yinhangqia" size="40" color='rgb(27, 130, 209)'></fonts-icon>
					</view>
				</view>
				<view class="bindTitle bind">绑定银行卡</view>
				<view class="binStatus bind">
					<view class="state">
						<image src="../../../../static/images/g.svg" class="stateImg" v-if='bindInfo.isbandBank'></image>
						<image src="../../../../static/images/jg.svg" class="stateImg" v-else></image>
					</view>
				</view>
			</view>
			<view class="bindInfo bindPhone">
				<view class="bindIconView bind">
					<view class="bindIcon">
						<fonts-icon type="shoujiyanzheng" size="40" color='rgb(27, 130, 209)'></fonts-icon>
					</view>
				</view>
				<view class="bindTitle bind">手机绑定</view>
				<view class="binStatus bind">
					<view class="state" >
						<image src="../../../../static/images/g.svg" class="stateImg" v-if='bindInfo.isPhone'></image>
						<image src="../../../../static/images/jg.svg" class="stateImg" v-else></image>
					</view>
				</view>
			</view>
			<view class="bindInfo bindAmountPwd">
				<view class="bindIconView bind">
					<view class="bindIcon">
						<fonts-icon type="suo" size="42" color='rgb(27, 130, 209)'></fonts-icon>
					</view>
				</view>
				<view class="bindTitle bind" @click="goRouteLink('amountPwd')">资金密码</view>
				<view class="binStatus bind">
					<view class="state">
						<image src="../../../../static/images/g.svg" class="stateImg" v-if='bindInfo.isSetFundPass'></image>
						<image src="../../../../static/images/jg.svg" class="stateImg" v-else></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bestGauge from '@/components/best-gauge/best-gauge.vue'
	import {mapActions,mapGetters} from 'vuex'
	import {showUiModel} from '@/common/utils/dialog.config'
	export default {
		 components:{
			bestGauge
		},
		data() {
			let _width = uni.upx2px(350);
			return {
				gaugeOption:{ //定义参数
					id: 'gaugeId0',
					value: 0,
					status:false,
					axisTickLength: 2//该属性与axisTick互斥，存在axisTickLength并大于0，axisTick就无效
				}
			};
		},
		computed:{
			...mapGetters(['bindInfo','themeFontSize'])
		},
		onReady(){
			this.getBindInfo();
		},
		watch:{
			bindInfo(news,old){
				this.add();
			}
		},
		methods:{
			...mapActions(['getUserBindInfo']),
			add(){
				let sum=0;
				let timer=setTimeout(()=>{
					this.gaugeOption.value+=1;
					this.add();
				},30)
				sum=this.bindInfo.surplus>=90 ? 0 : 10;
				if(this.gaugeOption.value==this.bindInfo.surplus + sum){
					clearTimeout(timer);
					this.reduct();
				}
			},
			reduct(){
				let timer=setTimeout(()=>{
					this.gaugeOption.value-=1;
					this.reduct();
				},40)
				if(this.gaugeOption.value==this.bindInfo.surplus){
					clearTimeout(timer);
				}
			},
			getBindInfo(){
				this.getUserBindInfo().then(res=>{
					if(!res.status){
						showUiModel(res.msg)
					}
				}).catch(err=>{
					return err;
				})
			},
			goRouteLink(val){
				if(val==='realName'){
					this.$mRouter.push({
						route:this.$routers.realName
					})
					return;
				}
				if(val==='bindBank'){
					this.$mRouter.push({
						route:this.$routers.bank
					})
					return;
				}
				if(val==='amountPwd'){
					this.$mRouter.push({
						route:this.$routers.setFundsPassword
					})
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
@import './securityCenter.scss';
</style>
