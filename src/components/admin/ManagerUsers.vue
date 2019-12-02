<template>
  <div class="manager-users">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[0] }}</h4>
      </template>
      <b-card-title>{{ subtitlepage[0] }}</b-card-title>
      <b-card-text>{{ descriptionpage[0] }}</b-card-text>
      <b-card-body>
        <b-form>
          <input id="user-id" type="hidden" v-model="user.id_user" />
          <b-row>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[8]}:`" label-for="user-name">
                <b-form-input id="user-name" type="text" style="text-transform: uppercase;"
                    v-model="user.vc_name" required :readonly="mode === 'remove'" :placeholder="placeholderpage[0]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[9]}:`" label-for="user-lastname">
                <b-form-input id="user-lastname" type="text" :readonly="mode === 'remove'" style="text-transform: uppercase;"
                    v-model="user.vc_lastname" required  :placeholder="placeholderpage[1]"
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
                  <option value="1">{{labelpage[3]}}</option>
                  <option value="2">{{labelpage[4]}}</option>
                  <option value="3">{{labelpage[5]}}</option>
                  <option value="4">{{labelpage[6]}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[14]}:`" label-for="user-password">
                <b-form-input id="user-password" type="password" :readonly="mode === 'remove'"
                    v-model="user.vc_password" required  :placeholder="placeholderpage[3]"
                ></b-form-input>
              </b-form-group>
            </b-col>   
            <b-col md="4" sm="12">
              <b-form-group :label="`${labelpage[15]}:`" label-for="user-confirm-password">
                <b-form-input id="user-confirm-password" type="password" :readonly="mode === 'remove'"
                    v-model="user.vc_repassword" required  :placeholder="placeholderpage[4]"
                ></b-form-input>
              </b-form-group>
            </b-col>   
          </b-row>
          <b-row>
            <b-col>
                <div class="btn-group">
                  <div id="btnl-save" v-if="mode === 'save'">
                    <b-link class="btn btnl-action btnl-save-stlyle" @click="saveUser">
                      <i :class="pageicon[3]" ></i> <span style="color: #fff;">{{ labelpage[16] }}</span>
                    </b-link>
                  </div>
                  <div id="btnl-remove" v-if="mode === 'remove'">
                    <b-link class="btn btnl-action btnl-remove-stlyle" @click="showModalDelete">
                      <i :class="pageicon[5]" ></i> <span style="color: #fff;">{{ labelpage[2] }}</span>
                    </b-link>
                  </div>
                  <div id="btnl-cancel">
                    <b-link class="btn ml-2 btnl-action btnl-cancel-stlyle mr-2" @click="cancelUser">
                      <i :class="pageicon[4]" ></i> <span style="color: #fff;">{{ labelpage[17] }}</span>
                    </b-link>
                  </div>
                </div>
            </b-col>
          </b-row>
        </b-form>
        <hr>
        <b-table hover outlined small striped :items="users" :fields="this.fields">
          <template v-slot:cell(actions)="data">
              <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
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
import { baseApiUrl, tolken, showError, showSuccess } from "@/global";
import axios from "axios";
import defLang from "@/config/factory/defLang"
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
    name: "ManagerUsers",
    computed:{
      changeLang() {
        return this.$store.state.dLang;
      }
    },
    data: function() {
      return {
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
        user: {},
        users: [],
        fields: [
            { key: 'id_user', label: 'Id', sortable: true },
            { key: 'vc_name', label: 'Name', sortable: true },
            { key: 'vc_lastname', label: 'Lastname', sortable: true },
            { key: 'vc_email', label: 'E-mail', sortable: true },
            { key: 'in_profile', label: 'Profile', sortable: true, formatter: (value) =>  { return this.perfilUser(value) } },
            { key: 'actions', label: 'Actions'}
          ],
      }
    },
    methods: {
      loadUsers() {
        const url = `${baseApiUrl}/api/users/small`;
        axios.get(url, myHeader).then(res => {
            this.users = res.data
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
      saveUser(){
        const method = this.user.id_user ? 'put' : 'post'
        const pathCall =  this.user.id_user ? `/api/user/id/${this.user.id_user}` : `/api/user`
        let query = `?lang=${this.$store.state.dLang}`.toString().replace('-','_') 
        const pathRoute = baseApiUrl + pathCall + query
        const config = {
          method: method,
          url: pathRoute,
          headers: { authorization: tolken },
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
          headers: { authorization: tolken }
        }
        axios(config)
          .then( res => {
            showSuccess(res.data.info)
            this.cancelUser()
          })
          .catch(showError)
      },
      cancelUser(){
        this.user = {}
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
          cantelTitle: this.labelpage[19],
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
    }
  }
}
</script>

<style>

.btnl-group {
  display: flex;
  flex-direction: row;
}
#btnl-save, #btnl-remove, #btnl-cancel {
  align-content: initial;
  padding-left: 0px;
  cursor:pointer;
}

.btnl-action{position:relative;padding-left:44px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.btnl-action :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btnl-action-icon{position:relative;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:34px;width:34px}
.btnl-action-icon :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
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

</style>