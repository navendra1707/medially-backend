import Appointment from "../models/Appointment.js";
import Booking from "../models/Booking.js";

export const bookAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            date, 
            patientId,
            patientName,
        } = req.body;

        let appointment = await Appointment.findOne({
            $and: [
                {date: date},
                {doctorId: doctorId}
            ]
        });

        if(!appointment){
            appointment = new Appointment({
                date,
                doctorId,
            });
            await appointment.save();
        }

        const booking = new Booking({
            patientId,
            patientName,
            doctorId,
            appointmentId: appointment._id
        });

        await booking.save();
        appointment.bookings.push(booking._id);

        appointment = await Appointment.findByIdAndUpdate(
            appointment._id,
            {bookings: appointment.bookings},
            {new: true}
        );
        res.status(201).json({
            appointment,
            booking,
            message: 'Appointment Booked!!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}