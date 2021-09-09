const changeBooleanValues = (obj) => {
  obj.forEach((prop) => {
    if (prop[1] === true) {
      prop[1] = "Summary.yes";
    } else if (prop[1] === false) {
      prop[1] = "Summary.no";
    }
  });
};

export default changeBooleanValues;
