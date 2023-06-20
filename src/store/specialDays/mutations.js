/**
 * Mutación para guardar los días festivos
 * @param {State} state Estado del módulo actual
 * @param {*} holidays Lista de días festivos
 */
export function setHolidays(state, holidays) {
  state.holidays = holidays;
}

/**
 * Mutación para guardar los días que no se trabaja
 * @param {State} state Estado del módulo actual
 * @param {*} noWorkdays Lista de los días que no se trabajan
 */
export function setNoWorkdays(state, noWorkdays) {
  state.noWorkdays = noWorkdays;
}