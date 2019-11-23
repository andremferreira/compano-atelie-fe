import Vue from 'vue'
import Vuex from 'vuex'

import langs from './modules/langs'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        dFLang: 'pt_BR',
        user: {
            name: 'User Person',
            email: 'person@pers.com'
        },
        
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    },
    modules: { langs },
})