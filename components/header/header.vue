<template>
	<view class="uni_topbar" :style="style">
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
						返回
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
		background: #2580EF;
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
			padding:0 20rpx;
			.home_left{
				width:20%;
				flex:0 0 20%;
				box-flex:0 0 20%;
				position:relative;
				.home_back_icon{
					position:relative;
					font-size:30rpx;
					line-height:90rpx;
					color:#ccc;
					.icon_Back{
						width:20rpx;
						height:28rpx;
						display:block;
						position:absolute;
						top:10rpx;
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
				line-height:90rpx;
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
