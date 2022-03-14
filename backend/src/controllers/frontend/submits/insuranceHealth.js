import insuranceHealth from "models/applications/insuranceHealth.js";

const InsuranceHealthSubmit = async (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceHealthSubmit;
