import Vue from "vue";
import { mapMutations, mapActions } from "vuex";
import store from "../store/index";

/**
 * Función global para hacer peticiones HTTP
 */
export class GlobalRequest {
  request = async (config) => {
    let activeLoader = config.activeLoader || false;
    try {
      if (activeLoader) {
        store.commit("loader/loading");
      }
      let response = await Vue.axios({
        method: config.method,
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
      return response;
    } catch (error) {
      return error.response;
    } finally {
      if (activeLoader) {
        store.commit("loader/loaded");
      }
    }
  };
}
