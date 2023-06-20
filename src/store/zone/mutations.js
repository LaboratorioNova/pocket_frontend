/**
 * Mutación para guardar la lista de zonas.
 * @param {State} state Estado del módulo actual
 * @param {*} zones Lista de las zonas
 */
export function setZonesData(state, zones) {
  state.zones = zones;
}

/**
 * Mutación para guardar los datos de una zona consultada.
 * @param {State} state Estado del módulo actual
 * @param {*} zone Zona consultada
 */
 export function setZoneData(state, zone) {
  state.zone = zone;
}

/**
 * Mutación para guardar los datos de la lista de zonas que pertenezcan a la misma configuración.
 * @param {State} state Estado del módulo actual
 * @param {Array} zonesPerNumberConfiguration Lista de zonas por número de configuración
 */
 export function setZonesPerNumberConfigurationData(state, zonesPerNumberConfiguration) {
  state.zonesPerNumberConfiguration = zonesPerNumberConfiguration;
}

export function clearZonesPerNumberConfigurationData(state) {
  state.zonesPerNumberConfiguration = [];
}