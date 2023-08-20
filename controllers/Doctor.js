import Doctor from "../models/Doctor.js";

export const findBySymptoms = async (req, res) => {
  try {
    const { specializations } = req.body;
    console.log(specializations);
    const page = +req.query.page || 1;
    const regexPatterns = specializations.map(value => new RegExp(value, 'i'));

    const doctors = await Doctor.find({
      correctSpecialization: { $in: regexPatterns },
    })
      .skip(10 * (page - 1))
      .limit(10);

    const totalDoctors = await Doctor.find({
        correctSpecialization: { $in: regexPatterns },
      }).countDocuments();

    res.status(200).json({
      doctors,
      metaData: {
        totalDoctors,
        doctorsPerPage: 10
      }
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getIndividualDoctor = async (req, res) => {
  try {
    const {id} = req.params;
    const doctor = await Doctor.findById(id);

    if(!doctor){
      throw new Error("Doctor not found.");
    }

    res.status(200).json({
      doctor
    });
  } catch(err) {
    res.status(404).json({
      message: err.message
    });
  }
}