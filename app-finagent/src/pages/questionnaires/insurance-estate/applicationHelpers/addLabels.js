import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  country: "InsuranceEstate.Page1.country",
  city: "InsuranceEstate.Page1.city",
  postIndex: "InsuranceEstate.Page1.postIndex",
  street: "InsuranceEstate.Page1.street",
  houseNumber: "InsuranceEstate.Page1.houseNumber",
  estateType: "InsuranceEstate.Page1.estateType",
  floor: "InsuranceEstate.Page1.floor",
  structure: "InsuranceEstate.Page1.structure",
  areaM2: "InsuranceEstate.Page1.areaM2",
  constructionYear: "InsuranceEstate.Page1.constructionYear",
  underConstruction: "InsuranceEstate.Page1.underConstruction",
  ownershipForm: "InsuranceEstate.Page1.ownershipForm",
  creditOwnership: "InsuranceEstate.Page1.creditOwnership",
  bankName: "InsuranceEstate.Page1.bankName",
  regon: "InsuranceEstate.Page1.regon",
  nip: "InsuranceEstate.Page1.nip",
  security: "InsuranceEstate.Page1.security",
  damagesNumber: "InsuranceEstate.Page1.damagesNumber",
  insurancePeriod: "InsuranceEstate.Page1.insurancePeriod",
  insuranceStart: "InsuranceEstate.Page1.insuranceStart",
  flatAndFixed: "InsuranceEstate.Page1.flatAndFixed",
  householdGoods: "InsuranceEstate.Page1.householdGoods",

  policyholderIs: "InsuranceEstate.Page2.policyholderIs",
  firmName: "InsuranceEstate.Page2.firmName",
  name: "InsuranceEstate.Page2.name",
  surname: "InsuranceEstate.Page2.surname",
  pesel: "InsuranceEstate.Page2.pesel",
  phone: "InsuranceEstate.Page2.phone",
  email: "InsuranceEstate.Page2.email",
  peopleNumber: "InsuranceEstate.Page2.peopleNumber",
};

const addLabelsEstate = (array) => {
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

export default addLabelsEstate;
