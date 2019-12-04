
<template>
  <aside class="menu" :style='`style="${bg}"`' v-show="isMenuVisible">
    <div class="menu-box">
        <b-nav class="w-10" vertical>
            <router-link v-for="(path, i) in pathRoute" :key="path" :to="`${path}`">
                <!-- <b-nav-item> -->
                    <b-row class="item-menu mb-2">
                        <b-col sm="1"><i :class="iconB[i]" class="mr-2"/></b-col>
                        <b-col sm="7">{{ buttonL[i] }}</b-col>
                    </b-row>
                    <hr>
                <!-- </b-nav-item> -->
            </router-link>
            <b-nav-item-dropdown 
                toggle-class="nav-link-custom"
                :text="`${this.buttonL[4]}`" left>
            <b-dropdown-item @click="modifyLang('pt-BR', name, cod)" >pt-BR</b-dropdown-item>
            <b-dropdown-item @click="modifyLang('en-US', name, cod)" >en-US</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
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
  background: #2325259d; background: -webkit-linear-gradient(to right, #414345c4, #232526cc); background: linear-gradient(to right, #414345c4, #232526cc);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5), 
    0 0 1em rgba(0, 0, 0, 0.22),
    inset 0 0 1em rgba(0, 0, 0, 0.22);
} 

.menu-box {
    position: relative;
    margin: 10px;
    margin-top: 20px;
}
.menu-button-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.9);
}

nav {
    display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: stretch;
	align-content: stretch;
    /* max-height: calc(100vh - 9rem);
    overflow-y: auto; */
}
.item-menu {
    margin:0;
    color:azure;
    width: 200px;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.4);
    font-size: 1.1rem !important;
    /* font-size: calc(1vw + 1vh) !important; */
}

.item-menu a {
    color:azure;
    /* font-size: calc(0.5vw + 1vh); */
    text-shadow: 0px 1px 2px rgba(0,0,0,0.4);
}

.item-menu a:hover {
    /* font-size: calc(0.5vw + 1vh); */
    color:rgb(255, 238, 0, 1);
    text-shadow: 0px 1px 2px rgba(0,0,0,0.6);
}
</style>