<!--Barra de navegación de usuario-->
<template>
  <div>
    <!-- MENÚ LATERAL DEL ADMINISTRADOR -->
    <v-navigation-drawer
      class="menu-radius"
      v-model="drawer"
      app
      color="primary"
      dark
      floating
      mobile-breakpoint="960"
      fixed
    >
      <v-list-item>
        <v-row justify="center" class="mt-10">
          <v-img
            max-width="150"
            src="@/assets/images/branding/nova-white.png"
            contain
          />
        </v-row>
      </v-list-item>
      <v-list-item class="mt-5">
        <v-row justify="center">
          <v-col cols="12" class="text-center headline font-weight-bold"
            >Menú</v-col
          >
        </v-row>
      </v-list-item>

      <!--<v-divider></v-divider>-->
      <v-list nav>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.link"
          active-class="primary white--text"
        >
          <v-list-item-icon class="ma-1">
            <nova-icon :name="item.icon" color="#FFFFFF"></nova-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span class="subtitle-1">{{ item.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 pb-8">
          <v-btn
            color="error"
            block
            rounded
            elevation="0"
            @click="logoutDialog = true"
          >
            Cerrar sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- INICIO Menú superior de administrador -->
    <v-app-bar
      id="core-app-bar"
      color="grey lighten-3"
      flat
      height="75"
      v-if="true"
    >
      <v-toolbar-title
        class="tertiary--text font-weight-light align-self-center"
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown"
          icon
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-toolbar-title>
      <v-breadcrumbs
        class="d-none d-sm-flex"
        :items="breadcrumbList"
        :class="
          $vuetify.breakpoint.xlOnly
            ? 'bigMargin'
            : $vuetify.breakpoint.lgOnly
            ? 'smallMargin'
            : ''
        "
      ></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-flexm align-center">
        <p class="subtitle-1 font-weight-bold mb-0">
          {{ user.name }} {{ user.last_name_father }}
          {{ user.last_name_mother }}
        </p>
      </v-toolbar-items>
    </v-app-bar>
    <!-- FIN Menú superior de administrador -->
    <!--INICIO Dialog para cerrar sesión-->
    <v-dialog v-model="logoutDialog" max-width="500">
      <v-card color="lightBlue">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Cerrar sesión
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">¿Está seguro que desea cerrar sesión?</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn color="grey lighten-2" @click="logoutDialog = false" rounded
            >Cancelar</v-btn
          >
          <v-btn color="error" @click="userLogout()" rounded
            >Cerrar sesión</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para cerrar sesión-->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  data: () => ({
    breadcrumbList: [],
    logoutDialog: false,
    drawer: null,
    responsive: false,
    menuItems: [
      {
        //icon: "mdi-home",
        icon: "home",
        title: "Inicio",
        link: "/inicio",
      },
      {
        //icon: "mdi-account",
        icon: "profile",
        title: "Usuarios",
        link: "/usuarios",
      },
      {
        //icon: "mdi-microscope", //mdi-flask
        icon: "lab-studies",
        title: "Estudios",
        link: "/estudios",
      },
      {
        //icon: "mdi-calendar-month",
        icon: "calendar",
        title: "Citas",
        link: "/citas",
      },
      {
        //icon: "mdi-routes-clock",
        icon: "routes",
        title: "Configuración de rutas",
        link: "/configuracion-rutas",
      },
      {
        //icon: "mdi-file-chart",
        icon: "tasks",
        title: "Reportes",
        link: "/reportes",
      },
    ],
  }),
  /**
   * Al comienzo de cargar este apartado, se ejecuta esta función
   */
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  /**
   * Al abandonar este apartado, se ejecuta esta función
   */
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 1100) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    ...mapMutations("auth", ["logout"]),
    userLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
  watch: {
    $route() {
      if (this.$route.meta.breadcrumbs)
        this.breadcrumbList = this.$route.meta.breadcrumbs;
      else this.breadcrumbList = [];
    },
  },
};
</script>

<style scoped>
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}

.bigMargin {
  margin-left: 256px;
}
.smallMargin {
  margin-left: 210px;
}
.disabled {
  color: #1d2b3b;
  pointer-events: none;
}
.menu-radius {
  border-radius: 0px 50px 50px 0px;
}
</style>
