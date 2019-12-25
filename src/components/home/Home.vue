<template>
  <div class="home">
    <div class="service-menu-box" v-if="!this.$store.state.isMenuVisible">
      <PageTitle :icon="iconpage[0]" :main="titlepage[0]"
              :sub="subtitlepage[0]" />
      <div class="service-menu">
          <ServiceMenu v-for="(s,i) in labelpage" :key="i" :title="labelpage[i]" :path="subpath[i]" 
            :icon="subicon[i]" :color="subiconcolor[i]" />
      </div>
    </div>
    <PageTitle :icon="iconpage[1]" :main="titlepage[1]"
            :sub="subtitlepage[1]"/>
    <div class="stats">
        <Stat :title="labelpage[0]" :value="clients.count" :icon="subicon[0]" :color="subiconcolor[0]"/>
        <Stat :title="labelpage[1]" :value="budgets.count" :icon="subicon[1]" :color="subiconcolor[1]" />
        <Stat :title="labelpage[2]" :value="servOrders.count" :icon="subicon[2]" :color="subiconcolor[2]" /> 
        <Stat :title="labelpage[3]" :value="services.count" :icon="subicon[3]" :color="subiconcolor[3]" /> 
        <Stat :title="labelpage[4]" :value="users.count" :icon="subicon[4]" :color="subiconcolor[4]" />
    </div>
  </div>
</template>
<script>
import PageTitle from '@/components/template/PageTitle'
import Stat from './Stat'
import ServiceMenu from './ServiceMenu'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import defLang from "@/config/factory/defLang";
export default {
    name: 'Home',
    components: { PageTitle, Stat, ServiceMenu },
    computed: {
      changeLang() {
        return this.$store.state.dLang;
      },
      usrToken(){
        return this.$store.state.token;
      }
    },
    data: function() {
      return {
        lang: null,
        clients: { count: 0 },
        budgets: { count: 0 },
        services:{ count: 0 },
        servOrders:{ count: 0 },
        users:{ count: 0 },
        iconpage: [],
        subicon: [],
        subiconcolor:[],
        subpath: [],
        pagename: "Home",
        codename: "HOMEIN01",
        titlepage: [],
        subtitlepage: [],
        descriptionpage: [],
        labelpage: [],
        placeholderpage: [],
        obj: [],
        serviceMenu: [ 
          { title: 'Clientes', path: '/clients', icon: 'fa fa-address-book-o', color: 'dodgerblue'},
          { title: 'Orçamentos',  path: '/budgets', icon: 'fa fa-pencil', color: 'seagreen' },
          { title: 'Ordem de Serviços',  path: '/servOrders', icon: 'fa fa-handshake-o', color: 'darkorange' },
          { title: 'Seriços',  path: '/services', icon: 'fa fa-inbox', color: 'gold' }
        ],
        error:[{}]
      }
    },
    methods: {
      getClients() {
        axios.get(`${baseApiUrl}/api/clients/count`, { headers: {"authorization": this.usrToken } })
          .then(res => { 
              return this.clients = res.data }
            ).catch(e => {
              this.clients = { count: 999 }
              return this.error.push(e)
                 })
      },
      getBudgets() {
        axios.get(`${baseApiUrl}/api/budgets/count`, { headers: {"authorization": this.usrToken } })
          .then(res => this.budgets = res.data
            ).catch(e => {
              this.budgets = { count: 999 }
              return this.error.push(e)
                })
      },
      getServices() {
          axios.get(`${baseApiUrl}/api/services/count`, { headers: {"authorization": this.usrToken } })
            .then(res => this.services = res.data
                ).catch(e => {
                  this.services = { count: 999 }
                  return this.error.push(e)
                })
      },
      getUsers() {
          axios.get(`${baseApiUrl}/api/users/count`, { headers: {"authorization": this.usrToken } })
            .then(res => this.users = res.data
                ).catch(e =>{ 
                  this.users = {count: 999}
                  return this.error.push(e)
                })
      },
      getServOrders() {
         axios.get(`${baseApiUrl}/api/servOrders/count`, { headers: {"authorization": this.usrToken } })
            .then(res => this.servOrders = res.data 
               ).catch(e => {
                 this.servOrders = { count: 999 }
                 return this.error.push(e)
               })
        }
    },
    created(){
      if(this.$mq === 'xs' || this.$mq === 'sm'){
        this.$store.commit('toggleMenu', false)
      }
    },
    mounted() {
      this.lang = this.$store.state.dLang;
      this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
      this.titlepage = this.obj.title;
      this.subtitlepage = this.obj.subtitle;
      this.descriptionpage = this.obj.description;
      this.labelpage = this.obj.label;
      this.iconpage = this.obj.icon;
      this.subicon = this.obj.subicon;
      this.subiconcolor = this.obj.subiconcolor;
      this.subpath = this.obj.subpath;
      this.getClients()
      this.getUsers()
      this.getBudgets()
      this.getServices()
      this.getServOrders()
    },
      watch: {
        changeLang() {
          this.lang = this.$store.state.dLang;
          this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
          this.titlepage = this.obj.title;
          this.subtitlepage = this.obj.subtitle;
          this.descriptionpage = this.obj.description;
          this.labelpage = this.obj.label;
          this.iconpage = this.obj.icon;
          this.subicon = this.obj.subicon;
          this.subiconcolor = this.obj.subiconcolor;
          this.subpath = this.obj.subpath;
       }
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