/**
 * Mutación para guardar los datos de la lista de estudios.
 * @param {State} state Estado del módulo actual.
 * @param {Object} servicesData Datos de la lista de estudios.
 */
export function setServicesData(state, servicesData) {
  state.servicesData = servicesData;
}

/**
 * Mutación para limpiar los datos de la lista de estudios una vez que el usuario abandona la sección de estudios.
 * @param {State} state Estado del módulo actual.
 */
export function clearServicesData(state) {
  state.servicesData = [];
}
