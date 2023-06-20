import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtener la lista de citas dependiendo de los parámetros de búsqueda
 * @param {Object} reportSearchData Objeto de filtros de búsqueda del reporte
 * @returns 
 */
 export const fetchReportData = async ({ commit }, reportSearchData) => {
  let client = reportSearchData.customerInfoId?`&customer_info_id=${reportSearchData.customerInfoId}`:"";
  let phlebotomist = reportSearchData.phlebotomistId && reportSearchData.phlebotomistId!= null?`&user_id=${reportSearchData.phlebotomistId}`:"";
  let date = reportSearchData.from==""||reportSearchData.to==""?"":`&from=${reportSearchData.from}&to=${reportSearchData.to}`;


  let config = {
    method: "GET",
    url: `${Endpoint.report}?per_page=${reportSearchData.perPage}&page=${reportSearchData.numberPage}${client}${phlebotomist}${date}&order_state_id=4`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: reportSearchData.activeLoader
  };
  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setReportData", response.data.data);
  }
  return response;
}

/**
 * Función para obtener la lista de citas dependiendo de los parámetros de búsqueda
 * @param {Object} appointmentsSearchData Objeto para buscar pacientes
 * @returns 
 */
 export const fetchAppointmentsData = async ({ commit }, appointmentsSearchData) => {
  let client = appointmentsSearchData.customerInfoId?`&customer_info_id=${appointmentsSearchData.customerInfoId}`:"";
  let phlebotomist = appointmentsSearchData.phlebotomistId && appointmentsSearchData.phlebotomistId!= null?`&user_id=${appointmentsSearchData.phlebotomistId}`:"";
  let date = appointmentsSearchData.from==""||appointmentsSearchData.to==""?"":`&from=${appointmentsSearchData.from}&to=${appointmentsSearchData.to}`;

  let config = {
    method: "GET",
    url: `${Endpoint.orders}?per_page=${appointmentsSearchData.perPage}&page=${appointmentsSearchData.numberPage}${client}${phlebotomist}${date}`,
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

/**
 * Función para descargar el reporte de citas
 * @param {Object} appointmentsSearchData Parámetros de búsqueda para descargar el reporte de citas
 * @returns 
 */
 export const getAppointmentsReport = async ({ commit }, appointmentsSearchData) => {

  let client = appointmentsSearchData.customerInfoId?`&customer_info_id=${appointmentsSearchData.customerInfoId}`:"";
  let phlebotomist = appointmentsSearchData.phlebotomistId && appointmentsSearchData.phlebotomistId!= null?`&user_id=${appointmentsSearchData.phlebotomistId}`:"";
  let date = appointmentsSearchData.from==""||appointmentsSearchData.to==""?"":`&from=${appointmentsSearchData.from}&to=${appointmentsSearchData.to}`;

  let config = {
    method: "GET",
    url: `${Endpoint.reportCsv}?${client}${phlebotomist}${date}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false
  };
  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    // Obtener fecha actual para ponerla en el nombre del reporte
    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // Get date & time in YYYY-MM-DD HH:MM:SS format
    //let fileName = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    let fileName = `Reporte NOVA ${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;

    var link = window.document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(response.data)
    );
    link.setAttribute("download", fileName);
    link.click();
  }

  return response;
}