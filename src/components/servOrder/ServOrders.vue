<template>
    <div class="service-order">
    <PageTitle :icon="iconpage[0]" :main="titlepage[0]" :sub="subtitlepage[0]" />
    <b-card id="initial-title-s-order">
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[1] }}</h4>
      </template>
      <b-card-title>
        <h5>{{ subtitlepage[1] }}</h5>
      </b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form ref="form-service-order" class="form-service-edit" @submit.prevent="saveServiceOrder" @reset.prevent="cancelServiceOrder">
            <input id="form-service-order-id" type="hidden" v-model="serviceOrder.id_service_order" />
            <input id="form-service-order-id-user" type="hidden" v-model="serviceOrder.id_user" />
            <input id="form-service-order-id-client" type="hidden" v-model="serviceOrder.id_client" />
            <b-row>
                <b-col lg="2" md="4" sm="4">
                    <b-form-group
                        :label="labelpage[18]"
                        label-for="service-order-id-budget"
                    >
                        <b-form-input
                            id="service-order-id-budget"
                            v-model="serviceOrder.id_budget"
                            :disabled="true"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col lg="4" md="8" sm="10">
                    <b-form-group
                        :label="labelpage[1]"
                        label-for="client-name"
                    >
                        <b-form-input
                            id="client-name"
                            v-model="client.fullname"
                            :disabled="true"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col lg="3" md="6" sm="6">
                    <b-form-group
                        :label="labelpage[2]"
                        label-for="service-order-id-user"
                    >
                        <b-form-input
                            id="service-order-id-user"
                            v-model="user.vc_name"
                            :disabled="true"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col lg="3" md="6" sm="6">
                    <b-form-group
                        :label="labelpage[3]"
                        label-for="service-order-id-owner"
                    >
                        <b-form-input
                            id="service-order-id-owner"
                            v-model="owner"
                            :disabled="true"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-collapse id="itens-table-collapse"  v-show="mode !== 'remove'" v-model="showItens">
                <b-row>
                    <b-col lg="12" md="12" sm="12">
                        <div class="carrinho" style="width:100%;">
                            <table 
                                id="budget-table-add" 
                                sticky-header="stickyHeader"
                                :no-border-collapse="true">
                                <thead>
                                    <tr>
                                        <th class="pl-1">Item</th>
                                        <th class="pl-1">{{labelpage[19]}}</th>
                                        <th class="pl-1">{{labelpage[20]}}</th>
                                        <th class="pr-2" style="text-align:right;">{{labelpage[21]}}</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(js,i) in budget.js_budget_service" :key="i" style="margin-bottom:10px;">
                                        <td class="pl-3" style="width:7.5%;"><span>{{ i+1 }}</span></td>
                                        <td class="pl-1" style="width:45%; text-align:justify;"><span>{{ js.dsc }}</span></td>
                                        <td class="pl-3" style="width:7.5%;"><span>{{ js.qtd }}</span></td>
                                        <td class="pr-2" style="width:15%; text-align:right;"><span class="pl-2">{{ fMoney(js.val) }}</span></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="total-footer">
                                        <td colspan="2" class="pl-1"><strong>Total</strong></td>
                                        <td colspan="2" class="pr-2" style="text-align:right;"><strong>{{ fMoney(serviceOrder.nu_vservice) }}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </b-col>
                </b-row>
            </b-collapse>
            <b-row>
                <b-col class="mt-3" lg="3" md="3" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-order-g-bo-cancel">
                        <b-form-checkbox switch
                            id="form-service-order-bo-cancel"
                            v-model="serviceOrder.bo_canceled"
                            name="service-order-canceled"
                            size="lg"
                            class="cancel-switch"
                            :disabled="serviceOrder.bo_paid"
                            >
                                {{ labelpage[22] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>  
                <b-col class="mt-3" lg="3" md="3" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-order-g-bo-received">
                        <b-form-checkbox switch
                            id="form-service-order-bo-received"
                            v-model="serviceOrder.bo_received"
                            name="service-order-received"
                            :disabled="serviceOrder.bo_canceled"
                            size="lg">
                                {{ labelpage[7] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>  
                <b-col class="mt-3" lg="3" md="3" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-order-g-bo-paid">
                        <b-form-checkbox switch
                            id="form-service-order-bo-paid"
                            v-model="serviceOrder.bo_paid"
                            name="service-order-bo-paid"
                            :disabled="serviceOrder.bo_canceled"
                            size="lg"
                            class="paid-switch">
                                {{ labelpage[8] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
                <b-col class="mt-3" lg="3" md="3" sm="3" v-show="mode !== 'remove'">
                    <b-form-group id="form-service-order-g-bo-delivered">
                        <b-form-checkbox switch
                            id="form-service-order-bo-delivered"
                            v-model="serviceOrder.bo_delivered"
                            name="service-order-delivered"
                            :disabled="serviceOrder.bo_canceled"
                            size="lg">
                                {{ labelpage[9] }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>                  
            </b-row>
            <b-row>
                <b-col lg="2" md="4" sm="12" class="mt-3 mr-5">
                <div class="btn-group" >
                    <div id="btnl-save" v-if="mode === 'save'">
                    <b-button class="btn btnl-action btnl-save-stlyle" v-on:keyup.enter="saveServiceOrder" type="submit" size="sm">
                        <i :class="iconpage[1]"></i>
                        <span style="color: #fff;">{{ labelpage[10] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-button class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete" size="sm">
                        
                        <i :class="iconpage[3]"></i>
                        <span style="color: #fff;">{{ labelpage[15] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-cancel">
                    <b-button class="btn ml-2 btnl-action btnl-cancel-stlyle" size="sm" type="reset">
                        <i :class="iconpage[2]"></i>
                        <span style="color: #fff;">{{ labelpage[11] }}</span>
                    </b-button>
                    </div>
                </div>
            </b-col>
          </b-row>
        </b-form>
        <hr>
        <b-form id="form-search-service-order-table" class="search-service" @submit.prevent="searchServiceOrder">
        <b-row>
            <span class="ml-3 pt-1">{{labelpage[16]}}:</span>
                <b-col lg="3" md="3" sm="12">
                    <b-form-input
                        name="search-service-order"
                        type="text"
                        size="sm"
                        v-model="searchSo"
                        v-mask="'#######'"
                         />
                </b-col>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-none d-md-block' : 'btn btnl-action btnl-remove-stlyle d-none d-md-block'" 
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[14]}}</span>
            </b-button>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-block d-md-none mt-2 ml-3' : 'btn btnl-action btnl-remove-stlyle d-block d-md-none mt-2 ml-3'"  
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[14]}}</span>
            </b-button>
        </b-row>
        </b-form>
        <b-table
          sticky-header="stickyHeader"
          :no-border-collapse="true"
          outlined
          striped
          :items="serviceOrders"
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
              <b-button size="sm" variant="warning" @click="getServiceOrder(data.item, 'save')" class="mr-2 mt-1">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button size="sm" variant="danger" @click="getServiceOrder(data.item, 'remove')" class="mr-2 mt-1">
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
            <b-pagination @click="loadServiceOrders" class="mt-3" v-model="page" :total-rows="count" size="sm" :per-page="limit" />
            <b-dropdown split :text="`${limit}`" variant="primary" class="ml-2" size="sm" >
              <b-dropdown-item @click="limit=limit">{{limit}}</b-dropdown-item>
              <b-dropdown-item @click="limit=limit+10">{{limit+10}}</b-dropdown-item>
              <b-dropdown-item @click="limit=limit+40">{{limit+40}}</b-dropdown-item>
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
    name: 'ServOrders',
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
            limit: 10,
            count: 0,
            lang: null,
            mode: "save",
            iconpage: [],
            pagename: "ServOrders",
            codename: "SERORD01",
            titlepage: [],
            subtitlepage: [],
            descriptionpage: [],
            labelpage: [],
            placeholderpage: [],
            obj: [],
            serviceOrders: [],
            serviceOrder: {},
            clients: [],
            client: {},
            users: [],
            user: {},
            budget: {},
            switch: {value: true, disabled: false },
            fieldsEn: [
                { key: "actions", label: "Actions" },
                { key: "id_service_order", label: "Id", sortable: true },
                { key: "id_budget", label: "Budget", sortable: true },
                { key: "id_client", label: "Client", sortable: true,  formatter: (value) =>  { return this.formatClient(value) } },
                { key: "id_user", label: "User", sortable: true, formatter: (value) =>  { return this.formatUser(value) } },
                { key: "id_service_owner", label: "Owner", sortable: true, formatter: (value) =>  { return this.formatUser(value) } },
            ],
            fieldsPt: [
                { key: "actions", label: "Ações" },
                { key: "id_service_order", label: "Cód.", sortable: true },
                { key: "id_budget", label: "Nº Orçamento", sortable: true },
                { key: "id_client", label: "Cliente", sortable: true, formatter: (value) =>  { return this.formatClient(value) } },
                { key: "id_user", label: "Usuário", sortable: true, formatter: (value) =>  { return this.formatUser(value) } },
                { key: "id_service_owner", label: "Responsável", sortable: true, formatter: (value) =>  { return this.formatUser(value) } },
            ],
            moneyEn: {decimal: ".",thousands: ",",prefix: "$ ",precision: 2,masked: false},
            moneyPt: {decimal: ",",thousands: ".",prefix: "R$ ",precision: 2,masked: false},     
            tbIsBusy: false,
            startLoad: false,
            strQuery: '',
            searchToggle: false,
            searchSo: '',
            owner: '',
            showItens: false,
        }
    },
    methods: {
        loadServiceOrders(){
            this.toggleBusy();
            const url = `${baseApiUrl}/api/servOrders?page=${this.page}&limit=${this.limit}${this.strQuery}`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                // this.serviceOrders = res.data.rows;
                this.getClientsList();
                this.getUsersList();
                this.serviceOrders = res.data;
                // this.count = res.data.count;
                this.toggleBusy();
                
            })
            .catch(() => {
                this.toggleBusy();
                return showError;
                });
            
        },
        getBudgetItens(val){
            const url = `${baseApiUrl}/api/budget/id/${val}`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.budget = res.data;
            })
            .catch(showError);
        },        
        getClientsList(){
            const url = `${baseApiUrl}/api/lstbClients`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.clients = res.data.rows;
            })
            .catch(showError);
        },
        getUsersList() {
            const url = `${baseApiUrl}/api/lstbUsers`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.users = res.data
            })
        },
        formatUser(val){
            let user;
            for (var i in this.users) {
                    if (val == this.users[i].id_user) {
                        user = this.users[i].vc_name;
                        return user;
                }
            }
            return user;
        },
        formatClient(val){
            let client
            for (var i in this.clients) {
                if (val == this.clients[i].id_client) {
                    return client = this.clients[i].vc_name;
                }
            }
            return client
        },
        setClient(val){
            for (var i in this.clients) {
                    if (val == this.clients[i].id_client) {
                        this.client = this.clients[i];
                        this.client.fullname = this.client.vc_name + ' ' + this.client.vc_lastname
                }
            }
        },
        setUser(val){
            for (var i in this.users) {
                    if (val == this.users[i].id_user) {
                        this.user = this.users[i];
                }
            }
        },
        setOwner(val){
            for (var i in this.users) {
                    if (val == this.users[i].id_user) {
                        this.owner = this.users[i].vc_name;
                }
            }
        },
        searchServiceOrder() {
            if (!this.searchSo) return
                this.strQuery = `&mne=${this.searchSo}`;
                this.searchToggle = !this.searchToggle;
                if (this.searchToggle) {
                    this.loadServiceOrders()
                } else {
                    this.strQuery = ''
                    this.searchSo = ''
                    this.loadServiceOrders()
                }
        },
        showModalDelete(){
                this.$bvModal.msgBoxConfirm(this.descriptionpage[1], {
                title: this.subtitlepage[2],
                size: 'sm',
                buttonSize: 'ld',
                okVariant: 'warning',
                okTitle: this.labelpage[12],
                cancelTitle: this.labelpage[13],
                hideHeaderClose: false,
                centered: false
                })
                .then( value  => {
                    if (value) this.removeServiceOrder()
                })
                .catch(showError)
        },
        toggleBusy() {
            this.tbIsBusy = !this.tbIsBusy
        },
        saveServiceOrder() {
            if (!this.serviceOrder.id_user) this.serviceOrder.id_user = this.currUser
            const method = 'put'
            const pathCall = `/api/servOrder/id/${this.serviceOrder.id_service_order}`
            const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
            const pathRoute = baseApiUrl + pathCall + query
            const config = {
                method: method,
                url: pathRoute,
                headers: { authorization: this.usrToken },
                data: this.serviceOrder
            }
            axios(config, this.serviceOrder)
                .then( res => {
                    showSuccess(res.data.info)  
                    this.cancelServiceOrder()
                    }
                )
                .catch(showError)
        },
        getServiceOrder(data, mode = 'save') {
            this.mode = mode
            this.serviceOrder = { ...data }
            this.setClient(this.serviceOrder.id_client)
            this.setUser(this.serviceOrder.id_user)
            this.setOwner(this.serviceOrder.id_service_owner)
            this.getBudgetItens(this.serviceOrder.id_budget)
            this.showItens = true
            this.goToForm()
        },
        cancelServiceOrder() {
            this.mode = 'save'
            this.serviceOrder = {}
            this.loadServiceOrders()
            this.showItens = false
            this.client = {}
            this.user = {}
            this.owner = ''
            this.budget = {}
        },
        removeServiceOrder(){
        const id = this.serviceOrder.id_service_order
        const method = 'delete'
        const pathCall = `/api/servOrder/id/${id}`
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
            this.cancelServiceOrder()
          })
          .catch(showError)
      },
        fMoney(valor) {
            const lang = this.lang
            const decimal = lang === 'pt-BR' ? ',' : '.';
            const thousand = lang === 'pt-BR' ? '.' : ',';
            const places = 2;
            const symbol = lang === 'pt-BR' ? 'R$ ' : '$ ';
            let number = valor
            var negative = number < 0 ? "-" : "";
            var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
            var j = (j = i.length) > 3 ? j % 3 : 0;
            valor = (symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "")).toString();
            return valor 
      },
      goToForm(){
        document.getElementById('initial-title-s-order').scrollIntoView({ behavior: 'smooth' })
      },
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
        this.loadServiceOrders();
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
            this.loadServiceOrders()
        },
        limit() {
            this.loadServiceOrders()
        },
    }
}
</script>

<style>
    .total-footer {
        background: linear-gradient(to right, rgba(100, 0, 255, 0), rgba(132, 160, 255, 0.2), rgba(126, 156, 255, 0.3), rgba(50, 98, 255,0.4),rgba(50, 98, 255,0.2)) ;
        border: none;
        box-shadow: 20px 8px 20px 0px rgba(86, 103, 161, 0.1), 20px 14px 20px 0px rgba(73, 92, 153, 0.2) ;   
    }
    .cancel-switch > .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #ff0015;
    background-color: #ff5100;
    }
    .paid-switch > .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #2ab300;
    background-color: #38cc0b;
    }
</style>