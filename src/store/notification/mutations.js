/**
 * Mutación que sirve para activar una notificación en la aplicación, dicha notificación sale en la parte superior derecha de la pantalla.
 * @param {State} state Estado del módulo actual.
 * @param {Object} config Objeto de configuración de notificación como colores, tiempo y texto.
 */
export function show(state, config) {
  state.text = config.text;
  state.color = config.color || "secondary";
  state.time = config.time || 3000;
  state.visible = true;
}

/**
 * Mutación que sirve para ocultar la notificación antes de que se acabe el tiempo de mostrarla.
 * (La notificación se quita sola, y esto depende de la cantidad de milisegundos que haya sido activada con la mutación "show")
 * @param {State} state Estado del módulo actual.
 */
export function hide(state) {
  state.visible = false;
}
