import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const ApplicationSchema = new Schema(
  {
    user_id: String,
    employee_id: String,
    category: String,
    type: String,
    status: {
      type: String,
      default: "1",
    },
    archived: {
      type: Boolean,
      default: false,
    },
    feedback: [
      {
        date: Date,
        message: String,
      },
    ],
    user_attachments: [
      {
        filename: String,
      },
    ],
    admin_attachments: [
      {
        filename: String,
      },
    ],
  },
  { timestamps: true, discriminatorKey: "applicationType" }
);
ApplicationSchema.set("toObject", { virtuals: true });
ApplicationSchema.set("toJSON", { virtuals: true });

ApplicationSchema.virtual("user", {
  ref: "users",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});
ApplicationSchema.virtual("employee", {
  ref: "admins",
  localField: "employee_id",
  foreignField: "_id",
  justOne: true,
});

const Application = mongoose.model("applications", ApplicationSchema);

export default Application;
