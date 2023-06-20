import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import service from './service'
import order from './order'
import zone from './zone'
import scheduleConfig from './scheduleConfig'
import report from './report'
import specialDays from './specialDays'
import loader from './loader'
import notification from './notification'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
});

export default new Vuex.Store({
  modules: {
    auth,
    user,
    service,
    order,
    zone,
    scheduleConfig,
    report,
    specialDays,
    loader,
    notification,
  },
  plugins: [vuexLocal.plugin]
});
