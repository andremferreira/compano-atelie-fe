<template>
    <div class="services-pages">
    <PageTitle :icon="iconpage[0]" :main="titlepage[0]" :sub="subtitlepage[0]" />
    <b-card id="initial-title-service">
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[1] }}</h4>
      </template>
      <b-card-title>
        <h5>{{ subtitlepage[1] }}</h5>
      </b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form class="form-service-edit" @submit.prevent="saveService" @reset.prevent="cancelService">
            <input id="form-service-id" type="hidden" v-model="service.id_service" />
            <input id="form-service-id-user" type="hidden" v-model="service.id_user" />
            <b-row>
                <b-col lg="12" md="12" sm="12">
                        <b-form-group id="form-service-g-s-description" :label="labelpage[2]" label-for="input-service-description">
                        <b-form-textarea
                            id="textarea-service-description"
                            v-model="service.tx_service_description"
                            :placeholder="placeholderpage[1]"
                            rows="3"
                            max-rows="6"
                            required
                        >
                        </b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>            
            <b-row>
                <b-col lg="2" md="2" sm="6" v-if="mode !== 'remove'">
                    <b-form-group id="form-service-g-mne" :label="labelpage[1]" label-for="input-service-mne">
                        <b-form-input
                            id="input-service-mne"
                            v-model="service.vc_service_mnemonic"
                            required
                            :placeholder="placeholderpage[0]"
                            size="sm"
                            v-mask="'AAAAA'"
                            v-uppercase
                        />
                    </b-form-group>
                </b-col>
                <b-col lg="2" md="3" sm="6" v-if="mode !== 'remove'">
                    <b-form-group id="form-service-g-stime" :label="labelpage[3]" label-for="input-service-stime">
                        <b-form-input
                            id="input-service-stime"
                            v-model="service.tm_estimate_time_service"
                            type="time"
                            required
                            :placeholder="placeholderpage[2]"
                            size="sm"
                            v-uppercase
                        />
                    </b-form-group>
                </b-col>
                <b-col lg="8" md="6" sm="12" v-if="mode !== 'remove'">
                    <b-form-group id="form-service-g-cost" :label="labelpage[4]" label-for="input-service-co">
                        <b-row>
                            <b-col lg="4" md="4" sm="4">
                                <div class="box-cost-group">
                                <div class="icon-input-right material mb-2"><i class="fa fa-scissors"/></div>
                                    <b-form-input
                                        id="input-service-c-material"
                                        class="input-left-no-radius mb-2"
                                        v-model="service.nu_material_cost"
                                        v-money="lang=='pt-BR' || !lang ? moneyPt : moneyEn"
                                        size="sm"
                                    />
                                    <b-tooltip target="input-service-c-material" :title="placeholderpage[3]" />
                                </div>
                            </b-col>
                            <b-col lg="4" md="4" sm="4">
                                <div class="box-cost-group">
                                <div class="icon-input-right third-party mb-2"><i class="fa fa-code-fork"/></div>
                                    <b-form-input
                                        id="input-service-c-third"
                                        class="input-left-no-radius mb-2"
                                        v-model="service.nu_third_party_cost"
                                        v-money="lang=='pt-BR' || !lang ? moneyPt : moneyEn"
                                        size="sm"
                                    />
                                    <b-tooltip target="input-service-c-third" :title="placeholderpage[4]" />
                                </div>
                            </b-col>
                            <b-col lg="4" md="4" sm="4">
                                <div class="box-cost-group">
                                <div class="icon-input-right service-cost mb-2"><i class="fa fa-usd"/></div>
                                    <b-form-input
                                        id="input-service-c-money"
                                        class="input-left-no-radius mb-2"
                                        v-model="service.nu_service_cost"
                                        v-money="lang=='pt-BR' || !lang ? moneyPt : moneyEn"
                                        size="sm"
                                    />
                                    <b-tooltip target="input-service-c-money" :title="placeholderpage[5]" />
                                </div>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="12" md="12" sm="12" class="mb-3 pr-4" v-if="mode !== 'remove'">
                <b-row>
                    <b-col lg="2"><h5 style="text-align: right;">{{labelpage[18]}}</h5></b-col>
                    <b-col lg="10" class="total-box">
                        <input style="padding-left: 80px;" class="total-value d-none d-sm-block" v-money="lang=='pt-BR' || !lang ? moneyPt : moneyEn" :value="parseFloat(this.totalCalc()/1).toFixed(2)" />
                        <input style="padding-left: 80px;" class="total-value d-block d-sm-none" v-money="lang=='pt-BR' || !lang ? moneyPt : moneyEn" :value="parseFloat(this.totalCalc()/1).toFixed(2)" />
                        <span style="padding-top:2px; color:rgba(255,255,255,0.3);" class="mr-3 d-none d-sm-block"><i class="fa fa-money d-none d-sm-block" style="font-size:3rem;"></i></span>
                    </b-col>
                </b-row>
            </b-col>
            </b-row>
            <b-row>
                <b-col lg="2" md="2" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-g-active">
                        <b-form-checkbox switch
                            id="form-service-active"
                            v-model="service.bo_active"
                            name="service-active"
                            size="lg">
                                {{ labelpage[9] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
                <b-col lg="2" md="2" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-g-critical-service">
                        <b-form-checkbox switch
                            id="form-service-critical-service"
                            v-model="service.bo_critical_service"
                            name="service-critical-service"
                            size="lg">
                                {{ labelpage[10] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="2" md="4" sm="12" class="mt-3 mr-5">
                <div class="btn-group" >
                    <div id="btnl-save" v-if="mode === 'save'">
                    <b-button class="btn btnl-action btnl-save-stlyle" v-on:keyup.enter="saveService" type="submit" size="sm">
                        <i :class="iconpage[1]"></i>
                        <span style="color: #fff;">{{ labelpage[12] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-button class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete" size="sm">
                        
                        <i :class="iconpage[3]"></i>
                        <span style="color: #fff;">{{ labelpage[17] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-cancel">
                    <b-button class="btn ml-2 btnl-action btnl-cancel-stlyle" size="sm" type="reset">
                        <i :class="iconpage[2]"></i>
                        <span style="color: #fff;">{{ labelpage[13] }}</span>
                    </b-button>
                    </div>
                </div>
            </b-col>
          </b-row>
        </b-form>
        <hr>
        <b-form id="form-search-service-table" class="search-service" @submit.prevent="searchService">
        <b-row>
            <span class="ml-3 pt-1">{{labelpage[1]}}:</span>
                <b-col lg="3" md="3" sm="12">
                    <b-form-input
                        name="search-mne-service"
                        type="text"
                        size="sm"
                        v-model="searchmne"
                        v-mask="'AAAAA'"
                         />
                </b-col>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-none d-md-block' : 'btn btnl-action btnl-remove-stlyle d-none d-md-block'" 
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[16]}}</span>
            </b-button>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-block d-md-none mt-2 ml-3' : 'btn btnl-action btnl-remove-stlyle d-block d-md-none mt-2 ml-3'"  
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[16]}}</span>
            </b-button>
        </b-row>
        </b-form>
        <b-table
          sticky-header="stickyHeader"
          :no-border-collapse="true"
          outlined
          striped
          :items="services"
          :fields="lang=='pt-BR' || !lang ? fieldsPt : fieldsEn"
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
              <b-button size="sm" variant="warning" @click="loadService(data.item, 'save')" class="mr-2 mt-1">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button size="sm" variant="danger" @click="loadService(data.item, 'remove')" class="mr-2 mt-1">
                <i class="fa fa-trash"></i>
              </b-button>
          </template>
          <template v-slot:cell(bo_active)="data">
               <div class="table-status-action">
                    <span v-if="data.item.bo_active" class="fa-stack">
                        <i class="fa fa-circle fa-stack-2x" style="color:#333;"/>
                        <i class="fa fa-check fa-stack-1x fa-inverse forest" style="color:#28a745;"/>
                    </span>
                    <span v-else class="fa-stack">
                        <i class="fa fa-circle fa-stack-2x" style="color:#333;"/>
                        <i class="fa fa-times fa-stack-1x fa-inverse flame" style="color:tomato;"/>
                    </span>
               </div>
          </template>
          <template v-slot:cell(bo_critical_service)="data">
               <div class="table-status-action">
                    <span v-if="data.item.bo_critical_service" class="fa-stack">
                            <i class="fa fa-circle fa-stack-2x" style="color:#222;"/>
                            <i class="fa fa-free-code-camp fa-stack-1x fa-inverse flame"/>
                    </span>
                    <span v-else class="fa-stack">
                        <i class="fa fa-circle fa-stack-2x" style="color:#222;"/>
                            <i class="fa fa-snowflake-o fa-stack-1x fa-inverse snoll"/>                        
                    </span>
               </div>
          </template>          
        </b-table>
        <div class="paginator-box">
            <b-pagination @click="loadServices" class="mt-3" v-model="page" :total-rows="count" size="sm" :per-page="limit" />
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
import PageTitle from '@/components/template/PageTitle'
import { baseApiUrl, showError, showSuccess } from "@/global";
import defLang from "@/config/factory/defLang";
import axios from "axios";
export default {
    name: 'Services',
    components: { PageTitle },
    computed:{
      currUser() {
            return this.$store.state.user.id;
        },
      usrToken(){
            return this.$store.state.token;
        },
      changeLang() {
            return this.$store.state.dLang;
        },
    },
    data() {
        return {
            page: 1,
            limit: 5,
            count: 0,
            lang: null,
            mode: "save",
            iconpage: [],
            pagename: "Services",
            codename: "SERVEC01",
            titlepage: [],
            subtitlepage: [],
            descriptionpage: [],
            labelpage: [],
            placeholderpage: [],
            obj: [],
            services: [],
            service: {},
            switch: {value: true, disabled: false },
            fieldsEn: [
                { key: "actions", label: "Actions" },
                { key: "vc_service_mnemonic", label: "Mnemonic", sortable: true },
                { key: "tx_service_description", label: "Description", sortable: true },
                { key: "bo_active", label: "Active", sortable: true },
                { key: "bo_critical_service", label: "Critical", sortable: true },
            ],
            fieldsPt: [
                { key: "actions", label: "Ações" },
                { key: "vc_service_mnemonic", label: "Mnemônio", sortable: true },
                { key: "tx_service_description", label: "Descrição", sortable: true },
                { key: "bo_active", label: "Situação", sortable: true },
                { key: "bo_critical_service", label: "Criticidade", sortable: true},
            ],
            moneyEn: {decimal: ".",thousands: ",",prefix: "$ ",precision: 2,masked: false},
            moneyPt: {decimal: ",",thousands: ".",prefix: "R$ ",precision: 2,masked: false},     
            tbIsBusy: false,
            startLoad: false,
            strQuery: '',
            searchToggle: false,
            searchmne: '',
            total: 0
        }
    },
    methods: {
        loadServices(){
            this.toggleBusy();
            const url = `${baseApiUrl}/api/services?page=${this.page}&limit=${this.limit}${this.strQuery}`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.services = res.data.rows;
                this.count = res.data.count;
                this.toggleBusy();
                
            })
            .catch(() => {
                this.toggleBusy();
                return showError;
                });
            
        },
        totalCalc() {
            const calc = ( this.formatValue(this.service.nu_material_cost) + this.formatValue(this.service.nu_third_party_cost) + this.formatValue(this.service.nu_service_cost)) * (!this.service.bo_critical_service ? 1 : 1.2)
            return calc
        },
        formatValue(strValue){
            const onlyNumber= /\D/g;
            var value = `${strValue}`.replace(onlyNumber,'');
                value = `${value.substr(0, value.length - 2 )}.${value.substr(value.length - 2, 2)}`;
            return Number(value);
        }
        ,
        searchService() {
            if (!this.searchmne) return
                this.strQuery = `&mne=${this.searchmne}`;
                this.searchToggle = !this.searchToggle;
                if (this.searchToggle) {
                    this.loadServices()
                } else {
                    this.strQuery = ''
                    this.searchmne = ''
                    this.loadServices()
                }
        },
        showModalDelete(){
                this.$bvModal.msgBoxConfirm(this.descriptionpage[1], {
                title: this.subtitlepage[2],
                size: 'sm',
                buttonSize: 'ld',
                okVariant: 'warning',
                okTitle: this.labelpage[14],
                cancelTitle: this.labelpage[15],
                hideHeaderClose: false,
                centered: false
                })
                .then( value  => {
                    if (value) this.removeService()
                })
                .catch(showError)
        },
        toggleBusy() {
            this.tbIsBusy = !this.tbIsBusy
        },
        saveService() {
            if (!this.service.id_user) this.service.id_user = this.currUser
            const method = this.service.id_service ? 'put' : 'post'
            const pathCall = this.service.id_service ? `/api/service/id/${this.service.id_service}` : `/api/service`
            const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
            const pathRoute = baseApiUrl + pathCall + query
            const config = {
                method: method,
                url: pathRoute,
                headers: { authorization: this.usrToken },
                data: this.service
            }
            axios(config, this.service)
                .then( res => {
                    showSuccess(res.data.info)  
                    this.cancelService()
                    }
                )
                .catch(showError)
        },
        loadService(service, mode = 'save') {
            this.mode = mode
            this.service = { ...service }
            setTimeout(()=>{
                this.service = { ...service }
            }, 100)
            this.totalCalc() 
        },
        cancelService() {
            this.mode = 'save'
            this.service = {}
            this.loadServices()
        },
        removeService(){
        const id = this.service.id_service
        const method = 'delete'
        const pathCall = `/api/service/id/${id}`
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
            this.cancelService()
          })
          .catch(showError)
      },
      goToForm(){
        document.getElementById('initial-title-service').scrollIntoView({ behavior: 'smooth' })
      }
    },
    created(){
        if(this.$mq === 'xs' || this.$mq === 'sm'){
        this.$store.commit('toggleMenu', false)
        }
    },    
    mounted(){
        this.lang = this.$store.state.dLang;
        this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
        this.placeholderpage = this.obj.placeholder;
        this.iconpage = this.obj.icon;
        this.errorslist =  this.obj.errorsList;
        this.loadServices();
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
        page() {
            this.loadServices()
        },
        limit() {
            this.loadServices()
        },
    }
}
</script>

<style>
    .box-cost-group{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
    }
    .icon-input-right {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        width:32px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        color:azure;
    }
    .material {
        background-color: rgb(255, 187, 0);
        border: solid 1px;
        border-color: goldenrod
    }
    .third-party {
        background-color: #8257d1;
        border: solid 1px;
        border-color: #523883
    }
    .service-cost {
        background-color: #20c997;
        border: solid 1px;
        border-color: #1f8f6d;
    }

    .total {
        background-color: #2473ce;
        border: solid 1px;
        border-color: #1f628f;
    }

    .input-left-no-radius{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: 0px;
    }
    .table-status-action {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        padding-left: 15px;
    }
    .snoll {
        background-clip: -webkit-radial-gradient(center, 16px 16px, deepskyblue, darkblue);
        background: -o-linear-gradient(top, darkblue, deepskyblue, darkblue);
        background: -moz-linear-gradient(top, darkblue, deepskyblue, darkblue);
        background: linear-gradient(to right, darkblue, deepskyblue,rgb(0, 247, 255), deepskyblue, darkblue); 
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
    }
    .flame {
        background-clip: -webkit-radial-gradient(center, 2px 2px, rgb(255, 230, 0), rgb(252, 18, 1));
        background: -o-linear-gradient(left, rgb(255, 230, 0), rgb(252, 18, 1));
        background: -moz-linear-gradient(left, rgb(255, 230, 0), rgb(252, 18, 1));
        background: linear-gradient(to right,  goldenrod,gold, rgb(255, 4, 4), gold, goldenrod); 
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
    }
    .forest {
        background-clip: -webkit-radial-gradient(center, 16px 16px, yellowGreen, forestGreen);
        background: -o-linear-gradient(top, forestGreen, yellowGreen, forestGreen);
        background: -moz-linear-gradient(top, forestGreen, yellowGreen, forestGreen);
        background: linear-gradient(to top, forestGreen, yellowGreen, forestGreen); 
        background: linear-gradient(to top, forestGreen, yellowGreen, forestGreen); 
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
    }

    .total-value {
        border: none;
        font-size: 1.6rem;
        width: 220px;
        background-color:transparent;
        padding-top: 5px;
        font-weight: 100 !important;
    }

    .total-box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: flex-start;
        align-content: stretch;
        background: linear-gradient(to right, rgba(100, 0, 255, 0), rgba(132, 160, 255, 0.2), rgba(126, 156, 255, 0.3), rgba(50, 98, 255,0.4),rgba(50, 98, 255,0.2)) ;
        border: 1px solid;
        border-image-source: linear-gradient(to right, rgba(100, 0, 255, 0), rgba(50, 98, 255,0.3), rgba(50, 98, 255,0.6), rgba(50, 98, 255,0.4), rgba(50, 98, 255,0.0)) ;
        border-radius: 8px;
        border-image-slice: 1;
        border-left: 0px;
        border-right: 0px;
        box-shadow: 20px 8px 20px 0px rgba(86, 103, 161, 0.1), 20px 14px 20px 0px rgba(73, 92, 153, 0.2) ;
        
    }
</style>