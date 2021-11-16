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
    insuredData: [
      {
        policyholderIs: String,
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
    ],
  },
  { timestamps: true, _id: false }
);

const insuranceHealthSpecialist = Application.discriminator(
  "insuranceHealthSpecialist",
  HealthSchema
);

export default insuranceHealthSpecialist;
