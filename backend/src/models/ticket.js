import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("tickets", TicketSchema);
export default Ticket;
