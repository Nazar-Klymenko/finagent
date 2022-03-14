import insuranceBorder from "models/applications/insuranceBorder.js";

const InsuranceBorderSubmit = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const insuranceObj = await new insuranceBorder(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "border";

    insuranceObj.markModified("insuranceData", "vehicleData", "personalData");
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

export default InsuranceBorderSubmit;
