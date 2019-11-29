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
          <div id="btn-save">
            <b-link class="btn btn-action btn-save-stlyle">
              <i :class="iconpage[0]" ></i> <span style="color: #fff;">{{ labelpage[5] }}</span>
            </b-link>
          </div>
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
import defLang from "@/config/factory/defLang"
import axios from "axios";
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
  name: "MyProfile",
  computed: {
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
      user: {},
      obj:[]
    };
  },
  methods: {
    loadMyProfile() {
      const url = `${baseApiUrl}${this.obj.path}1`;
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
    this.lang = this.$store.state.dLang;
    this.page = this.pagename;
    this.cod = this.codename;
    this.obj = defLang.langFind( this.lang, this.pagename, this.codename);
    this.titlepage = this.obj.title;
    this.subtitlepage = this.obj.subtitle ;
    this.descriptionpage = this.obj.description;
    this.labelpage = this.obj.label;
    this.placeholderpage = this.obj.placeholder;
    this.iconpage = this.obj.icon;
    this.loadMyProfile();
    //  console.log(this.objL)
  },
  watch: {
    changeLang(val, old) {
      if (val != old ) {
          this.lang = this.$store.state.dLang;
          this.obj = defLang.langFind( this.lang, this.pagename, this.codename);
          this.titlepage = this.obj.title;
          this.subtitlepage = this.obj.subtitle ;
          this.descriptionpage = this.obj.description;
          this.labelpage = this.obj.label;
          this.placeholderpage = this.obj.placeholder;
      }
    }
  }
};
</script>

<style>

#btn-save {
  display:flex;
  align-content: initial;
  position:relative;
  padding-left: 0px;
  width:135px;
  cursor:pointer;
}

.btn-action{position:relative;padding-left:44px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.btn-action :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btn-action-icon{position:relative;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:34px;width:34px}
.btn-action-icon :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btn-action-icon :first-child{border:none;text-align:center;width:100% !important}
.btn-action i.fa.fa-floppy-o { color: rgba(255,255,255,0.8); font-size: 1.2em; }
.btn-save-stlyle{color:#fff;background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
.btn-save-stlyle:hover,.btn-save-stlyle:focus,.btn-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{color:#fff;background-color:#0d70b7;border-color:rgba(0,0,0,0.2)}
.btn-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{background-image:none}
.btn-save-stlyle.disabled,.btn-save-stlyle[disabled],fieldset[disabled] .btn-save-stlyle,.btn-save-stlyle.disabled:hover,.btn-save-stlyle[disabled]:hover,fieldset[disabled] .btn-save-stlyle:hover,.btn-save-stlyle.disabled:focus,.btn-save-stlyle[disabled]:focus,fieldset[disabled] .btn-save-stlyle:focus,.btn-save-stlyle.disabled:active,.btn-save-stlyle[disabled]:active,fieldset[disabled] .btn-save-stlyle:active,.btn-save-stlyle.disabled.active,.btn-save-stlyle[disabled].active,fieldset[disabled] .btn-save-stlyle.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}

</style>