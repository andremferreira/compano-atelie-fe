const db = require('../parameters/langDb.json')
export default {
    namespaced: true,
    state:{
        lang: '',
        page: '',
        cod: '',
        objL: {}
    },
    mutations:{
        setLang(state, dLang){
            state.lang = dLang
        },
        setPage(state, dPage) {
            state.page = dPage
        },
        setCod(state, dCod) {
            state.cod = dCod
        },
        defineLang(state, dLang) {
            var lang = dLang || state.lang 
            for (var i in db.lang) {
                if (db.lang[i].page == state.page && db.lang[i].cod == state.cod) {
                    state.objL.icon = db.lang[i].icon
                    state.objL.path = db.lang[i].path
                    state.objL.alert = db.lang[i].alert
                    var sLang = db.lang[i].variation
                    for (var j in sLang){
                        if ( sLang[j].type == lang){
                            state.objL.title = sLang[j].title
                            state.objL.subtitle = sLang[j].subtitle
                            state.objL.description = sLang[j].description
                            state.objL.label = sLang[j].label
                            state.objL.placeholder = sLang[j].placeholder
                        }
                    }
                }
            }
        }
    }
}