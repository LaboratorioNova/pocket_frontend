// main.js or index.js
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  props: {
    spinner: "bubbles",
  },
  slots: {
    // keep default styles
    noResults: "No se encontraron registros",

    // remove default styles
    noMore: "No hay más datos para mostrar",
    // hide slot
    error: {
      render: (h) => h("div"),
    },
  },
});
