import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const baseURL = process.env.VUE_APP_API_ENDPOINT;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080/';

axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);
