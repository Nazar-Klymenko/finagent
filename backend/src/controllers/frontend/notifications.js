import Notification from "models/notification.js";
import asyncHandler from "helpers/asyncHandler.js";

export const getAllNotifications = asyncHandler(async (req, res, next) => {
  const NotificationList = await Notification.find({
    user_id: String(req.currentUser.uid),
  });
  NotificationList.reverse();
  res.send({
    NotificationList,
  });
});

export const getNewNotifications = asyncHandler(async (req, res, next) => {
  const NotificationList = await Notification.find({
    user_id: String(req.currentUser.uid),
    read: false,
  });

  res.send(!!NotificationList.length);
});

export const getSpecificNotification = asyncHandler(async (req, res, next) => {
  const SpecificNotification = await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.currentUser.uid,
    },
    { read: true },
    { new: true }
  );

  if (!SpecificNotification) {
    res.send({ message: "You don't have any notifications" });
  }

  res.send({
    SpecificNotification,
  });
});
