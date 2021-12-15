import Notification from "@models/notification.js";

const sendNotification = async (
  user_id,
  header,
  content,
  type,
  app_id,
  next
) => {
  try {
    const notification = await new Notification({
      user_id: user_id,
      header: header,
      content: content,
      type: type,
      app_id: app_id,
    });
    notification.save();
  } catch (error) {
    next(error);
  }
};
export default sendNotification;
