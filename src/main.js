import Vue from 'vue'
import App from './App.vue'
import router from './router'

// * Libraries
  // * Vuelidate
  import Vuelidate from 'vuelidate'
  Vue.use(Vuelidate)
  // * END Vuelidate
// * END Libraries

Vue.filter('formatDate', function(dateInput){
  let date = new Date(dateInput);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month]} ${day}, ${year}`

})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
