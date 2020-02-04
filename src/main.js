import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import App from './App.vue'

import {postKeyValueRequest} from './utils/request'
import {getRequest} from './utils/request'
import {postRequest} from './utils/request'
import {deleteRequest} from './utils/request'
import {putRequest} from './utils/request'
import {initMenu} from './utils/menu'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
    next();
  }
  else {
    if(window.sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();    //进入路由
    }
    else {
      next('/?redirect=' + to.path);    //进入页面
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
