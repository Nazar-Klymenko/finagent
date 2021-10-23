import createError from "http-errors";
import User from "models/user.js";
// import asyncHandler from "helpers/asyncHandler.js";

import { auth } from "services/firebase";

export const signUp = async (req, res, next) => {
  const { name, surname, phone, language, IdToken, provider } = req.body;
  let { email } = req.body;

  if (email == "") {
    email = "-";
  }

  try {
    // const user = await User.findOne({ email: email });
    // if (user) {
    //   throw createError.Conflict(
    //     `user with such email (${email}) already exists`
    //   );
    // }

    const userObj = await new User({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      provider: provider,
      language: language,
    });

    const decodedToken = await auth.verifyIdToken(IdToken.i);

    userObj._id = decodedToken.uid;
    await userObj.save();

    res.status(200).send({
      message: "User signed up successfully, confirm email",
      displayName: `${name} ${surname}`,
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

export const signUpFacebook = async (req, res, next) => {
  const language = "pl";
  const { first_name, last_name, email } = req.body.additionalUserInfo.profile;
  let provider = req.body.additionalUserInfo.providerId;
  const { uid } = req.body.user;

  try {
    // const user = await User.findOne({ email: email });
    // if (user) {
    //   throw createError.Conflict(
    //     `user with such email (${email}) already exists`
    //   );
    // }

    const userObj = await new User({
      _id: uid,
      name: first_name,
      surname: last_name,
      email: email,
      provider: provider,
      language: language,
    });

    await userObj.save();

    res.status(200).send({
      message: "User signed up successfully, confirm email",
      displayName: `${first_name} ${last_name}`,
      isActive: false,
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};
