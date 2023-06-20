import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

require('./plugins');

// Archivo CSS global
import "@/assets/css/main.css"
Vue.component('NovaIcon', require("@/components/NovaIcon").default);

/**
 * Filtro para mostrar contenido en formato de moneda nacional (MXN).
 * @param {(string|number)} value   El valor a convertir a moneda nacional.
 */
 Vue.filter('currency', (value) => {
  if (!value || (typeof value != "string" && typeof value != "number")) return ''
  if (typeof value === 'string') 
    value = Number(value);

  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
