import createError from "http-errors";
import User from "models/user.js";
// import asyncHandler from "helpers/asyncHandler.js";
import { auth } from "services/firebase";

export const signUp = async (req, res, next) => {
  const { fullName, phone, language, IdToken, provider } = req.body;
  let { email } = req.body;
  try {
    const userObj = await new User({
      fullName: fullName,
      email: email,
      phone: phone,
      provider: provider,
      language: language,
    });
    console.log(IdToken);
    const decodedToken = await auth.verifyIdToken(IdToken);

    userObj._id = decodedToken.uid;
    await userObj.save();

    res.status(200).send({
      message: "User signed up successfully, confirm email",
      displayName: fullName,
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export const signUpFacebook = async (req, res, next) => {
  const language = "pl";
  const { name, email } = req.body.additionalInfo.profile;
  const { providerId } = req.body.additionalInfo;
  const uid = req.body.uid;
  try {
    const userObj = await new User({
      _id: uid,
      fullName: name,
      email: email,
      provider: providerId,
      language: language,
    });

    await userObj.save();

    res.status(200).send({
      message: "User signed up successfully, confirm email",
      displayName: name,
      isActive: false,
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    let isEmailVerified;
    await auth.getUserByEmail(email).then((userRecord) => {
      isEmailVerified = userRecord.emailVerified;
    });

    res.status(200).send({
      message: "User email verified",
      isActive: isEmailVerified,
    });
  } catch (error) {
    next(error);
  }
};
