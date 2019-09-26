<template>
	<view class="footer">
		<view class="footer_mask"></view>
		<view class="tabbar_footer">
			<view class="tabbar_list" v-for="(item,idx) in data" :key="item.id">
				<fonts-icon :type="item.icon" :size='item.sized' color='#666'></fonts-icon>
				<view class="tabbar_title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					{	
						id:1,
						icon:'indexHome11',
						iconActive:'indexHome22',
						sized:46,
						title:'首页'
					},
					{
						id:2,
						icon:'market11',
						iconActive:'market22',
						sized:48,
						title:'行情'
					},
					{
						id:3,
						icon:'trade11',
						iconActive:'trade22',
						sized:48,
						title:'交易'
					},
					{
						id:4,
						icon:'zixun11',
						iconActive:'zixun22',
						sized:48,
						title:'资讯'
					},
					{
						id:5,
						icon:'my11',
						iconActive:'my22',
						sized:46,
						title:'我的'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
.footer{
	.footer_mask{
		height:110rpx;
		width:100%;
	}
	.tabbar_footer{
		width:100%;
		position:fixed;
		bottom:0;
		left:0;
		height:110rpx;
		background:#fff;
		border-top:2rpx #eee solid;
		display:flex;
		flex-direction: row;
		flex-wrap: nowrap;
		.tabbar_list{
			flex:1;
			text-align:center;
			padding-top:10rpx;
			.tabbar_title{
				font-size:28rpx;
				font-weight:normal;
				color:#666;
				padding-top:3rpx;
			}
		}
	}
}
</style>
