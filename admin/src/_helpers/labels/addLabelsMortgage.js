import changeDateValues from "@helpers/changeDateValues";
import changeBooleanValues from "@helpers/changeBooleanValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  nationality: "LoanMortgage.citizenship",
  otherNation: "LoanMortgage.otherCitizenship",
  residenceDocument: "LoanMortgage.residenceDocument",
  validUntil: "LoanMortgage.validUntil",
  validFrom: "LoanMortgage.validFrom",
  name: "LoanMortgage.name",
  surname: "LoanMortgage.surname",
  birthDate: "LoanMortgage.birthDate",
  phoneNumber: "LoanMortgage.phoneNumber",
  email: "LoanMortgage.email",
  pesel: "LoanMortgage.pesel",

  peopleInHousehold: "LoanMortgage.monthlyExpenses",
  monthlyExpenses: "LoanMortgage.monthlyExpenses",

  custody: "LoanMortgage.custody",
  monthlyLoanPayments: "LoanMortgage.monthlyLoanPayments",
  cardLimits: "LoanMortgage.cardLimits",
  loanPurpose: "LoanMortgage.loanPurpose",
  rialto: "LoanMortgage.rialto",
  propertyValue: "LoanMortgage.propertyValue",
  renovationValue: "LoanMortgage.renovationValue",
  contributionAmount: "LoanMortgage.contributionAmount",
  paymentTerm: "LoanMortgage.paymentTerm",
  repayment: "LoanMortgage.repayment",
  monthlyPayments: "LoanMortgage.monthlyPayments",
  voivodeship: "LoanMortgage.voivodeship",
  town: "LoanMortgage.town",

  bothSpousesStart: "LoanMortgage.bothSpousesStart",
  maritalStatus: "LoanMortgage.maritalStatus",
  propertySeparation: "LoanMortgage.propertySeparation",

  currency: "LoanMortgage.currency",
  bank: "LoanMortgage.bank",
  averageIncome: "LoanMortgage.averageIncome",

  truckDriver: "LoanMortgage.truckDriver",
  industry: "LoanMortgage.industry",
  basicIncome: "LoanMortgage.basicIncome",
  contractUntil: "LoanMortgage.contractUntil",
  contractFrom: "LoanMortgage.contractFrom",
  pit: "LoanMortgage.pit",
  accountancy: "LoanMortgage.accountancy",
  firstContract: "LoanMortgage.firstContract",
  sameEmployer: "LoanMortgage.sameEmployer",
  withoutPause: "LoanMortgage.withoutPause",
};

const addLabelsMortgage = (array) => {
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
    if (item[0] === "HouseholdData") {
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
        let labeledArray = ["Household", propObject];
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
      element[0] !== "Applicants" &&
      element[0] !== "HouseholdData" &&
      element[0] !== "AdditionalIncome"
  );
  return finalArray;
};

export default addLabelsMortgage;
