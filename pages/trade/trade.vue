<template>
	<view class="trade">
		<view class="trade_box" v-if="token">
			<view class="openSql sql" @click="openSql">打开数据库</view>
			<view class="jcsql sql" @click="isSql">检查数据库</view>
			<view class="xrSql sql" @click="writeSql">写入数据库</view>
			<view class="dqSql sql" @click="readSql">读取数据库</view>
			<view class="updateSql sql" @click="updateSql">更新数据</view>
			<view class="closeSql sql" @click="closeSql">关闭数据库</view>
			<view class="delSql sql" @click="delSql">删除数据</view>
			<view class="delSql sql" @click="delSqlTable">删除数据表</view>
		</view>
		<no-login v-else></no-login>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import noLogin from '@/components/noLogin'
	import config from '@/common/utils/config'
	import {showUiToast} from '@/common/utils/dialog.config'
	export default {
		name:'trade',
		components:{
			noLogin
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['token']),
		},
		onShow(){
			if(!this.token){
				
			}
		},
		methods: {
			openSql(){
				plus.sqlite.openDatabase(config.sqlLiteConfig);
			},
			isSql(){
				const isOpenSql=plus.sqlite.isOpenDatabase(config.sqlLiteConfig);
				uni.showToast({
				    title: `sql ${isOpenSql}`,
				    duration: 2000
				});
			},
			writeSql(){
				plus.sqlite.executeSql({
					name:'futures',
					sql:'create table if not exists fontDataBase("id" INT(11) PRIMARY KEY NOT NULL,"type" CHAR(100))',
					success:function(e){
						console.log(e);
						plus.sqlite.executeSql({
							name: 'futures',
							sql: "insert into fontDataBase values(1,'daytime2')",
							success: function(e){
								console.log('executeSql success!');
								uni.showToast({
								    title: `写入成功`,
								    duration: 2000
								});
							},
							fail: function(e){
								console.log('executeSql failed: '+JSON.stringify(e));
							}
						});
					}
				});
			},
			readSql(){
				plus.sqlite.selectSql({
					name: 'futures',
					sql: 'select * from fontDataBase',
					success: function(data){
						console.log('selectSql success: ');
						for(let i=0;i<data.length;i++){
							console.log(data[0])
							uni.showToast({
							    title: `数据为:${data[i].type}`,
							    duration: 2000
							});
						}
					},
					fail: function(e){
						console.log('selectSql failed: '+JSON.stringify(e));
					}
				});
			},
			closeSql(){
				plus.sqlite.closeDatabase(config.sqlLiteConfig);
			},
			delSql(){
				plus.sqlite.executeSql({
					name: 'futures',
					sql: "delete from fontDataBase where id=1",
					success: function(e){
						uni.showToast({
						    title: `删除成功`,
						    duration: 2000
						});
					},
					fail: function(e){
						console.log('delete failed: '+JSON.stringify(e));
					}
				});
			},
			updateSql(){
				plus.sqlite.executeSql({
					name: 'futures',
					sql: "update fontDataBase set type='daytime3' where id=1",
					success: function(e){
						uni.showToast({
						    title: `更新成功`,
						    duration: 2000
						});
					},
					fail: function(e){
						console.log('update failed: '+JSON.stringify(e));
					}
				});
			},
			delSqlTable(){
				plus.sqlite.executeSql({
					name: 'futures',
					sql: "drop table fontDataBase",
					success: function(e){
						uni.showToast({
						    title: `删除表成功`,
						    duration: 2000
						});
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
.trade_box{
	.sql{
		width:230upx;
		height:80upx;
		line-height:80upx;
		border:solid 1px #2580EF;
		margin:20upx;
		text-align:center;
		border-radius:10upx;
	}
}
</style>
