export const checkFields = (email, password) => {
  if (email === "" || password === "") {
    return false;
  } else {
    return true;
  }
};
