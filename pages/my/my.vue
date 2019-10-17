<template>
	<view class="my_page">
		<view class="all_intOut" v-if="token">
			<!--头像，实名，用户名，设置，-->
			<view class="my_top_box">
				<view class="my_tops avatar_top">
					<view class="icon_avatar">
						<view class="icons_single">
							<image :src="avator" class="avatar"></image>
						</view>
						<view class="vip">
							<view class="vip_center">V</view>
						</view>
					</view>
				</view>
				<view class="my_tops userInfo">
					<view class="realName">
						<view class="goReadNameTwo" v-if="getReadName"><fonts-icon type="shimingrenzheng" color='#eee' size='24'></fonts-icon><text class="readNameSuccess">已实名认证</text></view>
						<text class="goReadName" v-else>您还未实名,点我去实名</text>
						
					</view>
					<view class="emial_userName">
						<text class="email">{{getUserPhone(this.userInfo.userPhone)}}</text>
					</view>
				</view>
				<view class="my_tops setting">
					<view class="setting_arrow" @click="goSetting">
						<fonts-icon type="fanhui" color='rgba(255,255,255,.5)' size='32'></fonts-icon>
					</view>
				</view>
			</view>
			<!--账户余额，可用余额，冻结余额-->
			<view class="money_box">
				<view class="money">
					<text class="num">{{!userBalance.balance?'-':userBalance.balance}}</text>
					<view class="rate">账户余额(元)</view>
					<view class="right_line"></view>
				</view>
				<view class="money">
					<text class="num">{{!userBalance.amountUseable?'-':userBalance.amountUseable}}</text>
					<view class="rate">可提余额(元)</view>
					<view class="right_line"></view>
				</view>
				<view class="money">
					<text class="num">{{!userBalance.amountFrozen?'-':userBalance.amountFrozen}}</text>
					<view class="rate">冻结余额(元)</view>
				</view>
			</view>
			<!-- 充提与钱包 -->
			<view class="withdraw_rechange_moneyBag">
				<view class="withdraw_rechange_title">
					常用入口
				</view>
				<view class="withdraw_rechange_grid">
					<view class="intOut" @click="goIntLink($event,'rechange')">
						<view class="icon_int rechange"><fonts-icon type="chongzhi" size='38' color='#fff'></fonts-icon></view>
						<text class="intOutText">充值</text>
					</view>
					<view class="intOut" @click="goIntLink($event,'balance')">
						<view class="icon_int moneybag"><fonts-icon type="qianbao" size='38' color='#fff'></fonts-icon></view>
						<text class="intOutText">钱包</text>
					</view>
					<view class="intOut" @click="goIntLink($event,'whithdraw')">
						<view class="icon_int withdraw"><fonts-icon type="tixian" size='38' color='#fff'></fonts-icon></view>
						<text class="intOutText">提现</text>
					</view>
				</view>
			</view>
			<!-- 九宫格用户和代理 -->
			<view class="grid_row_list">
				<view class="grid_box">
					<view class="grid-title">
						<view></view>
						<text>会员中心</text>
					</view>
					<view class="grid">
						<view class="grid-item-4" v-for="(item, index) in memberGrid" :key="index" @click="gridClick(item, index)">
							<fonts-icon :type="item.icon" :size='item.sized' :color='item.colors'></fonts-icon>
							<view class="item_text" v-text="item.name"></view>
							<text v-if="showTip && item.tips" v-text="item.tips"></text>
						</view>
					</view>
					<view class="grid-title">
						<view></view>
						<text>代理中心</text>
					</view>
					<view class="grid">
						<view class="grid-item-4" v-for="(item, index) in agentGrid" :key="index" @click="gridClick(item, index)">
							<fonts-icon :type="item.icon" :size='item.sized' :color='item.colors'></fonts-icon>
							<view class="item_text" v-text="item.name"></view>
							<text v-if="showTip && item.tips" v-text="item.tips"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<no-login v-else></no-login>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import noLogin from '@/components/noLogin'
	import chache from '@/common/utils/storage'
	import utils from '@/common/utils'
	import {showUiModel} from '@/common/utils/dialog.config'
	export default {
		name:'my_view',
		components:{
			noLogin
		},
		data() {
			return {
				showTip:true,
				avator:'../../static/images/avatar.jpg',
				memberGrid: [	//格子数据列表
					{
						name: '银行卡',
						icon:'yinhangqia',
						sized:50,
						colors:'#1b82d1',
						tips: '',
						url:this.$routers.bank
					},
					{
						name: '安全中心',
						icon:'yanzhengma',
						sized:50,
						colors:'#00c1dd',
						tips: '',
						url:this.$routers.securityCenter
					},
					{
						name: '交易明细',
						icon:'jiaoyi-mingxichaxun',
						sized:50,
						colors:'#FD5E5E',
						tips: '',
						url:''
					},
					{
						name: '充值记录',
						icon:'icon-test',
						sized:50,
						colors:'#1b82d1',
						tips: '',
						url:''
					},
					{
						name: '提现记录',
						icon:'tixianjilu1',
						sized:48,
						colors:'#F5A623',
						tips: '',
						url:''
					},
					{
						name: '红包',
						icon:'red-packet_icon',
						sized:48,
						colors:'#d81e06',
						tips: '12',
						url:''
					},
					{
						name: '设置',
						icon:'shezhi',
						sized:48,
						colors:'#666',
						tips: '',
						url:''
					}
				],
				agentGrid:[
					{
						name: '开户',
						icon:'kaihu',
						sized:52,
						colors:'#FD5E5E',
						tips: '',
						url:''
					},
					{
						name: '推广链接',
						icon:'youqinglianjieguanli',
						sized:52,
						colors:'#1b82d1',
						tips: '',
						url:''
					},
					{
						name: '下级管理',
						icon:'jinrongtubiaoxiajijigou',
						sized:52,
						colors:'#00c1dd',
						tips: '',
						url:''
					},
					{
						name: '下级盈亏',
						icon:'leijiyingkui',
						sized:52,
						colors:'#F5A623',
						tips: '',
						url:''
					},
					{
						name: '订单管理',
						icon:'dingdanguanli-',
						sized:52,
						colors:'#d81e06',
						tips: '',
						url:''
					}
				]
			};
		},
		computed:{
			...mapGetters(['className','token','userBalance','userInfo']),
			getReadName(){
				let readName=chache.get('userInfo');
				return this.userInfo.isUserVierity||chache.get('isUserVierity')?true:false
			}
		},
		onShow(){
			if(this.token){
				this.getMines()
			}
		},
		methods:{
			...mapActions(['getMine']),
			gridClick (item, index) {	//格子菜单点击事件
				if(item.url==''){
					return
				}
				this.$mRouter.push({
					route:item.url
				})
			},
			getMines(){
				this.getMine().then(res=>{
					uni.stopPullDownRefresh();
					if(!res.status){
						showUiModel(res.msg)
					}
				}).catch(err=>{
					uni.stopPullDownRefresh();
					return err
				})
			},
			goSetting(){
				this.$mRouter.push({
					route:this.$routers.setting
				})
			},
			getUserPhone(phone){
				if(!phone) return
				return utils.hidePhone(phone)
			},
			goIntLink(e,name){
				let routeUrl={};
				if(name=='rechange'){
					return 
				}else if(name=='balance'){
					routeUrl=this.$routers.myBlance
				}else{
					return
				}
				this.$mRouter.push({
					route:routeUrl
				})
			},
			// 下拉刷新
			onPullDownRefresh(e){
				this.getMines()
			}
		}
	}
</script>

<style lang="scss">
@import './my.scss';
</style>
