import insuranceHealthMedical from "models/applications/insuranceHealthMedical.js";

const InsuranceHealthMedicalSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceHealthMedical(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "HealthMedical";

    const userArray = Object.keys(req.body.InsuredData);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.InsuredData.push({
        policyholderIs: req.body.InsuredData[i].policyholderIs,
        citizenship: req.body.InsuredData[i].citizenship,
        documentAdded: req.body.InsuredData[i].documentAdded,
        documentType: req.body.InsuredData[i].documentType,
        name: req.body.InsuredData[i].name,
        surname: req.body.InsuredData[i].surname,
        birthDate: req.body.InsuredData[i].birthDate,
        country: req.body.InsuredData[i].country,
        city: req.body.InsuredData[i].city,
        postIndex: req.body.InsuredData[i].postIndex,
        street: req.body.InsuredData[i].street,
        houseNumber: req.body.InsuredData[i].houseNumber,
      });
    }
    insuranceObj.InsuredData.shift();

    insuranceObj.markModified("InsuranceData", "InsuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceHealthMedicalSubmit;
