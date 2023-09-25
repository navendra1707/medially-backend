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
        type: Number,
        default: 1
    },
    currentPatientId: {
        type: String
    },
    tokenNumber: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;