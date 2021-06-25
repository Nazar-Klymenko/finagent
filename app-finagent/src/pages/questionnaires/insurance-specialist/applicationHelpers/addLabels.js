import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceStart: "InsuranceDiagnostic.Page1.insuranceStart",
  insuranceEnd: "InsuranceDiagnostic.Page1.insuranceEnd",

  policyholderIs: "InsuranceDiagnostic.Page1.policyholderIs",
  name: "InsuranceDiagnostic.Page1.name",
  surname: "InsuranceDiagnostic.Page1.surname",
  nip: "InsuranceDiagnostic.Page1.nip",
  regon: "InsuranceDiagnostic.Page1.regon",

  birthDate: "InsuranceDiagnostic.Page1.birthDate",
  email: "InsuranceDiagnostic.Page1.email",
  pesel: "InsuranceDiagnostic.Page1.pesel",
  country: "InsuranceDiagnostic.Page1.country",
  city: "InsuranceDiagnostic.Page1.city",
  postIndex: "InsuranceDiagnostic.Page1.postIndex",
  street: "InsuranceDiagnostic.Page1.street",
  houseNumber: "InsuranceDiagnostic.Page1.houseNumber",
  phoneNumber: "InsuranceDiagnostic.Page1.phoneNumber",
};

const addLabelsSpecialist = (array) => {
  let finalArray = [];
  array.forEach((item) => {
    if (item[0] === "InsuredData") {
      let peopleArr = Object.entries(item[1]);
      peopleArr.forEach((item) => {
        let obj = Object.entries(item[1]);
        obj.forEach((prop) => {
          prop[0] = matchObj[prop[0]];
        });
        changeDateValues(obj);
        changeBooleanValues(obj);
        changeRadioValues(obj);
        let propObject = Object.fromEntries(obj);
        let labeledArray = ["Applicant", propObject];
        finalArray.push(labeledArray);
      });
    }
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
  finalArray = finalArray.filter((element) => element[0] !== "InsuredData");
  return finalArray;
};

export default addLabelsSpecialist;
