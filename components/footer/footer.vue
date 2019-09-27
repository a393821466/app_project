<template>
	<view class="footer" :class="className">
		<view class="footer_mask"></view>
		<view class="tabbar_footer">
			<view class="tabbar_list" v-for="(item,idx) in data" :key="item.id" @click="tabbarNavigator(item,idx)">
				<fonts-icon :type="current == idx?item.iconActive:item.icon" :size='item.sized' 
				:color='current == idx?"#2580EF":"#666"'></fonts-icon>
				<view class="tabbar_title" :style='{color:current == idx?"#2580EF":"#999"}'>{{item.title}}</view>
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
		name:'tabbar',
		props:{
			current: { type: [Number, String], default: 0 },
		},
		data() {
			return {
				data:[
					{	
						id:1,
						icon:'indexHome11',
						iconActive:'indexHome22',
						sized:48,
						title:'首页'
					},
					{
						id:2,
						icon:'market11',
						iconActive:'market22',
						sized:50,
						title:'行情'
					},
					{
						id:3,
						icon:'trade11',
						iconActive:'trade22',
						sized:50,
						title:'交易'
					},
					{
						id:4,
						icon:'zixun11',
						iconActive:'zixun22',
						sized:50,
						title:'资讯'
					},
					{
						id:5,
						icon:'my11',
						iconActive:'my22',
						sized:48,
						title:'我的'
					}
				],
				currentIndex:this.current
			};
		},
		computed:{
			...mapGetters(['className']),
		},
		methods:{
			tabbarNavigator(item,idx){
				this.$emit('click', idx)
			}
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
		display:flex;
		flex-direction: row;
		flex-wrap: nowrap;
		.tabbar_list{
			flex:1;
			text-align:center;
			padding-top:15rpx;
			.tabbar_title{
				font-size:24rpx;
				font-weight:normal;
				color:#666;
			}
		}
	}
}
</style>
