import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const MortgageSchema = new Schema(
  {
    Applicants: {
      Applicant1: {
        email: String,
        name: String,
        nationality: String,
        otherNation: String,
        residenceDocument: String,
        pesel: String,
        phoneNumber: String,
        validUntil: String,
        validFrom: String,
        surname: String,
        birthDate: String,
        averageIncome: String,
        bank: String,
        basicIncome: String,
        contractUntil: String,
        contractFrom: String,
        currency: String,
        pit: String,
        accountancy: String,
        firstContract: String,
        sameEmployer: String,
        withoutPause: String,
      },
      Applicant2: {
        email: String,
        name: String,
        nationality: String,
        otherNation: String,
        residenceDocument: String,
        pesel: String,
        phoneNumber: String,
        validUntil: String,
        validFrom: String,
        surname: String,
        birthDate: String,
        averageIncome: String,
        bank: String,
        basicIncome: String,
        contractUntil: String,
        contractFrom: String,
        currency: String,
        pit: String,
        accountancy: String,
        firstContract: String,
        sameEmployer: String,
        withoutPause: String,
      },
    },
    ApplicantsData: {
      bothSpousesStart: String,
      maritalStatus: String,
      propertySeparation: String,
    },
    AdditionalIncome: [
      {
        truckDriver: String,
        industry: String,
        averageIncome: String,
        bank: String,
        basicIncome: String,
        contractUntil: String,
        contractFrom: String,
        currency: String,
        pit: String,
        accountancy: String,
        firstContract: String,
        sameEmployer: String,
        withoutPause: String,
      },
    ],
    HouseholdData: [
      {
        peopleInHousehold: String,
        monthlyExpenses: String,
      },
    ],
    LoanData: {
      peopleInHousehold: String,
      custody: String,
      monthlyExpenses: String,
      monthlyLoanPayments: String,
      cardLimits: String,
      loanPurpose: String,
      rialto: String,
      propertyValue: String,
      renovationValue: String,
      contributionAmount: String,
      paymentTerm: String,
      repayment: String,
      monthlyPayments: String,
      voivodeship: String,
      town: String,
    },
  },
  { timestamps: true, _id: false }
);

const loanMortgage = Application.discriminator("loanMortgage", MortgageSchema);

export default loanMortgage;
