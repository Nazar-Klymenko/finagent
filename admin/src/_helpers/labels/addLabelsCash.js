import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  nationality: "LoanCash.citizenship",
  otherNation: "LoanCash.otherCitizenship",
  residenceDocument: "LoanCash.residenceDocument",
  validUntil: "LoanCash.validUntil",
  validFrom: "LoanCash.validFrom",
  name: "LoanCash.name",
  surname: "LoanCash.surname",
  birthDate: "LoanCash.birthDate",
  phoneNumber: "LoanCash.phoneNumber",
  email: "LoanCash.email",
  pesel: "LoanCash.pesel",

  custody: "LoanCash.custody",
  lastApplications: "LoanCash.lastApplications",
  loanAmount: "LoanCash.loanAmount",
  loanPurpose: "LoanCash.loanPurpose",
  paymentTerm: "LoanCash.paymentTerm",
  remainingPayOff: "LoanCash.remainingPayOff",

  bothSpousesStart: "LoanCash.bothSpousesStart",
  maritalStatus: "LoanCash.maritalStatus",
  propertySeparation: "LoanCash.propertySeparation",

  currency: "LoanCash.currency",
  bank: "LoanCash.bank",
  averageIncome: "LoanCash.averageIncome",

  truckDriver: "LoanCash.truckDriver",
  industry: "LoanCash.industry",
  basicIncome: "LoanCash.basicIncome",
  contractUntil: "LoanCash.contractUntil",
  contractFrom: "LoanCash.contractFrom",
  pit: "LoanCash.pit",
  accountancy: "LoanCash.accountancy",
  firstContract: "LoanCash.firstContract",
  sameEmployer: "LoanCash.sameEmployer",
  withoutPause: "LoanCash.withoutPause",
};

const addLabelsCash = (array) => {
  let finalArray = [];
  array.forEach((item) => {
    if (item[0] === "Applicants") {
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
        let labeledArray = [item[0], propObject];
        finalArray.push(labeledArray);
      });
    }
    if (item[0] === "AdditionalIncome") {
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
        let labeledArray = ["Income", propObject];
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
  finalArray = finalArray.filter(
    (element) =>
      element[0] !== "Applicants" && element[0] !== "AdditionalIncome"
  );
  return finalArray;
};

export default addLabelsCash;
