import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'

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
		drawerInfo: {
			drawerTitle: '',
			drawerShow: false
		},
	},
	mutations: {
		drawerChange(state, flag = true) {
			Vue.set(state.drawerInfo, 'drawerShow', flag)
		},
		drawerTitle(state, title = '') {
			Vue.set(state.drawerInfo, 'drawerTitle', title)
		},
		Login(state, payload) {
			Vue.set(state.loginInfo, 'isLogin', true)
			Vue.set(state.loginInfo, 'user_id', payload.user_id)
			Vue.set(state.loginInfo, 'token', payload.token)
		},
		Logout(state) {
			Vue.set(state.loginInfo, 'isLogin', false)
			Vue.set(state.loginInfo, 'user_id', '')
			Vue.set(state.loginInfo, 'token', '')
		}
	},
	actions: {

	},
	plugins: [vuexLocal.plugin]
})
