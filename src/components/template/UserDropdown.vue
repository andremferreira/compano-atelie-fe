<template>
  <div class="user-dropdown">
      <div class="user-button">
          <span class="usr-text-dropdown "> {{ user.name }}</span>
          <div class="user-dropdown-img">
              <Gravatar id="img-usr-avatar" :email="user.email" alt="User" />
          </div>
          <i class="fa fa-angle-down pr-2" />
      </div>
      <transition>
        <div class="user-dropdown-content">
            <router-link to="/admin" id="admin-page-show">
                <i class="fa fa-cogs grip-lines-vertical"></i> Admin
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
      imgAvatar(){
      const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
      }
      
      let contentType = 'image/png';
      let b64Data = this.$store.state.user.avatar
      let blob = b64toBlob(b64Data, contentType);
      let blobUrl = URL.createObjectURL(blob);
      let elementAvatar = document.getElementById("img-usr-avatar");
      elementAvatar.src = blobUrl
    },
        logout() {
            this.$store.state.loading = true
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$route.push({ name: 'auth' })
            this.$store.state.loading = false
        }
    },
    mounted(){
        this.imgAvatar()
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
        flex-direction: row-reverse;
        align-content: flex-end;
        align-items: center;
        font-weight: 200;
        height: 100%;
        width:150px;
        padding: 0px 14px;
        color:azure;

    }

    .user-button:hover{
        color:black;
        cursor: pointer;
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
        width:150px;
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

    .usr-text-dropdown{
        font-size: 0.7rem;
        font-weight: 500;
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