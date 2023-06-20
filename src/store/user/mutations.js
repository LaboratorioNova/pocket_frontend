// Creo que no se usa, pero por si las dudas dejarlo en espera.
/*export function setUser(state, user) {
  state.user = user;
}*/

/**
 * Mutación para guardar los datos de la lista de usuarios.
 * @param {State} state Estado del módulo actual.
 * @param {Object} usersData Datos de la lista de usuarios.
 */
export function setUsersData(state, usersData) {
  state.usersData = usersData;
}

/**
 * Mutación para limpiar los datos de la lista de usuarios una vez que el usuario abandona la sección de usuarios.
 * @param {State} state Estado del módulo actual.
 */
export function clearUsersData(state) {
  state.usersData = [];
}
