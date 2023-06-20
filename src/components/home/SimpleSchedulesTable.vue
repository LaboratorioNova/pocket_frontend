<!--Componente de tabla de citas del día, en este componente se muestran las citas del día actual
    El componente es usado en el apartado de "Home" en la sección de "Citas del día"
-->
<template>
  <v-data-table
    class="rounded-xl mx-1 mx-sm-5 mx-md-12 mb-5"
    no-data-text="No hay datos disponibles."
    no-results-text="No hay datos disponibles."
    loading-text="Cargando datos..."
    :calculate-widths="true"
    :headers="schedulesHeaders"
    :items="schedulesData"
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
          <th :class="`text-${schedulesHeaders[0].align}`">
            {{ schedulesHeaders[0].text }}
          </th>
          <th :class="`text-${schedulesHeaders[1].align}`">
            {{ schedulesHeaders[1].text }}
          </th>
          <th :class="`text-${schedulesHeaders[2].align}`">
            {{ schedulesHeaders[2].text }}
          </th>
          <th :class="`text-${schedulesHeaders[3].align}`">
            {{ schedulesHeaders[3].text }}
          </th>
          <th :class="`text-${schedulesHeaders[4].align}`">
            {{ schedulesHeaders[4].text }}
          </th>
          <th :class="`text-${schedulesHeaders[5].align}`">
            {{ schedulesHeaders[5].text }}
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
              {{ schedulesHeaders[0].text }}
            </div>
            <div
              :class="
                $vuetify.breakpoint.xsOnly
                  ? 'v-data-table__mobile-row__cell'
                  : `d-flex justify-${schedulesHeaders[0].align}`
              "
            >
              {{ item.hour }}
            </div>
          </td>
          <v-tooltip top :disabled="!item.fleb1.isReserved" color="grey lighten-3">
            <template v-slot:activator="{ on, attrs }">
              <td
                :class="
                  $vuetify.breakpoint.xsOnly
                    ? 'v-data-table__mobile-row pt-6'
                    : ''
                "
                v-bind="attrs"
                v-on="on"
              >
                <div
                  class="
                    font-weight-bold
                    mr-2
                    v-data-table__mobile-row__header
                    d-flex d-sm-none
                  "
                >
                  {{ schedulesHeaders[1].text }}
                </div>

                <div
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'v-data-table__mobile-row__cell'
                      : `d-flex justify-${schedulesHeaders[1].align}`
                  "
                >
                  <span
                    v-if="item.fleb1.notAvailable"
                    class="grey--text font-weight-bold subtitle-2"
                    >No disponible</span
                  >
                  <span
                    v-else-if="item.fleb1.isBreakFast"
                    class="amber--text font-weight-bold subtitle-2"
                    >Comida</span
                  >
                  <span
                    v-else-if="!item.fleb1.isReserved"
                    class="accent--text font-weight-bold subtitle-2"
                    >Disponible</span
                  >
                  <v-btn v-else class="font-weight-bold text-capitalize subtitle-2" text small color="red" :to="`/citas/detalle-cita/${item.fleb1.order_id}`"
                    >Reservado</v-btn
                  >
                </div>
              </td>
            </template>
            <p class="primary--text font-weight-bold pt-2 mb-1"><v-icon color="primary" class="pr-1">mdi-clock-outline</v-icon> {{item.fleb1.customer?item.fleb1.customer.name:'Sin datos del cliente'}}</p>
            <p class="secondary--text mb-1">{{item.fleb1.address?`${item.fleb1.address.street} ${item.fleb1.address.num_ext}`:'Sin datos de dirección'}}</p>
            <p v-if="item.fleb1.address" class="secondary--text mb-1">{{item.fleb1.address?`Col. ${item.fleb1.address.neighborhood}, ${item.fleb1.address.city}, ${item.fleb1.address.state}`:'Sin datos de dirección'}}</p>
          </v-tooltip>
          <v-tooltip top :disabled="!item.fleb2.isReserved" color="grey lighten-3">
            <template v-slot:activator="{ on, attrs }">
              <td
                :class="
                  $vuetify.breakpoint.xsOnly
                    ? 'v-data-table__mobile-row pt-6'
                    : ''
                "
                v-bind="attrs"
                v-on="on"
              >
                <div
                  class="
                    font-weight-bold
                    mr-2
                    v-data-table__mobile-row__header
                    d-flex d-sm-none
                  "
                >
                  {{ schedulesHeaders[2].text }}
                </div>

                <div
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'v-data-table__mobile-row__cell'
                      : `d-flex justify-${schedulesHeaders[1].align}`
                  "
                >
                  <span
                    v-if="item.fleb2.notAvailable"
                    class="grey--text font-weight-bold subtitle-2"
                    >No disponible</span
                  >
                  <span
                    v-else-if="item.fleb2.isBreakFast"
                    class="amber--text font-weight-bold subtitle-2"
                    >Comida</span
                  >
                  <span
                    v-else-if="!item.fleb2.isReserved"
                    class="accent--text font-weight-bold subtitle-2"
                    >Disponible</span
                  >
                  <v-btn v-else class="font-weight-bold text-capitalize subtitle-2" text small color="red" :to="`/citas/detalle-cita/${item.fleb2.order_id}`"
                    >Reservado</v-btn
                  >
                </div>
              </td>
            </template>
            <p class="primary--text font-weight-bold pt-2 mb-1"><v-icon color="primary" class="pr-1">mdi-clock-outline</v-icon> {{item.fleb2.customer?item.fleb2.customer.name:'Sin datos del cliente'}}</p>
            <p class="secondary--text mb-1">{{item.fleb2.address?`${item.fleb2.address.street} ${item.fleb2.address.num_ext}`:'Sin datos de dirección'}}</p>
            <p v-if="item.fleb2.address" class="secondary--text mb-1">{{item.fleb2.address?`Col. ${item.fleb2.address.neighborhood}, ${item.fleb2.address.city}, ${item.fleb2.address.state}`:'Sin datos de dirección'}}</p>
          </v-tooltip>
          <v-tooltip top :disabled="!item.fleb3.isReserved" color="grey lighten-3">
            <template v-slot:activator="{ on, attrs }">
              <td
                :class="
                  $vuetify.breakpoint.xsOnly
                    ? 'v-data-table__mobile-row pt-6'
                    : ''
                "
                v-bind="attrs"
                v-on="on"
              >
                <div
                  class="
                    font-weight-bold
                    mr-2
                    v-data-table__mobile-row__header
                    d-flex d-sm-none
                  "
                >
                  {{ schedulesHeaders[3].text }}
                </div>

                <div
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'v-data-table__mobile-row__cell'
                      : `d-flex justify-${schedulesHeaders[1].align}`
                  "
                >
                  <span
                    v-if="item.fleb3.notAvailable"
                    class="grey--text font-weight-bold subtitle-2"
                    >No disponible</span
                  >
                  <span
                    v-else-if="item.fleb3.isBreakFast"
                    class="amber--text font-weight-bold subtitle-2"
                    >Comida</span
                  >
                  <span
                    v-else-if="!item.fleb3.isReserved"
                    class="accent--text font-weight-bold subtitle-2"
                    >Disponible</span
                  >
                  <v-btn v-else class="font-weight-bold text-capitalize subtitle-2" text small color="red" :to="`/citas/detalle-cita/${item.fleb3.order_id}`"
                    >Reservado</v-btn
                  >
                </div>
              </td>
            </template>
            <p class="primary--text font-weight-bold pt-2 mb-1"><v-icon color="primary" class="pr-1">mdi-clock-outline</v-icon> {{item.fleb3.customer?item.fleb3.customer.name:'Sin datos del cliente'}}</p>
            <p class="secondary--text mb-1">{{item.fleb3.address?`${item.fleb3.address.street} ${item.fleb3.address.num_ext}`:'Sin datos de dirección'}}</p>
            <p v-if="item.fleb3.address" class="secondary--text mb-1">{{item.fleb3.address?`Col. ${item.fleb3.address.neighborhood}, ${item.fleb3.address.city}, ${item.fleb3.address.state}`:'Sin datos de dirección'}}</p>
          </v-tooltip>
          <v-tooltip top :disabled="!item.fleb4.isReserved" color="grey lighten-3">
            <template v-slot:activator="{ on, attrs }">
              <td
                :class="
                  $vuetify.breakpoint.xsOnly
                    ? 'v-data-table__mobile-row pt-6'
                    : ''
                "
                v-bind="attrs"
                v-on="on"
              >
                <div
                  class="
                    font-weight-bold
                    mr-2
                    v-data-table__mobile-row__header
                    d-flex d-sm-none
                  "
                >
                  {{ schedulesHeaders[4].text }}
                </div>

                <div
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'v-data-table__mobile-row__cell'
                      : `d-flex justify-${schedulesHeaders[1].align}`
                  "
                >
                  <span
                    v-if="item.fleb4.notAvailable"
                    class="grey--text font-weight-bold subtitle-2"
                    >No disponible</span
                  >
                  <span
                    v-else-if="item.fleb4.isBreakFast"
                    class="amber--text font-weight-bold subtitle-2"
                    >Comida</span
                  >
                  <span
                    v-else-if="!item.fleb4.isReserved"
                    class="accent--text font-weight-bold subtitle-2"
                    >Disponible</span
                  >
                  <v-btn v-else class="font-weight-bold text-capitalize subtitle-2" text small color="red" :to="`/citas/detalle-cita/${item.fleb4.order_id}`"
                    >Reservado</v-btn
                  >
                </div>
              </td>
            </template>
            <p class="primary--text font-weight-bold pt-2 mb-1"><v-icon color="primary" class="pr-1">mdi-clock-outline</v-icon> {{item.fleb4.customer?item.fleb4.customer.name:'Sin datos del cliente'}}</p>
            <p class="secondary--text mb-1">{{item.fleb4.address?`${item.fleb4.address.street} ${item.fleb4.address.num_ext}`:'Sin datos de dirección'}}</p>
            <p v-if="item.fleb4.address" class="secondary--text mb-1">{{item.fleb4.address?`Col. ${item.fleb4.address.neighborhood}, ${item.fleb4.address.city}, ${item.fleb4.address.state}`:'Sin datos de dirección'}}</p>
          </v-tooltip>
          <v-tooltip top :disabled="!item.fleb5.isReserved" color="grey lighten-3">
            <template v-slot:activator="{ on, attrs }">
              <td
                :class="
                  $vuetify.breakpoint.xsOnly
                    ? 'v-data-table__mobile-row pt-6'
                    : ''
                "
                v-bind="attrs"
                v-on="on"
              >
                <div
                  class="
                    font-weight-bold
                    mr-2
                    v-data-table__mobile-row__header
                    d-flex d-sm-none
                  "
                >
                  {{ schedulesHeaders[5].text }}
                </div>

                <div
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'v-data-table__mobile-row__cell'
                      : `d-flex justify-${schedulesHeaders[1].align}`
                  "
                >
                  <span
                    v-if="item.fleb5.notAvailable"
                    class="grey--text font-weight-bold subtitle-2"
                    >No disponible</span
                  >
                  <span
                    v-else-if="item.fleb5.isBreakFast"
                    class="amber--text font-weight-bold subtitle-2"
                    >Comida</span
                  >
                  <span
                    v-else-if="!item.fleb5.isReserved"
                    class="accent--text font-weight-bold subtitle-2"
                    >Disponible</span
                  >
                  <v-btn v-else class="font-weight-bold text-capitalize subtitle-2" text small color="red" :to="`/citas/detalle-cita/${item.fleb5.order_id}`"
                    >Reservado</v-btn
                  >
                </div>
              </td>
            </template>
            <p class="primary--text font-weight-bold pt-2 mb-1"><v-icon color="primary" class="pr-1">mdi-clock-outline</v-icon> {{item.fleb5.customer?item.fleb5.customer.name:'Sin datos del cliente'}}</p>
            <p class="secondary--text mb-1">{{item.fleb5.address?`${item.fleb5.address.street} ${item.fleb5.address.num_ext}`:'Sin datos de dirección'}}</p>
            <p v-if="item.fleb1.address" class="secondary--text mb-1">{{item.fleb5.address?`Col. ${item.fleb5.address.neighborhood}, ${item.fleb5.address.city}, ${item.fleb5.address.state}`:'Sin datos de dirección'}}</p>
          </v-tooltip>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    // Headers de tabla
    schedulesHeaders: {
      type: Array,
      required: true,
    },
    // Registros que se muestran en la tabla
    schedulesData: {
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