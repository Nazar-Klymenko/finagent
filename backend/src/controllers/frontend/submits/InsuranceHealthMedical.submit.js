import insuranceHealthMedical from "models/applications/insuranceHealthMedical.js";

const InsuranceHealthMedicalSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceHealthMedical(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "HealthMedical";

    const userArray = Object.keys(req.body.insuredData);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.push({
        policyholderIs: req.body.insuredData[i].policyholderIs,
        citizenship: req.body.insuredData[i].citizenship,
        documentAdded: req.body.insuredData[i].documentAdded,
        documentType: req.body.insuredData[i].documentType,
        name: req.body.insuredData[i].name,
        surname: req.body.insuredData[i].surname,
        birthDate: req.body.insuredData[i].birthDate,
        country: req.body.insuredData[i].country,
        city: req.body.insuredData[i].city,
        postIndex: req.body.insuredData[i].postIndex,
        street: req.body.insuredData[i].street,
        houseNumber: req.body.insuredData[i].houseNumber,
      });
    }
    insuranceObj.insuredData.shift();

    insuranceObj.markModified("insuranceData", "insuredData");
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
