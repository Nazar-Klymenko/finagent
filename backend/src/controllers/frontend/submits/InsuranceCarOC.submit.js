import { attachImagesUser } from "@helpers/attachDocument";
import InsuranceCarOC from "@models/applications/insuranceCarOC.js";

export default async function InsuranceCarOCSubmit(req, res, next) {
  try {
    const userInfo = JSON.parse(req.body.information);
    const insuranceObj = await new InsuranceCarOC(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "OC";

    let files;

    if (req.files.files.length === undefined) {
      files = [req.files.files];
    } else {
      files = req.files.files;
    }

    insuranceObj.markModified(
      "personalData",
      "transportData",
      "specificData",
      "additionalData"
    );

    const updatedModel = await attachImagesUser(
      insuranceObj._id,
      files,
      insuranceObj
    );

    await updatedModel.save();

    res.status(200).send({
      message: "Application submitted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);

    next(error);
  }
}
