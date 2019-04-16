import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})


export default new Vuex.Store({
	state: {
		API_ROOT: 'http://apidev.codeoj.cn/',
		loginInfo: {
			isLogin: false,
			user_id: '',
			token: ''
		},
		drawerShow: false
		// JSON.parse(sessionStorage.getItem('user')) || {}
	},
	mutations: {
		[USER_SIGNIN](state, user) {
			sessionStorage.setItem('user', JSON.stringify(user))
			Object.assign(state, user)
		},
		[USER_SIGNOUT](state) {
			sessionStorage.removeItem('user')
			Object.keys(state).forEach(k => Vue.delete(state, k))
		}
	},
	actions: {
		[USER_SIGNIN]({
			commit
		}, user) {
			commit(USER_SIGNIN, user)
		},
		[USER_SIGNOUT]({
			commit
		}) {
			commit(USER_SIGNOUT)
		}
	},
	plugins: [vuexLocal.plugin]
})
