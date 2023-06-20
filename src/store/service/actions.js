import Vue from "vue";
import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtener la lista de estudios.
 * @param {Object} serviceSearchData Infomación de estudios consutados.
 * @returns
 */
export const fetchServices = async ({ commit }, serviceSearchData) => {
  let availableOutside = "";
  if (serviceSearchData.availableOutside != 2) {
    availableOutside = `&available_outside=${serviceSearchData.availableOutside}`;
  }
  if (!serviceSearchData.search) {
    serviceSearchData.search = "";
  }
  let config = {
    method: "GET",
    url: `${Endpoint.services}?per_page=${serviceSearchData.perPage}&page=${serviceSearchData.numberPage}&search=${serviceSearchData.search}${availableOutside}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: serviceSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setServicesData", response.data.data);
  }
  return response;
};

/**
 * Función para crear un estudio.
 * @param {Object} serviceData Información del estudio que se va a crear.
 * @returns
 */
export const createService = async ({ commit }, serviceData) => {
  const formData = new FormData();
  formData.append("name", serviceData.name);
  formData.append("request", serviceData.request);
  formData.append("public_cost", serviceData.publicCost);
  formData.append("process_time", serviceData.processTime);
  formData.append("available_outside", serviceData.availableOutside);

  let config = {
    method: "POST",
    url: Endpoint.createService,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para editar un estudio.
 * @param {Object} serviceData Información del estudio que se va a editar.
 * @returns
 */
export const updateService = async ({ commit }, serviceData) => {
  const formData = new FormData();
  formData.append("name", serviceData.name);
  formData.append("request", serviceData.request);
  formData.append("public_cost", serviceData.publicCost);
  formData.append("process_time", serviceData.processTime);
  formData.append("available_outside", serviceData.availableOutside);

  let config = {
    method: "POST",
    url: `${Endpoint.services}/${serviceData.id}`,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para eliminar un estudio.
 * @param {Int} serviceId Identificador del estudio que se va a eliminar.
 * @returns
 */
export const deleteService = async ({ commit }, serviceId) => {
  let config = {
    method: "DELETE",
    url: `${Endpoint.services}/${serviceId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para cambiar el estatus de un estudio (Activar, Desactivar)
 * @param {Object} serviceData
 */
export const changeServiceStatus = async ( { commit }, serviceData) => {
  // true == 1
  // false == 0
  const formData = new FormData();
  formData.append("enable", serviceData.status);

  let config = {
    method: "POST",
    url: `${Endpoint.services}/${serviceData.id}`,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true,
  };

  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para obtener la lista de estudios seleccionados para los pacientes de una cita
 * @returns
 */
 export const fetchCheckServices = async ({ commit }, services) => {

  let config = {
    method: "GET",
    url: `${Endpoint.checkServices}?services=[${services}]`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);

  return response;
};