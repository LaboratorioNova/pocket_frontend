<!--Vista que se muestra por default cuando el usuario ingresa a una url que no existe-->
<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center" align="center" class="mt-10 text-center">
          <v-col cols="6" sm="4" lg="5">
            <v-row justify="center">
              <v-col cols="12" class="text-center pb-0 px-0">
                <v-img
                  src="@/assets/images/branding/nova-color.png"
                  class="mx-auto"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="mt-10">
            <h1 class="display-2 font-weight-bold">
              ¡La url ingresada no existe!
            </h1>
          </v-col>
          <v-col cols="12">
            <h1 class="display-3">404</h1>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>