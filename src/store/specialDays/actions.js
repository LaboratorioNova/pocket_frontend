import Vue from 'vue';
import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtner la lista de días festivos
 */
export const fetchHolidays = async ({ commit }) => {
  let config = {
    method: "GET",
    url: `${Endpoint.specialDays}?day_type=Holiday`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setHolidays", response.data);
  }
  return response;
}

/**
 * Función para obtner la lista de días festivos
 */
 export const fetchNoWorkdays = async ({ commit }) => {
  let config = {
    method: "GET",
    url: `${Endpoint.specialDays}?day_type=NoWorkday`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setNoWorkdays", response.data);
  }
  return response;
}

/**
 * Función para crear un día especial.
 * @param {Object} specialDateData Información del día que se va a crear.
 * @returns
 */
 export const createSpecialDate = async ({ commit }, specialDateData) => {
  const formData = new FormData();
  const [year, month, day] = specialDateData.date.split('-');
  formData.append("date", `${day}-${month}`);
  formData.append("day_type", specialDateData.dayType);

  let config = {
    method: "POST",
    url: Endpoint.createSpecialDays,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para editar un día especial.
 * @param {Object} specialDateData Información del día que se va a editar.
 * @returns
 */
 export const updateSpecialDate = async ({ commit }, specialDateData) => {
  const formData = new FormData();
  const [year, month, day] = specialDateData.date.split('-');
  formData.append("date", `${day}-${month}`);

  let config = {
    method: "POST",
    url: `${Endpoint.specialDays}/${specialDateData.id}`,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para eliminar un día especial.
 * @param {Object} specialDateId Id del día que se va a eliminar.
 * @returns
 */
 export const deleteSpecialDate = async ({ commit }, specialDateId) => {
  
  let config = {
    method: "DELETE",
    url: `${Endpoint.specialDays}/${specialDateId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};
