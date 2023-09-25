import Appointment from "../models/Appointment.js";
import Booking from "../models/Booking.js";

export const bookAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            doctorName,
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

        let tokenNumber = appointment.tokenNumber;

        const booking = new Booking({
            patientId,
            patientName,
            doctorId,
            doctorName,
            date,
            appointmentId: appointment._id,
            number: tokenNumber
        });

        await booking.save();
        appointment.bookings.push(booking._id);

        appointment = await Appointment.findByIdAndUpdate(
            appointment._id,
            {
                bookings: appointment.bookings,
                tokenNumber: tokenNumber + 1
            },
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

export const getAllBookingsOfUser = async (req, res) => {
    try {
        const {userId} = req.query;
        console.log(userId)
        
        const bookings = await Booking.find({patientId: userId}).sort({ createdAt: "descending" });

        res.status(200).json({
            bookings
        });
    } catch (err) {
        res.status(404).json({
            message: 'Bookings not found.'
        })
    }
}

export const getAllAppointmentBookings = async (req, res) => {
    try {
        const {doctorId, date} = req.body;

        const appointment = await Appointment.findOne({
            $and: [
                {doctorId: doctorId},
                {date: date}
            ]
        });
        
        if(!appointment){
            res.status(404).json({
                appointment: null,
                booking: null
            });
            return;
        }

        const bookingIds = appointment.bookings.map(b => b._id);
        const bookings = await Booking.find({
            _id: {$in: bookingIds}
        });
        console.log(bookings);

        res.status(200).json({
            appointment,
            bookings
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const markCompleted = async (req, res) => {
    try {
        const {bookingId} = req.query;

        let booking = await Booking.findById(bookingId);

        if(!booking){
            throw new Error("Booking not Found.");
        }

        const appointmentId = booking.appointmentId;
        let appointment = await Appointment.findById(appointmentId);

        appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            {
                currentNumber: appointment.currentNumber + 1
            },
            {new: true}
        );

        booking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                status: 'completed'
            },
            {new: true}
        );

        res.status(201).json({
            appointment,
            booking
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const fetchUpdate = async (req, res) => {
    try {
        const {bookingId} = req.query;

        const booking = await Booking.findById(bookingId);
        if(!booking){
            throw new Error("Booking not found");
        }
        const appointment = await Appointment.findById(booking.appointmentId);
        if(!appointment){
            throw new Error("Booking not found");
        }
        
        res.status(200).json({
            booking,
            currentNumber: appointment.currentNumber,
            number: booking.number
        });
    } catch (err){
        res.status(404).json({
            message: err.message
        });
    }
}