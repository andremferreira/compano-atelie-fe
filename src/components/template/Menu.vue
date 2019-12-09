
<template>
  <aside class="menu" :style='`style="${bg}"`' v-show="isMenuVisible">
    <div class="menu-box">
        <b-nav class="w-10" vertical>
            <router-link v-for="(path, i) in pathRoute" :key="path" :to="`${path}`">
                <b-row class="item-menu mb-2">
                    <b-col><i :class="pageicon[i]" class="mr-2"/>{{ labelpage[i] }}</b-col>
                </b-row>
                <hr>
            </router-link>
            <b-row class="item-menu" style="padding-left:15px;">
                <b-col>
                    <b-row class="lang-c-row"><i class="fa fa-language mr-2" style="margin-top: 12px;"/><span class="mt-2">{{this.labelpage[5]}}</span>
                        <b-nav-item-dropdown id="box-lang" toggle-class="nav-link-custom" left>
                        <b-dropdown-item @click="modifyLang('pt-BR', pagename, codename)" >pt-BR</b-dropdown-item>
                        <b-dropdown-item @click="modifyLang('en-US', pagename, codename)" >en-US</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-row>
                </b-col>
            </b-row>
        </b-nav>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import defLang from "@/config/factory/defLang"
export default {
  name: "Menu",
  props: [ 'bg' ],
  computed: {
            changeLang() { return this.$store.state.dLang },
            ...mapState(["isMenuVisible"])
  },          
  data() {
      return {
            pageicon: [],
            pagename: "Menu",
            codename: "BTMENU01", 
            titlepage: [],
            subtitlepage: [],
            descriptionpage: [],
            labelpage: [],
            placeholderpage: [],
            pathRoute:[],
            obj: []
        };
    },
  methods: {
      modifyLang(lang, name, cod ) {
          defLang.langFind( lang, name, cod)
          localStorage.lang = lang
          this.$store.state.dLang = lang
    },
  },
  mounted() {
        this.lang = localStorage.lang || this.$store.state.dLang || 'pt-BR';
        if (!localStorage.lang) localStorage.lang = this.lang
        this.obj = defLang.langFind( this.lang, this.pagename, this.codename)
        this.titlepage = this.obj.title;
        this.pageicon = this.obj.icon;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.pathRoute = this.obj.path;
        this.labelpage = this.obj.label;
  },
  watch: {
      changeLang() {
            this.obj = defLang.langFind( this.$store.state.dLang, this.pagename, this.codename )
            this.titlepage = this.obj.title;
            this.pageicon = this.obj.icon;
            this.subtitlepage = this.obj.subtitle;
            this.descriptionpage = this.obj.description;
            this.pathRoute = this.obj.path;
            this.labelpage = this.obj.label;
        }
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

.item-menu {
    margin:0;
    color:azure;
    font-weight: 500;
    width: 200px;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.4);
    font-size: 1.1rem !important;
}

.item-menu:hover {
    background-color:rgba(250, 170, 20, 0.63);
    color: black;
    text-decoration: none;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.2);
    font-weight: 500;
    font-size: 1.1rem !important;
}

.nav a:hover{
    text-decoration: none;
}

.item-menu > .col > .lang-c-row > li > a {
    text-decoration: none;
    color: azure;

}

.item-menu:hover > .col > .lang-c-row > li > a {
    text-decoration: none;
    color:black;

}

.item-menu > .col > .lang-c-row > li > a:hover {
    text-decoration: none;
    color:black;
    font-weight: 500;
    font-size: 1.1rem !important;
}

hr {

  text-decoration: none;
  border-top: 1px solid rgba(0,0,0,0.6);
  border-bottom: 1px solid rgba(0,0,0,0.6);
  border-radius: 1px;

}
.nav-link-custom {
  padding: 0.4rem 0.1rem !important;
}

.router-link-exact-active > .item-menu > .col-sm-1 > i {
    color:rgba(250, 170, 20, 0.9);
    font-size: 1.3rem;
}
</style>