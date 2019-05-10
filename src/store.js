import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Cookies from 'js-cookie'

export default new Vuex.Store({
	state: {
		API_ROOT: 'https://api.codeoj.cn/',
		CDN_ROOT: 'http://cdn.codeoj.cn/',
		server_time: '',
		loginInfo: {
			isLogin: false,
			user_id: '',
			token: ''
		},
		drawerInfo: {
			drawerTitle: '',
			drawerContent:'',
			drawerShow: false
			
		},
		modalInfo: {
			modalTitle: '',
			modalContent:'',
			modalShow: false
			
		},
	},
	mutations: {
		changeAPIROOT(state, val = 'https://api.codeoj.cn/') {
			state.API_ROOT = val
			Cookies.set('API_ROOT', state.API_ROOT)
		},
		drawerChange(state, flag = true) {
			Vue.set(state.drawerInfo, 'drawerShow', flag)
		},
		drawerTitle(state, title = '') {
			Vue.set(state.drawerInfo, 'drawerTitle', title)
		},
		drawerContent(state, content = '') {
			Vue.set(state.drawerInfo, 'drawerContent', content)
		},
		drawerClose(state){
			Vue.set(state.drawerInfo, 'drawerShow', false)
			Vue.set(state.drawerInfo, 'drawerContent', '')
			Vue.set(state.drawerInfo, 'drawerTitle', '')
		},
		modalChange(state, flag = true) {
			Vue.set(state.modalInfo, 'modalShow', flag)
		},
		modalTitle(state, title = '') {
			Vue.set(state.modalInfo, 'modalTitle', title)
		},
		modalContent(state, content = '') {
			Vue.set(state.modalInfo, 'modalContent', content)
		},
		modalClose(state){
			Vue.set(state.modalInfo, 'modalShow', false)
			Vue.set(state.modalInfo, 'modalContent', '')
			Vue.set(state.modalInfo, 'modalTitle', '')
		},
		Login(state, payload) {
			Vue.set(state.loginInfo, 'isLogin', true)
			Vue.set(state.loginInfo, 'user_id', payload.user_id)
			Vue.set(state.loginInfo, 'token', payload.token)
			Cookies.set('loginInfo', state.loginInfo)
		},
		Logout(state) {
			Vue.set(state.loginInfo, 'isLogin', false)
			Vue.set(state.loginInfo, 'user_id', '')
			Vue.set(state.loginInfo, 'token', '')
			Cookies.remove('loginInfo')
		},
		setTime(state, time) {
			state.server_time = time
		}
	}
})
