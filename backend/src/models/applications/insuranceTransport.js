import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Application from "../application.js";

const insuranceTransportSchema = new Schema(
  {
    personalData: {
      oc: Boolean,
      ac: Boolean,
      greenCard: Boolean,
      assistance: Boolean,
      fullName: String,
      phoneNumber: String,
      postIndex: String,
      city: String,
      voivodeship: String,
      street: String,
      houseNumber: String,
      documentAddedType: String,
      documentAdded: String,
      isAppropLicence: Boolean,
      drivingLicenceDate: Date,
      profession: String,
      maritalStatus: String,
    },
    transportData: {
      registeredPoland: Boolean,
      brand: String,
      model: String,
      version: String,
      regNumber: String,
      vinNumber: String,
      yearManufacture: Date,
    },
    specificData: {
      vehicleType: String,
      enginePower: String,
      engineVolume: String,
      fuelType: String,
      steeringWheel: String,
      transmissionType: String,
      purchaseYear: Date,
      kilometrage: String,
      techExamDate: Date,
      vehicleRegDate: Date,
      polandRegDate: Date,
      abroadImport: Boolean,
    },
    additionalData: {
      predictMileage: String,
      useAbroad: String,
      usePurpose: String,
      parkingPlace: String,
      security: String,
    },
  },
  { timestamps: true }
);

const insuranceTransport = Application.discriminator(
  "insuranceTransport",
  insuranceTransportSchema
);

export default insuranceTransport;
