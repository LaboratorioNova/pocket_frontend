<!--Componente que guarda las gráficas que se muestran en el apartado de reportes-->
<template>
  <v-container>
    <v-tabs v-model="tab" background-color="lightCyan" class="px-sm-4">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab href="#salesPerDay">Ventas por día</v-tab>
      <v-tab href="#appointmentsPerDay">
        Citas por día
      </v-tab>
      <v-tab href="#patientsPerDay">
        Pacientes por día
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="lightCyan" >
      <v-tab-item value="salesPerDay">
        <v-row>
          <v-col v-if="Object.keys(chartData).length > 0" cols="12">
            <!--<p>Ventas por día</p>-->
            <line-chart :chartData="salesPerDayData"></line-chart>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="appointmentsPerDay">
        <v-row>
          <v-col v-if="Object.keys(chartData).length > 0" cols="12">
            <!--<p>Citas por día</p>-->
            <line-chart :chartData="appointmentsPerDayData"></line-chart>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="patientsPerDay">
        <v-row>
          <v-col v-if="Object.keys(chartData).length > 0" cols="12">
            <!--<p>Pacientes por día</p>-->
            <line-chart :chartData="patientsPerDayData"></line-chart>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import LineChart from './lineChart/LineChart';
import {mapState} from 'vuex'
export default {
  props: {
    chartData: {
      type: Object,
      default: null
    },
  },
  components: {
    LineChart
  },
  data() {
    return {
      tab: "salesPerDay",
      // Configuración de gráfica de ventas por día
      salesPerDayData: {
        labels: [],
        datasets: [
          {
            label: 'Ventas totales',
            backgroundColor: 'rgba(0, 108, 183, 0.2)',
            borderColor: '#006cb7',
            pointBackgroundColor: '#87C440',
            borderWidth: 3,
            pointBorderColor: '#87C440',
            pointRadius: 2,
            fill: false,
            tension: 0.1,
            data: []
          },
          {
            label: 'Ventas promedio',
            backgroundColor: 'rgba(152, 152, 152, 0.2)',
            borderColor: '#989898',
            hoverBorderColor: true,
            pointBackgroundColor: '#404040',
            borderWidth: 3,
            pointBorderColor: '#404040',
            pointRadius: 2,
            fill: true,
            tension: 0.1,
            borderDash: [30, 15],
            data: []
          }
        ]
      },
      // Configuración de gráfica de citas por día
      appointmentsPerDayData: {
        labels: [],
        datasets: [
          {
            label: 'Citas totales',
            backgroundColor: 'rgba(0, 108, 183, 0.2)',
            borderColor: '#006cb7',
            pointBackgroundColor: '#87C440',
            borderWidth: 3,
            pointBorderColor: '#87C440',
            pointRadius: 2,
            fill: false,
            tension: 0.1,
            data: []
          },
          {
            label: 'Citas promedio',
            backgroundColor: 'rgba(152, 152, 152, 0.2)',
            borderColor: '#989898',
            hoverBorderColor: true,
            pointBackgroundColor: '#404040',
            borderWidth: 3,
            pointBorderColor: '#404040',
            pointRadius: 2,
            fill: true,
            tension: 0.1,
            borderDash: [30, 15],
            data: []
          }
        ]
      },
      // Configuración de gráfica de pacientes por día
      patientsPerDayData: {
        labels: [],
        datasets: [
          {
            label: 'Pacientes totales',
            backgroundColor: 'rgba(0, 108, 183, 0.2)',
            borderColor: '#006cb7',
            pointBackgroundColor: '#87C440',
            borderWidth: 3,
            pointBorderColor: '#87C440',
            pointRadius: 2,
            fill: false,
            tension: 0.1,
            data: []
          },
          {
            label: 'Pacientes promedio',
            backgroundColor: 'rgba(152, 152, 152, 0.2)',
            borderColor: '#989898',
            hoverBorderColor: true,
            pointBackgroundColor: '#404040',
            borderWidth: 3,
            pointBorderColor: '#404040',
            pointRadius: 2,
            fill: true,
            tension: 0.1,
            borderDash: [30, 15],
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapState("report", ["reportData"]),
  },
  methods: {
    /**
     * Función para dar formato a datos de la gráfica de ventas por día
     */
    formatSalesPerDayData(reportData) {
      reportData.records.forEach(record => {
        this.salesPerDayData.labels.push(record.date);
        this.salesPerDayData.datasets[0].data.push(record.total_sale);
        this.salesPerDayData.datasets[1].data.push(reportData.total_sale_per_day.toFixed(2));
      });
    },
    /**
     * Función para dar formato a datos de la gráfica de citas por día
     */
    formatAppointmentsPerDayData(reportData) {
      reportData.records.forEach(record => {
        this.appointmentsPerDayData.labels.push(record.date);
        this.appointmentsPerDayData.datasets[0].data.push(record.appoinment_count);
        this.appointmentsPerDayData.datasets[1].data.push(reportData.appointments_per_day.toFixed(2));
      });
    },
    /**
     * Función para dar formato a datos de la gráfica de pacientes por día
     */
    formatPatientsPerDayData(reportData) {
      reportData.records.forEach(record => {
        this.patientsPerDayData.labels.push(record.date);
        this.patientsPerDayData.datasets[0].data.push(record.patients_count);
        this.patientsPerDayData.datasets[1].data.push(reportData.patient_per_day_avg.toFixed(2));
      });
    }
  },
  /**
   * Función para preparar los datos de las tres gráficas que se muestran
   * 1.- Ventas por día
   * 2.- Citas por día
   * 3.- Pacientes por día
   */
  created() {
    this.formatSalesPerDayData(this.reportData);
    this.formatAppointmentsPerDayData(this.reportData);
    this.formatPatientsPerDayData(this.reportData);
  }
}
</script>