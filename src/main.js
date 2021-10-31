import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(require('vue-moment'))
Vue.use(Vuelidate)
