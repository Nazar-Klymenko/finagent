import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";
import changeSelectValues from "@helpers/changeSelectValues";

const matchObj = {
  insuranceStart: "InsuranceHealth.Page1.insuranceStart",
  insuranceEnd: "InsuranceHealth.Page1.insuranceEnd",
  clauseOnePrice: "InsuranceHealth.Page1.clauseOne",
  clauseTwoPrice: "InsuranceHealth.Page1.clauseTwo",
  clauseThreePrice: "InsuranceHealth.Page1.clauseThree",

  policyholderIs: "InsuranceHealth.ApplicantModal.policyholderIs",
  name: "InsuranceHealth.ApplicantModal.name",
  surname: "InsuranceHealth.ApplicantModal.surname",
  birthDate: "InsuranceHealth.ApplicantModal.birthDate",
  documentType: "InsuranceHealth.ApplicantModal.documentType",
  documentAdded: "InsuranceHealth.ApplicantModal.documentAdded",
  pesel: "InsuranceHealth.ApplicantModal.pesel",
  passportNumber: "InsuranceHealth.ApplicantModal.passportNumber",
  citizenship: "InsuranceHealth.ApplicantModal.citizenship",
  country: "InsuranceHealth.ApplicantModal.country",
  city: "InsuranceHealth.ApplicantModal.city",
  postIndex: "InsuranceHealth.ApplicantModal.postIndex",
  street: "InsuranceHealth.ApplicantModal.street",
  houseNumber: "InsuranceHealth.ApplicantModal.houseNumber",
};

const matchHeaders = {
  InsuranceData: "InsuranceHealth.Page1.subtitle",
  InsuredData: "InsuranceHealth.Page2.subtitle",
};

const addLabelsMedical = (array) => {
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
        changeSelectValues(obj);

        let propObject = Object.fromEntries(obj);
        let labeledArray = ["InsuranceHealth.Page2.subtitle", propObject];
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
    changeSelectValues(obj);

    let propObject = Object.fromEntries(obj);

    let header = item[0];
    header = matchHeaders[header];
    let labeledArray = [header, propObject];
    finalArray.push(labeledArray);
  });
  finalArray = finalArray.filter((element) => element[0] !== "InsuredData");
  return finalArray;
};

export default addLabelsMedical;
