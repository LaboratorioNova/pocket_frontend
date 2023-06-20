import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#006cb7",
        //secondary: '',
        accent: "#87C440",
        //success: '',
        error: "#ED1C24",
        //info: '',
        //warning: '',
        lightBlue: "#DDF0FA",
        lightCyan: "#CCE9F5",
      },
      dark: true,
    },
  },
});
