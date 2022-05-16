import User from "models/user";
import { auth } from "services/firebase";

import { asyncHandler } from "helpers/asyncHandler";
import { Request, Response } from "express";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, phone, language, IdToken, provider } = req.body;
  let { email } = req.body;

  const userObj = new User({
    fullName: fullName,
    email: email,
    phone: phone,
    provider: provider,
    language: language,
  });

  const decodedToken = await auth.verifyIdToken(IdToken);

  userObj._id = decodedToken.uid;
  await userObj.save();

  res.status(200).send({
    message: "User signed up successfully, confirm email",
    displayName: fullName,
  });
});

export const signUpFacebook = asyncHandler(
  async (req: Request, res: Response) => {
    const language = "pl";
    const { name, email } = req.body.additionalInfo.profile;
    const { providerId } = req.body.additionalInfo;
    const uid = req.body.uid;

    const userObj = new User({
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
  }
);
