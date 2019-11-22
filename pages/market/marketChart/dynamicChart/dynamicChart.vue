<template>
	<view class="chartPadding">
		<div class="button-sp-area">
			<view class="chartTab" :class="[idx==1?'active':'']" @click="ChangeMinutePeriod(1,MINUTE_PERIOD_ID.MINUTE_ID)">分时</view>
			<view class="chartTab" :class="[idx==2?'active':'']" @click="ChangeMinutePeriod(2,MINUTE_PERIOD_ID.MINUTE_5DAY_ID)">盘口</view>
			<view class="chartTab" :class="[idx==3?'active':'']" @click="ChangeKLinePeriod(3,KLINE_PERIOD_ID.KLINE_DAY_ID)">日线</view>
			<view class="chartTab" :class="[idx==4?'active':'']" @click="ChangeKLinePeriod(4,KLINE_PERIOD_ID.KLINE_WEEK_ID)">1分钟</view>
			<view class="chartTab" :class="[idx==5?'active':'']" @click="ChangeKLinePeriod(5,KLINE_PERIOD_ID.KLINE_MINUTE_ID)">5分钟</view>
			<view class="chartTab" :class="[idx==6?'active':'']" @click="ChangeKLinePeriod(6,KLINE_PERIOD_ID.KLINE_15MINUTE_ID)">15分钟</view>
		</div>
		<!--  #ifdef  H5 -->
			<div>
				<div class='kline' id="kline" ref='kline'  v-show="KLine.IsShow"></div>
				<div class='minute' id="minute" ref='minute'  v-show="Minute.IsShow"></div>
			</div>
		<!--  #endif -->
		<!--  #ifndef  H5 -->
			<view>
				<canvas id="kline2" canvas-id='kline2' class='kline2' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}"  v-show="KLine.IsShow"
				  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>  
				  <canvas id="minute2" canvas-id='minute2' class='minute' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" v-show="Minute.IsShow"
				   @touchstart="MinuteTouchStart" @touchmove='MinuteTouchMove' @touchend='MinuteTouchEnd' ></canvas>
			</view>
		<!--  #endif -->
	</view>
</template>

<script>
// #ifdef H5	
import HQChart from '@/hqchart/umychart.uniapp.h5.js'
// #endif

// #ifndef H5
import {JSCommon} from '@/hqchart/umychart.wechat.3.0.js'
// #endif
function DefaultData() { }
DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type: '历史K线图', 
        
        Windows: //窗口指标
        [
            {Index:"MA",Modify: false, Change: false}, 
            {Index:"VOL",Modify: false, Change: false}
        ], 
 
        IsCorssOnlyDrawKLine:true,
        CorssCursorTouchEnd:true,
 
        Border: //边框
        {
            Left:   1,
            Right:  1, //右边间距
            Top:    25,
            Bottom: 25,
        },
 
        KLine:
        {
            Right:1,                            //复权 0 不复权 1 前复权 2 后复权
            Period:0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
            PageSize:30,
            IsShowTooltip:false
        },
		
		ExtendChart:
		[
			{Name:'KLineTooltip' },	//开启手机端tooltip
		], 
		
		Frame:  //子框架设置
		[
		    {SplitCount:3},
		    {SplitCount:2},
		    {SplitCount:3},
		],
        
    };
 
    return data;
}
DefaultData.GetMinuteOption=function()
{
    var option= 
    {
        Type:'分钟走势图',   //创建图形类型
            
        Windows: //窗口指标
        [
            
        ], 
            
        IsAutoUpdate:true,       //是自动更新数据
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,       //是否显示右键菜单
        CorssCursorTouchEnd:true,
 
        MinuteLine:
        {
            //IsDrawAreaPrice:false,      //是否画价格面积图
        },
 
        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,   //右边间距
            Top:20,
            Bottom:20
        },
            
        Frame:  //子框架设置
        [
            {SplitCount:3},
            {SplitCount:2},
            {SplitCount:3},
        ],
        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ],
    };
 
    return option;
}


//周期枚举
var KLINE_PERIOD_ID=
{
    KLINE_DAY_ID:0,
    KLINE_WEEK_ID:1,
    KLINE_MONTH_ID:2,
    KLINE_YEAR_ID:3,

    KLINE_MINUTE_ID:4,
    KLINE_5MINUTE_ID:5,
    KLINE_15MINUTE_ID:6,
    KLINE_30MINUTE_ID:7,
    KLINE_60MINUTE_ID:8
}

//周期枚举
var MINUTE_PERIOD_ID=
{
    MINUTE_ID:1,
    MINUTE_2DAY_ID:2,
    MINUTE_3DAY_ID:3,
    MINUTE_4DAY_ID:4,
    MINUTE_5DAY_ID:5,
}

var g_KLine={ JSChart:null };
var g_Minute={ JSChart:null };

const res = uni.getSystemInfoSync();
let h = res.screenHeight-300;  //高度宽度需要手动绑定!!
let w = res.screenWidth-20;
export default{
	name:'dynamicChart',
	data() 
	{
		let data=
		{
			Symbol:'600000.sh',
			ChartWidth:w,
			ChartHeight:h,
			idx:1,
			KLine:
			{
				
				Option:DefaultData.GetKLineOption(), 
				IsShow:true,
			},
			Minute:
			{
				
				Option:DefaultData.GetMinuteOption(),
				IsShow:false,
			},
			
			MINUTE_PERIOD_ID:MINUTE_PERIOD_ID,
			KLINE_PERIOD_ID:KLINE_PERIOD_ID,
		};
		return data;
	},
	mounted(){
		this.OnSize();
		this.ChangeMinutePeriod(1,MINUTE_PERIOD_ID.MINUTE_ID); 
	},
	methods:{
		// K线
		CreateKLineChart(){
			// #ifdef H5
			this.CreateKLineChart_h5();
			// #endif
			
			// #ifndef H5
			this.CreateKLineChart_app();
			// #endif
		},
		// 分时
		CreateMinuteChart(){
			// #ifdef H5
			this.CreateMinuteChart_h5();
			// #endif
			
			// #ifndef H5
			this.CreateMinuteChart_app();
			// #endif
		},
		OnSize()
		{
			// #ifdef H5
			this.OnSize_h5();
			// #endif
		},
		OnSize_h5(){
			var chartHeight = this.ChartHeight;
			var chartWidth = this.ChartWidth;
			var kline=this.$refs.kline;
			kline.style.width=chartWidth+'px';
			kline.style.height=chartHeight+'px';
			if (g_KLine.JSChart) g_KLine.JSChart.OnSize();
			
			var minute=this.$refs.minute;
			minute.style.width=chartWidth+'px';
			minute.style.height=chartHeight+'px';
			if (g_Minute.JSChart) g_Minute.JSChart.OnSize();
		},
		CreateKLineChart_h5(){
			if (g_KLine.JSChart) return;
			this.KLine.Option.Symbol=this.Symbol;
			let chart=HQChart.JSChart.Init(this.$refs.kline);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
			chart.SetOption(this.KLine.Option);
			g_KLine.JSChart=chart;
		},
		CreateKLineChart_app(){
			if (this.KLine.JSChart) return;
			
			let element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'kline2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
					
			g_KLine.JSChart = JSCommon.JSChart.Init(element);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
			this.KLine.Option.Symbol=this.Symbol;
			g_KLine.JSChart.SetOption(this.KLine.Option);
		},
		ChangeKLinePeriod(n,period){
			this.Minute.IsShow=false;
			this.KLine.IsShow=true;
			this.idx=n;
			if (!g_KLine.JSChart)    //不存在创建
			{
					this.KLine.Option.Period=period;
					this.CreateKLineChart()
			}else{
				g_KLine.JSChart.ChangePeriod(period);
			}
		},
		CreateMinuteChart_h5(){
			if (g_Minute.JSChart) return;
			this.Minute.Option.Symbol=this.Symbol;
			let chart=HQChart.JSChart.Init(this.$refs.minute);
			this.Minute.Option.NetworkFilter=this.NetworkFilter;
			chart.SetOption(this.Minute.Option);
			g_Minute.JSChart=chart;
		},
		CreateMinuteChart_app(){
			if (g_Minute.JSChart) return;
			
			var element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'minute2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
					
			g_Minute.JSChart = JSCommon.JSChart.Init(element);
			this.Minute.Option.NetworkFilter=this.NetworkFilter;
			this.Minute.Option.Symbol=this.Symbol;
			g_Minute.JSChart.SetOption(this.Minute.Option);
		},
		//走势图多日切换
		ChangeMinutePeriod(n,period)
		{	
			this.idx=n;
			this.Minute.IsShow=true;
			this.KLine.IsShow=false;
			if (!g_Minute.JSChart)   //不存在创建
			{
				this.Minute.Option.DayCount=period;
				this.CreateMinuteChart();
			}
			else
			{
				g_Minute.JSChart.ChangeDayCount(period);
			}
		},
		NetworkFilter(data, callback){
			console.log(`[HQChart:NetworkFilter] Name=${data.Name} Explain=${data.Explain}` );
		},
		//KLine事件
		KLineTouchStart(event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
		},
		KLineTouchMove(event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
		},
		KLineTouchEnd(event){
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
		},
		//走势图事件
		MinuteTouchStart(event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchStart(event);
		},
		MinuteTouchMove(event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchMove(event);
		},
		MinuteTouchEnd(event){
		  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchEnd(event);
		},
	}
}
</script>

<style lang='scss'>
	.chartPadding{
		padding:0 20upx;
	}
	.button-sp-area{
		margin:10upx 0;
		display:flex;
		flex-direction: row;
		border-bottom:1px solid #eee;
		.chartTab{
			flex:1;
			padding:0 15upx;
			font-size:28upx;
			line-height:60upx;
			text-align:center;
			color:#666;
			border-bottom:1px solid #fff;
			&.active{
				border-bottom:1px solid #1b82d1;
				color:#1b82d1;
			}
		}
	}
</style>
