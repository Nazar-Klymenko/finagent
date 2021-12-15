import loanCash from "@models/applications/loanCash.js";

const LoanCashSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new loanCash(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "loan";
    insuranceObj.type = "Cash";

    const incomeArray = Object.keys(req.body.additionalIncome);

    for (let i = 0; i < incomeArray.length; i++) {
      insuranceObj.additionalIncome.push({
        truckDriver: req.body.additionalIncome[i].truckDriver,
        industry: req.body.additionalIncome[i].industry,
        averageIncome: req.body.additionalIncome[i].averageIncome,
        bank: req.body.additionalIncome[i].bank,
        basicIncome: req.body.additionalIncome[i].basicIncome,
        contractUntil: req.body.additionalIncome[i].contractUntil,
        contractFrom: req.body.additionalIncome[i].contractFrom,
        currency: req.body.additionalIncome[i].currency,
        pit: req.body.additionalIncome[i].pit,
        accountancy: req.body.additionalIncome[i].accountancy,
        firstContract: req.body.additionalIncome[i].firstContract,
        sameEmployer: req.body.additionalIncome[i].sameEmployer,
        withoutPause: req.body.additionalIncome[i].withoutPause,
      });
    }
    insuranceObj.additionalIncome.shift();

    insuranceObj.markModified(
      "applicants",
      "applicantsData",
      "additionalIncome",
      "loanData"
    );
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default LoanCashSubmit;
