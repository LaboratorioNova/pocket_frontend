import Vue from "vue";
import { Endpoint } from "../../share/Endpoint";
import { GlobalRequest } from "../../services/GlobalRequest";

let globalRequest = new GlobalRequest();

/**
 * Función para iniciar sesión
 * @param {Object} userData Datos de usuario.
 * @returns
 */
export const login = async ({ commit }, userData) => {
  let config = {
    method: "POST",
    url: Endpoint.signIn,
    data: {
      email: userData.email,
      password: userData.password,
    },
  };
  let response = await globalRequest.request(config);

  if (response.status && response.status > 199 && response.status < 300) {
    //localStorage.setItem("USER_TOKEN", response.data.token);
    //commit("setUser", response.data);
    localStorage.setItem("USER_TOKEN", response.data.data.token);
    commit("setUser", response.data.data);
  }
  return response;
};

/**
 * Función para envíar un correo a la dirección del usuario que desea recuperar su contraseña
 * @param {String} email Email del usuario que desea recuperar su contraseña
 * @returns
 */
export const emailCode = async ({ commit }, email) => {
  let config = {
    method: "POST",
    url: Endpoint.emailCode,
    data: {
      email: email,
    },
  };
  let response = await globalRequest.request(config);
  return response;
};

/**
 * Función para actualizar la contraseña
 * @param {Object} userData Datos del usuario que va a recuperar la contraseña (token, email, contraseña y confirmación de la contraseña).
 * @returns
 */
export const passwordReset = async ({ commit }, userData) => {
  const formData = new FormData();
  formData.append("token", userData.token);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("password_confirmation", userData.confirmPassword);

  let config = {
    method: "POST",
    url: Endpoint.passwordReset,
    data: formData,
    activeLoader: true,
  };
  let response = await globalRequest.request(config);
  return response;
};
