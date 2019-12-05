<template>
  <div class="my-profile">
    <PageTitle :icon="iconpage[0]" :main="titlepage[0]" 
     :sub="subtitlepage[0]"/>
    <b-card >
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[1] }}</h4>
      </template>
      <b-card-title><h5>{{ subtitlepage[1] }}</h5></b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form class="form-client-edit">
          <input id="form-client-id" type="hidden" v-model="client.id_client" />
          <b-row>
            <b-col lg="3" md="6" sm="12">
              <b-form-group id="form-client-g-name" :label="labelpage[4]" label-for="input-client-name">
                 <b-form-input
                  id="input-client-name"
                  v-model="client.vc_name"
                  required
                  :placeholder="placeholderpage[0]"
                />
              </b-form-group>
            </b-col>
            <b-col lg="5" md="6" sm="12">
              <b-form-group id="form-client-g-lastname" :label="labelpage[5]" label-for="input-client-lastname">
                 <b-form-input
                  id="input-client-lastname"
                  v-model="client.vc_lastname"
                  required
                  :placeholder="placeholderpage[1]"
                  v-uppercase
                />
              </b-form-group>
            </b-col>
            <b-col lg="4" md="12" sm="12"> 
                <b-form-group id="form-client-g-birthday-day" :label="labelpage[7]" label-for="input-client-birthday-day">
                <b-row>
                    <b-col lg="5" md="5" sm="12">
                        <b-form-input class="mb-2"
                            id="input-client-birthday-day"
                            v-model="birthdayDay"
                            required
                            :placeholder="placeholderpage[3]"
                            type="number"
                            v-min="1" 
                            v-max="31"
                         />
                    </b-col><div class="d-none d-sm-none d-md-block mt-2 mr-2 ml-2"><h5>/</h5></div>
                    <b-col lg="6" md="6" sm="12">
                        <b-form-group id="form-client-g-birthday-month" label-for="input-client-birthday-month">
                            <b-form-input
                                id="input-client-birthday-month"
                                v-model="birthdayMonth"
                                required
                                :placeholder="placeholderpage[4]"
                                type="number"
                                v-min="1" 
                                v-max="12"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>
                </b-form-group>   
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3" md="4" sm="12">
              <b-form-group id="form-client-g-ss-code" :label="labelpage[8]" label-for="input-client-ss-code">
                <b-form-input
                  id="input-client-ss-code"
                  v-model="client.nu_social_security_code"
                  required
                  :placeholder="placeholderpage[5]"
                  v-mask='"###.###.###-##"'
                />
              </b-form-group>
            </b-col>
             <b-col lg="5" md="7" sm="12">
              <b-form-group id="form-client-g-c-area" :label="labelpage[9]" label-for="input-client-c-area">
               <b-row>
                  <b-col lg="3" md="4" sm="4" class="mb-2"> 
                    <b-form-input
                      id="input-client-c-area"
                      v-model="client.nu_code_area"
                      required
                      :placeholder="placeholderpage[6]"
                      v-mask='"(##)"'
                    />
                  </b-col>
                  <b-col lg="9" md="12" sm="12">
                    <b-form-group id="form-client-g-c-mobile" label-for="input-client-c-mobile">
                      <b-form-input
                        id="input-client-c-mobile"
                        v-model="client.nu_mobile"
                        required
                        :placeholder="placeholderpage[7]"
                        v-mask='"# ####-####"'
                      />
                    </b-form-group>
                  </b-col>
               </b-row>
              </b-form-group>
            </b-col>
            <b-col lg="4" md="4" sm="12">
              <b-form-group id="form-client-g-lastname" :label="labelpage[10]" label-for="input-client-indication">
                 <b-form-input
                  id="input-client-indication"
                  v-model="client.vc_contact"
                  :placeholder="placeholderpage[8]"
                  v-uppercase
                />
              </b-form-group>
            </b-col>           
          </b-row>
          <b-row>
            <b-col lg="8" md="8" sm="12">
              <b-form-group id="form-client-g-email" :label="labelpage[6]" label-for="input-client-email">
                 <b-form-input
                  id="input-client-email"
                  v-model="client.vc_email"
                  type="email"
                  required
                  :placeholder="placeholderpage[2]"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4" md="4" sm="12">
              <b-form-group id="form-client-g-zcode" :label="labelpage[11]" label-for="input-client-zcode">
                 <b-form-input
                  id="input-client-zcode"
                  v-model="client.nu_zip_code"
                  type="text"
                  required
                  :placeholder="placeholderpage[9]"
                  v-mask="'#####-###'"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
    </b-card>
  </div>
</template>
<script>
import PageTitle from '@/components/template/PageTitle'
// eslint-disable-next-line
import { baseApiUrl, tolken, showError, showSuccess } from "@/global";
import defLang from "@/config/factory/defLang"
import axios from "axios";
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
    name: 'Clientes',
    components: { PageTitle },
    computed: {
        changeLang() {
          return this.$store.state.dLang;
        },
    },
    data() {
        return {
            iconpage: [],
            pagename: "Clients",
            codename: "CLIENT01",
            titlepage: [],
            subtitlepage: [],
            descriptionpage: [],
            labelpage: [],
            placeholderpage: [],
            client: {},
            clients: [],
            obj:[],
            birthdayDay: null,
            birthdayMonth: null,
        }
    },
    methods:{
        loadClients() {
        const url = `${baseApiUrl}/api/clients`;
        // const url = `${baseApiUrl}/api/clients?page=${this.page}&limit=${this.limit}`;
        axios.get(url, myHeader).then(res => {
            // console.log(res.data)
            this.clients = res.data
            // this.count = res.data.count 
            // this.fullName(res.data.rows)
          })
        },
        fUppercase(e, obj, prop) {
          const i = e.target.selectionStart;
          e.target.value = e.target.value.toUpperCase();
          this.$set(obj, prop, e.target.value);
          e.target.setSelectionRange(i, i);
        },
    },
    mounted() {
        this.lang = this.$store.state.dLang;
        this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle ;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
        this.placeholderpage = this.obj.placeholder;
        this.iconpage = this.obj.icon;
        this.loadClients()
    },
  watch: {
    changeLang() {
        this.lang = this.$store.state.dLang;
        this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle ;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
        this.placeholderpage = this.obj.placeholder;
        this.iconpage = this.obj.icon;
      },
    }
}
</script>

<style>
</style>