import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user_id: String,
    header: String,
    content: String,
    read: {
      type: Boolean,
      default: false,
    },
    type: String,
    app_id: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notifications", NotificationSchema);
export default Notification;
