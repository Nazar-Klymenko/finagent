import insuranceHealthSpecialist from "models/applications/insuranceHealthSpecialist.js";

const InsuranceHealthSpecialistSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceHealthSpecialist(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "HealthSpecialist";

    const userArray = Object.keys(req.body.InsuredData);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.InsuredData.push({
        policyholderIs: req.body.InsuredData[i].policyholderIs,
        name: req.body.InsuredData[i].name,
        surname: req.body.InsuredData[i].surname,
        nip: req.body.InsuredData[i].nip,
        birthDate: req.body.InsuredData[i].birthDate,
        pesel: req.body.InsuredData[i].pesel,
        regon: req.body.InsuredData[i].regon,
        phoneNumber: req.body.InsuredData[i].phoneNumber,
        email: req.body.InsuredData[i].email,
        country: req.body.InsuredData[i].country,
        city: req.body.InsuredData[i].city,
        postIndex: req.body.InsuredData[i].postIndex,
        street: req.body.InsuredData[i].street,
        houseNumber: req.body.InsuredData[i].houseNumber,
      });
    }
    insuranceObj.InsuredData.shift();

    insuranceObj.markModified("PersonalData", "InsuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceHealthSpecialistSubmit;
