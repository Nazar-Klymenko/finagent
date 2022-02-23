import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceStart: "InsuranceTravel.Page1.insuranceStart",
  insuranceEnd: "InsuranceTravel.Page1.insuranceEnd",
  inPoland: "InsuranceTravel.Page1.inPoland",
  insuranceType: "InsuranceTravel.Page1.insuranceType",
  peopleAmount: "InsuranceTravel.Page1.peopleAmount",
  destination: "InsuranceTravel.Page1.destination",
  purpose: "InsuranceTravel.Page1.purpose",

  policyholderIs: "InsuranceTravel.Page2.policyholderIs",
  name: "InsuranceTravel.Page2.name",
  surname: "InsuranceTravel.Page2.surname",
  birthDate: "InsuranceTravel.Page2.birthDate",
  pesel: "InsuranceTravel.Page2.pesel",
  nip: "InsuranceTravel.Page2.nip",
  regon: "InsuranceTravel.Page2.regon",
  phone: "InsuranceTravel.Page2.phone",
  email: "InsuranceTravel.Page2.email",
  country: "InsuranceTravel.Page2.country",
  city: "InsuranceTravel.Page2.city",
  postIndex: "InsuranceTravel.Page2.postIndex",
  street: "InsuranceTravel.Page2.street",
  houseNumber: "InsuranceTravel.Page2.houseNumber",
};
const matchHeaders = {
  InsuranceData: "InsuranceTravel.Page1.title",
  PersonalData: "InsuranceTravel.Page2.title",
};

const addLabelsTravel = (array) => {
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

    let header = item[0];
    header = matchHeaders[header];
    let labeledArray = [header, propObject];
    finalArray.push(labeledArray);
  });
  return finalArray;
};

export default addLabelsTravel;
