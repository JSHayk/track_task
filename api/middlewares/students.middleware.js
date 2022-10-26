import studentValidation from "../validations/student.validation.js";

const checkStudentValidations = (req, res, next) => {
  const { firstName, lastName, email, phone, dateOfBirth, favoriteSports } =
    req.body;

  if (
    !studentValidation.isNameValidated(firstName) ||
    !studentValidation.isNameValidated(lastName)
  )
    return res.json({
      message: "The first name or last name must have min 3 charters",
    });

  if (!studentValidation.isEmailValidated(email))
    return res.json({ message: "The email is invalid!" });

  next();
};

function checkStudentFields(req, res, next) {
  const { firstName, lastName, email, phone, dateOfBirth, favoriteSports } =
    req.body;

  if (!firstName || !lastName || !email || !phone || !dateOfBirth)
    return res.json({ message: "The all fields must be!!!" });

  next();
}

export default {
  checkStudentValidations,
  checkStudentFields,
};
