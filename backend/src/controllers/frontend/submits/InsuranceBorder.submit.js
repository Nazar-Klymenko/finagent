import insuranceBorder from "../../../@models/applications/insuranceBorder.js";

const InsuranceBorderSubmit = async (req, res, next) => {
  try {
    const insuranceObj = await new insuranceBorder(req.body);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "Border";

    insuranceObj.markModified("insuranceData", "vehicleData", "personalData");
    await insuranceObj.save();

    res.status(200).send({
      message: "app added",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export default InsuranceBorderSubmit;
