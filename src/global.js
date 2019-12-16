import Vue from 'vue'

export const userKey = '__compano_user'
export const baseApiUrl = 'http://127.0.0.1:4000'

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

export function showWarning(e){
    if(e && e.response && e.response.data ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultWarning({ msg : e.response.data.info})
    } else if ( typeof e === 'string' ){
        // eslint-disable-next-line
        Vue.toasted.global.defaultWarning({ msg: e })
    } else {
        Vue.toasted.global.defaultWarning()
    }
}

export default { baseApiUrl, showError, showWarning, showSuccess, userKey }