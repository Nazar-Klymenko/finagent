import moment from "moment";

const changeDateValues = (obj) => {
  obj.forEach((prop) => {
    if (
      prop[1]
        .toString()
        .match(/\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d\.\d\d\d\w/g) !== null
    ) {
      prop[1] = moment(prop[1]).calendar();
    }
  });
};

export default changeDateValues;
