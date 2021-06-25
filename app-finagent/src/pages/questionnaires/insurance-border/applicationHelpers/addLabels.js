import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  documentType: "InsuranceBorder.Page1.documentType",
  pesel: "InsuranceBorder.Page1.pesel",
  passportNumber: "InsuranceBorder.Page1.passport",
  registeredNotInEU: "InsuranceBorder.Page1.registeredNotInEU",
  insurancePeriod: "InsuranceBorder.Page1.insurancePeriod",

  vehicleType: "InsuranceBorder.Page2.vehicleType",
  brand: "InsuranceBorder.Page2.brand",
  model: "InsuranceBorder.Page2.model",
  regNumber: "InsuranceBorder.Page2.regNumber",
  vinNumber: "InsuranceBorder.Page2.vinNumber",
  engineNumber: "InsuranceBorder.Page2.engineNumber",
  engineVolume: "InsuranceBorder.Page2.engineVolume",
  seatNumber: "InsuranceBorder.Page2.seatNumber",

  name: "InsuranceBorder.Page3.name",
  surname: "InsuranceBorder.Page3.surname",
  phoneNumber: "InsuranceBorder.Page3.phoneNumber",
  email: "InsuranceBorder.Page3.email",
  country: "InsuranceBorder.Page3.country",
  city: "InsuranceBorder.Page3.city",
  postIndex: "InsuranceBorder.Page3.postIndex",
  street: "InsuranceBorder.Page3.street",
  houseNumber: "InsuranceBorder.Page3.houseNumber",
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
