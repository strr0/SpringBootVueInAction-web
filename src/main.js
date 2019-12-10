import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import App from './App.vue'

import {getRequest} from './utils/request'
import {postRequest} from './utils/request'
import {deleteRequest} from './utils/request'
import {putRequest} from './utils/request'
import { initMenu } from './utils/menu'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

router.beforeEach((to, from, next) => {
  if(to.name == 'Login') {
    next();
    return;
  }
  var name = store.state.user.name;
  if(name == '未登录') {
    if(to.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}});
    }
    else {
      next();
    }
  }
  else {
    initMenu(router, store);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
