/**
 * Mutación para guardar los datos de usuario después de loggearse.
 * @param {State} state Estado del módulo actual.
 * @param {Object} user Datos del usuario que se acaba de loggear.
 */
export function setUser(state, user) {
  state.user = user;
  state.loggedIn = true;
}

/**
 * Función para cerrar la sesión, eliminar los datos del estado y borrar los datos del Local storage.
 * @param {State} state El estado del módulo actual.
 */
export function logout(state) {
  state.user = {};
  state.loggedIn = false;
  localStorage.removeItem("USER_TOKEN");
}
