import Vue from "vue";
import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para obtener la lista de usuarios.
 * @param {Object} userSearchData Infomación de usuarios consutados.
 * @returns
 */
export const fetchUsers = async ({ commit }, userSearchData) => {
  let role = userSearchData.role && userSearchData.role != ""? `&role=${userSearchData.role}`:"";
  let search = userSearchData.search && userSearchData.search != ""? `&search=${userSearchData.search}`:"";

  const regex = / /i;
  search = search.replace(regex, "&");
  let config = {
    method: "GET",
    url: `${Endpoint.users}?per_page=${userSearchData.perPage}&page=${userSearchData.numberPage}${role}${search}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: userSearchData.activeLoader,
  };

  let response = await globalRequest.request(config);
  if (response.status && response.status > 199 && response.status < 300) {
    commit("setUsersData", response.data.data);
  }
  return response;
};

/**
 * Función para consultar los datos de un usuario (Se usa cuando se crea, actualiza o elimina una dirección)
 * @param {Int} userId Identificador del usuario que se va a buscar
 * @returns
 */
export const fetchUser = async ({ commit }, userId) => {
  let config = {
    method: "GET",
    url: `${Endpoint.users}/${userId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
  };
  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para crear un usuario.
 * @param {Object} userData Información del usuario que se va a crear.
 * @returns
 */
export const createUser = async ({ commit }, userData) => {
  const formData = new FormData();
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("name", userData.name);
  formData.append("last_name_father", userData.lastNameFather);
  formData.append("last_name_mother", userData.lastNameMother);
  formData.append("phone_number", userData.phone);
  formData.append("role_id", userData.role);
  
  if (userData.role == 3) {
    formData.append("birthdate", userData.birthdate);
    formData.append("gender", userData.gender);
    formData.append("primary_key", userData.primaryKey);
  }

  let config = {
    method: "POST",
    url: Endpoint.createUser,
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
 * Función para editar un usuario.
 * @param {Object} userData Información del usuario que se va a editar.
 * @returns
 */
export const updateUser = async ({ commit }, userData) => {
  const formData = new FormData();
  formData.append("email", userData.email);
  if (userData.password != "") {
    formData.append("password", userData.password);
  }
  formData.append("name", userData.name);
  formData.append("last_name_father", userData.lastNameFather);
  formData.append("last_name_mother", userData.lastNameMother);
  formData.append("phone_number", userData.phone);
  formData.append("role_id", userData.role);
  
  if (userData.role == 3) {
    formData.append("birthdate", userData.birthdate);
    formData.append("gender", userData.gender);
    formData.append("primary_key", userData.primaryKey);
  }

  let config = {
    method: "POST",
    url: `${Endpoint.users}/${userData.id}`,
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
 * Función para eliminar un usuario.
 * @param {Int} userId Identificador del usuario que se va a eliminar.
 * @returns
 */
export const deleteUser = async ({ commit }, userId) => {
  let config = {
    method: "DELETE",
    url: `${Endpoint.users}/${userId}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para crear una dirección.
 * @param {Object} addressData Información de la dirección que se va a crear.
 * @returns
 */
export const createAddress = async ({ commit }, addressData) => {
  const formData = new FormData();
  formData.append("street", addressData.street);
  formData.append("neighborhood", addressData.neighborhood);
  formData.append("num_ext", addressData.numExt);
  if (
    addressData.numInt &&
    addressData.numInt != "" &&
    addressData.numInt != null
  ) {
    formData.append("num_int", addressData.numInt);
  }
  formData.append("state", addressData.state);
  formData.append("city", addressData.city);
  formData.append("zip_code", addressData.zipCode);
  formData.append("references", addressData.references);
  formData.append("latitude", addressData.latitude);
  formData.append("longitude", addressData.longitude);
  formData.append("zone_id", addressData.zone_id);

  let config = {
    method: "POST",
    url: `${Endpoint.address}/${addressData.customerId}/create`,
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
 * Función para editar una dirección.
 * @param {Object} addressData Información de la dirección que se va a editar.
 * @returns
 */
export const updateAddress = async ({ commit }, addressData) => {
  const formData = new FormData();
  formData.append("street", addressData.street);
  formData.append("neighborhood", addressData.neighborhood);
  formData.append("num_ext", addressData.numExt);
  if (
    addressData.numInt &&
    addressData.numInt != "" &&
    addressData.numInt != null
  ) {
    formData.append("num_int", addressData.numInt);
  }
  formData.append("state", addressData.state);
  formData.append("city", addressData.city);
  formData.append("zip_code", addressData.zipCode);
  formData.append("references", addressData.references);
  formData.append("latitude", addressData.latitude);
  formData.append("longitude", addressData.longitude);
  formData.append("zone_id", addressData.zone_id);

  let config = {
    method: "POST",
    url: `${Endpoint.address}/${addressData.customerId}/${addressData.id}`,
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
 * Función para eliminar una dirección.
 * @param {Object} addressData Identificador de la dirección que se va a eliminar y también el identificador del cliente.
 * @returns
 */
export const deleteAddress = async ({ commit }, addressData) => {
  let config = {
    method: "DELETE",
    url: `${Endpoint.address}/${addressData.customerId}/${addressData.id}`,
    headers: {
      Authorization: "Bearer " + localStorage.USER_TOKEN,
    },
    activeLoader: false,
  };

  let response = await globalRequest.request(config);
  return response;
};
