<template>
  <div class="auth-content">
      <div class="auth-modal">
          <div class="title-box">
             <h1 class="title">{{ title }}</h1>
          </div>
          <hr>
          <div class="auth-title ">
              {{ showSingUp ? 'Cadastro' : 'Login'}}
          </div>
          <b-form class="form-service-edit" v-on:keydown.enter.prevent="submit" @submit.prevent="singExec">
              <b-row v-if="showSingUp">
                <div class="box-cost-group"  style="width:100%;">
                    <div class="icon-input-right login-auth-icon mb-3"><i class="fa fa-user"/></div>
                    <b-input  
                        v-model="user.name" 
                        class="input-left-no-radius mb-3"
                        placeholder="Informe o nome." type="text" />
                </div>
              </b-row>
              <b-row>
                <div class="box-cost-group"  style="width:100%;">
                    <div class="icon-input-right login-auth-icon mb-3"><i class="fa fa-envelope"/></div>
                    <b-input 
                        v-model="user.email" 
                        class="input-left-no-radius mb-3"
                        request
                        placeholder="Informe o e-mail." type="email" />
                </div>
              </b-row>
              <b-row>
                <div class="box-cost-group" style="width:100%;">
                    <div class="icon-input-right login-auth-icon mb-3"><i class="fa fa-key"/></div>
                    <b-input 
                        class="input-left-no-radius mb-3"
                        v-model="user.password"  
                        v-on:keyup.enter="singExec" 
                        request
                        placeholder="Informe a senha." type="password" />
                </div>
             </b-row>
             <b-row v-if="showSingUp">
                <div class="box-cost-group" style="width:100%;">
                    <div class="icon-input-right login-auth-icon mb-3"><i class="fa fa-check-square-o"/></div>
                    <b-input 
                        v-model="user.repassword" 
                        class="input-left-no-radius mb-3"
                        request
                        placeholder="Confirme a senha." type="password" />
                    <input type="hidden" value="4" v-model="user.in_profile" />
               </div>
             </b-row>
             <b-row>
                  <div class="btn-form-sub">
                    <b-button v-if="showSingUp" class="btn-cadastro" type="submit">Registrar</b-button>
                    <b-button v-else type="submit">Entrar</b-button>
                  </div>
              </b-row>
              <b-row>
                  <div class="lnk-form-toggle">
                    <a href @click.prevent="showSingUp = !showSingUp" >
                        <span v-if="showSingUp">Já possuí cadastro? Acesse o Login!</span>
                        <span v-else >Não possuí cadastro? Registre-se Aqui!</span>
                    </a>
                  </div>
              </b-row>
          </b-form>
      </div>
  </div>
</template>

<script>
import {baseApiUrl, showError, showSuccess, userKey} from '@/global'
import axios from 'axios'
export default {
    name: 'Auth',
    data: function(){
        return {
            showSingUp: false,
            title: 'ComPano Atheliê',
            user:{}
        }
    },
    methods: {
        singin(){
            axios.post(`${baseApiUrl}/oapi/singin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/'})
                })
                .catch(showError)
        },
        singup() {
            axios.post(`${baseApiUrl}/oapi/singup`, this.user)
                .then(res => {
                    showSuccess(res.data.info)
                    this.user = {}
                    this.showSingUp = false
                })
                .catch(showError)
        },
        singExec(){
            if (!this.showSingUp) return this.singin();
            else return this.singin();
        }
    }
}
</script>

<style>
    .auth-content{
        height: 100%;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .auth-modal {
        background-image: linear-gradient(to right,
                rgba(255, 255,255, 0.85),
                rgba(255, 255, 255, 1),
                rgba(255,255,255,0.85)) ;
        width: 100%;
        max-width: 400px;
        padding: 35px;
        box-shadow: 2px 2px 6px 10px rgba(0,0,0,0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.8rem;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 15px;
        font-family: 'Allura', cursive, 'Nothing You Could Do', cursive;
        color:black;
        text-shadow: #DDD 3px 1px 1px
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }

    .auth-modal button {
        align-items: flex-end;
        background-color: #3989f3;
        color: azure;
        padding: 5px, 15px;
    }

    .auth-modal button:hover {
        align-items: flex-end;
        background-color: #2460ae;
        color: azure;
        padding: 5px, 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
                rgba(120,120,120, 0),
                rgba(120, 120, 120, 0.75),
                rgba(120,120,120,0))  
    }

    .auth-modal .title-box {
        background-image: url("../../assets/bgHeader.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        width: 100%;
        box-shadow: 1px 1px 6px 2px rgba(0,0,0,0.66);
        border-radius: 8px;
        
    }

    .auth-modal .title-box .title {
        font-size: 2rem;
        font-family: 'Allura', cursive, 'Nothing You Could Do', cursive;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        width: 100%
    }

    .box-title-singin{
        margin:0;
        padding:0;
        width:100%;
    }

    .btn-form-sub {
        margin:0;
        padding:0;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: stretch;
        align-content: stretch;
    }
    .lnk-form-toggle {
        margin:0;
        padding:0;
        width:100%;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        align-content: stretch;
    }

    .login-auth-icon {
        background-color: #007bff;
        border: solid 1px;
        border-color: #0051ff;
        border-right: 0px;
    }

    .form-service-edit {
        width: 100%;
    }

    .btn-cadastro {
        background-color: gold !important;
        border-color: goldenrod !important;
        color: black !important;
    }
</style>