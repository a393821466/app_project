const config={
	domain:process.env.NODE_ENV=='development'?'https://tmk.eanjee.com':'https://tmk.eanjee.com',
	sqlLiteConfig:{
		name:'futures',
		path:'_doc/futures.db',
		success:function(e){
			uni.showToast({
			    title: 'success!',
			    duration: 2000
			});
		},
		fail:function(e){
			console.log('failed: '+JSON.stringify(e));
		}
	}
	// isSqlLite:{
	// 	name:'futures',
	// 	path:'_doc/futures.db'
	// },
	// closeSqlLite:{
	// 	name:'futures',
	// 	success:function(e){
	// 		uni.showToast({
	// 		    title: 'close success',
	// 		    duration: 2000
	// 		});
	// 	},
	// 	fail:function(e){
	// 		console.log('closeDatabase failed: '+JSON.stringify(e));
	// 	}
	// }
}

export default config;