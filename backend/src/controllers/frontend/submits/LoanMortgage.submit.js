import loanMortgage from "@models/applications/loanMortgage.js";

const LoanMortgageSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new loanMortgage(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "loan";
    insuranceObj.type = "Mortgage";

    const incomeArray = Object.keys(req.body.additionalIncome);
    const householdArray = Object.keys(req.body.householdData);

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

    for (let i = 0; i < householdArray.length; i++) {
      insuranceObj.householdData.push({
        peopleInHousehold: req.body.householdData[i].peopleInHousehold,
        monthlyExpenses: req.body.householdData[i].monthlyExpenses,
      });
    }
    insuranceObj.householdData.shift();

    insuranceObj.markModified(
      "applicants",
      "applicantsData",
      "additionalIncome",
      "householdData",
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

export default LoanMortgageSubmit;
