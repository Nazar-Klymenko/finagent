import mongoose from "mongoose";
import Application from "../application";
const Schema = mongoose.Schema;

const CashSchema = new Schema(
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
      remainingPayOff: String,
      lastApplications: String,
      custody: String,
      loanPurpose: String,
      loanAmount: String,
      paymentTerm: String,
      conditions: Boolean,
    },
  },
  { timestamps: true, _id: false }
);

const loanCash = Application.discriminator("loanCash", CashSchema);

export default loanCash;
