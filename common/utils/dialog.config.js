/**
 *  H5轻弹
 * @params string timer 显示时间
 * @params string image 自定义图标 
 * @params string icon 图标 (success,loading,none)
 * @params string local 弹框位置
 * */
 export const h5Toast=(title,{
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
 *  原生轻弹
 * @params string timer 显示时间
 * @params string bgColor 颜色
 * @params string icon 图标
 * @params string width 图标宽
 * @params string height 图标高 
 * @params string style 图标与字体的排列  inline:横排 block:上下排
 * @params string type 类型 text:字符串  richtext:富文本
 * @params string location 弹框显示位置 
 * */
 export const appToast=(title,{
	 timer='short',
	 bgColor='rgba(0,0,0,0.8)',
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
  * 原生对话框(Alert)
  * @params string title 标题 
  * @params string btnText 点击按钮
  * @params string message 内容
  * @params function func 回调方法(外面调用必须使用字符串健值‘func’)
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
  * 原生对话框(confirm)
  * @params string title 标题
  * @params Array btnText 点击按钮
  * @params string message 内容
  * @params func 回调方法  获取索引e.index (必选)
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
  * @params string title 标题
  * @params Array<object> select 内容
  * @params callback 回调方法  获取索引e.index
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
  * @params string title 标题
  * @params Array btnText 点击按钮
  * @params string message 内容
  * @params string placeHolder 输入框占位符
  * @params func 回调方法  获取索引e.index 获取input数据e.value (必选) 
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
  *  plus.nativeUI.showWaiting(title);  // 原生loading
  * */
  export const closeNativeUi=(ui)=>{
	  ui.close();
  }