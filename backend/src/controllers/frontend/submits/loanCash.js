import loanCash from "models/applications/loanCash.js";

const LoanCashSubmit = async (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default LoanCashSubmit;
