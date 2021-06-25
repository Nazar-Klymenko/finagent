import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const CashSchema = new Schema(
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
    LoanData: {
      custody: String,
      lastApplications: String,
      loanAmount: String,
      loanPurpose: String,
      paymentTerm: String,
      remainingPayOff: String,
    },
  },
  { timestamps: true, _id: false }
);

const loanCash = Application.discriminator("loanCash", CashSchema);

export default loanCash;
