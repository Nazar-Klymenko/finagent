const formatBooleans = (obj: any) => {
  obj.forEach((prop: any) => {
    if (prop[1] === true) {
      prop[1] = "Summary.yes";
    } else if (prop[1] === false) {
      prop[1] = "Summary.no";
    }
  });
};

export default formatBooleans;
