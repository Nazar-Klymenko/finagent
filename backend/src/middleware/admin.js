import createError from "http-errors";
import Admin from "models/admin";

export const verifyAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.currentUser.uid);

    if (
      (admin.role === "admin" && admin.isApproved) ||
      (admin.role === "supervisor" && admin.isApproved)
    ) {
      next();
    } else {
      throw createError.Forbidden();
    }
  } catch (error) {
    next(error);
  }
};

export const verifySupervisor = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.currentUser.uid);

    if (admin.role === "supervisor" && admin.isApproved) {
      req.isSupervisor = true;
      next();
    } else {
      throw createError.Forbidden();
    }
  } catch (error) {
    next(error);
  }
};
