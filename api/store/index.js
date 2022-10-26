import student from "../db/collections/students/student.js";

// State
let students = [];

function getState() {
  return {
    students,
  };
}

async function sync() {
  try {
    students = await student.getStudents();
  } catch (err) {
    console.error(err);
  }
}

export default {
  sync,
  getState,
};
