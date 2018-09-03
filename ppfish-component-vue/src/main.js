import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import './assets/scss/reset.scss'

import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Form,
  FormItem,
  Input,
  Button
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
