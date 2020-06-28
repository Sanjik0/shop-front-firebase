import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import 'register-service-worker'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import VueCurrencyInput from 'vue-currency-input'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(VueCurrencyInput)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDVx4xu-SJMx1NsmQMkZrk4T8A8v_yM_zs",
  authDomain: "shop-fc321.firebaseapp.com",
  databaseURL: "https://shop-fc321.firebaseio.com",
  projectId: "shop-fc321",
  storageBucket: "shop-fc321.appspot.com",
  messagingSenderId: "720683676313",
  appId: "1:720683676313:web:2a1c98c05d4f605e2e7e08",
  measurementId: "G-1W91T2YQB8"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
