import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtener la configuración de los próximos 14 días y mostrarlos en la tabla de configuración de rutas.
 */
export const fetchScheduleConfigs = async ({ commit }) => {
  let config = {
    method: "GET",
    url: Endpoint.scheduleConfigs,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setScheduleConfigs", response.data);
  }
  return response;
};

/**
 * Función para obtener la configuración de las rutas de algún día en específico.
 * @param {String} date Día que se va a consultar
 * @returns 
 */
 export const fetchCurrentZones = async ({ commit }, date) => {
  let config = {
    method: "GET",
    url: `${Endpoint.currentZonesScheduleConfig}?date=${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setCurrentZones", response.data);
  }
  return response;
};

/**
 * Función para obtener la lista de usuarios (Se usará solo para obtner los flebotomistas).
 * @param {Object} userSearchData Infomación de usuarios consutados.
 * @returns
 */
 export const fetchPhlebotomistUsers = async ({ commit }, userSearchData) => {
  let config = {
    method: "GET",
    url: `${Endpoint.users}?per_page=${userSearchData.perPage}&page=${userSearchData.numberPage}&role=2`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: userSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setPhlebotomistUsers", response.data.data);
  }
  return response;
};

//setPhlebotomistSchedule

/**
 * Función para obtener el horario de un día de un flebotomista o ruta
 * @param {String} phlebotomistScheduleId Id de la configuración del horario de una ruta
 * @returns 
 */
 export const fetchPhlebotomistSchedule = async ({ commit }, phlebotomistScheduleId) => {
  let config = {
    method: "GET",
    url: `${Endpoint.phlebotomistSchedule}?phlebotomist_schedule_id=${phlebotomistScheduleId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setPhlebotomistSchedule", response.data);
  }
  return response;
};

/**
 * Función para obtener el horario de un día de un flebotomista o ruta
 * @param {String} Date Fecha que se quiere consultar
 * @returns 
 */
 export const fetchScheduleDay = async ({ commit }, date) => {
  let config = {
    method: "GET",
    url: `${Endpoint.scheduleDay}?date=${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para actualizar los flebotomistas que están asignados a las rutas de un día 
 * @param {Object Array} scheduleData Información de la configuración de horarios de un día
 */
 export const updateSchedule = async ({ commit }, scheduleData) => {
  // Dar formato a los días y horas para que sean aceptados al querer modificar la configuración de un día
  let scheduleDataFormatted = {
    appointment_duration: scheduleData.appointmentDuration,
    start_date: `${scheduleData.date} ${scheduleData.startDate}:00`,
    end_date: `${scheduleData.date} ${scheduleData.endDate}:00`,
    quantity_zones: scheduleData.quantityZones,
    breakfast_schedule_id: scheduleData.breakfastScheduleId,
    breakfast_start_date: `${scheduleData.date} ${scheduleData.breakfastStartDate}:00`,
    breakfast_end_date: `${scheduleData.date} ${scheduleData.breakfastEndDate}:00`
  }
  let config = {
    method: "POST",
    url: `${Endpoint.updateSchedule}/${scheduleData.id}`,
    data: scheduleDataFormatted,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };
  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para actualizar los flebotomistas que están asignados a las rutas de un día 
 * @param {Object Array} phlebotomistData Arreglo de id de usuarios de flebotomistas y de la configuración que tienen asignada
 */
export const updatePhlebotomist = async ({ commit }, phlebotomistData) => {
  // Dar formato a los datos de los flebotomistas para que sean aceptador por el endpoint
  let formattedPhlebotomistData = phlebotomistData.map(phlebotomist => {
    return {
      phlebotomist_schedule_id: phlebotomist.phlebotomistScheduleId,
      user_id: phlebotomist.userId
    };
  });
  let data = {
    changes: formattedPhlebotomistData
  }
  let config = {
    method: "POST",
    url: Endpoint.updatePhlebotomists,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };
  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para actualizar la distribución de rutas
 * @param {Object Array} distributionData Arreglo de id de usuarios de flebotomistas y de la configuración que tienen asignada
 */
 export const updateDistribution = async ({ commit }, distributionData) => {
  // Dar formato a los datos de los flebotomistas para que sean aceptador por el endpoint
  let formattedPhlebotomists = distributionData.phlebotomists.map(phlebotomist => {
    return {
      user_id: phlebotomist.userId,
      zone_id: phlebotomist.zoneId
    };
  });
  
  let data = {
    date: distributionData.date,
    phlebotomists: formattedPhlebotomists
  }
  let config = {
    method: "POST",
    url: Endpoint.updateDistribution,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };
  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para obtener las citas de un día en específico (Sirve para comprobr si un día ya tiene citas asignadas)
 */
 export const fetchScheduleOrders = async ({ commit }, date) => {
  let config = {
    method: "GET",
    url: `${Endpoint.scheduleOrders}?date=${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};