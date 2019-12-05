import Vue from 'vue'
export const baseApiUrl = 'http://192.168.0.107:4000'
export const tolken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoicyIsIjEiOiJ5IiwiMiI6InMiLCIzIjoiYSIsIjQiOiJkIiwiNSI6Im0iLCI2IjoiQCIsIjciOiJlIiwiOCI6Im0iLCI5IjoiYSIsIjEwIjoiaSIsIjExIjoibCIsIjEyIjoiLiIsIjEzIjoiYyIsIjE0IjoibyIsIjE1IjoibSIsImlhdCI6MTU3NTUwNDA3NywiZXhwIjoxNTc1NTkwNDc3fQ.h_jEfZXVyPmwgf-luzlduOdTNYEeVN8hhQhDdxc4VGs'

export function showError(e){
    if(e && e.response && e.response.data ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultError({ msg : e.response.data.info})
    } else if ( typeof e === 'string' ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showSuccess(e){
    if(e && e.response && e.response.data ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultSuccess({ msg : e.response.data.info})
    } else if ( typeof e === 'string' ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultSuccess({ msg: e })
    } else {
        Vue.toasted.global.defaultSuccess()
    }
}

export default { baseApiUrl, tolken, showError, showSuccess }