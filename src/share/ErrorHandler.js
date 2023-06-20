export class ErrorHandler {
  formatError = (error) => {
    let message = "";
    if (error == 503) {
      message =
        "El servicio no está disponible en este momento, intenta de nuevo más tarde";
    } else if (error >= 500) {
      message = "Error interno del servidor, intenta de nuevo más tarde";
    } else if (error == 403) {
      message = "No tienes suficientes permisos para realizar esta acción";
    } else if (error >= 400) {
      message = "Tu petición no cumple los requisitos para poder ser aceptada";
    } else {
      message = "Error desconocido";
    }
    return message;
  };
}
