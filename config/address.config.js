const basicUrl=''
if(process.env.NODE_ENV==='development'){
	basicUrl=''
}else{
	basicUrl=''
}
export default{
	common:{
		banner:`${basicUrl}/banner`
	}
}