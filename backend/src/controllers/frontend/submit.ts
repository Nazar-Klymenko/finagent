import insuranceBorder from "models/applications/insuranceBorder";
import insuranceEstate from "models/applications/insuranceEstate";
import insuranceHealth from "models/applications/insuranceHealth";
import insuranceSpecialist from "models/applications/insuranceSpecialist";
import insuranceTransport from "models/applications/insuranceTransport";
import insuranceTravel from "models/applications/insuranceTravel";
import loanCash from "models/applications/loanCash";
import loanMortgage from "models/applications/loanMortgage";
import { asyncHandler } from "helpers/asyncHandler";
import { Request, Response } from "express";

export const insuranceBorderSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const userInfo = req.body;
    const insuranceObj = await new insuranceBorder(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "border";

    insuranceObj.markModified("insuranceData", "vehicleData", "personalData");
    await insuranceObj.save();

    res.send({
      id: insuranceObj.id,
      message: "Application submitted successfully",
    });
  }
);

export const insuranceEstateSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const insuranceObj = await new insuranceEstate(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "estate";

    insuranceObj.markModified("insuranceData", "personalData");
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  }
);

export const insuranceHealthSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const insuranceObj = await new insuranceHealth(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "health";

    const userArray = Object.keys(req.body.insuredData.policyholder);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.policyholder.push({
        policyholderIs: req.body.insuredData.policyholder[i].policyholderIs,
        citizenship: req.body.insuredData.policyholder[i].citizenship,
        documentAdded: req.body.insuredData.policyholder[i].documentAdded,
        documentType: req.body.insuredData.policyholder[i].documentType,
        name: req.body.insuredData.policyholder[i].name,
        birthDate: req.body.insuredData.policyholder[i].birthDate,
        country: req.body.insuredData.policyholder[i].country,
        city: req.body.insuredData.policyholder[i].city,
        postIndex: req.body.insuredData.policyholder[i].postIndex,
        street: req.body.insuredData.policyholder[i].street,
        houseNumber: req.body.insuredData.policyholder[i].houseNumber,
      });
    }
    insuranceObj.insuredData.policyholder.shift();

    insuranceObj.markModified("insuranceData", "insuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "Application submitted",
    });
  }
);

export const insuranceSpecialistSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const insuranceObj = await new insuranceSpecialist(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "specialist";

    const userArray = Object.keys(req.body.insuredData.policyholder);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.policyholder.push({
        policyholderIs: req.body.insuredData.policyholder[i].policyholderIs,
        name: req.body.insuredData.policyholder[i].name,
        nip: req.body.insuredData.policyholder[i].nip,
        birthDate: req.body.insuredData.policyholder[i].birthDate,
        pesel: req.body.insuredData.policyholder[i].pesel,
        regon: req.body.insuredData.policyholder[i].regon,
        phoneNumber: req.body.insuredData.policyholder[i].phoneNumber,
        email: req.body.insuredData.policyholder[i].email,
        country: req.body.insuredData.policyholder[i].country,
        city: req.body.insuredData.policyholder[i].city,
        postIndex: req.body.insuredData.policyholder[i].postIndex,
        street: req.body.insuredData.policyholder[i].street,
        houseNumber: req.body.insuredData.policyholder[i].houseNumber,
      });
    }
    insuranceObj.insuredData.policyholder.shift();

    insuranceObj.markModified("personalData", "insuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "Application submitted",
    });
  }
);

export const insuranceTransportSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const userInfo = req.body;
    const insuranceObj = await new insuranceTransport(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "transport";

    Object.entries(userInfo.appendedDocuments).forEach((fileArray: any) => {
      fileArray[1]?.length > 0 &&
        fileArray[1].forEach((file: any) => {
          insuranceObj.user_attachments.push({
            filename: file.path,
          });
        });
    });

    insuranceObj.markModified(
      "personalData",
      "transportData",
      "specificData",
      "additionalData"
    );

    await insuranceObj.save();

    res.send({
      id: insuranceObj.id,
      user_attachments: insuranceObj.user_attachments,
      message: "Application submitted successfully",
    });
  }
);

export const insuranceTravelSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const userInfo = req.body;
    const insuranceObj = await new insuranceTravel(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "travel";

    insuranceObj.markModified("insuranceData", "personalData");

    await insuranceObj.save();

    res.send({
      id: insuranceObj.id,
      message: "Application submitted successfully",
    });
  }
);

export const loanCashSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const insuranceObj = await new loanCash(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "loan";
    insuranceObj.type = "cash";

    const applicantArray = Object.keys(req.body.applicantData.applicant);
    const incomeArray = Object.keys(req.body.incomeData.income);

    for (let i = 0; i < applicantArray.length; i++) {
      insuranceObj.applicantData.applicant.push({
        otherNation: req.body.applicantData.applicant[i].otherNation,
        nationality: req.body.applicantData.applicant[i].nationality,
        validFrom: req.body.applicantData.applicant[i].validFrom,
        validUntil: req.body.applicantData.applicant[i].validUntil,
        name: req.body.applicantData.applicant[i].name,
        birthDate: req.body.applicantData.applicant[i].birthDate,
        phoneNumber: req.body.applicantData.applicant[i].phoneNumber,
        email: req.body.applicantData.applicant[i].email,
        pesel: req.body.applicantData.applicant[i].pesel,
        contractFrom: req.body.applicantData.applicant[i].contractFrom,
        contractUntil: req.body.applicantData.applicant[i].contractUntil,
        averageIncome: req.body.applicantData.applicant[i].averageIncome,
        currency: req.body.applicantData.applicant[i].currency,
        pit: req.body.applicantData.applicant[i].pit,
        bank: req.body.applicantData.applicant[i].bank,
      });
    }
    insuranceObj.applicantData.applicant.shift();

    for (let i = 0; i < incomeArray.length; i++) {
      insuranceObj.incomeData.income.push({
        truckDriver: req.body.incomeData.income[i].truckDriver,
        industry: req.body.incomeData.income[i].industry,
        averageIncome: req.body.incomeData.income[i].averageIncome,
        bank: req.body.incomeData.income[i].bank,
        basicIncome: req.body.incomeData.income[i].basicIncome,
        contractUntil: req.body.incomeData.income[i].contractUntil,
        contractFrom: req.body.incomeData.income[i].contractFrom,
        currency: req.body.incomeData.income[i].currency,
        pit: req.body.incomeData.income[i].pit,
        accountancy: req.body.incomeData.income[i].accountancy,
        firstContract: req.body.incomeData.income[i].firstContract,
        sameEmployer: req.body.incomeData.income[i].sameEmployer,
        withoutPause: req.body.incomeData.income[i].withoutPause,
      });
    }
    insuranceObj.incomeData.income.shift();

    insuranceObj.markModified("applicantData", "incomeData", "loanData");
    await insuranceObj.save();

    res.status(200).send({
      message: "Application submitted",
    });
  }
);

export const loanMortgageSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const insuranceObj = await new loanMortgage(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "loan";
    insuranceObj.type = "mortgage";

    const applicantArray = Object.keys(req.body.applicantData.applicant);
    const incomeArray = Object.keys(req.body.incomeData.income);

    for (let i = 0; i < applicantArray.length; i++) {
      insuranceObj.applicantData.applicant.push({
        otherNation: req.body.applicantData.applicant[i].otherNation,
        nationality: req.body.applicantData.applicant[i].nationality,
        validFrom: req.body.applicantData.applicant[i].validFrom,
        validUntil: req.body.applicantData.applicant[i].validUntil,
        name: req.body.applicantData.applicant[i].name,
        birthDate: req.body.applicantData.applicant[i].birthDate,
        phoneNumber: req.body.applicantData.applicant[i].phoneNumber,
        email: req.body.applicantData.applicant[i].email,
        pesel: req.body.applicantData.applicant[i].pesel,
        contractFrom: req.body.applicantData.applicant[i].contractFrom,
        contractUntil: req.body.applicantData.applicant[i].contractUntil,
        averageIncome: req.body.applicantData.applicant[i].averageIncome,
        currency: req.body.applicantData.applicant[i].currency,
        pit: req.body.applicantData.applicant[i].pit,
        bank: req.body.applicantData.applicant[i].bank,
      });
    }
    insuranceObj.applicantData.applicant.shift();

    for (let i = 0; i < incomeArray.length; i++) {
      insuranceObj.incomeData.income.push({
        truckDriver: req.body.incomeData.income[i].truckDriver,
        industry: req.body.incomeData.income[i].industry,
        averageIncome: req.body.incomeData.income[i].averageIncome,
        bank: req.body.incomeData.income[i].bank,
        basicIncome: req.body.incomeData.income[i].basicIncome,
        contractUntil: req.body.incomeData.income[i].contractUntil,
        contractFrom: req.body.incomeData.income[i].contractFrom,
        currency: req.body.incomeData.income[i].currency,
        pit: req.body.incomeData.income[i].pit,
        accountancy: req.body.incomeData.income[i].accountancy,
        firstContract: req.body.incomeData.income[i].firstContract,
        sameEmployer: req.body.incomeData.income[i].sameEmployer,
        withoutPause: req.body.incomeData.income[i].withoutPause,
      });
    }
    insuranceObj.incomeData.income.shift();

    insuranceObj.markModified("applicantData", "incomeData", "loanData");
    await insuranceObj.save();

    res.status(200).send({
      message: "Application submitted",
    });
  }
);
