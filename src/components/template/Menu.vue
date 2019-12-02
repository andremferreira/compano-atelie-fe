
<template>
  <aside class="menu" :style='`style="${bg}"`' v-show="isMenuVisible">
    <div class="menu-box">
        <b-navbar type="dark" top>
                <router-link v-for="(path, i) in pathRoute" :key="path" :to="`${path}`">
                    <b-navbar-brand><i :class="iconB[i]" /> {{ buttonL[i] }}</b-navbar-brand>
                </router-link>
            <!-- Right aligned nav items -->
                <b-navbar-nav class="p-2">
                    <b-nav-item-dropdown class="lang" :text="`${this.buttonL[4]}`" left>
                    <b-dropdown-item @click="modifyLang('pt-BR', name, cod)" >pt-BR</b-dropdown-item>
                    <b-dropdown-item @click="modifyLang('en-US', name, cod)" >en-US</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
        </b-navbar>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { baseApiLang } from '@/lang'
export default {
  name: "Menu",
  props: [ 'bg' ],
  computed: mapState(["isMenuVisible"]),
  data() {
      return {
          name: "Menu",
          cod: "BTMENU01", 
          lang: "",
          iconB: [],
          pathRoute: [],
          buttonL: []
          }
    },
  methods: {
      defineLang(lang, name, cod) {
      for (var idA in baseApiLang.lang) {
          if (baseApiLang.lang[idA].page == this.name && baseApiLang.lang[idA].cod == cod) {
              this.iconB = baseApiLang.lang[idA].icon
              this.pathRoute = baseApiLang.lang[idA].path
              var btLang = baseApiLang.lang[idA].button
              for (var idB in btLang){
                  if ( btLang[idB].type == lang){
                      this.buttonL = btLang[idB].title
                  }
              }
          }
        }   
      },
      modifyLang(lang, name, cod ) {
          this.defineLang(lang, name, cod)
          localStorage.lang = lang
          this.$store.state.dLang = lang
    }   
  },
  mounted() {
      if (localStorage.lang) {
          this.lang = localStorage.lang
      } else {
          localStorage.lang = this.lang || this.$store.state.dLang || 'pt-BR'
      }
        this.defineLang(localStorage.lang || this.lang || this.$store.state.dLang, this.name, this.cod)
    //   this.menu.home.title = ( this.defineLang(localStore.page.lang, 'HOME01') )
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5), 
    0 0 1em rgba(0, 0, 0, 0.22),
    inset 0 0 1em rgba(0, 0, 0, 0.22);
} 

.menu-box {
    position: relative;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5), 0 0 1em rgba(0, 0, 0, 0.22),
    inset 0 0 1em rgba(0, 0, 0, 0.22);
}
.menu-button-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
}

nav {
    height:40px;
    width: calc(100% - 193px);
    flex-wrap: wrap
    /* max-width: 400px; */
}
.navbar-brand {
    display:flex;
    font-size: calc(1vw + 1vh) !important;
}

nav span {
    color:azure;
    font-size: calc(0.5vw + 1vh);
    text-shadow: 0px 1px 2px rgba(0,0,0,0.4);
}

nav span:hover {
    font-size: calc(0.5vw + 1vh);
    color:rgb(255, 238, 0, 1);
    text-shadow: 0px 1px 2px rgba(0,0,0,0.6);
}
</style>