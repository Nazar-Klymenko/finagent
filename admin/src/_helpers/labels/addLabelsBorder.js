import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  documentType: "InsuranceBorder.documentType",
  pesel: "InsuranceBorder.pesel",
  passportNumber: "InsuranceBorder.passport",
  registeredNotInEU: "InsuranceBorder.registeredNotInEU",
  insurancePeriod: "InsuranceBorder.insurancePeriod",

  vehicleType: "InsuranceBorder.vehicleType",
  brand: "InsuranceBorder.brand",
  model: "InsuranceBorder.model",
  regNumber: "InsuranceBorder.regNumber",
  vinNumber: "InsuranceBorder.vinNumber",
  engineNumber: "InsuranceBorder.engineNumber",
  engineVolume: "InsuranceBorder.engineVolume",
  seatNumber: "InsuranceBorder.seatNumber",

  name: "InsuranceBorder.name",
  surname: "InsuranceBorder.surname",
  phoneNumber: "InsuranceBorder.phoneNumber",
  email: "InsuranceBorder.email",
  country: "InsuranceBorder.country",
  city: "InsuranceBorder.city",
  postIndex: "InsuranceBorder.postIndex",
  street: "InsuranceBorder.street",
  houseNumber: "InsuranceBorder.houseNumber",
};

const addLabelsBorder = (array) => {
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

export default addLabelsBorder;
