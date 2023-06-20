<!--Componente principal de Vue.-->
<template>
  <v-app>
    <admin-navbar v-if="loggedIn"></admin-navbar>
    <!--<the-navbar></the-navbar>-->
    <v-main>
      <router-view />
    </v-main>
    <!-- NOTIFICACIONES DEL SITIO -->
    <v-snackbar
      :multi-line="true"
      max-width="100"
      :top="true"
      :right="true"
      :timeout="time"
      v-model="isVisible"
      :color="color"
      ><span class="subtitle-1">{{ text }}</span>
    </v-snackbar>
    <!-- NOTIFICACIONES DEL SITIO -->
    <!--Inicio de loader del sitio-->
    <v-overlay :value="loaderVisible" style="z-index: 250">
      <v-progress-circular
        color="primary"
        indeterminate
        size="100"
      ></v-progress-circular>
    </v-overlay>
    <!--Fin de loader del sitio-->
  </v-app>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import AdminNavbar from "@/components/AdminNavbar";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    TheNavbar,
    AdminNavbar,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState("auth", ["loggedIn"]),
    ...mapState("loader", ["loaderVisible"]),
    ...mapState("notification", ["text", "color", "time", "visible"]),
    isVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.hide();
      },
    },
  },
  methods: {
    ...mapMutations("notification", ["hide"]),
  },
};
</script>
