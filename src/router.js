import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'Home',
			component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
			meta: {
				title: '代码在线评测平台 - CodeOJ'
			}
		},
		{
			path: '/problem',
			name: 'ProblemList',
			component: () => import(/* webpackChunkName: "about" */ './views/ProblemList.vue'),
			meta: {
				title: '问题列表 - CodeOJ'
			}
		}
	]
})
