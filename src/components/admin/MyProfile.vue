<template>
  <div class="my-profile">
    <b-card >
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage }}</h4>
      </template>
      <b-card-title>{{ subtitlepage }}</b-card-title>
      <b-card-text>{{ descriptionpage[1]}}</b-card-text>
        <b-card-body>
          <b-form class="form-my-profile">
            <b-form-group
                id="form-profile-g-name"
                :label="labelpage[0]"
                label-for="input-name">
            <b-form-input
              id="input-name"
              v-model="user.vc_name"
              required
              :placeholder="placeholderpage[0]"
            />
            </b-form-group>
            <b-form-group
                id="form-profile-g-lastname"
                :label="labelpage[1]"
                label-for="input-lastname">
            <b-form-input
              id="input-lastname"
              v-model="user.vc_lastname"
              required
              :placeholder="placeholderpage[1]"
            />
            </b-form-group>
            <b-form-group
                id="form-profile-g-email"
                :label="labelpage[2]"
                label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="user.vc_email"
              required
              :placeholder="placeholderpage[2]"
            />
            </b-form-group>
            <b-form-group
                id="form-profile-g-password"
                :label="labelpage[3]"
                label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="password"
              type="password"
              required
              :placeholder="placeholderpage[3]"
            />
            </b-form-group>
            <b-form-group
                id="form-profile-g-repassword"
                :label="labelpage[4]"
                label-for="input-repassword">
            <b-form-input
              id="input-repassword"
              v-model="repassword"
              type="password"
              required
              :placeholder="placeholderpage[4]"
            />
            </b-form-group>
            <b-button variant="primary"><i class="fa fa-save" /> Save</b-button>
          </b-form>
        </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
      </b-card>
  </div>
</template>

<script>
// eslint-disable-next-line
import { baseApiUrl, tolken } from '@/global'
import axios from 'axios'
const myHeader = { headers: {"authorization": tolken }}
axios.create({ headers:{ common: { 'Authentication': tolken }}})
export default {
    name: "MyProfile",
    computed: {
      lang: {
          get () {
            return this.$store.state.langs.lang
          },
          set (valor) {
            this.$store.commit('langs/setLang', valor)
          }
        },
      page: {
          get () {
            return this.$store.state.langs.page
          },
          set (valor) {
            this.$store.commit('langs/setPage', valor)
          }
        },
      cod: {
          get () {
            return this.$store.state.langs.cod
          },
          set (valor) {
            this.$store.commit('langs/setCod', valor)
          }
        },
      objL: {
          get () {
            return this.$store.state.langs.objL
          },
          set () {
            this.$store.commit('langs/defineLang')
          }
        },        
      },
      data() {
        return {
          pagename: "MyProfile",
          codename: "MYPROF01",
          titlepage: '',
          subtitlepage: '',
          descriptionpage: [],
          labelpage: ['Name', 'Lastname', 'E-mail', 'Passord', 'Rept-Passord'],
          placeholderpage: [],
          repassword: '',
          password: '',
          user: {}
        }
      },
      methods: {
        loadMyProfile(){
          const url = `${baseApiUrl}${this.objL.path}1`
          axios.get(url, myHeader).then(res => {
            this.user = res.data
          })
        },
        // onSubmit(e){
        //   e.preventDefault()
        //   alert(JSON.stringify(this.user))
        // },
        //  onReset(e){
        //    e.preventDefault()
        //   alert('Limpar dados!')
        // }
      },
      mounted(){
       this.lang = localStorage.lang || this.$store.state.dFLang
       this.page = this.pagename
       this.cod  = this.codename
       this.objL = true
       this.loadMyProfile()
       this.titlepage = this.objL.title[0] || 'My Profile'
       this.subtitlepage = this.objL.subtitle[0] || 'Personal data management page.'
       this.descriptionpage = this.objL.description //'Form for updating and managing your personal information.'
       this.labelpage = this.objL.label
       this.placeholderpage = this.objL.placeholder
      //  console.log(this.objL)
    }
}
</script>

<style>

</style>