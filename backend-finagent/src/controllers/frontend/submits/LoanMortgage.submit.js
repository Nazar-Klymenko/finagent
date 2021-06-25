import loanMortgage from "models/applications/loanMortgage.js";

const LoanMortgageSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new loanMortgage(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "loan";
    insuranceObj.type = "Mortgage";

    const incomeArray = Object.keys(req.body.AdditionalIncome);
    const householdArray = Object.keys(req.body.HouseholdData);

    for (let i = 0; i < incomeArray.length; i++) {
      insuranceObj.AdditionalIncome.push({
        truckDriver: req.body.AdditionalIncome[i].truckDriver,
        industry: req.body.AdditionalIncome[i].industry,
        averageIncome: req.body.AdditionalIncome[i].averageIncome,
        bank: req.body.AdditionalIncome[i].bank,
        basicIncome: req.body.AdditionalIncome[i].basicIncome,
        contractUntil: req.body.AdditionalIncome[i].contractUntil,
        contractFrom: req.body.AdditionalIncome[i].contractFrom,
        currency: req.body.AdditionalIncome[i].currency,
        pit: req.body.AdditionalIncome[i].pit,
        accountancy: req.body.AdditionalIncome[i].accountancy,
        firstContract: req.body.AdditionalIncome[i].firstContract,
        sameEmployer: req.body.AdditionalIncome[i].sameEmployer,
        withoutPause: req.body.AdditionalIncome[i].withoutPause,
      });
    }
    insuranceObj.AdditionalIncome.shift();

    for (let i = 0; i < householdArray.length; i++) {
      insuranceObj.HouseholdData.push({
        peopleInHousehold: req.body.HouseholdData[i].peopleInHousehold,
        monthlyExpenses: req.body.HouseholdData[i].monthlyExpenses,
      });
    }
    insuranceObj.HouseholdData.shift();

    insuranceObj.markModified(
      "Applicants",
      "ApplicantsData",
      "AdditionalIncome",
      "HouseholdData",
      "LoanData"
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
