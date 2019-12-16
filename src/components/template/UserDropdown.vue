<template>
  <div class="user-dropdown">
      <div class="user-button">
          <span class="d-none d-sm-block">{{ user.name }} </span>
          <div class="user-dropdown-img">
              <Gravatar :email="user.email" alt="User" />
          </div>
          <i class="fa fa-angle-down" />
      </div>
      <transition>
        <div class="user-dropdown-content">
            <router-link to="/admin" id="admin-page-show">
                <i class="fa fa-cogs grip-lines-vertical"></i> Administração
            </router-link>
            <a href @click="logout" id="singout-page-show">
                <i class="fa fa-sign-out"></i> Sair
            </a>
        </div>
      </transition>
  </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            this.$store.state.loading = true
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$route.push({ name: 'auth' })
            this.$store.state.loading = false
        }
    }
}
</script>

<style>
    .user-dropdown {
        z-index: 20;
        position: relative;
        height: 100%;
        background-color: rgba(255, 179, 2, 0.2);
        box-shadow: 0px 0px 0px rgba(0,0,0,0.2),
        0 0 1em rgba(0,0,0,0.22),
        inset 0 0 1em rgba(0,0,0,0.22);
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
    }

    .user-button {
        display: flex;
        align-items: center;
        font-weight: 200;
        height: 100%;
        width:193px;
        padding: 0px 20px;
        color:azure;

    }

    .user-button:hover{
        color:black;
    }
    .user-dropdown:hover {
        text-shadow: none;
        color:black;
        background-color: rgba(255, 179, 2, 0.8); 
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }


    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 6px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: linear-gradient(to left, #4BC0C8, rgb(23, 66, 206));
        width: 193px;
        height: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display:flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s ease;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        background-color:rgba(240,248,255, 0.90);
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover{
        background-color:rgba(250, 170, 20, 0.63);
        color: black;
        text-decoration: none;
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.2);
        font-weight: 600;
        font-size: 1rem;
    }
</style>