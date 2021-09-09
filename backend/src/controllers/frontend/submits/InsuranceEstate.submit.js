import insuranceEstate from "models/applications/insuranceEstate.js";

const InsuranceEstateSubmit = async (req, res, next) => {
  try {
    //
    const insuranceObj = await new insuranceEstate(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "Estate";

    insuranceObj.markModified("InsuranceData", "PersonalData");
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceEstateSubmit;
