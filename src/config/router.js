import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Services from '@/components/service/Services'
import Clients from '@/components/client/Clients'
import Budgets from '@/components/budget/Budgets'

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
    name: 'budgets',
    path: '/budgets',
    component: Budgets
}
]

export default new VueRouter({
   mode: 'history',
   routes 
})