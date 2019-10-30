<template>
	<view class="addBank" :class="themeFontSize">
		<view class="addBank_tip">
			<fonts-icon type="wenti" size='42' color="#1b82d1"></fonts-icon>
			<text class="meBankTip">请填写您的真实信息，通过后将不能修改</text></view>
		<view class="bankInput">
			<!-- view class="bankCartName">
				<text class="flexBankView title">持卡人</text>
				<view class="flexBankView input">张三</view>
				<view class="flexBankView iconRight">
					<fonts-icon type="wenti" size='38' color="#ccc"></fonts-icon>
				</view>
			</view> -->
			<view class="bankCartName">
				<text class="flexBankView title">卡号</text>
				<view class="flexBankView input">
					<input type="number" maxlength="19" 
					placeholder="请输入银行卡号" 
					class="bankNumber" 
					v-model='postBankInfo.bankNum'>
				</view>
				<view class="flexBankView iconRight"></view>
			</view>
			<view class="bankCartName">
				<text class="flexBankView title">开户银行</text>
				<view class="flexBankView input">
					<view class="flexBankView input" @click="openBanks">{{postBankInfo.bankName==''?'请选择银行':postBankInfo.bankName}}</view>
				</view>
				<view class="flexBankView iconRight"></view>
			</view>
			<view class="bankCartName">
				<text class="flexBankView title">开户城市</text>
				<view class="flexBankView input" @click="toggleTab">{{address==''?'请选择城市':address}}</view>
				<view class="flexBankView iconRight"></view>
			</view>
			<view class="bankCartName">
				<text class="flexBankView title">开户支行</text>
				<view class="flexBankView input">
					<input type="text" placeholder="请填写开户支行" class="bankNumber" 
					v-model='postBankInfo.openBankAddress'>
				</view>
				<view class="flexBankView iconRight"></view>
			</view>
		</view>
		<view class="submit_cartNumber">
			<button type="primary" @click="submitAddBank" :loading="!flat">提交</button>
		</view>
		<w-picker
			mode="linkage"
			:level="3"
			:value="['11','1101','110101']"
			:defaultVal="['北京市','市辖区','东城区']"
			@confirm="onConfirm"
			ref="linkage"
			:linkList="location"
			themeColor="#1b82d1"
		></w-picker>
		<w-picker 
			v-if="bankListData.length!=0"
			mode="selector" 
			:defaultVal="[0]" 
			@confirm="onConfirm2" 
			ref="selector" 
			themeColor="#1b82d1"
			:selectList="bankListData"
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import address from '@/components/w-picker/city-data/address.js';
	import {showUiToast,showUiModel} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name:'addBank',
		components:{
			wPicker
		},
		data() {
			return {
				defaultVal:[0,0,0,0,0,0,0],
				postBankInfo: {
					bankNum: '',
					bankName: '',
					bankCity: '',
					openBankAddress:'',
					bankCode:'',
					bankId:0
			    },
				flat:true,
				bankLoad:true,
				address:'',
			};
		},
		computed:{
			...mapGetters(['userInfo','bankList','myBankList','themeFontSize']),
			location(){
				return address;
			},
			bankListData(){
				return this.bankList.length>0?this.bankList:[]
			}
		},
		onReady(){
			this.getMyBank();
		},
		methods:{
			...mapActions(['getBankListInfo','addmyBank','queryBank']),
			toggleTab(){
				this.$refs.linkage.show();
			},
			openBanks(){
				const that=this
				if(this.bankList.length>0){
					that.$refs.selector.show();
				}else{
					if(this.bankLoad){
						this.bankLoad=false
						this.postBankInfo.bankName='加载银行卡列表中.'
						this.getBankListInfo({state:1}).then(res=>{
							this.postBankInfo.bankName='请选择银行'
							this.bankLoad=true
							if(res.status){
								that.$refs.selector.show();
								return
							}
						}).catch(err=>{
							this.bankLoad=true
							showUiToast('加载失败');
							return err
						})
					}
				}
			},
			getMyBank(){
				const uuid=this.userInfo.uuid;
				this.queryBank({uuid:uuid}).then(res=>{
					if(!res.status){
						showUiToast(res.msg);
					}
					if(res.data.length>=3){
						showUiToast('您的银行卡绑定数量已上限');
						this.$mRouter.back(1)
					}
				}).catch(err=>{
					return err;
				})
			},
			onConfirm(val){
				// console.log(val);
				let add=`${val.checkArr[0]},${val.checkArr[1]},${val.checkArr[2]}`;
				this.postBankInfo.bankCity=`${val.checkArr[0]}${val.checkArr[2]}`;
				this.address=add.substring(0,15)+(add.length>15?'...':'');
				this.resultInfo=val;
			},
			onConfirm2(val){
				this.postBankInfo.bankName=val.checkArr.label;
				this.postBankInfo.bankId=val.checkArr.id;
				this.postBankInfo.bankCode=val.checkArr.value;
			},
			submitAddBank(){
				const that=this
				const isRealName=chache.get('userInfo').isUserVierity||chache.get('isUserVierity')
				if(isRealName!=1){
					showUiToast('请实名认证后操作');
					return;
				}
				if(this.postBankInfo.bankNum==''){
					showUiToast('请输入银行卡号');
					return;
				}
				if(this.postBankInfo.bankCode==''){
					showUiToast('请选择银行类型');
					return;
				}
				if(this.postBankInfo.bankCity==''){
					showUiToast('请选择开户城市');
					return;
				}
				const userInfo = chache.has('userInfo')?chache.get('userInfo'):''
				const data = {
					userUuid: userInfo.uuid,
					phone: userInfo.userPhone,
					bankType: 1, // 银行卡类型  0、支付宝 1、银行卡 2、微信
					// accountName: this.bankList.accountName,
					accountNum: this.postBankInfo.bankNum,
					bank: this.postBankInfo.bankId,
					bankLand: this.postBankInfo.bankCity,
					bankName: this.postBankInfo.bankName,
					bankCode: this.postBankInfo.bankCode
			    }
				if(this.flat){
					this.flat=false;
					this.addmyBank(data).then(res=>{
						that.flat=true;
						if(res.status){
							showUiToast('添加成功');
							uni.navigateBack({
							    delta: 1
							});
							return;
						}else{
							showUiToast(res.msg);
						}
					}).catch(err=>{
						that.flat=true;
						return err;
					})
				}
			}
		}
	}
</script>

<style lang="scss">
@import './addBank.scss';
</style>
