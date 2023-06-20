<!--Vista para administrar las configuración de las rutas-->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pr-md-0 pb-0">
        <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl">
          <v-card-text>
            <v-row class="mx-1 mx-sm-5 mx-md-12 mt-5">
              <v-col cols="12" class="pb-0">
                <v-row>
                  <v-col cols="12" sm="7" class="d-flex align-end px-0">
                    <p class="title mb-0 black--text">Configuración de rutas</p>
                  </v-col>
                  <v-col cols="12" sm="5" class="d-flex justify-end px-0">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          color="accent"
                          v-bind="attrs"
                          v-on="on"
                          @click="specialDaysDialog = true"
                        >
                          Días especiales
                        </v-btn>
                      </template>
                      <span>Administrar días especiales</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="
                this.scheduleConfigs.data &&
                this.scheduleConfigs.data.length > 0
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
                  :headers="scheduleConfigHeaders"
                  :items="this.scheduleConfigs.data"
                  hide-default-header
                  disable-sort
                  hide-default-footer
                  :items-per-page="scheduleSearchData.perPage"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr
                        v-if="$vuetify.breakpoint.smAndUp"
                        class="background-tr-color"
                      >
                        <th class="text-center">
                          {{ scheduleConfigHeaders[0].text }}
                        </th>
                        <th class="text-left">
                          {{ scheduleConfigHeaders[1].text }}
                        </th>
                        <th class="text-left">
                          {{ scheduleConfigHeaders[2].text }}
                        </th>
                        <th class="text-left">
                          {{ scheduleConfigHeaders[3].text }}
                        </th>
                        <th class="text-left">
                          {{ scheduleConfigHeaders[4].text }}
                        </th>
                        <th class="text-left">
                          {{ scheduleConfigHeaders[5].text }}
                        </th>
                        <th class="text-center">
                          {{ scheduleConfigHeaders[6].text }}
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
                            {{ scheduleConfigHeaders[0].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : 'd-flex justify-center'
                            "
                          >
                            <v-chip color="#EDF7FE">
                              <!--<v-icon left>
                                mdi-calendar
                              </v-icon>-->
                              <span
                                class="primary--text font-weight-bold mx-2"
                                >{{
                                  formatDate(item.start_date.substr(0, 10))
                                }}</span
                              >
                            </v-chip>
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
                            {{ scheduleConfigHeaders[1].text }}
                          </div>
                          <div
                            v-if="
                              item.phlebotomist_schedules &&
                              item.phlebotomist_schedules.length > 0
                            "
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            {{ item.phlebotomist_schedules[0].user.name }}
                            {{
                              item.phlebotomist_schedules[0].user
                                .last_name_father
                            }}
                            {{
                              item.phlebotomist_schedules[0].user
                                .last_name_mother
                            }}
                          </div>
                          <div
                            v-else
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <v-chip class="ma-1"> ND </v-chip>
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
                            {{ scheduleConfigHeaders[2].text }}
                          </div>
                          <div
                            v-if="
                              item.phlebotomist_schedules &&
                              item.phlebotomist_schedules.length > 1
                            "
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            {{ item.phlebotomist_schedules[1].user.name }}
                            {{
                              item.phlebotomist_schedules[1].user
                                .last_name_father
                            }}
                            {{
                              item.phlebotomist_schedules[1].user
                                .last_name_mother
                            }}
                          </div>
                          <div
                            v-else
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <v-chip class="ma-1"> ND </v-chip>
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
                            {{ scheduleConfigHeaders[3].text }}
                          </div>
                          <div
                            v-if="
                              item.phlebotomist_schedules &&
                              item.phlebotomist_schedules.length > 2
                            "
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            {{ item.phlebotomist_schedules[2].user.name }}
                            {{
                              item.phlebotomist_schedules[2].user
                                .last_name_father
                            }}
                            {{
                              item.phlebotomist_schedules[2].user
                                .last_name_mother
                            }}
                          </div>
                          <div
                            v-else
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <v-chip class="ma-1"> ND </v-chip>
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
                            {{ scheduleConfigHeaders[4].text }}
                          </div>
                          <div
                            v-if="
                              item.phlebotomist_schedules &&
                              item.phlebotomist_schedules.length > 3
                            "
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            {{ item.phlebotomist_schedules[3].user.name }}
                            {{
                              item.phlebotomist_schedules[3].user
                                .last_name_father
                            }}
                            {{
                              item.phlebotomist_schedules[3].user
                                .last_name_mother
                            }}
                          </div>
                          <div
                            v-else
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <v-chip class="ma-1"> ND </v-chip>
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
                            {{ scheduleConfigHeaders[5].text }}
                          </div>
                          <div
                            v-if="
                              item.phlebotomist_schedules &&
                              item.phlebotomist_schedules.length > 4
                            "
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            {{ item.phlebotomist_schedules[4].user.name }}
                            {{
                              item.phlebotomist_schedules[4].user
                                .last_name_father
                            }}
                            {{
                              item.phlebotomist_schedules[4].user
                                .last_name_mother
                            }}
                          </div>
                          <div
                            v-else
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <v-chip class="ma-1"> ND </v-chip>
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
                            {{ scheduleConfigHeaders[6].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : 'd-flex justify-center'
                            "
                          >
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  color="primary"
                                  x-small
                                  elevation="0"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="selectScheduleConfig(item)"
                                >
                                  <!--<v-icon dark> mdi-form-select </v-icon>-->
                                  <nova-icon
                                    name="sheet"
                                    color="#FFFFFF"
                                    size="sm"
                                  ></nova-icon>
                                </v-btn>
                              </template>
                              <span>Ver detalle de horario</span>
                            </v-tooltip>
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  color="accent"
                                  x-small
                                  elevation="0"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="selectScheduleRoutes(item)"
                                >
                                  <!--<v-icon dark> mdi-routes </v-icon>-->
                                  <nova-icon
                                    name="routes"
                                    color="#FFFFFF"
                                    size="sm"
                                  ></nova-icon>
                                </v-btn>
                              </template>
                              <span>Actualizar el número de rutas</span>
                            </v-tooltip>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row v-else-if="loaderVisible">
              <v-col cols="12" class="d-flex justify-center">
                <p class="headline font-weight-bold primary--text">
                  Cargando...
                </p>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" class="d-flex justify-center">
                <p class="headline font-weight-bold black--text">
                  No hay registros disponibles
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn color="grey lighten-2" rounded>
                  <span class="px-5">Reintentar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--INICIO Dialog para agregar/editar un día festivo-->
    <v-dialog v-model="addSpecialDayDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          {{ specialDayAction == "CREATE" ? "Agregar día" : "Editar día" }}
          {{ specialDayType == "Holiday" ? "festivo" : "sin servicio" }}
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col v-if="specialDayAction == 'CREATE'" cols="12" class="py-0">
                <p class="title px-5 text-center">
                  Selecciona el día
                  {{ specialDayType == "Holiday" ? "festivo" : "sin servicio" }}
                </p>
              </v-col>
              <v-col v-if="specialDayAction == 'UPDATE'" cols="12" class="py-0">
                <p class="title px-5 text-center">
                  Editar día {{ selectedDay }}
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-date-picker
                  v-model="specialDay.date"
                  color="accent"
                  header-color="primary"
                  locale="es"
                  :min="todayDate"
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn color="error" @click="closeSpecialDay" rounded>Cancelar</v-btn>
          <v-btn
            v-if="specialDayAction == 'CREATE'"
            color="primary"
            rounded
            :loading="loadingSpecialDateDialogButton"
            @click="_createSpecialDate()"
            >Guardar</v-btn
          >
          <v-btn
            v-else
            color="primary"
            rounded
            :loading="loadingSpecialDateDialogButton"
            @click="_updateSpecialDate()"
            >Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para agregar/editar un día festivo-->
    <!--INICIO Dialog para eliminar un día especial-->
    <v-dialog v-model="deleteSpecialDateDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Eliminar día especial
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
            @click="deleteSpecialDateDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            @click="_deleteSpecialDate()"
            rounded
            :loading="deleteButtonLoader"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para eliminar un día especial-->
    <!--INICIO Dialog para gestionar configuración de horario de un día-->
    <v-dialog v-model="scheduleDialog" max-width="900" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text
          class="rounded-xl"
          :class="$vuetify.breakpoint.smAndUp ? 'px-5' : 'px-1'"
        >
          <v-container>
            <v-row class="pb-3 pt-1">
              <v-col
                cols="8"
                offset="2"
                class="d-flex align-center justify-center py-0"
              >
                <p
                  class="text-center primary--text headline font-weight-bold mb-0 mt-2"
                >
                  Rutas
                </p>
              </v-col>
              <v-col cols="2" class="d-flex justify-end pb-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="error"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="closeScheduleDialog()"
                    >
                      <!--<v-icon dark> mdi-close </v-icon>-->
                      <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="mb-5">
                <div>
                  <gmap-map
                    :center="center"
                    :zoom="$vuetify.breakpoint.lgAndUp ? 11.3 : 11"
                    :options="mapOptions"
                    class="map-container rounded-xl"
                    ref="map"
                  >
                    <gmap-polygon
                      :paths="polygons"
                      :options="{
                        geodesic: true,
                        strokeColor: '#006cb7',
                        fillColor: '#7ACEF1',
                      }"
                      @click="selectZone"
                    ></gmap-polygon>
                    <gmap-info-window
                      :options="infoOptions"
                      :position="infoWindowPos"
                      :opened="infoWinOpen"
                      @closeclick="infoWinOpen = false"
                    >
                    </gmap-info-window>
                    <!--:icon="{ path: 'M30.6,15.737c0-8.075-6.55-14.6-14.6-14.6c-8.075,0-14.601,6.55-14.601,14.6c0,4.149,1.726,7.875,4.5,10.524c1.8,1.801,4.175,4.301,5.025,5.625c1.75,2.726,5,11.976,5,11.976s3.325-9.25,5.1-11.976c0.825-1.274,3.05-3.6,4.825-5.399C28.774,23.813,30.6,20.012,30.6,15.737z', fillColor: '#091cab', fillOpacity: 1, strokeWeight: 0, scale: .9 }"-->
                    <!--:icon="{ path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z', fillColor: '#091cab', fillOpacity: 1, strokeWeight: 1, scale: .9 }"-->
                  </gmap-map>
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <p
                  class="title font-weight-bold text-center"
                  :class="dayHasAppointments ? 'mb-0' : ''"
                >
                  {{ formatDate(scheduleConfig.date) }}
                </p>
              </v-col>
              <v-col cols="12" v-if="dayHasAppointments">
                <p class="subtitle-2 font-weight-bold red--text text-center">
                  No se puede cambiar la configuración de horarios de este día
                  debido a que tiene citas agendadas.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="9">
                <v-form
                  ref="scheduleForm"
                  v-model="validScheduleForm"
                  lazy-validation
                >
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        label="Duración de citas"
                        v-model.number.lazy="scheduleConfig.appointmentDuration"
                        background-color="white"
                        type="number"
                        filled
                        rounded
                        dense
                        suffix="minutos"
                        :rules="appointmentDurationRules"
                        :readonly="dayHasAppointments"
                        @click="updateDuration"
                        v-on:keyup.enter="generateSchedules()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-row>
                        <v-col cols="12">
                          <p class="subtitle-2 mb-0 text-center">
                            Horario de servicio
                          </p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <v-menu
                            ref="startTimeMenu"
                            v-model="startTimeMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="scheduleConfig.startDate"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="dayHasAppointments"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.lazy="scheduleConfig.startDate"
                                label="Hora de inicio"
                                background-color="white"
                                filled
                                rounded
                                dense
                                readonly
                                v-on="on"
                                required
                                :rules="startDateRules"
                                @click="updateDuration"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="startTimeMenu"
                              v-model="scheduleConfig.startDate"
                              @click:minute="
                                $refs.startTimeMenu.save(
                                  scheduleConfig.startDate
                                )
                              "
                              @change="generateSchedules()"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" class="py-0">
                          <v-menu
                            ref="endTimeMenu"
                            v-model="endTimeMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="scheduleConfig.endDate"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="dayHasAppointments"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.lazy="scheduleConfig.endDate"
                                label="Hora de fin"
                                background-color="white"
                                filled
                                rounded
                                dense
                                readonly
                                v-on="on"
                                required
                                :rules="endDateRules"
                                @click="updateDuration"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="endTimeMenu"
                              v-model="scheduleConfig.endDate"
                              @click:minute="
                                $refs.endTimeMenu.save(scheduleConfig.endDate)
                              "
                              @change="generateSchedules()"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-row>
                        <v-col cols="12">
                          <p class="subtitle-2 mb-0 text-center">
                            Horario de comida
                          </p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <v-menu
                            ref="startTimeMenuBreakfast"
                            v-model="startTimeMenuBreakfast"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="
                              scheduleConfig.breakfastStartDate
                            "
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="dayHasAppointments"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.lazy="scheduleConfig.breakfastStartDate"
                                label="Hora de inicio comida"
                                background-color="white"
                                filled
                                rounded
                                dense
                                readonly
                                v-on="on"
                                required
                                :rules="breakfastStartDateRules"
                                @click="updateDuration"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="startTimeMenuBreakfast"
                              v-model="scheduleConfig.breakfastStartDate"
                              @click:minute="
                                $refs.startTimeMenuBreakfast.save(
                                  scheduleConfig.breakfastStartDate
                                )
                              "
                              @change="generateSchedules()"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" class="py-0">
                          <v-menu
                            ref="endTimeMenuBreakfast"
                            v-model="endTimeMenuBreakfast"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="scheduleConfig.breakfastEndDate"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="dayHasAppointments"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.lazy="scheduleConfig.breakfastEndDate"
                                label="Hora de fin comida"
                                background-color="white"
                                filled
                                rounded
                                dense
                                readonly
                                v-on="on"
                                required
                                :rules="breakfastEndDateRules"
                                @click="updateDuration"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="endTimeMenuBreakfast"
                              v-model="scheduleConfig.breakfastEndDate"
                              @click:minute="
                                $refs.endTimeMenuBreakfast.save(
                                  scheduleConfig.breakfastEndDate
                                )
                              "
                              @change="generateSchedules()"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      v-if="
                        scheduleConfig.phlebotomistsConfig.length > 0 &&
                        this.currentZones.data &&
                        this.currentZones.data.length > 0
                      "
                    >
                      <v-row
                        v-for="(
                          item, index
                        ) in scheduleConfig.phlebotomistsConfig"
                        :key="item.id"
                      >
                        <v-col
                          v-if="item.name != 'ND'"
                          cols="12"
                          class="py-0 px-5 d-flex flex-row align-end"
                        >
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                class="mx-2 mt-2"
                                icon
                                dark
                                color="primary"
                                small
                                v-bind="attrs"
                                v-on="on"
                                :loading="phlebotomistsLoaderButtons[index]"
                                @click="
                                  _fetchPhlebotomistSchedule(
                                    index,
                                    scheduleConfig.phlebotomistsConfig[index]
                                  )
                                "
                              >
                                <!--Queda pendiente saber si el scheduleConfig va relacionado a "scheduleConfig.phlebotomistsConfig[index].id" o a "phebotomistsChanges[index].phlebotomistScheduleId"-->
                                <v-icon dark> mdi-timer </v-icon>
                              </v-btn>
                            </template>
                            <span>Ver horarios de flebotomista</span>
                          </v-tooltip>
                          <p class="subtitle-2 mb-1">
                            {{
                              getZoneName(
                                scheduleConfig.phlebotomistsConfig[index]
                                  .zone_id
                              )
                            }}
                          </p>
                        </v-col>
                        <v-col v-if="item.name != 'ND'" cols="12" class="pb-0">
                          <v-select
                            v-model="phebotomistsChanges[index].userId"
                            filled
                            rounded
                            dense
                            hide-no-data
                            :items="phlebotomists"
                            label="Flebotomistas"
                            background-color="white"
                            @change="openChangePhlebotomistRouteDialog(index)"
                          >
                            <template slot="selection" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                            <template slot="item" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col
                cols="12"
                md="3"
                :class="$vuetify.breakpoint.mdAndUp ? 'py-0' : 'pb-5'"
              >
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-card elevation="0" color="white" class="ma-2 rounded-xl">
                      <v-card-text class="px-2 pt-4 pb-0">
                        <v-row dense>
                          <v-col cols="12">
                            <p class="title text-center primary--text mb-1">
                              Horarios
                            </p>
                          </v-col>
                          <v-col v-if="phlebotomistSelected != ''" cols="12">
                            <p class="subtitle-1 text-center mb-1">
                              {{ phlebotomistSelected }}
                            </p>
                          </v-col>
                          <v-col v-else cols="12">
                            <p class="subtitle-1 text-center mb-1">
                              No se ha seleccionado un flebotomista
                            </p>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <div v-if="schedules.length > 0">
                        <template v-for="(item, index) in schedules">
                          <v-list-item justify="center" :key="item.id">
                            <v-list-item-content>
                              <span
                                v-if="item.isBreakFast"
                                class="caption text-center amber--text font-weight-bold"
                                >Comida</span
                              >
                              <span
                                v-else-if="item.isReserved"
                                class="caption text-center red--text font-weight-bold"
                                >Reservado</span
                              >
                              <span
                                v-else
                                class="caption text-center teal--text font-weight-bold"
                                >Disponible</span
                              >
                              <v-list-item-title class="d-flex justify-center">
                                {{ formatSchedules(item) }}</v-list-item-title
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider
                            v-if="index < schedules.length - 1"
                            :key="`${index}a`"
                          ></v-divider>
                        </template>
                      </div>
                      <v-row v-else justify="center">
                        <v-col cols="10">
                          <p
                            class="subtitle-2 font-weight-bold text-center primary--text"
                          >
                            Selecciona el horario de un flebotomista
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn color="secondary" @click="closeScheduleDialog()" rounded>
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            color="primary"
            @click="_updateSchedule()"
            rounded
            :loading="saveButtonLoader"
            :disabled="!validScheduleForm"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para gestionar configuración de horario de un día-->
    <!--INICIO Dialog para editar las rutas de un día de un día-->
    <v-dialog v-model="updateRoutesNumberDialog" width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text
          class="rounded-xl"
          :class="$vuetify.breakpoint.smAndUp ? 'px-5' : 'px-1'"
        >
          <v-container>
            <v-row class="pb-3 pt-1">
              <v-col
                cols="8"
                offset="2"
                class="d-flex align-center justify-center py-0"
              >
                <p
                  class="text-center primary--text headline font-weight-bold mb-0 mt-2"
                >
                  Distribución de rutas
                </p>
              </v-col>
              <v-col cols="2" class="d-flex justify-end pb-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="error"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="closeUpdateRoutesDialog()"
                    >
                      <!--<v-icon dark> mdi-close </v-icon>-->
                      <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="mb-5">
                <div>
                  <gmap-map
                    :center="center"
                    :zoom="$vuetify.breakpoint.lgAndUp ? 11.3 : 11"
                    :options="mapOptions"
                    class="map-container rounded-xl"
                    ref="map"
                  >
                    <gmap-polygon
                      v-if="zonesPerNumberConfiguration.length > 0"
                      :paths="polygons"
                      :options="{
                        geodesic: true,
                        strokeColor: '#006cb7',
                        fillColor: '#7ACEF1',
                      }"
                      @click="selectZoneUpdateDistribution"
                    ></gmap-polygon>
                    <gmap-polygon
                      v-else
                      :paths="polygons"
                      :options="{
                        geodesic: true,
                        strokeColor: '#006cb7',
                        fillColor: '#7ACEF1',
                      }"
                      @click="selectZone"
                    ></gmap-polygon>
                    <gmap-info-window
                      :options="infoOptions"
                      :position="infoWindowPos"
                      :opened="infoWinOpen"
                      @closeclick="infoWinOpen = false"
                    >
                    </gmap-info-window>
                  </gmap-map>
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <p
                  class="title font-weight-bold text-center"
                  :class="dayHasAppointments ? 'mb-0' : ''"
                >
                  {{ formatDate(scheduleDistibution.date) }}
                </p>
              </v-col>
              <v-col cols="12" v-if="dayHasAppointments">
                <p class="subtitle-2 font-weight-bold red--text text-center">
                  No se puede cambiar la configuración de rutas de este día
                  debido a que tiene citas agendadas.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-form
                  ref="distributionForm"
                  v-model="validDistributionForm"
                  lazy-validation
                >
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <v-select
                        label="Número de rutas"
                        v-model.number="scheduleDistibution.numberConfiguration"
                        :items="[0, 1, 2, 3, 4, 5]"
                        background-color="white"
                        type="number"
                        filled
                        rounded
                        dense
                        :readonly="dayHasAppointments"
                        :loading="numberConfigurationLoader"
                        @change="changeRoutesQty()"
                      ></v-select>
                    </v-col>
                    <!--Mostrar esta sección si no se han cambiado el número de rutas-->
                    <v-col
                      cols="12"
                      v-if="
                        scheduleDistibution.phlebotomists.length > 0 &&
                        this.currentZones.data &&
                        this.currentZones.data.length > 0 &&
                        zonesPerNumberConfiguration.length == 0 &&
                        scheduleDistibution.numberConfiguration != 0
                      "
                    >
                      <v-row
                        v-for="(
                          item, index
                        ) in scheduleDistibution.phlebotomists"
                        :key="item.id"
                      >
                        <v-col
                          v-if="item.name != 'ND'"
                          cols="12"
                          class="py-0 px-5 d-flex flex-row align-end"
                        >
                          <p class="subtitle-2 mb-1">
                            {{
                              getZoneName(
                                scheduleDistibution.phlebotomists[index].zone_id
                              )
                            }}
                          </p>
                        </v-col>
                        <v-col
                          v-if="phebotomistsChanges.length > 0"
                          cols="12"
                          class="pb-0"
                        >
                          <v-select
                            v-model="phebotomistsChanges[index].userId"
                            filled
                            rounded
                            dense
                            hide-no-data
                            :items="phlebotomists"
                            label="Flebotomista"
                            background-color="white"
                            @change="validateSelectedPhlebotomist(index)"
                            :readonly="dayHasAppointments"
                            :rules="phlebotomistScheduleRules"
                          >
                            <template slot="selection" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                            <template slot="item" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!--Mostrar esta sección si ya se cambió el número de rutas-->
                    <v-col
                      cols="12"
                      v-else-if="
                        zonesPerNumberConfiguration.length > 0 &&
                        scheduleDistibution.numberConfiguration != 0
                      "
                    >
                      <v-row
                        v-for="(item, index) in zonesPerNumberConfiguration"
                        :key="item.id"
                      >
                        <v-col cols="12" class="py-0 px-5">
                          <p class="subtitle-2 mb-1">{{ item.name }}</p>
                        </v-col>
                        <v-col
                          v-if="phebotomistsChanges.length > 0"
                          cols="12"
                          class="pb-0"
                        >
                          <v-select
                            v-model="phebotomistsChanges[index].userId"
                            filled
                            rounded
                            dense
                            hide-no-data
                            :items="phlebotomists"
                            label="Flebotomista"
                            background-color="white"
                            @change="validateSelectedPhlebotomist(index)"
                            :readonly="dayHasAppointments"
                            :rules="phlebotomistScheduleRules"
                          >
                            <template slot="selection" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                            <template slot="item" slot-scope="data">
                              <span>{{ data.item.item }}</span>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn color="secondary" @click="closeUpdateRoutesDialog()" rounded>
            <span class="px-5">Cancelar</span>
          </v-btn>
          <!--:disabled="!validDistributionForm || dayHasAppointments || zonesPerNumberConfiguration.length == 0"-->
          <v-btn
            color="primary"
            rounded
            :loading="saveButtonLoader"
            :disabled="!validDistributionForm || dayHasAppointments"
            @click="_updateDistribution()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para editar las rutas de un día de un día-->
    <!--INICIO Dialog para gestionar días especiales-->
    <v-dialog
      v-model="specialDaysDialog"
      width="600"
      max-width="800"
      persistent
    >
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text
          class="rounded-xl"
          :class="$vuetify.breakpoint.smAndUp ? 'px-5' : 'px-1'"
        >
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-end pb-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="error"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="specialDaysDialog = false"
                    >
                      <!--<v-icon dark> mdi-close </v-icon>-->
                      <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Días especiales
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-col
                    cols="6"
                    offset="3"
                    class="d-flex align-center justify-center pt-0"
                  >
                    <p class="subtitle-2 mb-0">Festivos</p>
                  </v-col>
                  <v-col cols="3" class="d-flex align-center justify-end pt-0">
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
                          @click="addSpecialDay('Holiday')"
                        >
                          <!--<v-icon dark> mdi-plus </v-icon>-->
                          <nova-icon
                            name="add"
                            color="#FFFFFF"
                            size="sm"
                          ></nova-icon>
                        </v-btn>
                      </template>
                      <span>Agregar día festivo</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-list class="rounded-xl">
                      <v-list-group
                        v-for="item in holidaysPaginated"
                        :key="item.id"
                        v-model="item.active"
                        prepend-icon="mdi-calendar"
                        no-action
                      >
                        <template v-slot:activator>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.date"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>

                        <v-list-item>
                          <v-list-item-content>
                            <v-row>
                              <v-col cols="12" class="d-flex justify-end py-0">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="mx-2 mt-0"
                                      dark
                                      color="amber"
                                      rounded
                                      small
                                      elevation="0"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="selectSpecialDay(item, 'Holiday')"
                                    >
                                      <!--mdi-pencil-outline-->
                                      <!--<v-icon dark> mdi-pencil </v-icon>-->
                                      <v-icon dark> mdi-pencil-outline </v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Editar día</span>
                                </v-tooltip>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="mx-2 mt-0"
                                      dark
                                      color="red"
                                      rounded
                                      small
                                      elevation="0"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="
                                        selectSpecialDateToDelete(
                                          item.id,
                                          'Holiday'
                                        )
                                      "
                                    >
                                      <!--<v-icon dark> mdi-trash-can </v-icon>-->
                                      <v-icon dark>
                                        mdi-trash-can-outline
                                      </v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Eliminar día</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-group>
                    </v-list>
                  </v-col>
                  <v-col
                    v-if="holidayPaginationData.lastPage > 1"
                    cols="12"
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
                          :disabled="holidayPaginationData.numberPage == 1"
                          v-bind="attrs"
                          v-on="on"
                          @click="holidaysPagination('firstPage')"
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
                          :disabled="holidayPaginationData.numberPage == 1"
                          v-bind="attrs"
                          v-on="on"
                          @click="holidaysPagination('previous')"
                        >
                          <v-icon dark> mdi-chevron-left </v-icon>
                        </v-btn>
                      </template>
                      <span>Anterior</span>
                    </v-tooltip>
                    <span
                      >Pag. {{ holidayPaginationData.numberPage }} de
                      {{ holidayPaginationData.lastPage }}
                    </span>
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
                            holidayPaginationData.numberPage ==
                            holidayPaginationData.lastPage
                          "
                          v-bind="attrs"
                          v-on="on"
                          @click="holidaysPagination('next')"
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
                            holidayPaginationData.numberPage ==
                            holidayPaginationData.lastPage
                          "
                          v-bind="attrs"
                          v-on="on"
                          @click="holidaysPagination('lastPage')"
                        >
                          <v-icon dark> mdi-chevron-double-right </v-icon>
                        </v-btn>
                      </template>
                      <span>Última página</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-col
                    cols="6"
                    offset="3"
                    class="d-flex align-center justify-center pt-0"
                  >
                    <p class="subtitle-2 mb-0">Sin servicio</p>
                  </v-col>
                  <v-col cols="3" class="d-flex align-center justify-end pt-0">
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
                          @click="addSpecialDay('NoWorkday')"
                        >
                          <!--<v-icon dark> mdi-plus </v-icon>-->
                          <nova-icon
                            name="add"
                            color="#FFFFFF"
                            size="sm"
                          ></nova-icon>
                        </v-btn>
                      </template>
                      <span>Agregar día sin servicio</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-list class="rounded-xl">
                      <v-list-group
                        v-for="item in noWorkdaysPaginated"
                        :key="item.id"
                        v-model="item.active"
                        prepend-icon="mdi-calendar"
                        no-action
                      >
                        <template v-slot:activator>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.date"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>

                        <v-list-item>
                          <v-list-item-content>
                            <v-row>
                              <v-col cols="12" class="d-flex justify-end py-0">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="mx-2 mt-0"
                                      dark
                                      color="amber"
                                      rounded
                                      small
                                      elevation="0"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="
                                        selectSpecialDay(item, 'NoWorkday')
                                      "
                                    >
                                      <!--<v-icon dark> mdi-pencil </v-icon>-->
                                      <v-icon dark> mdi-pencil-outline </v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Editar día</span>
                                </v-tooltip>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="mx-2 mt-0"
                                      dark
                                      color="red"
                                      rounded
                                      small
                                      elevation="0"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="
                                        selectSpecialDateToDelete(
                                          item.id,
                                          'NoWorkday'
                                        )
                                      "
                                    >
                                      <!--<v-icon dark> mdi-trash-can </v-icon>-->
                                      <v-icon dark>
                                        mdi-trash-can-outline
                                      </v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Eliminar día</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-group>
                    </v-list>
                  </v-col>
                  <v-col
                    v-if="noWorkdayPaginationData.lastPage > 1"
                    cols="12"
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
                          :disabled="noWorkdayPaginationData.numberPage == 1"
                          v-bind="attrs"
                          v-on="on"
                          @click="noWorkaysPagination('firstPage')"
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
                          :disabled="noWorkdayPaginationData.numberPage == 1"
                          v-bind="attrs"
                          v-on="on"
                          @click="noWorkaysPagination('previous')"
                        >
                          <v-icon dark> mdi-chevron-left </v-icon>
                        </v-btn>
                      </template>
                      <span>Anterior</span>
                    </v-tooltip>
                    <span
                      >Pag. {{ noWorkdayPaginationData.numberPage }} de
                      {{ noWorkdayPaginationData.lastPage }}
                    </span>
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
                            noWorkdayPaginationData.numberPage ==
                            noWorkdayPaginationData.lastPage
                          "
                          v-bind="attrs"
                          v-on="on"
                          @click="noWorkaysPagination('next')"
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
                            noWorkdayPaginationData.numberPage ==
                            noWorkdayPaginationData.lastPage
                          "
                          v-bind="attrs"
                          v-on="on"
                          @click="noWorkaysPagination('lastPage')"
                        >
                          <v-icon dark> mdi-chevron-double-right </v-icon>
                        </v-btn>
                      </template>
                      <span>Última página</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="primary"
            @click="specialDaysDialog = false"
            rounded
            :loading="saveButtonLoader"
          >
            <span class="px-5">Cerrar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para gestionar días especiales-->
    <!--INICIO Dialog para actualizar flebotomista seleccionado-->
    <v-dialog v-model="changePhlebotomistRouteDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Cambiar flebotomista
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea cambiar el flebotomista?
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="subtitle-0 px-5">
                  Se debe tomar en cuenta si un flebotomista ya tiene rutas
                  asignadas.
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="subtitle-0 px-5">
                  Si un flebotomista se cambia de ruta y tiene citas asignadas,
                  estas citas se mostrarán en la sección de "Inicio" apartado de
                  "Citas extraordinarias" y las nuevas citas que se generen
                  después de guardar los cambios, se agregarán al flebotomista
                  que se encuentre asignado a la ruta.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="
              (phebotomistsChanges[currentPhlebotomistToChange].userId =
                selectedPhlebotomists[currentPhlebotomistToChange]),
                (changePhlebotomistRouteDialog = false)
            "
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            rounded
            @click="
              validateSelectedPhlebotomist(currentPhlebotomistToChange),
                (changePhlebotomistRouteDialog = false)
            "
            >Cambiar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para actualizar flebotomista seleccionado-->
  </v-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { validations } from "@/share/Validations";
import { mapStyles } from "@/constants/mapStyles";
var pointInPolygon = require("point-in-polygon");
export default {
  computed: {
    ...mapState("scheduleConfig", [
      "scheduleConfigs",
      "currentZones",
      "phlebotomistUsers",
      "phlebotomistSchedule",
    ]),
    ...mapState("specialDays", ["holidays", "noWorkdays"]),
    ...mapState("zone", ["zonesPerNumberConfiguration", "zone"]),
    ...mapState("loader", ["loaderVisible"]),
    ...mapState("service", ["servicesData"]),
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
  },
  data() {
    return {
      // Coordenadas del centro del mapa Durango, Durango C.P. 34000
      center: {
        lat: 24.022938297220808,
        lng: -104.65517351917143,
      },
      // Configuración del mapa que muestra los polígonos con las rutas
      mapOptions: {
        mapTypeControl: false,
        styles: mapStyles.silver,
      },
      // Configuración de la forma en la que se va a mostrar el nombre de la ruta en el mapa "gmap-info-window"
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: 0,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      // Polígonos que serán mostrados en el mapa
      polygons: [],
      // Time menus
      startTimeMenu: false,
      endTimeMenu: false,
      startTimeMenuBreakfast: false,
      endTimeMenuBreakfast: false,
      dayHasAppointments: false,
      phlebotomistSelected: "",
      schedules: [],
      scheduleDialog: false,
      updateRoutesNumberDialog: false,
      changePhlebotomistRouteDialog: false,
      specialDaysDialog: false,
      addSpecialDayDialog: false, // Dialog de agregar día festivo
      addNoWorkdayDialog: false, // Dialog de agregar día sin servicio
      deleteSpecialDateDialog: false,
      specialDayAction: "",
      specialDayType: "",
      validScheduleForm: false,
      validDistributionForm: false,
      saveButtonLoader: false,
      loadingSpecialDateDialogButton: false,
      deleteButtonLoader: false,
      searchFieldLoader: false,
      // Objetos para hacer funcionar la paginación de los días especiales
      scheduleSearchData: {
        numberPage: 1,
        perPage: 15,
        search: "",
        activeLoader: true,
      },
      holidayPaginationData: {
        perPage: 5,
        numberPage: 1,
        lastPage: 1,
      },
      holidaysPaginated: [],
      noWorkdayPaginationData: {
        perPage: 5,
        numberPage: 1,
        lastPage: 1,
      },
      noWorkdaysPaginated: [],
      // Objeto de Schedule config que sirve para mostrar el detalle de schedule config y también para editar horarios de un día y flebotomistas asignados a las diferentes rutas.
      scheduleConfig: {
        id: null,
        date: "",
        appointmentDuration: null,
        quantityZones: null,
        startDate: "",
        endDate: "",
        breakfastScheduleId: null,
        breakfastStartDate: "",
        breakfastEndDate: "",
        phlebotomistsConfig: [],
        breakfastSchedules: [],
      },
      scheduleConfigObj: {
        id: null,
        date: "",
        appointmentDuration: null,
        quantityZones: null,
        startDate: "",
        endDate: "",
        breakfastScheduleId: null,
        breakfastStartDate: "",
        breakfastEndDate: "",
        phlebotomistsConfig: [],
        breakfastSchedules: [],
      },
      // Object de Schedule que sirve para configurar el número de rutas disponibles
      scheduleDistibution: {
        date: "",
        phlebotomists: [],
      },
      scheduleDistibutionObj: {
        date: "",
        phlebotomists: [],
      },
      numberConfigurationLoader: false,
      // Arreglo para guardar los ids de los flebotomistas seleccionados, sirve para validar que ningún flebotomista se haya seleccionado dos veces
      selectedPhlebotomists: [],
      phebotomistsChanges: [],
      // Headers de la tabla de flebotomistas
      scheduleConfigHeaders: [
        {
          align: "center",
          text: "Día",
          value: "date",
        },
        {
          align: "center",
          text: "Ruta 1",
          value: "route1",
        },
        {
          align: "center",
          text: "Ruta 2",
          value: "route2",
        },
        {
          align: "center",
          text: "Ruta 3",
          value: "route3",
        },
        {
          align: "center",
          text: "Ruta 4",
          value: "route4",
        },
        {
          align: "center",
          text: "Ruta 5",
          value: "route5",
        },
        {
          align: "center",
          text: "Acciones",
          value: "actions",
        },
      ],
      phlebotomistsLoaderButtons: [false, false, false, false, false],
      phlebotomists: [],
      currentPhlebotomistToChange: null,
      selectedDay: "",
      // Variable de días especiales que es usada para crear, editar y eliminar días especiales
      specialDay: {
        id: "",
        date: "",
        dayType: "",
      },
      // Variable para obtner todos los usuarios flebotomistas
      phlebotomistSearchData: {
        perPage: 100,
        page: 1,
        activeLoader: false,
      },
      // Validaciones de los campos del formulario
      appointmentDurationRules: validations.generalFValidation({
        required: true,
        name: "duración de las citas",
      }),
      startDateRules: validations.generalFValidation({
        required: true,
        name: "hora de inicio",
      }),
      endDateRules: validations.generalFValidation({
        required: true,
        name: "hora de fin",
      }),
      breakfastStartDateRules: validations.generalFValidation({
        required: true,
        name: "hora de inicio de comida",
      }),
      breakfastEndDateRules: validations.generalFValidation({
        required: true,
        name: "hora de fin de comida",
      }),
      phlebotomistScheduleRules: validations.generalMValidation({
        required: true,
        name: "campo",
      }),
    };
  },
  methods: {
    ...mapActions("scheduleConfig", [
      "fetchScheduleConfigs",
      "fetchCurrentZones",
      "fetchPhlebotomistUsers",
      "fetchPhlebotomistSchedule",
      "updateSchedule",
      "updatePhlebotomist",
      "updateDistribution",
      "fetchScheduleOrders",
    ]),
    ...mapActions("specialDays", [
      "fetchHolidays",
      "fetchNoWorkdays",
      "createSpecialDate",
      "updateSpecialDate",
      "deleteSpecialDate",
    ]),
    ...mapActions("zone", ["fetchZonesPerNumberConfiguration", "fetchZone"]),
    ...mapMutations("scheduleConfig", ["clearCurrentZones"]),
    ...mapMutations("zone", ["clearZonesPerNumberConfigurationData"]),
    ...mapMutations("auth", ["logout"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    ...mapMutations("notification", ["show"]),
    /**
     * Función para validar que los campos del formulario hayan sido llenados de la forma correcta.
     */
    validateScheduleForm() {
      if (this.$refs.scheduleForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para validar que los campos del formulario hayan sido llenados de la forma correcta.
     */
    validateDistributionForm() {
      if (this.$refs.distributionForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para crear un día especial (Festivos y sin servicio).
     */
    async _createSpecialDate() {
      this.loading();
      this.specialDay.dayType = this.specialDayType;
      let response = await this.createSpecialDate(this.specialDay);
      if (response.status && response.status > 199 && response.status < 300) {
        this.specialDayAction = "";
        this.addSpecialDayDialog = false;
        if (this.specialDayType == "Holiday") {
          await this.fetchHolidays();
        } else {
          await this.fetchNoWorkdays();
        }
        await this.fetchScheduleConfigs();
        this.formatSpecialDatesPagination();
        this.formatHolidaysPagination();
        this.formatNoWorkdayPagination();
        this.show({
          text:
            response.data.data && response.data.data.message
              ? response.data.data.message
              : "El registro se ha realizado correctamente",
          color: "primary",
          time: 3000,
        });
      } else {
        if (response.data.errors) {
          if (response.data.errors.date) {
            if (
              response.data.errors.date[0] ==
              "El campo date ya está siendo utilizado."
            ) {
              this.show({
                text: "El día ingresado ya está siendo utilizado.",
                color: "red accent-3",
              });
            } else {
              this.show({
                text: response.data.errors.date[0],
                color: "red accent-3",
              });
            }
          }
        } else {
          this.show({
            text: "Ha ocurrido un problema al crear el registro",
            color: "red accent-3",
          });
        }
      }
      this.loadingSpecialDateDialogButton = false;
      this.loaded();
    },
    /**
     * Función para editar un día especial (Festivos y sin servicio).
     */
    async _updateSpecialDate() {
      this.loading();
      let response = await this.updateSpecialDate(this.specialDay);
      if (response.status && response.status > 199 && response.status < 300) {
        this.specialDayAction = "";
        this.addSpecialDayDialog = false;
        this.formatSpecialDatesPagination();
        if (this.specialDayType == "Holiday") {
          await this.fetchHolidays();
        } else {
          await this.fetchNoWorkdays();
        }
        await this.fetchScheduleConfigs();
        this.formatSpecialDatesPagination();
        this.formatHolidaysPagination();
        this.formatNoWorkdayPagination();
        this.show({
          text:
            response.data.data && response.data.data.message
              ? response.data.data.message
              : "El registro se ha editado correctamente",
          color: "primary",
          time: 3000,
        });
      } else {
        if (response.data.errors) {
          if (response.data.errors.date) {
            if (
              response.data.errors.date[0] ==
              "El campo date ya está siendo utilizado."
            ) {
              this.show({
                text: "El día ingresado ya está siendo utilizado.",
                color: "red accent-3",
              });
            } else {
              this.show({
                text: response.data.errors.date[0],
                color: "red accent-3",
              });
            }
          }
        } else {
          this.show({
            text: "Ha ocurrido un problema al editar el registro",
            color: "red accent-3",
          });
        }
      }
      this.loadingSpecialDateDialogButton = false;
      this.loaded();
    },
    /**
     * Función para eliminar un día especial (Festivos y sin servicio).
     */
    async _deleteSpecialDate() {
      this.loading();
      let response = await this.deleteSpecialDate(this.specialDay.id);
      if (response.status && response.status > 199 && response.status < 300) {
        if (this.specialDayType == "Holiday") {
          await this.fetchHolidays();
        } else {
          await this.fetchNoWorkdays();
        }
        this.formatSpecialDatesPagination();
        this.formatHolidaysPagination();
        this.formatNoWorkdayPagination();
        this.specialDayType = "";
        this.show({
          text: "El registro seleccionado se ha eliminado correctamente",
          color: "primary",
        });
        this.deleteSpecialDateDialog = false;
      } else {
        this.show({
          text: "Ha occurrido un problema al eliminar el registro",
          color: "primary",
        });
      }
      this.deleteButtonLoader = false;
      this.loaded();
    },
    /**
     * Función para obtener los horarios de los flebotomistas y mostrarlos en el lado derecho del modal de los horarios de flebotomistas.
     */
    async _fetchPhlebotomistSchedule(index, phlebotomistSchedule) {
      this.phlebotomistSelected = `${phlebotomistSchedule.user.name} ${phlebotomistSchedule.user.last_name_father} ${phlebotomistSchedule.user.last_name_mother}`;
      this.phlebotomistsLoaderButtons[index] = true;
      await this.fetchPhlebotomistSchedule(phlebotomistSchedule.id);
      this.schedules = this.phlebotomistSchedule.data;
      this.phlebotomistsLoaderButtons[index] = false;
    },
    /**
     * Función para actualizar los flebotomistas de rutas
     */
    async _updateSchedule() {
      if (this.validateScheduleForm()) {
        this.loading();
        let isAnError = false;
        let responseSchedule = await this.updateSchedule(this.scheduleConfig);
        if (
          responseSchedule.status &&
          responseSchedule.status > 199 &&
          responseSchedule.status < 300
        ) {
          //await this.fetchScheduleConfigs();
          this.show({
            text: "El registro se ha actualizado correctamente",
            color: "primary",
          });
        } else {
          isAnError = true;
          this.show({
            text: "Ha ocurrido un problema al actualizar el registro",
            color: "red accent-3",
          });
        }
        // Comprobar si la ruta cuenta con flebotomistas para saber si debe ejecutar la siguiente petición
        if (this.currentZones.data && this.currentZones.data.length > 0) {
          let responsePhlebotomists = await this.updatePhlebotomist(
            this.phebotomistsChanges
          );
          if (
            !(
              responsePhlebotomists.status > 199 &&
              responsePhlebotomists.status < 300
            )
          ) {
            isAnError = true;
            this.show({
              text: "Ha ocurrido un problema al actualizar las rutas de los flebotomistas",
              color: "red accent-3",
            });
          }
          await this.fetchScheduleConfigs();
        }
        // Hacer validación que incluya las rutas que se encuentran actualmente configuradas
        if (!isAnError) {
          this.closeScheduleDialog();
        }
        this.loaded();
        this.saveButtonLoader = false;
      }
    },
    /**
     * Función para actualizar la distribución de rutas de un día
     * Esta función se ejecuta al dar click al botón de guardar en el modal de actualizar distribución de rutas
     */
    async _updateDistribution() {
      if (this.validateDistributionForm()) {
        this.loading();
        let updateDistributionData = {
          date: this.scheduleDistibution.date,
          phlebotomists: this.phebotomistsChanges,
        };
        let response = await this.updateDistribution(updateDistributionData);
        if (response.status && response.status > 199 && response.status < 300) {
          await this.fetchScheduleConfigs();
          this.show({
            text: "El registro se ha actualizado correctamente",
            color: "primary",
          });
        } else {
          this.show({
            text: "Ha ocurrido un problema al actualizar el registro",
            color: "red accent-3",
          });
        }
        this.closeUpdateRoutesDialog();
        this.loaded();
      }
    },

    /**
     * Funcion que generan un horario en tiempo real cada vez que el usuario hace algún cambio en la hora de inicio y de fin del servicio y de la comida.
     */

    updateDuration() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.generateSchedules();
      }, 100);
    },
    /**
     * Función que sirve para generar un horario en tiempo real cada vez que el usuario hace algún cambio en la hora de inicio y de fin del servicio y de la comida.
     */

    generateSchedules() {
      this.phlebotomistSelected = "";
      this.schedules = [];
      let startDate = new Date(
        `${this.scheduleConfig.date} ${this.scheduleConfig.startDate}:00`
      );
      let startDateCopy = new Date(
        `${this.scheduleConfig.date} ${this.scheduleConfig.startDate}:00`
      );
      let endDate = new Date(
        `${this.scheduleConfig.date} ${this.scheduleConfig.endDate}:00`
      );
      let breakfastStartDate = new Date(
        `${this.scheduleConfig.date} ${this.scheduleConfig.breakfastStartDate}:00`
      );
      let breakfastEndDate = new Date(
        `${this.scheduleConfig.date} ${this.scheduleConfig.breakfastEndDate}:00`
      );
      let appointmentDuration = this.scheduleConfig.appointmentDuration;
      let breakfastScheduled = false;

      do {
        let areInBreakFast = false;
        let isReserved = false;

        if (
          !breakfastScheduled &&
          startDate >= breakfastStartDate &&
          startDate <= breakfastEndDate
        ) {
          areInBreakFast = true;
          breakfastScheduled = true;
        }

        let date = ("0" + startDate.getDate()).slice(-2);
        let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
        let year = startDate.getFullYear();
        let hours = ("0" + startDate.getHours()).slice(-2);
        let minutes = ("0" + startDate.getMinutes()).slice(-2);
        let seconds = ("0" + startDate.getSeconds()).slice(-2);

        startDateCopy.setMinutes(
          startDateCopy.getMinutes() + appointmentDuration
        );
        let endHours = ("0" + startDateCopy.getHours()).slice(-2);
        let endMinutes = ("0" + startDateCopy.getMinutes()).slice(-2);
        let endSeconds = ("0" + startDateCopy.getSeconds()).slice(-2);

        let startDateFormatted =
          year +
          "-" +
          month +
          "-" +
          date +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
        let endDateFormatted =
          year +
          "-" +
          month +
          "-" +
          date +
          " " +
          endHours +
          ":" +
          endMinutes +
          ":" +
          endSeconds;
        this.schedules.push({
          start_date: startDateFormatted,
          end_date: endDateFormatted,
          isReserved: isReserved,
          isBreakFast: areInBreakFast,
        });
        startDate.setMinutes(startDate.getMinutes() + appointmentDuration);
      } while (startDate < endDate);
    },
    /**
     * Función para acomodar los horarios de un flebotomista en la lista que que se muestra en el lado derecho del v-display de los horarios de un flebotomista.
     */
    formatSchedules(date) {
      let startDate = new Date(date.start_date);
      let startDateFormatted = `${("0" + startDate.getHours()).slice(-2)}:${(
        "0" + startDate.getMinutes()
      ).slice(-2)}`;
      let endDate = new Date(date.end_date);
      let endDateFormatted = `${("0" + endDate.getHours()).slice(-2)}:${(
        "0" + endDate.getMinutes()
      ).slice(-2)}`;
      return `${startDateFormatted} - ${endDateFormatted}`;
    },
    /**
     * Función para acomodar en un v-display la información de la configuración de un día (Rutas, flebotomistas, horarios de atención) y también para editarla
     */
    async selectScheduleConfig(scheduleConfigSelected) {
      this.loading();
      // Limpiar arreglos de flebotomistas
      this.schedules = [];
      this.selectedPhlebotomists = [];
      this.phebotomistsChanges = [];
      let currentDate = scheduleConfigSelected.start_date.substring(0, 10);
      this.scheduleConfig.id = scheduleConfigSelected.id;
      this.scheduleConfig.date = scheduleConfigSelected.start_date.substring(
        0,
        10
      );
      this.scheduleConfig.appointmentDuration =
        scheduleConfigSelected.appointment_duration;
      this.scheduleConfig.quantityZones = scheduleConfigSelected.quantity_zones;
      this.scheduleConfig.startDate =
        scheduleConfigSelected.start_date.substring(11, 16);
      this.scheduleConfig.endDate = scheduleConfigSelected.end_date.substring(
        11,
        16
      );
      this.scheduleConfig.phlebotomistsConfig =
        scheduleConfigSelected.phlebotomist_schedules;
      this.scheduleConfig.phlebotomistsConfig.forEach((flebConfig) => {
        this.selectedPhlebotomists.push(flebConfig.user.id);
        this.phebotomistsChanges.push({
          phlebotomistScheduleId: flebConfig.id,
          userId: flebConfig.user.id,
        });
      });
      this.scheduleConfig.breakfastScheduleId =
        scheduleConfigSelected.breakfast_schedules[0].id;
      this.scheduleConfig.breakfastStartDate =
        scheduleConfigSelected.breakfast_schedules[0].start_date.substring(
          11,
          16
        );
      this.scheduleConfig.breakfastEndDate =
        scheduleConfigSelected.breakfast_schedules[0].end_date.substring(
          11,
          16
        );
      await this.fetchCurrentZones(currentDate);
      // Comprobar si la configuración seleccionada tiene rutas asignadas
      if (this.currentZones.data && this.currentZones.data.length > 0) {
        this.formatPolygons(this.currentZones.data);

        // Comprobar si no se han asignado citas en un día en específico
        let ordersResponse = await this.fetchScheduleOrders(
          this.scheduleConfig.date
        );
        if (ordersResponse.data.data && ordersResponse.data.data.length > 0) {
          this.dayHasAppointments = true;
        } else if (
          ordersResponse.data.data &&
          ordersResponse.data.data.length == 0
        ) {
          this.dayHasAppointments = false;
        } else {
          this.dayHasAppointments = true;
        }
      } else {
        await this.addDefaultPolygon();
      }
      this.infoWinOpen = false;
      this.scheduleDialog = true;
      this.generateSchedules();
      this.loaded();
    },
    /**
     * Función que abre el modal que sirve para actualizar la Distribución de rutas
     */
    async selectScheduleRoutes(scheduleConfigSelected) {
      this.loading();
      this.selectedPhlebotomists = [];
      this.phebotomistsChanges = [];

      this.scheduleDistibution.date =
        scheduleConfigSelected.start_date.substring(0, 10);
      this.scheduleDistibution.numberConfiguration =
        scheduleConfigSelected.quantity_zones;
      this.scheduleDistibution.phlebotomists =
        scheduleConfigSelected.phlebotomist_schedules;
      let currentDate = scheduleConfigSelected.start_date.substring(0, 10);
      await this.fetchCurrentZones(currentDate);
      // Comprobar si la configuración seleccionada tiene rutas asignadas
      if (this.currentZones.data && this.currentZones.data.length > 0) {
        this.formatPolygons(this.currentZones.data);
        this.scheduleDistibution.phlebotomists.forEach((flebConfig) => {
          this.selectedPhlebotomists.push(flebConfig.user.id);
          this.phebotomistsChanges.push({
            phlebotomistScheduleId: flebConfig.id,
            userId: flebConfig.user.id,
          });
        });

        // Comprobar si no se han asignado citas en un día en específico
        let ordersResponse = await this.fetchScheduleOrders(
          this.scheduleDistibution.date
        );
        if (ordersResponse.data.data && ordersResponse.data.data.length > 0) {
          this.dayHasAppointments = true;
        } else if (
          ordersResponse.data.data &&
          ordersResponse.data.data.length == 0
        ) {
          this.dayHasAppointments = false;
        } else {
          this.dayHasAppointments = true;
        }
      } else {
        await this.addDefaultPolygon();
      }
      this.updateRoutesNumberDialog = true;
      this.loaded();
    },
    /**
     * Función ejecuta al cambiar el número de rutas de un Día
     * Se ejecuta en el modal de Distribución de rutas
     */
    async changeRoutesQty() {
      this.loading();
      this.polygons = [];
      this.numberConfigurationLoader = true;
      this.selectedPhlebotomists = [];
      this.phebotomistsChanges = [];
      await this.fetchZonesPerNumberConfiguration(
        this.scheduleDistibution.numberConfiguration
      );
      this.infoWinOpen = false;
      if (this.zonesPerNumberConfiguration.length > 0) {
        this.formatPolygonsToUpdateDistribution(
          this.zonesPerNumberConfiguration
        );
        this.zonesPerNumberConfiguration.forEach((zone) => {
          this.selectedPhlebotomists.push(null);
          this.phebotomistsChanges.push({
            zoneId: zone.id,
            userId: "",
          });
        });
      } else {
        await this.addDefaultPolygon();
      }
      this.numberConfigurationLoader = false;
      this.loaded();
    },
    /**
     * Función para abrir un dialog avisando al usuario que se cambió un flebotomista
     */
    openChangePhlebotomistRouteDialog(index) {
      this.currentPhlebotomistToChange = index;

      if (
        this.selectedPhlebotomists.includes(
          this.phebotomistsChanges[index].userId
        )
      ) {
        this.show({
          text: "El flebotomista ya fue seleccionado, favor de seleccionar otro",
          color: "red accent-3",
        });
        setTimeout(() => {
          this.phebotomistsChanges[index].userId =
            this.selectedPhlebotomists[index];
        }, 300);
      } else {
        this.changePhlebotomistRouteDialog = true;
      }
    },
    /**
     * Función para validar que un flebotomista no sea seleccionado dos veces
     */
    validateSelectedPhlebotomist(index) {
      if (
        this.selectedPhlebotomists.includes(
          this.phebotomistsChanges[index].userId
        )
      ) {
        this.show({
          text: "El flebotomista ya fue seleccionado, favor de seleccionar otro",
          color: "red accent-3",
        });
        setTimeout(() => {
          this.phebotomistsChanges[index].userId =
            this.selectedPhlebotomists[index];
        }, 300);
      } else {
        this.selectedPhlebotomists[index] =
          this.phebotomistsChanges[index].userId;
      }
    },
    /**
     * Función para marcar en el mapa el nombre de la zona que está seleccionando el usuario
     */
    selectZone(event) {
      // Comprobar si el mapa cuenta con rutas para seleccionar
      if (this.currentZones.data && this.currentZones.data.length > 0) {
        // Encontrar en polígono
        let polygonsArray = this.formatPolygonsToArray();

        polygonsArray.forEach((zone) => {
          if (
            pointInPolygon(
              [event.latLng.lat(), event.latLng.lng()],
              zone.polygon
            )
          ) {
            this.infoOptions.content = zone.name;
          }
        });
      } else {
        this.infoOptions.content = "No se configuraron rutas en este día.";
      }
      this.infoWinOpen = true;
      this.infoWindowPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    },
    /**
     * Función para marcar en el mapa el nombre de la zona que está seleccionando el usuario
     */
    selectZoneUpdateDistribution(event) {
      // Comprobar si el mapa cuenta con rutas para seleccionar
      if (this.zonesPerNumberConfiguration.length > 0) {
        // Encontrar en polígono
        let polygonsArray = this.formatPolygonsToArrayUpdateDistribution();

        polygonsArray.forEach((zone) => {
          if (
            pointInPolygon(
              [event.latLng.lat(), event.latLng.lng()],
              zone.polygon
            )
          ) {
            this.infoOptions.content = zone.name;
          }
        });
      } else {
        this.infoOptions.content = "No se configuraron rutas en este día.";
      }
      this.infoWinOpen = true;
      this.infoWindowPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    },
    /**
     * Función para cerrar el v-display de la configuración de horario de un día
     */
    closeScheduleDialog() {
      this.phlebotomistSelected = "";
      this.schedules = [];
      this.polygons = [];
      this.selectedPhlebotomists = [];
      this.phebotomistsChanges = [];
      this.dayHasAppointments = false;
      this.scheduleDialog = false;
      this.scheduleConfig = Object.assign({}, this.scheduleConfigObj);
      this.clearZonesPerNumberConfigurationData();
      this.clearCurrentZones();
    },
    /**
     * Función para cerrar el v-display de la configuración de rutas de un día
     */
    closeUpdateRoutesDialog() {
      this.polygons = [];
      this.selectedPhlebotomists = [];
      this.phebotomistsChanges = [];
      this.updateRoutesNumberDialog = false;
      this.dayHasAppointments = false;
      this.scheduleDistibution = Object.assign({}, this.scheduleDistibutionObj);
      this.clearZonesPerNumberConfigurationData();
      this.clearCurrentZones();
    },
    /**
     * Función para abrir el v-display para crear un día especial
     */
    addSpecialDay(dayType) {
      this.specialDayAction = "CREATE";
      this.specialDayType = dayType;
      this.specialDay.date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.addSpecialDayDialog = true;
    },
    /**
     * Función para abrir el v-display para editar un día especial
     */
    selectSpecialDay(specialDay, dayType) {
      const [day, month, year] = specialDay.date.split("-");
      this.selectedDay = `${day}-${month}-${year}`;
      this.specialDayAction = "UPDATE";
      this.specialDayType = dayType;
      this.specialDay.id = specialDay.id;
      this.specialDay.date = `${year}-${month}-${day}`;
      this.addSpecialDayDialog = true;
    },
    /**
     * Función para abrir el v-display de confirmación para eliminar un día especial.
     */
    selectSpecialDateToDelete(specialDateId, dayType) {
      this.specialDayType = dayType;
      this.specialDay.id = specialDateId;
      this.deleteSpecialDateDialog = true;
    },
    /**
     * Función para cerrar el v-display de días especiales.
     */
    closeSpecialDay() {
      this.specialDay.id = "";
      this.specialDay.date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.addSpecialDayDialog = false;
    },
    /**
     * Función para mostrar una ruta en el mapa de flebotomistas cuando no se tienen rutas asignadas
     */
    async addDefaultPolygon() {
      // Obtener el poligono que contiene todas las rutas
      await this.fetchZone(1);

      this.polygons = [];

      let polygon = this.zone.polygon.map((coord) => {
        return {
          lat: parseFloat(coord[0]),
          lng: parseFloat(coord[1]),
        };
      });
      this.polygons.push(polygon);
    },
    /**
     * Función para dar formato en la paginación de los días especiales (Aparece en el dialog de días especiales).
     */
    formatSpecialDatesPagination() {
      let holidaysLength = this.holidays.data.length;
      let holidaysPerPage = this.holidayPaginationData.perPage;
      let holidaysLastPage = parseInt(holidaysLength / holidaysPerPage);
      if (holidaysLength % holidaysPerPage > 0) {
        holidaysLastPage++;
      }
      this.holidayPaginationData.lastPage = holidaysLastPage;

      let noWorkdaysLength = this.noWorkdays.data.length;
      let noWorkdaysPerPage = this.noWorkdayPaginationData.perPage;
      let noWorkdaysLastPage = parseInt(noWorkdaysLength / noWorkdaysPerPage);
      if (noWorkdaysLength % noWorkdaysPerPage > 0) {
        noWorkdaysLastPage++;
      }
      this.noWorkdayPaginationData.lastPage = noWorkdaysLastPage;
    },
    /**
     * Función de paginación para la lista de días destivos
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la lista
     */
    holidaysPagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.holidayPaginationData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.holidayPaginationData.numberPage--;
      } else if (buttonPressed == "next") {
        this.holidayPaginationData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.holidayPaginationData.numberPage =
          this.holidayPaginationData.lastPage;
      }
      this.formatHolidaysPagination();
    },
    /**
     * Función de paginación para la lista de días destivos
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la lista
     */
    noWorkaysPagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.noWorkdayPaginationData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.noWorkdayPaginationData.numberPage--;
      } else if (buttonPressed == "next") {
        this.noWorkdayPaginationData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.noWorkdayPaginationData.numberPage =
          this.noWorkdayPaginationData.lastPage;
      }
      this.formatNoWorkdayPagination();
    },
    /**
     * Función para filtrar los días festivos tomando en cuenta el paginado
     */
    formatHolidaysPagination() {
      let index =
        this.holidayPaginationData.numberPage *
          this.holidayPaginationData.perPage -
        this.holidayPaginationData.perPage;
      this.holidaysPaginated = this.holidays.data.slice(
        index,
        this.holidayPaginationData.numberPage *
          this.holidayPaginationData.perPage
      );
    },
    /**
     * Función para filtrar los días sin servicio tomando en cuenta el paginado
     */
    formatNoWorkdayPagination() {
      let index =
        this.noWorkdayPaginationData.numberPage *
          this.noWorkdayPaginationData.perPage -
        this.noWorkdayPaginationData.perPage;
      this.noWorkdaysPaginated = this.noWorkdays.data.slice(
        index,
        this.noWorkdayPaginationData.numberPage *
          this.noWorkdayPaginationData.perPage
      );
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
     * Función para dar formato a los polígonos que se mostrarán en el mapa
     */
    formatPolygons(zonesData) {
      this.polygons = [];
      zonesData.forEach((zoneData) => {
        let polygon = zoneData.zone.polygon.map((coord) => {
          return {
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lon),
          };
        });
        this.polygons.push(polygon);
      });
    },
    /**
     * Función para dar formato a los polígonos que se mostrarán en el mapa
     */
    formatPolygonsToUpdateDistribution(zonesData) {
      this.polygons = [];
      zonesData.forEach((zone) => {
        this.polygons.push(zone.polygon);
      });
    },
    /**
     * Función para dar formato a los polígonos para saber en que polígono dio click el usuario
     */
    formatPolygonsToArray() {
      let polygonsArray = [];
      this.currentZones.data.forEach((zoneData) => {
        let polygon = zoneData.zone.polygon.map((coord) => {
          return [parseFloat(coord.lat), parseFloat(coord.lon)];
        });
        let zoneInformation = {
          name: zoneData.zone.name,
          polygon: polygon,
        };
        polygonsArray.push(zoneInformation);
      });
      return polygonsArray;
    },
    /**
     * Función para dar formato a los polígonos para saber en que polígono dio click el usuario
     */
    formatPolygonsToArrayUpdateDistribution() {
      let polygonsArray = [];
      this.zonesPerNumberConfiguration.forEach((zoneData) => {
        let polygon = zoneData.polygon.map((coord) => {
          return [parseFloat(coord.lat), parseFloat(coord.lng)];
        });
        let zoneInformation = {
          name: zoneData.name,
          polygon: polygon,
        };
        polygonsArray.push(zoneInformation);
      });
      return polygonsArray;
    },
    /**
     * Función para obtner todos los flebotomistas y ponerlos en los diferentes v-select que se encuentran el el v-display de configuración de horario
     */
    async formatPhlebotomistUsers() {
      await this.fetchPhlebotomistUsers(this.phlebotomistSearchData);
      this.phlebotomists = [];
      if (this.phlebotomistUsers.data.length > 0) {
        this.phlebotomistUsers.data.forEach((phlebotomist, index) => {
          this.phlebotomists.push({
            /*item: `${phlebotomist.name} ${phlebotomist.last_name_father} ${phlebotomist.last_name_mother}`*/
            item:'Flebotomista ' + (index + 1) ,
            value: phlebotomist.id,
          });
        });
      }
    },
    /**
     * Función para obtener el nombre de la zona mediante el id de la zona
     */
    getZoneName(zoneId) {
      let zone = {};
      this.currentZones.data.forEach((zoneData) => {
        if (zoneData.zone_id == zoneId) {
          zone = zoneData.zone;
        }
      });
      return zone.name;
    },
  },
  /**
   * Función mounted que se ejecuta automáticamente después de que se crea la vista
   * * Carga la lista de horarios
   */
  async mounted() {
    this.loading();
    try {
      let response = await this.fetchScheduleConfigs();
      if (
        response.status &&
        (response.status == 403 || response.status == 404)
      ) {
        this.show({ text: "La sesión ha expirado", color: "red" });
        this.logout();
        this.loaded();
        this.$router.push("/");
      }
      await this.fetchHolidays();
      await this.fetchNoWorkdays();
      this.formatSpecialDatesPagination();
      this.formatHolidaysPagination();
      this.formatNoWorkdayPagination();

      // Obtener todos los flebotomistas
      await this.formatPhlebotomistUsers();
    } catch (error) {
      console.log(error);
    } finally {
      this.loaded();
    }
  },
};
</script>
<style scoped>
.background-tr-color {
  background-color: #cfd8dc;
}
.map-container {
  overflow: hidden;
  padding-bottom: 30%;
  position: relative;
  height: 0;
}
.flat-map {
  overflow: hidden;
  padding-bottom: 25%;
  position: relative;
  height: 0;
}
.map-zone {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
@media (max-width: 599px) {
  .map-container {
    height: 40vh;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .map-container {
    height: 40vh;
  }
}

@media (min-width: 960px) {
  .map-container {
    height: 40vh;
  }
}
</style>