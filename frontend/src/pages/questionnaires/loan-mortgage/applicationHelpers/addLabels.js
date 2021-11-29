import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";
import changeSelectValues from "@helpers/changeSelectValues";

const matchObj = {
  nationality: "LoanMortgage.ApplicantModal.citizenship",
  otherNation: "LoanMortgage.ApplicantModal.otherCitizenship",
  residenceDocument: "LoanMortgage.ApplicantModal.residenceDocument",
  validUntil: "LoanMortgage.ApplicantModal.validUntil",
  validFrom: "LoanMortgage.ApplicantModal.validFrom",
  name: "LoanMortgage.ApplicantModal.name",
  surname: "LoanMortgage.ApplicantModal.surname",
  birthDate: "LoanMortgage.ApplicantModal.birthDate",
  phoneNumber: "LoanMortgage.ApplicantModal.phoneNumber",
  email: "LoanMortgage.ApplicantModal.email",
  pesel: "LoanMortgage.ApplicantModal.pesel",

  peopleInHousehold: "LoanMortgage.HouseholdModal.monthlyExpenses",
  monthlyExpenses: "LoanMortgage.HouseholdModal.monthlyExpenses",

  custody: "LoanMortgage.Page2.custody",
  monthlyLoanPayments: "LoanMortgage.Page2.monthlyLoanPayments",
  cardLimits: "LoanMortgage.Page2.cardLimits",
  loanPurpose: "LoanMortgage.Page2.loanPurpose",
  rialto: "LoanMortgage.Page2.rialto",
  propertyValue: "LoanMortgage.Page2.propertyValue",
  renovationValue: "LoanMortgage.Page2.renovationValue",
  contributionAmount: "LoanMortgage.Page2.contributionAmount",
  paymentTerm: "LoanMortgage.Page2.paymentTerm",
  repayment: "LoanMortgage.Page2.repayment",
  monthlyPayments: "LoanMortgage.Page2.monthlyPayments",
  voivodeship: "LoanMortgage.Page2.voivodeship",
  town: "LoanMortgage.Page2.town",

  bothSpousesStart: "LoanMortgage.Page1.bothSpousesStart",
  maritalStatus: "LoanMortgage.Page1.maritalStatus",
  propertySeparation: "LoanMortgage.Page1.propertySeparation",

  currency: "LoanMortgage.ApplicantModal.currency",
  bank: "LoanMortgage.ApplicantModal.bank",
  averageIncome: "LoanMortgage.ApplicantModal.averageIncome",

  truckDriver: "LoanMortgage.IncomeModal.truckDriver",
  industry: "LoanMortgage.IncomeModal.industry",
  basicIncome: "LoanMortgage.IncomeModal.basicIncome",
  contractUntil: "LoanMortgage.IncomeModal.contractUntil",
  contractFrom: "LoanMortgage.IncomeModal.contractFrom",
  pit: "LoanMortgage.IncomeModal.pit",
  accountancy: "LoanMortgage.IncomeModal.accountancy",
  firstContract: "LoanMortgage.IncomeModal.firstContract",
  sameEmployer: "LoanMortgage.IncomeModal.sameEmployer",
  withoutPause: "LoanMortgage.IncomeModal.withoutPause",
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
        changeSelectValues(obj);

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
        changeSelectValues(obj);

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
        changeSelectValues(obj);

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
    changeSelectValues(obj);

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
