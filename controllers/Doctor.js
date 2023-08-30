import Doctor from "../models/Doctor.js";

export const findBySymptoms = async (req, res) => {
  try {
    const { specializations, queryParams } = req.body;
    const page = +req.query.page || 1;
    const regexPatterns = specializations.map(
      (value) => new RegExp(value, "i")
    );
    const query = {
      $and: [
        {correctSpecialization: { $in: regexPatterns }},
        {$or: [
          {fullName: {$regex: queryParams, $options: 'i'}},
          {firstName: {$regex: queryParams, $options: 'i'}},
          {lastName: {$regex: queryParams, $options: 'i'}},
          {middleName: {$regex: queryParams, $options: 'i'}}
        ]},
      ],
    }

    const doctors = await Doctor.find(query)
      .skip(10 * (page - 1))
      .limit(10);

    const totalDoctors = await Doctor.find(query).countDocuments();

    res.status(200).json({
      doctors,
      metaData: {
        totalDoctors,
        doctorsPerPage: 10,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getIndividualDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    res.status(200).json({
      doctor,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
