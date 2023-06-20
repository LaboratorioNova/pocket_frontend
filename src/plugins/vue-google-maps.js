import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBykg1AabFvit-yDS4BU4AWBCdaKro_w2A',
    libraries: 'geometry',
    region: 'MX',
    language: 'es'
  }
})