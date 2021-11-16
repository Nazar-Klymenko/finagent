import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const MortgageSchema = new Schema(
  {
    applicants: {
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
    applicantsData: {
      bothSpousesStart: String,
      maritalStatus: String,
      propertySeparation: String,
    },
    additionalIncome: [
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
    householdData: [
      {
        peopleInHousehold: String,
        monthlyExpenses: String,
      },
    ],
    loanData: {
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
