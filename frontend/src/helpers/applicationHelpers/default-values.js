export const pageOneValues = (appDataValid) => ({
  oc: appDataValid?.oc || false,
  ac: appDataValid?.ac || false,
  greenCard: appDataValid?.greenCard || false,
  assistance: appDataValid?.assistance || false,
  name: appDataValid?.name || "",
  surname: appDataValid?.surname || "",
  phoneNumber: appDataValid?.phoneNumber || "",
  postIndex: appDataValid?.postIndex || "",
  city: appDataValid?.city || "",
  voivodeship: appDataValid?.voivodeship || "",
  street: appDataValid?.street || "",
  houseNumber: appDataValid?.houseNumber || "",
  documentAddedType: appDataValid?.documentAddedType || "pesel",
  documentAdded: appDataValid?.documentAdded || "",
  isAppropLicence: appDataValid?.isAppropLicence || true,
  drivingLicenceDate: appDataValid?.drivingLicenceDate || undefined,
  profession: appDataValid?.profession || "",
  maritalStatus: appDataValid?.maritalStatus || "",
});

export const pageTwoValues = (appDataValid) => ({
  registeredPoland: appDataValid?.registeredPoland || false,
  brand: appDataValid?.brand || "",
  model: appDataValid?.model || "",
  version: appDataValid?.version || "",
  regNumber: appDataValid?.regNumber || "",
  vinNumber: appDataValid?.vinNumber || "",
  yearManufacture: appDataValid?.yearManufacture || undefined,
});

export const pageThreeValues = (appDataValid) => ({
  vehicleType: appDataValid?.vehicleType || "",
  enginePower: appDataValid?.enginePower || "",
  engineVolume: appDataValid?.engineVolume || "",
  fuelType: appDataValid?.fuelType || "",
  originCountry: appDataValid?.originCountry || "",
  purchaseYear: appDataValid?.purchaseYear || undefined,
  kilometrage: appDataValid?.kilometrage || "",
  steeringWheel: appDataValid?.steeringWheel || "left",
  gasInstalation: appDataValid?.gasInstalation || "",
  transmissionType: appDataValid?.transmissionType || "mechanical",
  abroadImport: appDataValid?.abroadImport || false,
  polandRegDate: appDataValid?.polandRegDate || undefined,
  techExamDate: appDataValid?.techExamDate || undefined,
});
export const pageFourValues = (appDataValid) => ({
  predictMileage: appDataValid?.enginePower || "",
  useAbroad: appDataValid?.engineVolume || "",
  usePurpose: appDataValid?.fuelType || "",
  parkingPlace: appDataValid?.originCountry || "",
  security: appDataValid?.purchaseYear || "",
});

export const pageFiveValues = (appDataValid) => ({
  filesTechPassport: appDataValid?.filesTechPassport || undefined,
  filesPassport: appDataValid?.filesPassport || undefined,
  isFirstOwner: appDataValid?.isFirstOwner || true,
  filesCarSale: appDataValid?.filesCarSale || undefined,
  filesInsurance: appDataValid?.filesInsurance || undefined,
});
