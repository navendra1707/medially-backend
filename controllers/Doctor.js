import Doctor from "../models/Doctor.js";

export const findBySymptoms = async (req, res) => {
  try {
    const { specializations } = req.body;
    const page = +req.query.page || 1;

    const doctors = await Doctor.find({
      correctSpecialization: { $in: specializations },
    })
      .skip(10 * (page - 1))
      .limit(10);

    const totalDoctors = await Doctor.find({
        correctSpecialization: { $in: specializations },
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
