import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Application from "../application.js";

const InsuranceTravelSchema = new Schema(
  {
    insuranceData: {
      insuranceStart: String,
      insuranceEnd: String,
      insuranceType: String,
      peopleAmount: String,
      destination: String,
      purpose: String,
      inPoland: Boolean,
    },
    personalData: {
      policyholedIs: String,
      name: String,
      surname: String,
      birthDate: String,
      pesel: String,
      nip: String,
      regon: String,
      phone: String,
      email: String,
      country: String,
      city: String,
      postIndex: String,
      street: String,
      houseNumber: String,
    },
  },
  { timestamps: true }
);

const InsuranceTravel = Application.discriminator(
  "insuranceTravel",
  InsuranceTravelSchema
);

export default InsuranceTravel;
