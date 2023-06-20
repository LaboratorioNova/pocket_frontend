import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtener la lista de zonas.
 */
export const fetchZones = async ( { commit } ) => {
  let config = {
    method: "GET",
    url: `${Endpoint.zones}?page=1&per_page=12`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false
  };

  let response = await globalRequest.request(config);
  
  if (response.status && response.status > 199 && response.status < 300) {
    response.data.data.forEach(zone => {
      let polygon = zone.polygon.map(coord => {
        return [
          parseFloat(coord.lat),
          parseFloat(coord.lon)
        ]
      });
      zone.polygon = polygon;
    });
    commit("setZonesData", response.data.data);
  }
  return response;
}

/**
 * Función para consultar una zona
 * @param {Int} zoneId Identificador de la zona que se va a buscar
 * @returns
 */
 export const fetchZone = async ({ commit }, zoneId) => {
  let config = {
    method: "GET",
    url: `${Endpoint.zones}/${zoneId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
  };
  let response = await globalRequest.request(config);

  if (response.status && response.status > 199 && response.status < 300) {
    let polygon = response.data.data.polygon.map(coord => {
      return [
        parseFloat(coord.lat),
        parseFloat(coord.lon)
      ]
    });
    response.data.data.polygon = polygon;
    commit("setZoneData", response.data.data);
  }
  return response;
};

/**
 * Función para obtener zonas por número de rutas
 * @param {Int} phlebotomistNumberConfiguration Número de configuraciónd e rutas
 * @returns Rutas que coincidan con el número de configuración de rutas
 */
export const fetchZonesPerNumberConfiguration = async ( { commit }, phlebotomistNumberConfiguration ) => {
  let config = {
    method: "GET",
    url: `${Endpoint.zones}?phlebotomist_number_configuration=${phlebotomistNumberConfiguration}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false
  };

  let response = await globalRequest.request(config);
  
  if (response.status && response.status > 199 && response.status < 300) {
    response.data.data.forEach(zone => {
      let polygon = zone.polygon.map(coord => {
        return {
          lat: parseFloat(coord.lat),
          lng: parseFloat(coord.lon)
        };
      });
      zone.polygon = polygon;
    });
    commit("setZonesPerNumberConfigurationData", response.data.data);
  }
  return response;
}