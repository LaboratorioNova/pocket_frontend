<!--Vista de usuarios-->
<template>
  <v-row>
    <!--INICIO Sección de lista de usuarios-->
    <v-col cols="12" md="4" class="pr-md-0 pb-0">
      <v-card
        :max-height="$vuetify.breakpoint.mdAndUp ? '88vh' : '80vh'"
        elevation="0"
        color="lightCyan"
        class="ma-3 rounded-xl"
      >
        <v-card-text
          style="display: flex; flex-direction: column"
          :style="$vuetify.breakpoint.mdAndUp ? 'height: 88vh' : 'height: 80vh'"
        >
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="d-flex flex-row">
                <v-text-field
                  v-model.lazy="userSearchData.search"
                  label="Usuarios"
                  filled
                  rounded
                  background-color="white"
                  dense
                  :maxLength="
                    searchFieldLoader ? userSearchData.search.length : 100
                  "
                  @input="Search"
                  v-on:keyup.enter="searchUsers()"
                >
                </v-text-field>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="accent"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="searchUsers()"
                    >
                      <!--<v-icon dark> mdi-magnify </v-icon>-->
                      <nova-icon
                        name="search"
                        color="#FFFFFF"
                        size="sm"
                      ></nova-icon>
                    </v-btn>
                  </template>
                  <span>Buscar usuario</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="accent"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="addUser()"
                    >
                      <!--<v-icon dark> mdi-plus </v-icon>-->
                      <nova-icon name="add" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Agregar usuario</span>
                </v-tooltip>
              </div>
            </v-col>
            <v-col cols="7" class="py-0 pr-1">
              <v-select
                v-model="userSearchData.role"
                label="Rol de usuario"
                background-color="white"
                filled
                rounded
                dense
                :items="userTypesSearcher"
                :disabled="searchFieldLoader"
                @change="searchUsers()"
              ></v-select>
            </v-col>
            <v-col cols="5" class="py-0 pl-1">
              <v-select
                label="Por página"
                v-model="userSearchData.perPage"
                background-color="white"
                type="number"
                filled
                rounded
                dense
                small
                :items="perPageOptions"
                @change="searchUsers()"
              ></v-select>
            </v-col>
          </v-row>
          <!--INICIO Cargar lista de usuarios-->
          <v-row
            class="user-list-container ml-1 d-flex justify-center"
            style="height: 100%"
          >
            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  v-for="item in usersData.data"
                  :key="item.id"
                  class="user-item pb-1 pl-0"
                  @click="selectUser(item)"
                  style="cursor: pointer; direction: ltr"
                >
                  <v-divider class="pb-3"></v-divider>
                  <div class="d-flex flex-row">
                    <div class="d-flex align-center">
                      <v-img
                        :src="
                          require(`@/assets/images/icons/${
                            item.role_id == 1
                              ? 'admin'
                              : item.role_id == 2
                              ? 'phlebotomist'
                              : 'customer'
                          }.png`)
                        "
                      ></v-img>
                    </div>
                    <div class="d-flex flex-column ml-3">
                      <p class="mb-0 font-weight-bold primary--text subtitle-1">
                        {{ item.last_name_father }} {{ item.last_name_mother }}
                        {{ item.name }}
                      </p>
                      <p class="mb-0 primary--text">{{ item.email }}</p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="loaderVisible" cols="12" class="d-flex justify-center">
              <p class="subtitle-1 font-weight-bold primary--text">
                Cargando...
              </p>
            </v-col>
            <v-col
              v-if="
                usersData.data && usersData.data.length == 0 && !loaderVisible
              "
              cols="12"
              class="d-flex justify-center"
            >
              <p class="subtitle-1 font-weight-bold black--text">
                No hay registros disponibles
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="secondary"
                    icon
                    small
                    :disabled="userSearchData.numberPage == 1"
                    v-bind="attrs"
                    v-on="on"
                    @click="pagination('firstPage')"
                  >
                    <v-icon dark> mdi-chevron-double-left </v-icon>
                  </v-btn>
                </template>
                <span>Primera página</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="secondary"
                    icon
                    small
                    :disabled="userSearchData.numberPage == 1"
                    v-bind="attrs"
                    v-on="on"
                    @click="pagination('previous')"
                  >
                    <v-icon dark> mdi-chevron-left </v-icon>
                  </v-btn>
                </template>
                <span>Anterior</span>
              </v-tooltip>
              <span
                >Pag. {{ userSearchData.numberPage }} de
                {{ usersData.last_page }}</span
              >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="secondary"
                    icon
                    small
                    :disabled="userSearchData.numberPage == usersData.last_page"
                    v-bind="attrs"
                    v-on="on"
                    @click="pagination('next')"
                  >
                    <v-icon dark> mdi-chevron-right </v-icon>
                  </v-btn>
                </template>
                <span>Siguiente</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="secondary"
                    icon
                    small
                    :disabled="userSearchData.numberPage == usersData.last_page"
                    v-bind="attrs"
                    v-on="on"
                    @click="pagination('lastPage')"
                  >
                    <v-icon dark> mdi-chevron-double-right </v-icon>
                  </v-btn>
                </template>
                <span>Última página</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <!--FIN Cargar lista de usuarios-->
        </v-card-text>
      </v-card>
    </v-col>
    <!--FIN Sección de lista de usuarios-->
    <!--INICIO Sección de los datos de usuario-->
    <transition name="fade">
      <v-col v-if="userDialog" cols="12" md="8" class="pl-md-0">
        <v-card
          :max-height="$vuetify.breakpoint.mdAndUp ? '88vh' : '80vh'"
          elevation="0"
          color="lightBlue"
          class="ma-3 rounded-xl"
        >
          <v-card-text
            :style="
              $vuetify.breakpoint.mdAndUp ? 'height: 88vh' : 'height: 80vh'
            "
          >
            <div class="user-container" style="height: 100%">
              <v-form ref="formUser" v-model="validUserForm" lazy-validation>
                <v-row style="direction: ltr">
                  <v-col cols="12" class="d-flex justify-end pb-0">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mx-2 mt-2"
                          fab
                          dark
                          color="error"
                          x-small
                          elevation="0"
                          v-bind="attrs"
                          v-on="on"
                          @click="(userDialog = false), (userAccion = '')"
                        >
                          <!--<v-icon dark> mdi-close </v-icon>-->
                          <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                        </v-btn>
                      </template>
                      <span>Cerrar</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <p
                      class="headline font-weight-bold text-center primary--text"
                    >
                      {{
                        userAccion == "CREATE"
                          ? "Crear usuario"
                          : "Actualizar usuario"
                      }}
                    </p>
                  </v-col>
                </v-row>
                <v-row class="px-3 px-md-10 px-lg-15" style="direction: ltr">
                  <v-col cols="12" class="py-0">
                    <v-select
                      v-model="user.role"
                      label="Rol de usuario"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :rules="roleRules"
                      :items="userTypes"
                      :disabled="userAccion == 'UPDATE'"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Nombre"
                      v-model="user.name"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="30"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Apellido paterno"
                      v-model="user.lastNameFather"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="20"
                      :rules="lastNameFatherRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Apellido materno"
                      v-model="user.lastNameMother"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="20"
                      :rules="lastNameMotherRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Teléfono"
                      v-model="user.phone"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="10"
                      @keyup="validatePhone()"
                      :rules="phoneRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Email"
                      v-model="user.email"
                      background-color="white"
                      filled
                      rounded
                      dense
                      @keyup="user.email = user.email.toLowerCase().trim()"
                      :disabled="userAccion == 'UPDATE'"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      label="Contraseña"
                      v-model="user.email"
                      background-color="white"
                      filled
                      rounded
                      dense
                      readonly
                      autocomplete="new-password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      @click:append="showPass = !showPass"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
                <v-row
                  class="px-3 px-md-10 px-lg-15"
                  v-if="user.role == 3"
                  style="direction: ltr"
                >
                  <v-col cols="12" class="py-0">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Fecha de nacimiento"
                          persistent-hint
                          readonly
                          v-on="on"
                          background-color="white"
                          filled
                          rounded
                          :rules="birthdateRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="user.birthdate"
                        no-title
                        @input="dateMenu = false"
                        locale="es"
                        :max="getMaxDate()"
                        :active-picker.sync="activePicker"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-select
                      label="Genero de nacimiento"
                      v-model="user.gender"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :items="genderTypes"
                      :rules="genderRules"
                    ></v-select>
                  </v-col>
                  
                </v-row>
              </v-form>
              <v-row class="px-3 px-md-10 px-lg-15" style="direction: ltr">
                <v-col
                  cols="12"
                  v-if="user.role == 3 && userAccion == 'UPDATE'"
                >
                  <v-simple-table dense class="rounded-xl">
                    <template v-slot:default>
                      <thead>
                        <tr
                          style="background-color: #cfd8dc"
                          class="rounded-xl"
                        >
                          <th class="subtitle-1 text-left">Direcciones</th>
                          <th class="text-right">
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="mx-2 my-2"
                                  fab
                                  dark
                                  color="accent"
                                  x-small
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="addAddress()"
                                >
                                  <!--<v-icon dark> mdi-plus </v-icon>-->
                                  <nova-icon
                                    name="add"
                                    color="#FFFFFF"
                                    size="sm"
                                  ></nova-icon>
                                </v-btn>
                              </template>
                              <span>Agregar dirección</span>
                            </v-tooltip>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in user.addresses" :key="item.name">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <td
                                colspan="2"
                                v-bind="attrs"
                                v-on="on"
                                style="cursor: pointer"
                                @click="selectAddress(item)"
                              >
                                {{ item.street }} {{ item.num_ext
                                }}{{
                                  `${
                                    item.num_int ? " Int. " + item.num_int : ""
                                  }`
                                }}
                                Col. {{ item.neighborhood }}, {{ item.city }},
                                {{ item.state }}.
                              </td>
                            </template>
                            <span>Da click para editar</span>
                          </v-tooltip>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                  v-if="userAccion == 'CREATE'"
                >
                  <v-btn
                    color="primary"
                    rounded
                    @click="_createUser()"
                    :disabled="
                      user.role == '' ||
                      user.name == '' ||
                      user.lastNameFather == '' ||
                      user.lastNameMother == '' ||
                      user.phone == '' ||
                      //user.password == '' ||
                      !validUserForm ||
                      (user.role == 3 &&
                        (user.birthdate == '' || user.gender == ''))
                    "
                  >
                    Guardar
                  </v-btn>
                </v-col>
                <v-col
                  cols="6"
                  class="d-flex justify-end"
                  v-if="userAccion == 'UPDATE'"
                >
                  <v-btn color="error" rounded @click="deleteUserDialog = true">
                    Eliminar
                  </v-btn>
                </v-col>
                <v-col
                  cols="6"
                  class="d-flex justify-start"
                  v-if="userAccion == 'UPDATE'"
                >
                  <v-btn
                    color="primary"
                    rounded
                    @click="_updateUser()"
                    :disabled="
                      user.role == '' ||
                      user.name == '' ||
                      user.lastNameFather == '' ||
                      user.lastNameMother == '' ||
                      user.phone == '' ||
                      !validUserForm ||
                      (user.role == 3 &&
                        (user.birthdate == '' || user.gender == ''))
                    "
                  >
                    Actualizar
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </transition>
    <!--FIN Sección de los datos de usuario-->

    <!--INICIO Sección de dirección de usuario-->
    <transition name="fade">
      <v-col v-if="addressDialog" cols="12" md="8" class="pl-md-0">
        <v-card
          :max-height="$vuetify.breakpoint.mdAndUp ? '88vh' : ''"
          elevation="0"
          color="lightBlue"
          class="ma-3 rounded-xl"
        >
          <v-card-text
            :style="$vuetify.breakpoint.mdAndUp ? 'height: 88vh' : ''"
          >
            <div
              :class="$vuetify.breakpoint.mdAndUp ? 'user-container' : ''"
              :style="$vuetify.breakpoint.mdAndUp ? 'height: 100%' : ''"
            >
              <v-form
                ref="formAddress"
                v-model="validAddressForm"
                lazy-validation
              >
                <v-row style="direction: ltr">
                  <v-col cols="12" class="d-flex justify-end pb-0">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mx-2 mt-2"
                          fab
                          dark
                          color="accent"
                          x-small
                          elevation="0"
                          v-bind="attrs"
                          v-on="on"
                          @click="openUserDialog()"
                        >
                          <!--<v-icon dark> mdi-arrow-left </v-icon>-->
                          <nova-icon
                            name="left-arrow"
                            color="#FFFFFF"
                          ></nova-icon>
                        </v-btn>
                      </template>
                      <span>Regresar</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mx-2 mt-2"
                          fab
                          dark
                          color="error"
                          x-small
                          elevation="0"
                          v-bind="attrs"
                          v-on="on"
                          @click="(addressDialog = false), (userAccion = '')"
                        >
                          <!--<v-icon dark> mdi-close </v-icon>-->
                          <nova-icon
                            name="cancel"
                            color="#FFFFFF"
                            size="sm"
                          ></nova-icon>
                        </v-btn>
                      </template>
                      <span>Cerrar</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <p
                      class="headline font-weight-bold text-center primary--text"
                    >
                      {{
                        addressAction == "CREATE"
                          ? "Crear dirección"
                          : "Actualizar dirección"
                      }}
                    </p>
                  </v-col>
                </v-row>
                <v-row class="px-3 px-md-10 px-lg-15" style="direction: ltr">
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="address.street"
                      label="Calle"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :rules="streetRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="address.numExt"
                      label="Número exterior"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="10"
                      :rules="numExtRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="address.numInt"
                      label="Número interior"
                      background-color="white"
                      filled
                      rounded
                      dense
                      maxlength="10"
                      :rules="numIntRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="address.neighborhood"
                      label="Colonia"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :rules="neighborhoodRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="address.zipCode"
                      label="Código postal"
                      background-color="white"
                      type="number"
                      filled
                      rounded
                      dense
                      :rules="zipCodeRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="address.city"
                      label="Ciudad"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :rules="cityRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="address.state"
                      label="Estado"
                      background-color="white"
                      filled
                      rounded
                      dense
                      :rules="stateRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-textarea
                      v-model="address.references"
                      label="Referencias"
                      background-color="white"
                      filled
                      rounded
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row
                  v-if="addressAction == 'UPDATE'"
                  class="px-3 px-md-10 px-lg-15"
                  style="direction: ltr"
                >
                  <v-col cols="6" class="d-flex justify-end">
                    <v-btn
                      color="error"
                      rounded
                      @click="deleteAddressDialog = true"
                    >
                      Eliminar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-start">
                    <v-btn
                      color="primary"
                      rounded
                      @click="_updateAddress()"
                      :disabled="
                        address.state == '' ||
                        address.city == '' ||
                        address.zipCode == '' ||
                        address.neighborhood == '' ||
                        address.street == '' ||
                        address.numExt == '' ||
                        !validAddressForm
                      "
                    >
                      Actualizar
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row
                  v-if="addressAction == 'CREATE'"
                  class="px-3 px-md-10 px-lg-15"
                  style="direction: ltr"
                >
                  <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                      color="primary"
                      rounded
                      @click="_createAddress()"
                      :disabled="
                        address.state == '' ||
                        address.city == '' ||
                        address.zipCode == '' ||
                        address.neighborhood == '' ||
                        address.street == '' ||
                        address.numExt == '' ||
                        !validAddressForm
                      "
                    >
                      Guardar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </transition>
    <!--FIN Sección de dirección de usuario-->
    <!--INICIO Dialog para eliminar usuario-->
    <v-dialog v-model="deleteUserDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Eliminar usuario
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea eliminar el registro seleccionado?
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="deleteUserDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            @click="_deleteUser()"
            rounded
            :loading="deleteButtonLoader"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para eliminar usuario-->
    <!--INICIO Dialog para eliminar dirección-->
    <v-dialog v-model="deleteAddressDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Eliminar dirección
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea eliminar el registro seleccionado?
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="deleteAddressDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            @click="_deleteAddress()"
            rounded
            :loading="deleteButtonLoader"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para eliminar dirección-->
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { validations } from "@/share/Validations";
import { Keys } from "../share/Keys";
import { ErrorHandler } from "../share/ErrorHandler";
import InfiniteLoading from "vue-infinite-loading";
import Vue from "vue";
var pointInPolygon = require("point-in-polygon");
export default {
  components: {
    InfiniteLoading,
  },
  computed: {
    ...mapState("loader", ["loaderVisible"]),
    ...mapState("user", ["usersData"]),
    ...mapState("zone", ["zones", "zone"]),
    /**
     * Función para dar formato de la fecha inicial del evento.
     */
    dateFormatted() {
      return this.formatDate(
        !this.user.birthdate ? null : this.user.birthdate.substring(0, 10)
      );
    },
  },
  data() {
    return {
      validUserForm: false,
      validAddressForm: false,
      searchFieldLoader: false,
      deleteButtonLoader: false,
      perPageOptions: [5, 10, 15, 20, 30, 50],
      userSearchData: {
        perPage: 10,
        numberPage: 1,
        role: "",
        search: "",
        activeLoader: true,
      },
      numberPage: 0,
      dateMenu: false,
      activePicker: null,
      userTypes: [],
      userTypesSearcher: [{ text: "Todos", value: "" }],
      genderTypes: [
        { text: "Hombre", value: "Hombre" },
        { text: "Mujer", value: "Mujer" },
      ],
      usersHeaders: [
        { align: "center", text: "Id", value: "id" },
        { align: "center", text: "Nombre", value: "name" },
        { align: "center", text: "Email", value: "email" },
        { align: "center", text: "Teléfono", value: "phone" },
        { align: "center", text: "Rol", value: "role" },
        { align: "center", text: "Acciones", value: "actions" },
      ],
      showPass: false,
      user: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        birthdate: "",
        gender: "",
        primaryKey:"",
        //zones: "",
        addresses: [],
      },
      userObj: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        birthdate: "",
        gender: "",
        primaryKey:"",
        //zones: "",
        addresses: [],
      },
      userAccion: "",
      userDialog: false,
      deleteUserDialog: false,
      address: {
        id: "",
        street: "",
        neighborhood: "",
        numExt: "",
        numInt: "",
        state: "",
        city: "",
        zipCode: "",
        references: "",
        latitude: "",
        longitude: "",
        customerId: "",
      },
      addressObj: {
        id: "",
        street: "",
        neighborhood: "",
        numExt: "",
        numInt: "",
        state: "",
        city: "",
        zipCode: "",
        latitude: "",
        references: "",
        longitude: "",
        customerId: "",
      },
      addressAction: "",
      addressDialog: false,
      deleteAddressDialog: false,
      // Validaciones de los campos del formulario de usuario
      
      
      roleRules: validations.generalMValidation({
        required: true,
        name: "rol de usuario",
      }),
      nameRules: validations.nameValidation({
        required: true,
        name: "nombre",
      }),
      lastNameFatherRules: validations.nameValidation({
        required: true,
        name: "apellido paterno",
      }),
      lastNameMotherRules: validations.nameValidation({
        required: true,
        name: "apellido materno",
      }),
      phoneRules: validations.phoneValidation({
        required: true,
      }),
      emailRules: validations.emailValidation({
        required: true,
      }),
      passwordRules: validations.generalFValidation({
        required: false,
        name: "contraseña",
        minLength: 8,
      }),
      birthdateRules: validations.generalMValidation({
        required: true,
        name: "fecha de nacimiento",
      }),
      genderRules: validations.generalMValidation({
        required: true,
        name: "genero del cliente",
      }),
      // Validaciones de los campos del formulario de direcciones
      stateRules: validations.generalMValidation({
        required: true,
        name: "estado",
      }),
      cityRules: validations.generalFValidation({
        required: true,
        name: "ciudad",
      }),
      zipCodeRules: validations.generalMValidation({
        required: true,
        name: "código postal",
        minLength: 5,
        maxLength: 5,
      }),
      neighborhoodRules: validations.generalFValidation({
        required: true,
        name: "colonia",
      }),
      streetRules: validations.generalFValidation({
        required: true,
        name: "calle",
      }),
      numExtRules: validations.addressNumberValidation({
        required: true,
        name: "número exterior",
      }),
      numIntRules: validations.addressNumberValidation({
        required: false,
        name: "número interior",
      }),
    };
  },
  created() {
    this.user.primaryKey = this.primaryKey(); // Llamar al método primaryKey() para generar el valor del primary key
  },
  methods: {
    ...mapActions("user", [
      "fetchUsers",
      "fetchUser",
      "createUser",
      "updateUser",
      "deleteUser",
      "createAddress",
      "updateAddress",
      "deleteAddress",
    ]),
    ...mapActions("zone", ["fetchZones", "fetchZone"]),
    ...mapMutations("user", ["clearUsersData"]),
    ...mapMutations("auth", ["logout"]),
    ...mapMutations("notification", ["show"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    /**
     * Función de paginación para los registros de usuarios
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la lista de usuarios.
     */
    async pagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.userSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.userSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.userSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.userSearchData.numberPage = this.usersData.last_page;
      }
      await this.fetchUsers(this.userSearchData);
    },
    /**
     * Función para buscar en tiempo real
     */
    Search() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchUsers();
      }, 300);
    },
    /**
     * Función para validar que los campos del formulario de usuario hayan sido llenados de la forma correcta.
     */
    validateFormUser() {
      if (this.$refs.formUser.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para recargar los datos del usuario seleccionado
     * * Esta función sirve para recargar los datos del usuario que acaba de ser editado
     */
    async reloadUser() {
      let response = await this.fetchUser(this.user.id);
      this.selectUser(response.data.data);
    },
    /**
     * Función para buscar usuarios.
     * * Siempre que se realiza un búsqueda el número de página debe ser reiniciado.
     */
    async searchUsers() {
      this.searchFieldLoader = true;
      this.userSearchData.numberPage = 1;
      await this.fetchUsers(this.userSearchData);
      this.searchFieldLoader = false;
    },
    /**
     * Función para crear la primary key
     * * Esta función obtiene las primeras letras de los campos de nombre, apellido, fecha de nacimiento y asigna dos numeros al azar.
     */

      primaryKey(){
      const name = this.user.name.substring(0,2).toUpperCase();
      const lastname = this.user.lastNameFather.substring(0,2).toUpperCase();
      let birthdate = new Date (this.user.birthdate);
      const day = birthdate.getDate().toString().padStart(2, "0"); 
      const month = (birthdate.getMonth() + 1).toString().padStart(2, "0"); 
      const year = birthdate.getFullYear().toString();
      const dateFormatted = `${day}${month}${year}`;
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      return(name+lastname+dateFormatted+num1+num2);
    },


    /**
     * Función para crear un usuario
     */
    async _createUser() {
      
      if (this.validateFormUser()) {
       
        this.user.password = this.user.email;
        this.user.primaryKey = this.primaryKey();
        
        // Iniciar el loader
        this.loading();
        let response = await this.createUser(this.user);
        if (response.status && response.status > 199 && response.status < 300) {
          this.userAccion = "UPDATE";
          this.user.id = response.data.data.id;
          this.userSearchData.activeLoader = false;
          await this.fetchUsers(this.userSearchData);
          this.userSearchData.activeLoader = true;
          this.show({
            text: "El usuario ha sido creado correctamente",
            color: "primary",
          });
          
        } 
        else {
          console.log(response);
          if (response.data.errors) {
            if (response.data.errors.email) {
              this.show({
                text: response.data.errors.email[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.password) {
              this.show({
                text: response.data.errors.password[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.name) {
              this.show({
                text: response.data.errors.name[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.last_name_father) {
              this.show({
                text: response.data.errors.last_name_father[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.last_name_mother) {
              this.show({
                text: response.data.errors.last_name_mother[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.phone_number) {
              this.show({
                text: response.data.errors.phone_number[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.role_id) {
              this.show({
                text: response.data.errors.role_id[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.birthdate) {
              this.show({
                text: response.data.errors.birthdate[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.gender) {
              this.show({
                text: response.data.errors.gender[0],
                color: "red accent-3",
              });
            } else {
              let error = new ErrorHandler();
              this.show({
                text: error.formatError(response.status),
                color: "red accent-3",
              });
            }
          } else {
            let error = new ErrorHandler();
            this.show({
              text: response.data.error
                ? response.data.error
                : error.formatError(response.status),
              color: "red accent-3",
            });
          }
        }
        // Quitar el loader
        this.loaded();
      }
    },
    /**
     * Función para editar un usuario
     */
    async _updateUser() {
      if (this.validateFormUser()) {
        // Iniciar el loader
        this.user.primaryKey = this.primaryKey();
        this.loading();
        let response = await this.updateUser(this.user);
        if (response.status && response.status > 199 && response.status < 300) {
          // Consultar datos de usuario seleccionado
          await this.reloadUser();
          // Consultar datos de los usuarios que se encuentran en el buscador
          this.userSearchData.activeLoader = false;
          await this.fetchUsers(this.userSearchData);
          this.userSearchData.activeLoader = true;
          this.show({
            text: "Los datos del usuario han sido actualizados correctamente",
            color: "primary",
          });
        } else {
          if (response.data.errors) {
            if (response.data.errors.email) {
              this.show({
                text: response.data.errors.email[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.password) {
              this.show({
                text: response.data.errors.password[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.name) {
              this.show({
                text: response.data.errors.name[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.last_name_father) {
              this.show({
                text: response.data.errors.last_name_father[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.last_name_mother) {
              this.show({
                text: response.data.errors.last_name_mother[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.phone_number) {
              this.show({
                text: response.data.errors.phone_number[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.role_id) {
              this.show({
                text: response.data.errors.role_id[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.birthdate) {
              this.show({
                text: response.data.errors.birthdate[0],
                color: "red accent-3",
              });
            } else if (response.data.errors.gender) {
              this.show({
                text: response.data.errors.gender[0],
                color: "red accent-3",
              });
            } else {
              let error = new ErrorHandler();
              this.show({
                text: error.formatError(response.status),
                color: "red accent-3",
              });
            }
          } else {
            let error = new ErrorHandler();
            this.show({
              text: response.data.error
                ? response.data.error
                : error.formatError(response.status),
              color: "red accent-3",
            });
          }
        }
        // Quitar el loader
        this.loaded();
      }
    },
    /**
     * Función para eliminar un usuario
     */
    async _deleteUser() {
      // Quitar el loader
      this.loading();
      let response = await this.deleteUser(this.user.id);
      if (response.status && response.status > 199 && response.status < 300) {
        await this.fetchUsers(this.userSearchData);
        this.deleteUserDialog = false;
        this.userAccion = "";
        this.userDialog = false;
        this.show({
          text: "El registro ha sido eliminado correctamente",
          color: "primary",
        });
      } else {
        this.deleteUserDialog = false;
        let error = new ErrorHandler();
        this.show({
          text: error.formatError(response.status),
          color: "red accent-3",
        });
      }
      this.deleteButtonLoader = false;
      // Quitar el loader
      this.loaded();
    },
    /**
     * Función que abre una sección a la derecha para crear un usuario
     * * La función reinicia el objeto user
     * * La función reinicia las validaciones del formulario
     */
    addUser() {
      this.userAccion = "CREATE";
      this.user = JSON.parse(JSON.stringify(this.userObj));
      // Reiniciar validación del formulario
      if (this.$refs.formUser) {
        this.$refs.formUser.resetValidation();
      }
      this.userDialog = true;
    },
    /**
     * Función que abre una sección a la derecha con los datos del usuario seleccionado
     */
    selectUser(userSelected) {
      this.userAccion = "UPDATE";
      this.openUserDialog();
      this.user.id = userSelected.id;
      this.user.name = userSelected.name;
      this.user.lastNameFather = userSelected.last_name_father;
      this.user.lastNameMother = userSelected.last_name_mother;
      this.user.email = userSelected.email;
      this.user.password = userSelected.email;
      this.user.role = userSelected.role_id;
      this.user.phone = userSelected.phone_number;
      this.user.primaryKey = userSelected.primary_key;
      this.user.addresses = userSelected.info
        ? userSelected.info.addresses
        : [];
      if (this.user.role == 3) {
        this.user.birthdate = userSelected.info.birthdate;
        this.user.gender = userSelected.info.gender;
      }
    },
    /**
     * Función que abre una sección a la derecha para Crear/Editar una dirección del usuario
     */
    openAddressDialog() {
      this.userDialog = false;
      setTimeout(() => {
        this.addressDialog = true;
      }, 700);
    },
    /**
     * Función que abre una sección a la derecha para Crear/Editar un usuario
     */
    openUserDialog() {
      this.addressDialog = false;
      setTimeout(
        () => {
          this.userDialog = true;
        },
        !this.userDialog && !this.addressDialog ? 150 : 700
      );
    },
    /**
     *  Función para encontrar dirección con los servicios de google (Falta conseguir nuestra propia Key)
     */
    async findAddress() {
      let geocodingUrl = `${this.address.street} ${this.address.numExt}, ${this.address.zipCode} ${this.address.city}, ${this.address.state}, México`;
      let response = await Vue.axios({
        method: "GET", 
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${geocodingUrl}&key=AIzaSyBykg1AabFvit-yDS4BU4AWBCdaKro_w2A`,
      });

      if (response.data.results.length > 0) {
        if (
          pointInPolygon(
            [
              response.data.results[0].geometry.location.lat,
              response.data.results[0].geometry.location.lng,
            ],
            this.zone.polygon
          )
        ) {
          this.address.zone_id = this.zone.id;
          this.address.latitude =
            response.data.results[0].geometry.location.lat;
          this.address.longitude =
            response.data.results[0].geometry.location.lng;
          return true;
        } else {
          this.show({
            text: "La ubicación no se encuentra dentro de las zonas disponibles",
            color: "red accent-3",
          });
          return false;
        }
      } else {
        this.show({
          text: "Ubicación no encontrada, favor de revisar la información ingresada",
          color: "red accent-3",
        });
        return false;
      }
    },
    /**
     * Función para crear una dirección
     */
    async _createAddress() {
      // Iniciar el loader
      this.loading();
      let validAddress = await this.findAddress();
      if (validAddress) {
        let response = await this.createAddress(this.address);
        if (response.status && response.status > 199 && response.status < 300) {
          // Consultar datos de usuario seleccionado
          await this.reloadUser();
          // Consultar datos de los usuarios que se encuentran en el buscador
          this.userSearchData.activeLoader = false;
          await this.fetchUsers(this.userSearchData);
          this.userSearchData.activeLoader = true;
          this.addressAction = "";
          this.openUserDialog();
          this.show({
            text: "El registro se ha realizado correctamente",
            color: "primary",
          });
        } else {
          let error = new ErrorHandler();
          this.show({
            text: error.formatError(response.status),
            color: "red accent-3",
          });
        }
      }
      // Quitar el loader
      this.loaded();
    },
    /**
     * Función para editar una dirección
     */
    async _updateAddress() {
      // Iniciar el loader
      this.loading();
      let validAddress = await this.findAddress();
      if (validAddress) {
        let response = await this.updateAddress(this.address);
        if (response.status && response.status > 199 && response.status < 300) {
          // Consultar datos de usuario seleccionado
          await this.reloadUser();
          // Consultar datos de los usuarios que se encuentran en el buscador
          this.userSearchData.activeLoader = false;
          await this.fetchUsers(this.userSearchData);
          this.userSearchData.activeLoader = true;
          this.addressAction = "";
          this.openUserDialog();
          this.show({
            text: "El registro se ha actualizado correctamente",
            color: "primary",
          });
        } else {
          let error = new ErrorHandler();
          this.show({
            text: error.formatError(response.status),
            color: "red accent-3",
          });
        }
      }
      // Quitar el loader
      this.loaded();
    },
    /**
     * Función para eliminar un estudio
     */
    async _deleteAddress() {
      // Iniciar el loader
      this.loading();
      let response = await this.deleteAddress(this.address);
      if (response.status && response.status > 199 && response.status < 300) {
        // Consultar datos de usuario seleccionado
        await this.reloadUser();
        // Consultar datos de los usuarios que se encuentran en el buscador
        await this.fetchUsers(this.userSearchData);
        this.deleteAddressDialog = false;
        this.deleteButtonLoader = false;
        this.openUserDialog();
        this.show({
          text: "El registro se ha eliminado correctamente",
          color: "primary",
        });
      } else {
        this.deleteButtonLoader = false;
        this.show({
          text: response.data.error,
          color: "red accent-3",
        });
      }
      // Quitar el loader
      this.loaded();
    },
    /**
     * Función que abre una sección a la derecha para crear una dirección
     * * La función reinicia el objeto address
     * * La función reinicia las validaciones del formulario
     */
    addAddress() {
      this.addressAction = "CREATE";
      this.address = JSON.parse(JSON.stringify(this.addressObj));
      this.address.customerId = this.user.id;
      this.openAddressDialog();
    },
    /**
     * Función que abre una sección a la derecha con los datos de la dirección seleccionada
     */
    selectAddress(addressSelected) {
      this.addressAction = "UPDATE";
      this.openAddressDialog();
      this.address.id = addressSelected.id;
      this.address.street = addressSelected.street;
      this.address.neighborhood = addressSelected.neighborhood;
      this.address.numExt = addressSelected.num_ext;
      this.address.numInt = addressSelected.num_int;
      this.address.state = addressSelected.state;
      this.address.references = addressSelected.references;
      this.address.city = addressSelected.city;
      this.address.zipCode = addressSelected.zip_code;
      this.address.latitude = addressSelected.latitude;
      this.address.longitude = addressSelected.longitude;
      this.address.customerId = this.user.id;
    },
    /**
     * Función para validar los caracteres del telefono
     * * Sirve para evitar que escriban letras en vez de números
     */
    validatePhone() {
      let re = /[^0-9]/gi;
      this.user.phone = this.user.phone.replace(re, "");
    },
    /**
     * Función para que al seleccionar una fecha de nacimiento solo se pueda seleccionar la fecha de los mayores de edad
     */
    getMaxDate() {
      let maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 18);
      return `${maxDate.getFullYear()}-${
        maxDate.getMonth() + 1
      }-${maxDate.getDate()}`;
    },
    /**
     * Función para dar formato de fecha YYYY-MM-DD.
     * @param {String} date Fecha inicial o final del evento.
     */
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  /**
   * Watcher que se ejecuta cada vez que dateMenu cambia de valor
   */
  watch: {
    dateMenu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  /**
   * Función mounted que se ejecuta automáticamente después de que se crea la vista
   * * Carga la lista de tipos de usuario
   * * Carga la lista se usuarios
   */
  async mounted() {
    this.userTypes = Keys.userTypes;
    this.userTypesSearcher.push(...Keys.userTypes);
    this.maxDate = this.getMaxDate();
    let response = await this.fetchUsers(this.userSearchData);
    if (response.status && response.status == 403) {
      this.show({ text: "La sesión ha expirado", color: "red" });
      this.logout();
      this.$router.push("/");
    }
  },
  async created() {
    await this.fetchZones();
    await this.fetchZone(1);
  },
  /**
   * Función que se ejecuta automáticamente después de abandonar esta vista
   * * Se limpia el estado de usersData que guardan la lista de usuarios
   */
  beforeDestroy() {
    this.clearUsersData();
  },
};
</script>
<style scoped>
.user-item {
  transition: all 0.6s;
}

.user-item:hover {
  transform: translateX(12px);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/*fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Estilos del contenedor de lista de usuarios*/

.user-list-container {
  direction: rtl;
  overflow-y: scroll;
}
.user-list-container p:not(:last-child) {
  margin-bottom: 1rem;
}

/* Tamaño del scroll */
.user-list-container::-webkit-scrollbar {
  width: 8px;
}

/* Estilos barra (thumb) de scroll */
.user-list-container::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 4px;
}

/*
.container::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}*/

.user-list-container::-webkit-scrollbar-thumb:hover {
  /*background: #b3b3b3;*/
  background: #ebebeb;
  /*box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);*/
}

/* Estilos track de scroll */
.user-list-container::-webkit-scrollbar-track {
  /*background: #e1e1e1;*/
  background: #cce9f5;
  border-radius: 4px;
}

.user-list-container::-webkit-scrollbar-track:hover,
.user-list-container::-webkit-scrollbar-track:active {
  /*background: #d4d4d4;*/
  background: #cce9f5;
}

/* Estilos del contenedor del detalle de usuario y dirección*/

.user-container {
  direction: rtl;
  overflow-y: scroll;
  overflow-x: hidden;
}
.user-container p:not(:last-child) {
  margin-bottom: 1rem;
}

/* Tamaño del scroll */
.user-container::-webkit-scrollbar {
  width: 8px;
}

/* Estilos barra (thumb) de scroll */
.user-container::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 4px;
}

/*
.container::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}*/

.user-container::-webkit-scrollbar-thumb:hover {
  /*background: #b3b3b3;*/
  background: #ebebeb;
  /*box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);*/
}

/* Estilos track de scroll */
.user-container::-webkit-scrollbar-track {
  /*background: #e1e1e1;*/
  background: #ddf0fa;
  border-radius: 4px;
}

.user-container::-webkit-scrollbar-track:hover,
.user-container::-webkit-scrollbar-track:active {
  /*background: #d4d4d4;*/
  background: #ddf0fa;
}
</style>