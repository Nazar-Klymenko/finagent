import Admin from "@models/admin.js";
import { adminAuth } from "@services/firebase";
import createError from "http-errors";

export const signUp = async (req, res, next) => {
  const { name, surname, email, secret, IdToken } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      throw createError.Conflict(
        `administator with such email (${email}) already exists`
      );
    }

    const AdminObj = await new Admin({
      name: name,
      surname: surname,
      email: email,
      secret: secret,
    });

    const decodedToken = await adminAuth.verifyIdToken(IdToken);

    AdminObj._id = decodedToken.uid;
    await AdminObj.save();

    res.status(200).send({
      message: "User signed up successfully",
      displayName: `${name} ${surname}`,
    });
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
};

export const fetchUser = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.currentUser.uid);
    res.status(200).send({ admin });
  } catch (error) {
    next(error);
  }
};
