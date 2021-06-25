import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  country: "InsuranceEstate.country",
  city: "InsuranceEstate.city",
  postIndex: "InsuranceEstate.postIndex",
  street: "InsuranceEstate.street",
  houseNumber: "InsuranceEstate.houseNumber",
  estateType: "InsuranceEstate.estateType",
  floor: "InsuranceEstate.floor",
  structure: "InsuranceEstate.structure",
  areaM2: "InsuranceEstate.areaM2",
  constructionYear: "InsuranceEstate.constructionYear",
  underConstruction: "InsuranceEstate.underConstruction",
  ownershipForm: "InsuranceEstate.ownershipForm",
  creditOwnership: "InsuranceEstate.creditOwnership",
  bankName: "InsuranceEstate.bankName",
  regon: "InsuranceEstate.regon",
  nip: "InsuranceEstate.nip",
  security: "InsuranceEstate.security",
  damagesNumber: "InsuranceEstate.damagesNumber",
  insurancePeriod: "InsuranceEstate.insurancePeriod",
  insuranceStart: "InsuranceEstate.insuranceStart",
  flatAndFixed: "InsuranceEstate.flatAndFixed",
  householdGoods: "InsuranceEstate.householdGoods",

  policyholderIs: "InsuranceEstate.policyholderIs",
  firmName: "InsuranceEstate.name",
  name: "InsuranceEstate.name",
  surname: "InsuranceEstate.surname",
  pesel: "InsuranceEstate.pesel",
  phone: "InsuranceEstate.phone",
  email: "InsuranceEstate.email",
  peopleNumber: "InsuranceEstate.peopleNumber",
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
