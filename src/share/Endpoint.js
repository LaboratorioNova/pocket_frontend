export class Endpoint {
  // Auth
  //static signIn = "/auth/sign-in";
  static signIn = "/auth/sign-in-admin";
  static emailCode = "/auth/email-code";
  static passwordReset = "/auth/password-reset";

  // User
  static users = "/users";
  static createUser = "/users/create";

  // Address
  static address = "/addresses";

  // Services
  static services = "/services";
  static createService = "/services/create";
  static checkServices = "/services/check";

  // Zones
  static zones = "/zones";

  // Schedule Config
  static scheduleConfigs = "/schedule-configs";
  static currentZonesScheduleConfig = "/schedule-configs/fetch-current-zones";
  //static phlebotomistSchedule = "/schedule-configs/schedule";
  static scheduleDay = "/schedule-configs/schedule";
  static phlebotomistSchedule = "/schedule-configs/phlebotomist-schedule";
  static updateSchedule = "/schedule-configs/update";
  static updatePhlebotomists = "/schedule-configs/update-phlebotomists";
  static updateDistribution = "/schedule-configs/update-distribution";
  static scheduleOrders = "/schedule-configs/orders";

  // Special Days
  static specialDays = "/special-days";
  static createSpecialDays = "/special-days/create";

  // Orders
  static orders = "/orders";
  static createOrder = "/orders/create";
  static updateOrder = "/orders/update";
  static ordersCanceled = "/orders/canceled";

  // Patients
  static patients = "/patients";
  static createPatients = "/patients/create";

  // Reports
  static report = "/orders/report";
  static reportCsv = "/orders/report-csv";
}
