import User from "models/user";

import { auth } from "services/firebase";

import { asyncHandler } from "helpers/asyncHandler";
import { Request, Response } from "express";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, phone, language, secret, IdToken, provider } = req.body;
  let { email } = req.body;

  const userObj = new User({
    fullName: fullName,
    email: email,
    phone: phone,
    provider: provider,
    language: language,
    signupSecret: secret,
    isAdmin: true,
    isApproved: false,
  });

  const decodedToken = await auth.verifyIdToken(IdToken);

  userObj._id = decodedToken.uid;
  await userObj.save();

  res.status(200).send({
    message: "User signed up successfully, confirm email",
    displayName: fullName,
  });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser.uid);

  res.status(200).send({
    user: user,
  });
});
