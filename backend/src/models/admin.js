import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    _id: { type: String },
    name: String,
    surname: String,
    email: {
      type: String,
      unique: true,
    },
    isApproved: { type: Boolean, default: false },
    secret: String,
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admins", AdminSchema);
export default Admin;
