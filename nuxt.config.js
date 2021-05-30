export default {
  router: {
  	linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
    	// 清除 Nuxt.js 默认生成的路由表规则
    	routes.splice(0)
      routes.push(...[
      	{
	        path: '/',
	        component: resolve(__dirname, 'pages/layout/'),
	        children: [
	        	{
			        path: '',
			        name: 'home',
			        component: resolve(__dirname, 'pages/home/')
	        	},
	        	{
	        		path: '/login',
	        		name: 'login',
	        		component: resolve(__dirname, 'pages/login/')
	        	},
	        	{
	        		path: '/regist',
	        		name: 'regist',
	        		component: resolve(__dirname, 'pages/login/')
	        	},
	        	{
	        		path: '/profile/:username',
	        		name: 'profile',
	        		component: resolve(__dirname, 'pages/profile/')
	        	},
	        	{
	        		path: '/setting',
	        		name: 'setting',
	        		component: resolve(__dirname, 'pages/setting/')
	        	},
	        	{
	        		path: '/editor',
	        		name: 'editor',
	        		component: resolve(__dirname, 'pages/editor/')
	        	},
	        	{
	        		path: '/article/:slug',
	        		name: 'article',
	        		component: resolve(__dirname, 'pages/article/')
	        	}
	        ]
      	}
      ])
    }
  },

  server: {
  	host: '0.0.0.0',
  	port: 3000
  },

  plugins:[
  	'@/plugins/request',
  	'@/plugins/dayjs'
  ]
}