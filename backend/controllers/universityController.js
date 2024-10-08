import asyncHandler from "express-async-handler";
import Joi from "joi";
import University from "../models/universityModel.js";

// Joi schema for university data
const universitySchema = Joi.object({
  englishName: Joi.string().required(),
  vietName: Joi.string().required(),
  laoName: Joi.string().required(),
  shortcut: Joi.string().required(),
});

// @desc    Create a new university
// @route   POST /api/universities
// @access  Private
const createUniversity = asyncHandler(async (req, res) => {
  const { error } = universitySchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { englishName, vietName, laoName, shortcut } = req.body;

  // Check if the university with the given English name already exists
  const universityExists = await University.findOne({ shortcut });

  if (universityExists) {
    res.status(400);
    throw new Error("University already exists");
  }

  // Create a new university
  const university = await University.create({
    englishName,
    vietName,
    laoName,
    shortcut,
  });

  if (university) {
    res.status(201).json({
      _id: university._id,
      englishName: university.englishName,
      vietName: university.vietName,
      laoName: university.laoName,
      shortcut: university.shortcut,
    });
  } else {
    res.status(400);
    throw new Error("Invalid university data");
  }
});

// @desc    Update university profile
// @route   PUT /api/universitys/:id
// @access  Private
const updateUniversity = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { error } = universitySchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const universityId = req.params.id;
  const updatedUniversityData = req.body;

  // Check if the document with the given ID exists
  const existingUniversity = await University.findById(universityId);

  if (!existingUniversity) {
    res.status(404);
    throw new Error("University not found");
  }

  const updatedUniversity = await University.findByIdAndUpdate(
    universityId,
    { ...updatedUniversityData },
    {
      new: true,
    }
  );
  if (updatedUniversity) {
    res.json(updatedUniversity);
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Get all universitys
// @route   GET /api/universitys
// @access  Private/Admin
const getUniversities = asyncHandler(async (req, res) => {
  try {
    const universities = await University.find({});
    res.status(200).json(universities);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid university data");
  }
});

// @desc    Delete university
// @route   DELETE /api/universitys/:id
// @access  Private/Admin
const deleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.findById(req.params.id);
  if (university) {
    await University.deleteOne({ _id: req.params.id });
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Get university by ID
// @route   GET /api/universitys/:id
// @access  Private/Admin
const getUniversityById = asyncHandler(async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (university) {
      res.status(200).json(university);
    } else {
      res.status(404);
      throw new Error("University not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid university ID");
  }
});

export {
  getUniversities,
  updateUniversity,
  createUniversity,
  deleteUniversity,
  getUniversityById,
};

// import asyncHandler from "express-async-handler";
// import University from "../models/universityModel.js";

// // @desc    Create a new university
// // @route   POST /api/universities
// // @access  Private
// const createUniversity = asyncHandler(async (req, res) => {
//   const { englishName, vietName, laoName, shortcut } = req.body;

//   // Check if the university with the given English name already exists
//   const universityExists = await University.findOne({ shortcut });

//   if (universityExists) {
//     res.status(400);
//     throw new Error("University already exists");
//   }

//   // Create a new university
//   const university = await University.create({
//     englishName,
//     vietName,
//     laoName,
//     shortcut,
//   });

//   if (university) {
//     res.status(201).json({
//       _id: university._id,
//       englishName: university.englishName,
//       vietName: university.vietName,
//       laoName: university.laoName,
//       shortcut: university.shortcut,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid university data");
//   }
// });

// // @desc    Update university profile
// // @route   PUT /api/universitys
// // * @access  Private
// const updateUniversity = asyncHandler(async (req, res) => {
//   const universityId = req.params.id;
//   const updatedUniversityData = req.body;

//   // Check if the document with the given ID exists
//   const existingUniversity = await University.findById(universityId);

//   if (!existingUniversity) {
//     res.status(404);
//     throw new Error("University not found");
//   }

//   const updatedUniversity = await University.findByIdAndUpdate(
//     universityId,
//     { ...updatedUniversityData },
//     {
//       new: true,
//     }
//   );
//   if (updatedUniversity) {
//     res.json(updatedUniversity);
//   } else {
//     res.status(404);
//     throw new Error("University not found");
//   }
// });

// // @desc    Get all universitys
// // @route   GET /api/universitys
// // @access  Private/Admin
// const getUniversities = asyncHandler(async (req, res) => {
//   try {
//     const universities = await University.find({});
//     res.status(200).json(universities);
//   } catch (error) {
//     res.status(400);
//     throw new Error("Invalid university data");
//   }
// });

// // @desc    Delete university
// // @route   DELETE /api/universitys/:id
// // @access  Private/Admin
// const deleteUniversity = asyncHandler(async (req, res) => {
//   const university = await University.findById(req.params.id);
//   if (university) {
//     await University.deleteOne({ _id: req.params.id });
//     res.json({ _id: req.params.id });
//   } else {
//     res.status(404);
//     throw new Error("University not found");
//   }
// });

// // @desc    Get university by ID
// // @route   GET /api/universitys/:id
// // @access  Private/Admin
// const getUniversityById = asyncHandler(async (req, res) => {
//   try {
//     const university = await University.findById(req.params.id);
//     if (university) {
//       res.status(200).json(university);
//     } else {
//       res.status(404);
//       throw new Error("University not found");
//     }
//   } catch (error) {
//     res.status(400);
//     throw new Error("Invalid university ID");
//   }
// });

// export {
//   getUniversities,
//   updateUniversity,
//   createUniversity,
//   deleteUniversity,
//   getUniversityById,
// };
