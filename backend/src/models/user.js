import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: String,
    fullName: String,
    email: String,
    phone: String,
    isActive: Boolean,
    provider: String,
    language: String,
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  }
);

const User = mongoose.model("users", UserSchema);
export default User;
