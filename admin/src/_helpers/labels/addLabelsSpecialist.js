import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceStart: "InsuranceDiagnostic.insuranceStart",
  insuranceEnd: "InsuranceDiagnostic.insuranceEnd",

  policyholderIs: "InsuranceDiagnostic.policyholderIs",
  name: "InsuranceDiagnostic.name",
  surname: "InsuranceDiagnostic.surname",
  nip: "InsuranceDiagnostic.nip",
  regon: "InsuranceDiagnostic.regon",

  birthDate: "InsuranceDiagnostic.birthDate",
  email: "InsuranceDiagnostic.email",
  pesel: "InsuranceDiagnostic.pesel",
  phoneNumber: "InsuranceDiagnostic.phoneNumber",
  country: "InsuranceDiagnostic.country",
  city: "InsuranceDiagnostic.city",
  postIndex: "InsuranceDiagnostic.postIndex",
  street: "InsuranceDiagnostic.street",
  houseNumber: "InsuranceDiagnostic.houseNumber",
};

const addLabelsSpecialist = (array) => {
  let finalArray = [];
  array.forEach((item) => {
    if (item[0] === "InsuredData") {
      let peopleArr = Object.entries(item[1]);
      peopleArr.forEach((item) => {
        let obj = Object.entries(item[1]);
        obj.forEach((prop) => {
          console.log(prop[0]);
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
