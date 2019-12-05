import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msg'
import './config/vmask'
import store from './config/store'
import router from './config/router'
Vue.config.productionTip = false

Vue.directive('uppercase',
  {
    inserted: function(el, _, vnode) {
      el.addEventListener('input', async function(e) {
        e.target.value = e.target.value.toUpperCase()
        vnode.componentInstance.$emit('input', e.target.value.toUpperCase())
      })
    }
  })

Vue.directive('max',
  {
    inserted: function(el, _, vnode) {
      el.addEventListener('input', async function(e) {
        if (e.target.value > _.value ) {
          e.target.value = _.value
          vnode.componentInstance.$emit('input', e.target.value)
        }
      })
    }
})

Vue.directive('min',
  {
    inserted: function(el, _, vnode) {
      el.addEventListener('input', async function(e) {
        if (e.target.value < _.value ) {
          e.target.value = _.value
          vnode.componentInstance.$emit('input', e.target.value)
        }
      })
    }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')