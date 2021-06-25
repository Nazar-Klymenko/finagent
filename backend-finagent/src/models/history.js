import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    assignedEmployee: { type: String, ref: "admins" },
    action: String,
    description: String,
    application: mongoose.ObjectId,
  },
  { timestamps: true }
);

const History = mongoose.model("history", HistorySchema);

export default History;
