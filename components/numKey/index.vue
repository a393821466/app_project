<template>
	<!-- <transition name="move_bottom"> -->
	<!-- <view class="password_Mask"
         v-show="isTrue"
         @click="ajaxData"> -->
	<!-- #ifdef H5 -->
	<transition name="page-move">
		<!-- #endif -->
		<view class="pay-tool" v-show="isTrue">
			<view class="top_title" @click.stop="backHandle">
				<text class="close_password"></text>
				<view class="pay-number-price">
				</view>
				<!-- <view class="confirm_close"
               @click.stop="confirm">确认</view> -->
			</view>
			<view style="clear:both"></view>
			<view class="pay-tool-keyboard">
				<view class="keyBox">
					<view @click.stop="keyUpHandle($event,val)" v-for="val in keys" class="keyInp" :key="val" :data-item="val==='清空'?'clear':''">
						{{ val }}
					</view>
					<view class="keyInp" @click="delHandle" style="font-size:36rpx;color:#999;">
						←
					</view>
				</view>
				<!-- <view class="del"
                  @click.stop="delHandle">
                <text class="returns">
                   o
                </text>
              </view> -->
			</view>
		</view>
		<!-- #ifdef H5 -->
	</transition>
	<!-- #endif -->
	<!-- </view> -->
</template>

<script>
	/**
	 * 交易密码弹出组件
	 * 使用方法：接收参数:isTrue,参数类型为Boolean,true为显示,false为隐藏
	 * 该组件发送监听参数:backFnc,参数类型为Object,分别为组件状态以及组件执行后的数据{isTrue:'',password:''}
	 */
	const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
	// let sendFlag = true // 防止重复发送密码
	export default {
		name: 'pswBox',
		props: {
			isTrue: {
				type: Boolean,
				default: false
			},
			bigNumber: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				items: [0, 1, 2, 3, 4, 5],
				keys: keys(),
				password: [],
				pswDatas: {}
			}
		},
		methods: {
			backHandle() {
				// this.clearPasswordHandle() // 返回时清除password
				this.pswDatas.isTrue = false
				this.$emit('backFnc', this.pswDatas) // 返回上级
			},
			keyUpHandle(e, val) {
				// let text = JSON.stringify(val)
				let sum=10
				let len = this.password.length
				if(this.password[0]==''||!this.password[0]){
					if(val==0||val=='.'){
						return;
					}
				}
				if(len==sum-1 && val=='.') return
				if (len >= sum) return
				if(this.getNumber(this.password)==1){
					if(val=='.'){
						return;
					}
					let jNum = this.password.join(' ').replace(/\s/g, '')
					let jq=jNum.split('.');
					if(jq[jq.length-1].length>1){
						return
					}
				}
				this.password.push(val)
				const pswData=this.password.join(' ').replace(/\s/g, '');
				this.pswDatas = {
				 isTrue: true,
				 password: pswData
				}
				this.$emit('backFnc', this.pswDatas)
			},
			delHandle() {
				if (this.password.length <= 0) return false
				this.password.pop()
				const pswData=this.password.join(' ').replace(/\s/g, '');
				this.pswDatas = {
				 isTrue: true,
				 password: pswData
				}
				this.$emit('backFnc', this.pswDatas)
			},
			getNumber(val){
				let num=0;
				for(let i=0;i<val.length;i++){
					if(val[i]=='.'){
						num++;
					}
				}
				return num;
			},
			//  ajaxData() {
			//    let pswData = parseInt(this.password.join(' ').replace(/\s/g, ''))
			//    this.pswDatas = {
			//      isTrue: false,
			//      password: pswData
			//    }
			// console.log(this.pswDatas)
			//    this.$emit('backFnc', this.pswDatas)
			//    this.password = []
			//    return false
			//  },
			clearPasswordHandle: function() {
				this.password = []
			}
		}
	}
</script>

<style lang="scss">
	@import './pwdBox.scss'
</style>
