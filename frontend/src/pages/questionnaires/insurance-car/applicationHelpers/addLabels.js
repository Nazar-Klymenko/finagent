import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  oc: "InsuranceTransport.Page1.oc",
  ac: "InsuranceTransport.Page1.ac",
  greenCard: "InsuranceTransport.Page1.greenCard",
  assistance: "InsuranceTransport.Page1.assistance",
  name: "InsuranceTransport.Page1.name",
  surname: "InsuranceTransport.Page1.surname",
  phoneNumber: "InsuranceTransport.Page1.phoneNumber",
  postIndex: "InsuranceTransport.Page1.postIndex",
  city: "InsuranceTransport.Page1.city",
  voivodeship: "InsuranceTransport.Page1.voivodeship",
  street: "InsuranceTransport.Page1.street",
  houseNumber: "InsuranceTransport.Page1.houseNumber",
  documentAddedType: "InsuranceTransport.Page1.documentAddedType",
  documentAdded: "InsuranceTransport.Page1.documentAdded",
  profession: "InsuranceTransport.Page1.profession",
  maritalStatus: "InsuranceTransport.Page1.maritalStatus",
  isAppropLicence: "InsuranceTransport.Page1.isAppropLicence",
  drivingLicenceDate: "InsuranceTransport.Page1.drivingLicenceDate",

  vehicleType: "InsuranceTransport.Page2.vehicleType",
  brand: "InsuranceTransport.Page2.brand",
  model: "InsuranceTransport.Page2.model",
  version: "InsuranceTransport.Page2.version",
  regNumber: "InsuranceTransport.Page2.regNumber",
  vinNumber: "InsuranceTransport.Page2.vinNumber",
  yearManufacture: "InsuranceTransport.Page2.yearManufacture",
  registeredPoland: "InsuranceTransport.Page2.registeredPoland",

  enginePower: "InsuranceTransport.Page3.enginePower",
  engineVolume: "InsuranceTransport.Page3.engineVolume",
  fuelType: "InsuranceTransport.Page3.fuelType",
  vehicleRegDate: "InsuranceTransport.Page3.vehicleRegDate",
  techExamDate: "InsuranceTransport.Page3.techExamDate",
  purchaseYear: "InsuranceTransport.Page3.purchaseYear",
  kilometrage: "InsuranceTransport.Page3.kilometrage",
  steeringWheel: "InsuranceTransport.Page3.steeringWheel",
  transmissionType: "InsuranceTransport.Page3.transmissionType",
  gasInstalation: "InsuranceTransport.Page3.gasInstalation",
  abroadImport: "InsuranceTransport.Page3.abroadImport",
  polandRegDate: "InsuranceTransport.Page3.polandRegDate",

  predictMileage: "InsuranceTransport.Page4.predictMileage",
  useAbroad: "InsuranceTransport.Page4.useAbroad",
  usePurpose: "InsuranceTransport.Page4.usePurpose",
  parkingPlace: "InsuranceTransport.Page4.parkingPlace",
  security: "InsuranceTransport.Page4.security",
};

const addLabelsOC = (array) => {
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

export default addLabelsOC;
