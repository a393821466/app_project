/**
 *  H5轻弹
 * @params string timer 显示时间
 * @params string image 自定义图标 
 * @params string icon 图标 (success,loading,none)
 * @params string local 弹框位置
 * */
 export const showUiToast=(title,{
	 timer=2000,
	 icon='none',
	 image='',
	 local='center'}= {})=>{
	 uni.showToast({
	     title: title,
	     duration: timer,
		 icon:icon,
		 image:image,
		 position:local
	 });
 }
 
 /**
  *  隐藏H5轻弹
  * @params string timer 显示时间
  * @params string image 自定义图标 
  * @params string icon 图标 (success,loading,none)
  * @params string local 弹框位置
  * */
export const  hideUiToast=()=>{
	uni.hideUiToast()
}

/**
 * H5的loading
 * @params string title 标题文字 (必须)
 * @params boolean mask 显示透明蒙层 (默认为false)
 * */
export const showUiLoading=(title,{
	mask
}={})=>{
	uni.showLoading({
		title:title,
		mask:mask
	})
}
/**
 * 隐藏H5的loading
 * */
export const hideUiLoading=()=>{
	uni.hideLoading();
}

/**
 * H5的模态框
 * @params String title 标题
 * @params String content 内容
 * @params Boolean showCancel 是否显示取消
 * @params String cancelText 取消的文字
 * @params String cancelColor 取消文字的颜色
 * @params String confirmText 确定文字
 * @params String confirmColor 确定文字的颜色
 * */
export const showUiModel=({
	title='提示',
	content='这是一个h5的模态框',
	showCancel=false,
	cancelText='取消',
	cancelColor='#666666',
	confirmText='确定',
	confirmColor='#666666',
},success=()=>{})=>{
	uni.showModal({
	    title: title,
	    content: content,
		showCancel:showCancel,
		cancelText:cancelText,
		cancelColor:cancelColor,
		confirmText:confirmText,
		confirmColor:confirmColor,
	    success: success
	});
}

/**
 * H5的选择性底部抽屉
 * @params Arrar arr 数组数据
 * @params Function success 成功后的操作
 * @params Function err 取消后的操作
 * */
 export const showActionSheet=(
 {arr=['标题1','标题2']},
 success,
 err
 )=>{
	 uni.showActionSheet({
	     itemList: arr,
		 itemColor:'#666666',
	     success: success,
	     fail: err
	 });
 }
 
/**
 *  原生轻弹
 * @params String timer 显示时间
 * @params String bgColor 颜色
 * @params String icon 图标
 * @params String width 图标宽
 * @params String height 图标高 
 * @params String style 图标与字体的排列  inline:横排 block:上下排
 * @params String type 类型 text:字符串  richtext:富文本
 * @params String location 弹框显示位置 
 * */
 export const appToast=(title,{
	 timer='short',
	 bgColor='',
	 icon='',
	 width='50',
	 height='50',
	 style='inline',
	 type='text',
	 location='center'}={})=>{
	 let options={
 	 	duration:timer,
 	 	background:bgColor,
 	 	icon:icon,
 	 	iconWidth:width,
 	 	iconHeight:height,
 	 	style:style,
 	 	type:type,
 	 	verticalAlign:location
 	 }
 	 plus.nativeUI.toast(title, options);
 }
 
 /**
  * 原生模态框(Alert)
  * @params String title 标题 
  * @params String btnText 点击按钮
  * @params String message 内容
  * @params Function func 回调方法(外面调用必须使用字符串健值‘func’)
  * */
 export const alertModel=({
	 title='提示',
	 message='这是一个对话框',
	 btnText='确定',
	 func=()=>{}
	 }={})=>{
	 plus.nativeUI.alert(message, func, title, btnText);
 }
 
 /**
  * 原生模态框(confirm)
  * @params String title 标题
  * @params Array btnText 点击按钮
  * @params String message 内容
  * @params Function func 回调方法  获取索引e.index (必选)
  * 无参数时需传''
  * */
 export const confirmModel=({
	 title='提示',
	 message='这是一个对话框',
	 btnText=[
		 '确认',
		 '取消'
	 ],
	 local="center"
	 }={},func)=>{
	 plus.nativeUI.confirm(message,func,
		{
			"title":title,
			"buttons":btnText,
			"verticalAlign":local
		}
	);
 }
 
 /**
  *  原生选择性底部抽屉
  * @params String title 标题
  * @params Array<object> select 内容
  * @params Function callback 回调方法  获取索引e.index
  * */
 export const actionSheet=(title,{
	 select=[
		 {title:'选择一'},
		 {title:'选择二'}
	 ],
	 },callback)=>{
	 plus.nativeUI.actionSheet(
		{
			title:title,
			cancel:"取消",
			buttons:select,
		},
		function(e){
			callback(e)
		}
	);
 }
 
 /**
  * 可输入的弹窗
  * @params String title 标题
  * @params Array btnText 点击按钮
  * @params String message 内容
  * @params String placeHolder 输入框占位符
  * @params Function func 回调方法  获取索引e.index 获取input数据e.value (必选) 
  * 无参数时需传''
  * */
 export const promtModel=(
	{
	 title='提示',
	 message='输入一些东西',
	 btnText=[
		 '确认',
		 '取消'
	 ],
	 placeHolder="请输入..."
	 }={},
	 func
	)=>{
	 plus.nativeUI.prompt(message, func, title, placeHolder, btnText);
 }
 
 /**
  * 原生图片预览
  * @params Array arr 图片路径数组
  * */
 export const swiperImage=(arr)=>{
	 plus.nativeUI.previewImage(arr);
 }
 
 /**
  * 关闭所有toast
  * */
 export const closeToast=()=>{
	 plus.nativeUI.closeToast();
 }
 
 /**
  *  关闭原生界面
  *  @params Object ui 关闭的原生弹窗变量
  * */
  export const closeNativeUi=(ui)=>{
	  ui.close();
  }