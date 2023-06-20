/**
 * General validation for an input
 * @param    {Object}   rules
 *
 * Default:
 * @attribute required: true
 * @attribute name
 *
 * Acepta los siguientes parámetros:
 * @attribute    {String}    [name]         Especifica el nombre del campo.
 * @attribute    {Boolean}   required       Específica si el campo es requerido.
 * @attribute    {Number}    minLength      Específica la cantidad mínimina de caracteres.
 * @attribute    {Number}    maxLength      Específica la cantidad máxima de caracteres.
 *
 * @return   {Array<Fn>}             Arreglo con las reglas.
 */

 export const validations = {
  // Validación para cualquier campo requerido (MASCULINO).
  requiredMValidation(name = "campo") {
    return [(v) => !!v || `El ${name} es obligatorio.`];
  },
  // Validación para cualquier campo requerido (FEMENINO).
  requiredFValidation(name = "información") {
    return [(v) => !!v || `La ${name} es obligatoria.`];
  },
  // Validación de un campo con varios elementos.
  comboValidation(name = "campos") {
    return [(v) => v.length > 0 || `Los ${name} son obligatorios.`];
  },
  // Validación general, funciona para validar casi cualquier campo (MASCULINO).
  generalMValidation(rules = { name: "campo", required: true }) {
    if (!rules.name) rules.name = "campo";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);

    if (rules.minLength && rules.minLength != 0 && rules.required)
      validations.push(
        (v) =>
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );
    else if (rules.minLength && rules.minLength != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );

    if (rules.maxLength)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length <= rules.maxLength ||
          `El ${rules.name} debe tener como máximo ${rules.maxLength} caracteres.`
      );

    //validations.push(v => !v || /^[^"]*$/.test(v) || `El ${rules.name} no puede incluir el siguiente simbolo " .`)
    return validations;
  },
  // Validación general funciona para validar casi cualquier campo (FEMENINO).
  generalFValidation(rules = { name: "información", required: true }) {
    if (!rules.name) rules.name = "información";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `La ${rules.name} es obligatoria.`);

    if (rules.minLength && rules.minLength != 0 && rules.required)
      validations.push(
        (v) =>
          v.length >= rules.minLength ||
          `La ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );
    else if (rules.minLength && rules.minLength != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length >= rules.minLength ||
          `La ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );

    if (rules.maxLength)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length <= rules.maxLength ||
          `La ${rules.name} debe tener como máximo ${rules.maxLength} caracteres.`
      );

    return validations;
  },
  // Validación general, funciona para validar casi cualquier campo en plural (MASCULINO).
  generalPluralMValidation(rules = { name: "campo", required: true }) {
    if (!rules.name) rules.name = "campo";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `Los ${rules.name} son obligatorios.`);

    validations.push(
      (v) =>
        !v ||
        /^[^"]*$/.test(v) ||
        `El ${rules.name} no puede incluir el siguiente simbolo " .`
    );
    return validations;
  },
  // Validación para el nombre de una persona.
  nameValidation(rules = { name: "nombre", required: true, minLength: 2 }) {
    if (!rules.name) rules.name = "nombre";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);

    if (rules.minLength && rules.minLength != 0 && rules.required)
      validations.push(
        (v) =>
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );
    else if (rules.minLength && rules.minLength != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );

    if (rules.maxLength)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length <= rules.maxLength ||
          `El ${rules.name} debe tener como máximo ${rules.maxLength} caracteres.`
      );

    validations.push(
      (v) =>
        !v ||
        /^[a-zA-ZÁÉÍÓÚÑáéíóúñ. ]*$/.test(v) ||
        `El ${rules.name} no debe incluir números ni símbolos.`
    );

    return validations;
  },
  // Validación del email.
  emailValidation(rules = { name: "email", required: true, maxLength: 50 }) {
    if (!rules.name) rules.name = "email";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);

    if (rules.minLength && rules.minLength != 0 && rules.required)
      validations.push(
        (v) =>
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );
    else if (rules.minLength && rules.minLength != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );

    if (rules.maxLength)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length <= rules.maxLength ||
          `El ${rules.name} debe tener como máximo ${rules.maxLength} caracteres.`
      );

    validations.push(
      (v) =>
        !v ||
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
        `Debe introducir un ${rules.name} válido.`
    );

    return validations;
  },
  // Validación del teléfono.
  phoneValidation(rules = { name: "teléfono", required: false }) {
    if (!rules.name) rules.name = "teléfono";
    let validations = [];

    if (rules.required) {
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);
      validations.push(
        (v) =>
          String(v).length > 9 ||
          `El ${rules.name} debe tener por lo menos 10 dígitos.`
      );
      validations.push(
        (v) =>
          String(v).length < 11 ||
          `El ${rules.name} debe tener máximo 10 dígitos.`
      );
    } else
      validations.push(
        (v) =>
          String(v).length === 0 ||
          String(v).length > 9 ||
          `El ${rules.name} debe tener por lo menos 10 dígitos.`
      );
    validations.push(
      (v) =>
        String(v).length < 11 ||
        `El ${rules.name} debe tener máximo 10 dígitos.`
    );
    return validations;
  },
  // Validación para un campo numérico (MASCULINO).
  numberMValidation(rules = { name: "campo", required: true }) {
    if (!rules.name) rules.name = "campo";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);

    if (rules.min && rules.required)
      validations.push(
        (v) => Number(v) >= rules.min || `El valor mínimo es ${rules.min}.`
      );
    else if (rules.min && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          Number(v) >= rules.min ||
          `El valor mínimo es ${rules.min}.`
      );

    if (rules.max)
      validations.push(
        (v) =>
          v.length === 0 ||
          Number(v) <= rules.max ||
          `El valor máximo es ${rules.max}.`
      );

    return validations;
  },
  // Validación para un campo numérico (FEMENINO).
  numberFValidation(rules = { name: "cantidad", required: true }) {
    if (!rules.name) rules.name = "cantidad";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `La ${rules.name} es obligatoria.`);

    if (rules.min && rules.min != 0 && rules.required)
      validations.push(
        (v) => Number(v) >= rules.min || `El valor mínimo es ${rules.min}.`
      );
    else if (rules.min && rules.min != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          Number(v) >= rules.min ||
          `El valor mínimo es ${rules.min}.`
      );

    if (rules.max)
      validations.push(
        (v) =>
          v.length === 0 ||
          Number(v) <= rules.max ||
          `El valor máximo es ${rules.max}.`
      );

    return validations;
  },
  // Validación para el número interno y externo de una dirección.
  addressNumberValidation(rules = { name: "número", required: true}) {
    if (!rules.name) rules.name = "nombre";
    let validations = [];

    if (rules.required)
      validations.push((v) => !!v || `El ${rules.name} es obligatorio.`);

    if (rules.minLength && rules.minLength != 0 && rules.required)
      validations.push(
        (v) =>
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );
    else if (rules.minLength && rules.minLength != 0 && !rules.required)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length >= rules.minLength ||
          `El ${rules.name} debe tener al menos ${rules.minLength} caracteres.`
      );

    if (rules.maxLength)
      validations.push(
        (v) =>
          v.length === 0 ||
          v.length <= rules.maxLength ||
          `El ${rules.name} debe tener como máximo ${rules.maxLength} caracteres.`
      );

    validations.push(
      (v) =>
        !v ||
        /^[0-9a-zA-Z\- ]*$/.test(v) ||
        `El ${rules.name} contiene simbolos que no son válidos.`
    );

    return validations;
  },
};
