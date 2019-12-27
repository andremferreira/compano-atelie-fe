import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import AdminPages from '@/components/admin/AdminPages'
import Home from '@/components/home/Home'
import Clients from '@/components/client/Clients'
import Budgets from '@/components/budget/Budgets'
import Services from '@/components/service/Services'
import ServOrders from '@/components/servOrder/ServOrders'

Vue.use(VueRouter)

const routes = [
{
    name: 'home',
    path: '',
    component: Home
}
,
{
    name: 'auth',
    path: '/auth',
    component: Auth
}
,
{
    name: 'clients',
    path: '/clients',
    component: Clients
}
,
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}
, 
{
    name: 'services',
    path: '/services',
    component: Services
}
, 
{
    name: 'servOrders',
    path: '/servOrders',
    component: ServOrders
}
, 
{
    name: 'budgets',
    path: '/budgets',
    component: Budgets
}
]

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve( savedPosition )
            }, 500)
          })
      } else if (to.hash) {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve( { selector: to.hash } )
            }, 500)
          })
      } else {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve( { x: 0, y: 0 } )
            }, 500)
          })
      }
    }

export default new VueRouter({
   mode: 'history',
   scrollBehavior,
   routes
})