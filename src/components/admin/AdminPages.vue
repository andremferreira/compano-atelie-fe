<template>
  <div class="admin">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Meus dados, Cadastro e Gestão de Usuários"/>
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Meu Perfil" active>
              <!-- <h2>Meu Perfil</h2> -->
              <MyProfile />
            </b-tab>
            <b-tab title="Usuários">
              <!-- <h2>Gestão de Usuários</h2> -->
              <ManagerUsers />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
  </div>
</template>
<script>
import PageTitle from '@/components/template/PageTitle'
import MyProfile from './MyProfile'
import ManagerUsers from './ManagerUsers'
export default {
    name: 'AdminPages',
    components: { PageTitle, MyProfile, ManagerUsers }
}
</script>

<style>

</style>