<!--Vista para administrar las citas-->
<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col cols="12" class="pr-md-0 pb-0">
        <v-card elevation="0" color="lightCyan" class="ma-3 ma-md-7 rounded-xl">
          <v-card-text>
            <v-row dense class="mx-1 mx-sm-5 mx-md-12 mt-5">
              <v-col v-if="appointmentData.id != ''" cols="12" class="d-flex justify-end">
                <p class="title font-weight-bold mb-1">Estatus de cita: <span class="text-uppercase primary--text">{{appointmentData.status}}</span></p>
              </v-col>
              <v-col cols="12">
                <p class="display-1 primary--text font-weight-bold">Información de la cita</p>
              </v-col>
              <!--Infomación de la cita (campos de texto)-->
              <v-form refs="appointmentForm">

              <v-col cols="12">
                <v-row dense>
                  <!--Cliente-->
                  <v-col cols="12" class="py-0" :class="$vuetify.breakpoint.smAndDown?'pb-4':''">
                    <p class="headline mb-1">Cliente</p>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="appointmentData.name"
                      label="Nombre del cliente"
                      refs="customerName"
                      filled
                      rounded
                      background-color="white"
                      dense
                      height="10"
                      readonly
                      @click="openCustomerDialog()"
                      :disabled="appointmentData.status=='Cancelado' || appointmentData.id != ''"
                    >
                      <template v-slot:append class="mt-0">
                        <v-btn
                        class="v-text-field-append-button"
                          icon
                          color="primary"
                          @click="openCustomerDialog()"
                          :disabled="appointmentData.status=='Cancelado' || appointmentData.id != ''"
                        >
                          <!--<v-icon>mdi-file-edit</v-icon>-->
                          <nova-icon name="edit" :color="appointmentData.status=='Cancelado' || appointmentData.id != ''?'#BDBDBD':'#006CB7'"></nova-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      v-model="appointmentData.phoneNumber"
                      label="Teléfono"
                      filled
                      rounded
                      background-color="white"
                      dense
                      readonly
                      :disabled="appointmentData.status=='Cancelado'"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      v-model="appointmentData.email"
                      label="Correo"
                      filled
                      rounded
                      background-color="white"
                      dense
                      readonly
                      :disabled="appointmentData.status=='Cancelado'"
                    ></v-text-field>
                  </v-col>
                  <!--Cita-->
                  <v-col cols="12" class="py-0" :class="$vuetify.breakpoint.smAndDown?'pb-4':''">
                    <p class="headline mb-1">Cita</p>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="appointmentData.address"
                      label="Dirección"
                      filled
                      rounded
                      background-color="white"
                      dense
                      readonly
                      :disabled="appointmentData.customerId=='' || appointmentData.status=='Cancelado'"
                      @click="$_fetchCustomerAddresses()"
                    >
                      <template v-slot:append class="mt-0">
                        <v-btn
                        class="v-text-field-append-button"
                          icon
                          color="primary"
                          :disabled="appointmentData.customerId=='' || appointmentData.status=='Cancelado'"
                          @click="$_fetchCustomerAddresses()"
                        >
                          <!--<v-icon>mdi-file-edit</v-icon>-->
                          <nova-icon name="edit" :color="appointmentData.customerId=='' || appointmentData.status=='Cancelado'?'#BDBDBD':'#006CB7'"></nova-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Fecha de la cita"
                      filled
                      rounded
                      background-color="white"
                      dense
                      readonly
                      :disabled="appointmentData.addressId == '' || appointmentData.status=='Cancelado'"
                      @click="openDateDialog()"
                    >
                      <template v-slot:append class="mt-0">
                        <v-btn
                          class="v-text-field-append-button"
                          icon
                          color="primary"
                          :disabled="appointmentData.addressId == '' || appointmentData.status=='Cancelado'"
                          @click="openDateDialog()"
                        >
                          <!--<v-icon>mdi-file-edit</v-icon>-->
                          <nova-icon name="edit" :color="appointmentData.addressId == '' || appointmentData.status=='Cancelado'?'#BDBDBD':'#006CB7'"></nova-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                    
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      v-model="appointmentData.hour"
                      label="Hora de la cita"
                      filled
                      rounded
                      background-color="white"
                      dense
                      readonly
                      :disabled="appointmentData.status=='Cancelado'"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              </v-form>
              <!--Información de los pacientes-->
              <v-col cols="12" class="py-0">
                <p class="headline mb-2">Pacientes ({{patientServicesSelected.length}})</p>
              </v-col>
              <v-col cols="12">
                <v-data-table
                  v-if="patientsList.length > 0"
                  class="mb-5"
                  no-data-text="No hay datos disponibles."
                  no-results-text="No hay datos disponibles."
                  loading-text="Cargando datos..."
                  :calculate-widths="true"
                  dense
                  :headers="patientsHeaders"
                  :items="patientsList"
                  hide-default-header
                  disable-sort
                  hide-default-footer
                >
                  <template v-slot:header>
                    <thead>
                      <tr v-if="$vuetify.breakpoint.smAndUp" class="background-tr-color">
                        <th class="text-left">
                          <p class="title primary--text my-2">{{ patientsHeaders[0].text }}</p>
                        </th>
                        <th class="text-left">
                          <p class="title primary--text my-2">{{ patientsHeaders[1].text }}</p>
                        </th>
                        <th class="text-center">
                          <p class="title primary--text my-2">{{ patientsHeaders[2].text }}</p>
                        </th>
                      </tr>
                    </thead>
                  </template>
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr
                        v-for="(item, index) in items"
                        :key="index"
                        :class="[
                          $vuetify.breakpoint.xsOnly ? 'v-data-table__mobile-table-row' : '',
                        ]"
                        class="rounded-xl"
                      >
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly ? 'v-data-table__mobile-row pt-6' : ''
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
                            {{ patientsHeaders[0].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <p class="subtitle-1 mb-0">{{ item.name }} {{ item.lastNameFather }} {{ item.lastNameMother }}</p>
                            <p class="subtitle-2 mb-1">{{ item.gender }} {{ getAge(item.birthdate.substring(0, 10)) }} años</p>
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly ? 'v-data-table__mobile-row pt-6' : ''
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
                            {{ patientsHeaders[1].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : ''
                            "
                          >
                            <p v-if="patientServicesSelected[index] && patientServicesSelected[index].servicesSelected.length > 0" class="subtitle-1 font-weight-bold mb-0">{{ getPatientTotal(patientServicesSelected[index].servicesSelected) | currency}}</p>
                            <p v-else class="subtitle-1 font-weight-bold mb-0">$0.00</p>
                          </div>
                        </td>
                        <td
                          :class="
                            $vuetify.breakpoint.xsOnly ? 'v-data-table__mobile-row pt-6' : ''
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
                            {{ patientsHeaders[2].text }}
                          </div>
                          <div
                            :class="
                              $vuetify.breakpoint.xsOnly
                                ? 'v-data-table__mobile-row__cell'
                                : 'd-flex justify-center'
                            "
                          >
                            <v-btn
                              class="mx-2 my-1"
                              color="accent"
                              small
                              rounded
                              @click="openPatientServicesDialog(item, index)"
                            >
                              Estudios ({{patientServicesSelected[index].servicesSelected.length}})
                            </v-btn>
                            <v-btn
                              class="mx-2 my-1"
                              color="primary"
                              small
                              rounded
                              @click="selectPatient(item)"
                              :disabled="appointmentData.status=='Cancelado' || appointmentData.customerPatientId == item.id"
                            >
                              Editar
                            </v-btn>
                            <v-btn
                              class="mx-2 my-1"
                              color="red"
                              small
                              :dark="appointmentData.status!='Cancelado'"
                              rounded
                              @click="removePatient(item.id)"
                              :disabled="appointmentData.status=='Cancelado'"
                            >
                              Eliminar
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
                <p v-else class="title font-weight-bold primary--text text-center">
                  No se han agregado pacientes
                </p>
              </v-col>
              <v-col cols="12" class="mb-5">
                <v-row>
                  <v-col v-if="appointmentData.status!= 'Cancelado'" cols="12" class="d-sm-flex justify-center">
                    <v-btn
                      class="mx-2 my-2 my-sm-1"
                      color="grey lighten-2"
                      rounded
                      :block="$vuetify.breakpoint.xsOnly"
                      @click="returnToAppointmentsDialog = true"
                    >
                      Regresar
                    </v-btn>
                    <v-btn
                      v-if="appointmentData.id != ''"
                      class="mx-2 my-2 my-sm-1"
                      color="red"
                      rounded
                      dark
                      :block="$vuetify.breakpoint.xsOnly"
                      @click="cancelAppointmentDialog = true"
                    >
                      Cancelar cita
                    </v-btn>
                    <v-btn
                      class="mx-2 my-2 my-sm-1"
                      color="accent"
                      rounded
                      :disabled="appointmentData.customerId == ''"
                      :block="$vuetify.breakpoint.xsOnly"
                      @click="openPatientDialog()"
                    >
                      Agregar paciente
                    </v-btn>
                    <v-btn
                      v-if="appointmentData.id == ''"
                      class="mx-2 my-2 my-sm-1"
                      color="primary"
                      rounded
                      :block="$vuetify.breakpoint.xsOnly"
                      :disabled="appointmentData.date == '' || patientServicesSelected.length == 0 || patientServicesSelected.filter(patientService => patientService.servicesSelected.length == 0).length > 0"
                      @click="$_createAppointment()"
                    >
                      Guardar
                    </v-btn>
                    <v-btn
                      v-else
                      class="mx-2 my-2 my-sm-1"
                      color="primary"
                      rounded
                      :block="$vuetify.breakpoint.xsOnly"
                      :disabled="appointmentData.date == '' || patientServicesSelected.length == 0 || patientServicesSelected.filter(patientService => patientService.servicesSelected.length == 0).length > 0"
                      @click="$_updateAppointment()"
                    >
                      Guardar
                    </v-btn>
                  </v-col>
                  <v-col v-else cols="12" xl="4" order="1" order-xl="2" class="d-sm-flex justify-end">
                    <v-btn
                      class="mx-2 my-2 my-sm-1"
                      color="grey lighten-2"
                      rounded
                      :block="$vuetify.breakpoint.xsOnly"
                      to="/citas"
                      :disabled="false"
                    >
                      Regresar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="text-end">
                    <p v-if="patientsList.length > 0" class="mb-0">
                      <span class="title primary--text">Subtotal: </span>
                      <span v-if="patientServicesSelected.length > 0 && patientServicesSelected[0].servicesSelected.length > 0" class="headline font-weight-bold">{{ getAppointmentSubtotal() | currency}}</span>
                      <span v-else class="headline font-weight-bold">$0.00</span>
                    </p>
                    <p v-if="patientsList.length > 0 && visitCosts.visitCost" class="mb-0">
                      <span class="title primary--text">Toma a domicilio: </span>
                      <span class="headline font-weight-bold">{{ visitCosts.visitCost | currency}}</span>
                    </p>
                    <p v-if="patientsList.length > 1 && visitCosts.patientCost" class="mb-0">
                      <span class="title primary--text">Toma adicional: </span>
                      <span class="headline font-weight-bold">{{ visitCosts.patientCost*(patientsList.length-1) | currency}}</span>
                    </p>
                    <p v-if="patientsList.length > 0" class="mb-0">
                      <span class="title primary--text">Total: </span>
                      <span v-if="patientServicesSelected.length > 0 && patientServicesSelected[0].servicesSelected.length > 0" class="headline font-weight-bold">{{ getAppointmentTotal() | currency}}</span>
                      <span v-else class="headline font-weight-bold">$0.00</span>
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--INICIO Dialog para buscar clientes-->
    <v-dialog v-model="customerSearcherDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <!--<v-row>
              <v-col cols="12" class="d-flex justify-end pb-0">
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
              </v-col>
            </v-row>-->
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
                    :label="$vuetify.breakpoint.mdAndUp?'Filtrar por nombre de cliente':'Cliente'"
                    filled
                    rounded
                    background-color="white"
                    dense
                    v-on:keyup.enter="searchCustomers()"
                    @input="Search"
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
                    <span>Buscar cliente</span>
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
                        @click="openCreateCustomerDialog()"
                      >
                        <!--<v-icon dark> mdi-plus </v-icon>-->
                        <nova-icon name="add" color="#FFFFFF"></nova-icon>
                      </v-btn>
                    </template>
                    <span>Agregar cliente</span>
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
                          v-model="selected"
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
            @click="customerSearcherDialog = !customerSearcherDialog, quitFocus()"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="selected==null"
            color="primary"
            rounded
            @click="addCustomerToAppointment()"
          >
            <span class="px-5">Aceptar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para buscar clientes-->
    <!--INICIO Dialog para insertar clientes-->
    <v-dialog v-model="createCustomerDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-6">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Crear cliente
                </p>
              </v-col>
            </v-row>
            <v-form ref="customerForm" v-model="validCustomerForm" lazy-validation>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="Nombre"
                    v-model="customerFormData.name"
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
                    v-model="customerFormData.lastNameFather"
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
                    v-model="customerFormData.lastNameMother"
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
                    v-model="customerFormData.phone"
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
                  <v-menu
                    ref="customerBirthdateMenu"
                    v-model="customerBirthdateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="customerBirthdateFormatted"
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
                      v-model="customerFormData.birthdate"
                      @input="customerBirthdateMenu = false"
                      locale="es"
                      :max="getMinBirthdate()"
                      min="1920-01-01"
                      :active-picker.sync="customerActivePicker"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select
                    label="Genero"
                    v-model="customerFormData.gender"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :items="['Hombre', 'Mujer']"
                    :rules="genderRules"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="Email"
                    v-model="customerFormData.email"
                    background-color="white"
                    filled
                    rounded
                    dense
                    @keyup="customerFormData.email = customerFormData.email.toLowerCase().trim()"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="Contraseña"
                    v-model="customerFormData.password"
                    background-color="white"
                    filled
                    rounded
                    dense
                    autocomplete="new-password"
                    :append-icon="showCustomerPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showCustomerPass ? 'text' : 'password'"
                    @click:append="showCustomerPass = !showCustomerPass"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="createCustomerDialog = false"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            color="primary"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              customerFormData.name == '' ||
              customerFormData.lastNameFather == '' ||
              customerFormData.lastNameMother == '' ||
              customerFormData.phone == '' ||
              customerFormData.email == '' ||
              customerFormData.password == '' ||
              customerFormData.birthdate == '' ||
              customerFormData.gender == '' ||
              !validCustomerForm
            "
            @click="$_createUser()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para insertar clientes-->
    <!--INICIO Dialog para insertar direcciones-->
    <v-dialog v-model="createAddressDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-6">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Crear dirección
                </p>
              </v-col>
            </v-row>
            <v-form ref="addressForm" v-model="validAddressForm" lazy-validation>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="addressFormData.street"
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
                    v-model="addressFormData.numExt"
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
                    v-model="addressFormData.numInt"
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
                    v-model="addressFormData.neighborhood"
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
                    v-model="addressFormData.zipCode"
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
                    v-model="addressFormData.city"
                    label="Ciudad"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="cityRules"
                    :readonly="true"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="addressFormData.state"
                    label="Estado"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="stateRules"
                    :readonly="true"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    v-model="addressFormData.references"
                    label="Referencias"
                    background-color="white"
                    filled
                    rounded
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="createAddressDialog = false"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            color="primary"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              addressFormData.state == '' ||
              addressFormData.city == '' ||
              addressFormData.zipCode == '' ||
              addressFormData.neighborhood == '' ||
              addressFormData.street == '' ||
              addressFormData.numExt == '' ||
              !validAddressForm
            "
            @click="$_createAddress()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para insertar direcciones-->
    <!--INICIO Dialog para seleccionar una dirección del cliente-->
    <v-dialog v-model="customerAddressesDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="8" offset="2" class="pt-5">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Seleccionar dirección
                </p>
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-end pt-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2 mt-2"
                      fab
                      dark
                      color="primary"
                      small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="openCreateAddressDialog()"
                    >
                      <!--<v-icon dark> mdi-plus </v-icon>-->
                      <nova-icon name="add" color="#FFFFFF"></nova-icon>
                    </v-btn>
                  </template>
                  <span>Agregar dirección</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="customerAddresses.data && customerAddresses.data.length > 0" cols="12" class="py-0">
                <v-container
                  id="scroll-target"
                  :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12" class="py-0">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group
                          v-model="addressesSelected"
                        >
                          <template v-for="(item) in customerAddresses.data">
                            <v-list-item :key="item.id" class="my-2 white rounded-xl">
                              <template v-slot:default="{ active }">
                                <v-list-item-content class="py-1">
                                  <v-list-item-title :class="active?'primary--text':''" v-text="`${item.street} ${item.num_ext} Col. ${item.neighborhood}`"></v-list-item-title>

                                  <v-list-item-subtitle
                                    v-text="`CP. ${item.zip_code} ${item.city}, ${item.state}`"
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
                <p class="title text-center">No hay direcciones registradas, da click en el botón de "+" para agregar una</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="customerAddressesDialog = !customerAddressesDialog, quitFocus()"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="addressesSelected==null"
            color="primary"
            rounded
            @click="addAddressToAppointment()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para seleccionar una dirección del cliente-->
    <!--INICIO Dialog para seleccionar la fecha de la cita-->
    <v-dialog v-model="dateAppointmentDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="pt-5">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Fecha para la cita
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0">
                <v-menu
                  v-model="appointmentDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormattedAux"
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
                        @click="appointmentDateMenu = true"
                        :disabled="dateAppointmentLoader"
                      >
                        <v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDateAux"
                    no-title
                    @input="appointmentDateMenu = false"
                    :min="todayDate"
                    :max="maximunDay"
                    locale="es"
                    @change="$_fetchSchedulesPerDay()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" class="py-0">
                <p class="subtitle-1">Recomendamos utilizar el flebotomista por defecto. Para no afectar la ruta de otro flebotomista</p>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select v-model="phlebotomistScheduleSelected.phlebotomistId" label="Flebotomista" :items="phlebotomistsList" background-color="white" filled rounded @change="validatePhlebotomistSelected()" :disabled="dateAppointmentLoader">
                  <template slot="selection" slot-scope="data">
                    <span><span v-if="data.item.recommended">🔵</span> {{ data.item.item }}</span>
                  </template>
                  <template slot="item" slot-scope="data">
                    <span><span v-if="data.item.recommended">🔵</span> {{ data.item.item }}</span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row v-if="!dateAppointmentLoader">
              <v-col v-if="phlebotomistSchedule.length > 0" cols="12" class="py-0">
                <v-container
                  id="scroll-target"
                  :style="$vuetify.breakpoint.mdAndUp?'max-height: 450px':'max-height: 37vh'"
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12" class="py-0">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group
                          v-model="selectedAppointmentHours"
                          multiple
                        >
                          <template v-for="(item) in phlebotomistSchedule">
                            <v-list-item dense :key="item.id" class="my-2 white rounded-xl" :disabled="item.isBreakFast || item.isReserved || (selectedAppointmentHours.length > 0 && !validateAppointmentSelection(item.index))" :value="item.index">
                              <template v-slot:default="{ active }">
                                <v-list-item-content class="py-1">
                                  <!--<v-list-item-title :class="active?'primary--text':''" v-text="`${formatSchedules(item)}`"></v-list-item-title>-->
                                  <v-row>
                                    <v-col cols="7">
                                      <span class="subtitle-1" :class="active?'primary--text':''">{{formatSchedules(item)}}</span>
                                    </v-col>
                                    <v-col cols="5" class="d-flex justify-end align-center">
                                      <span v-if="item.isBreakFast" class="subtitle-2 text-center amber--text font-weight-bold">Comida</span>
                                      <span v-else-if="item.isReserved" class="subtitle-2 text-center red--text font-weight-bold">Reservado</span>
                                      <span v-else class="subtitle-2 text-center teal--text font-weight-bold">Disponible</span>
                                    </v-col>
                                  </v-row>
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
                <p class="title text-center">No se ha seleccionado ninguna fecha, favor de seleccionar alguna.</p>
              </v-col>
            </v-row>
            <v-row v-else justify="center">
              <v-progress-circular
                color="primary"
                indeterminate
                size="100"
              ></v-progress-circular>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="cancelDateTimeAppointment()"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="selectedAppointmentHours.length == 0"
            color="primary"
            rounded
            @click="addDateTimeToAppointment()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para seleccionar la fecha de la cita-->
    <!--INICIO Dialog para seleccionar un flebotomista-->
    <v-dialog v-model="phlebotomistsDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="pt-5">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Seleccionar flebotomista
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="phlebotomistsList.data && phlebotomistsList.data.length > 0" cols="12" class="py-0">
                <v-container
                  id="scroll-target"
                  :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group
                          v-model="phlebotomistSelected"
                        >
                          <template v-for="(item) in phlebotomistsList.data">
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
                <p class="headline text-center">No se encontraron registros</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="phlebotomistsDialog = !phlebotomistsDialog"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="phlebotomistSelected==null"
            color="primary"
            rounded
            @click="addPhlebotomistToAppointment()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para seleccionar un flebotomista-->
    <!--INICIO Dialog para agregar un paciente a la lista de pacientes que se van a atender-->
    <v-dialog v-model="customerPatientsDialog" max-width="700" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="pt-5">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Seleccionar pacientes
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0">
                <div class="d-flex flex-row">
                  <v-text-field
                    v-model="patientsSearchData.search"
                    :label="$vuetify.breakpoint.mdAndUp?'Filtrar por nombre del paciente':'Paciente'"
                    filled
                    rounded
                    background-color="white"
                    dense
                    :maxLength="searchFieldLoader?patientsSearchData.search.length:300"
                    v-on:keyup.enter="searchPatients()"
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
                        :loading="searchFieldLoader"
                        @click="searchPatients()"
                        elevation="0"
                      >
                        <!--<v-icon dark> mdi-magnify </v-icon>-->
                        <nova-icon name="search" color="#FFFFFF" size="sm"></nova-icon>
                      </v-btn>
                    </template>
                    <span>Buscar pacientes</span>
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
                        @click="addPatient()"
                        elevation="0"
                      >
                        <!--<v-icon dark> mdi-plus </v-icon>-->
                        <nova-icon name="add" color="#FFFFFF"></nova-icon>
                      </v-btn>
                    </template>
                    <span>Agregar paciente</span>
                  </v-tooltip>
                </div>
              </v-col>
              <v-col v-if="patientsData && patientsData.length > 0" cols="12" class="py-0">
                <v-container
                  id="scroll-target"
                  :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                  class="overflow-y-auto"
                >
                  <v-row style="max-height: 550px">
                    <v-col cols="12">
                      <v-list two-line class="lightBlue" flat>
                        <v-list-item-group
                          v-model="selectedPatient"
                          multiple
                        >
                          <template v-for="(item) in patientsData">
                            <v-list-item :key="item.id" class="my-2 white rounded-xl" :disabled="validateSelectedPatient(item.id)">
                              <template v-slot:default="{ active }">
                                <v-list-item-content class="py-1">
                                  <v-list-item-title :class="validateSelectedPatient(item.id)?'grey--text':active?'primary--text':''" v-text="`${item.name} ${item.last_name_father} ${item.last_name_mother}`"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>

                                  <v-icon
                                    v-if="active || validateSelectedPatient(item.id)"
                                    :color="validateSelectedPatient(item.id)?'grey':'primary'"
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
                <p class="title text-center">No se encontraron registros de pacientes</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="customerPatientsDialog = !customerPatientsDialog"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="selectedPatient == null"
            color="primary"
            rounded
            @click="addPatientToAppointment()"
          >
            <span class="px-5">Aceptar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para agregar un paciente a la lista de pacientes que se van a atender-->
    <!--INICIO Dialog para agregar/editar/eliminar un paciente-->
    <v-dialog v-model="patientDialog" max-width="700" persistent>
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
                      v-bind="attrs"
                      v-on="on"
                      @click="patientDialog = false"
                      elevation="0"
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
                  {{patientAction == 'CREATE' ? "Añadir paciente": "Editar paciente"}}
                </p>
              </v-col>
            </v-row>
            <v-form
              ref="patientForm"
              v-model="validPatientForm"
              lazy-validation
            >
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="Nombre(s)"
                    v-model="patientFormData.name"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="namePatientRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    label="Apellido paterno"
                    v-model="patientFormData.lastNameFather"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="lastNameFatherPatientRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    label="Apellido materno"
                    v-model="patientFormData.lastNameMother"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :rules="lastNameMotherPatientRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-menu
                    ref="birthdateMenu"
                    v-model="birthdateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    :absolute="$vuetify.breakpoint.mdAndUp"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="birthdateFormatted"
                        label="Fecha de nacimiento"
                        readonly
                        background-color="white"
                        filled
                        rounded
                        dense
                        v-bind="attrs"
                        v-on="on"
                        :rules="birthdateRules"
                      >
                        <template v-slot:append class="mt-0">
                          <v-btn
                            class="v-text-field-append-button"
                            icon
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="patientFormData.birthdate"
                      :active-picker.sync="activePicker"
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="1920-01-01"
                      @change="changeBirthdate"
                      locale="es"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select
                    label="Genero"
                    v-model="patientFormData.gender"
                    background-color="white"
                    filled
                    rounded
                    dense
                    :items="['Hombre', 'Mujer']"
                    :rules="genderRules"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            v-if="patientAction == 'UPDATE'"
            color="error"
            @click="deletePatientDialog = true"
            rounded
          >
            <span class="px-5">Eliminar</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="closePatientDialog()"
            rounded
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            v-if="patientAction == 'CREATE'"
            color="primary"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              patientFormData.name == '' ||
              patientFormData.lastNameMother == '' ||
              patientFormData.lastNameMother == '' ||
              patientFormData.birthdate == '' ||
              patientFormData.gender == '' ||
              !validPatientForm
            "
            @click="$_createPatient()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
          <v-btn
            v-else
            color="primary"
            rounded
            :loading="saveButtonLoader"
            :disabled="
              patientFormData.name == '' ||
              patientFormData.lastNameMother == '' ||
              patientFormData.lastNameMother == '' ||
              patientFormData.birthdate == '' ||
              patientFormData.gender == '' ||
              !validPatientForm
            "
            @click="$_updatePatient()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para agregar/editar/eliminar un paciente-->
    <!--FIN Dialog para seleccionar los estudios de un paciente-->
    <v-dialog v-model="patientServicesDialog" max-width="1000" persistent>
      <v-card color="lightBlue" class="rounded-xl">
        <v-card-text class="rounded-xl" :class="$vuetify.breakpoint.smAndUp?'':'px-0'">
          <v-container>
            <v-row>
              <v-col cols="12" class="pt-5">
                <p
                  class="text-center primary--text headline font-weight-bold px-7"
                >
                  Seleccionar estudios
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="5">
                <v-row>
                  <v-col cols="12" :class="$vuetify.breakpoint.smAndUp?'':'text-center py-0'">
                    <p class="title font-weight-bold mb-1">Estudios seleccionados</p>
                  </v-col>
                  <v-col v-if="patientServicesSelectedTemp.length > 0 && patientSelected.id != '' && patientServicesSelectedTemp[patientSelected.index].servicesSelected.length > 0" cols="12" class="py-0">
                    <v-container
                      id="scroll-target"
                      :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                      class="overflow-y-auto"
                    >
                      <v-row style="max-height: 550px">
                        <v-col cols="12" class="py-0">
                          <v-list two-line class="lightBlue" flat>
                            <v-list-item-group
                              :disabled="appointmentData.status=='Cancelado'"
                            >
                              <template v-for="(item) in patientServicesSelectedTemp[patientSelected.index].servicesSelected">
                                <v-list-item :key="item.id" class="my-2 white rounded-xl">
                                  <template>
                                    <v-list-item-content>
                                      <v-list-item-title  class="font-weight-bold" v-text="item.name"></v-list-item-title>
                                      <v-list-item-subtitle class="text-right pt-1"> <span class="font-weight-bold">Costo</span> <span>{{item.publicCost | currency}}</span></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action class="ma-0">
                                      <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn
                                            class="ml-2"
                                            fab
                                            :dark="appointmentData.status!='Cancelado'"
                                            x-small
                                            color="red"
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="validateRemoveServiceToPatient(item)"
                                            :disabled="appointmentData.status=='Cancelado'"
                                            elevation="2"
                                          >
                                            <!--<v-icon dark>
                                              mdi-delete-outline
                                            </v-icon>-->
                                            <nova-icon name="cancel" color="#FFFFFF"></nova-icon>
                                          </v-btn>
                                        </template>
                                        <span>Quitar estudio</span>
                                      </v-tooltip>
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
                    <p>No se han seleccionado estudios para el paciente</p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="7">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <div class="d-flex flex-row">
                      <v-text-field
                        v-model.lazy="serviceSearchData.search"
                        :label="$vuetify.breakpoint.mdAndUp?'Filtrar por nombre del estudio':'Nombre de estudio'"
                        filled
                        rounded
                        background-color="white"
                        dense
                        :maxLength="searchFieldLoader&&serviceSearchData.search?serviceSearchData.search.length:300"
                        v-on:keyup.enter="searchServices()"
                        @click:clear="serviceSearchData.search='',searchServices()"
                        @input="SearchStudies"
                        clearable
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
                            :loading="searchFieldLoader"
                            @click="searchServices()"
                            elevation="0"
                          >
                            <!--<v-icon dark> mdi-magnify </v-icon>-->
                            <nova-icon name="search" color="#FFFFFF" size="sm"></nova-icon>
                          </v-btn>
                        </template>
                        <span>Buscar estudios</span>
                      </v-tooltip>
                    </div>
                  </v-col>
                  <v-col v-if="servicesData.paginated && servicesData.paginated.data && servicesData.paginated.data.length > 0" cols="12" class="py-0">
                    <v-container
                      id="scroll-target"
                      :style="$vuetify.breakpoint.mdAndUp?'max-height: 550px':'max-height: 45vh'"
                      class="overflow-y-auto"
                    >
                      <v-row style="max-height: 550px">
                        <v-col cols="12" class="py-0">
                          <v-list two-line class="lightBlue" flat :disabled="appointmentData.status=='Cancelado'">
                            <v-list-item-group
                              v-model="servicesSelected"
                              multiple
                              @change="addServiceToPatient"
                            >
                              <template v-for="(item) in servicesData.paginated.data">
                                <v-list-item :key="item.id" class="my-2 white rounded-xl" :disabled="!item.available_outside">
                                  <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                      <v-list-item-title  class="font-weight-bold" :class="active?'accent--text':''" v-text="item.name"></v-list-item-title>
                                      <v-list-item-subtitle class="font-weight-bold">Requerimientos</v-list-item-subtitle>
                                      <v-list-item-subtitle v-if="!item.available_outside" class="font-weight-bold primary--text">Solo en laboratorio</v-list-item-subtitle>
                                      <v-list-item-content v-text="item.request"></v-list-item-content>
                                      <v-list-item-subtitle class="text-right"> <span class="font-weight-bold">Costo</span> <span>{{item.public_cost | currency}}</span></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>

                                      <v-icon
                                        v-if="active"
                                        color="accent"
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
                    <p class="title text-center">No se encontraron registros</p>
                  </v-col>
                  <v-col v-if="servicesData.paginated && servicesData.paginated.data && servicesData.paginated.data.length > 0" cols="12" class="d-flex justify-center align-center pa-0">
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
                          @click="servicesPagination('firstPage')"
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
                          @click="servicesPagination('previous')"
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
                          @click="servicesPagination('next')"
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
                          @click="servicesPagination('lastPage')"
                        >
                          <v-icon dark> mdi-chevron-double-right </v-icon>
                        </v-btn>
                      </template>
                      <span>Última página</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pb-0 pt-1">
                <p v-if="patientServicesSelectedTemp.length > 0 && patientSelected.id != '' && patientServicesSelectedTemp[patientSelected.index].servicesSelected.length > 0" class="title primary--text text-center mb-0">Subtotal: <span class="black--text">{{ getPatientTotal(patientServicesSelectedTemp[patientSelected.index].servicesSelected) | currency}} </span></p>
                <p v-else class="title primary--text text-center mb-0">Subtotal: <span class="black--text">$0.00</span></p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pb-5 pr-5">
          <v-btn
            color="red"
            rounded
            dark
            @click="patientServicesDialog = !patientServicesDialog"
          >
            <span class="px-5">Cancelar</span>
          </v-btn>
          <v-btn
            :disabled="patientServicesSelectedTemp.length == 0 || patientServicesSelectedTemp[patientSelected.index].servicesSelected.length == 0 || appointmentData.status=='Cancelado'"
            color="primary"
            rounded
            @click="addAllServicesToPatient()"
          >
            <span class="px-5">Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para seleccionar los estudios de un paciente-->
    <!--INICIO Dialog para confirmar la eliminación de un paciente de la cita-->
    <v-dialog v-model="removePatientDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Retirar paciente de la cita
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea retirar al paciente de la cita?
                </p>
              </v-col>
              <v-col cols="12 px-sm-5">
                <p class="subtitle-1 mb-0">
                  Solo se retirará el paciente de la cita pero no se eliminará de los registros de pacientes del cliente.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="removePatientDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            @click="confirmRemovePatient()"
            rounded
            :loading="deleteButtonLoader"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para confirmar la eliminación de un paciente de la cita-->
    <!--INICIO Dialog para confirmar la eliminación de un paciente directamente de la lista de pacientes del cliente-->
    <v-dialog v-model="deletePatientDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Eliminar paciente
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea eliminar el registro seleccionado?
                </p>
              </v-col>
              <v-col cols="12">
                <p class="subtitle-1 px-sm-5">
                  Está a punto de eliminar el registro del paciente PERMANENTEMENTE lo que implica que se borrará de la lista de pacientes seleccionados en la cita y para seleccionarlo para posteriores citas tendrá que registrarlo nuevamente.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="deletePatientDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="error"
            rounded
            :loading="deleteButtonLoader"
            @click="$_deletePatient()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para confirmar la eliminación de un paciente directamente de la lista de pacientes del cliente-->
    <!--INICIO Dialog para confirmar la eliminación se un estudio que ya cambió de precio-->
    <v-dialog v-model="confirmRemoveServiceDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Quitar estudio
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea remover el estudio?
                </p>
              </v-col>
              <v-col cols="12">
                <p class="subtitle-1 px-sm-5">
                  Se ha detectado que en el estudio que desea remover se han realizado cambios, al quitarlo y volverlo a poner se actualizaran los datos del servicio que hayan cambiado incluyendo el precio.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="confirmRemoveServiceDialog = false"
            rounded
            >Regresar</v-btn
          >
          <v-btn
            color="error"
            rounded
            @click="removeServiceToPatientCopy()"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para confirmar la cancelación de la cita-->
    <!--INICIO Dialog para confirmar la cancelación de la cita-->
    <v-dialog v-model="cancelAppointmentDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Cancelar cita
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea cancelar la cita?
                </p>
              </v-col>
              <v-col cols="12">
                <p class="subtitle-1 px-sm-5">
                  Está a punto de cancelar la cita, se quitará de la lista de citas por atender y se liberarán los horarios asignados a esta cita
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="cancelAppointmentDialog = false"
            rounded
            >Regresar</v-btn
          >
          <v-btn
            color="error"
            rounded
            :loading="cancelAppointmentLoader"
            @click="$_cancelAppointment()"
            >Cancelar cita</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--FIN Dialog para confirmar la cancelación de la cita-->
    <!--INICIO Dialog para regresar a la pantalla principal de citas-->
    <v-dialog v-model="returnToAppointmentsDialog" max-width="700">
      <v-card color="lightBlue" class="rounded-xl">
        <p
          class="text-center primary--text headline font-weight-bold px-7 pt-5"
        >
          Regresar a página principal de citas
        </p>
        <v-card-text class="px-1 rounded-xl">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-0">
                <p class="title px-5">
                  ¿Está seguro que desea regresar a la página principal de citas?
                </p>
              </v-col>
              <v-col cols="12">
                <p class="subtitle-1 px-sm-5">
                  Está a punto de ser redirigido a la pantalla principal de citas. Todos los cambios no guardados serán eliminados.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5 pr-5">
          <v-btn
            color="grey lighten-2"
            @click="returnToAppointmentsDialog = false"
            rounded
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            rounded
            to="/citas"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--INICIO Dialog para regresar a la pantalla principal de citas-->
  </v-container>
</template>
<script>
import Vue from "vue";
import { Keys } from "../../share/Keys";
import { validations } from "@/share/Validations";
import { mapMutations, mapActions, mapState } from "vuex";
import { ErrorHandler } from "../../share/ErrorHandler";
var pointInPolygon = require('point-in-polygon');
export default {
  computed: {
    ...mapState("order", ["customersData", "patientsData"]),
    ...mapState("scheduleConfig", ["currentZones"]),
    ...mapState("zone", ["zone"]),
    ...mapState("service", ["servicesData"]),
    ...mapState("loader", ["loaderVisible"]),
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
    maximunDay() {
      let date = new Date();
      date.setDate(date.getDate()+ 13);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + (date.getDate())).slice(-2);
      return `${year}-${month}-${day}`;
    },
    dateFormatted() {
      return this.formatDate(
        !this.appointmentData.date ? null : this.appointmentData.date.substring(0, 10)
      );
    },
    dateFormattedAux() {
      return this.formatDate(
        !this.selectedDateAux? null: this.selectedDateAux.substring(0, 10)
      )
    },
    customerBirthdateFormatted() {
      return this.formatDate(
        !this.customerFormData.birthdate ? null : this.customerFormData.birthdate.substring(0, 10)
      );
    },
    birthdateFormatted() {
      return this.formatDate(
        !this.patientFormData.birthdate ? null : this.patientFormData.birthdate.substring(0, 10)
      );
    }
  },
  data() {
    return {
      // Variable para comprobar si el usuario esta en la vista del detalle de la cita o si está creando una nueva cita
      isAppointmentDetail: false,
      // Objetos con parámetros para realizar búsquedas de algo en específico
      customerSearchData: {
        perPage: 10,
        numberPage: 1,
        search: "",
        activeLoader: true
      },
      serviceSearchData: {
        numberPage: 1,
        perPage: 10,
        search: "",
        activeLoader: true,
        availableOutside: 2,
      },
      patientsSearchData: {
        customerId: "",
        search: "",
        activeLoader: false
      },
      phlebotomistSearchData: {
        activeLoader: false
      },
      // Objeto de la cita
      appointmentData: {
        id: "",
        customerId: "",
        customerInfoId: "",
        customerPatientId: "",
        name: "",
        phoneNumber: "",
        email: "",
        addressId: "",
        address: "",
        lat: null,
        lng: null,
        date: "",
        hour: "",
        startDate: "",
        endDate: "",
        phlebotomistId: "",
        phlebotomistScheduleId: "",
        phlebotomistName: "",
        status: "",
      },
      // Respaldo del objeto de la cita (Solo se usa en el detalle de la cita y se usa para guardar los datos de la cita como un respaldo para hacer validaciones)
      appointmentDataBackup: {
        id: "",
        customerId: "",
        customerInfoId: "",
        name: "",
        phoneNumber: "",
        email: "",
        addressId: "",
        address: "",
        lat: null,
        lng: null,
        date: "",
        hour: "",
        startDate: "",
        endDate: "",
        phlebotomistId: "",
        phlebotomistScheduleId: "",
        phlebotomistName: "",
        status: "",
      },
      // Id principal del paciente 
      customerPatientId: "",
      phlebotomistScheduleSelected: {
        phlebotomistId: "",
        phlebotomistScheduleId: "",
        phlebotomistName: "",
      },
      customerAddresses: [],
      formattedSchedules: [],
      phlebotomistsList: [],
      patientsHeaders: [
        {
          align: "center",
          text: "Nombre",
          value: "name"
        },
        {
          align: "center",
          text: "Subtotal",
          value: "subtotal"
        },
        {
          align: "end",
          text: "Acciones",
          value: "actions"
        }
      ],
      patientsList: [],
      visitCosts: {
        visitCost: null,
        patientCost: null
      },
      removeServiceSelected: {},
      customers: [
        {
          id: 1,
          name: "Luis Saúl Ornelas Pérez dsads asd ads",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234567"
        },
        {
          id: 2,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234321"
        },
        {
          id: 3,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234789"
        },
        {
          id: 4,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234634"
        },
        {
          id: 5,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "477123234"
        },
        {
          id: 6,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234345"
        },
        {
          id: 7,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234563"
        },
        {
          id: 8,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234987"
        },
        {
          id: 9,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234546"
        },
        {
          id: 10,
          name: "Luis Saúl Ornelas Pérez",
          email: "saulop97@outlook.com",
          phoneNumber: "4771234202"
        }
      ],
      selected: null,
      addressesSelected: null,
      selectedAppointmentHours: [],
      selectedAppointmentHoursAux: [],
      selectedAppointmentHoursIndex: [],
      selectedDateAux: "",
      phlebotomistSelected: null,
      selectedPatient: [],
      servicesSelected: [],
      servicesSelectedTemp: [],
      patientServicesSelected: [],
      patientServicesSelectedTemp: [],
      // Citas y horarios del día
      scheduleDay: {},
      // Horarios de un flebotomista en especifico
      phlebotomistSchedule: [],
      // Loaders
      saveButtonLoader: false,
      deleteButtonLoader: false,
      customersLoader: false,
      addressLoader: false,
      servicesLoader: false,
      cancelAppointmentLoader: false,
      // Dialogs
      customerSearcherDialog: false,
      createCustomerDialog: false,
      createAddressDialog: false,
      customerAddressesDialog: false,
      dateAppointmentDialog: false,
      dateAppointmentLoader: false,
      customerPatientsDialog: false,
      phlebotomistsDialog: false,
      searchFieldLoader: false,
      patientDialog: false,
      patientServicesDialog: false,
      removePatientDialog: false,
      deletePatientDialog: false,
      confirmRemoveServiceDialog: false,
      cancelAppointmentDialog: false,
      returnToAppointmentsDialog: false,
      // Acciones
      patientAction: '',
      // Menús de v-date-picker y v-time-picker para los horarios de las citas y fecha de nacimiento de pacientes
      appointmentDateMenu: false,
      // Fecha de nacimiento
      customerActivePicker: null,
      customerBirthdateMenu: false,
      activePicker: null,
      birthdateMenu: false,
      // Fin de fecha de nacimiento
      //----------------------Forms validation--------------------
      // Objeto para los datos del formulario de cliente
      showCustomerPass: false,
      customerFormData: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        password: "",
        phone: "",
        birthdate: "",
        role: 3,
        gender: "",
      },
      // Objeto base sirve para limpiar los datos del objeto patientFormData
      customerFormDataObj: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        password: "",
        phone: "",
        birthdate: "",
        role: 3,
        gender: "",
      },
      // Objeto para los datos del formulario de dirección
      addressFormData: {
        id: "",
        street: "",
        neighborhood: "",
        numExt: "",
        numInt: "",
        state: "Durango",
        city: "Durango",
        zipCode: "",
        references: "",
        latitude: "",
        longitude: "",
        customerId: "",
      },
      addressFormDataObj: {
        id: "",
        street: "",
        neighborhood: "",
        numExt: "",
        numInt: "",
        state: "Durango",
        city: "Durango",
        zipCode: "",
        references: "",
        latitude: "",
        longitude: "",
        customerId: "",
      },
      // Objeto para los datos del formulario de paciente
      patientFormData: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        birthdate: "",
        gender: "",
        customerInfoId: null
      },
      // Objeto base sirve para limpiar los datos del objeto patientFormData
      patientFormDataObj: {
        id: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        birthdate: "",
        gender: "",
        customerInfoId: null
      },
      // Objeto que guarda el id del paciente seleccionado y el index del arreglo de pacientes
      patientSelected: {
        id: "",
        index: ""
      },
      // Validaciones de los campos del formulario de cliente
      validCustomerForm: false,
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
        required: true,
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
      validAddressForm: false,
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
      // Validaciones de los campos del formulario del paciente
      validPatientForm: false,
      namePatientRules: validations.generalMValidation({
        name: "nombre de paciente",
        required: true
      }),
      lastNameFatherPatientRules: validations.generalMValidation({
        name: "apellido paterno",
        required: true
      }),
      lastNameMotherPatientRules: validations.generalMValidation({
        name: "apellido materno",
        required: true
      }),
      /*birthdateRules: validations.generalFValidation({
        name: "fecha de nacimiento",
        required: true
      }),*/
      genderRules: validations.generalMValidation({
        name: "genero",
        required: true
      })
    };
  },
  methods: {
    ...mapActions("order", ["createAppointment", "updateAppointment", "cancelAppointment", "fetchAppointmentData", "fetchCustomersData", "fetchCustomerAddresses", "fetchCustomerPatients", "fetchPhlebotomistsData", "createPatient", "updatePatient", "deletePatient"]),
    ...mapActions("scheduleConfig", ["fetchCurrentZones", "fetchPhlebotomistSchedule", "fetchScheduleDay"]),
    ...mapActions("user", ["createUser", "fetchUser", "createAddress"]),
    ...mapActions("service", ["fetchServices", "fetchCheckServices"]),
    ...mapActions("zone", ["fetchZone"]),
    ...mapMutations("order", ["clearCustomersData"]),
    ...mapMutations("notification", ["show"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    /**
     * Función para validar que los campos del formulario del cliente hayan sido llenados de la forma correcta.
     */
    validateCustomerForm() {
      if (this.$refs.customerForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para validar que los campos del formulario de la direccion del cliente hayan sido llenados de la forma correcta.
     */
    validateAddressForm() {
      if (this.$refs.addressForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para validar que los campos del formulario de paciente hayan sido llenados de la forma correcta.
     */
    validatePatientForm() {
      if (this.$refs.patientForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función para crear una cita
     */
    async $_createAppointment() {
      // Comprobrar que la cita está en los horarios permitidos
      if (this.validateAppointmentDateSelection()) {
        // Dar formato al objeto de la cita para que pueda ser agendada la cita
        // 1.- Dar formato al objeto de los pacientes y sus servicios
        let pateints = this.patientServicesSelected.map(patientServices => {
          let servicesIds = patientServices.servicesSelected.map(service => {
            return service.historicalServiceId;
          });
          return {
            id: patientServices.patientId,
            services: servicesIds
          }
        });
        let appointmentObj = this.appointmentData;
        appointmentObj.patients = pateints;
        let response = await this.createAppointment(appointmentObj);
        if (response.status && response.status > 199 && response.status < 300) {
          this.show({
            text: "Se ha creado la cita correctamente",
            color: "primary",
          });
          this.$router.push("/citas");
        } else {
          if (response.data.error){
            this.show({
              text: response.data.error,
              color: "red accent-3",
            });
          } else {
            this.show({
              text: "Hubo un problema al crear la cita",
              color: "red accent-3",
            });
          }
        }
      } else {
        this.show({
          text: "El horario de comienzo de cita tiene que ser depués de este momento, por favor actualiza el horario",
          color: "red accent-3",
        });
      }

    },
    /**
     * Función para editar una cita
     */
    async $_updateAppointment() {
      // Dar formato al objeto de la cita para que pueda ser agendada la cita
      // 1.- Dar formato al objeto de los pacientes y sus servicios
      let pateints = this.patientServicesSelected.map(patientServices => {
        let servicesIds = patientServices.servicesSelected.map(service => {
          return service.historicalServiceId;
        });
        return {
          id: patientServices.patientId,
          services: servicesIds
        }
      });
      let appointmentObj = this.appointmentData;
      appointmentObj.patients = pateints;
      let response = await this.updateAppointment(appointmentObj);
      if (response.status && response.status > 199 && response.status < 300) {
        this.show({
          text: "Se ha editado la cita correctamente",
          color: "primary",
        });
        this.$router.push("/citas");
      } else {
        if (response.data.error){
          this.show({
            text: response.data.error,
            color: "red accent-3",
          });
        } else {
          this.show({
            text: "Hubo un problema al editar la cita",
            color: "red accent-3",
          });
        }
      }
    },
    /**
     * Función para cancelar una cita
     */
    async $_cancelAppointment() {
      this.cancelAppointmentLoader = true;
      let response = await this.cancelAppointment(this.appointmentData.id);
      if (response.status && response.status > 199 && response.status < 300) {
        this.show({
          text: "Se ha cancelado la cita correctamente",
          color: "primary",
        });
        this.$router.push("/citas");
      } else {
        console.log(response);
        this.show({
          text: "Hubo un problema al cancelar la cita",
          color: "red accent-3",
        });
        this.cancelAppointmentLoader = false;
      }
    },
    /**
     * Función para buscar en tiempo real clientes
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
     * Función para buscar en tiempo real estudios
     */
     SearchStudies() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchServices();
      }, 300);
    },
    /**
     * Función para buscar clientes
     */
    async searchCustomers() {
      this.searchFieldLoader = true;
      // Reiniciar la selección de clientes cuando se filtra la búsqueda
      this.selected = null;
      // Reiniciar en número de página después de realizar una búsqueda
      this.customerSearchData.numberPage = 1;
      let response = await this.fetchCustomersData(this.customerSearchData);
      this.searchFieldLoader = false;
    },
    /**
     * Función para registrar un nuevo cliente
     */
    async $_createUser() {
      if (this.validateCustomerForm()) {
        this.loading();
        let response = await this.createUser(this.customerFormData);
        if (response.status && response.status > 199 && response.status < 300) {
          // Agregar los datos del cliente
          let customer = response.data.data;
          this.appointmentData.customerId = customer.id;
          this.appointmentData.customerInfoId = parseInt(customer.info.id);
          this.appointmentData.name = `${customer.name} ${customer.last_name_father} ${customer.last_name_mother}`;
          this.appointmentData.phoneNumber = customer.phone_number;
          this.appointmentData.email = customer.email;
          // Limpiar las otras variables
          this.appointmentData.addressId = "";
          this.appointmentData.address = "";
          this.appointmentData.lat = null;
          this.appointmentData.lng = null;
          this.appointmentData.date = "";
          this.appointmentData.hour = "";
          this.patientsList = [];

          this.createCustomerDialog = false;
          this.customerSearcherDialog = false;
          this.customerSearchData.search = "";

          this.show({
            text: "El cliente ha sido creado correctamente",
            color: "primary",
          });
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
              text: error.formatError(response.status),
              color: "red accent-3",
            });
          }
        }
        this.saveButtonLoader = false;
        this.loaded();
      }
    },
    /**
     * Función para obtener las direcciones de un cliente
     */
    async $_fetchCustomerAddresses() {
      this.loading();
      let response = await this.fetchCustomerAddresses(this.appointmentData.customerId);
      if (response.status && response.status > 199 && response.status < 300) {
        this.customerAddresses = response.data.data;
      }
      this.addressesSelected = null;
      this.customerAddressesDialog = true;
      this.loaded();
      
    },
    /**
     * Función para agregar una dirección a un cliente
     */
    async $_createAddress() {
      this.loading();
      let validAddress = await this.findAddress();
      if (validAddress && this.validateAddressForm()) {
        let response = await this.createAddress(this.addressFormData);
        if (response.status && response.status > 199 && response.status < 300) {
          // Consultar las direcciones actualizadas
          await this.$_fetchCustomerAddresses();
          this.createAddressDialog = false;
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
      this.saveButtonLoader = false;
      this.loaded();
    },
    /**
     * Obtener los diferentes horarios de los flebotomistas
     */
    async $_fetchSchedulesPerDay() {
      this.dateAppointmentLoader = true;
      this.selectedAppointmentHours = [];
      await this.fetchCurrentZones(this.selectedDateAux);
      this.formattedSchedules = Object.assign([], this.currentZones.data);
      this.formattedSchedules.forEach(schedule => {
        let polygon = schedule.zone.polygon.map(coord => {
          return [
            parseFloat(coord.lat),
            parseFloat(coord.lon)
          ]
        });
        schedule.zone.polygon = polygon;
      });
      this.phlebotomistScheduleSelected = {
        phlebotomistId: "",
        phlebotomistScheduleId: "",
        phlebotomistName: ""
      }
      this.formattedSchedules.forEach(schedule => {
        if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
          this.phlebotomistScheduleSelected.phlebotomistId = schedule.user_id;
          this.phlebotomistScheduleSelected.phlebotomistScheduleId = schedule.id;
        }
      });
      let response = await this.fetchPhlebotomistSchedule(this.phlebotomistScheduleSelected.phlebotomistScheduleId);
      this.phlebotomistSchedule = response.data.data;
      // Asignar el Phlebotomist scheduleId al valor de appointmentdata
      this.appointmentData.phlebotomistScheduleId = this.phlebotomistScheduleSelected.phlebotomistScheduleId;

      // Comprobar si se seleccionó la fecha inicial del detalle de la cita para asignar al flebotomista inicial
      if (this.selectedDateAux == this.appointmentDataBackup.date) {
        this.phlebotomistScheduleSelected.phlebotomistId = this.appointmentDataBackup.phlebotomistId;
        await this.validatePhlebotomistSelected();
      }

      // Quitar los horarios que ya pasaron
      await this.filterValidSchedules();

      // Comprobar si estamos en el detalle de la cita para hacer la validación de los horarios
      if (this.appointmentData.id != "") {
        this.validateScheduleSelected();
      }
      this.assignRecomendedPhlebotomist(this.formattedSchedules);
      this.dateAppointmentLoader = false;
    },
    /**
     * Función para filtrar las opciones para seleccionar horarios y solo mostrar los horarios disponibles
     */
    async filterValidSchedules() {
      // Comprobar si la fecha seleccionada el la misma del día de hoy
      let currentDate = new Date();
      this.phlebotomistSchedule = this.phlebotomistSchedule.filter(schedule => {
        let scheduleDay = new Date(schedule.start_date);
        if (currentDate < scheduleDay) {
          return schedule;
        }
      });
      let startDate = new Date(this.appointmentData.startDate);

      // Validar si se seleccionó el día actual y ya pasó el horario de citas, para automáticamente seleccionar el próximo día y cargar sus respectivos horarios
      if (this.phlebotomistSchedule.length == 0) {
        this.dateAppointmentLoader = true;
        const date = new Date();
        date.setDate(date.getDate()+1);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        this.selectedDateAux = `${year}-${month}-${day}`;
        await this.$_fetchSchedulesPerDay();
        this.dateAppointmentLoader = false;
      }

    },
    /**
     * Al cambiar el flebotomista seleccionado se debe de consultar la disponibilidad de horarios del flebotomista seleccionado
     */
    //************************************************************************************CREO QUE  YA NO SE USA */
    async changeSelectedPhlebotomist() {
      let response = await this.fetchScheduleDay(this.selectedDateAux);
      if (response.status && response.status > 199 && response.status < 300) {
        this.scheduleDay = response.data.data;

      } else {
        if (response.data.error) {
          this.show({
            text: response.data.error,
            color: "red accent-3",
          });
        } else {
          this.show({
            text: "No se han podido consultar los horarios de la fecha seleccionada",
            color: "red accent-3",
          });
        }
      }
    },
    /**
     * Obtener los pacientes del cliente seleccionado
     */
    async $_fetchCustomerPatients() {
      this.patientsSearchData.customerId = this.appointmentData.customerId;
      let response = await this.fetchCustomerPatients(this.patientsSearchData);
      this.customerPatientsDialog = true;
    },
    /**
     * Función para validar la ruta en la que se encuentra la cita y asignarle un identificador al flebotomista que pertenezca a esa ruta
     */
    async validatePhlebotomistZone() {
      let currentPhlebotomist = null;
      await this.fetchCurrentZones(this.selectedDateAux);
      this.formattedSchedules = Object.assign([], this.currentZones.data);

      this.formattedSchedules.forEach(schedule => {
        let polygon = schedule.zone.polygon.map(coord => {
          return [
            parseFloat(coord.lat),
            parseFloat(coord.lon)
          ]
        });
        schedule.zone.polygon = polygon;
      });
      this.formattedSchedules.forEach(schedule => {
        if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
          currentPhlebotomist = schedule.user_id;
        }
      });
      this.phlebotomistsList.forEach(phlebotomist => {
        if (phlebotomist.value == currentPhlebotomist) {
          phlebotomist.recommended = true;
        } else {
          phlebotomist.recommended = false;
        }
      });
    },
    /**
     * Función para resaltar el flebotomista recomendado de una ruta y día en específico
     */
    assignRecomendedPhlebotomist(formattedSchedules) {
      let phlebotomistRecommended = null;
      formattedSchedules.forEach(schedule => {
        if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
          phlebotomistRecommended = schedule.user_id;
        }
      });

      this.phlebotomistsList = this.phlebotomistsList.map(phlebotomist => {
        if (phlebotomist.value == phlebotomistRecommended) {
          phlebotomist.recommended = true;
        } else {
          phlebotomist.recommended = false;
        }
        return phlebotomist;
      });
    },
    /**
     * Función que me valide los horarios seleccionados del flebotomista actual seleccionado
     */
    async validatePhlebotomistSelected() {
      this.dateAppointmentLoader = true;
      this.selectedAppointmentHours = [];
      let response = await this.fetchScheduleDay(this.selectedDateAux);
      this.scheduleDay = response.data.data;
      let isPhlebotomistInSimpleSchedules = false;
      this.scheduleDay.schedule.phlebotomist_schedules.forEach(phlebotomistSchedule => {
        if (phlebotomistSchedule.user_id == this.phlebotomistScheduleSelected.phlebotomistId) {
          isPhlebotomistInSimpleSchedules = true;
          // Asignar horario del flebotomista filtrado
          this.phlebotomistSchedule = phlebotomistSchedule.schedule;
        }
      });
      if (!isPhlebotomistInSimpleSchedules) {
        this.phlebotomistSchedule = this.generateEmptySchedule(this.scheduleDay.schedule.phlebotomist_schedules[0].schedule);
        if (this.scheduleDay.extraordinary_schedule.length > 0) {
          this.getExtraordinaryScheduleAppointments(this.scheduleDay.extraordinary_schedule);
        }
      }

      // Quitar los horarios que ya pasaron
      await this.filterValidSchedules();

      // Comprobar si estamos en el detalle de la cita para hacer la validación de los horarios
      if (this.appointmentData.id != "") {
        await this.validateScheduleSelected();
      }

      this.dateAppointmentLoader = false;
    },
    /**
     * En el detalle de la cita cada que se actualice la fecha o el flebotomista se tiene que hacer una validación para comprobar que el horario del detalle de la cita aparezca como disponible
     */
    validateScheduleSelected() {
      // Validar que es el mismo flebotomista y el mismo día del detalle de la cita
      if (this.selectedDateAux == this.appointmentDataBackup.date && this.phlebotomistScheduleSelected.phlebotomistId == this.appointmentDataBackup.phlebotomistId) {
        let startDate = new Date(this.appointmentDataBackup.startDate);
        let endDate = new Date(this.appointmentDataBackup.endDate);
        this.selectedAppointmentHours = [];

        this.phlebotomistSchedule.forEach((schedule, index) => {
          let currentDate = new Date(schedule.start_date);
          if (currentDate >= startDate && currentDate < endDate) {
            schedule.isReserved = false;
            if (this.selectedAppointmentHoursAux.length ==0) {
              this.selectedAppointmentHours.push(index);
            }
          }
        });
        if (this.selectedDateAux == this.appointmentDataBackup.date && this.selectedDateAux == this.appointmentData.date && this.selectedAppointmentHoursAux.length > 0) {
          this.selectedAppointmentHours = this.selectedAppointmentHoursAux.slice();
        }
      }
    },
    /**
     * Función para abrir dialog para seleccionar la fecha y la hora de la cita
     */
    async openDateDialog() {
      // Iniciar el loader
      this.loading();
      this.dateAppointmentLoader = true;

      try {
        await this.$_fetchPhlebotomistsDataCopy();
      this.loaded();
      this.dateAppointmentDialog = true;
      // Comprobar si estamos en el detalle de la cita y si esta el mismo día y flebotomista seleccionado
      if (this.appointmentData.date != "" && this.appointmentData.phlebotomistId == this.appointmentDataBackup.phlebotomistId && this.appointmentData.date == this.appointmentDataBackup.date) {
        this.selectedDateAux = this.appointmentData.date;
        this.phlebotomistScheduleSelected.phlebotomistId = this.appointmentDataBackup.phlebotomistId;

        // Obtener las zonas del día
        await this.fetchCurrentZones(this.selectedDateAux);

        this.formattedSchedules = Object.assign([], this.currentZones.data);

        this.formattedSchedules.forEach(schedule => {
          let polygon = schedule.zone.polygon.map(coord => {
            return [
              parseFloat(coord.lat),
              parseFloat(coord.lon)
            ]
          });
          schedule.zone.polygon = polygon;
        });

        let response = await this.fetchPhlebotomistSchedule(this.appointmentDataBackup.phlebotomistScheduleId);
        this.phlebotomistSchedule = response.data.data;
        await this.validatePhlebotomistSelected();

        this.dateAppointmentLoader = false;
      }
      // Si no se ha seleccionado una fecha, ejecutar el código de la siguiente condición
      else if (this.appointmentData.date == "") {

        // Si no se ha seleccionado ninguna fecha poner la fecha actual
        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        this.selectedDateAux = `${year}-${month}-${day}`;

        await this.fetchCurrentZones(this.selectedDateAux);

        this.formattedSchedules = Object.assign([], this.currentZones.data);

        this.formattedSchedules.forEach(schedule => {
          let polygon = schedule.zone.polygon.map(coord => {
            return [
              parseFloat(coord.lat),
              parseFloat(coord.lon)
            ]
          });
          schedule.zone.polygon = polygon;
        });
        this.phlebotomistScheduleSelected = {
          phlebotomistId: "",
          phlebotomistScheduleId: "",
          phlebotomistName: ""
        }
        this.formattedSchedules.forEach(schedule => {
          if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
            this.phlebotomistScheduleSelected.phlebotomistId = schedule.user_id;
            this.phlebotomistScheduleSelected.phlebotomistScheduleId = schedule.id;
          }
        });
        let response = await this.fetchPhlebotomistSchedule(this.phlebotomistScheduleSelected.phlebotomistScheduleId);
        this.phlebotomistSchedule = response.data.data?response.data.data:[];
        // Asignar el Phlebotomist scheduleId al valor de appointmentdata
        this.appointmentData.phlebotomistScheduleId = this.phlebotomistScheduleSelected.phlebotomistScheduleId;
        // Quitar los horarios que ya pasaron
        await this.filterValidSchedules();
        this.dateAppointmentLoader = false;
      } 
      // Si ya hay una fecha seleccionada pero los horarios estan vacíos ejecutar el siguiente código (Se ejecuta cuando se abre por primera vez el pop up en el detalle de la cita)
      else if (this.appointmentData.date != "" && this.phlebotomistSchedule.length == 0) {
        this.selectedDateAux = this.appointmentData.date;
        await this.fetchCurrentZones(this.selectedDateAux);

        this.formattedSchedules = Object.assign([], this.currentZones.data);

        this.formattedSchedules.forEach(schedule => {
          let polygon = schedule.zone.polygon.map(coord => {
            return [
              parseFloat(coord.lat),
              parseFloat(coord.lon)
            ]
          });
          schedule.zone.polygon = polygon;
        });
        this.phlebotomistScheduleSelected = {
          phlebotomistId: "",
          phlebotomistScheduleId: "",
          phlebotomistName: ""
        }
        this.formattedSchedules.forEach(schedule => {
          if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
            this.phlebotomistScheduleSelected.phlebotomistId = schedule.user_id;
            this.phlebotomistScheduleSelected.phlebotomistScheduleId = schedule.id;
          }
        });
        let response = await this.fetchPhlebotomistSchedule(this.phlebotomistScheduleSelected.phlebotomistScheduleId);
        this.phlebotomistSchedule = response.data.data;
        // Asignar el Phlebotomist scheduleId al valor de appointmentdata
        this.appointmentData.phlebotomistScheduleId = this.phlebotomistScheduleSelected.phlebotomistScheduleId;
        // Quitar los horarios que ya pasaron
        await this.filterValidSchedules();
        this.dateAppointmentLoader = false;
      }
      // Si al abrir el pop up la fecha de la cita y la fecha seleccionada anteriormente son las mismas, solo se deben de seleccionar las horas que ya tenía seleccionadas el usuario
      else if (this.selectedDateAux == this.appointmentData.date) {
        this.selectedAppointmentHours = this.selectedAppointmentHoursAux.slice();
        // Quitar los horarios que ya pasaron
        await this.filterValidSchedules();
        this.dateAppointmentLoader = false;
      }
      // Si el usuario seleccionó otra fecha, después canceló la selección del horario y al final vuelve a abrir el modal ejecutar la siguiente código
      else {
        this.selectedDateAux = this.appointmentData.date;
        await this.fetchCurrentZones(this.selectedDateAux);

        this.formattedSchedules = Object.assign([], this.currentZones.data);

        this.formattedSchedules.forEach(schedule => {
          let polygon = schedule.zone.polygon.map(coord => {
            return [
              parseFloat(coord.lat),
              parseFloat(coord.lon)
            ]
          });
          schedule.zone.polygon = polygon;
        });
        let phlebotomistScheduleId = null;
        this.formattedSchedules.forEach(schedule => {
          if (pointInPolygon([this.appointmentData.lat, this.appointmentData.lng], schedule.zone.polygon)) {
            phlebotomistScheduleId = schedule.id;
          }
        });
        let response = await this.fetchPhlebotomistSchedule(phlebotomistScheduleId);
        this.phlebotomistSchedule = response.data.data;
        // Quitar los horarios que ya pasaron
        await this.filterValidSchedules();
      }
      } catch (error) {
        console.log(error);
      } finally {
        this.dateAppointmentLoader = false;
        this.loaded();
      }
      
      

      // Comprobar si estamos en el detalle de la cita para hacer la validación de los horarios
      if (this.appointmentData.id != "") {
        this.validateScheduleSelected();
      }

      this.assignRecomendedPhlebotomist(this.formattedSchedules);
    },
    /**
     * Función para registrar un paciente
     */
    async $_createPatient() {
      // Hacer la validación del formulario
      if (this.validatePatientForm()) {
        let response = await this.createPatient(this.patientFormData);
        if (response.status && response.status > 199 && response.status < 300) {
          this.patientAction = "";
          this.patientDialog = false;
          await this.fetchPatients(); // Aqui debería de ir solo del fetchPatients
          this.show({
            text: "El registro se ha realizado correctamente",
            color: "primary",
          });
        } else {
          this.show({
            text: "Ha ocurrido un problema al registrar el paciente",
            color: "red accent-3",
          });
        }
        this.saveButtonLoader = false;
      }
    },
    /**
     * Función para actualizar la información de un paciente
     */
    async $_updatePatient() {
      // Hacer la validación del formulario
      if (this.validatePatientForm()) {
        this.saveButtonLoader = true;
        let response = await this.updatePatient(this.patientFormData);
        if (response.status && response.status > 199 && response.status < 300) {
          this.patientAction = "";
          this.patientDialog = false;
          await this.fetchPatients();
          // Actualizar tabla de pacientes seleccionados
          this.updatePatientAppointmentTable(response.data.data);
          this.show({
            text: "El registro se ha editado correctamente",
            color: "primary",
          });
        } else {
          this.show({
            text: "Ha ocurrido un problema al registrar el paciente",
            color: "red accent-3",
          });
        }
        this.saveButtonLoader = false;
      }
    },
    /**
     * Función para actualizar los datos del paciente recien actualizado en la tabla de pacientes seleccionados para la cita
     */
    updatePatientAppointmentTable(patientUpdated) {
      let patientIndex = this.patientsList.findIndex(patient => patient.id == patientUpdated.id);
      let patientFormatted = {
        id: patientUpdated.id,
        name: patientUpdated.name,
        lastNameFather: patientUpdated.last_name_father,
        lastNameMother: patientUpdated.last_name_mother,
        birthdate: patientUpdated.birthdate,
        gender: patientUpdated.gender
      };

      let patientsListAux = this.patientsList;
      patientsListAux[patientIndex] = patientFormatted;
      this.patientsList = [];
      patientsListAux.forEach(patient => {
        this.patientsList.push(patient);
      });
    },
    /**
     * Función para eliminar un paciente de la base de datos.
     */
    async $_deletePatient() {
      this.deleteButtonLoader = true;
      let response = await this.deletePatient(this.patientFormData.id);
      if (response.status && response.status > 199 && response.status < 300) {
        this.patientAction = "";
        this.patientDialog = false;
        this.deletePatientDialog = false;
        this.patientsList = this.patientsList.filter(patient => patient.id != this.patientFormData.id);
        this.patientServicesSelected = this.patientServicesSelected.filter(patient => patient.patientId != this.patientFormData.id);
        this.show({
          text: "El registro se ha eliminado correctamente",
          color: "primary",
        });
      } else {
        this.show({
          text: "Ha ocurrido un problema al eliminar el paciente",
          color: "red accent-3"
        });
      }
      this.deleteButtonLoader = false;
    },
    /**
     * Función para obtener los pacientes que pertenecen al cliente seleccionado
     */
    async fetchPatients() {
      this.patientsSearchData.customerId = this.appointmentData.customerId;
      await this.fetchCustomerPatients(this.patientsSearchData);
    },
    /**
     * Función para buscar pacientes
     */
    async searchPatients() {
      this.searchFieldLoader = true;
      await this.openPatientDialog();
      this.searchFieldLoader = false;
    },
    /**
     * Función para abrir modal con la lista de pacientes
     */
    async openPatientDialog() {
      this.loading();
      await this.fetchPatients();
      // Limpiar lista de pacientes seleccionados
      this.selectedPatient = [];
      this.patientsData.forEach((patient, index) => {
        this.patientsList.forEach(patList => {
          if (patient.id == patList.id) {
            this.selectedPatient.push(index);
          }
        });
      });
      this.loaded();
      this.customerPatientsDialog = true;
    },
    /**
     * Función para obtener la lista de flebotomistas
     */
    async $_fetchPhlebotomistsData() {
      let response = await this.fetchPhlebotomistsData(this.phlebotomistSearchData);
      if (response.status && response.status > 199 && response.status < 300) {
        this.phlebotomistsList = response.data.data;
      }
      this.phlebotomistsDialog = true;
    },
    /**
     * Función para obtener la los flebotomistas y ponerlos en la lista de opciones para seleccionar el flebotomista en la cita
     */
    async $_fetchPhlebotomistsDataCopy() {
      let response = await this.fetchPhlebotomistsData(this.phlebotomistSearchData);
      
      if (response.status && response.status > 199 && response.status < 300) {
        let flebotomistas = response.data.data.data;
        this.phlebotomistsList = flebotomistas.map(flebotomista => {
          return {
            item: `${flebotomista.name} ${flebotomista.last_name_father} ${flebotomista.last_name_mother}`,
            value: flebotomista.id,
            recommended: false,
          };
        });

      }
    },
    /**
     * Función para abrir el v-dialog de clientes y seleccionar alguno y agregarlo a la cita
     */
    async openCustomerDialog() {
      this.selected = null;
      this.customerSearchData.perPage = 10; // Cambiar por 10
      this.customerSearchData.numberPage = 1;
      this.customerSearchData.search = "";
      await this.fetchCustomersData(this.customerSearchData);
      this.customerSearcherDialog = true;
    },
    /**
     * Función para abrir v-dialog de crear cliente
     */
    openCreateCustomerDialog() {
      // Limpar datos de objeto de formulario de cliente
      this.customerFormData = Object.assign({}, this.customerFormDataObj);
      // Reiniciar validación del formulario de crear cliente
      if (this.$refs.customerForm) {
        this.$refs.customerForm.resetValidation();
      }
      // Abrir modal
      this.createCustomerDialog = true;
    },
    /**
     * Función para cerrar el dialog de la lista de clientes
     */
    closeCustomerDialog() {
      let customer = this.customersData.data[this.selected];
      this.appointmentData.customerId = customer.id;
    },
    /**
     * Agregar cliente a una cita
     */
    addCustomerToAppointment() {
      // Asignar los valores del cliente seleccionado al objeto principal de ciente
      let customer = this.customersData.data[this.selected];
      // Si se selecciona otro cliente añadir los datos básicos del último cliente seleccionado y limpiar los datos de dirección, fecha y lista de pacientes
      if (this.appointmentData.customerId != customer.id) {
        this.appointmentData.customerId = customer.id;
        this.appointmentData.customerInfoId = parseInt(customer.info.id);
        this.appointmentData.customerPatientId = parseInt(customer.info.patient_id);
        this.appointmentData.name = `${customer.name} ${customer.last_name_father} ${customer.last_name_mother}`;
        this.appointmentData.phoneNumber = customer.phone_number;
        this.appointmentData.email = customer.email;
        // Limpiar las otras variables
        this.appointmentData.addressId = "";
        this.appointmentData.address = "";
        this.appointmentData.lat = null;
        this.appointmentData.lng = null;
        this.appointmentData.date = "";
        this.appointmentData.hour = "";
        this.appointmentData.phlebotomistId = "";
        this.appointmentData.phlebotomistScheduleId = "";
        this.appointmentData.phlebotomistName = "";
        this.patientsList = [];
      }
      this.customerSearcherDialog = false;
      this.customerSearchData.search = "";
      this.clearCustomersData();
    },
    /**
     * Función que prepara el modal para crear direcciones
     */
    openCreateAddressDialog() {
      this.createAddressDialog = true;
      this.addressFormData = JSON.parse(JSON.stringify(this.addressFormDataObj));
      this.addressFormData.customerId = this.appointmentData.customerId;
      if (this.$refs.addressForm) {
        this.$refs.addressForm.resetValidation();
      }
    },
    /**
     * Seleccionar una direccion para que se agregué a la cita
     */
    addAddressToAppointment() {
      // Asignar los valores de la dirección seleccionada al objeto principal de cliente
      let address = this.customerAddresses.data[this.addressesSelected];
      this.appointmentData.addressId = address.id;
      this.appointmentData.lat = address.latitude;
      this.appointmentData.lng = address.longitude;
      this.appointmentData.address = `${address.street} ${address.num_ext} Col. ${address.neighborhood}, CP. ${address.zip_code} ${address.city}, ${address.state}`
      this.customerAddressesDialog = false;
      this.customerAddresses = [];
    },
    /**
     * Al finalizar la selección de horas el paciente y dar click en el boton de "GUARDAR" se cargará la fecha y la hora en los campos correspondientes
     */
    async addDateTimeToAppointment() {
      // Obtener la hora de la cita
      let min = Math.min(...this.selectedAppointmentHours);
      let max = Math.max(...this.selectedAppointmentHours);

      let firstHourObj = this.phlebotomistSchedule.find(schedule => schedule.index == min);

      let firstHour = "";
      let lastHour = "";
      // Comprobar si el horario seleccionado aún se encuentra disponible
      if (!firstHourObj || firstHourObj == null) {
        min = min + 1;
        firstHour = this.phlebotomistSchedule.find(schedule => schedule.index == min).start_date;
      } else {
        firstHour = firstHourObj.start_date;
      }
      lastHour = this.phlebotomistSchedule.find(schedule => schedule.index == max).end_date;

      let startHour = new Date(firstHour);
      let startDateFormatted = `${("0" + startHour.getHours()).slice(-2)}:${(
        "0" + startHour.getMinutes()
      ).slice(-2)}`;
      let endHour = new Date(lastHour);
      let endDateFormatted = `${("0" + endHour.getHours()).slice(-2)}:${(
        "0" + endHour.getMinutes()
      ).slice(-2)}`;

      // Hora de inicio y hora final para el objeto de crear cita
      this.appointmentData.startDate = firstHour;
      this.appointmentData.endDate = lastHour;

      this.appointmentData.date = this.selectedDateAux;
      this.selectedAppointmentHoursAux = this.selectedAppointmentHours.slice();

      this.appointmentData.hour = `${startDateFormatted} - ${endDateFormatted}`;
      this.dateAppointmentDialog = false;

      let response = await this.fetchUser(this.phlebotomistScheduleSelected.phlebotomistId);

      if (response.status > 199 && response.status < 300) {
        let phlebotomist = response.data.data;
        this.appointmentData.phlebotomistId = phlebotomist.id;
        this.appointmentData.phlebotomistName = `${phlebotomist.name} ${phlebotomist.last_name_father} ${phlebotomist.last_name_mother}`;
      }
    },
    /**
     * Cancelar selección de día y hora de cita
     */
    cancelDateTimeAppointment() {
      if (this.appointmentData.hour == '') {
        this.appointmentData.date = "";
        this.selectedDateAux = "";
        this.selectedAppointmentHours = [];
        this.selectedAppointmentHoursAux = [];
      }
      // Comprobar si el día seleccionado anteriormente y el día actual son el mismo para dejarlo igual
      if (this.appointmentData.date != this.selectedDateAux) {
        this.selectedAppointmentHours = this.selectedAppointmentHoursAux.slice();
      }
      this.dateAppointmentDialog = false;
      // Quitar el focus del elemento de la fecha
      this.quitFocus();
    },
    /**
     * Agregar flebotomista seleccionado
     */
    addPhlebotomistToAppointment() {
      // Asignar los valores del cliente seleccionado al objeto principal de ciente
      let phlebotomist = this.phlebotomistsList.data[this.phlebotomistScheduleSelected.phlebotomistId];
      this.appointmentData.phlebotomistId = phlebotomist.id;
      this.appointmentData.phlebotomistName = `${phlebotomist.name} ${phlebotomist.last_name_father} ${phlebotomist.last_name_mother}`;
      this.phlebotomistsDialog = false;
      this.phlebotomistsList = [];
    },
    /**
     * Agregar paciente a la cita, está función se ejecuta cuando se abre el modal, se seleccionan los pacientes y se da click en el botón de "Aceptar"
     */
    addPatientToAppointment() {
      // Asignar valores del paciente seleccionado a la lista de pacientes seleccionados
      this.selectedPatient.forEach(patientIndex => {
        let patient = this.patientsData[patientIndex];
        let patientFormatted = {
          id: patient.id,
          name: patient.name,
          lastNameFather: patient.last_name_father,
          lastNameMother: patient.last_name_mother,
          birthdate: patient.birthdate,
          gender: patient.gender
        };

        let selectedPatientFormatted = {
          patientId: patient.id,
          servicesSelected: [],
        };
        // Comprobar si el paciente no ha sido agregado a la lista de pacientes por atender
        let patientFound = this.patientsList.find(patList => patList.id == patient.id);
        if (!patientFound) {
          // Lista de pacientes que se muestran en la tabla
          this.patientsList.push(patientFormatted);
          // Lista de los estudios seleccionados por paciente
          this.patientServicesSelected.push(selectedPatientFormatted);
        }
      });
      this.customerPatientsDialog = false;
    },
    /**
     * Función para buscar estudios, este apartado se encuentra en la sección en donde salen los estudios para seleccionarlos y agregarselos a un paciente
     */
    async searchServices() {
      this.searchFieldLoader = true;
      // Reiniciar el contador de páginas
      this.serviceSearchData.numberPage = 1;
      // Reiniciar los servicios seleccionados
      this.servicesSelected.length = 0;
      let response = await this.fetchServices(this.serviceSearchData);
      this.validateCurrentServicesSelected();
      this.searchFieldLoader = false;
      // Asignar los costos por servicio a domicilio
      if (!this.isAppointmentDetail) {
        this.visitCosts.visitCost = this.servicesData.visit_cost;
        this.visitCosts.patientCost = this.servicesData.patient_cost;
      }
    },
    /**
     * Función para abrir modal y permitirle al usuario seleccionar los estudios para cada paciente
     */
    async openPatientServicesDialog(patient, index) {
      this.patientSelected = {
        id: patient.id,
        index: index
      }
      this.serviceSearchData.search = "";
      // Clonar objeto de pacientes y servicios seleccionados en objeto temporal
      this.patientServicesSelectedTemp = JSON.parse(JSON.stringify(this.patientServicesSelected));

      // Reiniciar el contador de páginas
      this.serviceSearchData.numberPage = 1;
      // Reiniciar los servicios seleccionados
      this.servicesSelected = [];
      await this.fetchServices(this.serviceSearchData);
      this.validateCurrentServicesSelected();
      // Asignar los costos por servicio a domicilio
      if (!this.isAppointmentDetail) {
        this.visitCosts.visitCost = this.servicesData.visit_cost;
        this.visitCosts.patientCost = this.servicesData.patient_cost;
      }
      this.patientServicesDialog = true;
    },
    /**
     * Al seleccionar un servicio en la lista de servicios asisgnarsela al paciente seleccionado
     */
    addServiceToPatient(services) {
      // Validar si se está agregando un servicio
      let existsService = this.patientServiceIsSelected(services);
      if (!existsService) {
        // Si se está quitando un servicio ingresar a la siguiente función
        this.changeServicesSelection(services);
      }
    },
    /**
     * Agregar los servicios seleccionados al paciente y cerrar el modal
     */
    addAllServicesToPatient() {
      // Clonar objeto temporal de pacientes y servicios a objeto principal de pacientes y servicios de la cita
      this.patientServicesSelected = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp));
      // Reiniciar los servicios seleccionados
      this.servicesSelected = [];
      this.patientServicesDialog = false;
    },
    /**
     * Validar cuando se quita la selección de un estudio al momento de editar una cita
     *  Si un estudio se quiere quitar de la cita, pero este ya cambió de precio esta fucnión sirve para mostrarle
     *  un modal con una alerta al usuario para indicarle que el estudio ya cambió de precio y si lo quita se borrará
     *  el precio que tenía anteriormente y se pondrá uno nuevo.
     */
    validateRemoveServiceToPatient(service) {
      this.removeServiceSelected = service;
      if (service.historicalServiceId != service.historicalServiceIdNew) {
        this.confirmRemoveServiceDialog = true;
        return true;
      } else {
        this.removeServiceToPatientCopy();
        return false;
      }
    },
    /**
     * Función para quitar estudios de los estudios seleccionados
     */
    removeServiceToPatient(index) {
      this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.splice(index, 1);
      let selectedServices = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected));
      // Id de todos los servicios seleccionados hasta el momento
      let allServicesIds = selectedServices.map(service => service.id);
      this.servicesSelected = [];
      // Hacer la comparación solo con los servicios que están seleccionados en la columna derecha y no con todos los servicios consultados
      this.servicesData.paginated.data.forEach((service, index) => {
        if(allServicesIds.indexOf(service.id) >= 0) {
          this.servicesSelected.push(index);
        }
      });

    },
    /**
     * Función para quitar estudios de los estudios seleccionados
     */
    removeServiceToPatientCopy() {
      let serviceIndex = this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.findIndex(servicesSelected => servicesSelected.id == this.removeServiceSelected.id);
      this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.splice(serviceIndex, 1);
      let selectedServices = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected));
      // Id de todos los servicios seleccionados hasta el momento
      let allServicesIds = selectedServices.map(service => service.id);
      this.servicesSelected = [];
      // Hacer la comparación solo con los servicios que están seleccionados en la columna derecha y no con todos los servicios consultados
      this.servicesData.paginated.data.forEach((service, index) => {
        if(allServicesIds.indexOf(service.id) >= 0) {
          this.servicesSelected.push(index);
        }
      });
      // Si está abierto el pop up de confirmar eliminación del estudio, cerrarlo
      if (this.confirmRemoveServiceDialog == true) {
        this.confirmRemoveServiceDialog = false;
      }
    },
    validateServiceToPatient(servicesIndexs) {
      // Obtener el index del servicio que se deseleccionó;
      let indexSelectedService = this.servicesSelectedTemp.filter(serviceSelectedTemp => servicesIndexs.indexOf(serviceSelectedTemp) == -1)[0];
      let service = this.servicesData.paginated.data[indexSelectedService];

      let patientService = this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.filter(servicesSelected => servicesSelected.id == service.id)[0];

      let isServiceUpdated = this.validateRemoveServiceToPatient(patientService);

      return isServiceUpdated;
    },
    /**
     * Actualizar la lista de estudios seleccionados al momento de aceptar la selección se estudios por paciente
     */
    changeServicesSelection(servicesIndexs) {
      let isServiceUpdated = this.validateServiceToPatient(servicesIndexs);
      if (!isServiceUpdated) {
        let selectedServices = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected));
        // Id de todos los servicios seleccionados hasta el momento
        let allServicesIds = selectedServices.map(service => service.id);
        // Id de servicios actuales
        let currentServicesIds = this.servicesData.paginated.data.map(service => service.id);
        // Lista con todos los servicios actuales seleccionados para el paciente
        let currentNotServicesSelectedIds = allServicesIds.filter(allService => currentServicesIds.indexOf(allService) === -1);

        // Lista con todos los servicios seleccionados en la lista de servicios filtrados
        let currentServicesDataSelectedIds = [];
        servicesIndexs.forEach(serviceIndex => {
          let service = this.servicesData.paginated.data[serviceIndex];
          currentServicesDataSelectedIds.push(service.id);
        });

        // Juntar los arreglos y hacer el filtro del arreglo general
        let servicesSelectedAux = currentNotServicesSelectedIds.concat(currentServicesDataSelectedIds);

        this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected = this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.filter(service => servicesSelectedAux.indexOf(service.id) >= 0);
        this.servicesSelectedTemp = this.servicesSelected.slice();
      } else {
        this.servicesSelected = this.servicesSelectedTemp.slice();
      }
    },
    /**
     * Al momento de agregar un estudio se compreba si ya está seleccionado
     */
    patientServiceIsSelected(services) {
      // Comprobar si el servicio no existe en la lista, y si no existe agregarlo al final;
      let selectedServices = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected));
      let existsService = false;
      if (selectedServices.length == 0) {
        services.forEach(serviceIndex => {
          let currentService = this.servicesData.paginated.data[serviceIndex];
          let serviceSelectedFormatted = {
            id: currentService.id,
            historicalServiceId: currentService.historical_service_id,
            historicalServiceIdNew: currentService.historical_service_id,
            name: currentService.name,
            publicCost: currentService.public_cost
          };
          this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.push(serviceSelectedFormatted);
          // Clonar el select de los servicios
          this.servicesSelectedTemp = this.servicesSelected.slice();
          existsService = true;
        });
      } else {
        // Id de servicios actuales
        let currentServicesIds = [];
        services.forEach(serviceIndex => {
          let service = this.servicesData.paginated.data[serviceIndex];
          currentServicesIds.push(service.id);
        });
        // Id de todos los servicios seleccionados hasta el momento
        let allServicesIds = selectedServices.map(service => service.id);
        let notIncludesServicesIds = [];
        currentServicesIds.forEach(serviceId => {
          if (allServicesIds.indexOf(serviceId) == -1) {
            notIncludesServicesIds.push(serviceId);
          }
        });
        if (notIncludesServicesIds.length > 0) {
          notIncludesServicesIds.forEach(serviceId => {
            let selectedService = this.servicesData.paginated.data.filter(service => service.id == serviceId)[0];
            let serviceSelectedFormatted = {
              id: selectedService.id,
              historicalServiceId: selectedService.historical_service_id,
              historicalServiceIdNew: selectedService.historical_service_id,
              name: selectedService.name,
              publicCost: selectedService.public_cost
            };
            this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected.push(serviceSelectedFormatted);
            // Clonar el select de los servicios
            this.servicesSelectedTemp = this.servicesSelected.slice();
            existsService = true;
          });
        }
      }
      return existsService;
    },
    /**
     * Función que valida los estudios que ya fueron seleccionados por el paciente en curso
     *  Los estudios que ya fueron seleccionados se mostrarán el la lista de estudios como seleccionados y no se podrán seleccionar otra vez
     */
    validateCurrentServicesSelected(){
      let selectedServices = JSON.parse(JSON.stringify(this.patientServicesSelectedTemp[this.patientSelected.index].servicesSelected));
      if ( selectedServices.length > 0 ) {
        // Id de todos los servicios seleccionados hasta el momento
        let allServicesIds = selectedServices.map(service => service.id);
        this.servicesData.paginated.data.forEach((service, index) => {
          if(allServicesIds.indexOf(service.id) >= 0) {
            this.servicesSelected.push(index);
            this.servicesSelectedTemp.push(index);
          }
        });
      }
    },
    /**
     * Función para obtener el total de los servicios solicitados por paciente
     */
    getPatientTotal(services) {
      let publicCostArray = services.map(service => {
        return service.publicCost;
      });
      return publicCostArray.reduce((a, b) => a + b, 0);
    },
    /**
     * Función para obtener el subtotal a pagar de la cita
     */
    getAppointmentSubtotal() {
      let patientTotalArray = [0];
      this.patientServicesSelected.forEach(patientServices => {
        patientServices.servicesSelected.forEach(service => {
          patientTotalArray.push(service.publicCost);
        });
      });
      return patientTotalArray.reduce((a, b) => a + b, 0);
    },
    /**
     * Función para obtener el total a pagar de la cita
     */
    getAppointmentTotal() {
      let patientTotalArray = [0];
      this.patientServicesSelected.forEach(patientServices => {
        patientServices.servicesSelected.forEach(service => {
          patientTotalArray.push(service.publicCost);
        });
      });
      let subtotal = patientTotalArray.reduce((a, b) => a + b, 0);
      // Obtener la cantidad de pacientes para calcular la comisión
      let total = subtotal + this.visitCosts.visitCost;

      if (this.patientServicesSelected.length > 1) {
        total += (this.patientServicesSelected.length-1)*this.visitCosts.patientCost;
      }

      return total;
    },
    /**
     * Abrir modal de confirmación de eliminar paciente de los pacientes seleccionados
     */
    removePatient(patientId) {
      this.patientFormData.id = patientId;
      this.removePatientDialog = true;
      console.log(this.patientFormData);
    },
    /**
     * Confirmar la eliminación de un paciente de los pacientes seleccionados en la cita
     */
    confirmRemovePatient() {
      this.patientsList = this.patientsList.filter(patient => patient.id != this.patientFormData.id);
      this.patientServicesSelected = this.patientServicesSelected.filter(patient => patient.patientId != this.patientFormData.id);
      this.removePatientDialog = false;
    },
    /**
     * Función que ejecuta la acción de abrir el modal que permite registrar un nuevo paciente en la base de datos
     */
    addPatient() {
      this.patientAction = "CREATE";
      this.patientFormData = JSON.parse(JSON.stringify(this.patientFormDataObj));
      // Reiniciar validación del formulario
      this.patientFormData.customerInfoId = parseInt(this.appointmentData.customerInfoId);
      if (this.$refs.patientForm) {
        this.$refs.patientForm.resetValidation();
      }
      this.patientDialog = true;
    },
    /**
     * Función que ejecuta la acción de abrir el modal que permite editar los datos de un paciente
     */
    selectPatient(patient) {
      this.patientAction = "UPDATE";
      // Reiniciar validación del formulario
      if (this.$refs.patientForm) {
        this.$refs.patientForm.resetValidation();
      }
      this.patientFormData.id = patient.id;
      this.patientFormData.name = patient.name;
      this.patientFormData.lastNameFather = patient.lastNameFather;
      this.patientFormData.lastNameMother = patient.lastNameMother;
      this.patientFormData.birthdate = patient.birthdate.substring(0, 10);
      this.patientFormData.gender = patient.gender;
      
      this.patientDialog = true;
    },
    /**
     * Función que cierra el modal que permite crear y editar un paciente (El modal para crear y editar un paciente es el mismo)
     */
    closePatientDialog() {
      this.patientDialog = false;
      this.patientAction = "";
      if (this.$refs.patientForm) {
        this.$refs.patientForm.resetValidation();
      }
      this.patientFormData = JSON.parse(JSON.stringify(this.patientFormDataObj));
    },
    /**
     *  Función para encontrar dirección con los servicios de google (Falta conseguir nuestra propia Key)
     */
    async findAddress() {
      let geocodingUrl = `${this.addressFormData.street} ${this.addressFormData.numExt}, ${this.addressFormData.zipCode} ${this.addressFormData.city}, ${this.addressFormData.state}, México`;
      let response = await Vue.axios({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${geocodingUrl}&key=AIzaSyBykg1AabFvit-yDS4BU4AWBCdaKro_w2A`,
      });

      if (response.data.results.length > 0) {

        if (pointInPolygon([ response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng ], this.zone.polygon)) {
          this.addressFormData.zone_id = this.zone.id;
          this.addressFormData.latitude = response.data.results[0].geometry.location.lat;
          this.addressFormData.longitude = response.data.results[0].geometry.location.lng;
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
     * Función para validar que el usuario solo esta seleccionando citas que sean subsecuentes 
     */
    validateAppointmentSelection(index) {

      let valid = false;
      if (this.selectedAppointmentHours.length > 0) {
        let min = Math.min(...this.selectedAppointmentHours);
        let max = Math.max(...this.selectedAppointmentHours);
  
        if (index >= (min-1) && index <= (max+1)) {
          valid = true;
        }
        if (index > min && index < max) {
          valid = false;
        }
      }
      return valid;
    },
    validateSelectedPatient(patientId) {
      let exists = this.patientsList.find(patient => patient.id == patientId);
      return exists==undefined?false:true;
    },
    /**
     * Función para validar que el comienzo de la cita a agendar sea mayor al tiempo actual
     */
    validateAppointmentDateSelection() {
      let currentDate = new Date();
      let currentStartDate = new Date(this.appointmentData.startDate);
      // Comparar el horario actual con el que se quiere agendar
      if (currentDate > currentStartDate) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * Función de paginación para la lista de clientes
     * * Esta función se manda a llamar desde el v-dialog de clientes
     */
    async customerPagination(buttonPressed) {
      // Reiniciar la selección de clientes cuando se salta de página
      this.selected = null;
      if (buttonPressed == "firstPage") {
        this.customerSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.customerSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.customerSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.customerSearchData.numberPage = this.customersData.last_page;
      }
      await this.fetchCustomersData(this.customerSearchData);
    },
    /**
     * Función de paginación para la lista de estudios
     * * Esta función se manda a llamar desde el v-dialog de clientes
     */
    async servicesPagination(buttonPressed) {
      if (buttonPressed == "firstPage") {
        this.serviceSearchData.numberPage = 1;
      } else if (buttonPressed == "previous") {
        this.serviceSearchData.numberPage--;
      } else if (buttonPressed == "next") {
        this.serviceSearchData.numberPage++;
      } else if (buttonPressed == "lastPage") {
        this.serviceSearchData.numberPage = this.servicesData.paginated.last_page;
      }
      this.servicesLoader = true;
      this.servicesSelected.length = 0;
      await this.fetchServices(this.serviceSearchData);
      this.validateCurrentServicesSelected();
      this.servicesLoader = false;
    },
    /**
     * Función para generar horarios con todas los horarios disponibles
     */
    generateEmptySchedule(schedules){
      let emptySchedule = schedules.map(schedule => {
        return {
          end_date: schedule.end_date,
          index: schedule.index,
          isBreakFast: schedule.isBreakFast,
          isReserved: false,
          start_date: schedule.start_date,
        }
      });
      return emptySchedule;
    },
    /**
     * Función para seleccionar las citas resevadas si es que existen citas extraordinarias en ese día
     */
    getExtraordinaryScheduleAppointments(extraordinarySchedules) {
      extraordinarySchedules.forEach(extraSchedule => {
        if (this.phlebotomistScheduleSelected.phlebotomistId == extraSchedule.user_id) {
          let startDate = new Date(extraSchedule.start_date);
          let endDate = new Date(extraSchedule.end_date);
          this.phlebotomistSchedule.forEach(schedule => {
            let currentDate = new Date(schedule.start_date);
            if (currentDate >= startDate && currentDate < endDate) {
              schedule.isReserved = true;
            }
          });
        }
      });
    },
    /**
     * Función para guardar el index de las horas seleccionadas
     */
    saveHoursIndex() {
      this.selectedAppointmentHoursIndex;
    },
    /**
     * Función para validar los caracteres del telefono
     * * Sirve para evitar que escriban letras en vez de números
     */
    validatePhone() {
      let re = /[^0-9]/gi;
      this.customerFormData.phone = this.customerFormData.phone.replace(re, "");
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
     * Función para obtener edad mediante la fecha de nacimiento
     */
    getAge(date) {
      let today = new Date();
      let birthdate = new Date(date);
      let age = today.getFullYear() - birthdate.getFullYear();
      let m = today.getMonth() - birthdate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
          age--;
      }

      return age;
    },
    /** Función para guardar la fecha de nacimiento del cliente*/
    changeCustomerBirthdate (date) {
      this.$refs.customerBirthdateMenu.save(date)
    },
    /** Función para guardar la fecha de nacimiento*/
    changeBirthdate (date) {
      this.$refs.birthdateMenu.save(date)
    },
    /**
     * Función para que al seleccionar una fecha de nacimiento solo se pueda seleccionar la fecha de los mayores de edad
     */
    getMinBirthdate() {
      let maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 18);
      return `${maxDate.getFullYear()}-${
        maxDate.getMonth() + 1
      }-${maxDate.getDate()}`;
    },
    /**
     * Función para acomodar los horarios de un flebotomista.
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
     * Función para quitar el focus en todos los elementos del html
     * Cuando se cierra un v-dialog se enfoca automáticamente en el último elemento seleccionado.
     * Se debe de eiminar el focus que hace por default, para que cuando se cancele la selección de cualquier elemento no paresca que hay un error.
     */
    quitFocus() {
      setTimeout(() => {
        document.activeElement.blur();
      }, 100)
    }
  },
  // Menú para guardar la fecha de nacimiento
  watch: {
    customerBirthdateMenu (val) {
      val && setTimeout(() => (this.customerActivePicker = 'YEAR'))
    },
    birthdateMenu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  /**
   * Función que se ejecuta al momento de cargar la vista
   *  Se valida si se va a crear una nueva cita o se va a editar una existente
   *  Si se va a editar una cita existente, esta función carga los datos correspondientes en cada campo de texto
   */
  async mounted() {
    this.loading();

    // Consultar los límites de toda la zona de Durango
    await this.fetchZone(1);

    // Comprobar si se envió un parámetro con un id de una cita
    this.isAppointmentDetail = this.$route.fullPath.split("/")[2] === "detalle-cita" ? true : false;
    if (this.isAppointmentDetail){
      this.appointmentData.id = this.$route.params.id;
      let response = await this.fetchAppointmentData(this.appointmentData.id);

      if (response.status && response.status > 199 && response.status < 300) {
        try {
          await this.$_fetchPhlebotomistsDataCopy();
        let appointment = response.data.data;

        // Variable para obtener los id de los servicios para poder consultarlos posteriormente
        let servicesSelectedIds = [];
        // Dar formato a la hora
        let startHour = new Date(appointment.start_date);
        let startDateFormatted = `${("0" + startHour.getHours()).slice(-2)}:${(
          "0" + startHour.getMinutes()
        ).slice(-2)}`;
        let endHour = new Date(appointment.end_date);
        let endDateFormatted = `${("0" + endHour.getHours()).slice(-2)}:${(
          "0" + endHour.getMinutes()
        ).slice(-2)}`;

        this.appointmentData = {
          id: appointment.id,
          customerId: appointment.customer.id,
          customerInfoId: appointment.customer_info_id,
          customerPatientId: appointment.default_patient_id,
          name: `${appointment.customer.name} ${appointment.customer.last_name_father} ${appointment.customer.last_name_mother}`,
          phoneNumber: appointment.customer.phone_number,
          email: appointment.customer.email,
          addressId: appointment.address.id,
          address: `${appointment.address.street} ${appointment.address.num_ext} Col. ${appointment.address.neighborhood}, CP. ${appointment.address.zip_code} ${appointment.address.city}, ${appointment.address.state}`,
          lat: appointment.address.latitude,
          lng: appointment.address.longitude,
          date: appointment.start_date.substring(0, 10),
          hour: `${startDateFormatted} - ${endDateFormatted}`,
          startDate: appointment.start_date,
          endDate: appointment.end_date,
          phlebotomistId: appointment.phlebotomist.id,
          phlebotomistScheduleId: appointment.phlebotomist_schedule_id,
          phlebotomistName: `${appointment.phlebotomist.name} ${appointment.phlebotomist.last_name_father} ${appointment.phlebotomist.last_name_mother}`,
          status: appointment.status.name
        };

        appointment.order_patients.forEach((patient, index) => {
          let selectedPatientFormatted = {
            patientId: patient.patient_id,
            servicesSelected: [],
          };
          let patientFormatted = {
            id: appointment.patients[index].id,
            name: appointment.patients[index].name,
            lastNameFather: appointment.patients[index].last_name_father,
            lastNameMother: appointment.patients[index].last_name_mother,
            birthdate: appointment.patients[index].birthdate,
            gender: appointment.patients[index].gender
          };
          this.patientsList.push(patientFormatted);
          this.patientServicesSelected.push(selectedPatientFormatted);
          patient.historical_services.forEach(service => {
            let serviceSelectedFormatted = {
              id: service.service_id,
              historicalServiceId: service.id,
              name: service.name,
              publicCost: service.public_cost
            };
            this.patientServicesSelected[index].servicesSelected.push(serviceSelectedFormatted);
            servicesSelectedIds.push(service.service_id);
          });
        });
        this.visitCosts.visitCost = appointment.visit_cost;
        this.visitCosts.patientCost = appointment.patient_cost;

        // Variable para buscar pacientes
        this.patientsSearchData.customerId = appointment.customer.id;
        servicesSelectedIds = servicesSelectedIds.filter((item,index)=>{
          return servicesSelectedIds.indexOf(item) === index;
        });

        let responseCheckServices = await this.fetchCheckServices(servicesSelectedIds);
        let checkServices = responseCheckServices.data.data;
        this.patientServicesSelected.forEach(patientServices => {
          patientServices.servicesSelected.forEach(service => {
            let currentService = checkServices.filter(checkService => checkService.id == service.id)[0];
            service.historicalServiceIdNew = currentService.historical_service_id;
          });
        })
        // Respaldar detalle de la cita
        this.appointmentDataBackup = JSON.parse(JSON.stringify(this.appointmentData));
        } catch (error) {
          this.loaded();
          console.log(error);
          this.show({
            text: "Hubo un problema al consultar los datos de la cita",
            color: "red accent-3",
          });
          this.$router.push("/citas");
        }
      } else {
        this.loaded();
        if (response.data && response.data.error) {
          this.show({
            text: response.data.error,
            color: "red accent-3",
          });
        } else {
          this.show({
            text: "Hubo un problema al consultar los datos de la cita",
            color: "red accent-3",
          });
        }
        this.$router.push("/citas");
      }
    }
    this.loaded();
  }
};
</script>
<style scoped>

.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}
</style>