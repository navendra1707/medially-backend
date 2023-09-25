import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    salutation: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    middleName: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    correctSpecialization: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    areaOfPractice: {
        type: Array,
        required: true,
        default: []
    },
    clinic_hospital: {
        type: String
    },
    practiceSince: {
        type: String,
    },
    yearOfExperience: {
        type: String
    },
    hospital: {
        type: Array,
        default: []
    },
    phoneNumber: {
        type: String,
    },
    userId: {
        type: String
    },
    password: {
        type: String
    },
    clinicTiming: String,
    fees: String
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;