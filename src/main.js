import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msg'
import './config/vmask'
import './config/mq'

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

Vue.directive('restrict', {
  bind (el, binding) {
    el.addEventListener('keydown', (e) => {
      // delete, backpsace, tab, escape, enter,
      let special = [46, 8, 9, 27, 13]
      if (binding.modifiers['decimal']) {
        // decimal(numpad), period
        special.push(110, 190)
      }
      // special from above
      if (special.indexOf(e.keyCode) !== -1 ||
        // Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return // allow
      }
      if ((binding.modifiers['alpha']) &&
        // a-z/A-Z
        (e.keyCode >= 65 && e.keyCode <= 90)) {
        return // allow
      }
      if ((binding.modifiers['number']) &&
        // number keys without shift
        ((!e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57)) ||
        // numpad number keys
        (e.keyCode >= 96 && e.keyCode <= 105))) {
        return // allow
      }
      // otherwise stop the keystroke
      e.preventDefault() // prevent
    }) // end addEventListener
  } // end bind
}) // end directive

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')