<template>
	<view class="fontSizeView" :class="themeFontSize">
		<view class="fontView">
			<view class="bindInfo">
				<view class="bindTitle bind">预览字体大小</view>
			</view>
			<view class="bindInfo">
				<view class="bindTitle bind">拖动下面的滑块,可设置字体大小</view>
			</view>
			<view class="bindInfo">
				<view class="bindTitle bind">设置后,APP字体会变化</view>
			</view>
		</view>
		<view class="slider_fontSize_view">
			<view class="fontSize_view">
				<view class="fontSize_view_fontSize view1">小</view>
				<view class="fontSize_view_fontSize view2">标准</view>
				<view class="fontSize_view_fontSize view3">大</view>
			</view>
			<view class="fontSize_slider">
				<slider @change="changeSlider($event)" :value="val" min="1" max="3" name="slider" :show-value="false"></slider>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	import config from '@/common/utils/config'
	import {showUiToast} from '@/common/utils/dialog.config'
	import chache from '@/common/utils/storage'
	export default {
		data() {
			return {
				val:2
			};
		},
		computed:{
			...mapGetters(['themeFontSize'])
		},
		onLoad(){
			const that=this;
			const isOpenSql=plus.sqlite.isOpenDatabase(config.sqlLiteConfig);
			if(isOpenSql){
				plus.sqlite.selectSql(
					{
						name: 'futures',
						sql: 'select * from fontDataBase',
						success:function(data){
							if(data.length==0){
								that.createSql()
							}else{
								that.fontType(data[0].type)
							}
						},
						fail:function(e){
							showUiToast(JSON.stringify(e.message));
						}
					}
				);
			}else{
				that.createSql()
			}
		},
		// 关闭数据库
		onBackPress(){
			plus.sqlite.closeDatabase(config.sqlLiteConfig);
		},
		methods:{
			...mapActions(['appFontSize']),
			// 更改字体
			changeSlider(e){
				let s='daytime'+e.detail.value;
				chache.set('fontSizeType',s)
				this.upDateSql(s);
			},
			// 创建fontDataBase
			createSql(){
				const that=this;
				plus.sqlite.openDatabase(config.sqlLiteConfig);
				plus.sqlite.executeSql({
					name:'futures',
					sql:'create table if not exists fontDataBase("id" INT(11) PRIMARY KEY NOT NULL,"type" CHAR(100))',
					success:function(e){
						plus.sqlite.selectSql(
							{
								name: 'futures',
								sql: 'select * from fontDataBase',
								success:function(data){
									if(data.length>0){
										that.fontType(data[0].type)
									}else{
										plus.sqlite.executeSql({
											name: 'futures',
											sql: "insert into fontDataBase values(1,'daytime2')",
											success: function(e){
												console.log('executeSql success!');
												that.appFontSize('daytime2');
											},
											fail: function(e){
												console.log('executeSql failed: '+JSON.stringify(e));
											}
										});
									}
								},
								fail:function(e){
									showUiToast(JSON.stringify(e.message));
								}
							}
						);
					}
				});
			},
			fontType(f){
				this.appFontSize(f);
				if(f=='daytime1'){
					this.val=1
					return
				}
				if(f=='daytime2'){
					this.val=2
					return
				}
				if(f=='daytime3'){
					this.val=3
					return
				}
			},
			// 更新字体
			upDateSql(types){
				const that=this;
				let sql='update fontDataBase set '
				sql+='type='+JSON.stringify(types)
				sql+=' where id=1';
				plus.sqlite.executeSql({
					name: 'futures',
					sql: sql,
					success: function(e){
						that.appFontSize(types);
						
						console.log('set success!');
					},
					fail: function(e){
						console.log('update failed: '+JSON.stringify(e));
					}
				});
			}
		}
	}
</script>

<style lang="scss">
@import './fontSizePage.scss';
</style>
