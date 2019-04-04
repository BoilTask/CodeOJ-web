import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'Home',
			component: () => import( /* webpackChunkName: "about" */ './views/Home.vue'),
			meta: {
				title: '代码在线评测平台 - CodeOJ'
			}
		},
		{
			path: '/problem',
			name: 'ProblemList',
			component: () => import( /* webpackChunkName: "about" */ './views/ProblemList.vue'),
			meta: {
				title: '问题列表 - CodeOJ'
			}
		},
		{
			path: '/problem/:id',
			name: 'Problem',
			component: () => import( /* webpackChunkName: "about" */ './views/Problem.vue'),
			meta: {
				title: '问题 - CodeOJ'
			}
		},
		{
			path: '/blog/:id',
			name: 'Blog',
			component: () => import( /* webpackChunkName: "about" */ './views/Blog.vue'),
			meta: {
				title: '文章 - CodeOJ'
			}
		},
		{
			path: '/blog/:id/edit',
			name: 'BlogEdit',
			component: () => import( /* webpackChunkName: "about" */ './views/BlogEdit.vue'),
			meta: {
				title: '文章编辑 - CodeOJ'
			}
		},
		{
			path: "*",
			redirect: "/"
		}
	]
})
