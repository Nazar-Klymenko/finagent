import insuranceTransport from "models/applications/insuranceTransport.js";

const insuranceTransportSubmit = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const insuranceObj = await new insuranceTransport(userInfo);

    insuranceObj.user_id = req.currentUser.uid;
    insuranceObj.category = "insurance";
    insuranceObj.type = "transport";

    // Object.entries(userInfo.appendedDocuments).forEach((fileArray) => {
    //   fileArray[1]?.length > 0 &&
    //     fileArray[1].forEach((file) => {
    //       insuranceObj.user_attachments.push({
    //         filename: file.path,
    //       });
    //     });
    // });

    insuranceObj.markModified(
      "personalData",
      "transportData",
      "specificData",
      "additionalData"
    );

    await insuranceObj.save();

    res.send({
      id: insuranceObj.id,
      user_attachments: insuranceObj.user_attachments,
      message: "Application submitted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);

    next(error);
  }
};
export default insuranceTransportSubmit;
