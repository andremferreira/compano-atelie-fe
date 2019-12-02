function langFind(lang, page, code) {
    const db = require('../parameters/langDb.json')
    let objL = []
    for (var i in db.lang) {
        if (db.lang[i].page == page && db.lang[i].cod == code) {
            objL.icon = db.lang[i].icon
            objL.path = db.lang[i].path
            objL.alert = db.lang[i].alert
            var sLang = db.lang[i].variation
            for (var j in sLang){
                if ( sLang[j].type == lang){
                    objL.title = sLang[j].title
                    objL.subtitle = sLang[j].subtitle
                    objL.description = sLang[j].description
                    objL.label = sLang[j].label
                    objL.placeholder = sLang[j].placeholder
                }
            }
        }
    }
    return objL
}

module.exports = { langFind }