<!--BARRA DE NAVEGACIÓN QUE PROBABLEMENTE NO SE UTLICE ELIMINAR SI NO SE UTILIZA-->
<template>
  <v-container fluid class="pa-0 ma-0">
    <!--INICIO Navegación en pantallas de mayor tamaño-->
    <v-app-bar app color="primary">
      <v-toolbar-title class="headline mx-5">
        <p class="white--text mb-0">NOVA</p>
      </v-toolbar-title>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" dense>
        <v-btn class="text-capitalize" v-for="item in menuItems" :key="item.title" plain :to="item.link" active-class="white--text font-weight-bold">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="sidenav = !sidenav" class="d-md-none white--text"></v-app-bar-nav-icon>
    </v-app-bar>
    <!--FIN Navegación en pantallas de mayor tamaño-->
    <!--INICIO Navegación en pantallas de menor tamaño-->
    <v-navigation-drawer v-model="sidenav" app temporary right>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" link :to="item.link" active-class="primary--text">
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 font-weight-bold">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--FIN Navegación en pantallas de menor tamaño-->
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      sidenav: false,
      menuItems: [
        { title: 'Inicio', link: '/' },
        { title: 'Login', link: '/login'},
        { title: 'Usuarios', link: '/usuarios' },
        { title: 'Servicios', link: '/estudios' },
      ]
    }
  }
}
</script>