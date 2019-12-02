<template>
  <div class="my-profile">
    <b-card >
      <template v-slot:header>
        <h4 class="mb-0">{{ titlepage[0] }}</h4>
      </template>
      <b-card-title>{{ subtitlepage[0] }}</b-card-title>
      <b-card-text>{{ descriptionpage[1] }}</b-card-text>
      <b-card-body>
        <b-form class="form-my-profile">
          <b-row>
            <b-col lg="1" md="2"  sm="12" v-show="showAvatar" id="box-avatar">
                <img id="avatar" src="" alt="Picture of item"/>
            </b-col>
            <b-col lg="11" md="10" sm="12">
              <b-form-group id="form-profile-g-name" :label="labelpage[0]" label-for="input-name">
                <b-form-input
                  id="input-name"
                  v-model="user.vc_name"
                  required
                  :placeholder="placeholderpage[0]"
                  style="text-transform: uppercase;"
                />
              </b-form-group>
            </b-col>
          </b-row>
            <b-form-group
              id="form-profile-g-lastname"
              :label="labelpage[1]"
              label-for="input-lastname"
            >
              <b-form-input
                id="input-lastname"
                v-model="user.vc_lastname"
                required
                :placeholder="placeholderpage[1]"
                style="text-transform: uppercase;"
              />
            </b-form-group>
          <b-form-group id="form-profile-g-email" :label="labelpage[2]" label-for="input-email">
            <b-form-input
              class="email"
              id="input-email"
              v-model="user.vc_email"
              required
              :placeholder="placeholderpage[2]"
              style="text-transform: lowercase;"
            />
          </b-form-group>
          <b-form-group
            id="form-profile-g-password"
            :label="labelpage[3]"
            label-for="input-password"
          >
            <b-form-input
              id="input-password"
              v-model="password"
              type="password"
              required
              :placeholder="placeholderpage[3]"
            />
          </b-form-group>
          <b-form-group
            id="form-profile-g-repassword"
            :label="labelpage[4]"
            label-for="input-repassword"
          >
            <b-form-input
              id="input-repassword"
              v-model="repassword"
              type="password"
              required
              :placeholder="placeholderpage[4]"
            />
          </b-form-group>
          <div id="btn-save">
            <b-link class="btn btn-action btn-save-stlyle">
              <i :class="iconpage[0]" ></i> <span style="color: #fff;">{{ labelpage[5] }}</span>
            </b-link>
          </div>
        </b-form>
      </b-card-body>
      <template v-slot:footer>
        <em></em>
      </template>
    </b-card>
  </div>
</template>

<script>
// eslint-disable-next-line
import { baseApiUrl, tolken } from "@/global";
import defLang from "@/config/factory/defLang"
import axios from "axios";
const myHeader = { headers: { authorization: tolken } };
axios.create({ headers: { common: { Authentication: tolken } } });
export default {
  name: "MyProfile",
  computed: {
    changeLang() {
      return this.$store.state.dLang;
    }
  },
  data() {
    return {
      showAvatar: false,
      iconpage: [],
      pagename: "MyProfile",
      codename: "MYPROF01",
      titlepage: "",
      subtitlepage: "",
      descriptionpage: [],
      labelpage: ["Name", "Lastname", "E-mail", "Passord", "Rept-Passord"],
      placeholderpage: [],
      repassword: "",
      password: "",
      user: {},
      obj:[]
    };
  },
  methods: {
    loadMyProfile() {
      const url = `${baseApiUrl}${this.obj.path}1`;
      axios.get(url, myHeader).then(res => {
        this.user = res.data;
      });
    },
    // onSubmit(e){
    //   e.preventDefault()
    //   alert(JSON.stringify(this.user))
    // },
    //  onReset(e){
    //    e.preventDefault()
    //   alert('Limpar dados!')
    // }
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
      
      const contentType = 'image/png';
      const b64Data = this.user.tx_image
      const blob = b64toBlob(b64Data, contentType);
      const blobUrl = URL.createObjectURL(blob);
      var elementAvatar = document.getElementById("avatar");
      elementAvatar.src = blobUrl
    },
  },
  mounted() {
    this.lang = this.$store.state.dLang;
    this.page = this.pagename;
    this.cod = this.codename;
    this.obj = defLang.langFind( this.lang, this.pagename, this.codename);
    this.titlepage = this.obj.title;
    this.subtitlepage = this.obj.subtitle ;
    this.descriptionpage = this.obj.description;
    this.labelpage = this.obj.label;
    this.placeholderpage = this.obj.placeholder;
    this.iconpage = this.obj.icon;
    this.loadMyProfile();
    setTimeout(() => {
      this.imgAvatar()
      return this.showAvatar = true 
    }, 1000)
  },
  befireUpdate(){
    
  },
  watch: {
    changeLang(val, old) {
      if (val != old ) {
          this.lang = this.$store.state.dLang;
          this.obj = defLang.langFind( this.lang, this.pagename, this.codename);
          this.titlepage = this.obj.title;
          this.subtitlepage = this.obj.subtitle ;
          this.descriptionpage = this.obj.description;
          this.labelpage = this.obj.label;
          this.placeholderpage = this.obj.placeholder;
      }
    }
  }
};
</script>

<style>

#btn-save {
  display:flex;
  align-content: initial;
  position:relative;
  padding-left: 0px;
  width:135px;
  cursor:pointer;
}

b-form-input {
  text-transform: uppercase;
}

b-form-input .email {
  text-transform: lowercase;
}

#box-avatar {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
  margin-bottom: 6px;
}

#avatar {
  width:100%;
  background-color: rgba(36, 150, 243, 0.2);
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  border-radius: 4px;
}

#avatar:hover {
  cursor:pointer;
  width:100%;
  background-color: rgba(36, 150, 243, 0.3);
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.6);
  border-radius: 4px;
}

.d-block {
  font-weight: bold;
}

.btn-action{position:relative;padding-left:44px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.btn-action :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btn-action-icon{position:relative;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:34px;width:34px}
.btn-action-icon :first-child{position:absolute;left:0;top:0;bottom:0;width:32px;line-height:34px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}
.btn-action-icon :first-child{border:none;text-align:center;width:100% !important}
.btn-action i.fa.fa-floppy-o { color: rgba(255,255,255,0.8); font-size: 1.2em; }
.btn-save-stlyle{color:#fff;background-color:#1087dd;border-color:rgba(0,0,0,0.2)}
.btn-save-stlyle:hover,.btn-save-stlyle:focus,.btn-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{color:#fff;background-color:#0d70b7;border-color:rgba(0,0,0,0.2)}
.btn-save-stlyle:active,.btn-save-stlyle.active,.open .dropdown-toggle.btn-save-stlyle{background-image:none}
.btn-save-stlyle.disabled,.btn-save-stlyle[disabled],fieldset[disabled] .btn-save-stlyle,.btn-save-stlyle.disabled:hover,.btn-save-stlyle[disabled]:hover,fieldset[disabled] .btn-save-stlyle:hover,.btn-save-stlyle.disabled:focus,.btn-save-stlyle[disabled]:focus,fieldset[disabled] .btn-save-stlyle:focus,.btn-save-stlyle.disabled:active,.btn-save-stlyle[disabled]:active,fieldset[disabled] .btn-save-stlyle:active,.btn-save-stlyle.disabled.active,.btn-save-stlyle[disabled].active,fieldset[disabled] .btn-save-stlyle.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}

</style>