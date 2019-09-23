import MinRouter from './router.config'

// 配置路由
const router=new MinRouter({
	routes:[
		{
			path:'pages/index/index',
			// type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']
			type:'navigateTo',
			name:'index'
		},
		{
			path:'pages/market/market',
			type:'navigateTo',
			name:'market'
		},
		{
			path:'pages/news/news',
			type:'navigateTo',
			name:'news'
		},
		{
			path:'pages/my/my',
			type:'navigateTo',
			name:'my'
		},
		{
			path:'pages/trade/trade',
			type:'navigateTo',
			name:'my'
		},
		{
			path:'pages/login/login',
			type:'navigateTo',
			name:'login'
		}
	]
})

router.beforeEach((to,from,next)=>{
	// console.log(to,from,next)
})

export default router;