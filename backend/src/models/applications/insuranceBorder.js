import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Application from "../application.js";

const InsuranceBorderSchema = new Schema(
  {
    insuranceData: {
      documentType: String,
      pesel: String,
      passportNumber: String,
      registeredNotInEU: String,
      insurancePeriod: String,
    },
    vehicleData: {
      vehicleType: String,
      brand: String,
      model: String,
      regNumber: String,
      vinNumber: String,
      engineNumber: String,
      engineVolume: String,
      seatNumber: String,
    },
    personalData: {
      name: String,
      phoneNumber: String,
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

const InsuranceBorder = Application.discriminator(
  "insuranceBorder",
  InsuranceBorderSchema
);

export default InsuranceBorder;
