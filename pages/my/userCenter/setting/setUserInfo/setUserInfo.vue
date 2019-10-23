<template>
	<view class="setUserInfoView">
		<view class="setTopView"></view>
		<view class="setting_box">
			<view class="setting_top">
				<view class="setting_list">
					<view class="setting_title">
						<input type="text" class="emailView" placeholder="请输入邮箱" v-model="userInfo.email">
					</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
				<view class="setting_list" @click="onShowDatePicker('date')">
					<view class="setting_title">
						<view class="uni-list-cell-db">
							{{userInfo.date==''?'请选择日期':userInfo.date}}
						</view>
					</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
				<view class="setting_list" @click="toggleTab">
					<view class="setting_title">
						{{address==''?'请选择城市':address}}
					</view>
					<view class="setting_icon">
						<fonts-icon type="fanhui" size='26' color='#999'></fonts-icon>
					</view>
				</view>
			</view>
			<view class="submit_button">
				<button type="primary" class="submit_btn" @click="setUser" :loading="!flat">提交</button>
			</view>
		</view>
		<w-picker mode="linkage" :level="3" :value="['11','1101','110101']" :defaultVal="['北京市','市辖区','东城区']" @confirm="onConfirm"
		 ref="linkage" :linkList="location" themeColor="#1b82d1"></w-picker>
		<mx-date-picker :showHoliday='false' :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
		 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import address from '@/components/w-picker/city-data/address.js';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		isEmail
	} from '@/common/utils/validate'
	import {
		showUiToast
	} from '@/common/utils/dialog.config'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name: 'setUserInfo',
		components: {
			wPicker,
			MxDatePicker
		},
		data() {
			return {
				defaultVal: [0, 0, 0, 0, 0, 0, 0],
				address: '',
				type: 'date',
				showPicker: false,
				value: '',
				flat: true,
				userInfo: {
					email: '',
					city: '',
					date: ''
				}
			};
		},
		computed: {
			location() {
				return address;
			}
		},
		methods: {
			...mapActions(['setUserInfo']),
			onConfirm(val) {
				// console.log(val);
				let add = `${val.checkArr[0]},${val.checkArr[1]},${val.checkArr[2]}`;
				this.userInfo.city = `${val.checkArr[0]}${val.checkArr[2]}`;
				this.address = add.substring(0, 18) + (add.length > 18 ? '...' : '');
				this.resultInfo = val;
			},
			toggleTab() {
				this.$refs.linkage.show();
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					this.userInfo.date = e.value.replace(/\//g, '-');
				}
			},
			setUser() {
				const that = this
				if (!this.userInfo.email) {
					showUiToast('email不能为空');
					return;
				}
				if (!this.userInfo.date) {
					showUiToast('请选择日期');
					return;
				}
				if (!this.userInfo.city) {
					showUiToast('请选择所在城市');
					return;
				}
				if (!isEmail(this.userInfo.email)) {
					showUiToast('邮箱格式不正确');
					return;
				}
				const params = {
					data: {
						email: this.userInfo.email,
						birthday: this.userInfo.date,
						area: this.userInfo.city
					}
				}
				if (that.flat) {
					that.flat = false
					that.setUserInfo(params).then(res => {
						that.flat = true;
						if (res.status) {
							showUiToast('更新成功');
							that.userInfo.email = ''
							that.userInfo.date = ''
							that.userInfo.city = ''
							that.address=''
							setTimeout(() => {
								that.$mRouter.reLaunch({
									route: this.$routers.my
								})
							}, 2000)
							return;
						} else {
							showUiToast(res.msg);
						}
					}).catch(err => {
						that.flat = true;
						return err;
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './setUserInfo.scss';
</style>
