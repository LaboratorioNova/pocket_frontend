<!--Tabla que muestra los registros de las citas en la sección de reportes-->
<template>
  <v-data-table
    class="rounded-xl mx-1 mx-sm-5 mx-md-12 mb-5"
    no-data-text="No hay datos disponibles."
    no-results-text="No hay datos disponibles."
    loading-text="Cargando datos..."
    :calculate-widths="true"
    :headers="appointmentsHeaders"
    :items="appointmentsData.data"
    hide-default-header
    disable-sort
    hide-default-footer
    :items-per-page="appointmentsSearchData.perPage"
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-if="$vuetify.breakpoint.smAndUp" class="background-tr-color">
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
            $vuetify.breakpoint.xsOnly ? 'v-data-table__mobile-table-row' : '',
          ]"
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
              {{ appointmentsHeaders[1].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[1].align}`
              "
            >
              {{ item.customer?item.customer.user.name:"" }}
              {{ item.customer?item.customer.user.last_name_father:"" }}
              {{ item.customer?item.customer.user.last_name_mother:"" }}
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
              {{ appointmentsHeaders[2].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[2].align}`
              "
            >
              {{ item.user?item.user.name:"" }}
              {{ item.user?item.user.last_name_father:"" }}
              {{ item.user?item.user.last_name_mother:"" }}
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
              {{ appointmentsHeaders[3].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[3].align}`
              "
            >
              <span class="text-center">{{ formatCreatedDate(item.created_at) }}</span>
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
              {{ appointmentsHeaders[4].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[4].align}`
              "
            >
              <span class="text-center">{{ formatAppointmentDate(item.start_date) }}</span>
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
              {{ appointmentsHeaders[5].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[5].align}`
              "
            >
              {{ item.status.name }}
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
              {{ appointmentsHeaders[6].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[6].align}`
              "
            >
              {{ item.patients?item.patients.length:'NA' }}
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
              {{ appointmentsHeaders[7].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${appointmentsHeaders[7].align}`
              "
            >
              {{ item.cost | currency }}
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    appointmentsHeaders: {
      type: Array,
      required: true,
    },
    appointmentsData: {
      type: Object,
      required: true
    },
    appointmentsSearchData: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Función para dar formato a la fecha de creación de la cita
     */
    formatCreatedDate(date) {
      let currentDate = new Date(date);
      currentDate = currentDate.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      return currentDate;
    },
    /**
     * Función para dar formato a la fecha en la que comienza la cita
     */
    formatAppointmentDate(date) {
      let currentDate = new Date(date);
      currentDate = currentDate.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      return currentDate;
    },
  }
}
</script>
<style scoped>
.background-tr-color {
  background-color: #cfd8dc;
}
</style>