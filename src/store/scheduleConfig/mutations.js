/**
 * Mutación para guardar los datos de la configuración de los próximos 14 días y mostrarlos en la tabla.
 *  de configuración de citas.
 * @param {State} state  Estado del módulo actual.
 * @param {Array (Object)} scheduleConfigs Configuración de los próximos 14 días
 */
export function setScheduleConfigs(state, scheduleConfigs) {
  state.scheduleConfigs = scheduleConfigs;
}

/**
 * Mutación para guardar las zonas de la configuración de las rutas de un día seleccionado.
 * @param {State} state Estado del módulo actual.
 * @param {Array (Object)} currentZones Rutas de un día seleccionado.
 */
export function setCurrentZones(state, currentZones) {
  state.currentZones = currentZones;
}

/**
 * Mutación para guardar los usuarios flebotomistas.
 * @param {State} state Estado del módulo actual.
 * @param {*} phlebotomistUsers Usuarios de tipo flebotomista
 */
 export function setPhlebotomistUsers(state, phlebotomistUsers) {
  state.phlebotomistUsers = phlebotomistUsers;
}

/**
 * Mutación para guardar la disponibilidad del horario de un flebotomista.
 * @param {State} state Estado del módulo actual.
 * @param {Array (Object)} phlebotomistSchedule Horario de un flebotomista.
 */
export function setPhlebotomistSchedule(state, phlebotomistSchedule) {
  state.phlebotomistSchedule = phlebotomistSchedule;
}

export function clearCurrentZones(state) {
  state.currentZones = [];
}