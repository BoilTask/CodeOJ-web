import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'

import iEditor from 'iview-editor';
import 'iview-editor/dist/iview-editor.css';
Vue.use(iEditor);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
