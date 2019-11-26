<template>
  <div class="admin">
    <PageTitle
      :icon="pageicon[0]"
      :main="titlepage[0]"
      :sub="subtitlepage[0]"
    />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab :title="labelpage[0]" active>
            <MyProfile />
          </b-tab>
          <b-tab :title="labelpage[1]">
            <ManagerUsers />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>
import PageTitle from "@/components/template/PageTitle";
import MyProfile from "./MyProfile";
import ManagerUsers from "./ManagerUsers";
const db = require('@/config/parameters/langDb.json')
export default {
  name: "AdminPages",
  components: { PageTitle, MyProfile, ManagerUsers },
  computed:{
    changeLang() {
      return this.$store.state.dLang;
    }
  },
  data() {
    return {
      pageicon: [],
      pagename: "AdminPages",
      codename: "ADMPGS01",
      titlepage: [],
      subtitlepage: [],
      descriptionpage: [],
      labelpage: [],
      placeholderpage: [],
      obj: []
    };
  },
  methods:{
    defineLang(lang) {
      if(!lang) 'pt-BR' 
      for (var i in db.lang) {
          if (db.lang[i].page == this.pagename && db.lang[i].cod == this.codename) {
              this.obj.icon = db.lang[i].icon
              this.obj.path = db.lang[i].path
              this.obj.alert = db.lang[i].alert
              var sLang = db.lang[i].variation
              for (var j in sLang){
                  if ( sLang[j].type == lang){
                      this.obj.title = sLang[j].title
                      this.obj.subtitle = sLang[j].subtitle
                      this.obj.description = sLang[j].description
                      this.obj.label = sLang[j].label
                      this.obj.placeholder = sLang[j].placeholder
                  }
              }
          }
      }
    }
  },
  mounted() {
    this.lang = this.changeLang || localStorage.lang;
    this.defineLang(this.lang);
    this.titlepage = this.obj.title;
    this.pageicon = this.obj.icon;
    this.subtitlepage = this.obj.subtitle;
    this.descriptionpage = this.obj.description;
    this.labelpage = this.obj.label;
  },
  watch: {
    changeLang(val, old) {
      if (val != old) {
        this.defineLang(this.$store.state.dLang)
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
      }
    }
  }
};
</script>

<style>
</style>