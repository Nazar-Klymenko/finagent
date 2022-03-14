import mongoose from "mongoose";
import Application from "../application.js";
const Schema = mongoose.Schema;

const HealthSchema = new Schema(
  {
    personalData: {
      insuranceStart: String,
      insuranceEnd: String,
      name: String,
      surname: String,
      nip: String,
      birthDate: String,
      pesel: String,
      regon: String,
      phoneNumber: String,
      email: String,
      country: String,
      city: String,
      postIndex: String,
      street: String,
      houseNumber: String,
    },
    insuredData: {
      policyholder: [
        {
          policyholderIs: String,
          name: String,
          nip: String,
          birthDate: Date,
          pesel: String,
          regon: String,
          phoneNumber: String,
          email: String,
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

const insuranceSpecialist = Application.discriminator(
  "insuranceSpecialist",
  HealthSchema
);

export default insuranceSpecialist;
