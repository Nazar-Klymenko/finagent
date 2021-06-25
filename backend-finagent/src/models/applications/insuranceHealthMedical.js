import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const HealthSchema = new Schema(
  {
    InsuranceData: {
      clauseOnePrice: String,
      clauseTwoPrice: String,
      clauseThreePrice: String,
      insuranceEnd: String,
      insuranceStart: String,
    },
    InsuredData: [
      {
        policyholderIs: String,
        citizenship: String,
        documentAdded: String,
        documentType: String,
        name: String,
        surname: String,
        birthDate: String,
        country: String,
        city: String,
        postIndex: String,
        street: String,
        houseNumber: String,
      },
    ],
  },
  { timestamps: true, _id: false }
);

const insuranceHealthMedical = Application.discriminator(
  "insuranceHealthMedical",
  HealthSchema
);

export default insuranceHealthMedical;
