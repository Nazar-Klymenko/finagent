import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const HealthSchema = new Schema(
  {
    insuranceData: {
      insuranceStart: Date,
      insuranceEnd: Date,
      clauseOnePrice: String,
      clauseTwoPrice: String,
      clauseThreePrice: String,
    },
    insuredData: {
      policyholder: [
        {
          policyholderIs: String,
          citizenship: String,
          documentAdded: String,
          documentType: String,
          name: String,
          birthDate: Date,
          country: String,
          city: String,
          postIndex: String,
          street: String,
          houseNumber: String,
        },
      ],
    },
  },
  { timestamps: true, _id: false }
);

const insuranceHealth = Application.discriminator(
  "insuranceHealth",
  HealthSchema
);

export default insuranceHealth;
