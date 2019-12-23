<template>
    <div class="budgets-pages">
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
        <b-form class="form-budget-edit" @submit.prevent="savebudget" @reset.prevent="cancelbudget">
            <input id="form-budget-id" type="hidden" v-model="budget.id_budget" />
            <input id="form-budget-id-user" type="hidden" v-model="budget.id_user" /> 
            <b-row>
                <b-col lg="2">
                <b-form-group id="form-service-g-client" :label="labelpage[1]" label-for="input-budget-client">
                     <b-form-input list="op-list-client" requered v-model="idClient" @blur="modifyClient(idClient)"></b-form-input> 
                        <datalist id="op-list-client">
                            <option v-for="(client, i ) in clients" :key="i" :value="i"
                            >{{ `${clients[i].vc_name} ${clients[i].vc_lastname}`}}
                            </option>
                        </datalist>
                </b-form-group>
                </b-col>
                <b-col lg="7">
                    <b-form-group :label="labelpage[3]" label-for="client-name">
                        <b-form-input disabled v-model="client.fullname"/> 
                    </b-form-group>
                </b-col>
                <b-col lg="3">
                    <b-form-group :label="labelpage[4]" label-for="client-ssc">
                         <b-form-input type="text" disabled :value="client.vc_social_security_code | cpf " /> 
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
              <b-col lg="2">
                <b-form-group id="form-budget-g-service" :label="labelpage[5]" label-for="input-budget-services">
                     <b-form-input list="op-list-services" v-model="idService" @blur="modifyService(idService)"></b-form-input> 
                        <datalist id="op-list-services">
                            <option v-for="(service, i ) in services" :key="i" :value="i"
                            >{{ `${services[i].vc_service_mnemonic} ${services[i].total}`}}
                            </option>
                        </datalist>
                </b-form-group>
               </b-col>
               <b-col lg="7">
                    <b-form-group :label="labelpage[7]" label-for="service-description">
                         <b-form-input disabled v-model="service.tx_service_description"/> 
                    </b-form-group>
                </b-col>
               <b-col lg="2">
                   <b-form-group id="form-budget-g-qtd-service" :label="labelpage[6]" label-for="input-budget-qtd-service">
                       <b-form-input 
                            type="number"
                            v-model="qtd"
                            min=1
                            max=50
                       />
                   </b-form-group>
               </b-col>
               <b-col lg="1" >
                   <b-button class="d-none d-md-block mb-3 budget-cost" @click="addBudgetService" style="margin-top:32px;width:100%;">
                       <i class="fa fa-plus" ></i>
                   </b-button>
                   <b-button class="d-block d-md-none mb-3 budget-cost" @click="addBudgetService" style="margin-top:8px;width:100%;">
                       <i class="fa fa-plus" ></i>
                   </b-button>
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
                                        <th>Item</th>
                                        <th class="pl-1">{{labelpage[9]}}</th>
                                        <th class="pl-1">{{labelpage[10]}}</th>
                                         <th class="pl-1">Val.</th> 
                                        <th >{{labelpage[11]}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(js,i) in budget.js_budget_service" :key="i" style="margin-bottom:10px;">
                                        <td style="width:7.5%;"><span class="pl-2">{{ i+1 }}</span></td>
                                        <td style="width:45%;"><span>{{ js.dsc }}</span></td>
                                        <td style="width:7.5%;"><span class="pl-2">{{ js.qtd }}</span></td>
                                        <td style="width:15%;"><span class="pl-2">{{ fMoney(js.val) }}</span></td>
                                        <td style="width:15%;">
                                            <b-button variant="warning" size="sm" class="mt-1 mb-1 ml-1" @click="editServiceItens(i, js.id, js.qtd)"><i class="fa fa-pencil"></i></b-button>
                                            <b-button variant="danger" size="sm" class="mt-1 mb-1 ml-1" @click="popItem(i)"><i class="fa fa-trash"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="total mt-2">
                                 <h5 class="pr-3 pt-2">Total:</h5><span class="pr-3 pt-2"><strong>{{ fMoney(total) }}</strong></span>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-collapse>
            <b-row>
                <b-col lg="2" md="4" sm="12" class="mt-3 mr-5">
                <div class="btn-group" >
                    <div id="btnl-save" v-if="mode === 'save'">
                    <b-button class="btn btnl-action btnl-save-stlyle" type="submit" size="sm">
                        <i :class="iconpage[1]"></i>
                        <span style="color: #fff;">{{ labelpage[13] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-button class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete" size="sm">
                        <i :class="iconpage[3]"></i>
                        <span style="color: #fff;">{{ labelpage[18] }}</span>
                    </b-button>
                    </div>
                    <div id="btnl-cancel">
                    <b-button class="btn ml-2 btnl-action btnl-cancel-stlyle" size="sm" type="reset">
                        <i :class="iconpage[2]"></i>
                        <span style="color: #fff;">{{ labelpage[14] }}</span>
                    </b-button>
                    </div>
                </div>
                </b-col>
          </b-row>
        </b-form>
        <hr>
        <b-form id="form-search-budget-table" class="search-budget" @submit.prevent="search">
        <b-row>
            <span class="ml-3 pt-1">{{ labelpage[2] }}:</span>
                <b-col lg="3" md="3" sm="12">
                    <b-form-input
                        name="search-mne-budget"
                        type="text"
                        size="sm"
                        v-model="searchbudget"
                        v-mask="'#######'"
                         />
                </b-col>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-none d-md-block' : 'btn btnl-action btnl-remove-stlyle d-none d-md-block'" 
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[17]}}</span>
            </b-button>
            <b-button :class="!searchToggle ? 'btn btnl-action btnl-search-style d-block d-md-none mt-2 ml-3' : 'btn btnl-action btnl-remove-stlyle d-block d-md-none mt-2 ml-3'"  
                type="submit" size="sm">
                <i :class="!searchToggle ? 'fa fa-search': 'fa fa-times'"></i>
                <span>{{labelpage[17]}}</span>
            </b-button>
        </b-row>
        </b-form>
        <b-table
          sticky-header="stickyHeader"
          :no-border-collapse="true"
          outlined
          striped
          responsive="true"
          :items="budgets"
          :fields="fieldsPt"
          small="small"
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
              <b-button size="sm" class="mr-2 mt-1 budget-cost">
                <i class="fa fa-plus"></i>
              </b-button>
              <b-button size="sm" variant="warning" @click="loadbudget(data.item, 'save')" class="mr-2 mt-1">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button size="sm" variant="danger" @click="loadbudget(data.item, 'remove')" class="mr-2 mt-1">
                <i class="fa fa-trash"></i>
              </b-button>
          </template>
      
        </b-table>
        <div class="paginator-box">
            <b-pagination @click="loadbudgets" class="mt-3" v-model="page" :total-rows="count" size="sm" :per-page="limit" />
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
    name: 'budgets',
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
    filters: {
		cpf(valor) {
            if(!valor) return
			const arr = valor.split('')
			arr.splice(3, 0, '.')
			arr.splice(7, 0, '.')
			arr.splice(11, 0, '-')
			return arr.join('')
        },
    },
    data() {
        return {
            page: 1,
            limit: 5,
            count: 0,
            lang: null,
            seq: 1,
            mode: "save",
            iconpage: [],
            pagename: "Budgets",
            codename: "BUDGET01",
            titlepage: [],
            subtitlepage: [],
            descriptionpage: [],
            labelpage: [],
            placeholderpage: [],
            obj: [],
            budgets: [],
            clients: [],
            client: {},
            services: [],
            service: {},
            users: [],
            idClient: null,
            idService: null,
            budget: {},
            showItens: false,
            fieldsEn: [
                { key: "id_budget", label: "Id", sortable: true },
                { key: "id_user", label: "User", sortable: true, formatter: (value) =>  { return this.getUser(value) } },
                { key: "id_client", label: "Client", sortable: true, formatter: (value) =>  { return this.getClient(value) }},
                { key: "ts_update", label: "Create Dt.", sortable: true, formatter: (value) =>  { return this.fDateTime(value) } },
                { key: "actions", label: "Actions" }
            ],
            fieldsPt: [
                { key: "id_budget", label: "Cód.", sortable: true },
                { key: "id_user", label: "Usuário", sortable: true , formatter: (value) =>  { return this.getUser(value) } },
                { key: "id_client", label: "Cliente", sortable: true, formatter: (value) =>  { return this.getClient(value) } },
                { key: "ts_update", label: "Dt. Criação", sortable: true, formatter: (value) =>  { return this.fDateTime(value) } },
                { key: "actions", label: "Ações" }
            ],
            moneyEn: {decimal: ".",thousands: ",",prefix: "$ ",precision: 2,masked: false},
            moneyPt: {decimal: ",",thousands: ".",prefix: "R$ ",precision: 2,masked: false},     
            tbIsBusy: false,
            startLoad: false,
            strQuery: '',
            searchToggle: false,
            searchbudget: '',
            total: 0,
            qtd: 1,
        }
    },
    methods: {
        cpfFormat(valor) {
            if(!valor) return
			const arr = valor.split('')
			arr.splice(3, 0, '.')
			arr.splice(7, 0, '.')
			arr.splice(11, 0, '-')
			return arr.join('').toString()
        },
        getUser(val){
            let user;
            for (var i in this.users) {
                    if (val == this.users[i].id_user) {
                        user = this.users[i].vc_name;
                        return user;
                }
            }
            return user;
        },
        getClient(val){
            let client;
            for (var i in this.clients) {
                    if (val == this.clients[i].id_client) {
                        client = this.cpfFormat(this.clients[i].vc_social_security_code)
                        return client;
                }
            }
            return client;
        },
        loadbudgets(){
            this.toggleBusy();
            const url = `${baseApiUrl}/api/budgets?page=${this.page}&limit=${this.limit}${this.strQuery}`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.getClientsList();
                this.getServicesList();
                this.getUsersList()
                this.budgets = res.data.rows;
                this.count = res.data.count;
                this.toggleBusy();
                
            })
            .catch(() => {
                this.toggleBusy();
                return showError;
            });
            
        },
        getClientsList(){
            const url = `${baseApiUrl}/api/lstbClients`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.clients = res.data.rows;
            })
            .catch(showError);
        },
        getServicesList(){
            const url = `${baseApiUrl}/api/lstbServices`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.services = res.data
            })
        },
        getUsersList() {
            const url = `${baseApiUrl}/api/lstbUsers`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.users = res.data
            })
        },
        search() {
            if (!this.searchbudget) return
                this.strQuery = `&budget=${this.searchbudget}`;
                this.searchToggle = !this.searchToggle;
                if (this.searchToggle) {
                    this.loadbudgets()
                } else {
                    this.strQuery = ''
                    this.searchbudget = ''
                    this.loadbudgets()
                }
        },
        showModalDelete(){
                this.$bvModal.msgBoxConfirm(this.descriptionpage[1], {
                title: this.subtitlepage[2],
                size: 'sm',
                buttonSize: 'ld',
                okVariant: 'warning',
                okTitle: this.labelpage[15],
                cancelTitle: this.labelpage[16],
                hideHeaderClose: false,
                centered: false
                })
                .then( value  => {
                    if (value) this.removebudget()
                })
                .catch(showError)
        },
        toggleBusy() {
            this.tbIsBusy = !this.tbIsBusy
        },
        savebudget() {
            //todo ajustar msg erro
            if (!this.budget.id_user) this.budget.id_user = this.currUser
            if (!this.idClient) return showError('Informe o código do cliente!');
            if (!this.budget.js_budget_service) return showError('Adicione um serviço!');
            const method = this.budget.id_budget ? 'put' : 'post'
            const pathCall = this.budget.id_budget ? `/api/budget/id/${this.budget.id_budget}` : `/api/budget`
            const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
            const pathRoute = baseApiUrl + pathCall + query
            const config = {
                method: method,
                url: pathRoute,
                headers: { authorization: this.usrToken },
                data: this.budget
            }
            axios(config, this.budget)
                .then( res => {
                    showSuccess(res.data.info)  
                    this.cancelbudget()
                    }
                )
                .catch(showError)
        },
        loadbudget(budget, mode = 'save') {
            this.mode = mode
            this.budget = { ...budget }
            this.idClient = this.budget.id_client
            this.modifyClient(this.idClient)
            this.calcBudget()
            this.seq = this.budget.js_budget_service.length
            this.showItens = true

        },
        cancelbudget() {
            this.mode = 'save'
            this.budget = {}
            this.client = {}
            this.idClient = null
            this.idService = null
            this.seq = 0
            this.total = 0
            this.showItens = false
            this.loadbudgets()
        },
        removebudget(){
        const id = this.budget.id_budget
        const method = 'delete'
        const pathCall = `/api/budget/id/${id}`
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
            this.cancelbudget()
          })
          .catch(showError)
      },
      modifyClient(value){
          if (!value || !this.clients[value]) {
              this.client = {}
              this.idClient = null
              return
          }
          this.client = this.clients[value]
          this.client.fullname = this.client.vc_name  + ' ' + this.client.vc_lastname
          this.budget.id_client = this.client.id_client
      },
      modifyService(value){
          if (!value || !this.services[value]) {
              this.service = {}
              this.idService = null
              return
          }
          this.service = this.services[value]
      },
      addBudgetService(){
          if ( !this.qtd || !this.idService || !this.idClient) return
          let objAdd = this.budget.js_budget_service || []
          const serviceAdd = { 
              id: this.idService,
              mne: this.service.vc_service_mnemonic,
              dsc: this.service.tx_service_description,
              qtd: this.qtd,
              val: this.service.total * this.qtd
          } 
          this.seq++
          this.service = {}
          objAdd.push(serviceAdd)
          this.budget.js_budget_service = objAdd
          this.qtd = 1
          this.idService = null
          this.calcBudget()
          this.showItens = true
      },
      calcBudget() {
        let soma = 0
        for (var i in this.budget.js_budget_service) {
            soma = soma + this.budget.js_budget_service[i].val;
            }
        this.total = soma
        },
      popItem(val) {
          this.budget.js_budget_service.splice(val,1);
          this.seq--
      },
      editServiceItens(val, idS, qtdS) {
          this.modifyService(idS)
          this.idService = idS;
          this.qtd = qtdS;
          this.popItem(val);
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
        fDateTime(dt){
            const lang = this.lang
            const date_ob = new Date(dt)
            const day = ("0" + date_ob.getDate()).slice(-2);
            const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            const year = date_ob.getFullYear();
            const hours = ("0" + date_ob.getHours()).slice(-2);
            const minutes = ("0" + date_ob.getMinutes()).slice(-2);
            const seconds = ("0" + date_ob.getSeconds()).slice(-2);
            const dateTime = lang === 'pt-BR' ? day + '/' + month + '/' + year + ' ' + hours + ':'+ minutes + ':' + seconds : month + '/' + day + '/' + year + ' ' + hours + ':'+ minutes + ':' + seconds
            return dateTime
     }
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
        this.loadbudgets();
        
        
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
            this.loadbudgets()
        },
        limit() {
            this.loadbudgets()
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
    .budget-cost {
        background-color: #1bb184;
        border: solid 1px;
        border-color: #22a17b;
    }
    .budget-cost:hover {
        background-color: #199b74;
        border: solid 1px;
        border-color: #22a17b;
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

    #budget-table-add {
        width:100%;
    }

    #budget-table-add td {
        border-top: 1px solid #EEE;
    }

    #budget-table-add hr {
        margin-top: 20px;
    }

    .total {
        display: flex;
        justify-content: flex-end;
        background: linear-gradient(to right, rgba(100, 0, 255, 0), rgba(132, 160, 255, 0.2), rgba(126, 156, 255, 0.3), rgba(50, 98, 255,0.4),rgba(50, 98, 255,0.2)) ;
        border: 1px solid;
        border-image-source: linear-gradient(to right, rgba(100, 0, 255, 0), rgba(50, 98, 255,0.3), rgba(50, 98, 255,0.6), rgba(50, 98, 255,0.4), rgba(50, 98, 255,0.0)) ;
        border-radius: 8px;
        border-image-slice: 1;
        border-left: 0px;
        border-right: 0px;
        box-shadow: 20px 8px 20px 0px rgba(86, 103, 161, 0.1), 20px 14px 20px 0px rgba(73, 92, 153, 0.2) ;
        width: 100%;        
    }

</style>