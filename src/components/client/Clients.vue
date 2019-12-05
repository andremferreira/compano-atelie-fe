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
                  style="text-transform: uppercase;"
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
                  style="text-transform: uppercase;"
                />
              </b-form-group>
            </b-col>
            <b-col lg="3" md="4" sm="12"> 
                <b-form-group id="form-client-g-birthday-day" :label="labelpage[7]" label-for="input-client-birthday-day">
                <b-row>
                    <b-col md="6" sm="6">
                        <b-form-input
                            id="input-client-birthday-day"
                            v-model="birthdayDay"
                            required
                            :placeholder="placeholderpage[2]"
                            type="number"
                         />
                    </b-col><h5 class="mt-2">/</h5>
                    <b-col md="5" sm="6">
                        <b-form-group id="form-client-g-birthday-month" label-for="input-client-birthday-month">
                            <b-form-input
                                id="input-client-birthday-month"
                                v-model="birthdayMonth"
                                required
                                :placeholder="placeholderpage[3]"
                                type="number"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>   
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
        }
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
            console.log(res.data)
            this.clients = res.data
            // this.count = res.data.count 
            // this.fullName(res.data.rows)
          })
        }
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
        }
    }
}
</script>

<style>

</style>