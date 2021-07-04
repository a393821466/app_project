const config={
	domain:'https://tmk.eanjee.com',
	sqlLiteConfig:{
		name:'futures',
		path:'_doc/futures.db',
		success:function(e){
			console.log('ok!');
		},
		fail:function(e){
			console.log('failed: '+JSON.stringify(e));
		}
	}
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