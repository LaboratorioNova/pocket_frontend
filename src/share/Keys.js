export class Keys {
  // Claves para tipos de usuarios
  static UserAdminId = 1;
  static UserPhlebotomists = 2;
  static UserCustomerId = 3;

  static userTypes = [
    { text: "Admin", value: Keys.UserAdminId },
    { text: "Flebotomista", value: Keys.UserPhlebotomists },
    { text: "Cliente", value: Keys.UserCustomerId },
  ];

  // Claves para estatus de ordenes
  static orderCreatedId = 1;
  static orderApprovedId = 2;
  static orderActiveId = 3;
  static orderCanceledId = 4;
  static orderCompleteId = 5;

  static orderStatus = [
    { text: "Creado", value: Keys.orderCreatedId },
    { text: "Aprobado", value: Keys.orderApprovedId },
    { text: "Activo", value: Keys.orderActiveId },
    { text: "Cancelado", value: Keys.orderCanceledId },
    { text: "Completado", value: Keys.orderCompleteId },
  ]
}
