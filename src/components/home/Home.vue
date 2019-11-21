<template>
  <div class="home">
    <div class="service-menu-box" v-if="!this.$store.state.isMenuVisible">
      <PageTitle icon="fa fa-home" main="Menu de Serviços"
              sub="Módulo de Gerenciamento de Ordem de Serviços."/>
      <div class="service-menu">
          <ServiceMenu v-for="(s,i) in serviceMenu" :key="i" :title="serviceMenu[i].title" :path="serviceMenu[i].path" 
            :icon="serviceMenu[i].icon" :color="serviceMenu[i].color"/>
      </div>
    </div>
    <PageTitle icon="fa fa-line-chart" main="Dashboard"
            sub="Indicadores de desempenho"/>
    <div class="stats">
        <Stat title="Clientes" :value="clients.count" icon="fa fa-address-book-o" color="dodgerblue"/>
        <Stat title="Orçamentos" :value="budgets.count" icon="fa fa-pencil" color="seagreen" />
        <Stat title="Ord. Serviços" :value="servOrders.count" icon="fa fa-handshake-o" color="darkorange" /> 
        <Stat title="Serviços" :value="services.count" icon="fa fa-inbox" color="gold" /> 
        <Stat title="Usuários" :value="users.count" icon="fa fa-users" color="crimson" />
    </div>
  </div>
</template>
<script>
import PageTitle from '@/components/template/PageTitle'
import Stat from './Stat'
import ServiceMenu from './ServiceMenu'
import axios from 'axios'
import { baseApiUrl } from '@/global'
// import { baseApiLang } from '@/lang'

export default {
    name: 'Home',
    components: { PageTitle, Stat, ServiceMenu },
    data: function() {
      return {
        clients: { count: 0 },
        budgets: { count: 0 },
        services:{ count: 0 },
        servOrders:{ count: 0 },
        users:{ count: 0 },
        serviceMenu: [ 
          { title: 'Orçamentos',  path: '/budgets', icon: 'fa fa-pencil', color: 'seagreen' },
          { title: 'Ordem de Serviços',  path: '/servOrders', icon: 'fa fa-handshake-o', color: 'darkorange' },
          { title: 'Seriços',  path: '/services', icon: 'fa fa-inbox', color: 'gold' }
        ],
        error:[{}]
      }
    },
    methods: {
      getClients() {
        axios.get(`${baseApiUrl}/api/clients/count`)
          .then(res => this.clients = res.data
            ).catch(e => {
              this.clients = { count: 999 }
              return this.error.push(e)
                 })
      },
      getBudgets() {
        axios.get(`${baseApiUrl}/api/budgets/count`)
          .then(res => this.budgets = res.data
            ).catch(e => {
              this.budgets = { count: 999 }
              return this.error.push(e)
                })
      },
      getServices() {
          axios.get(`${baseApiUrl}/api/services/count`)
            .then(res => this.services = res.data
                ).catch(e => {
                  this.services = { count: 999 }
                  return this.error.push(e)
                })
      },
      getUsers() {
          axios.get(`${baseApiUrl}/api/users/count`)
            .then(res => this.users = res.data
                ).catch(e =>{ 
                  this.users = {count: 999}
                  return this.error.push(e)
                })
      },
      getServOrders() {
         axios.get(`${baseApiUrl}/api/servOrders/count`)
            .then(res => this.servOrders = res.data 
               ).catch(e => {
                 this.servOrders = { count: 999 }
                 return this.error.push(e)
               })
        }
    },
    mounted() {
      this.getClients()
      this.getUsers()
      this.getBudgets()
      this.getServices()
      this.getServOrders()
      // if (this.error.length > 0) alert("Conection error!!!")
    }
}
</script>

<style>
  .service-menu {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    padding-bottom: 20px;
    padding-left: 10px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 20px;
    padding-left: 10px;
  }

</style>