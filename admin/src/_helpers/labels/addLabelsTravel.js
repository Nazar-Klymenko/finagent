import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceStart: "InsuranceTravel.insuranceStart",
  insuranceEnd: "InsuranceTravel.insuranceEnd",
  inPoland: "InsuranceTravel.inPoland",
  insuranceType: "InsuranceTravel.insuranceType",
  peopleAmount: "InsuranceTravel.peopleAmount",
  destination: "InsuranceTravel.destination",
  purpose: "InsuranceTravel.purpose",

  policyholderIs: "InsuranceTravel.policyholderIs",
  name: "InsuranceTravel.name",
  surname: "InsuranceTravel.surname",
  birthDate: "InsuranceTravel.birthDate",
  pesel: "InsuranceTravel.pesel",
  nip: "InsuranceTravel.nip",
  regon: "InsuranceTravel.regon",
  phone: "InsuranceTravel.phone",
  email: "InsuranceTravel.email",
  country: "InsuranceTravel.country",
  city: "InsuranceTravel.city",
  postIndex: "InsuranceTravel.postIndex",
  street: "InsuranceTravel.street",
  houseNumber: "InsuranceTravel.houseNumber",
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

    let labeledArray = [item[0], propObject];
    finalArray.push(labeledArray);
  });
  return finalArray;
};

export default addLabelsTravel;
