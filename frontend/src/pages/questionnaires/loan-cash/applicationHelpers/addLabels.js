import changeBooleanValues from "@helpers/changeBooleanValues";
import changeDateValues from "@helpers/changeDateValues";
import changeRadioValues from "@helpers/changeRadioValues";

const matchObj = {
  nationality: "LoanCash.ApplicantModal.citizenship",
  otherNation: "LoanCash.ApplicantModal.otherCitizenship",
  residenceDocument: "LoanCash.ApplicantModal.residenceDocument",
  validUntil: "LoanCash.ApplicantModal.validUntil",
  validFrom: "LoanCash.ApplicantModal.validFrom",
  name: "LoanCash.ApplicantModal.name",
  surname: "LoanCash.ApplicantModal.surname",
  birthDate: "LoanCash.ApplicantModal.birthDate",
  phoneNumber: "LoanCash.ApplicantModal.phoneNumber",
  email: "LoanCash.ApplicantModal.email",
  pesel: "LoanCash.ApplicantModal.pesel",

  custody: "LoanCash.Page2.custody",
  lastApplications: "LoanCash.Page2.lastApplications",
  loanAmount: "LoanCash.Page2.loanAmount",
  loanPurpose: "LoanCash.Page2.loanPurpose",
  paymentTerm: "LoanCash.Page2.paymentTerm",
  remainingPayOff: "LoanCash.Page2.remainingPayOff",

  bothSpousesStart: "LoanCash.Page1.bothSpousesStart",
  maritalStatus: "LoanCash.Page1.maritalStatus",
  propertySeparation: "LoanCash.Page1.propertySeparation",

  currency: "LoanCash.ApplicantModal.currency",
  bank: "LoanCash.ApplicantModal.bank",
  averageIncome: "LoanCash.ApplicantModal.averageIncome",

  truckDriver: "LoanCash.IncomeModal.truckDriver",
  industry: "LoanCash.IncomeModal.industry",
  basicIncome: "LoanCash.IncomeModal.basicIncome",
  contractUntil: "LoanCash.IncomeModal.contractUntil",
  contractFrom: "LoanCash.IncomeModal.contractFrom",
  pit: "LoanCash.IncomeModal.pit",
  accountancy: "LoanCash.IncomeModal.accountancy",
  firstContract: "LoanCash.IncomeModal.firstContract",
  sameEmployer: "LoanCash.IncomeModal.sameEmployer",
  withoutPause: "LoanCash.IncomeModal.withoutPause",
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
