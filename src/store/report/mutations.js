/**
 * Mutación para guardar los datos de la tabla de reportes
 * @param {State} state  Estado del módulo actual.
 * @param {Array (Object)} reportData Lista de registros de la tabla de reportes
 */
export function setReportData(state, reportData) {
  state.reportData = reportData;
}

/**
 * Mutación para limpiar los datos de las gráficas y estadisticas que se muestran en la sección de reportes
 * @param {State} state Estado del módulo actual
 */
export function clearReportData(state) {
  state.reportData = {};
}

/**
 * Mutación para guardar las citas consulatadas en la sección de reportes
 * @param {State} state Estado del módulo actual
 * @param {*} appointmentsData Datos de las citas consulatadas
 */
export const setAppointmentsData = (state, appointmentsData) => {
  state.appointmentsData = appointmentsData;
}