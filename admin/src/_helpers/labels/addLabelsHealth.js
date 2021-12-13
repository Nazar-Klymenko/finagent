import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  insuranceStart: "InsuranceHealth.insuranceStart",
  insuranceEnd: "InsuranceHealth.insuranceEnd",
  clauseOnePrice: "InsuranceHealth.clauseOne",
  clauseTwoPrice: "InsuranceHealth.clauseTwo",
  clauseThreePrice: "InsuranceHealth.clauseThree",

  policyholderIs: "InsuranceHealth.policyholderIs",
  name: "InsuranceHealth.name",
  surname: "InsuranceHealth.surname",
  birthDate: "InsuranceHealth.birthDate",
  documentType: "InsuranceHealth.documentType",
  documentAdded: "InsuranceHealth.documentAdded",
  pesel: "InsuranceHealth.pesel",
  passportNumber: "InsuranceHealth.passportNumber",
  citizenship: "InsuranceHealth.citizenship",
  country: "InsuranceHealth.country",
  city: "InsuranceHealth.city",
  postIndex: "InsuranceHealth.postIndex",
  street: "InsuranceHealth.street",
  houseNumber: "InsuranceHealth.houseNumber",
};

const addLabelsHealth = (array) => {
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

export default addLabelsHealth;
