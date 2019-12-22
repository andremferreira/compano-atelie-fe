import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import langs from './modules/langs'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        dLang: 'pt-BR',
        user: null,
        token: null,
        loading: false,
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user){
            state.user = user
            if(user){
                state.token = user.token
                axios.create({ headers:{ common: { 'Authentication': user.token }}})
                state.user = user.user
                state.isMenuVisible = true
            } else {
                delete axios.headers.common['Authorization']
                state.isMenuVisible = false 
            }
        }
    },
    modules: { langs },
})