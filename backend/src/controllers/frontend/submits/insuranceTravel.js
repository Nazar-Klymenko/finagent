import insuranceTravel from "models/applications/insuranceTravel.js";

const InsuranceTravelSubmit = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const insuranceObj = await new insuranceTravel(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "travel";

    insuranceObj.markModified("insuranceData", "personalData");

    await insuranceObj.save();

    res.send({
      id: insuranceObj.id,
      message: "Application submitted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);

    next(error);
  }
};

export default InsuranceTravelSubmit;
