<template>
  <div class="manager-users">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[0] }}</h4>
      </template>
      <b-card-title>{{ subtitlepage[0] }}</b-card-title>
      <b-card-text>{{ descriptionpage[1] }}</b-card-text>
      <b-card-body>
        <b-table hover outlined small striped :items="users" :fields="this.fields"></b-table>
      </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, tolken } from "@/global";
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
        pagename: "ManagerUsers",
        codename: "ADMUSS01",
        mode: 'save',
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
      }
    }
  }
}
</script>

<style>

</style>