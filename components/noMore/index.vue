<template>
	<view class="noMore">
		<view class="noData" v-if="temText=='noData'">
			<view class="imgs" :style="{marginTop:top+'px'}">
				<image src="../../static/images/noData.svg" class="noDataImage"></image>
				<text class="noDataText">无更多内容了</text>
			</view>
		</view>
		<view class="noLogin" v-else>
			<view class="imgUrl">
				<image src="../../static/images/noLogin.svg" class="imgs"></image>
			</view>
			<text class="login_txt">登录后可查看该页面</text>
			<view class="go" @click="goLogin">去登录</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'noMore',
		props:{
			top:{
				type:[Number,String],
				default:60
			},
			temText:{
				type:String,
				default:'noLogin'
			}
		},
		data(){
			return{
				da:''
			}
		},
		methods:{
			goLogin(){
				this.$mRouter.push({
					route:this.$routers.login,
					query:{
						id:1
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
.noData{
	.imgs{
		width:260rpx;
		margin:0 auto;
		.noDataImage{
			width:100%;
			height:300rpx;
		}
		.noDataText{
			text-align:center;
			font-size:36rpx;
			display:block;
			color:#ccc;
		}
	}
}
.noLogin{
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	right:0;
	background:#fff;
	.imgUrl{
		width:200rpx;
		height:200rpx;
		margin:180rpx auto 0;
		.imgs{
			width:100%;
			height:100%;
		}
	}
	.login_txt{
		display:block;
		text-align:center;
		font-size:36rpx;
		line-height:100rpx;
		color:#666;
	}
	.go{
		width:160rpx;
		height:60rpx;
		background:#1b82d1;
		color:#eee;
		text-align:center;
		margin:0 auto;
		line-height:60rpx;
		border-radius:10rpx;
	}
}
</style>
