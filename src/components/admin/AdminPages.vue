<template>
  <div class="admin">
    <PageTitle
      :icon="pageicon[0]"
      :main="titlepage[0]"
      :sub="subtitlepage[0]"
    />
    <div class="admin-pages-tabs" id="admin-pgs">
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
import defLang from "@/config/factory/defLang"
import MyProfile from "./MyProfile";
import ManagerUsers from "./ManagerUsers";
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
  mounted() {
    this.$store.state.isMenuVisible = false
    this.lang = this.$store.state.dLang;
    this.obj = defLang.langFind( this.lang, this.pagename, this.codename)
    this.titlepage = this.obj.title;
    this.pageicon = this.obj.icon;
    this.subtitlepage = this.obj.subtitle;
    this.descriptionpage = this.obj.description;
    this.labelpage = this.obj.label;
  },
  watch: {
    changeLang(val, old) {
      if (val != old) {
        this.obj = defLang.langFind( this.$store.state.dLang, this.pagename, this.codename )
        this.titlepage = this.obj.title;
        this.subtitlepage = this.obj.subtitle;
        this.descriptionpage = this.obj.description;
        this.labelpage = this.obj.label;
      }
    }
  }
};
</script>

<style >

</style>