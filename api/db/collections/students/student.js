import connection from "../../connect.js";

async function getStudents() {
  try {
    const students = connection.query(`SELECT * FROM students`);
    return students;
  } catch (err) {
    console.error(err);
  }
}

export default {
  getStudents,
};
