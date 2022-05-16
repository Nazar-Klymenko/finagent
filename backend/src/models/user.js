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
    isAdmin: { type: Boolean, default: false },
    isSupervisor: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isAwaitingApproval: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    signupSecret: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);
export default User;
