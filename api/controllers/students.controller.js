import store from "../store/index.js";
import connection from "../db/connect.js";

const getStudents = (req, res) => {
  res.send(store.getState().students[0]);
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [student] = await connection.query(
      "SELECT * FROM students WHERE id = ?",
      [id]
    );
    res.send(student);
  } catch (err) {
    console.error(err);
  }
};

const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, favoriteSports } =
      req.body;
    const students = await connection.query(
      `INSERT INTO students 
        (first_name, last_name, email, phone, date_of_birth, favorite_sports)
        VALUES(?, ?, ?, ?, ?, ?)
        `,
      [
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        JSON.stringify(favoriteSports),
      ]
    );
    res.send(students);
  } catch (err) {
    console.error(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(403);
    await connection.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "The student has been successfully deleted!" });
  } catch (err) {
    console.error(err);
  }
};

const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, dateOfBirth, favoriteSports } =
      req.body;
    if (!id) return res.sendStatus(403);
    const result = await connection.query(
      `UPDATE students 
        SET first_name = ?, last_name = ?,
        email = ?, phone = ?, date_of_birth = ?, 
        favorite_sports = ?
        WHERE id = ?
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        JSON.stringify(favoriteSports),
        id,
      ]
    );
    if (!result) return res.json({ message: "Something went wron" });
    res.json({ message: "The student has been successfully updated!" });
  } catch (err) {
    console.error(err);
  }
};

export default {
  getStudents,
  getStudent,
  addStudent,
  deleteStudent,
  editStudent,
};
