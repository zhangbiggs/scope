import Vue from 'vue'
// import { TableColumn, Table ,DatePicker} from 'element-ui';
import VueRouter from 'vue-router'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './eventbus'
Vue.use(VueRouter)
// Vue.component(Table.name, Table);
// Vue.component(TableColumn.name, TableColumn);
// Vue.component(DatePicker.name, DatePicker);
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
