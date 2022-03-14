import insuranceHealthMedical from "models/applications/insuranceHealthMedical.js";

const InsuranceHealthSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceHealthMedical(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "health";

    const userArray = Object.keys(req.body.insuredData);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.policyholder.push({
        policyholderIs: req.body.insuredData[i].policyholder.policyholderIs,
        citizenship: req.body.insuredData[i].policyholder.citizenship,
        documentAdded: req.body.insuredData[i].policyholder.documentAdded,
        documentType: req.body.insuredData[i].policyholder.documentType,
        name: req.body.insuredData[i].policyholder.name,
        surname: req.body.insuredData[i].policyholder.surname,
        birthDate: req.body.insuredData[i].policyholder.birthDate,
        country: req.body.insuredData[i].policyholder.country,
        city: req.body.insuredData[i].policyholder.city,
        postIndex: req.body.insuredData[i].policyholder.postIndex,
        street: req.body.insuredData[i].policyholder.street,
        houseNumber: req.body.insuredData[i].policyholder.houseNumber,
      });
    }
    insuranceObj.insuredData.policyholder.shift();

    insuranceObj.markModified("insuranceData", "insuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "application submitted",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceHealthSubmit;
