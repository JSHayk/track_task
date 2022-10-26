// Student Form
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const hexValidation = /[0-9A-Fa-f]{6}/g;
const nameValidation = /[0-9a-zA-Z]{3}/;

// Validation Checking.
const isEmailValidated = (email) => {
  return email.match(emailValidation);
};

const isNameValidated = (name) => {
  return name.match(nameValidation);
};

const isHexValidated = (hexId) => {
  return hexId.match(hexValidation);
};

export default {
  isEmailValidated,
  isHexValidated,
  isNameValidated,
};
