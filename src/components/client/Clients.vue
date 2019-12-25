<template>
  <div class="client">
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
        <b-form id="form-client" class="form-client-edit" 
        v-on:keyup="checkForm"
        v-on:keydown.enter.prevent="saveClient"
        @submit.prevent="saveClient" @reset.prevent="cancelClient">
          <input id="form-client-id" type="hidden" v-model="client.id_client" />
          <b-row>
            <b-col lg="3" md="6" sm="12" v-if="mode !== 'remove'">
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
            <b-col lg="6" md="6" sm="12" v-else>
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
            <b-col lg="5" md="6" sm="12" v-if="mode !== 'remove'">
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
            <b-col lg="6" md="6" sm="12" v-else>
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
            <b-col lg="4" md="12" sm="12"  v-show="mode !== 'remove'">
              <b-form-group
                id="form-client-g-birthday-day"
                :label="labelpage[7]"
                label-for="input-client-birthday-day"
              >
                <b-form-input
                      class="mb-2"
                      id="input-client-birthday-day"
                      v-model="client.vc_birthday"
                      required
                      :placeholder="placeholderpage[3] +'/'+ placeholderpage[4]"
                      type="text"
                      v-mask="'##/##'"
                      size="sm"
                    />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-show="mode !== 'remove'">
            <b-col lg="3" md="4" sm="12">
              <b-form-group
                id="form-client-g-ss-code"
                :label="labelpage[8]"
                label-for="input-client-ss-code"
              >
                <b-form-input
                  id="input-client-ss-code"
                  v-model="client.vc_social_security_code"
                  required
                  :placeholder="placeholderpage[5]"
                  v-mask="'###.###.###-##'"
                  size="sm"
                />
              </b-form-group>
            </b-col >
            <b-col lg="5" md="7" sm="12" >
              <b-form-group
                id="form-client-g-c-area"
                :label="labelpage[9]"
                label-for="input-client-c-area"
              >
                <b-row>
                  <b-col lg="3" md="4" sm="4" class="mb-2">
                    <b-form-input
                      id="input-client-c-area"
                      v-model="client.vc_code_area"
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
                        v-model="client.vc_mobile"
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
            <b-col lg="4" md="4" sm="12"  v-show="mode !== 'remove'">
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
                  v-restrict.alpha
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="8" md="8" sm="12" v-if="mode !== 'remove'">
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
            <b-col lg="12" md="12" sm="12" v-else>
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
            <b-col  v-show="mode !== 'remove'">
              <b-form-group
                id="form-client-g-zcode"
                :label="labelpage[11]"
                label-for="input-client-zcode"
              >
                <b-input-group>
                  <b-form-input 
                    id="input-client-zcode"
                    v-model="client.vc_zip_code"
                    type="text"
                    required
                    :placeholder="placeholderpage[9]"
                    v-mask="'#####-###'"
                    class="inp-z-code"
                    size="sm"
                    v-on:keyup.enter.prevent="getZipCode"
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
          <b-collapse id="address-collapse"  v-show="mode !== 'remove'" v-model="visible">
            <b-row  v-show="mode !== 'remove'">
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
              <b-col lg="1" md="2" sm="6"  v-show="mode !== 'remove'">
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
                    :placeholder="placeholderpage[11]"
                    :disabled="enableaddress"
                    size="sm"
                    v-restrict.number
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3" md="3" sm="6"  v-show="mode !== 'remove'">
                <b-form-group
                  id="form-client-g-a-compl"
                  :label="labelpage[17]"
                  label-for="input-client-a-compl"
                >
                  <b-form-input
                    id="input-client-a-compl"
                    v-model="client.vc_address_complement"
                    type="text"
                    v-uppercase
                    :placeholder="placeholderpage[15]"
                    :disabled="enableaddress"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" md="4" sm="12"  v-show="mode !== 'remove'">
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
                     v-restrict.alpha
                  />
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12"  v-show="mode !== 'remove'">
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
                    v-restrict.alpha
                  />
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12"  v-show="mode !== 'remove'">
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
                    v-restrict.alpha
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-collapse>
          <b-row>
            <b-col class="mb-3"  v-show="mode !== 'remove'">
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
              <b-alert show variant="danger" v-if="showErrors">
                <div>
                  <b-row>
                    <b-col lg="1" md="1" sm="1">
                      <div class="error-title-icon"><h2><b><i class="fa fa-exclamation-circle"></i></b></h2></div>
                    </b-col>
                    <b-col lg="11" md="11" sm="11">
                      <ul>
                        <li v-for="erro in this.errors" :key="erro">
                        {{errorslist[erro]}}
                        </li>
                      </ul>
                    </b-col>
                  </b-row>
                </div>
                </b-alert>
            </b-col>
          </b-row>
           <b-row>
            <b-col>
              <div class="btn-group" >
                <div id="btnl-save" v-if="mode === 'save'">
                  <b-button class="btn btnl-action btnl-save-stlyle" v-on:keyup.enter="submit" type="submit" size="sm">
                    <i :class="iconpage[1]"></i>
                    <span style="color: #fff;">{{ labelpage[23] }}</span>
                  </b-button>
                </div>
                <div id="btnl-remove" v-if="mode === 'remove'">
                  <b-button class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete" size="sm">
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
        <b-form id="form-search-client-table" class="search-client" @submit.prevent="loadClientsWithFilter">
          <b-row>
              <span class="ml-3 pt-1">{{labelpage[4]}}:</span>
                <b-col lg="3" md="3" sm="12">
                  <b-form-input
                    type="text"
                    size="sm"
                    v-model="searchname"
                    v-uppercase
                  >
                  </b-form-input>
              </b-col>
              <span class="ml-3 pt-1" >{{labelpage[5]}}:</span>
              <b-col lg="5" md="5" sm="12">
                  <b-form-input
                    type="text"
                    size="sm"
                    v-model="searchlastname"
                    v-uppercase
                  >
                  </b-form-input>
              </b-col>
              <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-none d-md-block' : 'btn btnl-action btnl-remove-stlyle d-none d-md-block'" 
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[27]}}</span>
              </b-button>
              <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-block d-md-none mt-2 ml-3' : 'btn btnl-action btnl-remove-stlyle d-block d-md-none mt-2 ml-3'"  
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[27]}}</span>
              </b-button>
          </b-row>
        </b-form>
        <b-table
          sticky-header="stickyHeader"
          :no-border-collapse="true"
          outlined
          striped
          :items="filterClients"
          :fields="fields"
          small="small"
          responsive="true"
          class="mt-3"
          :busy="tbIsBusy"
        >
          <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong class="ml-3">Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button variant="warning" @click="loadClient(data.item)" class="mr-2 mt-1">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadClient(data.item, 'remove')" class="mr-2 mt-1">
              <i class="fa fa-trash"></i>
            </b-button>
          </template>
        </b-table>
          <div class="paginator-box">
            <b-pagination @click="loadClients" class="mt-3" v-model="page" :total-rows="count" size="sm" :per-page="limit" />
            <b-dropdown split :text="`${limit}`" variant="primary" class="ml-2" size="sm" >
              <b-dropdown-item @click="limit=limit">{{limit}}</b-dropdown-item>
              <b-dropdown-item @click="limit=limit*2">{{limit * 2}}</b-dropdown-item>
              <b-dropdown-item @click="limit=limit*4">{{limit * 4}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-card-body>
      <template v-slot:footer>
        <em>
        </em>
      </template>
    </b-card>
  </div>
</template>
<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError, showWarning, showSuccess } from "@/global";
import defLang from "@/config/factory/defLang";
import axios from "axios";
export default {
  name: "Clients",
  components: { PageTitle },
  computed: {
    changeLang() {
      return this.$store.state.dLang;
    },
    usrToken(){
        return this.$store.state.token;
    },
    currUser(){
      return this.$store.state.user.id;
    },
    currProfile(){
      return this.$store.state.user.profile;
    },
    filterClients(){
      return this.clients.filter((client) => {
        return client.fullname.match(this.searchFields)
      })
    },
    searchFields(){
      const spa = !this.searchlastname ? '' : ' '
      return this.searchname + spa + this.searchlastname
    },
    searchReqQuery(){
      let strValue = ''
      if (!this.searchname && this.searchlastname) {
         strValue = `&lastname=%${this.searchlastname}%`
      } else if (this.searchname && !this.searchlastname) {
         strValue = `&name=%${this.searchname}%`
      } else if (this.searchname && this.searchlastname) {
         strValue = `&name=%${this.searchname}%&lastname=%${this.searchlastname}%`
      }
      return strValue
    },
    formErr(){
      if (this.showError){
        return this.checkForm()
      }
    },
    clientChange() {
      return this.client
    }
  },
  data() {
    return {
      page: 1,
      limit: 5,
      count: 0,
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
      clientF: {},
      clients: [],
      obj: [],
      birthdayDay: null,
      birthdayMonth: null,
      enableaddress: true,
      visible: false,
      fields: [
        { key: "actions", label: "Actions" },
        { key: "fullname", label: "Name", sortable: true },
        { key: "mobile", label: "Mobile", sortable: true },
        
      ],
      showErrors:false,
      erros:[],
      errorslist:[],
      searchname:'',
      searchlastname:'',
      searchToggle:false,
      tbIsBusy:false,
      startLoad:false,
      strQuery:''
    };
  },
  methods: {
    loadClients() {
      this.toggleBusy();
      const url = `${baseApiUrl}/api/clients?page=${this.page}&limit=${this.limit}${this.strQuery}`;
      axios.get(url, { headers: { authorization: this.usrToken } })
        .then(res => {
          this.clients = res.data.rows;
          this.count = res.data.count;
          this.joinData(res.data.rows);
          this.toggleBusy();
        })
        .catch(() => {
          this.toggleBusy();
          return showError;
          });
    },
    loadClientsWithFilter(){
      if (this.searchname || this.searchlastname ) {
        this.startLoad = !this.startLoad
        if (this.searchToggle) {
          this.searchToggle=!this.searchToggle
          this.searchname = ''
          this.searchlastname = ''
          this.strQuery = this.searchReqQuery
          this.loadClients()
        } else{ 
          this.searchToggle=!this.searchToggle
          this.strQuery = this.searchReqQuery
          this.loadClients()
        }
      }
    }
    ,
    saveClient(){
      this.showErrors = false
      var errors = this.checkForm()
      if(!errors){
        const method = this.client.id_client ? 'put' : 'post'
        const pathCall = this.client.id_client ? `/api/client/id/${this.client.id_client}` : `/api/client`
        const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
        const pathRoute = baseApiUrl + pathCall + query
        const config = {
          method: method,
          url: pathRoute,
          headers: { authorization: this.usrToken },
          data: this.client
        }
          axios(config, this.client)
            .then( res => {
              showSuccess(res.data.info)  
              this.cancelClient()
              }
            )
            .catch(showError)
      } else {
        this.showErrors = true
      }
    },
      validCpf(cpf)  {	
        if (!cpf) return
        cpf = cpf.replace(/[^\d]+/g,'');	
        if(cpf == '') return false;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 || 
          cpf == "00000000000" || 
          cpf == "11111111111" || 
          cpf == "22222222222" || 
          cpf == "33333333333" || 
          cpf == "44444444444" || 
          cpf == "55555555555" || 
          cpf == "66666666666" || 
          cpf == "77777777777" || 
          cpf == "88888888888" || 
          cpf == "99999999999")
            return false;		
        // Valida 1o digito	
        var add = 0;	
        var rev;
        var i;
        for (i=0; i < 9; i ++)		
          add += parseInt(cpf.charAt(i)) * (10 - i);	
          rev = 11 - (add % 11);	
          if (rev == 10 || rev == 11)		
            rev = 0;	
          if (rev != parseInt(cpf.charAt(9)))		
            return false;		
        // Valida 2o digito	
        add = 0;	
        for (i = 0; i < 10; i ++)		
          add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
          rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
          return false;		
        return true;   
      }
    ,
    checkForm(){
      this.errors = []
      if (!this.client.vc_name ) this.errors.push(0)
      if (`${this.client.vc_name}`.length < 3 ) this.errors.push(1)
      if (!this.client.vc_lastname ) this.errors.push(2)
      if (`${this.client.vc_lastname}`.length < 5 ) this.errors.push(3)
      if (!this.client.vc_email ) {
          this.errors.push(4)
        } else if (!this.validEmail(this.client.vc_email)) {
          this.errors.push(5)
        }
      if(this.client.vc_birthday && !this.validBirthday(this.client.vc_birthday) ) this.errors.push(6)
      if(!this.validZipCod(this.client.vc_zip_code)) this.errors.push(7)
      if(!this.client.vc_address ) this.errors.push(8)
      if(!this.client.vc_address_number ) this.errors.push(9)
      if(!this.client.vc_district ) this.errors.push(10)
      if(!this.client.vc_city ) this.errors.push(11)
      if(!this.client.vc_state ) this.errors.push(12)
      if(!this.validCpf(this.client.vc_social_security_code)) this.errors.push(13)
      if(this.errors.length){
        return true
      } else {
        this.showErrors = false
        return false
      }
    },
     validEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email);
    },
     validBirthday(birthday) {
       // not accept 29/02 !
       birthday = birthday + '/2019'
       // eslint-disable-next-line
       var re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
       return re.test(birthday)
     },
      validZipCod(zipcode){
        const re = /^[0-9]{5}(?:-[0-9]{3})$/
        return re.test(zipcode)
      }
    ,
    showZipCode(){
      this.visible = this.client.vc_zip_code ? true : false
      this.enableaddress = this.client.vc_zip_code ? false : true
    },
    getZipCode() {
      const zc = `${this.client.vc_zip_code}`.replace(/\D/g,'')
      const url = `${baseApiUrl}/api/zipcode?zipcode=${zc}`;
      this.$store.state.loading = true
      axios.get(url, { headers: { authorization: this.usrToken } })
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
            this.$store.state.loading = false
            showSuccess( this.descriptionpage[2] )
          })
        .catch(() => {
            this.enableaddress = false
            this.visible = true
            this.$store.state.loading = false
            return showWarning(this.descriptionpage[3])
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
        this.clients[i].fullname = `${clients[i].vc_name} ${clients[i].vc_lastname}`;
        this.clients[i].mobile = mtel(`${clients[i].vc_code_area}${clients[i].vc_mobile}`);
      }
    },
    fUppercase(e, obj, prop) {
      const i = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(obj, prop, e.target.value);
      e.target.setSelectionRange(i, i);
    },
    loadClient(client, mode = "save") {
      let re = []
      re.push({index:[5], value:['-']}) //zipcode
      re.push({index:[5], value:['-']}) //mobile
      re.push({index:[3,6,9], value:['.','.','-']}) //CPF
      this.mode = mode;
      var zipcode = this.insertStrMask(`${client.vc_zip_code}`,re[0].index, re[0].value )
      var mobile = this.insertStrMask(`${client.vc_mobile}`,re[1].index, re[1].value )
      var ssc =  this.insertStrMask(`${client.vc_social_security_code}`,re[2].index, re[2].value )
      this.client = { 
        id_client: client.id_client,
        vc_name: client.vc_name,
        vc_lastname: client.vc_lastname,
        vc_code_area: `(${client.vc_code_area})`,
        vc_zip_code: zipcode,
        vc_mobile: mobile,
        vc_email: client.vc_email,
        vc_address: client.vc_address,
        vc_address_complement: client.vc_address_complement,
        vc_address_number: client.vc_address_number,
        vc_birthday: client.vc_birthday,
        vc_contact: client.vc_contact,
        vc_district: client.vc_district,
        vc_city: client.vc_city,
        vc_state: client.vc_state,
        vc_social_security_code: ssc
      }
      this.showZipCode()
    },
    cancelClient(){
      this.mode = 'save'
      this.erros = []
      this.showErrors = false
      this.client = {}
      this.clientF = {}
      this.loadClients()
      this.showZipCode()
    },
    insertStrMask(str, ix, v) {
    let strRpl = ''
    var li = ix.length -1
    var l = str.length
    var iv = 0
    for ( var i=0; i <= li; i++ ){
      if (i == 0 && li > 0) {
        strRpl = str.substr(i, ix[i]) + v[i]
        iv = ix[i]
      } else if ( i == 0 && li == 0) {
        strRpl = str.substr(i, ix[i]) + v[i] + str.substr(ix[i]);
        iv = ix[i]
      } else if ( i < li && i > 0 ){
        strRpl = strRpl + str.substr(iv, ix[i]-iv) + v[i]
        iv = ix[i]
      } else {
        strRpl = strRpl + str.substr(iv, ix[i]-iv) + v[i] + str.substr(ix[i], l - ix[i]) 
      }
    }
    return strRpl;
  },
  showModalDelete(){
        this.$bvModal.msgBoxConfirm(this.descriptionpage[1], {
          title: this.subtitlepage[2],
          size: 'sm',
          buttonSize: 'ld',
          okVariant: 'warning',
          okTitle: this.labelpage[25],
          cancelTitle: this.labelpage[26],
          hideHeaderClose: false,
          centered: false
        })
          .then( value  => {
            if (value) this.removeClient()
          })
          .catch(showError)
    },
      removeClient(){
        const id = this.client.id_client
        const method = 'delete'
        const pathCall = `/api/client/id/${id}`
        let query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
        const pathRoute = baseApiUrl + pathCall + query
        const config = {
          method: method,
          url: pathRoute,
          headers: { authorization: this.usrToken }
        }
        axios(config)
          .then( res => {
            showSuccess(res.data.info)
            this.cancelClient()
            this.cancelClient()
          })
          .catch(showError)
      },
      toggleBusy() {
        this.startLoad = !this.startLoad
        this.tbIsBusy = !this.tbIsBusy
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
    this.placeholderpage = this.obj.placeholder;
    this.iconpage = this.obj.icon;
    this.errorslist =  this.obj.errorsList;
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
      this.errorslist =  this.obj.errorsList;
    },
    page() {
      this.loadClients()
    },
    limit() {
      this.loadClients()
    },
    client(){
      this.checkForm()
    }
    
  }
};
</script>
<style >

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

#i-fa-search {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: stretch;
  width:25%;
}

.b-zip-code:hover {
  color: rgb(13, 26, 56);
  background-color: #a1cbf8;
  border-color: #9ec4ee;
}

#search-b-icon {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
  width:100%;
}

.error-title-icon {
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
}

#search-b-icon:hover {
  color: rgb(13, 26, 56);
  background-color: #a1cbf8;
  border-color: #9ec4ee;
}

.search-label{
  font-size: 0.9rem;
  font-weight: 500;
  margin:0;
  padding:0;
}

</style>