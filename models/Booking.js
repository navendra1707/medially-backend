import mongoose from "mongoose";

export const BookingSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
    },
    number: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
