import insuranceHealthSpecialist from "@models/applications/insuranceHealthSpecialist.js";

const InsuranceHealthSpecialistSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceHealthSpecialist(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "HealthSpecialist";

    const userArray = Object.keys(req.body.insuredData);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.push({
        policyholderIs: req.body.insuredData[i].policyholderIs,
        name: req.body.insuredData[i].name,
        surname: req.body.insuredData[i].surname,
        nip: req.body.insuredData[i].nip,
        birthDate: req.body.insuredData[i].birthDate,
        pesel: req.body.insuredData[i].pesel,
        regon: req.body.insuredData[i].regon,
        phoneNumber: req.body.insuredData[i].phoneNumber,
        email: req.body.insuredData[i].email,
        country: req.body.insuredData[i].country,
        city: req.body.insuredData[i].city,
        postIndex: req.body.insuredData[i].postIndex,
        street: req.body.insuredData[i].street,
        houseNumber: req.body.insuredData[i].houseNumber,
      });
    }
    insuranceObj.insuredData.shift();

    insuranceObj.markModified("personalData", "insuredData");
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
