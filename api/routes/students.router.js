import express from "express";
import studentsController from "../controllers/students.controller.js";
import checkEmptyBody from "../helpers/checkEmptyBody.js";
import studentsMiddleware from "../middlewares/students.middleware.js";

const router = express();

// GET
router.get("/students", studentsController.getStudents);
router.get("/student/:id", studentsController.getStudent);
// POST
router.post(
  "/students",
  checkEmptyBody,
  studentsMiddleware.checkStudentFields,
  studentsMiddleware.checkStudentValidations,
  studentsController.addStudent
);
// DELETE
router.delete("/student/:id", studentsController.deleteStudent);
// PUT
router.put(
  "/student/:id",
  checkEmptyBody,
  studentsMiddleware.checkStudentFields,
  studentsMiddleware.checkStudentValidations,
  studentsController.editStudent
);

export default router;
