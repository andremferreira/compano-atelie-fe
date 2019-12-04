import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Services from '@/components/service/Services'
import Clients from '@/components/client/Clients'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'clients',
    path: '/clients',
    component: Clients
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    name: 'services',
    path: '/services',
    component: Services
}]

export default new VueRouter({
   mode: 'history',
   routes 
})