<template>
  <div class="manager-users">
    <b-card>
      <template v-slot:header>
        <h4 class="mb-0">Gestão de Usuários</h4>
      </template>
      <b-card-title>teste 1</b-card-title>
      <b-card-text>teste 2</b-card-text>
      <b-card-body>
        <b-table hover striped :items="users" :fields="this.fields"></b-table>
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
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
    name: "ManagerUsers",
    date() {
      return {
        users: [],
        fields: [
            { key:'id_user', label:'Id', sortable: true },
            { key: 'vc_name', label:'Nome', sortable: true },
            { key: 'vc_lastname', label:'Sobrenome', sortable: true },
            { key: 'vc_email', label:'E-mail', sortable: true },
            { key: 'actions', label: 'Ações'}
          ]
      }
    },
    methods: {
    loadUsers() {
      const url = `${baseApiUrl}/api/users/small`;
      axios.get(url, myHeader).then(res => {
        this.users = res.data
      });
      }
    },
    mounted(){
      this.loadUsers()
    }
}
</script>

<style>

</style>