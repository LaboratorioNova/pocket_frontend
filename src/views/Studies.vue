<!--Vista para administrar los estudios-->
<template>
  <v-row>
    <v-col cols="12" class="pr-md-0 pb-0">
      <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl">
        <v-card-text>
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="d-flex flex-row mx-1 mx-sm-5 mx-md-12 mt-5">
                <v-text-field
                  v-model.lazy="serviceSearchData.search"
                  label="Estudios"
                  filled
                  rounded
                  background-color="white"
                  dense
                  :maxLength="searchFieldLoader?serviceSearchData.search.length:300"
                  @input="Search"
                  v-on:keyup.enter="searchServices()"
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
                      @click="searchServices()"
                    >
                      <!--<v-icon dark> mdi-magnify </v-icon>-->
                      <!--<nova-icon name="search" color="#87C440" size="sm"></nova-icon>-->
                      <nova-icon name="search" color="#FFFFFF" size="sm"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Buscar estudio</span>
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
                      @click="addService()"
                    >
                      <!--<v-icon dark> mdi-plus </v-icon>-->
                      <nova-icon name="add" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Agregar estudio</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="12" sm="5" lg="4" class="py-0 px-3 px-sm-7 px-md-15">
              <v-select
                v-model="serviceSearchData.availableOutside"
                label="Disponibilidad"
                filled
                rounded
                background-color="white"
                dense
                :items="availableItems"
                @change="searchServices()"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row
            v-if="
              servicesData.paginated &&
              servicesData.paginated.data &&
              servicesData.paginated.data.length > 0
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
                :headers="studiesHeaders"
                :items="servicesData.paginated.data"
                hide-default-header
                disable-sort
                hide-default-footer
                :items-per-page="serviceSearchData.perPage"
              >
                <template v-slot:body="{items}">
                  <tbody>
                    <tr v-if="$vuetify.breakpoint.smAndUp" class="background-tr-color">
                      <th class="text-left">
                        {{ studiesHeaders[0].text }}
                      </th>
                      <th class="text-left">
                        {{ studiesHeaders[1].text }}
                      </th>
                      <th class="text-center">
                        {{ studiesHeaders[2].text }}
                      </th>
                      <th class="text-center">
                        {{ studiesHeaders[3].text }}
                      </th>
                      <th class="text-center">
                        {{ studiesHeaders[4].text }}
                      </th>
                      <th class="text-center">
                        {{ studiesHeaders[5].text }}
                      </th>
                    </tr>
                    <tr
                      v-for="(item, index) in items"
                      :key="index"
                      :class="[($vuetify.breakpoint.xsOnly)?'v-data-table__mobile-table-row':'' ]"
                    >
                      <td
                        :class="
                          $vuetify.breakpoint.xsOnly
                            ? 'v-data-table__mobile-row pt-6'
                            : ''
                        "
                      >
                        <div
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[0].text }}
                        </div>
                        <div
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row__cell'
                              : ''
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
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[1].text }}
                        </div>
                        <div
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row__cell'
                              : ''
                          "
                        >
                          {{ item.name }}
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
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[2].text }}
                        </div>
                        <div
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row__cell'
                              : 'd-flex justify-center'
                          "
                        >
                          {{ item.public_cost | currency }}
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
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[3].text }}
                        </div>
                        <div
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row__cell'
                              : 'd-flex justify-center'
                          "
                        >
                          {{formatProcessTime(item.process_time)}}
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
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[4].text }}
                        </div>
                        <div
                          :class="
                            $vuetify.breakpoint.xsOnly
                              ? 'v-data-table__mobile-row__cell'
                              : 'd-flex justify-center'
                          "
                        >
                        <!--:color="item.available_outside==1?'primary':'secondary'"-->
                          <!--<v-chip
                            class="ma-2"
                            :color="item.available_outside==1?'primary':'secondary'"
                          >
                            <v-icon left>
                              {{ item.available_outside==1?'mdi-home-map-marker':'mdi-office-building-marker' }}
                            </v-icon>
                            {{ item.available_outside==1?'Domicilio':'Sucursal' }}
                          </v-chip>-->
                          <v-chip
                            v-if="item.available_outside==1"
                            class="ma-2"
                            color="#EDF6D4"
                          >
                            <nova-icon name="home" color="#87C440" size="sm"></nova-icon>
                            <!--<v-icon left>
                              {{ item.available_outside==1?'mdi-home-map-marker':'mdi-office-building-marker' }}
                            </v-icon>-->
                            <span class="accent--text">Domicilio</span>
                          </v-chip>
                          <v-chip
                            v-else
                            class="ma-2"
                            color="#EDF7FE"
                          >
                            <!--<v-icon left>
                              mdi-office-building-marker
                            </v-icon>-->
                            <nova-icon name="branch-office" color="#006cb7"></nova-icon>
                            <span class="primary--text">Sucursal</span>
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
                          class="
                            font-weight-bold
                            mr-2
                            v-data-table__mobile-row__header
                            d-flex d-sm-none
                          "
                        >
                          {{ studiesHeaders[5].text }}
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
                                class="mx-2 mt-2"
                                fab
                                dark
                                color="primary"
                                x-small
                                elevation="0"
                                v-bind="attrs"
                                v-on="on"
                                @click="selectService(item)"
                              >
                                <!--<v-icon dark> mdi-form-select </v-icon>-->
                                <nova-icon name="edit" color="#FFFFFF" size="sm"></nova-icon>
                              </v-btn>
                            </template>
                            <span>Ver detalle de estudio</span>
                          </v-tooltip>
                          <v-tooltip v-if="item.enable == 0" top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                class="mx-2 mt-2"
                                fab
                                dark
                                color="accent"
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                @click="selectServiceToChangeStatus(item)"
                                elevation="0"
                              >
                                <v-icon dark>mdi-flask-empty-plus-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Activar estudio</span>
                          </v-tooltip>
                          <v-tooltip v-else top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                class="mx-2 mt-2"
                                fab
                                dark
                                color="error"
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                @click="selectServiceToChangeStatus(item)"
                                elevation="0"
                              >
                                <v-icon dark>mdi-flask-empty-off-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Desactivar estudio</span>
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
              <p class="headline font-weight-bold primary--text">Cargando...</p>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" class="d-flex justify-center">
              <p class="headline font-weight-bold black--text">
                No hay registros disponibles
              </p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn color="grey lighten-2" @click="searchServices()" rounded>
                <span class="px-5">Reintentar</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" class="mx-1 mx-sm-5 mx-md-12">
            <v-col
              v-if="$vuetify.breakpoint.smAndDown"
              cols="12"
              md="2"
              class="pa-0"
            >
              <v-select
                label="Filas por página"
                v-model="serviceSearchData.perPage"
                background-color="white"
                type="number"
                filled
                rounded
                dense
                :items="perPageOptions"
                @change="searchServices()"
              ></v-select>
            </v-col>
            <v-col
              v-if="servicesData.paginated"
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
                    :disabled="serviceSearchData.numberPage == 1"
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
                    :disabled="serviceSearchData.numberPage == 1"
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
                >Pag. {{ serviceSearchData.numberPage }} de
                {{ servicesData.paginated.last_page }}</span
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
                      serviceSearchData.numberPage == servicesData.paginated.last_page
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
                      serviceSearchData.numberPage == servicesData.paginated.last_page
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
              v-if="$vuetify.breakpoint.mdAndUp && servicesData.paginated"
              cols="12"
              md="2"
              class="pa-0"
            >
              <v-select
                label="Filas por página"
                v-model="serviceSearchData.perPage"
                background-color="white"
                type="number"
                filled
                rounded
                dense
                :items="perPageOptions"
                @change="searchServices()"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!--INICIO Dialog para crear/editar estudio-->
    <v-dialog v-model="serviceDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="px-1 rounded-xl">
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
                      @click="closeServiceDialog()"
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
                  {{
                    serviceAction == "CREATE"
                      ? "Crear estudio"
                      : "Editar estudio"
                  }}
                </p>
              </v-col>
            </v-row>
            <v-form
              ref="formService"
              v-model="validServiceForm"
              lazy-validation
            >
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="Nombre"
                    v-model="service.name"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    label="Días de proceso"
                    v-model="service.processTime"
                    background-color="white"
                    type="number"
                    filled
                    rounded
                    dense
                    :rules="processTimeRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    label="Costo público"
                    v-model="service.publicCost"
                    background-color="white"
                    type="number"
                    filled
                    rounded
                    dense
                    :rules="publicCostRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="service.availableOutside"
                    label="Disponibilidad"
                    filled
                    rounded
                    background-color="white"
                    dense
                    :items="availableItemsService"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    label="Requisitos"
                    v-model="service.request"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="requestRules"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            v-if="serviceAction == 'UPDATE'"
            color="error"
            @click="deleteServiceDialog = true"
            rounded
          >
            <span class="px-5">Eliminar</span>
          </v-btn>
          <v-btn
            v-if="serviceAction == 'UPDATE'"
            color="primary"
            @click="_updateService()"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              service.name == '' ||
              service.processTime == null ||
              service.processTime == '' ||
              service.publicCost == null ||
              service.publicCost == '' ||
              service.request == '' ||
              !validServiceForm
            "
          >
            <span class="px-5">Guardar</span>
          </v-btn>
          <v-btn
            v-if="serviceAction == 'CREATE'"
            color="primary"
            @click="_createService()"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              service.name == '' ||
              service.processTime == null ||
              service.processTime == '' ||
              service.publicCost == null ||
              service.publicCost == '' ||
              service.request == '' ||
              !validServiceForm
            "
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para crear/editar estudio-->
    <!--INICIO Dialog para cambiar estatus (Activar/Desactivar) de estudio-->
    <v-dialog v-model="serviceStatusDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          {{
            service.enable ? "Desactivar estudio" : "Activar estudio"
          }}
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <p class="title px-5 text-center">
                  ¿Desea {{ service.enable ? "desactivar" : "activar" }} el registro seleccionado?
                </p>
                <p v-if="service.enable" class="subtitle-1 text-center">
                  Al desactivar el estudio implica que ya no estará disponible para que los clientes lo soliciten.
                </p>
                <p v-else class="subtitle-1 text-center">
                  El estudio aparecerá disponible para que los clientes puedan solicitarlo.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="error"
            @click="serviceStatusDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            @click="_changeServiceStatus()"
            rounded
            :loading="loadingStatusDialogButton"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para cambiar estatus (Activar/Desactivar) de estudio-->
    <!--INICIO Dialog para eliminar estudio-->
    <v-dialog v-model="deleteServiceDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Eliminar estudio
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
            @click="deleteServiceDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            @click="_deleteService()"
            rounded
            :loading="deleteButtonLoader"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para eliminar estudio-->
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { validations } from "@/share/Validations";
import { ErrorHandler } from "../share/ErrorHandler";
export default {
  computed: {
    ...mapState("loader", ["loaderVisible"]),
    ...mapState("service", ["servicesData"]),
  },
  data() {
    return {
      saveButtonLoader: false,
      loadingStatusDialogButton: false,
      deleteButtonLoader: false,
      searchFieldLoader: false,
      perPageOptions: [5, 10, 15, 20, 30, 50],
      serviceSearchData: {
        numberPage: 1,
        perPage: 10,
        search: "",
        activeLoader: true,
        availableOutside: 2
      },
      service: {
        id: "",
        name: "",
        publicCost: null,
        processTime: null,
        availableOutside: 1,
        request: "",
      },
      serviceObj: {
        id: "",
        name: "",
        publicCost: null,
        processTime: null,
        availableOutside: 1,
        request: "",
      },
      studiesHeaders: [
        {
          align: "center",
          text: "Id",
          value: "id",
        },
        {
          align: "center",
          text: "Nombre",
          value: "name",
        },
        {
          align: "center",
          text: "Precio público",
          value: "public_cost",
        },
        {
          align: "center",
          text: "Días de proceso",
          value: "process_time",
        },
        {
          align: "center",
          text: "Disponibilidad",
          value: "available_outside",
        },
        {
          align: "center",
          text: "Acciones",
          value: "detail",
        }
      ],
      availableItems: [
        {
          text: "Todos",
          value: 2
        },
        {
          text: "A domicilio",
          value: 1
        },
        {
          text: "Solo en sucursal",
          value: 0
        }
      ],
      availableItemsService: [
        {
          text: "A domicilio",
          value: 1
        },
        {
          text: "Solo en sucursal",
          value: 0
        }
      ],
      validServiceForm: false,
      serviceAction: "",
      serviceDialog: false,
      serviceStatusDialog: false,
      deleteServiceDialog: false,
      // Validaciones de los campos del formulario
      nameRules: validations.generalMValidation({
        required: true,
        name: "nombre del estudio",
      }),
      publicCostRules: validations.numberMValidation({
        required: true,
        name: "costo público",
      }),
      processTimeRules: validations.generalMValidation({
        required: true,
        name: "tiempo de proceso",
      }),
      requestRules: validations.generalPluralMValidation({
        required: true,
        name: "requisitos",
      }),
    };
  },
  methods: {
    ...mapActions("service", [
      "fetchServices",
      "createService",
      "updateService",
      "deleteService",
      "changeServiceStatus",
    ]),
    ...mapMutations("service", ["clearServicesData"]),
    ...mapMutations("notification", ["show"]),
    /**
     * Función para validar que los campos del formulario de usuario hayan sido llenados de la forma correcta.
     */
    validateFormService() {
      if (this.$refs.formService.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para buscar en tiempo real
     */
    Search() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchServices();
      }, 300);
    },
    /**
     * Función para crear un estudio
     */
    async _createService() {
      if (this.validateFormService()) {
        let response = await this.createService(this.service);
        if (response.status && response.status > 199 && response.status < 300) {
          this.serviceAction = "";
          this.serviceDialog = false;
          await this.fetchServices(this.serviceSearchData);
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
        this.saveButtonLoader = false;
      }
    },
    /**
     * Función para editar un estudio
     */
    async _updateService() {
      if (this.validateFormService()) {
        let response = await this.updateService(this.service);
        if (response.status && response.status > 199 && response.status < 300) {
          await this.fetchServices(this.serviceSearchData);
          this.serviceAction = "";
          this.serviceDialog = false;
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
        this.saveButtonLoader = false;
      }
    },
    /**
     * Función para eliminar un estudio
     */
    async _deleteService() {
      let response = await this.deleteService(this.service.id);
      if (response.status && response.status > 199 && response.status < 300) {
        await this.fetchServices(this.serviceSearchData);
        this.show({
          text: "El registro se ha eliminado correctamente",
          color: "primary",
        });
        this.deleteServiceDialog = false;
        this.serviceDialog = false;
      } else {
        let error = new ErrorHandler();
        this.show({
          text: error.formatError(response.status),
          color: "red accent-3",
        });
      }
      this.deleteButtonLoader = false;
    },
    /**
     * Cambiar el estatus de un estudio
     */
    async _changeServiceStatus() {
      let serviceData = {
        id: this.service.id,
        status: this.service.enable ? 0 : 1,
      };
      let response = await this.changeServiceStatus(serviceData);
      this.serviceStatusDialog = false;
      if (response.status && response.status > 199 && response.status < 300) {
        if (response.data.data.enable == 1) {
          this.show({
            text: "El registro se ha activado correctamente",
            color: "primary",
          });
        } else {
          this.show({
            text: "El registro se ha desactivado correctamente",
            color: "primary",
          });
        }
        await this.fetchServices(this.serviceSearchData);
      } else {
        this.show({
          text: "Ha ocurrido un problema al actualizar el regitro",
          color: "red accent-3",
        });
      }
      this.loadingStatusDialogButton = false;
    },
    /**
     * Función para buscar estudios.
     * * Siempre que se realiza un búsqueda el número de página debe ser reiniciado.
     */
    async searchServices() {
      this.searchFieldLoader = true;
      this.serviceSearchData.numberPage = 1;
      await this.fetchServices(this.serviceSearchData);
      this.searchFieldLoader = false;
    },


    /**
     * Función de paginación para la tabla de estudios
     * * Esta función se manda a llamar con los botones que se encuentran en la parte inferior de la tabla
     */
    async pagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.serviceSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.serviceSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.serviceSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.serviceSearchData.numberPage = this.servicesData.paginated.last_page;
      }
      await this.fetchServices(this.serviceSearchData);
    },
    /**
     * Función que abre el v-dialog de crear estudio
     * * La función reinicia el objeto service
     * * La función reinicia las validaciones del formulario
     */
    addService() {
      this.serviceAction = "CREATE";
      this.service = JSON.parse(JSON.stringify(this.serviceObj));
      // Reiniciar validación del formulario
      if (this.$refs.formService) {
        this.$refs.formService.resetValidation();
      }
      this.serviceDialog = true;
    },
    /**
     * Función que abre un v-dialog para cambiar el estatus de un estudio
     */
    selectServiceToChangeStatus(serviceSelected) {
      this.service.id = serviceSelected.id;
      this.service.enable = serviceSelected.enable;
      this.serviceStatusDialog = true;
    },
    /**
     * Función que abre un v-dialog con los datos del estudio seleccionado
     */
    selectService(serviceSelected) {
      this.serviceAction = "UPDATE";
      this.serviceDialog = true;
      this.service.id = serviceSelected.id;
      this.service.name = serviceSelected.name;
      this.service.publicCost = serviceSelected.public_cost.toString();
      this.service.processTime = serviceSelected.process_time.toString();
      this.service.request = serviceSelected.request;
    },
    /**
     * Función que cierra el v-dialog de Crear/Editar estudio
     */
    closeServiceDialog() {
      this.serviceDialog = false;
    },
    /**
     * Función para mostrar los días de proceso. Si pasan más de 7 días se mostrarán en días y semanas
     */
    formatProcessTime(processTime) {
      let weeks = 0;
      let days = 0;
      if (processTime > 6) {
        weeks = Math.floor(processTime/7);
        days = processTime%7;
      } else {
        days = processTime;
      }

      let formattedWeeks = weeks == 0?'':weeks > 1?`${weeks} semanas`:`${weeks} semana`;
      let formattedDays = days == 0?'':days > 1?`${days} días`:`${days} día`;

      if (formattedWeeks != '' && formattedDays != '') {
        return `${formattedWeeks} y ${formattedDays}`;
      } else if (formattedWeeks != '' && formattedDays == '') {
        return `${formattedWeeks}`;
      } else if (formattedWeeks == '' && formattedDays != '') {
        return `${formattedDays}`;
      } else {
        return `${processTime} días`;
      }
    }
  },
  /**
   * Función mounted que se ejecuta automáticamente después de que se crea la vista
   * * Carga la lista se estudios
   */
  async mounted() {
    await this.fetchServices(this.serviceSearchData);
    
  },

  
  /**
   * Función que se ejecuta automáticamente después de abandonar esta vista
   * * Se limpia el estado de servicesData que guardan la lista de estudios
   */
  beforeDestroy() {
    this.clearServicesData();
  },
};
</script>
<style scoped>
.background-tr-color {
  background-color: #CFD8DC;
}
</style>