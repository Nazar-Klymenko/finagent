const validateAppData = (object, type, key) => {
  if (object[type][key]) {
    return object[type][key];
  } else {
    return object[type];
  }
};

export default validateAppData;
