var getOverrides = function(theme){
  var themes = {
      "white": {
          //url: "day.css",
          up: "#ef5555",
          down: "#26a69a",
          bg: "#ffffff",
          grid: "#f7f8fa",
          cross: "#23283D",
          border: "#6F87C7",
          text: "#61688a",
          areatop: "#98C7FF",
          areadown: "#fff",
          line: "#737375",
          wickUpColor:"#ef5555",
          wickDownColor:"#26a69a"
      },
      "black": {
          //url: "night.css",
          up: "#ae4e54",
          down: "#589065",
          bg: "#181B2A",
          grid: "#1f2943",
          cross: "#9194A3",
          border: "#4e5b85",
          text: "#61688A",
          areatop: "rgba(122, 152, 247, .1)",
          areadown: "rgba(122, 152, 247, .02)",
          line: "#737375",
          wickUpColor:"#ae4e54",
          wickDownColor:"#589065"
      },
      "mobile": {
          //url: "mobile.css",
          up: "#E76D42",
          down: "#03C087",
          bg: "#ffffff",
          grid: "#f7f8fa",
          cross: "#23283D",
          border: "#C5CFD5",
          text: "#8C9FAD",
          areatop: "rgba(71, 78, 112, 0.1)",
          areadown: "rgba(71, 78, 112, 0.02)",
          showLegend: !0,
          wickUpColor:"#ae4e54",
          wickDownColor:"#589065"
      }
  };
  var t = themes[theme];
  return {
    'timeScale.barSpacing': 2, // 设置每个格子的宽度，可以用来改变显示的时间区间
    'mainSeriesProperties.style': 3,
    "volumePaneSize": "medium",
    "scalesProperties.lineColor": t.text,
    "scalesProperties.textColor": t.text,
    "paneProperties.background": t.bg,
    "paneProperties.vertGridProperties.color": t.grid,
    "paneProperties.horzGridProperties.color": t.grid,
    "paneProperties.crossHairProperties.color": t.cross,
    "paneProperties.legendProperties.showLegend": !!t.showLegend,
    "paneProperties.legendProperties.showStudyArguments": !0,
    "paneProperties.legendProperties.showStudyTitles": !0,
    "paneProperties.legendProperties.showStudyValues": !0,
    "paneProperties.legendProperties.showSeriesTitle": !0,
    "paneProperties.legendProperties.showSeriesOHLC": !0,
    "mainSeriesProperties.candleStyle.upColor": t.up,
    "mainSeriesProperties.candleStyle.downColor": t.down,
    "mainSeriesProperties.candleStyle.drawWick": !0,
    "mainSeriesProperties.candleStyle.drawBorder": !0,
    "mainSeriesProperties.candleStyle.borderColor": t.border,
    "mainSeriesProperties.candleStyle.borderUpColor": t.up,
    "mainSeriesProperties.candleStyle.borderDownColor": t.down,
    "mainSeriesProperties.candleStyle.wickUpColor": t.up,
    "mainSeriesProperties.candleStyle.wickDownColor": t.down,
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
    "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
    "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
    "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
    "mainSeriesProperties.haStyle.upColor": t.up,
    "mainSeriesProperties.haStyle.downColor": t.down,
    "mainSeriesProperties.haStyle.drawWick": !0,
    "mainSeriesProperties.haStyle.drawBorder": !0,
    "mainSeriesProperties.haStyle.borderColor": t.border,
    "mainSeriesProperties.haStyle.borderUpColor": t.up,
    "mainSeriesProperties.haStyle.borderDownColor": t.down,
    "mainSeriesProperties.haStyle.wickColor": t.border,
    "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.upColor": t.up,
    "mainSeriesProperties.barStyle.downColor": t.down,
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.dontDrawOpen": !1,
    "mainSeriesProperties.lineStyle.color": t.border,
    "mainSeriesProperties.lineStyle.linewidth": 1,
    "mainSeriesProperties.lineStyle.priceSource": "close",
    "mainSeriesProperties.areaStyle.color1": t.areatop,
    "mainSeriesProperties.areaStyle.color2": t.areadown,
    "mainSeriesProperties.areaStyle.linecolor": t.border,
    "mainSeriesProperties.areaStyle.linewidth": 2,
    "mainSeriesProperties.areaStyle.priceSource": "close",
    //标记水印透明度
    "symbolWatermarkProperties.transparency": 0,
    // 设置坐标轴字体大小
    'scalesProperties.fontSize': 13, 
    'left_toolbar': false,
    //销量面板尺寸，支持的值: large, medium, small, tiny
    "volumePaneSize": "medium",
    "mainSeriesProperties.candleStyle.wickUpColor:" : t.wickUpColor,
    "mainSeriesProperties.candleStyle.wickDownColor" : t.wickDownColor
  }
}
function getStudiesOverrides(theme){
  var themes = {
    "white": {
        c0: "rgba(38,166,154,0.6)",
        c1: "rgba(239,83,80,0.6)",
        t: 70,
        v: !1
    },
    "black": {
        c0: "#fd8b8b",
        c1: "#3cb595",
        t: 70,
        v: !1
    }
  };
  var t = themes[theme];
  return {
    "volume.volume.color.0": t.c0,
    "volume.volume.color.1": t.c1,
    "volume.volume.transparency": t.t,
    "volume.options.showStudyArguments": t.v
  }
}

var skin = "white";

var chartConfig = {
	autosize: true,
	fullscreen: true, //布尔值显示图表是否占用窗口中所有可用的空间。
	timezone: "Asia/Shanghai",
	container_id: "tv_chart_container",
	datafeed: new FeedBase(),
  library_path: "charting_library/",
  locale: "zh",
	loading_screen: {
		"backgroundColor": "#fff",
		"foregroundColor": "#5d7d93"
	},
	theme: 'Dark',
	preset: "mobile",
	disabled_features: [ // 需要屏蔽掉的 参考 https://tradingview.gitee.io/featuresets/
		"header_symbol_search", // 搜索
		'symbol_search_hot_key',
		'pane_context_menu', // 图表右键菜单
		"header_saveload", // 上传下载按钮
		"header_screenshot", // 照相机按钮
		"header_chart_type", // 图标类型按钮
		"header_compare", //compare
		"header_undo_redo", // 左右箭头
		'header_widget_dom_node', // 顶部工具栏
		"timeframes_toolbar", // 底部时间栏目
		"volume_force_overlay", // k线与销量分开
		"header_resolutions", // 分辨率
		'header_interval_dialog_button',
		'show_interval_dialog_on_key_press',
		"legend_context_menu",
		"control_bar",
		"edit_buttons_in_legend",
		"left_toolbar", // 左侧栏
		"header_fullscreen_button", //全屏
		'dont_show_boolean_study_arguments',
		'header_indicators', // 技术指标
		"save_chart_properties_to_local_storage",
		"use_localstorage_for_settings",
		"display_market_status",
		"header_settings", // 设置按钮
		"border_around_the_chart" //边框环绕
	],
	//禁用名称的数组
	enabled_features: [
		"move_logo_to_main_pane",
		"study_templates"
	],
	custom_css_url: "./css/tradingview.css",
  studies_overrides: getStudiesOverrides(skin),
	overrides:getOverrides(skin)
}