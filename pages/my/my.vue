<template>
	<view class="my_page">
		<!--头像，实名，用户名，设置，-->
		<view class="my_top_box">
			<view class="my_tops avatar_top">
				<view class="icon_avatar">
					<view class="icons_single">
						<image src="../../static/images/avatar.jpg" class="avatar"></image>
					</view>
					<view class="vip">
						<view class="vip_center">V</view>
					</view>
				</view>
			</view>
			<view class="my_tops userInfo">
				<view class="realName">
					<text class="goReadName">您还未实名,点我去实名</text>
					<!-- <view class="goReadNameTwo"><fonts-icon type="shimingrenzheng" color='#eee' size='24'></fonts-icon><text class="readNameSuccess">已实名</text></view> -->
				</view>
				<view class="emial_userName">
					<text class="email">13423332323</text>
				</view>
			</view>
			<view class="my_tops setting">
				<view class="setting_arrow">
					<fonts-icon type="fanhui" color='rgba(255,255,255,.5)' size='32'></fonts-icon>
				</view>
			</view>
		</view>
		<!--账户余额，可用余额，冻结余额-->
		<view class="money_box">
			<view class="money">
				<text class="num">0</text>
				<view class="rate">账户余额(元)</view>
				<view class="right_line"></view>
			</view>
			<view class="money">
				<text class="num">0</text>
				<view class="rate">可提余额(元)</view>
				<view class="right_line"></view>
			</view>
			<view class="money">
				<text class="num">0</text>
				<view class="rate">冻结余额(元)</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import './my.scss';
</style>
