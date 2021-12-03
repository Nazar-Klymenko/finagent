export const pageOneValues = (appDataValid) => ({
  oc: appDataValid.oc,
  ac: appDataValid.ac,
  greenCard: appDataValid.greenCard,
  assistance: appDataValid.assistance,
  name: appDataValid.name,
  surname: appDataValid.surname,
  phoneNumber: appDataValid.phoneNumber,
  postIndex: appDataValid.postIndex,
  city: appDataValid.city,
  voivodeship: appDataValid.voivodeship,
  street: appDataValid.street,
  houseNumber: appDataValid.houseNumber,
  documentAddedType: appDataValid.documentAddedType || "pesel",
  documentAdded: appDataValid.documentAdded,
  isAppropLicence: appDataValid.isAppropLicence || true,
  drivingLicenceDate: appDataValid.drivingLicenceDate,
  profession: appDataValid.profession || "",
  maritalStatus: appDataValid.maritalStatus || "",
});

export const pageTwoValues = (appDataValid) => ({
  registeredPoland: appDataValid.registeredPoland,
  brand: appDataValid.brand,
  model: appDataValid.model,
  version: appDataValid.version,
  regNumber: appDataValid.regNumber,
  vinNumber: appDataValid.vinNumber,
  yearManufacture: appDataValid.yearManufacture,
});

export const pageThreeValues = (appDataValid) => ({
  vehicleType: appDataValid.vehicleType,
  enginePower: appDataValid.enginePower,
  engineVolume: appDataValid.engineVolume,
  fuelType: appDataValid.fuelType,
  originCountry: appDataValid.originCountry,
  purchaseYear: appDataValid.purchaseYear,
  kilometrage: appDataValid.kilometrage,
  steeringWheel: appDataValid.steeringWheel || "left",
  gasInstalation: appDataValid.gasInstalation,
  transmissionType: appDataValid.transmissionType || "mechanical",
  abroadImport: appDataValid.abroadImport,
  polandRegDate: appDataValid.polandRegDate,
});
export const pageFourValues = (appDataValid) => ({
  predictMileage: appDataValid.enginePower,
  useAbroad: appDataValid.engineVolume,
  usePurpose: appDataValid.fuelType,
  parkingPlace: appDataValid.originCountry,
  security: appDataValid.purchaseYear,
});

export const pageFiveValues = (appDataValid) => ({
  filesTechPassport: appDataValid.filesTechPassport,
  filesPassport: appDataValid.filesPassport,
  isFirstOwner: appDataValid.isFirstOwner || true,
  filesCarSale: appDataValid.filesCarSale,
  filesInsurance: appDataValid.filesInsurance,
});
