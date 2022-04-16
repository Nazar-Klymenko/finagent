import Application from "models/application";
import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";

import { pagination } from "helpers/pagination";

// import User from "models/user";
import { Request, Response } from "express";

export const getAllAplications = asyncHandler(
  async (req: Request, res: Response) => {
    let { page = "1" as string, size = "4" as string } = req.query as any;

    const { skip, limit } = pagination(page, size);

    let filters = {
      archived: false,
    };

    let applications = await Application.find(
      filters,
      "_id user_id employee_id user status type category createdAt updatedAt"
    )
      .populate("user")
      .populate("employee")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    let maximumPages = await Application.find(filters).countDocuments();
    maximumPages = Math.ceil(maximumPages / +size);

    let data = { applications, maximumPages };
    res.send(data);
  }
);
export const getAllAplicationsForAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    let { page = "1" as string, size = "4" as string } = req.query as any;

    const { skip, limit } = pagination(page, size);

    let filters = {
      employee_id: req.currentUser.uid,
      archived: false,
    };

    let applications = await Application.find(
      filters,
      "_id user_id employee_id user status type category createdAt updatedAt"
    )
      .populate("user")
      .populate("employee")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    let maximumPages = await Application.find(filters).countDocuments();
    maximumPages = Math.ceil(maximumPages / +size);

    let data = { applications, maximumPages };
    res.send(data);
  }
);

export const assignApplication = asyncHandler(
  async (req: Request, res: Response) => {
    const application = await Application.findById(req.params.id);

    if (
      application.employee_id != undefined ||
      application.employee_id != null
    ) {
      throw new createError.BadRequest();
    }

    application.employee_id = req.currentUser.uid;
    application.save();

    res.status(200).send({ message: "application assigned successfully" });
  }
);

export const updateStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const application = await Application.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    res.status(200).send({ message: "application updated successfully" });
  }
);

export const getSpecificApplication = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await Application.findOne({
      _id: req.params.id,
    })
      .populate("user")
      .populate("employee");

    if (!data) {
      throw new createError.Forbidden();
    } else if (data.length === 0) {
      throw new createError.Forbidden();
    }
    res.send(data);
  }
);
export const getAllApplicationsForUser = asyncHandler(
  async (req: Request, res: Response) => {
    const ApplicationList = await Application.find({
      user_id: req.params.id,
    })
      .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
      .populate(
        "employee",
        "-__v -password -isActive -createdAt -updatedAt -phone"
      );

    if (!ApplicationList) {
      res.send({ message: "You don't have any applications" });
    }
    res.send({
      ApplicationList,
    });
  }
);

// export const assignApplication = asyncHandler(
//   async (req: Request, res: Response) => {
//     const application = await Application.findById(req.params.id);

//     if (application.employee_id != undefined) {
//       throw new createError.BadRequest();
//     } else if (application.employee_id != null) {
//       throw new createError.BadRequest();
//     }

//     application.employee_id = req.currentUser.uid;
//     application.save();

//     res.status(200).send({ message: "application assigned successfully" });
//   }
// );

// export const returnApplication = asyncHandler(
//   async (req: Request, res: Response) => {
//     const application = await Application.findById(req.params.id);

//     // if (application.employee_id != req.currentUser.uid) {
//     //   if (!req.isSupervisor) {
//     //     throw new createError.BadRequest();
//     //   }
//     // }

//     application.employee_id = null;
//     application.save();

//     res.status(200).send({ message: "application assigned successfully" });
//   }
// );

// export const updateFeedback = asyncHandler(
//   async (req: Request, res: Response) => {
//     const application = await Application.findByIdAndUpdate(
//       req.params.id,
//       { $push: { feedback: { message: req.body.feedback, date: Date.now() } } },
//       { upsert: true, new: true }
//     )
//       .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
//       .populate(
//         "employee",
//         "-_id -__v -password -isActive -createdAt -updatedAt -phone"
//       );

//     res.status(200).send({ application });
//   }
// );

// export const updateStatus = asyncHandler(
//   async (req: Request, res: Response) => {
//     const application = await Application.findByIdAndUpdate(req.params.id, {
//       status: req.body.status,
//     });

//     res.status(200).send({ message: "application updated successfully" });
//   }
// );

// export const archiveApplication = asyncHandler(
//   async (req: Request, res: Response) => {
//     const application = await Application.findById(req.params.id);

//     application.archived = true;
//     application.save();

//     res.status(200).send({ message: "application archived successfully" });
//   }
// );
