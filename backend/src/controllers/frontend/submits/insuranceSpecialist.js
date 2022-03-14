import insuranceSpecialist from "models/applications/insuranceSpecialist.js";

const InsuranceSpecialistSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceSpecialist(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "specialist";

    const userArray = Object.keys(req.body.insuredData.policyholder);

    for (let i = 0; i < userArray.length; i++) {
      insuranceObj.insuredData.policyholder.push({
        policyholderIs: req.body.insuredData.policyholder[i].policyholderIs,
        name: req.body.insuredData.policyholder[i].name,
        nip: req.body.insuredData.policyholder[i].nip,
        birthDate: req.body.insuredData.policyholder[i].birthDate,
        pesel: req.body.insuredData.policyholder[i].pesel,
        regon: req.body.insuredData.policyholder[i].regon,
        phoneNumber: req.body.insuredData.policyholder[i].phoneNumber,
        email: req.body.insuredData.policyholder[i].email,
        country: req.body.insuredData.policyholder[i].country,
        city: req.body.insuredData.policyholder[i].city,
        postIndex: req.body.insuredData.policyholder[i].postIndex,
        street: req.body.insuredData.policyholder[i].street,
        houseNumber: req.body.insuredData.policyholder[i].houseNumber,
      });
    }
    insuranceObj.insuredData.policyholder.shift();

    insuranceObj.markModified("personalData", "insuredData");
    await insuranceObj.save();

    res.status(200).send({
      message: "Application submitted",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceSpecialistSubmit;
