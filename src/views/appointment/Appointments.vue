<!--Vista para administrar las citas-->
<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col cols="12" class="pr-md-0 pb-0">
        <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl">
          <v-card-text>
            <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5">
              <v-col cols="12" md="6" lg="4" class="pb-0">
                <v-text-field
                  v-model="appointmentsSearchData.customerName"
                  label="Nombre del cliente"
                  filled
                  rounded
                  background-color="white"
                  height="10"
                  readonly
                  @click="openCustomerDialog()"
                  @click:clear="clearCustomerButton()"
                  clearable
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="2" class="pb-0">
                <v-select
                  v-model="appointmentsSearchData.orderStateId"
                  label="Estatus de la cita"
                  filled
                  rounded
                  background-color="white"
                  :items="orderStatusSearcher"
                  @change="searchAppointments()"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" lg="2">
                <v-menu
                  v-model="dateMenuStartAppointment"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="initialDateFormatted"
                      label="Fecha inicial"
                      persistent-hint
                      readonly
                      filled
                      rounded
                      background-color="white"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="appointmentsSearchData.from"
                    no-title
                    @input="dateMenuStartAppointment = false"
                    :max="appointmentsSearchData.to"
                    locale="es"
                    @change="
                      appointmentsSearchData.from != '' &&
                      appointmentsSearchData.to != ''
                        ? searchAppointments()
                        : null
                    "
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" lg="2">
                <v-menu
                  v-model="dateMenuEndAppointment"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="finalDateFormatted"
                      label="Fecha final"
                      persistent-hint
                      readonly
                      filled
                      rounded
                      background-color="white"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="appointmentsSearchData.to"
                    no-title
                    @input="dateMenuEndAppointment = false"
                    :min="appointmentsSearchData.from"
                    :max="getMaxDateAppointment()"
                    locale="es"
                    @change="
                      appointmentsSearchData.from != '' &&
                      appointmentsSearchData.to != ''
                        ? searchAppointments()
                        : null
                    "
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" lg="2" class="d-flex justify-end">
                <v-tooltip
                  top
                  v-if="
                    appointmentsSearchData.customerInfoId != null ||
                    appointmentsSearchData.orderStateId != '' ||
                    appointmentsSearchData.from != '' ||
                    appointmentsSearchData.to != ''
                  "
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="accent"
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="clearSearcher()"
                      elevation="0"
                    >
                      <!--<v-icon dark>mdi-broom</v-icon>-->
                      <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Limpiar búsqueda</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="accent"
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="searchAppointments()"
                      elevation="0"
                    >
                      <!--<v-icon dark> mdi-magnify </v-icon>-->
                      <nova-icon
                        name="search"
                        color="#FFFFFF"
                        size="sm"
                      ></nova-icon>
                    </v-btn>
                  </template>
                  <span>Buscar citas</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="accent"
                      small
                      v-bind="attrs"
                      v-on="on"
                      to="/citas/crear-cita"
                      elevation="0"
                    >
                      <!--<v-icon dark> mdi-plus </v-icon>-->
                      <nova-icon name="add" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Agregar cita</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <!--Agregar validación para saber si existen registros mostrar la tabla-->
            <v-row v-if="loaderVisible">
              <v-col cols="12">
                <p class="title font-weight-bold primary--text text-center">
                  Cargando registros...
                </p>
              </v-col>
            </v-row>
            <v-row
              v-else-if="
                appointmentsData.data &&
                appointmentsData.data.length > 0 &&
                !loaderVisible
              "
            >
              <v-col cols="12">
                <v-data-table
                  class="rounded-xl mx-1 mx-sm-5 mx-md-12 mb-5"
                  no-data-text="No hay datos disponibles."
                  no-results-text="No hay datos disponibles."
                  loading-text="Cargando datos..."
                  :calculate-widths="true"
                  dense
                  :headers="appointmentsHeaders"
                  :items="appointmentsData.data"
                  hide-default-header
                  disable-sort
                  hide-default-footer
                  :items-per-page="appointmentsSearchData.perPage"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr
                        v-if="$vuetify.breakpoint.smAndUp"
                        class="background-tr-color"
                      >
                        <th :class="`text-${appointmentsHeaders[0].align}`">
                          {{ appointmentsHeaders[0].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[1].align}`">
                          {{ appointmentsHeaders[1].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[2].align}`">
                          {{ appointmentsHeaders[2].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[3].align}`">
                          {{ appointmentsHeaders[3].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[4].align}`">
                          {{ appointmentsHeaders[4].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[5].align}`">
                          {{ appointmentsHeaders[5].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[6].align}`">
                          {{ appointmentsHeaders[6].text }}
                        </th>
                        <th :class="`text-${appointmentsHeaders[7].align}`">
                          {{ appointmentsHeaders[7].text }}
                        </th>
                      </tr>
                      <tr
                        v-for="(item, index) in items"
                        :key="index"
                        :class="[
                          $vuetify.breakpoint.xsOnly
                            ? 'v-data-table__mobile-table-row'
                            : '',
                        ]"
                      >
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[0].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[0].align}`
                            "
                          >
                            {{ item.id }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[1].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[1].align}`
                            "
                          >
                            {{ item.customer ? item.customer.user.name : "" }}
                            {{
                              item.customer
                                ? item.customer.user.last_name_father
                                : ""
                            }}
                            {{
                              item.customer
                                ? item.customer.user.last_name_mother
                                : ""
                            }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[2].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[2].align}`
                            "
                          >
                            {{ formatAppointmentDate(item.start_date) }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[3].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[3].align}`
                            "
                          >
                            {{ formatAppointmentHour(item.start_date) }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[4].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[4].align}`
                            "
                          >
                            {{ item.status.name }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[5].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[5].align}`
                            "
                          >
                            {{ item.patients ? item.patients.length : "NA" }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[6].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[6].align}`
                            "
                          >
                            {{ item.cost | currency }}
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row pt-6'
                              : ''
                          "
                        >
                          <div
                            class="font-weight-bold mr-2 v-data-table__mobile-row__header d-flex d-sm-none"
                          >
                            {{ appointmentsHeaders[7].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : `d-flex justify-${appointmentsHeaders[7].align}`
                            "
                          >
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="mx-2 my-2"
                                  fab
                                  dark
                                  color="orange"
                                  x-small
                                  v-bind="attrs"
                                  v-on="on"
                                  :to="`/citas/detalle-cita/${item.id}`"
                                  elevation="0"
                                >
                                  <!--<v-icon dark> mdi-form-select </v-icon>-->
                                  <nova-icon
                                    name="edit"
                                    color="#FFFFFF"
                                    size="sm"
                                  ></nova-icon>
                                </v-btn>
                              </template>
                              <span>Ver detalle de cita</span>
                            </v-tooltip>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <p class="title font-weight-bold primary--text text-center">
                  No se encontraron citas
                </p>
              </v-col>
            </v-row>
            <v-row
              v-if="appointmentsData.data && appointmentsData.data.length > 0"
              justify="center"
              class="mx-1 mx-sm-5 mx-md-12"
            >
              <v-col
                v-if="$vuetify.breakpoint.smAndDown"
                cols="12"
                md="2"
                class="pa-0"
              >
                <v-select
                  label="Filas por página"
                  v-model="appointmentsSearchData.perPage"
                  background-color="white"
                  type="number"
                  filled
                  rounded
                  dense
                  :items="[5, 10, 15, 20, 30, 50]"
                  @change="searchAppointments()"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="8"
                offset-md="2"
                class="d-flex justify-center align-center pa-0"
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
                      :disabled="appointmentsSearchData.numberPage == 1"
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
                      :disabled="appointmentsSearchData.numberPage == 1"
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
                  >Pag. {{ appointmentsSearchData.numberPage }} de
                  {{ appointmentsData.last_page }}</span
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
                      :disabled="
                        appointmentsSearchData.numberPage ==
                        appointmentsData.last_page
                      "
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
                      :disabled="
                        appointmentsSearchData.numberPage ==
                        appointmentsData.last_page
                      "
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
              <v-col
                v-if="$vuetify.breakpoint.mdAndUp"
                cols="12"
                md="2"
                class="pa-0"
              >
                <v-select
                  label="Filas por página"
                  v-model="appointmentsSearchData.perPage"
                  background-color="white"
                  type="number"
                  filled
                  rounded
                  dense
                  :items="[5, 10, 15, 20, 30, 50]"
                  @change="searchAppointments()"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--INICIO Dialog para buscar clientes-->
    <v-dialog v-model="customerSearcherDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text
          class="rounded-xl"
          :class="$vuetify.breakpoint.smAndUp ? '' : 'px-0'"
        >
          <v-container>
            <v-row>
              <!--<v-col cols="12" class="d-flex justify-end pb-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="error"
                      outlined
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="customerSearcherDialog = false"
                    >
                      <v-icon dark> mdi-close </v-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar</span>
                </v-tooltip>
              </v-col>-->
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-6">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Clientes
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0">
                <div class="d-flex flex-row">
                  <v-text-field
                    v-model.lazy="customerSearchData.search"
                    :label="
                      $vuetify.breakpoint.mdAndUp
                        ? 'Filtrar por nombre de cliente'
                        : 'Cliente'
                    "
                    filled
                    rounded
                    background-color="white"
                    dense
                    v-on:keyup.enter="searchCustomers()"
                    @input="Search"
                    :maxLength="
                      customersLoader ? customerSearchData.search.length : 100
                    "
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
                        v-bind="attrs"
                        v-on="on"
                        @click="searchCustomers()"
                        elevation="0"
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
                  <!--Añadir usuario dentro de búsqueda-->
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
                        @click="addCustomerDialog = true"
                      >
                        <!--<v-icon dark> mdi-plus </v-icon>-->
                        <nova-icon name="add" color="#FFFFFF"></nova-icon>
                      </v-btn>
                    </template>
                    <span>Agregar cliente</span>
                  </v-tooltip>
                </div>
              </v-col>

              <!--Dialog añadir usuario-->
              <v-dialog v-model="addCustomerDialog" max-width="700">
                <v-card color="lightBlue" class="rounded-xl select">
                  <v-container>
                    <v-form
                      ref="formUser"
                      v-model="validUserForm"
                      lazy-validation
                    >
                      <v-row>
                        <v-col cols="12" class="pt-6">
                          <p
                            class="headline font-weight-bold text-center primary--text"
                          >
                            Agregar cliente
                          </p>
                        </v-col>
                      </v-row>
                      <v-row class="px-3 px-md-10 px-lg-15">
                        <v-col cols="12" class="py-0">
                          <v-text-field
                            v-model="user.name"
                            label="Nombre"
                            background-color="white"
                            filled
                            rounded
                            dense
                            maxlength="30"
                            :rules="nameRules"
                          >
                          </v-text-field>
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
                          >
                          </v-text-field>
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
                          >
                          </v-text-field>
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
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="py-0">
                          <v-text-field
                            label="Email"
                            v-model="user.email"
                            background-color="white"
                            filled
                            rounded
                            dense
                            @keyup="
                              user.email = user.email.toLowerCase().trim()
                            "
                            :rules="emailRules"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="py-0">
                          <v-text-field
                            label="Contraseña"
                            v-model="user.password"
                            background-color="white"
                            filled
                            rounded
                            dense
                            autocomplete="new-password"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="passwordRules"
                          >
                          </v-text-field>
                        </v-col>

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
                            label="Genero"
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
                    <v-card-actions class="d-flex justify-end pb-5 pr-15">
                      <v-btn
                        color="error"
                        @click="addCustomerDialog = false"
                        rounded
                        >Cancelar
                        </v-btn>
                      <v-btn
                        color="primary"
                        rounded
                        @click="_createUser()"
                        :disabled="
                          user.name == '' ||
                          user.lastNameFather == '' ||
                          user.lastNameMother == '' ||
                          user.phone == '' ||
                          user.password == '' ||
                          !validUserForm
                        "
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-dialog>

              <!--Fin Dialog añadir usuario-->

              <v-col
                v-if="customersLoader"
                cols="12"
                class="d-flex justify-center"
              >
                <v-progress-circular
                  color="primary"
                  indeterminate
                  size="100"
                ></v-progress-circular>
              </v-col>
              <v-col
                v-else-if="
                  customersData.data &&
                  customersData.data.length > 0 &&
                  !customersLoader
                "
                cols="12"
                class="py-0"
              >
                <v-container
                  id="scroll-target"
                  :style="
                    $vuetify.breakpoint.mdAndUp
                      ? 'max-height: 550px'
                      : 'max-height: 45vh'
                  "
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group v-model="selectedCustomer">
                          <template v-for="item in customersData.data">
                            <v-list-item
                              :key="item.id"
                              class="my-2 white rounded-xl"
                            >
                              <template v-slot:default="{ active }">
                                <v-list-item-content class="py-1">
                                  <v-list-item-title
                                    :class="active ? 'primary--text' : ''"
                                    v-text="
                                      `${item.name} ${item.last_name_father} ${item.last_name_mother}`
                                    "
                                  ></v-list-item-title>

                                  <v-list-item-subtitle
                                    v-text="item.email"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-icon v-if="active" color="primary">
                                    mdi-check-circle
                                  </v-icon>
                                </v-list-item-action>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col v-else cols="12">
                <p class="headline text-center">
                  No hay registros para mostrar
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center align-center pa-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="secondary"
                      icon
                      small
                      :disabled="customerSearchData.numberPage == 1"
                      v-bind="attrs"
                      v-on="on"
                      @click="customerPagination('firstPage')"
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
                      :disabled="customerSearchData.numberPage == 1"
                      v-bind="attrs"
                      v-on="on"
                      @click="customerPagination('previous')"
                    >
                      <v-icon dark> mdi-chevron-left </v-icon>
                    </v-btn>
                  </template>
                  <span>Anterior</span>
                </v-tooltip>
                <span
                  >Pag. {{ customerSearchData.numberPage }} de
                  {{ customersData.last_page }}</span
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
                      :disabled="
                        customerSearchData.numberPage == customersData.last_page
                      "
                      v-bind="attrs"
                      v-on="on"
                      @click="customerPagination('next')"
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
                      :disabled="
                        customerSearchData.numberPage == customersData.last_page
                      "
                      v-bind="attrs"
                      v-on="on"
                      @click="customerPagination('lastPage')"
                    >
                      <v-icon dark> mdi-chevron-double-right </v-icon>
                    </v-btn>
                  </template>
                  <span>Última página</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="customerSearcherDialog = false"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="selectedCustomer == null"
            color="primary"
            rounded
            @click="addCustomerToSearcher()"
          >
            <span class="px-5">Aceptar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para buscar clientes-->
    <v-dialog v-model="appointmentDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Datos de cita
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <p class="subtitle-1 text-center">
                  En este pop up saldrán los datos de la cita seleccionada
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn color="error" rounded @click="appointmentDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="primary" rounded @click="appointmentDialog = false"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { Keys } from "../../share/Keys";
import { validations } from "@/share/Validations";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("order", ["appointmentsData", "customersData"]),
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

    /**
     * Función para dar formato de la fecha inicial del evento.
     */
    initialDateFormatted() {
      return this.formatDate(this.appointmentsSearchData.from.substring(0, 10));
    },
    /**
     * Función para dar formate de la fecha final del evento.
     */
    finalDateFormatted() {
      return this.formatDate(this.appointmentsSearchData.to.substring(0, 10));
    },
  },
  data() {
    return {
      validUserForm: false,
      orderStatus: [],
      orderStatusSearcher: [{ text: "Todos", value: "" }],
      appointmentsHeaders: [
        {
          align: "center",
          text: "Id",
          value: "id",
        },
        {
          align: "start",
          text: "Cliente",
          value: "client",
        },
        {
          align: "center",
          text: "Fecha",
          value: "appointment",
        },
        {
          align: "center",
          text: "Hora",
          value: "hour",
        },
        {
          align: "center",
          text: "Estatus",
          value: "status",
        },
        {
          align: "center",
          text: "N. pacientes",
          value: "patiensQty",
        },
        {
          align: "center",
          text: "Costo",
          value: "amount",
        },
        {
          align: "center",
          text: "Acciones",
          value: "actions",
        },
      ],

      userSearchData: {
        perPage: 10,
        numberPage: 1,
        role: "",
        search: "",
        activeLoader: true,
      },

      genderTypes: [
        { text: "Hombre", value: "Hombre" },
        { text: "Mujer", value: "Mujer" },
      ],

      //añadido*}
      userAccion: "",
      userTypes: [],
      userTypesSearcher: [{ text: "Todos", value: "" }],
      dateMenu: false,
      activePicker: null,
      showPass: false,
      user: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        password: "",
        role: "3",
        phone: "",
        birthdate: "",
        gender: "",
        //zones: "",
        addresses: [],
      },
      // Fechas
      dateMenuStartAppointment: false,
      dateMenuEndAppointment: false,
      appointmentsSearchData: {
        perPage: 10,
        numberPage: 1,
        customerInfoId: null,
        orderStateId: "",
        from: "",
        to: "",
        activeLoader: true,
      },
      customerSearchData: {
        perPage: 10,
        numberPage: 1,
        search: "",
        activeLoader: false,
      },
      selectedCustomer: null,
      // Dialogs
      appointmentDialog: false,
      customerSearcherDialog: false,
      addCustomerDialog: false,
      // Loaders
      customersLoader: false,
      searchFieldLoader: false,

      //Validaciones del formulario de usuario
      //roleRules: validations.generalMValidation({
      //required: true,
      //name: "rol de usuario",
      //}),
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
    };
  },
  methods: {
    ...mapActions("order", [
      "fetchAppointmentsData",
      "fetchCustomersData",
      "user",
      "fetchUsers",
      "fetchUser",
      "createUser",
      "updateUser",
      "deleteUser",
      "createAddress",
      "updateAddress",
      "deleteAddress",
    ]),
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
     * Función para obtener la lista de citas
     */
    async searchAppointments() {
      let response = await this.fetchAppointmentsData(
        this.appointmentsSearchData
      );
    },
    /**
     * Función para limpiar el campo de búsqueda por cliente.
     * Al dar click en la X que se muestra al final del campo de seleccionar paciente se ejecuta esta función
     */
    async clearCustomerButton() {
      this.appointmentsSearchData.customerInfoId = null;
      let response = await this.fetchAppointmentsData(
        this.appointmentsSearchData
      );
    },
    /**
     * Función mounted que se ejecuta automáticamente después de que se crea la vista
     * * Carga la lista de tipos de usuario
     * * Carga la lista se usuarios
     */
    async mounted() {
      this.userTypes = Keys.userTypes;
      console.log(this.userTypes);
      this.userTypesSearcher.push(...Keys.userTypes);
      this.maxDate = this.getMaxDate();
      let response = await this.fetchUsers(this.userSearchData);
      if (response.status && response.status == 403) {
        this.show({ text: "La sesión ha expirado", color: "red" });
        this.logout();
        this.$router.push("/");
      }
    },
    /**
     * Función para limpiar los parámetros de búsqueda
     */
    async clearSearcher() {
      this.resetInitialValues();
      await this.fetchAppointmentsData(this.appointmentsSearchData);
    },
    /**
     * Función para buscar en tiempo real
     */
    Search() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchCustomers();
      }, 300);
    },
    /**
     * Función para buscar y obtener los clientes (Se buscan los clientes con la finalidad de filtrar la búsqueda de citas)
     */
    async searchCustomers() {
      this.searchFieldLoader = true;
      this.customersLoader = true;
      // Quitar la selección de cliente
      this.selectedCustomer = null;
      // Reiniciar en número de página después de realizar una búsqueda
      this.customerSearchData.numberPage = 1;
      let response = await this.fetchCustomersData(this.customerSearchData);
      this.customersLoader = false;
      this.searchFieldLoader = false;
    },
    /**
     * Función para crear un usuario
     */
    async _createUser() {
      if (this.validateFormUser()) {
        // Iniciar el loader
        this.loading();
        let response = await this.createUser(this.user);
        console.log("respuesta", response);
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
          this.$refs.formUser.resetValidation();
          this.addCustomerDialog = false;
        } else {
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
     * Función para validar los caracteres del telefono
     * * Sirve para evitar que escriban letras en vez de números
     */
    validatePhone() {
      let re = /[^0-9]/gi;
      this.user.phone = this.user.phone.replace(re, "");
    },
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
    /**
     * Watcher que se ejecuta cada vez que dateMenu cambia de valor
     */
    /*watch: {
      dateMenu(val) {
        val && setTimeout(() => (this.activePicker = "YEAR"));
      },
    },*/

    /**
     * Función que sirve para agregar un cliente al buscador
     */
    async addCustomerToSearcher() {
      let customer = this.customersData.data[this.selectedCustomer];
      this.appointmentsSearchData.customerInfoId = parseInt(customer.info.id);
      this.appointmentsSearchData.customerName = `${customer.name} ${customer.last_name_father} ${customer.last_name_mother}`;
      this.customerSearcherDialog = false;
      this.appointmentsSearchData.numberPage = 1;
      await this.fetchAppointmentsData(this.appointmentsSearchData);
    },
    /**
     * Función para abrir el v-dialog de clientes y seleccionar alguno para posteriormente buscarlo
     */
    async openCustomerDialog() {
      this.customersLoader = true;
      this.selectedCustomer = null;
      this.customerSearcherDialog = true;
      this.customerSearchData.perPage = 10; // Cambiar por 10
      this.customerSearchData.numberPage = 1;
      this.customerSearchData.search = "";
      await this.fetchCustomersData(this.customerSearchData);
      this.customersLoader = false;
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
     * Función de paginación para la tabla de citas
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la tabla
     */
    async pagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.appointmentsSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.appointmentsSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.appointmentsSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.appointmentsSearchData.numberPage =
          this.appointmentsData.last_page;
      }
      await this.fetchAppointmentsData(this.appointmentsSearchData);
    },
    /**
     * Función de paginación para la lista de clientes
     * * Esta función se manda a llamar desde el v-display de clientes
     */
    async customerPagination(buttonPressed) {
      // Quitar la selección de cliente
      this.selectedCustomer = null;
      if (buttonPressed == "firstPage") {
        this.customerSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.customerSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.customerSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.customerSearchData.numberPage = this.customersData.last_page;
      }
      this.customersLoader = true;
      await this.fetchCustomersData(this.customerSearchData);
      this.customersLoader = false;
    },
    /**
     * Mostrar un pop up con los datos de la cita seleccionada
     * La función es llamada desde la tabla de citas
     */
    selectAppointment(appointment) {
      this.appointmentDialog = true;
    },
    /**
     * Restaurar valores iniciales en los filtros de búsqueda
     */
    resetInitialValues() {
      this.appointmentsSearchData.numberPage = 1;
      this.appointmentsSearchData.customerInfoId = null;
      this.appointmentsSearchData.customerName = "";
      this.appointmentsSearchData.orderStateId = "";
      // En los filtros de búsqueda poner de fecha inicial el día actual y de fecha final, 7 días después
      let todayDate = new Date();
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      this.appointmentsSearchData.from = `${todayDate.getFullYear()}-${
        todayDate.getMonth() + 1
      }-${todayDate.getDate()}`;
      this.appointmentsSearchData.to = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()}`;
    },
    /**
     * Función para dar formato de fecha YYYY-MM-DD.
     * @param {String} date Fecha inicial o final del evento.
     */
    
    /**
     * Función para solo poder poner en los filtros de búsqueda máximo 14 días
     */
    getMaxDateAppointment() {
      let todayDate = new Date();
      todayDate.setDate(todayDate.getDate() + 13);

      const year = todayDate.getFullYear();
      const month = ("0" + (todayDate.getMonth() + 1)).slice(-2);
      let day = ("0" + todayDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    /**
     * Función para dar formato a la fecha de la cita que se muestra en la tabla
     */
    formatAppointmentDate(date) {
      const [year, month, day] = date.substring(0, 10).split("-");
      return `${day}/${month}/${year}`;
    },
    /**
     * Función para dar formato a la hora de la cita que se muestra en la tabla
     */
    formatAppointmentHour(date) {
      const [hour, minute, second] = date.substring(11, 19).split(":");
      return `${hour}:${minute}`;
    },
  },
  /**
   * Esta función se ejecuta al cargar la vista.
   * Sirve para preparar todos los datos que se van a mostrar inicialmente
   */
  async mounted() {
    this.orderStatus = Keys.orderStatus;
    this.orderStatusSearcher.push(...Keys.orderStatus);

    this.resetInitialValues();
    let response = await this.fetchAppointmentsData(
      this.appointmentsSearchData
    );

    if (response.status && response.status == 403) {
      this.show({ text: "La sesión ha expirado", color: "red" });
      this.logout();
      this.$router.push("/");
    }
  },

  async openCustomerDialog() {
    this.customersLoader = true;
    this.selectedCustomer = null;
    this.customerSearcherDialog = true;
    this.customerSearchData.perPage = 10; // Cambiar por 10
    this.customerSearchData.numberPage = 1;
    this.customerSearchData.search = "";
    await this.fetchCustomersData(this.customerSearchData);
    this.customersLoader = false;
  },
};
</script>
<style scoped>
.background-tr-color {
  background-color: #cfd8dc;
}

.select {
  width: 700px;
  height: 100%;
}
</style>