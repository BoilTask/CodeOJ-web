import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'Home',
			component: () => import('./views/Home.vue'),
			meta: {
				title: '代码在线评测平台 - CodeOJ'
			}
		},
		{
			path: '/problem',
			name: 'ProblemList',
			component: () => import('./views/ProblemList.vue'),
			meta: {
				title: '问题列表 - CodeOJ'
			}
		},
		{
			path: '/problem/:id',
			name: 'Problem',
			component: () => import('./views/Problem.vue'),
			meta: {
				title: '问题 - CodeOJ'
			}
		},
		{
			path: '/problem/:id/edit',
			name: 'ProblemEdit',
			component: () => import('./views/ProblemEdit.vue'),
			meta: {
				title: '问题编辑 - CodeOJ'
			}
		},
		{
			path: '/blog/:id',
			name: 'Blog',
			component: () => import('./views/Blog.vue'),
			meta: {
				title: '文章 - CodeOJ'
			}
		},
		{
			path: '/blog/:id/edit',
			name: 'BlogEdit',
			component: () => import('./views/BlogEdit.vue'),
			meta: {
				privilege: true,
				title: '文章编辑 - CodeOJ'
			}
		},
		{
			path: '/error',
			name: 'Error',
			component: () => import('./views/Error.vue'),
			meta: {
				title: '错误 - CodeOJ'
			}
		},
		{
			path: "*",
			redirect: "/"
		}
	]
})
