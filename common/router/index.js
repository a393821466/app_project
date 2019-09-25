import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)
// 配置路由
const router=new Router({
	routes:[
		{
			path:'/pages/index/index',
			name:'index'
		},
		{
			path:'/pages/market/market',
			name:'market'
		},
		{
			path:'/pages/news/news',
			name:'news'
		},
		{
			path:'/pages/my/my',
			name:'my'
		},
		{
			path:'pages/trade/trade',
			name:'trade'
		},
		{
			path:'pages/login/login',
			name:'login'
		}
	]
})

// router.beforeEach((to,from,next)=>{
// 	console.log(to,from,next)
// })

export default router;