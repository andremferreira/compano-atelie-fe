<template>
  <header class="header" :style='`style="${header_img}"`'>
      <router-link to="/">
        <img src="../../assets/ComPano.jpg" class="logo" alt="Logo">
      </router-link>
      <h1 class="title">
          <div class="title-box">{{ title }}</div>
      </h1>
      <a @click="toggleMenu" class="toggle" v-if="!hideToggle">
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'
export default {
    name: 'Header',
    components:{ UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
        header_img: String
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods:{
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: #c2e59c;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background-image: url("../../assets/bgHeader.jpg");
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0 2px 20px rgba(0,0,0,0.25);
    }
    .logo {
        display: flex;
        justify-content: center;
        height: 48px;
        box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.3);
        border-radius: 5px;
        margin: 4px 0px 5px 12px;

    }
    .title {
        color:azure;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
        font-weight: 500;
        flex-grow: 1;
        text-align: center;
        padding-top: 10px;
    }
    .title .title-box{
        font-size: calc(1vw + 3vh);
        font-family: 'Allura', cursive, 'Nothing You Could Do', cursive;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }

    .title a {
        color:rgb(29, 23, 61);
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color:azure;
        background-color:rgba(255, 179, 2, 0.2);
        flex-direction: row;
        justify-content: space-around;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.2),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
        text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
    }

    header.header > a.toggle:hover {
        background-color: rgba(255, 179, 2, 0.7); 
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5),
            0 0 1em rgba(0,0,0,0.22),
            inset 0 0 1em rgba(0,0,0,0.22);
    }
</style>