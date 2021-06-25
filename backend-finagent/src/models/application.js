import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const ApplicationSchema = new Schema(
  {
    user_id: { type: String, ref: "users" },
    assignedEmployee: { type: String, ref: "admins" },
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
        date: { type: Date },
        message: { type: String },
      },
    ],
    attachments: [
      {
        filename: String,
      },
    ],
    documents: [
      {
        filename: String,
      },
    ],
  },
  { timestamps: true, discriminatorKey: "applicationType" }
);

const Application = mongoose.model("applications", ApplicationSchema);

export default Application;
