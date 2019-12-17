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
        <b-form class="form-service-edit">
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
                                        v-money="this.money()"
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
                                        v-money="this.money()"
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
                                        v-money="this.money()"
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
                <b-col lg="2" md="2" sm="6" v-show="mode !== 'remove'">
                    <b-form-checkbox switch
                        id="form-service-g-active"
                        v-model="service.bo_active"
                        name="service-active">
                            {{ labelpage[9] }}
                    </b-form-checkbox>
                </b-col>
                <b-col lg="2" md="2" sm="6" v-show="mode !== 'remove'">
                    <b-form-checkbox switch
                        id="form-service-g-critical-service"
                        v-model="service.bo_critical_service"
                        name="service-active">
                            {{ labelpage[10] }}
                    </b-form-checkbox>
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
        }
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
            fields: [
                { key: "vc_service_mnemonic", label: "Mnemonic", sortable: true },
                { key: "tx_service_description", label: "Description", sortable: true },
                { key: "bo_active", label: "Active", sortable: true },
                { key: "actions", label: "Actions" }
            ],
            tbIsBusy:false,
            startLoad:false,
        }
    },
    methods: {
        loadServices(){
            this.toggleBusy();
            const url = `${baseApiUrl}/api/services?page=${this.page}&limit=${this.limit}${this.strQuery}`;
            axios.get(url, { headers: { authorization: this.usrToken } })
            .then(res => {
                this.services = res.data;
                // this.count = res.data.count;
                // this.joinData(res.data.rows);
                
            })
            .catch(showError);
            this.toggleBusy();
        },
        money() {
            if (this.$store.state.dLang == 'en-US') 
            {   
                return {
                    decimal: '.',
                    thousands: ',',
                    prefix: '$ ',
                    precision: 2,
                    masked: false
                }
            } else {
                return {
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2,
                    masked: false
                }
            }
        },
        toggleBusy() {
            this.startLoad = !this.startLoad
            this.tbIsBusy = !this.tbIsBusy
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
            this.loadServices();
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
        border-color: #1f8f6d
    }

    .input-left-no-radius{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: 0px;
    }
</style>