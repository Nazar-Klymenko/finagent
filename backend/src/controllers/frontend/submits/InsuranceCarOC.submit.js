import InsuranceCarOC from "models/applications/insuranceCarOC.js";
import { attachImagesUser } from "helpers/attachDocument";

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
      "PersonalData",
      "TransportData",
      "SpecificData",
      "AdditionalData"
    );

    const updatedModel = await attachImagesUser(files, insuranceObj);

    await updatedModel.save();

    res.status(200).send({
      message: "Application submitted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);

    next(error);
  }
}
