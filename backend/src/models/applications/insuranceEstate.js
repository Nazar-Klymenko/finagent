import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Application from "../application.js";

const InsuranceEstateSchema = new Schema(
  {
    insuranceData: {
      country: String,
      city: String,
      postIndex: String,
      street: String,
      houseNumber: String,
      estateType: String,
      floor: String,
      structure: String,
      areaM2: String,
      constructionYear: String,
      underConstruction: String,
      ownershipForm: String,
      creditOwnership: String,
      bankName: String,
      address: String,
      regon: String,
      nip: String,
      security: String,
      damagesNumber: String,
      insurancePeriod: String,
      insuranceStart: String,
      flatAndFixed: String,
      householdGoods: String,
    },
    personalData: {
      policyholderIs: String,
      name: String,
      surname: String,
      pesel: String,
      firmName: String,
      nip: String,
      regon: String,
      phone: String,
      email: String,
      peopleNumber: String,
    },
  },
  { timestamps: true }
);

const InsuranceEstate = Application.discriminator(
  "InsuranceEstate",
  InsuranceEstateSchema
);

export default InsuranceEstate;
