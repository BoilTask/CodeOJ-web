import Vue from 'vue'
import iView from 'iview'

import router from '../router'

import '../iview-variables.less'

Vue.use(iView)

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	iView.Spin.show()
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next();
});

router.afterEach(route => {
	iView.LoadingBar.finish();
	iView.Spin.hide()
});
