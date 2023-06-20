import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

//---------------------------------CREO QUE ESTA FUNCIÓN NO SE USA "REVISARLA" SI NO SE USA QUITARLA -----------------------------
/**
 * Función para obtener la lista de citas dependiendo de los parámetros de búsqueda
 * @param {Object} appointmentsSearchData Objeto para buscar pacientes
 * @returns 
 */
export const fetchAppointmentsData = async ({ commit }, appointmentsSearchData) => {
  let client = appointmentsSearchData.customerInfoId?`&customer_info_id=${appointmentsSearchData.customerInfoId}`:"";
  let phlebotomist = appointmentsSearchData.phlebotomistId && appointmentsSearchData.phlebotomistId!= null?`&user_id=${appointmentsSearchData.phlebotomistId}`:"";
  let state = appointmentsSearchData.orderStateId && appointmentsSearchData.orderStateId!=null?`&order_state_id=${appointmentsSearchData.orderStateId}`:"";
  let date = appointmentsSearchData.from==""||appointmentsSearchData.to==""?"":`&from=${appointmentsSearchData.from}&to=${appointmentsSearchData.to}`;

  let config = {
    method: "GET",
    url: `${Endpoint.orders}?per_page=${appointmentsSearchData.perPage}&page=${appointmentsSearchData.numberPage}${client}${phlebotomist}${state}${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: appointmentsSearchData.activeLoader
  };
  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setAppointmentsData", response.data.data);
  }
  return response;
}

//---------------------------------CREO QUE ESTA FUNCIÓN NO SE USA "REVISARLA" SI NO SE USA QUITARLA -----------------------------
/**
 * Función para descargar el reporte de citas
 * @param {Object} appointmentsSearchData Parámetros de búsqueda para descargar el reporte de citas
 * @returns 
 */
 export const getAppointmentsReport = async ({ commit }, appointmentsSearchData) => {

  let client = appointmentsSearchData.customerInfoId?`&customer_info_id=${appointmentsSearchData.customerInfoId}`:"";
  let phlebotomist = appointmentsSearchData.phlebotomistId && appointmentsSearchData.phlebotomistId!= null?`&user_id=${appointmentsSearchData.phlebotomistId}`:"";
  let state = appointmentsSearchData.orderStateId && appointmentsSearchData.orderStateId!=null?`&order_state_id=${appointmentsSearchData.orderStateId}`:"";
  let date = appointmentsSearchData.from==""||appointmentsSearchData.to==""?"":`&from=${appointmentsSearchData.from}&to=${appointmentsSearchData.to}`;

  let config = {
    method: "GET",
    url: `${Endpoint.reportCsv}?per_page=${appointmentsSearchData.perPage}&page=${appointmentsSearchData.numberPage}${client}${phlebotomist}${state}${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: appointmentsSearchData.activeLoader
  };
  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    var link = window.document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(response.data)
    );
    link.setAttribute("download", "Reporte NOVA.csv");
    link.click();
  }

  return response;
}

/**
 * Función para obtener el detalle de una cita
 * @param {Integer} appointmentId Id de cita
 * @returns 
 */
export const fetchAppointmentData = async ({ commit }, appointmentId) => {

  let config = {
    method: "GET",
    url: `${Endpoint.orders}/${appointmentId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false
  };
  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para obtener la lista de clientes.
 * @param {Object} customerSearchData Infomación de clientes consutados.
 * @returns
 */
 export const fetchCustomersData = async ({ commit }, customerSearchData) => {
  let search = customerSearchData.search && customerSearchData.search != ""? `&search=${customerSearchData.search}`:"";

  const regex = / /i;
  search = search.replace(regex, "&");
  let config = {
    method: "GET",
    url: `${Endpoint.users}?per_page=${customerSearchData.perPage}&page=${customerSearchData.numberPage}&role=3${search}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: customerSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setCustomersData", response.data.data);
  }
  return response;
};

/**
 * Función para obtener las direcciones de un cliente
 * @returns
 */
 export const fetchCustomerAddresses = async ({ commit }, customerId) => {

  let config = {
    method: "GET",
    url: `${Endpoint.address}/${customerId}?per_page=3000&page=1`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);

  return response;
};

/**
 * Función para obtener la lista de flebotomistas.
 * @param {Object} phlebotomistSearchData Infomación de flebotomistas consultados.
 * @returns
 */
 export const fetchPhlebotomistsData = async ({ commit }, phlebotomistSearchData) => {
  
  let config = {
    method: "GET",
    url: `${Endpoint.users}?per_page=3000&page=1&role=2`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: phlebotomistSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);

  return response;
};

/**
 * Función para obtener la lista de pacientes de un cliente.
 * @param {Object} patientsSearchData Infomación de pacientes consutados.
 * @returns
 */
 export const fetchCustomerPatients = async ({ commit }, patientsSearchData) => {
  let search = patientsSearchData.search && patientsSearchData.search != ""? `&search=${patientsSearchData.search}`:"";

  const regex = / /i;
  search = search.replace(regex, "&");
  let config = {
    method: "GET",
    url: `${Endpoint.patients}?customer=${patientsSearchData.customerId}&per_page=3000&page=1${search}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: patientsSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setPatientsData", response.data.data);
  }
  return response;
};

/**
 * Función para crear un paciente.
 * @param {Object} patientData Información del paciente que se va a crear.
 * @returns
 */
export const createPatient = async ({ commit }, patientData) => {
  const formData = new FormData();
  formData.append("name", patientData.name);
  formData.append("last_name_father", patientData.lastNameFather);
  formData.append("last_name_mother", patientData.lastNameMother);
  formData.append("gender", patientData.gender);
  formData.append("birthdate", patientData.birthdate);
  formData.append("customer_info_id", patientData.customerInfoId);

  let config = {
    method: "POST",
    url: Endpoint.createPatients,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para editar un paciente.
 * @param {Object} patientData Información del paciente que se va a editar.
 * @returns
 */
 export const updatePatient = async ({ commit }, patientData) => {
  const formData = new FormData();
  formData.append("name", patientData.name);
  formData.append("last_name_father", patientData.lastNameFather);
  formData.append("last_name_mother", patientData.lastNameMother);
  formData.append("gender", patientData.gender);
  formData.append("birthdate", patientData.birthdate);
  formData.append("customer_info_id", patientData.customerInfoId);

  let config = {
    method: "POST",
    url: `${Endpoint.patients}/${patientData.id}`,
    data: formData,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
}

export const deletePatient = async ({ commit }, patientId) => {
  let config = {
    method: "DELETE",
    url: `${Endpoint.patients}/${patientId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para crear una cita
 * @param {Object} appointmentData 
 * @returns 
 */
export const createAppointment = async ({ commit }, appointmentData) => {
  // Dar formato al objeto de appointmentData para que sea aceptado por el endpointr de crear cita
  const formData = new FormData();
  formData.append("start_date", appointmentData.startDate);
  formData.append("end_date", appointmentData.endDate);
  formData.append("phlebotomist_schedule_id", appointmentData.phlebotomistScheduleId);
  formData.append("user_id", appointmentData.phlebotomistId);
  formData.append("customer_info_id", appointmentData.customerInfoId);
  formData.append("address_id", appointmentData.addressId);
  formData.append("patients", appointmentData.patients);
  formData.append("ignore_schedule", true);
  let data = {
    start_date: appointmentData.startDate,
    end_date: appointmentData.endDate,
    phlebotomist_schedule_id: appointmentData.phlebotomistScheduleId,
    user_id: appointmentData.phlebotomistId,
    customer_info_id: appointmentData.customerInfoId,
    address_id: appointmentData.addressId,
    patients: appointmentData.patients,
    ignore_schedule: true
  };
  let config = {
    method: "POST",
    url: Endpoint.createOrder,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
}

/**
 * Función para editar una cita
 * @param {Object} appointmentData 
 * @returns 
 */
 export const updateAppointment = async ({ commit }, appointmentData) => {
  // Dar formato al objeto de appointmentData para que sea aceptado por el endpointr de crear cita
  let data = {
    start_date: appointmentData.startDate,
    end_date: appointmentData.endDate,
    phlebotomist_schedule_id: appointmentData.phlebotomistScheduleId,
    user_id: appointmentData.phlebotomistId,
    customer_info_id: appointmentData.customerInfoId,
    address_id: appointmentData.addressId,
    patients: appointmentData.patients,
    ignore_schedule: true
  };
  let config = {
    method: "POST",
    url: `${Endpoint.updateOrder}/${appointmentData.id}`,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
  //return {status: 200, data: "ok"};
}

/**
 * Función para cancelar una cita
 * @param {Integer} appointmentId Id de la cita
 * @returns 
 */
export const cancelAppointment = async ({ commit }, appointmentId) => {
  let config = {
    method: "POST",
    url: `${Endpoint.ordersCanceled}/${appointmentId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: true
  };

  let response = await globalRequest.request(config);
  return response;
}