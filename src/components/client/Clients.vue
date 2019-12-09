<template>
  <div class="my-profile">
    <PageTitle :icon="iconpage[0]" :main="titlepage[0]" :sub="subtitlepage[0]" />
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[1] }}</h4>
      </template>
      <b-card-title>
        <h5>{{ subtitlepage[1] }}</h5>
      </b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form class="form-client-edit" @reset="cancelClient">
          <input id="form-client-id" type="hidden" v-model="client.id_client" />
          <b-row>
            <b-col lg="3" md="6" sm="12">
              <b-form-group
                id="form-client-g-name"
                :label="labelpage[4]"
                label-for="input-client-name"
              >
                <b-form-input
                  id="input-client-name"
                  v-model="client.vc_name"
                  required
                  :placeholder="placeholderpage[0]"
                  size="sm"
                  v-uppercase
                />
              </b-form-group>
            </b-col>
            <b-col lg="5" md="6" sm="12">
              <b-form-group
                id="form-client-g-lastname"
                :label="labelpage[5]"
                label-for="input-client-lastname"
              >
                <b-form-input
                  id="input-client-lastname"
                  v-model="client.vc_lastname"
                  required
                  :placeholder="placeholderpage[1]"
                  v-uppercase
                  size="sm"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4" md="12" sm="12">
              <b-form-group
                id="form-client-g-birthday-day"
                :label="labelpage[7]"
                label-for="input-client-birthday-day"
              >
                <b-row>
                  <b-col lg="5" md="5" sm="12">
                    <b-form-input
                      class="mb-2"
                      id="input-client-birthday-day"
                      v-model="birthdayDay"
                      required
                      :placeholder="placeholderpage[3]"
                      type="number"
                      v-min="1"
                      v-max="31"
                      size="sm"
                    />
                  </b-col>
                  <div class="d-none d-sm-none d-md-block mt-1 mr-2 ml-2">
                    <h5>/</h5>
                  </div>
                  <b-col lg="6" md="6" sm="12">
                    <b-form-group
                      id="form-client-g-birthday-month"
                      label-for="input-client-birthday-month"
                    >
                      <b-form-input
                        id="input-client-birthday-month"
                        v-model="birthdayMonth"
                        required
                        :placeholder="placeholderpage[4]"
                        type="number"
                        v-min="1"
                        v-max="12"
                        size="sm"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3" md="4" sm="12">
              <b-form-group
                id="form-client-g-ss-code"
                :label="labelpage[8]"
                label-for="input-client-ss-code"
              >
                <b-form-input
                  id="input-client-ss-code"
                  v-model="client.nu_social_security_code"
                  required
                  :placeholder="placeholderpage[5]"
                  v-mask="'###.###.###-##'"
                  size="sm"
                />
              </b-form-group>
            </b-col>
            <b-col lg="5" md="7" sm="12">
              <b-form-group
                id="form-client-g-c-area"
                :label="labelpage[9]"
                label-for="input-client-c-area"
              >
                <b-row>
                  <b-col lg="3" md="4" sm="4" class="mb-2">
                    <b-form-input
                      id="input-client-c-area"
                      v-model="client.nu_code_area"
                      required
                      :placeholder="placeholderpage[6]"
                      v-mask="'(##)'"
                      size="sm"
                    />
                  </b-col>
                  <b-col lg="9" md="12" sm="12">
                    <b-form-group id="form-client-g-c-mobile" label-for="input-client-c-mobile">
                      <b-form-input
                        id="input-client-c-mobile"
                        v-model="client.nu_mobile"
                        required
                        :placeholder="placeholderpage[7]"
                        v-mask="'# ####-####'"
                        size="sm"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col lg="4" md="4" sm="12">
              <b-form-group
                id="form-client-g-lastname"
                :label="labelpage[10]"
                label-for="input-client-indication"
              >
                <b-form-input
                  id="input-client-indication"
                  v-model="client.vc_contact"
                  :placeholder="placeholderpage[8]"
                  v-uppercase
                  size="sm"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="8" md="8" sm="12">
              <b-form-group
                id="form-client-g-email"
                :label="labelpage[6]"
                label-for="input-client-email"
              >
                <b-form-input
                  id="input-client-email"
                  v-model="client.vc_email"
                  type="email"
                  required
                  :placeholder="placeholderpage[2]"
                  size="sm"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="form-client-g-zcode"
                :label="labelpage[11]"
                label-for="input-client-zcode"
              >
                <b-input-group>
                  <b-form-input 
                    id="input-client-zcode"
                    v-model="client.nu_zip_code"
                    type="text"
                    required
                    :placeholder="placeholderpage[9]"
                    v-mask="'#####-###'"
                    class="inp-z-code"
                    size="sm"
                  />
                  <b-button 
                    :class="`b-zip-code ${visible ? 'visible' : 'collapsed' }`"
                    :aria-expanded="visible ? 'true': 'false'"
                    aria-controls="address-collapse"
                    @click="getZipCode" size="sm">
                    <i :class="iconpage[4]"></i>
                  </b-button>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-collapse id="address-collapse" v-model="visible">
            <b-row>
              <b-col lg="8" md="8" sm="12">
                <b-form-group
                  id="form-client-g-address"
                  :label="labelpage[12]"
                  label-for="input-client-address"
                >
                  <b-form-input
                    id="input-client-address"
                    v-model="client.vc_address"
                    type="text"
                    required
                    :placeholder="placeholderpage[10]"
                    v-uppercase
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="1" md="2" sm="6">
                <b-form-group
                  id="form-client-g-a-number"
                  :label="labelpage[13]"
                  label-for="input-client-a-number"
                >
                  <b-form-input
                    id="input-client-a-number"
                    v-model="client.vc_address_number"
                    type="text"
                    required
                    v-uppercase
                    :placeholder="placeholderpage[11]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3" md="3" sm="6">
                <b-form-group
                  id="form-client-g-a-compl"
                  :label="labelpage[17]"
                  label-for="input-client-a-compl"
                >
                  <b-form-input
                    id="input-client-a-compl"
                    v-model="client.vc_address_complement"
                    type="text"
                    required
                    v-uppercase
                    :placeholder="placeholderpage[15]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group
                  id="form-client-g-district"
                  :label="labelpage[14]"
                  label-for="input-client-district"
                >
                  <b-form-input
                    id="input-client-district"
                    v-model="client.vc_district"
                    type="text"
                    required
                    v-uppercase
                    :placeholder="placeholderpage[12]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group
                  id="form-client-g-city"
                  :label="labelpage[15]"
                  label-for="input-client-city"
                >
                  <b-form-input
                    id="input-client-city"
                    v-model="client.vc_city"
                    type="text"
                    required
                    v-uppercase
                    :placeholder="placeholderpage[13]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group
                  id="form-client-g-state"
                  :label="labelpage[16]"
                  label-for="input-client-state"
                >
                  <b-form-input
                    id="input-client-state"
                    v-model="client.vc_state"
                    type="text"
                    required
                    v-uppercase
                    :placeholder="placeholderpage[14]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-collapse>
          <b-row>
            <b-col class="mb-3">
              <b-form-checkbox
                id="form-client-g-promotion"
                v-model="client.bo_promotion"
                name="client-promotion"
                :value="true"
                :unchecked-value="false"
                size="sm"
              >{{ labelpage[18] }}</b-form-checkbox>
            </b-col>
          </b-row>
           <b-row>
            <b-col>
              <div class="btn-group">
                <div id="btnl-save" v-if="mode === 'save'">
                  <b-button class="btn btnl-action btnl-save-stlyle" type="submit" size="sm">
                    <i :class="iconpage[1]"></i>
                    <span style="color: #fff;">{{ labelpage[23] }}</span>
                  </b-button>
                </div>
                <div id="btnl-remove" v-if="mode === 'remove'">
                  <b-button class="btn btnl-action btnl-remove-stlyle" size="sm">
                    <i :class="iconpage[3]"></i>
                    <span style="color: #fff;">{{ labelpage[2] }}</span>
                  </b-button>
                </div>
                <div id="btnl-cancel">
                  <b-button class="btn ml-2 btnl-action btnl-cancel-stlyle" size="sm" type="reset">
                    <i :class="iconpage[2]"></i>
                    <span style="color: #fff;">{{ labelpage[24] }}</span>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-form>
        <hr />
        <b-table
          sticky-header="stickyHeader"
          :no-border-collapse="true"
          hover
          outlined
          striped
          :items="clients"
          :fields="fields"
          responsive
          small="small"
        >
          <template v-slot:cell(actions)="data">
            <b-button variant="warning" @click="loadClient(data.item)" class="mr-2 mt-1">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadClient(data.item, 'remove')" class="mr-2 mt-1">
              <i class="fa fa-trash"></i>
            </b-button>
          </template>
        </b-table>
      </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
    </b-card>
  </div>
</template>
<script>
import PageTitle from "@/components/template/PageTitle";
// eslint-disable-next-line
import { baseApiUrl, tolken, showError, showSuccess } from "@/global";
import defLang from "@/config/factory/defLang";
import axios from "axios";
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
  name: "Clientes",
  components: { PageTitle },
  computed: {
    changeLang() {
      return this.$store.state.dLang;
    },
  },
  data() {
    return {
      lang: null,
      renderComponent: true,
      mode: "save",
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
      obj: [],
      birthdayDay: null,
      birthdayMonth: null,
      enableaddress: true,
      visible: false,
      fields: [
        { key: "fullname", label: "Name", sortable: true },
        { key: "vc_email", label: "E-mail", sortable: true },
        { key: "mobile", label: "Mobile", sortable: true },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    loadClients() {
      const url = `${baseApiUrl}/api/clients`;
      // const url = `${baseApiUrl}/api/clients?page=${this.page}&limit=${this.limit}`;
      axios.get(url, myHeader).then(res => {
        // console.log(res.data)
        this.clients = res.data;
        this.joinData(res.data);
        // this.count = res.data.count
        // this.fullName(res.data.rows)
      })
    },
    getZipCode() {
      const zc = `${this.client.nu_zip_code}`.replace(/()-/g,'')
      const url = `${baseApiUrl}/api/zipcode?zipcode=${zc}`;
      axios.get(url, myHeader)
        .then(res => {
            document.getElementById("input-client-address").value = res.data[0].vc_address
            document.getElementById("input-client-district").value = res.data[0].vc_district
            document.getElementById("input-client-city").value = res.data[0].vc_city
            document.getElementById("input-client-state").value = res.data[0].vc_state
            document.getElementById("input-client-a-compl").value = ""
            document.getElementById("input-client-a-number").value = ""
            this.client.vc_address = res.data[0].vc_address
            this.client.vc_district = res.data[0].vc_district
            this.client.vc_city = res.data[0].vc_city
            this.client.vc_state = res.data[0].vc_state
            this.enableaddress = false
            this.visible = true 
            showSuccess( this.descriptionpage[2] )    
          })
        .catch(() => {
            this.enableaddress = false   
            return showError('Zip code not found!')
            });
    },
    joinData(clients) {
      function mtel(v) {
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        return v;
      }
      for (var i in clients) {
        this.clients[
          i
        ].fullname = `${clients[i].vc_name} ${clients[i].vc_lastname}`;
        this.clients[i].mobile = mtel(
          `${clients[i].nu_code_area}${clients[i].nu_mobile}`
        );
      }
    },
    fUppercase(e, obj, prop) {
      const i = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(obj, prop, e.target.value);
      e.target.setSelectionRange(i, i);
    },
    loadClient(client, mode = "save") {
      this.mode = mode;
      this.client = { ...client };
    },
    cancelClient(){
      this.mode = 'save'
      this.loadClient()
    },
  },
  mounted() {
    this.$store.state.isMenuVisible = false
    this.lang = this.$store.state.dLang;
    this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
    this.titlepage = this.obj.title;
    this.subtitlepage = this.obj.subtitle;
    this.descriptionpage = this.obj.description;
    this.labelpage = this.obj.label;
    this.placeholderpage = this.obj.placeholder;
    this.iconpage = this.obj.icon;
    this.loadClients();
  },
  watch: {
    changeLang() {
      this.lang = this.$store.state.dLang;
      this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
      this.titlepage = this.obj.title;
      this.subtitlepage = this.obj.subtitle;
      this.descriptionpage = this.obj.description;
      this.labelpage = this.obj.label;
      this.placeholderpage = this.obj.placeholder;
      this.iconpage = this.obj.icon;
    },
  }
};
</script>
<style>

.inp-z-code{
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.b-zip-code {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.b-zip-code:hover {
  color: rgb(13, 26, 56);
  background-color: #a1cbf8;
  border-color: #9ec4ee;
}
</style>