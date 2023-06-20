<!--Componente de tabla de citas extraordinarias, en este componente se muestran las citas que son generadas en un horario fuera del que se maneja habitualmente
    El componente es usado en el apartado de "Home" en la sección de "Citas extraordinarias"
-->
<template>
  <v-data-table
    class="rounded-xl mx-1 mx-sm-5 mx-md-12 mb-5"
    no-data-text="No hay datos disponibles."
    no-results-text="No hay datos disponibles."
    loading-text="Cargando datos..."
    :calculate-widths="true"
    :headers="extraordinarySchedulesHeaders"
    :items="extraordinarySchedulesData"
    hide-default-header
    disable-sort
    hide-default-footer
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr
          v-if="$vuetify.breakpoint.smAndUp"
          class="background-tr-color"
        >
          <th :class="`text-${extraordinarySchedulesHeaders[0].align}`">
            {{ extraordinarySchedulesHeaders[0].text }}
          </th>
          <th :class="`text-${extraordinarySchedulesHeaders[1].align}`">
            {{ extraordinarySchedulesHeaders[1].text }}
          </th>
          <th :class="`text-${extraordinarySchedulesHeaders[2].align}`">
            {{ extraordinarySchedulesHeaders[2].text }}
          </th>
          <th :class="`text-${extraordinarySchedulesHeaders[3].align}`">
            {{ extraordinarySchedulesHeaders[3].text }}
          </th>
          <th :class="`text-${extraordinarySchedulesHeaders[4].align}`">
            {{ extraordinarySchedulesHeaders[4].text }}
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
              class="
                font-weight-bold
                mr-2
                v-data-table__mobile-row__header
                d-flex d-sm-none
              "
            >
              {{ extraordinarySchedulesHeaders[0].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${extraordinarySchedulesHeaders[0].align}`
              "
            >
              {{ item.hour }}
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
              {{ extraordinarySchedulesHeaders[1].text }}
            </div>

            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${extraordinarySchedulesHeaders[1].align}`
              "
            >
              {{item.customer}}
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
              {{ extraordinarySchedulesHeaders[2].text }}
            </div>

            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${extraordinarySchedulesHeaders[2].align}`
              "
            >
              {{item.phlebotomist}}
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
              {{ extraordinarySchedulesHeaders[3].text }}
            </div>

            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${extraordinarySchedulesHeaders[3].align}`
              "
            >
              {{item.address}}
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
              {{ extraordinarySchedulesHeaders[4].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${extraordinarySchedulesHeaders[4].align}`
              "
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="orange"
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    :to="`/citas/detalle-cita/${item.id}`"
                  >
                    <v-icon dark> mdi-form-select </v-icon>
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
</template>
<script>
export default {
  props: {
    // Headers de tabla
    extraordinarySchedulesHeaders: {
      type: Array,
      required: true,
    },
    // Registros de la tabla
    extraordinarySchedulesData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
.background-tr-color {
  background-color: #cfd8dc;
}
</style>