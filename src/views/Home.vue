<!--Pantalla principal del tablero de administrador-->
<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col cols="12" class="pr-md-0 pb-0">
        <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl card-height">
          <v-card-text>
            <v-row  class="px-1 px-sm-4 px-md-10">
              <v-col cols="12">
                <p class="title mb-0 mt-3">Ubicación de flebotomistas</p>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" md="4" class="py-0" v-for="item in currentPhlebotomists" :key="item.id">
                    <p class="subtitle-1 font-weight-bold mb-0">{{item.name}}
                    <v-icon
                      large
                      :color="item.color"
                    >
                      mdi-square-rounded
                    </v-icon>
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <div>
                  <gmap-map :center="center" :zoom="$vuetify.breakpoint.lgAndUp?12:11" :options="mapOptions" class="map-container rounded-xl" ref="map">
                    <gmap-polygon :paths="polygons" :options="{geodesic:true, strokeColor:'#006cb7', fillColor:'#7ACEF1'}" @click="selectZone"></gmap-polygon>
                    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                    </gmap-info-window>
                    <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :clickable="false"
                      :draggable="false"
                      :icon="{ path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z', fillColor: m.color, fillOpacity: 1, strokeWeight: .5, scale: m.scale }"
                    >
                    </gmap-marker>
                    <gmap-polyline v-for="line in lines" :key="'line'+line.phlebotomistId" v-bind:path.sync="line.path" v-bind:options="{ strokeColor:line.color, strokeOpacity: .7 }">
                    </gmap-polyline>
                  </gmap-map>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0 my-3 lightCyan">
                <v-tabs v-model="tab" background-color="lightCyan" class="px-sm-4">
                  <v-tabs-slider color="primary"></v-tabs-slider>
                  <v-tab href="#regularSchedule"> Citas del día </v-tab>
                  <v-tab href="#extraordinarySchedule">
                    Citas extraordinarias
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" class="lightCyan">
                  <v-tab-item value="regularSchedule">
                    <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5 d-flex justify-end">
                      <v-col cols="12" sm="4" lg="3">
                        <v-menu
                          v-model="currentDateMenu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateFormatted"
                              label="Fecha de la cita"
                              persistent-hint
                              readonly
                              v-on="on"
                              background-color="white"
                              filled
                              rounded
                              :disabled="dateAppointmentLoader"
                            >
                            <template v-slot:prepend-inner class="mt-0">
                              <v-btn
                                class="v-text-field-append-button"
                                icon
                                color="primary"
                                @click="currentDateMenu1 = true"
                                :disabled="dateAppointmentLoader"
                              >
                                <v-icon>mdi-calendar</v-icon>
                              </v-btn>
                            </template>
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="currentSelectedDate"
                            no-title
                            @input="currentDateMenu1 = false"
                            :max="maximunDay"
                            locale="es"
                            @change="$_fetchScheduleDay()"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <!--Agregar validación para saber si existen registros mostrar la tabla-->
                    <v-row v-if="loaderVisible">
                      <v-col cols="12">
                        <p
                          class="
                            title
                            font-weight-bold
                            primary--text
                            text-center
                          "
                        >
                          Cargando registros...
                        </p>
                      </v-col>
                    </v-row>
                    <v-row
                      v-else-if="schedulesData.length > 0 && !loaderVisible"
                    >
                      <v-col cols="12">
                        <simple-schedules-table
                          :schedulesHeaders="schedulesHeaders"
                          :schedulesData="schedulesData"
                        ></simple-schedules-table>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="12">
                        <p
                          class="
                            title
                            font-weight-bold
                            primary--text
                            text-center
                          "
                        >
                          No se encontraron registros
                        </p>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab-item value="extraordinarySchedule">
                    <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5 d-flex justify-end">
                      <v-col cols="12" sm="4" lg="3">
                        <v-menu
                          v-model="currentDateMenu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateFormatted"
                              label="Fecha de la cita"
                              persistent-hint
                              readonly
                              v-on="on"
                              background-color="white"
                              filled
                              rounded
                              :disabled="dateAppointmentLoader"
                            >
                            <template v-slot:prepend-inner class="mt-0">
                              <v-btn
                                class="v-text-field-append-button"
                                icon
                                color="primary"
                                @click="currentDateMenu2 = true"
                                :disabled="dateAppointmentLoader"
                              >
                                <v-icon>mdi-calendar</v-icon>
                              </v-btn>
                            </template>
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="currentSelectedDate"
                            no-title
                            @input="currentDateMenu2 = false"
                            :max="maximunDay"
                            locale="es"
                            @change="$_fetchScheduleDay()"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <!--Agregar validación para saber si existen registros mostrar la tabla-->
                    <v-row v-if="loaderVisible">
                      <v-col cols="12">
                        <p
                          class="
                            title
                            font-weight-bold
                            primary--text
                            text-center
                          "
                        >
                          Cargando registros...
                        </p>
                      </v-col>
                    </v-row>
                    <v-row
                      v-else-if="extraordinarySchedulesData.length > 0 && !loaderVisible"
                    >
                      <v-col cols="12">
                        <extraordinary-schedules-table
                          :extraordinarySchedulesHeaders="extraordinarySchedulesHeaders"
                          :extraordinarySchedulesData="extraordinarySchedulesData"
                        ></extraordinary-schedules-table>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="12">
                        <p
                          class="
                            title
                            font-weight-bold
                            primary--text
                            text-center
                          "
                        >
                          No se encontraron registros
                        </p>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SimpleSchedulesTable from "@/components/home/SimpleSchedulesTable";
import ExtraordinarySchedulesTable from "@/components/home/ExtraordinarySchedulesTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { mapStyles } from '@/constants/mapStyles';
var pointInPolygon = require('point-in-polygon');
import Pusher from "../share/Pusher";
export default {
  components: {
    SimpleSchedulesTable,
    ExtraordinarySchedulesTable,
  },
  data() {
    return {
      tab: "regularSchedule",
      // Coordenadas del centro del mapa Durango, Durango C.P. 34000
      center: {
        lat: 24.022938297220808,
        lng: -104.65517351917143
      },
      path: [
        {lat: 24.022938297220808, lng: -104.65517351917143 },
        {lat: 24.020900, lng: -104.678621 },
        {lat: 24.024074, lng: -104.674342 },
        {lat: 24.028370, lng: -104.672764 }
      ],
      lines: [],
      // Configuración del mapa que muestra los polígonos con las rutas
      mapOptions: {
        mapTypeControl: false,
        styles: mapStyles.silver
      },
      // Configuración de la forma en la que se va a mostrar el nombre de la ruta en el mapa "gmap-info-window"
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: 0
        }
      },
      infoWindowPos: null,
      infoWinOpen: false,
      // Polígonos que serán mostrados en el mapa
      polygons: [],
      markers: [],
      // Colores de los marcadores y de las líneas
      markersColors: [
        {
          selected: false,
          color: "#922B21" // Rojo
        },
        {
          selected: false,
          color: "#76448A" // Morado
        },
        {
          selected: false,
          color: "#148F77" // Turqueza
        },
        {
          selected: false,
          color: "#B7950B" // Amarillo
        },
        {
          selected: false,
          color: "#AF601A" // Naranja
        },
        {
          selected: false,
          color: "#909497" // Gris
        },
        {
          selected: false,
          color: "#B03A2E" // Rojo
        },
        {
          selected: false,
          color: "#6C3483" // Morado
        },
        {
          selected: false,
          color: "#2874A6" // Azul
        },
        {
          selected: false,
          color: "#1E8449" // Verde
        },
        {
          selected: false,
          color: "#A04000" // Naranja oscuro
        },
        {
          selected: false,
          color: "#212F3D" // Gris oscuro
        },
        {
          selected: false,
          color: "#D68910" // Naranja claro
        },
        {
          selected: false,
          color: "#7D3C98" // Morado oscuro
        },
        {
          selected: false,
          color: "#1F618D" // Azul
        }
      ],
      currentPhlebotomists:[],
      schedulesHeaders: [
        {
          align: "center",
          text: "Horario",
          value: "schedule",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb1",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb2",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb3",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb4",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb5",
        },
      ],
      schedulesHeadersObj: [
        {
          align: "center",
          text: "Horario",
          value: "schedule",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb1",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb2",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb3",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb4",
        },
        {
          align: "center",
          text: "Nom. flebotomista",
          value: "fleb5",
        },
      ],
      schedulesData: [],
      extraordinarySchedulesHeaders: [
        {
          align: "center",
          text: "Horario",
          value: "schedule",
        },
        {
          align: "center",
          text: "Cliente",
          value: "customer",
        },
        {
          align: "center",
          text: "Flebotomista",
          value: "phlebotomist",
        },
        {
          align: "center",
          text: "Dirección",
          value: "address",
        },
        {
          align: "center",
          text: "Acciones",
          value: "actions",
        },
      ],
      extraordinarySchedulesData: [],
      currentDateName: "",
      currentSelectedDate: "",
      currentDateMenu1: false,
      currentDateMenu2: false,
      dateAppointmentLoader: false,
    };
  },
  computed: {
    ...mapState("scheduleConfig", ["currentZones"]),
    ...mapState("loader", ["loaderVisible"]),
    ...mapState("zone", ["zone"]),
    /**
     * Función para tomar la fecha actual y ponerla en los v-date-picker.
     */
    todayDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    /**
     * Función para tomar la fecha máxima que se puede poner en los filtros de búsueda por fecha.
     */
    maximunDay() {
      let date = new Date();
      date.setDate(date.getDate()+ 13);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + (date.getDate())).slice(-2);
      return `${year}-${month}-${day}`;
    },
    /**
     * Función para dar formato de fechas en los campos para filtrar por fecha
     */
    dateFormatted() {
      return this.formatDate(
        !this.currentSelectedDate ? null : this.currentSelectedDate
      );
    },
  },
  methods: {
    ...mapActions("scheduleConfig", ["fetchScheduleDay", "fetchCurrentZones"]),
    ...mapActions("zone", ["fetchZone"]),
    ...mapMutations("auth", ["logout"]),
    ...mapMutations("notification", ["show"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    /**
     * Función para filtrar por fecha seleccionada, se manda a llamar esta función cuando se cambia la fecha del filtro de búsqueda
     */
    async $_fetchScheduleDay() {
      this.loading();
      let response = await this.fetchScheduleDay(this.currentSelectedDate);

      this.schedulesData = [];
      this.extraordinarySchedulesData = [];
      // Comprobar que la petición se realizó correctamente
      if (response.status && response.status > 199 && response.status < 300) {
        // Dar formato a las citas de las diferentes rutas
        this.formatAppointmentData(response.data.data);
        // Dar formato a las citas extraordinarias
        this.formatExtraordinaryAppointmentData(response.data.data.extraordinary_schedule);
      }
      // Comprobar si la sesión no ha exipirado
      else if (response.status && response.status == 403) {
        this.show({ text: "La sesión ha expirado", color: "red" });
        this.logout();
        this.loaded();
        this.$router.push("/");
      }
      this.loaded();
    },
    /**
     * Función para marcar en el mapa el nombre de la zona que está seleccionando el usuario
     */
    selectZone(event) {
      // Comprobar si el mapa cuenta con rutas para seleccionar
      if (this.currentZones.data && this.currentZones.data.length > 0) {
        // Encontrar en polígono
        let polygonsArray = this.formatPolygonsToArray();
  
        polygonsArray.forEach(zone => {
          if (pointInPolygon([event.latLng.lat(), event.latLng.lng()], zone.polygon)) {
            this.infoOptions.content = zone.name;
          }
        })
      } else {
        this.infoOptions.content = "No se configuraron rutas en este día.";
      }
      this.infoWinOpen = true;
      this.infoWindowPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
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
     * Función para dar formato a las citas y ponerlas en la tabla
     */
    formatAppointmentData(scheduleConfig) {
      let emptyScheduleCol = {
        index: 0,
        start_date: "",
        end_date: "",
        isReserved: false,
        isBreakFast: false,
        notAvailable: true,
      };
      // Dar formato a los horarios de las rutas normales
      let currentSchedule = scheduleConfig.schedule.phlebotomist_schedules;
      
      // Copiar el formato base del objeto de las columnas de los horarios normales de las citas
      this.schedulesHeaders = JSON.parse(JSON.stringify(this.schedulesHeadersObj));
      if (currentSchedule.length > 0) {
        // Poner nombre de los flebotomistas en las columnas
        currentSchedule.forEach((schedule, index) => {
          this.schedulesHeaders[
            index + 1
          ].text = `Flebotomista ${index + 1}`;
          //text = `${schedule.user.name} ${schedule.user.last_name_father}`;
        });
  
        for (let i = 0; i < currentSchedule[0].schedule.length; i++) {
          // Dar formato a la hora de la cita
          let startHour = new Date(currentSchedule[0].schedule[i].start_date);
          let startDateFormatted = `${("0" + startHour.getHours()).slice(-2)}:${(
            "0" + startHour.getMinutes()
          ).slice(-2)}`;
          let endHour = new Date(currentSchedule[0].schedule[i].end_date);
          let endDateFormatted = `${("0" + endHour.getHours()).slice(-2)}:${(
            "0" + endHour.getMinutes()
          ).slice(-2)}`;
  
          let hour = `${startDateFormatted} - ${endDateFormatted}`;
  
          // Renglón de la tabla de horarios que se va a mostrar
          let scheduleRow = {
            hour: hour,
            fleb1: currentSchedule[0]
              ? currentSchedule[0].schedule[i]
              : emptyScheduleCol,
            fleb2: currentSchedule[1]
              ? currentSchedule[1].schedule[i]
              : emptyScheduleCol,
            fleb3: currentSchedule[2]
              ? currentSchedule[2].schedule[i]
              : emptyScheduleCol,
            fleb4: currentSchedule[3]
              ? currentSchedule[3].schedule[i]
              : emptyScheduleCol,
            fleb5: currentSchedule[4]
              ? currentSchedule[4].schedule[i]
              : emptyScheduleCol,
          };
          this.schedulesData.push(scheduleRow);
        }
      }
    },
    /**
     * Dar formato para acomodar la información en la tabla de citas extraordinarias
     */
    formatExtraordinaryAppointmentData(extraordinaryScheduleConfig) {
      if (extraordinaryScheduleConfig.length > 0) {
        extraordinaryScheduleConfig.forEach(schedule => {
          // Dar formato a la hora de la cita
          let startHour = new Date(schedule.start_date);
          let startDateFormatted = `${("0" + startHour.getHours()).slice(-2)}:${(
            "0" + startHour.getMinutes()
          ).slice(-2)}`;
          let endHour = new Date(schedule.end_date);
          let endDateFormatted = `${("0" + endHour.getHours()).slice(-2)}:${(
            "0" + endHour.getMinutes()
          ).slice(-2)}`;

          let hour = `${startDateFormatted} - ${endDateFormatted}`;
          
          let formatExtraordinary = {
            id: schedule.id,
            hour: hour,
            customer: `${schedule.customer.user.name} ${schedule.customer.user.last_name_father} ${schedule.customer.user.last_name_mother}`,
            phlebotomist: `${schedule.user.name} ${schedule.user.last_name_father} ${schedule.user.last_name_mother}`,
            address: `${schedule.address.street} ${schedule.address.num_ext} Col. ${schedule.address.neighborhood}, CP. ${schedule.address.zip_code} ${schedule.address.city}, ${schedule.address.state}`,
          };
          this.extraordinarySchedulesData.push(formatExtraordinary);
        });
      }
    },
    /**
     * Función para dar formato de fecha YYYY-MM-DD.
     * @param {String} date Fecha de la cita.
     */
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    /**
     * Función para dar formato a los polígonos para saber en que polígono dio click el usuario
     */
    formatPolygonsToArray() {
      let polygonsArray = [];
      this.currentZones.data.forEach(zoneData => {
        let polygon = zoneData.zone.polygon.map(coord => {
          return [ parseFloat(coord.lat), parseFloat(coord.lon)];
        });
        let zoneInformation = {
          name: zoneData.zone.name,
          polygon: polygon
        }
        polygonsArray.push(zoneInformation);
      });
      return polygonsArray;
    },
    /**
     * Función para dar formato a los polígonos que se mostrarán en el mapa
     */
    async formatPolygons(zonesData) {
      this.polygons = [];
      if (zonesData && zonesData.length > 0 ) {
        zonesData.forEach(zoneData => {
          let polygon = zoneData.zone.polygon.map(coord => {
            return {
              lat: parseFloat(coord.lat),
              lng: parseFloat(coord.lon)
            };
          });
          this.polygons.push(polygon);
        });
      } else {
        await this.addDefaultPolygon();
        // Poner el poligono de la zona principal
      }
    },
    /**
     * Función para mostrar una ruta en el mapa de flebotomistas cuando no se tienen rutas asignadas
     */
    async addDefaultPolygon() {
      // Obtener el poligono que contiene todas las rutas
      await this.fetchZone(1);

      this.polygons = [];

      let polygon = this.zone.polygon.map(coord => {
        return {
          lat: parseFloat(coord[0]),
          lng: parseFloat(coord[1])
        };
      });
      this.polygons.push(polygon);
    },
  },
  /**
   * Al entrar a esta pantalla se ejecuta todo lo que se encuentra dentro de esta función "mounted"
   */
  async mounted() {
    this.loading();
    // Obtener las zonas de del día actual
    let currentDate = this.todayDate;
    await this.fetchCurrentZones(currentDate);
    try {
      this.formatPolygons(this.currentZones.data);
      // Funcionalidad de pusher
      var channel = Pusher.subscribe("phlebotomist-location");

      channel.bind("location", (location) => {
        /*START fake location
        let fakeLocation = {
          lat: (location.lat-(Math.random() / 100))+2.894642697220808 ,
          lng: (location.lng -(Math.random() / 100))-3.01194921917143 ,
        }
        END fake location*/
        let currentPhlebotomist = this.currentPhlebotomists.filter(phlebotomist => phlebotomist.id == location.user_id);

        let currentColor = "";
        if (currentPhlebotomist.length == 0) {
          let currentColorIndex = this.markersColors.findIndex(makerColor => !makerColor.selected);
          this.markersColors[currentColorIndex].selected = true;
          currentColor = this.markersColors[currentColorIndex].color;
          this.currentPhlebotomists.push({
            id: location.user_id,
            name: location.phlebotomist,
            color: currentColor
          });
          this.lines.push({
            phlebotomistId: location.user_id,
            color: currentColor,
            path: [
              {lat: location.lat, lng: location.lng },
            ]
            /*START fake location
            path: [
              {lat: fakeLocation.lat, lng: fakeLocation.lng },
            ]
            END fake location*/
          });
        } else {

          // Hacer un filter de todos los elementos que conicidan con el id del flebototomista
          let phlebotomistCurrentMarkers = this.markers.filter(marker => marker.phlebotomistId == location.user_id);
          // En el último elemento del arreglo ponerle el parámetro de "scale" con un valor de 0.2
          phlebotomistCurrentMarkers[phlebotomistCurrentMarkers.length-1].scale = 0.2;

          let currentLineIndex = this.lines.findIndex(line => line.phlebotomistId == location.user_id);
          // Dejar como máximo 15 marcadores y líneas por flebotomista
          if (phlebotomistCurrentMarkers.length > 5) {
            let firstPhlebotomistMarker = this.markers.findIndex(marker => marker.phlebotomistId == location.user_id);
            
            this.lines[currentLineIndex].path.splice(0,1);
            //let firstPhlebotomistLine = this.lines.findIndex(line => line.phlebotomistId == line.user_id);
            this.markers.splice(firstPhlebotomistMarker, 1);
            //this.lines.splice(firstPhlebotomistLine, 1);
          }

          currentColor = currentPhlebotomist[0].color;
          //let currentLineIndex = this.lines.findIndex(line => line.phlebotomistId == location.user_id);

          this.lines[currentLineIndex].path.push({lat: location.lat, lng: location.lng });

          /*START fake location
          this.lines[currentLineIndex].path.push({lat: fakeLocation.lat, lng: fakeLocation.lng });
          END fake location*/
        }
        this.markers.push({
          phlebotomistId: location.user_id,
          position: {
            lat: location.lat,
            lng: location.lng,
          },
          /*START fake location
          position: {
            lat: fakeLocation.lat,
            lng: fakeLocation.lng,
          },
          END fake location*/
          color: currentColor,
          scale: 0.4
        });
      });

      // Obtener información de citas
      this.currentDateName = this.formatCurrentDateName();
      let date = new Date();
      date = date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      let dateArray = date.split("/");
      this.currentSelectedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

      let response = await this.fetchScheduleDay(this.currentSelectedDate);

      // Comprobar que la petición se realizó correctamente
      if (response.status && response.status > 199 && response.status < 300) {
        // Dar formato a las citas de las diferentes rutas
        this.formatAppointmentData(response.data.data);
        // Dar formato a las citas extraordinarias
        this.formatExtraordinaryAppointmentData(response.data.data.extraordinary_schedule);
      }
      // Comprobar si la sesión no ha exipirado
      else if (response.status && response.status == 403) {
        this.show({ text: "La sesión ha expirado", color: "red" });
        this.logout();
        this.loaded();
        this.$router.push("/");
      }
    } catch (error) {
      console.log(error);
      this.show({ text: "Ha ocurrido un problema", color: "red" });
    } finally {
      this.loaded();
    }
    
  },
  /**
   * Cuando se abandona esta pantalla, se ejecuta la función para cerrar la conexión con pusher
   */
  destroyed() {
    Pusher.unsubscribe('phlebotomist-location');
  }
};
</script>
<style scoped>
.background-tr-color {
  background-color: #cfd8dc;
}
.card-height {
  min-height: 60vh;
}

.map-container{
  overflow:hidden;
  padding-bottom:30%;
  position:relative;
  height: 0;
}
.flat-map{
  overflow:hidden;
  padding-bottom:25%;
  position:relative;
  height: 0;
}
.map-zone{
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
}

@media (max-width: 599px) {
  .map-container{
    height: 40vh;
  }
}

@media (min-width: 600px){
  .map-container{
    height: 60vh;
  }
}
</style>