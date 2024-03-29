import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted,{
    iconPack: 'fontawesome',
    duration: 4000
})

Vue.toasted.register(
    'defaultSuccess',
    msgResp => !msgResp.msg ? 'Register was realized with success...': msgResp.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultWarning',
    msgResp => !msgResp.msg ? 'Oops... action not executed well!' : msgResp.msg,
    { type: 'info', icon: 'exclamation', className:['toasted-custom']}
)

Vue.toasted.register(
    'defaultError',
    msgResp => !msgResp.msg ? 'Oops... Error was occurred!!!' : msgResp.msg,
    { type: 'error', icon: 'times' }

)
