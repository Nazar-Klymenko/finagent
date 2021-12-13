import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceCoverage: "InsuranceTransport.insuranceCoverage",
  name: "InsuranceTransport.name",
  surname: "InsuranceTransport.surname",
  phoneNumber: "InsuranceTransport.phoneNumber",
  postIndex: "InsuranceTransport.postIndex",
  city: "InsuranceTransport.city",
  voivodeship: "InsuranceTransport.voivodeship",
  street: "InsuranceTransport.street",
  houseNumber: "InsuranceTransport.houseNumber",
  documentAddedType: "InsuranceTransport.documentAddedType",
  documentAdded: "InsuranceTransport.documentAdded",
  profession: "InsuranceTransport.profession",
  maritalStatus: "InsuranceTransport.maritalStatus",
  isAppropLicence: "InsuranceTransport.isAppropLicence",
  drivingLicenceDate: "InsuranceTransport.drivingLicenceDate",

  vehicleType: "InsuranceTransport.vehicleType",
  brand: "InsuranceTransport.brand",
  model: "InsuranceTransport.model",
  version: "InsuranceTransport.version",
  regNumber: "InsuranceTransport.regNumber",
  vinNumber: "InsuranceTransport.vinNumber",
  yearManufacture: "InsuranceTransport.yearManufacture",
  registeredPoland: "InsuranceTransport.registeredPoland",

  enginePower: "InsuranceTransport.enginePower",
  engineVolume: "InsuranceTransport.engineVolume",
  fuelType: "InsuranceTransport.fuelType",
  vehicleRegDate: "InsuranceTransport.vehicleRegDate",
  techExamDate: "InsuranceTransport.techExamDate",
  purchaseYear: "InsuranceTransport.purchaseYear",
  kilometrage: "InsuranceTransport.kilometrage",
  steeringWheel: "InsuranceTransport.steeringWheel",
  transmissionType: "InsuranceTransport.transmissionType",
  gasInstalation: "InsuranceTransport.gasInstalation",
  abroadImport: "InsuranceTransport.abroadImport",
  polandRegDate: "InsuranceTransport.polandRegDate",

  predictMileage: "InsuranceTransport.predictMileage",
  useAbroad: "InsuranceTransport.useAbroad",
  usePurpose: "InsuranceTransport.usePurpose",
  parkingPlace: "InsuranceTransport.parkingPlace",
  security: "InsuranceTransport.security",
};

const addLabelsTransport = (array) => {
  let finalArray = [];
  array.forEach((item) => {
    let obj = Object.entries(item[1]);

    obj.forEach((prop) => {
      prop[0] = matchObj[prop[0]];
    });
    changeDateValues(obj);
    changeBooleanValues(obj);
    changeRadioValues(obj);

    let propObject = Object.fromEntries(obj);

    let labeledArray = [item[0], propObject];
    finalArray.push(labeledArray);
  });
  return finalArray;
};

export default addLabelsTransport;
