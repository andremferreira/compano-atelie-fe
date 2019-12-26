<template>
  <div class="manager-users">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[0] }}</h4>
      </template>
      <b-card-title><h5>{{ subtitlepage[0] }}</h5></b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form @submit.prevent="saveUser" @reset.prevent="cancelUser">
          <input id="user-id" type="hidden" v-model="user.id_user" />
          <b-row>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[8]}:`" label-for="user-name">
                <b-form-input id="user-name" type="text" v-uppercase
                    v-model="user.vc_name" required :readonly="mode === 'remove'" :placeholder="placeholderpage[0]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[9]}:`" label-for="user-lastname">
                <b-form-input id="user-lastname" type="text" v-uppercase
                    v-model="user.vc_lastname" required  :readonly="mode === 'remove'" :placeholder="placeholderpage[1]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[10]}:`" label-for="user-email">
                <b-form-input id="user-email" type="text" :readonly="mode === 'remove'" style="text-transform: lowercase;"
                    v-model="user.vc_email" required  :placeholder="placeholderpage[2]"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[11]}:`" label-for="user-profile">
                <b-form-select id="user-profile" v-model="user.in_profile" :disabled="mode === 'remove'">
                  <option :value="null" disabled>{{labelpage[13]}}</option>
                  <option value="1" v-show="this.$store.state.user.profile <= 1">{{labelpage[3]}}</option>
                  <option value="2" v-show="this.$store.state.user.profile <= 2">{{labelpage[4]}}</option>
                  <option value="3">{{labelpage[5]}}</option>
                  <option value="4">{{labelpage[6]}}</option>
                </b-form-select>
              </b-form-group>
            </b-col >
            <b-col md="4" sm="12" v-show="mode !== 'remove'">
              <b-form-group :label="`${labelpage[14]}:`" label-for="user-password">
                <b-form-input id="user-password" type="password"
                    v-model="user.vc_password" :placeholder="placeholderpage[3]"
                ></b-form-input>
              </b-form-group>
            </b-col>   
            <b-col md="4" sm="12" v-show="mode !== 'remove'">
              <b-form-group :label="`${labelpage[15]}:`" label-for="user-confirm-password">
                <b-form-input id="user-confirm-password" type="password" 
                    v-model="user.vc_repassword" :placeholder="placeholderpage[4]"
                ></b-form-input>
              </b-form-group>
            </b-col>   
          </b-row>
          <b-row>
            <b-col lg="1" md="2" sm="12">
                <div class="btn-group-sm d-block d-md-none"  style="width:100%;">
                  <div id="btnl-save" v-if="mode === 'save'" style="width:100%;">
                    <b-button size="sm" style="width:100%; text-align:center;" class="btn btnl-action btnl-save-stlyle" type="submit" >
                      <i :class="pageicon[3]" ></i> <span style="color: #fff;">{{ labelpage[16] }}</span>
                    </b-button>
                  </div>
                  <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-button size="sm" style="width:100%; text-align:center;" class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete">
                      <i :class="pageicon[5]" ></i> <span style="color: #fff;">{{ labelpage[2] }}</span>
                    </b-button>
                  </div>
                </div>
                <div class="btn-group d-none d-md-block">
                  <div id="btnl-save" v-if="mode === 'save'">
                    <b-button size="sm"  class="btn btnl-action btnl-save-stlyle" type="submit" >
                      <i :class="pageicon[3]" ></i> <span style="color: #fff;">{{ labelpage[16] }}</span>
                    </b-button>
                  </div>
                  <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-button size="sm" class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete">
                      <i :class="pageicon[5]" ></i> <span style="color: #fff;">{{ labelpage[2] }}</span>
                    </b-button>
                  </div>
                </div>
              </b-col>
              <b-col lg="1" md="2" sm="12">
                  <div id="btnl-cancel-sm" class="d-block d-md-none">
                    <b-button size="sm" style="width:100%; text-align:center;" class="btn btnl-action btnl-cancel-stlyle mt-2" type="reset">
                      <i :class="pageicon[4]" ></i> <span style="color: #fff;">{{ labelpage[17] }}</span>
                    </b-button>
                  </div>
                  <div id="btnl-cancel" class="d-none d-md-block ml-2">
                    <b-button size="sm" style=" text-align:center;" class="btn btnl-action btnl-cancel-stlyle" type="reset">
                      <i :class="pageicon[4]" ></i> <span style="color: #fff;">{{ labelpage[17] }}</span>
                    </b-button>
                  </div>
              </b-col>
          </b-row>
        </b-form>
        <hr>
        <b-table 
          sticky-header="stickyHeader" :no-border-collapse="true"
          hover outlined striped :items="users" :fields="this.fields" responsive small="small">
          <template v-slot:cell(actions)="data">
              <b-button size="sm" variant="warning" @click="loadUser(data.item)" class="mr-2 mt-1">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button size="sm" variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2 mt-1">
                <i class="fa fa-trash"></i>
              </b-button>
          </template>
        </b-table>
        <div class="paginator-box">
            <b-pagination @click="loadUsers" class="mt-3" v-model="page" :total-rows="count" size="sm" :per-page="limit" />
            <b-dropdown split :text="`${limit}`" variant="primary" class="ml-2" size="sm" >
              <b-dropdown-item @click="limit=5" >5</b-dropdown-item>
              <b-dropdown-item @click="limit=10">10</b-dropdown-item>
              <b-dropdown-item @click="limit=20">20</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, showError, showSuccess } from "@/global";
import axios from "axios";
import defLang from "@/config/factory/defLang"
export default {
    name: "ManagerUsers",
    computed:{
      changeLang() {
        return this.$store.state.dLang;
      },
      usrToken(){
        return this.$store.state.token;
      }
    },
    data: function() {
      return {
        page: 1,
        limit: 5,
        count: 0,
        mode: 'save',
        confirm: '',
        pagename: "ManagerUsers",
        codename: "ADMUSS01",
        pageicon: [],
        titlepage: [],
        subtitlepage: [],
        descriptionpage: [],
        labelpage: [],
        placeholderpage: [],
        obj: [],
        user: { in_profile: null },
        users: [],
        fields: [
            { key: 'actions', label: 'Actions'},
            { key: 'fullname', label: 'Name', sortable: true },
            { key: 'vc_email', label: 'E-mail', sortable: true },
            { key: 'in_profile', label: 'Profile', sortable: true, formatter: (value) =>  { return this.perfilUser(value) } },
          ],
      }
    },
    methods: {
      loadUsers() {
        const url = `${baseApiUrl}/api/users/small?page=${this.page}&limit=${this.limit}`;
        axios.get(url, { headers: { authorization: this.usrToken } }).then(res => {
            this.users = res.data.rows
            this.count = res.data.count 
            this.fullName(res.data.rows)
          })
        },
      perfilUser(value) {
        var result = ''
        switch(value) {
          case 1:
            result = this.labelpage[3]
            break;
          case 2:
            result = this.labelpage[4]
            break;
          case 3:
            result = this.labelpage[5]
            break;
          default:
            result = this.labelpage[6]
        }
        return result;
      },
      fullName(users) {
        for ( var i in users ) { 
          this.users[i].fullname = `${users[i].vc_name} ${users[i].vc_lastname}`
        }
      }
      ,
      saveUser(){
        const method = this.user.id_user ? 'put' : 'post'
        const pathCall =  this.user.id_user ? `/api/user/id/${this.user.id_user}` : `/api/user`
        const query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
        const pathRoute = baseApiUrl + pathCall + query
        const config = {
          method: method,
          url: pathRoute,
          headers: { authorization: this.usrToken },
          data: this.user
        }
        axios(config, this.user)
          .then( res => {
            showSuccess(res.data.info)  
            this.cancelUser()
            }
          )
          .catch(showError)
      },
      removeUser(){
        // eslint-disable-next-line
        const id = this.user.id_user
        const method = 'delete'
        const pathCall = `/api/user/id/${id}`
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
            this.cancelUser()
          })
          .catch(showError)
      },
      cancelUser(){
        this.user = { in_profile: null }
        this.mode = 'save'
        this.loadUsers()
      },
      loadUser(user, mode = 'save'){
        this.mode = mode 
        this.user = { ...user }
      },
      showModalDelete(){
        this.$bvModal.msgBoxConfirm(this.descriptionpage[1], {
          title: this.subtitlepage[1],
          size: 'sm',
          buttonSize: 'ld',
          okVariant: 'warning',
          okTitle: this.labelpage[18],
          cancelTitle: this.labelpage[19],
          hideHeaderClose: false,
          centered: false
        })
          .then( value  => {
            if (value) this.removeUser()
          })
          .catch(showError)
      }
    },
    mounted() {
      this.lang = this.$store.state.dLang;
      this.obj = defLang.langFind( this.lang, this.pagename, this.codename);
      this.titlepage = this.obj.title;
      this.pageicon = this.obj.icon;
      this.subtitlepage = this.obj.subtitle;
      this.descriptionpage = this.obj.description;
      this.labelpage = this.obj.label;
      this.placeholderpage = this.obj.placeholder;
      this.loadUsers()
    },
    watch: {
    changeLang(val, old) {
      if (val != old) {
        this.obj = defLang.langFind( this.$store.state.dLang, this.pagename, this.codename);
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
        this.placeholderpage = this.obj.placeholder;
      }
    },
    page() {
      this.loadUsers()
    },
    limit() {
      this.loadUsers()
    }
  }
}
</script>

<style>

.btnl-group {
  display: flex;
  flex-direction: row;
}

.paginator-box {
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: stretch;
}

#btnl-save, #btnl-remove, #btnl-cancel {
  align-content: initial;
  padding-left: 0px;
  cursor:pointer;
}

.btnl-action{position:relative;padding-left:32px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.btnl-action :first-child{position:absolute;left:0;top:0;bottom:0;width:24px;line-height:24px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btnl-action-icon{position:relative;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:24px;width:24px}
.btnl-action-icon :first-child{position:absolute;left:0;top:0;bottom:0;width:24px;line-height:26px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btnl-action-icon :first-child{border:none;text-align:center;width:100% !important}
/* BUTTON SAVE */
.btnl-action i.fa.fa-floppy-o { color: rgba(255,255,255,0.8); font-size: 1.2em; padding-top: 2px;}
.btnl-save-stlyle{color:#fff;background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
.btnl-save-stlyle:hover,.btnl-save-stlyle:focus,.btn-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{color:#fff;background-color:#0d70b7;border-color:rgba(0,0,0,0.2)}
.btnl-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{background-image:none}
.btnl-save-stlyle.disabled,.btn-save-stlyle[disabled],fieldset[disabled] .btn-save-stlyle,.btn-save-stlyle.disabled:hover,.btn-save-stlyle[disabled]:hover,fieldset[disabled] .btn-save-stlyle:hover,.btn-save-stlyle.disabled:focus,.btn-save-stlyle[disabled]:focus,fieldset[disabled] .btn-save-stlyle:focus,.btn-save-stlyle.disabled:active,.btn-save-stlyle[disabled]:active,fieldset[disabled] .btn-save-stlyle:active,.btn-save-stlyle.disabled.active,.btn-save-stlyle[disabled].active,fieldset[disabled] .btn-save-stlyle.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
/*  BUTTON CANCEL */
.btnl-action i.fa.fa-undo { color: rgba(255,255,255,0.8); font-size: 1.2em; padding-top: 2px;}
.btnl-cancel-stlyle{color:#fff;background-color:#6f7375;border-color:rgba(0,0,0,0.2)}
.btnl-cancel-stlyle:hover,.btnl-cancel-stlyle:focus,.btnl-cancel-stlyle:active,.btnl-cancel-stlyle.active,.open .dropdown-toggle.btnl-cancel-stlyle{color:#fff;background-color:#636668;border-color:rgba(0,0,0,0.2)}
.btnl-cancel-stlyle:active,.btnl-cancel-stlyle.active,.open .dropdown-toggle.btnl-cancel-stlyle{background-image:none}
.btnl-cancel-stlyle.disabled,.btnl-cancel-stlyle[disabled],fieldset[disabled] .btnl-cancel-stlyle,.btnl-cancel-stlyle.disabled:hover,.btnl-cancel-stlyle[disabled]:hover,fieldset[disabled] .btnl-cancel-stlyle:hover,.btnl-cancel-stlyle.disabled:focus,.btnl-cancel-stlyle[disabled]:focus,fieldset[disabled] .btnl-cancel-stlyle:focus,.btnl-cancel-stlyle.disabled:active,.btnl-cancel-stlyle[disabled]:active,fieldset[disabled] .btnl-cancel-stlyle:active,.btnl-cancel-stlyle.disabled.active,.btnl-cancel-stlyle[disabled].active,fieldset[disabled] .btnl-cancel-stlyle.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
/*  BUTTON REMOVE */
.btnl-action i.fa.fa-times { color: rgba(255,255,255,0.8); font-size: 1.2em; padding-top: 2px;}
.btnl-remove-stlyle{color:#fff;background-color:#e05840;border-color:rgba(0,0,0,0.2)}
.btnl-remove-stlyle:hover,.btnl-remove-stlyle:focus,.btnl-remove-stlyle:active,.btnl-remove-stlyle.active,.open .dropdown-toggle.btnl-remove-stlyle{color:#fff;background-color:#ce4f39;border-color:rgba(0,0,0,0.2)}
.btnl-remove-stlyle:active,.btnl-remove-stlyle.active,.open .dropdown-toggle.btnl-remove-stlyle{background-image:none}
.btnl-remove-stlyle.disabled,.btnl-remove-stlyle[disabled],fieldset[disabled] .btnl-remove-stlyle,.btnl-remove-stlyle.disabled:hover,.btnl-remove-stlyle[disabled]:hover,fieldset[disabled] .btnl-remove-stlyle:hover,.btnl-remove-stlyle.disabled:focus,.btnl-remove-stlyle[disabled]:focus,fieldset[disabled] .btnl-remove-stlyle:focus,.btnl-remove-stlyle.disabled:active,.btnl-remove-stlyle[disabled]:active,fieldset[disabled] .btnl-remove-stlyle:active,.btnl-remove-stlyle.disabled.active,.btnl-remove-stlyle[disabled].active,fieldset[disabled] .btnl-remove-stlyle.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
/*  BUTTON SEARCH */
.btnl-action i.fa.fa-search { color: rgba(13, 26, 56,0.75); font-size: 1.2em; padding-top: 2px;}
.btnl-search-style{color:#004085;background-color:#cce5ff;border-color:#b8daff}
.btnl-search-style:hover,.btnl-search-style:focus,.btnl-search-style:active,.btnl-search-style.active,.open .dropdown-toggle.btnl-search-style{color:rgb(13, 26, 56);background-color:#a1cbf8;border-color:#9ec4ee}
.btnl-search-style:active,.btnl-search-style.active,.open .dropdown-toggle.btnl-search-style{background-image:none}
.btnl-search-style.disabled,.btnl-search-style[disabled],fieldset[disabled] .btnl-search-style,.btnl-search-style.disabled:hover,.btnl-search-style[disabled]:hover,fieldset[disabled] .btnl-search-style:hover,.btnl-search-style.disabled:focus,.btnl-search-style[disabled]:focus,fieldset[disabled] .btnl-search-style:focus,.btnl-search-style.disabled:active,.btnl-search-style[disabled]:active,fieldset[disabled] .btnl-search-style:active,.btnl-search-style.disabled.active,.btnl-search-style[disabled].active,fieldset[disabled] .btnl-search-style.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}

</style>