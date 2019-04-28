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
			path: '/problem/:id(\\d+)',
			name: 'Problem',
			component: () => import('./views/Problem.vue'),
			meta: {
				title: '问题 - CodeOJ'
			}
		},
		{
			path: '/problem/:id(\\d+)/edit',
			name: 'ProblemEdit',
			component: () => import('./views/ProblemEdit.vue'),
			meta: {
				auth: true,
				title: '问题编辑 - CodeOJ'
			}
		},
		{
			path: '/blog/:id(\\d+)',
			name: 'Blog',
			component: () => import('./views/Blog.vue'),
			meta: {
				auth: true,
				title: '文章 - CodeOJ'
			}
		},
		{
			path: '/blog/add',
			name: 'BlogAdd',
			component: () => import('./views/BlogAdd.vue'),
			meta: {
				auth: true,
				title: '新建文章 - CodeOJ'
			}
		},
		{
			path: '/blog/:id(\\d+)/edit',
			name: 'BlogEdit',
			component: () => import('./views/BlogEdit.vue'),
			meta: {
				auth: true,
				title: '文章编辑 - CodeOJ'
			}
		},
		{
			path: '/news/add',
			name: 'NewsAdd',
			component: () => import('./views/NewsAdd.vue'),
			meta: {
				auth: true,
				title: '新建新闻 - CodeOJ'
			}
		},
		{
			path: '/news/:id(\\d+)/edit',
			name: 'NewsEdit',
			component: () => import('./views/NewsEdit.vue'),
			meta: {
				auth: true,
				title: '新闻编辑 - CodeOJ'
			}
		},
		{
			path: '/user/:id',
			name: 'User',
			component: () => import('./views/User.vue'),
			meta: {
				auth: true,
				title: '用户 - CodeOJ'
			}
		},
		{
			path: '/manage*',
			component: () => import('./views/Manage.vue'),
			children: [{
					path: 'user',
					component: () => import('./views/ManageUser.vue'),
					meta: {
						auth: true,
						title: '编辑资料 - CodeOJ'
					},
				},{
					path: 'userinfo',
					component: () => import('./views/ManageUserInfo.vue'),
					meta: {
						auth: true,
						title: '更新信息 - CodeOJ'
					},
				}, {
					path: 'blog',
					component: () => import('./views/ManageBlog.vue'),
					meta: {
						auth: true,
						title: '文章管理 - CodeOJ'
					},
				}, {
					path: 'domain',
					component: () => import('./views/ManageDomain.vue'),
					meta: {
						auth: true,
						title: '端口设置 - CodeOJ'
					},
				},, {
					path: 'carouse',
					component: () => import('./views/ManageCarouse.vue'),
					meta: {
						auth: true,
						title: '首页轮播 - CodeOJ'
					},
				},, {
					path: 'news',
					component: () => import('./views/ManageNews.vue'),
					meta: {
						auth: true,
						title: '首页新闻 - CodeOJ'
					},
				},, {
					path: 'problem',
					component: () => import('./views/ManageProblem.vue'),
					meta: {
						auth: true,
						title: '问题管理 - CodeOJ'
					},
				},
				{
					path: '',
					name: 'Manage',
					component: () => import('./views/ManageUser.vue'),
					meta: {
						auth: true,
						title: '信息编辑 - CodeOJ'
					},
				},
			]
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
			redirect: "/error"
		}
	]
})
