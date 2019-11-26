<template>
  <div class="my-profile">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[0] }}</h4>
      </template>
      <b-card-title>{{ subtitlepage[0] }}</b-card-title>
      <b-card-text>{{ descriptionpage[1] }}</b-card-text>
      <b-card-body>
        <b-form class="form-my-profile">
          <b-form-group id="form-profile-g-name" :label="labelpage[0]" label-for="input-name">
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
            label-for="input-lastname"
          >
            <b-form-input
              id="input-lastname"
              v-model="user.vc_lastname"
              required
              :placeholder="placeholderpage[1]"
            />
          </b-form-group>
          <b-form-group id="form-profile-g-email" :label="labelpage[2]" label-for="input-email">
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
            label-for="input-password"
          >
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
            label-for="input-repassword"
          >
            <b-form-input
              id="input-repassword"
              v-model="repassword"
              type="password"
              required
              :placeholder="placeholderpage[4]"
            />
          </b-form-group>
          <b-button variant="primary">
            <i :class="iconpage[0]" />  {{ labelpage[5] }}
          </b-button>
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
import { baseApiUrl, tolken } from "@/global";
import axios from "axios";
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
  name: "MyProfile",
  computed: {
    lang: {
      get() {
        return this.$store.state.langs.lang;
      },
      set(valor) {
        this.$store.commit("langs/setLang", valor);
      }
    },
    page: {
      get() {
        return this.$store.state.langs.page;
      },
      set(valor) {
        this.$store.commit("langs/setPage", valor);
      }
    },
    cod: {
      get() {
        return this.$store.state.langs.cod;
      },
      set(valor) {
        this.$store.commit("langs/setCod", valor);
      }
    },
    objL: {
      get() {
        return this.$store.state.langs.objL;
      },
      set(valor) {
        this.$store.commit("langs/defineLang", valor);
      }
    },
    changeLang() {
      return this.$store.state.dLang;
    }
  },
  data() {
    return {
      iconpage: [],
      pagename: "MyProfile",
      codename: "MYPROF01",
      titlepage: "",
      subtitlepage: "",
      descriptionpage: [],
      labelpage: ["Name", "Lastname", "E-mail", "Passord", "Rept-Passord"],
      placeholderpage: [],
      repassword: "",
      password: "",
      user: {}
    };
  },
  methods: {
    loadMyProfile() {
      const url = `${baseApiUrl}${this.objL.path}1`;
      axios.get(url, myHeader).then(res => {
        this.user = res.data;
      });
    }
    // onSubmit(e){
    //   e.preventDefault()
    //   alert(JSON.stringify(this.user))
    // },
    //  onReset(e){
    //    e.preventDefault()
    //   alert('Limpar dados!')
    // }
  },
  mounted() {
    this.lang = this.changeLang || localStorage.lang;
    this.page = this.pagename;
    this.cod = this.codename;
    this.objL = this.$store.state.dLang;
    this.loadMyProfile();
    this.titlepage = this.objL.title;
    this.subtitlepage = this.objL.subtitle ;
    this.descriptionpage = this.objL.description;
    this.labelpage = this.objL.label;
    this.placeholderpage = this.objL.placeholder;
    this.iconpage = this.objL.icon;
    //  console.log(this.objL)
  },
  watch: {
    changeLang(val, old) {
      if (val != old ) {
        this.objL = this.$store.state.dLang;
          this.titlepage = this.objL.title;
          this.subtitlepage = this.objL.subtitle ;
          this.descriptionpage = this.objL.description; //'Form for updating and managing your personal information.'
          this.labelpage = this.objL.label;
          this.placeholderpage = this.objL.placeholder;
      }
    }
  }
};
</script>

<style>
</style>