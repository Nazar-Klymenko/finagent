const validateAppData = (object, key) => {
  if (object[key]) {
    return object[key];
  } else {
    return object;
  }
};

export default validateAppData;
