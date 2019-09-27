<template>
	<view class="uni_topbar" :style="style" :class="className">
		<view class="tabbar_top" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
		</view>
		<view class="tabbar_navigator" :style="[{'height': customBarH + 'px'}]">
			<!-- #ifdef APP-PLUS -->
			<view class="startTab" style="clear:both"></view>
			<!-- #endif -->
			<view class="header_outher">
				<view class="home_left">
					<slot name="header_Left" v-if="headerLeft"></slot>
					<view class="home_back_icon" @click='onBack' v-else>
						<view class="back_return">
							<fonts-icon type="fanhui" color='#eee' size='32'></fonts-icon>
						</view>
					</view>
				</view>
				<view class="home_center">
					<slot name="header_Center" v-if="headerCenter"></slot>
					<text class="header_title" v-else>{{title}}</text>
				</view>
				<view class="home_right entry">
					<slot name="header_Right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name: 'tabbar',
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		props: {
			isBack: {
				type: [Boolean, String],
				default: true
			},
			headerLeft: {
				type: Boolean,
				default: false
			},
			headerCenter: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
		computed: {
			...mapGetters(['className']),
			style() {
				let _style = `height: ${this.customBarH}px;`
				return _style
			},
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}

	}
</script>

<style lang="scss">
	.tabbar_navigator {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 101;
		text-align:center;
	    backface-visibility:hidden;
	    display:flex;
		flex-wrap: wrap;
		.startTab{
			width:100%;
			height:30rpx;
		}
		.header_outher{
			display:flex;
			flex-direction: row;
			width:100%;
			/* #ifndef APP-PLUS */
			padding:0 20rpx;
			/* #endif */
			.home_left{
				width:20%;
				flex:0 0 20%;
				box-flex:0 0 20%;
				position:relative;
				.home_back_icon{
					position:relative;
					font-size:30rpx;
					/* #ifdef APP-PLUS */
					line-height:120rpx;
					/* #endif */
					/* #ifndef APP-PLUS */
					line-height:90rpx;
					/* #endif */
					color:#ccc;
					.back_return{
						display:block;
						.uni-icon-fanhui{
							display:block;
							text-align:left;
							// text-indent:20rpx;
							/* #ifdef APP-PLUS */
							line-height:120rpx;
							/* #endif */
							/* #ifndef APP-PLUS */
							line-height:90rpx;
							/* #endif */
						}
					}
				}
			}
			.home_center{
				width:60%;
				flex:0 0 60%;
				box-flex:0 0 60%;
				font-size:34rpx;
				color:#eee;
				font-weight:800;
				/* #ifdef APP-PLUS */
				line-height:120rpx;
				/* #endif */
				/* #ifndef APP-PLUS */
				line-height:90rpx;
				/* #endif */
			}
			.home_right{
				width:20%;
				flex:0 0 20%;
				box-flex:0 0 20%;
				.p{
					color:#ffffff;
					font-size:14px;
				}
			}
		}
	}
</style>
