<!--Vista de reportes-->
<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col cols="12" class="pr-md-0 pb-0">
        <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl card-height">
          <v-card-text class="card-height">
            <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5">
              <v-col cols="12" sm="6">
                <p
                  class="headline primary--text mb-0 font-weight-bold"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? 'text-start'
                      : 'text-center'
                  "
                >
                  Reportes
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p
                  class="headline primary--text mb-0"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? 'text-end'
                      : 'text-center'
                  "
                >
                  {{ currentDateName }}
                </p>
              </v-col>
            </v-row>
            <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5">
              <v-col cols="12" md="6" lg="3" class="pb-0">
                <v-text-field
                  v-model="reportSearchData.customerName"
                  label="Nombre del cliente"
                  filled
                  rounded
                  background-color="white"
                  height="10"
                  readonly
                  prepend-inner-icon="mdi-account"
                  @click="openCustomerDialog()"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="3" class="pb-0">
                <v-select v-model="reportSearchData.phlebotomistId" label="Nombre del flebotomista" :items="phlebotomistsList" background-color="white" filled rounded cache-items @change="searchAppointments()" prepend-inner-icon="mdi-account">
                  <template slot="selection" slot-scope="data">
                    <span>{{ data.item.item }}</span>
                  </template>
                  <template slot="item" slot-scope="data">
                    <span>{{ data.item.item }}</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6" lg="2">
                <v-menu
                  v-model="dateMenuStartReport"
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
                    v-model="reportSearchData.from"
                    no-title
                    @input="dateMenuStartReport = false"
                    :max="reportSearchData.to"
                    locale="es"
                    @change="searchAppointments()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" lg="2">
                <v-menu
                  v-model="dateMenuEndReport"
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
                    v-model="reportSearchData.to"
                    no-title
                    @input="dateMenuEndReport = false"
                    :min="reportSearchData.from"
                    :max="getMaxDateAppointment()"
                    locale="es"
                    @change="searchAppointments()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" lg="2" class="d-flex justify-end">
                <v-tooltip top v-if="reportSearchData.customerInfoId != null || reportSearchData.phlebotomistId != null">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="red"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="clearSearcher()"
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
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="searchAppointments()"
                    >
                      <!--<v-icon dark> mdi-magnify </v-icon>-->
                      <nova-icon name="search" color="#FFFFFF" size="sm"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Buscar registros</span>
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
                      :loading="downloadReportLoader"
                      @click="$_getAppointmentsReport()"
                    >
                      <!--<v-icon dark> mdi-download </v-icon>-->
                      <nova-icon name="download" color="#FFFFFF" size="sm"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Descargar reporte</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <!--Estadíscticas (Venta tota, venta promedio por cita, Promedio de citas por día, Venta promedio por día, Venta promedio por paciente, Promedio de pacientes por día)-->
            <v-row v-if="Object.keys(reportData).length > 0 && !loaderVisible && reportData.appointment_count > 0" class="mx-1 mx-sm-5 mx-md-12">
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Venta total</span><span class="subtitle-2 green--text">{{reportData.total_sale | currency}}</span>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Venta promedio por cita</span><span class="subtitle-2 green--text">{{reportData.appoinment_sale_avg | currency}}</span>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Promedio de citas por día</span><span class="subtitle-2 green--text">{{reportData.appointments_per_day.toFixed(2)}}</span>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Venta promedio por día</span><span class="subtitle-2 green--text">{{reportData.total_sale_per_day | currency}}</span>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Venta promedio por paciente</span><span class="subtitle-2 green--text">{{reportData.patient_sale_avg | currency}}</span>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="d-flex justify-space-between">
                <span class="subtitle-2 font-weight-bold">Promedio de pacientes por cita</span><span class="subtitle-2 green--text">{{reportData.patients_appointment_avg.toFixed(2)}}</span>
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
            <v-row v-else-if="appointmentsData.data && appointmentsData.data.length > 0 && !loaderVisible">
              <v-col cols="12">
                <appointments-table :appointmentsHeaders="appointmentsHeaders" :appointmentsData="appointmentsData" :appointmentsSearchData="reportSearchData"></appointments-table>
              </v-col>
            </v-row>
            <v-row v-else :class="$vuetify.breakpoint.smAndUp?'not-available-message-container':''">
              <v-col cols="12" class="align-self-center">
                <p class="title font-weight-bold primary--text text-center">
                  No hay citas disponibles
                </p>
              </v-col>
            </v-row>
            <v-row v-if="appointmentsData.data && appointmentsData.data.length > 0" justify="center" class="mx-1 mx-sm-5 mx-md-12">
              <v-col
                v-if="$vuetify.breakpoint.smAndDown"
                cols="12"
                md="2"
                class="pa-0"
              >
                <v-select
                  label="Filas por página"
                  v-model="reportSearchData.perPage"
                  background-color="white"
                  type="number"
                  filled
                  rounded
                  dense
                  :items="[5, 10, 15, 20, 30, 50]"
                  @change="searchPaginationNumber()"
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
                      :disabled="reportSearchData.numberPage == 1"
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
                      :disabled="reportSearchData.numberPage == 1"
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
                  >Pag. {{ reportSearchData.numberPage }} de
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
                        reportSearchData.numberPage == appointmentsData.last_page
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
                        reportSearchData.numberPage == appointmentsData.last_page
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
                  v-model="reportSearchData.perPage"
                  background-color="white"
                  type="number"
                  filled
                  rounded
                  dense
                  :items="[5, 10, 15, 20, 30, 50]"
                  @change="searchPaginationNumber()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="Object.keys(reportData).length > 0 && !loaderVisible && reportData.appointment_count > 0">
              <v-col cols="12">
                <graphics :chartData="chartData" ></graphics>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--INICIO Dialog para buscar clientes-->
    <v-dialog v-model="customerSearcherDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
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
                    v-model="customerSearchData.search"
                    :label="$vuetify.breakpoint.mdAndUp?'Filtrar por nombre de cliente':'Cliente'"
                    filled
                    rounded
                    background-color="white"
                    dense
                    v-on:keyup.enter="searchCustomers()"
                    :maxLength="customersLoader?customerSearchData.search.length:100"
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
                        @click="searchCustomers()"
                      >
                        <!--<v-icon dark> mdi-magnify </v-icon>-->
                        <nova-icon name="search" color="#FFFFFF" size="sm"></nova-icon>
                      </v-btn>
                    </template>
                    <span>Buscar usuario</span>
                  </v-tooltip>
                </div>
              </v-col>
              <v-col v-if="customersLoader" cols="12" class="d-flex justify-center">
                <v-progress-circular
                  color="primary"
                  indeterminate
                  size="100"
                ></v-progress-circular>
              </v-col>
              <v-col v-else-if="customersData.data && customersData.data.length > 0 && !customersLoader" cols="12" class="py-0">
                <v-container
                  id="scroll-target"
                  :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group
                          v-model="selectedCustomer"
                        >
                          <template v-for="(item) in customersData.data">
                            <v-list-item :key="item.id" class="my-2 white rounded-xl">
                              <template v-slot:default="{ active }">
                                <v-list-item-content class="py-1">
                                  <v-list-item-title :class="active?'primary--text':''" v-text="`${item.name} ${item.last_name_father} ${item.last_name_mother}`"></v-list-item-title>

                                  <v-list-item-subtitle
                                    v-text="item.email"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>

                                  <v-icon
                                    v-if="active"
                                    color="primary"
                                  >
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
                <p class="headline text-center">No hay registros para mostrar</p>
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
            :disabled="selectedCustomer==null"
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
  </v-container>
</template>
<script>
import AppointmentsTable from "@/components/reports/AppointmentsTable";
import Graphics from "@/components/reports/Graphics";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    AppointmentsTable,
    Graphics
  },
  computed: {
    ...mapState("report", ["reportData", "appointmentsData"]),
    ...mapState("order", ["customersData"]),
    ...mapState("loader", ["loaderVisible"]),
    /**
     * Función para dar formato de la fecha inicial del evento.
     */
    initialDateFormatted() {
      return this.formatDate(this.reportSearchData.from.substring(0, 10));
    },
    /**
     * Función para dar formate de la fecha final del evento.
     */
    finalDateFormatted() {
      return this.formatDate(this.reportSearchData.to.substring(0, 10));
    },
  },
  data() {
    return {
      // Fechas
      dateMenuStartReport: false,
      dateMenuEndReport: false,
      reportSearchData: {
        perPage: 10,
        numberPage: 1,
        customerInfoId: null,
        phlebotomistId: null,
        orderStateId: "",
        from: "",
        to: "",
        activeLoader: true,
      },
      customerSearchData: {
        perPage: 10,
        numberPage: 1,
        search: "",
        activeLoader: false
      },
      phlebotomistSearchData: {
        activeLoader: false
      },
      chartData: {},
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
          align: "start",
          text: "Flebotomista",
          value: "phlebotomist",
        },
        {
          align: "center",
          text: "Fecha de creación",
          value: "createdAt",
        },
        {
          align: "center",
          text: "Fecha de cita",
          value: "appointment",
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
      ],
      selectedCustomer: null,
      currentDateName: "",
      phlebotomistsList: [],
      // Dialogs
      customerSearcherDialog: false,
      // Loaders
      customersLoader: false,
      searchFieldLoader: false,
      downloadReportLoader: false,
    }
  },
  methods: {
    ...mapActions("order", ["fetchCustomersData", "fetchPhlebotomistsData"]),
    ...mapActions("report",["fetchReportData", "getAppointmentsReport", "fetchAppointmentsData"]),
    ...mapMutations("auth", ["logout"]),
    ...mapMutations("report", ["clearReportData"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    ...mapMutations("notification", ["show"]),
    /**
     * Aplicar filtros de búsqueda a las citas
     */
    async searchAppointments() {
      this.reportSearchData.numberPage = 1;
      let response = await this.fetchAppointmentsData(this.reportSearchData);
      this.clearReportData();
      let responseReports = await this.fetchReportData(this.reportSearchData);
      this.chartData = responseReports.data.data;
    },
    /**
     * Función que sirve para agregar un cliente al buscador
     */
    async addCustomerToSearcher() {
      let customer = this.customersData.data[this.selectedCustomer];
      this.reportSearchData.customerInfoId = parseInt(customer.info.id);
      this.reportSearchData.customerName = `${customer.name} ${customer.last_name_father} ${customer.last_name_mother}`;
      this.customerSearcherDialog = false;
      this.reportSearchData.numberPage = 1;
      await this.fetchAppointmentsData(this.reportSearchData);
      this.clearReportData();
      await this.fetchReportData(this.reportSearchData);
    },
    /**
     * Buscar citas al momento de cambiar la cantidad de registros en el páginado
     */
    async searchPaginationNumber() {
      this.reportSearchData.numberPage = 1;
      let response = await this.fetchAppointmentsData(this.reportSearchData);
    },
    /**
     * Función para buscar clientes.
     * Esto sirve para que después de seleccionar el cliente se filtran los resultados de la tabla de citas
     */
    async searchCustomers() {
      this.searchFieldLoader = true;
      this.customersLoader = true;
      // Reiniciar en número de página después de realizar una búsqueda
      this.customerSearchData.numberPage = 1;
      let response = await this.fetchCustomersData(this.customerSearchData);
      this.customersLoader = false;
      this.searchFieldLoader = false;
    },
    /**
     * Función para descargar el reporte de las solicitudes
     */
    async $_getAppointmentsReport() {
      this.downloadReportLoader = true;
      let response = await this.getAppointmentsReport(this.reportSearchData);
      if (response.status && response.status > 199 && response.status < 300) {
        this.show({
          text: "El reporte se ha descargado correctamente",
          color: "primary",
        });
      } else {
        this.show({
          text: "Ha ocurrido un problema al descargar el reporte",
          color: "red accent-3",
        });
      }
      this.downloadReportLoader = false;
    },
    /**
     * Función para limpiar los parámetros de búsqueda
     */
    async clearSearcher() {
      this.resetInitialValues();
      await this.fetchAppointmentsData(this.reportSearchData);
      this.clearReportData();
      let responseReports = await this.fetchReportData(this.reportSearchData);
      this.chartData = responseReports.data.data;
    },
    /**
     * Restaurar valores iniciales en los filtros de búsqueda
     */
    resetInitialValues() {
      this.reportSearchData.numberPage = 1;
      this.reportSearchData.customerInfoId = null;
      this.reportSearchData.phlebotomistId = null;
      this.reportSearchData.customerName = "";
      this.getInitialFilterDates();
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
     * Función de paginación para la tabla de citas
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la tabla
     */
    async pagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.reportSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.reportSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.reportSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.reportSearchData.numberPage = this.appointmentsData.last_page;
      }
      await this.fetchAppointmentsData(this.reportSearchData);
    },
    /**
     * Función de paginación para la lista de clientes
     * * Esta función se manda a llamar desde el v-display de clientes
     */
    async customerPagination(buttonPressed) {
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
     * Función para obtener la lista de flebotomistas y mostrarlos en el campo de "Nombre de flebotomista"
     *  y que sirvan para filtrar los resultados de las citas
     */
    async $_fetchPhlebotomistsData() {
      let response = await this.fetchPhlebotomistsData(this.phlebotomistSearchData);
      if (response.status && response.status > 199 && response.status < 300) {
        let flebotomistas = response.data.data.data;
        this.phlebotomistsList = flebotomistas.map(flebotomista => {
          return {
            item: `${flebotomista.name} ${flebotomista.last_name_father} ${flebotomista.last_name_mother}`,
            value: flebotomista.id
          };
        });
      }
      this.phlebotomistsDialog = true;
    },
    /**
     * Poner fecha en la parte superior de la vista
     */
    formatCurrentDateName() {
      let date = new Date();
      date = date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      let dateArray = date.split("/");
      let monthNames = [
        "enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      let day = parseInt(dateArray[0]);
      let monthNumber = parseInt(dateArray[1]) - 1;
      let month = monthNames[monthNumber];
      let year = parseInt(dateArray[2]);

      return `${day} de ${month} del ${year}`;
    },
    /**
     * Función para solo poder poner en los filtros de búsqueda máximo 14 días
     */
    getMaxDateAppointment() {
      let todayDate = new Date();
      todayDate.setDate(todayDate.getDate()+ 13);
      const year = todayDate.getFullYear();
      const month = ("0" + (todayDate.getMonth() + 1)).slice(-2);
      let day = ("0" + (todayDate.getDate())).slice(-2);
      return `${year}-${month}-${day}`;
    },
    /**
     * Función para dar formato de fecha YYYY-MM-DD.
     * @param {String} date Fecha inicial o final de la citas.
     */
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    /**
     * Obtener la fecha que tendrá por default el filtro de búsqueda de citas
     */
    getInitialFilterDates() {
      let date = new Date();
      let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDate = new Date();
      lastDate.setDate(lastDate.getDate()+13);
      this.reportSearchData.from = firstDate.toISOString().split('T')[0];
      this.reportSearchData.to = lastDate.toISOString().split('T')[0];
    }
  },
  /**
   * Función que se ejecuta al abrir la vista de "Reportes". En este apartado se preparan todos los datos para ser mostrados en la vista
   */
  async mounted() {
    this.loading();
    try {
      this.currentDateName = this.formatCurrentDateName();
      this.getInitialFilterDates();
      await this.$_fetchPhlebotomistsData();
      this.reportSearchData.activeLoader = false;
      let responseReports = await this.fetchReportData(this.reportSearchData);

      // Comprobar que la petición se realizó correctamente
      if (responseReports.status && responseReports.status > 199 && responseReports.status < 300) {
        this.chartData = responseReports.data.data;
        await this.fetchAppointmentsData(this.reportSearchData);
        this.reportSearchData.activeLoader = true;
        this.loaded();
      }
      // Comprobar si la sesión no ha exipirado
      else if (responseReports.status && responseReports.status == 403) {
        this.show({ text: "La sesión ha expirado", color: "red" });
        this.logout();
        this.loaded();
        this.$router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loaded();
    }

  }
}
</script>
<style scoped>
.card-height {
  min-height: 60vh;
}
.not-available-message-container {
  min-height: 30vh;
}
.align-self-center {
  align-self: center
}
</style>