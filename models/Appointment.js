import mongoose from "mongoose";
import { BookingSchema } from "./Booking.js";

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    bookings: {
        type: [BookingSchema],
        default: []
    },
    currentNumber: {
        type: Number
    },
    currentPatientId: {
        type: String
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;