<template>
  <div class="auth-content">
      <div class="auth-modal">
          <div class="title-box">
             <h1 class="title">{{ title }}</h1>
          </div>
          <hr>
          <div class="auth-title">
              {{ showSingUp ? 'Cadastro' : 'Login'}}
          </div>
          <b-input v-if="showSingUp" v-model="user.name" placeholder="Informe o nome." type="text" />
          <b-input v-model="user.email" placeholder="Informe o e-mail." type="email" />
          <b-input v-model="user.password" placeholder="Informe a senha." type="password" />
          <b-input v-if="showSingUp" v-model="user.repassword" placeholder="Confirme a senha." type="password" />
          <input v-if="showSingUp" type="hidden" value="4" v-model="user.in_profile" />
          <b-button v-if="showSingUp" @click="signup">Registrar</b-button>
          <b-button v-else @click="singin">Entrar</b-button>
          <a href @click.prevent="showSingUp = !showSingUp" >
              <span v-if="showSingUp">Já possuí cadastro? Acesse o Login!</span>
              <span v-else >Não possuí cadastro? Registre-se Aqui!</span>
          </a>
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
        border-radius: 8px;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 200;
        margin-top: 10px;
        margin-bottom: 15px;
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
        background-color:chartreuse;
    }
</style>