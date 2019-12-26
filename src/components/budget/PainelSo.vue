<template>
  <div class="modal-budget-reg-so">
    <b-modal
      id="modal-service-owner"
      ref="modal"
      :title="titlepage[0]"
      @show="resetOwn"
      @hidden="resetOwn"
      @ok="handleOk"
    >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <div class="mb-3">{{ subtitlepage[0] }}</div>
      <b-form-group
        :state="ownState"
        :label="labelpage[0]"
        label-for="option-owner"
        invalid-feedback="Responsável é requerido!"
      >
        <b-form-select
         id="option-owner"
          v-model="ownerId"
          :state="ownState"
          required
        >
        <option :value="null" disabled>Selecione</option>
        <option v-for="(owner, i) in users" :key="i" :value="owner.id_user">{{ owner.vc_name }} {{owner.vc_lastname}}</option>
        </b-form-select>

      </b-form-group>
     </b-form>
     <hr>
     <template v-slot:modal-footer="{ ok, cancel }">
      <b-button variant="secondary" @click="cancel()"><i class="fa fa-reply mr-2"/>{{labelpage[1]}}</b-button>
      <b-button variant="success" @click="ok()"><i class="fa fa-shopping-cart mr-2"/>{{labelpage[2]}}</b-button>
     </template>
    </b-modal>
  </div>
</template>
<script>
import { baseApiUrl, showError, showSuccess } from "@/global";
import defLang from "@/config/factory/defLang";
import axios from "axios";
export default {
  name: "PainelSo",
  props: [ 'users', 'budget' ],
  computed: {
    currUser() {
        return this.$store.state.user.id;
    },
    usrToken(){
        return this.$store.state.token;
    },
    changeLang() {
        return this.$store.state.dLang;
    }
  },
  data() {
    return {
      lang: null,
      titlepage: "",
      subtitlepage: "",
      labelpage: "",
      pagename: "PainelSo",
      codename: "BUDGET02",
      ownerName: "",
      ownerId: null,
      ownState: null,
      servOrder: {},
      obj: [],
    }
  },
  methods: {
    checkFormOwn() {
      const valid = this.$refs.form.checkValidity()
      this.ownState = valid ? true : false
      return valid
    },
    resetOwn() {
      this.ownerId = null
      this.ownState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormOwn()) return
      this.servOrder.id_client =  this.budget.id_client
      this.servOrder.id_user =  this.currUser
      this.servOrder.id_service_owner =  this.ownerId
      this.servOrder.id_budget =  this.budget.id_budget
      this.servOrder.nu_vservice =  this.total()
      this.openSo(this.servOrder)
      this.$nextTick(()=>{
        this.$refs.modal.hide()
        this.$router.push({ path: "/servOrders"})
      })
    },
    total() {
      let soma = 0
      for (var i in this.budget.js_budget_service) {
          soma = soma + this.budget.js_budget_service[i].val;
      }
      return soma
    },
      openSo(os) {
      const method = 'post'
      const pathCall = '/api/servOrder'
      const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
      const pathRoute = baseApiUrl + pathCall + query
      const config = {
          method: method,
          url: pathRoute,
          headers: { authorization: this.usrToken },
          data: os
      }
      axios(config, os)
          .then( res => {
              showSuccess(res.data.info)  
              }
          )
          .catch(showError)
      }
  },
  created(){
    this.lang = this.$store.state.dLang;
    this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
    this.titlepage = this.obj.title;
    this.subtitlepage = this.obj.subtitle;
    this.labelpage = this.obj.label;
  },
  watch: {
    changeLang() {
      this.lang = this.$store.state.dLang;
      this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
      this.titlepage = this.obj.title;
      this.subtitlepage = this.obj.subtitle;
      this.labelpage = this.obj.label;
    }
  }
}
</script>

<style>
</style>