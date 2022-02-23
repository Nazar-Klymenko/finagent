export const insurancePeriodOptions = [
  "30",
  "60",
  "90",
  "120",
  "150",
  "180",
  "210",
  "240",
  "270",
  "300",
  "330",
  "360",
];
export const seatNumberOptions = ["2", "5", "6+"];

export const vehicleTypeOptions = (t) => {
  return [
    t("insuranceTransport.SelectVehicle.motorcycle"),
    t("insuranceTransport.SelectVehicle.personal"),
    t("insuranceTransport.SelectVehicle.truck"),
    t("insuranceTransport.SelectVehicle.bus"),
  ];
};
