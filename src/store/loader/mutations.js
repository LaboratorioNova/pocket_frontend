/**
 * Mutación para iniciar el loader.
 * @param {State} state Estado del módulo actual.
 */
export function loading(state) {
  state.loaderVisible = true;
}

/**
 * Mutación para detener el loader.
 * @param {State} state Estado del módulo actual.
 */
export function loaded(state) {
  state.loaderVisible = false;
}
