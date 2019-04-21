import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'

import iView from 'iview'
Vue.use(iView)

Vue.config.productionTip = false

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

import MarkdownShow from './components/MarkdownShow'
Vue.use(MarkdownShow)

import Cookies from 'js-cookie'

import vueTencentCaptcha from '@carpenter/vue-tencent-captcha';

Vue.use(vueTencentCaptcha);

function RouterError(errmsg) {
	router.push({
		name: 'Error',
		params: {
			msg: errmsg
		}
	})
	document.title = '错误 - CodeOJ'
}

router.beforeEach((to, from, next) => {
	if (!store.state.loginInfo.isLogin) {
		let cookieInfo = Cookies.getJSON('loginInfo')
		if (cookieInfo) {
			store.state.loginInfo = cookieInfo
		}
	}
	let API_ROOT = Cookies.getJSON('API_ROOT')
	if (API_ROOT) {
		store.state.API_ROOT = API_ROOT
	}
	if (to.meta.auth != null && to.meta.auth) {
		// if (store.state.loginInfo.isLogin && store.state.loginInfo.token != '' && store.state.loginInfo.user_id != '') {
		axios.post(store.state.API_ROOT + 'auth',
				'user_id=' + store.state.loginInfo.user_id + '&token=' + store.state.loginInfo.token + '&path=' + to.fullPath)
			.then(response => {
				if (response.data.ret == 200 && response.data.data) {
					iView.LoadingBar.start();
					iView.Spin.show()
					if (to.meta.title) {
						document.title = to.meta.title
					}
					next();
				} else {
					RouterError('无权限或信息有误！')
				}
			}).catch(function(error) {
				console.log(error);
				RouterError('连接服务器失败！')
			});
		// } else {
		// RouterError('请先登录')
		// }
	} else {
		iView.LoadingBar.start();
		iView.Spin.show()
		if (to.meta.title) {
			document.title = to.meta.title
		}
		next();
	}
});

router.afterEach(route => {
	iView.LoadingBar.finish();
	iView.Spin.hide()
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
