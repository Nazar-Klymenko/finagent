import insuranceTravel from "models/applications/insuranceTravel.js";

const InsuranceTravelSubmit = async (req, res, next) => {
  try {
    //
    const insuranceObj = await new insuranceTravel(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "Travel";

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

export default InsuranceTravelSubmit;
