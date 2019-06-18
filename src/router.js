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
			path: '/recommend',
			name: 'Recommend',
			component: () => import('./views/Recommend'),
			meta: {
				auth: true,
				title: '智能推荐 - CodeOJ'
			}
		},
		{
			path: '/problem',
			name: 'ProblemList',
			component: () => import('./views/Problem/ProblemList.vue'),
			meta: {
				title: '问题列表 - CodeOJ'
			}
		},
		{
			path: '/problem/:id(\\d+)/statistics',
			name: 'ProblemStatistics',
			component: () => import('./views/Problem/ProblemStatistics'),
			meta: {
				auth: true,
				title: '问题统计 - CodeOJ'
			}
		},
		{
			path: '/problem/:id(\\d+)/recommend',
			name: 'ProblemRecommend',
			component: () => import('./views/Problem/ProblemRecommend'),
			meta: {
				auth: true,
				title: '问题推荐 - CodeOJ'
			}
		},
		{
			path: '/problem/:id(\\d+)',
			name: 'Problem',
			component: () => import('./views/Problem/Problem.vue'),
			meta: {
				auth: true,
				title: '问题 - CodeOJ'
			}
		},
		{
			path: '/problem/:id(\\d+)/edit',
			name: 'ProblemEdit',
			component: () => import('./views/Problem/ProblemEdit.vue'),
			meta: {
				auth: true,
				title: '问题编辑 - CodeOJ'
			}
		},
		{
			path: '/problem/add',
			name: 'ProblemAdd',
			component: () => import('./views/Problem/ProblemAdd.vue'),
			meta: {
				auth: true,
				title: '新建问题 - CodeOJ'
			}
		},
		{
			path: '/status',
			name: 'StatusList',
			component: () => import('./views/Status/StatusList.vue'),
			meta: {
				title: '评测状态 - CodeOJ'
			}
		},
		{
			path: '/status/:id(\\d+)',
			name: 'Status',
			component: () => import('./views/Status/Status.vue'),
			meta: {
				title: '评测状态 - CodeOJ'
			}
		},
		{
			path: '/contest/recent',
			name: 'ContestRecent',
			component: () => import('./views/ContestRecent.vue'),
			meta: {
				title: '评测状态 - CodeOJ'
			}
		},
		{
			path: '/blog',
			name: 'BlogList',
			component: () => import('./views/Blog/BlogList.vue'),
			meta: {
				title: '文章列表 - CodeOJ'
			}
		},
		{
			path: '/blog/:id(\\d+)',
			name: 'Blog',
			component: () => import('./views/Blog/Blog.vue'),
			meta: {
				auth: true,
				title: '文章 - CodeOJ'
			}
		},
		{
			path: '/blog/add',
			name: 'BlogAdd',
			component: () => import('./views/Blog/BlogAdd.vue'),
			meta: {
				auth: true,
				title: '新建文章 - CodeOJ'
			}
		},
		{
			path: '/blog/:id(\\d+)/edit',
			name: 'BlogEdit',
			component: () => import('./views/Blog/BlogEdit.vue'),
			meta: {
				auth: true,
				title: '文章编辑 - CodeOJ'
			}
		},
		{
			path: '/news/add',
			name: 'NewsAdd',
			component: () => import('./views/News//NewsAdd.vue'),
			meta: {
				auth: true,
				title: '新建新闻 - CodeOJ'
			}
		},
		{
			path: '/news/:id(\\d+)/edit',
			name: 'NewsEdit',
			component: () => import('./views/News//NewsEdit.vue'),
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
			component: () => import('./views/Manage/Manage.vue'),
			children: [{
					path: 'user',
					component: () => import('./views/Manage/ManageUser.vue'),
					meta: {
						auth: true,
						title: '编辑资料 - CodeOJ'
					},
				},{
					path: 'userinfo',
					component: () => import('./views/Manage/ManageUserInfo.vue'),
					meta: {
						auth: true,
						title: '更新信息 - CodeOJ'
					},
				}, {
					path: 'blog',
					component: () => import('./views/Manage/ManageBlog.vue'),
					meta: {
						auth: true,
						title: '文章管理 - CodeOJ'
					},
				}, {
					path: 'domain',
					component: () => import('./views/Manage/ManageDomain.vue'),
					meta: {
						auth: true,
						title: '端口设置 - CodeOJ'
					},
				}, {
					path: 'carouse',
					component: () => import('./views/Manage/ManageCarouse.vue'),
					meta: {
						auth: true,
						title: '首页轮播 - CodeOJ'
					},
				}, {
					path: 'news',
					component: () => import('./views/Manage/ManageNews.vue'),
					meta: {
						auth: true,
						title: '首页新闻 - CodeOJ'
					},
				}, {
					path: 'problem',
					component: () => import('./views/Manage/ManageProblem.vue'),
					meta: {
						auth: true,
						title: '问题管理 - CodeOJ'
					},
				}, {
					path: 'status',
					component: () => import('./views/Manage/ManageStatus.vue'),
					meta: {
						auth: true,
						title: '代码重判 - CodeOJ'
					},
				},
				{
					path: '',
					name: 'Manage',
					component: () => import('./views/Manage/ManageUser.vue'),
					meta: {
						auth: true,
						title: '信息编辑 - CodeOJ'
					},
				},
			]
		},
		
		{
			path: '/rank',
			name: 'Rank',
			component: () => import('./views/Rank.vue'),
			meta: {
				title: '排行榜 - CodeOJ'
			}
		},
		{
			path: '/discuss',
			name: 'DiscussList',
			component: () => import('./views/Discuss/DiscussList.vue'),
			meta: {
				title: '论坛 - CodeOJ'
			}
		},
		{
			path: '/discuss/:id(\\d+)',
			name: 'Discuss',
			component: () => import('./views/Discuss/Discuss.vue'),
			meta: {
				auth: true,
				title: '讨论 - CodeOJ'
			}
		},
		{
			path: '/discuss/add',
			name: 'DiscussAdd',
			component: () => import('./views/Discuss/DiscussAdd.vue'),
			meta: {
				auth: true,
				title: '新建讨论 - CodeOJ'
			}
		},
		{
			path: '/discuss/:id(\\d+)/edit',
			name: 'DiscussEdit',
			component: () => import('./views/Discuss/DiscussEdit.vue'),
			meta: {
				auth: true,
				title: '讨论编辑 - CodeOJ'
			}
		},
		{
			path: '/discuss/:id(\\d+)/reply/add',
			name: 'ReplyAdd',
			component: () => import('./views/Discuss/Reply/ReplyAdd.vue'),
			meta: {
				auth: true,
				title: '新建回复 - CodeOJ'
			}
		},
		{
			path: '/discuss/:id(\\d+)/reply/:reply_id(\\d+)/edit',
			name: 'ReplyEdit',
			component: () => import('./views/Discuss/Reply/ReplyEdit.vue'),
			meta: {
				auth: true,
				title: '编辑回复 - CodeOJ'
			}
		},
		{
			path: '/code',
			name: 'Code',
			component: () => import('./views/Code/Code.vue'),
			meta: {
				auth: true,
				title: '码池 - CodeOJ'
			}
		},
		{
			path: '/code/:id',
			name: 'CodeShow',
			component: () => import('./views/Code/CodeShow.vue'),
			meta: {
				auth: true,
				title: '码池展示 - CodeOJ'
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
			redirect: "/error"
		}
	]
})
