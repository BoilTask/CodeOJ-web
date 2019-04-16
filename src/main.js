import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'

Vue.config.productionTip = false

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

import MarkdownShow from './components/MarkdownShow'
import configureStore from './store';
Vue.use(MarkdownShow)

new Vue({
  router,
  store,
  store: configureStore(),
  render: h => h(App)
}).$mount('#app')
