const config={
	domain:process.env.NODE_ENV=='development'?'https://tmk.eanjee.com':'https://tmk.eanjee.com',
	sqlLiteConfig:{
		name:'futures',
		path:'_doc/futures.db',
		success:function(e){
			console.log('open sqlLite success!');
		},
		fail:function(){
			console.log('openDatabase failed: '+JSON.stringify(e));
		}
	}
}

export default config;