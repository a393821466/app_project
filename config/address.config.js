let basicUrl=''
if(process.env.NODE_ENV==='development'){
	// basicUrl='https://cxx.99qupai.com'
	basicUrl='https://tmk.rvsii.com'
}else{
	basicUrl='https://cxx.99qupai.com'
}
export default{
	common:{
		announce:`${basicUrl}/apis/console/subsystem/announce`,
		templateBox: `${basicUrl}/apis/getHomeTemplate`
	}
}