<template>
  <header class="header">
      <img src="../../assets/ComPano.jpg" class="logo" alt="Logo" v-show="!this.$store.state.isMenuVisible">
      <a @click="toggleMenu" class="toggle" v-if="!hideToggle">
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <h1 class="title">
          <div class="title-box">{{ title }}</div>
      </h1>
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
        hideUserDropdown: Boolean
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
        background: #FEAC5E;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0 2px 20px rgba(0,0,0,0.25);
    }
    .logo {
        display: flex;
        justify-content: center;
        height: 80%;
        box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.3);
        border-radius: 5px;
        margin: 4px;

    }
    .title {
        font-size: 1.3rem;
        color:rgb(29, 23, 61);
        font-weight: 500;
        flex-grow: 1;
        text-align: center;
        padding-top: 10px;
        /* padding-left: 40px; */
    }
    .title .title-box{
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
        color:rgb(29, 23, 61);
        justify-self: flex-start;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        background-color: rgba(255, 116, 2, 0.3);
        /* background-color: rgba(0, 0, 0, 0.22); */
    }
</style>