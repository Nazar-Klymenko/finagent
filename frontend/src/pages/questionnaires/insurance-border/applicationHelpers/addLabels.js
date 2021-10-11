import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";
import changeSelectValues from "@helpers/changeSelectValues";

const matchHeaders = {
  InsuranceData: "InsuranceBorder.Page1.subtitle",
  VehicleData: "InsuranceBorder.Page2.subtitle",
  PersonalData: "InsuranceBorder.Page3.subtitle",
};

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
    changeSelectValues(obj);

    let propObject = Object.fromEntries(obj);

    let header = item[0];
    header = matchHeaders[header];
    let labeledArray = [header, propObject];
    finalArray.push(labeledArray);
  });
  return finalArray;
};

export default addLabelsBorder;

// {
//   "InsuranceData": {
//     "pesel": "23123123",
//     "documentType": "pesel",
//     "registeredNotInEU": "yes",
//     "insurancePeriod": "210"
//   },
//   "VehicleData": {
//     "brand": "Volvo",
//     "model": "XC40",
//     "regNumber": "KR34534",
//     "vinNumber": "ZAR2394239423423",
//     "engineNumber": "123123",
//     "engineVolume": "12333",
//     "vehicleType": "truck",
//     "seatNumber": "5"
//   },
//   "PersonalData": {
//     "name": "nazar",
//     "surname": "klymenko",
//     "phoneNumber": "+48 066433455",
//     "email": "test@gmail.com",
//     "country": "Poland",
//     "city": "krakow",
//     "postIndex": "12323",
//     "street": "dietla 10",
//     "houseNumber": "38"
//   }
// }
