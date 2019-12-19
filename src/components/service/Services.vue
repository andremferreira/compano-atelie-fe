<template>
    <div class="services-pages">
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
                <b-col v-show="mode !== 'remove'">
                    <b-form-group id="form-service-g-active">
                        <b-form-checkbox switch
                            id="form-service-active"
                            v-model="service.bo_active"
                            name="service-active">
                                {{ labelpage[9] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
                <b-col v-show="mode !== 'remove'">
                    <b-form-group id="form-service-g-critical-service">
                        <b-form-checkbox switch
                            id="form-service-critical-service"
                            v-model="service.bo_critical_service"
                            name="service-critical-service">
                                {{ labelpage[10] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="mt-3">
                <div class="btn-group" >
                    <div id="btnl-save" v-if="mode === 'save'">
                    <b-button class="btn btnl-action btnl-save-stlyle" v-on:keyup.enter="submit" type="submit" size="sm">
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
                            <i class="fa fa-circle fa-stack-2x" style="color:#333;"/>
                            <i class="fa fa-free-code-camp fa-stack-1x fa-inverse flame"/>
                    </span>
                    <span v-else class="fa-stack">
                        <i class="fa fa-circle fa-stack-2x" style="color:#333;"/>
                            <i class="fa fa-snowflake-o fa-stack-1x fa-inverse snoll"/>                        
                    </span>
               </div>
          </template>          
        </b-table>
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
                { key: "vc_service_mnemonic", label: "Mnemonic", sortable: true },
                { key: "tx_service_description", label: "Description", sortable: true },
                { key: "bo_active", label: "Active", sortable: true },
                { key: "bo_critical_service", label: "Critical", sortable: true },
                { key: "actions", label: "Actions" }
            ],
            fieldsPt: [
                { key: "vc_service_mnemonic", label: "Mnemônio", sortable: true },
                { key: "tx_service_description", label: "Descrição", sortable: true },
                { key: "bo_active", label: "Situação", sortable: true },
                { key: "bo_critical_service", label: "Criticidade", sortable: true},
                { key: "actions", label: "Ações" }
            ],
            moneyEn: {decimal: ",",thousands: ".",prefix: "$ ",precision: 2,masked: false},
            moneyPt: {decimal: ",",thousands: ".",prefix: "R$ ",precision: 2,masked: false},     
            tbIsBusy:false,
            startLoad:false,
            strQuery:'',
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
                // this.joinData(res.data.rows);
                
            })
            .catch(showError);
            this.toggleBusy();
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
                if (value) this.removeService()
            })
            .catch(showError)
        },
        toggleBusy() {
            this.startLoad = !this.startLoad
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
        },
        cancelService() {
            this.mode = 'save'
            this.service = {}
            this.loadServices()
        },
    },
    mounted(){
        this.$store.state.isMenuVisible = false
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
    watch:{
        changeLang() {
        this.lang = this.$store.state.dLang;
        this.obj = defLang.langFind(this.lang, this.pagename, this.codename);
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
        this.placeholderpage = this.obj.placeholder;
        this.iconpage = this.obj.icon;
        // this.errorslist =  this.obj.errorsList;
        }
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
        background-image: linear-gradient(to right gold, tomato, gold);
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
        background: linear-gradient(to top, darkblue, deepskyblue, darkblue); 
        background: linear-gradient(to top, darkblue, deepskyblue, darkblue); 
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
    }
    .flame {
        background-clip: -webkit-radial-gradient(center, 8px 8px, red, gold);
        background: -o-linear-gradient(left, gold, red, gold);
        background: -moz-linear-gradient(left, gold, red, gold);
        background: linear-gradient(to right,  gold, red, gold); 
        background: linear-gradient(to right,  gold, red, gold); 
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
</style>