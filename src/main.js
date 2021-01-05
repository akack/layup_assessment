import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Home from './components/Home'

Vue.config.productionTip = false

const routes = {
  '/': App,
  '/home': Home
}

new Vue({
  // render: h => h(App),
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute]
    }
  },
  render(h) { return h(this.ViewComponent) }
}).$mount('#app')
