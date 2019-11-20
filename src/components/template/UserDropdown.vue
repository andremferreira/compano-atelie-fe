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
            <router-link to="/admin">
                <i class="fa fa-cogs grip-lines-vertical"></i> Administração
            </router-link>
            <a href=""><i class="fa fa-sign-out"></i> Sair</a>

        </div>
      </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 200;
        height: 100%;
        padding: 0px 20px;

    }

    .user-dropdown:hover {
        background-color: rgba(0,0,0, 0.2)
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
        min-width: 192px;
        min-height: 120px;
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
        background-color:rgba(240,248,255, 0.95);
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
        box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
        font-weight: 600;
        font-size: 1rem;
    }
</style>