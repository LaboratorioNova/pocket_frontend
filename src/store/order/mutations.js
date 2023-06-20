export const setAppointmentsData = (state, appointmentsData) => {
  state.appointmentsData = appointmentsData;
}

export const setCustomersData = (state, customersData) => {
  state.customersData = customersData;
}

export const clearCustomersData = (state) => {
  state.customersData = [];
}

export const setPatientsData = (state, patientsData) => {
  state.patientsData = patientsData;
}

export const clearPatientsData = (state) => {
  state.patientsData = [];
}