import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Application from "../application.js";

const InsuranceCarOCSchema = new Schema(
  {
    PersonalData: {
      oc: Boolean,
      ac: Boolean,
      greenCard: Boolean,
      assistance: Boolean,
      name: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
        maxlength: [24, "can't be longer than 24 characters"],
      },
      surname: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
        maxlength: [40, "can't be longer than 40 characters"],
      },

      phoneNumber: {
        type: String,
        maxlength: [302, "can't be longer than 302 characters"],
      },
      postIndex: {
        type: String,
        trim: true,
        maxlength: [6, "can't be longer than 6 characters"],
      },
      voivodeship: {
        type: String,
        maxlength: [85, "can't be longer than 85 characters"],
      },
      city: {
        type: String,
        maxlength: [85, "can't be longer than 85 characters"],
      },
      street: {
        type: String,
        maxlength: [85, "can't be longer than 85 characters"],
      },
      houseNumber: {
        type: String,
        maxlength: [8, "can't be longer than 8 characters"],
      },
      documentAddedType: {
        type: String,
        maxlength: [8, "can't be longer than 8 characters"],
      },
      documentAdded: {
        type: String,
        maxlength: [20, "can't be longer than 20 characters"],
      },
      isAppropLicence: {
        type: Boolean,
      },
      profession: {
        type: String,
        maxlength: [30, "can't be longer than 30 characters"],
      },
      maritalStatus: {
        type: String,
        maxlength: [30, "can't be longer than 30 characters"],
      },
      drivingLicenceDate: {
        type: String,
        maxlength: [30, "can't be longer than 30 characters"],
      },
    },
    TransportData: {
      vehicleType: {
        type: String,
      },
      registeredPoland: {
        type: String,
      },
      brand: {
        type: String,
      },
      model: {
        type: String,
      },
      version: {
        type: String,
      },
      regNumber: {
        type: String,
      },
      vinNumber: {
        type: String,
      },
      year: {
        type: String,
      },
    },
    SpecificData: {
      enginePower: {
        type: String,
      },
      engineVolume: {
        type: String,
      },
      fuelType: {
        type: String,
      },
      purchaseYear: {
        type: String,
      },
      kilometrage: {
        type: String,
      },
      abroadImport: {
        type: String,
      },
      steeringWheel: {
        type: String,
      },
      gas: {
        type: String,
      },
      transmissionType: {
        type: String,
      },
      polandRegDate: {
        type: String,
      },
      techExamDate: {
        type: String,
      },
      vehicleRegDate: {
        type: String,
      },
    },
    AdditionalData: {
      predictMileage: {
        type: String,
      },
      useAbroad: {
        type: String,
      },
      usePurpose: {
        type: String,
      },
      parkingPlace: {
        type: String,
      },
      security: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const InsuranceCarOC = Application.discriminator(
  "InsuranceCarOC",
  InsuranceCarOCSchema
);

export default InsuranceCarOC;
