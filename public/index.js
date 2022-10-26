const url = `http://localhost:4000${process.env.PORT}`;
const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
// const
// fields
let currentStudentId;
// Add Fields.
const firstNameEl = document.querySelector(".first-name");
const lastNameEl = document.querySelector(".last-name");
const emailEl = document.querySelector(".email");
const phoneEl = document.querySelector(".phone");
const dateOfBirthEl = document.querySelector(".date-of-birth");
const runningCheckBox = document.querySelector(".running");
const swimmingCheckBox = document.querySelector(".swimming");
// Edit Fields
const editFirstNameEl = document.querySelector(".edit-first-name");
const editLastNameEl = document.querySelector(".edit-last-name");
const editEmailEl = document.querySelector(".edit-email");
const editPhoneEl = document.querySelector(".edit-phone");
const editDateOfBirthEl = document.querySelector(".edit-date-of-birth");
const editRunningCheckBox = document.querySelector(".edit-running");
const editSwimmingCheckBox = document.querySelector(".edit-swimming");
const cancelButton = document.querySelector(".cancel-button");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addStudent();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editStudent();
});

cancelButton.addEventListener("click", () => {
  showAddForm();
});

async function drawStudents() {
  const studentsContentEl = document.querySelector(
    ".students-records-table-content"
  );
  const students = await getStudents();
  studentsContentEl.innerHTML = "";
  students.forEach((item) => {
    const {
      id,
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      favorite_sports,
    } = item;
    studentsContentEl.innerHTML += `
      <div class="students-records-row">
        <p>${first_name}</p>
        <p>${last_name}</p>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${date_of_birth}</p>
        <p>${favorite_sports.join(",") || "Empty"}</p>
        <section class="edit">
        <div onClick=showEditForm(${id}) class="edit-tool"></div>
        <div onClick=deleteStudentRow(${id}) class="delete-tool"></div>
        </section>
      </div>
    `;
  });
}

async function getStudents() {
  try {
    const { data } = await axios.get(`${url}/students`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function addStudent() {
  try {
    await axios.post(`${url}/students`, {
      firstName: firstNameEl.value,
      lastName: lastNameEl.value,
      email: emailEl.value,
      phone: phoneEl.value,
      dateOfBirth: dateOfBirthEl.value,
      favoriteSports: getFavoriteSports(),
    });
    clearFields();
  } catch (err) {
    console.error(err);
  }
}

async function deleteStudentRow(id) {
  axios.delete(`${url}/student/${id}`);
}

function getFavoriteSports() {
  const favoriteSports = [];
  if (runningCheckBox.checked) favoriteSports.push("running");
  if (swimmingCheckBox.checked) favoriteSports.push("swimming");
  return favoriteSports;
}

function clearFields() {
  firstNameEl.value = "";
  lastNameEl.value = "";
  emailEl.value = "";
  phoneEl.value = "";
  dateOfBirthEl.value = "";
  runningCheckBox.checked = false;
  swimmingCheckBox.checked = false;
}

function clearEditFields() {
  editFirstNameEl.value = "";
  editLastNameEl.value = "";
  editEmailEl.value = "";
  editPhoneEl.value = "";
  editDateOfBirthEl.value = "";
  editRunningCheckBox.checked = false;
  editSwimmingCheckBox.checked = false;
}

// Edit Form

async function editStudent() {
  try {
    await axios.put(`${url}/student/${currentStudentId}`, {
      firstName: editFirstNameEl.value,
      lastName: editLastNameEl.value,
      email: editEmailEl.value,
      phone: editPhoneEl.value,
      dateOfBirth: editDateOfBirthEl.value,
      favoriteSports: getFavoriteSports(),
    });
    clearEditFields();
  } catch (err) {
    console.error(err);
  }
}

function showEditForm(id) {
  editForm.style.display = "block";
  addForm.style.display = "none";
  currentStudentId = id;
  getStudent();
}

function showAddForm() {
  editForm.style.display = "none";
  addForm.style.display = "block";
}

async function getStudent() {
  try {
    const { data } = await axios.get(`${url}/student/${currentStudentId}`);
    if (!Array.isArray(data)) return;
    fillEditForm(data[0]);
  } catch (err) {
    console.log(err);
  }
}

function fillEditForm(student) {
  const {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    favorite_sports,
  } = student;
  editFirstNameEl.value = first_name;
  editLastNameEl.value = last_name;
  editEmailEl.value = email;
  editPhoneEl.value = phone;
  editDateOfBirthEl.value = date_of_birth;
  editRunningCheckBox.checked = favorite_sports.includes("running")
    ? true
    : false;
  editSwimmingCheckBox.checked = favorite_sports.includes("swimming")
    ? true
    : false;
}

drawStudents();

// Mask
var maskOptions = {
  mask: "(000)000-0000",
};
var mask = IMask(phoneEl, maskOptions);

// Date Mask
var dateMask = IMask(dateOfBirthEl, {
  mask: Date,
  min: new Date(1990, 0, 1),
  max: new Date(2020, 0, 1),
});

var editMaskOptions = {
  mask: "(000)000-0000",
};
var editMask = IMask(editPhoneEl, maskOptions);

var editDateMask = IMask(editDateOfBirthEl, {
  mask: Date,
  min: new Date(1990, 0, 1),
  max: new Date(2020, 0, 1),
});
