import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const MortgageSchema = new Schema(
  {
    applicantData: {
      maritalStatus: String,
      propertySeparation: String,
      bothSpousesStart: String,
      applicant: [
        {
          otherNation: String,
          nationality: String,
          validFrom: Date,
          validUntil: Date,
          name: String,
          birthDate: Date,
          phoneNumber: String,
          email: String,
          pesel: String,
          contractFrom: Date,
          contractUntil: Date,
          averageIncome: String,
          currency: String,
          pit: String,
          bank: String,
        },
      ],
    },
    incomeData: {
      income: [
        {
          truckDriver: String,
          industry: String,
          basicIncome: String,
          firstContract: String,
          sameEmployer: String,
          withoutPause: String,
          contractFrom: Date,
          contractUntil: Date,
          averageIncome: String,
          accountancy: String,
          pit: String,
          bank: String,
        },
      ],
    },
    loanData: {
      custody: String,
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
      conditions: Boolean,
    },
  },
  { timestamps: true, _id: false }
);

const loanMortgage = Application.discriminator("loanMortgage", MortgageSchema);

export default loanMortgage;
