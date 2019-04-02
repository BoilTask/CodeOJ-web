import Vue from 'vue'
import iView from 'iview'

import router from '../router'

import '../iview-variables.less'

Vue.use(iView)

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
	iView.Spin.show()
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});